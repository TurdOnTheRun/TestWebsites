
var bg,
    frame1,
    logo_right,
    scroll,
    myScroll,
    frame1_text1,
    frame2_text1,
    frame3_text1,
    frame3_text2,
    about,
    cta,
    ctaword1,
    man,
    shirt,
    shirt1,
    shirt2,
    topWhite,
    viagra,
    shirtBg;

var isLegalOpened = false;
var ua = window.navigator.userAgent.toLowerCase(),
isMobile = ('ontouchstart' in window),
isFirefox =  ua.match(/firefox/gi) !== null,
isChrome = ua.match(/Chrome/gi) !== null,
tapDown = (isMobile&&!isChrome) ? 'touchstart': 'mouseenter',
tapUp = (isMobile&&!isChrome)? 'touchend': 'mouseleave',
tap = isMobile? 'touchend': 'click';

function init(){
    TweenMax.set([$(".bg"),
                  $(".logo_right"),
                  $(".cta"), 
                  $('.copy'),
                  $(".scroll")
    ], {autoAlpha:0});

    var imgs=document.querySelectorAll('.preload');
    imgArray=[];
    for (var i = 0; i < imgs.length; i++) {
        imgArray.push(imgs[i]);
    }
    loadImages=preloadImages(imgArray,false);
    
    loadImages.done(function(){
        container=$("#container");
        bg=$(".bg");
        frame1=$(".frame1");
        logo_right=$(".logo_right"),
        about=$(".about");
        frame1_text1=$(".frame1_text1"),
        frame2_text1=$(".frame2_text1"),
        frame3_text1=$(".frame3_text1"),
        frame3_text2=$(".frame3_text2"),
        cta=$(".cta"),
        ctaword1=$(".ctaword1"),
        mCSB_container=$(".mCSB_container");
        mCSB_draggerRail=$(".mCSB_draggerRail");
        mCSB_dragger_bar=$(".mCSB_dragger_bar");
        scroll=$(".scroll");
        man=$(".man");
        shirt=$(".shirt");
        shirt1=$(".shirt1");
        shirt2=$(".shirt2");
        viagra=$(".viagra");
        shirtBg=$(".shirtBg");
        topWhite=$(".topWhite");
        initelement();
        TweenMax.delayedCall(0,collapseAnimation_Frame);
        ctaevent();
    });
}
function initelement(){
    TweenMax.set([mCSB_draggerRail,mCSB_dragger_bar], {autoAlpha:1});
    TweenMax.set([frame2_text1,frame3_text1,frame3_text2,cta], {autoAlpha:0});
}
function collapseAnimation_Frame(){
    
    TweenMax.to($('.border-container'),.5,{autoAlpha:1});
    TweenMax.to(frame1,.7,{autoAlpha:1,force3D:true});
    TweenMax.to([bg,logo_right,about,scroll],.7,{autoAlpha:1});
    TweenMax.fromTo(mCSB_draggerRail, .3, {autoAlpha:1,scaleY:0.5}, {scaleY:1,delay:.2});
    TweenMax.fromTo(mCSB_dragger_bar, .2, {autoAlpha:1,height:0}, {height:49,delay:.5});

    TweenMax.set(viagra,{width:141,height:168});
    $('.viagra1').css('width','100%');
    TweenMax.to(frame1_text1,1,{autoAlpha:1,delay:.5});
    TweenMax.to(man,.6,{autoAlpha:1,delay:.2});
    
    TweenMax.delayedCall(3.5,step2)
}
function step2()
{
    TweenMax.to(frame1_text1,.5,{autoAlpha:0});
    TweenMax.to(frame2_text1,1,{autoAlpha:1,delay:.5});
    TweenMax.to(topWhite,.5,{autoAlpha:.5});
    TweenMax.to(man,1,{y:-110});
    TweenMax.delayedCall(3,step3)
}
function step3()
{
    TweenMax.to(topWhite,.4,{autoAlpha:0,delay:.8,ease:Quad.easeOut});
    TweenMax.to(frame2_text1,.5,{autoAlpha:0});
    TweenMax.to(frame3_text1,1,{autoAlpha:1,delay:.5});
    TweenMax.to(man,1,{scale:2,y:-200,x:-150,ease:Quad.easeInOut});
    TweenMax.to(man,.4,{autoAlpha:0,delay:.8,ease:Quad.easeOut});
    TweenMax.set(shirt,{autoAlpha:1});
    TweenMax.delayedCall(5.3,step4)
}
function step4()
{
    // TweenMax.to($('.shadow'),.5,{autoAlpha:0,delay:.4});
    TweenMax.to(viagra,1,{rotation:0,y:-40,delay:.5,onComplete:function(){
         $('.viagraCon').append($('.viagra1'));
        TweenMax.to($('.viagraCon'),.5,{x:-42,y:-37,width:189,height:169});
        TweenMax.to(shirt,1,{autoAlpha:0});
        TweenMax.to(shirtBg,1,{autoAlpha:1});
    }});
    TweenMax.to(frame3_text1,.5,{autoAlpha:0});
    TweenMax.to(cta,1.5,{autoAlpha:1,delay:1.5});
    TweenMax.to(frame3_text2,1,{autoAlpha:1,delay:2});
}
function ctaevent(){
   
    $(container).on('click',function(e){
        
        if ($(e.target).hasClass('cta')||$(e.target).parents('.cta').length > 0) {
            toEndFrame();
            Enabler.exit('CheckOutNewViagraSinglePacks_Exit');
        }else if($(e.target).hasClass('logo_right')||$(e.target).parents('.logo_right').length > 0){
            toEndFrame();
            Enabler.exit('VIAGRALogo_Exit');
        }else if($(e.target).hasClass('legal')||$(e.target).parents('.legal').length > 0){
            toEndFrame();
            Enabler.exit('SeePrescribingInfo_Exit');
        }else if($(e.target).hasClass('scroll')||$(e.target).parents('.scroll').length > 0||$(e.target).hasClass('aboutbg')||
            $(e.target).hasClass('mCustomScrollBox')||$(e.target).parents('.mCustomScrollBox').length > 0){
            if($(e.target).hasClass('fda')||$(e.target).parents('.fda').length > 0){
                //Enabler.exit('Fda_Exit');
            }else{
                return;
            }
        }else if($(e.target).hasClass('blank')||$(e.target).parents('.blank').length > 0
            ||$(e.target).is('.blank')||$(e.target).is('#container')){
            return;
        }else{
            toEndFrame();
            Enabler.exit('Background_Exit');
        }
    });
    cta.on('mouseenter',function(){
        TweenMax.to($('.ctaOver'), .2, {autoAlpha:1});            
    });
    cta.on('mouseleave',function(){
        TweenMax.to($('.ctaOver'), .2, {autoAlpha:0});
    }); 
    $('.linkHot').on('click',function  () {
        toEndFrame();
        Enabler.exit('FdaLink_Exit');
    });
}
function toEndFrame () {
    TweenMax.killAll();
    TweenMax.set('.frame1_text1,.copy,.man,.topWhite',{autoAlpha:0});
    TweenMax.set(viagra,{rotation:0,y:-40,onComplete:function(){
         $('.viagraCon').append($('.viagra1'));
        TweenMax.set($('.viagraCon'),{x:-42,y:-37,width:189,height:169});
    }});
    TweenMax.set('.frame3_text2,.shirtBg,.cta',{autoAlpha:1});
    TweenMax.set(mCSB_draggerRail,{autoAlpha:1,scaleY:1});
    TweenMax.set(mCSB_dragger_bar,{autoAlpha:1,height:49});
}
function preloadImages(arr){
    var newImages = [];
    loadedImages = 0;
    imgLen = 0;

    var postaction = function() {};
    arr=(typeof arr!="object")?[arr]:arr;
    imgLen = arr.length;

    function imageLoadpost(){
        loadedImages++;
        ratio = loadedImages/imgLen;
        if (arr[loadedImages - 1]===null){
            log('nothing');
        }
        if(loadedImages == imgLen){
            postaction(newImages);
            for(var j=0;j<imgLen;j++){
                $(arr[j]).css('width',newImages[j].width+'px');
                $(arr[j]).css('height',newImages[j].height+'px');
                //console.log(newImages[j].width);
                $(arr[j]).append(newImages[j]);
                $(arr[j]).removeAttr("data-src");
            }
        }
    }
    var img;
    for(var i=0; i<imgLen; i++){
        img = new Image();
        newImages.push(img);

        img.addEventListener("load",function(e){
            imageLoadpost();
        });
        img.addEventListener("error",function(){
            imageLoadpost();
        });
        if(arr[i].getAttribute('data-src')!==null){
            img.src = arr[i].getAttribute('data-src');
            img.alt="";
        }
    }
    return{
        done:function(f){
            postaction = f ||postaction;
        }
    };
}