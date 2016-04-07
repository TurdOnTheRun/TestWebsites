if(SbSocialWidget == undefined) {
	
	var SbSocialWidget = {
		xPos: 0,
		yPos: 0,
		unitDiv: null,
		overlayTop: 0,
		compareValue: 0,
		originalCompareValue: 0,
		originalDivDistance: 0,
		contentPlayed: false,
		options : {
			cmsPath : '//dev.publishers.springboardplatform.com'
		},
		init : function(optionsR) {
			
			//Merge options, we NEED TO CLONE!!!!
			var options = SbSocialWidget.clone(SbSocialWidget.options);
			//Merge - extend default options
			options = SbSocialWidget.extend(options, optionsR);
			
			SbSocialWidget.options = options;
			
			//Load overlay if it is not loaded
			var scripts = document.getElementsByTagName("script");
			var loadOverlay = true;
			for (var i=0; i<scripts.length; i++) {
				if (scripts[i].src && scripts[i].src.indexOf('js/overlay') != -1) {
					loadOverlay = false;
					break;
				}
			}
			if(loadOverlay) {
				var env = '';
				//match environment
				var envTestRegex = /\/\/([a-z0-9]+)\.cms/i;
				if ( envTestRegex.test(optionsR.cmsPath) ) {
					var patt = new RegExp(/\/\/([a-z0-9]+)\.cms/i);
					var res = patt.exec(optionsR.cmsPath);
					
					env = res[1] + '.';
				}
				
				var oHead = document.getElementsByTagName('head')[0];
				var oScript = document.createElement('script');
				oScript.type = 'text/javascript';
				oScript.src = '//'+env+'cdn.springboardplatform.com/js/overlay';
				oHead.appendChild(oScript);
			}
			
			this.makeCall();
		},
		clone : function(obj) {
			if (!obj || typeof obj != 'object') { return obj; }
			var temp = new obj.constructor();	
			for (var key in obj) {	
				if (obj.hasOwnProperty(key)) {
					temp[key] = SbSocialWidget.clone(obj[key]);
				}
			}
			return temp;
		},
		extend : function(destination, source) {
		
			for(var prop in source) {
				if(typeof destination[prop] == 'object') {
					destination[prop] = SbSocialWidget.extend(destination[prop], source[prop])
				} else {
					destination[prop] = source[prop]; 
				}
			}
			return destination;
		},
		makeCall : function() {
			//http://dev.publishers.springboardplatform.com/cpv/social_widget/261/test165
			var request = this.options.cmsPath+'/cpv/social_widget/'+this.options.partnerId+'/'+this.options.widgetId;
			
			var head = document.getElementsByTagName("head").item(0);
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", request);
			script.async = true;
			head.appendChild(script);
		},
		posY: function( targetDiv ) {
			var child = targetDiv;
			var top = 0;
			//traceit("posY: " + child.offsetTop);
			while(!!child && child.tagName.toLowerCase() !== "body")
			{
				
				top += child.offsetTop;
				child = child.offsetParent;
			}

			return top;
		},
		posX: function() {
			var child = document.getElementById('social_widget');
			var left = 0;
			while(!!child && child.tagName.toLowerCase() !== "body")
			{
				left += child.offsetLeft;
				child = child.offsetParent;
			}

			return left;
		},
		bindEvent: function(element, eventName, callback) {
			  
			if (typeof document.addEventListener != 'undefined') {
				element.addEventListener(eventName, callback, false);
			}  else if (typeof window.attachEvent != 'undefined') {
				element.attachEvent(eventName, callback);
			}
		},
		unbindEvent: function(element, eventName, callback) {
			  
			if (typeof document.addEventListener != 'undefined') {
				element.removeEventListener(eventName, callback, false);
			} else if (typeof window.attachEvent != 'undefined') {
				element.detachEvent(eventName, callback);
			}
		},
		getFixed: function() {
			var heightValue = 0;

			if(/IE/i.test(navigator.userAgent)) return 0;

			var divs = Array.prototype.slice.call(document.getElementsByTagName("div"));
			var headers = Array.prototype.slice.call(document.getElementsByTagName("header"));

			if(headers) 
			{
				for (var i = 0; i < headers.length; i++) {
					var headerDivs = headers[i].getElementsByTagName("div");
					if(headerDivs)
					{
						for (var j = 0; j < headerDivs.length; j++) {
							for (var k = 0; k < divs.length; k++) {
								if(divs[k].isEqualNode(headerDivs[j]))
								{
									divs.splice(k,1);
									break;
								}
							};
						};
					}
				};
			}

			for (var i = 0; i < headers.length; i++) {
				if(this.checkHeader(headers[i]))
				{
					heightValue += headers[i].offsetHeight;
				}
			};

			for (var j = 0; j < divs.length; j++) {
				if(this.checkDiv(divs[j])) {
					heightValue += divs[j].offsetHeight;
				}
			};

			return heightValue;
		},
		checkHeader: function(header) {
			return header.offsetTop == 0 && header.offsetHeight != 0 && this.getStyle(header, 'display') != 'none' && this.checkWidth(header)
				&& this.getStyle(header, 'position') == 'fixed' && this.getStyle(header, 'visibility') != 'hidden' && this.getStyle(header, 'opacity') > 0;// && window.scrollY === 0;
		},
		checkDiv: function(div) {
			return Number(this.getStyle(div, 'z-index')) > 0 && div.offsetTop == 0 && div.offsetHeight != 0 &&  this.getStyle(div, 'display') != 'none' &&
			this.getStyle(div, 'position') == 'fixed' && this.checkWidth(div) && this.getStyle(div, 'visibility') != 'hidden' && this.getStyle(div, 'opacity') > 0 ;// && window.scrollY === 0;
		},
		getStyle: function(elem, prop) {
			var y;
			if(elem.currentStyle)
				y = elem.currentStyle[prop];
			else if(window.getComputedStyle)
				y = document.defaultView.getComputedStyle(elem, prop).getPropertyValue(prop);
			return y;
		},
		checkWidth: function(elem) {
			//return document.body.offsetWidth == elem.offsetWidth;// ? true : false;
			//REMOVED BECAUSE OF CRAVE, BECAUSE CRAVE's HEADER IS SHORTER THEN PAGE
			return true;
		},
		initListeners: function() {

			this.bindEvent(window, "scroll", SbSocialWidget.onWindowScroll);
		},
		onWindowScroll: function() {
			//console.log("SCROLL");
			var divPosition = SbSocialWidget.unitDiv.style.position;	//SYNDI UNIT POSITION
			var sty = SbSocialWidget.scrollYValue();					//SCROLL VALUE
			var headerOffset = SbSocialWidget.getFixed();				//DIVS WITH POSITION FIXED HEIGHT
			var compareValue = SbSocialWidget.yPos - headerOffset;		//COMPARE VALUE
			var topValue = 0 + headerOffset;							//TOP VALUE
			
			if( SbSocialWidget.originalCompareValue == 0 ) {
				SbSocialWidget.originalCompareValue = compareValue;
			}
			
			var overlayDiv = document.getElementById("sbOverlay_syndicatedtv_" + SbSocialWidget.options.widgetId);
			if( overlayDiv ) {
				//console.log("OVERLAY DIV TRUE");
				if( SbSocialWidget.originalDivDistance == 0 ) {
					SbSocialWidget.originalDivDistance = SbSocialWidget.posY( SbSocialWidget.unitDiv ) - SbSocialWidget.posY( overlayDiv );
					//console.log("originalDivDistance", SbSocialWidget.originalDivDistance);
				}
				//CHANGE COMPARE AND TOP VALUE
				compareValue = SbSocialWidget.posY( overlayDiv ) - headerOffset;	//MOVE COMAPARE VALUE BECAUSE OF OVERLAY DIV
				if( divPosition === "fixed" ) {										//SYNDY DIV IZ FIXED RE-COUNT POSITIONS
					compareValue = 	SbSocialWidget.originalCompareValue - SbSocialWidget.originalDivDistance;			
				}
				topValue = SbSocialWidget.originalDivDistance + headerOffset;
			}

			//console.log("sty", sty);
			//console.log("compareValue", compareValue);
			//console.log("topValue", topValue);
			if( sty >=  compareValue) {
				
				if( divPosition === "relative") {
					//console.log("RELATIVE");
					SbSocialWidget.unitDiv.style.position = "fixed";
					SbSocialWidget.unitDiv.style.top = topValue + "px";
					SbSocialWidget.unitDiv.style.left = SbSocialWidget.xPos  + "px";
					SbSocialWidget.unitDiv.style.zIndex = 999999;
					
					if( SbSocialWidget.contentPlayed ) {
						document.getElementById('sb-close-btn').style.opacity = 1;
						document.getElementById('sb-close-btn').style.right = "0px";
					}
				}
				if(divPosition === "fixed") {
					SbSocialWidget.unitDiv.style.top = topValue + "px";
				}
				
				if( overlayDiv ) {
					overlayDiv.style.position = "fixed";
					overlayDiv.style.top =  headerOffset + "px";
				}
			} else {
				if( divPosition === "fixed") {
					//console.log("FIXED");
					SbSocialWidget.unitDiv.style.position = "relative";
					SbSocialWidget.unitDiv.style.top = "";
					SbSocialWidget.unitDiv.style.left = "";
					SbSocialWidget.unitDiv.style.zIndex = "";
					if( overlayDiv ) {
						overlayDiv.style.position = "absolute";
						overlayDiv.style.top = SbSocialWidget.posY( SbSocialWidget.unitDiv ) - SbSocialWidget.originalDivDistance  + "px";
					}
					//console.log("UBIJAJ EVENT");
					SbSocialWidget.unbindEvent(window, "scroll", SbSocialWidget.onWindowScroll);
					
					document.getElementById('sb-close-btn').style.opacity = 0;
					document.getElementById('sb-close-btn').style.right = "-18px";
				}
			}
		},
		scrollYValue: function() {
			if(window.pageYOffset) {
				return window.pageYOffset;
			}
			return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		},
		closeUnit: function() {
			/*document.getElementById('social_widget').innerHTML = '';
			document.getElementById('social_widget').style.width = '0px';
			document.getElementById('social_widget').style.height = '0px';*/
			var overlayDiv = document.getElementById("sbOverlay_syndicatedtv_" + SbSocialWidget.options.widgetId);
			
			document.getElementById('sb-close-btn').style.opacity = 0;
			document.getElementById('sb-close-btn').style.right = "-18px";
			
			SbSocialWidget.unitDiv.style.position = "relative";
			SbSocialWidget.unitDiv.style.top = "";
			SbSocialWidget.unitDiv.style.left = "";
			SbSocialWidget.unitDiv.style.zIndex = "";
			if( overlayDiv ) {
				overlayDiv.style.position = "absolute";
				overlayDiv.style.top = SbSocialWidget.posY( SbSocialWidget.unitDiv ) - SbSocialWidget.originalDivDistance  + "px";
			}
			//console.log("UBIJAJ EVENT");
			SbSocialWidget.unbindEvent(window, "scroll", SbSocialWidget.onWindowScroll);
		}
	};
}

function fillSocialWidget() {
	
	document.getElementById('social_widget').innerHTML = SbSocialWidget.options.embed;
}

function fillContentDir(JSONFeed) {
	//console.dir(JSONFeed);
	
	if( JSONFeed.catchAndRelease ) {
		SbSocialWidget.initListeners();
		document.getElementById('social_widget').innerHTML = '' +
		'<style type="text/css">' +
			'#sb-close-btn {' +
				'opacity: 0;' +
				'padding: 0;' +
				'position: absolute;' +
				//'right: 18px;' +
				'right: -18px;' +
				'top: 0px;' +
				'z-index: 4;' +
				'background-color: transparent;' +
				'border: 0 none;' +
				'border-radius: 2px;' +
				'cursor: pointer;' +
			'}' +
			'.x_18_border {' +
				'background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABvElEQVR42o2UMWvCUBDHS0e/QkHapUO/hJMfoCIiwTqIiDg4dLHiEIpIcXKUTEKli5VspeVNwWZwq6NTFxERKRLEQahc319yjxdMsAd/uMS7n/fu3eWMiKIUk0pKlaQMqXhULBT2MiElKNw+pR7/A7I4Y7fb0WQyISEEjUYjWq1WOvBd6jIKZCNiv9/TcDikbDZLqVQqINM0ablcMuxH6lqB9ErW6zXVajUkRcowDHJdl2FfOuiKK6nX6yqhUqkEAMViUVWZyWRoOp0y7IlBD3hyHEcldTqdA7jb7SrIYrFAzxSs0WgwyGXQG55arZYC2bZNbP1+/wCBzedzKhQKHKdfQBwgD14ul8OPYbBQCITb9M0A6BdeOp0+6slms9ErO2o8RsO3EkDf8Mrlsg7h4+gw7pkSeuZbEqBneJZlqYDxeBw4DuaKrVqtIgZNx9Dy6xhABrzZbKaOl8/nMSuBngwGg0BFvV6PIUIfSEcK/4ygk0JV2+2WQbc6KKHwQmB6IyHtdps8z+Pwl7BdS/ANYp9wDL4AgJvNJq8G26vUedT23/ibHWW8rPenPiOsO9wmjwamQOpDCntxEZbzB2eQ0yFlKou1AAAAAElFTkSuQmCC");' +
				'height: 18px;' +
	    		'width: 18px;' +
	    		'transition: opacity 0.5s ease-in;' +
	    		'-webkit-transition: opacity 0.5s ease-in;' +
					'-moz-transition: opacity 0.5s ease-in;' +
			'}' +
		'</style>' + 
		'<button class="x_18_border" id="sb-close-btn" onclick="SbSocialWidget.closeUnit()"></button>';
	}
	
	if(JSONFeed.collapse) {
		document.getElementById('social_widget').style.width = '0px';
		document.getElementById('social_widget').style.height = '0px';
	} else if(JSONFeed.snapshot) {
		//document.getElementById('social_widget').innerHTML = '<img src="'+JSONFeed.snapshot+'" style="cursor: pointer;" onclick="fillSocialWidget()" width="'+SbSocialWidget.options.width+'" height="'+SbSocialWidget.options.height+'" />';
		document.getElementById('social_widget').insertAdjacentHTML('beforeend', '<img src="'+JSONFeed.snapshot+'" style="cursor: pointer;" onclick="fillSocialWidget()" width="'+SbSocialWidget.options.width+'" height="'+SbSocialWidget.options.height+'" />');
		SbSocialWidget.options.embed = JSONFeed.embed;
	} else {
		//document.getElementById('social_widget').innerHTML = JSONFeed.embed;
		document.getElementById('social_widget').insertAdjacentHTML('beforeend', JSONFeed.embed);
	}
	
	SbSocialWidget.unitDiv = document.getElementById('social_widget');
	SbSocialWidget.xPos = SbSocialWidget.posX();
	SbSocialWidget.yPos = SbSocialWidget.posY( SbSocialWidget.unitDiv );
	
	

}

function handleAd(site_id, width, height, widget_id, env) {
	
	//check if widget is in iframe
	if (top === self) {
		//alert('Out of iframe');
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		//s.value = 'alert(1)';
		s.src = '//'+env+'cdn.springboardplatform.com/js/overlay';
		document.getElementById('social_widget').appendChild(s);
		
		s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.src = '//'+env+'cdn.springboardplatform.com/storage/js/swfobject/swfobject.js';
		document.getElementById('social_widget').appendChild(s);
		
		
		SbSocialWidget.init({
			partnerId : site_id,
			width : width,
			height : height,
			widgetId : widget_id,
			cmsPath : '//'+env+'cms.springboardplatform.com'
		});
	} else {
		var friendly_iframe = false;
		//alert('In iframe');
		//alert(typeof inDapIF);
		if(typeof inDapIF != 'undefined') {
			friendly_iframe = true;
		} else {
			//alert(typeof top.location.host);
			if(top.location.host == self.location.host) {
				friendly_iframe = true;
			}
			
		}
		if(friendly_iframe) {
			var f = window.frameElement; //get iframe element
			var g=f.parentNode;  //get iframe parent node
			
			var s = document.createElement('script');
			s.setAttribute('type', 'text/javascript');
			//s.value = 'alert(1)';
			s.src = '//'+env+'cdn.springboardplatform.com/storage/js/social_widget/sw.js';
			g.appendChild(s);
			
			var s = document.createElement('script');
			s.setAttribute('type', 'text/javascript');
			//s.value = 'alert(1)';
			s.src = '//'+env+'cdn.springboardplatform.com/js/overlay';
			g.appendChild(s);
			
			s = document.createElement('script');
			s.setAttribute('type', 'text/javascript');
			s.src = '//'+env+'cdn.springboardplatform.com/storage/js/swfobject/swfobject.js';
			g.appendChild(s);
			
			s = document.createElement('div');
			s.id = 'social_widget';
			s.style.width = width+'px';
			s.style.height = height+'px';
			s.style.position = 'relative';
			s.style.overflow = 'hidden';
			g.appendChild(s);
			
			f.style.width = 0+"px";
			f.style.height = 0+"px"
			
			//alert('Vreme');
			
			var s = document.createElement('script');
			s.setAttribute('type', 'text/javascript');
			//s.innerText = 'SbSocialWidget.init({partnerId : '+site_id+', width : '+width+', height : '+height+', widgetId : \''+widget_id+'\', cmsPath : \'http://'+env+'cms.springboardplatform.com\'	});';
			
			var innerJs = 'overInterval = setInterval(function(){';
			innerJs += 'if(typeof SbSocialWidget == "undefined") {} else { clearInterval(overInterval); SbSocialWidget.init({partnerId : '+site_id+', width : '+width+', height : '+height+', widgetId : \''+widget_id+'\', cmsPath : \'//'+env+'cms.springboardplatform.com\'	});  } }';
			innerJs += ', 200);'
			
				
			//s.innerText = innerJs;
			s.innerHTML = innerJs;
			//s.innerText = 'if(typeof SbSocialWidget == \'undefined\') {alert(\'Nema\')}';
			
			//clearInterval(overInterval);
			//overInterval = setInterval(function(){slideUp(eid, endBottomValue, bottomStart);}, timeStep);
			//s.innerText = 'alert(1)';
			g.appendChild(s);
		}
	}
}

function slideDownSocialWidget() {
	
	var currentValue = parseInt(document.getElementById('social_widget').style.height);
	
	if(currentValue + 20 > SbSocialWidget.options.height) {
		currentValue = SbSocialWidget.options.height;
		clearInterval(slideDownInterval);
	} else {
		currentValue = currentValue + 20;
	}
	
	document.getElementById('social_widget').style.height = currentValue + 'px';
}

function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime( d.getTime() + (60*60*1000) );
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}

function checkCookie(cname) {
	var username = getCookie(cname);
	if (username != "") {
		return true;
	} else {
		return false;
	}
}

function showWidget() {
	
	var showWidget = false;
	//check SbSearchEngineCookie
	if( checkCookie('SbSearchEngineCookie') ) {
		showWidget = true;
	} else {
		//console.log('document.referrer = ' + document.referrer);
		
		var pattRef = /(^https?:\/\/(www\.)?(r\.search\.)?(google|bing|yahoo)\.)/;
		if (pattRef.test(document.referrer)) {
			
			showWidget = true;
			
			//set cookie
			setCookie('SbSearchEngineCookie', 'search-engine');
		}
	}
	
	return showWidget;
}

respondToPostMessage = function(e) {
	
	if( typeof e.data === "object" ) {
		return false;
	}
	
	var social_widget_div = document.getElementById('social_widget');
	var divPosition = social_widget_div.style.position;
	
	if( e.data.indexOf("showCollapsed") != -1 ) {
		
		
		//if(social_widget_div.style.height == '0px') {
			
			var msgElements = e.data.split("|");
			if(msgElements[1] == 'true') {
				social_widget_div.style.height = SbSocialWidget.options.height + 'px';
				if( divPosition != "fixed" ) {
					social_widget_div.style.left = '0px';
					SbSocialWidget.xPos = SbSocialWidget.posX();
				} else {
					if ( SbSocialWidget.posX() < 0 ) {
						social_widget_div.style.left =  ( SbSocialWidget.posX() + 10000 ) + "px";
					}
				}
				//slideDownInterval = setInterval(function(){slideDownSocialWidget();}, 20);
				
			} else {
				/*social_widget_div.style.width = '0px';*/
				if(social_widget_div.style.left == '-10000px') { //SET ONLY WHEN Start collapsed if no pre-roll available is CHECKED
					social_widget_div.style.height = '0px';
				}
				/*social_widget_div.innerHTML = '';*/
			}
		//}
		
	}
	
	if( e.data.indexOf("syndiTvShowCloseButton") != -1 ) {
		var msgElements = e.data.split("|");
		if(msgElements[1] == 'true') {
			//FADE IN CLOSE BUTTON
			if( divPosition == "fixed" ) {
				document.getElementById('sb-close-btn').style.opacity = 1;
				document.getElementById('sb-close-btn').style.right = "0px";
			}
			SbSocialWidget.contentPlayed = true;
		} else {
			//FADE OUT CLOSE BUTTON
			document.getElementById('sb-close-btn').style.opacity = 0;
			document.getElementById('sb-close-btn').style.right = "-18px";
			SbSocialWidget.contentPlayed = false;
		}
	}
}

if (window['addEventListener']) {
	window.addEventListener('message', respondToPostMessage, false);
} else {
    window.attachEvent('onmessage', respondToPostMessage);
}