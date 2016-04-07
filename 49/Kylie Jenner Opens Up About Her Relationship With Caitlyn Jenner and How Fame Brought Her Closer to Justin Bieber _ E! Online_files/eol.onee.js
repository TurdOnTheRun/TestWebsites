/*======================================*/
/*=========|EOL ONE E! MODULE |=========*/
/*======================================*/
/* Platform: EONLINE Desktop            */

var eolOneE = eolOneE || {};

(function(oneE, $) {

	// Cookie setting and reading functionality
	var docCookies = {
		getItem: function (sKey) {
			if (!sKey) { return null; }
			return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		},
		setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
						break;
					case String:
						sExpires = "; expires=" + vEnd;
						break;
					case Date:
						sExpires = "; expires=" + vEnd.toUTCString();
						break;
				}
			}
			document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},
		removeItem: function (sKey, sPath, sDomain) {
			if (!this.hasItem(sKey)) { return false; }
			document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
			return true;
		},
		hasItem: function (sKey) {
			if (!sKey) { return false; }
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		keys: function () {
			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
			return aKeys;
		}
	};

	/*======================================*/
	/*=====|BEGIN ONE E! FUNCTIONALITY|=====*/
	/*======================================*/

	// Boolean provided by back end to determine whether to enable lightbox / floating bar
	var IS_EDITION_OPT_IN_ENABLED = $('.js-onee-script').attr('data-isEditionOptInEnabled') == 'true' ? true : false;

	// What type of lightbox is being displayed -- 'homepage' or 'default'
	var EDITION_OPT_IN_TYPE = $('.js-onee-script').attr('data-editionOptInType');

	// Edition parameter provided by JSP
	var PAGE_EDITION = $('.js-onee-script').attr('data-edition').toLowerCase();

	// Edition cookie set by back end - fall back to PAGE_EDITION if contentEdition isn't present
	var COOKIE_EDITION = docCookies.getItem('contentEdition') ? docCookies.getItem('contentEdition').toLowerCase() : PAGE_EDITION;

	// Geotargeted cookie set by Akamai
	var COOKIE_GEO_EDITION = docCookies.getItem('geoEdition') ? docCookies.getItem('geoEdition').toLowerCase() : null;

	// Track user override of default edition using the lightbox
	var COOKIE_OVERRIDE_GEO = docCookies.getItem('onee_override_geo') ? true : false;
	var COOKIE_OVERRIDE_GEO_TTL = 2629746; // one month

	// Track user override of floating bar
	var COOKIE_OVERRIDE_BAR = docCookies.getItem('onee_override_bar') ? true : false;
	var COOKIE_OVERRIDE_BAR_TTL = 604800; // one week

	// Map geoEdition to hreflang values
	var GEO_EDITION_TO_HREFLANG = {
		'au': 'en-au',
		'ca': 'en-ca',
		'de': 'de',
		'fr': 'fr',
		'uk': 'en-gb',
		'us': 'en',
		'br': 'pt_br',
		'la': 'es'
	};

	/*============| INIT ON INITIAL LOAD |============*/

	$(function() {

		// Nav edition selector
		oneE.initEditionSelector();

		// Only init opt-in UI if it's enabled on current page and there is a geoEdition and contentEdition present
		// And the geoEdition contains an expected key defined in GEO_EDITION_TO_HREFLANG
		if (IS_EDITION_OPT_IN_ENABLED && COOKIE_GEO_EDITION !== null && COOKIE_EDITION !== null && GEO_EDITION_TO_HREFLANG.hasOwnProperty(COOKIE_GEO_EDITION)) {

			// If the edition and geoEdition don't match and the user's geoEdition is not US
			if (COOKIE_EDITION !== COOKIE_GEO_EDITION && COOKIE_GEO_EDITION !== 'us') {

				// If the user isn't overriding the geoEdition
				if (COOKIE_OVERRIDE_GEO == false) {

					// If current page is homepage
					if (EDITION_OPT_IN_TYPE == 'homepage') {

						// Display the edition opt-in lightbox
						oneE.displayLightbox(COOKIE_GEO_EDITION);

					} else if (EDITION_OPT_IN_TYPE == 'default') {

						// If there is an hreflang equivalent of the current page
						if (oneE.hasHrefLang(COOKIE_GEO_EDITION)) {

							// Link 'Yes' button to hreflang URL
							$('.js-onee-dialog-btns .js-primary').attr(
								'data-editionurl', 
								oneE.getHrefLangUrl(COOKIE_GEO_EDITION)
							);
							
							// Display the edition opt-in lightbox
							oneE.displayLightbox(COOKIE_GEO_EDITION);

						}

					}

				// Otherwise, if the user isn't overriding the floating bar
				} else if (COOKIE_OVERRIDE_BAR == false) {

					// If current page is homepage
					if (EDITION_OPT_IN_TYPE == 'homepage') {

						// Display the floating bar
						oneE.displayFloatingBar(COOKIE_GEO_EDITION);

					} else if (EDITION_OPT_IN_TYPE == 'default') {

						// If there is an hreflang equivalent of the current page
						if (oneE.hasHrefLang(COOKIE_GEO_EDITION)) {

							// Link 'Yes' button to hreflang URL
							$('.js-onee-bar-btn').attr(
								'data-editionUrl',
								oneE.getHrefLangUrl(COOKIE_GEO_EDITION)
							);

							// Display the floating bar
							oneE.displayFloatingBar(COOKIE_GEO_EDITION);

						}

					}

				}

			}

		}

	});

	var oneE = {

		displayLightbox: function(geoEdition) {

			// Display lightbox

			// Display content based on geoEdition
			$('.js-onee-flag[data-geoEdition=' + geoEdition + ']').removeClass('hidden');
			$('.js-onee-text[data-geoEdition=' + geoEdition + ']').removeClass('hidden');
			$('.js-onee-btns[data-geoEdition=' + geoEdition + ']').removeClass('hidden');
			$('.js-onee-dialog-translate[data-geoEdition=' + geoEdition + ']').removeClass('hidden');
			$('.js-onee-dialog-impressum[data-geoEdition=' + geoEdition + ']').removeClass('hidden');

			// Trigger the lightbox
			$('.js-onee-dialog').dialog({
				autoOpen: true, // Open lightbox immediately
				closeText: '', // Use graphic for close icon
				dialogClass: 'ui-onee-dialog', // Custom CSS class for z-index adjustments
				fluid: false,
				maxWidth: 700,
				minHeight: 477,
				minWidth: 700,
				width: 700,
				resizable: false,
				modal: true, // Disable other UI on the page
				open: function(event, ui) { 

					// Add custom class to prevent z-index collisions
					$('.ui-widget-overlay').addClass('ui-onee-overlay');

					// Close lightbox if overlay is clicked
					$('.ui-widget-overlay').click(function() { 
						$('.js-onee-dialog').dialog('close'); 
					});

					// Reposition dialog on window resize - debounce for performance
					var debouncedResize = _.debounce(function() {
						$('.js-onee-dialog').dialog('option', 'position', 'center');
					}, 100);

					$(window).on('resize.onee', debouncedResize);

				},
				close: function(event, ui) {

					// Remove custom class
					$('.ui-widget-overlay').removeClass('ui-onee-overlay');

					// Unbind resize listener
					$(window).off('resize.onee');

					// Set override cookie on dialog close
					docCookies.setItem('onee_override_geo', 'true', COOKIE_OVERRIDE_GEO_TTL, '/');

				}
			});

			// Bind lightbox 'Yes' button
			$('.js-onee-dialog-btns .js-primary').click(function(e) {
				e.preventDefault();

				// Set override cookie on 'Yes' click
				docCookies.setItem('onee_override_geo', 'true', COOKIE_OVERRIDE_GEO_TTL, '/');

				window.location.href = $(this).attr('data-editionUrl');
			});

			// Bind lightbox 'No, Thanks.' button
			$('.js-onee-dialog-btns .js-secondary').click(function(e) {
				e.preventDefault();
				$('.js-onee-dialog').dialog('close');
			});

			// Bind lightbox translate functionality
			$('.js-onee-dialog-translate').click(function(e) {
				e.preventDefault();
				oneE.translateLightbox($(this).attr('data-translateToEdition'));
			});

		},

		translateLightbox: function(language) {

			// Translate the content of the lightbox

			// Hide visible content
			$('.js-onee-text').addClass('hidden');
			$('.js-onee-btns').addClass('hidden');

			// Show language-appropriate content
			$('.js-onee-text[data-geoEdition=' + language + ']').removeClass('hidden');
			$('.js-onee-btns[data-geoEdition=' + language + ']').removeClass('hidden');

			// Remove the Translate link
			$('.js-onee-dialog-translate').remove();

		},

		initEditionSelector: function() {

			// Expand / collapse edition selector menu

			// Use Modernizr to determine whether to use click or hover event
			if ($('body').hasClass('touch')) {
				
				// touch
				$('.js-edition-selector').click(function(e) {
					e.preventDefault();
					$(this).toggleClass('active');
				});

			} else {
				
				// no-touch
				$('.js-edition-selector').hover(function() {
					$(this).addClass('active');
				}, function() {
					$(this).removeClass('active');
				});

			}

		},

		hasHrefLang: function(geoEdition) {

			// Check if there is an hreflang for the given geoEdition

			// Get hreflang mapping for current geoEdition
			var currentHrefLang = GEO_EDITION_TO_HREFLANG[geoEdition];

			// if geoEdition is an unexpected value
			if (currentHrefLang === undefined) {
				return false;
			}

			// Check for alternate link elements containing the hreflang value
			if ( $('.js-onee-hreflang[hreflang=' + currentHrefLang + ']').length == 1) {
				return true;
			} else {
				return false;
			}

		},

		getHrefLangUrl: function(geoEdition) {

			// Return hreflang URL for given geoEdition

			var currentHrefLang = GEO_EDITION_TO_HREFLANG[geoEdition];

			var hrefLangUrl = $('.js-onee-hreflang[hreflang=' + currentHrefLang + ']').attr('href');

			return hrefLangUrl;

		},

		displayFloatingBar: function(geoEdition) {

			// Display the floating bar

			// Display content based on geoEdition
			$('.js-onee-bar-btn-translate[data-geoEdition=' + geoEdition + ']').removeClass('hidden');
			$('.js-onee-bar-text[data-geoEdition=' + geoEdition + ']').removeClass('hidden');
			$('.js-onee-bar-btn[data-geoEdition=' + geoEdition + ']').removeClass('hidden');

			// Bind floating bar 'Yes' button
			$('.js-onee-bar-btn').click(function(e) {
				e.preventDefault();
				window.location.href = $(this).attr('data-editionUrl');
			});

			// Bind floating bar translate functionality
			$('.js-onee-bar-btn-translate').click(function(e) {
				e.preventDefault();
				oneE.translateFloatingBar($(this).attr('data-translateToEdition'));
			});

			// Bind the X to close the floating bar
			$('.js-onee-bar-close').click(function(e) {
				
				e.preventDefault();
				$('.js-onee-bar').addClass('hidden');

				// Set override cookie on dialog close
				docCookies.setItem('onee_override_bar', 'true', COOKIE_OVERRIDE_BAR_TTL, '/');

			});

			$('.js-onee-bar').removeClass('hidden');

		},

		translateFloatingBar: function(language) {

			// Translate the content of the floating bar

			// Hide visible content
			$('.js-onee-bar-text').addClass('hidden');
			$('.js-onee-bar-btn').addClass('hidden');

			// Show language-appropriate content
			$('.js-onee-bar-text[data-geoEdition=' + language + ']').removeClass('hidden');
			$('.js-onee-bar-btn[data-geoEdition=' + language + ']').removeClass('hidden');

			// Remove the Translate link -- use CSS visibility to prevent bar content jumping
			$('.js-onee-bar-btn-translate').addClass('no-visibility');

		}

	};

})(eolOneE, jQuery);
