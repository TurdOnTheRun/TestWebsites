// global vars
var myTimeline = new TimelineMax();
var myWobble = new TimelineMax();
var myWobbleOver = new TimelineMax();
var over = false;

var _loadedImages=0,
_imageArray=new Array("bg.jpg", "bg2.jpg", "box_out.png", "copy1_s.png", "copy1.png","copyEF.png", "logo.png", "logo_s.png", "lunch.png", "lunch_s.png", "paq_s.png", "paq.jpg", "platy.png","platy1.png","platy1_head.png", "rays.png");
// console.log(_imageArray.length)
//
this.addEventListener("DOMContentLoaded", preloadImages);

//loader
function preloadImages() {
    for (var i = 0; i < _imageArray.length; i++) {
        var _tempImage = new Image();
        _tempImage.addEventListener("load", trackProgress);
        _tempImage.src = _imageArray[i];
    }
}
function trackProgress(){
    _loadedImages++;             
    if(_loadedImages == _imageArray.length) init();
}
function init(){ 
    var css = document.createElement( 'link' );
    css.setAttribute( 'rel', 'stylesheet' );
    css.setAttribute( 'type', 'text/css' );
    css.setAttribute( 'href', "style.css" );
    document.getElementsByTagName('head')[0].appendChild(css);

    addListeners();
    initAnimations();
}
function addListeners() {
    bgExit.addEventListener('mouseover', bgExitOver, false);
    bgExit.addEventListener('mouseout', bgExitOut, false);

}
function Blink (item, repeatCount){
    TweenMax.to(item, .1, {display:"block", scaleY:0, opacity:.8, repeat:repeatCount, repeatDelay: 1.5});
}
function Wobble(item){
    myWobble.addLabel("Wobble")
    .to(item[0], 1.8, {bezier:{curviness:3, type:"thruBasic", values:[{left:0, top:0}, {left:"-=2.5", top:"+=7.5"}, {left:"-=5", top:0}, {left:0, top:0}, {left:"+=2.5", top:"+=7.5"}, {left:"+=5", top:0}, {left:"+=2.5", top:"+=7.5"}, {left:0, top:0}]}, ease: SteppedEase.config( 25 ), repeat:2})
    .to(item[1], 1.8, {bezier:{curviness:2, type:"thruBasic", values:[{left:5, top:27}, {left:"-=2.5", top:"+=7.5"}, {left:"-=5", top:0}, {left:5, top:27}, {left:"+=2.5", top:"+=7.5"}, {left:"+=5", top:0}, {left:"+=2.5", top:"+=7.5"}, {left:5, top:27}]}, ease: SteppedEase.config( 25 ), repeat:2},"-=5.6");
}
function WobbleOver(item){
    myWobbleOver.addLabel("WobbleOver")
    .to(item[0], 1.8, {bezier:{curviness:3, type:"thruBasic", values:[{left:0, top:0}, {left:"-=2.5", top:"+=7.5"}, {left:"-=5", top:0}, {left:0, top:0}, {left:"+=2.5", top:"+=7.5"}, {left:"+=5", top:0}, {left:"+=2.5", top:"+=7.5"}, {left:0, top:0}]}, ease: SteppedEase.config( 25 )})
    .to(item[1], 1.8, {bezier:{curviness:2, type:"thruBasic", values:[{left:5, top:-33}, {left:"-=2.5", top:"+=7.5"}, {left:"-=5", top:0}, {left:5, top:-33}, {left:"+=2.5", top:"+=3.5"}, {left:"+=5", top:0}, {left:"+=2.5", top:"+=3.5"}, {left:5, top:-33}]}, ease: SteppedEase.config( 25 )},"-=1.8");
}
function initAnimations(){
    var banner = document.getElementById("banner");
    var act = .5;
    myTimeline.addLabel("LUN_MOM_300x250")

    .to(["#copy1_c","#copy1_s"], act, {top: 27, z: 0.1, rotationZ: 0.01, ease: Power4.easeOut, onComplete:Wobble, onCompleteParams:[["#copy1","#copy1_s"]]})

    .to(["#copy1_c","#copy1_s"], act*3, {top: "-=280", z: 0.1, rotationZ: 0.01, ease: Power4.easeOut}, "+=2.5")
    .to("#logo_c", act*3, {bottom: "+=280", z: 0.1, rotationZ: 0.01, opacity:0, ease: Power4.easeOut}, "-=1.5")
    
    .to("#bg", act*3, {bottom: "+=70", z: 0.1, rotationZ: 0.01, ease:Power4.easeOut}, "-=1.5")

    .to("#platy1", act*3, {opacity:1, bottom:19, z: 0.1, rotationZ: 0.01, ease:Power4.easeOut}, "-=1.5")
    .to("#bg2", act*2, {opacity: 1, bottom:0, z: 0.1, rotationZ: 0.01, ease:Power4.easeOut}, "-=1.3")

    .to("#platy1_head", .1, {opacity:1, rotation:"+=20", left:"-=4", bottom:"+=4", z: 0.1, rotationZ: 0.01, ease:Power4.easeOut})
    .to("#platy1_head", .25, {opacity:1, rotation:"-=40", left:"+=9", bottom:"-=5", z: 0.1, rotationZ: 0.01, ease:Power4.easeOut}, "+=.5")
    .to("#platy1_head", .25, {opacity:1, rotation:"+=20", left:"-=4", bottom:"+=4", z: 0.1, rotationZ: 0.01, ease:Power4.easeOut})
    .to("#platy1", .25, {opacity:1, rotation:"+=5", bottom:"-=2", scaleY:.95, z: 0.1, rotationZ: 0.01, ease:Power4.easeOut}, "-=.25")
    .to("#platy1", .4, {scale:.5, rotation:"-=5", transformOrigin:"center center", bottom:"-=14",z: 0.1, rotationZ: 0.01, ease: Elastic.easeOut.config(1, .7)})

    .to("#paq_c", act*2, {scale: .33, z: 0.1, rotationZ: 0.01, bottom:-107, left: -111, z: 0.1, rotationZ: 0.01, ease:Bounce.easeOut}, "-=.4")
    .to("#paq_s", act, {opacity:1, left:194, width:274, bottom:10, ease:Power4.easeOut}, "-=.3")
    .set("#platy1",{display:"none"}, "-=.45")
    
    .set("#copy1_c", {scale:.6, top:-25, left:38, opacity:1}, "-=1")
    .set("#copy1_s", {scale:.6, top:-33, left:5, opacity:.4}, "-=1")
    .set(["#copy1_ws_l" ,"#copy1_ws_r"], {scale:1.5}, "-=1")
    .set(["#copy1_w_l" ,"#copy1_w_r", "#copy1_ws_l" ,"#copy1_ws_r"], {opacity:1}, "-=1")
    
    .to("#lunch_c", act*4, { bottom:1, left:153, z: 0.1, rotationZ: 0.01, ease:Power4.easeOut}, "-=.5")
    
    .set(["#box_out_c", "#box_out1", "#box_out2", "#platy"], {opacity:1, ease:Power4.easeOut})
    .to("#platy", act*.5, {height:65, z: 0.1, rotationZ: 0.01, ease:Back.easeOut})
    .to(["#platy_h1", "#platy_h2"], .01, {opacity:1, ease:Power4.easeOut, onComplete:Over})
    .to("#rays", act, {opacity:1, scale:3.2, left:100, top:-15, ease: Power4.easeOut, transformOrigin:"center bottom"}, "-=.2")
    ;
    // stats.setTimeline(myTimeline);
}
function Over(){
    over = true;
}
function bgExitOver(){
    if (over == true) {
        WobbleOver(["#copy1","#copy1_s"])
        TweenLite.to(platy, .3, {height:56, z: 0.1, rotationZ: 0.01, ease: Power4.easeOut})
        TweenLite.to("#platy_h1", .3, {bottom:4, z: 0.1, rotationZ: 0.01, ease: Power4.easeOut})
        TweenLite.to("#platy_h2", .3, {bottom:10, z: 0.1, rotationZ: 0.01, ease: Power4.easeOut})
    }
};
function bgExitOut(){
    if (over == true) {
        TweenLite.to(platy, .3, {height:65, z: 0.1, rotationZ: 0.01, ease: Power4.easeOut});
        TweenLite.to("#platy_h1", .3, {bottom:13, z: 0.1, rotationZ: 0.01, ease: Power4.easeOut})
        TweenLite.to("#platy_h2", .3, {bottom:19, z: 0.1, rotationZ: 0.01, ease: Power4.easeOut})
    }
};