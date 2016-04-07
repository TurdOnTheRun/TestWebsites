
var banner = document.getElementById('banner');
var copy1 = document.getElementsByClassName("copy1");
var copy2 = document.getElementsByClassName("copy2");
var copy3 = document.getElementsByClassName("copy3");
var copy4 = document.getElementsByClassName("copy4");
var cta = document.getElementsByClassName("cta");
var arrow = document.getElementsByClassName("arrow");
var maxLoops = 1;
var loopCount = 0;

banner.style.width = dhtml.width + 'px';
banner.style.height = dhtml.height + 'px';

var closebutton = document.getElementById('closeButton');

var clickTAGvalue = dhtml.getVar('clickTAG', 'http://www.adform.com'); //dhtml.getVar() gets clickTAG variable from Adform, if it is not defined (e.g. banner is being tested locally) it will fallback to example.com
var landingpagetarget = dhtml.getVar('landingPageTarget', '_blank'); //same as above - landingPageTarget from Adform or falls back to _blank

banner.onclick = function() {
	window.open(clickTAGvalue,landingpagetarget);
}

document.addEventListener('touchstart', function(event) {
 deltax = 0;
 deltay = 0;
 x = event.touches[0].clientX;
 y = event.touches[0].clientY;
 l = event.touches.length;
}, false);

document.addEventListener('touchmove', function(event) {
  event.preventDefault();
  deltax = x - event.touches[0].clientX;
  deltay = y - event.touches[0].clientY;
  parent.window.scrollBy(0,deltay);
}, false);


TweenLite.delayedCall(1.5, stepAnimation, [0]);

function stepAnimation(frameNumber){

  switch(frameNumber)
  {
    case 0:
      TweenLite.to(copy2, 1, {opacity:1});
      TweenLite.delayedCall(2, stepAnimation, [1]);
    break;

    case 1:
      TweenLite.to(copy3, 1, {opacity:1});
      TweenLite.delayedCall(2, stepAnimation, [2]);
    break;

    case 2:
      TweenLite.to(copy1, 0.5, {opacity:0});
      TweenLite.to(copy2, 0.5, {opacity:0});
      TweenLite.to(copy3, 0.5, {opacity:0});
      TweenLite.delayedCall(0.8, stepAnimation, [3]);
    break;

    case 3:
      TweenLite.to(copy4, 1, {opacity:1});
      TweenLite.delayedCall(2, stepAnimation, [4]);
    break;

    case 4:
      TweenLite.to(cta, 1, {opacity:1});
      TweenLite.delayedCall(0.5, stepAnimation, [5]);
    break;

    case 5:
      TweenLite.to(arrow, 0.1, {opacity:1});
      TweenLite.to(arrow, 0.32, {left:569});
      TweenLite.delayedCall(3, checkLooping);
      loopCount++;
    break;
  }

}

function checkLooping(){
  if(loopCount <= maxLoops)
  {
    TweenLite.to(arrow, 0.5, {opacity:0});
    TweenLite.to(cta, 0.5, {opacity:0});
    TweenLite.to(copy4, 0.5, {opacity:0});
    TweenLite.delayedCall(0.5, resetBanner);
  }
}

function resetBanner(){

  TweenLite.to(copy1, 0.5, {opacity:1});

  arrow[0].style.left = '559px';

  TweenLite.delayedCall(2, stepAnimation, [0]);
}

