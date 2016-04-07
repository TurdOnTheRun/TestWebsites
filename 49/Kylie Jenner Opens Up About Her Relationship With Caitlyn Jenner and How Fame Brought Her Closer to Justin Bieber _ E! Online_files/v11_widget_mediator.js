var V11WidgetMediator = function(rootHTMLElement) {
	var $ = jQuery;

	var $root = $(rootHTMLElement);

	var myWidgetID = $root.attr('data-eol-widget-id');
	var hasCarousel = $root.attr('data-has-carousel');
	var carouselNum = parseInt($root.attr('data-carousel-num'));
	var titleHeight = $root.attr('data-title-height');
	console.log("** New V11WidgetMEdiator ** myWidgetID : ", myWidgetID);
	console.log("hasCarousel : ", hasCarousel, ", titleHeight : ", titleHeight,", carouselNum : ",carouselNum);
	$(document).ready(function() {
		$("#"+myWidgetID+" .top-photo .widget-titles-wrapper").dotdotdot({height:titleHeight});
	});


	// IMG GROW
	$('#'+myWidgetID+' .carousel li').mouseover(function(e) {
		$(this).find('img').stop().animate({
			"height": "90px",
			"width": "159px",
			"left": "-2px",
			"top": "-1px"
		}, 100, 'swing');
	}).mouseout(function() {
		$(this).find('img').stop().animate({
			"height": "88px",
			"width": "156px",
			"left": "0px",
			"top": "0px"
		}, 100, 'swing');
	});

	$('#'+myWidgetID+' .top-photo').mouseover(function(e) {
		$(this).find('img').stop().animate({
			"height": "172px",
			"width": "306px",
			"left": "-3px",
			"top": "-1px"
		}, 100, 'swing');
	}).mouseout(function() {
		$(this).find('img').stop().animate({
			"height": "169px",
			"width": "300px",
			"left": "0px",
			"top": "0px"
		}, 100, 'swing');
	});

	if (hasCarousel) {
		//CAROUSEL
		$("#"+myWidgetID+" .carousel ul").carouFredSel({
			direction: "up",
			circular: false,
			infinite: false,
			items: carouselNum,
			auto: {
				play: false
			},
			prev: {
				button: "#"+myWidgetID+" .prev",
				key: "down"
			},
			next: {
				button: "#"+myWidgetID+" .next",
				key: "up"
			}
		});

		//Auto Ellipses
		$("#"+myWidgetID+" .carousel .wrapper").ellipsis();

	}

}