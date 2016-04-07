/**
 * Provides custom scrolling behavior to thumbnail carousels within a RoyalSlider instance.
 * 
 * The default behavior is to scroll the next video's thumb to the first position in the carousel,
 * but can be overridden by passing in handlers with the init options.
 */

var RSThumbScrollBehavior	=	function (slider, options) {
	console.debug("*** new RSThumbScrollBehavior()");
	var $ = jQuery;
	if(!options){
		options = {};
	}


	var defaults = {
		pageSize:3,
		leftArrowClickHandler:onLeftArrowClick,
		rightArrowClickHandler:onRightArrowClick,
		setCurrentThumbHandler:moveUpNextThumbToFirstPosition
	}


	options = $.extend( defaults, options  );

	var $player;


	if(slider._thumbsArrows) {
		slider._thumbsArrowLeft.off();
		slider._thumbsArrowRight.off();

		slider._thumbsArrowLeft.on('click', onLeftArrowClick);
		slider._thumbsArrowRight.on('click', onRightArrowClick);

	}

	if(options.hasOwnProperty("player")){

	}else{
		$pdk.ready(function() {
			$pdk.controller.addEventListener("OnReleaseStart", function(playlist) {
				console.debug("RSThumbScrollBehavior OnReleaseStart...");
				moveUpNextThumbToFirstPosition();
			}, [options.videoScope]);
		});
	}





	slider._setCurrentThumb =  function(id, justSet) {
		moveUpNextThumbToFirstPosition();
	}


	/**
	 * Makes the "Up Next" thumbnail the first visible thumb in the carousel.
	 * @param   {Number}  currentThumbIndex  The thumb index of the currently playing video.
	 */
	function moveUpNextThumbToFirstPosition(currentThumbIndex){
		console.log('slider ' , slider);


		if(slider){

			var nextIndex = slider.currSlideId+1;

			var offset = nextIndex * slider._thumbSize;

			
			var targetPos = slider._thumbsMinPosition - offset;
			if(targetPos < slider._thumbsMaxPosition){
				targetPos = slider._thumbsMaxPosition;
			}
			scrollThumbsTo(targetPos);
		}

	}

	function onLeftArrowClick () {

		// get the current left pos as a number
		var currentPos = parseFloat( $(slider._thumbsContainer).css('left'), 10 );
		var targetPos = currentPos + (options.pageSize * slider._thumbSize);
		if(targetPos > slider._thumbsMinPosition){
			targetPos = slider._thumbsMinPosition;
		}

		scrollThumbsTo(targetPos);
	}


	function onRightArrowClick () {

		var $thumbsContainer = $(slider._thumbsContainer);
		var left = $(slider._thumbsContainer).css('left');
		
		//temp fix for scrolling before left has been set
		if(left == "auto"){
			left = 0;
		}

		var currentPos = parseFloat( left, 10 );

		var targetPos = currentPos - (options.pageSize * slider._thumbSize);
		if(targetPos < slider._thumbsMaxPosition){
			targetPos = slider._thumbsMaxPosition;
		}
		scrollThumbsTo(targetPos);
	}

	function scrollThumbsTo (targetPos) {
		TweenLite.to(slider._thumbsContainer, .5, {left:targetPos, onComplete:function(){
			slider._setThumbsPosition(targetPos);
			slider._updateThumbsArrows();
		}});
	}

	return {
		moveUpNextThumbToFirstPosition:moveUpNextThumbToFirstPosition
	}

}