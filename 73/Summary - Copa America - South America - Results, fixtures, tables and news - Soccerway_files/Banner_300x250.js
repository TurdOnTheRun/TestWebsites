(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 300,
	height: 250,
	fps: 100,
	color: "#FFFFFF",
	manifest: [
		{src:"images/bg_300x250.jpg?1459241581151", id:"bg_300x250"},
		{src:"images/dus_logo_300x250.png?1459241581151", id:"dus_logo_300x250"},
		{src:"images/fonts_300x250.png?1459241581151", id:"fonts_300x250"},
		{src:"images/globus_300x250.png?1459241581151", id:"globus_300x250"},
		{src:"images/stewardess_300x250.png?1459241581151", id:"stewardess_300x250"}
	]
};



// symbols:



(lib.bg_300x250 = function() {
	this.initialize(img.bg_300x250);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.dus_logo_300x250 = function() {
	this.initialize(img.dus_logo_300x250);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,25);


(lib.fonts_300x250 = function() {
	this.initialize(img.fonts_300x250);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,400);


(lib.globus_300x250 = function() {
	this.initialize(img.globus_300x250);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,162);


(lib.stewardess_300x250 = function() {
	this.initialize(img.stewardess_300x250);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,242,152);


(lib.overlay = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/* stop();*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.infoButton_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("*", "bold 17px 'Chalet Airberlin HL-Bold'", "#CC1F2F");
	this.text.lineHeight = 19;
	this.text.setTransform(1.8,-25.3,1.458,1.458);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC1F2F").s().p("AgnDLIAAkgIBPAAIAAEggAghh7QgNgPAAgRQAAgTANgOQANgOAUgBQAWABAMAOQAMANAAASQAAAUgMAOQgNANgVAAQgUAAgNgNg");
	this.shape.setTransform(-2.5,0.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#D5213D").ss(1,1,1).p("AEDjSIAAGlQAAAegVAWQgWAVgeAAIlzAAQgeAAgVgVQgWgWAAgeIAAmlQAAgeAWgWQAVgVAeAAIFzAAQAeAAAWAVQAVAWAAAeg");
	this.shape_1.setTransform(0.1,0.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ai4EcQgeAAgXgVQgUgWAAgeIAAmlQAAgeAUgWQAXgVAeAAIFyAAQAdAAAXAVQAVAWgBAeIAAGlQABAegVAWQgXAVgdAAg");
	this.shape_2.setTransform(0.1,0.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgaCMIAAjGIA1AAIAADGgAgWhUQgJgKAAgMQAAgNAJgKQAJgKANABQAPgBAIAKQAJAKAAAMQAAANgJAKQgJAKgOAAQgNAAgJgKg");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ah+DDQgVAAgPgPQgOgPAAgVIAAkfQAAgVAOgPQAPgPAVAAID9AAQAVAAAPAPQAOAPAAAVIAAEfQAAAVgOAPQgPAPgVAAg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CC1F2F").s().p("AgaCMIAAjGIA1AAIAADGgAgWhUQgJgKAAgMQAAgNAJgKQAJgKANABQAPgBAIAKQAJAKAAAMQAAANgJAKQgJAKgOAAQgNAAgJgKg");
	this.shape_5.setTransform(0,0,1.04,1.04);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ah+DCQgVAAgPgOQgOgPAAgUIAAkgQAAgVAOgPQAPgPAVAAID9AAQAVAAAPAPQAOAPAAAVIAAEgQAAAUgOAPQgPAOgVAAg");
	this.shape_6.setTransform(0,0,1.04,1.04);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.text}]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.8,-29.2,53.8,58.9);


(lib.btn_ani = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AooCzIAAllIRRAAIAAFlg");
	mask.setTransform(80.6,14.5);

	// Ebene 4
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-70,-341);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(25.3,-3.4,110.7,36);


(lib.arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXAeIAcgeIgcgeIAAgTIAvAxIgvAxg");
	this.shape.setTransform(-2.1,5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.6,0,5,10);


(lib.weltkugel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.globus_300x250();
	this.instance.setTransform(-81,-81);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81,-81,162,162);


(lib.txt_zoom = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AvmB8IAAj3IfNAAIAAD3g");
	mask.setTransform(45,-2.3);

	// Ebene 2
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-55,-80);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55,-15.3,200,26);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 1
	this.instance = new lib.bg_300x250();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,300,250);


(lib.sternchentext = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 1
	this.text = new cjs.Text("*Roundtrip sample fare, incl. all taxes, for select departures, between April 11 – May 16, 2016 and for a surcharge also May 17 – October 24, 2016. One piece of checked baggage included. Other fees may apply.", "bold 12px 'Arial'", "#CC1F2F");
	this.text.lineHeight = 15;
	this.text.lineWidth = 248;
	this.text.setTransform(-29,82);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29,82,252,148);


(lib.SL_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AvmB8IAAj4IfOAAIAAD4g");
	mask.setTransform(25,29.6);

	// Ebene 2
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-75,-23);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75,15.8,209,26.2);


(lib.logo_p_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Logo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#534A43").s().p("AgFD4IAAnvIALAAIAAHvg");
	this.shape.setTransform(-56.3,75,2.723,2.723);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F8B43C").s().p("AjcAYIG5hfImHCOg");
	this.shape_1.setTransform(-171.1,52.1,2.723,2.723);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAAA5QgVAAgMgCQgSgDgMgHQgdgQgBgcQAAgJAEgJQAJgRASgKQAMgHAMgCIAKgCQAHgBAUAAIAvAAIgRAUIgDAAIAAAAIABgCIAAAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAgBAAIgnAAIgKABQgXAFgKAPQgGAKAAAIQAAAVAWALQAOAIAdAAIBSAAIAHgEIAFAAIgSAVgAAxAGIABgBIAAgBQgBAAAAgBQAAAAAAAAQgBgBAAAAQgBAAgBAAIhqAAIALgOIB1AAIgQASg");
	this.shape_2.setTransform(-172.3,80,2.723,2.723);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CA9721").s().p("Aigg8IFCh3IhdFng");
	this.shape_3.setTransform(-173.6,88.4,2.723,2.723);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FCC540").s().p("AALimIBFgZIifGAg");
	this.shape_4.setTransform(-132.7,84.9,2.723,2.723);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D67D1F").s().p("AiUhhIBDgWIDmDwg");
	this.shape_5.setTransform(-195.2,104.5,2.723,2.723);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FCC540").s().p("AgPgiIAwAuIhBAXg");
	this.shape_6.setTransform(-226.8,68.2,2.723,2.723);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Ebene 1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AnzGWQhThTAAh3QAAh1BThUQBThRB2AAQA4gBA0AWIBECvQAnBfAiA3IAUAhQgeBThJA0QhKA2hcAAQh2gBhThTgAEDHLQhrgVhWhuQhOhnhGjCQhgkBhChfQgdgrgZgaQgUgVgZgUQgagUgfgPQgogSgggBIAAgEIDiAAQAxABAxARQA4AUAqAnQAbAZAXAgQAUAbAUAiQAoBEApBkIBIC4IASAwQAvB3A7BYQBDBlBGAnIgVAXQhYgBhWgQgAFuEDQg2hZgziLQhdj9hFhjQgyhJgwgmQgXgUgcgNQgogUgiAAIAAgEIDeAAQAxABAxARQA2AUArAnQAbAZAYAgQAVAbATAiQAoBEAqBkIBIC4IASAwQANAjAOAdIgRBEQgWBag3BOQhCgyg5hhg");
	this.shape_7.setTransform(53.4,90.9,0.716,0.716);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CA2234").s().p("AjzPbQkLAAiXiXQiXiWA1jUIDsu4QA1jTDhiVQDhiVEIAAQEKABCXCWQCXCWg0DUIjbN0QgTgqgIgWIgTgwQg3iSgQgoQgqhlgohCQgUghgVgcQgXgfgbgZQgqgng4gUQgxgSgwAAIjeAAIAAAEQA7AABEA1QAtAlAyBJQBGBiBdD/QAzCKA2BaQA5BhBCAyQgOAUgWAbQhFgnhDhlQg7hYgvh3IgSgwIhIi6QgqhlglhCQgVghgUgcQgYgfgbgZQgqgng4gUQgxgSgxAAIjiAAIAAAEQAgAAAnATQAfAOAbAVQAZAVATATQAaAcAdApQBCBdBfEEQBHDCBOBmQBVBvBrAVQBWAQBZABQhxB8ioBJQipBLizAAIgFgBg");
	this.shape_8.setTransform(56.4,73.7,0.716,0.716);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CA2234").s().p("AhZBbQgmgmAAg1QAAg0AmglQAmgmAzAAQA0AAAmAmQAnAlgBA0QABA1gnAmQglAlg1AAQg0AAglglg");
	this.shape_9.setTransform(218.8,42.8,0.716,0.716);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CA2234").s().p("AhaBbQgmgmABg1QgBg0AmglQAmgmA0AAQA1AAAlAmQAnAlAAA0QAAA1gnAmQglAlg1AAQg0AAgmglg");
	this.shape_10.setTransform(524.2,42.8,0.716,0.716);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CA2234").s().p("AhyHYIAAuwIDlAAIAAOwg");
	this.shape_11.setTransform(218.7,91.2,0.716,0.716);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CA2234").s().p("AjyHiIAAopQAAhfAghOQAghOA9g4QA3gzBGgaQBHgaBSAAQAUAAAaACIAkADIAADTIg7gDQhfAAg0AyQgzAxAABfIAAIsg");
	this.shape_12.setTransform(255.5,90.5,0.716,0.716);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CA2234").s().p("AjyHiIAAopQAAhfAghOQAghOA9g4QBwhnCmAAQAUAAAaACIAkADIAADTIg7gDQhgAAg0AyQgyAyAABeIAAIsg");
	this.shape_13.setTransform(453.8,90.5,0.716,0.716);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CA2234").s().p("AhxHYIAAuwIDjAAIAAOwg");
	this.shape_14.setTransform(524.1,91.2,0.716,0.716);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CA2234").s().p("ADBHjIAAo5QAAhUg1gyQg0gzhXAAQhXAAg1AzQg1AyAABUIAAI5IjkAAIAAo0QAAixB2hxQB2hvC5AAQC5AAB1BvQB2BxAACxIAAI0g");
	this.shape_15.setTransform(573.6,90.4,0.716,0.716);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CA2234").s().p("AGZHjIAApWQAAhHgpgrQgpgshDAAQhDAAgpAsQgqArAABHIAAJWIjcAAIAApWQAAhHgogrQgpgshDAAQhEAAgpAsQgpArAABHIAAJWIjeAAIAApRQAAiiBphpQBphqCiABQBOAABDAdQBDAeAuA4QAug4BDgeQBDgdBQAAQChgBBpBqQBpBpAACiIAAJRg");
	this.shape_16.setTransform(823.1,90.4,0.716,0.716);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CA2234").s().p("AhYBaQgmgmAAg0QAAgzAmgmQAlglAzAAQA0AAAmAlQAlAmAAAzQAAA0glAmQglAlg1AAQgzAAglglg");
	this.shape_17.setTransform(620.5,115.9,0.716,0.716);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CA2234").s().p("AAEKEQg6gWgtgqQg0gwgbhGQgbhFAAhUIAAvOIDjAAIAAPJQAABNAnAlQAiAiA/AAIAwgCIAADVIglACIgiABQhGAAg9gWg");
	this.shape_18.setTransform(493.6,77.4,0.716,0.716);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CA2234").s().p("AjAJ/QhbglhHhFQhFhGgmhbQgmhbAAhlIAAtXIDhAAIAAHLQA7gtBIgZQBIgZBJABQBlAABbAkQBaAkBGBEQBGBEAmBbQAlBZAABmQAADQiQCQQiRCQjRAAQhlgBhcgkgAi9gSQhQBRABB1QAAA5AUA1QAVA0AoAoQAnApAxAVQAwAVA0AAQBwAABOhTQBPhSAAh4QAAh1hQhRQhPhThuAAQhuAAhQBTg");
	this.shape_19.setTransform(316.3,78.1,0.716,0.716);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#CA2234").s().p("AlgFfQiViPAAjPQAAjLCUiSQCTiRDOABQCtAACHBsQCIBrAoCsIAIAhIqrEPQAmAnA0AVQA0AVA4AAQCoAABOiHIAMgTIDsAAIgUA1Qg7CYh6BRQh6BSirAAQjUAAiTiPgAi3jMQhYBSAAB6IAAACIHWi5Qgngug1gZQg0gZg3AAQhoAAhPBLg");
	this.shape_20.setTransform(394.2,91.1,0.716,0.716);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CA2234").s().p("AlGFdQiLiQAAjMQAAjLCLiRQCLiRDCAAQCbAAB2BUQB3BWAyCRIARA1IjnAAIgMgWQggg+g5gjQg5gjhGAAQhmAAhKBTQhKBSAAByQAABzBKBRQBKBRBmABQBHAAA5gjQA4gjAgg+IALgWIDoAAIgRAzQgxCTh2BVQh2BWidAAQjCAAiLiRg");
	this.shape_21.setTransform(663.3,91.1,0.716,0.716);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CA2234").s().p("Ai3HJQhYgmhDhGQhBhFgkhaQgjhZAAhjQAAhhAjhbQAkhbBBhGQBDhHBYglQBXgmBgAAQDIAACJCQQCKCQAADPQAADPiKCPQiJCOjIAAQhgAAhXglgAixjEQhJBTAABzQAAByBJBRQBLBRBmAAQBpAABKhRQBLhRgBhyQABhzhLhTQhKhThpAAQhmAAhLBTg");
	this.shape_22.setTransform(736.5,91.2,0.716,0.716);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CA2234").s().p("AliFfQiRiPABjQQgBjOCRiQQCSiPDRAAQDSAACQCPQCQCQAADOIAAHZIjgAAIAAhOQg7AwhHAaQhIAZhKAAQjRAAiQiPgAi9jIQhQBUAAB0QAAB3BPBSQBOBSBxAAQBvAABQhTQBQhTAAh1QAAg3gWg0QgUg1gogpQgmgogxgVQgygWg0AAQhvAAhPBUg");
	this.shape_23.setTransform(164,91.2,0.716,0.716);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.8,3,1104.3,197.9);


(lib.linien2_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 11
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("ARHHjQAcA1gRAiQgxBcllhnQlnhonIjvQnKjskhjrQkjjqAxhcQAKgVAbgL");
	this.shape.setTransform(22.8,276.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Ebene 10
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(1,1,1).p("AzzlGQggg1APgpQAqh1GXA0QGWA1ISDAQIVC/FbDYQFZDagoB1");
	this.shape_1.setTransform(117.2,57.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Ebene 9
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(1,1,1).p("AV4ocQDVARAXBUQAYBbjOCFQguAeg5AfQg9AihJAjQnGDcqmC2QqkC2n4AiQn5AjgjiEQgahiDviS");
	this.shape_2.setTransform(97.3,262.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Ebene 8
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(1,1,1).p("A1RFNQiVhhCDhhQAyglBmguQAUgJCqhFQGTioJRhWQJPhXGyAuQGzAuAWCXQAMBTh0BW");
	this.shape_3.setTransform(69.2,55.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Ebene 2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(1,1,1).p("ApB34QDXk1BmgqQEyh9DzHRQD1HRAlMOQAmMNi/KCQi/KBkxB9QgaALgygCQg6gBgwgUQiGg3ARiY");
	this.shape_4.setTransform(78.3,167.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Ebene 7
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(1,1,1).p("AY8gUQBbBmgQBjQgRBkh4BEQhpA8i4AkQg7ALhCAJQoDBHqyh0Qq0h0nQjqQnQjoAjjWQALhAA1gz");
	this.shape_5.setTransform(77.2,185.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Ebene 6
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(1,1,1).p("AVgq0QDLAxAnB9QAZBQgxBeQgdA3g3A8QhcBkikBxQhHAvirBjQjEBxhFAZQh0AvitBAQjGBJhpAgQqcDQoIABQoHAAhBjQQgJgdABgg");
	this.shape_6.setTransform(78.3,152.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Ebene 12
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(1,1,1).p("AXoMHQA1CMgIA4QgpEQnkhnQnmhlqCmfQqFmgmqnkQmrnmApkPQADgYAYgfQAcglAngVQBog5BzBh");
	this.shape_7.setTransform(75.9,169.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Ebene 4
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFFFFF").ss(1,1,1).p("AGU5UQBug9BXAgQDMBNglIYQgQDrg5EFQgDAPg1C0Qg1C4gDAMQgIAXgtCOQgqCJgLAeQgQArgRAqQjzJykuGSQlEGujMhNQhmgmgqiZ");
	this.shape_8.setTransform(79.5,170.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// Ebene 3
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFFFFF").ss(1,1,1).p("AwdyWQgkldCehbQDPh4GkGEQB+B2BvBtQDZDZBKBoQB2CmC2FmQA6ByCOEmQBZDGBODVQBXDtAjCbQB/IujPB4QiBBLjRh5");
	this.shape_9.setTransform(60.4,173.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1));

	// vorlage
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(255,255,255,0)").ss(1,1,1).p("AINAAQAAK9ibHxQiZHwjZAAQjYAAianwQianxAAq9QAAq9CanwQCanwDYAAQDZAACZHwQCbHwAAK9g");
	this.shape_10.setTransform(-649.8,176.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-703.3,-24,965.5,383.4);


(lib.HL = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A3bC9IAAl5MAu3AAAIAAF5g");
	mask.setTransform(81,-73);

	// Ebene 2
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-69,-92);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69,-92,300,39.6);


(lib.flieger_vector_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgnCJIAwh7IhogDIgUAeIgUAAIASgpIgSgoIAUAAIAUAeIBogDIgwh7IAbAAIBMB4IASAAQAQAAANAEIAMAEQANAEAAAEQAAAEgNAFIgMAEQgNAEgQAAIgSAAIhMB4g");
	this.shape.setTransform(18.9,22.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.3,8.7,27.4,27.5);


(lib.flieger_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 2
	this.instance = new lib.stewardess_300x250();
	this.instance.setTransform(-44,482.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,482.2,242,152);


(lib.Destination_04 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AnzF2IAArrIPnAAIAALrg");
	mask.setTransform(0,0.5);

	// Ebene 2
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-149,-201);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-37,100,75);


(lib.Destination_03 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AnzF2IAArrIPnAAIAALrg");
	mask.setTransform(0,0.5);

	// Ebene 2
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-148.2,-126);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-37,100,75);


(lib.Destination_02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AnzF2IAArrIPnAAIAALrg");
	mask.setTransform(0,0.5);

	// Ebene 2
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-50,-201);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-37,100,75);


(lib.Destination_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AnzF2IAArrIPnAAIAALrg");
	mask.setTransform(0,0.5);

	// Ebene 2
	this.instance = new lib.fonts_300x250();
	this.instance.setTransform(-50,-126);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-37,100,75);


(lib.bg_Grey = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.bg_300x250, null, new cjs.Matrix2D(2.703,0,0,2.451,-405.4,-306.4)).s().p("A3bTiMAAAgnDMAu3AAAMAAAAnDg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-125,300,250);


(lib.__emptyButton = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99FF00").s().p("AjkDlIAAnKIHKAAIAAHKg");
	this.shape.setTransform(25,25,1.087,1.087);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.button_rot_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// arrow
	this.instance = new lib.arrow();
	this.instance.setTransform(55.9,0,1,1,0,0,0,2.5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(72).to({regX:-2.1,x:51.3,y:0.1},0).wait(3).to({x:51.4},0).wait(2).to({x:51.5},0).wait(1).to({x:51.6},0).wait(1).to({x:51.7},0).wait(1).to({x:51.8},0).wait(1).to({x:52},0).wait(1).to({x:52.1},0).wait(1).to({x:52.3},0).wait(1).to({x:52.5},0).wait(1).to({x:52.8},0).wait(1).to({x:53.1},0).wait(1).to({x:53.5},0).wait(1).to({x:53.9},0).wait(1).to({x:54.4},0).wait(1).to({x:54.9},0).wait(1).to({x:55.5},0).wait(1).to({x:56.1},0).wait(1).to({x:56.7},0).wait(1).to({x:57.3},0).wait(1).to({x:57.8},0).wait(1).to({x:58.3},0).wait(1).to({x:58.6},0).wait(1).to({x:58.9},0).wait(1).to({x:59.1},0).wait(1).to({x:59.2},0).wait(1).to({x:59.3},0).wait(2).to({regX:2.5,x:64},0).wait(1).to({regX:-2.1,x:59.3},0).wait(2).to({x:59.1},0).wait(1).to({x:59},0).wait(1).to({x:58.8},0).wait(1).to({x:58.6},0).wait(1).to({x:58.3},0).wait(1).to({x:58},0).wait(1).to({x:57.7},0).wait(1).to({x:57.3},0).wait(1).to({x:57},0).wait(1).to({x:56.6},0).wait(1).to({x:56.2},0).wait(1).to({x:55.8},0).wait(1).to({x:55.4},0).wait(1).to({x:55},0).wait(1).to({x:54.6},0).wait(1).to({x:54.3},0).wait(1).to({x:53.9},0).wait(1).to({x:53.6},0).wait(1).to({x:53.3},0).wait(1).to({x:53},0).wait(1).to({x:52.8},0).wait(1).to({x:52.6},0).wait(1).to({x:52.3},0).wait(1).to({x:52.2},0).wait(1).to({x:52},0).wait(1).to({x:51.9},0).wait(1).to({x:51.8},0).wait(1).to({x:51.7},0).wait(1).to({x:51.6},0).wait(1).to({x:51.5},0).wait(2).to({regX:2.5,x:56.1},0).wait(78));

	// Ebene 3
	this.instance_1 = new lib.btn_ani();
	this.instance_1.setTransform(0.6,0.1,1,1,0,0,0,68.6,15.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(81).to({regX:80.6,regY:14.5,x:12.7,y:-0.5},0).wait(3).to({x:12.8},0).wait(2).to({x:12.9},0).wait(1).to({x:13},0).wait(1).to({x:13.2},0).wait(1).to({x:13.4},0).wait(1).to({x:13.6},0).wait(1).to({x:13.8},0).wait(1).to({x:14.1},0).wait(1).to({x:14.5},0).wait(1).to({x:14.9},0).wait(1).to({x:15.5},0).wait(1).to({x:16},0).wait(1).to({x:16.6},0).wait(1).to({x:17.2},0).wait(1).to({x:17.7},0).wait(1).to({x:18.1},0).wait(1).to({x:18.4},0).wait(1).to({x:18.6},0).wait(1).to({x:18.7},0).wait(1).to({x:18.8},0).wait(1).to({regX:68.6,regY:15.1,x:6.8,y:0.1},0).wait(1).to({regX:80.6,regY:14.5,x:18.8,y:-0.5},0).wait(1).to({x:18.7},0).wait(1).to({x:18.6},0).wait(1).to({x:18.4},0).wait(1).to({x:18.2},0).wait(1).to({x:17.9},0).wait(1).to({x:17.5},0).wait(1).to({x:17},0).wait(1).to({x:16.5},0).wait(1).to({x:15.9},0).wait(1).to({x:15.4},0).wait(1).to({x:14.9},0).wait(1).to({x:14.5},0).wait(1).to({x:14.2},0).wait(1).to({x:13.9},0).wait(1).to({x:13.6},0).wait(1).to({x:13.4},0).wait(1).to({x:13.2},0).wait(1).to({x:13.1},0).wait(1).to({x:12.9},0).wait(1).to({x:12.8},0).wait(2).to({x:12.7},0).wait(3).to({regX:68.6,regY:15.1,x:0.6,y:0.1},0).wait(84));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138,-356,300,400);


(lib.SL_02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/* Bei diesem Bild stoppen
		Die Zeitleiste stoppt/pausiert bei dem Bild, in das Sie diesen Code einfügen.
		Kann auch zum Stoppen/Anhalten von Movieclip-Zeitleisten verwendet werden.
		*/
		
		this.stop();
	}
	this.frame_119 = function() {
		/* Bei diesem Bild stoppen
		Die Zeitleiste stoppt/pausiert bei dem Bild, in das Sie diesen Code einfügen.
		Kann auch zum Stoppen/Anhalten von Movieclip-Zeitleisten verwendet werden.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(119).call(this.frame_119).wait(1));

	// Layer 2
	this.instance = new lib.txt_zoom();
	this.instance.setTransform(-20,38);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:44,regY:-1,scaleX:1.1,scaleY:1.1,x:25.6,y:37},59,cjs.Ease.get(1)).to({regX:0,regY:0,scaleX:1,scaleY:1,x:-20,y:38},59,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75,-42,300,400);


(lib.logos = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// airberlin_logo
	this.instance = new lib.logo_p_mc();
	this.instance.setTransform(77.2,-0.8,0.15,0.15,0,0,0,435,68.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.5,-10.6,165.7,21.2);


(lib.flieger_ani_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Ebene 13
	this.instance = new lib.flieger_vector_mc();
	this.instance.setTransform(387.5,321.5,0.22,0.22,-94.5,0,0,18.9,22.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({_off:false},0).to({regY:23,scaleX:1,scaleY:1,rotation:-107.8,guide:{path:[387.4,321.5,386.8,308.2,382.7,290.5,382.4,288.9,382,287.2]}},40).to({scaleX:1,scaleY:1,rotation:-135.1,guide:{path:[381.9,287.2,378.3,272.5,370.5,251.3,362.7,229.9,353.8,210.1,340.8,183.1,334.2,170.1,316.2,135.1,303.2,116.3,295.5,106.9,274,85.2,257.1,68,250.8,62.2,240.6,52.7,231.6,46.3]}},425).to({regY:22.9,scaleX:0.1,scaleY:0.1,rotation:-173,guide:{path:[231.7,46.1,216.4,35.1,204.8,32.9]}},41).to({_off:true},1).wait(201));

	// Ebene 11
	this.instance_1 = new lib.flieger_vector_mc();
	this.instance_1.setTransform(145.2,235.5,0.057,0.056,42.1,0,0,19.4,23.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(156).to({_off:false},0).to({regX:18.9,regY:22.9,scaleX:1,scaleY:1,rotation:22.3,guide:{path:[145.1,235.4,151.3,239.9,161.9,242.4]}},40).to({scaleX:1,scaleY:1,rotation:-1,guide:{path:[161.9,242.5,175.2,245.6,195.5,245.6,199.3,245.6,203.1,245.5]}},62).to({scaleX:1,scaleY:1,rotation:-16,guide:{path:[203.1,245.5,251.7,244,312.8,225.2]}},189).to({rotation:-45.9,guide:{path:[312.9,225.2,313.7,225,314.6,224.7,326.5,221,348.6,212.8,371.6,204.2,381.7,199.5,387.7,196.7,403.6,187.4,418.6,178.5,424.4,174.5,435.6,166.9,443.4,159.8]}},222).to({regY:23.2,scaleX:0.33,scaleY:0.33,rotation:-49.9,guide:{path:[443.3,159.8,447,156.4,450,153.2,453.2,149.7,455.5,146.4]}},47).to({_off:true},1).wait(11));

	// Ebene 9
	this.instance_2 = new lib.flieger_vector_mc();
	this.instance_2.setTransform(350.6,28.5,0.11,0.11,-5,0,0,19,22.7);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(27).to({_off:false},0).to({regX:19.1,regY:23,scaleX:1,scaleY:1,rotation:69.2,guide:{path:[350.5,28.4,355.9,27.4,360.7,29.2,368.9,32.3,373.2,43]}},75).to({regY:23.1,scaleX:1,scaleY:1,rotation:94,guide:{path:[373.2,43,378.6,56.3,377.8,81.3]}},53).to({regY:22.9,rotation:104,guide:{path:[377.8,81.3,377.7,85.7,377.4,90.5,375.8,113.9,370.1,140.1,369.9,140.8,367.9,147.9]}},101).to({regY:23.1,rotation:115,guide:{path:[367.9,147.9,366,154.6,362.4,167,362.3,167.6,362.1,168.1,360.5,173.9,359.1,178.5,354.3,195.2,354.1,196.1,351.3,204.3,348.2,212.6,347.6,214.2,347,215.8]}},73).to({scaleX:1,scaleY:1,rotation:123,guide:{path:[347,215.8,346,218.5,345,221.1,339.8,234.6,334.2,247.1,321.3,276.2,306.7,299.7,306.3,300.4,305.9,301]}},159).to({regX:18.9,regY:22.9,scaleX:1,scaleY:1,rotation:153.2,guide:{path:[305.9,301,298.3,313.2,290.2,323.8,271.8,348.3,257.2,356.4]}},104).to({regX:19.2,regY:22.6,scaleX:0.06,scaleY:0.06,rotation:230,guide:{path:[257.1,356.4,246.1,362.5,237.4,359.2,232.4,357.4,228.9,352.8]}},49).to({_off:true},1).wait(86));

	// Ebene 7
	this.instance_3 = new lib.flieger_vector_mc();
	this.instance_3.setTransform(455.9,112.8,0.549,0.549,-145,0,0,18.7,22.9);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(403).to({_off:false},0).to({scaleX:1,scaleY:1,rotation:-175,guide:{path:[455.8,112.7,448.4,106.1,435.7,98.1,401,76.3,347.7,57.2,294.4,38.2,253.8,32.9,246.5,32,240.4,31.6]}},269).to({regX:18.2,scaleX:0.08,scaleY:0.08,rotation:-189.8,guide:{path:[240.5,31.4,225.5,30.4,217.6,32.7]}},50).to({_off:true},1).wait(5));

	// Ebene 5
	this.instance_4 = new lib.flieger_vector_mc();
	this.instance_4.setTransform(462.3,264.5,0.48,0.48,150.2,0,0,18.9,23);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(110).to({_off:false},0).to({regX:18.8,regY:23.1,scaleX:1,scaleY:1,rotation:187,guide:{path:[462.3,264.4,452.9,270.5,438.7,277.4,396.2,298.2,334.2,315.4,329.9,316.6,325.4,317.8,315.9,320.3,306.7,322.6,258,334.6,219.2,338.5]}},256).to({regX:19.2,regY:23.4,scaleX:0.06,scaleY:0.06,rotation:15.1,guide:{path:[218.9,338.5,212.9,339.1,207.2,339.5,178.4,341.5,164.9,338]}},80).to({_off:true},1).wait(281));

	// Ebene 2
	this.instance_5 = new lib.flieger_vector_mc();
	this.instance_5.setTransform(145.6,198.6,0.429,0.429,29.9,0,0,19,23.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:19.1,regY:23.2,scaleX:1,scaleY:0.99,rotation:2.5,guide:{path:[145.7,198.4,156,207.2,173.9,216.2,220.3,239.6,289.5,251.2,291.6,251.6,293.7,251.9]}},198).to({regX:18.9,regY:23.1,scaleX:0.43,scaleY:0.42,rotation:-22,guide:{path:[293.6,251.9,300.2,253,306.7,253.9,320.8,255.8,334.2,256.9,376.1,260.5,410.2,255.8,443.4,251.3,456.7,240.8]}},169).to({_off:true},1).wait(360));

	// Ebene 1
	this.instance_6 = new lib.linien2_mc();
	this.instance_6.setTransform(303.6,192.7,1,1,0,0,0,82.5,169);
	this.instance_6.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(728));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-484.7,-2.8,973,391);


(lib.ani_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{go:0});

	// timeline functions:
	this.frame_140 = function() {
		/* Movieclip abspielen
		Spielt den angegebenen Movieclip auf der Bühne ab.
		
		Anweisungen:
		1. Verwenden Sie diesen Code für Movieclips, die zurzeit angehalten sind.
		*/
		
		//this.zoom.play();
	}
	this.frame_751 = function() {
		if(!this.alreadyExecuted){
			this.alreadyExecuted=true;
			this.loopNum=1;
		} else {
			this.loopNum++;
			if(this.loopNum==3){
				this.stop();
				this.cta.stop();
				this.flieger.stop();
			}
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(140).call(this.frame_140).wait(611).call(this.frame_751).wait(110));

	// stewardess
	this.instance = new lib.flieger_mc();
	this.instance.setTransform(414.2,-463.9,1,1,0,0,0,129.5,45);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:142.2},59).wait(738).to({regX:77,regY:558.2,x:89.7,y:49.3,alpha:0.999},0).wait(1).to({alpha:0.997},0).wait(1).to({alpha:0.993},0).wait(1).to({alpha:0.988},0).wait(1).to({alpha:0.981},0).wait(1).to({alpha:0.972},0).wait(1).to({alpha:0.962},0).wait(1).to({alpha:0.949},0).wait(1).to({alpha:0.935},0).wait(1).to({alpha:0.919},0).wait(1).to({alpha:0.901},0).wait(1).to({alpha:0.881},0).wait(1).to({alpha:0.859},0).wait(1).to({alpha:0.836},0).wait(1).to({alpha:0.81},0).wait(1).to({alpha:0.782},0).wait(1).to({alpha:0.752},0).wait(1).to({alpha:0.72},0).wait(1).to({alpha:0.687},0).wait(1).to({alpha:0.652},0).wait(1).to({alpha:0.616},0).wait(1).to({alpha:0.579},0).wait(1).to({alpha:0.54},0).wait(1).to({alpha:0.501},0).wait(1).to({alpha:0.462},0).wait(1).to({alpha:0.423},0).wait(1).to({alpha:0.384},0).wait(1).to({alpha:0.346},0).wait(1).to({alpha:0.308},0).wait(1).to({alpha:0.272},0).wait(1).to({alpha:0.238},0).wait(1).to({alpha:0.205},0).wait(1).to({alpha:0.175},0).wait(1).to({alpha:0.146},0).wait(1).to({alpha:0.12},0).wait(1).to({alpha:0.097},0).wait(1).to({alpha:0.076},0).wait(1).to({alpha:0.058},0).wait(1).to({alpha:0.042},0).wait(1).to({alpha:0.029},0).wait(1).to({alpha:0.018},0).wait(1).to({alpha:0.01},0).wait(1).to({alpha:0.004},0).wait(1).to({alpha:0.001},0).wait(1).to({regX:129.5,regY:45,x:142.2,y:-463.9,alpha:0},0).wait(20));

	// Aircrafts_ani
	this.flieger = new lib.flieger_ani_mc();
	this.flieger.setTransform(135.3,28.8,0.5,0.5,0,0,0,241.3,192.7);

	this.timeline.addTween(cjs.Tween.get(this.flieger).wait(240).to({x:35.3},61,cjs.Ease.get(1)).wait(496).to({regX:0.5,regY:191.3,x:-85,y:28.1},0).wait(1).to({x:-84.8},0).wait(1).to({x:-84.4},0).wait(1).to({x:-83.8},0).wait(1).to({x:-83.1},0).wait(1).to({x:-82.1},0).wait(1).to({x:-81},0).wait(1).to({x:-79.6},0).wait(1).to({x:-78},0).wait(1).to({x:-76.2},0).wait(1).to({x:-74.1},0).wait(1).to({x:-71.7},0).wait(1).to({x:-69.1},0).wait(1).to({x:-66.2},0).wait(1).to({x:-63},0).wait(1).to({x:-59.6},0).wait(1).to({x:-55.9},0).wait(1).to({x:-52},0).wait(1).to({x:-47.8},0).wait(1).to({x:-43.6},0).wait(1).to({x:-39.2},0).wait(1).to({x:-34.8},0).wait(1).to({x:-30.4},0).wait(1).to({x:-26.1},0).wait(1).to({x:-22},0).wait(1).to({x:-18},0).wait(1).to({x:-14.2},0).wait(1).to({x:-10.6},0).wait(1).to({x:-7.3},0).wait(1).to({x:-4.2},0).wait(1).to({x:-1.4},0).wait(1).to({x:1.1},0).wait(1).to({x:3.3},0).wait(1).to({x:5.4},0).wait(1).to({x:7.2},0).wait(1).to({x:8.8},0).wait(1).to({x:10.2},0).wait(1).to({x:11.4},0).wait(1).to({x:12.4},0).wait(1).to({x:13.2},0).wait(1).to({x:13.8},0).wait(1).to({x:14.3},0).wait(1).to({x:14.6},0).wait(1).to({x:14.8},0).wait(1).to({regX:241.3,regY:192.7,x:135.3,y:28.8},0).wait(20));

	// Globus_ani
	this.instance_1 = new lib.weltkugel();
	this.instance_1.setTransform(165,25);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(240).to({x:65},61,cjs.Ease.get(1)).wait(496).to({x:65.1},0).wait(1).to({x:65.2},0).wait(1).to({x:65.5},0).wait(1).to({x:65.9},0).wait(1).to({x:66.5},0).wait(1).to({x:67.2},0).wait(1).to({x:68.1},0).wait(1).to({x:69.1},0).wait(1).to({x:70.2},0).wait(1).to({x:71.6},0).wait(1).to({x:73.1},0).wait(1).to({x:74.8},0).wait(1).to({x:76.7},0).wait(1).to({x:78.8},0).wait(1).to({x:81.2},0).wait(1).to({x:83.7},0).wait(1).to({x:86.5},0).wait(1).to({x:89.5},0).wait(1).to({x:92.7},0).wait(1).to({x:96.1},0).wait(1).to({x:99.8},0).wait(1).to({x:103.6},0).wait(1).to({x:107.6},0).wait(1).to({x:111.8},0).wait(1).to({x:116},0).wait(1).to({x:120.3},0).wait(1).to({x:124.6},0).wait(1).to({x:128.8},0).wait(1).to({x:133},0).wait(1).to({x:136.9},0).wait(1).to({x:140.7},0).wait(1).to({x:144.2},0).wait(1).to({x:147.5},0).wait(1).to({x:150.5},0).wait(1).to({x:153.2},0).wait(1).to({x:155.6},0).wait(1).to({x:157.7},0).wait(1).to({x:159.5},0).wait(1).to({x:161},0).wait(1).to({x:162.3},0).wait(1).to({x:163.3},0).wait(1).to({x:164.1},0).wait(1).to({x:164.6},0).wait(1).to({x:164.9},0).wait(1).to({x:165},0).wait(20));

	// Einbelder
	this.instance_2 = new lib.bg_Grey();
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(796).to({_off:false},0).to({alpha:1},45,cjs.Ease.get(1)).wait(20));

	// SL_02
	this.zoom = new lib.SL_02();
	this.zoom.setTransform(-240,-32);
	this.zoom._off = true;

	this.timeline.addTween(cjs.Tween.get(this.zoom).wait(100).to({_off:false},0).to({x:-75},40,cjs.Ease.get(1)).wait(100).to({x:70,alpha:0},61,cjs.Ease.get(1)).to({_off:true},1).wait(559));

	// SL_01
	this.instance_3 = new lib.SL_01();
	this.instance_3.setTransform(-309,-50);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(59).to({_off:false},0).to({x:-75},41,cjs.Ease.get(1)).wait(140).to({x:70,alpha:0},61,cjs.Ease.get(1)).to({_off:true},1).wait(559));

	// HL
	this.instance_4 = new lib.HL();
	this.instance_4.setTransform(1.3,-60.4,1.5,1.5,0,0,0,82,-65);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleX:1,scaleY:1,x:1,y:-60,alpha:1},59,cjs.Ease.get(1)).wait(181).to({x:1.3,y:-60.4},0).to({alpha:0},61,cjs.Ease.get(1)).to({_off:true},1).wait(559));

	// CTA
	this.cta = new lib.button_rot_mc();
	this.cta.setTransform(-78.2,91.3,0.045,0.044,0,0,0,10,0);
	this.cta._off = true;

	this.timeline.addTween(cjs.Tween.get(this.cta).wait(379).to({_off:false},0).to({regX:10.6,scaleX:0.95,scaleY:0.95,x:-91.9,y:92},31,cjs.Ease.get(1)).wait(451));

	// Destination_04
	this.instance_5 = new lib.Destination_04();
	this.instance_5.setTransform(-269.4,36);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(580).to({_off:false},0).to({x:-80},40,cjs.Ease.get(1)).wait(131).to({x:-269.4},30,cjs.Ease.get(1)).to({_off:true},1).wait(79));

	// Destination_03
	this.instance_6 = new lib.Destination_03();
	this.instance_6.setTransform(-269,-39);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(541).to({_off:false},0).to({x:-80},39,cjs.Ease.get(1)).wait(171).to({x:-269},30,cjs.Ease.get(1)).to({_off:true},1).wait(79));

	// Destination_02
	this.instance_7 = new lib.Destination_02();
	this.instance_7.setTransform(-269.4,36);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(340).to({_off:false},0).to({x:-80},40,cjs.Ease.get(1)).wait(131).to({x:-269.4},30,cjs.Ease.get(1)).to({_off:true},1).wait(319));

	// Destination_01
	this.instance_8 = new lib.Destination_01();
	this.instance_8.setTransform(-269,-39);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(301).to({_off:false},0).to({x:-80},39,cjs.Ease.get(1)).wait(171).to({x:-269},30,cjs.Ease.get(1)).to({_off:true},1).wait(319));

	// bg_Grey
	this.instance_9 = new lib.bg_Grey();

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(861));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-229.2,-125,721.8,632.1);


// stage content:
(lib.Banner_300x250 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		//
		///* Klicken, um ein Objekt auszublenden
		//Durch Klicken auf die angegebene Symbolinstanz wird sie ausgeblendet.
		//
		//Anweisungen:
		//1. Verwenden Sie diesen Code für Objekte, die zurzeit sichtbar sind.
		//*/
		//
		//infoButton_btn.addEventListener(MouseEvent.ROLL_OVER, fl_ClickToHide);
		//
		//function fl_ClickToShow(event:MouseEvent):void
		//{
		//	overlay.play();
		//	trace("d");
		//}
		//
		//infoButton_btn.addEventListener(MouseEvent.ROLL_OUT, fl_ClickToHide);
		//
		//function fl_ClickToHide(event:MouseEvent):void
		//{
		//	overlay.play();
		//	
		//}
		
		/* Movieclip einblenden
		Blendet die Symbolinstanz ein, indem ihre alpha-Eigenschaft in einem Tick-Ereignis erhöht wird, bis sie vollständig sichtbar ist.
		
		Anweisungen:
		1. Um die Geschwindigkeit zu ändern, mit der die Symbolinstanz eingeblendet wird, ändern Sie den Wert 0,01 unten (der Wert muss größer als 0 und kleiner oder gleich 1 sein). Höhere Werte führen zu einer schnelleren Einblendung.
		2. Da die Animation ein Tick-Ereignis verwendet, wird sie nur fortgesetzt, wenn sich der Abspielkopf in ein neues Bild bewegt. Die Geschwindigkeit der Animation wird auch von der Bildrate des Dokuments beeinflusst.
		*/
		this.stop();
		this.infoButton_btn.addEventListener('mouseover', fl_FadeSymbolIn.bind(this));
		this.overlay.alpha = 0;
		
		function fl_FadeSymbolIn()
		{
			     this.play();    
		
		}
		
		
		
		this.btn.addEventListener("click", fl_MouseClickHandler.bind(this));
		
		function fl_MouseClickHandler()
		{
			// Beginn des benutzerdefinierten Codes
			// Dieser Beispielcode zeigt die Wörter "Mausklick erfolgt" im Bedienfeld "Ausgabe" an.
			window.open(window.clickTag, "_blank");
			// Ende des benutzerdefinierten Codes
		}
	}
	this.frame_4 = function() {
		this.stop();
		this.infoButton_btn.addEventListener('mouseout', fl_FadeSymbolOut.bind(this));
		this.overlay.alpha = 0;
		
		function fl_FadeSymbolOut()
		{
			     this.gotoAndStop(0); 
		
		}
		
		/* Klicken, um zum Bild zu gehen und zu stoppen
		Durch Klicken auf die angegebene Symbolinstanz wird der Abspielkopf auf das angegebene Bild in der Zeitleiste verschoben und hält den Film an.
		Kann in der Hauptzeitleiste oder in Movieclip-Zeitleisten verwendet werden.
		
		Anweisungen:
		1. Ersetzen Sie die Nummer 5 im Code unten durch die Nummer des Bildes, zu dem der Abspielkopf verschoben werden soll, wenn auf die Symbolinstanz geklickt wird.
		2.Bildnummern in EaselJS beginnen bei 0 anstelle von 1
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1));

	// Border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("A3bzhMAu3AAAMAAAAnDMgu3AAAg");
	this.shape.setTransform(150,125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(5));

	// info
	this.infoButton_btn = new lib.infoButton_btn();
	this.infoButton_btn.setTransform(283,234,0.328,0.328);
	new cjs.ButtonHelper(this.infoButton_btn, 0, 1, 2, false, new lib.infoButton_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.infoButton_btn).wait(5));

	// btn
	this.btn = new lib.__emptyButton();
	this.btn.setTransform(0,0,6,5);
	new cjs.ButtonHelper(this.btn, 0, 1, 2, false, new lib.__emptyButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btn).wait(5));

	// Sternchentext
	this.instance = new lib.sternchentext();
	this.instance.setTransform(52.5,-46.5,1,1,0,0,0,1.5,1.4);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},4).wait(1));

	// overlay
	this.instance_1 = new lib.Symbol1("synched",0);
	this.instance_1.setTransform(150,124.3,1,1,0,0,0,150,125);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:125,alpha:1},4).wait(1));

	// Maske (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A3bTiMAAAgnDMAu2AAAMAAAAnDg");
	mask.setTransform(150,125);

	// Logo DUS
	this.instance_2 = new lib.dus_logo_300x250();
	this.instance_2.setTransform(-3,10);

	this.instance_2.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},1).wait(4));

	// Logos
	this.instance_3 = new lib.logos();
	this.instance_3.setTransform(144.1,21.1,1.05,1.05);

	this.instance_3.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},1).wait(4));

	// overlay
	this.overlay = new lib.overlay();
	this.overlay.setTransform(118,-189.9);

	this.overlay.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.overlay).to({_off:true},1).wait(4));

	// container
	this.instance_4 = new lib.ani_mc();
	this.instance_4.setTransform(150,125);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(70.8,124,716.9,630.1);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;