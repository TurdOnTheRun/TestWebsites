tcmAds.createHeaderTout = function(adVars) {
	if (typeof adVars.name == "undefined") {
		throw "You must supply a name for this tout";
	}

	var ad = {
		toutName : adVars.name,

		frequency : 1, // Days between expand on mouseover
		dev : false, // Set to true to disable frequency constraint on tout expansion

		channels : {
			dflt : 'https://subscription.people.com/storefront/subscribe-to-people/link/1026787.html'
		},
		clickThroughUrl : '',
		
		resource_path: '',
		setResourceURL : function(_toutName) {
			var href = window.location.href;
			var _URL = '//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/' + _toutName + '/resources/';
			if(/tcmtools\.ecommerce\.timeinc\.com|file:\/\/\//.test(href)){
				_URL = _URL.replace('//subscription-assets.timeinc.com/prod/assets/themes/magazines/', '//tcmtools.ecommerce.timeinc.com/');
			}
			if(/qa\/assets\//.test(href)){
				_URL = _URL.replace("prod/assets/","qa/assets/");
			}
			this.resource_path = _URL;
		},

		channel: adVars.TCMchannel,
		formatForDoubleClick: function (url) {
			var tcm_dfpGet = adVars.clickTracking.dartGet,
				extra_qs = "",
				qs_param, qs_val;

			if (tcm_dfpGet != "%c") {
				url = tcm_dfpGet + url.replace("://","%3a%2f%2f");
			}

			for (qs_param in adVars.subs3Tracking) {
				qs_val = adVars.subs3Tracking[qs_param];

				if (/^%%PATTERN/.test(qs_val) || /^%s$/.test(qs_val)) {
					qs_val = "0000";
				}
				if (qs_val == "") {
					qs_val = "null";
				}

				extra_qs += "&" + qs_param + "=" + escape(qs_val);
			}

			// the first "&" should be a "?"
			if(!/\?/.test(url)){
				extra_qs = extra_qs.replace("&", "?");
			}

			return url + extra_qs;
		},

		renderCreative : function() {
			var toutHTML = 
				'<div style="position: relative; width: 290px; height: 100px;">' + '\n' +
					'<a id="tcm-' + this.toutName + '" href="' + this.clickThroughUrl + '" target="_blank" onmouseover="tcmAds[\'' + this.toutName + '\'].expandTout();" style="display: block;">' + '\n' +
						'<img src="' + this.resource_path + 'images/header.png" style="border: 0;" />' + '\n' +
						'<img src="https://subscription-assets.timeinc.com/prod/assets/themes/magazines/default/template-resources/images/PE/covers/peoplecover_127x169.jpg" style="width: 75px; height: 100px; position: absolute; top: 0; left: 0;" />' + '\n' +
					'</a>' + '\n' +
				'</div>';

			var tout = window.parent.document.createElement('div');
			tout.innerHTML = toutHTML;

			// Ad served in iframe
			if(window.frameElement){
				var iframe = parent.document.getElementById(window.frameElement.id);
				var parentElement = iframe.parentNode;
				parentElement.appendChild(tout);
				iframe.style.display = 'none';
			}else{
				var scriptId = document.getElementById('tcm-' + this.toutName + '-js');
				var parentElement = scriptId.parentNode;
				parentElement.appendChild(tout);
			}

			var adContainer = window.parent.document.getElementById('ad-page-header-promotion');
			adContainer.style.position = 'absolute';
			adContainer.style.top = '20px';
			adContainer.style.height = '100px';
			adContainer.style.width = '290px';

			var expandedToutHTML = 
				'<div id="tcm-' + this.toutName + '-expanded" style="display: none; position: absolute; top: 0; left: 0; background-color: #fff; width: 288px; height: 173px; border: 1px solid #E6E6E6; overflow: hidden; z-index: 1000000;">' + '\n' +
				'<a href="' + this.clickThroughUrl + '" target="_blank" style="position: relative; display: block;">' + '\n' +
					'<img src="https://subscription-assets.timeinc.com/prod/assets/themes/magazines/default/template-resources/images/PE/covers/peoplecover_127x169.jpg" style="width:103px; height:136px; margin:19px auto auto 11px; float:left; border:0;" />' + '\n' +
					'<div style="float:left; width:170px; margin-top:10px;">' + '\n' +
						'<ul style="font-family: \'Open Sans\', sans-serif; font-size:14px; font-style:italic; margin: 1em 0 1em -5px; padding-left: 40px">' + '\n' +
							'<li style="text-decoration: none; color: #000000; list-style-type: disc;">Real life heroes</li>' + '\n' +
							'<li style="text-decoration: none; color: #000000; list-style-type: disc;">Bonus celeb photos</li>' + '\n' +
							'<li style="text-decoration: none; color: #000000; list-style-type: disc;">Exclusive interviews</li>' + '\n' +
							'<li style="text-decoration: none; color: #000000; list-style-type: disc;">Must-see videos</li>' + '\n' +
						'</ul>' + '\n' +
						'<span style="background-color:#eb0478; color:#ffffff; text-align:center; border-radius:6px; width:105px; height:28px; line-height:28px; text-decoration:none; font-family:\'Open Sans\', Arial, sans-serif; font-size:14px; font-weight:bold; margin:auto; display:block;">CLICK HERE</span>' + '\n' +
					'</div>' + '\n' +
				'</a>' + '\n' +
					'<div style="width: 15px; height: 15px; position: absolute; top: 3px; right: 3px; cursor: pointer;" onclick="document.getElementById(\'tcm-' + this.toutName + '-expanded\').style.display=\'none\';">' + '\n' +
						'<img src="' + this.resource_path + 'images/close.png" style="width: 15px; height: 15px;" />' + '\n' +
					'</div>' + '\n' +
				'</div>';

				var expandedTout = window.parent.document.createElement('div');
				expandedTout.innerHTML = expandedToutHTML;
				parent.document.body.appendChild(expandedTout);
		},

		positionExpandedTout : function(forceTrue){
			var expandedElement = parent.document.getElementById('tcm-' + this.toutName + '-expanded');
			if(expandedElement.style.display == 'block' || forceTrue){
				var adBounds = parent.document.getElementById('tcm-' + this.toutName).getBoundingClientRect();

				var scrollX = 0;
				var scrollY = 0;

				if(window.pageXOffset !== undefined){
					scrollX = window.pageXOffset;
				}else{
					scrollX = (document.documentElement || document.body.parentNode || document.body).scrollLeft;
				}

				if(window.pageYOffset !== undefined){
					scrollY = window.pageYOffset;
				}else{
					scrollY = (document.documentElement || document.body.parentNode || document.body).scrollTop;
				}

				expandedElement.style.top = (adBounds.top + scrollY - 10) + 'px'; // Subtract 10 to account for extra top 10px on ad container
				expandedElement.style.left = (adBounds.left + scrollX) + 'px';
			}
		},

		// Expansion functions
		checkDevice : function (){
			var stopExpansion = false;
			var uagent = navigator.userAgent.toLowerCase();

			if(((navigator.userAgent.match('iPad')) || (navigator.userAgent.match('iPod')) || (navigator.userAgent.match('iPhone')) ||(uagent.search('android') > -1))){ 
				stopExpansion = true;
			}
			return stopExpansion;
		},

		getCookie : function(c_name){
			var i,x,ARRcookies = document.cookie.split(";");
			var subscriberCookieSet = false;
			for (i = 0; i < ARRcookies.length; i++){
				x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
				x = x.replace(/^\s+|\s+$/g, "");
				if(x == c_name){
					subscriberCookieSet = true;
					break;
				}else{
					subscriberCookieSet = false;
				}
			}
			return subscriberCookieSet;
		},

		setCapCookieGlobalTout : function(){
			var domainArray = window.location.hostname.split('.'),
				tcmTopLevelDomain = domainArray.slice(-2).join('.'),
				days = 1000 * 60 * 60 * 24 * this.frequency,
				now = new Date().getTime(),
				daysFromNow = new Date(now+days);
			document.cookie = this.toutName + "=" + now+ ";path=/;domain=." + tcmTopLevelDomain + ";expires=" + daysFromNow.toUTCString();	
		},

		tcmGlobalCount : 0,

		expandTout : function(){
			var expandedElement = parent.document.getElementById('tcm-' + this.toutName + '-expanded');
			if(((navigator.cookieEnabled && !this.getCookie(this.toutName) && !this.checkDevice()) || this.dev == true) && this.tcmGlobalCount == 0){
				this.tcmGlobalCount++;
				this.setCapCookieGlobalTout();
				if(expandedElement.style.display == 'none'){
					this.positionExpandedTout(true);

					expandedElement.style.display = 'block';
					var toutTimeout = 5000;
					setTimeout(function(){
						expandedElement.style.display = 'none';
					}, toutTimeout);
				}
			}
		},

		setPositionOnResize : function(){
			var that = this;
			if(parent.window.addEventListener){
				parent.window.addEventListener('resize', function(){that.positionExpandedTout(false);}, false);
			}else{
				parent.window.attachEvent('onresize', function(){that.positionExpandedTout(false);});
			}
		},
			
		setObject : function() {
			tcmAds[this.toutName] = this;
			if(window.frameElement){
				if(typeof window.parent.tcmAds !== 'undefined'){
					window.parent.tcmAds[this.toutName] = tcmAds[this.toutName];
				}else{
					window.parent.tcmAds = tcmAds;
				}
			}
		},

		build : function(){
			this.setResourceURL(this.toutName);
			this.clickThroughUrl = this.formatForDoubleClick(this.channels[this.channel]);
			this.renderCreative();
			this.setPositionOnResize();
			this.setObject();
		}
	};

	ad.build();
};

tcmAds.createHeaderTout(tcmAds['pe-4freehdrexp290x100.config']);