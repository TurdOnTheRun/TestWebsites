var SeleniumVideoTracker = function(scope) {
	console.log('new SeleniumTracker()');

	var quartiles = {};

	//reference to the currently playing video
	var videoInfo;

	var trackerTimer;

	var adIsPlaying = false;

	var secondsSinceLastTrack = 0;

	var logs = [];

	var myScope = scope;


	function setVideoInfo(videoInfoObj) {
		if(trackerTimer){
			trackerTimer.pause();
		}
		videoInfo = videoInfoObj;
		setQuartiles();
	}

	function getVideoInfo() {
		return videoInfo;
	}


	$pdk.controller.addEventListener("OnReleaseStart", function(playlist){
		console.debug("SELENIUM -- scope : "+myScope+", OnReleaseStart...");
		var releasePID = playlist.data.releasePID;
		var nextVideoInfo = evideo.pageVideosModel.getByReleaseId(releasePID);

		// get the duration from the release if it's not present 
		// in the given videoInfo object
		if (isNaN(nextVideoInfo.durationSeconds) || nextVideoInfo.durationSeconds == null) {
			nextVideoInfo.durationSeconds = (playlist.data.release.length/1000)
		};


		setVideoInfo(nextVideoInfo);

	}, [scope]);



	$pdk.controller.addEventListener("OnMediaStart", function(clip){
		console.log("SELENIUM -- scope : "+myScope+", OnMediaStart...");
		console.log("clip : ", clip);
		if(clip.data.baseClip.isAd){
			adIsPlaying = true;
			trackAdStart();
		}else{
			trackMainVideoStart();

			if (videoInfo.hasOwnProperty("hasPlayed") && videoInfo.hasPlayed) {
				trackVideoReplay();
			}
		}
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaComplete", function(clip){
		console.log("SELENIUM -- scope : "+myScope+", OnMediaComplete...");
		console.log("clip : ", clip);

		if(clip.data.baseClip.isAd){
			adIsPlaying = false;
			trackAdEnd();
		}else{
			trackVideoComplete();
		}
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaPause", function(mediaPause){
		console.log("SELENIUM -- scope : "+myScope+", OnMediaPause...");
		console.log("mediaPause : ", mediaPause);

		if(mediaPause.data.userInitiated){
			trackVideoPause(mediaPause.data.clip.mediaTime/1000);
		}
		
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaUnpause", function(clip){
		console.log("SELENIUM -- scope : "+myScope+", OnMediaUnpause...");
		console.log("clip : ", clip);
		resetLastEventTimer();	
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaPlaying", function(timeObj){
		// console.log("OnMediaPlaying...");
		// console.log("timeObj : ", timeObj);
		onTimeUpdate(timeObj)	
	}, [scope]);


	$pdk.controller.addEventListener("OnShowFullScreen", function(info){
		console.log("SELENIUM -- scope : "+myScope+", OnShowFullScreen, isFullScreen : ", info.data);
		if(info.data){
			trackVideoExpand();
		}
		
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaError", function(info){
		console.log("SELENIUM -- scope : "+myScope+", OnMediaError, error : ", info);
		// Fires when an error occurs during playback of the current clip.
		// The data payload for this event type contains a PlaybackError object.
		
		trackMainVideoError();
	}, [scope]);


	$pdk.controller.addEventListener("OnReleaseError", function(info){
		console.log("SELENIUM -- scope : "+myScope+", OnReleaseError, error : ", info);
		// Fires when an error occurs in the attempt to retrieve playlist data from the selector. 
		// Common causes include: there is no release URL available, the URL exists but doesn't return any data, 
		// the URL functions but the returned data cannot be parsed into a playlist.
		// 
		// The data payload for this event type contains a string with the URL that caused the error (or an empty string if the URL is missing).
		
	}, [scope]);


	trackerTimer = TimersJS.repeater(1000, function(delta) {
		secondsSinceLastTrack++;
	});


	trackerTimer.pause();



	// track a replay of a video.
	// Video detail page does not do replays, show landing pages do.
	function trackVideoReplay() {
		console.log("SELENIUM -- scope : "+myScope+", trackVideoReplay()");

		trackEvent('video-replay');

	}


	// track the end of the video
	function trackVideoComplete(event) {
		console.log("SELENIUM -- scope : "+myScope+", trackVideoComplete()");

		trackEvent('video-complete');

	}


	function trackVideoPause(currentTime) {
		console.log('trackVideoPause(), ', videoInfo.title)

		console.log("SELENIUM -- scope : "+myScope+", trackVideoPause(), current time : ", currentTime);

		trackEvent('video-pause');
		trackerTimer.pause();
		//isPaused = true;

	}

	// track the first time the video started playing.
	function trackMainVideoStart() {
		console.log("SELENIUM -- scope : "+myScope+", trackMainVideoStart()");

		trackEvent('video-start');

	}

	function trackMainVideoError() {
		console.log("SELENIUM -- scope : "+myScope+", trackMainVideoError()");
		
		trackEvent('video-error');
	}


	function trackAdStart() {
		console.log("SELENIUM -- scope : "+myScope+", trackAdStart()");

		trackEvent('ad-start');
	}

	function trackAdEnd() {
		console.log("SELENIUM -- scope : "+myScope+", trackAdEnd()");

		trackEvent('ad-complete');

	}

	function onTimeUpdate(timeObj) {

		if (adIsPlaying) {
			return;
		}


		

		var currentTime = timeObj.data.currentTime/1000;
		//console.log("currentTime : ", currentTime);
		var secondsSinceLastTrack = secondsSinceLastTrack;


		if (currentTime > quartiles.thirdQuartileTime) {
			if (!quartiles.thirdQuartileSent) {
				console.log('SELENIUM -- scope : '+myScope+', sending  thirdQuartile...')

				trackEvent('thirdQuartile', quartiles.thirdQuartileTime);
				quartiles.thirdQuartileSent = true;
			}
		} else if (currentTime > quartiles.midpointTime) {
			if (!quartiles.midpointSent) {
				console.log('SELENIUM -- scope : '+myScope+', sending midpoint...');

				trackEvent('midpoint', quartiles.midpointTime);
				quartiles.midpointSent = true;
			}

		} else if (currentTime > quartiles.firstQuartileTime) {
			if (!quartiles.firstQuartileSent) {
				console.log('SELENIUM -- scope : '+myScope+', sending firstQuartile...');

				trackEvent('firstQuartile', quartiles.firstQuartileTime);
				quartiles.firstQuartileSent = true;
			}
		};

	}




	// sets up params for tracking video view milestones.
	function setQuartiles() {
		console.log("SELENIUM -- scope : "+myScope+", setQuartiles()");

		quartiles.firstQuartileSent = false;
		quartiles.midpointSent = false;
		quartiles.thirdQuartileSent = false;
		quartiles.firstQuartileTime = videoInfo.durationSeconds / 4;
		quartiles.midpointTime = videoInfo.durationSeconds / 2;
		quartiles.thirdQuartileTime = videoInfo.durationSeconds * .75;
		console.debug("quartiles : ", quartiles);
	}


	function trackEvent(eventName, data) {
		console.debug("SELENIUM -- scope : "+myScope+", trackEvent : ", eventName, "secondsSinceLastTrack : ", secondsSinceLastTrack);
		//logs.push({guid:videoInfo.guid, scope:myScope, eventName:eventName, data:data}); 
		logs.push(myScope+", "+videoInfo.guid+", "+eventName);
		resetLastEventTimer();
	}

	function resetLastEventTimer() {
		console.debug("SELENIUM -- scope : "+myScope+", resetLastEventTimer()");
		secondsSinceLastTrack = 0;
		trackerTimer.restart();
	}

	// this is a public method since expanding happens outside the player.
	function trackVideoExpand() {
		trackEvent('expand');
	}

	function getLog () {
		return logs;
	}



	return {
		setVideoInfo:setVideoInfo,
		getVideoInfo:getVideoInfo,
		getLog:getLog,
		scope:myScope
	}



}