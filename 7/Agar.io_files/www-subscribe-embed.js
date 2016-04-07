(function(){var m,p=this;function q(a){a=a.split(".");for(var b=p,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}
function aa(){}
function ba(a){a.getInstance=function(){return a.da?a.da:a.da=new a}}
function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function da(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function r(a){return"string"==typeof a}
function ea(a){return"function"==ca(a)}
function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
var ia="closure_uid_"+(1E9*Math.random()>>>0),ka=0;function la(a,b,c){return a.call.apply(a.bind,arguments)}
function ma(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function t(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?la:ma;return t.apply(null,arguments)}
function na(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}
var oa=Date.now||function(){return+new Date};
function u(a,b){var c=a.split("."),d=p;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b}
function v(a,b){function c(){}
c.prototype=b.prototype;a.U=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}}
;var pa;var qa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function ra(a,b){return a<b?-1:a>b?1:0}
;var sa=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;
if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},w=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},ta=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=r(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];
b.call(c,k,h,a)&&(e[f++]=k)}return e},va=Array.prototype.some?function(a,b,c){return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;
return!1};
function wa(a,b){var c;a:{c=a.length;for(var d=r(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:r(a)?a.charAt(c):a[c]}
function xa(a,b){return 0<=sa(a,b)}
function ya(a){return Array.prototype.concat.apply(Array.prototype,arguments)}
function za(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Aa(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(da(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
function Ba(a,b,c,d){return Array.prototype.splice.apply(a,Ca(arguments,1))}
function Ca(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)}
;function Da(a){if(a.classList)return a.classList;a=a.className;return r(a)&&a.match(/\S+/g)||[]}
function Ea(a,b){return a.classList?a.classList.contains(b):xa(Da(a),b)}
function Fa(a,b){a.classList?a.classList.add(b):Ea(a,b)||(a.className+=0<a.className.length?" "+b:b)}
function Ga(a,b){a.classList?a.classList.remove(b):Ea(a,b)&&(a.className=ta(Da(a),function(a){return a!=b}).join(" "))}
function Ha(a,b,c){c?Fa(a,b):Ga(a,b)}
;function Ia(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function Ja(a){var b=Ka,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
var La="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ma(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<La.length;f++)c=La[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var Na;a:{var Oa=p.navigator;if(Oa){var Pa=Oa.userAgent;if(Pa){Na=Pa;break a}}Na=""}function x(a){return-1!=Na.indexOf(a)}
;function Qa(){this.j="";this.f=null}
function Ra(a,b){var c=new Qa;c.j=a;c.f=b;return c}
Ra("<!DOCTYPE html>",0);Ra("",0);Ra("<br>",0);function y(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
y.prototype.clone=function(){return new y(this.x,this.y)};
y.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
y.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
y.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function Sa(a,b){this.width=a;this.height=b}
m=Sa.prototype;m.clone=function(){return new Sa(this.width,this.height)};
m.isEmpty=function(){return!(this.width*this.height)};
m.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
m.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
m.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var Ta=x("Opera")||x("OPR"),z=x("Trident")||x("MSIE"),Ua=x("Edge"),Va=x("Gecko")&&!(-1!=Na.toLowerCase().indexOf("webkit")&&!x("Edge"))&&!(x("Trident")||x("MSIE"))&&!x("Edge"),Wa=-1!=Na.toLowerCase().indexOf("webkit")&&!x("Edge"),Xa=x("Windows");function Ya(){var a=p.document;return a?a.documentMode:void 0}
var Za;a:{var $a="",ab=function(){var a=Na;if(Va)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Ua)return/Edge\/([\d\.]+)/.exec(a);if(z)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Wa)return/WebKit\/(\S+)/.exec(a);if(Ta)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
ab&&($a=ab?ab[1]:"");if(z){var bb=Ya();if(null!=bb&&bb>parseFloat($a)){Za=String(bb);break a}}Za=$a}var cb=Za,db={};
function eb(a){var b;if(!(b=db[a])){b=0;for(var c=qa(String(cb)).split("."),d=qa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",k=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var n=k.exec(g)||["","",""],G=l.exec(h)||["","",""];if(0==n[0].length&&0==G[0].length)break;b=ra(0==n[1].length?0:parseInt(n[1],10),0==G[1].length?0:parseInt(G[1],10))||ra(0==n[2].length,0==G[2].length)||ra(n[2],G[2])}while(0==b)}b=db[a]=0<=b}return b}
var fb=p.document,gb=fb&&z?Ya()||("CSS1Compat"==fb.compatMode?parseInt(cb,10):5):void 0;!Va&&!z||z&&9<=Number(gb)||Va&&eb("1.9.1");var ib=z&&!eb("9");function kb(a){return a?new lb(nb(a)):pa||(pa=new lb)}
function A(a){var b=document;return r(a)?b.getElementById(a):a}
function ob(a){var b=document;return b.querySelectorAll&&b.querySelector?b.querySelectorAll("."+a):pb(a,void 0)}
function pb(a,b){var c,d,e,f;c=document;c=b||c;if(c.querySelectorAll&&c.querySelector&&a)return c.querySelectorAll(""+(a?"."+a:""));if(a&&c.getElementsByClassName){var g=c.getElementsByClassName(a);return g}g=c.getElementsByTagName("*");if(a){f={};for(d=e=0;c=g[d];d++){var h=c.className;"function"==typeof h.split&&xa(h.split(/\s+/),a)&&(f[e++]=c)}f.length=e;return f}return g}
function qb(a){return"CSS1Compat"==a.compatMode}
function nb(a){return 9==a.nodeType?a:a.ownerDocument||a.document}
function rb(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{for(var c;c=a.firstChild;)a.removeChild(c);c=nb(a);a.appendChild(c.createTextNode(String(b)))}}
var sb={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},tb={IMG:" ",BR:"\n"};function ub(a){if(ib&&null!==a&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];vb(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");ib||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a}
function vb(a,b,c){if(!(a.nodeName in sb))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in tb)b.push(tb[a.nodeName]);else for(a=a.firstChild;a;)vb(a,b,c),a=a.nextSibling}
function wb(a){var b=xb.qa;return b?yb(a,function(a){return!b||r(a.className)&&xa(a.className.split(/\s+/),b)},!0,void 0):null}
function yb(a,b,c,d){c||(a=a.parentNode);for(c=0;a&&(null==d||c<=d);){if(b(a))return a;a=a.parentNode;c++}return null}
function lb(a){this.f=a||p.document||document}
lb.prototype.createElement=function(a){return this.f.createElement(a)};
lb.prototype.isElement=function(a){return ha(a)&&1==a.nodeType};
lb.prototype.contains=function(a,b){if(!a||!b)return!1;if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||!!(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};function zb(a){p.setTimeout(function(){throw a;},0)}
var Ab;
function Bb(){var a=p.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!x("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=t(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!x("Trident")&&!x("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.aa;c.aa=null;a()}};
return function(a){d.next={aa:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){p.setTimeout(a,0)}}
;function Cb(a,b,c){this.o=c;this.l=a;this.v=b;this.j=0;this.f=null}
Cb.prototype.get=function(){var a;0<this.j?(this.j--,a=this.f,this.f=a.next,a.next=null):a=this.l();return a};function Db(){this.j=this.f=null}
var Fb=new Cb(function(){return new Eb},function(a){a.reset()},100);
Db.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.j=null),a.next=null);return a};
function Eb(){this.next=this.j=this.f=null}
Eb.prototype.set=function(a,b){this.f=a;this.j=b;this.next=null};
Eb.prototype.reset=function(){this.next=this.j=this.f=null};function Gb(a){Hb||Ib();Jb||(Hb(),Jb=!0);var b=Kb,c=Fb.get();c.set(a,void 0);b.j?b.j.next=c:b.f=c;b.j=c}
var Hb;function Ib(){if(p.Promise&&p.Promise.resolve){var a=p.Promise.resolve(void 0);Hb=function(){a.then(Lb)}}else Hb=function(){var a=Lb;
!ea(p.setImmediate)||p.Window&&p.Window.prototype&&!x("Edge")&&p.Window.prototype.setImmediate==p.setImmediate?(Ab||(Ab=Bb()),Ab(a)):p.setImmediate(a)}}
var Jb=!1,Kb=new Db;function Lb(){for(var a=null;a=Kb.remove();){try{a.f.call(a.j)}catch(c){zb(c)}var b=Fb;b.v(a);b.j<b.o&&(b.j++,a.next=b.f,b.f=a)}Jb=!1}
;function Mb(){this.j=this.j;this.l=this.l}
Mb.prototype.j=!1;Mb.prototype.isDisposed=function(){return this.j};
Mb.prototype.dispose=function(){this.j||(this.j=!0,this.S())};
Mb.prototype.S=function(){if(this.l)for(;this.l.length;)this.l.shift()()};function B(a){Mb.call(this);this.F=1;this.o=[];this.v=0;this.f=[];this.A={};this.V=!!a}
v(B,Mb);m=B.prototype;m.subscribe=function(a,b,c){var d=this.A[a];d||(d=this.A[a]=[]);var e=this.F;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.F=e+3;d.push(e);return e};
m.unsubscribe=function(a,b,c){if(a=this.A[a]){var d=this.f;if(a=wa(a,function(a){return d[a+1]==b&&d[a+2]==c}))return this.J(a)}return!1};
m.J=function(a){var b=this.f[a];if(b){var c=this.A[b];if(0!=this.v)this.o.push(a),this.f[a+1]=aa;else{if(c){var d=sa(c,a);0<=d&&Array.prototype.splice.call(c,d,1)}delete this.f[a];delete this.f[a+1];delete this.f[a+2]}}return!!b};
m.M=function(a,b){var c=this.A[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.V)for(e=0;e<c.length;e++){var g=c[e];Nb(this.f[g+1],this.f[g+2],d)}else{this.v++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.f[g+1].apply(this.f[g+2],d)}finally{if(this.v--,0<this.o.length&&0==this.v)for(;c=this.o.pop();)this.J(c)}}return 0!=e}return!1};
function Nb(a,b,c){Gb(function(){a.apply(b,c)})}
m.clear=function(a){if(a){var b=this.A[a];b&&(w(b,this.J,this),delete this.A[a])}else this.f.length=0,this.A={}};
function Ob(a,b){if(b){var c=a.A[b];return c?c.length:0}var c=0,d;for(d in a.A)c+=Ob(a,d);return c}
m.S=function(){B.U.S.call(this);this.clear();this.o.length=0};var Pb=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};u("yt.config_",Pb);u("yt.tokens_",window.yt&&window.yt.tokens_||{});var Qb=window.yt&&window.yt.msgs_||q("window.ytcfg.msgs")||{};u("yt.msgs_",Qb);function Rb(a){var b=arguments;if(1<b.length){var c=b[0];Pb[c]=b[1]}else for(c in b=b[0],b)Pb[c]=b[c]}
function C(a,b){return a in Pb?Pb[a]:b}
function Sb(a,b){ea(a)&&(a=Tb(a));return window.setTimeout(a,b)}
function Tb(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){throw Ub(b),b;}}:a}
function Ub(a){var b=q("yt.logging.errors.log");b?b(a,void 0,void 0,void 0):(b=C("ERRORS",[]),b.push([a,void 0,void 0,void 0]),Rb("ERRORS",b))}
;function Vb(a){var b=void 0;isNaN(b)&&(b=void 0);var c=q("yt.scheduler.instance.addJob");c?c(a,0,b):void 0===b?a():Sb(a,b||0)}
;function D(a,b){this.version=a;this.args=b}
function Wb(a){if(!a.ma){var b={};a.call(b);a.ma=b.version}return a.ma}
function Xb(a,b){function c(){a.apply(this,b.args)}
if(!b.args||!b.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");var d;try{d=Wb(a)}catch(e){}if(!d||b.version!=d)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");c.prototype=a.prototype;try{return new c}catch(e){throw e.message="yt.pubsub2.Data.deserialize(): "+e.message,e;}}
function E(a,b){this.f=a;this.K=b}
E.prototype.toString=function(){return this.f};var Yb=q("yt.pubsub2.instance_")||new B;B.prototype.subscribe=B.prototype.subscribe;B.prototype.unsubscribeByKey=B.prototype.J;B.prototype.publish=B.prototype.M;B.prototype.clear=B.prototype.clear;u("yt.pubsub2.instance_",Yb);var Zb=q("yt.pubsub2.subscribedKeys_")||{};u("yt.pubsub2.subscribedKeys_",Zb);var $b=q("yt.pubsub2.topicToKeys_")||{};u("yt.pubsub2.topicToKeys_",$b);var ac=q("yt.pubsub2.isAsync_")||{};u("yt.pubsub2.isAsync_",ac);u("yt.pubsub2.skipSubKey_",null);
function F(a,b){var c=bc();return c?c.publish.call(c,a.toString(),a,b):!1}
function cc(a,b,c){window.yt.pubsub2.skipSubKey_=a;F.call(null,b,c);window.yt.pubsub2.skipSubKey_=null}
function H(a,b,c){var d=bc();if(!d)return 0;var e=d.subscribe(a.toString(),function(d,g){if(!window.yt.pubsub2.skipSubKey_||window.yt.pubsub2.skipSubKey_!=e){var h=function(){if(Zb[e])try{if(g&&a instanceof E&&a!=d)try{g=Xb(a.K,g)}catch(h){throw h.message="yt.pubsub2 cross-binary conversion error for "+a.toString()+": "+h.message,h;}b.call(c||window,g)}catch(h){Ub(h)}};
ac[a.toString()]?q("yt.scheduler.instance")?Vb(h):Sb(h,0):h()}});
Zb[e]=!0;$b[a.toString()]||($b[a.toString()]=[]);$b[a.toString()].push(e);return e}
function dc(a){var b=bc();b&&("number"==typeof a&&(a=[a]),w(a,function(a){b.unsubscribeByKey(a);delete Zb[a]}))}
function bc(){return q("yt.pubsub2.instance_")}
;var I=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function ec(a){return a?decodeURI(a):a}
function gc(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=void 0)}return a.join("")}
function hc(a,b,c){if("array"==ca(b))for(var d=0;d<b.length;d++)hc(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}
function ic(a,b,c){for(c=c||0;c<b.length;c+=2)hc(b[c],b[c+1],a);return a}
function jc(a,b){for(var c in b)hc(c,b[c],a);return a}
function kc(a){a=jc([],a);a[0]="";return a.join("")}
function lc(a,b){return gc(2==arguments.length?ic([a],arguments[1],0):ic([a],arguments,1))}
;var mc={},nc=0,oc=q("yt.net.ping.workerUrl_")||null;u("yt.net.ping.workerUrl_",oc);function pc(a){var b=new Image,c=""+nc++;mc[c]=b;b.onload=b.onerror=function(){delete mc[c]};
b.src=a}
;function qc(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),e=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?"array"==ca(b[f])?Aa(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
function rc(a,b){var c=a.split("#",2);a=c[0];var c=1<c.length?"#"+c[1]:"",d=a.split("?",2);a=d[0];var d=qc(d[1]||""),e;for(e in b)d[e]=b[e];return gc(jc([a],d))+c}
;function sc(a){D.call(this,1,arguments);this.f=a}
v(sc,D);function J(a){D.call(this,1,arguments);this.f=a}
v(J,D);function tc(a,b){D.call(this,1,arguments);this.f=a;this.j=b}
v(tc,D);function uc(a,b,c,d,e){D.call(this,2,arguments);this.j=a;this.f=b;this.o=c||null;this.l=d||null;this.v=e||null}
v(uc,D);function vc(a,b,c){D.call(this,1,arguments);this.f=a;this.j=b}
v(vc,D);function wc(a,b,c,d,e,f,g){D.call(this,1,arguments);this.j=a;this.F=b;this.f=c;this.V=d||null;this.o=e||null;this.l=f||null;this.v=g||null}
v(wc,D);
var xc=new E("subscription-batch-subscribe",sc),yc=new E("subscription-batch-unsubscribe",sc),zc=new E("subscription-pref-email",tc),Ac=new E("subscription-subscribe",uc),Bc=new E("subscription-subscribe-loading",J),Cc=new E("subscription-subscribe-loaded",J),K=new E("subscription-subscribe-success",vc),Dc=new E("subscription-subscribe-external",uc),Ec=new E("subscription-unsubscribe",wc),Fc=new E("subscription-unsubscirbe-loading",J),Gc=new E("subscription-unsubscribe-loaded",J),L=new E("subscription-unsubscribe-success",J),
Hc=new E("subscription-external-unsubscribe",wc),Ic=new E("subscription-enable-ypc",J),Jc=new E("subscription-disable-ypc",J);var Kc=q("yt.pubsub.instance_")||new B;B.prototype.subscribe=B.prototype.subscribe;B.prototype.unsubscribeByKey=B.prototype.J;B.prototype.publish=B.prototype.M;B.prototype.clear=B.prototype.clear;u("yt.pubsub.instance_",Kc);var Lc=q("yt.pubsub.subscribedKeys_")||{};u("yt.pubsub.subscribedKeys_",Lc);var Mc=q("yt.pubsub.topicToKeys_")||{};u("yt.pubsub.topicToKeys_",Mc);var Nc=q("yt.pubsub.isSynchronous_")||{};u("yt.pubsub.isSynchronous_",Nc);var Oc=q("yt.pubsub.skipSubId_")||null;
u("yt.pubsub.skipSubId_",Oc);function Pc(a,b,c){var d=Qc();if(d){var e=d.subscribe(a,function(){if(!Oc||Oc!=e){var d=arguments,g;g=function(){Lc[e]&&b.apply(c||window,d)};
try{Nc[a]?g():Sb(g,0)}catch(h){Ub(h)}}},c);
Lc[e]=!0;Mc[a]||(Mc[a]=[]);Mc[a].push(e);return e}return 0}
function Rc(a){var b=Qc();b&&("number"==typeof a?a=[a]:"string"==typeof a&&(a=[parseInt(a,10)]),w(a,function(a){b.unsubscribeByKey(a);delete Lc[a]}))}
function Sc(a,b){var c=Qc();return c?c.publish.apply(c,arguments):!1}
function Qc(){return q("yt.pubsub.instance_")}
;function Tc(a){var b=document.location.protocol+"//"+document.domain+"/post_login",b=lc(b,"mode","subscribe"),b=lc("/signin?context=popup","next",b),b=lc(b,"feature","sub_button");if(b=window.open(b,"loginPopup","width=375,height=440,resizable=yes,scrollbars=yes",!0)){var c=Pc("LOGGED_IN",function(b){Rc(C("LOGGED_IN_PUBSUB_KEY",void 0));Rb("LOGGED_IN",!0);a(b)});
Rb("LOGGED_IN_PUBSUB_KEY",c);b.moveTo((screen.width-375)/2,(screen.height-440)/2)}}
u("yt.pubsub.publish",Sc);function Uc(a){return eval("("+a+")")}
;var Vc=null;"undefined"!=typeof XMLHttpRequest?Vc=function(){return new XMLHttpRequest}:"undefined"!=typeof ActiveXObject&&(Vc=function(){return new ActiveXObject("Microsoft.XMLHTTP")});function Wc(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&Tb(b)(k)}
var k=Vc&&Vc();if(!("open"in k))return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;c=(c||"GET").toUpperCase();d=d||"";k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);f="POST"==c;if(e=Xc(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(f=!1);f&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);return k}
function Xc(a,b){b=b||{};var c;c||(c=window.location.href);var d=a.match(I)[1]||null,e=ec(a.match(I)[3]||null);d&&e?(d=c,c=a.match(I),d=d.match(I),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?ec(c.match(I)[3]||null)==e&&(Number(c.match(I)[4]||null)||null)==(Number(a.match(I)[4]||null)||null):!0;for(var f in Yc){if((e=d=C(Yc[f]))&&!(e=c)){var e=f,g=C("CORS_HEADER_WHITELIST")||{},h=ec(a.match(I)[3]||null);e=h?(g=g[h])?xa(g,e):!1:!0}e&&(b[f]=d)}return b}
function Zc(a,b){var c=C("XSRF_FIELD_NAME",void 0),d;b.headers&&(d=b.headers["Content-Type"]);return!b.Na&&(!ec(a.match(I)[3]||null)||b.withCredentials||ec(a.match(I)[3]||null)==document.location.hostname)&&"POST"==b.method&&(!d||"application/x-www-form-urlencoded"==d)&&!(b.D&&b.D[c])}
function $c(a,b){var c=b.format||"JSON";b.Oa&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var d=C("XSRF_FIELD_NAME",void 0),e=C("XSRF_TOKEN",void 0),f=b.la;f&&(f[d]&&delete f[d],a=rc(a,f||{}));var g=b.Pa||"",f=b.D;Zc(a,b)&&(f||(f={}),f[d]=e);f&&r(g)&&(d=qc(g),Ma(d,f),g=kc(d));var h=!1,k,l=Wc(a,function(a){if(!h){h=!0;k&&window.clearTimeout(k);var d;a:switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:d=
!0;break a;default:d=!1}var e=null;if(d||400<=a.status&&500>a.status)e=ad(c,a,b.Ma);if(d)a:{switch(c){case "XML":d=0==parseInt(e&&e.return_code,10);break a;case "RAW":d=!0;break a}d=!!e}var e=e||{},f=b.context||p;d?b.H&&b.H.call(f,a,e):b.onError&&b.onError.call(f,a,e);b.T&&b.T.call(f,a,e)}},b.method,g,b.headers,b.responseType,b.withCredentials);
b.Ca&&0<b.timeout&&(k=Sb(function(){h||(h=!0,l.abort(),window.clearTimeout(k),b.Ca.call(b.context||p,l))},b.timeout))}
function ad(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=Uc(a));break;case "XML":if(b=(b=b.responseXML)?bd(b):null)d={},w(b.getElementsByTagName("*"),function(a){d[a.tagName]=cd(a)})}c&&dd(d);
return d}
function dd(a){if(ha(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d;d=Ra(a[b],null);a[c]=d}else dd(a[b])}}
function bd(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function cd(a){var b="";w(a.childNodes,function(a){b+=a.nodeValue});
return b}
var Yc={"X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"};function ed(){var a=C("PLAYER_CONFIG");return a&&a.args&&void 0!==a.args.authuser?!0:!(!C("SESSION_INDEX")&&!C("LOGGED_IN"))}
;function fd(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}
m=fd.prototype;m.getHeight=function(){return this.bottom-this.top};
m.clone=function(){return new fd(this.top,this.right,this.bottom,this.left)};
m.contains=function(a){return this&&a?a instanceof fd?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};
m.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
m.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
m.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};function gd(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}
m=gd.prototype;m.clone=function(){return new gd(this.left,this.top,this.width,this.height)};
m.contains=function(a){return a instanceof gd?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};
m.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
m.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
m.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function M(a,b){var c=nb(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""}
function hd(a,b){return M(a,b)||(a.currentStyle?a.currentStyle[b]:null)||a.style&&a.style[b]}
function id(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}z&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function jd(a){"number"==typeof a&&(a=a+"px");return a}
function kd(a){var b=ld;if("none"!=hd(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}
function ld(a){var b=a.offsetWidth,c=a.offsetHeight,d=Wa&&!b&&!c;return(void 0===b||d)&&a.getBoundingClientRect?(a=id(a),new Sa(a.right-a.left,a.bottom-a.top)):new Sa(b,c)}
function md(a,b){if(/^\d+px?$/.test(b))return parseInt(b,10);var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b;var e=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return e}
function nd(a,b){var c=a.currentStyle?a.currentStyle[b]:null;return c?md(a,c):0}
var od={thin:2,medium:4,thick:6};function pd(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:null))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:null;return c in od?od[c]:md(a,c)}
;var qd=Wa?"webkit":Va?"moz":z?"ms":Ta?"o":"",rd=q("yt.dom.getNextId_");if(!rd){rd=function(){return++sd};
u("yt.dom.getNextId_",rd);var sd=0}function td(){var a=document,b;va(["fullscreenElement","fullScreenElement"],function(c){c in a?b=a[c]:(c=qd+c.charAt(0).toUpperCase()+c.substr(1),b=c in a?a[c]:void 0);return!!b});
return b}
;function ud(a,b){(a=A(a))&&a.style&&(a.style.display=b?"":"none",Ha(a,"hid",!b))}
function vd(a){w(arguments,function(a){!da(a)||a instanceof Element?ud(a,!0):w(a,function(a){vd(a)})})}
function wd(a){w(arguments,function(a){!da(a)||a instanceof Element?ud(a,!1):w(a,function(a){wd(a)})})}
;function xd(a){this.type="";this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=null;if(a=a||window.event){this.event=a;for(var b in a)b in yd||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:"mouseout"==this.type&&
(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey}}
xd.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
xd.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
xd.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};
var yd={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};var Ka=q("yt.events.listeners_")||{};u("yt.events.listeners_",Ka);var zd=q("yt.events.counter_")||{count:0};u("yt.events.counter_",zd);function Ad(a,b,c,d){a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return Ja(function(e){return e[0]==a&&e[1]==b&&e[2]==c&&e[4]==!!d})}
function N(a,b,c,d){if(a&&(a.addEventListener||a.attachEvent)){d=!!d;var e=Ad(a,b,c,d);if(!e){var e=++zd.count+"",f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document),g;g=f?function(d){d=new xd(d);if(!yb(d.relatedTarget,function(b){return b==a},!0))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new xd(b);
b.currentTarget=a;return c.call(a,b)};
g=Tb(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),a.addEventListener(b,g,d)):a.attachEvent("on"+b,g);Ka[e]=[a,b,c,g,d]}}}
;var O={},Bd="ontouchstart"in document;function Cd(a,b,c){var d;switch(a){case "mouseover":case "mouseout":d=3;break;case "mouseenter":case "mouseleave":d=9}return yb(c,function(a){return Ea(a,b)},!0,d)}
function P(a){var b="mouseover"==a.type&&"mouseenter"in O||"mouseout"==a.type&&"mouseleave"in O,c=a.type in O||b;if("HTML"!=a.target.tagName&&c){if(b){var b="mouseover"==a.type?"mouseenter":"mouseleave",c=O[b],d;for(d in c.A){var e=Cd(b,d,a.target);e&&!yb(a.relatedTarget,function(a){return a==e},!0)&&c.M(d,e,b,a)}}if(b=O[a.type])for(d in b.A)(e=Cd(a.type,d,a.target))&&b.M(d,e,a.type,a)}}
N(document,"blur",P,!0);N(document,"change",P,!0);N(document,"click",P);N(document,"focus",P,!0);N(document,"mouseover",P);N(document,"mouseout",P);N(document,"mousedown",P);N(document,"keydown",P);N(document,"keyup",P);N(document,"keypress",P);N(document,"cut",P);N(document,"paste",P);Bd&&(N(document,"touchstart",P),N(document,"touchend",P),N(document,"touchcancel",P));function Dd(a,b,c){a&&(a.dataset?a.dataset[Ed(b)]=c:a.setAttribute("data-"+b,c))}
function Q(a,b){return a?a.dataset?a.dataset[Ed(b)]:a.getAttribute("data-"+b):null}
function Fd(a,b){a&&(a.dataset?delete a.dataset[Ed(b)]:a.removeAttribute("data-"+b))}
var Gd={};function Ed(a){return Gd[a]||(Gd[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}
;function Hd(a){this.v=a;this.l={};this.N=[];this.o=[]}
function R(a,b){return"yt-uix"+(a.v?"-"+a.v:"")+(b?"-"+b:"")}
Hd.prototype.unregister=function(){Rc(this.N);this.N.length=0;dc(this.o);this.o.length=0};
Hd.prototype.init=aa;Hd.prototype.dispose=aa;function Id(a,b,c){a.o.push(H(b,c,a))}
function S(a,b,c){var d=R(a,void 0),e=t(c,a);b in O||(O[b]=new B);O[b].subscribe(d,e);a.l[c]=e}
function U(a,b,c){if(b in O){var d=O[b];d.unsubscribe(R(a,void 0),a.l[c]);0>=Ob(d)&&(d.dispose(),delete O[b])}delete a.l[c]}
function Jd(a,b){Dd(a,"tooltip-text",b)}
;function Kd(){Hd.call(this,"tooltip");this.f=0;this.j={}}
v(Kd,Hd);ba(Kd);m=Kd.prototype;m.register=function(){S(this,"mouseover",this.L);S(this,"mouseout",this.C);S(this,"focus",this.ca);S(this,"blur",this.$);S(this,"click",this.C);S(this,"touchstart",this.ka);S(this,"touchend",this.O);S(this,"touchcancel",this.O)};
m.unregister=function(){U(this,"mouseover",this.L);U(this,"mouseout",this.C);U(this,"focus",this.ca);U(this,"blur",this.$);U(this,"click",this.C);U(this,"touchstart",this.ka);U(this,"touchend",this.O);U(this,"touchcancel",this.O);this.dispose();Kd.U.unregister.call(this)};
m.dispose=function(){for(var a in this.j)this.C(this.j[a]);this.j={}};
m.L=function(a){if(!(this.f&&1E3>oa()-this.f)){var b=parseInt(Q(a,"tooltip-hide-timer"),10);b&&(Fd(a,"tooltip-hide-timer"),window.clearTimeout(b));var b=t(function(){Ld(this,a);Fd(a,"tooltip-show-timer")},this),c=parseInt(Q(a,"tooltip-show-delay"),10)||0,b=Sb(b,c);
Dd(a,"tooltip-show-timer",b.toString());a.title&&(Jd(a,Md(a)),a.title="");b=(a[ia]||(a[ia]=++ka)).toString();this.j[b]=a}};
m.C=function(a){var b=parseInt(Q(a,"tooltip-show-timer"),10);b&&(window.clearTimeout(b),Fd(a,"tooltip-show-timer"));b=t(function(){if(a){var b=A(Nd(this,a));b&&(Od(b),b&&b.parentNode&&b.parentNode.removeChild(b),Fd(a,"content-id"));(b=A(Nd(this,a,"arialabel")))&&b.parentNode&&b.parentNode.removeChild(b)}Fd(a,"tooltip-hide-timer")},this);
b=Sb(b,50);Dd(a,"tooltip-hide-timer",b.toString());if(b=Q(a,"tooltip-text"))a.title=b;b=(a[ia]||(a[ia]=++ka)).toString();delete this.j[b]};
m.ca=function(a){this.f=0;this.L(a)};
m.$=function(a){this.f=0;this.C(a)};
m.ka=function(a,b,c){c.changedTouches&&(this.f=0,a=Cd(b,R(this),c.changedTouches[0].target),this.L(a))};
m.O=function(a,b,c){c.changedTouches&&(this.f=oa(),a=Cd(b,R(this),c.changedTouches[0].target),this.C(a))};
function Pd(a,b){Jd(a,b);var c=Q(a,"content-id");(c=A(c))&&rb(c,b)}
function Md(a){return Q(a,"tooltip-text")||a.title}
function Ld(a,b){if(b){var c=Md(b);if(c){var d=A(Nd(a,b));if(!d){d=document.createElement("div");d.id=Nd(a,b);d.className=R(a,"tip");var e=document.createElement("div");e.className=R(a,"tip-body");var f=document.createElement("div");f.className=R(a,"tip-arrow");var g=document.createElement("div");g.setAttribute("aria-hidden","true");g.className=R(a,"tip-content");var h=Qd(a,b),k=Nd(a,b,"content");g.id=k;Dd(b,"content-id",k);e.appendChild(g);h&&d.appendChild(h);d.appendChild(e);d.appendChild(f);var k=
ub(b),l=Nd(a,b,"arialabel"),f=document.createElement("div");Fa(f,R(a,"arialabel"));f.id=l;"rtl"==document.body.getAttribute("dir")?rb(f,c+" "+k):rb(f,k+" "+c);b.setAttribute("aria-labelledby",l);k=td()||document.body;k.appendChild(f);k.appendChild(d);Pd(b,c);(c=parseInt(Q(b,"tooltip-max-width"),10))&&e.offsetWidth>c&&(e.style.width=c+"px",Fa(g,R(a,"normal-wrap")));g=Ea(b,R(a,"reverse"));Rd(a,b,d,e,h,g)||Rd(a,b,d,e,h,!g);var n=R(a,"tip-visible");Sb(function(){Fa(d,n)},0)}}}}
function Rd(a,b,c,d,e,f){Ha(c,R(a,"tip-reverse"),f);var g=0;f&&(g=1);a=kd(b);f=new y((a.width-10)/2,f?a.height:0);var h=nb(b),k=new y(0,0),l;l=h?nb(h):document;l=!z||9<=Number(gb)||qb(kb(l).f)?l.documentElement:l.body;if(b!=l){l=id(b);var n=kb(h).f,h=n.scrollingElement?n.scrollingElement:!Wa&&qb(n)?n.documentElement:n.body||n.documentElement,n=n.parentWindow||n.defaultView,h=z&&eb("10")&&n.pageYOffset!=h.scrollTop?new y(h.scrollLeft,h.scrollTop):new y(n.pageXOffset||h.scrollLeft,n.pageYOffset||h.scrollTop);
k.x=l.left+h.x;k.y=l.top+h.y}f=new y(k.x+f.x,k.y+f.y);f=f.clone();k=(g&8&&"rtl"==hd(c,"direction")?g^4:g)&-9;g=kd(c);l=g.clone();h=f.clone();l=l.clone();0!=k&&(k&4?h.x-=l.width+0:k&2&&(h.x-=l.width/2),k&1&&(h.y-=l.height+0));f=new gd(0,0,0,0);f.left=h.x;f.top=h.y;f.width=l.width;f.height=l.height;l=new y(f.left,f.top);l instanceof y?(k=l.x,l=l.y):(k=l,l=void 0);c.style.left=jd(k);c.style.top=jd(l);l=new Sa(f.width,f.height);if(!(g==l||g&&l&&g.width==l.width&&g.height==l.height))if(g=l,f=nb(c),k=qb(kb(f).f),
!z||eb("10")||k&&eb("8"))f=c.style,Va?f.MozBoxSizing="border-box":Wa?f.WebkitBoxSizing="border-box":f.boxSizing="border-box",f.width=Math.max(g.width,0)+"px",f.height=Math.max(g.height,0)+"px";else if(f=c.style,k){z?(k=nd(c,"paddingLeft"),l=nd(c,"paddingRight"),h=nd(c,"paddingTop"),n=nd(c,"paddingBottom"),k=new fd(h,l,n,k)):(k=M(c,"paddingLeft"),l=M(c,"paddingRight"),h=M(c,"paddingTop"),n=M(c,"paddingBottom"),k=new fd(parseFloat(h),parseFloat(l),parseFloat(n),parseFloat(k)));if(!z||9<=Number(gb))l=
M(c,"borderLeftWidth"),h=M(c,"borderRightWidth"),n=M(c,"borderTopWidth"),G=M(c,"borderBottomWidth"),l=new fd(parseFloat(n),parseFloat(h),parseFloat(G),parseFloat(l));else{l=pd(c,"borderLeft");var h=pd(c,"borderRight"),n=pd(c,"borderTop"),G=pd(c,"borderBottom");l=new fd(n,h,G,l)}f.pixelWidth=g.width-l.left-k.left-k.right-l.right;f.pixelHeight=g.height-l.top-k.top-k.bottom-l.bottom}else f.pixelWidth=g.width,f.pixelHeight=g.height;g=window.document;g=qb(g)?g.documentElement:g.body;f=new Sa(g.clientWidth,
g.clientHeight);1==c.nodeType?(c=id(c),l=new y(c.left,c.top)):(c=c.changedTouches?c.changedTouches[0]:c,l=new y(c.clientX,c.clientY));c=kd(d);h=Math.floor(c.width/2);g=!!(f.height<l.y+a.height);a=!!(l.y<a.height);k=!!(l.x<h);f=!!(f.width<l.x+h);l=(c.width+3)/-2- -5;b=Q(b,"force-tooltip-direction");if("left"==b||k)l=-5;else if("right"==b||f)l=20-c.width-3;b=Math.floor(l)+"px";d.style.left=b;e&&(e.style.left=b,e.style.height=c.height+"px",e.style.width=c.width+"px");return!(g||a)}
function Nd(a,b,c){a=R(a);var d=b.__yt_uid_key;d||(d=rd(),b.__yt_uid_key=d);b=a+d;c&&(b+="-"+c);return b}
function Qd(a,b){var c=null;Xa&&Ea(b,R(a,"masked"))&&((c=A("yt-uix-tooltip-shared-mask"))?(c.parentNode.removeChild(c),vd(c)):(c=document.createElement("iframe"),c.src='javascript:""',c.id="yt-uix-tooltip-shared-mask",c.className=R(a,"tip-mask")));return c}
function Od(a){var b=A("yt-uix-tooltip-shared-mask"),c=b&&yb(b,function(b){return b==a},!1,2);
b&&c&&(b.parentNode.removeChild(b),wd(b),document.body.appendChild(b))}
;function V(){Hd.call(this,"subscription-button");this.f=!1}
v(V,Hd);ba(V);V.prototype.register=function(){S(this,"click",this.P);Id(this,Bc,this.fa);Id(this,Cc,this.ea);Id(this,K,this.Ea);Id(this,Fc,this.fa);Id(this,Gc,this.ea);Id(this,L,this.Fa);Id(this,Ic,this.Ba);Id(this,Jc,this.Aa)};
V.prototype.unregister=function(){U(this,"click",this.P);V.U.unregister.call(this)};
V.prototype.j=function(a){return!!Q(a,"is-subscribed")};
var xb={W:"hover-enabled",oa:"yt-uix-button-subscribe",pa:"yt-uix-button-subscribed",Ga:"ypc-enabled",qa:"yt-uix-button-subscription-container",ra:"yt-subscription-button-disabled-mask-container"},Sd={Ha:"channel-external-id",sa:"subscriber-count-show-when-subscribed",ta:"subscriber-count-tooltip",ua:"subscriber-count-title",Ia:"href",X:"is-subscribed",Ja:"parent-url",Ka:"clicktracking",va:"style-type",Y:"subscription-id",La:"target",wa:"ypc-enabled"};m=V.prototype;
m.P=function(a){var b=Q(a,"href"),c=ed();if(!b||this.f&&c)if(c){var b=Q(a,"channel-external-id"),c=Q(a,"clicktracking"),d;if(Q(a,"ypc-enabled")){d=Q(a,"ypc-item-type");var e=Q(a,"ypc-item-id");d={itemType:d,itemId:e,subscriptionElement:a}}else d=null;e=Q(a,"parent-url");if(Q(a,"is-subscribed")){var f=Q(a,"subscription-id");F(Ec,new wc(b,f,d,a,c,e))}else F(Ac,new uc(b,d,c,e))}else Td(this,a);else a=Q(a,"target")||"_self",window.open(b,a)};
m.fa=function(a){this.G(a.f,this.ha,!0)};
m.ea=function(a){this.G(a.f,this.ha,!1)};
m.Ea=function(a){this.G(a.f,this.ia,!0,a.j)};
m.Fa=function(a){this.G(a.f,this.ia,!1)};
m.Ba=function(a){this.G(a.f,this.za)};
m.Aa=function(a){this.G(a.f,this.ya)};
m.ia=function(a,b,c){b?(Dd(a,Sd.X,"true"),c&&Dd(a,Sd.Y,c)):(Fd(a,Sd.X),Fd(a,Sd.Y));Ud(a)};
m.ha=function(a,b){var c;c=wb(a);Ha(c,xb.ra,b);a.setAttribute("aria-busy",b?"true":"false");a.disabled=b};
function Ud(a){var b=Q(a,Sd.va),c=!!Q(a,"is-subscribed"),b="-"+b,d=xb.pa+b;Ha(a,xb.oa+b,!c);Ha(a,d,c);Q(a,Sd.ta)&&!Q(a,Sd.sa)&&(b=R(Kd.getInstance()),Ha(a,b,!c),a.title=c?"":Q(a,Sd.ua));c?Sb(function(){Fa(a,xb.W)},1E3):Ga(a,xb.W)}
m.za=function(a){var b=!!Q(a,"ypc-item-type"),c=!!Q(a,"ypc-item-id");!Q(a,"ypc-enabled")&&b&&c&&(Fa(a,"ypc-enabled"),Dd(a,Sd.wa,"true"))};
m.ya=function(a){Q(a,"ypc-enabled")&&(Ga(a,"ypc-enabled"),Fd(a,"ypc-enabled"))};
function Vd(a,b){var c=ob(R(a));return ta(c,function(a){return b==Q(a,"channel-external-id")},a)}
m.xa=function(a,b,c){var d=Ca(arguments,2);w(a,function(a){b.apply(this,ya(a,d))},this)};
m.G=function(a,b,c){var d=Vd(this,a),d=ya([d],Ca(arguments,1));this.xa.apply(this,d)};
function Td(a,b){var c=t(function(a){a.discoverable_subscriptions&&Rb("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS",a.discoverable_subscriptions);this.P(b)},a);
Tc(c)}
;var Wd=window.yt&&window.yt.uix&&window.yt.uix.widgets_||{};u("yt.uix.widgets_",Wd);var Xd=window,Yd=document,Zd=Xd.location;function $d(){}
var ae=/\[native code\]/;function W(a,b,c){return a[b]=a[b]||c}
function be(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1}
function ce(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b}
function X(){var a;if((a=Object.create)&&ae.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a}
var de=W(Xd,"gapi",{});var Y;Y=W(Xd,"___jsl",X());W(Y,"I",0);W(Y,"hel",10);function ee(){var a=Zd.href,b;if(Y.dpo)b=Y.h;else{b=Y.h;var c=RegExp("([#].*&|[#])jsh=([^&#]*)","g"),d=RegExp("([?#].*&|[?#])jsh=([^&#]*)","g");if(a=a&&(c.exec(a)||d.exec(a)))try{b=decodeURIComponent(a[2])}catch(e){}}return b}
function fe(a){var b=W(Y,"PQ",[]);Y.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)}
function ge(a){return W(W(Y,"H",X()),a,X())}
;var he=W(Y,"perf",X());W(he,"g",X());var ie=W(he,"i",X());W(he,"r",[]);X();X();function je(a,b,c){b&&0<b.length&&(b=ke(b),c&&0<c.length&&(b+="___"+ke(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=W(ie,"_p",X()),W(b,c,X())[a]=(new Date).getTime(),b=he.r,"function"===typeof b?b(a,"_p",c):b.push([a,"_p",c]))}
function ke(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/\,/g,"_")}
;var le=X(),me=[];function Z(a){throw Error("Bad hint"+(a?": "+a:""));}
;me.push(["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?Y[b]=W(Y,b,[]).concat(c):W(Y,b,c)}if(b=a.u)a=W(Y,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);var ne=/^(\/[a-zA-Z0-9_\-]+)+$/,oe=/^[a-zA-Z0-9\-_\.,!]+$/,pe=/^gapi\.loaded_[0-9]+$/,qe=/^[a-zA-Z0-9,._-]+$/;function re(a,b,c,d){var e=a.split(";"),f=e.shift(),g=le[f],h=null;g?h=g(e,b,c,d):Z("no hint processor for: "+f);h||Z("failed to generate load url");b=h;c=b.match(se);(d=b.match(te))&&1===d.length&&ue.test(b)&&c&&1===c.length||Z("failed sanity: "+a);return h}
function ve(a,b,c,d){function e(a){return encodeURIComponent(a).replace(/%2C/g,",")}
a=we(a);pe.test(c)||Z("invalid_callback");b=xe(b);d=d&&d.length?xe(d):null;return[encodeURIComponent(a.Da).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.Z?"/am="+e(a.Z):"",a.ga?"/rs="+e(a.ga):"",a.na?"/t="+e(a.na):"","/cb=",e(c)].join("")}
function we(a){"/"!==a.charAt(0)&&Z("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))Z("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=decodeURIComponent(f[1]);2==f.length&&g&&h&&(a[g]=a[g]||h)}b="/"+c.join("/");ne.test(b)||Z("invalid_prefix");c=ye(a,"k",!0);d=ye(a,"am");e=ye(a,"rs");a=ye(a,"t");return{Da:b,version:c,
Z:d,ga:e,na:a}}
function xe(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");qe.test(e)&&b.push(e)}return b.join(",")}
function ye(a,b,c){a=a[b];!a&&c&&Z("missing: "+b);if(a){if(oe.test(a))return a;Z("invalid: "+b)}return null}
var ue=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,te=/\/cb=/g,se=/\/\//g;function ze(){var a=ee();if(!a)throw Error("Bad hint");return a}
le.m=function(a,b,c,d){(a=a[0])||Z("missing_hint");return"https://apis.google.com"+ve(a,b,c,d)};var Ae=decodeURI("%73cript");function Be(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&0>be.call(b,e)&&c.push(e)}return c}
function Ce(a){"loading"!=Yd.readyState?De(a):Yd.write("<"+Ae+' src="'+encodeURI(a)+'"></'+Ae+">")}
function De(a){var b=Yd.createElement(Ae);b.setAttribute("src",a);b.async="true";(a=Yd.getElementsByTagName(Ae)[0])?a.parentNode.insertBefore(b,a):(Yd.head||Yd.body||Yd.documentElement).appendChild(b)}
function Ee(a,b){var c=b&&b._c;if(c)for(var d=0;d<me.length;d++){var e=me[d][0],f=me[d][1];f&&Object.prototype.hasOwnProperty.call(c,e)&&f(c[e],a,b)}}
function Fe(a,b,c){Ge(function(){var c;c=b===ee()?W(de,"_",X()):X();c=W(ge(b),"_",c);a(c)},c)}
function He(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Ee(a,c);var d=a?a.split(":"):[],e=c.h||ze(),f=W(Y,"ah",X());if(f["::"]&&d.length){for(var g=[],h=null;h=d.shift();){var k=h.split("."),k=f[h]||f[k[1]&&"ns:"+k[0]||""]||e,l=g.length&&g[g.length-1]||null,n=l;l&&l.hint==k||(n={hint:k,ba:[]},g.push(n));n.ba.push(h)}var G=g.length;if(1<G){var ua=c.callback;ua&&(c.callback=function(){0==--G&&ua()})}for(;d=g.shift();)Ie(d.ba,c,d.hint)}else Ie(d||[],c,e)}
function Ie(a,b,c){function d(a,b){if(G)return 0;Xd.clearTimeout(n);ua.push.apply(ua,T);var d=((de||{}).config||{}).update;d?d(f):f&&W(Y,"cu",[]).push(f);if(b){je("me0",a,jb);try{Fe(b,c,l)}finally{je("me1",a,jb)}}return 1}
a=ce(a)||[];var e=b.callback,f=b.config,g=b.timeout,h=b.ontimeout,k=b.onerror,l=void 0;"function"==typeof k&&(l=k);var n=null,G=!1;if(g&&!h||!g&&h)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var k=W(ge(c),"r",[]).sort(),ua=W(ge(c),"L",[]).sort(),jb=[].concat(k);0<g&&(n=Xd.setTimeout(function(){G=!0;h()},g));
var T=Be(a,ua);if(T.length){var T=Be(a,k),fa=W(Y,"CP",[]),ga=fa.length;fa[ga]=function(a){function b(){var a=fa[ga+1];a&&a()}
function c(b){fa[ga]=null;d(T,a)&&fe(function(){e&&e();b()})}
if(!a)return 0;je("ml1",T,jb);0<ga&&fa[ga-1]?fa[ga]=function(){c(b)}:c(b)};
if(T.length){var fc="loaded_"+Y.I++;de[fc]=function(a){fa[ga](a);de[fc]=null};
a=re(c,T,"gapi."+fc,k);k.push.apply(k,T);je("ml0",T,jb);b.sync||Xd.___gapisync?Ce(a):De(a)}else fa[ga]($d)}else d(T)&&e&&e()}
;function Ge(a,b){if(Y.hee&&0<Y.hel)try{return a()}catch(c){b&&b(c),Y.hel--,He("debug_error",function(){try{window.___jsl.hefn(c)}catch(a){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;
}}
;de.load=function(a,b){return Ge(function(){return He(a,b)})};function Je(a){a=ea(a)?{callback:a}:a||{};if(a.gapiHintOverride||C("GAPI_HINT_OVERRIDE")){var b;b=document.location.href;-1!=b.indexOf("?")?(b=(b||"").split("#")[0],b=b.split("?",2),b=qc(1<b.length?b[1]:b[0])):b={};(b=b.gapi_jsh)&&Ma(a,{_c:{jsl:{h:b}}})}He("gapi.iframes:gapi.iframes.style.common",a)}
;function Ke(){return q("gapi.iframes.getContext")()}
function Le(a){(Ke()||Ke()).connectIframes(a)}
function Me(a,b){Ke().addOnConnectHandler("yt",a,void 0,b)}
function Ne(){return Ke().getParentIframe()}
;var Oe="http://www.youtube.com https://www.youtube.com https://plus.google.com https://plus.googleapis.com https://plus.sandbox.google.com https://plusone.google.com https://plusone.sandbox.google.com https://apis.google.com https://apis.sandbox.google.com".split(" "),Pe=[Bc,Cc,K,Fc,Gc,L,Dc,Hc],Qe=[Bc,Cc,K,Fc,Gc,L,Ic,Jc];function Re(a){this.f=a;this.B=null;C("SUBSCRIBE_EMBED_HOVERCARD_URL")&&(Se(this),N(this.f,"mouseover",t(this.o,this)),N(this.f,"mouseout",t(this.R,this)),N(this.f,"click",t(this.R,this)),H(K,na(this.j,!0),this),H(L,na(this.j,!1),this),Te(this))}
function Se(a){var b={url:C("SUBSCRIBE_EMBED_HOVERCARD_URL"),style:"bubble",hideClickDetection:!0,show:!1,anchor:a.f,relayOpen:"-1"};a=t(a.l,a);Ke().open(b,a)}
function Te(a){ed()||Pc("LOGGED_IN",function(){this.B&&(this.R(),this.B.close(),this.B=null,Se(this))},a)}
Re.prototype.l=function(a){this.B=a;a=V.getInstance().j(this.f);this.j(a)};
Re.prototype.o=function(){this.B&&this.B.restyle({show:!0})};
Re.prototype.R=function(){this.B&&this.B.restyle({show:!1})};
Re.prototype.j=function(a){if(this.B){a={isSubscribed:a};try{var b=q("gapi.iframes.SAME_ORIGIN_IFRAMES_FILTER");this.B.send("msg-hovercard-subscription",a,void 0,b)}catch(c){}}};function Ue(a){if(da(a))return Ve(a);if(ha(a)&&!ea(a)&&!(ha(a)&&0<a.nodeType))return We(a);try{return p.JSON.stringify(a),a}catch(b){}}
function We(a){var b={};Ia(a,function(a,d){b[d]=Ue(a)});
return b}
function Ve(a){var b=[];w(a,function(a,d){b[d]=Ue(a)});
return b}
;function Xe(a){this.j=null;this.f=a;a=Ne();var b=Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^oa()).toString(36);a&&(Le({role:"ytsubscribe",iframe:a,data:{id:b}}),Me(t(function(a){this.j=a},this),this.f))}
Xe.prototype.register=function(a,b){if(this.j)this.j.register(a,b,this.f);else{var c=t(this.register,this,a,b,this.f);Me(c,this.f)}};
Xe.prototype.send=function(a,b){if(this.j)this.j.send(a,b,void 0,this.f);else{var c=t(this.send,this,a,b);Me(c,this.f)}};function Ye(){this.f=this.j=null}
function Ze(a,b){var c=q("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");try{var d=c||$e(a),e=Ne();e&&e.send("onytevent",b,void 0,d)}catch(f){}}
Ye.prototype.l=function(a,b){if("pubsub2"==b.eventType){var c=b.topicString;c&&a(c,b.serializedData||null)}};
function $e(a){if(!a.j){var b;b=q("gapi.iframes.makeWhiteListIframesFilter")(Oe);a.j=b}return a.j}
;function af(){this.f=new Ye;this.l=!1;this.j={}}
function bf(a){w(Pe,function(a){if(!this.j[a.toString()]){var c=H(a,function(c){var e=c?{version:c.version,args:c.args}:null;c=this.f;c.f&&(e={eventType:"pubsub2",topicString:a.toString(),serializedData:Ue(e)},c.f.send("msg-youtube-pubsub",e))},this);
c&&(this.j[a.toString()]=c)}},a)}
af.prototype.o=function(a,b){var c=wa(Qe,function(b){return b.toString()==a});
if(c&&(!c.K||b)){var d;if(c.K)try{d=Xb(c.K,b)}catch(f){return}var e=this.j[c.toString()];e?cc(e,c,d):F(c,d)}};
af.prototype.v=function(a){cf(this)&&Ze(this.f,{eventType:"subscribe",channelExternalId:a.f})};
af.prototype.F=function(a){cf(this)&&Ze(this.f,{eventType:"unsubscribe",channelExternalId:a.f})};
function cf(a){return a.l||!!C("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS")}
;function df(){Je(function(){var a;a=kd(A("yt-subscribe"));a={width:a.width,height:a.height};var b=ef;Ke().ready(a,null,b)})}
function ef(a){if(a.length&&a[a.length-1]){var b=a[a.length-1];a=b.eurl;var b=b.notificationsPipeSupported,c=A("yt-subscribe"),d=V.getInstance(),d=R(d),e=c||document,f=null;e.getElementsByClassName?f=e.getElementsByClassName(d)[0]:e.querySelectorAll&&e.querySelector?f=e.querySelector("."+d):f=pb(d,c)[0];c=f||null;a&&c&&(V.getInstance(),Dd(c,"parent-url",a));a=ff();b&&a&&(V.getInstance().f=!0);c&&!a&&new Re(c);a=new af;H(K,a.v,a);H(L,a.F,a);if(ff()){b=a.f;b.f=new Xe($e(b));bf(a);b=a.f;c=t(a.o,a);if(b.f)try{b.f.register("cmd-youtube-pubsub",
na(b.l,c))}catch(g){}a.l=!0}}}
function ff(){var a=Ne().getOrigin();return xa(Oe,a)}
;function gf(a){for(var b=0;b<a.length;b++){var c=a[b];"send_follow_on_ping_action"==c.name&&c.data&&c.data.follow_on_url&&(c=c.data.follow_on_url)&&pc(c)}}
;function hf(a){D.call(this,1,arguments);this.f=a}
v(hf,D);function jf(a,b){D.call(this,2,arguments);this.j=a;this.f=b}
v(jf,D);function kf(a,b,c,d){D.call(this,1,arguments);this.f=b;this.l=c||null;this.j=d||null}
v(kf,D);function lf(a,b){D.call(this,1,arguments);this.j=a;this.f=b||null}
v(lf,D);function mf(a){D.call(this,1,arguments)}
v(mf,D);var nf=new E("ypc-core-load",hf),of=new E("ypc-guide-sync-success",jf),pf=new E("ypc-purchase-success",kf),qf=new E("ypc-subscription-cancel",mf),rf=new E("ypc-subscription-cancel-success",lf),sf=new E("ypc-init-subscription",mf);var tf=!1,uf=[],vf=[];function wf(a){a.f?tf?F(Dc,a):F(nf,new hf(function(){F(sf,new mf(a.f))})):xf(a.j,a.o,a.l,a.v)}
function yf(a){a.f?tf?F(Hc,a):F(nf,new hf(function(){F(qf,new mf(a.f))})):zf(a.j,a.F,a.o,a.l,a.v)}
function Af(a){Bf(za(a.f))}
function Cf(a){Df(za(a.f))}
function Ef(a){Ff(a.f,a.j,null)}
function Gf(a,b,c,d){Ff(a,b,c,d)}
function Hf(a){var b=a.j,c=a.f.subscriptionId;b&&c&&F(K,new vc(b,c,a.f.channelInfo))}
function If(a){var b=a.f;Ia(a.j,function(a,d){F(K,new vc(d,a,b[d]))})}
function Jf(a){F(L,new J(a.j.itemId));a.f&&a.f.length&&(Kf(a.f,L),Kf(a.f,Ic))}
function xf(a,b,c,d){var e=new J(a);F(Bc,e);var f={};f.c=a;c&&(f.eurl=c);d&&(f.source=d);c={};(d=C("PLAYBACK_ID"))&&(c.plid=d);(d=C("EVENT_ID"))&&(c.ei=d);b&&Lf(b,c);$c("/subscription_ajax?action_create_subscription_to_channel=1",{method:"POST",la:f,D:c,H:function(b,c){var d=c.response;F(K,new vc(a,d.id,d.channel_info));d.show_feed_privacy_dialog&&Sc("SHOW-FEED-PRIVACY-SUBSCRIBE-DIALOG",a);d.actions&&gf(d.actions)},
T:function(){F(Cc,e)}})}
function zf(a,b,c,d,e){var f=new J(a);F(Fc,f);var g={};d&&(g.eurl=d);e&&(g.source=e);d={};d.c=a;d.s=b;(a=C("PLAYBACK_ID"))&&(d.plid=a);(a=C("EVENT_ID"))&&(d.ei=a);c&&Lf(c,d);$c("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",la:g,D:d,H:function(a,b){var c=b.response;F(L,f);c.actions&&gf(c.actions)},
T:function(){F(Gc,f)}})}
function Ff(a,b,c,d){if(null!==b||null!==c){var e={};a&&(e.channel_id=a);null===b||(e.email_on_upload=b);null===c||(e.receive_no_updates=c);$c("/subscription_ajax?action_update_subscription_preferences=1",{method:"POST",D:e,onError:function(){d&&d()}})}}
function Bf(a){if(a.length){var b=Ba(a,0,40);F("subscription-batch-subscribe-loading");Kf(b,Bc);var c={};c.a=b.join(",");var d=function(){F("subscription-batch-subscribe-loaded");Kf(b,Cc)};
$c("/subscription_ajax?action_create_subscription_to_all=1",{method:"POST",D:c,H:function(c,f){d();var g=f.response,h=g.id;if("array"==ca(h)&&h.length==b.length){var k=g.channel_info_map;w(h,function(a,c){var d=b[c];F(K,new vc(d,a,k[d]))});
a.length?Bf(a):F("subscription-batch-subscribe-finished")}},
onError:function(){d();F("subscription-batch-subscribe-failure")}})}}
function Df(a){if(a.length){var b=Ba(a,0,40);F("subscription-batch-unsubscribe-loading");Kf(b,Fc);var c={};c.c=b.join(",");var d=function(){F("subscription-batch-unsubscribe-loaded");Kf(b,Gc)};
$c("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",D:c,H:function(){d();Kf(b,L);a.length&&Df(a)},
onError:function(){d()}})}}
function Kf(a,b){w(a,function(a){F(b,new J(a))})}
function Lf(a,b){var c=qc(a),d;for(d in c)b[d]=c[d]}
;u("yt.setConfig",Rb);u("ytbin.www.subscribeembed.init",function(){tf=!0;vf.push(H(Ac,wf),H(Ec,yf));tf||(vf.push(H(Dc,wf),H(Hc,yf),H(xc,Af),H(yc,Cf),H(zc,Ef)),uf.push(Pc("subscription-prefs",Gf)),vf.push(H(pf,Hf),H(rf,Jf),H(of,If)));var a=V.getInstance(),b=R(a);b in Wd||(a.register(),a.N.push(Pc("yt-uix-init-"+b,a.init,a)),a.N.push(Pc("yt-uix-dispose-"+b,a.dispose,a)),Wd[b]=a);df()});})();
