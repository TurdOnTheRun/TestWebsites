define([
    "jquery",
    "globals",
    "../App.js",
], function($,RT,Recommendation) {
    Recommendation.module("View", function(RecommendationView, Recommendation, Backbone, Marionette, $, _) {
        _.templateSettings = {
            interpolate: /\<\@\=(.+?)\@\>/gim,
            evaluate: /\<\@(.+?)\@\>/gim
        };
        RecommendationView.RecommendationItem = Marionette.ItemView.extend({
            className: "recItem",
            initialize: function(options) {
                this.template = _.template(options.RecommendationTemplate);
            }
        });
        RecommendationView.RecommendationPanel = Marionette.CollectionView.extend({
            className: "recPanel",
            childView: RecommendationView.RecommendationItem,
            childViewOptions: {},
            initialize: function(options) {
                this.collection = options.collection;
                this.childViewOptions.RecommendationTemplate = options.RecommendationTemplate;
            }
        });
    });
    return Recommendation.View;
});