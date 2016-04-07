/*------------------------------------------------------------------------*/
// VARS
/*------------------------------------------------------------------------*/
// NOTE: Legend of data type naming convention suffixes
//----------------------------------------------------
// "_num" 		: (NUMBER)
// "_obj" 		: (OBJECT)
// "_bool" 		: (BOOLEAN)
// "_str" 		: (STRING)
// "_arr" 		: (ARRAY)
// "_div"		: (DIV)
// "_span"		: (SPAN)
// "_regExp"	: (REGULAR EXPRESSION)
// "(capitals)"	: (CONSTANT)
// "_intv" 		: (SET INTERVAL)
// "_txt" 		: (TEXT FIELD) Div with text
// "_img" 		: (IMAGEHOLDER) Div with image
// "_iseq" 		: (IMAGESEQUENCE) Div with sequence of images that animate
// "_tbox" 		: (TEXT BOX) Colored div with text
// "_frm" 		: (FRAME) Animation Frame
// "_rect" 		: (RECTANGLE) Div with background color
// "_ns" 		: (NINE SPLICE) A 9-splice object
//----------------------------------------------------
var container_div = FT.query("#container");
var border_div = FT.query("#border");
var bg_div = FT.query("#background");
var introRichload_div = FT.query("#introRichload");
var endframeRichload_div = FT.query("#endframeRichload");
var frame4Richload_div = FT.query("#frame4Richload");

var frame5BG_div = FT.query("#frame5BG");
var frame6BG_div = FT.query("#frame6BG");

var frame2_div = FT.query("#frame2");
var frame3_div = FT.query("#frame3");
var frame4_div = FT.query("#frame4");
var frame5_div = FT.query("#frame5");
var frame6_div = FT.query("#frame6");

var frame2Headline_img = FT.query("#frame2headline");
var frame2SubHeadline1_img = FT.query("#frame2subHeadline1");
var frame2SubHeadline2_img = FT.query("#frame2subHeadline2");
var frame3Headline_img = FT.query("#frame3headline");
var frame3SubHeadline1_img = FT.query("#frame3subHeadline1");
var frame3SubHeadline2_img = FT.query("#frame3subHeadline2");
var frame4Headline_img = FT.query("#frame4headline");
var frame4SubHeadline1_img = FT.query("#frame4subHeadline1");
var frame4SubHeadline2_img = FT.query("#frame4subHeadline2");
var frame4SubHeadline3_img = FT.query("#frame4subHeadline3");
var frame5Headline_img = FT.query("#frame5headline");
var frame5SubHeadline1_img = FT.query("#frame5subHeadline1");
var frame5SubHeadline2_img = FT.query("#frame5subHeadline2");
var frame6Headline_img = FT.query("#frame6headline");
var frame6SubHeadline1_img = FT.query("#frame6subHeadline1");
var frame6SubHeadline2_img = FT.query("#frame6subHeadline2");

var frame6Image_img = FT.query("#frame6brandImage");

var frame2BGImage_img = FT.query("#frame2BGImage");
var frame3BGImage_img = FT.query("#frame3BGImage");
var frame4BGImage_img = FT.query("#frame4BGImage");
var frame5BGImage_img = FT.query("#frame5BGImage");
var frame6BGImage_img = FT.query("#frame6BGImage");

var legal_f2_div = FT.query("#legal_f2");
var legal_f3_div = FT.query("#legal_f3");
var legal_f4_div = FT.query("#legal_f4");
var legal_f5_div = FT.query("#legal_f5");
var legal_f6_div = FT.query("#legal_f6");

var ctaBtn_div = FT.query("#ctaBtn");

var dynamicURL;
var imagesLoaded = 0;
var richloadsLoaded = 0;

var allImagesLoaded = false;
var allRichloadsLoaded = false;

var TOTAL_IMAGES_TO_LOAD = 16;

var ctaX;
var ctaY;

var useRL;
var f4_useRL;

var subHeadline2X;
var subHeadline2Y;

var subHeadline3X;
var subHeadline3Y;

var headline4X;
var headline4Y;

var showLogo;

var richloadsToLoad = 1;

myFT.addEventListener("instantads", function(){
	TweenLite.lagSmoothing(0);
	f4_useRL = myFT.instantAds.F4_useRL
	useRL = myFT.instantAds.endframe_useRL;
	
	frame2BGImage_img.onload = imageLoaded();
	frame2BGImage_img.src = myFT.instantAds.F2_backgroundIMG;
	
	frame3BGImage_img.onload = imageLoaded();
	frame3BGImage_img.src = myFT.instantAds.F3_backgroundIMG;
	
	frame4BGImage_img.onload = imageLoaded();
	frame4BGImage_img.src = myFT.instantAds.F4_backgroundIMG;
	
	frame5BGImage_img.onload = imageLoaded();
	frame5BGImage_img.src = myFT.instantAds.F5_backgroundIMG;
	
	frame6BGImage_img.onload = imageLoaded();
	frame6BGImage_img.src = myFT.instantAds.F6_backgroundIMG;
	
	frame2Headline_img.onload = imageLoaded();
	frame2Headline_img.src = myFT.instantAds.F2_headline;
	
	frame2SubHeadline1_img.onload = imageLoaded();
	frame2SubHeadline1_img.src = myFT.instantAds.F2_subHeadline1;
	
	frame2SubHeadline2_img.onload = imageLoaded();
	frame2SubHeadline2_img.src = myFT.instantAds.F2_subHeadline2;
	
	frame3Headline_img.onload = imageLoaded();
	frame3Headline_img.src = myFT.instantAds.F3_headline;
	
	frame3SubHeadline1_img.onload = imageLoaded();
	frame3SubHeadline1_img.src = myFT.instantAds.F3_subHeadline1;
	
	frame3SubHeadline2_img.onload = imageLoaded();
	frame3SubHeadline2_img.src = myFT.instantAds.F3_subHeadline2;
	
	if(f4_useRL !== "true" && f4_useRL !== "TRUE") {
		frame4Headline_img.onload = imageLoaded();
		frame4Headline_img.src = myFT.instantAds.F4_headline;
	
		frame4SubHeadline1_img.onload = imageLoaded();
		frame4SubHeadline1_img.src = myFT.instantAds.F4_subHeadline1;
	
		frame4SubHeadline2_img.onload = imageLoaded();
		frame4SubHeadline2_img.src = myFT.instantAds.F4_subHeadline2;
	
		frame4SubHeadline3_img.onload = imageLoaded();
		frame4SubHeadline3_img.src = myFT.instantAds.F4_subHeadline3;
		
		TOTAL_IMAGES_TO_LOAD+=4;
	}
	
	frame5Headline_img.onload = imageLoaded();
	frame5Headline_img.src = myFT.instantAds.F5_headline;
	
	frame5SubHeadline1_img.onload = imageLoaded();
	frame5SubHeadline1_img.src = myFT.instantAds.F5_subHeadline1;
		
	frame5SubHeadline2_img.onload = imageLoaded();
	frame5SubHeadline2_img.src = myFT.instantAds.F5_subHeadline2;
	
	frame6Image_img.onload = imageLoaded();
	frame6Image_img.src = myFT.instantAds.F6_brandIMG;
	
	if(useRL !== "true" && useRL !== "TRUE") {
		frame6Headline_img.onload = imageLoaded();
		frame6Headline_img.src = myFT.instantAds.F6_headline;
	
		frame6SubHeadline1_img.onload = imageLoaded();
		frame6SubHeadline1_img.src = myFT.instantAds.F6_subHeadline1;
		
		frame6SubHeadline2_img.onload = imageLoaded();
		frame6SubHeadline2_img.src = myFT.instantAds.F6_subHeadline2;
		
		TOTAL_IMAGES_TO_LOAD+=3;
	}
	
	ctaBtn_div.onload = imageLoaded();
	ctaBtn_div.src = myFT.instantAds.endframe_CTA_btn;
});

function imageLoaded(e) {
	imagesLoaded++;
	
	if(imagesLoaded == TOTAL_IMAGES_TO_LOAD) {
		allImagesLoaded = true;
		checkLoads();
	}
}

myFT.addEventListener("richload", function(){
	richloadsLoaded++;
	if(richloadsLoaded == 1) {
		var parent = introRichload_div;
		myFT.insertRichload({
			richload: 'introAnimation',    	// should match the name of the richload as defined in the manifest
			parent: parent,     			// using insertRichload you do not have to insert in to an <ft-richload> element
			width: 300,         			// optional - will inherit the offset parent width if not passed
			height: 600,        			// optional - will inherit the offset parent height if not passed
		});
		
		richloadsToLoad++;
		
		if(useRL === "true" || useRL === "TRUE") {
			var parent = endframeRichload_div;
			myFT.insertRichload({
				richload: 'endFrameAnimation',    	// should match the name of the richload as defined in the manifest
				parent: parent,     			// using insertRichload you do not have to insert in to an <ft-richload> element
				width: 300,         			// optional - will inherit the offset parent width if not passed
				height: 600,        			// optional - will inherit the offset parent height if not passed
			});
			richloadsToLoad++;
		}
		
		if(f4_useRL === "true" || f4_useRL === "TRUE") {
			var parent = frame4Richload_div;
			myFT.insertRichload({
				richload: 'midFrameAnimation',    	// should match the name of the richload as defined in the manifest
				parent: parent,     			// using insertRichload you do not have to insert in to an <ft-richload> element
				width: 300,         			// optional - will inherit the offset parent width if not passed
				height: 600,        			// optional - will inherit the offset parent height if not passed
			});
			richloadsToLoad++;
		}
	} else if(richloadsLoaded == richloadsToLoad) {
		allRichloadsLoaded = true;
	}
	
	checkLoads();
});

function checkLoads() {
	if(allImagesLoaded && allRichloadsLoaded) {
		setupBanner();
	}
}	

function setupBanner() {
	showLogo = parseIAText(myFT.instantAds.showLogo_F2_F3_F4_F5);
	
	var colors = parseIAText(myFT.instantAds.hex_border_F1bkg_F2bkg_F3bkg_F4bkg_F5bkg_F6bkg);
	var legalColors = parseIAText(myFT.instantAds.hex_F2legal_F3legal_F4legal_F5legal_F6legal);
	
	border_div.style.borderColor = colors[0];
	bg_div.style.backgroundColor = colors[1];
	frame2_div.style.backgroundColor = colors[2];
	frame3_div.style.backgroundColor = colors[3];
	frame4_div.style.backgroundColor = colors[4];
	frame5BG_div.style.backgroundColor = colors[5];
	frame6BG_div.style.backgroundColor = colors[6];
	
	legal_f2_div.style.color = legalColors[0];
	legal_f3_div.style.color = legalColors[1];
	legal_f4_div.style.color = legalColors[2];
	legal_f5_div.style.color = legalColors[3];
	legal_f6_div.style.color = legalColors[4];
	
	//FRAME 2
	frame2Headline_img.style.top = myFT.instantAds.F2_headline_offsetY;
	frame2SubHeadline1_img.style.top = myFT.instantAds.F2_subHeadline1_offsetY;
	
	subHeadline2X = myFT.instantAds.F2_subHeadline2_offsetX;
	subHeadline2Y = myFT.instantAds.F2_subHeadline2_offsetY;
	
	//FRAME 3
	frame3Headline_img.style.top = myFT.instantAds.F3_headline_offsetY;
	frame3SubHeadline1_img.style.top = myFT.instantAds.F3_subHeadline1_offsetY;
	
	subHeadline3X = myFT.instantAds.F3_subHeadline2_offsetX;
	subHeadline3Y = myFT.instantAds.F3_subHeadline2_offsetY;
	
	//FRAME 4
	headline4X = myFT.instantAds.F4_headline_offsetX;
	headline4Y = myFT.instantAds.F4_headline_offsetY;
	
	frame4SubHeadline1_img.style.top = myFT.instantAds.F4_subHeadline1_offsetY;
	frame4SubHeadline2_img.style.left = myFT.instantAds.F4_subHeadline2_offsetX;
	frame4SubHeadline3_img.style.left = myFT.instantAds.F4_subHeadline3_offsetX;
	
	//FRAME 5
	frame5Headline_img.style.top = myFT.instantAds.F5_headline_offsetY;
	frame5SubHeadline1_img.style.top = myFT.instantAds.F5_subHeadline1_offsetY;
	frame5SubHeadline2_img.style.top = myFT.instantAds.F5_subHeadline2_offsetY;
	
	//FRAME 6
	frame6Headline_img.style.top = myFT.instantAds.F6_headline_offsetY;
	frame6SubHeadline1_img.style.top = myFT.instantAds.F6_subHeadline1_offsetY;
	frame6SubHeadline2_img.style.left = myFT.instantAds.F6_subHeadline1_offsetX;
	
	ctaX = myFT.instantAds.endframe_CTA_offsetX;
	ctaY = myFT.instantAds.endframe_CTA_offsetY;
	
	legal_f2_div.innerHTML = "<div style='text-align:" + myFT.instantAds.F2_legalTxt_align + "'>" + myFT.instantAds.F2_legalTxt + "</div>";
	legal_f3_div.innerHTML = "<div style='text-align:" + myFT.instantAds.F3_legalTxt_align + "'>" + myFT.instantAds.F3_legalTxt + "</div>";
	legal_f4_div.innerHTML = "<div style='text-align:" + myFT.instantAds.F4_legalTxt_align + "'>" + myFT.instantAds.F4_legalTxt + "</div>";
	legal_f5_div.innerHTML = "<div style='text-align:" + myFT.instantAds.F5_legalTxt_align + "'>" + myFT.instantAds.F5_legalTxt + "</div>";
	legal_f6_div.innerHTML = "<div style='text-align:" + myFT.instantAds.F6_legalTxt_align + "'>" + myFT.instantAds.F6_legalTxt + "</div>";
	
	dynamicURL = myFT.instantAds.clickTag_URL;
	
	myFT.applyClickTag(container_div, 1, dynamicURL);
	
	playFrame1();
}

function playFrame1() {
	TweenLite.delayedCall(myFT.instantAds.F1_duration, playFrame2);
}

function playFrame2() {
	TweenLite.delayedCall(myFT.instantAds.F2_duration, playFrame3);
	
	frame2_div.style.opacity = 1;
	
	var sh2OrigDimensions = [frame2SubHeadline2_img.clientWidth, frame2SubHeadline2_img.clientHeight];
	
	prepareForPopin(frame2SubHeadline2_img, subHeadline2X, subHeadline2Y);
	
	var delays = parseIAText(myFT.instantAds.F2_Delays_logo_headline_subhead1_subhead2_legal);
	var speeds = parseIAText(myFT.instantAds.F2_Speeds_headline_subhead1_subhead2_legal);
	
	checkLogo(0, delays[0]);
	TweenLite.to(frame2Headline_img, speeds[0], {css:{left:0}, delay:delays[1]});
	TweenLite.to(frame2SubHeadline1_img, speeds[1], {css:{left:0}, overwrite:"none", delay:delays[2]});
	
	TweenLite.to(frame2SubHeadline2_img, 0, {css:{opacity:1}, overwrite:"none", delay:delays[3]});
	TweenLite.to(frame2SubHeadline2_img, speeds[2], {css:{left:subHeadline2X + "px", top:subHeadline2Y + "px", width:sh2OrigDimensions[0], height:sh2OrigDimensions[1]}, overwrite:"none", ease:Back.easeOut, delay:delays[3]});
	
	TweenLite.to(legal_f2_div, speeds[3], {css:{opacity:1}, delay:delays[4]});
}

function playFrame3() {
	TweenLite.delayedCall(myFT.instantAds.F3_duration, playFrame4);
	
	frame3_div.style.opacity = 1;
	frame2_div.style.opacity = 0;
	
	var sh3OrigDimensions = [frame3SubHeadline2_img.clientWidth, frame3SubHeadline2_img.clientHeight];
	
	prepareForPopin(frame3SubHeadline2_img, subHeadline3X, subHeadline3Y);
	
	var delays = parseIAText(myFT.instantAds.F3_Delays_logo_headline_subhead1_subhead2_legal);
	var speeds = parseIAText(myFT.instantAds.F3_Speeds_headline_subhead1_subhead2_legal);
	
	checkLogo(1, delays[0]);
	
	TweenLite.to(frame3Headline_img, speeds[0], {css:{left:0}, delay:delays[1]});
	TweenLite.to(frame3SubHeadline1_img, speeds[1], {css:{left:0}, overwrite:"none", delay:delays[2]});
	
	TweenLite.to(frame3SubHeadline2_img, 0, {css:{opacity:1}, overwrite:"none", delay:delays[3]});
	TweenLite.to(frame3SubHeadline2_img, speeds[2], {css:{left:subHeadline3X + "px", top:subHeadline3Y + "px", width:sh3OrigDimensions[0], height:sh3OrigDimensions[1]}, overwrite:"none", ease:Back.easeOut, delay:delays[3]});
	
	TweenLite.to(legal_f3_div, speeds[3], {css:{opacity:1}, delay:delays[4]});
}

function playFrame4() {
	TweenLite.delayedCall(myFT.instantAds.F4_duration, playFrame5);
	
	frame4_div.style.opacity = 1;
	frame3_div.style.opacity = 0;
	
	var h4OrigDimensions = [frame4Headline_img.clientWidth, frame4Headline_img.clientHeight];
	
	prepareForPopin(frame4Headline_img, headline4X, headline4Y);
	
	var delays = parseIAText(myFT.instantAds.F4_Delays_logo_headline_subhead1_subhead2_subhead3_legal);
	var speeds = parseIAText(myFT.instantAds.F4_Speeds_headline_subhead1_subhead2_subhead3_legal);
	
	checkLogo(2, delays[0]);
	
	if(f4_useRL === "true" || f4_useRL === "TRUE") {
		TweenLite.delayedCall(delays[0], myFT.richloads.midFrameAnimation.frame.contentWindow.startAnimation);
	} else {
		TweenLite.to(frame4Headline_img, 0, {css:{opacity:1}, overwrite:"none", delay:delays[1]});
		TweenLite.to(frame4Headline_img, speeds[0], {css:{left:headline4X + "px", top:headline4Y + "px", width:h4OrigDimensions[0], height:h4OrigDimensions[1]}, overwrite:"none", ease:Back.easeOut, delay:delays[1]});
	
		TweenLite.to(frame4SubHeadline1_img, speeds[1], {css:{left:0}, delay:delays[2]});
		TweenLite.to(frame4SubHeadline2_img, speeds[2], {css:{top:0}, delay:delays[3]});
		TweenLite.to(frame4SubHeadline3_img, speeds[3], {css:{top:0}, delay:delays[4]});
	}

	TweenLite.to(legal_f4_div, speeds[4], {css:{opacity:1}, delay:delays[5]});
}

function playFrame5() {
	TweenLite.delayedCall(myFT.instantAds.F5_duration, playFrame6);
	
	frame5_div.style.opacity = 1;
	frame4_div.style.opacity = 0;
	
	var delays = parseIAText(myFT.instantAds.F5_Delays_logo_headline_subhead1_subhead2_legal);
	var speeds = parseIAText(myFT.instantAds.F5_Speeds_headline_subhead1_subhead2_legal);
	
	checkLogo(3, delays[0]);

	TweenLite.to(frame5Headline_img, speeds[0], {css:{left:0}, delay:delays[1]});
	TweenLite.to(frame5SubHeadline1_img, speeds[1], {css:{left:0}, delay:delays[2]});
	TweenLite.to(frame5SubHeadline2_img, speeds[2], {css:{left:0}, delay:delays[3]});

	TweenLite.to(legal_f5_div, speeds[3], {css:{opacity:1}, delay:delays[4]});
}

function playFrame6() {
	introRichload_div.style.opacity = 1;
	frame6BG_div.style.opacity = 1;
	frame5_div.style.backgroundColor = 'transparent';
	
	frame5Headline_img.style.opacity = 0;
	frame5SubHeadline1_img.style.opacity = 0;
	frame5SubHeadline2_img.style.opacity = 0;
	legal_f5_div.style.opacity = 0;
	
	frame6_div.style.opacity = 1;
	frame6BGImage_img.style.opacity = 1;
	
	var ctaOrigDimensions = [ctaBtn_div.clientWidth, ctaBtn_div.clientHeight];
	
	prepareForPopin(ctaBtn_div, ctaX, ctaY);
	
	var delays = parseIAText(myFT.instantAds.F6_Delays_img_headline_subhead1_subhead2_cta_legal);
	var speeds = parseIAText(myFT.instantAds.F6_Speeds_img_headline_subhead1_subhead2_cta_legal);
	
	TweenLite.to(frame6Image_img, speeds[0], {css:{left:0}, delay:delays[0]});
	
	if(useRL === "true" || useRL === "TRUE") {
		TweenLite.delayedCall(delays[0], myFT.richloads.endFrameAnimation.frame.contentWindow.startAnimation);
	} else {
		TweenLite.to(frame6Headline_img, speeds[1], {css:{left:0}, delay:delays[1]});
		TweenLite.to(frame6SubHeadline1_img, speeds[2], {css:{left:0}, delay:delays[2]});
		TweenLite.to(frame6SubHeadline2_img, speeds[3], {css:{top:0}, delay:delays[3]});
	}
	
	TweenLite.to(ctaBtn_div, 0, {css:{opacity:1}, overwrite:"none", delay:delays[4]});
	TweenLite.to(ctaBtn_div, speeds[4], {css:{left:ctaX + "px", top:ctaY + "px", width:ctaOrigDimensions[0], height:ctaOrigDimensions[1]}, overwrite:"none", ease:Back.easeOut, delay:delays[4]});
	
	TweenLite.to(ctaBtn_div, .1, {css:{left:(ctaX - 6) + "px", top:(ctaY - 1) + "px", width:ctaOrigDimensions[0] * 1.1, height:ctaOrigDimensions[1] * 1.1}, overwrite:"none", delay:parseFloat(delays[4]) + parseFloat(speeds[4]) + .75});
	TweenLite.to(ctaBtn_div, .1, {css:{left:ctaX + "px", top:ctaY + "px", width:ctaOrigDimensions[0], height:ctaOrigDimensions[1]}, overwrite:"none", delay:parseFloat(delays[4]) + parseFloat(speeds[4]) + .85});
	
	TweenLite.to(legal_f6_div, speeds[4], {css:{opacity:1}, delay:delays[5]});
}

function checkLogo(ind, del) {
	var del = del * 1000
	if(showLogo[ind] === "true" || showLogo[ind] === "TRUE") {
		window.setTimeout(showTheLogo, del);
	} else {
		//introRichload_div.style.opacity = 0;
		introRichload_div.style.left = "10000px";
	}
}

function showTheLogo() {
	//introRichload_div.style.opacity = 1;
	introRichload_div.style.left = "0";
}

function prepareForPopin(elem, x, y) {
	var orgWidth = elem.clientWidth;
	var orgHeight = elem.clientHeight;
	var xCoord = parseFloat(x);
	var yCoord = parseFloat(y);
	
	elem.style.width = (orgWidth * .25) + "px";
	elem.style.height = (orgHeight * .25) + "px";
	
	elem.style.left = xCoord + (orgWidth/2) - (elem.clientWidth/2);
	elem.style.top = yCoord + (orgHeight/2) - (elem.clientHeight/2);
}

function parseIAText(str) {	
	var logoPos_arr = str.split('|');
	return logoPos_arr;
}