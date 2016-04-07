/**
 * GPT helpers functions.
 */

var ami_gpt = (function () {

	var elementInViewport = function (el) {
		var rect = el.getBoundingClientRect();
		return (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight+200 || document.documentElement.clientHeight+200 || rect.height+200))
	}

	var init = function () {
		window.addEventListener('scroll', processElements);
		window.addEventListener('touchstart', processElements);
		window.addEventListener('load', processElements);
	}

	/** @uses googletag.slots **/

	/**
	 * Cheks if googltag.slots is defined and if googletag is defined
	 * in order to use it.
	 *
	 * @returns {boolean}
	 */
	var isReady = function () {
		if (typeof(googletag.slots) === 'undefined') {
			return false;
		}

		return true;
	}

	/**
	 * Refresh all the ads defined in the page.
	 */
	var refreshAll = function () {
		if (!isReady()) {
			return;
		}
		pf.refresh();
	}

	var processElements = function () {
		Object.keys(lazyLoadSlots).forEach(function (key) {
			var el = document.getElementById(key);
			if (elementInViewport(el)) {
				if (typeof(googletag.slots[key]) != "undefined") {
					pf.observe('AUCTION_POST_RUN', function () {
						googletag.cmd.push(function () {
							googletag.display(key);
							console.log(key + ' lazyloaded');
						});
					});
					delete lazyLoadSlots[key];
				}

			}
		});
	}


	return {
		init: init(),
		refreshAll: refreshAll
	}

})();
;/*
 Site Scritps
 */
ui = function ( $ ) {

	return {
		/**
		 * Init all ui functions
		 */
		init : function() {

			var $this = this;
			this.fluidVideos();
		},
		/**
		 * Fluid Video (combined with CSS)
		 */
		fluidVideos : function() {
			var videoSelectors = [
				"iframe[src*='player.vimeo.com']",
				"iframe[src*='youtube.com']",
				"iframe[src*='youtube-nocookie.com']",
				"iframe[src*='kickstarter.com'][src*='video.html']",
				"iframe[src*='screenr.com']",
				"iframe[src*='blip.tv']",
				"iframe[src*='dailymotion.com']",
				"iframe[src*='viddler.com']",
				"iframe[src*='qik.com']",
				"iframe[src*='revision3.com']",
				"iframe[src*='hulu.com']",
				"iframe[src*='funnyordie.com']",
				"iframe[src*='flickr.com']",
				"embed[src*='v.wordpress.com']"
			];

			var allVideos = videoSelectors.join(',');

			$( 'body' ).find( allVideos ).wrap('<span class="fluid-video" />');
		}
	};

}( jQuery );



var ui = ui || {};

(function($){

	ui.init();

	$(document).ready(function(){

		var $body = $('body');

		var $leadB = $('#leaderboard'),
			$leadHolder = $('#leaderboard-holder');
			$leadHolder.height($leadB.height());


			// BEGIN -- CODE FOR RADARIV-50
			if(!$('body').hasClass('page-template-sponsorship-page')) {
				jQuery('div#leaderboard-holder').addClass('sticky_banner');
				jQuery('body.mobile div.post-container div.widget-gpt2-ami-ads').addClass('sticky_banner');
				jQuery('#dfp-tag-mobile_box').parent().removeClass('sticky_banner');
				jQuery('div#sidebar_interior_for_banners div.widget-ami-gpt-ads').addClass('sticky_banner');
				jQuery('div#sidebar_interior_for_banners div.widget-gpt2-ami-ads').addClass('sticky_banner');
				// also add those mobile classes: swoop-container

				// Wordpress top bar when user is logged in pushes everything down by 32px
				var intAdditionalPageHeight = 0;
				if (jQuery('body').hasClass('logged-in') && window.innerWidth > 780) {
					intAdditionalPageHeight = 32;
				}
				if ((jQuery('body').hasClass('archive') || jQuery('body').hasClass('search-results') || jQuery('body').hasClass('search-no-results')) && jQuery('#content-wrapper > header').is('header')) {
					intAdditionalPageHeight += parseInt(jQuery('#content-wrapper > header').outerHeight());
					console.log(intAdditionalPageHeight);
				}

				var strCSS = '<style type=\"text/css\">';
				strCSS += ' #banner1_container{z-index:100}';
				strCSS += ' #leaderboard_wrap{background:white; position:relative; z-index:11}';
				strCSS += ' .mobile #leaderboard_wrap{margin-bottom:10px}';
				strCSS += ' .fixedLeaderA{position:fixed!important; top:' + (40 + intAdditionalPageHeight) + 'px; left:0; padding:10px; width:100%!important; text-align:center; background:transparent; z-index:10001}';
				strCSS += ' .fixedLeaderA DIV#leaderboard{width:' + (parseInt(jQuery('#content-wrapper').css('width').replace(/px$/, ''))) + 'px; background:white; margin:0 auto; padding:20px 0 10px 0}';  // has to have width 940px for desktop
				strCSS += ' @media screen and (max-width: 1024px) {.fixedLeaderA DIV#leaderboard{width:100%}}';
				strCSS += ' BODY.single-format-standard .fixedLeaderA{position:fixed!important; top:' + (40 + intAdditionalPageHeight) + 'px; padding:10px; width:100%!important; text-align:center; background:transparent; z-index:10001}';
				strCSS += ' .mobile .fixedLeaderA{background-color:white!important; padding-bottom:0; width:100%}';
				strCSS += ' .mobile .post-container .fixedLeaderA{padding-bottom:10px}';
				strCSS += ' .fixedSideBar{position:fixed; width:300px}';
				strCSS += ' #sidebar_interior_for_banners{background:white; padding-bottom:500px}';
				strCSS += ' .top-three{background:white}';
				strCSS += ' #sidebar_interior_for_banners .radar-gallery-thumb{z-index:0}';
				strCSS += '</style>';
				jQuery('head').append(strCSS);

				var blnIsMobile = jQuery('body').hasClass('mobile');
				var arStickyTime = [6, 6, 6, 6, 6]; // seconds for sticky banners to always be visible -- first number is for the top leaderboard, second number is for the RHS square 1 etc.
				if (blnIsMobile) arStickyTime = [6, 6, 6, 6, 6];
				var arBnr = jQuery('.sticky_banner'); // the classname of the *CONTAINER* of the banners
				var intLastBnr = arBnr.length - 1 // the last banner's position in the array -- this banner is usually found in the sidebar
				var arStickyClass = ['fixedLeaderA', 'fixedLeaderA', 'fixedLeaderA', 'unused', 'unused']; // the className which when applied makes banner sticky -- currently only used for leaderboard
				var arIsStickyFromNowOn = [true, true, true, true, true]; // true if the element is to be fixed or false otherwise -- is set automatically to false when the timer for each elemnet runs out
				var arIsCurrentlySticky = [false, false, false, false, false]; // true if the element is to be fixed or false otherwise -- is set automatically to false when the timer for each elemnet runs out
				var arTimeStarted = [false, false, false, false, false]; // whether the timeout has been set for the specific element
				var arTimeExpired = [false, false, false, false, false]; // whether the timeout for an element has expired
				var arInSidebar = [false, false, false, false, false]; // whether an element belongs to the sidebar or not
				var arBnrPosY = []; // the current initial position of the banners
				var blnInSidebar = function (intElmIdx) {
					if (blnIsMobile) return false;
					try {
						return !(arBnr[intElmIdx].attr('id') == 'leaderboard-holder'); // catch this possible error for adblockers
					} catch (err) {
						console.log(err);
					}
				};
				jQuery.each(arBnr, function (index, value) {
					arBnr[index] = jQuery([arBnr[index]]);  // getting the chance to jQuerify the objects here
					arBnrPosY[index] = parseInt(arBnr[index].offset().top); // inaccurate initial calculation -- needs to be recalculated when sticking a banner
					arInSidebar[index] = blnInSidebar(index); // calculate here whether a banner is in the sidebar or not by using the above function
				});
				var recalculatePosY = function () {
					// this function is to be called in a sneaky fashion ie. on banner unstick or stick, so we get more accurate positions of banners

					if (blnIsMobile) {
						jQuery.each(arBnr, function (index, value) {
							arBnrPosY[index] = parseInt(arBnr[index].offset().top);
						});
					} else {
						intLastBannerHeight = arBnr[intLastBnr].height(); // calculated here but used in blnIsVisible()
						if (arInSidebar[intLastBnr]) {
							arBnrPosY[intLastBnr] = objSidebar.height() + jQuery('.top-three').height() + jQuery('#leaderboard_wrap').height() - arBnr[intLastBnr].height() + 50;
						}
						// Now that we know where the last banner is, we can easily locate the middle banner of the sidebar
						var intScrollOffset = parseInt(arBnr[intLastBnr].offset().top) - arBnrPosY[intLastBnr];
						if (arInSidebar[intGetFirstSidebarBanner()] && arInSidebar[intGetFirstSidebarBanner() + 1]) {
							arBnrPosY[intGetFirstSidebarBanner() + 1] = parseInt(arBnr[intGetFirstSidebarBanner() + 1].offset().top) - intScrollOffset;
							if(intLastBnr == 4 && intGetFirstSidebarBanner() == 1){ // for when the homepage has 4 sidebar banners
								arBnrPosY[intGetFirstSidebarBanner() + 2] = parseInt(arBnr[intGetFirstSidebarBanner() + 2].offset().top) - intScrollOffset;
							} 
							// Finally the first sidebar banner:
							arBnrPosY[intGetFirstSidebarBanner()] = parseInt(arBnr[intGetFirstSidebarBanner()].offset().top) - intScrollOffset;
						}
					}
				};
				var intScrollTop = jQuery(window).scrollTop(); // current vertical position of user's viewport (careful: this won't always be 0 here if the user refreshes while having scrolled down to the middle of the page)
				var intWindowHeight = jQuery(window).height(); // the height of our viewport -- careful: won't be updated on window resize
				var blnLastBannerIsFrozen = false;  // is set to true when the last banner of the sidebar is frozen and thus make it stick permanently
				var objSidebar = jQuery('#sidebar_interior_for_banners'); // install this on the site's html
				var intSidebarBoundaryTop, intSidebarBoundaryBottom; // the limits of scrolling of sidebar
				var intExtraHeightAddedByStuckLeaderboard = 0; // when a leaderboard is sticky this has a positive value and it pushes the sidebar lower while the leaderboard remains stuck
				var intExtraHeightAddedByStuckLeaderboardBuffer = 0; // when a leaderboard is sticky this has a positive value and it pushes the sidebar lower while the leaderboard remains stuck
				var blnIsHomepage = jQuery('body.home').is('body'); // whether we are on the homepage or not
				var blnIsGalleryPage = jQuery('body').hasClass('single-format-gallery-false'); // whether we are viewing a gallery page or not
				var blnIsArticlePage = jQuery('body').hasClass('single-format-standard'); // whether we are viewing an article page or not
				var intLastBannerHeight = 0; // the height of last banner, declared here but used in blnIsVisible() and intGetElementOffset() -- it's calculated elsewhere for better performance
				var fixMiddleColumnHeight = function () {
					// Necessary fix for when the central column is shorter than the sidebar
					if (blnIsMobile || blnIsHomepage) return false;
					var objMiddleColumn = jQuery('body.single div.posts div div.post');
					if (!objMiddleColumn.is('div')) objMiddleColumn = jQuery('body.single-format-gallery div.post');
					if (!objMiddleColumn.is('div')) objMiddleColumn = jQuery('body.single-post div.post-container');
					if (objMiddleColumn.is('div')) {
						var intMiddleHeight = objMiddleColumn.height();
						var intSidebarHeight = jQuery('#sidebar_interior_for_banners').height();
						if (intMiddleHeight < intSidebarHeight + 300) objMiddleColumn.css('padding-bottom', intSidebarHeight - intMiddleHeight + 300);
					}
				}
				var blnIsVisible = function (intObjectVerticalPosition, intPageTop, index) {
					var arExtraOffset = [65, 20 + intExtraHeightAddedByStuckLeaderboard, 200 + intExtraHeightAddedByStuckLeaderboard, (2 * intLastBannerHeight) + 110];
					if (arBnr.length == 5){
						arExtraOffset = [65, 20 + intExtraHeightAddedByStuckLeaderboard, 200 + intExtraHeightAddedByStuckLeaderboard, 200 + intExtraHeightAddedByStuckLeaderboard, (2 * intLastBannerHeight) + 110];
					}
					if (blnIsMobile) arExtraOffset = [120, 120, 120, undefined]; // leaderboards on mobile are hanging a bit lower
					return (intObjectVerticalPosition - arExtraOffset[index] > intPageTop);
				};
				var blnContainsAd = function (intElmIdx) {
					if (intElmIdx == intLastBnr && !blnIsMobile) return true; // we don't care if the last banner div contains an ad or not
					return (arBnr[intElmIdx].find('iframe').is('iframe') || arBnr[intElmIdx].find('img').is('img'));
				}
				var hasAboveFooterBanner = function(){return jQuery('div#above_footer_section').is('div') && jQuery('div#above_footer_section').height() > 0};
				var intFooterBannerHeight = 0;
				var repairLeaderboardHeight = function (intBannerHeight, blnApplyCorrections) {
					if (blnApplyCorrections) {
						intHeightCorrection = intAdditionalPageHeight;
					} else {
						intHeightCorrection = 0;
					}
					var intToSubtract = 0;
					if (blnApplyCorrections && blnIsHomepage) {
						intToSubtract = 30;
					}
					jQuery('#leaderboard_wrap').css('height', (intBannerHeight + intHeightCorrection - intToSubtract) + 'px');
				}
				var intGetFirstSidebarBanner = function () {
					if (arInSidebar[0]) return 0; else return 1;
				}; // this could cause an error on mobile, I should consider returning -1 if there's no sidebar at all.
				var intGetElementOffset = function (intElmIdx) {
					if (blnIsMobile) return false; // this function is sidebar-specific and isn't needed for mobile
					var intExtraOffset = 0;
					var intBannerHeight = 0;
					var intExtraPushTowardsBottomForLastBanner = -20;
					if (intElmIdx == intGetFirstSidebarBanner()) { // 1st sidebar elm
						intBannerHeight = arBnr[intElmIdx].height();
						if (blnIsHomepage) intExtraOffset -= intBannerHeight + intExtraHeightAddedByStuckLeaderboard + 81; // homepage top sidebar banner -- pushing first sidebar elm a bit more to the top to fill gap
						else { // non-homepage top sidebar banner
							if (blnIsGalleryPage) {
								intExtraOffset -= intBannerHeight + intExtraHeightAddedByStuckLeaderboard + 85 + intAdditionalPageHeight;
							} else {
								intExtraOffset -= intBannerHeight + intExtraHeightAddedByStuckLeaderboard + 50 + intAdditionalPageHeight;
							}
						}
					} else if ((intElmIdx == (intGetFirstSidebarBanner() + 1) || intElmIdx == (intGetFirstSidebarBanner() + 2)) && intElmIdx != intLastBnr) { // 2nd or additional middle sidebar elm
						intBannerHeight = arBnr[intElmIdx].height();
						intExtraOffset -= 2 * intBannerHeight - 68 + intExtraHeightAddedByStuckLeaderboard + intAdditionalPageHeight; // pushing second sidebar elm a bit to the top
						if (!blnIsHomepage) {
							if (blnIsGalleryPage) intExtraOffset += 20;
						}
					} else if (intElmIdx == intLastBnr) {
						intBannerHeight = intLastBannerHeight; // when we reach here this is method is called very frequently so we don't want to recalculate the height of the last element again and again at this point.
						if (blnIsHomepage) intExtraPushTowardsBottomForLastBanner = 40;
						else if (blnIsGalleryPage) intExtraPushTowardsBottomForLastBanner = 0;
						intExtraOffset = -intWindowHeight - intExtraPushTowardsBottomForLastBanner; // placing last sidebar banner to bottom of viewport with a minimum margin of 50px (or more)
					}
					return arBnrPosY[intElmIdx] + intBannerHeight + intExtraOffset;
				}
				var stick = function (intElmIdx) {
					if (!arIsStickyFromNowOn[intElmIdx] || arIsCurrentlySticky[intElmIdx]) return false;
					recalculatePosY();
					if ((intElmIdx > 1 && arInSidebar[intElmIdx]) || (intElmIdx > 0 && blnIsMobile)) { // check if element is in sidebar for desktop or of the element is not the first leaderboard for mobile
						// this is the second or third element of the sidebar -- if the timeout of the previous element hasn't expired, do nothing
						if (!arTimeExpired[intElmIdx - 1] && blnContainsAd(intElmIdx - 1)) return false;
					}
					// setting the timeout:
					if (!arTimeStarted[intElmIdx] && arIsStickyFromNowOn[intElmIdx] && (blnIsMobile || intElmIdx < intLastBnr) || !arTimeStarted[intElmIdx] && arIsStickyFromNowOn[intElmIdx] && intLastBnr == 0) {
						arTimeStarted[intElmIdx] = true;
						setTimeout(function () {
							unstick(intElmIdx, true);
						}, arStickyTime[intElmIdx] * 1000);
					} else if (!arTimeStarted[intElmIdx] && intElmIdx == intLastBnr) {
						blnLastBannerIsFrozen = true;
					}
					// calculate ad container height here, because it may have changed since the page ready event
					var intBannerHeight = arBnr[intElmIdx].height();
					var intOffsetToMove = 100;
					if (!arInSidebar[intElmIdx]) {
						if (intElmIdx == 0) repairLeaderboardHeight(intBannerHeight, false);
						arBnr[intElmIdx].css('width', jQuery('#leaderboard_wrap').width() + 'px');
						intExtraHeightAddedByStuckLeaderboard = intBannerHeight + 40;
						intExtraHeightAddedByStuckLeaderboardBuffer = intBannerHeight + 40;
						arBnr[intElmIdx].addClass(arStickyClass[intElmIdx]);
					} else {
						objSidebar.addClass('fixedSideBar');
						intOffsetToMove = intGetElementOffset(intElmIdx);
						objSidebar.css('margin-top', '-' + intOffsetToMove + 'px');
						if (!(intSidebarBoundaryTop < 0) && intElmIdx == 1 && !arInSidebar[0] || intElmIdx == 0 && arInSidebar[0]) {
							intSidebarBoundaryTop = -intOffsetToMove;
						}
						if (!(intSidebarBoundaryBottom < 0) || (-arBnr[intElmIdx].offset().top - arBnr[intElmIdx].height() - 100 > intSidebarBoundaryBottom)) {
							intSidebarBoundaryBottom = -intOffsetToMove;
						}
					}
					arIsCurrentlySticky[intElmIdx] = true;
				};
				var unstick = function (intElmIdx, blnCalledFromTimeout) {
					// console.log('calling unstick with parameters ' + intElmIdx + ', ' + blnCalledFromTimeout);
					recalculatePosY(); // fix last banner bug
					if(hasAboveFooterBanner() && jQuery('#above_footer_section').height() > 0){
						intFooterBannerHeight = jQuery('#above_footer_section').height() + 15;
					}
					if (!blnCalledFromTimeout) {
						if (!arInSidebar[intElmIdx]) {
							if (intElmIdx == 0) {
								var intBannerHeight = arBnr[intElmIdx].height();
								repairLeaderboardHeight(intBannerHeight, true);
							}
							arBnr[intElmIdx].removeClass(arStickyClass[intElmIdx]);
						} else {
							// Set a new bottom boundary
							if (intElmIdx != intLastBnr) {
								intSidebarBoundaryBottom = -intGetElementOffset(intElmIdx + 1);
							}
						}
						if (arTimeExpired[intElmIdx]) {
							arIsStickyFromNowOn[intElmIdx] = false;
						}
						arIsCurrentlySticky[intElmIdx] = false;
					} else {
						// called from timeout -- soft unstick ie. do not actually unstick but mark to be unstuck on next scroll
						arTimeStarted[intElmIdx] = false;
						arIsStickyFromNowOn[intElmIdx] = false;
						arTimeExpired[intElmIdx] = true;
						if (arInSidebar[intElmIdx]) {
							// hacky sticking on unstick -- immediately stick the next element of sidebar right here:
							if (intElmIdx + 1 == intGetFirstSidebarBanner() + 1) {
								fixMiddleColumnHeight(); // while locking the 2nd element of sidebar, make sure gallery and article pages with short middle columns look right
							}
							if (!arTimeStarted[intElmIdx + 1] && intElmIdx + 1 < intLastBnr) setTimeout(function () {
								unstick(intElmIdx + 1, true);
								arTimeStarted[intElmIdx + 1] = true;
							}, arStickyTime[intElmIdx + 1] * 1000);
							else if (!arTimeStarted[intElmIdx + 1] && intElmIdx + 1 == intLastBnr) {
								blnLastBannerIsFrozen = true;
							}
							if (!(intSidebarBoundaryBottom < 0) || (-arBnr[intElmIdx + 1].offset().top - arBnr[intElmIdx + 1].height() - 100 > intSidebarBoundaryBottom)) {
								intSidebarBoundaryBottom = -intOffsetToMove;
							}
							var intOffsetToMove = intGetElementOffset(intElmIdx + 1);
							arIsCurrentlySticky[intElmIdx + 1] = true;
							if (!(intSidebarBoundaryBottom < 0) || (-arBnr[intElmIdx + 1].offset().top - arBnr[intElmIdx + 1].height() - 100 != intSidebarBoundaryBottom)) {
								intSidebarBoundaryBottom = -intOffsetToMove;
							}
							// end of hacky sticking on unstick
						} else {
							// Reaching here, we have just unstuck the leaderboard. We will now revert the sidebar to its original margin-top by subtracting the extra offset added because of the leaderboard
							intSidebarBoundaryTop -= intExtraHeightAddedByStuckLeaderboard - 100;
							intExtraHeightAddedByStuckLeaderboard = 0;
						}
					}
				};

				var stickBannersOnScroll = function () {
					var intCurrentScrollTop = jQuery(window).scrollTop();
					if (intScrollTop < intCurrentScrollTop) var blnScrollDown = true; else var blnScrollDown = false; // check whether we are scrolling up or down
					intScrollDiff = intScrollTop - intCurrentScrollTop;
					jQuery.each(arBnr, function (index, value) {
						if (arIsCurrentlySticky[index] && arTimeExpired[index] && !arIsStickyFromNowOn[index]) unstick(index, false); // unstick any "soft unstuck" banners (see function unstick)
						if (!blnIsVisible(arBnr[index].offset().top, intCurrentScrollTop, index) && blnScrollDown) {
							if (!arIsCurrentlySticky[index] && arIsStickyFromNowOn[index] && blnContainsAd(index)) {
								// console.log('calling stick() for ' + index);
								stick(index);
							}
						} else if ((index == 0 || blnIsMobile) && !arInSidebar[index] && !blnScrollDown && arIsCurrentlySticky[index] && blnIsVisible(arBnrPosY[index], jQuery(window).scrollTop(), index)) { // leaderboard to unstick on scroll up
							// this needs to be edited for mobile (index won't always be 0, page may have many leaderboards)
							unstick(index, false);
						}
					});

					intScrollTop = intCurrentScrollTop; // this is important to remain RIGHT here and nowhere else

					if (!blnIsMobile) {
						// correct bottom limit if last banner has frozen
						if (blnLastBannerIsFrozen && intSidebarBoundaryBottom != -intGetElementOffset(intLastBnr)) {
							intSidebarBoundaryBottom = -intGetElementOffset(intLastBnr);
							// console.log('bottom ad corrected at: ' + arBnrPosY[intLastBnr]);
							// console.log('set intSidebarBoundaryBottom= ' + intSidebarBoundaryBottom);
						}
						// moving sidebar behavior
						var intCurrentMarginTop = parseInt(objSidebar.css('margin-top'));
						if (!arIsCurrentlySticky[intGetFirstSidebarBanner()]) {
							// console.log('intCurrentMarginTop:' + intCurrentMarginTop + ', LIMITS: top:' + intSidebarBoundaryTop + ', bottom:' + intSidebarBoundaryBottom + ', intExtraHeightAddedByStuckLeaderboardBuffer:' + intExtraHeightAddedByStuckLeaderboardBuffer);
							if (
									intCurrentMarginTop + intScrollDiff - intExtraHeightAddedByStuckLeaderboardBuffer < intSidebarBoundaryTop 
								&&  (
									  !blnLastBannerIsFrozen && intCurrentMarginTop + intScrollDiff > intSidebarBoundaryBottom - 100
									|| blnLastBannerIsFrozen && intCurrentMarginTop + intScrollDiff > intSidebarBoundaryBottom - intFooterBannerHeight - 100
									)
							) {
								// Careful: If a tall leaderboard has increased the height, we need to make sure we revert gradually on user scroll and that's why the intExtraHeightAddedByStuckLeaderboardBuffer is used here:
								if (intExtraHeightAddedByStuckLeaderboardBuffer > 0 && intScrollDiff < 0) intExtraHeightAddedByStuckLeaderboardBuffer += intScrollDiff;
								else intExtraHeightAddedByStuckLeaderboardBuffer = 0;
								objSidebar.css('margin-top', (intCurrentMarginTop + intScrollDiff) + 'px');
							}
						}
						// Revert sidebar to "position:relative" when scrolling past the top boundary
						if ((intScrollTop == 0) || (intScrollTop <= -intSidebarBoundaryTop && objSidebar.css('position') == 'fixed')) {
							// console.log('Bounds exceeded -- reinforcing');
							recalculatePosY(); // increase precision (Note: this also has to be in the following else if)
							objSidebar.css('position', 'relative').css('margin-top', '0');
						} else if (intScrollTop > -intSidebarBoundaryTop && objSidebar.css('position') == 'relative') {
							// console.log('refixating side bar');
							recalculatePosY(); // increase precision
							objSidebar.css('position', 'fixed');
							objSidebar.css('margin-top', intSidebarBoundaryTop + 'px');
						} else if (blnLastBannerIsFrozen && (blnIsGalleryPage || blnIsArticlePage) && intScrollTop >= jQuery(document).height() - intWindowHeight - 50) {
							// console.log('bottom reached');
							// console.log((jQuery(document).height() + ',' + intWindowHeight + ',' + arBnr[intLastBnr].height()));
							objSidebar.css('margin-top', '-' + (objSidebar.height() + jQuery('.top-three').height() + jQuery('#leaderboard_wrap').height() + intLastBannerHeight - jQuery(window).height() +intFooterBannerHeight -70) + 'px');
						}
					}
				};

				jQuery(document).on({
					'touchmove': function (e) {
						stickBannersOnScroll();
						stickGigya();
					},
					'scroll': function (e) {
						stickBannersOnScroll();
						stickGigya();
					}
				});
			}

			// END -- CODE FOR RADARIV-50


		$(document).on('ami_ads_refresh', function(){
			setTimeout(function(){
				$leadHolder.height($leadB.height());
			}, 500);
		});

		/* -----------------------------------------------------
		 Preventing Empty Search
		 --------------------------------------------------------*/
		$('.searchform').submit(function(e) { // run the submit function, pin an event to it
			var s = $( this ).find(".search-term"); // find the #s, which is the search input id
			if (!s.val()) { // if s has no value, proceed
				e.preventDefault(); // prevent the default submission
			}
		});

		/* -----------------------------------------------------
		 Hover and click functions for header button overlays
		 -------------------------------------------------------- */

		//Handle iPad virtual keyboard
		// var $mainHeader = $('#main-header'),
		// 	iPad = ( navigator.userAgent.match(/(iPad)/g) ? true : false );

		// window.iPadAdjustHeader = function() {
		// 	$mainHeader.css('cssText', 'top: ' + $body.scrollTop() + 'px !important');
		// 	$body.addClass("ios-keyboard-visible");
		// };

		// if(iPad) $(document)
		// .on('focus', 'input, textarea', function(e) {
		// 	setTimeout('iPadAdjustHeader()', 50);
		// })
		// .on('blur', 'input, textarea', function(e) {
		// 	$body.removeClass("ios-keyboard-visible");
		// 	$mainHeader.css('cssText', '');
		// });

		try{
			$(document).on('ami_ads_refresh', ami_gpt.refreshAll);
		} catch(err){
			console.log(err.message);
		}

		var page = 1;
		var strMainUrl = window.location.pathname.split('/');
		if(strMainUrl.indexOf('page') > 0) {
			var page = strMainUrl[strMainUrl.indexOf('page')+1];
		}
		var $infLoad = true;
		$(window).scroll( function() {
			var scrollHeight = $(document).height();
			var scrollPosition = $(window).height() + $(window).scrollTop();
			var body = $('body');
			if ( (scrollHeight - scrollPosition) / scrollHeight === 0) {
				page++;

				if ((body.hasClass('home') || body.hasClass('archive')) && $infLoad) {
					var targetUrl = window.location.origin + window.location.pathname  + 'page/' + page + '/' + window.location.search;
					$.get(targetUrl, function(data) {
						dataLayer.push({'event':'pageView'});
						if ( body.hasClass('home') ) {
							$("#content-columns").append($(data).find('article.postInLine'));
						} else {
							$('div.list-item').append($(data).find('article.post'));
						}
					}).fail(function() {
						$infLoad = false;
					});
				}

			}
		});

		$('#ami-post-content').find('p:empty').each(function(){
			$(this).hide();
		});

	});

	function stickGigya() {
		if(window.innerWidth < 1024 || (!$('body').hasClass('single-format-video') && !$('body').hasClass('single-format-standard') && !$('body').hasClass('single-product-page'))) {
			return;
		}
		var gg = $('#gigya-wrap'),
			ggLeft = gg.offset().left,
			sTop = $(window).scrollTop(),
			scrollT = $('#article-top-part').offset().top - 60,
			ggHeight = gg.height(),
			scrollB = $('#article-top-part').height() - ggHeight,
			leaderboardH = $('#leaderboard-holder').height();


		if($('#leaderboard-holder').hasClass('fixedLeaderA')) {
			if (sTop >= scrollT-leaderboardH && sTop < scrollB) {
				gg.css({position:"fixed", top: leaderboardH + 70 +"px", left: ggLeft+'px'});
			} else if (sTop >= scrollB - leaderboardH) {
				gg.css({position:"absolute", top:  (scrollB)+"px", left: '0px'});
			} else {
				gg.css({position:"absolute", top:  "0px", left: '0px'});
			}
		} else {
			if (sTop >= scrollT && sTop < scrollB+leaderboardH+20) {
				gg.css({position:"fixed", top: "70px", left: ggLeft+'px'});
			} else if (sTop >= scrollB+leaderboardH+20) {
				gg.css({position:"absolute", top:  scrollB+"px", left: '0px'});
			} else {
				gg.css({position:"absolute", top:  "10px", left: '0px'});
			}
		}
	}

	$('#gigya-wrap-int section').live('click', function(){
		$('.Facebook.gigya-button').trigger('click');
	});

	var keys = {37: 1, 38: 1, 39: 1, 40: 1};

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}

	function disableScroll() {
		if (window.addEventListener) // older FF
			window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;
	}

	function enableScroll() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null;
		window.onwheel = null;
		window.ontouchmove = null;
		document.onkeydown = null;
	}

	//Header update
	$(document).ready(function(){
		//Load sub menu
		$('#nav-pane ul > li.has-tags').each(function () {
			var elem = $('.tag-rollover', this);
			var link = $(this);
			var menupostitems = $('a', this).data('postitems');
			var menutag = $('a', this).data('tagitem');

			if ((menutag || menupostitems) && window.innerWidth > 1023) {
				var data = {'action': 'output_tagitems', 'tagname': menutag, 'postitems': menupostitems}
				$.ajax({
					url: ajaxurl,
					type: "GET",
					data: data,
					success: function (response) {
						if (response) {
							$(elem).append(response);
							$(link).addClass('loaded')
						}
					}
				});
			}
		});

		//Open side nav
		$('#menu-trigger').click(function(){
			if($('#email_tips').hasClass('visible') || $('.search-modal').hasClass('open')) {
				return false;
			}
			if($(this).hasClass('open')) {
				$('#darkness').fadeOut();

				enableScroll();
			} else {
				$('#darkness').fadeIn();
				if(window.innerWidth > 768){
					disableScroll();
				}
			}
			$(this).toggleClass('open');
			$('body').toggleClass('clip');
			$('#side-menu').toggleClass('menu-open');
		});

		//Side nav scrolling
		$('#side-menu').bind('mousewheel DOMMouseScroll', function(e) {
			var scrollTo = null;

			if (e.type == 'mousewheel') {
				scrollTo = (e.originalEvent.wheelDelta * -1);
			}
			else if (e.type == 'DOMMouseScroll') {
				scrollTo = 40 * e.originalEvent.detail;
			}
			if (scrollTo) {
				e.preventDefault();
				$(this).scrollTop(scrollTo + $(this).scrollTop());
			}
		});


		//show overlay
		if(window.innerWidth > 1024){
			$('#nav-pane ul > li.has-tags').hover(function () {
				if($('body').hasClass('clip')){
					$(this).addClass('do-not-show');
				} else {
					$('#darkness').fadeIn('fast');
				}
			}, function () {
				if($('body').hasClass('clip')){
					$(this).removeClass('do-not-show');
				} else {
					$('#darkness').hide();
				}
			});
		}

		//search popup
		$('.search-modal').click(function(){
			if($('#side-menu').hasClass('menu-open') || $('#email_tips').hasClass('visible')) {
				return false;
			}
			if($(this).hasClass('open')){
				$('#lightness').fadeOut();
				enableScroll();
			} else {
				$('#lightness').fadeIn();
				disableScroll();
				$('.search-term').focus();
			}
			$(this).toggleClass('open');
			$('.search-popup').toggleClass('visible');
			$('body').toggleClass('clip');

			return false;
		});

		$('.close-search').click(function(){
			$('.search-modal').toggleClass('open');
			$('.search-popup').toggleClass('visible');
			$('body').toggleClass('clip');
			$('#lightness').fadeOut();
			enableScroll();
		});

		$('form#email_us_tip div.sender-msg textarea').on('blur', function(){
			if($(this).val().length != 0) {
				$('form#email_us_tip div.sender-msg textarea').addClass('typed');
			} else {
				$('form#email_us_tip div.sender-msg textarea').removeClass('typed');
			}
		});

		var blnFeedbackWasSuccessfullySent = false;
		var strFeedbackFormHtml = $('#email_us_tip').html();
		$('#email_us_tip').find("input[type=text], input[type=email], textarea").val('');

		function hideForm(elem) {
			if(blnFeedbackWasSuccessfullySent){
				$('#email_us_tip').html(strFeedbackFormHtml);
				$('#email_us_tip').find("input[type=text], input[type=email], textarea").val('');
				blnFeedbackWasSuccessfullySent = false;
				$('.sender-msg textarea').removeClass('typed');
			}
			elem.toggleClass('active');
			$('#email_tips').toggleClass('visible');
			$('body').toggleClass('clip');
			$('#darkness').fadeOut();
			enableScroll();
		}

		function showForm(elem) {
			$('#darkness').fadeIn();
			elem.toggleClass('active');
			$('body').toggleClass('clip');
			$('#email_tips').toggleClass('visible');
			// prepare the form on every show
			$('.check-container input').prop('checked', true);
			if($('form#email_us_tip div.sender-msg textarea').val().length > 0) $('form#email_us_tip div.sender-msg textarea').addClass('typed');
			$('.field-container input[name="name"]').focus();
			disableScroll();
		}

		function clickForm(elem) {
			if($('#side-menu').hasClass('menu-open') || $('.search-modal').hasClass('open')) {
				return false;
			}
			if(elem.hasClass('active')){
				// restore the form before closing if already successfully submitted:
				hideForm(elem)
			} else {
				showForm(elem);
			}
		}

		$('.desktop-tips').click(function() {
			clickForm($(this));
			return false;
		});

		$('.mobile-tips').click(function() {
			clickForm($(this));
			return false;
		});

		/* -----------------------------------------------------
		 Close buttons function
		 --------------------------------------------------------*/
		$('#email_tips .close').click(function() {
			hideForm($('.tips.active'));
		});

		/* -----------------------------------------------------
		 Email tip form
		 --------------------------------------------------------*/
		$('#email_us_tip').submit(function() {
			var data = $(this).serialize();

			if($('#subscribe_daily_juice').is(":checked")){

				var subscriber = $('#email_us_tip input[name="email"]').val();
				$('form#sailthru-add-subscriber-form-checkbox #sailthru_email').val(subscriber);
				$('form#sailthru-add-subscriber-form-checkbox').trigger('submit');
			}

			$.ajax({
				url: ajaxurl,
				data: data,
				success: function(respond){
					$('#email_us_tip').html(respond);
					blnFeedbackWasSuccessfullySent = true;
				}
			});
			return false;
		});



		$('#darkness').click(function(){
			if($('#menu-trigger').hasClass('open')) {
				$('#menu-trigger').toggleClass('open');
				$('#side-menu').toggleClass('menu-open');
				$('body').toggleClass('clip');
			}
			if($('.desktop-tips').hasClass('active') || $('.mobile-tips').hasClass('active')) {
				hideForm($('.tips.active'));
			}
			$('#darkness').fadeOut();
			enableScroll();
		});

		$('#lightness').click(function(){
			$('.search-modal').toggleClass('open');
			$('.search-popup').toggleClass('visible');
			$('body').toggleClass('clip');
			$('#lightness').fadeOut();
			enableScroll();
		});



		if((window.innerWidth < 768 || $('body').hasClass('mobile')) && $('#dfp-tag-mobile_box').parent().is('div')) {
			var scrolling_ad = $('#dfp-tag-mobile_box').parent();
			if (typeof(scrolling_ad) !== 'undefined') {
				scrolling_ad.detach();
				if($('body').hasClass('single')) {
					if($('.entry p').length > 3) {
						var pCount = $('.entry p').length;
						if(pCount >= 4) {
							$('.entry p:eq(' + (pCount-3) + ')').after(scrolling_ad);
						}
					} else {
						$('.entry').append(scrolling_ad);
					}
				} else if($('body').hasClass('home')) {
					$('#content-columns > article:eq(6)').after(scrolling_ad);
				} else {
					$('.list-item > article:eq(9)').after(scrolling_ad);
				}

			}
		}

		//Search string update on submit
		$('.searchform').submit(function(){
			$('input[name="search"]').val($('input[name="search"]').val().toLowerCase());
		});
	});

})(jQuery);
;/** Abstract base class for collection plugins v1.0.1.
	Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
	Licensed under the MIT (http://keith-wood.name/licence.html) license. */
(function(){var j=false;window.JQClass=function(){};JQClass.classes={};JQClass.extend=function extender(f){var g=this.prototype;j=true;var h=new this();j=false;for(var i in f){h[i]=typeof f[i]=='function'&&typeof g[i]=='function'?(function(d,e){return function(){var b=this._super;this._super=function(a){return g[d].apply(this,a||[])};var c=e.apply(this,arguments);this._super=b;return c}})(i,f[i]):f[i]}function JQClass(){if(!j&&this._init){this._init.apply(this,arguments)}}JQClass.prototype=h;JQClass.prototype.constructor=JQClass;JQClass.extend=extender;return JQClass}})();(function($){JQClass.classes.JQPlugin=JQClass.extend({name:'plugin',defaultOptions:{},regionalOptions:{},_getters:[],_getMarker:function(){return'is-'+this.name},_init:function(){$.extend(this.defaultOptions,(this.regionalOptions&&this.regionalOptions[''])||{});var c=camelCase(this.name);$[c]=this;$.fn[c]=function(a){var b=Array.prototype.slice.call(arguments,1);if($[c]._isNotChained(a,b)){return $[c][a].apply($[c],[this[0]].concat(b))}return this.each(function(){if(typeof a==='string'){if(a[0]==='_'||!$[c][a]){throw'Unknown method: '+a;}$[c][a].apply($[c],[this].concat(b))}else{$[c]._attach(this,a)}})}},setDefaults:function(a){$.extend(this.defaultOptions,a||{})},_isNotChained:function(a,b){if(a==='option'&&(b.length===0||(b.length===1&&typeof b[0]==='string'))){return true}return $.inArray(a,this._getters)>-1},_attach:function(a,b){a=$(a);if(a.hasClass(this._getMarker())){return}a.addClass(this._getMarker());b=$.extend({},this.defaultOptions,this._getMetadata(a),b||{});var c=$.extend({name:this.name,elem:a,options:b},this._instSettings(a,b));a.data(this.name,c);this._postAttach(a,c);this.option(a,b)},_instSettings:function(a,b){return{}},_postAttach:function(a,b){},_getMetadata:function(d){try{var f=d.data(this.name.toLowerCase())||'';f=f.replace(/'/g,'"');f=f.replace(/([a-zA-Z0-9]+):/g,function(a,b,i){var c=f.substring(0,i).match(/"/g);return(!c||c.length%2===0?'"'+b+'":':b+':')});f=$.parseJSON('{'+f+'}');for(var g in f){var h=f[g];if(typeof h==='string'&&h.match(/^new Date\((.*)\)$/)){f[g]=eval(h)}}return f}catch(e){return{}}},_getInst:function(a){return $(a).data(this.name)||{}},option:function(a,b,c){a=$(a);var d=a.data(this.name);if(!b||(typeof b==='string'&&c==null)){var e=(d||{}).options;return(e&&b?e[b]:e)}if(!a.hasClass(this._getMarker())){return}var e=b||{};if(typeof b==='string'){e={};e[b]=c}this._optionsChanged(a,d,e);$.extend(d.options,e)},_optionsChanged:function(a,b,c){},destroy:function(a){a=$(a);if(!a.hasClass(this._getMarker())){return}this._preDestroy(a,this._getInst(a));a.removeData(this.name).removeClass(this._getMarker())},_preDestroy:function(a,b){}});function camelCase(c){return c.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()})}$.JQPlugin={createPlugin:function(a,b){if(typeof a==='object'){b=a;a='JQPlugin'}a=camelCase(a);var c=camelCase(b.name);JQClass.classes[c]=JQClass.classes[a].extend(b);new JQClass.classes[c]()}}})(jQuery);
;/* http://keith-wood.name/countdown.html
   Countdown for jQuery v2.0.2.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */
(function($){var w='countdown';var Y=0;var O=1;var W=2;var D=3;var H=4;var M=5;var S=6;$.JQPlugin.createPlugin({name:w,defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:'dHMS',layout:'',compact:false,padZeroes:false,significant:0,description:'',expiryUrl:'',expiryText:'',alwaysExpire:false,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{'':{labels:['Years','Months','Weeks','Days','Hours','Minutes','Seconds'],labels1:['Year','Month','Week','Day','Hour','Minute','Second'],compactLabels:['y','m','w','d'],whichLabels:null,digits:['0','1','2','3','4','5','6','7','8','9'],timeSeparator:':',isRTL:false}},_getters:['getTimes'],_rtlClass:w+'-rtl',_sectionClass:w+'-section',_amountClass:w+'-amount',_periodClass:w+'-period',_rowClass:w+'-row',_holdingClass:w+'-holding',_showClass:w+'-show',_descrClass:w+'-descr',_timerElems:[],_init:function(){var c=this;this._super();this._serverSyncs=[];var d=(typeof Date.now=='function'?Date.now:function(){return new Date().getTime()});var e=(window.performance&&typeof window.performance.now=='function');function timerCallBack(a){var b=(a<1e12?(e?(performance.now()+performance.timing.navigationStart):d()):a||d());if(b-g>=1000){c._updateElems();g=b}f(timerCallBack)}var f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null;var g=0;if(!f||$.noRequestAnimationFrame){$.noRequestAnimationFrame=null;setInterval(function(){c._updateElems()},980)}else{g=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||d();f(timerCallBack)}},UTCDate:function(a,b,c,e,f,g,h,i){if(typeof b=='object'&&b.constructor==Date){i=b.getMilliseconds();h=b.getSeconds();g=b.getMinutes();f=b.getHours();e=b.getDate();c=b.getMonth();b=b.getFullYear()}var d=new Date();d.setUTCFullYear(b);d.setUTCDate(1);d.setUTCMonth(c||0);d.setUTCDate(e||1);d.setUTCHours(f||0);d.setUTCMinutes((g||0)-(Math.abs(a)<30?a*60:a));d.setUTCSeconds(h||0);d.setUTCMilliseconds(i||0);return d},periodsToSeconds:function(a){return a[0]*31557600+a[1]*2629800+a[2]*604800+a[3]*86400+a[4]*3600+a[5]*60+a[6]},resync:function(){var d=this;$('.'+this._getMarker()).each(function(){var a=$.data(this,d.name);if(a.options.serverSync){var b=null;for(var i=0;i<d._serverSyncs.length;i++){if(d._serverSyncs[i][0]==a.options.serverSync){b=d._serverSyncs[i];break}}if(b[2]==null){var c=($.isFunction(a.options.serverSync)?a.options.serverSync.apply(this,[]):null);b[2]=(c?new Date().getTime()-c.getTime():0)-b[1]}if(a._since){a._since.setMilliseconds(a._since.getMilliseconds()+b[2])}a._until.setMilliseconds(a._until.getMilliseconds()+b[2])}});for(var i=0;i<d._serverSyncs.length;i++){if(d._serverSyncs[i][2]!=null){d._serverSyncs[i][1]+=d._serverSyncs[i][2];delete d._serverSyncs[i][2]}}},_instSettings:function(a,b){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(a){if(!this._hasElem(a)){this._timerElems.push(a)}},_hasElem:function(a){return($.inArray(a,this._timerElems)>-1)},_removeElem:function(b){this._timerElems=$.map(this._timerElems,function(a){return(a==b?null:a)})},_updateElems:function(){for(var i=this._timerElems.length-1;i>=0;i--){this._updateCountdown(this._timerElems[i])}},_optionsChanged:function(a,b,c){if(c.layout){c.layout=c.layout.replace(/&lt;/g,'<').replace(/&gt;/g,'>')}this._resetExtraLabels(b.options,c);var d=(b.options.timezone!=c.timezone);$.extend(b.options,c);this._adjustSettings(a,b,c.until!=null||c.since!=null||d);var e=new Date();if((b._since&&b._since<e)||(b._until&&b._until>e)){this._addElem(a[0])}this._updateCountdown(a,b)},_updateCountdown:function(a,b){a=a.jquery?a:$(a);b=b||this._getInst(a);if(!b){return}a.html(this._generateHTML(b)).toggleClass(this._rtlClass,b.options.isRTL);if($.isFunction(b.options.onTick)){var c=b._hold!='lap'?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date());if(b.options.tickInterval==1||this.periodsToSeconds(c)%b.options.tickInterval==0){b.options.onTick.apply(a[0],[c])}}var d=b._hold!='pause'&&(b._since?b._now.getTime()<b._since.getTime():b._now.getTime()>=b._until.getTime());if(d&&!b._expiring){b._expiring=true;if(this._hasElem(a[0])||b.options.alwaysExpire){this._removeElem(a[0]);if($.isFunction(b.options.onExpiry)){b.options.onExpiry.apply(a[0],[])}if(b.options.expiryText){var e=b.options.layout;b.options.layout=b.options.expiryText;this._updateCountdown(a[0],b);b.options.layout=e}if(b.options.expiryUrl){window.location=b.options.expiryUrl}}b._expiring=false}else if(b._hold=='pause'){this._removeElem(a[0])}},_resetExtraLabels:function(a,b){for(var n in b){if(n.match(/[Ll]abels[02-9]|compactLabels1/)){a[n]=b[n]}}for(var n in a){if(n.match(/[Ll]abels[02-9]|compactLabels1/)&&typeof b[n]==='undefined'){a[n]=null}}},_adjustSettings:function(a,b,c){var d=null;for(var i=0;i<this._serverSyncs.length;i++){if(this._serverSyncs[i][0]==b.options.serverSync){d=this._serverSyncs[i][1];break}}if(d!=null){var e=(b.options.serverSync?d:0);var f=new Date()}else{var g=($.isFunction(b.options.serverSync)?b.options.serverSync.apply(a[0],[]):null);var f=new Date();var e=(g?f.getTime()-g.getTime():0);this._serverSyncs.push([b.options.serverSync,e])}var h=b.options.timezone;h=(h==null?-f.getTimezoneOffset():h);if(c||(!c&&b._until==null&&b._since==null)){b._since=b.options.since;if(b._since!=null){b._since=this.UTCDate(h,this._determineTime(b._since,null));if(b._since&&e){b._since.setMilliseconds(b._since.getMilliseconds()+e)}}b._until=this.UTCDate(h,this._determineTime(b.options.until,f));if(e){b._until.setMilliseconds(b._until.getMilliseconds()+e)}}b._show=this._determineShow(b)},_preDestroy:function(a,b){this._removeElem(a[0]);a.empty()},pause:function(a){this._hold(a,'pause')},lap:function(a){this._hold(a,'lap')},resume:function(a){this._hold(a,null)},toggle:function(a){var b=$.data(a,this.name)||{};this[!b._hold?'pause':'resume'](a)},toggleLap:function(a){var b=$.data(a,this.name)||{};this[!b._hold?'lap':'resume'](a)},_hold:function(a,b){var c=$.data(a,this.name);if(c){if(c._hold=='pause'&&!b){c._periods=c._savePeriods;var d=(c._since?'-':'+');c[c._since?'_since':'_until']=this._determineTime(d+c._periods[0]+'y'+d+c._periods[1]+'o'+d+c._periods[2]+'w'+d+c._periods[3]+'d'+d+c._periods[4]+'h'+d+c._periods[5]+'m'+d+c._periods[6]+'s');this._addElem(a)}c._hold=b;c._savePeriods=(b=='pause'?c._periods:null);$.data(a,this.name,c);this._updateCountdown(a,c)}},getTimes:function(a){var b=$.data(a,this.name);return(!b?null:(b._hold=='pause'?b._savePeriods:(!b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date()))))},_determineTime:function(k,l){var m=this;var n=function(a){var b=new Date();b.setTime(b.getTime()+a*1000);return b};var o=function(a){a=a.toLowerCase();var b=new Date();var c=b.getFullYear();var d=b.getMonth();var e=b.getDate();var f=b.getHours();var g=b.getMinutes();var h=b.getSeconds();var i=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;var j=i.exec(a);while(j){switch(j[2]||'s'){case's':h+=parseInt(j[1],10);break;case'm':g+=parseInt(j[1],10);break;case'h':f+=parseInt(j[1],10);break;case'd':e+=parseInt(j[1],10);break;case'w':e+=parseInt(j[1],10)*7;break;case'o':d+=parseInt(j[1],10);e=Math.min(e,m._getDaysInMonth(c,d));break;case'y':c+=parseInt(j[1],10);e=Math.min(e,m._getDaysInMonth(c,d));break}j=i.exec(a)}return new Date(c,d,e,f,g,h,0)};var p=(k==null?l:(typeof k=='string'?o(k):(typeof k=='number'?n(k):k)));if(p)p.setMilliseconds(0);return p},_getDaysInMonth:function(a,b){return 32-new Date(a,b,32).getDate()},_normalLabels:function(a){return a},_generateHTML:function(c){var d=this;c._periods=(c._hold?c._periods:this._calculatePeriods(c,c._show,c.options.significant,new Date()));var e=false;var f=0;var g=c.options.significant;var h=$.extend({},c._show);for(var i=Y;i<=S;i++){e|=(c._show[i]=='?'&&c._periods[i]>0);h[i]=(c._show[i]=='?'&&!e?null:c._show[i]);f+=(h[i]?1:0);g-=(c._periods[i]>0?1:0)}var j=[false,false,false,false,false,false,false];for(var i=S;i>=Y;i--){if(c._show[i]){if(c._periods[i]){j[i]=true}else{j[i]=g>0;g--}}}var k=(c.options.compact?c.options.compactLabels:c.options.labels);var l=c.options.whichLabels||this._normalLabels;var m=function(a){var b=c.options['compactLabels'+l(c._periods[a])];return(h[a]?d._translateDigits(c,c._periods[a])+(b?b[a]:k[a])+' ':'')};var n=(c.options.padZeroes?2:1);var o=function(a){var b=c.options['labels'+l(c._periods[a])];return((!c.options.significant&&h[a])||(c.options.significant&&j[a])?'<span class="'+d._sectionClass+'">'+'<span class="'+d._amountClass+'">'+d._minDigits(c,c._periods[a],n)+'</span>'+'<span class="'+d._periodClass+'">'+(b?b[a]:k[a])+'</span></span>':'')};return(c.options.layout?this._buildLayout(c,h,c.options.layout,c.options.compact,c.options.significant,j):((c.options.compact?'<span class="'+this._rowClass+' '+this._amountClass+(c._hold?' '+this._holdingClass:'')+'">'+m(Y)+m(O)+m(W)+m(D)+(h[H]?this._minDigits(c,c._periods[H],2):'')+(h[M]?(h[H]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[M],2):'')+(h[S]?(h[H]||h[M]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[S],2):''):'<span class="'+this._rowClass+' '+this._showClass+(c.options.significant||f)+(c._hold?' '+this._holdingClass:'')+'">'+o(Y)+o(O)+o(W)+o(D)+o(H)+o(M)+o(S))+'</span>'+(c.options.description?'<span class="'+this._rowClass+' '+this._descrClass+'">'+c.options.description+'</span>':'')))},_buildLayout:function(c,d,e,f,g,h){var j=c.options[f?'compactLabels':'labels'];var k=c.options.whichLabels||this._normalLabels;var l=function(a){return(c.options[(f?'compactLabels':'labels')+k(c._periods[a])]||j)[a]};var m=function(a,b){return c.options.digits[Math.floor(a/b)%10]};var o={desc:c.options.description,sep:c.options.timeSeparator,yl:l(Y),yn:this._minDigits(c,c._periods[Y],1),ynn:this._minDigits(c,c._periods[Y],2),ynnn:this._minDigits(c,c._periods[Y],3),y1:m(c._periods[Y],1),y10:m(c._periods[Y],10),y100:m(c._periods[Y],100),y1000:m(c._periods[Y],1000),ol:l(O),on:this._minDigits(c,c._periods[O],1),onn:this._minDigits(c,c._periods[O],2),onnn:this._minDigits(c,c._periods[O],3),o1:m(c._periods[O],1),o10:m(c._periods[O],10),o100:m(c._periods[O],100),o1000:m(c._periods[O],1000),wl:l(W),wn:this._minDigits(c,c._periods[W],1),wnn:this._minDigits(c,c._periods[W],2),wnnn:this._minDigits(c,c._periods[W],3),w1:m(c._periods[W],1),w10:m(c._periods[W],10),w100:m(c._periods[W],100),w1000:m(c._periods[W],1000),dl:l(D),dn:this._minDigits(c,c._periods[D],1),dnn:this._minDigits(c,c._periods[D],2),dnnn:this._minDigits(c,c._periods[D],3),d1:m(c._periods[D],1),d10:m(c._periods[D],10),d100:m(c._periods[D],100),d1000:m(c._periods[D],1000),hl:l(H),hn:this._minDigits(c,c._periods[H],1),hnn:this._minDigits(c,c._periods[H],2),hnnn:this._minDigits(c,c._periods[H],3),h1:m(c._periods[H],1),h10:m(c._periods[H],10),h100:m(c._periods[H],100),h1000:m(c._periods[H],1000),ml:l(M),mn:this._minDigits(c,c._periods[M],1),mnn:this._minDigits(c,c._periods[M],2),mnnn:this._minDigits(c,c._periods[M],3),m1:m(c._periods[M],1),m10:m(c._periods[M],10),m100:m(c._periods[M],100),m1000:m(c._periods[M],1000),sl:l(S),sn:this._minDigits(c,c._periods[S],1),snn:this._minDigits(c,c._periods[S],2),snnn:this._minDigits(c,c._periods[S],3),s1:m(c._periods[S],1),s10:m(c._periods[S],10),s100:m(c._periods[S],100),s1000:m(c._periods[S],1000)};var p=e;for(var i=Y;i<=S;i++){var q='yowdhms'.charAt(i);var r=new RegExp('\\{'+q+'<\\}([\\s\\S]*)\\{'+q+'>\\}','g');p=p.replace(r,((!g&&d[i])||(g&&h[i])?'$1':''))}$.each(o,function(n,v){var a=new RegExp('\\{'+n+'\\}','g');p=p.replace(a,v)});return p},_minDigits:function(a,b,c){b=''+b;if(b.length>=c){return this._translateDigits(a,b)}b='0000000000'+b;return this._translateDigits(a,b.substr(b.length-c))},_translateDigits:function(b,c){return(''+c).replace(/[0-9]/g,function(a){return b.options.digits[a]})},_determineShow:function(a){var b=a.options.format;var c=[];c[Y]=(b.match('y')?'?':(b.match('Y')?'!':null));c[O]=(b.match('o')?'?':(b.match('O')?'!':null));c[W]=(b.match('w')?'?':(b.match('W')?'!':null));c[D]=(b.match('d')?'?':(b.match('D')?'!':null));c[H]=(b.match('h')?'?':(b.match('H')?'!':null));c[M]=(b.match('m')?'?':(b.match('M')?'!':null));c[S]=(b.match('s')?'?':(b.match('S')?'!':null));return c},_calculatePeriods:function(c,d,e,f){c._now=f;c._now.setMilliseconds(0);var g=new Date(c._now.getTime());if(c._since){if(f.getTime()<c._since.getTime()){c._now=f=g}else{f=c._since}}else{g.setTime(c._until.getTime());if(f.getTime()>c._until.getTime()){c._now=f=g}}var h=[0,0,0,0,0,0,0];if(d[Y]||d[O]){var i=this._getDaysInMonth(f.getFullYear(),f.getMonth());var j=this._getDaysInMonth(g.getFullYear(),g.getMonth());var k=(g.getDate()==f.getDate()||(g.getDate()>=Math.min(i,j)&&f.getDate()>=Math.min(i,j)));var l=function(a){return(a.getHours()*60+a.getMinutes())*60+a.getSeconds()};var m=Math.max(0,(g.getFullYear()-f.getFullYear())*12+g.getMonth()-f.getMonth()+((g.getDate()<f.getDate()&&!k)||(k&&l(g)<l(f))?-1:0));h[Y]=(d[Y]?Math.floor(m/12):0);h[O]=(d[O]?m-h[Y]*12:0);f=new Date(f.getTime());var n=(f.getDate()==i);var o=this._getDaysInMonth(f.getFullYear()+h[Y],f.getMonth()+h[O]);if(f.getDate()>o){f.setDate(o)}f.setFullYear(f.getFullYear()+h[Y]);f.setMonth(f.getMonth()+h[O]);if(n){f.setDate(o)}}var p=Math.floor((g.getTime()-f.getTime())/1000);var q=function(a,b){h[a]=(d[a]?Math.floor(p/b):0);p-=h[a]*b};q(W,604800);q(D,86400);q(H,3600);q(M,60);q(S,1);if(p>0&&!c._since){var r=[1,12,4.3482,7,24,60,60];var s=S;var t=1;for(var u=S;u>=Y;u--){if(d[u]){if(h[s]>=t){h[s]=0;p=1}if(p>0){h[u]++;p=0;s=u;t=1}}t*=r[u]}}if(e){for(var u=Y;u<=S;u++){if(e&&h[u]){e--}else if(!e){h[u]=0}}}return h}})})(jQuery);