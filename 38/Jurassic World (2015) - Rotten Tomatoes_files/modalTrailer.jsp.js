define([
    "jquery",
    "globals",
    "underscore",
    "backbone",
    "marionette",
    "bootstrap"
], function($, RT, _, Backbone, Marionette) {
    var IFrameTrailerModal = Backbone.View.extend({
        events: {
            "click .closebutton": "closeTrailerIframeModal"
        },
        initialize: function(options) {
            this.$el = options.el;
            this.metaViewport = $("meta[name='viewport']");
            this.currentViewportValue = this.metaViewport.attr("content");
            this.$el.on('hidden.bs.modal', this.onClose.bind(this));
        },
        openIframeModal: function(dataTrailerUrl, sponsoredText, sponsoredUrl) {
            this.$el.modal();
            this.$("#iframeVideoPlayer").attr("src", dataTrailerUrl);
            this.metaViewport.attr("content", this.currentViewportValue + ",minimum-scale=1,maximum-scale=1,user-scalable=no");
            this.$(".modal-dialog").append("<div class='modal-link-text'><a target='_blank' class='modal-link-url' style='color:#FFFFFF' href=" + sponsoredUrl + "></a></div>");
            this.$(".modal-link-url").text(sponsoredText);
        },
        closeTrailerIframeModal: function() {
            $("#newIframeTrailerModal").modal('hide');
        },
        onClose: function() {
            console.log("Destroying video iframe");
            this.$("#iframeVideoPlayer").attr("src", "about:blank");
            this.metaViewport.attr("content", this.currentViewportValue);
        }
    });
    var TrailerModal = Backbone.View.extend({
        events: {
            "click .closebutton": "closeTrailerModal",
            "click .closeBtn": "closeTrailerModal"
        },
        initialize: function(options) {
            this.$el = options.el;
        },
        closeTrailerModal : function() {
            this.$el.modal('hide');
            if (null != this.currentTrailer) {
                this.currentTrailer.close();
                this.currentTrailer = null;
            }
        },
        openNewModal: function(urlHLS, urlMP4, thumbnail, title, autostart, videoId, noAds) {
            require([RT.StaticHost + "/js/app/views/RTVideo.js"], function(RTVideo) {
                var options = {
                    $el: this.$("#videoPlayer"),
                    urlHLS: urlHLS,
                    urlMP4: urlMP4,
                    width: "100%",
                    thumbnailImg: thumbnail,
                    autostart: autostart,
                    noAds: noAds,
                    preroll: {
                        dfpTarget: "video/trailers",
                        custParams: {videoId: videoId},
                        pageUrl: window.location.href
                    }
                };
                if ($(window).width() < 768) {
                    options.playerComplete = this.closeTrailerModal.bind(this);
                }
                this.currentTrailer = new RTVideo(options);

                this.currentTrailer.on("end-warning", function(){
                   this.$el.find(".player-poststitial").css("opacity", 1);
                }.bind(this));
            }.bind(this));
            this.$el.modal();
            this.$el.on("hidden.bs.modal", this.closeTrailerModal.bind(this));
            dataLayer.push({'event': 'ModalTrailer', 'title': title });
        }
    });

    var TrailerCarouselItem = Marionette.ItemView.extend({
        className: "fixedTrailerItem",
        events: {
            "click": "onClick"
        },
        template: _.template("<img src='<@= thumbUrl @>' /><div class='playButton'><span class='glyphicon glyphicon-play-circle light-translucent white'/></div>"),
        initialize: function(options) {
            this.model = options.model;
            this.parentView = options.parentView;
        },
        onClick: function() {
            this.parentView.onItemClick(
                this.model.get("id"),
                this.model.get("mp4Url"),
                this.model.get("hlsUrl"),
                this.model.get("thumbUrl"));
        }
    });

    var TrailerCarousel = Marionette.CompositeView.extend({
        className: "fixedTrailerPanel bottom hide",
        childView: TrailerCarouselItem,
        childViewOptions: {},
        childViewContainer: ".fixedTrailerItemContainer",
        template: _.template("<div class='fixedTrailerPanelBody'><div class='fixedTrailerItemContainer'></div></div>"),
        initialize: function(options) {
            this.collection = options.collection;
            this.childViewOptions.parentView = this;
            this.parentView = options.parentView;
        },
        onItemClick: function(id, mp4Url, hlsUrl, thumbUrl) {
            this.parentView.changeVideo({
                id: id,
                urlMP4: mp4Url,
                urlHLS: hlsUrl,
                thumbnailImg: thumbUrl,
                autostart: true,
                width:"100%"
            });
        }
    });

    return Marionette.ItemView.extend({
        events: {
            "click .trailer_play_action_button": "openModal",
            "click .featured_video_play_action_button": "openIFrameModal"
        },
        initialize: function(options) {
            this.$el = options.el;
            this.modalInit = false;
            this.modalCallback = null;
            this.trailerCarousel = null;
            require(["text!" + RT.StaticHost + "/templates/modalTrailer.html"], function(modalTrailer) {
                $("body").append(modalTrailer);
                this.trailerModal = new TrailerModal({
                    el: $("#newTrailerModal")
                });
                if (options.vanity) {
                    require([
                        RT.StaticHost + "/js/app/models/TrailerModel.js"
                    ], function(TrailerModel) {
                        var trailerModel = new TrailerModel({
                            movieVanity: options.vanity
                        });
                        trailerModel.fetch({
                            data: {
                                offset: 0,
                                limit: 4
                            },
                            success: function() {
                                this.trailerCarousel = new TrailerCarousel({
                                    collection: trailerModel,
                                    parentView: this
                                });
                                this.trailerCarousel.render();
                                this.trailerModal.$el.append(this.trailerCarousel.$el);
                            }.bind(this)
                        });
                    }.bind(this));
                }
                this.modalInit = true;
                if (this.modalCallback) {
                    this.modalCallback();
                    this.modalCallback = null;
                }
            }.bind(this));
            if (options.vanity) {
                require([
                    RT.StaticHost + "/js/app/models/TrailerModel.js"
                ], function(TrailerModel) {
                    var trailerModel = new TrailerModel({
                        movieVanity: options.vanity
                    });
                    trailerModel.fetch({
                        data: {
                            offset: 0,
                            limit: 4
                        },
                        success: function() {
                            this.trailerCarousel = new TrailerCarousel({
                                collection: trailerModel,
                                parentView: this
                            });
                            this.trailerCarousel.render();
                        }.bind(this)
                    });
                }.bind(this));
            }

            this.iframeInit = false;
            this.iframeCallback = null;
            require(["text!" + RT.StaticHost + "/templates/modalTrailer.iframe.html"], function(modalTrailerIframe) {
                $("body").append(modalTrailerIframe);
                this.iFrameTrailerModal = new IFrameTrailerModal({
                    el: $("#newIframeTrailerModal")
                });
                this.iFrameTrailerModal.render();
                this.iframeInit = true;
                if (this.iframeCallback) {
                    this.iframeCallback();
                    this.iframeCallback = null;
                }
            }.bind(this));
        },
        changeVideo: function(options) {
            this.trailerModal.currentTrailer.changeVideo(options);
        },
        openIFrameModal: function(ev) {
            ev.preventDefault();
            var clickedObject = $(ev.currentTarget);
            if (this.iframeInit) {
                this.iFrameTrailerModal.openIframeModal(
                    clickedObject.attr("data-trailer-url"),
                    clickedObject.data("sponsoredText"),
                    clickedObject.data("sponsoredUrl")
                );
            } else {
                this.iframeCallback = function() {
                    this.iFrameTrailerModal.openIframeModal(
                        clickedObject.attr("data-trailer-url"),
                        clickedObject.data("sponsoredText"),
                        clickedObject.data("sponsoredUrl")
                    );
                }.bind(this)
            }
        },
        openModal: function(ev) {
            ev.preventDefault();
            var clickedObject = $(ev.currentTarget);
            if (this.modalInit) {
                this.trailerModal.openNewModal(
                    clickedObject.data("hls-url"),
                    clickedObject.data("mp4-url"),
                    clickedObject.data("thumbnail"),
                    clickedObject.data("title"),
                    true,
                    clickedObject.data("video-id"),
                    clickedObject.data("no-ads")
                );
            } else {
                this.modalCallback = function() {
                    this.trailerModal.openNewModal(
                        clickedObject.data("hls-url"),
                        clickedObject.data("mp4-url"),
                        clickedObject.data("thumbnail"),
                        clickedObject.data("title"),
                        true,
                        clickedObject.data("video-id"),
                        clickedObject.data("no-ads")
                    );
                }.bind(this)
            }
        }
    })
});