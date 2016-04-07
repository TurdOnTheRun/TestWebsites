var action;
var collapsedPanel;
var exitBtn;
var cta;
var prescribingInfo;
var prescribingInfo2;
var fdaLink;
var termsLink;


$ = function(id) {
	return document.getElementById(id);
}
isIE = function () {
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

initAd = function(){
	if (typeof(IScroll) == 'undefined') {
		setTimeout(initAd, 50);
		return;
	}
	
	collapsedPanel = document.getElementById('collapsed');
	exitBtn = document.getElementById('exit_btn');
	cta = document.getElementById('cta');
	prescribingInfo = document.getElementById('prescribing-info');
	prescribingInfo2 = document.getElementById('prescribing-info2');
	fdaLink = document.getElementById('fda-link');
	termsLink = document.getElementById('terms');

	addListeners();
	
	setTimeout(showBackground, 1800);
	setTimeout(showScroller, 0);
	setTimeout(showFrame1, 6000);
	setTimeout(showOther, 00);
	setTimeout(showSafety, 00);
	
	setTimeout(showSeePI, 00);
	if (isIE() && isIE()<=10) $('container').className = 'ie10';
}

showFrame1 = function() {
	document.getElementById('copy1').className = '';
	setTimeout(hideFrame1, 5000);
}

showBackground = function() {
	document.getElementById('bg_images').className = '';
	
}

hideFrame1 = function() {
	document.getElementById('copy1').className = 'hidden';
	setTimeout(showFrame2, 500);
}

showFrame2 = function() {
	document.getElementById('copy2').className = '';
	setTimeout(hideFrame2, 5000);
}
hideFrame2 = function() {
	document.getElementById('copy2').className = 'hidden';
	setTimeout(showFrame3, 600);
	setTimeout(showCTA, 600);
	setTimeout(showTerms, 600);
}
showFrame3 = function() {
	document.getElementById('copy3').className = '';
	
}
showCTA = function() {
	document.getElementById('cta').className = '';
}

showSafety = function() {
	document.getElementById('safety-info').className = '';
}


showOther = function() {
	document.getElementById('other-warning').className = '';
}

showTerms = function() {
	document.getElementById('terms').className = '';
	
}

showScroller = function() {
	document.getElementById('scroller').className = '';
	
}

showSeePI = function() {
	document.getElementById('seePI').className = '';
	
}


var myScroll;
addListeners = function (){
	exitBtn.addEventListener('click', onExitHandler1, false);
	cta.addEventListener('click', onExitHandler2, false);
	prescribingInfo.addEventListener('click', onExitHandler3, false);
	fdaLink.addEventListener('click', onExitHandler5, false);
	termsLink.addEventListener('click', onExitHandler4, false);
	prescribingInfo2.addEventListener('click', onExitHandler6, false);
	
	
	myScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, interactiveScrollbars: true, click: true });
}

onExitHandler1 = function(e){
	Enabler.exit('HTML5_Background_Clickthrough');
}
onExitHandler2 = function(e){
	Enabler.exit('HTML5_FindOutHow3_Clickthrough');
}
onExitHandler3 = function(e){
	Enabler.exit('HTML5_PrescribingInfo_Clickthrough');
}

onExitHandler4 = function(e){
	Enabler.exit('HTML5_Terms_Clickthrough');
}

onExitHandler5 = function(e){
	Enabler.exit('HTML5_fdalink_Clickthrough');
}

onExitHandler6 = function(e){
	Enabler.exit('HTML5_PrescribingInfo2_Clickthrough');
}