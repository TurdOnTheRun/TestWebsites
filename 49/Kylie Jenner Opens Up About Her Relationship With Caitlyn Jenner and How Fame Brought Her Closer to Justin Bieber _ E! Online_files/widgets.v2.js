// Author: @briankueck Tweet: @eDevelopers1
// Requires widgets.js to be loaded 1st.

eonline.widgets.v2 = (function($) {

	var model = {
		"debug": {
			"all": false,
			"databind": false,
			"fnTrace": false,
			"listeners": false
		},
		"config": {
			"playerType": "V2_WIDGET",
			"playerId": "VIDEO_DETAIL_WHITE", // This is really a single player instance.
			"programName": "eonline.widgets.v2"
		},
		"data": {
			"ads": {
				"freewheel": {
					"SSID": null
				}
			},
			"carousel": {
				"duration": 500,
				"maxItems": 16,
				"minThumbRangePos": 0,
				"maxThumbRangePos": 3,
				"visibleRange": 3
			},
			"edition": null,
			"i18nText": {
				"nowPlaying": null,
				"playVideo": null
			},
			"initJson": null,
			"linkData": {
				/* Looks like this & is extracted from the <a href="..."> tag in the DOM. It is cached so that the VideoEnded function can Auto-Play the next carousel's video:
					"domLink": <a href object>,
					"intDomPositionCount": 1,
					"strPandaIdOrGuid": 123456,
					"strVideoUrl": "...",
					"strWidgetId": "...",
					"strWidgetType": "..."
				*/
			},
			"tracking": {
				"omniture": {
					"playerName": null
				}
			},
			"useAutoPlay": false,
			"v2CustomBar": [], // This is an array of v2CustomBars with unique ids.
			"videos": []
			/* The V2 Video Collage Widget will create this structure, which is in this format: videos.widgetId.videoId
			videos[123][123456] = {
				"boolUseSinglePlayer": true,
				"boolUseExpandablePlayer": false,
				"objThumbnails": {
					"intHeight": 72,
					"intWidth": 128,
					"objImgSrc": {
						"strLarge": "...",
						"strSmall": "..."
					}
				},
				"objVideo": {
					"intHeight": 332,
					"intWidth": 590,
					"objUrls": {
						"strFlashUrl": "...",
						"strIPadUrl": "..."
					},
					"strDescription": "...",
					"strTitle": "..."
				},
				"strFlvReleasePID": "...",
				"strIPadReleasePID": "...",
				"strPandaIdOrGuid": "..."
			} */
		},
		"dom": {
			"classes": {
				// These carousel IDs & classes will be automatically chained together like: classes.carouselWrap -> classes.carousel
				"carouselWrap": ".eol-carousel",
				"carousel": ".viewport", // Don't prefix this with anything from carouselWrap!
				"rootDiv": ".lp-widget.v2",
				"thumbnails": ".thumbnails"
			},
			"ids": {
				"dialogPlayer": "evp-video-player-wrap",
				"template": "eonline-video-player-wrap"
			}
		}
	};

	function bindListeners(json) {
		traceRoute(model, 'bindListeners');
		if ((typeof(eonline.carousel) !== 'undefined') && (typeof(eonline.carousel.getDomClasses) !== 'undefined')) {
			if (model.debug.all) { 
				log("*** v2 has found the Carousel! Binding v2 Listeners now! ***");
			}

			// Carousel Thumbnail Links
			var thumbnailClass = getDomClasses('rootDivPlusThumbnails');
			var thumbnailKey = '#' + json.strWidgetId + thumbnailClass;
			if (model.debug.all || model.debug.listeners) {
				log('thumbnailKey: ' + thumbnailKey);
			}
			$(thumbnailKey).click(function() {
				if (model.debug.all) { log('CAROUSEL thumbnail clicked'); }
				if ((typeof(eonline.carousel) !== 'undefined') && (typeof(eonline.carousel.getDataFromDom) !== 'undefined')) {
					model.data.useAutoPlay = true;
					var linkData = eonline.carousel.getDataFromDom('thumbnail', $(this));
						linkData.ajaxReloaded = true;
					loadVideo(linkData, true, 1);
				}
			});
		} else {
			if (model.debug.all) {
				log("*** v2 Race Condition Detected... Carousel hasn't finished loading yet... Still Waiting... ***"); 
			}
			setTimeout(function() {
				bindListeners(json);
			},50);
		}
	}

	function convertToSlug(Text) { //http://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
		traceRoute(model, 'convertToSlug');
		return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
	}

	function getData(key) { // Allows for any of the data from the Core JSON object to be returned.
		traceRoute(model, 'getData');
		key = key.replace('model.','');
		var arrKeyParts = key.split('.');
		var data = model;
		for (var i=0, j=arrKeyParts.length-1; i<=j; i++) {
			data = data[arrKeyParts[i]];
		}
		return data;
	}

	function getDomClasses(key) {
		traceRoute(model, 'getDomClasses(' + key + ')');
		switch(key) {
			case 'rootDiv':
				var classNames = model.dom.classes.rootDiv;
			break;
			case 'thumbnails':
				var classNames = model.dom.classes.thumbnails;
			break;
			case 'rootDivPlusThumbnails': // Locks the 'thumbnails' classes to a specific widget id.
				var strWidgetRootClasses = getDomClasses('rootDiv');
				var thumbnailsClasses = getDomClasses('thumbnails');
				var classNames = strWidgetRootClasses + ' ' + thumbnailsClasses;
			break;
		}
		return classNames;
	}

	function init(json) {
		traceRoute(model, 'init');
		json.intStartPos = 0;

		mapData(json);
		bindListeners(json);
		initCarousel(json);
		loadVideo(json, true, 2);
		initNewV2Code(json); // Loads additional addendum routines, after the main V2 code has been loaded by the rest of this script.
	}

	function initCarousel(json) { // Initializes the Carousel.
		traceRoute(model, 'initCarousel');
		if (typeof(eonline.carousel) !== 'undefined') {
			eonline.carousel.init({
				"classes": {
					"carouselWrapClass": ".eol-carousels",
					"carouselClass": ".viewport",
					"domTags": {
						"li": ".thumbs",
						"anchorLinks": ".thumbnails",
						"img": ".video-small-thumbs"
					},
					"rootDiv": ".lp-widget.v2"
				},
				"duration": model.data.carousel.duration,
				"ids": {
					"carouselIdPrefix": "#eol-carousel-",
					"strWidgetId": json.strWidgetId
				},
				"i18nNowPlaying": json.i18nNowPlaying,
				"i18nPlayVideo": json.i18nPlayVideo,
				"maxItems": model.data.carousel.maxItems,
				"pandaId": json.strPandaIdOrGuid,
				"prev": {
					"button": ".buttons.prev" /*,
					"key": "left"*/
				},
				"next": {
					"button": ".buttons.next" /*,
					"key": "right" */
				},
				"thumbnail": {
					"rightMargin": json.thumbnailGap,
					"width": json.thumbnailWidth
				},
				"useModalDialog": false,
				"visible": {
					"range": {
						"min": model.data.carousel.minThumbRangePos,
						"max": model.data.carousel.maxThumbRangePos
					},
					"startPosition": (json.intStartPos) ? json.intStartPos : 0
				}
			});
		}
		// The carousel's init function will automatically change the red borders, once the carousel has been loaded.
	}

	function initNewV2Code(json) { // Loads additional addendum routines, after the main V2 code has been loaded by the rest of this script.
		traceRoute(model, 'initNewV2Code');
		var activeThumb = ".v2.new .eol-carousels .slide-container li.active";
		setSharedURL(activeThumb, 1);

		$(".v2.new .eol-carousels .slide-container li").click(function() {
			setSharedURL(this, 2);
		});

		var timestamp = $('.v2.new .eol-carousels .slide-container li:first').find('.time-stamp').text();
		$('.v2.new .video-engine-players span.play-btns').html(timestamp);

		/* truncating carousel video title to 40 characters */
		$(".v2.new .titles span.text-labels").each(function(index){
			if ($(this).text().length > 55){
				model.data.carouselTitle = $(this).text().substring(0,55);
				$(this).html(model.data.carouselTitle+"...");
			}
		});
		//$(".v2.new .titles span.text-labels").ellipsis();
		
		$(".v2.new .thumbs").hover(function() {
			$(this).find(".video-overlay").css({"visibility":"visible"});
			$(this).find(".video-play-bttn").css({"visibility":"visible"});
			$(this).find(".play-overlay").css({"visibility":"visible"});
			$(this).find('img').stop().animate({"height":"98px","width":"159.12px","margin-left":"-2px","margin-top":"-2px"}, 100,'swing');
		},function() {
			$(this).find(".video-overlay").css({"visibility":"hidden"});
			$(this).find(".video-play-bttn").css({"visibility":"hidden"});
			$(this).find(".play-overlay").css({"visibility":"hidden"});
			$(this).find('img').stop().animate({"height":"96px","width":"156px","margin-left":"0px","margin-top":"0px"}, 100,'swing');
		});

		setTimeout(function(){
			$(".v2.new .eol-carousels").find(".disabled").attr('title','');
		},50);
		
		$(".v2.new .video-engine-players .video-thumbnail-roots").hover(function() {
			$(this).find('img').stop().animate({"height":"345px","width":"614px","margin-left":"-2px","margin-top":"-2px"}, 100,'swing');
			$(this).find('span.evp-thumbnails').css({"overflow":"hidden"});
			$(this).find('.overlays').css({"visibility":"visible"});
		},function() {
			$(this).find('img').stop().animate({"height":"343px","width":"610px","margin-left":"0px","margin-top":"0px"}, 100,'swing');
			$(this).find('.overlays').css({"visibility":"hidden"});
		});
	}


	function loadVideo(linkData, useCarousel, counter) { // Passes control over to the eonline.videoPlayerEngine.
		traceRoute(model, 'loadVideo (' + counter + ')');
		if (typeof(eonline.videoPlayerEngine) !== 'undefined') {
			if (typeof(eonline.videoPlayerEngine.loadVideo) !== 'undefined') {
				eonline.videoPlayerEngine.loadVideo({
					"boolUseAutoPlay": model.data.useAutoPlay,
					"strPandaId": linkData.strPandaIdOrGuid, 
					"intWidgetId": linkData.intWidgetId,
					"strPlayerDomId": linkData.strWidgetId + ' #' + model.dom.ids.dialogPlayer, 
					"strPlayerId": model.config.playerId, 
					"strPlayerType": model.config.playerType,
					"strSSID": model.data.ads.freewheel.SSID,
					"omniture": {
						"playerName": model.data.tracking.omniture.playerName
					}
				});
			}
		}

		if ((useCarousel) && (typeof(eonline.carousel) !== 'undefined')) {
			var key = linkData.strWidgetId + '-' + model.dom.classes.carouselWrap + '-0';
				key = eonline.carousel.cleanKey(key);
				key = 'arrCarousels.' + key + '.intCurrentPos';
			eonline.carousel.setData(key, linkData.intStartPos);
			eonline.carousel.changeBorders(linkData.strPandaIdOrGuid, linkData.strWidgetId);
		}
	}

	function mapData(json) {
		traceRoute(model, 'mapData');
		model.data.useAutoPlay = json.autoPlay; // The loadVideo() function has to be called after this data has been set.
		model.data.videos[json.intWidgetId] = json.arrVideos;

		// Saves the Internationalized Text for Later on. It will be used by the Carousel to switch the "Currently Playing Video" to "Play Video" tooltip (img alt text & anchor link title) messages.
		model.data.i18nText.nowPlaying = json.i18nNowPlaying; // C11 always has a playing video. V2 has a toggle on/off feature.
		model.data.i18nText.playVideo = json.i18nPlayVideo;
		if ((typeof(eonline.videoPlayerEngine) !== 'undefined') && (typeof(eonline.videoPlayerEngine.setData) !== 'undefined')) {
			eonline.videoPlayerEngine.setData('objCore.objData.i18n.sectionType',json.i18nSectionType);
			eonline.videoPlayerEngine.setData('arrVideos.' + json.intWidgetId, json.arrVideos);
		}

		// Initializes ad parameters.
		model.data.ads.freewheel.SSID = json.strSSID;

		// Set Omniture
		model.data.tracking.omniture.playerName = json.omniture.playerName;

		// Saves the edition value.
		model.data.edition = json.edition;

		// Captures the input JSON object, for later referencing purposes.
		model.data.initJson = json;
	}

	function setData(key, data) {
		traceRoute(model, 'setData');
		if (key.indexOf('.') > -1) {
			var parts = key.split('.');
			var pointer = model.data;
			for (var i=0, j=parts.length-1; i<j; i++) {
				var key = parts[i];
				if (typeof(pointer[key]) === 'undefined') {
					pointer[key] = {};
				}
				// Move down the object chain.
				pointer = pointer[key];
			}
			// Attach the item to the last value in the array.
			key = parts[parts.length-1];
			pointer[key] = data;
		} else {
			model.data[key] = data; // The data could be a string, an integer, a floating point number, an object or a JSON Object.
		}
	}

	/* This is used by 3 different places:
		1. Widget Init / onLoad
		2. Carousel Click
		3. Video Ends & Starts the Loads the Next Video.
	*/
	function setSharedURL(location, counter){ // This location is the reference to the <LI> tag & not a URL.
		traceRoute(model, 'setSharedURL (' + counter + ')');
		setTimeout(function(){
			// Custom Social Bar Implemenation 1.0, which uses the older videoPlayerEngine code.
			var widgetId = model.data.initJson.intWidgetId;
			var guid = $(location).find("img").attr("id").split("-");
			var pandaIdOrGuid = guid[1];
			var v2src = $(location).find("img").attr("src");
			var videoTitle = $(".v2.new .widget-headlines.widget-titles").text();
			var slugTitle = convertToSlug(videoTitle);
			var sharedURL = 'http://' + model.data.edition + '.eonline.com/videos/' + pandaIdOrGuid + '/' + slugTitle;
			var videos = model.data.videos[widgetId];
			var showName = videos[model.data.initJson.strPandaIdOrGuid].showName;
			var embedCodeHTML = eonline.videoPlayerEngine.getEmbedCode(pandaIdOrGuid, 1, model.data.initJson.strWidgetId, showName);
			var myConfigJSON = {
					"containerID": "v2-social-shares-" + model.data.initJson.strWidgetId,
					"embedCode": embedCodeHTML,
					"tweetText" : videoTitle,
					"initialShareURL": sharedURL,
					"getCountsOnLoad": "true",
					"emailSubject" : "VIDEO: " + videoTitle + " - Via E!Online",
					"edition" : model.data.edition , //gigya version
					"buttons" : [{buttonType: "FACEBOOK_SHARE"}, {buttonType: "TWITTER_TWEET"},  {buttonType: "GOOGLE_SHARE"}, {buttonType: "EMAIL"}]//gigya version
				};
			if (typeof gigyaSocialsHelper === 'undefined') {
				//production V2 widget
				model.data.v2CustomBar[widgetId] = new customSocialBar(myConfigJSON); //note this is not optimal to instantiate the object each time.
				//(no need to call .rebind() because we are instantiating each time.)
				customSocialOmnitureHelper(model.data.v2CustomBar[widgetId], videoTitle); //omniture 
			} else {
				//V2B 'beta' widget with custom gigya socials
				gigyaSocialsHelper.displaySocials(myConfigJSON);
			}

			
		},550);
	}
	
	//function setTimeStamp(location){
		//setTimeout(function(){
			//var timestamp = $(location).find('.time-stamp').text();
			//alert(timestamp);
		//},550);
	//}

	function videoEnded(strNextPandIdOrGuid) {
		traceRoute(model, 'videoEnded'); 
		if (typeof(eonline.carousel) !== 'undefined') {
			var carouselId = '';
			if (typeof(eonline.carousel.getDomClasses) !== 'undefined') {
				carouselId = eonline.carousel.getDomClasses('carousel', model.data.linkData);
			}
			var strNextDomId = carouselId + ' #thumbnail-' + strNextPandIdOrGuid;

			if (typeof(eonline.carousel.getDataFromDom) !== 'undefined') {
				model.data.linkData = eonline.carousel.getDataFromDom('thumbnail', $(strNextDomId));
			}

			if (typeof(eonline.carousel.checkCarouselArrowStates) !== 'undefined') {
				eonline.carousel.checkCarouselArrowStates();
			}

			var location = '.v2.new .eol-carousels .slide-container li#thumb-' + strNextPandIdOrGuid;
			setSharedURL(location, 3);

			var linkData = model.data.linkData;
				linkData.ajaxReloaded = true;
			model.data.useAutoPlay = true;
			loadVideo(linkData, true, 3);
			
			var timestamp = $('.v2.new .eol-carousels .slide-container li:last').find('.time-stamp').text();
			$('.v2.new .video-engine-players span.play-btns').html(timestamp);
			
			$(".v2.new .video-engine-players .video-thumbnail-roots").hover(function() {
			$(this).find('img').stop().animate({"height":"345px","width":"614px","margin-left":"-2px","margin-top":"-2px"}, 100,'swing');
			$(this).find('span.evp-thumbnails').css({"overflow":"hidden"});
			$(this).find('.overlays').css({"visibility":"visible"});
			},function() {
			$(this).find('img').stop().animate({"height":"343px","width":"610px","margin-left":"0px","margin-top":"0px"}, 100,'swing');
			$(this).find('.overlays').css({"visibility":"hidden"});
		});
			
		}
	}

	return {
		// Exposes Public Function Names
		"getData": getData,
		"init": init,
		"setData": setData,
		"videoEnded": videoEnded
	};
})(jQuery);
