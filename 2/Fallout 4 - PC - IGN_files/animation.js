var logo = document.querySelector(".logo");
var pkg = document.querySelector(".pkg");
var frame_01 = document.querySelector(".frame_01");
var frame_02 = document.querySelector(".frame_02");
var frame_03 = document.querySelector(".frame_03");
var frame_04 = document.querySelector(".frame_04");
//var blkFade = document.querySelector(".blkFade");

var count = 0;

var tl1 = new TimelineLite({onComplete:loop}); // on complete run the loop funciton

/* Unhide adWrapper DIV and continue on with animation.
This ensures that all assets wont show up layered before animation is ready to be executed*/
TweenLite.set("#adWrapper", {autoAlpha:1});
startAd();

function startAd() {
    tl1
        .set(logo, {autoAlpha: 1}, "start")
        .set(pkg, {autoAlpha: 1})

        .to("#f1", .75, {opacity:1},"frame1")    

        .set("#f2", {opacity: 1})

        .to("#f1", .25, {opacity: 0}, "frame1+=1.75")

        .to("#f1", .25, {opacity: 0}, "frame1+=1.75")

        .set("#f3", {opacity: 1})
        .set("#f4", {opacity: 1})

        .to("#f2", .25, {opacity: 0}, "+=1.75")

        .to("#f3", .25, {opacity: 0}, "+=1.75")

        .to({}, 1, {}, "+=1.0")
        .stop;
}

function loop(){
  //go to the "start" label and play the timeline from there...
    if (count < 1){
        tl1.gotoAndPlay("start");
        count++;
    }else{
        tl1.stop;
    }
}


//function mouseOverCTA() {
//    console.log("SDLkjad")
//    tl_CTA.to(cta, .3, {scale: 1.1, ease: Power2.easeInOut, overwrite:"all"})
//    tl_CTA.to(cta, .3, {scale: 1, ease: Back.easeOut.config(3)})
//}

//function addListeners (listen) {
//    console.log("test")
//    if (listen){
//        document.getElementById("adWrapper").addEventListener("mouseenter", mouseOverCTA);
//    }
//    else {
//        document.getElementById("adWrapper").removeEventListener("mouseenter", mouseOverCTA);
//    }
//}
