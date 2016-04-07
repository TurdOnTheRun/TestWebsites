/**********************************
* Icon Animation .JS Fragment File
***********************************/
var iconAnimationName = "Stoplight";
var iconAnimationVersion = 0.1;
var spriteSheetName = "spritesheet_stoplight.png";
var spriteSheet = new Image();

// For rescaling on other unit sizes
var iconUnitScale = 1.; // Scale = 1 for 300x250
var iconRegistrationX = 0; // Null registration point of animation. Adjust as needed on other unit sizes (728x90, 160x600)
var iconRegistrationY = 0; // 0, 0 is based on the 300x250

// From Dynamic API
var iconAnimationStartTime = parseFloat(dynamicContent.Q315_Google_Tangram_Feed__US_Sheet1[0].Start_Time_Icon_Animation); //Start_Time_Icon_Animation
var copyBatch2StartTime = parseFloat(dynamicContent.Q315_Google_Tangram_Feed__US_Sheet1[0].Start_Time_Text_2); //Start_Time_Icon_Animation

var red;
var redParts = [];
var redPartCount = 7;
var redPartStartX = [-15,0,-15,15,-15,0,0];
var redPartStartY = [0,-15,0,-6,-15,-15,-15];
var redPartDockX =  [0,0,0,0,0,0,0];
var redPartDockY =  [0,0,0,0,0,0,0];

var yellow;
var yellowParts = [];
var yellowPartCount  = 7;
var yellowPartStartX =  [0,-15,0,-6,-15,-15,-15];
var yellowPartStartY =  [-15,0,-15,15,-15,0,0];
var yellowPartDockX  =  [0,0,0,0,0,0,0];
var yellowPartDockY  =  [0,0,0,0,0,0,0];

var green;
var greenParts = [];
var greenPartCount = 7;
var greenPartStartX = [-15,0,-15,15,-15,0,0];
var greenPartStartY = [0,-15,0,-6,-15,-15,-15];
var greenPartDockX  = [0,0,0,0,0,0,0];
var greenPartDockY  = [0,0,0,0,0,0,0];


var iconSVG; // reference to main SVG document. Don't forget to add [id="iconSVG"] to SVG document root
var iconSVGCode = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 250" enable-background="new 0 0 300 250" xml:space="preserve" id="iconSVG"><g id="red"><polygon id="red0" fill="#DB615A" points="67.83,156.57 67.83,177.4 81.94,163.33 81.94,142.55"/><polygon id="red1" fill="#CE403B" points="81.95,142.55 81.95,158.5 97.95,142.55"/><polygon id="red2" fill="#D74642" points="81.95,158.48 81.95,191.4 97.95,177.4 97.95,142.55"/><polygon id="red3" fill="#DB615A" points="97.95,142.55 97.95,170.60 112.06,156.57"/><polygon id="red4" fill="#CE403B" points="67.83,177.4 81.95,191.4 81.95,163.33"/><polygon id="red5" fill="#CE403B" points="97.95,170.60 97.95,191.4 112.06,177.4 112.06,156.57"/><polygon id="red6" fill="#DB615A" points="81.95,192 97.95,192 97.95,177.4"/></g><g id="yellow"><polygon id="yellow0" fill="#EB9034" points="128.30762,156.57227 128.30762,177.35547 142.42627,163.33301 142.42627,142.5498"/><polygon id="yellow1" fill="#F0B33C" points="142.43018,142.54883 142.43018,158.49805 158.42969,142.54883"/><polygon id="yellow2" fill="#F4BC48" points="142.42578,158.48438 142.42578,191.37891 158.42578,175.43066 158.42578,142.5498"/><polygon id="yellow3" fill="#F0B33C" points="158.42578,142.54883 158.42578,170.59668 172.54004,156.57324"/><polygon id="yellow4" fill="#F0B33C" points="128.3125,177.35547 142.42627,191.37988 142.42627,163.33105"/><polygon id="yellow5" fill="#EB9034" points="158.42578,170.59668 158.42578,191.37988 172.54492,177.35645 172.54492,156.57324"/><polygon id="yellow6" fill="#F0B33C" points="142.43457,191.375 158.43457,191.375 158.43457,175.42676"/></g><g id="green"><polygon id="green0" fill="#228E53" points="187.88184,156.57227 187.88184,177.35547 202,163.33301 202,142.5498"/><polygon id="green1" fill="#269B5C" points="202.00391,142.54883 202.00391,158.49805 218.00391,142.54883"/><polygon id="green2" fill="#40AA74" points="202,158.48438 202,191.37891 218,175.43066 218,142.5498"/><polygon id="green3" fill="#228E53" points="218,142.54883 218,170.59668 232.11426,156.57324"/><polygon id="green4" fill="#269B5C" points="187.88672,177.35547 202.00098,191.37988 202.00098,163.33105"/><polygon id="green5" fill="#269B5C" points="218,170.59668 218,191.37988 232.11914,177.35645 232.11914,156.57324"/><polygon id="green6" fill="#228E53" points="202.00879,191.375 218.00879,191.375 218.00879,175.42676"/></g></svg>';

function createIconParts()
{
	var i = 0;
	var tempX = 0;
	var tempY = 0;
	var rndRange = 50;
	var iconHolder = $("#iconHolder");

	TweenLite.to(iconHolder, 0, {opacity:0}); // hide icon holder before attaching SVG
	
	iconHolder.innerHTML = "" + iconSVGCode;
	iconSVG = $("#iconSVG");
	TweenLite.to(iconSVG, 0, {x:iconRegistrationX, y:iconRegistrationY, width:"300px", height:"250px"});

	red = $("#red");
	yellow = $("#yellow");
	green  = $("#green");	

	tlIcon.to(red, 0, {opacity:0.3});
	for (i = 0; i < redPartCount; i++)
	{
		redParts[i] = $("#red" + i);
		TweenLite.to(redParts[i], 0, {opacity:0, x:(redPartStartX[i] * iconUnitScale), y:(redPartStartY[i] * iconUnitScale)});
	}

	tlIcon.to(yellow, 0, {opacity:0.3});
	for (i = 0; i < yellowPartCount; i++)
	{
		yellowParts[i] = $("#yellow" + i);
		TweenLite.to(yellowParts[i], 0, {opacity:0, x:(yellowPartStartX[i] * iconUnitScale), y:(yellowPartStartY[i] * iconUnitScale)});
	}

	tlIcon.to(green, 0, {opacity:0.3});
	for (i = 0; i < greenPartCount; i++)
	{
		greenParts[i] = $("#green" + i);
		TweenLite.to(greenParts[i], 0, {opacity:0, x:(greenPartStartX[i] * iconUnitScale), y:(greenPartStartY[i] * iconUnitScale)});
	}

	TweenLite.to(iconHolder, 0, {opacity:1}); // show icon holder again after attaching SVG	
}

function initIconAnimations()
{
	tlIcon.addLabel("dockPartsRed", iconAnimationStartTime);
	tlIcon.addLabel("dockPartsYellow", iconAnimationStartTime + 0.3);
	tlIcon.addLabel("dockPartsGreen", iconAnimationStartTime + 0.6);
	tlIcon.addLabel("redOn", iconAnimationStartTime + 1.6);
	tlIcon.addLabel("yellowOn", iconAnimationStartTime + 3.3);
	tlIcon.addLabel("greenOn", copyBatch2StartTime + 1);

	dockRed();
	dockYellow();
	dockGreen();
	tlIcon.to(red, 0.6, {opacity:1}, "redOn");
	tlIcon.to(red, 0.6, {opacity:0.3}, "yellowOn");
	tlIcon.to(yellow, 0.6, {opacity:1}, "yellowOn");
	tlIcon.to(yellow, 0.6, {opacity:0.3}, "greenOn");
	tlIcon.to(green, 0.6, {opacity:1}, "greenOn");

	// End Animation
}

function dockRed()
{
	var i = 0;
	for (i = 0; i < redPartCount; i ++)
	{
		tlIcon.to(redParts[i], 0.3, {opacity:1}, "dockPartsRed");
		tlIcon.to(redParts[i], 1, {x:(redPartDockX[i] * iconUnitScale), y:(redPartDockY[i] * iconUnitScale), ease:Power4.easeInOut, onCompleteParams:[redParts[i]], onComplete:onTweenComplete}, "dockPartsRed");
	}
}

function dockYellow()
{
	var i = 0;
	for (i = 0; i < yellowPartCount; i ++)
	{
		tlIcon.to(yellowParts[i], 0.3, {opacity:1}, "dockPartsYellow");
		tlIcon.to(yellowParts[i], 1, {x:(yellowPartDockX[i] * iconUnitScale), y:(yellowPartDockY[i] * iconUnitScale), ease:Power4.easeInOut, onCompleteParams:[yellowParts[i]], onComplete:onTweenComplete}, "dockPartsYellow");
	}
}

function dockGreen()
{
	var i = 0;
	for (i = 0; i < greenPartCount; i ++)
	{
		tlIcon.to(greenParts[i], 0.3, {opacity:1}, "dockPartsGreen");
		tlIcon.to(greenParts[i], 1, {x:(greenPartDockX[i] * iconUnitScale), y:(greenPartDockY[i] * iconUnitScale), ease:Power4.easeInOut, onCompleteParams:[greenParts[i]], onComplete:onTweenComplete}, "dockPartsGreen");
	}
}

function onTweenComplete(e)
{
	e.style.transform = "initial";
}

// Create and initialize icon parts + animation
createIconParts();
initIconAnimations();

console.log("Animation: " + iconAnimationName + " ver " + iconAnimationVersion);
console.log("-----");

// play animation once spritesheet is confirmed to have loaded
function onSpriteSheetLoad(e)
{
	// startAnimations is called from main.js
	// it will play the main timeline (tl)
	// + your icon timeline (tlIcon) at the same time
	startAnimations(); // STARTS THE ENTIRE UNIT ANIMATION when SpriteSheet is loaded
}

spriteSheet.addEventListener("load", onSpriteSheetLoad, false);
spriteSheet.src = spriteSheetName;
