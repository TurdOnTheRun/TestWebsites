define (["jquery", "backbone", "globals"], function($, Backbone, RT) {
    RT.Backbone.Models.Media = Backbone.Model.extend({
        starClasses: "score00 score05 score10 score15 score20 score25 score30 score35 score40 score45 score50",

        sync: function(method, model, options) {
            if (method == "patch" || method == "update" || method == "create") {
                var xhr = options.xhr = Backbone.ajax({
                    type : "POST",
                    url  : _.result(model, 'url') || urlError(),
                    data : {
                        review: model.get("review"),
                        score: model.get("score"),
                        source: model.get("source")
                    }
                });
                if ("facebook" == RT.LoginStatusModel.get("userType")) {
                    var deferred = RT.fb_connected.done(function () {
                        model.trigger('request', model, xhr, options);
                        return xhr;
                    });
                } else {
                    var deferred = RT.social_init.done(function() {
                        model.trigger('request', model, xhr, options);
                        return xhr;
                    });
                }
                return deferred;
            } else {
                return Backbone.sync.call(this, method, model, options);
            }
        },

        loginIfNecessary : function() {
            // Call if user not logged in
            // Can ignore if login is RTO (native) or FBK (Facebook)
            if (RT.LoginStatusModel.get("loginPlatformCode") == undefined || RT.LoginStatusModel.get("loginPlatformCode") == "Unknown") {
                var ele = $(this);
                var scope = ele.attr("scope");
                if (scope == undefined) {
                    scope = 'email,publish_actions,user_friends';
                }
                RT.fb_ready.done(function() {
                    FB.login(function(response) {
                        RT.fb_connected.done(function() {
                            if (ele.data("redirect") != undefined) {
                                window.location.href = ele.data("redirect");
                            }
                        });
                        if (!response.authResponse) {
                            console.log('User cancelled Facebook login or did not fully authorize.');
                            $(".wts", this.el).removeClass('on');
                            $(".ni", this.el).removeClass('on');
                            $(".stars", this.el).removeClass(this.starClasses).addClass("stars clear fl");
                            $("#review_text").val("");
                        }
                    }, {scope: scope});
                });
            }
        }

    });

    RT.Backbone.Models.Movie = RT.Backbone.Models.Media.extend({
        initialize: function() {
            //this.bind('change', function() { console.log("Movie model changed - "+this.id); });
        },

        parse: function(resp, options) {
            resp.id = resp.media.id;
            return resp;
        },

        loginAndSave : function(score, review, location, onCallback) {
            this.loginIfNecessary();
            if ("function" === typeof(onCallback)) {
                this.save({success: onCallback});
            } else {
                this.save();
            }

            if (score !== "") {
                dataLayer.push({"event": "RatingWidget", "mediaType": "Movie", "target": location , "action" : score});
            }
            if (review !== "") {
                dataLayer.push({"event": "RatingWidget", "mediaType": "Movie", "target": location , "action" : "Review"});
            }
        }
    });

    RT.Backbone.Models.TvSeason = RT.Backbone.Models.Media.extend({
        initialize: function() {
            //this.bind('change', function() { console.log("Season model changed - " + this.id); });
        },

        parse: function(resp, options) {
            resp.id = resp.media.id;
            return resp;
        },

        loginAndSave : function(score, review, location, onCallback) {
            this.loginIfNecessary();
            if ("function" === typeof(onCallback)) {
                this.save({success: onCallback});
            } else {
                this.save();
            }

            if (score !== "") {
                dataLayer.push({"event": "RatingWidget", "mediaType": "TV", "target": location, "action" : score});
            }
            if (review !== "") {
                dataLayer.push({"event": "RatingWidget", "mediaType": "TV", "target": location, "action" : "Review"});
            }
        }
    });

    RT.Backbone.Models.TvSeries = RT.Backbone.Models.Media.extend({
        initialize: function() {
            //this.bind('change', function() { console.log("Season model changed - " + this.id); });
        },

        parse: function(resp, options) {
            resp.id = resp.media.id;
            return resp;
        },

        loginAndSave : function(score, review, location, onCallback) {
            this.loginIfNecessary();
            if ("function" === typeof(onCallback)) {
                this.save({success: onCallback});
            } else {
                this.save();
            }

            if (score !== "") {
                dataLayer.push({"event": "RatingWidget", "mediaType": "TVSeries", "target": location, "action" : score});
            }
            if (review !== "") {
                dataLayer.push({"event": "RatingWidget", "mediaType": "TVSeries", "target": location, "action" : "Review"});
            }
        }
    });

    RT.Backbone.Collections.MovieCollection = Backbone.Collection.extend({
        model: RT.Backbone.Models.Movie,

        url: "/api/private/v1.0/users/current/ratings/",

        getCurrentUserRating : function(ratingId) {
            // This returns a model that may or may not have been populated.
            // Always do one of the following rather than accessing model direclty
            // Either: 1) predicate with model.deferred.done()
            //     or: 2) Listen on an event e.g. change/reset

            var rating;
            if (this.get(ratingId) == null) {
                rating = new RT.Backbone.Models.Movie({id: ratingId},{ collection: this});
                rating.deferred = rating.fetch();

                this.add(rating);
            } else {
                rating = this.get(ratingId);
            }

            return rating;
        }
    });

    RT.Backbone.Collections.TvSeasonCollection = Backbone.Collection.extend({
        model: RT.Backbone.Models.TvSeason,

        url: "/api/private/v1.0/users/current/tvratings/",

        getCurrentUserRating : function(ratingId) {
            // This returns a model that may or may not have been populated.
            // Always do one of the following rather than accessing model direclty
            // Either: 1) predicate with model.deferred.done()
            //     or: 2) Listen on an event e.g. change/reset

            var rating;
            if (this.get(ratingId) == null) {
                rating = new RT.Backbone.Models.TvSeason({id: ratingId},{ collection: this});
                rating.deferred = rating.fetch();

                this.add(rating);
            } else {
                rating = this.get(ratingId);
            }
            return rating;
        }
    });

    RT.Backbone.Collections.TvSeriesCollection = Backbone.Collection.extend({
        model: RT.Backbone.Models.TvSeries,

        url: "/api/private/v1.0/users/current/tvseriesratings/",

        getCurrentUserRating : function(ratingId) {
            // This returns a model that may or may not have been populated.
            // Always do one of the following rather than accessing model direclty
            // Either: 1) predicate with model.deferred.done()
            //     or: 2) Listen on an event e.g. change/reset

            var rating;
            if (this.get(ratingId) == null) {
                rating = new RT.Backbone.Models.TvSeries({id: ratingId},{collection: this});
                rating.deferred = rating.fetch();

                this.add(rating);
            } else {
                rating = this.get(ratingId);
            }
            return rating;
        }
    });

    RT.Backbone.Views.RatingWidget = Backbone.View.extend({
        starClasses: "score00 score05 score10 score15 score20 score25 score30 score35 score40 score45 score50",

        initialize: function() {
            _.bindAll(this, 'render', 'initialRender', 'changeRating', 'postReview');
            this.location = this.$el.data("location") || "MOB";

            // Get media id from DOM attribute (either movie-id or season-id)
            var mediaId = this.$el.data("media-id");
            var type = this.$el.data("type");

            if (type == "movie") {
                //console.log("initializing rating widget for movie:" + mediaId);
                this.model = RT.ord.movies.getCurrentUserRating(mediaId);
            } else if (type == "season") {
                //console.log("initializing rating widget for season:" + mediaId);
                this.model = RT.ord.tvSeasons.getCurrentUserRating(mediaId);
            } else if (type == "series") {
                this.model = RT.ord.tvSeries.getCurrentUserRating(mediaId);
            } else {
                console.error("Rating widget - invalid media type");
            }

            this.$el.find(".stars").mouseenter();
            if ("object" == typeof(RT.LoginStatusModel)) {
                $.when(this.model.deferred).done(this.initialRender);
            } else {
                $.when(this.model.deferred, RT.social_init).done(this.initialRender);
            }
        },

        events : {
            "click .rating_buttons input" : "changeRating",
            "mousemove .stars"            : "starMousemove",
            "mouseout .stars"             : "starMouseout",
            "click .post_button"          : "postReview",
            "click .edit_button"          : "editReview",
            "keydown #review_text"        : "showPostButton"
        },

        showPostButton : function(e) {
            if ($(".review", (e.currentTarget)) !== undefined) {
                $(".post_button", this.el).show();
            }
        },

        changeRating : function(e) {
            var source = this.$el.data("source"),
                clickedItem = $(e.currentTarget),
                score = clickedItem.val();

            if (!score) {
                var stars = $(".stars", this.el);
                var width = $(e.currentTarget).width();
                var xpos = e.pageX - stars.offset().left;
                score = this.computeScore(width, xpos);
            }

            if (!source) {
                source = "RTM";
            }
            this.model.set("source", source);
            this.model.set("score", score);
            this.model.loginAndSave(score, "", this.location, function() {
                if (clickedItem.hasClass("wts")) {
                    if (this.$("ni").hasClass("on")) {
                        this.$("ni").removeClass("on");
                    }
                } else if (clickedItem.hasClass("ni")) {
                    this.$("wts").removeClass("on");
                }
                clickedItem.addClass("on");
            }.bind(this));
        },

        starMousemove : function(e) {
            var stars = $(".stars", this.el);
            var width = $(e.currentTarget).width();
            var xpos = e.pageX - stars.offset().left;
            var score = this.computeScore(width, xpos);
            stars.removeClass(this.starClasses).addClass('score' + score.replace('.', ''));
        },

        starMouseout : function() {
            var stars = $(".stars", this.el);
            stars.removeClass(this.starClasses);
            var score = this.model.get("score");
            if ($.isNumeric(score)) {
                stars.addClass('score' + score.replace('.', ''));
            }
        },

        postReview : function() {
            var review = $(".review", this.el);
            var source = this.$el.data("source");

            // Non-empty review
            if (review != undefined && review.val().length > 0) {
                $(".post_button", this.el).hide();
                review.addClass('disabled');
            }

            var edit_button = $(".edit_button", this.el);
            $(".status").addClass('wait');
            edit_button.html("Saved").show().delay(3000).fadeOut('slow',
                    function() {
                edit_button.html("Edit");
                if (review != undefined && review.val().length > 0) {
                    edit_button.show();
                }
                $(".status").removeClass('wait');
            });

            if (!source) {
                source = "RTM";
            }
            this.model.set("source", source);
            this.model.set("review", review.val());
            this.model.loginAndSave("", review.val(), this.location); // Save on RT
        },

        editReview : function() {
            $(".review", this.el).removeClass('disabled');
            $(".edit_button", this.el).hide();
        },

        computeScore : function(width, xpos) {
            var percent = 90 * (xpos / width); // *90 fixes star hover alignment instead of *100
            var score = '0.0';
            if (90 < percent) score = '5.0';
            else if (80 < percent) score = '4.5';
            else if (70 < percent) score = '4.0';
            else if (60 < percent) score = '3.5';
            else if (50 < percent) score = '3.0';
            else if (40 < percent) score = '2.5';
            else if (30 < percent) score = '2.0';
            else if (20 < percent) score = '1.5';
            else if (10 < percent) score = '1.0';
            else if (5  < percent) score = '0.5';
            return score;
        },

        initialRender: function() {
            this.render();
            this.renderFacepile();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            //console.log("Rendering rating widget");
            var modelScore = this.model.get("score");
            var modelReview = this.model.get("review");
            var wts = $(".wts", this.el);
            var ni = $(".ni", this.el);
            var stars = $(".stars", this.el);

            // Reset css
            wts.removeClass('on');
            ni.removeClass('on');
            stars.removeClass(this.starClasses);

            // Highlight buttons/stars based on score
            if (modelScore != undefined) {
                if (modelScore == '+') {
                    wts.addClass('on').show();
                } else if (modelScore == '-') {
                    ni.addClass('on').show();
                } else {
                    stars.addClass('score' + modelScore.replace('.',''));
                    stars.addClass("on");
                    if (this.$el.data("hide-wtsni")) { // Hide WTS/NI buttons, if applicable
                        wts.hide();
                        ni.hide();
                    }
                }
            }

            // Populate and format review text and buttons
            var review = $(".review", this.el);
            var edit_button = $(".edit_button", this.el);
            if (review == undefined || review.val() == undefined || review.val().length == 0) {
                review.val(modelReview);
                $(".post_button", this.el).hide();

                if (modelReview != undefined && modelReview.length > 0) {
                    review.addClass('disabled');
                    edit_button.show();

                    // Resize textarea
                    if (review[0] != undefined) {
                        review.height(review[0].scrollHeight);
                    }
                }
                else edit_button.hide();
            }
        },

        renderFacepile : function() {
            var friends_ratings = this.model.get("friends_ratings");

            if(friends_ratings){
                var faceCount = 0;
                var facepile = this.$el.find(".facepile");


                $.each(friends_ratings, function(idx, val) {
                    if (val.type == "fblike" || ($.isNumeric(val.rating) && parseFloat(val.rating) >= 3.0 ) || val.rating == "wts") { // Only show positive actions
                        facepile.append("<img src='" + val.user.picture + "' />");
                        faceCount++;
                    }
                });

                if(faceCount > 0){
                    facepile.append("<span class='facepile-caption'>" + faceCount + (faceCount == 1 ? " friend likes it" : " friends like it"));
                }
            }
        }
    });

    RT.Backbone.Views.FacebookManager = Backbone.View.extend({
        initialize : function() {
            _.bindAll( this, 'render', 'initialRender', 'toggle', 'postReview');

            // Get idom DOM attribute
            var mediaType = $(this.el).data("type");
            var mediaId = $(this.el).data("media-id");

            if (mediaType == "movie") {
                this.model=RT.ord.movies.getCurrentUserRating(mediaId);
            } else if (mediaType == "season") {
                this.model = RT.ord.tvSeasons.getCurrentUserRating(mediaId);
            } else if (mediaType == "series") {
                this.model = RT.ord.tvSeries.getCurrentUserRating(mediaId);
            } else {
                console.error("FacebookManager: invalid media type");
            }

            $.when(this.model.deferred, RT.social_init).done(this.initialRender);
        },

        initialRender: function() {
            var fb_button = $(".fb_button", this.el);
            if (fb_button.hasClass('true') && RT.LoginStatusModel.get("loginPlatformCode") == 'FBK') {
                fb_button.addClass('on');
            }
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        events : {
            "click .rating_buttons input" : "postReview",
            "click .fb-share_button" : "toggle",
            "click .edit_button" : "editReview",
            "click .post_button" : "postReview"
        },

        toggle : function() {
            var fb_button = $(".fb-share_button", this.el),
                facebookId = RT.LoginStatusModel.get("facebookId");

            if (RT.LoginStatusModel.get("loginPlatformCode") == undefined || RT.LoginStatusModel.get("loginPlatformCode") == "Unknown") {
                this.loginIfNecessary();
            }

            if (fb_button.hasClass('on')) {
                fb_button.removeClass('on');
            } else {
                if (!fb_button.hasClass('true')) { // true : rt:hasFacebookShareRatingEnabled(facebookId)
                    var fbShare = confirm('Always share ratings on Facebook?');
                    if (fbShare) {
                        $.post('/user/account/facebook-share-rating-setting/', {
                            facebookId : facebookId,
                            sharingEnabled : true
                        }, "json").complete($.proxy(this.onResponseReadReviews, this));
                    }
                }
                fb_button.addClass('on');
            }
        },

        loginIfNecessary : function() {
            var ele = $(this);
            var scope = ele.attr("scope");
            if (scope == undefined) {
                scope = 'email,publish_actions,user_friends';
            }
            RT.fb_ready.done(function() {
                FB.login(function (response) {
                    RT.fb_connected.done(function () {
                        if (ele.data("redirect") != undefined) {
                            window.location.href = ele.data("redirect");
                        }
                    });
                }, {scope: scope});
            });
        },

        editReview : function() {
            if (RT.LoginStatusModel.get("loginPlatformCode") == 'FBK') {
                $(".fb_button", this.el).show();
            }
        },

        postReview : function() {
            var score = this.model.get("score");
            var review = this.model.get("review");

            // Required to post to Facebook: toggle ON and score defined
            // true : rt:hasFacebookShareRatingEnabled(facebookId)
            if (RT.LoginStatusModel.get("loginPlatformCode") == 'FBK' && $(".fb-share_button", this.el).hasClass('on') && score != undefined) {
                this.postToFacebook(score, review); // Post score and review
            }
        },

        render: function() {
            var modelReview = this.model.get("review");
            var fb_button = $(".fb_button", this.el);

            // Show/hide Facebook checkbox
            if ((modelReview != undefined && modelReview.length > 0) ||
                RT.LoginStatusModel.get("loginPlatformCode") != 'FBK') {
                fb_button.hide();
            } else {
                fb_button.show();
            }

            this.$(".rating_button .stars.score*").addClass("on");
        },

        postToFacebook : function(score, review) {
            // Facebook checkbox is on, true : rt:hasFacebookShareRatingEnabled(facebookId)
            if ($(".fb-share_button", this.el).hasClass('on')) {
                console.log("Posting to Facebook.");
                var isReview = review != undefined && review.length > 0; // Check if there is review text
                var isMovie = this.model.url().indexOf("tvratings") == -1; // True if movie, False otherwise

                // Flush previous actions
                FB.api("/me/video.wants_to_watch", "GET", {
                    movie : $(location).attr('href')
                }, function(data) {
                    if (data.hasOwnProperty("error")) {
                        console.log("error message: " + data.error.code + " " + data.error.message);
                    } else if (data.hasOwnProperty("data") && data.data.length > 0) {
                        var action = data.data[0];
                        console.log("Prev action found (id=" + action.id + " type=" + action.type + "). Deleting.");
                        FB.api("/" + action.id, 'delete', function () {
                            console.log(action.type + " deleted");
                        });
                    } else {
                        console.log("No previous video:wants_to_watch actions found");
                    }
                });

                FB.api("/me/video.rates", "GET", {
                    movie : $(location).attr('href')
                }, function(data) {
                    if (data.hasOwnProperty("error")) {
                        console.log("error message: " + data.error.code + " " + data.error.message);
                    } else if (data.data && data.data.length > 0) {
                        var action=data.data[0];
                        console.log("Prev action found (id="+action.id+" type="+action.type+"). Deleting.");
                        FB.api("/"+ action.id, 'delete', function() {
                            console.log(action.type + " deleted");
                        });
                    } else {
                        console.log("No previous video:rates actions found");
                    }
                });

                var socialMsg = $(".socialMsg", this.el);

                // Want to see
                if ('wts' === score || '+' === score) {
                    socialMsg.html('Posting want to see').show().delay(3000).fadeOut('slow',
                            function() {
                        socialMsg.html("Added to your timeline").show();

                        var wtsObject = {
                                "fb:explicitly_shared": true,
                                "expires_in": 15768000 // hard code expires to 6 months in the future
                        };
                        wtsObject[isMovie ? 'movie' : 'tv_show'] = $(location).attr('href');

                        FB.api('/me/video.wants_to_watch', 'POST',
                                wtsObject, function(response) {
                            if (!response || response.error) {
                                console.log(response.error.code + ":" + response.error.message);
                            }
                            else {
                                console.log(response.id + " : " + "Action was successful");
                            }
                        });
                    });
                } else if ("-" === score || "ni" === score || "" === score || (score != undefined && parseInt(score) == 0)) { // Not interested
                    socialMsg.html("Removing Facebook action").show().delay(3000).fadeOut('slow',
                            function() {
                        socialMsg.html("Removed from your timeline").show();
                    });
                } else if (!isNaN(score) && isFinite(score)) { // Star score
                    socialMsg.html('Posting ' + score + ' star rating').show().delay(3000).fadeOut('slow',
                            function() {
                        socialMsg.html("Added to your timeline").show();

                        var starObject = {
                                "rating:value": score,
                                "rating:scale": 5,
                                "rating:normalized_value": score / 5,
                                "review_text": review,
                                "fb:explicitly_shared": true,
                                "expires_in": 2
                        };
                        starObject[isMovie ? 'movie' : 'tv_show'] = $(location).attr('href');

                        FB.api('/me/video.rates', 'post',
                                starObject, function(response) {
                            if (!response || response.error) {
                                console.log(response.error.code + ":" + response.error.message);
                            } else {
                                console.log(response.id + " : " + "Action was successful");
                            }
                        });
                    });
                }
            }
        }
    });

    //On-page rating database (ord)
    RT.ord = {
        movies: new RT.Backbone.Collections.MovieCollection(),
        tvSeasons: new RT.Backbone.Collections.TvSeasonCollection(),
        tvSeries: new RT.Backbone.Collections.TvSeriesCollection()
    };

    return {
        facebook: RT.Backbone.Views.FacebookManager,
        rating: RT.Backbone.Views.RatingWidget,
        tvSeasons: RT.Backbone.Collections.TvSeasonCollection,
        movies: RT.Backbone.Collections.MovieCollection,
        media: RT.Backbone.Models.Media
    };
});
