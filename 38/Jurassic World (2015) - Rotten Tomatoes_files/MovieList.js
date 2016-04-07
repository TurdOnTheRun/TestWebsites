define(["backbone", "bootstrap"], function(Backbone) {
    var MovieList = Backbone.View.extend({
        initialize: function(options){
            this.options = options || {};
            if (!options || options.bind) {
                _.bindAll(this);
            }

            // The ScrollOnly option activates the stickiness without the AJAX loading
            // TODO: Separate scrolling and ajax loading into different plugins

            if (!this.options.scrollOnly) {
                // Removes event handlers that were attached in global.js
                $(this.el).find(".movie_list").off("mouseup", "tr");

                $(document).bind('keydown', this.navigate);
                this.model.bind("change:movieVanity", this.render);

                this.render();
            }

            this.timerIds = [0];
            this.headerBottom = options.headerBottom;
            this.footerTop = options.footerTop;
            this.lockedPosition = ($("#main_movie_sidebar_content").height() * -1) + 40;
            this.isTvPage = options.isTvPage;
            
            /*
             * Removing movieList scroll.
             */
            /*if (this.isTvPage) {
                this.startPos = $("#movies_sidebar>.panel-rt").offset().top + 32;
                $(window).scroll(function() {
                    this.onTvScroll();
                }.bind(this));
                this.onTvScroll();
            } else {
                this.startPos = $("#movies_sidebar>.panel-rt").offset().top - 61;
                $(window).scroll(function() {
                    this.onScroll();
                }.bind(this));
                this.onScroll();
            }*/
        },

        events: {
            "click .movie_list tr a" : "navigateClick",
            "touchstart .movie_list tr" : "navigateClick",
            "mouseup .movie_list tr" : "navigateClick",
            "click .showMoreItems": "showMore"
        },

        onTvScroll: function() {
            var scrollTop = $(window).scrollTop();
            $("#movieListColumn").css("height", $("#mainColumn").height());
            var maxLengthScroll = $("#mainColumn").height() + this.startPos - $("#movies_sidebar").height();
            var superDivHeight = 0;
            if ($("#super").height() > 0) {
                superDivHeight = $("#super").height();
            }

            if (scrollTop <= this.startPos + superDivHeight - $("#top_leaderboard_wrapper").height()) {
                this.$el.removeAttr('style');
            } else if (scrollTop > maxLengthScroll) {
                this.$el.css({
                    'position': 'absolute',
                    'bottom': '0',
                    'top': 'auto'
                });
            } else if (scrollTop < 520) {
                $("#medrec_top_ad").show();
                this.$el.css({
                    "position": "fixed",
                    "top": $("#top_leaderboard_wrapper").height(),
                    "z-index": 65535
                });
            } else {
                $("#medrec_top_ad").slideUp("slow");
                this.$el.css({
                    "position": "fixed",
                    "top": "0",
                    "z-index": 65535
                });
            }
        },

        onScroll: function() {
            var scrollTop = $(window).scrollTop();
            $("#movieListColumn").css("height", $("#mainColumn").height());
            var maxLengthScroll = $("#mainColumn").height() + this.startPos - $("#movies_sidebar").height();
            var superDivHeight = 0;
            if ($("#super").height() > 0) {
                superDivHeight = $("#super").height();
            }
            if (scrollTop <= $("#header_and_leaderboard").height() + superDivHeight) {
                $("#medrec_top_ad").show();
                this.$el.removeAttr('style');
                this.timerIds.forEach(clearTimeout);
                this.timerIds = [];
            } else if ((scrollTop + this.startPos) > maxLengthScroll) {
                this.timerIds.forEach(clearTimeout);
                this.timerIds = [];
                this.$el.css({
                    'position': 'absolute',
                    'bottom': '0',
                    'top': 'auto'
                });
            } else if(scrollTop > $("#header_and_leaderboard").height() + superDivHeight) {
                this.timerIds.push(setTimeout(function(){
                    $("#medrec_top_ad").slideUp("slow");
                }, 2000));
                this.$el.css({
                    "position": "fixed",
                    "top": "0",
                    "z-index": 65535
                });
            }
        },

        showMore: function(evt) {
            var currentObject = $(evt.currentTarget);
            $("."+currentObject.data("show"),this.$el).show();

            currentObject.hide();
            if (currentObject.siblings("showAll").length > 0) {
                currentObject.siblings("showAll").show();
            }
        },

        navigateClick : function(evt) {
            switch (evt.which) {
                case 1:
                    var href = $(evt.currentTarget).find("a").addBack().filter("a").attr("href");
                    evt.preventDefault();
                    window.location.href=href;
            }
        },

        navigateKey : function(e) {
            var currRow = $(".movie-list-selected",this.el);
            var rowList = $(".movie_list tr", this.el);
            var currPos = rowList.index(currRow);

            if (e.keyCode == 37) { // LEFT
                if (currPos > 0) {
                    var href = $(rowList).eq(currPos-1).find("a").attr("href");
                    Backbone.history.navigate(href, true);
                }
                e.preventDefault();
            } else if (e.keyCode == 39){ // DOWN
                var href = $(rowList).eq(currPos+1).find("a").attr("href");
                if (href != null) {
                    Backbone.history.navigate(href, true);
                }
                e.preventDefault();
            }
        },

        render : function() {
            var el = this.el;
            var model = this.model;

            $(el).find("tr").removeClass("movie-list-selected");
            var selectedMovie =$("[href='/m/"+ model.get("movieVanity") +"/']", el);
            selectedMovie.parents("tr").addClass("movie-list-selected");

            // Switch tabs if necessary
            var parentTabPane =selectedMovie.parents(".tab-pane");
            var parentTabPaneId = parentTabPane.attr("id");

            if(!parentTabPane.hasClass("active")){
                $('.nav-tabs a[href=#'+ parentTabPaneId +']', el).tab('show');
            }
        }
    });
    return MovieList;
});
