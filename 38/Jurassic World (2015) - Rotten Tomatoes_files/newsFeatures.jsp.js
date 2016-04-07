define(["globals", "backbone"], function(RT, Backbone) {
    return Backbone.View.extend({
        initialize: function(options) {
            this.$el = options.el;
            if (!RT.NewsThrottle.newsAndFeature) {
                require([
                    RT.StaticHost + "/js/app/models/NewsModel.js!",
                ], function (NewsModel) {
                    var newsItem = new NewsModel.NewsItems({
                        thirdPartyOnly: true,
                        limit:7
                    });
                    newsItem.fetch({
                        success: function() {
                            this.$el.html("");
                            if (newsItem.size() > 0) {
                                require([
                                    RT.StaticHost + "/js/app/views/HomepageNewsView.js",
                                    "text!" + RT.StaticHost + "/templates/News.Homepage.item.html"
                                ], function(HomepageNewsView, NewsItemTemplate) {
                                    for (var i = 0; i < newsItem.models.length; ++i) {
                                        var newsView = new HomepageNewsView.NewsItem({
                                            model: newsItem.models[i], count: 7,
                                            NewsItemTemplate: NewsItemTemplate
                                        });
                                        newsView.render();
                                        $("#latest-entertainment-headlines").append(newsView.$el);
                                    }
                                });
                            }
                        }.bind(this)
                    })
                }.bind(this));
            }
        }
    });
});