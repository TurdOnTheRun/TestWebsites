var V10WidgetMediator = function(rootHTMLElement) {
console.log("** NEW V10 WIDGET MEDIATOR...");
	var $ = jQuery;
	var $root = $(rootHTMLElement);
	
	var currentVideoIndex = 0;

	var videoPropName = $root.attr('data-eol-video-scope');
	var videoScope = $root.attr('data-eol-video-scope');
	var myWidgetID = $root.attr('data-eol-widget-id');
	
	var $myVideoScriptTag = $root.find("script[id^='mainVideo']").eq(0);
	var $myDetailDiv = $root.find('.video-detail').eq(0);
	var $videoTitle = $myDetailDiv.find('.video-title');
	var $videoDescription = $myDetailDiv.find('.video-description');

	var currentVideoIndex = 0;
	var selectedVideoInfo;
	var myOmnitureVideoTracker;
	var isInit = true;


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

	resetEllipses();


	function onVideoEnded(videoInfo) {
		if (videoInfo == selectedVideoInfo) {
			if (videos.length > 1) {
				if (currentVideoIndex < videos.length - 1) {
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

	function setSelectedVideo(videoInfo) {
		console.log("setSelectedVideo()");
		videoInfo.adEdition = eol.page.context.locale.advertisements;
		videoInfo.omniture.videoPlayerName = "video_detail";
		videoInfo.siteSectionID = evideo.getSiteSectionId('detail');
		

		selectedVideoInfo = videoInfo;
		updateDetails();
		// when the player loads, it will autoplay based on the "autoPlay" param in the Player Service url,
		// which can be set in sage and overridden by a URL query param.
		if(isInit){
			isInit = false;
		}else{
			$pdk.controller.setReleaseURL(evideo.getReleaseUrl(videoInfo), true, [videoScope]);			
		}
	}

	function updateDetails() {
		$videoTitle.text(selectedVideoInfo.title);
		$videoDescription.text(selectedVideoInfo.description);
		resetEllipses();
	}

	function resetEllipses () {
		$videoTitle.dotdotdot({
			height: 206
		});
		$videoDescription.dotdotdot({
			height: 50
		});
	}




	$pdk.ready(function() {
		if (console && console.debug) console.debug("****V10 PDK READY****");
		
		evideo.initPlayer({scope:videoScope, videoInfo:initialVideoInfo});


		myOmnitureVideoTracker = new OmnitureVideoTracker(videoScope);
		myOmnitureVideoTracker.setVideoInfo(initialVideoInfo);

		setSelectedVideo(initialVideoInfo);

		$pdk.controller.addEventListener("OnReleaseEnd", function(playlist){
			console.debug("OnReleaseEnd : ", videoPropName);
			onVideoEnded(selectedVideoInfo);
		}, [videoScope]);



		$pdk.controller.addEventListener("OnMediaStart", function(clip){
			console.log("OnMediaStart : ", videoPropName);
			if(clip.data.baseClip.isAd){
				$('#' + myWidgetID + ' .snipe').hide();				
			}					
		}, [videoScope]);



		$pdk.controller.addEventListener("OnMediaComplete", function(clip){
			console.log("OnMediaComplete : ", videoPropName);
			console.log("clip : ", clip);
			$('#' + myWidgetID + ' .snipe').show();
		}, [videoScope]);

	});
}