// Author: @briankueck Tweet: @eDevelopers1

eonline = (typeof(eonline) !== 'undefined') ? eonline : {}; // Same as window.eonline.
eonline.mWidgetsOnly = (typeof(eonline.mWidgetsOnly) !== 'undefined') ? eonline.mWidgetsOnly : {};
eonline.mWidgetsOnly.widgets = (function($) { // This is for the M-Series widgets only, until I can refactor it into the main widgets.js file.

	var model = {
		"debug": {
			"all": false,
			"fnTrace": false,
			"modalDialog": false,
			"modalDialogListeningHandles": false,
			"modalDialogRepositioningCoords": false
		},
		"config": {
			"programName": "eonline.mWidgetsOnly.widgets"
		},
		"data": {
			"widgets": [],
			"isModalShown": false,
			"modalDialog": {
				"json": {}
			}
		},
		"dom": {
			"ids": {
				"modalDialog": "#%WIDGET-ID%-dynamic-content #modal-dialog",
				"modalTemplate": "#%WIDGET-ID% #modal-template"
			}
		}
	};

	function bindDynamicListeners() {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.bindDynamicListeners'); }

		// Binds a click lister to the "Close X" button.
		var linkData = {
			"widgetId": model.data.modalDialog.json.widgetIdLong
		};
		var modalDialogId = getDomId('modalDialog', linkData);
		$(modalDialogId + ' #close-link').click(function(e) { // "#" + json.closeBttn.link.id
			if (model.debug.all || model.debug.modalDialog) { log('MODAL close-x button clicked'); }
			removeDialog(e);
		});

		// Overlay
		$('#modal-overlay').click(function(e) {
			if (model.debug.all || model.debug.modalDialog) { log('OVERLAY clicked'); }
			removeDialog(e);
		});

		// Check for small laptop monitors like Mac 1280x800. If found, skip over the scrolling & resizing code. Otherwise, use it for PCs & high-resolutions.
		var clientHeight = $(window).height();
		var modalHeight = $("#" + model.data.modalDialog.json.modal.id).height();
		if (model.debug.all || model.debug.modalDialogRepositioningCoords) {
			log('clientHeight: ' + clientHeight);
			log('modalHeight: ' + modalHeight);
		}
		if (clientHeight > modalHeight) {
			// Document Scroll Listener to Vertically Center the Modal Dialog in the Browser's Viewport.
			$(document).bind('scroll', listenerHandleDocumentScrollForModalDialog);

			// Window Resize Listener to Horizontally Center the Modal Dialog in the Browser's Viewport.
			$(window).bind('resize', listenerHandleWindowResizeForModalDialog);
		}
	}

	function centerModalDialog(json) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.centerModalDialog'); }
		setTimeout(function(){ // Avoids a RACE condition, where the height of the modal dialog is smaller than the actual size.
			var scrollTop = $(document).scrollTop();
			var scrollLeft = $(document).scrollLeft();
			var clientHeight = $(window).height();
			var clientWidth = $(window).width();
			var modalHeight = $("#" + json.modal.id).height();
			var modalWidth = $("#" + json.modal.id).width();
			var newTop = (scrollTop + Math.round((clientHeight - modalHeight) / 2));
			var newLeft = (scrollLeft + Math.round((clientWidth - modalWidth) / 2));
			if (model.debug.all || model.debug.modalDialog || model.debug.modalDialogRepositioningCoords) {
				log('scrollTop: ' + scrollTop);
				log('scrollLeft: ' + scrollLeft);
				log('clientHeight: ' + clientHeight);
				log('clientWidth: ' + clientWidth);
				log('modalHeight: ' + modalHeight);
				log('modalWidth: ' + modalWidth);
				log('newTop: ' + newTop);
				log('newLeft: ' + newLeft);
			}
			$("#" + json.modal.id).css({
				"top": newTop + 'px',
				"left": newLeft + 'px'
			});
		},333);
	}

	function changeColors(eventTypeKey) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.changeColors'); }
		$(model.widgets).each(function(i, json) {
			if (json.eventTrigger === eventTypeKey) {
				var dom = $(json.selector);
				if (typeof(dom) !== 'undefined') {
					if (model.debug.all) { log('jquery selector: ' + json.selector); }

					// Remove all background colors. These are the values for the oldSkinGroupColor & oldSkinColor variables.
					removeBkgColors(dom, 'white', 'white');
					removeBkgColors(dom, 'dark', 'blue');
					removeBkgColors(dom, 'light', 'yellow');
					removeBkgColors(dom, 'dark', 'red');
					removeBkgColors(dom, 'dark', 'purple');
					removeBkgColors(dom, 'dark', 'gray-dark');
					removeBkgColors(dom, 'dark', 'grey-dark');
					removeBkgColors(dom, 'dark', 'gray-medium');
					removeBkgColors(dom, 'dark', 'grey-medium');
					removeBkgColors(dom, 'light', 'gray-light');
					removeBkgColors(dom, 'light', 'grey-light');
					removeBkgColors(dom, 'dark', 'black'); // Prevents a duplicate black skin color from appearing in the DOM.

					// Both Blue & Black are dark skin group colors.
					if (model.debug.all) { log('Adding: ' + 'skin-group-dark ' + json.color + '!'); }
					dom.addClass('skin-group-dark ' + json.color);
				}
			}
		});
	}

	/* Lazy Loading Queuing Helper Functions.
	 * Maps the Data into the Resources files above, after they have been loaded. This also prevents RACE conditions with Lazy Loading.
	 * If the files haven't finished being initialized, then the function calls get "re-queued" every 50ms.
	 * Once the required .js files have been dynamically loaded, it will call the eonline.videoPlayerEngine.setData() function.
	 */
	function databindVideos(json) { // debug, videos
		if (json.debug) { log('fn ' + model.config.programName + '.databindVideos'); }

		var sharedWidgetType = (json.sharedWidgetType) ? json.sharedWidgetType : json.widgetType;

		// This will be databound 1x per C11, M2, M3 or V2 widget that's on the page.
		if ((typeof(eonline) !== 'undefined') 
		&& (typeof(eonline.mWidgetsOnly.videoPlayerEngine) !== 'undefined')
		&& (typeof(eonline.widgets[sharedWidgetType]) !== 'undefined')
		&& (typeof(eonline.mWidgetsOnly.carousel) !== 'undefined') // This prevents an "undefined" widgetId race condition in the widgets[sharedWidgetType].js script & on the video detail page, even though it's not referenced here.
		) {
			eonline.mWidgetsOnly.videoPlayerEngine.setData('videos.' + json.widgetIdShort, json.videos);
			if (typeof(eonline.widgets[sharedWidgetType].setData) !== 'undefined') {
				eonline.widgets[sharedWidgetType].setData('socialMediaIcons', json.socialMediaIcons, json);
				eonline.widgets[sharedWidgetType].setData('sectionType.' + json.widgetIdShort + '.className', json.sectionTypeClass);
				eonline.widgets[sharedWidgetType].setData('sectionType.' + json.widgetIdShort + '.text', json.sectionTypeText);
			}
			eonline.widgets[sharedWidgetType].init(json);
		} else {
			if (json.debug) { log('Still waiting....'); }
			setTimeout(function() {
				databindVideos(json);
			}, 50);
		}
	}

	function destroy(nodeId) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '. destroy (' + nodeId + ')'); }

		// Native JS nodes aren't wrapped in an array.
		var node = document.getElementById(nodeId);
		if ((typeof(node) !== 'undefined') && (node)) {
			node.innerHTML = ''; // This should be automatically garbage collected, since innerHTML doesn't contain any data.
		}

		// jQuery nodes are wrapped in an array.
		// These don't garbage collect in IE 8. When closing the modal dialog / lightbox, the video is removed from the DOM but the audio continues to play.
		var node = $('#' + nodeId);
		if ((typeof(node) !== 'undefined') && (node)) {
			node.unbind().html("").empty().remove();
		}
	}

	function getDomId(key, linkData) { // This linkData is required for all keys listed below.
		if (model.debug.all || model.debug.fnTrace) { 
			log('fn ' + model.config.programName + '. getDomId (' + key + ', ' + linkData.widgetId + ')');
		}
		switch(key) {
			case 'modalDialog':
				var id = model.dom.ids.modalDialog.replace('%WIDGET-ID%',linkData.widgetId);
				/*if ((typeof(eonline.mWidgetsOnly.carousel) !== 'undefined') && (typeof(eonline.mWidgetsOnly.carousel.getDomClasses) !== 'undefined') 
				&& (linkData.widgetType !== 'undefined') && (linkData.widgetType !== 'c11')) {
					id += eonline.mWidgetsOnly.carousel.getDomClasses('rootDiv');
				}*/
			break;
			case 'modalTemplate':
				var id = model.dom.ids.modalTemplate.replace('%WIDGET-ID%',linkData.widgetId);
			break;
		}
		return id;
	}

	function init(json) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.init'); }
		if (model.debug.all) { log('location.pathname: ' + location.pathname); }

		// Saves the initialization data to the data object.
		model.data.widgets = json;
	}

	/* Begin Listener Handles
	 * These next 2 listeners are currently identical, but they allow us to add future event driven code to them which could apply to either the scroll listener or the resize listener, instead of both.
	 * If you need to have something that is triggered by both the scroll listener & the resize listener, please put it into a function and link the function into both of these 2 listener functions.
	 * Then it can be easily commented out from one or the other, as needed. These also allow us to add/remove listener handles for the modal dialogs, without affecting other listener handles, scroll events 
	 * or resizing events which were added by other developer's code. Pretty slick, eh?
	 */

	function listenerHandleDocumentScrollForModalDialog(e) {
		if (model.debug.all || model.debug.modalDialog || model.debug.modalDialogListeningHandles) { log('Document Scrolling'); }
		centerModalDialog(model.data.modalDialog.json);
	}

	function listenerHandleWindowResizeForModalDialog(e) {
		if (model.debug.all || model.debug.modalDialog || model.debug.modalDialogListeningHandles) { log('Window Resizing'); }
		centerModalDialog(model.data.modalDialog.json);
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

		model.data.modalDialog.json = json;
		removeDialog(null);

		// Create new dialog.
		var modalDialog = '<div id="' + json.modal.id + '" class="lp-widget ' + json.widgetType + ' ' + json.modal.css + '"><a href="javascript:void(0);" id="' + json.closeBttn.link.id + '" class="' + json.closeBttn.link.css + '"><span>' + json.closeBttn.link.text + '</span></a>';

		// Uses either an HTML input stream or an iFrame Src URL.
		if (json.html) {
			modalDialog += json.html;
		} else if (json.iFrame.srcUrl) {
			modalDialog += '<iframe frameborder="0" scrolling="no" class="' + json.iFrame.css + '" src="' + json.iFrame.srcUrl + '" height="' + json.iFrame.height + '" width="' + json.iFrame.width + '"></iframe>';
		}
		modalDialog += '</div>';

		//Appends the new modal dialog to the widget.
		for (var i=0, j=5; i<j; i++) {
			modalDialog = modalDialog.replace(/\t/g,'');
			modalDialog = modalDialog.replace(/\r/g,'');
			modalDialog = modalDialog.replace(/\n/g,'');
		}

		// Attempt #1: This wipes out the front door: '#' + json.widgetIdLong).append(HTML);
		//'#' + json.widgetIdLong + ' #dynamic-content').append(modalDialog);

		// Attempt #2: So let's try something else, which might not break the front door like jQuery is doing.
		/* Can't use this, since it will offset the modal dialog too far to the right when the widget is in column 3.
		   The left & top values will be relative to the widget's top & left coordinates, not the browser's top & left coordinates.
		var key = json.widgetIdLong + '-dynamic-content';
		'#' + json.widgetIdLong).append('<div id="' + key + '"></div>');
		var dom = document.getElementById(key);
		dom.innerHTML = modalDialog;
		*/

		// Attempt #3: // This wipes out the front door's DOM, like Attempt #1 does.
		//$("body").append(modalDialog); // Attach it to document.body.

		// Attempt #4:
		var key = json.widgetIdLong + '-dynamic-content';
		var dom = $('#' + key);
		if (typeof(dom[0]) === 'undefined') { // Avoids droping the modal dialog to the DOM more than once.
			$("body").append('<div id="' + key + '"></div>');
		}
		var dom = document.getElementById(key);
		dom.innerHTML = modalDialog; // Append it to the DOM.
		centerModalDialog(json);

		// Create new overlay.
		var overlay = '<div id="' + json.overlay.id + '" class="' + json.overlay.css + '">&nbsp;</div>';

		//Appends the overlay to the body tag.
		$("body").append(overlay);

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

	function removeBkgColors(dom, oldSkinGroupColor, oldSkinColor) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.removeBkgColors'); }
		if (model.debug.all) { log('Removing skin-group-' + oldSkinGroupColor + ' ' + oldSkinColor + '...'); }
		dom.removeClass('skin-group-' + oldSkinGroupColor).removeClass(oldSkinColor);
	}

	function removeDialog(e) {
		if (model.debug.all || model.debug.fnTrace || model.debug.modalDialogListeningHandles) { log('fn ' + model.config.programName + '.removeDialog'); }
		model.data.isModalShown = false;
		if (e) {
			e.preventDefault();
		}

		// Removes the old modal dialog & overlay & other developer's modals + overlays, plus their HTML tags.
		// We can't have 2 overlays stack on top of each other, as is the case of this C11 modal dialog + the email button's popup modal window.
		var json = model.data.modalDialog.json;
		if (model.debug.all || model.debug.modalDialog || model.debug.modalDialogListeningHandles) { log('removing dialog'); }
		destroy(json.modal.id);
		destroy(json.overlay.id);
		destroy('modal');
		destroy('overlay');

		// Removes the video player from the C11 Widget's hidden template, so that it won't popup the same video on the next... especially, when switching videos. This will leave the outer wrapping <div id="evp-..." class="video-player-container"></div> tags, so that we can use them again next time.
		if (typeof(eonline.widgets.c11) !== 'undefined') {
			if (model.debug.all || model.debug.modalDialog || model.debug.modalDialogListeningHandles) { log('removing C11 Video Player'); }
			destroy(json.widgetIdLong + ' #' + json.playerWrap.id);
		}

		// Removes the Document Object's Scroll Event for the Modal Dialog, but leaves all other Scroll listeners attached to the document object.
		if (model.debug.all || model.debug.modalDialog || model.debug.modalDialogListeningHandles) { log('removing document scroll event for the widget modal dialog system.'); }
		$(document).unbind('scroll', listenerHandleDocumentScrollForModalDialog);

		// Removes the Window Object's Scroll Event for the Modal Dialog, but leaves all other Resize listeners attached to the window object.
		if (model.debug.all || model.debug.modalDialog || model.debug.modalDialogListeningHandles) { log('removing window resize event for the widget modal dialog system.'); }
		$(window).bind('resize', listenerHandleWindowResizeForModalDialog);
	}

	function widgetLoader(json) {
		if (model.debug.all || model.debug.fnTrace) { log('fn ' + model.config.programName + '.widgetLoader'); }

		/* LAZYLOAD json.lazyLoad = 'baseLibrary,widget' + json.widgetType; json.lazyLoad = 'carousel,videoPlayerEngine'; */
		/* LAZYLOAD eonline.mWidgetsOnly.lazyLoad.init(json.lazyLoad); */

		// Once loaded, it will initialize them.
		if (json.needsVideo) {
			databindVideos(json); // This can also load individual widget.m2.js & widget.m3.js files.
		} else if (typeof(eonline.widgets[json.widgetType]) !== 'undefined') {
			eonline.widgets[json.widgetType].init(json); // Load individual widget.*.js files.
		} else {
			// If not loaded, it will sleep for 50ms & then restart this function.
			setTimeout(function() {
				widgetLoader(json);
			}, 50);
		}
	}

	return {
		// Exposes Public Function Names
		"getDomId": getDomId,
		"init": init,
		"changeColors": changeColors,
		"modal": modal,
		"widgetLoader": widgetLoader
	};
})(jQuery);

/* Example Usage:
*/
