define([
    "jquery",
    "globals",
    "../App.js"
], function($,RT,News) {
    News.module("HomepageView", function(NewsView, News, Backbone, Marionette, $, _) {
        NewsView.NewsItem = Marionette.ItemView.extend({
            tagName:"li",
            initialize:function(options) {
                this.model = options.model;
                this.template = _.template(options.NewsItemTemplate);
            }
        });
    });
    return News.HomepageView;
});