/*  Version 2.0 - E! Global jQuery Omniture Link Tracking - eol.globalClickTracker.js
 *  Copyright ? 2012-13 E! Entertainment Television, LLC. 
 *  A Division of NBCUniversal.
 */

// Append ?debug=Omniture or &debug=Omniture to any URL.
var debugOmniture = (location.search.toLowerCase().indexOf('debug=omniture') > -1);

// Usage Example 1: <a href="..." data-omniture="...">...</a>
// Usage Example 2: <a href="..." data-omniture='trackLink|{"linkName":"..."}'>...</a>
// Note: The "linkName" value maps into eVar17. So put all of your page:page:page values, into the linkName variable's value.
// Everything else, will be mapped into the json object.
// This is the default function.
function trackLink(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'NONE';
	s.linkTrackEvents = json.linkTrackEvents || 'NONE';
	s.eVar17=linkName;
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName);
}

// Generic function to accept a custom list of values to map
function trackElement(lnk, json) {
	var linkName;
	var copyJson = jQuery.extend({},{}, json);

	s.eVar17 = s.eVar17 || '';
	s.linkTrackVars = 'events,products,eVar4,';
	copyJson.linkName != undefined ? linkName = copyJson.linkName : linkName = "";
	// if trackEvents param is not defined use default event 21
	copyJson.trackEvents != undefined ? s.linkTrackEvents = copyJson.trackEvents : s.linkTrackEvents = 'event21';
	copyJson.products != undefined ? s.products = copyJson.products : s.products = linkName+';;;event21;';
		
	s.events = s.linkTrackEvents;
	// Delete linkName & trackEvents & products from the object so that we can assign the eVars & props (no longer needed in the copyJson object)
	
	delete copyJson.linkName;
	delete copyJson.trackEvents;
	delete copyJson.products;

	var length = Object.keys(copyJson).length,
		index = 0;

	jQuery.each(copyJson, function (key, value) {
		index++;
		// If we are NOT in the last key then add a comma to sepatate the events tracked
		index == length ? s.linkTrackVars += key : s.linkTrackVars += key+',';
	});
	// Assign the eVar / prop values to the s object ex. s["eVar17"] = "widgetName:linkText";
	jQuery.each(copyJson, function (key, value) {
		s[key] = value;
	});

	if (debugOmniture) { console.log(s); }
	s.tl(lnk, 'o', linkName);
}

/* Example for Mobile to use: <a href="..." data-omniture='mobilePhotoGallery|{"linkName":"...","event2":"...","prop15":"...","prop38":"...","prop52":"..."}'>...</a>
function mobilePhotoGallery() {
	s.linkTrackVars = json.linkTrackVars || 'events,prop15,prop52,prop38';
	s.linkTrackEvents = json.linkTrackEvents || 'event2';
	s.event2=??;
	s.prop15=??;
	s.prop38=??;
	s.prop52=??;
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName);
}
*/

// Usage Example: <a href="..." data-omniture='trackLink2|{"linkName":"...","linkTrackVars":"...","linkTrackEvents":"...","prop1":"...","events":"..."}'>...</a>
function trackLink2(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'prop1,events';
	s.linkTrackEvents = json.linkTrackEvents || 'event1';
	s.prop1 = json.prop1 || 'Prop 1 Value';
	s.events = json.events || 'event1';
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName);
}


// Usage Example: <a href="..." data-omniture='trackGlobalNav|{"linkName":"...","eVar4":"...","eVar16":"...","eVar21":"...","eVar30":"..."}'>...</a>
// Note: The "linkName" value maps into eVar17. So put all of your page:page:page values, into the linkName variable's value.
// Everything else, will be mapped into the json object.
function trackGlobalNav(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'events,eVar4,eVar17,eVar16,eVar30';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events=json.events || 'event21';
	s.eVar17=linkName;
	s.eVar4=json.eVar4 || '';
	s.eVar16=json.eVar16 || '';
	s.eVar30=json.eVar30 || '';
	s.tl(lnk, 'o', linkName);
}
function trackGlobalNav_Ver2(lnk, linkName, json) {  
	s.linkTrackVars = json.linkTrackVars || 'events,eVar4,eVar17,eVar16,prop17';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events=json.events || 'event21';
	s.eVar17=json.navtype +":"+json.navitem+":"+json.navurl || ''; //navigation types eg. top navigation or collapsed navigation 
	s.eVar4= json.pg || ''; //pagename
	s.eVar16=json.navtype+":"+json.navitem || ''; 
	s.prop17=json.navtype+":nav-item:"+json.navitem || ''; 
	s.tl(lnk, 'o', linkName);
}

// Usage Example: <a href="..." data-omniture='trackBrowserUpdate|{"linkName":"...","eVar4":"...","eVar16":"...","eVar30":"...","eVar21":"..."}'>...</a>
// Note: The "linkName" value maps into eVar17. So put all of your page:page:page values, into the linkName variable's value.
// Everything else, will be mapped into the json object.
function trackBrowserUpdate(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'events,eVar4,eVar17,eVar16,eVar30';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events=json.events || 'event21';
	s.eVar17=linkName;
	s.eVar4=json.eVar4 || '';
	s.eVar16=json.eVar16 || '';
	s.eVar30=json.eVar30 || '';
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName);
}

// Usage Example 1: <a href="..." data-omniture='takeOverCampaign|{"linkName":"..."}'>...</a>
// Usage Example 2: <a href="..." data-omniture='takeOverCampaign|{"linkName":"...", "prop27":"..."}'>...</a>
// Note: The "linkName" value maps into eVar17. So put all of your page:page:page values, into the linkName variable's value.
// Everything else, will be mapped into the json object. Since prop27 is = eVar17 you can use linkName for both values, like Example 1. 
// Or you can have separate eVar17 & prop27 values, by passing them both in using Example 2.
/*function takeOverCampaign(lnk, linkName, json) { // New, but not yet used. Enable if needed.
	s.linkTrackVars = json.linkTrackVars || 'eVar17,prop27';
	s.linkTrackEvents = json.linkTrackEvents || 'NONE';
	s.eVar17 = linkName;
	s.prop27 = json.prop27 || linkName;
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName);
} */

// This is the same code as trackLink above. It's simply a pass-through function.
function trackShares(lnk, linkName, json) {
	trackLink(lnk, linkName, json);
}

// This appears to be no longer used. Double-check before removing it.
function trackColumnLayout(json) {
	s.linkTrackVars = json.linkTrackVars || 'prop57,eVar57';
	s.linkTrackEvents = json.linkTrackEvents || 'NONE';
	s.prop57 = json.prop57 || '5';
	s.eVar57 = json.eVar57 || '5';
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(' ','o','column resize');
}

/* This is an onPageLoad tracking function, not a link click tracking function.
 * Usage: trackVideoPlayer('frontdoor_live', 'att', 'live:lrc-2013-oscars'); 
 *    Or: trackVideoPlayer({"playerName":"frontdoor_live_embed","sponsorName":"att","videoName":"live:lrc-2013-oscars"});
 */
function trackVideoPlayer(jsonDataOrPlayerName, sponsorName, videoName) {
	// playerName is overloaded as a json object. It can also be a string.
	// Get values from json or from strings.
	if (typeof(jsonDataOrPlayerName) === 'object') {
		var playerName = jsonDataOrPlayerName.playerName;
		sponsorName = jsonDataOrPlayerName.sponsorName;
		videoName = jsonDataOrPlayerName.videoName;
	} else if (typeof(jsonDataOrPlayerName) === 'string') {
		var playerName = jsonDataOrPlayerName; // The sponsorName & videoName are already setup above.
	}

	(function siteCatDelayedLoader(playerName, sponsorName, videoName) { // Self-Loading Function.
		if (typeof(s) !== 'undefined') {
			// Map them to the Omniture Objects, as needed:
			if (typeof(s.Media) === 'undefined') {
				s.Media = {};
			}
			s.Media.playerName = s.eVar18 = s.prop19 = playerName;
			s.prop20 = s.eVar20 = sponsorName;
			s.prop39 = s.eVar39 = videoName;

			// Call Omniture:
			if (debugOmniture) { log('final data which is sent over to Omniture...'); log(s, 'Omniture S Object', 'expandAll'); }
			s.t();
		} else {
			setTimeout(function() {
				siteCatDelayedLoader(playerName, sponsorName, videoName); // Loops back into this function.
			}, 50);
		}
	})(playerName, sponsorName, videoName); // Self-Loading Function.
}

/**************************************************************/
/********  Widget Tracking: using data-omniture   *************/
/**************************************************************/

// Usage Example: <a href="..." data-omniture='trackWidgetClick|{"linkName":"[Widget Name]:[Link text]","products":"..."}'>...</a>
function trackWidgetClick(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'products,events,eVar17,prop17,eVar16';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events = json.events || 'event21';
	s.products = json.products; //';photos:A1:1-1:the-big-picture;;;;
	s.eVar16= "frontdoor-modules";	//photos:1-1:the-big-picture:A1
	s.prop17 = json.products; // '[Widget Name]:[Link text]';
	s.eVar17 = json.products; // '[Widget Name]:[Link text]';
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); // '[Widget Name]:[Link text]');
}

/* New Tracking function for Widget Omniture Revisit  */
/* Widgets Affected: E90, P42, P41, Q1, F1, L30, M2, M3, M12, M13*/
function trackWidgetClick_Ver2(lnk, linkName, json) { 
	s.linkTrackVars = json.linkTrackVars || 'products,events,eVar4,eVar16,eVar17,prop17';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events = json.events || 'event21';
	s.products = json.products; 
	// get pageName from s object if it doesn't exist in json param
	s.eVar4 = json.pageName ? json.pageName : s.pageName; 
	s.eVar16= json.widgetName;	
	s.eVar17 = json.widgetName+":"+json.destinationURL; 
	s.prop17 = json.widgetName+":"+json.elementClicked+":"+json.callToAction;
	
	if (json.prop67 !== undefined) {
		s.prop67 = json.prop67;
		s.eVar67 = json.eVar67;
	}
	
	if (json.prop68 !== undefined) {
		s.prop68 = json.prop68;
		s.eVar68 = json.eVar68;
	}
	
	if(json.partner !== undefined){
		if(json.partner !== null || json.partner !== ""){ 
			s.prop17 = json.widgetName+":"+json.partner+":"+json.elementClicked+":"+json.callToAction;
		}
	}
	
	//alert("linkName: "+linkName+" products: "+json.products);
	
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); 
}

/* New Tracking function for Video Widget Omniture Revisit  */
/* Widgets Affected: V11*/
function trackVideoWidgetClick_Ver2(lnk, linkName, json) { 
	s.linkTrackVars = json.linkTrackVars || 'products,events,eVar4,eVar16,eVar17,eVar39,prop17';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events = json.events || 'event21';
	s.products = json.products; 
	s.eVar4 = json.pageName; 
	s.eVar16= json.widgetName;	
	s.eVar17 = json.widgetName+":"+json.destinationURL; 
	s.prop17 = json.widgetName+":"+json.elementClicked+":"+json.callToAction;
	s.eVar39 = json.widgetVideoName;
		
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); 
}

function trackC3WidgetClick(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'products,events,eVar17,prop17,eVar16';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events = json.events || 'event21';
	s.products = json.products; //;[Widget];;;event21
	s.eVar16= json.eVar16;	//c3-photo-grid
	s.prop17 = json.prop17; //c3-photo-grid:widget-position:[item-name ex; Prada Shoes, Gucci bag]:links:[button-link, facebook, twitter, pinterest, email]
	s.eVar17 = json.eVar17; //c3-photo-grid:[destination-url]
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); // '[Widget Name]:[Link text]');
}

function trackC33WidgetClick(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'products,events,eVar17,prop17,eVar16';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events = json.events || 'event21';
	s.products = json.products; //;[Widget];;;event21
	s.eVar16 = json.eVar16;	//c33-talent-grid
	s.prop17 = json.prop17; //c33-talent-grid:widget-position:[item-name ex; julia robert]:links:[button-link, facebook, twitter, pinterest, email]
	s.eVar17 = json.eVar17; //c33-talent-grid:[destination-url]
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); // '[Widget Name]:[Link text]');
}

function trackLRCWidgetClick(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'events,eVar16,eVar17,eVar30';
	s.linkTrackEvents = json.linkTrackEvents || 'event21';
	s.events = json.events || 'event21';
	s.products = json.products;
	s.eVar4 =  s.pageName;
	s.eVar16 = linkName;	//photos:1-1:the-big-picture:A1
	s.eVar30 = json.content;
	s.eVar17 = json.widgetLink; // '[Widget Name]:[Link text]';
	s.prop17 = json.widgetLink;
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); // '[Widget Name]:[Link text]');
}


// Usage Example: <a href="..." data-omniture='trackWidgetClick2|{"linkName":"[Widget Name]:[Link text]","products":"..."}'>...</a>
function trackWidgetClick2(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'products,events,eVar17,prop17';
	s.linkTrackEvents = json.linkTrackEvents || 'event29';
	s.events = json.events || 'event29';
	s.products = json.products; // ';ad-widget:A1:1-1:ad-text;;;;';
	s.prop17 = json.products; // '[Ad Widget Name]:[Link text]';
	s.eVar17 = json.products; // '[Ad Widget Name]:[Link text]';
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); // '[Ad Widget Name]:[Link text]');
}

// Usage Example: <a href="..." data-omniture='trackWidgetLink|{"linkName":"..."}'>...</a>
function trackWidgetLink(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'eVar17';
	s.linkTrackEvents = json.linkTrackEvents || 'NONE';
	s.eVar17 = linkName;
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName);
}

//Usage Example: <a href="..." data-omniture='trackContentItemClick|{"linkName":"[Widget title]:[Link text]"}'>...</a>
function trackContentItemClick(lnk, linkName, json) {
	s.linkTrackVars = json.linkTrackVars || 'events';
	s.linkTrackEvents = json.linkTrackEvents || 'event31';
	s.events = json.events || 'event31';
	s.list2 = linkName;
	if (debugOmniture) { log('final data which is sent over to Omniture...'); log('lnk: ' + lnk); log('linkName: ' + linkName); log(s, 'Omniture S Object', 'expandAll'); }
	s.tl(lnk, 'o', linkName); // '[Ad Widget Name]:[Link text]');
	
}

// Usage: trackGlamcamClick("arrow", "left", "P&G", "2013-grammys", "Madame White", "/news/2013_grammys/glamcam");
function trackGlamcamClick(type, action, sponsor, eventName, celebName, url) {
	if (typeof(s.Media) === 'undefined') {
		s.Media = {};
	}
	s.Media.playerName = s.eVar18 = s.prop19 = eventName + "_glamcam";
	s.prop20 = s.eVar20 = sponsor;
	s.prop39 = s.eVar39 = eventName + "-glamcam" + (celebName?(":"+celebName):"");
	s.eVar4 = s.pageName;
	s.eVar16 = "GlamCam360";
	s.eVar17 = "GlamCam360" + (url?(":"+url):"");
	if (type == "thumbnail") {
		s.prop17 = "GlamCam360:" + type + (celebName?(":"+celebName):"");
	} else {
		s.prop17 = "GlamCam360:" + type + ":" + action; 
	}
	s.linkTrackVars = "events,eVar4,eVar16,eVar17,prop17,eVar18,prop19,eVar20,prop20,eVar39,prop39";
	s.tl(true, 'o', s.eVar17);
}

/** get the look tracking **/
function trackGetTheLook(title, url, element, callToAction) {
	s.products = ";" + title + ";;;event21";
	s.linkTrackVars = "events,eVar4,eVar16,eVar17,prop17";
	s.eVar4 = s.pageName;
	s.eVar16 = title;
	s.eVar17 = title + ":" + url;
	s.prop17 = title + ":" + element + ":" + callToAction.toLowerCase().replace(/[\s_]/g,'-');
	s.tl(true, 'o', s.eVar17);
}

/**************************************************************************/
/********  Custom Tracking: eg. button, photo, grid, arrows   *************/
/**************************************************************************/
function trackPhotoPage() {
	s.events = 'event2';
	s.prop15 = s.eVar15 = 'photos';
	s.t();
}

function trackPhotoNav(type) {
	s.linkTrackVars = 'events,eVar16,eVar17,eVar30,eVar15,eVar38';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.prop15 = s.eVar15 = 'photos';
	
	s.eVar16 = 'photos-navigation';
	s.eVar17 = s.eVar16 + ' : ' + type;
	s.eVar30 = type;

	s.tl(true, 'o', s.eVar17);
}

function trackPhotoBadge(category) {
	s.linkTrackVars = 'events,eVar16,eVar17,eVar30,eVar33,eVar15,eVar38';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.prop15 = s.eVar15 = 'photos';
	
	s.eVar16 = 'photos-badge';
	s.eVar30 = category;
	s.eVar17 = s.eVar16 + ' : ' + category;
	s.eVar33 = category;

	s.tl(true, 'o', s.eVar17);
}

function trackPhotoCategory(category) {
	s.linkTrackVars = 'events,products,eVar4,eVar16,eVar17,prop17,eVar30,eVar15,eVar38';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.prop15 = s.eVar15 = 'photos';
	
	s.eVar16 = 'photos-categories';
	s.eVar30 = category;
	s.eVar17 = s.eVar16 + ' : ' + category;
	s.eVar33 = category;

	s.tl(true, 'o', s.eVar17);
}

function trackC3Grid(itemName, itemBtnLink) { 
	s.linkTrackVars = 'events,eVar16,eVar17,prop17,eVar30';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.prop17 = 'c3-photo-grid:desktop:grid:'+itemName+':grid';
	
	s.eVar16 = 'c3-photo-grid';
	s.eVar30 = itemName;
	if(itemBtnLink == '')  	
		itemBtnLink = 'No-Buy-link-provided';
	s.eVar17 = s.eVar16 + ' : ' +itemBtnLink;

	s.tl(true, 'o', s.eVar17);
}

function trackC3ArrowClick(itemName, itemBtnLink, direction) { 
	s.linkTrackVars = 'events,eVar16,eVar17,prop17,eVar30';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.prop17 = 'c3-photo-grid:lightbox:'+itemName+':'+direction;
	
	s.eVar16 = 'c3-photo-grid';
	s.eVar30 = itemName;

	if(itemBtnLink == '')  	
		itemBtnLink = 'No-Buy-link-provided';

	s.eVar17 = s.eVar16 + ' : ' +itemBtnLink;

	s.tl(true, 'o', s.eVar17);
}

function trackC33Grid(itemName, itemBtnLink) { 
	s.linkTrackVars = 'events,eVar16,eVar17,prop17,eVar30';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.prop17 = 'c33-talent-grid:desktop:grid:'+itemName+':grid';
	
	s.eVar16 = 'c33-talent-grid';
	s.eVar30 = itemName;
	if(itemBtnLink == '')  	
		itemBtnLink = 'No-More-Description-link-provided';
	s.eVar17 = s.eVar16 + ' : ' +itemBtnLink;

	s.tl(true, 'o', s.eVar17);
}

function trackC33ArrowClick(itemName, itemBtnLink, direction) { 
	s.linkTrackVars = 'events,eVar16,eVar17,prop17,eVar30';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.prop17 = 'c33-talent-grid:lightbox:'+itemName+':'+direction;
	
	s.eVar16 = 'c33-talent-grid';
	s.eVar30 = itemName;

	if(itemBtnLink == '')  	
		itemBtnLink = 'No-More-Description-link-provided';

	s.eVar17 = s.eVar16 + ' : ' +itemBtnLink;

	s.tl(true, 'o', s.eVar17);
}

function trackWidgetButtonClick(pageName,widgetName,widgetProducts,destURL,pos,elementClicked,callToAction){  
	s.linkTrackVars = 'events,products,eVar4,eVar16,eVar17,prop17';
	s.linkTrackEvents = 'event21';
	s.events = 'event21';
	s.products = widgetProducts;
	s.eVar4 = pageName;
	s.eVar16 = widgetName;
	s.eVar17= widgetName+":"+destURL;
	s.prop17 = widgetName+":"+elementClicked+":"+callToAction;
	s.tl(true, 'o', s.eVar17);
}

// Global Click Handler Event + Function Mapping

// we may need to pass custom Omniture binding info before eol.bindOmnitureListeners is post-load declared below.
// so by convention, create|append to an array called OmnitureListenerSelectors that it will use:
if (typeof(OmnitureListenerSelectors) === 'undefined') {
	window.OmnitureListenerSelectors = [];
}
OmnitureListenerSelectors.push('a'); //the main one


jQuery(document).ready(function($) {
	/* This is a catch all for any links, which DO NOT have customized Omniture implementations applied to them. If Omniture has already 
	   been applied to a specific link, then this function is intentionally designed to avoid double counting the user's click action. */
	
	// set half second delay on all omniture links
	// prevents the omniture tracking functions from being prematurely aborted
	$("a[data-omniture]").live("click",function() {
		if($(this).attr('target') != "_blank" && $(this).attr('href') && $(this).attr('href') !== '#') { //delay isn't needed if opening a new window
			var href = $(this).attr('href');
			setTimeout(function() {window.location = href}, 500);
			return false;
		}
	});
	
	if (typeof(eol) === 'undefined') {
		window.eol = {};
	}

	eol.bindOmnitureListeners = function(strKey) {
		// Prevents multiple clicks from being added, every time the "More Tweets from ..." link is clicked.
		$(strKey).unbind('click', eol.globalClickHandler);
		$(strKey).bind('click', eol.globalClickHandler);
		//$(strKey).unbind('touchStart', eol.globalClickHandler);
		//$(strKey).bind('touchStart', eol.globalClickHandler);
	}
	
	eol.globalClickHandler = function(e){  
		// Use currentTarget to get target element
		var objLink = arguments[0].currentTarget;  
		if (debugOmniture) { log('click'); }
		/*var rand = Math.floor((Math.random()*10)+1);  
		if (debugOmniture) { log(rand); }
		if (rand == 1) {*/
			// Get Attributes from the <a href="..."> tag.
			if (debugOmniture) { log(objLink); }
			var onClick = (objLink) ? objLink.getAttribute("onClick") : null;

			// HTML 5 data-* attributes.
			var omniture = (objLink) ? objLink.getAttribute("data-omniture") : null;
			//var products = (objLink) ? objLink.getAttribute("data-omniture-products") : null;
			
			var dataObject = (objLink) ? objLink.getAttribute("data-object") : null;
			if (dataObject !== null) {
				return; //no omniture call call with this attribute on the link
			}

			// Find values.
			var lnk = this.href || this; // URL
			var linkName = (omniture) ? omniture : ((this.innerText) ? this.innerText : this.textContent); // Link Text
			if(linkName == null)linkName = "";

			/* Skips this function if someone is already using a pre-existing Omniture onClick attribute. This avoids double counting the URL clicks.
			 * Also skips this function whenever HTML 5 URLs (which use data-* attributes) are detected.
			 * Old URLs look like this: <a href="..." onclick="s_objectID="http://www.eonline.com/#_1";return this.s_oc?this.s_oc(e):true">...</a>
			 * New URLs look like this: <a href="..." data-omniture="some string">...</a>
			 * Ex: <a href="..." onclick="trackLink(this,'$ {sage:omnitureCleanSubSections(article.title)}_top_story_thumbnail')">...</a>
			 *     <a href="..." data-omniture="$\{sage:omnitureCleanSubSections(article.title)}_top_story_thumbnail">...</a>
			 *     <a href="..." data-omniture="trackLink2|$\{sage:omnitureCleanSubSections(article.title)}_top_story_thumbnail">...</a>
			 */
			if (onClick && (typeof(onClick) === 'string') && ((onClick.indexOf('s_objectID') > -1) || (onClick.indexOf('s_oc') > -1) || (onClick.indexOf('track') > -1))) {
				if (debugOmniture) { log("The onClick attribute was detected. Bypassing Eonline's Global Omniture Tracking Code, as it would create a 2nd click tracking action."); }
				return;
			} else {
				if (debugOmniture) { log("The onClick attribute was't found. Using Eonline's Global Omniture Tracking Code."); }
				// Strip any Function Names as Needed
				var fnName = 'trackLink';
				if (linkName.indexOf('|') > -1) {
					var fnName = linkName.substr(0,linkName.indexOf('|'));
					var linkName = linkName.substr(fnName.length + 1);
				}

				// Parse Any Remaining JSON
				var json = {};
				if (linkName.indexOf('{') > -1) {
					var json = $.parseJSON(linkName);
					if ((typeof(json) === 'object') && json) {
						linkName = json.linkName || json.linkname || '';
					}
				}
				if (debugOmniture) { 
					log('linkName: ' + linkName);
				}

				// Switch Functions as Needed
				if (debugOmniture) { log(fnName); }
				switch (fnName) {
					/* Example for Mobile to use:
					case 'mobilePhotoGallery':
						mobilePhotoGallery(lnk, linkName, json);
						break;
					*/
					case 'trackElement':
						trackElement(lnk,json);
						break;
					case 'trackLink2': 
						trackLink2(lnk, linkName, json);
						break;
					case 'trackShares':
						trackShares(lnk, linkName, json);
						break;
					case 'trackGlobalNav':
						trackGlobalNav(lnk, linkName, json);
						break;
					case 'trackGlobalNav_Ver2':
						trackGlobalNav_Ver2(lnk, linkName, json);
						break;
					case 'trackBrowserUpdate':
						trackBrowserUpdate(lnk, linkName, json);
						break;
					/* case 'takeOverCampaign': // New. Not yet used. Enable if needed.
						takeOverCampaign(lnk, linkName, json);
						break;*/
					case 'trackColumnLayout':
						trackColumnLayout(json);
						break;
					case 'trackWidgetClick':
						trackWidgetClick(lnk, linkName, json);
						break;
					case 'trackWidgetClick_Ver2':
						trackWidgetClick_Ver2(lnk, linkName, json);
						break;
					case 'trackVideoWidgetClick_Ver2':
						trackVideoWidgetClick_Ver2(lnk, linkName, json);
						break;
					case 'trackC3WidgetClick':
						trackC3WidgetClick(lnk, linkName, json);
						break;
					case 'trackLRCWidgetClick':
						trackLRCWidgetClick(lnk, linkName, json);
						break;
					case 'trackWidgetClick2':
						trackWidgetClick2(lnk, linkName, json);
						break;
					case 'trackWidgetLink':
						trackWidgetLink(lnk, linkName, json);
						break;
					case 'trackContentItemClick':
						trackContentItemClick(lnk, linkName, json);
						break;
					case 'customTrack':
						break;
					case 'trackLink' :
					default:
						trackLink(lnk, linkName, json);
						break;
				}
			}
		//}
	}

	// Binds on all Static Links ONLY, when the page loads. Does not bind on AJAX links.
	for (var i = 0; i < OmnitureListenerSelectors.length; i++) {
		eol.bindOmnitureListeners(OmnitureListenerSelectors[i]);
		//console.log('**** BINDING: ' + OmnitureListenerSelectors[i] )
	};
	

	// For AJAX links, add the following code into your JavaScript file's callback function. Make sure that it is after the .appendHTML() code: 
	// eol.bindOmnitureListeners('#some-AjaxDiv-id a');
});

// End Global jQuery Omniture Link Tracking
