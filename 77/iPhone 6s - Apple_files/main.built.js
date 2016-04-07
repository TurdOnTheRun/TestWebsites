(function e(b,g,d){function c(n,k){if(!g[n]){if(!b[n]){var j=typeof require=="function"&&require;
if(!k&&j){return j(n,!0)}if(a){return a(n,!0)}var m=new Error("Cannot find module '"+n+"'");
throw m.code="MODULE_NOT_FOUND",m}var h=g[n]={exports:{}};b[n][0].call(h.exports,function(l){var o=b[n][1][l];
return c(o?o:l)},h,h.exports,e,b,g,d)}return g[n].exports}var a=typeof require=="function"&&require;
for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(d,f,b){var g=d("./ac-browser/BrowserData");
var a=/applewebkit/i;var h=d("./ac-browser/IE");var c=g.create();c.isWebKit=function(j){var k=j||window.navigator.userAgent;
return k?!!a.test(k):false};c.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(c.name==="IE"){c.IE={documentMode:h.getDocumentMode()}}f.exports=c},{"./ac-browser/BrowserData":2,"./ac-browser/IE":3}],2:[function(b,c,a){b("@marcom/ac-polyfills/Array/prototype.filter");
b("@marcom/ac-polyfills/Array/prototype.some");var d=b("./data");function f(){}f.prototype={__getBrowserVersion:function(h,j){var g;
if(!h||!j){return}var k=d.browser.filter(function(l){return l.identity===j});k.some(function(n){var l=n.versionSearch||j;
var m=h.indexOf(l);if(m>-1){g=parseFloat(h.substring(m+l.length+1));return true
}});return g},__getName:function(g){return this.__getIdentityStringFromArray(g)
},__getIdentity:function(g){if(g.string){return this.__matchSubString(g)}else{if(g.prop){return g.identity
}}},__getIdentityStringFromArray:function(g){for(var k=0,h=g.length,j;k<h;k++){j=this.__getIdentity(g[k]);
if(j){return j}}},__getOS:function(g){return this.__getIdentityStringFromArray(g)
},__getOSVersion:function(j,m){if(!j||!m){return}var l=d.os.filter(function(n){return n.identity===m
})[0];var g=l.versionSearch||m;var k=new RegExp(g+" ([\\d_\\.]+)","i");var h=j.match(k);
if(h!==null){return h[1].replace(/_/g,".")}},__matchSubString:function(h){var g=h.subString;
if(g){var j=g.test?!!g.test(h.string):h.string.indexOf(g)>-1;if(j){return h.identity
}}}};f.create=function(){var g=new f();var h={};h.name=g.__getName(d.browser);h.version=g.__getBrowserVersion(d.versionString,h.name);
h.os=g.__getOS(d.os);h.osVersion=g.__getOSVersion(d.versionString,h.os);return h
};c.exports=f},{"./data":4,"@marcom/ac-polyfills/Array/prototype.filter":148,"@marcom/ac-polyfills/Array/prototype.some":152}],3:[function(b,c,a){c.exports={getDocumentMode:function(){var d;
if(document.documentMode){d=parseInt(document.documentMode,10)}else{d=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){d=7
}}}return d}}},{}],4:[function(b,c,a){c.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],5:[function(b,c,a){b("@marcom/ac-polyfills/Array/prototype.slice");b("@marcom/ac-polyfills/Element/prototype.classList");
var d=b("./className/add");c.exports=function f(){var j=Array.prototype.slice.call(arguments);
var h=j.shift(j);var g;if(h.classList&&h.classList.add){h.classList.add.apply(h.classList,j);
return}for(g=0;g<j.length;g++){d(h,j[g])}}},{"./className/add":7,"@marcom/ac-polyfills/Array/prototype.slice":151,"@marcom/ac-polyfills/Element/prototype.classList":154}],6:[function(b,c,a){c.exports={add:b("./className/add"),contains:b("./className/contains"),remove:b("./className/remove")}
},{"./className/add":7,"./className/contains":8,"./className/remove":10}],7:[function(b,c,a){var d=b("./contains");
c.exports=function f(h,g){if(!d(h,g)){h.className+=" "+g}}},{"./contains":8}],8:[function(b,c,a){var f=b("./getTokenRegExp");
c.exports=function d(h,g){return f(g).test(h.className)}},{"./getTokenRegExp":9}],9:[function(b,c,a){c.exports=function d(f){return new RegExp("(\\s|^)"+f+"(\\s|$)")
}},{}],10:[function(c,d,b){var f=c("./contains");var g=c("./getTokenRegExp");d.exports=function a(j,h){if(f(j,h)){j.className=j.className.replace(g(h),"$1").trim()
}}},{"./contains":8,"./getTokenRegExp":9}],11:[function(b,d,a){b("@marcom/ac-polyfills/Element/prototype.classList");
var f=b("./className/contains");d.exports=function c(h,g){if(h.classList&&h.classList.contains){return h.classList.contains(g)
}return f(h,g)}},{"./className/contains":8,"@marcom/ac-polyfills/Element/prototype.classList":154}],12:[function(b,c,a){c.exports={add:b("./add"),contains:b("./contains"),remove:b("./remove"),toggle:b("./toggle")}
},{"./add":5,"./contains":11,"./remove":13,"./toggle":14}],13:[function(d,f,c){d("@marcom/ac-polyfills/Array/prototype.slice");
d("@marcom/ac-polyfills/Element/prototype.classList");var b=d("./className/remove");
f.exports=function a(){var j=Array.prototype.slice.call(arguments);var h=j.shift(j);
var g;if(h.classList&&h.classList.remove){h.classList.remove.apply(h.classList,j);
return}for(g=0;g<j.length;g++){b(h,j[g])}}},{"./className/remove":10,"@marcom/ac-polyfills/Array/prototype.slice":151,"@marcom/ac-polyfills/Element/prototype.classList":154}],14:[function(c,d,b){c("@marcom/ac-polyfills/Element/prototype.classList");
var f=c("./className");d.exports=function a(k,j,l){var h=(typeof l!=="undefined");
var g;if(k.classList&&k.classList.toggle){if(h){return k.classList.toggle(j,l)}return k.classList.toggle(j)
}if(h){g=!!l}else{g=!f.contains(k,j)}if(g){f.add(k,j)}else{f.remove(k,j)}return g
}},{"./className":6,"@marcom/ac-polyfills/Element/prototype.classList":154}],15:[function(c,d,b){var g=c("./utils/addEventListener");
var a=c("./shared/getEventType");d.exports=function f(l,j,k,h){j=a(l,j);return g(l,j,k,h)
}},{"./shared/getEventType":25,"./utils/addEventListener":29}],16:[function(d,f,c){var a=d("./utils/dispatchEvent");
var b=d("./shared/getEventType");f.exports=function g(k,j,h){j=b(k,j);return a(k,j,h)
}},{"./shared/getEventType":25,"./utils/dispatchEvent":30}],17:[function(b,c,a){c.exports={addEventListener:b("./addEventListener"),dispatchEvent:b("./dispatchEvent"),preventDefault:b("./preventDefault"),removeEventListener:b("./removeEventListener"),stop:b("./stop"),stopPropagation:b("./stopPropagation"),target:b("./target")}
},{"./addEventListener":15,"./dispatchEvent":16,"./preventDefault":23,"./removeEventListener":24,"./stop":26,"./stopPropagation":27,"./target":28}],18:[function(d,b,f){var g=d("./utils/eventTypeAvailable");
var k=d("./shared/camelCasedEventTypes");var c=d("./shared/windowFallbackEventTypes");
var h=d("./shared/prefixHelper");var a={};b.exports=function j(n,m){var o;var p;
var l;m=m||"div";n=n.toLowerCase();if(!(m in a)){a[m]={}}p=a[m];if(n in p){return p[n]
}if(g(n,m)){return p[n]=n}if(n in k){for(l=0;l<k[n].length;l++){o=k[n][l];if(g(o.toLowerCase(),m)){return p[n]=o
}}}for(l=0;l<h.evt.length;l++){o=h.evt[l]+n;if(g(o,m)){h.reduce(l);return p[n]=o
}}if(m!=="window"&&c.indexOf(n)){return p[n]=j(n,"window")}return p[n]=false}},{"./shared/camelCasedEventTypes":19,"./shared/prefixHelper":20,"./shared/windowFallbackEventTypes":21,"./utils/eventTypeAvailable":22}],19:[function(b,c,a){c.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],20:[function(b,d,a){var j=["-webkit-","-moz-","-ms-"];var f=["Webkit","Moz","ms"];
var h=["webkit","moz","ms"];var c=function(){this.initialize()};var g=c.prototype;
g.initialize=function(){this.reduced=false;this.css=j;this.dom=f;this.evt=h};g.reduce=function(k){if(!this.reduced){this.reduced=true;
this.css=[this.css[k]];this.dom=[this.dom[k]];this.evt=[this.evt[k]]}};d.exports=new c()
},{}],21:[function(b,c,a){c.exports=["transitionend","animationstart","animationend","animationiteration",]
},{}],22:[function(c,f,b){var a={window:window,document:document};f.exports=function d(j,g){var h;
j="on"+j;if(!(g in a)){a[g]=document.createElement(g)}h=a[g];if(j in h){return true
}if("setAttribute" in h){h.setAttribute(j,"return;");return(typeof h[j]==="function")
}return false}},{}],23:[function(c,d,a){d.exports=function b(f){f=f||window.event;
if(f.preventDefault){f.preventDefault()}else{f.returnValue=false}}},{}],24:[function(d,f,c){var b=d("./utils/removeEventListener");
var a=d("./shared/getEventType");f.exports=function g(l,j,k,h){j=a(l,j);return b(l,j,k,h)
}},{"./shared/getEventType":25,"./utils/removeEventListener":31}],25:[function(c,f,b){var d=c("@marcom/ac-prefixer/getEventType");
f.exports=function a(k,j){var h;var g;if("tagName" in k){h=k.tagName}else{if(k===window){h="window"
}else{h="document"}}g=d(j,h);if(g){return g}return j}},{"@marcom/ac-prefixer/getEventType":18}],26:[function(d,g,b){var a=d("./stopPropagation");
var c=d("./preventDefault");g.exports=function f(h){h=h||window.event;a(h);c(h);
h.stopped=true;h.returnValue=false}},{"./preventDefault":23,"./stopPropagation":27}],27:[function(c,d,b){d.exports=function a(f){f=f||window.event;
if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}}},{}],28:[function(b,c,a){c.exports=function d(f){f=f||window.event;
return(typeof f.target!=="undefined")?f.target:f.srcElement}},{}],29:[function(b,c,a){c.exports=function d(j,g,h,f){if(j.addEventListener){j.addEventListener(g,h,!!f)
}else{j.attachEvent("on"+g,h)}return j}},{}],30:[function(b,c,a){b("@marcom/ac-polyfills/CustomEvent");
c.exports=function d(j,h,g){var f;if(j.dispatchEvent){if(g){f=new CustomEvent(h,g)
}else{f=new CustomEvent(h)}j.dispatchEvent(f)}else{f=document.createEventObject();
if(g&&"detail" in g){f.detail=g.detail}j.fireEvent("on"+h,f)}return j}},{"@marcom/ac-polyfills/CustomEvent":153}],31:[function(b,c,a){c.exports=function d(j,g,h,f){if(j.removeEventListener){j.removeEventListener(g,h,!!f)
}else{j.detachEvent("on"+g,h)}return j}},{}],32:[function(d,f,c){var b=d("./utils/getBoundingClientRect");
f.exports=function a(g,j){var h=1;if(j){h=b(g).width/g.offsetWidth}return{width:g.scrollWidth*h,height:g.scrollHeight*h}
}},{"./utils/getBoundingClientRect":43}],33:[function(d,f,c){var b=d("./utils/getBoundingClientRect");
f.exports=function a(g,j){var h;if(j){h=b(g);return{width:h.width,height:h.height}
}return{width:g.offsetWidth,height:g.offsetHeight}}},{"./utils/getBoundingClientRect":43}],34:[function(g,h,f){var c=g("./getDimensions");
var d=g("./utils/getBoundingClientRect");var b=g("./getScrollX");var a=g("./getScrollY");
h.exports=function j(k,q){var m;var p;var n;var l;var o;if(q){m=d(k);p=b();n=a();
return{top:m.top+n,right:m.right+p,bottom:m.bottom+n,left:m.left+p}}l=c(k,q);m={top:k.offsetTop,left:k.offsetLeft,width:l.width,height:l.height};
while(k=k.offsetParent){m.top+=k.offsetTop;m.left+=k.offsetLeft}return{top:m.top,right:m.left+m.width,bottom:m.top+m.height,left:m.left}
}},{"./getDimensions":33,"./getScrollX":38,"./getScrollY":39,"./utils/getBoundingClientRect":43}],35:[function(c,f,b){var a=c("./getDimensions");
var g=c("./getPixelsInViewport");f.exports=function d(k,l){var j=g(k,l);var h=a(k,l).height;
return(j/h)}},{"./getDimensions":33,"./getPixelsInViewport":36}],36:[function(c,d,b){var a=c("./getViewportPosition");
d.exports=function f(h,l){var k=document.documentElement.clientHeight;var g=a(h,l);
var j;if(g.top>=k||g.bottom<=0){return 0}j=(g.bottom-g.top);if(g.top<0){j+=g.top
}if(g.bottom>k){j-=g.bottom-k}return j}},{"./getViewportPosition":40}],37:[function(d,f,c){var a=d("./getDimensions");
var b=d("./utils/getBoundingClientRect");f.exports=function g(j,m){var l;var h;
var k;if(m){l=b(j);if(j.offsetParent){h=b(j.offsetParent);l.top-=h.top;l.left-=h.left
}}else{k=a(j,m);l={top:j.offsetTop,left:j.offsetLeft,width:k.width,height:k.height}
}return{top:l.top,right:l.left+l.width,bottom:l.top+l.height,left:l.left}}},{"./getDimensions":33,"./utils/getBoundingClientRect":43}],38:[function(c,d,b){d.exports=function a(f){var g;
f=f||window;if(f===window){g=window.pageXOffset;if(!g){f=document.documentElement||document.body.parentNode||document.body
}else{return g}}return f.scrollLeft}},{}],39:[function(c,d,b){d.exports=function a(f){var g;
f=f||window;if(f===window){g=window.pageYOffset;if(!g){f=document.documentElement||document.body.parentNode||document.body
}else{return g}}return f.scrollTop}},{}],40:[function(g,h,f){var j=g("./getPagePosition");
var d=g("./utils/getBoundingClientRect");var c=g("./getScrollX");var b=g("./getScrollY");
h.exports=function a(l,o){var k;var n;var m;if(o){k=d(l);return{top:k.top,right:k.right,bottom:k.bottom,left:k.left}
}k=j(l);n=c();m=b();return{top:k.top-m,right:k.right-n,bottom:k.bottom-m,left:k.left-n}
}},{"./getPagePosition":34,"./getScrollX":38,"./getScrollY":39,"./utils/getBoundingClientRect":43}],41:[function(b,c,a){c.exports={getContentDimensions:b("./getContentDimensions"),getDimensions:b("./getDimensions"),getPagePosition:b("./getPagePosition"),getPercentInViewport:b("./getPercentInViewport"),getPixelsInViewport:b("./getPixelsInViewport"),getPosition:b("./getPosition"),getScrollX:b("./getScrollX"),getScrollY:b("./getScrollY"),getViewportPosition:b("./getViewportPosition"),isInViewport:b("./isInViewport")}
},{"./getContentDimensions":32,"./getDimensions":33,"./getPagePosition":34,"./getPercentInViewport":35,"./getPixelsInViewport":36,"./getPosition":37,"./getScrollX":38,"./getScrollY":39,"./getViewportPosition":40,"./isInViewport":42}],42:[function(b,d,a){var g=b("./getPixelsInViewport");
var c=b("./getPercentInViewport");d.exports=function f(k,l,h){var j;h=h||0;if(typeof h==="string"&&h.slice(-2)==="px"){h=parseInt(h,10);
j=g(k,l)}else{j=c(k,l)}return(j>0&&j>=h)}},{"./getPercentInViewport":35,"./getPixelsInViewport":36}],43:[function(c,d,b){d.exports=function a(f){var g=f.getBoundingClientRect();
return{top:g.top,right:g.right,bottom:g.bottom,left:g.left,width:g.width||g.right-g.left,height:g.height||g.bottom-g.top}
}},{}],44:[function(c,d,b){var f=c("@marcom/ac-prefixer/getStyleProperty");var g=c("@marcom/ac-prefixer/stripPrefixes");
d.exports=function a(){var k=Array.prototype.slice.call(arguments);var p=k.shift(k);
var m=window.getComputedStyle(p);var l={};var o;var h;var n;var j;if(typeof k[0]!=="string"){k=k[0]
}for(j=0;j<k.length;j++){o=k[j];h=f(o);if(h){o=g(h);n=m[h];if(!n||n==="auto"){n=null
}if(n){n=g(n)}}else{n=null}l[o]=n}return l}},{"@marcom/ac-prefixer/getStyleProperty":48,"@marcom/ac-prefixer/stripPrefixes":54}],45:[function(b,c,a){c.exports={getStyle:b("./getStyle"),setStyle:b("./setStyle")}
},{"./getStyle":44,"./setStyle":57}],46:[function(c,d,b){d.exports=function a(j){var h;
var g;var f;if(!j&&j!==0){return""}if(Array.isArray(j)){return j+""}if(typeof j==="object"){h="";
g=Object.keys(j);for(f=0;f<g.length;f++){h+=g[f]+"("+j[g[f]]+") "}return h.trim()
}return j}},{}],47:[function(d,f,c){var b=d("./shared/stylePropertyCache");var h=d("./getStyleProperty");
var g=d("./getStyleValue");f.exports=function a(l,k){var j;l=h(l);if(!l){return false
}j=b[l].css;if(typeof k!=="undefined"){k=g(l,k);if(k===false){return false}j+=":"+k+";"
}return j}},{"./getStyleProperty":48,"./getStyleValue":49,"./shared/stylePropertyCache":52}],48:[function(f,d,h){var a=f("./shared/stylePropertyCache");
var j=f("./shared/getStyleTestElement");var b=f("./utils/toCSS");var l=f("./utils/toDOM");
var k=f("./shared/prefixHelper");var c=function(p,m){var n=b(p);var o=(m===false)?false:b(m);
a[p]=a[m]=a[n]=a[o]={dom:m,css:o};return m};d.exports=function g(q){var o;var m;
var p;var n;q+="";if(q in a){return a[q].dom}p=j();q=l(q);m=q.charAt(0).toUpperCase()+q.substring(1);
if(q==="filter"){o=["WebkitFilter","filter"]}else{o=(q+" "+k.dom.join(m+" ")+m).split(" ")
}for(n=0;n<o.length;n++){if(typeof p.style[o[n]]!=="undefined"){if(n!==0){k.reduce(n-1)
}return c(q,o[n])}}return c(q,false)}},{"./shared/getStyleTestElement":50,"./shared/prefixHelper":51,"./shared/stylePropertyCache":52,"./utils/toCSS":55,"./utils/toDOM":56}],49:[function(d,b,h){var f=d("./getStyleProperty");
var l=d("./shared/styleValueAvailable");var k=d("./shared/prefixHelper");var a=d("./shared/stylePropertyCache");
var j={};var m=/(\([^\)]+\))/gi;var g=/([^ ,;\(]+(\([^\)]+\))?)/gi;b.exports=function c(p,o){var n;
o+="";p=f(p);if(!p){return false}if(l(p,o)){return o}n=a[p].css;o=o.replace(g,function(r){var q;
var u;var t;var s;if(r[0]==="#"||!isNaN(r[0])){return r}u=r.replace(m,"");t=n+":"+u;
if(t in j){if(j[t]===false){return""}return r.replace(u,j[t])}q=k.css.map(function(v){return v+r
});q=[r].concat(q);for(s=0;s<q.length;s++){if(l(p,q[s])){if(s!==0){k.reduce(s-1)
}j[t]=q[s].replace(m,"");return q[s]}}j[t]=false;return""});o=o.trim();return(o==="")?false:o
}},{"./getStyleProperty":48,"./shared/prefixHelper":51,"./shared/stylePropertyCache":52,"./shared/styleValueAvailable":53}],50:[function(c,d,b){var f;
d.exports=function a(){if(!f){f=document.createElement("_")}else{f.style.cssText="";
f.removeAttribute("style")}return f};d.exports.resetElement=function(){f=null}},{}],51:[function(b,c,a){arguments[4][20][0].apply(a,arguments)
},{dup:20}],52:[function(b,c,a){c.exports={}},{}],53:[function(c,b,d){var a=c("./stylePropertyCache");
var f=c("./getStyleTestElement");var j=false;var l;var k;var g=function(){var m;
if(!j){j=true;l=("CSS" in window&&"supports" in window.CSS);k=false;m=f();try{m.style.width="invalid"
}catch(n){k=true}}};b.exports=function h(p,o){var n;var m;g();if(l){p=a[p].css;
return CSS.supports(p,o)}m=f();n=m.style[p];if(k){try{m.style[p]=o}catch(q){return false
}}else{m.style[p]=o}return(m.style[p]&&m.style[p]!==n)};b.exports.resetFlags=function(){j=false
}},{"./getStyleTestElement":50,"./stylePropertyCache":52}],54:[function(c,d,a){var b=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
d.exports=function f(g){g=String.prototype.replace.call(g,b,"");return g.charAt(0).toLowerCase()+g.substring(1)
}},{}],55:[function(c,d,b){var f=/^(webkit|moz|ms)/gi;d.exports=function a(h){var g;
if(h.toLowerCase()==="cssfloat"){return"float"}if(f.test(h)){h="-"+h}return h.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],56:[function(b,c,a){var f=/-([a-z])/g;c.exports=function d(h){var g;if(h.toLowerCase()==="float"){return"cssFloat"
}h=h.replace(f,function(k,j){return j.toUpperCase()});if(h.substr(0,2)==="Ms"){h="ms"+h.substring(2)
}return h}},{}],57:[function(d,f,c){var a=d("@marcom/ac-prefixer/getStyleCSS");
var g=d("@marcom/ac-prefixer/getStyleProperty");var b=d("./internal/normalizeValue");
f.exports=function h(p,m){var l="";var k;var o;var j;var n;var q;if(typeof m!=="object"){throw new TypeError("setStyle: styles must be an Object")
}for(o in m){n=b(m[o]);if(!n&&n!==0){j=g(o);if("removeAttribute" in p.style){p.style.removeAttribute(j)
}else{p.style[j]=""}}else{k=a(o,n);if(k!==false){l+=" "+k}}}if(l.length){q=p.style.cssText;
if(q.charAt(q.length-1)!==";"){q+=";"}q+=l;p.style.cssText=q}return p}},{"./internal/normalizeValue":46,"@marcom/ac-prefixer/getStyleCSS":47,"@marcom/ac-prefixer/getStyleProperty":48}],58:[function(b,c,a){c.exports=8
},{}],59:[function(b,c,a){c.exports=11},{}],60:[function(b,c,a){c.exports=9},{}],61:[function(b,c,a){c.exports=1
},{}],62:[function(b,c,a){c.exports=3},{}],63:[function(d,f,c){d("@marcom/ac-polyfills/Array/prototype.slice");
d("@marcom/ac-polyfills/Array/prototype.filter");var g=d("./internal/isNodeType");
var a=d("./ELEMENT_NODE");f.exports=function b(j,h){h=h||a;j=Array.prototype.slice.call(j);
return j.filter(function(k){return g(k,h)})}},{"./ELEMENT_NODE":61,"./internal/isNodeType":64,"@marcom/ac-polyfills/Array/prototype.filter":148,"@marcom/ac-polyfills/Array/prototype.slice":151}],64:[function(b,c,a){var d=b("../isNode");
c.exports=function f(h,g){if(!d(h)){return false}if(typeof g==="number"){return(h.nodeType===g)
}return(g.indexOf(h.nodeType)!==-1)}},{"../isNode":68}],65:[function(g,d,k){var b=g("./isNodeType");
var c=g("../COMMENT_NODE");var l=g("../DOCUMENT_FRAGMENT_NODE");var j=g("../ELEMENT_NODE");
var h=g("../TEXT_NODE");var n=[j,h,c,l];var f=" must be an Element, TextNode, Comment, or Document Fragment";
var q=[j,h,c];var m=" must be an Element, TextNode, or Comment";var o=[j,l];var p=" must be an Element, or Document Fragment";
var a=" must have a parentNode";d.exports={parentNode:function(r,u,t,s){s=s||"target";
if((r||u)&&!b(r,o)){throw new TypeError(t+": "+s+p)}},childNode:function(r,u,t,s){s=s||"target";
if(!r&&!u){return}if(!b(r,q)){throw new TypeError(t+": "+s+m)}},insertNode:function(r,u,t,s){s=s||"node";
if(!r&&!u){return}if(!b(r,n)){throw new TypeError(t+": "+s+f)}},hasParentNode:function(r,t,s){s=s||"target";
if(!r.parentNode){throw new TypeError(t+": "+s+a)}}}},{"../COMMENT_NODE":58,"../DOCUMENT_FRAGMENT_NODE":59,"../ELEMENT_NODE":61,"../TEXT_NODE":62,"./isNodeType":64}],66:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./DOCUMENT_FRAGMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./DOCUMENT_FRAGMENT_NODE":59,"./internal/isNodeType":64}],67:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./ELEMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./ELEMENT_NODE":61,"./internal/isNodeType":64}],68:[function(b,c,a){c.exports=function d(f){return !!(f&&f.nodeType)
}},{}],69:[function(c,d,b){var f=c("./internal/validate");d.exports=function a(g){f.childNode(g,true,"remove");
if(!g.parentNode){return g}return g.parentNode.removeChild(g)}},{"./internal/validate":65}],70:[function(b,c,a){c.exports={ancestor:b("./ancestor"),ancestors:b("./ancestors"),children:b("./children"),filterBySelector:b("./filterBySelector"),firstChild:b("./firstChild"),lastChild:b("./lastChild"),matchesSelector:b("./matchesSelector"),nextSibling:b("./nextSibling"),nextSiblings:b("./nextSiblings"),previousSibling:b("./previousSibling"),previousSiblings:b("./previousSiblings"),querySelector:b("./querySelector"),querySelectorAll:b("./querySelectorAll"),siblings:b("./siblings")}
},{"./ancestor":71,"./ancestors":72,"./children":73,"./filterBySelector":74,"./firstChild":75,"./lastChild":78,"./matchesSelector":79,"./nextSibling":80,"./nextSiblings":81,"./previousSibling":82,"./previousSiblings":83,"./querySelector":84,"./querySelectorAll":85,"./siblings":89}],71:[function(c,f,b){var g=c("@marcom/ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");f.exports=function d(l,k,j){h.childNode(l,true,"ancestors");
h.selector(k,false,"ancestors");if(j&&g(l)&&(!k||a(l,k))){return l}if(l!==document.body){while((l=l.parentNode)&&g(l)){if(!k||a(l,k)){return l
}if(l===document.body){break}}}return null}},{"./internal/validate":77,"./matchesSelector":79,"@marcom/ac-dom-nodes/isElement":67}],72:[function(c,d,b){var g=c("@marcom/ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function f(m,k,j){var l=[];
h.childNode(m,true,"ancestors");h.selector(k,false,"ancestors");if(j&&g(m)&&(!k||a(m,k))){l.push(m)
}if(m!==document.body){while((m=m.parentNode)&&g(m)){if(!k||a(m,k)){l.push(m)}if(m===document.body){break
}}}return l}},{"./internal/validate":77,"./matchesSelector":79,"@marcom/ac-dom-nodes/isElement":67}],73:[function(d,g,c){var b=d("@marcom/ac-dom-nodes/filterByNodeType");
var a=d("./filterBySelector");var h=d("./internal/validate");g.exports=function f(l,j){var k;
h.parentNode(l,true,"children");h.selector(j,false,"children");k=l.children||l.childNodes;
k=b(k);if(j){k=a(k,j)}return k}},{"./filterBySelector":74,"./internal/validate":77,"@marcom/ac-dom-nodes/filterByNodeType":63}],74:[function(d,f,c){d("@marcom/ac-polyfills/Array/prototype.slice");
d("@marcom/ac-polyfills/Array/prototype.filter");var b=d("./matchesSelector");var g=d("./internal/validate");
f.exports=function a(j,h){g.selector(h,true,"filterBySelector");j=Array.prototype.slice.call(j);
return j.filter(function(k){return b(k,h)})}},{"./internal/validate":77,"./matchesSelector":79,"@marcom/ac-polyfills/Array/prototype.filter":148,"@marcom/ac-polyfills/Array/prototype.slice":151}],75:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(k,h){var j;g.parentNode(k,true,"firstChild");
g.selector(h,false,"firstChild");if(k.firstElementChild&&!h){return k.firstElementChild
}j=c(k,h);if(j.length){return j[0]}return null}},{"./children":73,"./internal/validate":77}],76:[function(b,c,a){c.exports=window.Element?(function(d){return d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector
}(Element.prototype)):null},{}],77:[function(g,c,j){g("@marcom/ac-polyfills/Array/prototype.indexOf");
var p=g("@marcom/ac-dom-nodes/isNode");var b=g("@marcom/ac-dom-nodes/COMMENT_NODE");
var l=g("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");var k=g("@marcom/ac-dom-nodes/DOCUMENT_NODE");
var h=g("@marcom/ac-dom-nodes/ELEMENT_NODE");var f=g("@marcom/ac-dom-nodes/TEXT_NODE");
var a=function(s,r){if(!p(s)){return false}if(typeof r==="number"){return(s.nodeType===r)
}return(r.indexOf(s.nodeType)!==-1)};var n=[h,k,l];var o=" must be an Element, Document, or Document Fragment";
var q=[h,f,b];var m=" must be an Element, TextNode, or Comment";var d=" must be a string";
c.exports={parentNode:function(r,u,t,s){s=s||"node";if((r||u)&&!a(r,n)){throw new TypeError(t+": "+s+o)
}},childNode:function(r,u,t,s){s=s||"node";if(!r&&!u){return}if(!a(r,q)){throw new TypeError(t+": "+s+m)
}},selector:function(r,u,t,s){s=s||"selector";if((r||u)&&typeof r!=="string"){throw new TypeError(t+": "+s+d)
}}}},{"@marcom/ac-dom-nodes/COMMENT_NODE":58,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":59,"@marcom/ac-dom-nodes/DOCUMENT_NODE":60,"@marcom/ac-dom-nodes/ELEMENT_NODE":61,"@marcom/ac-dom-nodes/TEXT_NODE":62,"@marcom/ac-dom-nodes/isNode":68,"@marcom/ac-polyfills/Array/prototype.indexOf":150}],78:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(k,h){var j;g.parentNode(k,true,"lastChild");
g.selector(h,false,"lastChild");if(k.lastElementChild&&!h){return k.lastElementChild
}j=c(k,h);if(j.length){return j[j.length-1]}return null}},{"./children":73,"./internal/validate":77}],79:[function(d,f,c){var g=d("@marcom/ac-dom-nodes/isElement");
var j=d("./internal/validate");var a=d("./internal/nativeMatches");var h=d("./shims/matchesSelector");
f.exports=function b(l,k){j.selector(k,true,"matchesSelector");if(!g(l)){return false
}if(!a){return h(l,k)}return a.call(l,k)}},{"./internal/nativeMatches":76,"./internal/validate":77,"./shims/matchesSelector":86,"@marcom/ac-dom-nodes/isElement":67}],80:[function(c,d,b){var f=c("@marcom/ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function g(k,j){h.childNode(k,true,"nextSibling");
h.selector(j,false,"nextSibling");if(k.nextElementSibling&&!j){return k.nextElementSibling
}while(k=k.nextSibling){if(f(k)){if(!j||a(k,j)){return k}}}return null}},{"./internal/validate":77,"./matchesSelector":79,"@marcom/ac-dom-nodes/isElement":67}],81:[function(d,f,b){var g=d("@marcom/ac-dom-nodes/isElement");
var a=d("./matchesSelector");var h=d("./internal/validate");f.exports=function c(l,j){var k=[];
h.childNode(l,true,"nextSiblings");h.selector(j,false,"nextSiblings");while(l=l.nextSibling){if(g(l)){if(!j||a(l,j)){k.push(l)
}}}return k}},{"./internal/validate":77,"./matchesSelector":79,"@marcom/ac-dom-nodes/isElement":67}],82:[function(c,d,b){var g=c("@marcom/ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function f(k,j){h.childNode(k,true,"previousSibling");
h.selector(j,false,"previousSibling");if(k.previousElementSibling&&!j){return k.previousElementSibling
}while(k=k.previousSibling){if(g(k)){if(!j||a(k,j)){return k}}}return null}},{"./internal/validate":77,"./matchesSelector":79,"@marcom/ac-dom-nodes/isElement":67}],83:[function(c,d,b){var f=c("@marcom/ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function g(l,j){var k=[];
h.childNode(l,true,"previousSiblings");h.selector(j,false,"previousSiblings");while(l=l.previousSibling){if(f(l)){if(!j||a(l,j)){k.push(l)
}}}return k.reverse()}},{"./internal/validate":77,"./matchesSelector":79,"@marcom/ac-dom-nodes/isElement":67}],84:[function(c,d,a){var h=c("./internal/validate");
var b=c("./shims/querySelector");var g=("querySelector" in document);d.exports=function f(j,k){k=k||document;
h.parentNode(k,true,"querySelector","context");h.selector(j,true,"querySelector");
if(!g){return b(j,k)}return k.querySelector(j)}},{"./internal/validate":77,"./shims/querySelector":87}],85:[function(b,c,a){b("@marcom/ac-polyfills/Array/prototype.slice");
var h=b("./internal/validate");var g=b("./shims/querySelectorAll");var f=("querySelectorAll" in document);
c.exports=function d(j,k){k=k||document;h.parentNode(k,true,"querySelectorAll","context");
h.selector(j,true,"querySelectorAll");if(!f){return g(j,k)}return Array.prototype.slice.call(k.querySelectorAll(j))
}},{"./internal/validate":77,"./shims/querySelectorAll":88,"@marcom/ac-polyfills/Array/prototype.slice":151}],86:[function(c,d,b){var f=c("../querySelectorAll");
d.exports=function a(l,g){var k=l.parentNode||document;var h=f(g,k);var j;for(j=0;
j<h.length;j++){if(h[j]===l){return true}}return false}},{"../querySelectorAll":85}],87:[function(b,c,a){var d=b("./querySelectorAll");
c.exports=function f(h,j){var g=d(h,j);return g.length?g[0]:null}},{"./querySelectorAll":88}],88:[function(c,b,f){c("@marcom/ac-polyfills/Array/prototype.indexOf");
var k=c("@marcom/ac-dom-nodes/isElement");var h=c("@marcom/ac-dom-nodes/isDocumentFragment");
var l=c("@marcom/ac-dom-nodes/remove");var d="_ac_qsa_";var j=function(o,m){var n;
if(m===document){return true}n=o;while((n=n.parentNode)&&k(n)){if(n===m){return true
}}return false};var g=function(m){if("recalc" in m){m.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};b.exports=function a(m,o){var q=document.createElement("style");
var r=d+(Math.random()+"").slice(-6);var n=[];var p;o=o||document;document[r]=[];
if(h(o)){o.appendChild(q)}else{document.documentElement.firstChild.appendChild(q)
}q.styleSheet.cssText="*{display:recalc;}"+m+'{ac-qsa:expression(document["'+r+'"] && document["'+r+'"].push(this));}';
g(o);while(document[r].length){p=document[r].shift();p.style.removeAttribute("ac-qsa");
if(n.indexOf(p)===-1&&j(p,o)){n.push(p)}}document[r]=null;l(q);g(o);return n}},{"@marcom/ac-dom-nodes/isDocumentFragment":66,"@marcom/ac-dom-nodes/isElement":67,"@marcom/ac-dom-nodes/remove":69,"@marcom/ac-polyfills/Array/prototype.indexOf":150}],89:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(k,h){var j=[];g.childNode(k,true,"siblings");
g.selector(h,false,"siblings");if(k.parentNode){j=c(k.parentNode,h);j=j.filter(function(l){return(l!==k)
})}return j}},{"./children":73,"./internal/validate":77}],90:[function(b,c,a){c.exports={EventEmitterMicro:b("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":91}],91:[function(b,c,a){function f(){this._events={}
}var d=f.prototype;d.on=function(g,h){this._events[g]=this._events[g]||[];this._events[g].unshift(h)
};d.once=function(g,k){var j=this;function h(l){j.off(g,h);if(l!==undefined){k(l)
}else{k()}}this.on(g,h)};d.off=function(g,j){if(!this.has(g)){return}var h=this._events[g].indexOf(j);
if(h===-1){return}this._events[g].splice(h,1)};d.trigger=function(g,j){if(!this.has(g)){return
}for(var h=this._events[g].length-1;h>=0;h--){if(j!==undefined){this._events[g][h](j)
}else{this._events[g][h]()}}};d.has=function(g){if(g in this._events===false||this._events[g].length===0){return false
}return true};d.destroy=function(){for(var g in this._events){this._events[g]=null
}this._events=null};c.exports=f},{}],92:[function(b,c,a){var g=b("./helpers/globals");
var f=b("@marcom/ac-function/once");var d=function(){var h=g.getDocument();var j=h.createElement("canvas");
return !!(typeof j.getContext==="function"&&j.getContext("2d"))};c.exports=f(d);
c.exports.original=d},{"./helpers/globals":100,"@marcom/ac-function/once":127}],93:[function(c,d,b){var h=c("ac-browser");
var a=c("./touchAvailable").original;var f=c("@marcom/ac-function/once");function g(){return(!a()||(h.os==="iOS"&&h.version>=8)||h.name==="Chrome")
}d.exports=f(g);d.exports.original=g},{"./touchAvailable":124,"@marcom/ac-function/once":127,"ac-browser":261}],94:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var l=false;var h=g.getDocument();
var k=g.getNavigator();try{if("cookie" in h&&!!k.cookieEnabled){h.cookie="ac_feature_cookie=1";
l=(h.cookie.indexOf("ac_feature_cookie")!==-1);h.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}}catch(j){}return l}d.exports=f(a);d.exports.original=a},{"./helpers/globals":100,"@marcom/ac-function/once":127}],95:[function(c,d,b){var g=c("@marcom/ac-prefixer/getStyleValue");
var f=c("@marcom/ac-function/once");function a(){var h=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return h.some(function(j){return !!g("background-image",j)})}d.exports=f(a);d.exports.original=a
},{"@marcom/ac-function/once":127,"@marcom/ac-prefixer/getStyleValue":111}],96:[function(c,d,b){var g=c("@marcom/ac-prefixer/getStyleValue");
var f=c("@marcom/ac-prefixer/getStyleProperty");var h=c("@marcom/ac-function/memoize");
function a(k,j){if(typeof j!=="undefined"){return !!g(k,j)}else{return !!f(k)}}d.exports=h(a);
d.exports.original=a},{"@marcom/ac-function/memoize":126,"@marcom/ac-prefixer/getStyleProperty":110,"@marcom/ac-prefixer/getStyleValue":111}],97:[function(b,c,a){var f=b("@marcom/ac-prefixer/getStyleValue");
var d=b("@marcom/ac-function/once");function g(){return !!f("margin","1vw 1vh")
}c.exports=d(g);c.exports.original=g},{"@marcom/ac-function/once":127,"@marcom/ac-prefixer/getStyleValue":111}],98:[function(b,d,a){var f=b("./helpers/globals");
var g=b("@marcom/ac-function/memoize");function c(h,k){var j=f.getDocument();var l;
k=k||"div";l=j.createElement(k);return(h in l)}d.exports=g(c);d.exports.original=c
},{"./helpers/globals":100,"@marcom/ac-function/memoize":126}],99:[function(c,f,b){var a=c("@marcom/ac-prefixer/getEventType");
var g=c("@marcom/ac-function/memoize");function d(j,h){return !!a(j,h)}f.exports=g(d);
f.exports.original=d},{"@marcom/ac-function/memoize":126,"@marcom/ac-prefixer/getEventType":109}],100:[function(b,c,a){c.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],101:[function(b,c,a){c.exports={canvasAvailable:b("./canvasAvailable"),continuousScrollEventsAvailable:b("./continuousScrollEventsAvailable"),cookiesAvailable:b("./cookiesAvailable"),cssLinearGradientAvailable:b("./cssLinearGradientAvailable"),cssPropertyAvailable:b("./cssPropertyAvailable"),cssViewportUnitsAvailable:b("./cssViewportUnitsAvailable"),elementAttributeAvailable:b("./elementAttributeAvailable"),eventTypeAvailable:b("./eventTypeAvailable"),isDesktop:b("./isDesktop"),isHandheld:b("./isHandheld"),isRetina:b("./isRetina"),isTablet:b("./isTablet"),localStorageAvailable:b("./localStorageAvailable"),mediaElementsAvailable:b("./mediaElementsAvailable"),mediaQueriesAvailable:b("./mediaQueriesAvailable"),sessionStorageAvailable:b("./sessionStorageAvailable"),svgAvailable:b("./svgAvailable"),threeDTransformsAvailable:b("./threeDTransformsAvailable"),touchAvailable:b("./touchAvailable"),webGLAvailable:b("./webGLAvailable")}
},{"./canvasAvailable":92,"./continuousScrollEventsAvailable":93,"./cookiesAvailable":94,"./cssLinearGradientAvailable":95,"./cssPropertyAvailable":96,"./cssViewportUnitsAvailable":97,"./elementAttributeAvailable":98,"./eventTypeAvailable":99,"./isDesktop":102,"./isHandheld":103,"./isRetina":104,"./isTablet":105,"./localStorageAvailable":106,"./mediaElementsAvailable":107,"./mediaQueriesAvailable":108,"./sessionStorageAvailable":121,"./svgAvailable":122,"./threeDTransformsAvailable":123,"./touchAvailable":124,"./webGLAvailable":125}],102:[function(d,f,b){var a=d("./touchAvailable").original;
var h=d("./helpers/globals");var g=d("@marcom/ac-function/once");function c(){var j=h.getWindow();
return(!a()&&!j.orientation)}f.exports=g(c);f.exports.original=c},{"./helpers/globals":100,"./touchAvailable":124,"@marcom/ac-function/once":127}],103:[function(f,g,c){var d=f("./isDesktop").original;
var a=f("./isTablet").original;var h=f("@marcom/ac-function/once");function b(){return(!d()&&!a())
}g.exports=h(b);g.exports.original=b},{"./isDesktop":102,"./isTablet":105,"@marcom/ac-function/once":127}],104:[function(b,c,a){var d=b("./helpers/globals");
c.exports=function f(){var g=d.getWindow();return("devicePixelRatio" in g&&g.devicePixelRatio>=1.5)
}},{"./helpers/globals":100}],105:[function(f,g,c){var d=f("./isDesktop").original;
var j=f("./helpers/globals");var h=f("@marcom/ac-function/once");var b=600;function a(){var l=j.getWindow();
var k=l.screen.width;if(l.orientation&&l.screen.height<k){k=l.screen.height}return(!d()&&k>=b)
}g.exports=h(a);g.exports.original=a},{"./helpers/globals":100,"./isDesktop":102,"@marcom/ac-function/once":127}],106:[function(c,d,a){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function b(){var k=g.getWindow();var j=false;
try{j=!!(k.localStorage&&k.localStorage.non_existent!==null)}catch(h){}return j
}d.exports=f(b);d.exports.original=b},{"./helpers/globals":100,"@marcom/ac-function/once":127}],107:[function(b,c,a){var g=b("./helpers/globals");
var d=b("@marcom/ac-function/once");function f(){var h=g.getWindow();return("HTMLMediaElement" in h)
}c.exports=d(f);c.exports.original=f},{"./helpers/globals":100,"@marcom/ac-function/once":127}],108:[function(c,d,b){c("@marcom/ac-polyfills/matchMedia");
var g=c("./helpers/globals");var f=c("@marcom/ac-function/once");function a(){var j=g.getWindow();
var h=j.matchMedia("only all");return !!(h&&h.matches)}d.exports=f(a);d.exports.original=a
},{"./helpers/globals":100,"@marcom/ac-function/once":127,"@marcom/ac-polyfills/matchMedia":156}],109:[function(b,c,a){arguments[4][18][0].apply(a,arguments)
},{"./shared/camelCasedEventTypes":112,"./shared/prefixHelper":114,"./shared/windowFallbackEventTypes":117,"./utils/eventTypeAvailable":118,dup:18}],110:[function(b,c,a){arguments[4][48][0].apply(a,arguments)
},{"./shared/getStyleTestElement":113,"./shared/prefixHelper":114,"./shared/stylePropertyCache":115,"./utils/toCSS":119,"./utils/toDOM":120,dup:48}],111:[function(b,c,a){arguments[4][49][0].apply(a,arguments)
},{"./getStyleProperty":110,"./shared/prefixHelper":114,"./shared/stylePropertyCache":115,"./shared/styleValueAvailable":116,dup:49}],112:[function(b,c,a){arguments[4][19][0].apply(a,arguments)
},{dup:19}],113:[function(b,c,a){arguments[4][50][0].apply(a,arguments)},{dup:50}],114:[function(b,c,a){arguments[4][20][0].apply(a,arguments)
},{dup:20}],115:[function(b,c,a){arguments[4][52][0].apply(a,arguments)},{dup:52}],116:[function(b,c,a){arguments[4][53][0].apply(a,arguments)
},{"./getStyleTestElement":113,"./stylePropertyCache":115,dup:53}],117:[function(b,c,a){arguments[4][21][0].apply(a,arguments)
},{dup:21}],118:[function(b,c,a){arguments[4][22][0].apply(a,arguments)},{dup:22}],119:[function(b,c,a){arguments[4][55][0].apply(a,arguments)
},{dup:55}],120:[function(b,c,a){arguments[4][56][0].apply(a,arguments)},{dup:56}],121:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var k=g.getWindow();var h=false;
try{if("sessionStorage" in k&&typeof k.sessionStorage.setItem==="function"){k.sessionStorage.setItem("ac_feature","test");
h=true;k.sessionStorage.removeItem("ac_feature","test")}}catch(j){}return h}d.exports=f(a);
d.exports.original=a},{"./helpers/globals":100,"@marcom/ac-function/once":127}],122:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var h=g.getDocument();return !!h.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":100,"@marcom/ac-function/once":127}],123:[function(b,c,a){var g=b("@marcom/ac-prefixer/getStyleValue");
var d=b("@marcom/ac-function/once");function f(){return !!(g("perspective","1px")&&g("transform","translateZ(0)"))
}c.exports=d(f);c.exports.original=f},{"@marcom/ac-function/once":127,"@marcom/ac-prefixer/getStyleValue":111}],124:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var k=g.getWindow();var h=g.getDocument();
var j=g.getNavigator();return !!(("ontouchstart" in k)||(k.DocumentTouch&&h instanceof k.DocumentTouch)||(j.maxTouchPoints>0)||(j.msMaxTouchPoints>0))
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":100,"@marcom/ac-function/once":127}],125:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var h=g.getDocument();var j=h.createElement("canvas");
if(typeof j.getContext==="function"){return !!(j.getContext("webgl")||j.getContext("experimental-webgl"))
}return false}d.exports=f(a);d.exports.original=a},{"./helpers/globals":100,"@marcom/ac-function/once":127}],126:[function(c,d,b){var a=function(){var h="";
var g;for(g=0;g<arguments.length;g++){if(g>0){h+=","}h+=arguments[g]}return h};
d.exports=function f(j,h){h=h||a;var g=function(){var k=arguments;var l=h.apply(this,k);
if(!(l in g.cache)){g.cache[l]=j.apply(this,k)}return g.cache[l]};g.cache={};return g
}},{}],127:[function(b,c,a){c.exports=function d(g){var f;return function(){if(typeof f==="undefined"){f=g.apply(this,arguments)
}return f}}},{}],128:[function(b,c,a){c.exports=function d(f,h){var g=null;return function(){if(g===null){f.apply(this,arguments);
g=setTimeout(function(){g=null},h)}}}},{}],129:[function(d,c,g){var n=d("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var k=d("@marcom/ac-dom-events/utils/addEventListener");var b=d("@marcom/ac-dom-events/utils/removeEventListener");
var j=d("@marcom/ac-object/create");var f=d("@marcom/ac-keyboard/internal/KeyEvent");
var l="keydown";var m="keyup";function a(){this._keysDown={};this._DOMKeyDown=this._DOMKeyDown.bind(this);
this._DOMKeyUp=this._DOMKeyUp.bind(this);k(document,l,this._DOMKeyDown,true);k(document,m,this._DOMKeyUp,true);
n.call(this)}var h=a.prototype=j(n.prototype);h.onDown=function(o,p){return this.on(l+":"+o,p)
};h.onceDown=function(o,p){return this.once(l+":"+o,p)};h.offDown=function(o,p){return this.off(l+":"+o,p)
};h.onUp=function(o,p){return this.on(m+":"+o,p)};h.onceUp=function(o,p){return this.once(m+":"+o,p)
};h.offUp=function(o,p){return this.off(m+":"+o,p)};h.isDown=function(o){o+="";
return this._keysDown[o]||false};h.isUp=function(o){return !this.isDown(o)};h.destroy=function(){this._keysDown=null;
b(document,l,this._DOMKeyDown);b(document,m,this._DOMKeyUp);n.prototype.destroy.call(this);
return this};h._DOMKeyDown=function(p){var o=this._normalizeKeyboardEvent(p);var q=o.keyCode+="";
this._trackKeyDown(q);this.trigger(l+":"+q,o)};h._DOMKeyUp=function(p){var o=this._normalizeKeyboardEvent(p);
var q=o.keyCode+="";this._trackKeyUp(q);this.trigger(m+":"+q,o)};h._normalizeKeyboardEvent=function(o){return new f(o)
};h._trackKeyUp=function(o){if(this._keysDown[o]){this._keysDown[o]=false}};h._trackKeyDown=function(o){if(!this._keysDown[o]){this._keysDown[o]=true
}};c.exports=a},{"@marcom/ac-dom-events/utils/addEventListener":29,"@marcom/ac-dom-events/utils/removeEventListener":31,"@marcom/ac-event-emitter-micro":90,"@marcom/ac-keyboard/internal/KeyEvent":131,"@marcom/ac-object/create":134}],130:[function(c,d,b){var a=c("./Keyboard");
d.exports=new a()},{"./Keyboard":129}],131:[function(c,d,b){var a=["keyLocation"];
function f(g){this.originalEvent=g;var h;for(h in g){if(a.indexOf(h)===-1&&typeof g[h]!=="function"){this[h]=g[h]
}}this.location=(this.originalEvent.location!==undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}f.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};d.exports=f},{}],132:[function(b,c,a){c.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],133:[function(c,d,b){c("@marcom/ac-polyfills/Array/isArray");var h=c("./extend");
var a=Object.prototype.hasOwnProperty;var f=function(j,k){var l;for(l in k){if(a.call(k,l)){if(k[l]===null){j[l]=null
}else{if(typeof k[l]==="object"){j[l]=Array.isArray(k[l])?[]:{};f(j[l],k[l])}else{j[l]=k[l]
}}}}return j};d.exports=function g(k,j){if(j){return f({},k)}return h({},k)}},{"./extend":136,"@marcom/ac-polyfills/Array/isArray":146}],134:[function(b,d,a){var f=function(){};
d.exports=function c(g){if(arguments.length>1){throw new Error("Second argument not supported")
}if(g===null||typeof g!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(g)}else{f.prototype=g;
return new f()}}},{}],135:[function(b,c,a){var f=b("./extend");c.exports=function d(h,g){if(typeof h!=="object"){throw new TypeError("defaults: must provide a defaults object")
}g=g||{};if(typeof g!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return f({},h,g)}},{"./extend":136}],136:[function(c,d,b){c("@marcom/ac-polyfills/Array/prototype.forEach");
var a=Object.prototype.hasOwnProperty;d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]
}else{h=[].slice.call(arguments)}g=h.shift();h.forEach(function(k){if(k!=null){for(var j in k){if(a.call(k,j)){g[j]=k[j]
}}}});return g}},{"@marcom/ac-polyfills/Array/prototype.forEach":149}],137:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(j){if(Object.getPrototypeOf){return Object.getPrototypeOf(j)
}else{if(typeof j!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return j.__proto__}else{var g=j.constructor;
var h;if(a.call(j,"constructor")){h=g;if(!(delete j.constructor)){return null}g=j.constructor;
j.constructor=h}return g?g.prototype:null}}}}},{}],138:[function(b,c,a){c.exports={clone:b("./clone"),create:b("./create"),defaults:b("./defaults"),extend:b("./extend"),getPrototypeOf:b("./getPrototypeOf"),isDate:b("./isDate"),isEmpty:b("./isEmpty"),isRegExp:b("./isRegExp"),toQueryParameters:b("./toQueryParameters")}
},{"./clone":133,"./create":134,"./defaults":135,"./extend":136,"./getPrototypeOf":137,"./isDate":139,"./isEmpty":140,"./isRegExp":141,"./toQueryParameters":143}],139:[function(b,d,a){d.exports=function c(f){return Object.prototype.toString.call(f)==="[object Date]"
}},{}],140:[function(c,d,b){var a=Object.prototype.hasOwnProperty;d.exports=function f(g){var h;
if(typeof g!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(h in g){if(a.call(g,h)){return false}}return true}},{}],141:[function(c,d,b){d.exports=function a(f){return window.RegExp?f instanceof RegExp:false
}},{}],142:[function(j,c,y){var t=Object.prototype.toString;var m=Object.prototype.hasOwnProperty;
var b=typeof Array.prototype.indexOf==="function"?function(A,B){return A.indexOf(B)
}:function(A,C){for(var B=0;B<A.length;B++){if(A[B]===C){return B}}return -1};var l=Array.isArray||function(A){return t.call(A)=="[object Array]"
};var w=Object.keys||function(C){var A=[];for(var B in C){if(C.hasOwnProperty(B)){A.push(B)
}}return A};var v=typeof Array.prototype.forEach==="function"?function(A,B){return A.forEach(B)
}:function(A,C){for(var B=0;B<A.length;B++){C(A[B])}};var n=function(A,E,B){if(typeof A.reduce==="function"){return A.reduce(E,B)
}var D=B;for(var C=0;C<A.length;C++){D=E(D,A[C])}return D};var z=/^[0-9]+$/;function d(D,C){if(D[C].length==0){return D[C]={}
}var B={};for(var A in D[C]){if(m.call(D[C],A)){B[A]=D[C][A]}}D[C]=B;return B}function r(E,C,B,F){var A=E.shift();
if(m.call(Object.prototype,B)){return}if(!A){if(l(C[B])){C[B].push(F)}else{if("object"==typeof C[B]){C[B]=F
}else{if("undefined"==typeof C[B]){C[B]=F}else{C[B]=[C[B],F]}}}}else{var D=C[B]=C[B]||[];
if("]"==A){if(l(D)){if(""!=F){D.push(F)}}else{if("object"==typeof D){D[w(D).length]=F
}else{D=C[B]=[C[B],F]}}}else{if(~b(A,"]")){A=A.substr(0,A.length-1);if(!z.test(A)&&l(D)){D=d(C,B)
}r(E,D,A,F)}else{if(!z.test(A)&&l(D)){D=d(C,B)}r(E,D,A,F)}}}}function f(E,D,H){if(~b(D,"]")){var G=D.split("["),A=G.length,F=A-1;
r(G,E,"base",H)}else{if(!z.test(D)&&l(E.base)){var C={};for(var B in E.base){C[B]=E.base[B]
}E.base=C}o(E.base,D,H)}return E}function p(D){if("object"!=typeof D){return D}if(l(D)){var A=[];
for(var C in D){if(m.call(D,C)){A.push(D[C])}}return A}for(var B in D){D[B]=p(D[B])
}return D}function g(B){var A={base:{}};v(w(B),function(C){f(A,C,B[C])});return p(A.base)
}function h(B){var A=n(String(B).split("&"),function(C,G){var H=b(G,"="),F=u(G),D=G.substr(0,F||H),E=G.substr(F||H,G.length),E=E.substr(b(E,"=")+1,E.length);
if(""==D){D=G,E=""}if(""==D){return C}return f(C,q(D),q(E))},{base:{}}).base;return p(A)
}y.parse=function(A){if(null==A||""==A){return{}}return"object"==typeof A?g(A):h(A)
};var s=y.stringify=function(B,A){if(l(B)){return k(B,A)}else{if("[object Object]"==t.call(B)){return x(B,A)
}else{if("string"==typeof B){return a(B,A)}else{return A+"="+encodeURIComponent(String(B))
}}}};function a(B,A){if(!A){throw new TypeError("stringify expects an object")}return A+"="+encodeURIComponent(B)
}function k(A,D){var B=[];if(!D){throw new TypeError("stringify expects an object")
}for(var C=0;C<A.length;C++){B.push(s(A[C],D+"["+C+"]"))}return B.join("&")}function x(G,F){var B=[],E=w(G),D;
for(var C=0,A=E.length;C<A;++C){D=E[C];if(""==D){continue}if(null==G[D]){B.push(encodeURIComponent(D)+"=")
}else{B.push(s(G[D],F?F+"["+encodeURIComponent(D)+"]":encodeURIComponent(D)))}}return B.join("&")
}function o(C,B,D){var A=C[B];if(m.call(Object.prototype,B)){return}if(undefined===A){C[B]=D
}else{if(l(A)){A.push(D)}else{C[B]=[A,D]}}}function u(D){var A=D.length,C,E;for(var B=0;
B<A;++B){E=D[B];if("]"==E){C=false}if("["==E){C=true}if("="==E&&!C){return B}}}function q(B){try{return decodeURIComponent(B.replace(/\+/g," "))
}catch(A){return B}}},{}],143:[function(c,f,b){var a=c("qs");f.exports=function d(g){if(typeof g!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return a.stringify(g)}},{qs:142}],144:[function(b,c,a){c.exports={PageVisibilityManager:b("./ac-page-visibility/PageVisibilityManager")}
},{"./ac-page-visibility/PageVisibilityManager":145}],145:[function(c,f,b){var d=c("@marcom/ac-object/create");
var h=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;function a(){if(typeof document.addEventListener==="undefined"){return
}var j;if(typeof document.hidden!=="undefined"){this._hidden="hidden";j="visibilitychange"
}else{if(typeof document.mozHidden!=="undefined"){this._hidden="mozHidden";j="mozvisibilitychange"
}else{if(typeof document.msHidden!=="undefined"){this._hidden="msHidden";j="msvisibilitychange"
}else{if(typeof document.webkitHidden!=="undefined"){this._hidden="webkitHidden";
j="webkitvisibilitychange"}}}}if(typeof document[this._hidden]==="undefined"){this.isHidden=false
}else{this.isHidden=document[this._hidden]}if(j){document.addEventListener(j,this._handleVisibilityChange.bind(this),false)
}h.call(this)}var g=a.prototype=d(h.prototype);g.CHANGED="changed";g._handleVisibilityChange=function(j){this.isHidden=document[this._hidden];
this.trigger(this.CHANGED,{isHidden:this.isHidden})};f.exports=new a()},{"@marcom/ac-event-emitter-micro":90,"@marcom/ac-object/create":134}],146:[function(b,c,a){if(!Array.isArray){Array.isArray=function(d){return Object.prototype.toString.call(d)==="[object Array]"
}}},{}],147:[function(b,c,a){if(!Array.prototype.every){Array.prototype.every=function d(k,j){var h=Object(this);
var f=h.length>>>0;var g;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(g=0;g<f;g+=1){if(g in h&&!k.call(j,h[g],g,h)){return false}}return true}}},{}],148:[function(b,c,a){if(!Array.prototype.filter){Array.prototype.filter=function d(l,k){var j=Object(this);
var f=j.length>>>0;var h;var g=[];if(typeof l!=="function"){throw new TypeError(l+" is not a function")
}for(h=0;h<f;h+=1){if(h in j&&l.call(k,j[h],h,j)){g.push(j[h])}}return g}}},{}],149:[function(b,c,a){if(!Array.prototype.forEach){Array.prototype.forEach=function d(k,j){var h=Object(this);
var f;var g;if(typeof k!=="function"){throw new TypeError("No function object passed to forEach.")
}for(f=0;f<this.length;f+=1){g=h[f];k.call(j,g,f,h)}}}},{}],150:[function(b,c,a){if(!Array.prototype.indexOf){Array.prototype.indexOf=function d(g,h){var j=h||0;
var f=0;if(j<0){j=this.length+h-1;if(j<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(f=0;f<this.length;f++){if(this[f]===g){return f}}return(-1)}}},{}],151:[function(b,c,a){(function(){var d=Array.prototype.slice;
try{d.call(document.documentElement)}catch(f){Array.prototype.slice=function(n,j){j=(typeof j!=="undefined")?j:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return d.call(this,n,j)
}var l,h=[],k,g=this.length;var o=n||0;o=(o>=0)?o:g+o;var m=(j)?j:g;if(j<0){m=g+j
}k=m-o;if(k>0){h=new Array(k);if(this.charAt){for(l=0;l<k;l++){h[l]=this.charAt(o+l)
}}else{for(l=0;l<k;l++){h[l]=this[o+l]}}}return h}}}())},{}],152:[function(b,c,a){if(!Array.prototype.some){Array.prototype.some=function d(k,j){var g=Object(this);
var f=g.length>>>0;var h;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(h=0;h<f;h+=1){if(h in g&&k.call(j,g[h],h,g)===true){return true}}return false
}}},{}],153:[function(b,c,a){if(document.createEvent){try{new window.CustomEvent("click")
}catch(d){window.CustomEvent=(function(){function f(h,j){j=j||{bubbles:false,cancelable:false,detail:undefined};
var g=document.createEvent("CustomEvent");g.initCustomEvent(h,j.bubbles,j.cancelable,j.detail);
return g}f.prototype=window.Event.prototype;return f}())}}},{}],154:[function(b,c,a){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self){if(!("classList" in document.createElement("_"))){(function(o){if(!("Element" in o)){return
}var d="classList",k="prototype",r=o.Element[k],f=Object,p=String[k].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},g=Array[k].indexOf||function(v){var u=0,t=this.length;for(;u<t;u++){if(u in this&&this[u]===v){return u
}}return -1},s=function(t,u){this.name=t;this.code=DOMException[t];this.message=u
},l=function(u,t){if(t===""){throw new s("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(t)){throw new s("INVALID_CHARACTER_ERR","String contains an invalid character")
}return g.call(u,t)},h=function(x){var w=p.call(x.getAttribute("class")||""),v=w?w.split(/\s+/):[],u=0,t=v.length;
for(;u<t;u++){this.push(v[u])}this._updateClassName=function(){x.setAttribute("class",this.toString())
}},j=h[k]=[],n=function(){return new h(this)};s[k]=Error[k];j.item=function(t){return this[t]||null
};j.contains=function(t){t+="";return l(this,t)!==-1};j.add=function(){var x=arguments,w=0,u=x.length,v,t=false;
do{v=x[w]+"";if(l(this,v)===-1){this.push(v);t=true}}while(++w<u);if(t){this._updateClassName()
}};j.remove=function(){var y=arguments,x=0,u=y.length,w,t=false,v;do{w=y[x]+"";
v=l(this,w);while(v!==-1){this.splice(v,1);t=true;v=l(this,w)}}while(++x<u);if(t){this._updateClassName()
}};j.toggle=function(u,v){u+="";var t=this.contains(u),w=t?v!==true&&"remove":v!==false&&"add";
if(w){this[w](u)}if(v===true||v===false){return v}else{return !t}};j.toString=function(){return this.join(" ")
};if(f.defineProperty){var q={get:n,enumerable:true,configurable:true};try{f.defineProperty(r,d,q)
}catch(m){if(m.number===-2146823252){q.enumerable=false;f.defineProperty(r,d,q)
}}}else{if(f[k].__defineGetter__){r.__defineGetter__(d,n)}}}(self))}else{(function(){var f=document.createElement("_");
f.classList.add("c1","c2");if(!f.classList.contains("c2")){var g=function(j){var h=DOMTokenList.prototype[j];
DOMTokenList.prototype[j]=function(m){var l,k=arguments.length;for(l=0;l<k;l++){m=arguments[l];
h.call(this,m)}}};g("add");g("remove")}f.classList.toggle("c3",false);if(f.classList.contains("c3")){var d=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(h,j){if(1 in arguments&&!this.contains(h)===!j){return j
}else{return d.call(this,h)}}}f=null}())}}},{}],155:[function(b,c,a){if(!Function.prototype.bind){Function.prototype.bind=function(d){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var j=Array.prototype.slice.call(arguments,1);var h=this;var f=function(){};var g=function(){return h.apply((this instanceof f&&d)?this:d,j.concat(Array.prototype.slice.call(arguments)))
};f.prototype=this.prototype;g.prototype=new f();return g}}},{}],156:[function(b,c,a){window.matchMedia=window.matchMedia||(function(j,k){var g,d=j.documentElement,f=d.firstElementChild||d.firstChild,h=j.createElement("body"),l=j.createElement("div");
l.id="mq-test-1";l.style.cssText="position:absolute;top:-100em";h.style.background="none";
h.appendChild(l);return function(m){l.innerHTML='&shy;<style media="'+m+'"> #mq-test-1 { width:42px; }</style>';
d.insertBefore(h,f);g=l.offsetWidth===42;d.removeChild(h);return{matches:g,media:m}
}}(document))},{}],157:[function(b,c,a){(function(){var f=0;var g=["ms","moz","webkit","o"];
for(var d=0;d<g.length&&!window.requestAnimationFrame;++d){window.requestAnimationFrame=window[g[d]+"RequestAnimationFrame"];
window.cancelAnimationFrame=window[g[d]+"CancelAnimationFrame"]||window[g[d]+"CancelRequestAnimationFrame"]
}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(m,j){var h=Date.now();
var k=Math.max(0,16-(h-f));var l=window.setTimeout(function(){m(h+k)},k);f=h+k;
return l}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(h){clearTimeout(h)
}}}())},{}],158:[function(c,d,b){var g=c("./ac-clock/Clock"),f=c("./ac-clock/ThrottledClock"),a=c("./ac-clock/sharedClockInstance");
a.Clock=g;a.ThrottledClock=f;d.exports=a},{"./ac-clock/Clock":159,"./ac-clock/ThrottledClock":160,"./ac-clock/sharedClockInstance":161}],159:[function(c,d,b){c("@marcom/ac-polyfills/Function/prototype.bind");
c("@marcom/ac-polyfills/requestAnimationFrame");var g;var f=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var a=new Date().getTime();function h(){f.call(this);this.lastFrameTime=null;this._animationFrame=null;
this._active=false;this._startTime=null;this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);
this._getTime=Date.now||function(){return new Date().getTime()}}g=h.prototype=new f(null);
g.start=function(){if(this._active){return}this._tick()};g.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};g.destroy=function(){this.stop();
this.off();var j;for(j in this){if(this.hasOwnProperty(j)){this[j]=null}}};g.isRunning=function(){return this._active
};g._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};g._onAnimationFrame=function(m){var n=0;var j=this._getTime();if(this.lastFrameTime===null){this.lastFrameTime=j-a
}else{n=m-this.lastFrameTime}var l=0,k;if(n!==0){l=1000/n}k={time:m,delta:n,fps:l,naturalFps:l,timeNow:j};
this.trigger("update",k);this.trigger("draw",k);this._animationFrame=null;this.lastFrameTime=m;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};d.exports=h
},{"@marcom/ac-event-emitter-micro":90,"@marcom/ac-polyfills/Function/prototype.bind":155,"@marcom/ac-polyfills/requestAnimationFrame":157}],160:[function(c,d,b){c("@marcom/ac-polyfills/requestAnimationFrame");
var g;var a=c("./sharedClockInstance"),f=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
function h(k,j){if(k===null){return}f.call(this);j=j||{};this._fps=k||null;this._clock=j.clock||a;
this._lastThrottledTime=null;this._clockEvent=null;this._boundOnClockDraw=this._onClockDraw.bind(this);
this._boundOnClockUpdate=this._onClockUpdate.bind(this);this._clock.on("update",this._boundOnClockUpdate)
}g=h.prototype=new f(null);g.setFps=function(j){this._fps=j;return this};g.getFps=function(){return this._fps
};g.start=function(){this._clock.start();return this};g.stop=function(){this._clock.stop();
return this};g.isRunning=function(){return this._clock.isRunning()};g.destroy=function(){this._clock.off("update",this._boundOnClockUpdate);
this._clock.destroy.call(this)};g._onClockUpdate=function(j){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var k=j.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(k<(1000/this._fps)){return}this._clockEvent=j;this._clockEvent.delta=k;this._clockEvent.fps=1000/k;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._boundOnClockDraw);
this.trigger("update",this._clockEvent)};g._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};d.exports=h},{"./sharedClockInstance":161,"@marcom/ac-event-emitter-micro":90,"@marcom/ac-polyfills/requestAnimationFrame":157}],161:[function(b,c,a){var d=b("./Clock");
c.exports=new d()},{"./Clock":159}],162:[function(b,c,a){c.exports={Clip:b("./ac-clip/Clip")}
},{"./ac-clip/Clip":163}],163:[function(c,b,d){c("@marcom/ac-polyfills/Array/isArray");
var g=c("@marcom/ac-object/create");var m=c("@marcom/ac-easing").createPredefined;
var a=c("@marcom/ac-clock");var k=c("@marcom/ac-easing").Ease;var l=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var j="ease";function h(p,o,r,n){n=n||{};this._options=n;this._isYoyo=n.yoyo;this._direction=1;
this._timeScale=1;this._loop=n.loop||0;this._loopCount=0;this._target=p;this.duration(o);
this._delay=(n.delay||0)*1000;this._remainingDelay=this._delay;this._progress=0;
this._clock=n.clock||a;this._playing=false;this._getTime=Date.now||function(){return new Date().getTime()
};this._propsTo=r||{};this._propsFrom=n.propsFrom||{};this._onStart=n.onStart||null;
this._onUpdate=n.onUpdate||null;this._onDraw=n.onDraw||null;this._onComplete=n.onComplete||null;
var q=n.ease||j;this._ease=(typeof q==="function")?new k(q):m(q);this._start=this._start.bind(this);
this._update=this._update.bind(this);this._draw=this._draw.bind(this);this._isPrepared=false;
h._add(this);l.call(this)}var f=h.prototype=g(l.prototype);h.COMPLETE="complete";
h.PAUSE="pause";h.PLAY="play";f.play=function(){if(!this._playing){this._playing=true;
if(this._delay===0||this._remainingDelay===0){this._start()}else{if(!this._isPrepared){this._setDiff();
this._updateProps()}this._startTimeout=setTimeout(this._start,this._remainingDelay/this._timeScale);
this._delayStart=this._getTime()}}return this};f.pause=function(){if(this._playing){if(this._startTimeout){this._remainingDelay=this._getTime()-this._delayStart;
clearTimeout(this._startTimeout)}this._stop();this.trigger(h.PAUSE,this)}return this
};f.destroy=function(){this.pause();this._options=null;this._target=null;this._storeTarget=null;
this._ease=null;this._clock=null;this._propsTo=null;this._propsFrom=null;this._storePropsTo=null;
this._storePropsFrom=null;this._propsDiff=null;this._propsEase=null;this._onStart=null;
this._onUpdate=null;this._onDraw=null;this._onComplete=null;h._remove(this);l.prototype.destroy.call(this);
return this};f.reset=function(){if(!this._isPrepared){return}this._stop();this._resetLoop(this._target,this._storeTarget);
this._direction=1;this._loop=this._options.loop||0;this._loopCount=0;this._propsFrom=this._storePropsFrom;
this._propsTo=this._storePropsTo;this._progress=0;this._setStartTime();if(this._onUpdate){this._onUpdate.call(this,this)
}if(this._onDraw){this._onDraw.call(this,this)}return this};f.playing=function(){return this._playing
};f.target=function(){return this._target};f.duration=function(n){if(n!==undefined){this._duration=n;
this._durationMs=(n*1000)/this._timeScale;if(this._playing){this._setStartTime()
}}return this._duration};f.timeScale=function(n){if(n!==undefined){this._timeScale=n;
this.duration(this._duration)}return this._timeScale};f.currentTime=function(n){if(n!==undefined){return this.progress(n/this._duration)*this._duration
}return(this.progress()*this._duration)};f.progress=function(n){if(n!==undefined){this._progress=Math.min(1,Math.max(0,n));
this._setStartTime();if(!this._isPrepared){this._setDiff()}if(this._playing&&n===1){this._completeProps();
if(this._onUpdate){this._onUpdate.call(this,this)}if(this._onDraw){this._onDraw.call(this,this)
}this._complete()}else{this._updateProps();if(this._onUpdate){this._onUpdate.call(this,this)
}if(this._onDraw){this._onDraw.call(this,this)}}}return this._progress};f._resetLoop=function(o,n){var p;
for(p in n){if(n.hasOwnProperty(p)){if(n[p]!==null){if(typeof n[p]==="object"){this._resetLoop(o[p],n[p])
}else{o[p]=n[p]}}}}};f._cloneObjects=function(){var p={};var o={};var n={};this._cloneObjectsLoop(this._target,this._propsTo,this._propsFrom,p,o,n);
return{target:p,propsTo:o,propsFrom:n}};f._cloneObjectsLoop=function(q,u,t,s,o,n){var p;
var r;for(r in t){if(t.hasOwnProperty(r)&&u[r]===undefined&&q[r]!==undefined){s[r]=q[r];
o[r]=q[r];n[r]=t[r]}}for(r in u){if(q.hasOwnProperty(r)){p=typeof q[r];if(q[r]!==null&&p==="object"){if(Array.isArray(q[r])){s[r]=[];
o[r]=[];n[r]=[]}else{s[r]={};o[r]={};n[r]={}}this._cloneObjectsLoop(q[r],u[r]||{},t[r]||{},s[r],o[r],n[r])
}else{if(u[r]!==null&&p==="number"){s[r]=q[r];o[r]=u[r];if(t&&t[r]!==undefined){n[r]=t[r]
}}}}}};f._prepareProperties=function(){if(!this._isPrepared){var n=this._cloneObjects();
this._storeTarget=n.target;this._propsTo=n.propsTo;this._storePropsTo=this._propsTo;
this._propsFrom=n.propsFrom;this._storePropsFrom=this._propsFrom;this._isPrepared=true
}};f._setStartTime=function(){this._startTime=this._getTime()-(this.progress()*this._durationMs)
};f._setDiff=function(){if(!this._isPrepared){this._prepareProperties()}this._propsDiff={};
this._setDiffLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff)};
f._setDiffLoop=function(s,r,p,o){var n;var q;for(q in s){if(s.hasOwnProperty(q)){n=typeof s[q];
if(s[q]!==null&&n==="object"){r[q]=r[q]||{};o[q]=o[q]||{};this._setDiffLoop(s[q],r[q],p[q],o[q])
}else{if(n==="number"&&p[q]!==undefined){if(r[q]!==undefined){p[q]=r[q]}else{r[q]=p[q]
}o[q]=s[q]-p[q]}else{s[q]=null;r[q]=null}}}}};f._start=function(){this._startTimeout=null;
this._remainingDelay=0;this._setStartTime();this._clock.on("update",this._update);
this._clock.on("draw",this._draw);if(!this._clock.isRunning()){this._clock.start()
}this._setDiff();this._playing=true;this._running=true;if(this._onStart){this._onStart.call(this,this)
}this.trigger(h.PLAY,this)};f._stop=function(){this._playing=false;this._running=false;
this._clock.off("update",this._update);this._clock.off("draw",this._draw)};f._updateProps=function(){var n;
if(this._direction===1){n=this._ease.getValue(this._progress)}else{n=1-this._ease.getValue(1-this._progress)
}this._updatePropsLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff,n)
};f._updatePropsLoop=function(s,r,p,o,n){var q;for(q in s){if(s.hasOwnProperty(q)&&s[q]!==null){if(typeof s[q]!=="number"){this._updatePropsLoop(s[q],r[q],p[q],o[q],n)
}else{p[q]=r[q]+(o[q]*n)}}}};f._completeProps=function(){this._completePropsLoop(this._propsTo,this._target)
};f._completePropsLoop=function(p,n){var o;for(o in p){if(p.hasOwnProperty(o)&&p[o]!==null){if(typeof p[o]!=="number"){this._completePropsLoop(p[o],n[o])
}else{n[o]=p[o]}}}};f._complete=function(){if(this._isYoyo&&((this._loop>0&&this._loopCount<=this._loop)||(this._loop===0&&this._loopCount===0))){this._propsFrom=(this._direction===1)?this._storePropsTo:this._storePropsFrom;
this._propsTo=(this._direction===1)?this._storePropsFrom:this._storePropsTo;this._direction*=-1;
if(this._direction===-1){++this._loopCount}this.progress(0);this._start()}else{if(this._loopCount<this._loop){++this._loopCount;
this.progress(0);this._start()}else{this.trigger(h.COMPLETE,this);if(this._onComplete){this._onComplete.call(this,this)
}if(this._options&&this._options.destroyOnComplete){this.destroy()}}}};f._update=function(n){if(this._running){this._progress=(n.timeNow-this._startTime)/this._durationMs;
if(this._progress>=1){this._progress=1;this._running=false;this._completeProps()
}else{this._updateProps()}if(this._onUpdate){this._onUpdate.call(this,this)}}};
f._draw=function(n){if(this._onDraw){this._onDraw.call(this,this)}if(!this._running){this._stop();
if(this._progress===1){this._complete()}}};h._instantiate=function(){this._clips=[];
return this};h._add=function(n){this._clips.push(n)};h._remove=function(o){var n=this._clips.indexOf(o);
if(n>-1){this._clips.splice(n,1)}};h.getAll=function(p){if(p!==undefined){var n=[];
var o=this._clips.length;while(o--){if(this._clips[o].target()===p){n.push(this._clips[o])
}}return n}return Array.prototype.slice.call(this._clips)};h.destroyAll=function(p){var n=this.getAll(p);
if(this._clips.length===n.length){this._clips=[]}var o=n.length;while(o--){n[o].destroy()
}return n};h.to=function(p,o,q,n){n=n||{};if(n.destroyOnComplete===undefined){n.destroyOnComplete=true
}return new h(p,o,q,n).play()};h.from=function(q,p,n,o){o=o||{};o.propsFrom=n;if(o.destroyOnComplete===undefined){o.destroyOnComplete=true
}return new h(q,p,o.propsTo,o).play()};b.exports=h._instantiate()},{"@marcom/ac-clock":158,"@marcom/ac-easing":184,"@marcom/ac-event-emitter-micro":90,"@marcom/ac-object/create":134,"@marcom/ac-polyfills/Array/isArray":146}],164:[function(b,c,a){var d=b("./ac-color/Color");
d.decimalToHex=b("./ac-color/static/decimalToHex");d.hexToDecimal=b("./ac-color/static/hexToDecimal");
d.hexToRgb=b("./ac-color/static/hexToRgb");d.isColor=b("./ac-color/static/isColor");
d.isHex=b("./ac-color/static/isHex");d.isRgb=b("./ac-color/static/isRgb");d.isRgba=b("./ac-color/static/isRgba");
d.mixColors=b("./ac-color/static/mixColors");d.rgbaToArray=b("./ac-color/static/rgbaToArray");
d.rgbToArray=b("./ac-color/static/rgbToArray");d.rgbToDecimal=b("./ac-color/static/rgbToDecimal");
d.rgbToHex=b("./ac-color/static/rgbToHex");d.rgbToHsl=b("./ac-color/static/rgbToHsl");
d.rgbToHsv=b("./ac-color/static/rgbToHsv");d.rgbaToObject=b("./ac-color/static/rgbaToObject");
d.rgbToObject=b("./ac-color/static/rgbToObject");d.shortToLongHex=b("./ac-color/static/shortToLongHex");
c.exports={Color:d}},{"./ac-color/Color":165,"./ac-color/static/decimalToHex":167,"./ac-color/static/hexToDecimal":168,"./ac-color/static/hexToRgb":169,"./ac-color/static/isColor":170,"./ac-color/static/isHex":171,"./ac-color/static/isRgb":172,"./ac-color/static/isRgba":173,"./ac-color/static/mixColors":174,"./ac-color/static/rgbToArray":175,"./ac-color/static/rgbToDecimal":176,"./ac-color/static/rgbToHex":177,"./ac-color/static/rgbToHsl":178,"./ac-color/static/rgbToHsv":179,"./ac-color/static/rgbToObject":180,"./ac-color/static/rgbaToArray":181,"./ac-color/static/rgbaToObject":182,"./ac-color/static/shortToLongHex":183}],165:[function(d,a,r){var h=d("./helpers/cssColorNames");
var n=d("./static/hexToRgb");var m=d("./static/isColor");var f=d("./static/isHex");
var b=d("./static/isRgba");var q=d("./static/mixColors");var l=d("./static/rgbaToArray");
var o=d("./static/rgbToArray");var t=d("./static/rgbToDecimal");var j=d("./static/rgbToHex");
var c=d("./static/rgbaToObject");var k=d("./static/rgbToObject");var p=d("./static/shortToLongHex");
function s(u){if(!m(u)&&!h.nameToRgbObject[u]){throw new Error(u+" is not a supported color.")
}this._setColor(u)}var g=s.prototype;g._setColor=function(u){this._color={};if(f(u)){this._color.hex=p(u);
this._color.rgb={color:n(u)}}else{if(b(u)){this._color.rgba={color:u};var w=this.rgbaObject();
this._color.rgb={color:"rgb("+w.r+", "+w.g+", "+w.b+")"}}else{if(h.nameToRgbObject[u]){var v=h.nameToRgbObject[u];
this._color.rgb={object:v,color:"rgb("+v.r+", "+v.g+", "+v.b+")"}}else{this._color.rgb={color:u}
}}}};g.rgb=function(){return this._color.rgb.color};g.rgba=function(){if(this._color.rgba===undefined){var u=this.rgbObject();
this._color.rgba={color:"rgba("+u.r+", "+u.g+", "+u.b+", 1)"}}return this._color.rgba.color
};g.hex=function(){if(this._color.hex===undefined){this._color.hex=j.apply(this,this.rgbArray())
}return this._color.hex};g.decimal=function(){if(this._color.decimal===undefined){this._color.decimal=t(this.rgb())
}return this._color.decimal};g.cssName=function(){return h.rgbToName[this.rgb()]||null
};g.rgbArray=function(){if(this._color.rgb.array===undefined){this._color.rgb.array=o(this.rgb())
}return this._color.rgb.array};g.rgbaArray=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.array===undefined){this._color.rgba.array=l(this.rgba())}return this._color.rgba.array
};g.rgbObject=function(){if(this._color.rgb.object===undefined){this._color.rgb.object=k(this.rgb())
}return this._color.rgb.object};g.rgbaObject=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.object===undefined){this._color.rgba.object=c(this.rgba())
}return this._color.rgba.object};g.getRed=function(){return this.rgbObject().r};
g.getGreen=function(){return this.rgbObject().g};g.getBlue=function(){return this.rgbObject().b
};g.getAlpha=function(){if(this._color.rgba===undefined){return 1}return this.rgbaObject().a
};g.setRed=function(u){if(u!==this.getRed()){this._setColor("rgba("+u+", "+this.getGreen()+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().r};g.setGreen=function(u){if(u!==this.getGreen()){this._setColor("rgba("+this.getRed()+", "+u+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().g};g.setBlue=function(u){if(u!==this.getBlue()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+u+", "+this.getAlpha()+")")
}return this.rgbObject().b};g.setAlpha=function(u){if(u!==this.getAlpha()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+", "+u+")")
}return this.rgbaObject().a};g.mix=function(u,v){var w=k(q(this.rgb(),u,v));this._setColor("rgba("+w.r+", "+w.g+", "+w.b+", "+this.getAlpha()+")");
return this.rgb()};g.clone=function(){return new s(this.rgb())};a.exports=s},{"./helpers/cssColorNames":166,"./static/hexToRgb":169,"./static/isColor":170,"./static/isHex":171,"./static/isRgba":173,"./static/mixColors":174,"./static/rgbToArray":175,"./static/rgbToDecimal":176,"./static/rgbToHex":177,"./static/rgbToObject":180,"./static/rgbaToArray":181,"./static/rgbaToObject":182,"./static/shortToLongHex":183}],166:[function(b,c,a){var d={"rgb(240, 248, 255)":"aliceblue","rgb(250, 235, 215)":"antiquewhite","rgb(0, 0, 0)":"black","rgb(0, 0, 255)":"blue","rgb(0, 255, 255)":"cyan","rgb(0, 0, 139)":"darkblue","rgb(0, 139, 139)":"darkcyan","rgb(0, 100, 0)":"darkgreen","rgb(0, 206, 209)":"darkturquoise","rgb(0, 191, 255)":"deepskyblue","rgb(0, 128, 0)":"green","rgb(0, 255, 0)":"lime","rgb(0, 0, 205)":"mediumblue","rgb(0, 250, 154)":"mediumspringgreen","rgb(0, 0, 128)":"navy","rgb(0, 255, 127)":"springgreen","rgb(0, 128, 128)":"teal","rgb(25, 25, 112)":"midnightblue","rgb(30, 144, 255)":"dodgerblue","rgb(32, 178, 170)":"lightseagreen","rgb(34, 139, 34)":"forestgreen","rgb(46, 139, 87)":"seagreen","rgb(47, 79, 79)":"darkslategray","rgb(50, 205, 50)":"limegreen","rgb(60, 179, 113)":"mediumseagreen","rgb(64, 224, 208)":"turquoise","rgb(65, 105, 225)":"royalblue","rgb(70, 130, 180)":"steelblue","rgb(72, 61, 139)":"darkslateblue","rgb(72, 209, 204)":"mediumturquoise","rgb(75, 0, 130)":"indigo","rgb(85, 107, 47)":"darkolivegreen","rgb(95, 158, 160)":"cadetblue","rgb(100, 149, 237)":"cornflowerblue","rgb(102, 205, 170)":"mediumaquamarine","rgb(105, 105, 105)":"dimgray","rgb(106, 90, 205)":"slateblue","rgb(107, 142, 35)":"olivedrab","rgb(112, 128, 144)":"slategray","rgb(119, 136, 153)":"lightslategray","rgb(123, 104, 238)":"mediumslateblue","rgb(124, 252, 0)":"lawngreen","rgb(127, 255, 212)":"aquamarine","rgb(127, 255, 0)":"chartreuse","rgb(128, 128, 128)":"gray","rgb(128, 0, 0)":"maroon","rgb(128, 128, 0)":"olive","rgb(128, 0, 128)":"purple","rgb(135, 206, 250)":"lightskyblue","rgb(135, 206, 235)":"skyblue","rgb(138, 43, 226)":"blueviolet","rgb(139, 0, 139)":"darkmagenta","rgb(139, 0, 0)":"darkred","rgb(139, 69, 19)":"saddlebrown","rgb(143, 188, 143)":"darkseagreen","rgb(144, 238, 144)":"lightgreen","rgb(147, 112, 219)":"mediumpurple","rgb(148, 0, 211)":"darkviolet","rgb(152, 251, 152)":"palegreen","rgb(153, 50, 204)":"darkorchid","rgb(154, 205, 50)":"yellowgreen","rgb(160, 82, 45)":"sienna","rgb(165, 42, 42)":"brown","rgb(169, 169, 169)":"darkgray","rgb(173, 255, 47)":"greenyellow","rgb(173, 216, 230)":"lightblue","rgb(175, 238, 238)":"paleturquoise","rgb(176, 196, 222)":"lightsteelblue","rgb(176, 224, 230)":"powderblue","rgb(178, 34, 34)":"firebrick","rgb(184, 134, 11)":"darkgoldenrod","rgb(186, 85, 211)":"mediumorchid","rgb(188, 143, 143)":"rosybrown","rgb(189, 183, 107)":"darkkhaki","rgb(192, 192, 192)":"silver","rgb(199, 21, 133)":"mediumvioletred","rgb(205, 92, 92)":"indianred","rgb(205, 133, 63)":"peru","rgb(210, 105, 30)":"chocolate","rgb(210, 180, 140)":"tan","rgb(211, 211, 211)":"lightgray","rgb(216, 191, 216)":"thistle","rgb(218, 165, 32)":"goldenrod","rgb(218, 112, 214)":"orchid","rgb(219, 112, 147)":"palevioletred","rgb(220, 20, 60)":"crimson","rgb(220, 220, 220)":"gainsboro","rgb(221, 160, 221)":"plum","rgb(222, 184, 135)":"burlywood","rgb(224, 255, 255)":"lightcyan","rgb(230, 230, 250)":"lavender","rgb(233, 150, 122)":"darksalmon","rgb(238, 232, 170)":"palegoldenrod","rgb(238, 130, 238)":"violet","rgb(240, 255, 255)":"azure","rgb(240, 255, 240)":"honeydew","rgb(240, 230, 140)":"khaki","rgb(240, 128, 128)":"lightcoral","rgb(244, 164, 96)":"sandybrown","rgb(245, 245, 220)":"beige","rgb(245, 255, 250)":"mintcream","rgb(245, 222, 179)":"wheat","rgb(245, 245, 245)":"whitesmoke","rgb(248, 248, 255)":"ghostwhite","rgb(250, 250, 210)":"lightgoldenrodyellow","rgb(250, 240, 230)":"linen","rgb(250, 128, 114)":"salmon","rgb(253, 245, 230)":"oldlace","rgb(255, 228, 196)":"bisque","rgb(255, 235, 205)":"blanchedalmond","rgb(255, 127, 80)":"coral","rgb(255, 248, 220)":"cornsilk","rgb(255, 140, 0)":"darkorange","rgb(255, 20, 147)":"deeppink","rgb(255, 250, 240)":"floralwhite","rgb(255, 215, 0)":"gold","rgb(255, 105, 180)":"hotpink","rgb(255, 255, 240)":"ivory","rgb(255, 240, 245)":"lavenderblush","rgb(255, 250, 205)":"lemonchiffon","rgb(255, 182, 193)":"lightpink","rgb(255, 160, 122)":"lightsalmon","rgb(255, 255, 224)":"lightyellow","rgb(255, 0, 255)":"magenta","rgb(255, 228, 225)":"mistyrose","rgb(255, 228, 181)":"moccasin","rgb(255, 222, 173)":"navajowhite","rgb(255, 165, 0)":"orange","rgb(255, 69, 0)":"orangered","rgb(255, 239, 213)":"papayawhip","rgb(255, 218, 185)":"peachpuff","rgb(255, 192, 203)":"pink","rgb(255, 0, 0)":"red","rgb(255, 245, 238)":"seashell","rgb(255, 250, 250)":"snow","rgb(255, 99, 71)":"tomato","rgb(255, 255, 255)":"white","rgb(255, 255, 0)":"yellow","rgb(102, 51, 153)":"rebeccapurple"};
var f={aqua:{r:0,g:255,b:255},aliceblue:{r:240,g:248,b:255},antiquewhite:{r:250,g:235,b:215},black:{r:0,g:0,b:0},blue:{r:0,g:0,b:255},cyan:{r:0,g:255,b:255},darkblue:{r:0,g:0,b:139},darkcyan:{r:0,g:139,b:139},darkgreen:{r:0,g:100,b:0},darkturquoise:{r:0,g:206,b:209},deepskyblue:{r:0,g:191,b:255},green:{r:0,g:128,b:0},lime:{r:0,g:255,b:0},mediumblue:{r:0,g:0,b:205},mediumspringgreen:{r:0,g:250,b:154},navy:{r:0,g:0,b:128},springgreen:{r:0,g:255,b:127},teal:{r:0,g:128,b:128},midnightblue:{r:25,g:25,b:112},dodgerblue:{r:30,g:144,b:255},lightseagreen:{r:32,g:178,b:170},forestgreen:{r:34,g:139,b:34},seagreen:{r:46,g:139,b:87},darkslategray:{r:47,g:79,b:79},darkslategrey:{r:47,g:79,b:79},limegreen:{r:50,g:205,b:50},mediumseagreen:{r:60,g:179,b:113},turquoise:{r:64,g:224,b:208},royalblue:{r:65,g:105,b:225},steelblue:{r:70,g:130,b:180},darkslateblue:{r:72,g:61,b:139},mediumturquoise:{r:72,g:209,b:204},indigo:{r:75,g:0,b:130},darkolivegreen:{r:85,g:107,b:47},cadetblue:{r:95,g:158,b:160},cornflowerblue:{r:100,g:149,b:237},mediumaquamarine:{r:102,g:205,b:170},dimgray:{r:105,g:105,b:105},dimgrey:{r:105,g:105,b:105},slateblue:{r:106,g:90,b:205},olivedrab:{r:107,g:142,b:35},slategray:{r:112,g:128,b:144},slategrey:{r:112,g:128,b:144},lightslategray:{r:119,g:136,b:153},lightslategrey:{r:119,g:136,b:153},mediumslateblue:{r:123,g:104,b:238},lawngreen:{r:124,g:252,b:0},aquamarine:{r:127,g:255,b:212},chartreuse:{r:127,g:255,b:0},gray:{r:128,g:128,b:128},grey:{r:128,g:128,b:128},maroon:{r:128,g:0,b:0},olive:{r:128,g:128,b:0},purple:{r:128,g:0,b:128},lightskyblue:{r:135,g:206,b:250},skyblue:{r:135,g:206,b:235},blueviolet:{r:138,g:43,b:226},darkmagenta:{r:139,g:0,b:139},darkred:{r:139,g:0,b:0},saddlebrown:{r:139,g:69,b:19},darkseagreen:{r:143,g:188,b:143},lightgreen:{r:144,g:238,b:144},mediumpurple:{r:147,g:112,b:219},darkviolet:{r:148,g:0,b:211},palegreen:{r:152,g:251,b:152},darkorchid:{r:153,g:50,b:204},yellowgreen:{r:154,g:205,b:50},sienna:{r:160,g:82,b:45},brown:{r:165,g:42,b:42},darkgray:{r:169,g:169,b:169},darkgrey:{r:169,g:169,b:169},greenyellow:{r:173,g:255,b:47},lightblue:{r:173,g:216,b:230},paleturquoise:{r:175,g:238,b:238},lightsteelblue:{r:176,g:196,b:222},powderblue:{r:176,g:224,b:230},firebrick:{r:178,g:34,b:34},darkgoldenrod:{r:184,g:134,b:11},mediumorchid:{r:186,g:85,b:211},rosybrown:{r:188,g:143,b:143},darkkhaki:{r:189,g:183,b:107},silver:{r:192,g:192,b:192},mediumvioletred:{r:199,g:21,b:133},indianred:{r:205,g:92,b:92},peru:{r:205,g:133,b:63},chocolate:{r:210,g:105,b:30},tan:{r:210,g:180,b:140},lightgray:{r:211,g:211,b:211},lightgrey:{r:211,g:211,b:211},thistle:{r:216,g:191,b:216},goldenrod:{r:218,g:165,b:32},orchid:{r:218,g:112,b:214},palevioletred:{r:219,g:112,b:147},crimson:{r:220,g:20,b:60},gainsboro:{r:220,g:220,b:220},plum:{r:221,g:160,b:221},burlywood:{r:222,g:184,b:135},lightcyan:{r:224,g:255,b:255},lavender:{r:230,g:230,b:250},darksalmon:{r:233,g:150,b:122},palegoldenrod:{r:238,g:232,b:170},violet:{r:238,g:130,b:238},azure:{r:240,g:255,b:255},honeydew:{r:240,g:255,b:240},khaki:{r:240,g:230,b:140},lightcoral:{r:240,g:128,b:128},sandybrown:{r:244,g:164,b:96},beige:{r:245,g:245,b:220},mintcream:{r:245,g:255,b:250},wheat:{r:245,g:222,b:179},whitesmoke:{r:245,g:245,b:245},ghostwhite:{r:248,g:248,b:255},lightgoldenrodyellow:{r:250,g:250,b:210},linen:{r:250,g:240,b:230},salmon:{r:250,g:128,b:114},oldlace:{r:253,g:245,b:230},bisque:{r:255,g:228,b:196},blanchedalmond:{r:255,g:235,b:205},coral:{r:255,g:127,b:80},cornsilk:{r:255,g:248,b:220},darkorange:{r:255,g:140,b:0},deeppink:{r:255,g:20,b:147},floralwhite:{r:255,g:250,b:240},fuchsia:{r:255,g:0,b:255},gold:{r:255,g:215,b:0},hotpink:{r:255,g:105,b:180},ivory:{r:255,g:255,b:240},lavenderblush:{r:255,g:240,b:245},lemonchiffon:{r:255,g:250,b:205},lightpink:{r:255,g:182,b:193},lightsalmon:{r:255,g:160,b:122},lightyellow:{r:255,g:255,b:224},magenta:{r:255,g:0,b:255},mistyrose:{r:255,g:228,b:225},moccasin:{r:255,g:228,b:181},navajowhite:{r:255,g:222,b:173},orange:{r:255,g:165,b:0},orangered:{r:255,g:69,b:0},papayawhip:{r:255,g:239,b:213},peachpuff:{r:255,g:218,b:185},pink:{r:255,g:192,b:203},red:{r:255,g:0,b:0},seashell:{r:255,g:245,b:238},snow:{r:255,g:250,b:250},tomato:{r:255,g:99,b:71},white:{r:255,g:255,b:255},yellow:{r:255,g:255,b:0},rebeccapurple:{r:102,g:51,b:153}};
c.exports={rgbToName:d,nameToRgbObject:f}},{}],167:[function(c,d,b){d.exports=function a(f){return"#"+(f).toString(16)
}},{}],168:[function(c,d,a){d.exports=function b(f){return parseInt(f.substr(1),16)
}},{}],169:[function(d,f,c){var a=d("./shortToLongHex");f.exports=function b(h){h=a(h);
var g=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return g?"rgb("+parseInt(g[1],16)+", "+parseInt(g[2],16)+", "+parseInt(g[3],16)+")":null
}},{"./shortToLongHex":183}],170:[function(c,f,b){var h=c("./isRgb");var g=c("./isRgba");
var a=c("./isHex");f.exports=function d(j){return a(j)||h(j)||g(j)}},{"./isHex":171,"./isRgb":172,"./isRgba":173}],171:[function(c,d,b){d.exports=function a(g){var f=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
return f.test(g)}},{}],172:[function(b,c,a){c.exports=function d(g){var f=/^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
return f.exec(g)!==null}},{}],173:[function(b,c,a){c.exports=function d(g){var f=/^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
return f.exec(g)!==null}},{}],174:[function(d,f,c){var b=d("./isHex");var a=d("./hexToRgb");
var h=d("./rgbToObject");f.exports=function g(o,n,m){o=b(o)?a(o):o;n=b(n)?a(n):n;
o=h(o);n=h(n);var l=o.r+((n.r-o.r)*m);var k=o.g+((n.g-o.g)*m);var j=o.b+((n.b-o.b)*m);
return"rgb("+Math.round(l)+", "+Math.round(k)+", "+Math.round(j)+")"}},{"./hexToRgb":169,"./isHex":171,"./rgbToObject":180}],175:[function(b,c,a){var d=b("./rgbToObject");
c.exports=function f(g){var h=d(g);return[h.r,h.g,h.b]}},{"./rgbToObject":180}],176:[function(d,f,b){var c=d("./hexToDecimal");
var h=d("./rgbToArray");var g=d("./rgbToHex");f.exports=function a(j){var k=g.apply(this,h(j));
return c(k)}},{"./hexToDecimal":168,"./rgbToArray":175,"./rgbToHex":177}],177:[function(b,c,a){c.exports=function d(j,h,f){return"#"+((1<<24)+(j<<16)+(h<<8)+f).toString(16).slice(1)
}},{}],178:[function(c,d,b){d.exports=function a(f,n,p){if(arguments.length!==3){return false
}f/=255;n/=255;p/=255;var q=Math.max(f,n,p);var k=Math.min(f,n,p);var o=q+k;var t=q-k;
var m;var u;var j=(o/2);if(q===k){m=u=0}else{u=j>0.5?t/(2-q-k):t/o;switch(q){case f:m=(n-p)/t;
break;case n:m=2+((p-f)/t);break;case p:m=4+((f-n)/t);break}m*=60;if(m<0){m+=360
}}return([m,Math.round(100*u),Math.round(100*j)])}},{}],179:[function(c,d,a){d.exports=function b(f,n,o){if(arguments.length!==3){return false
}var j=f/255;var k=n/255;var q=o/255;var p=Math.max(j,k,q);var l=Math.min(j,k,q);
var m;var w;var u=p;var t=p-l;w=p===0?0:t/p;if(p===l){m=0}else{switch(p){case j:m=(k-q)/t+(k<q?6:0);
break;case k:m=(q-j)/t+2;break;case q:m=(j-k)/t+4;break}m/=6}return[Math.round(360*m),Math.round(100*w),Math.round(100*u)]
}},{}],180:[function(b,c,a){c.exports=function d(g){var h=/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
var f=h.exec(g);return{r:Number(f[1]),g:Number(f[2]),b:Number(f[3])}}},{}],181:[function(b,c,a){var f=b("./rgbaToObject");
c.exports=function d(g){var h=f(g);return[h.r,h.g,h.b,h.a]}},{"./rgbaToObject":182}],182:[function(b,c,a){c.exports=function d(g){var h=/rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/;
var f=h.exec(g);return{r:Number(f[1]),g:Number(f[2]),b:Number(f[3]),a:Number(f[4])}
}},{}],183:[function(c,d,b){d.exports=function a(g){var f=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;
g=g.replace(f,function(j,l,k,h){return"#"+l+l+k+k+h+h});return g}},{}],184:[function(b,c,a){c.exports={createBezier:b("./ac-easing/createBezier"),createPredefined:b("./ac-easing/createPredefined"),createStep:b("./ac-easing/createStep"),Ease:b("./ac-easing/Ease")}
},{"./ac-easing/Ease":185,"./ac-easing/createBezier":186,"./ac-easing/createPredefined":187,"./ac-easing/createStep":188}],185:[function(b,c,a){var g="Ease expects an easing function.";
function f(j,h){if(typeof j!=="function"){throw new TypeError(g)}this.easingFunction=j;
this.cssString=h||null}var d=f.prototype;d.getValue=function(h){return this.easingFunction(h,0,1,1)
};c.exports=f},{}],186:[function(b,c,a){b("@marcom/ac-polyfills/Array/prototype.every");
var f=b("./Ease");var h=b("./helpers/KeySpline");var d="Bezier curve expects exactly four (4) numbers. Given: ";
c.exports=function g(k,q,j,p){var r=Array.prototype.slice.call(arguments);var n=r.every(function(s){return(typeof s==="number")
});if(r.length!==4||!n){throw new TypeError(d+r)}var o=new h(k,q,j,p);var l=function(u,s,v,t){return o.get(u/t)*v+s
};var m="cubic-bezier("+r.join(", ")+")";return new f(l,m)}},{"./Ease":185,"./helpers/KeySpline":189,"@marcom/ac-polyfills/Array/prototype.every":147}],187:[function(c,a,d){var j=c("./createStep");
var f=c("./helpers/cssAliases");var b=c("./helpers/easingFunctions");var h=c("./Ease");
var g='Easing function "%TYPE%" not recognized among the following: '+Object.keys(b).join(", ");
a.exports=function k(l){var m;if(l==="step-start"){return j(1,"start")}else{if(l==="step-end"){return j(1,"end")
}else{m=b[l]}}if(!m){throw new Error(g.replace("%TYPE%",l))}return new h(m,f[l])
}},{"./Ease":185,"./createStep":188,"./helpers/cssAliases":190,"./helpers/easingFunctions":191}],188:[function(d,f,c){var g=d("./Ease");
var b="Step function expects a numeric value greater than zero. Given: ";var a='Step function direction must be either "start" or "end" (default). Given: ';
f.exports=function h(j,m){m=m||"end";if(typeof j!=="number"||j<1){throw new TypeError(b+j)
}if(m!=="start"&&m!=="end"){throw new TypeError(a+m)}var l=function(r,n,s,q){var p=s/j;
var o=Math[(m==="start")?"floor":"ceil"](r/q*j);return n+p*o};var k="steps("+j+", "+m+")";
return new g(l,k)}},{"./Ease":185}],189:[function(b,c,a){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
function d(p,m,o,k){this.get=function(q){if(p===m&&o===k){return q
}return g(l(q),m,k)};function j(q,r){return 1-3*r+3*q}function h(q,r){return 3*r-6*q
}function f(q){return 3*q}function g(s,q,r){return((j(q,r)*s+h(q,r))*s+f(q))*s}function n(s,q,r){return 3*j(q,r)*s*s+2*h(q,r)*s+f(q)
}function l(t){var r=t;for(var s=0;s<4;++s){var u=n(r,p,o);if(u===0){return r}var q=g(r,p,o)-t;
r-=q/u}return r}}c.exports=d},{}],190:[function(c,d,b){var a={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
a.easeIn=a["ease-in"];a.easeOut=a["ease-out"];a.easeInOut=a["ease-in-out"];a.easeInCubic=a["ease-in-cubic"];
a.easeOutCubic=a["ease-out-cubic"];a.easeInOutCubic=a["ease-in-out-cubic"];a.easeInQuad=a["ease-in-quad"];
a.easeOutQuad=a["ease-out-quad"];a.easeInOutQuad=a["ease-in-out-quad"];a.easeInQuart=a["ease-in-quart"];
a.easeOutQuart=a["ease-out-quart"];a.easeInOutQuart=a["ease-in-out-quart"];a.easeInQuint=a["ease-in-quint"];
a.easeOutQuint=a["ease-out-quint"];a.easeInOutQuint=a["ease-in-out-quint"];a.easeInSine=a["ease-in-sine"];
a.easeOutSine=a["ease-out-sine"];a.easeInOutSine=a["ease-in-out-sine"];a.easeInExpo=a["ease-in-expo"];
a.easeOutExpo=a["ease-out-expo"];a.easeInOutExpo=a["ease-in-out-expo"];a.easeInCirc=a["ease-in-circ"];
a.easeOutCirc=a["ease-out-circ"];a.easeInOutCirc=a["ease-in-out-circ"];a.easeInBack=a["ease-in-back"];
a.easeOutBack=a["ease-out-back"];a.easeInOutBack=a["ease-in-out-back"];d.exports=a
},{}],191:[function(d,b,G){var K=d("../createBezier");var x=K(0.25,0.1,0.25,1).easingFunction;
var g=K(0.42,0,1,1).easingFunction;var D=K(0,0,0.58,1).easingFunction;var y=K(0.42,0,0.58,1).easingFunction;
var v=function(R,P,S,Q){return S*R/Q+P};var h=function(R,P,S,Q){return S*(R/=Q)*R+P
};var O=function(R,P,S,Q){return -S*(R/=Q)*(R-2)+P};var E=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R+P
}return -S/2*((--R)*(R-2)-1)+P};var j=function(R,P,S,Q){return S*(R/=Q)*R*R+P};
var a=function(R,P,S,Q){return S*((R=R/Q-1)*R*R+1)+P};var k=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R*R+P
}return S/2*((R-=2)*R*R+2)+P};var p=function(R,P,S,Q){return S*(R/=Q)*R*R*R+P};
var n=function(R,P,S,Q){return -S*((R=R/Q-1)*R*R*R-1)+P};var q=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R*R*R+P
}return -S/2*((R-=2)*R*R*R-2)+P};var z=function(R,P,S,Q){return S*(R/=Q)*R*R*R*R+P
};var w=function(R,P,S,Q){return S*((R=R/Q-1)*R*R*R*R+1)+P};var A=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R*R*R*R+P
}return S/2*((R-=2)*R*R*R*R+2)+P};var c=function(R,P,S,Q){return -S*Math.cos(R/Q*(Math.PI/2))+S+P
};var M=function(R,P,S,Q){return S*Math.sin(R/Q*(Math.PI/2))+P};var C=function(R,P,S,Q){return -S/2*(Math.cos(Math.PI*R/Q)-1)+P
};var H=function(R,P,S,Q){return(R===0)?P:S*Math.pow(2,10*(R/Q-1))+P};var B=function(R,P,S,Q){return(R===Q)?P+S:S*(-Math.pow(2,-10*R/Q)+1)+P
};var s=function(R,P,S,Q){if(R===0){return P}else{if(R===Q){return P+S}else{if((R/=Q/2)<1){return S/2*Math.pow(2,10*(R-1))+P
}}}return S/2*(-Math.pow(2,-10*--R)+2)+P};var m=function(R,P,S,Q){return -S*(Math.sqrt(1-(R/=Q)*R)-1)+P
};var f=function(R,P,S,Q){return S*Math.sqrt(1-(R=R/Q-1)*R)+P};var J=function(R,P,S,Q){if((R/=Q/2)<1){return -S/2*(Math.sqrt(1-R*R)-1)+P
}return S/2*(Math.sqrt(1-(R-=2)*R)+1)+P};var F=function(T,R,V,S){var P=1.70158;
var U=0;var Q=V;if(T===0){return R}else{if((T/=S)===1){return R+V}}if(!U){U=S*0.3
}if(Q<Math.abs(V)){Q=V;P=U/4}else{P=U/(2*Math.PI)*Math.asin(V/Q)}return -(Q*Math.pow(2,10*(T-=1))*Math.sin((T*S-P)*(2*Math.PI)/U))+R
};var I=function(T,R,V,S){var P=1.70158;var U=0;var Q=V;if(T===0){return R}else{if((T/=S)===1){return R+V
}}if(!U){U=S*0.3}if(Q<Math.abs(V)){Q=V;P=U/4}else{P=U/(2*Math.PI)*Math.asin(V/Q)
}return Q*Math.pow(2,-10*T)*Math.sin((T*S-P)*(2*Math.PI)/U)+V+R};var u=function(T,R,V,S){var P=1.70158;
var U=0;var Q=V;if(T===0){return R}else{if((T/=S/2)===2){return R+V}}if(!U){U=S*(0.3*1.5)
}if(Q<Math.abs(V)){Q=V;P=U/4}else{P=U/(2*Math.PI)*Math.asin(V/Q)}if(T<1){return -0.5*(Q*Math.pow(2,10*(T-=1))*Math.sin((T*S-P)*(2*Math.PI)/U))+R
}return Q*Math.pow(2,-10*(T-=1))*Math.sin((T*S-P)*(2*Math.PI)/U)*0.5+V+R};var t=function(S,Q,T,R,P){if(P===undefined){P=1.70158
}return T*(S/=R)*S*((P+1)*S-P)+Q};var r=function(S,Q,T,R,P){if(P===undefined){P=1.70158
}return T*((S=S/R-1)*S*((P+1)*S+P)+1)+Q};var l=function(S,Q,T,R,P){if(P===undefined){P=1.70158
}if((S/=R/2)<1){return T/2*(S*S*(((P*=(1.525))+1)*S-P))+Q}return T/2*((S-=2)*S*(((P*=(1.525))+1)*S+P)+2)+Q
};var L=function(R,P,S,Q){if((R/=Q)<(1/2.75)){return S*(7.5625*R*R)+P}else{if(R<(2/2.75)){return S*(7.5625*(R-=(1.5/2.75))*R+0.75)+P
}else{if(R<(2.5/2.75)){return S*(7.5625*(R-=(2.25/2.75))*R+0.9375)+P}}}return S*(7.5625*(R-=(2.625/2.75))*R+0.984375)+P
};var o=function(R,P,S,Q){return S-L(Q-R,0,S,Q)+P};var N=function(R,P,S,Q){if(R<Q/2){return o(R*2,0,S,Q)*0.5+P
}return L(R*2-Q,0,S,Q)*0.5+S*0.5+P};b.exports={linear:v,ease:x,easeIn:g,"ease-in":g,easeOut:D,"ease-out":D,easeInOut:y,"ease-in-out":y,easeInCubic:j,"ease-in-cubic":j,easeOutCubic:a,"ease-out-cubic":a,easeInOutCubic:k,"ease-in-out-cubic":k,easeInQuad:h,"ease-in-quad":h,easeOutQuad:O,"ease-out-quad":O,easeInOutQuad:E,"ease-in-out-quad":E,easeInQuart:p,"ease-in-quart":p,easeOutQuart:n,"ease-out-quart":n,easeInOutQuart:q,"ease-in-out-quart":q,easeInQuint:z,"ease-in-quint":z,easeOutQuint:w,"ease-out-quint":w,easeInOutQuint:A,"ease-in-out-quint":A,easeInSine:c,"ease-in-sine":c,easeOutSine:M,"ease-out-sine":M,easeInOutSine:C,"ease-in-out-sine":C,easeInExpo:H,"ease-in-expo":H,easeOutExpo:B,"ease-out-expo":B,easeInOutExpo:s,"ease-in-out-expo":s,easeInCirc:m,"ease-in-circ":m,easeOutCirc:f,"ease-out-circ":f,easeInOutCirc:J,"ease-in-out-circ":J,easeInBack:t,"ease-in-back":t,easeOutBack:r,"ease-out-back":r,easeInOutBack:l,"ease-in-out-back":l,easeInElastic:F,"ease-in-elastic":F,easeOutElastic:I,"ease-out-elastic":I,easeInOutElastic:u,"ease-in-out-elastic":u,easeInBounce:o,"ease-in-bounce":o,easeOutBounce:L,"ease-out-bounce":L,easeInOutBounce:N,"ease-in-out-bounce":N}
},{"../createBezier":186}],192:[function(b,c,a){c.exports=d;function d(f){var g=new Float32Array(16);
g[0]=f[0];g[1]=f[1];g[2]=f[2];g[3]=f[3];g[4]=f[4];g[5]=f[5];g[6]=f[6];g[7]=f[7];
g[8]=f[8];g[9]=f[9];g[10]=f[10];g[11]=f[11];g[12]=f[12];g[13]=f[13];g[14]=f[14];
g[15]=f[15];return g}},{}],193:[function(b,d,a){d.exports=c;function c(){var f=new Float32Array(16);
f[0]=1;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=1;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=1;f[11]=0;
f[12]=0;f[13]=0;f[14]=0;f[15]=1;return f}},{}],194:[function(b,c,a){c.exports=d;
function d(u,s,p){var m=s[0],l=s[1],k=s[2],n=s[3],A=m+m,f=l+l,o=k+k,j=m*A,h=m*f,g=m*o,t=l*f,r=l*o,D=k*o,E=n*A,C=n*f,B=n*o;
u[0]=1-(t+D);u[1]=h+B;u[2]=g-C;u[3]=0;u[4]=h-B;u[5]=1-(j+D);u[6]=r+E;u[7]=0;u[8]=g+C;
u[9]=r-E;u[10]=1-(j+t);u[11]=0;u[12]=p[0];u[13]=p[1];u[14]=p[2];u[15]=1;return u
}},{}],195:[function(c,d,b){d.exports=a;function a(f){f[0]=1;f[1]=0;f[2]=0;f[3]=0;
f[4]=0;f[5]=1;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=1;f[11]=0;f[12]=0;f[13]=0;f[14]=0;
f[15]=1;return f}},{}],196:[function(b,c,a){c.exports=d;function d(z,E){var I=E[0],G=E[1],F=E[2],C=E[3],k=E[4],j=E[5],h=E[6],g=E[7],y=E[8],x=E[9],w=E[10],v=E[11],K=E[12],J=E[13],H=E[14],D=E[15],u=I*j-G*k,t=I*h-F*k,s=I*g-C*k,r=G*h-F*j,q=G*g-C*j,p=F*g-C*h,o=y*J-x*K,n=y*H-w*K,m=y*D-v*K,l=x*H-w*J,B=x*D-v*J,A=w*D-v*H,f=u*A-t*B+s*l+r*m-q*n+p*o;
if(!f){return null}f=1/f;z[0]=(j*A-h*B+g*l)*f;z[1]=(F*B-G*A-C*l)*f;z[2]=(J*p-H*q+D*r)*f;
z[3]=(w*q-x*p-v*r)*f;z[4]=(h*m-k*A-g*n)*f;z[5]=(I*A-F*m+C*n)*f;z[6]=(H*s-K*p-D*t)*f;
z[7]=(y*p-w*s+v*t)*f;z[8]=(k*B-j*m+g*o)*f;z[9]=(G*m-I*B-C*o)*f;z[10]=(K*q-J*s+D*u)*f;
z[11]=(x*s-y*q-v*u)*f;z[12]=(j*n-k*l-h*o)*f;z[13]=(I*l-G*n+F*o)*f;z[14]=(J*t-K*r-H*u)*f;
z[15]=(y*r-x*t+w*u)*f;return z}},{}],197:[function(c,d,b){d.exports=a;function a(s,w,t){var A=w[0],z=w[1],x=w[2],u=w[3],m=w[4],k=w[5],h=w[6],f=w[7],r=w[8],q=w[9],p=w[10],o=w[11],C=w[12],B=w[13],y=w[14],v=w[15];
var n=t[0],l=t[1],j=t[2],g=t[3];s[0]=n*A+l*m+j*r+g*C;s[1]=n*z+l*k+j*q+g*B;s[2]=n*x+l*h+j*p+g*y;
s[3]=n*u+l*f+j*o+g*v;n=t[4];l=t[5];j=t[6];g=t[7];s[4]=n*A+l*m+j*r+g*C;s[5]=n*z+l*k+j*q+g*B;
s[6]=n*x+l*h+j*p+g*y;s[7]=n*u+l*f+j*o+g*v;n=t[8];l=t[9];j=t[10];g=t[11];s[8]=n*A+l*m+j*r+g*C;
s[9]=n*z+l*k+j*q+g*B;s[10]=n*x+l*h+j*p+g*y;s[11]=n*u+l*f+j*o+g*v;n=t[12];l=t[13];
j=t[14];g=t[15];s[12]=n*A+l*m+j*r+g*C;s[13]=n*z+l*k+j*q+g*B;s[14]=n*x+l*h+j*p+g*y;
s[15]=n*u+l*f+j*o+g*v;return s}},{}],198:[function(c,d,a){d.exports=b;function b(F,M,O,f){var q=f[0],p=f[1],o=f[2],G=Math.sqrt(q*q+p*p+o*o),A,K,w,Q,P,N,L,n,m,l,k,E,D,C,B,v,u,r,J,I,H,j,h,g;
if(Math.abs(G)<0.000001){return null}G=1/G;q*=G;p*=G;o*=G;A=Math.sin(O);K=Math.cos(O);
w=1-K;Q=M[0];P=M[1];N=M[2];L=M[3];n=M[4];m=M[5];l=M[6];k=M[7];E=M[8];D=M[9];C=M[10];
B=M[11];v=q*q*w+K;u=p*q*w+o*A;r=o*q*w-p*A;J=q*p*w-o*A;I=p*p*w+K;H=o*p*w+q*A;j=q*o*w+p*A;
h=p*o*w-q*A;g=o*o*w+K;F[0]=Q*v+n*u+E*r;F[1]=P*v+m*u+D*r;F[2]=N*v+l*u+C*r;F[3]=L*v+k*u+B*r;
F[4]=Q*J+n*I+E*H;F[5]=P*J+m*I+D*H;F[6]=N*J+l*I+C*H;F[7]=L*J+k*I+B*H;F[8]=Q*j+n*h+E*g;
F[9]=P*j+m*h+D*g;F[10]=N*j+l*h+C*g;F[11]=L*j+k*h+B*g;if(M!==F){F[12]=M[12];F[13]=M[13];
F[14]=M[14];F[15]=M[15]}return F}},{}],199:[function(c,d,a){d.exports=b;function b(f,n,m){var t=Math.sin(m),l=Math.cos(m),r=n[4],q=n[5],p=n[6],o=n[7],k=n[8],j=n[9],h=n[10],g=n[11];
if(n!==f){f[0]=n[0];f[1]=n[1];f[2]=n[2];f[3]=n[3];f[12]=n[12];f[13]=n[13];f[14]=n[14];
f[15]=n[15]}f[4]=r*l+k*t;f[5]=q*l+j*t;f[6]=p*l+h*t;f[7]=o*l+g*t;f[8]=k*l-r*t;f[9]=j*l-q*t;
f[10]=h*l-p*t;f[11]=g*l-o*t;return f}},{}],200:[function(c,d,b){d.exports=a;function a(k,r,q){var t=Math.sin(q),p=Math.cos(q),j=r[0],h=r[1],g=r[2],f=r[3],o=r[8],n=r[9],m=r[10],l=r[11];
if(r!==k){k[4]=r[4];k[5]=r[5];k[6]=r[6];k[7]=r[7];k[12]=r[12];k[13]=r[13];k[14]=r[14];
k[15]=r[15]}k[0]=j*p-o*t;k[1]=h*p-n*t;k[2]=g*p-m*t;k[3]=f*p-l*t;k[8]=j*t+o*p;k[9]=h*t+n*p;
k[10]=g*t+m*p;k[11]=f*t+l*p;return k}},{}],201:[function(c,d,b){d.exports=a;function a(k,n,m){var t=Math.sin(m),l=Math.cos(m),j=n[0],h=n[1],g=n[2],f=n[3],r=n[4],q=n[5],p=n[6],o=n[7];
if(n!==k){k[8]=n[8];k[9]=n[9];k[10]=n[10];k[11]=n[11];k[12]=n[12];k[13]=n[13];k[14]=n[14];
k[15]=n[15]}k[0]=j*l+r*t;k[1]=h*l+q*t;k[2]=g*l+p*t;k[3]=f*l+o*t;k[4]=r*l-j*t;k[5]=q*l-h*t;
k[6]=p*l-g*t;k[7]=o*l-f*t;return k}},{}],202:[function(b,c,a){c.exports=d;function d(j,g,h){var f=h[0],l=h[1],k=h[2];
j[0]=g[0]*f;j[1]=g[1]*f;j[2]=g[2]*f;j[3]=g[3]*f;j[4]=g[4]*l;j[5]=g[5]*l;j[6]=g[6]*l;
j[7]=g[7]*l;j[8]=g[8]*k;j[9]=g[9]*k;j[10]=g[10]*k;j[11]=g[11]*k;j[12]=g[12];j[13]=g[13];
j[14]=g[14];j[15]=g[15];return j}},{}],203:[function(b,c,a){c.exports=d;function d(s,u,n){var m=n[0],l=n[1],k=n[2],B,A,w,t,j,h,g,f,r,q,p,o;
if(u===s){s[12]=u[0]*m+u[4]*l+u[8]*k+u[12];s[13]=u[1]*m+u[5]*l+u[9]*k+u[13];s[14]=u[2]*m+u[6]*l+u[10]*k+u[14];
s[15]=u[3]*m+u[7]*l+u[11]*k+u[15]}else{B=u[0];A=u[1];w=u[2];t=u[3];j=u[4];h=u[5];
g=u[6];f=u[7];r=u[8];q=u[9];p=u[10];o=u[11];s[0]=B;s[1]=A;s[2]=w;s[3]=t;s[4]=j;
s[5]=h;s[6]=g;s[7]=f;s[8]=r;s[9]=q;s[10]=p;s[11]=o;s[12]=B*m+j*l+r*k+u[12];s[13]=A*m+h*l+q*k+u[13];
s[14]=w*m+g*l+p*k+u[14];s[15]=t*m+f*l+o*k+u[15]}return s}},{}],204:[function(b,c,a){c.exports=d;
function d(j,h){if(j===h){var n=h[1],l=h[2],k=h[3],f=h[6],m=h[7],g=h[11];j[1]=h[4];
j[2]=h[8];j[3]=h[12];j[4]=n;j[6]=h[9];j[7]=h[13];j[8]=l;j[9]=f;j[11]=h[14];j[12]=k;
j[13]=m;j[14]=g}else{j[0]=h[0];j[1]=h[4];j[2]=h[8];j[3]=h[12];j[4]=h[1];j[5]=h[5];
j[6]=h[9];j[7]=h[13];j[8]=h[2];j[9]=h[6];j[10]=h[10];j[11]=h[14];j[12]=h[3];j[13]=h[7];
j[14]=h[11];j[15]=h[15]}return j}},{}],205:[function(b,d,a){d.exports=c;function c(){var f=new Float32Array(3);
f[0]=0;f[1]=0;f[2]=0;return f}},{}],206:[function(b,c,a){c.exports=d;function d(g,m,l){var f=m[0],o=m[1],n=m[2],k=l[0],j=l[1],h=l[2];
g[0]=o*h-n*j;g[1]=n*k-f*h;g[2]=f*j-o*k;return g}},{}],207:[function(c,d,b){d.exports=a;
function a(g,f){return g[0]*f[0]+g[1]*f[1]+g[2]*f[2]}},{}],208:[function(b,c,a){c.exports=d;
function d(f,j,h){var g=new Float32Array(3);g[0]=f;g[1]=j;g[2]=h;return g}},{}],209:[function(b,c,a){c.exports=d;
function d(g){var f=g[0],j=g[1],h=g[2];return Math.sqrt(f*f+j*j+h*h)}},{}],210:[function(c,d,b){d.exports=a;
function a(j,h){var g=h[0],l=h[1],k=h[2];var f=g*g+l*l+k*k;if(f>0){f=1/Math.sqrt(f);
j[0]=h[0]*f;j[1]=h[1]*f;j[2]=h[2]*f}return j}},{}],211:[function(b,d,a){d.exports=c;
function c(){var f=new Float32Array(4);f[0]=0;f[1]=0;f[2]=0;f[3]=0;return f}},{}],212:[function(b,c,a){c.exports=d;
function d(f,k,j,g){var h=new Float32Array(4);h[0]=f;h[1]=k;h[2]=j;h[3]=g;return h
}},{}],213:[function(b,d,a){d.exports=c;function c(k,j,g){var f=j[0],n=j[1],l=j[2],h=j[3];
k[0]=g[0]*f+g[4]*n+g[8]*l+g[12]*h;k[1]=g[1]*f+g[5]*n+g[9]*l+g[13]*h;k[2]=g[2]*f+g[6]*n+g[10]*l+g[14]*h;
k[3]=g[3]*f+g[7]*n+g[11]*l+g[15]*h;return k}},{}],214:[function(b,c,a){c.exports={Transform:b("./ac-transform/Transform")}
},{"./ac-transform/Transform":215}],215:[function(m,d,I){var l=m("./gl-matrix/mat4");
var b=m("./gl-matrix/vec3");var a=m("./gl-matrix/vec4");var f=Math.PI/180;var c=180/Math.PI;
var G=0,z=0,E=1,y=1,C=2,A=3;var k=4,x=4,j=5,w=5,h=6,g=7;var u=8,r=9,p=10,o=11;var H=12,v=12,F=13,t=13,D=14,B=15;
function q(){this.m=l.create()}var s=q.prototype;s.rotateX=function(K){var J=f*K;
l.rotateX(this.m,this.m,J);return this};s.rotateY=function(K){var J=f*K;l.rotateY(this.m,this.m,J);
return this};s.rotateZ=function(K){var J=f*K;l.rotateZ(this.m,this.m,J);return this
};s.rotate=s.rotateZ;s.rotate3d=function(K,N,M,L){if(N===null||N===undefined){N=K
}if(M===null||N===undefined){M=K}var J=f*L;l.rotate(this.m,this.m,J,[K,N,M]);return this
};s.rotateAxisAngle=s.rotate3d;s.scale=function(K,J){J=J||K;l.scale(this.m,this.m,[K,J,1]);
return this};s.scaleX=function(J){l.scale(this.m,this.m,[J,1,1]);return this};s.scaleY=function(J){l.scale(this.m,this.m,[1,J,1]);
return this};s.scaleZ=function(J){l.scale(this.m,this.m,[1,1,J]);return this};s.scale3d=function(L,K,J){l.scale(this.m,this.m,[L,K,J]);
return this};s.skew=function(L,K){if(K===null||K===undefined){return this.skewX(L)
}L=f*L;K=f*K;var J=l.create();J[x]=Math.tan(L);J[y]=Math.tan(K);l.multiply(this.m,this.m,J);
return this};s.skewX=function(K){K=f*K;var J=l.create();J[x]=Math.tan(K);l.multiply(this.m,this.m,J);
return this};s.skewY=function(K){K=f*K;var J=l.create();J[y]=Math.tan(K);l.multiply(this.m,this.m,J);
return this};s.translate=function(K,J){J=J||0;l.translate(this.m,this.m,[K,J,0]);
return this};s.translate3d=function(K,J,L){l.translate(this.m,this.m,[K,J,L]);return this
};s.translateX=function(J){l.translate(this.m,this.m,[J,0,0]);return this};s.translateY=function(J){l.translate(this.m,this.m,[0,J,0]);
return this};s.translateZ=function(J){l.translate(this.m,this.m,[0,0,J]);return this
};s.perspective=function(K){var J=l.create();if(K!==0){J[o]=-1/K}l.multiply(this.m,this.m,J)
};s.inverse=function(){var J=this.clone();J.m=l.invert(J.m,this.m);return J};s.reset=function(){l.identity(this.m);
return this};s.getTranslateXY=function(){var J=this.m;if(this.isAffine()){return[J[v],J[t]]
}return[J[H],J[F]]};s.getTranslateXYZ=function(){var J=this.m;if(this.isAffine()){return[J[v],J[t],0]
}return[J[H],J[F],J[D]]};s.getTranslateX=function(){var J=this.m;if(this.isAffine()){return J[v]
}return J[H]};s.getTranslateY=function(){var J=this.m;if(this.isAffine()){return J[t]
}return J[F]};s.getTranslateZ=function(){var J=this.m;if(this.isAffine()){return 0
}return J[D]};s.clone=function(){var J=new q();J.m=l.clone(this.m);return J};s.toArray=function(){var J=this.m;
if(this.isAffine()){return[J[z],J[y],J[x],J[w],J[v],J[t]]}return[J[G],J[E],J[C],J[A],J[k],J[j],J[h],J[g],J[u],J[r],J[p],J[o],J[H],J[F],J[D],J[B]]
};s.fromArray=function(J){this.m=Array.prototype.slice.call(J);return this};s.setMatrixValue=function(K){K=String(K).trim();
var J=l.create();if(K==="none"){this.m=J;return this}var M=K.slice(0,K.indexOf("(")),N,L;
if(M==="matrix3d"){N=K.slice(9,-1).split(",");for(L=0;L<N.length;L++){J[L]=parseFloat(N[L])
}}else{if(M==="matrix"){N=K.slice(7,-1).split(",");for(L=N.length;L--;){N[L]=parseFloat(N[L])
}J[G]=N[0];J[E]=N[1];J[H]=N[4];J[k]=N[2];J[j]=N[3];J[F]=N[5]}else{throw new TypeError("Invalid Matrix Value")
}}this.m=J;return this};var n=function(J){return Math.abs(J)<0.0001};s.decompose=function(U){U=U||false;
var Y=l.clone(this.m);var P=b.create();var ae=b.create();var M=b.create();var R=a.create();
var K=a.create();var L=b.create();for(var aa=0;aa<16;aa++){Y[aa]/=Y[B]}var W=l.clone(Y);
W[A]=0;W[g]=0;W[o]=0;W[B]=1;var ab=Y[3],N=Y[7],Q=Y[11],ag=Y[12],af=Y[13],ad=Y[14],ac=Y[15];
var T=a.create();if(!n(Y[A])||!n(Y[g])||!n(Y[o])){T[0]=Y[A];T[1]=Y[g];T[2]=Y[o];
T[3]=Y[B];var Z=l.invert(l.create(),W);var S=l.transpose(l.create(),Z);R=a.transformMat4(R,T,S)
}else{R=a.fromValues(0,0,0,1)}P[0]=ag;P[1]=af;P[2]=ad;var O=[b.create(),b.create(),b.create()];
O[0][0]=Y[0];O[0][1]=Y[1];O[0][2]=Y[2];O[1][0]=Y[4];O[1][1]=Y[5];O[1][2]=Y[6];O[2][0]=Y[8];
O[2][1]=Y[9];O[2][2]=Y[10];ae[0]=b.length(O[0]);b.normalize(O[0],O[0]);M[0]=b.dot(O[0],O[1]);
O[1]=this._combine(O[1],O[0],1,-M[0]);ae[1]=b.length(O[1]);b.normalize(O[1],O[1]);
M[0]/=ae[1];M[1]=b.dot(O[0],O[2]);O[2]=this._combine(O[2],O[0],1,-M[1]);M[2]=b.dot(O[1],O[2]);
O[2]=this._combine(O[2],O[1],1,-M[2]);ae[2]=b.length(O[2]);b.normalize(O[2],O[2]);
M[1]/=ae[2];M[2]/=ae[2];var X=b.cross(b.create(),O[1],O[2]);if(b.dot(O[0],X)<0){for(aa=0;
aa<3;aa++){ae[aa]*=-1;O[aa][0]*=-1;O[aa][1]*=-1;O[aa][2]*=-1}}K[0]=0.5*Math.sqrt(Math.max(1+O[0][0]-O[1][1]-O[2][2],0));
K[1]=0.5*Math.sqrt(Math.max(1-O[0][0]+O[1][1]-O[2][2],0));K[2]=0.5*Math.sqrt(Math.max(1-O[0][0]-O[1][1]+O[2][2],0));
K[3]=0.5*Math.sqrt(Math.max(1+O[0][0]+O[1][1]+O[2][2],0));if(O[2][1]>O[1][2]){K[0]=-K[0]
}if(O[0][2]>O[2][0]){K[1]=-K[1]}if(O[1][0]>O[0][1]){K[2]=-K[2]}var J=a.fromValues(K[0],K[1],K[2],2*Math.acos(K[3]));
var V=this._rotationFromQuat(K);if(U){M[0]=Math.round(M[0]*c*100)/100;M[1]=Math.round(M[1]*c*100)/100;
M[2]=Math.round(M[2]*c*100)/100;V[0]=Math.round(V[0]*c*100)/100;V[1]=Math.round(V[1]*c*100)/100;
V[2]=Math.round(V[2]*c*100)/100;J[3]=Math.round(J[3]*c*100)/100}return{translation:P,scale:ae,skew:M,perspective:R,quaternion:K,eulerRotation:V,axisAngle:J}
};s.recompose=function(P,O,L,M,N){P=P||b.create();O=O||b.create();L=L||b.create();
M=M||a.create();N=N||a.create();var K=l.fromRotationTranslation(l.create(),N,P);
K[A]=M[0];K[g]=M[1];K[o]=M[2];K[B]=M[3];var J=l.create();if(L[2]!==0){J[r]=L[2];
l.multiply(K,K,J)}if(L[1]!==0){J[r]=0;J[u]=L[1];l.multiply(K,K,J)}if(L[0]){J[u]=0;
J[4]=L[0];l.multiply(K,K,J)}l.scale(K,K,O);this.m=K;return this};s.isAffine=function(){return(this.m[C]===0&&this.m[A]===0&&this.m[h]===0&&this.m[g]===0&&this.m[u]===0&&this.m[r]===0&&this.m[p]===1&&this.m[o]===0&&this.m[D]===0&&this.m[B]===1)
};s.toString=function(){var J=this.m;if(this.isAffine()){return"matrix("+J[z]+", "+J[y]+", "+J[x]+", "+J[w]+", "+J[v]+", "+J[t]+")"
}return"matrix3d("+J[G]+", "+J[E]+", "+J[C]+", "+J[A]+", "+J[k]+", "+J[j]+", "+J[h]+", "+J[g]+", "+J[u]+", "+J[r]+", "+J[p]+", "+J[o]+", "+J[H]+", "+J[F]+", "+J[D]+", "+J[B]+")"
};s.toCSSString=s.toString;s._combine=function(K,N,M,L){var J=b.create();J[0]=(M*K[0])+(L*N[0]);
J[1]=(M*K[1])+(L*N[1]);J[2]=(M*K[2])+(L*N[2]);return J};s._matrix2dToMat4=function(J){var L=l.create();
for(var M=0;M<4;M++){for(var K=0;K<4;K++){L[M*4+K]=J[M][K]}}return L};s._mat4ToMatrix2d=function(M){var J=[];
for(var L=0;L<4;L++){J[L]=[];for(var K=0;K<4;K++){J[L][K]=M[L*4+K]}}return J};s._rotationFromQuat=function(J){var N=J[3]*J[3];
var M=J[0]*J[0];var L=J[1]*J[1];var K=J[2]*J[2];var S=M+L+K+N;var O=J[0]*J[1]+J[2]*J[3];
var R,Q,P;if(O>0.499*S){Q=2*Math.atan2(J[0],J[3]);P=Math.PI/2;R=0;return b.fromValues(R,Q,P)
}if(O<-0.499*S){Q=-2*Math.atan2(J[0],J[3]);P=-Math.PI/2;R=0;return b.fromValues(R,Q,P)
}Q=Math.atan2(2*J[1]*J[3]-2*J[0]*J[2],M-L-K+N);P=Math.asin(2*O/S);R=Math.atan2(2*J[0]*J[3]-2*J[1]*J[2],-M+L-K+N);
return b.fromValues(R,Q,P)};d.exports=q},{"./gl-matrix/mat4":216,"./gl-matrix/vec3":217,"./gl-matrix/vec4":218}],216:[function(c,d,a){var b={create:c("gl-mat4/create"),rotate:c("gl-mat4/rotate"),rotateX:c("gl-mat4/rotateX"),rotateY:c("gl-mat4/rotateY"),rotateZ:c("gl-mat4/rotateZ"),scale:c("gl-mat4/scale"),multiply:c("gl-mat4/multiply"),translate:c("gl-mat4/translate"),invert:c("gl-mat4/invert"),clone:c("gl-mat4/clone"),transpose:c("gl-mat4/transpose"),identity:c("gl-mat4/identity"),fromRotationTranslation:c("gl-mat4/fromRotationTranslation")};
d.exports=b},{"gl-mat4/clone":192,"gl-mat4/create":193,"gl-mat4/fromRotationTranslation":194,"gl-mat4/identity":195,"gl-mat4/invert":196,"gl-mat4/multiply":197,"gl-mat4/rotate":198,"gl-mat4/rotateX":199,"gl-mat4/rotateY":200,"gl-mat4/rotateZ":201,"gl-mat4/scale":202,"gl-mat4/translate":203,"gl-mat4/transpose":204}],217:[function(b,d,a){var c={create:b("gl-vec3/create"),dot:b("gl-vec3/dot"),normalize:b("gl-vec3/normalize"),length:b("gl-vec3/length"),cross:b("gl-vec3/cross"),fromValues:b("gl-vec3/fromValues")};
d.exports=c},{"gl-vec3/create":205,"gl-vec3/cross":206,"gl-vec3/dot":207,"gl-vec3/fromValues":208,"gl-vec3/length":209,"gl-vec3/normalize":210}],218:[function(c,d,a){var b={create:c("gl-vec4/create"),transformMat4:c("gl-vec4/transformMat4"),fromValues:c("gl-vec4/fromValues")};
d.exports=b},{"gl-vec4/create":211,"gl-vec4/fromValues":212,"gl-vec4/transformMat4":213}],219:[function(b,c,a){c.exports={Clip:b("./ac-eclipse/ClipFactory"),Timeline:b("./ac-eclipse/Timeline")}
},{"./ac-eclipse/ClipFactory":220,"./ac-eclipse/Timeline":221}],220:[function(g,d,h){g("./helpers/Float32Array");
var c=g("./helpers/transitionEnd");var j=g("@marcom/ac-clip").Clip;var l=g("./clips/ClipEasing");
var f=g("./clips/ClipInlineCss");var k=g("./clips/ClipTransitionCss");function b(o,n,p,m){if(o.nodeType){if(c===undefined||(m&&m.inlineStyles)){return new f(o,n,p,m)
}return new k(o,n,p,m)}return new l(o,n,p,m)}for(var a in j){if(typeof j[a]==="function"&&a.substr(0,1)!=="_"){b[a]=j[a].bind(j)
}}b.to=function(o,n,p,m){m=m||{};if(m.destroyOnComplete===undefined){m.destroyOnComplete=true
}return new b(o,n,p,m).play()};b.from=function(p,o,m,n){n=n||{};n.propsFrom=m;if(n.destroyOnComplete===undefined){n.destroyOnComplete=true
}return new b(p,o,n.propsTo,n).play()};d.exports=b},{"./clips/ClipEasing":222,"./clips/ClipInlineCss":223,"./clips/ClipTransitionCss":224,"./helpers/Float32Array":227,"./helpers/transitionEnd":236,"@marcom/ac-clip":162}],221:[function(c,f,a){var d=c("@marcom/ac-object").create;
var b=c("@marcom/ac-clip").Clip;function h(j){j=j||{}}var g=h.prototype=d(b.prototype);
f.exports=h},{"@marcom/ac-clip":162,"@marcom/ac-object":138}],222:[function(b,a,c){var m=b("@marcom/ac-object").clone;
var g=b("@marcom/ac-object").create;var p=b("@marcom/ac-easing").createPredefined;
var n=b("../helpers/isCssCubicBezierString");var f=b("../helpers/BezierCurveCssManager");
var j=b("@marcom/ac-clip").Clip;var l=b("@marcom/ac-easing").Ease;var k="ease";
function o(s,r,t,q){if(q&&n(q.ease)){q.ease=f.create(q.ease).toEasingFunction()
}q=q||{};this._propsEase=q.propsEase||{};j.call(this,s,r,t,q)}var h=j.prototype;
var d=o.prototype=g(h);d.reset=function(){var r=h.reset.call(this);if(this._clips){var q=this._clips.length;
while(q--){this._clips[q].reset()}}return r};d.destroy=function(){if(this._clips){var q=this._clips.length;
while(q--){this._clips[q].destroy()}this._clips=null}this._eases=null;this._storeOnUpdate=null;
return h.destroy.call(this)};d._prepareProperties=function(){var q=0;var t={};var r={};
var u={};var x,w;if(this._propsEase){for(x in this._propsTo){if(this._propsTo.hasOwnProperty(x)){w=this._propsEase[x];
if(n(w)){w=f.create(w).toEasingFunction()}if(w===undefined){if(t[this._ease]===undefined){t[this._ease]={};
r[this._ease]={};u[this._ease]=this._ease.easingFunction;q++}t[this._ease][x]=this._propsTo[x];
r[this._ease][x]=this._propsFrom[x]}else{if(typeof w==="function"){t[q]={};r[q]={};
t[q][x]=this._propsTo[x];r[q][x]=this._propsFrom[x];u[q]=w;q++}else{if(t[w]===undefined){t[w]={};
r[w]={};u[w]=w;q++}t[w][x]=this._propsTo[x];r[w][x]=this._propsFrom[x]}}}}if(q>1){var s=m(this._options||{},true);
var v=this._duration*0.001;this._storeOnUpdate=this._onUpdate;this._onUpdate=this._onUpdateClips;
s.onStart=null;s.onUpdate=null;s.onDraw=null;s.onComplete=null;this._clips=[];for(w in t){if(t.hasOwnProperty(w)){s.ease=u[w];
s.propsFrom=r[w];this._clips.push(new j(this._target,v,t[w],s))}}w="linear";this._propsTo={};
this._propsFrom={}}else{for(x in u){if(u.hasOwnProperty(x)){w=u[x]}}}if(w!==undefined){this._ease=(typeof w==="function")?new l(w):p(w)
}}return h._prepareProperties.call(this)};d._onUpdateClips=function(s){var q=(this._direction===1)?s.progress():1-s.progress();
var r=this._clips.length;while(r--){this._clips[r].progress(q)}if(typeof this._storeOnUpdate==="function"){this._storeOnUpdate.call(this,this)
}};a.exports=o},{"../helpers/BezierCurveCssManager":226,"../helpers/isCssCubicBezierString":232,"@marcom/ac-clip":162,"@marcom/ac-easing":184,"@marcom/ac-object":138}],223:[function(f,c,g){var b=f("../helpers/convertToStyleObject");
var d=f("../helpers/convertToTransitionableObjects");var n=f("@marcom/ac-object").clone;
var k=f("@marcom/ac-object").create;var l=f("../helpers/removeTransitions");var j=f("../helpers/BezierCurveCssManager");
var p=f("./ClipEasing");var o=f("@marcom/ac-dom-styles");function a(s,r,t,q){q=q||{};
this._el=s;this._storeOnStart=q.onStart||null;this._storeOnDraw=q.onDraw||null;
this._storeOnComplete=q.onComplete||null;q.onStart=this._onStart;q.onDraw=this._onDraw;
q.onComplete=this._onComplete;p.call(this,{},r,t,q)}var m=p.prototype;var h=a.prototype=k(m);
h.play=function(){var q=m.play.call(this);if(this._remainingDelay!==0){o.setStyle(this._el,b(this._target))
}return q};h.reset=function(){var q=m.reset.call(this);o.setStyle(this._el,b(this._target));
return q};h.destroy=function(){this._el=null;this._completeStyles=null;this._storeOnStart=null;
this._storeOnDraw=null;this._storeOnComplete=null;return m.destroy.call(this)};
h.target=function(){return this._el};h._prepareProperties=function(){var t=d(this._el,this._propsTo,this._propsFrom);
this._target=t.target;this._propsFrom=t.propsFrom;this._propsTo=t.propsTo;l(this._el,this._target);
var r=(this._isYoyo)?this._propsFrom:this._propsTo;this._completeStyles=b(r);if(this._options.removeStylesOnComplete!==undefined){var u;
var s=this._options.removeStylesOnComplete;if(typeof s==="boolean"&&s){for(u in this._completeStyles){if(this._completeStyles.hasOwnProperty(u)){this._completeStyles[u]=null
}}}else{if(typeof s==="object"&&s.length){var q=s.length;while(q--){u=s[q];if(this._completeStyles.hasOwnProperty(u)){this._completeStyles[u]=null
}}}}}return m._prepareProperties.call(this)};h._onStart=function(q){if(this.playing()&&this._direction===1&&this._delay===0){o.setStyle(this._el,b(this._propsFrom))
}if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,this)}};
h._onDraw=function(q){o.setStyle(this._el,b(this._target));if(typeof this._storeOnDraw==="function"){this._storeOnDraw.call(this,this)
}};h._onComplete=function(q){o.setStyle(this._el,this._completeStyles);if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,this)
}};c.exports=a},{"../helpers/BezierCurveCssManager":226,"../helpers/convertToStyleObject":229,"../helpers/convertToTransitionableObjects":230,"../helpers/removeTransitions":233,"./ClipEasing":222,"@marcom/ac-dom-styles":45,"@marcom/ac-object":138}],224:[function(k,b,z){var c=k("../helpers/convertToStyleObject");
var p=k("../helpers/convertToTransitionableObjects");var x=k("@marcom/ac-object").clone;
var n=k("@marcom/ac-object").create;var u=k("@marcom/ac-easing").createPredefined;
var m=k("../helpers/isCssCubicBezierString");var v=k("../helpers/removeTransitions");
var g=k("../helpers/splitUnits");var j=k("../helpers/transitionEnd");var o=k("../helpers/waitAnimationFrames");
var w=k("../helpers/BezierCurveCssManager");var a=k("@marcom/ac-clip").Clip;var s=k("./ClipEasing");
var y=k("@marcom/ac-dom-styles");var t=k("@marcom/ac-page-visibility").PageVisibilityManager;
var d="ease";var h="%EASE% is not a supported predefined ease when transitioning with Elements and CSS transition. If you need to use %EASE% then pass the inlineStyle:true option.";
var l="Function eases are not supported when using CSS transitions with Elements. Either use a cubic-bezier string (e.g. 'cubic-bezier(0, 0, 1, 1)' or pass the inlineStyle option as `true` to render styles each frame instead of using CSS transitions.";
function f(C,B,D,A){A=A||{};this._el=C;this._storeEase=A.ease;if(typeof this._storeEase==="function"){throw new Error(l)
}this._storeOnStart=A.onStart||null;this._storeOnComplete=A.onComplete||null;A.onStart=this._onStart.bind(this);
A.onComplete=this._onComplete.bind(this);this._stylesTo=x(D,true);this._stylesFrom=(A.propsFrom)?x(A.propsFrom,true):{};
this._propsEase=(A.propsEase)?x(A.propsEase,true):{};if(m(A.ease)){A.ease=w.create(A.ease).toEasingFunction()
}a.call(this,{},B,{},A);this._propsFrom={}}var q=a.prototype;var r=f.prototype=n(q);
r.play=function(){var A=q.play.call(this);if(this._direction===1&&this.progress()===0&&this._remainingDelay!==0){this._applyStyles(0,c(this._stylesFrom))
}return A};r.reset=function(){var A=q.reset.call(this);this._stylesClip.reset();
this._applyStyles(0,c(this._styles));return A};r.destroy=function(){t.off("changed",this._onVisibilityChanged);
this._removeTransitionListener();this.off("pause",this._onPaused);this._onPaused();
this._stylesClip.destroy();this._stylesClip=null;this._el=null;this._propsArray=null;
this._styles=null;this._stylesFrom=null;this._stylesTo=null;this._completeStyles=null;
this._storeOnStart=null;this._storeOnComplete=null;this._onTransitionEnded=null;
return q.destroy.call(this)};r.target=function(){return this._el};r.duration=function(B){var A=q.duration.call(this,B);
if(B===undefined){return A}if(this.playing()){this.progress(this._progress)}return A
};r.progress=function(A){var B=q.progress.call(this,A);if(A===undefined){return B
}A=(this._direction===1)?A:1-A;this._stylesClip.progress(A);this._applyStyles(0,c(this._styles));
if(this.playing()){this._isWaitingForStylesToBeApplied=true;o(this._setStylesAfterWaiting,2)
}return B};r._prepareProperties=function(){var C=p(this._el,this._stylesTo,this._stylesFrom);
this._styles=C.target;this._stylesTo=C.propsTo;this._stylesFrom=C.propsFrom;var D=this._storeEase||d;
this._eases={};this._propsArray=[];var F;this._styleCompleteTo=c(this._stylesTo);
this._styleCompleteFrom=c(this._stylesFrom);this._propsEaseKeys={};var E;for(E in this._stylesTo){if(this._stylesTo.hasOwnProperty(E)){this._propsArray[this._propsArray.length]=E;
if(this._propsEase[E]===undefined){if(this._eases[D]===undefined){F=this._convertEase(D);
this._eases[D]=F.css}this._propsEaseKeys[E]=D}else{if(this._eases[this._propsEase[E]]===undefined){F=this._convertEase(this._propsEase[E]);
this._eases[this._propsEase[E]]=F.css;this._propsEaseKeys[E]=this._propsEase[E];
this._propsEase[E]=F.js}else{if(m(this._propsEase[E])){this._propsEaseKeys[E]=this._propsEase[E];
this._propsEase[E]=this._eases[this._propsEase[E]]["1"].toEasingFunction()}}}}}this._onPaused=this._onPaused.bind(this);
this.on("pause",this._onPaused);this._setOtherTransitions();this._currentTransitionStyles=this._otherTransitions;
this._completeStyles=c((this._isYoyo)?this._stylesFrom:this._stylesTo);if(this._options.removeStylesOnComplete!==undefined){var B=this._options.removeStylesOnComplete;
if(typeof B==="boolean"&&B){for(E in this._stylesTo){this._completeStyles[E]=null
}}else{if(typeof B==="object"&&B.length){var A=B.length;while(A--){this._completeStyles[B[A]]=null
}}}}this._onTransitionEnded=this._onTransitionEnded.bind(this);this._setStylesAfterWaiting=this._setStylesAfterWaiting.bind(this);
this._onVisibilityChanged=this._onVisibilityChanged.bind(this);t.on(t.CHANGED,this._onVisibilityChanged);
this._stylesClip=new s(this._styles,1,this._stylesTo,{ease:this._options.ease,propsFrom:this._stylesFrom,propsEase:this._options.propsEase});
a._remove(this._stylesClip);return q._prepareProperties.call(this)};r._convertEase=function(C){if(typeof C==="function"){throw new Error(l)
}var A;var B;if(m(C)){A=w.create(C);B=A.toEasingFunction()}else{var D=u(C);if(D.cssString===null){throw new Error(h.replace(/%EASE%/g,C))
}A=w.create(D.cssString);B=C}return{css:{"1":A,"-1":A.reversed()},js:B}};r._complete=function(){if((this._isWaitingForStylesToBeApplied||this._isTransitionEnded||!this._isListeningForTransitionEnd)&&this.progress()===1){this._isWaitingForStylesToBeApplied=false;
q._complete.call(this)}};r._onTransitionEnded=function(){this._isTransitionEnded=true;
this._complete()};r._addTransitionListener=function(){if(!this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=true;
this._isTransitionEnded=false;this._el.addEventListener(j,this._onTransitionEnded)
}};r._removeTransitionListener=function(){if(this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=false;
this._isTransitionEnded=false;this._el.removeEventListener(j,this._onTransitionEnded)
}};r._applyStyles=function(C,A){if(C>0){var D="";var B={};var E;for(E in this._eases){if(this._eases.hasOwnProperty(E)){B[E]=this._eases[E][this._direction].splitAt(this.progress()).toCSSString()
}}for(E in this._stylesTo){if(this._stylesTo.hasOwnProperty(E)){D+=E+" "+C+"ms "+B[this._propsEaseKeys[E]]+" 0ms, "
}}this._currentTransitionStyles=D.substr(0,D.length-2);if(!this._doStylesMatchCurrentStyles(A)){this._addTransitionListener()
}else{this._removeTransitionListener()}}else{this._currentTransitionStyles="";this._removeTransitionListener()
}A.transition=this._getOtherClipTransitionStyles()+this._currentTransitionStyles;
y.setStyle(this._el,A)};r._doStylesMatchCurrentStyles=function(C){var B=y.getStyle.apply(this,[this._el].concat([this._propsArray]));
var A;for(A in C){if(C.hasOwnProperty(A)&&B.hasOwnProperty(A)&&C[A]!==B[A]){return false
}}return true};r._setStylesAfterWaiting=function(){this._isWaitingForStylesToBeApplied=false;
if(this.playing()){var B=this._durationMs*(1-this.progress());var A=(this._direction>0)?this._styleCompleteTo:this._styleCompleteFrom;
this._applyStyles(B,A)}};r._setOtherTransitions=function(){v(this._el,this._stylesTo);
var A=a.getAll(this._el);var B=A.length;while(B--){if(A[B]!==this&&A[B].playing()&&A[B]._otherTransitions&&A[B]._otherTransitions.length){this._otherTransitions=A[B]._otherTransitions;
return}}this._otherTransitions=y.getStyle(this._el,"transition").transition;if(this._otherTransitions===null||this._otherTransitions==="all 0s ease 0s"){this._otherTransitions=""
}};r._getTransitionStyles=function(){var A=this._getOtherClipTransitionStyles();
if(this._otherTransitions.length){A+=this._otherTransitions}else{if(A.length){A=A.substr(0,A.length-2)
}}return A};r._getOtherClipTransitionStyles=function(){var C="";var A=a.getAll(this._el);
var B=A.length;while(B--){if(A[B]!==this&&A[B].playing()&&A[B]._currentTransitionStyles&&A[B]._currentTransitionStyles.length){C+=A[B]._currentTransitionStyles+", "
}}return C};r._onVisibilityChanged=function(A){if(this.playing()&&!A.isHidden){this._update({timeNow:this._getTime()});
var B=this.progress();if(B<1){this.progress(B)}}};r._onPaused=function(B){var A=y.getStyle.apply(this,[this._el].concat([this._propsArray]));
A.transition=this._getTransitionStyles();this._removeTransitionListener();y.setStyle(this._el,A)
};r._onStart=function(A){var B=(this._direction===1&&this.progress()===0&&this._delay===0)?2:0;
if(B){this._isWaitingForStylesToBeApplied=true;this._applyStyles(0,this._styleCompleteFrom)
}o(this._setStylesAfterWaiting,B);if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,this)
}};r._onComplete=function(A){this._removeTransitionListener();this._completeStyles.transition=this._getTransitionStyles();
y.setStyle(this._el,this._completeStyles);if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,this)
}};b.exports=f},{"../helpers/BezierCurveCssManager":226,"../helpers/convertToStyleObject":229,"../helpers/convertToTransitionableObjects":230,"../helpers/isCssCubicBezierString":232,"../helpers/removeTransitions":233,"../helpers/splitUnits":234,"../helpers/transitionEnd":236,"../helpers/waitAnimationFrames":237,"./ClipEasing":222,"@marcom/ac-clip":162,"@marcom/ac-dom-styles":45,"@marcom/ac-easing":184,"@marcom/ac-object":138,"@marcom/ac-page-visibility":144}],225:[function(c,d,a){var g=c("@marcom/ac-easing").createBezier;
function b(j,h){this.manager=h;this.p1={x:j[0],y:j[1]};this.p2={x:j[2],y:j[3]};
this._isLinear=(this.p1.x===this.p1.y)&&(this.p2.x===this.p2.y);this._cacheSplits={}
}var f=b.prototype;f.splitAt=function(l){if(this._isLinear){return this}l=Math.round(l*40)/40;
if(l===0){return this}else{if(this._cacheSplits[l]!==undefined){return this._cacheSplits[l]
}}var r=[this.p1.x,this.p2.x];var o=[this.p1.y,this.p2.y];var n=0;var p=l;var j=0;
var q=1;var k=this._getStartX(l,r);while(p!==k&&n<1000){if(p<k){q=l}else{j=l}l=j+((q-j)*0.5);
k=this._getStartX(l,r);++n}var m=this._splitBezier(l,r,o);var s=this._normalize(m);
var h=this.manager.create(s);this._cacheSplits[p]=h;return h};f.reversed=function(){var h=this.toArray();
return this.manager.create([0.5-(h[2]-0.5),0.5-(h[3]-0.5),0.5-(h[0]-0.5),0.5-(h[1]-0.5)])
};f.toArray=function(){return[this.p1.x,this.p1.y,this.p2.x,this.p2.y]};f.toCSSString=function(){return"cubic-bezier("+this.p1.x+", "+this.p1.y+", "+this.p2.x+", "+this.p2.y+")"
};f.toEasingFunction=function(){return g.apply(this,this.toArray()).easingFunction
};f._getStartX=function(n,h){var m=n-1;var l=n*n;var k=m*m;var j=l*n;return j-3*l*m*h[1]+3*n*k*h[0]
};f._splitBezier=function(n,h,o){var m=n-1;var l=n*n;var k=m*m;var j=l*n;return[j-3*l*m*h[1]+3*n*k*h[0],j-3*l*m*o[1]+3*n*k*o[0],l-2*n*m*h[1]+k*h[0],l-2*n*m*o[1]+k*o[0],n-m*h[1],n-m*o[1]]
};f._normalize=function(h){return[(h[2]-h[0])/(1-h[0]),(h[3]-h[1])/(1-h[1]),(h[4]-h[0])/(1-h[0]),(h[5]-h[1])/(1-h[1])]
};d.exports=b},{"@marcom/ac-easing":184}],226:[function(c,d,a){var b=c("./BezierCurveCss");
function g(){this._instances={}}var f=g.prototype;f.create=function(k){var j;if(typeof k==="string"){j=k.replace(/ /g,"")
}else{j="cubic-bezier("+k.join(",")+")"}if(this._instances[j]===undefined){if(typeof k==="string"){k=k.match(/\d*\.?\d+/g);
var h=k.length;while(h--){k[h]=Number(k[h])}}this._instances[j]=new b(k,this)}return this._instances[j]
};d.exports=new g()},{"./BezierCurveCss":225}],227:[function(b,c,a){if(typeof window.Float32Array==="undefined"){window.Float32Array=function(){}
}},{}],228:[function(d,f,c){var b=d("./splitUnits");var h=d("@marcom/ac-dom-metrics");
var a={translateX:"width",translateY:"height"};function j(k,m,n){this._transform=k;
var l;var o;var p;for(p in n){if(n.hasOwnProperty(p)&&typeof this._transform[p]==="function"){l=b(n[p]);
if(l.unit==="%"){o=this._convertPercentToPixelValue(p,l.value,m)}else{o=l.value
}this._transform[p].call(this._transform,o)}}}var g=j.prototype;g._convertPercentToPixelValue=function(n,m,l){n=a[n];
var k=h.getDimensions(l);if(k[n]){m*=0.01;return k[n]*m}return m};g.toArray=function(){return this._transform.toArray()
};g.toCSSString=function(){return this._transform.toCSSString()};f.exports=j},{"./splitUnits":234,"@marcom/ac-dom-metrics":41}],229:[function(b,c,a){c.exports=function d(h){var g={};
var f;var j;for(j in h){if(h.hasOwnProperty(j)&&h[j]!==null){if(h[j].isColor){if(h[j].isRgb){g[j]="rgb("+Math.round(h[j].r)+", "+Math.round(h[j].g)+", "+Math.round(h[j].b)+")"
}else{if(h[j].isRgba){g[j]="rgba("+Math.round(h[j].r)+", "+Math.round(h[j].g)+", "+Math.round(h[j].b)+", "+h[j].a+")"
}}}else{if(j==="transform"){f=(h[j].length===6)?"matrix":"matrix3d";g[j]=f+"("+h[j].join(",")+")"
}else{if(!h[j].unit){g[j]=h[j].value}else{g[j]=h[j].value+h[j].unit}}}}}return g
}},{}],230:[function(h,d,k){var o=h("@marcom/ac-object").clone;var f=h("./splitUnits");
var b=h("./toCamCase");var c=h("@marcom/ac-color").Color;var r=h("@marcom/ac-dom-styles");
var n=h("@marcom/ac-feature");var j=h("@marcom/ac-transform").Transform;var a=h("./TransformMatrix");
var m=function(t){if(c.isRgba(t)){t=new c(t).rgbaObject();t.isRgba=true}else{t=new c(t).rgbObject();
t.isRgb=true}t.isColor=true;return t};var s=function(t){if(t.isRgb){t.isRgb=false;
t.isRgba=true;t.a=1}};var q=function(u,t,v){if(u.isRgba||t.isRgba||v.isRgba){s(u);
s(t);s(v)}};var p=function(t){return[t[0],t[1],0,0,t[2],t[3],0,0,0,0,1,0,t[4],t[5],0,1]
};var l=function(u,t,v){if(u.transform.length===16||t.transform.length===16||v.transform.length===16){if(u.transform.length===6){u.transform=p(u.transform)
}if(t.transform.length===6){t.transform=p(t.transform)}if(v.transform.length===6){v.transform=p(v.transform)
}}};d.exports=function g(v,B,A){var x={};B=o(B,true);A=o(A,true);var u;var C,y,z;
var w=n.cssPropertyAvailable("transform");var t;for(t in B){if(B.hasOwnProperty(t)&&B[t]!==null){if(t==="transform"){if(w){C=new j();
u=r.getStyle(v,"transform")["transform"]||"none";C.setMatrixValue(u);y=new a(new j(),v,B[t])
}if(y&&y.toCSSString()!==C.toCSSString()){z=new a(A[t]?new j():C.clone(),v,A[t]);
x[t]=C.toArray();B[t]=y.toArray();A[t]=z.toArray()}else{x[t]=null;B[t]=null}}else{u=r.getStyle(v,t)[b(t)]||A[t];
if(c.isColor(u)){x[t]=m(u);A[t]=(A[t]!==undefined)?m(A[t]):o(x[t],true);B[t]=m(B[t])
}else{x[t]=f(u);A[t]=(A[t]!==undefined)?f(A[t]):o(x[t],true);B[t]=f(B[t])}}}}for(t in A){if(A.hasOwnProperty(t)&&A[t]!==null&&(B[t]===undefined||B[t]===null)){if(t==="transform"){if(w){C=new j();
C.setMatrixValue(getComputedStyle(v).transform||getComputedStyle(v).webkitTransform||"none");
z=new a(new j(),v,A[t])}if(z&&z.toCSSString()!==C.toCSSString()){y=new a(C.clone());
x[t]=C.toArray();B[t]=y.toArray();A[t]=z.toArray()}else{x[t]=null;B[t]=null;A[t]=null
}}else{u=r.getStyle(v,t)[b(t)];if(c.isColor(u)){x[t]=m(u);B[t]=o(x[t],true);A[t]=m(A[t])
}else{x[t]=f(u);A[t]=f(A[t]);B[t]=o(x[t],true)}}}if(x[t]&&x[t].isColor){q(x[t],A[t],B[t])
}}if(x.transform){l(x,A,B)}return{target:x,propsTo:B,propsFrom:A}}},{"./TransformMatrix":228,"./splitUnits":234,"./toCamCase":235,"@marcom/ac-color":164,"@marcom/ac-dom-styles":45,"@marcom/ac-feature":101,"@marcom/ac-object":138,"@marcom/ac-transform":214}],231:[function(b,c,a){c.exports=function d(j){if(j.transitionProperty){var m="";
var h=j.transitionProperty.split(", ");var k=j.transitionDuration.split(", ");var l=j.transitionTimingFunction.replace(/\d+[,]+[\s]/gi,function(n){return n.substr(0,n.length-1)
}).split(", ");var f=j.transitionDelay.split(", ");var g=h.length;while(g--){m+=h[g]+" "+k[g]+" "+l[g]+" "+f[g]+", "
}return m.substr(0,m.length-2)}return false}},{}],232:[function(c,d,b){d.exports=function a(f){return typeof f==="string"&&f.substr(0,13)==="cubic-bezier("
}},{}],233:[function(c,d,b){var g=c("./getShorthandTransition");var f=c("@marcom/ac-dom-styles");
d.exports=function a(k,m){var l=f.getStyle(k,"transition","transition-property","transition-duration","transition-timing-function","transition-delay");
l=l.transition||g(l);if(l&&l.length){l=l.split(",");var j=0;var n;var h=l.length;
while(h--){n=l[h].trim().split(" ")[0];if(m[n]!==undefined){l.splice(h,1);++j}}if(j){if(l.length===0){l=["all"]
}f.setStyle(k,{transition:l.join(",").trim()})}}}},{"./getShorthandTransition":231,"@marcom/ac-dom-styles":45}],234:[function(c,d,b){d.exports=function a(j){j=String(j);
if(j.indexOf(" ")>-1){throw new Error("Shorthand CSS is not supported. Please use longhand CSS only.")
}var h=/(\d*\.?\d*)(.*)/;var f=1;if(j&&j.substr(0,1)==="-"){j=j.substr(1);f=-1}var g=String(j).match(h);
return{value:Number(g[1])*f,unit:g[2]}}},{}],235:[function(c,d,b){d.exports=function a(g){var f=function(j,k,l,h){return(l===0)&&(h.substr(1,3)!=="moz")?k:k.toUpperCase()
};return g.replace(/-(\w)/g,f)}},{}],236:[function(d,f,c){var a;f.exports=(function b(){if(a){return a
}var g;var h=document.createElement("fakeelement");var j={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};
for(g in j){if(h.style[g]!==undefined){a=j[g];return a}}})()},{}],237:[function(d,f,b){var a=d("@marcom/ac-page-visibility").PageVisibilityManager;
f.exports=function c(l,j){if(j){var k=function(m){if(a.isHidden){setTimeout(m,16)
}else{window.requestAnimationFrame(m)}};var h=0;var g=function(){if(h===j){l.call(this)
}else{++h;k(g)}};g()}else{l.call(this)}}},{"@marcom/ac-page-visibility":144}],238:[function(d,f,b){var c=d("@marcom/ac-eclipse").Clip;
var a=d("@marcom/ac-feature/cssPropertyAvailable");f.exports=function g(j,m,l,k,h){if(a("opacity")){h=h||{};
if(k){h.propsFrom=h.propsFrom||{};h.propsFrom.opacity=m;return c.to(j,k,{opacity:l},h)
}else{j.style.opacity=l;if(typeof h.onStart==="function"){h.onStart()}if(typeof h.onComplete==="function"){h.onComplete()
}}}else{j.style.visibility=(l)?"visible":"hidden";if(typeof h.onStart==="function"){h.onStart()
}if(typeof h.onComplete==="function"){h.onComplete()}}}},{"@marcom/ac-eclipse":219,"@marcom/ac-feature/cssPropertyAvailable":96}],239:[function(f,g,c){var d=f("@marcom/ac-eclipse").Clip;
var b=f("@marcom/ac-feature/cssPropertyAvailable");g.exports=function a(j,k,h){h=h||{};
if(b("opacity")){if(k){return d.to(j,k,{opacity:1},h)}else{j.style.opacity=1;if(typeof h.onStart==="function"){h.onStart()
}if(typeof h.onComplete==="function"){h.onComplete()}}}else{j.style.visibility="visible";
if(typeof h.onStart==="function"){h.onStart()}if(typeof h.onComplete==="function"){h.onComplete()
}}}},{"@marcom/ac-eclipse":219,"@marcom/ac-feature/cssPropertyAvailable":96}],240:[function(d,f,b){var c=d("@marcom/ac-eclipse").Clip;
var a=d("@marcom/ac-feature/cssPropertyAvailable");f.exports=function g(j,k,h){h=h||{};
if(a("opacity")){if(k){return c.to(j,k,{opacity:0},h)}else{j.style.opacity=0;if(typeof h.onStart==="function"){h.onStart()
}if(typeof h.onComplete==="function"){h.onComplete()}}}else{j.style.visibility="hidden";
if(typeof h.onStart==="function"){h.onStart()}if(typeof h.onComplete==="function"){h.onComplete()
}}}},{"@marcom/ac-eclipse":219,"@marcom/ac-feature/cssPropertyAvailable":96}],241:[function(f,g,c){var d=f("@marcom/ac-eclipse").Clip;
var h=f("@marcom/ac-dom-styles");var b=f("@marcom/ac-feature/cssPropertyAvailable");
g.exports=function a(l,j,o,m,k){k=k||{};var n;if(b("transition")){n={transform:{translateX:j+"px",translateY:o+"px"}}
}else{n={left:j+"px",top:o+"px"}}if(m){return d.to(l,m,n,k)}else{h.setStyle(l,n);
if(typeof k.onStart==="function"){k.onStart()}if(typeof k.onComplete==="function"){k.onComplete()
}}}},{"@marcom/ac-dom-styles":45,"@marcom/ac-eclipse":219,"@marcom/ac-feature/cssPropertyAvailable":96}],242:[function(d,f,c){var b=d("@marcom/ac-feature/cssPropertyAvailable");
var a=d("./move");f.exports=function g(k,h,l,j){return a(k,h,0,l,j)}},{"./move":241,"@marcom/ac-feature/cssPropertyAvailable":96}],243:[function(d,f,b){var c=d("@marcom/ac-eclipse").Clip;
f.exports=function a(g,p,l,j,s){s=s||{};var h=g===window;var r;var o;if(h){r=g.scrollX;
o=g.scrollY}else{r=g.scrollLeft;o=g.scrollTop}var n={x:r,y:o};var q={x:p,y:l};if(typeof s.onDraw==="function"){var m=s.onDraw
}var k=function(t){if(h){g.scrollTo(n.x,n.y)}else{g.scrollLeft=n.x;g.scrollTop=n.y
}if(m){m.call(this,t)}};s.onDraw=k;return c.to(n,j,q,s)}},{"@marcom/ac-eclipse":219}],244:[function(c,d,b){var a=c("./scroll");
d.exports=function f(l,g,m,k){var j=l===window;var h;if(j){h=l.scrollY}else{h=l.scrollTop
}return a(l,g,h,m,k)}},{"./scroll":243}],245:[function(d,a,g){var h=d("./ac-gallery/helpers/extendProto");
var k=d("./ac-gallery/Gallery");var b=d("./ac-gallery/auto/AutoGallery");var j=d("./ac-gallery/fade/FadeGallery");
var c=d("./ac-gallery/slide/SlideGallery");var f=d("./ac-gallery/Item");k.create=d("./ac-gallery/factories/create");
k.autoCreate=d("./ac-gallery/factories/autoCreate");k.extend=h;b.extend=h;j.extend=h;
c.extend=h;f.extend=h;a.exports={Gallery:k,AutoGallery:b,FadeGallery:j,SlideGallery:c,Item:f,ToggleNav:d("./ac-gallery/navigation/ToggleNav")}
},{"./ac-gallery/Gallery":246,"./ac-gallery/Item":247,"./ac-gallery/auto/AutoGallery":249,"./ac-gallery/factories/autoCreate":250,"./ac-gallery/factories/create":251,"./ac-gallery/fade/FadeGallery":252,"./ac-gallery/helpers/extendProto":255,"./ac-gallery/navigation/ToggleNav":258,"./ac-gallery/slide/SlideGallery":259}],246:[function(b,a,f){var h=b("@marcom/ac-object/create");
var d=b("./analytics/AnalyticsManager");var m=b("@marcom/ac-classlist");var l=b("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var c=b("./Item");function k(n){n=n||{};this._wrapAround=n.wrapAround||false;this._itemType=n.itemType||c;
this._items=[];this._itemsIdLookup={};this.showNext=this.showNext.bind(this);this.showPrevious=this.showPrevious.bind(this);
this._update=this._update.bind(this);this._updateItems=this._updateItems.bind(this);
l.call(this);k._add(this,n.analyticsOptions)}k.FADE="fade";k.FADE_SELECTOR="[data-ac-gallery-fade]";
k.SLIDE="slide";k.SLIDE_SELECTOR="[data-ac-gallery-slide]";k.UPDATE="update";k.UPDATE_COMPLETE="update:complete";
var j=l.prototype;var g=k.prototype=h(j);g.addItem=function(o,n){if(o.nodeType){o=new this._itemType(o)
}else{if(this._items.indexOf(o)>-1){return o}}if(typeof n==="number"){this._items.splice(n,0,o)
}else{this._items.push(o)}if(this._items.length===1){o.show();this._setCurrentItem(o)
}else{o.hide();if(this.getNextItem()===o){this._setNextItem(o)}if(this.getPreviousItem()===o){this._setPreviousItem(o)
}}if(o.getElementId()!==null){this._itemsIdLookup[o.getElementId()]=o}o.on(c.SELECTED,this._update);
return o};g.removeItem=function(r,q){q=q||{};if(typeof r==="number"){r=this._items[r]
}var p=this._items.indexOf(r);if(p>-1){var n=this.getNextItem();var o=this.getPreviousItem();
this._items.splice(p,1);r.off(c.SELECTED,this._update);if(n===r){this._setNextItem(this.getNextItem())
}if(o===r){this._setPreviousItem(this.getPreviousItem())}}if(r===this._currentItem&&this._items.length&&q.setCurrentItem!==false){this._update({item:this._items[0]});
this._setLastItem(null)}if(q.destroyItem&&r.getElement()){r.destroy()}return r};
g.show=function(o,n){if(typeof o==="number"){o=this._items[o]}else{if(typeof o==="string"){o=this._itemsIdLookup[o]
}}if(o){n=n||{};this._update({item:o,interactionEvent:n.interactionEvent})}return o||null
};g.showNext=function(n){var o=this.getNextItem();if(o){this.show(o,n)}return o
};g.showPrevious=function(n){var o=this.getPreviousItem();if(o){this.show(o,n)}return o
};g.isInView=function(){return this._currentItem&&this._currentItem.isInView()};
g.getTotalItems=function(){return this._items.length};g.getItems=function(){return this._items
};g.getItem=function(n){if(typeof n==="number"){return this.getItemAt(n)}else{if(typeof n==="string"){return this.getItemById(n)
}}};g.getItemAt=function(n){return this._items[n]||null};g.getItemById=function(n){return this._itemsIdLookup[n]||null
};g.getItemIndex=function(n){return this._items.indexOf(n)};g.getCurrentItem=function(){return this._currentItem||null
};g.getLastItem=function(){return this._lastItem||null};g.getNextItem=function(){var o;
var n=this._items.indexOf(this._currentItem);if(n<this._items.length-1){o=this._items[n+1]
}else{if(this._wrapAround){o=this._items[0]}}return o||null};g.getPreviousItem=function(){var o;
var n=this._items.indexOf(this._currentItem);if(n>0){o=this._items[n-1]}else{if(this._wrapAround){o=this._items[this._items.length-1]
}}return o||null};g.getId=function(){return this._id};g.destroy=function(n){n=n||{};
if(n.destroyItems===undefined){n.destroyItems=true}this._setCurrentItem(null);if(n.destroyItems){var o;
while(this._items.length){o=this._items[0];o.off(c.SELECTED,this._update);this.removeItem(o,{destroyItem:true,setCurrentItem:false})
}}this._items=null;this._itemsIdLookup=null;k._remove(this);return j.destroy.call(this)
};g._setCurrentItem=function(n){if(this._currentItem&&this._currentItem.getElement()&&this._currentItem!==n){m.remove(this._currentItem.getElement(),c.CSS_CURRENT_ITEM);
this._setLastItem(this._currentItem)}this._currentItem=n;if(this._currentItem&&this._currentItem.getElement()){m.add(this._currentItem.getElement(),c.CSS_CURRENT_ITEM);
this._setNextItem(this.getNextItem());this._setPreviousItem(this.getPreviousItem())
}};g._setLastItem=function(n){if(this._lastItem&&this._lastItem.getElement()&&this._lastItem!==n){m.remove(this._lastItem.getElement(),c.CSS_LAST_ITEM)
}this._lastItem=n;if(this._lastItem&&this._lastItem.getElement()){m.add(this._lastItem.getElement(),c.CSS_LAST_ITEM)
}};g._setNextItem=function(n){if(this._nextItem&&this._nextItem.getElement()&&this._nextItem!==n){m.remove(this._nextItem.getElement(),c.CSS_NEXT_ITEM)
}this._nextItem=n;if(this._nextItem&&this._nextItem.getElement()){m.add(this._nextItem.getElement(),c.CSS_NEXT_ITEM)
}};g._setPreviousItem=function(n){if(this._previousItem&&this._previousItem.getElement()&&this._previousItem!==n){m.remove(this._previousItem.getElement(),c.CSS_PREVIOUS_ITEM)
}this._previousItem=n;if(this._previousItem&&this._previousItem.getElement()){m.add(this._previousItem.getElement(),c.CSS_PREVIOUS_ITEM)
}};g._updateItems=function(o,n){if(o.outgoing[0]){o.outgoing[0].hide()}o.incoming[0].show();
if(!n){this.trigger(k.UPDATE_COMPLETE,o)}};g._update=function(n){var p=this._currentItem!==n.item;
if(p){this._setCurrentItem(n.item)}var o={incoming:[n.item],outgoing:(this._lastItem)?[this._lastItem]:[],interactionEvent:n.interactionEvent||null};
if(p){this.trigger(k.UPDATE,o)}this._updateItems(o,!p)};k._instantiate=function(){this._galleries=[];
this._idCounter=0;return this};k._add=function(o,n){this._galleries.push(o);o._id=++this._idCounter;
d.add(o,n)};k._remove=function(n){var o=this._galleries.indexOf(n);if(o>-1){this._galleries.splice(o,1);
d.remove(n)}};k.getAll=function(){return Array.prototype.slice.call(this._galleries)
};k.getAllInView=function(){var o=[];var n=this._galleries.length;while(n--){if(this._galleries[n].isInView()){o.push(this._galleries[n])
}}return o};k.destroyAll=function(){var n=this._galleries.length;while(n--){this._galleries[n].destroy()
}this._galleries=[]};a.exports=k._instantiate()},{"./Item":247,"./analytics/AnalyticsManager":248,"@marcom/ac-classlist":12,"@marcom/ac-event-emitter-micro":90,"@marcom/ac-object/create":134}],247:[function(c,b,f){var h=c("@marcom/ac-object/create");
var k=c("@marcom/ac-keyboard/keyMap");var o=c("@marcom/ac-classlist");var l=c("@marcom/ac-dom-events");
var m=c("@marcom/ac-dom-metrics");var n=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var a=c("@marcom/ac-keyboard");var j="current";function d(p){this._el=p;this._triggerKeys=[];
this._triggerEls={};this._isShown=false;this._onKeyboardInteraction=this._onKeyboardInteraction.bind(this);
this._onTriggered=this._onTriggered.bind(this);n.call(this)}d.CSS_CURRENT_ITEM="ac-gallery-currentitem";
d.CSS_LAST_ITEM="ac-gallery-lastitem";d.CSS_NEXT_ITEM="ac-gallery-nextitem";d.CSS_PREVIOUS_ITEM="ac-gallery-previousitem";
d.SELECTED="selected";d.SHOW="show";d.HIDE="hide";var g=d.prototype=h(n.prototype);
g.show=function(){this._isShown=true;this._addCurrentClassToTriggers();this.trigger(d.SHOW,this)
};g.hide=function(){this._isShown=false;this._removeCurrentClassFromTriggers();
this.trigger(d.HIDE,this)};g.addElementTrigger=function(r,q){q=q||"click";if(this._triggerEls[q]===undefined){this._triggerEls[q]=[]
}var p=this._triggerEls[q].indexOf(r);if(p<0){l.addEventListener(r,q,this._onTriggered);
this._triggerEls[q].push(r);if(this._isShown){o.add(r,j)}}};g.removeElementTrigger=function(r,q){q=q||"click";
if(this._triggerEls[q]===undefined){return}var p=this._triggerEls[q].indexOf(r);
if(p>-1){l.removeEventListener(r,q,this._onTriggered);if(this._isShown){o.remove(r,j)
}}if(this._triggerEls[q].length===0){this._triggerEls[q]=null}};g.addKeyTrigger=function(q){if(typeof q==="string"){q=k[q.toUpperCase()]
}if(typeof q==="number"){var p=this._triggerKeys.indexOf(q);if(p<0){a.onDown(q,this._onKeyboardInteraction);
this._triggerKeys.push(q)}}};g.removeKeyTrigger=function(q){if(typeof q==="string"){q=k[q.toUpperCase()]
}if(typeof q==="number"){var p=this._triggerKeys.indexOf(q);if(p>-1){a.offDown(q,this._onKeyboardInteraction);
this._triggerKeys.splice(p,1)}}};g.removeAllTriggers=function(){var q;var p=this._triggerKeys.length;
while(p--){q=this._triggerKeys[p];a.offDown(q,this._onKeyboardInteraction)}this._triggerKeys=[];
var r;for(r in this._triggerEls){p=this._triggerEls[r].length;while(p--){l.removeEventListener(this._triggerEls[r][p],r,this._onTriggered)
}}this._triggerEls={}};g.isInView=function(){if(this._el){return m.isInViewport(this._el)
}return false};g.percentageInView=function(){if(this._el){return m.getPercentInViewport(this._el)
}return 0};g.getElement=function(){return this._el};g.getElementId=function(){if(this._elId!==undefined){return this._elId
}this._elId=this._el.getAttribute("id")||null;return this._elId};g.destroy=function(){if(this._isShown){this._isShown=null;
o.remove(this._el,d.CSS_CURRENT_ITEM,d.CSS_LAST_ITEM,d.CSS_NEXT_ITEM,d.CSS_PREVIOUS_ITEM);
this._removeCurrentClassFromTriggers()}this.removeAllTriggers();this._triggerKeys=null;
this._triggerEls=null;this._el=null};g._addCurrentClassToTriggers=function(){var q;
var p;for(q in this._triggerEls){p=this._triggerEls[q].length;while(p--){o.add(this._triggerEls[q][p],j)
}}};g._removeCurrentClassFromTriggers=function(){var q;var p;for(q in this._triggerEls){p=this._triggerEls[q].length;
while(p--){o.remove(this._triggerEls[q][p],j)}}};g._onKeyboardInteraction=function(p){if(this.isInView()){this._onTriggered(p)
}};g._onTriggered=function(p){l.preventDefault(p);this.trigger(d.SELECTED,{item:this,interactionEvent:p})
};b.exports=d},{"@marcom/ac-classlist":12,"@marcom/ac-dom-events":17,"@marcom/ac-dom-metrics":41,"@marcom/ac-event-emitter-micro":90,"@marcom/ac-keyboard":130,"@marcom/ac-keyboard/keyMap":132,"@marcom/ac-object/create":134}],248:[function(b,d,a){var j;
try{j=b("ac-analytics").observer.Gallery}catch(h){}var g="data-analytics-gallery-id";
function c(){this._observers={}}var f=c.prototype;f.add=function(k,m){var n=k.getId();
if(!j||this._observers[n]){return}m=m||{};if(!m.galleryName){m.galleryName=this._getAnalyticsId(k,m.dataAttribute)||n
}if(!m.beforeUpdateEvent){m.beforeUpdateEvent="update"}if(!m.afterUpdateEvent){m.afterUpdateEvent="update:complete"
}var l=new j(k,m);if(l.gallery){this._observers[n]=l}};f.remove=function(k){var l=k.getId();
if(!j||!this._observers[l]){return}if(typeof this._observers[l].destroy==="function"){this._observers[l].destroy()
}this._observers[l]=null};f._getAnalyticsId=function(k,l){if(typeof k.getElement==="function"){l=l||g;
var m=k.getElement();return m.getAttribute(l)||m.getAttribute("id")}return null
};d.exports=new c()},{"ac-analytics":"ac-analytics"}],249:[function(l,b,E){l("@marcom/ac-polyfills/requestAnimationFrame");
var o=l("@marcom/ac-object/create");var C=l("@marcom/ac-dom-metrics/getContentDimensions");
var u=l("@marcom/ac-keyboard/keyMap");var A=l("./../helpers/selectElementFromDataAttributeValue");
var m=l("./../helpers/selectElementThatHasDataAttribute");var j=l("@marcom/ac-function/throttle");
var k=l("@marcom/ac-feature/touchAvailable");var a=l("@marcom/ac-classlist");var d=l("@marcom/ac-dom-events");
var B=l("@marcom/ac-dom-styles");var n=l("@marcom/ac-dom-traversal");var c=l("./../Item");
var r=l("./../Gallery");var f=l("@marcom/ac-keyboard");var w=l("@marcom/ac-page-visibility").PageVisibilityManager;
var h=l("./../helpers/PointerTracker");var t=l("./../navigation/ToggleNav");var y="disabled";
var x=3;var g=0.5;var v="[data-ac-gallery-item]";var z=0.12;var D="No element supplied.";
function p(I,H){H=H||{};if(!I||I.nodeType===undefined){throw new Error(D)}this._el=I;
r.call(this,H);this._itemHeights=[];this._itemHeightsLookup={};this._toggleNavDuration=H.toggleNavDuration;
this._isRightToLeft=(H.rightToLeft===undefined)?B.getStyle(I,"direction").direction==="rtl":H.rightToLeft;
this._keyboardThrottleDelay=((H.keyboardThrottleDelay===undefined)?z:H.keyboardThrottleDelay)*1000;
this._resizeContainer=!!H.resizeContainer;this._setUpContainerAutoResize(H.resizeContainerOnUpdate);
this._createToggleNav();this._addItems(H.itemSelector||v);this._addPaddleNav();
if(H.enableArrowKeys!==false){this._enableArrowKeys=true;this._addKeyboardListener()
}if(H.updateOnWindowResize!==false){this._onWindowResize=this._onWindowResize.bind(this);
d.addEventListener(window,"resize",this._onWindowResize)}this.stopAutoPlay=this.stopAutoPlay.bind(this);
if(H.autoPlay){var G=(typeof H.autoPlay==="number")?H.autoPlay:x;this.startAutoPlay(G)
}if(H.deeplink!==false){var J=this._getDeeplinkedItem();if(J&&J!==this._currentItem){this.show(J)
}}if(this._containerResizeDuration!==false){var F=this._itemHeightsLookup[this._currentItem.getElementId()];
if(F){this._setElHeight(F)}}if(this._toggleNav){this._toggleNav.start()}this._setUpSwiping(H.touch&&k(),H.desktopSwipe)
}p.RESIZED="resized";p.UPDATE=r.UPDATE;p.UPDATE_COMPLETE=r.UPDATE_COMPLETE;var q=r.prototype;
var s=p.prototype=o(q);s.addItem=function(G,F){if(G.nodeType){G=new this._itemType(G)
}else{if(this._items.indexOf(G)>-1){return G}}if(this._resizeContainer){this._storeItemHeight(G,this._containerResizeDuration===false)
}this._addItemTriggers(G);return q.addItem.call(this,G,F)};s.removeItem=function(H,G){if(this._resizeContainer){var F=this._itemHeights.length;
while(F--){if(this._itemHeights[F].item===H){this._itemHeights.splice(F,1);if(F===0&&this._itemHeights.length){this._setElHeight(this._itemHeights[0].height)
}}}}return q.removeItem.call(this,H,G)};s.startAutoPlay=function(G,F){F=F||{};this._isAutoPlaying=true;
this._autoPlayDelay=(G||x)*1000;this._cancelAutoPlayOnInteraction=(F.cancelOnInteraction===undefined)?true:F.cancelOnInteraction;
setTimeout(this._onAutoPlayToNextItem.bind(this),this._autoPlayDelay);if(this._cancelAutoPlayOnInteraction){this.on(r.UPDATE,this.stopAutoPlay)
}};s.stopAutoPlay=function(){this._isAutoPlaying=false;if(this._cancelAutoPlayOnInteraction){this.off(r.UPDATE,this.stopAutoPlay)
}};s.getElement=function(){return this._el};s.getToggleNav=function(){return this._toggleNav||null
};s.resize=function(G,F){if(this._resizeContainer){this._itemHeights=[];var H=this._items.length;
while(H--){this._storeItemHeight(this._items[H],false)}this._setElHeight(this._itemHeights[0].height)
}if(this._toggleNav){this._toggleNav.resize()}this.trigger(p.RESIZED,this)};s.destroy=function(G){if(this._isAutoPlaying){this.stopAutoPlay()
}if(this._resizeContainer){B.setStyle(this._el,{height:null,transition:null})}if(this._enableArrowKeys){f.offDown(u.ARROW_RIGHT,this._rightArrowFunc);
f.offDown(u.ARROW_LEFT,this._leftArrowFunc)}var F;if(this._previousButtons){F=this._previousButtons.length;
while(F--){d.removeEventListener(this._previousButtons[F],"click",this._onPaddlePrevious)
}this._setPaddleDisabledState(this._previousButtons,false)}if(this._nextButtons){F=this._nextButtons.length;
while(F--){d.removeEventListener(this._nextButtons[F],"click",this._onPaddleNext)
}this._setPaddleDisabledState(this._nextButtons,false)}if(this._hasPaddleNavStateHandler){this.off(r.UPDATE,this._updatePaddleNavState)
}if(this._touchSwipe){this._touchSwipe.off(h.END,this._onSwipeEnd);this._touchSwipe.destroy();
this._touchSwipe=null}if(this._clickSwipe){this._clickSwipe.off(h.END,this._onSwipeEnd);
this._clickSwipe.destroy();this._clickSwipe=null}if(this._toggleNav){this._toggleNav.destroy();
this._toggleNav=null}d.removeEventListener(window,"resize",this._onWindowResize);
this._el=null;this._itemHeights=null;this._itemHeightsLookup=null;this._resizeContainer=null;
this._isRightToLeft=null;this._enableArrowKeys=null;this._previousButtons=null;
this._onPaddlePrevious=null;this._nextButtons=null;this._onPaddleNext=null;return q.destroy.call(this,G)
};s._getDeeplinkedItem=function(){var H=window.location.hash.substr(1);var G;var F=this._items.length;
while(F--){G=this._items[F];if(H===G.getElementId()){return G}}return null};s._addItems=function(G){var K;
var F;var I=/(^\[).*(\]$)/.test(G);if(I){G=G.replace(/\[|\]/g,"");F=m(G,this._el)
}else{F=n.querySelectorAll(G,this._el)}var H=0;var J=F.length;for(H;H<J;H++){K=new this._itemType(F[H]);
this.addItem(K);this._addItemTriggers(K)}};s._createToggleNav=function(){var F=n.querySelector('[data-ac-gallery-togglenav="'+this._getElementId()+'"]');
if(F){this._toggleNav=new t(F,this,{duration:this._toggleNavDuration})}};s._addItemTriggers=function(I){var G=A("data-ac-gallery-trigger",I.getElementId());
var F=0;var H=G.length;for(F;F<H;F++){I.addElementTrigger(G[F]);if(this._toggleNav){this._toggleNav.addTrigger(G[F],I)
}}};s._addPaddleNav=function(){var F;var G=this._getElementId();this._previousButtons=A("data-ac-gallery-previous-trigger",G);
this._nextButtons=A("data-ac-gallery-next-trigger",G);this._onPaddlePrevious=this._onPaddleInteraction.bind(null,this.showPrevious);
F=this._previousButtons.length;while(F--){d.addEventListener(this._previousButtons[F],"click",this._onPaddlePrevious)
}this._onPaddleNext=this._onPaddleInteraction.bind(null,this.showNext);F=this._nextButtons.length;
while(F--){d.addEventListener(this._nextButtons[F],"click",this._onPaddleNext)}if(!this._wrapAround&&(this._nextButtons.length||this._previousButtons.length)){this._hasPaddleNavStateHandler=true;
this._updatePaddleNavState=this._updatePaddleNavState.bind(this);this._updatePaddleNavState();
this.on(r.UPDATE,this._updatePaddleNavState)}};s._onPaddleInteraction=function(G,F){d.preventDefault(F);
G.call(null,{interactionEvent:F})};s._updatePaddleNavState=function(){var F=this._items.indexOf(this._currentItem);
if(F===0&&this._previousButtons.length){this._setPaddleDisabledState(this._previousButtons,true);
this._setPaddleDisabledState(this._nextButtons,false)}else{if(F===this._items.length-1&&this._nextButtons.length){this._setPaddleDisabledState(this._nextButtons,true);
this._setPaddleDisabledState(this._previousButtons,false)}else{this._setPaddleDisabledState(this._previousButtons,false);
this._setPaddleDisabledState(this._nextButtons,false)}}};s._setPaddleDisabledState=function(H,F){var G=H.length;
while(G--){H[G].disabled=F;if(F){a.add(H[G],y)}else{a.remove(H[G],y)}}};s._addKeyboardListener=function(){if(this._enableArrowKeys){this._onKeyboardInteraction=this._onKeyboardInteraction.bind(this);
var F;var G;if(this._isRightToLeft){F=this.showPrevious;G=this.showNext}else{F=this.showNext;
G=this.showPrevious}this._rightArrowFunc=j(this._onKeyboardInteraction.bind(null,F),this._keyboardThrottleDelay);
this._leftArrowFunc=j(this._onKeyboardInteraction.bind(null,G),this._keyboardThrottleDelay);
f.onDown(u.ARROW_RIGHT,this._rightArrowFunc);f.onDown(u.ARROW_LEFT,this._leftArrowFunc)
}};s._onKeyboardInteraction=function(H,G){if(this.isInView()){var F=r.getAllInView();
if(F.length>1){F.sort(function(J,I){J=(J._enableArrowKeys)?J.getCurrentItem().percentageInView():0;
I=(I._enableArrowKeys)?I.getCurrentItem().percentageInView():0;return I-J});if(this!==F[0]){return
}}H.call(null,{interactionEvent:G})}};s._setUpSwiping=function(G,F){this._onSwipeEnd=this._onSwipeEnd.bind(this);
if(G){this._touchSwipe=new h(this._el);this._touchSwipe.on(h.END,this._onSwipeEnd)
}if(F){this._clickSwipe=new h(this._el,{down:"mousedown",up:"mouseup",out:"mouseout",move:"mousemove"});
this._clickSwipe.on(h.END,this._onSwipeEnd)}};s._onSwipeEnd=function(F){var H;var G={interactionEvent:F.interactionEvent};
if(F.swipe===h.SWIPE_RIGHT){H=(this._isRightToLeft)?this.showPrevious:this.showNext
}else{if(F.swipe===h.SWIPE_LEFT){H=(this._isRightToLeft)?this.showNext:this.showPrevious
}}if(H){return H.call(this,G)}return null};s._getElementId=function(){if(this._elementId===undefined){this._elementId=this._el.getAttribute("id")
}return this._elementId};s._setUpContainerAutoResize=function(F){if(typeof F==="number"){this._containerResizeDuration=F
}else{if(F){this._containerResizeDuration=g}else{this._containerResizeDuration=false
}}if(this._containerResizeDuration!==false){this._resizeContainer=true;this._updateContainerSize=this._updateContainerSize.bind(this);
this.on(r.UPDATE,this._updateContainerSize)}};s._updateContainerSize=function(G){var F=this._itemHeightsLookup[G.incoming[0].getElementId()];
if(F){this._setElHeight(F,this._containerResizeDuration)}};s._storeItemHeight=function(G,H){var F=C(G.getElement());
this._itemHeights.push({item:G,height:F.height});this._itemHeightsLookup[G.getElementId()]=F.height;
this._itemHeights.sort(function(J,I){return I.height-J.height});if(H&&this._itemHeights[0].item===G){this._setElHeight(F.height)
}};s._setElHeight=function(F,H){var G={height:F+"px"};if(H){G.transition="height "+H+"s"
}else{G.transition=null}B.setStyle(this._el,G)};s._onAutoPlayToNextItem=function(){if(this._isAutoPlaying){if(!w.isHidden&&this._currentItem.isInView()){if(this._cancelAutoPlayOnInteraction){this.off(r.UPDATE,this.stopAutoPlay)
}var F=this.showNext();if(F!==null){if(this._cancelAutoPlayOnInteraction){this.on(r.UPDATE,this.stopAutoPlay)
}setTimeout(this._onAutoPlayToNextItem.bind(this),this._autoPlayDelay)}}else{setTimeout(this._onAutoPlayToNextItem.bind(this),this._autoPlayDelay)
}}};s._onWindowResize=function(F){window.requestAnimationFrame(function(){if(this._el){this.resize()
}}.bind(this))};b.exports=p},{"./../Gallery":246,"./../Item":247,"./../helpers/PointerTracker":254,"./../helpers/selectElementFromDataAttributeValue":256,"./../helpers/selectElementThatHasDataAttribute":257,"./../navigation/ToggleNav":258,"@marcom/ac-classlist":12,"@marcom/ac-dom-events":17,"@marcom/ac-dom-metrics/getContentDimensions":32,"@marcom/ac-dom-styles":45,"@marcom/ac-dom-traversal":70,"@marcom/ac-feature/touchAvailable":124,"@marcom/ac-function/throttle":128,"@marcom/ac-keyboard":130,"@marcom/ac-keyboard/keyMap":132,"@marcom/ac-object/create":134,"@marcom/ac-page-visibility":144,"@marcom/ac-polyfills/requestAnimationFrame":157}],250:[function(c,b,d){var h=c("./create");
var k=c("./../helpers/selectElementThatHasDataAttribute");var j=c("./../Gallery");
var a=j.FADE_SELECTOR.replace(/\[|\]/g,"");var g=j.SLIDE_SELECTOR.replace(/\[|\]/g,"");
b.exports=function f(m){m=m||{};var n=m.context||document.body;var o;var l;o=k(g,n);
l=o.length;while(l--){h(o[l],j.SLIDE,m)}o=k(a,n);l=o.length;while(l--){h(o[l],j.FADE,m)
}return j.getAll()}},{"./../Gallery":246,"./../helpers/selectElementThatHasDataAttribute":257,"./create":251}],251:[function(d,b,f){var j=d("./../fade/FadeGallery");
var l=d("./../Gallery");var c=d("./../slide/SlideGallery");var k="%TYPE% is not a supported gallery type and el has no gallery data attribute.";
var a=l.FADE_SELECTOR.replace(/\[|\]/g,"");var h=l.SLIDE_SELECTOR.replace(/\[|\]/g,"");
b.exports=function g(p,o,n){var m;if(typeof o==="string"){if(o===l.SLIDE){m=c}else{if(o===l.FADE){m=j
}}}if(m===undefined){if(p.getAttribute(h)!==null){m=c}else{if(p.getAttribute(a)!==null){m=j
}}}if(m===undefined){throw new Error(k.replace(/%TYPE%/g,o))}return new m(p,n)}
},{"./../Gallery":246,"./../fade/FadeGallery":252,"./../slide/SlideGallery":259}],252:[function(c,a,f){var m=c("@marcom/ac-object/clone");
var h=c("@marcom/ac-object/create");var l=c("@marcom/ac-dom-traversal");var d=c("./FadeItem");
var b=c("./../auto/AutoGallery");var n=0.5;function k(p,o){o=m(o)||{};o.itemType=o.itemType||d;
this._fadeDuration=o.duration||n;o.toggleNavDuration=(o.toggleNavDuration===undefined)?this._fadeDuration:o.toggleNavDuration;
this._crossFade=o.crossFade;this._zIndexCount=o.startZIndex||1;this._ease=o.ease;
if(o.resizeContainerOnUpdate===true){o.resizeContainerOnUpdate=this._fadeDuration
}this._onItemShowComplete=this._onItemShowComplete.bind(this);b.call(this,p,o);
this._currentItem.fadeIn(0)}k.RESIZED=b.RESIZED;k.UPDATE=b.UPDATE;k.UPDATE_COMPLETE=b.UPDATE_COMPLETE;
var j=b.prototype;var g=k.prototype=h(j);g.addItem=function(q,o){if(q.nodeType){q=new this._itemType(q)
}var p=j.addItem.call(this,q,o);if(q!==this._currentItem){q.fadeOut()}return p};
g.destroy=function(o){var p=j.destroy.call(this,o);this._fadeDuration=null;this._crossFade=null;
this._zIndexCount=null;this._ease=null;this._onItemShowComplete=null;return p};
g._onItemShowComplete=function(q){if(q&&q.target()!==this._currentItem.getElement()){if(!this._currentItem.isFading()){this._currentItem.fadeIn(this._fadeDuration,this._ease,++this._zIndexCount,this._onItemShowComplete)
}return}var p;var o=this._items.length;while(o--){p=this._items[o];if(p!==this._currentItem){p.fadeOut()
}}if(this._incomingOutgoingItems){this.trigger(k.UPDATE_COMPLETE,this._incomingOutgoingItems)
}};g._updateItems=function(p,o){if(o){return}if(this._crossFade){var q=(o)?null:this.trigger.bind(this,k.UPDATE_COMPLETE,p);
p.outgoing[0].fadeOut(this._fadeDuration*0.99,this._ease);p.incoming[0].fadeIn(this._fadeDuration,this._ease,++this._zIndexCount,q)
}else{this._incomingOutgoingItems=(o)?false:p;if(!p.outgoing[0].isFading()){p.incoming[0].fadeIn(this._fadeDuration,this._ease,++this._zIndexCount,this._onItemShowComplete)
}}p.outgoing[0].hide();p.incoming[0].show()};a.exports=k},{"./../auto/AutoGallery":249,"./FadeItem":253,"@marcom/ac-dom-traversal":70,"@marcom/ac-object/clone":133,"@marcom/ac-object/create":134}],253:[function(b,a,g){var k=b("@marcom/ac-object/create");
var f=b("@marcom/ac-solar/fade");var m=b("@marcom/ac-solar/fadeIn");var j=b("@marcom/ac-solar/fadeOut");
var n=b("@marcom/ac-dom-styles");var d=b("./../Item");function c(o){d.call(this,o);
n.setStyle(o,{position:"absolute"})}c.SELECTED=d.SELECTED;c.SHOW=d.SHOW;c.HIDE=d.HIDE;
var l=d.prototype;var h=c.prototype=k(l);h.fadeIn=function(o,p,r,q){if(o){n.setStyle(this._el,{zIndex:r||1});
this._destroyCurrentClip();this._clip=f(this._el,0,1,o,{ease:p,onComplete:q})}else{m(this._el,0);
n.setStyle(this._el,{zIndex:r||1})}};h.fadeOut=function(o,p){if(o){this._destroyCurrentClip();
this._clip=j(this._el,o,{ease:p})}else{j(this._el,0)}};h.isFading=function(){return !!(this._clip&&this._clip.playing())
};h.destroy=function(){n.setStyle(this._el,{position:null,opacity:null,zIndex:null});
l.destroy.call(this);this._destroyCurrentClip();this._clip=null};h._destroyCurrentClip=function(){if(this.isFading()){this._clip.destroy()
}};a.exports=c},{"./../Item":247,"@marcom/ac-dom-styles":45,"@marcom/ac-object/create":134,"@marcom/ac-solar/fade":238,"@marcom/ac-solar/fadeIn":239,"@marcom/ac-solar/fadeOut":240}],254:[function(b,a,d){var h=b("@marcom/ac-object/create");
var l=b("@marcom/ac-browser").os==="Android";var f=b("@marcom/ac-browser").name==="IE"&&b("@marcom/ac-browser").version<=8;
var k=b("@marcom/ac-dom-events");var n=b("@marcom/ac-dom-styles");var m=b("@marcom/ac-event-emitter-micro").EventEmitterMicro;
function c(o,p){this._el=o;this._pointerEvents=p||{};this._pointerEvents.down=this._pointerEvents.down||"touchstart";
this._pointerEvents.up=this._pointerEvents.up||"touchend";this._pointerEvents.out=this._pointerEvents.out||"mouseout";
this._pointerEvents.move=this._pointerEvents.move||"touchmove";this._onMouseDown=this._onMouseDown.bind(this);
this._onMouseUp=this._onMouseUp.bind(this);this._onMouseOut=this._onMouseOut.bind(this);
this._onMouseMove=this._onMouseMove.bind(this);m.call(this);k.addEventListener(this._el,this._pointerEvents.down,this._onMouseDown);
this._setCursorStyle("grab")}c.START="start";c.END="end";c.UPDATE="update";c.SWIPE_RIGHT="swiperight";
c.SWIPE_LEFT="swipeleft";c.THRESHOLD=(l||f)?2:8;var j=m.prototype;var g=c.prototype=h(j);
g.destroy=function(){if(this._isDragging){this._onMouseUp()}k.removeEventListener(this._el,this._pointerEvents.down,this._onMouseDown);
this._setCursorStyle(null);this._el=null;this._pointerEvents=null;this._lastX=null;
this._velocityX=null;return j.destroy.call(this)};g._onMouseDown=function(o){if(this._isDragging){return
}this._isDragging=true;this._setCursorStyle("grabbing");k.removeEventListener(this._el,this._pointerEvents.down,this._onMouseDown);
k.addEventListener(document.body,this._pointerEvents.up,this._onMouseUp);k.addEventListener(document,this._pointerEvents.out,this._onMouseOut);
k.addEventListener(document.body,this._pointerEvents.move,this._onMouseMove);this._checkForTouchScrollY=!!(o.touches&&o.touches[0]);
if(this._checkForTouchScrollY){this._lastY=this._getTouchY(o)}this._lastX=this._getPointerX(o);
this._velocityX=0;this.trigger(c.START,{diff:0,interactionEvent:o})};g._onMouseUp=function(o){if(!this._isDragging){return
}this._isDragging=false;this._setCursorStyle("grab");k.addEventListener(this._el,this._pointerEvents.down,this._onMouseDown);
k.removeEventListener(document.body,this._pointerEvents.up,this._onMouseUp);k.removeEventListener(document,this._pointerEvents.out,this._onMouseOut);
k.removeEventListener(document.body,this._pointerEvents.move,this._onMouseMove);
var p=null;if(this._velocityX>c.THRESHOLD){p=c.SWIPE_RIGHT}else{if((this._velocityX*-1)>c.THRESHOLD){p=c.SWIPE_LEFT
}}this.trigger(c.END,{diff:this._velocityX,swipe:p,interactionEvent:o})};g._onMouseOut=function(o){o=o?o:window.event;
var p=o.relatedTarget||o.toElement;if(!p||p.nodeName==="HTML"){this._onMouseUp(o)
}};g._onMouseMove=function(o){var p=this._getPointerX(o);if(this._checkForTouchScrollY&&this._isVerticalTouchMove(p,this._getTouchY(o))){this._onMouseUp(o);
return}k.preventDefault(o);this._velocityX=this._lastX-p;this._lastX=p;this.trigger(c.UPDATE,{diff:this._velocityX,interactionEvent:o})
};g._getPointerX=function(o){if(o.pageX){return o.pageX}else{if(o.touches&&o.touches[0]){return o.touches[0].pageX
}else{if(o.clientX){return o.clientX}}}return 0};g._getTouchY=function(o){if(o.touches&&o.touches[0]){return o.touches[0].pageY
}return 0};g._isVerticalTouchMove=function(o,r){var q=Math.abs(o-this._lastX);var p=Math.abs(r-this._lastY);
this._checkForTouchScrollY=(q<p);return this._checkForTouchScrollY};g._setCursorStyle=function(o){n.setStyle(this._el,{cursor:o})
};a.exports=c},{"@marcom/ac-browser":1,"@marcom/ac-dom-events":17,"@marcom/ac-dom-styles":45,"@marcom/ac-event-emitter-micro":90,"@marcom/ac-object/create":134}],255:[function(c,f,b){var d=c("@marcom/ac-object/create");
var g=c("@marcom/ac-object/extend");f.exports=function a(l){var k=this;var j=function(){k.apply(this,arguments)
};var h=d(this.prototype);j.prototype=g(h,l);g(j,this);return j}},{"@marcom/ac-object/create":134,"@marcom/ac-object/extend":136}],256:[function(d,g,b){var c=d("@marcom/ac-dom-traversal");
var a=function(j,o){var k;var n=document.getElementsByTagName("*");var h=0;var l=n.length;
var m=[];for(h;h<l;h++){k=n[h];if(k.getAttribute(j)!==null&&k.getAttribute(j).split(" ").indexOf(o)>-1){m[m.length]=k
}}return m};g.exports=function f(k,n){var m=c.querySelectorAll("["+k+'*="'+n+'"]');
if(m.length===0&&document.documentMode===7){return a(k,n)}var o=[];var j=0;var l=m.length;
var h;for(j;j<l;j++){h=m[j].getAttribute(k);if(h===n){o.push(m[j])}else{if(h&&h.length){h=h.split(" ");
if(h.indexOf(n)>-1){o.push(m[j])}}}}return o}},{"@marcom/ac-dom-traversal":70}],257:[function(d,f,b){var c=d("@marcom/ac-dom-traversal");
var a=function(j,k){var l;var o=document.getElementsByTagName("*");var h=0;var m=o.length;
var n=[];for(h;h<m;h++){l=o[h];if(l.getAttribute(j)!==null&&(!k||c.ancestors(l).indexOf(k)>-1)){n[n.length]=l
}}return n};f.exports=function g(h,j){j=j||document.body;var k=c.querySelectorAll("["+h+"]",j);
if(k.length===0&&document.documentMode===7){return a(h,j)}return k}},{"@marcom/ac-dom-traversal":70}],258:[function(c,a,d){var g=c("@marcom/ac-object/create");
var p=c("@marcom/ac-solar/scrollX");var k=c("@marcom/ac-dom-events");var n=c("@marcom/ac-dom-metrics");
var q=c("@marcom/ac-dom-styles");var j=c("@marcom/ac-dom-traversal");var o=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var m=c("./../Gallery");var l=0.5;function b(t,r,s){s=s||{};this._el=t;this._gallery=r;
this._triggers={};this._ordered=[];this._containerEl=this._el.children[0];this._slideDuration=(s.duration===undefined)?l:s.duration;
o.call(this)}var h=o.prototype;var f=b.prototype=g(h);f.start=function(){this._onWindowLoad=this._onWindowLoad.bind(this);
this._onGalleryUpdated=this._onGalleryUpdated.bind(this);this._gallery.on(m.UPDATE,this._onGalleryUpdated);
this.resize();k.addEventListener(window,"load",this._onWindowLoad)};f.addTrigger=function(s,t){if(this._triggers[t.getElementId()]!==undefined){return
}var r=j.ancestors(s);if(r.indexOf(this._el)>-1){var u={el:s};this._triggers[t.getElementId()]=u;
this._ordered.push(u)}};f.resize=function(){if(!this._ordered.length){return}q.setStyle(this._containerEl,{paddingLeft:null,paddingRight:null});
this._containerWidth=n.getDimensions(this._containerEl).width;this._width=n.getDimensions(this._el).width;
this._viewCenter=Math.round(this._width*0.5);var t=this._ordered.length;while(t--){this._setTriggerData(this._ordered[t])
}this._ordered.sort(function(y,x){return y.left-x.left});if(this._containerWidth>this._width){var v=this._ordered[0];
var u=this._ordered[this._ordered.length-1];var s=(this._width-v.width)*0.5;var w=(this._width-u.width)*0.5;
q.setStyle(this._containerEl,{paddingLeft:s+"px",paddingRight:w+"px"});var r=this._triggers[this._gallery.getCurrentItem().getElementId()];
if(r){this._centerNav(r)}}};f.destroy=function(){this._gallery.off(m.UPDATE,this._onGalleryUpdated);
k.removeEventListener(window,"load",this._onWindowLoad);q.setStyle(this._containerEl,{paddingLeft:null,paddingRight:null});
this._el=null;this._gallery=null;this._triggers=null;this._ordered=null;this._containerEl=null;
this._destroyCurrentClip();this._clip=null;return h.destroy.call(this)};f._onWindowLoad=function(){k.removeEventListener(window,"load",this._onWindowLoad);
this.resize()};f._setTriggerData=function(s){s.width=n.getDimensions(s.el).width;
var r=n.getPosition(s.el);s.left=r.left;s.right=r.right;s.center=s.left+(s.width*0.5)
};f._centerNav=function(r,t){this._setTriggerData(r);this._width=n.getDimensions(this._el).width;
this._viewCenter=Math.round(this._width*0.5);var s=Math.round(r.center-this._viewCenter);
this._destroyCurrentClip();if(t){this._clip=p(this._el,s,t)}else{this._el.scrollLeft=p
}};f._onGalleryUpdated=function(r){var s=this._triggers[r.incoming[0].getElementId()];
if(s){this._centerNav(s,this._slideDuration)}};f._destroyCurrentClip=function(){if(this._clip&&this._clip.playing()){this._clip.destroy()
}};a.exports=b},{"./../Gallery":246,"@marcom/ac-dom-events":17,"@marcom/ac-dom-metrics":41,"@marcom/ac-dom-styles":45,"@marcom/ac-dom-traversal":70,"@marcom/ac-event-emitter-micro":90,"@marcom/ac-object/create":134,"@marcom/ac-solar/scrollX":244}],259:[function(f,b,t){var r=f("@marcom/ac-object/clone");
var h=f("@marcom/ac-object/create");var d=f("@marcom/ac-dom-metrics/utils/getBoundingClientRect");
var m=f("@marcom/ac-solar/moveX");var k=f("./../auto/AutoGallery");var q=f("@marcom/ac-classlist");
var s=f("@marcom/ac-dom-styles");var g=f("@marcom/ac-dom-traversal");var c=f("./../helpers/PointerTracker");
var p=f("./SlideItem");var a=0.5;var j=0.5;function o(w,v){v=r(v)||{};v.itemType=v.itemType||p;
var u=v.deeplink!==false;v.deeplink=false;this._slideDuration=(v.duration!==undefined)?v.duration:j;
v.toggleNavDuration=(v.toggleNavDuration===undefined)?this._slideDuration:v.toggleNavDuration;
this._itemCenterPoint=(v.itemCenterPoint!==undefined)?v.itemCenterPoint:a;this._slideOptions={ease:v.ease};
if(v.resizeContainerOnUpdate===true){v.resizeContainerOnUpdate=this._slideDuration
}v.touch=v.touch!==false;k.call(this,w,v);if(u){var x=this._getDeeplinkedItem();
if(x){if(this._currentItem!==x){this._currentItem.hide();this._setCurrentItem(x);
this._currentItem.show()}}}this._positionItems=this._positionItems.bind(this);this._createContainer();
this._positionItems()}o.RESIZED=k.RESIZED;o.UPDATE=k.UPDATE;o.UPDATE_COMPLETE=k.UPDATE_COMPLETE;
var l=k.prototype;var n=o.prototype=h(l);n.addItem=function(w,u){if(w.nodeType){w=new this._itemType(w)
}var v=l.addItem.call(this,w,u);if(this._containerEl!==undefined){this._addItemToContainer(w);
this._positionItems()}return v};n.removeItem=function(w,u){if(this._containerEl&&w.getElement().parentElement===this._containerEl){w.getOriginalParentElement().appendChild(w.getElement());
var v=l.removeItem.call(this,w,u);if(this._currentItem){this._positionItems(this._currentItem)
}return v}return l.removeItem.call(this,w,u)};n.resize=function(){this._positionItems();
this._snapToPosition(this._currentItem.position());return l.resize.call(this)};
n.destroy=function(v){this._destroyCurrentClip();this._clip=null;var u=this._items.length;
while(u--){this._items[u].off(p.CENTER_POINT_CHANGED,this._positionItems)}if(this._touchSwipe){this._touchSwipe.off(c.START,this._onSwipeStart);
this._touchSwipe.off(c.UPDATE,this._onSwipeUpdate)}if(this._clickSwipe){this._clickSwipe.off(c.START,this._onSwipeStart);
this._clickSwipe.off(c.UPDATE,this._onSwipeUpdate)}var x=this._el;var w=l.destroy.call(this,v);
x.removeChild(this._containerEl);this._containerEl=null;this._slideDuration=null;
this._itemCenterPoint=null;this._positionItems=null;this._slideOptions=null;return w
};n._createContainer=function(){this._containerEl=document.createElement("div");
q.add(this._containerEl,"ac-gallery-slidecontainer");s.setStyle(this._containerEl,{position:"absolute",left:"0",top:"0",width:"100%",height:"100%"});
this._el.appendChild(this._containerEl);var v;var u=this._items.length;while(u--){this._addItemToContainer(this._items[u])
}};n._addItemToContainer=function(u){this._containerEl.appendChild(u.getElement());
u.on(p.CENTER_POINT_CHANGED,this._positionItems)};n._positionItems=function(y){y=y||this._currentItem;
var C=this._items;if(this._wrapAround){C=this._shuffleItems()}var E=(this._getActualPositionX()-y.position())||0;
var D=parseInt(s.getStyle(this._el,"width").width,10);var v=0;var A=0;var x=C.length;
var F;var w;var u;var z;var B;for(A;A<x;A++){F=C[A];w=F.getElement();s.setStyle(w,{left:v+"px"});
u=this._getItemFullWidth(w);z=D-u;B=(F.centerPoint&&F.centerPoint()!==null)?F.centerPoint():this._itemCenterPoint;
F.position((v*-1)+(z*B));if(this._isRightToLeft){v-=u}else{v+=u}}v=y.position()+E;
this._snapToPosition(v)};n._getItemFullWidth=function(u){var v=s.getStyle(u,"margin-right","margin-left");
return Math.round(d(u).width)+parseInt(v.marginRight,10)+parseInt(v.marginLeft,10)
};n._getActualPositionX=function(){var v=s.getStyle(this._containerEl,"transform").transform;
if(!v||v==="none"){var w=s.getStyle(this._containerEl,"left").left;return parseInt(w,10)
}else{if(v===this._transformStyles&&this._actualPositionX!==undefined){return this._actualPositionX
}}this._transformStyles=v;var u=this._transformStyles.split(",");this._actualPositionX=u[4]||this._currentItem.position();
return this._actualPositionX*1};n._snapToPosition=function(u){this._destroyCurrentClip();
this._positionX=u;s.setStyle(this._containerEl,{transition:"transform 0s, left 0s"});
m(this._containerEl,u,0,this._slideOptions)};n._slideToPosition=function(u,v,w){this._positionX=u;
this._clip=m(this._containerEl,u,v,{ease:this._slideOptions.ease,onComplete:w})
};n._setUpSwiping=function(v,u){var w=l._setUpSwiping.call(this,v,u);this._onSwipeStart=this._onSwipeStart.bind(this);
this._onSwipeUpdate=this._onSwipeUpdate.bind(this);if(this._touchSwipe){this._touchSwipe.on(c.START,this._onSwipeStart);
this._touchSwipe.on(c.UPDATE,this._onSwipeUpdate)}if(this._clickSwipe){this._clickSwipe.on(c.START,this._onSwipeStart);
this._clickSwipe.on(c.UPDATE,this._onSwipeUpdate)}return w};n._onSwipeStart=function(u){if(this._clip&&this._clip.playing()){this._destroyCurrentClip();
this._positionX=this._getActualPositionX()}};n._onSwipeUpdate=function(u){this._destroyCurrentClip();
this._snapToPosition(this._positionX-u.diff)};n._onSwipeEnd=function(u){var v=l._onSwipeEnd.call(this,u);
if(v===null){v=this.show(this._currentItem,{interactionEvent:u.interactionEvent})
}return v};n._shuffleItems=function(){var A=this._items.length;var v=this._items.indexOf(this._currentItem);
var z=Math.floor(A*0.5);var x;var u;var w;if(v<z){x=z-v;var y=A-x;u=this._items.slice(y);
w=this._items.slice(0,y);return u.concat(w)}else{if(v>z){x=v-z;u=this._items.slice(0,x);
w=this._items.slice(x);return w.concat(u)}}return this._items};n._updateItems=function(v,u){this._destroyCurrentClip();
if(this._wrapAround){this._positionItems(v.outgoing[0])}if(this.getItemIndex(v.outgoing[0])>-1){var x=(u)?null:this.trigger.bind(this,o.UPDATE_COMPLETE,v);
var w=this._slideDuration;this._slideToPosition(v.incoming[0].position(),w,x);if(v.incoming[0]!==v.outgoing[0]){v.incoming[0].show();
v.outgoing[0].hide()}}else{this._slideToPosition(this._currentItem.position(),this._slideDuration);
v.incoming[0].show();if(!u){this.trigger(o.UPDATE_COMPLETE,v)}}};n._destroyCurrentClip=function(){if(this._clip&&this._clip.playing()){this._clip.destroy()
}};b.exports=o},{"./../auto/AutoGallery":249,"./../helpers/PointerTracker":254,"./SlideItem":260,"@marcom/ac-classlist":12,"@marcom/ac-dom-metrics/utils/getBoundingClientRect":43,"@marcom/ac-dom-styles":45,"@marcom/ac-dom-traversal":70,"@marcom/ac-object/clone":133,"@marcom/ac-object/create":134,"@marcom/ac-solar/moveX":242}],260:[function(b,a,d){var g=b("@marcom/ac-object/create");
var k=b("@marcom/ac-dom-styles");var c=b("./../Item");function j(l){c.call(this,l);
k.setStyle(l,{position:"absolute",transform:{translateZ:0}});this._parentElement=l.parentElement
}j.CENTER_POINT_CHANGED="centerpointchanged";j.SELECTED=c.SELECTED;j.SHOW=c.SHOW;
j.HIDE=c.HIDE;var h=c.prototype;var f=j.prototype=g(h);f.position=function(l){if(l!==undefined){this._position=l
}return this._position||0};f.centerPoint=function(l){if(l!==undefined){this._centerPoint=l;
this.trigger(j.CENTER_POINT_CHANGED)}return(this._centerPoint!==undefined)?this._centerPoint:null
};f.getOriginalParentElement=function(){return this._parentElement};f.destroy=function(){k.setStyle(this._el,{position:null,left:null});
h.destroy.call(this)};a.exports=j},{"./../Item":247,"@marcom/ac-dom-styles":45,"@marcom/ac-object/create":134}],261:[function(d,f,b){var g=d("./ac-browser/BrowserData");
var a=/applewebkit/i;var h=d("./ac-browser/IE");var c=g.create();c.isWebKit=function(j){var k=j||window.navigator.userAgent;
return k?!!a.test(k):false};c.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(c.name==="IE"){c.IE={documentMode:h.getDocumentMode()}}f.exports=c},{"./ac-browser/BrowserData":262,"./ac-browser/IE":263}],262:[function(b,c,a){b("ac-polyfills/Array/prototype.filter");
b("ac-polyfills/Array/prototype.some");var d=b("./data");function f(){}f.prototype={__getBrowserVersion:function(h,j){var g;
if(!h||!j){return}var k=d.browser.filter(function(l){return l.identity===j});k.some(function(n){var l=n.versionSearch||j;
var m=h.indexOf(l);if(m>-1){g=parseFloat(h.substring(m+l.length+1));return true
}});return g},__getName:function(g){return this.__getIdentityStringFromArray(g)
},__getIdentity:function(g){if(g.string){return this.__matchSubString(g)}else{if(g.prop){return g.identity
}}},__getIdentityStringFromArray:function(g){for(var k=0,h=g.length,j;k<h;k++){j=this.__getIdentity(g[k]);
if(j){return j}}},__getOS:function(g){return this.__getIdentityStringFromArray(g)
},__getOSVersion:function(j,m){if(!j||!m){return}var l=d.os.filter(function(n){return n.identity===m
})[0];var g=l.versionSearch||m;var k=new RegExp(g+" ([\\d_\\.]+)","i");var h=j.match(k);
if(h!==null){return h[1].replace(/_/g,".")}},__matchSubString:function(h){var g=h.subString;
if(g){var j=g.test?!!g.test(h.string):h.string.indexOf(g)>-1;if(j){return h.identity
}}}};f.create=function(){var g=new f();var h={};h.name=g.__getName(d.browser);h.version=g.__getBrowserVersion(d.versionString,h.name);
h.os=g.__getOS(d.os);h.osVersion=g.__getOSVersion(d.versionString,h.os);return h
};c.exports=f},{"./data":264,"ac-polyfills/Array/prototype.filter":562,"ac-polyfills/Array/prototype.some":566}],263:[function(b,c,a){c.exports={getDocumentMode:function(){var d;
if(document.documentMode){d=parseInt(document.documentMode,10)}else{d=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){d=7
}}}return d}}},{}],264:[function(b,c,a){c.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],265:[function(b,c,a){b("ac-polyfills/Array/prototype.slice");b("ac-polyfills/Element/prototype.classList");
var d=b("./className/add");c.exports=function f(){var j=Array.prototype.slice.call(arguments);
var h=j.shift(j);var g;if(h.classList&&h.classList.add){h.classList.add.apply(h.classList,j);
return}for(g=0;g<j.length;g++){d(h,j[g])}}},{"./className/add":267,"ac-polyfills/Array/prototype.slice":565,"ac-polyfills/Element/prototype.classList":568}],266:[function(b,c,a){c.exports={add:b("./className/add"),contains:b("./className/contains"),remove:b("./className/remove")}
},{"./className/add":267,"./className/contains":268,"./className/remove":270}],267:[function(b,c,a){var d=b("./contains");
c.exports=function f(h,g){if(!d(h,g)){h.className+=" "+g}}},{"./contains":268}],268:[function(b,c,a){var f=b("./getTokenRegExp");
c.exports=function d(h,g){return f(g).test(h.className)}},{"./getTokenRegExp":269}],269:[function(b,c,a){c.exports=function d(f){return new RegExp("(\\s|^)"+f+"(\\s|$)")
}},{}],270:[function(c,d,b){var f=c("./contains");var g=c("./getTokenRegExp");d.exports=function a(j,h){if(f(j,h)){j.className=j.className.replace(g(h),"$1").trim()
}}},{"./contains":268,"./getTokenRegExp":269}],271:[function(b,d,a){b("ac-polyfills/Element/prototype.classList");
var f=b("./className/contains");d.exports=function c(h,g){if(h.classList&&h.classList.contains){return h.classList.contains(g)
}return f(h,g)}},{"./className/contains":268,"ac-polyfills/Element/prototype.classList":568}],272:[function(b,c,a){c.exports={add:b("./add"),contains:b("./contains"),remove:b("./remove"),toggle:b("./toggle")}
},{"./add":265,"./contains":271,"./remove":273,"./toggle":274}],273:[function(d,f,c){d("ac-polyfills/Array/prototype.slice");
d("ac-polyfills/Element/prototype.classList");var b=d("./className/remove");f.exports=function a(){var j=Array.prototype.slice.call(arguments);
var h=j.shift(j);var g;if(h.classList&&h.classList.remove){h.classList.remove.apply(h.classList,j);
return}for(g=0;g<j.length;g++){b(h,j[g])}}},{"./className/remove":270,"ac-polyfills/Array/prototype.slice":565,"ac-polyfills/Element/prototype.classList":568}],274:[function(c,d,b){c("ac-polyfills/Element/prototype.classList");
var f=c("./className");d.exports=function a(k,j,l){var h=(typeof l!=="undefined");
var g;if(k.classList&&k.classList.toggle){if(h){return k.classList.toggle(j,l)}return k.classList.toggle(j)
}if(h){g=!!l}else{g=!f.contains(k,j)}if(g){f.add(k,j)}else{f.remove(k,j)}return g
}},{"./className":266,"ac-polyfills/Element/prototype.classList":568}],275:[function(c,d,b){var g=c("./ac-clock/Clock"),f=c("./ac-clock/ThrottledClock"),a=c("./ac-clock/sharedClockInstance");
a.Clock=g;a.ThrottledClock=f;d.exports=a},{"./ac-clock/Clock":276,"./ac-clock/ThrottledClock":277,"./ac-clock/sharedClockInstance":278}],276:[function(c,d,b){var g;
var f=c("ac-event-emitter").EventEmitter;var a=new Date().getTime();function h(){f.call(this);
this.lastFrameTime=null;this._animationFrame=null;this._active=false;this._startTime=null;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);this._getTime=Date.now||function(){return new Date().getTime()
}}g=h.prototype=new f(null);g.start=function(){if(this._active){return}this._tick()
};g.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};g.destroy=function(){this.stop();
this.off();var j;for(j in this){if(this.hasOwnProperty(j)){this[j]=null}}};g.isRunning=function(){return this._active
};g._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};g._onAnimationFrame=function(m){var n=0;var j=this._getTime();if(this.lastFrameTime===null){this.lastFrameTime=j-a
}else{n=m-this.lastFrameTime}var l=0,k;if(n!==0){l=1000/n}k={time:m,delta:n,fps:l,naturalFps:l,timeNow:j};
this.trigger("update",k);this.trigger("draw",k);this._animationFrame=null;this.lastFrameTime=m;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};d.exports=h
},{"ac-event-emitter":279}],277:[function(c,d,b){var g;var a=c("./sharedClockInstance"),f=c("ac-event-emitter").EventEmitter;
function h(k,j){if(k===null){return}f.call(this);j=j||{};this._fps=k||null;this._clock=j.clock||a;
this._lastThrottledTime=null;this._clockEvent=null;this._clock.on("update",this._onClockUpdate,this)
}g=h.prototype=new f(null);g.setFps=function(j){this._fps=j;return this};g.getFps=function(){return this._fps
};g.start=function(){this._clock.start();return this};g.stop=function(){this._clock.stop();
return this};g.isRunning=function(){return this._clock.isRunning()};g.destroy=function(){this._clock.off("update",this._onClockUpdate,this);
this._clock.destroy.call(this)};g._onClockUpdate=function(j){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var k=j.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(k<(1000/this._fps)){return}this._clockEvent=j;this._clockEvent.delta=k;this._clockEvent.fps=1000/k;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._onClockDraw,this);
this.trigger("update",this._clockEvent)};g._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};d.exports=h},{"./sharedClockInstance":278,"ac-event-emitter":279}],278:[function(b,c,a){var d=b("./Clock");
c.exports=new d()},{"./Clock":276}],279:[function(b,c,a){c.exports.EventEmitter=b("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":280}],280:[function(d,c,f){var h="EventEmitter:propagation";
var l=function(m){if(m){this.context=m}};var g=l.prototype;var j=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var a=function(n,p){var q=n[0];var r=n[1];var o=n[2];if((typeof q!=="string"&&typeof q!=="object")||q===null||Array.isArray(q)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof q==="string")&&!r){throw new Error("Expecting a callback function to be provided.")
}if(r&&(typeof r!=="function")){if(typeof q==="object"&&typeof r==="object"){o=r
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof q==="object"){for(var m in q){p.call(this,m,q[m],o)
}}if(typeof q==="string"){q=q.split(" ");q.forEach(function(s){p.call(this,s,r,o)
},this)}};var k=function(p,q){var m;var n;var o;m=j.call(this)[p];if(!m||m.length===0){return
}m=m.slice();this._stoppedImmediatePropagation=false;for(n=0,o=m.length;n<o;n++){if(this._stoppedImmediatePropagation||q(m[n],n)){break
}}};var b=function(n,o,p){var m=-1;k.call(this,o,function(r,q){if(r.callback===p){m=q;
return true}});if(m===-1){return}n[o].splice(m,1)};g.on=function(){var m=j.call(this);
a.call(this,arguments,function(o,p,n){m[o]=m[o]||(m[o]=[]);m[o].push({callback:p,context:n})
});return this};g.once=function(){a.call(this,arguments,function(n,p,m){var o=function(q){p.call(m||this,q);
this.off(n,o)};this.on(n,o,this)});return this};g.off=function(o,q){var n=j.call(this);
if(arguments.length===0){this._events={}}else{if(!o||(typeof o!=="string"&&typeof o!=="object")||Array.isArray(o)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof o==="object"){for(var p in o){b.call(this,n,p,o[p])}}if(typeof o==="string"){var m=o.split(" ");
if(m.length===1){if(q){b.call(this,n,o,q)}else{n[o]=[]}}else{m.forEach(function(r){n[r]=[]
})}}return this};g.trigger=function(n,o,m){if(!n){throw new Error("trigger method requires an event name")
}if(typeof n!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(m&&typeof m!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}n=n.split(" ");n.forEach(function(p){k.call(this,p,function(q){q.callback.call(q.context||this.context||this,o)
}.bind(this));if(!m){k.call(this,h,function(r){var q=p;if(r.prefix){q=r.prefix+q
}r.emitter.trigger(q,o)})}},this);return this};g.propagateTo=function(n,o){var m=j.call(this);
if(!m[h]){this._events[h]=[]}m[h].push({emitter:n,prefix:o})};g.stopPropagatingTo=function(p){var n=j.call(this);
if(!p){n[h]=[];return}var q=n[h];var o=q.length;var m;for(m=0;m<o;m++){if(q[m].emitter===p){q.splice(m,1);
break}}};g.stopImmediatePropagation=function(){this._stoppedImmediatePropagation=true
};g.has=function(m,t,q){var p=j.call(this);var n=p[m];if(arguments.length===0){return Object.keys(p)
}if(!n){return false}if(!t){return(n.length>0)?true:false}for(var o=0,r=n.length;
o<r;o++){var s=n[o];if(q&&t&&s.context===q&&s.callback===t){return true}else{if(t&&!q&&s.callback===t){return true
}}}return false};c.exports=l},{}],281:[function(b,c,a){c.exports={Clip:b("./ac-clip/Clip")}
},{"./ac-clip/Clip":282}],282:[function(c,b,d){var g=c("ac-object/create");var l=c("ac-easing").createPredefined;
var a=c("ac-clock");var k=c("ac-easing").Ease;var m=c("ac-event-emitter").EventEmitter;
var j="ease";function h(p,o,r,n){n=n||{};this._options=n;this._target=p;this._duration=o*1000;
this._delay=(n.delay||0)*1000;this._remainingDelay=this._delay;this._progress=0;
this._clock=n.clock||a;this._playing=false;this._getTime=Date.now||function(){return new Date().getTime()
};this._isYoyo=n.yoyo;this._direction=1;this._loop=n.loop||0;this._loopCount=0;
this._propsTo=r||{};this._propsFrom=n.propsFrom||{};this._onStart=n.onStart||null;
this._onUpdate=n.onUpdate||null;this._onDraw=n.onDraw||null;this._onComplete=n.onComplete||null;
var q=n.ease||j;this._ease=(typeof q==="function")?new k(q):l(q);this._start=this._start.bind(this);
this._update=this._update.bind(this);this._draw=this._draw.bind(this);this._isPrepared=false;
h._add(this)}var f=h.prototype=g(m.prototype);h.COMPLETE="complete";h.PAUSE="pause";
h.PLAY="play";f.play=function(){if(!this._playing){this._playing=true;if(this._delay===0||this._remainingDelay===0){this._start()
}else{if(!this._isPrepared){this._setDiff();this._updateProps()}this._startTimeout=setTimeout(this._start,this._remainingDelay);
this._delayStart=this._getTime()}}return this};f.pause=function(){if(this._playing){if(this._startTimeout){this._remainingDelay=this._getTime()-this._delayStart;
clearTimeout(this._startTimeout)}this._stop();this.trigger(h.PAUSE,this._getDetails())
}return this};f.destroy=function(){this.pause();this._options=null;this._target=null;
this._storeTarget=null;this._ease=null;this._clock=null;this._propsTo=null;this._propsFrom=null;
this._storePropsTo=null;this._storePropsFrom=null;this._propsDiff=null;this._propsEase=null;
this._onStart=null;this._onUpdate=null;this._onDraw=null;this._onComplete=null;
h._remove(this);return this};f.reset=function(){if(!this._isPrepared){return}this._stop();
this._resetLoop(this._target,this._storeTarget);this._direction=1;this._loop=this._options.loop||0;
this._loopCount=0;this._propsFrom=this._storePropsFrom;this._propsTo=this._storePropsTo;
this._progress=0;this._setStartTime();if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}if(this._onDraw){this._onDraw.call(this,this._getDetails())}return this};f.isPlaying=function(){return this._playing
};f.getTarget=function(){return this._target};f.setCurrentTime=function(n){this.setProgress(n*1000/this._duration);
return this.getCurrentTime()};f.getCurrentTime=function(){return(this.getProgress()*this._duration)/1000
};f.setProgress=function(n){this._progress=Math.min(1,Math.max(0,n));this._setStartTime();
if(!this._isPrepared){this._setDiff()}if(this._playing&&n===1){this._completeProps();
if(this._onUpdate){this._onUpdate.call(this,this._getDetails())}if(this._onDraw){this._onDraw.call(this,this._getDetails())
}this._complete()}else{this._updateProps();if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}if(this._onDraw){this._onDraw.call(this,this._getDetails())}}return this.getProgress()
};f.getProgress=function(){return this._progress};f._resetLoop=function(o,n){var p;
for(p in n){if(n.hasOwnProperty(p)){if(n[p]!==null){if(typeof n[p]==="object"){this._resetLoop(o[p],n[p])
}else{o[p]=n[p]}}}}};f._addPropsFrom=function(){var n;for(n in this._propsFrom){if(this._propsFrom.hasOwnProperty(n)&&this._propsTo[n]===undefined&&this._target[n]!==undefined){this._propsTo[n]=this._target[n]
}}};f._cloneTarget=function(){var n={};this._cloneTargetLoop(this._propsTo,this._target,n);
return n};f._cloneTargetLoop=function(r,p,n){var o;var q;for(q in r){if(p.hasOwnProperty(q)){o=typeof p[q];
if(p[q]!==null&&o==="object"){n[q]={};this._cloneTargetLoop(r[q],p[q],n[q])}else{if(r[q]&&o==="number"){n[q]=p[q]
}}}}};f._prepareProperties=function(){if(!this._isPrepared){this._addPropsFrom();
this._storeTarget=this._cloneTarget();this._storePropsTo=this._propsTo;this._storePropsFrom=this._propsFrom;
this._isPrepared=true}};f._setStartTime=function(){this._startTime=this._getTime()-(this.getProgress()*this._duration)
};f._setDiff=function(){if(!this._isPrepared){this._prepareProperties()}this._propsDiff={};
this._setDiffLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff)};
f._setDiffLoop=function(s,r,p,o){var n;var q;for(q in s){if(s.hasOwnProperty(q)){n=typeof s[q];
if(s[q]!==null&&n==="object"){r[q]=r[q]||{};o[q]=o[q]||{};this._setDiffLoop(s[q],r[q],p[q],o[q])
}else{if(n==="number"&&p[q]!==undefined){if(r[q]!==undefined){p[q]=r[q]}else{r[q]=p[q]
}o[q]=s[q]-p[q]}else{s[q]=null;r[q]=null}}}}};f._getDetails=function(){return{target:this.getTarget(),progress:this.getProgress(),clip:this}
};f._start=function(){this._startTimeout=null;this._remainingDelay=0;this._setStartTime();
this._clock.on("update",this._update);this._clock.on("draw",this._draw);if(!this._clock.isRunning()){this._clock.start()
}this._setDiff();this._playing=true;this._running=true;if(this._onStart){this._onStart.call(this,this._getDetails())
}this.trigger(h.PLAY,this._getDetails())};f._stop=function(){this._playing=false;
this._running=false;this._clock.off("update",this._update);this._clock.off("draw",this._draw)
};f._updateProps=function(){var n;if(this._direction===1){n=this._ease.getValue(this._progress)
}else{n=1-this._ease.getValue(1-this._progress)}this._updatePropsLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff,n)
};f._updatePropsLoop=function(s,r,p,o,n){var q;for(q in s){if(s.hasOwnProperty(q)&&s[q]!==null){if(typeof s[q]!=="number"){this._updatePropsLoop(s[q],r[q],p[q],o[q],n)
}else{p[q]=r[q]+(o[q]*n)}}}};f._completeProps=function(){this._completePropsLoop(this._propsTo,this._target)
};f._completePropsLoop=function(p,n){var o;for(o in p){if(p.hasOwnProperty(o)&&p[o]!==null){if(typeof p[o]!=="number"){this._completePropsLoop(p[o],n[o])
}else{n[o]=p[o]}}}};f._complete=function(){if(this._isYoyo&&((this._loop>0&&this._loopCount<=this._loop)||(this._loop===0&&this._loopCount===0))){this._propsFrom=(this._direction===1)?this._storePropsTo:this._storePropsFrom;
this._propsTo=(this._direction===1)?this._storePropsFrom:this._storePropsTo;this._direction*=-1;
if(this._direction===-1){++this._loopCount}this.setProgress(0);this._start()}else{if(this._loopCount<this._loop){++this._loopCount;
this.setProgress(0);this._start()}else{if(this._onComplete){this._onComplete.call(this,this._getDetails())
}this.trigger(h.COMPLETE,this._getDetails());if(this._options&&this._options.destroyOnComplete){this.destroy()
}}}};f._update=function(n){if(this._running){this._progress=(n.timeNow-this._startTime)/this._duration;
if(this._progress>=1){this._progress=1;this._running=false;this._completeProps()
}else{this._updateProps()}if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}}};f._draw=function(n){if(this._onDraw){this._onDraw.call(this,this._getDetails())
}if(!this._running){this._stop();if(this._progress===1){this._complete()}}};h._instantiate=function(){this._clips=[];
return this};h._add=function(n){this._clips.push(n)};h._remove=function(o){var n=this._clips.indexOf(o);
if(n>-1){this._clips.splice(n,1)}};h.getAll=function(p){if(p!==undefined){var n=[];
var o=this._clips.length;while(o--){if(this._clips[o].getTarget()===p){n.push(this._clips[o])
}}return n}return Array.prototype.slice.call(this._clips)};h.destroyAll=function(p){var n=this.getAll(p);
if(this._clips.length===n.length){this._clips=[]}var o=n.length;while(o--){n[o].destroy()
}return n};h.to=function(p,o,q,n){n=n||{};if(n.destroyOnComplete===undefined){n.destroyOnComplete=true
}return new h(p,o,q,n).play()};h.from=function(q,p,n,o){o=o||{};o.propsFrom=n;if(o.destroyOnComplete===undefined){o.destroyOnComplete=true
}return new h(q,p,o.propsTo,o).play()};b.exports=h._instantiate()},{"ac-clock":275,"ac-easing":387,"ac-event-emitter":279,"ac-object/create":550}],283:[function(b,c,a){arguments[4][275][0].apply(a,arguments)
},{"./ac-clock/Clock":284,"./ac-clock/ThrottledClock":285,"./ac-clock/sharedClockInstance":286,dup:275}],284:[function(c,d,b){var g;
var f=c("ac-event-emitter-micro").EventEmitterMicro;var a=new Date().getTime();
function h(){f.call(this);this.lastFrameTime=null;this._animationFrame=null;this._active=false;
this._startTime=null;this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);
this._getTime=Date.now||function(){return new Date().getTime()}}g=h.prototype=new f(null);
g.start=function(){if(this._active){return}this._tick()};g.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};g.destroy=function(){this.stop();
this.off();var j;for(j in this){if(this.hasOwnProperty(j)){this[j]=null}}};g.isRunning=function(){return this._active
};g._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};g._onAnimationFrame=function(m){var n=0;var j=this._getTime();if(this.lastFrameTime===null){this.lastFrameTime=j-a
}else{n=m-this.lastFrameTime}var l=0,k;if(n!==0){l=1000/n}k={time:m,delta:n,fps:l,naturalFps:l,timeNow:j};
this.trigger("update",k);this.trigger("draw",k);this._animationFrame=null;this.lastFrameTime=m;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};d.exports=h
},{"ac-event-emitter-micro":478}],285:[function(c,d,b){var g;var a=c("./sharedClockInstance"),f=c("ac-event-emitter-micro").EventEmitterMicro;
function h(k,j){if(k===null){return}f.call(this);j=j||{};this._fps=k||null;this._clock=j.clock||a;
this._lastThrottledTime=null;this._clockEvent=null;this._boundOnClockDraw=this._onClockDraw.bind(this);
this._boundOnClockUpdate=this._onClockUpdate.bind(this);this._clock.on("update",this._boundOnClockUpdate)
}g=h.prototype=new f(null);g.setFps=function(j){this._fps=j;return this};g.getFps=function(){return this._fps
};g.start=function(){this._clock.start();return this};g.stop=function(){this._clock.stop();
return this};g.isRunning=function(){return this._clock.isRunning()};g.destroy=function(){this._clock.off("update",this._boundOnClockUpdate);
this._clock.destroy.call(this)};g._onClockUpdate=function(j){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var k=j.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(k<(1000/this._fps)){return}this._clockEvent=j;this._clockEvent.delta=k;this._clockEvent.fps=1000/k;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._boundOnClockDraw);
this.trigger("update",this._clockEvent)};g._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};d.exports=h},{"./sharedClockInstance":286,"ac-event-emitter-micro":478}],286:[function(b,c,a){arguments[4][278][0].apply(a,arguments)
},{"./Clock":284,dup:278}],287:[function(b,c,a){c.exports={path:b("./ac-path/path")}
},{"./ac-path/path":288}],288:[function(b,c,a){function d(f){return d.parse(f)}d.basename=function(g,f){d._assertStr(g);
var j;var h=g.match(/[^/]*$/)[0];if(f){j=h.match(new RegExp("(.*)"+f+"$"));if(j){h=j[1]
}}return h};d.dirname=function(g){d._assertStr(g);var f=g.match(/^(.*)\b\/|.*/);
return f[1]||g};d.extname=function(f){d._assertStr(f);var g=f.match(/\.[^.]*$/);
return g?g[0]:""};d.filename=function(f){d._assertStr(f);return d.basename(f,d.extname(f))
};d.format=function(g,h){d._assertObj(g);var f=(g.dirname)?g.dirname+"/":"";if(g.basename){f+=g.basename
}else{if(g.filename){f+=g.filename;if(g.extname){f+=g.extname}}}if(h){if(typeof h==="string"){f+="?"+h
}else{if(Object.prototype.toString.call(h)===Object.prototype.toString.call([])){f+="?"+h.join("&")
}}}return f};d.isAbsolute=function(f){d._assertStr(f);return(!!f.match(/(^http(s?))/))
};d.isRootRelative=function(f){d._assertStr(f);return !!f.match(/^\/(?!\/)/)};d.parse=function(f){d._assertStr(f);
return{dirname:d.dirname(f),basename:d.basename(f),filename:d.filename(f),extname:d.extname(f)}
};d._assertStr=function(f){d._assertType(f,"string")};d._assertObj=function(f){d._assertType(f,"object")
};d._assertType=function(h,f){var g=typeof h;if(g==="undefined"||g!==f){throw new TypeError("path param must be of type "+f)
}};c.exports=d},{}],289:[function(b,c,a){c.exports={cname:b("./ac-cname/cname")}
},{"./ac-cname/cname":290}],290:[function(c,d,a){var f=c("ac-path").path;function b(g){return b.addPrefix(g)
}b._prefix=(function(){var g="http://images.apple.com/global/elements/blank.gif";return g.replace(/global\/.*/,"")
}());b.addPrefix=function(g){if(f.isAbsolute(g)){return g}b._assertRootRelative(g);
g=b._prefix+g.replace(/^\//,"");g=g.replace(/(^.+)(\/105\/)/,"$1/");return g};b.formatUrl=function(k,g,m,l){var j=f.format({dirname:k,filename:g,extname:m},l);
if(f.isAbsolute(j)){return j}b._assertRootRelative(k);var h=b.addPrefix(j);return h
};b._assertRootRelative=function(g){if(!f.isRootRelative(g)){throw new URIError("Only root-relative paths are currently supported")
}};d.exports=b},{"ac-path":287}],291:[function(b,c,a){c.exports={log:b("./ac-console/log")}
},{"./ac-console/log":292}],292:[function(d,f,b){var a="f7c9180f-5c45-47b4-8de4-428015f096c0";
var c=!!(function(){try{return window.localStorage.getItem(a)}catch(h){}}());f.exports=function g(){if(window.console&&typeof console.log!=="undefined"&&c){console.log.apply(console,Array.prototype.slice.call(arguments,0))
}}},{}],293:[function(b,c,a){arguments[4][279][0].apply(a,arguments)},{"./ac-event-emitter/EventEmitter":294,dup:279}],294:[function(b,c,a){arguments[4][280][0].apply(a,arguments)
},{dup:280}],295:[function(b,c,a){c.exports.DOMEmitter=b("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":296}],296:[function(b,c,a){var g;var f=b("ac-event-emitter").EventEmitter;
var d="dom-emitter";function h(j){if(j===null){return}this.el=j;this._bindings={};
this._eventEmitter=new f()}g=h.prototype;g._parseEventNames=function(j){if(!j){return[j]
}return j.split(" ")};g._onListenerEvent=function(k,j){this.trigger(k,j,false)};
g._setListener=function(j){this._bindings[j]=this._onListenerEvent.bind(this,j);
this._addEventListener(j,this._bindings[j])};g._removeListener=function(j){this._removeEventListener(j,this._bindings[j]);
delete this._bindings[j]};g._addEventListener=function(k,l,j){if(this.el.addEventListener){this.el.addEventListener(k,l,j)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+k,l)}else{target["on"+k]=l
}}return this};g._removeEventListener=function(k,l,j){if(this.el.removeEventListener){this.el.removeEventListener(k,l,j)
}else{this.el.detachEvent("on"+k,l)}return this};g._triggerInternalEvent=function(j,k){this.trigger(d+":"+j,k)
};g.on=function(j,l,k){j=this._parseEventNames(j);j.forEach(function(o,n,m){if(!this.has(m)){this._setListener(m)
}this._triggerInternalEvent("willon",{evt:m,callback:o,context:n});this._eventEmitter.on(m,o,n);
this._triggerInternalEvent("didon",{evt:m,callback:o,context:n})}.bind(this,l,k));
return this};g.off=function(j,m,l){var k=Array.prototype.slice.call(arguments,0);
j=this._parseEventNames(j);j.forEach(function(r,q,o,n){if(o.length===0){this._eventEmitter.off();
var p;for(p in this._bindings){if(this._bindings.hasOwnProperty(p)){this._removeListener(p)
}}return}this._triggerInternalEvent("willoff",{evt:n,callback:r,context:q});this._eventEmitter.off(n,r,q);
this._triggerInternalEvent("didoff",{evt:n,callback:r,context:q});if(!this.has(n)){this._removeListener(n)
}}.bind(this,m,l,k));return this};g.once=function(j,l,k){j=this._parseEventNames(j);
j.forEach(function(o,n,m){if(!this.has(m)){this._setListener(m)}this._triggerInternalEvent("willonce",{evt:m,callback:o,context:n});
this._eventEmitter.once.call(this,m,o,n);this._triggerInternalEvent("didonce",{evt:m,callback:o,context:n})
}.bind(this,l,k));return this};g.has=function(j,l,k){if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};g.trigger=function(j,k,l){j=this._parseEventNames(j);j.forEach(function(n,o,m){this._eventEmitter.trigger(m,n,o)
}.bind(this,k,l));return this};g.destroy=function(){this._triggerInternalEvent("willdestroy");
this.off();this.el=this._eventEmitter=this._bindings=null};c.exports=h},{"ac-event-emitter":293}],297:[function(c,d,b){var g=c("./utils/addEventListener");
var a=c("./shared/getEventType");d.exports=function f(l,j,k,h){j=a(l,j);return g(l,j,k,h)
}},{"./shared/getEventType":307,"./utils/addEventListener":311}],298:[function(d,f,c){var a=d("./utils/dispatchEvent");
var b=d("./shared/getEventType");f.exports=function g(k,j,h){j=b(k,j);return a(k,j,h)
}},{"./shared/getEventType":307,"./utils/dispatchEvent":312}],299:[function(b,c,a){c.exports={addEventListener:b("./addEventListener"),dispatchEvent:b("./dispatchEvent"),preventDefault:b("./preventDefault"),removeEventListener:b("./removeEventListener"),stop:b("./stop"),stopPropagation:b("./stopPropagation"),target:b("./target")}
},{"./addEventListener":297,"./dispatchEvent":298,"./preventDefault":305,"./removeEventListener":306,"./stop":308,"./stopPropagation":309,"./target":310}],300:[function(d,b,f){var g=d("./utils/eventTypeAvailable");
var k=d("./shared/camelCasedEventTypes");var c=d("./shared/windowFallbackEventTypes");
var h=d("./shared/prefixHelper");var a={};b.exports=function j(n,m){var o;var p;
var l;m=m||"div";n=n.toLowerCase();if(!(m in a)){a[m]={}}p=a[m];if(n in p){return p[n]
}if(g(n,m)){return p[n]=n}if(n in k){for(l=0;l<k[n].length;l++){o=k[n][l];if(g(o.toLowerCase(),m)){return p[n]=o
}}}for(l=0;l<h.evt.length;l++){o=h.evt[l]+n;if(g(o,m)){h.reduce(l);return p[n]=o
}}if(m!=="window"&&c.indexOf(n)){return p[n]=j(n,"window")}return p[n]=false}},{"./shared/camelCasedEventTypes":301,"./shared/prefixHelper":302,"./shared/windowFallbackEventTypes":303,"./utils/eventTypeAvailable":304}],301:[function(b,c,a){c.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],302:[function(b,d,a){var j=["-webkit-","-moz-","-ms-"];var f=["Webkit","Moz","ms"];
var h=["webkit","moz","ms"];var c=function(){this.initialize()};var g=c.prototype;
g.initialize=function(){this.reduced=false;this.css=j;this.dom=f;this.evt=h};g.reduce=function(k){if(!this.reduced){this.reduced=true;
this.css=[this.css[k]];this.dom=[this.dom[k]];this.evt=[this.evt[k]]}};d.exports=new c()
},{}],303:[function(b,c,a){c.exports=["transitionend","animationstart","animationend","animationiteration",]
},{}],304:[function(c,f,b){var a={window:window,document:document};f.exports=function d(j,g){var h;
j="on"+j;if(!(g in a)){a[g]=document.createElement(g)}h=a[g];if(j in h){return true
}if("setAttribute" in h){h.setAttribute(j,"return;");return(typeof h[j]==="function")
}return false}},{}],305:[function(c,d,a){d.exports=function b(f){f=f||window.event;
if(f.preventDefault){f.preventDefault()}else{f.returnValue=false}}},{}],306:[function(d,f,c){var b=d("./utils/removeEventListener");
var a=d("./shared/getEventType");f.exports=function g(l,j,k,h){j=a(l,j);return b(l,j,k,h)
}},{"./shared/getEventType":307,"./utils/removeEventListener":313}],307:[function(c,f,b){var d=c("ac-prefixer/getEventType");
f.exports=function a(k,j){var h;var g;if("tagName" in k){h=k.tagName}else{if(k===window){h="window"
}else{h="document"}}g=d(j,h);if(g){return g}return j}},{"ac-prefixer/getEventType":300}],308:[function(d,g,b){var a=d("./stopPropagation");
var c=d("./preventDefault");g.exports=function f(h){h=h||window.event;a(h);c(h);
h.stopped=true;h.returnValue=false}},{"./preventDefault":305,"./stopPropagation":309}],309:[function(c,d,b){d.exports=function a(f){f=f||window.event;
if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}}},{}],310:[function(b,c,a){c.exports=function d(f){f=f||window.event;
return(typeof f.target!=="undefined")?f.target:f.srcElement}},{}],311:[function(b,c,a){c.exports=function d(j,g,h,f){if(j.addEventListener){j.addEventListener(g,h,!!f)
}else{j.attachEvent("on"+g,h)}return j}},{}],312:[function(b,c,a){b("ac-polyfills/CustomEvent");
c.exports=function d(j,h,g){var f;if(j.dispatchEvent){if(g){f=new CustomEvent(h,g)
}else{f=new CustomEvent(h)}j.dispatchEvent(f)}else{f=document.createEventObject();
if(g&&"detail" in g){f.detail=g.detail}j.fireEvent("on"+h,f)}return j}},{"ac-polyfills/CustomEvent":567}],313:[function(b,c,a){c.exports=function d(j,g,h,f){if(j.removeEventListener){j.removeEventListener(g,h,!!f)
}else{j.detachEvent("on"+g,h)}return j}},{}],314:[function(d,f,c){var b=d("./utils/getBoundingClientRect");
f.exports=function a(g,j){var h=1;if(j){h=b(g).width/g.offsetWidth}return{width:g.scrollWidth*h,height:g.scrollHeight*h}
}},{"./utils/getBoundingClientRect":325}],315:[function(d,f,c){var b=d("./utils/getBoundingClientRect");
f.exports=function a(g,j){var h;if(j){h=b(g);return{width:h.width,height:h.height}
}return{width:g.offsetWidth,height:g.offsetHeight}}},{"./utils/getBoundingClientRect":325}],316:[function(g,h,f){var c=g("./getDimensions");
var d=g("./utils/getBoundingClientRect");var b=g("./getScrollX");var a=g("./getScrollY");
h.exports=function j(k,q){var m;var p;var n;var l;var o;if(q){m=d(k);p=b();n=a();
return{top:m.top+n,right:m.right+p,bottom:m.bottom+n,left:m.left+p}}l=c(k,q);m={top:k.offsetTop,left:k.offsetLeft,width:l.width,height:l.height};
while(k=k.offsetParent){m.top+=k.offsetTop;m.left+=k.offsetLeft}return{top:m.top,right:m.left+m.width,bottom:m.top+m.height,left:m.left}
}},{"./getDimensions":315,"./getScrollX":320,"./getScrollY":321,"./utils/getBoundingClientRect":325}],317:[function(c,f,b){var a=c("./getDimensions");
var g=c("./getPixelsInViewport");f.exports=function d(k,l){var j=g(k,l);var h=a(k,l).height;
return(j/h)}},{"./getDimensions":315,"./getPixelsInViewport":318}],318:[function(c,d,b){var a=c("./getViewportPosition");
d.exports=function f(h,l){var k=document.documentElement.clientHeight;var g=a(h,l);
var j;if(g.top>=k||g.bottom<=0){return 0}j=(g.bottom-g.top);if(g.top<0){j+=g.top
}if(g.bottom>k){j-=g.bottom-k}return j}},{"./getViewportPosition":322}],319:[function(d,f,c){var a=d("./getDimensions");
var b=d("./utils/getBoundingClientRect");f.exports=function g(j,m){var l;var h;
var k;if(m){l=b(j);if(j.offsetParent){h=b(j.offsetParent);l.top-=h.top;l.left-=h.left
}}else{k=a(j,m);l={top:j.offsetTop,left:j.offsetLeft,width:k.width,height:k.height}
}return{top:l.top,right:l.left+l.width,bottom:l.top+l.height,left:l.left}}},{"./getDimensions":315,"./utils/getBoundingClientRect":325}],320:[function(c,d,b){d.exports=function a(f){var g;
f=f||window;if(f===window){g=window.pageXOffset;if(!g){f=document.documentElement||document.body.parentNode||document.body
}else{return g}}return f.scrollLeft}},{}],321:[function(c,d,b){d.exports=function a(f){var g;
f=f||window;if(f===window){g=window.pageYOffset;if(!g){f=document.documentElement||document.body.parentNode||document.body
}else{return g}}return f.scrollTop}},{}],322:[function(g,h,f){var j=g("./getPagePosition");
var d=g("./utils/getBoundingClientRect");var c=g("./getScrollX");var b=g("./getScrollY");
h.exports=function a(l,o){var k;var n;var m;if(o){k=d(l);return{top:k.top,right:k.right,bottom:k.bottom,left:k.left}
}k=j(l);n=c();m=b();return{top:k.top-m,right:k.right-n,bottom:k.bottom-m,left:k.left-n}
}},{"./getPagePosition":316,"./getScrollX":320,"./getScrollY":321,"./utils/getBoundingClientRect":325}],323:[function(b,c,a){c.exports={getContentDimensions:b("./getContentDimensions"),getDimensions:b("./getDimensions"),getPagePosition:b("./getPagePosition"),getPercentInViewport:b("./getPercentInViewport"),getPixelsInViewport:b("./getPixelsInViewport"),getPosition:b("./getPosition"),getScrollX:b("./getScrollX"),getScrollY:b("./getScrollY"),getViewportPosition:b("./getViewportPosition"),isInViewport:b("./isInViewport")}
},{"./getContentDimensions":314,"./getDimensions":315,"./getPagePosition":316,"./getPercentInViewport":317,"./getPixelsInViewport":318,"./getPosition":319,"./getScrollX":320,"./getScrollY":321,"./getViewportPosition":322,"./isInViewport":324}],324:[function(b,d,a){var g=b("./getPixelsInViewport");
var c=b("./getPercentInViewport");d.exports=function f(k,l,h){var j;h=h||0;if(typeof h==="string"&&h.slice(-2)==="px"){h=parseInt(h,10);
j=g(k,l)}else{j=c(k,l)}return(j>0&&j>=h)}},{"./getPercentInViewport":317,"./getPixelsInViewport":318}],325:[function(c,d,b){d.exports=function a(f){var g=f.getBoundingClientRect();
return{top:g.top,right:g.right,bottom:g.bottom,left:g.left,width:g.width||g.right-g.left,height:g.height||g.bottom-g.top}
}},{}],326:[function(b,c,a){c.exports=8},{}],327:[function(b,c,a){c.exports=11},{}],328:[function(b,c,a){c.exports=9
},{}],329:[function(b,c,a){c.exports=10},{}],330:[function(b,c,a){c.exports=1},{}],331:[function(b,c,a){c.exports=3
},{}],332:[function(c,d,b){d.exports=function a(g){var f=document.createDocumentFragment();
var h;if(g){h=document.createElement("div");h.innerHTML=g;while(h.firstChild){f.appendChild(h.firstChild)
}}return f}},{}],333:[function(d,f,c){d("ac-polyfills/Array/prototype.slice");d("ac-polyfills/Array/prototype.filter");
var g=d("./internal/isNodeType");var a=d("./ELEMENT_NODE");f.exports=function b(j,h){h=h||a;
j=Array.prototype.slice.call(j);return j.filter(function(k){return g(k,h)})}},{"./ELEMENT_NODE":330,"./internal/isNodeType":341,"ac-polyfills/Array/prototype.filter":562,"ac-polyfills/Array/prototype.slice":565}],334:[function(c,d,a){d.exports=function b(g,f){if("hasAttribute" in g){return g.hasAttribute(f)
}return(g.attributes.getNamedItem(f)!==null)}},{}],335:[function(b,c,a){c.exports={createDocumentFragment:b("./createDocumentFragment"),filterByNodeType:b("./filterByNodeType"),hasAttribute:b("./hasAttribute"),indexOf:b("./indexOf"),insertAfter:b("./insertAfter"),insertBefore:b("./insertBefore"),insertFirstChild:b("./insertFirstChild"),insertLastChild:b("./insertLastChild"),isComment:b("./isComment"),isDocument:b("./isDocument"),isDocumentFragment:b("./isDocumentFragment"),isDocumentType:b("./isDocumentType"),isElement:b("./isElement"),isNode:b("./isNode"),isNodeList:b("./isNodeList"),isTextNode:b("./isTextNode"),remove:b("./remove"),replace:b("./replace"),COMMENT_NODE:b("./COMMENT_NODE"),DOCUMENT_FRAGMENT_NODE:b("./DOCUMENT_FRAGMENT_NODE"),DOCUMENT_NODE:b("./DOCUMENT_NODE"),DOCUMENT_TYPE_NODE:b("./DOCUMENT_TYPE_NODE"),ELEMENT_NODE:b("./ELEMENT_NODE"),TEXT_NODE:b("./TEXT_NODE")}
},{"./COMMENT_NODE":326,"./DOCUMENT_FRAGMENT_NODE":327,"./DOCUMENT_NODE":328,"./DOCUMENT_TYPE_NODE":329,"./ELEMENT_NODE":330,"./TEXT_NODE":331,"./createDocumentFragment":332,"./filterByNodeType":333,"./hasAttribute":334,"./indexOf":336,"./insertAfter":337,"./insertBefore":338,"./insertFirstChild":339,"./insertLastChild":340,"./isComment":343,"./isDocument":344,"./isDocumentFragment":345,"./isDocumentType":346,"./isElement":347,"./isNode":348,"./isNodeList":349,"./isTextNode":350,"./remove":351,"./replace":352}],336:[function(c,d,b){c("ac-polyfills/Array/prototype.indexOf");
c("ac-polyfills/Array/prototype.slice");var g=c("./internal/validate");var a=c("./filterByNodeType");
d.exports=function f(l,j){var h=l.parentNode;var k;if(!h){return 0}k=h.childNodes;
if(j!==false){k=a(k,j)}else{k=Array.prototype.slice.call(k)}return k.indexOf(l)
}},{"./filterByNodeType":333,"./internal/validate":342,"ac-polyfills/Array/prototype.indexOf":564,"ac-polyfills/Array/prototype.slice":565}],337:[function(b,c,a){var f=b("./internal/validate");
c.exports=function d(g,h){f.insertNode(g,true,"insertAfter");f.childNode(h,true,"insertAfter");
f.hasParentNode(h,"insertAfter");if(!h.nextSibling){return h.parentNode.appendChild(g)
}return h.parentNode.insertBefore(g,h.nextSibling)}},{"./internal/validate":342}],338:[function(c,d,a){var f=c("./internal/validate");
d.exports=function b(g,h){f.insertNode(g,true,"insertBefore");f.childNode(h,true,"insertBefore");
f.hasParentNode(h,"insertBefore");return h.parentNode.insertBefore(g,h)}},{"./internal/validate":342}],339:[function(c,d,b){var f=c("./internal/validate");
d.exports=function a(g,h){f.insertNode(g,true,"insertFirstChild");f.parentNode(h,true,"insertFirstChild");
if(!h.firstChild){return h.appendChild(g)}return h.insertBefore(g,h.firstChild)
}},{"./internal/validate":342}],340:[function(b,c,a){var d=b("./internal/validate");
c.exports=function f(g,h){d.insertNode(g,true,"insertLastChild");d.parentNode(h,true,"insertLastChild");
return h.appendChild(g)}},{"./internal/validate":342}],341:[function(b,c,a){var d=b("../isNode");
c.exports=function f(h,g){if(!d(h)){return false}if(typeof g==="number"){return(h.nodeType===g)
}return(g.indexOf(h.nodeType)!==-1)}},{"../isNode":348}],342:[function(g,d,k){var b=g("./isNodeType");
var c=g("../COMMENT_NODE");var l=g("../DOCUMENT_FRAGMENT_NODE");var j=g("../ELEMENT_NODE");
var h=g("../TEXT_NODE");var n=[j,h,c,l];var f=" must be an Element, TextNode, Comment, or Document Fragment";
var q=[j,h,c];var m=" must be an Element, TextNode, or Comment";var o=[j,l];var p=" must be an Element, or Document Fragment";
var a=" must have a parentNode";d.exports={parentNode:function(r,u,t,s){s=s||"target";
if((r||u)&&!b(r,o)){throw new TypeError(t+": "+s+p)}},childNode:function(r,u,t,s){s=s||"target";
if(!r&&!u){return}if(!b(r,q)){throw new TypeError(t+": "+s+m)}},insertNode:function(r,u,t,s){s=s||"node";
if(!r&&!u){return}if(!b(r,n)){throw new TypeError(t+": "+s+f)}},hasParentNode:function(r,t,s){s=s||"target";
if(!r.parentNode){throw new TypeError(t+": "+s+a)}}}},{"../COMMENT_NODE":326,"../DOCUMENT_FRAGMENT_NODE":327,"../ELEMENT_NODE":330,"../TEXT_NODE":331,"./isNodeType":341}],343:[function(c,d,a){var g=c("./internal/isNodeType");
var f=c("./COMMENT_NODE");d.exports=function b(h){return g(h,f)}},{"./COMMENT_NODE":326,"./internal/isNodeType":341}],344:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./DOCUMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./DOCUMENT_NODE":328,"./internal/isNodeType":341}],345:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./DOCUMENT_FRAGMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./DOCUMENT_FRAGMENT_NODE":327,"./internal/isNodeType":341}],346:[function(b,c,a){var g=b("./internal/isNodeType");
var f=b("./DOCUMENT_TYPE_NODE");c.exports=function d(h){return g(h,f)}},{"./DOCUMENT_TYPE_NODE":329,"./internal/isNodeType":341}],347:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./ELEMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./ELEMENT_NODE":330,"./internal/isNodeType":341}],348:[function(b,c,a){c.exports=function d(f){return !!(f&&f.nodeType)
}},{}],349:[function(c,d,b){var f=/^\[object (HTMLCollection|NodeList|Object)\]$/;
d.exports=function a(g){if(!g){return false}if(typeof g.length!=="number"){return false
}if(typeof g[0]==="object"&&(!g[0]||!g[0].nodeType)){return false}return f.test(Object.prototype.toString.call(g))
}},{}],350:[function(c,d,a){var g=c("./internal/isNodeType");var b=c("./TEXT_NODE");
d.exports=function f(h){return g(h,b)}},{"./TEXT_NODE":331,"./internal/isNodeType":341}],351:[function(c,d,b){var f=c("./internal/validate");
d.exports=function a(g){f.childNode(g,true,"remove");if(!g.parentNode){return g
}return g.parentNode.removeChild(g)}},{"./internal/validate":342}],352:[function(b,d,a){var f=b("./internal/validate");
d.exports=function c(g,h){f.insertNode(g,true,"insertFirstChild","newNode");f.childNode(h,true,"insertFirstChild","oldNode");
f.hasParentNode(h,"insertFirstChild","oldNode");return h.parentNode.replaceChild(g,h)
}},{"./internal/validate":342}],353:[function(c,d,b){var f=c("ac-prefixer/getStyleProperty");
var g=c("ac-prefixer/stripPrefixes");d.exports=function a(){var k=Array.prototype.slice.call(arguments);
var p=k.shift(k);var m=window.getComputedStyle(p);var l={};var o;var h;var n;var j;
if(typeof k[0]!=="string"){k=k[0]}for(j=0;j<k.length;j++){o=k[j];h=f(o);if(h){o=g(h);
n=m[h];if(!n||n==="auto"){n=null}if(n){n=g(n)}}else{n=null}l[o]=n}return l}},{"ac-prefixer/getStyleProperty":357,"ac-prefixer/stripPrefixes":363}],354:[function(b,c,a){c.exports={getStyle:b("./getStyle"),setStyle:b("./setStyle")}
},{"./getStyle":353,"./setStyle":366}],355:[function(c,d,b){d.exports=function a(j){var h;
var g;var f;if(!j&&j!==0){return""}if(Array.isArray(j)){return j+""}if(typeof j==="object"){h="";
g=Object.keys(j);for(f=0;f<g.length;f++){h+=g[f]+"("+j[g[f]]+") "}return h.trim()
}return j}},{}],356:[function(d,f,c){var b=d("./shared/stylePropertyCache");var h=d("./getStyleProperty");
var g=d("./getStyleValue");f.exports=function a(l,k){var j;l=h(l);if(!l){return false
}j=b[l].css;if(typeof k!=="undefined"){k=g(l,k);if(k===false){return false}j+=":"+k+";"
}return j}},{"./getStyleProperty":357,"./getStyleValue":358,"./shared/stylePropertyCache":361}],357:[function(f,d,h){var a=f("./shared/stylePropertyCache");
var j=f("./shared/getStyleTestElement");var b=f("./utils/toCSS");var l=f("./utils/toDOM");
var k=f("./shared/prefixHelper");var c=function(p,m){var n=b(p);var o=(m===false)?false:b(m);
a[p]=a[m]=a[n]=a[o]={dom:m,css:o};return m};d.exports=function g(q){var o;var m;
var p;var n;q+="";if(q in a){return a[q].dom}p=j();q=l(q);m=q.charAt(0).toUpperCase()+q.substring(1);
if(q==="filter"){o=["WebkitFilter","filter"]}else{o=(q+" "+k.dom.join(m+" ")+m).split(" ")
}for(n=0;n<o.length;n++){if(typeof p.style[o[n]]!=="undefined"){if(n!==0){k.reduce(n-1)
}return c(q,o[n])}}return c(q,false)}},{"./shared/getStyleTestElement":359,"./shared/prefixHelper":360,"./shared/stylePropertyCache":361,"./utils/toCSS":364,"./utils/toDOM":365}],358:[function(d,b,h){var f=d("./getStyleProperty");
var l=d("./shared/styleValueAvailable");var k=d("./shared/prefixHelper");var a=d("./shared/stylePropertyCache");
var j={};var m=/(\([^\)]+\))/gi;var g=/([^ ,;\(]+(\([^\)]+\))?)/gi;b.exports=function c(p,o){var n;
o+="";p=f(p);if(!p){return false}if(l(p,o)){return o}n=a[p].css;o=o.replace(g,function(r){var q;
var u;var t;var s;if(r[0]==="#"||!isNaN(r[0])){return r}u=r.replace(m,"");t=n+":"+u;
if(t in j){if(j[t]===false){return""}return r.replace(u,j[t])}q=k.css.map(function(v){return v+r
});q=[r].concat(q);for(s=0;s<q.length;s++){if(l(p,q[s])){if(s!==0){k.reduce(s-1)
}j[t]=q[s].replace(m,"");return q[s]}}j[t]=false;return""});o=o.trim();return(o==="")?false:o
}},{"./getStyleProperty":357,"./shared/prefixHelper":360,"./shared/stylePropertyCache":361,"./shared/styleValueAvailable":362}],359:[function(c,d,b){var f;
d.exports=function a(){if(!f){f=document.createElement("_")}else{f.style.cssText="";
f.removeAttribute("style")}return f};d.exports.resetElement=function(){f=null}},{}],360:[function(b,c,a){arguments[4][302][0].apply(a,arguments)
},{dup:302}],361:[function(b,c,a){c.exports={}},{}],362:[function(c,b,d){var a=c("./stylePropertyCache");
var f=c("./getStyleTestElement");var j=false;var l;var k;var g=function(){var m;
if(!j){j=true;l=("CSS" in window&&"supports" in window.CSS);k=false;m=f();try{m.style.width="invalid"
}catch(n){k=true}}};b.exports=function h(p,o){var n;var m;g();if(l){p=a[p].css;
return CSS.supports(p,o)}m=f();n=m.style[p];if(k){try{m.style[p]=o}catch(q){return false
}}else{m.style[p]=o}return(m.style[p]&&m.style[p]!==n)};b.exports.resetFlags=function(){j=false
}},{"./getStyleTestElement":359,"./stylePropertyCache":361}],363:[function(c,d,a){var b=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
d.exports=function f(g){g=String.prototype.replace.call(g,b,"");return g.charAt(0).toLowerCase()+g.substring(1)
}},{}],364:[function(c,d,b){var f=/^(webkit|moz|ms)/gi;d.exports=function a(h){var g;
if(h.toLowerCase()==="cssfloat"){return"float"}if(f.test(h)){h="-"+h}return h.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],365:[function(b,c,a){var f=/-([a-z])/g;c.exports=function d(h){var g;if(h.toLowerCase()==="float"){return"cssFloat"
}h=h.replace(f,function(k,j){return j.toUpperCase()});if(h.substr(0,2)==="Ms"){h="ms"+h.substring(2)
}return h}},{}],366:[function(d,f,c){var a=d("ac-prefixer/getStyleCSS");var g=d("ac-prefixer/getStyleProperty");
var b=d("./internal/normalizeValue");f.exports=function h(p,m){var l="";var k;var o;
var j;var n;var q;if(typeof m!=="object"){throw new TypeError("setStyle: styles must be an Object")
}for(o in m){n=b(m[o]);if(!n&&n!==0){j=g(o);if("removeAttribute" in p.style){p.style.removeAttribute(j)
}else{p.style[j]=""}}else{k=a(o,n);if(k!==false){l+=" "+k}}}if(l.length){q=p.style.cssText;
if(q.charAt(q.length-1)!==";"){q+=";"}q+=l;p.style.cssText=q}return p}},{"./internal/normalizeValue":355,"ac-prefixer/getStyleCSS":356,"ac-prefixer/getStyleProperty":357}],367:[function(c,f,b){var g=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");f.exports=function d(l,k,j){h.childNode(l,true,"ancestors");
h.selector(k,false,"ancestors");if(j&&g(l)&&(!k||a(l,k))){return l}if(l!==document.body){while((l=l.parentNode)&&g(l)){if(!k||a(l,k)){return l
}if(l===document.body){break}}}return null}},{"./internal/validate":374,"./matchesSelector":376,"ac-dom-nodes/isElement":347}],368:[function(c,d,b){var g=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function f(m,k,j){var l=[];
h.childNode(m,true,"ancestors");h.selector(k,false,"ancestors");if(j&&g(m)&&(!k||a(m,k))){l.push(m)
}if(m!==document.body){while((m=m.parentNode)&&g(m)){if(!k||a(m,k)){l.push(m)}if(m===document.body){break
}}}return l}},{"./internal/validate":374,"./matchesSelector":376,"ac-dom-nodes/isElement":347}],369:[function(d,g,c){var b=d("ac-dom-nodes/filterByNodeType");
var a=d("./filterBySelector");var h=d("./internal/validate");g.exports=function f(l,j){var k;
h.parentNode(l,true,"children");h.selector(j,false,"children");k=l.children||l.childNodes;
k=b(k);if(j){k=a(k,j)}return k}},{"./filterBySelector":370,"./internal/validate":374,"ac-dom-nodes/filterByNodeType":333}],370:[function(d,f,c){d("ac-polyfills/Array/prototype.slice");
d("ac-polyfills/Array/prototype.filter");var b=d("./matchesSelector");var g=d("./internal/validate");
f.exports=function a(j,h){g.selector(h,true,"filterBySelector");j=Array.prototype.slice.call(j);
return j.filter(function(k){return b(k,h)})}},{"./internal/validate":374,"./matchesSelector":376,"ac-polyfills/Array/prototype.filter":562,"ac-polyfills/Array/prototype.slice":565}],371:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(k,h){var j;g.parentNode(k,true,"firstChild");
g.selector(h,false,"firstChild");if(k.firstElementChild&&!h){return k.firstElementChild
}j=c(k,h);if(j.length){return j[0]}return null}},{"./children":369,"./internal/validate":374}],372:[function(b,c,a){c.exports={ancestor:b("./ancestor"),ancestors:b("./ancestors"),children:b("./children"),filterBySelector:b("./filterBySelector"),firstChild:b("./firstChild"),lastChild:b("./lastChild"),matchesSelector:b("./matchesSelector"),nextSibling:b("./nextSibling"),nextSiblings:b("./nextSiblings"),previousSibling:b("./previousSibling"),previousSiblings:b("./previousSiblings"),querySelector:b("./querySelector"),querySelectorAll:b("./querySelectorAll"),siblings:b("./siblings")}
},{"./ancestor":367,"./ancestors":368,"./children":369,"./filterBySelector":370,"./firstChild":371,"./lastChild":375,"./matchesSelector":376,"./nextSibling":377,"./nextSiblings":378,"./previousSibling":379,"./previousSiblings":380,"./querySelector":381,"./querySelectorAll":382,"./siblings":386}],373:[function(b,c,a){c.exports=window.Element?(function(d){return d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector
}(Element.prototype)):null},{}],374:[function(g,c,j){g("ac-polyfills/Array/prototype.indexOf");
var p=g("ac-dom-nodes/isNode");var b=g("ac-dom-nodes/COMMENT_NODE");var l=g("ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");
var k=g("ac-dom-nodes/DOCUMENT_NODE");var h=g("ac-dom-nodes/ELEMENT_NODE");var f=g("ac-dom-nodes/TEXT_NODE");
var a=function(s,r){if(!p(s)){return false}if(typeof r==="number"){return(s.nodeType===r)
}return(r.indexOf(s.nodeType)!==-1)};var n=[h,k,l];var o=" must be an Element, Document, or Document Fragment";
var q=[h,f,b];var m=" must be an Element, TextNode, or Comment";var d=" must be a string";
c.exports={parentNode:function(r,u,t,s){s=s||"node";if((r||u)&&!a(r,n)){throw new TypeError(t+": "+s+o)
}},childNode:function(r,u,t,s){s=s||"node";if(!r&&!u){return}if(!a(r,q)){throw new TypeError(t+": "+s+m)
}},selector:function(r,u,t,s){s=s||"selector";if((r||u)&&typeof r!=="string"){throw new TypeError(t+": "+s+d)
}}}},{"ac-dom-nodes/COMMENT_NODE":326,"ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":327,"ac-dom-nodes/DOCUMENT_NODE":328,"ac-dom-nodes/ELEMENT_NODE":330,"ac-dom-nodes/TEXT_NODE":331,"ac-dom-nodes/isNode":348,"ac-polyfills/Array/prototype.indexOf":564}],375:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(k,h){var j;g.parentNode(k,true,"lastChild");
g.selector(h,false,"lastChild");if(k.lastElementChild&&!h){return k.lastElementChild
}j=c(k,h);if(j.length){return j[j.length-1]}return null}},{"./children":369,"./internal/validate":374}],376:[function(d,f,c){var g=d("ac-dom-nodes/isElement");
var j=d("./internal/validate");var a=d("./internal/nativeMatches");var h=d("./shims/matchesSelector");
f.exports=function b(l,k){j.selector(k,true,"matchesSelector");if(!g(l)){return false
}if(!a){return h(l,k)}return a.call(l,k)}},{"./internal/nativeMatches":373,"./internal/validate":374,"./shims/matchesSelector":383,"ac-dom-nodes/isElement":347}],377:[function(c,d,b){var f=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function g(k,j){h.childNode(k,true,"nextSibling");
h.selector(j,false,"nextSibling");if(k.nextElementSibling&&!j){return k.nextElementSibling
}while(k=k.nextSibling){if(f(k)){if(!j||a(k,j)){return k}}}return null}},{"./internal/validate":374,"./matchesSelector":376,"ac-dom-nodes/isElement":347}],378:[function(d,f,b){var g=d("ac-dom-nodes/isElement");
var a=d("./matchesSelector");var h=d("./internal/validate");f.exports=function c(l,j){var k=[];
h.childNode(l,true,"nextSiblings");h.selector(j,false,"nextSiblings");while(l=l.nextSibling){if(g(l)){if(!j||a(l,j)){k.push(l)
}}}return k}},{"./internal/validate":374,"./matchesSelector":376,"ac-dom-nodes/isElement":347}],379:[function(c,d,b){var g=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function f(k,j){h.childNode(k,true,"previousSibling");
h.selector(j,false,"previousSibling");if(k.previousElementSibling&&!j){return k.previousElementSibling
}while(k=k.previousSibling){if(g(k)){if(!j||a(k,j)){return k}}}return null}},{"./internal/validate":374,"./matchesSelector":376,"ac-dom-nodes/isElement":347}],380:[function(c,d,b){var f=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function g(l,j){var k=[];
h.childNode(l,true,"previousSiblings");h.selector(j,false,"previousSiblings");while(l=l.previousSibling){if(f(l)){if(!j||a(l,j)){k.push(l)
}}}return k.reverse()}},{"./internal/validate":374,"./matchesSelector":376,"ac-dom-nodes/isElement":347}],381:[function(c,d,a){var h=c("./internal/validate");
var b=c("./shims/querySelector");var g=("querySelector" in document);d.exports=function f(j,k){k=k||document;
h.parentNode(k,true,"querySelector","context");h.selector(j,true,"querySelector");
if(!g){return b(j,k)}return k.querySelector(j)}},{"./internal/validate":374,"./shims/querySelector":384}],382:[function(b,c,a){b("ac-polyfills/Array/prototype.slice");
var h=b("./internal/validate");var g=b("./shims/querySelectorAll");var f=("querySelectorAll" in document);
c.exports=function d(j,k){k=k||document;h.parentNode(k,true,"querySelectorAll","context");
h.selector(j,true,"querySelectorAll");if(!f){return g(j,k)}return Array.prototype.slice.call(k.querySelectorAll(j))
}},{"./internal/validate":374,"./shims/querySelectorAll":385,"ac-polyfills/Array/prototype.slice":565}],383:[function(c,d,b){var f=c("../querySelectorAll");
d.exports=function a(l,g){var k=l.parentNode||document;var h=f(g,k);var j;for(j=0;
j<h.length;j++){if(h[j]===l){return true}}return false}},{"../querySelectorAll":382}],384:[function(b,c,a){var d=b("./querySelectorAll");
c.exports=function f(h,j){var g=d(h,j);return g.length?g[0]:null}},{"./querySelectorAll":385}],385:[function(c,b,f){c("ac-polyfills/Array/prototype.indexOf");
var k=c("ac-dom-nodes/isElement");var h=c("ac-dom-nodes/isDocumentFragment");var l=c("ac-dom-nodes/remove");
var d="_ac_qsa_";var j=function(o,m){var n;if(m===document){return true}n=o;while((n=n.parentNode)&&k(n)){if(n===m){return true
}}return false};var g=function(m){if("recalc" in m){m.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};b.exports=function a(m,o){var q=document.createElement();
var r=d+(Math.random()+"").slice(-6);var n=[];var p;o=o||document;document[r]=[];
q.innerHTML="x<style>*{display:recalc;}"+m+'{ac-qsa:expression(document["'+r+'"] && document["'+r+'"].push(this));}';
q=q.lastChild;if(h(o)){o.appendChild(q)}else{document.documentElement.firstChild.appendChild(q)
}g(o);while(document[r].length){p=document[r].shift();p.style.removeAttribute("ac-qsa");
if(n.indexOf(p)===-1&&j(p,o)){n.push(p)}}document[r]=null;l(q);g(o);return n}},{"ac-dom-nodes/isDocumentFragment":345,"ac-dom-nodes/isElement":347,"ac-dom-nodes/remove":351,"ac-polyfills/Array/prototype.indexOf":564}],386:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(k,h){var j=[];g.childNode(k,true,"siblings");
g.selector(h,false,"siblings");if(k.parentNode){j=c(k.parentNode,h);j=j.filter(function(l){return(l!==k)
})}return j}},{"./children":369,"./internal/validate":374}],387:[function(b,c,a){c.exports={createBezier:b("./ac-easing/createBezier"),createPredefined:b("./ac-easing/createPredefined"),createStep:b("./ac-easing/createStep"),Ease:b("./ac-easing/Ease")}
},{"./ac-easing/Ease":388,"./ac-easing/createBezier":389,"./ac-easing/createPredefined":390,"./ac-easing/createStep":391}],388:[function(b,c,a){var g="Ease expects an easing function.";
function f(j,h){if(typeof j!=="function"){throw new TypeError(g)}this.easingFunction=j;
this.cssString=h||null}var d=f.prototype;d.getValue=function(h){return this.easingFunction(h,0,1,1)
};c.exports=f},{}],389:[function(b,c,a){b("ac-polyfills/Array/prototype.every");
var f=b("./Ease");var h=b("./helpers/KeySpline");var d="Bezier curve expects exactly four (4) numbers. Given: ";
c.exports=function g(k,q,j,p){var r=Array.prototype.slice.call(arguments);var n=r.every(function(s){return(typeof s==="number")
});if(r.length!==4||!n){throw new TypeError(d+r)}var o=new h(k,q,j,p);var l=function(u,s,v,t){return o.get(u/t)*v+s
};var m="cubic-bezier("+r.join(", ")+")";return new f(l,m)}},{"./Ease":388,"./helpers/KeySpline":392,"ac-polyfills/Array/prototype.every":561}],390:[function(c,a,d){var j=c("./createStep");
var f=c("./helpers/cssAliases");var b=c("./helpers/easingFunctions");var h=c("./Ease");
var g='Easing function "%TYPE%" not recognized among the following: '+Object.keys(b).join(", ");
a.exports=function k(l){var m;if(l==="step-start"){return j(1,"start")}else{if(l==="step-end"){return j(1,"end")
}else{m=b[l]}}if(!m){throw new Error(g.replace("%TYPE%",l))}return new h(m,f[l])
}},{"./Ease":388,"./createStep":391,"./helpers/cssAliases":393,"./helpers/easingFunctions":394}],391:[function(d,f,c){var g=d("./Ease");
var b="Step function expects a numeric value greater than zero. Given: ";var a='Step function direction must be either "start" or "end" (default). Given: ';
f.exports=function h(j,m){m=m||"end";if(typeof j!=="number"||j<1){throw new TypeError(b+j)
}if(m!=="start"&&m!=="end"){throw new TypeError(a+m)}var l=function(r,n,s,q){var p=s/j;
var o=Math[(m==="start")?"floor":"ceil"](r/q*j);return n+p*o};var k="steps("+j+", "+m+")";
return new g(l,k)}},{"./Ease":388}],392:[function(b,c,a){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
function d(p,m,o,k){this.get=function(q){if(p===m&&o===k){return q
}return g(l(q),m,k)};function j(q,r){return 1-3*r+3*q}function h(q,r){return 3*r-6*q
}function f(q){return 3*q}function g(s,q,r){return((j(q,r)*s+h(q,r))*s+f(q))*s}function n(s,q,r){return 3*j(q,r)*s*s+2*h(q,r)*s+f(q)
}function l(t){var r=t;for(var s=0;s<4;++s){var u=n(r,p,o);if(u===0){return r}var q=g(r,p,o)-t;
r-=q/u}return r}}c.exports=d},{}],393:[function(c,d,b){var a={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
a.easeIn=a["ease-in"];a.easeOut=a["ease-out"];a.easeInOut=a["ease-in-out"];a.easeInCubic=a["ease-in-cubic"];
a.easeOutCubic=a["ease-out-cubic"];a.easeInOutCubic=a["ease-in-out-cubic"];a.easeInQuad=a["ease-in-quad"];
a.easeOutQuad=a["ease-out-quad"];a.easeInOutQuad=a["ease-in-out-quad"];a.easeInQuart=a["ease-in-quart"];
a.easeOutQuart=a["ease-out-quart"];a.easeInOutQuart=a["ease-in-out-quart"];a.easeInQuint=a["ease-in-quint"];
a.easeOutQuint=a["ease-out-quint"];a.easeInOutQuint=a["ease-in-out-quint"];a.easeInSine=a["ease-in-sine"];
a.easeOutSine=a["ease-out-sine"];a.easeInOutSine=a["ease-in-out-sine"];a.easeInExpo=a["ease-in-expo"];
a.easeOutExpo=a["ease-out-expo"];a.easeInOutExpo=a["ease-in-out-expo"];a.easeInCirc=a["ease-in-circ"];
a.easeOutCirc=a["ease-out-circ"];a.easeInOutCirc=a["ease-in-out-circ"];a.easeInBack=a["ease-in-back"];
a.easeOutBack=a["ease-out-back"];a.easeInOutBack=a["ease-in-out-back"];d.exports=a
},{}],394:[function(d,b,G){var K=d("../createBezier");var x=K(0.25,0.1,0.25,1).easingFunction;
var g=K(0.42,0,1,1).easingFunction;var D=K(0,0,0.58,1).easingFunction;var y=K(0.42,0,0.58,1).easingFunction;
var v=function(R,P,S,Q){return S*R/Q+P};var h=function(R,P,S,Q){return S*(R/=Q)*R+P
};var O=function(R,P,S,Q){return -S*(R/=Q)*(R-2)+P};var E=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R+P
}return -S/2*((--R)*(R-2)-1)+P};var j=function(R,P,S,Q){return S*(R/=Q)*R*R+P};
var a=function(R,P,S,Q){return S*((R=R/Q-1)*R*R+1)+P};var k=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R*R+P
}return S/2*((R-=2)*R*R+2)+P};var p=function(R,P,S,Q){return S*(R/=Q)*R*R*R+P};
var n=function(R,P,S,Q){return -S*((R=R/Q-1)*R*R*R-1)+P};var q=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R*R*R+P
}return -S/2*((R-=2)*R*R*R-2)+P};var z=function(R,P,S,Q){return S*(R/=Q)*R*R*R*R+P
};var w=function(R,P,S,Q){return S*((R=R/Q-1)*R*R*R*R+1)+P};var A=function(R,P,S,Q){if((R/=Q/2)<1){return S/2*R*R*R*R*R+P
}return S/2*((R-=2)*R*R*R*R+2)+P};var c=function(R,P,S,Q){return -S*Math.cos(R/Q*(Math.PI/2))+S+P
};var M=function(R,P,S,Q){return S*Math.sin(R/Q*(Math.PI/2))+P};var C=function(R,P,S,Q){return -S/2*(Math.cos(Math.PI*R/Q)-1)+P
};var H=function(R,P,S,Q){return(R===0)?P:S*Math.pow(2,10*(R/Q-1))+P};var B=function(R,P,S,Q){return(R===Q)?P+S:S*(-Math.pow(2,-10*R/Q)+1)+P
};var s=function(R,P,S,Q){if(R===0){return P}else{if(R===Q){return P+S}else{if((R/=Q/2)<1){return S/2*Math.pow(2,10*(R-1))+P
}}}return S/2*(-Math.pow(2,-10*--R)+2)+P};var m=function(R,P,S,Q){return -S*(Math.sqrt(1-(R/=Q)*R)-1)+P
};var f=function(R,P,S,Q){return S*Math.sqrt(1-(R=R/Q-1)*R)+P};var J=function(R,P,S,Q){if((R/=Q/2)<1){return -S/2*(Math.sqrt(1-R*R)-1)+P
}return S/2*(Math.sqrt(1-(R-=2)*R)+1)+P};var F=function(T,R,V,S){var P=1.70158;
var U=0;var Q=V;if(T===0){return R}else{if((T/=S)===1){return R+V}}if(!U){U=S*0.3
}if(Q<Math.abs(V)){Q=V;P=U/4}else{P=U/(2*Math.PI)*Math.asin(V/Q)}return -(Q*Math.pow(2,10*(T-=1))*Math.sin((T*S-P)*(2*Math.PI)/U))+R
};var I=function(T,R,V,S){var P=1.70158;var U=0;var Q=V;if(T===0){return R}else{if((T/=S)===1){return R+V
}}if(!U){U=S*0.3}if(Q<Math.abs(V)){Q=V;P=U/4}else{P=U/(2*Math.PI)*Math.asin(V/Q)
}return Q*Math.pow(2,-10*T)*Math.sin((T*S-P)*(2*Math.PI)/U)+V+R};var u=function(T,R,V,S){var P=1.70158;
var U=0;var Q=V;if(T===0){return R}else{if((T/=S/2)===2){return R+V}}if(!U){U=S*(0.3*1.5)
}if(Q<Math.abs(V)){Q=V;P=U/4}else{P=U/(2*Math.PI)*Math.asin(V/Q)}if(T<1){return -0.5*(Q*Math.pow(2,10*(T-=1))*Math.sin((T*S-P)*(2*Math.PI)/U))+R
}return Q*Math.pow(2,-10*(T-=1))*Math.sin((T*S-P)*(2*Math.PI)/U)*0.5+V+R};var t=function(S,Q,T,R,P){if(P===undefined){P=1.70158
}return T*(S/=R)*S*((P+1)*S-P)+Q};var r=function(S,Q,T,R,P){if(P===undefined){P=1.70158
}return T*((S=S/R-1)*S*((P+1)*S+P)+1)+Q};var l=function(S,Q,T,R,P){if(P===undefined){P=1.70158
}if((S/=R/2)<1){return T/2*(S*S*(((P*=(1.525))+1)*S-P))+Q}return T/2*((S-=2)*S*(((P*=(1.525))+1)*S+P)+2)+Q
};var L=function(R,P,S,Q){if((R/=Q)<(1/2.75)){return S*(7.5625*R*R)+P}else{if(R<(2/2.75)){return S*(7.5625*(R-=(1.5/2.75))*R+0.75)+P
}else{if(R<(2.5/2.75)){return S*(7.5625*(R-=(2.25/2.75))*R+0.9375)+P}}}return S*(7.5625*(R-=(2.625/2.75))*R+0.984375)+P
};var o=function(R,P,S,Q){return S-L(Q-R,0,S,Q)+P};var N=function(R,P,S,Q){if(R<Q/2){return o(R*2,0,S,Q)*0.5+P
}return L(R*2-Q,0,S,Q)*0.5+S*0.5+P};b.exports={linear:v,ease:x,easeIn:g,"ease-in":g,easeOut:D,"ease-out":D,easeInOut:y,"ease-in-out":y,easeInCubic:j,"ease-in-cubic":j,easeOutCubic:a,"ease-out-cubic":a,easeInOutCubic:k,"ease-in-out-cubic":k,easeInQuad:h,"ease-in-quad":h,easeOutQuad:O,"ease-out-quad":O,easeInOutQuad:E,"ease-in-out-quad":E,easeInQuart:p,"ease-in-quart":p,easeOutQuart:n,"ease-out-quart":n,easeInOutQuart:q,"ease-in-out-quart":q,easeInQuint:z,"ease-in-quint":z,easeOutQuint:w,"ease-out-quint":w,easeInOutQuint:A,"ease-in-out-quint":A,easeInSine:c,"ease-in-sine":c,easeOutSine:M,"ease-out-sine":M,easeInOutSine:C,"ease-in-out-sine":C,easeInExpo:H,"ease-in-expo":H,easeOutExpo:B,"ease-out-expo":B,easeInOutExpo:s,"ease-in-out-expo":s,easeInCirc:m,"ease-in-circ":m,easeOutCirc:f,"ease-out-circ":f,easeInOutCirc:J,"ease-in-out-circ":J,easeInBack:t,"ease-in-back":t,easeOutBack:r,"ease-out-back":r,easeInOutBack:l,"ease-in-out-back":l,easeInElastic:F,"ease-in-elastic":F,easeOutElastic:I,"ease-out-elastic":I,easeInOutElastic:u,"ease-in-out-elastic":u,easeInBounce:o,"ease-in-bounce":o,easeOutBounce:L,"ease-out-bounce":L,easeInOutBounce:N,"ease-in-out-bounce":N}
},{"../createBezier":389}],395:[function(b,c,a){arguments[4][142][0].apply(a,arguments)
},{dup:142}],396:[function(b,c,a){c.exports={clone:b("./ac-object/clone"),create:b("./ac-object/create"),defaults:b("./ac-object/defaults"),extend:b("./ac-object/extend"),getPrototypeOf:b("./ac-object/getPrototypeOf"),isDate:b("./ac-object/isDate"),isEmpty:b("./ac-object/isEmpty"),isRegExp:b("./ac-object/isRegExp"),toQueryParameters:b("./ac-object/toQueryParameters")}
},{"./ac-object/clone":397,"./ac-object/create":398,"./ac-object/defaults":399,"./ac-object/extend":400,"./ac-object/getPrototypeOf":401,"./ac-object/isDate":402,"./ac-object/isEmpty":403,"./ac-object/isRegExp":404,"./ac-object/toQueryParameters":405}],397:[function(b,c,a){var f=b("./extend");
c.exports=function d(g){return f({},g)}},{"./extend":400}],398:[function(b,d,a){var f=function(){};
d.exports=function c(g){if(arguments.length>1){throw new Error("Second argument not supported")
}if(g===null||typeof g!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(g)}else{f.prototype=g;
return new f()}}},{}],399:[function(b,c,a){var f=b("./extend");c.exports=function d(h,g){if(typeof h!=="object"){throw new TypeError("defaults: must provide a defaults object")
}g=g||{};if(typeof g!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return f({},h,g)}},{"./extend":400}],400:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]}else{h=[].slice.call(arguments)
}g=h.shift();h.forEach(function(k){if(k!=null){for(var j in k){if(a.call(k,j)){g[j]=k[j]
}}}});return g}},{}],401:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(j){if(Object.getPrototypeOf){return Object.getPrototypeOf(j)
}else{if(typeof j!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return j.__proto__}else{var g=j.constructor;
var h;if(a.call(j,"constructor")){h=g;if(!(delete j.constructor)){return null}g=j.constructor;
j.constructor=h}return g?g.prototype:null}}}}},{}],402:[function(b,d,a){d.exports=function c(f){return Object.prototype.toString.call(f)==="[object Date]"
}},{}],403:[function(c,d,b){var a=Object.prototype.hasOwnProperty;d.exports=function f(g){var h;
if(typeof g!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(h in g){if(a.call(g,h)){return false}}return true}},{}],404:[function(c,d,b){d.exports=function a(f){return window.RegExp?f instanceof RegExp:false
}},{}],405:[function(c,f,b){var a=c("qs");f.exports=function d(g){if(typeof g!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return a.stringify(g)}},{qs:395}],406:[function(b,d,a){var c=b("./ac-element-engagement/ElementEngagement");
d.exports=new c();d.exports.ElementEngagement=c},{"./ac-element-engagement/ElementEngagement":407}],407:[function(c,b,f){var g;
var d=c("ac-object");var h=c("ac-element-tracker").ElementTracker;var k={timeToEngage:500,inViewThreshold:0.75,stopOnEngaged:true};
var j={thresholdEnterTime:0,thresholdExitTime:0,inThreshold:false,engaged:false,tracking:true};
var a=function(){h.call(this)};g=a.prototype=d.create(h.prototype);g._decorateTrackedElement=function(m,l){var n;
n=d.defaults(k,l||{});d.extend(m,n);d.extend(m,j)};g._attachElementListeners=function(l){l.on("thresholdenter",this._thresholdEnter,this);
l.on("thresholdexit",this._thresholdExit,this);l.on("enterview",this._enterView,this);
l.on("exitview",this._exitView,this)};g._removeElementListeners=function(l){l.off("thresholdenter",this._thresholdEnter);
l.off("thresholdexit",this._thresholdExit);l.off("enterview",this._enterView);l.off("exitview",this._exitView)
};g._attachAllElementListeners=function(){this.elements.forEach(function(l){if(!l.stopOnEngaged){this._attachElementListeners(l)
}else{if(!l.engaged){this._attachElementListeners(l)}}},this)};g._removeAllElementListeners=function(){this.elements.forEach(function(l){this._removeElementListeners(l)
},this)};g._elementInViewPastThreshold=function(n){var l=this.windowDelegate.innerHeight();
var m=false;if(n.pixelsInView===l){m=true}else{m=(n.percentInView>n.inViewThreshold)
}return m};g._ifInView=function(l,n){var m=l.inThreshold;h.prototype._ifInView.apply(this,arguments);
if(!m&&this._elementInViewPastThreshold(l)){l.inThreshold=true;l.trigger("thresholdenter",l);
if(typeof l.timeToEngage==="number"&&l.timeToEngage>=0){l.engagedTimeout=window.setTimeout(this._engaged.bind(this,l),l.timeToEngage)
}}};g._ifAlreadyInView=function(l){var m=l.inThreshold;h.prototype._ifAlreadyInView.apply(this,arguments);
if(m&&!this._elementInViewPastThreshold(l)){l.inThreshold=false;l.trigger("thresholdexit",l);
if(l.engagedTimeout){window.clearTimeout(l.engagedTimeout);l.engagedTimeout=null
}}};g._engaged=function(l){l.engagedTimeout=null;this._elementEngaged(l);l.trigger("engaged",l);
this.trigger("engaged",l)};g._thresholdEnter=function(l){l.thresholdEnterTime=Date.now();
l.thresholdExitTime=0;this.trigger("thresholdenter",l)};g._thresholdExit=function(l){l.thresholdExitTime=Date.now();
this.trigger("thresholdexit",l)};g._enterView=function(l){this.trigger("enterview",l)
};g._exitView=function(l){this.trigger("exitview",l)};g._elementEngaged=function(l){l.engaged=true;
if(l.stopOnEngaged){this.stop(l)}};g.stop=function(l){if(this.tracking&&!l){this._removeAllElementListeners();
h.prototype.stop.call(this)}if(l&&l.tracking){l.tracking=false;this._removeElementListeners(l)
}};g.start=function(l){if(!l){this._attachAllElementListeners()}if(l&&!l.tracking){if(!l.stopOnEngaged){l.tracking=true;
this._attachElementListeners(l)}else{if(!l.engaged){l.tracking=true;this._attachElementListeners(l)
}}}if(!this.tracking){h.prototype.start.call(this)}else{this.refreshAllElementStates()
}};g.addElement=function(n,l){var m=h.prototype.addElement.call(this,n);this._decorateTrackedElement(m,l);
return m};g.addElements=function(m,l){[].forEach.call(m,function(n){this.addElement(n,l)
},this)};b.exports=a},{"ac-element-tracker":475,"ac-object":396}],408:[function(b,c,a){c.exports={flatten:b("./ac-array/flatten"),intersection:b("./ac-array/intersection"),toArray:b("./ac-array/toArray"),union:b("./ac-array/union"),unique:b("./ac-array/unique"),without:b("./ac-array/without")}
},{"./ac-array/flatten":409,"./ac-array/intersection":410,"./ac-array/toArray":411,"./ac-array/union":412,"./ac-array/unique":413,"./ac-array/without":414}],409:[function(b,c,a){c.exports=function d(h){var f=[];
var g=function(j){if(Array.isArray(j)){j.forEach(g)}else{f.push(j)}};h.forEach(g);
return f}},{}],410:[function(b,c,a){c.exports=function d(n){if(!n){return[]}var m=arguments.length;
var k=0;var g=n.length;var f=[];var l;for(k;k<g;k++){l=n[k];if(f.indexOf(l)>-1){continue
}for(var h=1;h<m;h++){if(arguments[h].indexOf(l)<0){break}}if(h===m){f.push(l)}}return f
}},{}],411:[function(b,d,a){d.exports=function c(f){return Array.prototype.slice.call(f)
}},{}],412:[function(b,c,a){var g=b("./flatten");var f=b("./unique");c.exports=function d(h){return f(g(Array.prototype.slice.call(arguments)))
}},{"./flatten":409,"./unique":413}],413:[function(b,c,a){c.exports=function d(g){var f=function(h,j){if(h.indexOf(j)<0){h.push(j)
}return h};return g.reduce(f,[])}},{}],414:[function(b,d,a){d.exports=function c(f,n,m){var k;
var h=f.indexOf(n);var l=f.length;if(h>=0){if(m){k=f.slice(0,l);var j,g=0;for(j=h;
j<l;j++){if(f[j]===n){k.splice(j-g,1);g++}}}else{if(h===(l-1)){k=f.slice(0,(l-1))
}else{if(h===0){k=f.slice(1)}else{k=f.slice(0,h);k=k.concat(f.slice(h+1))}}}}else{return f
}return k}},{}],415:[function(c,d,b){var a=c("./ac-dom-styles/vendorTransformHelper");
var f={};f.setStyle=function(h,j){var g;var k;var l;if((typeof j!=="string"&&typeof j!=="object")||Array.isArray(j)){throw new TypeError("styles argument must be either an object or a string")
}g=f.setStyle.__explodeStyleStringToObject(j);for(l in g){if(g.hasOwnProperty(l)){k=l.replace(/-(\w)/g,f.setStyle.__camelCaseReplace);
f.setStyle.__setStyle(h,k,g,g[l])}}return h};f.setStyle.__explodeStyleStringToObject=function(l){var j=(typeof l==="object")?l:{};
var m;var k;var g;var h;if(typeof l==="string"){m=l.split(";");g=m.length;for(h=0;
h<g;h+=1){k=m[h].indexOf(":");if(k>0){j[m[h].substr(0,k).trim()]=m[h].substr(k+1).trim()
}}}return j};f.setStyle.__setStyle=function(j,k,h,g){if(typeof j.style[k]!=="undefined"){j.style[k]=g
}};f.setStyle.__camelCaseReplace=function(h,j,k,g){return(k===0)&&(g.substr(1,3)!=="moz")?j:j.toUpperCase()
};f.getStyle=function(h,k,g){var j;k=k.replace(/-(\w)/g,f.setStyle.__camelCaseReplace);
k=(k==="float")?"cssFloat":k;g=g||window.getComputedStyle(h,null);j=g?g[k]:null;
if(k==="opacity"){return j?parseFloat(j):1}return j==="auto"?null:j};f.setVendorPrefixStyle=function(g,k,j){if(typeof k!=="string"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: property must be a string")
}if(typeof j!=="string"&&typeof j!=="number"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: value must be a string or a number")
}var h=["","webkit","Moz","ms","O"];var m;var l;j+="";k=k.replace(/-(webkit|moz|ms|o)-/i,"");
k=k.replace(/^(webkit|Moz|ms|O)/,"");k=k.charAt(0).toLowerCase()+k.slice(1);k=k.replace(/-(\w)/,function(n,o){return o.toUpperCase()
});j=j.replace(/-(webkit|moz|ms|o)-/,"-vendor-");h.forEach(function(n){m=(n==="")?k:n+k.charAt(0).toUpperCase()+k.slice(1);
l=(n==="")?j.replace("-vendor-",""):j.replace("-vendor-","-"+n.charAt(0).toLowerCase()+n.slice(1)+"-");
if(m in g.style){f.setStyle(g,m+":"+l)}})};f.getVendorPrefixStyle=function(h,k){if(typeof k!=="string"){throw new TypeError("ac-dom-styles.getVendorPrefixStyle: property must be a string")
}var j=["","webkit","Moz","ms","O"];var g;k=k.replace(/-(webkit|moz|ms|o)-/i,"");
k=k.replace(/^(webkit|Moz|ms|O)/,"").charAt(0).toLowerCase()+k.slice(1);k=k.replace(/-(\w)/,function(l,m){return m.toUpperCase()
});j.some(function(m,l){var n=(m==="")?k:m+k.charAt(0).toUpperCase()+k.slice(1);
if(n in h.style){g=f.getStyle(h,n);return true}});return g};f.setVendorPrefixTransform=function(g,h){if((typeof h!=="string"&&typeof h!=="object")||Array.isArray(h)||h===null){throw new TypeError("ac-dom-styles.setVendorPrefixTransform: transformFunctions argument must be either an object or a string")
}f.setVendorPrefixStyle(g,"transform",a.convert2dFunctions(h))};c("./ac-dom-styles/ie")(f);
d.exports=f},{"./ac-dom-styles/ie":416,"./ac-dom-styles/vendorTransformHelper":417}],416:[function(b,c,a){c.exports=function(d){if(typeof window.getComputedStyle!=="function"){d.getStyle=function(j,h,g){var f;
var k;g=g||j.currentStyle;if(g){h=h.replace(/-(\w)/g,d.setStyle.__camelCaseReplace);
h=h==="float"?"styleFloat":h;k=g[h]||null;return k==="auto"?null:k}}}}},{}],417:[function(c,d,b){var a={__objectifiedFunctions:{},__paramMaps:{translate:"p1, p2, 0",translateX:"p1, 0, 0",translateY:"0, p1, 0",scale:"p1, p2, 1",scaleX:"p1, 1, 1",scaleY:"1, p1, 1",rotate:"0, 0, 1, p1",matrix:"p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"},convert2dFunctions:function(g){var f;
this.__init(g);for(var h in this.__objectifiedFunctions){if(this.__objectifiedFunctions.hasOwnProperty(h)){f=this.__objectifiedFunctions[h].replace(" ","").split(",");
if(h in this.__paramMaps){for(var j in this.__paramMaps){if(h===j){this.valuesToSet.push(this.__stripFunctionAxis(h)+"3d("+this.__map2DTransformParams(f,this.__paramMaps[h])+")")
}}}else{this.valuesToSet.push(h+"("+this.__objectifiedFunctions[h]+")")}}}return this.valuesToSet.join(" ")
},__init:function(f){this.valuesToSet=[];this.__objectifiedFunctions=(typeof f==="object")?f:{};
if(typeof f==="string"){this.__objectifiedFunctions=this.__objectifyFunctionString(f)
}},__map2DTransformParams:function(f,g){f.forEach(function(j,h){g=g.replace("p"+(h+1),j)
});return g},__splitFunctionStringToArray:function(f){return f.match(/[\w]+\(.+?\)/g)
},__splitFunctionNameAndParams:function(f){return f.match(/(.*)\((.*)\)/)},__stripFunctionAxis:function(f){return f.match(/([a-z]+)(|X|Y)$/)[1]
},__objectifyFunctionString:function(f){var g=this;var h;this.__splitFunctionStringToArray(f).forEach(function(j){h=g.__splitFunctionNameAndParams(j);
g.__objectifiedFunctions[h[1]]=h[2]});return this.__objectifiedFunctions}};d.exports=a
},{}],418:[function(b,c,a){var g=b("ac-dom-styles");var h={};var f=function(){return{x:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}
};var d=function(){return{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}
};h.cumulativeOffset=function(k){var l=h.getBoundingBox(k);var j=f();var m=[l.top+j.y,l.left+j.x];
m.top=m[0];m.left=m[1];return m};h.getBoundingBox=function(l){var m=l.getBoundingClientRect();
var k=m.width||m.right-m.left;var j=m.height||m.bottom-m.top;return{top:m.top,right:m.right,bottom:m.bottom,left:m.left,width:k,height:j}
};h.getInnerDimensions=function(o){var p=h.getBoundingBox(o);var n=p.width;var j=p.height;
var m;var k;var l=window.getComputedStyle?window.getComputedStyle(o,null):null;
["padding","border"].forEach(function(q){["Top","Right","Bottom","Left"].forEach(function(r){m=q==="border"?q+r+"Width":q+r;
k=parseFloat(g.getStyle(o,m,l));k=isNaN(k)?0:k;if(r==="Right"||r==="Left"){n-=k
}if(r==="Top"||r==="Bottom"){j-=k}})});return{width:n,height:j}};h.getOuterDimensions=function(m){var o=h.getBoundingBox(m);
var l=o.width;var j=o.height;var n;var k=window.getComputedStyle?window.getComputedStyle(m,null):null;
["margin"].forEach(function(p){["Top","Right","Bottom","Left"].forEach(function(q){n=parseFloat(g.getStyle(m,p+q,k));
n=isNaN(n)?0:n;if(q==="Right"||q==="Left"){l+=n}if(q==="Top"||q==="Bottom"){j+=n
}})});return{width:l,height:j}};h.pixelsInViewport=function(l,k){var m;var n=d();
k=k||h.getBoundingBox(l);var j=k.top;if(j>=0){m=n.height-j;if(m>k.height){m=k.height
}}else{m=k.height+j}if(m<0){m=0}if(m>n.height){m=n.height}return m};h.percentInViewport=function(k){var j=h.getBoundingBox(k);
var l=h.pixelsInViewport(k,j);return l/j.height};h.isInViewport=function(l,k){var j=h.percentInViewport(l);
if(typeof k!=="number"||1<k||k<0){k=0}return(j>k||j===1)};b("./ac-dom-metrics/ie")(h);
c.exports=h},{"./ac-dom-metrics/ie":419,"ac-dom-styles":415}],419:[function(b,c,a){c.exports=function(d){if(!("getBoundingClientRect" in document.createElement("_"))){d.getBoundingBox=function(h){var k=h.offsetLeft;
var j=h.offsetTop;var g=h.offsetWidth;var f=h.offsetHeight;return{top:j,right:k+g,bottom:j+f,left:k,width:g,height:f}
}}}},{}],420:[function(b,c,a){arguments[4][279][0].apply(a,arguments)},{"./ac-event-emitter/EventEmitter":421,dup:279}],421:[function(b,c,a){arguments[4][280][0].apply(a,arguments)
},{dup:280}],422:[function(b,c,a){arguments[4][142][0].apply(a,arguments)},{dup:142}],423:[function(b,c,a){arguments[4][396][0].apply(a,arguments)
},{"./ac-object/clone":424,"./ac-object/create":425,"./ac-object/defaults":426,"./ac-object/extend":427,"./ac-object/getPrototypeOf":428,"./ac-object/isDate":429,"./ac-object/isEmpty":430,"./ac-object/isRegExp":431,"./ac-object/toQueryParameters":432,dup:396}],424:[function(b,c,a){arguments[4][397][0].apply(a,arguments)
},{"./extend":427,dup:397}],425:[function(b,c,a){arguments[4][398][0].apply(a,arguments)
},{dup:398}],426:[function(b,c,a){arguments[4][399][0].apply(a,arguments)},{"./extend":427,dup:399}],427:[function(b,c,a){arguments[4][400][0].apply(a,arguments)
},{dup:400}],428:[function(b,c,a){arguments[4][401][0].apply(a,arguments)},{dup:401}],429:[function(b,c,a){arguments[4][402][0].apply(a,arguments)
},{dup:402}],430:[function(b,c,a){arguments[4][403][0].apply(a,arguments)},{dup:403}],431:[function(b,c,a){arguments[4][404][0].apply(a,arguments)
},{dup:404}],432:[function(b,c,a){arguments[4][405][0].apply(a,arguments)},{dup:405,qs:422}],433:[function(b,d,a){var c={};
c.addEventListener=function(k,h,j,g){if(k.addEventListener){k.addEventListener(h,j,g)
}else{if(k.attachEvent){k.attachEvent("on"+h,j)}else{k["on"+h]=j}}return k};c.dispatchEvent=function(h,g){if(document.createEvent){h.dispatchEvent(new CustomEvent(g))
}else{h.fireEvent("on"+g,document.createEventObject())}return h};c.removeEventListener=function(k,h,j,g){if(k.removeEventListener){k.removeEventListener(h,j,g)
}else{k.detachEvent("on"+h,j)}return k};var f=/^(webkit|moz|ms|o)/i;c.addVendorPrefixEventListener=function(k,h,j,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}if(/WebKit/i.test(window.navigator.userAgent)){return c.addEventListener(k,"webkit"+h,j,g)
}else{if(/Opera/i.test(window.navigator.userAgent)){return c.addEventListener(k,"O"+h,j,g)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return c.addEventListener(k,h.toLowerCase(),j,g)
}else{h=h.charAt(0).toLowerCase()+h.slice(1);return c.addEventListener(k,h,j,g)
}}}};c.removeVendorPrefixEventListener=function(k,h,j,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}c.removeEventListener(k,"webkit"+h,j,g);
c.removeEventListener(k,"O"+h,j,g);c.removeEventListener(k,h.toLowerCase(),j,g);
h=h.charAt(0).toLowerCase()+h.slice(1);return c.removeEventListener(k,h,j,g)};c.stop=function(g){if(!g){g=window.event
}if(g.stopPropagation){g.stopPropagation()}else{g.cancelBubble=true}if(g.preventDefault){g.preventDefault()
}g.stopped=true;g.returnValue=false};c.target=function(g){return(typeof g.target!=="undefined")?g.target:g.srcElement
};d.exports=c},{}],434:[function(b,c,a){var d={querySelector:b("./ac-dom-traversal/querySelector"),querySelectorAll:b("./ac-dom-traversal/querySelectorAll"),ancestor:b("./ac-dom-traversal/ancestor"),ancestors:b("./ac-dom-traversal/ancestors"),children:b("./ac-dom-traversal/children"),firstChild:b("./ac-dom-traversal/firstChild"),lastChild:b("./ac-dom-traversal/lastChild"),siblings:b("./ac-dom-traversal/siblings"),nextSibling:b("./ac-dom-traversal/nextSibling"),nextSiblings:b("./ac-dom-traversal/nextSiblings"),previousSibling:b("./ac-dom-traversal/previousSibling"),previousSiblings:b("./ac-dom-traversal/previousSiblings"),filterBySelector:b("./ac-dom-traversal/filterBySelector"),matchesSelector:b("./ac-dom-traversal/matchesSelector")};
b("./ac-dom-traversal/shims/ie")(d);c.exports=d},{"./ac-dom-traversal/ancestor":435,"./ac-dom-traversal/ancestors":436,"./ac-dom-traversal/children":437,"./ac-dom-traversal/filterBySelector":438,"./ac-dom-traversal/firstChild":439,"./ac-dom-traversal/lastChild":442,"./ac-dom-traversal/matchesSelector":443,"./ac-dom-traversal/nextSibling":444,"./ac-dom-traversal/nextSiblings":445,"./ac-dom-traversal/previousSibling":446,"./ac-dom-traversal/previousSiblings":447,"./ac-dom-traversal/querySelector":448,"./ac-dom-traversal/querySelectorAll":449,"./ac-dom-traversal/shims/ie":450,"./ac-dom-traversal/siblings":451}],435:[function(d,g,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");g.exports=function f(k,j){h.childNode(k,true,"ancestors");
h.selector(j,false,"ancestors");if(k!==document.body){while((k=k.parentNode)&&a.isElement(k)){if(!j||b(k,j)){return k
}if(k===document.body){break}}}return null}},{"./helpers/validate":441,"./matchesSelector":443,"ac-dom-nodes":335}],436:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(l,j){var k=[];
h.childNode(l,true,"ancestors");h.selector(j,false,"ancestors");if(l!==document.body){while((l=l.parentNode)&&a.isElement(l)){if(!j||b(l,j)){k.push(l)
}if(l===document.body){break}}}return k}},{"./helpers/validate":441,"./matchesSelector":443,"ac-dom-nodes":335}],437:[function(d,g,c){var a=d("ac-dom-nodes");
var b=d("./filterBySelector");var h=d("./helpers/validate");g.exports=function f(l,j){var k;
h.parentNode(l,true,"children");h.selector(j,false,"children");k=l.children||l.childNodes;
k=a.filterByNodeType(k);if(j){k=b(k,j)}return k}},{"./filterBySelector":438,"./helpers/validate":441,"ac-dom-nodes":335}],438:[function(d,f,c){var b=d("./matchesSelector");
var g=d("./helpers/validate");f.exports=function a(j,h){g.selector(h,true,"filterBySelector");
j=Array.prototype.slice.call(j);return j.filter(function(k){return b(k,h)})}},{"./helpers/validate":441,"./matchesSelector":443}],439:[function(b,d,a){var c=b("./children");
var g=b("./helpers/validate");d.exports=function f(k,h){var j;g.parentNode(k,true,"firstChild");
g.selector(h,false,"firstChild");if(k.firstElementChild&&!h){return k.firstElementChild
}j=c(k,h);if(j.length){return j[0]}return null}},{"./children":437,"./helpers/validate":441}],440:[function(b,c,a){c.exports=window.Element?(function(d){return d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector
}(Element.prototype)):null},{}],441:[function(d,b,f){var k=d("ac-dom-nodes");var a=function(n,m){if(!k.isNode(n)){return false
}if(typeof m==="number"){return(n.nodeType===m)}return(m.indexOf(n.nodeType)!==-1)
};var h=[k.ELEMENT_NODE,k.DOCUMENT_NODE,k.DOCUMENT_FRAGMENT_NODE];var j=" must be an Element, Document, or Document Fragment";
var l=[k.ELEMENT_NODE,k.TEXT_NODE,k.COMMENT_NODE];var g=" must be an Element, TextNode, or Comment";
var c=" must be a string";b.exports={parentNode:function(m,p,o,n){n=n||"node";if((m||p)&&!a(m,h)){throw new TypeError(o+": "+n+j)
}},childNode:function(m,p,o,n){n=n||"node";if(!m&&!p){return}if(!a(m,l)){throw new TypeError(o+": "+n+g)
}},selector:function(m,p,o,n){n=n||"selector";if((m||p)&&typeof m!=="string"){throw new TypeError(o+": "+n+c)
}}}},{"ac-dom-nodes":335}],442:[function(b,d,a){var c=b("./children");var g=b("./helpers/validate");
d.exports=function f(k,h){var j;g.parentNode(k,true,"lastChild");g.selector(h,false,"lastChild");
if(k.lastElementChild&&!h){return k.lastElementChild}j=c(k,h);if(j.length){return j[j.length-1]
}return null}},{"./children":437,"./helpers/validate":441}],443:[function(f,g,d){var b=f("ac-dom-nodes");
var a=f("./helpers/nativeMatches");var h=f("./helpers/validate");g.exports=function c(k,j){h.selector(j,true,"matchesSelector");
return b.isElement(k)?a.call(k,j):false}},{"./helpers/nativeMatches":440,"./helpers/validate":441,"ac-dom-nodes":335}],444:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(k,j){h.childNode(k,true,"nextSibling");
h.selector(j,false,"nextSibling");if(k.nextElementSibling&&!j){return k.nextElementSibling
}while(k=k.nextSibling){if(a.isElement(k)){if(!j||b(k,j)){return k}}}return null
}},{"./helpers/validate":441,"./matchesSelector":443,"ac-dom-nodes":335}],445:[function(f,g,c){var a=f("ac-dom-nodes");
var b=f("./matchesSelector");var h=f("./helpers/validate");g.exports=function d(l,j){var k=[];
h.childNode(l,true,"nextSiblings");h.selector(j,false,"nextSiblings");while(l=l.nextSibling){if(a.isElement(l)){if(!j||b(l,j)){k.push(l)
}}}return k}},{"./helpers/validate":441,"./matchesSelector":443,"ac-dom-nodes":335}],446:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(k,j){h.childNode(k,true,"previousSibling");
h.selector(j,false,"previousSibling");if(k.previousElementSibling&&!j){return k.previousElementSibling
}while(k=k.previousSibling){if(a.isElement(k)){if(!j||b(k,j)){return k}}}return null
}},{"./helpers/validate":441,"./matchesSelector":443,"ac-dom-nodes":335}],447:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(l,j){var k=[];
h.childNode(l,true,"previousSiblings");h.selector(j,false,"previousSiblings");while(l=l.previousSibling){if(a.isElement(l)){if(!j||b(l,j)){k.push(l)
}}}return k.reverse()}},{"./helpers/validate":441,"./matchesSelector":443,"ac-dom-nodes":335}],448:[function(b,c,a){var f=b("./helpers/validate");
c.exports=function d(g,h){h=h||document;f.parentNode(h,true,"querySelector","context");
f.selector(g,true,"querySelector");return h.querySelector(g)}},{"./helpers/validate":441}],449:[function(b,c,a){var f=b("./helpers/validate");
c.exports=function d(g,h){h=h||document;f.parentNode(h,true,"querySelectorAll","context");
f.selector(g,true,"querySelectorAll");return Array.prototype.slice.call(h.querySelectorAll(g))
}},{"./helpers/validate":441}],450:[function(d,f,c){var g=d("../vendor/sizzle/sizzle");
var b=d("ac-dom-nodes");var a=d("../helpers/nativeMatches");var h=d("../helpers/validate");
f.exports=function(k,j){if(j||!("querySelectorAll" in document)){k.querySelectorAll=function(l,n){var m;
var o;n=n||document;h.parentNode(n,true,"querySelectorAll","context");h.selector(l,true,"querySelectorAll");
if(b.isDocumentFragment(n)){m=k.children(n);o=[];m.forEach(function(q){var p;if(g.matchesSelector(q,l)){o.push(q)
}p=g(l,q);if(p.length){o=o.concat(p)}});return o}return g(l,n)};k.querySelector=function(m,n){var l;
n=n||document;h.parentNode(n,true,"querySelector","context");h.selector(m,true,"querySelector");
l=k.querySelectorAll(m,n);return l.length?l[0]:null}}if(j||!a){k.matchesSelector=function(m,l){return g.matchesSelector(m,l)
}}}},{"../helpers/nativeMatches":440,"../helpers/validate":441,"../vendor/sizzle/sizzle":452,"ac-dom-nodes":335}],451:[function(b,d,a){var c=b("./children");
var g=b("./helpers/validate");d.exports=function f(k,h){var j=[];g.childNode(k,true,"siblings");
g.selector(h,false,"siblings");if(k.parentNode){j=c(k.parentNode,h);j=j.filter(function(l){return(l!==k)
})}return j}},{"./children":437,"./helpers/validate":441}],452:[function(b,c,a){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(ae,w){var aj,E,v,h,o,m=ae.document,p=m.documentElement,M="undefined",q=false,n=true,u=0,z=[].slice,ai=[].push,am=("sizcache"+Math.random()).replace(".",""),P="[\\x20\\t\\r\\n\\f]",y="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",x="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",ar="([*^$|!~]?=)",ab="\\["+P+"*("+y+"+)"+P+"*(?:"+ar+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+x+"+)|)|)"+P+"*\\]",at=":("+y+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",R=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",t=P+"*([\\x20\\t\\r\\n\\f>+~])"+P+"*",s="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+ab+"|"+at.replace(2,7)+"|[^\\\\(),])+",ak=new RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),V=new RegExp("^"+t),J=new RegExp(s+"?(?="+P+"*,|$)","g"),Z=new RegExp("^(?:(?!,)(?:(?:^|,)"+P+"*"+s+")*?|"+P+"*(.*?))(\\)|$)"),ap=new RegExp(s.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+t,"g"),aa=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,af=/[\x20\t\r\n\f]*[+~]/,an=/:not\($/,F=/h\d/i,ac=/input|select|textarea|button/i,I=/\\(?!\\)/g,U={ID:new RegExp("^#("+y+"+)"),CLASS:new RegExp("^\\.("+y+"+)"),NAME:new RegExp("^\\[name=['\"]?("+y+"+)['\"]?\\]"),TAG:new RegExp("^("+y.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+ab),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),POS:new RegExp(R,"ig"),needsContext:new RegExp("^"+P+"*[>+~]|"+R,"i")},ah={},G=[],B={},K=[],ao=function(au){au.sizzleFilter=true;
return au},j=function(au){return function(av){return av.nodeName.toLowerCase()==="input"&&av.type===au
}},H=function(au){return function(aw){var av=aw.nodeName.toLowerCase();return(av==="input"||av==="button")&&aw.type===au
}},X=function(au){var av=false,ax=m.createElement("div");try{av=au(ax)}catch(aw){}ax=null;
return av},D=X(function(av){av.innerHTML="<select></select>";var au=typeof av.lastChild.getAttribute("multiple");
return au!=="boolean"&&au!=="string"}),f=X(function(av){av.id=am+0;av.innerHTML="<a name='"+am+"'></a><div name='"+am+"'></div>";
p.insertBefore(av,p.firstChild);var au=m.getElementsByName&&m.getElementsByName(am).length===2+m.getElementsByName(am+0).length;
o=!m.getElementById(am);p.removeChild(av);return au}),l=X(function(au){au.appendChild(m.createComment(""));
return au.getElementsByTagName("*").length===0}),T=X(function(au){au.innerHTML="<a href='#'></a>";
return au.firstChild&&typeof au.firstChild.getAttribute!==M&&au.firstChild.getAttribute("href")==="#"
}),S=X(function(au){au.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!au.getElementsByClassName||au.getElementsByClassName("e").length===0){return false
}au.lastChild.className="e";return au.getElementsByClassName("e").length!==1});
var ad=function(ax,au,az,aC){az=az||[];au=au||m;var aA,av,aB,aw,ay=au.nodeType;
if(ay!==1&&ay!==9){return[]}if(!ax||typeof ax!=="string"){return az}aB=A(au);if(!aB&&!aC){if((aA=aa.exec(ax))){if((aw=aA[1])){if(ay===9){av=au.getElementById(aw);
if(av&&av.parentNode){if(av.id===aw){az.push(av);return az}}else{return az}}else{if(au.ownerDocument&&(av=au.ownerDocument.getElementById(aw))&&Q(au,av)&&av.id===aw){az.push(av);
return az}}}else{if(aA[2]){ai.apply(az,z.call(au.getElementsByTagName(ax),0));return az
}else{if((aw=aA[3])&&S&&au.getElementsByClassName){ai.apply(az,z.call(au.getElementsByClassName(aw),0));
return az}}}}}return al(ax,au,az,aC,aB)};var W=ad.selectors={cacheLength:50,match:U,order:["ID","TAG"],attrHandle:{},createPseudo:ao,find:{ID:o?function(ax,aw,av){if(typeof aw.getElementById!==M&&!av){var au=aw.getElementById(ax);
return au&&au.parentNode?[au]:[]}}:function(ax,aw,av){if(typeof aw.getElementById!==M&&!av){var au=aw.getElementById(ax);
return au?au.id===ax||typeof au.getAttributeNode!==M&&au.getAttributeNode("id").value===ax?[au]:w:[]
}},TAG:l?function(au,av){if(typeof av.getElementsByTagName!==M){return av.getElementsByTagName(au)
}}:function(au,ay){var ax=ay.getElementsByTagName(au);if(au==="*"){var az,aw=[],av=0;
for(;(az=ax[av]);av++){if(az.nodeType===1){aw.push(az)}}return aw}return ax}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(au){au[1]=au[1].replace(I,"");
au[3]=(au[4]||au[5]||"").replace(I,"");if(au[2]==="~="){au[3]=" "+au[3]+" "}return au.slice(0,4)
},CHILD:function(au){au[1]=au[1].toLowerCase();if(au[1]==="nth"){if(!au[2]){ad.error(au[0])
}au[3]=+(au[3]?au[4]+(au[5]||1):2*(au[2]==="even"||au[2]==="odd"));au[4]=+((au[6]+au[7])||au[2]==="odd")
}else{if(au[2]){ad.error(au[0])}}return au},PSEUDO:function(au){var av,aw=au[4];
if(U.CHILD.test(au[0])){return null}if(aw&&(av=Z.exec(aw))&&av.pop()){au[0]=au[0].slice(0,av[0].length-aw.length-1);
aw=av[0].slice(0,-1)}au.splice(2,3,aw||au[3]);return au}},filter:{ID:o?function(au){au=au.replace(I,"");
return function(av){return av.getAttribute("id")===au}}:function(au){au=au.replace(I,"");
return function(aw){var av=typeof aw.getAttributeNode!==M&&aw.getAttributeNode("id");
return av&&av.value===au}},TAG:function(au){if(au==="*"){return function(){return true
}}au=au.replace(I,"").toLowerCase();return function(av){return av.nodeName&&av.nodeName.toLowerCase()===au
}},CLASS:function(au){var av=ah[au];if(!av){av=ah[au]=new RegExp("(^|"+P+")"+au+"("+P+"|$)");
G.push(au);if(G.length>W.cacheLength){delete ah[G.shift()]}}return function(aw){return av.test(aw.className||(typeof aw.getAttribute!==M&&aw.getAttribute("class"))||"")
}},ATTR:function(aw,av,au){if(!av){return function(ax){return ad.attr(ax,aw)!=null
}}return function(ay){var ax=ad.attr(ay,aw),az=ax+"";if(ax==null){return av==="!="
}switch(av){case"=":return az===au;case"!=":return az!==au;case"^=":return au&&az.indexOf(au)===0;
case"*=":return au&&az.indexOf(au)>-1;case"$=":return au&&az.substr(az.length-au.length)===au;
case"~=":return(" "+az+" ").indexOf(au)>-1;case"|=":return az===au||az.substr(0,au.length+1)===au+"-"
}}},CHILD:function(av,ax,ay,aw){if(av==="nth"){var au=u++;return function(aC){var az,aD,aB=0,aA=aC;
if(ay===1&&aw===0){return true}az=aC.parentNode;if(az&&(az[am]!==au||!aC.sizset)){for(aA=az.firstChild;
aA;aA=aA.nextSibling){if(aA.nodeType===1){aA.sizset=++aB;if(aA===aC){break}}}az[am]=au
}aD=aC.sizset-aw;if(ay===0){return aD===0}else{return(aD%ay===0&&aD/ay>=0)}}}return function(aA){var az=aA;
switch(av){case"only":case"first":while((az=az.previousSibling)){if(az.nodeType===1){return false
}}if(av==="first"){return true}az=aA;case"last":while((az=az.nextSibling)){if(az.nodeType===1){return false
}}return true}}},PSEUDO:function(ay,ax,av,au){var aw=W.pseudos[ay]||W.pseudos[ay.toLowerCase()];
if(!aw){ad.error("unsupported pseudo: "+ay)}if(!aw.sizzleFilter){return aw}return aw(ax,av,au)
}},pseudos:{not:ao(function(au,aw,av){var ax=r(au.replace(ak,"$1"),aw,av);return function(ay){return !ax(ay)
}}),enabled:function(au){return au.disabled===false},disabled:function(au){return au.disabled===true
},checked:function(au){var av=au.nodeName.toLowerCase();return(av==="input"&&!!au.checked)||(av==="option"&&!!au.selected)
},selected:function(au){if(au.parentNode){au.parentNode.selectedIndex}return au.selected===true
},parent:function(au){return !!au.firstChild},empty:function(au){return !au.firstChild
},contains:ao(function(au){return function(av){return(av.textContent||av.innerText||d(av)).indexOf(au)>-1
}}),has:ao(function(au){return function(av){return ad(au,av).length>0}}),header:function(au){return F.test(au.nodeName)
},text:function(aw){var av,au;return aw.nodeName.toLowerCase()==="input"&&(av=aw.type)==="text"&&((au=aw.getAttribute("type"))==null||au.toLowerCase()===av)
},radio:j("radio"),checkbox:j("checkbox"),file:j("file"),password:j("password"),image:j("image"),submit:H("submit"),reset:H("reset"),button:function(av){var au=av.nodeName.toLowerCase();
return au==="input"&&av.type==="button"||au==="button"},input:function(au){return ac.test(au.nodeName)
},focus:function(au){var av=au.ownerDocument;return au===av.activeElement&&(!av.hasFocus||av.hasFocus())&&!!(au.type||au.href)
},active:function(au){return au===au.ownerDocument.activeElement}},setFilters:{first:function(aw,av,au){return au?aw.slice(1):[aw[0]]
},last:function(ax,aw,av){var au=ax.pop();return av?ax:[au]},even:function(az,ay,ax){var aw=[],av=ax?1:0,au=az.length;
for(;av<au;av=av+2){aw.push(az[av])}return aw},odd:function(az,ay,ax){var aw=[],av=ax?0:1,au=az.length;
for(;av<au;av=av+2){aw.push(az[av])}return aw},lt:function(aw,av,au){return au?aw.slice(+av):aw.slice(0,+av)
},gt:function(aw,av,au){return au?aw.slice(0,+av+1):aw.slice(+av+1)},eq:function(ax,aw,av){var au=ax.splice(+aw,1);
return av?ax:au}}};W.setFilters.nth=W.setFilters.eq;W.filters=W.pseudos;if(!T){W.attrHandle={href:function(au){return au.getAttribute("href",2)
},type:function(au){return au.getAttribute("type")}}}if(f){W.order.push("NAME");
W.find.NAME=function(au,av){if(typeof av.getElementsByName!==M){return av.getElementsByName(au)
}}}if(S){W.order.splice(1,0,"CLASS");W.find.CLASS=function(aw,av,au){if(typeof av.getElementsByClassName!==M&&!au){return av.getElementsByClassName(aw)
}}}try{z.call(p.childNodes,0)[0].nodeType}catch(aq){z=function(av){var aw,au=[];
for(;(aw=this[av]);av++){au.push(aw)}return au}}var A=ad.isXML=function(au){var av=au&&(au.ownerDocument||au).documentElement;
return av?av.nodeName!=="HTML":false};var Q=ad.contains=p.compareDocumentPosition?function(av,au){return !!(av.compareDocumentPosition(au)&16)
}:p.contains?function(av,au){var ax=av.nodeType===9?av.documentElement:av,aw=au.parentNode;
return av===aw||!!(aw&&aw.nodeType===1&&ax.contains&&ax.contains(aw))}:function(av,au){while((au=au.parentNode)){if(au===av){return true
}}return false};var d=ad.getText=function(ay){var ax,av="",aw=0,au=ay.nodeType;
if(au){if(au===1||au===9||au===11){if(typeof ay.textContent==="string"){return ay.textContent
}else{for(ay=ay.firstChild;ay;ay=ay.nextSibling){av+=d(ay)}}}else{if(au===3||au===4){return ay.nodeValue
}}}else{for(;(ax=ay[aw]);aw++){av+=d(ax)}}return av};ad.attr=function(ax,aw){var au,av=A(ax);
if(!av){aw=aw.toLowerCase()}if(W.attrHandle[aw]){return W.attrHandle[aw](ax)}if(D||av){return ax.getAttribute(aw)
}au=ax.getAttributeNode(aw);return au?typeof ax[aw]==="boolean"?ax[aw]?aw:null:au.specified?au.value:null:null
};ad.error=function(au){throw new Error("Syntax error, unrecognized expression: "+au)
};[0,0].sort(function(){return(n=0)});if(p.compareDocumentPosition){v=function(av,au){if(av===au){q=true;
return 0}return(!av.compareDocumentPosition||!au.compareDocumentPosition?av.compareDocumentPosition:av.compareDocumentPosition(au)&4)?-1:1
}}else{v=function(aC,aB){if(aC===aB){q=true;return 0}else{if(aC.sourceIndex&&aB.sourceIndex){return aC.sourceIndex-aB.sourceIndex
}}var az,av,aw=[],au=[],ay=aC.parentNode,aA=aB.parentNode,aD=ay;if(ay===aA){return h(aC,aB)
}else{if(!ay){return -1}else{if(!aA){return 1}}}while(aD){aw.unshift(aD);aD=aD.parentNode
}aD=aA;while(aD){au.unshift(aD);aD=aD.parentNode}az=aw.length;av=au.length;for(var ax=0;
ax<az&&ax<av;ax++){if(aw[ax]!==au[ax]){return h(aw[ax],au[ax])}}return ax===az?h(aC,au[ax],-1):h(aw[ax],aB,1)
};h=function(av,au,aw){if(av===au){return aw}var ax=av.nextSibling;while(ax){if(ax===au){return -1
}ax=ax.nextSibling}return 1}}ad.uniqueSort=function(av){var aw,au=1;if(v){q=n;av.sort(v);
if(q){for(;(aw=av[au]);au++){if(aw===av[au-1]){av.splice(au--,1)}}}}return av};
function C(av,az,ay,aw){var ax=0,au=az.length;for(;ax<au;ax++){ad(av,az[ax],ay,aw)
}}function Y(au,aw,aA,aB,av,az){var ax,ay=W.setFilters[aw.toLowerCase()];if(!ay){ad.error(aw)
}if(au||!(ax=av)){C(au||"*",aB,(ax=[]),av)}return ax.length>0?ay(ax,aA,az):[]}function ag(aE,au,aC,aw,aI){var az,av,ay,aK,aB,aJ,aD,aH,aF=0,aG=aI.length,ax=U.POS,aA=new RegExp("^"+ax.source+"(?!"+P+")","i"),aL=function(){var aN=1,aM=arguments.length-2;
for(;aN<aM;aN++){if(arguments[aN]===w){az[aN]=w}}};for(;aF<aG;aF++){ax.exec("");
aE=aI[aF];aK=[];ay=0;aB=aw;while((az=ax.exec(aE))){aH=ax.lastIndex=az.index+az[0].length;
if(aH>ay){aD=aE.slice(ay,az.index);ay=aH;aJ=[au];if(V.test(aD)){if(aB){aJ=aB}aB=aw
}if((av=an.test(aD))){aD=aD.slice(0,-5).replace(V,"$&*")}if(az.length>1){az[0].replace(aA,aL)
}aB=Y(aD,az[1],az[2],aJ,aB,av)}}if(aB){aK=aK.concat(aB);if((aD=aE.slice(ay))&&aD!==")"){C(aD,aK,aC,aw)
}else{ai.apply(aC,aK)}}else{ad(aE,au,aC,aw)}}return aG===1?aC:ad.uniqueSort(aC)
}function g(aA,aw,aD){var aF,aE,aG,ay=[],aB=0,aC=Z.exec(aA),av=!aC.pop()&&!aC.pop(),aH=av&&aA.match(J)||[""],au=W.preFilter,ax=W.filter,az=!aD&&aw!==m;
for(;(aE=aH[aB])!=null&&av;aB++){ay.push(aF=[]);if(az){aE=" "+aE}while(aE){av=false;
if((aC=V.exec(aE))){aE=aE.slice(aC[0].length);av=aF.push({part:aC.pop().replace(ak," "),captures:aC})
}for(aG in ax){if((aC=U[aG].exec(aE))&&(!au[aG]||(aC=au[aG](aC,aw,aD)))){aE=aE.slice(aC.shift().length);
av=aF.push({part:aG,captures:aC})}}if(!av){break}}}if(!av){ad.error(aA)}return ay
}function N(ay,ax,aw){var au=ax.dir,av=u++;if(!ay){ay=function(az){return az===aw
}}return ax.first?function(aA,az){while((aA=aA[au])){if(aA.nodeType===1){return ay(aA,az)&&aA
}}}:function(aB,aA){var az,aC=av+"."+E,aD=aC+"."+aj;while((aB=aB[au])){if(aB.nodeType===1){if((az=aB[am])===aD){return false
}else{if(typeof az==="string"&&az.indexOf(aC)===0){if(aB.sizset){return aB}}else{aB[am]=aD;
if(ay(aB,aA)){aB.sizset=true;return aB}aB.sizset=false}}}}}}function L(au,av){return au?function(ay,ax){var aw=av(ay,ax);
return aw&&au(aw===true?ay:aw,ax)}:av}function O(az,ax,au){var aw,ay,av=0;for(;
(aw=az[av]);av++){if(W.relative[aw.part]){ay=N(ay,W.relative[aw.part],ax)}else{aw.captures.push(ax,au);
ay=L(ay,W.filter[aw.part].apply(null,aw.captures))}}return ay}function k(au){return function(ax,aw){var ay,av=0;
for(;(ay=au[av]);av++){if(ay(ax,aw)){return true}}return false}}var r=ad.compile=function(au,ax,av){var aA,az,aw,ay=B[au];
if(ay&&ay.context===ax){ay.dirruns++;return ay}az=g(au,ax,av);for(aw=0;(aA=az[aw]);
aw++){az[aw]=O(aA,ax,av)}ay=B[au]=k(az);ay.context=ax;ay.runs=ay.dirruns=0;K.push(au);
if(K.length>W.cacheLength){delete B[K.shift()]}return ay};ad.matches=function(av,au){return ad(av,null,null,au)
};ad.matchesSelector=function(au,av){return ad(av,null,null,[au]).length>0};var al=function(ay,av,aA,aE,aD){ay=ay.replace(ak,"$1");
var au,aF,aB,aG,aw,ax,aI,aJ,az,aC=ay.match(J),aH=ay.match(ap),aK=av.nodeType;if(U.POS.test(ay)){return ag(ay,av,aA,aE,aC)
}if(aE){au=z.call(aE,0)}else{if(aC&&aC.length===1){if(aH.length>1&&aK===9&&!aD&&(aC=U.ID.exec(aH[0]))){av=W.find.ID(aC[1],av,aD)[0];
if(!av){return aA}ay=ay.slice(aH.shift().length)}aJ=((aC=af.exec(aH[0]))&&!aC.index&&av.parentNode)||av;
az=aH.pop();ax=az.split(":not")[0];for(aB=0,aG=W.order.length;aB<aG;aB++){aI=W.order[aB];
if((aC=U[aI].exec(ax))){au=W.find[aI]((aC[1]||"").replace(I,""),aJ,aD);if(au==null){continue
}if(ax===az){ay=ay.slice(0,ay.length-az.length)+ax.replace(U[aI],"");if(!ay){ai.apply(aA,z.call(au,0))
}}break}}}}if(ay){aF=r(ay,av,aD);E=aF.dirruns;if(au==null){au=W.find.TAG("*",(af.test(ay)&&av.parentNode)||av)
}for(aB=0;(aw=au[aB]);aB++){aj=aF.runs++;if(aF(aw,av)){aA.push(aw)}}}return aA};
if(m.querySelectorAll){(function(){var az,aA=al,ay=/'|\\/g,aw=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,av=[],au=[":active"],ax=p.matchesSelector||p.mozMatchesSelector||p.webkitMatchesSelector||p.oMatchesSelector||p.msMatchesSelector;
X(function(aB){aB.innerHTML="<select><option selected></option></select>";if(!aB.querySelectorAll("[selected]").length){av.push("\\["+P+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!aB.querySelectorAll(":checked").length){av.push(":checked")}});X(function(aB){aB.innerHTML="<p test=''></p>";
if(aB.querySelectorAll("[test^='']").length){av.push("[*^$]="+P+"*(?:\"\"|'')")
}aB.innerHTML="<input type='hidden'>";if(!aB.querySelectorAll(":enabled").length){av.push(":enabled",":disabled")
}});av=av.length&&new RegExp(av.join("|"));al=function(aG,aC,aH,aJ,aI){if(!aJ&&!aI&&(!av||!av.test(aG))){if(aC.nodeType===9){try{ai.apply(aH,z.call(aC.querySelectorAll(aG),0));
return aH}catch(aF){}}else{if(aC.nodeType===1&&aC.nodeName.toLowerCase()!=="object"){var aE=aC.getAttribute("id"),aB=aE||am,aD=af.test(aG)&&aC.parentNode||aC;
if(aE){aB=aB.replace(ay,"\\$&")}else{aC.setAttribute("id",aB)}try{ai.apply(aH,z.call(aD.querySelectorAll(aG.replace(J,"[id='"+aB+"'] $&")),0));
return aH}catch(aF){}finally{if(!aE){aC.removeAttribute("id")}}}}}return aA(aG,aC,aH,aJ,aI)
};if(ax){X(function(aC){az=ax.call(aC,"div");try{ax.call(aC,"[test!='']:sizzle");
au.push(W.match.PSEUDO)}catch(aB){}});au=new RegExp(au.join("|"));ad.matchesSelector=function(aC,aE){aE=aE.replace(aw,"='$1']");
if(!A(aC)&&!au.test(aE)&&(!av||!av.test(aE))){try{var aB=ax.call(aC,aE);if(aB||az||aC.document&&aC.document.nodeType!==11){return aB
}}catch(aD){}}return ad(aE,null,null,[aC]).length>0}}})()}if(typeof c==="object"&&c.exports){c.exports=ad
}else{ae.Sizzle=ad}})(window)},{}],453:[function(b,c,a){c.exports={DOMEmitter:b("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":454}],454:[function(c,b,d){var f;var k=c("ac-event-emitter").EventEmitter,g=c("ac-dom-events"),a=c("ac-dom-traversal");
var j="dom-emitter";function h(l){if(l===null){return}this.el=l;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new k()}f=h.prototype;f._parseEventNames=function(l){if(!l){return[l]
}return l.split(" ")};f._onListenerEvent=function(m,l){this.trigger(m,l,false)};
f._setListener=function(l){this._bindings[l]=this._onListenerEvent.bind(this,l);
g.addEventListener(this.el,l,this._bindings[l])};f._removeListener=function(l){g.removeEventListener(this.el,l,this._bindings[l]);
this._bindings[l]=null};f._triggerInternalEvent=function(l,m){this.trigger(j+":"+l,m)
};f._normalizeArgumentsAndCall=function(l,n){var r={};if(l.length===0){n.call(this,r);
return}if(typeof l[0]==="string"||l[0]===null){l=this._cleanStringData(l);r.events=l[0];
if(typeof l[1]==="string"){r.delegateQuery=l[1];r.callback=l[2];r.context=l[3]}else{r.callback=l[1];
r.context=l[2]}n.call(this,r);return}var m,p,q=":",o=l[0];for(m in o){if(o.hasOwnProperty(m)){r={};
p=this._cleanStringData(m.split(q));r.events=p[0];r.delegateQuery=p[1];r.callback=o[m];
r.context=l[1];n.call(this,r)}}};f._registerDelegateFunc=function(n,p,q,l,o){var m=this._delegateFunc.bind(this,n,p,q,o);
this._delegateFuncs[p]=this._delegateFuncs[p]||{};this._delegateFuncs[p][n]=this._delegateFuncs[p][n]||[];
this._delegateFuncs[p][n].push({func:l,context:o,delegateFunc:m});return m};f._cleanStringData=function(o){var n=false;
if(typeof o==="string"){o=[o];n=true}var m=[],q,s,r,p,l=o.length;for(q=0;q<l;q++){s=o[q];
if(typeof s==="string"){if(s===""||s===" "){continue}r=s.length;while(s[0]===" "){s=s.slice(1,r);
r--}while(s[r-1]===" "){s=s.slice(0,r-1);r--}}m.push(s)}if(n){return m[0]}return m
};f._unregisterDelegateFunc=function(n,q,l,p){if(!this._delegateFuncs[q]||!this._delegateFuncs[q][n]){return
}var o=this._getDelegateFuncBindingIdx(n,q,l,p),m;if(o>-1){m=this._delegateFuncs[q][n][o].delegateFunc;
this._delegateFuncs[q][n].splice(o,1);if(this._delegateFuncs[q][n].length===0){this._delegateFuncs[q][n]=null
}}return m};f._unregisterDelegateFuncs=function(l,n){if(!this._delegateFuncs[n]){return
}if(l!==null&&!this._delegateFuncs[n][l]){return}if(l===null){var m;for(m in this._delegateFuncs[n]){if(this._delegateFuncs[n].hasOwnProperty(m)){this._unbindDelegateFunc(m,n)
}}return}this._unbindDelegateFunc(l,n)};f._unbindDelegateFunc=function(l,n){var o,p,m=0;
while(this._delegateFuncs[n][l]&&this._delegateFuncs[n][l][m]){o=this._delegateFuncs[n][l][m];
p=this._delegateFuncs[n][l][m].length;this._off({events:l,delegateQuery:n,callback:o.func,context:o.context});
if(this._delegateFuncs[n][l]&&p===this._delegateFuncs[n][l].length){m++}}o=p=null
};f._unregisterDelegateFuncsByEvent=function(l){var m;for(m in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(m)){this._unregisterDelegateFuncs(l,m)
}}};f._delegateFunc=function(l,p,r,n,q){if(a.matchesSelector(g.target(q),p)){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
n=n||window;if(typeof q.detail==="object"){o[0]=q.detail}r.call(n,o)}};f.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};f.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};f.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};f._on=function(p){var m=p.events,q=p.callback,o=p.delegateQuery,n=p.context,l=p.unboundCallback||q;
m=this._parseEventNames(m);m.forEach(function(v,r,t,u,s){if(!this.has(s)){this._setListener(s)
}if(typeof u==="string"){v=this._registerDelegateFunc(s,u,v,r,t)}this._triggerInternalEvent("willon",{evt:s,callback:v,context:t,delegateQuery:u});
this._eventEmitter.on(s,v,t);this._triggerInternalEvent("didon",{evt:s,callback:v,context:t,delegateQuery:u})
}.bind(this,q,l,n,o));m=q=l=o=n=null};f._off=function(q){var m=q.events,r=q.callback,p=q.delegateQuery,o=q.context,l=q.unboundCallback||r;
if(typeof m==="undefined"){this._eventEmitter.off();var n;for(n in this._bindings){if(this._bindings.hasOwnProperty(n)){this._removeListener(n)
}}for(n in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(n)){this._delegateFuncs[n]=null
}}return}m=this._parseEventNames(m);m.forEach(function(w,s,u,v,t){if(typeof v==="string"&&typeof s==="function"){w=this._unregisterDelegateFunc(t,v,s,u);
if(!w){return}}if(typeof v==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncs(t,v);
return}if(typeof t==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncsByEvent(t);
if(typeof v==="string"){return}}this._triggerInternalEvent("willoff",{evt:t,callback:w,context:u,delegateQuery:v});
this._eventEmitter.off(t,w,u);this._triggerInternalEvent("didoff",{evt:t,callback:w,context:u,delegateQuery:v});
if(!this.has(t)){this._removeListener(t)}}.bind(this,r,l,o,p));m=r=l=p=o=null};
f._once=function(o){var l=o.events,p=o.callback,n=o.delegateQuery,m=o.context;l=this._parseEventNames(l);
l.forEach(function(t,r,s,q){if(typeof s==="string"){return this._handleDelegateOnce(q,t,r,s)
}if(!this.has(q)){this._setListener(q)}this._triggerInternalEvent("willonce",{evt:q,callback:t,context:r,delegateQuery:s});
this._eventEmitter.once.call(this,q,t,r);this._triggerInternalEvent("didonce",{evt:q,callback:t,context:r,delegateQuery:s})
}.bind(this,p,m,n));l=p=n=m=null};f._handleDelegateOnce=function(l,o,m,n){this._triggerInternalEvent("willonce",{evt:l,callback:o,context:m,delegateQuery:n});
this._on({events:l,context:m,delegateQuery:n,callback:this._getDelegateOnceCallback.bind(this,l,o,m,n),unboundCallback:o});
this._triggerInternalEvent("didonce",{evt:l,callback:o,context:m,delegateQuery:n});
return this};f._getDelegateOnceCallback=function(l,q,n,p){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
q.apply(n,o);this._off({events:l,delegateQuery:p,callback:q,context:n})};f._getDelegateFuncBindingIdx=function(s,p,n,l,t){var r=-1;
if(this._delegateFuncs[p]&&this._delegateFuncs[p][s]){var o,m,q=this._delegateFuncs[p][s].length;
for(o=0;o<q;o++){m=this._delegateFuncs[p][s][o];if(t&&typeof n==="undefined"){n=m.func
}if(m.func===n&&m.context===l){r=o;break}}}return r};f._triggerDelegateEvents=function(o,q,r){var n=a.querySelectorAll(q,this.el);
var p,s,l=n.length;for(p=0;p<l;p++){s=n[p];if(document.createEvent){s.dispatchEvent(new CustomEvent(o,{bubbles:true,cancelable:false,detail:r}))
}else{var m=document.createEventObject();m.detail=r;s.fireEvent("on"+o,m)}return s
}};f.has=function(l,q,p,n){var o,r;if(typeof q==="string"){o=q;r=p}else{r=q;n=p
}if(o){var m=this._getDelegateFuncBindingIdx(l,o,r,n,true);if(m>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};f.trigger=function(m,l,n,q){m=this._parseEventNames(m);var o,p;if(typeof l==="string"){o=this._cleanStringData(l);
p=n}else{p=l;q=n}m=this._cleanStringData(m);m.forEach(function(s,t,u,r){if(s){this._triggerDelegateEvents(r,s,t);
return}this._eventEmitter.trigger(r,t,u)}.bind(this,o,p,q));return this};f.propagateTo=function(l,m){this._eventEmitter.propagateTo(l,m);
return this};f.stopPropagatingTo=function(l){this._eventEmitter.stopPropagatingTo(l);
return this};f.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
this.el=this._eventEmitter=this._bindings=this._delegateFuncs=null};b.exports=h
},{"ac-dom-events":433,"ac-dom-traversal":434,"ac-event-emitter":420}],455:[function(b,c,a){c.exports={SharedInstance:b("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":456}],456:[function(d,h,c){var j=window,g="AC",a="SharedInstance",f=j[g];
var b=(function(){var k={};return{get:function(m,l){var n=null;if(k[m]&&k[m][l]){n=k[m][l]
}return n},set:function(n,l,m){if(!k[n]){k[n]={}}if(typeof m==="function"){k[n][l]=new m()
}else{k[n][l]=m}return k[n][l]},share:function(n,l,m){var o=this.get(n,l);if(!o){o=this.set(n,l,m)
}return o},remove:function(m,l){var n=typeof l;if(n==="string"||n==="number"){if(!k[m]||!k[m][l]){return
}k[m][l]=null;return}if(k[m]){k[m]=null}}}}());if(!f){f=j[g]={}}if(!f[a]){f[a]=b
}h.exports=f[a]},{}],457:[function(b,c,a){c.exports={WindowDelegate:b("./ac-window-delegate/WindowDelegate"),WindowDelegateOptimizer:b("./ac-window-delegate/WindowDelegateOptimizer"),WindowDelegateCustomEvent:b("./ac-window-delegate/WindowDelegateCustomEvent")}
},{"./ac-window-delegate/WindowDelegate":460,"./ac-window-delegate/WindowDelegateCustomEvent":461,"./ac-window-delegate/WindowDelegateOptimizer":462}],458:[function(b,c,a){var f=b("ac-event-emitter").EventEmitter;
var g=function(){this._emitter=new f();this._customEvents={}};var d=g.prototype;
d.on=function(h,k,j){this._activateCustomEvents(h);this._emitterOn.apply(this,arguments);
return this};d.once=function(h,k,j){this._emitterOnce.apply(this,arguments);return this
};d.off=function(h,k,j){this._emitterOff.apply(this,arguments);this._deactivateCustomEvents(h);
return this};d.has=function(h,k,j){return this._emitter.has.apply(this._emitter,arguments)
};d.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};d.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};d.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};d.add=function(h){this._customEvents[h.name]=h};d.canHandleCustomEvent=function(h){return this._customEvents.hasOwnProperty(h)
};d.isHandlingCustomEvent=function(h){if(this._customEvents[h]&&this._customEvents[h].active){return true
}return false};d._activateCustomEvents=function(l){var j=l.split(" "),k,m,h=j.length;
for(m=0;m<h;m++){k=j[m];if(this._customEvents[k]&&!this._customEvents[k].active){this._customEvents[k].initialize();
this._customEvents[k].active=true}}};d._deactivateCustomEvents=function(k){var l;
if(!k||k.length===0){for(l in this._customEvents){if(this._customEvents.hasOwnProperty(l)){this._deactivateCustomEvent(l)
}}return}var j=k.split(" "),h=j.length;for(l=0;l<h;l++){this._deactivateCustomEvent(j[l])
}};d._deactivateCustomEvent=function(h){if(!this.has(h)&&this._customEvents[h]&&this._customEvents[h].active){this._customEvents[h].deinitialize();
this._customEvents[h].active=false}};d._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)
};d._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)};
d._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};c.exports=g
},{"ac-event-emitter":420}],459:[function(b,c,a){var g=b("ac-event-emitter").EventEmitter;
var f;var d=function(h){g.call(this);this.optimizers=h;this._events={};this._properties={};
this._initialize()};f=d.prototype=new g(null);f.canOptimizeEvent=function(h){return this._events.hasOwnProperty(h)
};f.canOptimizeProperty=function(h){return this._properties.hasOwnProperty(h)};
f.isOptimizingEvent=function(h){if(this._events[h]&&this._events[h].active){return true
}return false};f.isOptimizingProperty=function(h){if(this._properties[h]&&this._properties[h].active){return true
}return false};f.add=function(h){this._setOptimizerEvents(h);this._setOptimizerProperties(h);
h.on("update",this._onUpdate,this);h.on("activate",this._onActivate,this);h.on("deactivate",this._onDeactivate,this)
};f.get=function(h){if(this.isOptimizingProperty(h)){return this._properties[h].value
}return null};f.set=function(j,h){if(!this._properties[j]){return false}this._properties[j].value=h;
return this};f.getOptimizerByEvent=function(h){if(this._events[h]){return this._events[h]
}return null};f._initialize=function(){var j,h;for(j in this.optimizers){if(this.optimizers.hasOwnProperty(j)){this.add(this.optimizers[j])
}}};f._onUpdate=function(h){this.set(h.prop,h.val)};f._onActivate=function(j){var k=j.propertyNames,l,h=k.length;
for(l=0;l<h;l++){this._properties[k[l]].active=true}};f._onDeactivate=function(j){var k=j.propertyNames,l,h=k.length;
for(l=0;l<h;l++){this._properties[k[l]].active=false}};f._setOptimizerEvents=function(j){var l,k=j.eventNames,h=k.length;
for(l=0;l<h;l++){this._setOptimizerEvent(k[l],j)}};f._setOptimizerEvent=function(j,h){if(this._events[j]){return
}this._events[j]=h};f._setOptimizerProperties=function(k){var l,j=k.propertyNames,h=j.length;
for(l=0;l<h;l++){this._setOptimizerProperty(j[l])}};f._setOptimizerProperty=function(h){if(this._properties.hasOwnProperty(h)){return
}this._properties[h]={};this._properties[h].active=false;this._properties[h].value=null
};c.exports=d},{"ac-event-emitter":420}],460:[function(d,b,g){var j;var c=d("ac-shared-instance").SharedInstance,m=d("ac-dom-emitter").DOMEmitter,k=d("./OptimizerController"),f=d("./CustomEventController"),h=d("./queries/queries"),n=d("./optimizers/optimizers");
var l="ac-window-delegate:WindowDelegate",a="2.0.1";function o(){this._emitter=new m(window);
this._controllers={optimizer:new k(n),customEvent:new f()};var p;for(p in h){if(h.hasOwnProperty(p)){this[p]=this._getProperty.bind(this,p);
h[p]=h[p].bind(this)}}this._bindEvents()}j=o.prototype;j.on=function(p,s,q){var r=this._seperateCustomEvents(p);
this._optimizeEvents(r.standardEvents);this._customEventOn(r.customEvents,s,q);
this._emitterOn.apply(this,arguments);return this};j.once=function(p,s,q){var r=this._seperateCustomEvents(p);
this._optimizeEvents(r.standardEvents);this._customEventOnce(r.customEvents,s,q);
this._emitterOnce.apply(this,arguments);return this};j.off=function(q,v,r){var u=this._seperateCustomEvents(q),s=false;
if(!q){s=true}this._customEventOff(u.customEvents,v,r,s);this._emitterOff.apply(this,arguments);
if(s){try{var p;for(p in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(p)&&this._shouldDeoptimizeEvent(p,true)){this._deoptimizeEvent(p)
}}this._bindEvents()}catch(t){}}return this};j.has=function(p,r,q){return this._emitter.has.apply(this._emitter,arguments)
};j.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};j.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};j.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};j.addOptimizer=function(p){this._controllers.optimizer.add(p);return this
};j.addCustomEvent=function(p){this._controllers.customEvent.add(p);return this
};j._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};j._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};j._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};j._onEventUnbound=function(q){var p=q.evt;
if(this._shouldDeoptimizeEvent(p)){this._deoptimizeEvent(p)}};j._customEventOn=function(p,r,q){if(p.length===0){return
}this._controllers.customEvent.on(p.join(" "),r,q)};j._customEventOnce=function(p,r,q){if(p.length===0){return
}this._controllers.customEvent.once(p.join(" "),r,q)};j._customEventOff=function(p,s,q,r){if(!r&&p.length===0){return
}if(r&&p.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(p.join(" "),s,q)
};j._getProperty=function(r,p){var q=null;if(!p){q=this._getOptimizedValue(r)}if(q===null){q=h[r].call(this,p)
}return q};j._optimizeEvents=function(r){var q,s,p=r.length;for(s=0;s<p;s++){q=r[s];
if(this._shouldOptimizeEvent(q)){this._optimizeEvent(q)}}};j._shouldOptimizeEvent=function(p){if(this._controllers.optimizer.canOptimizeEvent(p)&&!this._controllers.optimizer.isOptimizingEvent(p)){return true
}return false};j._shouldDeoptimizeEvent=function(p,q){if(this._controllers.optimizer.isOptimizingEvent(p)&&(q||this._emitter._eventEmitter._events[p].length<=1)){return true
}return false};j._optimizeEvent=function(q){var p=this._controllers.optimizer.getOptimizerByEvent(q);
p.activate();this._emitterOn(q,p.callback,p)};j._deoptimizeEvent=function(q){var p=this._controllers.optimizer.getOptimizerByEvent(q);
p.deactivate();this._emitterOff(q,p.callback,p)};j._getOptimizedValue=function(p){return this._controllers.optimizer.get(p)
};j._seperateCustomEvents=function(t){var q={customEvents:[],standardEvents:[]};
if(typeof t==="string"){var u=t.split(" "),r,s,p=u.length;for(s=0;s<p;s++){r=u[s];
if(this._controllers.customEvent.canHandleCustomEvent(r)){q.customEvents.push(r)
}else{q.standardEvents.push(r)}}}return q};j._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};b.exports=c.share(l,a,o)},{"./CustomEventController":458,"./OptimizerController":459,"./optimizers/optimizers":465,"./queries/queries":474,"ac-dom-emitter":453,"ac-shared-instance":455}],461:[function(c,d,a){var g=c("ac-event-emitter").EventEmitter;
function b(h,k,j){g.call(this);this.name=h;this.active=false;this._initializeFunc=k;
this._deinitializeFunc=j}var f=b.prototype=new g(null);f.initialize=function(){if(this._initializeFunc){this._initializeFunc()
}return this};f.deinitialize=function(){if(this._deinitializeFunc){this._deinitializeFunc()
}return this};d.exports=b},{"ac-event-emitter":420}],462:[function(c,d,b){var g=c("ac-event-emitter").EventEmitter;
function a(h,j){g.call(this);this.active=false;this.eventNames=h.eventNames;this.propertyNames=h.propertyNames;
this.options=h.options||{};this.callback=j}var f=a.prototype=new g(null);f.update=function(j,h){this.trigger("update",{prop:j,val:h})
};f.activate=function(){this.active=true;this.trigger("activate",this)};f.deactivate=function(){this.active=false;
this.trigger("deactivate",this)};d.exports=a},{"ac-event-emitter":420}],463:[function(f,g,b){var a=f("../../WindowDelegateOptimizer"),d=f("../../queries/queries");
var c={eventNames:["resize"],propertyNames:["clientWidth","clientHeight","innerWidth","innerHeight"]};
var h=new a(c,function(m){var l,k=c.propertyNames,j=k.length;for(l=0;l<j;l++){this.update(k[l],d[k[l]](true))
}});g.exports=h},{"../../WindowDelegateOptimizer":462,"../../queries/queries":474}],464:[function(g,h,b){var a=g("../../WindowDelegateOptimizer"),f=g("../../queries/queries");
var d={eventNames:["scroll"],propertyNames:["scrollX","scrollY","maxScrollX","maxScrollY"]};
var c=new a(d,function(m){var l,k=d.propertyNames,j=k.length;for(l=0;l<j;l++){this.update(k[l],f[k[l]](true))
}});h.exports=c},{"../../WindowDelegateOptimizer":462,"../../queries/queries":474}],465:[function(d,f,b){var c=d("./events/resize"),a=d("./events/scroll");
f.exports=[c,a]},{"./events/resize":463,"./events/scroll":464}],466:[function(b,c,a){var d=function(f){return document.documentElement.clientHeight
};c.exports=d},{}],467:[function(b,c,a){var d=function(f){return document.documentElement.clientWidth
};c.exports=d},{}],468:[function(b,d,a){var c=function(f){return window.innerHeight||this.clientHeight(f)
};d.exports=c},{}],469:[function(b,c,a){var d=function(f){return window.innerWidth||this.clientWidth(f)
};c.exports=d},{}],470:[function(c,d,a){var b=function(f){return document.body.scrollWidth-this.innerWidth()
};d.exports=b},{}],471:[function(c,d,b){var a=function(f){return document.body.scrollHeight-this.innerHeight()
};d.exports=a},{}],472:[function(b,c,a){var d=function(f){var h=window.pageXOffset;
if(!h){var g=document.documentElement||document.body.parentNode||document.body;
h=g.scrollLeft}return h};c.exports=d},{}],473:[function(b,c,a){var d=function(f){var h=window.pageYOffset;
if(!h){var g=document.documentElement||document.body.parentNode||document.body;
h=g.scrollTop}return h};c.exports=d},{}],474:[function(j,g,l){var b=j("./methods/innerWidth"),k=j("./methods/innerHeight"),d=j("./methods/clientWidth"),m=j("./methods/clientHeight"),c=j("./methods/scrollX"),a=j("./methods/scrollY"),h=j("./methods/maxScrollX"),f=j("./methods/maxScrollY");
g.exports={innerWidth:b,innerHeight:k,clientWidth:d,clientHeight:m,scrollX:c,scrollY:a,maxScrollX:h,maxScrollY:f}
},{"./methods/clientHeight":466,"./methods/clientWidth":467,"./methods/innerHeight":468,"./methods/innerWidth":469,"./methods/maxScrollX":470,"./methods/maxScrollY":471,"./methods/scrollX":472,"./methods/scrollY":473}],475:[function(b,c,a){var d=b("./ac-element-tracker/ElementTracker");
c.exports=new d();c.exports.ElementTracker=d},{"./ac-element-tracker/ElementTracker":476}],476:[function(d,c,h){var j;
var g=d("ac-object");var l=d("ac-dom-nodes");var a=d("ac-dom-metrics");var m=d("ac-array");
var o=d("ac-window-delegate").WindowDelegate;var k=d("./TrackedElement");var p=d("ac-event-emitter").EventEmitter;
var f={autoStart:false};function b(r,q){this.options=g.clone(f);this.options=typeof q==="object"?g.extend(this.options,q):this.options;
this.windowDelegate=o;this.tracking=false;this.elements=[];if(r&&(Array.isArray(r)||l.isNodeList(r)||l.isElement(r))){this.addElements(r)
}if(this.options.autoStart){this.start()}}j=b.prototype=g.create(p.prototype);var n=/^\[object (HTMLCollection|NodeList|Object)\]$/;
j._registerElements=function(q){q=[].concat(q);q.forEach(function(s){if(this._elementInDOM(s)){var r=new k(s);
r.offsetTop=r.element.offsetTop;this.elements.push(r)}},this)};j._registerTrackedElements=function(q){var r=[].concat(q);
r.forEach(function(s){if(this._elementInDOM(s.element)){s.offsetTop=s.element.offsetTop;
this.elements.push(s)}},this)};j._elementInDOM=function(s){var r=false;var q=document.getElementsByTagName("body")[0];
if(l.isElement(s)&&q.contains(s)){r=true}return r};j._onVPChange=function(){this.elements.forEach(function(q){this.refreshElementState(q)
},this)};j._elementPercentInView=function(q){return q.pixelsInView/q.height};j._elementPixelsInView=function(r){var u=0;
var t=r.top;var s=r.bottom;var q=this.windowDelegate.innerHeight();if(t<=0&&s>=q){u=q
}else{if(t>=0&&t<q&&s>q){u=q-t}else{if(t<0&&(s<q&&s>=0)){u=r.bottom}else{if(t>=0&&s<=q){u=r.height
}}}}return u};j._ifInView=function(q,r){if(!r){q.trigger("enterview",q)}};j._ifAlreadyInView=function(q){if(!q.inView){q.trigger("exitview",q)
}};j.addElements=function(q){q=l.isNodeList(q)?m.toArray(q):[].concat(q);q.forEach(function(r){this.addElement(r)
},this)};j.addElement=function(r){var q;if(l.isElement(r)){q=new k(r);this._registerTrackedElements(q)
}return q};j.removeElement=function(s){var r=[];var q;this.elements.forEach(function(t,u){if(t===s||t.element===s){r.push(u)
}});q=this.elements.filter(function(u,t){return r.indexOf(t)<0?true:false});this.elements=q
};j.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll resize orientationchange",this._onVPChange,this)
}};j.start=function(){if(this.tracking===false){this.tracking=true;this.windowDelegate.on("scroll resize orientationchange",this._onVPChange,this);
this.refreshAllElementStates()}};j.refreshAllElementStates=function(){this.elements.forEach(function(q){this.refreshElementState(q)
},this)};j.refreshElementState=function(q){var r=a.getBoundingBox(q.element);var s=q.inView;
q=g.extend(q,r);q.pixelsInView=this._elementPixelsInView(q);q.percentInView=this._elementPercentInView(q);
q.inView=q.pixelsInView>0;if(q.inView){this._ifInView(q,s)}if(s){this._ifAlreadyInView(q)
}return q};c.exports=b},{"./TrackedElement":477,"ac-array":408,"ac-dom-metrics":418,"ac-dom-nodes":335,"ac-event-emitter":420,"ac-object":423,"ac-window-delegate":457}],477:[function(d,f,c){var g;
var j=d("ac-dom-emitter").DOMEmitter;var a=d("ac-dom-nodes");var b=d("ac-object");
function h(k){if(a.isElement(k)){this.element=k}else{throw new TypeError("TrackedElement: "+k+" is not a valid DOM element")
}this.inView=false;this.percentInView=0;this.pixelsInView=0;this.offsetTop=0;this.top=0;
this.right=0;this.bottom=0;this.left=0;this.width=0;this.height=0;j.call(this,k)
}g=h.prototype=b.create(j.prototype);f.exports=h},{"ac-dom-emitter":295,"ac-dom-nodes":335,"ac-object":423}],478:[function(b,c,a){c.exports={EventEmitterMicro:b("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":479}],479:[function(b,c,a){function f(){this._events={}
}var d=f.prototype;d.on=function(g,h){this._events[g]=this._events[g]||[];this._events[g].unshift(h)
};d.once=function(g,k){var j=this;function h(l){j.off(g,h);if(l!==undefined){k(l)
}else{k()}}this.on(g,h)};d.off=function(g,j){if(g in this._events===false){return
}var h=this._events[g].indexOf(j);if(h===-1){return}this._events[g].splice(h,1)
};d.trigger=function(g,j){if(g in this._events===false){return}for(var h=this._events[g].length-1;
h>=0;h--){if(j!==undefined){this._events[g][h](j)}else{this._events[g][h]()}}};
d.destroy=function(){for(var g in this._events){this._events[g]=null}this._events=null
};c.exports=f},{}],480:[function(b,c,a){c.exports={EventEmitter:b("./ac-event-emitter/EventEmitter")}
},{"./ac-event-emitter/EventEmitter":481}],481:[function(d,c,f){var h="EventEmitter:propagation";
var m=function(n){if(n){this.context=n}};var g=m.prototype;var j=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var k=function(n){if(typeof Array.isArray==="function"){return Array.isArray(n)
}return Object.prototype.toString.call(n)==="[object Array]"};var a=function(o,s){var r=o[0];
var u=o[1];var q=o[2];var n;var t;var p;if((typeof r!=="string"&&typeof r!=="object")||r===null||k(r)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof r==="string")&&!u){throw new Error("Expecting a callback function to be provided.")
}if(u&&(typeof u!=="function")){if(typeof r==="object"&&typeof u==="object"){q=u
}else{throw new TypeError("Expecting callback to be a function.")}}s.call(this,r,u,q)
};var l=function(r,s,p){var n;var o;var q;n=j.call(this)[r];if(!n||n.length===0){return
}n=n.slice();this._stoppedImmediatePropagation=false;for(o=0,q=n.length;o<q;o+=1){if(this._stoppedImmediatePropagation||s.call(p,n[o],o)){break
}}};var b=function(o,p,q){var n=-1;l.call(this,p,function(s,r){if(s.callback===q){n=r;
return true}});if(n===-1){return}o[p].splice(n,1)};g.on=function(){var n=j.call(this);
a.call(this,arguments,function(p,q,o){n[p]=n[p]||(n[p]=[]);n[p].push({callback:q,context:o})
});return this};g.once=function(){a.call(this,arguments,function(o,q,n){var p=function(r){q.call(n||this,r);
this.off(o,p)};this.on(o,p,this)});return this};g.off=function(s,t){var q=j.call(this);
var n;var p;var r;var o;if(arguments.length===0){this._events={}}else{if(!s||(typeof s!=="string"&&typeof s!=="object")||Array.isArray(s)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof s==="object"){for(n in s){if(s.hasOwnProperty(n)){b.call(this,q,n,s[n])
}}}if(typeof s==="string"){p=s.split(" ");if(p.length===1){if(t){b.call(this,q,s,t)
}else{q[s]=[]}}else{for(o=0,r=p.length;o<r;o+=1){q[p[o]]=[]}}}return this};g.trigger=function(s,t,o){var p;
var r;var n;var q;if(!s){throw new Error("trigger method requires an event name")
}if(typeof s!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(o&&typeof o!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}s=s.split(" ");for(q=0,r=s.length;q<r;q+=1){n=s[q];l.call(this,n,function(u){u.callback.call(u.context||this.context||this,t)
},this);if(!o){p=n;l.call(this,h,function(u){if(u.prefix){p=u.prefix+p}u.emitter.trigger(p,t)
})}}return this};g.propagateTo=function(o,p){var n=j.call(this);if(!n[h]){this._events[h]=[]
}n[h].push({emitter:o,prefix:p})};g.stopPropagatingTo=function(q){var o=j.call(this);
if(!q){o[h]=[];return}var r=o[h];var p=r.length;var n;for(n=0;n<p;n+=1){if(r[n].emitter===q){r.splice(n,1);
break}}};g.stopImmediatePropagation=function(){this._stoppedImmediatePropagation=true
};g.has=function(u,v,n){var w=j.call(this);var r=w[u];var s;var q;var o;var p;var t;
if(arguments.length===0){p=[];for(t in w){if(w.hasOwnProperty(t)){p.push(t)}}return p
}if(!r){return false}if(!v){return(r.length>0)?true:false}for(q=0,o=r.length;q<o;
q+=1){s=r[q];if((n&&v&&s.context===n&&s.callback===v)||(v&&!n&&s.callback===v)){return true
}}return false};c.exports=m},{}],482:[function(b,c,a){var g=b("./helpers/globals");
var f=b("ac-function/once");var d=function(){var h=g.getDocument();var j=h.createElement("canvas");
return !!(typeof j.getContext==="function"&&j.getContext("2d"))};c.exports=f(d);
c.exports.original=d},{"./helpers/globals":490,"ac-function/once":504}],483:[function(c,d,b){var h=c("ac-browser");
var a=c("./touchAvailable").original;var f=c("ac-function/once");function g(){return(!a()||(h.os==="iOS"&&h.version>=8)||h.name==="Chrome")
}d.exports=f(g);d.exports.original=g},{"./touchAvailable":520,"ac-browser":499,"ac-function/once":504}],484:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var l=false;var h=g.getDocument();var k=g.getNavigator();
try{if("cookie" in h&&!!k.cookieEnabled){h.cookie="ac_feature_cookie=1";l=(h.cookie.indexOf("ac_feature_cookie")!==-1);
h.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(j){}return l
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":490,"ac-function/once":504}],485:[function(c,d,b){var g=c("ac-prefixer/getStyleValue");
var f=c("ac-function/once");function a(){var h=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return h.some(function(j){return !!g("background-image",j)})}d.exports=f(a);d.exports.original=a
},{"ac-function/once":504,"ac-prefixer/getStyleValue":507}],486:[function(c,d,b){var g=c("ac-prefixer/getStyleValue");
var f=c("ac-prefixer/getStyleProperty");var h=c("ac-function/memoize");function a(k,j){if(typeof j!=="undefined"){return !!g(k,j)
}else{return !!f(k)}}d.exports=h(a);d.exports.original=a},{"ac-function/memoize":503,"ac-prefixer/getStyleProperty":506,"ac-prefixer/getStyleValue":507}],487:[function(b,c,a){var f=b("ac-prefixer/getStyleValue");
var d=b("ac-function/once");function g(){return !!f("margin","1vw 1vh")}c.exports=d(g);
c.exports.original=g},{"ac-function/once":504,"ac-prefixer/getStyleValue":507}],488:[function(b,d,a){var f=b("./helpers/globals");
var g=b("ac-function/memoize");function c(h,k){var j=f.getDocument();var l;k=k||"div";
l=j.createElement(k);return(h in l)}d.exports=g(c);d.exports.original=c},{"./helpers/globals":490,"ac-function/memoize":503}],489:[function(c,f,b){var a=c("ac-prefixer/getEventType");
var g=c("ac-function/memoize");function d(j,h){return !!a(j,h)}f.exports=g(d);f.exports.original=d
},{"ac-function/memoize":503,"ac-prefixer/getEventType":505}],490:[function(b,c,a){c.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],491:[function(b,c,a){c.exports={canvasAvailable:b("./canvasAvailable"),continuousScrollEventsAvailable:b("./continuousScrollEventsAvailable"),cookiesAvailable:b("./cookiesAvailable"),cssLinearGradientAvailable:b("./cssLinearGradientAvailable"),cssPropertyAvailable:b("./cssPropertyAvailable"),cssViewportUnitsAvailable:b("./cssViewportUnitsAvailable"),elementAttributeAvailable:b("./elementAttributeAvailable"),eventTypeAvailable:b("./eventTypeAvailable"),isDesktop:b("./isDesktop"),isHandheld:b("./isHandheld"),isRetina:b("./isRetina"),isTablet:b("./isTablet"),localStorageAvailable:b("./localStorageAvailable"),mediaElementsAvailable:b("./mediaElementsAvailable"),mediaQueriesAvailable:b("./mediaQueriesAvailable"),sessionStorageAvailable:b("./sessionStorageAvailable"),svgAvailable:b("./svgAvailable"),threeDTransformsAvailable:b("./threeDTransformsAvailable"),touchAvailable:b("./touchAvailable"),webGLAvailable:b("./webGLAvailable")}
},{"./canvasAvailable":482,"./continuousScrollEventsAvailable":483,"./cookiesAvailable":484,"./cssLinearGradientAvailable":485,"./cssPropertyAvailable":486,"./cssViewportUnitsAvailable":487,"./elementAttributeAvailable":488,"./eventTypeAvailable":489,"./isDesktop":492,"./isHandheld":493,"./isRetina":494,"./isTablet":495,"./localStorageAvailable":496,"./mediaElementsAvailable":497,"./mediaQueriesAvailable":498,"./sessionStorageAvailable":517,"./svgAvailable":518,"./threeDTransformsAvailable":519,"./touchAvailable":520,"./webGLAvailable":521}],492:[function(d,f,b){var a=d("./touchAvailable").original;
var h=d("./helpers/globals");var g=d("ac-function/once");function c(){var j=h.getWindow();
return(!a()&&!j.orientation)}f.exports=g(c);f.exports.original=c},{"./helpers/globals":490,"./touchAvailable":520,"ac-function/once":504}],493:[function(f,g,c){var d=f("./isDesktop").original;
var a=f("./isTablet").original;var h=f("ac-function/once");function b(){return(!d()&&!a())
}g.exports=h(b);g.exports.original=b},{"./isDesktop":492,"./isTablet":495,"ac-function/once":504}],494:[function(b,c,a){var d=b("./helpers/globals");
c.exports=function f(){var g=d.getWindow();return("devicePixelRatio" in g&&g.devicePixelRatio>=1.5)
}},{"./helpers/globals":490}],495:[function(f,g,c){var d=f("./isDesktop").original;
var j=f("./helpers/globals");var h=f("ac-function/once");var b=600;function a(){var l=j.getWindow();
var k=l.screen.width;if(l.orientation&&l.screen.height<k){k=l.screen.height}return(!d()&&k>=b)
}g.exports=h(a);g.exports.original=a},{"./helpers/globals":490,"./isDesktop":492,"ac-function/once":504}],496:[function(c,d,a){var g=c("./helpers/globals");
var f=c("ac-function/once");function b(){var k=g.getWindow();var j=false;try{j=!!(k.localStorage&&k.localStorage.non_existent!==null)
}catch(h){}return j}d.exports=f(b);d.exports.original=b},{"./helpers/globals":490,"ac-function/once":504}],497:[function(b,c,a){var g=b("./helpers/globals");
var d=b("ac-function/once");function f(){var h=g.getWindow();return("HTMLMediaElement" in h)
}c.exports=d(f);c.exports.original=f},{"./helpers/globals":490,"ac-function/once":504}],498:[function(c,d,b){c("ac-polyfills/matchMedia");
var g=c("./helpers/globals");var f=c("ac-function/once");function a(){var j=g.getWindow();
var h=j.matchMedia("only all");return !!(h&&h.matches)}d.exports=f(a);d.exports.original=a
},{"./helpers/globals":490,"ac-function/once":504,"ac-polyfills/matchMedia":570}],499:[function(b,c,a){arguments[4][261][0].apply(a,arguments)
},{"./ac-browser/BrowserData":500,"./ac-browser/IE":501,dup:261}],500:[function(b,c,a){var d=b("./data");
function f(){}f.prototype={__getBrowserVersion:function(h,j){var g;if(!h||!j){return
}var k=d.browser.filter(function(l){return l.identity===j});k.some(function(n){var l=n.versionSearch||j;
var m=h.indexOf(l);if(m>-1){g=parseFloat(h.substring(m+l.length+1));return true
}});return g},__getName:function(g){return this.__getIdentityStringFromArray(g)
},__getIdentity:function(g){if(g.string){return this.__matchSubString(g)}else{if(g.prop){return g.identity
}}},__getIdentityStringFromArray:function(g){for(var k=0,h=g.length,j;k<h;k++){j=this.__getIdentity(g[k]);
if(j){return j}}},__getOS:function(g){return this.__getIdentityStringFromArray(g)
},__getOSVersion:function(j,m){if(!j||!m){return}var l=d.os.filter(function(n){return n.identity===m
})[0];var g=l.versionSearch||m;var k=new RegExp(g+" ([\\d_\\.]+)","i");var h=j.match(k);
if(h!==null){return h[1].replace(/_/g,".")}},__matchSubString:function(h){var g=h.subString;
if(g){var j=g.test?!!g.test(h.string):h.string.indexOf(g)>-1;if(j){return h.identity
}}}};f.create=function(){var g=new f();var h={};h.name=g.__getName(d.browser);h.version=g.__getBrowserVersion(d.versionString,h.name);
h.os=g.__getOS(d.os);h.osVersion=g.__getOSVersion(d.versionString,h.os);return h
};c.exports=f},{"./data":502}],501:[function(b,c,a){arguments[4][263][0].apply(a,arguments)
},{dup:263}],502:[function(b,c,a){c.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],503:[function(c,d,b){var a=function(){var h="";var g;for(g=0;g<arguments.length;
g++){if(g>0){h+=","}h+=arguments[g]}return h};d.exports=function f(j,h){h=h||a;
var g=function(){var k=arguments;var l=h.apply(this,k);if(!(l in g.cache)){g.cache[l]=j.apply(this,k)
}return g.cache[l]};g.cache={};return g}},{}],504:[function(b,c,a){c.exports=function d(g){var f;
return function(){if(typeof f==="undefined"){f=g.apply(this,arguments)}return f
}}},{}],505:[function(b,c,a){arguments[4][300][0].apply(a,arguments)},{"./shared/camelCasedEventTypes":508,"./shared/prefixHelper":510,"./shared/windowFallbackEventTypes":513,"./utils/eventTypeAvailable":514,dup:300}],506:[function(b,c,a){arguments[4][357][0].apply(a,arguments)
},{"./shared/getStyleTestElement":509,"./shared/prefixHelper":510,"./shared/stylePropertyCache":511,"./utils/toCSS":515,"./utils/toDOM":516,dup:357}],507:[function(b,c,a){arguments[4][358][0].apply(a,arguments)
},{"./getStyleProperty":506,"./shared/prefixHelper":510,"./shared/stylePropertyCache":511,"./shared/styleValueAvailable":512,dup:358}],508:[function(b,c,a){arguments[4][301][0].apply(a,arguments)
},{dup:301}],509:[function(b,c,a){arguments[4][359][0].apply(a,arguments)},{dup:359}],510:[function(b,c,a){arguments[4][302][0].apply(a,arguments)
},{dup:302}],511:[function(b,c,a){arguments[4][361][0].apply(a,arguments)},{dup:361}],512:[function(b,c,a){arguments[4][362][0].apply(a,arguments)
},{"./getStyleTestElement":509,"./stylePropertyCache":511,dup:362}],513:[function(b,c,a){arguments[4][303][0].apply(a,arguments)
},{dup:303}],514:[function(b,c,a){arguments[4][304][0].apply(a,arguments)},{dup:304}],515:[function(b,c,a){arguments[4][364][0].apply(a,arguments)
},{dup:364}],516:[function(b,c,a){arguments[4][365][0].apply(a,arguments)},{dup:365}],517:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var k=g.getWindow();var h=false;try{if("sessionStorage" in k&&typeof k.sessionStorage.setItem==="function"){k.sessionStorage.setItem("ac_feature","test");
h=true;k.sessionStorage.removeItem("ac_feature","test")}}catch(j){}return h}d.exports=f(a);
d.exports.original=a},{"./helpers/globals":490,"ac-function/once":504}],518:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var h=g.getDocument();return !!h.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":490,"ac-function/once":504}],519:[function(b,c,a){var g=b("ac-prefixer/getStyleValue");
var d=b("ac-function/once");function f(){return !!(g("perspective","1px")&&g("transform","translateZ(0)"))
}c.exports=d(f);c.exports.original=f},{"ac-function/once":504,"ac-prefixer/getStyleValue":507}],520:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var k=g.getWindow();var h=g.getDocument();
var j=g.getNavigator();return !!(("ontouchstart" in k)||(k.DocumentTouch&&h instanceof k.DocumentTouch)||(j.maxTouchPoints>0)||(j.msMaxTouchPoints>0))
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":490,"ac-function/once":504}],521:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var h=g.getDocument();var j=h.createElement("canvas");
if(typeof j.getContext==="function"){return !!(j.getContext("webgl")||j.getContext("experimental-webgl"))
}return false}d.exports=f(a);d.exports.original=a},{"./helpers/globals":490,"ac-function/once":504}],522:[function(b,c,a){var d=b("./ac-color/Color");
d.decimalToHex=b("./ac-color/static/decimalToHex");d.hexToDecimal=b("./ac-color/static/hexToDecimal");
d.hexToRgb=b("./ac-color/static/hexToRgb");d.isColor=b("./ac-color/static/isColor");
d.isHex=b("./ac-color/static/isHex");d.isRgb=b("./ac-color/static/isRgb");d.isRgba=b("./ac-color/static/isRgba");
d.mixColors=b("./ac-color/static/mixColors");d.rgbaToArray=b("./ac-color/static/rgbaToArray");
d.rgbToArray=b("./ac-color/static/rgbToArray");d.rgbToDecimal=b("./ac-color/static/rgbToDecimal");
d.rgbToHex=b("./ac-color/static/rgbToHex");d.rgbToHsl=b("./ac-color/static/rgbToHsl");
d.rgbToHsv=b("./ac-color/static/rgbToHsv");d.rgbaToObject=b("./ac-color/static/rgbaToObject");
d.rgbToObject=b("./ac-color/static/rgbToObject");d.shortToLongHex=b("./ac-color/static/shortToLongHex");
c.exports={Color:d}},{"./ac-color/Color":523,"./ac-color/static/decimalToHex":525,"./ac-color/static/hexToDecimal":526,"./ac-color/static/hexToRgb":527,"./ac-color/static/isColor":528,"./ac-color/static/isHex":529,"./ac-color/static/isRgb":530,"./ac-color/static/isRgba":531,"./ac-color/static/mixColors":532,"./ac-color/static/rgbToArray":533,"./ac-color/static/rgbToDecimal":534,"./ac-color/static/rgbToHex":535,"./ac-color/static/rgbToHsl":536,"./ac-color/static/rgbToHsv":537,"./ac-color/static/rgbToObject":538,"./ac-color/static/rgbaToArray":539,"./ac-color/static/rgbaToObject":540,"./ac-color/static/shortToLongHex":541}],523:[function(d,a,r){var h=d("./helpers/cssColorNames");
var n=d("./static/hexToRgb");var m=d("./static/isColor");var f=d("./static/isHex");
var b=d("./static/isRgba");var q=d("./static/mixColors");var l=d("./static/rgbaToArray");
var o=d("./static/rgbToArray");var t=d("./static/rgbToDecimal");var j=d("./static/rgbToHex");
var c=d("./static/rgbaToObject");var k=d("./static/rgbToObject");var p=d("./static/shortToLongHex");
function s(u){if(!m(u)&&!h.nameToRgbObject[u]){throw new Error(u+" is not a supported color.")
}this._setColor(u)}var g=s.prototype;g._setColor=function(u){this._color={};if(f(u)){this._color.hex=p(u);
this._color.rgb={color:n(u)}}else{if(b(u)){this._color.rgba={color:u};var w=this.rgbaObject();
this._color.rgb={color:"rgb("+w.r+", "+w.g+", "+w.b+")"}}else{if(h.nameToRgbObject[u]){var v=h.nameToRgbObject[u];
this._color.rgb={object:v,color:"rgb("+v.r+", "+v.g+", "+v.b+")"}}else{this._color.rgb={color:u}
}}}};g.rgb=function(){return this._color.rgb.color};g.rgba=function(){if(this._color.rgba===undefined){var u=this.rgbObject();
this._color.rgba={color:"rgba("+u.r+", "+u.g+", "+u.b+", 1)"}}return this._color.rgba.color
};g.hex=function(){if(this._color.hex===undefined){this._color.hex=j.apply(this,this.rgbArray())
}return this._color.hex};g.decimal=function(){if(this._color.decimal===undefined){this._color.decimal=t(this.rgb())
}return this._color.decimal};g.cssName=function(){return h.rgbToName[this.rgb()]||null
};g.rgbArray=function(){if(this._color.rgb.array===undefined){this._color.rgb.array=o(this.rgb())
}return this._color.rgb.array};g.rgbaArray=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.array===undefined){this._color.rgba.array=l(this.rgba())}return this._color.rgba.array
};g.rgbObject=function(){if(this._color.rgb.object===undefined){this._color.rgb.object=k(this.rgb())
}return this._color.rgb.object};g.rgbaObject=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.object===undefined){this._color.rgba.object=c(this.rgba())
}return this._color.rgba.object};g.getRed=function(){return this.rgbObject().r};
g.getGreen=function(){return this.rgbObject().g};g.getBlue=function(){return this.rgbObject().b
};g.getAlpha=function(){if(this._color.rgba===undefined){return 1}return this.rgbaObject().a
};g.setRed=function(u){if(u!==this.getRed()){this._setColor("rgba("+u+", "+this.getGreen()+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().r};g.setGreen=function(u){if(u!==this.getGreen()){this._setColor("rgba("+this.getRed()+", "+u+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().g};g.setBlue=function(u){if(u!==this.getBlue()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+u+", "+this.getAlpha()+")")
}return this.rgbObject().b};g.setAlpha=function(u){if(u!==this.getAlpha()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+", "+u+")")
}return this.rgbaObject().a};g.mix=function(u,v){var w=k(q(this.rgb(),u,v));this._setColor("rgba("+w.r+", "+w.g+", "+w.b+", "+this.getAlpha()+")");
return this.rgb()};g.clone=function(){return new s(this.rgb())};a.exports=s},{"./helpers/cssColorNames":524,"./static/hexToRgb":527,"./static/isColor":528,"./static/isHex":529,"./static/isRgba":531,"./static/mixColors":532,"./static/rgbToArray":533,"./static/rgbToDecimal":534,"./static/rgbToHex":535,"./static/rgbToObject":538,"./static/rgbaToArray":539,"./static/rgbaToObject":540,"./static/shortToLongHex":541}],524:[function(b,c,a){var d={"rgb(240, 248, 255)":"aliceblue","rgb(250, 235, 215)":"antiquewhite","rgb(0, 0, 0)":"black","rgb(0, 0, 255)":"blue","rgb(0, 255, 255)":"cyan","rgb(0, 0, 139)":"darkblue","rgb(0, 139, 139)":"darkcyan","rgb(0, 100, 0)":"darkgreen","rgb(0, 206, 209)":"darkturquoise","rgb(0, 191, 255)":"deepskyblue","rgb(0, 128, 0)":"green","rgb(0, 255, 0)":"lime","rgb(0, 0, 205)":"mediumblue","rgb(0, 250, 154)":"mediumspringgreen","rgb(0, 0, 128)":"navy","rgb(0, 255, 127)":"springgreen","rgb(0, 128, 128)":"teal","rgb(25, 25, 112)":"midnightblue","rgb(30, 144, 255)":"dodgerblue","rgb(32, 178, 170)":"lightseagreen","rgb(34, 139, 34)":"forestgreen","rgb(46, 139, 87)":"seagreen","rgb(47, 79, 79)":"darkslategray","rgb(50, 205, 50)":"limegreen","rgb(60, 179, 113)":"mediumseagreen","rgb(64, 224, 208)":"turquoise","rgb(65, 105, 225)":"royalblue","rgb(70, 130, 180)":"steelblue","rgb(72, 61, 139)":"darkslateblue","rgb(72, 209, 204)":"mediumturquoise","rgb(75, 0, 130)":"indigo","rgb(85, 107, 47)":"darkolivegreen","rgb(95, 158, 160)":"cadetblue","rgb(100, 149, 237)":"cornflowerblue","rgb(102, 205, 170)":"mediumaquamarine","rgb(105, 105, 105)":"dimgray","rgb(106, 90, 205)":"slateblue","rgb(107, 142, 35)":"olivedrab","rgb(112, 128, 144)":"slategray","rgb(119, 136, 153)":"lightslategray","rgb(123, 104, 238)":"mediumslateblue","rgb(124, 252, 0)":"lawngreen","rgb(127, 255, 212)":"aquamarine","rgb(127, 255, 0)":"chartreuse","rgb(128, 128, 128)":"gray","rgb(128, 0, 0)":"maroon","rgb(128, 128, 0)":"olive","rgb(128, 0, 128)":"purple","rgb(135, 206, 250)":"lightskyblue","rgb(135, 206, 235)":"skyblue","rgb(138, 43, 226)":"blueviolet","rgb(139, 0, 139)":"darkmagenta","rgb(139, 0, 0)":"darkred","rgb(139, 69, 19)":"saddlebrown","rgb(143, 188, 143)":"darkseagreen","rgb(144, 238, 144)":"lightgreen","rgb(147, 112, 219)":"mediumpurple","rgb(148, 0, 211)":"darkviolet","rgb(152, 251, 152)":"palegreen","rgb(153, 50, 204)":"darkorchid","rgb(154, 205, 50)":"yellowgreen","rgb(160, 82, 45)":"sienna","rgb(165, 42, 42)":"brown","rgb(169, 169, 169)":"darkgray","rgb(173, 255, 47)":"greenyellow","rgb(173, 216, 230)":"lightblue","rgb(175, 238, 238)":"paleturquoise","rgb(176, 196, 222)":"lightsteelblue","rgb(176, 224, 230)":"powderblue","rgb(178, 34, 34)":"firebrick","rgb(184, 134, 11)":"darkgoldenrod","rgb(186, 85, 211)":"mediumorchid","rgb(188, 143, 143)":"rosybrown","rgb(189, 183, 107)":"darkkhaki","rgb(192, 192, 192)":"silver","rgb(199, 21, 133)":"mediumvioletred","rgb(205, 92, 92)":"indianred","rgb(205, 133, 63)":"peru","rgb(210, 105, 30)":"chocolate","rgb(210, 180, 140)":"tan","rgb(211, 211, 211)":"lightgray","rgb(216, 191, 216)":"thistle","rgb(218, 165, 32)":"goldenrod","rgb(218, 112, 214)":"orchid","rgb(219, 112, 147)":"palevioletred","rgb(220, 20, 60)":"crimson","rgb(220, 220, 220)":"gainsboro","rgb(221, 160, 221)":"plum","rgb(222, 184, 135)":"burlywood","rgb(224, 255, 255)":"lightcyan","rgb(230, 230, 250)":"lavender","rgb(233, 150, 122)":"darksalmon","rgb(238, 232, 170)":"palegoldenrod","rgb(238, 130, 238)":"violet","rgb(240, 255, 255)":"azure","rgb(240, 255, 240)":"honeydew","rgb(240, 230, 140)":"khaki","rgb(240, 128, 128)":"lightcoral","rgb(244, 164, 96)":"sandybrown","rgb(245, 245, 220)":"beige","rgb(245, 255, 250)":"mintcream","rgb(245, 222, 179)":"wheat","rgb(245, 245, 245)":"whitesmoke","rgb(248, 248, 255)":"ghostwhite","rgb(250, 250, 210)":"lightgoldenrodyellow","rgb(250, 240, 230)":"linen","rgb(250, 128, 114)":"salmon","rgb(253, 245, 230)":"oldlace","rgb(255, 228, 196)":"bisque","rgb(255, 235, 205)":"blanchedalmond","rgb(255, 127, 80)":"coral","rgb(255, 248, 220)":"cornsilk","rgb(255, 140, 0)":"darkorange","rgb(255, 20, 147)":"deeppink","rgb(255, 250, 240)":"floralwhite","rgb(255, 215, 0)":"gold","rgb(255, 105, 180)":"hotpink","rgb(255, 255, 240)":"ivory","rgb(255, 240, 245)":"lavenderblush","rgb(255, 250, 205)":"lemonchiffon","rgb(255, 182, 193)":"lightpink","rgb(255, 160, 122)":"lightsalmon","rgb(255, 255, 224)":"lightyellow","rgb(255, 0, 255)":"magenta","rgb(255, 228, 225)":"mistyrose","rgb(255, 228, 181)":"moccasin","rgb(255, 222, 173)":"navajowhite","rgb(255, 165, 0)":"orange","rgb(255, 69, 0)":"orangered","rgb(255, 239, 213)":"papayawhip","rgb(255, 218, 185)":"peachpuff","rgb(255, 192, 203)":"pink","rgb(255, 0, 0)":"red","rgb(255, 245, 238)":"seashell","rgb(255, 250, 250)":"snow","rgb(255, 99, 71)":"tomato","rgb(255, 255, 255)":"white","rgb(255, 255, 0)":"yellow","rgb(102, 51, 153)":"rebeccapurple"};
var f={aqua:{r:0,g:255,b:255},aliceblue:{r:240,g:248,b:255},antiquewhite:{r:250,g:235,b:215},black:{r:0,g:0,b:0},blue:{r:0,g:0,b:255},cyan:{r:0,g:255,b:255},darkblue:{r:0,g:0,b:139},darkcyan:{r:0,g:139,b:139},darkgreen:{r:0,g:100,b:0},darkturquoise:{r:0,g:206,b:209},deepskyblue:{r:0,g:191,b:255},green:{r:0,g:128,b:0},lime:{r:0,g:255,b:0},mediumblue:{r:0,g:0,b:205},mediumspringgreen:{r:0,g:250,b:154},navy:{r:0,g:0,b:128},springgreen:{r:0,g:255,b:127},teal:{r:0,g:128,b:128},midnightblue:{r:25,g:25,b:112},dodgerblue:{r:30,g:144,b:255},lightseagreen:{r:32,g:178,b:170},forestgreen:{r:34,g:139,b:34},seagreen:{r:46,g:139,b:87},darkslategray:{r:47,g:79,b:79},darkslategrey:{r:47,g:79,b:79},limegreen:{r:50,g:205,b:50},mediumseagreen:{r:60,g:179,b:113},turquoise:{r:64,g:224,b:208},royalblue:{r:65,g:105,b:225},steelblue:{r:70,g:130,b:180},darkslateblue:{r:72,g:61,b:139},mediumturquoise:{r:72,g:209,b:204},indigo:{r:75,g:0,b:130},darkolivegreen:{r:85,g:107,b:47},cadetblue:{r:95,g:158,b:160},cornflowerblue:{r:100,g:149,b:237},mediumaquamarine:{r:102,g:205,b:170},dimgray:{r:105,g:105,b:105},dimgrey:{r:105,g:105,b:105},slateblue:{r:106,g:90,b:205},olivedrab:{r:107,g:142,b:35},slategray:{r:112,g:128,b:144},slategrey:{r:112,g:128,b:144},lightslategray:{r:119,g:136,b:153},lightslategrey:{r:119,g:136,b:153},mediumslateblue:{r:123,g:104,b:238},lawngreen:{r:124,g:252,b:0},aquamarine:{r:127,g:255,b:212},chartreuse:{r:127,g:255,b:0},gray:{r:128,g:128,b:128},grey:{r:128,g:128,b:128},maroon:{r:128,g:0,b:0},olive:{r:128,g:128,b:0},purple:{r:128,g:0,b:128},lightskyblue:{r:135,g:206,b:250},skyblue:{r:135,g:206,b:235},blueviolet:{r:138,g:43,b:226},darkmagenta:{r:139,g:0,b:139},darkred:{r:139,g:0,b:0},saddlebrown:{r:139,g:69,b:19},darkseagreen:{r:143,g:188,b:143},lightgreen:{r:144,g:238,b:144},mediumpurple:{r:147,g:112,b:219},darkviolet:{r:148,g:0,b:211},palegreen:{r:152,g:251,b:152},darkorchid:{r:153,g:50,b:204},yellowgreen:{r:154,g:205,b:50},sienna:{r:160,g:82,b:45},brown:{r:165,g:42,b:42},darkgray:{r:169,g:169,b:169},darkgrey:{r:169,g:169,b:169},greenyellow:{r:173,g:255,b:47},lightblue:{r:173,g:216,b:230},paleturquoise:{r:175,g:238,b:238},lightsteelblue:{r:176,g:196,b:222},powderblue:{r:176,g:224,b:230},firebrick:{r:178,g:34,b:34},darkgoldenrod:{r:184,g:134,b:11},mediumorchid:{r:186,g:85,b:211},rosybrown:{r:188,g:143,b:143},darkkhaki:{r:189,g:183,b:107},silver:{r:192,g:192,b:192},mediumvioletred:{r:199,g:21,b:133},indianred:{r:205,g:92,b:92},peru:{r:205,g:133,b:63},chocolate:{r:210,g:105,b:30},tan:{r:210,g:180,b:140},lightgray:{r:211,g:211,b:211},lightgrey:{r:211,g:211,b:211},thistle:{r:216,g:191,b:216},goldenrod:{r:218,g:165,b:32},orchid:{r:218,g:112,b:214},palevioletred:{r:219,g:112,b:147},crimson:{r:220,g:20,b:60},gainsboro:{r:220,g:220,b:220},plum:{r:221,g:160,b:221},burlywood:{r:222,g:184,b:135},lightcyan:{r:224,g:255,b:255},lavender:{r:230,g:230,b:250},darksalmon:{r:233,g:150,b:122},palegoldenrod:{r:238,g:232,b:170},violet:{r:238,g:130,b:238},azure:{r:240,g:255,b:255},honeydew:{r:240,g:255,b:240},khaki:{r:240,g:230,b:140},lightcoral:{r:240,g:128,b:128},sandybrown:{r:244,g:164,b:96},beige:{r:245,g:245,b:220},mintcream:{r:245,g:255,b:250},wheat:{r:245,g:222,b:179},whitesmoke:{r:245,g:245,b:245},ghostwhite:{r:248,g:248,b:255},lightgoldenrodyellow:{r:250,g:250,b:210},linen:{r:250,g:240,b:230},salmon:{r:250,g:128,b:114},oldlace:{r:253,g:245,b:230},bisque:{r:255,g:228,b:196},blanchedalmond:{r:255,g:235,b:205},coral:{r:255,g:127,b:80},cornsilk:{r:255,g:248,b:220},darkorange:{r:255,g:140,b:0},deeppink:{r:255,g:20,b:147},floralwhite:{r:255,g:250,b:240},fuchsia:{r:255,g:0,b:255},gold:{r:255,g:215,b:0},hotpink:{r:255,g:105,b:180},ivory:{r:255,g:255,b:240},lavenderblush:{r:255,g:240,b:245},lemonchiffon:{r:255,g:250,b:205},lightpink:{r:255,g:182,b:193},lightsalmon:{r:255,g:160,b:122},lightyellow:{r:255,g:255,b:224},magenta:{r:255,g:0,b:255},mistyrose:{r:255,g:228,b:225},moccasin:{r:255,g:228,b:181},navajowhite:{r:255,g:222,b:173},orange:{r:255,g:165,b:0},orangered:{r:255,g:69,b:0},papayawhip:{r:255,g:239,b:213},peachpuff:{r:255,g:218,b:185},pink:{r:255,g:192,b:203},red:{r:255,g:0,b:0},seashell:{r:255,g:245,b:238},snow:{r:255,g:250,b:250},tomato:{r:255,g:99,b:71},white:{r:255,g:255,b:255},yellow:{r:255,g:255,b:0},rebeccapurple:{r:102,g:51,b:153}};
c.exports={rgbToName:d,nameToRgbObject:f}},{}],525:[function(c,d,b){d.exports=function a(f){return"#"+(f).toString(16)
}},{}],526:[function(c,d,a){d.exports=function b(f){return parseInt(f.substr(1),16)
}},{}],527:[function(d,f,c){var a=d("./shortToLongHex");f.exports=function b(h){h=a(h);
var g=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return g?"rgb("+parseInt(g[1],16)+", "+parseInt(g[2],16)+", "+parseInt(g[3],16)+")":null
}},{"./shortToLongHex":541}],528:[function(c,f,b){var h=c("./isRgb");var g=c("./isRgba");
var a=c("./isHex");f.exports=function d(j){return a(j)||h(j)||g(j)}},{"./isHex":529,"./isRgb":530,"./isRgba":531}],529:[function(c,d,b){d.exports=function a(g){var f=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
return f.test(g)}},{}],530:[function(b,c,a){c.exports=function d(g){var f=/^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
return f.exec(g)!==null}},{}],531:[function(b,c,a){c.exports=function d(g){var f=/^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
return f.exec(g)!==null}},{}],532:[function(d,f,c){var b=d("./isHex");var a=d("./hexToRgb");
var h=d("./rgbToObject");f.exports=function g(o,n,m){o=b(o)?a(o):o;n=b(n)?a(n):n;
o=h(o);n=h(n);var l=o.r+((n.r-o.r)*m);var k=o.g+((n.g-o.g)*m);var j=o.b+((n.b-o.b)*m);
return"rgb("+Math.round(l)+", "+Math.round(k)+", "+Math.round(j)+")"}},{"./hexToRgb":527,"./isHex":529,"./rgbToObject":538}],533:[function(b,c,a){var d=b("./rgbToObject");
c.exports=function f(g){var h=d(g);return[h.r,h.g,h.b]}},{"./rgbToObject":538}],534:[function(d,f,b){var c=d("./hexToDecimal");
var h=d("./rgbToArray");var g=d("./rgbToHex");f.exports=function a(j){var k=g.apply(this,h(j));
return c(k)}},{"./hexToDecimal":526,"./rgbToArray":533,"./rgbToHex":535}],535:[function(b,c,a){c.exports=function d(j,h,f){return"#"+((1<<24)+(j<<16)+(h<<8)+f).toString(16).slice(1)
}},{}],536:[function(c,d,b){d.exports=function a(f,n,p){if(arguments.length!==3){return false
}f/=255;n/=255;p/=255;var q=Math.max(f,n,p);var k=Math.min(f,n,p);var o=q+k;var t=q-k;
var m;var u;var j=(o/2);if(q===k){m=u=0}else{u=j>0.5?t/(2-q-k):t/o;switch(q){case f:m=(n-p)/t;
break;case n:m=2+((p-f)/t);break;case p:m=4+((f-n)/t);break}m*=60;if(m<0){m+=360
}}return([m,Math.round(100*u),Math.round(100*j)])}},{}],537:[function(c,d,a){d.exports=function b(f,n,o){if(arguments.length!==3){return false
}var j=f/255;var k=n/255;var q=o/255;var p=Math.max(j,k,q);var l=Math.min(j,k,q);
var m;var w;var u=p;var t=p-l;w=p===0?0:t/p;if(p===l){m=0}else{switch(p){case j:m=(k-q)/t+(k<q?6:0);
break;case k:m=(q-j)/t+2;break;case q:m=(j-k)/t+4;break}m/=6}return[Math.round(360*m),Math.round(100*w),Math.round(100*u)]
}},{}],538:[function(b,c,a){c.exports=function d(g){var h=/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
var f=h.exec(g);return{r:Number(f[1]),g:Number(f[2]),b:Number(f[3])}}},{}],539:[function(b,c,a){var f=b("./rgbaToObject");
c.exports=function d(g){var h=f(g);return[h.r,h.g,h.b,h.a]}},{"./rgbaToObject":540}],540:[function(b,c,a){c.exports=function d(g){var h=/rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/;
var f=h.exec(g);return{r:Number(f[1]),g:Number(f[2]),b:Number(f[3]),a:Number(f[4])}
}},{}],541:[function(c,d,b){d.exports=function a(g){var f=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;
g=g.replace(f,function(j,l,k,h){return"#"+l+l+k+k+h+h});return g}},{}],542:[function(b,c,a){c.exports={Bar:b("./ac-graph/Bar"),CurvedLine:b("./ac-graph/CurvedLine"),Donut:b("./ac-graph/Donut")}
},{"./ac-graph/Bar":543,"./ac-graph/CurvedLine":544,"./ac-graph/Donut":545}],543:[function(d,f,b){var c=d("ac-clip").Clip;
var j=d("ac-clock");var h=d("ac-color").Color;function a(l,k){try{this.resolutionFactor=(!!window.devicePixelRatio)?Math.ceil(window.devicePixelRatio):1;
this.el=l;this.set(k)}catch(m){console.log("Bar graph failure: "+m);return}}var g=a.prototype;
g.play=function(){if(this.clips&&this.clips.length>0){var n;for(var m=0,k=this.clips.length;
m<k;m+=1){n=this.clips[m];n.play()}}};g.set=function(m){this.options=m||{};this.clock=this.options.clock||j;
if(!this.options.bars){throw"No graph data provided"}this.calcHeight=(this.options.bars.length*this.options.barHeight)+(this.options.bars.length*this.options.barMargin*2);
this.width=this.options.width||this._getSizeFromEl().width;this.height=this.options.height||this.calcHeight;
if(this.canvas){this.context.clearRect(0,0,this.width,this.height)}else{this.canvas=this.options.canvas||this._createCanvas()
}if(!!this.canvas.getContext("2d")){this.context=this.canvas.getContext("2d")}else{throw"Canvas not supported"
}this.canvas.width=this.width*this.resolutionFactor;this.canvas.height=this.height*this.resolutionFactor;
this.context.scale(this.resolutionFactor,this.resolutionFactor);this.options.barHeight=this.options.barHeight||10;
this.options.barMargin=this.options.barMargin||this.options.barHeight;this.options.duration=this.options.duration||1;
this.options.verticalRule=this.options.verticalRule||{};this.options.verticalRule.lineWidth=this.options.verticalRule.lineWidth||2;
this.options.verticalRule.color=this.options.verticalRule.color||"#ddd";this.options.verticalRule.number=this.options.verticalRule.number||5;
for(var n=0,l=this.options.bars.length;n<l;n++){this.options.bars[n].percent=this.options.bars[n].percent||0.5;
this.options.bars[n].colorStart=this.options.bars[n].colorStart||"#ccc";this.options.bars[n].colorEnd=this.options.bars[n].colorEnd||"#777"
}this.options.padding=this.options.padding||this.options.verticalRule.lineWidth/2;
this.points=[];var p={_progress:0};var o={_progress:1};var k=new c(p,this.options.duration,o,{onDraw:this._onDraw.bind(this),onStart:this.options.onStart,onUpdate:this.options.onUpdate,onComplete:this.options.onComplete});
this.clips=[];this.clips.push(k)};g._barWidth=function(k){return(this.width-(this.options.padding*2))*k
};g._createCanvas=function(){var k=document.createElement("canvas");this.el.appendChild(k);
return k};g._getGradient=function(l){var n=this.context.createLinearGradient(this._x(0),0,this._x(l.percent),0);
var k=new h(l.colorStart);var m=new h(l.colorEnd);n.addColorStop(0,k.rgb());n.addColorStop(1,m.rgb());
return n};g._getSizeFromEl=function(){return{height:this.el.offsetHeight,width:this.el.offsetWidth}
};g._onDraw=function(r){var u=r.target;var v=this.context;v.clearRect(0,0,this.canvas.width,this.canvas.height);
v.save();for(var n=0,k=this.options.verticalRule.number;n<k;n++){var s=this.options.verticalRule;
if(s.number>0){var o=this._x(n/(k-1));v.beginPath();v.strokeStyle=s.color;v.lineWidth=s.lineWidth;
v.moveTo(o,this._y(0));v.lineTo(o,this._y(1));v.stroke()}}for(var t=0,p=this.options.bars.length;
t<p;t++){var q=this.options.bars[t];var m=((t*2+1)*this.options.barMargin)+(t*this.options.barHeight);
v.fillStyle=this._getGradient(q);v.fillRect(this._x(0),m,this._barWidth(q.percent)*u._progress,this.options.barHeight)
}v.restore()};g._x=function(k){return(this.width-(this.options.padding*2))*k+this.options.padding
};g._y=function(k){return this.height*(1-k)};f.exports=a},{"ac-clip":281,"ac-clock":283,"ac-color":522}],544:[function(d,c,f){var k=d("ac-clip").Clip;
var a=d("ac-clock");var b=d("ac-color").Color;var j=d("./curvedLine/spline");function g(m,l){try{this.resolutionFactor=(!!window.devicePixelRatio)?Math.ceil(window.devicePixelRatio):1;
this.el=m;this.set(l);this._drawThesePieces(this.drawOnEvent.load,{_progress:1,atPoint:this.points.length})
}catch(n){console.log("Curved line graph failure: "+n);return}}var h=g.prototype;
h.play=function(){if(this.clips&&this.clips.length>0){for(var n=0,m=this.clips.length;
n<m;n++){this.clips[n].play()}}};h.set=function(m){this.options=m||{};this.clock=this.options.clock||a;
if(!this.options.graphData){throw"No graph data provided"}this.graphData=this.options.graphData;
this.duration=this.options.duration||2;this.drawOnEvent={none:[],load:[],play:[]};
this.width=this.options.width||this._getSizeFromEl().width;this.height=this.options.height||this._getSizeFromEl().height;
if(this.canvas){this.context.clearRect(0,0,this.width,this.height)}else{this.canvas=this.options.canvas||this._createCanvas()
}if(!!this.canvas.getContext("2d")){this.context=this.canvas.getContext("2d")}else{throw"Canvas not supported"
}this.canvas.width=this.width*this.resolutionFactor;this.canvas.height=this.height*this.resolutionFactor;
this.context.scale(this.resolutionFactor,this.resolutionFactor);this.options.spline=this.options.spline||{};
this.options.spline.draw=this.options.spline.draw||"play";this.drawOnEvent[this.options.spline.draw].push("spline");
this.options.spline.tension=this.options.spline.tension||0.4;this.options.spline.lineWidth=this.options.spline.lineWidth||2.5;
this.options.spline.colorStart=this.options.spline.colorStart?this.options.spline.colorStart:"rgb(214,214,214)";
this.options.spline.colorEnd=this.options.spline.colorEnd?this.options.spline.colorEnd:"rgb(0,0,0)";
this.options.splineDots=this.options.splineDots||{};this.options.splineDots.draw=this.options.splineDots.draw||"play";
this.drawOnEvent[this.options.splineDots.draw].push("splineDots");this.options.splineDots.show=this.options.splineDots.show||"all";
this.options.splineDots.size=this.options.splineDots.size||8;this.options.splineDots.fillColor=this.options.splineDots.fillColor||"matchSpline";
this.options.splineDots.strokeColor=this.options.splineDots.strokeColor||"transparent";
this.options.splineDots.strokeWidth=this.options.splineDots.strokeWidth||0;this.options.xAxis=this.options.xAxis||{};
this.options.xAxis.draw=this.options.xAxis.draw||"load";this.drawOnEvent[this.options.xAxis.draw].push("xAxis");
this.options.xAxis.show=this.options.xAxis.show||"all";this.options.xAxis.lineWidth=this.options.xAxis.lineWidth||1.5;
this.options.xAxis.color=this.options.xAxis.color||"#d2d2d2";this.options.verticalRule=this.options.verticalRule||{};
this.options.verticalRule.draw=this.options.verticalRule.draw||"play";this.drawOnEvent[this.options.verticalRule.draw].push("verticalRule");
this.options.verticalRule.lineWidth=this.options.verticalRule.lineWidth||1.5;this.options.verticalRule.color=this.options.verticalRule.color||"#f7f7f7";
this.options.verticalRule.lineLength=this.options.verticalRule.lineLength||"toSpline";
this.options.xDots=this.options.xDots||{};this.options.xDots.draw=this.options.xDots.draw||"play";
this.drawOnEvent[this.options.xDots.draw].push("xDots");this.options.xDots.size=this.options.xDots.size||4;
this.options.xDots.fillColor=this.options.xDots.fillColor||"#d2d2d2";this.options.xDots.strokeColor=this.options.xDots.strokeColor||"transparent";
this.options.xDots.strokeWidth=this.options.xDots.strokeWidth||0;this.options.padding=this.options.padding||this.options.splineDots.size;
this.points=[];this._calculateGraphData();var o={_progress:0,atPoint:0};var n={_progress:1,atPoint:this.points.length};
var l=new k(o,this.duration,n,{onDraw:this._onDraw.bind(this),onStart:this.options.onStart,onUpdate:this.options.onUpdate,onComplete:this.options.onComplete});
this.clips=[];this.clips.push(l)};h._calculateGraphData=function(){var n;var m;
var p;var o;var l=this.graphData.length-1;this.lineData=[];for(o=0;o<=l;o+=1){n=this.graphData[o];
p=(o/l);m={x:this._x(p),y:this._y(n),percent:n};this.points.push(m);this.lineData.push(this.points[o].x);
this.lineData.push(this.points[o].y)}this.universalGradient=this._getGradient(this.options.spline.colorStart,this.options.spline.colorEnd,1)
};h._createCanvas=function(){var l=document.createElement("canvas");this.el.appendChild(l);
return l};h._drawThesePieces=function(n,o){for(var p=0,m=n.length;p<m;p++){this[n[p]](o)
}};h._getColor=function(l){switch(l){case"matchSpline":return this.universalGradient;
case"transparent":return l;default:return new b(l).rgb()}};h._getGradient=function(q,r,p){var s=this.context.createLinearGradient(this._x(0),this._y(0),this._x(1),this._y(1));
var n=new b(q);var m=new b(r);s.addColorStop(0,n.rgba());s.addColorStop(p,m.rgba());
var l=p+0.001;if(l<1){var o=new b(r);o.setAlpha(0);s.addColorStop(l,o.rgba())}return s
};h._getSizeFromEl=function(){return{height:this.el.offsetHeight,width:this.el.offsetWidth}
};h._onDraw=function(l){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
this.context.save();this._drawThesePieces(this.drawOnEvent.load,{_progress:1,atPoint:this.points.length});
this._drawThesePieces(this.drawOnEvent.play,l.target);this.context.restore()};h._x=function(l){return(this.width-(this.options.padding*2))*l+this.options.padding
};h._y=function(l){return(this.height-(this.options.padding*2))*(1-l)+this.options.padding
};h.spline=function(m){var n=(m._progress<1)?this._getGradient(this.options.spline.colorStart,this.options.spline.colorEnd,m._progress):this.universalGradient;
this.context.globalCompositeOperation="source-over";this.context.beginPath();var l=j.getCurvePoints(this.lineData,this.options.spline.tension,false,32);
j.drawLines(this.context,l);this.context.lineWidth=this.options.spline.lineWidth;
this.context.lineCap="round";this.context.strokeStyle=n;this.context.stroke()};
h.splineDots=function(o){var q=this.options.splineDots;var n=(o.atPoint<this.points.length)?Math.floor(o.atPoint):this.points.length;
for(var p=0;p<n;p++){var m=this.points[p];if((q.show==="all")||(q.show==="ends"&&(p===0||p===this.points.length-1))){this._drawCircle({x:m.x,y:m.y,size:q.size,fillColor:this._getColor(q.fillColor),strokeColor:this._getColor(q.strokeColor),strokeWidth:q.strokeWidth})
}}};h.xAxis=function(l){this.context.globalCompositeOperation="destination-over";
this.context.beginPath();this.context.strokeStyle=this._getColor(this.options.xAxis.color);
this.context.lineWidth=this.options.xAxis.lineWidth;this.context.moveTo(this._x(0),this._y(0));
this.context.lineTo(this._x(1*l._progress),this._y(0));this.context.stroke()};h.xDots=function(p){var o=this.options.xDots;
var n=(p.atPoint<this.points.length)?Math.floor(p.atPoint)+1:this.points.length;
for(var q=0;q<n;q++){var m=this.points[q];this.context.globalCompositeOperation="source-over";
this._drawCircle({x:m.x,y:this._y(0),size:o.size,fillColor:this._getColor(o.fillColor),strokeColor:this._getColor(o.strokeColor),strokeWidth:o.strokeWidth})
}};h.verticalRule=function(o){var q=this.options.verticalRule;var n=(o.atPoint<this.points.length)?Math.floor(o.atPoint)+1:this.points.length;
for(var p=0;p<n;p++){var m=this.points[p];var s=(Math.floor(o.atPoint)==p)?o.atPoint-p:1;
var r=(q.lineLength==="full")?this._y(1*s):this._y(m.percent*s);this.context.globalCompositeOperation="destination-over";
this.context.beginPath();this.context.strokeStyle=this._getColor(q.color);this.context.lineWidth=q.lineWidth;
this.context.moveTo(m.x,this._y(0));this.context.lineTo(m.x,r);this.context.stroke()
}};h._drawCircle=function(m){var l=this.context;l.beginPath();l.arc(m.x,m.y,m.size/2,0,Math.PI*2);
l.fillStyle=m.fillColor;l.fill();if(m.strokeWidth>0){l.strokeStyle=m.strokeColor;
l.lineWidth=m.strokeWidth;l.stroke()}};c.exports=g},{"./curvedLine/spline":546,"ac-clip":281,"ac-clock":283,"ac-color":522}],545:[function(c,d,a){var b=c("ac-clip").Clip;
var j=c("ac-clock");var h=c("ac-color").Color;function f(l,k){try{this.resolutionFactor=(!!window.devicePixelRatio)?Math.ceil(window.devicePixelRatio):1;
this.el=l;this.set(k)}catch(m){console.log("Donut graph failure: "+m);return}}var g=f.prototype;
g.convert={_degreesToAngle:function(k){return k*(Math.PI/180)}};g.play=function(){if(this.segments&&this.segments.length>0){this.clock.on("draw",this._onDraw);
if(!this.clock.isRunning()){this.clock.start()}var k=this.segments.length;while(k--){this.segments[k].clip.play()
}}};g.set=function(k){this.options=k||{};this.clock=this.options.clock||j;if(!this.options.segments){throw"No graph data provided"
}this.size=this.options.size||this._getSizeFromEl();this.centerPoint=this.size/2;
if(this.canvas){this.context.clearRect(0,0,this.size,this.size)}else{this.canvas=this.options.canvas||this._createCanvas()
}if(!!this.canvas.getContext("2d")){this.context=this.canvas.getContext("2d")}else{throw"Canvas not supported"
}this.canvas.setAttribute("class","donut-graph-canvas");this.segments=this.options.segments;
this.canvas.width=this.size*this.resolutionFactor;this.canvas.height=this.size*this.resolutionFactor;
this.context.scale(this.resolutionFactor,this.resolutionFactor);this._onDraw=this._onDraw.bind(this);
for(var l=0;l<this.segments.length;l++){this.segments[l].color=this.segments[l].color||"#ccc";
this.segments[l].color=new h(this.segments[l].color).rgb();this.segments[l].delay=this.segments[l].delay||0;
this.segments[l].duration=this.segments[l].duration||0.5;this.segments[l].easing=this.segments[l].easing||"easeInOutQuint";
this.segments[l].label=this.segments[l].label||"";this.segments[l].lineWidth=this.segments[l].lineWidth||2;
this.segments[l].percent=this.segments[l].percent||1;this.segments[l].size=this.segments[l].size||this.size;
var o=(this.segments[l].startAngle||0)-90;this.segments[l].startAngle=this.convert._degreesToAngle(o);
this.segments[l].endAngle=this.convert._degreesToAngle(o+(360*(this.segments[l].percent)));
var n={_progress:0,_endAngle:this.segments[l].startAngle};var m={_progress:1,_endAngle:this.segments[l].endAngle};
this.segments[l].clip=new b(n,this.segments[l].duration,m,{ease:this.segments[l].easing,delay:this.segments[l].delay,clock:this.clock,onStart:this.segments[l].onStart,onUpdate:this.segments[l].onUpdate,onComplete:this.segments[l].onComplete})
}};g._createCanvas=function(){var k=document.createElement("canvas");this.el.appendChild(k);
return k};g._drawArc=function(l,o,n,k,m){this.context.lineWidth=k;this.context.beginPath();
this.context.strokeStyle=m;this.context.arc(this.centerPoint,this.centerPoint,(n*0.5)-(k*0.5),l,o);
this.context.stroke()};g._getSizeFromEl=function(){return Math.min(this.el.offsetWidth,this.el.offsetHeight)
};g._onDraw=function(n){this.context.clearRect(0,0,this.size,this.size);var l,m=false;
for(var k=0;k<this.segments.length;k++){l=this.segments[k];if(l.clip.isPlaying()&&!m){m=true
}if(l.label){l.label.innerHTML=Math.round(l.percent*l.clip._progress*100)}this._drawArc(l.startAngle,l.clip._target._endAngle,l.size,l.lineWidth,l.color)
}if(!m){this.clock.off("draw",this._onDraw)}};d.exports=f},{"ac-clip":281,"ac-clock":283,"ac-color":522}],546:[function(b,c,a){
/*!
 *      Smooth curves on canvas version 1.3
 *
 *      By Ken Fyrstenberg Nilsen (c) 2013
 *      Abdias Software, http://abdiassoftware.com/
 *
 *      MIT licensed.
*/
var f=function(L,p,B,z){p=typeof p==="number"?p:0.5;
z=typeof z==="number"?z:16;var m,M=[],s,r,o,E,n,C,G,F,D,A,H,w,J,u,v,I,q,l,k,j,h,K=L.length;
m=L.concat();m.unshift(L[1]);m.unshift(L[0]);m.push(L[K-2],L[K-1]);for(J=2;J<K;
J+=2){l=m[J];k=m[J+1];j=m[J+2];h=m[J+3];o=(j-m[J-2])*p;E=(m[J+4]-l)*p;n=(h-m[J-1])*p;
C=(m[J+5]-k)*p;for(w=0;w<=z;w+=1){H=w/z;v=Math.pow(H,2);u=v*H;q=v*3;I=u*2;G=I-q+1;
F=q-I;D=u-2*v+H;A=u-v;s=G*l+F*j+D*o+A*E;r=G*k+F*h+D*n+A*C;M.push(s,r)}}return M
};var g=function(j,m){var k,h;j.moveTo(m[0],m[1]);for(k=2,h=m.length-1;k<h;k+=2){j.lineTo(m[k],m[k+1])
}};var d=function(k,n,p,q,h,m){m=m||false;var o,j;k.beginPath();g(k,f(n,p,q,h));
if(m){k.stroke();k.beginPath();for(o=0,j=n.length;o<j;o+=2){k.rect(n[o]-2,n[o+1]-2,4,4)
}}};c.exports={drawCurve:d,drawLines:g,getCurvePoints:f}},{}],547:[function(b,c,a){c.exports={MotionEmitter:b("./ac-motion-emitter/MotionEmitter")}
},{"./ac-motion-emitter/MotionEmitter":548}],548:[function(d,f,b){var h=d("ac-event-emitter-micro").EventEmitterMicro,a=d("ac-object"),j=d("ac-clock");
function c(k){h.call(this);this.options=k||{};this.min=this.options.min||0;this.max=this.options.max||1;
this._boundHandleClockUpdate=this._handleClockUpdate.bind(this);this._boundHandleClockDraw=this._handleClockDraw.bind(this);
if(this.options.easingFunction){this.easingFunction=this.options.easingFunction
}this.clock=this.options.clock||j;this.usesSharedClock=(this.clock===j);this._isRunning=false;
this.specificity=this.options.specificity||4;this.friction=this.options.friction||10;
this._targetValue=null;this._currentValue=null;this._shouldUpdate=false;this._shouldEmitChange=false
}var g=c.prototype=a.create(h.prototype);g.destroy=function(){this.trigger("destroy");
this.stop();this.off();if(!this.usesSharedClock){this.clock.destroy()}var k;for(k in this){if(this.hasOwnProperty(k)){this[k]=null
}}this._isRunning=false};g.start=function(){if(!this.clock||this._isRunning){return
}this._bindEvents();this._isRunning=true;this.clock.start()};g.stop=function(){if(!this.clock||!this._isRunning){return
}this._unbindEvents();this._isRunning=false;if(!this.usesSharedClock){this.clock.stop()
}};g.isRunning=function(){return this._isRunning};g.setProgress=function(k){if(this._targetValue===k){return
}this._targetValue=k;this._shouldUpdate=true};g.updateValue=function(p){if(this._currentValue===null){this._currentValue=this._targetValue
}var o=1;if(this.easingFunction){var t=this.max-this.min,u=this.max-(this.max-this._targetValue)/t,q=this.max-(this.max-this._currentValue)/t,k=1-Math.abs(u-q),r=this.easingFunction(k,0,1,1);
o=1+(r-k)}var s=1;if(p&&p.naturalFps!==p.fps){s=p.naturalFps/p.fps}var l=this._targetValue-this._currentValue,m=l*o*s*(1/this.friction),n=parseFloat((this._currentValue+m).toFixed(this.specificity));
if(n===this._currentValue){this._currentValue=this._targetValue}else{this._currentValue=n
}this._shouldEmitChange=true};g._bindEvents=function(){this.clock.on("update",this._boundHandleClockUpdate);
this.clock.on("draw",this._boundHandleClockDraw)};g._unbindEvents=function(){this.clock.off("update",this._boundHandleClockUpdate);
this.clock.off("draw",this._boundHandleClockDraw)};g._handleClockUpdate=function(k){if(this._shouldUpdate){this.updateValue(k)
}if(!this._shouldEmitChange){return}k.progress=this._currentValue;this.trigger("update",k)
};g._handleClockDraw=function(k){if(!this._shouldEmitChange){return}k.progress=this._currentValue;
this.trigger("draw",k);if(this._targetValue===this._currentValue){this._shouldUpdate=false;
this._shouldEmitChange=false;return}this._shouldUpdate=true};f.exports=c},{"ac-clock":283,"ac-event-emitter-micro":478,"ac-object":554}],549:[function(c,d,b){c("ac-polyfills/Array/isArray");
var h=c("./extend");var a=Object.prototype.hasOwnProperty;var f=function(j,k){var l;
for(l in k){if(a.call(k,l)){if(k[l]===null){j[l]=null}else{if(typeof k[l]==="object"){j[l]=Array.isArray(k[l])?[]:{};
f(j[l],k[l])}else{j[l]=k[l]}}}}return j};d.exports=function g(k,j){if(j){return f({},k)
}return h({},k)}},{"./extend":552,"ac-polyfills/Array/isArray":560}],550:[function(b,c,a){arguments[4][398][0].apply(a,arguments)
},{dup:398}],551:[function(b,c,a){arguments[4][399][0].apply(a,arguments)},{"./extend":552,dup:399}],552:[function(c,d,b){c("ac-polyfills/Array/prototype.forEach");
var a=Object.prototype.hasOwnProperty;d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]
}else{h=[].slice.call(arguments)}g=h.shift();h.forEach(function(k){if(k!=null){for(var j in k){if(a.call(k,j)){g[j]=k[j]
}}}});return g}},{"ac-polyfills/Array/prototype.forEach":563}],553:[function(b,c,a){arguments[4][401][0].apply(a,arguments)
},{dup:401}],554:[function(b,c,a){c.exports={clone:b("./clone"),create:b("./create"),defaults:b("./defaults"),extend:b("./extend"),getPrototypeOf:b("./getPrototypeOf"),isDate:b("./isDate"),isEmpty:b("./isEmpty"),isRegExp:b("./isRegExp"),toQueryParameters:b("./toQueryParameters")}
},{"./clone":549,"./create":550,"./defaults":551,"./extend":552,"./getPrototypeOf":553,"./isDate":555,"./isEmpty":556,"./isRegExp":557,"./toQueryParameters":559}],555:[function(b,c,a){arguments[4][402][0].apply(a,arguments)
},{dup:402}],556:[function(b,c,a){arguments[4][403][0].apply(a,arguments)},{dup:403}],557:[function(b,c,a){arguments[4][404][0].apply(a,arguments)
},{dup:404}],558:[function(b,c,a){arguments[4][142][0].apply(a,arguments)},{dup:142}],559:[function(b,c,a){arguments[4][405][0].apply(a,arguments)
},{dup:405,qs:558}],560:[function(b,c,a){if(!Array.isArray){Array.isArray=function(d){return Object.prototype.toString.call(d)==="[object Array]"
}}},{}],561:[function(b,c,a){if(!Array.prototype.every){Array.prototype.every=function d(k,j){var h=Object(this);
var f=h.length>>>0;var g;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(g=0;g<f;g+=1){if(g in h&&!k.call(j,h[g],g,h)){return false}}return true}}},{}],562:[function(b,c,a){if(!Array.prototype.filter){Array.prototype.filter=function d(l,k){var j=Object(this);
var f=j.length>>>0;var h;var g=[];if(typeof l!=="function"){throw new TypeError(l+" is not a function")
}for(h=0;h<f;h+=1){if(h in j&&l.call(k,j[h],h,j)){g.push(j[h])}}return g}}},{}],563:[function(b,c,a){if(!Array.prototype.forEach){Array.prototype.forEach=function d(k,j){var h=Object(this);
var f;var g;if(typeof k!=="function"){throw new TypeError("No function object passed to forEach.")
}for(f=0;f<this.length;f+=1){g=h[f];k.call(j,g,f,h)}}}},{}],564:[function(b,c,a){if(!Array.prototype.indexOf){Array.prototype.indexOf=function d(g,h){var j=h||0;
var f=0;if(j<0){j=this.length+h-1;if(j<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(f=0;f<this.length;f++){if(this[f]===g){return f}}return(-1)}}},{}],565:[function(b,c,a){(function(){var d=Array.prototype.slice;
try{d.call(document.documentElement)}catch(f){Array.prototype.slice=function(n,j){j=(typeof j!=="undefined")?j:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return d.call(this,n,j)
}var l,h=[],k,g=this.length;var o=n||0;o=(o>=0)?o:g+o;var m=(j)?j:g;if(j<0){m=g+j
}k=m-o;if(k>0){h=new Array(k);if(this.charAt){for(l=0;l<k;l++){h[l]=this.charAt(o+l)
}}else{for(l=0;l<k;l++){h[l]=this[o+l]}}}return h}}}())},{}],566:[function(b,c,a){if(!Array.prototype.some){Array.prototype.some=function d(k,j){var g=Object(this);
var f=g.length>>>0;var h;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(h=0;h<f;h+=1){if(h in g&&k.call(j,g[h],h,g)===true){return true}}return false
}}},{}],567:[function(b,c,a){if(document.createEvent){try{new window.CustomEvent("click")
}catch(d){window.CustomEvent=(function(){function f(h,j){j=j||{bubbles:false,cancelable:false,detail:undefined};
var g=document.createEvent("CustomEvent");g.initCustomEvent(h,j.bubbles,j.cancelable,j.detail);
return g}f.prototype=window.Event.prototype;return f}())}}},{}],568:[function(b,c,a){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self){if(!("classList" in document.createElement("_"))){(function(o){if(!("Element" in o)){return
}var d="classList",k="prototype",r=o.Element[k],f=Object,p=String[k].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},g=Array[k].indexOf||function(v){var u=0,t=this.length;for(;u<t;u++){if(u in this&&this[u]===v){return u
}}return -1},s=function(t,u){this.name=t;this.code=DOMException[t];this.message=u
},l=function(u,t){if(t===""){throw new s("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(t)){throw new s("INVALID_CHARACTER_ERR","String contains an invalid character")
}return g.call(u,t)},h=function(x){var w=p.call(x.getAttribute("class")||""),v=w?w.split(/\s+/):[],u=0,t=v.length;
for(;u<t;u++){this.push(v[u])}this._updateClassName=function(){x.setAttribute("class",this.toString())
}},j=h[k]=[],n=function(){return new h(this)};s[k]=Error[k];j.item=function(t){return this[t]||null
};j.contains=function(t){t+="";return l(this,t)!==-1};j.add=function(){var x=arguments,w=0,u=x.length,v,t=false;
do{v=x[w]+"";if(l(this,v)===-1){this.push(v);t=true}}while(++w<u);if(t){this._updateClassName()
}};j.remove=function(){var y=arguments,x=0,u=y.length,w,t=false,v;do{w=y[x]+"";
v=l(this,w);while(v!==-1){this.splice(v,1);t=true;v=l(this,w)}}while(++x<u);if(t){this._updateClassName()
}};j.toggle=function(u,v){u+="";var t=this.contains(u),w=t?v!==true&&"remove":v!==false&&"add";
if(w){this[w](u)}if(v===true||v===false){return v}else{return !t}};j.toString=function(){return this.join(" ")
};if(f.defineProperty){var q={get:n,enumerable:true,configurable:true};try{f.defineProperty(r,d,q)
}catch(m){if(m.number===-2146823252){q.enumerable=false;f.defineProperty(r,d,q)
}}}else{if(f[k].__defineGetter__){r.__defineGetter__(d,n)}}}(self))}else{(function(){var f=document.createElement("_");
f.classList.add("c1","c2");if(!f.classList.contains("c2")){var g=function(j){var h=DOMTokenList.prototype[j];
DOMTokenList.prototype[j]=function(m){var l,k=arguments.length;for(l=0;l<k;l++){m=arguments[l];
h.call(this,m)}}};g("add");g("remove")}f.classList.toggle("c3",false);if(f.classList.contains("c3")){var d=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(h,j){if(1 in arguments&&!this.contains(h)===!j){return j
}else{return d.call(this,h)}}}f=null}())}}},{}],569:[function(b,c,a){if(!Object.create){var d=function(){};
Object.create=function(f){if(arguments.length>1){throw new Error("Second argument not supported")
}if(f===null||typeof f!=="object"){throw new TypeError("Object prototype may only be an Object.")
}d.prototype=f;return new d()}}},{}],570:[function(b,c,a){window.matchMedia=window.matchMedia||(function(j,k){var g,d=j.documentElement,f=d.firstElementChild||d.firstChild,h=j.createElement("body"),l=j.createElement("div");
l.id="mq-test-1";l.style.cssText="position:absolute;top:-100em";h.style.background="none";
h.appendChild(l);return function(m){l.innerHTML='&shy;<style media="'+m+'"> #mq-test-1 { width:42px; }</style>';
d.insertBefore(h,f);g=l.offsetWidth===42;d.removeChild(h);return{matches:g,media:m}
}}(document))},{}],571:[function(b,c,a){arguments[4][279][0].apply(a,arguments)
},{"./ac-event-emitter/EventEmitter":572,dup:279}],572:[function(b,c,a){arguments[4][280][0].apply(a,arguments)
},{dup:280}],573:[function(b,c,a){arguments[4][142][0].apply(a,arguments)},{dup:142}],574:[function(b,c,a){arguments[4][396][0].apply(a,arguments)
},{"./ac-object/clone":575,"./ac-object/create":576,"./ac-object/defaults":577,"./ac-object/extend":578,"./ac-object/getPrototypeOf":579,"./ac-object/isDate":580,"./ac-object/isEmpty":581,"./ac-object/isRegExp":582,"./ac-object/toQueryParameters":583,dup:396}],575:[function(b,c,a){arguments[4][397][0].apply(a,arguments)
},{"./extend":578,dup:397}],576:[function(b,c,a){arguments[4][398][0].apply(a,arguments)
},{dup:398}],577:[function(b,c,a){arguments[4][399][0].apply(a,arguments)},{"./extend":578,dup:399}],578:[function(b,c,a){arguments[4][400][0].apply(a,arguments)
},{dup:400}],579:[function(b,c,a){arguments[4][401][0].apply(a,arguments)},{dup:401}],580:[function(b,c,a){arguments[4][402][0].apply(a,arguments)
},{dup:402}],581:[function(b,c,a){arguments[4][403][0].apply(a,arguments)},{dup:403}],582:[function(b,c,a){arguments[4][404][0].apply(a,arguments)
},{dup:404}],583:[function(b,c,a){arguments[4][405][0].apply(a,arguments)},{dup:405,qs:573}],584:[function(b,c,a){c.exports={BreakpointsDelegate:b("./ac-breakpoints-delegate/BreakpointsDelegate")}
},{"./ac-breakpoints-delegate/BreakpointsDelegate":585}],585:[function(f,b,k){var d=f("ac-shared-instance").SharedInstance,g=f("ac-object"),r=f("ac-window-delegate").WindowDelegate,c=f("ac-window-delegate").WindowDelegateCustomEvent,q=f("ac-event-emitter").EventEmitter;
var n="ac-breakpoints-delegate:BreakpointsDelegate",a="2.0.0-2";var o="breakpoint",p="resize orientationchange";
var h={large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288,"max-device-width":768}};
var j={minWidth:"min-width",maxWidth:"max-width",maxDeviceWidth:"max-device-width",content:"content",oldIE:"oldie"};
function m(s){this._customEvent=new c(o,this._onBreakpointListenerAdded.bind(this),this._onBreakpointListenerRemoved.bind(this));
this.setBreakpoints(h)}var l=m.prototype;l.initialize=function(){this._breakpoint=null;
this._lastBreakpoint=null;this._handleOldIE();this._handleDevices();this._breakpointOrder=this._setBreakpointOrder();
if(!this._isOldIE){this._handleResize()}};l.getCustomEvent=function(){return this._customEvent
};l.getBreakpoint=function(){if(!this._customEvent.active){this._handleResize()
}return this._breakpoint};l.setBreakpoints=function(s){this.breakpoints=g.clone(s);
this.initialize()};l._handleResize=function(){var w=r.innerWidth(),x;var v,u,t,s=this._breakpointOrder.length;
for(v=0;v<s;v++){u=this._breakpointOrder[v];t=this.breakpoints[u];if(t._breakPosition>w){break
}}if(v>0){v=v-1}x=this.breakpoints[this._breakpointOrder[v]];if(!this._breakpoint){this._breakpoint=x;
return}if(x.name===this._breakpoint.name){return}this._lastBreakpoint=this._breakpoint;
this._breakpoint=x;r.trigger(o,{incoming:this._breakpoint,outgoing:this._lastBreakpoint})
};l._setBreakpointOrder=function(){var w=0,t=[],s=[],v=j.minWidth,u;for(u in this.breakpoints){if(this.breakpoints.hasOwnProperty(u)){this.breakpoints[u].name=u;
t.push(this.breakpoints[u][v])}}t.sort(function(y,x){return y-x});t.forEach(function(y){var x;
for(x in this.breakpoints){if(this.breakpoints.hasOwnProperty(x)){if(this.breakpoints[x][v]===y){s.push(x)
}}}},this);s.forEach(function(y,x){this.breakpoints[y]._breakPosition=w;if(s[x+1]){w=this.breakpoints[s[x+1]][v]
}},this);return s};l._handleOldIE=function(){var s=document.documentElement,u=j.oldIE;
if(s.className.indexOf("no-"+u)>-1||s.className.indexOf(u)===-1){return}this._isOldIE=true;
this._replaceBreakpoints(function(v){return v[u]===true});var t;for(t in this.breakpoints){if(this.breakpoints.hasOwnProperty(t)){this._breakpoint=this.breakpoints[t];
return}}};l._handleDevices=function(){var s=j.maxDeviceWidth;this._replaceBreakpoints(function(t){if(typeof t[s]!=="number"){return true
}if(window.screen&&window.screen.width<=t[s]){return true}return false})};l._replaceBreakpoints=function(v){var t,u={},s;
for(t in this.breakpoints){if(this.breakpoints.hasOwnProperty(t)){s=this.breakpoints[t];
if(v(s)){u[t]=g.clone(this.breakpoints[t])}}}this.breakpoints=u};l._onBreakpointListenerAdded=function(){r.on(p,this._handleResize,this)
};l._onBreakpointListenerRemoved=function(){r.off(p,this._handleResize,this)};b.exports=d.share(n,a,m)
},{"ac-event-emitter":571,"ac-object":574,"ac-shared-instance":586,"ac-window-delegate":623}],586:[function(b,c,a){arguments[4][455][0].apply(a,arguments)
},{"./ac-shared-instance/SharedInstance":587,dup:455}],587:[function(b,c,a){arguments[4][456][0].apply(a,arguments)
},{dup:456}],588:[function(b,c,a){var d=b("./ac-prefixer/Prefixer");c.exports=new d();
c.exports.Prefixer=d},{"./ac-prefixer/Prefixer":589}],589:[function(d,b,g){var l=d("./Prefixer/camelCasedEvents");
var o=/(\([^\)]+\))/gi;var h=/([^ ,;\(]+(\([^\)]+\))?)/gi;var k=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
var a=/^(webkit|moz|ms)/gi;var f=["-webkit-","-moz-","-ms-"];var m=["Webkit","Moz","ms"];
var n=["webkit","moz","ms"];function c(){this._supportsAvailable=("CSS" in window&&"supports" in window.CSS);
this._cssPrefixes=f;this._domPrefixes=m;this._evtPrefixes=n;this._styleProperties={};
this._styleValues={};this._eventTypes={}}var j=c.prototype;j.getEventType=function(q){var r;
var p;q=q.toLowerCase();if(q in this._eventTypes){return this._eventTypes[q]}if(this._checkEventType("on"+q)){return this._eventTypes[q]=q
}if(l[q]){for(r in l[q]){if(this._checkEventType(r)){return this._eventTypes[q]=l[q][r]
}}}for(p=0;p<this._evtPrefixes.length;p++){if(this._checkEventType("on"+this._evtPrefixes[p]+q)){this._eventTypes[q]=this._evtPrefixes[p]+q;
this._reduceAvailablePrefixes(p);return this._eventTypes[q]}}return this._eventTypes[q]=q
};j._checkEventType=function(p){return(p in window||p in document)};j.getStyleProperty=function(s){var r;
var p;var q;s+="";if(s in this._styleProperties){return this._styleProperties[s].dom
}s=this._toDOM(s);this._prepareTestElement();p=s.charAt(0).toUpperCase()+s.substr(1);
if(s==="filter"){r=["WebkitFilter","filter"]}else{r=(s+" "+this._domPrefixes.join(p+" ")+p).split(" ")
}for(q=0;q<r.length;q++){if(this._el.style[r[q]]!==undefined){if(q!==0){this._reduceAvailablePrefixes(q-1)
}this._memoizeStyleProperty(s,r[q]);return r[q]}}this._memoizeStyleProperty(s,false);
return false};j._memoizeStyleProperty=function(s,p){var q=this._toCSS(s);var r=(p===false)?false:this._toCSS(p);
this._styleProperties[s]=this._styleProperties[p]=this._styleProperties[q]=this._styleProperties[r]={dom:p,css:r}
};j.getStyleCSS=function(r,q){var p;r=this.getStyleProperty(r);if(!r){return false
}p=this._styleProperties[r].css;if(typeof q!=="undefined"){q=this.getStyleValue(r,q);
if(q===false){return false}p+=":"+q+";"}return p};j.getStyleValue=function(r,q){var p;
q+="";r=this.getStyleProperty(r);if(!r){return false}if(this._testStyleValue(r,q)){return q
}p=this._styleProperties[r].css;q=q.replace(h,function(t){var s;var w;var v;var u;
if(t[0]==="#"||!isNaN(t[0])){return t}w=t.replace(o,"");v=p+":"+w;if(v in this._styleValues){if(this._styleValues[v]===false){return""
}return t.replace(w,this._styleValues[v])}s=this._cssPrefixes.map(function(x){return x+t
});s=[t].concat(s);for(u=0;u<s.length;u++){if(this._testStyleValue(r,s[u])){if(u!==0){this._reduceAvailablePrefixes(u-1)
}this._styleValues[v]=s[u].replace(o,"");return s[u]}}this._styleValues[v]=false;
return""}.bind(this));q=q.trim();return(q==="")?false:q};j._testStyleValue=function(r,q){var p;
if(this._supportsAvailable){r=this._styleProperties[r].css;return CSS.supports(r,q)
}this._prepareTestElement();p=this._el.style[r];try{this._el.style[r]=q}catch(s){return false
}return(this._el.style[r]&&this._el.style[r]!==p)};j.stripPrefixes=function(p){p=String.prototype.replace.call(p,k,"");
return p.charAt(0).toLowerCase()+p.slice(1)};j._reduceAvailablePrefixes=function(p){if(this._cssPrefixes.length!==1){this._cssPrefixes=[this._cssPrefixes[p]];
this._domPrefixes=[this._domPrefixes[p]];this._evtPrefixes=[this._evtPrefixes[p]]
}};j._toDOM=function(q){var p;if(q.toLowerCase()==="float"){return"cssFloat"}q=q.replace(/-([a-z])/g,function(s,r){return r.toUpperCase()
});if(q.substr(0,2)==="Ms"){q="ms"+q.substr(2)}return q};j._toCSS=function(q){var p;
if(q.toLowerCase()==="cssfloat"){return"float"}if(a.test(q)){q="-"+q}return q.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
};j._prepareTestElement=function(){if(!this._el){this._el=document.createElement("_")
}else{this._el.style.cssText="";this._el.removeAttribute("style")}};b.exports=c
},{"./Prefixer/camelCasedEvents":590}],590:[function(b,c,a){c.exports={transitionend:{onwebkittransitionend:"webkitTransitionEnd",onmstransitionend:"MSTransitionEnd"},animationstart:{onwebkitanimationstart:"webkitAnimationStart",onmsanimationstart:"MSAnimationStart"},animationend:{onwebkitanimationend:"webkitAnimationEnd",onmsanimationend:"MSAnimationEnd"},animationiteration:{onwebkitanimationiteration:"webkitAnimationIteration",onmsanimationiteration:"MSAnimationIteration"},fullscreenchange:{onmsfullscreenchange:"MSFullscreenChange"},fullscreenerror:{onmsfullscreenerror:"MSFullscreenError"}}
},{}],591:[function(b,c,a){c.exports={addEventListener:b("./ac-dom-events/addEventListener"),dispatchEvent:b("./ac-dom-events/dispatchEvent"),preventDefault:b("./ac-dom-events/preventDefault"),removeEventListener:b("./ac-dom-events/removeEventListener"),stop:b("./ac-dom-events/stop"),stopPropagation:b("./ac-dom-events/stopPropagation"),target:b("./ac-dom-events/target")}
},{"./ac-dom-events/addEventListener":592,"./ac-dom-events/dispatchEvent":593,"./ac-dom-events/preventDefault":594,"./ac-dom-events/removeEventListener":595,"./ac-dom-events/stop":596,"./ac-dom-events/stopPropagation":597,"./ac-dom-events/target":598}],592:[function(b,c,a){var f=b("ac-prefixer");
c.exports=function d(k,h,j,g){h=f.getEventType(h);if(k.addEventListener){k.addEventListener(h,j,g)
}else{h="on"+h.toLowerCase();k.attachEvent(h,j)}return k}},{"ac-prefixer":588}],593:[function(b,c,a){c.exports=function d(j,h,g){var f;
h=h.toLowerCase();if(window.CustomEvent){if(g){f=new CustomEvent(h,g)}else{f=new CustomEvent(h)
}j.dispatchEvent(f)}else{f=document.createEventObject();if(g&&"detail" in g){f.detail=g.detail
}j.fireEvent("on"+h,f)}return j}},{}],594:[function(b,c,a){arguments[4][305][0].apply(a,arguments)
},{dup:305}],595:[function(b,c,a){var f=b("ac-prefixer");c.exports=function d(k,h,j,g){h=f.getEventType(h);
if(k.removeEventListener){k.removeEventListener(h,j,g)}else{h="on"+h.toLowerCase();
k.detachEvent(h,j)}return k}},{"ac-prefixer":588}],596:[function(b,c,a){arguments[4][308][0].apply(a,arguments)
},{"./preventDefault":594,"./stopPropagation":597,dup:308}],597:[function(b,c,a){arguments[4][309][0].apply(a,arguments)
},{dup:309}],598:[function(b,c,a){c.exports=function d(f){f=f||window.event;return(typeof f.target!=="undefined")?f.target:f.srcElement
}},{}],599:[function(b,c,a){arguments[4][434][0].apply(a,arguments)},{"./ac-dom-traversal/ancestor":600,"./ac-dom-traversal/ancestors":601,"./ac-dom-traversal/children":602,"./ac-dom-traversal/filterBySelector":603,"./ac-dom-traversal/firstChild":604,"./ac-dom-traversal/lastChild":607,"./ac-dom-traversal/matchesSelector":608,"./ac-dom-traversal/nextSibling":609,"./ac-dom-traversal/nextSiblings":610,"./ac-dom-traversal/previousSibling":611,"./ac-dom-traversal/previousSiblings":612,"./ac-dom-traversal/querySelector":613,"./ac-dom-traversal/querySelectorAll":614,"./ac-dom-traversal/shims/ie":615,"./ac-dom-traversal/siblings":616,dup:434}],600:[function(b,c,a){arguments[4][435][0].apply(a,arguments)
},{"./helpers/validate":606,"./matchesSelector":608,"ac-dom-nodes":335,dup:435}],601:[function(b,c,a){arguments[4][436][0].apply(a,arguments)
},{"./helpers/validate":606,"./matchesSelector":608,"ac-dom-nodes":335,dup:436}],602:[function(b,c,a){arguments[4][437][0].apply(a,arguments)
},{"./filterBySelector":603,"./helpers/validate":606,"ac-dom-nodes":335,dup:437}],603:[function(b,c,a){arguments[4][438][0].apply(a,arguments)
},{"./helpers/validate":606,"./matchesSelector":608,dup:438}],604:[function(b,c,a){arguments[4][439][0].apply(a,arguments)
},{"./children":602,"./helpers/validate":606,dup:439}],605:[function(b,c,a){arguments[4][440][0].apply(a,arguments)
},{dup:440}],606:[function(b,c,a){arguments[4][441][0].apply(a,arguments)},{"ac-dom-nodes":335,dup:441}],607:[function(b,c,a){arguments[4][442][0].apply(a,arguments)
},{"./children":602,"./helpers/validate":606,dup:442}],608:[function(b,c,a){arguments[4][443][0].apply(a,arguments)
},{"./helpers/nativeMatches":605,"./helpers/validate":606,"ac-dom-nodes":335,dup:443}],609:[function(b,c,a){arguments[4][444][0].apply(a,arguments)
},{"./helpers/validate":606,"./matchesSelector":608,"ac-dom-nodes":335,dup:444}],610:[function(b,c,a){arguments[4][445][0].apply(a,arguments)
},{"./helpers/validate":606,"./matchesSelector":608,"ac-dom-nodes":335,dup:445}],611:[function(b,c,a){arguments[4][446][0].apply(a,arguments)
},{"./helpers/validate":606,"./matchesSelector":608,"ac-dom-nodes":335,dup:446}],612:[function(b,c,a){arguments[4][447][0].apply(a,arguments)
},{"./helpers/validate":606,"./matchesSelector":608,"ac-dom-nodes":335,dup:447}],613:[function(b,c,a){arguments[4][448][0].apply(a,arguments)
},{"./helpers/validate":606,dup:448}],614:[function(b,c,a){arguments[4][449][0].apply(a,arguments)
},{"./helpers/validate":606,dup:449}],615:[function(b,c,a){arguments[4][450][0].apply(a,arguments)
},{"../helpers/nativeMatches":605,"../helpers/validate":606,"../vendor/sizzle/sizzle":617,"ac-dom-nodes":335,dup:450}],616:[function(b,c,a){arguments[4][451][0].apply(a,arguments)
},{"./children":602,"./helpers/validate":606,dup:451}],617:[function(b,c,a){arguments[4][452][0].apply(a,arguments)
},{dup:452}],618:[function(b,c,a){c.exports={DOMEmitter:b("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":619}],619:[function(c,b,d){var f;var l=c("ac-event-emitter").EventEmitter,k=c("./DOMEmitterEvent"),g=c("ac-dom-events"),a=c("ac-dom-traversal");
var j="dom-emitter";function h(m){if(m===null){return}this.el=m;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new l()}f=h.prototype;f.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};f.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};f.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};f.has=function(m,r,q,o){var p,s;if(typeof r==="string"){p=r;s=q}else{s=r;
o=q}if(p){var n=this._getDelegateFuncBindingIdx(m,p,s,o,true);if(n>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};f.trigger=function(o,n,p,t){o=this._parseEventNames(o);o=this._cleanStringData(o);
var r,s,q,m=o.length;if(typeof n==="string"){r=this._cleanStringData(n);s=p}else{s=n;
t=p}for(q=0;q<m;q++){this._triggerDOMEvents(o[q],s,r)}return this};f.emitterTrigger=function(n,p,q){if(!this._eventEmitter){return this
}n=this._parseEventNames(n);n=this._cleanStringData(n);p=new k(p,this);var o,m=n.length;
for(o=0;o<m;o++){this._eventEmitter.trigger(n[o],p,q)}return this};f.propagateTo=function(m,n){this._eventEmitter.propagateTo(m,n);
return this};f.stopPropagatingTo=function(m){this._eventEmitter.stopPropagatingTo(m);
return this};f.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};f.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
var m;for(m in this){if(this.hasOwnProperty(m)){this[m]=null}}};f._parseEventNames=function(m){if(!m){return[m]
}return m.split(" ")};f._onListenerEvent=function(o,n){var m=new k(n,this);this._eventEmitter.trigger(o,m,false)
};f._setListener=function(m){this._bindings[m]=this._onListenerEvent.bind(this,m);
g.addEventListener(this.el,m,this._bindings[m])};f._removeListener=function(m){g.removeEventListener(this.el,m,this._bindings[m]);
this._bindings[m]=null};f._triggerInternalEvent=function(m,n){this.emitterTrigger(j+":"+m,n)
};f._normalizeArgumentsAndCall=function(m,o){var s={};if(m.length===0){o.call(this,s);
return}if(typeof m[0]==="string"||m[0]===null){m=this._cleanStringData(m);s.events=m[0];
if(typeof m[1]==="string"){s.delegateQuery=m[1];s.callback=m[2];s.context=m[3]}else{s.callback=m[1];
s.context=m[2]}o.call(this,s);return}var n,q,r=":",p=m[0];for(n in p){if(p.hasOwnProperty(n)){s={};
q=this._cleanStringData(n.split(r));s.events=q[0];s.delegateQuery=q[1];s.callback=p[n];
s.context=m[1];o.call(this,s)}}};f._registerDelegateFunc=function(o,q,r,m,p){var n=this._delegateFunc.bind(this,o,q,r,p);
this._delegateFuncs[q]=this._delegateFuncs[q]||{};this._delegateFuncs[q][o]=this._delegateFuncs[q][o]||[];
this._delegateFuncs[q][o].push({func:m,context:p,delegateFunc:n});return n};f._cleanStringData=function(p){var o=false;
if(typeof p==="string"){p=[p];o=true}var n=[],r,t,s,q,m=p.length;for(r=0;r<m;r++){t=p[r];
if(typeof t==="string"){if(t===""||t===" "){continue}s=t.length;while(t[0]===" "){t=t.slice(1,s);
s--}while(t[s-1]===" "){t=t.slice(0,s-1);s--}}n.push(t)}if(o){return n[0]}return n
};f._unregisterDelegateFunc=function(o,r,m,q){if(!this._delegateFuncs[r]||!this._delegateFuncs[r][o]){return
}var p=this._getDelegateFuncBindingIdx(o,r,m,q),n;if(p>-1){n=this._delegateFuncs[r][o][p].delegateFunc;
this._delegateFuncs[r][o].splice(p,1);if(this._delegateFuncs[r][o].length===0){this._delegateFuncs[r][o]=null
}}return n};f._unregisterDelegateFuncs=function(m,o){if(!this._delegateFuncs[o]){return
}if(m!==null&&!this._delegateFuncs[o][m]){return}if(m===null){var n;for(n in this._delegateFuncs[o]){if(this._delegateFuncs[o].hasOwnProperty(n)){this._unbindDelegateFunc(n,o)
}}return}this._unbindDelegateFunc(m,o)};f._unbindDelegateFunc=function(m,o){var p,q,n=0;
while(this._delegateFuncs[o][m]&&this._delegateFuncs[o][m][n]){p=this._delegateFuncs[o][m][n];
q=this._delegateFuncs[o][m][n].length;this._off({events:m,delegateQuery:o,callback:p.func,context:p.context});
if(this._delegateFuncs[o][m]&&q===this._delegateFuncs[o][m].length){n++}}p=q=null
};f._unregisterDelegateFuncsByEvent=function(m){var n;for(n in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(n)){this._unregisterDelegateFuncs(m,n)
}}};f._delegateFunc=function(m,q,s,o,r){if(this._targetHasDelegateAncestor(r.target,q)){var n=Array.prototype.slice.call(arguments,0),p=n.slice(4,n.length);
o=o||window;if(typeof r.detail==="object"){p[0]=r.detail}s.apply(o,p)}};f._targetHasDelegateAncestor=function(o,n){var m=o;
while(m&&m!==this.el&&m!==document.documentElement){if(a.matchesSelector(m,n)){return true
}m=m.parentNode}return false};f._on=function(q){var n=q.events,r=q.callback,p=q.delegateQuery,o=q.context,m=q.unboundCallback||r;
n=this._parseEventNames(n);n.forEach(function(w,s,u,v,t){if(!this.has(t)){this._setListener(t)
}if(typeof v==="string"){w=this._registerDelegateFunc(t,v,w,s,u)}this._triggerInternalEvent("willon",{evt:t,callback:w,context:u,delegateQuery:v});
this._eventEmitter.on(t,w,u);this._triggerInternalEvent("didon",{evt:t,callback:w,context:u,delegateQuery:v})
}.bind(this,r,m,o,p));n=r=m=p=o=null};f._off=function(r){var n=r.events,s=r.callback,q=r.delegateQuery,p=r.context,m=r.unboundCallback||s;
if(typeof n==="undefined"){this._eventEmitter.off();var o;for(o in this._bindings){if(this._bindings.hasOwnProperty(o)){this._removeListener(o)
}}for(o in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(o)){this._delegateFuncs[o]=null
}}return}n=this._parseEventNames(n);n.forEach(function(x,t,v,w,u){if(typeof w==="string"&&typeof t==="function"){x=this._unregisterDelegateFunc(u,w,t,v);
if(!x){return}}if(typeof w==="string"&&typeof x==="undefined"){this._unregisterDelegateFuncs(u,w);
return}if(typeof u==="string"&&typeof x==="undefined"){this._unregisterDelegateFuncsByEvent(u);
if(typeof w==="string"){return}}this._triggerInternalEvent("willoff",{evt:u,callback:x,context:v,delegateQuery:w});
this._eventEmitter.off(u,x,v);this._triggerInternalEvent("didoff",{evt:u,callback:x,context:v,delegateQuery:w});
if(!this.has(u)){this._removeListener(u)}}.bind(this,s,m,p,q));n=s=m=q=p=null};
f._once=function(p){var m=p.events,q=p.callback,o=p.delegateQuery,n=p.context;m=this._parseEventNames(m);
m.forEach(function(u,s,t,r){if(typeof t==="string"){return this._handleDelegateOnce(r,u,s,t)
}if(!this.has(r)){this._setListener(r)}this._triggerInternalEvent("willonce",{evt:r,callback:u,context:s,delegateQuery:t});
this._eventEmitter.once.call(this,r,u,s);this._triggerInternalEvent("didonce",{evt:r,callback:u,context:s,delegateQuery:t})
}.bind(this,q,n,o));m=q=o=n=null};f._handleDelegateOnce=function(m,p,n,o){this._triggerInternalEvent("willonce",{evt:m,callback:p,context:n,delegateQuery:o});
this._on({events:m,context:n,delegateQuery:o,callback:this._getDelegateOnceCallback.bind(this,m,p,n,o),unboundCallback:p});
this._triggerInternalEvent("didonce",{evt:m,callback:p,context:n,delegateQuery:o});
return this};f._getDelegateOnceCallback=function(m,r,o,q){var n=Array.prototype.slice.call(arguments,0),p=n.slice(4,n.length);
r.apply(o,p);this._off({events:m,delegateQuery:q,callback:r,context:o})};f._getDelegateFuncBindingIdx=function(t,q,o,m,u){var s=-1;
if(this._delegateFuncs[q]&&this._delegateFuncs[q][t]){var p,n,r=this._delegateFuncs[q][t].length;
for(p=0;p<r;p++){n=this._delegateFuncs[q][t][p];if(u&&typeof o==="undefined"){o=n.func
}if(n.func===o&&n.context===m){s=p;break}}}return s};f._triggerDOMEvents=function(o,r,q){var n=[this.el];
if(q){n=a.querySelectorAll(q,this.el)}var p,s,m=n.length;for(p=0;p<m;p++){g.dispatchEvent(n[p],o,{bubbles:true,cancelable:true,detail:r})
}};b.exports=h},{"./DOMEmitterEvent":620,"ac-dom-events":591,"ac-dom-traversal":599,"ac-event-emitter":621}],620:[function(b,c,a){var f=b("ac-dom-events");
var d;var g=function(j,h){this._domEmitter=h;this.originalEvent=j||{};this._originalTarget=f.target(this.originalEvent);
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(j){this.data=this.originalEvent;this.originalEvent={}}}};d=g.prototype;
d.preventDefault=function(){f.preventDefault(this.originalEvent)};d.stopPropagation=function(){f.stopPropagation(this.originalEvent)
};d.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};d._isDOMEvent=function(h){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&h instanceof CustomEvent)){return true
}return false};c.exports=g},{"ac-dom-events":591}],621:[function(b,c,a){arguments[4][279][0].apply(a,arguments)
},{"./ac-event-emitter/EventEmitter":622,dup:279}],622:[function(b,c,a){arguments[4][280][0].apply(a,arguments)
},{dup:280}],623:[function(b,c,a){arguments[4][457][0].apply(a,arguments)},{"./ac-window-delegate/WindowDelegate":626,"./ac-window-delegate/WindowDelegateCustomEvent":627,"./ac-window-delegate/WindowDelegateOptimizer":628,dup:457}],624:[function(b,c,a){arguments[4][458][0].apply(a,arguments)
},{"ac-event-emitter":621,dup:458}],625:[function(b,c,a){arguments[4][459][0].apply(a,arguments)
},{"ac-event-emitter":621,dup:459}],626:[function(d,b,g){var j;var c=d("ac-shared-instance").SharedInstance,m=d("ac-dom-emitter").DOMEmitter,k=d("./OptimizerController"),f=d("./CustomEventController"),h=d("./queries/queries"),n=d("./optimizers/optimizers");
var l="ac-window-delegate:WindowDelegate",a="3.0.0-4";function o(){this._emitter=new m(window);
this._controllers={optimizer:new k(n),customEvent:new f()};var p;for(p in h){if(h.hasOwnProperty(p)){this[p]=this._getProperty.bind(this,p);
h[p]=h[p].bind(this)}}this._bindEvents()}j=o.prototype;j.on=function(p,s,q){var r=this._seperateCustomEvents(p);
this._optimizeEvents(r.standardEvents);this._customEventOn(r.customEvents,s,q);
this._emitterOn.apply(this,arguments);return this};j.once=function(p,s,q){var r=this._seperateCustomEvents(p);
this._optimizeEvents(r.standardEvents);this._customEventOnce(r.customEvents,s,q);
this._emitterOnce.apply(this,arguments);return this};j.off=function(q,v,r){var u=this._seperateCustomEvents(q),s=false;
if(!q){s=true}this._customEventOff(u.customEvents,v,r,s);this._emitterOff.apply(this,arguments);
if(s){try{var p;for(p in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(p)&&this._shouldDeoptimizeEvent(p,true)){this._deoptimizeEvent(p)
}}this._bindEvents()}catch(t){}}return this};j.has=function(p,r,q){return this._emitter.has.apply(this._emitter,arguments)
};j.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};j.emitterTrigger=function(){this._emitter.emitterTrigger.apply(this._emitter,arguments);
return this};j.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};j.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};j.addOptimizer=function(p){this._controllers.optimizer.add(p);return this
};j.addCustomEvent=function(p){this._controllers.customEvent.add(p);return this
};j._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};j._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};j._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};j._onEventUnbound=function(q){var p=q.data.evt;
if(this._shouldDeoptimizeEvent(p)){this._deoptimizeEvent(p)}};j._customEventOn=function(p,r,q){if(p.length===0){return
}this._controllers.customEvent.on(p.join(" "),r,q)};j._customEventOnce=function(p,r,q){if(p.length===0){return
}this._controllers.customEvent.once(p.join(" "),r,q)};j._customEventOff=function(p,s,q,r){if(!r&&p.length===0){return
}if(r&&p.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(p.join(" "),s,q)
};j._getProperty=function(r,p){var q=null;if(!p){q=this._getOptimizedValue(r)}if(q===null){q=h[r].call(this,p)
}return q};j._optimizeEvents=function(r){var q,s,p=r.length;for(s=0;s<p;s++){q=r[s];
if(this._shouldOptimizeEvent(q)){this._optimizeEvent(q)}}};j._shouldOptimizeEvent=function(p){if(this._controllers.optimizer.canOptimizeEvent(p)&&!this._controllers.optimizer.isOptimizingEvent(p)){return true
}return false};j._shouldDeoptimizeEvent=function(p,q){if(this._controllers.optimizer.isOptimizingEvent(p)&&(q||this._emitter._eventEmitter._events[p].length<=1)){return true
}return false};j._optimizeEvent=function(q){var p=this._controllers.optimizer.getOptimizerByEvent(q);
p.activate();this._emitterOn(q,p.callback,p)};j._deoptimizeEvent=function(q){var p=this._controllers.optimizer.getOptimizerByEvent(q);
p.deactivate();this._emitterOff(q,p.callback,p)};j._getOptimizedValue=function(p){return this._controllers.optimizer.get(p)
};j._seperateCustomEvents=function(t){var q={customEvents:[],standardEvents:[]};
if(typeof t==="string"){var u=t.split(" "),r,s,p=u.length;for(s=0;s<p;s++){r=u[s];
if(this._controllers.customEvent.canHandleCustomEvent(r)){q.customEvents.push(r)
}else{q.standardEvents.push(r)}}}return q};j._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};b.exports=c.share(l,a,o)},{"./CustomEventController":624,"./OptimizerController":625,"./optimizers/optimizers":631,"./queries/queries":640,"ac-dom-emitter":618,"ac-shared-instance":586}],627:[function(b,c,a){arguments[4][461][0].apply(a,arguments)
},{"ac-event-emitter":621,dup:461}],628:[function(b,c,a){arguments[4][462][0].apply(a,arguments)
},{"ac-event-emitter":621,dup:462}],629:[function(b,c,a){arguments[4][463][0].apply(a,arguments)
},{"../../WindowDelegateOptimizer":628,"../../queries/queries":640,dup:463}],630:[function(b,c,a){arguments[4][464][0].apply(a,arguments)
},{"../../WindowDelegateOptimizer":628,"../../queries/queries":640,dup:464}],631:[function(b,c,a){arguments[4][465][0].apply(a,arguments)
},{"./events/resize":629,"./events/scroll":630,dup:465}],632:[function(b,c,a){arguments[4][466][0].apply(a,arguments)
},{dup:466}],633:[function(b,c,a){arguments[4][467][0].apply(a,arguments)},{dup:467}],634:[function(b,c,a){arguments[4][468][0].apply(a,arguments)
},{dup:468}],635:[function(b,c,a){arguments[4][469][0].apply(a,arguments)},{dup:469}],636:[function(b,c,a){arguments[4][470][0].apply(a,arguments)
},{dup:470}],637:[function(b,c,a){arguments[4][471][0].apply(a,arguments)},{dup:471}],638:[function(b,c,a){arguments[4][472][0].apply(a,arguments)
},{dup:472}],639:[function(b,c,a){arguments[4][473][0].apply(a,arguments)},{dup:473}],640:[function(b,c,a){arguments[4][474][0].apply(a,arguments)
},{"./methods/clientHeight":632,"./methods/clientWidth":633,"./methods/innerHeight":634,"./methods/innerWidth":635,"./methods/maxScrollX":636,"./methods/maxScrollY":637,"./methods/scrollX":638,"./methods/scrollY":639,dup:474}],641:[function(b,c,a){c.exports={Viewport:b("./ac-viewport/Viewport")}
},{"./ac-viewport/Viewport":642}],642:[function(d,b,g){var c=d("ac-shared-instance").SharedInstance,l=d("ac-window-delegate").WindowDelegate,j=d("ac-breakpoints-delegate").BreakpointsDelegate;
var k="ac-viewport:Viewport",a="3.0.0-1";var h;function f(n){var o,m=l;for(o in m){if(m.hasOwnProperty(o)){this[o]=m[o]
}else{h[o]=m[o]}}this.addCustomEvent(j.getCustomEvent())}h=f.prototype;h.getBreakpoint=function(){return j.getBreakpoint()
};h.setBreakpoints=function(m){return j.setBreakpoints(m)};b.exports=c.share(k,a,f)
},{"ac-breakpoints-delegate":584,"ac-shared-instance":586,"ac-window-delegate":623}],643:[function(b,c,a){c.exports={ScrollMotionEmitter:b("./ac-scroll-motion-emitter/ScrollMotionEmitter"),ElementScrollMotionEmitter:b("./ac-scroll-motion-emitter/ElementScrollMotionEmitter")}
},{"./ac-scroll-motion-emitter/ElementScrollMotionEmitter":644,"./ac-scroll-motion-emitter/ScrollMotionEmitter":645}],644:[function(d,f,c){var b=d("ac-object"),j=d("ac-viewport").Viewport,h=d("./ScrollMotionEmitter");
function a(l,k){k=k||{};if(!(l instanceof HTMLElement)){return null}this.el=l;this.options=k;
if(this.options.offsetTop){this.offsetTop=this.options.offsetTop}if(this.options.offsetBottom){this.offsetBottom=this.options.offsetBottom
}this.setEmitterBounds();this._boundHandleResize=this._handleResize.bind(this);
this._bindResizeEvents();h.call(this,k)}var g=a.prototype=b.create(h.prototype);
g.setEmitterBounds=function(){this._elementBounds=this.el.getBoundingClientRect();
var o=j.scrollY(),l=this._elementBounds.top+o,k=this._elementBounds.bottom+o,n=this.offsetTop||0,m=this.offsetBottom||0;
if(typeof this.offsetTop==="function"){n=this.offsetTop()}if(typeof this.offsetBottom==="function"){m=this.offsetBottom()
}this.min=this.options.min=l+n;this.max=this.options.max=k+m};g.destroy=function(){j.off("resize orientationchange",this._boundHandleResize);
h.prototype.destroy.call(this)};g._bindResizeEvents=function(){j.on("resize orientationchange",this._boundHandleResize)
};g._handleClockUpdate=function(k){if(this._shouldUpdateOnResize){this.setEmitterBounds();
this.handleScroll();this._shouldUpdateOnResize=false}h.prototype._handleClockUpdate.call(this,k)
};g._handleResize=function(){this._shouldUpdateOnResize=true};f.exports=a},{"./ScrollMotionEmitter":645,"ac-object":554,"ac-viewport":641}],645:[function(d,f,b){var a=d("ac-object"),j=d("ac-viewport").Viewport,c=d("ac-motion-emitter").MotionEmitter;
function h(k){k=k||{};if(typeof k.min!=="number"||typeof k.max!=="number"){return null
}c.call(this,k);this.smooth=this.options.smooth||false;if(!this.options.overrideScroll){this._bindScrollEvents()
}}var g=h.prototype=a.create(c.prototype);g.updateValue=function(k){if(this.smooth){return c.prototype.updateValue.call(this,k)
}if(this._currentValue===this._targetValue){this._shouldEmitChange=false;return
}this._currentValue=this._targetValue;this._shouldEmitChange=true};g.handleScroll=function(l){if(typeof l!=="number"){l=j.scrollY()
}var k;if(l<this.min){k=this.min}else{if(l>this.max){k=this.max}else{k=l}}k=(k-this.min)/(this.max-this.min);
this.setProgress(k)};g.destroy=function(){if(this._boundHandleScroll){j.off("scroll",this._boundHandleScroll)
}return c.prototype.destroy.call(this)};g._bindScrollEvents=function(){this._boundHandleScroll=this.handleScroll.bind(this);
j.on("scroll",this._boundHandleScroll)};f.exports=h},{"ac-motion-emitter":547,"ac-object":554,"ac-viewport":641}],646:[function(b,c,a){arguments[4][482][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/once":667,dup:482}],647:[function(b,c,a){arguments[4][483][0].apply(a,arguments)
},{"./touchAvailable":683,"ac-browser":662,"ac-function/once":667,dup:483}],648:[function(b,c,a){arguments[4][484][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/once":667,dup:484}],649:[function(b,c,a){arguments[4][485][0].apply(a,arguments)
},{"ac-function/once":667,"ac-prefixer/getStyleValue":670,dup:485}],650:[function(b,c,a){arguments[4][486][0].apply(a,arguments)
},{"ac-function/memoize":666,"ac-prefixer/getStyleProperty":669,"ac-prefixer/getStyleValue":670,dup:486}],651:[function(b,c,a){arguments[4][487][0].apply(a,arguments)
},{"ac-function/once":667,"ac-prefixer/getStyleValue":670,dup:487}],652:[function(b,c,a){arguments[4][488][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/memoize":666,dup:488}],653:[function(b,c,a){arguments[4][489][0].apply(a,arguments)
},{"ac-function/memoize":666,"ac-prefixer/getEventType":668,dup:489}],654:[function(b,c,a){arguments[4][490][0].apply(a,arguments)
},{dup:490}],655:[function(b,c,a){c.exports={canvasAvailable:b("./canvasAvailable"),continuousScrollEventsAvailable:b("./continuousScrollEventsAvailable"),cookiesAvailable:b("./cookiesAvailable"),cssLinearGradientAvailable:b("./cssLinearGradientAvailable"),cssPropertyAvailable:b("./cssPropertyAvailable"),cssViewportUnitsAvailable:b("./cssViewportUnitsAvailable"),elementAttributeAvailable:b("./elementAttributeAvailable"),eventTypeAvailable:b("./eventTypeAvailable"),isDesktop:b("./isDesktop"),isHandheld:b("./isHandheld"),isRetina:b("./isRetina"),isTablet:b("./isTablet"),localStorageAvailable:b("./localStorageAvailable"),mediaElementsAvailable:b("./mediaElementsAvailable"),sessionStorageAvailable:b("./sessionStorageAvailable"),svgAvailable:b("./svgAvailable"),threeDTransformsAvailable:b("./threeDTransformsAvailable"),touchAvailable:b("./touchAvailable"),webGLAvailable:b("./webGLAvailable")}
},{"./canvasAvailable":646,"./continuousScrollEventsAvailable":647,"./cookiesAvailable":648,"./cssLinearGradientAvailable":649,"./cssPropertyAvailable":650,"./cssViewportUnitsAvailable":651,"./elementAttributeAvailable":652,"./eventTypeAvailable":653,"./isDesktop":656,"./isHandheld":657,"./isRetina":658,"./isTablet":659,"./localStorageAvailable":660,"./mediaElementsAvailable":661,"./sessionStorageAvailable":680,"./svgAvailable":681,"./threeDTransformsAvailable":682,"./touchAvailable":683,"./webGLAvailable":684}],656:[function(b,c,a){arguments[4][492][0].apply(a,arguments)
},{"./helpers/globals":654,"./touchAvailable":683,"ac-function/once":667,dup:492}],657:[function(b,c,a){arguments[4][493][0].apply(a,arguments)
},{"./isDesktop":656,"./isTablet":659,"ac-function/once":667,dup:493}],658:[function(b,c,a){arguments[4][494][0].apply(a,arguments)
},{"./helpers/globals":654,dup:494}],659:[function(d,f,b){var c=d("./isDesktop").original;
var h=d("./helpers/globals");var g=d("ac-function/once");function a(){var k=h.getWindow();
var j=k.screen.width;if(k.orientation&&k.screen.height<j){j=k.screen.height}return(!c()&&j>=600)
}f.exports=g(a);f.exports.original=a},{"./helpers/globals":654,"./isDesktop":656,"ac-function/once":667}],660:[function(b,c,a){arguments[4][496][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/once":667,dup:496}],661:[function(b,c,a){arguments[4][497][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/once":667,dup:497}],662:[function(b,c,a){arguments[4][261][0].apply(a,arguments)
},{"./ac-browser/BrowserData":663,"./ac-browser/IE":664,dup:261}],663:[function(b,c,a){arguments[4][500][0].apply(a,arguments)
},{"./data":665,dup:500}],664:[function(b,c,a){arguments[4][263][0].apply(a,arguments)
},{dup:263}],665:[function(b,c,a){arguments[4][502][0].apply(a,arguments)},{dup:502}],666:[function(b,c,a){arguments[4][503][0].apply(a,arguments)
},{dup:503}],667:[function(b,c,a){arguments[4][504][0].apply(a,arguments)},{dup:504}],668:[function(b,c,a){arguments[4][300][0].apply(a,arguments)
},{"./shared/camelCasedEventTypes":671,"./shared/prefixHelper":673,"./shared/windowFallbackEventTypes":676,"./utils/eventTypeAvailable":677,dup:300}],669:[function(b,c,a){arguments[4][357][0].apply(a,arguments)
},{"./shared/getStyleTestElement":672,"./shared/prefixHelper":673,"./shared/stylePropertyCache":674,"./utils/toCSS":678,"./utils/toDOM":679,dup:357}],670:[function(b,c,a){arguments[4][358][0].apply(a,arguments)
},{"./getStyleProperty":669,"./shared/prefixHelper":673,"./shared/stylePropertyCache":674,"./shared/styleValueAvailable":675,dup:358}],671:[function(b,c,a){arguments[4][301][0].apply(a,arguments)
},{dup:301}],672:[function(b,c,a){arguments[4][359][0].apply(a,arguments)},{dup:359}],673:[function(b,c,a){arguments[4][302][0].apply(a,arguments)
},{dup:302}],674:[function(b,c,a){arguments[4][361][0].apply(a,arguments)},{dup:361}],675:[function(b,c,a){arguments[4][362][0].apply(a,arguments)
},{"./getStyleTestElement":672,"./stylePropertyCache":674,dup:362}],676:[function(b,c,a){arguments[4][303][0].apply(a,arguments)
},{dup:303}],677:[function(b,c,a){arguments[4][304][0].apply(a,arguments)},{dup:304}],678:[function(b,c,a){arguments[4][364][0].apply(a,arguments)
},{dup:364}],679:[function(b,c,a){arguments[4][365][0].apply(a,arguments)},{dup:365}],680:[function(b,c,a){arguments[4][517][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/once":667,dup:517}],681:[function(b,c,a){arguments[4][518][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/once":667,dup:518}],682:[function(b,c,a){arguments[4][519][0].apply(a,arguments)
},{"ac-function/once":667,"ac-prefixer/getStyleValue":670,dup:519}],683:[function(b,c,a){arguments[4][520][0].apply(a,arguments)
},{"./helpers/globals":654,"ac-function/once":667,dup:520}],684:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var h=g.getDocument();var j=h.createElement("canvas");
return !!(typeof j.getContext==="function"&&j.getContext("webgl"))}d.exports=f(a);
d.exports.original=a},{"./helpers/globals":654,"ac-function/once":667}],685:[function(b,c,a){c.exports={fade:b("./ac-solar/fade"),fadeIn:b("./ac-solar/fadeIn"),fadeOut:b("./ac-solar/fadeOut"),move:b("./ac-solar/move"),moveX:b("./ac-solar/moveX"),moveY:b("./ac-solar/moveY"),scroll:b("./ac-solar/scroll"),scrollX:b("./ac-solar/scrollX"),scrollY:b("./ac-solar/scrollY")}
},{"./ac-solar/fade":686,"./ac-solar/fadeIn":687,"./ac-solar/fadeOut":688,"./ac-solar/move":689,"./ac-solar/moveX":690,"./ac-solar/moveY":691,"./ac-solar/scroll":692,"./ac-solar/scrollX":693,"./ac-solar/scrollY":694}],686:[function(c,d,a){var b=c("ac-eclipse").Clip;
d.exports=function f(h,l,k,j,g){g=g||{};g.propsFrom=g.propsFrom||{};g.propsFrom.opacity=l;
return b.to(h,j,{opacity:k},g)}},{"ac-eclipse":"ac-eclipse"}],687:[function(d,f,b){var c=d("ac-eclipse").Clip;
f.exports=function a(h,j,g){return c.to(h,j,{opacity:1},g)}},{"ac-eclipse":"ac-eclipse"}],688:[function(c,d,a){var b=c("ac-eclipse").Clip;
d.exports=function f(h,j,g){return b.to(h,j,{opacity:0},g)}},{"ac-eclipse":"ac-eclipse"}],689:[function(f,g,c){var b=f("ac-feature").cssPropertyAvailable;
var d=f("ac-eclipse").Clip;g.exports=function a(k,h,n,l,j){var m;if(b("transform")){m={transform:{translateX:h,translateY:n}}
}else{m={left:h+"px",top:n+"px"}}return d.to(k,l,m,j)}},{"ac-eclipse":"ac-eclipse","ac-feature":655}],690:[function(f,g,c){var b=f("ac-feature").cssPropertyAvailable;
var d=f("ac-eclipse").Clip;var a=f("./move");g.exports=function h(l,j,m,k){return a(l,j,0,m,k)
}},{"./move":689,"ac-eclipse":"ac-eclipse","ac-feature":655}],691:[function(f,g,c){var b=f("ac-feature").cssPropertyAvailable;
var d=f("ac-eclipse").Clip;var a=f("./move");g.exports=function h(k,m,l,j){return a(k,0,m,l,j)
}},{"./move":689,"ac-eclipse":"ac-eclipse","ac-feature":655}],692:[function(d,f,b){var c=d("ac-eclipse").Clip;
f.exports=function a(g,o,k,h,r){r=r||{};var q=g.scrollLeft;var m=g.scrollTop;var n={x:q,y:m};
var p={x:o,y:k};if(typeof r.onDraw==="function"){var l=r.onDraw}var j=function(s){g.scrollLeft=n.x;
g.scrollTop=n.y;if(l){l.call(this,s)}};r.onDraw=j;return c.to(n,h,p,r)}},{"ac-eclipse":"ac-eclipse"}],693:[function(d,f,b){var c=d("ac-eclipse").Clip;
var a=d("./scroll");f.exports=function g(k,h,l,j){return this.scroll(k,h,0,l,j)
}},{"./scroll":692,"ac-eclipse":"ac-eclipse"}],694:[function(d,f,b){var c=d("ac-eclipse").Clip;
var a=d("./scroll");f.exports=function g(j,l,k,h){return this.scroll(j,0,l,k,h)
}},{"./scroll":692,"ac-eclipse":"ac-eclipse"}],695:[function(b,c,a){c.exports={Swipe:b("./ac-swipe/Swipe")}
},{"./ac-swipe/Swipe":696}],696:[function(c,f,b){var d=c("ac-object").create;var a=c("ac-feature/touchAvailable");
var h=c("ac-event-emitter").EventEmitter;function j(k){if(!a()){return}this.el=k;
this.minSwipeInPixels=72;this.fingerCount=0;this.startX=0;this.startY=0;this.currentX=0;
this.currentY=0;this.swipeLength=0;this.swipeAngle=0;this.swipeDirection=0;this.eventTriggered=false;
this._init()}j.TOUCH_START="touchstart";j.TOUCH_MOVE="touchmove";j.TOUCH_END="touchend";
j.TOUCH_CANCEL="touchcancel";j.SWIPE_RIGHT="swiperight";j.SWIPE_LEFT="swipeleft";
j.SWIPE_UP="swipeup";j.SWIPE_DOWN="swipedown";var g=j.prototype=d(h.prototype);
j.prototype.constructor=j;g.destroy=function(){removeEventListener(this.el,j.TOUCH_START,this._boundFunctions._touchStart);
removeEventListener(this.el,j.TOUCH_MOVE,this._boundFunctions._touchMove);removeEventListener(this.el,j.TOUCH_END,this._boundFunctions._touchEnd);
removeEventListener(this.el,j.TOUCH_CANCEL,this._boundFunctions._touchCancel);this.el=null;
this._boundFunctions=null;this.off()};g._init=function(){this._boundFunctions={_touchStart:this._touchStart.bind(this),_touchMove:this._touchMove.bind(this),_touchEnd:this._touchEnd.bind(this),_touchCancel:this._touchCancel.bind(this)};
this.el.addEventListener(j.TOUCH_START,this._boundFunctions._touchStart,false);
this.el.addEventListener(j.TOUCH_MOVE,this._boundFunctions._touchMove,false);this.el.addEventListener(j.TOUCH_END,this._boundFunctions._touchEnd,false);
this.el.addEventListener(j.TOUCH_CANCEL,this._boundFunctions._touchCancel,false)
};g._touchStart=function(k){this.fingerCount=k.touches.length;if(this.fingerCount===1){this.startX=k.touches[0].screenX;
this.startY=k.touches[0].screenY}else{this._touchCancel()}};g._touchMove=function(k){if(k.touches.length===1){this.currentX=k.touches[0].screenX;
this.currentY=k.touches[0].screenY;this._setSwipeLength.call(this)}else{this._touchCancel()
}};g._touchEnd=function(m){if(this.fingerCount===1&&this.currentX!==0){this._setSwipeLength();
var l=Math.abs(this.startX-this.currentX);var k=Math.abs(this.startY-this.currentY);
if(k>l){this._touchCancel();return}if(this.swipeLength>=this.minSwipeInPixels&&!this.eventTriggered){this._setSwipeAngle();
this._setSwipeDirection();this._triggerSwipeEvent()}}else{this._touchCancel()}};
g._touchCancel=function(){this._reset()};g._setSwipeLength=function(){this.swipeLength=Math.round(Math.sqrt(Math.pow(this.currentX-this.startX,2)+Math.pow(this.currentY-this.startY,2)))
};g._setSwipeAngle=function(){var m=this.startX-this.currentX;var l=this.currentY-this.startY;
var k=Math.atan2(l,m);this.swipeAngle=Math.round(k*180/Math.PI);if(this.swipeAngle<0){this.swipeAngle=360-Math.abs(this.swipeAngle)
}};g._setSwipeDirection=function(){if((this.swipeAngle<=45)&&(this.swipeAngle>=0)||(this.swipeAngle<=360)&&(this.swipeAngle>=315)){this.swipeDirection=j.SWIPE_LEFT
}else{if((this.swipeAngle>=135)&&(this.swipeAngle<=225)){this.swipeDirection=j.SWIPE_RIGHT
}else{if((this.swipeAngle>45)&&(this.swipeAngle<135)){this.swipeDirection=j.SWIPE_DOWN
}else{this.swipeDirection=j.SWIPE_UP}}}};g._triggerSwipeEvent=function(){this.trigger(this.swipeDirection,{cancelable:true});
this.eventTriggered=true;this._touchCancel()};g._reset=function(){this.fingerCount=0;
this.startX=0;this.startY=0;this.currentX=0;this.currentY=0;this.swipeLength=0;
this.swipeAngle=0;this.swipeDirection=0;this.eventTriggered=false};f.exports=j},{"ac-event-emitter":480,"ac-feature/touchAvailable":520,"ac-object":554}],697:[function(b,c,a){c.exports={viewports:{large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288,"max-device-width":768}},"viewports-smallondesktop":{large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288}},"viewports-mobilefirst":{small:{"min-width":320,"max-width":735,content:288,oldie:true},medium:{"min-width":736,"max-width":1068,content:692},large:{"min-width":1069,"max-width":1441,content:980},xlarge:{"min-width":1442,content:980}}}
},{}],698:[function(b,f,a){var d=b("./ac-ajax/Ajax");var c=b("./ac-ajax/Request");
f.exports=new d();f.exports.Ajax=d;f.exports.Request=c},{"./ac-ajax/Ajax":699,"./ac-ajax/Request":700}],699:[function(c,g,b){var f=c("./Request");
var h=c("./XDomain-request");var a=c("./URLParser");var d=function(){};d._Request=f;
d.prototype={_defaults:{method:"get",timeout:5000},_extend:function(){for(var k=1;
k<arguments.length;k++){for(var j in arguments[k]){if(arguments[k].hasOwnProperty(j)){arguments[0][j]=arguments[k][j]
}}}return arguments[0]},_getOptions:function(j,k){return this._extend({},this._defaults,k,j)
},_isCrossDomainRequest:function(m){var l=new a();var k=l.parse(window.location.href).origin;
var j=l.parse(m).origin;l.destroy();return(j!==k)},create:function(j){return new f(j)
},cors:function(k){var j=(window.XDomainRequest&&document.documentMode<10)?h:f;
return new j(k)},get:function(k){var j;k=this._getOptions({method:"get"},k);if(this._isCrossDomainRequest(k.url)){j=this.cors(k)
}else{j=this.create(k)}return j.send()},getJSON:function(j){return this.get(j).then(function(k){return JSON.parse(k.responseText)
})},head:function(j){j=this._getOptions({method:"head"},j);return this.create(j).send()
},isCrossDomainRequest:function(j){return this._isCrossDomainRequest(j)},post:function(j){j=this._getOptions({method:"post"},j);
return this.create(j).send()}};g.exports=d},{"./Request":700,"./URLParser":701,"./XDomain-request":702}],700:[function(b,d,a){var c=function(f){this._initialize(f)
};c.create=function(){var f=function(){};f.prototype=c.prototype;return new f()
};c.prototype={_addReadyStateChangeHandler:function(){this.xhr.onreadystatechange=function(f){if(this.xhr.readyState===4){clearTimeout(this._timeout);
if(this.xhr.status>=200&&this.xhr.status<300){this.resolve(this.xhr)}else{this.reject(this.xhr)
}}}.bind(this)},_getPromise:function(){this.promise=new Promise(function(g,f){this.resolve=g;
this.reject=f}.bind(this))},_getTransport:function(){return new XMLHttpRequest()
},_initialize:function(h){var g=this._validateConfiguration(h);if(g){throw g}this._configuration=h;
var f=this._configuration.method.toUpperCase();this.xhr=this._getTransport();this._getPromise();
this.xhr.open(f,this._configuration.url);this._setRequestHeaders(h.headers);this._addReadyStateChangeHandler()
},_sendXHR:function(){if(this.xhr){if(this._configuration&&this._configuration.data){this.xhr.send(this._configuration.data)
}else{this.xhr.send()}}},_setRequestHeaders:function(f){if(f){f.forEach(function(g){this.xhr.setRequestHeader(g.name,g.value)
},this)}},_setTimeout:function(f){if(!f){if(this._configuration&&this._configuration.timeout){f=this._configuration.timeout
}else{clearTimeout(this._timeout);this._timeout=null}}if(this._timeout!==null){clearTimeout(this._timeout)
}if(f>0){this._timeout=setTimeout(function(){this.xhr.abort();this.reject()}.bind(this),f)
}},_timeout:null,_validateConfiguration:function(h){if(!h){return"Must provide a configuration object"
}var g=[];var f=h.headers;if(!h.url){g.push("Must provide a url")}if(!h.method){g.push("Must provide a method")
}if(f){if(!Array.isArray(f)){return"Must provide an array of headers"}this._validateHeaders(f,g)
}return g.join(", ")},_validateHeaders:function(h,j){for(var g=0,f=h.length;g<f;
g++){if(!h[g].hasOwnProperty("name")||!h[g].hasOwnProperty("value")){j.push("Must provide a name and value key for all headers");
break}}},promise:null,reject:null,resolve:null,send:function(){this._setTimeout();
this._sendXHR();return this.promise},xhr:null};d.exports=c},{}],701:[function(c,d,b){var a=function(){this.parser=null
};var f=a.prototype;f.parse=function(l){var j;var m;var h;var g;var k;if(typeof l!=="string"){throw new TypeError(l+" must be a string")
}if(!this.parser){this.parser=document.createElement("a")}this._qualifyPath(l);
h=this.parser.hostname;m=this.parser.protocol;g=this._normalizePort(this.parser);
j=this.parser.origin||this._constructOriginString(this.parser,g);k=this.parser.search;
return{originalPath:l,qualifiedPath:this.parser.href,protocol:m,hostname:h,origin:j,port:g,search:k}
};f.destroy=function(){this.parser=null};f._constructOriginString=function(j,g){var h=g?":"+g:"";
return j.protocol+"//"+j.hostname+h};f._normalizePort=function(g){return(g.port==="80"||g.port==="443"||g.port==="0")?"":g.port
};f._qualifyPath=function(g){this.parser.href=g;this.parser.href=this.parser.href
};d.exports=a},{}],702:[function(b,d,a){var c=b("./Request");var f=function(g){c.apply(this,arguments)
};f.prototype=c.create();f.prototype._getTransport=function(){return new XDomainRequest()
};f.prototype._addReadyStateChangeHandler=function(){this.xhr.ontimeout=function(){this.reject(this.xhr)
}.bind(this);this.xhr.onerror=function(){this.reject(this.xhr)}.bind(this);this.xhr.onload=function(){this.resolve(this.xhr)
}.bind(this)};f.prototype._setTimeout=function(g){if(!g){if(this._configuration&&this._configuration.timeout){g=this._configuration.timeout
}}if(g>0){this.xhr.timeout=g}};f.prototype._sendXHR=function(){setTimeout(function(){c.prototype._sendXHR.call(this)
}.bind(this),0)};d.exports=f},{"./Request":700}],703:[function(b,c,a){arguments[4][142][0].apply(a,arguments)
},{dup:142}],704:[function(b,c,a){c.exports={isString:b("./ac-string/isString"),toCamelCase:b("./ac-string/toCamelCase"),queryStringToObject:b("./ac-string/queryStringToObject"),toQueryPair:b("./ac-string/toQueryPair"),queryParameters:b("./ac-string/queryParameters"),supplant:b("./ac-string/supplant")}
},{"./ac-string/isString":705,"./ac-string/queryParameters":706,"./ac-string/queryStringToObject":707,"./ac-string/supplant":708,"./ac-string/toCamelCase":709,"./ac-string/toQueryPair":710}],705:[function(c,d,b){d.exports=function a(f){return(typeof f==="string")
}},{}],706:[function(d,f,c){var a=d("./queryStringToObject");f.exports=function b(){var g={};
var h=window.location.toString().split("?")[1];if(typeof h==="string"){g=a(h)}return g
}},{"./queryStringToObject":707}],707:[function(d,f,c){var a=d("qs");f.exports=function b(g){if(typeof g!=="string"){throw new TypeError("QueryStringToObject error: argument must be a string")
}return a.parse(g)}},{qs:703}],708:[function(b,c,a){c.exports=function d(h,g,f){if(!g){return h
}f=f||/{([^{}]*)}/g;return h.replace(f,function(k,j){var l=g[j];return typeof l==="string"||typeof l==="number"?l:k
})}},{}],709:[function(b,c,a){c.exports=function d(f){if(typeof f!=="string"){throw new TypeError("Argument must be of type String.")
}return f.replace(/-+(.)?/g,function(g,h){return h?h.toUpperCase():""})}},{}],710:[function(b,c,a){c.exports=function d(f,g){if(typeof f!=="string"||typeof g!=="string"){throw new TypeError("toQueryPair error: argument must be a string")
}return encodeURIComponent(f)+"="+encodeURIComponent(g)}},{}],711:[function(c,d,b){var a=c("./ac-vatman/vat-client");
var f=c("./ac-vatman/vat-resource");var g={createPlayer:c("./ac-vatman/factory/createPlayer"),vatClient:a,vatResource:f};
d.exports=g},{"./ac-vatman/factory/createPlayer":712,"./ac-vatman/vat-client":719,"./ac-vatman/vat-resource":720}],712:[function(c,a,g){var n=c("./../featureDetection/canPlayType");
var d=c("./../featureDetection/canPlayTypeNatively");var m=c("./../featureDetection/canPlayTypeQuicktime");
var l=c("./../featureDetection/featureDetect").shouldPlayQuicktime;var j=c("./../featureDetection/featureDetect").textTrackDisablingNotAvailable;
function h(p,o){o.type="quicktime";return p.create(o)}function k(p,o){return p.create(o)
}function f(o){var q=this.findTextTrackModelFromNativeTrack(o);var p=this.getEnabledTextTracks();
p.forEach(function(r){if(q.cid!==r.cid){r.disable()}});if(q.get("mode")==="disabled"){q.hide()
}}function b(r,q){q=q||{};var p="video/quicktime";var o="video/mp4";var s;if(d(p)||d(o)&&(!l())){s=k(r,q)
}else{if(m(p)){q.type="quicktime";s=h(r,q)}}if(s&&!j()){s.on("addtrack",f,s)}return s
}a.exports=b},{"./../featureDetection/canPlayType":713,"./../featureDetection/canPlayTypeNatively":714,"./../featureDetection/canPlayTypeQuicktime":715,"./../featureDetection/featureDetect":716}],713:[function(b,d,a){var f=b("./canPlayTypeNatively");
var c=b("./canPlayTypeQuicktime");function g(j){var h=f(j);if(!h){h=c(j)}return h
}d.exports=g},{"./canPlayTypeNatively":714,"./canPlayTypeQuicktime":715}],714:[function(c,d,b){var f;
function a(){return document.createElement("video")}d.exports=function g(j){var k="";
var h=a();if(typeof h.canPlayType==="function"){k=h.canPlayType(j)}return k}},{}],715:[function(c,f,b){var a=c("./quicktime");
f.exports=function d(g){var h="";if(g==="video/quicktime"&&a.getPluginVersion()!==undefined){h="maybe"
}return h}},{"./quicktime":717}],716:[function(b,c,a){var f=b("ac-browser");var d=f.name.toLowerCase();
c.exports={shouldPlayMOV:function(){return(d==="safari"||d==="safari mobile")},shouldPlayQuicktime:function(){return(d==="ie"&&f.version<9)
},textTrackDisablingNotAvailable:function(){return(d==="safari mobile"&&f.version===7)
}}},{"ac-browser":261}],717:[function(b,c,a){c.exports={getPlugins:function(){return navigator.plugins
},getPluginVersion:function(){var j;var k=/(\d+\.){2}(\d+){1}$/;var d=this.getPlugins();
if(d&&d[0]){for(var h=0;h<d.length;h++){var f=(/QuickTime/i.test(d[h].name)&&typeof j==="undefined");
if(f){if(d[h].version){j=d[h].version}else{if(k.test(d[h].name)){j=d[h].name.match(k);
j=j[0]||undefined}}}}}else{var g=["QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1"];
g.forEach(function(m){var n;var l;try{n=new ActiveXObject(m);l=(typeof n==="object"&&typeof n.QuickTimeVersion!=="undefined"&&typeof j==="undefined");
if(l){j=n.QuickTimeVersion}}catch(o){}})}return j}}},{}],718:[function(b,c,a){c.exports={bg:"български език",cs:"Czech",el:"Greek",de:"German",da:"Danish",en:"English",es:"Spanish",et:"Estonian",fi:"Finnish",fr:"Français",hr:"Croatian",hu:"Hungarian",it:"Italian",ja:"Japanese",ko:"Korean",lt:"Lithuanian",lv:"Latvian",nl:"Dutch",no:"Norsk",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sk:"Slovak",sv:"Swedish",tr:"Turkish",zh:"Chinese"}
},{}],719:[function(d,b,g){var k=d("ac-ajax");var h=d("ac-string");var l=/(-[a-z]{2}-([a-z]{2}-){0,})[0-9]{8}_r[0-9].+\.mov$/;
var a=/_r[0-9].+\.mov$/;var j=/((-([a-z]{2}))*)-[0-9]+/;var o=/((-([a-z]{2}))*)-/;
var c="m";var f="_{width}x{height}{suffix}."+c+"p4";var n=[{width:416,height:234,type:"baseline-high",suffix:"h"},{width:416,height:234,type:"small",suffix:"h"},{width:416,height:234,type:"baseline-low",suffix:"l"},{width:416,height:234,type:"baseline-medium",suffix:"m"},{width:640,height:360,type:"medium",suffix:"h"},{width:848,height:480,type:"large",suffix:""},{width:960,height:540,type:"large",suffix:""},{width:1280,height:720,type:"large",suffix:"h"},{width:1280,height:720,type:"large",suffix:"l"}];
var p={create:function(){var m=function(){};m.prototype=this;return new m()},getSource:function(m,r,q){var t=n;
if(!m){throw"Must provide a vatRefMovie"}if(!r){throw"Must provide a width"}if(q){t=t.filter(function(u){return u.type===q
})}var s=t.reduce(function(u,v){return Math.abs(v.width-r)<Math.abs(u.width-r)?v:u
});return m.replace(a,h.supplant(f,s))},getConfigPath:function(m){return m.replace(l,"-current.json")
},getConfig:function(m){return k.getJSON({url:this.getConfigPath(m)})},getVTTSource:function(m){return m.replace(a,"_cc.vtt")
}};b.exports=p},{"ac-ajax":698,"ac-string":704}],720:[function(c,d,b){var a=c("./vat-client");
var h=c("./localization/language");var g=c("./featureDetection/featureDetect").shouldPlayMOV;
var f={create:function(k){if(!k){throw"Must provide a vatRefMovie."}var l=function(){};
l.prototype=this;var j=new l();j.vatRefMovie=k;j.vatVTTSource=[];return j},getSource:function(k,j){return a.getSource(this.vatRefMovie,k,j)
},getConfig:function(){return a.getConfig(this.vatRefMovie)},getVTTSource:function(){return a.getVTTSource(this.vatRefMovie)
},_getCaptionsSrcLang:function(k){var j="";if(typeof k==="string"&&k.indexOf("-")!==-1){j=k.split("-")[0]
}return j},_isNewVTTSrc:function(j){return(this.vatVTTSource.indexOf(j)===-1)},_handleCaptions:function(l){var m;
var j="";var k={};this.getConfig().then(function(n){if(!n.metadata.captions){return
}m=this.getVTTSource();if(m&&(this._isNewVTTSrc(m)===true)){if(n.metadata.lang){j=this._getCaptionsSrcLang(n.metadata.lang)
}k.kind="caption";k.src=m;k.mode="hidden";if(j){k.srclang=j;k.label=h[j]||null}l.addTextTrackFromRemoteVTT(k);
this.vatVTTSource.push(m)}}.bind(this))},setPlayerSrc:function(j,m,k){var l=this.vatRefMovie;
if(!g()){l=this.getSource(m,k)}j.setSrc(l);this._handleCaptions(j)}};d.exports=f
},{"./featureDetection/featureDetect":716,"./localization/language":718,"./vat-client":719}],721:[function(b,c,a){arguments[4][279][0].apply(a,arguments)
},{"./ac-event-emitter/EventEmitter":722,dup:279}],722:[function(b,c,a){arguments[4][280][0].apply(a,arguments)
},{dup:280}],723:[function(b,c,a){arguments[4][142][0].apply(a,arguments)},{dup:142}],724:[function(b,c,a){arguments[4][396][0].apply(a,arguments)
},{"./ac-object/clone":725,"./ac-object/create":726,"./ac-object/defaults":727,"./ac-object/extend":728,"./ac-object/getPrototypeOf":729,"./ac-object/isDate":730,"./ac-object/isEmpty":731,"./ac-object/isRegExp":732,"./ac-object/toQueryParameters":733,dup:396}],725:[function(b,c,a){arguments[4][397][0].apply(a,arguments)
},{"./extend":728,dup:397}],726:[function(b,c,a){arguments[4][398][0].apply(a,arguments)
},{dup:398}],727:[function(b,c,a){arguments[4][399][0].apply(a,arguments)},{"./extend":728,dup:399}],728:[function(b,c,a){arguments[4][400][0].apply(a,arguments)
},{dup:400}],729:[function(b,c,a){arguments[4][401][0].apply(a,arguments)},{dup:401}],730:[function(b,c,a){arguments[4][402][0].apply(a,arguments)
},{dup:402}],731:[function(b,c,a){arguments[4][403][0].apply(a,arguments)},{dup:403}],732:[function(b,c,a){arguments[4][404][0].apply(a,arguments)
},{dup:404}],733:[function(b,c,a){arguments[4][405][0].apply(a,arguments)},{dup:405,qs:723}],734:[function(b,c,a){arguments[4][584][0].apply(a,arguments)
},{"./ac-breakpoints-delegate/BreakpointsDelegate":735,dup:584}],735:[function(f,b,k){var d=f("ac-shared-instance").SharedInstance,g=f("ac-object"),r=f("ac-window-delegate").WindowDelegate,c=f("ac-window-delegate").WindowDelegateCustomEvent,q=f("ac-event-emitter").EventEmitter;
var n="ac-breakpoints-delegate:BreakpointsDelegate",a="2.1.0-1";var o="breakpoint",p="resize orientationchange";
var h={large:{"min-width":1069,"max-width":1441,content:980,oldie:true},xlarge:{"min-width":1442,content:980},medium:{"min-width":736,"max-width":1068,content:692},small:{"min-width":320,"max-width":735,content:288,"max-device-width":768}};
var j={minWidth:"min-width",maxWidth:"max-width",maxDeviceWidth:"max-device-width",content:"content",oldIE:"oldie"};
function m(s){this._customEvent=new c(o,this._onBreakpointListenerAdded.bind(this),this._onBreakpointListenerRemoved.bind(this));
this.setBreakpoints(h)}var l=m.prototype;l.initialize=function(){this._breakpoint=null;
this._lastBreakpoint=null;this._handleOldIE();this._breakpointOrder=this._setBreakpointOrder();
if(!this._isOldIE){this._handleResize()}};l.getCustomEvent=function(){return this._customEvent
};l.getBreakpoint=function(){if(!this._customEvent.active){this._handleResize()
}return this._breakpoint};l.setBreakpoints=function(s){this.breakpoints=g.clone(s);
this.initialize()};l._handleResize=function(){var w=r.clientWidth(),x;var v,u,t,s=this._breakpointOrder.length;
for(v=0;v<s;v++){u=this._breakpointOrder[v];t=this.breakpoints[u];if(t._breakPosition>w){break
}}if(v>0){v=v-1}x=this.breakpoints[this._breakpointOrder[v]];if(!this._breakpoint){this._breakpoint=x;
return}if(x.name===this._breakpoint.name){return}this._lastBreakpoint=this._breakpoint;
this._breakpoint=x;r.trigger(o,{incoming:this._breakpoint,outgoing:this._lastBreakpoint})
};l._setBreakpointOrder=function(){var w=0,t=[],s=[],v=j.minWidth,u;for(u in this.breakpoints){if(this.breakpoints.hasOwnProperty(u)){this.breakpoints[u].name=u;
t.push(this.breakpoints[u][v])}}t.sort(function(y,x){return y-x});t.forEach(function(y){var x;
for(x in this.breakpoints){if(this.breakpoints.hasOwnProperty(x)){if(this.breakpoints[x][v]===y){s.push(x)
}}}},this);s.forEach(function(y,x){this.breakpoints[y]._breakPosition=w;if(s[x+1]){w=this.breakpoints[s[x+1]][v]
}},this);return s};l._handleOldIE=function(){var s=document.documentElement,u=j.oldIE;
if(s.className.indexOf("no-"+u)>-1||s.className.indexOf(u)===-1){return}this._isOldIE=true;
this._replaceBreakpoints(function(v){return v[u]===true});var t;for(t in this.breakpoints){if(this.breakpoints.hasOwnProperty(t)){this._breakpoint=this.breakpoints[t];
return}}};l._replaceBreakpoints=function(v){var t,u={},s;for(t in this.breakpoints){if(this.breakpoints.hasOwnProperty(t)){s=this.breakpoints[t];
if(v(s)){u[t]=g.clone(this.breakpoints[t])}}}this.breakpoints=u};l._onBreakpointListenerAdded=function(){r.on(p,this._handleResize,this)
};l._onBreakpointListenerRemoved=function(){r.off(p,this._handleResize,this)};b.exports=d.share(n,a,m)
},{"ac-event-emitter":721,"ac-object":724,"ac-shared-instance":736,"ac-window-delegate":773}],736:[function(b,c,a){arguments[4][455][0].apply(a,arguments)
},{"./ac-shared-instance/SharedInstance":737,dup:455}],737:[function(b,c,a){arguments[4][456][0].apply(a,arguments)
},{dup:456}],738:[function(b,c,a){arguments[4][588][0].apply(a,arguments)},{"./ac-prefixer/Prefixer":739,dup:588}],739:[function(b,c,a){arguments[4][589][0].apply(a,arguments)
},{"./Prefixer/camelCasedEvents":740,dup:589}],740:[function(b,c,a){arguments[4][590][0].apply(a,arguments)
},{dup:590}],741:[function(b,c,a){arguments[4][591][0].apply(a,arguments)},{"./ac-dom-events/addEventListener":742,"./ac-dom-events/dispatchEvent":743,"./ac-dom-events/preventDefault":744,"./ac-dom-events/removeEventListener":745,"./ac-dom-events/stop":746,"./ac-dom-events/stopPropagation":747,"./ac-dom-events/target":748,dup:591}],742:[function(b,c,a){arguments[4][592][0].apply(a,arguments)
},{"ac-prefixer":738,dup:592}],743:[function(b,c,a){arguments[4][593][0].apply(a,arguments)
},{dup:593}],744:[function(b,c,a){arguments[4][305][0].apply(a,arguments)},{dup:305}],745:[function(b,c,a){arguments[4][595][0].apply(a,arguments)
},{"ac-prefixer":738,dup:595}],746:[function(b,c,a){arguments[4][308][0].apply(a,arguments)
},{"./preventDefault":744,"./stopPropagation":747,dup:308}],747:[function(b,c,a){arguments[4][309][0].apply(a,arguments)
},{dup:309}],748:[function(b,c,a){arguments[4][598][0].apply(a,arguments)},{dup:598}],749:[function(b,c,a){arguments[4][434][0].apply(a,arguments)
},{"./ac-dom-traversal/ancestor":750,"./ac-dom-traversal/ancestors":751,"./ac-dom-traversal/children":752,"./ac-dom-traversal/filterBySelector":753,"./ac-dom-traversal/firstChild":754,"./ac-dom-traversal/lastChild":757,"./ac-dom-traversal/matchesSelector":758,"./ac-dom-traversal/nextSibling":759,"./ac-dom-traversal/nextSiblings":760,"./ac-dom-traversal/previousSibling":761,"./ac-dom-traversal/previousSiblings":762,"./ac-dom-traversal/querySelector":763,"./ac-dom-traversal/querySelectorAll":764,"./ac-dom-traversal/shims/ie":765,"./ac-dom-traversal/siblings":766,dup:434}],750:[function(b,c,a){arguments[4][435][0].apply(a,arguments)
},{"./helpers/validate":756,"./matchesSelector":758,"ac-dom-nodes":335,dup:435}],751:[function(b,c,a){arguments[4][436][0].apply(a,arguments)
},{"./helpers/validate":756,"./matchesSelector":758,"ac-dom-nodes":335,dup:436}],752:[function(b,c,a){arguments[4][437][0].apply(a,arguments)
},{"./filterBySelector":753,"./helpers/validate":756,"ac-dom-nodes":335,dup:437}],753:[function(b,c,a){arguments[4][438][0].apply(a,arguments)
},{"./helpers/validate":756,"./matchesSelector":758,dup:438}],754:[function(b,c,a){arguments[4][439][0].apply(a,arguments)
},{"./children":752,"./helpers/validate":756,dup:439}],755:[function(b,c,a){arguments[4][440][0].apply(a,arguments)
},{dup:440}],756:[function(b,c,a){arguments[4][441][0].apply(a,arguments)},{"ac-dom-nodes":335,dup:441}],757:[function(b,c,a){arguments[4][442][0].apply(a,arguments)
},{"./children":752,"./helpers/validate":756,dup:442}],758:[function(b,c,a){arguments[4][443][0].apply(a,arguments)
},{"./helpers/nativeMatches":755,"./helpers/validate":756,"ac-dom-nodes":335,dup:443}],759:[function(b,c,a){arguments[4][444][0].apply(a,arguments)
},{"./helpers/validate":756,"./matchesSelector":758,"ac-dom-nodes":335,dup:444}],760:[function(b,c,a){arguments[4][445][0].apply(a,arguments)
},{"./helpers/validate":756,"./matchesSelector":758,"ac-dom-nodes":335,dup:445}],761:[function(b,c,a){arguments[4][446][0].apply(a,arguments)
},{"./helpers/validate":756,"./matchesSelector":758,"ac-dom-nodes":335,dup:446}],762:[function(b,c,a){arguments[4][447][0].apply(a,arguments)
},{"./helpers/validate":756,"./matchesSelector":758,"ac-dom-nodes":335,dup:447}],763:[function(b,c,a){arguments[4][448][0].apply(a,arguments)
},{"./helpers/validate":756,dup:448}],764:[function(b,c,a){arguments[4][449][0].apply(a,arguments)
},{"./helpers/validate":756,dup:449}],765:[function(b,c,a){arguments[4][450][0].apply(a,arguments)
},{"../helpers/nativeMatches":755,"../helpers/validate":756,"../vendor/sizzle/sizzle":767,"ac-dom-nodes":335,dup:450}],766:[function(b,c,a){arguments[4][451][0].apply(a,arguments)
},{"./children":752,"./helpers/validate":756,dup:451}],767:[function(b,c,a){arguments[4][452][0].apply(a,arguments)
},{dup:452}],768:[function(b,c,a){arguments[4][618][0].apply(a,arguments)},{"./ac-dom-emitter/DOMEmitter":769,dup:618}],769:[function(b,c,a){arguments[4][619][0].apply(a,arguments)
},{"./DOMEmitterEvent":770,"ac-dom-events":741,"ac-dom-traversal":749,"ac-event-emitter":771,dup:619}],770:[function(b,c,a){arguments[4][620][0].apply(a,arguments)
},{"ac-dom-events":741,dup:620}],771:[function(b,c,a){arguments[4][279][0].apply(a,arguments)
},{"./ac-event-emitter/EventEmitter":772,dup:279}],772:[function(b,c,a){arguments[4][280][0].apply(a,arguments)
},{dup:280}],773:[function(b,c,a){arguments[4][457][0].apply(a,arguments)},{"./ac-window-delegate/WindowDelegate":776,"./ac-window-delegate/WindowDelegateCustomEvent":777,"./ac-window-delegate/WindowDelegateOptimizer":778,dup:457}],774:[function(b,c,a){arguments[4][458][0].apply(a,arguments)
},{"ac-event-emitter":771,dup:458}],775:[function(b,c,a){arguments[4][459][0].apply(a,arguments)
},{"ac-event-emitter":771,dup:459}],776:[function(b,c,a){arguments[4][626][0].apply(a,arguments)
},{"./CustomEventController":774,"./OptimizerController":775,"./optimizers/optimizers":781,"./queries/queries":790,"ac-dom-emitter":768,"ac-shared-instance":736,dup:626}],777:[function(b,c,a){arguments[4][461][0].apply(a,arguments)
},{"ac-event-emitter":771,dup:461}],778:[function(b,c,a){arguments[4][462][0].apply(a,arguments)
},{"ac-event-emitter":771,dup:462}],779:[function(b,c,a){arguments[4][463][0].apply(a,arguments)
},{"../../WindowDelegateOptimizer":778,"../../queries/queries":790,dup:463}],780:[function(b,c,a){arguments[4][464][0].apply(a,arguments)
},{"../../WindowDelegateOptimizer":778,"../../queries/queries":790,dup:464}],781:[function(b,c,a){arguments[4][465][0].apply(a,arguments)
},{"./events/resize":779,"./events/scroll":780,dup:465}],782:[function(b,c,a){arguments[4][466][0].apply(a,arguments)
},{dup:466}],783:[function(b,c,a){arguments[4][467][0].apply(a,arguments)},{dup:467}],784:[function(b,c,a){arguments[4][468][0].apply(a,arguments)
},{dup:468}],785:[function(b,c,a){arguments[4][469][0].apply(a,arguments)},{dup:469}],786:[function(b,c,a){arguments[4][470][0].apply(a,arguments)
},{dup:470}],787:[function(b,c,a){arguments[4][471][0].apply(a,arguments)},{dup:471}],788:[function(b,c,a){arguments[4][472][0].apply(a,arguments)
},{dup:472}],789:[function(b,c,a){arguments[4][473][0].apply(a,arguments)},{dup:473}],790:[function(b,c,a){arguments[4][474][0].apply(a,arguments)
},{"./methods/clientHeight":782,"./methods/clientWidth":783,"./methods/innerHeight":784,"./methods/innerWidth":785,"./methods/maxScrollX":786,"./methods/maxScrollY":787,"./methods/scrollX":788,"./methods/scrollY":789,dup:474}],791:[function(b,c,a){arguments[4][641][0].apply(a,arguments)
},{"./ac-viewport/Viewport":792,dup:641}],792:[function(b,c,a){arguments[4][642][0].apply(a,arguments)
},{"ac-breakpoints-delegate":734,"ac-shared-instance":736,"ac-window-delegate":773,dup:642}],793:[function(b,c,a){var h=b("ac-analytics");
var g=b("ac-event-emitter").EventEmitter;var j=b("ac-browser");function d(k){this.player=k;
this.sources={};this.currentStubPlayer=null;this.playerType="";this.videoType=""
}var f=d.prototype;f.activate=function(){this.player.on("play",function(){this.setCurrentStubPlayer();
this._proxyEvent("play")},this);this.player.on("ended",function(){this._proxyEvent("ended")
},this);this.player.on("timeupdate",function(){this._proxyEvent("timeupdate")},this,this);
this.player.on("texttrackshow",function(){this._proxyEvent("captions-enabled")},this);
this.player.on("durationchange",this.setCurrentStubPlayer,this)};f.getEventData=function(){return{playerType:(this.playerType||null),videoType:(this.videoType||null)}
};f._createObserver=function(l){var k;if(h&&h.observer&&h.observer.Video){k=new h.observer.Video(l)
}return k};f._proxyEvent=function(k){if(this.currentStubPlayer){this.currentStubPlayer.trigger(k,this.getEventData())
}};f.setCurrentStubPlayer=function(){var l=this.player.getCurrentSrc();var k=this.getCurrentSourceObject(l);
if(k&&k.stubPlayer){this.currentStubPlayer=k.stubPlayer;this.playerType=(j.name.toLowerCase()==="ie"&&j.version<9)?"quicktime":"html5";
if(l&&l.attributes&&l.attributes.src){this.videoType=l.attributes.src.split(".").pop()
}}};f.getSourceObjectByCID=function(m){var k;for(var l in this.sources){if(this.sources.hasOwnProperty(l)){if(this.sources[l].cid===m){k=this.sources[l];
break}}}return k};f.getCurrentSourceObject=function(k){var l;if(k){l=this.getSourceObjectByCID(k.cid)
}return l};f.addSourceObject=function(k,l,n){var m=this._createStubPlayer(k);this.sources[l]={stubPlayer:m,observer:this._createObserver(m),cid:n}
};f._createStubPlayer=function(k){var l=new g();l.el=k;return l};c.exports=d},{"ac-analytics":"ac-analytics","ac-browser":261,"ac-event-emitter":480}],794:[function(h,c,u){h("ac-polyfills/Element/prototype.classList");
var g=h("ac-dom-traversal/querySelector");var p=h("ac-dom-traversal/querySelectorAll");
var b=h("ac-element-tracker").ElementTracker;var s=h("ac-viewport").Viewport;var l=h("ac-feature");
var q=h("ac-browser");var a=h("ac-films").create;var j=h("./model/SectionMap");
var r=h("./model/DataAttributes");var t=h("./sharedsections/BaseSection");var f=h("./ClipRegistry");
var o=h("./TimeoutRegistry");var d=h("./LocalNavStyleChanger");var k=h("./FilmsEmitterProxy");
function n(){this.name=this.name||"[NOT SET]";this._mainEl=g(".main");this._sections=[];
this._visibleSections=[];this._elementTracker=new b(null,{autoStart:true});this._currentSection=null;
this._sectionUnderLocalNav=null;this.setupEventBindings();this.setupSections();
this._updateSectionVisibility(this._getScrollY(),this._getVisibleBottomOfPage());
this.setupLocalNavStyleChanger();this.setupFilmsController();if(!document.body.classList.contains("js-ready")){document.body.classList.add("js-ready")
}}var m=n.prototype;m.destroy=function(){this.teardownEvents();for(var w=0,v=this._sections.length;
w<v;w++){this._sections[w].destroy()}this._elementTracker.stop();this._elementTracker=null;
this._sections=null;this._currentSection=null;this._sectionUnderLocalNav=null;this._visibleSections=null;
this._boundFunctions=null;this._mainEl=null;if(this._scrollClip){this._scrollClip.destroy();
this._scrollClip=null}};m.setupEventBindings=function(){this._boundFunctions={onViewportChange:this._onViewportMetricsChange.bind(this),onBreakpoint:this._onBreakpoint.bind(this),onPageDidAppear:this._onPageDidAppear.bind(this),onPageWillDisappear:this._onPageWillDisappear.bind(this)};
s.on("scroll resize orientationchange",this._boundFunctions.onViewportChange);s.on("breakpoint",this._boundFunctions.onBreakpoint)
};m.teardownEvents=function(){this._elementTracker.windowDelegate.off("scroll resize orientationchange",this._boundFunctions.onViewportChange);
this._elementTracker.off();s.off("scroll resize orientationchange",this._boundFunctions.onViewportChange);
s.off("breakpoint",this._boundFunctions.onBreakpoint)};m.setupSections=function(){var x=p(".section",this._mainEl);
for(var A=0,v=x.length;A<v;A++){var z=x[A];var y=this._elementTracker.addElement(z);
this._elementTracker.refreshElementState(y);var B=z.hasAttribute(r.SECTION_TYPE)?z.getAttribute(r.SECTION_TYPE):"BaseSection";
if(!j.hasOwnProperty(B)){throw"BasePage::setupSections no section type '"+B+"'found!"
}var w=j[B];var C=new w(z,y,A);C.setupEvents();this._sections.push(C)}};m.setupFilmsController=function(){var v;
if(q.os.toLowerCase()==="ios"&&l.isHandheld()){v=p(".ac-video:not([data-offscreen-modal])")
}else{v=p(".ac-video")}var w;if(v.length>0){w=a(v,{modal:true,deep:true});k.hasFilms=true;
if(w&&w.modalVideo){w.modalVideo.on("close",function(){k.trigger("close")})}}};
m.setupLocalNavStyleChanger=function(){var v=this._mainEl.getAttribute("data-page-type");
d.initialize(this._currentSection,v)};m._activateSection=function(v){if(this._currentSection==v){return
}if(this._currentSection){this._currentSection.deactivate()}this._currentSection=v;
this._currentSection.activate()};m._updateSectionVisibility=function(y,w){var x=this._sections[0];
var z=[];var B=0;for(var A=0,v=this._sections.length;A<v;A++){var C=this._sections[A];
if(C.trackedElement.pixelsInView>0.000001){z.push(C)}if(C.trackedElement.pixelsInView>B){x=C;
B=C.trackedElement.pixelsInView}}for(A=0,v=Math.max(this._visibleSections.length,z.length);
A<v;A++){if(this._visibleSections[A]&&z.indexOf(this._visibleSections[A])===-1){this._visibleSections[A].onViewWillDisappear(y,w)
}if(z[A]&&this._visibleSections.indexOf(z[A])===-1){z[A].onViewWillAppear(y,w)}}this._visibleSections=z;
this._activateSection(x)};m._onPageDidAppear=function(v){var w=g(".section-hero .icon-paddledown",this._mainEl);
if(w){f.add(new Clip(w,1.5,{destroyOnComplete:true,opacity:1}).play())}};m._onPageWillDisappear=function(v){f.destroyClips();
o.clearTimeouts();this.destroy()};m._onBreakpoint=function(y){var w=this._getScrollY();
var v=this._getVisibleBottomOfPage();for(var x=0;x<this._sections.length;x++){this._sections[x].onBreakpoint(y.data.incoming,y.data.outgoing,w,v)
}};m._onViewportMetricsChange=function(B){var x=this._getScrollY();var w=this._getVisibleBottomOfPage();
var A=B.type||B.originalEvent.type;if(A=="resize"||A=="orientation"){for(z=0,v=this._sections.length;
z<v;z++){this._sections[z].onResize(B,x,w)}}this._updateSectionVisibility(x,w);
var y=(A=="scroll");this._sectionUnderLocalNav=this._visibleSections[0];for(var z=0,v=this._visibleSections.length;
z<v;z++){if(y){this._visibleSections[z].onScroll(B,x,w)}if(x+d.height>this._visibleSections[z].scrollToPosition){this._sectionUnderLocalNav=this._visibleSections[z]
}}d.setCurrentSection(this._sectionUnderLocalNav)};m._getSectionForTracker=function(x){for(var w=0,v=this._sections.length;
w<v;w++){if(this._sections[w].trackedElement===x){return this._sections[w]}}return null
};m._getScrollY=function(){return window.pageYOffset||document.body.scrollTop};
m._getVisibleBottomOfPage=function(){return(window.pageYOffset||document.body.scrollTop)+window.innerHeight
};c.exports=n},{"./ClipRegistry":795,"./FilmsEmitterProxy":797,"./LocalNavStyleChanger":798,"./TimeoutRegistry":799,"./model/DataAttributes":809,"./model/SectionMap":812,"./sharedsections/BaseSection":852,"ac-browser":261,"ac-dom-traversal/querySelector":381,"ac-dom-traversal/querySelectorAll":382,"ac-element-tracker":475,"ac-feature":491,"ac-films":"ac-films","ac-polyfills/Element/prototype.classList":568,"ac-viewport":791}],795:[function(b,c,a){b("ac-polyfills/Object/create");
var g=0;var f=function(){this.clips={}};var d=f.prototype;f.prototype.constructor=f;
d.add=function(j){var h="registry-item-"+g;g++;this._destroyClip(h);this.clips[h]=j;
return this.clips[h]};d.remove=function(h){this._destroyClip(h)};d.destroyClips=function(){for(var h in this.clips){if(this.clips.hasOwnProperty(i)){this._destroyClip(i)
}}this.clips={}};d.destroy=function(){this.destroyClips();this.clips=null};d._destroyClip=function(h){if(this.clips[h]){this.clips[h].destroy();
this.clips[h]=null}};c.exports=new f()},{"ac-polyfills/Object/create":569}],796:[function(c,d,b){var g=c("ac-viewport").Viewport;
var f;var a=function(h){h=h||{};this.els={};this.worldSpace={};if(h.els){var j;
for(j in h.els){if(h.els.hasOwnProperty(j)){this.add(j,h.els[j])}}}this._boundOnBreakpoint=this._onBreakpoint.bind(this);
g.on("breakpoint",this._boundOnBreakpoint)};f=a.prototype;f.add=function(h,j){this.els[h]={el:j};
this.initializeElement(h)};f.initializeElements=function(){var h;for(h in this.els){if(this.els.hasOwnProperty(h)){this.initializeElement(h)
}}};f.initializeElement=function(j){var h=this.els[j].el.getBoundingClientRect(),k=g.scrollY();
this.els[j].position={width:h.width,height:h.height,top:h.top+k,left:h.left,centerX:(h.width/2)+h.left,centerY:(h.height/2)+h.top+k}
};f.remove=function(h){this.els[h]=null};f.calculate=function(){var h;for(h in this.els){if(this.els.hasOwnProperty(h)){this.worldSpace[h]=this.getWorldSpace(h)
}}};f.getDistance=function(n,m){var h=this.worldSpace[n],o=this.worldSpace[m];var k=h.x-o.x,j=h.y-o.y,l=Math.sqrt(Math.pow(k,2)+Math.pow(j,2));
return l};f.getWorldSpace=function(h){var j=this.els[h],l=j.position,k;if(this.parallaxOffsets&&this.parallaxOffsets[h]){k=this.parallaxOffsets[h]
}else{k={x:0,y:0,r:0}}return{x:l.centerX+k.x,y:l.centerY+k.y,r:k.r}};f._onBreakpoint=function(){window.requestAnimationFrame(this.initializeElements.bind(this))
};d.exports=a},{"ac-viewport":791}],797:[function(d,f,b){var h=d("ac-event-emitter-micro").EventEmitterMicro,a=d("ac-object");
var g;var c=function(){h.call(this);this.didClose=false;this.hasFilms=false;this.hasAutoplay=false;
this.once("close",this._onClose.bind(this))};g=c.prototype=a.create(h.prototype);
g._onClose=function(){this.didClose=true};f.exports=new c()},{"ac-event-emitter-micro":478,"ac-object":554}],798:[function(c,b,g){c("ac-polyfills/Element/prototype.classList");
var l=c("ac-console").log;var f=c("./model/DataAttributes"),h=c("ac-dom-traversal").querySelector;
var k={light:"ac-localnav-light",dark:"ac-localnav-dark"};var a={"section-light":"light","section-lightgray":"light","section-dark":"dark","section-darkgray":"dark","section-darkergray":"dark","section-superdarkgray":"dark"};
var d="light";var m=function(){this._currentTheme="";this._lastTheme="";this._currentPageNavLink=null;
this._section=null;this._localNav=null;this.height=0};var j=m.prototype;j.initialize=function(o,n){this._getLocalNav();
this.setCurrentSection(o);this.setCurrentPage(n)};j.setCurrentPage=function(n){var o=h(".localnav-link["+f.JUMP_SECTION_NAME+"="+n+"]");
if(o===this._currentPageNavLink){return}if(this._currentPageNavLink){this._currentPageNavLink.classList.remove("current")
}if(o){o.classList.add("current");this._currentPageNavLink=o}};j.setCurrentSection=function(o){if(!o||this._section&&this._section===o){return
}this._section=o;for(var n in a){if(this._section.element.classList.contains(n)){this.setTheme(a[n]);
return}}this.setTheme(d)};j.setTheme=function(n){if(!k[n]||this._currentTheme===n){return
}for(var o in k){if(o!==n){this._localNav.classList.remove(k[o])}else{this._localNav.classList.add(k[o])
}}};j.removeThemes=function(){this._currentTheme=null;for(var n in k){this._localNav.classList.remove(k[n])
}};j._getLocalNav=function(n){if(!this._localNav||n){this._localNav=h("#ac-localnav");
this.height=this._localNav.clientHeight}return this._localNav};m.SECTION_THEME_NAMES=a;
b.exports=new m()},{"./model/DataAttributes":809,"ac-console":291,"ac-dom-traversal":372,"ac-polyfills/Element/prototype.classList":568}],799:[function(b,c,a){function f(){this._timeouts=[]
}var d=f.prototype={};d.setTimeout=function(h,g){var j=setTimeout(h,g);this._timeouts.push(j);
return j};d.clearTimeouts=function(){for(var h=0,g=this._timeouts.length;h<g;h++){clearTimeout(this._timeouts[h])
}this._timeouts=[]};c.exports=new f()},{}],800:[function(d,c,f){var b=d("ac-dom-traversal/querySelectorAll");
var j=d("ac-eclipse").Clip;var h=d("ac-dom-styles/setStyle");var k=d("ac-viewport").Viewport;
var a=function(n,p,m){var l=this;var m=m||{};this.el=n;this.ee=m.elementEngagement||d("./sharedElementEngagement").getInstance();
this.config=JSON.parse(this.el.getAttribute("data-animate-in"));if(!this.config){this.config={}
}this.viewportMap={large:"l",medium:"m",small:"s"};this.currentViewport=this.viewportMap[p];
this.animations=[];var o=b("[data-animate-child]",this.el);if(o.length>0){o.forEach(function(r,q){l.animations.push({el:r,data:JSON.parse(r.getAttribute("data-animate-child"))})
})}else{this.animations.push({el:this.el,data:this.config})}this.animations.forEach(this._configAnimations.bind(this));
this._configElementEngagment();this._track();this._initialize()};var g=a.prototype;
g._configAnimations=function(n){var l=this.currentViewport;var m=n.data;if(m[l]){n.scale=m[l].scale||1;
n.offsetX=m[l].offsetX||0;n.offsetY=m[l].offsetY||0;n.fadeIn=m[l].fadeIn||false
}else{n.scale=m.scale||1;n.offsetX=m.offsetX||0;n.offsetY=m.offsetY||0;n.fadeIn=m.fadeIn||false
}n.initialized=n.initialized||false;n.animated=n.animated||false;n.inView=n.inView||false;
n.duration=m.duration||500;n.delay=m.delay||500;n.repeat=m.repeat||false};g._configElementEngagment=function(){this.timeToEngage=this.config.timeToEngage||500;
this.threshold=this.config.threshold||0.75};g._track=function(){this.trackedEl=this.ee.addElement(this.el,{timeToEngage:this.timeToEngage,inViewThreshold:this.threshold});
this.trackedEl.on("engaged",this._onThresholdEnter.bind(this));this.trackedEl.on("enterview",this._onEnterView.bind(this));
this.trackedEl.on("exitview",this._onExitView.bind(this))};g._initialize=function(){this.animations.forEach(function(l){if(!l.inView){j.to(l.el,0,{transform:{translateX:l.offsetX,translateY:l.offsetY,scale:l.scale}});
if(l.fadeIn){l.el.style.opacity=0}l.initialized=true}})};g._onThresholdEnter=function(){this.animations.forEach(function(l){if(!l.initialized||l.animated){return
}if(l.fadeIn){j.to(l.el,l.duration/1000,{opacity:"1"},{delay:l.delay/1000,ease:l.ease})
}j.to(l.el,l.duration/1000,{transform:{translateX:"0px",translateY:"0px",scale:"1"}},{delay:l.delay/1000,ease:l.ease});
l.animated=true})};g._onEnterView=function(){this.animations.forEach(function(l){l.inView=true
})};g._onExitView=function(){this.animations.forEach(function(l){l.inView=false;
if(l.repeat||!l.initialized){l._initialize()}})};g.destroy=function(){this.ee.stop(this.trackedEl);
this.trackedEl.off()};g.updateAnimationOnBreakpoint=function(m){this.currentViewport=this.viewportMap[m];
var l=this;this.animations.forEach(function(n){l._configAnimations(n);if(!n.animated){l._initialize()
}})};c.exports=a},{"./sharedElementEngagement":801,"ac-dom-styles/setStyle":366,"ac-dom-traversal/querySelectorAll":382,"ac-eclipse":"ac-eclipse","ac-viewport":791}],801:[function(b,d,a){var c=b("ac-element-engagement").ElementEngagement;
d.exports=(function(){var g;function f(){var h=new c();return h}return{getInstance:function(){if(!g){g=f()
}return g}}})()},{"ac-element-engagement":406}],802:[function(g,b,s){var d=g("ac-dom-traversal/querySelector");
var r=g("ac-dom-traversal/querySelectorAll");var j=g("ac-dom-nodes/insertFirstChild");
var q=g("ac-dom-nodes/insertAfter");var n=g("../model/EnabledFeatures");var p=g("ac-classlist");
var l=g("@marcom/ac-gallery").SlideGallery;var h=g("@marcom/ac-gallery").AutoGallery;
var t=g("ac-swipe").Swipe;var o=g("./galleryHelper").getSlideEl;var c=g("@marcom/ac-gallery").Item;
var a=g("ac-eclipse").Clip;var m=c.extend({show:function(){if(this._clip){this._clip.destroy();
this._clip=null}this._clip=new a(this._el,0.2,{opacity:1,},{delay:0.2}).play();
c.prototype.show.call(this)},hide:function(){if(this._clip){this._clip.destroy();
this._clip=null}this._clip=new a(this._el,0.2,{opacity:0,}).play();c.prototype.hide.call(this)
}});function f(v,u){this.galleryWrapper=v;this.options=u||{};this.options.keyboard=(typeof this.options.keyboard==="boolean")?this.options.keyboard:false;
this.galleryType=(p.contains(this.galleryWrapper,"ac-gallery-fade"))?"fade":"slide";
this.galleryId=this.galleryWrapper.id;this.viewfinder=document.getElementById(this.galleryId);
this.galleryContentElements=r(".ac-gallery-content",this.element);this.triggerClass=this.galleryId+"-trigger";
this.dotnav=d(".dotnav",this.element);this.dotnavExpected=p.contains(this.galleryWrapper,"ac-gallery-has-dotnav");
this.paddlenav=d(".paddlenav",this.element);this.paddlenavExpected=p.contains(this.galleryWrapper,"ac-gallery-has-paddlenav");
this.togglenav=d(".togglenav",this.element);this.togglenavExpected=p.contains(this.galleryWrapper,"ac-gallery-has-togglenav");
this._boundFunctions={_onUpdate:this._onUpdate.bind(this)};if(!this.dotnav&&this.dotnavExpected){this._setupDotnav()
}if(!this.paddlenav&&this.paddlenavExpected){this._setupPaddlenav()}if(!this.togglenav&&this.togglenavExpected){this._setupTogglenav()
}this._createGallery();if(n.IS_HANDHELD){this.swipeEl=new t(this.galleryWrapper);
this.swipeEl.on(t.SWIPE_LEFT,function(){this.gallery.showNext()}.bind(this),false);
this.swipeEl.on(t.SWIPE_RIGHT,function(){this.gallery.showPrevious()}.bind(this),false)
}}var k=f.prototype;k._setupDotnav=function(){var w=document.createElement("nav"),v=document.createElement("ul");
var u=this;this.galleryContentElements.forEach(function(y,x){v.innerHTML+='<li><a href="#'+u.galleryId+'" class="dotnav-item '+u.triggerClass+'" data-ac-gallery-trigger="'+y.id+'">Item '+(x+1)+"</a></li>"
});w.className="dotnav";j(v,w);q(w,this.galleryWrapper)};k._setupPaddlenav=function(){var u=document.createElement("nav");
u.innerHTML+='<a class="paddlenav-arrow paddlenav-arrow-left '+this.triggerClass+'" href="#'+this.galleryId+'/previous" data-ac-gallery-previous-trigger="'+this.galleryId+'"></a>';
u.innerHTML+='<a class="paddlenav-arrow paddlenav-arrow-right '+this.triggerClass+'" href="#'+this.galleryId+'/next" data-ac-gallery-next-trigger="'+this.galleryId+'"></a>';
u.className="paddlenav";q(u,this.galleryWrapper)};k._setupTogglenav=function(){var w=document.createElement("nav"),v=document.createElement("ul");
var u=this;this.galleryContentElements.forEach(function(y,x){var z=y.getAttribute("data-slide-title");
v.innerHTML+='<li><a href="#'+u.galleryId+'" class="togglenav-button '+u.triggerClass+'" data-ac-gallery-trigger="'+y.id+'">'+z+"</a></li>"
});w.className="togglenav";j(v,w);q(w,this.galleryWrapper)};k._onUpdate=function(u){};
k._createGallery=function(){switch(this.galleryType){case"fade":var u=new h(this.viewfinder,{ease:"cubic-bezier(.35,.01,.34,1)",enableArrowKeys:this.options.keyboard,touch:(!n.IS_HANDHELD),resizeContainer:true,itemType:m});
break;default:var u=new l(this.viewfinder,{ease:"cubic-bezier(.35,.01,.34,1)",duration:0,enableArrowKeys:this.options.keyboard,touch:(!n.IS_HANDHELD),desktopSwipe:true,itemType:m});
break}this.gallery=u};k.setupEvents=function(){};k.teardownEvents=function(){this.gallery.off()
};k.destroy=function(){this.gallery.destroy();this.gallery=null};b.exports=f},{"../model/EnabledFeatures":810,"./galleryHelper":804,"@marcom/ac-gallery":245,"ac-classlist":272,"ac-dom-nodes/insertAfter":337,"ac-dom-nodes/insertFirstChild":339,"ac-dom-traversal/querySelector":381,"ac-dom-traversal/querySelectorAll":382,"ac-eclipse":"ac-eclipse","ac-swipe":695}],803:[function(f,c,h){var q=f("../../../../../node_modules/ac-toolkit/src/json/exports.json");
var l=f("../AnalyticsTranslator");var d=f("../model/EnabledFeatures");var b=f("ac-dom-traversal").querySelectorAll;
var j=f("ac-dom-traversal").querySelector;var g=f("ac-vatman");var o=f("ac-event-emitter-micro").EventEmitterMicro;
var n=f("ac-viewport").Viewport;var a=f("ac-video").Player;var p=/object|embed/i;
function k(t,s){o.call(this,null);d.init();this.el=t;this.triggerElement=s;this.isReady=false;
this.isDimensionMeasured=false;this.video=m(t);var r;if(this.video){this.analyticsTranslator=new l(this.video);
this.analyticsTranslator.activate();s.id=r=t.id;s.setAttribute("data-analytics-id",r);
this.analyticsTranslator.addSourceObject(s,r,this.video.getCurrentSrc().cid)}this.container=j("figure",this.el);
this.sectionCopy=j(".section-copy",this.el);this.button=j(".icon-play",this.el);
n.setBreakpoints(q.viewports);this.isReady=false;this.bind()}k.prototype=new o(null);
k.prototype.aspectRatio=1920/1080;k.prototype.ieLimit=3000;k.prototype.videoHeightRatio=0.75;
k.prototype.bind=function(){var r=j("a",this.el);if(!(d.IS_TABLET||d.IS_HANDHELD)){if(d.IS_IE){r.addEventListener("click",function(s){s.preventDefault();
this.onCalloutClicked();this.onclick()}.bind(this))}}this.onViewReady();this.video.on("canplay",this.onCanPlay.bind(this));
this.video.on("acv-no-support",this.onNoSupport.bind(this));this.video.on("play",this.onplay.bind(this));
this.video.on("pause",this.onpause.bind(this));this.video.on("loadedmetadata",this.onmetadata.bind(this));
this.video.on("ended",this.onended.bind(this))};k.prototype.onCanPlay=function(){this.isReady=true
};k.prototype.onViewReady=function(){var t=getComputedStyle(this.container).backgroundImage,s=t.replace("url(","").replace(")",""),r,u;
if(d.IS_HANDHELD||d.IS_TABLET){r=this.container.clientHeight;this.el.classList.add("acv-view-ready");
this.video.getMediaElement().id="video-"+this.el.id}if(d.IS_ANDROID){this.el.classList.add("acv-android")
}if(d.IS_HANDHELD||d.IS_TABLET){this.el.classList.add("acv-native");this.video.setPoster(s)
}if(d.IS_TABLET){this.el.classList.add("acv-inline-playback")}this.triggerElement.removeAttribute("style");
this.itemHeight=this.el.clientHeight;u=this.onclick.bind(this);this.video.el.removeEventListener("click",u);
this.video.el.addEventListener("click",u)};k.prototype.onclick=function(r){if(this.video.getPaused()){this.play()
}else{this.pause()}};k.prototype.onCalloutClicked=function(){var r=this.onclick.bind(this);
this.isReady=true;this.triggerElement.removeEventListener("click",r);this.triggerElement.addEventListener("click",r)
};k.prototype.onpause=function(){if(d.IS_TABLET&&!this.isReady){return}if(!d.IS_TABLET){this.button.style.display="";
this.el.classList.remove("video-playing");this.el.classList.add("video-paused")
}};k.prototype.onplay=function(){if(!this.isDimensionMeasured){this.onmetadata()
}this.el.classList.add("video-playing");this.el.classList.remove("video-paused")
};k.prototype.unbind=function(){this.el.classList.remove("video-playing");this.el.classList.remove("video-paused");
this.off()};k.prototype.onmetadata=function(){this.aspectRatio=this.video.getMediaWidth()/this.video.getMediaHeight();
this.onDimensionMeasured=true};k.prototype.onended=function(){if(d.IS_HANDHELD&&d.IS_IOS){this.video.mediaController.playableObject.el.webkitExitFullScreen()
}};k.prototype.play=function(){if(this.video){if(this.video.getPreload()==="none"){this.video.setPreload("auto")
}if(this.video.getReadyState()!==4){this.video.on("readystatechange",function(){if(this.video.getReadyState()===4){this.video.play()
}},this);if(d.IS_TABLET){this.video.mediaController.playableObject.el.load()}}else{this.video.play();
if(d.IS_HANDHELD){this.onplay()}}}};k.prototype.pause=function(){if(this.video){if(this.video.getReadyState()!==4){}else{this.video.pause()
}this.onpause()}};k.prototype.onNoSupport=function(){this.el.classList.add("acv-no-support")
};function m(u){var y="target-"+u.id.replace("#","");var s=j(".icon-play",u);var v=j(".ac-video",u);
var A=j("figure",u);var z=getComputedStyle(A).backgroundImage;var C=z.replace("url(","").replace(")","").replace('"',"").replace('"',"");
var B;var r=v.getAttribute("href");s.setAttribute("data-acv-target",y);v.setAttribute("data-acv-controlbar","controlBarDefault");
v.setAttribute("data-acv-poster",C);var w={width:"1920",height:"1080",loop:false};
r=g.vatClient.getSource(r,window.innerWidth);var x={};if(!d.IS_TABLET){x.controls=false
}if(d.IS_IE){r+="?"+new Date().getTime()}var t={autoplay:false,src:r,loop:false};
if(d.IS_IE){t.preload="none"}B=a.create(t,x);B.appendTo(v.parentNode);return B}c.exports=k
},{"../../../../../node_modules/ac-toolkit/src/json/exports.json":697,"../AnalyticsTranslator":793,"../model/EnabledFeatures":810,"ac-dom-traversal":372,"ac-event-emitter-micro":478,"ac-vatman":711,"ac-video":"ac-video","ac-viewport":791}],804:[function(c,d,b){function a(g){var k=[];
var j=0;if(g&&Array.isArray(g)){j=g.length;for(var h=0;h<j;h++){if(typeof g[h].getElement==="function"){k.push(g[h].getElement())
}}}return k.pop()}function f(g){var j="";var k=0;if(g&&Array.isArray(g)){k=g.length;
for(var h=0;h<k;h++){if(typeof g[h].getElementId==="function"){j+=g[h].getElementId()+"-"
}}}return j.slice(0,j.length-1)}d.exports={getSlideId:f,getSlideEl:a}},{}],805:[function(c,b,f){var a=c("./BasicDecorator");
var k=a.prototype;var j=c("ac-viewport").Viewport;var h=c("ac-dom-metrics").getDimensions;
var d=function(n,m,o){var l={};a.call(this,n,m,o,l);this._boundOnTrackingScroll=this._onTrackingScroll.bind(this)
};var g=d.prototype=Object.create(a.prototype);d.prototype.constructor=d;g._initMediaObject=function(){k._initMediaObject.call(this);
this.alreadyPlayed=false;var l=j.clientHeight();var m=h(this.el).height;this.threshold=l/m-0.2;
if(this.threshold>1){this.threshold=1}};g._onTrackingScroll=function(){if(this.trackedElement&&this.trackedElement.percentInView>=this.threshold&&!this.mediaObj.isDestroyed){if(!this.mediaObj.getEnhanced()){return
}this.mediaObj.play();j.off("scroll",this._boundOnTrackingScroll);this.trackedElement=null;
this.alreadyPlayed=true}};g._onEnhanced=function(){k._onEnhanced.call(this);if(this.trackedElement.percentInView>=this.threshold){this.mediaObj.play();
this.alreadyPlayed=true}};g.onMediaObjectEnterView=function(l){if(!this.alreadyPlayed&&!this.mediaObj.isDestroyed){if(!this.mediaObj.getEnhanced()){return
}if(this.trackedElement.percentInView<this.threshold){j.on("scroll",this._boundOnTrackingScroll)
}else{this.mediaObj.play();this.alreadyPlayed=true}}else{if(this.alreadyPlayed&&!this.mediaObj.isDestroyed){if(!this.mediaObj.getEnhanced()){return
}this.mediaObj.play()}}};g.onMediaObjectExitView=function(l){k.onMediaObjectExitView.call(this);
if(!this.mediaObj.isDestroyed&&this.alreadyPlayed){this.mediaObj.reset()}};b.exports=d
},{"./BasicDecorator":806,"ac-dom-metrics":323,"ac-viewport":791}],806:[function(f,b,h){var p=f("ac-dom-events");
var n=f("ac-viewport").Viewport;var k=f("ac-media-object");var m=f("ac-cname").cname;
var c=f("../../model/EnabledFeatures");var j=f("ac-dom-traversal").querySelector;
var g=f("ac-dom-events").addEventListener;var d="/105/media/";var o="/iphone-6s/2015/dhs3b549_75f9_422a_9470_4a09e709b350/";
var a=function(s,r,t,q){c.init();this.retina="";if(c.IS_RETINA){this.retina="_2x"
}this.el=s;this.trackedElement=r;this.data=t;this.isLoaded=false;this.shouldEnhance=true;
this.options=q||{frameRate:30};this.currentViewport=this.currentViewport||n.getBreakpoint().name;
if(this.currentViewport==="xlarge"){this.currentViewport="large"}this._boundOnLoad=this._onLoad.bind(this);
this._boundOnEnhanced=this._onEnhanced.bind(this);this._boundOnShouldEnhance=this._onShouldEnhanced.bind(this);
this.boundOnMediaObjectEnterView=this.onMediaObjectEnterView.bind(this);this.boundOnMediaObjectExitView=this.onMediaObjectExitView.bind(this);
this._initMediaObject();this.addEvents()};var l=a.prototype;l._initMediaObject=function(){this.mediaSrc=this._createMediaSrc(this.data.name,this.data.locale,this.data.type);
this.mediaObj=this._createMediaObject();if(!this.mediaObj.isDestroyed){this.mediaObj.on("loaded",this._boundOnLoad);
this.mediaObj.on("enhanced",this._boundOnEnhanced);this.mediaObj.on("shouldenhance",this._boundOnShouldEnhance);
this.mediaObj.load()}this._setupMobileTrigger()};l._setupMobileTrigger=function(){if(c.TOUCH){this.playTrigger=j(".mediaObject-play",this.el);
g(this.playTrigger,"click",this._playOnMobile.bind(this))}};l._onLoad=function(){this.isLoaded=true;
if(this.shouldEnhance){this.mediaObj.enhance()}};l._onShouldEnhanced=function(){this.shouldEnhance=true;
if(this.isLoaded){this.mediaObj.enhance()}};l._onEnhanced=function(){};l._createMediaSrc=function(s,q,t){var q=q||"us";
var r=m.addPrefix(d+q+o+s);if(t==="flow"){return{basePath:r+"/"+this.currentViewport+"/"+t}
}else{if(t==="video"){if(c.TOUCH||c.IS_IE){if(c.IS_IOS&&!c.INLINE_VIDEO){return{basePath:r,filename:"small",fileFormat:"mp4"}
}else{return{basePath:r,filename:"android_"+this.currentViewport,fileFormat:"mp4"}
}}else{return{basePath:r+"/split_files/"+this.currentViewport+this.retina,splitFileLoading:true}
}}else{return}}};l._createMediaObject=function(){var q={};if(this.data.type==="flow"){q=k.createFlow(this.el,this.mediaSrc,this.options)
}else{if(this.data.type==="video"||this.data.type==="split_file"){q=k.createVideo(this.el,this.mediaSrc,this.options)
}else{q.isDestroyed=true}}return q};l._playOnMobile=function(q){q.preventDefault();
this.mediaObj.play()};l.addEvents=function(){if(this.trackedElement){this.trackedElement.on("enterview",this.boundOnMediaObjectEnterView);
this.trackedElement.on("exitview",this.boundOnMediaObjectExitView)}};l.onMediaObjectEnterView=function(q){if(this.mediaObj.isDestroyed){return
}};l.onMediaObjectExitView=function(q){if(this.mediaObj.isDestroyed){return}};b.exports=a
},{"../../model/EnabledFeatures":810,"ac-cname":289,"ac-dom-events":299,"ac-dom-traversal":372,"ac-media-object":"ac-media-object","ac-viewport":791}],807:[function(c,d,b){var a=c("ac-viewport").Viewport;
var h=c("./BasicDecorator");var j=h.prototype;var g=function(m,n){var k={};var l=null;
h.call(this,m,l,n,k)};var f=g.prototype=Object.create(h.prototype);g.prototype.constructor=g;
f._initMediaObject=function(){this.mediaSrc=this._createMediaSrc(this.data.name,this.data.locale,this.data.type);
this.mediaObj=this._createMediaObject();this._setupMobileTrigger()};d.exports=g
},{"./BasicDecorator":806,"ac-viewport":791}],808:[function(d,b,g){var h=d("ac-dom-traversal").querySelector;
var f=d("ac-dom-events").addEventListener;var o=d("ac-classlist");var l=d("ac-viewport").Viewport;
var k=d("ac-dom-metrics").getDimensions;var c=d("../../model/EnabledFeatures");
var a=d("./BasicDecorator");var m=a.prototype;var n=function(r,q,s){var p={};a.call(this,r,q,s,p);
this._boundOnTrackingScroll=this._onTrackingScroll.bind(this)};var j=n.prototype=Object.create(a.prototype);
n.prototype.constructor=n;j._initMediaObject=function(){m._initMediaObject.call(this);
this.alreadyPlayed=false;var p=l.clientHeight();var q=k(this.el).height;this.threshold=p/q-0.2;
if(this.threshold>1){this.threshold=1}this.replayTrigger=h(".mediaObject-replay",this.el.parentNode);
this.endframe=h(".mediaObject-endframe",this.el);if(this.replayTrigger&&!this.mediaObj.isDestroyed&&!c.TOUCH){f(this.replayTrigger,"click",this._onClicked.bind(this));
f(this.endframe,"transitionend",this._playMediaObject.bind(this));this.mediaObj.on("ended",this._onEnded.bind(this))
}};j._onTrackingScroll=function(){if(this.trackedElement&&this.trackedElement.percentInView>=this.threshold&&!this.mediaObj.isDestroyed){if(!this.mediaObj.getEnhanced()){return
}this.mediaObj.play();l.off("scroll",this._boundOnTrackingScroll);this.trackedElement=null;
this.alreadyPlayed=true}};j._onClicked=function(p){this.triggerClicked=true;if(!this.mediaObj.isDestroyed){o.remove(this.el,"mediaObject-ended");
this.mediaObj.reset();p.preventDefault()}};j._playMediaObject=function(p){if(this.triggerClicked){this.mediaObj.play()
}this.triggerClicked=false};j._onEnded=function(p){o.add(this.replayTrigger,"active")
};j._onEnhanced=function(){m._onEnhanced.call(this);if(this.trackedElement.percentInView>=this.threshold){this.mediaObj.play();
this.alreadyPlayed=true}};j.onMediaObjectEnterView=function(p){if(!this.alreadyPlayed&&!this.mediaObj.isDestroyed){if(!this.mediaObj.getEnhanced()){return
}if(this.trackedElement.percentInView<this.threshold){l.on("scroll",this._boundOnTrackingScroll)
}else{this.mediaObj.play();this.alreadyPlayed=true}}};j.onMediaObjectExitView=function(p){m.onMediaObjectExitView.call(this);
if(!this.mediaObj.isDestroyed&&this.alreadyPlayed){this.mediaObj.goToPercent(1)
}};b.exports=n},{"../../model/EnabledFeatures":810,"./BasicDecorator":806,"ac-classlist":272,"ac-dom-events":299,"ac-dom-metrics":323,"ac-dom-traversal":372,"ac-viewport":791}],809:[function(b,c,a){c.exports={PAGE_TYPE:"data-page-type",SECTION_TYPE:"data-section-type",JUMP_SECTION_NAME:"data-page-jump-name"}
},{}],810:[function(c,d,b){var a=c("ac-feature");var f=c("ac-browser");d.exports={TOUCH:undefined,CSS_FILTER:undefined,CSS_ANIMATION:undefined,SVG:undefined,VIDEO:undefined,CSS_OBJECT_FIT:undefined,POSITION_FIXED:undefined,PAGE_JUMP:undefined,IS_IOS7:undefined,WEB_GL:undefined,IS_DESKTOP:undefined,IS_HANDHELD:undefined,IS_RETINA:undefined,IS_TABLET:undefined,IS_IE:undefined,IS_FIREFOX:undefined,IS_IOS:undefined,IS_CHROME:undefined,IS_ANDROID:undefined,init:function(){var g=document.getElementsByTagName("html")[0];
this.TOUCH=g.classList.contains("touch");this.CSS_FILTER=g.classList.contains("cssFilter");
this.CSS_ANIMATION=g.classList.contains("cssAnimation");this.SVG=g.classList.contains("svg");
this.VIDEO=g.classList.contains("video");this.CSS_OBJECT_FIT=g.classList.contains("cssObjectFit");
this.POSITION_FIXED=g.classList.contains("positionFixed");this.PAGE_JUMP=g.classList.contains("pageJump");
this.IS_IOS7=g.classList.contains("ios7");this.IS_IOS=g.classList.contains("ios");
this.INLINE_VIDEO=g.classList.contains("inline-video");this.WEB_GL=this.webGLAvailable();
this.IS_DESKTOP=a.isDesktop();this.IS_HANDHELD=a.isHandheld();this.IS_RETINA=a.isRetina();
this.IS_TABLET=a.isTablet();this.IS_IE=f.name.toLowerCase()==="ie";this.IS_FIREFOX=f.name.toLowerCase()==="firefox";
this.IS_CHROME=f.name.toLowerCase()==="chrome";this.IS_ANDROID=f.os.toLowerCase()==="android"
},webGLAvailable:function(){var g=f.lowerCaseUserAgent,k=f.os.toLowerCase(),m="8f191",l="9b176",j=g.match(m),h=g.match(l);
if(k==="ios"&&(j&&j.length>-1)||(h&&h.length>-1)){return false}return a.webGLAvailable()
}}},{"ac-browser":261,"ac-feature":491}],811:[function(b,c,a){c.exports={overview:b("../pages/overview/OverviewPage"),threedtouch:b("../BasePage"),design:b("../BasePage"),cameras:b("../BasePage"),photos:b("../BasePage"),technology:b("../BasePage"),ios:b("../BasePage"),specs:b("../BasePage"),accessories:b("../BasePage"),films:b("../BasePage")}
},{"../BasePage":794,"../pages/overview/OverviewPage":826}],812:[function(b,c,a){c.exports={BaseSection:b("../sharedsections/BaseSection"),ScrollAnimationSection:b("../sharedsections/ScrollAnimationSection"),VideoGallerySection:b("../sharedsections/VideoGallerySection"),BasicGallerySection:b("../sharedsections/BasicGallerySection"),AnimatedGallerySection:b("../sharedsections/AnimatedGallerySection"),MediaObjectSection:b("../sharedsections/MediaObjectSection"),ColorPickerGallerySection:b("../sharedsections/ColorPickerGallerySection"),EngagementAnimationSection:b("../sharedsections/EngagementAnimationSection"),PanoramaSection:b("../sharedsections/PanoramaSection"),FadeInHeroSection:b("../sharedsections/FadeInHeroSection"),OverviewHeroSection:b("../pages/overview/OverviewHeroSection"),GalleryOnSmallSection:b("../pages/3dTouch/GalleryOnSmallSection"),DesignSeamlessSection:b("../pages/design/DesignSeamlessSection"),PinAndScaleSection:b("../pages/technology/PinAndScaleSection"),ThreeDTouchSection:b("../pages/technology/ThreeDTouchSection")}
},{"../pages/3dTouch/GalleryOnSmallSection":813,"../pages/design/DesignSeamlessSection":814,"../pages/overview/OverviewHeroSection":824,"../pages/technology/PinAndScaleSection":844,"../pages/technology/ThreeDTouchSection":845,"../sharedsections/AnimatedGallerySection":851,"../sharedsections/BaseSection":852,"../sharedsections/BasicGallerySection":853,"../sharedsections/ColorPickerGallerySection":854,"../sharedsections/EngagementAnimationSection":855,"../sharedsections/FadeInHeroSection":856,"../sharedsections/MediaObjectSection":857,"../sharedsections/PanoramaSection":858,"../sharedsections/ScrollAnimationSection":860,"../sharedsections/VideoGallerySection":861}],813:[function(f,a,w){f("ac-polyfills/Object/create");
var q=f("../../model/EnabledFeatures");var c=f("ac-dom-traversal/querySelector");
var v=f("ac-dom-traversal/querySelectorAll");var x=f("ac-swipe").Swipe;var m=f("../../sharedsections/BasicGallerySection");
var t=f("ac-dom-metrics");var g=f("ac-dom-nodes");var n=f("ac-dom-traversal").querySelectorAll;
var b=f("ac-dom-traversal").querySelector;var k=f("ac-dom-traversal").nextSibling;
var j=f("../../utils/BrowserPrefixed");var s=f("ac-classlist");var r=f("ac-viewport").Viewport;
var o=f("@marcom/ac-gallery").SlideGallery;var u=f("../../sharedsections/BaseSection");
var p=u.prototype;var d=f("../../gallery/galleryHelper").getSlideId;function h(A,z,y){u.call(this,A,z,y);
this.currentBreakpoint=r.getBreakpoint().name;if(this.currentBreakpoint==="small"){this._initGalleries()
}}var l=h.prototype=Object.create(u.prototype);h.prototype.constructor=h;l._initGalleries=function(){var y=n(".ac-gallery",this.element);
this._galleries=[];y.forEach(function(z,A){this._galleries[A]=this._createGallery(z,A)
}.bind(this));this.setupGalleryEvents()};l._createGallery=function(K,A){var D=K;
var J=K.id;var C=document.getElementById(J);var B=Array.prototype.slice.call(n(".ac-gallery-content",K));
var I=J+"-trigger";var G=n(".dotnav",K);var z=s.contains(K,"ac-gallery-has-dotnav");
var y=n(".paddlenav",K);var E=s.contains(K,"ac-gallery-has-paddlenav");if(!G[0]&&z){this._setupDotnav(K,B,J,I)
}if(!y[0]&&E){this._setupPaddlenav(K,J,I)}B.forEach(function(L,M){if(M===0){s.add(L,"current")
}else{s.remove(L,"current")}});var F=new o(C,{easing:"cubic-bezier(.35,.01,.34,1)",duration:0.6,touch:(!q.IS_HANDHELD),resizeContainer:true});
if(q.IS_HANDHELD){var H=new x(D);H.on(x.SWIPE_LEFT,function(){F.showNext()}.bind(this),false);
H.on(x.SWIPE_RIGHT,function(){F.showPrevious()}.bind(this),false)}return F};l._setupDotnav=function(y,B,A,D){var C=document.createElement("nav"),z=document.createElement("ul");
B.forEach(function(F,E){z.innerHTML+='<li><a href="#'+A+"/show/"+F.id+'" class="dotnav-item '+D+'" data-ac-gallery-trigger="'+F.id+'">Item '+(E+1)+"</a></li>"
});C.className="dotnav";C.setAttribute("aria-hidden",true);g.insertFirstChild(z,C);
g.insertAfter(C,y)};l._setupPaddlenav=function(y,z,B){var A=document.createElement("nav");
A.innerHTML+='<a class="paddlenav-arrow paddlenav-arrow-left '+B+'" href="#'+z+'/previous" data-ac-gallery-previous-trigger="'+z+'"></a>';
A.innerHTML+='<a class="paddlenav-arrow paddlenav-arrow-right '+B+'" href="#'+z+'/next" data-ac-gallery-next-trigger="'+z+'"></a>';
A.className="paddlenav";g.insertLastChild(A,y)};l._destroyGalleries=function(){if(this._galleries){this._galleries.forEach(function(y,z){var B=k(y.getElement(),".dotnav");
var A=Array.prototype.slice.call(n(".ac-gallery-content",y.getElement()));g.remove(B);
A.forEach(function(C,D){s.add(C,"current")});this.teardownGalleryEvents(y);y.destroy()
}.bind(this))}this._galleries=[]};l._onUpdate=function(y){if(y.outgoing){var A=d(y.outgoing),C=b('[data-slide-link="'+A+'"]'),z=d(y.incoming),B=b('[data-slide-link="'+z+'"]');
s.remove(document.getElementById(A),"current");s.add(document.getElementById(z),"current");
if(C&&B){s.remove(C,"current");s.add(b('[data-slide-link="'+z+'"]'),"current")}}};
l._onUpdateComplete=function(y){};l.setupGalleryEvents=function(){this._boundFunctions={_boundRaf:this.onRequestAnimationFrame.bind(this),_onUpdate:this._onUpdate.bind(this),_onUpdateComplete:this._onUpdateComplete.bind(this)};
if(this._galleries){this._galleries.forEach(function(y,z){y.on("update",this._boundFunctions._onUpdate);
y.on("update:complete",this._boundFunctions._onUpdateComplete)}.bind(this))}};l.teardownGalleryEvents=function(y){y.off()
};l.activate=function(){p.activate.call(this)};l.deactivate=function(){p.deactivate.call(this)
};l.onBreakpoint=function(A,B,z,y){this.currentBreakpoint=A.name;if(A.name==="xlarge"||B.name==="xlarge"){return
}if(this.currentBreakpoint==="small"){this._initGalleries()}else{this._destroyGalleries()
}};l.destroy=function(){p.destroy.call(this)};a.exports=h},{"../../gallery/galleryHelper":804,"../../model/EnabledFeatures":810,"../../sharedsections/BaseSection":852,"../../sharedsections/BasicGallerySection":853,"../../utils/BrowserPrefixed":862,"@marcom/ac-gallery":245,"ac-classlist":272,"ac-dom-metrics":323,"ac-dom-nodes":335,"ac-dom-traversal":372,"ac-dom-traversal/querySelector":381,"ac-dom-traversal/querySelectorAll":382,"ac-polyfills/Object/create":569,"ac-swipe":695,"ac-viewport":791}],814:[function(f,c,h){var l=f("../../sharedsections/ParallaxWebGLSection");
var n=l.prototype;var o=f("./DesignWebGLEffects");var j=f("ac-dom-traversal/querySelector");
var g=f("ac-object");var d=f("../../model/EnabledFeatures");var m=f("ac-viewport").Viewport;
var b=f("../../utils/animationCapable");function a(r,q,p){this.name="DesignSeamlessSection - "+(r.querySelector("h1")||r.querySelector("h2")).innerText;
l.call(this,r,q,p);if(!b){return}this._webGLReady=false;this._initializeTargets();
if(d.WEB_GL){this.initializeWebGL()}this.setAnimationKeys();this.on("animation-reinit",this.setAnimationKeys.bind(this))
}var k=a.prototype=g.create(l.prototype);k._initializeTargets=function(){this.animationContainers={silver:j(".medium-show .image-finish-silver .device-container",this.element),spacegray:j(".medium-show .image-finish-spacegray .device-container",this.element),gold:j(".medium-show .image-finish-gold .device-container",this.element),rosegold:j(".medium-show .image-finish-rosegold .device-container",this.element),};
this.animationContainersSmall={silver:j(".small-show .image-finish-silver .device-container",this.element),spacegray:j(".small-show .image-finish-spacegray .device-container",this.element),gold:j(".small-show .image-finish-gold .device-container",this.element),rosegold:j(".small-show .image-finish-rosegold .device-container",this.element)};
this.setAnimationKeys();this.effectsObj=o};k.setAnimationKeys=function(){var p,q=this.scrollAnimations[0];
if(this.scrollAnimations.length>1){p={silver:this.scrollAnimations[1].animations[0],spacegray:this.scrollAnimations[0].animations[1],gold:this.scrollAnimations[1].animations[1],rosegold:this.scrollAnimations[0].animations[0]}
}else{p={silver:this.scrollAnimations[0].animations[0],spacegray:this.scrollAnimations[0].animations[1],gold:this.scrollAnimations[0].animations[2],rosegold:this.scrollAnimations[0].animations[3]}
}this.animationKeys=p};k.initializeWebGL=function(){this.webGLEffects=[];var p=document.querySelector("[data-webgl-location]");
var r=document.createElement("script");r.src=p.getAttribute("data-webgl-location");
document.body.appendChild(r);if(!!window.THREE||!!window.WAGNER){this._onWebGLReady();
return}var q=setInterval(function(){if(!!window.THREE||!!window.WAGNER){clearInterval(q);
this._onWebGLReady()}}.bind(this),200)};k._onWebGLReady=function(){if(this._didCallThreeReady){return
}this._didCallThreeReady=true;this._initializeWebGLForDeviceGroup({small:false});
this._initializeWebGLForDeviceGroup({small:true});this._webGLReady=true};k._initializeWebGLForDeviceGroup=function(t){t=t||{};
var q=this.animationContainers;if(t.small){q=this.animationContainersSmall}var u,r,p,s,v;
for(u in this.effectsObj){if(this.effectsObj.hasOwnProperty(u)){r=this.effectsObj[u];
p=r.length;for(s=0;s<p;s++){if(!this.webGLEffects[u]){this.webGLEffects[u]=[]}v=new r[s](this,{subpath:"design",small:t.small});
v.initialize();q[u].appendChild(v.el);this.webGLEffects[u].push(v);setTimeout(function(w){w.setSize()
}.bind(this,v),0)}}}};k.activate=function(){n.activate.call(this)};k.deactivate=function(){n.deactivate.call(this)
};k.animateIn=function(){n.animateIn.call(this)};k.onRequestAnimationFrame=function(){n.onRequestAnimationFrame.call(this);
if(!b){return}if(this.distanceCalculator){this.distanceCalculator.calculate()}if(this._webGLReady){var r,q,p;
for(r in this.webGLEffects){if(this.webGLEffects.hasOwnProperty(r)){p=this.webGLEffects[r].length;
for(q=0;q<p;q++){this.webGLEffects[r][q].drawScene()}}}}};k.onScroll=function(r,q,p){n.onScroll.call(this,r,q,p)
};k.onResize=function(r,q,p){n.onResize.call(this,r,q,p)};k.onViewWillAppear=function(q,p){n.onViewWillAppear.call(this,q,p)
};k.onViewWillDisappear=function(q,p){n.onViewWillDisappear.call(this,q,p)};k.destroy=function(){n.destroy.call(this)
};c.exports=a},{"../../model/EnabledFeatures":810,"../../sharedsections/ParallaxWebGLSection":859,"../../utils/animationCapable":863,"./DesignWebGLEffects":815,"ac-dom-traversal/querySelector":381,"ac-object":554,"ac-viewport":791}],815:[function(b,c,a){var g=b("./webgl/shadow-passes/RoseGoldShadowPass"),d=b("./webgl/shadow-passes/SilverShadowPass"),h=b("./webgl/shadow-passes/GoldShadowPass"),f=b("./webgl/shadow-passes/SpaceGrayShadowPass");
c.exports={silver:[d],spacegray:[f],gold:[h],rosegold:[g]}},{"./webgl/shadow-passes/GoldShadowPass":816,"./webgl/shadow-passes/RoseGoldShadowPass":817,"./webgl/shadow-passes/SilverShadowPass":818,"./webgl/shadow-passes/SpaceGrayShadowPass":819}],816:[function(c,b,f){var j=c("../../../../webgl/types/ShadowPassPlayer"),m=c("../../../../webgl/shaders/shaders.json"),l=c("ac-viewport").Viewport,d=c("ac-object");
var g;var a={large:{width:271,height:1069},medium:{width:156,height:615},small:{width:357,height:331}};
var k={};var h=function(p,o){this.context=p;this.renderSmall=o.small||false;this.setBreakpointName();
this.setDimensions();j.call(this,p,{width:this.dimensions.width,height:this.dimensions.height,className:"gold-shadow-pass",subpath:o.subpath});
this.settings={scrollStart:0.6,scrollEnd:1,scrollXStart:0.001,scrollYStart:-1.3,dropOffX:0,dropOffY:0,scrollDistanceX:-0.0101,scrollDistanceY:0.7,distanceX:1,distanceY:1,rotate:0,bloom:1,feather:1,distanceBloom:0,distanceFeather:0,invert:false};
this.settings.rotate=this.settings.rotate*Math.PI/180;this.updateSettings();var n=this.getImageTextureUniforms();
n.maskCenter={type:"v3",value:new THREE.Vector3()};n.showPasses={type:"f",value:0};
n.bloom={type:"f",value:this.settings.bloom};n.feather={type:"f",value:this.settings.feather};
n.distanceX={type:"f",value:this.settings.distanceX};n.distanceY={type:"f",value:this.settings.distanceY};
n.dropOffX={type:"f",value:this.settings.dropOffX};n.dropOffY={type:"f",value:this.settings.dropOffY};
n.rotate={type:"f",value:this.settings.rotate};n.shadowMap.value.magFilter=n.shadowMap.value.minFilter=THREE.LinearFilter;
this.meshOptions={width:this.options.width,height:this.options.height,uniforms:n,vertexShader:m.vertex,fragmentShader:m["shadow-pass"]};
l.on("breakpoint",this.onBreakpoint.bind(this))};g=h.prototype=d.create(j.prototype);
g.cameraOptions={nearClip:1,farClip:5000,fov:45};g.getImageTextureUniforms=function(){var n={extension:"jpg"};
return this.getTextureUniforms({shadowMap:this.getAssetURL("hero_gold_s",n)})};
g.setBreakpointName=function(){this.breakpointName=l.getBreakpoint().name;if(this.breakpointName==="xlarge"){this.breakpointName="large"
}};g.setDimensions=function(){var n=this.breakpointName,o=a[n];this.dimensions={width:o.width,height:o.height,left:-o.width/2,top:-o.height/2}
};g.updateSettings=function(){this.setBreakpointName();var n=this.breakpointName;
var o;for(o in k[n]){if(k[n].hasOwnProperty(o)){this.settings[o]=k[n][o]}}};g.render=function(){if(this.breakpointName==="small"){if(this.renderSmall){this._shouldUpdate=true;
this._renderSmall();return}this._shouldUpdate=false;return}this._shouldUpdate=false
};g._renderSmall=function(){var p=this.context.animationKeys.gold.progress;var q=this.settings.scrollStart,o=this.settings.scrollEnd;
if(p<q){p=q}else{if(p>o){p=o}}p=(p-q)/(o-q);if(this.settings.invert){p=1-p}var n=this.settings.scrollXStart+(p*this.settings.scrollDistanceX);
var s=this.settings.scrollYStart+(p*this.settings.scrollDistanceY);var r=this.settings.bloom+(p*this.settings.distanceBloom);
this.setMaskCenter(n,s);this.setBloom(r)};g.onBreakpoint=function(){this.setBreakpointName();
this.updateSettings();this.setDimensions();this.resizeTo(this.dimensions.width,this.dimensions.height)
};g.setMaskCenter=function(n,o){this.material.uniforms.maskCenter.value.x=n;this.material.uniforms.maskCenter.value.y=o
};g.setBloom=function(n){this.material.uniforms.bloom.value=n};g.setFeather=function(n){this.material.uniforms.feather.value=n
};b.exports=h},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/ShadowPassPlayer":871,"ac-object":554,"ac-viewport":791}],817:[function(d,b,g){var j=d("../../../../webgl/types/ShadowPassPlayer"),m=d("../../../../webgl/shaders/shaders.json"),l=d("ac-viewport").Viewport,f=d("ac-object");
var h;var a={large:{width:825,height:741},medium:{width:474,height:425},small:{width:308,height:380}};
var k={};var c=function(p,o){this.context=p;this.renderSmall=o.small||false;this.setBreakpointName();
this.setDimensions();j.call(this,p,{width:this.dimensions.width,height:this.dimensions.height,className:"rosegold-shadow-pass",subpath:o.subpath});
this.settings={scrollStart:0.7,scrollEnd:1,scrollXStart:0.001,scrollYStart:-1.3,dropOffX:0,dropOffY:0,scrollDistanceX:-0.0101,scrollDistanceY:0.7,distanceX:1,distanceY:1,rotate:0,bloom:1,feather:1,distanceBloom:0,distanceFeather:0,invert:false};
this.settings.rotate=this.settings.rotate*Math.PI/180;this.updateSettings();var n=this.getImageTextureUniforms();
n.maskCenter={type:"v3",value:new THREE.Vector3()};n.showPasses={type:"f",value:0};
n.bloom={type:"f",value:this.settings.bloom};n.feather={type:"f",value:this.settings.feather};
n.distanceX={type:"f",value:this.settings.distanceX};n.distanceY={type:"f",value:this.settings.distanceY};
n.dropOffX={type:"f",value:this.settings.dropOffX};n.dropOffY={type:"f",value:this.settings.dropOffY};
n.rotate={type:"f",value:this.settings.rotate};n.shadowMap.value.magFilter=n.shadowMap.value.minFilter=THREE.LinearFilter;
this.meshOptions={width:this.options.width,height:this.options.height,uniforms:n,vertexShader:m.vertex,fragmentShader:m["shadow-pass"]};
l.on("breakpoint",this.onBreakpoint.bind(this))};h=c.prototype=f.create(j.prototype);
h.cameraOptions={nearClip:1,farClip:5000,fov:45};h.getImageTextureUniforms=function(){var n={extension:"jpg"};
return this.getTextureUniforms({shadowMap:this.getAssetURL("hero_rosegold_s",n)})
};h.setBreakpointName=function(){this.breakpointName=l.getBreakpoint().name;if(this.breakpointName==="xlarge"){this.breakpointName="large"
}};h.setDimensions=function(){var n=this.breakpointName,o=a[n];this.dimensions={width:o.width,height:o.height,left:-o.width/2,top:-o.height/2}
};h.updateSettings=function(){this.setBreakpointName();var n=this.breakpointName;
var o;for(o in k[n]){if(k[n].hasOwnProperty(o)){this.settings[o]=k[n][o]}}};h.render=function(){if(this.breakpointName==="small"){if(this.renderSmall){this._shouldUpdate=true;
this._renderSmall();return}this._shouldUpdate=false;return}if(this.renderSmall||typeof this.context.animationKeys.rosegold!=="object"){this._shouldUpdate=false;
return}this._shouldUpdate=true;var p=this.context.animationKeys.rosegold.progress;
var q=this.settings.scrollStart,o=this.settings.scrollEnd;if(p<q){p=q}else{if(p>o){p=o
}}p=(p-q)/(o-q);if(this.settings.invert){p=1-p}var n=this.settings.scrollXStart+(p*this.settings.scrollDistanceX);
var s=this.settings.scrollYStart+(p*this.settings.scrollDistanceY);var r=this.settings.bloom+(p*this.settings.distanceBloom);
this.setMaskCenter(n,s);this.setBloom(r)};h._renderSmall=function(){var p=this.context.animationKeys.rosegold.progress;
var q=this.settings.scrollStart,o=this.settings.scrollEnd;if(p<q){p=q}else{if(p>o){p=o
}}p=(p-q)/(o-q);if(this.settings.invert){p=1-p}var n=this.settings.scrollXStart+(p*this.settings.scrollDistanceX);
var s=this.settings.scrollYStart+(p*this.settings.scrollDistanceY);var r=this.settings.bloom+(p*this.settings.distanceBloom);
this.setMaskCenter(n,s);this.setBloom(r)};h.onBreakpoint=function(){this.setBreakpointName();
this.updateSettings();this.setDimensions();this.resizeTo(this.dimensions.width,this.dimensions.height)
};h.setMaskCenter=function(n,o){this.material.uniforms.maskCenter.value.x=n;this.material.uniforms.maskCenter.value.y=o
};h.setBloom=function(n){this.material.uniforms.bloom.value=n};h.setFeather=function(n){this.material.uniforms.feather.value=n
};b.exports=c},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/ShadowPassPlayer":871,"ac-object":554,"ac-viewport":791}],818:[function(c,b,f){var h=c("../../../../webgl/types/ShadowPassPlayer"),m=c("../../../../webgl/shaders/shaders.json"),l=c("ac-viewport").Viewport,d=c("ac-object");
var g;var a={large:{width:933,height:554},medium:{width:536,height:319},small:{width:308,height:371}};
var k={large:{scrollStart:0,scrollEnd:0.33,scrollMin:-17,scrollMax:53,scrollXStart:0.9,scrollYStart:0.1,scrollDistanceX:-0.47,scrollDistanceY:0,rotate:5.7246799465414,invert:false},medium:{scrollStart:0,scrollEnd:0.33,scrollMin:-3,scrollMax:3,invert:false,scrollXStart:0.98,scrollYStart:0,scrollDistanceX:-0.62,scrollDistanceY:0,rotate:5.7246799465414},small:{scrollStart:0,scrollEnd:1,scrollMin:0,scrollMax:1,scrollXStart:0.67,scrollYStart:0.3,scrollDistanceX:-0.47,scrollDistanceY:-0.2,rotate:5.2743849995268635,invert:true}};
var j=function(p,o){this.context=p;this.renderSmall=o.small||false;this.setBreakpointName();
this.setDimensions();h.call(this,p,{width:this.dimensions.width,height:this.dimensions.height,className:"silver-shadow-pass",subpath:o.subpath});
this.settings={scrollStart:0,scrollEnd:0.33,scrollXStart:0.9,scrollYStart:0,dropOffX:0,dropOffY:0,scrollDistanceX:-0.47,scrollDistanceY:0,distanceX:3.7,distanceY:0,rotate:328,bloom:1,feather:1,distanceBloom:0,distanceFeather:0,invert:false};
this.settings.rotate=this.settings.rotate*Math.PI/180;this.updateSettings();var n=this.getImageTextureUniforms();
n.maskCenter={type:"v3",value:new THREE.Vector3()};n.showPasses={type:"f",value:0};
n.bloom={type:"f",value:this.settings.bloom};n.feather={type:"f",value:this.settings.feather};
n.distanceX={type:"f",value:this.settings.distanceX};n.distanceY={type:"f",value:this.settings.distanceY};
n.dropOffX={type:"f",value:this.settings.dropOffX};n.dropOffY={type:"f",value:this.settings.dropOffY};
n.rotate={type:"f",value:this.settings.rotate};n.shadowMap.value.magFilter=n.shadowMap.value.minFilter=THREE.LinearFilter;
this.meshOptions={width:this.options.width,height:this.options.height,uniforms:n,vertexShader:m.vertex,fragmentShader:m["shadow-pass"]};
l.on("breakpoint",this.onBreakpoint.bind(this))};g=j.prototype=d.create(h.prototype);
g.cameraOptions={nearClip:1,farClip:5000,fov:45};g.getImageTextureUniforms=function(){var n={extension:"jpg"};
return this.getTextureUniforms({shadowMap:this.getAssetURL("hero_silver_s",n)})
};g.setBreakpointName=function(){this.breakpointName=l.getBreakpoint().name;if(this.breakpointName==="xlarge"){this.breakpointName="large"
}};g.setDimensions=function(){var n=this.breakpointName,o=a[n];this.dimensions={width:o.width,height:o.height,left:-o.width/2,top:-o.height/2}
};g.updateSettings=function(){this.setBreakpointName();var n=this.breakpointName;
var o;for(o in k[n]){if(k[n].hasOwnProperty(o)){this.settings[o]=k[n][o]}}};g.render=function(q){if(this.breakpointName==="small"){if(this.renderSmall){this._shouldUpdate=true;
this._renderSmall();return}this._shouldUpdate=false;return}if(this.renderSmall||typeof this.context.animationKeys.silver!=="object"||typeof this.context.animationKeys.gold!=="object"){this._shouldUpdate=false;
return}this._shouldUpdate=true;var r=this.settings;var z=this.context.animationKeys.gold.transY,u=this.context.animationKeys.silver.transY;
var p=z-u;var s=r.scrollMin;var v=r.scrollMax;var n=(v-p)/(v-s);if(n<0){n=0}else{if(n>1){n=1
}}if(r.invert){n=1-n}var w=r.scrollXStart+(n*r.scrollDistanceX);var t=r.scrollYStart+(n*r.scrollDistanceY);
var o=r.bloom+(n*r.distanceBloom);this.setMaskCenter(w,t);this.setRotate(this.settings.rotate);
this.setBloom(o)};g._renderSmall=function(){var r=this.settings;if(typeof this.context.animationKeys.silver!=="object"){return
}var u=this.context.animationKeys.silver.progress;var q=r.scrollMin;var o=r.scrollMax;
var p=(o-u)/(o-q);if(p<0){p=0}else{if(p>1){p=1}}if(r.invert){p=1-p}var n=r.scrollXStart+(p*r.scrollDistanceX);
var t=r.scrollYStart+(p*r.scrollDistanceY);var s=r.bloom+(p*r.distanceBloom);this.setMaskCenter(n,t);
this.setRotate(this.settings.rotate);this.setBloom(s)};g.onBreakpoint=function(){this.setBreakpointName();
this.updateSettings();this.setDimensions();this.resizeTo(this.dimensions.width,this.dimensions.height)
};g.setMaskCenter=function(n,o){this.material.uniforms.maskCenter.value.x=n;this.material.uniforms.maskCenter.value.y=o
};g.setRotate=function(n){this.material.uniforms.rotate.value=n};g.setBloom=function(n){this.material.uniforms.bloom.value=n
};g.setFeather=function(n){this.material.uniforms.feather.value=n};b.exports=j},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/ShadowPassPlayer":871,"ac-object":554,"ac-viewport":791}],819:[function(c,b,f){var h=c("../../../../webgl/types/ShadowPassPlayer"),m=c("../../../../webgl/shaders/shaders.json"),k=c("ac-viewport").Viewport,d=c("ac-object");
var g;var a={large:{width:572,height:1081},medium:{width:329,height:621},small:{width:356,height:403}};
var j={large:{scrollMin:-20,scrollMax:42,scrollXStart:1.4,scrollYStart:-1.7,scrollDistanceX:-0.57,scrollDistanceY:1,distanceX:3.3},medium:{scrollMin:-25,scrollMax:50,scrollXStart:1.4,scrollYStart:-1.7,scrollDistanceX:-0.83,scrollDistanceY:1.3,distanceX:3.3},small:{scrollMin:0,scrollMax:10,scrollXStart:0,scrollYStart:1.2,scrollDistanceX:0.29,scrollDistanceY:-1.1}};
var l=function(p,o){this.context=p;this.renderSmall=o.small||false;this.setBreakpointName();
this.setDimensions();h.call(this,p,{width:this.dimensions.width,height:this.dimensions.height,className:"spacegray-shadow-pass",subpath:o.subpath});
this.settings={scrollStart:0,scrollEnd:0.2,scrollXStart:1.2,scrollYStart:0.5,dropOffX:0,dropOffY:0,scrollDistanceX:-1,scrollDistanceY:-1.2,distanceX:3.3,distanceY:1,rotate:312.1,bloom:1.1,feather:1,distanceBloom:0,distanceFeather:0,invert:false};
this.settings.rotate=this.settings.rotate*Math.PI/180;this.updateSettings();var n=this.getImageTextureUniforms();
n.maskCenter={type:"v3",value:new THREE.Vector3()};n.showPasses={type:"f",value:0};
n.bloom={type:"f",value:this.settings.bloom};n.feather={type:"f",value:this.settings.feather};
n.distanceX={type:"f",value:this.settings.distanceX};n.distanceY={type:"f",value:this.settings.distanceY};
n.dropOffX={type:"f",value:this.settings.dropOffX};n.dropOffY={type:"f",value:this.settings.dropOffY};
n.rotate={type:"f",value:this.settings.rotate};n.shadowMap.value.magFilter=n.shadowMap.value.minFilter=THREE.LinearFilter;
this.meshOptions={width:this.options.width,height:this.options.height,uniforms:n,vertexShader:m.vertex,fragmentShader:m["shadow-pass"]};
k.on("breakpoint",this.onBreakpoint.bind(this))};g=l.prototype=d.create(h.prototype);
g.cameraOptions={nearClip:1,farClip:5000,fov:45};g.getImageTextureUniforms=function(){var n={extension:"jpg"};
return this.getTextureUniforms({shadowMap:this.getAssetURL("hero_spacegray_s",n)})
};g.setBreakpointName=function(){this.breakpointName=k.getBreakpoint().name;if(this.breakpointName==="xlarge"){this.breakpointName="large"
}};g.setDimensions=function(){var n=this.breakpointName,o=a[n];this.dimensions={width:o.width,height:o.height,left:-o.width/2,top:-o.height/2}
};g.updateSettings=function(){this.setBreakpointName();var n=this.breakpointName;
var o;for(o in j[n]){if(j[n].hasOwnProperty(o)){this.settings[o]=j[n][o]}}};g.render=function(){if(this.breakpointName==="small"){if(this.renderSmall){this._shouldUpdate=true;
this._renderSmall();return}this._shouldUpdate=false;return}if(this.renderSmall||typeof this.context.animationKeys.gold!=="object"||typeof this.context.animationKeys.spacegray!=="object"){this._shouldUpdate=false;
return}this._shouldUpdate=true;var r=this.settings;var w=this.context.animationKeys.gold.transY,q=this.context.animationKeys.spacegray.transY;
var p=w-q;var s=r.scrollMin;var u=r.scrollMax;var n=(u-p)/(u-s);if(n<0){n=0}else{if(n>1){n=1
}}n=1-n;if(r.invert){n=1-n}var v=r.scrollXStart+(n*r.scrollDistanceX);var t=r.scrollYStart+(n*r.scrollDistanceY);
var o=r.bloom+(n*r.distanceBloom);this.setMaskCenter(v,t);this.setBloom(o)};g._renderSmall=function(){var r=this.settings;
var v=this.context.animationKeys.rosegold.transY,q=this.context.animationKeys.spacegray.transY;
var p=v-q;var s=r.scrollMin;var u=r.scrollMax;var n=(u-p)/(u-s);if(n<0){n=0}else{if(n>1){n=1
}}n=1-n;if(r.invert){n=1-n}var w=r.scrollXStart+(n*r.scrollDistanceX);var t=r.scrollYStart+(n*r.scrollDistanceY);
var o=r.bloom+(n*r.distanceBloom);this.setMaskCenter(w,t);this.setBloom(o)};g.onBreakpoint=function(){this.setBreakpointName();
this.updateSettings();this.setDimensions();this.resizeTo(this.dimensions.width,this.dimensions.height)
};g.setMaskCenter=function(n,o){this.material.uniforms.maskCenter.value.x=n;this.material.uniforms.maskCenter.value.y=o
};g.setBloom=function(n){this.material.uniforms.bloom.value=n};g.setFeather=function(n){this.material.uniforms.feather.value=n
};b.exports=l},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/ShadowPassPlayer":871,"ac-object":554,"ac-viewport":791}],820:[function(d,f,c){var j=d("ac-event-emitter-micro").EventEmitterMicro;
var b=d("../../ElementDistanceCalculator");var a=d("ac-object");var h;var g=function(l){b.call(this,{els:l.distanceElements});
this.context=l;this.parallaxOffsets={};var k;for(k in this.els){if(this.els.hasOwnProperty(k)){this.parallaxOffsets[k]={x:0,y:0,r:0}
}}};h=g.prototype=a.create(b.prototype);h.calculate=function(){this.calculateAdditionalOffsets();
b.prototype.calculate.call(this)};h.calculateAdditionalOffsets=function(){var n=this.els,k=this.context.parallaxHandler,p=this.context.introPlayer,l,o;
var m;for(m in n){if(n.hasOwnProperty(m)){if(k&&k.positions[m]){l=k.positions[m].transY||0
}else{l=0}if(p&&p.positions[m]){o=p.positions[m].transY||0}else{o=0}this.parallaxOffsets[m].y=(l+o)||0
}}};f.exports=g},{"../../ElementDistanceCalculator":796,"ac-event-emitter-micro":478,"ac-object":554}],821:[function(f,c,j){var k,p=f("ac-event-emitter-micro").EventEmitterMicro,h=f("ac-object"),o=f("./webgl/shadow-passes/SpaceGrayShadowPass"),d=f("./webgl/shadow-passes/RoseGoldShadowPass"),n=f("./webgl/shadow-passes/SilverShadowPass"),q=f("./webgl/gradient-pass/RoseGoldLogoPass"),m=f("./webgl/matcap/RoseGoldButtons"),g=f("./webgl/gradient-pass/SpaceGrayLogoPass"),a=f("./webgl/matcap/SpaceGrayCamera"),l=f("ac-browser");
var b=function(s,r){p.call(this);this.context=s;this.effects=r.effects;this._boundStart=this._start.bind(this);
if(l.name.toLowerCase()==="safari"){this.poolSize=Infinity}};k=b.prototype=h.create(p.prototype);
k.poolSize=16;k.timeoutDuration=500;k.delay=0;k._priority=[d,o,n,m,q,g];k._order=["spacegray","gold","rosegold","silver"];
k.start=function(){this._active=0;this._loaded=0;this._priorityLoaded=0;this._lastItem=0;
this._total=0;this._items=[];this._allowReady=false;this._didTimeout=false;this._didTriggerPriorityLoaded=false;
this._timeout=setTimeout(this._onTimeout.bind(this),this.timeoutDuration);if(!this.context.webGLEffects){this.context.webGLEffects={}
}var s=this.effects,v,u,z,A,x=this._order.length,w;for(v=0;v<x;v++){z=this._order[v];
if(!this.context.webGLEffects[z]){this.context.webGLEffects[z]=[]}w=s[z].length;
for(u=0;u<w;u++){this._total++;A=new s[z][u](this.context,{subpath:"overview"});
A.once("textures-loaded",this._handleTexturesLoaded.bind(this,s[z][u],z));A.createScene();
this.context.animationContainers[z].appendChild(A.el);this.context.webGLEffects[z].push(A);
this._items.push({type:z,effect:A})}}var r=this._priority.length,t=this._items.length,y=-1;
for(v=0;v<r;v++){for(u=0;u<t;u++){if(this._items[u].effect instanceof this._priority[v]){y=u;
break}}if(y>-1){this._items=this._moveArrayIdx(this._items,y,0)}y=-1}this._start();
this.context._webGLReady=true};k._moveArrayIdx=function(r,t,u){if(u>=r.length){var s=u-r.length;
while((s--)+1){r.push(undefined)}}r.splice(u,0,r.splice(t,1)[0]);return r};k._start=function(){var r=this.getNextEffect();
if(!r){return}r=r.effect;r.createMesh();r.scene.add(r.mesh);setTimeout(function(s){s.setSize();
this._start()}.bind(this,r),0)};k.getNextEffect=function(){if(this._active>=this.poolSize){return null
}this._active++;var r=this._lastItem;this._lastItem++;return this._items[r]};k._handleTexturesLoaded=function(s,r){this._loaded++;
this._active--;if(this._priority.indexOf(s)>-1){this._priorityLoaded++;if(this._priorityLoaded>=this._priority.length){this._allowReady=true;
if(this._didTimeout&&!this._didTriggerPriorityLoaded){this._didTriggerPriorityLoaded=true;
setTimeout(function(){this.trigger("ready")}.bind(this),0);return}}}if(this._loaded>=this._total){if(this._didTimeout||this._didTriggerPriorityLoaded){return
}if(this._timeout){clearTimeout(this._timeout);this._timeout=null}this.trigger("ready");
return}setTimeout(this._boundStart,this.delay)};k._onTimeout=function(){if(this._didTimeout){return
}this._didTimeout=true;if(this._allowReady){this.trigger("ready")}};c.exports=b
},{"./webgl/gradient-pass/RoseGoldLogoPass":833,"./webgl/gradient-pass/SpaceGrayLogoPass":834,"./webgl/matcap/RoseGoldButtons":836,"./webgl/matcap/SpaceGrayCamera":840,"./webgl/shadow-passes/RoseGoldShadowPass":841,"./webgl/shadow-passes/SilverShadowPass":842,"./webgl/shadow-passes/SpaceGrayShadowPass":843,"ac-browser":261,"ac-event-emitter-micro":478,"ac-object":554}],822:[function(d,c,h){var n=d("ac-event-emitter-micro").EventEmitterMicro,m=d("ac-dom-emitter").DOMEmitter,g=d("ac-object"),a=d("./OverviewEffectsQueue"),b=d("ac-dom-traversal/querySelectorAll"),l=d("ac-dom-styles/getStyle");
var k;var j=1200;var f=function(o){n.call(this);this.context=o;this.loadedCount=0;
this.requiredCount=0;this._imagesLoaded=false;this._webGLLoaded=false;this._didTimeout=false;
this._boundOnMaxTimeout=this._onMaxTimeout.bind(this);this._timeout=null;this.imageContainers=b(".image-hero-container .device-container")
};k=f.prototype=g.create(n.prototype);k.load=function(){try{var q=[];if(this.context._shouldUseWebGL){this._loadWebGL()
}else{this._webGLLoaded=true}if(this.context.supportsMasking){q=this.getCSSUrlsFromArr(this.imageContainers,"maskBoxImage").concat(q)
}var p,r,o=q.length;this.requiredCount=o;for(r=0;r<o;r++){p=new m(new Image());
p.once("load",this._onImageLoad.bind(this,p));p.el.src=q[r]}this._timeout=setTimeout(this._boundOnMaxTimeout,j);
if(q.length===0){this._onImageLoad()}}catch(s){this._onMaxTimeout()}};k._onMaxTimeout=function(){this._didTimeout=true;
this.trigger("complete")};k._loadWebGL=function(){this.context.webGLEffects=[];
var o=document.querySelector("[data-webgl-location]");var q=document.createElement("script");
q.src=o.getAttribute("data-webgl-location");q.async=true;document.body.appendChild(q);
if(!!window.THREE){this._onWebGLReady();return}var p=setInterval(function(){if(!!window.THREE){clearInterval(p);
this._onWebGLReady()}}.bind(this),100)};k._onWebGLReady=function(){this.context.effectsQueue=new a(this.context,{effects:this.context.effectsObj});
this.context.effectsQueue.once("ready",this._handleEffectsQueueReady.bind(this));
this.context.effectsQueue.start()};k._onImageLoad=function(o){this.loadedCount++;
if(this.loadedCount>=this.requiredCount){this._imagesLoaded=true;if(this._webGLLoaded){if(this._timeout){clearTimeout(this._timeout);
this._timeout=null}if(!this._didTimeout){this.trigger("complete")}}}if(o){setTimeout(o.destroy.bind(o),0)
}};k._handleEffectsQueueReady=function(){this._webGLLoaded=true;if(this._imagesLoaded){if(this._timeout){clearTimeout(this._timeout);
this._timeout=null}if(!this._didTimeout){this.trigger("complete")}}};k.getCSSUrlsFromArr=function(q,u){var p=[],t,s,r,o=q.length;
for(s=0;s<o;s++){t=l(q[s],u)[u];r=t.match(/\((.*?)\)/);if(r&&r[1]){r=r[1];r=r.replace(/('|")/g,"");
p.push(r)}}return p};c.exports=f},{"./OverviewEffectsQueue":821,"ac-dom-emitter":295,"ac-dom-styles/getStyle":353,"ac-dom-traversal/querySelectorAll":382,"ac-event-emitter-micro":478,"ac-object":554}],823:[function(b,d,a){var j=b("ac-viewport").Viewport,h=b("ac-dom-styles/setStyle"),g=b("ac-dom-traversal/querySelector");
var f;var c=function(k){this.context=k;this.targets={shadow:this.context.distanceElements.shadow,introContent:g(".section-intro-content"),heroContentContainer:g(".hero-content-container"),paddingContainer:g(".hero-section-padding")};
j.on("resize orientationchange",this._handleResize.bind(this));this._handleResize()
};f=c.prototype;f._handleResize=function(){var k=j.clientHeight(),l=k/2;h(this.targets.heroContentContainer,{height:k+"px"});
h(this.targets.paddingContainer,{height:k+"px"});h(this.targets.introContent,{marginTop:Math.round(-l)+"px"})
};d.exports=c},{"ac-dom-styles/setStyle":366,"ac-dom-traversal/querySelector":381,"ac-viewport":791}],824:[function(m,c,E){var n=m("ac-console").log;
var D=m("../../sharedsections/BaseSection");var w=D.prototype;var u=m("./OverviewWebGLEffects");
var A=m("./OverviewIntroAnimationPlayer");var q=m("./OverviewSectionsLoadingQueue");
var x=m("../../model/EnabledFeatures");var f=m("ac-dom-traversal/querySelector");
var o=m("./OverviewParallaxHandler");var s=m("./OverviewDistancePlayer");var z=m("./OverviewShadowStyleChanger");
var v=m("./OverviewVideoPlayer");var l=m("./OverviewHeroPaddingHandler");var B=m("./OverviewStatusProxy");
var C=m("ac-object");var y=m("ac-viewport").Viewport;var k=m("ac-browser");var h=m("ac-classlist");
var j=m("ac-clock").Clock;var b=m("ac-clock").ThrottledClock;var a=m("ac-feature");
var g=m("../../utils/animationCapable");var r=m("./OverviewFileLoader");var p=m("../../FilmsEmitterProxy");
function d(H,G,F){try{B.overviewSection=this;this.name="OverviewHeroSection - "+(H.querySelector("h1")||H.querySelector("h2")).innerText;
D.call(this,H,G,F);this.scrollTop=y.scrollY();this._uiIntroTimeoutDuration=6000;
this.preventGLRender=false;this.introPlaying=false;this.introComplete=false;this._playIntro=false;
this._webGLReady=false;this._imagesReady=false;this._videosReady=false;this._shouldPlayIntroMotion=false;
this._videoReadyEvent=null;this._shouldRenderGL=false;this._videoPlayerStarted=false;
this._animationTimeout=null;this._isSafari=k.name.toLowerCase().indexOf("safari")>-1;
this._isDesktop=a.isDesktop();this._isIOS=k.os.toLowerCase()==="ios";this._isIOSHandheld=this._isIOS&&a.isHandheld();
this.initializeTargets();window.requestAnimationFrame(function(){this.initializePaddingHandler()
}.bind(this));this._loadingInitialize()}catch(I){this._onError(I)}}var t=d.prototype=C.create(D.prototype);
t.introClassTarget=document.documentElement;t.introClassName="intro-active";t.introFallbackClassName="intro-fallback";
t.introUIHideClassName="intro-ui-hide";t.introLoadClassName="intro-load";t._isFilmAutoplay=function(){if(h.contains(this.introClassTarget,"modal-open")){return true
}return false};t._canSupportWebGLHero=function(){if(x.WEB_GL){if(this._isIOS&&this._getMaxAnisotropy()<3){return false
}return true}return false};t._loadingInitialize=function(F){F=F||{};if(!F.filmsCallback){if(!this._sectionQueueLoader){this._sectionQueueLoader=new q(this)
}this.supportsMasking=false;if(h.contains(this.introClassTarget,"mask-box-image")){this.supportsMasking=true
}this.clock=new j();this.clock.on("draw",this.onClockDraw.bind(this));if(this._canSupportWebGLHero()){if(!this.supportsMasking){u.silver.shift()
}this.webGLClock=new b(80);this._setWebGLFPS();this.webGLClock.on("draw",this.onWebGLClockDraw.bind(this));
this._shouldUseWebGL=true;y.on("breakpoint",this._setWebGLFPS.bind(this))}this._fileLoader=new r(this);
this._fileLoader.once("complete",this._handleFileLoaderReady.bind(this));this._fileLoader.load()
}if(!this._hiddenAutoplayVideoID){var G=f("[data-offscreen-modal]");this._hiddenAutoplayVideoID=G.id
}p.hasAutoplay=false;if(!p.hasAddedAutoplay&&!this._isIOSHandheld&&window.location&&window.location.hash&&window.location.hash.indexOf(this._hiddenAutoplayVideoID)>-1){p.hasAutoplay=true;
p.hasAddedAutoplay=true}if(p.hasAutoplay){this.preventGLRender=true;window.scroll(0,0);
p.once("close",this._onFilmsClosed.bind(this));return}if(this._isSafari){setTimeout(this._onInitializationDelayComplete.bind(this),75);
return}this._onInitializationDelayComplete()};t._setWebGLFPS=function(){if(!this.webGLClock){return
}var F=y.getBreakpoint().name;if((this._isDesktop&&!this._isSafari&&this._getMaxAnisotropy()>2)&&(window.devicePixelRatio<1.5||F==="small"||F==="medium")){this.webGLClock.setFps(80);
return}this.webGLClock.setFps(45)};t._getMaxAnisotropy=function(){if(typeof this._maxAnisotropy==="number"){return this._maxAnisotropy
}var F=0;try{var G=document.createElement("canvas"),J=G.getContext("experimental-webgl");
var H=(J.getExtension("EXT_texture_filter_anisotropic")||J.getExtension("MOZ_EXT_texture_filter_anisotropic")||J.getExtension("WEBKIT_EXT_texture_filter_anisotropic"));
if(H){F=J.getParameter(H.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}}catch(I){}this._maxAnisotropy=F;
return this._maxAnisotropy};t._onInitializationDelayComplete=function(F){try{if(h.contains(this.introClassTarget,this.introLoadClassName)){if(this.scrollTop<20){this._playIntro=true
}else{this.triggerAllClassNameFallback()}}this.videoContainers={gold:f(".image-hero-gold .device-container"),silver:f(".image-hero-silver .device-container")};
this._boundHandleVideoPause=this._handleVideoPause.bind(this);this.initializeDistancePlayer();
if(!this._playIntro){this._initializeAdditionalMotion()}if(a.isDesktop()&&h.contains(this.introClassTarget,"mp4")&&h.contains(this.introClassTarget,"no-ff")){this.initializeVideoPlayer()
}if(this._playIntro){h.add(this.introClassTarget,this.introClassName);h.add(this.introClassTarget,this.introUIHideClassName);
this.initializePlayer();this.introPlayer.once("complete",this._handleIntroAnimationComplete.bind(this));
if(this.videoPlayer){this._videoStartLoadTime=Date.now();this.videoPlayer.on("appended",this._onVideoPlayerStateChange.bind(this));
this.videoPlayer.on("timeout",this._onVideoPlayerStateChange.bind(this))}else{if(this._imagesReady){this._playIntroMotion()
}else{this._shouldPlayIntroMotion=true}}}else{}if(this.isActive){this.clock.start();
if(this.webGLClock){this._shouldRenderGL=true;this.webGLClock.start()}}}catch(G){this._onError(G)
}};t._onFilmsClosed=function(){h.add(this.introClassTarget,this.introClassName);
h.add(this.introClassTarget,this.introUIHideClassName);h.add(this.introClassTarget,this.introLoadClassName);
h.remove(this.introClassTarget,this.introFallbackClassName);if(window.introLoadTimeout){clearTimeout(window.introLoadTimeout);
window.introLoadTimeout=null}window.requestAnimationFrame(function(){window.requestAnimationFrame(function(){this._loadingInitialize({filmsCallback:true});
setTimeout(function(){h.remove(this.introClassTarget,this.introUIHideClassName)
}.bind(this),150)}.bind(this))}.bind(this),0);setTimeout(function(){this.triggerAllClassNameFallback()
}.bind(this),6000)};t.triggerAllClassNameFallback=function(){this._removeIntroLoadClassName();
this._handleIntroUIHideComplete();this._handleIntroComplete()};t._handleFileLoaderReady=function(){this._imagesReady=true;
if(this.videoPlayer){if(this._videosReady){this._playVideoIntroMotion()}return}if(this._shouldPlayIntroMotion){this._playIntroMotion()
}};t._handleIntroAnimationComplete=function(){this._handleIntroComplete();this.introComplete=true
};t._initializeAdditionalMotion=function(){if(g){if(!this.parallaxHandler){this.initializeParallaxHandler()
}if(!this.shadowStyleChanger){this.initializeShadowStyleChanger()}this.preventGLRender=false
}};t._onVideoPlayerStateChange=function(F){if(F.key==="gold"){this._videoReadyEvent=F;
this._videosReady=true;if(this._imagesReady){this._playVideoIntroMotion()}}};t._playIntroMotion=function(){if(this.introPlaying){return
}this.introPlaying=true;this.introPlayer.once("play",function(){this._removeIntroLoadClassName();
this._initializeAdditionalMotion()}.bind(this));setTimeout(this.introPlayer.play.bind(this.introPlayer),0)
};t._playVideoIntroMotion=function(){if(this.introPlaying){return}var F=Date.now()-this._videoStartLoadTime;
this.introPlaying=true;this.introPlayer.once("play",function(){setTimeout(function(){this._initializeAdditionalMotion();
if(this._videoReadyEvent.name==="appended"&&this.videoPlayer.activeStatus.gold){window.requestAnimationFrame(function(){this.videoPlayer.playVideo("gold");
this._videoReadyEvent=null}.bind(this))}this.videoPlayer.on("pause",this._boundHandleVideoPause)
}.bind(this),250);window.requestAnimationFrame(function(){this._removeIntroLoadClassName()
}.bind(this))}.bind(this));setTimeout(function(G){this.introPlayer.play(G)}.bind(this,F),0)
};t._removeIntroLoadClassName=function(){if(window.introLoadTimeout){clearTimeout(window.introLoadTimeout);
window.introLoadTimeout=null}this._animationTimeout=setTimeout(this._onUIAnimationTimeoutComplete.bind(this),this._uiIntroTimeoutDuration);
h.remove(this.introClassTarget,this.introLoadClassName)};t._onUIAnimationTimeoutComplete=function(){this._handleIntroUIHideComplete();
this.introComplete=true};t.initializeTargets=function(){this.parallaxContainers={silver:f(".image-hero-silver"),spacegray:f(".image-hero-spacegray"),gold:f(".image-hero-gold"),rosegold:f(".image-hero-rosegold"),headline:f(".hero-logo-motion-container"),headline_links:f(".hero-logo-motion-container .more-links")};
this.animationContainers={silver:f(".image-hero-silver .device-container"),spacegray:f(".image-hero-spacegray .device-container"),gold:f(".image-hero-gold .device-container"),rosegold:f(".image-hero-rosegold .device-container"),headline:f(".hero-logo-content-container")};
this.distanceElements={silver:f(".image-hero-silver .device"),spacegray:f(".image-hero-spacegray .device"),gold:f(".image-hero-gold .device"),rosegold:f(".image-hero-rosegold .device"),shadow:f(".image-hero-shadow"),sectiontop:f(".hero-section-top")};
this.effectsObj=u};t.initializePaddingHandler=function(){this.paddingHandler=new l(this)
};t.initializeVideoPlayer=function(){this.videoPlayer=new v(this)};t.initializeParallaxHandler=function(){this.parallaxHandler=new o(this);
this.parallaxHandler.handleScroll()};t.initializeWebGL=function(){};t.initializePlayer=function(){this.introPlayer=new A(this)
};t.initializeDistancePlayer=function(){this.distanceCalculator=new s(this)};t.initializeShadowStyleChanger=function(){this.shadowStyleChanger=new z(this)
};t._handleIntroComplete=function(){this._handleIntroUIHideComplete();h.remove(this.introClassTarget,this.introClassName);
if(!B.ready){B.trigger("ready")}this.introPlaying=false};t._handleIntroUIHideComplete=function(){if(this._sectionQueueLoader){this._sectionQueueLoader.start()
}};t._onWebGLReady=function(){};t._onError=function(F){this._removeIntroLoadClassName();
this._handleIntroComplete();this._handleIntroUIHideComplete()};t._handleVideoPause=function(F){if(F.key==="gold"){this.videoPlayer.enableAutoplay[F.key]=true
}};t.onClockDraw=function(){if(this.distanceCalculator){this.distanceCalculator.calculate();
if(!this.webGLClock&&this.shadowStyleChanger){this.shadowStyleChanger.setProgress();
this.shadowStyleChanger.render()}}};t.onWebGLClockDraw=function(){if(!this._shouldRenderGL||this.preventGLRender){return
}if(this.distanceCalculator&&this.shadowStyleChanger){this.shadowStyleChanger.setProgress();
this.shadowStyleChanger.render()}if(this._webGLReady){var H,G,F;for(H in this.webGLEffects){if(this.webGLEffects.hasOwnProperty(H)){F=this.webGLEffects[H].length;
for(G=0;G<F;G++){this.webGLEffects[H][G].drawScene()}}}}};t.activate=function(){w.activate.call(this)
};t.deactivate=function(){w.deactivate.call(this)};t.animateIn=function(){w.animateIn.call(this)
};t.onRequestAnimationFrame=function(){w.onRequestAnimationFrame.call(this)};t.onScroll=function(H,G,F){w.onScroll.call(this,H,G,F);
this.scrollTop=G;if(this.parallaxHandler){this.parallaxHandler.handleScroll()}if(B.ready){return
}if(!this._sectionScrollReadyTarget){this.setSectionScrollReadyTarget()}if(G>=this._sectionScrollReadyTarget){this.triggerAllClassNameFallback()
}};t.setSectionScrollReadyTarget=function(){this._sectionScrollReadyTarget=this.element.getBoundingClientRect().height/6
};t.onResize=function(H,G,F){w.onResize.call(this,H,G,F);if(B.ready){return}this.setSectionScrollReadyTarget()
};t.onViewWillAppear=function(G,F){w.onViewWillAppear.call(this,G,F);if(this.clock){this.clock.start()
}if(this.webGLClock){this._shouldRenderGL=true;this.webGLClock.start()}};t.onViewWillDisappear=function(G,F){w.onViewWillDisappear.call(this,G,F);
if(this.clock){this.clock.stop()}if(this.webGLClock){this._shouldRenderGL=false
}if(this._sectionQueueLoader){this._sectionQueueLoader.revealAll()}};t.destroy=function(){w.destroy.call(this)
};c.exports=d},{"../../FilmsEmitterProxy":797,"../../model/EnabledFeatures":810,"../../sharedsections/BaseSection":852,"../../utils/animationCapable":863,"./OverviewDistancePlayer":820,"./OverviewFileLoader":822,"./OverviewHeroPaddingHandler":823,"./OverviewIntroAnimationPlayer":825,"./OverviewParallaxHandler":827,"./OverviewSectionsLoadingQueue":828,"./OverviewShadowStyleChanger":829,"./OverviewStatusProxy":830,"./OverviewVideoPlayer":831,"./OverviewWebGLEffects":832,"ac-browser":261,"ac-classlist":272,"ac-clock":283,"ac-console":291,"ac-dom-traversal/querySelector":381,"ac-feature":491,"ac-object":554,"ac-viewport":791}],825:[function(f,c,k){var r=f("ac-event-emitter-micro").EventEmitterMicro;
var o=f("ac-eclipse").Clip;var j=f("ac-object");var q=f("ac-viewport").Viewport;
var m=f("../../ClipRegistry");var n=f("ac-browser");var l;var h={ease:"cubic-bezier(0.350, 0.990, 0.310, 1.000)",duration:4,delay:0};
var d=0;var a=0.6;var p={gold:{large:{translateY:function(){var t=0,s=this.context.animationContainers.gold.getBoundingClientRect().height/3;
return -((q.innerHeight()*1.2)+t)+"px"},translateX:function(){return(q.innerWidth()*0.2)+"px"
}},medium:{translateY:function(){var t=0,s=this.context.animationContainers.gold.getBoundingClientRect().height/3;
return -((q.innerHeight()*1.2)+t)+"px"},translateX:function(){return(q.innerWidth()*0.2)+"px"
}},small:{translateY:function(){var t=0,s=this.context.animationContainers.gold.getBoundingClientRect().height/3;
return -((q.innerHeight()*1.2)+t)+"px"},translateX:function(){return(q.innerWidth()*0.2)+"px"
}}},headline:{large:{translateY:"10px"},medium:{translateY:"10px"},small:{translateY:"10px"}}};
var g={els:{silver:{animation:{transform:{translateY:function(){return q.innerHeight()+"px"
},rotate:"-15deg"}}},gold:{delay:0,duration:h.duration,animation:{transform:{rotate:"-25deg"}}},rosegold:{duration:h.duration+0.1,animation:{transform:{translateY:function(){return q.innerHeight()+"px"
},rotate:"-30deg"}}},spacegray:{duration:h.duration,animation:{transform:{translateY:function(){return -q.innerHeight()/1.2+"px"
},rotate:"-25deg"}}},headline:{delay:0,duration:h.duration,animation:{opacity:0,transform:{}}}}};
var b=function(s){r.call(this);this.context=s;this.clock=this.context.clock;this.animationOptions=j.clone(g);
this.useInlineStyles=false;this.positions={}};l=b.prototype=j.create(r.prototype);
l.play=function(t){if(this._didPlay){return}this._didPlay=true;if(typeof t==="number"){var s=t/1000;
d-=s;if(d<0){d=0}}this._createClips();this._clipsComplete=0;setTimeout(function(){var u=this.context.animationContainers.headline;
u.style.display="none";u.offsetHeight;u.style.display="";window.requestAnimationFrame(function(){this.startTime=Date.now();
var w,v=this.clips.length;for(w=0;w<v;w++){this.clips[w].play()}this.trigger("play")
}.bind(this))}.bind(this),d*1000)};l.stop=function(){};l._createClips=function(){this.clips=[];
var v=this.context.animationContainers,t=this.animationOptions,y=q.getBreakpoint().name;
if(y==="xlarge"){y="large"}var x,w,z,u,A,s;for(x in v){if(v.hasOwnProperty(x)){this.positions[x]={};
if(p[x]&&p[x][y]){for(w in p[x][y]){if(p[x][y].hasOwnProperty(w)){t.els[x].animation.transform[w]=p[x][y][w]
}}}if(t.els[x].animation.transform){for(u in t.els[x].animation.transform){if(t.els[x].animation.transform.hasOwnProperty(u)){if(typeof t.els[x].animation.transform[u]==="function"){t.els[x].animation.transform[u]=t.els[x].animation.transform[u].call(this)
}}}}if(x==="headline"){z=false}else{z=this.useInlineStyles}A={ease:t.els[x].ease||h.ease,delay:t.els[x].delay||h.delay,propsFrom:t.els[x].animation,inlineStyles:z,clock:this.clock,onUpdate:this._onClipUpdate.bind(this,x,t.els[x].animation),onComplete:this._onClipComplete.bind(this,x),removeStylesOnComplete:false};
if(x==="headline"){A.removeStylesOnComplete=false}s=new o(v[x],t.els[x].duration||h.duration,null,A);
this.clips.push(m.add(s))}}};l._onClipUpdate=function(v,t,w){var s=t.transform.translateY,u=w.progress;
if(!s){return}if(!this._didTriggerUIComplete&&u>=a){this._onClipUIComplete()}this.positions[v].progress=u;
this.positions[v].transY=(1-u)*parseInt(s)};l._onClipUIComplete=function(){if(this._didTriggerUIComplete){return
}this._didTriggerUIComplete=true;this.trigger("ui-complete")};l._onClipComplete=function(s,t){this._clipsComplete++;
if(this.clips.length===this._clipsComplete){this.trigger("complete")}};c.exports=b
},{"../../ClipRegistry":795,"ac-browser":261,"ac-eclipse":"ac-eclipse","ac-event-emitter-micro":478,"ac-object":554,"ac-viewport":791}],826:[function(c,d,b){var h=c("../../BasePage");
var a=c("ac-object");var f;var g=function(){h.call(this)};f=g.prototype=a.create(h.prototype);
d.exports=g},{"../../BasePage":794,"ac-object":554}],827:[function(b,a,f){var l=b("ac-event-emitter-micro").EventEmitterMicro;
var d=b("ac-scroll-motion-emitter").ElementScrollMotionEmitter;var c=b("ac-object");
var k=b("ac-viewport").Viewport;var h=b("ac-dom-styles/setStyle");var g;var m={silver:{translateY:{large:100,medium:100,small:50},offsetBottoms:{large:-1000,medium:-800,small:-500},rotate:-10},gold:{translateY:{large:-200,medium:-200,small:-100},rotate:0},rosegold:{translateY:{large:-120,medium:-120,small:-60},rotate:-14},spacegray:{translateY:{large:-400,medium:-400,small:-200},rotate:0},headline:{translateY:{large:100,medium:100,small:100},rotate:0},headline_links:{opacity:0},};
var j=function(n){l.call(this);this.context=n;this.clock=this.context.clock;this.setBreakpointName();
this.initializeScrollEmitters();k.on("breakpoint",this._handleBreakpointChange.bind(this))
};g=j.prototype=c.create(l.prototype);g.initializeScrollEmitters=function(){this.emitters={};
this.positions={};var p=this.context.parallaxContainers;var o,n;for(o in p){if(p.hasOwnProperty(o)){if(o!=="headline_links"){this.positions[o]={};
n={smooth:true,friction:20,clock:this.clock};if(o==="headline"){n.smooth=false}if(m[o].offsetTops){n.offsetTop=function(q){return m[q].offsetTops[this.breakpointName]
}.bind(this,o)}if(m[o].offsetBottoms){n.offsetBottom=function(q){return m[q].offsetBottoms[this.breakpointName]
}.bind(this,o)}this.emitters[o]=new d(this.context.element,n);this.emitters[o].on("update",this._handleScrollEmitterUpdate.bind(this,o));
this.emitters[o].start()}}}};g.setBreakpointName=function(){this.breakpointName=k.getBreakpoint().name;
if(this.breakpointName==="xlarge"){this.breakpointName="large"}};g.handleScroll=function(){var n;
for(n in this.emitters){if(this.emitters.hasOwnProperty(n)){this.emitters[n].handleScroll()
}}};g._handleScrollEmitterUpdate=function(q,s){var p=s.progress;if(q==="rosegold"){var r=5;
if(this.breakpointName==="small"){r=r*5}var o=(1-p*r);if(o<0){o=0}else{if(o>1){o=1
}}h(this.context.parallaxContainers.headline_links,{opacity:o})}var t=p*m[q].translateY[this.breakpointName],n=p*m[q].rotate;
this.positions[q].transY=t;this.positions[q].rotate=n;this.positions[q].progress=p;
h(this.context.parallaxContainers[q],{transform:"translate3d(0px,"+this.positions[q].transY+"px,0px) rotate("+this.positions[q].rotate+"deg)"})
};g._handleBreakpointChange=function(){this.setBreakpointName()};a.exports=j},{"ac-dom-styles/setStyle":366,"ac-event-emitter-micro":478,"ac-object":554,"ac-scroll-motion-emitter":643,"ac-viewport":791}],828:[function(f,c,g){var b=f("ac-dom-traversal/querySelectorAll"),j=f("ac-viewport").Viewport,a=f("ac-classlist"),d=f("../../model/EnabledFeatures");
var h;var k=function(l){this.context=l;this.imageFigures=b(".image-figure");this._documentTarget=document.documentElement;
this._revealCount=0;this._activeCount=0;this._revealedAll=false;this._boundOnRevealed=this._onRevealed.bind(this)
};h=k.prototype;h.revealDelay=500;h.poolSize=2;h.revealClassName="intro-ui-hide";
h.start=function(){if(this._revealedAll){return}if(!this.context._playIntro||d.IS_TABLET){this.revealAll();
return}var m,l=this.imageFigures.length;for(m=0;m<l;m++){a.add(this.imageFigures[m],this.revealClassName)
}window.requestAnimationFrame(function(){a.remove(this._documentTarget,this.revealClassName);
this._start()}.bind(this))};h._start=function(){var l=this.getNextImage();if(!l){return
}a.remove(l,this.revealClassName);setTimeout(this._boundOnRevealed,this.revealDelay)
};h._onRevealed=function(){this._activeCount--;if(this._revealCount>=this.imageFigures.length){this._revealedAll=true;
return}this._start()};h.getNextImage=function(){if(this._activeCount>=this.poolSize){return null
}this._activeCount++;var l=this.imageFigures[this._revealCount];this._revealCount++;
return l};h.revealAll=function(){a.remove(this._documentTarget,this.revealClassName);
var m,l=this.imageFigures.length;for(m=0;m<l;m++){a.remove(this.imageFigures[m],this.revealClassName)
}this._revealedAll=true};c.exports=k},{"../../model/EnabledFeatures":810,"ac-classlist":272,"ac-dom-traversal/querySelectorAll":382,"ac-viewport":791}],829:[function(b,c,a){var j=b("ac-viewport").Viewport;
var f=b("ac-dom-styles/setStyle");var d;var g={transform:{scale:1.1},opacity:0.98};
var h=function(k){this.context=k;this.el=this.context.distanceElements.shadow;this.settings={scrollStart:0,scrollEnd:1,invert:false};
this.setBreakpointName();j.on("breakpoint",this.setBreakpointName.bind(this))};
d=h.prototype;d.setProgress=function(){var l=this.context.parallaxHandler.positions.silver.progress;
var m=this.settings.scrollStart,k=this.settings.scrollEnd;if(l<m){l=m}else{if(l>k){l=k
}}l=(l-m)/(k-m);if(this.settings.invert){l=1-l}this.progress=l};d.render=function(){var l=this.progress*g.transform.scale,k=this.progress*k;
f(this.el,{transform:"scale3d("+l+","+l+", 1)",opacity:k})};d.setBreakpointName=function(){this.breakpointName=j.getBreakpoint().name;
if(this.breakpointName==="xlarge"){this.breakpointName="large"}};c.exports=h},{"ac-dom-styles/setStyle":366,"ac-viewport":791}],830:[function(c,d,b){var h=c("ac-event-emitter-micro").EventEmitterMicro,a=c("ac-object");
var g;var f=function(){h.call(this);this.ready=false;this.once("ready",this._onReady.bind(this));
if(!window.AC){window.AC={}}window.AC.OverviewStatusProxy=this};g=f.prototype=a.create(h.prototype);
g._onReady=function(){this.ready=true};d.exports=new f()},{"ac-event-emitter-micro":478,"ac-object":554}],831:[function(h,c,l){var r=h("ac-event-emitter-micro").EventEmitterMicro;
var m=h("ac-dom-traversal/querySelector");var f=h("../../model/EnabledFeatures");
var b=h("ac-classlist");var k=h("ac-object");var q=h("ac-dom-emitter").DOMEmitter;
var p=h("ac-viewport").Viewport;var o=h("ac-cname").cname;var a=h("ac-classlist");
var n;var j=false;var s="/105/media/us/iphone-6s/2015/dhs3b549_75f9_422a_9470_4a09e709b350/overview/hero";
var g={gold:{"1x":"gold_device_screen","2x":"gold_device_screen_2x"},silver:{"1x":"silver_device_screen","2x":"silver_device_screen_2x"}};
var d=function(t){r.call(this);this.context=t;this.loaded={};this.playOnLoads={};
this.loadingTimeouts={gold:null,silver:null};this.activeStatus={gold:false,silver:false};
this.appendedStatus={gold:false,silver:false};this.visibilityStatus={gold:false,silver:false};
this.timeoutTriggered={gold:false,silver:false};this.enableAutoplay={gold:true,silver:true};
this.elementHeights={gold:this.getElementHeight("gold"),silver:this.getElementHeight("silver")};
this.setBreakpointName();this.shouldPlay={gold:true,silver:true};this.inView={gold:false,silver:false};
this.wasInView={gold:false,silver:false};this.createVideos();this.initialize();
this._bindEvents();this.playVideosIfNeeded();this.context.clock.on("draw",this.playVideosIfNeeded.bind(this))
};n=d.prototype=k.create(r.prototype);n.activeClass="active";n.hiddenClass="hidden";
n.loadingTimeoutDuration=2250;n.initialize=function(){var t;for(t in this.videos){if(this.videos.hasOwnProperty(t)){this.activateVideo(t,this.videos[t])
}}};n._onLoadingTimeout=function(u,v){this.timeoutTriggered[u]=true;var t="timeout";
this.trigger(t,{key:u,videoEmitter:v,wrapperEl:this.wrappers[u],name:t})};n.appendVideoElement=function(u,v){if(!this.context.videoContainers[u]){return
}this.context.videoContainers[u].appendChild(this.wrappers[u]);this.appendedStatus[u]=true;
var t="appended";this.trigger(t,{key:u,videoEl:v.el,wrapperEl:this.wrappers[u],name:t})
};n.getElementHeight=function(t){return this.context.parallaxContainers[t].getBoundingClientRect().height
};n._bindEvents=function(){p.on("breakpoint",function(){this.setBreakpointName();
this.elementHeights={gold:this.getElementHeight("gold"),silver:this.getElementHeight("silver")}
}.bind(this))};n.playVideosIfNeeded=function(){this.handleAutoplay("silver");this.handleAutoplay("gold")
};n.isInView=function(v){var u=20;if(this.inView[v]){u=4}var w=this.context.distanceCalculator.getWorldSpace(v).y,z=this.context.scrollTop,x=p.innerHeight()+z,y=w-this.elementHeights[v]/u,t=w+this.elementHeights[v]/u;
return(x>=y&&z<=t)};n.addActiveClass=function(t){this.activeStatus[t]=true;a.add(this.videos[t].el,this.activeClass)
};n.removeActiveClass=function(t){this.activeStatus[t]=false;a.remove(this.videos[t].el,this.activeClass)
};n.handleAutoplay=function(u){if(!this.enableAutoplay[u]||!this.appendedStatus[u]){return
}var t=this.inView[u]=this.isInView(u);if(u==="gold"&&this.context.introPlaying){t=true
}if(this.shouldPlay[u]&&t){this.shouldPlay[u]=false;if(!this.loaded[u]){this.playOnLoads[u]=true;
return}else{this.playVideo(u)}}else{if(!this.shouldPlay[u]&&!t){this._handleViewReset(u)
}}if(!t&&!this.activeStatus[u]){this.addActiveClass(u)}if(j){if(t){this.makeVisible(u);
return}this.makeInvisible(u)}};n.resetAll=function(){var t;for(t in this.videos){if(this.videos.hasOwnProperty(t)){this._handleViewReset(t)
}}};n.makeVisible=function(t){if(this.wasInView[t]){return}this.wasInView[t]=true;
a.remove(this.videos[t].el,this.hiddenClass)};n.makeInvisible=function(t){if(!this.wasInView[t]){return
}this.wasInView[t]=false;a.add(this.videos[t].el,this.hiddenClass)};n.createVideos=function(){var t="1x";
if(window.devicePixelRatio>1.5){t="2x"}this.videos={};this.wrappers={};var u,v,w;
for(u in g){if(g.hasOwnProperty(u)){v=document.createElement("video");v.src=o.formatUrl(s,g[u][t],".mp4");
v.className="device-video";this.videos[u]=new q(v);w=document.createElement("div");
w.className="device-video-mask";w.appendChild(v);this.wrappers[u]=w}}};n.activateVideo=function(u,v){var t=v.el;
v.once("canplaythrough",this._onCanPlayThrough.bind(this,u,v));v.on("pause",this._onPause.bind(this,u,v));
this.loadingTimeouts[u]=setTimeout(this._onLoadingTimeout.bind(this,u,v),this.loadingTimeoutDuration);
t.load()};n.playVideo=function(u,t){if(this.videos[u]){if(!a.contains(this.videos[u].el,this.activeClass)){a.add(this.videos[u].el,this.activeClass);
window.requestAnimationFrame(function(){if(this.videos[u].el.paused){this.videos[u].el.play()
}}.bind(this))}else{this.videos[u].el.play()}}};n._onCanPlayThrough=function(t,u){this.loaded[t]=true;
if(!this.appendedStatus[t]){this.appendVideoElement(t,u)}if(this.timeoutTriggered[t]){return
}if(this.loadingTimeouts[t]){clearTimeout(this.loadingTimeouts[t]);this.loadingTimeouts[t]=null;
if(this.context.introPlaying&&t==="gold"){this.playVideo(t,true)}}if(this.playOnLoads[t]){this.playVideo(t)
}};n._onPause=function(t,u){this.trigger("pause",{key:t,videoEl:u.el,wrapperEl:this.wrappers[t]})
};n._handleViewReset=function(t){var u=this.videos[t];if(u){this.shouldPlay[t]=true;
this.removeActiveClass(t);u.el.pause();u.el.currentTime=0}};n.setBreakpointName=function(){this.breakpointName=p.getBreakpoint().name;
if(this.breakpointName==="xlarge"){this.breakpointName="large"}};c.exports=d},{"../../model/EnabledFeatures":810,"ac-classlist":272,"ac-cname":289,"ac-dom-emitter":295,"ac-dom-traversal/querySelector":381,"ac-event-emitter-micro":478,"ac-object":554,"ac-viewport":791}],832:[function(d,b,h){var m=d("./webgl/shadow-passes/SpaceGrayShadowPass"),c=d("./webgl/shadow-passes/RoseGoldShadowPass"),l=d("./webgl/shadow-passes/SilverShadowPass");
var o=d("./webgl/gradient-pass/RoseGoldLogoPass"),g=d("./webgl/gradient-pass/SpaceGrayLogoPass");
var p=d("./webgl/matcap/SilverTouchID"),j=d("./webgl/matcap/GoldTouchID"),a=d("./webgl/matcap/SpaceGrayCamera"),n=d("./webgl/matcap/SpaceGrayButton"),f=d("./webgl/matcap/RoseGoldCamera"),k=d("./webgl/matcap/RoseGoldButtons");
b.exports={silver:[l,p],spacegray:[m,a,g],gold:[j],rosegold:[c,f,k,o]}},{"./webgl/gradient-pass/RoseGoldLogoPass":833,"./webgl/gradient-pass/SpaceGrayLogoPass":834,"./webgl/matcap/GoldTouchID":835,"./webgl/matcap/RoseGoldButtons":836,"./webgl/matcap/RoseGoldCamera":837,"./webgl/matcap/SilverTouchID":838,"./webgl/matcap/SpaceGrayButton":839,"./webgl/matcap/SpaceGrayCamera":840,"./webgl/shadow-passes/RoseGoldShadowPass":841,"./webgl/shadow-passes/SilverShadowPass":842,"./webgl/shadow-passes/SpaceGrayShadowPass":843}],833:[function(c,b,f){var l=c("../../../../webgl/types/MaterialCapturePlayer"),k=c("../../../../webgl/shaders/shaders.json"),d=c("ac-object"),a=c("ac-motion-emitter").MotionEmitter,h=c("ac-viewport").Viewport;
var g;var j=function(o,m,p){this.context=o;this.context=o;this._lastScrollPos=null;
this._lastTimeInPxThreshold=null;this._minFriction=5;this._maxFriction=40;this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:-1,matcapRangeMax:1};
this.animationRanges={xlarge:{min:0,max:0.2},large:{min:0,max:0.2},medium:{min:0,max:0.2},small:{min:0,max:0.2}};
this.introAnimationRanges={xlarge:{min:0,max:0.7},large:{min:0,max:0.7},medium:{min:0,max:0.7},small:{min:0,max:0.7}};
var n=this.getSizeForBreakpoint();l.call(this,o,{width:n,height:n,className:this.className,subpath:m.subpath});
if(p){return}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:k.vertex,fragmentShader:k["gradient-pass"]}
};g=j.prototype=d.create(l.prototype);g.sizes={small:64,defaults:128};g.className="rosegold-logo-matcap";
g.getImagePaths=function(){var m={allowXLarge:true};return{maskMap:this.getAssetURL("hero_rosegold_logo_alpha",m),gradientMap:this.getAssetURL("rosegold_logo_gradient",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};g.renderIntroProgressOffset=function(){if(!this.context.introPlayer.positions.spacegray){return
}var p=this.context.introPlayer.positions.spacegray.progress;var o=this.introAnimationRanges[this.breakpointName].min,m=this.introAnimationRanges[this.breakpointName].max;
var n=p;if(n<o){n=o}else{if(n>m){n=m}}n=1-(m-n)/(m-o);this._introOffsetProgress=n
};g.render=function(){if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset()
}if(!this._introOffsetProgress){this._introOffsetProgress=1}var o=0,q=this.settings.progressRangeMin,n=this.settings.progressRangeMax;
if(this.context.parallaxHandler){var r=this.context.parallaxHandler.positions.spacegray.progress;
var p=this.settings.scrollMin,m=this.settings.scrollMax;o=(m-r)/(m-p);if(o<0){o=0
}else{if(o>1){o=1}}if(o<q){o=q}else{if(o>n){o=n}}}o=(o*(-1/n));if(typeof this._introOffsetProgress==="number"){o+=this._introOffsetProgress
}if(isNaN(o)){return}o=(o*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
o=(o+1)/2;this.setProgress(o)};b.exports=j},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-motion-emitter":547,"ac-object":554,"ac-viewport":791}],834:[function(c,b,f){var l=c("../../../../webgl/types/MaterialCapturePlayer"),k=c("../../../../webgl/shaders/shaders.json"),d=c("ac-object"),a=c("ac-motion-emitter").MotionEmitter,h=c("ac-viewport").Viewport;
var g;var j=function(o,m,p){this.context=o;this.context=o;this._lastScrollPos=null;
this._lastTimeInPxThreshold=null;this._minFriction=5;this._maxFriction=40;this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:0,matcapRangeMax:1};
this.animationRanges={xlarge:{min:0,max:0.2},large:{min:0,max:0.2},medium:{min:0,max:0.2},small:{min:0,max:0.2}};
this.introAnimationRanges={xlarge:{min:0,max:0.7},large:{min:0,max:0.7},medium:{min:0,max:0.7},small:{min:0,max:0.7}};
var n=this.getSizeForBreakpoint();l.call(this,o,{width:n,height:n,className:this.className,subpath:m.subpath});
if(p){return}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:k.vertex,fragmentShader:k["gradient-pass"]}
};g=j.prototype=d.create(l.prototype);g.sizes={small:64,defaults:128};g.className="spacegray-logo-matcap";
g.getImagePaths=function(){var m={allowXLarge:true};return{maskMap:this.getAssetURL("hero_spacegray_logo_alpha",m),gradientMap:this.getAssetURL("spacegray_logo_gradient",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};g.renderIntroProgressOffset=function(){if(!this.context.introPlayer.positions.spacegray){return
}var p=this.context.introPlayer.positions.spacegray.progress;var o=this.introAnimationRanges[this.breakpointName].min,m=this.introAnimationRanges[this.breakpointName].max;
var n=p;if(n<o){n=o}else{if(n>m){n=m}}n=1-(m-n)/(m-o);this._introOffsetProgress=n
};g.render=function(){if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset()
}if(!this._introOffsetProgress){this._introOffsetProgress=1}var o=0,q=this.settings.progressRangeMin,n=this.settings.progressRangeMax;
if(this.context.parallaxHandler){var r=this.context.parallaxHandler.positions.spacegray.progress;
var p=this.settings.scrollMin,m=this.settings.scrollMax;o=(m-r)/(m-p);if(o<0){o=0
}else{if(o>1){o=1}}if(o<q){o=q}else{if(o>n){o=n}}}o=(o*(-1/n));if(typeof this._introOffsetProgress==="number"){o+=this._introOffsetProgress
}if(isNaN(o)){return}o=(o*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
o=(o+1)/2;this.setProgress(o)};b.exports=j},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-motion-emitter":547,"ac-object":554,"ac-viewport":791}],835:[function(b,a,d){var k=b("../../../../webgl/types/MaterialCapturePlayer"),j=b("../../../../webgl/shaders/shaders.json"),c=b("ac-object"),h=b("ac-viewport").Viewport;
var f;var g=function(n,l,o){this.context=n;this.animationRanges={xlarge:{min:0,max:0.2},large:{min:0,max:0.2},medium:{min:0,max:0.2},small:{min:0,max:0.2}};
this.introAnimationRanges={xlarge:{min:0,max:0.85},large:{min:0,max:0.85},medium:{min:0,max:0.85},small:{min:0,max:0.85}};
var m=this.getSizeForBreakpoint();this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:-1,matcapRangeMax:1};
k.call(this,n,{width:m,height:m,className:this.className,subpath:l.subpath});if(o){return
}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:j.vertex,fragmentShader:j["material-capture"]}
};f=g.prototype=c.create(k.prototype);f.composerPasses=0;f.className="gold-touch-id-matcap";
f.sizes={small:32,defaults:64};f.getImagePaths=function(){var l={allowXLarge:true};
return{maskMap:this.getAssetURL("hero_gold_touch_id_alpha",l),normalMap:this.getAssetURL("hero_gold_touch_id_normals",l),matcapMap:this.getAssetURL("gold_touch_id_matcap",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};f.renderIntroProgressOffset=function(){if(!this.context.introPlayer.positions.spacegray){return
}var o=this.context.introPlayer.positions.gold.progress;var n=this.introAnimationRanges[this.breakpointName].min,l=this.introAnimationRanges[this.breakpointName].max;
var m=o;if(m<n){m=n}else{if(m>l){m=l}}m=1-(l-m)/(l-n);this._introOffsetProgress=m
};f.render=function(){if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset()
}if(!this._introOffsetProgress){this._introOffsetProgress=1}var n=0,p=this.settings.progressRangeMin,m=this.settings.progressRangeMax;
if(this.context.parallaxHandler){var q=this.context.parallaxHandler.positions.gold.progress;
var o=this.settings.scrollMin,l=this.settings.scrollMax;n=(l-q)/(l-o);if(n<0){n=0
}else{if(n>1){n=1}}if(n<p){n=p}else{if(n>m){n=m}}}n=(n*(-1/m));if(typeof this._introOffsetProgress==="number"){n+=this._introOffsetProgress
}if(isNaN(n)){return}n=(n*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
this.setProgress(n-1)};a.exports=g},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-object":554,"ac-viewport":791}],836:[function(c,b,f){var l=c("../../../../webgl/types/MaterialCapturePlayer"),k=c("../../../../webgl/shaders/shaders.json"),d=c("ac-object"),a=c("ac-motion-emitter").MotionEmitter,j=c("ac-viewport").Viewport;
var g;var h=function(o,m,p){this.context=o;var n=this.getSizeForBreakpoint();this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:-1,matcapRangeMax:1,matcapOffset:0};
this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:-1,matcapRangeMax:1};
this.animationRanges={xlarge:{min:0,max:0.33},large:{min:0,max:0.33},medium:{min:0,max:0.33},small:{min:0,max:0.33}};
this.introAnimationRanges={xlarge:{min:0.2,max:0.6},large:{min:0.2,max:0.6},medium:{min:0.2,max:0.6},small:{min:0.2,max:0.6}};
l.call(this,o,{width:n,height:n,className:this.className,subpath:m.subpath});if(p){return
}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:k.vertex,fragmentShader:k["material-capture"]};
this.motionEmitter=new a({min:0,max:1,clock:this.context.clock,friction:5});this.motionEmitter.on("draw",function(q){this.setProgress(q.progress)
}.bind(this));this.motionEmitter.start()};g=h.prototype=d.create(l.prototype);g.sizes={small:128,defaults:256};
g.className="rosegold-buttons-matcap";g.getImagePaths=function(){var m={allowXLarge:true};
return{maskMap:this.getAssetURL("hero_rosegold_buttons_alpha",m),normalMap:this.getAssetURL("hero_rosegold_buttons_normals",m),matcapMap:this.getAssetURL("rosegold_buttons_matcap",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};g.renderIntroProgressOffset=function(){if(!this.context.introPlayer.positions.spacegray){return
}var p=this.context.introPlayer.positions.spacegray.progress;var o=this.introAnimationRanges[this.breakpointName].min,m=this.introAnimationRanges[this.breakpointName].max;
var n=p;if(n<o){n=o}else{if(n>m){n=m}}n=1-(m-n)/(m-o);this._introOffsetProgress=n
};g.render=function(){if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset()
}if(!this._introOffsetProgress){this._introOffsetProgress=1}var o=0,q=this.settings.progressRangeMin,n=this.settings.progressRangeMax;
if(this.context.parallaxHandler){var r=this.context.parallaxHandler.positions.rosegold.progress;
var p=this.settings.scrollMin,m=this.settings.scrollMax;o=(m-r)/(m-p);if(o<0){o=0
}else{if(o>1){o=1}}if(o<q){o=q}else{if(o>n){o=n}}}o=(o*(-1/n));if(typeof this._introOffsetProgress==="number"){o+=this._introOffsetProgress
}if(isNaN(o)){return}o=(o*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
this.motionEmitter.setProgress(o-1)};b.exports=h},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-motion-emitter":547,"ac-object":554,"ac-viewport":791}],837:[function(b,a,f){var k=b("../../../../webgl/types/MaterialCapturePlayer"),j=b("../../../../webgl/shaders/shaders.json"),d=b("ac-object"),h=b("ac-viewport").Viewport;
var g;var c=function(n,l,o){this.context=n;var m=this.getSizeForBreakpoint();this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:-1,matcapRangeMax:1,matcapOffset:0};
this.animationRanges={xlarge:{min:0,max:62},large:{min:0,max:62},medium:{min:0,max:62},small:{min:0,max:62}};
this.introAnimationRanges={xlarge:{min:0,max:1000},large:{min:0,max:1800},medium:{min:0,max:1400},small:{min:0,max:1200}};
k.call(this,n,{width:m,height:m,className:this.className,subpath:l.subpath});if(o){return
}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:j.vertex,fragmentShader:j["material-capture"]}
};g=c.prototype=d.create(k.prototype);g.composerPasses=0;g.sizes={xlarge:64,large:64,defaults:32};
g.className="rosegold-camera-matcap";g.getImagePaths=function(){var l={allowXLarge:true};
return{maskMap:this.getAssetURL("hero_rosegold_camera_alpha",l),normalMap:this.getAssetURL("hero_rosegold_camera_normals",l),matcapMap:this.getAssetURL("rosegold_camera_matcap",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};g.renderIntroProgressOffset=function(q){var p=this.introAnimationRanges[this.breakpointName].min,l=this.introAnimationRanges[this.breakpointName].max;
var n=(l-q)/(l-p);if(n<0){n=0}else{if(n>1){n=1}}var o=0,m=1;if(n<o){n=o}else{if(n>m){n=m
}}n=1-(n*(1/m));this._introOffsetProgress=n};g.render=function(){var q=this.context.distanceCalculator.parallaxOffsets.rosegold.y||0;
if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset(q)
}q=-q;var p=this.settings.scrollMin,l=this.settings.scrollMax;var n=(l-q)/(l-p);
if(n<0){n=0}else{if(n>1){n=1}}var o=this.settings.progressRangeMin,m=this.settings.progressRangeMax;
if(n<o){n=o}else{if(n>m){n=m}}if(typeof this._introOffsetProgress==="number"){n+=this._introOffsetProgress
}n=n*(1/m);n=(n*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
this.setProgress(n*2+this.settings.matcapOffset)};a.exports=c},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-object":554,"ac-viewport":791}],838:[function(b,a,d){var k=b("../../../../webgl/types/MaterialCapturePlayer"),h=b("../../../../webgl/shaders/shaders.json"),c=b("ac-object"),g=b("ac-viewport").Viewport;
var f;var j=function(n,l,o){this.context=n;this.useGLScale=false;var m=this.getSizeForBreakpoint();
this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:-1,matcapRangeMax:1,matcapOffset:0};
this.animationRanges={xlarge:{min:0,max:100},large:{min:0,max:100},medium:{min:0,max:100},small:{min:0,max:100}};
this.introAnimationRanges={xlarge:{min:0,max:1000},large:{min:0,max:1800},medium:{min:0,max:1400},small:{min:0,max:1200}};
k.call(this,n,{width:m,height:m,className:this.className,subpath:l.subpath});if(o){return
}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:h.vertex,fragmentShader:h["material-capture"]}
};f=j.prototype=c.create(k.prototype);f.sizes={xlarge:128,defaults:64};f.className="silver-touch-id-matcap";
f.composerPasses=0;f.getImagePaths=function(){var l={allowXLarge:true};return{maskMap:this.getAssetURL("hero_silver_touch_id_alpha",l),normalMap:this.getAssetURL("hero_silver_touch_id_normals",l),matcapMap:this.getAssetURL("silver_touch_id_matcap",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};f.renderIntroProgressOffset=function(q){var p=this.introAnimationRanges[this.breakpointName].min,l=this.introAnimationRanges[this.breakpointName].max;
var n=(l-q)/(l-p);if(n<0){n=0}else{if(n>1){n=1}}var o=0,m=1;if(n<o){n=o}else{if(n>m){n=m
}}n=1-(n*(1/m));this._introOffsetProgress=n};f.render=function(){var q=this.context.distanceCalculator.parallaxOffsets.silver.y||0;
if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset(q)
}var p=this.settings.scrollMin,l=this.settings.scrollMax;var n=(l-q)/(l-p);if(n<0){n=0
}else{if(n>1){n=1}}var o=this.settings.progressRangeMin,m=this.settings.progressRangeMax;
if(n<o){n=o}else{if(n>m){n=m}}if(this._introOffsetProgress){n+=this._introOffsetProgress
}n=n*(1/m);n=(n*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
this.setProgress(n+=this.settings.matcapOffset)};a.exports=j},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-object":554,"ac-viewport":791}],839:[function(b,a,d){var k=b("../../../../webgl/types/MaterialCapturePlayer"),j=b("../../../../webgl/shaders/shaders.json"),c=b("ac-object"),g=b("ac-viewport").Viewport;
var f;var h=function(n,l,o){this.context=n;this.settings={progressRangeMin:0,progressRangeMax:1,matcapRangeMin:0.11,matcapRangeMax:1};
this.animationRanges={xlarge:{min:0,max:0.2},large:{min:0,max:0.2},medium:{min:0,max:0.2},small:{min:0,max:0.2}};
this.introAnimationRanges={xlarge:{min:0,max:0.7},large:{min:0,max:0.85},medium:{min:0,max:0.7},small:{min:0,max:0.7}};
var m=this.getSizeForBreakpoint();k.call(this,n,{width:m,height:m,className:this.className,subpath:l.subpath});
if(o){return}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:j.vertex,fragmentShader:j["material-capture"]}
};f=h.prototype=c.create(k.prototype);f.sizes={xlarge:128,defaults:64};f.className="spacegray-button-matcap";
f.getImagePaths=function(){var l={allowXLarge:true};return{maskMap:this.getAssetURL("hero_spacegray_button_alpha",l),normalMap:this.getAssetURL("hero_spacegray_button_normals",l),matcapMap:this.getAssetURL("spacegray_buttons_matcap",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};f.renderIntroProgressOffset=function(){if(!this.context.introPlayer.positions.spacegray){return
}var o=this.context.introPlayer.positions.spacegray.progress;var n=this.introAnimationRanges[this.breakpointName].min,l=this.introAnimationRanges[this.breakpointName].max;
var m=o;if(m<n){m=n}else{if(m>l){m=l}}m=1-(l-m)/(l-n);this._introOffsetProgress=m
};f.render=function(){if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset()
}if(!this._introOffsetProgress){this._introOffsetProgress=1}var n=0,p=this.settings.progressRangeMin,m=this.settings.progressRangeMax;
if(this.context.parallaxHandler){var q=this.context.parallaxHandler.positions.spacegray.progress;
var o=this.settings.scrollMin,l=this.settings.scrollMax;n=(l-q)/(l-o);if(n<0){n=0
}else{if(n>1){n=1}}if(n<p){n=p}else{if(n>m){n=m}}}n=(n*(-1/m));if(typeof this._introOffsetProgress==="number"){n+=this._introOffsetProgress
}if(isNaN(n)){return}n=(n*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
this.setProgress(n-1)};a.exports=h},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-object":554,"ac-viewport":791}],840:[function(d,c,g){var l=d("../../../../webgl/types/MaterialCapturePlayer"),k=d("../../../../webgl/shaders/shaders.json"),f=d("ac-object"),b=d("ac-motion-emitter").MotionEmitter,j=d("ac-viewport").Viewport;
var h;var a=function(o,m,p){this.context=o;this._lastScrollPos=null;this._lastTimeInPxThreshold=null;
this._minFriction=5;this._maxFriction=40;this.settings={progressRangeMin:0,progressRangeMax:0.43,matcapRangeMin:-1,matcapRangeMax:1};
this.animationRanges={xlarge:{min:850,max:899},large:{min:612,max:651},medium:{min:490,max:519},small:{min:350,max:379}};
this.introAnimationRanges={xlarge:{min:this.animationRanges.xlarge.max,max:1800},large:{min:this.animationRanges.large.max,max:1800},medium:{min:this.animationRanges.medium.max,max:1400},small:{min:this.animationRanges.small.max,max:1200}};
var n=this.getSizeForBreakpoint();l.call(this,o,{width:n,height:n,className:this.className,subpath:m.subpath});
if(p){return}this.meshOptions={width:this.options.width,height:this.options.height,uniforms:this.getImageTextureUniforms(),vertexShader:k.vertex,fragmentShader:k["material-capture"]};
this.frictionEaser=new b({min:this._minFriction,max:this._maxFriction,clock:this.context.clock,friction:20});
this.frictionEaser.on("update",function(q){this.motionEmitter.friction=Math.round(q.progress)
}.bind(this));this.motionEmitter=new b({min:0,max:1,clock:this.context.clock,friction:5});
this.motionEmitter.on("draw",function(q){this.setProgress(q.progress)}.bind(this));
this.frictionEaser.start();this.motionEmitter.start();j.on("scroll",this._handleScrollDirectionChange.bind(this))
};h=a.prototype=f.create(l.prototype);h.composerPasses=0;h.className="spacegray-camera-matcap";
h.sizes={small:32,defaults:64};h.getImagePaths=function(){var m={allowXLarge:true};
return{maskMap:this.getAssetURL("hero_spacegray_camera_alpha",m),normalMap:this.getAssetURL("hero_spacegray_camera_normals",m),matcapMap:this.getAssetURL("spacegray_camera_matcap",{retina:false,extension:"jpg",ignoreBreakpoint:true})}
};h.renderIntroProgressOffset=function(r){var q=this.introAnimationRanges[this.breakpointName].min,m=this.introAnimationRanges[this.breakpointName].max;
var o=(m-r)/(m-q);if(o<0){o=0}else{if(o>1){o=1}}var p=0,n=1;if(o<p){o=p}else{if(o>n){o=n
}}o=1-(o*(1/n));this._introOffsetProgress=o};h.render=function(){var r=this.context.distanceCalculator.getDistance("spacegray","gold");
if(this.context.introPlayer&&!this.context.introComplete){this.renderIntroProgressOffset(r)
}var q=this.settings.scrollMin,m=this.settings.scrollMax;var o=(m-r)/(m-q);if(o<0){o=0
}else{if(o>1){o=1}}var p=this.settings.progressRangeMin,n=this.settings.progressRangeMax;
if(o<p){o=p}else{if(o>n){o=n}}if(this._introOffsetProgress){o-=this._introOffsetProgress
}o=o*(1/n);o=(o*(this.settings.matcapRangeMax-this.settings.matcapRangeMin))+this.settings.matcapRangeMin;
this.motionEmitter.setProgress(o)};h._handleScrollDirectionChange=function(){var o=j.scrollY(),n=100,m=Date.now();
if(!this._lastScrollPos){this._lastScrollPos=o}if(o>this._lastScrollPos&&o<n){this._lastTimeInPxThreshold=m
}if(o>this._lastScrollPos||m-this._lastTimeInPxThreshold<700){this.frictionEaser.setProgress(this._minFriction)
}else{this.frictionEaser.setProgress(this._maxFriction)}this._lastScrollPos=o};
c.exports=a},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/MaterialCapturePlayer":869,"ac-motion-emitter":547,"ac-object":554,"ac-viewport":791}],841:[function(d,b,g){var j=d("../../../../webgl/types/ShadowPassPlayer"),l=d("../../../../webgl/shaders/shaders.json"),k=d("ac-viewport").Viewport,f=d("ac-object");
var h;var a={xlarge:{width:1015,height:583},large:{width:738,height:424},medium:{width:587,height:337},small:{width:458,height:263}};
var c=function(o,n,p){this.context=o;this.setBreakpointName();this.setDimensions();
j.call(this,o,{width:this.dimensions.width,height:this.dimensions.height,className:this.className,subpath:n.subpath});
if(p){return}this.settings={scrollStart:0,scrollEnd:0.4,scrollXStart:0.4,scrollYStart:1.2,scrollDistanceX:0,scrollDistanceY:-1.3,distanceX:1,distanceY:1,dropOffX:0,dropOffY:0,rotate:0,bloom:1,feather:1,distanceBloom:0,distanceFeather:0,invert:true};
this.settings.rotate=this.settings.rotate*Math.PI/180;this.updateSettings();var m=this.getImageTextureUniforms();
m.maskCenter={type:"v3",value:new THREE.Vector3()};m.showPasses={type:"f",value:0};
m.bloom={type:"f",value:this.settings.bloom};m.feather={type:"f",value:this.settings.feather};
m.distanceX={type:"f",value:this.settings.distanceX};m.distanceY={type:"f",value:this.settings.distanceY};
m.dropOffX={type:"f",value:this.settings.dropOffX};m.dropOffY={type:"f",value:this.settings.dropOffY};
m.rotate={type:"f",value:this.settings.rotate};m.shadowMap.value.magFilter=m.shadowMap.value.minFilter=THREE.LinearFilter;
this.meshOptions={width:this.options.width,height:this.options.height,uniforms:m,vertexShader:l.vertex,fragmentShader:l["shadow-pass"]};
k.on("breakpoint",this.onBreakpoint.bind(this))};h=c.prototype=f.create(j.prototype);
h.cameraOptions={nearClip:1,farClip:5000,fov:45};h.className="rosegold-shadow-pass";
h.getImagePaths=function(){var m={extension:"jpg"};return{shadowMap:this.getAssetURL("hero_rosegold_s",m)}
};h.setBreakpointName=function(){this.breakpointName=k.getBreakpoint().name};h.setDimensions=function(){var m=this.breakpointName,n=a[m];
this.dimensions={width:n.width,height:n.height,left:-n.width/2,top:-n.height/2}
};h.updateSettings=function(){var m=this.breakpointName};h.render=function(){var o=0;
if(this.context.parallaxHandler){o=this.context.parallaxHandler.positions.rosegold.progress
}var q=this.settings.scrollStart;var n=this.settings.scrollEnd;var p=(n-o)/(n-q);
if(p<0){p=0}else{if(p>1){p=1}}if(this.settings.invert){p=1-p}var m=this.settings.scrollXStart+(p*this.settings.scrollDistanceX);
var s=this.settings.scrollYStart+(p*this.settings.scrollDistanceY);var r=this.settings.bloom+(p*this.settings.distanceBloom);
this.setMaskCenter(m,s);this.setBloom(r)};h.onBreakpoint=function(){this.setBreakpointName();
this.updateSettings();this.setDimensions();this.resizeTo(this.dimensions.width,this.dimensions.height)
};h.setMaskCenter=function(m,n){this.material.uniforms.maskCenter.value.x=m;this.material.uniforms.maskCenter.value.y=n
};h.setBloom=function(m){this.material.uniforms.bloom.value=m};b.exports=c},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/ShadowPassPlayer":871,"ac-object":554,"ac-viewport":791}],842:[function(c,b,f){var h=c("../../../../webgl/types/ShadowPassPlayer"),l=c("../../../../webgl/shaders/shaders.json"),k=c("ac-viewport").Viewport,d=c("ac-object");
var g;var a={xlarge:{width:759,height:977},large:{width:552,height:711},medium:{width:440,height:566},small:{width:342,height:441}};
var j=function(o,n,p){this.context=o;this.setBreakpointName();this.setDimensions();
h.call(this,o,{width:this.dimensions.width,height:this.dimensions.height,className:this.className,subpath:n.subpath});
if(p){return}this.settings={scrollStart:0,scrollEnd:1,scrollXStart:0.4,scrollYStart:1,scrollDistanceX:0,scrollDistanceY:-0.65,distanceX:0.1,distanceY:3.5,dropOffX:0,dropOffY:0,rotate:0,bloom:0.7,feather:1,distanceBloom:0,distanceFeather:0,invert:true};
this.settings.rotate=this.settings.rotate*Math.PI/180;this.updateSettings();var m=this.getImageTextureUniforms();
m.maskCenter={type:"v3",value:new THREE.Vector3()};m.showPasses={type:"f",value:0};
m.bloom={type:"f",value:this.settings.bloom};m.feather={type:"f",value:this.settings.feather};
m.distanceX={type:"f",value:this.settings.distanceX};m.distanceY={type:"f",value:this.settings.distanceY};
m.dropOffX={type:"f",value:this.settings.dropOffX};m.dropOffY={type:"f",value:this.settings.dropOffY};
m.rotate={type:"f",value:this.settings.rotate};m.shadowMap.value.magFilter=m.shadowMap.value.minFilter=THREE.LinearFilter;
this.meshOptions={width:this.options.width,height:this.options.height,uniforms:m,vertexShader:l.vertex,fragmentShader:l["shadow-pass"]};
k.on("breakpoint",this.onBreakpoint.bind(this))};g=j.prototype=d.create(h.prototype);
g.cameraOptions={nearClip:1,farClip:5000,fov:45};g.className="silver-shadow-pass";
g.getImagePaths=function(){var m={extension:"jpg"};if(!this.context.supportsMasking){m.extension="png"
}return{shadowMap:this.getAssetURL("hero_silver_s",m)}};g.setBreakpointName=function(){this.breakpointName=k.getBreakpoint().name
};g.setDimensions=function(){var m=this.breakpointName,n=a[m];this.dimensions={width:n.width,height:n.height,left:-n.width/2,top:-n.height/2}
};g.updateSettings=function(){var m=this.breakpointName};g.render=function(){var o=0;
if(this.context.parallaxHandler){o=this.context.parallaxHandler.positions.silver.progress
}var q=this.settings.scrollStart;var n=this.settings.scrollEnd;var p=(n-o)/(n-q);
if(p<0){p=0}else{if(p>1){p=1}}if(this.settings.invert){p=1-p}var m=this.settings.scrollXStart+(p*this.settings.scrollDistanceX);
var s=this.settings.scrollYStart+(p*this.settings.scrollDistanceY);var r=this.settings.bloom+(p*this.settings.distanceBloom);
this.setMaskCenter(m,s);this.setBloom(r)};g.onBreakpoint=function(){this.setBreakpointName();
this.updateSettings();this.setDimensions();this.resizeTo(this.dimensions.width,this.dimensions.height)
};g.setMaskCenter=function(m,n){this.material.uniforms.maskCenter.value.x=m;this.material.uniforms.maskCenter.value.y=n
};g.setBloom=function(m){this.material.uniforms.bloom.value=m};b.exports=j},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/ShadowPassPlayer":871,"ac-object":554,"ac-viewport":791}],843:[function(c,b,g){var k=c("../../../../webgl/types/ShadowPassPlayer"),n=c("../../../../webgl/shaders/shaders.json"),l=c("ac-viewport").Viewport,f=c("ac-easing"),d=c("ac-object");
var a={xlarge:{width:1148,height:442},large:{width:835,height:322},medium:{width:665,height:256},small:{width:518,height:199}};
var j={xlarge:{scrollMin:895,scrollMax:899},large:{scrollMin:642,scrollMax:651},medium:{scrollMin:513,scrollMax:519},small:{scrollMin:393,scrollMax:405}};
var h;var m=function(q,p,r){this.context=q;this.setBreakpointName();this.setDimensions();
k.call(this,q,{width:this.dimensions.width,height:this.dimensions.height,className:this.className,subpath:p.subpath});
if(r){return}this.settings={introStart:0,introEnd:1,introXStart:-1.47,introYStart:0.67,scrollStart:0,scrollEnd:0.5,scrollXStart:0,scrollYStart:0,dropOffX:0,dropOffY:0,introDistanceX:1,introDistanceY:-0.01,scrollDistanceX:0,scrollDistanceY:0,distanceX:2.6,distanceY:1,rotate:1.2,bloom:0.7,distanceBloom:-1,feather:1,distanceFeather:1,invert:true};
this.settings.rotate=this.settings.rotate*Math.PI/180;this.easing=f.createBezier(0.1,0.48,0.475,1);
this._lastIntroProgress=null;this.updateSettings();var o=this.getImageTextureUniforms();
o.maskCenter={type:"v3",value:new THREE.Vector3()};o.showPasses={type:"f",value:0};
o.bloom={type:"f",value:this.settings.bloom};o.feather={type:"f",value:this.settings.feather};
o.distanceX={type:"f",value:this.settings.distanceX};o.distanceY={type:"f",value:this.settings.distanceY};
o.dropOffX={type:"f",value:this.settings.dropOffX};o.dropOffY={type:"f",value:this.settings.dropOffY};
o.rotate={type:"f",value:this.settings.rotate};o.shadowMap.value.magFilter=o.shadowMap.value.minFilter=THREE.LinearFilter;
this.meshOptions={width:this.options.width,height:this.options.height,uniforms:o,vertexShader:n.vertex,fragmentShader:n["shadow-pass"]};
l.on("breakpoint",this.onBreakpoint.bind(this))};h=m.prototype=d.create(k.prototype);
h.cameraOptions={nearClip:1,farClip:5000,fov:45};h.className="spacegray-shadow-pass";
h.setBreakpointName=function(){this.breakpointName=l.getBreakpoint().name};h.setDimensions=function(){var o=this.breakpointName,p=a[o];
this.dimensions={width:p.width,height:p.height,left:-p.width/2,top:-p.height/2}
};h.getImagePaths=function(){var o={extension:"jpg"};return{shadowMap:this.getAssetURL("hero_spacegray_s",o)}
};h.updateSettings=function(){var o=this.breakpointName;this.settings.scrollMin=j[o].scrollMin;
this.settings.scrollMax=j[o].scrollMax};h.render=function(){if(this.context.introPlayer&&!this.context.introComplete){this.handleIntroShadow()
}else{var v=1;if(typeof this._lastIntroProgress==="number"){v=this._lastIntroProgress
}this.handleIntroShadow(v)}var r=this.settings.scrollStart,p=this.settings.scrollEnd;
var u=0;if(this.context.parallaxHandler){u=this.context.parallaxHandler.positions.spacegray.progress
}var q=(p-u)/(p-r);if(q<0){q=0}else{if(q>1){q=1}}if(this.settings.invert){q=1-q
}var o=this.settings.scrollXStart+(q*this.settings.scrollDistanceX);var t=this.settings.scrollYStart+(q*this.settings.scrollDistanceY);
var s=this.settings.bloom+(q*this.settings.distanceBloom);if(this._introX){o+=this._introX
}if(this._introY){t+=this._introY}this.setMaskCenter(o,t);this.setBloom(s)};h.handleIntroShadow=function(u){var s=0,p=this.settings.introEnd,r=this.settings.introStart;
if(this.context.introPlayer&&this.context.introPlayer.positions&&this.context.introPlayer.positions.spacegray){s=this.context.introPlayer.positions.spacegray.progress
}if(typeof u==="number"){s=u}var q=(p-s)/(p-r);if(q<0){q=0}else{if(q>1){q=1}}if(this.settings.invert){q=1-q
}if(q<1){q=this.easing.getValue(q)}var o=this.settings.introXStart+(q*this.settings.introDistanceX);
var t=this.settings.introYStart+(q*this.settings.introDistanceY);this._introX=o;
this._introY=t;this._lastIntroProgress=q};h.onBreakpoint=function(){this.setBreakpointName();
this.updateSettings();this.setDimensions();this.resizeTo(this.dimensions.width,this.dimensions.height)
};h.setMaskCenter=function(o,p){this.material.uniforms.maskCenter.value.x=o;this.material.uniforms.maskCenter.value.y=p
};h.setBloom=function(o){this.material.uniforms.bloom.value=o};b.exports=m},{"../../../../webgl/shaders/shaders.json":867,"../../../../webgl/types/ShadowPassPlayer":871,"ac-easing":387,"ac-object":554,"ac-viewport":791}],844:[function(j,a,w){j("ac-polyfills/Object/create");
var k=j("ac-console").log;var b=j("ac-dom-metrics");var m=j("ac-dom-styles");var n=j("ac-dom-traversal");
var l=j("../../utils/BrowserPrefixed");var s=j("ac-scroll-motion-emitter").ElementScrollMotionEmitter;
var r=j("ac-viewport").Viewport;var p=j("ac-easing").createPredefined;var v=j("ac-browser");
var c=(j("ac-feature").isTablet()||j("ac-feature").isHandheld());var d=!c&&j("../../utils/animationCapable");
var g=j("ac-motion-emitter").MotionEmitter;var h=j("ac-graph");var u=j("../../sharedsections/BaseSection");
var q=u.prototype;var t=j("../../utils/mathutils");function f(A,z,y){var x=this;
this.name="PinAndScaleSection";u.call(this,A,z,y);this._initLineGraphs();if(!d||this.breakpoint=="small"){this.element.classList.add("static")
}this.pinned=false;this.swap={large:350,medium:380};this.scaleMin={large:0.75,medium:0.6};
this.scaleMax={large:1,medium:1};this.pinAndScaleWrapperEl=n.querySelector("#pin-and-scale-wrapper",this.element);
this.pinnedContentEl=n.querySelector(".pinned-content",this.element);this.deviceEl=n.querySelector(".device-a9-m9",this.element);
this.a9=n.querySelector(".image-a9-inside",this.element);this.m9=n.querySelector(".image-m9-inside",this.element);
this._initMetrics();this._initMotionEmitter();this._setStyle();this.rafWhenVisible=true
}var o=f.prototype=Object.create(u.prototype);f.prototype.constructor=f;o._initMotionEmitter=function(){this.motionEmitter=new g({min:0,max:1});
if(d&&this.viewport!="small"){this.motionEmitter.start()}};o._initMetrics=function(){this.windowHeight=r.clientHeight();
this.windowWidth=r.clientWidth();this.pin=(this.windowHeight>1000)?400:150;this.sectionTop=b.getPagePosition(this.element).top;
this.sectionHeight=b.getDimensions(this.element).height;this.deviceTop=b.getPagePosition(this.pinnedContentEl).top;
this.deviceRight=this.windowWidth-b.getPagePosition(this.deviceEl).right;this.breakpoint=r.getBreakpoint().name;
if(this.breakpoint=="xlarge"){this.breakpoint="large"}this.pinStart=this.deviceTop-this.pin;
this.pinEnd=this.sectionTop+this.sectionHeight-this.windowHeight;this.unPinnedTop=this.sectionHeight-(this.deviceTop-this.sectionTop)-this.windowHeight+this.pin;
this.cpuGraphScrollThreshold=b.getPagePosition(this.cpuGraphEl).top-this.windowHeight+b.getDimensions(this.cpuGraphEl).height;
this.gpuGraphScrollThreshold=b.getPagePosition(this.gpuGraphEl).top-this.windowHeight+b.getDimensions(this.gpuGraphEl).height
};o._initLineGraphs=function(){this.cpuGraphEl=document.getElementById("graph-cpu-performance");
this.gpuGraphEl=document.getElementById("graph-gpu-performance");this.cpuGraph=new h.CurvedLine(this.cpuGraphEl,{graphData:[0.088,0.095,0.1,0.12,0.18,0.28,0.5,0.8,1],duration:1.5,spline:{lineWidth:4,colorStart:"#96c951",colorEnd:"#038aca",tension:0.5},splineDots:{show:"all",draw:"play",fillColor:"matchSpline",size:7},verticalRule:{color:"#f2f2f2",lineWidth:1,lineLength:"toSpline"},xAxis:{show:true,draw:"play",lineWidth:1,color:"#d6d6d6"},xDots:{show:true}});
this.gpuGraph=new h.CurvedLine(this.gpuGraphEl,{graphData:[0.088,0.095,0.1,0.12,0.18,0.28,0.44,0.65,1],duration:1.5,spline:{lineWidth:4,colorStart:"#fcde38",colorEnd:"#ef582b",tension:0.5},splineDots:{show:"all",draw:"play",fillColor:"matchSpline",size:7},verticalRule:{color:"#f2f2f2",lineWidth:1,lineLength:"toSpline"},xAxis:{show:true,draw:"play",lineWidth:1,color:"#d6d6d6"},xDots:{show:true}})
};o.setupEvents=function(){window.motionEmitter=this.motionEmitter;this.motionEmitter.on("draw",this.scaleDevice.bind(this))
};o.teardownEvents=function(){q.teardownEvents.call(this)};o.activate=function(){q.activate.call(this)
};o.deactivate=function(){q.deactivate.call(this)};o.animateIn=function(){q.animateIn.call(this)
};o._setStyle=function(){if(!d||this.breakpoint=="small"){return}var x=t.map(this.scroll,this.pinStart,this.pinEnd,0,1);
var B=Math.min(x*2.5,1);var y=(x>=0&&x<=1);var A=(x>1);var z=(x>0.6);if(y&&!this.pinned){this.pinned=true;
this.deviceEl.classList.add("pinned");this.deviceEl.style.top=this.pin+"px";this.deviceEl.style.right=this.deviceRight+"px"
}else{if(!y&&this.pinned){this.pinned=false;this.deviceEl.classList.remove("pinned");
this.deviceEl.style.top="auto";this.deviceEl.style.right=0}}if(z&&!this.logoAnimated){this.logoAnimated=true;
this.deviceEl.classList.add("show-m9-logo")}else{if(!z){this.logoAnimated=false;
this.deviceEl.classList.remove("show-m9-logo")}}var C=t.clamp(B,0,1);if(isNaN(C)){C=0
}this.motionEmitter.setProgress(C);if(A&&!this.unpinned){this.motionEmitter.setProgress(1);
this.motionEmitter.trigger("draw",{progress:1});this.unpinned=true;this.deviceEl.style.top=this.unPinnedTop+"px"
}else{if(!A&&this.unpinned){this.unpinned=false}}};o._checkToPlayGraphs=function(){if(this.scroll>this.cpuGraphScrollThreshold&&!this.cpuGraphHasPlayed){this.cpuGraphHasPlayed=true;
this.cpuGraph.play();this.cpuGraphEl.classList.add("animate")}if(this.scroll>this.gpuGraphScrollThreshold&&!this.gpuGraphHasPlayed){this.gpuGraphHasPlayed=true;
this.gpuGraph.play();this.gpuGraphEl.classList.add("animate")}};o._removeStyle=function(){this.pinned=false;
this.unpinned=false;this.logoAnimated=false;this.deviceEl.classList.remove("pinned");
this.deviceEl.classList.remove("show-m9-logo");this.deviceEl.style.top="auto";this.deviceEl.style.right=0;
this.deviceEl.style[l.transform]=""};o.scaleDevice=function(x){var y=t.map(x.progress,0,1,this.scaleMin[this.breakpoint],this.scaleMax[this.breakpoint]);
this.deviceEl.style[l.transform]="scale("+y+","+y+") translate3d(0,0,0)"};o.onRequestAnimationFrame=function(){q.onRequestAnimationFrame.call(this);
this.scroll=r.scrollY();this._checkToPlayGraphs();if(!d||this.breakpoint=="small"){return
}this._setStyle()};o.onScroll=function(z,y,x){q.onScroll.call(this,z,y,x)};o.onResize=function(z,y,x){q.onResize.call(this,z,y,x);
this._removeStyle();this._initMetrics();this._setStyle()};o.onBreakpoint=function(z,A,y,x){this.breakpoint=r.getBreakpoint().name;
this.motionEmitter.stop();if(this.breakpoint=="xlarge"){this.breakpoint="large"
}if(this.breakpoint=="small"||!d){this._removeStyle()}else{this.motionEmitter.start()
}this._initMetrics();this._setStyle()};o.onViewWillAppear=function(y,x){q.onViewWillAppear.call(this,y,x)
};o.onViewWillDisappear=function(y,x){this._removeStyle();q.onViewWillDisappear.call(this,y,x)
};o.destroy=function(){q.destroy.call(this)};a.exports=f},{"../../sharedsections/BaseSection":852,"../../utils/BrowserPrefixed":862,"../../utils/animationCapable":863,"../../utils/mathutils":866,"ac-browser":261,"ac-console":291,"ac-dom-metrics":323,"ac-dom-styles":354,"ac-dom-traversal":372,"ac-easing":387,"ac-feature":491,"ac-graph":542,"ac-motion-emitter":547,"ac-polyfills/Object/create":569,"ac-scroll-motion-emitter":643,"ac-viewport":791}],845:[function(f,a,t){f("ac-polyfills/Object/create");
var q=f("ac-dom-metrics");var r=f("../../engagementAnimation/EngagementAnimation");
var k=f("../../scrollAnimation/ScrollAnimation");var l=f("ac-dom-traversal/querySelectorAll");
var b=f("ac-dom-traversal/querySelector");var d=f("../../gallery/TextFadeGallery");
var m=f("ac-element-engagement").ElementEngagement;var h=f("@marcom/ac-gallery").FadeGallery;
var p=f("ac-classlist");var o=f("ac-viewport").Viewport;var c=f("../../utils/animationCapable");
var s=f("../../sharedsections/BaseSection");var n=s.prototype;function g(x,w,v){var u=this;
this.name="ThreeDTouchSection";s.call(this,x,w,v);if(!c){x.classList.add("static")
}this.breakpoint=o.getBreakpoint().name;if(this.breakpoint==="xlarge"){this.breakpoint="large"
}this.emitterEls=l("[data-scroll-emitter]",this.element);this.scrollAnimationEls=l("[data-scroll-animation]",this.element);
this.animationEls=l("[data-animate-in]",this.element);this.galleryEl=b(".ac-gallery");
this._initialize();this.rafWhenVisible=true}var j=g.prototype=Object.create(s.prototype);
g.prototype.constructor=g;j._initialize=function(){var u=this;this.scrollAnimations=[];
this.engagementAnimations=[];if(this.scrollAnimations.length==0&&c){this.emitterEls.forEach(function(v){u.scrollAnimations.push(new k(v))
})}else{if(!c){this.scrollAnimationEls.forEach(function(v){v.classList.add("show")
})}}if(this.breakpoint==="small"){this.gallery=new d(this.galleryEl,{keyboard:false});
return}if(!this._animationElementTracker){this._animationElementTracker=new m()
}this.animationEls.forEach(function(w,v){u.engagementAnimations[v]=new r(w,u.breakpoint,{elementEngagement:u._animationElementTracker})
})};j.setupEvents=function(){this.scrollAnimations.forEach(function(u){u.setupEvents()
})};j.teardownEvents=function(){this.scrollAnimations.forEach(function(u){u.teardownEvents()
});n.teardownEvents.call(this)};j.activate=function(){n.activate.call(this)};j.deactivate=function(){n.deactivate.call(this)
};j.animateIn=function(){n.animateIn.call(this)};j.onRequestAnimationFrame=function(){n.onRequestAnimationFrame.call(this)
};j.onScroll=function(w,v,u){n.onScroll.call(this,w,v,u);if(!c){return}this.scrollAnimations.forEach(function(x){x.handleScroll()
})};j.onResize=function(w,v,u){n.onResize.call(this,w,v,u)};j.onBreakpoint=function(x,y,w,u){this.breakpoint=x.name;
if(x.name=="xlarge"||y.name=="xlarge"){return}var v=this;setTimeout(function(){v._destroy();
v._initialize();v.scrollAnimations.forEach(function(z){z.setupEvents()});v.scrollAnimations.forEach(function(z){z.setScale(x.name)
});v.engagementAnimations.forEach(function(A,z){A.updateAnimationOnBreakpoint(x.name)
})},0)};j.onViewWillAppear=function(v,u){n.onViewWillAppear.call(this,v,u);if(this._animationElementTracker){this._animationElementTracker.start()
}};j.onViewWillDisappear=function(v,u){n.onViewWillDisappear.call(this,v,u)};j._destroy=function(){if(this.gallery){this.gallery.galleryContentElements.forEach(function(u){p.remove(u,"ac-gallery-previousitem")
});this.gallery.teardownEvents();this.gallery.destroy()}this.gallery=null;if(this.engagementAnimations){this.engagementAnimations.forEach(function(v,u){if(typeof v.destroy==="function"){v.destroy()
}v.trackedEl.el.removeAttribute("style")});this.engagementAnimations=null}if(this.scrollAnimations){this.scrollAnimations.forEach(function(u){u.teardownEvents();
u.destroy();u=null})}};j.destroy=function(){n.destroy.call(this);this._destroy()
};a.exports=g},{"../../engagementAnimation/EngagementAnimation":800,"../../gallery/TextFadeGallery":802,"../../scrollAnimation/ScrollAnimation":850,"../../sharedsections/BaseSection":852,"../../utils/animationCapable":863,"@marcom/ac-gallery":245,"ac-classlist":272,"ac-dom-metrics":323,"ac-dom-traversal/querySelector":381,"ac-dom-traversal/querySelectorAll":382,"ac-element-engagement":406,"ac-polyfills/Object/create":569,"ac-viewport":791}],846:[function(b,c,a){var d=b("ac-dom-traversal");
var j=b("ac-dom-metrics");var h=b("ac-viewport").Viewport;var g=function(k){this.element=k;
this._imageContainerEl=d.querySelector(".panorama-image",this.element);this._wrapperEl=d.querySelector(".panorama-image-wrapper",this.element);
this.centerScrollPosition()};var f=g.prototype;f.centerScrollPosition=function(){this._wrapperEl.scrollLeft=(this._wrapperEl.scrollWidth-h.innerWidth())/2
};c.exports=g},{"ac-dom-metrics":323,"ac-dom-traversal":372,"ac-viewport":791}],847:[function(c,a,d){var h=c("ac-dom-events");
var g=c("ac-dom-traversal");var l=c("ac-classlist");var j=c("ac-viewport").Viewport;
var b=c("../utils/BrowserPrefixed");function k(m){this.cursorEl=g.querySelector(".cursor");
this._controller=m;this.offset={x:Math.round(this.cursorEl.offsetLeft+this.cursorEl.clientWidth/2),y:Math.round(this.cursorEl.offsetTop+this.cursorEl.clientHeight/2)};
this.mouse={x:0,y:0};this.mousePanorama={x:0,y:0};this.isOverPanorama=false;this._boundOnMouseMove=this.onMouseMoveDocument.bind(this);
h.addEventListener(document.body,"mousemove",this._boundOnMouseMove,false)}var f=k.prototype;
f.onMouseMoveDocument=function(m){m.preventDefault();this.mouse.x=m.pageX+this.offset.x;
this.mouse.y=m.pageY-this.offset.y;this.cursorEl.style[b.transform]="translate("+this.mouse.x+"px, "+this.mouse.y+"px)"
};f.onMouseMovePanorama=function(m){if(m){m.preventDefault()}this.mousePanorama.x=this.map(m.clientX,0,j.innerWidth(),1,-1);
this.mousePanorama.y=m.clientY};f.onMouseOverPanorama=function(m){if(m){m.preventDefault()
}if(!this.isOverPanorama){this.isOverPanorama=true;l.add(this.cursorEl,"active")
}};f.onMouseOutPanorama=function(m){if(m){m.preventDefault()}if(this.isOverPanorama){this.isOverPanorama=false;
l.remove(this.cursorEl,"active")}};f.lerp=function(n,o,m){return o+(m-o)*n};f.map=function(q,p,n,o,m){return this.lerp(this.norm(q,p,n),o,m)
};f.norm=function(o,n,m){return(o-n)/(m-n)};f.setZoomIn=function(){l.remove(this.cursorEl,"out")
};f.setZoomOut=function(){l.add(this.cursorEl,"out")};f.hideZoom=function(){l.add(this.cursorEl,"hidden")
};f.showZoom=function(){l.remove(this.cursorEl,"hidden")};f.applyIECompatability=function(){h.removeEventListener(document.body,"mousemove",this._boundOnMouseMove);
this.cursorEl.style.visibility="hidden";this.onMouseMoveDocument=this._boundOnMouseMove=this.setZoomIn=this.setZoomOut=this.hideZoom=this.showZoom=function(){}
};a.exports=k},{"../utils/BrowserPrefixed":862,"ac-classlist":272,"ac-dom-events":299,"ac-dom-traversal":372,"ac-viewport":791}],848:[function(c,b,d){var l=c("ac-dom-traversal");
var r=c("ac-classlist");var m=c("ac-dom-events");var j=c("ac-browser");var o=c("ac-dom-styles");
var n=c("ac-viewport").Viewport;var a=(c("ac-feature").isTablet()||c("ac-feature").isHandheld());
var k=c("ac-clip").Clip;var g=c("./SinglePanorama");var p=c("./InlinePanorama");
var q=c("./PanoramaCursor");function h(s){this._options=s;this._zoomPanoramas=[];
this._inlinePanoramas=[];this._containerEl=document.getElementById("main");this._containerChildrenEl=l.children(this._containerEl);
this._currentPanorama=null;this.cursor=null;this.scrollBarWidth=c("../utils/getScrollBarWidth")();
this.setBreakpoint();this._createSinglePanoramas();if(!a&&!j.IE){this._initCursor();
this._setupEvents()}}var f=h.prototype;f._createSinglePanoramas=function(){var v=l.querySelectorAll(".panorama");
var w=this._containerChildrenEl;for(var t=0;t<v.length;t++){var u=v[t];if(!a&&!j.IE){var x=new g(u,this);
x.setupSiblings(w);this._zoomPanoramas.push(x)}else{var s=new p(u);this._inlinePanoramas.push(s)
}}};f._initCursor=function(){this.cursor=new q(this)};f._setupEvents=function(){var s=this;
this.boundOnResize=this.onResize.bind(this);this._boundOnPanoramaZoomed=this.onPanoramaZoomed.bind(this);
window.addEventListener("keydown",function(t){if(t.keyCode===27){t.preventDefault();
t.stopPropagation();if(s._currentPanorama){s._currentPanorama.close()}}})};f.setBreakpoint=function(s){if(s){this.breakpoint=s
}else{this.breakpoint=n.getBreakpoint().name}};f.onPanoramaScroll=function(v){var s=this;
if(v!=this._currentPanorama&&this._currentPanorama!=null){this._currentPanorama.close();
return}this._currentPanorama=v;for(var t=0;t<this._containerChildrenEl.length;t++){var u=this._containerChildrenEl[t];
if(u==v.element){continue}u.classList.add("fade-out")}r.add(v.siblingElPrev,"slide-up");
r.add(v.siblingElNext,"slide-down");document.body.classList.add("no-scroll");l.querySelector("#main").style.overflow="visible";
document.body.style["padding-right"]=this.scrollBarWidth+"px";this.showCloseButton();
this.cursor.setZoomOut();this.animateScrollTo(this._currentPanorama.getScrollOffset(),this._boundOnPanoramaZoomed)
};f.onPanoramaZoomed=function(){this._currentPanorama.boundBeginZoom();this.cursor.showZoom()
};f.showCloseButton=function(){if(!a&&!j.IE){return}};f.onPanoramaClosed=function(u){for(var s=0;
s<this._containerChildrenEl.length;s++){var t=this._containerChildrenEl[s];if(t==this.element){continue
}r.remove(t,"fade-out")}r.remove(u.siblingElPrev,"slide-up");r.remove(u.siblingElNext,"slide-down");
r.remove(document.body,"no-scroll");document.body.style["padding-right"]=0;this._currentPanorama=null;
this.cursor.setZoomIn()};f.onResize=function(s){if(this._currentPanorama!=null&&this._currentPanorama.state===g.STATE.ZOOMED){this._currentPanorama.close()
}this._zoomPanoramas.forEach(function(t){t.initMetrics()})};f.animateScrollTo=function(w,s){var v=n.scrollY();
var u=(Math.abs(w-v)/600)*1.2;this.cursor.hideZoom();var t={x:n.scrollX(),y:v};
new k(t,u,{y:w},{ease:"easeInOutCubic",onUpdate:function(){window.scrollTo(t.x,t.y)
},onComplete:s}).play()};b.exports=h},{"../utils/getScrollBarWidth":864,"./InlinePanorama":846,"./PanoramaCursor":847,"./SinglePanorama":849,"ac-browser":261,"ac-classlist":272,"ac-clip":281,"ac-dom-events":299,"ac-dom-styles":354,"ac-dom-traversal":372,"ac-feature":491,"ac-viewport":791}],849:[function(d,b,f){var m=d("ac-dom-events");
var l=d("ac-dom-traversal");var o=d("ac-dom-styles");var n=d("ac-viewport").Viewport;
var c=d("../utils/BrowserPrefixed");var a=d("ac-dom-metrics");var j=d("ac-eclipse").Clip;
var k=0.07;function h(q,p){this.element=q;this._controller=p;this._aspectRatio=958/3200;
this._imageContainerEl=l.querySelector(".panorama-image",this.element);this._wrapperEl=l.querySelector(".panorama-image-wrapper",this.element);
this._imageContainerEl.style.cursor="none";this._image=null;this.siblingElPrev=null;
this.siblingElNext=null;this.state=h.STATE.CLOSED;this._scale=1;this._tx=0;this._zoomClipProgress=0;
this._imageDimensions=a.getDimensions(this._imageContainerEl);this._hasLoadedZoomedImage=false;
this._doNotLoadZoomedImage=false;this.initMetrics();this._setupZoomImageURLs();
this._bindEvents();this._setupEvents()}h.STATE={ZOOMED:1,CLOSED:2};var g=h.prototype;
g.setupSiblings=function(p){var q=p.indexOf(this.element);if(q===-1){throw new Error("SinglePanorama - Section not in sibling collection.")
}if(q!=0){this.siblingElPrev=p[q-1]}if(q!==p.length-1){this.siblingElNext=p[q+1]
}};g.destroy=function(){this._controller=null;this.teardownEvents()};g._bindEvents=function(){this._boundOnMouseOver=this.onMouseOver.bind(this);
this._boundOnMouseMove=this.onMouseMove.bind(this);this._boundOnMouseMoveAfterZoomOut=this.onMouseMoveAfterZoomOut.bind(this);
this._boundOnClick=this.onMouseClick.bind(this);this._boundOnMouseOut=this.onMouseOut.bind(this);
this._boundOnTouchMove=this.onTouchMove.bind(this);this._boundOnTouchStart=this.onTouchStart.bind(this);
this._boundOnImageLoaded=this.onImageLoaded.bind(this);this._boundRaf=this.onRequestAnimationFrame.bind(this);
this.boundBeginZoom=this.beginZoom.bind(this)};g.initMetrics=function(){this.windowWidth=n.clientWidth();
this.windowHeight=n.clientHeight();this.imgContainerWidth=a.getDimensions(this._imageContainerEl).width;
this.imageContainerHeight=this.imgContainerWidth*this._aspectRatio;this.scaleTarget=this.windowHeight*1.05/this.imageContainerHeight
};g._setupZoomImageURLs=function(){var p=o.getStyle(this._imageContainerEl,["backgroundImage"]).backgroundImage;
this._imageSrcRegular=p.match(/\((.*?)\)/)[1].replace(/('|")/g,"");this._imageSrcZoom=this._imageSrcRegular.replace(/_small|_medium|_large/g,"_zoom");
if(this._imageSrcZoom.indexOf("_2x")>-1){this._imageSrcZoom=this._imageSrcZoom.replace("_2x","")
}};g._loadZoomImage=function(){if(this._doNotLoadZoomedImage){return}if(this._image!=null){if(this._image.parentNode!==null){this._image.parentNode.removeChild(this._image);
this._image.removeEventListener("load",this._boundOnImageLoaded)}this._image=null
}this._image=new Image();this._image.addEventListener("load",this._boundOnImageLoaded);
this._image.src=this._imageSrcZoom;this._image.classList.add("zoom")};g.onImageLoaded=function(p){this._image.removeEventListener("load",this._boundOnImageLoaded);
if(this.state==h.STATE.ZOOMED){this._imageContainerEl.appendChild(this._image);
o.setStyle(this._imageContainerEl,{backgroundImage:"none"});this._hasLoadedZoomedImage=true
}};g._setupEvents=function(){m.addEventListener(this._imageContainerEl,"mouseover",this._boundOnMouseOver);
m.addEventListener(this.element,"click",this._boundOnClick);m.addEventListener(this.element,"mousemove",this._boundOnMouseMove);
m.addEventListener(this._imageContainerEl,"mouseout",this._boundOnMouseOut)};g.teardownEvents=function(){m.removeEventListener(this._imageContainerEl,"mouseover",this._boundOnMouseOver);
m.removeEventListener(this.element,"click",this._boundOnClick);m.removeEventListener(this.element,"mousemove",this._boundOnMouseMove);
m.removeEventListener(this._imageContainerEl,"mouseout",this._boundOnMouseOut)};
g.onMouseOver=function(p){this._controller.cursor.onMouseOverPanorama(p)};g.onMouseMove=function(p){this._controller.cursor.onMouseMovePanorama(p)
};g.onMouseMoveAfterZoomOut=function(p){this._imageContainerEl.style.cursor="none";
m.removeEventListener(this.element,"mousemove",this._boundOnMouseMoveAfterZoomOut)
};g.onTouchStart=function(p){this.touchStartCoor=[p.touches[0].clientX,p.touches[0].clientY]
};g.onTouchMove=function(q){var r=this._calcDistance(this.touchStartCoor,[q.touches[0].clientX,q.touches[0].clientY]);
var p=this;if(r>30){window.clearTimeout(this.touchTimeout);m.removeEventListener(this.element,this.clickEvent,this._boundOnClick);
this.touchTimeout=setTimeout(function(){m.addEventListener(p.element,p.clickEvent,p._boundOnClick)
},200)}};g.onMouseClick=function(p){m.stop(p);p.stopImmediatePropagation();if(this.state==h.STATE.CLOSED){this.beginScroll()
}else{if(this.state==h.STATE.ZOOMED&&this._zoomClipProgress==1){this.close(null)
}}};g.onMouseOut=function(p){this._controller.cursor.onMouseOutPanorama(p)};g.beginScroll=function(){this.state=h.STATE.ZOOMED;
this._controller.onPanoramaScroll(this)};g.beginZoom=function(){var p=this;this._imageContainerEl.style[c.transition]="none";
this._wrapperEl.style[c.transition]="none";this.element.classList.add("zoom");var q={transform:{scale:this.scaleTarget}};
this.zoomClip=new j(this._imageContainerEl,1.3,q,{ease:"easeOutCubic",onUpdate:function(r){p._zoomClipProgress=r.progress
},onComplete:function(){p._loadZoomImage()},destroyOnComplete:true}).play();requestAnimationFrame(this._boundRaf)
};g.close=function(p){this.state=h.STATE.CLOSED;this._controller.onPanoramaClosed(this);
this.element.classList.remove("zoom");this._imageContainerEl.style[c.transition]="opacity 1s, "+c.transform+" 0.8s";
this._imageContainerEl.style[c.transform]="scale(1,1) translate3d(0,0,0)";this._wrapperEl.style[c.transition]=c.transform+" 0.8s";
this._wrapperEl.style[c.transform]="none";o.setStyle(this._imageContainerEl,{backgroundImage:"url("+this._imageSrcRegular+")"});
if(this._image!==null){this._imageContainerEl.removeChild(this._image);this._image=null
}this._zoomClipProgress=0;this._tx=0;this._hasLoadedZoomedImage=false;this.onMouseOut();
this._imageContainerEl.style.cursor="auto";m.addEventListener(this.element,"mousemove",this._boundOnMouseMoveAfterZoomOut)
};g._getTranslateX=function(){if(this.state!=h.STATE.ZOOMED){return this._tx=0}var r=this._controller.cursor.mousePanorama.x;
var p=(this.imgContainerWidth*this.scaleTarget*this._zoomClipProgress-this.windowWidth)/2;
var q=r*p;if(this._zoomClipProgress==1){q=Math.max(q,-p+(this._controller.scrollBarWidth*this.scaleTarget))
}this._tx+=(q-this._tx)*k;this._tx=Math.round(this._tx*10000)/10000;return this._tx
};g.getScrollOffset=function(){var p=Math.round(this.element.offsetTop-(n.innerHeight()*0.5)+(this._imageContainerEl.offsetHeight*0.5));
return p};g._panImage=function(){var p=this._getTranslateX();this._wrapperEl.style[c.transform]="translate3d("+p+"px, 0, 0)"
};g.onRequestAnimationFrame=function(){if(this.state===h.STATE.ZOOMED&&!this._transformRemoved){this._panImage();
requestAnimationFrame(this._boundRaf)}};g.applyIECompatability=function(){this.element.style.cursor="pointer"
};g._calcDistance=function(q,p){return Math.sqrt(Math.pow(q[0]-p[0],2)+Math.pow(q[1]-p[1],2))
};b.exports=h},{"../utils/BrowserPrefixed":862,"ac-dom-events":299,"ac-dom-metrics":323,"ac-dom-styles":354,"ac-dom-traversal":372,"ac-eclipse":"ac-eclipse","ac-viewport":791}],850:[function(d,c,h){var b=d("ac-dom-traversal/querySelectorAll");
var p=d("ac-dom-styles/setStyle");var m=d("ac-viewport").Viewport;var a=d("ac-dom-metrics");
var n=d("ac-console").log;var g=d("ac-scroll-motion-emitter").ElementScrollMotionEmitter;
var l=d("../utils/BrowserPrefixed");var f=d("ac-dom-events/addEventListener");var o=AC.images;
var j=function(q){this.el=q;this.boundFunctions={_setElementStyle:this._setElementStyle.bind(this),_initTransformOrigin:this._initTransformOrigin.bind(this)};
this._initAnimations();this._initElementScrollMotionEmitter();this.elementScrollMotionEmitter.start();
this.handleScroll()};var k=j.prototype;k._initAnimations=function(){var q=this;
this.animations=[];this.animationEls=b("[data-scroll-animation]",this.el);this.animationEls.forEach(function(u,t){if(u.hasAttribute("data-scroll-emitter")){q.animationEls.splice(t,1)
}});var s=this.el.getAttribute("data-scroll-emitter");var r=s?JSON.parse(s):{};
this.resolve=r.resolve||0.5;this.begin=r.begin||1;if(this.el.hasAttribute("data-scroll-animation")){this.animationEls.push(this.el)
}this.el.classList.add("show");f(this.el,"transitionend",function(){q.el.style[l.transition]="none"
});this.animationEls.forEach(function(v,u){q.animations[u]={};q.animations[u].el=v;
var w=JSON.parse(v.getAttribute("data-scroll-animation"));if(!w){w={}}if(w.offsetX&&!w.offsetXStart){w.offsetXStart=-0.5*w.offsetX
}if(w.offsetY&&!w.offsetXStart){w.offsetYStart=-0.5*w.offsetY}if(typeof w.offsetY=="string"&&w.offsetY.match(/%/)){var t=parseInt(w.offsetY.replace("%",""))/100;
w.offsetY=t*a.getDimensions(v).height}q.animations[u].data=w;q.animations[u].key=q._getImageMapKey(v)
});this.animations.forEach(this.boundFunctions._initTransformOrigin);this.setScale(m.getBreakpoint().name)
};k._initElementScrollMotionEmitter=function(){var s=m.clientHeight();var r=(typeof this.begin=="string"&&this.begin.match(/px/))?parseInt(this.begin.replace("px","")):-s*this.begin;
var q=(typeof this.resolve=="string"&&this.resolve.match(/px/))?parseInt(this.resolve.replace("px","")):-s*this.resolve;
this.elementScrollMotionEmitter=new g(this.el,{smooth:true,overrideScroll:true,offsetTop:r,offsetBottom:q,friction:12})
};k._initTransformOrigin=function(r){if(r.data.origin=="false"){return}var q=m.clientWidth()/2-r.el.getBoundingClientRect().left;
p(r.el,{"transform-origin":q+"px 50%"})};k._getImageMapKey=function(v){var u=v.classList;
var t;if(!this.page){var w=window.location.pathname.split("/");this.page=w[w.length-2];
if(this.page=="iphone-6s"){this.page="overview"}}for(var s=0,r=u.length;s<r;s++){var q=u[s];
if(q.match(/image-/)){t=q;break}}if(t){return this.page+"_"+t.replace("image-","").replace("-","_")
}};k._lerp=function(r,q){return r*(1-this._progress)+q*this._progress};k.handleScroll=function(){this.elementScrollMotionEmitter.handleScroll()
};k.setScale=function(q){var t,r,s;this.animations.forEach(function(u){if(u.data[q+"Scale"]){u.scaleMultiplier=u.data[q+"Scale"]
}else{u.scaleMultiplier=1}if(u.data[q]){u.translationMultiplier=u.data[q];return
}t=o[u.key];if(!t||!t[q]){u.translationMultiplier=1;if(!t){n(u.key)}}else{r=parseInt(t[q].width.replace("px",""));
s=parseInt(t.large.width.replace("px",""));u.translationMultiplier=r/s}})};k.setupEvents=function(){this.elementScrollMotionEmitter.on("draw",this.update.bind(this))
};k.teardownEvents=function(){this.elementScrollMotionEmitter.off()};k._setElementStyle=function(t,B){var z=t.data.offsetY*t.translationMultiplier;
var C=t.data.offsetX*t.translationMultiplier;this.animations[B].progress=this._progress;
this.animations[B].transY=t.data.offsetY?this._lerp(-0.5*z,0.5*z):0;this.animations[B].transX=t.data.offsetX?this._lerp(t.data.offsetXStart,t.data.offsetXStart+C):0;
this.animations[B].rotate=t.data.rotate?this._lerp(0,t.data.rotate):0;var v=this.animations[B].transY;
var x=this.animations[B].transX;var u=this.animations[B].rotate;var q=t.data.scaleStart||1;
var w=t.data.scale||1;var r=(q+w)/2;q=(q-r)*t.scaleMultiplier+r;w=(w-r)*t.scaleMultiplier+r;
var A=t.data.opacityStart?t.data.opacityStart:1;var s=t.data.scale?this._lerp(q,w):1;
var y=t.data.opacity?this._lerp(A,t.data.opacity):1;t.el.style[l.transform]="scale("+s+","+s+") translate3d("+x+"px,"+v+"px,0) rotate("+u+"deg)";
t.el.style.opacity=y};k.update=function(r){var q=this;if(!r.progress.isNaN){this._progress=r.progress;
this.animations.forEach(this.boundFunctions._setElementStyle)}};k.destroy=function(){this.teardownEvents();
this.elementScrollMotionEmitter.destroy();this.elementScrollMotionEmitter=null};
c.exports=j},{"../utils/BrowserPrefixed":862,"ac-console":291,"ac-dom-events/addEventListener":297,"ac-dom-metrics":323,"ac-dom-styles/setStyle":366,"ac-dom-traversal/querySelectorAll":382,"ac-scroll-motion-emitter":643,"ac-viewport":791}],851:[function(d,b,j){d("ac-polyfills/Object/create");
var o=d("../mediaObject/decorators/GalleryDecorator");var n=d("ac-dom-emitter").DOMEmitter;
var a=d("ac-dom-traversal/querySelectorAll");var q=d("ac-dom-traversal/querySelector");
var c=d("../model/EnabledFeatures");var h=d("./BasicGallerySection");var p=h.prototype;
var r=d("ac-classlist");var m=d("ac-solar");var f=d("../gallery/galleryHelper").getSlideId;
var g=d("../gallery/galleryHelper").getSlideEl;function l(v,u,t){h.call(this,v,u,t);
this.outgoingIndex=0;this.incomingIndex=1;this.animatedIn=false;this.initialLoad=false;
var w=a("[data-mediaobject]",v);this._mediaObjects=[];var s=this;if(w){w.reverse()
}w.forEach(function(z,y){var z=z||"[NO ELEMENT]";var B=z.getAttribute("data-mediaobject");
B=JSON.parse(B);var A,x;x=new o(z,B);A=x.mediaObj;s._mediaObjects.push(A)})}var k=l.prototype=Object.create(h.prototype);
l.prototype.constructor=l;k.load=function(s){if(!s.isDestroyed){s.on("loaded",this._onLoad.bind(s));
s.load()}};k._onLoad=function(){this.enhance()};k.setupEvents=function(){this.gallery.on("update",this._boundFunctions._onUpdate);
this.gallery.on("update:complete",this._boundFunctions._onUpdateComplete)};k.loadAndPlay=function(s){if(s.isDestroyed){return
}s.on("loaded",s.enhance.bind(s));s.on("enhanced",this._hideStartframe.bind(this,s));
s.on("enhanced",s.play.bind(s));s.load()};k._onUpdate=function(B){if(B.outgoing){this.animatedIn=true;
var s=f(B.outgoing);var u=g(B.outgoing);var y=q('[data-slide-link="'+s+'"]');var v=f(B.incoming);
var w=g(B.incoming);var z=q('[data-slide-link="'+v+'"]');this.outgoingIndex=this.gallery.getItemIndex(B.outgoing[0]);
this.incomingIndex=this.gallery.getItemIndex(B.incoming[0]);r.remove(u,"current");
r.add(w,"current");var t=this._mediaObjects[this.outgoingIndex];var x=this._mediaObjects[this.incomingIndex];
if(!x.isDestroyed){if(!c.IS_HANDHELD){if(x.getEnhanced()){this._fadeToBeginning(t);
x.play();this._hideStartframe(x)}else{this.loadAndPlay(x)}}var A=this._mediaObjects[this.incomingIndex+1];
if(A&&!A.getLoaded()){this.load(A)}}if(y&&z){r.remove(y,"current");r.add(z,"current")
}}};k._fadeToBeginning=function(t){t.pause();var u=q(".mediaObject-startframe",t.el);
var s={};s.onComplete=function(v){t.reset()};m.fadeIn(u,0.7,s)};k._hideStartframe=function(s){var t=q(".mediaObject-startframe",s.el);
t.style.opacity=0};k._onUpdateComplete=function(s){this.animatedIn=true};k.activate=function(){p.activate.call(this);
if(!this._mediaObjects[this.incomingIndex].isDestroyed){if(this.animatedIn&&!c.IS_HANDHELD){this._mediaObjects[this.incomingIndex].play()
}else{if(this.initialLoad&&!c.IS_HANDHELD){this._mediaObjects[this.outgoingIndex].play();
var s=q(".mediaObject-startframe",this._mediaObjects[this.outgoingIndex].el);s.style.opacity=0
}else{this.load(this._mediaObjects[this.incomingIndex]);this.load(this._mediaObjects[this.outgoingIndex]);
this._mediaObjects[this.outgoingIndex].on("enhanced",function(){this.play()}.bind(this._mediaObjects[this.outgoingIndex]));
this.initialLoad=true}}}};k.deactivate=function(){p.deactivate.call(this);if(!this._mediaObjects[this.incomingIndex].isDestroyed){this._mediaObjects[this.incomingIndex].reset()
}};k.onBreakpoint=function(v,y,u,t){if(v.name==="xlarge"||y.name==="xlarge"){return
}for(var w=0,s=this._mediaObjects.length;w<s;w++){var x=this._mediaObjects[w];if(x.isDestroyed){return
}if(!x.getDestroyed()&&v.name!==y.name){x.destroy();x.isDestroyed=true}}};b.exports=l
},{"../gallery/galleryHelper":804,"../mediaObject/decorators/GalleryDecorator":807,"../model/EnabledFeatures":810,"./BasicGallerySection":853,"ac-classlist":272,"ac-dom-emitter":295,"ac-dom-traversal/querySelector":381,"ac-dom-traversal/querySelectorAll":382,"ac-polyfills/Object/create":569,"ac-solar":685}],852:[function(c,b,f){c("ac-polyfills/Object/create");
c("ac-polyfills/Element/prototype.classList");var j=c("ac-console").log;var a=c("ac-dom-metrics");
var d=c("./../model/DataAttributes"),k=c("ac-event-emitter-micro").EventEmitterMicro,l=k.prototype;
function h(o,n,m){k.call(this);this.element=o;this.trackedElement=n;this.rafWhenVisible=this.rafWhenVisible||false;
this._index=m;this._hasAnimatedIn=false;this.isActive=false;this.name=this.name||this.element.className;
this._rafId=-1;this.scrollToPosition=0;this.updateScrollToPosition();this._boundFunctions={_boundRaf:this.onRequestAnimationFrame.bind(this)};
if(this.element.hasAttribute(d.JUMP_SECTION_NAME)){var p=this.element.getElementsByTagName("a")[0];
p.addEventListener("click",this._boundFunctions._onClick,false)}}var g=h.prototype=Object.create(k.prototype);
h.prototype.constructor=h;g.destroy=function(){this.teardownEvents();cancelAnimationFrame(this._rafId);
this.trackedElement=null;this.element=null;this._boundFunctions=null;l.destroy.call(this)
};g.activate=function(){j("BaseSection::activate "+this.name);this.element.classList.add("animated");
this.element.classList.add("active");if(!this._hasAnimatedIn){this.animateIn();
this._hasAnimatedIn=true}this.isActive=true;if(!this.rafWhenVisible){this._rafId=requestAnimationFrame(this._boundFunctions._boundRaf)
}};g.deactivate=function(){this.element.classList.remove("active");this.isActive=false;
if(!this.rafWhenVisible){cancelAnimationFrame(this._rafId)}};g.animateIn=function(){};
g.onRequestAnimationFrame=function(){this._rafId=requestAnimationFrame(this._boundFunctions._boundRaf)
};g.onResize=function(o,n,m){this.updateScrollToPosition()};g.onBreakpoint=function(o,p,n,m){};
g.onScroll=function(o,n,m){};g.onViewWillAppear=function(n,m){if(this.rafWhenVisible){this._rafId=requestAnimationFrame(this._boundFunctions._boundRaf)
}};g.onViewWillDisappear=function(n,m){if(this.rafWhenVisible){cancelAnimationFrame(this._rafId)
}};g.updateScrollToPosition=function(){return this.scrollToPosition=a.getPagePosition(this.element).top
};g.setupEvents=function(){};g.teardownEvents=function(){};g.getURL=function(){return this.element.getAttribute(d.JUMP_SECTION_NAME)
};g.getName=function(){if(!this.element.hasAttribute(d.JUMP_SECTION_NAME)){return this.element.className.split("")
}var m=this.getURL();return m.replace(/-/g,"")};b.exports=h},{"./../model/DataAttributes":809,"ac-console":291,"ac-dom-metrics":323,"ac-event-emitter-micro":478,"ac-polyfills/Element/prototype.classList":568,"ac-polyfills/Object/create":569}],853:[function(d,a,u){d("ac-polyfills/Object/create");
d("ac-polyfills/Array/isArray");var o=d("../model/EnabledFeatures");var f=d("../utils/BrowserPrefixed");
var s=d("./BaseSection");var n=s.prototype;var b=d("ac-dom-traversal/querySelector");
var t=d("ac-dom-traversal/querySelectorAll");var h=d("ac-dom-nodes/insertFirstChild");
var r=d("ac-dom-nodes/insertAfter");var m=d("ac-browser");var q=d("ac-classlist");
var v=d("ac-swipe").Swipe;var l=d("@marcom/ac-gallery").SlideGallery;var g=d("@marcom/ac-gallery").FadeGallery;
var c=d("../gallery/galleryHelper").getSlideId;var p=d("../gallery/galleryHelper").getSlideEl;
function k(y,x,w){s.call(this,y,x,w);this.init()}var j=k.prototype=Object.create(s.prototype);
k.prototype.constructor=k;j.init=function(){this.galleryWrapper=b(".ac-gallery",this.element);
this.galleryId=this.galleryWrapper.id;this.viewfinder=document.getElementById(this.galleryId);
this.galleryContentElements=Array.prototype.slice.call(t(".ac-gallery-content",this.element));
this.triggerClass=this.galleryId+"-trigger";this.dotnav=b(".dotnav",this.element);
this.dotnavExpected=q.contains(this.galleryWrapper,"ac-gallery-has-dotnav");this.paddlenav=b(".paddlenav",this.element);
this.paddlenavExpected=q.contains(this.galleryWrapper,"ac-gallery-has-paddlenav");
this.togglenav=b(".togglenav",this.element);this.togglenavExpected=q.contains(this.galleryWrapper,"ac-gallery-has-togglenav");
this._setGalleryType();this._boundFunctions={_boundRaf:this.onRequestAnimationFrame.bind(this),_onUpdate:this._onUpdate.bind(this),_onUpdateComplete:this._onUpdateComplete.bind(this),_showNextSlide:function(){this.gallery.showNext()
}.bind(this),_showPreviousSlide:function(){this.gallery.showPrevious()}.bind(this)};
if(!this.dotnav&&this.dotnavExpected){this.dotnav=this._setupDotnav()}if(!this.paddlenav&&this.paddlenavExpected){this.paddlenav=this._setupPaddlenav()
}if(!this.togglenav&&this.togglenavExpected){this.togglenav=this._setupTogglenav()
}this._createGallery();if(o.IS_HANDHELD&&this.galleryType==="slide"){this.swipeEl=new v(this.galleryWrapper);
this.swipeEl.on(v.SWIPE_LEFT,this._boundFunctions._showNextSlide,false);this.swipeEl.on(v.SWIPE_RIGHT,this._boundFunctions._showPreviousSlide,false)
}};j._setGalleryType=function(){var w=(m.name==="IE"&&m.version<=8);if(w){q.replace(this.galleryWrapper,"ac-gallery-slide","ac-gallery-fade")
}this.galleryType=(q.contains(this.galleryWrapper,"ac-gallery-fade"))?"fade":"slide"
};j._setupDotnav=function(){var y=document.createElement("nav"),x=document.createElement("ul");
var w=this;this.galleryContentElements.forEach(function(A,z){x.innerHTML+='<li><a href="#'+w.galleryId+'" class="dotnav-item '+w.triggerClass+'" data-ac-gallery-trigger="'+A.id+'">Item '+(z+1)+"</a></li>"
});y.className="dotnav";y.setAttribute("aria-hidden",true);h(x,y);r(y,this.galleryWrapper);
return y};j._setupPaddlenav=function(){var w=document.createElement("nav");w.innerHTML+='<a class="paddlenav-arrow paddlenav-arrow-left '+this.triggerClass+'" href="#'+this.galleryId+'/previous" data-ac-gallery-previous-trigger="'+this.galleryId+'"></a>';
w.innerHTML+='<a class="paddlenav-arrow paddlenav-arrow-right '+this.triggerClass+'" href="#'+this.galleryId+'/next" data-ac-gallery-next-trigger="'+this.galleryId+'"></a>';
w.className="paddlenav";ac_dom.insertLastChild(w,this.galleryWrapper);return w};
j._setupTogglenav=function(){var y=document.createElement("nav"),x=document.createElement("ul");
var w=this;this.galleryContentElements.forEach(function(A,z){var B=A.getAttribute("data-slide-title");
x.innerHTML+='<li><a href="#'+w.galleryId+'" class="togglenav-button '+w.triggerClass+'" data-ac-gallery-trigger="'+A.id+'">'+B+"</a></li>"
});y.className="togglenav gallery-togglenav";y.setAttribute("data-ac-gallery-togglenav",this.galleryId);
h(x,y);r(y,this.galleryWrapper);return y};j._onUpdate=function(y){if(y.incoming){if(y.outgoing){q.add(this.galleryWrapper,"ac-gallery-is-transitioning");
var A=c(y.outgoing);var x=p(y.outgoing);var B=b('[data-slide-link="'+A+'"]');q.add(x,"transitioning");
q.remove(x,"current");if(B){q.add(B,"transitioning");q.remove(B,"current")}}var z=c(y.incoming);
var C=p(y.incoming);var w=b('[data-slide-link="'+z+'"]');q.add(C,"current");if(w){q.add(w,"current")
}}};j._onUpdateComplete=function(x){q.remove(this.galleryWrapper,"ac-gallery-is-transitioning");
if(x.outgoing){var z=c(x.outgoing);var w=p(x.outgoing);q.remove(w,"transitioning")
}var A=p(x.incoming);var B=(A)?A.getAttribute("data-buylink"):"";var y=b(".buylink-target",this.element);
if(B&&y&&y.href){y.href=B}};j._createGallery=function(){switch(this.galleryType){case"fade":var w=new g(this.viewfinder,{ease:"cubic-bezier(.35,.01,.34,1)",duration:0.6,touch:true,crossFade:true});
break;default:var w=new l(this.viewfinder,{ease:"cubic-bezier(.35,.01,.34,1)",duration:0.6,itemCenterPoint:0,touch:(!o.IS_HANDHELD),desktopSwipe:true});
break}this.gallery=w};j.setupEvents=function(){this.gallery.on("update",this._boundFunctions._onUpdate);
this.gallery.on("update:complete",this._boundFunctions._onUpdateComplete)};j.teardownEvents=function(){n.teardownEvents.call(this)
};j.activate=function(){n.activate.call(this)};j.deactivate=function(){n.deactivate.call(this)
};j.animateIn=function(){n.animateIn.call(this)};j.onRequestAnimationFrame=function(){n.onRequestAnimationFrame.call(this)
};j.onScroll=function(y,x,w){n.onScroll.call(this,y,x,w)};j.onResize=function(y,x,w){n.onResize.call(this,y,x,w)
};j.onBreakpoint=function(y,z,x,w){};j.onViewWillAppear=function(x,w){n.onViewWillAppear.call(this,x,w)
};j.onViewWillDisappear=function(x,w){n.onViewWillDisappear.call(this,x,w)};j.destroy=function(){n.destroy.call(this)
};a.exports=k},{"../gallery/galleryHelper":804,"../model/EnabledFeatures":810,"../utils/BrowserPrefixed":862,"./BaseSection":852,"@marcom/ac-gallery":245,"ac-browser":261,"ac-classlist":272,"ac-dom-nodes/insertAfter":337,"ac-dom-nodes/insertFirstChild":339,"ac-dom-traversal/querySelector":381,"ac-dom-traversal/querySelectorAll":382,"ac-polyfills/Array/isArray":560,"ac-polyfills/Object/create":569,"ac-swipe":695}],854:[function(h,a,t){h("ac-polyfills/Object/create");
var q=h("ac-dom-metrics");var j=h("../utils/BrowserPrefixed");var r=h("./BaseSection");
var m=r.prototype;var b=h("ac-dom-traversal/querySelector");var s=h("ac-dom-traversal/querySelectorAll");
var c=h("ac-dom-events/addEventListener");var f=h("ac-dom-events/removeEventListener");
var o=h("ac-classlist");var k=h("@marcom/ac-gallery").FadeGallery;var u=h("ac-analytics");
var p=u.createBasicObserverSuite();var d=h("../gallery/galleryHelper").getSlideId;
var n=h("../gallery/galleryHelper").getSlideEl;function g(x,w,v){this.name="ColorPickerGallerySection";
r.call(this,x,w,v);this.rafWhenVisible=false;this.galleryWrapper=b(".ac-gallery",this.element);
this.galleryId=this.galleryWrapper.id;this.galleryShortName=this.galleryWrapper.id.split("-")[2];
this.gallerySlideWrapper=document.getElementById(this.galleryId+"-slides");this.deviceLinksEle=b("[data-target-type=device]",this.element);
this.deviceLinksAll=Array.prototype.slice.call(s("a.colorselector-link",this.deviceLinksEle));
this.caseLinksEle=b("[data-target-type=case]",this.element);this.caseLinksAll=Array.prototype.slice.call(s("a.colorselector-link",this.caseLinksEle));
this.prodLink6s=b(".buynow-6s",this.element);this.prodLink6sPlus=b(".buynow-6s-plus",this.element);
this._textLocalizationFn=this._createTextLocalizationFn();this._prepGalleryMarkup();
this.gallGalleryElements=Array.prototype.slice.call(s(".ac-gallery-content",this.element));
this.fadeGallery=new k(this.galleryWrapper,{touch:false});this._boundFunctions._onUpdateComplete=function(y){this._updateSelectorLinks(this._getColorGalleryData(y));
this._setSlideVisibilityClassification(y,"update:complete")}.bind(this);this._boundFunctions._onUpdate=function(y){this._updateSelectorLinks(this._getColorGalleryData(y));
this._setSlideVisibilityClassification(y,"update")}.bind(this);this.fadeGallery.on("update",this._boundFunctions._onUpdate);
this.fadeGallery.on("update:complete",this._boundFunctions._onUpdateComplete)}var l=g.prototype=Object.create(r.prototype);
g.prototype.constructor=g;l._setSlideVisibilityClassification=function(v,w){switch(w){case"update:complete":o.remove(n(v.outgoing),"current");
break;case"update":o.add(n(v.incoming),"current");break}};l._getLinkToggleElement=function(w,x){var v=null;
Array.prototype.slice.call(s("[data-target-type="+w+"] a[data-color-name] ",this.element)).forEach(function(y){if(b(".colorselector-caption",y).getAttribute("data-color-name")===x){v=y
}});return v};l._updateSelectorLinks=function(x){var v=b("a.current",this.deviceLinksEle),w=b("a.current",this.caseLinksEle);
if(v&&v.getAttribute("data-color-name")!==x.deviceColor){o.remove(v,"current")}if(w&&w.getAttribute("data-color-name")!==x.caseColor){o.remove(w,"current");
this._updateProdLinks(x)}o.add(this._getLinkToggleElement("device",x.deviceColor),"current");
o.add(this._getLinkToggleElement("case",x.caseColor),"current")};l._getColorClickData=function(w){var H=b(".colorselector-caption",w).getAttribute("data-color-name"),A=w.getAttribute("data-color-name"),v=w.parentNode.parentNode.getAttribute("data-target-type"),x=(v=="case")?"device":"case",F=b("[data-target-type="+x+"] a.current .colorselector-caption",this.element).getAttribute("data-color-name"),E=b("[data-target-type="+x+"] a.current",this.element).getAttribute("data-color-name"),G=(v=="case")?H:F,D=(v=="case")?A:E,z=(v=="device")?H:F,B=(v=="device")?A:E,y=(w.href&&w.href.indexOf("/shop/goto/product/")!=-1)?w.href:undefined,C=(y&&w.getAttribute("data-url-plus"))?y.substring(0,y.lastIndexOf("/")+1)+w.getAttribute("data-url-plus"):undefined;
return{caseLinkUrl6s:y,caseLinkUrl6sPlus:C,isCurrent:o.contains(w,"current"),thisColorTarget:w,targetType:v,caseColor:G,caseColorLocal:D,deviceColor:z,deviceColorLocal:B,galleryTarget:[this.galleryId,"view",z.split(/\s+/).join(""),G.split(/\s+/).join("")].join("-").toLowerCase()}
};l._getColorGalleryData=function(w){var x=this._getLinkToggleElement("case",b(".case-color-name",document.getElementById(d(w.incoming))).getAttribute("data-color-name-case"));
if(x){var y=x.href;var v=(y&&x.getAttribute("data-url-plus"))?y.substring(0,y.lastIndexOf("/")+1)+x.getAttribute("data-url-plus"):null
}return{caseLinkUrl6s:y,caseLinkUrl6sPlus:v,isCurrent:false,thisColorTarget:null,targetType:null,caseColor:document.getElementById(d(w.incoming)).getAttribute("data-color-name-case"),caseColorLocal:b(".case-color-name",document.getElementById(d(w.incoming))).innerHTML,deviceColor:document.getElementById(d(w.incoming)).getAttribute("data-color-name-device"),deviceColorLocal:b(".device-color-name",document.getElementById(d(w.incoming))).innerHTML,galleryTarget:d(w.incoming)}
};l._updateProdLinks=function(v){if(this.prodLink6s&&v.caseLinkUrl6s){this.prodLink6s.href=v.caseLinkUrl6s
}if(this.prodLink6sPlus&&v.caseLinkUrl6sPlus){this.prodLink6sPlus.href=v.caseLinkUrl6sPlus
}};l._handleColorClick=function(v){v.preventDefault();var x=v.currentTarget;var w=this._getColorClickData(x);
if(!w.isCurrent){p.click.track(v,(x||null));this._updateSelectorLinks(w);this.fadeGallery.show(w.galleryTarget);
this._updateProdLinks(w)}};l._colorLinkDataAttribute=function(y,w){var x=b(".colorselector-caption",y);
if(x){var v=(w||!x.getAttribute("data-color-name"))?x.innerHTML.toString():x.getAttribute("data-color-name");
y.setAttribute("data-color-name",v);return y.getAttribute("data-color-name")}return""
};l._prepGalleryMarkup=function(){var v=this;v.deviceLinksAll.forEach(function(y){var x=v._colorLinkDataAttribute(y),w=v._colorLinkDataAttribute(y,true);
v.caseLinksAll.forEach(function(F){var D=v._colorLinkDataAttribute(F),z=v._colorLinkDataAttribute(F,true),E=[v.galleryId,"view",x,D].join("-").split(/\s+/).join("").toLowerCase();
if(!document.getElementById(E)){var A=document.createElement("figure");A.setAttribute("data-color-name-device",x);
A.setAttribute("data-color-name-case",D);A.setAttribute("data-ac-gallery-item","");
A.id=E;var G='<div class="small-text-right caption caption-text">'+v._textLocalizationFn(w,z)+"</div>";
var H=x.split(/\s+/).join("").toLowerCase(),B=D.split(/\s+/).join("").toLowerCase(),C=[v.galleryShortName,H,B].join("_");
A.className="image-device-and-case ac-gallery-content "+C;A.innerHTML=G;v.gallerySlideWrapper.appendChild(A)
}else{var A=document.getElementById(E);A.setAttribute("data-color-name-device",x);
A.setAttribute("data-color-name-case",D);A.setAttribute("data-ac-gallery-item","")
}})})};l._createTextLocalizationFn=function(){var w=b(".product-name",this.element),x=w.innerHTML;
var y=b(".color-description",this.element),z=y.innerHTML.split(/>[^<]+<\//).join("><!--COLORNAME--></"),v=z.split("<!--COLORNAME-->");
return function(A,C){var B='<p class="product-name">'+x+"</p>";B+='<p class="product-name">'+v[0]+A+v[1]+C+v[2]+"</p>";
return B}};l.setupEvents=function(){var v=this;this.colorTargets=Array.prototype.slice.call(s("a.colorselector-link",this.element));
this._boundFunctions._handleColorClick=this._handleColorClick.bind(this);this.colorTargets.forEach(function(w){c(w,"click",v._boundFunctions._handleColorClick,false)
});this.fadeGallery.on("update:complete",this._boundFunctions._onUpdateComplete)
};l.teardownEvents=function(){var v=this;this.colorTargets.forEach(function(w){f(w,"click",v._boundFunctions._handleColorClick)
});m.teardownEvents.call(this)};l.activate=function(){m.activate.call(this)};l.deactivate=function(){m.deactivate.call(this)
};l.animateIn=function(){m.animateIn.call(this)};l.onRequestAnimationFrame=function(){m.onRequestAnimationFrame.call(this)
};l.onScroll=function(x,w,v){m.onScroll.call(this,x,w,v)};l.onResize=function(x,w,v){m.onResize.call(this,x,w,v)
};l.onBreakpoint=function(x,y,w,v){};l.onViewWillAppear=function(w,v){m.onViewWillAppear.call(this,w,v)
};l.onViewWillDisappear=function(w,v){m.onViewWillDisappear.call(this,w,v)};l.destroy=function(){m.destroy.call(this)
};a.exports=g},{"../gallery/galleryHelper":804,"../utils/BrowserPrefixed":862,"./BaseSection":852,"@marcom/ac-gallery":245,"ac-analytics":"ac-analytics","ac-classlist":272,"ac-dom-events/addEventListener":297,"ac-dom-events/removeEventListener":306,"ac-dom-metrics":323,"ac-dom-traversal/querySelector":381,"ac-dom-traversal/querySelectorAll":382,"ac-polyfills/Object/create":569}],855:[function(h,g,l){h("ac-polyfills/Object/create");
var c=h("ac-dom-metrics");var o=h("../utils/BrowserPrefixed");var a=h("../engagementAnimation/EngagementAnimation");
var f=h("ac-dom-traversal/querySelectorAll");var b=h("ac-element-engagement").ElementEngagement;
var k=h("ac-viewport").Viewport;var d=h("../utils/animationCapable");var n=h("./BaseSection");
var p=n.prototype;function j(u,t,s){this.name="EngagementAnimationSection";n.call(this,u,t,s);
var v=k.getBreakpoint().name;if(v==="xlarge"){v="large"}this.animations=[];var r=f("[data-animate-in]");
var q=this;if(d){this._animationElementTracker=new b();r.forEach(function(x,w){q.animations[w]=new a(x,v,{elementEngagement:q._animationElementTracker})
})}}var m=j.prototype=Object.create(n.prototype);j.prototype.constructor=j;m.setupEvents=function(){};
m.teardownEvents=function(){p.teardownEvents.call(this)};m.activate=function(){p.activate.call(this);
if(this._animationElementTracker){this._animationElementTracker.start()}};m.deactivate=function(){p.deactivate.call(this)
};m.animateIn=function(){p.animateIn.call(this)};m.onRequestAnimationFrame=function(){p.onRequestAnimationFrame.call(this)
};m.onScroll=function(s,r,q){p.onScroll.call(this,s,r,q)};m.onResize=function(s,r,q){p.onResize.call(this,s,r,q)
};m.onBreakpoint=function(t,u,s,q){var r=this;if(t.name==="xlarge"||u.name==="xlarge"){return
}this.animations.forEach(function(w,v){w.updateAnimationOnBreakpoint(t.name)})};
m.onViewWillAppear=function(r,q){p.onViewWillAppear.call(this,r,q)};m.onViewWillDisappear=function(r,q){p.onViewWillDisappear.call(this,r,q)
};m.destroy=function(){p.destroy.call(this)};g.exports=j},{"../engagementAnimation/EngagementAnimation":800,"../utils/BrowserPrefixed":862,"../utils/animationCapable":863,"./BaseSection":852,"ac-dom-metrics":323,"ac-dom-traversal/querySelectorAll":382,"ac-element-engagement":406,"ac-polyfills/Object/create":569,"ac-viewport":791}],856:[function(c,b,d){c("ac-polyfills/Object/create");
var a=c("ac-dom-metrics");var h=c("../utils/BrowserPrefixed");var g=c("./BaseSection");
var j=g.prototype;function k(n,m,l){this.name="FadeInHeroSection";g.call(this,n,m,l);
this.rafWhenVisible=false;this.element.classList.add("reveal")}var f=k.prototype=Object.create(g.prototype);
k.prototype.constructor=k;f.setupEvents=function(){};f.teardownEvents=function(){j.teardownEvents.call(this)
};f.activate=function(){j.activate.call(this)};f.deactivate=function(){j.deactivate.call(this)
};f.animateIn=function(){j.animateIn.call(this)};f.onRequestAnimationFrame=function(){j.onRequestAnimationFrame.call(this)
};f.onScroll=function(n,m,l){j.onScroll.call(this,n,m,l)};f.onResize=function(n,m,l){j.onResize.call(this,n,m,l)
};f.onBreakpoint=function(n,o,m,l){};f.onViewWillAppear=function(m,l){j.onViewWillAppear.call(this,m,l)
};f.onViewWillDisappear=function(m,l){j.onViewWillDisappear.call(this,m,l)};f.destroy=function(){j.destroy.call(this)
};b.exports=k},{"../utils/BrowserPrefixed":862,"./BaseSection":852,"ac-dom-metrics":323,"ac-polyfills/Object/create":569}],857:[function(h,c,t){h("ac-polyfills/Object/create");
var j=h("../mediaObject/decorators/BasicDecorator");var r=h("../mediaObject/decorators/AutoplayDecorator");
var f=h("../mediaObject/decorators/ReplayDecorator");var o=h("../model/EnabledFeatures");
var p=h("../pages/overview/OverviewStatusProxy");var b=h("ac-dom-events");var g=h("ac-dom-emitter").DOMEmitter;
var m=h("ac-dom-traversal").querySelectorAll;var d=h("ac-dom-traversal").querySelector;
var q=h("ac-viewport").Viewport;var a=h("ac-element-tracker").ElementTracker;var u=h("ac-classlist");
var s=h("./BaseSection");var n=s.prototype;function k(x,w,v){s.call(this,x,w,v);
var z=m("[data-mediaobject]",x);this.mediaObjectContainers=z;this._mediaObjectElementTracker=new a(null,{autoStart:false});
this._mediaObjects=[];this._boundOnInit=this._init.bind(this);var y=d(".page-overview",document.documentElement);
if(this.mediaObjectContainers){if(y){if(p.ready){this._boundOnInit()}else{p.on("ready",this._boundOnInit)
}}else{this._boundOnInit()}}}var l=k.prototype=Object.create(s.prototype);k.prototype.constructor=k;
l.mediaObjectsVisibleClass="mediaObjects-visible";l._init=function(){this.mediaObjectContainers.forEach(function(y,x){var y=y||"[NO ELEMENT]";
var A=y.getAttribute("data-mediaobject");A=JSON.parse(A);if(!this.shouldBeStatic(A)){var w=this._mediaObjectElementTracker.addElement(y);
var z,v;if(A.decorator==="replay"){v=new f(y,w,A);z=v.mediaObj;z.decorator=A.decorator
}else{if(A.decorator==="autoplay"){v=new r(y,w,A);z=v.mediaObj;z.decorator=A.decorator
}else{v=new j(y,w,A);z=v.mediaObj;z.decorator="basic"}}if(A.name==="overview/3dtouch"){v.shouldEnhance=false
}this._mediaObjects.push(z);this._mediaObjectElementTracker.refreshElementState(w)
}}.bind(this))};l.onBreakpoint=function(y,B,x,w){if(y.name==="xlarge"||B.name==="xlarge"){return
}if(this.mediaObjectContainers){for(var z=0,v=this._mediaObjects.length;z<v;z++){var A=this._mediaObjects[z];
if(A.isDestroyed){return}if(!A.getDestroyed()&&y.name!==B.name){A.destroy();A.isDestroyed=true
}}}};l.shouldBeStatic=function(v){if(v["static"]===q.getBreakpoint().name){return true
}else{if(v["static"]==="touch"&&o.TOUCH){return true}else{return false}}};l.activate=function(){n.activate.call(this)
};l.deactivate=function(){n.activate.call(this)};l.teardownEvents=function(){n.teardownEvents.call(this)
};l.onScroll=function(x,w,v){n.onScroll.call(this,x,w,v)};l.onResize=function(x,w,v){n.onResize.call(this,x,w,v)
};l.animateIn=function(){n.animateIn.call(this)};l.onViewWillAppear=function(w,v){n.onViewWillAppear.call(this,w,v);
this._mediaObjects.forEach(function(x){if(!x.isDestroyed&&!x.getEnhanced()){x.trigger("shouldenhance")
}});if(!p.ready&&p.overviewSection){p.overviewSection.triggerAllClassNameFallback()
}if(this.mediaObjectContainers){this._mediaObjectElementTracker.start()}if(this.mediaObjectContainers){u.add(this.element,this.mediaObjectsVisibleClass)
}};l.onViewWillDisappear=function(w,v){n.onViewWillDisappear.call(this,w,v);if(this.mediaObjectContainers){u.remove(this.element,this.mediaObjectsVisibleClass)
}};l.destroy=function(){n.destroy.call(this)};c.exports=k},{"../mediaObject/decorators/AutoplayDecorator":805,"../mediaObject/decorators/BasicDecorator":806,"../mediaObject/decorators/ReplayDecorator":808,"../model/EnabledFeatures":810,"../pages/overview/OverviewStatusProxy":830,"./BaseSection":852,"ac-classlist":272,"ac-dom-emitter":295,"ac-dom-events":299,"ac-dom-traversal":372,"ac-element-tracker":475,"ac-polyfills/Object/create":569,"ac-viewport":791}],858:[function(c,b,f){c("ac-polyfills/Object/create");
var a=c("ac-dom-metrics");var l=c("../utils/BrowserPrefixed");var h=c("../panorama/PanoramasController");
var d=c("ac-feature");var j=c("ac-browser");var k=c("./BaseSection");var n=k.prototype;
function m(q,p,o){this.name="PanoramaSection";k.call(this,q,p,o);if((j.IE&&j.IE.documentMode<9)){return
}this.panoramasController=new h();this.rafWhenVisible=false}var g=m.prototype=Object.create(k.prototype);
m.prototype.constructor=m;g.setupEvents=function(){};g.teardownEvents=function(){n.teardownEvents.call(this)
};g.activate=function(){n.activate.call(this)};g.deactivate=function(){n.deactivate.call(this)
};g.animateIn=function(){n.animateIn.call(this)};g.onRequestAnimationFrame=function(){n.onRequestAnimationFrame.call(this)
};g.onScroll=function(q,p,o){n.onScroll.call(this,q,p,o)};g.onResize=function(q,p,o){n.onResize.call(this,q,p,o);
this.panoramasController.boundOnResize()};g.onBreakpoint=function(q,r,p,o){this.panoramasController.setBreakpoint(q)
};g.onViewWillAppear=function(p,o){n.onViewWillAppear.call(this,p,o)};g.onViewWillDisappear=function(p,o){n.onViewWillDisappear.call(this,p,o)
};g.destroy=function(){n.destroy.call(this)};b.exports=m},{"../panorama/PanoramasController":848,"../utils/BrowserPrefixed":862,"./BaseSection":852,"ac-browser":261,"ac-dom-metrics":323,"ac-feature":491,"ac-polyfills/Object/create":569}],859:[function(c,a,g){var l=c("./ScrollAnimationSection");
var n=l.prototype;var b=c("../model/EnabledFeatures");var d=c("../ElementDistanceCalculator");
var h=c("ac-dom-traversal/querySelector");var f=c("ac-object");var m=c("ac-viewport").Viewport;
function k(q,p,o){this.name="ParallaxWebGLSection - "+(q.querySelector("h1")||q.querySelector("h2")).innerText;
l.call(this,q,p,o);this._didInit=false;this._hasThree=false;if(!b.WEB_GL){return
}this.initializeTargets();this._initializeWebGLEffects();m.on("breakpoint",this._handleBreakpoint.bind(this))
}var j=k.prototype=f.create(l.prototype);j.initializeTargets=function(){};j._initializeWebGLEffects=function(){this.distanceCalculator=new d({els:this.devices});
this.effects={};if(!!window.THREE){this._onThreeReady();return}var o=setInterval(function(){if(!!window.THREE){clearInterval(o);
this._onThreeReady()}}.bind(this),200)};j._getScrollAnimationByKey=function(o){return this.scrollAnimations[0].animations[this.animationKeys[o]]
};j._onThreeReady=function(){var p,o;for(p in this.devices){if(this.devices.hasOwnProperty(p)){o=this.effectsObj[p];
if(o.length>0){this.effects[p]=[];o.forEach(function(r,q){var s=new q(this,r);s.initialize();
this.effects[r].push(s);this.devices[r].appendChild(s.el);s.setSize()}.bind(this,p))
}}}this._didInit=true};j._handleBreakpoint=function(){if(this.distanceCalculator){this.distanceCalculator.initializeElements()
}};j.activate=function(){n.activate.call(this)};j.deactivate=function(){n.deactivate.call(this)
};j.animateIn=function(){n.animateIn.call(this)};j.onRequestAnimationFrame=function(){n.onRequestAnimationFrame.call(this);
return;if(!this._didInit){return}return;this.distanceCalculator.parallaxOffsets={};
var q;for(q in this.animationKeys){if(this.animationKeys.hasOwnProperty(q)){this.distanceCalculator.parallaxOffsets[q]={x:this.animationKeys[q].transX,y:this.animationKeys[q].transY,r:0}
}}this.distanceCalculator.calculate();var q,p,o;for(q in this.effects){if(this.effects.hasOwnProperty(q)){o=this.effects[q].length;
for(p=0;p<o;p++){this.effects[q][p].drawScene()}}}};j.onScroll=function(q,p,o){n.onScroll.call(this,q,p,o)
};j.onResize=function(q,p,o){n.onResize.call(this,q,p,o)};j.onViewWillAppear=function(p,o){n.onViewWillAppear.call(this,p,o)
};j.onViewWillDisappear=function(p,o){n.onViewWillDisappear.call(this,p,o)};j.destroy=function(){n.destroy.call(this)
};a.exports=k},{"../ElementDistanceCalculator":796,"../model/EnabledFeatures":810,"./ScrollAnimationSection":860,"ac-dom-traversal/querySelector":381,"ac-object":554,"ac-viewport":791}],860:[function(g,f,h){g("ac-polyfills/Object/create");
var c=g("ac-dom-metrics");var a=g("ac-dom-traversal");var m=g("ac-viewport").Viewport;
var n=g("../utils/BrowserPrefixed");var d=g("../utils/animationCapable");var j=g("../scrollAnimation/ScrollAnimation");
var b=g("./MediaObjectSection");var o=b.prototype;function l(r,q,p){this.name="ScrollAnimationSection";
b.call(this,r,q,p);if(!d){r.classList.add("static");return}this.breakpoint=m.getBreakpoint().name;
this.rafWhenVisible=true;this._initialize()}var k=l.prototype=Object.create(b.prototype);
l.prototype.constructor=l;k._initialize=function(){var p=this;this.scrollAnimations=[];
a.querySelectorAll("[data-scroll-emitter]",this.element).forEach(function(q){if(!q.offsetHeight){return
}p.scrollAnimations.push(new j(q))});this.offsets={}};k.setupEvents=function(){var p=this;
if(!d){return}this.scrollAnimations.forEach(function(q){q.setupEvents()})};k.teardownEvents=function(){if(d){this.scrollAnimations.forEach(function(p){p.teardownEvents()
})}o.teardownEvents.call(this)};k.activate=function(){o.activate.call(this)};k.deactivate=function(){o.deactivate.call(this)
};k.animateIn=function(){o.animateIn.call(this)};k.onRequestAnimationFrame=function(){o.onRequestAnimationFrame.call(this)
};k.onScroll=function(t,r,q){o.onScroll.call(this,t,r,q);if(!d){return}var s,p=this.scrollAnimations.length;
for(s=0;s<p;s++){this.scrollAnimations[s].handleScroll(r)}};k.onResize=function(r,q,p){o.onResize.call(this,r,q,p)
};k.onBreakpoint=function(s,t,r,p){o.onBreakpoint.call(this,s,t,r,p);if(!d){return
}if(s.name=="xlarge"||t.name=="xlarge"){return}this.breakpoint=s.name;var q=this;
setTimeout(function(){q._destroyScrollAnimations();q._initialize();q.scrollAnimations.forEach(function(u){u.setupEvents()
});q.scrollAnimations.forEach(function(u){u.setScale(s.name)});q.trigger("animation-reinit")
},0)};k.onViewWillAppear=function(q,p){o.onViewWillAppear.call(this,q,p)};k.onViewWillDisappear=function(q,p){o.onViewWillDisappear.call(this,q,p)
};k._destroyScrollAnimations=function(){this.scrollAnimations.forEach(function(p){p.teardownEvents();
p.destroy();p=null});this.scrollAnimations=null};k.destroy=function(){o.destroy.call(this);
this._destroyScrollAnimations()};f.exports=l},{"../scrollAnimation/ScrollAnimation":850,"../utils/BrowserPrefixed":862,"../utils/animationCapable":863,"./MediaObjectSection":857,"ac-dom-metrics":323,"ac-dom-traversal":372,"ac-polyfills/Object/create":569,"ac-viewport":791}],861:[function(g,b,t){g("ac-polyfills/Object/create");
var l=g("ac-dom-traversal").querySelectorAll;var d=g("ac-dom-traversal").querySelector;
var r=g("ac-dom-metrics");var h=g("../utils/BrowserPrefixed");var o=g("../model/EnabledFeatures");
var q=g("ac-viewport").Viewport;var j=g("@marcom/ac-gallery").AutoGallery;var s=g("./BaseSection");
var n=s.prototype;var p=g("../gallery/VideoGalleryItem");var c=g("@marcom/ac-gallery").Item;
var a=g("ac-eclipse").Clip;var m=c.extend({show:function(){if(this._clip){this._clip.destroy();
this._clip=null}this._clip=new a(this._el,0.42,{opacity:1,},{delay:0.06}).play();
c.prototype.show.call(this)},hide:function(){if(this._clip){this._clip.destroy();
this._clip=null}this._clip=new a(this._el,0.42,{opacity:0,}).play();c.prototype.hide.call(this)
}});function f(D,H,F){this.name="VideoGallerySection";this.gallery;this.galleryWrapperElement;
this.galleryViewElement;this.tallestItem;s.call(this,D,H,F);o.init();this.rafWhenVisible=false;
var E=d(".ac-gallery",this.element);var J=E.id;var x=document.getElementById(J);
var v=l(".gallery-content");var w="."+J+"-trigger";var u=d(".togglenav",this.element);
if(u){u.setAttribute("data-ac-gallery-togglenav",J)}this.gallery=new j(x,{enableArrowKeys:true,touch:(!o.IS_HANDHELD),resizeContainer:true,itemType:m});
this.tallestItem={itemHeight:0};this.galleryWrapperElement=this.gallery.getElement();
this.galleryViewElement=d(".gallery-view",this.galleryWrapperElement);var I=this.galleryWrapperElement.parentNode.querySelectorAll(w);
for(var C=0,z=this.gallery.getTotalItems();C<z;C++){var y=I[C];var B="#"+this.gallery.getItemAt(C).getElementId();
var G=new p(d(B),y);var A=d(".ac-video-poster img",G.container);this.gallery.getItemAt(C).videoGalleryItem=G;
if(A){A.setAttribute("alt","")}if(C===0){G.el.style.zIndex=2}if(this.tallestItem.itemHeight<G.itemHeight){this.tallestItem=G
}}this.tallestItem.el.classList.add("gallery-content-tallest");this.gallery.getItemAt(0).getElement().classList.add("show")
}var k=f.prototype=Object.create(s.prototype);f.prototype.constructor=f;k.onUpdate=function(u){if(!u.outgoing){u.incoming[0].videoGalleryItem.el.classList.add("show")
}if(!o.TOUCH){this.galleryWrapperElement.classList.add("video-triggered");u.incoming[0].videoGalleryItem.button.style.display="none"
}};k.onUpdateComplete=function(w){var v=w.incoming[0].videoGalleryItem;var u=w.outgoing[0].videoGalleryItem;
v.el.style.zIndex=2;u.el.style.zIndex=0;if(!o.IS_HANDHELD){v.play()}v.el.classList.add("show");
u.el.classList.remove("show");u.pause()};k.setupEvents=function(){this.gallery.on("update",this.onUpdate.bind(this));
this.gallery.on("update:complete",this.onUpdateComplete.bind(this))};k.teardownEvents=function(){n.teardownEvents.call(this)
};k.activate=function(){n.activate.call(this)};k.deactivate=function(){n.deactivate.call(this)
};k.animateIn=function(){n.animateIn.call(this)};k.onRequestAnimationFrame=function(){n.onRequestAnimationFrame.call(this)
};k.onScroll=function(w,v,u){n.onScroll.call(this,w,v,u)};k.onResize=function(w,v,u){n.onResize.call(this,w,v,u)
};k.onBreakpoint=function(w,x,v,u){};k.onViewWillAppear=function(v,u){n.onViewWillAppear.call(this,v,u)
};k.onViewWillDisappear=function(v,u){n.onViewWillDisappear.call(this,v,u)};k.destroy=function(){n.destroy.call(this)
};b.exports=f},{"../gallery/VideoGalleryItem":803,"../model/EnabledFeatures":810,"../utils/BrowserPrefixed":862,"./BaseSection":852,"@marcom/ac-gallery":245,"ac-dom-metrics":323,"ac-dom-traversal":372,"ac-eclipse":"ac-eclipse","ac-polyfills/Object/create":569,"ac-viewport":791}],862:[function(c,d,a){var b=(function(){var h=["","-webkit-","-moz-","-o-","-ms-"];
var f={"animation-delay":"transitionend","-o-animation-delay":"oTransitionEnd","-moz-animation-delay":"transitionend","-webkit-animation-delay":"webkitTransitionEnd","-ms-animation-delay":"transitionend"};
var m={"animation-delay":"animationstart","-o-animation-delay":"oanimationstart","-moz-animation-delay":"animationstart","-webkit-animation-delay":"webkitAnimationStart","-ms-animation-delay":"MSAnimationStart"};
var j={"animation-delay":"animationiteration","-o-animation-delay":"oanimationiteration","-moz-animation-delay":"animationiteration","-webkit-animation-delay":"webkitAnimationIteration","-ms-animation-delay":"MSAnimationIteration"};
var q={"animation-delay":"animationend","-o-animation-delay":"oanimationend","-moz-animation-delay":"animationend","-webkit-animation-delay":"webkitAnimationEnd","-ms-animation-delay":"MSAnimationEnd"};
var p={"animation-delay":"animation-play-state","-o-animation-delay":"-o-animation-play-state","-moz-animation-delay":"animation-play-state","-webkit-animation-delay":"-webkit-animation-play-state","-ms-animation-delay":"animation-play-state"};
var g=document.createElement("_");var k=["","-webkit-","-moz-","-o-","-ms-"];function o(t){for(var r=0;
r<k.length;r++){var s=h[r]+t;if(g.style[s]!==undefined){return s}}return undefined
}var n=["-webkit-","","-moz-","-o-","-ms-"];function l(t){for(var r=0;r<n.length;
r++){var s=n[r]+t;if(g.style[s]!==undefined){return s}}return undefined}return{transition:o("transition"),filter:l("filter"),transform:o("transform"),transitionDelay:o("transition-delay"),animationDelay:o("animation-delay"),transitionEnd:f[o("animation-delay")],animationStart:m[o("animation-delay")],animationIteration:j[o("animation-delay")],animationEnd:q[o("animation-delay")],animationPlayState:p[o("animation-delay")]}
}());d.exports=b},{}],863:[function(c,d,a){var b=c("ac-browser");var f=c("./isOldTablet");
d.exports=(function(){if(window.location.search.match(/static/)){return false}else{if(f){return false
}else{if(b.os=="iOS"&&parseFloat(b.version)<8){return false}else{if(b.os=="Android"){return false
}else{if(b.name=="IE"){return false}else{return true}}}}}})()},{"./isOldTablet":865,"ac-browser":261}],864:[function(b,c,a){c.exports=function(){var g=document.createElement("p");
g.style.width="100%";g.style.height="200px";var h=document.createElement("div");
h.style.position="absolute";h.style.top="0px";h.style.left="0px";h.style.visibility="hidden";
h.style.width="200px";h.style.height="150px";h.style.overflow="hidden";h.appendChild(g);
document.body.appendChild(h);var f=g.offsetWidth;h.style.overflow="scroll";var d=g.offsetWidth;
if(f==d){d=h.clientWidth}document.body.removeChild(h);return(f-d)}},{}],865:[function(c,d,b){var a=c("ac-feature");
var f=function(){if(!a.isTablet()){return false}if(a.isRetina()){return false}var g=0;
try{var h=document.createElement("canvas");var l=h.getContext("experimental-webgl");
var j=(l.getExtension("EXT_texture_filter_anisotropic")||l.getExtension("MOZ_EXT_texture_filter_anisotropic")||l.getExtension("WEBKIT_EXT_texture_filter_anisotropic"));
if(j){g=l.getParameter(j.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}return g<=2}catch(k){return false
}};d.exports=f()},{"ac-feature":491}],866:[function(b,c,a){c.exports={lerp:function(f,g,d){return g+(d-g)*f
},map:function(j,h,f,g,d){return this.lerp(this.norm(j,h,f),g,d)},norm:function(g,f,d){return(g-f)/(d-f)
},clamp:function(g,f,d){return Math.max(f,Math.min(d,g))},randFloat:function(f,d){return(Math.random()*(d-f))+f
},randInt:function(f,d){return Math.floor((Math.random()*(d-f))+f)}}},{}],867:[function(b,c,a){c.exports={"gradient-pass":"varying vec2 vUV;\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nuniform sampler2D maskMap;\nuniform sampler2D gradientMap;\nuniform float progress;\n\nvoid main() {\n\tvec4 maskPixel = texture2D(maskMap, vUV);\n\n\tvec2 pixelLocation = vUV;\n\tpixelLocation.y += -0.5 + ( progress );\n\n\tvec4 gradientPixel = texture2D(gradientMap, pixelLocation);\n\n\tgl_FragColor = gradientPixel;\n\tgl_FragColor.a *= maskPixel.r;\n}","material-capture":"varying vec2 vUV;\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nuniform sampler2D maskMap;\nuniform sampler2D matcapMap;\nuniform sampler2D normalMap;\nuniform float progress;\n\nvec4 rotate( float Angle, vec4 vect) {\n\tmat4 RotationMatrix = mat4( cos( Angle ), -sin( Angle ), 0.0, 0.0,\n\t\t\t\t\t\t    sin( Angle ),  cos( Angle ), 0.0, 0.0,\n\t\t\t\t\t\t             0.0,           0.0, 1.0, 0.0,\n\t\t\t\t\t\t\t     0.0,           0.0, 0.0, 1.0 );\n\treturn vect * RotationMatrix;\n\n}\n\nvoid main() {\n\tvec4 maskPixel = texture2D(maskMap, vUV);\n\tvec4 normalPixel = texture2D(normalMap, vUV );\n\n\tnormalPixel.xy -= 0.5;\n\tnormalPixel = rotate( progress, normalPixel);\n\tnormalPixel.xy += 0.5;\n\n\tvec4 resultPixel = texture2D(matcapMap, normalPixel.xy);\n\n\tgl_FragColor = resultPixel;\n\tgl_FragColor.a *= maskPixel.r;\n}","shadow-pass":"varying vec2 vUV;\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nuniform sampler2D shadowMap;\n\nuniform vec3 maskCenter;\nuniform float bloom;\nuniform float feather;\nuniform float distanceX;\nuniform float distanceY;\nuniform float rotate;\nuniform float dropOffX;\nuniform float dropOffY;\n\nfloat ease(float pi) {\t\t\t\t\n\tfloat ip = 1.0-pi;\n\t\treturn \t3.*ip*ip*pi*(0.05) + 3.*ip*pi*pi*(0.95) + 1.0*pi*pi*pi; \n\t}\n\nvec4 rotateVec4( float Angle, vec4 vect) {\n\tmat4 RotationMatrix = mat4( cos( Angle ), -sin( Angle ), 0.0, 0.0,\n\t\t\t\t\t\t    sin( Angle ),  cos( Angle ), 0.0, 0.0,\n\t\t\t\t\t\t             0.0,           0.0, 1.0, 0.0,\n\t\t\t\t\t\t\t     0.0,           0.0, 0.0, 1.0 );\n\treturn vect * RotationMatrix;\n}\n\nvec2 rotateVec2( float Angle, vec2 vect) {\n\tmat2 RotationMatrix = mat2( cos( Angle ), -sin( Angle ),\n\t\t\t\t\t\t    sin( Angle ),  cos( Angle ));\n\treturn vect * RotationMatrix;\n}\n\nvoid main() {\n\tvec4 shadowPixel = texture2D(shadowMap, vUV);\n\n\tvec2 shadowLength = ( rotateVec2( rotate, maskCenter.xy - vUV ) + 0.5 ) * bloom;\n\t\n\tshadowLength.x *= distanceX;\n\tshadowLength.y *= distanceY;\n\n\tvec2 offset;\n\toffset.x = dropOffX;\n\toffset.y = dropOffY;\n\n\tfloat m = ease(min( 1.0, length(shadowLength) ));\n\n\tm += offset.x * (maskCenter.x - vUV.x);\n\tm += offset.y * (maskCenter.y - vUV.y);\n\n\tif (shadowPixel.a > 0.0) {\n\t\tshadowPixel.a = 1.0 - m;\n\t}\n\n\tgl_FragColor = shadowPixel;\n\n}",vertex:"varying vec2 vUV;\nvoid main() {\n\tvUV = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}"}
},{}],868:[function(c,b,f){var g;var m=c("ac-console").log;var o=c("ac-event-emitter-micro").EventEmitterMicro;
var d=c("ac-object");var a=c("ac-classlist");var l=c("ac-viewport").Viewport;var h=c("ac-cname").cname;
var n=false;var k="/105/media/us/iphone-6s/2015/dhs3b549_75f9_422a_9470_4a09e709b350/webgl";
var j="";var p=function(r,q,s){o.call(this);this.context=r;this.options=q;this._renderingReady=false;
this._texturesReady=false;this._shouldUpdate=true;this._progressValue=null;this._renderCount=0;
this._boundOnTextureLoaded=this._onTextureLoaded.bind(this);this.dpr=1;if(window.devicePixelRatio>1.5){this.dpr=2
}this.width=this.options.width;this.height=this.options.height;this.breakpointName=l.getBreakpoint().name;
if(s){return}this._boundOnBaseGLBreakpoint=this._onBaseGLBreakpoint.bind(this);
l.on("breakpoint",this._boundOnBaseGLBreakpoint)};g=p.prototype=d.create(o.prototype);
g.initialize=function(){this.createScene();this.createMesh();this.scene.add(this.mesh)
};g.composerPasses=0;g.cameraOptions={nearClip:1,farClip:1000,fov:45};g.rendersBeforeVisible=2;
g.assetKeys={};g.sceneOptions={mipmap:1};g.useGLScale=false;g.activeClassName="active";
g.createMesh=function(){};g.render=function(){};g.createScene=function(){this.scene=new THREE.Scene();
this.renderer=new THREE.WebGLRenderer({antialias:false,transparent:true,preserveDrawingBuffer:false,alpha:true});
this.renderer.setClearColor(16777215,0);this.el=this.renderer.domElement;if(this.options.className){this.el.className=this.options.className
}a.add(this.el,"webgl-object");this.createCamera()};g.createCamera=function(){this.camera=new THREE.OrthographicCamera(-this.width/2,this.width/2,this.height/2,-this.height/2,this.cameraOptions.nearClip,this.cameraOptions.farClip);
this.camera.position.z=1;this.camera.lookAt(new THREE.Vector3())};g.getTextureUniforms=function(r){var q={};
this._texturesLoaded=0;this._texturesRequired=Object.keys(r).length;var s;for(s in r){if(r.hasOwnProperty(s)){q[s]={type:"t",value:this.loadTexture(r[s])};
if(this.magFilter){q[s].value.magFilter=THREE[this.magFilter]}if(this.minFilter){q[s].value.minFilter=THREE[this.minFilter]
}}}return q};g.getAssetURL=function(w,y){y=y||{};var x=y.baseAssetPath||k;var v=y.extension||"png";
var s="";var r="_2x";var u="_8k";v="."+v;if(!y.ignoreBreakpoint){var t=this.breakpointName;
if(t==="xlarge"&&!y.allowXLarge){t="large"}s+="_"+t}if(y.maxResolution){s+=u}if(y.retina===true){s+=r
}else{if(y.retina===false){s+=""}else{var q="";if(this.dpr>1.5){q=r}s+=q}}if(y.subpath){x+="/"+y.subpath
}else{if(this.options.subpath){x+="/"+this.options.subpath}}return h.formatUrl(x,w+s,v)
};g.getWagnerShaderURL=function(q){var r=h.addPrefix(k+"/"+j+"/"+q);return r};g.reflowImageTextures=function(){this._texturesReady=false;
this._renderCount=0;a.remove(this.el,this.activeClassName);var s=this.getImageTextureUniforms(),q=false;
var r;for(r in s){if(s.hasOwnProperty(r)&&this.mesh&&this.mesh.material&&this.mesh.material.uniforms[r]){q=true;
this.mesh.material.uniforms[r].value=s[r].value}}if(!q){this._texturesReady=true
}};g.getImagePaths=function(){};g.getImageTextureUniforms=function(){return this.getTextureUniforms(this.getImagePaths())
};g.loadTexture=function(q){THREE.ImageUtils.crossOrigin="";return THREE.ImageUtils.loadTexture(q,undefined,this._boundOnTextureLoaded)
};g._onTextureLoaded=function(q){if(q&&q.image&&q.image.complete){this._texturesLoaded++;
this.trigger("texture-loaded");if(this._texturesRequired>=this._texturesLoaded){this._texturesReady=true;
this.trigger("textures-loaded")}}};g._onBaseGLBreakpoint=function(){this.breakpointName=l.getBreakpoint().name;
this.reflowImageTextures();this.setSize()};g.setComposer=function(r,q){};g.setSize=function(){var t=this.getSizeForBreakpoint();
if(t){this.width=this.height=t}var s=this.width*this.dpr*this.sceneOptions.mipmap,r=this.height*this.dpr*this.sceneOptions.mipmap;
if(this.useGLScale){if(!this.renderTexture){var q={};if(this.minFilter){q.minFilter=THREE[this.minFilter]
}if(this.magFilter){q.magFilter=THREE[this.magFilter]}this.renderTexture=new THREE.WebGLRenderTarget(s,r,q);
this.renderTextureMaterial=new THREE.MeshBasicMaterial({map:this.renderTexture})
}else{this.renderTexture.setSize(s,r)}if(!this.renderGeometry){this.renderGeometry=new THREE.PlaneGeometry(this.width,this.height,1)
}else{this.renderGeometry.width=this.width;this.renderGeometry.height=this.height
}if(!this.renderMesh){this.renderMesh=new THREE.Mesh(this.renderGeometry,this.renderTextureMaterial);
this.renderScene=new THREE.Scene();this.renderScene.add(this.renderMesh)}}if(this.useGLScale){this.renderer.setSize(this.width*this.dpr,this.height*this.dpr)
}else{this.renderer.setSize(s,r)}this.el.style.width=this.width+"px";this.el.style.height=this.height+"px";
this._renderingReady=true};g.resizeTo=function(r,q){this.width=r;this.height=q;
this.camera.left=-this.width/2;this.camera.right=this.width/2;this.camera.bottom=this.height/2;
this.camera.top=-this.height/2;this.setSize()};g.getSizeForBreakpoint=function(){if(!this.sizes){return null
}var q=l.getBreakpoint().name;if(typeof this.sizes[q]==="number"){return this.sizes[q]
}return this.sizes.defaults};g.drawScene=function(){if(!this._renderingReady||!this._texturesReady){return
}if(this.camera instanceof THREE.Camera===false){this.createCamera();this.setSize();
this.drawScene();return}this.render();if(!this._shouldUpdate){return}var q=this.scene;
if(this.useGLScale){this.renderer.render(q,this.camera,this.renderTexture);q=this.renderScene
}if(this.composerPasses){}else{this.renderer.render(q,this.camera)}if(this._renderCount===this.rendersBeforeVisible){a.add(this.el,this.activeClassName)
}this._renderCount++};g.destroy=function(){this.off();var q;for(q in this){if(this.hasOwnProperty(q)){this[q]=null
}}};b.exports=p},{"ac-classlist":272,"ac-cname":289,"ac-console":291,"ac-event-emitter-micro":478,"ac-object":554,"ac-viewport":791}],869:[function(b,a,d){var h=b("./ProgressShaderPlayer"),j=b("ac-viewport").Viewport,g=b("ac-cname").cname,c=b("ac-object");
var f;var k=function(m,l){h.call(this,m,l);if(!this.settings){this.settings={}}this.updateSettings();
j.on("breakpoint",this.updateSettings.bind(this))};f=k.prototype=c.create(h.prototype);
f.ranges={min:-1,max:1};f.sceneOptions={mipmap:2};f.initializeGui=function(){};
f._initializeGui=function(){};f.updateSettings=function(){var l=this.breakpointName||j.getBreakpoint().name;
if(this.settings&&this.animationRanges&&this.animationRanges[l]){this.settings.scrollMin=this.animationRanges[l].min;
this.settings.scrollMax=this.animationRanges[l].max}};f.render=function(){var q={min:this.ranges.min,max:this.ranges.max},o,n=Math.sin(Date.now()/1000),p=(q.max-n)/(q.max-q.min),m=p,l;
if(o){m=(p*(o.max-o.min))+o.min}else{m=(p*(q.max-q.min))+q.min}this.setProgress(m)
};a.exports=k},{"./ProgressShaderPlayer":870,"ac-cname":289,"ac-object":554,"ac-viewport":791}],870:[function(c,f,b){var d=c("./BaseWebGLObject"),j=c("ac-classlist"),a=c("ac-object");
var h;var g=function(l,k){d.call(this,l,k);this._progressValue=null;this._shouldUpdate=true
};h=g.prototype=a.create(d.prototype);h.meshOptions={};h.createMesh=function(){var k=this.meshOptions;
this.geometry=new THREE.PlaneGeometry(1,1,5,5);k.uniforms=k.uniforms||{};if(!k.uniforms.progress){k.uniforms.progress={type:"f",value:0}
}this.material=new THREE.ShaderMaterial({transparent:true,vertexShader:k.vertexShader,fragmentShader:k.fragmentShader,uniforms:k.uniforms});
this.mesh=new THREE.Mesh(this.geometry,this.material);this.mesh.position.set(0,0,0);
this.mesh.scale.set(this.options.width,this.options.height,(this.options.width+this.options.height)/2)
};h.setProgress=function(k){this.mesh.material.uniforms.progress.value=k};f.exports=g
},{"./BaseWebGLObject":868,"ac-classlist":272,"ac-object":554}],871:[function(d,f,c){var h=d("./ProgressShaderPlayer"),b=d("ac-object");
var g;var a=function(k,j){h.call(this,k,j);this._didRequestGui=false};g=a.prototype=b.create(h.prototype);
g.textureFilter="LinearFilter";g.initializeGui=function(){};g._initializeGui=function(){};
f.exports=a},{"./ProgressShaderPlayer":870,"ac-object":554}],872:[function(d,b,h){var j=d("ac-dom-traversal/querySelector");
var g=d("./_shared/model/DataAttributes");var m=d("./_shared/model/PageMap");var c=d("./_shared/model/EnabledFeatures");
var l=d("../../../node_modules/ac-toolkit/src/json/exports.json");var a=d("ac-dom-traversal");
var f=d("ac-viewport").Viewport;var k=(function(){return{initialize:function(){this.initFadeTimer();
f.setBreakpoints(l.viewports);c.init();this.instantiatePageController();this.initWebGL()
},instantiatePageController:function(){var o=j("main["+g.PAGE_TYPE+"]");if(o===null){throw"No valid <main> tag found with correct page type attribute"
}var n=o.getAttribute(g.PAGE_TYPE);if(!m.hasOwnProperty(n)){throw"Failed to init no page type called '"+n+"' found"
}new m[n]()},initWebGL:function(){if(c.WEB_GL){var n=document.querySelector("[data-three-location]");
if(!n){return}var p=document.createElement("script");p.src=n.getAttribute("data-three-location");
document.body.appendChild(p);var o=setInterval(function(){if(!!window.THREE){clearInterval(o)
}}.bind(this),200)}},initFadeTimer:function(){AC.fadeTimer=setTimeout(function(){a.querySelectorAll("[data-scroll-animation]").forEach(function(n){if(!n.classList.contains("show")){n.classList.add("show")
}})},2000)}}}());b.exports=k.initialize()},{"../../../node_modules/ac-toolkit/src/json/exports.json":697,"./_shared/model/DataAttributes":809,"./_shared/model/EnabledFeatures":810,"./_shared/model/PageMap":811,"ac-dom-traversal":372,"ac-dom-traversal/querySelector":381,"ac-viewport":791}]},{},[872]);