// The VideoDetailMediator is responsible for updating the 
// video-detail div contents (tags, title, description, etc) when a video has been selected.
// Assumes only 1 instance on the page.
var VideoDetailMediator = function (detailDiv){
	console.debug("VideoDetailMediator() ");
	var $ = evideo.$;
	var $div = $(detailDiv);
	var selectedVideoInfo;
	var socialBar;
	var $categoryContainer;

	//edispatcher.on( evideo.VIDEO_SELECTED, onVideoSelected );
	
	function onVideoSelected(event, videoInfo){
		selectedVideoInfo = videoInfo;
		update();
	}

	function update(){
		setCategoryTags();
		setTitle();
		setDescription();
		setSocial();
	}

	function setCategoryTags(){
		if (!$categoryContainer) {
			$categoryContainer = $div.find('.category-container').eq(0);
		};
		
		$categoryContainer.html(selectedVideoInfo.categoriesHTML);

		$categoryContainer.dotdotdot({
			ellipsis:'',
			wrap:'children',
			lastCharacter:{
				remove: ['|']
			},
			callback: function(isTruncated, orgContent) {
				var lastChild = $(this).children().last();
				if (lastChild[0].tagName == "SPAN") {
					lastChild.remove();
				}
			}
		});
	}

	function setTitle() {
		$div.find('.video-title').text(selectedVideoInfo.title)
	}

	function setDescription() {
		$div.find('.video-description').text(selectedVideoInfo.description)
	}

	function setSocial() {
		console.log("VideoDetailMediator.setSocial()");
		
		var socialBarConfig = {
			"containerID" : "video-social-shares1",
			"embedCode": '<iframe src="http://'+evideo.domain+'/videos/embed/'+selectedVideoInfo.guid+'" width="610" height="344" frameBorder="0" scrolling="no" />', 
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



	function showEmbed(){
		//display the embed code popup
	}

	function setVideoInfo(videoInfo){
		selectedVideoInfo = videoInfo;
		update();
	}



	return {
		"showEmbed":showEmbed,
		setVideoInfo:setVideoInfo
	}
};
