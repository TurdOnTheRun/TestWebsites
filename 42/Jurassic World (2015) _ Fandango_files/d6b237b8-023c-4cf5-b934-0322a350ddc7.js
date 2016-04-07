// Copyright 2006-2016 ClickTale Ltd., US Patent Pending
// Generated on: 4/1/2016 2:49:38 PM (UTC 4/1/2016 7:49:38 PM)

window.ClickTaleGlobal = window.ClickTaleGlobal || {};
ClickTaleGlobal.scripts = ClickTaleGlobal.scripts || {};
ClickTaleGlobal.scripts.filter = ClickTaleGlobal.scripts.filter || (function () {
    var recordingThreshold = Math.random() * 100;

    return {
        isRecordingApproved: function(percentage) {
            return recordingThreshold <= percentage;
        }
    }
})();


if (typeof(ct_dispatcher) == 'undefined')
{
	ct_dispatcher = {
		configName : null,
		cookieName : "ct_configName",
		getParameterByName : function (name)
		{
			 name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			 var regexS = "[\\?&]" + name + "=([^&#]*)";
			 var regex = new RegExp(regexS, "i");
			 var results = regex.exec(window.location.search);
			 if(results == null)
			   return "";
			 else
			   return decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		createCookie: function (name,value,days) 
		{
			if (days) 
			{
				var date = new Date();
				date.setTime(date.getTime( )+( days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString( );
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie : function (name) 
		{
			var nameEQ = name + "=";
			var ca = document.cookie.split( ';');
			for( var i=0;i < ca.length;i++) 
			{
				var c = ca[i];
				while ( c.charAt( 0)==' ') c = c.substring( 1,c.length);
				if ( c.indexOf( nameEQ) == 0) return c.substring( nameEQ.length,c.length);
			}
			return null;
		}
	};
		
	// Read from querystring
	var ct_pdc_qs_val = ct_dispatcher.getParameterByName(ct_dispatcher.cookieName);
	if (ct_pdc_qs_val)
	{
		// Override/create cookie
		ct_dispatcher.createCookie(ct_dispatcher.cookieName, ct_pdc_qs_val, 14);
		ct_dispatcher.configName = ct_pdc_qs_val;
	}
	else
	{
		// Read from cookie
		ct_dispatcher.configName = ct_dispatcher.readCookie(ct_dispatcher.cookieName);
	}

	
}

	if (typeof (ClickTaleCreateDOMElement) != "function")
{
	ClickTaleCreateDOMElement = function(tagName)
	{
		if (document.createElementNS)
		{
			return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
		}
		return document.createElement(tagName);
	}
}

if (typeof (ClickTaleAppendInHead) != "function")
{
	ClickTaleAppendInHead = function(element)
	{
		var parent = document.getElementsByTagName('head').item(0) || document.documentElement;
		parent.appendChild(element);
	}
}

if (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != "function")
{
	ClickTaleXHTMLCompliantScriptTagCreate = function(code)
	{
		var script = ClickTaleCreateDOMElement('script');
		script.setAttribute("type", "text/javascript");
		script.text = code;
		return script;
	}
}	
		var configFoundPHC = false;
	
if (ct_dispatcher.configName == 'dev_FDG-227FOrRnD')
{
	configFoundPHC = true;
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2016 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 124\r\n\/\/ Generated on: 4\/1\/2016 2:49:38 PM (UTC 4\/1\/2016 7:49:38 PM)\r\n\r\nvar WRInitTime=(new Date()).getTime();\r\n\r\n\/\/ Start of custom user-defined settings code\r\n\r\n\/\/ End of custom user-defined settings code\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\n\t");
	ClickTaleAppendInHead(script);	})();
	}
			
	

	// Default configuration
if (!configFoundPHC)
{
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2016 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 124\r\n\/\/ Generated on: 4\/1\/2016 2:49:38 PM (UTC 4\/1\/2016 7:49:38 PM)\r\n\r\nvar WRInitTime=(new Date()).getTime();\r\n\r\n\/\/ Start of custom user-defined settings code\r\n\r\n\/\/ End of custom user-defined settings code\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\n\t");
	ClickTaleAppendInHead(script);	})();
	}
