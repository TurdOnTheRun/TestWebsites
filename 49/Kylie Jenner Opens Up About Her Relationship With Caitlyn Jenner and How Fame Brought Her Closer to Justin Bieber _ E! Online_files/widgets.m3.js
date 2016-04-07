// Author: @briankueck Tweet: @eDevelopers1
// Requires widgets.js to be loaded 1st.

eonline = (typeof(eonline) !== 'undefined') ? eonline : {};
eonline.widgets = (typeof(eonline.widgets) !== 'undefined') ? eonline.widgets : {};
eonline.widgets.m3 = (function($) {

	var model = {
		"debug": {
			"all": false,
			"fnTrace": false,
			"videoEnded": false
		},
		"config": {
			"programName": "eonline.widgets.m3",
			"thresholds": {
				"title": {
					"smallToMedium": 42,
					"mediumToLarge": 58
				},
				"subHeadline": {
					"smallToMedium": 83,
					"mediumToLarge": 100
				}
			}
		}
	};

	/*** This is for M3 Specific Widget Code. For most of the code, which the M2 widget also uses, see this file:  /resources/widgets/js/shared/m-widgets/slideshows.js ***/

	function callback(switchKey, json) {
		traceRoute(model, 'callback');
		eonline.widgets.slideshows.callback(switchKey, json);
	}

	function getData(strKey) {
		traceRoute(model, 'getData');

		// Allows for any of the data from the Core JSON object to be returned.
		strKey = strKey.replace('model.','');
		var arrKeyParts = strKey.split('.');
		var data = model;
		for (var i=0, j=arrKeyParts.length-1; i<=j; i++) {
			data = data[arrKeyParts[i]];
		}
		return data;
	}

	function init(json) {
		traceRoute(model, 'init');
	}

	return { // Exposes Public Function Names
		"callback": callback,
		"getData": getData,
		"init": init
	};
})(jQuery);
