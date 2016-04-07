document.getElementById("bg-exit").addEventListener("click", myLink);
function myLink(){
	console.log("clickTag button");
	window.open(window.clickTag);
}

(window.onload = function(){
	var tl = new TimelineMax();
	 
	tl.to("#headline1", .5, {opacity:1, repeat:1, repeatDelay:2, yoyo:true}, "+=0.5") 
	tl.to("#logoLockup", 0.5, {opacity:1})
	tl.to("#img1", 0.5, {opacity:1}, "+=0.25")
	tl.to("#img2", 0.5, {opacity:1}, "+=0.25")
	tl.to("#img3", 0.5, {opacity:1}, "+=0.25")
	tl.to("#cta", 0.5, {opacity:1, onComplete:replayVisible}, "+=0.25");
	
	function replayVisible(){
		replayBtn.style.opacity ="1";
		replayBtn.style.visibility ="visible";
		console.log(tl.duration());
	}
		
	document.getElementById("replayBtn").addEventListener("click", replayClick);
	function replayClick(){
		tl.restart();
		replayBtn.style.visibility ="hidden";
	}
}());