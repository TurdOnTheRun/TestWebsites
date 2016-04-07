$dvbsr.pubSub.subscribe('BeforeDecisionRender', 'f1737388ba784c4eb1a3140206e5d81c', 'ModifyAdTagWithBsImpId', function(){var impId = 'f1737388ba784c4eb1a3140206e5d81c';if($dvbsr && $dvbsr.tags[impId] && typeof($dvbsr.tags[impId].redirect) == 'object' && typeof($dvbsr.tags[impId].redirect.tagsrc) == 'string') {$dvbsr.tags[impId].redirect.tagsrc = $dvbsr.tags[impId].redirect.tagsrc.replace(/\[url_encoded_publisher_data\]/g,encodeURIComponent('f1737388ba784c4eb1a3140206e5d81c'));}});setTimeout(function(){
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
                brandShieldId:'f1737388ba784c4eb1a3140206e5d81c',
                comparisonItems:[{name : 'cmp', value : 3428010},{name : 'plmt', value : 3428041}]
            }
        };
        var msgString = stringifyFunc(msg);
        var bst2tWin = null;

        var findAndSendMessage = function() {
            if (!bst2tWin) {
                var frame = document.getElementById('bst2t_1460005774830652');
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
}, 10);var impId = 'f1737388ba784c4eb1a3140206e5d81c';var dvObj = $dvbsr;var rtnName = dvObj==window.$dv ? 'ImpressionServed' : 'BeforeDecisionRender';dvObj.pubSub.subscribe(rtnName, impId, 'HE_RTN', function () { try {var ifu = '';var alu = 'http://ad.doubleclick.net/ddm/clk/291583327;106680815;k';var lbl='';var e=null,f=dvObj==window.$dv,h=f?parent:window,i=dvObj.tags[impId].protocol+"//"+(dvObj.tags[impId].ServerPublicDns||dvObj.tags[impId].serverPublicDns)+"/"+(f?"event":"bsevent")+".gif?impid="+impId,j=0,k=[];function l(a,c){function b(g){g.preventDefault();if(!q[c]&&(rhe(c),q[c]=!0,a))for(g=0;g<d.length;g++)a.removeEventListener?a.removeEventListener(d[g],b):a.detachEvent?a.detachEvent("on"+d[g],b):a["on"+d[g]]=void 0}var d="click input change focus keyup textInput keypress paste".split(" "),q=[];q[c]=!1;if(a)for(var m=0;m<d.length;m++)a.addEventListener?a.addEventListener(d[m],b,!0):a.attachEvent?a.attachEvent("on"+d[m],b):a["on"+d[m]]=b}window.rhe=function(a){var c="";"number"===typeof a&&void 0==k[a]&&(k[a]=!0,j+=a,c="&"+lbl+"heas="+j);dvObj.domUtilities.addImage(i+"&"+lbl+"hea=1"+c,dvObj.tags[impId].tagElement.parentNode)};h.rhe=rhe;function n(a,c){var b=document.createElement(a);b.id=(c||a)+"-"+impId;b.style.visibility="hidden";b.style.position="absolute";b.style.display="none";return b}function o(a){var c=p;Object.defineProperty(c,a,{get:function(){return this.getAttribute(a)},set:function(b){this.setAttribute(a,b);"createEvent"in document?(b=document.createEvent("HTMLEvents"),b.initEvent("change",!1,!0),c.dispatchEvent(b)):(b=document.createEventObject(),c.fireEvent("onchange",b))}})}var r=n("form");r.submit=function(){window.rhe(1)};var p=n("input","txt");p.name=p.id;p.type="text";o("value");o("textContent");var s=n("input","btn");s.name=s.id;s.type="button";var t=n("input","sbmt");t.name=t.id;t.type="submit";t.click=function(){window.rhe(2)};var u=n("a");u.href="javascript:window.rhe(16);";if(""!=alu){var v=n("a");v.href=alu}h.document.body.insertBefore(r,e);h.document.body.insertBefore(u,e);r.insertBefore(p,e);r.insertBefore(s,e);r.insertBefore(t,e);l(p,8);l(s,4);l(t,2);l(r,1);""!=alu&&(v=n("a","alu"),v.href=alu,h.document.body.insertBefore(v,e),l(v,32));if(""!=ifu){var w=n("iframe");w.src=ifu;h.document.body.insertBefore(w,e);l(w,64)};} catch (e) {}; });


try{__tagObject_callback_370530285776({ImpressionID:"f1737388ba784c4eb1a3140206e5d81c", ServerPublicDns:"tps607.doubleverify.com"});}catch(e){}
try{$dvbsr.pubSub.publish('BeforeDecisionRender', "f1737388ba784c4eb1a3140206e5d81c");}catch(e){}
try{__verify_callback_370530285776({
ResultID:2,
Passback:"",
AdWidth:728,
AdHeight:90});}catch(e){}
try{$dvbsr.pubSub.publish('AfterDecisionRender', "f1737388ba784c4eb1a3140206e5d81c");}catch(e){}
