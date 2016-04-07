(function(window)
{
	//Banner.inheritsFrom( window.Banner_Base );

	function Banner()
	{
		this.init();
	};

	Banner.prototype.init = function()
	{
		this.__allowHoverEffect = false;
		this.__width = 160;
		this.__height = 600;
		this.start();
	};

	Banner.prototype.render = function()
	{
		this.defineElements();
		this.positionElements();
		this.defineInteraction();
		this.run();
	};

	Banner.prototype.defineElements = function()
	{
		this.__container = $("#container");
		this.__border = $("#border");
		this.__banner = $("#banner");
		this.__content = $("#content");

		this.__BG = $("#BG"); 

		this.__iconSweater = $("#icon-sweater"); 
		this.__iconMug = $("#icon-mug"); 
		this.__iconPants = $("#icon-pants"); 
		this.__iconSnowGlobe = $("#icon-snowglobe"); 
		this.__iconCat = $("#icon-cat"); 

		this.__copy = $("#copy"); 
			this.__arrow01 = $("#arrow01"); 
			this.__arrow02 = $("#arrow02"); 
			this.__copy01 = $("#copy01"); 
			this.__copy02 = $("#copy02");

		this.__logoViator = $("#logo-viator");

		this.__cta = $("#cta"); 
			this.__ctaOff = $("#cta-off"); 
			this.__ctaHover = $("#cta-hover"); 

		this.__layoutGuide = $("#layout-guide");
		this.__bgExit = $("#bg-exit");
	};

	Banner.prototype.positionElements = function()
	{
		var w = this.__width
		var h = this.__height;
		var stroke = 1;

		this.__container.css({width:w, height:h});
		this.__banner.css({top:stroke, left:stroke, width:w-stroke*2, height:h-stroke*2});
		this.__border.css({top:0, left:0, width:w-stroke*2, height:h-stroke*2, opacity:1});
		this.__content.css({top:-stroke, left:-stroke, width:w, height:h});
		this.__layoutGuide.css({top:0, left:0, opacity:.18});
		this.__bgExit.css({top:0, left:0, width:w, height:h, opacity:0});

		this.__arrow01.css({top:-5000, left:0});
		this.__arrow02.css({top:-5000, left:0});

		this.allowHoverEffect();
	};

	//-------------------------------------------------------------------------

	Banner.prototype.run = function()
	{
		var banner = this;
		setTimeout(function(){banner.showSweater();}, 25);
	};

	//-------------------------------------------------------------------------

	Banner.prototype.showCopy = function( _copy, _delay, _offset )
	{
		_copy.css({top:0, left:-100, opacity:0, scale:1});
		animate(_delay, _copy, {left:-15+_offset, opacity:1}, 100, "linear");
		animate(_delay+100, _copy, {left:_offset}, 650, "easeOutQuart");
	};

	Banner.prototype.hideCopy = function( _copy, _delay, _offset )
	{
		animate(_delay, _copy, {left:_offset-5}, 175, "easeInOutQuart");
		animate(_delay+175, _copy, {left:200, opacity:0}, 250, "easeInQuint");
	};

	//-------------------------------------------------------------------------

	Banner.prototype.moveBG = function( _x, _delay )
	{
		var current = this.__BG.position();
		animate(_delay, this.__BG, {left:current.left + 6}, 200, "easeInOutQuad");
		animate(_delay+150, this.__BG, {left:_x + 5}, 700, "easeInOutQuart");
		animate(_delay+850, this.__BG, {left:_x}, 200, "easeOutQuad");
	};

	Banner.prototype.showIcon = function( _icon, _delay )
	{
		_icon.css({top:0, left:this.__width+75, opacity:1});
		animate(_delay, _icon, {left:-10}, 400, "easeInOutQuart");
		animate(_delay+400, _icon, {left:0}, 250, "easeInOutQuad");
	};

	Banner.prototype.hideIcon = function( _icon, _delay )
	{
		animate(_delay, _icon, {left:6}, 150, "easeInOutQuad");
		animate(_delay+150, _icon, {left:-this.__width-75}, 350, "easeInQuart");
	};

	//-------------------------------------------------------------------------

	Banner.prototype.showSweater = function()
	{
		var speed = 1500;

		this.__BG.css({top:-this.__height, left:-10, opacity:1, width:1711});
		animate(50, this.__BG, {top:0}, speed, "easeOutQuart");

		this.__iconSweater.css({top:-this.__height-150, left:0, opacity:1});
		animate(100, this.__iconSweater, {top:0}, speed, "easeOutQuart");

		this.__logoViator.css({top:0, left:0, opacity:0});
		animate(1100, this.__logoViator, {opacity:1}, 800, "easeOutQuad");

		this.showCTA();

		this.__sceneDelay = 2400;
		this.__delayBG = 150;
		this.__delayIconOut = 100;
		this.__delayIconIn = 600;

		var banner = this;
		setTimeout(function(){banner.showMug();}, 3000);
	};

	Banner.prototype.showCTA = function()
	{
		this.__ctaOff.css({top:0, left:0, opacity:1});
		this.__ctaHover.css({top:0, left:0, opacity:0});

		this.__cta.css({top:60, left:0, opacity:1});
		animate(1300, this.__cta, {top:-5}, 300, "easeOutQuad");
		animate(1600, this.__cta, {top:0}, 300, "easeInOutQuad");
	};

	Banner.prototype.bumpCTA = function( _delay )
	{
		animate(_delay, this.__cta, {left:6}, 100, "easeOutQuad");
		animate(_delay + 100, this.__cta, {left:0}, 200, "easeInOutQuad");
	};

	Banner.prototype.showMug = function()
	{
		this.moveBG(-193, this.__delayBG);

		this.hideIcon( this.__iconSweater, this.__delayIconOut );
		this.showIcon( this.__iconMug, this.__delayIconIn );

		var banner = this;
		setTimeout(function(){banner.showPants();}, this.__sceneDelay);
	};

	Banner.prototype.showPants = function()
	{
		this.moveBG(-434, this.__delayBG);

		this.hideIcon( this.__iconMug, this.__delayIconOut );
		this.showIcon( this.__iconPants, this.__delayIconIn );

		var banner = this;
		setTimeout(function(){banner.showSnowGlobe();}, this.__sceneDelay);
	};

	Banner.prototype.showSnowGlobe = function()
	{
		this.moveBG(-683, this.__delayBG);

		this.hideIcon( this.__iconPants, this.__delayIconOut );
		this.showIcon( this.__iconSnowGlobe, this.__delayIconIn );

		var banner = this;
		setTimeout(function(){banner.showCat();}, this.__sceneDelay);
	};

	Banner.prototype.showCat = function()
	{
		this.moveBG(-930, this.__delayBG);

		this.hideIcon( this.__iconSnowGlobe, this.__delayIconOut );
		this.showIcon( this.__iconCat, this.__delayIconIn );

		var banner = this;
		setTimeout(function(){banner.showCopy01();}, this.__sceneDelay + 300);
	};

	Banner.prototype.showCopy01 = function()
	{
		var speed = 750;
		animate(0, this.__BG, {left:-940, opacity:.3}, 750, "easeInOutQuad");
		animate(0, this.__iconCat, {left:-this.__width}, 750, "easeInOutQuad");
		//this.hideIcon( this.__iconCat, 0 );

		this.__copy01.css({top:0, left:0, opacity:1});
		this.__copy02.css({top:0, left:this.__width, opacity:1});

		this.__copy.css({top:0, left:this.__width, opacity:1, width:this.__width*2});
		animate(100, this.__copy, {left:10}, speed, "easeInQuart");
		animate(100 + speed, this.__copy, {left:0}, 550, "easeOutQuad");

		this.showArrow( this.__arrow01, 0, 0, speed+250);

		var banner = this;
		setTimeout(function(){banner.showCopy02();}, 4000);
	};

	Banner.prototype.showCopy02 = function()
	{
		var speed = 750;
		animate(0, this.__copy, {left:-this.__width+10}, speed, "easeInQuart");
		animate(speed, this.__copy, {left:-this.__width}, 550, "easeOutQuad");

		this.showArrow( this.__arrow02, this.__width, 0, speed+150);

		var banner = this;
		setTimeout(function(){banner.end();}, 1600);
	};

	Banner.prototype.showArrow = function( _arrow, _x, _y, _delay )
	{
		var offset = 50;
		_arrow.css({top:_y-offset, left:_x-offset, opacity:0});
		animate(_delay, _arrow, {top:_y+3, left:_x+3, opacity:1}, 350, "easeInOutQuart");
		animate(_delay+350, _arrow, {top:_y, left:_x}, 200, "easeInOutQuad");

		this.bumpCTA( _delay+300 );
	};

	//-------------------------------------------------------------------------

	Banner.prototype.start = function()
	{
		this.__start = new Date();
	};

	Banner.prototype.allowHoverEffect = function()
	{
		this.__allowHoverEffect = true;
	};

	Banner.prototype.end = function()
	{
		var now = new Date();
		var time = now.getTime() - this.__start.getTime();
		trace("total run time = " + time/1000 + " seconds");
	};

	//-------------------------------------------------------------------------

	Banner.prototype.defineInteraction = function()
	{
		var banner = this;
		this.__bgExit.click(function()
		{
			banner.clickThrough();
		});
		this.__bgExit.mouseover(function()
		{
			if(!banner.__allowHoverEffect)
			{
				return;
			}
			banner.onMouseOver();
		});
		this.__bgExit.mouseout(function()
		{
			if(!banner.__allowHoverEffect)
			{
				return;
			}
			banner.onMouseOut();
		});
	};

	Banner.prototype.onMouseOver = function()
	{
		//animate(0, this.__ctaOff, {opacity:0}, 150, "easeOutQuart");
		animate(0, this.__ctaHover, {opacity:1}, 150, "easeOutQuart");
	};

	Banner.prototype.onMouseOut = function()
	{
		//animate(50, this.__ctaOff, {opacity:1}, 150, "easeOutQuart");
		animate(50, this.__ctaHover, {opacity:0}, 150, "easeOutQuart");
	};

	Banner.prototype.clickThrough = function()
	{
		trace("click through: " + window.clickTag);
		//window.open(window.clickTag)

		var ID = "Background Exit";
		trace("exit with ID: '" + ID + "'");
		Enabler.exit(ID);
	};

	window.Banner = Banner;

}(window));

// Global functions
//-------------------------------------------------------------------------

function trace(s)
{
	//console.log(s);
}

function animate(_delay, _$o, _attr, _speed, _easing)
{
	_easing = _easing || 'easeInOutCubic';
	var to = setTimeout(function(){
		 _$o.transition(_attr, _speed, _easing);
		//_$o.transition(_attr, {duration: _speed, easing: _easing, queue: false}, null);
	}, _delay);
	return to;
};

function timeout( _delay, _func )
{
	var to = setTimeout(function(){_func();}, _delay);
	return to;
};

Function.prototype.inheritsFrom = function( superClass )
{
	this.prototype = new superClass;
	this.prototype.constructor = this;
	this.prototype.sooper = superClass.prototype;
	return this;
};