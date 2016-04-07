/*
 * jReject (jQuery Browser Rejection Plugin)
 * Version 1.0.2
 * URL: http://jreject.turnwheel.com/
 * Description: jReject is a easy method of rejecting specific browsers on your site
 * Author: Steven Bower (TurnWheel Designs) http://turnwheel.com/
 * Copyright: Copyright (c) 2009-2013 Steven Bower under dual MIT/GPLv2 license.
 * Modified by: Christine Hei Pak Lam @ eonline.com
 */

(function($) {
// Get page edition from E!Online
	var pageEdition = "";
	window.setBrowserDetectionEdtion = function(ed){
		pageEdition = ed;
	}	
// Get page Name for Omniture Tracking
   var pageName = "";
   window.setPageName = function(pN){
   	pageName = pN;
   	}
// Get Latin America props
    var laStayDesp ="";
	var laStayLink = "";
	var laRedDesp = "";
	var laRedLink = "";
	window.setLatinAmericaProps = function(stayDesp, stayLink, redDesp, redLink){
		laStayDesp = stayDesp;
		laStayLink = stayLink;
		laRedDesp = redDesp;
		laRedLink = redLink;
	}
// Get Brazil props
    var brStayDesp ="";
	var brStayLink = "";
	var brRedDesp = "";
	var brRedLink = "";
	window.setBrazillianProps = function(stayDesp, stayLink, redDesp, redLink){
		brStayDesp = stayDesp;
		brStayLink = stayLink;
		brRedDesp = redDesp;
		brRedLink = redLink;
	}
jQuery(document).ready(function(){  
	jQuery.reject({  
    reject: {  
    	// Apple Safari 5.x or below 
       		 safari1: true, safari2: true, safari3: true, safari4: true, safari5: true, 
        // Google Chrome 29.x and below
	        chrome1:true, chrome2:true, chrome3:true, chrome4:true, chrome5:true,
	        chrome6:true, chrome7:true, chrome8:true, chrome9:true, chrome10:true,
	        chrome11:true, chrome12:true, chrome13:true, chrome14:true, chrome15:true,
	        chrome16:true, chrome17:true, chrome18:true, chrome19:true, chrome20:true,
	        chrome21:true, chrome22:true, chrome23:true, chrome24:true, chrome25:true,
	        chrome26:true, chrome27:true, chrome28:true, chrome29: true,
        // Mozilla Firefox 25.x or below 
	        firefox1: true, firefox2: true, firefox3: true, firefox4: true, firefox5: true,
	        firefox6: true, firefox7: true, firefox8: true, firefox9: true, firefox10: true,
	        firefox11: true, firefox12: true, firefox13: true, firefox14: true, firefox15: true,
	        firefox16: true, firefox17: true, firefox18: true, firefox19: true, firefox20: true,
	        firefox21: true, firefox22: true, firefox23: true, firefox24: true, firefox25: true, 
        // Microsoft Internet Explorer 9.x or below
        msie5:true, msie6:true, msie7:true, msie8:true, msie9:true,  
        opera: false, // Opera  
        konqueror: false, // Konqueror (Linux)  
        // No Linux/Android, solaris, ipad, and iphone
    	win:true, mac:true, linux:false, solaris:false, iphone:false, ipad:false,
        unknown: false // Everything else  
    }, 
    display:['firefox','chrome','msie','safari'],
    editions: {us:true, uk:true, ca:true, au:true, fr:false, de:false, it:false},  //Set which E!Online editions to show display
    closeCookie: true 
	}); // Specialize the browsers that need pop-up above 
	//alert(jQuery.os.name+" "+jQuery.browser.name+ " "+jQuery.browser.className);
});

//Default settings	
jQuery.reject = function(options) {
	var opts = jQuery.extend(true,{
		reject : { // Rejection flags for specific browsers
			all: false, // Covers Everything (Nothing blocked)
			msie5: true, msie6: true, msie8: true // Covers MSIE 5-6 (Blocked by default)
			/*
			 * Possibilities are endless...
			 *
			 * // MSIE Flags (Global, 5-8)
			 * msie, msie5, msie6, msie7, msie8,
			 * // Firefox Flags (Global, 1-3)
			 * firefox, firefox1, firefox2, firefox3,
			 * // Konqueror Flags (Global, 1-3)
			 * konqueror, konqueror1, konqueror2, konqueror3,
			 * // Chrome Flags (Global, 1-4)
			 * chrome, chrome1, chrome2, chrome3, chrome4, chrome34,
			 * // Safari Flags (Global, 1-4)
			 * safari, safari2, safari3, safari4,
			 * // Opera Flags (Global, 7-10)
			 * opera, opera7, opera8, opera9, opera10,
			 * // Rendering Engines (Gecko, Webkit, Trident, KHTML, Presto)
			 * gecko, webkit, trident, khtml, presto,
			 * // Operating Systems (Win, Mac, Linux, Solaris, iPhone)
			 * win, mac, linux, solaris, iphone,
			 * unknown // Unknown covers everything else
			 */
		},
		display: [], // What browsers to display and their order (default set below)
		browserShow: true, // Should the browser options be shown?
		editions: {us:true, uk:true, ca:true, au:true, de:true, fr:true, it: true}, // Default which E!Online edition to show display
		browserInfo: { // Settings for which browsers to display
			firefox: {
				text: 'Firefox', // Text below the icon
				url: 'https://www.mozilla.org/en-US/firefox/all/' // URL For icon/text link
			},
			chrome: {
				text: 'Chrome',
				url: 'https://www.google.com/intl/en/chrome/browser/'
			},
			safari: {
				text: 'Safari',
				url: 'http://support.apple.com/kb/HT6104'
			},
			opera: {
				text: 'Opera 12',
				url: 'http://www.opera.com/download/'
			},
			msie: {
				text: 'Explorer',
				url: 'http://www.microsoft.com/windows/Internet-explorer/'
			},
			gcf: {
				text: 'Google Chrome Frame',
				url: 'http://code.google.com/chrome/chromeframe/',
				// This browser option will only be displayed for MSIE
				allow: { all: false, msie: true }
			}
		},

		// Header of pop-up window
		header: 'logo',
		// Paragraph 1
		paragraph1: 'Hi There,',
		// Paragraph 2
		paragraph2: 'Looks like your browser is out of date',
		close: true, // Allow closing of window
		// Message displayed below closing link
		closeMessage: '',
		closeLink: 'close', // Text for closing link
		closeURL: '#', // Close URL
		closeESC: true, // Allow closing of window with esc key

		// If cookies should be used to remmember if the window was closed
		// See cookieSettings for more options
		closeCookie: false,
		// Cookie settings are only used if closeCookie is true
		cookieSettings: {
			// Path for the cookie to be saved on
			// Should be root domain in most cases
			path: '/',
			// Expiration Date (in days)
			// 0 (default) means it ends with the current session
			expires: 2
		},

		imagePath: './images/', // Path where images are located
		overlayBgColor: '#000', // Background color for overlay
		overlayOpacity: 0.6, // Background transparency (0-1)

		// Fade in time on open ('slow','medium','fast' or integer in ms)
		fadeInTime: 'fast',
		// Fade out time on close ('slow','medium','fast' or integer in ms)
		fadeOutTime: 'fast',

		// Google Analytics Link Tracking (Optional)
		// Set to true to enable
		// Note: Analytics tracking code must be added separately
		analytics: false
	}, options);

	// Set default browsers to display if not already defined
	if (opts.display.length < 1) {
		opts.display = ['chrome','firefox','safari','opera','gcf','msie'];
	}

	// beforeRject: Customized Function
	if (jQuery.isFunction(opts.beforeReject)) {
		opts.beforeReject();
	}

	// Disable 'closeESC' if closing is disabled (mutually exclusive)
	if (!opts.close) {
		opts.closeESC = false;
	}

   var browserVersion;
 
   //This function: Get the version for firefox since its version cannot be extracted using jquery version method
   //also set version for other browsers
   var getBrowserVersion = function(){
   		var userAgent = navigator.userAgent.toLowerCase();
   		
   		if(jQuery.browser.mozilla == true){
   			userAgent = userAgent.substring(userAgent.indexOf('firefox/') +8);
			version = userAgent.substring(0,userAgent.indexOf('.'));
			browserVersion = jQuery.browser.name+version;
		}else{ 
			browserVersion = jQuery.browser.className;
		}
   };
     
    // Get page adEdition, this method depends on eol.js 
    // This is to check adEdition for Russian pop up  	
   var pageAdEdition = "us";
   var pageSetEd = eol.uattr("adEdition");
   var cookieSetEd = eol.cookie("adEdition");
 
   	if(pageSetEd != null && pageSetEd != ""){
   		pageAdEdition = pageSetEd;
   	}else if(cookieSetEd != null && cookieSetEd != ""){
   			pageAdEdition = cookieSetEd;	
   	}

	// This function parses the advanced browser options
	   	var browserCheck = function(settings) {
			// Check 1: Look for 'all' forced setting
			// Check 2: Operating System (eg. 'win','mac','linux','solaris','iphone')
			// Check 3: Rendering engine (eg. 'webkit', 'gecko', 'trident')
			// Check 4: Browser name (eg. 'firefox','msie','chrome')
			// Check 5: Browser+major version (eg. 'firefox3','msie7','chrome4')
			// Check 6: Page Edition (eg. Russian allowng pop up on all versions)
			getBrowserVersion();
			return (settings['all'] ? true : false) ||
				(settings[jQuery.layout.name] ? true : false) ||
				(settings[jQuery.browser.name] ? true : false) ||
				((settings[jQuery.os.name] ? true : false) &&
				(settings[browserVersion] ? true : false));
		};
	// Determine if we need to display rejection for this browser, or exit
	if (!browserCheck(opts.reject)) {
		// onFail: Customized Function
		if (jQuery.isFunction(opts.onFail)) {
			opts.onFail();
		}

		return false;
	}
		
   //This function checks the editions listed to edition of the current E!Online page
	var editionCheck = function(editions){
		return(editions[pageEdition] ? true : false);
	};
	
	// Check with opts if we need to display rejection for this edition, or exit
	if(!editionCheck(opts.editions)){
		// onFail: Customized Function
		if (jQuery.isFunction(opts.onFail)) {
		opts.onFail();
		}
		return false;
	}
	
	// If user can close and set to remmember close, initiate cookie functions
	//if (opts.close && opts.closeCookie) {
	if (opts.closeCookie) {
		// Local global setting for the name of the cookie used
		var COOKIE_NAME = 'jreject-close';

		// Cookies Function: Handles creating/retrieving/deleting cookies
		// Cookies are only used for opts.closeCookie parameter functionality
		var _cookie = function(name, value) {
			// Save cookie
			if (typeof value != 'undefined') {
				var expires = '';

				// Check if we need to set an expiration date
				if (opts.cookieSettings.expires !== 0) {
					var date = new Date();
					date.setDate(date.getDate()+opts.cookieSettings.expires);
					//date.setTime(date.getTime()+(opts.cookieSettings.expires*1000));
					expires = "; expires="+date.toGMTString();
				}

				// Get path from settings
				var path = opts.cookieSettings.path || '/';

				// Set Cookie with parameters
				document.cookie = name+'='+
					encodeURIComponent((!value) ? '' : value)+expires+
					'; path='+path;

				return true;
			}
			// Get and Clean cookie
			else {
				var cookie,val = null;

				if (document.cookie && document.cookie !== '') {
					var cookies = document.cookie.split(';');

					// Loop through all cookie values
					var clen = cookies.length;
					for (var i = 0; i < clen; ++i) {
						cookie = jQuery.trim(cookies[i]);

						// Does this cookie string begin with the name we want?
						if (cookie.substring(0,name.length+1) == (name+'=')) {
							var len = name.length;
							val = decodeURIComponent(cookie.substring(len+1));
							break;
						}
					}
				}

				// Returns cookie value
				return val;
			}
		};

		// If cookie is set, return false and don't display rejection
		if (_cookie(COOKIE_NAME)) {
			return false;
		}
	}
  	
    //Get current browser name
     var currentBrowser;
     var cbUrl;
     var userAgent = navigator.userAgent.toLowerCase();
		jQuery.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

		if($.browser.msie){
			currentBrowser = "msie";
			cbUrl = opts.browserInfo.msie.url;
		} else if(jQuery.browser.chrome){
			currentBrowser = "chrome";
			cbUrl = opts.browserInfo.chrome.url;
		} else if(jQuery.browser.safari){
			currentBrowser = "safari";
			cbUrl = opts.browserInfo.safari.url;
		} else if(jQuery.browser.mozilla && navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			currentBrowser = "firefox";
			cbUrl = opts.browserInfo.firefox.url;
		}
	
	var iPadCss = jQuery.os.name+"";
	
	// GRAPHIC: Russian, Latin America, Brazil has its own pop up
	// Other edtions have the update browser pop up
	var html = "";
		// Load background overlay (jr_overlay) + Main wrapper (jr_wrap) +
		// Inner Wrapper (jr_inner) w/ opts.header (jr_header) +
		// opts.paragraph1/opts.paragraph2 if set
		html = '<div id="jr_overlay"></div><div id="jr_wrap"><div id="jr_inner">'+
			'<h1 id="jr_header" class="bd_sprite"></h1>'+
			(opts.paragraph1 === '' ? '' : '<p>'+opts.paragraph1+'</p>')+
			(opts.paragraph2 === '' ? '' : '<p>'+opts.paragraph2+'</p>');
		if (opts.additionalMessage) {
			html += '<div class="bd_additional_msg">' + opts.additionalMessage + '</div>'; 
		}
		var fullCurrentBrowser = ""; 
			if(currentBrowser == "msie") fullCurrentBrowser = "internet-explorer";
			else fullCurrentBrowser = currentBrowser;
			
		var eVar17current = "browser-update:"+fullCurrentBrowser; 
			
		html +='<a href="'+cbUrl+'" data-omniture=trackBrowserUpdate|{"linkName":"'+eVar17current+'","eVar4":"'+pageName+'","eVar16":"browser-update","eVar30":"'+fullCurrentBrowser+'"}><div class="bd_current_broswer '
		+currentBrowser+'"><div class="bd_cb_logo bd_sprite '+currentBrowser
		+'"></div><div class="bd_cb_title bd_font">click here to update your current browser<img src="/resources/browserDetection/images/bd_arrow.png"></img></div></div></a>';
	
		if (opts.browserShow) {
		    html +='<div class="bd_browser_list">';
			html += '<ul class="bd_other_browsers">';
	
			var displayNum = 0;
	
			// Generate the browsers to display
			for (var x in opts.display) {
				var browser = opts.display[x]; // Current Browser
				var info = opts.browserInfo[browser] || false; // Browser Information
	
				// If no info exists for this browser
				// or if this browser is not suppose to display to this user
				if (!info || (info['allow'] != undefined && !browserCheck(info['allow']))) {
					continue;
				}
			    
				var url = info.url || '#'; // URL to link text/icon to
				var fullBrowserName = "";
				if(browser == "msie") fullBrowserName = "internet-explorer";
				else fullBrowserName = browser;
				
				var eVar17list = "browser-update:"+fullBrowserName;
				
				// Generate HTML for this browser option
				if(browser !== currentBrowser){
					html += '<a href="'+url+'" data-omniture=trackBrowserUpdate|{"linkName":"'+eVar17list+'","eVar4":"'+pageName+'","eVar16":"browser-update","eVar30":"'+fullBrowserName+'"}><li id="jr_'+browser+'"><div class="jr_icon bd_sprite"></div>'+
							'<div class="bd_browser_title bd_font">Download '+(info.text || 'Unknown')+
							'<img src="/resources/browserDetection/images/bd_arrow.png"></img>'+
							'</div></li></a>';
				}
				++displayNum;
			}
	
			html += '</ul>';
			html += '<div class="bd_reasons_for_update"><label class="bd_update_title bd_font '+currentBrowser+'">Why you should update:</label>'+
				'<ul><li class="bd_subtitle_font">-Faster loading times</li><li class="bd_subtitle_font">-Websites render correctly</li><li class="bd_subtitle_font">-Safer browsing</li><li class="bd_subtitle_font">-Extra features</li></ul></div>';
			html += '</div>';
		}

		// Close list and #jr_list
		html += '<div id="jr_close" class="bd_close bd_sprite">'+
		// Display close links/message if set
		(opts.close ? '<a href="'+opts.closeURL+'" data-omniture=trackBrowserUpdate|{"linkName":"pop-up:close","eVar4":"'+pageName+'","eVar16":"browser-update","eVar30":"close"}>'+opts.closeLink+'</a>'+
			'<p>'+opts.closeMessage+'</p>' : '')+'</div>'+
		//Update button
			'<a href="'+cbUrl+'" data-omniture=trackBrowserUpdate|{"linkName":"'+eVar17current+'","eVar4":"'+pageName+'","eVar16":"browser-update","eVar30":"'+fullCurrentBrowser+'"}><div id="bd_update" class="bd_update bd_sprite bd_subtitle_font">Update</div></a>'
		// Close #jr_inner and #jr_wrap
		'</div></div>';
			
	var element = jQuery('<div>'+html+'</div>'); // Create element
	var size = _pageSize(); // Get page size
	var scroll = _scrollSize(); // Get page scroll

	// This function handles closing this reject window
	// When clicked, fadeOut and remove all elements
	element.bind('closejr', function() {
		// Make sure the permission to close is granted
		if (!opts.close) {
			return false;
		}

		// Customized Function
		if (jQuery.isFunction(opts.beforeClose)) {
			opts.beforeClose();
		}

		// Remove binding function so it
		// doesn't get called more than once
		jQuery(this).unbind('closejr');

		// Fade out background and modal wrapper
		jQuery('#jr_overlay,#jr_wrap').fadeOut(opts.fadeOutTime,function() {
			jQuery(this).remove(); // Remove element from DOM

			// afterClose: Customized Function
			if (jQuery.isFunction(opts.afterClose)) {
				opts.afterClose();
			}
		});

		// Show elements that were hidden for layering issues
		var elmhide = 'embed.jr_hidden, object.jr_hidden, select.jr_hidden, applet.jr_hidden';
		jQuery(elmhide).show().removeClass('jr_hidden');

		// Set close cookie for next run
		if (opts.closeCookie) {
			_cookie(COOKIE_NAME, 'true');
		}

		return true;
	});

	// Tracks clicks in Google Analytics (category 'External Links')
	// only if opts.analytics is enabled
	var analytics = function (url) {
		if (!opts.analytics) return false;

		// Get just the hostname
		var host = url.split(/\/+/g)[1];

		// Send external link event to Google Analaytics
		// Attempts both versions of analytics code. (Newest first)
		try {
			// Newest analytics code
			_gaq.push(['_trackEvent', 'External Links',  host, url]);
		} catch (e) {
			try {
				// Older analytics code
				pageTracker._trackEvent('External Links', host, url);
			} catch (e) { }
		}
	};

	// Called onClick for browser links (and icons)
	// Opens link in new window
	var openBrowserLinks = function(url) {
		// Send link to analytics if enabled
		analytics(url);

		// Open window, generate random id value
		window.open(url, 'jr_'+ Math.round(Math.random()*11));

		return false;
	};

	/*
	 * Trverse through element DOM and apply JS variables
	 * All CSS elements that do not require JS will be in
	 * css/jquery.jreject.css
	 */

	// Creates 'background' (div)
	
	element.find('#jr_overlay').css({
		width: size[0],
		height: size[1],
		background: opts.overlayBgColor
		//opacity: opts.overlayOpacity
	});

	// Wrapper for our pop-up (div)
	element.find('#jr_wrap').css({
		top: scroll[1]+((size[3]-610)/2),
		left: scroll[0]
	});
	
	// Wrapper for inner centered content (div)
	element.find('#jr_inner').css({
		minWidth: displayNum*100,
		maxWidth: displayNum*170,
		// min/maxWidth not supported by IE
		width: jQuery.layout.name == 'trident' ? displayNum*170 : '680px'
	});

	//element.find('#jr_inner li').css({ // Browser list items (li)
		//background: 'transparent url("'+opts.imagePath+'background_browser.gif")'+
					'no-repeat scroll left top'
	//});

	element.find('#jr_inner li .jr_icon').each(function() {
		// Dynamically sets the icon background image
		var self = jQuery(this);
		//self.css('background','transparent url('+opts.imagePath+'browser_'+
			//	(self.parent('li').attr('id').replace(/jr_/,''))+'.gif)'+
				//	' no-repeat scroll left top');

		// Send link clicks to openBrowserLinks
		self.click(function () {
			var url = jQuery(this).next('div').children('a').attr('href');
			openBrowserLinks(url);
		});
	});

	element.find('#jr_inner li a').click(function() {
		openBrowserLinks(jQuery(this).attr('href'));
		return false;
	});

	// Bind closing event to trigger closejr
	// to be consistant with ESC key close function
	element.find('#jr_close a').click(function() {
		jQuery(this).trigger('closejr');

		// If plain anchor is set, return false so there is no page jump
		if (opts.closeURL === '#') {
			return false;
		}
	});
	
	//Russian stay link clicked
	jQuery(".intl-overlay-stay-link").live("click", function(){
		jQuery(this).trigger('closejr');

		// If plain anchor is set, return false so there is no page jump
		if (opts.closeURL === '#') {
			return false;
		}
	});

	// Set focus (fixes ESC key issues with forms and other focus bugs)
	jQuery('#jr_overlay').focus();

	// Hide elements that won't display properly
	jQuery('embed, object, select, applet').each(function() {
		if (jQuery(this).is(':visible')) {
			jQuery(this).hide().addClass('jr_hidden');
		}
	});

	// Append element to body of document to display
	jQuery('body').append(element.hide().fadeIn(opts.fadeInTime));

	// Handle window resize/scroll events and update overlay dimensions
	jQuery(window).bind('resize scroll',function() {
		var size = _pageSize(); // Get size

		// Update overlay dimensions based on page size
		jQuery('#jr_overlay').css({
			width: size[0],
			height: size[1]
		});

		var scroll = _scrollSize(); // Get page scroll
		  
		// Update modal position based on scroll
		jQuery('#jr_wrap').css({
			top: scroll[1]+((size[3]-610)/2),
			left: scroll[0]
		});
	});

	// Add optional ESC Key functionality
	if (opts.closeESC) {
		jQuery(document).bind('keydown',function(event) {
			// ESC = Keycode 27
			if (event.keyCode == 27) {
				element.trigger('closejr');
			}
		});
	}

	// afterReject: Customized Function
	if (jQuery.isFunction(opts.afterReject)) {
		opts.afterReject();
	}

	return true;
};

// Based on compatibility data from quirksmode.com
var _pageSize = function() {
	var xScroll = window.innerWidth && window.scrollMaxX ?
				window.innerWidth + window.scrollMaxX :
				(document.body.scrollWidth > document.body.offsetWidth ?
				document.body.scrollWidth : document.body.offsetWidth);

	var yScroll = window.innerHeight && window.scrollMaxY ?
				window.innerHeight + window.scrollMaxY :
				(document.body.scrollHeight > document.body.offsetHeight ?
				document.body.scrollHeight : document.body.offsetHeight);

	var windowWidth = window.innerWidth ? window.innerWidth :
				(document.documentElement && document.documentElement.clientWidth ?
				document.documentElement.clientWidth : document.body.clientWidth);

	var windowHeight = window.innerHeight ? window.innerHeight :
				(document.documentElement && document.documentElement.clientHeight ?
				document.documentElement.clientHeight : document.body.clientHeight);

	return [
		xScroll < windowWidth ? xScroll : windowWidth, // Page Width
		yScroll < windowHeight ? windowHeight : yScroll, // Page Height
		windowWidth,windowHeight
	];
};


// Based on compatibility data from quirksmode.com
var _scrollSize = function() {
	return [
		// scrollSize X
		window.pageXOffset ? window.pageXOffset : (document.documentElement &&
				document.documentElement.scrollTop ?
				document.documentElement.scrollLeft : document.body.scrollLeft),

		// scrollSize Y
		window.pageYOffset ? window.pageYOffset : (document.documentElement &&
				document.documentElement.scrollTop ?
				document.documentElement.scrollTop : document.body.scrollTop)
	];
};
})(jQuery);

/*
 * jQuery Browser Plugin
 * Version 2.4 / jReject 1.0.x
 * URL: http://jquery.thewikies.com/browser
 * Description: jQuery Browser Plugin extends browser detection capabilities and
 * can assign browser selectors to CSS classes.
 * Author: Nate Cavanaugh, Minhchau Dang, Jonathan Neal, & Gregory Waxman
 * Updated By: Steven Bower for use with jReject plugin
 * Copyright: Copyright (c) 2008 Jonathan Neal under dual MIT/GPL license.
 */

(function (jQuery) {
	jQuery.browserTest = function (a, z) {
		var u = 'unknown',
			x = 'X',
			m = function (r, h) {
				for (var i = 0; i < h.length; i = i + 1) {
					r = r.replace(h[i][0], h[i][1]);
				}

				return r;
			}, c = function (i, a, b, c) {
				var r = {
					name: m((a.exec(i) || [u, u])[1], b)
				};

				r[r.name] = true;

				if (!r.opera) {
					r.version = (c.exec(i) || [x, x, x, x])[3];
				}
				else {
					r.version = window.opera.version();
				}

				if (/safari/.test(r.name)) {
					var safariversion = /(safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|jQuery)/;
					var res = safariversion.exec(i)
					if (res && res[3] && res[3] < 400) {
						r.version = '2.0';
					}
				}

				else if (r.name === 'presto') {
					r.version = (jQuery.browser.version > 9.27) ? 'futhark' : 'linear_b';
				}

				r.versionNumber = parseFloat(r.version, 10) || 0;
				var minorStart = 1;

				if (r.versionNumber < 100 && r.versionNumber > 9) {
					minorStart = 2;
				}

				r.versionX = (r.version !== x) ? r.version.substr(0, minorStart) : x;
				r.className = r.name + r.versionX;

				return r;
			};

		a = (/Opera|Navigator|Minefield|KHTML|Chrome|CriOS/.test(a) ? m(a, [
			[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ''],
			['Chrome Safari', 'Chrome'],
			['CriOS', 'Chrome'],
			['KHTML', 'Konqueror'],
			['Minefield', 'Firefox'],
			['Navigator', 'Netscape']
		]) : a).toLowerCase();

		jQuery.browser = jQuery.extend((!z) ? jQuery.browser : {}, c(a,
			/(camino|chrome|crios|firefox|netscape|konqueror|lynx|msie|opera|safari)/,
			[],
			/(camino|chrome|crios|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|jQuery)/));

		jQuery.layout = c(a, /(gecko|konqueror|msie|opera|webkit)/, [
			['konqueror', 'khtml'],
			['msie', 'trident'],
			['opera', 'presto']
		], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);

		jQuery.os = {
			name: (/(win|mac|linux|sunos|solaris|iphone|ipad)/.
					exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris')
		};

		if (!z) {
			jQuery('html').addClass([jQuery.os.name, jQuery.browser.name, jQuery.browser.className,
				jQuery.layout.name, jQuery.layout.className].join(' '));
		}
	};

	jQuery.browserTest(navigator.userAgent);

}(jQuery));
