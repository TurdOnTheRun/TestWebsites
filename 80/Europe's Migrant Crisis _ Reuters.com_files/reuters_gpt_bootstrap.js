admantx_callback  = function (data) {
    TR3.data.admantx = "";
    if (data && data.admants && data.status == "OK") {
        TR3.log("admantx_callback :" + data.status);
        for (var i = 0; i < data.admants.length; i++) {
            if (i>0) TR3.data.admantx += ",";
            TR3.data.admantx += data.admants[i];
        } 
        TR3.log("admantx_callback TR3.data.admantx:" + TR3.data.admantx);
    }
};

var flag = !!(TR3.checkHosts(["www.reuters.com", "uk.reuters.com", "jp.reuters.com"])&& (!!TR3.data.contentType));

if (TR3.checkHosts(["www.reuters.com", "uk.reuters.com", "jp.reuters.com"])&& (!!TR3.data.contentType)){ 
     if ( TR3.checkHosts(["www.reuters.com"]) ){
       var adxsvcReq = '//async01.admantx.com/admantx/service?request=' + escape('{"key":"234330834c41105ad5ed794fa036e085b40225c44f9228bb9e2692f427917605", "decorator":"template.reuters", "filter":["default"], "method":"descriptor", "mode":"async", "type":"URL", "body":"' + encodeURIComponent(document.location.href) + '"}');   
}
else{
      var adxsvcReq = '//async01.admantx.com/admantx/service?request=' + escape('{"key":"234330834c41105ad5ed794fa036e085b40225c44f9228bb9e2692f427917605", "decorator":"template.reuters", "filter":["default"], "method":"descriptor", "mode":"async", "type":"URL", "body":"' + encodeURIComponent(document.location.href) + '"}');
}

    var adxsvcSE = document.createElement('script');
    adxsvcSE.id = "adxsvcSE_2";
    adxsvcSE.type = 'text/javascript';
    adxsvcSE.async = true;
    adxsvcSE.src = adxsvcReq;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(adxsvcSE, s);
}

TR3.data.GlobalAdsAllowed = true;

TR3.log = function(msgs) {
    TR3.logs.push([new Date()].concat(Array.prototype.slice.call(arguments)));
    if (TR3.logEnabled === 1) {
        return window.console && console.log &&
            Function.apply.call(console.log, console, arguments);
    }
};

TR3.checkHosts = function(hosts) {
    for (var i = hosts.length - 1; i >= 0; i--) {
        if (window.location.hostname.indexOf(hosts[i]) >= 0) {
            return true;
        }
    }
    return false;};

TR3.getURLQueryParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

TR3.extractDartZone = function() {
    var m = document.getElementsByTagName('meta');
    for (i=0; i<m.length; i++) {
        if(m[i].name == "DCSext.DartZone"){
            return m[i].content;
        }
    }
    return "undefined";
};

var adSymbol = TR3.getURLQueryParameterByName("symbol");
var adTest = TR3.getURLQueryParameterByName("adstest");
var adParams ="";
var adParams2 ="";

if (TR3.data.admantx !=="" && !!TR3.data.admantx){
	adParams += "admant=" + TR3.data.admantx+";";
	adParams2 += "admant=" + TR3.data.admantx+";";
}
if(typeof(adTest)!='undefined'){
	adParams += "adstest=" + adTest +";";
	adParams2 += "adstest=" + adTest +";";
}

 //lotame
if( typeof lotamePid === 'undefined' || lotamePid === null ){
   var lotamePid;
}
else{
    adParams += "lpid=" +lotamePid +";";
    adParams2 += "lpid=" +lotamePid +";";
}
if(typeof(adSymbol)!='undefined'){
	adParams += "symbol=" + adSymbol; 
	adParams2 += "symbol=" + adSymbol;
}





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

var setSite = function(uri) {
    var site, parser;
    if (typeof(uri) === 'undefined' || uri === '' || uri.indexOf('http') < 0) {
        uri = window.document.location.href;
    }
    parser = window.document.createElement('a');
    parser.href = uri;
    site = parser.hostname;
    return site;
};

var rubicontag = rubicontag || {};
    rubicontag.cmd = rubicontag.cmd || [];
var gptadslots = [];
var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

(function() {
    var account_id = 11384;
    var rct = document.createElement('script');
        rct.type = 'text/javascript';
        rct.async = true;
        rct.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//ads.rubiconproject.com/header/' + account_id + '.js';
    var node = document.getElementsByTagName('script')[0];
        node.parentNode.appendChild(rct);
})();


displayAdFL = function( pSite, pTarget) {
	
	//--> Admantx Begin
	pTarget+=";admant=" + TR3.data.admantx;
    //--> Admantx End  
	
	var dzn = pSite.split(";");
	//--> Add template variable to ad call Begin
	if (dzn[0] == 'us.reuters/home'){
		pTarget+=";template=home";
	}
	else if (dzn[0].indexOf("article") > -1){
		pTarget+=";template=article";
	}
	//--> Add template variable to ad call End
	

	rubicontag.cmd.push(function() {
		rubicontag.defineSlot("/4735792/" + pSite, [[728, 90],[970,250],[970,90]], "div_gpt_lb").setPosition('atf').addFPI('type','leaderboard');
		rubicontag.defineSlot("/4735792/" + pSite, [[300, 250],[300,600],[300,1050],[160,600],[160,600]], "div_gpt_mpu").setPosition('atf').addFPI('type','mpu');
		rubicontag.defineSlot("/4735792/" + pSite, [[300, 250],[300,600]], "div_gpt_mpulow").setPosition('btf').addFPI('type','mpulow');
		
		rubicontag.run(gptrun);
	});

	var gptran = false;
	var gptrun = function(){
		if (gptran) {
			return;
		}       
		gptran = true;

    var gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';
    var useSSL = 'https:' === document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
	};

    googletag.cmd.push(function() { 

   	//--> Adslot 1 declaration
	gptadslots[0]= googletag.defineSlot("/4735792/" + pSite, [[728, 90],[970,250],[970,90]] ,'div_gpt_lb').setTargeting('type',['leaderboard']).addService(googletag.pubads());

    console.log("Display Ad via GPT + FL: Site:" + pSite + " Target: type=leaderboard;" + pTarget + " Div Slot: div_gpt_lb" );  
  
	//--> Adslot 2 declaration
	gptadslots[1]= googletag.defineSlot("/4735792/" + pSite, [[300, 250],[300,600],[300,1050],[160,600],[160,600]],'div_gpt_mpu').setTargeting('type',['mpu']).addService(googletag.pubads());

    console.log("Display Ad via GPT + FL: Site:" + pSite + " Target: type=mpu;" + pTarget + " Div Slot: div_gpt_mpu");
	
	//--> Adslot 3 declaration
	gptadslots[2]= googletag.defineSlot("/4735792/" + pSite, [[300, 250],[300,600]],'div_gpt_mpulow').setTargeting('type',['mpulow']).addService(googletag.pubads());

    console.log("Display Ad via GPT + FL: Site:" + pSite + " Target: type=mpulow;" + pTarget + " Div Slot: div_gpt_mpulow");
	
	for (var i=0; i<gptadslots.length; i++) {
		if(rubicontag && rubicontag.setTargetingForGPTSlot){
			console.log("rubicon targeting set for slot " + i);
			rubicontag.setTargetingForGPTSlot(gptadslots[i]);
		}
	}	

	if (!!pTarget) {
		var t = pTarget.split(";");
		
			for (var k = 0; k<t.length; k++){
				if (t[k].indexOf("=") > 0){
               		gptadslots[0].setTargeting(t[k].substr(0,t[k].indexOf("=")), t[k].substr(t[k].indexOf("=")+1));
					gptadslots[1].setTargeting(t[k].substr(0,t[k].indexOf("=")), t[k].substr(t[k].indexOf("=")+1));
                    gptadslots[2].setTargeting(t[k].substr(0,t[k].indexOf("=")), t[k].substr(t[k].indexOf("=")+1));
            	}
				else{
					 console.error("Targeting string index of = "+ pTarget + " in Error");
				}
		}
	}
	
	googletag.pubads().enableSingleRequest();
       googletag.pubads().enableAsyncRendering();
      googletag.pubads().collapseEmptyDivs(true);
       googletag.enableServices();
	
	
});
	
	 googletag.cmd.push(function() { googletag.display('div_gpt_lb'); });
	 googletag.cmd.push(function() { googletag.display('div_gpt_mpu'); });
	 googletag.cmd.push(function() { googletag.display('div_gpt_mpulow'); });
	
}// GPT Begin

var gptadslots=[];

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
var gads = document.createElement("script");
gads.async = true;
gads.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
var node =document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(gads, node);
})();

// function to gather ad variables and define ad slot
displayAd = function(pDivId, pSite, pSize, pTarget) {
     
	 if (TR3.data.GlobalAdsAllowed){
       	pDivId = pDivId.trim();
        var dzn = pSite.split(";");
		
		//--> Admantx Begin
		pTarget+=";admant=" + TR3.data.admantx;
        //--> Admantx End    

        //--> Add template variable to ad call Begin
		if (dzn[0] == 'us.reuters/home'){
			pTarget+=";template=home";
		}
		else if (dzn[0].indexOf("article") > -1){
			pTarget+=";template=article";
		}
		//--> Add template variable to ad call Begin

		//--> AdBlock Plus Begin. Determine if ABP present, update dart zones, render labels	
		if(abp){
			TR3.log('abp true');
			var label= "<div class='adv_header'>ADVERTISEMENT</div>";
			var style = "<style>.adv_header {color: #999;font-family: arial,helvetics,sans-serif;font-size: 9px;padding-bottom:2px;text-align:center;}</style>";
			var secondary = pTarget;
			
			if (dzn[0].indexOf("us.reuters") > -1){
				if (dzn[0] == 'us.reuters/home'){
					pSite = 'us.reuters/adblock/homepage';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);	
				}	
				else if (dzn[0].indexOf("article") > -1){
					pSite = 'us.reuters/adblock/article';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);	
				}
				else if (dzn[0].indexOf("bizfinance/money") > -1){
					pSite = 'us.reuters/adblock/money';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);	
				}
				else{
					pSite = 'us.reuters/adblock/general';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);	
				}
			}
				
			else if (dzn[0].indexOf("uk.reuters") > -1){
				if (dzn[0] == 'uk.reuters/home'){
					pSite = 'uk.reuters/adblock/homepage';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);
				}
				else if (dzn[0].indexOf("article") > -1){
					pSite = 'uk.reuters/adblock/article';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);	
				}
				else if (dzn[0].indexOf("bizfinance/money") > -1){
					pSite = 'us.reuters/adblock/money';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);
				}
				else{
					pSite = 'us.reuters/adblock/general';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);
				}	
			}
				
			else if (dzn[0].indexOf("in.reuters") > -1){
				if (dzn[0] == 'in.reuters/home'){
					pSite = 'in.reuters/adblock/homepage';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);
				}
				else if (dzn[0].indexOf("article") > -1){
					pSite = 'in.reuters/adblock/article';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);	
				}
				else if (dzn[0].indexOf("bizfinance/money") > -1){
					pSite = 'in.reuters/adblock/money';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);
				}
				else{
					pSite = 'in.reuters/adblock/general';
					$("#div_gpt_mpulow").before(label);
					$("#div_gpt_mpulow").before(style);
				}	
			}
			

	             if (dzn[0].indexOf("us.reuters") > -1 || dzn[0].indexOf("in.reuters") > -1 || dzn[0].indexOf("uk.reuters") > -1){
			if(pDivId=='div_gpt_mpulow'){
            	                $("#div_gpt_mpu").before(label);	
				$("#div_gpt_bi_content").before(label);
				$("#div_gpt_bi_content_landing").before(label);
			}
                    }
			   
		}
		//--> AdBlock Plus End 
			
		//--> Adslot declaration Begin
        if (!!pDivId){
            googletag.cmd.push(function() {
                        
            //define slot

        if(pDivId=='div_gpt_intro'){
            gptadslots[pDivId] = googletag.defineOutOfPageSlot("/4735792/" + pSite, pDivId).addService(googletag.pubads());
         }
         else{
            gptadslots[pDivId] = googletag.defineSlot("/4735792/" + pSite, pSize, pDivId).addService(googletag.pubads());
	}
	 
			//add the targetting
            if (!!pTarget) {
              	var t = pTarget.split(";");
                for (var k = 0; k<t.length; k++)
                 	if (t[k].indexOf("=") > 0){
                        	gptadslots[pDivId].setTargeting(t[k].substr(0,t[k].indexOf("=")), t[k].substr(t[k].indexOf("=")+1));
                    }
                    else{
                       console.error("Targeting string index of = "+ pTarget + " in Error for " + pDivId);
					}
                 } 
				 else console.error("Targeting string not target "+ pTarget + " in Error." + pDivId);
			});
		}
		//--> Adslot declaration End

        //--> Native Ad Setup Begin
        if(pDivId=='div_gpt_bi_content_landing'){
           	$('#div_gpt_bi_content_landing').insertAfter($('#moreSectionNews').find('.feature')[2]);
      	}

        if(pDivId=='div_gpt_bi_video'){
            $('#div_gpt_bi_video').insertAfter($('#moreVideos').find('.feature')[3]);
        }

        if(pDivId=='div_gpt_bi_video_landing'){
           	$('#moreVideoStrip .columnRight').hide();
            $('#div_gpt_bi_video_landing').insertAfter($('#moreVideoStrip .columnCenter'));
            $('#div_gpt_bi_video_landing').addClass('columnRight');
                 
            setTimeout(function(){
              	if($("#div_gpt_bi_video_landing").css('display') == 'none') { 
                  	$('#div_gpt_bi_video_landing').removeClass('columnRight');                      
                    $('#moreVideoStrip .columnRight').show();
				}
            }, 2000);
                 
 		}

  if(pDivId=='sponsored_content_gpt'){
           	$('#ad-replacement-video').html('')
                 $('#ad-replacement-video').append($('#sponsored_content_gpt'));
    }


		
		//--> Native Ad Setup End 
		
        googletag.cmd.push(function() { googletag.display(pDivId); });
			
	    console.log("Display Ad via GPT: Site:" + pSite + " Target:" + pTarget + " Div Slot:" + pDivId );   
     }            
};

displayAd_sync = function( pSite, pTarget) {
      if (TR3.data.GlobalAdsAllowed){
              
           //--> Admantx Begin
			pTarget+=";admant=" + TR3.data.admantx;
        	//--> Admantx End    
			
			var dzn = pSite.split(";");
			
			//--> Add template variable to ad call Begin
			if (dzn[0] == 'us.reuters/home'){
				pTarget+=";template=home";
			}
			else if (dzn[0].indexOf("article") > -1){
			pTarget+=";template=article";
			}
			//--> Add template variable to ad call Begin
	
			//--> AdBlock Plus Begin
			if(abp){
				TR3.log('abp true');
				var label= "<div class='adv_header'>ADVERTISEMENT</div>";
				var style = "<style>.adv_header {color: #999;font-family: arial,helvetics,sans-serif;font-size: 9px;padding-bottom:2px;text-align:center;}</style>";
				
				if (dzn[0].indexOf("us.reuters") > -1){
				
					if (dzn[0] == 'us.reuters/home'){
						pSite = 'us.reuters/adblock/homepage';
						 $("#div_gpt_lb").before(label);
                         $("#div_gpt_lb").before(style);
					}
					else if (dzn[0].indexOf("article") > -1){
						pSite = 'us.reuters/adblock/article';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}
					else if (dzn[0].indexOf("bizfinance/money") > -1){
						pSite = 'us.reuters/adblock/money';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}
					else{
						pSite = 'us.reuters/adblock/general';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}	
				}
				else if (dzn[0].indexOf("uk.reuters") > -1){
				
					if (dzn[0] == 'uk.reuters/home'){
						pSite = 'uk.reuters/adblock/homepage';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}
					else if (dzn[0].indexOf("article") > -1){
						pSite = 'uk.reuters/adblock/article';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);	
					}
					else if (dzn[0].indexOf("bizfinance/money") > -1){
						pSite = 'uk.reuters/adblock/money';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}
					else{
						pSite = 'uk.reuters/adblock/general';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}	
				}
				else if (dzn[0].indexOf("in.reuters") > -1){
				
					if (dzn[0] == 'in.reuters/home'){
						pSite = 'in.reuters/adblock/homepage';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}
					else if (dzn[0].indexOf("article") > -1){
						pSite = 'in.reuters/adblock/article';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);	
					}
					else if (dzn[0].indexOf("bizfinance/money") > -1){
						pSite = 'in.reuters/adblock/money';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}
					else{
						pSite = 'in.reuters/adblock/general';
						$("#div_gpt_lb").before(label);
                        $("#div_gpt_lb").before(style);
					}	
				}
			}
			//--> AdBlock Plus End

            googletag.cmd.push(function() {
                       
            //--> Adslot 1 declaration
			gptadslots[1]= googletag.defineSlot('/4735792/'+pSite,   [[728, 90],[970,250],[970,90],[970,66], [940,230]] ,'div_gpt_lb').setTargeting('type',['leaderboard']).addService(googletag.pubads());

            console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboard;" + pTarget + " Div Slot: div_gpt_lb" + " Sync" );  
  
			//--> Adslot 2 declaration
			gptadslots[2]= googletag.defineSlot('/4735792/'+pSite,  [[300, 250],[300,600],[300,1050],[160,600],[160,600]],'div_gpt_mpu').setTargeting('type',['mpu']).addService(googletag.pubads());

            console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu;" + pTarget + " Div Slot: div_gpt_mpu" +  " Sync");  
		  
			//add the targetting
            if (!!pTarget) {
               var t = pTarget.split(";");
                  	for (var k = 0; k<t.length; k++){
                         	if (t[k].indexOf("=") > 0){
                            	gptadslots[1].setTargeting(t[k].substr(0,t[k].indexOf("=")), t[k].substr(t[k].indexOf("=")+1));
                                  gptadslots[2].setTargeting(t[k].substr(0,t[k].indexOf("=")), t[k].substr(t[k].indexOf("=")+1));
                      		}
                            else{
                              	console.error("Targeting string index of = "+ pTarget ); 
							}
					}
       		} 

            googletag.pubads().enableSingleRequest();
			googletag.pubads().enableAsyncRendering();
            googletag.pubads().collapseEmptyDivs(true);
			googletag.enableServices();
			});
			
            googletag.cmd.push(function() { googletag.display('div_gpt_lb'); });	
            googletag.cmd.push(function() { googletag.display('div_gpt_mpu'); });

     }		             
};

if(window.console){
console.info("GPT.js LOADED");
}
