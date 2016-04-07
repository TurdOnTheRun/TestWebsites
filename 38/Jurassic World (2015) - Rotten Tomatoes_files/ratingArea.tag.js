define([
    "jquery",
    "backbone",
    "globals",
    "domReady!"
], function($, Backbone, RT) {
    return Backbone.View.extend({
        initialize: function(options) {
            require([RT.StaticHost + "/js/app/views/RatingV2.js"], function(ratingV2) {
                var RatingWidget = ratingV2.rating;
                var FacebookManager = ratingV2.facebook;

                new RatingWidget({el: options.currentTarget});
                new FacebookManager({el: options.currentTarget});
            });
        }
    });
});