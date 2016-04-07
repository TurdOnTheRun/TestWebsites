		
					
			
						
			
		
																																																																																																																																																					
		
			

							
	    
	

		
				
												
					
				
																																																																									
				
					

																													
		
	
				
												
					
				
																																																																																																															
				
					

														
		
	
			 
				adSetAdURL("/_uac/adpage.html"); adSetUGC = 0;
adSetMOAT('1');
adSetSyncDelay('125');
htmlAdWHResponsive = function(m, w, h, t, dv, fn, ds, sz) {
	var winWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	mn;
	if (winWidth > 1024) {
		if (m.desktop) {
			mn = m.desktop;
		}
	} else if ((winWidth > 767) && (winWidth <= 1024)) {
		if (m.tablet) {
			mn = m.tablet;
		}
	} else {
		if (m.mobile) {
			mn = m.mobile;
		}
	}
	if (mn) {
		htmlAdWH(mn, w, h, t, dv, fn, ds, sz);
	}
};

$(function() {
	var timeCounter = 0;
	var gutterTimer = setInterval(function() {
		timeCounter++;
		if (timeCounter >= 100){
			clearInterval(gutterTimer);
		}
		if (typeof adsDevilAd !== "undefined") {
			clearInterval(gutterTimer);
			if (typeof adsDevilAd.ad !== "undefined") {
				$.each(adsDevilAd.ad,function(){
					if (this.aolFormat == "Wallpaper") {
						$("body").addClass("has-gutters");
						$(window).resize();
					}
				});
			}
		}
	},100);
	var backUpGutter = setTimeout(function(){
		if (typeof adsDevilAd !== "undefined") {
			clearInterval(gutterTimer);
			if (typeof adsDevilAd.ad !== "undefined") {
				$.each(adsDevilAd.ad,function() {
					if (this.aolFormat == "Wallpaper") {
						$("body").addClass("has-gutters");
						$(window).resize();
					}
				});
			}
		}
	}, 3000);
});
	
			 
				/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
	
			 
				(function(){
    window.gravityInsightsParams = {
        'type': 'content',
        'action': '',
        'site_guid': '6f188e340e03250e80e2e5e06948c85c'
    };
    var adServerReq,bUrl,cburl,doUseGravityUserGuid,includeJs,jq,pfurl,type,ug,wlPrefix,wlUrl,_ref,_ref1,_ref2;includeJs=function(a){var b;b=document.createElement("script");b.async=!0;b.src=a;a=document.getElementsByTagName("script")[0];return a.parentNode.insertBefore(b,a)};bUrl="https:"===document.location.protocol?"https://b-ssl.grvcdn.com/moth-min.js":"http://b.grvcdn.com/moth-min.js";ug=(doUseGravityUserGuid=!0===gravityInsightsParams.useGravityUserGuid?1:0)?"":gravityInsightsParams.user_guid||(null!=(_ref=/grvinsights=([^;]+)/.exec(document.cookie))?_ref[1]:void 0)||"";wlUrl=(wlPrefix="","");bUrl&&includeJs(bUrl);wlUrl&&(window.gravityInsightsParams.sidebar&&(window.gravityInsightsParams.wlStartTime=(new Date).getTime()),includeJs(wlUrl));
})();	
	