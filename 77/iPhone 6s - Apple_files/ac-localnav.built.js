require=(function e(h,j,l){function m(a,c){if(!j[a]){if(!h[a]){var d=typeof require=="function"&&require;
if(!c&&d){return d(a,!0)}if(i){return i(a,!0)}throw new Error("Cannot find module '"+a+"'")
}var b=j[a]={exports:{}};h[a][0].call(b.exports,function(g){var f=h[a][1][g];return m(f?f:g)
},b,b.exports,e,h,j,l)}return j[a].exports}var i=typeof require=="function"&&require;
for(var k=0;k<l.length;k++){m(l[k])}return m})({1:[function(n,m,i){var l=n("./ac-browser/BrowserData");
var j=/applewebkit/i;var k=n("./ac-browser/IE");var o=l.create();o.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!j.test(a):false};o.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(o.name==="IE"){o.IE={documentMode:k.getDocumentMode()}}m.exports=o},{"./ac-browser/BrowserData":2,"./ac-browser/IE":3}],2:[function(g,k,h){g("@marcom/ac-polyfills/Array/prototype.filter");
g("@marcom/ac-polyfills/Array/prototype.some");var j=g("./data");function i(){}i.prototype={__getBrowserVersion:function(c,b){var d;
if(!c||!b){return}var a=j.browser.filter(function(f){return f.identity===b});a.some(function(f){var o=f.versionSearch||b;
var n=c.indexOf(o);if(n>-1){d=parseFloat(c.substring(n+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":4,"@marcom/ac-polyfills/Array/prototype.filter":69,"@marcom/ac-polyfills/Array/prototype.some":74}],3:[function(d,g,f){g.exports={getDocumentMode:function(){var a;
if(document.documentMode){a=parseInt(document.documentMode,10)}else{a=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){a=7
}}}return a}}},{}],4:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],5:[function(g,k,h){g("@marcom/ac-polyfills/Array/prototype.slice");g("@marcom/ac-polyfills/Element/prototype.classList");
var j=g("./className/add");k.exports=function i(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a);
return}for(c=0;c<a.length;c++){j(b,a[c])}}},{"./className/add":7,"@marcom/ac-polyfills/Array/prototype.slice":73,"@marcom/ac-polyfills/Element/prototype.classList":75}],6:[function(d,g,f){g.exports={add:d("./className/add"),contains:d("./className/contains"),remove:d("./className/remove")}
},{"./className/add":7,"./className/contains":8,"./className/remove":10}],7:[function(g,k,h){var j=g("./contains");
k.exports=function i(a,b){if(!j(a,b)){a.className+=" "+b}}},{"./contains":8}],8:[function(g,k,h){var i=g("./getTokenRegExp");
k.exports=function j(a,b){return i(b).test(a.className)}},{"./getTokenRegExp":9}],9:[function(f,i,g){i.exports=function h(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
}},{}],10:[function(m,l,h){var k=m("./contains");var j=m("./getTokenRegExp");l.exports=function i(a,b){if(k(a,b)){a.className=a.className.replace(j(b),"$1").trim()
}}},{"./contains":8,"./getTokenRegExp":9}],11:[function(g,j,h){g("@marcom/ac-polyfills/Element/prototype.classList");
var i=g("./className/contains");j.exports=function k(a,b){if(a.classList&&a.classList.contains){return a.classList.contains(b)
}return i(a,b)}},{"./className/contains":8,"@marcom/ac-polyfills/Element/prototype.classList":75}],12:[function(d,g,f){g.exports={add:d("./add"),contains:d("./contains"),remove:d("./remove"),toggle:d("./toggle")}
},{"./add":5,"./contains":11,"./remove":13,"./toggle":14}],13:[function(j,i,k){j("@marcom/ac-polyfills/Array/prototype.slice");
j("@marcom/ac-polyfills/Element/prototype.classList");var g=j("./className/remove");
i.exports=function h(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
var c;if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a);
return}for(c=0;c<a.length;c++){g(b,a[c])}}},{"./className/remove":10,"@marcom/ac-polyfills/Array/prototype.slice":73,"@marcom/ac-polyfills/Element/prototype.classList":75}],14:[function(k,j,g){k("@marcom/ac-polyfills/Element/prototype.classList");
var i=k("./className");j.exports=function h(b,c,a){var d=(typeof a!=="undefined");
var f;if(b.classList&&b.classList.toggle){if(d){return b.classList.toggle(c,a)}return b.classList.toggle(c)
}if(d){f=!!a}else{f=!i.contains(b,c)}if(f){i.add(b,c)}else{i.remove(b,c)}return f
}},{"./className":6,"@marcom/ac-polyfills/Element/prototype.classList":75}],15:[function(o,n,i){var l=o("@marcom/ac-prefixer/getStyleValue");
var m=o("@marcom/ac-prefixer/getStyleProperty");var k=o("@marcom/ac-function/memoize");
function j(a,b){if(typeof b!=="undefined"){return !!l(a,b)}else{return !!m(a)}}n.exports=k(j);
n.exports.original=j},{"@marcom/ac-function/memoize":18,"@marcom/ac-prefixer/getStyleProperty":20,"@marcom/ac-prefixer/getStyleValue":21}],16:[function(d,g,f){g.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],17:[function(m,l,h){m("@marcom/ac-polyfills/matchMedia");var j=m("./helpers/globals");
var k=m("@marcom/ac-function/once");function i(){var a=j.getWindow();var b=a.matchMedia("only all");
return !!(b&&b.matches)}l.exports=k(i);l.exports.original=i},{"./helpers/globals":16,"@marcom/ac-function/once":19,"@marcom/ac-polyfills/matchMedia":81}],18:[function(k,j,g){var h=function(){var a="";
var b;for(b=0;b<arguments.length;b++){if(b>0){a+=","}a+=arguments[b]}return a};
j.exports=function i(a,b){b=b||h;var c=function(){var f=arguments;var d=b.apply(this,f);
if(!(d in c.cache)){c.cache[d]=a.apply(this,f)}return c.cache[d]};c.cache={};return c
}},{}],19:[function(f,i,g){i.exports=function h(a){var b;return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)
}return b}}},{}],20:[function(q,r,o){var u=q("./shared/stylePropertyCache");var n=q("./shared/getStyleTestElement");
var t=q("./utils/toCSS");var l=q("./utils/toDOM");var m=q("./shared/prefixHelper");
var s=function(c,b){var a=t(c);var d=(b===false)?false:t(b);u[c]=u[b]=u[a]=u[d]={dom:b,css:d};
return b};r.exports=function p(c){var f;var b;var d;var a;c+="";if(c in u){return u[c].dom
}d=n();c=l(c);b=c.charAt(0).toUpperCase()+c.substring(1);if(c==="filter"){f=["WebkitFilter","filter"]
}else{f=(c+" "+m.dom.join(b+" ")+b).split(" ")}for(a=0;a<f.length;a++){if(typeof d.style[f[a]]!=="undefined"){if(a!==0){m.reduce(a-1)
}return s(c,f[a])}}return s(c,false)}},{"./shared/getStyleTestElement":22,"./shared/prefixHelper":23,"./shared/stylePropertyCache":24,"./utils/toCSS":26,"./utils/toDOM":27}],21:[function(t,v,q){var s=t("./getStyleProperty");
var n=t("./shared/styleValueAvailable");var o=t("./shared/prefixHelper");var w=t("./shared/stylePropertyCache");
var p={};var m=/(\([^\)]+\))/gi;var r=/([^ ,;\(]+(\([^\)]+\))?)/gi;v.exports=function u(b,c){var a;
c+="";b=s(b);if(!b){return false}if(n(b,c)){return c}a=w[b].css;c=c.replace(r,function(h){var i;
var d;var f;var g;if(h[0]==="#"||!isNaN(h[0])){return h}d=h.replace(m,"");f=a+":"+d;
if(f in p){if(p[f]===false){return""}return h.replace(d,p[f])}i=o.css.map(function(j){return j+h
});i=[h].concat(i);for(g=0;g<i.length;g++){if(n(b,i[g])){if(g!==0){o.reduce(g-1)
}p[f]=i[g].replace(m,"");return i[g]}}p[f]=false;return""});c=c.trim();return(c==="")?false:c
}},{"./getStyleProperty":20,"./shared/prefixHelper":23,"./shared/stylePropertyCache":24,"./shared/styleValueAvailable":25}],22:[function(k,j,g){var i;
j.exports=function h(){if(!i){i=document.createElement("_")}else{i.style.cssText="";
i.removeAttribute("style")}return i};j.exports.resetElement=function(){i=null}},{}],23:[function(j,p,k){var l=["-webkit-","-moz-","-ms-"];
var o=["Webkit","Moz","ms"];var m=["webkit","moz","ms"];var q=function(){this.initialize()
};var n=q.prototype;n.initialize=function(){this.reduced=false;this.css=l;this.dom=o;
this.evt=m};n.reduce=function(a){if(!this.reduced){this.reduced=true;this.css=[this.css[a]];
this.dom=[this.dom[a]];this.evt=[this.evt[a]]}};p.exports=new q()},{}],24:[function(d,g,f){g.exports={}
},{}],25:[function(s,t,r){var u=s("./stylePropertyCache");var q=s("./getStyleTestElement");
var n=false;var l;var m;var p=function(){var b;if(!n){n=true;l=("CSS" in window&&"supports" in window.CSS);
m=false;b=q();try{b.style.width="invalid"}catch(a){m=true}}};t.exports=function o(d,f){var a;
var b;p();if(l){d=u[d].css;return CSS.supports(d,f)}b=q();a=b.style[d];if(m){try{b.style[d]=f
}catch(c){return false}}else{b.style[d]=f}return(b.style[d]&&b.style[d]!==a)};t.exports.resetFlags=function(){n=false
}},{"./getStyleTestElement":22,"./stylePropertyCache":24}],26:[function(k,j,g){var i=/^(webkit|moz|ms)/gi;
j.exports=function h(a){var b;if(a.toLowerCase()==="cssfloat"){return"float"}if(i.test(a)){a="-"+a
}return a.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],27:[function(g,k,h){var i=/-([a-z])/g;k.exports=function j(a){var b;if(a.toLowerCase()==="float"){return"cssFloat"
}a=a.replace(i,function(c,d){return d.toUpperCase()});if(a.substr(0,2)==="Ms"){a="ms"+a.substring(2)
}return a}},{}],28:[function(m,l,h){var j=m("./helpers/globals");var k=m("@marcom/ac-function/once");
function i(){var a=j.getDocument();return !!a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":16,"@marcom/ac-function/once":19}],29:[function(m,l,h){var j=m("./helpers/globals");
var k=m("@marcom/ac-function/once");function i(){var a=j.getWindow();var c=j.getDocument();
var b=j.getNavigator();return !!(("ontouchstart" in a)||(a.DocumentTouch&&c instanceof a.DocumentTouch)||(b.maxTouchPoints>0)||(b.msMaxTouchPoints>0))
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":16,"@marcom/ac-function/once":19}],30:[function(j,p,k){var n=j("@marcom/ac-classlist/add");
var m=j("@marcom/ac-classlist/remove");var l=j("@marcom/ac-object/extend");var q=function(b,a){this._target=b;
this._tests={};this.addTests(a)};var o=q.prototype;o.addTests=function(a){this._tests=l(this._tests,a||{})
};o._supports=function(a){if(typeof this._tests[a]==="undefined"){return false}if(typeof this._tests[a]==="function"){this._tests[a]=this._tests[a]()
}return this._tests[a]};o._addClass=function(a,b){b=b||"no-";if(this._supports(a)){n(this._target,a)
}else{n(this._target,b+a)}};o.htmlClass=function(){var a;m(this._target,"no-js");
n(this._target,"js");for(a in this._tests){if(this._tests.hasOwnProperty(a)){this._addClass(a)
}}};p.exports=q},{"@marcom/ac-classlist/add":5,"@marcom/ac-classlist/remove":13,"@marcom/ac-object/extend":31}],31:[function(k,j,g){k("@marcom/ac-polyfills/Array/prototype.forEach");
var h=Object.prototype.hasOwnProperty;j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]
}else{a=[].slice.call(arguments)}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{"@marcom/ac-polyfills/Array/prototype.forEach":70}],32:[function(i,h,g){h.exports=function f(a){a=a||window.event;
if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}}},{}],33:[function(f,i,g){i.exports=function h(a){a=a||window.event;
return(typeof a.target!=="undefined")?a.target:a.srcElement}},{}],34:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],35:[function(i,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageYOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollTop}},{}],36:[function(d,g,f){g.exports=8},{}],37:[function(d,g,f){g.exports=11
},{}],38:[function(d,g,f){g.exports=9},{}],39:[function(d,g,f){g.exports=1},{}],40:[function(d,g,f){g.exports=3
},{}],41:[function(i,h,g){h.exports=function f(a,b){if("hasAttribute" in a){return a.hasAttribute(b)
}return(a.attributes.getNamedItem(b)!==null)}},{}],42:[function(k,j,h){var i=k("./internal/validate");
j.exports=function g(b,a){i.insertNode(b,true,"insertBefore");i.childNode(a,true,"insertBefore");
i.hasParentNode(a,"insertBefore");return a.parentNode.insertBefore(b,a)}},{"./internal/validate":44}],43:[function(g,k,h){var j=g("../isNode");
k.exports=function i(a,b){if(!j(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":47}],44:[function(z,B,w){var D=z("./isNodeType");
var C=z("../COMMENT_NODE");var v=z("../DOCUMENT_FRAGMENT_NODE");var x=z("../ELEMENT_NODE");
var y=z("../TEXT_NODE");var t=[x,y,C,v];var A=" must be an Element, TextNode, Comment, or Document Fragment";
var q=[x,y,C];var u=" must be an Element, TextNode, or Comment";var s=[x,v];var r=" must be an Element, or Document Fragment";
var E=" must have a parentNode";B.exports={parentNode:function(d,a,b,c){c=c||"target";
if((d||a)&&!D(d,s)){throw new TypeError(b+": "+c+r)}},childNode:function(d,a,b,c){c=c||"target";
if(!d&&!a){return}if(!D(d,q)){throw new TypeError(b+": "+c+u)}},insertNode:function(d,a,b,c){c=c||"node";
if(!d&&!a){return}if(!D(d,t)){throw new TypeError(b+": "+c+A)}},hasParentNode:function(c,a,b){b=b||"target";
if(!c.parentNode){throw new TypeError(a+": "+b+E)}}}},{"../COMMENT_NODE":36,"../DOCUMENT_FRAGMENT_NODE":37,"../ELEMENT_NODE":39,"../TEXT_NODE":40,"./isNodeType":43}],45:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./DOCUMENT_FRAGMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./DOCUMENT_FRAGMENT_NODE":37,"./internal/isNodeType":43}],46:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./ELEMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./ELEMENT_NODE":39,"./internal/isNodeType":43}],47:[function(f,i,g){i.exports=function h(a){return !!(a&&a.nodeType)
}},{}],48:[function(k,j,g){var i=k("./internal/validate");j.exports=function h(a){i.childNode(a,true,"remove");
if(!a.parentNode){return a}return a.parentNode.removeChild(a)}},{"./internal/validate":44}],49:[function(o,m,i){var l=o("@marcom/ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");m.exports=function n(a,b,c){k.childNode(a,true,"ancestors");
k.selector(b,false,"ancestors");if(c&&l(a)&&(!b||j(a,b))){return a}if(a!==document.body){while((a=a.parentNode)&&l(a)){if(!b||j(a,b)){return a
}if(a===document.body){break}}}return null}},{"./internal/validate":52,"./matchesSelector":53,"@marcom/ac-dom-nodes/isElement":46}],50:[function(o,n,i){var l=o("@marcom/ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function m(a,c,d){var b=[];
k.childNode(a,true,"ancestors");k.selector(c,false,"ancestors");if(d&&l(a)&&(!c||j(a,c))){b.push(a)
}if(a!==document.body){while((a=a.parentNode)&&l(a)){if(!c||j(a,c)){b.push(a)}if(a===document.body){break
}}}return b}},{"./internal/validate":52,"./matchesSelector":53,"@marcom/ac-dom-nodes/isElement":46}],51:[function(d,g,f){g.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],52:[function(z,C,x){z("@marcom/ac-polyfills/Array/prototype.indexOf");
var r=z("@marcom/ac-dom-nodes/isNode");var D=z("@marcom/ac-dom-nodes/COMMENT_NODE");
var v=z("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");var w=z("@marcom/ac-dom-nodes/DOCUMENT_NODE");
var y=z("@marcom/ac-dom-nodes/ELEMENT_NODE");var A=z("@marcom/ac-dom-nodes/TEXT_NODE");
var E=function(a,b){if(!r(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)};var t=[y,w,v];var s=" must be an Element, Document, or Document Fragment";
var q=[y,A,D];var u=" must be an Element, TextNode, or Comment";var B=" must be a string";
C.exports={parentNode:function(d,a,b,c){c=c||"node";if((d||a)&&!E(d,t)){throw new TypeError(b+": "+c+s)
}},childNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!E(d,q)){throw new TypeError(b+": "+c+u)
}},selector:function(d,a,b,c){c=c||"selector";if((d||a)&&typeof d!=="string"){throw new TypeError(b+": "+c+B)
}}}},{"@marcom/ac-dom-nodes/COMMENT_NODE":36,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":37,"@marcom/ac-dom-nodes/DOCUMENT_NODE":38,"@marcom/ac-dom-nodes/ELEMENT_NODE":39,"@marcom/ac-dom-nodes/TEXT_NODE":40,"@marcom/ac-dom-nodes/isNode":47,"@marcom/ac-polyfills/Array/prototype.indexOf":71}],53:[function(p,o,q){var n=p("@marcom/ac-dom-nodes/isElement");
var l=p("./internal/validate");var k=p("./internal/nativeMatches");var m=p("./shims/matchesSelector");
o.exports=function j(a,b){l.selector(b,true,"matchesSelector");if(!n(a)){return false
}if(!k){return m(a,b)}return k.call(a,b)}},{"./internal/nativeMatches":51,"./internal/validate":52,"./shims/matchesSelector":56,"@marcom/ac-dom-nodes/isElement":46}],54:[function(o,n,j){var k=o("./internal/validate");
var i=o("./shims/querySelector");var l=("querySelector" in document);n.exports=function m(b,a){a=a||document;
k.parentNode(a,true,"querySelector","context");k.selector(b,true,"querySelector");
if(!l){return i(b,a)}return a.querySelector(b)}},{"./internal/validate":52,"./shims/querySelector":57}],55:[function(i,o,j){i("@marcom/ac-polyfills/Array/prototype.slice");
var k=i("./internal/validate");var l=i("./shims/querySelectorAll");var m=("querySelectorAll" in document);
o.exports=function n(b,a){a=a||document;k.parentNode(a,true,"querySelectorAll","context");
k.selector(b,true,"querySelectorAll");if(!m){return l(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":52,"./shims/querySelectorAll":58,"@marcom/ac-polyfills/Array/prototype.slice":73}],56:[function(k,j,g){var i=k("../querySelectorAll");
j.exports=function h(a,f){var b=a.parentNode||document;var d=i(f,b);var c;for(c=0;
c<d.length;c++){if(d[c]===a){return true}}return false}},{"../querySelectorAll":55}],57:[function(g,k,h){var j=g("./querySelectorAll");
k.exports=function i(b,a){var c=j(b,a);return c.length?c[0]:null}},{"./querySelectorAll":58}],58:[function(s,t,q){s("@marcom/ac-polyfills/Array/prototype.indexOf");
var m=s("@marcom/ac-dom-nodes/isElement");var o=s("@marcom/ac-dom-nodes/isDocumentFragment");
var l=s("@marcom/ac-dom-nodes/remove");var r="_ac_qsa_";var n=function(c,b){var a;
if(b===document){return true}a=c;while((a=a.parentNode)&&m(a)){if(a===b){return true
}}return false};var p=function(a){if("recalc" in a){a.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};t.exports=function u(b,g){var d=document.createElement();
var c=r+(Math.random()+"").slice(-6);var a=[];var f;g=g||document;document[c]=[];
d.innerHTML="x<style>*{display:recalc;}"+b+'{ac-qsa:expression(document["'+c+'"] && document["'+c+'"].push(this));}';
d=d.lastChild;if(o(g)){g.appendChild(d)}else{document.documentElement.firstChild.appendChild(d)
}p(g);while(document[c].length){f=document[c].shift();f.style.removeAttribute("ac-qsa");
if(a.indexOf(f)===-1&&n(f,g)){a.push(f)}}document[c]=null;l(d);p(g);return a}},{"@marcom/ac-dom-nodes/isDocumentFragment":45,"@marcom/ac-dom-nodes/isElement":46,"@marcom/ac-dom-nodes/remove":48,"@marcom/ac-polyfills/Array/prototype.indexOf":71}],59:[function(d,g,f){g.exports={EventEmitterMicro:d("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":60}],60:[function(g,k,h){function i(){this._events={}
}var j=i.prototype;j.on=function(b,a){this._events[b]=this._events[b]||[];this._events[b].unshift(a)
};j.once=function(d,a){var b=this;function c(f){b.off(d,c);if(f!==undefined){a(f)
}else{a()}}this.on(d,c)};j.off=function(c,a){if(!this.has(c)){return}var b=this._events[c].indexOf(a);
if(b===-1){return}this._events[c].splice(b,1)};j.trigger=function(c,a){if(!this.has(c)){return
}for(var b=this._events[c].length-1;b>=0;b--){if(a!==undefined){this._events[c][b](a)
}else{this._events[c][b]()}}};j.has=function(a){if(a in this._events===false||this._events[a].length===0){return false
}return true};j.destroy=function(){for(var a in this._events){this._events[a]=null
}this._events=null};k.exports=i},{}],61:[function(g,k,h){var i=g("./extend");k.exports=function j(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return i({},a,b)}},{"./extend":62}],62:[function(d,g,f){g.exports=d(31)},{"@marcom/ac-polyfills/Array/prototype.forEach":70}],63:[function(t,u,r){t("@marcom/ac-polyfills/Function/prototype.bind");
t("@marcom/ac-polyfills/Object/keys");t("@marcom/ac-polyfills/Object/create");var l=t("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var o=t("@marcom/ac-dom-events/utils/addEventListener");var p=t("@marcom/ac-feature/mediaQueriesAvailable");
var s="viewport-emitter";var n="::before";function m(a){l.call(this);this._initializeElement(a);
if(p()){this._update=this._update.bind(this);o(window,"resize",this._update);o(window,"orientationchange",this._update)
}this._update()}var q=m.prototype=Object.create(l.prototype);q.viewport=false;q._initializeElement=function(a){var b;
a=a||s;b=document.getElementById(a);if(!b){b=document.createElement("div");b.id=a;
b=document.body.appendChild(b)}this._el=b};q._getElementContent=function(){var a;
if("currentStyle" in this._el){a=this._el.currentStyle["x-content"]}else{this._invalidateStyles();
a=window.getComputedStyle(this._el,n).content}return a.replace(/["']/g,"")};q._update=function(){var b=this.viewport;
var a;var c;this.viewport=this._getElementContent();this.viewport=this.viewport.split(":").pop();
if(b&&this.viewport!==b){c={from:b,to:this.viewport};this.trigger("change",c);this.trigger("from:"+b,c);
this.trigger("to:"+this.viewport,c)}};q._invalidateStyles=function(){document.documentElement.clientWidth;
this._el.innerHTML=(this._el.innerHTML===" ")?" ":" ";document.documentElement.clientWidth
};u.exports=m},{"@marcom/ac-dom-events/utils/addEventListener":34,"@marcom/ac-event-emitter-micro":59,"@marcom/ac-feature/mediaQueriesAvailable":17,"@marcom/ac-polyfills/Function/prototype.bind":76,"@marcom/ac-polyfills/Object/create":77,"@marcom/ac-polyfills/Object/keys":78}],64:[function(D,O,v){D("@marcom/ac-polyfills/Function/prototype.bind");
var H=D("@marcom/ac-dom-events/utils/addEventListener");var E=D("@marcom/ac-dom-events/preventDefault");
var x=D("@marcom/ac-dom-events/target");var J=D("@marcom/ac-dom-traversal/querySelector");
var w=D("@marcom/ac-dom-traversal/ancestor");var N=D("@marcom/ac-classlist");var G=D("@marcom/ac-dom-nodes/hasAttribute");
var z=D("@marcom/ac-dom-nodes/isElement");var L=D("@marcom/ac-feature/cssPropertyAvailable");
var I=D("@marcom/ac-viewport-emitter/ViewportEmitter");var B=D("@marcom/ac-object/defaults");
var K=D("./internal/CheckboxMenu");var F=D("./internal/SimpleSticky");var C=D("./internal/ClickAway");
var M={className:"localnav"};var y=function(a,b){var c;b=B(M,b||{});this.el=a;c=b.selector||"."+b.className;
this._selectors={traySelector:b.traySelector||"."+b.className+"-menu-tray",viewportEmitterID:b.viewportEmitterID||b.className+"-viewport-emitter",curtainID:b.curtainID||b.className+"-curtain",menuStateID:b.menuStateID||b.className+"-menustate",menuOpeningClassName:b.menuOpeningClassName||b.className+"-opening"};
this._selectors.clickAwaySelector=c+", #"+this._selectors.curtainID+", #"+this._selectors.menuStateID;
this.tray=J(this._selectors.traySelector,this.el);this.stickyEnabled=this._getStickyEnabled();
this._transitionsAvailable=L("transition");this._viewports=new I(this._selectors.viewportEmitterID);
if(this.stickyEnabled){this._sticky=new F(this.el,b)}this._initializeMenu()};y.create=function(a,b){return new y(a,b)
};var A=y.prototype;A._getStickyEnabled=function(){return G(this.el,"data-sticky")
};A._initializeMenu=function(){var f=document.getElementById(this._selectors.menuStateID);
var c=document.getElementById(this._selectors.menuStateID+"-open");var a=document.getElementById(this._selectors.menuStateID+"-close");
var d=("onpopstate" in window)?"popstate":"beforeunload";var b;if(f&&c&&a){this.menu=new K(f,c,a);
this.menu.on("open",this._onMenuOpen.bind(this));this._viewports.on("change",this._onViewportChange.bind(this));
H(window,"scroll",this._onScroll.bind(this));H(window,"touchmove",this._onScroll.bind(this));
H(this.tray,"click",this._onTrayClick.bind(this));this._closeMenu=this._closeMenu.bind(this);
H(window,d,this._closeMenu);H(window,"orientationchange",this._closeMenu);b=new C(this._selectors.clickAwaySelector);
b.on("click",this._closeMenu);if(this._transitionsAvailable){H(this.tray,"transitionend",this._enableMenuScroll.bind(this))
}}};A._onMenuOpen=function(){this._menuCollapseOnScroll=null;if(this._transitionsAvailable){this._disableMenuScrollbar()
}};A._onScroll=function(b){var a;if(this.menu.isOpen()){if(this._menuCollapseOnScroll===null){this._menuCollapseOnScroll=(this.tray.offsetHeight>=this.tray.scrollHeight)
}if(this._menuCollapseOnScroll){this.menu.close()}else{a=x(b);if(!z(a)||!w(a,this._selectors.traySelector,true)){E(b)
}}}};A._onTrayClick=function(b){var a=x(b);if("href" in a){this._closeMenu()}};
A._onViewportChange=function(a){if(a.to==="medium"||a.to==="large"){this._closeMenu()
}};A._disableMenuScrollbar=function(){N.add(this.el,this._selectors.menuOpeningClassName)
};A._enableMenuScroll=function(){N.remove(this.el,this._selectors.menuOpeningClassName)
};A._closeMenu=function(){this.menu.close()};A.destroy=function(){};O.exports=y
},{"./internal/CheckboxMenu":65,"./internal/ClickAway":66,"./internal/SimpleSticky":67,"@marcom/ac-classlist":12,"@marcom/ac-dom-events/preventDefault":32,"@marcom/ac-dom-events/target":33,"@marcom/ac-dom-events/utils/addEventListener":34,"@marcom/ac-dom-nodes/hasAttribute":41,"@marcom/ac-dom-nodes/isElement":46,"@marcom/ac-dom-traversal/ancestor":49,"@marcom/ac-dom-traversal/querySelector":54,"@marcom/ac-feature/cssPropertyAvailable":15,"@marcom/ac-object/defaults":61,"@marcom/ac-polyfills/Function/prototype.bind":76,"@marcom/ac-viewport-emitter/ViewportEmitter":63}],65:[function(r,s,q){r("@marcom/ac-polyfills/Object/create");
var k=r("@marcom/ac-event-emitter-micro").EventEmitterMicro;var n=r("@marcom/ac-dom-events/utils/addEventListener");
var m=r("@marcom/ac-dom-events/preventDefault");function o(b,c,a){k.call(this);
this.el=b;this.anchorOpen=c;this.anchorClose=a;this._lastOpen=this.el.checked;n(this.el,"change",this.update.bind(this));
n(this.anchorOpen,"click",this._anchorOpenClick.bind(this));n(this.anchorClose,"click",this._anchorCloseClick.bind(this));
if(window.location.hash==="#"+b.id){window.location.hash=""}}o.create=function(b,c,a){return new o(b,c,a)
};var l=k.prototype;var p=o.prototype=Object.create(l);o.prototype.constructor=o;
p.update=function(){var a=this.isOpen();if(a!==this._lastOpen){this.trigger(a?"open":"close");
this._lastOpen=a}};p.isOpen=function(){return this.el.checked};p.toggle=function(){if(this.isOpen()){this.close()
}else{this.open()}};p.open=function(){if(!this.el.checked){this.el.checked=true;
this.update()}};p.close=function(){if(this.el.checked){this.el.checked=false;this.update()
}};p._anchorOpenClick=function(a){m(a);this.open();this.anchorClose.focus()};p._anchorCloseClick=function(a){m(a);
this.close();this.anchorOpen.focus()};s.exports=o},{"@marcom/ac-dom-events/preventDefault":32,"@marcom/ac-dom-events/utils/addEventListener":34,"@marcom/ac-event-emitter-micro":59,"@marcom/ac-polyfills/Object/create":77}],66:[function(s,t,r){s("@marcom/ac-polyfills/Function/prototype.bind");
s("@marcom/ac-polyfills/Object/create");var m=s("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var p=s("@marcom/ac-dom-events/utils/addEventListener");var u=s("@marcom/ac-dom-events/target");
var l=s("@marcom/ac-dom-traversal/ancestors");function o(a){m.call(this);this._selector=a;
this._touching=false;p(document,"click",this._onClick.bind(this));p(document,"touchstart",this._onTouchStart.bind(this));
p(document,"touchend",this._onTouchEnd.bind(this))}var n=m.prototype;var q=o.prototype=Object.create(n);
o.prototype.constructor=o;q._checkTarget=function(b){var a=u(b);if(!l(a,this._selector,true).length){this.trigger("click",b)
}};q._onClick=function(a){if(!this._touching){this._checkTarget(a)}};q._onTouchStart=function(a){this._touching=true;
this._checkTarget(a)};q._onTouchEnd=function(){this._touching=false};t.exports=o
},{"@marcom/ac-dom-events/target":33,"@marcom/ac-dom-events/utils/addEventListener":34,"@marcom/ac-dom-traversal/ancestors":50,"@marcom/ac-event-emitter-micro":59,"@marcom/ac-polyfills/Function/prototype.bind":76,"@marcom/ac-polyfills/Object/create":77}],67:[function(A,B,z){A("@marcom/ac-polyfills/Object/create");
var p=A("@marcom/ac-event-emitter-micro").EventEmitterMicro;var w=A("@marcom/ac-dom-events/utils/addEventListener");
var t=A("@marcom/ac-feature/cssPropertyAvailable");var x=A("@marcom/ac-dom-nodes/insertBefore");
var s=A("@marcom/ac-dom-metrics/getScrollY");var v=A("@marcom/ac-classlist/add");
var q=A("@marcom/ac-classlist/remove");var C="css-sticky";var u=function(a,b){p.call(this);
this.el=a;this.stuck=false;this._selectors={placeholderID:b.placeholderID||b.className+"-sticky-placeholder",stuckClassName:b.stuckClassName||b.className+"-sticking"};
this._createPlaceholder();this._featureDetection();this._updatePosition=this._updatePosition.bind(this);
this._updatePlaceholderOffset=this._updatePlaceholderOffset.bind(this);w(window,"scroll",this._updatePosition);
w(document,"touchmove",this._updatePosition);w(window,"resize",this._updatePlaceholderOffset);
w(window,"orientationchange",this._updatePlaceholderOffset);if("acStore" in window){window.acStore.getStorefront().then(this._updatePlaceholderOffset);
window.acStore.on("storefrontChange",this._updatePlaceholderOffset)}};u.create=function(a,b){return new u(a,b)
};var r=p.prototype;var y=u.prototype=Object.create(r);u.prototype.constructor=u;
y._featureDetection=function(){var a=t("position","sticky");var b=C;if(!a){b="no-"+b
}v(this.el,b);v(this.placeholder,b)};y._createPlaceholder=function(){this.placeholder=document.createElement("div");
this.placeholder.id=this._selectors.placeholderID;x(this.placeholder,this.el);this._updatePlaceholderOffset()
};y._updatePlaceholderOffset=function(){var a=this.placeholder.offsetTop;a+=document.documentElement.offsetTop+document.body.offsetTop;
if(a!==this._placeholderOffset){this._placeholderOffset=a;this._updatePosition()
}};y._updatePosition=function(){var a=s();if(a>this._placeholderOffset){if(!this.stuck){v(this.el,this._selectors.stuckClassName);
v(this.placeholder,this._selectors.stuckClassName);this.stuck=true;this.trigger("stuck")
}}else{if(this.stuck){q(this.el,this._selectors.stuckClassName);q(this.placeholder,this._selectors.stuckClassName);
this.stuck=false;this.trigger("unstuck")}}};B.exports=u},{"@marcom/ac-classlist/add":5,"@marcom/ac-classlist/remove":13,"@marcom/ac-dom-events/utils/addEventListener":34,"@marcom/ac-dom-metrics/getScrollY":35,"@marcom/ac-dom-nodes/insertBefore":42,"@marcom/ac-event-emitter-micro":59,"@marcom/ac-feature/cssPropertyAvailable":15,"@marcom/ac-polyfills/Object/create":77}],68:[function(d,g,f){if(!Array.isArray){Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"
}}},{}],69:[function(f,i,g){if(!Array.prototype.filter){Array.prototype.filter=function h(a,b){var c=Object(this);
var n=c.length>>>0;var d;var m=[];if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<n;d+=1){if(d in c&&a.call(b,c[d],d,c)){m.push(c[d])}}return m}}},{}],70:[function(f,i,g){if(!Array.prototype.forEach){Array.prototype.forEach=function h(a,b){var c=Object(this);
var l;var d;if(typeof a!=="function"){throw new TypeError("No function object passed to forEach.")
}for(l=0;l<this.length;l+=1){d=c[l];a.call(b,d,l,c)}}}},{}],71:[function(f,i,g){if(!Array.prototype.indexOf){Array.prototype.indexOf=function h(c,b){var a=b||0;
var d=0;if(a<0){a=this.length+b-1;if(a<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(d=0;d<this.length;d++){if(this[d]===c){return d}}return(-1)}}},{}],72:[function(f,i,g){if(!Array.prototype.map){Array.prototype.map=function h(a,b){var d=Object(this);
var m=d.length>>>0;var c;var n=new Array(m);if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(c=0;c<m;c+=1){if(c in d){n[c]=a.call(b,d[c],c,d)}}return n}}},{}],73:[function(d,g,f){(function(){var b=Array.prototype.slice;
try{b.call(document.documentElement)}catch(a){Array.prototype.slice=function(u,q){q=(typeof q!=="undefined")?q:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return b.call(this,u,q)
}var i,r=[],p,s=this.length;var t=u||0;t=(t>=0)?t:s+t;var c=(q)?q:s;if(q<0){c=s+q
}p=c-t;if(p>0){r=new Array(p);if(this.charAt){for(i=0;i<p;i++){r[i]=this.charAt(t+i)
}}else{for(i=0;i<p;i++){r[i]=this[t+i]}}}return r}}}())},{}],74:[function(f,i,g){if(!Array.prototype.some){Array.prototype.some=function h(a,b){var d=Object(this);
var l=d.length>>>0;var c;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(c=0;c<l;c+=1){if(c in d&&a.call(b,d[c],c,d)===true){return true}}return false
}}},{}],75:[function(d,g,f){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self){if(!("classList" in document.createElement("_"))){(function(t){if(!("Element" in t)){return
}var C="classList",x="prototype",b=t.Element[x],B=Object,s=String[x].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},A=Array[x].indexOf||function(h){var i=0,j=this.length;for(;i<j;i++){if(i in this&&this[i]===h){return i
}}return -1},a=function(i,h){this.name=i;this.code=DOMException[i];this.message=h
},w=function(h,i){if(i===""){throw new a("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(i)){throw new a("INVALID_CHARACTER_ERR","String contains an invalid character")
}return A.call(h,i)},z=function(h){var i=s.call(h.getAttribute("class")||""),j=i?i.split(/\s+/):[],k=0,l=j.length;
for(;k<l;k++){this.push(j[k])}this._updateClassName=function(){h.setAttribute("class",this.toString())
}},y=z[x]=[],u=function(){return new z(this)};a[x]=Error[x];y.item=function(h){return this[h]||null
};y.contains=function(h){h+="";return w(this,h)!==-1};y.add=function(){var h=arguments,i=0,k=h.length,j,l=false;
do{j=h[i]+"";if(w(this,j)===-1){this.push(j);l=true}}while(++i<k);if(l){this._updateClassName()
}};y.remove=function(){var h=arguments,i=0,l=h.length,j,m=false,k;do{j=h[i]+"";
k=w(this,j);while(k!==-1){this.splice(k,1);m=true;k=w(this,j)}}while(++i<l);if(m){this._updateClassName()
}};y.toggle=function(j,i){j+="";var k=this.contains(j),h=k?i!==true&&"remove":i!==false&&"add";
if(h){this[h](j)}if(i===true||i===false){return i}else{return !k}};y.toString=function(){return this.join(" ")
};if(B.defineProperty){var c={get:u,enumerable:true,configurable:true};try{B.defineProperty(b,C,c)
}catch(v){if(v.number===-2146823252){c.enumerable=false;B.defineProperty(b,C,c)
}}}else{if(B[x].__defineGetter__){b.__defineGetter__(C,u)}}}(self))}else{(function(){var b=document.createElement("_");
b.classList.add("c1","c2");if(!b.classList.contains("c2")){var a=function(j){var k=DOMTokenList.prototype[j];
DOMTokenList.prototype[j]=function(h){var i,m=arguments.length;for(i=0;i<m;i++){h=arguments[i];
k.call(this,h)}}};a("add");a("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(k,j){if(1 in arguments&&!this.contains(k)===!j){return j
}else{return c.call(this,k)}}}b=null}())}}},{}],76:[function(d,g,f){if(!Function.prototype.bind){Function.prototype.bind=function(k){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var a=Array.prototype.slice.call(arguments,1);var b=this;var j=function(){};var c=function(){return b.apply((this instanceof j&&k)?this:k,a.concat(Array.prototype.slice.call(arguments)))
};j.prototype=this.prototype;c.prototype=new j();return c}}},{}],77:[function(f,i,g){if(!Object.create){var h=function(){};
Object.create=function(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}h.prototype=a;return new h()}}},{}],78:[function(f,i,g){if(!Object.keys){Object.keys=function h(b){var c=[];
var a;if((!b)||(typeof b.hasOwnProperty!=="function")){throw"Object.keys called on non-object."
}for(a in b){if(b.hasOwnProperty(a)){c.push(a)}}return c}}},{}],79:[function(i,h,f){if(!String.prototype.trim){String.prototype.trim=function g(){return this.replace(/^\s+|\s+$/g,"")
}}},{}],80:[function(l,k,m){if(!window.getComputedStyle){function j(d,a,b){d.document;
var c=d.currentStyle[a].match(/(-?[\d\.]+)(%|cm|em|in|mm|pc|pt|)/)||[0,0,""],f=c[1],o=c[2],g;
b=!b?b:/%|em/.test(o)&&d.parentElement?j(d.parentElement,"fontSize",null):16;g=a=="fontSize"?b:/width/i.test(a)?d.clientWidth:d.clientHeight;
return o=="%"?f/100*g:o=="cm"?f*0.3937*96:o=="em"?f*b:o=="in"?f*96:o=="mm"?f*0.3937*96/10:o=="pc"?f*12*96/72:o=="pt"?f*96/72:f
}function h(b,p){var g=p=="border"?"Width":"",c=p+"Top"+g,a=p+"Right"+g,f=p+"Bottom"+g,d=p+"Left"+g;
b[p]=(b[c]==b[a]&&b[c]==b[f]&&b[c]==b[d]?[b[c]]:b[c]==b[f]&&b[d]==b[a]?[b[c],b[a]]:b[d]==b[a]?[b[c],b[a],b[f]]:[b[c],b[a],b[f],b[d]]).join(" ")
}function i(c){var b=this,d=c.currentStyle,o=j(c,"fontSize"),g=function(n){return"-"+n.toLowerCase()
},a;for(a in d){Array.prototype.push.call(b,a=="styleFloat"?"float":a.replace(/[A-Z]/,g));
if(a=="width"){b[a]=c.offsetWidth+"px"}else{if(a=="height"){b[a]=c.offsetHeight+"px"
}else{if(a=="styleFloat"){b["float"]=d[a];b.cssFloat=d[a]}else{if(/margin.|padding.|border.+W/.test(a)&&b[a]!="auto"){b[a]=Math.round(j(c,a,o))+"px"
}else{if(/^outline/.test(a)){try{b[a]=d[a]}catch(f){b.outlineColor=d.color;b.outlineStyle=b.outlineStyle||"none";
b.outlineWidth=b.outlineWidth||"0px";b.outline=[b.outlineColor,b.outlineWidth,b.outlineStyle].join(" ")
}}else{b[a]=d[a]}}}}}}h(b,"margin");h(b,"padding");h(b,"border");b.fontSize=Math.round(o)+"px"
}i.prototype={constructor:i,getPropertyPriority:function(){throw new Error("NotSupportedError: DOM Exception 9")
},getPropertyValue:function(a){return this[a.replace(/-\w/g,function(b){return b[1].toUpperCase()
})]},item:function(a){return this[a]},removeProperty:function(){throw new Error("NoModificationAllowedError: DOM Exception 7")
},setProperty:function(){throw new Error("NoModificationAllowedError: DOM Exception 7")
},getPropertyCSSValue:function(){throw new Error("NotSupportedError: DOM Exception 9")
}};window.getComputedStyle=function(a){return new i(a)}}},{}],81:[function(d,g,f){window.matchMedia=window.matchMedia||(function(c,b){var m,o=c.documentElement,n=o.firstElementChild||o.firstChild,l=c.createElement("body"),a=c.createElement("div");
a.id="mq-test-1";a.style.cssText="position:absolute;top:-100em";l.style.background="none";
l.appendChild(a);return function(h){a.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width:42px; }</style>';
o.insertBefore(l,n);m=a.offsetWidth===42;o.removeChild(l);return{matches:m,media:h}
}}(document))},{}],hfMHj0:[function(k,j,h){k("@marcom/ac-polyfills/Array/isArray");
k("@marcom/ac-polyfills/Array/prototype.filter");k("@marcom/ac-polyfills/Array/prototype.forEach");
k("@marcom/ac-polyfills/Array/prototype.indexOf");k("@marcom/ac-polyfills/Array/prototype.map");
k("@marcom/ac-polyfills/Array/prototype.some");k("@marcom/ac-polyfills/getComputedStyle");
k("@marcom/ac-polyfills/String/prototype.trim");var g=k("./ac-localnav-global/LocalnavGlobal");
var i=document.getElementById("ac-localnav");if(i){j.exports=new g(i)}},{"./ac-localnav-global/LocalnavGlobal":"fkFiXJ","@marcom/ac-polyfills/Array/isArray":68,"@marcom/ac-polyfills/Array/prototype.filter":69,"@marcom/ac-polyfills/Array/prototype.forEach":70,"@marcom/ac-polyfills/Array/prototype.indexOf":71,"@marcom/ac-polyfills/Array/prototype.map":72,"@marcom/ac-polyfills/Array/prototype.some":74,"@marcom/ac-polyfills/String/prototype.trim":79,"@marcom/ac-polyfills/getComputedStyle":80}],"@marcom/ac-localnav-global":[function(d,g,f){g.exports=d("hfMHj0")
},{}],fkFiXJ:[function(v,w,s){v("@marcom/ac-polyfills/Function/prototype.bind");
var u=v("@marcom/ac-localnav/Localnav");var o=v("@marcom/ac-headjs/FeatureDetect");
var m=v("./featureDetectTests");var t=v("@marcom/ac-classlist");var q="locked";
var n=function(b){var a=new o(b,m);a.htmlClass();u.call(this,b,{className:"ac-ln",selector:"#ac-localnav"});
if(this._sticky){this._analyticsRegion=this.el.getAttribute("data-analytics-region");
this._updateAnalyticsRegion=this._updateAnalyticsRegion.bind(this);this._sticky.on("stuck",this._updateAnalyticsRegion);
this._sticky.on("unstuck",this._updateAnalyticsRegion)}};var p=u.prototype;var r=n.prototype=Object.create(p);
n.prototype.constructor=n;r._getStickyEnabled=function(){if(t.contains(document.body,"ac-platter-content")){return false
}if(t.contains(document.body,"ac-platter-page")){return false}return p._getStickyEnabled.call(this)
};r._updateAnalyticsRegion=function(){var a=this._analyticsRegion;if(this._sticky.stuck){a+=" "+q
}this.el.setAttribute("data-analytics-region",a)};w.exports=n},{"./featureDetectTests":"o3ncwG","@marcom/ac-classlist":12,"@marcom/ac-headjs/FeatureDetect":30,"@marcom/ac-localnav/Localnav":64,"@marcom/ac-polyfills/Function/prototype.bind":76}],"@marcom/ac-localnav-global/LocalnavGlobal":[function(d,g,f){g.exports=d("fkFiXJ")
},{}],o3ncwG:[function(l,k,m){var j=l("@marcom/ac-browser");var i=l("@marcom/ac-feature/touchAvailable");
var h=l("@marcom/ac-feature/svgAvailable");k.exports={touch:i,svg:h,ie7:(j.IE&&j.IE.documentMode===7),ie8:(j.IE&&j.IE.documentMode===8)}
},{"@marcom/ac-browser":1,"@marcom/ac-feature/svgAvailable":28,"@marcom/ac-feature/touchAvailable":29}],"@marcom/ac-localnav-global/featureDetectTests":[function(d,g,f){g.exports=d("o3ncwG")
},{}]},{},["hfMHj0"]);