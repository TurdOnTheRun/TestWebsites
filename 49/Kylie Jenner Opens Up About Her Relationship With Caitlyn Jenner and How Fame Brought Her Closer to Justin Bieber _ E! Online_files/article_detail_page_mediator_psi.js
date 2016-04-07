

(function($) {


	$(document).ready(function() {
		$('.videoEmbedButton').hide();
		var scopes = [];
		var omnitureTrackers = {};

		if(evideo.videos.relatedVideos){
			evideo.pageVideosModel.addItems( evideo.videos.relatedVideos );
		}

		var embedPresenter = new EmbedSlatePresenter();


		var expandableVideoGroupMediator;

		if($('#expandable-blog-group-0').length >0){
			expandableVideoGroupMediator = new ExpandableVideoThumbGroupMediator( 'expandable-blog-group-0' );
			evideo.pageVideosModel.addItems(evideo.videos.expandableVideos);

		}

		if(evideo.isiPad){
			$('.videoEmbedButton').hide();
		}


		// The $pdk variable may not exist if there are no videos embedded in the article.
		if(typeof($pdk) != 'undefined'){
			$pdk.ready(function() { 




				console.debug("****PDK READY****");


				var adIsPlaying = false;

				$pdk.controller.addEventListener("OnMediaStart", function(clip){
					console.log("OnMediaStart...");
					console.log("clip : ", clip);

					adIsPlaying = clip.data.baseClip.isAd;

					if(adIsPlaying){
						$('.videoEmbedButton').hide();
						//$pdk.controller.disablePlayerControls(true, null, ["*"]);
					}

				}, ['*']);


				$pdk.controller.addEventListener("OnMediaComplete", function(clip){
					console.log("OnMediaComplete...");
					console.log("clip : ", clip);

					if(clip.data.baseClip.isAd){
						adIsPlaying = false;
						//$pdk.controller.disablePlayerControls(false, null, ["*"]);

					}


				}, ['*']);

				$pdk.controller.addEventListener("OnShowControls", function(e){
					console.log("OnShowControls : visible : ", e.data.visible, ", adIsPlaying : ", adIsPlaying);
					var targPlayerId = e.originator.controlId.replace("player", "");
					var $embedBtn = $('.videoEmbedButton[data-video-scope="'+targPlayerId+'"]');
					
					if (e.data.visible && $embedBtn.length > 0){
						if(!adIsPlaying){
							showEmbedButton($embedBtn);
						}
					
					}
				}, ['*']);	



	

				function showEmbedButton($embedBtn) {
					console.log("showEmbedButton : ", $embedBtn.attr('data-video-scope'));
					if(!evideo.isiPad){
						$embedBtn.fadeIn();
						setEmbedButtonHideTimeout($embedBtn);
						addMouseMoveHandlers($embedBtn);
					}

				}

				function addMouseMoveHandlers($embedBtn) {
					$container = $embedBtn.closest('.videocontainer');
					$container.on('mousemove', function(event) {
						//event.preventDefault();
						setEmbedButtonHideTimeout($embedBtn);
					});
				}


				$('.exp-video').each(function(index, el) {
				    var myVideoInfo = evideo.pageVideosModel.getById( $(el).attr('data-video-id') );
				    var tracker = new OmnitureVideoTracker( $(el).attr('data-video-scope') );
				    tracker.setVideoInfo(myVideoInfo)
				    $(el).data('omnitureTracker', tracker);
				});

				

				// we may have multiple players on the page, 
				// locate them by looking for properties on 
				// the evideo.videos object that start with "video_".
				var vinfo;
				$.each( evideo.videos, function( key, value ) {

					if( key.indexOf("video_") == 0){
						omnitureTrackers[key] = new OmnitureVideoTracker(key);

						vinfo = value[0];

						vinfo.playerId = 'VIDEO_DETAIL_WHITE';
						vinfo.omniture.videoPlayerName = "video_detail";
						evideo.pageVideosModel.addItems(evideo.videos[key])
						evideo.initPlayer({scope:key, videoInfo:vinfo});

						omnitureTrackers[key].setVideoInfo(vinfo);

						$pdk.controller.addPlayerCard("forms", "embedSlate", embedPresenter.getTemplate(), null, null, embedPresenter, 1, [key]);

					}
				});

				embedHideTimers = {};

				function setEmbedButtonHideTimeout($embedBtn) {
					var scope = $embedBtn.attr('data-video-scope');

					if(embedHideTimers[scope] ){
						clearTimeout(embedHideTimers[scope]);
					}
					embedHideTimers[scope] = setTimeout(function() {
						$embedBtn.fadeOut();
					}, 1000);
				}


				$('.videoEmbedButton').on('click', function () {
					var scope = $(this).attr('data-video-scope');
					var guid = $(this).attr('data-video-id');
					
					if(!adIsPlaying){
						$pdk.controller.showPlayerCard("forms", "embedSlate", null, {guid:guid, scope:scope}, [scope]);
					}

				});


				if(!evideo.isiPad){
					$pdk.controller.addEventListener("OnPlayerLoaded", function(commInfos){
						console.log("OnPlayerLoaded, commInfos : ", commInfos);
						var compInfo;
						var nextItem;
						var playerIdString = '';
						var scope;
						var $embedBtn;
						// the data array contains CommInfo objects
						for (var i = 0; i < commInfos.data.length; i++) {
							playerIdString = '';
							nextItem = commInfos.data[i];

							if ((typeof nextItem == 'string') && nextItem.indexOf("player") == 0) {
								playerIdString = nextItem;
							}else{

								compInfo = nextItem.components[0];
								
								if(compInfo.type == "player"){
									console.log("adding player : ", compInfo.id);
									playerIdString = compInfo.id
								}
							}

							if(playerIdString.length > 0){
								scope = playerIdString.replace("player", "");
								$embedBtn = $('.videoEmbedButton[data-video-scope="'+scope+'"]');
								//showEmbedButton($embedBtn);
								$embedBtn.fadeIn();

								embedHideTimers[scope] = setTimeout(function() {
									$embedBtn.fadeOut();
								}, 4000);
							}

						};
					});
				}

				


				// $('.videoEmbedButton').css({
				// 	width: 'value1',
				// 	height: 'value2'
				// });


			});


		}




	});


})(jQuery);