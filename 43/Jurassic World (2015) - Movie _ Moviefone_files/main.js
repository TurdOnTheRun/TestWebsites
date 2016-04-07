/* jshint undef: true, unused: false, -W008 */
/* global TimelineMax:false, TimelineMax:false, TweenMax:false, TweenMax:false, Back:false, Bounce:false, Circ:false, Cubic:false, Ease:false, EaseLookup:false, Elastic:false, Expo:false, Linear:false, Power0:false, Power1:false, Power2:false, Power3:false, Power3:false, Power4:false, Quad:false, Quart:false, Quint:false, RoughEase:false, Sine:false, SlowMo:false, SteppedEase:false, Strong:false, Draggable:false, SplitText:false, VelocityTracker:false, ThrowPropsPlugin:false, CSSPlugin:false, BezierPlugin:false */
/* global document:false, getURLParameter:false, window:false, navigator:false, setTimeout:false, Enabler:false, studio:false */


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
	// Start ad, initialize animation,
	// load in your image assets, call Enabler methods,
	// and/or include other Studio modules.
	// Also, you can start the Polite Load

	Enabler.setExpandingPixelOffsets(
		0, // left offset of expanded ad
		0, // top offset of expanded ad
		970, // expanded width of ad
		418); 

	init();
	// DC event
}

Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START,
						 function() {
	Enabler.finishExpand();
});
Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START,
						 function() {
	Enabler.finishCollapse();
});
Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH,
						 function() {
});




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

// target date 2 ("Friday GET TICKETS")
var targetMonth2 = 4;
var targetDay2 = 2;
var targetYear2 = 2016;
var targetDate2 = new Date(targetYear2,targetMonth2 - 1,targetDay2,0,0,0,0);
console.log("targetDate2: "+targetDate2);

// target date 3 ("Tomorrow GET TICKETS")
var targetMonth3 = 4;
var targetDay3 = 7;
var targetYear3 = 2016;
var targetDate3 = new Date(targetYear3,targetMonth3 - 1,targetDay3,0,0,0,0);
console.log("targetDate3: "+targetDate3);

// target date 4 ("Now Playing GET TICKETS")
var targetMonth4 = 4;
var targetDay4 = 8;
var targetYear4 = 2016;
var targetDate4 = new Date(targetYear4,targetMonth4 - 1,targetDay4,0,0,0,0);
console.log("targetDate4: "+targetDate4);

// postDate (for test envirement only)
var postDate = false;

// get video ids
var auto_vid = document.getElementById("auto_vid");
var exp_vid = document.getElementById("exp_vid");

// calculate which date assets to display
function targetSet(){

	if (currentDate >= targetDate4/* || urlDate === "4"*/){
		console.log("targetSet: targetDate5");
		// switch date
		document.getElementById("auto_date").src="exp_date-now.png";
		document.getElementById("col_date").src="col_date-now.png";
		document.getElementById("exp_date").src="exp_date-now.png";
		// adjust position
		TweenMax.set(["#auto_date", "#exp_date"], {x:+30});
		TweenMax.set(["#auto_ctaBtn1","#auto_ctaBtn1over", "#exp_ctaBtn1","#exp_ctaBtn1over"], {x:-40});
	}
	else if (currentDate >= targetDate3/* || urlDate === "3"*/){
		console.log("targetSet: targetDate3");
		// switch date
		document.getElementById("auto_date").src="exp_date-tom.png";
		document.getElementById("col_date").src="col_date-tom.png";
		document.getElementById("exp_date").src="exp_date-tom.png";
		// adjust position
		TweenMax.set(["#auto_date", "#exp_date"], {x:-10});
		TweenMax.set(["#auto_ctaBtn1","#auto_ctaBtn1over", "#exp_ctaBtn1","#exp_ctaBtn1over"], {x:+5});
	}
	else if (currentDate >= targetDate2/* || urlDate === "2"*/){
		console.log("targetSet: targetDate2");
		// switch date
		document.getElementById("auto_date").src="exp_date-fri.png";
		document.getElementById("col_date").src="col_date-fri.png";
		document.getElementById("exp_date").src="exp_date-fri.png";
		// adjust position
		TweenMax.set(["#auto_date", "#exp_date"], {x:5});
		TweenMax.set(["#auto_ctaBtn1","#auto_ctaBtn1over", "#exp_ctaBtn1","#exp_ctaBtn1over"], {x:-5});
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

	/* vidStill & overlayPlayBtn in */
	TweenMax.set([".gen_vidStill", 
				  ".gen_overlayPlayBtn"], {
		display: "inline"});

	/* move vidCont to the top (since mobile pushed mainClickTag to the top)*/
	TweenMax.set(["#auto_vidCont", 
				  "#exp_vidCont"], {
		zIndex: 100});

	/* remove video buttons (pause/skip button will be re-added upon play)*/
	TweenMax.set(["#exp_skipBtn", 
				  "#exp_pauseBtn", 
				  "#exp_playBtn", 
				  "#exp_audioOnBtn", 
				  "#exp_audioOffBtn"], {
		display: "none"});
}




/* = GENERAL: Presets
-----------------------------------------------------------------------------*/

// get ID (for FPO pushdown preview page)
/*var iFramePar = window.parent.document.getElementById("banner1");*/




/* = AUTO timeline
-----------------------------------------------------------------------------*/

var auto_tl = new TimelineMax({paused:true});

auto_tl
	// console log
	.add( function(){ console.log("auto_tl start");})

	// other panels out
	.set("#col_panel", {autoAlpha:0, display:"none"}, 0)
	.set("#exp_panel", {autoAlpha:0, display:"none"}, 0)

	// this panel in
	.set("#auto_panel", {display:"block"}, 0)
	.fromTo("#auto_panel", .2, {autoAlpha:0}, {autoAlpha:1}, 0)

	// load video
	.add( function(){ auto_vid.load(); }, 0)

	// video in
	.fromTo(["#auto_vidCont"], .5, {alpha:0}, {alpha:1}, 0)
	.set(auto_vid, {display:"block"}, 0)
	// play video
	.add( function(){ auto_vidStart(); }, 0)

	// bg in
	.from("#auto_bg", .4, {alpha:0, ease:Power4.easeOut}, 0)
	.from("#auto_bg", .8, {scale:1.5, ease:Power4.easeOut}, 0)

	// tt in
	.from("#auto_txt", .3, {alpha:0, ease:Power0.easeOut}, .1)
	.from("#auto_tt", .7, {alpha:0, scale:1.25, ease:Power4.easeOut}, .1)

	// date in
	.from("#auto_date", .6, {y:-60, ease:Elastic.easeOut}, .2)

	// ctaBtn in
	.from("#auto_ctaBtn1", .3, {alpha:0, scale:.6, ease:Back.easeOut}, .3)

	// close auto expand after 8sec
	.add( function(){ closeAuto(); }, 9)

	// console log
	.add( function(){ console.log("auto_tl end (total: "+auto_tl.totalDuration()+"s)"); } )
;


/* = COLLAPSED timeline
-----------------------------------------------------------------------------*/

var col_tl = new TimelineMax({paused:true});

col_tl
	// console log
	.add( function(){ console.log("col_tl start"); } )

	// set iFrame height (for FPO pushdown preview page)
	/*.add( function(){ 
		if (iFramePar){
			TweenMax.set(iFramePar, {height:66});
		}
	}, 0)*/

	// other panels out
	.set("#auto_panel", {autoAlpha:0, display:"none"}, 0)
	.set("#exp_panel", {autoAlpha:0, display:"none"}, 0)

	// other panels stop
	.add( function(){ auto_tl.stop(); }, 0)
	.add( function(){ exp_tl.stop(); }, 0)

	// this panel in
	.to("#col_panel", 0.2, {autoAlpha:1, display:"block"}, 0)

	// tt in
	.from("#col_txt", .3, {alpha:0, ease:Power0.easeOut}, 0)
	.from("#col_tt", .25, {alpha:0, scale:1.25, ease:Power0.easeOut}, .1)

	// bg in
	.from("#col_bg", .4, {alpha:0, ease:Power4.easeOut}, .1)
	.from("#col_bg", .8, {scale:1.5, ease:Power4.easeOut}, .1)

	// date in
	.from("#col_date", .6, {y:-66, ease:Elastic.easeOut}, .3)

	// ctaBtn in
	.fromTo("#col_ctaBtn1", .3, {autoAlpha:0, scale:.6}, {autoAlpha:1, scale:1, ease:Back.easeOut}, .5)

	// console log
	.add( function(){ console.log("col_tl end (total: "+col_tl.totalDuration()+"s)"); } )

;



/* = EXPAND timeline
-----------------------------------------------------------------------------*/

var exp_tl = new TimelineMax({paused:true});

exp_tl
// console log
	.add( function(){ console.log("exp_tl start"); })

	// set iFrame height (for FPO pushdown preview page)
	/*.add( function(){ 
		if (iFramePar){
			TweenMax.set(iFramePar, {height:418});
		}
	}, 0)*/

	// other panels out
	.set("#col_panel", {autoAlpha:0, display:"none"}, 0)
	// other panels stop
	.add( function(){ col_tl.stop(); }, 0)

	// this panel in
	.to("#exp_panel", 0, {autoAlpha:1, display:"block"}, 0)
	.to(exp_vid, 0, {autoAlpha:1, display:"block"}, 0)

	// load video
	.add( function(){ exp_vid.load(); }, 0)
	// vidNav out
	.set("#exp_vidNav", {autoAlpha:0}, 0)

	// bg in
	.from("#exp_bg", .4, {alpha:0, ease:Power4.easeOut}, 0)
	.from("#exp_bg", .8, {scale:1.25, ease:Power4.easeOut}, 0)

	// tt in
	.from("#exp_txt", .3, {alpha:0, ease:Power0.easeOut}, .1)
	.from("#exp_tt", .7, {alpha:0, scale:1.5, ease:Power4.easeOut}, .2)

	// date in
	.from("#exp_date", .6, {y:-60, ease:Elastic.easeOut}, .2)

	// video in
	.fromTo("#exp_vidCont", .4, {alpha:0, x:50}, {alpha:1, x:0, ease:Back.easeOut}, .2)
	.set(exp_vid, {display:"block"}, .2)
	// play video
	.add( function(){ exp_vidStart(); }, .2)

	// ctaBtn in
	.fromTo("#exp_ctaBtn1", .3, {autoAlpha:0, scale:.6}, {autoAlpha:1, scale:1, ease:Back.easeOut}, .5)

	// closeBtn in
	.set("#exp_closeBtn", {alpha:.7}, .4)

	// console log
	.add( function(){ console.log("exp_tl end (total: "+exp_tl.totalDuration()+"s)"); } )
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

// mouse event
function mainClickTagHandler(evt)
{
	console.log("\n"+evt.target.className+" click");
	switch (evt.target.id)
	{
		case "auto_mainClickTag" :
			// DC event
			Enabler.exit('auto_panel Background Exit Click');
			// close AUTO panel
			closeAuto();
			//
			break;
		case "col_mainClickTag" :
			// DC event
			Enabler.exit('col_panel Background Exit Click');
			//
			break;
		case "exp_mainClickTag" :
			// DC event
			Enabler.exit('exp_panel Background Exit Click');
			// close user EXPAND panel
			closeExp();
			//
			break;
	}
	// skip to COLLAPSED timeline end
	col_tl.progress(1, false);
}




// ----- close buttons -----

// getElement
var closeBtn = document.getElementsByClassName("closeBtn");
// addEventListener
for (var iCloseBtn=0; iCloseBtn<closeBtn.length; iCloseBtn++){
	closeBtn[iCloseBtn].addEventListener('mouseover', closeBtnHandler, false);
	closeBtn[iCloseBtn].addEventListener('mouseout', closeBtnHandler, false);
	closeBtn[iCloseBtn].addEventListener('click', closeBtnHandler, false);
}
// mouse events
function closeBtnHandler(evt)
{
	switch (evt.type)
	{
		case 'mouseover' :
			TweenMax.to(evt.target, .4, {alpha:0, ease:Power4.easeOut});
			if (evt.target.id === "auto_closeBtn") {
				TweenMax.set("#auto_closeBtnOver", {display: "inline"});
			} else if (evt.target.id === "exp_closeBtn") {
				TweenMax.set("#exp_closeBtnOver", {display: "inline"});
			}
			/*TweenMax.to(evt.target, .8, {boxShadow:"0px 0px 4px 2px #ffd2d2", ease:Power4.easeOut});*/
			break;
		case 'mouseout' :
			TweenMax.to(evt.target, .4, {alpha:1, ease:Power4.easeOut});
			if (evt.target.id === "auto_closeBtn") {
				TweenMax.set("#auto_closeBtnOver", {display: "none"});
			} else if (evt.target.id === "exp_closeBtn") {
				TweenMax.set("#exp_closeBtnOver", {display: "none"});
			}
			/*TweenMax.to(evt.target, .4, {boxShadow:"0px 0px 0px 0px #ffd2d2"});*/
			break;
		case 'click' :
			console.log("\n"+evt.target.id+" click");
			switch (evt.target.id)
			{
				case "auto_closeBtn" :
					// DC events
					Enabler.reportManualClose();
					Enabler.counter('auto_panel Manual Close', true);
					// close AUTO panel
					closeAuto();
					//
					break;
				case "exp_closeBtn" :
					// DC events
					Enabler.reportManualClose();
					Enabler.counter('exp_panel Manual Close', true);
					// close user EXPAND panel
					closeExp();
					//
					break;
			}
			break;
	}
}




// ----- cta button -----

// getElement
var auto_ctaBtn1 = document.getElementById("auto_ctaBtn1");
var col_ctaBtn1 = document.getElementById("col_ctaBtn1");
var exp_ctaBtn1 = document.getElementById("exp_ctaBtn1");

// addEventListener
auto_ctaBtn1.addEventListener('mouseover', ctaBtnHandler, false);
auto_ctaBtn1.addEventListener('mouseout', ctaBtnHandler, false);
auto_ctaBtn1.addEventListener('click', ctaBtnHandler, false);

col_ctaBtn1.addEventListener('mouseover', ctaBtnHandler, false);
col_ctaBtn1.addEventListener('mouseout', ctaBtnHandler, false);
col_ctaBtn1.addEventListener('click', ctaBtnHandler, false);

exp_ctaBtn1.addEventListener('mouseover', ctaBtnHandler, false);
exp_ctaBtn1.addEventListener('mouseout', ctaBtnHandler, false);
exp_ctaBtn1.addEventListener('click', ctaBtnHandler, false);

// mouse events
function ctaBtnHandler(evt)
{
	switch (evt.type)
	{
		case 'mouseover' :
			// 'out button' out
			TweenMax.to(evt.target, .4, {alpha:0, ease:Power4.easeOut});
			// 'over btn' in
			if (evt.target === auto_ctaBtn1) {
				// = auto "trailer/tickets"
				TweenMax.set("#auto_ctaBtn1over", {display: "inline"});
			} else if (evt.target === col_ctaBtn1) {
				// = collpased "expand btn"
				TweenMax.set("#col_ctaBtn1over", {display: "inline"});
			}
			else if (evt.target === exp_ctaBtn1) {
				// = "visit/tickets"
				TweenMax.set("#exp_ctaBtn1over", {display: "inline"});
			}
			break;
		case 'mouseout' :
			// 'out button' in
			TweenMax.to(evt.target, .4, {alpha:1, ease:Power4.easeOut});
			// 'over btn' out
			if (evt.target === auto_ctaBtn1) {
				// = auto "trailer/tickets"
				TweenMax.set("#auto_ctaBtn1over", {display: "none"});
			} else if (evt.target === col_ctaBtn1) {
				// = collpased "expand btn"
				TweenMax.set("#col_ctaBtn1over", {display: "none"});
			}
			else if (evt.target === exp_ctaBtn1) {
				// = = "visit/tickets"
				TweenMax.set("#exp_ctaBtn1over", {display: "none"});
			}
			break;
		case 'click':
			console.log("\n"+evt.target.id+" click");
			switch (evt.target)
			{
				case auto_ctaBtn1 :
					// DC event
					Enabler.exit('auto_panel CTA button Exit Click');
					// close AUTO panel
					closeAuto();
					// skip to COLLAPSED timeline end
					col_tl.progress(1, false);
					break;
				case col_ctaBtn1 :
					// DC event
					Enabler.requestExpand();
					Enabler.counter('exp_panel Expansion Counter', true);    
					Enabler.startTimer('exp_panel Expansion Timer');
					// play expand
					exp_tl.restart();
					break;
				case exp_ctaBtn1 :
					// DC event
					Enabler.exit('exp_panel CTA button Exit Click');
					// close user EXPAND panel
					closeExp();
					// skip to COLLAPSED timeline end
					col_tl.progress(1, false);
					break;
			}
			break;
	}
}

function closeAuto()
{
	// pause video
	console.log("auto_vid end (current: "+auto_vid.currentTime+"s / total: "+auto_vid.duration+"s)");
	auto_vid.pause();
	// remove vidEndHandler
	auto_vid.removeEventListener('ended', closeAuto, false);

	// DC events
	Enabler.requestCollapse();
	Enabler.stopTimer('auto_panel Expansion Timer');

	// exit fullscreen (mobile)
	// if iPhone
	if(isMobile.iPhone() ) {
		auto_vid.webkitExitFullscreen();
	}
	//mozCancelFullScreen();
	//msExitFullscreen();

	// play COLLAPSED timeline
	col_tl.restart();
}

function closeExp()
{
	// pause video
	exp_vid.pause();
	console.log("exp_vid paused (current: "+exp_vid.currentTime+"s / total: "+exp_vid.duration+"s)");

	// DC events
	Enabler.requestCollapse();
	Enabler.stopTimer('exp_panel Expansion Timer');

	// play COLLAPSED timeline
	col_tl.restart();
}



/* = AUTO video
-----------------------------------------------------------------------------*/

// first time video plays
var auto_firstPlay = true;

// getElement
var auto_overlayPlayBtn = document.getElementById("auto_overlayPlayBtn");

// addEventListener	
auto_vid.addEventListener('ended', closeAuto, false);
auto_overlayPlayBtn.addEventListener('touchend', auto_playHandler, false);


// start video
function auto_vidStart(){

	// if first play is false
	if (!auto_firstPlay) {
		// overlayPlayBtn out
		TweenMax.set(auto_overlayPlayBtn, {display: "none"});
		// vidStill out
		TweenMax.set("#auto_vidStill", {display: "none"});
	}

	// start preloader
	auto_preLoader();

	// play video
	auto_vid.play();

	// firstPlay is now false
	auto_firstPlay = false;

	// log
	console.log("auto_vid start: "+auto_vid.currentSrc);
}


// play video button handler
function auto_playHandler(evt){

	// log
	console.log("\n"+evt.target.id+" touchend");

	// play video
	auto_vidStart();
}


// preLoader
function auto_preLoader() {

	if (auto_vid.readyState === 1) {
		// 1 = HAVE_METADATA - metadata for the audio/video is ready
		// log
		console.log("auto_vid.readyState === 1");

		// loader in
		TweenMax.set("#auto_vidLoader", {display: "inline"});
	}

	if (auto_vid.readyState === 4) {
		// 4 = HAVE_ENOUGH_DATA - enough data available to start playing
		// log
		console.log("auto_vid.readyState === 4");

		// loader out
		TweenMax.set("#auto_vidLoader", {display: "none"});
		// if iPhone
		if(isMobile.iPhone() ) {
			// overlayPlayBtn in
			TweenMax.set(auto_overlayPlayBtn, {delay:.1, display: "inline"});
		}
	} else {
		// run preLoader again
		setTimeout(auto_preLoader, 100);
	}
}





/* = EXPAND video player
-----------------------------------------------------------------------------*/

// turn off volume for development
//exp_vid.volume = 0;

// muted on load?
var exp_autoMute = false;

// first time it plays
var exp_firstPlay = true;

// getElement
var exp_vidNav = document.getElementById("exp_vidNav");
var exp_skipBtn = document.getElementById("exp_skipBtn");
var exp_pauseBtn = document.getElementById("exp_pauseBtn");
var exp_playBtn = document.getElementById("exp_playBtn");
var exp_audioOffBtn = document.getElementById("exp_audioOffBtn");
var exp_audioOnBtn = document.getElementById("exp_audioOnBtn");
var exp_replayBtn = document.getElementById("exp_replayBtn");
var exp_overlayPlayBtn = document.getElementById("exp_overlayPlayBtn");

// addEventListener
exp_skipBtn.addEventListener('click', replayBtnHandler, false);
exp_pauseBtn.addEventListener('click', exp_playHandler, false);
exp_pauseBtn.addEventListener('touchstart', exp_playHandler, false);
exp_playBtn.addEventListener('click', exp_playHandler, false);
exp_overlayPlayBtn.addEventListener('touchstart', exp_playHandler, false);
exp_audioOffBtn.addEventListener('click', exp_audioHandler, false);
exp_audioOnBtn.addEventListener('click', exp_audioHandler, false);
exp_replayBtn.addEventListener('click', replayBtnHandler, false);
exp_replayBtn.addEventListener('touchstart', replayBtnHandler, false);
exp_vid.addEventListener('ended', exp_vidEndHandler, false);

// DC video module
Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
	studio.video.Reporter.attach('exp_video', exp_vid);
});

// start video
function exp_vidStart(){

	// button out/in
	TweenMax.set(exp_replayBtn, {autoAlpha:0});

	// if first play is false
	if (!exp_firstPlay) {

		// vidStill out
		TweenMax.set("#exp_vidStill", {display:"none"});
		// button out/in
		TweenMax.set(exp_overlayPlayBtn, {display: "none"});
		TweenMax.set(exp_playBtn, {autoAlpha:0});
		// if not iPhone
		if(!isMobile.iPhone() ) {
			TweenMax.set(exp_pauseBtn, {display:"inline", autoAlpha:1});
			TweenMax.set(exp_skipBtn, {display:"inline", autoAlpha:1});
		}
	}

	// start preloader
	exp_preLoader();

	// play video
	exp_vid.play();

	// turn sound off as a preset
	exp_vid.muted = true;
	// then let the audioToggle decide to turn sound on/off
	exp_audioToggle();

	// log
	console.log("exp_vid start: "+exp_vid.currentSrc);
}

// preLoader
function exp_preLoader() {

	if (exp_vid.readyState === 1) {
		// 1 = HAVE_METADATA - metadata for the audio/video is ready
		// log
		console.log("exp_vid.readyState === 1");

		// loader in
		TweenMax.set("#exp_vidLoader", {display: "inline"});
	}

	if (exp_vid.readyState === 4) {
		//4 = HAVE_ENOUGH_DATA - enough data available to start playing
		// log
		console.log("exp_vid.readyState === 4");

		// loader out
		TweenMax.set("#exp_vidLoader", {display: "none"});
		// vidNav in
		TweenMax.to(exp_vidNav, .5, {autoAlpha:1});
		// if iPhone
		if(isMobile.iPhone() ) {
			// overlayPlayBtn in
			TweenMax.set(exp_overlayPlayBtn, {delay:.1, display: "inline"});
		}
	} else {
		// run preLoader again
		setTimeout(exp_preLoader, 100);
	}
}

// play/pause video
function exp_playHandler(evt){
	console.log("\n"+evt.target.id+" click");

	if (!exp_vid.paused) {
		// not paused:

		// pause video
		exp_vid.pause();

		// button in/out
		TweenMax.set(exp_pauseBtn, {autoAlpha:0});
		TweenMax.set(exp_playBtn, {autoAlpha:1});
		if( isMobile.any() ) {
			// on any mobile
			TweenMax.set(exp_overlayPlayBtn, {display:"inline"});
			TweenMax.set(exp_skipBtn, {autoAlpha:0});
		}
	} else {
		// paused:

		// set to false
		exp_firstPlay = false;

		// play video
		exp_vidStart();
	}
}

// audio button handler
function exp_audioHandler(evt) {
	console.log("\n"+evt.target.id+" click");
	exp_audioToggle();
}
function exp_audioToggle() {
	
	if (!exp_vid.muted || exp_autoMute) {
		// video is either unmuted or on autoMute:

		// mute audio
		exp_vid.muted = true;

		// button in/out
		TweenMax.set(exp_audioOffBtn, {autoAlpha:0});
		TweenMax.set(exp_audioOnBtn, {autoAlpha:1});

		// set autoMute
		exp_autoMute = false;
		
		//
		console.log("\n"+"exp_audioToggle: mute");

	} else {
		// video is either muted or not on autoMute:

		// if this is the first time it plays
		if (exp_firstPlay)
		{
			// rewind video 
			exp_vid.currentTime = 0;
			// set to false
			exp_firstPlay = false;
		}

		// unmute audio
		exp_vid.muted = false;

		// button in/out
		TweenMax.set(exp_audioOffBtn, {autoAlpha:1});
		TweenMax.set(exp_audioOnBtn, {autoAlpha:0});
		
		//
		console.log("\n"+"exp_audioToggle: unmute");

	}
}

// video ended handler
function exp_vidEndHandler() {
	console.log("exp_vid end (current: "+exp_vid.currentTime+"s / total: "+exp_vid.duration+"s)");

	// exit fullscreen
	if (exp_vid.exitFullscreen) {
		exp_vid.exitFullscreen();
	} else if (exp_vid.webkitExitFullscreen) {
		exp_vid.webkitExitFullscreen();
	} else if (exp_vid.mozCancelFullScreen) {
		exp_vid.mozCancelFullScreen();
	} else if (exp_vid.msExitFullscreen) {
		exp_vid.msExitFullscreen();
	}

	// rewind to still frame sec
	//exp_vid.currentTime = 3;

	// vidStill in
	//TweenMax.set("#exp_vidStill", {display:"inline"});

	// remove overlayPlayBtn button
	TweenMax.set(exp_overlayPlayBtn, {display: "none"});

	// button out/in
	TweenMax.to(exp_vidNav, .1, {autoAlpha:0});
	TweenMax.to(exp_replayBtn, .5, {display:"inline", autoAlpha:1});
}

// replay button handler
function replayBtnHandler(evt) {
	console.log("\n"+evt.target.id+" click");

	// rewind to beginning
	exp_vid.currentTime = 0;

	// vidStill out
	TweenMax.set("#exp_vidStill", {display: "none"});
	// button out
	TweenMax.to(exp_replayBtn, .5, {autoAlpha:0});

	// play video
	exp_vidStart();
}






/* = Start Banner
-----------------------------------------------------------------------------*/

function init() {
	// DC events
	Enabler.setStartExpanded(true);
	Enabler.requestExpand();
	Enabler.counter('auto_panel Expansion Counter', true);    
	Enabler.startTimer('auto_panel Expansion Timer');
	// play AUTO panel timeline
	auto_tl.restart();
}