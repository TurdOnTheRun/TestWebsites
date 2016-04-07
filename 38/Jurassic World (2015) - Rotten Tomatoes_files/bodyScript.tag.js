// Push user reg info to GTM (note = won't work any more once we stop preloading userinfo).
// Should use a  change listener on the LoginStatusModel insteaad.
define([
    "jquery",
    "underscore",
    "backbone",
    "globals",
    "jquery-cookie",
    "device",
    "domReady!"
], function($, _, Backbone, RT) {
    return Backbone.View.extend({
        events: {
            "click #fullSite": "onFullSiteClick",
            "click #mobileApp": "onMobileAppClick",
            "click #footer-mobile": "onMobileAppClick"
        },
        initialize: function (options) {
            if (RT.LoginStatusModel.userType != "anon" && Date.now() - Date.parse(RT.LoginStatusModel.registerDate) > 1800000) {
                dataLayer.push({'registration': RT.LoginStatusModel.userType});
            }
            dataLayer.push({'usertype': RT.LoginStatusModel.userType});
            RT.adRefresh = _.throttle(function () {
                googletag.pubads().refresh();
            }, 5000);
            require(["bootstrap"], function() {
                //Activate all bootstrap tooltips
                $("[data-toggle='tooltip']").tooltip({
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            });

            var pageViewCount = "pvc";
            var pageViewCountCookieValue = $.cookie(pageViewCount);
            var date = new Date();
            var minutes = 60;
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            if (pageViewCountCookieValue != null) {
                $.cookie(pageViewCount, parseInt(pageViewCountCookieValue) + 1, {path: '/', expires: date});
            }

            require([
                RT.StaticHost + "/js/app/models/NewsModel.js!",
                RT.StaticHost + "/js/app/models/PageHeaderModel.js!",
                RT.StaticHost + "/js/app/views/PageHeaderNewsView.js!"
            ], function (NewsModel, PageHeaderModel, PageHeaderNewsView) {
                var newsItem = new NewsModel.NewsItems({ limit: 2, excludeColumn: 39 });
                var hubItem = new NewsModel.NewsItems({ limit: 2, hub: true });
                var totalRecallItem = new NewsModel.NewsItems({ limit: 2, column: 39 });
                var pageHeaderItems = new PageHeaderModel.PageHeaderModel({ country: options.country });
                this.newsMenuLoaded = false;
                this.$("#newsMenu").mouseenter(this.onNewsMenuMouseEnter.bind(this, newsItem, hubItem, totalRecallItem, PageHeaderNewsView));
                this.pageHeaderLoaded = false;
                this.$("#movieMenu, #tvMenu").mouseenter(this.onMovieTvMenuMouseEnter.bind(this, pageHeaderItems, PageHeaderNewsView));
            }.bind(this));

            require([
                RT.StaticHost + "/js/search.js",
                "text!" + RT.StaticHost + "/templates/SearchModal.item.movie.html",
                "text!" + RT.StaticHost + "/templates/SearchModal.item.tv.html",
                "text!" + RT.StaticHost + "/templates/SearchModal.item.celeb.html",
                "text!" + RT.StaticHost + "/templates/SearchModal.item.critic.html",
                "text!" + RT.StaticHost + "/templates/SearchModal.item.franchise.html"
            ], function (SearchView, MovieTemplate, TvTemplate, CelebTemplate, CriticTemplate, FranchiseTemplate) {
                new SearchView({
                    el: $(".desktopNav"),
                    MovieTemplate:MovieTemplate,
                    TvTemplate:TvTemplate,
                    CelebTemplate:CelebTemplate,
                    CriticTemplate:CriticTemplate,
                    FranchiseTemplate:FranchiseTemplate
                });
            });

            require([
                RT.StaticHost + "/js/app/views/SocialTool.js",
                "text!" + RT.StaticHost + "/templates/SocialTools.html"
            ], function(SocialTools, SocialToolTemplate) {
                var SocialToolOptions = {
                    SocialToolTemplate: SocialToolTemplate
                };
                if ('mob' == options.pageId) {
                    SocialToolOptions.movieId  = options.movieId;
                } else if ('tvseries' == options.pageId || 'tvseason' == options.pageId || 'tvseries' == options.pageId) {
                    SocialToolOptions.tvSeriesId = options.tvSeriesId/**/;
                }
                var socialTools = new SocialTools(SocialToolOptions);
                socialTools.render();
                $("body").append(socialTools.$el);
            }.bind(this));
        },
        onFullSiteClick: function () {
            $.cookie("forcedFullSite", "true", {expires: 14, path: "/"});
        },
        onMobileAppClick: function () {
            if (device.windowsPhone()) {
                window.location.href = "http://www.windowsphone.com/en-us/store/app/flixster/7dc02baf-a7d6-df11-a844-00237de2db9e";
            } else if (device.android()) {
                window.location.href = "https://market.android.com/details?id=net.flixster.android";
            } else if (device.ios()) {
                window.location.href = "https://itunes.apple.com/us/app/movies-by-flixster-rotten/id284235722?mt=8";
            } else if (device.blackberry()) {
                window.location.href = "http://appworld.blackberry.com/webstore/content/2180";
            }
        },
        onNewsMenuMouseEnter: function (newsItem, hubItem, totalRecallItem, PageHeaderView) {

            if (!this.newsMenuLoaded && !RT.NewsThrottle.header) {
                newsItem.fetch({
                    success: function () {
                        if (newsItem.size() > 0) {
                            var newsView = new PageHeaderView.NewsPanel({collection: newsItem});
                            newsView.render();
                            $("#header-news-rtnews .newsContainer").html(newsView.$el);
                        }
                    }.bind(this)
                });
                hubItem.fetch({
                    success: function () {
                        if (hubItem.size() > 0) {
                            var newsView = new PageHeaderView.NewsPanel({collection: hubItem});
                            newsView.render();
                            $("#header-news-guides .newsContainer").html(newsView.$el);
                        }
                    }.bind(this)
                });
                totalRecallItem.fetch({
                    success: function () {
                        var newsView = new PageHeaderView.NewsPanel({collection: totalRecallItem});
                        newsView.render();
                        $("#header-news-best-worst .newsContainer").html(newsView.$el);
                    }.bind(this)
                });
            }
            this.newsMenuLoaded = true;
        },
        onMovieTvMenuMouseEnter: function (pageHeaderItems, PageHeaderView) {
            if (!this.pageHeaderLoaded) {
                pageHeaderItems.fetch({
                    success: function () {
                        var item = null,
                            view = null;
                        $("#header-certified-fresh-picks").html("");
                        for (var i = 0; i < pageHeaderItems.get("movies").promoItems.length; ++i) {
                            item = pageHeaderItems.get("movies").promoItems[i];
                            view = new PageHeaderView.CFPItem({
                                item: item
                            });
                            view.render();
                            $("#header-certified-fresh-picks").append(view.$el);
                        }
                        item = pageHeaderItems.get("tv").promoItems;
                        view = new PageHeaderView.CFPItem({
                            item: item
                        });
                        view.render();
                        $("#header-tv-certified-fresh").html(view.$el);
                        $("#header-tv-col1 .title").html(pageHeaderItems.get("tv").mediaLists[0].title);
                        $("#header-tv-col1 table").html("");
                        for (i = 0; i < pageHeaderItems.get("tv").mediaLists[0].shows.length; ++i) {
                            item = pageHeaderItems.get("tv").mediaLists[0].shows[i];
                            view = new PageHeaderView.ListItem({
                                item: item
                            });
                            view.render();
                            $("#header-tv-col1 table").append(view.$el);
                        }
                        $("#header-tv-col2 .title").html(pageHeaderItems.get("tv").mediaLists[1].title);
                        $("#header-tv-col2 table").html("");
                        for (i = 0; i < pageHeaderItems.get("tv").mediaLists[1].shows.length; ++i) {
                            item = pageHeaderItems.get("tv").mediaLists[1].shows[i];
                            view = new PageHeaderView.ListItem({
                                item: item
                            });
                            view.render();
                            $("#header-tv-col2 table").append(view.$el);
                        }
                    }.bind(this)
                });
            }
            this.pageHeaderLoaded = true;
        },
    });
});