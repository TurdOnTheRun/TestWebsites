//tealium universal tag - utag.sync ut4.0.201603290823, Copyright 2016 Tealium.com Inc. All Rights Reserved.
if(document.location.search.indexOf('test=a9')>-1){document.write('<s'+'cript type="text/javascript" src="//c.amazon-adsystem.com/aax2/amzn_ads.js">'+'<\/s'+'cript>'+'<s'+'cript type="text/javascript">'+'try {amznads.getAds("3053");console.log("TEALIUM : LOGGING : running amznads.getAds(3053)");} catch (e) {console.log("TEALIUM : ERROR : amznads.getAds(3053); : " + e);}'+'<\/s'+'cript>');}
var googletag=googletag||{};googletag.cmd=googletag.cmd||[];function isMobile(){return window.innerWidth<640?!0:!1};function isTablet(){return window.innerWidth<801?!0:!1};var slotsArray=((isTablet())?((isMobile())?[{"id":"17","width":300,"height":250,"siteID":170000},{"id":"18","width":320,"height":50,"siteID":170000},{"id":"19","width":300,"height":250,"siteID":170000},{"id":"20","width":320,"height":50,"siteID":170000},{"id":"21","width":300,"height":250,"siteID":170000},{"id":"22","width":320,"height":50,"siteID":170000},{"id":"24","width":300,"height":250,"siteID":170000},{"id":"25","width":320,"height":50,"siteID":170000},{"id":"26","width":320,"height":50,"siteID":169950}]:[{"id":"9","width":970,"height":250,"siteID":169950},{"id":"10","width":728,"height":90,"siteID":169950},{"id":"11","width":300,"height":600,"siteID":169950},{"id":"12","width":300,"height":250,"siteID":169950},{"id":"13","width":300,"height":250,"siteID":170000},{"id":"14","width":300,"height":250,"siteID":170000}]):[{"id":"1","width":970,"height":250,"siteID":169950},{"id":"2","width":728,"height":90,"siteID":169950},{"id":"3","width":300,"height":600,"siteID":169950},{"id":"4","width":300,"height":250,"siteID":169950},{"id":"5","width":300,"height":250,"siteID":170000},{"id":"6","width":300,"height":250,"siteID":170000}]);cygnus_index_args={"timeout":300,"siteID":169950,"slots":slotsArray};var cygnus_index_primary_request=true;function cygnus_index_parse_res(){}
function cygnus_index_start(){if(cygnus_index_primary_request){for(var i=[],h=0;h<cygnus_index_args.slots.length;h++){var s=cygnus_index_args.slots[h],t={id:"T1_"+s.id,width:s.width,height:s.height,siteID:169999};i.push(t)};for(var h=0;h<i.length;h++)
cygnus_index_args.slots.push(i[h]);cygnus_index_primary_request=false;}
cygnus_index_args.parseFn=cygnus_index_parse_res;var escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function escapeCharacter(character){var escaped=meta[character];if(typeof escaped==='string'){return escaped;}else{return'\\u'+('0000'+
character.charCodeAt(0).toString(16)).slice(-4);}}
function quote(string){escapable.lastIndex=0;if(escapable.test(string)){return string.replace(escapable,escapeCharacter);}else{return string;}}
function OpenRTBRequest(siteID,parseFn,timeoutDelay){this.initialized=false;if(typeof siteID!=="number"||siteID%1!==0||siteID<0){throw"Invalid Site ID";}
if(typeof timeoutDelay==="number"&&timeoutDelay%1==0&&timeoutDelay>=0){this.timeoutDelay=timeoutDelay;}
this.siteID=siteID;this.impressions=[];this._parseFnName=undefined;if(top===self){this.sitePage=location.href;this.topframe=1;}else{this.sitePage=document.referrer;this.topframe=0;}
if(typeof parseFn!=='undefined'){if(typeof parseFn==='function'){this._parseFnName="cygnus_index_args.parseFn";}else{throw"Invalid jsonp target function";}}
if(typeof _IndexRequestData.requestCounter==='undefined'){_IndexRequestData.requestCounter=Math.floor(Math.random()*256);}else{_IndexRequestData.requestCounter=(_IndexRequestData.requestCounter+1)%256;}
this.requestID=String((new Date().getTime()%2592000)*256+
_IndexRequestData.requestCounter+256);this.initialized=true;}
OpenRTBRequest.prototype.serialize=function(){var json='{"id":'+this.requestID+',"site":{"page":"'+
quote(this.sitePage)+'"';if(typeof document.referrer==='string'){json+=',"ref":"'+quote(document.referrer)+'"';}
json+='},"imp":[';for(var i=0;i<this.impressions.length;i++){var impObj=this.impressions[i];var ext=[];json+='{"id":"'+impObj.id+'", "banner":{"w":'+impObj.w+
',"h":'+impObj.h+',"topframe":'+String(this.topframe)+
"}";if(typeof impObj.bidfloor==='number'){json+=',"bidfloor":'+impObj.bidfloor;if(typeof impObj.bidfloorcur==='string'){json+=',"bidfloorcur":"'+quote(impObj.bidfloorcur)+
'"';}}
if(typeof impObj.slotID==='string'&&(!impObj.slotID.match(/^\s*$/))){ext.push('"sid":"'+quote(impObj.slotID)+'"');}
if(typeof impObj.siteID==='number'){ext.push('"siteID":'+impObj.siteID);}
if(ext.length>0){json+=',"ext": {'+ext.join()+'}';}
if(i+1==this.impressions.length){json+='}';}else{json+='},';}}
json+="]}";return json;};OpenRTBRequest.prototype.setPageOverride=function(sitePageOverride){if(typeof sitePageOverride==='string'&&(!sitePageOverride.match(/^\s*$/))){this.sitePage=sitePageOverride;return true;}else{return false;}};OpenRTBRequest.prototype.addImpression=function(width,height,bidFloor,bidFloorCurrency,slotID,siteID){var impObj={'id':String(this.impressions.length+1)};if(typeof width!=='number'||width<=1){return null;}
if(typeof height!=='number'||height<=1){return null;}
if((typeof slotID==='string'||typeof slotID==='number')&&String(slotID).length<=50){impObj.slotID=String(slotID);}
impObj.w=width;impObj.h=height;if(bidFloor!=undefined&&typeof bidFloor!=='number'){return null;}
if(typeof bidFloor==='number'){if(bidFloor<0){return null;}
impObj.bidfloor=bidFloor;if(bidFloorCurrency!=undefined&&typeof bidFloorCurrency!=='string'){return null;}
impObj.bidfloorcur=bidFloorCurrency;}
if(typeof siteID!=='undefined'){if(typeof siteID==='number'&&siteID%1===0&&siteID>=0){impObj.siteID=siteID;}else{return null;}}
this.impressions.push(impObj);return impObj.id;};OpenRTBRequest.prototype.buildRequest=function(){if(this.impressions.length==0||this.initialized!==true){return;}
var jsonURI=encodeURIComponent(this.serialize());var scriptSrc=window.location.protocol==='https:'?'https://as-sec.casalemedia.com':'http://as.casalemedia.com';scriptSrc+='/headertag?v=9&x3=1&fn=cygnus_index_parse_res&s='+
this.siteID+'&r='+jsonURI;if(typeof this.timeoutDelay==="number"&&this.timeoutDelay%1==0&&this.timeoutDelay>=0){scriptSrc+='&t='+this.timeoutDelay;}
return scriptSrc;};try{if(typeof cygnus_index_args==='undefined'||typeof cygnus_index_args.siteID==='undefined'||typeof cygnus_index_args.slots==='undefined'){return;}
if(typeof _IndexRequestData==='undefined'){_IndexRequestData={};_IndexRequestData.impIDToSlotID={};_IndexRequestData.reqOptions={};}
var req=new OpenRTBRequest(cygnus_index_args.siteID,cygnus_index_args.parseFn,cygnus_index_args.timeout);if(cygnus_index_args.url&&typeof cygnus_index_args.url==='string'){req.setPageOverride(cygnus_index_args.url);}
_IndexRequestData.impIDToSlotID[req.requestID]={};_IndexRequestData.reqOptions[req.requestID]={};var slotDef,impID;for(var i=0;i<cygnus_index_args.slots.length;i++){slotDef=cygnus_index_args.slots[i];impID=req.addImpression(slotDef.width,slotDef.height,slotDef.bidfloor,slotDef.bidfloorcur,slotDef.id,slotDef.siteID);if(impID){_IndexRequestData.impIDToSlotID[req.requestID][impID]=String(slotDef.id);}}
if(typeof cygnus_index_args.targetMode==='number'){_IndexRequestData.reqOptions[req.requestID].targetMode=cygnus_index_args.targetMode;}
if(typeof cygnus_index_args.callback==='function'){_IndexRequestData.reqOptions[req.requestID].callback=cygnus_index_args.callback;}
return req.buildRequest();}catch(e){}}
var scriptTag=document.createElement("script");scriptTag.setAttribute("src",cygnus_index_start());scriptTag.setAttribute("type","text/javascript");var firstScript=document.getElementsByTagName("script")[0];if(firstScript.parentNode){firstScript.parentNode.insertBefore(scriptTag,firstScript);}
window.DY={scsec:8766706,API:function(){(DY.API.actions=DY.API.actions||[]).push(arguments)}};document.write('<s'+'cript type="text/javascript" src="//cdn.dynamicyield.com/api/'+DY.scsec+'/api_dynamic.js">'+'<\/s'+'cript>');document.write('<s'+'cript type="text/javascript" src="//cdn.dynamicyield.com/api/'+DY.scsec+'/api_static.js">'+'<\/s'+'cript>');