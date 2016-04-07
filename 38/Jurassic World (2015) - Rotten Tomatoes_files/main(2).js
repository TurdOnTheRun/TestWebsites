// JavaScript Document
document.getElementById("bg-exit").addEventListener("click", myLink);
function myLink(){
	console.log("clickTag button");
	window.open(window.clickTag);
}

(window.onload = function(){
	var tl = new TimelineMax({onComplete:replayVisible});
	
	tl.to("#headline1", .5, {opacity:1}) 
	  .to(["#img", "#cta"], 2, {opacity:1}, "+=1")
	  .to("#headline1", 1, {opacity:0})
	  .to('#img', 2, {x:-300, ease:Linear.easeNone}, "+=1")
	  .to('#img', 2, {x:-600, ease:Linear.easeNone}, "+=2");
	
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
	 

	