/***********************************************
  customSocialBar.js
  author: L. Houlemarde.
 (c) 2013 e! networks
 
description:
 -- main purpose is to allow custom share button images and not use the standard iframes
 -- this supports basic share functionality via share links/apis and the counts via ajax services
 -- multiple instances supported and are denoted by a unique ID  set on each container div
 -- listeners are created per instance on the share buttons
 -- expects fixed HTML and CSS classes but you can customize via css selectors starting with #YourContainerID
 
implementation:
  1) reference this .js and .css  on your page 
  2) include the .jsp passing the ID of the social bar instance
  3) add a small script to your page:
	  
	  //note that containerID is required; all others are optional
	  myConfigJSON = {"containerID" : "MyContainerDivID",
	   				  "initialShareURL" :  "http://the_exact_url_to_share"", // or the /relative_path which this will make i8n & production
	   				  "tweetText" : "Default tweet text",  //twitter does not default to title, it's a different sharing concept
	    			  "getCountsOnLoad": true,
	    			  "embedCode" : "(the embed code of the resource for user to copy)",
	    			  "emailSubject" : "subject line that appears on email",
					  "facebookBindingSelector" : "to override the default selector click binding",
					  "twitterBindingSelector" : "to override the default selector click binding",
					  "googleBindingSelector" : "to override the default selector click binding",
					  "pinterestBindingSelector" : "to override the default selector click binding"
	    			  };
	  myCustomBar1 = new customSocialBar(myConfigJSON);
  4) if using ajax to dynamically change the sharing URL (and optionally control count updating):
	  
	  myCustomBar1.setShareURL(url, true); //same rule as initialShareURL
	  //counts are updated by default.
	  
	  
  5) if you
  
 dependencies:
 -- jQuery 1.6+ must be loaded
 -- fb UI library must be loaded
 -- SocialMediaIcons.js; because the common send_friend.jsp service was changed to be dependent on this file.
 -- preps data for eol.globalClickTrack.js re site catalyst/omniture stuff
 ***********************************************/
 

 if (typeof customSocialBar == 'undefined') {
	//only define this once in case of multiple load attempts

 customSocialBar = function(configJSON) {
		 
	var $ = jQuery;
	var me = this;
	var encodedShareURL = "";
	var encodedWWWURL = "";
	var shareURL = "";
	var shortenedUrl = ""; //twitter
	var useUrlShortener = true; //eonli.ne/...
	var includeTwitterAccount = true; //via @eonline
	var loadTheCounts = true;
	var config;
	
	var pinterestShareImgURL = "";
	var pinterestShareTitle = "";
	var pinterestShareImgCaption = "";
	var pinterestShareGalleryTitle = "";
	var isPinterestFromFabulist = true;
	
	
	var facebookBindingSelector = ".cs-fb .cs-share";
	var fbLikeBindingSelector = ".cs-fb-like";
	var twitterBindingSelector = ".cs-ts .cs-share";
	var googleBindingSelector = ".cs-gp .cs-share";
	var pinterestBindingSelector = ".cs-pinterest .cs-share";
	
	var tweetTitle = "";

	/* these are declared later
	customSocialBar.globalSettings = {}; //this will get populated via a binding script rendered by the JSP and must exist... do not clear.
	customSocialBar.globalSettings.twitterAccount = "";
	customSocialBar.globalSettings.i8nProductionDomain = ""; */
	
	/****** public methods ******/
	
	me.setShareURL = function(url, refreshTheCounts) {

		shareURL = url; 
		if (url.substr(0, 7) != "http://") {
			shareURL = customSocialBar.globalSettings.i8nProductionDomain + url;
		}
		
		encodedShareURL = encodeURI(shareURL);
		
		encodedWWWURL = encodeURI(url); //for twitter share count; will always use www for getting counts as that what twitter appears to be using
		
		if (typeof refreshTheCounts == 'undefined') {
			refreshTheCounts = loadTheCounts;
		}
		
		if (refreshTheCounts) {
			UpdateCountsAsynchronously();
		}
		//will init|reset the click bindings
		resetEmailHandler();
		
		if (useUrlShortener) {
			urlShortener(encodedShareURL); //will just set shortenedUrl 
		}
	}
	
	me.getShareURL = function(){
		return shareURL;
	}
	
	me.setPinterestShareMetaData = function(imgURL, imgCap, sTitlewww, sGTitle, useThis){
		
		if (imgURL.substr(0, 7) != "http://") {
			imgURL = customSocialBar.globalSettings.i8nProductionDomain + imgURL;
		}
		pinterestShareImgURL = encodeURIComponent(imgURL);
		pinterestShareImgCaption = encodeURIComponent(imgCap);
		pinterestShareTitle = encodeURIComponent(sTitlewww);
		pinterestShareGalleryTitle = encodeURIComponent(sGTitle);
		isPinterestFromFabulist = false; 
	}
	
	me.setTweetTitle = function(wtitle){
		tweetTitle = wtitle;
	}
	
	me.rebind = function(configJSON) {

		initialize(configJSON);
	}
	
	//helper function.. not required to call per se as your page may already have all this set from the backend
	//keep in mind this updates the page meta data globally so may not make sense in situations
	//the JSON passed should be self-explanatory 
	me.updateMetaData = function(metaDataJSON) {
		if (typeof metaDataJSON.description != 'undefined') {
			$('meta[name=description]').attr('content',  metaDataJSON.description);
			$('meta[property~="og:description"]').attr('content', metaDataJSON.description);
		}
		if (typeof metaDataJSON.title != 'undefined'){
			$('meta[property="og:title"]').attr('content', metaDataJSON.title);
		}
		if (typeof metaDataJSON.url != 'undefined'){
			$('meta[property="og:url"]').attr('content', metaDataJSON.url);
		}
		if (typeof metaDataJSON.thumbnailSrc != 'undefined'){
			$('meta[property="og:image"]').attr('content', metaDataJSON.thumbnailSrc);
		}
		if (typeof metaDataJSON.thumbnailHeight != 'undefined'){
			$('meta[property~="og:image:height"]').attr('content', metaDataJSON.thumbnailHeight);
		}
		if (typeof metaDataJSON.thumbnailWidth != 'undefined'){
			$('meta[property~="og:image:width"]').attr('content', metaDataJSON.thumbnailWidth);
		}
	}
	
	//may not be the same as a click so need to expose custom event
	me.buttonShareCallback = function(buttonName) {};
	
	me.getContainerID = function() {
		return config.containerID //OK, will not change
	};
	
	/* Email Lightbox */
	me.closeEmailLightbox = function() {
		$('.email-lightbox').hide();
		//Reset view
		$('.email-lightbox .subscribe-wrapper').hide();
		$('.email-lightbox .privacy-wrapper').hide();
		$('.email-lightbox .shared-wrapper').hide();
		$('.email-lightbox .email-wrapper').show();
		$('.email-lightbox .error').css('visibility','hidden');
		$('.overlay-transparency').remove();
		$('#HHeader').css('opacity','1');
	}
		
	/***** initialization *********/
	
	initialize = function(configJSON) {
		
		function getPlainWidgetTypeName(fullWidgetTypeName) {
			if (fullWidgetTypeName.indexOf(';') == 0) {
				var fullWidgetTypeNameIndices = [];
				
				// find all instances of ';'
				for(var i = 0; i < fullWidgetTypeName.length; i++) {
					if (fullWidgetTypeName[i] === ";") {
						fullWidgetTypeNameIndices.push(i);
					}
				}
				
				// return only plain widget name
				return fullWidgetTypeName.slice((fullWidgetTypeNameIndices[0]) + 1, fullWidgetTypeNameIndices[1]);
			}
			
			// didn't find ';' in the string, therefore just returning back the original string
			return fullWidgetTypeName;
		}
		
		config = configJSON;

		
		/*** facebook UI needed ****/
		if (typeof FB === 'undefined') {
			initFacebookApi(); //FB api should already be defined but keeping an init attempt here for backwards compat.
		}		
		
		/*************  default behavior init  ***************/
		if (typeof config.initialShareURL == 'undefined') {
			config.initialShareURL = window.location.pathname; 
		}
		
		if (typeof config.useUrlShortener != 'undefined') {
			useUrlShortener = config.useUrlShortener;
		}
		
		if (typeof config.includeTwitterAccount != 'undefined') {
			includeTwitterAccount = config.includeTwitterAccount;
		}
		
		if (typeof config.getCountsOnLoad != 'undefined') {
			loadTheCounts = config.getCountsOnLoad;
		}
		
		me.setShareURL(config.initialShareURL, loadTheCounts);
		
		/* if (loadTheCounts) {
			UpdateCountsAsynchronously();
		} //already doing above */
		
		/* optional selector overrides for different types of button html if needed */
		if (typeof config.facebookBindingSelector != 'undefined') {
			facebookBindingSelector = config.facebookBindingSelector;
		}
		if (typeof config.googleBindingSelector != 'undefined') {
			googleBindingSelector = config.googleBindingSelector;
		}
		if (typeof config.twitterBindingSelector != 'undefined') {
			twitterBindingSelector = config.twitterBindingSelector;
		}
		if (typeof config.pinterestBindingSelector != 'undefined') {
			pinterestBindingSelector = config.pinterestBindingSelector;
		}
		
		
		prepareEmbedPopup();
	
		/* bind listeners */
		$("#" + config.containerID + " " + facebookBindingSelector).unbind("click");
		$("#" + config.containerID + " " + facebookBindingSelector).click(function(){
			FBShare();
			//me.buttonShareCallback("FACEBOOK-SHARE");
			
			// omniture tracking
			var pagename = $("#" + config.containerID).data('omnitureInfo').pagename;
			var widgetType = $("#" + config.containerID).data('omnitureInfo').widgetType;
			var pageType = $("#" + config.containerID).data('omnitureInfo').pageType;
			var plainWidgetTypeName = getPlainWidgetTypeName(widgetType);
			
			if(pageType == 'text-blocks') {
				var publishDate = $('.entry-meta__time').html();
				trackElement(this, { 
					"linkTrackEvents" : "event5,event43", 
					"products" : ";text-block-title;;;event5,;text-block-title;;;event43", 
					'events' : 'event5,event43',
					'list1' : s.prop9 || '',
					'eVar4' : s.pageName,
					'prop9' : s.prop9 || '',
					'prop14' : s.prop14 || $('.article__title').replace(/[ _]/g, '-').toLowerCase(),
					'eVar15' : 'articles',
					'prop15' : 'articles',
					'eVar16' : 'text-block-title',
					'eVar42' : 'text-blocks',
					'prop42' : 'text-blocks',
					'eVar62' : 'detail',
					'prop62' : 'detail',
					'prop67' : 'social-button', 
					'eVar67' : 'social-button', 
					'prop68' : 'facebook', 
					'eVar68' : 'facebook',
					'eVar72' : publishDate,
					'prop72' : publishDate,
					'linkName' : 'social-share'
				});
			} else {
				trackWidgetClick_Ver2(window.location.href, widgetType, { "linkTrackVars" : "products,events,eVar4,eVar16,eVar17,prop17,prop67,eVar67,prop68,eVar68", "linkTrackEvents" : "event5,event21", "products" : widgetType, "prop67" : "social", "eVar67" : "social", "prop68" : "facebook", "eVar68" : "facebook", "events" : "event5,event21", "pageName" : pagename, "widgetName" : plainWidgetTypeName, "destinationURL" : window.location.href, "elementClicked" : "facebook", "callToAction" : "facebook" });
			}
			
			
		});
		$("#" + config.containerID + " " + twitterBindingSelector).unbind("click");
		$("#" + config.containerID + " " + twitterBindingSelector).click(function(){
			TweetShare();
			//me.buttonShareCallback("TWEET");
			
			// omniture tracking
			var pagename = $("#" + config.containerID).data('omnitureInfo').pagename;
			var widgetType = $("#" + config.containerID).first().data('omnitureInfo').widgetType;
			var pageType = $("#" + config.containerID).data('omnitureInfo').pageType;
			var plainWidgetTypeName = getPlainWidgetTypeName(widgetType);
			
			if(pageType == 'text-blocks') {
				var publishDate = $('.entry-meta__time').html();
				trackElement(this, { 
					"linkTrackEvents" : "event5,event43", 
					"products" : ";text-block-title;;;event5,;text-block-title;;;event43", 
					'events' : 'event5,event43',
					'list1' : s.prop9 || '',
					'eVar4' : s.pageName,
					'prop9' : s.prop9 || '',
					'prop14' : s.prop14 || $('.article__title').replace(/[ _]/g, '-').toLowerCase(),
					'eVar15' : 'articles',
					'prop15' : 'articles',
					'eVar16' : 'text-block-title',
					'eVar42' : 'text-blocks',
					'prop42' : 'text-blocks',
					'eVar62' : 'detail',
					'prop62' : 'detail',
					'prop67' : 'social-button', 
					'eVar67' : 'social-button', 
					'prop68' : 'twitter', 
					'eVar68' : 'twitter',
					'eVar72' : publishDate,
					'prop72' : publishDate,
					'linkName' : 'social-share'
				});
			} else {
				trackWidgetClick_Ver2(window.location.href, widgetType, { "linkTrackVars" : "products,events,eVar4,eVar16,eVar17,prop17,prop67,eVar67,prop68,eVar68", "linkTrackEvents" : "event5,event21", "products" : widgetType, "prop67" : "social", "eVar67" : "social", "prop68" : "twitter", "eVar68" : "twitter", "events" : "event5,event21", "pageName" : pagename, "widgetName" : plainWidgetTypeName, "destinationURL" : window.location.href, "elementClicked" : "twitter", "callToAction" : "twitter" });
			}
		});
		$("#" + config.containerID + " " + googleBindingSelector).unbind("click");
		$("#" + config.containerID + " " + googleBindingSelector).click(function(){
			GPShare();
			//me.buttonShareCallback("GOOGLE-SHARE");
			
			// omniture tracking
			var pagename = $("#" + config.containerID).data('omnitureInfo').pagename;
			var widgetType = $("#" + config.containerID).data('omnitureInfo').widgetType;
			var pageType = $("#" + config.containerID).data('omnitureInfo').pageType;
			var plainWidgetTypeName = getPlainWidgetTypeName(widgetType);
			
			if(pageType == 'text-blocks') {
				var publishDate = $('.entry-meta__time').html();
				trackElement(this, { 
					"linkTrackEvents" : "event5,event43", 
					"products" : ";text-block-title;;;event5,;text-block-title;;;event43", 
					'events' : 'event5,event43',
					'list1' : s.prop9 || '',
					'eVar4' : s.pageName,
					'prop9' : s.prop9 || '',
					'prop14' : s.prop14 || $('.article__title').replace(/[ _]/g, '-').toLowerCase(),
					'eVar15' : 'articles',
					'prop15' : 'articles',
					'eVar16' : 'text-block-title',
					'eVar42' : 'text-blocks',
					'prop42' : 'text-blocks',
					'eVar62' : 'detail',
					'prop62' : 'detail',
					'prop67' : 'social-button', 
					'eVar67' : 'social-button', 
					'prop68' : 'google-plus', 
					'eVar68' : 'google-plus',
					'eVar72' : publishDate,
					'prop72' : publishDate,
					'linkName' : 'social-share'
				});
			} else {
				trackWidgetClick_Ver2(window.location.href, widgetType, { "linkTrackVars" : "products,events,eVar4,eVar16,eVar17,prop17,prop67,eVar67,prop68,eVar68", "linkTrackEvents" : "event5,event21", "products" : widgetType, "prop67" : "social", "eVar67" : "social", "prop68" : "googleplus", "eVar68" : "googleplus", "events" : "event5,event21", "pageName" : pagename, "widgetName" : plainWidgetTypeName, "destinationURL" : window.location.href, "elementClicked" : "googleplus", "callToAction" : "googleplus" });
			}
		});

		/* Email tracking requirements are no longer consistent with the rest of the buttons, a custom tracking function was added 
		$("#" + config.containerID + " .cs-email .cs-share").unbind("click");
		$("#" + config.containerID + " .cs-email .cs-share").click(function(){
				me.buttonShareCallback("EMAIL");
		});
		*/
		$("#" + config.containerID + " " + pinterestBindingSelector).unbind("click");
		$("#" + config.containerID + " " + pinterestBindingSelector).click(function(){
			console.log("pinterest share click");
			
			// omniture tracking
			var pagename = $("#" + config.containerID).data('omnitureInfo').pagename;
			var widgetType = $("#" + config.containerID).data('omnitureInfo').widgetType;
			var plainWidgetTypeName = getPlainWidgetTypeName(widgetType);
			
			PinterestShare();
			trackWidgetClick_Ver2(window.location.href, widgetType, { "linkTrackVars" : "products,events,eVar4,eVar16,eVar17,prop17,prop67,eVar67,prop68,eVar68", "linkTrackEvents" : "event5,event21", "products" : widgetType, "prop67" : "social", "eVar67" : "social", "prop68" : "pinterest", "eVar68" : "pinterest", "events" : "event5,event21", "pageName" : pagename, "widgetName" : plainWidgetTypeName, "destinationURL" : window.location.href, "elementClicked" : "pinterest", "callToAction" : "pinterest" });
			//me.buttonShareCallback("PINTEREST");
		});


		var $embedBtn = $("#" + config.containerID + " .cs-embed .cs-share");
	
		if(typeof $eolenv != 'undefined' && $eolenv.isiPad){
			$embedBtn.hide();
		}else{
			if(config.hasOwnProperty('embedCallback')){
				$embedBtn.unbind("click");
				$embedBtn.off();
				$embedBtn.on('click', function(event){
					event.preventDefault();
					event.stopImmediatePropagation();
					config.embedCallback();
				});
			}else{
				// old embed dropdown, can be removed after videoframe project launches
				$embedBtn.unbind("click");
				$embedBtn.click(function(){
						embedPrompt(config.embedTop || 40, config.embedLeft || 0);
						me.buttonShareCallback("EMBED");
				});
			}

		}
		
		//add data-omniture attributes & prepare notification for the global click handler 
		$("#" + config.containerID + " .cs-fb .cs-share").attr("data-omniture", config.facebookLikeOmniture);
		$("#" + config.containerID + " .cs-ts .cs-share").attr("data-omniture", config.twitterLikeOmniture);
		$("#" + config.containerID + " .cs-gp .cs-share").attr("data-omniture", config.googleLikeOmniture);
		$("#" + config.containerID + " .cs-embed .cs-share").attr("data-omniture", config.embedLikeOmniture);
		//$("#" + config.containerID + " .cs-email .cs-share").attr("data-omniture", config.emailLikeOmniture);
		
		/*see eol.globalClickTrack
		if (typeof(OmnitureListenerSelectors) === 'undefined') {
			window.OmnitureListenerSelectors = [];
		}
		OmnitureListenerSelectors.push("#" + config.containerID + " .cs-share");
		*/
		
		initFacebookLike();
	}
	
	initialize(configJSON);

	/***** private methods *********/

	/* Fixes this error in the FB Share button in the Lightbox: "Uncaught ReferenceError: FB is not defined."
	 * The FB appId wasn't being passed over to FB from FB's code in either the Lightbox, nor the Video Detail Page.
	 */
	function getIntlEdition(i18nEdition) {

		i18nEdition = i18nEdition || 'en_US'; // See: http://www.i18nguy.com/origini18n.html
		var strUrl = location.href;

		// Prod uses "//fr." in the URL, like: http://fr.eonline.com. All other servers use "//fr-" in the URL.
		if (customSocialBar.globalSettings.edition == 'fr') {
			i18nEdition = 'fr_FR';
		} else if (customSocialBar.globalSettings.edition == 'de') {
			i18nEdition = 'de_DE';
		}

		return i18nEdition;
	}
	
	
	function initFacebookApi() { // This is from our social.media.icons.tag file.
		// Custom eonline.com implementation of the FB Like DOM insertion code, since Facebook keeps breaking their like buttons.
		window.fbAsyncInit = function() {
			FB.init({
				"appId": "195662528604", // App ID
				"status": "true", // check login status
				"cookie": "true", // enable cookies to allow the server to access the session
				"xfbml": "true" // parse XFBML
			});
		};

		/* FB's Internationalization API Info: https://developers.facebook.com/docs/internationalization/ 
		   See our Wiki page for further info on Facebook's Internationalization. */
		var i18nEdition = getIntlEdition();
		var js = document.createElement('script');
			js.async = true;
			js.id = 'facebook-jssdk';
			js.src = '//connect.facebook.net/' + i18nEdition + '/all.js#xfbml=1&appId=195662528604';
		var obj = document.getElementById('facebook-jssdk');
		if (!obj) {
			if (document.head) {
				document.head.appendChild(js);
			} else if (document.getElementsByTagName('head')) { // IE 7
				document.getElementsByTagName('head')[0].appendChild(js);
			}
		}
	}
	
	function initFacebookLike(){ 
		// test to see if child elements exist
		// to prevent rewriting on multiple reloads
		// and to skip implementation if custom FB link has already been inserted
		if(!$(fbLikeBindingSelector).has("div.fb-like").length) {
			$(fbLikeBindingSelector).html("");
			$(fbLikeBindingSelector).append('<div id="fb-root"></div><div class="fb-like" data-href="'+encodedShareURL+'" data-send="false" data-layout="button_count" data-width="90" data-show-faces="false" data-font="arial"></div>');				
		}
	}

	function urlShortener(strLongUrl) {
		$.getJSON("/mvc/shorturl?url=" + strLongUrl, function(data) {
				shortenedUrl = data.rawResponse;
			}
		);
	}
	
	function prepareEmbedPopup() {
		//very bad timing issues & errors with trying to move things around in the dom and then select text on click event.
		//do as much here first.
		var $embedForm = $("#cs-embed-form-" + config.containerID);
		var $textArea = $embedForm.find('.embed-text').eq(0);
		
		//console.debug("config.embedCode : ", config.embedCode);
		
		$textArea.text(config.embedCode);
		$textArea.on('mouseup', function(event) {
			//console.debug("EMBED TEXTAREA MOUSEUP");
			event.preventDefault();
		});

		$(".cs-embed").click(function(){ 
			$embedForm.show();
			$embedForm.focus();
		});
		
		//not using this becuz not working in IE8
		$textArea.on("focus", function(){ 
			//console.debug("EMBED TEXTAREA FOCUS");
			//$embedForm.focus();
			
			// $textArea[0].selectionStart = 0;
			// $textArea[0].selectionEnd = 9999;
			//$textArea[0].setSelectionRange(0,9999);
			//document.getElementById("cs-embed-text-" + config.containerID).select(); 
		});  
		
		$textArea.blur(function(e){
			//console.debug("EMBED TEXTAREA BLUR");
			e.preventDefault();
			$embedForm.hide(); //click out or tap out to exit
		});
		
		$textArea.keydown(function(e) {
			  if ((e.keyCode == 13) || (e.keyCode == 27)) {
				  e.preventDefault();
				  $embedForm.hide(); // enter or esc to exit
			  }     
		});
	}

	function embedPrompt (top, left) {
		
		var embedX = $("#embed-bttn-wrap-" + config.containerID).position.left; 
		var embedY = $("#embed-bttn-wrap-" + config.containerID).position.top;
		
		var $embedForm = $("#cs-embed-form-" + config.containerID);
		$embedForm.css({"top":top+"px","left":left+"px"}).show();

		var $textArea = $embedForm.find('.embed-text').eq(0);

		// $textArea.focus().select();
		// $textArea[0].setSelectionRange(0-9999);
		var focusWaitTime = $eolenv.isiPad ? 3000 : 100;
		
		setTimeout(function() {
			console.log("SETTING EMBED TEXT AREA FOCUS...");
			//the dom is sometimes not ready to select text... must wait a bit 
			$textArea.focus().select();
		}, focusWaitTime)
		
		/* if (typeof config.embedCode != 'undefined') {
			window.prompt ("Copy to clipboard: Ctrl+C (or Cmd+C for Macs), Enter",  config.embedCode);
		} */ //broken on chrome for long text.
	}
	
	function FBShare() {
		
		//do we have to or will it scrape back the opengraph?
		/*
			method: 'feed',
			name: 'Share this video',
			link: 'http://www1.test.eonline.com/photos',
			picture: 'http://www1.test.eonline.com/resources/images/header_footer/E_Nav_logo_100x120.png',
			caption: 'E! Photos',
			description: 'Celebrity Photos, Celebrity Pictures, Celebrity Pics | E! Online'
		  */

		/* Fixes this FB API error, with the FB Share buttons in Lightboxes:
		 * API Error Code: 100
		 * API Error Description: Invalid parameter
		 * Error Message: link URL is not properly formatted
		 * Fix: This will turn relative URLs, into absolute URLs & add the international edition subdomains to those URLs.
		 */
		// full url must be set; this was changing incorrectly: encodedShareURL = eonline.socialMediaIcons.checkForFullUrl({"shareUrl": encodedShareURL});

		/* Attempting to fix this cross-domain FB API error, with the FB Share buttons in Lightboxes:
		 * API Error Code: 191
		 * API Error Description: The specified URL is not owned by the application
		 * Error Message: redirect_uri is not owned by the application.
		 * See: https://developers.facebook.com/docs/reference/dialogs/feed/
		 * 		https://developers.facebook.com/docs/reference/javascript/FB.ui/
		 * Fix: TBD.
		 * Notes: This is FB's cross-domain error message.
		 * We may not be able to test the custom FB Share buttons on Localhost, Dev, Test or Staging.
		 * We can change the encodedShareUrl from /videos/... to http://www.eonline.com/videos/... but, there is a 
		 * problem with the actual URL that is dynamically generated by FB's code. It contains the localhost domain in the string.
		 * This URL contains 2 copies of localhost, which need to be changed to www.eonline.com. When it contains the localhost values, it will throw out the 191 cross-domain error. Look in the domain & origin parameters.
		 * https://www.facebook.com/dialog/feed?app_id=195662528604&display=popup&e2e=%7B%7D&link=http%3A%2F%2Fwww.eonline.com%2Fvideos%2F215205%2Fjessica-alba-goes-blond&locale=en_US&name=Share%20this%20video&next=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D28%23cb%3Dfa647b008%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8080%252Ff11b0a7e84%26relation%3Dopener%26frame%3Df33f460a48%26result%3D%2522xxRESULTTOKENxx%2522&sdk=joey
		 * If we manually change it to this, then it will work in the browser:
		 * https://www.facebook.com/dialog/feed?app_id=195662528604&display=popup&e2e=%7B%7D&link=http%3A%2F%2Fwww.eonline.com%2Fvideos%2F215205%2Fjessica-alba-goes-blond&locale=en_US&name=Share%20this%20video&next=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D28%23cb%3Dfa647b008%26domain%3Dwww.eonline.com%26origin%3Dhttp%253A%252F%252Fwww.eonline.com%252Ff11b0a7e84%26relation%3Dopener%26frame%3Df33f460a48%26result%3D%2522xxRESULTTOKENxx%2522&sdk=joey
		 */
		// TBD. We'd have to hack into FB's code to find out where the /dialog/feed value is being set at. There aren't any parameters at those 2 FB URLs above, which would allow us to override the origin & domain values.

		FB.ui(
				{
				    method: 'feed',
				    link: encodedShareURL
				},
				 function(response) {
				 	if (response && response.post_id) {
				 		//if the UI goes away we'll have to call asyncUpdateTSCounts();
				 		incrementCount("cs-fb");
				   	} else {
				     //alert('Post was not published.');
				   	}
				 }
			);
		return false;
	}

	// update the link href? TOS?
	//https://developers.google.com/+/web/share/
	function GPShare()	{
		//$("gplus_share1").attr('hr ', econdeURIComponent(window.location.href));
		window.open('https://plus.google.com/share?url=' +  encodedShareURL,  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		return false;
	}
	
	function TweetShare()	{
		//replaced callback-style which was triggering pop-up blockers.
		if (shortenedUrl == "") {
			shortenedUrl = encodedShareURL; //fallback if shotener fails
		};

		
		var tweeturl = 'http://twitter.com/intent/tweet?url=' + shortenedUrl;  
		
		if (includeTwitterAccount) {
			tweeturl += '&via=' + customSocialBar.globalSettings.twitterAccount;
		}
		
		tweeturl += '&counturl=' + encodedShareURL;
		
		if (typeof config.tweetText != "undefined") 
			tweeturl += '&text=' + encodeURIComponent(config.tweetText) + encodeURIComponent(tweetTitle);
					
		var nw = window.open(tweeturl, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		
		watchWindowForClose(nw, function(){
				setTimeout(function() {
						loadTheCounts && asyncUpdateTSCounts();
					}
				)
			}, 3000)
		
		return false;
	}
	
	function PinterestShare() {
		var imageURL = encodeURIComponent($(".slide-reel .active .imgWrapper img").attr("src"));
		var galleryTitle = encodeURIComponent($(".meta .gallery-title").text());
		var imageTitle = encodeURIComponent($(".meta .title").text());
		var imageCaption = encodeURIComponent($(".meta .caption p").text());
		var titleJoin;
				
		if(!isPinterestFromFabulist){
			imageURL = pinterestShareImgURL;
			galleryTitle = pinterestShareGalleryTitle;
			imageTitle = pinterestShareTitle;
			imageCaption = pinterestShareImgCaption;
		}	
				
		if (galleryTitle.length > 1 && imageTitle.length > 1) {
			if (customSocialBar.globalSettings.edition == 'de' || customSocialBar.globalSettings.edition == 'it') {
				titleJoin = '%20%2D%20';
			} else if (customSocialBar.globalSettings.edition == 'fr') {
				titleJoin = '%20de%20';
			} else {
				titleJoin = '%20from%20';
			}
		} else {
			titleJoin = "";
		}
		
		window.open('http://pinterest.com/pin/create/button/?url=' +  encodedShareURL + '&media=' + imageURL + '&description=' + imageTitle + titleJoin + galleryTitle + '%0A%0A' + imageCaption,  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=303,width=750');
		return false;
	}

	// We call out for counts simultaneously. Each service is different json and will need its own handler
	function UpdateCountsAsynchronously() {
		asyncUpdateTSCounts();
		asyncUpdateGPCounts();
		asyncUpdateFBCounts();
	}
	
	function getBaseURL () {
		pathArray = window.location.href.split( '/' );
		protocol = pathArray[0];
		host = pathArray[2];
		url = protocol + '://' + host;
		return url;
	}

	//twitter share counts
	function asyncUpdateTSCounts() {
		//using www for counts
		var tweetCountRefURL = encodedWWWURL;
		if (tweetCountRefURL == "") {
			tweetCountRefURL = encodedShareURL;
		}
		//http://cdn.api.twitter.com/1/urls/count.json?url=[YOUR-URL]
		var tweetCountUrl = "http://cdn.api.twitter.com/1/urls/count.json?url=" + tweetCountRefURL; //twitter resolves redirects for count purposes

		$.ajax({
			type: 'GET',
			url: tweetCountUrl,
			async: true,
			dataType: 'jsonp',
			contentType: 'application/json',
			timeout: 5000,
			success: function(dataJSON) {
					var count = 0;
					if (typeof dataJSON != 'undefined') {
						count = dataJSON.count;
					}
					updateCountText("cs-ts", count);
				}
		});
	}
	
	//google plus one share counts
	function asyncUpdateGPCounts() {
	       $.ajax({url: "/mvc/google/count?url="+ encodedShareURL,
	              type: 'GET',
	              dataType: 'json',
	              contentType: 'application/json',
	              timeout: 5000,
	              success: function(data){
	                     if(data.status.code == 200){
	                    	 var count = data.data.socialCount;
	                    	 updateCountText("cs-gp", count);
	                    	 	
	                     }
	              }
	       });
	}

	function asyncUpdateFBCounts() {
		var fbCountUrl = "http://graph.facebook.com/?id=" + encodedShareURL + "&appId=195662528604";

		$.ajax({
			type: 'GET',
			url: fbCountUrl,
			async: true,
			dataType: 'jsonp',
			contentType: 'application/json',
			timeout: 5000,
			success: function(dataJSON) {
					var count = 0;
					if (typeof dataJSON != 'undefined') {
						if (typeof dataJSON.shares == 'undefined') {
							count = 0;
						} else {
							count = dataJSON.shares;
						}
					}
					updateCountText("cs-fb", count);
				}
		});
	}
	
	
	function incrementCount(listItemClass) {
		var $counter = $("#" + config.containerID + "  ." + listItemClass + " .cs-counttext");
		var ct = parseInt($counter.html());
		ct+=1;
		$counter.html(ct);
	}
	
	function updateCountText(listItemClass, count) {
		if(count < 20){
	    	$("#" + config.containerID + "  ." + listItemClass + " .cs-count").css("display","none");
	    }
		if(count > 19){
	    	$("#" + config.containerID + "  ." + listItemClass + " .cs-count").css("display","block");
	    }
		$("#" + config.containerID + "  ." + listItemClass + " .cs-counttext").html(count);
	}
	
	function watchWindowForClose(aWindow, closedCallbackFunction) {
		//check every 2 seconds to see if a window is closed
		//there is no cross-domain js event to handle this functionality.
		var wt = setInterval(function() 
				{
					if (typeof aWindow != 'undefined' && aWindow != null && typeof aWindow.closed != 'undefined') {
						if (aWindow.closed) {
							clearInterval(wt);
							closedCallbackFunction();
						}
					}
				}, 
		2000);
	}
	
	
	/* Email Lightbox */
	function resetEmailHandler() {
		/* link email button to handlers so click will create form*/
		$("#" + config.containerID  + " #email-bttn-" + config.containerID).unbind("click");
		initEmailLightbox(); 	
	}
	
	function initEmailLightbox() {
		$("#email-bttn-" + config.containerID + " .email").click(function(e){
			me.closeEmailLightbox();

			// Add lightbox
			$('<div class="overlay-transparency"></div>').appendTo("body");
			$("#HHeader").css("opacity","0.9");
			$("#email-lightbox-" + config.containerID).show();

			// Populate lightbox
			$.ajax({
				dataType: 'text',
				type: 'GET',
				url: '/services/send_email.jsp',
				data: {
					velocityTemplate : config.velocityTemplate,
					contentURL: encodedShareURL,
					edition: customSocialBar.globalSettings.edition,
					shortTitle: config.shortTitle,
					longTitle: config.longTitle,
					thumbnail: config.thumbnail,
					uniqueId: config.containerID,
					firstTextBlock: config.firstTextBlock,
					emailCCDIntro: config.emailCCDIntro,
					emailCCDCallToAction: config.emailCCDCallToAction
				},
				success: function(data) {
					$("#email-lightbox-" + config.containerID).html(data).promise().done(function(){

						var pageType = $("#" + config.containerID).data('omnitureInfo').pageType;
						if(pageType == 'text-blocks') {
							var publishDate = $('.entry-meta__time').html();
							trackElement(this, { 
								"linkTrackEvents" : "event5,event43", 
								"products" : ";text-block-title;;;event5,;text-block-title;;;event43", 
								'events' : 'event5,event43',
								'list1' : s.prop9 || '',
								'eVar4' : s.pageName,
								'prop9' : s.prop9 || '',
								'prop14' : s.prop14 || $('.article__title').replace(/[ _]/g, '-').toLowerCase(),
								'eVar15' : 'articles',
								'prop15' : 'articles',
								'eVar16' : 'text-block-title',
								'eVar42' : 'text-blocks',
								'prop42' : 'text-blocks',
								'eVar62' : 'detail',
								'prop62' : 'detail',
								'prop67' : 'social-button', 
								'eVar67' : 'social-button', 
								'prop68' : 'email', 
								'eVar68' : 'email',
								'eVar72' : publishDate,
								'prop72' : publishDate,
								'linkName' : 'social-share'
							});
						}
						
						emailLightboxOmniture("email-start", "email:start", null);
						bindEmailLightbox();
				    });
				}
			});
		});
	}
	
	function bindEmailLightbox() {
		// Clear input on focus
		$("#email-lightbox-" + config.containerID + " input[type=text]").focus(function(e) {
		    if (e.target.value == e.target.defaultValue) {
		    	e.target.value = '';
		    	$(this).addClass("focused");
		    }
		});
		// Default input value on blur
		$("#email-lightbox-" + config.containerID + " input[type=text]").blur(function(e) {
		    if (e.target.value == '') {
		    	e.target.value = e.target.defaultValue;
		    	$(this).removeClass("focused");
		    }
		});
		
		// Email Close "X" button
		$("#email-lightbox-" + config.containerID + " .email-close-btn").click(function() {
			emailLightboxOmniture("email-close", "email:close", null);
			me.closeEmailLightbox();
		});
	
		// Privacy
		$("#email-lightbox-" + config.containerID + " .privacy-link").click(function() {
			emailLightboxOmniture("email-privacy", "email:privacy", null);
			return true;
		});
		
		// Terms
		$("#email-lightbox-" + config.containerID + " .terms-link").click(function() {
			emailLightboxOmniture("email-terms", "email:terms", null);
			return true;
		});
		
		// Close email popup if grey area is clicked
		$(".overlay-transparency").click(function(e) {
			if(e.target === this) {
				emailLightboxOmniture("email-close", "email:close", null);
				me.closeEmailLightbox();
			}
		});

		// Email Send Button
		$("#email-lightbox-" + config.containerID + " .send-email-btn").click(function() {
			validateEmailForm({
				'uniqueId':config.containerID
			});
			return false;
		});	
	}
	
	function serializeJSON(form) {
		var json = {};
		form.find(':input').each(
			function() {
				var val;
				if (!this.name) {return;}
				if ('radio' === this.type) {
					if (json[this.name]) {return;}
					json[this.name] = this.checked ? this.value:'';
				} else if ('checkbox' === this.type) {
					val = json[this.name];
					if (!this.checked) {
						if (!val) {json[this.name] = '';}
					} else {
						json[this.name] = typeof val === 'string' ? [ val,
								this.value ]:$.isArray(val) ? $.merge(
								val, [ this.value ]):this.value;
					}
				} else {json[this.name] = this.value.replace(/_DOUBLEQUOTE_/g,'&quot;');}
			});
		return json;
	}
	
	function validateEmailForm (json) {
		var strErrorContainer = null;
		var strKeyFocus = null;
		var strKeyToEmail = '#toEmail-' + config.containerID;
		var strKeyFromEmail = '#fromEmail-' + config.containerID;
		var strToEmail = $.trim($(strKeyToEmail).val());
		var strFromEmail = $.trim($(strKeyFromEmail).val());
		var strToEmailErrorContainer = ".address-to";
		var strFromEmailErrorContainer = ".address-from";
		
		// Reset errors
		$(".email-lightbox .error").hide();
		
		if (strFromEmail.length === 0) {
			strKeyFocus = strKeyFromEmail;
			strErrorContainer = strFromEmailErrorContainer;
		} else if (!strFromEmail.match(eonline.regEx.emailAddresses)) {
			strKeyFocus = strKeyFromEmail;
			strErrorContainer = strFromEmailErrorContainer;
		} else if (strToEmail.length === 0) {
			strKeyFocus = strKeyToEmail;
			strErrorContainer = strToEmailErrorContainer;
		}  else if (!strToEmail.match(eonline.regEx.emailAddresses)) {
			strKeyFocus = strKeyToEmail;
			strErrorContainer = strToEmailErrorContainer;
		} 
		
		if (strKeyFocus) {
			$(strErrorContainer).show();
			$(strKeyFocus).focus();
		} else {
			$("#email-lightbox-" + config.containerID + " .email-wrapper input[name='submit-email']").removeClass('button_send').addClass('inactive');
			$("#email-lightbox-" + config.containerID + " .email-wrapper input[name='submit-email']").attr("disabled",true);
			$("#email-lightbox-" + config.containerID + " .subscribe-wrapper .subscriber-email").html(strFromEmail);
			
			var strFormData = JSON.stringify(serializeJSON($("#email-lightbox-" + config.containerID + " .email-wrapper form")));
			$.ajax({
				"type": "post",
				"dataType": "json",
				"contentType": "application/json",
				"cache": "false",
				"url": "/mvc/hudson/mail/send",
				"data": strFormData
			}).done(function(data) {
				emailLightboxOmniture("email-send","email:send", null);
				if(customSocialBar.globalSettings.edition == 'us') {
					initSubscribe();
				} else {
					$("#email-lightbox-" + config.containerID + " .email-wrapper").hide();
					$("#email-lightbox-" + config.containerID + " .shared-wrapper").show();
					emailLightboxOmniture("email-complete", "email:complete", null);
				}
			});
		}
		return false;
	}
	
	/* Newsletter Subscribe */
	function initSubscribe() {
		$("#email-lightbox-" + config.containerID + " .email-wrapper").hide();
		$("#email-lightbox-" + config.containerID + " .subscribe-wrapper").show();
		emailLightboxOmniture("email", "email:success", "event5");
		
		//Click Handlers
		$("#email-lightbox-" + config.containerID + " .reject-newsletter").click(function() {
	    	me.closeEmailLightbox();
	    	emailLightboxOmniture("email-no-thanks", "email:no-thanks", null);
		});
	    $("#email-lightbox-" + config.containerID + " .additional-privacy-statement").click(function() {
	    	$("#email-lightbox-" + config.containerID + " .subscribe-wrapper").hide();
			$("#email-lightbox-" + config.containerID + " .privacy-wrapper").show();
		});
	    $("#email-lightbox-" + config.containerID + " .btn-back").click(function() {
	    	$("#email-lightbox-" + config.containerID + " .privacy-wrapper").hide();
			$("#email-lightbox-" + config.containerID + " .subscribe-wrapper").show();
			emailLightboxOmniture("email-privacy-back", "email:privacy-back", null);
		});
	    
		//Newsletter Subscribe
		$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[name='newsletter_subscribe']").click(function(){
			var reqCheck = $("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[name='newsletter-checkbox']").prop('checked');
		    var email_val = $("#email-lightbox-" + config.containerID + " .subscribe-wrapper .subscriber-email").html();
		    var isValidEmail = isEmail(email_val);
		    
		    $("#email-lightbox-" + config.containerID + " .subscribe-wrapper .error").css("visibility","hidden");
		    
			if (reqCheck && email_val != "" && isValidEmail){  			
				//Subscribe
				$.ajax({
		            type: "POST",
		            url: "/mvc/hudson/mail/newsLetterAdd",
		            data: {"edition" : "us", "email" : email_val, "news" : true},
		            dataType: "json",
		            timeout: 35000, // in milliseconds
		            success: function(returnData) { 
		            	emailLightboxOmniture("email-signup", "email:signup", null);
		            	if(returnData.status.code == 200) {
			   				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper").hide();
							$("#email-lightbox-" + config.containerID + " .shared-wrapper").show();
							emailLightboxOmniture("email-complete", "email:complete", null);
			   			} else {
			   				var statusMessage;
			   				if(returnData.status.code == 208){
			   					statusMessage = "This email is already subscribed.";
			   				} else {
			   					statusMessage = "Error subscribing, please try again later";
			   				}
			   				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[type='submit']").attr("disabled",true);
			   				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[type='submit']").addClass("disabled");
			   				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper .subscriber-email").html(statusMessage);
			   				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper .subscriber-email").addClass("error");
			   				return;
			   			}
		            }
		   		});
			} else {
				if (email_val == "" || !isValidEmail) {
					$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[name='subscribe-email']").focus();
					$("#email-lightbox-" + config.containerID + " .subscribe-wrapper .error.email .status-message").hide()
					$("#email-lightbox-" + config.containerID + " .subscribe-wrapper .error.email .invalid").show();
					$("#email-lightbox-" + config.containerID + " .subscribe-wrapper .error.email").css("visibility","visible");
				} else if (!reqCheck){
					//Checkbox not checked - action undefined
				}
				return;
			}
		});
		//Newsletter Custom checkbox
		$("#email-lightbox-" + config.containerID + " .subscribe-wrapper .custom-checkbox").toggle(function(){
				$(this).addClass("checked");
				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[name='newsletter-checkbox']").prop("checked", true);
				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[type='submit']").attr("disabled",false);
   				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[type='submit']").removeClass("disabled");
			}, function(){
				$(this).removeClass("checked");
				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[name='newsletter-checkbox']").prop("checked", false);
				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[type='submit']").attr("disabled", true);
   				$("#email-lightbox-" + config.containerID + " .subscribe-wrapper input[type='submit']").addClass("disabled");
		});
	}
	
	function emailLightboxOmniture(str68, linkName, customEvents) {
		s.eVar4=s.pageName;
		s.prop67="email";
		s.eVar67="email";
		s.prop68=str68;
		s.eVar68=str68;
		s.linkTrackVars="prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop9,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop15,eVar15,prop23,eVar24,prop25,eVar25,prop38,prop66,eVar66,prop67,eVar67,prop68,eVar68,eVar69,prop75,eVar75";
		if (customEvents != null) {
			s.linkTrackEvents=customEvents;
			s.events=customEvents;
		} else {
			s.events=null;
		}
		s.tl(this, "o", linkName);
	}
}

//we put the **concern and details of mapping Omniture calls to socials** into this global helper object
//if there are additional omniture sharing requirements this will need rework
 
customSocialOmnitureHelper = function(objCustomSocialBar, omnitureShareContentTitle, json) {
	objCustomSocialBar.buttonShareCallback = function(button) {
		
		if (typeof s == 'undefined') {
			return; //cannot do anything without it.
		}
		
		if (typeof omnitureShareContentTitle == "undefined") {
			omnitureShareContentTitle =  "";
		}
		
		var eVar67 = (json && json.eVar67)?json.eVar67:""; //REQ's... Share option (email, embed, social) passed with completion of distribute event(s).
		var eVar68 = (json && json.eVar68)?json.eVar68:""; //Set with custom link when a user clicks on the share button.  Populates with the Social Network the user is sharing to.
		var linkName = omnitureShareContentTitle; 
		var lnk = ""; //no req
		switch(button) {
			case "FACEBOOK-SHARE" :
				eVar67 = "social";
				eVar68 = "facebook";
				break;
			case "GOOGLE-SHARE":
				eVar67 = "social";
				eVar68 = "google+";
				break;
			case "TWEET" :
				eVar67 = "social";
				eVar68 = "twitter";
				break;
			case "PINTEREST" :
				eVar67 = "social";
				eVar68 = "pinterest";
				break;
			case "EMBED" : 
				eVar67 = "embed";
				eVar68 = "embed";
				break;
		}
		//custom set up of omniture per new social req
		s.eVar4 = s.pageName;
		s.prop67 = eVar67; //same
		s.eVar67 = eVar67;
		s.prop68 = eVar68; //same
		s.eVar68 = eVar68;
		s.events = "event5";
		s.linkTrackVars = "prop67,eVar67,prop68,eVar68";
		s.linkTrackEvents = s.events;

		s.tl(lnk, 'o', linkName);
	}
}


jQuery(document).ready(function(){
	jQuery('.cs-embed').on("click", function(){
		customSocialBar.closeEmailLightbox();
	});

});


 } //endif conditionial define