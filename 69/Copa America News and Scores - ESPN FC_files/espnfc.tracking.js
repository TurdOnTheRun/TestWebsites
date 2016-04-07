(function ($) {

	var $leagueToggle = $(document).find("#scorebar-leagues");
	var $searchbox = $("form.desktop-nav.searchbox input.searchString");
	var device = "desktop";
	var orient = "Desktop";
	// reset contant vars
	var loadNum = 1;
	var feedCount = 1;
	var listLoadNum = 1;
	var listCount = 1;
	var currentLeague = "";

	function analytics (data) {
		if(data) {
			espn.track.data = data.analytics || data;
		} else {
			return espn.track.data.omniture || espn.track.data;
		}
	}

	function getLIDname(name) {
		var ret = "";
		if(typeof name === "string" && name !== "") {
			var lposid = [], reformat;
			reformat = name.replace(/&lpos=([^\&]*)(?:&lid=(.*))?/,function(match,$1,$2){
				if($1) {
					lposid.push($1);
				}
				if($2) {
					lposid.push($2);
				}
			});
			ret = lposid.join("+");
		}
		return ret;
	}
	
	function setLIDCookie(name) {
		if(typeof name === "string" && name !== "") {
			var lposid = getLIDname(name);
			window.s_omni.Util.cookieWrite('s_omni_lid',lposid);
		}
	}

	function getReferrerType() {
		var ret = "", ref = window.document.referrer;
		if(ref) {
			var type = analytics().contentType;
			var isStoryRef = /(story|notas|post|match)\/\d+(\/?.*)/.test(ref);
			// match pages will not pass this check since they are contentType "index"
			if((type === "blogs" || type === "story") && isStoryRef) {
				ret = "direct";
			}
		}
		return ret;
	}
	
	function trackLinkClicked(e) {
		// track parent section - scoreboard, content-feed, mini-feed
		if(e && e.target) {
			var section = null, i, len, sect,
				$link = $(e.target).closest('a'),
				sections = [
					{id : "#feed-content-items", label : "minifeed"},
					{id : "#submenu-content-items", label : "minifeed"},
					{id : "#scorebar", label : "scoreboard"},
					{id : "#feed-page-primary-content", label : "article"},
					{id : "#home-page", label : "homepage"},
					{id : "#other-stories", label : "grid"},
					{id : "#video-page-primary-content", label : "video-grid"},
					{id : "#scores-page-content", label : "scores"}
				];

			for(i=0,len=sections.length; i<len; i++) {
				sect = sections[i];
				if($link.closest(sect.id).length > 0) {
					section = sect.label;
					break;
				}
			}

			espn.track.currentLink = {
				"link" : $link,
				"name" : $link.attr('name'),
				"href" : $link.attr('href'),
				"section" : section
			};
		}
	}

	function trackFeedItem ($link, parentId, itemId, prefix, index, prefix2) {
		// console.log('grid article or video');	
		var target = $link.closest('a'), order = index,
			// link Parent
			link = target.closest(parentId),
			id = link.data('content-id'),
			title = link.find('h2 a').text().replace(/[\'\"\(\)]/g,'').replace(/ |\:/g, '+').toLowerCase(),
			pageName = analytics().pageName,
			isMedia = (link.find(itemId + ' > div.media').length > 0),
			isScore = (link.find(itemId + ' > div.score').length > 0),
			type = 'article',
			trackName = [];
			if(isScore) { type = "score"; }
			if(isMedia) { type = "video"; }
			// trackname prefix, count-prefix, order-prefix
			prefix2 = prefix2 || prefix;
			trackName = [prefix,type,pageName,prefix2+loadNum++,prefix2+order,id,title].join(':');
		
		espn.track.currentLink = {
			"link" : target,
			"name" :'&lpos='+ trackName,
			"href" : target.attr('href'),
			"section" : "minifeed"
		};
	}

	function trackSocial(e) {
		// console.log("track social")
		var $link = $(e.target).closest('div'),
			pagename = analytics().pageName,
			name, type = $link.attr('class').replace(/\-(count|button)/,'');
			// disable exit link for search events
		espn.track.exitLinkHandler[0] = /http(s)?\:\/\/(search.)?espn.go.com/i;
		// disable exit links for social events
		espn.track.exitLinkHandler[1] = /(www.facebook.com\/sharer.php)|(twitter.com\/intent\/((re)?tweet|favorite))|(sendtofriend.espn.go.com)/i;
		

		type = type.replace(/twttr/,'tweet').replace(/fb/,'facebook');
		name = ["social",pagename,type].join(':');
		linkTrack({site:"soccernet",linkPos:name,"eVar72":name,"events":"event62","pageName":pagename});
	}

	function track (data, init) {
		if(data) {
			data = data.analytics || data;
			var props = data.omniture,
				premium = props.premium ? props.premium : "premium-no",
				cb = data.chartbeat || {domain:"espnfc.com", loadPubJS:false, loadVidJS:false},
				abdata = data.ABTest,
				clink = espn.track.currentLink,
				cbInit = (typeof init !== "undefined") ? false : true,
				p = $.extend({
					exec : 0,
					cbSettings : {
						sections : cb.sections,
						authors : props.contentType || "",
						site : cb.sections,
						section : cb.path,
						pagename : cb.title || props.pageName
					},
					enableCB : cbInit,
					enableBluekai : false,
					timeParting :"DoNotSet",
					navMethod : props.navMethod || getReferrerType()
				}, props),
				callOmni = function() {
					var insiderStatus = "insider-no",
						loginStatus = "anonymous",
						year = "unknown",
						gender = "unknown",
						age = "unknown",
						regType = "unknown";

					if(espnfc && espnfc.insider && espnfc.insider.loggedIn) {
						loginStatus = (espnfc.insider.loggedIn === true) ? "Registered:Logged in Active" : "anonymous";
						if(espnfc.insider.access) {
							insiderStatus = (espnfc.insider.access === true) ? "insider-yes" : "insider-no";
						}
					}
					
					p.loginStatus = loginStatus;
					p.insiderStatus = insiderStatus + ":" + premium;
					p.regType = regType;
                    p.premium = premium;
                    p.birthAge = age;
                    p.gender = gender;
                    
                    p.orientation = orient;
					p.deviceInfo = orient;
					// update omnisite for videe playback
					if(p.site) {
						window.omniSite = p.site;
					}
					// update omniPageName for video playback and ads
					if(p.pageName) {
						window.omniPageName = [p.site,p.pageName].join(':');
					}
					// Set currentLeague
                    if(p.league) {
						currentLeague = p.league;
					}
                    // make page tracking call
					espn.track.trackPage(p);
				};

			// global analytics properties used by video players
			if(p.account) {
				window.s_account = p.account;
			}

			if(clink !== null) {
				if(clink.name) {
					p.prop9 = getLIDname(clink.name);
					setLIDCookie(clink.name);
				}

				if(clink.section === "minifeed") {
					p.league = currentLeague;
				} else {
					currentLeague = "";
				}
				espn.track.currentLink = null;
			}

			callOmni();
		}
	}

	function linkTrack (props) {
		if(props) {
			espn.track.clear();
			var anData = analytics();
			var p =  $.extend({
				"site" : "espnfc",
				"link" : "true",
				"pageName" : anData.pageName,
				"orientation" : orient,
				"deviceInfo" : orient
			}, props);
			if(p.srchKwd) { p.srchKwd = "man:" + p.srchKwd; }
			if(p.srchTerm) { p.srchTerm = "man:" + p.srchTerm; }
			// make link tracking call
			espn.track.userClicked = true;
			espn.track.trackLink(p);
		}
	}

	function getDefaultSrc(props) {
		if(props) {
			espn.track.clear();
			var anData = analytics();
			var p =  $.extend({
				"link" : "true",
				"site" : "espnfc",
				"pageName" : anData.pageName,
				"orientation" : orient,
				"deviceInfo" : orient
			}, props);
			
			return espn.track.getTracklinkImgSrc(p);

		}
	}

	function initEvents () {
		function toggleLeagueEvt (e) {
			var current = $("#scorebar-dropdown").text(),
			name = $leagueToggle.find("option:contains('"+current+"')").val();
			linkTrack({linkPos: "leaguenav:"+name.toLowerCase()});
		}

		function trackSearchEvt (e) {
			if(e.keyCode === 13) {
				var $field = $(e.target),
					type = "man", lposid = [],
					clink = espn.track.currentLink,
					name = clink.name,
					text = $field.val(),
					srchTerm = [type,text.replace(/[\:\'\"\+]/g,"").replace(/ /g,"+")].join(":");
				
				if(clink) {
					var getLposLid = name.replace(/&lpos=([^\&]*)(?:&lid=(.*))?/,function(match,$1,$2){
						if($1) lposid.push($1);
						if($2) lposid.push($2);
					});
				}

				linkTrack({
					site: "soccernet",
					section: analytics().section || "",
					pageName: analytics().pageName,
					linkPos: lposid.join("+"),
					contentType: "searchresults",
					srchKwd: srchTerm,
					srchTerm: srchTerm,
					srchType: type
				});
			}
		}
		
		$leagueToggle.bind('change', toggleLeagueEvt);
		$searchbox.bind("keydown", trackSearchEvt);

		if(device !== "desktop") {
			var w = window, event,
				orientEvent = 'resize',
				updateOrientation = function() {
					var width = w.innerWidth || $(w).width(), height = w.innerHeight || $(w).height();
					orient = (width >= height) ? "Landscape" : "Portrait";
				};

			if (w.addEventListener) {
				event = document.createEvent('Event');
				event.initEvent(orientEvent, true, true);
				w.addEventListener(orientEvent, updateOrientation, false);
			  	w.dispatchEvent( event );
			} else if (w.attachEvent)  {
			  	event = document.createEventObject (w.event);
			  	w.attachEvent('on'+orientEvent, updateOrientation);
			  	w.fireEvent( orientEvent, event );
			}
		}
		
		// disable exit link for search events
		espn.track.exitLinkHandler[0] = /http(s)?\:\/\/(search.)?espn.go.com/i;
		// disable exit links for social events
		espn.track.exitLinkHandler[1] = /(www.facebook.com\/sharer.php)|(twitter.com\/intent\/((re)?tweet|favorite))|(sendtofriend.espn.go.com)/i;
		
		bindEvents();
	}

	function bindEvents () {
		var $gridContent = $(document).find('#other-stories, #video-page-primary-content');
		var $miniFeed = $("#feed-content-items");
		var $articlePage = $("#feed-page-primary-content");
		// Grid Article and Video Click events
		if($gridContent.length > 0) {
			var $links = $gridContent.find('div.grid-item');
			if($links.length > 0) {
				$links.each(function( index ) {
					var $item = $(this).find('div.grid-item-content > a'),
					clickEvt = function(event) {
						// console.log("grid", index);
						trackFeedItem($(this), 'div.grid-item', 'div.grid-item-content', 'infscroll', Number(index+1), 'infinity');
					};

					$item.off('click', clickEvt).on('click', clickEvt);
				});
			}
		}
		// Minifeed Article and Video Click events 	
		if($miniFeed.length > 0) {
			var $links = $miniFeed.find("div.feed-item:not('.feed-ad')");
			if($links.length > 0) {
				$links.each(function( index ) {
					var $item = $(this).find('div.feed-item-content > a'),
					clickEvt = function(event) {
						// console.log("minifeed");
						trackFeedItem($(this), 'div.feed-item', 'div.feed-item-content', 'minifeed', Number(index+1), '')
					};

					$item.off('click', clickEvt).on('click', clickEvt);
				});
			}
		}
		// full blog post button
		if($articlePage.length > 0) {
			var trackArticleExpand = function(e) {
				// var name = ["readmore",analytics().pageName].join(":");
				// linkTrack({linkPos: name});
				var $target = $(e.target);
				espn.track.navMethod = $target.text().toLowerCase().replace(/ /g, "-");
			};
			$articlePage.find(".full-report a").off("click", trackArticleExpand).on("click", trackArticleExpand);
		
		}
		// Social Share
		$(document).find(".comment-count, .twttr-button, .fb-button").off("click", trackSocial).on("click", trackSocial);
		$(document).find("a[name]").off("click", trackLinkClicked).on("click", trackLinkClicked);
	}

	function initABTest(data) {
		if(data) {
			var abdata = data && data.ABTest || null;
			if(abdata) {
				// test & target
				if(abdata.target && abdata.isTargeted) {
					if (typeof(window.mboxUpdate) === 'function') {
						window.mboxUpdate("ESPN_global"); // mbox update
					} else if(abdata.tScript) {
						$.getScript(abdata.tScript, function() {
							$("body").prepend('<div id="mboxEle" class="mboxDefault"></div>');
							window.mboxDefine("mboxEle",'ESPN_global');
							window.mboxUpdate("ESPN_global"); // mbox update
						});
					}
				}
				// optimizely
				if(abdata.optimizely && abdata.isOptimizied) {
					var runOpt = function(init) {
						if(init) { window.optimizely = window.optimizely || []; }
						window.optimizely.push(["activate"]);
						// run my test experiment only
						// window.optimizely.push(["activate", 2774323301]);
					};

					if(typeof window.optimizely !== "undefined") {
						runOpt();
					} else if(abdata.oScript) {
						$.getScript(abdata.oScript, function() {
							runOpt(true);
						});
					}
				}
			}
		}
	}

	window.espn = window.espn || {};
	espn.track = espn.track || {};
	espn.track.data = {};
	espn.track.currentLink = null;
	espn.track.userClicked = false;
	espn.track.exitLinkTrackDisable = true;
	espn.track.exitLinkHandler = [];

	espn.track.init = function (data) { // analytics data only
		if(data) {
			// update track data
			analytics( data );
			var anData = data.omniture || {},
				cb = data.chartbeat || {domain:"espnfc.com", loadPubJS:false, loadVidJS:false};
			// global analytics properties used by video players
			if(anData.account) {
				window.s_account = anData.account;
			}
			if(anData.site) {
				window.omniSite = "soccernet";
				if(anData.pageName) {
					window.omniPageName = [anData.site,anData.pageName].join(':');
				}
			}
			// device
			if(FC.isMobile() || FC.isTablet()) {
				if(FC.isTablet()) {
					device = "tablet";
				} else {
					device = "mobile";
				}
			}

			cb.useCanonical = false; // set canonical flag
			espn.track.initCB(cb); // init Chartbeat 
			
			initEvents();
			track(data,true);
			initABTest(data,true);		
		}
	};

	// SUBSCRIPTION EVENTS
	$.subscribe("espnfc.page.load", function (options) {
		if(espnfc && espnfc.page && espnfc.page.data) {
			var data = espnfc.page.data;
			if(data && data.analytics && !options.first) {
				var anData = data.analytics;
				// global navMethod
				if(espn.track.navMethod || espn.track.navMethod !== null) {
					anData.omniture.navMethod = espn.track.navMethod;
					espn.track.navMethod = null;
				} else if(options && options.type) {
					anData.omniture.navMethod = options.referrer || "everscroll";
				}

				analytics(anData);
				track(anData);
				initABTest(anData);
				bindEvents();
				// reset contant vars
				loadNum = 1;
				feedCount = 1;
				listLoadNum = 1;
				listCount = 1;
			}
		}
	});

	$.subscribe("espnfc.tracklink", function (data) {
		if(data) { linkTrack(data); }
	});

	$.subscribe("espnfc.feed.load", function (data) {
		if(data) {
			var lpos = "";
			var pagename = analytics().pageName;
			var type = data.type || null;
			var noArguments = data.noArguments || false;
			var count = data.currentCount;
			var initCount = data.initialCount;
			var initDetail = data.initDetail;

			if(initDetail) {
				loadNum = 1;
				listLoadNum = 1;
			} 
			else {
				if(count) {
					if(type === "transfers") {
						listCount = count; 
					} else { 
						feedCount = count; 
					}
				}
				if(type !== null && noArguments) {
					// Infinity Scrolling Content Load Tracking
					if(type === 'home-page' || type === 'video') {
						lpos = ["infscroll",pagename,"infinity"+ loadNum++].join(':');
					}
					else if(type === 'article-mini') {
						lpos = ["minifeed",pagename,"minifeed"+ loadNum++].join(':');
					}
					else if(type === "transfers") {
						lpos = ["transferfeed",pagename,"transferfeed"+ listLoadNum++].join(':');
					}
					else if(type === 'article-detail') {
						lpos = ["infscroll",pagename,"infinity"+ loadNum++].join(':');
					}
					linkTrack({linkPos: lpos});
				}
			}
			bindEvents();
		}
	});

	$.subscribe("espnfc.link.external", function (link) {
		if(link){
			var $link = $(link), clink = espn.track.currentLink;
			if(clink !== null) {
				setLIDCookie(clink.name);
			} else if($link.length > 0){
				setLIDCookie( $link.attr("name") || "" );
			}
		}
	});

}(jQuery));
