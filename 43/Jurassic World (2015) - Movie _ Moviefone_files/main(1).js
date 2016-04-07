/* jshint undef: true, unused: false, -W008 */
/* global TimelineMax:false, TimelineMax:false, TweenMax:false, TweenMax:false, Back:false, Bounce:false, Circ:false, Cubic:false, Ease:false, EaseLookup:false, Elastic:false, Expo:false, Linear:false, Power0:false, Power1:false, Power2:false, Power3:false, Power3:false, Power4:false, Quad:false, Quart:false, Quint:false, RoughEase:false, Sine:false, SlowMo:false, SteppedEase:false, Strong:false, Draggable:false, SplitText:false, VelocityTracker:false, ThrowPropsPlugin:false, CSSPlugin:false, BezierPlugin:false */
/* global $:false, document:false, getURLParameter:false, window:false, Enabler:false, studio:false, navigator:false*, setTimeout:false/


/* = DC enabler
-----------------------------------------------------------------------------*/

// If true, start function. If false, listen for INIT.
window.onload = function() {
	if (Enabler.isInitialized()) {
		enablerInitHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
	}
};

function enablerInitHandler() {
	// Start ad, initialize animation,load in your image assets, call Enabler methods,
	// and/or include other Studio modules. Also, you can start the Polite Load

	init();
	// DC event
}



/* = GENERAL: Date check
-----------------------------------------------------------------------------*/

// post preview page will have a "?date=2" parameter in the URL
// and force the banner to display the date2

// jshint ignore:start
/*function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}*/
// jshint ignore:end

/*var urlDate = getURLParameter('date');
console.log("urlDate: "+urlDate);*/

// current date
var currentDate = new Date();
console.log("currentDate: "+currentDate);

// target date 2 ("April 8 GET TICKETS")
var targetMonth2 = 3;
var targetDay2 = 25;
var targetYear2 = 2016;
var targetDate2 = new Date(targetYear2,targetMonth2 - 1,targetDay2,0,0,0,0);
console.log("targetDate2: "+targetDate2);

// target date 3 ("Friday GET TICKETS")
var targetMonth3 = 4;
var targetDay3 = 2;
var targetYear3 = 2016;
var targetDate3 = new Date(targetYear3,targetMonth3 - 1,targetDay3,0,0,0,0);
console.log("targetDate3: "+targetDate3);

// target date 4 ("Tomorrow GET TICKETS")
var targetMonth4 = 4;
var targetDay4 = 7;
var targetYear4 = 2016;
var targetDate4 = new Date(targetYear4,targetMonth4 - 1,targetDay4,0,0,0,0);
console.log("targetDate4: "+targetDate4);

// target date 5 ("Now Playing GET TICKETS")
var targetMonth5 = 4;
var targetDay5 = 8;
var targetYear5 = 2016;
var targetDate5 = new Date(targetYear5,targetMonth5 - 1,targetDay5,0,0,0,0);
console.log("targetDate5: "+targetDate5);

// postDate (for test envirement only)
var postDate = false;

// get video ids
var vid_vid = document.getElementById("vid_vid");

// calculate which date assets to display
function targetSet(){

	if (currentDate >= targetDate2 /*|| postDate === true || urlDate >= "2"*/){
		console.log("targetSet: targetDate2");

		// switch to "get tickets" button
		document.getElementById("vid_ctaBtn1").src="end_ctaBtn2.png";
		document.getElementById("vid_ctaBtn1over").src="end_ctaBtn2over.png";
		document.getElementById("end_ctaBtn1").src="end_ctaBtn2.png";
		document.getElementById("end_ctaBtn1over").src="end_ctaBtn2over.png";

		// adjust position
		TweenMax.set(["#vid_ctaBtn1", "#vid_ctaBtn1over", "#end_ctaBtn1", "#end_ctaBtn1over"],{x:+15});

		// switch video
		//vid_vid = document.getElementById("vid_vid2");
	} 

	if (currentDate >= targetDate5 /*|| urlDate === "5"*/){
		console.log("targetSet: targetDate5");
		// adjust date
		document.getElementById("vid_date").src="end_date-now.png";
		document.getElementById("end_date").src="end_date-now.png";
		// adjust position
		TweenMax.set(["#vid_date", "#end_date"], {x:+25});
	}
	else if (currentDate >= targetDate4 /*|| urlDate === "4"*/){
		console.log("targetSet: targetDate4");
		// adjust date
		document.getElementById("vid_date").src="end_date-tom.png";
		document.getElementById("end_date").src="end_date-tom.png";
		// adjust position
		TweenMax.set(["#vid_date", "#end_date"], {x:-15});
	}
	else if (currentDate >= targetDate3 /*|| urlDate === "3"*/){
		console.log("targetSet: targetDate3");
		// adjust date
		document.getElementById("vid_date").src="end_date-fri.png";
		document.getElementById("end_date").src="end_date-fri.png";
	}
}
targetSet();






/* = Mobile device
-----------------------------------------------------------------------------*/

// detect
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iPhone: function() {
		return navigator.userAgent.match(/iPhone|iPod/i);
	},
	iPad: function() {
		return navigator.userAgent.match(/iPad/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iPhone() || isMobile.iPad() || isMobile.Opera() || isMobile.Windows());
	}
};

// any mobile
if ( isMobile.any() ) {

	/* iOS video play button already removed via css */

	/* elements in */
	TweenMax.set([".gen_overlayPlayBtn", "#vid_mobileStatic"], {
		display: "inline"});

	/* move elements to the top */
	TweenMax.set(["#vid_overlayPlayBtn", "#vid_vidCont", "vid_vidLoader", "#vid_mobileStatic"], {
		zIndex: 100});

	/* remove video buttons (pause button will be re-added upon play)*/
	TweenMax.set(["#vid_pauseBtn", 
				  "#vid_playBtn", 
				  "#vid_audioOnBtn", 
				  "#vid_audioOffBtn"], {
		display: "none"});
	
	// adjust position
	TweenMax.set("#vid_pauseBtn", {left:5});
}




/* = GENERAL: Presets
-----------------------------------------------------------------------------*/




/* = VIDEO timeline
-----------------------------------------------------------------------------*/

var vid_tl = new TimelineMax({paused:true});
vid_tl
	// console log
	.add( function(){ console.log("vid_tl start");})

	// other panels out
	.set("#end_panel", {autoAlpha:0, display:"none"}, 0)
	// other timeline stop
	.add( function(){ end_tl.stop(); }, 0)

	// vid_panel in
	.set("#vid_panel", {display:"block"}, 0)
	.fromTo("#vid_panel", .5, {autoAlpha:0}, {autoAlpha:1}, 0)
	.set(vid_vid, {display:"block"}, 0)

	// load video
	.add( function(){ vid_vid.load(); }, 0)
	
	// tt in
	.from("#vid_txt", .3, {alpha:0, ease:Power0.easeOut}, 0)
	.from("#vid_tt", .25, {alpha:0, scale:1.25, ease:Power0.easeOut}, .1)

	// bg in
	.from("#vid_bg", .4, {alpha:0, ease:Power4.easeOut}, .1)
	.from("#vid_bg", .8, {scale:1.5, ease:Power4.easeOut}, .1)

	// date in
	.from("#vid_date", .6, {alpha:0, y:-50, ease:Elastic.easeOut}, .3)

	// ctaBtn in
	.fromTo("#vid_ctaBtn1", .3, {autoAlpha:0, scale:.6}, {autoAlpha:1, scale:1, ease:Back.easeOut}, .5)

	// start video
	.add( function(){ vid_vidStart(); }, .5)

	// console log
	.add( function(){ console.log("vid_tl end ("+vid_tl.totalDuration()+"s)"); } )
;



/* = END timeline
-----------------------------------------------------------------------------*/

var end_tl = new TimelineMax({paused:true});
end_tl
	// console log
	.add( function(){ console.log("end_tl start"); } )

	// other panel out
	.set("#vid_panel", {autoAlpha:0, display:"none"}, 0)
	// other timeline stop
	.add( function(){ vid_tl.stop(); }, 0)

	// end_panel in
	.set("#end_panel", {display:"block"}, 0)
	.fromTo("#end_panel", .1, {autoAlpha:0}, {autoAlpha:1}, 0)

	// tt in
	.from("#end_txt", .3, {alpha:0, ease:Power0.easeOut}, 0)
	.from("#end_tt", .25, {alpha:0, scale:1.25, ease:Power0.easeOut}, .1)

	// bg in
	.from("#end_bg", .4, {alpha:0, ease:Power4.easeOut}, .1)
	.from("#end_bg", .8, {scale:1.5, ease:Power4.easeOut}, .1)

	// date in
	.from("#end_date", .6, {alpha:0, y:-50, ease:Elastic.easeOut}, .3)

	// ctaBtn in
	.fromTo("#end_ctaBtn1", .3, {autoAlpha:0, scale:.6}, {autoAlpha:1, scale:1, ease:Back.easeOut}, .5)

	// replay Btn in
	.fromTo("#end_replayBtn", .8, {alpha:0}, {alpha:.4}, .8)

	// console log
	.add( function(){ console.log("end_tl end ("+end_tl.totalDuration()+"s)"); } )
;




/* = General Buttons
-----------------------------------------------------------------------------*/

// ----- mainClickTag buttons -----

// getElement
var mainClickTag = document.getElementsByClassName("mainClickTag");
// addEventListener
for (var iMainTag=0; iMainTag<mainClickTag.length; iMainTag++){
	mainClickTag[iMainTag].addEventListener('click', mainClickTagHandler, false);
}

// mouse events
function mainClickTagHandler(evt)
{
	console.log("\n"+evt.target.id+" click");
	switch (evt.target.id)
	{
		case "vid_mainClickTag" :
			// stop video and skip to endframe
			skipToEndFrame();
			//
			break;
		case "end_mainClickTag" :
			//
			break;
	}
	// DC event
	Enabler.exit('Background Exit');
}

// stop video and skip to endframe
function skipToEndFrame()
{
	// stop video
	vid_vid.removeEventListener('timeupdate', vid_contPlayFunc, false);
	vid_vid.pause();
	// play END timeline
	end_tl.restart();
	// skip to end of END timeline
	end_tl.progress(1, false);
}



// ----- cta button -----

// getElement
var vid_ctaBtn1 = document.getElementById("vid_ctaBtn1");
var end_ctaBtn1 = document.getElementById("end_ctaBtn1");

// addEventListener

vid_ctaBtn1.addEventListener('mouseover', ctaBtnHandler, false);
vid_ctaBtn1.addEventListener('mouseout', ctaBtnHandler, false);
vid_ctaBtn1.addEventListener('click', ctaBtnHandler, false);

end_ctaBtn1.addEventListener('mouseover', ctaBtnHandler, false);
end_ctaBtn1.addEventListener('mouseout', ctaBtnHandler, false);
end_ctaBtn1.addEventListener('click', ctaBtnHandler, false);

// mouse events
function ctaBtnHandler(evt)
{
	switch (evt.type)
	{
		case 'mouseover' :
			// 'out button' out
			TweenMax.to(evt.target, .4, {alpha:0, ease:Power4.easeOut});
			// 'over btn' in
			if (evt.target === vid_ctaBtn1) {
				// = collpased "expand btn"
				TweenMax.set("#vid_ctaBtn1over", {display: "inline"});
			}
			else if (evt.target === end_ctaBtn1) {
				// = "visit/tickets"
				TweenMax.set("#end_ctaBtn1over", {display: "inline"});
			}
			break;
		case 'mouseout' :
			// 'out button' in
			TweenMax.to(evt.target, .4, {alpha:1, ease:Power4.easeOut});
			// 'over btn' out
			if (evt.target === vid_ctaBtn1) {
				// = collpased "expand btn"
				TweenMax.set("#vid_ctaBtn1over", {display: "none"});
			}
			else if (evt.target === end_ctaBtn1) {
				// = = "visit/tickets"
				TweenMax.set("#end_ctaBtn1over", {display: "none"});
			}
			break;
		case 'click':
			console.log("\n"+evt.target.id+" click");
			switch (evt.target)
			{
				case vid_ctaBtn1 :
					// DC event
					Enabler.exit('vid_panel CTA button Exit Click');
					// stop video and skip to endframe
					skipToEndFrame();
					break;
				case end_ctaBtn1 :
					// DC event
					Enabler.exit('end_panel CTA button Exit Click');
					// skip to END timeline end
					end_tl.progress(1, false);
					break;
			}
			break;
	}
}




// ----- END replay button -----

// getElement
var end_replayBtn = document.getElementById("end_replayBtn");

// addEventListener
end_replayBtn.addEventListener('click', replayBtnHandler, false);
end_replayBtn.addEventListener('mouseover', replayBtnHandler, false);
end_replayBtn.addEventListener('mouseout', replayBtnHandler, false);

// replay button handler
function replayBtnHandler(evt) {
	switch (evt.type)
	{
		case "mouseover" :
			TweenMax.to(end_replayBtn, .5, {rotation:-360, transformOrigin:"12px 10px"});
			TweenMax.to(end_replayBtn, .2, {alpha:.7});
			break;
		case "mouseout" :
			TweenMax.set(end_replayBtn, {rotation:0});
			TweenMax.to(end_replayBtn, .2, {alpha:.4});
			break;
		case "click" :
			// set to false
			vid_firstPlay = false;
			vid_clickForSound = false;
			// play video timeline
			vid_tl.restart();
			break;
	}

}


/* = VIDEO player
-----------------------------------------------------------------------------*/

// turn off volume for development
//vid_vid.volume = 0;

// continue to endpanel before video is over (not for mobile) 
if (!isMobile.any()) {
	var vid_contPlay = true;
}
var vid_contPlayTime = 13.5;

// use "click for Sound" button (otherwise it only has the standard video nav)
var vid_clickForSound = true;

// show "playPauseBtn" button
var vid_playPauseBtn = true;

// muted on load
var vid_autoMute = true;

// first time it plays
var vid_firstPlay = true;

// getElement
var vid_vidNav = document.getElementById("vid_vidNav");
var vid_pauseBtn = document.getElementById("vid_pauseBtn");
var vid_playBtn = document.getElementById("vid_playBtn");
var vid_audioOffBtn = document.getElementById("vid_audioOffBtn");
var vid_audioOnBtn = document.getElementById("vid_audioOnBtn");
var vid_overlayPlayBtn = document.getElementById("vid_overlayPlayBtn");
var vid_clickForSoundBtn = document.getElementById("vid_clickForSoundBtn");
/*var vid_mobileStatic = document.getElementById("vid_mobileStatic");*/

// addEventListener
vid_pauseBtn.addEventListener('click', vid_playHandler, false);
vid_playBtn.addEventListener('click', vid_playHandler, false);
vid_overlayPlayBtn.addEventListener('click', vid_playHandler, false);
/*vid_mobileStatic.addEventListener('click', vid_playHandler, false);*/
vid_audioOffBtn.addEventListener('click', vid_audioHandler, false);
vid_audioOnBtn.addEventListener('click', vid_audioHandler, false);
vid_clickForSoundBtn.addEventListener('click', vid_audioHandler, false);
vid_vid.addEventListener('ended', vid_vidEndHandler, false);

// DC video module
Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
	studio.video.Reporter.attach('vid_video', vid_vid);
});

// start video
function vid_vidStart(){
	// log
	console.log("vid_vid start: "+vid_vid.currentSrc);
	
	// if "playPauseBtn" is false
	if (!vid_playPauseBtn)
	{
		// button out
		TweenMax.set(vid_playBtn, {display:"none"});
		TweenMax.set(vid_pauseBtn, {display:"none"});
	}
	
	// vidNav "inline" but out
	TweenMax.set(vid_vidNav, {display: "inline", autoAlpha:0});

	// if "firstPlay" is false
	if (!vid_firstPlay) {

		// vidStill out
		TweenMax.set("#vid_vidStill", {display:"none"});
		// button out
		TweenMax.set(vid_overlayPlayBtn, {display: "none"});
		TweenMax.set(vid_clickForSoundBtn, {display: "none"});
		TweenMax.set(vid_playBtn, {autoAlpha:0});
	}

	// play video
	vid_vid.play();
	
	// start preloader
	vid_preLoader();
	
	// add event listener for continue to endpanel function
	if (vid_contPlay) {
		vid_vid.addEventListener('timeupdate', vid_contPlayFunc, false);
	}

	// turn sound off as a preset
	vid_vid.muted = true;
	// then let the audioToggle decide to turn sound on/off
	vid_audioToggle();
}

// preLoader
function vid_preLoader() {

	if (vid_vid.readyState === 1) {
		// 1 = HAVE_METADATA - metadata for the audio/video is ready
		// log
		console.log("vid_vid.readyState === 1");

		// loader in
		TweenMax.set("#vid_vidLoader", {display: "inline"});
	}

	if (vid_vid.readyState === 4) {
		//4 = HAVE_ENOUGH_DATA - enough data available to start playing
		// log
		console.log("vid_vid.readyState === 4");

		// loader out
		TweenMax.set("#vid_vidLoader", {display: "none"});
		
		// if "vid_clickForSound" is true
		if (vid_clickForSound && !isMobile.any()) {
			// button in/out
			TweenMax.set(vid_clickForSoundBtn, {display: "inline"});
			TweenMax.set(vid_vidNav, {display: "none"});
		} else {
			// vidNav in
			TweenMax.set(vid_vidNav, {autoAlpha:1});
		}
		
		// if "firstPlay" is false
		if (!vid_firstPlay) {

			// if playPauseBtn AND not iPhone
			if(vid_playPauseBtn && !isMobile.iPhone() ) {
				// button in
				TweenMax.set(vid_pauseBtn, {display:"inline", autoAlpha:1});
			}
		}
		
		// if iPhone
		if(isMobile.iPhone() ) {
			// overlayPlayBtn in
			TweenMax.set(vid_overlayPlayBtn, {delay:.1, display: "inline"});
		}
	} else {
		
		// if it can't find the source
		/*if (vid_vid.NETWORK_NO_SOURCE) {
			console.log("vid_vid error: NETWORK_NO_SOURCE");
		}*/
		
		// run preLoader again
		setTimeout(vid_preLoader, 100);
		
	}
}

// play/pause video
function vid_playHandler(evt){
	console.log("\n"+evt.target.id+" click");

	if (!vid_vid.paused) {
		// not paused:

		// pause video
		vid_vid.pause();

		// button in/out
		TweenMax.set(vid_pauseBtn, {autoAlpha:0});
		TweenMax.set(vid_playBtn, {autoAlpha:1});
		if( isMobile.any() ) {
			// on any mobile
			TweenMax.set(vid_overlayPlayBtn, {display:"inline"});
		}
	} else {
		// paused:
		
		// mobileStatic out
		/*TweenMax.set(vid_mobileStatic, {autoAlpha:0});*/

		// set to false
		vid_firstPlay = false;

		// play video
		vid_vidStart();
	}
}


// audio button handler
function vid_audioHandler(evt) {
	console.log("\n"+evt.target.id+" click");
	vid_audioToggle();
}
function vid_audioToggle() {
	
	if (!vid_vid.muted || vid_autoMute) {
		// video is either unmuted OR on autoMute:

		// mute audio
		vid_vid.muted = true;
		// button in/out
		TweenMax.set(vid_audioOffBtn, {autoAlpha:0});
		TweenMax.set(vid_audioOnBtn, {autoAlpha:1});
		// set vid_autoMute
		vid_autoMute = false;
	} else {
		// video is either muted OR not on autoMute:

		// if this is the first time it plays
		if (vid_firstPlay)
		{
			console.log("blbla");
			// rewind video
			vid_vid.currentTime = 0;

			// set to false
			vid_firstPlay = false;
			vid_clickForSound = false;
			
			// button in/out
			TweenMax.set(vid_vidNav, {display:"inline", autoAlpha:1});
			TweenMax.set(vid_clickForSoundBtn, {display:"none"});
		}

		// unmute audio
		vid_vid.muted = false;

		// button in/out
		TweenMax.set(vid_audioOffBtn, {autoAlpha:1});
		TweenMax.set(vid_audioOnBtn, {autoAlpha:0});

	}
}


// video ended handler
function vid_vidEndHandler() {
	console.log("vid_vid end (current: "+vid_vid.currentTime+"s / total: "+vid_vid.duration+"s)");
	
	// exit full-screen
	if (vid_vid.exitFullscreen) {
		vid_vid.exitFullscreen();
	} else if (vid_vid.webkitExitFullscreen) {
		vid_vid.webkitExitFullscreen();
	} else if (vid_vid.mozCancelFullScreen) {
		vid_vid.mozCancelFullScreen();
	} else if (vid_vid.msExitFullscreen) {
		vid_vid.msExitFullscreen();
	}
	
	if (!vid_contPlay) {
		// play end_tl
		end_tl.restart();
	}
}

// continue to endpanel before video is over
function vid_contPlayFunc() {

	if (vid_vid.currentTime >= vid_contPlayTime) {
		console.log("vid_contPlayTime reached: " + vid_contPlayTime);
		vid_vid.removeEventListener('timeupdate', vid_contPlayFunc, false);

		// play end_tl
		end_tl.restart();
	}
}


/* = Start Banner
-----------------------------------------------------------------------------*/

function init() {
	// play video panel timeline
	vid_tl.restart();
}
