define([
    "jquery",
    "globals",
    "underscore"
], function($, RT, _) {
    _.templateSettings = {
        interpolate: /\<\@\=(.+?)\@\>/gim,
        evaluate: /\<\@(.+?)\@\>/gim
    };
    return {
        load: function (resourceId, require, load) {
            require([
                RT.StaticHost + "/js/app/App.js"
            ], function(PageHeader) {
                PageHeader.module("PageHeaderModel", function(PageHeaderModel,PageHeader,Backbone,Marionette,$,_) {
                    PageHeaderModel.PageHeaderModel = Backbone.Model.extend({
                        url: RT.CloudfrontHost + "/api/private/v1.0/wordpress/header",
                        initialize: function(options) {
                            if (options && options.country) {
                                this.url += "?country=" + options.country;
                            }
                        },
                        sync: function(method, model, options) {
                            var params = _.extend({
                                type: "GET",
                                dataType: "json",
                                url: model.url,
                                processData: false
                            }, options);
                            return $.ajax(params);
                        }
                    });
                });
                load(PageHeader.PageHeaderModel);
            });
        }
    };
});
