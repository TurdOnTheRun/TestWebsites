/**
 * ArsonalVideoCuepoint
 */
(function () {

    this.ArsonalVideoCuepoint = function(id, time) {
        this.id = id;
        this.time = time;
        this.enabled = true;
    };

    ArsonalVideoCuepoint.prototype.constructor = ArsonalVideoCuepoint;

})();

/**
 * ArsonalDCVideo
 */
(function () {

    this.ArsonalDCVideo = function(id, elementId, sourceMP4, sourceWEBM, videoDuration, autoplay, automuted) {
        this.observers = [];
        this.id = id;
        this.elementId = elementId;
        this.sourceMP4 = sourceMP4;
        this.sourceWEBM = sourceWEBM;
        this.videoDuration = videoDuration;
        this.time = 0;
        this.autoplay = autoplay || false;
        this.isVideoPlaying = false;
        this.isVideoComplete = false;
        this.isVideoBuffering = false;
        this.isVideoLoaded = false;
        this.automuted = automuted || true;
        this.isVideoMuted = this.automuted;
        this.videoPlaybackInterval = 0;
        this.element = null;
        this.cuepoints = [];
        this.videoComponent = null;
        this.videoComponentElement = null;
        this.millisecondsBeforeBufferIsValidated = 500;
        this.millisecondsBeforeVideoLoadedIsValidated = 1000;
    };

    ArsonalDCVideo.prototype = new Notifier();
    ArsonalDCVideo.prototype.constructor = ArsonalDCVideo;

    ArsonalDCVideo.prototype.initialize = function() {
        if(this.videoComponent) return;
        this.removeCuepoints();
        this.videoComponent = new studio.sdk.rad.Video({
            id: this.id,
            autoplay: false,
            sources: [this.sourceMP4, this.sourceWEBM]
        });
        this.element = document.getElementById(this.elementId);
        studio.video.Reporter.attach(this.id, this.element, this.autoplay);
        this.videoComponent.setElement(this.element);
        this.videoComponentElement = this.videoComponent.getVideoElement();
        if(this.autoplay) {
            this.play();
        }
        if(this.automuted) {
            this.videoComponentElement.volume = 0.0;
        }
        this.addVideoEvents();
    };

    ArsonalDCVideo.prototype.play = function() {
        if(this.isVideoPlaying) return;
        this.isVideoBuffering = true;
        this.videoComponentElement.play();
        clearInterval(this.videoPlaybackInterval);
        this.videoPlaybackInterval = setInterval(this._videoProgress.bind(this), 100);
    };

    ArsonalDCVideo.prototype.pause = function() {
        this.isVideoPlaying = false;
        this.videoComponentElement.pause();
        clearInterval(this.videoPlaybackInterval);
    };

    ArsonalDCVideo.prototype.mute = function() {
        this.isVideoMuted = true;
        this.videoComponentElement.volume = 0.0;
    };

    ArsonalDCVideo.prototype.unmute = function() {
        this.isVideoMuted = false;
        this.videoComponentElement.volume = 1.0;
    };

    ArsonalDCVideo.prototype.replay = function() {
        this.rewind();
        this.unmute();
        this.play();
    };

    ArsonalDCVideo.prototype.rewind = function() {
        if(this.isVideoComplete) return;
        try {
            this.videoComponentElement.currentTime = 0;
        } catch(e) {}
        this.pause();
    };

    ArsonalDCVideo.prototype.addCuepoint = function(id, time) {
        var c = new ArsonalVideoCuepoint(id, time);
        this.cuepoints.push(c);
    };

    ArsonalDCVideo.prototype.removeCuepoints = function() {
        this.cuepoints = []
    };

    ArsonalDCVideo.prototype.addVideoEvents = function() {
        if(! this.videoComponent) return;
        if(! this.videoComponentElement) return;
        try {
            this.videoComponent.removeEventListener("playing", this._videoPlaying.bind(this), false);
            this.videoComponent.removeEventListener('ended', this._videoComplete.bind(this), false);
            this.videoComponent.removeEventListener("fullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponent.removeEventListener("mozfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponent.removeEventListener("webkitfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("fullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("mozfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("webkitendfullscreen", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("webkitfullscreenchange", this._videoEndFullscreen.bind(this), false);
        } catch(e) {}
        try {
            this.videoComponent.addEventListener("playing", this._videoPlaying.bind(this), false);
            this.videoComponent.addEventListener('ended', this._videoComplete.bind(this), false);
            this.videoComponent.addEventListener("fullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponent.addEventListener("mozfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponent.addEventListener("webkitfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.addEventListener("fullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.addEventListener("mozfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.addEventListener("webkitendfullscreen", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.addEventListener("webkitfullscreenchange", this._videoEndFullscreen.bind(this), false);
        } catch(e) {}
    };

    ArsonalDCVideo.prototype.removeVideoEvents = function() {
        if(! this.videoComponent) return;
        if(! this.videoComponentElement) return;
        try {
            this.videoComponent.removeEventListener("playing", this._videoPlaying.bind(this), false);
            this.videoComponent.removeEventListener('ended', this._videoComplete.bind(this), false);
            this.videoComponent.removeEventListener("fullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponent.removeEventListener("mozfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponent.removeEventListener("webkitfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("fullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("mozfullscreenchange", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("webkitendfullscreen", this._videoEndFullscreen.bind(this), false);
            this.videoComponentElement.removeEventListener("webkitfullscreenchange", this._videoEndFullscreen.bind(this), false);
        } catch(e) {}
    };

    ArsonalDCVideo.prototype.destroy = function() {
        if(! this.videoComponent) return;
        if(! this.videoComponentElement) return;
        studio.video.Reporter.detach(this.id);
        this.removeVideoEvents();
        this.videoComponent.destroy();
        this.videoComponent = null;
        this.isVideoPlaying = false;
        clearInterval(this.videoPlaybackInterval);
    };

    ArsonalDCVideo.prototype._videoPlaying = function() {
        this.isVideoPlaying = true;
        this.isVideoComplete = false;
        if(this.isVideoLoaded) {
            setTimeout(function() {
                this.isVideoBuffering = false;
            }.bind(this), this.millisecondsBeforeBufferIsValidated);
        } else {
            setTimeout(function() {
                this.isVideoLoaded = true;
                this.isVideoBuffering = false;
            }.bind(this), this.millisecondsBeforeVideoLoadedIsValidated);
        }
        clearInterval(this.videoPlaybackInterval);
        this.videoPlaybackInterval = setInterval(this._videoProgress.bind(this), 100);
        this.sendNotification('playing', {}, this);
    };

    ArsonalDCVideo.prototype._videoProgress = function() {
        if(this.isVideoComplete) return;
        try {
            if(! this.videoComponentElement.currentTime) return;
            var i = 0;
            if(this.time > this.videoComponentElement.currentTime) {
                for(i = 0; i < this.cuepoints.length; i++) {
                    this.cuepoints[i].enabled = true;
                }
            }
            this.time = parseFloat(this.videoComponentElement.currentTime).toFixed(2);
            for(i = 0; i < this.cuepoints.length; i++) {
                if(this.cuepoints[i].enabled) {
                    if(((parseFloat(this.time) - 0.1) < this.cuepoints[i].time &&
                        (parseFloat(this.time) + 0.1) > this.cuepoints[i].time) ||
                        this.time === this.cuepoints[i].time) {
                        this.cuepoints[i].enabled = false;
                        this.sendNotification(this.cuepoints[i].id, { time: this.cuepoints[i].time }, this);
                    }
                }
            }
            this.sendNotification("progress", { time: this.videoComponentElement.currentTime, duration: this.videoDuration }, this);
        } catch(e) {}
    };

    ArsonalDCVideo.prototype._videoComplete = function(e) {
        if(this.isVideoComplete) return;
        this.isVideoComplete = true;
        this.isVideoPlaying = false;
        this.rewind();
        setTimeout(function() {
            this.sendNotification("ended", {}, this);
        }.bind(this), 10);
    };

    ArsonalDCVideo.prototype._videoEndFullscreen = function() {
        this.rewind();
        this.sendNotification("fullscreenchange", {}, this);
    };

})();


/* ================================================================
    EXAMPLE

// TODO Construct the video object
videoComponent1 = new ArsonalDCVideo(
    video_1_vo.id, // identifier for tracking purposes
    video_1_vo.elementId, // video element id
    video_1_vo.sourceMP4, // mp4 url
    video_1_vo.sourceWEBM, // webm url
    video_1_vo.videoDuration, // video length
    true, // autoplay
    true, // auto muted
);

// TODO Listen for video events from "this" scope. Which then relays events to the "receiveNotification" method
videoComponent1.addObserver(this);

// TODO Creates the video videoYoutubePlayer. Be sure to have loaded the doubleclick module "studio.module.ModuleId.RAD_VIDEO" first before calling.
videoComponent1.initialize();

// TODO OVERRIDE THIS CALLBACK METHOD TO LISTEN FOR VIDEO EVENTS
function receiveNotification(notification) {
    console.log("OVERRIDE THIS CALLBACK METHOD TO LISTEN FOR VIDEO EVENTS");
    var data = notification.data;
    var type = notification.type;
    switch(type) {
        case "playing" :
            break;
        case "progress" :
            console.log(data.time);
            console.log(data.duration);
            break;
        case "ended" :
            break;
        case "fullscreenchange" :
            break;
        case "cue1" :
            console.log(data.time);
            break;
    }
}

*/
