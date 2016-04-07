(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 257,
	height: 90,
	fps: 24,
	color: "#000000",
	webfonts: {},
	manifest: [
		{src:"images/_257x90_1.jpg", id:"_257x90_1"}
	]
};



lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(lib._257x90_1 = function() {
	this.initialize(img._257x90_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,257,90);


// stage content:
(lib._257x90 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("A0EHCIAAuDMAoJAAAIAAODgAz6G4MAn0AAAIAAtvMgn0AAAg");
	this.shape.setTransform(128.5,45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(29));

	// Layer 1
	this.instance = new lib._257x90_1();
	this.instance.setTransform(1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(128.5,45,258,90);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;