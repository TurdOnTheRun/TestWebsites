var M13WidgetMediator = function(rootHTMLElement) {

	var $ = jQuery;
	var $root = $(rootHTMLElement);

	var videoPropName = $root.attr('data-eol-video-scope');
	var videoScope = $root.attr('data-eol-video-scope');
	var myWidgetID = $root.attr('data-eol-widget-id');
	var widgetContentType = $root.attr('data-eol-widget-content-type');

	//Ellipses
	$("#" + myWidgetID + " .text-wrapper a").dotdotdot({
		height: 85
	});

	console.debug("INITALIZING M13 WIDGET : myWidgetID : ", myWidgetID);


	if (widgetContentType == 'video') {
		// IMG GROW
		$('#' + myWidgetID + ' .carousel li').mouseover(function(e) {
			$(this).find('img').stop().animate({
				"height": "108px",
				"width": "189px",
				"left": "-2px",
				"top": "-2px"
			}, 100, 'swing');
		}).mouseout(function() {
			$(this).find('img').stop().animate({
				"height": "104px",
				"width": "185px",
				"left": "0px",
				"top": "0px"
			}, 100, 'swing');
		});
	}

	//CAROUSEL
	$("#" + myWidgetID + " .carousel ul").carouFredSel({
		circular: false,
		infinite: false,
		items: 4,
		auto: {
			play: false
		},
		prev: {
			button: "#" + myWidgetID + " .prev",
			key: "left"
		},
		next: {
			button: "#" + myWidgetID + " .next",
			key: "right"
		}
	});

}