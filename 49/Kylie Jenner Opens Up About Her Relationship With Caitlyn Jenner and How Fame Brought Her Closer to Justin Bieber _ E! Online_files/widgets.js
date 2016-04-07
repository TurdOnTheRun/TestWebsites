// Author: @briankueck Tweet: @eDevelopers1

if (typeof(eonline) === 'undefined') var eonline = {}; // Same as window.eonline.
eonline.widgets = (function($) {

	var objCore = {
		"objDebug": {
			"boolAll": false,
			"boolFnTrace": false,
			"boolModalDialog": false,
			"boolModalDialogListeningHandles": false,
			"boolModalDialogRepositioningCoords": false
		},
		"objConfig": {
			"strProgramName": "eonline.widgets (Tweet: @eDevelopers1): "
		},
		"objData": {
			"arrWidgets": [],
			"boolIsModalShown": false,
			"objModalDialog": {
				"json": {}
			}
		},
		"objDom": {
			"objIds": {
				"strModalDialog": "#%WIDGET-ID%-dynamic-content #modal-dialog",
				"strModalTemplate": "#%WIDGET-ID% #modal-template"
			}
		}
	};

	function bindDynamicListeners() {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn bindDynamicListeners'); }

		// Binds a click lister to the "Close X" button.
		var objLinkData = {
			"strWidgetId": objCore.objData.objModalDialog.json.widgetId
		};
		var strModalDialogId = getDomId('modalDialog', objLinkData);
		$(strModalDialogId + ' #close-link').click(function(e) { // "#" + json.closeBttn.link.id
			if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog) { fb('MODAL close-x button clicked'); }
			removeDialog(e);
		});

		// Overlay
		$('#modal-overlay').click(function(e) {
			if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog) { fb('OVERLAY clicked'); }
			removeDialog(e);
		});

		// Check for small laptop monitors like Mac 1280x800. If found, skip over the scrolling & resizing code. Otherwise, use it for PCs & high-resolutions.
		var intClientHeight = $(window).height();
		var intModalHeight = $("#" + objCore.objData.objModalDialog.json.modal.id).height();
		if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialogRepositioningCoords) {
			fb('intClientHeight: ' + intClientHeight);
			fb('intModalHeight: ' + intModalHeight);
		}
		if (intClientHeight > intModalHeight) {
			// Document Scroll Listener to Vertically Center the Modal Dialog in the Browser's Viewport.
			$(document).bind('scroll', listenerHandleDocumentScrollForModalDialog);

			// Window Resize Listener to Horizontally Center the Modal Dialog in the Browser's Viewport.
			$(window).bind('resize', listenerHandleWindowResizeForModalDialog);
		}
	}

	function centerModalDialog(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn centerModalDialog'); }
		setTimeout(function(){ // Avoids a RACE condition, where the height of the modal dialog is smaller than the actual size.
			var intScrollTop = $(document).scrollTop();
			var intScrollLeft = $(document).scrollLeft();
			var intClientHeight = $(window).height();
			var intClientWidth = $(window).width();
			var intModalHeight = $("#" + json.modal.id).height();
			var intModalWidth = $("#" + json.modal.id).width();
			var intNewTop = (intScrollTop + Math.round((intClientHeight - intModalHeight) / 2));
			var intNewLeft = (intScrollLeft + Math.round((intClientWidth - intModalWidth) / 2));
			if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog || objCore.objDebug.boolModalDialogRepositioningCoords) {
				fb('intScrollTop: ' + intScrollTop);
				fb('intScrollLeft: ' + intScrollLeft);
				fb('intClientHeight: ' + intClientHeight);
				fb('intClientWidth: ' + intClientWidth);
				fb('intModalHeight: ' + intModalHeight);
				fb('intModalWidth: ' + intModalWidth);
				fb('intNewTop: ' + intNewTop);
				fb('intNewLeft: ' + intNewLeft);
			}
			$("#" + json.modal.id).css({
				"top": intNewTop + 'px',
				"left": intNewLeft + 'px'
			});
		},333);
	}

	function changeColors(strEventTypeKey) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn changeColors'); }
		$(objCore.arrWidgets).each(function(i, json) {
			if (json.eventTrigger === strEventTypeKey) {
				var objDom = $(json.selector);
				if (typeof(objDom) !== 'undefined') {
					if (objCore.objDebug.boolAll) { fb('jquery selector: ' + json.selector); }

					// Remove all background colors. These are the values for the strOldSkinGroupColor & strOldSkinColor variables.
					removeBkgColors(objDom, 'white', 'white');
					removeBkgColors(objDom, 'dark', 'blue');
					removeBkgColors(objDom, 'light', 'yellow');
					removeBkgColors(objDom, 'dark', 'red');
					removeBkgColors(objDom, 'dark', 'purple');
					removeBkgColors(objDom, 'dark', 'gray-dark');
					removeBkgColors(objDom, 'dark', 'grey-dark');
					removeBkgColors(objDom, 'dark', 'gray-medium');
					removeBkgColors(objDom, 'dark', 'grey-medium');
					removeBkgColors(objDom, 'light', 'gray-light');
					removeBkgColors(objDom, 'light', 'grey-light');
					removeBkgColors(objDom, 'dark', 'black'); // Prevents a duplicate black skin color from appearing in the DOM.

					// Both Blue & Black are dark skin group colors.
					if (objCore.objDebug.boolAll) { fb('Adding: ' + 'skin-group-dark ' + json.color + '!'); }
					objDom.addClass('skin-group-dark ' + json.color);
				}
			}
		});
	}

	function destroy(strNodeId) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: destroy (' + strNodeId + ')'); }

		// Native JS nodes aren't wrapped in an array.
		var node = document.getElementById(strNodeId);
		if ((typeof(node) !== 'undefined') && (node)) {
			node.innerHTML = ''; // This should be automatically garbage collected, since innerHTML doesn't contain any data.
		}

		// jQuery nodes are wrapped in an array.
		// These don't garbage collect in IE 8. When closing the modal dialog / lightbox, the video is removed from the DOM but the audio continues to play.
		var node = $('#' + strNodeId);
		if ((typeof(node) !== 'undefined') && (node)) {
			node.unbind().html("").empty().remove();
		}
	}

	// Firebug. Short-cut function to eliminate having to repeatedly type "console.log".
	function fb(obj) {
		if (((objCore.objDebug.boolAll) || (objCore.objDebug.boolFnTrace) || (objCore.objDebug.boolModalDialog) || (objCore.objDebug.boolModalDialogListeningHandles) || (objCore.objDebug.boolModalDialogRepositioningCoords)) && (typeof(console) !== 'undefined') && (typeof(console.log) !== 'undefined') && obj) {
			console.log(objCore.objConfig.strProgramName + obj);
		}
	}

	function getDomId(strKey, objLinkData) { // This objLinkData is required for all strKeys listed below.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { 
			fb('fn: getDomId (' + strKey + ', ' + objLinkData.strWidgetId + ')');
		}
		switch(strKey) {
			case 'modalDialog':
				var strId = objCore.objDom.objIds.strModalDialog.replace('%WIDGET-ID%',objLinkData.strWidgetId);
				/*if ((typeof(eonline.carousel) !== 'undefined') && (typeof(eonline.carousel.getDomClasses) !== 'undefined') 
				&& (objLinkData.strWidgetType !== 'undefined') && (objLinkData.strWidgetType !== 'c11')) {
					strId += eonline.carousel.getDomClasses('rootDiv');
				}*/
			break;
			case 'modalTemplate':
				var strId = objCore.objDom.objIds.strModalTemplate.replace('%WIDGET-ID%',objLinkData.strWidgetId);
			break;
		}
		return strId;
	}

	function init(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn init'); }
		if (objCore.objDebug.boolAll) { fb('location.pathname: ' + location.pathname); }

		// Saves the initialization data to the data object.
		objCore.objData.arrWidgets = json;
	}

	/* Begin Listener Handles
	 * These next 2 listeners are currently identical, but they allow us to add future event driven code to them which could apply to either the scroll listener or the resize listener, instead of both.
	 * If you need to have something that is triggered by both the scroll listener & the resize listener, please put it into a function and link the function into both of these 2 listener functions.
	 * Then it can be easily commented out from one or the other, as needed. These also allow us to add/remove listener handles for the modal dialogs, without affecting other listener handles, scroll events 
	 * or resizing events which were added by other developer's code. Pretty slick, eh?
	 */

	function listenerHandleDocumentScrollForModalDialog(e) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog || objCore.objDebug.boolModalDialogListeningHandles) { fb('Document Scrolling'); }
		centerModalDialog(objCore.objData.objModalDialog.json);
	}

	function listenerHandleWindowResizeForModalDialog(e) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog || objCore.objDebug.boolModalDialogListeningHandles) { fb('Window Resizing'); }
		centerModalDialog(objCore.objData.objModalDialog.json);
	}

	/** End Listner Handles **/

	function modal(json, fn) {
		/* Original implementation: eol.page.modal(), but that doesn't:
		 * 1. Bind the click for widgets,
		 * 2. Allow for JSON input variables,
		 * 3. Allow for variable modal dialog height,
		 * 4. Allow for variable modal dialog widths.
		 * This does all 4 of those things!
		/* Usage:
			eonline.widgets.modal({
				// Required:
				"modal": {
					"css": "tipline-wrap",
					"height": 771,
					"width": 920
				},
				"closeBttn": {
					"linkClass": "tipline-close",
					"text": "Close"
				",
				"overlay": {
					"css": "eol-modaldropshadow"
				},
				// Optional - Choice 1:
				"html": $('.modal-template').html(), // Comment this out to use the iFrameSrcUrl code below.
				// Optional - Choice 2:
				"iFrame": {
					"css": "eol-tipline",
					"srcUrl": iFrameSrcUrl
				}
			});
		*/

		objCore.objData.objModalDialog.json = json;
		removeDialog(null);

		// Create new dialog.
		var strModalDialog = '<div id="' + json.modal.id + '" class="lp-widget ' + json.widgetType + ' ' + json.modal.css + '"><a href="javascript:void(0);" id="' + json.closeBttn.link.id + '" class="' + json.closeBttn.link.css + '"><span>' + json.closeBttn.link.text + '</span></a>';

		// Uses either an HTML input stream or an iFrame Src URL.
		if (json.html) {
			strModalDialog += json.html;
		} else if (json.iFrame.srcUrl) {
			strModalDialog += '<iframe frameborder="0" scrolling="no" class="' + json.iFrame.css + '" src="' + json.iFrame.srcUrl + '" height="' + json.iFrame.height + '" width="' + json.iFrame.width + '"></iframe>';
		}
		strModalDialog += '</div>';

		//Appends the new modal dialog to the widget.
		for (var i=0, j=5; i<j; i++) {
			strModalDialog = strModalDialog.replace(/\t/g,'');
			strModalDialog = strModalDialog.replace(/\r/g,'');
			strModalDialog = strModalDialog.replace(/\n/g,'');
		}

		// Attempt #1: This wipes out the front door: $("#" + json.widgetId).append(strHtml);
		//$("#" + json.widgetId + ' #dynamic-content').append(strModalDialog);

		// Attempt #2: So let's try something else, which might not break the front door like jQuery is doing.
		/* Can't use this, since it will offset the modal dialog too far to the right when the widget is in column 3.
		   The left & top values will be relative to the widget's top & left coordinates, not the browser's top & left coordinates.
		var strKey = json.widgetId + '-dynamic-content';
		$("#" + json.widgetId).append('<div id="' + strKey + '"></div>');
		var objDom = document.getElementById(strKey);
		objDom.innerHTML = strModalDialog;
		*/

		// Attempt #3: // This wipes out the front door's DOM, like Attempt #1 does.
		//$("body").append(strModalDialog); // Attach it to document.body.

		// Attempt #4:
		var strKey = json.widgetId + '-dynamic-content';
		var objDom = $('#' + strKey);
		if (typeof(objDom[0]) === 'undefined') { // Avoids droping the modal dialog to the DOM more than once.
			$("body").append('<div id="' + strKey + '"></div>');
		}
		var objDom = document.getElementById(strKey);
		objDom.innerHTML = strModalDialog; // Append it to the DOM.
		centerModalDialog(json);

		// Create new overlay.
		var strOverlay = '<div id="' + json.overlay.id + '" class="' + json.overlay.css + '">&nbsp;</div>';

		//Appends the overlay to the body tag.
		$("body").append(strOverlay);

		// Sets the modal dialog's dimensions.
		$("#" + json.modal.id).css({
			height: json.modal.height + "px",
			width: json.modal.width + "px"
		});

		// Sets the overlay's height to the browser viewport's height.
		$("#" + json.overlay.id).css({
			height: $(document).height() + "px"
		});

		// Binds Dynamic Listeners to the Modal Dialog.
		bindDynamicListeners();

		// Runs any callback functions.
		if (typeof(fn) === 'function') {
			setTimeout(function() {
				fn(json);
			},500);
		}
	}

	function removeBkgColors(objDom, strOldSkinGroupColor, strOldSkinColor) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn removeBkgColors'); }
		if (objCore.objDebug.boolAll) { fb('Removing skin-group-' + strOldSkinGroupColor + ' ' + strOldSkinColor + '...'); }
		objDom.removeClass('skin-group-' + strOldSkinGroupColor).removeClass(strOldSkinColor);
	}

	function removeDialog(e) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace || objCore.objDebug.boolModalDialogListeningHandles) { fb('fn removeDialog'); }
		objCore.objData.boolIsModalShown = false;
		if (e) {
			e.preventDefault();
		}

		// Removes the old modal dialog & overlay & other developer's modals + overlays, plus their HTML tags.
		// We can't have 2 overlays stack on top of each other, as is the case of this C11 modal dialog + the email button's popup modal window.
		var json = objCore.objData.objModalDialog.json;
		if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog || objCore.objDebug.boolModalDialogListeningHandles) { fb('removing dialog'); }
		destroy(json.modal.id);
		destroy(json.overlay.id);
		destroy('modal');
		destroy('overlay');

		// Removes the video player from the C11 Widget's hidden template, so that it won't popup the same video on the next... especially, when switching videos. This will leave the outer wrapping <div id="evp-..." class="video-player-container"></div> tags, so that we can use them again next time.
		if (typeof(eonline.widgets.c11) !== 'undefined') {
			if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog || objCore.objDebug.boolModalDialogListeningHandles) { fb('removing C11 Video Player'); }
			destroy(json.widgetId + ' #' + json.playerWrap.id);
		}

		// Removes the Document Object's Scroll Event for the Modal Dialog, but leaves all other Scroll listeners attached to the document object.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog || objCore.objDebug.boolModalDialogListeningHandles) { fb('removing document scroll event for the widget modal dialog system.'); }
		$(document).unbind('scroll', listenerHandleDocumentScrollForModalDialog);

		// Removes the Window Object's Scroll Event for the Modal Dialog, but leaves all other Resize listeners attached to the window object.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolModalDialog || objCore.objDebug.boolModalDialogListeningHandles) { fb('removing window resize event for the widget modal dialog system.'); }
		$(window).bind('resize', listenerHandleWindowResizeForModalDialog);
	}

	function vpeDataBind(json) { // debug, arrVideos
		if (json.debug & typeof(fb) !== 'undefined') { fb('fn vpeDataBind'); }
		if ((typeof(eonline) !== 'undefined') && (typeof(eonline.videoPlayerEngine) !== 'undefined') 
		&& (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets[json.strWidgetType]) !== 'undefined')
		&& (typeof(eonline.carousel) !== 'undefined') // This prevents an "undefined" strWidgetId race condition in the widgets[json.strWidgetType].js script & on the video detail page, even though it's not referenced here.
		) {
			if (json.debug & typeof(fb) !== 'undefined') { fb('The Video Player Engine has been Lazy Loaded. Setting the Data for the VPE.'); }
			// Sets the Data.
			eonline.videoPlayerEngine.setData('arrVideos.' + json.intWidgetId, json.arrVideos);

			if (json.debug & typeof(fb) !== 'undefined') { fb('Since the VPE has been loaded, we can now initialize the ' + json.strWidgetType.toUpperCase() + ' widget.'); }
			// Initializes all C11 or V2 Widgets in the DOM, after the VPE has been loaded.
			//clearTimeout(videoPlayerWidgetInitTimeout);
			//var videoPlayerWidgetInitTimeout = setTimeout(function() {
				eonline.widgets[json.strWidgetType].init(json); // This event will be fired off 1x per page & only after all C11 or V2 widgets have been rendered out & had their data bound up from the DOM to the C11 or V2 Widget's JS Layer.
			//}, 500); // This setTimeout prevents race conditions on the Video Detail Page, which were occuring when
					 // this function was triggered by the 1st C11 or V2 widget, before the video array data was finished
					 // being created.

		} else {
			if (json.debug) {
				fb('Still waiting for the Video Player Engine to load, before initializing the ' + json.strWidgetType.toUpperCase() + ' widget...');
			}
			setTimeout(function() {
				vpeDataBind(json); // json.debug, json.arrVideos
			}, 50);
		}
	}

	/* Lazy Loading Queuing Helper Functions.
	 * Maps the Data into the Resources files above, after they have been loaded. This also prevents RACE conditions with Lazy Loading.
	 * If the files haven't finished being initialized, then the function calls get "re-queued" every 50ms.
	 * Once the required .js files have been dynamically loaded, it will call the eonline.videoPlayerEngine.setData() function.
	 */
	function videoWidgetDataBind(json) { // debug, arrSocialMediaIcons, arrVideos, intWidgetId, strSectionTypeClass, strSectionTypeText
		if (json.debug & typeof(fb) !== 'undefined') { fb('fn videoWidgetDataBind'); }
		if ((typeof(eonline) !== 'undefined') && (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets[json.strWidgetType]) !== 'undefined')) {
			if (json.debug & typeof(fb) !== 'undefined') { fb(json.strWidgetType.toUpperCase() + ' Widget has been Lazy Loaded. Begin DataBind... for ${strWidgetId}'); }

			// This will be databound 1x per C11 or V2 widget that's on the page.
			eonline.widgets[json.strWidgetType].setData('arrSocialMediaIcons', json.arrSocialMediaIcons);
			eonline.widgets[json.strWidgetType].setData('objSectionType.' + json.intWidgetId + '.strClass', json.strSectionTypeClass);
			eonline.widgets[json.strWidgetType].setData('objSectionType.' + json.intWidgetId + '.strText', json.strSectionTypeText);
			vpeDataBind(json);
			if (json.debug & typeof(fb) !== 'undefined') { fb(json.strWidgetType.toUpperCase() + ' Widget data has been set for... ${strWidgetId}'); }
		} else {
			if (json.debug & typeof(fb) !== 'undefined') { fb('Still waiting for the ' + json.strWidgetType.toUpperCase() + ' Widget to Lazy Load... for ${strWidgetId}'); }
			setTimeout(function() {
				videoWidgetDataBind(json); // json.debug, json.arrSocialMediaIcons, json.arrVideos
			}, 50);
		}
	}

	return {
		// Exposes Public Function Names
		"getDomId": getDomId,
		"init": init,
		"changeColors": changeColors,
		"modal": modal,
		"videoWidgetDataBind": videoWidgetDataBind
	};
})(jQuery);

/* Example Usage:
*/
