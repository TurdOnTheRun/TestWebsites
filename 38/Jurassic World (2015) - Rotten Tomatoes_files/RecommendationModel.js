define([
    "globals",
    "../App.js"
], function(RT, Recommendation) {
    Recommendation.module("RecommendationModel", function(RecommendationModel,Recommendation,Backbone,Marionette,$,_) {
        RecommendationModel.RecommendationModelItem = Backbone.Model.extend({
            initialize: function(options) {
                this.options = options || {};
            }
        });
        RecommendationModel.RecommendationModelItems = Backbone.Collection.extend({
            model: RecommendationModel.RecommendationModelItem,
            url: "",
            initialize: function(options) {
                this.url = RT.CloudfrontHost + "/api/private/v1.0/movies/" + options.movieId + "/recommendations/";
            }
        });
    });
    return Recommendation.RecommendationModel;
});