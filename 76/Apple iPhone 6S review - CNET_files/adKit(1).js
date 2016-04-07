function adKit(win){

	// avoid DFP warning
	// %%CLICK_URL_UNESC%%

	// Pass adkit the window object becaue it can't resolve DFP vars on its own
	this.win = win;

	// Views defines functions for building View objects
	this.Views = [];

	// activeViews holds fully built View objects for active ads
	this.activeViews = [];

	// turn testing off by default
	this.testing = false;
	
	// the container element object
	var anchor;
	
	// Controller Methods and Callbacks
	this.initAd = function(initObj){
		// Place Anchor div using timestamp as unique identifier
		var timestamp = Math.round(new Date().getTime() / 1000);
		document.write('<div id="container_'+timestamp+'"></div>');
		anchor = document.getElementById('container_'+timestamp);

		this.testLog("initAd", anchor, "anchor built");

		// Where am I?
		var doc = this.win.document;
		var par = frameElement ? frameElement.parentNode : anchor.parentNode;
		var frame = frameElement || null;
		this.testLog("initAd", doc, "document set");
		this.testLog("initAd", par, "parent set");        
		this.testLog("initAd", frame, "I'm in an iframe!");

		// Who am I?
		// determine network
		var network = (function(frame, par){
			var target_id = null;
			if(frame && frame.id){
				target_id = frame.id;
			}else if(par.id){
				target_id = par.id;
			}

			if(target_id){
				if(target_id.indexOf("/8264") != -1){
					return "8264";
				}else if(target_id.indexOf("/7336") != -1){
					return "7336";
				}else{
					return "test";
				}
			}else{
				return "test";
			}
		})(frame, par);
		// determine ad unit
		var ad_unit = (function(network, frame, par){
			if(frame && frame.id && network != "test"){
				return frame.id.substring(frame.id.indexOf("/"+network), frame.id.lastIndexOf("_"));
			}else if(par.id && network != "test"){
				return par.id.substring(par.id.indexOf("/"+network), par.id.lastIndexOf("_"));
			}else{
				return initObj.test_network;
			}
		})(network, frame, par);

		this.testLog("initAd", ad_unit, "Ad unit is "+ad_unit);
		this.testLog("initAd", initObj.type, "Ad type is "+initObj.type);

		var viewBuilt = false;

		// set Active View and push into Active Views array
		for(var x=0;x<this.Views.length;x++){
			if(initObj.type===this.Views[x].name){
				this.activeViews.push(this.Views[x].buildView(initObj.type, initObj.pos, initObj.targeting, doc, par, frame, this.util, initObj.stylesheet));
				viewBuilt = true;
			}
		}

		this.testLog("initAd", viewBuilt, "Ad View has been built");
		var this_view = this.util.getActiveView(initObj.type, initObj.pos, initObj.targeting, this.activeViews);

		this.testLog("initAd", this_view, "Ad View located");

		// Initial Render of Active View
		this_view.initRender(anchor);

		// Check for Max Seat override
		if(initObj.seat_overides){
			for(var i=0;i<initObj.seat_overides.length;i++){
				if(initObj.seat_overides[i].adUnit===ad_unit){
					initObj.max_seats=initObj.seat_overides[i].seats;
					this.testLog("initAd", true, "Max Seats reset to "+initObj.seat_overides[i].seats);                
				}
			}
		}

		this.testLog("buildSubcreatives", this.testSubs, "Test Subcreatives turned on");
		this.testLog("buildSubcreatives", !this.testSubs, "DFP Subcreatives turned on");      

		if(this.testSubs){
			// Build Test Subcreatives
			this.util.buildTestSubcreatives(initObj.subcreative_size, initObj.max_seats, initObj.type, initObj.pos, initObj.targeting, ad_unit);
		}else{
			// Build DFP Subcreatives
			this.util.buildSubcreatives(initObj.subcreative_size, initObj.max_seats, initObj.type, initObj.pos, initObj.targeting, ad_unit);
		}        
	};
	
	this.subcreativeCallback = function(ad_obj, type, pos, targeting){

		var this_view = this.util.getActiveView(type, pos, targeting, this.activeViews);    	

		this.testLog("subcreativeCallback", type, "Ad Type is "+type);
		this.testLog("subcreativeCallback", pos, "Ad pos is "+pos);
		this.testLog("subcreativeCallback", this_view, "Subcreative View Found");

		// If Container hasn't started building yet
		if(!this_view.ad_built && !this_view.ad_building){
			this_view.ad_building=true;
			this_view.callback_array.push(ad_obj);
			this_view.containerRender();
		// If Container is building but hasn't finished
		}else if(this_view.ad_building){
			this_view.callback_array.push(ad_obj);
		// If Container has been built and isn't currently building
		}else if(this_view.ad_built && !this_view.ad_building){
			this_view.subcreativeRender(ad_obj);
		}else{
			this.testLog("subcreativeCallback", true, "ERROR: failure with subcreative callback");
		}

	};

	// TEST SUPPORT SCRIPTS
	this.testSetup = function(){

		// turn on testing
		this.testing = true;

		// load test css
		this.util.loadCSS("http://i.i.cbsi.com/cnwk.1d/Ads/common/js_common/dfp/adkit/cbsAdKit_test.css");

		// 1. Build Test Panel
		var wrap = this.util.addEl("div", this.win.document.body, {
			"id" : "testWrap",
			"style": "left:600px; top:0px"
		});
		// 2. Build Header
		var head = this.util.addEl("header", wrap, {}, "CBS AdKit Testing");
		// 3. Build Section for Test Results
		var section = this.util.addEl("section", wrap, {
			"id" : "testWrapLists"
		});
	};

	this.testLog = function(group, statement, message){
		if(this.testing){
			this.util.testStatement(group, statement, message);
		}
	};

	// UTILITY SCRIPTS - add functionality to other functions - should always be called by another function
	this.util = {

		getActiveView: function(type, pos, targeting, views){
			for(var i=0;i<views.length;i++){
				// If Position provided match on type and position
				if(pos){
					if(views[i].type == type && views[i].pos == pos){
						return views[i];
					}else{
						console.log("error: couldn't find the active view");
					}
				// Else just match on type
				}else{
					if(views[i].type == type){
						return views[i];
					}else{
						console.log("error: couldn't find the active view");
					}
				}
			}
		},    

		// el = string, tar = element,  att = obj, textnode = string, innerHTML=string
		// att must be formal attributes, example: { class: "class1", id: "id1", width: 500, height: 65 }
		addEl: (function(win){
			return function(el, tar, att, textnode, innerHTML){
				var e = win.document.createElement(el);
				for (var key in att){
					if (att.hasOwnProperty(key)){
						e.setAttribute(key, att[key]);
					}
				}
				if(innerHTML){
					e.innerHTML=innerHTML;
				}
				if(textnode){
					e.appendChild(win.document.createTextNode(textnode));
				}
				tar.appendChild(e);
				return e;
			};
		})(this.win),

		loadCSS: (function(win){
			return function(stylesheet){
				// LOAD CSS FILE
				var fileref=win.document.createElement("link");
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", stylesheet);
				win.document.getElementsByTagName("head")[0].appendChild(fileref);
			};
		})(this.win),

		loadJS: (function(win){
			return function(jsfile){
				// LOAD CSS FILE
				var loadScript=win.document.createElement("script");
				loadScript.setAttribute("type","text/javascript");
				loadScript.setAttribute("src", jsfile);
				win.document.getElementsByTagName("head")[0].appendChild(loadScript);
			};
		})(this.win),

		testStatement: (function(win){
			return function(group, statement, message){
				// condense reference to addEl func
				var el = this.addEl;        
				// find or build ul element
				var lists = win.document.getElementById("testWrapLists").getElementsByTagName("ul");
				for(var i=0, ul=null; i<lists.length; i++){
					if(lists[i].id===group){
						ul = win.document.getElementById(lists[i].id);
					}
				}
				ul = ul || el("ul", win.document.getElementById("testWrapLists"), {
					"id" : group
				});
				// check to see if this group has a title yet
				var ul_head = ul.getElementsByClassName("test-group-title") || null;
				// if not, add title
				if(ul_head.length===0){
					ul_head = el("li", ul, {
						"class" : "test-group-title"
					}, group);
				}
				// evaluate statement and log results
				if(statement){
					el("li", ul, {
						"class" : "test-success"
					}, message);
				}else{
					el("li", ul, {
						"class" : "test-failure"
					}, message);          
				}
			};
		})(this.win),
		
		buildTestSubcreatives: function(size, max_seats, type, pos, targeting, ad_unit){

			// ref = reference to cbsAds object
			var ref = null;
			if(window.cbsAds){
				ref = window.cbsAds;
			}else if(window.parent && window.parent.cbsAds){
				ref = window.parent.cbsAds;
			}else if(window.top && window.top.cbsAds){
				ref = window.top.cbsAds;
			}

			if(ref){
				ref.testLog("buildTestSubcreatives", size, "size is "+size);
				ref.testLog("buildTestSubcreatives", max_seats, "max seats: "+max_seats);
				ref.testLog("buildTestSubcreatives", type, "type is "+type);
				ref.testLog("buildTestSubcreatives", pos, "position is "+pos);
				ref.testLog("buildTestSubcreatives", ad_unit, "ad_unit is "+ad_unit);
			}else{
				this.testStatement("buildTestSubcreatives", true, "Error: Could not find Reference");
			}

			ref.testSubcreativeObject = ref.testSubcreativeObject || {name: "subcreative test"};

			for(var i=0; i<max_seats; i++){
				setTimeout(function(){
					ref.subcreativeCallback(ref.testSubcreativeObject, type, pos, targeting);
				}, i*500);
			}

		},    
		
		buildSubcreatives: function(creative_size, max_seats, type, pos, targeting, ad_unit){

			// Init Google Ad Stuff
			window.googletag = window.googletag || {};
			window.googletag.cmd = window.googletag.cmd || [];
			(function() {
				var gads = document.createElement("script");
				gads.async = true;
				gads.type = "text/javascript";
				var useSSL = "https:" == document.location.protocol;
				gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
				var node = document.getElementsByTagName("script")[0];
				node.parentNode.insertBefore(gads, node);
			})();

			//build the divs to hold the subcreatives
			var divname;
			for(var i=0;i<max_seats;i++){
				divname=type+"_"+pos+"_"+i;
				var div = document.createElement("div");
				div.setAttribute("id", divname);
				anchor.appendChild(div);
			}

			//save the ad commands to define the slots
			googletag.cmd.push(function() {
				for(var i=0;i<max_seats;i++){
					divname=type+"_"+pos+"_"+i;
					var adSlot=googletag.defineSlot(ad_unit, creative_size, divname)
						.addService(googletag.pubads())
						.setCollapseEmptyDiv(true,true)
						.setTargeting("pos", pos);
					for(var param in targeting){ adSlot.setTargeting(param,targeting[param]); }
				}
				googletag.pubads().enableAsyncRendering();
				googletag.pubads().enableSingleRequest();
				googletag.pubads().collapseEmptyDivs(); 
				googletag.enableServices();                         
			});

			googletag.cmd.push(function() {
				for(var i=0;i<max_seats;i++){
					divname=type+"_"+pos+"_"+i;
					googletag.display(divname);
				}
			});

		}
	};
}
function logger(str) { try { console.log(str); } catch (e) {} };