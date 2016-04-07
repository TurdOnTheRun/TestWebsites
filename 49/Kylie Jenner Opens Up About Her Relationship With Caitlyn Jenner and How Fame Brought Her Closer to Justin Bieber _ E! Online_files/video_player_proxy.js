/**
 * Interface to a video player instance.
 * Listens for video events and dispatches a signal in repsonse.
 */
var VideoPlayerProxy = function(options) {
	
	var $ = jQuery;
	var context = options.context;
	var videoScope = options.videoScope;
	var adIsPlaying = false;
	var paused = false;

	var playingSignalEnabled = false;

	var adStarted = new signals.Signal();
	var adEnded = new signals.Signal();
	var videoStarted = new signals.Signal();
	
	var releaseStarted = new signals.Signal();
	var releaseEnded = new signals.Signal();
	var mediaStarted = new signals.Signal();
	var mediaCompleted = new signals.Signal();
	var paused = new signals.Signal();
	var unpaused = new signals.Signal();
	var fullScreenEntered = new signals.Signal();
	var fullScreenExited = new signals.Signal();
	var onMediaError = new signals.Signal();
	var onReleaseError = new signals.Signal();
	var controlsShown = new signals.Signal();
	var controlsHidden = new signals.Signal();
	var releaseLoaded = new signals.Signal();


	$pdk.controller.addEventListener("OnLoadReleaseUrl", function(event){
		console.warn("OnLoadReleaseUrl...");
		//var relase = event.data;
		releaseLoaded.dispatch(event.data);
	}, [videoScope]);



	$pdk.controller.addEventListener("OnReleaseStart", function(playlist){
		console.debug("OnReleaseEnd : ", videoScope);
		releaseStarted.dispatch();
	}, [videoScope]);

	$pdk.controller.addEventListener("OnMediaStart", function(clip) {
		console.log("OnMediaStart : ", videoScope);
		//console.log(videoScope +" clip : ", clip);
		adIsPlaying = clip.data.baseClip.isAd;

		console.log(videoScope +" adIsPlaying : ", adIsPlaying);		
		adIsPlaying ? adStarted.dispatch(clip) : videoStarted.dispatch(clip);

	}, [videoScope]);


	$pdk.controller.addEventListener("OnMediaComplete", function(clip) {
		console.log("OnMediaComplete : ", videoScope);

		if (clip.data.baseClip.isAd) {
			adIsPlaying = false;
			adEnded.dispatch(clip);
		}else{
			mediaCompleted.dispatch(clip);
		}

	}, [videoScope]);


	$pdk.controller.addEventListener("OnReleaseEnd", function(playlist){
		console.debug("OnReleaseEnd : ", videoScope);
		releaseEnded.dispatch();
	}, [videoScope]);


	$pdk.controller.addEventListener("OnMediaPause", function(mediaPause){
		console.log("OnMediaPause...");
	}, [videoScope]);


	$pdk.controller.addEventListener("OnMediaUnpause", function(clip){
		console.log("OnMediaUnpause...");
		unpaused.dispatch();
	}, [videoScope]);


	$pdk.controller.addEventListener("OnMediaPlaying", function(timeObj){
		if(playingSignalEnabled){
			playing.dispatch(timeObj);
		}
		
	}, [videoScope]);


	$pdk.controller.addEventListener("OnShowFullScreen", function(info){
		console.log("OnShowFullScreen, isFullScreen : ", info.data);
		var isFullScreen = info.data;
		isFullScreen ? fullScreenEntered.dispatch() : fullScreenExited.dispatch();
	}, [videoScope]);


	$pdk.controller.addEventListener("OnMediaError", function(info){
		console.log("SELENIUM -- scope : "+videoScope+", OnMediaError, error : ", info);
		// Fires when an error occurs during playback of the current clip.
		// The data payload for this event type contains a PlaybackError object.
		onMediaError.dispatch();
	}, [videoScope]);


	$pdk.controller.addEventListener("OnReleaseError", function(info){
		console.log("SELENIUM -- scope : "+videoScope+", OnReleaseError, error : ", info);
		// Fires when an error occurs in the attempt to retrieve playlist data from the selector. 
		// Common causes include: there is no release URL available, the URL exists but doesn't return any data, 
		// the URL functions but the returned data cannot be parsed into a playlist.
		// 
		// The data payload for this event type contains a string with the URL that caused the error (or an empty string if the URL is missing).
		onReleaseError.dispatch();
	}, [videoScope]);


	function setPause (isPaused) {
		if (isPaused) {

		}else{

		}
	}

	function setControlsEnabled(enable){
		$pdk.controller.disablePlayerControls(enable, null, [videoScope]);

	}


	return {
		adIsPlaying:adIsPlaying,
		paused:paused,
		playingSignalEnabled:playingSignalEnabled,
		releaseStarted:releaseStarted,
		adStarted : adStarted,
		adEnded : adEnded,
		videoStarted : videoStarted,
		releaseEnded : releaseEnded,
		mediaStarted : mediaStarted,
		mediaCompleted : mediaCompleted,
		paused : paused,
		unpaused : unpaused,
		fullScreenEntered : fullScreenEntered,
		fullScreenExited : fullScreenExited,
		onMediaError : onMediaError,
		onReleaseError : onReleaseError,
		controlsShown : controlsShown,
		controlsHidden : controlsHidden,
		releaseLoaded : releaseLoaded

	}
}