var M12WidgetMediator = function(rootHTMLElement) {

	var $ = jQuery;
	var $root = $(rootHTMLElement);

	var videoPropName = $root.attr('data-eol-video-scope');
	var videoScope = $root.attr('data-eol-video-scope');
	var myWidgetID = $root.attr('data-eol-widget-id');
	var widgetContentType = $root.attr('data-eol-widget-content-type');

	//Ellipses
	$("#"+myWidgetID+" .text-wrapper a").dotdotdot({
		height: 85
	});
    console.debug("INITALIZING M12 WIDGET : myWidgetID : ", myWidgetID);


	if (widgetContentType == 'video') {

		// IMG GROW
		$('#'+myWidgetID+' .carousel li').mouseover(function(e) {
			$(this).find('img').stop().animate({
				"height": "100px",
				"width": "175px",
				"left": "-2px",
				"top": "-2px"
			}, 100, 'swing');
		}).mouseout(function() {
			$(this).find('img').stop().animate({
				"height": "96px",
				"width": "171px",
				"left": "0px",
				"top": "0px"
			}, 100, 'swing');
		});
	}

	//CAROUSEL
	$("#" + myWidgetID + " .carousel ul").carouFredSel({
		circular: false,
		infinite: false,
		items: 3,
		auto: {
			play: false
		},
		prev: {
			button: "#" + myWidgetID + " .prev",
			key: "left",
			onAfter: function() {
				// omniture tracking
		    	var widgetName = 'm12-video-thumbnail-carousel';
		    	var callToAction = 'left-arrow';
		    	trackWidgetClick_Ver2(true, "m12", {
		    		pageName: s.pageName, 
		    		widgetName: widgetName, 
		    		elementClicked: 'arrow',
		    		products: ';'+widgetName+';;;event21',
		    		callToAction: callToAction,
		    		destinationURL: ''
		    	});
			}
		},
		next: {
			button: "#" + myWidgetID + " .next",
			key: "right",
			onAfter: function() {
				// omniture tracking
		    	var widgetName = 'm12-video-thumbnail-carousel';
		    	var callToAction = 'right-arrow';
		    	trackWidgetClick_Ver2(true, "m12", {
		    		pageName: s.pageName, 
		    		widgetName: widgetName, 
		    		elementClicked: 'arrow',
		    		products: ';'+widgetName+';;;event21',
		    		callToAction: callToAction,
		    		destinationURL: ''
		    	});
			}
		}
	});
}