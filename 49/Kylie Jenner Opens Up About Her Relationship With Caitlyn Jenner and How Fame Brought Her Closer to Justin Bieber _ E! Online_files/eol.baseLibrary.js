/* Purpose: Base Eonline Library
 * Author: @briankueck 
 * Include: <script src="baseLibrary.js"></script> into your <head> block.
 * Notes: 
 *  1. This is a self-loading root class, which acts as the "Global" JS Object. All other class files will inherit these base functions.
 *  2. We don't need to use 10 copies of fb() or getData() or setData() in each widget object, in order to use the same functions in those objects.
 *  3. We can add global functions here, which all other widget objects will inherit via our custom written Function prototypes chains/scope.
 * Usage: eol.yourWidgetClassName.getData(json); NOT eol.baseLibrary.getData(json);
 */

/* LAZYLOAD	eonline.lazyLoad.init('cookies,firebug,userAgent'); */

/*** Initialize Blank Objects ***/
if (typeof(eol) === 'undefined') var eol = {}; // Same as window.eonline. Creates a new blank eol root name-spaced object.
if (typeof(eol.classes) === 'undefined') eol.classes = {}; // Creates a new blank Classes object.
if (typeof(eol.fn) === 'undefined') eol.fn = {};  // Creates a new blank Function object.

/*** Class = JSON Object of Functions ***/
eol.classes.BaseLibrary = { // This is a Class, not a function! Classes allow for individually compartmentalized data scopes/spaces. Functions share the same data scope/space. Note that the jQuery(document).ready code is part of the init function.

	/*** DATA ***/

	"oCookies": {
		"cookieName1": "zoomClientWidth",
		"cookieName2": "zoomPercentage"
	},

	"oConfig": {
	},

	"oData": {
		"initialClientWidth": null,
		"zoomPercentage": null
	},

	"oDebug": {
		"all": false,
		"dataBind": false,
		"fnTrace": false,
		"zoomPercentage": false
	},

	"DOM": {
		"id": {
			
		},
		"class": {
			
		}
	},

	/*** FUNCTIONS ***/
	/* Format is: "jsonLabel": function fnName(parms) {...}, which uses Names functions instead of Anonymous functions. 
	 * Named functions allow you to count how many times that each function is being used, for advanced optimization purposes. 
	 * Anonymous functions won't let you do that.
	 * Named functions also allow us to use short function names internally, like "trim()" and object chains externally, like "someObj.trim();"
	 */

	/*** Initialization & Cleanup Functions ***/

	/*destroy: function destroy() { // Destructor
	},*/

	/* This probably won't be used. These functions are inherited by all other sub-objects, which should have their own init() functions.
	"init": function init() { // Constructor
		jQuery(document).ready(function($) {
			
		});
	},*/

	/*** Data Access Functions ***/

	"getData": function getData(key, iWidgetId) {
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn: getData'); }
		// Allows for any of the data from the Core JSON object to be returned.
		key = key.replace('oData.','');
		//log(obj);
		if (key.indexOf('.') > -1) {
			var arrPieces = key.split('.');
			var dataObject = _getDataObject(arrPieces[0], iWidgetId);
			for (var i=0, j=arrPieces.length-1; i<=j; i++) {
				dataObject = dataObject[arrPieces[i]];
			}
		} else {
			data = obj.oData[key];
		}
		return data;
	},

	"getDataObject": function getDataObject(key, iWidgetId) {
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn: getDataObject'); }
		var dataObject = null;
		switch (key) {
			case 'oConfig':
				dataObject = obj.oConfig;
			break;
			case 'oData':
				dataObject = obj.oData;
			break;
			case 'oDebug':
				dataObject = obj.oDebug;
			break;
			case 'dom':
			case 'Dom':
			case 'DOM':
			case 'oDom':
			case 'oDOM':
				dataObject = obj.DOM;
			break;
			default:
				dataObject = obj.oData;
			break;
		}
		return dataObject;
	},

	"setData": function setData(sKey, data, iWidgetId) {
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn setData'); }
		if (obj.oDebug.all || obj.oDebug.dataBind) { log('Before setData: oData.' + sKey + ': ' + obj.oData[sKey]); }
		//log(typeof(obj.oData[sKey]));
		if (typeof(obj.oData[sKey]) === 'array') {
			/* Both of these functions will "chain the arrays together like box cars on a train" rather than interlace them based on the sPandaIdOrGuid values, which is what we want.
			//This jQuery function will fill in 200K "undefined" objects: // oData[sKey] = $.merge(oData[sKey], data); // The data could be an array, a string, an integer, a floating point number, an object or a JSON object.
			//obj.oData[sKey] = obj.oData[sKey].concat(data); // This native JS will only add the 24 objects, which we want. 
			*/
			// So we have to build our custom interlaced array merge function here.....
			for (var i=0, j=data.length; i<j; i++) {
				if (data[i]) {
					var iPandaId = parseInt(data[i].sPandaIdOrGuid);
					obj.oData[sKey][iPandaId] = data[i];
				}
			}
		} else if (sKey.indexOf('.') > -1) {
			var arrPieces = key.split('.');
			//var dataObject = _getDataObject(arrPieces[0]);
			obj[arrPieces[0]][sKey] = data;
		} else {
			obj.oData[sKey] = data;
		}
		if (obj.oDebug.all || obj.oDebug.dataBind) { log('After setData: oData.' + sKey + ': ' + obj.oData[sKey]); }
	},

	/*** Debug Functions ***/

	"getDebug": function getDebug(key, iWidgetId) {
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn: getDebug'); }
		if (key.indexOf('oDebug.') === -1) {
			key = 'oDebug.' + key;
		}
		return _getData(key);
	},

	"setDebug": function setDebug(key, value, iWidgetId) {
		// This will allow us to use the debugging console to set values, in non-localhost server environments.
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn setDebug'); }
		this.oDebug[key] = value;
		return false;
	},

	"showDebug": function showDebug(iWidgetId) {
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn showDebug'); }
		//this.oDebug.?? = true;
		log(this.oDebug);
		//this.oDebug.?? = false;
		return false;
	},

	"toggleDebug": function toggleDebug() {
		/* We also need to be able to use ?key=value&key=value pairs to toggle debugging values on/off, in non-localhost server environments.
		 * So eventually, we'll be able to use something like: http://www.eonline.com?toggleDebug=key|key|key to toggle multiple options on.
		 */
		var qs = location.search;
		var kvPairs = qs.split('&');
		for (var i=0, j=kvPairs.length; i<j; i++) {
			if (kvPairs[i].indexOf('toggleDebug') > -1) {
				var debugKeys = kvPairs[i].replace('toggleDebug=','').split('|');
				for (var m=0, n=debugKeys.length; m<n; m++) {
					_setDebug(debugKeys[m], 'true', null); // To do: Debug the need for the "obj = this.getObject(iWidgetId);" code.
				}
				break;
			}
		}
	},

	/*** Misc Functions ***/

	"getObject": function getObject(iWidgetId) {
		var obj = (typeof iWidgetId !== 'undefined') ? eol.widget.xx[iWidgetId] : this;
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn: getObject'); }
		return obj;
	},

	"resetValues": function resetValues(oModelData) { // Reset all values in an object.
		obj = this.getObject();
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn resetValues'); }
		for (var sKey in oModelData) {
			oModelData[sKey] = false; // Don't use resetFlag() here, as that uses strings & this uses objects.
		}
		return oModelData;
	},

	/*** Trim Functions ***/

	"trim": function trim(string, iWidgetId) {
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn trim'); }
		return $.trim(string);
	},

	"trimLeft": function trimLeft(string, iWidgetId) { // jQuery doesn't have this.
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn trimLeft'); }
		return string.replace(/^\s+/,'');
	},

	"trimRight": function trimRight(string, iWidgetId) { // jQuery doesn't have this.
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn trimRight'); }
		return string.replace(/\s+$/,'');
	},

	"ltrim": function ltrim(string, iWidgetId) { // Maps into trimLeft() above. jQuery doesn't have this.
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn ltrim'); }
		return trimLeft(string);
	},

	"rtrim": function rtrim(string, iWidgetId) { // Maps into trimRight() above. jQuery doesn't have this.
		obj = this.getObject(iWidgetId);
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn rtrim'); }
		return trimRight(string);
	},

	/*** Zoom Functions ***/

	"getClientWidth": function getClientWidth() {
		obj = this.getObject();
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn: getClientWidth'); }

		var clientWidth = document.documentElement.clientWidth;

		if (obj.oDebug.all || obj.oDebug.zoomPercentage) { log('clientWidth: ' + clientWidth); }
		return clientWidth;
	},

	"getZoomPercentage": function getZoomPercentage(canCreateCookie) {
		obj = this.getObject();
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn: getZoomPercentage'); }

		// Which grabs the new pixel width.
		var newWidth = obj.getClientWidth();

		// Then divides the initial width, by the new width... multiplies it by 100 & then rounds off the remainder.
		if (obj.oDebug.all || obj.oDebug.zoomPercentage) { 
			log('obj.oData.initialClientWidth: ' + obj.oData.initialClientWidth + '%');
			log('newWidth: ' + newWidth + '%');
		}
		obj.oData.zoomPercentage = Math.round((obj.oData.initialClientWidth / newWidth) * 100);

		// Shows the ratio, which matches what's in Chrome!
		if (obj.oDebug.all || obj.oDebug.zoomPercentage) { log('zoom percentage: ' + obj.oData.zoomPercentage + '%'); }

		if (canCreateCookie) {
			// Cookie it, so that it can be read on the next page load.
			createCookie(obj.oCookies.cookieName2, obj.oData.zoomPercentage, 1);
		}

		return obj.oData.zoomPercentage;
	},

	"loadZoomCookies": function loadZoomCookies() {
		obj = this.getObject();
		if (obj.oDebug.all || obj.oDebug.fnTrace) { log('fn: loadZoomCookies'); }

		// Gets the Initial Pixel Width Setting on Page Loads. Assumes that the user arrives with a default 100% zoom setting.
		var cookieWidth = readCookie(obj.oCookies.cookieName1);
		var cookieZoomPercentage = readCookie(obj.oCookies.cookieName2);
		if (cookieWidth && cookieZoomPercentage) {
			if (obj.oDebug.all || obj.oDebug.zoomPercentage) { 
				log('cookie found!');
				log('cookieWidth: ' + cookieWidth);
				log('cookieZoomPercentage: ' + cookieZoomPercentage);
			}
			obj.oData.initialClientWidth = cookieWidth;
		} else {
			if (obj.oDebug.all || obj.oDebug.zoomPercentage) { 
				log('cookie not found');
			}
			obj.oData.initialClientWidth = obj.getClientWidth();
			obj.oData.zoomPercentage = 100;

			// Cookie it, so that it can be read on the next page load.
			createCookie(obj.oCookies.cookieName1, obj.oData.initialClientWidth, 1);
			createCookie(obj.oCookies.cookieName2, 100, 1);

		}
	},

	/*** Null/Undefined Checking Functions ***/

	"isDefined": function isDefined(data) {
		return !(typeof data === typeof undefined);
	},

	"isEmpty": function isEmpty(data) {
		return ((typeof data === typeof undefined) || (typeof data === typeof null));
	},

	"isNull": function isNull(data) {
		return (typeof data === typeof null);
	},

	"isUndefined": function isUndefined(data) {
		return (typeof data === typeof undefined);
	}
};

/*** Constructor ***/
if (typeof(eol.fn.BaseLibrary) === 'undefined') {
	// Automatically creates the new object.
	eol.fn.BaseLibrary = function() {}; // Instantiates a function from the class.
	eol.fn.BaseLibrary.prototype = eol.classes.BaseLibrary; // Applies the class to the function, as it's function prototype.
}

if (typeof(eol.baseLibrary) === 'undefined') {
	eol.baseLibrary = new eol.fn.BaseLibrary(); // Instantiates a new object from the class.
	eonline.baseLibrary = eol.baseLibrary; // Prod Chelsea Lately News Detail Video HotFix for a strange Asynchronous Race Condition.

	// These are global functions. Don't prefix them with "var", which will make them into local functions!
	isDefined = eol.baseLibrary.isDefined;
	isEmpty = eol.baseLibrary.isEmpty;
	isNull = eol.baseLibrary.isNull;
	isUndefined = eol.baseLibrary.isUndefined;
}

/*** Resets Debugging Switches ***/
if (!isLocalhost) {
	/* Turns off all debugging options, which someone might have accidentally left on... when they checked code changes in.
	 * Safe-guard to turn off all debugging options on all non-localhost servers, in-case developers accidently leave them turned on.
	 */
	eol.baseLibrary.oDebug = eol.baseLibrary.resetValues(eol.baseLibrary.oDebug);
}
