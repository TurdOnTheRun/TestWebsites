var tcmAds = tcmAds || {};

tcmAds.createHeaderTout = function(adVars) {
if (typeof adVars.name == "undefined") { throw "You must supply a name for this tout"; }

	var ad = {
		
		channels : {
			hp : [
				"https://subscription.people.com/storefront/subscribe-to-people/link/1027931.html"
			] ,
			
			ros : ["https://subscription.people.com/storefront/subscribe-to-people/link/1027932.html"]
		},

		width : 510,
		height : 40,
		toutName : adVars.name,
		micrositeName : "pe-footer994x250",

		buildLinks : function() {
			this.link1 = this.formatForDoubleClick(this.channels[this.channel][0]);
			//this.link2 = this.formatForDoubleClick(this.channels[this.channel][1]);
		},

		formatForDoubleClick : function(url) {
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
				if (qs_val == "") qs_val = "null";
				extra_qs += "&" + qs_param + "=" + qs_val;
			}
			// the first "&" should be a "?"
			extra_qs = extra_qs.replace("&", "?");
			return url + extra_qs;
		},

		setup : function(){
			this.resources_path = '//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/'+this.micrositeName+'/resources/';
            if(/tcmtools\.ecommerce\.timeinc\.com|file:\/\/\//.test(window.location.href)){
                this.resources_path = this.resources_path.replace('//subscription-assets.timeinc.com/prod/assets/themes/magazines/', '//tcmtools.ecommerce.timeinc.com/');
            } else if (/qa\/assets/.test(window.location.href)) {
                this.resources_path=this.resources_path.replace('.com/prod/assets/','.com/qa/assets/');
            }

			this.channel = adVars.TCMchannel;
			if(!(this.channel in this.channels)){
				this.channel = 'hp';
			}
		},

		drawTout: function() {

			/////////////////////
			//TOUT CREATIVE, EDIT AS NEEDED
			////////////////////

			document.write(
				"<a href="+this.link1+" target='_blank' style=\"display:inline-block;\"><div style=\"background-image:url("+this.resources_path+"images/ADS_footer_994x250_dont_miss_moment_B.png);height:250px;width:950px;display:block;overflow:hidden;position:relative;\"><img src='https://subscription-assets.timeinc.com/prod/assets/themes/magazines/default/template-resources/images/PE/covers/peoplecover_205x273.jpg' style=\"position: absolute;left: 501px;width: 185px;-moz-transform: rotate(13deg);-ms-transform: rotate(13deg);-webkit-transform: rotate(13deg);transform: rotate(13deg);top: 38px;border:0;\"/></div></a>"
			);
		},

		channel : '',
		resources_path : '',

		makeIt : function() {
			this.setup();
			this.buildLinks();
			this.drawTout();
		}
	};
	ad.makeIt();
};
tcmAds.createHeaderTout(tcmAds['pe-footer994x250.config']);

if(typeof window.parent.jQuery != "undefined" ){
        window.parent.jQuery(document).ready(
               function(){
                       var s = parent.document.createElement("SCRIPT");
                       s.src = "http://subscription-assets.people.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/pe-premsigninjump/tout.js";
                       parent.document.getElementsByTagName("HEAD")[0].appendChild(s);
               }
        );
}