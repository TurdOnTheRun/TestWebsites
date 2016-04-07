// Nielsen Online SiteCensus 6.0 Ad Tracking Code.
// Implementation by: @briankueck. Contact: @eDevelopers1 on Twitter.

if (typeof(eonline) === 'undefined') { eonline = {}; }
if (typeof(eonline.nielsen) === 'undefined') { eonline.nielsen = {}; }

eonline.nielsen = (function($) {

	// Firebug Log.
	function fbl(str, useDebug) { // Cross-browser object-detection-wrapped console.log function, with a debug=Nielsen URL permission check.
		if ((typeof(console) !== 'undefined') && (typeof(console.log) !== 'undefined') && (useDebug)) {
			console.log(str);
		}
	}

	// Not currently used, but clearly illustrates which events that the Ajax calls should be using.
	// Ajax Example: http://www.nielsenonlinesupport.com/digital-am/ajax-example/index.html
	function ajaxEvent(edition, useDebug) {
		fbl('fn eonline.nielsen.ajaxEvent', useDebug);
		standardEvent(edition, useDebug);
	}

	function getCid(edition, useDebug) {
		fbl('fn eonline.nielsen.getCid', useDebug);
		switch(edition) {
			case 'au':
				var cid = 'mcn';
			break;
			/*case 'nz':
				var cid = 'nz-adhub';
			break;*/
			default:
				var cid = 'us-505504h';
			break;
		}
		fbl('cid=' + cid, useDebug);
		return cid;
	}

	function getCg(edition, useDebug) {
		fbl('fn eonline.nielsen.getCg', useDebug);
		switch(edition) {
			case 'au':
				var cg = 'eonline';
			break;
			default:
				var cg = '0';
			break;
		}
		fbl('cg=' + cg, useDebug);
		return cg;
	}

	// The NSE is used for our EOL Photo Gallery's HTML 5 Template System. It's not a pure-Ajax call, because it pulls templates from hidden rendered DOM code.
	// NSE Example: http://www.nielsenonlinesupport.com/digital-am/nse/index.html
	function nonStandardEvent(edition, useDebug) {
		fbl('fn eonline.nielsen.nonStandardEvent', useDebug);
		var cg = getCg(edition, useDebug);
		var cid = getCid(edition, useDebug);
		var pvar = { 
			"cg": cg,
			"cid": cid,
			"content": "event",
			"server": "secure-" + edition
		};
		var trac = nol_t(pvar);
		trac.record().post();
	}

	// The SE is used for Global Footer code & Ajax Calls:
	function standardEvent(edition, useDebug) {
		fbl('fn eonline.nielsen.standardEvent', useDebug);
		var cg = getCg(edition, useDebug);
		var cid = getCid(edition, useDebug);
		var d = new Image(1, 1);
			d.onerror = d.onload = function () { d.onerror = d.onload = null; };
			d.src = ['//secure-' + edition + '.imrworldwide.com/cgi-bin/m?ci=' + cid + '&cg=' + cg + '&cc=1&si=',
				escape(window.location.href), '&rp=', escape(document.referrer), 
				'&ts=compact&c0=usergen,1&rnd=',(new Date()).getTime()].join('');
	}

	return {
		// Exposes Public Function Names
		"ajaxEvent": ajaxEvent,
		"fbl": fbl,
		"nonStandardEvent": nonStandardEvent,
		"standardEvent": standardEvent
	}
})(jQuery);
