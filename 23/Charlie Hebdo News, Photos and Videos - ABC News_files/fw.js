/*Criteo - begin*/

var crtg_nid = '3363';
var crtg_cookiename = 'crtg_abc';
var crtg_varname = 'crtg_content';
function crtg_getCookie(c_name){ var i,x,y,ARRCookies=document.cookie.split(";");for(i=0;i<ARRCookies.length;i++){x=ARRCookies[i].substr(0,ARRCookies[i].indexOf("="));y=ARRCookies[i].substr(ARRCookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);} }return'';}
var crtg_content = crtg_getCookie(crtg_cookiename);
var crtg_rnd=Math.floor(Math.random()*99999999999);
(function(){
var crtg_url=location.protocol+'//rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);
crtg_url +='&cookieName='+escape(crtg_cookiename);
crtg_url +='&rnd='+crtg_rnd;
crtg_url +='&varName=' + escape(crtg_varname);
var crtg_script=document.createElement('script');crtg_script.type='text/javascript';crtg_script.src=crtg_url;crtg_script.async=true;
if(document.getElementsByTagName("head").length>0)document.getElementsByTagName("head")[0].appendChild(crtg_script);
else if(document.getElementsByTagName("body").length>0)document.getElementsByTagName("body")[0].appendChild(crtg_script);
})();

crtgParams = '';
if(typeof crtg_content != "undefined"){
	crtgArr = crtg_content.split(';');
	for(i=0;i<crtgArr.length;i++){
		crtgParams = crtgParams+'&'+crtgArr[i];
	}
	crtgParams = crtgParams.substring(0, crtgParams.length-1);
}

/*Criteo - end*/


var fwProtocol = (window.location.protocol=='https:')?'https:':'http:';
var fwDomain = (fwProtocol=='https:')?'':fwProtocol+'//a.abcnews.com';
var fwBaseUrl = fwProtocol+"//2912a.v.fwmrm.net/ad/g/1?";
var fwRequests = new Array();
var fwPTiling = '';
var fwSiteUrl = window.location.toString();
fwEnvType = (typeof window.fw_envM == "undefined")?'desktop':window.fw_envM;

if(fwEnvType=='phoneweb'){
	fwSectionFallbackId = '231386';
	fwPTiling = '&_fw_h_x_flash_version=0%2C0%2C0%2C0&flag=-ptil';
	if(tq.objType == "index" && tq.section == "video"){
	    tq.section = "vididx"
	}
}
else if (fwEnvType=='tabletweb'){
	fwSectionFallbackId = '425641';
	fwPTiling = '&flag=-ptil';

	if(fwSiteUrl.toLowerCase().indexOf('/trending')!=-1){
		tq.section = 'trending';
		tq.objType = 'sectionindex';
	}
}

//override csid for videos
if(tq.objType == "video"){
    if(fwEnvType == "desktop"){
        tq.section = 'vididx_other';
    }else{
        tq.section = 'vididx';
    }
}

fwTypeMap = {
    types:{
        ad:[
            {  dig:'Rectangle',
             	fw:'rectangle',
            adunit:'Rectangle',
			params:'&w=300&h=250&cd=300,250|300,600',
			  slau:'&slau=Rectangle%20300x250|Rectangle%20300x600',
		   pretags:'ad-300x250'},
			{  dig:'Rectangle2',
             	fw:'rectangle2',
            adunit:'Rectangle2',
			params:'&w=300&h=250&cd=300,250',
			slau:'&slau=Rectangle2%20300x250',
		   pretags:'ad-300x250'},
		   {  dig:'TabletRectangle',
             	fw:'rectangle',
            adunit:'Rectangle',
			params:'&w=300&h=250',
			  slau:'&slau=Rectangle%20300x250',
		   pretags:'ad-300x250'},
		   {  dig:'PhoneWebRectangle',
             	fw:'rectangle',
            adunit:'Rectangle',
			params:'&w=300&h=250',
			  slau:'&slau=Rectangle%20300x250',
		   pretags:'ad-300x250'},
            {  dig:'Banner',
                fw:'leaderboard',
			params:'&w=728&h=90',
			  slau:'&slau=Leaderboard%20728x90',
		   pretags:'ad-728x90'},
            {  dig:'Footer',
                fw:'footer',
            adunit:'Footer',
			params:'&w=1&h=1',
			  slau:'&slau=Footer',
		   pretags:'ad-1x1'},
            {  dig:'PromoBox',
                fw:'footer1',
            adunit:'Footer1',
			params:'&w=300&h=100',
			  slau:'&slau=Footer1%20300x100',
		   pretags:'ad-300x100'},
            {  dig:'PromoBox2',
                fw:'footer2',
            adunit:'Footer2',
			params:'&w=300&h=100',
			  slau:'&slau=Footer2%20300x100',
		   pretags:'ad-300x100'},
            {  dig:'PromoBox3',
                fw:'footer3',
			params:'&w=300&h=100',
			  slau:'&slau=Footer3%20300x100',
		   pretags:'ad-300x100'},
            {  dig:'LRGutters',
                fw:'wallpaper',
			params:'&w=1&h=1',
			  slau:'&slau=Wallpaper'},
            {  dig:'OverPage',
                fw:'overpage',
			params:'&w=1&h=1',
			  slau:'&slau=Overpage'},
            {  dig:'PopUnder',
                fw:'popup',
			params:'&w=1&h=1',
			  slau:'&slau=PopUp'},
            {  dig:'SponsoredByLogo',
                fw:'sponsoredbylogo1',
			params:'&w=115&h=30&cd=115,30',
			  slau:'&slau=SponsoredByLogo1%20115x30'},
            {  dig:'SponsoredByLogo2',
                fw:'sponsoredbylogo2',
			params:'&w=115&h=30&cd=115,30',
			  slau:'&slau=SponsoredByLogo2%20115x30'},
            {  dig:'SponsoredByLogo3',
                fw:'sponsoredbylogo3',
			params:'&w=115&h=30&cd=115,30',
			  slau:'&slau=SponsoredByLogo3%20115x30'},
            {  dig:'Survey',
                fw:'survey',
			params:'&w=1&h=1',
			  slau:'&slau=Survey'},
            {  dig:'ThinBanner',
                fw:'thinbanner',
			params:'&w=970&h=66',
			  slau:'&slau=Thin%20Banner%20970x66',
		   pretags:'ad-970x66'},
            {  dig:'ThinBanner2',
                fw:'thinbanner2',
			params:'&w=658&h=60',
			  slau:'&slau=Thin%20Banner2%20658x60',
		   pretags:'ad-658x60'},
		   {  dig:'Mobilebanner',
                fw:'mobilebanner',
			params:'&w=320&h=50&cd=300,50|320,50',
			  slau:'&slau=Mobile%20Banner%20300x50|Mobile%20Banner%20320x50',
		   pretags:'ad-300x50'},
           {  dig:'SponsoredModule',
              fw:'sponsoredmodule',
              params:'&w=1&h=1',
              slau:'&slau=Sponsored%20Module%201x1'}
        ]
    }
};

function fwAdRnd(){
	rnd = Math.floor(Math.random()*(1000000000+1));
	return rnd;	
}

var fwAdRndVal = fwAdRnd()+'-'+fwAdRnd();

function fwAdTagSeek(){
	for(i=0;i<fwPreIdArr.length;i++){
		fwSeekTmp = $('#'+fwPreIdArr[i]).html();
		if(fwSeekTmp != null){
			if((fwSeekTmp.indexOf('<!---->') != -1)||(fwSeekTmp.indexOf('<!-- -->') != -1)){
				$('#'+fwPreIdArr[i]).css('display','none');
				if(fwPreIdArr[i].indexOf('rectangle') != -1){
					$('#homead').css('display','none');
				}
			}
		}
	}
}

fwLogAdOppFlag = false;

function fwLogAdOpp(){
	if(!fwLogAdOppFlag){
		fwLogAdImg = '<img src="'+fwProtocol+'//log.go.com/log?srvc=nws&guid='+fwAdRndVal+'&a=100" style="position:absolute;left:-3000px;" />';
		document.write(fwLogAdImg);
		addOnload(fwAdTagSeek());
		fwLogAdOppFlag = true;	
	}
}

function fwGetTypeParams(itype){
	fwTypeStr = '';
	for(i=0;i<fwTypeMap.types.ad.length;i++){
		fwDataObj = fwTypeMap.types.ad[i];
		if(fwDataObj){
			if(itype == fwDataObj.dig){
				fwTypeStr = fwDataObj.fw + fwDataObj.params;
				fwDimArr = fwDataObj.params.split('&');
				fwW = fwDimArr[1].substring(2, fwDimArr[1].length);
				fwH = fwDimArr[2].substring(2, fwDimArr[2].length);
				return [fwTypeStr, fwDataObj.slau, fwDataObj.pretags, fwW, fwH, fwDataObj.adunit];
			}
		}
	}
	if(fwTypeStr == ''){
		return false;
	}
}

function segScores(i) {
	var o = {};
	if (!i.indexOf("CBLM-001:")) {
		i = i.substring(9);
		var id, sc, e = 0,f = 0,h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		for (var b = 0,a = i.length,l = a - (a % 4); b < l;) {
			var m = h.indexOf(i.charAt(b++));
			var k = h.indexOf(i.charAt(b++));
			f |= (m << 2 | k >> 4) << (e++ ? 0 : 8);
			f *= (e %= 6) && e - 2 ? 1 : 0;
			var j = h.indexOf(i.charAt(b++));
			if (j != 64) {
				f |= ((k & 15) << 4 | j >> 2) << (e++ ? 0 : 8);
				if (!(e - 2)) {
					id = f;
				}
				f *= (e %= 6) && e - 2 ? 1 : 0
			}
			var g = h.indexOf(i.charAt(b++));
			if (g != 64) {
				f |= ((j & 3) << 6 | g) << (e++ ? 0 : 8);
				if (!(e - 6)) {
					o[id] = f;
				}
				f *= (e %= 6) && e - 2 ? 1 : 0
			}
		}
	}
	return o;
}

function fwSeg(){
	fwAdCookie = readCookie('CRBLM');
	if (fwAdCookie != null) {
		fwAdCookie = segScores(fwAdCookie);
		fwAdCookieStr = "";
		for (var i in fwAdCookie) {
			if (fwAdCookie[i] > 0) {
				fwAdCookieStr = fwAdCookieStr + "&seg=" + i;
			}
		}
		return fwAdCookieStr;
	} else {
		return '';
	}
}

fwSegStr = fwSeg();
fwAdCount = 0; fwPreIdArr = new Array();
fwMobileCSID = (typeof window.fw_csid == "undefined")?'':window.fw_csid;
fwRecipeInfo = ((typeof tq.recipes !== "undefined") && (tq.recipes!=''))?tq.recipes:'';
fwSubsectionInfo = (tq.subsection!='')?'&subsection='+tq.subsection:'';
fwShowInfo = (tq.show!='')?'&show='+tq.show:'';

function digGetAdLoc(itype, lat,lng, returnMarkup) {
	if(itype == 'RevenueScience'){
		fwLogAdOpp();
	}else{
		typeStr = fwGetTypeParams(itype);
		fwSrcUrl = ''; fwRequestTmp = '';
		fwPageType = (tq.objType == 'index')?'sectionindex':tq.objType;
		fwKeywordsArr = (tq.keywords)?tq.keywords.split('$'):false; fwKeywordsArr = (fwKeywordsArr.length > 0)?fwKeywordsArr.sort():false;
		fwKeywordsStr = '';
		
		for(i=0;i<fwKeywordsArr.length;i++){
			if(fwKeywordsArr[i] != ''){
				fwKeywordsStr = fwKeywordsStr + '|tag:' + fwKeywordsArr[i];
			}
		}
		
		fwCaId = tq.caid + fwKeywordsStr;
		fwCaId = (fwCaId.charAt(0)=='|') ? fwCaId.substring(1, fwCaId.length) : fwCaId;
		
		if(typeStr){
			fwPs = '<scr'+'ipt type="text/javascript" src="'+fwDomain+'/assets/static/ads/fwps.js"></scr'+'ipt>'
			fwSlid = (typeStr[0])?typeStr[0]:''; 
			fwSlau = (typeStr[1])?typeStr[1]:''; 
			fwAdUnit = (typeStr[5])?'&adunit='+typeStr[5]:'';

			if(fwEnvType=='desktop'){
			    fwEnv = (returnMarkup == 'iframe')?'g_iframe_js':'g_js';
			} else {//phone/tablet web
			    fwEnv = (returnMarkup == 'iframe')?'g_iframe':'g_js';
			}

			fwPreId = itype.toLowerCase()+'-'+fwAdCount;
			fwPreIdArr.push(fwPreId);
			fwPreTag = (typeStr[2])?'<div id="'+fwPreId+'" class="'+typeStr[2]+'""><div class="adslug"><!--AD--></div>':''; 
			fwPostTag = (typeStr[2])?fwPs:'';
			fwCsId = (tq.section == '')?'nws_other':"nws_"+fwMobileCSID+tq.section;
			fwStaticVal = 'nw='+fwNetworkId+'&sfid='+fwSectionFallbackId+'&csid='+fwCsId+'&caid='+fwCaId+'&pvrn='+fwAdRndVal+'&resp=ad'+fwPTiling+';';
			fwDynamicVal = 'pageType='+fwPageType+fwShowInfo+fwSubsectionInfo+fwRecipeInfo+fwSegStr+fwAdUnit+crtgParams+';'+'ptgt=s&envp='+fwEnv+'&slid='+fwSlid+fwSlau;
			fwRequestTmp = fwBaseUrl + fwStaticVal + fwDynamicVal+"&ltlg="+lat+","+lng;
			fwRequests.push(fwRequestTmp);
			fwSrcUrl = fwPreTag+'<scr'+'ipt type="text/javascript" src="'+fwRequestTmp+'"></scr'+'ipt>'+fwPostTag;
			if(fwAdSystem){
				if(returnMarkup){
					if(returnMarkup == 'iframe'){
						return '<ifr'+'ame  marginwidth="0" marginheight="0" scrolling="no" border="0" frameborder="0" width="'+typeStr[3]+'" height="'+typeStr[4]+'" src="'+fwRequestTmp+'"></ifr'+'ame>';
					}else{
						return fwSrcUrl;
					}
				}else{
					document.write(fwSrcUrl);
				}
			}
			fwAdCount = fwAdCount+1;
		}
	}
}

function digGetAd(itype,returnMarkup){//fwGetAd
	if(itype == 'RevenueScience'){
		fwLogAdOpp();
	}else{
		typeStr = fwGetTypeParams(itype);
		fwSrcUrl = ''; fwRequestTmp = '';
		fwPageType = (tq.objType == 'index')?'sectionindex':tq.objType;
		fwKeywordsArr = (tq.keywords)?tq.keywords.split('$'):false; fwKeywordsArr = (fwKeywordsArr.length > 0)?fwKeywordsArr.sort():false;
		fwKeywordsStr = '';
		
		for(i=0;i<fwKeywordsArr.length;i++){
			if(fwKeywordsArr[i] != ''){
				fwKeywordsStr = fwKeywordsStr + '|tag:' + fwKeywordsArr[i];
			}
		}
		
		fwMobileCSID = (typeof window.fw_csid == "undefined")?'':window.fw_csid;
		
		fwCaId = tq.caid + fwKeywordsStr;
		fwCaId = (fwCaId.charAt(0)=='|') ? fwCaId.substring(1, fwCaId.length) : fwCaId;
		
		if(typeStr){
			fwPs = '<scr'+'ipt type="text/javascript" src="'+fwDomain+'/assets/static/ads/fwps.js"></scr'+'ipt>'
			fwSlid = (typeStr[0])?typeStr[0]:''; 
			fwSlau = (typeStr[1])?typeStr[1]:'';
			/*if((returnMarkup == 'iframe')&&(itype == 'Rectangle')){
				fwBaseUrl = "http://a.abcnews.com/assets/static/ads/rectangle.html?";
				fwSlauTmp = fwSlau.split('|'); fwSlau = fwSlauTmp[0];
				fwSlidTmp = fwSlid.split('|'); fwSlid = fwSlidTmp[0];
			}else{
				fwBaseUrl = fwProtocol+"//2912a.v.fwmrm.net/ad/g/1?";
			}*/

			// return to grace mode (no need to serve in via another iframe)
			fwBaseUrl = fwProtocol+"//2912a.v.fwmrm.net/ad/g/1?";

			fwAdUnit = (typeStr[5])?'&adunit='+typeStr[5]:'';

			if(fwEnvType=='desktop'){
                fwEnv = (returnMarkup == 'iframe')?'g_iframe_js':'g_js';
            } else {//phone/tablet web
                fwEnv = (returnMarkup == 'iframe')?'g_iframe':'g_js';
            }

			fwPreId = itype.toLowerCase()+'-'+fwAdCount;
			fwPreIdArr.push(fwPreId);
			fwPreTag = (typeStr[2])?'<div id="'+fwPreId+'" class="'+typeStr[2]+'""><div class="adslug"><!--AD--></div>':''; 
			fwPostTag = (typeStr[2])?fwPs:'';
			fwCsId = (tq.section == '')?'nws_other':'nws_'+fwMobileCSID+tq.section;
			fwStaticVal = 'nw='+fwNetworkId+'&sfid='+fwSectionFallbackId+'&csid='+fwCsId+'&caid='+fwCaId+'&pvrn='+fwAdRndVal+'&resp=ad'+fwPTiling+';';
			fwDynamicVal = 'pageType='+fwPageType+fwShowInfo+fwSubsectionInfo+fwRecipeInfo+fwSegStr+fwAdUnit+crtgParams+';'+'ptgt=s&envp='+fwEnv+'&slid='+fwSlid+fwSlau;
			fwRequestTmp = fwBaseUrl + fwStaticVal + fwDynamicVal;
			fwRequests.push(fwRequestTmp);
			fwSrcUrl = fwPreTag+'<scr'+'ipt type="text/javascript" src="'+fwRequestTmp+'"></scr'+'ipt>'+fwPostTag;
			if(fwAdSystem){
				if(returnMarkup){
					if(returnMarkup == 'iframe'){
						return '<ifr'+'ame  marginwidth="0" marginheight="0" scrolling="no" border="0" frameborder="0" width="'+typeStr[3]+'" height="'+typeStr[4]+'" src="'+fwRequestTmp+'"></ifr'+'ame>';
					}else{
						return fwSrcUrl;
					}
				}else{
					document.write(fwSrcUrl);
				}
			}
			fwAdCount = fwAdCount+1;
		}
	}
}

/*Sponsored Links*/

function slGetAd(size,isBing,type,section){
	/*slTagStr = '';
	
	slplcId = '';//ROS defaults
	slDimObj = (size=='footer')?[630,200]:[300,250];
	slSection = (!section)?tq.section:section; slType = (!type)?tq.objType:type;
	
	if(slType=='video'){
		slSection = 'video'; slType = 'index';
	}else if(slType=='slideshow'){
		slSection = 'slideshow'; slType = 'index';
	}else if(slType=='homepage'){
		slSection = 'homepage'; slType = 'index';
	}else if(slType=='subindex'){
		slType = 'index';
	}else if(slType=='blog'){
		slSectionPathArr = window.location.pathname.split('/');
		slSection = (slSectionPathArr.length>2)?slSectionPathArr[2]:'';
	}
	
	if(slType == 'index'){
		if(slSection == 'video'){
			slplcId = '4130-3729323571';
		}else{
			slplcId = (size=='footer')?'4128-4235330536':'4129-2446275914';
		}
	}else if(slType == 'blog'){
		slplcId = (size=='footer')?'4126-2256435831':'4127-3310208529';
	}else{
		slplcId = (size=='footer')?'4124-2057508645':'4125-4043906286';
	}
	
	slTagClass = (slType == 'index' && tq.objType == 'video')?['marketplacebing','midcontainer','bing video']:['story_widget','quigo','midcontainer'];
	slTagClass = (size == 'footer')?['marketplacebing','midcontainer','bing']:slTagClass;
	
	slpreTags = "<div class='"+slTagClass[0]+"'><div class='"+slTagClass[1]+"'><div class='"+slTagClass[2]+"'>";
	slpostTags = "</div></div></div>";
	slTagStr = slpreTags+"<scr"+"ipt type='text/javascript'>adblade_cid='"+slplcId+"';adblade_ad_width='"+slDimObj[0]+"';adblade_ad_height='"+slDimObj[1]+"';adblade_ad_host='web.adblade.com';adblade_tag_type='1';</scr"+"ipt><scr"+"ipt type='text/javascript' src='//web.adblade.com/js/ads/show.js'></scr"+"ipt>"+slpostTags;
	
	document.write(slTagStr);*/
}