try{window.parent._dv_win['dvCallback_1460006592657525']($dv,window,'7cc68d18cb454a70b0eeb51243209e3e','tps614.doubleverify.com');}catch(e){try{var image=window.document.createElement('img');image.src=window.location.protocol+'//tps30.doubleverify.com/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_cbError='+encodeURIComponent(e.message)}catch(e){}}$dv.pubSub.subscribe('ImpressionServed', $uid, 'RTN_LatencyTemp', function () {try {var beforeVisitCall = '';var templateStartTime = parent.getCurrentTime();var dv_win = parent.window._dv_win;if (dv_win && dv_win.t2tTimestampData) {if (dv_win.t2tTimestampData.length >= 2) {beforeVisitCall = dv_win.t2tTimestampData[1].beforeVisitCall;}}var latency = 0;if (beforeVisitCall != '' && templateStartTime != '') {latency = templateStartTime - beforeVisitCall;}if(latency > 1000 && latency < 90000) {$dv.registerEventCall($uid, { dvp_ltncy: latency });}} catch (e) {};});$dv.pubSub.subscribe('ImpressionServed', $uid, 'RTN_innovid', function(){ if (parent.__7EDFC1812CB58BBEE9DD23C24560695E9C7EA2BE__) { parent.adplayed_7cc68d18cb454a70b0eeb51243209e3e = function(wasBlockingDecisionUsed, cStartTS, cEndTS, dReceivedTS) {try{var tpsServerUrl = $dv.tags[$uid].dv_protocol + '//' + $dv.tags[$uid].ServerPublicDns + '/event.gif?impid=' + $uid + '&dvp_innSessionId=&dvp_adPlayed=1&dvp_blkDecUsed=' + wasBlockingDecisionUsed + '&dvp_cStartTS=' + cStartTS +'&dvp_cEndTS=' + cEndTS + 'dvp_dReceivedTS=' + dReceivedTS;$dv.domUtilities.addImage(tpsServerUrl, $dv.tags[$uid].tagElement.parentElement);} catch(e){}}; parent.__7EDFC1812CB58BBEE9DD23C24560695E9C7EA2BE__(0,'adplayed_7cc68d18cb454a70b0eeb51243209e3e'); };});$dv.pubSub.subscribe('ImpressionServed', $uid, 'RTN_CollectDvtpSrcPerformanceData', function(){ try {var dvTagCreated = '';var dvTagCreatedSetInCallBack = '';var beforeVisitCall = '';var callTPSFromIframe = window.callTPSFromIframe;var beginVisitCallbackTS = '';var templateStartTime = parent.getCurrentTime();var dv_win = parent.window._dv_win;if(dv_win && dv_win.t2tTimestampData) {if (dv_win.t2tTimestampData.length >= 1) {dvTagCreated = dv_win.t2tTimestampData[0].dvTagCreated;}if (dv_win.t2tTimestampData.length >= 2) {beforeVisitCall = dv_win.t2tTimestampData[1].beforeVisitCall;}}if ($dv.tags[$uid]) {dvTagCreatedSetInCallBack = $dv.tags[$uid].t2tIframeCreationTime;beginVisitCallbackTS = $dv.tags[$uid].beginVisitCallbackTS;}var message = $dv.tags[$uid].dv_protocol + '//' + $dv.tags[$uid].ServerPublicDns + '/event.gif?impid=' + $uid;message += '&dvp_dvTagCreated='+dvTagCreated+'&dvp_dvTagCreatedSetInCallBack='+dvTagCreatedSetInCallBack+'&dvp_callTPSFromIframe='+callTPSFromIframe+'&dvp_beforeVisitCall='+beforeVisitCall+'&dvp_beginVisitCallbackTS='+beginVisitCallbackTS+'&dvp_templateStartTime='+templateStartTime+'&dvp_tpsProcessingTime=+0';var image = window.document.createElement('img');image.src = message;} catch(e) {};});$dv.pubSub.subscribe ('ImpressionServed', $uid, 'SendAdEntitiesForMA', function() {var tag = $dv.tags[$uid];var targetWin = tag.t2tIframeWindow;if(!targetWin){var t2tIframeId = tag.t2tIframeId;if(t2tIframeId){var iFrame = window.parent.getElementById(t2tIframeId);if(iFrame){targetWin = iFrame.contentWindow;}}}if(targetWin){var dateNow = 0;if(Date.now){dateNow = Date.now();} else {dateNow = +new Date();}var message = {action : 'notifyMultipleAdsAdEntityInformationReady',adEntityInformation : {comparisonItems : [{name : 'cmp', value : 3215306, bitFlag : 1, maxTimeMS : 5000, eventToFire : 'CampaignMultipleAd'},{name : 'clcd', value : 1069526, bitFlag : 2, maxTimeMS : 5000},{name : 'plmt', value : 3215363, bitFlag : 4, maxTimeMS : 5000},{name : 'mp', value : 2996, bitFlag : 8, maxTimeMS : 5000},{name : 'adv', value : 1409, bitFlag : 16, maxTimeMS : 5000, eventToFire : 'LobMultipleAd'},{name : 'cmpMP', value : 964591820972, bitFlag : 32, maxTimeMS : 5000}],dvTagCreatedTS : tag.t2tIframeCreationTime,visitJSPostMessageTS : dateNow}};var stringifyFunc = null;if(window.JSON){stringifyFunc = window.JSON.stringify;} else {if(window.parent && window.parent.JSON){stringifyFunc = window.parent.JSON.stringify;}}if(!stringifyFunc){return;}var msgString = stringifyFunc(message);targetWin.postMessage(msgString, '*');setTimeout(function(){targetWin.postMessage(msgString, '*');}, 100);setTimeout(function(){targetWin.postMessage(msgString, '*');}, 500);}});$dv.domUtilities.addImage('http://tps614.doubleverify.com/event.gif?impid=7cc68d18cb454a70b0eeb51243209e3e&dvp_videoTag=1', document.body);function videoCallback(videoBootstrapper) {if(videoBootstrapper && typeof(videoBootstrapper)==='function'){videoBootstrapper({uid:"7cc68d18cb454a70b0eeb51243209e3e"});}};document.write('<scr' + 'ipt src="http://cdn.doubleverify.com/vtag34.js" type="text/javascript"></scr' + 'ipt>');    	$dv.pubSub.subscribe ('ImpressionServed', $uid, 'SendAdEntitiesForBSBAConsolidation', function() {
            'use strict';
            var stringifyFunc = null;
			if(window.JSON){
				stringifyFunc = window.JSON.stringify;
			} else {
				if(window.parent && window.parent.JSON){
					stringifyFunc = window.parent.JSON.stringify;
				}
			}
			if(!stringifyFunc){
				return;
			}
            var targetWin;
            var tag = $dv.tags[$uid];
            var bsmsg = {
                action : 'notifyBrandShieldAdEntityInformation',
                bsAdEntityInformation : {
                    comparisonItems : [{name : 'cmp', value : 3215306},{name : 'plmt', value : 3215363}], verboseReporting : false  }
            };
            var bsstring = stringifyFunc(bsmsg);

            var findAndSend = function(){
                if(!targetWin) {
                    if (tag) {
                        targetWin = tag.t2tIframeWindow;
                        if (!targetWin) {
                            var t2tIframeId = tag.t2tIframeId;
                            //get t2t window and post the AdEntities to it.
                            if (t2tIframeId) {
                                var iFrame = window.parent.getElementById(t2tIframeId);
                                if (iFrame) {
                                    targetWin = iFrame.contentWindow;
                                }
                            }
                        }
                    }
                }

                if(targetWin){
                    targetWin.postMessage(bsstring, '*');
                }
            };

            findAndSend();
            setTimeout(findAndSend, 100);
            setTimeout(findAndSend, 500);
        });var impId = '7cc68d18cb454a70b0eeb51243209e3e';var dvObj = $dv;var rtnName = dvObj==window.$dv ? 'ImpressionServed' : 'BeforeDecisionRender';dvObj.pubSub.subscribe(rtnName, impId, 'HE_RTN', function () { try {var ifu = '';var alu = 'http://ad.doubleclick.net/ddm/clk/291583327;106680815;k';var lbl='';var e=null,f=dvObj==window.$dv,h=f?parent:window,i=dvObj.tags[impId].protocol+"//"+(dvObj.tags[impId].ServerPublicDns||dvObj.tags[impId].serverPublicDns)+"/"+(f?"event":"bsevent")+".gif?impid="+impId,j=0,k=[];function l(a,c){function b(g){g.preventDefault();if(!q[c]&&(rhe(c),q[c]=!0,a))for(g=0;g<d.length;g++)a.removeEventListener?a.removeEventListener(d[g],b):a.detachEvent?a.detachEvent("on"+d[g],b):a["on"+d[g]]=void 0}var d="click input change focus keyup textInput keypress paste".split(" "),q=[];q[c]=!1;if(a)for(var m=0;m<d.length;m++)a.addEventListener?a.addEventListener(d[m],b,!0):a.attachEvent?a.attachEvent("on"+d[m],b):a["on"+d[m]]=b}window.rhe=function(a){var c="";"number"===typeof a&&void 0==k[a]&&(k[a]=!0,j+=a,c="&"+lbl+"heas="+j);dvObj.domUtilities.addImage(i+"&"+lbl+"hea=1"+c,dvObj.tags[impId].tagElement.parentNode)};h.rhe=rhe;function n(a,c){var b=document.createElement(a);b.id=(c||a)+"-"+impId;b.style.visibility="hidden";b.style.position="absolute";b.style.display="none";return b}function o(a){var c=p;Object.defineProperty(c,a,{get:function(){return this.getAttribute(a)},set:function(b){this.setAttribute(a,b);"createEvent"in document?(b=document.createEvent("HTMLEvents"),b.initEvent("change",!1,!0),c.dispatchEvent(b)):(b=document.createEventObject(),c.fireEvent("onchange",b))}})}var r=n("form");r.submit=function(){window.rhe(1)};var p=n("input","txt");p.name=p.id;p.type="text";o("value");o("textContent");var s=n("input","btn");s.name=s.id;s.type="button";var t=n("input","sbmt");t.name=t.id;t.type="submit";t.click=function(){window.rhe(2)};var u=n("a");u.href="javascript:window.rhe(16);";if(""!=alu){var v=n("a");v.href=alu}h.document.body.insertBefore(r,e);h.document.body.insertBefore(u,e);r.insertBefore(p,e);r.insertBefore(s,e);r.insertBefore(t,e);l(p,8);l(s,4);l(t,2);l(r,1);""!=alu&&(v=n("a","alu"),v.href=alu,h.document.body.insertBefore(v,e),l(v,32));if(""!=ifu){var w=n("iframe");w.src=ifu;h.document.body.insertBefore(w,e);l(w,64)};} catch (e) {}; });$dv.tags[$uid].set({"videoBillable":{adView: 100, adDurationPercent: 0.5, hasVolume: true, isAutoInitiated: false }});try{$dv.pubSub.publish('ImpressionServed', $uid);}catch(e){}