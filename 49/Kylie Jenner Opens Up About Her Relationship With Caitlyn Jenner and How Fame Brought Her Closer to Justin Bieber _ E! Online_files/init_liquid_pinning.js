if(typeof lp_global !== 'undefined') {
	lp_global.InitializeLayout();
}

function lp_resize(strDebug) {
	if(typeof lp_global !== "undefined"){
		lp_global.AdjustLayout(false, true); // <-- 1 of 4: The video problem in EONLINE-1829 comes from this function to AdjustLayout!
	}
}

// Delays re-rendering of the page layout until after the fonts are loaded into Chrome. This only runs on the 1st-time visit to www.eonline.com.
try {
	if (typeof(isChrome) === 'undefined') {
		var ua = navigator.userAgent;
		var isChrome = (ua.match(/Chrome/i)) ? true : false;
	}
	if (isChrome) {
		var strCookieKey = 'areEolFontsLoadedInChrome';
		var cookie = readCookie(strCookieKey);
		if (!cookie) { // First-time Chrome visitor check
			setTimeout(function() { // Timer to allow the fonts to finish downloading in Chrome.
				lp_resize('First Time Chrome Users'); // Repaints the liquid layout one time on the initial page load in Chrome, to fix widget gaps which are due to the non-loaded font files. This runs the same resizing code as below.
				createCookie(strCookieKey, true, 365); // The font-files will be cached by the server-side code for 1 year. Sets a cookie to skip repainting the initial liquid layout for that timeframe.
			},1000);
		}
	}
} catch(e){}

jQuery(window).resize(function () {
	lp_resize('Max Column Changes');
	// For debugging purposes, turn this on & resize the page:
	// lp_global.GetColumnCount(true);
});
