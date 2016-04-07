/********************
* HELPERS FUNCTIONS
********************/
//JQuery alias
var $ = function(slt) {
    return document.querySelector(slt);
}

//--------------
// GLOBAL VARS
//--------------

var tl = new TimelineLite();
tl.pause();

var tweenLength = 0.4;
var outroLength = 0.25;
var assetsLoaded = 0;
var assetsTotal = 4;

var iconWidthNatural = [];
var iconHeightNatural = [];

var fontSizes0 = [];
var fontSizes1 = [];
var fontSizes2 = [];
var fontSizes3 = [];
var fontSizes4 = [];
var fontSizes5 = [];

var frame0Copy = [];
var frame1Copy = [];
var frame2Copy = [];
var frame3Copy = [];
var frame4Copy = [];
var frame5Copy = [];

//-----------------
// STUDIO ENABLER
//-----------------
// Enabler is initialized, set up polite load for remainder of ad.
if (!Enabler.isInitialized())
{
    Enabler.addEventListener(
        studio.events.StudioEvent.INIT,
        enablerInitialized);
} else {
    enablerInitialized();
}

// Enabler is initialized, set up polite load for remainder of ad.
function enablerInitialized() 
{
    // Wait for page loaded
    if (!Enabler.isPageLoaded()) 
    {
        Enabler.addEventListener(
            studio.events.StudioEvent.PAGE_LOADED,
                    pageLoaded);
    } else {
        pageLoaded();
    }
}

//-----------------
// MISC FUNCTIONS
//-----------------

function initFeed()
{
	var i = 0;

	frame0Copy = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame1_Text.split("^");
	frame1Copy = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame2_Text.split("^");
	frame2Copy = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame3_Text.split("^");
	frame3Copy = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame4_Text.split("^");
	frame4Copy = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame5_Text.split("^");
	frame5Copy = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame6_Text.split("^");

	fontSizes0 = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame1_Fontsizes.split("^");
	fontSizes1 = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame2_Fontsizes.split("^");
	fontSizes2 = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame3_Fontsizes.split("^");
	fontSizes3 = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame4_Fontsizes.split("^");
	fontSizes4 = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame5_Fontsizes.split("^");
	fontSizes5 = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame6_Fontsizes.split("^");


	// $("#f0_img").innerHTML = "<img src='" + dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame1_Background_Image.Url + "' />";

	$("#imgLogo").setAttribute("src", dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Logo_URL.Url);
	$("#imgLogo").addEventListener("load", onAssetLoad);

	$("#imgIcon0").setAttribute("src", dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame3_Image.Url);
	$("#imgIcon0").addEventListener("load", onAssetLoad);

	$("#imgIcon1").setAttribute("src", dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame4_Image.Url);
	$("#imgIcon1").addEventListener("load", onAssetLoad);

	$("#imgIcon2").setAttribute("src", dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame5_Image.Url);
	$("#imgIcon2").addEventListener("load", onAssetLoad);

	TweenLite.to([$("#f2_l0"), $("#f2_l2"), $("#f3_l0"), $("#f3_l2"), $("#f4_l0"), $("#f4_l2"), $("#f5_l0"), $("#f5_l1"), $("#f5_l2"), $("#f5_dollar"), $("#f5_numA"), $("#f5_numB"), $("#f5_numNote")], 0, {color: dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].General_Hex_Control});
	$("#mainHolder").style.backgroundColor = dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Hex_Band;

	$("#f0_l0").innerHTML = frame0Copy[0];
	$("#f0_l1").innerHTML = frame0Copy[1];
	$("#f0_l2").innerHTML = frame0Copy[2];
	$("#f0_l3").innerHTML = frame0Copy[3];

	for (i = 0; i < 4; i ++)
	{
		if (fontSizes0[i])
		{
			$("#f0_l" + i).style.fontSize = fontSizes0[i] + "pt";
		}
	}

	$("#f1_l0").innerHTML = frame1Copy[0];
	$("#f1_l1").innerHTML = frame1Copy[1];
	$("#f1_l2").innerHTML = frame1Copy[2];
	$("#f1_l3").innerHTML = frame1Copy[3];
	$("#f1_l4").innerHTML = frame1Copy[4];
	$("#f1_l5").innerHTML = frame1Copy[5];
	$("#f1_l6").innerHTML = frame1Copy[6];

	for (i = 0; i < 6; i ++)
	{
		if (fontSizes1[i])
		{
			$("#f1_l" + i).style.fontSize = fontSizes1[i] + "pt";
		}
	}

	$("#f2_l0").innerHTML = frame2Copy[0];
	$("#f2_l1").innerHTML = frame2Copy[1];
	$("#f2_l2").innerHTML = frame2Copy[2];
	$("#f2_l3").innerHTML = frame2Copy[3];

	for (i = 0; i < 4; i ++)
	{
		if (fontSizes2[i])
		{
			$("#f2_l" + i).style.fontSize = fontSizes2[i] + "pt";
		}
	}

	$("#f3_l0").innerHTML = frame3Copy[0];
	$("#f3_l1").innerHTML = frame3Copy[1];
	$("#f3_l2").innerHTML = frame3Copy[2];
	$("#f3_l3").innerHTML = frame3Copy[3];

	for (i = 0; i < 4; i ++)
	{
		if (fontSizes3[i])
		{
			$("#f3_l" + i).style.fontSize = fontSizes3[i] + "pt";
		}
	}

	$("#f4_l0").innerHTML = frame4Copy[0];
	$("#f4_l1").innerHTML = frame4Copy[1];
	$("#f4_l2").innerHTML = frame4Copy[2];
	$("#f4_l3").innerHTML = frame4Copy[3];
	$("#f4_l4").innerHTML = frame4Copy[4];

	for (i = 0; i < 4; i ++)
	{
		if (fontSizes4[i])
		{
			$("#f4_l" + i).style.fontSize = fontSizes4[i] + "pt";
		}
	}

	$("#f5_l0").innerHTML = frame5Copy[0];
	$("#f5_l1").innerHTML = frame5Copy[1];
	$("#f5_l2").innerHTML = frame5Copy[2];
	$("#f5_numA").innerHTML = frame5Copy[3];
	$("#f5_numB").innerHTML = frame5Copy[4];
	$("#f5_numNote").innerHTML = frame5Copy[5];
	$("#f5_l3").innerHTML = frame5Copy[6];
	$("#f5_l4").innerHTML = frame5Copy[7];
	$("#f5_l5").innerHTML = frame5Copy[8];
	$("#f5_l6").innerHTML = frame5Copy[9];
	$("#f5_urgency").innerHTML = frame5Copy[10];
	$("#f5_CTA").innerHTML = frame5Copy[11];

	// For frame 6, only put 7 fonts, which map to f5_l0-f5_l6
	for (i = 0; i < 12; i ++)
	{
		if (fontSizes5[i])
		{
			$("#f5_l" + i).style.fontSize = fontSizes5[i] + "pt";
		}
	}

}

function initAnimations()
{
	console.log("Initializing animations.");

	tl.addLabel("frame0Intro", 0);
	tl.addLabel("frame0Outro", 2.25);
	tl.addLabel("frame1Intro", 2.5);
	tl.addLabel("frame1Outro", 5.65);
	tl.addLabel("frame2Intro", 5.9);
	tl.addLabel("frame2Outro", 8.25);
	tl.addLabel("frame3Intro", 8.5);
	tl.addLabel("frame3Outro", 10.75);
	tl.addLabel("frame4Intro", 11);
	tl.addLabel("frame4Outro", 14.5);
	tl.addLabel("frame5Intro", 14.5);

	tl.to([$("#icon0"), $("#icon1"), $("#icon2")], 0, {opacity: 1, height: 60});
	tl.to($("#imgBtnCTA"), 0, {height: 18});
	tl.to($("#f5_urgency"), tweenLength, {top: 20, ease: Power1.easeOut}, "frame0Intro");
	tl.to($("#f5_CTA"), tweenLength, {top: 20, ease: Power1.easeOut}, "frame0Intro");
	tl.to($("#btnCTA"), tweenLength, {top: 18, ease: Power1.easeOut}, "frame0Intro");
	tl.to($("#f0_batch0"), tweenLength, {left: 12, ease: Power1.easeOut}, "frame0Intro");
	tl.to([$("#f0_img"), $("#f0_batch0")], outroLength, {opacity: 0, ease: Power1.easeOut}, "frame0Outro");
	tl.to($("#icon0"), tweenLength, {top: 21, ease: Power1.easeOut}, "frame1Intro");
	tl.to($("#icon1"), tweenLength, {top: 21, ease: Power1.easeOut}, "frame1Intro");
	tl.to($("#icon2"), tweenLength, {top: 21, ease: Power1.easeOut}, "frame1Intro");
	tl.to([$("#f1_l0"), $("#f1_l1"), $("#f1_l2")], tweenLength, {left: 16.5, ease: Power1.easeOut}, "frame1Intro");
	tl.to($("#f1_l3"), tweenLength, {top: 10, ease: Power1.easeOut}, "frame1Intro");
	tl.to($("#f1_l4"), tweenLength, {top: 27, ease: Power1.easeOut}, "frame1Intro");
	tl.to($("#f1_l5"), tweenLength, {top: 43, ease: Power1.easeOut}, "frame1Intro");
	tl.to($("#f1_l6"), tweenLength, {top: 62, ease: Power1.easeOut}, "frame1Intro");
	tl.to([$("#f1_l0"), $("#f1_l1"), $("#f1_l2"), $("#f1_l3"), $("#f1_l4"), $("#f1_l5"), $("#f1_l6"), $("#icon1"), $("#icon2")], outroLength, {opacity: 0, ease: Power1.easeOut}, "frame1Outro");
	tl.to($("#icon0"), tweenLength, {left: 53, top: 10, ease: Power1.easeOut}, "frame2Intro");
	tl.to($("#imgIcon0"), tweenLength, {height: 69, ease: Power1.easeOut}, "frame2Intro");
	tl.to($("#f2_l0"), tweenLength, {top: 6, ease: Power1.easeOut}, "frame2Intro");
	tl.to($("#f2_l1"), tweenLength, {top: 27, ease: Power1.easeOut}, "frame2Intro");
	tl.to($("#f2_l2"), tweenLength, {top: 44, ease: Power1.easeOut}, "frame2Intro");
	tl.to($("#f2_l3"), tweenLength, {top: 61, ease: Power1.easeOut}, "frame2Intro");
	tl.to([$("#icon1"), $("#icon2")], 0, {left: -200, top: 10, opacity: 1, ease: Power1.easeOut}, "frame2Intro");
	tl.to([$("#imgIcon1"), $("#imgIcon2")], 0, {height: 69, ease: Power1.easeOut}, "frame2Intro");
	tl.to([$("#icon0"), $("#f2_l0"), $("#f2_l1"), $("#f2_l2"), $("#f2_l3")], outroLength, {opacity: 0, ease: Power1.easeOut}, "frame2Outro");
	tl.to($("#icon1"), tweenLength, {left: 53, ease: Power1.easeOut}, "frame3Intro");
	tl.to($("#f3_l0"), tweenLength, {top: 6, ease: Power1.easeOut}, "frame3Intro");
	tl.to($("#f3_l1"), tweenLength, {top: 27, ease: Power1.easeOut}, "frame3Intro");
	tl.to($("#f3_l2"), tweenLength, {top: 44, ease: Power1.easeOut}, "frame3Intro");
	tl.to($("#f3_l3"), tweenLength, {top: 61, ease: Power1.easeOut}, "frame3Intro");
	tl.to([$("#icon1"), $("#f3_l0"), $("#f3_l1"), $("#f3_l2"), $("#f3_l3")], outroLength, {opacity: 0, ease: Power1.easeOut}, "frame3Outro");
	tl.to($("#icon2"), tweenLength, {left: 53, ease: Power1.easeOut}, "frame4Intro");
	tl.to($("#f4_l0"), tweenLength, {top: 6, ease: Power1.easeOut}, "frame4Intro");
	tl.to($("#f4_l1"), tweenLength, {top: 27, ease: Power1.easeOut}, "frame4Intro");
	tl.to($("#f4_l2"), tweenLength, {top: 44, ease: Power1.easeOut}, "frame4Intro");
	tl.to($("#f4_l3"), tweenLength, {top: 61, ease: Power1.easeOut}, "frame4Intro");
	tl.to([$("#f4_l0"), $("#f4_l1"), $("#f4_l2"), $("#f4_l3"), $("#f4_l4")], outroLength, {opacity: 0, ease: Power1.easeOut}, "frame4Outro");
	tl.to([$("#imgIcon0"), $("#imgIcon1")], 0, {height: 49, opacity: 1, ease: Power1.easeOut}, "frame4Outro");
	tl.to($("#icon0"), 0, {left: 131, top: 110, opacity: 1, ease: Power1.easeOut}, "frame4Outro");
	tl.to($("#icon1"), 0, {left: 186, top: -70, opacity: 1, ease: Power1.easeOut}, "frame4Outro");
	tl.to($("#replay"), 0, {left: 707, opacity: 0, ease: Power1.easeOut}, "frame4Outro");
	tl.to($("#icon0"), tweenLength, {top: 20, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#icon1"), tweenLength, {top: 20, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#icon2"), tweenLength, {left: 242, top: 20, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#imgIcon2"), tweenLength, {height: 49, ease: Power1.easeOut}, "frame5Intro");
	tl.to([$("#f5_l0"), $("#f5_l1"), $("#f5_l2")], tweenLength, {left: 19, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_l3"), tweenLength, {top: 19, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_l4"), tweenLength, {top: 34, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_l5"), tweenLength, {top: 47, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_l6"), tweenLength, {top: 60, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_dollar"), tweenLength, {top: 11, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_numA"), tweenLength, {top: 12, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_numB"), tweenLength, {top: 14, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#f5_numNote"), tweenLength, {top: 43, ease: Power1.easeOut}, "frame5Intro");
	tl.to($("#replay"), tweenLength, {opacity: 1, ease: Power1.easeOut}, "frame5Intro");
}

function startAnimations()
{
	console.log("Starting animations.");
	tl.play();
}

function onBackgroundClick(e)
{
	Enabler.exitOverride('Background Exit', dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Exit_URL.Url);
}

function onCTAClick(e)
{
	Enabler.exitOverride('CTA Exit', dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Exit_URL.Url);
}

function onCTAOver(e)
{
	TweenLite.to($("#imgBtnCTAFill"), 0.2, {fill: "#dd44dd"});
}

function onCTAOut(e)
{
	TweenLite.to($("#imgBtnCTAFill"), 0.2, {fill: "#AF3AAC"});
}

function onReplayClick(e)
{
	Enabler.counter("Replay");
	tl.play(0);
}

function initListeners()
{
	$("#bgClickArea").addEventListener("click", onBackgroundClick);
	$("#ctaClickArea").addEventListener("click", onCTAClick);
	$("#ctaClickArea").addEventListener("mouseover", onCTAOver);
	$("#ctaClickArea").addEventListener("mouseout", onCTAOut);
	$("#replay").addEventListener("click", onReplayClick);
}

function onAssetLoad(e)
{
	assetsLoaded ++;
	console.log("Asset " + assetsLoaded + " loaded.");
	if (assetsLoaded >= assetsTotal)
	{
		$("#imgIcon0").setAttribute("height", 49);

		$("#imgIcon1").setAttribute("height", 49);

		$("#imgIcon2").setAttribute("height", 49);

		$("#imgReplay").setAttribute("height", 14);

		$("#imgLogo").setAttribute("width", 120);
		TweenLite.to($("#logo"), 0, {left: 577, top: 44});

		initListeners();
		initAnimations();
		startAnimations();
	}
}

//-------
// MAIN
//-------
function pageLoaded() 
{
	console.log("Page loaded.");
	initFeed();

	console.log("DYNAMIC: " + dynamicContent.CablevisionResidentialDCOAUG2015_Sheet1[0].Frame6_Image.Url);
}
