var pe_chopro37_300x250_4free = {

    channels : {
		"Bulk":"https://subscription.people.com/storefront/subscribe-to-people/link/1020890.html",
	    "News":"https://subscription.people.com/storefront/subscribe-to-people/link/1020891.html",
		"Tablet": "https://subscription.people.com/storefront/subscribe-to-people/link/1020892.html",
		"Sandbox": "https://subscription.people.com/storefront/subscribe-to-people/link/1020948.html",
		"UpfrontAdTest": "https://subscription.people.com/storefront/subscribe-to-people/link/1020959.html",
		"eeROS": "https://subscription.people.com/storefront/subscribe-to-people/link/1022027.html"
    },

    width : 300,
    height : 250,
    objName : "pe_chopro37_300x250_4free",
    micrositeName : "pe-chopro37_300x250_4free",
    adUnit : ticmAdParams1394204258242,
    dfltChannel : "Bulk",

    writeCreative : function(){

/////////////////////
//TOUT CREATIVE, EDIT AS NEEDED
////////////////////
	if (this.channel == 'Tablet' || this.channel == 'TabletNoPrem') {
		var toutHTML = '<div id="'+this.objName + '">' +
				'<a href="' + this.link + '" target="_blank"><img src="' + this.resources_path + 'images/300x250.png" border="0"></a>' +
				'</div>';
	} else {
		var toutHTML = '<div id="'+this.objName+'flashContent">'+
		'<object id="'+this.objName+'flashObj" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.width+'" height="'+this.height+'">'+
		'<param name="movie" value="' + this.resources_path + 'images/300x250.swf" />'+
		'<param name="quality" value="high" />'+
		'<param name="bgcolor" value="#000000" />'+
		'<param name="play" value="true" />'+
		'<param name="loop" value="true" />'+
		'<param name="wmode" value="opaque" />'+
		'<param name="scale" value="showall" />'+
		'<param name="menu" value="true" />'+
		'<param name="devicefont" value="false" />'+
		'<param name="salign" value="" />'+
		'<param name="allowScriptAccess" value="sameDomain" />'+
			'<param name="flashvars" value="clickTag=' + encodeURIComponent(this.link) + '" />'+
		'<!--[if !IE]>-->'+
		'<object type="application/x-shockwave-flash" data="' + this.resources_path + 'images/300x250.swf" width="'+this.width+'" height="'+this.height+'">'+
		'<param name="movie" value="' + this.resources_path + 'images/300x250.swf" />'+
		'<param name="quality" value="high" />'+
		'<param name="bgcolor" value="#000000" />'+
		'<param name="play" value="true" />'+
		'<param name="loop" value="true" />'+
		'<param name="wmode" value="opaque" />'+
		'<param name="scale" value="showall" />'+
		'<param name="menu" value="true" />'+
		'<param name="devicefont" value="false" />'+
		'<param name="salign" value="" />'+
		'<param name="allowScriptAccess" value="sameDomain" />'+
			'<param name="flashvars" value="clickTag=' + encodeURIComponent(this.link) + '" />'+
		'<!--<![endif]-->'+
		'<div><a href="' + this.link + '" target="_blank"><img src="' + this.resources_path + 'images/300x250.png" style="border:0px;"/></a></div>'+
		'<!--[if !IE]>-->'+
		'</object>'+
		'<!--<![endif]-->'+
		'</object>'+
		'</div>';
	}

	document.write(toutHTML);

    },

    channel : '',
    dfpGet : '',
	subs3Tracking: '',
    resources_path : '',
    link : '',

    

    setup : function(){
	this.channel = this.adUnit.TCMchannel;
	this.dfpGet = this.adUnit.clickTracking.dartGet;
	this.subs3Tracking = this.adUnit.subs3Tracking;
	this.link = this.channels[this.channel] || this.channels[this.dfltChannel];
	this.link = this.formatForDoubleClick(this.link);

	this.resources_path = '//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/'+this.micrositeName+'/resources/';

       if (/savvis/.test(window.location.href) || /cmdev-/.test(window.location.href)) {
	 this.link=this.link.replace("//subscription","//cmdev-subscription");
       } else if (/qa-/.test(window.location.href) || /\/qa\//.test(window.location.href)) {
	 this.link=this.link.replace("//subscription","//qa-subscription");
       }
       if(/ecom-dev01-app\.usdlls2\.savvis\.net:10400|file:\/\/\//.test(window.location.href)){
	   this.resources_path=this.resources_path.replace('//subscription-assets.timeinc.com/prod/assets/','//ecom-dev01-app.usdlls2.savvis.net:10400/');
       } else if (/qa\/assets/.test(window.location.href)){
	   this.resources_path=this.resources_path.replace('.com/prod/assets/','.com/qa/assets/');
       }
    },


	formatForDoubleClick: function(url) {
		var tcm_dfpGet = this.dfpGet,
			extra_qs = "",
			qs_param, qs_val;

		if (tcm_dfpGet != "%c") {
			url = tcm_dfpGet + url.replace("://","%3a%2f%2f");
		}

		for (qs_param in this.subs3Tracking) {
			qs_val = this.subs3Tracking[qs_param];

			if (/^%%PATTERN/.test(qs_val) || /^%s$/.test(qs_val)){ qs_val = "0000";}
			if (qs_val == "") qs_val = "null";

			extra_qs += "&" + qs_param + "=" + qs_val;
		}

		// the first "&" should be a "?"
		extra_qs = extra_qs.replace("&", "?");

		return url + extra_qs;
	},

    makeIt : function(){
	this.setup();
	this.writeCreative();
    }
};
pe_chopro37_300x250_4free.makeIt();