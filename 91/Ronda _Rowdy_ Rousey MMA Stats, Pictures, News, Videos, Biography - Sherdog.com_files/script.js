var nGallery = {

	settings: {
		width: null,								// initial resolution used was 645*480
		height: null,
		preferredRatio: 4/3,						// used if width or height is not specified to determine size of the screenshot area
		scrollSpeed: 500,							// screenshots transition speed
		autoPlayDelay: 5000,						// autplay delay (milliseconds)
		showOverlay: true,							// should we show overlay on focus
		showSidebar: true, 							// should we show sidebar?
		showBottombar: false,						// should we show bottom bar? (itent to be used on mobile site)
		showFullscreen: true,						// should we have fullscreen option?
		minAdRefreshTime: 2000,						// minumum time between 300x250 ad refreshing (milliseconds)
		latestFirst: false,							// should we show the latest image first?
		jsonUrl: '/pictures/json/',					// location of json get gallery script
		debug: true									// enable console outputs
		},
	
	//------------------------ don't modify below this line ------------------------------
	iDefaultSettings: {
		curScreen: false,
		screens: 0,
		screenW: null,
		footerWidth: null,							// footer width (section with thumbs)
		thumbsScreenW: null,
		thumbsPerScreen: null,
		thumbLiWidth: null,
		thumbScreens: null,
		widthDefault: null,																									// Save original values so we can restore them when FS is closed
		heightDefault: null,
		screenWDefault: null,
		thumbsScreenWDefault: null,
		thumbsPerScreenDefault: null,
		thumbLiWidthDefault: null,
		thumbScreensDefault: null,
		curThumbScreen: 0,
		scrollInProgress: false,
		scrollThumbsInProgress: false,
		autoPlayHandle: null,
		autoPlay: false,
		isActive: false,
		isFS: false
		},
	iSettings: [],									// this array will hold variables for every instance
	adsPresent: [],									// ads present
	touchEvents: 'ontouchend' in document,			// is this a touch device?
	screenChangeCounter: 0,							// track slide change so we don't track initial screen load
	lastAdRefreshTime: 0,							// when the ad was refreshed last time?
	lastInstance: 0,								// counting instances
	curActive: null,								// current active instance
	newurl: null,									// with slide parameter
	
	
	gotoScreen: function (instance, pos, animated) {																		// Scroll to screen
		_this = this;
		
		var curGallery = '#nGalleryIn' + instance;
		
		if (this.iSettings[instance].scrollInProgress) { return false; } else { this.iSettings[instance].scrollInProgress = true; }
		if (this.iSettings[instance].autoPlay) {
			clearTimeout(this.iSettings[instance].autoPlayHandle);
			}
		
		var leftMove;
		if (pos == 'next' || (pos == 'auto' && this.iSettings[instance].curScreen+1 < this.iSettings[instance].screens)) {
			if (this.iSettings[instance].curScreen+1 == this.iSettings[instance].screens) { this.iSettings[instance].scrollInProgress = false; return false; }
			this.iSettings[instance].curScreen++;
			leftMove = '-=' + this.iSettings[instance].screenW + 'px';
			} else if (pos == 'auto') {
			this.iSettings[instance].curScreen = 0;
			leftMove = '0px';
			} else if (pos == 'prev') {
			if (this.iSettings[instance].curScreen==0) { this.iSettings[instance].scrollInProgress = false; return false; }
			this.iSettings[instance].curScreen--;
			leftMove = '+=' + this.iSettings[instance].screenW + 'px';
			} else {
			if (pos === this.iSettings[instance].curScreen || pos >= this.iSettings[instance].screens) { this.iSettings[instance].scrollInProgress = false; return false; }
			var diff = this.iSettings[instance].curScreen - pos;
			if (diff<0) { leftMove = '-='; } else { leftMove = '+='; }
			leftMove += Math.abs(diff * this.iSettings[instance].screenW) + 'px';
			this.iSettings[instance].curScreen = pos;
			}
			
		if (this.iSettings[instance].curScreen==0) { $(curGallery + ' .prevImg, ' + curGallery + ' .prevImgBig').addClass('disabled'); } else { $(curGallery + ' .prevImg, ' + curGallery + ' .prevImgBig').removeClass('disabled'); }
		if (this.iSettings[instance].curScreen+1 == this.iSettings[instance].screens) { $(curGallery + ' .nextImg, ' + curGallery + ' .nextImgBig').addClass('disabled'); } else { $(curGallery + ' .nextImg, ' + curGallery + ' .nextImgBig').removeClass('disabled'); }
		$(curGallery + ' .navigation span').html((this.iSettings[instance].curScreen+1) + ' out of ' + this.iSettings[instance].screens);
		this.setActiveThumb(instance, this.iSettings[instance].curScreen, animated);
		this.setNewUrl(instance, this.iSettings[instance].curScreen);
		this.lazyLoad(instance, this.iSettings[instance].curScreen, true);
		
		var actualScrollSpeed = animated ? this.settings.scrollSpeed : 1;
		$(curGallery + ' .openHRImage').hide();
		$(curGallery + ' .screensWrapper ul').fadeTo(actualScrollSpeed/2, 0.4, function() {
			$(this).fadeTo(actualScrollSpeed/2, 1).dequeue();
			}).dequeue();
		$(curGallery + ' .screensWrapper ul').animate({left: leftMove }, actualScrollSpeed, function() {
			_this.iSettings[instance].scrollInProgress = false;
			$(curGallery + ' .openHRImage').show();
			if (_this.iSettings[instance].autoPlay) {
				_this.iSettings[instance].autoPlayHandle = setTimeout(function(){_this.gotoScreen(instance, 'auto', true)}, _this.settings.autoPlayDelay);
				}
			_this.reloadAds();
			});
			
		return false;
		},
	
	
	
	gotoThumbScreen: function (instance, pos, animated) {																				// Scrolling thumb area
	
		var curGallery = '#nGalleryIn' + instance;
	
		if (this.iSettings[instance].scrollThumbsInProgress) { return false; } else { this.iSettings[instance].scrollThumbsInProgress = true; }
	
		var leftMove;
		if (pos == 'next') {
			if (this.iSettings[instance].curThumbScreen+1 == this.iSettings[instance].thumbScreens) { this.iSettings[instance].scrollThumbsInProgress = false; return false; }
			this.iSettings[instance].curThumbScreen++;
			leftMove = '-=' + this.iSettings[instance].thumbsScreenW + 'px';
			} else if (pos == 'auto') {
			this.iSettings[instance].curThumbScreen = 0;
			leftMove = '0px';
			} else if (pos == 'prev') {
			if (this.iSettings[instance].curThumbScreen==0) { this.iSettings[instance].scrollThumbsInProgress = false; return false; }
			this.iSettings[instance].curThumbScreen--;
			leftMove = '+=' + this.iSettings[instance].thumbsScreenW + 'px';
			} else {
			if (pos == this.iSettings[instance].curThumbScreen || pos >= this.iSettings[instance].thumbScreens) { this.iSettings[instance].scrollThumbsInProgress = false; return false; }
			var diff = this.iSettings[instance].curThumbScreen - pos;
			if (diff<0) { leftMove = '-='; } else { leftMove = '+='; }
			leftMove += Math.abs(diff * this.iSettings[instance].thumbsScreenW) + 'px';
			this.iSettings[instance].curThumbScreen = pos;
			}

		if (this.iSettings[instance].curThumbScreen==0) { $(curGallery + ' .prevThumbs').addClass('disabled'); } else { $(curGallery + ' .prevThumbs').removeClass('disabled'); }
		if (this.iSettings[instance].curThumbScreen+1 == this.iSettings[instance].thumbScreens) { $(curGallery + ' .nextThumbs').addClass('disabled'); } else { $(curGallery + ' .nextThumbs').removeClass('disabled'); }
		
		_this = this;
		var actualScrollSpeed = animated ? this.settings.scrollSpeed : 1;
		$(curGallery + ' .thumbsWrapper ul').animate({left: leftMove }, this.actualScrollSpeed, function() {
			_this.iSettings[instance].scrollThumbsInProgress = false;
			});
			
		return false;
		},

	
	setActiveThumb: function (instance, pos, animated) {																				// Setting active thumb and scroll thumb area if needed
	
		var curGallery = '#nGalleryIn' + instance;
		
		$(curGallery + ' .thumbsWrapper img').removeClass('active');
		$(curGallery + ' .thumbsWrapper img:eq(' + pos + ')').addClass('active');
		$(curGallery + ' .screensWrapper li').find('img').css('opacity', 0.7).end().eq(pos).find('img').css('opacity', 1);

		var newThumbScreen = Math.floor(pos/this.iSettings[instance].thumbsPerScreen);
		if (newThumbScreen != this.iSettings[instance].curThumbScreen) {
			this.gotoThumbScreen(instance, newThumbScreen, animated);
			}
			
		if (this.iSettings[instance].curThumbScreen == 0) { $(curGallery + ' .prevThumbs').addClass('disabled'); }								// Usefull at the start
		if (this.iSettings[instance].curThumbScreen + 1 == this.iSettings[instance].thumbScreens) { $(curGallery + ' .nextThumbs').addClass('disabled'); }

		$(curGallery + ' .nSidebar>ul>li').removeClass('active');
		$(curGallery + ' .nSidebar>ul>li:eq(' + pos + ')').addClass('active');
		
		if (this.settings.showBottombar) {
			if ($(curGallery + ' .nSidebar>ul>li:eq(' + pos + ')').text().length > 0) {
				$(curGallery + ' .nBottombar').html($(curGallery + ' .nSidebar>ul>li:eq(' + pos + ')').html()).slideDown();
				} else {
				$(curGallery + ' .nBottombar').html('').slideUp();
				}
			}
		
		},
	
	
	showAllThumbs: function (instance, action) {
		var curGallery = '#nGalleryIn' + instance;
		if (action) {
			$(curGallery + ' .nSidebar').addClass('forceClosed');
			$(curGallery + ' .nAllThumbs').addClass('active');
			$(curGallery + ' .butThumbs').hide();
			$(curGallery + ' .butExit').show();
			} else {
			$(curGallery + ' .nSidebar').removeClass('forceClosed');
			$(curGallery + ' .nAllThumbs').removeClass('active');
			$(curGallery + ' .butExit').hide();
			$(curGallery + ' .butThumbs').show();
			}
		},
	
	
	openFullScreen: function(instance) {																					// Open fullscreen window
		_this.iSettings[instance].widthDefault = _this.settings.width;														// Save these values so we can bring them back when returning from FS
		_this.iSettings[instance].heightDefault = _this.settings.height;
		_this.iSettings[instance].screenWDefault = _this.iSettings[instance].screenW;
		_this.iSettings[instance].thumbsScreenWDefault = _this.iSettings[instance].thumbsScreenW;
		_this.iSettings[instance].thumbsPerScreenDefault = _this.iSettings[instance].thumbsPerScreen;
		_this.iSettings[instance].thumbLiWidthDefault = _this.iSettings[instance].thumbLiWidth;
		_this.iSettings[instance].thumbScreensDefault = _this.iSettings[instance].thumbScreens;

		$('body').addClass('nGalleryFS').removeClass('nGalleryActive');

		if (this.adsPresent.indexOf(gptAds['ad728ng']) < 0) {
			googletag.cmd.push(function() { googletag.display('ad728ng'); });
			this.adsPresent.push(gptAds['ad728ng']);
			}

		_this.iSettings[instance].isFS = true;
		_this.recalculateSizesFullscreen(instance);
		_this.reloadAds(true);
		ga('send', 'event', 'Slide', 'Fullscreen opened', this.newurl);
		},
			
			
	closeFullScreen: function(instance) {																					// Close fullscreen window
		_this.settings.width = _this.iSettings[instance].widthDefault;
		_this.settings.height = _this.iSettings[instance].heightDefault;
		_this.iSettings[instance].screenW = _this.iSettings[instance].screenWDefault;
		_this.iSettings[instance].thumbsScreenW = _this.iSettings[instance].thumbsScreenWDefault;
		_this.iSettings[instance].thumbsPerScreen = _this.iSettings[instance].thumbsPerScreenDefault;
		_this.iSettings[instance].thumbLiWidth = _this.iSettings[instance].thumbLiWidthDefault;
		_this.iSettings[instance].thumbScreens = _this.iSettings[instance].thumbScreensDefault;

		$('body').removeClass('nGalleryFS').removeClass('nGalleryActive');

		_this.iSettings[instance].isFS = false;
		_this.recalculateSizesFullscreen(instance);
		},


	setActive: function(instance) {
		if (_this.settings.showOverlay) {
			$('body').addClass('nGalleryActive');
			for (i in this.iSettings) {
				if (i == instance) {
					this.iSettings[i].isActive = true;
					} else {
					$('#nGalleryIn' + i + ' .nGallery').addClass('below');
					this.iSettings[i].isActive = false;
					}
				}
			var curGallery = '#nGalleryIn' + instance;
			$(curGallery + ' .nSidebar>ul>li:eq(' + _this.iSettings[instance].curScreen + ')').addClass('active');
			this.curActive = instance;
			}
		},
		
	
	unsetActive: function(instance) {
		this.curActive = false;
		for (i in this.iSettings) {
			this.iSettings[i].isActive = false;
			}

		if (this.iSettings[instance].isFS) {
			_this.closeFullScreen(instance);
			}

		$('body').removeClass('nGalleryActive');
		$('.nGallery').removeClass('below');
		$('.nGallery .nSidebar, .nGallery .nSidebar>ul>li').removeClass('active');
		},
	
	
	
	getSlideParameter:function() {																				// Get slide parameter from url at startup
		var regex = new RegExp("/slide\/([0-9]+)");
		var results = regex.exec(window.location.hash);
		if (results == null) {
			return '';
			} else {
			return this.settings.latestFirst ? this.screens-results[1]+1 : results[1];
			}
		},
	
	
	setNewUrl:function(instance, i) {																			// Set new url and track events
		if (this.screenChangeCounter++ > 0) {
			var slide = this.settings.latestFirst ? this.screens-i : i+1;
			this.newurl = window.location.href.replace(/#.*$/g, '') + '#/slide/' + slide;
			if (instance == 0) {																				// Changing url only for the first instance
				try { window.history.replaceState({}, null, this.newurl); } catch(err) { }						// using try... catch because of IE9 and similar
				}

			if (typeof(SPR) != 'undefined') {																	// Call SimpleReach collect object
				var __ajax_reach_config = $.extend({}, __reach_config);
				__ajax_reach_config.url = window.location.href.replace(/\?.*$/g, '').replace(/http:\/\/.+?\./g, 'http://www.');
				SPR.Reach.collect(__ajax_reach_config);
				}

			ga('send', 'pageview', this.newurl);
			ga('send', 'event', 'Slide', 'Slide Change', this.newurl);
			}
		},
	
	
	itemsLoaded: function (instance) {																			// Called after we have all html elements in place
	
		_this = this;
		
		var curGallery = '#nGalleryIn' + instance;
		
		this.iSettings[instance].screens = $(curGallery + ' .thumbsWrapper li').size();							// Calculating and setting widths/heights
		this.iSettings[instance].screenW = $(curGallery).width();
		this.iSettings[instance].thumbsScreenW = $(curGallery + ' .thumbsWrapper').width();
		this.iSettings[instance].thumbsPerScreen = Math.floor(this.iSettings[instance].thumbsScreenW/90);
		this.iSettings[instance].thumbLiWidth = this.iSettings[instance].thumbsScreenW/this.iSettings[instance].thumbsPerScreen;
		this.iSettings[instance].thumbScreens = Math.floor((this.iSettings[instance].screens - 1) / this.iSettings[instance].thumbsPerScreen) + 1;

		$(curGallery + ' .thumbsWrapper li').width(this.iSettings[instance].thumbLiWidth);
		$(curGallery + ' .screensWrapper ul li').width(this.iSettings[instance].screenW).css('max-width', this.iSettings[instance].screenW);
		$(curGallery + ' .screensWrapper ul').width(this.iSettings[instance].screenW * this.iSettings[instance].screens);
		$(curGallery + ' .thumbsWrapper ul').width(this.iSettings[instance].thumbsScreenW * this.iSettings[instance].thumbScreens);
		$(curGallery + ' .nSidebar').height($(curGallery).height());
		$(curGallery + ' .nSidebar>ul>li').height($(curGallery).height() - $(curGallery + ' .nBanner300').height() - 22);
		$(curGallery + ' .nAllThumbs').height($(curGallery).height()-$(curGallery + ' .nHeader').outerHeight(true)).width(this.iSettings[instance].screenW);
		
		if (this.iSettings[instance].thumbScreens == 1) {
			$(curGallery + ' .nFooter .prevThumbs, ' + curGallery + ' .nFooter .nextThumbs').addClass('disabled');
			}

		$(curGallery + ' .screensWrapper').hover(																	// Now setting listeners
			function () {
				$(curGallery + ' .prevImgBig, ' + curGallery + ' .nextImgBig, ' + curGallery + ' .openHRImage').addClass('visible');
				},
			function () {
				$(curGallery + ' .prevImgBig, ' + curGallery + ' .nextImgBig, ' + curGallery + ' .openHRImage').removeClass('visible');
				});
				
		$(curGallery).hover(
			function () {
				if (_this.settings.showSidebar) {																	// show settings if not disabled in options
					$(curGallery + ' .nSidebar').addClass('active');
					$(curGallery + ' .nSidebar>ul>li:eq(' + _this.iSettings[instance].curScreen + ')').addClass('active');
					}
				},
			function () {
				if (!_this.iSettings[instance].isActive) {
					$(curGallery + ' .nSidebar').removeClass('active');
					}
				});
		
		$(curGallery + ' .nextImg, ' + curGallery + ' .nextImgBig').click(function() {								// Button listeners
			_this.setActive(instance);
			_this.gotoScreen(instance, 'next', true); _this.showAllThumbs(instance, false); return false;
			});
			
		$(curGallery + ' .prevImg, ' + curGallery + ' .prevImgBig').click(function() {
			_this.setActive(instance);
			_this.gotoScreen(instance, 'prev', true); _this.showAllThumbs(instance, false); return false;
			});
			
		$(curGallery + ' .thumbsWrapper img').click(function() {
			_this.setActive(instance);
			_this.gotoScreen(instance, $(curGallery + ' .thumbsWrapper img').index(this), true); return false;					// $(this).index('.nGallery .thumbsWrapper img');
			});
			
		$(curGallery + ' .openHRImage').click(function() {																// Open full screen image when loupe is clicked
			$(curGallery + ' .screensWrapper img:eq(' + _this.curScreen + ')').trigger('click');
			});
		
		$(curGallery + ' .nAllThumbs img').click(function() {
			_this.setActive(instance);
			_this.gotoScreen(instance, $(curGallery + ' .nAllThumbs img').index(this), false); _this.showAllThumbs(instance, false); return false;				// $(this).index('.nGallery .nAllThumbs img')
			});
			
		$(curGallery + ' .prevThumbs').click(function() {
			_this.setActive(instance);
			_this.gotoThumbScreen(instance, 'prev', true); return false;
			});
		
		$(curGallery + ' .nextThumbs').click(function() {
			_this.setActive(instance);
			_this.gotoThumbScreen(instance, 'next', true); return false;
			});
			
		$(curGallery + ' .butThumbs').click(function() {
			_this.setActive(instance);
			_this.showAllThumbs(instance, true); return false;
			});

		$(curGallery + ' .butFullscreen').click(function() {
			_this.setActive(instance); 
			_this.openFullScreen(instance); return false;
			});

		$(curGallery + ' .butExit').click(function() {
			_this.setActive(instance);
			_this.showAllThumbs(instance, false); return false;
			});
			
		$(curGallery + ' .screensWrapper ul a').click(function() {													// Stop slideshow when big image is viewed
			if (_this.iSettings[instance].autoPlay) {
				clearTimeout(_this.iSettings[instance].autoPlayHandle);
				}
			});

		$('body').click(function() {																				// Close background layer
			if (_this.curActive !== false) {
				_this.unsetActive(instance);
			}
		});
		
		$(curGallery).click(function(event){
			event.stopPropagation();
		});
/*
		if ($().hammer) {																							// Swipe events
			$(curGallery + ' .screensWrapper').hammer().on('swipe', 'img', function(event) {
				if (event.type == 'swipe') {
					_this.setActive(instance);
					if (event.gesture.direction == 'left') { _this.gotoScreen(instance, 'next', true); }
					if (event.gesture.direction == 'right') { _this.gotoScreen(instance, 'prev', true); }
				}
			});
			$('body').hammer().on('tap', function(event) {
				if (_this.curActive !== false) {
					_this.unsetActive(instance);
				}
			});
		}
*/
		$('.closeFS').on('click', function() {																		// clicking the close button
			if (_this.curActive !== false) {
				_this.unsetActive(instance);
				}
				return false;
			});

		$(document).keyup(function(e) {																				// Removing active status with Esc
			if (_this.curActive !== false) {
				if (e.keyCode == 27) {
					_this.unsetActive(instance);
					}
				if (e.keyCode == 37) {																					// Navigate with arrow keys
					_this.gotoScreen(_this.curActive, 'prev', true);
					}
				if (e.keyCode == 39) {
					_this.gotoScreen(_this.curActive, 'next', true);
					}
				}
			});

		var i = 0;
		if (instance == 0) {
			i = parseInt(_this.getSlideParameter()) - 1;															// see if init slide parameter is set (do it only for the first instance)
			if (!i || i<0 || i >= _this.iSettings[instance].screens) { i = 0; }
			}
		_this.gotoScreen(instance, i, false);

		},
		
		
	processParameters: function (el, name) {																		// Here we are processing parameters from comment line

		el.data('instance', this.lastInstance++);																	// Every parameter is attached to comment element using data variable

		var pattern = /^(.+?)='?(.+?)'?$/;
		var params = name.split(/[ \t]+/g);

		for (i in params) {
			var match = pattern.exec(params[i]);
			this.debugLog('PARAM: ' + match[1] + ', VALUE: ' + match[2], (this.lastInstance-1));
			match[2] = match[2].toLowerCase();
			switch(match[1].toLowerCase()) {
				case 'id':
					el.data('galleryID', match[2].replace(/[^0-9a-z\/]/g, ''));
					break;
				case 'type':
					el.data('galleryType', match[2].substring(0,1));
					break;
				case 'mainpage':
					el.data('galleryMainPage', match[2].replace(/[^0-9]/g, ''));
					break;
				case 'page':
					el.data('galleryPage', match[2].replace(/[^0-9]/g, ''));
					break;
				default:
					this.debugLog('WARNING: ' + match[1] + ' is not a valid parameter', (this.lastInstance-1));
				}
			}
		},
		
		
	init: function(userSettings) {
		_this = this;
		console.log('nGallery init called!');
		
		if (typeof(userSettings) != 'undefined') {										// Apply custom settings
			$.extend(true, this.settings, userSettings);
			this.debugLog('Applying custom settings.');
			}

		$('*:not(iframe)').contents().filter(function(){								// looking for this comments format [nggallery id=815 template='galleryview']
			return this.nodeType == 8;
			}).each(function(i, e){
			var text = $.trim(e.nodeValue);												// we can also use $(this).attr('data');    trim not working in old IE browsers 
			var pattern = /\[nggallery *(.*)\]/g;
			var match = pattern.exec(text);
			var commentelement = $(this);

			if (match) {
				_this.processParameters(commentelement, match[1]);

				if (commentelement.data('galleryID') && commentelement.data('galleryType')) {
					_this.debugLog('Loading gallery: ' + commentelement.data('galleryID'), commentelement.data('instance'));

					var jsonUrlFull = _this.settings.jsonUrl + commentelement.data('galleryID') + '/' + commentelement.data('galleryType') + '/';
					if (commentelement.data('galleryMainPage') || commentelement.data('galleryPage')) {
						jsonUrlFull += commentelement.data('galleryMainPage') ? (commentelement.data('galleryMainPage') + '/') : '0/';
						jsonUrlFull += commentelement.data('galleryPage') ? (commentelement.data('galleryPage') + '/') : '';
					}

					$.getJSON(jsonUrlFull, function(data) {
					
						if (data && data.totalImages > 0) {
						
							// ----------------------------- determining width and height ---------------------------------------
							if (!_this.settings.width) {
								if (_this.settings.height) {
									_this.settings.width = Math.floor(_this.settings.height * _this.settings.preferredRatio);
									} else {
									_this.settings.width = commentelement.parent().width();
									}
								}
							if (!_this.settings.height) {
								_this.settings.height = Math.floor(_this.settings.width / _this.settings.preferredRatio);
								}

							var curInstance = commentelement.data('instance');
							var curGallery = '#nGalleryIn' + curInstance;
							_this.iSettings[curInstance] = {};																			// create instance settins
							$.extend(_this.iSettings[curInstance], _this.iDefaultSettings);
							_this.iSettings[curInstance].autoPlay = commentelement.data('autoPlay');
							
							commentelement.replaceWith(_this.htmlCode.replace('--INSTANCE--', curInstance));							// replace comment with gallery
							
							if (_this.touchEvents) { $(curGallery + ' .openHRImage').remove(); }
							if (_this.settings.latestFirst) { data.images.reverse(); }											// reverse the order of images
							var items = [];
							$.each(data.images, function(key, item) {
								$(curGallery + ' .thumbsWrapper ul, ' + curGallery + ' .nAllThumbs ul').append('<li><img src="' + item.thumbSize + '" /></li>');
								$(curGallery + ' .nSidebar>ul').append('<li><div class="nTitle">' + item.title + '</div>' + item.description + '</li>');
								$(curGallery + ' .screensWrapper ul').append('<li><img data-src="' + item.medSize + '" /></li>');
								//$(curGallery + ' .screensWrapper ul').append('<li><a target="_blank" href="' + item.fullSize + '"><img data-src="' + item.medSize + '" /></a></li>');
								});
							
							$(curGallery + ', ' + curGallery + ' .nBottombar').css('width', _this.settings.width);							// setting css styles
							$(curGallery + ' .screensWrapper, ' + curGallery + ' .screensWrapper ul, ' + curGallery + ' .screensWrapper ul li').css('height', _this.settings.height);
							$(curGallery + ' .prevImgBig, ' + curGallery + ' .nextImgBig').css('margin-top', (_this.settings.height - $(curGallery + ' .prevImgBig').height())/2);
							_this.footerWidth = _this.settings.width - 2.8 * $(curGallery + ' .prevThumbs').width();
							$(curGallery + ' .nFooter').css('width', _this.footerWidth);
							
							if (!_this.settings.showFullscreen) { 
								$(curGallery + ' .butFullscreen').hide();
								}

							_this.debugLog('Items loaded', curInstance);
							_this.itemsLoaded(curInstance);
							
							if($().colorbox) {
								$(curGallery + ' .screensWrapper ul a').colorbox({'rel':'nGallery', 'maxWidth':'90%', 'maxHeight':'90%'});
								}
								
							} else {
							_this.debugLog('No images found in the gallery', commentelement.data('instance'));
							}
						
						});
					}
				}
			});
		},



	recalculateSizesFullscreen: function(instance) {			// Use it on FS and when leaving it

		var curGallery = '#nGalleryIn' + instance;

		if (_this.iSettings[instance].isFS) {					// Calculate screen values only if we're in the FS
			var galHeight = $(window).height() - $(curGallery + ' .nFooter').height() - $(curGallery + ' .nHeader').height() - $(curGallery + ' .nLogo').height() - 35;
			var galWidth = $(curGallery + ' .nSidebar').offset().left - 10;
			_this.settings.width = galWidth;
			_this.settings.height = galHeight;
			_this.iSettings[instance].screenW = galWidth;
		}

		_this.footerWidth = _this.settings.width - 2.8 * $(curGallery + ' .prevThumbs').width();
		_this.iSettings[instance].thumbsScreenW = _this.footerWidth;
		_this.iSettings[instance].thumbsPerScreen = Math.floor(_this.iSettings[instance].thumbsScreenW / 90);
		_this.iSettings[instance].thumbLiWidth = _this.iSettings[instance].thumbsScreenW / _this.iSettings[instance].thumbsPerScreen;
		_this.iSettings[instance].thumbScreens = Math.floor((_this.iSettings[instance].screens - 1) / _this.iSettings[instance].thumbsPerScreen) + 1;

		var newThumbScreen = Math.floor(_this.iSettings[instance].curScreen / _this.iSettings[instance].thumbsPerScreen);
		_this.iSettings[instance].curThumbScreen = newThumbScreen;

		$(curGallery + ' .thumbsWrapper ul').css('left', - (_this.iSettings[instance].thumbsScreenW * newThumbScreen) + 'px');
		$(curGallery + ' .screensWrapper ul').css('width', _this.iSettings[instance].screenW * _this.iSettings[instance].screens);
		$(curGallery + ' .screensWrapper ul li').css('width', _this.iSettings[instance].screenW);
		$(curGallery + ' .screensWrapper, ' + curGallery + ' .screensWrapper ul, ' + curGallery + ' .screensWrapper ul li').css('height', _this.settings.height);
		$(curGallery + ' .prevImgBig, ' + curGallery + ' .nextImgBig').css('margin-top', (_this.settings.height - $(curGallery + ' .prevImgBig').height())/2);
		$(curGallery + ' .thumbsWrapper li').width(this.iSettings[instance].thumbLiWidth);
		$(curGallery + ' .thumbsWrapper ul').width(this.iSettings[instance].thumbsScreenW * this.iSettings[instance].thumbScreens);
		$(curGallery + ' .nFooter').css('width', _this.footerWidth);
		$(curGallery + ' .screensWrapper ul').css('left', - (_this.iSettings[instance].curScreen * _this.iSettings[instance].screenW) + 'px');
		$(curGallery + ' .nSidebar>ul>li').height($(curGallery + ' .nSidebar').height() - $(curGallery + ' .nBanner300').height() - 22);
	},



	lazyLoad: function(instance, scr, checkaround) {															// Lazy load curent image and images around
	
		var curGallery = '#nGalleryIn' + instance;
		
		if (scr == this.iSettings[instance].screens) { scr = 0; }
		if (scr == -1) { scr = this.iSettings[instance].screens - 1; }
	
		var el = $(curGallery + ' .screensWrapper ul img:eq(' + scr + ')');
		if (el.attr('src') == undefined) {
			this.debugLog('Lazyloading screen ' + scr, instance);
			el.attr('src', el.attr('data-src'));
			}
			
		if (checkaround) {
			this.lazyLoad(instance, scr+1, false);
			this.lazyLoad(instance, scr-1, false);
			}

		},
	
	
	
	
	
	reloadAds:function(force) {																							// Reloading ads
	
		var milseconds = new Date().getTime();

		if (typeof(googletag.display) != 'function' || typeof(googletag.pubads) != 'function') { 
			this.debugLog('GPT still not initialized.', (this.lastInstance-1));
			return; 
		}

		if (this.adsPresent.indexOf(gptAds['ad300ng']) < 0) {
			googletag.cmd.push(function() { googletag.display('ad300ng'); })
			this.adsPresent.push(gptAds['ad300ng']);
		}

		if (this.adsPresent.length > 0 && (!this.lastAdRefreshTime || force || (milseconds-this.lastAdRefreshTime) > this.settings.minAdRefreshTime)) {
			this.lastAdRefreshTime = milseconds;
			googletag.pubads().refresh(this.adsPresent);
			}

		},
		
		
		
	debugLog: function(text, instance) {																				// Show console log if debug is turned on
		if (this.settings.debug) {
			inst = (typeof(instance)!='undefined') ? ' (' + instance + ')' : '';
			console.log('nGallery' + inst + ':', text);
			}
		},
	
	
		
		
	htmlCode: '<div id="nGalleryIn--INSTANCE--" class="nGalleryWrapper"><div class="nGallery">\n\
	<a href="#" class="closeFS"></a><div class="nBanner728Holder"><div class="nLogo" title="Sherdog Gallery"></div><div class="nBanner728"><div id="ad728ng" data-id="ad728ng" class="gpt-ad"></div></div></div>\
\
	<div class="nAllThumbs"><ul></ul></div>\
\
	<div class="nSidebar">\
		<div class="nBanner300"><div id="ad300ng" data-id="ad300ng" class="gpt-ad"></div></div>\
		<ul></ul>\
	</div>\
\
	<div class="nMainSection">\
		<div class="nHeader">\
			<a class="butExit" href="#"></a>\
			<a class="butThumbs" href="#"></a>\
			<a class="butFullscreen" href="#"></a>\
			<div class="navigation"><a href="#" class="nextImg"></a><span></span><a href="#" class="prevImg"></a></div>\
		</div>\
		<div class="openHRImage"></div>\
		<div class="screensWrapper">\
			<a href="#" class="prevImgBig"></a>\
			<a href="#" class="nextImgBig"></a>\
			<ul></ul>\
		</div>\
		<div class="nFooter">\
			<a href="#" class="prevThumbs"></a>\
			<a href="#" class="nextThumbs"></a>\
			<div class="thumbsWrapper"><ul></ul></div>\
		</div>\
	</div></div>\
	<div class="nBottombar"></div>\
	</div><div class="nGalleryBg"></div>' 
		
	}



$(function(){
	if (window.location.host.match(/m\.sherdog\.com/)) {
		nGallery.init({showSidebar: false, showBottombar: true, showOverlay: false, showFullscreen: false});
	} else {
		nGallery.init();
	}
});
