//Set these to the banner dimentions
var BANNER_WIDTH=300;
var BANNER_HEIGHT=250;

//This is used to report timing
var stopWatch;
//Set the initial states of all divs here
function setInitialStates(){
	hideAll([".background_3", ".background_2", ".background_4",  ".controller", ".controller2", ".ctaContainer"]);
}

//This gets called when the ad is finished loading
function mainInit(){
	addListeners();
	setInitialStates();

	// show the ad and start animation
	$(".container").show();
	seq01();
}
 
 //Set Frame-5 Position Condition
var txt_2 = {x: 25, y: 46};
var txt_3 = {x: 65, y: 46};
var txt_4 = {x: 193, y: 46};

//The first function in our sequence of animations
function seq01(){
		
	stopWatch = new Date().getTime(); 

	var twnDelay = 0;

    TweenLite.from($(".tv1"), 0.5, {opacity: 0, ease:Power0.easeOut, delay:twnDelay});
	twnDelay+=2;
    TweenLite.to($(".tvglow"), 0.3, {opacity: 1, scaleX: 3, ease:Power0.easeOut, delay:twnDelay});
    twnDelay+=0.3;
    TweenLite.to($(".tvglow"), 0.3, {opacity: 1, scaleX: 1, ease:Power0.easeIn, delay:twnDelay});
    TweenLite.to($(".tv1"), 0.2, {opacity: 0, ease:Power0.easeOut, delay:twnDelay});
    TweenLite.to($(".tvbg"), 0.2, {opacity: 0, ease:Power0.easeOut, delay:twnDelay});


	twnDelay+=2;
	TweenLite.delayedCall(twnDelay, seq02);
}

function seq02(){

    var twnDelay=0;
    $(".background_2").show();
    $(".controller").show();

    TweenLite.from($(".background_2"), 0.5, {opacity: 0, ease:Power0.easeOut, delay:twnDelay});
    TweenLite.to($(".tv2"), 0.2, {scale: 0.731, x:34.162, y:-21, rotationZ: "0.01deg", ease:Power0.easeOut, delay:twnDelay, force3D:true});
    TweenLite.to($(".tvglow"), 0.2, {scale: 0.731, y:-25, rotationZ: "0.01deg", ease:Power0.easeOut, delay:twnDelay, force3D:true});
    TweenLite.to($(".controller"), 0.5, {top: 208, ease:Power0.easeOut, delay:twnDelay});
    twnDelay+=0.2;
    TweenLite.to($(".tv2_2"), 0, {opacity:1, ease:Power0.easeOut, delay:twnDelay});

twnDelay+=0.75;
    TweenLite.delayedCall(twnDelay, seq03);
}

function seq03(){
    $(".controller2").show();
    console.log("asd");


    var twnDelay=0;
    TweenLite.to($(".controller2"), 0.5, {opacity:1, ease:Power0.easeOut, delay:twnDelay});
    TweenLite.to($(".controller_glow1"), 0.5, {opacity: 1, ease:Power0.easeOut, delay:twnDelay});
    TweenLite.to($(".tv3"), 0.2, {opacity:1, ease:Power0.easeOut, delay:twnDelay});

    twnDelay+=2.5;
    TweenLite.delayedCall(twnDelay, seq04);
    }

function seq04(){
    console.log("asd");

    var twnDelay=0;
    TweenLite.to($(".controller_glow2"), 0.5, {opacity: 1, ease:Power0.easeOut, delay:twnDelay});
    TweenLite.to($(".tv4"), 0.2, {opacity:1, ease:Power0.easeOut, delay:twnDelay});
    TweenLite.to($(".txt-1"), 0.2, {opacity:1, ease:Power0.easeOut, delay:twnDelay});


    twnDelay+=2;
    TweenLite.delayedCall(twnDelay, doResolve);
    }


function doResolve(){

	var twnDelay=0;
	//Set Frame-5

	twnDelay+=0.0;
    TweenLite.from($(".background_4"), 0.5, {opacity: 0, ease:Power0.easeOut, delay:twnDelay});

	twnDelay+=0.5;
	TweenLite.to($(".txt-2"), 0.5, {opacity: 1, ease:Power0.easeOut, delay:twnDelay});

	twnDelay+=0.5;
	TweenLite.to($(".txt-3"), 0.5, {opacity: 1, ease:Power0.easeOut, delay:twnDelay});

	twnDelay+=0.5;
	TweenLite.to($(".txt-4"), 0.5, {opacity: 1, ease:Power0.easeOut, delay:twnDelay});

	twnDelay+=0.5;
    TweenLite.from($(".background_3"), 0.5, {opacity: 0, ease:Power0.easeOut, delay:twnDelay});

	twnDelay+=0.5;
	TweenLite.to($(".logo-txt"), 0.5, {width: 159, ease:Power0.easeOut, delay:twnDelay});

	twnDelay+=0.5;
	TweenLite.from($(".ctaContainer"), 0.5, {alpha: 0, ease:Power0.easeOut, delay:twnDelay});
	$(".ctaContainer").show();


	$(".background_3").show();
	$(".background_4").show();
	$(".txt-8").show();
	$(".txt-9").show();
	$(".txt-10").show();
	$(".txt-11").show();
	$(".logo-txt").show();
	twnDelay+=0;
	TweenLite.delayedCall(twnDelay, returnTimer);
}


//A simple helper function to do display:none to multiple items
function hideAll(whichOnes){
	for (q=0;q<whichOnes.length;q++){
		$(whichOnes[q]).hide();
	}
}

//Replay the ad
function replay(){
	TweenLite.killTweensOf($(".container").find('*'));
	resetAll();
	setInitialStates();
	seq01();
}

//This resets everything in the container div to its original state as mandated by the css file
function resetAll(){
	TweenLite.set($(".container").find('*'), {clearProps:"all"});
}

// ======== CLICK TAG ======== 
function bgExitHandler() {
    window.open("");
}

//This is where we add any rollovers or clicks
function addListeners(){

	$(".ctaContainer").on("mouseover",
		function(){
			TweenLite.to($(".ctaBg2"), 0.3, {opacity:1, ease:Quad.easeInOut, force3D:false});
		}
	);
	$(".ctaContainer").on("mouseout",
		function(){
			TweenLite.to($(".ctaBg2"), 0.3, {opacity:0, ease:Quad.easeInOut });
		}
	);

}
//This will echo how many seconds have passed
function returnTimer(){
	stopWatch = ((new Date().getTime())-stopWatch) * 0.001;
	 console.log(stopWatch+" seconds");
}