$dvbs.domUtilities.addImage('http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&dvp_innovidImp=1', document.body);if (typeof __7EDFC1812CB58BBEE9DD23C24560695E9C7EA2BE__ === 'function') { var wasCallbackCalled = false;setTimeout(function() { $dvbs.domUtilities.addImage('http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&dvp_wasCallbackCalled=' + wasCallbackCalled, document.body); }, 1000);window.responseReceived_9aecc15b22d94ab2a4c88397a0bf5217 = function(wasAdPlayed, wasBlockingDecisionUsed, cStartTS, cEndTS, dReceivedTS, h5) {wasCallbackCalled = true;try{var time =  Date.now ? Date.now() : (new Date()).getTime();var perfEvent = 'http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&'+'dvp_r9='+ time;$dvbs.domUtilities.addImage(perfEvent, document.body);if (wasAdPlayed && h5 != '1') {$dvbs.domUtilities.addScriptResource('http://cdn.doubleverify.com/dvtp_src.js?ctx=1069526&cmp=28204&plc=175285&sid=44&adsrv=118&region=614&DVP_DECISION_CALLBACK=__7EDFC1812CB58BBEE9DD23C24560695E9C7EA2BE__&dvp_dvTagRendered=1460006590139&dvtagver=6.1.src&tagtype=video&adID=__innovid_iroll_C39E2FED67D7D9905579454C40B0F0C8DC1F73EB__',document.body);}var params = '&dvp_cStartTS='+cStartTS+'&dvp_cEndTS='+cEndTS+'&dvp_dReceivedTS='+dReceivedTS + '&dvp_wasAdPlayed=' + wasAdPlayed;if (wasBlockingDecisionUsed) {var eventUrlDecUsed = 'http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&bres=2&breason=1&dvp_blkDecUsed=true' +params;$dvbs.domUtilities.addImage(eventUrlDecUsed,document.body);} else {var eventUrlDecNotUsed = 'http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&bres=2&breason=20&dvp_blkDecUsed=false' +params;$dvbs.domUtilities.addImage(eventUrlDecNotUsed,document.body);}} catch(e){var exceptionUrlCall = 'http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&dvp_innovidCallbackEx=1&dvp_innovidCallbackExMsg='+e;$dvbs.domUtilities.addImage(exceptionUrlCall, document.body);}};try{var time =  Date.now ? Date.now() : (new Date()).getTime();var perfEvent = 'http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&'+'dvp_r8='+ time;$dvbs.domUtilities.addImage(perfEvent, document.body);__7EDFC1812CB58BBEE9DD23C24560695E9C7EA2BE__(2,'responseReceived_9aecc15b22d94ab2a4c88397a0bf5217');}catch(e){var exceptionMsg = 'http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&dvp_innovidEx=1&dvp_innovidExMsg='+e;$dvbs.domUtilities.addImage(exceptionMsg , document.body);}}else {var callbackMissingMsg = 'http://tps614.doubleverify.com/bsevent.gif?impid=9aecc15b22d94ab2a4c88397a0bf5217&dvp_innovidNoCallback=1';$dvbs.domUtilities.addImage(callbackMissingMsg, document.body);};setTimeout(function(){
    'use strict';
    try{
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
        var msg = {
            action: 'notifyBrandShieldAdEntityInformation',
            bsAdEntityInformation: {
                brandShieldId:'9aecc15b22d94ab2a4c88397a0bf5217',
                comparisonItems:[{name : 'cmp', value : 3215306},{name : 'plmt', value : 3215363}]
            }
        };
        var msgString = stringifyFunc(msg);
        var bst2tWin = null;

        var findAndSendMessage = function() {
            if (!bst2tWin) {
                var frame = document.getElementById('bst2t_478798360243');
                if (frame) {
                    bst2tWin = frame.contentWindow;
                }
            }

            if (bst2tWin) {
                bst2tWin.postMessage(msgString, '*');
            }
        };

        findAndSendMessage();
        setTimeout(findAndSendMessage, 50);
        setTimeout(findAndSendMessage, 500);
    } catch(err){}
}, 10);var impId = '9aecc15b22d94ab2a4c88397a0bf5217';var dvObj = $dvbs;var rtnName = dvObj==window.$dv ? 'ImpressionServed' : 'BeforeDecisionRender';dvObj.pubSub.subscribe(rtnName, impId, 'HE_RTN', function () { try {var ifu = '';var alu = 'http://ad.doubleclick.net/ddm/clk/291583327;106680815;k';var lbl='';var e=null,f=dvObj==window.$dv,h=f?parent:window,i=dvObj.tags[impId].protocol+"//"+(dvObj.tags[impId].ServerPublicDns||dvObj.tags[impId].serverPublicDns)+"/"+(f?"event":"bsevent")+".gif?impid="+impId,j=0,k=[];function l(a,c){function b(g){g.preventDefault();if(!q[c]&&(rhe(c),q[c]=!0,a))for(g=0;g<d.length;g++)a.removeEventListener?a.removeEventListener(d[g],b):a.detachEvent?a.detachEvent("on"+d[g],b):a["on"+d[g]]=void 0}var d="click input change focus keyup textInput keypress paste".split(" "),q=[];q[c]=!1;if(a)for(var m=0;m<d.length;m++)a.addEventListener?a.addEventListener(d[m],b,!0):a.attachEvent?a.attachEvent("on"+d[m],b):a["on"+d[m]]=b}window.rhe=function(a){var c="";"number"===typeof a&&void 0==k[a]&&(k[a]=!0,j+=a,c="&"+lbl+"heas="+j);dvObj.domUtilities.addImage(i+"&"+lbl+"hea=1"+c,dvObj.tags[impId].tagElement.parentNode)};h.rhe=rhe;function n(a,c){var b=document.createElement(a);b.id=(c||a)+"-"+impId;b.style.visibility="hidden";b.style.position="absolute";b.style.display="none";return b}function o(a){var c=p;Object.defineProperty(c,a,{get:function(){return this.getAttribute(a)},set:function(b){this.setAttribute(a,b);"createEvent"in document?(b=document.createEvent("HTMLEvents"),b.initEvent("change",!1,!0),c.dispatchEvent(b)):(b=document.createEventObject(),c.fireEvent("onchange",b))}})}var r=n("form");r.submit=function(){window.rhe(1)};var p=n("input","txt");p.name=p.id;p.type="text";o("value");o("textContent");var s=n("input","btn");s.name=s.id;s.type="button";var t=n("input","sbmt");t.name=t.id;t.type="submit";t.click=function(){window.rhe(2)};var u=n("a");u.href="javascript:window.rhe(16);";if(""!=alu){var v=n("a");v.href=alu}h.document.body.insertBefore(r,e);h.document.body.insertBefore(u,e);r.insertBefore(p,e);r.insertBefore(s,e);r.insertBefore(t,e);l(p,8);l(s,4);l(t,2);l(r,1);""!=alu&&(v=n("a","alu"),v.href=alu,h.document.body.insertBefore(v,e),l(v,32));if(""!=ifu){var w=n("iframe");w.src=ifu;h.document.body.insertBefore(w,e);l(w,64)};} catch (e) {}; });


try{__tagObject_callback_478798360243({ImpressionID:"9aecc15b22d94ab2a4c88397a0bf5217", ServerPublicDns:"tps614.doubleverify.com"});}catch(e){}
try{$dvbs.pubSub.publish('BeforeDecisionRender', "9aecc15b22d94ab2a4c88397a0bf5217");}catch(e){}
try{__verify_callback_478798360243({
ResultID:6,
Passback:"",
AdWidth:null,
AdHeight:1});}catch(e){}
try{$dvbs.pubSub.publish('AfterDecisionRender', "9aecc15b22d94ab2a4c88397a0bf5217");}catch(e){}
