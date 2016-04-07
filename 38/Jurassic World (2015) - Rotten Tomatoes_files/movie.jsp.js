define([
    "jquery", "underscore", "backbone", "globals", "readmore", "dotdotdot", "jquery-cookie", "domReady!"
], function($, _, Backbone, RT) {
    _.templateSettings = {
        interpolate: /\<\@\=(.+?)\@\>/gim,
        evaluate: /\<\@(.+?)\@\>/gim
    };
    var noShowtimesView = _.template("<div>There are no showtimes for this theater.</div><br/>"),
        changeShowtimesView = _.template('<@ if (!noShowtimes) { @><a class="goBack">Go back</a><@ } @>' +
            '<div>Enter your location to see where <em><@= movieTitle @>' +
            '</em> is playing near you</div><div class="input-group col-xs-24 col-sm-12">' +
            '<input class="typeahead form-control" type="text" value="" placeholder="Enter city & state or Zip Code"/>' +
            '<span class="input-group-btn"><button id="location-button" type="button" class="btn btn-primary">Submit</button></span>' +
            '</div><div class="results"></div>');
    return Backbone.View.extend({
        initialize : function(options) {
            // Initialize LHS movie list and hover bubbles
            var movieList = $("#movies_sidebar");
            this.movieId = options.movieId;
            this.el = options.el;
            require([RT.StaticHost + "/js/app/views/MovieList.js"], function(MovieList) {
                new MovieList({
                    el : movieList,
                    scrollOnly: true,
                    headerBottom: function() {
                        return $("#main_container").offset().top + 10;
                    },
                    footerTop: function()  {
                        return $(".sleaderboard_wrapper").offset().top;
                    },
                    options: false
                });
            });

            require([RT.StaticHost + "/js/app/views/HoverBubble.js"], function(HoverBubble) {
                new HoverBubble({el : movieList});
            });

            // Load Friend reviews only if user is logged in
            RT.social_init.done(function() {
                $.get(options.movieUrl + "friendrating/").done(function(data){
                    $("#friend_reviews").html(data);
                });
            });

            // Load forum preview
            $.get("/m/" + options.movieId + "/jforum_preview").done(function(markup){
                $("#discussionForum .panel-body").html(markup);
            });

            // apply readmore to quote bubbles
            $("#friend-reviews .comment, #audience_reviews .comment").readmore();
            $("#quotesList .review_quote .quoteBody").readmore();
            $("a.read-more").hide();
            setTimeout(function() {
                $("#movieSynopsis").dotdotdot({
                    height:200,
                    ellipsis: "...",
                    wrap:"letter",
                    watch: true,
                    after: "a.read-more",
                    callback: function(isTruncated, orgContent) {
                        if (!isTruncated) {
                            $("a.read-more", this).hide();
                        } else {
                            $("a.read-more", this).show();
                        }
                    }
                });
                $("#movieSynopsis a.read-more").click(function(event) {
                    event.preventDefault();
                    $("#movieSynopsis a.read-more").parent().trigger("destroy");
                    $("#movieSynopsis a.read-more").remove();
                });
            }, 1000);

            this.isFandangoTicketingEnabled = options.isFandangoTicketingEnabled;
            this.hasTomatometer = options.hasTomatometer;
            this.isReleased = options.isReleased;
            this.fetchNewsItem(options.movieId);
            this.loggedIn = options.loggedIn;
            if (options.quotes) {
                options.quotes.fetch({
                    success: this.onQuotesItemFetch.bind(this, options.quotes)
                });
            }
            if (options.audienceReviews) {
                require([
                    RT.StaticHost + "/js/app/views/AudienceReviewView.js",
                    "text!" + RT.StaticHost + "/templates/Movie.reviews.audience.html"
                ], function(AudienceReviewView, AudienceReviewTemplate) {
                    options.audienceReviews.fetch({
                        success: this.onAudienceReviewItemFetch.bind(this, options.audienceReviews, AudienceReviewView, AudienceReviewTemplate)
                    });
                }.bind(this));
            }

            require([RT.StaticHost + "/js/app/models/RecommendationModel.js"], function(RecommendationModel) {
                var recommendationModel = new RecommendationModel.RecommendationModelItems({
                    movieId: options.movieId
                });
                recommendationModel.fetch({
                    success: this.onRecommendationFetch.bind(this, recommendationModel)
                })
            }.bind(this));

            require([
                RT.StaticHost + "/js/jspjs/modalTrailer.jsp.js",
            ], function(ModalTrailer) {
                new ModalTrailer({ el: $("body"), vanity:options.movieVanity });
            });
            if ($("#showtimes").length > 0) {
                this.getShowtimes(options);
            }
            $("#heroImageContainer .playButton").addClass("in");
            this.movieTitle = options.movieTitle;
        },
        events: {
            "click .ratingButton" : "onRatingBtnClick",
        },
        getShowtimes: function(options) {
            this.apiBaseUrl = options.apiBaseUrl;

            var zipCode = $.cookie("showtimesZipcode");
            if (!zipCode) {
                zipCode = $.cookie("showtimesZipId");
                if (!zipCode) {
                    zipCode = options.defaultZip;
                }
            }
            this.requestTheaterDataFromServer(options.movieId, zipCode, options.isReleased, options.showtimeDate);
        },
        onRatingBtnClick: function() {
            $("html, body").animate({
                scrollTop: $("#rating_widget").offset().top - $(window).height()/2
            }, 1000);
        },
        fetchNewsItem: function(movieId) {
            if ("On" == RT.NewsThrottle.movie) {
                $("#newsSection").remove();
            } else {
                require([
                    RT.StaticHost + "/js/app/models/NewsModel.js!"
                ], function(NewsModel) {
                    var newsItem = new NewsModel.NewsItems({
                        movieId: movieId
                    });
                    if ("Off" == RT.NewsThrottle.movie) {
                        newsItem.fetch({
                            success: this.onNewsItemFetch.bind(this, newsItem)
                        });
                    } else if ("Limited" == RT.NewsThrottle.movie) {
                        var mobWindow = "";
                        for (var i in dataLayer) {
                            var dataLayerVar = dataLayer[i];
                            if (dataLayerVar.event && "MOB Pageview" == dataLayerVar.event) {
                                mobWindow = dataLayerVar.mobWindow;
                                break;
                            }
                        }
                        if ("Opening" == mobWindow || "InTheaters" == mobWindow || "TopBoxOffice" == mobWindow || "Upcoming" == mobWindow || "DvdNewRelease" == mobWindow) {
                            newsItem.fetch({
                                success: this.onNewsItemFetch.bind(this, newsItem)
                            });
                        } else {
                            $("#newsSection").remove();
                        }
                    } else {
                        if (this.hasTomatometer || this.isReleased == false) {
                            newsItem.fetch({
                                success: this.onNewsItemFetch.bind(this, newsItem)
                            });
                        } else {
                            $("#newsSection").remove();
                        }
                    }
                }.bind(this));
            }
        },
        onNewsItemFetch: function(newsItem) {
            if (newsItem.size() > 0) {
                require([
                    RT.StaticHost + "/js/app/views/NewsView.js",
                    "text!" + RT.StaticHost + "/templates/News.box.html",
                    "text!" + RT.StaticHost + "/templates/News.item.html"
                ], function(NewsView, NewsBoxTemplate, NewsItemTemplate) {
                    var newsView = new NewsView.NewsPanel({
                        collection: newsItem,
                        NewsBoxTemplate: NewsBoxTemplate,
                        NewsItemTemplate: NewsItemTemplate
                    });
                    newsView.render();
                    $("#newsContainer").html(newsView.$el);
                    $("#newsSection").removeClass("hide");
                });
            } else {
                $("#newsSection").remove();
            }
        },
        onQuotesItemFetch: function(quotes) {
            if (quotes.length > 0) {
                require([
                    RT.StaticHost + "/js/app/views/QuotesView.js",
                    "text!" + RT.StaticHost + "/templates/Quotes.item.html",
                    "text!" + RT.StaticHost + "/templates/Quotes.line.html"
                ], function(QuotesView, QuotesItemTemplate, QuotesLineTemplate) {
                    $("#quotesList .quotes .noQuotes").addClass("hide");
                    $("#quotesList .quotes .quoteList").append("");
                    for (var i = 0; i < quotes.length; ++i) {
                        var quoteVars = {
                            model:quotes.models[i],
                            QuotesItemTemplate:QuotesItemTemplate,
                            QuotesLineTemplate:QuotesLineTemplate
                        };
                        if (this.loggedIn) {
                            quoteVars.loggedIn = true;
                            quoteVars.movieUrl = this.movieUrl;
                        }
                        var quotesItem = new QuotesView.QuotesItem(quoteVars);
                        quotesItem.render();
                        $("#quotesList .quotes .quoteList").append(quotesItem.$el);
                        $("#quotesList .clickForMore").removeClass("hide");
                        $("#quotesList .clickForMore .total").text(this.quotes.total);
                    }
                });
            }
        },
        onAudienceReviewItemFetch: function(audienceReviewItems, AudienceReviewView, AudienceReviewTemplate) {
            if (audienceReviewItems.length > 0) {
                $("#audience_reviews .noReview").addClass("hide");
                $("#audience_reviews .reviews").html("");
                for (var i = 0; i < audienceReviewItems.length; ++i) {
                    var audienceReviewItem = audienceReviewItems.models[i];
                    var audienceReviewView = new AudienceReviewView.AudienceReviewItem({
                        model: audienceReviewItem,
                        left: 0 == i % 2,
                        AudienceReviewTemplate: AudienceReviewTemplate
                    });
                    audienceReviewView.render();
                    $("#audience_reviews .reviews").append(audienceReviewView.$el);
                    $("#audience_reviews .comment").readmore();
                }
                $("#audience_reviews .clickForMore").removeClass("hide");
                $("#audience_reviews .clickForMore .total").text(audienceReviewItems.size);
            } else if (audienceReviewItems.size > 0 ) {
                $("#audience_reviews .noReview").addClass("hide");
                $("#audience_reviews .noFeaturedReview").removeClass("hide");
                $("#audience_reviews .clickForMore").removeClass("hide");
                $("#audience_reviews .clickForMore .total").text(audienceReviewItems.size);
            }
        },
        onRecommendationFetch: function(recommendationItems) {
            if (recommendationItems.length > 0) {
                require([
                    RT.StaticHost + "/js/app/views/RecommendationView.js",
                    "text!" + RT.StaticHost + "/templates/Recommendation.item.html",
                    "slick"
                ], function(RecommendationView, RecommendationItemTemplate) {
                    var recommendationView = new RecommendationView.RecommendationPanel({
                        collection: recommendationItems,
                        RecommendationTemplate: RecommendationItemTemplate
                    });
                    recommendationView.render();
                    $("#recommendation .recommendationContainer").html(recommendationView.$el);
                    $("#recommendation .recommendationContainer .recPanel").on("init", function() {
                            $("#recommendation").css({
                                visibility: "visible",
                                height: ""
                            });
                    });
                    $("#recommendation .recommendationContainer .recPanel").slick({
                        lazyLoad: "ondemand",
                        slidesToShow:5,
                        slidesToScroll:5,
                        draggable: true,
                        infinite: true,

                        responsive:[{
                            breakpoint: 728,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        }, {
                            breakpoint: 610,
                            settings: {
                                slidesToShow:3,
                                slidesToScroll:3
                            }
                        },{
                            breakpoint: 375,
                            settings: {
                                slidesToShow:2,
                                slidesToScroll:2
                            }
                        }]
                    });
                });
            } else {
                $("#recommendation").remove();
            }
        },
        requestTheaterDataFromServer: function(movieId, zipcode, isReleased, showtimeDate) {
            if (zipcode) {
                require([
                    RT.StaticHost + "/js/app/App.js",
                    RT.StaticHost + "/js/app/models/ShowtimesModel.js",
                    RT.StaticHost + "/js/app/views/MovieShowtimesView.js",
                    RT.StaticHost + "/js/app/views/ShowtimesView.js"
                ], function(Showtimes) {
                    var showtimesQuery = {
                        date: showtimeDate,
                        deviceType: "RTO",
                        fullMovieInfo: true,
                        limit:1,
                        movie: movieId,
                        postal: zipcode,
                        showtimes: true,
                        vanityPlatform: "RTO"
                    };
                    var showtimesData = new Showtimes.ShowtimesModel.TheaterData();
                    showtimesData.fetch({data:showtimesQuery}).then(function() {
                        if (showtimesData) {
                            require(["text!" + RT.StaticHost + "/templates/Movie.Showtimes.html"], function(MovieShowtimesTemplate) {
                                if (showtimesData.attributes.hasOwnProperty("traits")) {
                                    this.showtimesView = new Showtimes.MovieShowtimesView.ShowtimesView({
                                        controller:this,
                                        isReleased:isReleased,
                                        model:showtimesData,
                                        movieId: movieId,
                                        MovieShowtimesTemplate:MovieShowtimesTemplate,
                                        showtimeDate:showtimeDate,
                                        zipcode:zipcode
                                    });
                                    this.showtimesView.render();
                                    $("#showtimes .showtimesContainer").html(this.showtimesView.$el);
                                } else if ($("#showtimes .showtimesContainer").data("collapse")) {
                                    $("#showtimes").remove();
                                } else {
                                    $("#showtimes .showtimesContainer").html("");
                                }
                            }.bind(this));
                        } else if ($("#showtimes .showtimesContainer").data("collapse")) {
                            $("#showtimes").remove();
                        }
                    }.bind(this));
                }.bind(this));
            } else {
                require([
                    RT.StaticHost + "/js/app/views/MovieShowtimesView.js"
                ], function(MovieShowtimesView) {
                    $("#showtimes .showtimesContainer").html(noShowtimesView() + changeShowtimesView({ movieTitle: this.movieTitle, noShowtimes: true }));
                    this.showtimesView = new MovieShowtimesView.LocationPicker({
                        el: $("#showtimes .showtimesContainer"),
                        controller: this,
                        isReleased: isReleased,
                        showtimeDate: showtimeDate,
                        zipcode:zipcode
                    });
                }.bind(this))
            }
        },
        onChangeLocation: function(movieId, isReleased, showtimeDate) {
            require([
                RT.StaticHost + "/js/app/views/MovieShowtimesView.js"
            ], function(MovieShowtimesView) {
                $("#showtimes .showtimesContainer").html(changeShowtimesView({ movieTitle: this.movieTitle, noShowtimes: false }));
                $("#showtimes .showtimesContainer .goBack").click(function() {
                    this.requestTheaterDataFromServer(movieId, $.cookie("showtimesZipcode"), isReleased, showtimeDate);
                }.bind(this));
                new MovieShowtimesView.LocationPicker({
                    controller: this,
                    el: $("#showtimes .showtimesContainer"),
                    isReleased: isReleased,
                    showtimeDate: showtimeDate,
                    movieId: this.movieId
                });
            }.bind(this));
        },
        onZipcodeUpdate: function(movieId, zipcode, isReleased, showtimeDate) {
            $.cookie("showtimesZipcode", zipcode, { path: "/" });
            this.requestTheaterDataFromServer(movieId, zipcode, isReleased, showtimeDate);
        }
    });
});