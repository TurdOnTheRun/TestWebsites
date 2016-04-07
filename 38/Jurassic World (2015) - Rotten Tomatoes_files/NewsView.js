define([
    "jquery",
    "globals",
    "../App.js"
], function($,RT,News) {
    News.module("View", function(NewsView, News, Backbone, Marionette, $, _) {
        _.templateSettings = {
            interpolate: /\<\@\=(.+?)\@\>/gim,
            evaluate: /\<\@(.+?)\@\>/gim
        };
        NewsView.NewsItem = Marionette.ItemView.extend({
            className: "newsRow col-sm-8 col-full-xs",
            initialize: function(options) {
                this.template = _.template(options.NewsItemTemplate);
            },
            serializeData: function() {
                return {
                    link: this.model.get("link"),
                    displayPhotoUrl: this.model.get("displayPhotoUrl"),
                    title: this.model.get("title")
                }
            }
        });
        NewsView.NewsPanel = Marionette.CompositeView.extend({
            childView: NewsView.NewsItem,
            childViewOptions: {},
            childViewContainer: "#contentNews",
            initialize: function(options) {
                this.collection = options.collection;
                this.template = _.template(options.NewsBoxTemplate);
                this.childViewOptions.NewsItemTemplate = options.NewsItemTemplate;
            }
        });
    });
    return News.View;
});