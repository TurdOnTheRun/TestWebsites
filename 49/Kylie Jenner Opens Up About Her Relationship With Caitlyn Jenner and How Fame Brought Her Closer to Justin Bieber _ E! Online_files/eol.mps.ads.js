/*======================================*/
/*=========|EOL MPS ADS MODULE |========*/
/*======================================*/
/*
Implemented by: Jessica Silva
Platform: EONLINE Desktop
Resources: 
EOL MPS DOCS - https://eonline.atlassian.net/wiki/display/EINTERACTIVE/EOL+MPS+Documentation
MPS DOCS - https://gist.github.com/richrhee/9524af775c467812f618
MPS Request Param DOCS - https://www.evernote.com/shard/s18/sh/bdf2768d-eaf7-40bf-a245-163dd06cd224/2e88e2f01591cae41bddf62a491cad8a
JSON of all available MPS Ads configured - http://mps.nbcuni.com/request/describe/eonline-web
Sample configs - https://www.evernote.com/shard/s18/sh/b76667ed-a1af-473b-942d-19b1bcbeca4d/aec589d277dc7d36
---- Useful mps shortcuts --- 
mps._adloads[mps._loadset]
mps.eol.insertlogo('#target-container','widget=xyz;');
mps.eol.insertsharethrough('#target-container', 'wid=18;akw=style;');
To test campaigns use: ?adtest=ecoverflow || ?adtest=eskin
*/

var eolMpsAd = eolMpsAd || {};

(function($){

/*====| MPS Basic Ad Rendering to element(s) |====*/

var _ad = function(settings){
	this.settings = $.extend({}, this.defaultSettings, settings);
	this.$el = $(this.settings.el);

	return this;
};

_ad.prototype = {
	defaultSettings : {
		el : "", // The element targeted. Can be an ID or class
		slot : "", // The slot unit (defined by MPS - look @ resources above for ALL ad slots)
		requestMore : false, // Send a request to MPS for more ads & execute immediately
		requestMoreAndQueue : false, // Send a request to MPS for more ads & keep in queue.
		refreshSlotAd : false, // Refresh only specified ad slot. ONLY WORKS ON SINGLE AD RENDERS
		success : null, // Success Callback
		error : null // Error Callback - When Ad comes in empty
	},
	isRepeat : { 
		multirepeat : true, // Repeatable slot's - ex. multirepeat1, multirepeat2 - 4
		sharethrough : true, 
		msharethrough : true,
	},
	isRepeatNumToText : {
		multiad : true
	},
	numToText : ['zero', 'one', 'two', 'three', 'four'],
	slotSequence : {}, // The sequence # in a specific loadset. Can be 1-4 (SHARED {} FROM ALL INSTANCES)
	slotSequenceTotal : {}, // The TOTAL sequence collection #, regardless of loadset (SHARED {} FROM ALL INSTANCES)
	insertAd : function(el, slot, targeting, doRequest){
			var requestMore = doRequest || false;
			// make request to mps to load ads, if true OR if the slot has been rendered a 4th time
			if((this.settings.requestMore && this.settings.requestMoreAndQueue == false) || requestMore){ 
				mps.makeRequest('more');
				// Reset since any slot can force a request and all slots would be at 0 regardless of whether they've been rendered 4x in an individual loadset
				this.slotSequence = {}; 
			}
			// Set Targeting if provided
			if(targeting !== ""){
				console.log('MPS '+slot+' TARGETING: ', targeting);
			 	mps.insertAd(mps._select(el), slot, targeting);
			}
			else { 
				console.log('MPS '+slot+' NO TARGETING');
				mps.insertAd(mps._select(el), slot);
			}

			// Set callbacks
			if(typeof this.settings.success === "function" || typeof this.settings.error === "function"){
				eolMpsAd.setSlotCallbacks(slot, this.settings.success, this.settings.error);
			}

			/* Requesting more when used with liquid pinning needs to happen behind the scenes (Needs to be queued), 
			so there won't be a delay / conflict when it runs the height calculations (since assets have already been loaded).
			ex. Last Ad loads of SET -> request more to be ready for next set in a lazyload or click for more event
			*/
			
			if(this.settings.requestMoreAndQueue){ mps.makeRequest('more'); this.slotSequence = {}; }
	},
	renderWhenReady : function(array, index){
		// Renders ad only when the last one has finished.. so it will wait until x amount of time has passed / finished before making the request for the next slot.
		// Uses recursion to make sure to wait until ready.

	  	if(index < array.length){
			var self = this,
				ad = array[index],	  		
		        newIndex = index + 1;

		    // This is an ad that requires a wait time, since it's requesting more ads to mps
	        if(ad.requestMore){
				// Needs to wait x time aka needs previous slots to have rendered before making more requests.
				// Subscribe to a renderNextReady event that will be fired/published when the mps._queue.adload gets triggered
				eolMpsAd.setSlotCallbacks(ad.slot, {
					renderNextReady : function(){
						self.renderWhenReady(array, newIndex);
					}
				});

				// When it renders it will trigger mps._queue.adload && trigger our setSlotCallback
				ad.insertAd();				
	        }
	        else {
	        	// No waiting necessary, fire next ad immidiately
	        	ad.insertAd();
	        	this.renderWhenReady(array, newIndex);
	        }
	    }
	},
	setSequenceTotal : function(slotType){
		// Assign slot sequence number - For use with REPEATABLE slots. As of now: (logo, multirepeat, multiad)- Can be 1 - 4 ONLY
		this.slotSequence[slotType] = (this.slotSequence[slotType] <= 3) ? this.slotSequence[slotType]+1 : 1;
		// Assign Slot total so we can use when determining every 5th element
		this.slotSequenceTotal[slotType] = (this.slotSequenceTotal[slotType] && this.slotSequenceTotal[slotType] >= 1) ? this.slotSequenceTotal[slotType]+1 : 1;
	},
	setSlotIfRepeatable : function(slotType){
		// Assign slot sequence # to slot IF its a repeatable slot - ex. multirepeat4 OTHERWISE dont append sequence #
		if(this.isRepeat[slotType]){
			return slotType+this.slotSequence[slotType];
		}
		else if(this.isRepeatNumToText[slotType]){
			return slotType+this.numToText[this.slotSequence[slotType]];
		}
		else { 
			return slotType;
		}
	},
	createElId : function(el, slotType, slot){
		id = 'mps-'+slot+'-'+'sst-'+this.slotSequenceTotal[slotType];
		el.attr('id', id);
		return id;
	},
	createCollection : function(){
		var self = this;
		return this.$el.map(function(){
			var $this = $(this),
				// The initial slot value given, subject to change depending on whether it is a "repeatable" or "numToText" type of slot
				slotType = $this.data('slot') || self.settings.slot,
				slot, // Finalized version of the slot & the one used to call mps
				id,
				requestMore,
				targeting;

			targeting = $this.data('targeting') || self.settings.targeting || "";

			self.setSequenceTotal(slotType);

			// Assign slot sequence # to slot IF its a repeatable slot - ex. multirepeat4 OTHERWISE dont append sequence #
			slot = self.setSlotIfRepeatable(slotType);
			
			// Dynamically create id if it wasn't provided
			id = $this.attr('id') || self.createElId($this, slotType, slot);

			// Request More needs to happen AFTER the 4th el for slots that are repeatable or numToText slots
			requestMore = ((self.isRepeat[slotType] && self.slotSequenceTotal[slotType] % 5 == 0 && self.settings.requestMoreAndQueue == false || self.isRepeatNumToText[slotType]) && self.slotSequenceTotal[slotType] % 5 == 0 && self.settings.requestMoreAndQueue == false) ? true : false;

			// Return the config object we want built, these are the "finalized" settings for each slot
			return {
				id : id,
				slot : slot,
				requestMore : requestMore,
				targeting : targeting,
				insertAd : function(){
					self.insertAd('#'+id, slot, targeting, requestMore);
				}
			}
		});
	},
	refreshSlotAd : function(){
		var slot = this.$el.data('slot') || this.settings.slot;
		// Refresh slot
		mps.refreshAds(slot);

		// Set callbacks
		if(typeof this.settings.success === "function" || typeof this.settings.error === "function"){
			eolMpsAd.setSlotCallbacks(slot, this.settings.success, this.settings.error);
		}
	},
	render : function(){
		// The element must exist
		if(this.$el.length) {
			if (this.settings.refreshSlotAd && this.$el.length == 1) {
				this.refreshSlotAd();
			}
			else {
				// An array with the finalized ad configurations [{},{}]
				var preparedAds = this.createCollection();
				// Renders ad, one at a time, and waits until each ad is finished before calling the next
				this.renderWhenReady(preparedAds, 0);
			}
		}

		return this;
	}
};

/*====| For TARGETABLE ADS - currently only logo + sharethrough |====*/

var _insertTargetedAd = function(type, settings){

	var Ad = new _ad(settings),
		preparedAds = Ad.createCollection();

	preparedAds = preparedAds.map(function(index){
		var ad = preparedAds[index];

		if(type == 'sharethrough'){
			var updatedConfig = {};
			updatedConfig.requestMore = true;
			updatedConfig.insertAd = function(){
				mps.eol.insertsharethrough('#'+ad.id, ad.targeting || '');
			}
		}
		else if(type == 'logo') {

				updatedConfig = {
					slot : ad.slot || "logorepeat", // as of 3/8/16 MPS changed logo name to logorepeat
					requestMore : false, //as of 1/10/16 MPS handles this internally
					insertAd : function(){
						mps.eol.insertlogo('#'+ad.id, ad.targeting || '');	
					}
				};

			// Set callbacks
			if(typeof settings.success === "function" || typeof settings.error === "function"){
				eolMpsAd.setSlotCallbacks(updatedConfig.slot, settings.success, settings.error);
			}
		}

		return $.extend({}, ad, updatedConfig);

	});

	Ad.renderWhenReady(preparedAds, 0);
};

/*====| EOL MPS Slot Callbacks |====*/

// Acts as a Subscriber
var _setSlotCallbacks = function(slot, s, error){
	this.slotCallback = this.slotCallback || {}; // Observer
	this.slotCallback[slot] = {}; // Reset last used callback - Unsubscribe from event

	// We can assume it's in success, error func format
	if(typeof s === "function"){
		this.slotCallback[slot]['success'] = s;

		if(typeof error === "function"){
			this.slotCallback[slot]['error'] = error;
		}
	}
	else if(s === Object(s)){
		var self = this;
		// We can assume it'll be in an object format
		$.each(s, function(key){
			if(typeof s[key] === "function"){
				self.slotCallback[slot][key] = s[key];
			}
		});
	}
};

// Acts as a Publisher - Executes events
var _getSlotCallbacks = function(slot, eo, type){
	
	if((typeof this.slotCallback !== "undefined" && typeof this.slotCallback[slot] !== "undefined" && typeof eo !== "undefined") || typeof type !== "undefined"){
		var self = this;

		$.each(this.slotCallback[slot], function(key){
			// Error is unique in that it requires eo.isEmpty to be true && so does success
			if(type === "error" || eo.isEmpty && typeof self.slotCallback[slot]['error'] === "function" && key === 'error'){
				self.slotCallback[slot]['error'].call(self, eo);
			}
			else if(type === "success" || (eo.isEmpty === false && typeof self.slotCallback[slot]['success'] === "function" && key === 'success')){
				self.slotCallback[slot]['success'].call(self, eo);
			}
			else if(typeof self.slotCallback[slot][key] === "function" && key !== "error" && key !== "success") {
				self.slotCallback[slot][key].call(self, eo);
			}
		});

	}
};

/*======================================*/
/*=====| BEGIN REVEALING METHODS |======*/
/*======================================*/

eolMpsAd.render = function(s){
	return new _ad(s).render();
};

eolMpsAd.insertLogo = function(s){
	_insertTargetedAd('logo', s);
	return this;
};

eolMpsAd.insertSharethrough = function(s){
	_insertTargetedAd('sharethrough', s);
	return this;
};

eolMpsAd.setSlotCallbacks = function(s, sc, ec){
	_setSlotCallbacks.call(this, s, sc, ec);
	return this;
};

eolMpsAd.getSlotCallbacks = function(s, eo, type){
	_getSlotCallbacks.call(this, s, eo, type);
};

})(jQuery); // End eolMpsAd Module

/*==============================================================*/
/*=========| ADDITIONAL MPS FUNCS / CALLBACKS / INIT'S |========*/
/*==============================================================*/

(function($){
	
/*=========| MPS CALLBACKS FOR EACH AD LOADED |========*/

mps._queue.setrails.push(function(railvars) {
  window.console && console.log('**** RAILS LOADED: '+JSON.stringify(railvars));
  	eolMpsAd.getSlotCallbacks('skins-mps', JSON.stringify(railvars));
});

//--Ads Refreshed
mps._queue.refreshads.push(function(slotvars) {
  window.console && console.log('**** ADS REFRESHED ON PAGE', slotvars);
});

mps._queue.adload.push(function(eo) {

  	window.console && console.log('**** AD LOADED:' + eo._mps._slot, eo);
	// Add is empty class to empty ads
	eo.isEmpty && $('#'+eo._mps.adslot).addClass('mps-isEmpty');
	
	if(typeof eolMpsAd.adLoadCallback == "function"){
		eolMpsAd.adLoadCallback(eo);
	}

	// If success or error or other subscribed callback exists for slot, will execute / publish
	eolMpsAd.getSlotCallbacks(eo._mps._slot, eo);
		
});

/*============| INIT ADS DEFINED ON INITIAL LOAD |============*/

$(document).ready(function(){
	// Loads & renders all initial ads (the SLOT is defined in the el using a data-slot attribute)
	eolMpsAd.render({ el : '[data-render-ad="onload"]'});
	// Loads & renders all WIDGET LOGO ads (the TARGETING is defined in the el using a data-targeting attribute)
	eolMpsAd.insertLogo({ el : '[data-slot*="logo"]'});
	eolMpsAd.insertSharethrough({ el : '[data-slot*="sharethrough"]'});
});

})(jQuery);