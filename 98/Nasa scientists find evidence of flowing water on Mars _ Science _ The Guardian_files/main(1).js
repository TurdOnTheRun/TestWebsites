// JavaScript Document
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

if (!Enabler.isInitialized()) {
  Enabler.addEventListener(
    studio.events.StudioEvent.INIT,
    enablerInitialized);
} else {
   enablerInitialized();
}
function enablerInitialized() {
  // Enabler initialized.
  // In App ads are rendered offscreen so animation should wait for
  // the visible event. These are simulated with delays in the local
  // environment.
  if (!Enabler.isVisible()) {
    Enabler.addEventListener(
      studio.events.StudioEvent.VISIBLE,
      initAd);
  } else {
     initAd();
  }
}

function initAd() {
	'use strict';
	
	function getEl(elem) {
		return document.getElementById(elem);
	}
	
	var ad = getEl('ad_content'),
		cta = getEl('f6_cta'),
		arrow = getEl('f6_cta_arrow'),
		txt1 = getEl('f1_txt'),
		txt2 = getEl('f5_txt'),
		txt3 = getEl('f6_txt'),
		txt2Holder = getEl('f5-holder'),
		line = getEl('line'),
		img = getEl('bgImg'),
		logo = getEl('logo'),
		delay = 0,
		ease1 = "linear",
		ease2 = "Power1.easeOuts",
		debug = true;

	function onAdClick() {
		Enabler.exit('Ad clicked', clickTag);
	}

	function adClickThru() {
		ad.addEventListener('click', onAdClick, false);
		ad.addEventListener('touchend', onAdClick, false);
	}

	function getUserAgent() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
			iOS = true;
			trace('userAgent: iOS');
		} else if( userAgent.match( /Android/i ) ) {
			trace('userAgent: Android');
		} else {
			trace('userAgent: desktop');
		}
	}
	
	function trace(message) {
		if(debug) window.console.log(message);
	}
//////////////////////////// CLASS UTILS - for older browsers that don't support classList ////////////////////////////

	function hasClass(elem, cname) {
		// whole word search
		var re = new RegExp('\\b'+cname+'\\b','gi');
		if(elem.className.match(re)) return true;
		else return false;
	}

	function addClass(elem, cname) {
		if(hasClass(elem,cname)) trace('addClass warning: "'+cname+'" already exists on '+elem.innerHTML);
		else elem.className += ' '+cname;
	}

	function removeClass(elem, cname) {
		if(hasClass(elem,cname)) {
			if(elem.className.indexOf(' '+cname) > -1) elem.className = elem.className.replace(' '+cname, '');
			else if(elem.className.indexOf(cname+' ') > -1) elem.className = elem.className.replace(cname+' ', '');
			else elem.className = elem.className.replace(cname, '');
		}
		else trace('removeClass warning: "'+cname+'" not found on '+elem.innerHTML);
	}

	function replaceClass(elem, cname1, cname2) {
		removeClass(elem,cname1);
		addClass(elem,cname2);
	}
	
///////////// TIMER /////////////
	function adLength(){
		time++
	}

	function startTimer(){
		TimerInterval = setInterval(adLength, 1000);
	}

	function getAdLength(){
		clearInterval(TimerInterval)
		console.log("ad duration:"+time+"secs")
	}
///////////////

////////// animation
	function startAnim () {
		addClass(ad, 'bg-color1');
		TweenLite.to(txt1, 0, { left: "300px", delay: 0});
		TweenLite.to(txt2Holder, 0, { left: "216px", delay: 0});
		//TweenLite.to(txt2Holder, 0, { width: "84px", delay: 0});
		TweenLite.to(txt2, 0, { left: "-260px", delay: 0});
		TweenLite.to(txt3, 0, { opacity: 0, delay: 0});
		TweenLite.to(cta, 0, { opacity: 0, delay: 0});
		// TweenLite.to(img, 0, { left: "300px", delay: 0});
		TweenLite.to(img, 0, { width: "auto", height: "650px", left: -20, top: 0, delay: 0});
		TweenLite.to(line, 0, { left: "300px", delay: 0});
		TweenLite.to(logo, 0, { top: 600, delay: 0});
		
		ad.style.display = "block";
		frame1();
	}
	

	function frame1() {
		console.log("frame: 1");
		//addClass(img, 'f1-anim');
		delay = 0;
		
		TweenLite.to(txt1, 1, { left: "0", ease: ease2, delay: delay, onComplete:frame2});
	}
	
	function frame2() {
		console.log("frame: 2");
		
		delay = 1;
		
		removeClass(line, 'alpha0');
		
		TweenLite.to(line, .5, { left: "216px", ease: ease1, delay: delay});
		TweenLite.to(img, .5, { left: "-106", ease: ease1, delay: delay});
		TweenLite.to(txt1, .5, { width: "216px", ease: ease1, delay: delay, onComplete:frame3});
	}
	
	function frame3(){
		console.log("frame: 3");
		
		delay=0;
		
		removeClass(ad, 'bg-color1');
		addClass(ad, 'bg-color2');
		removeClass(txt2Holder, 'alpha0');
		
		TweenLite.to(line, 1, { left: "26px", ease: ease1, delay: delay});
		TweenLite.to(img, 1, { left: "-296px", ease: ease1, delay: delay});
		
		TweenLite.to(txt2Holder, 1, {left:"26px", ease: ease1, delay: delay});
		TweenLite.to(txt2, 1, {left:"0", ease: ease1, delay: delay});
		
		TweenLite.to(txt1, 1, { width: "26px", ease: ease1, delay: delay, onComplete:frame4});
	}
	function frame4() {
		console.log("frame: 4");
		
		delay=0;
		
		TweenLite.to(line, .5, { left: "-2", ease: ease2, delay: delay});
		TweenLite.to(txt2Holder, 0.5, {left:"0", ease: ease2, delay: delay});
		TweenLite.to(img, .5, { left: "-324px", ease: ease2, delay: delay});
		TweenLite.to(txt1, .5, { width: "0px", ease: ease2, delay: delay, onComplete:frame5});
		
	}
	function frame5() {
		console.log("frame: 5");
		
		delay=1;
		
		removeClass(logo, 'alpha0');
		
		TweenLite.to(img, .5, { width: "auto", height: "545", left: "-130px", top: 0, ease: ease2, delay: delay});
		TweenLite.to(logo, .5, { top: "545px", ease: ease2, delay: delay});
		TweenLite.to(txt2Holder, .5, {opacity:0, ease: ease2, delay: delay, onComplete:frame6});
	}
	
	function frame6() {
		console.log("frame: 6");
		
		delay=0;
		
		removeClass(txt3, 'alpha0');
		removeClass(cta, 'alpha0');
		removeClass(arrow, 'alpha0');
		
		TweenLite.to(txt3, 1, {opacity:1, ease: ease2, delay: delay});
		TweenLite.to(cta, 1, {opacity:1, ease: ease2, delay: delay, 
			onComplete: function() {
				TweenLite.to(arrow, {x:2}, {x:0}, 0.5);
			}
		});
	}
///////////

////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

	getUserAgent();
	adClickThru();
	//adReset();
	startAnim();

}

