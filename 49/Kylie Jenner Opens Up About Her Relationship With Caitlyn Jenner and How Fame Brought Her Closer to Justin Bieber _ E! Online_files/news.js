// Client-side jQuery image resizer.
// Author: @briankueck
// Resizes images down when they are too wide for the News Detail Page.
// Btw, max-size doesn't scale proportionally nor does it retain the image sharpness, like this does!
jQuery(document).ready(function($) {

	function clientSideResizer(objDom) {
		var intMaxWidth = 600;
		var strHeight = objDom.css("height");
		var intHeight = parseInt(strHeight.replace(/px/gi,''));
		var strWidth = objDom.css("width");
		var intWidth = parseInt(strWidth.replace(/px/gi,''));
		if (intWidth > intMaxWidth) {
			//console.log('height: ' + intHeight);
			//console.log('width: ' + intWidth);
			var fpRatio = intMaxWidth / intWidth;
			var intNewHeight = Math.round(intHeight * fpRatio);
			var intNewWidth = intMaxWidth;
			//console.log('intNewHeight: ' + intNewHeight);
			//console.log('intNewWidth: ' + intNewWidth);
			objDom.css({
				"height": intNewHeight + "px",
				"width": intNewWidth + "px"
			});
			objDom.attr({
				"height": intNewHeight,
				"width": intNewWidth
			});

			// Change the parent width to avoid wide-margin issues.
			objDom.parent().css({
				"max-width": (intMaxWidth + 10) + "px",
				"width": (intMaxWidth + 10) + "px"
			});
		}
	}

	// Fixes Overly Large News Detail Article Images. Like 1024x768 in a 600px wide column.
	$(".entry_img_left").css("max-width","600");
	$(".entry_content img").each(function(index) {
		if (!$(this).hasClass('no-resize')) {
			clientSideResizer($(this));
		}
	});

	// Fixes Overly Large News Detail Article Videos. Like 640x360 YouTube Videos in a 600px wide column.
	$(".entry_content .html_on_top iframe").each(function(index) {
		//if iframe has class="no-resize", don't resize (e.g. game is 610px wide)
		if(!$(this).hasClass('no-resize')) {clientSideResizer($(this));}
	});

	// Fixes Overly Tall Pages, which have Asynchronous Twitter Tweet Updates.
	function setIntervalX(callback, delay, repetitions) {
	    var x = 0;
	    var intervalID = window.setInterval(function () {
	       callback();
	       if (++x === repetitions) window.clearInterval(intervalID);
	    }, delay);
	}
	setIntervalX(function () {
		if(typeof lp_global !== "undefined"){
			lp_global.AdjustLayout(true, false);
		}
	}, 2000, 10);
	
	// | BEGIN |------------------------------------------------------
	// EOLWEB-3320 Mobile and Desktop Tune-In Text Block by geoEdition
	// ---------------------------------------------------------------

	// EOLWEB-3481 Javascript not needed to support multiple tune-ins per article segment
	//	(function($) {
//		if (typeof etuneInMap !== 'undefined') {
//			
//			// find out what edition user is in via cookie
//			var geoEdition = $.cookie('geoEdition') || '';
//			
//			function addTuneInText(edition) {
//				var editionTuneIn = (edition === '') ? '' : etuneInMap[edition];
//				
//				// add text to html
//				$('.tune-in-text strong').html(editionTuneIn);
//			}
//			
//			// add appropriate tune in text depending on edition
//			addTuneInText(geoEdition);
//		}
//	})(jQuery);
	// | END |--------------------------------------------------------
	// ---------------------------------------------------------------
});