/* Eonline's Freewheel Ad Integration Script.
Authors: Rich Rodecker, Danny Xu, Brian Kueck
Contact: Send bugs to @EDevelopers1 via Twitter.

Freewheel Process Flow: (The Video Player Engine will handle steps 1 & 2. This script will handle steps 3-7.)
1.	Detect when we should be using the video player.
2.	Create the video player using the <video> tag.
3.	Request the video feed from thePlatform - Do this using the VideoService.js class.
4.	Request the ad from Freewheel - do this using the AdService.js class.
5.	Set the src of the <video> to the ad url.
6.	Create a VideoAdTracker to monitor the video and send tracking callbacks at the appropriate times. - do this using the VideoAdTracker.js class.
7.	When the ad completes, set the src of the <video> to the main video url.
*/


// Uses: /resources/js/libs/freewheel/videoAdTracker.js
// Uses: /resources/js/libs/freewheel/videoService.js
// Uses: /resources/js/libs/freewheel/adService.js


if (!eol) { eol = {}; } // Same as window.eol. Allows this script to be loaded before other eol.* scripts & it won't break onLoad.
eol.freewheel = (function($) {

	var model = {
		"debug": {
			"all": false,
			"errors": false,
			"fnTrace": false, // The "debug", which is shorthand for "console.debug" will highlight each function traceroute line in blue. Console.log always uses black.
			"freewheel": false,
			"iPad": false,
			"showControls": false, // for Localhost only. Allows developers to bypass the ads to test out the videos.
			"useTestAccount": false
		}, 
		"config": {
			"cookieName": "videoAdCookie",
			"numberOfVisitsBeforeAd": 3,
			"programName": "eol.freewheel",
			"testAccount": {
				"networkId": "171224",  // This is not a Panda Id, but the account Id.
				"playerProfile": "171224:e_js_test", // This is not a Panda Id, but the account Id. This is for ActionScript: e_as3_test
				"flashVersion": "11,9,900,117",
				"pageURL": window.location.toString(),
				"serverUrl": "http://29cd8.v.fwmrm.net/ad/p/1?",
				"siteSectionId": "%SSID%", // Test SSID: eonline_test
				"siteSectionNetworkId": "171224", // This is not a Panda Id.
				"videoAssetNetworkId": "171224", // This is not a Panda Id.
				"videoId": "eonline-%PANDA_ID%", // Should be "eonline-pandaId" like: "eonline-123456".
				"videoUrl": "%VIDEO_URL%",
				"duration": 90, // To Do
				"autoPlay": true,
				"videoWidth": null,
				"videoHeight": null
			},
			"prodAccount": {
				"adManagerUrl": "http://adm.fwmrm.net/p/nbcu_e_js_live/AdManager.js", // "http://adm.fwmrm.net/p/nbcu_e_as3_live/AdManager.swf",
				"networkId": "169843", // This is not a Panda Id, but the account Id.
				"playerProfile": "169843:e_js_live", // This is not a Panda Id, but the account Id. This is for ActionScript: e_as3_live
				"flashVersion": "11,9,900,117",
				"pageURL": window.location.toString(),
				"serverUrl": "http://fw.eonline.com/ad/p/1?",
				"siteSectionId": "%SSID%", // This is passed in from the Video Player Engine. It's dynamically created.
				"siteSectionNetworkId": "169843", // This is not a Panda Id, but the account Id.
				"videoAssetNetworkId": "169843", // This is not a Panda Id, but the account Id.
				"videoId": "eonline-%PANDA_ID%", // Should be "eonline-pandaId" like: "eonline-123456".
				"videoUrl": "%VIDEO_URL%",
				"duration": 90, // To Do
				"autoPlay": true,
				"videoWidth": null,
				"videoHeight": null
			}
		},
		"data": { // These are auto-populated by this script.
			"adEdition": null,
			"adParams": null, // The adParams will be in the same data format as the testAccount above.
			"isFreewheelAdPlaying": false,
			"galleryFeedUrl": "http://feed.theplatform.com/f/CAY1CB/csVXqNCeIJZd?form=json&fileFields=url,duration,width,height,format&byAdminTags=TOP+STORIES&range=1-12&byContent=byFormat%3DFLV%7CM3U&fields=id%2Ctitle%2Cthumbnails%2Ccontent%2Cdescription%2Ckeywords%2Cguid%2CadminTags", // Freewheel Video Feed
			"originalVideoUrl": null, // This is the '/url/of/main/video.mp4' value.
			"SSID": null, // This is the dynamically passed in value from the Video Player Engine. It's the %SSID% value, for the "siteSectionId" variable above.
			"videoId": null,
			"videoUrl": null
		},
		"dom": {
			"videoId": null // This is the domAttachId value, which the videoAjTracker.js file needs.
		}
	};
	
	// just store a reference to the video element.

	var videoElement;
	var adTracker; 
	var lastAdInfo;
	var $adOverlay;

	if (!isAppleDevice) {
		var ua = navigator.userAgent;
		var isAppleDevice = (ua.match(/iPad|iPhone|iPod/i)) ? true : false;
	}

	if (!isLocalhost) {
		var url = location.href;
		var isLocalhost = (url.match(/localhost/i)) ? true : false;
	}

	// Allows for debugging the iPad using Firefox & Firebug, instead of on an iPad.
	if (isLocalhost && model.debug.iPad) {
		isAppleDevice = true;
	}

	// Automatically turns off debugging properties for all non-localhost servers.
	if (!isLocalhost) {
		model.debug.showControls = false;
	}

	/*** BEGIN FREEWHEEL CORE FUNCTIONS ***/

	// Setting the main video src when the ad is complete:
	function adComplete(event){
		console.log("adComplete()");
		model.data.isFreewheelAdPlaying = false; // Resets the flag.
		playVideo(model.data.originalVideoUrl, true);
		var $video = $('#'+model.dom.videoId);

		adTracker.sendVideoViewCallback();
		adTracker.destroy();
		adTracker = null;
		
		$adOverlay.remove();
		$video.off('play', onAdContinue);

		
	}

	function adReady(event,adInfo){ // event, Ad Response.
		console.debug('onAdREady()')
		// Capture the <video> tag's original URL & save it for later usage... into our cached model.data area.
		console.debug('(before) model.data.originalVideoUrl: ' , model.data.originalVideoUrl);


		model.data.originalVideoUrl = videoElement.src;

		console.debug('(after) model.data.originalVideoUrl: ' + model.data.originalVideoUrl);
		console.log('adIfno');
		console.log('adInfo.url : ', adInfo.url)

		// set the src of the <video> to the ad url
		if (adInfo && adInfo.url) {
			model.data.isFreewheelAdPlaying = true;
			lastAdInfo = adInfo;
			playVideo(adInfo.url, false);


		} else {
			if(adTracker){
				adTracker.destroy();
				adTracker = null;
			}

			// If no ad is returned we still need to send the slotImpression
			// and videoView events.  Just using a temp ad tracker here
			// as a quickfix.
			var tempTracker = new VideoAdTracker(null, adInfo);
			tempTracker.onNoAdReturned();
			tempTracker = null;

			playVideo(model.data.originalVideoUrl, true);
		}

		// add a listener for the "ended" event, so we know when the ad is done.
		/* This keeps the ad loading in an infinite loop. So we're calling this from the Video Player Engine 
		   now instead of from this listener.
			$(videoElement).on('ended', adComplete);
		*/


	}

	function getData(key) {
		traceRoute(model, 'getData');

		// Allows for any of the data from the model's JSON object to be returned.
		key = key.replace('model.','');
		var arrKeyParts = key.split('.');
		var data = model;
		for (var i=0, j=arrKeyParts.length-1; i<=j; i++) {
			data = data[arrKeyParts[i]];
		}
		return data;
	}

	// Using the AdService to request an ad from FreeWheel:
	function getAdService() {
		traceRoute(model, 'getAdService');
		var adService = new AdService(); 
		$(adService).on("adReady", adReady);
		return adService;
	}

	function addVideoAdTracker(event) {
		console.debug("addVideoAdTracker(), lastAdInfo : ", lastAdInfo);
		adTracker = new VideoAdTracker(model.dom.videoId, lastAdInfo);
		var $video = $('#'+model.dom.videoId);
		$video.off('play', addVideoAdTracker);
		$video.removeAttr('controls');
		$adOverlay = $('<div class="adOverlay" style="width:100%;height:100%;position:absolute;top:0;left:0;"><a href="#" target="_blank" style="width:100%;height:100%;display:block;position:absolute;right:0;top:0;">&nbsp;</a></div>');
		
		$adOverlay.on('click', function(event) {
			console.log("ad clicked...");
			event.preventDefault();
			onAdClick(event);
		});

		$video.parent().append($adOverlay);
		
	}

	function onAdClick(event){
		console.log("onAdPaused()");
		var $video = $('#'+model.dom.videoId);
		adTracker.onAdClick(event);
		
		$adOverlay.hide();
		videoElement.pause();
		$video.attr('controls', 'true');
		$video.on('play', onAdContinue);

	}

	function onAdContinue (event) {
		console.log("onAdContinue()");
		var $video = $('#'+model.dom.videoId);

		$video.off('play', onAdContinue);
		$adOverlay.show();
		$video.removeAttr('controls');
	}


	function playVideo(nextUrl, showControls) {

		console.debug('playing video url : ', nextUrl)

		videoElement.src = nextUrl; // This will be either the adUrl or the originalVideoUrl value.
		videoElement.load();
		var $videoTag = $('#'+model.dom.videoId);

		if(model.data.isFreewheelAdPlaying){
			// create the VideoAdTracker to monitor tracking events.
			// You don't need to do anything else with it,
			// and you can create it wherever, doesn't have to be here.
			
			console.debug("adding video tracker to : ", $videoTag);
			$videoTag.on('play', addVideoAdTracker);
			//$videoTag.on('pause', onAdPaused);
			//videoElement.play();


		}else{
			$videoTag.attr('controls', 'controls');
			videoElement.play();
		}

		// The videoElement is the <video> tag & not jQuery's wrapping object around it. So this is equivalent to $('video')[0].
		// setTimeout(function(){
		// 	if (showControls || model.debug.showControls) {
		// 		videoElement.controls = 'controls'; // Native JS & not jQuery's .attr('controls','controls') function.
		// 	} else {
		// 		videoElement.removeAttribute('controls'); // Native JS & not jQuery's .removeAttr() function.
		// 	}
		// },1000);
	}

	// this is the function that gets called when the video feed is loaded..
	function requestAd() {
		traceRoute(model, 'requestAd');
		if (model.debug.all || model.debug.freewheel) {
			log('EVENT HANDLER onGalleryFeed');
		}

		// you'll need to populate some of these with values from the video feed.
		// the adParams.videoId value should be the advertisingID, in the from of "eonline-XXXXXX"
		if (isLocalhost && model.debug.useTestAccount) {
			adParams = model.config.testAccount; // Use the Test account, if someone switches the debugging flag.
		} else {
			adParams = model.config.prodAccount; // Use the prod account above.
		}

		// Dynamic Variable String Replacements.
		
		adParams.siteSectionId = adParams.siteSectionId.replace('%SSID%',model.data.SSID);
		adParams.videoId = adParams.videoId.replace('%PANDA_ID%',model.data.videoId);
		adParams.videoUrl = adParams.videoUrl.replace('%VIDEO_URL%',model.data.videoUrl);

		// Integers.
		adParams.videoHeight = model.data.height;
		// To Do: adParams.duration = model.data.duration;
		adParams.videoWidth = model.data.width;

		// Map it back to the model.data.adParams section, as that's where the video tracking code will pick it up from.
		model.data.adParams = adParams;

		// Call the Ad Service.
		var adService = getAdService();
		adService.requestAd(adParams, model.data.adEdition);
	}

	/*** END FREEWHEEL CORE FUNCTIONS ***/

	function init(json) {
		traceRoute(model, 'init');
		mapData(json);
		requestAd();
	}

	// Maps the init() input data to the model, so that it can be easily referenced anywhere throughout this script as model.*.*.* properties/methods.
	// That way, we don't have to snake parameters through long function chains.
	function mapData(json) {
		traceRoute(model, 'mapData');
		if (json) {

			if (json.domVideoId) {
				model.dom.videoId = json.domVideoId;
				videoElement = $('#'+json.domVideoId)[0];
			}

			// Maps the galleryFeedUrl into the cached model.data.galleryFeedUrl area above.
			if (json.adEdition) { model.data.adEdition = json.adEdition; }
			if (json.duration) { model.data.duration = json.duration; }
			if (json.galleryFeedUrl) { model.data.galleryFeedUrl = json.galleryFeedUrl; }
			if (json.height) { model.data.height = json.height; }
			if (json.SSID) { model.data.SSID = json.SSID; }
			if (json.videoId) { model.data.videoId = json.videoId; }
			if (json.videoUrl) { model.data.videoUrl = json.videoUrl; }
			if (json.width) { model.data.width = json.width; }
		}
	}

	function setData(key, data) {
		traceRoute(model, 'setData');
		if (key.indexOf('.') > -1) {
			key = key.replace(/model./gi,'');
			key = key.replace(/data./gi,'');
			var arrParts = key.split('.');
			var pointer = model.data;
			for (var i=0, j=arrParts.length-1; i<j; i++) {
				var key = arrParts[i];
				if (typeof(pointer[key]) === 'undefined') {
					pointer[key] = {};
				}
				// Move down the object chain.
				pointer = pointer[key];
			}
			// Attach the item to the last value in the array.
			key = arrParts[arrParts.length-1];
			if (data.isArray) { //$.isArray(data)
				//pointer[key] = $.merge(pointer[key], data);
				for (var prop in data) {
					if (('|isArray|length|'.indexOf('|'+prop+'|') === -1) && parseInt(prop)) {
						if (!pointer[key]) {
							pointer[key] = {};
						}
						pointer[key][prop] = data[prop];
					}
				}
			} else {
				pointer[key] = data;
			}
		} else {
			model.data[key] = data;
		}
	}

	// Exposes Public Function Names
	return {
		"adComplete": adComplete,
		"init": init,
		"getData": getData,
		"setData": setData
	};
})(jQuery);
