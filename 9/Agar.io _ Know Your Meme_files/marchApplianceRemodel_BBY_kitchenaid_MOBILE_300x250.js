(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 300,
	height: 250,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"./g_BBY_fridge.png?1457630241058", id:"g_BBY_fridge"},
		{src:"./g_BBY_kitchen_img_300x250.jpg?1457630241058", id:"g_BBY_kitchen_img_300x250"},
		{src:"./g_BBY_range_01.png?1457630241058", id:"g_BBY_range_01"},
		{src:"./g_BBY_range_02.png?1457630241058", id:"g_BBY_range_02"}
	]
};



// symbols:



(lib.g_BBY_fridge = function() {
	this.initialize(img.g_BBY_fridge);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,120,245);


(lib.g_BBY_kitchen_img_300x250 = function() {
	this.initialize(img.g_BBY_kitchen_img_300x250);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.g_BBY_range_01 = function() {
	this.initialize(img.g_BBY_range_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,227,144);


(lib.g_BBY_range_02 = function() {
	this.initialize(img.g_BBY_range_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,134);


(lib.logo_BestBuy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231F20").s().p("AAHAxIg/gGIAIhbIA2AFQAzAEgDAaQgBANgRACIAAABQAWAIgBAQQgBAOgQAFQgJADgNAAIgLAAgAgKAZIAFAAIALAAQAHgBAAgFQABgIgSgBIgFgBgAgHgIIAEAAQANABABgHQAAgEgFgCIgIgBIgEgBg");
	this.shape.setTransform(-13,-6.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#231F20").s().p("AgdAuIAFg+IgagCIADgfIBiAJIgDAeIgagDIgGA+g");
	this.shape_1.setTransform(18.4,-3.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#231F20").s().p("AgEAvQgcgDgVgKIAQgZIADABQAPAKAOACQAKAAAAgFQABgEgJgCIgJgCQgigIACgSQABgQATgIQARgHAUACQAWABATAKIgPAXQgMgIgPgBQgKgBAAAFQgBADAKACIAKADQAjAIgCAUQgCAPgSAIQgNAFgRAAIgIAAg");
	this.shape_2.setTransform(7.7,-4.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#231F20").s().p("AgvAqIAIhbIBXAHIgCAaIgpgDIgBAJIAlACIgCAXIgkgDIgBAJIApADIgCAag");
	this.shape_3.setTransform(-2.2,-5.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#231F20").s().p("AAHAxIg/gGIAIhbIA1AFQA0AEgDAaQAAAHgFAEQgFADgJABIAAABQAXAIgBAQQgBAOgQAFQgJADgNAAIgLAAgAgKAZIAFAAIALAAQAHgBAAgFQABgIgSgBIgFgBgAgHgIIAEAAQANABABgHQAAgEgFgCIgJgBIgDgBg");
	this.shape_4.setTransform(-12,4.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#231F20").s().p("AgEAxQg7gGAEgnIAFg1IAtAEIgEAyQgBAHACADQACAEAIABQAGABADgEQACgDABgHIAEgyIAuAEIgFA2QgBATgRAJQgNAHgSAAIgKgBg");
	this.shape_5.setTransform(0.2,5.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#231F20").s().p("AgdAuIADgoIgpg3IA2AEIAMAaIABAAIAEgIIALgPIA1AFIgxAvIgEAog");
	this.shape_6.setTransform(12.9,6.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#231F20").s().p("AABAEIgBgEIgBAAIAAAEIgBAAIABgHIABAAQABABABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIABAEgAAAAAIAAAAIACAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBgBAAAAIAAAAg");
	this.shape_7.setTransform(20.5,3.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#231F20").s().p("AikCNIgBgBIhahnIALh/IBrhVIGJAjIgcE7gAjvhWIgKB4IBXBlIGBAiIAbkwImBghgAjagDQgHgBgEgFQgFgFAAgGIAAgBQABgHAFgEQAFgFAGAAIACAAQAGABAFAFQAEAEAAAHIAAABQAAAHgFAFQgFAEgHAAgAjggdQgDADgBAFIAAABQAAAEADADQADADAEABIABAAQAKAAABgKIAAgBQAAgKgKgBIgBAAQgEAAgDACg");

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FEEF35").s().p("AikCKIhYhmIALh8IBphTIGFAiIgbE1gAjigfQgEAEgBAGQAAAGAEAEQADAEAGABQAGABAEgEQAFgEAAgGQABgFgEgFQgEgEgFgBIgCAAQgFAAgEADg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.7,-17.6,51.4,35.2);


(lib.g_range = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// g_BBY_range_01.png
	this.instance = new lib.g_BBY_range_01();
	this.instance.setTransform(-174.7,-83.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-174.7,-83.1,227,144);


(lib.g_logo_kitchenAid = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgIAHQgFgDAAgEQAAgDAFgDQADgDAFAAQAFAAAFADQADADAAADQAAAEgDADQgFADgFAAQgFAAgDgDg");
	this.shape.setTransform(-25.1,-2.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAMQAAgXAgAAQAVAAAJALQAEAFgBAKIgnAAQAAAKANAAQAOAAAMgEIAAAJQgGAGgbAAQggAAAAgYgAAGAEIAAABIANAAIAAgBQAAgFgGAAQgHAAAAAFgAifAeQgKgHAAgMQAAgLAKgFQAKgGAPAAQAOAAAKAGIAAALQgGgEgIAAQgRAAAAAJQAAAJARAAQAJAAAFgDIAAANQgKAGgOAAQgPAAgKgGgAjUAfQgHgEABgHIAAgSIgJAAIAAgKIAJAAIAAgQIAcAAIAAAQIAOAAIAAAKIgOAAIAAANQAAAEACACQADADAEAAQADAAACgCIAAAJQgIAFgNAAQgJAAgGgFgAEzAhIAAgEQgJAEgHAAQgNAAgHgFQgIgHAAgLQAAgKAIgFQAHgGANAAQAJAAAHAEIAAgYIAcAAIAABAgAEmAEQgDADAAADQAAAIAIAAQAFAAADgDIAAgKQgEgDgEAAQgDAAgCACgADiAhIAAgpIAcAAIAAApgAC5AhIgGgMIgaAAIgFAMIgQAAIAag8IgEgIIAiAAIAeBEgACgAFIAMAAIgGgMgABiAhIAAgVQgBgHgGAAQgHAAAAAHIAAAVIgcAAIAAgpIAcAAIAAAEQAHgFAJAAQAMAAAGAIQAGAEAAAFIAAAZgAg4AhIAAgVQAAgHgGAAQgIAAAAAHIAAAVIgcAAIAAhAIAcAAIAAAbQAIgFAJAAQALAAAHAIQAFAEAAAFIAAAZgAkIAhIAAgpIAcAAIAAApgAkxAhIgJgTQgDgGgGAAIgFABIAAAYIggAAIAAhEIAgAAIAAAbIACAAQAEAAABgDIARgYIAaAAIgTAbQAHACADAGIAPAhgADmgRQgEgDAAgEQAAgFAEgDQAEgDAGAAQAGAAAEADQAEADAAAFQAAAEgEADQgEADgGAAQgGAAgEgDgAFWgZQAAgKAKAAQAJAAAAAKQAAAKgJAAQgKAAAAgKgAFYgZQAAAIAIAAQAIAAAAgIQAAgIgIAAQgIAAAAAIgAFfgYIAAAAIAAAEIgCAAIAAgLIADAAQAFAAAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAIAEAEIgEAAgAFfgaIABAAQABAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAgBAAIgBAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.2,-3.6,72.4,7.3);


(lib.g_legal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ADHAlIABgEIADABQAEAAABgHIACgHIgLgmIAGAAIAIAfIAIgfIAFAAIgMAtQgDALgHAAgAClAFIAAgXIAGAAIAAAXQAAALAGAAQAJAAAAgOIAAgUIAFAAIAAAlIgFAAIAAgIIAAAAQgCAJgIAAQgLAAAAgPgAA9APIADgEQADAFAFAAQAGAAAAgIQAAgEgHgEQgJgBAAgHQABgFADgEQADgDAEAAQAHAAADAFIgDAEQgCgFgFAAQgFABAAAGQAAAGAGACQAJABAAAIQAAAMgMAAQgFAAgFgFgAAdAAQAAgIAEgGQADgGAHAAQAMAAAAAUIAAAAIgUAAQAAAPAIABQAFAAADgHIADADQgDAJgIgBQgOABAAgVgAAjgCIAQAAQgBgOgHAAQgJAAABAOgAjbAMQgGgHAAgNQAAgNAGgIQAHgJAJABQAKgBAHAJQAGAIAAANQAAANgGAHQgHAIgKAAQgJAAgHgIgAjYgaQgFAHAAALQAAALAFAGQAFAIAIAAQAJAAAFgIQAFgGAAgLQAAgLgFgHQgFgHgJgBQgIABgFAHgABdAJIAAgXIgFAAIAAgEIAFAAIAAgLIAFAAIAAALIAHAAIAAAEIgHAAIAAAWQAAAIAEAAIADgBIAAAEIgFABQgHAAAAgLgAg9ACQAAgFAFgJIALgXIAHAAIgNAYQAEgEADAAQAGAAADAFQAFAFAAAGQAAATgPAAQgQAAAAgSgAg3ACQAAAOAKAAQAKgBAAgOQAAgLgKAAQgKAAAAAMgAiIgHQAAgeAPABQAQgBgBAeQABAbgQAAQgPAAAAgbgAiCgHQAAAWAJAAQAKAAAAgWQAAgZgKAAQgJAAAAAZgAB/ATIAAg2IAOAAQAOgBgBAOQABAKgJADIAAABQAKAAAAALQAAAQgOAAgACFAPIAIAAQAKAAAAgMQAAgJgKAAIgIAAgACFgKIAHAAQAKAAAAgLQgBgKgJAAIgHAAgAgFATIAAg2IALAAQAOgBAAAOQAAAKgIADIAAABQAKABAAAKQAAAQgPAAgAAAAPIAGAAQALAAAAgMQAAgJgLAAIgGAAgAAAgKIAFAAQAKAAAAgLQAAgKgKAAIgFAAgAhSATIAAgwIgLAIIgDgFIAOgJIAFAAIAAA2gAitATIAAgFIAPgUQAHgJAAgHQAAgJgIgBQgHAAgCAJIgFgBQACgNAMABQAHgBADAFQAEAEAAAGQAAAIgJAMIgNAQIAVAAIAAAFgAjWgIQAAgRAMgBQAHABABAEIgDAEQgBgDgEAAQgHAAABAMQgBALAHAAQAEAAABgDIADAEQgBAEgHAAQgMAAAAgQg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.6,-3.9,45.3,7.8);


(lib.g_kitchen_img = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.g_BBY_kitchen_img_300x250();
	this.instance.setTransform(-150,-125);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-125,300,250);


(lib.g_end_sku = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.g_BBY_range_02();
	this.instance.setTransform(55.4,-8.2,0.476,0.476);

	this.instance_1 = new lib.g_BBY_fridge();
	this.instance_1.setTransform(-4,-56.8,0.459,0.459);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-56.8,109.5,112.4);


(lib.frame_06_txt_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98,-62.5,196,125.1);


(lib.frame_03_txt_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgoEqQgagKgXgVQgVgVgLgaQgLgdAAghQAAgiALgbQALgbAVgUQAWgUAbgJQAdgLAfAAQAhAAAcALQAdAKAVATQAUATALAcQAMAbAAAiQAAAhgMAdQgLAbgUAUQgWAUgcALQgeALgfAAQgeAAgegLgAgLBOQgPAHgKALQgKALgHARQgGAQAAASQAAATAGARQAHAQAKALQALAMAOAHQAPAGAQAAQARAAAQgGQAOgHAMgMQAKgLAGgQQAGgRAAgTQAAgSgGgQQgGgRgKgLQgLgLgPgHQgPgGgSAAQgTAAgMAGgAtvEqQgcgLgTgUIAtgtQAJAMASAJQASAJAQAAQAIAAAGgCQAGgBAIgEQAFgDADgHQADgGAAgIQAAgIgEgGQgEgFgIgFQgGgEgMgEIgzgTQgLgFgNgKQgJgJgHgOQgGgOAAgTQAAgXAKgRQAJgQAPgMQASgLASgEQASgFAWAAQAZAAAXAIQAbAKARAQIgsAuQgIgLgOgGQgOgHgNAAIgPABQgHABgFAEQgFADgEAGQgFAFAAAIQAAAIADAEQADAFAGAEQAGADAIADIAwARQAPAFANALQAOAIAIAPQAJAPAAAVQgBAZgIARQgKASgPALQgOALgVAHQgUAFgUAAQgeAAgdgKgAFzEtIg+hwIgWAAIAABwIhEAAIAAkbIBsAAQATAAAWAEQAUAFAOAJQAPAKAJARQAKAPAAAZQAAAdgPAUQgRAUgbAIIBKB5gAEeCLIAgAAIASgBQAGgBAKgEQAHgEAEgHQAGgGgBgLQAAgLgEgGQgEgGgHgDQgGgEgIgBIgQgBIglAAgAk7EtIhrkbIBMAAIBDDJIABAAIBBjJIBMAAIhuEbgAnbEtIgVg4IhuAAIgVA4IhKAAIB2kbIBDAAIB2EbgApKC/IBHAAIgjhigALHgUQgcgLgUgUQgWgVgLgaQgMgdABghQgBgiAMgbQALgbAWgUQAUgTAcgKQAcgLAiAAQAhAAAdALQAbAKAVATQAWAUALAbQALAbAAAiQAAAhgLAdQgLAagWAVQgVAUgbALQgeALggAAQggAAgegLgALkjwQgPAHgLALQgKALgGARQgGAQAAASQAAATAGARQAHAQAJALQALAMAPAHQARAGAQAAQAQAAARgGQAPgHAKgMQAKgKAHgRQAGgRAAgTQAAgSgGgQQgHgRgKgLQgLgLgOgHQgPgGgSAAQgSAAgPAGgAHRgRIAAjhIhQAAIAAg6IDjAAIAAA6IhQAAIAADhgABPgRIAAkbIC+AAIAAA5Ih9AAIAAA2IB2AAIAAA3Ih2AAIAAA7ICEAAIAAA6gAjmgRIAAkbIBnAAQAdAAAeAHQAcAGAYARQAWARANAaQAOAbAAApQAAAlgOAbQgOAcgUAQQgXASgcAIQgcAIgeAAgAiihMIAgAAQARAAASgEQASgFANgJQANgKAHgQQAIgQAAgXQAAgZgIgPQgHgQgNgJQgOgKgRgEQgOgEgTAAIgiAAgAlJgRIgWg4IhtAAIgWA4IhKAAIB3kbIBDAAIB1EbgAm5h/IBIAAIgkhigAqGgRIABjIIgBAAIhJDIIgwAAIhIjIIgBAAIACDIIhBAAIAAkbIBhAAIBBC1IACAAIA9i1IBjAAIAAEbg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.7,-30.9,185.5,61.9);


(lib.frame_02_txt_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhiEqQgcgLgUgTQgUgVgMgbQgMgcAAghQAAghAMgcQAMgdAVgSQAVgVAcgKQAcgJAggBQAeAAAbALQAcALATAUIguAuQgKgNgOgGQgPgHgRAAQgSABgPAGQgPAHgKALQgLAMgGAQQgGAQAAASQAAATAGARQAGAQAKALQAKAKAQAIQAOAGASAAQAUAAAPgIQAPgJAIgMIAwAtQgSAVgdANQgZAMgkAAQghAAgcgKgAEXEtIAAh3IhvAAIAAB3IhEAAIAAkbIBEAAIAABrIBvAAIAAhrIBEAAIAAEbgAmjEtIAAkbIC+AAIAAA5Ih8AAIAAA2IB1AAIAAA3Ih1AAIAAA6ICDAAIAAA7gApXEtIAAjgIhQAAIAAg7IDlAAIAAA7IhQAAIAADggAp0gUQgcgLgTgUIAtgtQAJAMASAKQASAIAQAAQAIAAAHgCQAIgCAFgDQAGgEACgFQADgHAAgIQAAgJgEgEQgEgGgHgFQgFgEgNgEIgZgIQgMgEgPgHQgLgEgMgLQgKgIgHgPQgGgNAAgTQAAgYAKgRQAKgRAPgLQAQgKATgGQAWgEASAAQAYAAAZAJQAaAJASARIgsAuQgIgMgPgGQgPgHgMAAIgOABQgIACgFADQgFACgEAHQgEAGAAAHQAAAIADAEQADAGAGADQAFADAJADIAwARQANAFAPALQANAJAIAOQAJAPAAAVQAAAYgJASQgKASgPALQgQANgSAEQgUAHgVAAQgfgBgcgKgAITgRIAAjhIhQAAIAAg6IDlAAIAAA6IhQAAIAADhgADsgRIAAkbIC+AAIAAA6Ih8AAIAAA1IB1AAIAAA3Ih1AAIAAA6ICDAAIAAA7gAgFgRIAAkbIC8AAIAAA6Ih8AAIAAA1IB1AAIAAA3Ih1AAIAAA6ICDAAIAAA7gAi3gRIg4i/IgBAAIg4C/IhEAAIhQkbIBJAAIAtC8IABAAIAzi8IBHAAIAzC8IABAAIAti8IBIAAIhREbg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68,-30.9,136.1,61.8);


(lib.frame_01_txt_03 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACyCiQgigMgVgYIA0g1QAOAQASAJQAUAKAUAAIARgBQAIgCAHgFQAHgEADgHQAFgHAAgKQgBgKgFgGQgEgHgJgFQgJgFgNgFIgdgJQgSgHgNgGQgQgHgMgJQgMgMgHgPQgHgRAAgVQAAgdALgSQALgVATgMQASgNAYgGQAUgGAaABQAeAAAbAKQAeAKAWAUIgzA2QgLgNgQgHQgTgJgNABIgQABQgIABgIAFQgGADgEAHQgFAGAAAKQAAAJAEAFQAEAHAGADQAHAEAJAEIA4ATQAUAIAOALQAQAKAJAQQAKARAAAYQAAAdgKAWQgMAVgRANQgRANgYAHQgWAHgagBQgjAAgigMgAJ/CnIAAiMIiCAAIAACMIhRAAIAAlNIBRAAIAAB/ICCAAIAAh/IBQAAIAAFNgAiGCnIAAlNIDeAAIAABEIiQAAIAAA/ICIAAIAAA/IiIAAIAABGICZAAIAABFgAkMCnIhJiFIgbAAIAACFIhPAAIAAlNIB/AAQAXABAZAEQAXAGARAMQATAMAKASQAMAVAAAcQgBAggSAYQgSAWghAKIBXCPgAlwgXIA6gBQANgDAHgDQAIgEAFgJQAGgGAAgOQgBgMgFgHQgDgGgJgGQgJgEgIgBIg+gBgArOCnIAAlNIDbAAIAABFIiLAAIAABGICBAAIAAA/IiBAAIAACDg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.9,-17.5,143.9,35);


(lib.frame_01_txt_02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AH6FiQghgMgZgYQgXgWgPghQgNggAAgoQAAgpAOggQANggAZgXQAZgXAhgMQAhgMAmAAQAoAAAhAMQAjANAUATIgzA6QgLgOgUgIQgUgJgXAAQgWAAgSAIQgSAIgNANQgNAOgHAUQgHARAAAYQAAAYAGASQAHAUANAOQALAMAVAJQATAIAYAAQAQAAALgCQALgCANgFIAAg9IhAAAIAAhBICKAAIAACxQgaANggAIQgfAHgoABQgpAAghgNgAD8FmIiGjaIgBAAIABDaIhOAAIAAlNIBcAAICGDZIABAAIgCjZIBPAAIAAFNgAhsFmIAAlNIBRAAIAAFNgAkBFmIAAiLIiCAAIAACLIhQAAIAAlNIBQAAIAAB+ICCAAIAAh+IBRAAIAAFNgAqnFmIAAkJIheAAIAAhEIENAAIAABEIheAAIAAEJgAlxgaQgigNgYgXQgYgYgOggQgNgiAAgnQAAgoANggQANggAZgXQAZgXAhgMQAigNAmAAQAmAAAjANQAhAMAYAXQAZAXANAgQAOAgAAAoQAAAngOAiQgNAggZAYQgXAXgiANQghAMgoAAQgoAAgggMgAlQkdQgQAHgOAPQgMAMgHATQgHAUAAAVQAAAWAHATQAHAVANANQALAMASAJQASAHAVAAQAWAAARgHQARgJANgMQAMgNAIgVQAHgTAAgWQAAgVgHgUQgIgTgMgMQgNgPgRgHQgRgIgWAAQgVAAgSAIgArJgbQghgMgWgXIA0g2QAMAPAVAKQATALAUAAIASgCQAIgCAHgFQAGgEAEgHQAEgIAAgJQAAgIgFgIQgFgGgJgGQgIgGgNgEIgegJQgRgHgOgGQgPgGgMgMQgMgLgIgQQgHgOAAgYQAAgcALgUQAMgUASgNQARgLAYgHQAYgGAXAAQAdAAAdAKQAeAMAVATIgzA3QgKgOgRgHQgQgIgQAAIgRABQgIABgGAEQgHAEgEAHQgFAGAAAKQAAAJAEAFQADAGAHAEQAGAEAKAEIA5ATQATAIAOALQAQAMAJAQQAKARAAAZQAAAcgLAVQgKAUgSAPQgRANgYAHQgWAGgaAAQgkAAghgMgAGCgXIAAlOIDgAAIAABFIiSAAIAAA/ICKAAIAABAIiKAAIAABGICbAAIAABEgADvgXIABjsIgBAAIhXDsIg4AAIhUjsIgCAAIACDsIhKAAIAAlOIBxAAIBMDWIACAAIBIjWIB1AAIAAFOgAKPh0IAAg9IB3AAIAAA9g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.5,-36.7,155,73.4);


(lib.frame_01_txt_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AFcChQgbgKgSgSQgTgRgJgZQgLgZAAgeIAAjOIBQAAIAADIQAAAOAEALQADANAIAJQAIAKALAGQAMAFARAAQAQAAANgFQAMgGAIgKQAIgLADgLQADgOAAgLIAAjIIBQAAIAADOQABAegLAZQgKAZgSARQgUASgaAKQgZAKgjAAQghAAgZgKgAJnCiIAAlMIB7AAQAaAAAZAGQAXAFASAMQATANAJATQALATAAAdQAAAdgMAUQgJASgUANQgTAMgXAFQgYAGgaAAIgoAAIAAB+gAK4gaIAiAAIAWgCQAKgCAIgEQAJgGAEgHQAFgJAAgKQAAgLgFgJQgEgHgIgFQgJgEgKgBIg4gCgAiGCiIAAlMIDfAAIAABEIiRAAIAAA/ICIAAIAAA/IiIAAIAABFICZAAIAABFgAkMCiIhIiEIgcAAIAACEIhPAAIAAlMICAAAQAVAAAaAFQAWAGATALQARALAMAUQALAUAAAcQgBAigSAXQgSAVggAKIBXCPgAlwgbIAmAAQALAAAJgCQAKgBAKgEQAIgFAFgIQAGgIAAgMQAAgNgFgGQgGgIgHgEQgIgEgJgBIg+gCgApUCiIAAlMIBRAAIAAFMgAtkCiIAAlMIDcAAIAABFIiMAAIAABFICCAAIAABAIiCAAIAACCg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.9,-17.1,173.8,34.3);


(lib.btn_solid = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#09385D").s().p("AhEA3IAAhRIARAAIAAAHIABAAQAFgIANAAQALAAAIAJQAGAIABAKQAAAMgHAJQgIAJgMAAQgLAAgGgIIAAAhgAgvgIQgEAEABAEQgBAGAEAEQAEAFAFAAQAHAAADgFQAEgEAAgGQAAgEgEgEQgDgEgHAAQgFAAgEAEgAB+AWQgJgJAAgNQAAgLAJgIQAJgJANABQANgBAJAJQAJAIAAALQAAANgJAJQgJAJgNgBQgNABgJgJgACLgIQgEAEAAAEQAAAGAEAEQADAFAGAAQAGAAAEgFQADgEAAgGQAAgEgDgEQgEgEgGAAQgGAAgDAEgAiFAWQgJgJAAgNQAAgLAJgIQAJgJANABQANgBAJAJQAJAIgBALQABANgJAJQgJAJgNgBQgNABgJgJgAh5gIQgDAEAAAEQAAAGAEAEQADAFAGAAQAGAAAEgFQADgEAAgGQAAgEgEgEQgDgEgGAAQgGAAgEAEgAkZATIANgNQAHAJAKAAQAMAAAAgJQAAgEgFgCIgMgEQgJgDgFgDQgHgHABgJQAAgNAKgGQAIgGAMAAQAQAAALAJIgNAOQgFgIgJABQgLgBAAAJQAAADADACIAJAEQALAEAGAEQAHAFABAJQgBANgIAHQgJAHgNgBQgSABgMgMgAD0AcIgMghIgLAhIgSAAIgTg2IATAAIAKAiIAAAAIAKgiIATAAIALAiIAKgiIATAAIgUA2gABTAcIghgyIABAyIgTAAIAAhNIAXAAIAfAxIAAAAIAAgxIASAAIAABNgAisAcIAAgcQAAgMgIABQgFAAgDADQgCADAAAFIAAAcIgSAAIAAhSIASAAIAAAkIAAAAQAGgJAKAAQALAAAFAHQAFAHAAAJIAAAgg");
	this.shape.setTransform(-0.5,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A5DAE3").s().p("Al/B1IAAjpIL/AAIAADpg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.4,-11.7,76.8,23.5);


(lib.bg_02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#79D0E9").s().p("A3bTiMAAAgnDMAu3AAAMAAAAnDg");
	this.shape.setTransform(150,125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,300.1,250);


(lib.bg_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0A385D").s().p("A3bTiMAAAgnDMAu3AAAMAAAAnDg");
	this.shape.setTransform(150,125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,300.1,250);


(lib.mc_cta = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{hi:20,bye:26});

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
	}
	this.frame_19 = function() {
		this.stop()
	}
	this.frame_25 = function() {
		this.stop()
	}
	this.frame_30 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(6).call(this.frame_25).wait(5).call(this.frame_30).wait(1));

	// btn_solid
	this.instance = new lib.btn_solid();
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({_off:false},0).to({alpha:1},5).to({alpha:0},5).wait(1).to({alpha:1},5).to({alpha:0},5).wait(1));

	// txt
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A5DAE3").s().p("AhEA3IAAhRIARAAIAAAHIABAAQAFgIANAAQALAAAIAJQAGAIABAKQAAAMgHAJQgIAJgMAAQgLAAgGgIIAAAhgAgvgIQgEAEABAEQgBAGAEAEQAEAFAFAAQAHAAADgFQAEgEAAgGQAAgEgEgEQgDgEgHAAQgFAAgEAEgAB+AWQgJgJAAgNQAAgLAJgIQAJgJANABQANgBAJAJQAJAIAAALQAAANgJAJQgJAJgNgBQgNABgJgJgACLgIQgEAEAAAEQAAAGAEAEQADAFAGAAQAGAAAEgFQADgEAAgGQAAgEgDgEQgEgEgGAAQgGAAgDAEgAiFAWQgJgJAAgNQAAgLAJgIQAJgJANABQANgBAJAJQAJAIgBALQABANgJAJQgJAJgNgBQgNABgJgJgAh5gIQgDAEAAAEQAAAGAEAEQADAFAGAAQAGAAAEgFQADgEAAgGQAAgEgEgEQgDgEgGAAQgGAAgEAEgAkZATIANgNQAHAJAKAAQAMAAAAgJQAAgEgFgCIgMgEQgJgDgFgDQgHgHABgJQAAgNAKgGQAIgGAMAAQAQAAALAJIgNAOQgFgIgJABQgLgBAAAJQAAADADACIAJAEQALAEAGAEQAHAFABAJQgBANgIAHQgJAHgNgBQgSABgMgMgAD0AcIgMghIgLAhIgSAAIgTg2IATAAIAKAiIAAAAIAKgiIATAAIALAiIAKgiIATAAIgUA2gABTAcIghgyIABAyIgTAAIAAhNIAXAAIAfAxIAAAAIAAgxIASAAIAABNgAisAcIAAgcQAAgMgIABQgFAAgDADQgCADAAAFIAAAcIgSAAIAAhSIASAAIAAAkIAAAAQAGgJAKAAQALAAAFAHQAFAHAAAJIAAAgg");
	this.shape.setTransform(-0.5,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(31));

	// button
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A5DAE3").s().p("Al/B1IAAjpIL/AAIAADpgAl1BrILrAAIAAjVIrrAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(31));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.4,-11.7,76.8,23.5);


// stage content:
(lib.marchApplianceRemodel_BBY_kitchenaid_MOBILE_300x250 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		if (window.devicePixelRatio > 1) {  
		  
		    var canvasWidth = canvas.width;  
		    var canvasHeight = canvas.height;  
		  
		  
		    canvas.width = canvasWidth * window.devicePixelRatio;  
		    canvas.height = canvasHeight * window.devicePixelRatio;  
		    canvas.style.width = canvasWidth+"px";  
		    canvas.style.height = canvasHeight+"px";  
		  
		    //console.log(window.devicePixelRatio);  
		     stage.scaleX=stage.scaleY=window.devicePixelRatio;  
		} 
		
		var tl=this;
		
		document.rollOverFunction = function() {
			 tl.mc_cta.gotoAndPlay("hi");
		}
		
		document.rollOutFunction = function() {
			 tl.mc_cta.gotoAndPlay("bye");
		}
		
		document.openLegal = function() {
			 tl.mc_legal.gotoAndPlay("hi");
		}
		
		document.closeLegal = function() {
			 tl.mc_legal.gotoAndPlay("bye");
		}
	}
	this.frame_194 = function() {
		this.mc_cta.gotoAndPlay(1);
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(194).call(this.frame_194).wait(1));

	// border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1,3,true).p("AXXzcMAAAAm5MgutAAAMAAAgm5g");
	this.shape.setTransform(150,125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(195));

	// logo_BestBuy
	this.instance = new lib.logo_BestBuy();
	this.instance.setTransform(276.2,19,0.651,0.651);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(195));

	// txt_legal
	this.instance_1 = new lib.g_legal();
	this.instance_1.setTransform(44.6,237.8);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(184).to({alpha:1},10).wait(1));

	// cta
	this.mc_cta = new lib.mc_cta();
	this.mc_cta.setTransform(55.7,193.1,0.98,0.98);
	this.mc_cta.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.mc_cta).wait(174).to({y:187.8,alpha:1},10,cjs.Ease.get(1)).wait(11));

	// g_logo_kitchenAid
	this.instance_2 = new lib.g_logo_kitchenAid();
	this.instance_2.setTransform(226.1,226);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(163).to({_off:false},0).to({alpha:1},11).wait(21));

	// g_end_sku
	this.instance_3 = new lib.g_end_sku();
	this.instance_3.setTransform(172.9,-177.9);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(153).to({_off:false},0).wait(1).to({regX:50.7,regY:-0.6,x:223.6},0).wait(1).to({y:-175.8},0).wait(1).to({y:-171.8},0).wait(1).to({y:-165.6},0).wait(1).to({y:-156.7},0).wait(1).to({y:-144.5},0).wait(1).to({y:-128.1},0).wait(1).to({y:-106.2},0).wait(1).to({y:-76.9},0).wait(1).to({y:-36},0).wait(1).to({y:25.7},0).wait(1).to({regX:0,regY:0,x:172.9,y:154.7},0).wait(30));

	// frame_06_txt_01
	this.instance_4 = new lib.frame_06_txt_01();
	this.instance_4.setTransform(111.8,-183.7);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(153).to({_off:false},0).wait(1).to({y:-183.2},0).wait(1).to({y:-181.5},0).wait(1).to({y:-178.2},0).wait(1).to({y:-173.1},0).wait(1).to({y:-165.7},0).wait(1).to({y:-155.5},0).wait(1).to({y:-141.9},0).wait(1).to({y:-123.8},0).wait(1).to({y:-99.4},0).wait(1).to({y:-65.5},0).wait(1).to({y:-14.2},0).wait(1).to({y:92.3},0).wait(30));

	// bg_01
	this.instance_5 = new lib.bg_01();
	this.instance_5.setTransform(150,-125.4,1,1,0,0,0,150,125);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(153).to({_off:false},0).wait(1).to({y:-124.9},0).wait(1).to({y:-123.4},0).wait(1).to({y:-120.4},0).wait(1).to({y:-115.7},0).wait(1).to({y:-109},0).wait(1).to({y:-99.8},0).wait(1).to({y:-87.5},0).wait(1).to({y:-71},0).wait(1).to({y:-48.9},0).wait(1).to({y:-18.1},0).wait(1).to({y:28.4},0).wait(1).to({y:125},0).wait(30));

	// frame_03_txt_01
	this.instance_6 = new lib.frame_03_txt_01();
	this.instance_6.setTransform(599.6,85.7);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(107).to({_off:false},0).wait(1).to({x:599.3},0).wait(1).to({x:597.7},0).wait(1).to({x:593.8},0).wait(1).to({x:586.7},0).wait(1).to({x:575.3},0).wait(1).to({x:558.6},0).wait(1).to({x:534.9},0).wait(1).to({x:502.1},0).wait(1).to({x:456.5},0).wait(1).to({x:391.8},0).wait(1).to({x:293.5},0).wait(1).to({x:107.4},0).wait(36).to({y:86.1},0).wait(1).to({y:87.1},0).wait(1).to({y:88.9},0).wait(1).to({y:91.8},0).wait(1).to({y:96},0).wait(1).to({y:102.1},0).wait(1).to({y:110.4},0).wait(1).to({y:122},0).wait(1).to({y:138.2},0).wait(1).to({y:162.2},0).wait(1).to({y:203.3},0).to({_off:true},1).wait(29));

	// g_range
	this.mc_2in1 = new lib.g_range();
	this.mc_2in1.setTransform(661.2,189.8);
	this.mc_2in1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_2in1).wait(107).to({_off:false},0).wait(1).to({regX:-61.2,regY:-11.1,x:599.8,y:178.7},0).wait(1).to({x:598.3},0).wait(1).to({x:594.7},0).wait(1).to({x:588.1},0).wait(1).to({x:577.5},0).wait(1).to({x:562},0).wait(1).to({x:540},0).wait(1).to({x:509.4},0).wait(1).to({x:467.1},0).wait(1).to({x:407.1},0).wait(1).to({x:316.5},0).wait(1).to({regX:0,regY:0,x:210.3,y:189.8},0).wait(35).to({regX:-61.2,regY:-11.1,x:149.1,y:179.1},0).wait(1).to({y:180.4},0).wait(1).to({y:182.6},0).wait(1).to({y:185.9},0).wait(1).to({y:190.4},0).wait(1).to({y:196.3},0).wait(1).to({y:203.9},0).wait(1).to({y:213.5},0).wait(1).to({y:225.8},0).wait(1).to({y:241.9},0).wait(1).to({y:263.7},0).wait(1).to({regX:0,regY:0,x:210.3,y:307.4},0).to({_off:true},1).wait(29));

	// g_logo_kitchenAid
	this.instance_7 = new lib.g_logo_kitchenAid();
	this.instance_7.setTransform(50,15.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(64).to({_off:false},0).to({alpha:1},8).wait(83).to({y:15.9},0).wait(1).to({y:16.7},0).wait(1).to({y:18.3},0).wait(1).to({y:20.9},0).wait(1).to({y:24.6},0).wait(1).to({y:29.8},0).wait(1).to({y:37},0).wait(1).to({y:47.1},0).wait(1).to({y:61.5},0).wait(1).to({y:84},0).wait(1).to({y:133.1},0).to({_off:true},1).wait(29));

	// bg_02
	this.instance_8 = new lib.bg_02();
	this.instance_8.setTransform(450,125,1,1,0,0,0,150,125);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(107).to({_off:false},0).wait(1).to({x:449.7},0).wait(1).to({x:448.5},0).wait(1).to({x:445.6},0).wait(1).to({x:440.6},0).wait(1).to({x:432.6},0).wait(1).to({x:421.1},0).wait(1).to({x:405},0).wait(1).to({x:382.9},0).wait(1).to({x:352.7},0).wait(1).to({x:310.7},0).wait(1).to({x:249.9},0).wait(1).to({x:150},0).to({_off:true},47).wait(29));

	// frame_02_txt_01
	this.instance_9 = new lib.frame_02_txt_01();
	this.instance_9.setTransform(206.2,527.8);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(52).to({_off:false},0).wait(1).to({y:527.2},0).wait(1).to({y:524.8},0).wait(1).to({y:520.2},0).wait(1).to({y:512.7},0).wait(1).to({y:501.8},0).wait(1).to({y:486.6},0).wait(1).to({y:465.9},0).wait(1).to({y:438.1},0).wait(1).to({y:400.4},0).wait(1).to({y:347.5},0).wait(1).to({y:267.2},0).wait(1).to({y:100.2},0).wait(44).to({x:205.9},0).wait(1).to({x:204.6},0).wait(1).to({x:202.1},0).wait(1).to({x:198},0).wait(1).to({x:192.1},0).wait(1).to({x:183.7},0).wait(1).to({x:172.4},0).wait(1).to({x:157.2},0).wait(1).to({x:136.9},0).wait(1).to({x:109},0).wait(1).to({x:68.7},0).wait(1).to({x:1.1},0).to({_off:true},1).wait(75));

	// g_kitchen_img
	this.instance_10 = new lib.g_kitchen_img();
	this.instance_10.setTransform(150,375.7);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(52).to({_off:false},0).wait(1).to({y:375.4},0).wait(1).to({y:374.3},0).wait(1).to({y:371.9},0).wait(1).to({y:367.8},0).wait(1).to({y:361.5},0).wait(1).to({y:352.5},0).wait(1).to({y:339.9},0).wait(1).to({y:322.8},0).wait(1).to({y:299.3},0).wait(1).to({y:266.3},0).wait(1).to({y:216.9},0).wait(1).to({y:125},0).wait(44).to({x:149.9},0).wait(1).to({x:149.4},0).wait(1).to({x:148.2},0).wait(1).to({x:146},0).wait(1).to({x:142.4},0).wait(1).to({x:137.1},0).wait(1).to({x:129.6},0).wait(1).to({x:119.3},0).wait(1).to({x:104.9},0).wait(1).to({x:84.6},0).wait(1).to({x:54.3},0).wait(1).to({x:0},0).to({_off:true},1).wait(75));

	// frame_01_txt_03
	this.instance_11 = new lib.frame_01_txt_03();
	this.instance_11.setTransform(92,183.2);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(22).to({_off:false},0).wait(31).to({y:183.1},0).wait(1).to({y:182.6},0).wait(1).to({y:181.4},0).wait(1).to({y:179.2},0).wait(1).to({y:175.9},0).wait(1).to({y:171.1},0).wait(1).to({y:164.4},0).wait(1).to({y:155.1},0).wait(1).to({y:142.4},0).wait(1).to({y:124.9},0).wait(1).to({y:99.4},0).wait(1).to({y:57.6},0).to({_off:true},1).wait(130));

	// frame_01_txt_02
	this.instance_12 = new lib.frame_01_txt_02();
	this.instance_12.setTransform(93.7,125.2);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(14).to({_off:false},0).wait(39).to({y:125.1},0).wait(1).to({y:124.6},0).wait(1).to({y:123.4},0).wait(1).to({y:121.2},0).wait(1).to({y:117.9},0).wait(1).to({y:113.1},0).wait(1).to({y:106.4},0).wait(1).to({y:97.1},0).wait(1).to({y:84.4},0).wait(1).to({y:66.9},0).wait(1).to({y:41.4},0).wait(1).to({y:-0.4},0).to({_off:true},1).wait(130));

	// frame_01_txt_01
	this.instance_13 = new lib.frame_01_txt_01();
	this.instance_13.setTransform(106.1,68);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(5).to({_off:false},0).wait(48).to({y:67.9},0).wait(1).to({y:67.4},0).wait(1).to({y:66.2},0).wait(1).to({y:64},0).wait(1).to({y:60.7},0).wait(1).to({y:55.9},0).wait(1).to({y:49.2},0).wait(1).to({y:39.9},0).wait(1).to({y:27.2},0).wait(1).to({y:9.7},0).wait(1).to({y:-15.8},0).wait(1).to({y:-57.6},0).to({_off:true},1).wait(130));

	// bg_01
	this.instance_14 = new lib.bg_01();
	this.instance_14.setTransform(150,125,1,1,0,0,0,150,125);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(64).to({_off:true},1).wait(130));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(149.5,124.5,301,251);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;