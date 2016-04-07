/**
 * The evideo global object is a small context/helper object
 * to help facilitate video delivery across eonline.com.
 *
 * It contains a few properties and utility methods to help
 * pages and widgets manage video playback.
 *
 * Most importantly, all video players are always initialized
 * with a call to evideo.initPlayer() to allow for a global
 * setup step.
 *
 * Also, on page load it runs a setup function to dynamically
 * create mediators for all video widgets on the page, as well as
 * intialize any links that are to open video lightboxes.
 *
 */

// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function() {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

//console.clear();

/**
 * Mostly EOL-specific environment info.
 * For browser detection, use $.browser.
 *
 */

(function() {


	var a = document.createElement("a");
	a.href = location.href.replace(/\/?$/, '/');

	var $eolenv = {};

	var ua = window.navigator.userAgent;
	var href = window.location.href;

	/** Boolean indicating if we are on iPad */
	$eolenv.isiPad = ua.match(/iPad/i) != null;

	/** Boolean indicating if we are on any type of iOS device */
	$eolenv.isiOS = (ua.match(/iPad|iPhone|iPod/i)) ? true : false;

	/** Boolean indicating if we are on any type of Android device */
	$eolenv.isAndroid = (ua.match(/android/i)) ? true : false;

	/** Boolean indicating if we are on any type of iOS or Android mobile device */
	$eolenv.isMobile = $eolenv.isiOS || $eolenv.isAndroid;

	/** Boolean indicating if we are being laoded inside a lightbox iframe */
	$eolenv.isLightboxWindow = href.match(/lightbox/i) != null;

	/** Boolean indicating if we are being loaded inside an embed iframe */
	$eolenv.isEmbedWindow = href.match(/\/videos\/embed\//i) != null;

	/** Boolean indicating if we are on the video landing page */
	$eolenv.isVideoLandingPage = (a.pathname == "/videos/")|| (a.pathname == "/mvc/hudson/videos/videoframe/");

	/** Boolean indicating if we are on a video detail page */
	$eolenv.isVideoDetailPage =  (href.match(/\/videos\/[0-9]+/) != null) || (href.match(/\/videos\/videoiframe\/[0-9]+/) != null);;

	/** Boolean indicating if we are on an article detail page */
	$eolenv.isArticleDetailPage =  (href.match(/\/news\/[0-9]+/) != null) || (href.match(/\/news\/article\/videoframe\/[0-9]+/) != null);


	$eolenv.edition =  eol.page.context.locale.edition;
	$eolenv.adEdition = eol.page.context.locale.advertisements;

	$eolenv.getPageType = function(){
		var pageType = '';
		if($eolenv.isVideoDetailPage){
			pageType = "video_detail"
		}else if($eolenv.isVideoLandingPage){
			pageType = "video_landing"
		}else if($eolenv.isArticleDetailPage){
			pageType = "article_detail"
		}else if($eolenv.isEmbedWindow){
			pageType = "embed"
		}else if($eolenv.isLightboxWindow){
			pageType = "lightbox"
		}

		return pageType;
	}

	window.$eolenv = $eolenv;
}());





// inheritance utils
function __hasProp(prop) {
	return {}["hasOwnProperty"](prop);
}

function __extends(child, parent) {
	for (var key in parent) {
		if (__hasProp["call"](parent, key))
			child[key] = parent[key];
	}
	function ctor() {
		this.constructor = child;
	}

	ctor.prototype = parent.prototype;
	child.prototype = new ctor;
	child.__super__ = parent.prototype;
	return child;
}





/**
 * LightboxConfig - When a section of a site (widget, page, etc) wants to open a video lightbox,
 * they first create LightboxConfigs containing info about the lightbox.
 *
 * Then, on page load, the evideo object will loop through all the configs and add click handlers
 * to open the lightbox to all the items in the $selectorObj.
 *
 *
 *
 * @param  {String}  selector           	A string containing a valid jquery selector for items to add click handlers to.
 *                                       	Each item in the collection is expected to have a data-video-id attribute,
 *                                       	which references the initial main video to display in the lightbox.
 * @param  {String}  primaryVideoId         The main video id to display in the lightbox.
 * @param  {String}  categoryKeyString      Optional, the page category id.
 * @param  {String}  relatedVideoIdsString  Optional, a list of related video ids to display in the lightbox's carousel.
 * @param  {Number}  windowWidth            Optional, the width of the lightbox window.
 * @param  {Number}  windowHeight           Optional, the height of the lightbox window.
 */
var LightboxConfig = function(selectorString, relatedVideoIdsString, categoryKeyString, windowWidth, windowHeight, playerNameString) {

	this.selector = selectorString;
	this.category = categoryKeyString;
	this.relatedVideoIds = relatedVideoIdsString;
	this.playerName = playerNameString;


	if (!isNaN(windowWidth)) {
		this.width = windowWidth;
	}
	if (!isNaN(windowHeight)) {
		this.height = windowHeight;
	}
}

LightboxConfig.prototype.selector = null;
LightboxConfig.prototype.category = null;
LightboxConfig.prototype.width = 940;
LightboxConfig.prototype.height = 620;
LightboxConfig.prototype.relatedVideoIds = '';
LightboxConfig.prototype.playerName = null;


/** Global function to retrieve query param value */
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}



// Namespace
console.debug("INTIALIZING EVIDEO OBJECT....");
var evideo = evideo || {};


/** Flash Player detection, borrowed from MediaElement.js */
// Core detector, plugins are added below
evideo.PluginDetector = {

	// main public function to test a plug version number PluginDetector.hasPluginVersion('flash',[9,0,125]);
	hasPluginVersion: function(plugin, v) {
		var pv = this.plugins[plugin];
		v[1] = v[1] || 0;
		v[2] = v[2] || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	},

	// cached values
	nav: window.navigator,
	ua: window.navigator.userAgent.toLowerCase(),

	// stored version numbers
	plugins: [],

	// runs detectPlugin() and stores the version number
	addPlugin: function(p, pluginName, mimeType, activeX, axDetect) {
		this.plugins[p] = this.detectPlugin(pluginName, mimeType, activeX, axDetect);
	},

	// get the version number from the mimetype (all but IE) or ActiveX (IE)
	detectPlugin: function(pluginName, mimeType, activeX, axDetect) {

		var version = [0,0,0],
			description,
			i,
			ax;

		// Firefox, Webkit, Opera
		if (typeof(this.nav.plugins) != 'undefined' && typeof this.nav.plugins[pluginName] == 'object') {
			description = this.nav.plugins[pluginName].description;
			if (description && !(typeof this.nav.mimeTypes != 'undefined' && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
				version = description.replace(pluginName, '').replace(/^\s+/,'').replace(/\sr/gi,'.').split('.');
				for (i=0; i<version.length; i++) {
					version[i] = parseInt(version[i].match(/\d+/), 10);
				}
			}
		// Internet Explorer / ActiveX
		} else if (typeof(window.ActiveXObject) != 'undefined') {
			try {
				ax = new ActiveXObject(activeX);
				if (ax) {
					version = axDetect(ax);
				}
			}
			catch (e) { }
		}
		return version;
	}
};

// Add Flash detection
evideo.PluginDetector.addPlugin('flash','Shockwave Flash','application/x-shockwave-flash','ShockwaveFlash.ShockwaveFlash', function(ax) {
	// adapted from SWFObject
	var version = [],
		d = ax.GetVariable("$version");
	if (d) {
		d = d.split(" ")[1].split(",");
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});



// Event types
evideo.VIDEO_PLAYER_INIT_SUCCESS = "evideo.VIDEO_PLAYER_INIT_SUCCESS";
evideo.VIDEO_PLAYER_INIT_ERROR = "evideo.VIDEO_PLAYER_INIT_ERROR";
evideo.VIDEO_SELECTED = "evideo.VIDEO_SELECTED";
evideo.VIDEO_ENDED = "evideo.VIDEO_ENDED";
evideo.COUNTDOWN_THUMB_CLICKED = "evideo.COUNTDOWN_THUMB_CLICKED";
evideo.COUNTDOWN_TIMER_COMPLETE = "evideo.COUNTDOWN_TIMER_COMPLETE";
evideo.RELATED_VIDEOS_CHANGED = "evideo.RELATED_VIDEOS_CHANGED";
evideo.RELATED_VIDEO_CLICK = "evideo.RELATED_VIDEO_CLICK";
evideo.EXPANDABLE_VIDEO_SELECTED = "evideo.EXPANDABLE_VIDEO_SELECTED";
evideo.EXPANDABLE_VIDEOS_LOADED = "evideo.EXPANDABLE_VIDEOS_LOADED";
evideo.RELATED_VIDEOS_COMPLETE = "evideo.RELATED_VIDEOS_COMPLETE";
evideo.AD_PREROLL_STARTED = "evideo.AD_PREROLL_STARTED";
evideo.AD_PREROLL_ENDED = "evideo.AD_PREROLL_ENDED";


// Storage for i18n strings.
// JSP code can store strings here for use in js.
evideo.strings = {};




if (typeof jQuery != 'undefined') {
	evideo.$ = jQuery;
}


// Widgets and pages that display videos will generate a JSON array
// of their VideoInfo JSON objects and add that array as a property
// of evideo.videos.
//
// For example, a particular widget would add an array of VideoInfos
// as evideo.videos.widgetXXX = [the VideoInfo array]
//
// The evideo.video object is only to allow the server side to push
// the VideoInfo objects to the client.
//
// On page load, the page/widget mediators add these objects
// to the evideo.pageVideosModel object, and client side js code always
// access the VideoInfos through there.
evideo.videos = {};

// Initialize a dummy object to act as a centralized event dispatcher.
var edispatcher = edispatcher || jQuery({});
evideo.dispatcher = edispatcher;

// Model for all of the VideoInfo objects on the page.
// Mediators access VideoInfo objects through this.
evideo.pageVideosModel = new PageVideosModel();

// Assign some freewheel-related global properties that
// were created before the evideo object was ready.
evideo.freewheelAdPolicy = eol_fw_ad_policy; // Paramter used in Player URLs
evideo.freewheelAdPolicyNum = eol_fw_ad_policy_num; // Paramter used in Release urls



/** Boolean indicating if we are on iPad */
evideo.isiPad = window.navigator.userAgent.match(/iPad/i) != null;

/** Boolean indicating if we are on any type of iOS device */
evideo.isiOS = (window.navigator.userAgent.match(/iPad|iPhone|iPod/i)) ? true : false;

/** Boolean indicating if we are on any type of Android device */
evideo.isAndroid = (window.navigator.userAgent.match(/android/i)) ? true : false;

evideo.isMobile = evideo.isiOS || evideo.isiPad || evideo.isAndroid;

evideo.hasFlash =  evideo.PluginDetector.hasPluginVersion('flash',[9,0,125])


/** Boolean indicating if we are being laoded inside a lightbox iframe */
evideo.isLightboxWindow = window.location.href.match(/lightbox/i) != null;

/** Boolean indicating if we are being laoded inside an embed iframe */
evideo.isEmbedWindow = window.location.href.match(/\/videos\/embed\//i) != null;

// flag for if the OnPlayerLoaded pdk event has been fired yet
evideo.playersLoaded = false;


evideo.lightboxConfigs = [];

// Set this to true to have a SeleniumVideoTracker auto-created for each video scope.
evideo.runTests = false;

// Mapping of SeleniumVideoTrackers to player instance ids.
evideo.seleniumTrackers = {};




/**
 * Static omniture info used when sharing a video.
 * I don't think this is currently in use anywhere.
 */
evideo.omniture = {
	facebook: {
		like: "trackShares|{'linkName:_widget:facebook_like_button'}",
		send: "trackShares|{'linkName:_widget:facebook_send_button'}"
	},
	twitter: "trackShares|{'linkName:_widget:twitter_tweet_button'}",
	google: "trackShares|{'linkName:_widget:google_plusone_button'}",
	email: {
		link: "trackShares|{'linkName:_widget:email_link'}",
		send: "trackShares|{'linkName:_widget:email_send_bttn'}",
		close: "trackShares|{'linkName:_widget:email_close_bttn'}"
	},
	embed: "trackShares|{'linkName:_widget:embed_code_button'}"
}



/**
 * Helper function for FreeWheel's fw_config() callback.
 * @param   {String}  siteSectionName  string indicating what page we're on, such as 'detail' or 'landing'
 * @param   {String}  categoryKey      Name of category, if applicable: 'kardashians', 'enews', etc
 * @return  {Object}  Configuration object to be used by the FreeWheel plugin.
 */
evideo.getFreewheelConfig = function(siteSectionName, categoryKey) {
	var loadObj = {};
	var useJS  = (evideo.isMobile || !evideo.hasFlash);

	loadObj.adManagerUrl =  useJS ? "http://adm.fwmrm.net/p/nbcu_e_html5_live/AdManager.js" : "http://adm.fwmrm.net/p/nbcu_e_flash_live/AdManager.swf";
	loadObj.siteSectionId = evideo.getSiteSectionId(siteSectionName, categoryKey);

	if (getQueryVariable('fwtest') == '1') {
		loadObj.networkId = "171224";
		loadObj.playerProfile = useJS ? "171224:e_js_live" : "171224:e_as3_live";
		loadObj.serverUrl = "http://29cd8.v.fwmrm.net";
		loadObj.siteSectionNetworkId = "171224";
		loadObj.videoAssetNetworkId = "171224";
		loadObj.customIdField = "advertisingID";

	} else {
		loadObj.networkId = "169843";
		loadObj.playerProfile = useJS ? "169843:e_js_live" : "169843:e_as3_live";
		loadObj.serverUrl = "http://29773.v.fwmrm.net";
		loadObj.siteSectionNetworkId = "169843";
		loadObj.videoAssetNetworkId = "169843";
		loadObj.customIdField = "advertisingID";
	}
	console.log("RETURNING FREEWHEEL CONFIG : ", loadObj);
	return loadObj;
}


/**
 * Utility method to help dynamically create a site section id at runtime
 * @param   {String}   page         string indicating what page we're on, such as 'detail' or 'landing'
 * @param   {String}   categoryKey  Name of category, if applicable: 'kardashians', 'enews', etc
 * @param   {String}   adEdition    The ad edition of the site.
 * @param   {Boolean}  isTablet     Flag indicating if we are on iPad or not.
 * @param   {String}   edition      The current site edition
 *
 *  @return  {String}   The generated SSID.
 */
evideo.getSiteSectionId = function(page, categoryKey, adEdition, isTablet, edition) {

	var value = "e_online_";

	if (!adEdition || adEdition == '') {
		adEdition = eol.page.context.locale.advertisements;
	}

	if (isTablet !== true || isTablet !== false) {
		isTablet = evideo.isiPad;
	}

	if (adEdition === "us") {
		if (page === "embed") value += "embed_off_domain_vod";
		else if (categoryKey) value += (categoryKey + "_vod");
		else if (page === "lightbox") value += "lightbox_vod";
		else if (page === "homepage") value += "homepage_vod";
		else if (page === "detail") value += "detail_vod";
		else if (page === "landing") value += "landing_vod";
		else {
			//Should specify a default here
		}
	} else if (adEdition === "ooc" && edition === "uk") {
		value += ("vod_ooc_uk_site_edition");
	} else if(adEdition === "la") {
		value += ("vod_ooc"); //specifically for adEdition = la, overwrite to OOC
	}
	else value += ("vod_" + adEdition);
	//TABLET
	if (isTablet === "true" || isTablet == true) value += "_tab";

	return value;
}


/**
 * When a widget wants to open a video lightbox,
 * The widget's generated html will inclide a script tag
 * that will add a LightboxConfig object here.
 *
 * On page load, evideo.initLightboxLinks() is called and the
 * click handlers are configured.
 *
 * @param {LightboxConfig} lightboxConfig
 */
evideo.addLightboxConfig = function(lightboxConfig) {
	evideo.lightboxConfigs.push(lightboxConfig);
}


/**
 * Loops through all the LightboxConfigs and adds click listeners to open a lightbox.
 */
evideo.initLightboxLinks = function() {
	console.log("INITIALIZING " + evideo.lightboxConfigs.length + " LIGHTBOX CONFIGS...");
	var lbConfig;
	var $ = jQuery;

	$.each(evideo.lightboxConfigs, function(index, lbConfig) {

		var $links = $(lbConfig.selector);
		$(lbConfig.selector).on('click touchstart', function(event) {
			console.log("LIGHTBOX LINK CLICKED...");
			event.preventDefault();
			var url = $(this).attr('data-url');

			if (url && url.substring(0,2) == '//') {
				url = url.substring(1);
			}

			var port = (evideo.port != '80' && evideo.domain != 'localhost:8080') ? ':'+evideo.port : '';
			var lightboxURL = "http://" + evideo.domain + port + url;

			if(typeof($pdk) != 'undefined'){
				$pdk.controller.pause(true, ['*']);
			}

			$.colorbox({
				opacity:0.8,
				href: lightboxURL,
				width: lbConfig.width,
				height: lbConfig.height,
				iframe: true,
				fixed: true,
				scrolling:false,
				overlayClose:!(evideo.isiPad)
			});
			return false;
		});
	});
}

/**
 * Generates a video's release url for either iPad or desktop, with necessary query params
 * @param  {String} videoInfo The VideoInfo object of the selected video
 * @return {String}           The generated release url
 */
evideo.getReleaseUrl = function (videoInfo) {
	/* Deprecated, old implementation of videos on iPad -
	   var releaseId = evideo.isiPad ? videoInfo.ipadReleaseId : videoInfo.flvReleaseId; */
	var releaseId = evideo.isiPad ? videoInfo.mediaPublicId : videoInfo.flvReleaseId,
		releaseURL;

	if(evideo.isiPad){
		// Uses URI format to query by mediaPublicId query format"
		releaseURL = "http://link.theplatform.com/s/BdHJDC/media/"+releaseId+"?policy="+evideo.freewheelAdPolicyNum;
	}
	else { 
		releaseURL = "http://link.theplatform.com/s/BdHJDC/"+releaseId+"?policy="+evideo.freewheelAdPolicyNum;
	}
	console.log("returning release url : ", releaseURL);
	return releaseURL;
}


/**
 * Generates the Player Service URL, which is used as the src value in a script tag.
 * This script tag is where the player will appear.
 *
 * @param  {Object} info Object containing parameters used to generate the url.
 * @return {String}      The URL to the video player.
 */
evideo.getPlayerURL = function (info) {
	var videoInfo = info.videoInfo;
	var playerName = info.playerName;
	var instanceName = info.instanceName;
	var autoPlay = info.autoPlay;
	var releaseId = evideo.isiPad ? videoInfo.ipadReleaseId : videoInfo.flvReleaseId;

	return "http://player.theplatform.com/p/BdHJDC/"+playerName+"/select/"+releaseId+
			"?form=javascript&feedParams=entries%3Dfalse&instance="+instanceName+"&autoPlay="+autoPlay+"&params="+evideo.freewheelAdPolicy;
}


/**
 * Perform setup work common to all players.
 * This method is called from a $pdk.ready() handler.
 * @param  {Object} info
 */
evideo.initPlayer = function (info) {
	var videoInfo = info.videoInfo;
	var scope = info.scope;

	var edition = eol.page.context.locale.edition;

	if(edition.toLowerCase() == "ca"){
		new KruxVideoTracker(scope);
	}

	if(!evideo.isiPad){
		//$pdk.controller.useDefaultPlayOverlay(false, [scope]);
	}

	if(evideo.runTests){
		evideo.seleniumTrackers[scope] = new SeleniumVideoTracker(scope);
	}
}


/**
 * Helper method for Selenium tests
 * @param   {String}  scope  Opetional video player scope to get logs for.  Defaults to all if no scope provided.
 * @return  {Array} Array of log lines.
 */
evideo.getSeleniumLogs = function (scope) {

	 var outputArray = [];

	if(scope == null){
		jQuery.each(evideo.seleniumTrackers, function(index, val) {
			logArray = val.getLog();
			outputArray = outputArray.concat(logArray);
			jQuery.each(logArray, function(index, logObj) {
				//console.info(logObj.scope +", "+logObj.guid+", "+logObj.eventName)
			});

		});
	}else{
		var tracker = evideo.seleniumTrackers[scope];
		outputArray = tracker.getLog();
		console.log(outputArray);
		return outputArray;
	}

}

/**
 * Creates a mediator for every widget with the class name "eol-mediated-widget".
 */
evideo.initWidgetMediators = function () {
	var $ = jQuery;
	$widgets = $('.eol-mediated-widget');

	console.log("INITIALIZING "+$widgets.length+" WIDGET MEDIATORS...");

	var mediatorType;

	$widgets.each(function(index, el) {
		mediatorType = $(el).attr('data-eol-mediator-type');
		console.log("MEDIATOR TYPE : "+ mediatorType);

		var mediator = new evideo.mediatorMap[mediatorType](el);
		console.log("MEDIATOR TYPE : "+ mediatorType);
		console.log("MEDIATOR : "+ mediator);

	});
}




/** Initialize lightbox links on page load */
jQuery(document).ready(function($) {

	// We don't load mediators within the lightbox or embed iframes.
	if(!evideo.isLightboxWindow && !evideo.isEmbedWindow){
		// maps widget types to widget mediators

		evideo.mediatorMap = {
			v1:V1WidgetMediator,
			v2:V2WidgetMediator,
			v3:V3WidgetMediator,
			v10:V10WidgetMediator,
			v11:V11WidgetMediator,
			m2:M2WidgetMediator,
			m12:M12WidgetMediator,
			m13:M13WidgetMediator
		};


		evideo.initWidgetMediators();
	}


	evideo.initLightboxLinks();


	//The $pdk variable may not exist if there are no videos embedded in the page.
	if(typeof($pdk) != 'undefined'){

		$pdk.ready(function() {
			console.debug("****EVIDEO PDK READY****");
			$pdk.controller.addEventListener("OnPlayerLoaded", function(commInfos){
				evideo.playersLoaded = true;
			});

			 if(!evideo.isiPad && !$("body").attr("id")=="detail"){// let videos on article detail pages have multiple instances play at the same time
			 	new OneVideoAtATimeManager();
			 }
		});

	}


});





