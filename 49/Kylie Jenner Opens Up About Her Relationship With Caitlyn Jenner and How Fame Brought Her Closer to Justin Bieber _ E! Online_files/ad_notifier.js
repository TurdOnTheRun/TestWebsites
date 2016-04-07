/**
 * Watches a given video player and dtermines if an ad is playing.
 * Notifies on ad start/stop and video start after ad.
 * @param {String} scope The video player scope/instance name
 */
var AdNotifier = function(options) {
	var $ = jQuery;
	var context = options.context;
	var videoScope = options.videoScope;
	var videoStartCallback = $.proxy(options.videoStart, context);
	var adStartCallback = $.proxy(options.adStart, context);
	var adEndCallback = $.proxy(options.adEnd, context);
	var adIsPlaying = false;

	$pdk.controller.addEventListener("OnMediaStart", function(clip) {
		console.log("OnMediaStart : ", videoScope);
		//console.log(videoScope +" clip : ", clip);
		adIsPlaying = clip.data.baseClip.isAd;

		console.log(videoScope +" adIsPlaying : ", adIsPlaying);
		
		if (adIsPlaying) {
			adStartCallback();
		} else {
			videoStartCallback();
		}

	}, [videoScope]);


	$pdk.controller.addEventListener("OnMediaComplete", function(clip) {
		console.log("OnMediaComplete : ", videoScope);
		//console.log("clip : ", clip);

		if (clip.data.baseClip.isAd) {
			adIsPlaying = false;
			adEndCallback();
		}


	}, [videoScope]);

	function getAdIsPlaying() {
		return adIsPlaying;
	}

	return {
		adIsPlaying:getAdIsPlaying
	}
}