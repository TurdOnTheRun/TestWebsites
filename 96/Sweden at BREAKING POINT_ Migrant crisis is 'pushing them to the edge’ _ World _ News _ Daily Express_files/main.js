// JavaScript Document
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

function initAd() {
	'use strict';
	
	function getEl(elem) {
		return document.getElementById(elem);
	}
	
	var ad = getEl('ad_content'),
		cta = getEl('cta'),
		sheen = getEl('sheen'),
		txt1 = getEl('txt1'),
		txt2 = getEl('txt2'),
		//txt2Holder = getEl('f5-holder'),
		cookieBag = getEl('cookie_bag'),
		crumbsAll = getEl('crumbs_all'),
		ct = getEl('clickThrough'),
		img = getEl('image'),
		logo = getEl('logo'),
		delay = 0,
		ease1 = "linear",
		ease2 = "Power1.easeOut", 
		ease3 = "Power1.easeInOut",
		debug = true,
		finished = false;

	/*function getUserAgent() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
			trace(userAgent);
		if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
			iOS = true;
			trace('userAgent: iOS');
		} else if( userAgent.match( /Android/i ) ) {
			trace('userAgent: Android');
		} else {
			trace('userAgent: desktop');
		}
	}*/
	
	function trace(message) {
		if(debug) window.console.log(message);
	}
	
	function onAdClick(e) {
		trace ("click");
		//window.open(window.clickTag);
		EB.clickthrough();
		//EB.clickthrough();
	}
	
	/*
	function clickthroughOver() {
	TweenLite.to(sheen, .5, {left:102, onComplete:function() {
		sheen.style.left = "-84px";
	}});
}
	*/
	
	function onAdOver(e) {
		trace ("over");
		if (finished) {
			sheen.style.visibility = "visible";
			TweenLite.to(sheen, .5, {left:"290px", onComplete:function() {
				sheen.style.left = "150px"; sheen.style.visibility = "hidden";}});
		}
	}
	
	function onAdOut(e) {
		//TweenLite.to(cta, 0, { opacity: 1, delay: 0});
		//TweenLite.to(ctao, 0, { opacity: 0, delay: 0});
	}

	function adClickThru() {
		//ad.style.cursor = 'pointer';
		ct.addEventListener('touchEnd', onAdClick, false);
		ct.addEventListener('click', onAdClick, false);
		ct.addEventListener('mouseover', onAdOver, false);
		/*
		cta.addEventListener('mouseout', onAdOut, false);
		cta.addEventListener('touchEnd', onAdClick, false);
		cta.addEventListener('click', onAdClick, false);*/
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
		console.log("frame: 0");
		addClass(ad, 'bg-color1');
		TweenLite.to(txt1, 0, { opacity: 0, delay: 0});
		//TweenLite.to(txt2Holder, 0, { width: "84px", delay: 0});
		TweenLite.to(txt2, 0, { opacity: 0, delay: 0});
		TweenLite.to(cta, 0, { opacity: 0, delay: 0});
		//TweenLite.to(sheen, 0, { opacity: 0, delay: 0});
		sheen.style.visibility = "hidden";
		TweenLite.to(img, 0, { left: "804px", top:"-30px", delay: 0});
		TweenLite.to(cookieBag, 0, { opacity: 0, delay: 0});
		TweenLite.to(cookieBag, 0, { opacity: 0, left: "300px", delay: 0});
		TweenLite.to(crumbsAll, 0, { opacity: 0, delay: 0});
		
		frame1();
	}
	
	

	function frame1() {
		console.log("frame: 1");
		//addClass(img, 'f1-anim');
		delay = .3;
		
		TweenLite.to(txt1, 1, { opacity: 1, delay: delay});
		TweenLite.to(crumbsAll, 1, { opacity: 1, delay: delay});
		
		delay = 1.7;
		
		TweenLite.to(img, 6, { left: "-20px", ease: ease3, delay: delay});
		TweenLite.to(txt1, 6, { left: "-794px", ease: ease3, delay: delay});
		TweenLite.to(crumbsAll, 6, { left: "-558px", ease: ease3, delay: delay, onComplete:frame2});
		
	}
	
	function frame2() {
		console.log("frame: 2");
		
		delay = 0;
		
		TweenLite.to(txt2, 1, { opacity: 1, ease: ease1, delay: delay, onComplete:frame3});
	}
	
	function frame3(){
		console.log("frame: 3");
		
		delay=1.5;
		
		TweenLite.to(img, 1, { width: "302px", height: "298px", left: "-30px", top:"0px",ease: ease2, delay: delay});
		TweenLite.to(crumbsAll, .5, { opacity: 0, ease: ease2, delay: delay});
		TweenLite.to(txt2, .5, { opacity: 0, ease: ease1, delay: delay});
		TweenLite.to(cookieBag, .5, { opacity: 1, left: "175px", delay: delay+=.4});
		TweenLite.to(cta, .5, { opacity: 1, delay: delay+=.4, onComplete:frame4});
	}
	
	function frame4() {
		console.log("frame: 4");
		
		delay=.5;
		
		sheen.style.visibility = "visible";
		TweenLite.to(sheen, .5, {left:"290px", onComplete:function() {
				sheen.style.left = "150px"; sheen.style.visibility = "hidden";}});
		finished = true;
		
	}
	
	function frame5() {
		console.log("frame: 5");
		
		delay=1;
		
		//TweenLite.to(img, .5, { width: "602px", height: "325px", left: "-225px", ease: ease2, delay: delay});
		//TweenLite.to(logo, .5, { top: "195px", ease: ease2, delay: delay});
	}
	/*
	function frame6() {
		console.log("frame: 6");
		
		delay=0;
		
		removeClass(txt3, 'alpha0');
		removeClass(cta, 'alpha0');
		
		TweenLite.to(txt3, 1, {opacity:1, ease: ease2, delay: delay});
		TweenLite.to(cta, 1, {opacity:1, ease: ease2, delay: delay});
		
		
	}
	*/
///////////

////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

	//getUserAgent();
	adClickThru();
	//adReset();
	startAnim();

}

/*window.onload = function(){
	initAd();
};*/