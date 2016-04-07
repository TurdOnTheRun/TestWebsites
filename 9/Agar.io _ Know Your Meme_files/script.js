jQuery.noConflict();
 
(function($) {
	var adDiv;

	function initEB() {
    	if (!EB.isInitialized()) {
        	EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    	} else {
        	startAd();
    	}
	}

	function startAd() {
    	adDiv = document.getElementById("ad");

    	addEventListeners();
	
		TweenMax.delayedCall(1, init_animation);
	}

	function addEventListeners() {
		document.getElementById("holder").addEventListener("click", clickthrough);
	}
	
	/************************************ Custom JS *****************************************/
	
	function init_animation()
	{
		init_firstframe();
		
	}


	function init_firstframe(){	
	
			
		
		TweenMax.to($("#first_frame"), .5, {opacity:0, delay:1.5});


		TweenMax.to($("#first_face_frame "), .1, {opacity:0, delay:0});
		TweenMax.to($("#first_face_frame "), .5, {top:0, opacity:0, delay:1});
		TweenMax.to($("#first_face_frame "), .5, {opacity:1, delay:2});

		TweenMax.to($("#first_face_frame "), .5, {opacity:0, delay:4});

	
		TweenMax.to($("#second_frame"), .1, {opacity:0, delay:0});
		TweenMax.to($("#second_frame"), .5, {top:300, opacity:0, delay:1});
		TweenMax.to($("#second_frame"), .5, {opacity:1, delay:4.5});
		TweenMax.to($("#second_frame"), .5, {opacity:0, delay:7.5});

		TweenMax.to($("#second_face_frame"), .1, {opacity:0, delay:0});
		TweenMax.to($("#second_face_frame"), .5, {top:300, opacity:0, delay:1});	
		TweenMax.to($("#second_face_frame"), .5, {opacity:1, delay:8});			
		TweenMax.to($("#second_face_frame"), .5, {top:246, left:30, scaleX:.8, scaleY:.8, opacity:1, delay:10});													
		
		TweenMax.to($("#create"), .1, {opacity:0, delay:0});
		TweenMax.to($("#create"), .1, {top:496, opacity:0, delay:1});		
		TweenMax.to($("#create "), .5, {opacity:1, opacity:1, delay:10.5, scaleX:1, scaleY:1, ease:Bounce.easeOut});								
		TweenMax.to($("#create "), .5, {opacity:1, opacity:1, delay:10.6, scaleX:1.3, scaleY:1.3, ease:Bounce.easeOut});	
		TweenMax.to($("#create "), .5, {opacity:1, opacity:1, delay:10.7, scaleX:1, scaleY:1, ease:Bounce.easeOut});	

		TweenMax.to($("#taste"), .1, {opacity:0, delay:0});
		TweenMax.to($("#taste"), .1, {top:514, opacity:0, delay:1});	
		TweenMax.to($("#taste"), .5, {opacity:1, opacity:1, delay:11.3, scaleX:1, scaleY:1, ease:Bounce.easeOut});	
		TweenMax.to($("#taste"), .5, {opacity:1, opacity:1, delay:11.4, scaleX:1.3, scaleY:1.3, ease:Bounce.easeOut});	
		TweenMax.to($("#taste"), .5, {opacity:1, opacity:1, delay:11.5, scaleX:1, scaleY:1, ease:Bounce.easeOut});
		
		
	}



	function clickthrough() {
		EB.clickthrough();
	}
	
	window.addEventListener("load", initEB);
	
})(jQuery);

/*********************************************************************************************/
