var M2WidgetMediator = function(rootHTMLElement) {
    console.log("*** INITALIZING M2 WIDGET *** ");

    var $ = jQuery;
    var $root = $(rootHTMLElement);

    var videoPropName = $root.attr('data-eol-video-scope');
    var videoScope = $root.attr('data-eol-video-scope');
    var sliderDivId = $root.attr('data-eol-slider-div-id');
    var playerDivId = $root.attr('data-eol-player-div-id');
    var myWidgetID = $root.attr('data-eol-widget-id');
    var isM3 = ($root.attr('data-eol-isM3') == "true"); // m2/m3 share the same code
    
    var $playerDiv = $('#'+playerDivId);
    var $sliderDiv = $('#'+sliderDivId);
    var m2socialBar;
    var myVideoPlayer;
    var selectedVideoInfo;
    var myOmnitureVideoTracker;
    var ignoreVideoEndEvent = false;
    var videoPlayClicked = false;

    console.log("INITALIZING M2 WIDGET : videoPropName : ", videoPropName, " isM3 :  ", isM3);

    var sliderOptions = {
        fullscreen: {
            enabled: false,
            nativeFS: true
        },
        sliderDrag: false,
        controlNavigation: 'bullets',
        autoScaleSlider: false,
        loop: true,
        imageScaleMode: 'fit-if-smaller',
        navigateByClick: true,
        numImagesToPreload: 2,
        arrowsNav: true,
        arrowsNavAutoHide: false,
        arrowsNavHideOnTouch: false,
        keyboardNavEnabled: false,
        fadeinLoadedSlide: true,
        globalCaption: false,
        globalCaptionInside: false,

        autoPlay: {
            // autoplay options go here
            enabled: true,
            pauseOnHover: true,
            delay: 7000
        }

    }

    if (isM3) {
        sliderOptions.visibleNearby = {
            enabled: true,
            centerArea: 0.72,
            center: true,
            breakpoint: 300,
            breakpointCenterArea: 0.66,
            navigateByCenterClick: false
        }
    }

    console.debug("$sliderDiv : ", $sliderDiv)
    $sliderDiv.royalSlider(sliderOptions);


    $.each(evideo.videos, function(key, value) {

        if (key.indexOf(videoPropName + "_video_") == 0) {
            vinfo = value[0];

            vinfo.adEdition = eol.page.context.locale.advertisements;
            vinfo.siteSectionID = evideo.getSiteSectionId('detail');
            vinfo.playerId = 'VIDEO_DETAIL_WHITE';
            vinfo.omniture.videoPlayerName = "video_detail";
            evideo.pageVideosModel.addItem(vinfo);
        }
    });


    // // RoyalSlider adds a margin to the last thumb, which causes it to wrap.
    // // Add a new class which will swet the margin to 0.
    // $('.rsThumbsContainer').children().last().addClass('lastThumb');

    var slider = $sliderDiv.data('royalSlider');

    slider.ev.on('rsBeforeMove', function(event, type, userAction) {

    	// omniture tracking
    	var widgetName = isM3 ? 'm3-carousel' : 'm2-carousel';
    	var widgetNameInProducts = isM3 ? 'm3-carousel' : 'm2-carousel-full';
    	var callToAction = (type === 'prev') ? 'left-arrow' : 'right-arrow';
    	if (userAction) {
	    	trackWidgetClick_Ver2(true, callToAction, {
	    		pageName: s.pageName, 
	    		widgetName: widgetName, 
	    		elementClicked: 'arrow',
	    		products: ';'+widgetNameInProducts+';;;event21',
	    		callToAction: callToAction,
	    		destinationURL: ''
	    	});
    	}
    	
        if ($playerDiv.css('visibility') !== 'hidden') {
            ignoreVideoEndEvent = true;
            hidePlayer();
        }

        $('#'+playerDivId).find('.text-copy').remove();

        //hide socials
        $("#m2-psi-social-"+myWidgetID).hide();


        //remove any bg on text-copy
        $("#lp-widget-"+sliderDivId+" .text-copy").css("background-color", "");

        console.log("rsBeforeMove , userAction : ", userAction);
        ignoreVideoEndEvent = userAction;
        console.log("**END rsBeforeMove ***");
    });


    $("#"+sliderDivId).on('click', '.carousel-inline-player-link', function(event) {
        console.log("M2 SLIDE CLICKED...");
        // originalEvent - the original jQuery click event. Parameter available since RoyalSlider v9.5.1
        // triggers when user clicks on slide
        // doesn't trigger after click and drag


        var $a = $(event.currentTarget);
        var videoId = $a.attr('data-video-id');
        var videoInfo = evideo.pageVideosModel.getById(videoId);
		jQuery(this).closest('h4#widget-subTitle').hide();

        slider.stopAutoPlay();
        ignoreVideoEndEvent = false;
        console.log("videoPlayClicked : ", videoPlayClicked);

        setSelectedVideo(videoInfo, $a.closest('.rsSlide'));


        if(videoPlayClicked){
            $pdk.controller.clickPlayButton([videoScope]);
            $pdk.controller.pause(false);
        }else{
            videoPlayClicked = true;
        }

    });

    function hidePlayer() {
        console.log("hiding video player div...");
         if($pdk && $pdk.controller){
             $pdk.controller.clearCurrentRelease([videoScope]);
         }

        $playerDiv.css("visibility", "hidden");
    }


    function onVideoEnded(videoInfo){
        console.debug("********* onVideoEnded, ignoreVideoEndEvent : "+ignoreVideoEndEvent+" ********* ");
        
        // Re-enable subtitle
        jQuery('h4#widget-subTitle').show();
        

        var $slide = slider.currSlide;
        
        if(!ignoreVideoEndEvent){
            $('.rsArrowRight').focus().trigger('click');
        }
        
    }

    function setSelectedVideo(videoInfo, $slide) {
        console.log("setSelectedVideo() : videoInfo : ", videoInfo);
        videoInfo.adEdition = eol.page.context.locale.advertisements;
        videoInfo.omniture.videoPlayerName = "video_detail";
        videoInfo.siteSectionID = evideo.getSiteSectionId('detail');

        selectedVideoInfo = videoInfo;
        myOmnitureVideoTracker.setVideoInfo(selectedVideoInfo);

        var $textClone = $slide.find('.text-copy').eq(0).clone();
        console.log("$textClone : ", $textClone);


        $('#'+playerDivId).append($textClone);


        $playerDiv.css("visibility", "visible");


        // if($.browser.msie){
        //     setTimeout(function(){
        //         $pdk.controller.setReleaseURL(evideo.getReleaseUrl(videoInfo), true, [videoScope]);         
        //     }, 1500);
        // }else{
        //     $pdk.controller.setReleaseURL(evideo.getReleaseUrl(videoInfo), true, [videoScope]);         
        // }

        $pdk.controller.setReleaseURL(evideo.getReleaseUrl(videoInfo), true, [videoScope]);         
        console.log("*** AFTER SET REELASE URL ***");
        $("#lp-widget-"+sliderDivId+" .text-copy").show();

        //change bg
        $("#lp-widget-"+sliderDivId+" .text-copy").css("background-color", "black");

        //show socials
        $("#m2-psi-social-"+myWidgetID).show();

        $textClone.find('.widget-titles').dotdotdot({
            height: 67
        });


        setSocial();


    }


    function setSocial() {
        var m2socialBarConfig = {
            "containerID": "m2-psi-social-"+myWidgetID,
            "embedCode": '<iframe src="http://' + evideo.domain + '/videos/embed/' + selectedVideoInfo.guid + '" width="300" height="170" frameBorder="0" />',
            "tweetText": selectedVideoInfo.title,
            "initialShareURL": selectedVideoInfo.uri,
            "emailSubject": "VIDEO: " + selectedVideoInfo.title + " - Via E! Online"
        };

        if (typeof m2socialBar !== 'undefined') {
            m2socialBar.rebind(m2socialBarConfig);
        } else {
            m2socialBar = new customSocialBar(m2socialBarConfig);
        } 
        customSocialOmnitureHelper(m2socialBar, selectedVideoInfo.title); //omniture rebind
    }



    $pdk.ready(function() { 
        console.log("****M2 PDK READY****");

        evideo.initPlayer({scope:videoScope, videoInfo:null});
        
        if($.browser.msie){
            setTimeout(function(){
                $playerDiv.css("visibility", "hidden");
            }, 1000);
        }else{
            $playerDiv.css("visibility", "hidden");
        }

        
        myOmnitureVideoTracker = new OmnitureVideoTracker(videoScope);

        $pdk.controller.addEventListener("OnReleaseStart", function(playlist){
            console.log("OnReleaseStart : ", videoPropName);
            $('#'+playerDivId).css("visibility", "visible");
            
        }, [videoScope]);


        $pdk.controller.addEventListener("OnReleaseEnd", function(playlist){
            console.log("OnReleaseEnd : ", videoPropName);
            onVideoEnded(selectedVideoInfo);

        }, [videoScope]);


    });

}