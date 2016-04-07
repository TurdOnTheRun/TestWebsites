/************************************************************************************************************
				*Filename:     videos.js
				*Description:  JS for EOL video detail page
				*Version:      1.0.0 (2012-05-15)
				*Website:      http://www.eonline.com
*************************************************************************************************************/

(function($){
	$(document).ready(function() {
		var maxThumbs = 4;
		var oDom = $(".video-slide-container");
		if ((oDom) && (typeof(oDom.tinycarousel) !== 'undefined')) {
			oDom.tinycarousel({
				"display": maxThumbs
			});
		}
		
		var ioDom = $(".ipad-video-slide-container");
		if ((ioDom) && (typeof(ioDom.tinycarousel) !== 'undefined')) {
			ioDom.tinycarousel({
				"display": 5
			});
		}
		
	});
	

})(jQuery.noConflict());  