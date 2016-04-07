var img1;
var txt1a;
var txt1b;
var txt2a;
var txt2b;
var footer;
var redBG;
var wLogo;
var redNoseLogo;
var ctaButton;

		
function addClass(id, cssClass) 
{
	var el = document.getElementById(id);
	if(el) {
	    el.className += el.className ? ' ' + cssClass : cssClass;
	  }
}

function announceLoad(event)
{
	var targetEl = event.currentTarget || event.srcElement;
	var items = imageLoadTracker.length;
	
	// loop through images array, splice out the one that has loaded
	for(var i = 0; i < items; i++ )
	{
		if(targetEl.id == imageLoadTracker[i])
		{
			imageLoadTracker.splice(i, 1);
			break;
		}
	}
	
	// once the array is 0, all images have been loaded. start animation
	if(imageLoadTracker.length <= 0)
	{
		console.log(imageLoadTracker.length)
		// start animation sequence
		document.getElementById('banner').style.display = "block";
		init();
	}
}

//Start the creative
function init(){
	var _f1 = 0.5;
	var _f2 = 7;
	var _f3 = 8.5;
	
	console.log('init')
	//Assign All the elements to the element on the page
	img1 = document.getElementById('img1');
	txt1a = document.getElementById('txt1a');
	txt1b = document.getElementById('txt1b');
	txt2a = document.getElementById('txt2a');
	txt2b = document.getElementById('txt2b');
	wLogo = document.getElementById('wLogo');
	redNoseLogo = document.getElementById('redNoseLogo');
	redBG = document.getElementById('redBG');
	ctaButton = document.getElementById('ctaButton');
	
	TweenLite.to(img1, 2.85,{x:"1800", scaleX:25, scaleY:25, force3D:true, z:0.1, rotationZ:0.01, ease:Power3.easeIn, overwrite:0, delay:_f1});
	TweenLite.from(txt1a, 2.7,{alpha:0, x:"-60", scaleX:0.1, scaleY:0.1, ease:Power3.easeInOut, overwrite:0, delay:_f1+0.75});
	TweenLite.from(redBG, 0.2,{alpha:0, ease:Power3.easeOut, overwrite:0, delay:_f1+2.5});
	TweenLite.from(wLogo, 0.2,{alpha:0, ease:Power3.easeOut, overwrite:0, delay:_f1+2.75});
	TweenLite.from(redNoseLogo, 0.5,{alpha:0, ease:Power3.easeOut, overwrite:0, delay:_f1+2.75});
	TweenLite.from(txt1b, 0.6,{alpha:0, y:"30", ease:Back.easeOut.config(2), overwrite:0, delay:_f1+3.85});
	TweenLite.to(txt1a, 0.6,{css:{top:"20px"}, ease:Back.easeOut.config(2), overwrite:0, delay:_f1+3.93});
	
	TweenLite.to(txt1a, 0.25,{alpha:0, ease:Power3.easeOut, overwrite:0, delay:_f2});
	TweenLite.to(txt1b, 0.25,{alpha:0, ease:Power3.easeOut, overwrite:0, delay:_f2});
	
	TweenLite.from(txt2a, 0.6,{alpha:0, y:"30", ease:Back.easeOut.config(2), overwrite:0, delay:_f2+0.25});
	TweenLite.from(txt2b, 0.6,{alpha:0, y:"30", ease:Back.easeOut.config(2), overwrite:0, delay:_f2+0.3});
	TweenLite.from(ctaButton, 0.6,{alpha:0, y:"30", ease:Back.easeOut.config(2), overwrite:0, delay:_f2+1.5});
}