
var init = true; 

window.TR3= {};
TR3.logEnabled = 1;
TR3.logs       = [];
TR3.intervals  = {};
TR3.tagEvents  = {};
TR3.sync       = {};
TR3.tags       = {};
TR3.counters   = {};
TR3.data       = {};
TR3.Ads        = {};
TR3.data.adslots = [];

TR3.data.ord = Math.floor(Math.random()*10e12);

window.WT = window.WT || {};

TR3.log = function(msgs) {
    TR3.logs.push([new Date()].concat(Array.prototype.slice.call(arguments)));
    if (TR3.logEnabled === 1) {
        return window.console && console.log &&
            Function.apply.call(console.log, console, arguments);
    }
};

TR3.extractDartZone = function() {
    var m = document.getElementsByTagName('meta');
    for (i=0; i<m.length; i++) {
        if(m[i].name == "DCSext.DartZone"){
            return m[i].content;
        }
    }
    return "undefined";
};

TR3.data.doNotFireTags = !!window.location.pathname.match(/videoChannelNarrow|videoTabNarrow|commentsChild|\/assets\/ticker|\/assets\/|news\/pictures\/small-inline-slideshow/i);

TR3.data.hasFlash = function () {
    retval = "no";
    try {
        retval = ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || (!!window.ActiveXObject && !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))) ? "yes" : "no");
    }
    catch(e)
    {
        TR3.log("Exception : Flash Detection failed..");
    }
    finally {
        return retval;
    }
}();

//DFP Premimum code
TR3.data.GlobalAdsAllowed = true;
TR3.data.criteoLive = false;
TR3.data.dfpNetworkId = "N4735792";
TR3.data.sites = {};
TR3.data.sites = {
    'www.reuters.com' : {'enabled':true, 'tier2':false, 'rubicon': true},
    'uk.reuters.com' :  {'enabled':true, 'tier2':false, 'rubicon': true},
    'live.reuters.com' :  {'enabled':true, 'tier2':true},
    'ca.reuters.com' :  {'enabled':true, 'tier2':true},
    'cn.reuters.com' : {'enabled':true, 'tier2':false},
    'in.reuters.com' : {'enabled':true, 'tier2':false},
    'jp.reuters.com' : {'enabled':true, 'tier2':true},
    'blogs.reuters.com' : {'enabled':true, 'tier2':true},
    'mx.reuters.com' : {'enabled':true, 'tier2':true},
    'lta.reuters.com' : {'enabled':true, 'tier2':true},
    'ar.reuters.com'  : {'enabled':true, 'tier2':true},
    'br.reuters.com' : {'enabled':true, 'tier2':true},
    'es.reuters.com' : {'enabled':true, 'tier2':true},
    'ru.reuters.com' : {'enabled':true, 'tier2':true},
    'ara.reuters.com' : {'enabled':true, 'tier2':true},
    'fr.reuters.com' :  {'enabled':true, 'tier2':true},
    'de.reuters.com' : {'enabled':true, 'tier2':true},
    'it.reuters.com' : {'enabled':true, 'tier2':true},
    'borsaitaliana.it.reuters.com' : {'enabled':true, 'tier2':true},
    'af.reuters.com' :  {'enabled':true, 'tier2':true},
    'olyadmin.reuters.com' :  {'enabled':true, 'tier2':false},
    'betaus.admin.reuters.com' :  {'enabled':true, 'tier2':false},
    'brazil-soccer.reuters.com' :  {'enabled':true, 'tier2':false},
    'winter-games.reuters.com' :  {'enabled':true, 'tier2':false},
    'live.jp.reuters.com' :  {'enabled':true, 'tier2':true}, 
    '10.90.23.211' :  {'enabled':true, 'tier2':true},  
    '10.90.22.142' :  {'enabled':true, 'tier2':false},
    '10.90.43.101' :  {'enabled':true, 'tier2':false, 'rubicon': true},
    '10.90.43.102' :  {'enabled':true, 'tier2':false},
    '10.90.22.173' :  {'enabled':true, 'tier2':false},
    '10.90.22.174' :  {'enabled':true, 'tier2':false},
    '10.90.22.116' :  {'enabled':true, 'tier2':true},
    '10.90.22.118' :  {'enabled':true, 'tier2':true},
    '10.90.22.119' :  {'enabled':true, 'tier2':true},
    '10.90.22.120' :  {'enabled':true, 'tier2':true},
    '10.90.22.121' :  {'enabled':true, 'tier2':true},
    '10.90.22.122' :  {'enabled':true, 'tier2':true},
    '10.90.22.123' :  {'enabled':true, 'tier2':true},
    '10.90.22.124' :  {'enabled':true, 'tier2':true},
    '10.90.22.125' :  {'enabled':true, 'tier2':true},
    '10.90.22.126' :  {'enabled':true, 'tier2':true},
    '10.90.22.179' :  {'enabled':true, 'tier2':true},
    '10.90.22.175' :  {'enabled':true, 'tier2':true},
    '10.90.43.115' :  {'enabled':true, 'tier2':true},
    '10.90.43.117' :  {'enabled':true, 'tier2':true},
    '10.90.0.13'   :  {'enabled':true, 'tier2':false},
    'betacn.reuters.com' : {'enabled':true, 'tier2':false},
    '10.90.43.107' :  {'enabled':true, 'tier2':true},
    '10.90.22.166' :  {'enabled':true, 'tier2':false},
    '10.90.22.167' :  {'enabled':true, 'tier2':false},
    '10.90.22.141' :  {'enabled':true, 'tier2':false},
    '10.90.22.206': {'enabled':true, 'tier2':false},
    'betajp.reuters.com' : {'enabled':true, 'tier2':false},
    'funds.us.reuters.com' : {'enabled':true, 'tier2':false},
    'funds.uk.reuters.com' : {'enabled':true, 'tier2':false},
    'funds.in.reuters.com' : {'enabled':true, 'tier2':false},
    'portfolio.us.reuters.com' : {'enabled':true, 'tier2':false},
    'portfolio.uk.reuters.com' : {'enabled':true, 'tier2':false},
    'portfolio.in.reuters.com' : {'enabled':true, 'tier2':false},
    'alerts.us.reuters.com' : {'enabled':true, 'tier2':false},
    'alerts.uk.reuters.com' : {'enabled':true, 'tier2':false},
    'alerts.in.reuters.com' : {'enabled':true, 'tier2':false},
    'stockscreener.us.reuters.com' : {'enabled':true, 'tier2':false},
    'stockscreener.uk.reuters.com' : {'enabled':true, 'tier2':false},
    'stockscreener.in.reuters.com' : {'enabled':true, 'tier2':false},
 'betade.reuters.com' : {'enabled':true, 'tier2':false},
 '10.90.22.207' :  {'enabled':true, 'tier2':false},
'10.90.23.207':  {'enabled':true, 'tier2':false},
  '10.35.60.43' :  {'enabled':true, 'tier2':true},
  '10.35.60.44' :  {'enabled':true, 'tier2':true},
  '10.35.60.45' :  {'enabled':true, 'tier2':true},
  '10.35.60.50' :  {'enabled':true, 'tier2':true},
  '10.35.60.42' :  {'enabled':true, 'tier2':true},
  '10.35.60.19' :  {'enabled':true, 'tier2':true}

};

TR3.data.DFPEnabled = !!TR3.data.sites[window.location.hostname]['enabled']  && TR3.data.GlobalAdsAllowed;

if (window.location.pathname.indexOf("investigates") > -1) {
                window.googletag = {};
                googletag.cmd = googletag.cmd || [];
                Bootstrapper.insertScript("http://www.googletagservices.com/tag/js/gpt.js");
                TR3.log("GPT Script Loaded.")}

TR3.dumpLogs = function() {
    for (var i = 0; i < TR3.logs.length; i++) {
        Function.apply.call(console.log, console, TR3.logs[i]);
    }};

TR3.writeScript = function(url) {
    document.write('<scr'+'ipt type="text/javascript" src="' + url + '"></scr'+'ipt>');
};

TR3.checkHosts = function(hosts) {
    for (var i = hosts.length - 1; i >= 0; i--) {
        if (window.location.hostname.indexOf(hosts[i]) >= 0) {
            return true;
        }
    }
    return false;};

TR3.addEvent = function(name) {
    TR3.log("event fired: " + name);
    TR3.tagEvents[name.toLowerCase()] = 1;
};

TR3.checkEvents = function(events) {
    for (var i = events.length - 1; i >= 0; i--) {
        if (TR3.tagEvents[events[i].toLowerCase()] !== 1) {
            TR3.log("event not completed: ", events[i]);
            return false;
        }
    }
    TR3.log("all events completed: ", events);
    return true;};

TR3.checkEvent = function(event) {
    if (TR3.tagEvents[event.toLowerCase()] === 1) {
        TR3.log("event completed: ", event);
        return true;
    }};

TR3.hasTimedOut = function(name, maxIntervals) {
    if (!TR3.counters[name]) {
        TR3.counters[name] = 0;
    }
    if (TR3.counters[name] === maxIntervals) {
        TR3.addEvent("timeout:" + name);
        TR3.log("timeout:" + name  + " after " + maxIntervals + " intervals");
        return true;
    }
    TR3.counters[name]++;
    return false;};

TR3.createDFPUrl = function (baseUrl, params) {
    //TR3.data.yieldFireSwitchEnabled = false;
    
   

	if(abp){
			TR3.log('abp true');
			var label= "<div class='adv_header' id='abp_header'>ADVERTISEMENT</div>";
			var label_lb= "<div class='adv_header adv_header_lb' id='abp_header'>ADVERTISEMENT</div>";
			var style = "<style>.adv_header {color: #999;font-family: arial,helvetics,sans-serif;font-size: 9px;padding-bottom:2px;text-align:center;}</style>";
			var dzn = baseUrl.split(";");
			var len1=dzn[0].length;
			var secondary = baseUrl.substring(len1);
			TR3.log("bURL=" + dzn[0]);

			if (dzn[0].indexOf("us.reuters") > -1){
	
	if (dzn[0] == 'us.reuters/home'){
				baseUrl= 'us.reuters/adblock/homepage;' + secondary;
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}	
			}
			else if (dzn[0].indexOf("article") > -1){
				baseUrl= 'us.reuters/adblock/article;' + secondary;	
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
				
			}
			else if (dzn[0].indexOf("bizfinance/money") > -1){
				baseUrl= 'us.reuters/adblock/money;' + secondary;
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
	
			}
			else{
				baseUrl= 'us.reuters/adblock/general;' + secondary;	
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
			}	
	
}

else if (dzn[0].indexOf("uk.reuters") > -1){
	
	
	if (dzn[0] == 'uk.reuters/home'){
				baseUrl= 'uk.reuters/adblock/homepage;' + secondary;
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}	
			}
			else if (dzn[0].indexOf("article") > -1){
				baseUrl= 'uk.reuters/adblock/article;' + secondary;	
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
				
			}
			else if (dzn[0].indexOf("bizfinance/money") > -1){
				baseUrl= 'uk.reuters/adblock/money;' + secondary;
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
	
			}
			else{
				baseUrl= 'uk.reuters/adblock/general;' + secondary;	
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
			}
	
}

else if (dzn[0].indexOf("in.reuters") > -1){
	
	
	if (dzn[0] == 'in.reuters/home'){
				baseUrl= 'in.reuters/adblock/homepage;' + secondary;
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}	
			}
			else if (dzn[0].indexOf("article") > -1){
				baseUrl= 'in.reuters/adblock/article;' + secondary;	
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
				
			}
			else if (dzn[0].indexOf("bizfinance/money") > -1){
				baseUrl= 'in.reuters/adblock/money;' + secondary;
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
	
			}
			else{
				baseUrl= 'in.reuters/adblock/general;' + secondary;	
				if (dzn[1].indexOf("leaderboard") > -1){
				     $("div#leaderboard.ad").before(label_lb);
					 $("div#leaderboard.ad").before(style);
				}
				if (dzn[1] == "type=mpu"){
				     $("div#mpu.ad").before(label);
				}
				if (dzn[1] == "type=mpulow"){
				     $("div#mpulow.ad").before(label);
				}
			}
	
}

	
				
		}
	
	
	var n_pbt = window.n_pbt || ';';
    var gs = window.gs_channels || ';';
    var np = window.npsegs || ';';
    var cs = (TR3.data.crowdscience) ? TR3.data.crowdscience + ";" : ";";
    var srnd = TR3.data.srnd || ';';
    var seg = window.seg || ';';
    if (TR3.data.sites[window.location.hostname]['tier2']) seg = '';
    params = params || "";
    var uri = baseUrl;
    if (params) uri += ";" + params;
    if(typeof(Reuters)!='undefined' && typeof(Reuters.info)!='undefined' && typeof(Reuters.info.channel)!='undefined'){TR3.log('dsc');
        TR3.data.storyChannel = Reuters.info.channel;}

    var pathname =  document.location.pathname.toLowerCase();

    if(typeof(TR3.data.storyChannel)!='undefined'){
        uri+=";storychannel=" + TR3.data.storyChannel;
    }else if (pathname.indexOf('subjects/aerospace')>-1) {
        uri += ";storychannel=Aerospace";
    }

    if (uri.indexOf("storychannel=Aerospace")==-1) {
        var metas = document.getElementsByTagName('meta');

        for (i=0; i<metas.length; i++) {
            if (metas[i].getAttribute("name") == "DCSext.ChannelList") {
                var content =metas[i].getAttribute("content");
                if(content.toLowerCase().indexOf("aerospace")>-1) {
                    var i1 = uri.indexOf("storychannel=");
                    if (i1===-1) {
                        uri += "storychannel=Aerospace";
                    } else {
                        uri= uri.substring(0,i1) + "storychannel=Aerospace";
                    }
                    break;
                }
            }
        }
    }

    if (window.location.href.indexOf("articleId=UKRTX18HG2")>-1) uri += "storychannel=Aerospace";
    if (pathname.indexOf("tag/nude") > -1 )  uri += "storychannel=nude";
    if (pathname.indexOf("subjects/water-news") > -1) uri += ";custom=water";
    if ((pathname.indexOf("subjects/global-energy") > -1)||(pathname.indexOf("globalenergynews") > -1)||(pathname.indexOf("-kemp-") > -1)) {
         uri += ";custom=energy";
    } else {
                    var metas = document.getElementsByTagName("meta");
                    for (i = 0; i < metas.length; i++)
                        if (metas[i].getAttribute("name") == "DCSext.ChannelList") {
                            var content = metas[i].getAttribute("content");
                            if (content.toLowerCase().indexOf("globalenergy") > -1) {
                                uri += ";custom=energy";
                                break
                            }
                        }
    }    
                
    if (uri.indexOf("lipper-awards") > -1)     
        uri = uri.replace("\/home;","\/bizfinance\/lipperawards\/article;");   
  
    var adTest = TR3.getURLQueryParameterByName("adstest");
     if (adTest)
        if (uri.indexOf(";ord=") > -1)
            uri = uri.replace(";ord=", ";adstest=" + adTest + ";ord=");
        else {
            uri += ";adstest=" + adTest;
            uri += ";ord" + TR3.data.ord + "?";
        }  
		
	var adSymbol = TR3.getURLQueryParameterByName("symbol");
     if (adSymbol)
        if (uri.indexOf(";ord=") > -1)
            uri = uri.replace(";ord=", ";symbol=" + adSymbol + ";ord=");
        else {
            uri += ";symbol=" + adSymbol;
            uri += ";ord" + TR3.data.ord + "?";
        }           

    uri += n_pbt + srnd + np + gs + cs + seg;
    uri = uri.replace(";seg1=", "Xseg1=");
    uri = uri.replace(/;seg1=/g, ',');
    uri = uri.replace("Xseg1=", ";seg1=");
    uri = uri.replace(";csseg=", "Xcsseg=");
    uri = uri.replace(/;csseg=/g, ',');
    uri = uri.replace("Xcsseg=", ";csseg=");

    //lotame
if( typeof lotamePid === 'undefined' || lotamePid === null ){
   var lotamePid;
}
else{
     uri += ";lpid=" + lotamePid;
}
   

    if (TR3.crtg_content) uri += ';crtg_content=' + TR3.crtg_content;
    //admantx
    if (TR3.data.admantx !=="" && !!TR3.data.admantx)uri += ";admant=" + TR3.data.admantx;
   

    if (uri.indexOf(";ord=")>-1) {
       uri = uri.replace(";ord=", ";hasflash=" + TR3.data.hasFlash + ";ord=");
    } else {
       uri += ";hasflash=" + TR3.data.hasFlash;
       uri += ";ord=" + TR3.data.ord + "?";
    }
    uri = uri.replace(/;+/g, ";");
    uri = uri.replace("?;", "?");
    return uri;
	
	
	
};

TR3.insertBussUnit = function (dfpUrl) {
    if (TR3.checkHosts(["10.90.22.173"]))  
        dfpUrl = dfpUrl.replace("/us.reuters","/qa.us.reuters");  

    if (TR3.checkHosts(["10.90.22.174"]))
        dfpUrl = dfpUrl.replace("/uk.reuters", "/qa.uk.reuters");  
    
    if (TR3.checkHosts(["10.90.22.142/"]))
        dfpUrl = dfpUrl.replace("/in.reuters", "/qa.in.reuters");
    
    var tester = TR3.getURLQueryParameterByName("adstest");
    if (!!tester) dfpUrl += ";adstest=" + tester;
	
	var testerSym = TR3.getURLQueryParameterByName("symbol");
    if (!!testerSym) dfpUrl += ";symbol=" + testerSym;
    
     if (TR3.data.DFPEnabled) TR3.writeScript(dfpUrl);
};

TR3.insertDFP = function (dfpUrl) {
    
	 
		var finalURL = TR3.createDFPUrl(dfpUrl);
		TR3.writeDFPURL(finalURL);

};
 
TR3.get_browser = function (){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1]||'');
    }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return 'Opera '+tem[1];}
    }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return M[0];
 }

TR3.get_browser_version = function (){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1]||'');
    }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return 'Opera '+tem[1];}
    }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return M[1];
}

TR3.data.IE_version_LT_10_ITALY = ((TR3.get_browser()==="MSIE"&&TR3.get_browser_version()<10) && ((window.location.hostname==="10.90.43.115")||(window.location.hostname==="it.reuters.com"))) ;
           
TR3.writeDFPURL = function (finalURL) {
    
	
	if (TR3.data.DFPEnabled&&!TR3.data.IE_version_LT_10_ITALY) {
        var pos = finalURL.indexOf("/adj/");
        if (pos == -1)pos = finalURL.indexOf("/adx/");
        if ((finalURL.indexOf(TR3.data.dfpNetworkId) == -1) && (pos > -1)) {
            finalURL = finalURL.substr(0, pos + 1) + TR3.data.dfpNetworkId + finalURL.substr(pos);
        }
        
        //finalURL = TR3.createYieldFireSwitchURL(finalURL);
        TR3.log("\nFINAL URL TO BRING THE AD\n" + finalURL + "\n");
        TR3.writeScript(finalURL);
    }
};

TR3.getURLQueryParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

TR3.Ads.updateKeyValue  = function (uri, key, value) {
    var reg = "[;]" + key + "[=](.*?);";
    var re = new RegExp(reg);
    if (uri.match(re)) {
        uri =  uri.replace(re, ';' + key + "=" + value + ';');
    }
    return uri;
};

TR3.Ads.displayAsynchAd = function (divId,pSite,pType) {
    divId=divId.trim();
    TR3.log("IN fillReutersInvestigateMPU :" + divId + " IN  " + pSite);
    googletag.cmd.push(function () {
        TR3.data.adslots[divId] = googletag.defineSlot('/4735792/'+pSite, [[300, 250]], divId).addService(googletag.pubads());
        TR3.data.adslots[divId].setTargeting("type",pType);
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
        googletag.display(divId);
        TR3.log("IN fillReutersInvestigateMPU : GPT Asynch Ad displayed.");
    });
};

TR3.Ads.fillReutersInvestigateMPU = function (divId) {
    TR3.Ads.displayAsynchAd (divId,"us.reuters/investigate","mpu");
};

(function() {
      TR3.data.contentType = "landing";
      var parts = window.location.pathname.split("/");
      if (parts[1] !== null && parts[1] === "article") {
        TR3.data.contentType = "articles";
    }

})();

1;// Lotame begin

var lotamePid;

function extractPid(lotameData){ 
      lotamePid=lotameData.Profile.pid; 
}

function loadScript(url){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
              
            }
        };
    } else {  //Others
        script.onload = function(){
         
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadScript("http://ad.crwdcntrl.net/5/c=4208/pe=y/callback=extractPid");

// Lotame end



var rsc_src= 'http://js.revsci.net/gateway/gw.js?csid=I07714&auto=t';

var rsc = document.createElement('script');
    rsc.id = "rsc";
    rsc.type = 'text/javascript';
    rsc.async = true;
    rsc.src = rsc_src;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(rsc, s);


  TR3.log("Revenue Science is loaded via bootstrap.");

var run_revsci = function() {
  I07714.DM_cat(TR3.data.adZone + " > " + TR3.data.dfpZone);
  I07714.DM_tag();

}
