// 160x600

var tl = new TimelineLite();

function getID(ID){
	return document.getElementById(ID);
}

function initGsap()
{
	tl.to(getID('logo'), 0, {display:'block'});
	tl.to(getID('greenCircle'), 0, {display:'block', opacity:0, scale:.25});
	tl.to(getID('arrowCircle'), 0, {display:'block', opacity:0, scale:.75});
	tl.to(getID('arrow1'), 0, {display:'block', left:-300});
	tl.to(getID('arrow2'), 0, {display:'block', left:-300});
	tl.to(getID('arrow3'), 0, {display:'block', left:-300});
	tl.to(getID('arrow4'), 0, {display:'block', left:-300});
	tl.to(getID('arrowCTA'), 0, {display:'block', left:-300});
	//tl.to(getID('arrowCTA2'), 0, {display:'block', left:-450, scale:.85});

	
	//Frame 1
	tl.to(getID('greenCircle'), .35, {ease: Power2.easeOut, opacity:1, scale:1}, "+=1");
	tl.to(getID('arrowCircle'), 5, {ease: Power0.easeNone, opacity:1, scale:1}, "+=1");
	tl.to(getID('arrowCircle'), 7, {ease: Power0.easeNone, rotation:360}, "-=5");
	
	//Frame 2
	tl.to(getID('greenCircle'), 1, {opacity:0}, "-=.5");
	tl.to(getID('arrowCircle'), 1, {opacity:0, rotation:"+=30"}, "-=1");
	
	//Frame 3
	tl.to(getID('arrow1'), .4, {ease: Power2.easeOut, left:0}, "-=1");
	tl.to(getID('arrow2'), .4, {ease: Power2.easeOut, left:0}, "-=.75");
	tl.to(getID('arrow3'), .4, {ease: Power2.easeOut, left:0}, "-=.5");
	tl.to(getID('arrow4'), .4, {ease: Power2.easeOut, left:0}, "-=.25");
	tl.to(getID('arrowCTA'), .3, {ease: Power2.easeOut, left:0}, "+=.25");
	tl.to(getID('arrowCTA'), .3, {ease: Power2.easeOut, scale:1.25}, "+=.5");
	tl.to(getID('arrowCTA'), .3, {ease: Power2.easeOut, scale:1});
	
	//tl.to(getID('arrowCTA2'), .3, {ease: Power2.easeOut, left:-148}, "+=.25");
	//tl.to(getID('arrowCTA2'), .3, {ease: Power2.easeOut, scale:1}, "+=.5");
	//tl.to(getID('arrowCTA2'), .3, {ease: Power2.easeOut, scale:.85});
	
	
}