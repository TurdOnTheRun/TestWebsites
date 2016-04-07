try{window.parent._dv_win['dvCallback_1458845616514794']($dv,window,'4b33ca76e2c0442e87a5f871777f8da4','tps10223.doubleverify.com');}catch(e){try{var image=window.document.createElement('img');image.src=window.location.protocol+'//tps30.doubleverify.com/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_cbError='+encodeURIComponent(e.message)}catch(e){}}$dv.pubSub.subscribe('ImpressionServed', $uid, 'RTN_LatencyTemp', function () {try {var beforeVisitCall = '';var templateStartTime = parent.getCurrentTime();var dv_win = parent.window._dv_win;if (dv_win && dv_win.t2tTimestampData) {if (dv_win.t2tTimestampData.length >= 2) {beforeVisitCall = dv_win.t2tTimestampData[1].beforeVisitCall;}}var latency = 0;if (beforeVisitCall != '' && templateStartTime != '') {latency = templateStartTime - beforeVisitCall;}if(latency > 1000 && latency < 90000) {$dv.registerEventCall($uid, { dvp_ltncy: latency });}} catch (e) {};});$dv.tags[$uid].set({is_projected_viewability: 0, projected_view_rate: '', projected_error_rate: ''});$dv.CommonData.deviceType = 1;function IVCallback(ViewAssureBootstrapper) {if(ViewAssureBootstrapper && typeof(ViewAssureBootstrapper)==='function'){ViewAssureBootstrapper({"protocol":"http://","serverSettings":{"protocol":"http://","templateVersion":"9","TKH":"-2701140247403250148"}});}else{new dv_InViewService({"protocol":"http://"}).inViewManager();}};if(Math.random()*100 < 50) {document.write('<scr' + 'ipt src="http://cdn.doubleverify.com/avs583.js" type="text/javascript"></scr' + 'ipt>');} else {document.write('<scr' + 'ipt src="http://cdn.doubleverify.com/avs584.js" type="text/javascript"></scr' + 'ipt>');}$dv.pubSub.subscribe ('ImpressionServed', $uid, 'SendAdEntitiesForMA', function() {var tag = $dv.tags[$uid];var targetWin = tag.t2tIframeWindow;if(!targetWin){var t2tIframeId = tag.t2tIframeId;if(t2tIframeId){var iFrame = window.parent.getElementById(t2tIframeId);if(iFrame){targetWin = iFrame.contentWindow;}}}if(targetWin){var dateNow = 0;if(Date.now){dateNow = Date.now();} else {dateNow = +new Date();}var message = {action : 'notifyMultipleAdsAdEntityInformationReady',adEntityInformation : {comparisonItems : [{name : 'cmp', value : 3314211, bitFlag : 1, maxTimeMS : 5000, eventToFire : 'CampaignMultipleAd'},{name : 'clcd', value : 2692358, bitFlag : 2, maxTimeMS : 5000},{name : 'plmt', value : 3314402, bitFlag : 4, maxTimeMS : 5000},{name : 'mp', value : 3824, bitFlag : 8, maxTimeMS : 5000},{name : 'adv', value : 1826073, bitFlag : 16, maxTimeMS : 5000, eventToFire : 'LobMultipleAd'},{name : 'cmpMP', value : 994263326768, bitFlag : 32, maxTimeMS : 5000}],dvTagCreatedTS : tag.t2tIframeCreationTime,visitJSPostMessageTS : dateNow}};var stringifyFunc = null;if(window.JSON){stringifyFunc = window.JSON.stringify;} else {if(window.parent && window.parent.JSON){stringifyFunc = window.parent.JSON.stringify;}}if(!stringifyFunc){return;}var msgString = stringifyFunc(message);targetWin.postMessage(msgString, '*');setTimeout(function(){targetWin.postMessage(msgString, '*');}, 100);setTimeout(function(){targetWin.postMessage(msgString, '*');}, 500);}});$dv.pubSub.subscribe('ImpressionServed', $uid, 'RTN_FBITemp', function () {try {	window.isFirstCall = true;	window.EtVal = '';	window.EtnVal = '';	window.EtRandVal = '';		window.AddEtCall = function (id) {		var queryUrl = $dv.tags[$uid].dv_protocol + '/' + '/tps30.doubleverify.com/query.js?ctx=818052&cmp=1239517532';		var scriptElem = document.createElement('script');		scriptElem.id = id;		scriptElem.type = 'text/javascript';		scriptElem.src = queryUrl;		document.body.insertBefore(scriptElem, document.body.firstChild);	};		window.eCallback = function(et, isEtNew, etRand) {			if (window.isFirstCall) {				window.EtVal = et;				window.EtnVal = isEtNew;				window.EtRandVal = etRand;				window.isFirstCall = false;				setTimeout(function() {window.AddEtCall('dvet2');}, 10);				return;			}			if(etRand != undefined && etRand === window.EtRandVal) {				setTimeout(function() {window.AddEtCall('dvet' + etRand);}, 10);				return;			}			var isEtTwice = et == window.EtVal;			$dv.registerEventCall($uid, { 'dvp_et':window.EtVal, 'dvp_etn':window.EtnVal, 'dvp_ett':(isEtTwice ? '1' : '0')});	};		window.AddEtCall('dvet1');	} catch (e) {};});    	$dv.pubSub.subscribe ('ImpressionServed', $uid, 'SendAdEntitiesForBSBAConsolidation', function() {
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
                    comparisonItems : [{name : 'cmp', value : 3314211},{name : 'plmt', value : 3314402}], verboseReporting : false  }
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
        });var impId = '4b33ca76e2c0442e87a5f871777f8da4';var dvObj = $dv;var rtnName = dvObj==window.$dv ? 'ImpressionServed' : 'BeforeDecisionRender';dvObj.pubSub.subscribe(rtnName, impId, 'HE_RTN', function () { try {var ifu = '';var alu = 'http://ad.doubleclick.net/ddm/clk/291583327;106680815;k';var lbl='';var e=null,f=dvObj==window.$dv,h=f?parent:window,i=dvObj.tags[impId].protocol+"//"+(dvObj.tags[impId].ServerPublicDns||dvObj.tags[impId].serverPublicDns)+"/"+(f?"event":"bsevent")+".gif?impid="+impId,j=0,k=[];function l(a,c){function b(g){g.preventDefault();if(!q[c]&&(rhe(c),q[c]=!0,a))for(g=0;g<d.length;g++)a.removeEventListener?a.removeEventListener(d[g],b):a.detachEvent?a.detachEvent("on"+d[g],b):a["on"+d[g]]=void 0}var d="click input change focus keyup textInput keypress paste".split(" "),q=[];q[c]=!1;if(a)for(var m=0;m<d.length;m++)a.addEventListener?a.addEventListener(d[m],b,!0):a.attachEvent?a.attachEvent("on"+d[m],b):a["on"+d[m]]=b}window.rhe=function(a){var c="";"number"===typeof a&&void 0==k[a]&&(k[a]=!0,j+=a,c="&"+lbl+"heas="+j);dvObj.domUtilities.addImage(i+"&"+lbl+"hea=1"+c,dvObj.tags[impId].tagElement.parentNode)};h.rhe=rhe;function n(a,c){var b=document.createElement(a);b.id=(c||a)+"-"+impId;b.style.visibility="hidden";b.style.position="absolute";b.style.display="none";return b}function o(a){var c=p;Object.defineProperty(c,a,{get:function(){return this.getAttribute(a)},set:function(b){this.setAttribute(a,b);"createEvent"in document?(b=document.createEvent("HTMLEvents"),b.initEvent("change",!1,!0),c.dispatchEvent(b)):(b=document.createEventObject(),c.fireEvent("onchange",b))}})}var r=n("form");r.submit=function(){window.rhe(1)};var p=n("input","txt");p.name=p.id;p.type="text";o("value");o("textContent");var s=n("input","btn");s.name=s.id;s.type="button";var t=n("input","sbmt");t.name=t.id;t.type="submit";t.click=function(){window.rhe(2)};var u=n("a");u.href="javascript:window.rhe(16);";if(""!=alu){var v=n("a");v.href=alu}h.document.body.insertBefore(r,e);h.document.body.insertBefore(u,e);r.insertBefore(p,e);r.insertBefore(s,e);r.insertBefore(t,e);l(p,8);l(s,4);l(t,2);l(r,1);""!=alu&&(v=n("a","alu"),v.href=alu,h.document.body.insertBefore(v,e),l(v,32));if(""!=ifu){var w=n("iframe");w.src=ifu;h.document.body.insertBefore(w,e);l(w,64)};} catch (e) {}; });(function () {                                                                               
                                        var tag = $dv.tags[$uid];
                                        var allowedRetries = 13;
                                        var retries = 0;
                                        var vaVersion = 546;                                        
                                        
                                        function isNumeric(n) {
                                          return !isNaN(parseFloat(n)) && isFinite(n);
                                        }

                                        function loadAvs() {                    
                                            function isAvsScriptLoaded() {
                                                var scripts = document.getElementsByTagName("script");
                                                for (var i = 0; i < scripts.length; i++) {
                                                    var script = scripts[i];
                                                    if (script.src.indexOf('cdn.doubleverify.com/avs') > -1) {
                                                        return true;
                                                    }
                                                    return false;
                                                }
                                            };
                                            if (typeof window.IVCallback === "undefined" && !isAvsScriptLoaded()) {
                                                window.IVCallback = function (ViewAssureBootstrapper) {
                                                    if (ViewAssureBootstrapper && typeof (ViewAssureBootstrapper) === 'function') {
                                                        ViewAssureBootstrapper({
                                                            'videoEnable': true,
                                                            'detectVideoPlayer': true,                                                            
                                                            'isRTNsDisabled':true
                                                        });
                                                    }
                                                };
                                                document.write('<scr' + 'ipt type="text/javascript" src="' + $dv.tags[$uid].dv_protocol + '//cdn.doubleverify.com/avs' + vaVersion + '.js"></script>');
                                            }
                                        };

                                        loadAvs();

                                        (function () {
                                            var currentInterval = setInterval(function () {
                                                if (retries < allowedRetries) {
                                                    retries++;
                                                    if (tag.VA && tag.VA.getVisibilityResult && typeof tag.VA.getVisibilityResult == 'function') {                                                                                            
                                                    var results = tag.VA.getVisibilityResult();                                                       
                                                    if (results.adWidth && results.adHeight && isNumeric(results.adWidth) && isNumeric(results.adHeight)) {
                                                        $dv.registerEventCall($uid, {
                                                            'dvp_spw': results.adWidth,
                                                            'dvp_sxh': results.adHeight
                                                        });
                                                    clearInterval(currentInterval);
                                                    };                                                       
                                                    }
                                                } else {
                                                    clearInterval(currentInterval);
                                                    if($dv)
                                                    {
                                                        $dv.registerEventCall($uid, {'dvp_spxn': 1});
                                                    }
                                                }
                                            }, 500);
                                        })();
                                    })();$dv.tags[$uid].set({"billable":{adArea: 100, duration: 100}});try{$dv.pubSub.publish('ImpressionServed', $uid);}catch(e){}