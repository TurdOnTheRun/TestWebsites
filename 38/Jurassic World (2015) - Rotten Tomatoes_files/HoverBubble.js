define([
    "jquery", "underscore", "backbone", "globals", "text!../../../templates/hoverBubble.html", "./RatingV2.js"
], function($, _, Backbone, RT, HoverBubbleTempl) {
    var HoverBubble = Backbone.View.extend({
        initialize: function(options){
            if (!options || options.bind) {
                _.bindAll(this);
            }

            this.hoverBubbleTmpl = HoverBubbleTempl;
            this.removeTimeout=null;
            this.topOffset = 0;
            if (options.hasOwnProperty("topOffset")) {
                this.topOffset = options.topOffset;
            }
            this.leftOffset = 0;
            if (options.hasOwnProperty("leftOffset")) {
                this.leftOffset = options.leftOffset;
            }

            this.fade = options.fade;
            if (this.fade) {
                this.bubble = $('<div class="hoverBubble fade"></div>');
            } else {
                this.bubble = $('<div class="hoverBubble"></div>');
            }
            this.acceptedId = -1;
            this.right = options.right;
            this.below = options.below;
            this.dontShow = false;
            $(window).scroll(function(evt) {
                this.removeHoverBubble(this.bubble);
            }.bind(this));
        },

        events: {
            "mouseenter .movie_list tr" : "onmouseenterRow",
            "mouseleave .movie_list tr" : "onmouseleaveRow",

            "mouseenter .pagination a" : "onmouseenterRow",
            "mouseleave .pagination a" : "onmouseleaveRow",

            "mouseenter .mb-movie" : "onmouseenterRow",
            "mouseleave .mb-movie" : "onmouseleaveRow",

            "mouseenter .hoverBubble" : "onmouseenterBubble",
            "mouseleave .hoverBubble" : "onmouseleaveBubble",

            "click .movie_list tr" : "clickRow",
            "click .mb-movie" : "clickRow",

            "click .showMore": "showMore"
        },

        getDataFromEl: function(ele) {
            var movieId = ele.data("movie-id"),
                seasonId = ele.data("season-id"),
                seriesId = ele.data("series-id"),
                episodeId = ele.data("episode-id");
            if (movieId) {
                return "movie-"+movieId;
            } else if (seasonId) {
                return "season-"+seasonId;
            } else if (seriesId) {
                return "series-" + seriesId;
            } else if (episodeId) {
                return "episode-" + episodeId;
            }
        },

        onmouseenterRow : function(evt) {
            var currentTarget = $(evt.currentTarget);
            if (this.bubble.data("removeTimeout") && this.bubble.data("id") == this.getDataFromEl(currentTarget)) {
                this.cancelRemoveHoverBubble(this.bubble);
            } else {
                if (this.bubble.data("removeTimeout")) {
                    this.cancelRemoveHoverBubble(this.bubble);
                }
                this.renderHoverBubble(currentTarget);
            }
        },

        onmouseleaveRow : function(evt) {
            this.removeHoverBubble(this.bubble, true);
        },

        clickRow : function(evt) {
            this.removeHoverBubble(this.bubble, true);
        },

        showMore: function() {
            this.$el.find(".synopsisMore").removeClass("synopsisMore");
            this.$el.find(".showMore").remove();
            this.$el.find(".ellipse").remove();
        },

        onmouseenterBubble : function(evt) {
            this.cancelRemoveHoverBubble(this.bubble);
        },

        onmouseleaveBubble : function(evt) {
            this.removeHoverBubble(this.bubble);
        },

        renderHoverBubble : function(ele) {
            var pos = ele.position(),
                bubbleWidth = 240,
                movieId = ele.data("movie-id"),
                seasonId = ele.data("season-id"),
                seriesId = ele.data("series-id"),
                episodeId = ele.data("episode-id");

            this.bubble.removeClass("in");
            this.bubble.removeClass("left");

            this.bubble.data("row", ele);
            this.acceptedId = this.getDataFromEl(ele);

            this.loading = true;

            this.$el.append(this.bubble);

            var view = this,
                fillBubble = function(data) {
                    if (view.dontShow || view.acceptedId != view.getDataFromEl(ele)) {
                        view.dontShow = false;
                        view.loading = false;
                        return;
                    }

                    var bubbleContent = $(_.template(view.hoverBubbleTmpl)(data));
                    view.bubble.removeClass("in");
                    view.bubble.html(bubbleContent);
                    if (view.right) {
                        view.bubble.addClass("right");
                        view.bubble.css("left", -view.leftOffset-bubbleWidth);
                    } else if (view.below) {
                        view.bubble.addClass("bottom");
                        view.bubble.css("left", view.bubble.parent().position().left);
                    } else {
                        view.bubble.css("left", pos.left + ele.width() - view.leftOffset);
                    }
                    setTimeout(function() {
                        if (view.dontShow || view.acceptedId != view.getDataFromEl(ele)) {
                            view.dontShow = false;
                            view.loading = false;
                            return;
                        }

                        if (view.bubble.data("id") == view.getDataFromEl(ele)) {
                            view.bubble.addClass("in");
                        } else {
                            view.bubble.data("id", view.getDataFromEl(ele));
                            if (view.below) {
                                view.calculateBottomBubble(view, ele);
                            } else {
                                view.calculateRightLeftBubble(view, ele);
                            }

                            view.dontShow = false;
                            view.loading = false;
                        }
                    }, 500);
                };

            if (!view.dontShow && view.acceptedId == view.getDataFromEl(ele)) {
                if (movieId) {
                    RT.ord.movies.getCurrentUserRating(movieId).deferred.done(function (data) {
                        fillBubble(data);
                    });
                } else if (seasonId) {
                    RT.ord.tvSeasons.getCurrentUserRating(seasonId).deferred.done(function (data) {
                        fillBubble(data);
                    });
                } else if (seriesId) {
                    RT.ord.tvSeries.getCurrentUserRating(seriesId).deferred.done(function (data) {
                        fillBubble(data);
                    });
                }
            }
        },

        calculateRightLeftBubble: function(view, ele) {
            var pos = ele.position();
            view.bubble.removeClass("in");
            view.bubble.addClass("in");

            var bubbleTop = pos.top - $(".bubbleContent", view.bubble).height() - view.topOffset + 75,
                bubbleBottom = bubbleTop + $(".bubbleContent", view.bubble).height();
            var blipBottom = 75;
            if (bubbleTop < $(window).scrollTop() - view.$el.offset().top) {
                blipBottom = 75 - (bubbleTop - ($(window).scrollTop() - view.$el.offset().top));
                view.$(".before, .after").css("bottom", blipBottom + "px");
                bubbleTop = $(window).scrollTop() - view.$el.offset().top;
            } else if (bubbleBottom > $(window).scrollTop() + $(window).height() - view.$el.offset().top) {
                blipBottom = 75 - bubbleTop + $(window).scrollTop() + $(window).height() - view.$el.offset().top - $(".bubbleContent", view.bubble).height() - 20;
                if (blipBottom < 2) {
                    blipBottom = 2;
                }
                view.$(".before, .after").css("bottom", blipBottom + "px");
                bubbleTop = $(window).scrollTop() + $(window).height() - view.$el.offset().top - $(".bubbleContent", view.bubble).height() - 20;
            } else {
                view.$(".before, .after").css("bottom", blipBottom + "px");
            }
            view.bubble.css("top", bubbleTop);
        },

        calculateBottomBubble: function(view, ele) {
            var pos = ele.position();
            view.bubble.removeClass("in");
            view.bubble.addClass("in");

            view.bubble.css("left", pos.left - view.bubble.width()/2);
        },

        removeHoverBubble : function(bubble) {
            if (this.loading) {
                this.dontShow = true;
            }
            if (bubble != undefined) {
                bubble.data("removeTimeout", setTimeout(function() {
                    bubble.removeClass("in");
                }, 500));
            }
        },

        cancelRemoveHoverBubble : function(bubble){
            clearTimeout(bubble.data("removeTimeout"));
            bubble.removeData("removeTimeout");
            $(".hoverBubble").removeClass("in");
            bubble.addClass("in");
            if (this.loading) {
                this.dontShow = false;
            }
        }
    });

    return HoverBubble;
});