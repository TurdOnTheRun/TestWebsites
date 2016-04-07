// Author: @briankueck Tweet: @eDevelopers1

if (typeof(eonline) === 'undefined') var eonline = {}; // Same as window.eonline.
eonline.carousel = (function($) {

	var objCore = {
		"objDebug": {
			"boolAll": false,
			"boolAutoPlay": false,
			"boolBorders": false,
			"boolCarouselArrows": false,
			"boolDomIds": false,
			"boolFnTrace": false,
			"boolMaxItems": false
		},
		"objConfig": {
			"strProgramName": "eonline.carousel (Tweet: @eDevelopers1): "
		},
		"objData": {
			"arrCarousels": [ /* Was objCarousel:
				"intCurrentPos": 4,
				"intDuration": 500,
				"intItemWidth": (128 + 5),
				"intMaxItems": 15,
				"intMinThumbRangePos": 0,
				"intMaxThumbRangePos": 6, // This is a variable.
				"intStartPos": 3, // This is the intDomPositionCount value. For the C11 widget, it can be 0-7.
				"intVisibleRange": 6 // This is a constant.
				*/
			],
			"objInternationalText": {
				"strNowPlaying": null,
				"strPlayVideo": null
			},
			"objLinkData": {
				/* Looks like this & is extracted from the <a href="..."> tag in the DOM. It is cached so that the VideoEnded function can Auto-Play the next carousel's video:
					"domLink": <a href object>,
					"strPandaIdOrGuid": 123456,
					"strVideoUrl": "...",
					"strWidgetId": "...",
					"strWidgetType": "..."
				*/
				/*"domLink": null,
				"strPandaIdOrGuid": 0,
				"strVideoUrl": "",
				"strWidgetId": "",
				"strWidgetType": ""*/
			},
			"strFirstCarouselId": null
		},
		"objDom": {
			"objClasses": {
				// These carousel IDs & classes will be automatically chained together like: objClasses.strCarouselWrap -> objClasses.strCarousel
				"strButtonsPrev": ".buttons.prev",
				"strButtonsNext": ".buttons.next",
				"strCarouselWrap": ".eol-carousels", // Don't prefix this with anything from strModalDialog!
				"strCarousel": ".viewport", // Don't prefix this with anything from strModalDialog or strCarouselWrap!
				"strRootDiv": "",
				"strThumbnails": ".thumbnails"
			},
			"objIds": {
				"strCarouselIdPrefix": null,
				"strDialogPlayer": null, // "evp-video-player-wrap",
				"strTemplate": null // "eonline-video-player-wrap"
			}
		}
	};

	function addThumbnailBorder(strNextPandIdOrGuid, strWidgetId) { // strWidgetId is optional, as the Video Detail Page also uses this Carousel... but without a Widget Id.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: addThumbnailBorder'); }
		var strCarouselClass = getDomClasses('carousel');
		var strKey = strCarouselClass + ' #thumbnail-' + strNextPandIdOrGuid;
		strKey = changeWidgetId(strKey, strWidgetId);
		if (objCore.objDebug.boolAll || objCore.objDebug.boolBorders || objCore.objDebug.boolDomIds) {
			fb('strKey A: ' + strKey);
			/* C11 Widget:
			 * C11 Lightbox: #cms-widget-643-dynamic-content .eol-carousels .viewport #thumbnail-203134
			 * V2 Widget: 
			 */
		}
		$(strKey).parent().addClass('active'); // strKey looks like this: ".eol-carousels .viewport #thumbnail-202468"
		if (objCore.objData.objInternationalText.strNowPlaying) {
			$(strKey).attr("title", objCore.objData.objInternationalText.strNowPlaying);
			$(strKey).children('img').attr("alt", objCore.objData.objInternationalText.strNowPlaying);
		}
	}

	function bindDynamicListeners(strCarouselId, strWidgetId) { // Modal Dialog Carousel Listeners objLinkData, json
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: bindDynamicListeners (' + strCarouselId + ')'); }

		// Left Arrow
		var strKey = strCarouselId + ' ' + objCore.objDom.objClasses.strButtonsPrev;
		if (objCore.objDebug.boolAll || objCore.objDebug.boolDomIds) {
			fb('strKey B: ' + strKey);
		}
		$(strKey).click(function() {
			if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('left arrow clicked'); }
			var objLinkData = getDataFromDom('arrow', $(this));
			var strCarouselId = getUniqueCarouselId(objLinkData);
			carouselShiftLeft(strCarouselId, strWidgetId);
		});

		// Right Arrow
		var strKey = strCarouselId + ' ' + objCore.objDom.objClasses.strButtonsNext;
		if (objCore.objDebug.boolAll || objCore.objDebug.boolDomIds) {
			fb('strKey C: ' + strKey);
		}
		$(strKey).click(function() {
			if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('right arrow clicked'); }
			var objLinkData = getDataFromDom('arrow', $(this));
			var strCarouselId = getUniqueCarouselId(objLinkData);
			carouselShiftRight(strCarouselId, strWidgetId);
		});
	}

	function carouselShiftLeft(strCarouselId, strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: carouselShiftLeft'); }

		var strCarouselKey = getCarouselKey(strCarouselId, strWidgetId);
		var objCarouselData = objCore.objData.arrCarousels[strCarouselKey];
		if (objCore.objDebug.boolAll) {
			fb('left');
			fb('Before - intMinThumbRangePos: ' + objCarouselData.intMinThumbRangePos);
			fb('Before - intMaxThumbRangePos: ' + objCarouselData.intMaxThumbRangePos);
		}
		if (objCarouselData.intMinThumbRangePos > 0) {
			if (objCore.objDebug.boolAll) { fb('subtracting'); }
			objCarouselData.intMinThumbRangePos = objCarouselData.intMinThumbRangePos - objCarouselData.intVisibleRange;
			objCarouselData.intMaxThumbRangePos = objCarouselData.intMaxThumbRangePos - objCarouselData.intVisibleRange;
			var strKey = strCarouselId + ' .slide-container';
			if (objCore.objDebug.boolAll || objCore.objDebug.boolDomIds) {
				fb('strKey D: ' + strKey);
			}
			$(strKey).animate({
				left: '+='  + (objCarouselData.intVisibleRange * objCarouselData.intItemWidth)
			}, objCarouselData.intDuration);
		}
		updateHardLocks(strCarouselId, strWidgetId);
		if (objCore.objDebug.boolAll) {
			fb('After - objCarouselData.intMinThumbRangePos: ' + objCarouselData.intMinThumbRangePos);
			fb('After - objCarouselData.intMaxThumbRangePos: ' + objCarouselData.intMaxThumbRangePos);
		}
	}

	function carouselShiftRight(strCarouselId, strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: carouselShiftRight'); }

		var strCarouselKey = getCarouselKey(strCarouselId, strWidgetId);
		var objCarouselData = objCore.objData.arrCarousels[strCarouselKey];
		if (objCore.objDebug.boolAll) {
			fb('right');
			fb('Before - objCarouselData.intMinThumbRangePos: ' + objCarouselData.intMinThumbRangePos);
			fb('Before - objCarouselData.intMaxThumbRangePos: ' + objCarouselData.intMaxThumbRangePos);
		}
		if (objCarouselData.intMaxThumbRangePos < objCarouselData.intMaxItems) {
			if (objCore.objDebug.boolAll) { fb('adding'); }
			objCarouselData.intMinThumbRangePos = objCarouselData.intMinThumbRangePos + objCarouselData.intVisibleRange;
			objCarouselData.intMaxThumbRangePos = objCarouselData.intMaxThumbRangePos + objCarouselData.intVisibleRange;
			var strKey = strCarouselId + ' .slide-container';
			if (objCore.objDebug.boolAll || objCore.objDebug.boolDomIds) {
				fb('strKey E: ' + strKey);
			}
			$(strKey).animate({
				left: '-=' + (objCarouselData.intVisibleRange * objCarouselData.intItemWidth)
			}, objCarouselData.intDuration);
		}
		updateHardLocks(strCarouselId, strWidgetId);
		if (objCore.objDebug.boolAll) {
			fb('After - objCarouselData.intMinThumbRangePos: ' + objCarouselData.intMinThumbRangePos);
			fb('After - objCarouselData.intMaxThumbRangePos: ' + objCarouselData.intMaxThumbRangePos);
		}
	}

	function changeBorders(strNextPandIdOrGuid, strWidgetId) { // strWidgetId is optional, as the Video Detail Page also uses this Carousel... but without a Widget Id.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: changeBorders (' + strWidgetId + ')'); }

		// Removes all active carousel thumbnail borders, regardless of which thumbnail was clicked on last.
		removeThumbnailBorders(null, strWidgetId);

		// Highlights the active carousel thumbnail.
		addThumbnailBorder(strNextPandIdOrGuid, strWidgetId);
	}

	function changeWidgetId(strRootDiv, strWidgetId) { // This locks carousels to specific widgets.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: changeWidgetId'); }
		if (objCore.objDebug.boolAll || objCore.objDebug.objDomIds) { fb('(Before) strRootDiv: ' + strRootDiv); }
		if (strWidgetId) {
			// Replaces the old cms-widget-id value with the new cms-widget-id value.
			if (strRootDiv.indexOf('cms-widget') > -1) {
				var arrParts = strRootDiv.split(' ');
				arrParts = arrParts.pop();
				if (typeof(arrParts) === 'string') {
					strRootDiv = arrParts;
				} else {
					strRootDiv = arrParts.join(' ');
				}
			}

			/* Injects a space into the jQuery class chain, if it's a lightbox. Otherwise, it won't do that for regular widgets.
			 * C11 Widget: #cms-widget-643.lp-widget.c11 .thumbnails
			 * C11 Lightbox: #cms-widget-643-dynamic-content .lp-widget.c11 .thumbnails
			 * V2 Widgets: #cms-widget-749.lp-widget.v2 .thumbnails
			 * See the "strKey A:" and "strKey H:" areas.
			 */
			var chrSpace = '';
			if (
				((strWidgetId.indexOf('dynamic-content') > -1) && (strWidgetId.indexOf('lp-widget') === -1))
				|| 
				(
					(strWidgetId.indexOf('cms-widget') > -1) && (strWidgetId.indexOf('dynamic-content') === -1) 
				 && (strRootDiv.indexOf('dynamic-content') === -1) && 
					((strRootDiv.indexOf('eol-carousels') > -1) || 
						((strRootDiv.indexOf('lp-widget') === -1) && (strRootDiv.indexOf('thumbnails') > -1))
					)
				)
			) {
				chrSpace = ' ';
			}
			if (strRootDiv.indexOf(strWidgetId) === -1) { // Avoids: ".vd-related_videos.vd-related_videos", when all we need is ".vd-related_videos". To see that, use the video detail page & click the end of the video's timeline so that it triggers the videoEnded function.
				strRootDiv = '#' + strWidgetId + chrSpace + strRootDiv;
				strRootDiv = strRootDiv.replace('  ',' ').replace(/\#\./g,'.');
			}
		}
		if (objCore.objDebug.boolAll || objCore.objDebug.objDomIds) { fb('(After) strRootDiv: ' + strRootDiv); }
		return strRootDiv;
	}

	function checkCarouselArrowStates(strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn checkCarouselArrowStates'); }
		var strCarouselId = getCarouselId(strWidgetId);
		updateCarouselArrowStates(strCarouselId, strWidgetId, 3);
	}

	function checkForHardLocks(strCarouselId, strBttnKey, strBttnId, strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: checkForHardLocks'); }

		var strCarouselKey = getCarouselKey(strCarouselId, strWidgetId);
		var objCarouselData = objCore.objData.arrCarousels[strCarouselKey];
		var strBttnId = strCarouselId + ' ' + objCore.objDom.objClasses['strButtons' + strBttnKey];

		if (objCore.objDebug.boolAll || objCore.objDebug.boolCarouselArrows) {
			fb('strBttnId: ' + strBttnId);
			fb('objCarouselData.intMinThumbRangePos: ' + objCarouselData.intMinThumbRangePos);
			fb('objCarouselData.intMaxThumbRangePos: ' + objCarouselData.intMaxThumbRangePos);
			fb('objCarouselData.intMaxItems: ' + objCarouselData.intMaxItems);
		}

		$(strBttnId).removeClass('disabled');
		switch (strBttnKey) {
			case 'Prev':
				if ((typeof(objCarouselData) === 'undefined') || (typeof(objCarouselData.intMinThumbRangePos) === 'undefined') || (objCarouselData.intMinThumbRangePos === 0)) {
					if (objCore.objDebug.boolAll) { fb('locked'); }
					$(strBttnId).addClass('disabled');
				}
			break;
			case 'Next':
				if ((typeof(objCarouselData) === 'undefined') || (objCarouselData.intMaxThumbRangePos >= objCarouselData.intMaxItems)) {
					if (objCore.objDebug.boolAll) { fb('locked'); }
					$(strBttnId).addClass('disabled');
				}
			break;
		}
	}

	function cleanKey(strKey) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: cleanKey'); }
		return strKey.replace(/\#/g,'').replace(/\ /g,'-').replace(/\./g,'');
	}

	// Firebug. Short-cut function to eliminate having to repeatedly type "console.log".
	function fb(obj) {
		if (((objCore.objDebug.boolAll) || (objCore.objDebug.boolAutoPlay) || (objCore.objDebug.boolBorders) || (objCore.objDebug.boolCarouselArrows) || (objCore.objDebug.boolDomIds) || (objCore.objDebug.boolFnTrace) || (objCore.objDebug.boolMaxItems)) && (typeof(console) !== 'undefined') && (typeof(console.log) !== 'undefined') && obj) {
			console.log(objCore.objConfig.strProgramName + obj);
		}
	}

	function getCarouselId(strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getCarouselId'); }
		if (objCore.objData.strFirstCarouselId) {
			var strCarouselId = objCore.objData.strFirstCarouselId;
		} else {
			var strCarouselId = strWidgetId + ' #eol-carousel-0';
		}
		return strCarouselId;
	}

	function getCarouselKey(strCarouselId, strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getCarouselKey'); }
		if (!strCarouselId) {
			strCarouselId = getCarouselId(strWidgetId);
		}
		var strCarouselKey = cleanKey(strCarouselId);
		return strCarouselKey;
	}

	function getData(strKey) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getData'); }

		// Allows for any of the data from the Core JSON object to be returned.
		strKey = strKey.replace('objCore.','');
		var arrKeyParts = strKey.split('.');
		var data = objCore;
		for (var i=0, j=arrKeyParts.length-1; i<=j; i++) {
			data = data[arrKeyParts[i]];
		}
		return data;
	}

	function getDataFromDom(strKey, domLink) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getDataFromDom strKey=' + strKey + ' domLink=' + domLink); }

		var strCarouselPrefix = '';
		// Adds a space for the C11 Modal Dialog's string prefix.
		if ((typeof(objCore.objDom.objIds.strDialogPlayer) !== 'undefined') && (objCore.objDom.objIds.strDialogPlayer)) {
			strCarouselPrefix = objCore.objDom.objIds.strDialogPlayer + ' ';
		}
		switch(strKey) {
			case 'arrow':
				var objLinkData = {
					"strCarouselIdPrefix": strCarouselPrefix + objCore.objDom.objIds.strCarouselIdPrefix,
					"strRowCounter" : parseInt(domLink.attr('data-row-counter')),
					"strWidgetId": domLink.attr('data-widget-id'),
					"strWidgetType": domLink.attr('data-widget-type')
				};
			break;
			case 'thumbnail':
				var objLinkData = {
					"domLink": domLink,
					"strPandaIdOrGuid": domLink[0].id.replace('thumbnail-',''),
					"intStartPos": parseInt(domLink.attr('data-counter')),
					"strVideoUrl": domLink.attr('data-url'),
					"strWidgetId": domLink.attr('data-widget-id'),
					"strWidgetType": domLink.attr('data-widget-type')
				};
			break;
		}

		if (objCore.objDebug.boolAll) {
			fb('domLink: ' + domLink);
			for (var property in objLinkData) {
				fb(property + ': ' + objLinkData[property]);
			}
		}

		return objLinkData;
	}

	function getDomClasses(strKey) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { 
			fb('fn: getDomClasses (' + strKey + ')');
		}
		switch(strKey) {
			case 'carouselWrap':
				var strClasses = objCore.objDom.objClasses.strCarouselWrap;
			break;
			case 'carousel':
				var strCarouselWrapClass = getDomClasses('carouselWrap');
				var strClasses = strCarouselWrapClass + ' ' + objCore.objDom.objClasses.strCarousel;
			break;
			case 'rootDiv':
				var strClasses = objCore.objDom.objClasses.strRootDiv;
			break;
			case 'thumbnails':
				var strClasses = objCore.objDom.objClasses.strThumbnails;
			break;
			case 'rootDivPlusThumbnails': // Locks the 'thumbnails' classes to a specific widget id.
				var strWidgetRootClasses = getDomClasses('rootDiv');
				var strThumbnailClasses = getDomClasses('thumbnails');
				var strClasses = strWidgetRootClasses + ' ' + strThumbnailClasses;
			break;
		}
		return strClasses;
	}

	function getUniqueCarouselId(objLinkData) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getUniqueCarouselId'); }
		var strCarouselId = objLinkData.strCarouselIdPrefix + objLinkData.strRowCounter;
		if ((typeof(objLinkData.strWidgetId) !== 'undefined') && ('|v1|v2|v3|'.indexOf('|' + objLinkData.strWidgetType + '|') > -1)) {
			strCarouselId = '#' + objLinkData.strWidgetId + ' ' + strCarouselId;
		}
		return strCarouselId;
	}

	function highlightFirstCarousel(json) { // Required: strCarouselClass, strCarouselIdPrefix1, strCarouselIdPrefix2, strThumbnails, intMaxThumbs, json.visible.startPosition, Optional: json.ids.strWidgetId
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: highlightFirstCarousel'); }
		// Bind the carousel to all of the objects in the DOM.
		var i = -1;
		/*if (objCore.objDebug.boolAll || objCore.objDebug.boolCarouselArrows) {
			fb('(before) strCarouselClass: ' + json.strCarouselClass);
		}
		if (json.ids.strWidgetId) {
			json.strCarouselClass = '#' + json.ids.strWidgetId + ' ' + json.strCarouselClass;
		}
		if (objCore.objDebug.boolAll || objCore.objDebug.boolCarouselArrows) {
			fb('(after) strCarouselClass: ' + json.strCarouselClass);
		}*/
		var strKey = json.strCarouselClass;
		if (objCore.objDebug.boolAll || objCore.objDebug.boolDomIds) {
			fb('strKey F: ' + strKey);
		}
		$(strKey).each(function() { // Loops all Carousel Rows
			i++;
			var strCarouselId = json.strCarouselIdPrefix1 + i;
			var strKey = json.strCarouselIdPrefix2 + i + ' ' + json.strThumbnails;

			// Finds out how many thumbnails are in each carousel.
			if (objCore.objDebug.boolAll || objCore.objDebug.boolMaxItems || objCore.objDebug.boolDomIds) {
				fb('strKey G: ' + strKey);
			}
			var objThumbs = $(strKey);
			var intTotalThumbs = objThumbs.length;
			if (objCore.objDebug.boolAll || objCore.objDebug.boolMaxItems) {
				fb('intTotalThumbs: ' + intTotalThumbs);
			}
			if (intTotalThumbs > json.intMaxThumbs) {
				intTotalThumbs = json.intMaxThumbs;
			}
			if (objCore.objDebug.boolAll || objCore.objDebug.boolMaxItems) {
				fb('intTotalThumbs: ' + intTotalThumbs);
			}
			if (intTotalThumbs > 0) {
				var intStartPos = (json.visible.startPosition) ? json.visible.startPosition : 0;

				// Appends the Carousel's Data to the Array.
				var strCarouselKey = getCarouselKey(strCarouselId, json.ids.strWidgetId);
				objCore.objData.arrCarousels[strCarouselKey] = {
					"intCurrentPos": intStartPos,
					"intDuration": json.duration,
					"intItemWidth": (json.thumbnail.width + json.thumbnail.rightMargin),
					"intMaxItems": intTotalThumbs,
					"intMinThumbRangePos": json.visible.range.min,
					"intMaxThumbRangePos": json.visible.range.max, // This is a variable.
					"intStartPos": intStartPos,
					"intVisibleRange": json.visible.range.max // This is a constant.
				};

				// Binds a Click to each Carousel's Thumbnail
				bindDynamicListeners(strCarouselId, json.ids.strWidgetId);

				// Initial Arrow Enable/Disable Button States.
				updateCarouselArrowStates(strCarouselId, json.ids.strWidgetId, 1);

				// Updates the current position, but outside of the updateCarouselArrowStates() function.
				objCore.objData.arrCarousels[strCarouselKey].intCurrentPos = intStartPos;

				// Checks for the first carousel...
				if (i === 0) {
					// Caches the first carousel's id for later.
					objCore.objData.strFirstCarouselId = strCarouselId;

					// Changes the Red Carousel Border for the 1st carousel.
					var strWidgetId = null; // Video Detail Page would be null.
					if ((typeof(json.ids) !== 'undefined') && (typeof(json.ids.strWidgetId) !== 'undefined')) {
						strWidgetId = json.ids.strWidgetId; // C11 & V2 widgets will have widget ids.
					}

					changeBorders(json.pandaId, strWidgetId);
				}
			}
		});
	}

	function init(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: init'); }
		json = mapData(json);
		highlightFirstCarousel(json);
	}

	function mapData(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: mapData'); }

		/* The inbound json data looks like this:
		"classes": {
			"carouselWrapClass": "...",
			"carouselClass": "...",
			"domTags": {
				"li": "...",
				"anchorLinks": "...",
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
			"strWidgetId": "..."
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
		objCore.objDom.objClasses.strCarouselWrap = json.classes.carouselWrapClass; // var strCarouselWrap = 
		json.strCarouselClass = objCore.objDom.objClasses.strCarousel = json.classes.carouselClass;
		json.strCarouselIdPrefix1 = objCore.objDom.objIds.strCarouselIdPrefix = json.ids.carouselIdPrefix;
		objCore.objDom.objClasses.strRootDiv = json.classes.rootDiv;
		json.strThumbnails = objCore.objDom.objClasses.strThumbnails = json.classes.domTags.anchorLinks;
		objCore.objDom.objClasses.strButtonsPrev = json.prev.button; // var strBttnPrev = 
		objCore.objDom.objClasses.strButtonsNext = json.next.button; // var strBttnNext = 
		objCore.objData.objInternationalText.strNowPlaying = (typeof(json.i18nNowPlaying) !== 'undefined') ? json.i18nNowPlaying : null;
		objCore.objData.objInternationalText.strPlayVideo = (typeof(json.i18nPlayVideo) !== 'undefined') ? json.i18nPlayVideo : null;

		// Finds any Modal Dialog & Modal Template code, if needed.
		if (json.useModalDialog) { // C11 Widget, where (json.classes.rootDiv.indexOf('.lp-widget.c11') > -1)
			var strModalDialog = '';
			var strModalTemplate = '';
			if (typeof(json.ids) !== 'undefined') {
				strModalDialog = (typeof(json.ids.modalDialog) !== 'undefined') ? json.ids.modalDialog : '';
				strModalTemplate = (typeof(json.ids.modalTemplate) !== 'undefined') ? json.ids.modalTemplate : '';
			}
			var strDialogPlayer = objCore.objDom.objIds.strDialogPlayer = strModalDialog;
			objCore.objDom.objIds.strTemplate = strModalTemplate; // var strTemplate = 

			// Update the carousel ID & classes with the modal dialog prefix, so that we don't accidentally pick up 2x the number of thumbnails... once from the modal dialog & a second time from the modal template, which is rendered out to the DOM.
			json.strCarouselIdPrefix2 = json.strCarouselIdPrefix1 = strDialogPlayer + ' ' + json.strCarouselIdPrefix1;
			json.strCarouselClass = strDialogPlayer + ' ' + json.strCarouselClass;
		} else if (json.classes.rootDiv.indexOf('.lp-widget.v2') > -1) {
			json.strCarouselIdPrefix2 = json.strCarouselIdPrefix1 = '#' + json.ids.strWidgetId + ' ' + json.strCarouselIdPrefix1;
			json.strCarouselClass = '#' + json.ids.strWidgetId + ' ' + json.strCarouselClass;
		} else {
			// Don't modify json.strCarouselIdPrefix1 here. It will be passed through as a key into the objCore.objData.arrCarousels below, as part of the strCarouselId value.
			// Instead, we clone the original strCarouselIdPrefix value, which is now called json.strCarouselIdPrefix1 and we append the Video Detail Page's root class to it.
			json.strCarouselIdPrefix2 = '.vd-related_videos ' + json.strCarouselIdPrefix1;
		}
		json.intMaxThumbs = json.maxItems; // C11 = (4 carousels * 6 thumbnails/carousel) = 24 thumbnails. V2 = (4 carousels * 4 thumbnails/carousel) = 16 thumbnails. Video Detail Page = (3 carousels * 4 thumbnails/carousel) = 12 thumbnails.

		return json;
	}

	function removeThumbnailBorders(strKey, strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: removeThumbnailBorders'); }
		var strKey = strKey || getDomClasses('rootDivPlusThumbnails');
		strKey = changeWidgetId(strKey, strWidgetId);
		if (objCore.objDebug.boolAll || objCore.objDebug.boolDomIds) {
			fb('strKey H: ' + strKey);
			/* C11 Widget: #cms-widget-643.lp-widget.c11 .thumbnails
			 * C11 Lightbox: #cms-widget-643-dynamic-content .lp-widget.c11 .thumbnails
			 * V2 Widget: #cms-widget-749.lp-widget.v2 .thumbnails
			 */
		}
		$(strKey).parent().removeClass('active');
		if (objCore.objData.objInternationalText.strPlayVideo) {
			$(strKey).attr("title", objCore.objData.objInternationalText.strPlayVideo);
			$(strKey).children('img').attr("alt", objCore.objData.objInternationalText.strPlayVideo);
		}
	}

	function reset(strKey, strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn reset'); }
		removeThumbnailBorders(strKey, strWidgetId);
		objCore.objDom.objIds.strDialogPlayer = null; // Prevents the C11 Widget's carousel from conflicting with the Video Detail Page's carousels, when used.
	}

	function setData(strKey, data) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn setData'); }
		if (strKey.indexOf('.') > -1) {
			strKey = strKey.replace('objCore.','');
			strKey = strKey.replace('objData.','');
			var arrParts = strKey.split('.');
			var objPointer = objCore.objData;
			for (var i=0, j=arrParts.length-1; i<j; i++) {
				var key = arrParts[i];
				if (typeof(objPointer[key]) === 'undefined') {
					objPointer[key] = {};
				}
				// Move down the object chain.
				objPointer = objPointer[key];
			}
			// Attach the item to the last value in the array.
			strKey = arrParts[arrParts.length-1];
			objPointer[strKey] = data;
		} else {
			objCore.objData[strKey] = data; // The data could be a string, an integer, a floating point number, an object or a JSON Object.
		}
	}

	function updateCarouselArrowStates(strCarouselId, strWidgetId, intCounter) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: updateCarouselArrowStates (' + intCounter + ')'); }

		var strCarouselKey = getCarouselKey(strCarouselId, strWidgetId);
		var objCarouselData = objCore.objData.arrCarousels[strCarouselKey];
		var intNextScrollPoint = objCarouselData.intMinThumbRangePos + objCarouselData.intVisibleRange;

		if (objCore.objDebug.boolAll || objCore.objDebug.boolAutoPlay) {
			fb('objCarouselData.intCurrentPos: ' + objCarouselData.intCurrentPos);
			fb('objCarouselData.intMinThumbRangePos: ' + objCarouselData.intMinThumbRangePos);
			fb('objCarouselData.intMaxThumbRangePos: ' + objCarouselData.intMaxThumbRangePos);
			fb('objCarouselData.intStartPos: ' + objCarouselData.intStartPos);
			fb('intNextScrollPoint: ' + intNextScrollPoint);
		}

		if (objCarouselData.intCurrentPos >= intNextScrollPoint) {
			carouselShiftRight(strCarouselId, strWidgetId);
		} else {
			updateHardLocks(strCarouselId, strWidgetId);
		}
	}

	function updateHardLocks(strCarouselId, strWidgetId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: updateHardLocks'); }
		checkForHardLocks(strCarouselId, 'Prev', strWidgetId);
		checkForHardLocks(strCarouselId, 'Next', strWidgetId);
	}

	function videoEnded(strPlayerType, strNextPandIdOrGuid, intCounter, strWidgetId, overrideChangeBorders) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: videoEnded (' + intCounter + ')'); }

		/*var strCarouselId = objCore.objDom.objIds.strCarouselIdPrefix + 0;
		switch(strPlayerType) {
			case 'C11_WIDGET':
				strCarouselId = objCore.objDom.objIds.strDialogPlayer + '-' + strCarouselId;
			break;
			case 'V2_WIDGET':
				strCarouselId = objCore.objData.objLinkData.strWidgetId + '-' + strCarouselId;
			break;
		}*/
		objCore.objDom.objClasses.strRootDiv = changeWidgetId(objCore.objDom.objClasses.strRootDiv, strWidgetId);
		var strCarouselId = getCarouselId(strWidgetId);
		var strCarouselKey = getCarouselKey(strCarouselId, strWidgetId);
		if (objCore.objData.arrCarousels[strCarouselKey]) {
			objCore.objData.arrCarousels[strCarouselKey].intCurrentPos += 1;
			if (!overrideChangeBorders) {
				changeBorders(strNextPandIdOrGuid, strWidgetId);
			}
			updateCarouselArrowStates(strCarouselId, strWidgetId, 2);
		} else {
			// Only the first carousel will have a red border. So it will be the only carousel which calls this videoEnded function.
			var strFirstCarouselId = objCore.objData.strFirstCarouselId || strCarouselId;
			updateHardLocks(strFirstCarouselId, strWidgetId);
		}
	}

	return {
		// Exposes Public Function Names
		"changeBorders": changeBorders,
		"checkCarouselArrowStates": checkCarouselArrowStates,
		"cleanKey": cleanKey,
		"getData": getData,
		"getDataFromDom": getDataFromDom,
		"getDomClasses": getDomClasses,
		"init": init,
		"reset": reset,
		"setData": setData,
		"videoEnded": videoEnded
	};
})(jQuery);

// Global Auto-Bind Area. Copy this code to your page to initialize the eol-carousel for that page.
/*
(function($){
	$(document).ready(function() {
		setTimeout(function() {
			// If not, then bind them.
			eonline.carousel.init({
				"classes": {
					"carouselWrapClass": ""
					"carousel": ""
					"domTags": {
						"li": "",
						"anchorLinks": "",
						"img": ""
					},
					// For any widgets which have modal dialogs + 2 different sets of thumbnail images, such as the C11 widget.
					"rootDiv": ""
				},
				"duration": 500,
				"ids": {
					"modalDialog": "",
					"modalTemplate": ""
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
				"visible": {
					"range": {
						"min": 4,
						"max": 6
					},
					"startPosition": 0
				}
			});
		},500);
	});
})(jQuery.noConflict());
*/
