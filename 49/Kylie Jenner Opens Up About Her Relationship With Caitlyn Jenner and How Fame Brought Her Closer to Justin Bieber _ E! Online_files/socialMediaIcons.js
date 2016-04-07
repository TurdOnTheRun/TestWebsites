// Author: @briankueck Contact: @eDevelopers1

/* Usage:
	eonline.socialMediaIcons.init(json);

	All of these are optional. Add or delete them from your code as necessary. 
	The order that you place them is, will be the order that they are rendered out.
	They are provided here for you to see how to build your JSON code. 
	Remember to remove the last comma, to make it work in IE 7!

	eonline.socialMediaIcons.init({
		"facebookLike": {...},
		"facebookSend": {...},
		"twitterFollow": {...},
		"twitterTweet": {...},
		"googlePlus": {...},
		"email": {...},
		"embedCode": {...},
		"rss": {...}
	});
*/

if (typeof(eonline) === 'undefined') { var eonline = {}; }
eonline.socialMediaIcons = (function($) {

	var objCore = {
		"objDebug": {
			"boolAll": false,
			"boolBitly": false,
			"boolDomAttachId": false,
			"boolEdition": false,
			"boolEmailUnique": false,
			"boolFakeSocialBar": false,
			"boolFnTrace": false,
			"boolIntlUrls": false, // International URLs
			"boolKeys": false,
			"boolNonProdUrls": false,
			"boolShareUrl": false,
			"boolStrHTML": false
		},
		"objConfig": {
			"strProgramName": "eonline.socialMediaIcons (Tweet: @eDevelopers1): ",
			"strRootUrl": "http://%EDITION%.eonline.com",
			"bitleyLogin": "eolbutton",
			"bitleyAPIKey": "R_fb3df43cd7a663d2a8f595928959937c"
		},
		"objData": {
			//"boolIsLoaded": false
			"boolIsRunning": false,
			"objDataForTemplate": { /* This will be automatically added below:
				"id": 123456,
				"galleryId": 12345,
				"galleryTitleText": "...",
				"galleryTitleUrl": "...",
				"section": "..."
			*/
			},
			"strFacebookLikeKey": "",
			"strFacebookLikeHTML": "" /* Will be used as a template to display the 2nd Facebook Like button. We have to string
										 replace the data, since Facebook is somehow locking us out of initializing the FB Like
										 button a 2nd time, without a page reload. */
		},
		"objDom": {
			"objClasses": {
				"strFakeSocialClass": "fake"
			},
			"objIds": {
				"strEmailForm": "#%WIDGET_ID%-dynamic-content #modal-dialog #overlay_send_form",
				"objFacebookLike": {
					"strGlobalNav": "#Header_Layout #Header_SecondaryNav #social-media-links",
					"strWidgetModalDialog": "#%WIDGET_ID%-dynamic-content #modal-dialog #social-media-links",
					"strWidget": "#%WIDGET_ID% #social-media-links"
				}
			}/* ,
			"objPrefixes": {
			} */
		},
		"objTimers": {}
	};

	// To Do: Add this to the Base Library:
	var isLocalhost = (location.href.match(/localhost/i)) ? true : false;
	if (!isLocalhost) {
		// Safe-guard to turn off all debugging options on all non-localhost servers, in-case developers accidently leave them turned on.
		objCore.objDebug = resetValues(objCore.objDebug);
	}

	// Checks for "?debug=socialIntlUrls" or "&debug=socialIntlUrls" in the prod URL.
	if (location.search.indexOf('debug=socialIntlUrls') > -1) {
		objCore.objDebug.boolIntlUrls = true;
	}

	// Checks for "?debug=bitly" or "&debug=bitly" in the prod URL.
	if (location.search.indexOf('debug=bitly') > -1) {
		objCore.objDebug.boolBitly = true;
		objCore.objDebug.boolFnTrace = true;
	}

	function addHTML_EmailIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn addHTML_EmailIcon'); }
		var strHTML = '<li id="email-bttn-' + json.uniqueId + '" class="email-bttn">';
			strHTML += '<div class="lWOn email' + ((json.useEnvelope) ? ' envelope' : '') + '" data-omniture="' + json.omniture1 + '"></div>';
			strHTML += '</li>';
		renderHTML(json, strHTML, 'icon');
	
		// This appears below the </ul> code. Not inside of it.
		var strHTML = '<div id="email-send-form-' + json.uniqueId + '" class="social-Send-Email">Loading...</div>';
			strHTML += '<div id="email-overlay-' + json.uniqueId + '" class="email-overlay" style="background-color: rgb(0, 0, 0); opacity: 0.7; display: none;z-index:20;filter:alpha(opacity=70);"></div>';
		renderHTML(json, strHTML, 'emailIcon');
	}

	function addHTML_EmbedCodeIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn addHTML_EmbedCodeIcon'); }
		var strHTML = '<li id="embed-bttn-wrap-' + json.uniqueId + '" class="embed">';
			/* The anchor tag is used for IE 7-9, but it will be replaced by a Flash button in Firefox, Chrome, Safari (Desktop) & Opera.
			   iPad Safari won't allow Flash, so iPad's won't have "<> Embed" buttons. */
			strHTML += '<a href="javascript:void(0);" id="embed-bttn-' + json.all.videoId + '" data-omniture="' + json.omniture + '"></a>';
			strHTML += '</li>';
		renderHTML(json, strHTML, 'icon');
	}

	function addHTML_FacebookLikeIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn addHTML_FacebookLikeIcon'); }
		var strHTML = '<li id="facebook-like-' + json.uniqueId + '" class="facebook-like">';
			strHTML += '<div id="fb-root"></div>';
			strHTML += '<div class="fb-like" data-href="' + json.shareUrl + '" data-send="' + json.showFacebookSend + '" data-layout="button_count" data-width="90" data-show-faces="false" data-font="arial" data-omniture="' + json.omniture1 + '"></div>';
			strHTML += '</li>';
		renderHTML(json, strHTML, 'icon');
	}

	function addHTML_GooglePlusIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn addHTML_GooglePlusIcon'); }
		var strHTML = '<li id="google-plus-' + json.uniqueId + '" class="google-plus" style="float:left;">';
			strHTML += '<div class="g-plusone" data-size="medium" data-href="' + json.shareUrl + '" data-omniture="' + json.omniture + '"></div>';
			strHTML += '</li>';
		renderHTML(json, strHTML, 'icon');
	}

	function addHTML_RssIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn addHTML_RssIcon'); }
		var strHTML = '<li id="rss-icon-' + json.uniqueId + '" class="rss">';
			strHTML += '<a href="' + json.shareUrl + '" title="' + json.title + '" data-omniture="' + json.omniture + '"><img src="/resources/images/header_footer/black-rss.png" alt="Mobile" /></a>';
		strHTML += '</li>';
		renderHTML(json, strHTML, 'icon');
	}

	function addHTML_TwitterFollowIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn addHTML_TwitterFollowIcon'); }
		var strHTML = '<li id="twitter-follow-bttn-' + json.uniqueId + '" class="twitter">';
			strHTML += '<a href="' + json.shareUrl + '" class="twitter-follow-button" data-related="' + json.related + '" data-counturl="' + json.shareUrl + '" data-show-count="' + json.showCount + '" data-show-screen-name="false" data-omniture="' + json.omniture + '">Follow @twitter</a>';
			strHTML += '</li>';
		renderHTML(json, strHTML, 'icon');
	}

	function addHTML_TwitterTweetIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn addHTML_TwitterTweetIcon'); }
		if ((json.uniqueId === 'undefined') || (!json.uniqueId)) {
			if (json.all.photoId) {
				json.uniqueId = json.all.photoId;
			} else if (json.all.videoId) {
				json.uniqueId = json.all.videoId;
			}
		}
		var linkURL = json.shareUrl;
			linkURL += ((typeof(json.text) !== 'undefined') && (json.text)) ? '&text=' + json.text : '';
		var tweetBoxURL = json.messageUrl || json.shortenedUrl || json.shareUrl;
		var strDataTxt = json.twitterTweetText || json.title;
		var strHTML = '<li id="twitter-tweet-bttn-' + json.uniqueId + '" class="twitter">';
			strHTML += '<a href="' + linkURL + '" class="twitter-share-button" data-url="' + tweetBoxURL + '" data-counturl="' + json.shareUrl + '" data-count="horizontal" data-via="' + json.accountName + '" data-text="' + strDataTxt + '" data-related="' + json.related + '" data-omniture="' + json.omniture + '"></a>'; // Tweet
			strHTML += '</li>';
		renderHTML(json, strHTML, 'icon');
	}

	function bindListeners(json, strKey) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: bindListeners'); }
		switch(strKey) {
			case 'email':
				setTimeout(function() {
					bindListenersEmail(json);
				},500);
			break;
			case 'facebookLike':
				setTimeout(function() {
					/*$('.fb-like').click(function(){ // This doesn't work. We can't target the actual FB Like button's close X icon, which is inside of an iFrame...
						debugger;
					});*/
					// ... So let's try it with hover states.
					if (objCore.objDebug.boolAll || objCore.objDebug.boolDomAttachId) {
						fb('domAttachId: ' + json.all.domAttachId);
					}
					$(json.all.domAttachId + ' .facebook-like').mouseover(function() {
						$(this).addClass('active'); // This works to keep the FB Like Comments box from appearing as a 150px wide by 21px high microbar.

						// Hopefully this will help remove the strange FB Like's iframe blocking, of the other social buttons & the 1st 3 carousel items in the V2 widget.
						var strTimerKey = json.all.domAttachId + '-facebook-like';
						//clearTimeout(objCore.objTimers[strTimerKey]);
						objCore.objTimers[strTimerKey] = setTimeout(function() {
							$(this).removeClass('active');
						},333);
					});
					/* Don't block carousel thumbnails, with the FB Like icon's hidden <iframe> tag
					 * Reason: The hidden FB iframe, which won't disappear from the V2 widget... after a thumbnail
					 * has been clicked on & the icons are reloaded via Ajax & FB.XFBML.parse. We have to wait until 
					 * the user mouses-out of the entire social bar area... including the hidden iframe, before the 
					 * .facebook-like's .active class is automatically removed by jQuery. Once that happens, then 
					 * the carousel thumbnails will be clickable again. Odds are that the user will mouse around the 
					 * screen, which will cause the hidden iFrame to disappear faster than they can click on the 
					 * thumbnail. Only QA would recreate this edge case, where they click off of the FB Like 
					 * Comments box & then try to click on of the 1st 3 thumbnails.
					 * These help, but there are still edge-cases on localhost, where the <iframe> blocks the thumbnails. We can't easily remove those, as FB is the one which drops the iframe & their code into it. It's frustrating!
					 */
					$(json.all.domAttachId + ' .facebook-like').mouseout(function() {
						$(this).removeClass('active');
					});
					$(json.all.domAttachId + ' .facebook-like iframe').change(function() {
						setTimeout(function() {
							$(json.all.domAttachId + ' .facebook-like').removeClass('active');
						},500);
					});
					$('.eol-carousels').mouseover(function() {
						$(json.all.domAttachId + ' .facebook-like').removeClass('active');
					});
				},3000);
			break;
			case 'embedCode':
				if ((typeof(eonline.videoPlayerEngine) !== 'undefined') && (typeof(eonline.videoPlayerEngine.getWidgetId) !== 'undefined')) {
					var strWidgetIdShort = eonline.videoPlayerEngine.getWidgetId(json.all.widgetId, true, true);
					var strEmbedBttnWrapId = '#embed-bttn-wrap-' + strWidgetIdShort + '-' + json.all.videoId;
					/*$(strEmbedBttnWrapId).click(function(){
						if (eonline && eonline.videoPlayerEngine && eonline.videoPlayerEngine.getEmbedCode){
							eonline.videoPlayerEngine.getEmbedCode(json.all.videoId, 3);
						}
					});*/
					$(strEmbedBttnWrapId).mouseover(function() {
						$(this).addClass('active'); // This works to keep the FB Like Comments box from appearing as a 150px wide by 21px high microbar.
					});
					$(strEmbedBttnWrapId).mouseout(function() {
						$(this).removeClass('active');
					});
				}
			break;
		}
	}

	function bindListenersEmail(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn bindListenersEmail'); }
		if ((typeof(objCore.objData.boolIsRunning) === 'undefined') || (!objCore.objData.boolIsRunning)) {
			/* Email Button's onClick / Open Dialog State.
			 * Known Trigger Locations: 
			 * 1. Video Detail Page's Email Button.
			 * 2. Possible other locations would be in widgets or show packages or anywhere there is a horizontal social media icons bar. Unknown at this time.
			 */
			json.shareUrl = checkForFullUrl(json);
			var json1 = replacePlaceholdersEmail({
				"emailUniqueId": json.uniqueId,
			});
			json.uniqueId = json1.emailUniqueId;
			
			$("#email-bttn-" + json.uniqueId + ' .email').click(function(e){
				closeEmailForms();
				objCore.objData.boolIsRunning = true;
				$("#email-send-form-" + json.uniqueId).css("visibility","visible");
				var json2 = replacePlaceholdersEmail({
					"emailShareUrl": json.shareUrl
				});
				var json3 = replacePlaceholdersEmail({
					"emailSubject": (typeof(json.emailSubj) !== 'undefined') ? json.emailSubj : json.subject
				});
				if ((objCore.objDebug.boolAll) || (objCore.objDebug.boolEmailUnique)) {
					fb('/services/send_email.jsp?contentURL=' + json2.emailShareUrl + '&uniqueId=' + json.uniqueId + '&emailSubject=' + json3.emailSubject);
				}
				$.get('/services/send_email.jsp',{
					contentURL: json2.emailShareUrl,
					uniqueId: json.uniqueId,
					emailSubject: json3.emailSubject
				}).done(function(data) {
					// Load the data into the popup window.
					if (typeof(isIE) === 'undefined') {
						var ua = navigator.userAgent;
						var isIE = (ua.match(/MSIE/i)) ? true : false;
					}
					if (!isIE) {
						$("#email-send-form-" + json.uniqueId).html(data);
					} else {
						var objDom = document.getElementById('email-send-form-' + json.uniqueId);
						objDom.innerHTML = data;
					}

					// Textarea Box
					var strMsgKey = "#email-send-form-" + json.uniqueId + " #messageText-" + json.uniqueId;
					$(strMsgKey).keyup(function(){cutMsg(json, $(this), 1000, false);});
					$(strMsgKey).blur(function(){cutMsg(json, $(this), 1000, true);});
					
					$("#friendEmail-" + json.uniqueId).on({
					    focus:function(){                   
					        if(this.value == "Enter your friend's email") this.value = "";
					      },
					      blur:function(){
					        if(this.value == "") this.value = "Enter your friend's email";
					      }
					  });
					
					$("#yourEmail-" + json.uniqueId).on({
						focus:function(){                   
					        if(this.value == "Enter your email") this.value = "";
					      },
					      blur:function(){
					        if(this.value == "") this.value = "Enter your email";
					      }
					  });

					// Email Close "X" button
					$("#email-send-form-" + json.uniqueId + " #emailClose-" + json.uniqueId).unbind('click').click(function() {
						closeEmailForms();
					});
					$("#email-send-form-" + json.uniqueId + " #emailClose-" + json.uniqueId).attr({"data-omniture":json.omniture3});
					
					$("#email-send-form-" + json.uniqueId + " #email-close-response").unbind('click').click(function() {
						closeEmailForms();
					});

					// Email Send Button
					$("#email-send-form-" + json.uniqueId + " #overlay_submit_button-" + json.uniqueId).attr({"data-omniture":json.omniture2}).click(function() {
						validateEmailForm({
							'uniqueId': json.uniqueId
						});
						return false;
					});

					resetFlag();
					return false;
				});
				$("#email-send-form-" + json.uniqueId).show();
				$("#email-overlay-" + json.uniqueId).show();
			});

			// Gray Background Overlay
			$("#email-overlay-" + json.uniqueId).click(function() {
				closeEmailForms();
			});
		}

		resetFlag();
	}

	/* We're now caching Bitly Shortened URLs for 12-hours, before re-calling the Bitly API from the server-side.
	 * DO NOT USE the api.bitly.com URL here, or we'll see another spike in our calls to Bitly's servers.
	 */
	function bitlyUrlShortener(strLongUrl, fnCallback) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: bitlyUrlShortener'); }
		if (objCore.objDebug.boolAll || objCore.objDebug.boolBitly) {
			fb('Before Bitly - Original URL: ' + strLongUrl);
		}
		strLongUrl = checkForFullUrl({"shareUrl": strLongUrl});
		if (objCore.objDebug.boolAll || objCore.objDebug.boolBitly) {
			fb('Before Bitly - Internationalized URL: ' + strLongUrl);
		}
		$.getJSON("/mvc/shorturl?url=" + strLongUrl, function(data) { // + "callback=?"
			if (objCore.objDebug.boolAll || objCore.objDebug.boolBitly) {
				fb('After Bitly - Shortened URL: ' + data.rawResponse);
			}
			fnCallback(data.rawResponse);
		});
	}

	function checkForEdition(edition) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: checkForEdition'); }
		if (objCore.objDebug.boolIntlUrls) {debugger;}
		if ((typeof(edition) === 'undefined') || (!edition) || (edition.length === 0)) { // Add it!
			if (objCore.objDebug.boolAll || objCore.objDebug.boolEdition || objCore.objDebug.boolBitly) {
				fb('Before Edition Split - edition: ' + edition);
			}
			var arrUrlParts = location.hostname.split('.');
			var subDomain = arrUrlParts[0];
			if (subDomain.indexOf('-') > -1) { // Int'l Dev, Test or Staging
				var arrEditionPieces = subDomain.split('-');
				edition = arrEditionPieces[0];
			} else if ((subDomain === 'www') || ((typeof(is_Prod) !== 'undefined') && (!is_Prod))) { // Only change editions, if its a US site.
				edition = 'us';
			} else {
				edition = subDomain; // Leave as CA, FR, DE, etc...
			}
			if (objCore.objDebug.boolAll || objCore.objDebug.boolEdition || objCore.objDebug.boolBitly) {
				fb('After Edition Split - edition: ' + edition);
			}
		}
		return edition;
	}

	function checkForTwitterAccountName(edition, accountName) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: checkForTwitterAccountName'); }
		edition = edition || checkForEdition(edition);
		if (objCore.objDebug.boolAll || objCore.objDebug.boolEdition || objCore.objDebug.boolBitly) {
			fb('Before Twitter Account Name Check - edition: ' + edition);
		}
		switch (edition) {
			case 'ca':
				accountName = 'eonlinecanada';
			break;
			case 'de':
				accountName = 'eonlineDE';
			break;
			case 'fr':
				accountName = 'eonlineFR';
			break;
			case 'it':
				accountName = 'eonlineIT';
			break;
			case 'uk':
				accountName = 'EOnlineUK';
			break;
			default:
				accountName = 'eonline';
			break;
		}
		if (objCore.objDebug.boolAll || objCore.objDebug.boolEdition || objCore.objDebug.boolBitly) {
			fb('After Twitter Account Name Check - accountName: ' + accountName);
		}
		return accountName;
	}

	function checkForFullUrl(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: checkForFullUrl'); }
		if (!json || !json.shareUrl) return '';
		if (objCore.objDebug.boolAll || objCore.objDebug.boolNonProdUrls || objCore.objDebug.boolBitly) {
			fb('json.shareUrl: ' + json.shareUrl);
			fb('json.shareUrl[0]: ' + json.shareUrl[0]);
		}
		if (!json.edition) {
			json.edition = checkForEdition();
		}
		var strFullUrl = '';
		if (json.shareUrl.indexOf('://') === -1) {
			// Append the root URL to the shareUrl.
			strFullUrl = getRootUrl(json.edition);
			if (json.shareUrl[0] !== '/') {
				strFullUrl += '/';
			}
			strFullUrl += json.shareUrl;
		} else {
			strFullUrl = json.shareUrl;
		}
		if (objCore.objDebug.boolAll || objCore.objDebug.boolNonProdUrls || objCore.objDebug.boolBitly) {
			fb('Before Changing - strFullUrl: ' + strFullUrl);
		}

		// Forces non-Prod URLs to be shared out as Prod URLs on non-Prod servers, so that we can QA social media icons (FB, Twitter, G+1, Bitly) on non-prod servers.
		if (objCore.objDebug.boolIntlUrls) {debugger;}
		var arrUrlPieces = strFullUrl.split('/');
		for (var i=0, j=arrUrlPieces.length; i<j; i++) {
			if (arrUrlPieces[i].indexOf('.eonline.com') > -1) {
				// This URL splitter is being used instead of string replacements, because we have international subdomains with dashes in them.
				var arrSubDomains = arrUrlPieces[i].split('.');
				if (arrSubDomains.length === 4) { // Has 3 dots & 4 strings like a.b.c.d, instead of 2 dots & 3 strings like a.b.c!
					// Knocks out item 2 or "b" in: a.b.c.d
					var item1 = arrSubDomains[0];
					arrSubDomains = arrSubDomains.slice(2);
					arrSubDomains.unshift(item1);
				}
				if (arrSubDomains[0].indexOf('-') > -1) {
					var arrSubDomainPieces = arrSubDomains[0].split('-'); // intl-test or intl-staging URLs will...
					arrSubDomains[0] = arrSubDomainPieces[0]; // ... become: ca or de or fr & eventually will become: ca.eonline.com, or de.eonline.com or fr.eonline.com, etc...
				} else if ((json.edition) && (json.edition !== 'us')) {
					arrSubDomains[0] = json.edition; // Changes the first sub-domain to ca or fr or uk, so that URLs will eventually become: ca.eonline.com or fr.eonline.com or uk.eonline.com
				} else {
					arrSubDomains[0] = 'www'; // Changes the first sub-domain to www, so that the URL will eventually become: www.eonline.com
				}
				if (objCore.objDebug.boolAll || objCore.objDebug.boolNonProdUrls || objCore.objDebug.boolBitly) {
					fb('After: arrSubDomains: ' + arrSubDomains);
					fb('Before: arrSubDomains.length: ' + arrSubDomains.length);
				}

				// Repack the sub-domains array.
				arrUrlPieces[i] = arrSubDomains.join('.');

				if (objCore.objDebug.boolAll || objCore.objDebug.boolNonProdUrls || objCore.objDebug.boolBitly) {
					fb('After: arrSubDomains: ' + arrSubDomains);
					fb('arrSubDomains.length: ' + arrSubDomains.length);
				}
				break;
			} else if ((arrUrlPieces[i].indexOf('localhost') > -1) || (arrUrlPieces[i].indexOf(':8080') > -1)) { // Localhost & iPad IP Address URLs, which don't use 'localhost' in them. They will still use port 8080, instead of port 80.
				arrUrlPieces[i] = getRootUrl(json.edition);
			}
		}

		strFullUrl = arrUrlPieces.join('/');
		if (objCore.objDebug.boolIntlUrls) {debugger;}
		if (objCore.objDebug.boolAll || objCore.objDebug.boolNonProdUrls || objCore.objDebug.boolBitly) {
			fb('After Changing - strFullUrl: ' + strFullUrl);
		}

		return strFullUrl.toLowerCase();
	}

	// Adds either a "#" (jQuery id selector) or a "." (jQuery class selector) to the beginning of domAttachId, if the web dev didn't add it explicitly.
	function checkForJQuerySign(strKey, chrSign) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: checkForJQuerySign'); }
		strKey = $.trim(strKey);
		if ((strKey[0] !== '#') && (strKey[0] !== '.')) {
			strKey = chrSign + strKey;
		}
		if (objCore.objDebug.boolAll || objCore.objDebug.boolKeys) {
			fb('strKey: ' + strKey);
		}
		return strKey;
	}

	/* Dialog Close State. 
	 * Known Trigger Locations: 
	 * 1. Email Dialog's Close X Button or 
	 * 2. Email Dialog's Thank You Form "close" link.
	 */
	function closeEmailForms() {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: closeEmailForms'); }
		/* Don't use these, which only closes 1 email form: 
		 * $("#email-send-form-" + uniqueId).css("visibility","hidden");
		 * $("#email-overlay-" + uniqueId).hide();
		*/

		// Use these which will close all open email forms:
		$('.social-Send-Email').css("visibility","hidden");
		$('.email-overlay').hide();
		$('.ajax-loading-icons').hide();
	}

	function cutMsg(json, objDom, maxLength, canTrim) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: cutMsg'); }

		// Trims the message & restricts it to the maxLength.
		var str = (canTrim) ? $.trim(objDom.val()) : $(objDom).val();
		str = str.substr(0, maxLength);
		$(objDom).val(str);

		// Updates the Email Form's Counter.
		$('#feedback_char_count-' + json.uniqueId).html(maxLength - str.length);
	}

	function emailSubmitFormLoader(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: emailSubmitFormLoader'); }

		// update the submit button styles and disable it to prevent any more clicks
		$('#overlay_submit_button-' + json.uniqueId).removeClass('button_send').addClass('button_send_deactive'); // className = 'button_send_deactive';
		$('#overlay_submit_button-' + json.uniqueId).attr("disabled", "disabled"); // .disabled = 'true';
	}

	function fakeSocialBar(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: fakeSocialBar'); }

		// Calls the Helper Functions, to auto-correct anything which the web dev forgot to add.
		json.domAttachId = checkForJQuerySign(json.domAttachId, '#');
		//json.fakeSocialClass = stripJQuerySign(json.fakeSocialClass);
		var strFakeSocialClass = objCore.objDom.objClasses.strFakeSocialClass;

		var objULTag = $(json.domAttachId + ' #social-media-links');

		// Adds the "fake" class to the <ul> tag.
		objULTag.addClass(strFakeSocialClass); // json.fakeSocialClass
		objULTag.empty(); // Empties out tables, form data, buttons, etc... from the Social <ul></ul> tag.

		// Adds the Fake <li> tags.
		// Note: These array keys are the class names, not the JSON "show*" properties. This cuts down on copied & pasted object checking & append() function code.
		var arrKeys = ['facebookLike','facebookSend','twitterFollow','twitterTweet','googlePlusone','email','embedCode','rss'];
		for (var i=0, j=arrKeys.length; i<j; i++) {
			// We dynamically build the JSON "show*" properties here, by converting the "facebookLike" class name into a showFacebookLike property.
			var strKey = 'show' + arrKeys[i][0].toUpperCase() + arrKeys[i].substring(1);
			if ((objCore.objDebug.boolAll) || (objCore.objDebug.boolFakeSocialBar)) {
				fb('strKey: ' + strKey);
			}
			// Adds the fake <li></li> tag, which speeds up clicking through the Responsive Photo Gallery.
			if (json[strKey]) {
				objULTag.append('<li class="' + arrKeys[i] + '"></li>');
			}
		}
	}

	// Firebug. Short-cut function to eliminate having to repeatedly type "console.log".
	function fb(obj) { /* || (objCore.objDebug.boolBitly) */
		if (((objCore.objDebug.boolAll) || (objCore.objDebug.boolBitly) || (objCore.objDebug.boolDomAttachId) || (objCore.objDebug.boolEdition) || (objCore.objDebug.boolEmailUnique) || (objCore.objDebug.boolFakeSocialBar) || (objCore.objDebug.boolFnTrace) || (objCore.objDebug.boolKeys) || (objCore.objDebug.boolNonProdUrls) || (objCore.objDebug.boolShareUrl) || (objCore.objDebug.boolStrHTML)) && 
			(typeof(console) !== 'undefined') && (typeof(console.log) !== 'undefined') && obj) {
			console.log(objCore.objConfig.strProgramName + obj);
		}
	}

	function getData(strKey) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getData'); }
		// Allows for any of the data from the Core JSON object to be returned.
		strKey = strKey.replace('objCore.','');
		var arrKeyParts = strKey.split('.');
		var data = objCore;
		for (var i=0, j=arrKeyParts.length-1; i<=j; i++) {
			data = data[arrKeyParts[i]];
		}
		return data;
	}

	function getDomId(json, strKey) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getDomId'); }
		switch(strKey) {
			case 'FacebookLikeGlobalNav':
				var strId = objCore.objDom.objIds.objFacebookLike.strGlobalNav;
			break;
			case 'FacebookLikeWidget':
			case 'Widget':
				var strId = objCore.objDom.objIds.objFacebookLike.strWidget;
			break;
			case 'FacebookLikeWidgetModalDialog':
			case 'WidgetModalDialog':
				var strId = objCore.objDom.objIds.objFacebookLike.strWidgetModalDialog;
			break;
			case 'EmailForm':
			default:
				var strId = objCore.objDom.objIds['str' + strKey]; // Dynamically creates: "strEmailForm".
			break;
		}
		strId = strId.replace(/%WIDGET_ID%/gi,json.all.widgetId);
		return strId;
	}

	function getFacebookKey(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getFacebookKey'); }
		var strVideoId = (typeof(json.all.videoId) !== 'undefined') ? json.all.videoId + '' : '';
		var strTitle = (typeof(json.title) !== 'undefined') ? json.title + '' : '';

		switch(json.all.widgetType) {
			case 'c11':
				// Switch to the C11 Modal Dialog if we're using the C11 widget.
				var strKey = 'FacebookLikeWidgetModalDialog';
			break;
			case 'f1':
			case 'g1':
			case 'g3':
				// Use the Widget's FB Like icon.
				var strKey = 'FacebookLikeWidget';
			break;
			default:
				// Check for the Global Nav Facebook Like icon.
				var strKey = 'FacebookLikeGlobalNav';
			break;
		}
		return strKey;
	}

	function getKey(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getKey'); }

		if (json.all.widgetId && json.all.widgetType === 'c11') {
			var strKey = getDomId(json, 'WidgetModalDialog');
		} else if (json.all.widgetId) {
			var strKey = getDomId(json, 'Widget');
		} else {
			var strKey = json.all.domAttachId;
		}
		if (strKey.indexOf(' #social-media-links') === -1) {
			strKey += ' #social-media-links';
		}
		return strKey;
	}

	function getRootUrl(edition) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getRootUrl'); }
		edition = (typeof(edition) !== 'undefined') ? edition.replace('us','www') : 'www';
		return objCore.objConfig.strRootUrl.replace(/%EDITION%/gi,edition);
	}

	function getIntlEdition(i18nEdition) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: getIntlEdition'); }

		i18nEdition = i18nEdition || 'en_US'; // See: http://www.i18nguy.com/origini18n.html
		var strUrl = location.href;
		if (objCore.objDebug.boolAll) { // Debug with these:
			strUrl = 'http://fr-localhost';
			//strUrl = 'http://fr.localhost';
		}

		// Prod uses "//fr." in the URL, like: http://fr.eonline.com. All other servers use "//fr-" in the URL.
		if ((strUrl.indexOf('//fr.') > -1) || (strUrl.indexOf('//fr-') > -1)) {
			i18nEdition = 'fr_FR';
		} else if ((strUrl.indexOf('//it.') > -1) || (strUrl.indexOf('//it-') > -1)) {
			i18nEdition = 'it_IT';
		}
		/* Turn on if requested:
		else if ((strUrl.indexOf('//de.') > -1) || (strUrl.indexOf('//de-') > -1)) {
			i18nEdition = 'de_DE'; // Nope... this should remain in English for now.
		} */

		return i18nEdition;
	}

	function init(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn: init'); }
		if (objCore.objDebug.boolAll || objCore.objDebug.boolEdition) {
			// Turn one of these on to test out the Int'l sites!
			//json.all.edition = 'au';
			//json.all.edition = 'ca';
			//json.all.edition = 'de';
			//json.all.edition = 'fr';
			//json.all.edition = 'it';
			//json.all.edition = 'uk';
			//json.all.edition = 'us';
			//debugger;
		}

		// Check for the Int'l Page Edition
		json.all.edition = checkForEdition(json.all.edition);

		// Check for the Int'l Twitter Account Names
		/*if (objCore.objDebug.boolAll || objCore.objDebug.boolEdition) {
			debugger;
		}*/
		json.twitterTweet.accountName = checkForTwitterAccountName(json.all.edition, json.twitterTweet.accountName);

		// Check for Show Packages
		json.all.isShowPackage = (location.href.match(/shows/i)) ? true : false;

		// Map the full URL back to the shareUrl variable, so that we don't end up munging URLs like: http://www.facebook.com/videos/our-video-title-name, instead of http://www.eonline.com/videos/our-video-title-name
		json.all.shareUrl = checkForFullUrl(json.all);
		initDom(json.all);

		/*if (objCore.objDebug.boolAll || objCore.objDebug.boolEdition) {
			debugger;
		}*/

		if ((typeof(json.all.sortOrder) !== 'undefined') && (json.all.sortOrder) && (json.all.sortOrder.length > 0)) {
			// Turns commas into pipes, so that both a CSV & a pipe-delimited input strings can be used.
			if (json.all.sortOrder.indexOf(',') > -1) {
				json.all.sortOrder = json.all.sortOrder.replace(/,/g,'|');
			}

			// Moves the json.all object to the front of the sorted list.
			json.all.sortOrder = json.all.sortOrder.replace('all','');
			json.all.sortOrder = json.all.sortOrder.replace('||','|');
			json.all.sortOrder = 'all|' + json.all.sortOrder;

			// Split the sort order string, based on pipes.
			var arrKeys = json.all.sortOrder.split('|');

			// Sorts the array.
			var jsonSorted = {}; // Don't use this: $.extend({}, arrKeys); since it will create an integer indexed array, instead of a named property indexed array.
			for (var i=0, j=arrKeys.length; i<j; i++) {
				jsonSorted[arrKeys[i]] = json[arrKeys[i]];
			}

			// Maps the sorted array back to the original variable.
			json = jsonSorted;
		}

		loadIcons(json);
		//objCore.objData.boolIsLoaded = true;
	}

	function initDom(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initDom'); }
		var strHTML = '<ul id="social-media-links" class="social-links social-buttons ' + ((json.showHorizontal) ? 'horizontal' : '') + ' ' + ((json.ajaxReloaded) ? 'ajax-reloaded' : 'js-on-page-load') + '">';
			strHTML += '</ul>';
		renderHTML(json, strHTML, 'root');
	}

	function initJS_EmailIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initJS_EmailIcon'); }
		// Nothing at this time.
	}

	function initJS_EmbedCodeIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initJS_EmbedCodeIcon'); }
		if ((typeof(eonline) !== 'undefined') && (typeof(eonline.videoPlayerEngine) !== 'undefined')) {
			eonline.videoPlayerEngine.setData('boolIsEmbedBttnLoaded', false); // Allows the 2nd "<> Embed" button to load.
			if (json.all.isShowPackage) {
				eonline.videoPlayerEngine.setData('boolIsShowPackage', true);
				eonline.videoPlayerEngine.setData('arrVideos.' + json.all.videoId + '.objThumbnails.objImgSrc.strLarge', json.bigThumb);
				eonline.videoPlayerEngine.setData('arrVideos.' + json.all.videoId + '.objVideo.strTitle', json.title);
				eonline.videoPlayerEngine.setData('arrVideos.' + json.all.videoId + '.objVideo.objUrls', json.shareUrl);
			}
			eonline.videoPlayerEngine.initFlashEmbedBttn(json.all.videoId, json.all.widgetId, true);
		}
	}

	function initJS_FacebookLikeIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initJS_FacebookLikeIcon'); }
		// Custom eonline.com implementation of the FB Like DOM insertion code, since Facebook keeps breaking their like buttons.
		window.fbAsyncInit = function() {
			FB.init({
				"appId": "195662528604", // App ID
				"status": "true", // check login status
				"cookie": "true", // enable cookies to allow the server to access the session
				"xfbml": "true" // parse XFBML
			});
		};

		json.language = getIntlEdition(json.language);

		if ((typeof(FB) === 'undefined') || (!FB)) { // FaceBook, not FireBug.

			//$('#facebook-jssdk').unbind().html("").remove();
			//document.head.removeChild(js);

			var js = document.createElement('script');
				js.async = true;
				js.id = 'facebook-jssdk-' + json.all.videoId;
				js.src = '//connect.facebook.net/' + json.language + '/all.js#xfbml=1&appId=195662528604';

			var forceRefresh = (json.all.widgetType === 'c11') ? true : false;
			renderJsNode(json, js, forceRefresh);
			intTimeout = 2000;
		}
		(function initXFBML() {
			if ((typeof(FB) !== 'undefined') && (typeof(FB.XFBML) !== 'undefined')) {
				var strKey = getKey(json) + ' .facebook-like';
				FB.XFBML.parse($(strKey)[0]);

				/* This doesn't work. We can't target the actual button, which is inside of an iFrame.
				if (!$(strKey + ' iframe').hasClass('fb_iframe_widget_lift')) {
					$(strKey + ' iframe').addClass('fb_iframe_widget_lift');
					$(strKey + ' iframe .pluginButtonXOn').click(function() {
						$(strKey + ' iframe').removeClass('fb_iframe_widget_lift');
					});
					$(strKey + ' iframe .uiButton input').click(function() {
						$(strKey + ' iframe').removeClass('fb_iframe_widget_lift');
					});
				}
				*/
			} else {
				setTimeout(function() {
					initXFBML();
				}, 500);
			}
		})();
	}

	function initJS_GooglePlusIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initJS_GooglePlusIcon'); }

		if (typeof(gapi) === 'undefined') {
			var js = document.createElement('script');
				js.type = 'text/javascript';
				js.id = 'gapi';
				js.src = 'https://apis.google.com/js/plusone.js';
				try { // IE doesn't like this:
					js.innerText = "{parsetags: 'explicit'}";
				} catch(e) {}
			var forceRefresh = (location.href.indexOf('/videos/') > -1) ? true : false;
			renderJsNode(json, js, forceRefresh);
		}

		setTimeout(function() {
			gapi.plusone.go();
		}, 500);
	}

	/*function initJS_RssIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initJS_RssIcon'); }
		// Nothing at this time.
	}*/

	/*function initJS_TwitterFollowIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initJS_TwitterFollowIcon'); }
		// Nothing at this time.
	} */

	function initJS_TwitterTweetIcon(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn initJS_TwitterTweetIcon'); }
		/* NOTE: DO NOT USE TWITTER'S COPY & PASTED CODE FROM THIS URL: https://twitter.com/about/resources/buttons#follow
		   REASON: Multiple Tweet buttons will be dropped onto a page with this file. With Twitter's code, only 1 Twitter button will be rendered...
		   not 2-n Tweet buttons. Our code (which is re-written below) will create multiple Tweet buttons... even though same .js file is loaded 
		   repeatedly into the DOM. */

		// Create a new <script type="text/javascript"> tag.
		var js = document.createElement('script');
			js.id = 'twitter-wjs';
			js.src = '//platform.twitter.com/widgets.js';

		// Get the 1st <script> tag on the page.
		var fjs = document.getElementsByTagName('script')[0];

		// Append this new script, before that script tag.
		fjs.parentNode.insertBefore(js,fjs);
	}

	function initTwitterBttns() { // This is called by the social.media.icons.tag file.
		initJS_TwitterTweetIcon();
	}

	function loadIcons(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn loadIcons'); }
		// Loads the icons, based on the whichever objects are in the JSON input data.
		// The icons will render out in the order that you stack your JSON objects. You, not the code, controls the sort order.
		for (var property in json) {
			if (typeof(json[property]) === 'undefined') {
				continue;
			}
			if (property !== 'all') {
				if (typeof(json[property].all) === 'undefined') {
					json[property].all = json.all;
				}

				// Looks for overridden URLs. If not found, then map the json.all.shareUrl to the json.*.shareUrl variable.
				if (objCore.objDebug.boolAll) {
					fb('typeof(json.' + property + '.shareUrl): ' + typeof(json[property].shareUrl));
					fb('json.' + property + '.shareUrl: ' + json[property].shareUrl);
					if (typeof(json[property].shareUrl) !== 'undefined') {
						fb('json.' + property + '.shareUrl.length: ' + json[property].shareUrl.length);
					}
				}
				if ((typeof(json[property].shareUrl) !== 'undefined') && (json[property].shareUrl) && (json[property].shareUrl.length > 0)) {
					// Corrects them if needed.
					json[property].shareUrl = checkForFullUrl(json[property]);
				} else {
					// This has already been through the checkForFullUrl() function.
					json[property].shareUrl = json.all.shareUrl;
				}

				if (objCore.objDebug.boolAll || objCore.objDebug.boolShareUrl) {
					fb('json[property].shareUrl: ' + json[property].shareUrl);
				}

				// Looks for overridden socialTracking code. If not found, then map json.all.socialTracking to the json.*.socialTracking variable.
				if (objCore.objDebug.boolAll) {
					fb('typeof(json.' + property + 'Omniture): ' + typeof(json[property + 'Omniture']));
					fb('json.' + property + 'Omniture: ' + json[property + 'Omniture']);
					if (typeof(json[property + 'Omniture']) !== 'undefined') {
						fb('json.' + property + 'Omniture.length: ' + json[property + 'Omniture'].length);
					}
					fb("[property + 'Omniture']: " + property + 'Omniture');
					if ((typeof(json.all) !== 'undefined') && (json.all.socialTracking) && (json.all.socialTracking.length > 0)) {
						fb('json.all.socialTracking: ' + json.all.socialTracking);
						fb('json.all.socialTracking.length: ' + json.all.socialTracking.length);
					}
				}

				var strNextOmnitureKey = property + 'Omniture';
				if ((typeof(json[strNextOmnitureKey]) === 'undefined') && (typeof(json.all) !== 'undefined') && (json.all.socialTracking) && (json.all.socialTracking.length > 0)) {
					json[strNextOmnitureKey] = json.all.socialTracking;
				}

				if (objCore.objDebug.boolAll) {
					fb('json.' + property + 'Omniture: ' + json[property + 'Omniture']);
				}
			}

			if (objCore.objDebug.boolAll) {
				fb('property: ' + property);
			}
			json[property] = replacePlaceholdersEmail(json[property]);

			// Adds the unique Email Id.
			if (property !== 'all') {
				// Add the Unique Id
				json[property].uniqueId = (typeof(json.all.uniqueId) !== 'undefined') ? json.all.uniqueId : 0;

				// Append the Video Id
				if (json.all.videoId) { // && ((json[property].uniqueId+'').indexOf(json.all.videoId+'') === -1)) {
					json[property].uniqueId += '-' + json.all.videoId;
				}
			}

			switch (property) {
				/* case 'all':
				break; */
				case 'email':
					if (json.email.showEmail) {
						/* LAZYLOAD eonline.lazyLoad.init('regex,oldmodalemail'); */
						
						addHTML_EmailIcon(json.email);
						bindListeners(json.email, property);
						//initJS_EmailIcon(json.email);
					}
				break;
				case 'embedCode':
					if (json.embedCode.showEmbedCode) {
						addHTML_EmbedCodeIcon(json.embedCode);
						bindListeners(json.embedCode, property);
						initJS_EmbedCodeIcon(json.embedCode);
					}
				break;
				case 'facebookLike':
					if (json.facebookLike.showFacebookLike) {
						if ((json.all.isShowPackage) && (json.all.widgetType === 'v2')) {
							updateMetaData(json.all);
						}
						addHTML_FacebookLikeIcon(json.facebookLike);
						bindListeners(json.facebookLike, property);
						initJS_FacebookLikeIcon(json.facebookLike);
						/* Will be used as a template to display the 2nd Facebook Like button. We have to string
						   replace the data, since Facebook is somehow locking us out of initializing the FB Like
						   button a 2nd time, without a page reload. */
						if (((objCore.objData.strFacebookLikeHTML === '') || (!objCore.objData.strFacebookLikeHTML))) { //  && (json.all.widgetType !== 'g1') && (json.all.widgetType !== 'g3')
							setTimeout(function() {
								saveFaceBookLikeCode(json.facebookLike);
							},3000);
						} else {
							updateFacebookLikeCode(json.facebookLike);
						}
					}
				break;
				case 'googlePlus':
					if (json.googlePlus.showGooglePlusone) {
						addHTML_GooglePlusIcon(json.googlePlus);
						initJS_GooglePlusIcon(json.googlePlus);
					}
				break;
				case 'rss':
					if (json.rss.showRss) {
						addHTML_RssIcon(json.rss);
						// initJS_RssIcon(json.rss); 
					}
				break;
				case 'twitterFollow':
					if (json.twitterFollow.showTwitterFollow) {
						addHTML_TwitterFollowIcon(json.twitterFollow);
						//initJS_TwitterFollowIcon(json.twitterFollow);
						initJS_TwitterTweetIcon(json.twitterTweet);
					}
				break;
				case 'twitterSend':
				case 'twitterTweet':
					if (json.twitterTweet.showTwitterTweet) {
						bitlyUrlShortener(json.twitterTweet.shareUrl, function(strShorternUrl){
							json.twitterTweet.shortenedUrl = strShorternUrl;
							addHTML_TwitterTweetIcon(json.twitterTweet);
							initJS_TwitterTweetIcon(json.twitterTweet);
						});
					}
				break;
			}
		}
	}

	function renderHTML(json, strHTML, strDomNodeType) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn renderHTML'); }
		if (objCore.objDebug.boolAll || objCore.objDebug.boolStrHTML) { fb(strHTML); }
		switch(strDomNodeType) {
			case 'root':
				var strKey = json.domAttachId;
			break;
			case 'emailIcon':
				var strKey = json.all.domAttachId;
			break;
			case 'icon':
			default:
				var strKey = getKey(json);
			break;
		}
		strKey = checkForJQuerySign(strKey, '#');
		if (strDomNodeType === 'root') {
			$(strKey).empty();
		}

		if (typeof(json.showTwitterTweet) !== 'undefined') {
			/* The Bitly Ajax call loads slower than the rest of the social media icons. The Bitly-enabled 
			 * Twitter Tweet icon gets appended to the end of the social bar, not between FB & G+1. 
			 * So we have to inject the HTML into the location, where we want it to appear at.
			 */
			var objFbLikeLiTag = $(strKey + ' li.facebook-like');
			$(strHTML).insertAfter(objFbLikeLiTag);
		} else { // All other buttons are appended in order.
			$(strKey).append(strHTML);
		}
	}

	function renderJsNode(json, js, forceRefresh) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn renderJsNode'); }
		if (json.wipeScriptTag) {
			$('#' + js.id).remove();
		}
		var obj = document.getElementById(js.id);
		if ((!obj) || (forceRefresh)) {
			if (document.head) {
				document.head.appendChild(js);
			} else if (document.getElementsByTagName('head')) { // IE 7
				document.getElementsByTagName('head')[0].appendChild(js);
			}
		}
	}

	// Fixes Photo Gallery Templates, so that @id@'s aren't shared out to Facebook, Twitter or Google.
	function replacePlaceholders(strHTML) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn replacePlaceholders'); }
		if (!strHTML) return;

		// This works for the 1st Photo Gallery Url. Now how do we get the next photo's data?
		if ((typeof(eonline) !== 'undefined') && (typeof(eonline.photoGallery) !== 'undefined')) {
			var data = objCore.objData.objDataForTemplate;
			if (!data) {
				var data = objCore.objData.objDataForTemplate = {
					"id": eonline.photoGallery.getData('@id@'),
					"galleryId": eonline.photoGallery.getData('galleryId'),
					"galleryTitleText": eonline.photoGallery.getData('galleryTitleText'),
					"galleryTitleUrl": eonline.photoGallery.getData('galleryTitleUrl'),
					"section": eonline.photoGallery.getData('section')
				};
				data.galleryTitleUrl = data.galleryTitleUrl.replace(/ /g,'-').replace(/,/g,'').replace(/&/g,'').replace(/--/g,'-');
			}

			if (typeof(strHTML) === 'String') {
				strHTML = strHTML.replace(/@id@/gi, data.id);
				strHTML = strHTML.replace(/@galleryId@/gi, data.galleryId);
				strHTML = strHTML.replace(/@galleryTitleText@/gi, data.galleryTitleText);
				strHTML = strHTML.replace(/@galleryTitleUrl@/gi, data.galleryTitleUrl);
				strHTML = strHTML.replace(/@section@/gi, data.section);
			}
		}

		return strHTML;
	}

	function replacePlaceholdersEmail(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn replacePlaceholdersEmail'); }

		if (objCore.objDebug.boolAll || objCore.objDebug.boolShareUrl) {
			fb('Before - json.shareUrl: ' + json.shareUrl);
			fb('Before - json.messageUrl: ' + json.messageUrl);
		}

		if ((typeof(json.shareUrl) !== 'undefined') && (json.shareUrl)) {
			json.shareUrl = replacePlaceholders(json.shareUrl);
		}
		if ((typeof(json.messageUrl) !== 'undefined') && (json.messageUrl)) {
			json.messageUrl = replacePlaceholders(json.messageUrl);
		}
		if ((typeof(json.emailSubject) !== 'undefined') && (json.emailSubject)) {
			json.emailSubject = replacePlaceholders(json.emailSubject);
		}
		if ((typeof(json.emailUniqueId) !== 'undefined') && (json.emailUniqueId)) {
			json.emailUniqueId = replacePlaceholders(json.emailUniqueId);
		}

		if (objCore.objDebug.boolAll || objCore.objDebug.boolShareUrl) {
			fb('After - json.shareUrl: ' + json.shareUrl);
			fb('After - json.messageUrl: ' + json.messageUrl);
			fb('After - json.emailSubject: ' + json.emailSubject);
			fb('After - json.emailUniqueId: ' + json.emailUniqueId);
			fb('After - json.title: ' + json.title);
		}

		return json;
	}

	function resetFlag() { // This and the objCore.objData.boolIsRunning code will stop the duplicate event listeners from running, when the email dialog's close X button is pressed or the dialog's close link is clicked on.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn resetFlag'); }
		setTimeout(function() {
			objCore.objData.boolIsRunning = undefined;
		}, 500);
	}

	// To Do: Add this to the Base Library.
	function resetValues(objModelData) { // Reset all values in an object.
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn resetValues'); }
		for (var key in objModelData) {
			objModelData[key] = false; // Don't use resetFlag() here, as that uses strings & this uses objects.
		}
		return objModelData;
	}

	function saveFaceBookLikeCode(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn saveFaceBookLikeCode'); }
		objCore.objData.strFacebookLikeKey = getFacebookKey(json);
		if (objCore.objDebug.boolAll) {
			fb('objCore.objData.strFacebookLikeKey: ' + objCore.objData.strFacebookLikeKey);
		}
		var strDomId = getDomId(json, objCore.objData.strFacebookLikeKey);
		var strFBLikeHTML = $(strDomId + ' .facebook-like').html();
		if (!strFBLikeHTML) return;
		var i = 0;
		if (objCore.objDebug.boolAll) {
			fb('strDomId: ' + strDomId);
		}
		if (objCore.objData.strFacebookLikeKey === 'FacebookLikeWidgetModalDialog') {
			while((strFBLikeHTML.indexOf(json.all.videoId) > -1) || (strFBLikeHTML.indexOf(json.title) > -1)) {
				strFBLikeHTML = strFBLikeHTML.replace(json.all.videoId, '%GUID%');
				strFBLikeHTML = strFBLikeHTML.replace(json.title, '%TITLE%');
				i++;
				if (i > 5) { break; } // Avoids infinite loops.
			}
		} else {
			while(strFBLikeHTML.indexOf(json.shareUrl) > -1) {
				strFBLikeHTML = strFBLikeHTML.replace(json.shareUrl, '%URL%');
				strFBLikeHTML = strFBLikeHTML.replace('http%3A%2F%2Fwww.facebook.com%2Feonline', '%URL%');
				i++;
				if (i > 5) { break; } // Avoids infinite loops.
			}
		}
		objCore.objData.strFacebookLikeHTML = strFBLikeHTML;
	}
	
	function serializeJSON(form) {
		var json = {}

		form.find(':input').each(
			function() {
				var val
				if (!this.name)
					return;

				if ('radio' === this.type) {
					if (json[this.name]) {
						return;
					}

					json[this.name] = this.checked ? this.value : '';
				} else if ('checkbox' === this.type) {
					val = json[this.name];

					if (!this.checked) {
						if (!val) {
							json[this.name] = '';
						}
					} else {
						json[this.name] = typeof val === 'string' ? [ val,
								this.value ] : $.isArray(val) ? $.merge(
								val, [ this.value ]) : this.value;
					}
				} else {
					json[this.name] = this.value;
				}
			})
		return json;
	}
	
	function setData(strKey, data) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn setData'); }
		objCore.objData[strKey] = data; // The data could be an array, a string, an integer, a floating point number, an object or a JSON Object.
	}

	function stripJQuerySign(strKey) {
		strKey = $.trim(strKey);
		if ((strKey[0] === '#') || (strKey[0] === '.')) {
			strKey = strKey.substring(1);
			/*
			strKey = strKey.replace(/##/g, chrSign);
			strKey = strKey.replace(/#./g, chrSign);
			strKey = strKey.replace(/.#/g, chrSign);
			strKey = strKey.replace(/../g, chrSign);
			*/
		}
		return strKey;
	}

	function updateComments(json){ // See: section.photos.gallery.jsp
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn updateComments'); }
		$.get('/photos/includes/jsp/control.comments.jsp',{
			galleryId:json.galleryId,
			imageId:json.id,
			useThyme:'true',
			gallery:'true'
		},function(res){
			$('#Div2').empty();
			$('#Div2').html(res);
		});
	}

	function updateFacebookLikeCode(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn updateFacebookLikeCode'); }
		var strKey = getFacebookKey(json);
		if (objCore.objDebug.boolAll) {
			fb('strKey: ' + strKey);
			//fb('objCore.objData.strFacebookLikeKey: ' + objCore.objData.strFacebookLikeKey);
		}
		var strDomId = getDomId(json, strKey) + ' .facebook-like';
		var strNewFBLikeBttn = objCore.objData.strFacebookLikeHTML;
		if (objCore.objData.strFacebookLikeKey === 'FacebookLikeWidgetModalDialog') {
			strNewFBLikeBttn = strNewFBLikeBttn.replace(/%GUID%/gi,json.all.videoId);
			strNewFBLikeBttn = strNewFBLikeBttn.replace(/%TITLE%/gi,json.title);
		}
		strNewFBLikeBttn = strNewFBLikeBttn.replace(/%URL%/gi,json.shareUrl);
		$(strDomId).html(strNewFBLikeBttn);
	}

	// Originally copied from the Responsive Gallery. This needs to be added to the Base Library.
	function updateMetaData(json) {
		$('meta[property="og:title"]').attr('content', json.title);
		$('meta[property="og:url"]').attr('content', json.shareUrl);
		$('meta[property="og:image"]').attr('content', json.thumbnails.imgSrc.small);
		$('meta[property~="og:description"]').attr('content', json.description);
		$('meta[property~="og:image:height"]').attr('content', json.thumbnails.height);
		$('meta[property~="og:image:width"]').attr('content', json.thumbnails.width);
	}

	/*** JS Implementation ***/
	// See either the Video Detail Page, the Responsive Photo Gallery, the C11 Widget or the Show Package Pages' Video Players.
	function updateSocialBar(json) { // domAttachId, photoId or videoId, title, showNameOrWidgetId, twitterAccountName, showFacebookLike, showTwitterTweet, etc...
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn updateSocialBar'); }

		if (json.uniqueId) {
			var strUniqueId = json.uniqueId;
		} else if ((json.showEmail) && (typeof(json.photoId) !== 'undefined')) {
			var strEmailTextCategory = 'Photo';
			var strUniqueId = json.photoId;
		} else if ((json.showEmail) && (typeof(json.videoId) !== 'undefined')) {
			var strEmailTextCategory = 'Video';
			var strUniqueId = json.videoId;
		}
		/*if (typeof(json.all.uniqueId) !== 'undefined') {
			var uniqueId = json.all.uniqueId;
		}*/

		if (typeof(json.videoId) !== 'undefined') {
			if ((json.videoId.indexOf("'") === -1) && (json.videoId.indexOf('"') === -1)) {
				json.videoId = '"' + json.videoId + '"'; // CA uses alphaNumeric strings, not numeric ids. So quotes are required here.
			}
		}

		// Dynamically creates the icon bar's jsonSocialMediaIcons object, based on the input options in the json object.
		var jsonSocialMediaIcons = {
			"all": { // This is for all of the icons. It will be used as the default JSON Config block, for whenever specific icon's JSON code isn't included below.
				"description": json.description || null,
				"domAttachId": json.domAttachId,
				"extraClasses": "social-links",
				"photoId": json.photoId || null,
				"shareUrl": json.shareUrl,
				"title": json.title,
				"useHorizontal": true,
				"uniqueId": strUniqueId || null,
				"videoId": json.videoId || null
			}
		};

		if (typeof(json.thumbImgSrc) !== 'undefined') {
			jsonSocialMediaIcons.all.thumbnails = {
				"height": json.thumbHeight || 72,
				"imgSrc": {
					"large": json.thumbImgSrcLarge || null,
					"small": json.thumbImgSrcSmall || json.thumbImgSrc || null
				},
				"width": json.thumbWidth || 128
			};
		}

		if (json.showFacebookLike) {
			jsonSocialMediaIcons.facebookLike = {
				"forceRefresh": true,
				"language": "en_US",
				"omniture1": "trackShares|{'linkName:" + json.omnitureKey + ":facebook_like_button'}",
				"omniture2": "trackShares|{'linkName:" + json.omnitureKey + ":facebook_send_button'}",
				"showFacebookLike": true,
				"showFacebookSend": ((json.showFacebookSend) ? true : false),
				"title": json.title,
				"wipeScriptTag": true // Allows FacebookLike tags to be re-initialized, so that FB Like tags can be dynamically updated.
			};
		}

		if (json.showTwitterFollow) {
			jsonSocialMediaIcons.twitterFollow = {
				"omniture": "trackShares|{'linkName:" + json.omnitureKey + ":twitter_follow_button'}",
				//"shareUrl": null, // To Do... Map these variables into the same names, which are in the social.media.icons.tag file's config section like: twitterFollowUrl
				//"showCount": null,
				"showTwitterFollow": true /*,
				"text": ""*/
			};
		}

		if (json.showTwitterTweet) {
			jsonSocialMediaIcons.twitterTweet = {
				"accountName": json.twitterTweetAccountName,
				//"class": null,
				//"messageUrl": null,
				"omniture": "trackShares|{'linkName:" + json.omnitureKey + ":twitter_tweet_button'}",
				"related": json.twitterTweetRelated,
				//"shareUrl": null,
				"showTwitterTweet": true,
				"twitterTweetText": json.twitterTweetText,
				"title": json.title
			};
		};

		if (json.showGooglePlusone) {
			jsonSocialMediaIcons.googlePlus = {
				"forceRefresh": true,
				"omniture": "trackShares|{'linkName:" + json.omnitureKey + ":google_plusone_button'}",
				"showGooglePlusone": true,
				"wipeScriptTag": true // Allows Google +1 tags to be re-initialized, so that Google +1 tags can be dynamically updated.
			};
		}

		if (json.showEmail) {
			var strDefaultEmailMsg = 'EOnline ' + strEmailTextCategory + ' Suggestion For You';
			jsonSocialMediaIcons.email = {
				"showEmail": true,
				"emailSubj": (typeof(json.emailSubject) !== 'undefined') ? strEmailTextCategory.toUpperCase().replace('OS','O') + ": " + json.emailSubject + ' - Via E! Online' : strDefaultEmailMsg,
				//"newsURL": null,
				"omniture1": "trackShares|{'linkName:" + json.omnitureKey + ":email_link'}",
				"omniture2": "trackShares|{'linkName:" + json.omnitureKey + ":email_send_bttn'}",
				"omniture3": "trackShares|{'linkName:" + json.omnitureKey + ":email_close_bttn'}",
				"photoId": json.photoId,
				//"photoURL": null,
				"title": json.title,
				"useEnvelope": (typeof(json.useEnvelope) !== 'undefined') ? json.useEnvelope : false
				//"videoURL": null
			};
		}

		if (json.showEmbedCode) {
			jsonSocialMediaIcons.embedCode = {
				"bigThumb": json.bigThumb,
				"omniture": "trackShares|{'linkName:" + json.omnitureKey + ":embed_code_button'}",
				"videoId": json.videoId,
				"showEmbedCode": true,
				"title": json.title
			};
		}

		if (json.showRss) {
			jsonSocialMediaIcons.rss = {
				"omniture": "trackShares|{'linkName:" + json.omnitureKey + ":rss_button'}",
				"shareUrl": "/everywhere/rss/index.jsp",
				"showRss": true,
				"title": json.title
			};
		}

		// Draw the Ajax Loaded Social Media Icons. This is the "JS Implementation" entry point.
		eonline.socialMediaIcons.init(jsonSocialMediaIcons);
	}

	function validateEmailForm(json) {
		if (objCore.objDebug.boolAll || objCore.objDebug.boolFnTrace) { fb('fn validateEmailForm'); }

		var strError = null;
		var strKeyFocus = null;
		var strKeyFriendEmail = '#friendEmail-' + json.uniqueId;
		var strKeyYourEmail = '#yourEmail-' + json.uniqueId;
		var strFriendEmail = $.trim($(strKeyFriendEmail).val());
		var strYourEmail = $.trim($(strKeyYourEmail).val());
		if (strFriendEmail.length === 0) {
			strError = 'Please enter a recipient.';
			strKeyFocus = strKeyFriendEmail;
		} else if (strYourEmail.length === 0) {
			strError = 'Your email address is blank!';
			strKeyFocus = strKeyYourEmail;
		} else if (!strFriendEmail.match(eonline.regEx.emailAddresses)) {
			strError = strFriendEmail + ' is not a valid email address.';
			strKeyFocus = strKeyFriendEmail;
		} else if (!strYourEmail.match(eonline.regEx.emailAddresses)) {
			strError = strYourEmail + ' is not a valid email address.';
			strKeyFocus = strKeyYourEmail;
		}
		if (strError) {
			alert(strError);
			$(strKeyFocus).focus();
		} else {
			emailSubmitFormLoader(json);
			var strFormData = JSON.stringify(serializeJSON($('form#overlay_send_form-' + json.uniqueId)));
			$.ajax({
				"type": "post",
				"dataType": "json",
				"contentType": "application/json",
				"cache": "false",
				"url": "/mvc/hudson/mail/send",
				"data": strFormData
			}).done(function(data) {
				$('#overlay_container-' + json.uniqueId).hide();
				$('#email-send-form-' + json.uniqueId + '>.response_container').show();
			});
		}
		return false;
	}

	return {
		// Exposes Public Function Names
		"bindListenersEmail": bindListenersEmail,
		"bitlyUrlShortener": bitlyUrlShortener,
		"checkForFullUrl": checkForFullUrl,
		"closeEmailForms": closeEmailForms,
		"fakeSocialBar": fakeSocialBar,
		"getData": getData,
		"getIntlEdition": getIntlEdition,
		"init": init,
		"initTwitterBttns": initTwitterBttns,
		"loadIcons": loadIcons,
		"replacePlaceholders": replacePlaceholders,
		"setData": setData,
		"updateComments": updateComments,
		"updateSocialBar": updateSocialBar,
		"validateEmailForm": validateEmailForm
	};
})(jQuery);
