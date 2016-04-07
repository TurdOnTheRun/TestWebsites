TweenLite.ticker.fps(45);

var bg = document.getElementById('bg'),
	logo = document.getElementById('logo'),
	copy = document.getElementById('copy'),
	icon = document.getElementById('icon'),
	whywait = document.getElementById('whywait'),
	ctaBg = document.getElementById('cta-bg'),
	ctaLabel = document.getElementById('cta-label'),
	ctaIcon = document.getElementById('cta-icon'),
	brain = document.getElementById('brain'),
	brainGlow = document.getElementById('brain-glow');
	brainShadow = document.getElementById('brain-shadow');

var container = document.getElementById('container');
container.addEventListener('click', exitHandler);

function exitHandler (event) { Enabler.exit('CLICKTAG'); }

if (!Enabler.isInitialized()) {
	Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitialized);
} else {
   	enablerInitialized();
}

function enablerInitialized() {
	// Enabler initialized.
	// In App ads are rendered offscreen so animation should wait for
	// the visible event. These are simulated with delays in the local
	// environment.
	if (!Enabler.isVisible()) {
		Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisible);
	} else {
	 	adVisible();
	}
}


function adVisible() {
	// Ad visible, start ad/animation.
	container.removeAttribute('hidden');

	TweenLite.to(container, 0, {force3d:true});
	TweenLite.to(brain, 0, {force3d:true});
	TweenLite.to(brainGlow, 0, {force3d:true});
	// Do your motion tricks below this line

	//Bg + Logo
	TweenLite.from(bg, 8, {y:-150, scale:1.5, ease:Power3.easeOut, delay:1});
	TweenLite.delayedCall(8, wiggleBG, [bg]);
	TweenLite.set(logo, {transformOrigin:"center center"});
	TweenLite.from(logo, 7, {x:-85, y:-99, scale:2, ease:Power3.easeOut, delay:1});
	// TweenLite.killTweensOf(logo);


	// Brain ---
	TweenLite.from(brain, 7.2, {x:1000, y:-300, scale:20, ease:Power4.easeOut, delay:0});
	TweenLite.from(brainGlow, 5, {alpha:0, ease: RoughEase.ease.config({ template: Power3.easeInOut, strength: 1, points: 20, taper: "none", randomize: true, clamp: false}), delay:5});
	TweenLite.from(brainShadow, 7, {opacity:0, x:750, y:140, scale:7,  ease:Power3.easeOut, delay:0});
	TweenLite.delayedCall(6.8, wiggle, [brain]);
	TweenLite.delayedCall(6.8, wiggle, [brainGlow]);
	TweenLite.delayedCall(6.8, wiggleBG, [brainShadow]);


	// Icon ---
	TweenLite.from(icon, 6.0, {autoAlpha:0, x:-450, y:-600, scale:15, ease:Power4.easeOut, delay:1});

	// Copy ---
	TweenLite.from(copy, 0.8, {alpha:0, ease:Power2.easeIn, delay:1});
	TweenLite.from(copy, 5.0, {x:-1400, y:200, scale:10, ease:Power3.easeOut, delay:1.5});


	// Whywait ---
	TweenLite.from(whywait, 5, {x:-200, y:500, scale:15, ease:Power2.easeOut, delay:1});

	//Cta
	TweenLite.from(ctaLabel, 4, {opacity:0, x:360, y:140, scale:8, ease:Power3.easeOut, delay: 2.5});
	TweenLite.from(ctaIcon, 4, {opacity:0, x:100, y:140, scale:8, ease:Power3.easeOut, delay: 2.5});

	//Rollover animation to call little attention
	TweenLite.to(ctaIcon, .9, {scaleX:1.2, scaleY:1.2, ease:Bounce.easeOut, delay: 7.8});
	TweenLite.to(ctaIcon, .4, {scaleX:1, scaleY:1, ease:Power3.easeOut, delay: 8.8});


	TweenLite.delayedCall(14, function(){
	   TweenLite.killTweensOf(brain);
	   TweenLite.killTweensOf(brainGlow);
	   TweenLite.killTweensOf(brainShadow);
	   TweenLite.killTweensOf(bg);
	})
}

function overCta() {
	TweenLite.to(ctaIcon, .9, {scale:1.2, ease:Bounce.easeOut});
}

function outCta() {
	TweenLite.to(ctaIcon, .3, {scale:1, ease:Power3.easeOut});
}


function wiggle(asset){

		var repeatDelay = (Math.random() * (.2 - .1));
		/**************/

		var maxScale = 1.1;
		var minScale = .9;

		var randomScale = (Math.random() * (maxScale - minScale)) + minScale;

		/**************/

		var maxPosition = 4;
		var minPosition = -4;

		var randomPosition = (Math.random() * (maxPosition - minPosition)) + minPosition;

		/**************
			Scale
		**************/
		TweenLite.to(asset, 3, {ease:Power1.easeInOut,
			yoyo:true, repeat:1, repeatDelay:repeatDelay, onComplete:wiggle, onCompleteParams: [asset]});

		/**************
			Position
		**************/
		TweenLite.to(asset, 3, {css:{x: randomPosition, y:randomPosition}, ease:Power0.easeInOut,
			yoyo:true, repeat:1, onComplete:wiggle, onCompleteParams: [asset], onUpdate: function(){
				if(asset == brain)
				brainGlow.style.transform = brain.style.transform;
			}});
	
};

function wiggleBG(asset){

		var repeatDelay = (Math.random() * (.2 - .1));

		var maxPosition = 0;
		var minPosition = -4;

		var randomPosition = (Math.random() * (maxPosition - minPosition)) + minPosition;

		/**************
			Position
		**************/
		TweenLite.to(asset, 3, {css:{y:randomPosition}, ease:Power0.easeInOut,
			yoyo:true, repeat:1, onComplete:wiggleBG, onCompleteParams: [asset]});
};
