var OmnitureVideoTracker = function(scope) {
	console.log('new OmnitureTracker()');

	var quartiles = {};

	//reference to the currently playing video
	var videoInfo;

	var trackerTimer;

	var adIsPlaying = false;

	var secondsSinceLastTrack = 0;

	var isEmbedWindow = window.location.href.match(/\/videos\/embed\//i) != null;

	var s = isEmbedWindow ? window.self.s : window.parent.s;

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

	$pdk.controller.addEventListener("OnMediaStart", function(clip){
		console.log("OnMediaStart...");
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
		console.log("OnMediaComplete...");
		console.log("clip : ", clip);

		if(clip.data.baseClip.isAd){
			adIsPlaying = false;
			trackAdEnd();
		}else{
			trackVideoComplete();
		}
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaPause", function(mediaPause){
		console.log("OnMediaPause...");
		console.log("mediaPause : ", mediaPause);

		if(mediaPause.data.userInitiated){
			trackVideoPause(mediaPause.data.clip.mediaTime/1000);
		}
		
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaUnpause", function(clip){
		console.log("OnMediaUnpause...");
		console.log("clip : ", clip);
		resetLastEventTimer();	
	}, [scope]);


	$pdk.controller.addEventListener("OnMediaPlaying", function(timeObj){
		// console.log("OnMediaPlaying...");
		// console.log("timeObj : ", timeObj);
		onTimeUpdate(timeObj)	
	}, [scope]);


	$pdk.controller.addEventListener("OnShowFullScreen", function(info){
		console.log("OnShowFullScreen, isFullScreen : ", info.data);
		if(info.data){
			trackVideoExpand();
		}
		
	}, [scope]);

	if(isEmbedWindow) {
		trackerTimer = window.self.TimersJS.repeater(1000, function(delta) {
			secondsSinceLastTrack++;
		});
	} else {
		trackerTimer = window.parent.TimersJS.repeater(1000, function(delta) {
			secondsSinceLastTrack++;
		});
	}


	trackerTimer.pause();



	// track a replay of a video.
	// Video detail page does not do replays, show landing pages do.
	function trackVideoReplay() {
		var s = isEmbedWindow ? window.self.s : window.parent.s;

		console.log("OMNITURE -- trackVideoReplay()");
		var vsp = videoInfo.omniture.videoStartReplay;
		s.linkTrackVars = "prop9,prop21,eVar4,eVar9,eVar14,eVar18,eVar28,eVar39,eVar49,eVar55,eVar56,eVar72,events";
		s.linkTrackEvents = "event6,event9,event12";
		s.events = vsp.events + ",event9";
		s.prop9 = vsp.prop9;
		s.prop21 = videoInfo.omniture.videoPlayerName + ":" + vsp.eVar39;
		s.eVar9 = vsp.eVar9;
		s.eVar4 = s.pageName;

		s.eVar14 = vsp.eVar14;
		s.eVar17 = "::"; //added to avoid breaking adobetags file
		s.eVar18 = videoInfo.omniture.videoPlayerName;
		s.eVar28 = vsp.eVar28;
		s.eVar39 = vsp.eVar39;
		s.eVar56 = vsp.eVar56;
		s.eVar55 = ""; //season - we currently have no way to get this 
		s.eVar49 = vsp.eVar49;
		s.eVar72 = vsp.eVar72;
		trackLink('video-replay');

	}


	function trackVideoClose(event) {
		trackLink('video-close');
	}

	// track the end of the video
	function trackVideoComplete(event) {
		console.log("OMNITURE -- trackVideoComplete()");
		var s = isEmbedWindow ? window.self.s : window.parent.s;

		s.linkTrackVars = "prop9,prop21,eVar4,eVar9,eVar14,eVar18,eVar28,eVar39,eVar42,eVar56,eVar55,eVar72,events,products";
		s.linkTrackEvents = "event13,event26";
		var vc = videoInfo.omniture.videoComplete;

		s.events = vc.events;
		s.products = ";;;;event11=" + secondsSinceLastTrack; //TODO set seconds here 
		s.prop9 = vc.prop9;
		s.prop21 = videoInfo.omniture.videoPlayerName + ":" + vc.eVar39;
		s.eVar4 = s.pageName;
		s.eVar9 = vc.eVar9;
		s.eVar14 = vc.eVar14;
		s.eVar17 = "::"; //added to avoid breaking adobetags file
		s.eVar18 = videoInfo.omniture.videoPlayerName;
		s.eVar26 = vc.eVar26;
		s.eVar28 = vc.eVar28;
		s.eVar39 = vc.eVar39;
		//s.eVar42="[No Low Heavy Video Viewer]"; //not sure this is used currently
		s.eVar56 = vc.eVar56;
		//s.eVar55="[Season]"; //not set currently - we have no season value
		s.eVar49 = vc.eVar49;
		s.eVar72 = vc.eVar72;

		// adding a property to keep track if
		// this video has played once already,
		// to help determine if a video replays.
		videoInfo.hasPlayed = true;
		trackLink('video-complete');

	}


	function trackVideoPause(currentTime) {
		console.log('trackVideoPause(), ', videoInfo.title)


		console.log("OMNITURE -- trackVideoPause(), current time : ", currentTime);
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		//not clearly defined anywhere what linkTrackVars to send
		//added eVar39
		s.linkTrackVars = "prop9,prop21,eVar4,eVar9,eVar14,eVar18,eVar28,eVar39,eVar49,eVar55,eVar56,eVar72,events";
		s.linkTrackEvents = "event19,event10,event11";

		var vp = videoInfo.omniture.videoPause;

		s.events = vp.events;
		s.products = ";;;;event10=0|event11=" + secondsSinceLastTrack;
		s.prop9 = vp.prop9;
		s.prop21 = videoInfo.omniture.videoPlayerName + ":" + vp.eVar39;
		s.eVar4 = s.pageName;
		s.eVar9 = vp.eVar9;
		s.eVar14 = vp.eVar14;
		s.eVar17 = "::"; //added to avoid breaking adobetags file
		s.eVar18 = videoInfo.omniture.videoPlayerName;
		s.eVar28 = vp.eVar28;
		s.eVar39 = vp.eVar39;
		s.eVar56 = vp.eVar56;
		//s.eVar55="[Season]"; //not set currently - we have no season value
		s.eVar49 = vp.eVar49;
		s.eVar72 = vp.eVar72;
		trackLink('video-pause');
		trackerTimer.pause();
		//isPaused = true;

	}

	// track the first time the video started playing.
	function trackMainVideoStart() {
		console.log("OMNITURE -- trackMainVideoStart()");
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		s.linkTrackVars = "prop9,prop21,eVar4,eVar9,eVar14,eVar18,eVar28,eVar39,eVar49,eVar55,eVar56,eVar72,events";
		s.linkTrackEvents = "event12";

		var vs = videoInfo.omniture.videoStart;

		s.events = vs.events;
		s.prop21 = videoInfo.omniture.videoPlayerName + ":" + vs.eVar39;
		s.prop9 = vs.prop9;
		s.eVar4 = s.pageName;
		s.eVar9 = vs.eVar9;
		s.eVar14 = vs.eVar14;
		s.eVar17 = "::"; //added to avoid breaking adobetags file
		s.eVar18 = videoInfo.omniture.videoPlayerName;
		s.eVar26 = vs.eVar26;
		s.eVar28 = vs.eVar28;
		s.eVar39 = vs.eVar39;
		s.eVar56 = vs.eVar56;
		s.eVar55 = videoInfo.season;
		s.eVar49 = vs.eVar49;
		s.eVar72 = vs.eVar72;
		
		// if video is in an article page, set the block type (with text, video only) and set up additional omniture values
		var videoBlockType = (jQuery('[data-video-id='+videoInfo.id+']').length) ? jQuery('[data-video-id='+videoInfo.id+']').attr('data-videostart-omniture') : '';
		if(typeof videoBlockType !== 'undefined' && videoBlockType != '') {
			var videoLengthGroup, vidLength = parseInt(videoInfo.durationSeconds);
			if(vidLength < 240) {
				videoLengthGroup = "<4 minutes";
			} else if(vidLength < 1260) {
				videoLengthGroup = "4-to-20-minutes";
			} else if(vidLength < 3660) {
				videoLengthGroup = "21-to-60-minutes";
			} else {
				videoLengthGroup = "61-or-more-minutes";
			}

			s.linkTrackEvents = "event9,event12";
			s.events = "event9,event12";
			s.list1 = vs.prop9; 
			s.prop39 = vs.eVar39;
			s.prop55 = videoInfo.season;  
			s.prop56 = vs.eVar56;
			s.prop72 = vs.eVar72;
			s.products=';'+videoBlockType+';;;event12,;'+videoBlockType+';;;event9';
			s.prop14=s.prop14 || jQuery('.article__title').replace(/[ _]/g, '-').toLowerCase();
			s.eVar15='articles';
			s.prop15='articles';
			s.eVar16=videoBlockType;
			//s.eVar20="[Ad Name]";  //how to get this value - may not even be set currently
			//s.prop20="[Ad Name]";  //how to get this value - may not even be set currently
			s.eVar28=videoLengthGroup;
			s.eVar42='text-blocks';
			s.prop42='text-blocks';
			s.eVar62='detail';
			s.prop62='detail';
			actionName='video-user-start';
			s.linkTrackVars = 'products,events,eVar4,prop9,prop14,eVar14,prop15,eVar15,eVar16,eVar18,prop20,eVar20,eVar28,prop39,eVar39,eVar42,prop42,prop55,eVar55,prop56,eVar56,prop62,eVar62,prop72,eVar72,list1';
		}
		
		//check if this event was already triggered by userInitiated event
		if (!videoInfo.hasOwnProperty("trackedStart") || !videoInfo.trackedStart) {
			trackLink('video-start');
		}	
	}


	function trackVideoSegments() {
		// ?
	}



	function trackAdStart() {
		console.log("OMNITURE -- trackAdStart()");
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		s.linkTrackVars = "prop9,prop20,prop21,eVar18,eVar28,eVar38,eVar39,eVar40,eVar42,eVar72,events,products";
		s.linkTrackEvents = "event15";
		//s.eVar38="[Ad Name]";  //how to get this value - may not even be set currently
		//s.eVar40="[Ad Position]"; //how to get this value - may not even be set currently
		trackLink('ad-start');
	}

	function trackAdEnd() {
		console.log("OMNITURE -- trackAdEnd()");
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		s.linkTrackVars = "prop20,prop21,eVar18,eVar28,eVar38,eVar39,eVar40,eVar42,eVar72,events,products";
		s.linkTrackEvents = "event15";
		//s.eVar38="[Ad Name]";  //how to get this value - may not even be set currently
		//s.eVar40="[Ad Position]"; //how to get this value - may not even be set currently
		trackLink('ad-complete');

	}

	function onTimeUpdate(timeObj) {

		if (adIsPlaying) {
			return;
		}
		
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		var currentTime = timeObj.data.currentTime/1000;
		//console.log("currentTime : ", currentTime);
		var recordedSecondsSinceLastTrack = secondsSinceLastTrack;

		s.linkTrackVars = "prop9,prop21,eVar4,eVar14,eVar18,eVar28,eVar39,eVar42,eVar49,eVar56,eVar55,eVar51,eVar72,events,products";
		s.linkTrackEvents = "event11,event14,event26";

		if (currentTime > quartiles.thirdQuartileTime) {
			if (!quartiles.thirdQuartileSent) {
				console.log('OMNITURE -- sending  thirdQuartile...')
				var m75 = videoInfo.omniture.videoMilestone75;
				s.events = m75.events;
				s.products = ";;;;event11=" + recordedSecondsSinceLastTrack + "|event14=.75";
				s.prop9 = m75.prop9;
				s.prop21 = videoInfo.omniture.videoPlayerName + ":" + m75.eVar39;
				s.eVar4 = s.pageName;
				s.eVar14 = m75.eVar14;
				s.eVar17 = "::"; //added to avoid breaking adobetags file
				s.eVar18 = videoInfo.omniture.videoPlayerName;
				s.eVar26 = m75.eVar26;
				s.eVar28 = m75.eVar28;
				s.eVar39 = m75.eVar39;
				s.eVar56 = m75.eVar56;
				//				s.eVar55="[Season]"; 
				s.eVar49 = m75.eVar49;
				s.eVar72 = m75.eVar72;
				trackLink('milestone');
				quartiles.thirdQuartileSent = true;
			}
		} else if (currentTime > quartiles.midpointTime) {
			if (!quartiles.midpointSent) {
				console.log('OMNITURE -- sending midpoint...');
				var m50 = videoInfo.omniture.videoMilestone50;
				s.events = m50.events;
				s.products = ";;;;event11=" + recordedSecondsSinceLastTrack + "|event14=.50";
				s.eVar4 = s.pageName;
				s.prop9 = m50.prop9;
				s.prop21 = videoInfo.omniture.videoPlayerName + ":" + m50.eVar39;
				s.eVar14 = m50.eVar14;
				s.eVar17 = "::"; //added to avoid breaking adobetags file
				s.eVar18 = videoInfo.omniture.videoPlayerName;
				s.eVar26 = m50.eVar26;
				s.eVar28 = m50.eVar28;
				s.eVar39 = m50.eVar39;
				s.eVar56 = m50.eVar56;
				//				s.eVar55="[Season]"; 
				s.eVar49 = m50.eVar49;
				s.eVar72 = m50.eVar72;
				trackLink('milestone');
				quartiles.midpointSent = true;
			}

		} else if (currentTime > quartiles.firstQuartileTime) {
			if (!quartiles.firstQuartileSent) {
				console.log('OMNITURE -- sending firstQuartile...');
				var m25 = videoInfo.omniture.videoMilestone25;
				s.events = m25.events;
				s.products = ";;;;event11=" + recordedSecondsSinceLastTrack + "|event14=.25";
				s.prop9 = m25.prop9;
				s.prop21 = videoInfo.omniture.videoPlayerName + ":" + m25.eVar39;
				s.eVar4 = s.pageName;
				s.eVar14 = m25.eVar14;
				s.eVar17 = "::"; //added to avoid breaking adobetags file
				s.eVar18 = videoInfo.omniture.videoPlayerName;
				s.eVar26 = m25.eVar26;
				s.eVar28 = m25.eVar28;
				s.eVar39 = m25.eVar39;
				s.eVar56 = m25.eVar56;
				//				s.eVar55="[Season]"; 
				s.eVar49 = m25.eVar49;
				s.eVar72 = m25.eVar72;
				trackLink('milestone');
				quartiles.firstQuartileSent = true;
			}
		};

	}

	function onVideoClose(event) {
		trackVideoClose(event.data.self);
	}



	// sets up params for tracking video view milestones.
	function setQuartiles() {
		console.log("OMNITURE -- setQuartiles()");

		quartiles.firstQuartileSent = false;
		quartiles.midpointSent = false;
		quartiles.thirdQuartileSent = false;
		quartiles.firstQuartileTime = videoInfo.durationSeconds / 4;
		quartiles.midpointTime = videoInfo.durationSeconds / 2;
		quartiles.thirdQuartileTime = videoInfo.durationSeconds * .75;
		console.debug("quartiles : ", quartiles);
	}


	function trackLink(linkName, t) {
		console.debug("OMNITURE -- trackLink : ", linkName, "secondsSinceLastTrack : ", secondsSinceLastTrack);
		console.log("window.location.href : ", window.location.href);
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		s.tl(window.location.href, 'o', linkName);

		resetLastEventTimer();
	}

	function resetLastEventTimer() {
		console.debug("resetLastEventTimer()");
		secondsSinceLastTrack = 0;
		trackerTimer.restart();
	}





	// this is a public method since expanding happens outside the player.
	function trackVideoExpand() {
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		s.linkTrackVars = "prop9,prop21,eVar4,eVar9,eVar14,eVar18,eVar28,eVar39,eVar49,eVar55,eVar56,eVar72,events";
		s.linkTrackEvents = "event11,event23";
		
		var ve = videoInfo.omniture.videoExpand;
		
		s.events = ve.events;
		s.products = ";;;;event11=" + secondsSinceLastTrack;
		s.prop21 = videoInfo.omniture.videoPlayerName + ":" + ve.eVar39;
		s.prop9 = ve.prop9;
		s.eVar9 = ve.eVar9;
		s.eVar4 = s.pageName;
		s.eVar14 = ve.eVar14;
		s.eVar17 = "::"; //added to avoid breaking adobetags file
		s.eVar18 = videoInfo.omniture.videoPlayerName;
		s.eVar26 = ve.eVar26;
		s.eVar28 = ve.eVar28;
		s.eVar39 = ve.eVar39;
		s.eVar56 = ve.eVar56;
		s.eVar55 = ""; //season - we currently have no way to get this 
		s.eVar49 = ve.eVar49;
		s.eVar72 = ve.eVar72;
		
		trackLink('expand');
	}

	// special case:  when the user clicks a video thumbnail on the page
	// (for example, in the right rail or in the countdown overlay)
	// we need to track "user-initiated play" event for the video before sending to the next page.
	function trackVideoUserInitiatedPlay(selectedVideoInfo) {
		console.log("OMNITURE -- trackVideoUserInitiatedPlay()");
		var t = this;
		var s = isEmbedWindow ? window.self.s : window.parent.s;
		s.linkTrackVars = "prop9,prop21,eVar4,eVar9,eVar14,eVar18,eVar28,eVar39,eVar49,eVar55,eVar56,eVar72,events";
		s.linkTrackEvents = "event9,event12";



		var vsui = selectedVideoInfo.omniture.videoStartUserInitiated;

		s.events = vsui.events + ",event9";
		s.prop9 = vsui.prop9;
		s.prop21 = selectedVideoInfo.omniture.videoPlayerName + ":" + vsui.eVar39;
		s.eVar9 = vsui.eVar9;
		s.eVar4 = s.pageName;
		s.eVar14 = vsui.eVar14;
		s.eVar17 = "::"; //added to avoid breaking adobetags file
		s.eVar18 = selectedVideoInfo.omniture.videoPlayerName;
		s.eVar28 = vsui.eVar28;
		s.eVar39 = vsui.eVar39;
		s.eVar56 = vsui.eVar56;
		s.eVar55 = ""; //season - we currently have no way to get this 
		s.eVar49 = vsui.eVar49;
		s.eVar72 = vsui.eVar72;

		console.log("videoInfo.hasPlayed : ", selectedVideoInfo.hasPlayed);
		if (selectedVideoInfo.hasPlayed) {
			s.linkTrackEvents += ",event6";
			s.events += ",event6";
		}
		
		selectedVideoInfo.trackedStart = true;

		trackLink('video-start');


	}

	return {
		setVideoInfo:setVideoInfo,
		getVideoInfo:getVideoInfo,
		trackVideoUserInitiatedPlay:trackVideoUserInitiatedPlay
	}



}