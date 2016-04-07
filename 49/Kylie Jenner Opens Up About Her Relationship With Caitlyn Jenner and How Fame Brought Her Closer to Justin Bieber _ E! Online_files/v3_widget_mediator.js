var V3WidgetMediator = function(rootHTMLElement) {
	var $ = jQuery;
	var $root = $(rootHTMLElement);
	var currentVideoIndex = 0;

	var videoPropName = $root.attr('data-eol-video-scope');
	var videoScope = $root.attr('data-eol-video-scope');
	var myWidgetID = $root.attr('data-eol-widget-id');
	var autoPlay = $root.attr('data-autoplay');
	var $myVideoScriptTag = $root.find("script[id^='mainVideo']").eq(0);
	var $myDetailDiv = $root.find('.video-detail').eq(0);

	var $thumbs;
	var $thumbsContainer;
	// the thumb currently displaying the "Up Next" banner
	var $nextThumb;

	var socialBar;
	var myVideoPlayer;
	var selectedVideoInfo;


	var isInit = true;
	var firstVideoStarted = false;

	var myOmnitureVideoTracker;
	var adWatcher;
	var slider;
	var $sliderEl = $('#slider_' + videoPropName);
	var hasCarousel = $sliderEl.length > 0;


	// flag on whether the OnReleseEvent event handler should execute.
	// The event is triggered when we call clearCurrentRelease(),
	// so if we just clicked a thumb to select a video we don't that handler to run.
	var skipReleaseEndEvent = false;

	var videos = evideo.videos[videoPropName];

	if (videos) {
		evideo.pageVideosModel.addItems(videos);
	} else {
		return;
	}

	var initialVideoId = $myVideoScriptTag.attr('data-video-id');
	var initialVideoInfo = evideo.pageVideosModel.getById(initialVideoId);

	initialVideoInfo.siteSectionID = evideo.getSiteSectionId('detail');
	initialVideoInfo.playerId = 'VIDEO_DETAIL_WHITE';


	var relatedVideosModel = new RelatedVideosModel(videos);
	relatedVideosModel.numVideosOnNext = 1;
	relatedVideosModel.start();

	var embedPresenter = new EmbedSlatePresenter();



	if (hasCarousel) {
		$sliderEl.royalSlider({
			fullscreen: {
				enabled: false,
				nativeFS: true
			},
			controlNavigation: 'thumbnails',
			autoScaleSlider: false,
			// autoScaleSliderWidth: 960,     
			// autoScaleSliderHeight: 850,
			loop: false,
			imageScaleMode: 'fit-if-smaller',
			navigateByClick: false,
			numImagesToPreload: 4,
			arrowsNav: false,
			arrowsNavAutoHide: false,
			arrowsNavHideOnTouch: true,
			keyboardNavEnabled: false,
			fadeinLoadedSlide: true,
			globalCaption: false,
			globalCaptionInside: false,
			allowCSS3: false,
			allowCSS3OnWebkit: false,
			thumbs: {
				arrows: true,
				autoCenter: false,
				drag: false,
				touch: false,
				appendSpan: true,
				firstMargin: false,
				paddingBottom: 24,
				spacing: 22,
				arrowLeft: $('#' + myWidgetID + ' #prev-button'),
				arrowRight: $('#' + myWidgetID + ' #next-button')
			}
		});



		// RoyalSlider adds a mergin to the last thumb, which causes it to wrap.
		// Add a new class which will swet the margin to 0.
		$('.rsThumbsContainer').children().last().addClass('lastThumb');

		slider = $sliderEl.data('royalSlider');

		new RSThumbScrollBehavior(slider, {
			videoScope: videoScope,
			pageSize: 4
		});

		console.log("slider : ", slider);
		$sliderEl.on('mousedown', '.rsThumb', function(event) {
			// originalEvent - the original jQuery click event. Parameter available since RoyalSlider v9.5.1
			// triggers when user clicks on slide
			// doesn't trigger after click and drag
			var $slide = $(event.currentTarget);

			var slideIndex = $sliderEl.find('.rsThumb').index($slide);
			slider.goTo(slideIndex);
			relatedVideosModel.setCurrentIndex(slideIndex);
			currentVideoIndex = slideIndex;

			// slider.goTo(slider.currSlideId);
			// currentVideoIndex = slider.currSlideId;
			// console.debug("currentVideoIndex : ", currentVideoIndex);
			// relatedVideosModel.setCurrentIndex(slider.currSlideId);

			var videoId = $slide.find('.rsTmb').eq(0).attr('data-panda-id');

			var videoInfo = evideo.pageVideosModel.getById(videoId);

			skipReleaseEndEvent = true;
			setSelectedVideo(videoInfo);
			console.log("selected video");
		});



		$thumbs = $sliderEl.find('.rsThumb');
		$thumbsContainer = $sliderEl.find('.rsThumbsContainer');

		if (!autoPlay && hasCarousel) {
			// manually shift the thumbs over so that the second video's thumb is in the first position.
			slider._setThumbsPosition(slider._thumbsMinPosition);
		}

		// don't add hover state to ios touch devices.
		if (!evideo.isiOS) {
			$thumbs.hover(function() {
				$(this).find('.video-overlay').css('visibility', 'visible');
				$(this).find('.play-overlay').css('visibility', 'visible');
				$(this).find('.video-play-bttn').css('visibility', 'visible');
			}, function() {
				$(this).find('.video-overlay').css('visibility', 'hidden');
				$(this).find('.play-overlay').css('visibility', 'hidden');
				$(this).find('.video-play-bttn').css('visibility', 'hidden');
			});
		} else {
			$thumbs.find('.video-overlay').css('visibility', 'hidden');
			$thumbs.find('.play-overlay').css('visibility', 'hidden');
			$thumbs.find('.video-play-bttn').css('visibility', 'hidden');
		}

		$thumbs.trigger('mouseleave');


		// $thumbs.find('image-container').height(96);
		$thumbs.find('.play-overlay').css('z-index', '100000');
		$thumbs.find('.video-play-bttn').css('z-index', '100001');

		// $('.video-small-thumbs').css('display', 'block');
		$('.lp-widget.v3 .video-small-thumbs').css('position', 'absolute');
		$('.lp-widget.v3 .video-small-thumbs').css('z-index', '-100000');
		$thumbs.mouseover(function(e) {
			$(this).find('.video-small-thumbs').stop().animate({
				"height": "106px",
				"width": "188px",
				"left": "-2px",
				"top": "-1px"
			}, 100, 'swing');
		}).mouseout(function() {
			$(this).find('.video-small-thumbs').stop().animate({
				"height": "104px",
				"width": "185px",
				"left": "0px",
				"top": "0px"
			}, 100, 'swing');
		});
	}

	function onAdStart() {
		console.debug("***** V3 onAdStart()");
		disableThumbs();
		$pdk.controller.disablePlayerControls(true, null, [videoScope]);
	}

	function onAdEnd() {
		console.debug("***** V3 onAdEnd()");
		enableThumbs();
		$pdk.controller.disablePlayerControls(false, null, [videoScope]);
	}

	function onAdVideoStart() {
		console.debug("***** V3 onAdVideoStart()");

		enableThumbs();
	}

	function disableThumbs() {
		$('.clickblocker').show();
	}

	function enableThumbs() {
		$('.clickblocker').hide();
	}


	function onVideoEnded(videoInfo) {
		console.log("onVideoEnded, videoInfo == selectedVideoInfo : ", (videoInfo == selectedVideoInfo));
		if (videoInfo == selectedVideoInfo) {
			var nextVideoInfo;
			if (videos.length > 1) {
				if (currentVideoIndex < videos.length - 1) {
					currentVideoIndex++;
				} else {
					currentVideoIndex = 0;
				}
				nextVideoInfo = videos[currentVideoIndex]
				setSelectedVideo(nextVideoInfo);

			} else {
				currentVideoIndex = 0;
				nextVideoInfo = videos[0];
				setSelectedVideo(nextVideoInfo);
			}
		}
		
		if(slider){
			slider.goTo(currentVideoIndex);
		}
	}

	function setSelectedVideo(videoInfo) {
		if ($nextThumb) {
			$nextThumb.find('.upnext').slideUp('slow');
		}

		videoInfo.adEdition = eol.page.context.locale.advertisements;
		videoInfo.omniture.videoPlayerName = "video_detail";
		videoInfo.siteSectionID = evideo.getSiteSectionId('detail');

		selectedVideoInfo = videoInfo;
		myOmnitureVideoTracker.setVideoInfo(videoInfo);
		updateDetails();

		// when the player loads, it will autoplay based on the "autoPlay" param in the Player Service url,
		// which can be set in sage and overridden by a URL query param.

		if (isInit) {
			isInit = false;
		} else {
			$pdk.controller.setReleaseURL(evideo.getReleaseUrl(videoInfo), true, [videoScope]);

		}
	}

	function setUpNextBanner() {
		if (slider) {
			var vidIndex = slider.currSlideId;

			if (videos.length > 1) {
				if (vidIndex < videos.length - 1) {
					vidIndex++;
				} else {
					vidIndex = 0;
				}
				nextVideoInfo = videos[vidIndex]

			} else {
				vidIndex = 0;
				nextVideoInfo = videos[0];
			}


			$nextThumb = $('#thumbnail-' + nextVideoInfo.guid);
			var $upNext = $nextThumb.find('.upnext');
			$upNext.slideDown('slow');

		}

	}



	function updateDetails() {
		//console.log("selectedVideoInfo.title : ", selectedVideoInfo.title);
		setTimeout(function() {
			$myDetailDiv.find('.video-title-text').text(selectedVideoInfo.title);
			$myDetailDiv.find('.video-description').text(selectedVideoInfo.description);
		}, 0);
		$myDetailDiv.find('.video-title').dotdotdot({
			ellipsis: '...',
			height: 100
		});
		$myDetailDiv.find('.video-description').dotdotdot({
			ellipsis: '...',
			height: 48
		});
		setSocial();
		setEmbedButtonClickHandler(selectedVideoInfo);
	}

	function setEmbedButtonClickHandler(videoInfo) {
		//var embedBtn = $("#video-social-shares1").find(".cs-embed");
		var embedBtn = $("#v3-social-shares-"+myWidgetID+" .cs-embed .cs-share");
		embedBtn.unbind("click");
		embedBtn.off("click");

		embedBtn.on('click', function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			if(!adWatcher.adIsPlaying()){
				$pdk.controller.showPlayerCard("forms", "embedSlate", null, { guid: videoInfo.guid, scope: videoScope}, [videoScope]);
			}

		});


	}

	function setSocial() {
		var socialBarConfig = {
			"containerID": "v3-social-shares-" + myWidgetID,
			"embedCode": '<iframe src="http://' + evideo.domain + '/videos/embed/' + selectedVideoInfo.guid + '" width="300" height="170" frameBorder="0" />',
			"tweetText": selectedVideoInfo.title,
			"initialShareURL": selectedVideoInfo.uri,
			"emailSubject": "VIDEO: " + selectedVideoInfo.title + " - Via E! Online"
		};

		if (socialBar) {
			socialBar.rebind(socialBarConfig);
		} else {
			socialBar = new customSocialBar(socialBarConfig);
		}
		customSocialOmnitureHelper(socialBar, selectedVideoInfo.title); //omniture rebind
	}



	$pdk.ready(function() {
		if (console && console.debug) console.debug("****V3 PDK READY****");
		evideo.initPlayer({
			scope: videoScope,
			videoInfo: initialVideoInfo
		});

		adWatcher = new AdNotifier({
			context: this,
			videoScope: videoScope,
			adStart: onAdStart,
			adEnd: onAdEnd,
			videoStart: onAdVideoStart
		});

		if (evideo.isiPad) {
			enableThumbs();
		}

		myOmnitureVideoTracker = new OmnitureVideoTracker(videoScope);
		myOmnitureVideoTracker.setVideoInfo(initialVideoInfo);
		
		setSelectedVideo(initialVideoInfo);

		$pdk.controller.addEventListener("OnReleaseStart", function(playlist) {
			console.debug(myWidgetID + " OnReleaseStart : ", videoPropName);

			// force the second thumbnail to slide over to the first position
			if (!autoPlay && !firstVideoStarted && (selectedVideoInfo == initialVideoInfo)) {
				firstVideoStarted = true;
			}

			setUpNextBanner();

			skipReleaseEndEvent = false;
		}, [videoScope]);		

		$pdk.controller.addEventListener("OnLoadReleaseUrl", function(release) {
			console.debug(myWidgetID + " OnLoadReleaseUrl : ", videoPropName);

			if (!autoPlay && firstVideoStarted && evideo.isiPad) {
				$pdk.controller.clickPlayButton([videoScope]);			
			}
			
		}, [videoScope]);


		$pdk.controller.addEventListener("OnReleaseEnd", function(playlist) {
			console.debug(myWidgetID + " OnReleaseEnd : ", videoPropName);
			console.debug("evideo.playersLoaded : ", evideo.playersLoaded);

			// if (!evideo.playersLoaded) {
			// 	return;
			// }
			console.debug("skipReleaseEndEvent : ", skipReleaseEndEvent);

			if (!skipReleaseEndEvent) {
				onVideoEnded(selectedVideoInfo);
			} else {
				skipReleaseEndEvent = false;
			}
		}, [videoScope]);



		$pdk.controller.addPlayerCard("forms", "embedSlate", embedPresenter.getTemplate(), null, null, embedPresenter, 1, [videoScope]);



	});
	// delay autoellipsis to wait for style to get settled
	setTimeout(function() {
		$(".v3 .text-labels").ellipsis();
	}, 3000);
}