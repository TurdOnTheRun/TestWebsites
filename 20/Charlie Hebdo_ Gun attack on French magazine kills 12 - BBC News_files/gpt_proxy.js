// Copyright 2011 Google Inc. All Rights Reserved.
(function(){var k=this,l=function(a,b){for(var c=a.split("."),d=b||k,e;e=c.shift();)if(null!=d[e])d=d[e];else return null;return d},m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==
c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},p=function(a){return"array"==m(a)},aa=function(a){var b=m(a);return"array"==b||"object"==b&&"number"==typeof a.length},q=function(a){return"string"==typeof a},ba=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ca=function(a,b,c){return a.call.apply(a.bind,arguments)},
da=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},ea=function(a,b,c){ea=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return ea.apply(null,arguments)},fa=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=
c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},r=function(a,b){function c(){}c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.R=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};var t=function(a){return/^[\s\xa0]*$/.test(a)},ga=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},oa=function(a){if(!ha.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ia,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ja,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ka,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(la,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(ma,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(na,"&#0;"));return a},ia=/&/g,ja=/</g,
ka=/>/g,la=/"/g,ma=/'/g,na=/\x00/g,ha=/[\x00&<>"']/,u=function(a){return null==a?"":String(a)},pa=function(a,b){return a<b?-1:a>b?1:0},qa=2147483648*Math.random()|0;var ra=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},v=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},sa=Array.prototype.some?function(a,b,c){return Array.prototype.some.call(a,
b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},ua=function(a){var b=ta;a:{for(var c=b.length,d=q(b)?b.split(""):b,e=0;e<c;e++)if(e in d&&a.call(void 0,d[e],e,b)){a=e;break a}a=-1}return 0>a?null:q(b)?b.charAt(a):b[a]},va=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)},wa=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var xa=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)},ya=function(a,b){return null!==a&&b in a},za="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Aa=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<za.length;f++)c=za[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var w;a:{var Ba=k.navigator;if(Ba){var Ca=Ba.userAgent;if(Ca){w=Ca;break a}}w=""};var Da="StopIteration"in k?k.StopIteration:{message:"StopIteration",stack:""},Ea=function(){};Ea.prototype.next=function(){throw Da;};Ea.prototype.i=function(){return this};var x=function(a,b){this.b={};this.a=[];this.g=this.f=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){var e;if(a instanceof x)e=a.v(),d=a.l();else{var c=[],f=0;for(e in a)c[f++]=e;e=c;c=[];f=0;for(d in a)c[f++]=a[d];d=c}for(c=0;c<e.length;c++)this.set(e[c],d[c])}};x.prototype.l=function(){Fa(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};
x.prototype.v=function(){Fa(this);return this.a.concat()};var Fa=function(a){if(a.f!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];y(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.f!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],y(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}},z=function(a,b){return y(a.b,b)?a.b[b]:void 0};x.prototype.set=function(a,b){y(this.b,a)||(this.f++,this.a.push(a),this.g++);this.b[a]=b};
x.prototype.forEach=function(a,b){for(var c=this.v(),d=0;d<c.length;d++){var e=c[d];a.call(b,z(this,e),e,this)}};x.prototype.clone=function(){return new x(this)};x.prototype.i=function(a){Fa(this);var b=0,c=this.g,d=this,e=new Ea;e.next=function(){if(c!=d.g)throw Error("The map has changed since the iterator was created");if(b>=d.a.length)throw Da;var e=d.a[b++];return a?e:d.b[e]};return e};var y=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Ga=-1!=w.indexOf("Opera")||-1!=w.indexOf("OPR"),A=-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"),Ha=-1!=w.indexOf("Edge"),B=-1!=w.indexOf("Gecko")&&!(-1!=w.toLowerCase().indexOf("webkit")&&-1==w.indexOf("Edge"))&&!(-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"))&&-1==w.indexOf("Edge"),Ia=-1!=w.toLowerCase().indexOf("webkit")&&-1==w.indexOf("Edge"),Ja=function(){var a=k.document;return a?a.documentMode:void 0},Ka;
a:{var La="",Ma=function(){var a=w;if(B)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Ha)return/Edge\/([\d\.]+)/.exec(a);if(A)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Ia)return/WebKit\/(\S+)/.exec(a);if(Ga)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Ma&&(La=Ma?Ma[1]:"");if(A){var Na=Ja();if(null!=Na&&Na>parseFloat(La)){Ka=String(Na);break a}}Ka=La}
var Oa=Ka,Pa={},C=function(a){var b;if(!(b=Pa[a])){b=0;for(var c=ga(String(Oa)).split("."),d=ga(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",n=RegExp("(\\d*)(\\D*)","g"),ac=RegExp("(\\d*)(\\D*)","g");do{var R=n.exec(g)||["","",""],S=ac.exec(h)||["","",""];if(0==R[0].length&&0==S[0].length)break;b=pa(0==R[1].length?0:parseInt(R[1],10),0==S[1].length?0:parseInt(S[1],10))||pa(0==R[2].length,0==S[2].length)||pa(R[2],S[2])}while(0==b)}b=Pa[a]=0<=b}return b},
Qa=k.document,Ra=Qa&&A?Ja()||("CSS1Compat"==Qa.compatMode?parseInt(Oa,10):5):void 0;var Sa=!A||9<=Number(Ra);!B&&!A||A&&9<=Number(Ra)||B&&C("1.9.1");A&&C("9");var Ua=function(a,b){xa(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Ta.hasOwnProperty(d)?a.setAttribute(Ta[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},Ta={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},Wa=function(a,
b,c){var d=arguments,e=document,f=d[0],g=d[1];if(!Sa&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',oa(g.name),'"');if(g.type){f.push(' type="',oa(g.type),'"');var h={};Aa(h,g);delete h.type;g=h}f.push(">");f=f.join("")}f=e.createElement(f);g&&(q(g)?f.className=g:p(g)?f.className=g.join(" "):Ua(f,g));2<d.length&&Va(e,f,d);return f},Va=function(a,b,c){function d(c){c&&b.appendChild(q(c)?a.createTextNode(c):c)}for(var e=2;e<c.length;e++){var f=c[e];!aa(f)||ba(f)&&0<f.nodeType?d(f):v(Xa(f)?
wa(f):f,d)}},Xa=function(a){if(a&&"number"==typeof a.length){if(ba(a))return"function"==typeof a.item||"string"==typeof a.item;if("function"==m(a))return"function"==typeof a.item}return!1};var D=function(){this.m=this.m;this.i=this.i};D.prototype.m=!1;D.prototype.D=function(){this.m||(this.m=!0,this.a())};var Ya=function(a,b){a.m?b.call(void 0):(a.i||(a.i=[]),a.i.push(b))};D.prototype.a=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var Za=function(a){a&&"function"==typeof a.D&&a.D()};var $a=function(a){$a[" "](a);return a};$a[" "]=function(){};var ab=!A||9<=Number(Ra),bb=A&&!C("9");!Ia||C("528");B&&C("1.9b")||A&&C("8")||Ga&&C("9.5")||Ia&&C("528");B&&!C("8")||A&&C("9");var E=function(a,b){this.type=a;this.a=this.target=b;this.L=!0};E.prototype.f=function(){this.L=!1};var F=function(a,b){E.call(this,a?a.type:"");this.b=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&B)try{$a(c.nodeName)}catch(d){}this.b=a;a.defaultPrevented&&this.f()}};r(F,E);F.prototype.f=function(){F.A.f.call(this);var a=this.b;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,bb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var cb="closure_listenable_"+(1E6*Math.random()|0),G=function(a){return!(!a||!a[cb])},db=0;var eb=function(a,b,c,d,e){this.listener=a;this.a=null;this.src=b;this.type=c;this.C=!!d;this.F=e;this.J=++db;this.u=this.B=!1},fb=function(a){a.u=!0;a.listener=null;a.a=null;a.src=null;a.F=null};var gb=function(a){this.src=a;this.a={};this.b=0},ib=function(a,b,c,d,e,f){var g=b.toString();b=a.a[g];b||(b=a.a[g]=[],a.b++);var h=hb(b,c,e,f);-1<h?(a=b[h],d||(a.B=!1)):(a=new eb(c,a.src,g,!!e,f),a.B=d,b.push(a));return a},jb=function(a,b){var c=b.type;if(c in a.a){var d=a.a[c],e=ra(d,b),f;(f=0<=e)&&Array.prototype.splice.call(d,e,1);f&&(fb(b),0==a.a[c].length&&(delete a.a[c],a.b--))}},kb=function(a,b,c,d,e){a=a.a[b.toString()];b=-1;a&&(b=hb(a,c,d,e));return-1<b?a[b]:null},hb=function(a,b,c,d){for(var e=
0;e<a.length;++e){var f=a[e];if(!f.u&&f.listener==b&&f.C==!!c&&f.F==d)return e}return-1};var lb="closure_lm_"+(1E6*Math.random()|0),mb={},nb=0,ob=function(a,b,c,d,e){if(p(b)){for(var f=0;f<b.length;f++)ob(a,b[f],c,d,e);return null}c=pb(c);return G(a)?a.g(b,c,d,e):qb(a,b,c,!1,d,e)},qb=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,h=H(a);h||(a[lb]=h=new gb(a));c=ib(h,b,c,d,e,f);if(c.a)return c;d=rb();c.a=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(sb(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
nb++;return c},rb=function(){var a=tb,b=ab?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},ub=function(a,b,c,d,e){if(p(b)){for(var f=0;f<b.length;f++)ub(a,b[f],c,d,e);return null}c=pb(c);return G(a)?ib(a.b,String(b),c,!0,d,e):qb(a,b,c,!0,d,e)},vb=function(a,b,c,d,e){if(p(b))for(var f=0;f<b.length;f++)vb(a,b[f],c,d,e);else c=pb(c),G(a)?a.I(b,c,d,e):a&&(a=H(a))&&(b=kb(a,b,c,!!d,e))&&I(b)},I=function(a){if("number"!=typeof a&&a&&!a.u){var b=
a.src;if(G(b))jb(b.b,a);else{var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.C):b.detachEvent&&b.detachEvent(sb(c),d);nb--;(c=H(b))?(jb(c,a),0==c.b&&(c.src=null,b[lb]=null)):fb(a)}}},sb=function(a){return a in mb?mb[a]:mb[a]="on"+a},xb=function(a,b,c,d){var e=!0;if(a=H(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.C==c&&!f.u&&(f=wb(f,d),e=e&&!1!==f)}return e},wb=function(a,b){var c=a.listener,d=a.F||a.src;a.B&&I(a);return c.call(d,b)},tb=function(a,
b){if(a.u)return!0;if(!ab){var c=b||l("window.event"),d=new F(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(n){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.a;f;f=f.parentNode)c.push(f);for(var f=a.type,g=c.length-1;0<=g;g--){d.a=c[g];var h=xb(c[g],f,!0,d),e=e&&h}for(g=0;g<c.length;g++)d.a=c[g],h=xb(c[g],f,!1,d),e=e&&h}return e}return wb(a,new F(b,this))},H=function(a){a=a[lb];return a instanceof gb?a:null},yb="__closure_events_fn_"+
(1E9*Math.random()>>>0),pb=function(a){if("function"==m(a))return a;a[yb]||(a[yb]=function(b){return a.handleEvent(b)});return a[yb]};var J=function(a){D.call(this);this.j=a;this.f={}};r(J,D);var zb=[];J.prototype.g=function(a,b,c,d){p(b)||(b&&(zb[0]=b.toString()),b=zb);for(var e=0;e<b.length;e++){var f=ob(a,b[e],c||this.handleEvent,d||!1,this.j||this);if(!f)break;this.f[f.J]=f}return this};
J.prototype.I=function(a,b,c,d,e){if(p(b))for(var f=0;f<b.length;f++)this.I(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.j||this,c=pb(c),d=!!d,b=G(a)?kb(a.b,String(b),c,d,e):a?(a=H(a))?kb(a,b,c,d,e):null:null,b&&(I(b),delete this.f[b.J]);return this};var Ab=function(a){xa(a.f,function(a,c){this.f.hasOwnProperty(c)&&I(a)},a);a.f={}};J.prototype.a=function(){J.A.a.call(this);Ab(this)};J.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};var Bb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,Cb=function(a,b){if(a)for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f=null,g=null;0<=e?(f=c[d].substring(0,e),g=c[d].substring(e+1)):f=c[d];b(f,g?decodeURIComponent(g.replace(/\+/g," ")):"")}};var K=function(a,b){this.b=this.j=this.a="";this.h=null;this.i=this.m="";this.f=!1;var c;a instanceof K?(this.f=void 0!==b?b:a.f,Db(this,a.a),this.j=a.j,this.b=a.b,Eb(this,a.h),this.m=a.m,Fb(this,a.g.clone()),this.i=a.i):a&&(c=String(a).match(Bb))?(this.f=!!b,Db(this,c[1]||"",!0),this.j=L(c[2]||""),this.b=L(c[3]||"",!0),Eb(this,c[4]),this.m=L(c[5]||"",!0),Fb(this,c[6]||"",!0),this.i=L(c[7]||"")):(this.f=!!b,this.g=new M(null,0,this.f))};
K.prototype.toString=function(){var a=[],b=this.a;b&&a.push(N(b,Gb,!0),":");var c=this.b;if(c||"file"==b)a.push("//"),(b=this.j)&&a.push(N(b,Gb,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.h,null!=c&&a.push(":",String(c));if(c=this.m)this.b&&"/"!=c.charAt(0)&&a.push("/"),a.push(N(c,"/"==c.charAt(0)?Hb:Ib,!0));(c=this.g.toString())&&a.push("?",c);(c=this.i)&&a.push("#",N(c,Jb));return a.join("")};K.prototype.clone=function(){return new K(this)};
var Db=function(a,b,c){a.a=c?L(b,!0):b;a.a&&(a.a=a.a.replace(/:$/,""))},Eb=function(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.h=b}else a.h=null},Fb=function(a,b,c){b instanceof M?(a.g=b,Kb(a.g,a.f)):(c||(b=N(b,Lb)),a.g=new M(b,0,a.f))},L=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},N=function(a,b,c){return q(a)?(a=encodeURI(a).replace(b,Mb),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},Mb=function(a){a=a.charCodeAt(0);
return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},Gb=/[#\/\?@]/g,Ib=/[\#\?:]/g,Hb=/[\#\?]/g,Lb=/[\#\?@]/g,Jb=/#/g,M=function(a,b,c){this.b=this.a=null;this.f=a||null;this.g=!!c},O=function(a){a.a||(a.a=new x,a.b=0,a.f&&Cb(a.f,function(b,c){var d=decodeURIComponent(b.replace(/\+/g," "));O(a);a.f=null;var d=P(a,d),e=z(a.a,d);e||a.a.set(d,e=[]);e.push(c);a.b=a.b+1}))},Nb=function(a,b){O(a);b=P(a,b);if(y(a.a.b,b)){a.f=null;a.b=a.b-z(a.a,b).length;var c=a.a;y(c.b,b)&&(delete c.b[b],c.f--,c.g++,c.a.length>
2*c.f&&Fa(c))}},Ob=function(a,b){O(a);b=P(a,b);return y(a.a.b,b)};M.prototype.v=function(){O(this);for(var a=this.a.l(),b=this.a.v(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};M.prototype.l=function(a){O(this);var b=[];if(q(a))Ob(this,a)&&(b=va(b,z(this.a,P(this,a))));else{a=this.a.l();for(var c=0;c<a.length;c++)b=va(b,a[c])}return b};
M.prototype.set=function(a,b){O(this);this.f=null;a=P(this,a);Ob(this,a)&&(this.b=this.b-z(this.a,a).length);this.a.set(a,[b]);this.b=this.b+1;return this};M.prototype.toString=function(){if(this.f)return this.f;if(!this.a)return"";for(var a=[],b=this.a.v(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.l(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.f=a.join("&")};
M.prototype.clone=function(){var a=new M;a.f=this.f;this.a&&(a.a=this.a.clone(),a.b=this.b);return a};var P=function(a,b){var c=String(b);a.g&&(c=c.toLowerCase());return c},Kb=function(a,b){b&&!a.g&&(O(a),a.f=null,a.a.forEach(function(a,b){var e=b.toLowerCase();b!=e&&(Nb(this,b),Nb(this,e),0<a.length&&(this.f=null,this.a.set(P(this,e),wa(a)),this.b=this.b+a.length))},a));a.g=b};var Q=function(){D.call(this);this.b=new gb(this);this.P=this;this.w=null};r(Q,D);Q.prototype[cb]=!0;Q.prototype.removeEventListener=function(a,b,c,d){vb(this,a,b,c,d)};
var Qb=function(a,b){var c,d=a.w;if(d)for(c=[];d;d=d.w)c.push(d);var d=a.P,e=b,f=e.type||e;if(q(e))e=new E(e,d);else if(e instanceof E)e.target=e.target||d;else{var g=e,e=new E(f,d);Aa(e,g)}var g=!0,h;if(c)for(var n=c.length-1;0<=n;n--)h=e.a=c[n],g=Pb(h,f,!0,e)&&g;h=e.a=d;g=Pb(h,f,!0,e)&&g;g=Pb(h,f,!1,e)&&g;if(c)for(n=0;n<c.length;n++)h=e.a=c[n],g=Pb(h,f,!1,e)&&g};
Q.prototype.a=function(){Q.A.a.call(this);if(this.b){var a=this.b,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,fb(d[e]);delete a.a[c];a.b--}}this.w=null};Q.prototype.g=function(a,b,c,d){return ib(this.b,String(a),b,!1,c,d)};Q.prototype.I=function(a,b,c,d){var e;e=this.b;a=String(a).toString();if(a in e.a){var f=e.a[a];b=hb(f,b,c,d);-1<b?(fb(f[b]),Array.prototype.splice.call(f,b,1),0==f.length&&(delete e.a[a],e.b--),e=!0):e=!1}else e=!1;return e};
var Pb=function(a,b,c,d){b=a.b.a[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.u&&g.C==c){var h=g.listener,n=g.F||g.src;g.B&&jb(a.b,g);e=!1!==h.call(n,d)&&e}}return e&&0!=d.L};var Rb=function(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);},Sb=function(){},Tb=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(p(b)){var d=b;b=d.length;
c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Tb(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Ub(d,c),c.push(":"),Tb(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Ub(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");
break;default:throw Error("Unknown type: "+typeof b);}}},Vb={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Wb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Ub=function(a,b){b.push('"',a.replace(Wb,function(a){var b=Vb[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Vb[a]=b);return b}),'"')};var T=function(a){Q.call(this);this.h=a||"goog_"+qa++;this.o=[]};r(T,Q);T.prototype.j=!1;T.prototype.connect=function(){for(this.j=!0;0!=this.o.length;){var a=this.o.shift();this.sendMessage(a.name,a.type,a.data)}};var Xb=function(a,b,c,d,e){E.call(this,a);this.s=b;this.G=c;this.M=d;this.K=e};r(Xb,E);Xb.prototype.toString=function(){return""};var Yb=function(a){this.a=a},$b=function(){var a=Zb();a:{if(ya(a.a,"disableExperiments")&&(a=a.a.disableExperiments,"boolean"==typeof a))break a;a=!1}return a},bc=function(a){if(ya(a.a,"forceExperimentIds")){a=a.a.forceExperimentIds;var b=[],c=0;p(a)&&v(a,function(a){"number"==typeof a&&(b[c++]=a)});return b}return null};var Zb=function(){var a=cc;if(null==a.a){var b={},c;c=(new K(window.location.href)).g;if(Ob(c,"tcnfp"))try{var d=c.l("tcnfp"),b=Rb(0<d.length?String(d[0]):void 0)}catch(e){}a.a=new Yb(b)}return a.a},cc=new function(){this.a=null};var dc=function(a,b,c){this.a=a;this.b=Math.min(Math.max(b||0,0),1);this.f=null!=c?c:!0};var ec=function(){this.b=new x;this.a=null},fc=function(a){var b=Math.random(),c=0,d=a.b.l();v(d,function(a){c+=a.b},a);var e=1<c?c:1;a.a=null;for(var f=0,g=0;g<d.length;++g)if(f+=d[g].b,f/e>=b){a.a=d[g];break}};var ic=function(){this.b=null!=k.G_testRunner;this.a=new x;U(this,31061770,.05);U(this,31061771,.05);U(this,31061772,.05);U(this,31061773,.05);U(this,31061774,.01);U(this,31061775,.01);U(this,41351082,.01);U(this,41351083,.01);U(this,41351016,.05);U(this,41351017,.05);U(this,41351020,0);U(this,41351021,0);U(this,41351088,.01);U(this,41351089,.01);U(this,136961001,.01);U(this,136961002,.01);U(this,41351032,.05);U(this,41351033,.05);U(this,265944520,.05);U(this,265944521,.05);U(this,265944522,.05);
U(this,265944523,.05);gc(this);var a;a=Zb();a=bc(a);null!=a&&(this.b=!1,hc(this,a.map(String)))},jc=null,kc=function(){jc||(jc=new ic);return jc},U=function(a,b,c){t(u("GvnExternalLayer"))||isNaN(b)||0>=b||(b=new dc(b,c),lc(a,"GvnExternalLayer").b.set(b.a,b))},gc=function(a){$b()||v(a.a.l(),function(a){fc(a)},a)},hc=function(a,b){v(b,function(a){var b=Number(a);a="FORCED_PUB_EXP_LAYER_"+a;isNaN(b)||0>=b||t(u(a))||(lc(this,a).a=new dc(b,0,!0))},a)},mc=function(){var a=kc();return a.b?!1:sa(a.a.l(),
function(a){return!!a.a&&265944523==a.a.a})},nc=function(){var a=kc();if(a.b)return"";var b=[];v(a.a.l(),function(a){(a=a.a)&&a.f&&b.push(a.a)});return b.sort().join(",")},lc=function(a,b){var c=z(a.a,b);null==c&&(c=new ec,a.a.set(b,c));return c};var oc=function(a,b){if("function"!=m(a))if(a&&"function"==typeof a.handleEvent)a=ea(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:k.setTimeout(a,b||0)};var ta="://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com www.google.com/pagead/sul www.youtube.com/pagead/sul".split(" "),pc=/\bocr\b/,qc=0,V={},rc=function(a){return t(u(a))?!1:0<=a.indexOf("://pagead2.googlesyndication.com/pagead/gen_204?id=yt3p&sr=1&")||(new K(a)).i.match(pc)?!0:null!=ua(function(b){return null!=a.match(b)})},uc=function(a){if(a){var b='javascript:"data:text/html,<body><img src=\\"'+a+'\\"></body>"';
sc(function(c){tc(c?b:'javascript:"data:text/html,<body><object data=\\"'+a+'\\" width=1 height=1 style=\\"visibility:hidden;\\"></body>"')})}},tc=function(a){var b=Wa("iframe",{src:a,style:"display:none"});a=(9==b.nodeType?b:b.ownerDocument||b.document).body;var c,d=oc(function(){I(c);b&&b.parentNode&&b.parentNode.removeChild(b)},15E3);c=ub(b,["load","error"],function(){oc(function(){k.clearTimeout(d);b&&b.parentNode&&b.parentNode.removeChild(b)},5E3)});a.appendChild(b)},sc=function(a){var b=V.imageLoadingEnabled;
if(null!=b)a(b);else{var c=!1;vc(function(b,e){delete V[e];c||(c=!0,null!=V.imageLoadingEnabled||(V.imageLoadingEnabled=b),a(b))})}},vc=function(a){var b=new Image,c,d=""+qc++;V[d]=b;b.onload=function(){clearTimeout(c);a(!0,d)};c=setTimeout(function(){a(!1,d)},300);b.src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},wc=function(a){if(a){var b=document.createElement("OBJECT");b.data=a;b.width=1;b.height=1;b.style.visibility="hidden";var c=""+qc++;V[c]=b;b.onload=
b.onerror=function(){delete V[c]};document.body.appendChild(b)}},xc=function(a){if(a){var b=new Image,c=""+qc++;V[c]=b;b.onload=b.onerror=function(){delete V[c]};b.src=a}},yc=function(a){a&&sc(function(b){b?xc(a):wc(a)})};var zc=function(a,b){return a.replace(/(\[|%5B)([a-zA-Z0-9_]+)(\]|%5D)/g,function(a,d,e){try{var f;f=null!==b&&e in b?b[e]:void 0;f=f.toString();if(!t(u(f)))return encodeURIComponent(f).replace(/%2C/g,",")}catch(g){}return a})};var Ac=["*.youtu.be","*.youtube.com"],Bc="ad.doubleclick.net bid.g.doubleclick.net corp.google.com ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" "),Cc=["c.googlesyndication.com"],Ec=function(a){try{var b=(new K(a)).b,
b=b.replace(/^www./i,"");return sa(Ac,function(a){return Dc(a,b)})}catch(c){return!1}},Dc=function(a,b){if(t(u(b)))return!1;a=a.toLowerCase();b=b.toLowerCase();return"*."==a.substr(0,2)?(a=a.substr(2),a.length>b.length?!1:b.substr(-a.length)==a&&(b.length==a.length||"."==b.charAt(b.length-a.length-1))):a==b},Fc=function(a,b){return(new RegExp("^https?://([a-z0-9-]{1,63}\\.)*("+b.join("|").replace(/\./g,"\\.")+")(:[0-9]+)?([/?#]|$)","i")).test(a)};var Gc=function(a){try{a:{var b=a,c=void 0,d=b.length-11-2;if(!(-1==b.indexOf("URL_SIGNALS")||2048<=d||!c&&!window.Goog_AdSense_Lidar_getUrlSignalsArray))for(var c=c||window.Goog_AdSense_Lidar_getUrlSignalsArray(),d={},e=0;e<c.length;++e){d.URL_SIGNALS=c[e];var f=zc(b,d);if(2048>f.length){a=f;break a}}a=b}}catch(h){}try{b=a;c=!1;Fc(b,Cc)?c=!1:mc()&&null!=b&&Ec(b)?c=!0:"https:"==window.location.protocol&&Fc(b,Bc)&&(c=!0);if(c){var g=new K(b);"https"==g.a?a=b:(Db(g,"https"),a=g.toString())}else a=b;
a&&(rc(a)?uc(a):yc(a))}catch(h){}};var W=function(){this.b=.01>Math.random();this.a=Math.floor(4503599627370496*Math.random())};W.getInstance=function(){return W.a?W.a:W.a=new W};
var Jc=function(){var a=W.getInstance();if(a.b){var b={lid:11},c=nc();t(u(c))||(b.e=c);var b=Hc(a,b),d=new K("http://pagead2.googlesyndication.com/pagead/gen_204");xa(b,function(a,b){d.g.set(b,null!=a?"boolean"==typeof a?a?"t":"f":""+a:"")},a);a=Ic();Db(d,a.a);Gc(d.toString())}},Hc=function(a,b){b.id="";var c=Ic();b.c=a.a;b.domain=c.b;return b},Ic=function(){var a=window,b=document;return new K(a.parent==a?a.location.href:b.referrer)};var X=function(a,b){T.call(this,b);this.H=a;this.f=null;this.N=new J(this);this.N.g(window,"message",this.O)};r(X,T);var Kc=function(a){if(null==a||!q(a)||0!=a.lastIndexOf("ima://",0))return null;a=a.substr(6);try{return Rb(a)}catch(b){return null}};X.prototype.sendMessage=function(a,b,c){null!=this.f&&null!=this.f.postMessage&&this.f.postMessage(Lc(this,a,b,c),"*");null!=this.f&&null==this.f.postMessage&&Jc()};X.prototype.a=function(){this.N.D();X.A.a.call(this)};
X.prototype.O=function(a){a=a.b;var b=Kc(a.data);if(Mc(this,b)){if(null==this.f)this.f=a.source,this.j||this.connect();else if(this.f!=a.source)return;Mc(this,b)&&Qb(this,new Xb(b.name,b.type,b.data||{},b.sid,a.origin))}};var Lc=function(a,b,c,d){var e={};e.name=b;e.type=c;null!=d&&(e.data=d);e.sid=a.h;e.channel=a.H;a=[];Tb(new Sb,e,a);return"ima://"+a.join("")},Mc=function(a,b){if(null==b)return!1;var c=b.channel;if(null==c||c!=a.H)return!1;c=b.sid;return null==c||"*"!=a.h&&c!=a.h?!1:!0};var Y=function(a,b){Q.call(this);this.o=a;this.j=b;this.f={};this.h=new J(this);this.h.g(window,"message",this.H)};r(Y,Q);var Nc=function(a,b){var c=b.b;if(a.f.hasOwnProperty(c)){var c=a.f[c],d=b.type,e=b.s,f=b.G;c.j?c.sendMessage(d,e,f):c.o.push({name:d,type:e,data:f})}},Pc=function(a,b,c,d){a.f.hasOwnProperty(b)||(c=new X(b,c),a.h.g(c,a.o,function(a){Qb(this,new Oc(a.type,a.s,a.G,a.M,a.K,b))}),c.f=d,c.connect(),a.f[b]=c)};Y.prototype.a=function(){this.h.D();for(var a in this.f)Za(this.f[a]);Y.A.a.call(this)};
Y.prototype.H=function(a){a=a.b;var b=Kc(a.data);if(null!=b){var c=b.channel;if(this.j&&!this.f.hasOwnProperty(c)){var d=b.sid;Pc(this,c,d,a.source);Qb(this,new Oc(b.name,b.type,b.data||{},d,a.origin,c))}}};var Oc=function(a,b,c,d,e,f){Xb.call(this,a,b,c,d,e);this.b=f};r(Oc,Xb);var Rc=function(){var a=l("google.ima.gptProxyInstance",window);if(null!=a)return a;J.call(this);this.h=new Y("gpt",!0);Ya(this,fa(Za,this.h));this.g(this.h,"gpt",this.w);this.b=null;Qc()||window.top===window||(this.b=new Y("gpt",!1),Ya(this,fa(Za,this.b)),this.g(this.b,"gpt",this.o))};r(Rc,J);var Qc=function(){return!!l("googletag.cmd",window)},Sc=function(){var a=l("googletag.console",window);return null!=a?a:null};
Rc.prototype.w=function(a){var b=a.K,c="//imasdk.googleapis.com".match(Bb),b=b.match(Bb);if(c[3]==b[3]&&c[4]==b[4])if(null!=this.b)Pc(this.b,a.b,a.M,window.parent),null!=this.b&&Nc(this.b,a);else if(c=a.G,null!=c&&void 0!==c.scope){var b=c.scope,c=c.args,d;if("proxy"==b)c=a.s,"isGptPresent"==c?d=Qc():"isConsolePresent"==c&&(d=null!=Sc());else if(Qc())if("pubads"==b||"companionAds"==b){d=a.s;var e,f=window.googletag;if(null!=f&&null!=f[b]&&(f=f[b](),null!=f&&(d=f[d],null!=d)))try{e=d.apply(f,c)}catch(g){}d=
e}else if("console"==b){if(f=a.s,e=Sc(),null!=e&&(f=e[f],null!=f))try{f.apply(e,c)}catch(g){}}else if(null===b){e=a.s;d=window;if(0<=ra(["googleGetCompanionAdSlots","googleSetCompanionAdContents"],e)&&(e=d[e],null!=e))try{f=e.apply(d,c)}catch(g){}d=f}void 0!==d&&(a.G.returnValue=d,Nc(this.h,a))}};Rc.prototype.o=function(a){Nc(this.h,a)};var Tc=window,Uc=l("google.ima.gptProxyInstance",Tc);if(null==Uc){var Vc=Uc=new Rc,Wc=["google","ima","gptProxyInstance"],Z=Tc||k;Wc[0]in Z||!Z.execScript||Z.execScript("var "+Wc[0]);for(var Xc;Wc.length&&(Xc=Wc.shift());)Wc.length||void 0===Vc?Z[Xc]?Z=Z[Xc]:Z=Z[Xc]={}:Z[Xc]=Vc};})();