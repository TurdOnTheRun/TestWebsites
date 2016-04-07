/* ---------------------------------------------------------------------------------------
 * @TITLE: People.com Desktop - News Article
 * @RELEASE: Production Release Date: 12/2013
 * @Version: 1
 * @NOTE:
 * @MODULES:
 *		- To Be Listed
 * @TODO:
 *		- Plugins should be moved out...
 *	    - Premium specific code should be isolated and grouped
 *	    - Tracking should be grouped & consolidated
 *	    - All article js should be under PEOPLE.Article, not PEOPLE.
 *	    - Global / env detection items should be grouped together into the init ArticleGlobals function
 * --------------------------------------------------------------------------------------- */


// Smartresize jQuery event handler as documented: http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function($,sr){
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }
            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!1,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",Z),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",k),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},Z=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",Z))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);

// Set ads to async mode.
var TGX_SITE_CONFIG = {
    'gpt_sync_mode': 'async'
};

PEOPLE.Article = {

    omniLinkTrackList : function(track_list, debug) {
        $.each(track_list, function( index ) {
            $(track_list[index].element).on('click', function() {
                debug ? alert(track_list[index].omni_label+' | '+track_list[index].omni_id) :
                    linkTrackArt(track_list[index].omni_label, track_list[index].omni_id);
            });
        });
    },

    omniUserEventList : function(track_list, debug) {
        $.each(track_list, function( index ) {
            $(track_list[index].element).on('click', function() {
                omniTrackEv(track_list[index].omni_id);
            });
        });
    },

    /*******************************************************************************
     * Photo with Play Button, Caption & Video
     *******************************************************************************/

    addVideoPhotoPlayButton : function (){ // Show play button on a video image placeholder
        // If we are WordPress.
        if ( $('body').hasClass('single') || $('body').hasClass('permalink') ) {
            var $firstImage = $('.post-body').find('.imgcont:first');
            if ( $firstImage.length != 0 ) {
                $firstImage.attr('id', 'mainPhoto');
                $firstImage.find('img').wrap('<span class="image"></span>');
            }
        }
        $('#mainPhoto').addClass('videoPhoto');

        // set default caption if none exists
        if ( (typeof PhotoVideoButtonCaption == 'undefined') || (PhotoVideoButtonCaption == '')  ) {
            PhotoVideoButtonCaption = 'PLAY VIDEO';
        }

        var playButtonHTML = ''
            +   '<div class="playCaption" style="display:none;">'
            +		'<div class="playArrow"><span>Play</span></div>'
            +		'<div class="playText">'+PhotoVideoButtonCaption+'</div>'
            +	'</div>';

        $('#mainPhoto.videoPhoto .image').prepend(playButtonHTML);
        $('#mainPhoto.videoPhoto .playCaption').show();
    },
    renderVideoPhotoPlayer : function (){
        $('#mainPhoto').after('<div id="mainPhotoVideo" class="hidePhotoVideoPlayer"></div>');

        $.getScript('http://admin.brightcove.com/js/BrightcoveExperiences.js');
        $('#mainPhotoVideo').append('<div id="bcPlayer' + brightcovePhotoVideoID + '" class="brightcovemain"></div>');

        var isiPad = navigator.userAgent.match('iPad') ? true : false;
        if (!isiPad) $('#mainPhotoVideo').removeClass('hidePhotoVideoPlayer').hide();

        var bchtml = ''
            + '<object id="myExperience1' + brightcovePhotoVideoID + '" class="BrightcoveExperience">'
            + '	<param name="bgcolor" value="#FFFFFF" />'
            + '	<param name="width" value="600" />'
            + '	<param name="height" value="450" />'
            + '	<param name="playerID" value="2490684612001" />'
            + ' <param name="playerKey" value="AQ~~,AAAAABjSC6Q~,pGevSATpV8F9r-keyIw7NPF9tnLuacdR" />'
            + '	<param name="publisherID" value="416418724"/>'
            + '	<param name="isVid" value="true" />'
            + '	<param name="wmode" value="transparent" />'
            + '	<param name="isUI" value="true" />'
            + '	<param name="optimizedContentLoad" value="true" />'
            + '	<param name="@videoPlayer" value="' + brightcovePhotoVideoID + '" />'
            + '</object>'
            + '';

        var bc = document.getElementById('bcPlayer' + brightcovePhotoVideoID);
        bc.innerHTML = '<a id="vid"></a>' + bchtml;
    },
    // Sets up play button on a video image placeholder and removes when user clicks to play video
    playVideoPhoto : function (){
        var isiPad = navigator.userAgent.match('iPad') ? true : false;
        if (isiPad){
            $('.videoPhoto').bind('click',function(){
                $('.videoPhoto').hide();
                $('#mainPhotoVideo').removeClass('hidePhotoVideoPlayer');
            });
        } else {
            $('#mainPhoto.videoPhoto .image').hover(
                function () { // expand and show text, hide single button
                    $('.videoPhoto .playText').addClass('showText');
                    $('.videoPhoto .playArrow').hide();
                },
                function () { // remove caption, hide text and show single button
                    $('.videoPhoto .playText').removeClass('showText');
                    $('.videoPhoto .playArrow').show();
                }
            );
            $('.videoPhoto .image').bind('click',function(){
                $('.videoPhoto').hide();
                $('#mainPhotoVideo').show();
            });
        }
    },
    checkVideoHash : function() {
        // If arriving from Video of the Day tout on homepage, and there is a video-backed photo, autoplay
        if(window.location.hash.split('#')[1] == "vid" && $("#mainPhotoVideo").length > 0 && ! PEOPLE.isTablet){
            $('#vid').focus();
            $("#mainPhoto.videoPhoto .image").eq(0).click();
        }
    },
    initVideoPhoto : function(){
        if ( (typeof brightcovePhotoVideoID == 'undefined') || (typeof brightcovePhotoVideoID == '')  ) {
            return; // if ID does not exist, exit function
        }
        PEOPLE.Article.addVideoPhotoPlayButton();
        PEOPLE.Article.playVideoPhoto();
        PEOPLE.Article.renderVideoPhotoPlayer();
        PEOPLE.Article.checkVideoHash();
    },
    /*******************************************************************************
     * Tracking Prefix
     *******************************************************************************/
    getTrackingPrefix : function() { // this is to return the location prefix for Article Tracking

        var prefix      = '',
            articleurl  = String(location.href);

        // Default/Catch-all for unusual cases:
        if ($('body').hasClass('article')) prefix = 'News_';

        // Regular News:
        if ($('body#news').hasClass('article')) prefix = 'News_';

        // Package:
        if ( ($('body').hasClass('article')) && (articleurl.match('package')) ) prefix = 'Pkg_';

        // CITA:
        if ( ($('body').hasClass('article')) && ($('body').hasClass('caughtintheact')) ) prefix = 'CITA_';

        // Pets:
        if ( ($('body#pets').hasClass('article')) && (articleurl.match('article')) ) prefix = 'Pets_';

        // Country:
        if ($('body#country').hasClass('article')) prefix = 'Country_';

        // TV Watch:
        if ($('body#tvwatch').hasClass('article')) prefix = 'TV_';

        // Stylewatch:
        if ($('body#stylewatch').hasClass('permalink')) prefix = 'SW_';

        // CBB:
        if ($('body#babies').hasClass('permalink')) prefix = 'CBB_';

        // Great Ideas:
        if ($('body#greatideas').hasClass('single')) prefix = 'GI_';

        return(prefix);
    },
    initLinkTracking : function() {
        var articleloc = '',
            isarticle = false;

        if ( $('body').hasClass('article') || $('body').hasClass('permalink') || $('body').hasClass('single') ) {isarticle = true;}
        articleloc = PEOPLE.Article.getTrackingPrefix();

        PEOPLE.Article.trackVideoBanner();

        if (isarticle) {
            PEOPLE.Article.removePremiumLinkCookie();
            PEOPLE.Article.bindLinkTracking(articleloc);
        }
    },
    trackVideoBanner : function(){
        var bannerURL = $('#most-watched-banner a').attr('href');
        $('#most-watched-banner a').click(function() {
            omniTrackEv('video-mostwatched');
            setTimeout(function() {
                parent.location.href = bannerURL;
            }, 3000);
            return false;
        });
    },
    premiumToutArray: [],

    /*******************************************************************************
     * Bind Link Tracking
     *******************************************************************************/
    bindLinkTracking : function(locationprefix){

        // Global top nav
        $('#navigation #peopleLogo a').addClass('tracklink3').data('trackcode', locationprefix + 'Global_Nav HP').data('trackheadline','People Logo');

        $('#navigationLinks li a').each(function() {
            $(this).addClass('tracklink3').data('trackcode', locationprefix + 'Global_Nav Other').data('trackheadline',$(this).text());
        });

        // Main Subnav
        $('#subnavigationLinks li a').each(function() {
            $(this).addClass('tracklink3').data('trackcode', locationprefix + 'Top_Subnav').data('trackheadline',$(this).text());
        });

        // Top Stories Package Header
        $('#wrapper #headline h2 a').addClass('tracklink3').data('trackcode', locationprefix + 'Top_Section header').data('trackheadline', $('#wrapper #headline h2 a').text());

        //  Top Stories edit touts
        if ( $('#topStoriesTouts').length ) {
            // Loop through & track each tout
            for (var j=0; j < $('#topStoriesTouts .newstout').length; j++) {
                var currentheadline = $('#topStoriesTouts .newstout:eq(' + j + ') h4 a').text(),
                    currenttrackcode = locationprefix + 'Top_Top Stories_';
                // add '0' before positions 0-9
                currenttrackcode = j < 10 ? currenttrackcode + '0' + (j+1) : currenttrackcode + (j+1);
                $('#topStoriesTouts .newstout:eq(' + j + ') a').addClass('tracklink3').data('trackcode', currenttrackcode).data('trackheadline', currentheadline);
            }
        }

        // Top Stories CM tout
        $('#topStoriesTouts .cmtout .image a').addClass('tracklink3').data('trackcode', locationprefix + 'Top_Top Stories_CM Tout').data('trackheadline', 'CM tout image');
        $('#topStoriesTouts .cmtout .txtcont h4 a').addClass('tracklink3').data('trackcode', locationprefix + 'Top_Top Stories_CM Tout').data('trackheadline', 'CM tout headline');
        $('#topStoriesTouts .cmtout .txtcont .more a').addClass('tracklink3').data('trackcode', locationprefix + 'Top_Top Stories_CM Tout').data('trackheadline', 'CM tout more link');

        // Top Stories Prev/Next
        $('#topStoriesSlider a.bx-prev').addClass('tracklink3').data('trackcode', locationprefix + 'Top_Top Stories Scroll').data('trackheadline','Top Stories Previous');
        $('#topStoriesSlider a.bx-next').addClass('tracklink3').data('trackcode', locationprefix + 'Top_Top Stories Scroll').data('trackheadline','Top Stories Next');

        // Premium Banner
        $('#premium-banner a').addClass('tracklink3').data('trackcode', locationprefix + 'News_Premium Promo_Top').data('trackheadline', $('#premium-banner a').text());
        /* ----------- Left Column ------------ */

        // Article Header
        $('#articleCategory .logo a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_Section Header').data('trackheadline', $('#articleCategory .logo a').text());
        $('#articleCategory .subcategory a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_Section Header').data('trackheadline', $('#articleCategory .subcategory a').text());

        // Celeb DB
        if ( $('#relatedCeleb').length ) {
            $('#relatedCeleb .celebTout a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_Celeb DB');
            // Add extra class to identify each celebDB tout
            for (i=0; i < $('#relatedCeleb .celebTout').length; i++) {
                $('#relatedCeleb .celebTout').eq(i).addClass('cdb'+i);
            }
            // identify each link in the description
            $('#relatedCeleb .celebTout .links a').each(function(){
                var linktext = $(this).text();
                if (linktext == 'full bio') linktext = 'bio';
                $(this).addClass(linktext);
            })
            // Loop through & track each tout
            for (j=0; j < $('#relatedCeleb .celebTout').length; j++) {
                var celebName = $('#relatedCeleb .cdb' + j + ' p.name a').text(),
                    thisTout = '#relatedCeleb .cdb' + j;
                $(thisTout + ' .image a').data('trackheadline', celebName + ' Image');
                $(thisTout + ' p.name a').data('trackheadline', celebName);
                $(thisTout + ' .links a.photos').data('trackheadline', celebName + ' Photos');
                $(thisTout + ' .links a.news').data('trackheadline', celebName + ' News');
                $(thisTout + ' .links a.bio').data('trackheadline', celebName + ' Bio');
            }
        }

        // Links inside #articleBody
        $('#articleBody a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_Inline').data('trackheadline', 'Article Inline Link');

        // Related links inside #articleBody
        $('#articleBody .relatedtext a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_Inline_Big').data('trackheadline', 'Article Inline Link - Related');

        // Related Links New Module
        $('#related-recirc .tout:eq(0) a').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_Related_1').data('trackheadline',  $('#related-recirc .tout:eq(0) .txtcont a').text() );
        $('#related-recirc .txtcont h4 a:eq(1)').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_Related_2').data('trackheadline', $('#related-recirc .txtcont h4 a:eq(1)').text() );
        $('#related-recirc .txtcont h4 a:eq(2)').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_Related_3').data('trackheadline', $('#related-recirc .txtcont h4 a:eq(2)').text() );
        $('#related-recirc .txtcont h4 a:eq(3)').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_Related_4').data('trackheadline', $('#related-recirc .txtcont h4 a:eq(3)').text() );

        // Most Recent News (re-named to "The Latest")
        if ( $('#the-latest').length ) {
            // Add extra class to identify each tout
            for (var i=0; i < $('#the-latest .tout').length; i++) {
                $('#the-latest .tout').eq(i).addClass('rn'+i);
            }
            // Loop through & track each tout
            for (var j=0; j < $('#the-latest .tout').length; j++) {
                var currentheadline = $('#the-latest .rn' + j + ' h4 a').text(),
                    currenttrackcode = locationprefix + 'Ctr_Most Recent News_'+(j+1);
                $('#the-latest .rn' + j + ' a').addClass('tracklink3').data('trackcode', currenttrackcode).data('trackheadline', currentheadline);
            }
        }

        // Email Updates
        $('#followBar #emailSignUp a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_Email Updates').data('trackheadline', 'Email Updates Sign Up');

        // On Newsstands Now
        $('#newsstandblitz .imgcont a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_CM Tout').data('trackheadline', 'On Newsstands Now tout image');
        $('#newsstandblitz p.headline a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_CM Tout').data('trackheadline', 'On Newsstands Now tout headline');
        $('#newsstandblitz p.more a').addClass('tracklink3').data('trackcode', locationprefix + 'Ctr_CM Tout').data('trackheadline', 'On Newsstands Now tout more link');

        /* Around the Web - OUTBRAIN */
        $('.OUTBRAIN a.item-link-container:eq(0)').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_ATW_1').data('trackheadline', $('.OUTBRAIN a.item-link-container:eq(0) .strip-rec-link-title').text() );
        $('.OUTBRAIN a.item-link-container:eq(1)').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_ATW_2').data('trackheadline', $('.OUTBRAIN a.item-link-container:eq(1) .strip-rec-link-title').text() );
        $('.OUTBRAIN a.item-link-container:eq(2)').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_ATW_3').data('trackheadline', $('.OUTBRAIN a.item-link-container:eq(2) .strip-rec-link-title').text() );
        $('.OUTBRAIN a.item-link-container:eq(3)').addClass('tracklink3').data('trackcode', locationprefix + 'News_Ctr_ATW_4').data('trackheadline', $('.OUTBRAIN a.item-link-container:eq(3) .strip-rec-link-title').text() );

        /* ----------- Right Column ------------ */

        // Parner Recircs tracking is in global main JS

        // Editorial, Video and Premium touts. Zergnet third party headlines.
        (function(){
            var $rightRail = $('#right-rail'),
                $editTout = $rightRail.find('.tout-large:not(.tout-video:eq(0)):not(.tout-premium)'),
                $videoTout = $rightRail.find('.tout-large.tout-video:eq(0)'),
                $videoToutSmall = $rightRail.find('.ob-dynamic-rec-container'),
                $premiumTout = $rightRail.find('.tout-large.tout-premium'),
                $zergLink = $rightRail.find('.zergentity a');

            $editTout.each(function(i){
                var $this = $(this),
                    $link = $this.find('a'),
                    count = i + 1,
                    title = $.trim( $this.find('h4').text() );

                $link.addClass('tracklink3')
                    .data('trackcode', locationprefix + 'News_RR_ED_' + count)
                    .data('trackheadline', title);
            });

            $videoTout.each(function(i){
                var $this = $(this),
                    $link = $this.find('a'),
                    count = i + 1,
                    title = $.trim( $this.find('h4').text() );

                $link.addClass('tracklink3')
                    .data('trackcode', locationprefix + 'News_RR_Video_' + count)
                    .data('trackheadline', title);
            });

            $videoToutSmall.each(function(i){
                var $this = $(this),
                    $link = $this.find('a'),
                    count = i + 2, // Offset by two, to accommodate $videoTout as first.
                    title = $.trim( $this.find('.ob-rec-text').text() );

                $link.addClass('tracklink3')
                    .data('trackcode', locationprefix + 'News_RR_Video_' + count)
                    .data('trackheadline', title);
            });

            $premiumTout.each(function(i){
                var $this = $(this),
                    $link = $this.find('a'),
                    count = i + 1,
                    title = $.trim( $this.find('h4').text() );

                $link.addClass('tracklink3')
                    .data('trackcode', locationprefix + 'News_RR_Premium_' + count)
                    .data('trackheadline', 'Premium: ' + title);
            });

            // Third party content from Zergnet.
            $zergLink.live('click', function(){
                var $this = $(this),
                    headline = $.trim( $this.parents('.zergentity').find('.zergheadline').text());

                linkTrackArt( 'News_RR_Partners_Zergent', headline.replace('.com', '.com ') );
            });
        })();

        /* Sponsored Ads */
        $('#right-rail #right-rail-native-ad-1 a').addClass('tracklink3').data('trackcode', locationprefix + 'News_RR_Sponsored_1').data('trackheadline', $('#right-rail #right-rail-native-ad-1 a:eq(0)').attr('title') );
        $('#right-rail #right-rail-native-ad-2 a').addClass('tracklink3').data('trackcode', locationprefix + 'News_RR_Sponsored_2').data('trackheadline', $('#right-rail #right-rail-native-ad-2 a:eq(0)').attr('title') );

        // Recent Photos & Package "More..." Sidebar
        if ( $('#rightToutsBlock1').length ) {
            var url = location.href;

            // Add extra class to identify each tout
            for (i=0; i < $('#rightToutsBlock1 .tout').length; i++) {
                $('#rightToutsBlock1 .tout').eq(i).addClass('rt1tout'+i);
            }

            // Loop through & track each tout
            for (j=0; j < $('#rightToutsBlock1 .tout').length; j++) {
                var currentheadline = $('#rightToutsBlock1 .rt1tout' + j + ' h4 a').text();
                if ( ($('body').hasClass('article')) && (url.match('package')) ) {
                    var currenttrackcode = 'Pkg_RR_Pkg More_0'+(j+1);
                } else {
                    var currenttrackcode = locationprefix + 'RR_Recent Photos_0'+(j+1);
                }
                $('#rightToutsBlock1 .rt1tout' + j + ' a').addClass('tracklink3').data('trackcode', currenttrackcode).data('trackheadline', currentheadline);
            }
        }

        // Editor's Picks
        if ( $('#rightToutsBlock2').length ) {
            // Add extra class to identify each tout
            for (i=0; i < $('#rightToutsBlock2 .tout').length; i++) {
                $('#rightToutsBlock2 .tout').eq(i).addClass('rt2tout'+i);
            }

            // Loop through & track each tout
            for (j=0; j < $('#rightToutsBlock2 .tout').length; j++) {
                // Check for Jumptime (currently the 2nd tout)
                if (j == 1) {
                    var currentheadline = 'Jumptime Module',
                        currenttrackcode = locationprefix + 'RR_Jumptime';
                } else {
                    var currentheadline = $('#rightToutsBlock2 .rt2tout' + j + ' h4 a').text(),
                        currenttrackcode = locationprefix + 'Editor Picks_0'+(j+1);
                }
                $('#rightToutsBlock2 .rt2tout' + j + ' a').addClass('tracklink3').data('trackcode', currenttrackcode).data('trackheadline', currentheadline);
            }
        }

        // Video Tout
        $('#videoTout .videoTitle a').addClass('tracklink3').data('trackcode', locationprefix + 'RR_Video Tout').data('trackheadline', $('#videoTout .videoTitle a').text());

        // Foursquare (CITA)
        for (i=0; i < $('#rightCol #foursquare li').length; i++) {
            var currentheadline = $('#rightCol #foursquare li a').eq(i).text();
            $('#rightCol #foursquare li a').eq(i).addClass('tracklink3').data('trackcode', 'CITA_RR_Foursquare').data('trackheadline', currentheadline);
        }
        $('#rightCol #foursquare .follow a').addClass('tracklink3').data('trackcode', 'CITA_RR_Foursquare').data('trackheadline', 'Follow People on Foursquare');

        // Zap2It TV Listings
        $('#rightCol #ptgrid a').addClass('tracklink3').data('trackcode', 'TV_RR_Zap2It').data('trackheadline','Zap2It');

        // Latest News (see CBB for sample)
        if ( $('#rightCol #latestnews').length ) {

            $('#rightCol #latestnews li a').each(function() {
                $(this).addClass('tracklink3').data('trackcode', locationprefix + 'RR_Latest_News').data('trackheadline',$(this).text());
            });

            // More link:
            $('#rightCol #latestnews p.more a').addClass('tracklink3').data('trackcode', locationprefix + 'RR_Latest_News').data('trackheadline', 'More Headlines');

        } // end: Latest News (see CBB for sample)


        // CBB Specific
        if ($('body#babies').hasClass('permalink')) {

            // Article Body
            $('.post-body a').addClass('tracklink3').data('trackcode', 'CBB_Ctr_Inline').data('trackheadline', 'Article Inline Link')
            // Article Pagination
            $('.postpagination a').addClass('tracklink3').data('trackcode', 'CBB_Ctr_PrevNext').data('trackheadline', 'Article Pagination - Bottom');

            // Sidebar Edit Touts
            // if Edit tout is from Who's Due Next, add identifier and track separately
            if ($('#rightCol #whosnext').length) {

                var toutclasses = $('#rightCol #whosnext .tout').attr('class');
                toutclasses = toutclasses +  ' whosnexttout';
                $('#rightCol #whosnext .tout').attr('class',toutclasses);

                var whosnextheadline = $('#rightCol #whosnext p.deck a').text();
                var whosnexttrackcode = 'CBB_RR_Who\'s_Due_Next';
                $('#rightCol #whosnext a').addClass('tracklink3').data('trackcode', whosnexttrackcode).data('trackheadline', whosnextheadline);
            }
            // Loop through list items & if it's not Who's Due Next, add extra class to identify each generic Edit tout
            for (i=0; i < $('#rightCol .tout.hentry').length; i++) {
                $('#rightCol .tout.hentry').eq(i).addClass('cbbtout'+ (i));
                $('#rightCol .tout.hentry').eq(i).addClass('freetout')

                // remove generic Edit tout identifiers for Who's Due Next
                if ($('#rightCol .whosnexttout').length) {
                    $('#rightCol .whosnexttout').removeClass('cbbtout'+ (i));
                    $('#rightCol .whosnexttout').removeClass('freetout');
                }
            }
            // Loop through & track each generic Edit tout
            for (j=0; j < $('#rightCol .tout.freetout').length; j++) {
                var currentheadline = $('#rightCol .cbbtout' + j + ' p.deck a').text();
                var currenttrackcode = 'CBB_RR_Edit_Tout_'+(j+1);
                $('#rightCol .cbbtout' + j + ' a').addClass('tracklink3').data('trackcode', currenttrackcode).data('trackheadline', currentheadline);
            }
            // END: Sidebar Edit Touts

            // Squeals & Deals
            $('#rightCol #newsletter a').addClass('tracklink3').data('trackcode', 'CBB_RR_Squeals_and_Deals').data('trackheadline', 'Squeals and Deals');
            // Mom Said It
            $('#rightCol #yousaidit a').addClass('tracklink3').data('trackcode', 'CBB_RR_Mom_Said_It').data('trackheadline', 'Mom Said It');
            // Most Popular
            $('#rightCol #mostpopular a').addClass('tracklink3').data('trackcode', 'CBB_RR_Most_Popular').data('trackheadline', 'Most Popular');

        } // end: CBB Specific

        // SW Specific
        if ($('body#stylewatch').hasClass('permalink')) {

            // Article Body
            $('.post-body a').addClass('tracklink3').data('trackcode', 'SW_Ctr_Inline').data('trackheadline', 'Article Inline Link')
            // Article Pagination
            $('.postpagination a').addClass('tracklink3').data('trackcode', 'SW_Ctr_PrevNext').data('trackheadline', 'Article Pagination - Bottom');

            // More on SW
            if ( $('#rightCol #moreonstylewatch').length ) {
                // Loop through list items & add extra class to identify each tout
                for (i=0; i < $('#moreonstylewatch .tout').length; i++) {
                    $('#rightCol #moreonstylewatch .tout').eq(i).addClass('moresw'+i);
                }
                // Loop through & track each tout
                for (j=0; j < $('#moreonstylewatch .tout').length; j++) {
                    var currentheadline = $('#moreonstylewatch .moresw' + j + ' h4 a').text(),
                        currenttrackcode = 'SW_RR_More_On_SW_0'+(j+1);

                    $('#rightCol #moreonstylewatch .moresw' + j + ' a').addClass('tracklink3').data('trackcode', currenttrackcode).data('trackheadline', currentheadline);
                }
            } // end: More on SW

            // Top 10 Categories
            $('#rightCol #top10categories li a').each(function() {
                $(this).addClass('tracklink3').data('trackcode', 'SW_RR_Top_10_Categories').data('trackheadline', 'Top 10 Categories');
            });

            // Sites We Love
            $('#rightCol #siteswelove li a').each(function() {
                $(this).addClass('tracklink3').data('trackcode', 'SW_RR_Sites_We_Love').data('trackheadline', 'Sites We Love');
            });

            // Concierge
            $('#rightCol #concierge a').addClass('tracklink3').data('trackcode', 'SW_RR_SW_Concierge').data('trackheadline', 'Stylewatch Concierge');
        } // end: SW Specific


        /* Editors' Picks Joyus module */
        if ($('body#stylewatch').length) {
            $('#editors-picks #joyus-tout-1 a').addClass('tracklink3').data('trackcode', 'SW_RR_Joyus_01').data('trackheadline', $('#joyus-tout-1 h4 a').text());
            $('#editors-picks #joyus-tout-2 a').addClass('tracklink3').data('trackcode', 'SW_RR_Joyus_02').data('trackheadline', $('#joyus-tout-2 h4 a').text());
            $('#editors-picks #joyus-tout-3 a').addClass('tracklink3').data('trackcode', 'SW_RR_Joyus_03').data('trackheadline', $('#joyus-tout-3 h4 a').text());
            $('#editors-picks #joyus-more a').addClass('tracklink3').data('trackcode', 'SW_RR_Joyus_04').data('trackheadline', $('#joyus-more a').text());
        }

        /* ----------- Footer ------------ */

        // CBB Blogroll
        if ($('body#babies').hasClass('permalink')) {
            $('#blogroll a').addClass('tracklink3').data('trackcode', 'CBB_Ftr_Blogroll').data('trackheadline', 'Blogroll');
        }

        // SW Style Scoop
        if ($('body#stylewatch').hasClass('permalink')) {
            $('#morestylewatch a').addClass('tracklink3').data('trackcode', 'SW_Ftr_SW_Scoop Style');
            var c1header = $('#morestylewatch #morestylewatch_1 h3 span').text(),
                c2header = $('#morestylewatch #morestylewatch_2 h3 span').text(),
                c3header = $('#morestylewatch #morestylewatch_3 h3 span').text(),
                c4header = $('#morestylewatch #morestylewatch_4 h3 span').text();
            $('#morestylewatch #morestylewatch_1 li a').each(function() {
                $(this).data('trackheadline', c1header);
            });
            $('#morestylewatch #morestylewatch_2 li a').each(function() {
                $(this).data('trackheadline', c2header);
            });
            $('#morestylewatch #morestylewatch_3 li a').each(function() {
                $(this).data('trackheadline', c3header);
            });
            $('#morestylewatch #morestylewatch_4 li a').each(function() {
                $(this).data('trackheadline', c4header);
            });
        } // end: SW Specific

        $('a.tracklink3').each(function(){
            // Note: this logic / code may be deprecated
            var $this = $(this),
                thisIsPremium = PEOPLE.Article.isPremium($this),
                trackcode = $this.data('trackcode'),
                trackheadline = $this.data('trackheadline'),
                item = trackcode + ' | ' + trackheadline;

            if ( thisIsPremium ) {
                trackheadline = 'Premium: ' + trackheadline;
                if ( PEOPLE.Article.premiumToutArray.indexOf(item) == -1 ) {
                    PEOPLE.Article.premiumToutArray.push(item);
                }
                $this.data('trackheadline', trackheadline);
            }
            $this.bind('click', function(){
                if ( thisIsPremium ) PEOPLE.Article.setPremiumLinkCookie(trackcode, trackheadline);
                linkTrackArt( trackcode, trackheadline );
            });
        });
        PEOPLE.Article.tallyPremiumTouts();

        // Test
        if( PEOPLE.testOmniTrack ) {
            $('.tracklink3').removeAttr('href');
            $('a.tracklink3').css('color','#f00').bind('click', function(trackcode,trackheadline){
                console.log( $(this).data('trackcode') + ' & ' + $(this).data('trackheadline') );
            });
        }
    },
    tallyPremiumTouts: function() {
        if ( typeof omniTrackTout != 'undefined' ) {
            if ( PEOPLE.Article.premiumToutArray.length != 0 ) {
                omniTrackTout( PEOPLE.Article.premiumToutArray.join(';') );
            }
        }
    },
    isPremium: function(el) {
        if ( el.hasClass('premium-link') ||
            el.parent().attr('id') === 'premium-banner' ||
            el.parents('.tout').find('.premium-link').length != 0 ||
            el.parents('.newstout').find('.premium-link').length != 0 ) {
            return true;
        } else {
            return false;
        }
    },
    setPremiumLinkCookie: function(trackcode, trackheadline) {
        var hostname = location.hostname,
            parts = hostname.split('.'),
            subdomain = parts.shift(),
            upperLevelDomain = parts.join('.'),
            value = trackcode + ' | ' + trackheadline;
        docCookies.setItem( 'premium-link-track', value, null, '/', upperLevelDomain );
    },
    removePremiumLinkCookie: function() {
        var hostname = location.hostname,
            parts = hostname.split('.'),
            subdomain = parts.shift(),
            upperLevelDomain = parts.join('.');
        docCookies.removeItem( 'premium-link-track', '/', upperLevelDomain );
    },
    // begin track Article Partners
    trackArticleRecircPartners : function(partnername,partnerdivID) {
        var locationprefix = PEOPLE.Article.getTrackingPrefix(),
            isarticle = false;
        if ( $('body').hasClass('article') || $('body').hasClass('permalink') || $('body').hasClass('single') ) isarticle = true;

        if (isarticle) {
            if(partnerdivID=='HuffingtonPost_rightcolumnrecirc') {
                // HP TV
                $('#HuffingtonPost_rightcolumnrecirc p.header a').data('trackheadline', 'HuffPost TV Logo');
                PEOPLE.Article.omniLinkTrackList([
                    { element: '#right-rail #fromOurPartners_right #HuffingtonPost_rightcolumnrecirc li:eq(0) a', omni_label: 'News_RR_Partners_Partner HuffingtonPostTV', omni_id: $('#right-rail #fromOurPartners_right #HuffingtonPost_rightcolumnrecirc li:eq(0) a').text() },
                    { element: '#right-rail #fromOurPartners_right #HuffingtonPost_rightcolumnrecirc li:eq(1) a', omni_label: 'News_RR_Partners_Partner HuffingtonPostTV', omni_id: $('#right-rail #fromOurPartners_right #HuffingtonPost_rightcolumnrecirc li:eq(1) a').text() },
                    { element: '#right-rail #fromOurPartners_right #HuffingtonPost_rightcolumnrecirc li:eq(2) a', omni_label: 'News_RR_Partners_Partner HuffingtonPostTV', omni_id: $('#right-rail #fromOurPartners_right #HuffingtonPost_rightcolumnrecirc li:eq(2) a').text() }
                ], PEOPLE.testOmniTrack);

            } else if(partnerdivID=='TodayShow_rightcolumnrecircbottom') {
                // Today
                PEOPLE.Article.omniLinkTrackList([
                    { element: '#right-rail #fromOurPartners_right #TodayShow_rightcolumnrecircbottom li:eq(0) a', omni_label: 'News_RR_Partners_Partner TodayShow', omni_id: $('#right-rail #fromOurPartners_right #TodayShow_rightcolumnrecircbottom li:eq(0) a').text() },
                    { element: '#right-rail #fromOurPartners_right #TodayShow_rightcolumnrecircbottom li:eq(1) a', omni_label: 'News_RR_Partners_Partner TodayShow', omni_id: $('#right-rail #fromOurPartners_right #TodayShow_rightcolumnrecircbottom li:eq(1) a').text() },
                    { element: '#right-rail #fromOurPartners_right #TodayShow_rightcolumnrecircbottom li:eq(2) a', omni_label: 'News_RR_Partners_Partner TodayShow', omni_id: $('#right-rail #fromOurPartners_right #TodayShow_rightcolumnrecircbottom li:eq(2) a').text() }
                ], PEOPLE.testOmniTrack);

            } else {
                var partnerRRtoutprefix = locationprefix + 'RR_Partners_',
                    thisRRpartnerId = '#rightCol #'+ partnerdivID;

                if ( $('#rightCol #'+ partnerdivID).length ) {
                    var RRtrackcode = partnerRRtoutprefix + partnername;

                    $(thisRRpartnerId + ' p.header a').addClass('trackRRrecirc').data('trackcode', RRtrackcode).data('trackheadline', 'Logo');

                    $(thisRRpartnerId + ' li a').each(function() {
                        $(this).addClass('trackRRrecirc').data('trackcode', RRtrackcode).data('trackheadline', $(this).text());
                    });
                }

                var thisRRpartnerIdlink = thisRRpartnerId + ' .trackRRrecirc'

                $(thisRRpartnerIdlink).bind('click', function(trackcode,trackheadline){
                    linkTrackArt( $(this).data('trackcode'), $(this).data('trackheadline') );
                });
            }

            // if Footer Recirc
            if ( $('#fromourpartners #partnertouts').length ) {
                // begin: Partner touts
                var partnerFTRtoutprefix = locationprefix + 'Ftr_Partners_';
                var thisFTRpartnerId = '#fromourpartners #partnertouts #'+ partnerdivID;
                if ( $('#fromourpartners #partnertouts #'+ partnerdivID).length ) {
                    var FTRtrackcode = partnerFTRtoutprefix + partnername;

                    $(thisFTRpartnerId + ' p.header a').addClass('trackFTRrecirc').data('trackcode', FTRtrackcode).data('trackheadline', 'Logo');
                    $(thisFTRpartnerId + ' li a').each(function() {
                        $(this).addClass('trackFTRrecirc').data('trackcode', FTRtrackcode).data('trackheadline', $(this).text());
                    });
                }
                var thisFTRpartnerIdlink = thisFTRpartnerId + ' .trackFTRrecirc'
                $(thisFTRpartnerIdlink).bind('click', function(trackcode,trackheadline){
                    linkTrackArt( $(this).data('trackcode'), $(this).data('trackheadline') );
                });
            }
        }
    },

    trackRRHuffPost : function() {

        // Huffington Post
        PEOPLE.Article.omniLinkTrackList([
            { element: '#right-rail #fromOurPartners_right #HuffingtonPost li:eq(0) a', omni_label: 'News_RR_Partners_Partner HuffingtonPost', omni_id: $('#right-rail #fromOurPartners_right #HuffingtonPost li:eq(0) a:eq(1)').text() },
            { element: '#right-rail #fromOurPartners_right #HuffingtonPost li:eq(1) a', omni_label: 'News_RR_Partners_Partner HuffingtonPost', omni_id: $('#right-rail #fromOurPartners_right #HuffingtonPost li:eq(1) a').text() },
            { element: '#right-rail #fromOurPartners_right #HuffingtonPost li:eq(2) a', omni_label: 'News_RR_Partners_Partner HuffingtonPost', omni_id: $('#right-rail #fromOurPartners_right #HuffingtonPost li:eq(2) a').text() }
        ], PEOPLE.testOmniTrack);

    },

    truncateString : function( string, count ) {
        if ( string.length > count ) {
            return string.substring( 0, count ) + '...';
        } else {
            return string;
        }
    },
    inlineTweets : function() {
        var $inlineTweet = $('.inline-tweet');

        $inlineTweet.each(function(){
            var $this = $(this),
                text = $this.find('span').text(),
                length = text.length,
                quoteText = '',
                $link = $this.find('.inline-tweet-link'),
                href = $link.attr('href'),
                textParam;

            quoteText = length > 97 ? PEOPLE.Article.truncateString( text, 97 ) : text;
            textParam = '&text=' + encodeURIComponent(quoteText);
            $link.attr( 'href', href += textParam );
            $this.hover(function(){
                $this.addClass('hover');
            }, function(){
                $this.removeClass('hover');
            });

            // This hack allows us to continue to use the current markup for the proc.
            $this.bind('click', function(){
                $link[0].click();
                omniTrackEv('twitter-inline');
            });
        });
    }
} // PEOPLE.Article

/*******************************************************************************
 * POLLS
 *******************************************************************************/
PEOPLE.ArticlePoll = (function(){
    var RESOURCE_ID,
        BASE_URL,
        POLLS_URL;

    var articlePollsdiv = '',
        articlePollname = '',
        articlePollid = '',
        articlePollquestion = '',
        articlePolltitle = '',
        articleTotalvotes = '',
        articlePollanswers = '';

    // Replace * in Procs with Bold or Italics
    function formatPollText(str) {
        var tempStr = str;
        while(tempStr.indexOf("**") !== -1) {
            var firstPos = tempStr.indexOf("**");
            var nextPos = tempStr.indexOf("**",firstPos + 2);
            if(nextPos !== -1) {
                var innerTxt = tempStr.substring(firstPos + 2,nextPos);
                var strongified = '<strong>' + innerTxt + '</strong>';
                tempStr = tempStr.substring(0,firstPos) + strongified + tempStr.substring(nextPos + 2,tempStr.length);
            } else {
                tempStr = tempStr.replace('**','');
            }
        }
        while(tempStr.indexOf("*") !== -1) {
            var firstPos = tempStr.indexOf("*");
            var nextPos = tempStr.indexOf("*",firstPos + 1);
            if(nextPos !== -1) {
                var innerTxt = tempStr.substring(firstPos + 1,nextPos);
                var italicized = '<em>' + innerTxt + '</em>';
                tempStr = tempStr.substring(0,firstPos) + italicized + tempStr.substring(nextPos + 2,tempStr.length);
            } else {
                tempStr = tempStr.replace('*','');
            }
        }
        return tempStr;
    }

    function createPoll() {
        var articleurl = location.href;
        if (articleurl.match('people.com')) {
            $.getScript('http://jsrails.timeinc.net/j/community.1.1.0.js', function() {
                Poll.init({
                    base_url: "http://profiles.people.com",
                    brand: "People",
                    section: "Polls",
                    article: pollContentId,
                    data_url: "http://www.people.com/people/poll/json/0,," + pollContentId + ",00.js"
                });
                Poll.render_polls();
            });
        } else if (articleurl.match('peoplepets.com')) {
            $.getScript('http://jsrails.timeinc.net/j/community.1.1.0.js', function() {
                Poll.init({
                    base_url: "http://profiles.peoplepets.com/",
                    brand: "PeoplePets",
                    section: "Polls",
                    article: pollContentId,
                    data_url: "/people/pets/poll/json/0,," + pollContentId + ",00.js"

                });
                Poll.render_polls();
            });
        } else if (articleurl.match('peoplestylewatch.com')) {
            $.getScript('http://jsrails.timeinc.net/j/community.1.1.0.js', function() {
                Poll.init({
                    base_url: "http://profiles.peoplestylewatch.com/",
                    brand: "PeopleStyleWatch",
                    section: "Polls",
                    article: pollContentId,
                    data_url: "/people/stylewatch/poll/json/0,," + pollContentId + ",00.js"
                });
                Poll.render_polls();
            });
        }
        PEOPLE.ArticlePoll.createPollOnce = true;
        init(pollContentId);
    }

    function render(data) {//callback on success of requestPoll
        if ( (data.error || data == '') && !PEOPLE.ArticlePoll.createPollOnce ) {//if poll has not yet been created, add boolean to avoid infinite loop
            createPoll();
            return;
        } else if ( (data.error || data == '') && PEOPLE.ArticlePoll.createPollOnce === true ){
            return;
        }
        articlePollsdiv = $('#polls_' + pollContentId);
        articlePollid = data[0].questions[0].poll_id;
        articlePollquestion = data[0].questions[0].id;
        articlePolltitle = data[0].questions[0].text;
        articleTotalvotes = data[0].questions[0].total_vote_count;
        articlePollanswers	= data[0].questions[0].answers;
        var i = 0,
            h = ''
            + '<h4 class="title-main">Take Our Poll</h4>'
            +		'<div class="poll">'
            +			'<form class="pollForm" id="poll_form_' + articlePollid + '" action="#" method="post">'
            +				'<h5>' + articlePolltitle + '</h5>'
            +				'<fieldset>'
            +					'<ul class="polloptions">';
        for(;i<articlePollanswers.length;i++){
            var pollOptionText = '';
            pollOptionText = formatPollText(articlePollanswers[i].text);
            h	+=					'<li>'
                +						'<label for="answer_'+ articlePollanswers[i].id + '"><input type="radio" class="option r' + i + '" value="'+ articlePollanswers[i].id + '" id="answer_'+ articlePollanswers[i].id + '" name="question_'+ articlePollquestion + '"/> <span class="optionText">' + pollOptionText + '</span></label>'
                +					'</li>';
        }
        h	+=					'</ul>'
            +				'</fieldset>'
            +				'<p class="vote"><input class="voteBtn" type="button" value="Vote" onclick="PEOPLE.ArticlePoll.submitPoll('+ articleTotalvotes+ ',' +  articlePollanswers.length +')" /></p>'
            +			'</form>'
            +		'</div>';
        articlePollsdiv.append(h);
    }

    function submitPoll( polltotalvotes,pollanswerlength ) {//insert the poll form, iframe and submit
        var articleURL = location.href,
            pollanswer = $(".articlePoll input:checked").val()
            i = 0,
            results = '<div class="showresults">';

        if ( articleURL.match('people.com') ) {
            document.domain = 'people.com';
            var articlePollbaseURL = 'http://profiles.people.com/brands/People/sections/Polls/articles/';
        }
        if ( articleURL.match('peoplepets.com') ) {
            document.domain = 'peoplepets.com';
            var articlePollbaseURL = 'http://profiles.peoplepets.com/brands/PeoplePets/sections/Polls/articles/';
        }
        if ( articleURL.match('peoplestylewatch.com') ) {
            document.domain = 'peoplestylewatch.com';
            var articlePollbaseURL = 'http://profiles.peoplestylewatch.com/brands/PeopleStyleWatch/sections/Polls/articles/';
        }
        $('.pollForm').remove();	// remove the voting form
        polltotalvotes++;		// increment total votes by 1
        results	+=	'<h5>' + articlePolltitle + '</h5>' + '<ul class="polloptions">';

        // Display results
        for(;i<articlePollanswers.length;i++){
            var pollpercent = 0;
            if (pollanswer == articlePollanswers[i].id) articlePollanswers[i].vote_count++;	// increment selected poll answer by 1
            pollpercent = Math.round((articlePollanswers[i].vote_count/polltotalvotes)*100); // convert results into a percentage
            if (pollpercent < 1) pollpercent = 0;
            results	+=	'<li>'
                +		'<span class="polltext">' + articlePollanswers[i].text + '</span>'
                +		'<div class="resultrow">'
                +			'<div class="barframe"><div class="percentbar" style="width:'+ pollpercent +'%"></div></div>'
                +			'<div class="votepercent">' + pollpercent + '%</div>'
                +			'<div class="votetotal">' + articlePollanswers[i].vote_count + ' votes</div>'
                +			'<div class="clear"></div>'
                +		'</div>' // end .resultrow
                +	'</li>';
        }
        results	+=	'</ul>'
            +		'<div class="resultsrecirc"></div>' //	Add container for any post-vote recirc code
            +		'<div class="clear"></div>'
            +	'</div>'	// end .showresults
            +	'<div style="visibility:hidden;"><form id="submitform" action="'+articlePollbaseURL+pollContentId+'/polls/'+articlePollid+'/vote?add_document_domain=true" target="submitiframe" method="post"><fieldset><input name="poll[votes][]" value="' + pollanswer + '" /><input name="question_'+this.articlePollquestion+'" value="' + pollanswer + '" /></fieldset></form></div>'
            +	'<iframe id="submitiframe" name="submitiframe" border="0" frameborder="0" height="0"></iframe>';
        articlePollsdiv.append(results);
        $('#submitform').submit();
        $('#submitiframe').load(function(){
            var response = $('#submitiframe').contents().find("body").html();
            try { response = eval(response); }
            catch(e) { response = 'Something went wrong! Please, try again!'; }
            if (response == ' ') {
                $('#userform').remove();
                setTimeout(function() { $('#submitform').remove(); $('#submitiframe').remove(); }, 200);
            }
        });
        return false;
    } // end: submitPoll

    function init(pollContentId) {
        var articleURL = location.href,
            articlePollbaseURL = '';
        if (articleURL.match('people.com')) {
            document.domain = 'people.com';
            articlePollbaseURL = 'http://profiles.people.com/brands/People/sections/Polls/articles/';
        }
        if (articleURL.match('peoplepets.com')) {
            document.domain = 'peoplepets.com';
            articlePollbaseURL = 'http://profiles.peoplepets.com/brands/PeoplePets/sections/Polls/articles/';
        }
        BASE_URL = articlePollbaseURL + pollContentId;
        POLLS_URL = BASE_URL + '/polls?add_document_domain=true&callback=PEOPLEArticlePollrender';
        $.getScript(POLLS_URL);
    } // end: init
    return {
        init: init,
        render: render,
        submitPoll: submitPoll
    } // end: return

})();

var PEOPLEArticlePollrender = PEOPLE.ArticlePoll.render;//expose callback for poll request

/*******************************************************************************
 * EMOTICONS / LIKES
 *******************************************************************************/
PEOPLE.ArticleLikes = (function(){
    var emoteFormHTML = '',
        emotePostURL = 'http://polls.people.com/profile/likes.json',
        emoteArticleTitle = '',
        emoteCanonURL = 'http://www.people.com',
        validvote = false,
        currentLikesJSON;

    function init(LikesContentID) {
        var currentLikesCountURL,
            articleURL = location.href;

        // retrieve URL to Flavored Likes Count - do we need to check the domains?
        if ( articleURL.match('people.com') ) document.domain = 'people.com';
        if ( articleURL.match('peoplepets.com') ) document.domain = 'peoplepets.com';
        if ( articleURL.match('peoplestylewatch.com') ) document.domain = 'peoplestylewatch.com';
        if ( articleURL.match('dev-wpcom') ) document.domain = 'timeinc.net'; // wordpress

        currentLikesCountURL = 'http://likes.people.com/flavored_likes/count.json?resource_content_id[]=' + LikesContentID + '&callback=renderArticleLikes';
        $.getScript(currentLikesCountURL);
        emoteArticleTitle = $('h1#articleHeadline').text(); // Get Article Title for "resource[name]"
        emoteCanonURL = location.href; // Get Canonical URL

        // Render hidden form & iframe
        emoteFormHTML	= ''
            + '<form id="likes-submitform" action="'+ emotePostURL +'" method="post" target="likes-submitiframe" style="visibility:hidden; height:1px;">'
            + 	'<fieldset>'
            +		'<input type="hidden" name="add_document_domain" value="true" />'	// this stops IE from asking user to save/download JSON post-submit
            +		'<input name="resource[content_id]" value="' + LikesContentID + '" />'
            +		'<input name="resource[name]" value="' + emoteArticleTitle + '" />'
            +		'<input name="resource[url]" value="' + emoteCanonURL.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
       return '&#'+i.charCodeAt(0)+';';
    }) + '" />'
            +		'<input name="resource[tag_list]" value="undefined" />'
            +		'<input name="section_name" value="Polls" />'
            +		'<input name="resource[category]" value="article" />'
            +		'<input id="likes-submit-flavor" name="flavor" value="" />'
            +	'</fieldset>'
            + '</form>'
            + '<iframe id="likes-submitiframe" name="likes-submitiframe" border="0" frameborder="0" height="0"></iframe>';
        $('.emotes').append(emoteFormHTML);

        // Build container for related headlines
		var relatedHTML =	''
			+	'<div id="reactLinks">'
			+		'<div class="relatedBox">'
			+			'<div id="headerbar_border"><div class="carrot"></div></div>'
			+			'<div class="headerbar clearfix">'
			+				'<h4 class="clearfix"><span class="text">More stories with</span> <span class="icon"></span></h4>'
			+			'</div>'
			+			'<div class="linklist"><ul></ul></div>'
			+			'<p class="moreReact"><a href="">See All</a></p>'
			+		'</div>';
			+	'</div>';
		$('#sharebarBottom').append(relatedHTML);
    }

    function render(data) {
        currentLikesJSON = data;
        var wowcount, angrycount, sadcount, funnycount, lovecount, totalVoteCount, totalVotesHTML;

        // if newly generated Content ID, then set all display counts to 0 since they don't exist yet
        if ( currentLikesJSON == null ) {
            wowcount = 0; angrycount = 0; sadcount = 0; funnycount = 0; lovecount = 0; totalVoteCount = 0;
        } else {
            // content ID exists, but not all the flavors have values yet, so set the empty flavor values to 0
            wowcount 	= (currentLikesJSON.wow >= 1) 	? currentLikesJSON.wow 	 : wowcount   = 0;
            angrycount 	= (currentLikesJSON.angry >= 1) ? currentLikesJSON.angry : angrycount = 0;
            sadcount 	= (currentLikesJSON.sad >= 1) 	? currentLikesJSON.sad 	 : sadcount   = 0;
            funnycount 	= (currentLikesJSON.funny >= 1) ? currentLikesJSON.funny : funnycount = 0;
            lovecount 	= (currentLikesJSON.love >= 1) ? currentLikesJSON.love 	 : lovecount  = 0;
            totalVoteCount = wowcount + angrycount + sadcount + funnycount + lovecount;
        }

        // render appropriate voting text
        //$('#userReaction .totalvotes').html('<strong>vote now!</strong>');
        if (totalVoteCount == 0) { totalVotesHTML = '<strong>vote now!</strong>'; }
        else if (totalVoteCount == 1) { totalVotesHTML = '<strong>1</strong> vote';	}
        else {totalVotesHTML = '<strong>' + totalVoteCount + '</strong> votes';	}

        $('#userReaction .totalvotes').html(totalVotesHTML);
        $('.emotes li.wow .count').text(wowcount);
        $('.emotes li.angry .count').text(angrycount);
        $('.emotes li.sad .count').text(sadcount);
        $('.emotes li.funny .count').text(funnycount);
        $('.emotes li.love .count').text(lovecount);

        // Add hover states
        $('.emotes li').hover(
            function(){$(this).addClass("hover");},
            function(){$(this).removeClass("hover");}
        );

        // add submit function to each flavor
        $('.emotes li.wow').bind('click', function() { omniTrackEv('ec-wow'); submitArticleLike('wow'); });
        $('.emotes li.funny').bind('click', function() { omniTrackEv('ec-lol'); submitArticleLike('funny'); });
        $('.emotes li.love').bind('click', function() { omniTrackEv('ec-love'); submitArticleLike('love'); });
        $('.emotes li.sad').bind('click', function() { omniTrackEv('ec-sad'); submitArticleLike('sad'); });
        $('.emotes li.angry').bind('click', function() { omniTrackEv('ec-angry'); submitArticleLike('angry'); });
    } // end: renderArticleLikes

    function updateLikesCount(){

        // update the totals, highlight selected Flavor count and disable that Flavor from being voted again
        var wowtotal, funnytotal, lovetotal, sadtotal, angrytotal, totalVoteCount, totalVotesHTML;

        // convert counts from source code to integers
        wowtotal = parseInt($('.emotes li.wow .count').text(),10);
        funnytotal = parseInt($('.emotes li.funny .count').text(),10);
        lovetotal = parseInt($('.emotes li.love .count').text(),10);
        sadtotal = parseInt($('.emotes li.sad .count').text(),10);
        angrytotal = parseInt($('.emotes li.angry .count').text(),10);

        // find which flavor(s) has most votes and highlight that number(s)
        var mostvotes = wowtotal;

        if (funnytotal >= mostvotes) mostvotes = funnytotal;
        if (lovetotal >= mostvotes)  mostvotes = lovetotal;
        if (sadtotal >= mostvotes) 	 mostvotes = sadtotal;
        if (angrytotal >= mostvotes) mostvotes = angrytotal;

        if (wowtotal == mostvotes) { $('.emotes li.wow .count').addClass('popular'); }
        if (funnytotal == mostvotes) { $('.emotes li.funny .count').addClass('popular'); }
        if (lovetotal == mostvotes) { $('.emotes li.love .count').addClass('popular'); }
        if (sadtotal == mostvotes) { $('.emotes li.sad .count').addClass('popular'); }
        if (angrytotal == mostvotes) { $('.emotes li.angry .count').addClass('popular'); }

        // Show counts & remove highlight after a slight delay
        $('.emotes').removeClass('firstvote');
        $('.emotes li').unbind('click');
        $('.emotes ul').addClass('voted');
        $('.emotes li .count').show();
        setTimeout(function(){
            $('.emotes li .count').removeClass('highlight');
        }, 400);

        totalVoteCount = parseInt($('#userReaction .totalvotes strong').text(),10);
        if( isNaN(totalVoteCount) ) totalVoteCount = 0;
        totalVoteCount = totalVoteCount+1;

        // get new vote count and update total vote count on page
        totalVotesHTML = (totalVoteCount == 1) ? '<strong>1</strong> vote' : '<strong>'+totalVoteCount+'</strong> votes';

        $('#userReaction .totalvotes').html(totalVotesHTML);
    } // end: updateLikesCounts

    function submitArticleLike(flavor) {
        // Checks to make sure the counts only increments by one to the end user.
        if (validvote == false) {
            // cache for Rails call
            // $.ajaxSetup({cache: true});
            // $.getScript('http://likes.people.com/flavored_likes/count.json?resource_content_id[]=' + LikesContentID + '&callback=renderCounts');

            // Pass the selected Flavor name to the Submit Form
            $('#likes-submitform input#likes-submit-flavor').val(flavor);
            $('#likes-submitform').submit();

            // Increase selected flavor vote by 1 to the end user
            var updatetotal = parseInt($('.emotes li.' + flavor + ' .count').text(),10);
            updatetotal = updatetotal+1;
            $('.emotes li.' + flavor + ' .count').text(updatetotal);
            updateLikesCount();
            $('.relatedBox p.sharestory a').each(function() {
                $(this).click(function() {
                    postToFacebook($(this).attr('href').split('=')[1]);
                    PEOPLE.Omniture.recordFacebookShare();
                    return false;
                });
            });

            // get related headlines & append correct theme to module
            var popularFeedURL = 'http://likes.people.com/popular.json?score=flavored_likes&hours_ago=24&limit=20&section_name=likes&flavor='+flavor+'&callback=renderRelatedHeadlines';
            $.getScript(popularFeedURL);
            $('#reactLinks .relatedBox').addClass(flavor).attr('data-flavor',flavor);
            $('#reactLinks .relatedBox h4 span.icon').text(flavor);
            $('#reactLinks .relatedBox p.moreReact a').attr('href','http://www.people.com/people/static/h/readerreact/?feeling='+flavor);

            // add 170x30 ad call
            $('#reactLinks .' + flavor + ' .headerbar').append('<div id="reactAd170x30"><iframe src="http://www.people.com/people/static/h/ads/adFactory-react.html?flavor='+flavor+'" border="0" frameborder="0" hspace="0" vspace="0" marginheight="0" marginwidth="0" allowtransparency="yes"></iframe></div>');
            validvote = true;
        }
        switch (flavor) {
            case 'wow':
                $('.emotes li.wow .count').addClass('highlight');
                $('.emotes li.wow').addClass('chosen');
                break;
            case 'funny':
                $('.emotes li.funny .count').addClass('highlight');
                $('.emotes li.funny').addClass('chosen');
                break;
            case 'love':
                $('.emotes li.love .count').addClass('highlight');
                $('.emotes li.love').addClass('chosen');
                break;
            case 'sad':
                $('.emotes li.sad .count').addClass('highlight');
                $('.emotes li.sad').addClass('chosen');
                break;
            case 'angry':
                $('.emotes li.angry .count').addClass('highlight');
                $('.emotes li.angry').addClass('chosen');
                break;
        }
        $('#reactLinks .' + flavor).slideDown("slow"); // display related box (removed from code for now)
    } // end: submitArticleLike

    function renderRelatedHeadlines(data) {
        var linksboxHTML = '',
            headlineCount = 0;
        $.each(data, function(index, element) {
            if (headlineCount<3) { // show related link if it does not match current article ID
                if ( !(element.resource.content_id == LikesContentID) ) {
                    linksboxHTML +=	'<li><a title="'+element.resource.name+'" href="'+element.resource.url+'">'+element.resource.name+'</a></li>';
                    headlineCount++;
                }
            }
        });
        $('#reactLinks .relatedBox ul').append(linksboxHTML);
        var currentFlavor = $('#reactLinks .relatedBox').attr('data-flavor');

        // Tracking
        PEOPLE.Article.omniLinkTrackList([
            { element: '#reactLinks .linklist a:eq(0)', omni_label: 'News_Ctr_React_1', omni_id: $('#reactLinks .linklist a:eq(0)').attr('title') },
            { element: '#reactLinks .linklist a:eq(1)', omni_label: 'News_Ctr_React_2', omni_id: $('#reactLinks .linklist a:eq(1)').attr('title') },
            { element: '#reactLinks .linklist a:eq(2)', omni_label: 'News_Ctr_React_3', omni_id: $('#reactLinks .linklist a:eq(2)').attr('title') },
            { element: '#reactLinks .moreReact a'     , omni_label: 'News_Ctr_React_4', omni_id: 'See All' }
        ], PEOPLE.testOmniTrack);
    } // end: renderRelatedHeadlines
    return {
        init: init,
        renderRelatedHeadlines : renderRelatedHeadlines,
        render: render
    }
})();

var renderArticleLikes     = PEOPLE.ArticleLikes.render;
var renderRelatedHeadlines = PEOPLE.ArticleLikes.renderRelatedHeadlines;

/*******************************************************************************
 * Image Zoom
 *******************************************************************************/
function initZoom() {
    var fullPageHeight = $('html').height(),
        bodyHeight = $('body').height();
    // in IE, html height is rendering as viewport height, while body height is
    // actual page height, so am checking and using which number is greater
    if (fullPageHeight < bodyHeight) fullPageHeight = bodyHeight;
    $('#leftCol .zoom a').each(function(){
        var zoomImageURL = $(this).attr('href');
        $(this).bind('click',function(){
            omniTrackEv('UA: enlarge');
            showZoom(zoomImageURL, fullPageHeight);
            return false;
        });
    });
}
function showZoom(imgPath, pageHeight){
    var overlayHTML = '';
    overlayHTML	= ''
        + '<div class="image-zoom">'
        +	'<div class="zoom-wrapper">'
        +		'<div class="image"><a title="Click to Close" onclick="closeZoom();"><img src="' + imgPath + '" /></a></div>'
        +		'<div class="btn-close"><a onclick="closeZoom();">Close</a></div>'
        +		'<div class="clear"></div>'
        +	'</div>'
        + '</div>';
    $('body').addClass('overlay').append(overlayHTML);
    $('body.overlay .image-zoom').css('height',pageHeight+'px');

    // hide the ads so it won't appear on top of the overlay
    $('.ad300').hide();
    $('.adRight').hide();
    $('#adTop').hide();
    $('#adMarketplaceAds').hide();
    $('#videoTout .videoArea').hide();

    // scroll overlay to top of page so user can see image from the top and the close button
    $('html, body').animate({ scrollTop:0 },500);

    // clicking anywhere on the overlay will close it
    $('.image-zoom').bind('click',function() { closeZoom(); });
    return false;
}
function closeZoom(){
    $('.image-zoom').remove();
    $('body').removeClass('overlay');
    $('.ad300').show();
    $('.adRight').show();
    $('#adTop').show();
    $('#adMarketplaceAds').show();
    $('#videoTout .videoArea').show();
    return false;
} // end: closeZoom

/*******************************************************************************
 * Group narrow main photos (320px and smaller) & celeb DB into a container DIV.
 * This is a fix where article text is not wrapping around the photo/celebDB
 * touts correctly if photo side is narrower than the text side.
 *******************************************************************************/

function groupMainPhotoCelebDB() {
//    var photoWidth = $('#mainPhoto .image img').width(),
//        groupWidth = photoWidth + 18;	// adding 18px for the #mainPhoto right margin (from css)
//
//    if ((photoWidth <= 320) && ($('#relatedCeleb').length)) {
//        var photoHTML = $('#mainPhoto').clone(),
//            celebHTML = $('#relatedCeleb').clone();
//	celebHTML.find('script').remove();
//        $('#mainPhoto').remove();
//        $('#relatedCeleb').remove();
//
//        // if photos <= 300px, then container div is 318px (to account for width of celebDB bar)
//        if (photoWidth <= 300) {groupWidth = 318;}
//
//        $('#articleBody').before('<div id="photo-celeb-group" style="width:' +groupWidth+ 'px;"></div>');
//        $('#photo-celeb-group').append(photoHTML);
//        $('#photo-celeb-group').append(celebHTML);
//    }
}

/*******************************************************************************
 * Top Stories Carousel
 *******************************************************************************/
function initTopStories() {
    var $topStoriesArea = $('#topStoriesArea'),
        $topStoriesSlider = $('#topStoriesSlider'),
        $topStoriesTouts = $('#topStoriesTouts'),
        $wrapper = $('#wrapper'),
        $window = $(window),
        mainSlider = null,
        loaded = false;

    if ($topStoriesArea.length) {
        if ($('body').hasClass('article')) {
            $topStoriesSlider.find('#article' + article_oid).addClass('current');
            $topStoriesSlider.find('#article' + article_oid).parent().remove();
        }

        // flag the correct position (start at 1) of the tout for link tracking purposes
        for (i=0; i < $topStoriesArea.find('newstout').length; i++) {
            $topStoriesArea.find('.newstout').eq(i).addClass('toutpos'+ i);
        }

        function loadSlider() {
            var winWidth = $window.width(),
                options,
                hoverable = $topStoriesArea.hasClass('hoverable') ? true : false,
                isWider = winWidth > 994 && hoverable;

            if ( mainSlider != null ) mainSlider.destroySlider();

            if ( isWider ) {
                // Calculate negative offset.
                var leftOffset = -( ( winWidth - $wrapper.outerWidth() ) / 2 );

                $topStoriesArea.width( winWidth - 22 );
                $topStoriesArea.css({
                    position: 'absolute',
                    left: leftOffset,
                    top: 0
                });

                $wrapper.css('padding-top', '97px');
                $topStoriesSlider.width('100%');
            } else {
                $topStoriesArea.width(972);
                $topStoriesArea.css({
                    position: 'relative',
                    left: 0,
                    top: 0
                });
                $wrapper.css('padding-top', 0);
                $topStoriesSlider.width(972);
            }

            var minMax = Math.ceil($topStoriesSlider.width() / 298);

            options = {
                infiniteLoop: hoverable,
                hideControlOnEnd: true,
                speed: 500,
                minSlides: minMax,
                maxSlides: minMax,
                nextSelector: null,
                prevSelector: null,
                responsive: true
            };

            mainSlider = $topStoriesTouts.bxSlider(options);

            if ( loaded === false ) {
                // Fade in a visibility hidden element.
                $topStoriesArea.css('visibility','visible').hide().fadeIn(500, function() {
                    $(this).css('filter', 0);
                });
                loaded = true;
            }

            var $prev = $topStoriesArea.find('a.bx-prev'),
                $next = $topStoriesArea.find('a.bx-next');

            if ( isWider ) {
                $prev.css('left', winWidth - 50);
                $next.css('left', winWidth - 50);
            } else {
                $prev.css('left', 935);
                $next.css('left', 935);
            }

            // make sure it starts at first slide after ad call loads
            mainSlider.goToSlide(0);
            $('#topStoriesArea.hoverable').hover(function(){
                $(this).addClass('hover');
            }, function(){
                $(this).removeClass('hover');
            });
        }
        $window.smartresize(function(){
            loadSlider();
        }, 100);
        loadSlider();
    }
}

/*****************************************************************************
 * Floating Mini Header
 *****************************************************************************/
PEOPLE.floatingHeader = function() {
    var $win = $(window);

    $win.scroll(function(){
        var scrollTop = $win.scrollTop(),
            winScrollDistance = parseInt(scrollTop),
            $headline = $('#articleHeadline'),
            $floatingHeader = $('#floating-header');
        if ( winScrollDistance >= $headline.offset().top ) $floatingHeader.fadeIn();
        else $floatingHeader.hide();
    });

    // Track It
    PEOPLE.Article.omniUserEventList([
        { element: '#floating-header .floating-header-logo'       , omni_id: "sticky-header-logo"      },
        { element: '#floating-header .floating-header-fb'         , omni_id: "sticky-header-facebook"  },
        { element: '#floating-header .floating-header-twitter'    , omni_id: "sticky-header-twitter"   },
        { element: '#floating-header .floating-header-instagram'  , omni_id: "sticky-header-instagram" },
        { element: '#floating-header .floating-header-newsletters', omni_id: "sticky-header-email"     },
        { element: '#floating-header .floating-header-subscribe'  , omni_id: "sticky-header-subscribe" }
    ], PEOPLE.testOmniTrack);
}

/*******************************************************************************
 * Inline Gallery
 *******************************************************************************/
function initInlineGallery() {

    if ($('#articleGalleryArea').length) {
        // add a 'Slide Show' sticker:
        $('#articleGallerySlider').append('<div id="slideshow-sticker">Slide Show</div>');
        $('#articleGalleryTouts').bxSlider({
            infiniteLoop: false,
            hideControlOnEnd: true,
            speed: 0,					// integer - in ms, duration of time slide transitions will occupy
            displaySlideQty: 1,
            moveSlideQty: 1,
            // if not infiniteLoop & hiding controls on end, then nextSelector & prevSelector must be set to NULL:
            nextSelector: null,
            prevSelector: null
            // if infiniteLoop, controls will appear in these selectors already on page (use these instead of NULL above)
            //	nextSelector: '#articleGallery-next',
            //	prevSelector: '#articleGallery-prev'
        });
    }
    // track the nav buttons
    $('#articleGalleryArea a.bx-prev').bind('click',function(){
        omniTrackEv('UA: photo carousel scroll');
    });
    $('#articleGalleryArea a.bx-next').bind('click',function(){
        omniTrackEv('UA: photo carousel scroll');
    });
}

/*******************************************************************************
 * Reorder Most Recent News Module and hiding current tout
 *******************************************************************************/
function reorderRecentNews() {
    if ($('body').hasClass('article')) $('#recentNews .article' + article_oid).remove();

    // Add extra class to identify each tout
    for (i=0; i < $('#recentNews .tout').length; i++) {
        if (i % 2 == 0){
            $('#recentNews .tout').eq(i).addClass('left');
        } else{
            $('#recentNews .tout').eq(i).addClass('right');
        }
    }
    $('#recentNews .tout.right').after('<div class="clear"></div>');

    // if current tout is not on the page and there are 5 displaying, then hide the last tout
    var x = $('#recentNews .toutArea .tout').length;
    if (x == 5) $('#recentNews .toutArea .tout').eq(4).hide();
}

// setting CM type to "articlecontext" by default
var digMagCMType = "articlecontext";

/*******************************************************************************
 * PEOPLE.Article.inlineNewsletter
 *******************************************************************************/
PEOPLE.Article.inlineNewsletter = function() {
    /* -----------------------------------------
     @NAME		: Article Newsletter Signup
     @TICKET	: 3042
     @CREATED	: 5/14/2014
     @AUTHOR	: Giancarlo Morillo
     @EMAIL		: gmorillo@levelg.com
     @REQ.		: PEOPLE.plugin_cheetah_form(args, calback) /static/j/main.js
     @SCOPE		: V6, WP, Mobile & Desktop (Sitewide)
     @TEST		: /static/h/test/plugins/cheetah_form.html
     -------------------------------------------- */
    if( $('#newsletter_signup_article').length ) {
        var $container  = $('#newsletter_signup_article'),
            source_id   = $container.attr('data-source') ? $container.attr('data-source') : 'wmblayer',
            fsub_data   = $container.attr('data-fsub') ? $container.attr('data-fsub') : 1591168968,
            article_newsletter_form = new PEOPLE.plugin_cheetah_form({
                container	: $container,
                name		: 'article-newsletter',
                source		: source_id,
                n			: 30,
                property_id	: 1709726180,
                fsub		: fsub_data,
                submit_track: 'article-newsletter-submit'
            });
    }
};

/*******************************************************************************
 * PEOPLE.Article.justForYou
 *******************************************************************************/
PEOPLE.Article.justForYou = function() {
    function isRoomForModule() {
        var extra = 410,
            leftHeight = $('#leftCol').height() - extra,
            rightHeight = $('#right-rail').height();
        return leftHeight > rightHeight;
    }
    setTimeout(function(){
        if ( isRoomForModule() ) {
            $('#just-for-you').fadeIn();
        }
    }, 500);
    // Tracking
    PEOPLE.Article.omniLinkTrackList([
        { element: '#just-for-you li a:eq(0)', omni_label: 'News_RR_JFU_1', omni_id: $('#just-for-you li a:eq(0)').text() },
        { element: '#just-for-you li a:eq(1)', omni_label: 'News_RR_JFU_2', omni_id: $('#just-for-you li a:eq(1)').text() },
        { element: '#just-for-you li a:eq(2)', omni_label: 'News_RR_JFU_3', omni_id: $('#just-for-you li a:eq(2)').text() },
        { element: '#just-for-you li a:eq(3)', omni_label: 'News_RR_JFU_4', omni_id: $('#just-for-you li a:eq(3)').text() },
        { element: '#just-for-you li a:eq(4)', omni_label: 'News_RR_JFU_5', omni_id: $('#just-for-you li a:eq(4)').text() },
        { element: '#just-for-you li a:eq(5)', omni_label: 'News_RR_JFU_6', omni_id: $('#just-for-you li a:eq(5)').text() }
    ], PEOPLE.testOmniTrack);
}

/*******************************************************************************
 * PEOPLE.Article.shareArticle
 *******************************************************************************/
PEOPLE.Article.shareArticle = function(element, image) {
	var share_type, url, track_val;
	
	// Facebook 
	if( $(element).hasClass('fb_button') ) {
		url 	   = 'http://www.facebook.com/share.php?u='+PEOPLE.article_url;
		share_type = 'facebook';
		
	// Twitter
	} else if( $(element).hasClass('tweet_button') ) {
		
		share_type = 'tweet';
		url = 'http://twitter.com/share?url='+PEOPLE.article_url+'&text='+encodeURIComponent(PEOPLE.article_title);
		
		var this_url = PEOPLE.article_url;
		
		if ( this_url.match('celebritybabies') || this_url.match('peoplecbb') ){
			url += '&via=PEOPLEbabies';
		}
		else if ( this_url.match('greatideas') ){
			url += '&via=GreatIdeas';
		}
		else if ( this_url.match('redcarpet') ){
			url += '&via=PEOPLERedCarpet';
		}
		else if ( this_url.match('pets') ){
			url += '&via=PEOPLEPets';
		}
		else {
			url += '&via=People';
		}
		
	// Pinterest
	} else if( $(element).hasClass('pin_button') ) {
		url 	   ='http://pinterest.com/pin/create/button/?url='+PEOPLE.article_url+'&media='+image+'&description='+encodeURIComponent(PEOPLE.article_title)+' '+PEOPLE.article_url;
		share_type = 'pinterest';
		
	// G-Plus
	} else if( $(element).hasClass('gplus_button') ) {
		url 	   ='https://plus.google.com/share?url='+PEOPLE.article_url;
		share_type = 'googleplus';
		
	// Tumblr
	} else if( $(element).hasClass('t_button') ) {
		url 	   ='http://www.tumblr.com/share/link?url='+PEOPLE.article_url+'&name='+PEOPLE.article_title+'&description='+PEOPLE.article_desc;
		share_type = 'tumblr';
		
	// Stumble Upon
	} else if( $(element).hasClass('su_button') ) {
		url 	   ='http://www.stumbleupon.com/submit?url='+PEOPLE.article_url+'&title='+PEOPLE.article_title;
		share_type = 'stumbleupon';
	}
	openShareWindow( $(element).selector,share_type, url, image );
	
	// Open Share Window
	function openShareWindow(anchor, title, url, custom_image) {
		if(custom_image!=PEOPLE.article_image){ // NOTE: FB does not allow dynamic updating of og:image
			$orig_og_image = $('meta[property="og:image"]').attr('content');
			$this_og_image = custom_image;
			$('meta[property="og:image"]').attr('content', $this_og_image);
		}
	    var frame_width		= 550,
			frame_height	= 300,
			left_offset = (screen.width/2)-(frame_width/2),
			top_offset  = (screen.height/2)-(frame_height/2),
			options = 'toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=1, copyhistory=0, ';
			options += 'width='+frame_width+', height='+frame_height+', top='+top_offset+', left='+left_offset;
		var win = window.open( url, title, options ); 
	    var interval = window.setInterval(function() {
	        try {
	            if (win == null || win.closed) {
	                window.clearInterval(interval);
					if(custom_image!=PEOPLE.article_image) $('meta[property="og:image"]').attr('content',$orig_og_image);
	            }
	        } catch (e) { }
	    }, 1000);
	}
};

/*******************************************************************************
 * PEOPLE.Article.sharing
 *******************************************************************************/
PEOPLE.Article.sharing = function() {
	if($('#sharebarTop').length) {
        // Format Count
		function m(n,d){
			x=(''+n).length,p=Math.pow,d=p(10,d);
			x-=x%3;
			return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3];
		}
		// OneBot Share Url
        function oneBotURL() {
            var onebot_url = '//cdn.api.onebot.timeinc.com/stats/com/';
            if( location.href.match(/peoplestylewatch.com/) ) {
                onebot_url += 'peoplestylewatch.min.js';
            } else if( location.href.match(/peoplepets.com/) ) {
                onebot_url += 'peoplepets.min.js';
            } else {
                onebot_url += 'people.min.js';
            }
            return onebot_url;
        }
        // Gather OneBot Data & Display
        var $shareCount     = $('#sharebarTop .socmedia .share_count'),
            $shareCountSpan = $('#sharebarTop .socmedia .share_count span');
		$.get(oneBotURL(), function () {
		    var config = {
	           debug : false,
	           service : 'f t p',
	           resultHandler : function (responseResult) {
				   var total_shares = parseInt(responseResult[0]['total']);
				   if(total_shares == 1) {
					   var new_copy = $shareCount.html().replace('SHARES','SHARE');
					   $shareCount.html(new_copy);
				   } else if(total_shares > 999) total_shares = m(total_shares,1);
                   $shareCountSpan.html(total_shares);
                   if( total_shares.length == 4 ) $shareCountSpan.css('font-size','36px');
                   if( total_shares.length >= 5 ) $shareCountSpan.css('font-size','31px');
	           },
	           urlArr :[ decodeURIComponent(PEOPLE.article_url) ],
	           async: true,
	           errorHandler: function (status) {
	               console.log(status);
	           },
	           ajaxErrorHandler :  function(jqXHR, textStatus, errorThrown) {
	               console.log("Request Failed: "+textStatus+"-"+errorThrown);
	           }
	        }    
	        Onebot.count.get(config);
		});
        // Hide comments link if we do not have disqus and we are not on WordPress.
        if( !($('#disqusArea').length) && !$('body').hasClass('permalink') && !$('body').hasClass('single') ) {
            $('.socmedia .comment_button').hide();
        }
        // Share Binding
        $('#sharebarTop .social-button, #sharebarBottom .social-button').click(function(e){
            e.preventDefault();
            PEOPLE.Article.shareArticle( $(this), PEOPLE.article_image );
        });
        // Tracking
        PEOPLE.Article.omniUserEventList([
            // Track It - Top
            { element: '#sharebarTop .fb_button'     , omni_id: "fb-share"         },
            { element: '#sharebarTop .tweet_button'  , omni_id: "twitter"          },
            { element: '#sharebarTop .pin_button'    , omni_id: "pinterest-pinit"  },
            { element: '#sharebarTop .gplus_button'  , omni_id: "google+1-top"     },
            { element: '#sharebarTop .t_button'      , omni_id: "tumblr"           },
            { element: '#sharebarTop .su_button'     , omni_id: "stumbleupon"      },
            { element: '#sharebarTop .reprint_button', omni_id: "reprint"          },
            // Track It - Bottom
            { element: '#sharebarBottom .fb_button'   , omni_id: "fb-share-bottom" },
            { element: '#sharebarBottom .tweet_button', omni_id: "twitter-bottom"  }
        ], PEOPLE.testOmniTrack);
	}
};

/*******************************************************************************
 * PEOPLE.Article.secondaryImageSharing
 *******************************************************************************/
PEOPLE.Article.secondaryImageSharing = function() {
    // Share Binding
	$('.secondary-img .photo_sharing button').click(function(e){
		e.preventDefault();
		var this_og_image_src = $(this).parent().parent().parent().parent().parent().find('img').attr('src');
        PEOPLE.Article.shareArticle( $(this), this_og_image_src );
	});
    // Tracking
    PEOPLE.Article.omniUserEventList([
        { element: '.secondary-img .fb_button'   , omni_id: "fb-share-img"  },
        { element: '.secondary-img .tweet_button', omni_id: "twitter-img"   },
        { element: '.secondary-img .pin_button'  , omni_id: "pinterest-pinit-img" }
    ], PEOPLE.testOmniTrack);
};

/*******************************************************************************
 * Previous/next arrows
 *******************************************************************************/
PEOPLE.Article.previousNext = function() {
    var $window = $(window),
        articleDate = PEOPLE.News.articledate ? PEOPLE.News.articledate : null,
        articleId = PEOPLE.articleid ? PEOPLE.articleid : null,
        url = '/people/article/v2/navigation/0,,' + articleDate + ',00.json';
    if ( articleDate === null || articleId === null  ) return;
    $.ajax({
        url: url,
        success: processFeed
    });
    function processFeed(data) {
        for ( var i = 0; i < data.length; i++ ) {
            var current = data[i],
                currentId = current.article_id,
                prev,
                next;
            if ( currentId == articleId ) {
                // Feed is in reverse chronological order.
                prev = data[i + 1] ? data[i + 1] : null;
                next = data[i - 1] ? data[i - 1] : null;
                return appendPreviousNext(prev, next);
            }
        }
    }
    function appendPreviousNext(prev, next) {
        if ( prev != null ) {
            var prevMarkup = ''
                + '<div class="prev-next-arrow prev">'
                +   '<a class="hoverable clearfix" href="'+prev.path+'">'
                +       '<img src="'+prev.image+'" width="75" height="75"/>'
                +       '<span class="eyebrow">Previous Story</span>'
                +       '<span class="headline">'+prev.headline+'</span>'
                +   '</a>'
                + '</div>';
            $('body').append(prevMarkup);
        }
        if ( next != null ) {
            var nextMarkup = ''
                + '<div class="prev-next-arrow next">'
                +   '<a class="hoverable clearfix" href="'+next.path+'">'
                +       '<img src="'+next.image+'" width="75" height="75"/>'
                +       '<span class="eyebrow">Next Story</span>'
                +       '<span class="headline">'+next.headline+'</span>'
                +   '</a>'
                + '</div>';
            $('body').append(nextMarkup);
        }
        showHidePreviousNext();
        $window.smartresize(function(){
            showHidePreviousNext();
        }, 100);
        // Tracking
        PEOPLE.Article.omniLinkTrackList([
            { element: '.prev-next-arrow.prev', omni_label: 'News_Ctr_Prev', omni_id: 'Article Pagination - Bottom' },
            { element: '.prev-next-arrow.next', omni_label: 'News_Ctr_Next', omni_id: 'Article Pagination - Bottom' }
        ], PEOPLE.testOmniTrack);
    }
    function showHidePreviousNext() {
        if ( $window.width() >= 1300 ) {
            $('.prev-next-arrow').fadeIn();
        } else {
            $('.prev-next-arrow').hide();
        }
    }
};

/*******************************************************************************
 * PEOPLE.Article.rightRailSocialModule
 *******************************************************************************/
PEOPLE.Article.rightRailSocialModule = function() {
    if( $('#rail-social-module').length ) {
        // Bind Buttons
        $('#rail-social-module .social-button').on('mouseover', function() {
            var classes = $('#rail-social-module').attr('class').replace(/selected-[a-zA-Z0-9_]*/g, '');
            var selected_option = $(this).data('option');
            $('#rail-social-module').attr('class', classes).addClass('selected-' + selected_option);
        });
        // Init Form
        var $container  = $('.newsletter_panel'),
            $parent     = $('#rail-social-module'),
            source_id   = $parent.attr('data-source') ? $parent.attr('data-source') : 'wmblayer',
            fsub_data   = $parent.attr('data-fsub')   ? $parent.attr('data-fsub')   : 1591168968,
            article_newsletter_form = new PEOPLE.plugin_cheetah_form({
                container	: $container,
                name		: 'right-rail-newsletter',
                source		: source_id,
                n			: 30,
                property_id	: 1709726180,
                fsub		: fsub_data,
                submit_track: 'right-rail-newsletter-submit'
            });
    }
};

/*******************************************************************************
 * To be removed  : added on 3/10/2016
 *******************************************************************************/
PEOPLE.Article.injectBC = function() {

    var bc_inject_script = document.createElement('script');
    bc_inject_script.setAttribute('src',  'http://cdn-img.people.com/emstag/static/video-elm-inject.js');
    document.head.appendChild(bc_inject_script);
}

/*******************************************************************************
 * PEOPLE.Article.initGlobals
 *******************************************************************************/
PEOPLE.Article.initGlobals = function() {
    // Gather Data
    //PEOPLE.article_url   = $('meta[name="CANONICAL_URL"]').attr('content') ? $('meta[name="CANONICAL_URL"]').attr('content') : window.location.href;
	PEOPLE.article_url   = $('link[rel=canonical]').attr('href') ? $('link[rel=canonical]').attr('href') : window.location.href;
    PEOPLE.article_desc  = $('meta[name="DESCRIPTION"]').attr('content') ? $('meta[name="DESCRIPTION"]').attr('content') : $('#articleHeadline').html();

    if( $('meta[property="og:title"]').attr('content') ){
        PEOPLE.article_title = $('meta[property="og:title"]').attr('content');
    } else if($('meta[name="HEADLINE_TOUT"]').attr('content')) {
        PEOPLE.article_title = $('meta[name="HEADLINE_TOUT"]').attr('content');
    } else if($('meta[name="HEADLINE"]').attr('content')) {
        PEOPLE.article_title = $('meta[name="HEADLINE"]').attr('content');
    }
	
    PEOPLE.article_image = $('meta[property="og:image"]').attr('content') ? $('meta[property="og:image"]').attr('content') : 'http://img2.timeinc.net/people/static/i/nav/logo-people.png';

    // Escape Data
    PEOPLE.article_url   = encodeURIComponent(PEOPLE.article_url);
    PEOPLE.article_desc  = encodeURIComponent(PEOPLE.article_desc);
    PEOPLE.article_image = encodeURIComponent(PEOPLE.article_image);
    // escape title ?

    PEOPLE.testOmniTrack = false;  // this may need to move to main for global site config...
};

/*******************************************************************************
 * PEOPLE.Article.responsiveAds
 *******************************************************************************/
PEOPLE.Article.responsiveAds = function() {
    function updateDisplay() {
        var winWidth = $(window).width(),
            subscribeButton = $('#sharebarTop .subscribe_button'),
            subscribeCopy, subscribeWidth;
        subscribeCopy = winWidth>1184 ? 'subscribe now' : 'subscribe';
        subscribeWidth= winWidth>1184 ? 116 : 74;
        subscribeButton.text(subscribeCopy);
        subscribeButton.width(subscribeWidth);
    }
    $(window).resize( function() { updateDisplay(); } );
    updateDisplay();
};

/*******************************************************************************
 * PEOPLE.Article.latestModule
 *******************************************************************************/
PEOPLE.Article.latestModule = function() {
    function deDupe() {
		var deDupePos,
			isWordPress = $('body').hasClass('permalink') || $('body').hasClass('single-post');

		if (!isWordPress) {
			// add unique class ID for each tout
			$('#the-latest .tout').each(function(){
				var aid = $(this).attr('data-aid');
				$(this).addClass('latest-'+aid);
			});
			// get the position of the tout that needs to be de-duped
			for (i=0; i < $('#the-latest .tout').length; i++) {
				var thisAID = $('#the-latest .tout').eq(i).attr('data-aid');
				if (article_oid == thisAID) {
					deDupePos = i;
				}
			}
			// remove the duplicate tout & replace with the last tout in the module
			$('#the-latest .tout').eq(deDupePos).replaceWith( $('#the-latest .tout').eq(4) );
		}

		// Add extra class to identify each tout
		for (i=0; i < $('#the-latest .tout').length; i++) {
			if (i % 2 == 0){
				$('#the-latest .tout').eq(i).addClass('left');
			} else{
				$('#the-latest .tout').eq(i).addClass('right');
			}
		}
	
		// if current tout is not on the page and there are 5 displaying, then hide the last tout
		var x = $('#the-latest .tout').length;
		if (x == 5) $('#the-latest .tout').eq(4).hide();		
    }
    deDupe();
};

PEOPLE.Article.addImageClasses = function() {
    var $imgCont = $('#articleBody').find('.imgcont');

    $imgCont.each(function(){
        var $this = $(this),
            // Use width attribute by default or calculated width if no attribute is present.
            imgWidth = $this.find('img').attr('width') ? $this.find('img').attr('width') : $this.find('img').width(),
            imgClass = 'img' + imgWidth;

        $this.addClass(imgClass);
    });
}

// Change Star Tracks label in Great Ideas to say "Photo Special" (PEOP-4286)
PEOPLE.Article.greatIdeasRightRail = function(){
	$('#greatideas #right-rail .misc-sticker').each(function(){
		var stickerText = $(this).text();
	
		if (stickerText == 'Star Tracks') {
			$(this).text('Photo Special');
		}
	});
}

PEOPLE.Article.loadZergnet = function() {
    $.getScript('http://www.zergnet.com/zerg.js?id=22408');
}

PEOPLE.Article.stickyAd= function() {

    //height of top-ad
    var top_ad_height= $('#article-top-ad').height() - 1;

    //distance from the second ad that the first ad should retract.
    var distance_from_right_rail_ad= 100;

    //distance of right-rail ad from top of screen
    var right_rail_ad_offset= $('#right-rail-ad-1').offset().top;

    var right_rail_ad_offset = right_rail_ad_offset - top_ad_height - distance_from_right_rail_ad;

    var screen_width= $('body').width();  

    var scrollMarker= $('#page-header-scroll-marker').offset().top;

    var isSticky= false;

    var distanceScrollTop= 0,
        lastScrollTop = 0;

	window.addEventListener("scroll",stickCallback,false); 

    function stickCallback(){
        var scrollTop = $(window).scrollTop(),
            winScrollDistance = parseInt(scrollTop),
            hasBreakingNews = $('#page-breaking-news-outer').length != 0;


        //want to supress the fixed class from being added by main.js
        if(winScrollDistance > scrollMarker) {

            if(hasBreakingNews){
          
                $('#page-breaking-news-outer').removeClass('fixed');
          
            }else{

                $('#nav-outer').removeClass('fixed');

            }  
        }   

        if((winScrollDistance < (scrollMarker + 100)) && isSticky == true){

            $('#article-top-ad').css('position', 'relative');
            $('#article-top-ad').css('left', '0');
            $('#article-top-ad').css('top', '0px');
            $('#article-top-ad').css('background', 'none');
            $('#article-top-ad').css('border', 'none');
            $('#article-top-ad').css('width', 'auto');
            $('#article-top-ad').css('border-bottom-width', '1px');

            //either breaking news or normal nav returns
                if(hasBreakingNews){     

                    $('#page-breaking-news-outer').css('opacity', '0');
                    $('#page-breaking-news-outer').addClass('fixed');
                    $('#page-breaking-news-outer').fadeTo('fast', 1);
                    $('#page-breaking-news-outer').css('z-index', '0');
                    window.removeEventListener('scroll', stickCallback);

                //account for normal nav
                }else{
       
                    $('#nav-outer').css('opacity', '0');
                    $('#nav-outer').addClass('fixed');
                    $('#nav-outer').fadeTo('fast', 1);
                    window.removeEventListener('scroll', stickCallback);

                }
        }

        //The topStoriesSlider has been passed
        if(winScrollDistance > 337) {  

          $('#article-top-ad').css('position', 'fixed');
          $('#article-top-ad').css('top', '-20px');
          $('#article-top-ad').css('z-index', '200');
          $('#article-top-ad').css('width', screen_width);

          var $win= $( window ).width();
          var $adWidth= $('#article-top-ad').width();
          var $offset= $('#article-top-ad').offset().left;
          
          if($offset > ($win - $adWidth)/2 ){ 

            $('#article-top-ad').css('left', '0px');

          };

          $('#article-top-ad').css('border-bottom', '1px solid #E4E4E4');
          $('#article-top-ad').css('background-color', 'white');
          $('#article-top-ad').css('border-bottom-width', '0px');
          isSticky = true;
          console.log(winScrollDistance);
          console.log(right_rail_ad_offset);

            if(winScrollDistance > right_rail_ad_offset) {  
                console.log('OFFSET PASSED');
                //Ad returns to original position
                $('#article-top-ad').css('position', 'relative');
                $('#article-top-ad').css('left', '0');
                $('#article-top-ad').css('top', '0px');
                $('#article-top-ad').css('background', 'none');
                $('#article-top-ad').css('border', 'none');
                $('#article-top-ad').css('width', 'auto');
                $('#article-top-ad').css('border-bottom-width', '0px');

                //either breaking news or normal nav returns
                if(hasBreakingNews){     

                    $('#page-breaking-news-outer').css('opacity', '0');
                    $('#page-breaking-news-outer').addClass('fixed');
                    $('#page-breaking-news-outer').fadeTo('fast', 1);
                    $('#page-breaking-news-outer').css('z-index', '5000000');
                    window.removeEventListener('scroll', stickCallback);

                //account for normal nav
                }else{
       
                    $('#nav-outer').css('opacity', '0');
                    $('#nav-outer').addClass('fixed');
                    $('#nav-outer').fadeTo('fast', 1);
                    window.removeEventListener('scroll', stickCallback);

                }
            }  
        }    
    };  
                  
}    


/*******************************************************************************
 * CONTROLLER
 *******************************************************************************/
$(document).ready(function(){
    var isWordPress = $('body').hasClass('permalink') || $('body').hasClass('single');

    // Brute force WordPress right rail images.
    // Lazyloading is not working because of additional jQuery being loaded StyleWatch.
    (function(){
        if ( isWordPress ) {
            var $lazyImg = $('#right-rail').find('.lazy-proc');
            $lazyImg.each(function(){
                var $this = $(this),
                    original = $this.attr('data-original');
                $this.attr('src', original);
            });
        }
    })();
    PEOPLE.Article.addImageClasses();
	PEOPLE.Article.initGlobals();
    //groupMainPhotoCelebDB(); // Group narrow photos with celebDB touts (see note in function)
    PEOPLE.floatingHeader();
    initTopStories();
    initInlineGallery();
    PEOPLE.Article.sharing();
	PEOPLE.Article.secondaryImageSharing();
    reorderRecentNews(); // hide current tout in Most Recent News
    PEOPLE.Article.inlineNewsletter();
    PEOPLE.Article.stickyAd();
    // Zergnet, and show/hide legacy partners module.
    if ( !isWordPress ) {
        PEOPLE.Article.loadZergnet();
    } else {
        $('#recircBlock').show();
    }
    PEOPLE.Article.rightRailSocialModule();
    PEOPLE.Article.responsiveAds();
    // This function will error if executed on WordPress pages.
    //if ( !isWordPress ) {
        PEOPLE.Article.latestModule();
    //}
    // Render Polls
    if ($('.articlePoll').length) {
        PEOPLE.ArticlePoll.init(pollContentId);
    }
    // Show Emotes (Flavored Likes)
    if ($('.emotes').length) {
        $('.emotes').addClass('firstvote');
        PEOPLE.ArticleLikes.init(LikesContentID);
    }
    // Add Zoom functionality
    if ($('#leftCol .zoom a').length) {
        initZoom();
    }
    // Add Cover Story Header if Edit tags image as Cover Photo
    if ( $('#articleBody .coverlabel').length ) {
        $('#leftCol #mainPhoto').removeAttr('id').addClass('coverimage');
        $('#leftCol .coverimage').attr('id','coverStoryPhoto');
        $('#leftCol #coverStoryPhoto').prepend('<p class="header">See the full story on newsstands now!</p>');
    }

	// fix related link shortcode escaping HTML tags in Wordpress
	if ( isWordPress ) {
		$('.related-link a').each(function(){
			var relatedText = $(this).text();
			$(this).html(relatedText);
		});
	}
	
    PEOPLE.Article.initVideoPhoto(); // Render video player beneath Main Photo
    // WordPress has previous next arrows already in the markup.
    if ( !isWordPress ) {
        PEOPLE.Article.previousNext();
    }
    PEOPLE.Article.inlineTweets();
    PEOPLE.Article.justForYou();
	PEOPLE.Article.greatIdeasRightRail();
    PEOPLE.Article.initLinkTracking();
    // PEOPLE.Article.injectBC();
});
