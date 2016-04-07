// Author: @briankueck Tweet: @eDevelopers1

eonline = (typeof(eonline) !== 'undefined') ? eonline : {}; // Same as window.eonline.
eonline.mWidgetsOnly = (typeof(eonline.mWidgetsOnly) !== 'undefined') ? eonline.mWidgetsOnly : {};
eonline.mWidgetsOnly.carousel = (function($) { // This is for the M-Series widgets only, until I can refactor it into the main eol.carousel.js file.

	var model = {
		"debug": {
			"all": false,
			"autoPlay": false,
			"availableCarousels": false,
			"borders": false,
			"carouselArrows": false,
			"domIds": false,
			"fnTrace": false,
			"ghostPhotos": false,
			"iPad": false,
			"isAnimating": false,
			"listeners": false,
			"maxItems": false,
			"timers": false
		},
		"config": {
			"arrowKeys": {
				"leftArrow": {
					"classKey": "buttonsPrev"
				},
				"rightArrow":{
					"classKey": "buttonsNext"
				}
			},
			"optionalListeners": ['mouseover', 'mouseout'],
			"programName": "eonline.mWidgetsOnly.carousel"
		},
		"data": {
			"availableCarousels": 0, // This is the ".length counter" for model.data.carousels. The reason is that the data is appended to that object using named/alphanumeric keys. It's not an array. So even with data, JS still reports the length as 0 instead of 1.
			"carousels": [ /* Was carousel:
				"currentPos": 4,
				"duration": 500,
				"itemWidth": (128 + 5),
				"maxItems": 15,
				"minThumbRangePos": 0,
				"maxThumbRangePos": 6, // This is a variable.
				"startPos": 3, // This is the domPositionCount value. For the C11 widget, it can be 0-7.
				"visibleRange": 6 // This is a constant.
				*/
			],
			"i18nText": {
				"nowPlaying": null,
				"playVideo": null
			},
			"lastThumbnailId": null,
			"linkData": {
				/* Looks like this & is extracted from the <a href="..."> tag in the DOM. It is cached so that the VideoEnded function can Auto-Play the next carousel's video:
					"domLink": <a href object>,
					"pandaIdOrGuid": 123456,
					"videoUrl": "...",
					"widgetId": "...",
					"widgetType": "..."
				*/
				/*"domLink": null,
				"pandaIdOrGuid": 0,
				"videoUrl": "",
				"widgetId": "",
				"widgetType": ""*/
			},
			"firstCarouselId": null,
			"isAnimating": false,
			"useInfiniteLoop": false,
			"widgetId": null,
			"widgetType": null
		},
		"dom": {
			"classes": {
				// These carousel IDs & classes will be automatically chained together like: classes.carouselWrap -> classes.carousel
				//"arrowsPrev": ".arrows.left", // Currently only used by M2 & M3 widgets, which also have clickable background opacity areas.
				//"arrowsNext": ".arrows.right", // Currently only used by M2 & M3 widgets, which also have clickable background opacity areas.
				"buttonsPrev": ".buttons.prev", // These are the arrows for most carousels, which use this script. Exceptions are: M2 & M3 widgets.
				"buttonsNext": ".buttons.next", // These are the arrows for most carousels, which use this script. Exceptions are: M2 & M3 widgets.
				"carouselWrap": ".eol-carousels", // Don't prefix this with anything from modalDialog!
				//"carousel": ".viewport", // Don't prefix this with anything from modalDialog or carouselWrap!
				"firstThumbnail": ".first",
				"lastThumbnail": ".last",
				"slideContainer": ".slide-container",
				"ghostThumbnails": ".ghosts",
				"rootDiv": "",
				"thumbnails": ".thumbs" // This was mapped to {"anchorLinks":".thumbnails"}, but for the M2 & M3 widgets... .thumbs = 7 <li> tags, .thumbnails = 4 <a href> tags. Reason: <li class="thumbs"><a class="thumbnails"><img></a></li><li class="thumbs"><video></li> <- Slideshow Carousels are both Photo + Video Carousels & photos have anchor tags with .thumbnails classes, but videos currently don't.
			},
			"ids": {
				"carouselIdPrefix": null,
				"dialogPlayer": null, // "evp-video-player-wrap",
				"template": null, // "eonline-video-player-wrap"
				"rootDiv": null,
				"widgetId": null
			}
		}, 
		"timers": {
			"defaults": {
				"addActiveClass": 0,
				"removeActiveClasses": 0
			},
			// Adds a delay to the M3 widget's .active class, so that it is removed after the animation stops running & not before.
			"m3": {
				/* These will be dynamically added, during the .init()->.mapData() function process.
				"addActiveClass": 575,
				"removeActiveClasses": 550
				*/
			}
		}
	};

	function addThumbnailBorder(widgetId, nextThumbnailId, counter) { // widgetId is optional, as the Video Detail Page also uses this Carousel... but without a Widget Id.
		if (model.debug.all || model.debug.fnTrace) { 
			log('fn ' + model.config.programName + '.addThumbnailBorder (' + widgetId + ',' + counter + ')'); 
		}
		var carouselClass = getDomClasses('carousel');
		var key = carouselClass + ' #thumb-' + nextThumbnailId;
		key = changeWidgetId(key, widgetId);
		if (model.debug.all || model.debug.borders || model.debug.carouselArrows || model.debug.domIds) {
			log('addThumbnailBorder key: ' + key);
			/* C11 Widget: #cms-widget-643 .eol-carousels .viewport #thumb-202468
			 * C11 Lightbox: #cms-widget-643-dynamic-content .eol-carousels .viewport #thumb-203134
			 * M2 Widget: #cms-widget-841 .eol-carousels .viewport #thumb-202468
			 * M3 Widget: #cms-widget-841 .eol-carousels .viewport #thumb-198078
			 * V2 Widget: #cms-widget-749 .eol-carousels .viewport #thumb-202468
			 * Video Detail Page: 
			 */
		}

		var timer = getTimer('addActiveClass');
		setTimeout(function() {
			if (model.debug.all || model.debug.ghostPhotos) { 
				log('active class change'); 
				log('addClass Key: ' + key);
			}
			$(key).addClass('active'); // key looks like this: ".eol-carousels #thumb-202468"
		}, timer);

		if (model.data.i18nText.nowPlaying) {
			$(key).attr("title", model.data.i18nText.nowPlaying);
			$(key).children('img').attr("alt", model.data.i18nText.nowPlaying);
		}
	}

	function bindAllCarousels(json) { // Binds Multiple Carousels on the same page. Required: carouselClass, carouselIdPrefix1, carouselIdPrefix2, thumbnails, maxThumbs, json.visible.startPosition, Optional: json.ids.widgetId
		if (model.debug.all || model.debug.availableCarousels || model.debug.fnTrace) { log('fn ' + model.config.programName + '.highlightFirstCarousel'); } // Was: highlightFirstCarousel
		// Bind the carousel to all of the objects in the DOM.
		var i = -1;
		var carouselKey = json.carouselClass;
		if (model.debug.all || model.debug.domIds) {
			log('carouselKey: ' + carouselKey);
		}
		$(carouselKey).each(function() { // Loops all Carousel Rows
			i++;
			bindCarousel(i, json);
		});
	}

	function bindCarousel(i, json) { // Binds a Single Carousel.
		if (model.debug.all || model.debug.availableCarousels || model.debug.carouselArrows || model.debug.fnTrace) { log('fn ' + model.config.programName + '.bindCarousel'); }
		var carouselId = json.carouselIdPrefix1 + i;
		var thumbnailKey = '#' + json.carouselIdPrefix2 + i + ' ' + model.dom.classes.thumbnails;
		var ghostThumbnailKey = thumbnailKey + model.dom.classes.ghostThumbnails; // Used to remove the M3's hidden 0 <li> item, which matches the thumbs.last <li> item. It's used as an FPO filler, to avoid deadspace to the left of the off-centered photo image.

		// Finds out how many thumbnails are in each carousel.
		if (model.debug.all || model.debug.carouselArrows || model.debug.maxItems || model.debug.domIds) {
			log('thumbnailKey: ' + thumbnailKey);
			log('ghostThumbnailKey: ' + ghostThumbnailKey);
		}
		var thumbs = $(thumbnailKey);
		var ghostThumbs = $(ghostThumbnailKey); // We call them "Ghosts", because "Ghosts" aren't real!
		var totalThumbs = thumbs.length - ghostThumbs.length;
		if (model.debug.all || model.debug.carouselArrows || model.debug.maxItems) {
			log('totalThumbs: ' + totalThumbs);
		}
		if (totalThumbs > json.maxThumbs) {
			totalThumbs = json.maxThumbs;
		}
		if (model.debug.all || model.debug.carouselArrows || model.debug.maxItems) {
			log('totalThumbs: ' + totalThumbs);
		}
		if (totalThumbs > 0) {
			var startPos = (json.visible.startPosition) ? json.visible.startPosition : 0;

			// Appends the Carousel's Data to the Array.
			var carouselKey = getCarouselKey(carouselId, json.ids.widgetId);
			model.data.carousels[carouselKey] = {
				"currentPos": startPos,
				"duration": json.duration,
				"itemWidth": (json.thumbnail.width + json.thumbnail.rightMargin),
				"maxItems": totalThumbs,
				"minThumbRangePos": json.visible.range.min,
				"maxThumbRangePos": json.visible.range.max, // This is a variable.
				"startPos": startPos,
				"visibleRange": (json.visible.range.max === json.visible.range.min) ? 1 : json.visible.range.max // This is a constant.
			};

			// Increments a counter, since model.data.carousels.length will always === 0, since it's a hash table/object with named/alphanumeric keys. It's not an array. So even with data, JS still reports the length as 0 instead of 1.
			model.data.availableCarousels++;

			// Binds a Click to each Carousel's Left & Right Arrow.
			bindDynamicListeners(carouselId, json.ids.widgetId, json);

			// Initial Arrow Enable/Disable Button States.
			updateCarouselArrowStates(carouselId, json.ids.widgetId, 1);

			// Updates the current position, but outside of the updateCarouselArrowStates() function.
			updateCarouselPosition(widgetId, carouselKey, startPos, 7);

			// Checks for the first carousel...
			if ((json.useRedBorder) && (i === 0)) {
				// Caches the first carousel's id for later.
				model.data.firstCarouselId = carouselId;

				// Changes the Red Carousel Border for the 1st carousel.
				var widgetId = null; // Video Detail Page would be null.
				if ((typeof(json.ids) !== 'undefined') && (typeof(json.ids.widgetId) !== 'undefined')) {
					widgetId = json.ids.widgetId; // C11 & V2 widgets will have widget ids.
				}

				changeBorders(json.pandaId, widgetId, 1);
			}
		}
	}

	/* This upgraded & refactored bind function uses a loop to cut down on the amount of copied & pasted code. Previously, there were duplicate code for the onClick & onTouchStart events + quadruple copies of the code
	 * in slideshows.js for attaching onMouseOver & onMouseOut events to each of the left & right arrows + their background opacity areas.
	 */
	function bindDynamicListeners(carouselId, widgetId, json) { // Modal Dialog Carousel Listeners linkData, json
		if (model.debug.all || model.debug.fnTrace || model.debug.listeners) { log('fn ' + model.config.programName + '.bindDynamicListeners (' + carouselId + ')'); }

		// Both Left & Right Arrows
		for (var jsonKey in model.config.arrowKeys) {
			if (model.debug.all || model.debug.listeners) {
				log('jsonKey: ' + jsonKey);
			}
			var arrowKey = getArrowKey(jsonKey, model.config.arrowKeys[jsonKey].classKey, carouselId, json);
			var eventListener = (isAppleDevice) ? 'touchstart' : 'click';
			if (model.debug.all || model.debug.listeners) {
				log('arrowKey: ' + arrowKey);
				log('eventListener: ' + eventListener);
			}

			// This binds the onClick event for PC Web & the onTouchStart events for iPad, to both the left & right arrows.
			$(arrowKey).unbind(eventListener).bind(eventListener,function() {

				// Avoids a closure issue, where the jsonKey from above is set to 'rightArrow' for both arrows.
				var classes = $(this).attr('class');
				var switchKey = ((classes.indexOf('buttons prev') > -1) || (classes.indexOf('arrows left') > -1)) ? 'leftArrow' : 'rightArrow';

				//if (isAppleDevice && (model.debug.iPad)) { alert(switchKey); }
				if (model.debug.all || model.debug.isAnimating || model.debug.listeners) { log(switchKey + ' clicked'); }
				if (model.debug.all || model.debug.isAnimating) { log('model.data.isAnimating: ' + model.data.isAnimating); }

				if (!model.data.isAnimating) { // Prevents allowing double-clicks on arrows to have adverse effects on the carousel's operations.
					model.data.isAnimating = true;

					// Required Click Listeners.
					model.data.linkData = getDataFromDom('arrow', $(this));
					var carouselId = getUniqueCarouselId(model.data.linkData);
					carouselShift(switchKey, carouselId, widgetId, json, 1);
				}
			});

			// This binds the onMouseOver & onMouseOut events for PC Web, to both the left & right arrows.
			if (!isAppleDevice) {
				for (var i=0, j=model.config.optionalListeners.length; i<j; i++) {
					var listenerKey = model.config.optionalListeners[i];
					// Optional Hover/Mouse Over Listeners.
					$(arrowKey).unbind(listenerKey).bind(listenerKey,function(e) {

						// Avoids a closure issue, where the jsonKey from above is set to 'rightArrow' for both arrows.
						var classes = $(this).attr('class');
						var switchKey = ((classes.indexOf('buttons prev') > -1) || (classes.indexOf('arrows left') > -1)) ? 'leftArrow' : 'rightArrow';

						if (model.debug.all || model.debug.fnTrace) { log(switchKey + ' ' + e.type); }
						if ((json) && (typeof(json[switchKey]) !== 'undefined') && (typeof(json[switchKey].optionalListeners) !== 'undefined')) {
							json[switchKey].optionalListeners(switchKey, e.type);
						}
					});
				}
			}
		}
	}

	function carouselShift(switchKey, carouselId, widgetId, json, counter) {
		if (model.debug.all || model.debug.carouselArrows || model.debug.fnTrace) { log('fn ' + model.config.programName + '.carouselShift (' + counter + ')'); }

		if ((detectWidgets('|m2|m3|')) && (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets.slideshows) !== 'undefined') && (typeof(eonline.widgets.slideshows.detectVideosSectionType) !== 'undefined') && (typeof(eonline.widgets.slideshows.getData) !== 'undefined')) {
			var domKey = eonline.widgets.slideshows.getDomClasses('currentCarouselItem', json, true);
			if (model.debug.all || model.debug.ghostPhotos) {
				log('domKey: ' + domKey);
			}
			var isVideoPlaying = $(domKey).hasClass('videoPlaying');
		}

		// Optional Pre-Slide Addendum Listeners.
		if ((json) && (typeof(json[switchKey]) !== 'undefined') && (typeof(json[switchKey].addendumListeners) !== 'undefined')) {
			json[switchKey].addendumListeners('preSlide', switchKey); // SwitchKey becomes directionKey in slideshows.js.
		}

		clearAllTimers();
		var carouselKey = getCarouselKey(carouselId, widgetId);
		var carouselData = model.data.carousels[carouselKey];
		if (model.debug.all || model.debug.carouselArrows || model.debug.domIds || model.debug.listeners) {
			log('switchKey: ' + switchKey);
			log('carouselKey: ' + carouselKey);
			log('Before - minThumbRangePos: ' + carouselData.minThumbRangePos);
			log('Before - maxThumbRangePos: ' + carouselData.maxThumbRangePos);
		}

		switch(switchKey) {
			case 'leftArrow':
				var leftHardStopPoint = (model.data.useInfiniteLoop) ? -1 : 0;
				if (model.debug.all || model.debug.ghostPhotos) {
					log('carouselData.minThumbRangePos: ' + carouselData.minThumbRangePos);
					log('leftHardStopPoint: ' + leftHardStopPoint);
				}
				var positionChangeSign = '-';
				var scrollDirectionSign = '+';
				var trueCondition = (carouselData.minThumbRangePos > leftHardStopPoint) ? true : false;
				if (carouselData.maxThumbRangePos === 0) {
					carouselData.minThumbRangePos = carouselData.maxItems - 1;
					carouselData.maxThumbRangePos = carouselData.maxItems - 1;
				} else if (model.data.useInfiniteLoop) {
					carouselData.minThumbRangePos = carouselData.minThumbRangePos - carouselData.visibleRange;
					carouselData.maxThumbRangePos = carouselData.maxThumbRangePos - carouselData.visibleRange;
				}
				var warpDirection = 'left';
			break;
			case 'rightArrow':
				var rightHardStopPoint = (model.data.useInfiniteLoop) ? carouselData.maxItems : carouselData.maxItems - 1;
				if (model.debug.all || model.debug.ghostPhotos) {
					log('carouselData.maxThumbRangePos: ' + carouselData.maxThumbRangePos);
					log('rightHardStopPoint: ' + rightHardStopPoint);
				}
				var positionChangeSign = '+';
				var scrollDirectionSign = '-';
				var trueCondition = (((!model.data.useInfiniteLoop) && (carouselData.maxThumbRangePos < rightHardStopPoint)) || 
									((model.data.useInfiniteLoop) && (carouselData.maxThumbRangePos <= rightHardStopPoint))) ? true : false;
				if (carouselData.maxThumbRangePos < carouselData.maxItems) {
					carouselData.minThumbRangePos = carouselData.minThumbRangePos + carouselData.visibleRange;
					carouselData.maxThumbRangePos = carouselData.maxThumbRangePos + carouselData.visibleRange;
				} else if (model.data.useInfiniteLoop) {
					carouselData.minThumbRangePos = 0;
					carouselData.maxThumbRangePos = 0;
				}
				var warpDirection = 'right';
			break;
		}

		if (model.debug.all || model.debug.ghostPhotos) {
			log('carouselData.maxThumbRangePos: ' + carouselData.maxThumbRangePos);
			log('carouselData.minThumbRangePos: ' + carouselData.minThumbRangePos);
		}

		if (model.debug.all || model.debug.listeners) {
			log('trueCondition: ' + trueCondition);
		}

		if (trueCondition) {
			var key = ('#' + carouselId).replace('##','#') + ' .slide-container';
			if (model.debug.all || model.debug.carouselArrows || model.debug.domIds || model.debug.ghostPhotos) {
				log('carouselData.visibleRange: ' + carouselData.visibleRange);
				log('carouselData.itemWidth: ' + carouselData.itemWidth);
				log('Carousel Shift: ' + scrollDirectionSign + (carouselData.visibleRange * carouselData.itemWidth) + 'px');
			}

			// This allows the user to see that the video has ended, before the carousel auto-advances to the next photo. It slows the animation down if needed.
			// For Photo & Video Carousel Items (which are not playing the video), don't delay the sliding animation, but let it instantaneously shift/slide left or right...
			var timer = 0;
			if ((detectWidgets('|m2|m3|')) && (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets.slideshows) !== 'undefined') && (typeof(eonline.widgets.slideshows.detectVideosSectionType) !== 'undefined') && (typeof(eonline.widgets.slideshows.getData) !== 'undefined')) {
				if (isVideoPlaying) {
					if (eonline.widgets.slideshows.detectVideosSectionType()) {
						// ... For Video Carousel Items (which are playing the video), grab the model.timers.autoAdvance.videoEnded value, which is currently setup to be 750ms. This will delay the animation, until the DOM elements finish toggling back to their default/reset positions. Then it will shift/slide left or right.
						var timer = eonline.widgets.slideshows.getData('model.timers.autoAdvance.videoEnded');
					}
				}
			}
			if (model.debug.all || model.debug.timers) {
				log('timer: ' + timer);
			}
			setTimeout(function() {
				$(key).animate({
					left: scrollDirectionSign + '=' + (carouselData.visibleRange * carouselData.itemWidth)
				}, carouselData.duration, model.data.easing, function() {

					// Optional Post-Scroll Addendum Listeners.
					if ((json) && (typeof(json[switchKey]) !== 'undefined') && (typeof(json[switchKey].addendumListeners) !== 'undefined')) {
						json[switchKey].addendumListeners('postSlide', switchKey);
					}

					// Decrements or Increments the Current Carousel Position by 1.
					updateCarouselPosition(model.data.widgetId, null, positionChangeSign+'1', 1); // Or model.data.widgetId.

					// Calls the Widget to run any additional callback routines.
					if ((model.data.useInfiniteLoop) && (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets[model.data.widgetType]) !== 'undefined') && (typeof(eonline.widgets[model.data.widgetType].callback) !== 'undefined')) {
						eonline.widgets[model.data.widgetType].callback('CarouselAnimation', {
							"warpDirection": warpDirection,
							"widgetId": widgetId,
							"carouselKey": carouselKey
						});
					}

					// Marks the Animation Complete, to avoid allowing double clicking on arrows to fire off 2 click events.
					model.data.isAnimating = false;

					// Restarts any carousel timers.
					if ((model.data.useInfiniteLoop) && (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets.slideshows) !== 'undefined') && (typeof(eonline.widgets.slideshows.carouselTimer) !== 'undefined')) {
						eonline.widgets.slideshows.carouselTimer(null, 0); // json
					}
				});
			}, timer);
		}
		if (!model.data.useInfiniteLoop) {
			updateHardLocks(carouselId, widgetId);
		}
		if (model.debug.all || model.debug.carouselArrows || model.debug.domIds || model.debug.listeners) {
			log('After - carouselData.minThumbRangePos: ' + carouselData.minThumbRangePos);
			log('After - carouselData.maxThumbRangePos: ' + carouselData.maxThumbRangePos);
		}
	}

	function changeBorders(widgetId, nextThumbnailId, counter) { // widgetId is optional, as the Video Detail Page also uses this Carousel... but without a Widget Id.
		if (model.debug.all || model.debug.fnTrace) { 
			log('fn ' + model.config.programName + '.changeBorders (' + widgetId + ',' + counter + ')'); 
		}

		if (nextThumbnailId !== model.data.lastThumbnailId) {
			// Removes all active carousel thumbnail borders, regardless of which thumbnail was clicked on last.
			removeAllThumbnailBorders(null, widgetId);

			// Highlights the active carousel thumbnail.
			addThumbnailBorder(widgetId, nextThumbnailId, counter);
		}

		model.data.lastThumbnailId = nextThumbnailId;
	}

	function changeWidgetId(rootDiv, widgetId) { // This locks carousels to specific widgets.
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.changeWidgetId'); }
		if (model.debug.all || model.debug.domIds) { log('(Before) rootDiv: ' + rootDiv); }
		if (widgetId) {
			// Replaces the old cms-widget-id value with the new cms-widget-id value.
			if (rootDiv.indexOf('cms-widget') > -1) {
				var parts = rootDiv.split(' ');
				parts = parts.pop();
				if (typeof(parts) === 'string') {
					var liTagRootDiv = parts;
				} else {
					var liTagRootDiv = parts.join(' ');
				}
			} else {
				var liTagRootDiv = rootDiv;
			}

			/* Injects a space into the jQuery class chain, if it's a lightbox. Otherwise, it won't do that for regular widgets.
			 * C11 Widget: #cms-widget-643.lp-widget.c11 .thumbs
			 * C11 Lightbox: #cms-widget-643-dynamic-content .lp-widget.c11 .thumbs
			 * M2 Widget: #cms-widget-841.lp-widget.m2 .thumbs
			 * M3 Widget: #cms-widget-843.lp-widget.m3 .thumbs
			 * V2 Widgets: #cms-widget-749.lp-widget.v2 .thumbs
			 * Video Detail Page: 
			 * See the "addThumbnailBorder key:" and "removeAllThumbnailBorders key:" areas.
			 */
			var chrSpace = '';
			if (
				((widgetId.indexOf('dynamic-content') > -1) && (widgetId.indexOf('lp-widget') === -1))
				|| 
				(
					(widgetId.indexOf('cms-widget') > -1) && (widgetId.indexOf('dynamic-content') === -1) 
				 && (liTagRootDiv.indexOf('dynamic-content') === -1) && 
					((liTagRootDiv.indexOf('eol-carousels') > -1) || 
						((liTagRootDiv.indexOf('lp-widget') === -1) && (liTagRootDiv.indexOf('thumbs') > -1))
					)
				)
			) {
				chrSpace = ' ';
			}
			if (liTagRootDiv.indexOf(widgetId) === -1) { // Avoids: ".vd-related_videos.vd-related_videos", when all we need is ".vd-related_videos". To see that, use the video detail page & click the end of the video's timeline so that it triggers the videoEnded function.
				liTagRootDiv = '#' + widgetId + chrSpace + liTagRootDiv;
				liTagRootDiv = liTagRootDiv.replace('  ',' ').replace(/\#\./g,'.');
			}
		}
		if (model.debug.all || model.debug.domIds) { log('(After) liTagRootDiv: ' + liTagRootDiv); }
		return liTagRootDiv;
	}

	function checkCarouselArrowStates(widgetId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.checkCarouselArrowStates'); }
		var carouselId = getCarouselId(widgetId);
		updateCarouselArrowStates(carouselId, widgetId, 3);
	}

	function checkForHardLocks(carouselId, bttnKey, bttnId, widgetId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.checkForHardLocks'); }

		var carouselKey = getCarouselKey(carouselId, widgetId);
		var carouselData = model.data.carousels[carouselKey];
		var carouselId = ('#' + carouselId).replace('##','#');
		var bttnId = carouselId + ' ' + model.dom.classes['buttons' + bttnKey];
		var arrowId = carouselId + ' ' + model.dom.classes['arrows' + bttnKey];

		if (model.debug.all || model.debug.carouselArrows) {
			log('bttnId: ' + bttnId);
			log('carouselData.currentPos: ' + carouselData.currentPos);
			log('carouselData.minThumbRangePos: ' + carouselData.minThumbRangePos);
			log('carouselData.maxThumbRangePos: ' + carouselData.maxThumbRangePos);
			log('carouselData.maxItems: ' + carouselData.maxItems);
		}

		$(bttnId).removeClass('disabled');
		$(arrowId).removeClass('disabled');
		if (!detectWidgets('|m2|m3|')) {
			switch (bttnKey) {
				case 'Prev':
					if ((typeof(carouselData) === 'undefined') || (typeof(carouselData.minThumbRangePos) === 'undefined') || (carouselData.minThumbRangePos === 0)) {
						if (model.debug.all) { log('locked'); }
						$(bttnId).addClass('disabled');
						$(arrowId).addClass('disabled');
					}
				break;
				case 'Next':
					if ((typeof(carouselData) === 'undefined') || (carouselData.maxThumbRangePos >= carouselData.maxItems)) {
						if (model.debug.all) { log('locked'); }
						$(bttnId).addClass('disabled');
						$(arrowId).addClass('disabled');
					}
				break;
			}
		}
	}

	function cleanKey(key) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.cleanKey'); }
		return key.replace(/\#/g,'').replace(/\ /g,'-').replace(/\./g,'');
	}

	function clearAllTimers() {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.clearAllTimers'); }
		// Prevents a Double-Auto-Advancing condition, where the carousel auto-advances 1x from the automated timer + 1x from the user click.
		if ((detectWidgets('|m2|m3|')) && (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets.slideshows) !== 'undefined') && (typeof(eonline.widgets.slideshows.clearTimer) !== 'undefined')) {
			eonline.widgets.slideshows.clearTimer('autoAdvance');
		}
	}

	function detectWidgets(widgets) { // Use either a pipe-delimited list or a comma-delimited list for this.
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.detectWidgets'); }
		return (widgets.indexOf(model.data.widgetType) > -1) ? true : false;
	}

	function getArrowKey(switchKey, classKey, carouselId, json) { // classKey could be an ID or a class name.
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.getArrowKey'); }

		if ((json) && (typeof(json[switchKey]) !== 'undefined') && (typeof(json[switchKey].id) !== 'undefined')) {
			var arrowKey = '#' + json[switchKey].id;
		} else if ((json) && (typeof(json.widgetIdLong) !== 'undefined')) {
			var arrowKey = '#' + json.widgetIdLong + ' ' + ('#' + carouselId).replace('##','#') + ' ' + model.dom.classes[classKey];
		} else {
			var arrowKey = ('#' + carouselId).replace('##','#') + ' ' + model.dom.classes[classKey];
		}
		if (model.debug.all || model.debug.domIds || model.debug.listeners) {
			log('arrowKey: ' + arrowKey);
		}
		return arrowKey;
	}

	function getCarouselId(widgetId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.getCarouselId'); }
		if (model.data.firstCarouselId) {
			var carouselId = model.data.firstCarouselId;
		} else {
			var carouselId = widgetId + ' #eol-carousel-0';
		}
		return carouselId;
	}

	function getCarouselKey(carouselId, widgetId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.getCarouselKey'); }
		if (!carouselId) {
			carouselId = getCarouselId(widgetId);
		}
		var carouselKey = cleanKey(carouselId);
		return carouselKey;
	}

	function getData(key) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.getData'); }

		// Allows for any of the data from the Core JSON object to be returned.
		key = key.replace('model.','');
		var keyParts = key.split('.');
		var data = model;
		for (var i=0, j=keyParts.length-1; i<=j; i++) {
			data = data[keyParts[i]];
		}
		return data;
	}

	function getDataFromDom(key, domLink) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.getDataFromDom key=' + key + ' domLink=' + domLink); }

		var carouselPrefix = '';
		if ((typeof(model.dom.ids.dialogPlayer) !== 'undefined') && (model.dom.ids.dialogPlayer)) {
			// Adds the C11 Modal Dialog's prefix.
			carouselPrefix = model.dom.ids.dialogPlayer + ' ';
		} else if ((typeof(model.data.widgetId) !== 'undefined') && (model.data.widgetId)) {
			// Add the M2 & M3 widget prefix.
			carouselPrefix = model.data.widgetId + ' ';
		}
		switch(key) {
			case 'arrow':
				var linkData = {
					"carouselIdPrefix": carouselPrefix + model.dom.ids.carouselIdPrefix,
					"rowCounter" : parseInt(domLink.attr('data-row-counter')),
					"widgetId": domLink.attr('data-widget-id'),
					"widgetType": domLink.attr('data-widget-type')
				};
			break;
			case 'arrowFetchesThumbnail': // M2, M3 Widget's Left & Right Arrow clicks.
				var linkData = {
					//"id": domLink.attr('id'),
					//"pandaIdOrGuid": domLink.attr('id').replace('thumb-',''),
					"sectionType": domLink.find('#widget-section-type-link').text()
				};
			break;
			case 'thumbnail':
				var linkData = {
					"domLink": domLink,
					"pandaIdOrGuid": domLink[0].id.replace('thumbnail-','').replace('thumbs-'),
					"startPos": parseInt(domLink.attr('data-counter')),
					"videoUrl": domLink.attr('data-url'),
					"widgetId": domLink.attr('data-widget-id'),
					"widgetType": domLink.attr('data-widget-type')
				};
			break;
		}

		if (model.debug.all) {
			log('domLink: ' + domLink);
			for (var property in linkData) {
				log(property + ': ' + linkData[property]);
			}
		}

		return linkData;
	}

	function getDomClasses(key) {
		if (model.debug.all || model.debug.fnTrace) { 
			log('fn ' + model.config.programName + '.getDomClasses (' + key + ')');
		}
		switch(key) {
			case 'carouselWrap':
				var classNames = model.dom.classes.carouselWrap;
			break;
			case 'carousel':
				var carouselWrapClass = getDomClasses('carouselWrap');
				var classNames = carouselWrapClass + ' ' + model.dom.classes.carousel;
			break;
			case 'firstThumbnail': // <li> tags.
				var classNames = model.dom.classes.firstThumbnail;
			break;
			case 'lastThumbnail': // <li> tags.
				var classNames = model.dom.classes.lastThumbnail;
			break;
			case 'rootDiv':
				var classNames = model.dom.classes.rootDiv;
			break;
			case 'thumbnailWrap': // <ul> tag.
				var classNames = model.dom.classes.slideContainer;
			break;
			case 'thumbnails': // <li> tags.
				var classNames = model.dom.classes.thumbnails;
			break;

			/* Do you see the pattern here? Everything above this comment are mapped into single classes in the model.dom.classes code at the top of this file. 
			 * Everything below this comment are easily mapped into the switches immediately above this comment.
			 */

			case 'rootDivPlusThumbnailWrap': // Locks the 'carousel' classes to a specific widget id.
				var widgetRootClass = getDomClasses('rootDiv');
				var thumbnailWrapClass = getDomClasses('thumbnailWrap');
				var classNames = widgetRootClass + ' ' + thumbnailWrapClass;
			break;
			case 'rootDivPlusThumbnailFirst':
				var widgetRootClass = getDomClasses('rootDiv');
				var thumbnailClass = getDomClasses('thumbnails');
				var firstThumbClass = getDomClasses('firstThumbnail');
				var classNames = widgetRootClass + ' ' + thumbnailClass + firstThumbClass;
			break;
			case 'rootDivPlusThumbnailLast':
				var widgetRootClass = getDomClasses('rootDiv');
				var thumbnailClass = getDomClasses('thumbnails');
				var lastThumbClass = getDomClasses('lastThumbnail');
				var classNames = widgetRootClass + ' ' + thumbnailClass + lastThumbClass;
			break;
			case 'rootDivPlusThumbnails': // Locks the 'thumbnails' classes to a specific widget id.
				var widgetRootClass = getDomClasses('rootDiv');
				var thumbnailClass = getDomClasses('thumbnails');
				var classNames = widgetRootClass + ' ' + thumbnailClass;
			break;
		}
		return classNames;
	}

	function getTimer(timerKey) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.getTimer(' + timerKey  + ')'); }
		if (typeof(model.timers[model.data.widgetType]) !== 'undefined') {
			var timer = model.timers[model.data.widgetType][timerKey];
		} else {
			var timer = model.timers.defaults[timerKey];
		}
		return timer;
	}

	function getUniqueCarouselId(linkData) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.getUniqueCarouselId'); }
		var carouselId = linkData.carouselIdPrefix + linkData.rowCounter;
		if ((typeof(linkData.widgetId) !== 'undefined') && ('|v1|v2|v3|'.indexOf('|' + linkData.widgetType + '|') > -1)) {
			carouselId = '#' + linkData.widgetId + ' ' + carouselId;
		}
		return carouselId;
	}

	function init(json) {
		if (model.debug.all || model.debug.availableCarousels || model.debug.fnTrace) { log('fn ' + model.config.programName + '.init'); }

		// Maps the Carousel JSON Data into this Widget.
		json = mapData(json);

		// Checks for Red Border Carousels.
		if (json.useRedBorder) { // Multiple Carousels.

			//Renders out a list of carousels & attaches the clicks to all of the thumbnails in each carousel + their left & right arrows.
			bindAllCarousels(json); // This will call the bindDynamicListeners() function & apply it to each carousel, which is rendered out on the Video Detail Page.

		} else { // Renders out a single carousel & wires it up as needed.
			bindCarousel(0, json);
		}
		
		jQuery(json.ids.rootDiv + " .widget-titles").dotdotdot({ellipsis:'...',wrap:'ellipsis',watch:true});
		jQuery(json.ids.rootDiv + " .widget-sub-headlines").dotdotdot({ellipsis:'...',wrap:'ellipsis',watch:true});
		/*
			var carouselId = json.carouselIdPrefix1 + '0';

			// Binds a Click to each individual Carousel's Left & Right Arrow.
			bindDynamicListeners(carouselId, json.ids.widgetId);
		}
		*/
	}

	function mapData(json) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.mapData'); }

		/* The inbound json data looks like this:
		"classes": {
			"carouselWrapClass": "...",
			"carouselClass": "...",
			"domTags": {
				"li": "...",
				"img": "..."
			},
			// For any widgets which have modal dialogs + 2 different sets of thumbnail images, such as the C11 widget.
			"rootDiv": "..."
		},
		"duration": 500,
		"ids": {
			"carouselIdPrefix": "...", // Prefix for eol-carousel-1 through eol-carousel-n carousels.
			"modalDialog": null,
			"modalTemplate": null,
			"widgetId": "..."
		},
		"pandaId": "...",
		"prev": {
			"button": "..." /x*,
			"key": "left"*x/
		},
		"next": {
			"button": "..." /x*,
			"key": "right" *x/
		},
		"thumbnail": {
			"rightMargin": 6,
			"width": 128
		},
		"useModalDialog": false,
		"visible": {
			"min": 0,
			"max": 4,
			"startPosition": 0
		}
		*/

		// We're going to map it into this object's cached data area, as follows:
		/* Add this Refactor Later On. Make sure to extract the IDs & Classes out of the model.data section & add them to the model.dom section.
			model.data = (typeof(json) !== 'undefined') ? json : false; 
		*/
		model.dom.classes.carouselWrap = json.classes.carouselWrapClass; // var carouselWrap = 
		json.carouselClass = model.dom.classes.carousel = json.classes.carouselClass;
		json.carouselIdPrefix1 = model.dom.ids.carouselIdPrefix = json.ids.carouselIdPrefix;
		// These map additional '#' signs to the beginning of each id, if it has data. JSP will treat this as a comment: #${someVariable} and won't translate it into a value like: #cms-widget-843
		if (json.ids.rootDiv.length > 0) {
			json.ids.rootDiv = model.dom.ids.rootDiv = '#' + json.ids.rootDiv;
		}
		model.dom.classes.rootDiv = json.classes.rootDiv;
		if (json.ids.widgetId.length > 0) {
			if (!model.dom.classes.rootDiv) {
				model.dom.classes.rootDiv = json.ids.widgetId;
			}
			model.data.widgetId = json.ids.widgetId;
		}
		model.dom.classes.buttonsPrev = json.prev.button; // var bttnPrev = 
		model.dom.classes.buttonsNext = json.next.button; // var bttnNext = 
		model.data.easing = (json.easing) ? json.easing : 'swing'; // See: http://api.jquery.com/animate/ and http://jqueryui.com/effect/#easing
		model.data.i18nText.nowPlaying = (typeof(json.i18nNowPlaying) !== 'undefined') ? json.i18nNowPlaying : null;
		model.data.i18nText.playVideo = (typeof(json.i18nPlayVideo) !== 'undefined') ? json.i18nPlayVideo : null;
		model.data.useInfiniteLoop = (typeof(json.useInfiniteLoop) !== 'undefined') ? json.useInfiniteLoop : false;
		model.data.widgetType = (typeof(json.widgetType) !== 'undefined') ? json.widgetType : null;

		// Delays the M3 widget's .removeClass('active') & .addClass('active') functions, until after the carousel stops animating/moving.
		// Then it applies those classes, so that it hides the "wing photos".
		if (model.timers[json.widgetType]) {
			model.timers[json.widgetType].removeActiveClasses = json.duration + 50;
			model.timers[json.widgetType].addActiveClass = model.timers[json.widgetType].removeActiveClasses + 250; // +175ms
		}

		// Finds any Modal Dialog & Modal Template code, if needed.
		if (json.useModalDialog) { // C11 Widget, where (json.classes.rootDiv.indexOf('.lp-widget.c11') > -1)
			var modalDialog = '';
			var modalTemplate = '';
			if (typeof(json.ids) !== 'undefined') {
				modalDialog = (typeof(json.ids.modalDialog) !== 'undefined') ? json.ids.modalDialog : '';
				modalTemplate = (typeof(json.ids.modalTemplate) !== 'undefined') ? json.ids.modalTemplate : '';
			}
			var dialogPlayer = model.dom.ids.dialogPlayer = modalDialog;
			model.dom.ids.template = modalTemplate; // var template = 

			// Update the carousel ID & classes with the modal dialog prefix, so that we don't accidentally pick up 2x the number of thumbnails... once from the modal dialog & a second time from the modal template, which is rendered out to the DOM.
			json.carouselIdPrefix2 = json.carouselIdPrefix1 = dialogPlayer + ' ' + json.carouselIdPrefix1;
			json.carouselClass = dialogPlayer + ' ' + json.carouselClass;
		} else if (detectWidgets('|m2|m3|v2|')) {
			/*switch(json.widgetType) {
				case 'm2':
				case 'm3':
				case 'v2': */
					json.carouselIdPrefix2 = json.carouselIdPrefix1 = json.ids.widgetId + ' ' + json.carouselIdPrefix1;
					json.carouselClass = json.ids.widgetId + ' ' + json.carouselClass;
			/*	break;
			} */
		} else {
			// Don't modify json.carouselIdPrefix1 here. It will be passed through as a key into the model.data.carousels below, as part of the carouselId value.
			// Instead, we clone the original carouselIdPrefix value, which is now called json.carouselIdPrefix1 and we append the Video Detail Page's root class to it.
			json.carouselIdPrefix2 = '.vd-related_videos ' + json.carouselIdPrefix1;
		}
		json.maxThumbs = json.maxItems - 1; // C11 = (4 carousels * 6 thumbnails/carousel) = 24 thumbnails. V2 = (4 carousels * 4 thumbnails/carousel) = 16 thumbnails. Video Detail Page = (3 carousels * 4 thumbnails/carousel) = 12 thumbnails.

		return json;
	}

	function removeAllThumbnailBorders(key, widgetId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.removeAllThumbnailBorders'); }
		if (widgetId) {
			model.dom.classes.rootDiv = widgetId;
		}
		var key = key || getDomClasses('rootDivPlusThumbnails');
		key = changeWidgetId(key, widgetId);
		if (model.debug.all || model.debug.carouselArrows || model.debug.domIds) {
			log('removeAllThumbnailBorders key: ' + key);
			/* C11 Widget: #cms-widget-643.lp-widget.c11 .thumbs
			 * C11 Lightbox: #cms-widget-643-dynamic-content .lp-widget.c11 .thumbs
			 * M2 Widget: #cms-widget-841.lp-widget.m2 .thumbs
			 * M3 Widget: #cms-widget-843.lp-widget.m3 .thumbs
			 * V2 Widget: #cms-widget-749.lp-widget.v2 .thumbs
			 * Video Detail Page: 
			 */
		}

		var timer = getTimer('removeActiveClasses');
		setTimeout(function() {
			$(key).removeClass('active');
		}, timer);

		if (model.data.i18nText.playVideo) {
			$(key).attr("title", model.data.i18nText.playVideo);
			$(key).children('img').attr("alt", model.data.i18nText.playVideo);
		}
	}

	function reset(key, widgetId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.reset'); }
		removeAllThumbnailBorders(key, widgetId);
		model.dom.ids.dialogPlayer = null; // Prevents the C11 Widget's carousel from conflicting with the Video Detail Page's carousels, when used.
	}

	function setData(key, data) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.setData'); }
		if (key.indexOf('.') > -1) {
			key = key.replace('model.','');
			key = key.replace('data.','');
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

	function updateCarouselArrowStates(carouselId, widgetId, counter) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.updateCarouselArrowStates (' + counter + ')'); }

		var carouselKey = getCarouselKey(carouselId, widgetId);
		var carouselData = model.data.carousels[carouselKey];
		var nextScrollPoint = carouselData.minThumbRangePos + carouselData.visibleRange;

		if (model.debug.all || model.debug.autoPlay) {
			log('carouselData.currentPos: ' + carouselData.currentPos);
			log('carouselData.minThumbRangePos: ' + carouselData.minThumbRangePos);
			log('carouselData.maxThumbRangePos: ' + carouselData.maxThumbRangePos);
			log('carouselData.startPos: ' + carouselData.startPos);
			log('nextScrollPoint: ' + nextScrollPoint);
		}

		if (carouselData.currentPos >= nextScrollPoint) {
			carouselShift('rightArrow', carouselId, widgetId, null, 2);
		} else {
			updateHardLocks(carouselId, widgetId);
		}
	}

	function updateCarouselPosition(widgetId, carouselKey, newPosition, counter) { // Overloaded to accept an integer or a '+1' string or a '-1' string.
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.updateCarouselPosition (' + counter + ')'); }

		if (!carouselKey) {
			var carouselId = getCarouselId(widgetId);
			var carouselKey = getCarouselKey(carouselId, widgetId);
		}
		if (model.debug.all || model.debug.isAnimating || model.debug.ghostPhotos) { 
			log('(before) newPosition: ' + newPosition);
		}
		if (newPosition === '+1') {
			newPosition = model.data.carousels[carouselKey].currentPos + 1;
		} else if (newPosition === '-1') {
			newPosition = model.data.carousels[carouselKey].currentPos - 1;
		}

		model.data.carousels[carouselKey].currentPos = newPosition;
		if (model.debug.all || model.debug.isAnimating || model.debug.ghostPhotos) {
			log('(after) currentPos: ' + newPosition);
		}
	}

	function updateHardLocks(carouselId, widgetId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.updateHardLocks'); }
		checkForHardLocks(carouselId, 'Prev', widgetId);
		checkForHardLocks(carouselId, 'Next', widgetId);
	}

	function videoEnded(playerType, nextPandIdOrGuid, counter, widgetId, overrideChangeBorders) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.videoEnded (' + counter + ')'); }

		model.dom.classes.rootDiv = changeWidgetId(model.dom.classes.rootDiv, widgetId);
		var carouselId = getCarouselId(widgetId);
		var carouselKey = getCarouselKey(carouselId, widgetId);
		if (model.data.carousels[carouselKey]) {
			updateCarouselPosition(widgetId, carouselKey, '+1', 8);
			if (!overrideChangeBorders) {
				changeBorders(widgetId, nextPandIdOrGuid, 2);
			}
			updateCarouselArrowStates(carouselId, widgetId, 2);
		} else {
			// Only the first carousel will have a red border. So it will be the only carousel which calls this videoEnded function.
			var firstCarouselId = model.data.firstCarouselId || carouselId;
			updateHardLocks(firstCarouselId, widgetId);
		}
	}

	return {
		// Exposes Public Function Names
		"bindDynamicListeners": bindDynamicListeners,
		"carouselShift": carouselShift,
		"changeBorders": changeBorders,
		"checkCarouselArrowStates": checkCarouselArrowStates,
		"cleanKey": cleanKey,
		"getCarouselId": getCarouselId,
		"getCarouselKey": getCarouselKey,
		"getData": getData,
		"getDataFromDom": getDataFromDom,
		"getDomClasses": getDomClasses,
		"getUniqueCarouselId": getUniqueCarouselId,
		"init": init,
		"removeAllThumbnailBorders": removeAllThumbnailBorders,
		"reset": reset,
		"setData": setData,
		"updateCarouselPosition": updateCarouselPosition,
		"videoEnded": videoEnded
	};
})(jQuery);

// Global Auto-Bind Area. Copy this code to your page to initialize the eol-carousel for that page.
/*
(function($){
	$(document).ready(function() {
		setTimeout(function() {
			// If not, then bind them.
			eonline.mWidgetsOnly.carousel.init({
				"classes": {
					"carouselWrapClass": ""
					"carousel": ""
					"domTags": {
						"li": "",
						"img": ""
					},
					// For any widgets which have modal dialogs + 2 different sets of thumbnail images, such as the C11 widget.
					"rootDiv": ""
				},
				"duration": 500,
				"ids": {
					"carouselIdPrefix": "",
					"modalDialog": "",
					"modalTemplate": "",
					"rootDiv": "",
					"widgetId": ""
				},
				"i18nNowPlaying": "",
				"i18nPlayVideo": "",
				"maxItems": "",
				"pandaId": pandaId,
				"prev": {
					"button": ".buttons .prev",
					"key": "left"
				},
				"next": {
					"button": ".buttons .next",
					"key": "right"
				},
				"thumbnail": {
					"rightMargin": 5,
					"width": 128
				},
				"useModalDialog": false,
				"useRedBorder": true,
				"visible": {
					"range": {
						"min": 4,
						"max": 6
					},
					"startPosition": 0
				},
				"widgetType": ""
			});
		},500);
	});
})(jQuery.noConflict());
*/
