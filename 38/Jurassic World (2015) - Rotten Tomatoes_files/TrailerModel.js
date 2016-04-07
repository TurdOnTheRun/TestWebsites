define([
    "globals",
    "../App.js"
], function(RT, MovieVideoClip) {
    return Backbone.Collection.extend({
        model: Backbone.Model,
        url: RT.CloudfrontHost + "/api/private/v1.1a/movies/",
        initialize: function(options) {
            this.url += options.movieVanity + "/videos.json";
        },
        parse: function(response) {
            return response.videoClips;
        }
    });
});