(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 300,
	height: 250,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"background.jpg", id:"background"},
		{src:"border.png", id:"border"},
		{src:"bottom.png", id:"bottom"},
		{src:"cta.png", id:"cta"},
		{src:"filter.png", id:"filter"},
		{src:"filter_glow.png", id:"filter_glow"},
		{src:"txt1.png", id:"txt1"},
		{src:"txt1_glow.png", id:"txt1_glow"},
		{src:"txt2.png", id:"txt2"},
		{src:"txt3.png", id:"txt3"},
		{src:"txt3_glow.png", id:"txt3_glow"}
	]
};



// symbols:



(lib.background = function() {
	this.initialize(img.background);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.border = function() {
	this.initialize(img.border);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.bottom = function() {
	this.initialize(img.bottom);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.cta = function() {
	this.initialize(img.cta);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.filter = function() {
	this.initialize(img.filter);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.filter_glow = function() {
	this.initialize(img.filter_glow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt1 = function() {
	this.initialize(img.txt1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt1_glow = function() {
	this.initialize(img.txt1_glow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt2 = function() {
	this.initialize(img.txt2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt3 = function() {
	this.initialize(img.txt3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt3_glow = function() {
	this.initialize(img.txt3_glow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt3_1 = function() {
	this.initialize();

	// text
	this.instance = new lib.txt3();

	// glow
	this.instance_1 = new lib.txt3_glow();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt2_1 = function() {
	this.initialize();

	// text
	this.instance = new lib.txt2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.txt1_1 = function() {
	this.initialize();

	// text
	this.instance = new lib.txt1();

	// glow
	this.instance_1 = new lib.txt1_glow();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.filter_1 = function() {
	this.initialize();

	// filter
	this.instance = new lib.filter();

	// glow
	this.instance_1 = new lib.filter_glow();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.cta_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.cta();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.bottom_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.bottom();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


// stage content:
(lib._300x250_40_fram_sweepstakes_topic = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_183 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(183).call(this.frame_183).wait(1));

	// border
	this.instance = new lib.border();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(184));

	// txt3
	this.instance_1 = new lib.txt3_1();
	this.instance_1.setTransform(40,192,0.5,0.5,0,0,0,80,300);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(155).to({_off:false},0).to({scaleX:1,scaleY:1,x:80,y:300,alpha:1},9,cjs.Ease.get(1)).wait(20));

	// filter
	this.instance_2 = new lib.filter_1();
	this.instance_2.setTransform(180,300,1,1,0,0,0,80,300);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(155).to({_off:false},0).to({x:80},9,cjs.Ease.get(1)).wait(20));

	// txt2
	this.instance_3 = new lib.txt2_1();
	this.instance_3.setTransform(40,275,0.5,0.5,0,0,0,80,300);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(79).to({_off:false},0).to({scaleX:1,scaleY:1,x:80,y:300,alpha:1},6,cjs.Ease.get(1)).wait(62).to({alpha:0},6).wait(31));

	// txt1
	this.instance_4 = new lib.txt1_1();
	this.instance_4.setTransform(40.5,274.5,0.5,0.5,0,0,0,80,300);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({scaleX:1,scaleY:1,x:80,y:300,alpha:1},6,cjs.Ease.get(1)).wait(57).to({alpha:0},6).wait(106));

	// bottom
	this.instance_5 = new lib.bottom_1();
	this.instance_5.setTransform(80,402,1,1,0,0,0,80,300);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(172).to({_off:false},0).to({y:300},11,cjs.Ease.get(1)).wait(1));

	// cta
	this.instance_6 = new lib.cta_1();
	this.instance_6.setTransform(80,300,1,1,0,0,0,80,300);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(164).to({_off:false},0).to({alpha:1},7).wait(13));

	// background
	this.instance_7 = new lib.background();

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(184));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(150,125,300,250);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;