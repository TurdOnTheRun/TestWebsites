(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 728,
	height: 90,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"images/_728x90_1.jpg?1459272997848", id:"_728x90_1"},
		{src:"images/_728x90_2.jpg?1459272997848", id:"_728x90_2"},
		{src:"images/_728x90_3.jpg?1459272997848", id:"_728x90_3"},
		{src:"images/Bitmap13.png?1459272997848", id:"Bitmap13"},
		{src:"images/Bitmap37copy.png?1459272997848", id:"Bitmap37copy"},
		{src:"images/Bitmap39copy.png?1459272997848", id:"Bitmap39copy"},
		{src:"images/Bitmap41.png?1459272997848", id:"Bitmap41"},
		{src:"images/Bitmap42.png?1459272997848", id:"Bitmap42"}
	]
};



// symbols:



(lib._728x90_1 = function() {
	this.initialize(img._728x90_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,728,90);


(lib._728x90_2 = function() {
	this.initialize(img._728x90_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,728,90);


(lib._728x90_3 = function() {
	this.initialize(img._728x90_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,728,90);


(lib.Bitmap13 = function() {
	this.initialize(img.Bitmap13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,55,14);


(lib.Bitmap37copy = function() {
	this.initialize(img.Bitmap37copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,493,90);


(lib.Bitmap39copy = function() {
	this.initialize(img.Bitmap39copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,477,90);


(lib.Bitmap41 = function() {
	this.initialize(img.Bitmap41);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,373,90);


(lib.Bitmap42 = function() {
	this.initialize(img.Bitmap42);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,75,21);


(lib.justDriveMc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Bitmap13();
	this.instance.setTransform(-15.5,-7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.5,-7,55,14);


(lib.imageRepeater = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib._728x90_1();
	this.instance.setTransform(-364,-45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-364,-45,728,90);


(lib.CTA_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.Bitmap42();
	this.instance.setTransform(-32,-11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32,-11,75,21);


(lib.crashMan = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib._728x90_3();
	this.instance.setTransform(-150.5,-125.5,1.003,1.033);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150.5,-125.5,730,93);


(lib.copyBlockTwo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new lib.Bitmap39copy();
	this.instance.setTransform(-248,-42.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248,-42.5,477,90);


(lib.copyBlockThree = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.instance = new lib.Bitmap41();
	this.instance.setTransform(-158,-31.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-158,-31.5,373,90);


(lib.copyBlockOne = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new lib.Bitmap37copy();
	this.instance.setTransform(-265,-44.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-265,-44.5,493,90);


(lib.clipTwo_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.instance = new lib._728x90_2();
	this.instance.setTransform(-150.5,-125.5,1.001,1.022);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150.5,-125.5,729,92);


// stage content:
(lib.NT0752564_728x90_Emoji = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{loop:10});
	
	var loopCount = 0

	// timeline functions:
	this.frame_0 = function() {

	}
	this.frame_147 = function() {
		if(loopCount<1)
		{
			this.play();
			loopCount++;
		}else{
			this.stop();
		}
	}
	this.frame_179 = function() {
		this.gotoAndPlay("loop");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(147).call(this.frame_147).wait(32).call(this.frame_179).wait(1));

	// Border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg41gG/MBxrAAAIAAN/MhxrAAAg");
	this.shape.setTransform(363.9,44.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(180));

	// Looping image repeater
	this.instance = new lib.imageRepeater();
	this.instance.setTransform(364,45);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(170).to({_off:false},0).to({alpha:0.449},4,cjs.Ease.get(-1)).to({alpha:1},5,cjs.Ease.get(1)).wait(1));

	// CTA
	this.instance_1 = new lib.CTA_mc();
	this.instance_1.setTransform(564.5,70);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(111).to({_off:false},0).to({x:557},3,cjs.Ease.get(-1)).to({x:544.5},5,cjs.Ease.get(1)).wait(61));

	// #justDrive
	this.instance_2 = new lib.justDriveMc();
	this.instance_2.setTransform(460.5,72);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(111).to({_off:false},0).to({x:453},3,cjs.Ease.get(-1)).to({x:440.5},5,cjs.Ease.get(1)).wait(61));

	// Resolve Copy
	this.instance_3 = new lib.copyBlockThree();
	this.instance_3.setTransform(528.5,32);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(88).to({_off:false},0).to({x:512.5,alpha:0.398},4,cjs.Ease.get(-1)).to({x:488.5,alpha:1},5,cjs.Ease.get(1)).wait(83));

	// Resolve Image
	this.instance_4 = new lib.crashMan();
	this.instance_4.setTransform(150,125);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(88).to({_off:false},0).to({alpha:0.449},4,cjs.Ease.get(-1)).to({alpha:1},5,cjs.Ease.get(0.98)).wait(83));

	// Could Wre... Copy
	this.instance_5 = new lib.copyBlockTwo();
	this.instance_5.setTransform(549.5,43);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(49).to({x:529.5,alpha:0.398},4,cjs.Ease.get(-1)).to({x:499.5,alpha:1},6,cjs.Ease.get(1)).wait(121));

	// Image Two
	this.instance_6 = new lib.clipTwo_mc();
	this.instance_6.setTransform(150,125);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(49).to({alpha:0.398},4,cjs.Ease.get(-1)).to({alpha:1},6,cjs.Ease.get(1)).wait(121));

	// One EMOJI Copy
	this.instance_7 = new lib.copyBlockOne();
	this.instance_7.setTransform(550.5,45);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(20).to({x:530.5,alpha:0.398},4,cjs.Ease.get(-1)).to({x:500.5,alpha:1},6,cjs.Ease.get(1)).wait(150));

	// Main Image
	this.instance_8 = new lib._728x90_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({_off:true},60).wait(120));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(363,44,779.5,92.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;