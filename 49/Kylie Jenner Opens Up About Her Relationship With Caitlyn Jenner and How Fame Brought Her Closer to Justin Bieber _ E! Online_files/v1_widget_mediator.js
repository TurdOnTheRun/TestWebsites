var V1WidgetMediator = function(rootHTMLElement) {
	console.log(" ** NEW V1WidgetMediator() ** ");
	var $ = jQuery;

	var $root = $(rootHTMLElement);
	
	var currentVideoIndex = 0;
	
	var videoPropName = $root.attr('data-eol-video-scope');
	var videoScope = $root.attr('data-eol-video-scope');
	var myWidgetID = $root.attr('data-eol-widget-id');
	var $myVideoScriptTag = $root.find("script[id^='mainVideo']").eq(0);
	var $myDetailDiv = $root.find('.video-detail').eq(0);
	var $snipe = $root.find('.snipe');
	var hasCarousel = $root.attr('data-has-carousel');

	var socialBar;
	var myVideoPlayer;
	var selectedVideoInfo;
	var myOmnitureVideoTracker;

	var playerProxy;

	// flag on whether the OnReleseEvent event handler should execute.
	// The event is triggered when we call clearCurrentRelease(),
	// so if we just clicked a thumb to select a video we don't that handler to run.
	var skipReleaseEndEvent = false;

	var adIsPlaying = false;

	console.debug("INITALIZING WIDGET : videoPropName : ", videoPropName);


	
	var videos = evideo.videos[videoPropName];

	if(videos){
		evideo.pageVideosModel.addItems(videos);
	} else {
		return;
	}


	var initialVideoId = $myVideoScriptTag.attr('data-video-id');
	var initialVideoInfo = evideo.pageVideosModel.getById(initialVideoId);

	initialVideoInfo.siteSectionID = evideo.getSiteSectionId('detail');
	initialVideoInfo.playerId = 'VIDEO_DETAIL_WHITE';
	selectedVideoInfo = initialVideoInfo;

	
	function onVideoEnded(videoInfo){
		if (hasCarousel){
			currentVideoIndex = $("#"+myWidgetID+" .carousel ul li:first").attr("data-video-list-index");
			setSelectedVideo(videos[currentVideoIndex]);
			adjustCarousel($("#"+myWidgetID+" .carousel ul li:first"));
		} else {
			if(videoInfo == selectedVideoInfo){
				if(videos.length > 1){
					if(currentVideoIndex < videos.length -1){
						currentVideoIndex++;
					} else {
						currentVideoIndex = 0;
					}
					setSelectedVideo(videos[currentVideoIndex]);
				} else {
					setSelectedVideo(videos[0]);
				}
			}
		}
	}


	function setSelectedVideo(videoInfo){
		videoInfo.adEdition = eol.page.context.locale.advertisements;
		videoInfo.omniture.videoPlayerName = "video_detail";
		videoInfo.siteSectionID = evideo.getSiteSectionId('detail');
		$pdk.controller.setReleaseURL(evideo.getReleaseUrl(videoInfo), true, [videoScope]);			

		selectedVideoInfo = videoInfo;
		updateDetails();
	}

	function updateDetails(){
		$myDetailDiv.find('.video-title').html('<span class="section-type">VIDEOS/</span> '+selectedVideoInfo.title);
		$myDetailDiv.find('.video-description').text(selectedVideoInfo.description);
		$myDetailDiv.find('.video-title').dotdotdot({height:180});
		$myDetailDiv.find('.video-description').dotdotdot({height:72});
		setSocial();
	}

	function setSocial() {
		var socialBarConfig = {
			"containerID" : "v1-social-shares-"+myWidgetID,
			"embedCode": '<iframe src="http://'+evideo.domain+'/videos/embed/'+selectedVideoInfo.guid+'" width="300" height="170" frameBorder="0" />', 
			"tweetText" : selectedVideoInfo.title,
			"initialShareURL": selectedVideoInfo.uri,
			"emailSubject" : "VIDEO: "+selectedVideoInfo.title+" - Via E! Online"
		};

		if(socialBar){
			socialBar.rebind(socialBarConfig)
		}else{
			socialBar = new customSocialBar(socialBarConfig);
		}

		customSocialOmnitureHelper(socialBar, selectedVideoInfo.title); //omniture rebind
	}		



	function onReleaseEnd(playlist) {
		console.debug("OnReleaseEnd : ", videoPropName);
		if (!skipReleaseEndEvent) {
			onVideoEnded(selectedVideoInfo);
		} else {
			skipReleaseEndEvent = false;
		}
	}

	function onMediaStart(clip) {
		console.log("OnMediaStart : ", videoPropName);
		if (clip.data.baseClip.isAd) {
			adIsPlaying = true;
			$snipe.hide();
			$pdk.controller.disablePlayerControls(true, null, [videoScope]);

		}
	}

	function onMediaComplete(clip){
		console.log("OnMediaComplete : ", videoPropName);
		console.log("clip : ", clip);
		adIsPlaying = false;
		$snipe.show();
		$pdk.controller.disablePlayerControls(false, null, [videoScope]);

	}
	
	/* ***** Start Carousel Functions ***** */
	function updatePlayer(thisObj) {
		var videoListID = thisObj.attr("data-video-list-index");
		setSelectedVideo(videos[videoListID]);
		adjustCarousel(thisObj)
	}
	
	function adjustCarousel(thisObj) {
		// Move videos before clicked to end
		$("#"+myWidgetID+" .carousel ul li").slice(0, thisObj.index())
			.insertBefore("#"+myWidgetID+" .carousel ul li.mirrored:first");
		// Move video playing from queued to carousel
		$("#"+myWidgetID+" .queued li:first")
			.insertBefore("#"+myWidgetID+" .carousel ul li.mirrored:first");
		// Move video clicked from carousel to queued
		thisObj.appendTo("#"+myWidgetID+" ul.queued");
		// Move carousel to beginning
		$("#"+myWidgetID+" .carousel").data("plugin_tinycarousel").move(0);
	}
	/* ***** End Carousel Functions ***** */
	
	if(hasCarousel){
		// Carousel
		$("#"+myWidgetID+" .carousel").tinycarousel({
			axis:"y",
			animationTime:500,
			infinite:false
		});


		// Ellipses
		$("#"+myWidgetID+" .carousel .title").dotdotdot({height:100});
		// Click bindings
		$("#"+myWidgetID+" .carousel li a, #"+myWidgetID+" .queued li a").click(function(e){
			e.preventDefault();
			if(!adIsPlaying){
				skipReleaseEndEvent = true;
				updatePlayer($(this).closest("li"));
			}

		});
		// Mouse over
		$("#"+myWidgetID+" .carousel li, #"+myWidgetID+" .queued li").mouseover(function(e) {
			$(this).find('img').stop().animate({"height":"90px","width":"159px","left":"-2px","top":"-1px"}, 100,'swing');
				}).mouseout(function(){
			$(this).find('img').stop().animate({"height":"88px","width":"156px","left":"0px","top":"0px"}, 100,'swing');
		});
	}



	$pdk.ready(function() { 
		if (console && console.debug) console.debug("****V1 PDK READY****");
		
		evideo.initPlayer({scope:videoScope, videoInfo:initialVideoInfo});


		myOmnitureVideoTracker = new OmnitureVideoTracker(videoScope);
		myOmnitureVideoTracker.setVideoInfo(initialVideoInfo);

		playerProxy = new VideoPlayerProxy({context: this, videoScope: videoPropName});


		playerProxy.releaseEnded.add(onReleaseEnd);
		playerProxy.mediaStarted.add(onMediaStart);
		playerProxy.mediaCompleted.add(onMediaComplete);

	});

}