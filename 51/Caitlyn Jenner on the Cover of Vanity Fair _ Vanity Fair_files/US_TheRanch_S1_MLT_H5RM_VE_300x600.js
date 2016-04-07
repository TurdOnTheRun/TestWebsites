// ================= //
// === Variables === //
// ================= //

// Resolve Elements
var trailerViewed = false;
var introViewed = false;
// YouTube
var ytp;
var introVideo; // Set in Dynamic feed
var trailerVideo; // Set in Dynamic feed
var videoList = [introVideo, trailerVideo];
var video = videoList[0];
var autoplay = 1;
// NETFLIX DYNAMIC SPECIFIC :: Set Max Characters for Episodes copy and CTA's
// NB. value will change depending upon design and format.
var maxChars_episodes = 16;
var maxChars_cta = 19;

// ======================== //
// === DoubleClick Init === //
// ======================== //

dcrmInit = function(){
	
	console.log("|| Init Banner");
	
	// Main elements
	var intro 						= document.getElementById('intro');
	var trailer 					= document.getElementById('trailer');
	var resolve 					= document.getElementById('resolve');
	
	// Intro Elements
	var btn_intro_exit				= document.getElementById('btn_intro_exit');
	var btn_intro_skip				= document.getElementById('btn_intro_skip');
	// Trailer Elements
	var btn_trailer_exit			= document.getElementById('btn_trailer_exit');
	var trailer_TT					= document.getElementById('trailer_TT');
	var trailer_episodes			= document.getElementById('trailer_episodes');
    var trailer_netflix				= document.getElementById('trailer_netflix');
    var trailer_tagline				= document.getElementById('trailer_tagline');
	var trailer_streaming			= document.getElementById('trailer_streaming');
	var btn_trailer_watchNow		= document.getElementById('btn_trailer_watchNow');
    var trailer_chars				= document.getElementById('trailer_chars');
	var trailer_chars_ovr			= document.getElementById('trailer_chars_ovr');
	// Resolve Elements
	var btn_resolve_blocker			= document.getElementById('btn_resolve_blocker');
	var btn_resolve_exit			= document.getElementById('btn_resolve_exit');
	var btn_resolve_replay			= document.getElementById('btn_resolve_replay');
	var resolve_netflix				= document.getElementById('resolve_netflix');
    var resolve_cast				= document.getElementById('resolve_cast');
	var resolve_TT					= document.getElementById('resolve_TT');
	var resolve_TT_shadow			= document.getElementById('resolve_TT_shadow');
	var resolve_tagline				= document.getElementById('resolve_tagline');
	var resolve_episodes			= document.getElementById('resolve_episodes');
	var resolve_streaming			= document.getElementById('resolve_streaming');
	var resolve_ratings				= document.getElementById('resolve_ratings');
	var resolve_disclaimer			= document.getElementById('resolve_disclaimer');
	var resolve_chars				= document.getElementById('resolve_chars');
	var resolve_chars_ovr			= document.getElementById('resolve_chars_ovr');
	var resolve_fence				= document.getElementById('resolve_fence');
	var btn_resolve_watchTrailer	= document.getElementById('btn_resolve_watchTrailer');
	var btn_resolve_watchNow		= document.getElementById('btn_resolve_watchNow');
	
	// THE RANCH SPECIFIC :: Set 3D for Sign
	TweenMax.set(resolve_TT, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d", transformOrigin:"50% 0%"}});
	TweenMax.set(resolve_TT_shadow, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d", transformOrigin:"50% 0%"}});

	// Init YouTube Player, then Set Dynamic Variables
	Enabler.loadScript(Enabler.getUrl('https://www.gstatic.com/doubleclick/studio/innovation/h5/ytplayer/ytp_v2.js'), setDynamic);
	// Added Listeners
	addListeners();
	
}

// ===================== //
// === Add Listeners === //
// ===================== //

addListeners = function (){
	
	console.log("|| Add Listeners");
		
	// Intro Listeners
	btn_intro_exit.addEventListener('click', onExitHandler, false);
	btn_intro_skip.addEventListener('click', startTrailer, false);
	btn_intro_skip.addEventListener('mouseover', skipOver, false);
	btn_intro_skip.addEventListener('mouseout', skipOut, false);
	
	// Trailer Listeners
	btn_trailer_exit.addEventListener('click', onExitHandler, false);
    btn_trailer_exit.addEventListener('mouseover', trailerCharsOver, false);
	btn_trailer_exit.addEventListener('mouseout', trailerCharsOut, false);
    
	btn_trailer_watchNow.addEventListener('click', onExitHandler, false);
	btn_trailer_watchNow.addEventListener('mouseover', trailer_ctaOver, false);
	btn_trailer_watchNow.addEventListener('mouseout', trailer_ctaOut, false);
	
	// Resolve Listeners
	btn_resolve_blocker.addEventListener('click', onExitHandler, false);
	btn_resolve_exit.addEventListener('click', onExitHandler, false);
	btn_resolve_watchNow.addEventListener('click', onExitHandler, false);
	
	btn_resolve_exit.addEventListener('mouseover', charsOver, false);
	btn_resolve_exit.addEventListener('mouseout', charsOut, false);
	
	btn_resolve_replay.addEventListener('click', startTrailer, false);
	btn_resolve_replay.addEventListener('mouseover', replayOver, false);
	btn_resolve_replay.addEventListener('mouseout', replayOut, false);
	
	btn_resolve_watchTrailer.addEventListener('click', startTrailer, false);
	btn_resolve_watchTrailer.addEventListener('mouseover', ctaOver, false);
	btn_resolve_watchTrailer.addEventListener('mouseout', ctaOut, false);
	
	btn_resolve_watchNow.addEventListener('mouseover', ctaOver, false);
	btn_resolve_watchNow.addEventListener('mouseout', ctaOut, false);
	
}

// ======================= //
// == Dynamic Variables == //
// ======================= //

setDynamic = function (){
	
	console.log("|| Set Dynamic Paths");
	
	// Border Colour
	changeBorderColor(dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].border_color);
	
	// Trailer
	trailer_TT.style.backgroundImage		= "url('" + dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x600.Url + "')";
	resolve_TT_shadow.style.backgroundImage	= "url('" + dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x600.Url + "')";
    trailer_tagline.innerHTML 				= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].original_series_text;
	trailer_episodes.innerHTML 				= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].tune_in_one_text;
	trailer_streaming.innerHTML 				= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].tune_in_two_text;
	btn_trailer_watchNow.innerHTML 			= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].watch_now_cta;
		
	// Resolve
	resolve_TT.style.backgroundImage		= "url('" + dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x600.Url + "')";
	resolve_tagline.innerHTML 				= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].original_series_text;
	resolve_episodes.innerHTML 				= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].tune_in_one_text;
	resolve_streaming.innerHTML 				= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].tune_in_two_text;
	resolve_ratings.src		 				= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_300x600.Url;
	resolve_disclaimer.innerHTML			= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].description_text;	
	btn_resolve_watchTrailer.innerHTML 		= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].watch_trailer_cta;
	btn_resolve_watchNow.innerHTML 			= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].watch_now_cta;
	
	// NETFLIX SPECIFIC :: Resize fonts based on character counts
	resizeFonts();
	
	// NETFLIX SPECIFIC :: Add custom '>'
	addArrow(btn_trailer_watchNow, btn_trailer_watchNow.innerHTML);
	addArrow(btn_resolve_watchNow, btn_resolve_watchNow.innerHTML);
	addArrow(btn_resolve_watchTrailer, btn_resolve_watchTrailer.innerHTML);
	
	// YT Videos
	introVideo 							= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].progressive_300x600;
	trailerVideo 						= dynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].trailer;
	
	// Set the YT Videos
	videoList = [introVideo, trailerVideo];
	video = videoList[0];
	setPlayer();
	YTFunction();
 
	// Start playback, skip intro on mobile devices
	if (Enabler.isMobile || Enabler.isIE11) { startResolve(); } else { startIntro(); }
	
}

// NETFLIX :: Dynamic Border colour
function changeBorderColor(value) {
  var borders =     document.getElementsByClassName('exitBtn');
  for(i=0; i<borders.length; i++) {
    borders[i].style.borderColor =    value;
  }
}

// NETFLIX :: Add Chevron to CTA buttons
function addArrow(obj, str) {
	// Check if '>' is present
	var lastChar = str.substr(str.length - 1);
	// for '>' or '&gt;'
	if (lastChar == ";") {
		// cut '>' from string
		str = str.slice(0, -4);
		obj.innerHTML = str;
		// Replace with graphic
		var elem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		elem.setAttribute("fill", "#fff");
		elem.setAttribute("viewBox", "0 0 62 100");
		elem.setAttribute("width", "7px");
		elem.setAttribute("height", "11px");
		elem.style.position = "relative";
		elem.style.top = "0px";
		elem.style.left = "3px";
		
		var newpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
		newpath.setAttributeNS(null, "d", "M25.221,99.929L61.81,50.876V49.124L25.221,0.07l-25.264,12.7L28.27,50.219-0.043,87.665Z"); 
		 
		elem.appendChild(newpath);
		obj.appendChild(elem);
		
	}	
}

// NETFLIX :: Resize fonts
function resizeFonts() {
		
	// Get character counts for "NOW STREAMING ALL EPISODES"
	chars_episodes = [trailer_episodes, trailer_streaming, resolve_episodes, resolve_streaming];
	// Get character counts for CTA's
	chars_ctas = [btn_trailer_watchNow, btn_resolve_watchTrailer, btn_resolve_watchNow];
	
	// Loop through "NOW STREAMING ALL EPISODES"
	for (i=0; i<chars_episodes.length; i++) {
		// If anything is above character limit resize all
		if (chars_episodes[i].innerHTML.length > maxChars_episodes) {
			// If success, kill the loop
			i = chars_episodes.length;
			// Resize all 
			for (k=0; k<chars_episodes.length; k++) 	{	chars_episodes[k].style.fontSize = "10px"; 	}
			for (n=0; n<chars_ctas.length; n++) 		{	chars_ctas[n].style.fontSize = "9px";		}
		}
	}
	// Loop through CTA's
	for (i=0; i<chars_ctas.length; i++) {
		// If anything is above character limit resize all
		if (chars_ctas[i].innerHTML.length > maxChars_cta) {
			// If success, kill the loop
			i = chars_ctas.length;
			// Resize all 
			for (k=0; k<chars_episodes.length; k++) 	{	chars_episodes[k].style.fontSize = "10px"; 	}
			for (n=0; n<chars_ctas.length; n++) 		{	chars_ctas[n].style.fontSize = "9px";		}
		}
	}	
}


// ================== //
// ===== Videos ===== //
// ================== //

setPlayer = function() {
	
	console.log("|| Setup YoutTube Players");
	
	introPlayer = {
		'containerId': 'intro_video_player',
		'videoId': video,
		'videoWidth': 300,
		'videoHeight': 250,
		'suggestedQuality': 'high',
		 'playerVars': {'autoplay': autoplay, 'controls': 0, 'rel': 0, 'showinfo': 0  }
	}
	trailerPlayer = {
		'containerId': 'trailer_video_player',
		'videoId': video,
		'videoWidth': 250,
		'videoHeight': 141,
		'suggestedQuality': 'high',
		 'playerVars': {'autoplay': autoplay, 'controls': 2, 'rel': 0, 'showinfo': 0  }
	}
}

function YTFunction(){
	
	console.log("|| Create YoutTube Players");
	
 	// Construct the YouTube player variable.
	ytp = new studioinnovation.YTPlayer(introPlayer);
  	// Bind event listeners.
 	bindListeners();

}

function bindListeners(){
	// YouTube playback quartiles
	ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_0_PERCENT, 		function() { Enabler.counter('YTVideo Percent 0');  	}, false);
	ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_25_PERCENT, 		function() { Enabler.counter('YTVideo Percent 25'); 	}, false);
	ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_50_PERCENT, 		function() { Enabler.counter('YTVideo Percent 50'); 	}, false);
	ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_75_PERCENT, 		function() { Enabler.counter('YTVideo Percent 75'); 	YTPlayerFlash(); 	}, false);
	ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_100_PERCENT, 	function() { Enabler.counter('YTVideo Percent 100');	startResolve();		}, false); 
}

// BUG FIX :: Prevent the last frame of video from flashing up
function YTPlayerFlash(){	if (!trailerViewed){	 TweenMax.to(intro, 0, {opacity: 1, delay: 2, onComplete:introComplete});	 }}
function introComplete(){
	if (!introViewed) {
		introViewed = true;
		Enabler.counter('YTVideo Percent 100');
		startResolve();		
	}
}

// ===================== //
// === Intro Section === //
// ===================== //

startIntro = function (){
	
	console.log("|| Start Progressive Intro");
	
	btn_intro_skip.display = "block";
	btn_intro_skip.style.opacity = 1;
	
	intro.style.opacity = 0;
	intro.style.display = "block";
	TweenMax.to(intro, 0.5, {opacity: 1, ease:Power1.easeInOut});
	
}

// ======================= //
// === Trailer Section === //
// ======================= //

startTrailer = function (){
	
	console.log("|| Start Trailer");
	
	// Trailer has been selected
	trailerViewed = true;
	introViewed = true;
		
	// Show the Trailer Section
	intro.style.display = "none";
	resolve.style.display = "none";
	trailer.style.opacity = 0;
	trailer.style.display = "block";
	TweenMax.to(trailer, 1, {opacity: 1, ease:Power1.easeInOut});

	
	// Reset the YT Player
	video = videoList[1];
	ytp.destroy();
	autoplay = 1;
	setPlayer();
	ytp = new studioinnovation.YTPlayer(trailerPlayer);
	bindListeners();
		
	// Animate Lockup	
	trailer_episodes.style.opacity = 0;
	trailer_streaming.style.opacity = 0;
	trailer_episodes.style.top = 0;
	trailer_streaming.style.top = 0;
	btn_trailer_watchNow.style.opacity = 0;
	
	TweenMax.to(trailer_TT, 0, {top: "40px", rotation: 8});
	TweenMax.to(trailer_TT, .4, {top: "59px", rotation: 0, ease:Bounce.easeOut, delay:0.5});
	TweenMax.to(trailer_episodes, 0.5, {opacity: 1, top: "15px", ease:Power1.easeInOut, delay:1});
	TweenMax.to(trailer_streaming, 0.5, {opacity: 1, top: "15px", ease:Power1.easeInOut, delay:1});
	TweenMax.to(btn_trailer_watchNow, 0.5, {opacity: 1, ease:Power1.easeInOut, delay:1});

}

// ======================= //
// === Resolve Section === //
// ======================= //

startResolve = function (){
	
	console.log("|| Start Resolve");
	
	// Kill The Youtube Player
	ytp.destroy();
		
	// Show/Hide the PRE/POST CTA's
	if (!trailerViewed) {
		btn_resolve_replay.style.display = "none";
		btn_resolve_watchNow.style.display = "none";
	} else {
		btn_resolve_replay.style.display = "block";
		btn_resolve_watchNow.style.display = "inline-block";
		btn_resolve_watchTrailer.style.display = "none";
	}
	
	// Show the Resolve Section
	intro.style.display = "none";
	trailer.style.display = "none";
	
	resolve.style.display = "block";
	TweenMax.to(resolve, 0, {opacity: 0, scale: 2});
	TweenMax.to(resolve, 0.5, {opacity: 1, ease:Power1.easeInOut});
	TweenMax.to(resolve, 1.4, {scale: 1, ease:Power2.easeOut});
	
	// Animation Setup
	btn_resolve_blocker.style.display = "block";
	TweenMax.to(resolve_TT, 0, {scale: 1, rotationX:50, top: "50px"});
	TweenMax.to(resolve_TT_shadow, 0, {opacity:1, scale: 1, rotationX:50, top: "52px"});
	TweenMax.to(resolve_chars, 0, {opacity: 0});
	TweenMax.to(resolve_chars_ovr, 0, {opacity: 1, scale: 1.1, bottom: "-30px"});
	TweenMax.to(resolve_netflix, 0, {opacity: 0});
	TweenMax.to(resolve_tagline, 0, {opacity: 0});
	TweenMax.to(resolve_episodes, 0, {opacity: 0});
	TweenMax.to(resolve_streaming, 0, {opacity: 0});
	TweenMax.to(btn_resolve_watchNow, 0, {opacity: 0});
	TweenMax.to(btn_resolve_watchTrailer, 0, {opacity: 0});
	TweenMax.to(btn_resolve_replay, 0, {opacity: 0});
		
	// Animate Resolve		
    resolveAnimation = new TimelineMax();
	
	// TT & Shadow
    resolveAnimation.to(resolve_TT, 				1, 		{scale:1, 	top: "74px", 	rotationX:-30, 		ease:Power1.easeIn, 		delay: 	0		});
	resolveAnimation.to(resolve_TT, 				0.9, 	{scale:1, 	top: "68px", 	rotationX:40, 		ease:Power1.easeInOut, 		delay: 	0		});
	resolveAnimation.to(resolve_TT, 				0.8, 	{							rotationX:-15, 		ease:Power1.easeInOut, 		delay: 	0		});
	resolveAnimation.to(resolve_TT, 				0.7, 	{							rotationX:10, 		ease:Power1.easeInOut, 		delay: 	0		});
	resolveAnimation.to(resolve_TT, 				0.7, 	{							rotationX:0, 		ease:Power1.easeOut, 		delay: 	0		});
	resolveAnimation.to(resolve_TT_shadow, 			1, 		{scale:1, 	top: "71px", 	rotationX:-30, 		ease:Power1.easeIn, 		delay: 	-4.1		});
	resolveAnimation.to(resolve_TT_shadow, 			0.9, 	{scale:1, 	top: "64px", 	rotationX:40, 		ease:Power1.easeInOut, 		delay: 	-3.1		});
	resolveAnimation.to(resolve_TT_shadow, 			0.8, 	{			top: "66px",	rotationX:-15, 		ease:Power1.easeInOut, 		delay: 	-2.2		});
	resolveAnimation.to(resolve_TT_shadow, 			0.7, 	{			top: "65px",	rotationX:10, 		ease:Power1.easeInOut, 		delay: 	-1.4		});
	resolveAnimation.to(resolve_TT_shadow, 			0.7, 	{opacity:0,	top: "68px",	rotationX:0, 		ease:Power1.easeOut, 		delay: 	-0.7		});
	// Characters
	resolveAnimation.to(resolve_chars_ovr, 			1.6, 	{scale:1	,   bottom: "-10px",				ease:Power1.easeInOut, 		delay: 	-3.9		});
	resolveAnimation.to(resolve_chars_ovr, 			0.7, 	{opacity:0,										ease:Power1.easeInOut, 		delay: 	-2.1		});
	resolveAnimation.to(resolve_chars, 				0.7, 	{opacity:1,										ease:Power1.easeInOut, 		delay: 	-2.1		});
	// Messaging
	resolveAnimation.to(resolve_netflix, 			1, 		{opacity:1,										ease:Power1.easeInOut, 		delay: 	-1.7		});
	resolveAnimation.to(resolve_tagline, 			1, 		{opacity:1,										ease:Power1.easeInOut, 		delay: 	-1.7		});
	resolveAnimation.to(resolve_episodes, 			1, 		{opacity:1,										ease:Power1.easeInOut, 		delay: 	-1.7		});
	resolveAnimation.to(resolve_streaming, 			1, 		{opacity:1,										ease:Power1.easeInOut, 		delay: 	-1.7		});
	resolveAnimation.to(btn_resolve_watchNow, 		1, 		{opacity:1,										ease:Power1.easeInOut, 		delay: 	-1.7		});
	resolveAnimation.to(btn_resolve_watchTrailer, 	1, 		{opacity:1,										ease:Power1.easeInOut, 		delay: 	-1.7		});
	resolveAnimation.to(btn_resolve_replay, 		1, 		{opacity:1,										ease:Power1.easeInOut, 		delay: 	-1.7		});
	
	TweenMax.to(resolve_bg, 0, {opacity:1, delay: 4, onComplete: function() { btn_resolve_blocker.style.display = "none"}});
	
}

// ================= //
// === Rollovers === //
// ================= //

skipOver 	= function (){	TweenMax.to(this, 0.2, { fill: "#e50914", ease:Power1.easeInOut}); }
skipOut 		= function (){	TweenMax.to(this, 0.2, { fill: "#ffffff", ease:Power1.easeInOut}); }

replayOver 	= function (){	TweenMax.to(this, 0.4, { rotation: "-50", scale: 1.1, ease:Power3.easeInOut});}
replayOut 	= function (){	TweenMax.to(this, 0.4, { rotation: "0", scale: 1, ease:Power1.easeInOut});}

trailer_ctaOver = function (){
    trailerCharsOver();
	TweenMax.to(this, 0.5, { background: "#fff", color: "#e9292c", ease:Power1.easeInOut}); 
	TweenMax.to(this.lastChild, 0.5, { fill: "#e50914", ease:Power1.easeInOut}); 
}
trailer_ctaOut 	= function (){
    trailerCharsOut();
	TweenMax.to(this, 0.5, { background: "#e9292c", color: "#fff", ease:Power1.easeInOut});
	TweenMax.to(this.lastChild, 0.5, { fill: "#fff", ease:Power1.easeInOut});  
}
ctaOver 			= function (){
	charsOver();
	TweenMax.to(this, 0.5, { background: "#fff", color: "#e9292c", ease:Power1.easeInOut}); 
	TweenMax.to(this.lastChild, 0.5, { fill: "#e50914", ease:Power1.easeInOut}); 
}
ctaOut 			= function (){	
	charsOut();
	TweenMax.to(this, 0.5, { background: "#e9292c", color: "#fff", ease:Power1.easeInOut});
	TweenMax.to(this.lastChild, 0.5, { fill: "#fff", ease:Power1.easeInOut});  
}

charsOver	= function (){
		TweenMax.killTweensOf(resolve_chars);
		TweenMax.killTweensOf(resolve_chars_ovr);
		TweenMax.killTweensOf(resolve_fence);
		TweenMax.killTweensOf(resolve_TT);
		TweenMax.killTweensOf(resolve_TT_shadow);
		
		TweenMax.to(resolve_chars, .4, { opacity: 0, scale: 1.1, ease:Power1.easeIn});
		TweenMax.to(resolve_chars_ovr, .7, { opacity: 1, scale: 1, ease:Power1.easeOut});
		TweenMax.to(resolve_fence, .7, { scale: 1.05,ease:Power1.easeInOut});
        TweenMax.to(resolve_cast, .7, { scale: 1.05,top:"-11px", opacity:0, ease:Power1.easeInOut});
		
		TweenMax.to(resolve_TT_shadow, 	0.2, 	{opacity:1});
		TweenMax.to(resolve_TT, 		1, 		{scale:1.06, rotationX:40, top: "52px", ease:Power1.easeOut});
		TweenMax.to(resolve_TT_shadow, 	1, 		{scale:1.06, top: "55px", rotationX:40, ease:Power1.easeOut});
}
charsOut 	= function (){	
		TweenMax.to(resolve_chars, .7, { opacity: 1, scale: 1, ease:Power1.easeOut});
		TweenMax.to(resolve_chars_ovr, .4, { opacity: 0, scale: 1, ease:Power1.easeIn});
		TweenMax.to(resolve_fence, .7, { scale: 1,ease:Power1.easeInOut});
        TweenMax.to(resolve_cast, .7, { scale: 1,top:"0px", opacity:1, ease:Power1.easeInOut});
		
		TweenMax.to(resolve_TT, 		0.8, 	{scale:1,   rotationX:-30, 	top: "71px", 	ease:Power1.easeInOut, 		delay: 	0.1		});
		TweenMax.to(resolve_TT, 		0.6, 	{scale:1, 	rotationX:20, 	top: "66px", 	ease:Power1.easeInOut, 		delay: 	1.0		});
		TweenMax.to(resolve_TT, 		0.4, 	{scale:1, 	rotationX:0, 	top: "67px", 	ease:Power1.easeInOut, 		delay: 	1.6		});
		
		TweenMax.to(resolve_TT_shadow, 	0.8, 	{scale:1,   rotationX:-30, 	top: "69px", 	ease:Power1.easeInOut, 		delay: 	0.1		});
		TweenMax.to(resolve_TT_shadow, 	0.6, 	{scale:1, 	rotationX:20, 	top: "68px", 	ease:Power1.easeInOut, 		delay: 	1.0,		opacity: 0});
		TweenMax.to(resolve_TT_shadow, 	0.4, 	{scale:1, 	rotationX:0, 	top: "67px", 	ease:Power1.easeInOut, 		delay: 	1.6,		});	
}

trailerCharsOver	= function (){
		TweenMax.killTweensOf(trailer_chars);
		TweenMax.killTweensOf(trailer_chars_ovr);
		
		TweenMax.to(trailer_chars, .4, { opacity: 0, scale: 1.1, ease:Power1.easeIn});
		TweenMax.to(trailer_chars_ovr, .7, { opacity: 1, scale: 1, ease:Power1.easeOut});
}
trailerCharsOut 	= function (){	
		TweenMax.to(trailer_chars, .7, { opacity: 1, scale: 1, ease:Power1.easeOut});
		TweenMax.to(trailer_chars_ovr, .4, { opacity: 0, scale: 1, ease:Power1.easeIn});
}


// ============= //
// === Exits === //
// ============= //

onExitHandler = function(e){
	
	Enabler.exit("Main Clickthrough");
		
	// Kill The Youtube Player
	ytp.destroy();
	
	// Show/Hide the PRE/POST CTA's
	if (!trailerViewed) {
		btn_resolve_replay.style.display = "none";
		btn_resolve_watchNow.style.display = "none";
	} else {
		btn_resolve_replay.style.display = "block";
		btn_resolve_watchNow.style.display = "inline-block";
		btn_resolve_watchTrailer.style.display = "none";
	}
	
	// Set to Resolve -- NO ANIMATION
	TweenMax.killAll(false,true,false);
	
	intro.style.display = "none";
	trailer.style.display = "none";
	
	resolve.style.opacity = 0;
	resolve.style.display = "block";
	btn_resolve_blocker.style.display = "block";
	TweenMax.to(resolve, 0.5, {opacity: 1, ease:Power1.easeInOut, onComplete: function() {btn_resolve_blocker.style.display = "none"}});
	
	TweenMax.to(resolve_TT, 0, {scale:1, rotationX:0, top: "68px" });
	TweenMax.to(resolve_TT_shadow, 0, {scale:1, rotationX:0,	top: "68px", opacity: 0	});
	TweenMax.to(resolve_chars, 0, {scale:1, bottom: "-1px"});
	TweenMax.to(resolve_fence, 0, {scale:1});
	resolve_tagline.style.opacity = 1;
	resolve_episodes.style.opacity = 1;
	resolve_streaming.style.opacity = 1;
	btn_resolve_watchTrailer.style.opacity = 1;
	btn_resolve_watchNow.style.opacity = 1;
	btn_resolve_replay.style.opacity = 1;
	resolve_bg.style.opacity = 1;
				
}

// ========================== //
// === Browser Exceptions === //
// ========================== //

var OSName="Unknown OS";

if (navigator.appVersion.indexOf("Windows NT 6.2")!=-1) OSName="Windows 8";
if (navigator.appVersion.indexOf("Windows NT 6.1")!=-1) OSName="Windows 7";
if (navigator.appVersion.indexOf("Windows NT 6.0")!=-1) OSName="Windows Vista";
if (navigator.appVersion.indexOf("Windows NT 5.1")!=-1) OSName="Windows XP";
if (navigator.appVersion.indexOf("Windows NT 5.0")!=-1) OSName="Windows 2000";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="Mac/iOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

// Detect IE11 on Win7
if (OSName == "Windows 7" && navigator.appVersion.indexOf('Trident/') > 0) {	Enabler.isIE11 = true;	}
// Detect Firefox
Enabler.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
// Detect Mobile Devices
Enabler.isMobile=/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
Enabler.iPhone=/iPhone|iPod/i.test(navigator.userAgent);
Enabler.iPad=/iPad/i.test(navigator.userAgent);

// =========================== //
// === Init Studio Enabler === //
// =========================== //

window.addEventListener('load', preInit);
function preInit() {	Enabler.addEventListener(studio.events.StudioEvent.INIT, dcrmInit);}

// ========================== //
// === Dynamic Invocation === //
// ========================== //

// Dynamic Content variables and sample values
        Enabler.setProfileId(1070388);
    var devDynamicContent = {};

    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data= [{}];
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0]._id = 0;
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].unique_id = 1;
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].is_default = true;
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].reporting_label = "Default";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].start_date = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].start_date.RawValue = "1/1/2015";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].start_date.UtcValue = 1420099200000;
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].end_date = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].end_date.RawValue = "12/31/2016";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].end_date.UtcValue = 1483171200000;
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].original_series_text = "A NETFLIX ORIGINAL SERIES";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].tune_in_one_text = "ALL EPISODES";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].tune_in_two_text = "NOW STREAMING";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].watch_trailer_cta = "WATCH TRAILER >";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].watch_now_cta = "WATCH NOW >";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].description_text = "JUST ADD INTERNET, DATA, AND A COMPATIBLE DEVICE.";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].expand_text = "EXPAND >";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].expand_mobile_text = "TAP TO EXPAND";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].ashton_text = "ASHTON";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].kutcher_text = "KUTCHER";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].danny_text = "DANNY";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].masterson_text = "MASTERSON";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].sam_text = "SAM";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].elliott_text = "ELLIOTT";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].debra_text = "DEBRA";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].winger_text = "WINGER";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].yt_masthead_video_thumb_text_brothers = "THE BROTHERS";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].yt_masthead_video_thumb_text_family = "THE FAMILY";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].yt_masthead_video_thumb_text_trailer = "TRAILER";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].border_color = "rgb(0, 0, 0)";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_300x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_728x90 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_728x90.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_728x90.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_160x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_160x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_160x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_970x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_970x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_970x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_970x250_YTMH = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_970x250_YTMH.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_inp_970x250_YTMH.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_970x60 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_970x60.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_970x60.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_320x50 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_320x50.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_exp_320x50.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_300x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_300x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_300x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_300x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_300x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_300x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_728x90 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_728x90.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_728x90.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_160x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_160x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_160x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_970x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_970x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_970x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_320x50 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_320x50.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_320x50.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_640x100 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_640x100.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].title_std_640x100.Url = "https://s0.2mdn.net/ads/richmedia/studio/41526601/5441_20160219074253688_img_TT.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_300x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_300x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_300x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_300x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_300x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_300x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_728x90 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_728x90.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_728x90.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_160x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_160x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_160x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_970x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_970x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_970x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_970x250_YTMH = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_970x250_YTMH.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_inp_970x250_YTMH.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_970x60 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_970x60.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_970x60.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_320x50 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_320x50.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_exp_320x50.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_300x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_300x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_300x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_300x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_300x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_300x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_728x90 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_728x90.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_728x90.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_160x600 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_160x600.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_160x600.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_970x250 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_970x250.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_970x250.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_320x50 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_320x50.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_320x50.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_640x100 = {};
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_640x100.Type = "file";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].rating_std_640x100.Url = "https://s0.2mdn.net/ads/richmedia/studio/41642408/5441_20160225065814167_blank_ratings.png";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].progressive_300x250 = "RtucAOQs2JE";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].progressive_YTMH_396x223 = "";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].progressive_300x600 = "RtucAOQs2JE";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].progressive_970x250 = "RtucAOQs2JE";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].progressive_160x600 = "RtucAOQs2JE";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].progressive_970x418 = "RtucAOQs2JE";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].the_brothers = "2emlHposMlM";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].the_family = "c1INUWDiCy4";
    devDynamicContent.The_Ranch_S1_Dynamic_Feed_data[0].trailer = "c1INUWDiCy4";
    Enabler.setDevDynamicContent(devDynamicContent);
