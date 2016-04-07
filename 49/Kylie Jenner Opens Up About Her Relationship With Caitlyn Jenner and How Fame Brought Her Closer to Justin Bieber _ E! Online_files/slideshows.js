// Author: @briankueck Tweet: @eDevelopers1
// Requires widgets.js to be loaded 1st.

eonline = (typeof(eonline) !== 'undefined') ? eonline : {};
eonline.widgets = (typeof(eonline.widgets) !== 'undefined') ? eonline.widgets : {};
eonline.widgets.slideshows = (function($) {

	var model = {
		"debug": {
			"all": false,
			"arrows": false,
			"autoAdvance": false,
			"availableCarousels": false,
			"breadcrumbs": false,
			"dashes": false, // breadcrumbs
			"doubleClick": false,
			"errors": false,
			"fnTrace": false,
			"ghostPhotos": false, // These are the same as the "wing photos".
			"listeners": false,
			"titleHeights": false,
			"titleLengths": false,
			"videoEnded": false
		},
		"config": {
			"domAreas": ['arrow', 'backgroundArea'],
			"playerTypes": {
				"m2": "M2_WIDGET",
				"m3": "M3_WIDGET"
			},
			"playerId": "VIDEO_DETAIL_WHITE", // This is really a single player instance. It's a FlashVar Key.
			"programName": "eonline.widgets.slideshows",
			"swipeTime": 1000,
			"useAutoAdvance": {
				"localhost": true,
				"prod": true
			}
		},
		"data": {
			//"isLoaded": false,
			/*"carousel": {
				"duration": 7000,
				//"itemWidth": (128 + 5),
				"maxItems": 7,
				"minThumbRangePos": 0,
				"maxThumbRangePos": 1,
				"visibleRange": 1
			},*/
			"dashes": {
				"currentPosition": 0,
				"min": 0,
				"max": 0,
				"stopPosition": 6
			},
			/*"i18nText": {
				"nowPlaying": null,
				"playVideo": null
			},*/
			"initJson": {},
			"isScrolling": false,
			"jsonArrows": {},
			//"lastThumbnailId": null,
			"socialMediaIcons": {},
			"widgetType": null
		},
		"dom": {
			"classes": {
				"arrows": {
					"both": ".arrows",
					"left": ".arrows.left",
					"right": ".arrows.right"
				},
				"backgroundGradients": {
					"both": ".buttons",
					"left": ".buttons.prev",
					"right": ".buttons.next"
				},
				"breadcrumbs": ".breadcrumbs",
				// These carousel IDs & classes will be automatically chained together like: classes.carouselWrap -> classes.carousel
				//"carouselWrap": ".eol-carousel",
				//"carousel": ".viewport", // Don't prefix this with anything from carouselWrap! 
				"ghostPhotos": {
					"root": "thumbs ghosts fpo-same-as-thumbs",
					"first": ".first",
					"second": ".second",
					"secondToLast": ".secondToLast",
					"last": ".last"
				},
				//"rootDiv": ".lp-widget.slideshows",
				"multiLineTitle": "multi-line-title",
				"multiLineSubHeadline": "multi-line-sub-headline",
				"playBtns": ".play-btns",
				"sectionTypes": {
					"wrap": ".widget-section-types",
					"links": ".widget-section-type-links"
				},
				"slideContainer": ".slide-container",
				"textCopy": ".text-copy",
				"thumbnails": {
					"rootLiTags": ".thumbs",
					// "links": ".thumbnails"
					"active": ".active",
					"first": ".first",
					"last": ".last"
				},
				"videoEnginePlayers": ".video-engine-players",
				"viewport": ".viewport",
				"widgetTitles": ".widget-titles"
			},
			"ids": {
				"arrows": {
					"left": "#leftArrowImage",
					"right": "#rightArrowImage"
				},
				"backgroundGradients": {
					"left": "prev-button",
					"right": "next-button"
				},
				"breadcrumbs": "#breadcrumbs-",
				"carousel": "eol-carousel-0",
				"sectionTypes": {
					"headlineWrapTag": "#widget-section-type",
					"gradients": "#widget-section-type-gradient",
					"triangles": "#widget-section-type-gradient-triangle"
				},
				"socialMediaIcons": "#social-media-icons-wrap",
				"sponsorshipAd": "#ad-banner-bkgd",
				"subHeadline": "#widget-sub-headline",
				//"subHeadlineLink": "#widget-sub-headline-link",
				"titles": "#widget-title",
				"thumbnails": {
					"rootPrefix": "#thumb-"
				},
				"videoPlayers": "#evp-video-player-wrap"
			},
			"keys": {
				"carousel": null // This will be auto-filled in by the init() function & it will look like this: "#cms-widget-123 #eol-carousel-0"
			}
		},
		"timers": {
			"autoAdvance": {
				"localhost": 7000,
				"prod": 7000,
				"videoEnded": 750, // Allows the user to see that the video has ended, before the carousel auto-advances to the next photo.
				"event": null
			},
			"bindListeners": 1500
		}
	};


	/* These are additional Shift Left & Shift Right functions, which build on top of the eol.carousel.js animation routines.
	 * DO NOT USE ANY ANIMATION IN THESE FUNCTIONS!
	 */

	function addendumScroll(switchKey, directionKey, domAreaKey, json) {
		if (model.debug.all || model.debug.autoAdvance || model.debug.listeners || model.debug.fnTrace) {
			traceRoute(model, 'addendumScroll');
			log('directionKey: ' + directionKey);
			var domAreaClicked = (domAreaKey === 'backgroundArea') ? 'Background Opacity' : domAreaKey;
			log('slideshows ' + switchKey + ' ' + domAreaClicked + ' Clicked');
			/* if (isAppleDevice) {
				alert('slideshows ' + switchKey + ' ' + domAreaClicked + ' Clicked');
			}*/
		}

		switch(switchKey) {
			case 'preSlide':
				if (domAreaKey !== 'autoAdvanceTimer') { // User Clicked on the arrow, rather than it auto-advancing.
					if (model.debug.all || model.debug.autoAdvance) {
						log('User clicked an arrow. Clearing the autoAdvance timer.');
					}
					clearTimer('autoAdvance');
					model.config.useAutoAdvance.localhost = false;
					model.config.useAutoAdvance.prod = false;
				}
				// Turns off any Playing Videos.
				videoEnded(json);

				/* Turns these features off, whenever the user presses an < arrow > and the video is still playing.
				 * This turns on the features faster than by using the videoEnded function. It allows the user to 
				 * see them turn on, before they start to animate. 
				 */
				toggleWidgetFeatures(switchKey, null);
			break;
			case 'postSlide':
				// Moves the Dashes left or right, as needed.
				updateBreadcrumbDashPosition(directionKey, json, null);

				// Changes the Active Carousel Class
				changeActiveCarouselClass(json);

				// Resets the flag to prevent a race condition on the iPad, with the Auto Advancing feature & the swiping feature.
				model.data.isScrolling = false;
			break;
		}
	}

	/* Most sites don't build ghost widgets, & shift the 1st <li> tag to the end of the <ul><li></ul> tag stack & also shift the last <li> tag to the beginning of that stack.
	 * They operate on the principle that the photo takes up the entire viewable space. So users can't see that the carousel is shifting, behind-the-scenes. 
	 * We need to do something different, since we are using "wing photos". Users can see 1/4 of the previous photo & 1/4 of the next photo. By design, we can't follow everyone else's method of shifting the <li>
	 * tags in the carousel. Our design forced us to build something more advanced, then what everyone else has built & been using. So if you do this wrong, then they will see the carousel shift behind-the-scenes!
	 * The idea is that as long as the (n+2)th photo looks identical to the 1st photo, then we can shift the X-coordinates of the carousel... without the user knowning that the carousel is shifting behind-the-scenes.
	 * From their point of view, the carousel is an infinite carousel. From our point of view, the <ul><li></ul> tag stack doesn't move <li> tags around. We use <ghost-1><ghost-2><li-1>...<li-n><ghost-3><ghost-4> and 
	 * we track the position of the <li-1> through <li-n> tags, using the .active class. Ghosts 2 & 3 are the matching 1 & n positions. Ghosts 1 & 4 are the left & right wing photos, respectively. So we need all 4 ghost
	 * photos, to make this optical illusion work completely & appear to transition seamlessly.
	 */
	function addGhostThumbs(json) {
		traceRoute(model, 'addGhostThumbs');

		var thumbKey = '#' + json.widgetIdLong + ' ' + model.dom.classes.thumbnails.rootLiTags;
		var ghostPhotoClasses = {
			"first": model.dom.classes.ghostPhotos.root + model.dom.classes.ghostPhotos.first,
			"second": model.dom.classes.ghostPhotos.root + model.dom.classes.ghostPhotos.second,
			"secondToLast": model.dom.classes.ghostPhotos.root + model.dom.classes.ghostPhotos.secondToLast,
			"last": model.dom.classes.ghostPhotos.root + model.dom.classes.ghostPhotos.last
		};

		// Here is how we fix an Off-set carousel, where there is additional photo data to the left of the 1st photo. This creates the "infinite carousel loop" experience.
		var thumbLength = $(thumbKey).length;

		var slideContainer = $('#' + json.widgetIdLong + ' ' + model.dom.classes.slideContainer);

		// Copies the 1st real <li> thumbnail tag & pastes it to the end of the <ul> list as a ghost thumbnail.
		var firstLiTag = $(thumbKey + model.dom.classes.thumbnails.first);

		var firstGhostLiTag = firstLiTag.clone().attr('class', ghostPhotoClasses.first);
		firstGhostLiTag.attr('id','ghost-thumb-A');

		// Appends it to the end of the <ul> list.
		slideContainer.append(firstGhostLiTag)

		if (json.widgetType === 'm3') {
			var secondGhostLiTag = firstLiTag.next().clone().attr('class', ghostPhotoClasses.second);
			secondGhostLiTag.attr('id','ghost-thumb-B');
			slideContainer.append(secondGhostLiTag);
		}

		// Copies the last n-th (3rd through 7th) <li> tag... into the 0th <li> tag position, since the 1st photo's/video's <li> tag should show the last n-th (3rd through 7th) photo's/video's <li> to the left of it.
		var lastLiTag = $(thumbKey + model.dom.classes.thumbnails.last);

		var lastGhostLiTag = lastLiTag.clone().attr('class', ghostPhotoClasses.last);
		lastGhostLiTag.attr('id','ghost-thumb-Z');

		// Prepends them to the beginning of the <ul> list.
		slideContainer.prepend(lastGhostLiTag);

		if (json.widgetType === 'm3') {
			var secondToLastGhostLiTag = lastLiTag.prev().clone().attr('class', ghostPhotoClasses.secondToLast);
			secondToLastGhostLiTag.attr('id','ghost-thumb-Y');
			slideContainer.prepend(secondToLastGhostLiTag);
		}

		// Re-run the positioning, so that the text doesn't float left and overlap the ghost widgets.
		$(thumbKey).css({
			"position": "relative"
		});
	}

	/* Turned off, pending further design review from a TPM & BizDev, regarding small/medium/large+wrapping title heights & overlapping conditions.
	function adjustTitleHeight(titleTag, titleKey, subHeadlineKey) { /x* Adjusts a single carousel item's title height & creates the multi-line effect, if needed. 
		Also toggles titles on/off, for when the videos start & end. This prevents problems with the carousel arrows, which also
		run the ('#widget-sub-headline').show(); feature & can cause sub-headlines to appear behind multi-line titles. *x/
		traceRoute(model, 'adjustTitleHeight');

		var height = titleTag.height();
		if (model.debug.all || model.debug.titleHeights) {
			log('height: ' + height);
		}
		if (!height) { // jQuery will sometimes revert back to the document object, rather than picking up the <h4> title tag group. It appears to be a race condition bug, which occassionally happens inside of the jQuery library... as the carousel animates/slides left-to-right or right-to-left. So we'll refetch the object from jQuery. It seems to happen when the .active class is moving from 1 thumbnail, to another.
			if (model.debug.all || model.debug.titleHeights) {
				log("refetched the title's height...");
				log('titleKey: ' + titleKey);
			}
			titleTag = $(titleKey);
			setTimeout(function(){
				adjustTitleHeight(titleTag, titleKey, subHeadlineKey);
			}, 50);
		} else {
			var subHeadlineTag = titleTag.parents(model.dom.classes.textCopy).children(model.dom.ids.subHeadline);
			if (model.debug.all || model.debug.titleHeights) {
				log('height: ' + height);
			}
			checkTitleHeight(titleTag, subHeadlineTag, true, 'init', 1);
		}
	}
	*/

	function applyBackgroundHover(key) {
		traceRoute(model, 'applyBackgroundHover');

		// Gets the JSON code from the model, since it can't be directly passed in through the optionalListeners code.
		var json = model.data.initJson;

		// Removes the "arrow" from "arrowLeft" and "arrowRight", so that the remainder of the key can be appended to 'Arrow' and 'BackgroundArea' to form: 'ArrowLeft', 'ArrowRight', 'BackgroundAreaLeft' & 'BackgroundAreaRight'.
		key = ucFirst(key.replace(/arrow/i,''));

		// Removes the background hover class.
		removeAllBackgroundHovers();

		// Adds the background hover class to the arrows.
		var domKey = getDomClasses('arrow'+key, json, true);
		$(domKey).addClass('hover');

		// Adds the background hover class to the background opacity areas.
		var domKey = getDomClasses('backgroundArea'+key, json, true);
		$(domKey).addClass('hover');
	}

	// Binds Non-Carousel Listeners to both background opacity areas & the left & right arrows.
	function bindListeners(json) { 
		traceRoute(model, 'bindListeners');

		// Wires up the EOL Carousel to the SlideShow's 2nd set of Arrows.
		if ((typeof(eonline.mWidgetsOnly.carousel) !== 'undefined') && (typeof(eonline.mWidgetsOnly.carousel.bindDynamicListeners) !== 'undefined')) {
			for (var i=0, j=model.config.domAreas.length; i<j; i++) {
				var domAreaKey = model.config.domAreas[i];

				model.data.jsonArrows = {
					"leftArrow": {
						"id": getDomClasses(domAreaKey + 'Left', json, false),
						"addendumListeners": function(switchKey, directionKey) { // Note: directionKey is the switchKey value in eol.carousel.js.
							addendumScroll(switchKey, directionKey, domAreaKey, json);
						},
						"optionalListeners": optionalListeners // This is a "function template". We're using the same trick here, as we're using at the bottom of this script to expose public functions. These are simply function pointers, which map to the actual function.
					},
					"rightArrow": {
						"id": getDomClasses(domAreaKey + 'Right', json, false),
						"addendumListeners": function(switchKey, directionKey) {
							addendumScroll(switchKey, directionKey, domAreaKey, json);
						},
						"optionalListeners": optionalListeners // This is a "function template". We're using the same trick here, as we're using at the bottom of this script to expose public functions. These are simply function pointers, which map to the actual function.
					}
				};

				/* This will cause the eol.carousel.js code to re-binds these listeners, by removing the ones which the eol.carousel.js code auto-wired up & then re-adding them... with these addendumListeners functions.
				 * Then it willa add additional identical listeners, to the background opacity areas. This used to contain duplicate bindDynamicListeners() functions,w ith quadruplicate sets of optional listeners.
				 */
				eonline.mWidgetsOnly.carousel.bindDynamicListeners(model.dom.ids.carousel, json.widgetIdLong, model.data.jsonArrows);
			}
		} else if (model.debug.errors) {
			error(model.config.programName + ": Can't find the eonline.mWidgetsOnly.carousel.bindDynamicListeners function");
		}

		if (isAppleDevice) {
			var jsonHammer = {
				tap_max_interval: 1000,
				swipe: true,
				swipe_time: model.config.swipeTime,
				hold: false,
				prevent_default: true/*,
				tap_double: false <- Doesn't work. */
			};

			/* These already have onTouchStart events bound to them.
			 * var hammerArrows = $('#' + json.widgetIdLong + ' ' + model.dom.classes.arrows.both).hammer(jsonHammer);
			 * var hammerBackgroundOpacityAreas = $('#' + json.widgetIdLong + ' ' + model.dom.classes.backgroundGradients.both).hammer(jsonHammer);
			 */

			// These don't!
			//var hammerPhotos = $('#' + json.widgetIdLong + ' ' + model.dom.classes.thumbnails.rootLiTags + ' a' + model.dom.classes.thumbnails.links).hammer(jsonHammer);
			//var hammerVideos = $('#' + json.widgetIdLong + ' ' + model.dom.classes.thumbnails.rootLiTags + ' .vd-player-container').hammer(jsonHammer);
			var hammerObj = $('#' + json.widgetIdLong + ' ' + model.dom.classes.slideContainer).hammer(jsonHammer);
			/* These already have onTouchStart events bound to them & they already support both tap + swipe.
			 * hammerArrows.unbind("tap").bind("tap", mobileTapEvent);
			 * hammerBackgroundOpacityAreas.unbind("tap").bind("tap", mobileTapEvent);
			 * hammerArrows.unbind("swipe").bind("swipe", mobileSwipeEvent);
			 * hammerBackgroundOpacityAreas.unbind("swipe").bind("swipe", mobileSwipeEvent);
			 */

			// These don't!
			//hammerPhotos.unbind("swipe").bind("swipe", mobileSwipeEvent);
			//hammerVideos.unbind("swipe").bind("swipe", mobileSwipeEvent);

			// Hmm... this previous change fixed the iPad swiping, but it broke the ability for the code to easily find the <li id="..."> attributes. It moved the listeners on the <li> tags up to the parent <ul> tag. The code was expecting to extract the <li> tag's id attribute from the DOM. That DOM-id extraction code had to be rewritten, in order to find another way to get to the <li id="..."> attributes. They appear as: "thumb-pandaId". The reason that we need them, is that we need to know what the photo/video ID is for the item that was swiped on. The JSON Databind arrays are only built with the videos, not blank array items. So an array of 7 carousel items, might have 2 videos in it. So the JSON contains 2 items in the array. We can't use array[i] to find the indexed (0-6) pointer in that array. That's why we need to extract the PandaId from the DOM.
			hammerObj.bind("swipe",mobileSwipeEvent); 
		}
	}

	function callback(switchKey, json) {
		traceRoute(model, 'callback');

		switch(switchKey) {
			case 'CarouselAnimation':
				ghostWarp(json);
			break;
		}
	}

	function carouselShift(switchKey, domAreaKey, json) {
		traceRoute(model, 'carouselShift');

		if ((domAreaKey === 'autoAdvanceTimer') || (isAppleDevice && !model.data.isScrolling)) {
			addendumScroll('preSlide', switchKey, domAreaKey, json);
		}
		if ((typeof(eonline.mWidgetsOnly.carousel) !== 'undefined') && (typeof(eonline.mWidgetsOnly.carousel.carouselShift) !== 'undefined')) {
			eonline.mWidgetsOnly.carousel.carouselShift(switchKey, model.dom.keys.carousel, json.widgetIdLong, null, 5);
		} else if (model.debug.errors) {
			error(model.config.programName + ": Can't find the eonline.mWidgetsOnly.carousel.carouselShift function");
		}

		// The eol.carousel.js file will add the postSlide event to the PC Web version of the listeners. This is only missing for the iPad swipe listeners.
		if ((domAreaKey === 'autoAdvanceTimer') || (isAppleDevice && !model.data.isScrolling)) {
			clearTimer('autoAdvance'); // Do not remove this! It's used by the addendumScroll() function!
			model.timers.autoAdvance.event = setTimeout(function() {
				addendumScroll('postSlide', switchKey, domAreaKey, json);
			}, ((domAreaKey === 'autoAdvanceTimer') ? 0 : (model.config.swipeTime/4)));
		}
	}

	// Causes the Carousel to Auto-Advance Every 7 Seconds.
	function carouselTimer(json, counter) {
		traceRoute(model, 'carouselTimer');

		if (!json) json = model.data.initJson;
		var useAutoAdvance = (isLocalhost) ? model.config.useAutoAdvance.localhost : model.config.useAutoAdvance.prod;
		if (model.debug.all || model.debug.autoAdvance || model.debug.videoEnded) {
			log('Auto Advance: ' + ((useAutoAdvance) ? 'true' : 'false'));
		}
		if (!useAutoAdvance) return;

		if (json.hasVideoEnded) {
			// Auto-advances instantaneously after the video ends.
			var autoAdvanceTimer = model.timers.autoAdvance.videoEnded;
		} else {
			// Auto-advances after the standard delay.
			var autoAdvanceTimer = (isLocalhost) ? model.timers.autoAdvance.localhost : model.timers.autoAdvance.prod;
		}
		if (model.debug.all || model.debug.autoAdvance || model.debug.videoEnded) {
			log('autoAdvanceTimer: ' + autoAdvanceTimer + 'ms');
		}

		/* This clearTimeout & auto-advance event, slows the timing down so that clicking the left arrow, will cause the 7 second delay to reset to a full 7 seconds.
		 * Otherwise, it wants to overlap the timers in an asychronous mode & cause them to run too fast. 
		 */
		clearTimer('autoAdvance'); // Do not remove this! It's used by the addendumScroll() function!
		model.timers.autoAdvance.event = setTimeout(function() {
			model.data.isScrolling = true;
			if (model.debug.all || model.debug.autoAdvance || model.debug.dashes) {
				log('(before) stopPosition: ' + model.data.dashes.stopPosition);
				log('(before) currentPosition: ' + model.data.dashes.currentPosition);
			}
			carouselShift('rightArrow', 'autoAdvanceTimer', json);
			if (model.debug.all || model.debug.autoAdvance || model.debug.dashes) {
				log('(after) currentPosition: ' + model.data.dashes.currentPosition);
				log('model.data.dashes.stopPosition: ' + model.data.dashes.stopPosition);
				log('model.data.useInfiniteLoop: ' + (model.data.useInfiniteLoop) ? 'true': 'false');
			}

			// Auto-Advances by 1 to the end of the list OR continues to auto-advance past the end of the list. If useInfiniteLoop === true, then it will do both of those!
			if ((model.data.dashes.currentPosition < model.data.dashes.stopPosition) || (model.data.useInfiniteLoop)) {
				if (model.debug.all || model.debug.autoAdvance || model.debug.dashes) {
					log('auto-advancing now...');
					log('model.timers.autoAdvance.localhost: ' + model.timers.autoAdvance.localhost);
				}

				/* Since this function already calls the carouselShift function, which calls this function (thus creating a loop), we don't need this additional carouselTimer. It was
				 * auto-advancing the carousel by 2 <LI> tags, when each video ended. This was used, when the carouselShift function wasn't tied into this function.
				 * carouselTimer(json, 1);
				 */
			} else if (model.debug.all || model.debug.autoAdvance || model.debug.dashes) {
				log('auto-scrolling has been stopped!');
			}
		}, autoAdvanceTimer);
	}

	function centerBreadcrumbs(json) {
		traceRoute(model, 'centerBreadcrumbs');

		var keyBreadcrumbs = '#' + json.widgetIdLong + ' ' + model.dom.classes.breadcrumbs;
		var keyViewport = '#' + json.widgetIdLong + ' ' + model.dom.classes.viewport;
		if (model.debug.all || model.debug.breadcrumbs) {
			log('keyBreadcrumbs: ' + keyBreadcrumbs);
			log('keyViewport: ' + keyViewport);
		}

		//var breadcrumbs = $(keyBreadcrumbs);
		var viewport = $(keyViewport);

		if (model.debug.all || model.debug.breadcrumbs) {
			//log('Total breadcrumbs: ' + breadcrumbs.length);
			log('viewport Width: ' + viewport.width());
		}

		// Each breadcrumb = 14px wide + a 7px right-margin between the 1st & Nth breadcrumbs = 21px wide for each breadcrumb 1-6 & then 14px wide for the 7th breadcrumb. Min width: 56px. Max width: 140px.
		var breadcrumbWidth = ((14+7)*(json.arrayLength-1)) + 14; // breadcrumbs.length
		if (model.debug.all || model.debug.breadcrumbs) {
			log('breadcrumbWidth: ' + breadcrumbWidth);
		}

		// Find the gutter widths.
		var gutterWidth = (viewport.width() - breadcrumbWidth) / 2;
		if (model.debug.all || model.debug.breadcrumbs) {
			log('gutterWidth: ' + gutterWidth);
		}

		// Apply the left-margin gutter value to the 1st breadcrumb.
		$(keyBreadcrumbs + '.first').attr('style','margin-left:' + gutterWidth + 'px;');
	}

	function changeActiveCarouselClass(json){
		traceRoute(model, 'changeActiveCarouselClass');

		var domKey = getDomClasses('currentCarouselItem', json, true);
		if (model.debug.all || model.debug.ghostPhotos) {
			log('domKey: ' + domKey);
		}
		var newLiTag = $(domKey);
		var arrParts = newLiTag[0].id.split('-');
		var newThumbnailId = arrParts[1];

		if (model.debug.all || model.debug.ghostPhotos) {
			log('currentPosition: ' + model.data.dashes.currentPosition);
			log('newThumbnailId: ' + newThumbnailId);
		}

		eonline.mWidgetsOnly.carousel.changeBorders(json.widgetIdLong, newThumbnailId, 3);
		//model.data.lastThumbnailId = newThumbnailId;
		if (model.debug.all || model.debug.ghostPhotos) {
			log('------');
		}
	}

	function changePlayerData(json, pandaIdOrGuid) { // Passes control over to the eonline.videoPlayerEngine.
		traceRoute(model, 'changePlayerData');
		// Loads the new video, if Section Type = Video, but not Photos.
		if ((typeof(eonline.mWidgetsOnly) !== 'undefined') && (typeof(eonline.mWidgetsOnly.videoPlayerEngine) !== 'undefined') && (typeof(eonline.mWidgetsOnly.videoPlayerEngine.loadVideo) !== 'undefined')) {
			eonline.mWidgetsOnly.videoPlayerEngine.loadVideo({
				"useAutoPlay": json.autoPlay,
				"pandaId": pandaIdOrGuid, 
				"widgetId": json.widgetIdShort,
				"playerDomId": json.widgetIdLong + ' ' + model.dom.ids.thumbnails.rootPrefix + pandaIdOrGuid + ' ' + model.dom.ids.videoPlayers, 
				"playerId": model.config.playerId, 
				"playerType": getPlayerType(json),
				"ssid": json.SSID, 
				"omniture": {
					"playerName": json.omniture.playerName
				}
			});
		} else if (model.debug.errors) {
			error(model.config.programName + ": Can't find the eonline.mWidgetsOnly.videoPlayerEngine.loadVideo function");
		}
	}

	function checkLength(key, input) {
		traceRoute(model, 'checkLength');
		if ((typeof(eonline.widgets[model.data.widgetType]) !== 'undefined') && (typeof(eonline.widgets[model.data.widgetType].getData) !== 'undefined')) {
			var dataLength = $.trim(input).length;
			var thresholds = eonline.widgets[model.data.widgetType].getData('config.thresholds');
			if (dataLength < thresholds[key].smallToMedium) {
				var className = 'small';
			} else if ((dataLength >= thresholds[key].smallToMedium) 
					&& (dataLength < thresholds[key].mediumToLarge)) {
				var className = 'medium';
			} else { // (dataLength >= thresholds[key].mediumToLarge) 
				var className = 'large';
			}
			return className;
		}
	}

	/* Turned off, pending further design review from a TPM & BizDev, regarding small/medium/large+wrapping title heights & overlapping conditions.
	function checkTitleHeight(titleTag, subHeadlineTag, canShowSubHeadline, switchKey, counter) {
		traceRoute(model, 'checkTitleHeight');

		// Detects Small, Medium or Large Title.
		var title = titleTag.text();
		var titleClass = checkLength('title',title);

		// Detects Small, Medium or Large Sub Headline.
		var subHeadline = subHeadlineTag.text();
		var subHeadlineClass = checkLength('subHeadline',subHeadline);
		if (subHeadlineClass !== 'small') {
			subHeadlineTag.addClass(model.dom.classes.multiLineSubHeadline);
		}

		if (model.debug.all || model.debug.titleLengths) {
			log('titleClass: ' + titleClass);
			log('subHeadlineClass: ' + subHeadlineClass);
		}

		var classSizes = ['small','medium','large'];
		for (var i=0,j=classSizes.length; i<j; i++) {
			// Replace all title font class names from the widgets, with new titles for each font-size.
			replaceClass(titleTag,'title-font-size-'+classSizes[i],'title-font-size-'+titleClass);
		}

		// Replace all sub headline font class names from the widgets, with new sub headline for each font-size.
		subHeadlineTag.addClass('sub-headline-font-size-'+subHeadlineClass);

		var titleHeight = titleTag.height();
		if (titleHeight > 60) { // Title is 2 lines & will now auto-resize down to a smaller font size.
			titleTag.addClass(model.dom.classes.multiLineTitle);

			// Re-check the height, after the multi-line class has been applied to it... to prevent overlapping.
			titleTag.attr('style','height:auto');
			var testHeight = titleTag.height();
			if (testHeight > 40) { // If it's still over 100px & auto-wrapped, then hide the sub-headline.
				if (switchKey == 'videoStart') {
					var newHeight = 45;
				} else if (titleClass === 'medium') {
					var newHeight = 100;
				} else {
					var newHeight = 82;
				}
				titleTag.attr('style','height:' + newHeight + 'px'); // ' + titleHeight + '
				subHeadlineTag.hide();
			} else {
				// Otherwise, revert that pending change.
				//titleTag.removeAttr('style');
				//titleTag.removeClass(model.dom.classes.multiLineTitle);
				if (canShowSubHeadline) {
					subHeadlineTag.show();
				} else if ((model.data.widgetType === 'm3') && (switchKey === 'videoStart')) {
					subHeadlineTag.hide();
				}
			}
		} else if ((model.data.widgetType === 'm3') && (switchKey === 'videoStart')) {
			subHeadlineTag.hide();
		} else {
			titleTag.removeAttr('style');
			titleTag.removeClass(model.dom.classes.multiLineTitle);
			subHeadlineTag.show();
		}
	}
	*/

	function clearTimer(switchKey) {
		traceRoute(model, 'clearTimer');

		clearTimeout(model.timers[switchKey].event);
	}

	function detectJsonObject(json) {
		if (!json || (typeof(json.widgetIdLong) === 'undefined')) {
			json = model.data.initJson;
		}
		return json;
	}

	/* Turned off, pending further design review from a TPM & BizDev, regarding small/medium/large+wrapping title heights & overlapping conditions.
	function detectMultiLineTitleHeight(json) { // This is the loop for the adjustTitleHeight() function.
		traceRoute(model, 'adjustTitleHeight');

		// All Titles & All Sub-Headlines.
		var thumbRoot = '#' + json.widgetIdLong + ' ' + model.dom.classes.thumbnails.rootLiTags;
		var titleKey = thumbRoot + ' ' + model.dom.classes.widgetTitles;
		$(titleKey).each(function(i) {
			adjustTitleHeight($(this), titleKey);
		});
	}
	*/

	function detectVideosSectionType(json) {
		traceRoute(model, 'detectVideosSectionType');

		// Get the Panda Id & Section Type values from the DOM.
		var domKey = getDomClasses('currentCarouselItem', json, true);
		var sectionType = extractDataFromDom('sectionType', domKey, json);
		return (sectionType.toLowerCase() === 'videos') ? true : false;
	}

	function extractDataFromDom(switchKey, domKey, json) {
		traceRoute(model, 'extractDataFromDom');

		switch(switchKey) {
			case 'pandaIdOrGuid':
				var data = $(domKey).find(model.dom.classes.videoEnginePlayers).attr('data-video-id');
			break;
			case 'sectionType':
				var data = $(domKey).find(model.dom.ids.sectionTypes.headlineWrapTag).attr('data-section-type');
			break;
		}
		return data;
	}

	function getData(key, widgetId) {
		traceRoute(model, 'getData');

		if (key === 'model') {
			data = model;
		} else {
			// Allows for any of the model.data from the Core JSON object to be returned.
			key = key.replace('model.','');
			if (key.indexOf('.') > -1) {
				var data = model;
				var keyPieces = key.split('.');
				for (var i=0, j=keyPieces.length-1; i<=j; i++) {
					data = data[keyPieces[i]];
				}
			} else {
				data = model.data[key];
			}
		}
		return data;
	}

	function getDomClasses(switchKey, json, usePoundSign) {
		traceRoute(model, 'getData');

		var domKey = (usePoundSign) ? '#' : '';
			domKey += model.dom.keys.carousel + ' ';
		switch(switchKey) {
			case 'currentCarouselItem':
				domKey += model.dom.classes.thumbnails.rootLiTags + '-' + model.data.dashes.currentPosition;
			break;
			case 'arrows': // Both
				domKey += model.dom.classes.arrows.both;
			break;
			case 'arrowLeft':
				domKey += model.dom.classes.arrows.left;
			break;
			case 'arrowRight':
				domKey += model.dom.classes.arrows.right;
			break;
			case 'backgroundAreas': // Both
				domKey += model.dom.classes.backgroundGradients.both;
			break;
			case 'backgroundAreaLeft':
				domKey += model.dom.classes.backgroundGradients.left;
			break;
			case 'backgroundAreaRight':
				domKey += model.dom.classes.backgroundGradients.right;
			break;
		}
		if (model.debug.all || model.debug.arrows) {
			log('domKey: ' + domKey);
			log('switchKey: ' + switchKey + ' domKey: ' + domKey);
		}
		return domKey;
	}

	function getDomKey(key, json) {
		traceRoute(model, 'getDomKey');
		var widgetKey = '#' + model.data.initJson.widgetIdLong;
		switch(key) {
			case 'activeTab':
				var domKey = widgetKey + ' ' + model.dom.classes.thumbnails.rootLiTags + model.dom.classes.thumbnails.active;
			break;
		}
		return domKey;
	}

	function getPlayerType(json) {
		return model.config.playerTypes[json.widgetType];
	}

	/* Have you ever played Pac-Man? Do you remember the left & right passageways, which ghosts & Pac-Man can use to escape to the other side of the screen? 
	 * Think of this function, as allowing the ghost photo Z to jump to thumbs.last & allowing ghost photo A to jump to thumbs.first. That's its function!
	 * It's also called "Do the Mario" from Super Mario Brothers, where Mario & Luigi could run off of the left or right edge of the screen & appear on the opposite right or left edge of the screen, respectively.
	 */
	function ghostWarp(json) {
		traceRoute(model, 'ghostWarp');

		var carouselData = eonline.mWidgetsOnly.carousel.getData('data.carousels.' + json.carouselKey);
		if (model.debug.all || model.debug.ghostPhotos) {
			log('before warp');
			log('model.data.dashes.currentPosition: ' + model.data.dashes.currentPosition);
			log('carouselData.maxItems: ' + carouselData.maxItems);
			log('carouselData.currentPos: ' + carouselData.currentPos);
			log('carouselData.minThumbRangePos: ' + carouselData.minThumbRangePos);
			log('carouselData.maxThumbRangePos: ' + carouselData.maxThumbRangePos);
		}

		var domKey = getDomClasses('currentCarouselItem', json, true);
		var id = $(domKey).attr('id');
		var isGhostPhotoFound = false;
		if (model.debug.all || model.debug.ghostPhotos) {
			log('id: ' + id);
			log('json.warpDirection: ' + json.warpDirection);
			log('carouselData.currentPos: ' + carouselData.currentPos);
			log('model.data.dashes.currentPosition: ' + model.data.dashes.currentPosition);
		}
		var shiftDistance = 0;
		switch(json.warpDirection) {
			case 'left': // ghost-thumb-Z detected
				if (model.debug.all || model.debug.ghostPhotos) {
					log('carouselData.currentPos: ' + carouselData.currentPos);
					log('Jump Position: -1');
					log('-----');
				}
				if (carouselData.currentPos === -1) {
					if (model.debug.all || model.debug.ghostPhotos) {
						log('ghost photo Z found -> Warp to thumbs' + model.dom.classes.thumbnails.last);
					}

					var domWarpKey = eonline.mWidgetsOnly.carousel.getDomClasses('rootDivPlusThumbnailLast');
					isGhostPhotoFound = true;
					var newWarpPosition = carouselData.maxItems;
					shiftDistance = -(carouselData.itemWidth * newWarpPosition);
					if (model.debug.all || model.debug.ghostPhotos) {
						log('newWarpPosition: ' + newWarpPosition);
						log('carouselData.itemWidth: ' + carouselData.itemWidth);
						log('shiftDistance: ' + shiftDistance);
					}

					// Change the Carousel's Position.
					eonline.mWidgetsOnly.carousel.updateCarouselPosition(json.widgetId, json.carouselKey, newWarpPosition, 3); 
					eonline.mWidgetsOnly.carousel.setData('data.carousels.' + json.carouselKey + '.minThumbRangePos', newWarpPosition);
					eonline.mWidgetsOnly.carousel.setData('data.carousels.' + json.carouselKey + '.maxThumbRangePos', newWarpPosition);
				}
			break;
			case 'right': // ghost-thumb-A detected
				if (model.debug.all || model.debug.ghostPhotos) {
					log('carouselData.currentPos: ' + carouselData.currentPos);
					log('model.data.dashes.currentPosition: ' + model.data.dashes.currentPosition);
					log('carouselData.maxItems: ' + carouselData.maxItems);
					log('Jump Position: ' + (carouselData.maxItems+1));
					log('-----');
				}
				if (carouselData.currentPos === (carouselData.maxItems+1)) {
					if (model.debug.all || model.debug.ghostPhotos) {
						log('ghost photo A found -> Warp to thumbs' + model.dom.classes.thumbnails.first);
					}

					var domWarpKey = eonline.mWidgetsOnly.carousel.getDomClasses('rootDivPlusThumbnailFirst');
					isGhostPhotoFound = true;
					var newWarpPosition = 0;

					// Change the Carousel's Position.
					eonline.mWidgetsOnly.carousel.updateCarouselPosition(json.widgetId, json.carouselKey, newWarpPosition, 5);
					eonline.mWidgetsOnly.carousel.setData('data.carousels.' + json.carouselKey + '.minThumbRangePos', newWarpPosition);
					eonline.mWidgetsOnly.carousel.setData('data.carousels.' + json.carouselKey + '.maxThumbRangePos', newWarpPosition);
				}
			break;
		}
		if (model.debug.all || model.debug.ghostPhotos) {
			log('shiftDistance: ' + shiftDistance + 'px');
			log('isGhostPhotoFound: ' + (isGhostPhotoFound) ? 'true': 'false');
		}
		if (isGhostPhotoFound) {
			var domKey = eonline.mWidgetsOnly.carousel.getDomClasses('rootDivPlusThumbnailWrap');
			if (model.debug.all || model.debug.ghostPhotos) {
				log('domKey: ' + domKey);
				log('*** Ghost Photo Found! ***');
				log('SlideShow Shift: ' + shiftDistance + 'px');
			}
			$('#'+domKey).css('left',shiftDistance+'px');
			var nextThumbnailId = $('#'+domWarpKey).attr('id').replace('thumb-','');
			if (model.debug.all || model.debug.ghostPhotos) {
				log('domWarpKey: ' + domWarpKey);
				log('nextThumbnailId: ' + nextThumbnailId);
			}
			//eonline.mWidgetsOnly.carousel.changeBorders(json.widgetId, nextThumbnailId, 4);
		}
		if (model.debug.all || model.debug.ghostPhotos) {
			log('after warp');
			log('carouselData.currentPos: ' + carouselData.currentPos);
			log('carouselData.minThumbRangePos: ' + carouselData.minThumbRangePos);
			log('carouselData.maxThumbRangePos: ' + carouselData.maxThumbRangePos);
			log('model.data.dashes.currentPosition: ' + model.data.dashes.currentPosition);
			log('======');
		}
	}

	function hideSectionTypeTab(tabKey) {
		traceRoute(model, 'hideSectionTypeTab');
		$(tabKey + ' ' + model.dom.ids.sectionTypes.headlineWrapTag).css({'visibility':'hidden'});
		$(tabKey + ' ' + model.dom.ids.sectionTypes.gradients).hide();
		$(tabKey + ' ' + model.dom.ids.sectionTypes.triangles).hide();
	}

	function hideSocialMediaIcons() {
		traceRoute(model, 'hideSocialMediaIcons');
		var widgetKey = '#' + model.data.initJson.widgetIdLong;
		$(widgetKey + ' ' + model.dom.ids.socialMediaIcons).hide();
	}

	function init(json) {
		traceRoute(model, 'init');

		// Map Data:
		mapData(json);

		/*setTimeout(function() {
			addGhostThumbs(json);
		}, 50);*/

		/* Binds Listeners. This timeout fixes the eol.carousel.js code's Race condition, which auto-binds to these 2 arrow classes: .buttons.prev & .buttons.next. 
		 * The M2 & M3 have 2 sets of arrows, due to the background opacity + opaque white arrows design requirement. Two sibling divs (ex: <div>bkg</div><div>arrow</div>) have to be used. 
		 * If you use parent->child (ex: <div>bkg<div>arrow</div></div>)  divs, the arrows will become transparent!
		 */
		setTimeout(function() {  // Don't remove this! Or the background-gradients won't auto-advance the dashes, like the arrows do!
			bindListeners(json);
		}, model.timers.bindListeners);

		// Resizes the Section Type Tabs, so that Internationalized Text can lengthen them as needed.
		//resizeSectionTypeTabs(json);

		// Adds the Active Class to the 1st Carousel Thumbnail Item.
		$('#' + model.dom.keys.carousel + ' ' + model.dom.classes.thumbnails.rootLiTags + model.dom.classes.thumbnails.first).addClass('active');

		// Update the model, with the number of dashes which are found in the DOM.
		model.data.dashes.stopPosition = $('#' + json.widgetIdLong + ' ' + model.dom.classes.breadcrumbs).length - 1;

		// Start the Auto-Advancing Carousel Timer.
		initCarouselTimer(json);

		// Checks for any M2 or M3 specific code & loads that if found.
		if ((typeof(eonline.widgets[json.widgetType]) !== 'undefined') && (typeof(eonline.widgets[json.widgetType].init) !== 'undefined')) {
			eonline.widgets[json.widgetType].init(json);
		} else if (model.debug.errors) {
			error(model.config.programName + ": Can't find the eonline.widgets." + json.widgetType + ".init function");
		}

		// Initialize the video players.
		initAllVideoPlayers(json);

		// Allows for Multi-Line Title Heights.
		//detectMultiLineTitleHeight(json);

		// Dynamically Centers the Breadcrumbs, as they appear with 3-7 breadcrumbs.
		// centerBreadcrumbs(json);
	}

	// Start the Auto-Advancing Carousel Timer.
	function initCarouselTimer(json) {
		traceRoute(model, 'initCarouselTimer');

		var availableCarousels = eonline.mWidgetsOnly.carousel.getData('model.data.availableCarousels');
		if (model.debug.all || model.debug.availableCarousels) {
			log('availableCarousels: ' + availableCarousels);
		}
		if (availableCarousels > 0) {
			carouselTimer(json, 2); // <- The eonline.carousel.js file has to load before this functions starts! 
			// This "fn eonline.mWidgetsOnly.carousel.bindCarousel" must preceed this: "fn eonline.widgets.slideshows.carouselTimer (2)". Or the widget fails to find the carousel's data.
		} else {
			/* LAZYLOAD eonline.mWidgetsOnly.lazyLoad.init('slideshows'); */
			setTimeout(function() {
				initCarouselTimer(json);
			},50);
		}
	}

	function initSocialMediaIcons(json, pandaIdOrGuid) {
		traceRoute(model, 'initSocialMediaIcons');

		// Initialize the Social Media Icons.
		if ((typeof(eonline.mWidgetsOnly) !== 'undefined') && (typeof(eonline.mWidgetsOnly.socialMediaIcons) !== 'undefined') && (typeof(eonline.mWidgetsOnly.socialMediaIcons.init) !== 'undefined')) {
			var data = model.data.socialMediaIcons[json.widgetIdShort][pandaIdOrGuid];
			data.all.pandaIdOrGuid = pandaIdOrGuid;
			if ((typeof(data) !== 'undefined') && (data)) {
				eonline.mWidgetsOnly.socialMediaIcons.init(data);
			}
		} else if (model.debug.errors) {
			error(model.config.programName + ": Can't find the eonline.mWidgetsOnly.socialMediaIcons.init function");
		}
	}

	function initAllVideoPlayers(json) {
		traceRoute(model, 'initAllVideoPlayers');

		// Loads the Video Data
		for (var pandaIdOrGuid in json.videos) {
			changePlayerData(json, pandaIdOrGuid);
		}
	}

	function mapData(json) {
		traceRoute(model, 'mapData');

		model.data.initJson = json; // This will be used to restart the auto-advancing carousel timers, once the video ends.
		model.dom.keys.carousel = eonline.mWidgetsOnly.carousel.getCarouselId(json.widgetIdLong);
		model.data.useInfiniteLoop = eonline.mWidgetsOnly.carousel.getData('model.data.useInfiniteLoop');
		model.data.widgetType = json.widgetType;
		model.data.dashes.max = $('#' + json.widgetIdLong + ' ' + model.dom.classes.breadcrumbs).length - 1;

		// Allows the carousel to auto-advance past the end of the photo/breadcrumb array, if the carousel is configured in the JSON to use an infinite loop.
		setTimeout(function() {
			model.data.useInfiniteLoop = eonline.mWidgetsOnly.carousel.getData('model.data.useInfiniteLoop');
		}, 1000);
	}

	function mobileSwipeEvent(e) {
		traceRoute(model, 'mobileSwipeEvent');

		/* Hmm... A previous change fixed the iPad swiping, but it broke the ability for the code to easily find the <li id="..."> attributes. It moved the listeners on the <li> tags up to the parent <ul> tag. The code was expecting to extract the <li> tag's id attribute from the DOM. That DOM-id extraction code had to be rewritten, in order to find another way to get to the <li id="..."> attributes. They appear as: "thumb-pandaId". The reason that we need them, is that we need to know what the photo/video ID is for the item that was swiped on. The JSON Databind arrays are only built with the videos, not blank array items. So an array of 7 carousel items, might have 2 videos in it. So the JSON contains 2 items in the array. We can't use array[i] to find the indexed (0-6) pointer in that array. That's why we need to extract the PandaId from the DOM.
		 * var domAreaKey = $(this).attr('id');
		 * 1st attempt, try: e.stopPropagation(); <- Hmm... this didn't stop the iPad's swipe from starting the video.
		 * 2nd attempt, try setting: model.data.isSwiping = true; & then using this to prevent a race condition: var domAreaKey = model.data.currentPandaId; <- This won't work either. We don't have 7 pandaIds listed in the array, where we could use an integer to point to the array location... like array[i];
		 * 3rd Try, grab the .active tab's id from: <li id="thumb-pandaId" class="thumbs thumbs-# active">
		 */
		var activeTabKey = getDomKey('activeTab');
		var domAreaKey = $(activeTabKey).attr('id');
		var switchKey = e.direction;
		switch (switchKey){
			case 'left':
				carouselShift('rightArrow', domAreaKey, model.data.initJson);
			break;
			case 'right':
				carouselShift('leftArrow', domAreaKey, model.data.initJson);
			break;
		}
	}

	/*function mobileTapEvent(e) {
		traceRoute(model, 'mobileTapEvent');
		//var x = model.data.jsonArrows;
		mobileSwipeEvent(e);
	}
	*/

	// This is a "function template".
	function optionalListeners(switchKey, listenerKey) {
		traceRoute(model, 'optionalListeners');

		if (model.debug.all || model.debug.listeners) {
			log('switchKey: ' + switchKey);
			log('optionalListenerKey: ' + listenerKey);
		}
		switch(listenerKey) {
			case 'mouseover':
				applyBackgroundHover(switchKey);
			break;
			case 'mouseout':
				removeAllBackgroundHovers();
			break;
		}
	}

	function removeAllBackgroundHovers() {
		traceRoute(model, 'removeAllBackgroundHovers');

		// Gets the JSON code from the model, since it can't be directly passed in through the optionalListeners code.
		var json = model.data.initJson;

		// Removes the background hover class from the arrows.
		var domKey = getDomClasses('arrows', json, true); // Both
		$(domKey).removeClass('hover');

		// Removes the background hover class from the background opacity areas.
		var domKey = getDomClasses('backgroundAreas', json, true); // Both
		$(domKey).removeClass('hover');
	}

	// To Do, move this to the base library:
	function replaceClass(domKey, before, after) {
		traceRoute(model, 'replaceClass');
		$(domKey).removeClass(before);
		$(domKey).addClass(after);
	}

	/* This will dynamically resize the Section Type's background gradient, based upon the width of the text.
	 * This will allow Internationalized Section Types to dynamically resize those tabs.
	 */
	function resizeSectionTypeTabs(json) {
		traceRoute(model, 'resizeSectionTypeBackgroundGradients');
		$('#' + json.widgetIdLong + ' ' + model.dom.classes.sectionTypes.wrap).each(function(i) {
			var sectionTypeLink = $(this).children(model.dom.classes.sectionTypes.links);
			var sectionTypeText = sectionTypeLink.html();
			if (sectionTypeText) {
				var sectionTypeGradient = sectionTypeLink.next(model.dom.classes.sectionTypes.gradient);
				var sectionTypeGradientTriangle = sectionTypeGradient.next(model.dom.classes.sectionTypes.triangles);

				// Computes the new width.
				var sectionTypeLinkWidth = sectionTypeLink.width();
				var newWidth = 23 + sectionTypeLinkWidth + 18; // Left Margin + Section Type Width + Right Margin.

				// Sets the section type background gradient's width, to the new width.
				sectionTypeGradient.css('width',newWidth + 'px');

				// Sets the triangle to its new position.
				/* var newTrianglePosition = newWidth - 23;
				sectionTypeGradientTriangle.css('margin-left', newTrianglePosition + 'px'); */
			} else { // Section Type === 'None'
				var carouselId = $(this).parents('.thumbs').attr('id');
				var widgetKey = '#' + model.data.initJson.widgetIdLong;
				var tabKey = widgetKey + ' #' + carouselId;
				hideSectionTypeTab(tabKey);
			}
		});
	}

	function setData(key, data, json) {
		traceRoute(model, 'setData');
		if (key === 'socialMediaIcons') { // && ($.isArray(model.data[key]))) {
			/* Both of these functions will "chain the arrays together like box cars on a train" rather than interlace them based on the pandaIdOrGuid values, which is what we want.
			//This jQuery function will fill in 200K "undefined" objects: // model.data[key] = $.merge(model.data[key], data); // The data could be an array, a string, an integer, a floating point number, an object or a JSON Object.
			//model.data[key] = model.data[key].concat(data); // This native JS will only add the 24 objects, which we want. 
			*/
			// So we have to build our custom interlaced array merge function here.....
			for (var pandaIdOrGuid in data) {
				if (model.debug.all || model.debug.dataBind) {
					log('pandaIdOrGuid: ' + pandaIdOrGuid);
				}
				if (!model.data[key]) {
					model.data[key] = {};
				}
				if (!model.data[key][json.widgetIdShort]) {
					model.data[key][json.widgetIdShort] = {};
				}
				model.data[key][json.widgetIdShort][pandaIdOrGuid] = data[pandaIdOrGuid];
			}
		} else {
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
	}

	function toggleWidgetFeatures(switchKey, json) {
		traceRoute(model, 'toggleWidgetFeatures');

		json = detectJsonObject(json);

		// Avoids turning off the tabs in the M3's next <li> tag, when the video player is started.
		var widgetKey = '#' + json.widgetIdLong;
		var activeTabKey = getDomKey('activeTab');
		var titleKey = activeTabKey + ' ' + model.dom.ids.titles;
		var subHeadlineKey = activeTabKey + ' ' + model.dom.ids.subHeadlines;
		var titleTag = $(titleKey); // #cms-widget-843 .thumbs.active #widget-sub-headline
		/* Gets the current active tab's id attribute, to prevent race conditions later on where the .active class changes tabs after 
		 * the carousel's animation scrolls left/right & we want to toggle off certain DOM element features... but that last video <LI> tag is no longer the
		 * active <LI> tag, which the user is looking at. So we'll cache this value & use it as soon as the arrow is clicked on.
		 */
		var subHeadlineTag = $(activeTabKey + ' ' + model.dom.ids.subHeadline);
		//var subHeadlineLinkHeight = $(activeTabKey + ' ' + model.dom.ids.subHeadlineLink).height();
		var widgetType = model.data.widgetType;

		switch (switchKey) {
			case 'preSlide':
				// Turn off the Social Media Icons
				hideSocialMediaIcons();

				// Turn on the Sub-Headline, since the Social Media Icons will be turned off.
				var activeTabKey = getDomKey('activeTab');
				var subHeadlineTag = $(activeTabKey + ' ' + model.dom.ids.subHeadline);
				subHeadlineTag.show();
				if (model.data.widgetType === 'm2') {
					subHeadlineTag.removeAttr('style');
				}

				// Turn on the Section Type Tab.
				var sectionTypeLink = $(activeTabKey + ' ' + model.dom.classes.sectionTypes.links);
				var sectionTypeText = sectionTypeLink.html();
				if (sectionTypeText) {
					$(activeTabKey + ' ' + model.dom.ids.sectionTypes.gradients).show();
					$(activeTabKey + ' ' + model.dom.ids.sectionTypes.triangles).show();
					$(activeTabKey + ' ' + model.dom.ids.sectionTypes.headlineWrapTag).show();
				}
			break;
			case 'videoStart':

				// Add the controls attribute, if the video player engine's code has been modified to remove that feature.
				$(widgetKey + ' video').attr('controls','controls');

				// Turn off the Video's Play Button.
				$(activeTabKey + ' ' + model.dom.classes.playBtns).hide();

				// Turn off the Section Type Tab.
				hideSectionTypeTab(activeTabKey);

				// Shrink the Headline/Title to make room for the Sponsorship Ad.
				var newWidth = (widgetType === 'm2') ? 437 : 489;
				titleTag.css({
					"width": newWidth + "px"
				});

				// Turn off the Sub-Headline, which is where the Social Media Icons will appear at.
				var canShowSubHeadline = (widgetType === 'm2') ? true: false;
				//checkTitleHeight(titleTag, subHeadlineTag, canShowSubHeadline, switchKey, 2);

				// Turn on the Sponsorship Ad
				$(widgetKey + ' ' + model.dom.ids.sponsorshipAd).show();

				// Turn on the Social Media Icons
				$(widgetKey + ' ' + model.dom.ids.socialMediaIcons).show();

				// Initialize the Social Media Icons.
				if ((typeof(eonline.mWidgetsOnly) !== 'undefined') && (typeof(eonline.mWidgetsOnly.socialMediaIcons) !== 'undefined') && (typeof(eonline.mWidgetsOnly.socialMediaIcons.init) !== 'undefined')) {

					// Map data from the M2 or M3 Widgets to the Social Media Icons.
					var domKey = getDomClasses('currentCarouselItem', json, true);
					var pandaIdOrGuid = extractDataFromDom('pandaIdOrGuid', domKey, json);
					var data = model.data.socialMediaIcons[json.widgetIdShort][pandaIdOrGuid];

					// We need a flag to fix the log Like's Popup Comments Box. It's 450x233 onPageLoad, but 150x28 onAjaxReload.
					data.all.ajaxReloaded = (typeof(json.ajaxReloaded) !== 'undefined') ? true : false;

					// Load the Social media Icons.
					eonline.mWidgetsOnly.socialMediaIcons.init(data);
				} else if (model.debug.errors) {
					error(model.config.programName + ": Can't find the eonline.mWidgetsOnly.socialMediaIcons.init function");
				}

				// Used to change the <LI> tag's background color to black, so that a dark gray margin doesn't appear between the bottom of the video & the top of the text block.
				$(activeTabKey).addClass('videoPlaying');
			break;
			case 'videoEnd':

				//Turns these features off, whenever the video ends... by waiting for the control bar to finish.
				toggleWidgetFeatures('preSlide');

				// Remove the controls attribute from the HTML 5 <video> tag, as it causes problems with the carousel arrow's z-index order.
				$(widgetKey + ' video').removeAttr("controls");

				// Turn off the Sponsorship Ad
				$(widgetKey + ' ' + model.dom.ids.sponsorshipAd).hide();

				// Turn on the Video's Play Button.
				$(activeTabKey + ' ' + model.dom.classes.playBtns).show();

				// Stretch the Headline/Title, since the Sponsorship Ad will be hidden.
				var newWidth = (widgetType === 'm2') ? 564 : 630;
				titleTag.css({
					"width": newWidth + "px"
				});

				// Turn on the Sub-Headline, since the Social Media Icons will be turned off.
				//$(activeTabKey + ' ' + model.dom.ids.subHeadline).show();
				//adjustTitleHeight(titleTag, titleKey, subHeadlineKey);

				// Used to change the <LI> tag's background color to a dark gray, so that the VIDEOS tab doesn't disappear.
				$(activeTabKey).removeClass('videoPlaying');

			break;
		}
	}

	function ucFirst(string) {
		traceRoute(model, 'ucFirst (' + string + ')');
		return string.substring(0, 1).toUpperCase() + string.substring(1);
	}

	function updateBreadcrumbDashPosition(switchKey, json, carouselData) {
		traceRoute(model, 'updateBreadcrumbDashPosition');
		if (model.debug.all || model.debug.dashes) {
			log('Before - Current Position: ' + model.data.dashes.currentPosition);
		}
		// Updates the dash position.
		switch(switchKey) {
			case 'leftArrow':
				model.data.dashes.currentPosition--;
				if (model.data.dashes.currentPosition < model.data.dashes.min) {
					model.data.dashes.currentPosition = model.data.dashes.max;
				}
			break;
			case 'rightArrow':
				model.data.dashes.currentPosition++;
				if (model.data.dashes.currentPosition > model.data.dashes.max) {
					model.data.dashes.currentPosition = model.data.dashes.min;
				}
			break;
		}
		if (model.debug.all || model.debug.ghostPhotos) {
			log('currentPos: ' + model.data.dashes.currentPosition);
		}

		// Changes the breadcrumbs dash.
		var widgetKey = '#' + model.data.initJson.widgetIdLong;
		if (model.debug.all || model.debug.dashes) {
			log('After - Current Position: ' + model.data.dashes.currentPosition);
			log(widgetKey + ' ' + model.dom.classes.breadcrumbs + model.dom.classes.thumbnails.active);
			log('updateBreadcrumbDashPosition');
			log(widgetKey + ' ' + model.dom.ids.breadcrumbs + model.data.dashes.currentPosition);
		}

		// Removes the Active Class from all breadcrumbs.
		var key = widgetKey + ' ' + model.dom.classes.breadcrumbs;
		if (model.debug.all || model.debug.autoAdvance || model.debug.fnTrace || model.debug.dashes) {
			log('key: ' + key);
		}
		$(key).removeClass('active');

		// Adds the active class to the breadcrumb.
		$(widgetKey + ' ' + model.dom.ids.breadcrumbs + model.data.dashes.currentPosition).addClass('active');
	}

	function videoEnded(json) {
		traceRoute(model, 'videoEnded');

		json = detectJsonObject(json);
		json.hasVideoEnded = null;

		// Turns off the Playing Video, whenever the user clicks on the < or > carousel arrows. This will avoid a dual audio roll.
		if (detectVideosSectionType(json)) { // && $(domKey).hasClass('active')) {

			// Turns off the active social media icons.
			hideSocialMediaIcons();

			var domKey = getDomClasses('currentCarouselItem', json, true);
			var pandaIdOrGuid = extractDataFromDom('pandaIdOrGuid', domKey, json);
			//var sectionType = extractDataFromDom('sectionType', domKey, json);
			var playerDomId = json.widgetIdLong + ' ' + model.dom.ids.thumbnails.rootPrefix + pandaIdOrGuid + ' ' + model.dom.ids.videoPlayers;
			if (model.debug.all || model.debug.videoEnded) {
				log('domKey: ' + domKey);
				log('pandaIdOrGuid: ' + pandaIdOrGuid);
			}

			// Ties into the Video Player Engine to stop the current video.
			if ((typeof(eonline.mWidgetsOnly) !== 'undefined') && (typeof(eonline.mWidgetsOnly.videoPlayerEngine) !== 'undefined')) {

				if  (typeof(eonline.mWidgetsOnly.videoPlayerEngine.videoEnded) !== 'undefined') {
					//Format is: 'pandaIdOrGuid=212174,playerDomId=cms-widget-843 #thumb-212174 #evp-video-player-wrap,widgetId=cms-widget-843'
					eonline.mWidgetsOnly.videoPlayerEngine.videoEnded('pandaIdOrGuid=' + pandaIdOrGuid + ',playerDomId=' + playerDomId + ',widgetId=' + json.widgetIdLong, null, 7);
				} else if (model.debug.errors) {
					error(model.config.programName + ": Can't find the eonline.mWidgetsOnly.videoPlayerEngine.videoEnded function");
				}

				// Turns off the M2 & M3 widget's social media icon bars & the sponsorship ads, before the carousel begins to scroll.
				//toggleWidgetFeatures('videoEnd', json);
			} else if (model.debug.errors) {
				error(model.config.programName + ": Can't find the eonline.mWidgetsOnly.videoPlayerEngine object");
			}

			// Auto-advances to the next carousel item.
			carouselTimer({
				"hasVideoEnded": true
			}, 4);
		}
	}

	return { // Exposes Public Function Names
		"addGhostThumbs": addGhostThumbs,
		"callback": callback,
		"carouselTimer": carouselTimer,
		"centerBreadcrumbs": centerBreadcrumbs,
		"detectVideosSectionType": detectVideosSectionType, 
		"clearTimer": clearTimer,
		"getData": getData,
		"getDomClasses": getDomClasses,
		"init": init,
		"setData": setData,
		"toggleWidgetFeatures": toggleWidgetFeatures,
		"videoEnded": videoEnded
	};
})(jQuery);
