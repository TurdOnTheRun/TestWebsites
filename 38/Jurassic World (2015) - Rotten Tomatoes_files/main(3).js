'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
    
    var card = document.getElementById('card'),
    	text1 = document.getElementById('text1'),
    	text2 = document.getElementById('text2'),
    	line2 = document.getElementById('line2'),
    	text3 = document.getElementById('text3'),
        line3 = document.getElementById('line3'),
        text4 = document.getElementById('text4'),
        text5 = document.getElementById('text5'),
        dot5 = document.getElementById('dot5'),
        plane5 = document.getElementById('plane5'),
        bgRed = document.getElementById('bg-red'),
        text6 = document.getElementById('text6');

    text2.style.display = 'block';
    text3.style.display = 'block';
    text4.style.display = 'block';
    text5.style.display = 'block';
    text6.style.display = 'block';
    plane5.style.display = 'block';
    dot5.style.display = 'block';

    // first frame
    //out animation
    TweenMax.to(card, 0.5, {x: -200, y:-200, delay: 3});
    TweenMax.to(text1, 0.5, {x: -200, y: -200, delay: 3});

    //second frame
    //enter animation
    TweenMax.from(text2, 0.5, {x: 200, y: 200, delay: 3});
    TweenMax.from(line2, 0.5, {x: 200, y: 200, delay: 3, onComplete: completeSecondFrame});

    //third frame
    //out animation
    TweenMax.to(text2, 0.5, {x: -320, y: 200, delay: 4}); 
    TweenMax.to(line2, 1, {x: -320, y: 200, delay: 4});
    //enter animation
    TweenMax.from(text3, 1, {x: 320, y: -200, delay: 4, onComplete: completeTirdthFrame});
    
    //fourth frame
    //out animation
    TweenMax.to(text3, 0.5, {x: -300, y: -50, delay: 5.5});
    TweenMax.to(line2, 0.5, {x: -620, y: 150, delay: 5.5});
    //enter animation
    TweenMax.to(line3, 1, {x: -400, y: -150, delay: 5.5});
    TweenMax.from(text4, 1, {x: 400, y: 150, delay: 5.5});

    //fifth frame
    //out animation
    TweenMax.to(text4, 0.5, {x: -200, y: -200 , delay: 7});
    TweenMax.to(line3, 0.5, {x: -600, y: -350 , delay: 7});
    //enter animation
    TweenMax.from(text5, 0.5, {x: 200, y:200, delay: 7});
    TweenMax.from(dot5, 0.5, {scaleX: 0, scaleY: 0, delay: 7.5});
    TweenMax.to(dot5, 0.3, {x: 60, delay: 8});
    TweenMax.from(plane5, 0.5, {scaleX: 0, scaleY: 0, delay: 8.3});
    TweenMax.to(text5, 0.4, {x: -20, opacity: 0, delay: 8.1})
    TweenMax.to(dot5, 0.3, {scaleX: 1.3, scaleY: 1.3, delay: 8.4});

    //sixth frame
    //out animation
    TweenMax.to(text5, 0.5, {x: -300, delay: 9});
    TweenMax.to(dot5, 0, {opacity: 0, delay: 9});
    TweenMax.to(plane5, 0.5, {x: 100, delay: 9, onComplete: hideDisclamer});
    //enter animation
    TweenMax.to(bgRed, 0.3, {x: -300, delay: 9.3});
    TweenMax.from(text6, 0.5, {x: 300, delay: 9.5});

    //seventh frame
    //out animation
    TweenMax.to(bgRed, 0.5, {x: -600, delay: 10.5});
    TweenMax.to(text6, 0.5, {x: -300, delay: 10.5});
    TweenMax.to(text5, 0, {x: -300, delay: 10.5, onComplete: showFinalFrame});
});

var completeSecondFrame = function(event) {
	var line2 = document.getElementById('line2');
	line2.style.display = 'block';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        var svgContainer = document.getElementById('line2');
        var nS='http://www.w3.org/2000/svg';
        var animation = new TimelineMax();
        animation.pause();
        var svgPaths = svgContainer.getElementsByTagNameNS(nS,'path')
        var path = svgPaths[1];
        var pathDimensions = path.getTotalLength();
        var strokeWidth = path.getAttribute('stroke-width');
        path.style.strokeDasharray = (pathDimensions)+' '+(pathDimensions);
        path.style.strokeDashoffset = (/Firefox/i.test(navigator.userAgent))? pathDimensions/strokeWidth : pathDimensions;
        path.style.strokeDashoffset = 500;
        animation.add(TweenMax.to(path.style,1.8,{strokeDashoffset:0,onUpdate:function(){
            var n = document.createTextNode(' ');
            document.body.appendChild(n);
            document.body.removeChild(n);
        }}),0.1);
        
        var path = svgPaths[0];
        var pathDimensions = path.getTotalLength();
        var strokeWidth = path.getAttribute('stroke-width');
        path.style.strokeDasharray = (pathDimensions)+' '+(pathDimensions);
        path.style.strokeDashoffset = (/Firefox/i.test(navigator.userAgent))? pathDimensions/strokeWidth : pathDimensions;
        animation.add(TweenMax.to(path.style,2,{strokeDashoffset:0,onUpdate:function(){
            var n = document.createTextNode(' ');
            document.body.appendChild(n);
            document.body.removeChild(n);
        }}),0.1);
        animation.play();
    }

}

var completeTirdthFrame = function(event) {
    var line3 = document.getElementById('line3');
    line3.style.display = 'block';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        var svgContainer = document.getElementById('line3');
        var nS='http://www.w3.org/2000/svg';
        var animation = new TimelineMax();
        animation.pause();
        var svgPaths = svgContainer.getElementsByTagNameNS(nS,'path')
        var path = svgPaths[1];
        var pathDimensions = path.getTotalLength();
        var strokeWidth = path.getAttribute('stroke-width');
        path.style.strokeDasharray = (pathDimensions)+' '+(pathDimensions);
        path.style.strokeDashoffset = (/Firefox/i.test(navigator.userAgent))? pathDimensions/strokeWidth : pathDimensions;
        animation.add(TweenMax.to(path.style,2,{strokeDashoffset:0,onUpdate:function(){
            var n = document.createTextNode(' ');
            document.body.appendChild(n);
            document.body.removeChild(n);
        }}),0.1);
        var path = svgPaths[0];
        var pathDimensions = path.getTotalLength();
        var strokeWidth = path.getAttribute('stroke-width');
        path.style.strokeDasharray = (pathDimensions)+' '+(pathDimensions);
        path.style.strokeDashoffset = (/Firefox/i.test(navigator.userAgent))? pathDimensions/strokeWidth : pathDimensions;
        animation.add(TweenMax.to(path.style,2,{strokeDashoffset:0,onUpdate:function(){
            var n = document.createTextNode(' ');
            document.body.appendChild(n);
            document.body.removeChild(n);
        }}),0.1);
        animation.play();
    }
}

var hideDisclamer = function(event) {
    var terms = document.getElementById('terms'),
        termsRed = document.getElementById('terms-red'),
        plane5 = document.getElementById('plane5');
    terms.style.display = 'none';
    plane5.style.display = 'none';
    termsRed.style.display = 'block';
}

var showFinalFrame = function(event) {
    var terms = document.getElementById('terms-end'),
        termsRed = document.getElementById('terms-red'),
        card7 = document.getElementById('card7'),
        bonus71 = document.getElementById('bonus71'),
        bonus72 = document.getElementById('bonus72'),
        cta7 = document.getElementById('cta7'),
        bgRed = document.getElementById('bg-red'),
        text6 = document.getElementById('text6');
    terms.style.display = 'block';
    terms.style.left = '131px';
    termsRed.style.display = 'none';
    card7.style.display = 'block';
    bonus71.style.display = 'block';
    bonus72.style.display = 'block';
    cta7.style.display = 'block';
    bgRed.style.zIndex = '1';
    text6.style.zIndex = '2';
}