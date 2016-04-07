// All animation should be placed within the "init_animation" function as this function is called from within the plugin AFTER neccessary calls to DC/Sizmek are made.

	/************************************ Custom JS *****************************************/
	
function init_animation()
{		
	TweenMax.to($("#cover"), 0.8, {delay:0, opacity:0}) ;
	TweenMax.from($("#t1"), 0.45, {delay:0.8, x:"-300", opacity:0, ease:Power1.easeIn}) ;
	
	TweenMax.to($("#t1"), 0.45, {delay:2.2, x:"+300", opacity:0, ease:Power1.easeIn}) ;
	TweenMax.from($("#t2"), 0.45, {delay:2.2, x:"-300", opacity:0, ease:Power1.easeIn}) ;
	
	TweenMax.from($("#t3"), 0.45, {delay:4.2, x:"-300", opacity:0, ease:Power1.easeIn}) ;
	TweenMax.to($("#t2"), 0.45, {delay:4.2, x:"+300", opacity:0, ease:Power1.easeIn}) ;
	
	
	TweenMax.to($("#money1a"), 4.8, {delay:4.2, y:"+340", x:"-20", rotation:560, ease:Power1.easeOut}) ;
	TweenMax.to($("#money2b"), 4.8, {delay:4.2, y:"+330", x:"-100", rotation:260, ease:Power1.easeOut}) ;
	TweenMax.to($("#money3c"), 4, {delay:4.2, y:"+330", x:"-140", rotation:-960, ease:Power1.easeInOut}) ;
	TweenMax.to($("#money4d"), 4.4, {delay:4.2, y:"+330", x:"-110", rotation:960, ease:Power1.easeOut}) ;
	
	TweenMax.to($("#money1b"), 4.9, {delay:4.6, y:"+330", x:"-110", rotation:-560, ease:Power1.easeOut}) ;
	TweenMax.to($("#money2c"), 4.8, {delay:4.6, y:"+330", x:"-130", rotation:260, ease:Power1.easeOut}) ;
	TweenMax.to($("#money3d"), 4, {delay:4.6, y:"+330", x:"-10", rotation:460, ease:Power1.easeInOut}) ;
	TweenMax.to($("#money4a"), 4.3, {delay:4.6, y:"+330", x:"-40", rotation:1960, ease:Power1.easeOut}) ;
	
	TweenMax.to($("#money1c"), 4, {delay:5, y:"+330", x:"-120",rotation:-860, ease:Power1.easeInOut}) ;
	TweenMax.to($("#money2d"), 4.9, {delay:5, y:"+330", x:"-30",rotation:160, ease:Power1.easeOut}) ;
	TweenMax.to($("#money3a"), 4.9, {delay:5, y:"+330", x:"-160", rotation:460, ease:Power1.easeOut}) ;
	TweenMax.to($("#money4b"), 4.2, {delay:5, y:"+330", x:"-40", rotation:1260, ease:Power1.easeOut}) ;
	
	
	TweenMax.to($("#money1d"), 4.7, {delay:5.3, y:"+340", x:"-190", rotation:760, ease:Power1.easeOut}) ;
	TweenMax.to($("#money2a"), 4.8, {delay:5.1, y:"+340", x:"+120", rotation:960, ease:Power1.easeOut}) ;
	TweenMax.to($("#money3b"), 4.9, {delay:5, y:"+330", x:"-60", rotation:-1260, ease:Power1.easeOut}) ;
	TweenMax.to($("#money4c"), 4, {delay:5, y:"+330", x:"-120", rotation:160, ease:Power1.easeInOut}) ;
	
	TweenMax.from($("#moneypile"), 0.1, {delay:6.5, opacity:0, ease:Power1.easeIn}) ;
	
	TweenMax.from($("#legal"), 0.15, {delay:6.3, opacity:0, ease:Power1.easeIn}) ;
	TweenMax.from($("#t4"), 0.45, {delay:6.3, x:"-300", opacity:0, ease:Power1.easeIn}) ;
	TweenMax.to($("#t3"), 0.45, {delay:6.3, x:"+300", opacity:0, ease:Power1.easeIn}) ;
	
	TweenMax.from($("#t5"), 0.45, {delay:8.3, x:"-300", opacity:0, ease:Power1.easeIn}) ;
	TweenMax.to($("#t4"), 0.45, {delay:8.3, x:"+300", opacity:0, ease:Power1.easeIn}) ;
	
	
	
	
	TweenMax.from($("#bannerButton"), 0.25, {delay:8.6, opacity:0, x:"-30", ease:Power1.easeIn}) ;
	
}

