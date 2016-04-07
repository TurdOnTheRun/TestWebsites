/*
 * commting this since, our tag would always go on foreign domain 
 * and under no condition this will be allowed 
 * 
*/
var isInLayout = false,
	url= window.location.href,
	objectName = getParameterValue(url,"objectName"),
	parentAccess = false,
	isExternalWg = false,
	isExtAsInline = false,
	isStandardInline = false;
try{
	var assetID = window.frameElement.id;
	parentAccess = true;
}catch(e){
	parentAccess = false;
}
try{
	isInLayout = (document.getElementById("jvxWidget").src.indexOf("isInLayout=1") > -1) ? true : false;
}catch(e){}
if(!isInLayout){
	if(parentAccess){
		isExtAsInline = jvx_validate(window.frameElement.getAttribute("extFilePath"));
		/*if(isExternalWg && jvx_validate(dynamicData)){
			jvx_raiseDYEvent(dynamicData);
		}*/
		if(!isExtAsInline){
			isStandardInline = true;
		}
	}else{
		isInLayout = false;
		isExternalWg = true;
		var adUnitType = getParameterValue(url,"adUnitType"),
			isCampaign = Number(getParameterValue(url,"isCampaign")),
			campaignId = getParameterValue(url,"campaignId"),
			externalStartEventId = getParameterValue(url,"externalStartEventId"),
			adId = getParameterValue(url,"adId"),
			creativeUnitType = getParameterValue(url,"creativeUnitType"),
			placementId = getParameterValue(url,"placementId"),
			siteId = getParameterValue(url,"siteId"),
			eventReportingURL = getParameterValue(url,"reportingURL"),
			isMobile = getParameterValue(url,"isMobile"),
			assetID = getParameterValue(url,"assetID"),
			clickTagURL = getParameterValue(url,"clickTag"),
			serverURL = getParameterValue(url,"serverURL"),
			dynamicData = "",
			isDynamic = Number(getParameterValue(url,"isDynamic"));
	}
}
function jvx_raiseEventOnWindow(msg){
		  var event; 
		  if(document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent(msg, true, true);
		  } else {
			event = document.createEventObject();
			event.eventType = msg;
		  }
		  event.eventName = msg;
		  var ele = document.getElementById("jvx_eventHandler");
		  if (document.createEvent) {
			ele.dispatchEvent(event);
		  } else {
			ele.fireEvent("on" + event.eventType, event);
		  }
}
if(isStandardInline){
	try{
	var jvx_iframeBody = document.getElementsByTagName("body")[0];
	var jQuery = function (selector) { return parent.jQuery(selector, jvx_iframeBody); };
	var $jvx = jQuery;
	}catch(e){}
}
function getParameterValue(queryStr,key){
	if(queryStr == null || queryStr == "") return "";
	var queryStrArr = queryStr.split("&"),queryStrArrLen = queryStrArr.length,tempArr = null,retVal = "";
	for(var i=0; i<queryStrArrLen; i++){
		tempArr = queryStrArr[i].split("=");
		if(key == tempArr[0]) retVal = tempArr[1];
	}
	return retVal;
}

var reqData = null;
var storeEventReq = {}, jvx_callbacks = {};

var jvxAd = {
	"getUnitType": function(){
		try{
			return getUnitType();
		}catch(e){
			try{
				return parent.getUnitType();
			}catch(e){
				window.parent.postMessage('jvxAPIGetData:getUnitType', "*");
			}
		}
	},
	"openClickThrough": function(url){
		try{
			openClickThrough(url);
		}catch(e){
			try{
				parent.openClickThrough(url);
			}catch(e){
				var jvx_url_msg = 'jvxAPI:openClickThrough';
				if(typeof url != "undefined"){
					jvx_url_msg += ':'+encodeURIComponent(url);
				}
				window.parent.postMessage(jvx_url_msg, "*");
			}
		}
	},
	"loadCmacro": function(){
		try{
			parent.loadCmacro();
		}catch(e){
		}
	},
	"openURL": function(url){
		try{
			openURL(url);
		}catch(e){
			try{
				parent.openURL(url);
			}catch(e){
				var jvx_url_msg = 'jvxAPI:openURL';
				if(typeof url != "undefined"){
					jvx_url_msg += ':'+encodeURIComponent(url);
				}
				window.parent.postMessage(jvx_url_msg, "*");
			}
		}
	},
	"recordEvent": function(eventId,addnlParam){
		if(!isCampaign) return;
		try{
			recordEvent(eventId,addnlParam);
		}catch(e){
			try{
				parent.recordEvent(eventId,addnlParam);
			}catch(e){
				window.parent.postMessage('jvxAPI:recordEvent:'+eventId+':'+addnlParam, "*");
			}
		}
	},
	"showAsset": function(assetID){
		try{
			showAsset(assetID);
		}catch(e){
			try{
				parent.showAsset(assetID);
			}catch(e){
				window.parent.postMessage('jvxAPI:showAsset:'+assetID, "*");
			}
		}
	},
	"hideAsset": function(assetID){
		try{
			hideAsset(assetID);
		}catch(e){
			try{
				parent.hideAsset(assetID);
			}catch(e){
				window.parent.postMessage('jvxAPI:hideAsset:'+assetID, "*");
			}
		}
	},
	"renderAsset": function(assetID){
		try{
			renderAsset(assetID);
		}catch(e){
			try{
				parent.renderAsset(assetID);
			}catch(e){
				window.parent.postMessage('jvxAPI:renderAsset:'+assetID, "*");
			}
		}
	},
	"invokeAsset": function(assetID,assetEventType,fireTracker){
		try{
			if(typeof fireTracker == "undefined") var fireTracker = 1;
			invokeAsset(assetID,assetEventType,fireTracker);
		}catch(e){
			try{
				parent.invokeAsset(assetID,assetEventType,fireTracker);
			}catch(e){
				window.parent.postMessage('jvxAPI:invokeAsset:'+assetID+":"+assetEventType+":"+fireTracker, "*");
			}
		}
	},
	"invokeAnim": function(assetID,animID){
		try{
			invokeAnim(assetID,animID);
		}catch(e){
			try{
				parent.invokeAnim(assetID,animID);
			}catch(e){
				window.parent.postMessage('jvxAPI:invokeAnim:'+assetID+":"+animID, "*");
			}
		}
	},
	"reloadAsset": function(assetID){
		try{
			reloadAsset(assetID);
		}catch(e){
			try{
				parent.reloadAsset(assetID);
			}catch(e){
				window.parent.postMessage('jvxAPI:reloadAsset:'+assetID, "*");
			}
		}
	},
	"pauseVideo": function(assetID){
		try{
			pauseVideo(assetID,1);
		}catch(e){
			try{
				parent.pauseVideo(assetID,1);
			}catch(e){
				window.parent.postMessage('jvxAPI:pauseVideo:'+assetID, "*");
			}
		}
	},
	"restartVideo": function(assetID){
		try{
			restartVideo(assetID);
		}catch(e){
			try{
				parent.restartVideo(assetID);
			}catch(e){
				window.parent.postMessage('jvxAPI:restartVideo:'+assetID, "*");
			}
		}
	},
	"resumeVideo": function(assetID){
		try{
			resumeVideo(assetID);
		}catch(e){
			try{
				parent.resumeVideo(assetID);
			}catch(e){
				window.parent.postMessage('jvxAPI:resumeVideo:'+assetID, "*");
			}
		}
	},
	"setVideoVolume": function(assetID,vol){
		try{
			setVideoVolume(assetID,vol);
		}catch(e){
			try{
				parent.setVideoVolume(assetID,vol);
			}catch(e){
				window.parent.postMessage('jvxAPI:setVideoVolume:'+assetID+":"+vol, "*");
			}
		}
	},
	"showGroups": function(groupName){
		try{
			showGroups(groupName);
		}catch(e){
			try{
				parent.showGroups(groupName);
			}catch(e){
				window.parent.postMessage('jvxAPI:showGroups:'+groupName, "*");
			}
		}
	},
	"hideGroups": function(groupName){
		try{
			hideGroups(groupName);
		}catch(e){
			try{
				parent.hideGroups(groupName);
			}catch(e){
				window.parent.postMessage('jvxAPI:hideGroups:'+groupName, "*");
			}
		}
	},
	"getStorageData": function(getName,callback){
		try{
			return getStorageData(getName);
		}catch(e){
			try{
				return parent.getStorageData(getName);
			}catch(e){
				window.parent.postMessage('jvxAPIGetData:getStorageData:'+getName, "*");
				if(typeof getName != "undefined"){
					if(storeEventReq.hasOwnProperty(getName)){
						delete storeEventReq[getName];
					}
					storeEventReq['getStorageData'] = callback;
				}
			}
		}
	},
	"setStorageData": function(setName,useSessionStorage){
		try{
			setStorageData(setName,useSessionStorage);
		}catch(e){
			try{
				parent.setStorageData(setName,useSessionStorage);
			}catch(e){
				window.parent.postMessage('jvxAPI:setStorageData:'+setName+':'+useSessionStorage, "*");
			}
		}
	},
	"isCampaign": function(){
		var isLive = false;
		try{
			var siteId  = (url.match(/siteId=(.*)&/)[1]).split("&")[0];
		}catch(e){}
		if((typeof isCampaign != "undefined" && isCampaign) || (typeof siteId != "undefined" && siteId !=null && siteId  != "" && siteId )){
			isLive = true;
		}
		return isLive;
	},
	"on": function(msg,methodName){
		try{
			$('#eventHandler').on(msg,methodName);
		}catch(e){
			try{
				 parent.$('#eventHandler').on(msg,methodName);
			}catch(e){
				attachEventListener(document.getElementById("jvx_eventHandler"),msg,methodName,false);
			}
		}
	},
	"raiseEvent": function(msg){
		try{
			raiseEvent(msg);
		}catch(e){
			try{
				var windowID = jvx_validate(assetID) ? assetID : window.frameElement.id;
				var msg_f = (msg.search("asset") == -1) ? (windowID+"."+msg) : msg;	
				if(isExtAsInline){
					parent.raiseEvent(msg);
				}
				parent.raiseEvent(msg_f);
			}catch(e){
				window.parent.postMessage('jvxAPI:raiseEvent:'+msg, "*");
				window.parent.postMessage('jvxAPI:raiseEvent:'+msg_f, "*");
			}
		}
	},
	"invokeBaseMethod": function(key,value){
		try{
			invokeBaseMethod(key,value);
		}catch(e){
			try{
				parent.invokeBaseMethod(key,value);
			}catch(e){
				window.parent.postMessage('jvxAPI:invokeBaseMethod:'+key,value, "*");
			}
		}
	},
	"invokeExpMethod": function(key,value){
		try{
			invokeExpMethod(key,value);
		}catch(e){
			try{
				parent.invokeExpMethod(key,value);
			}catch(e){
				window.parent.postMessage('jvxAPI:invokeExpMethod:'+key,value, "*");
			}
		}
	},
	"raiseEventOnBase": function(msg){
		try{
			raiseEventOnBase(msg);
		}catch(e){
			try{
				parent.raiseEventOnBase(msg);
			}catch(e){
				window.parent.postMessage('jvxAPI:raiseEventOnBase:'+msg, "*");
			}
		}
	},
	"raiseEventOnExp": function(msg){
		try{
			raiseEventOnExp(msg);
		}catch(e){
			try{
				parent.raiseEventOnExp(msg);
			}catch(e){
				window.parent.postMessage('jvxAPI:raiseEventOnExp:'+msg, "*");
			}
		}
	},
	"recordEventByName": function(event_name, isInteractive, addnlParam, asset){
		if(!isCampaign) return;
		try{
			var event_name = event_name,
				addnlParam = jvx_validate(addnlParam) ? addnlParam : "",
				asset = jvx_validate(asset) ? asset : "";
			recordEventByName(event_name, isInteractive, addnlParam,asset);
		}catch(e){
			try{
				var windowID = asset != "" ? asset : (jvx_validate(assetID) ? assetID : window.frameElement.id);
				parent.recordEventByName(event_name, isInteractive, addnlParam,windowID);
			}catch(e){
				var msg = encodeURIComponent(event_name)+':'+isInteractive+':'+addnlParam+':'+ windowID;
				window.parent.postMessage('jvxAPI:recordEventByName:'+msg, "*");
			}
		}
	},
	"getCreativeSize": function(cb){
		if(typeof(jvx_callbacks["getCreativeSize"]) == 'undefined') jvx_callbacks["getCreativeSize"]= [];
		jvx_callbacks["getCreativeSize"].push((typeof(cb) != "undefined")? cb: "");
		top.postMessage(objectName+":getCreativeSize","*");
	},
	"initialDimension": function(width,height){
		top.postMessage(objectName+":initialDimension:"+width+":"+height+"","*");
	},
	"resizeCreative": function(width,height,effect, cb){
		if(typeof(jvx_callbacks["resizeComplete"]) == 'undefined') jvx_callbacks["resizeComplete"]= [];
		jvx_callbacks["resizeComplete"].push((typeof(cb) != "undefined")? cb: "");
		top.postMessage(objectName+":resizeCreative:"+width+":"+height+":"+effect+"","*")
	},
	/*parallax code*/
	"leaveBehindCreative": function(pos,scalePer, cb){
		if(typeof(jvx_callbacks["leaveBehindComplete"]) == 'undefined') jvx_callbacks["leaveBehindComplete"]= [];
		jvx_callbacks["leaveBehindComplete"].push((typeof(cb) != "undefined")? cb: "");
		top.postMessage(objectName+":leaveBehindCreative:"+pos+":"+scalePer+"","*")
	},
	"retainOriginalCreative": function(cb){
		if(typeof(jvx_callbacks["retainOriginalComplete"]) == 'undefined') jvx_callbacks["retainOriginalComplete"]= [];
		jvx_callbacks["retainOriginalComplete"].push((typeof(cb) != "undefined")? cb: "");
		top.postMessage(objectName+":retainOriginalCreative","*")
	},
	/*parallax code end*/
	"getCreativePosition": function(cb){
		if(typeof(jvx_callbacks["getCreativePosition"]) == 'undefined') jvx_callbacks["getCreativePosition"]= [];
		jvx_callbacks["getCreativePosition"].push((typeof(cb) != "undefined")? cb: "");
		top.postMessage(objectName+":getCreativePosition","*");
	},
	"setHeightForInOutViewport": function(width){
		top.postMessage(objectName+":setHeightForInOutViewport:"+width,"*");
	},
	"getResult":function(callback){
		attachEventListener(window.parent, "message", callback, false);
	},
	"getDynamicService":function(services,key,callback){
		if(!isCampaign) return;
		if(typeof services == "string") services = services.split(",");
		if(typeof key == "string") key = key.split(",");
		var queryStr = "campaignId="+campaignId,
			arrayLen = services.length,
			keyArrLen = key.length,
			keyValueArr = null,
			url = "//traffick.jivox.com/jivox/serverAPIs/resolveDynamicData.php?";
		for(var i=0; i<keyArrLen; i++){
			keyValueArr = key[i].split("=");
			queryStr += "&"+keyValueArr[0]+"="+keyValueArr[1];
		}
		for(var i=0; i<arrayLen; i++) queryStr += "&var="+services[i];
		queryStr += "&callback="+callback;
		url += queryStr;
		var script = document.createElement('script');
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	},
	"getDynamicData":function(){
		return dynamicData;
	},
	"isExtWidget":function(){
		return isExternalWg;
	},
	"isExtAsInlineWidget":function(){
		return isExtAsInline;
	},
	"isInlineWidget":function(){
		return isStandardInline;
	},
	"isDynamic":function(){
		return isDynamic;
	},
	"appendHTML":function(asset_ID, data, targetElemID){
		try{
			if(asset_ID == "self"){
				var appendElemID = (targetElemID == undefined) ? assetID : targetElemID;
				var appendElem = document.getElementById(appendElemID) != null ? document.getElementById(appendElemID) : document.body;
				appendElem.innerHTML += data;	
			}else{
				var assetHTML = parent.document.getElementById(asset_ID);
				var appendAssestElem = assetHTML.contentDocument.getElementById(targetElemID) != null ? assetHTML.contentDocument.getElementById(targetElemID) : assetHTML.contentDocument.body;
				appendAssestElem.innerHTML += data;
			}
		}catch(e){
			window.parent.postMessage('jvxAPI:appendHTML:'+asset_ID+':'+data+':'+targetElemID, "*");
		}
			
	},
	"replaceHTML":function(asset_ID, data, targetElemID){
		try{
			if(asset_ID == "self"){
				var appendElemID = (targetElemID == undefined) ? assetID : targetElemID;
				var appendElem = document.getElementById(appendElemID) != null ? document.getElementById(appendElemID) : document.body;
				appendElem.innerHTML = data;
			}else{
				var assetHTML = parent.document.getElementById(asset_ID);
				var appendAssestElem = assetHTML.contentDocument.getElementById(targetElemID) != null ? assetHTML.contentDocument.getElementById(targetElemID) : assetHTML.contentDocument.body;
				appendAssestElem.innerHTML = data;
			}
			
		}catch(e){
			window.parent.postMessage('jvxAPI:replaceHTML:'+asset_ID+':'+data+':'+targetElemID, "*");
		}
	}
}
function jvx_validate(val){
	return (typeof val == "undefined" || val == null || val == "" || !val) ? false : true;
}
if(typeof console == "undefined" || typeof console.log == "undefined"){
	window.console = {
		log: function () {}
	};
}
function receiveMsgOnWidgetConfig(action){
	if(typeof invokeAction == 'function' ){ 
		invokeAction(action);
	}
}

function msgReceived(msg,methodName){
 	if(storeEventReq.hasOwnProperty(msg)){
		storeEventReq[msg]();
	}else if(typeof methodName != "undefined" && storeEventReq.hasOwnProperty(methodName)){
		storeEventReq[methodName](msg);
	}
}
function attachEventListener(target, eventType, functionRef, capture){
	try{
		if(typeof target.addEventListener != "undefined"){
			target.addEventListener(eventType, functionRef, capture);
		}else{
			target.attachEvent("on" + eventType, functionRef);
		}	
	}catch(e){}
	
};
if(parentAccess && !isInLayout){
	/*if(!isInLayout){
		parent.dummyMethodToAccess();
	}*/
	function eventListner(msg){
	   /* var dotIndex = msg.indexOf("."),//(msg.search("player") == -1) ? 8 : 6,
			assetID = msg.substr(0,dotIndex),
			eventTypeStr = msg.substr(dotIndex+1,msg.length-1);*/
		try{
			msgReceived(msg);
		}catch(e){}
	}
}else{
	function listenLayoutPostMsg(e){
			if(typeof e.data != "string"){
                return;
            }
			var s = e.data.split(':', 10);
			if(s && s.length >= 2 && s[0] == "layoutWidgetListner" ){
				if(s[1] == "response"){
					reqData = s[2];
					try{
						postMsgRecived();
					}catch(e){}
				}else if(s[1] == "eventListner"){
					var msg = s[2];
					try{
						if(msg == "raiseEvent"){
							jvx_raiseEventOnWindow(s[3]);
						}
						msgReceived(msg,s[3]);
					}catch(e){}
				}else if(s[1] == "invokeB2E"){
					var msg = s[2];
					try{
						window[s[2]](s[3]);
					}catch(e){}
				}else if(s[1] == "dynamicData"){
					dynamicData = JSON.parse(decodeURIComponent(s[2]));
					jvx_raiseDYEvent();
					if(isDynamic){
						try{initiate();}catch(e){}
					}
				}else if(s[1] == "replaceHTML"){
					try{		
						jvxAd.replaceHTML("self",s[2],s[3]);
					}catch(e){}
				}else if(s[1] == "appendHTML"){
					try{
						jvxAd.appendHTML("self",s[2],s[3]);
					}
					catch(e){}
				}
			}
			
	}
	attachEventListener(window, "message", listenLayoutPostMsg, false);
}
function jvx_raiseDYEvent(){
	try{
		jvx_raiseEventOnWindow("onDynamicDataLoad");
		if(typeof onDynamicDataLoad != "undefined"){
			onDynamicDataLoad(dynamicData);
		} 
	}catch(e){ 
		if(typeof console.oldLog == "undefined") { 
			console.log(e);
		}
		else {
			console.oldLog(e);
		}
	}
}
if(!isInLayout){
attachEventListener(window.parent, "message", function(e){
            if(typeof e.data != "string"){
                return;
            }
			var s = e.data.split(':', 10), cb = "",res = "";

			if(typeof(jvx_callbacks[s[1]]) != "undefined"){
				cb = jvx_callbacks[s[1]].shift();
				if(s[1] == 'getCreativeSize')res = [s[2], s[3]];
				if(s[1] == 'getCreativePosition')res = [s[2], s[3]];
			}
			else if(typeof(jvx_callbacks[s[3]]) != "undefined"){

				cb = jvx_callbacks[s[3]].shift();
				res = "resizeComplete";
			}
			if(typeof(cb) == "function") cb(res);

		}, false);
}

if(isDynamic && parentAccess && !isInLayout){
	(function(){
		// make dynamicData available to widget in JSON format
		var dyn_data = (window.parent && window.parent.dynamicJSONData) ? window.parent.dynamicJSONData : "";
		if(dyn_data && dyn_data['data']){
			dynamicData = dyn_data['data'];
		}
	})();
}

attachEventListener(window,"load",function(){
	if(!isInLayout){
		(function creatEventHandler(){
			var ele = document.createElement("div");
			ele.id = "jvx_eventHandler";
			ele.style.position = "absolute";
			ele.style.top = "-1000px";
			ele.style.left = "-1000px";
			document.body.appendChild(ele);
		})();
	}
	
	if((isStandardInline || isExtAsInline) && isDynamic){
		jvx_raiseDYEvent(dynamicData);
	}
	try{ 
		if((!isDynamic || !isExternalWg) && !isInLayout){
			if(typeof initiate != "undefined"){
				initiate();
			}
		}
	} catch(e){ 
		if(typeof console.oldLog == "undefined") { 
			console.log(e);
		}
		else {
			console.oldLog(e);
		}
	}
},false);
