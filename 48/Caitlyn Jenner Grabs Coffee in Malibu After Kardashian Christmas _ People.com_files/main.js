/* --------------------------------------------------------------------------------------- 
 * @TITLE: People.com Desktop
 * @RELEASE: Production Release Date: 5/29/2014
 * @Version: 3
 * @NOTE: 
 *		- Updated JQuery from 1.6.1 to 1.8.3
 * @MODULES:
 *		- To Be Listed
 * @TODO:
 *		- Insert headings for sections
 *		- List Modules in above module section
 *		- move plugins to files with version numbers
 * --------------------------------------------------------------------------------------- */

/*******************************************************************************
 *
 * Plugins
 *
 *******************************************************************************/
 //	Modernizr custom build of 1.7: rgba | borderradius | boxshadow | opacity | cssgradients
window.Modernizr=function(a,b,c){function G(){}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.rgba=function(){A("background-color:rgba(150,255,150,.5)");return D(k.backgroundColor,"rgba")},r.borderradius=function(){return F("borderRadius","",function(a){return D(a,"orderRadius")})},r.boxshadow=function(){return F("boxShadow")},r.opacity=function(){B("opacity:.55");return/^0.55$/.test(k.opacity)},r.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";A((a+o.join(b+a)+o.join(c+a)).slice(0,-a.length));return D(k.backgroundImage,"gradient")};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document);

/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);


// yes, DO NOT cache BUST...
$.ajaxSetup({cache:true});
// adcatcher
if(typeof TiiAdTrackRevSci=='undefined'||TiiAdTrackRevSci==null){var TiiAdTrackRevSci=function(){return}}if(typeof qas_writeAd=='undefined'||qas_writeAd==null){var qas_writeAd=function(){return};var quantserve=function(){return}}if(typeof s_time=='undefined'||s_time==null){var s_time=function(){return};s_time.t=function(){return};s_time.getQueryParam=function(){return};s_time.c_r=function(){return}}if(typeof TiiAdFactory=='undefined'||TiiAdFactory==null){var fF=function(){return};var fO=function(){ad=new TiiAd();return ad};var TiiAd=function(){this.setParam=fF;this.setMagicNumber=fF;this.setPosition=fF;this.setZone=fF;this.write=fF;this._formatParams=fF;this._getAdParams=fF;this._getAdTag=fF;this._getAdUrl=fF;this._getImageUrl=fF;this._getClickUrl=fF;this._getDebugHtml=fF;this._getSecureAdTag=fF;this.randomNumber=fF;this.adServer=fF;this.tileNumber=fF;this.zone=fF;this.sitename=fF;this.config=fF};var TiiAdConfig=function(){this.setSitename=fF;this.setCmSitename=fF;this.setPopups=fF;this.setBehaviorTracking=fF;this.setRevSciTracking=fF;this.setTacodaTracking=fF};var TiiAdFactory=function(){this.createAd=fO;this.getAd=fO;this.getCmAd=fO;this.getMultiCmAd=fF;this.getMultiAd=fF;this.getTransitionalAd=fF;this.setArticleId=fF;this.setChannel=fF;this.setChannelPage=fF;this.setContentPage=fF;this.setContentType=fF;this.setPackageId=fF;this.setParam=fF;this.setSubchannel=fF;this.setZone=fF;this.trackBehaviour=fF;this.write=fF}}
// START: FlashObject
if(typeof com=="undefined"){var com=new Object();}if(typeof com.deconcept=="undefined"){com.deconcept=new Object();}if(typeof com.deconcept.util=="undefined"){com.deconcept.util=new Object();}if(typeof com.deconcept.FlashObjectUtil=="undefined"){com.deconcept.FlashObjectUtil=new Object();}com.deconcept.FlashObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a,_b){if(!document.createElement||!document.getElementById){return;}this.DETECT_KEY=_b?_b:"detectflash";this.skipDetect=com.deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();this.useExpressInstall=_7;if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new com.deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=com.deconcept.FlashObjectUtil.getPlayerVersion(this.getAttribute("version"),_7);if(c){this.addParam("bgcolor",c);}var q=_8?_8:"high";this.addParam("quality",q);var _d=(_9)?_9:window.location;this.setAttribute("xiRedirectUrl",_d);this.setAttribute("redirectUrl","");if(_a){this.setAttribute("redirectUrl",_a);}};com.deconcept.FlashObject.prototype={setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},createParamTag:function(n,v){var p=document.createElement("param");p.setAttribute("name",n);p.setAttribute("value",v);return p;},getVariablePairs:function(){var _19=new Array();var key;var _1b=this.getVariables();for(key in _1b){_19.push(key+"="+_1b[key]);}return _19;},getFlashHTML:function(){var _1c="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");}_1c="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";_1c+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1d=this.getParams();_1d["instanceOf"]=null;for(var key in _1d){_1c+=[key]+"=\""+_1d[key]+"\" ";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_1c+="flashvars=\""+_1f+"\"";}_1c+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");}_1c="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";_1c+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _20=this.getParams();for(var key in _20){_1c+="<param name=\""+key+"\" value=\""+_20[key]+"\" />";}var _22=this.getVariablePairs().join("&");if(_22.length>0){_1c+="<param name=\"flashvars\" value=\""+_22+"\" />";}_1c+="</object>";}return _1c;},write:function(_23){if(this.useExpressInstall){var _24=new com.deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_24)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}else{this.setAttribute("doExpressInstall",false);}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _23=="string")?document.getElementById(_23):_23;if(typeof n!='undefined'){n.innerHTML=this.getFlashHTML();}else{document.writeln(this.getFlashHTML());}}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}}};function tiiVBGetFlashVersionExists(){var result=true;try{var dontcare=tiiVBGetFlashVersion(3);}catch(e){result=false}return result;}com.deconcept.FlashObjectUtil.getPlayerVersion=function(_26,_27){var _28=new com.deconcept.PlayerVersion(0,0,0);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_28=new com.deconcept.PlayerVersion(x.description.replace(/([a-z]|[A-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{try{if(!tiiVBGetFlashVersionExists()){var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");for(var i=3;axo!=null;i++){axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);_28=new com.deconcept.PlayerVersion([i,0,0]);}}else{var versionStr="";for(var i=25;i>0;i--){var tempStr=tiiVBGetFlashVersion(i);if(tempStr!=""){versionStr=tempStr;break;}}if(versionStr!=""){var splits=versionStr.split(" ");var splits2=splits[1].split(",");_28=new com.deconcept.PlayerVersion([splits2[0],splits2[1],splits2[2]]);}}}catch(e){}if(_26&&_28.major>_26.major){return _28;}if(!_26||((_26.minor!=0||_26.rev!=0)&&_28.major==_26.major)||_28.major!=6||_27){try{_28=new com.deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}catch(e){}}}return _28;};com.deconcept.PlayerVersion=function(_2c){this.major=parseInt(_2c[0])||0;this.minor=parseInt(_2c[1])||0;this.rev=parseInt(_2c[2])||0;};com.deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};com.deconcept.util={getRequestParameter:function(_2e){var q=document.location.search||document.location.hash;if(q){var _30=q.indexOf(_2e+"=");var _31=(q.indexOf("&",_30)>-1)?q.indexOf("&",_30):q.length;if(q.length>1&&_30>-1){return q.substring(q.indexOf("=",_30)+1,_31);}}return"";},removeChildren:function(n){while(n.hasChildNodes()){n.removeChild(n.firstChild);}}};if(Array.prototype.push==null){Array.prototype.push=function(_33){this[this.length]=_33;return this.length;};}var getQueryParamValue=com.deconcept.util.getRequestParameter;var FlashObject=com.deconcept.FlashObject;var PlayerVersion=com.deconcept.PlayerVersion;
function tiiGetFlashVersion(){var flashversion=0;if(navigator.plugins&&navigator.plugins.length){var x=navigator.plugins["Shockwave Flash"];if(x){if(x.description){var y=x.description;flashversion=y.charAt(y.indexOf('.')-1);}}}else{result=false;for(var i=15;i>=3&&result!=true;i--){execScript('on error resume next: result = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.'+i+'"))','VBScript');flashversion=i;}}return flashversion;}
function tiiDetectFlash(ver){if(tiiGetFlashVersion()>=ver){return true;}else{return false;}}
function tiiArrayContains(array,value){if(array!=null){var al=array.length;for(var i=0;i<al;i++){if(array[i]==value)return true;}}return false;}
function tiiHashKeys(string){var keys=null;if(string!=null){var hash=string.split(';');var hl=hash.length-1;if(hl>0){keys=new Array();for(var i=0;i<hl;i++){var data=hash[i].split('=');keys[i]=data[0].replace(' ','');}}}return keys;}
function tiiHashGet(string,key){var value=null;if(string!=null){var keyStart=key+'=';var offset=string.indexOf(keyStart);if(offset!=-1){offset+=keyStart.length;var end=string.indexOf(';',offset);if(end==-1){end=string.length;}value=string.substring(offset,end);}}return value;}
function tiiHashSet(string,key,value){var string=tiiHashDelete(string,key);var newValue=key+'='+value+';';if(string!=null)newValue=newValue+string;return newValue;}
function tiiHashDelete(string,key){var oldValue=tiiHashGet(string,key);var newString=string;if(oldValue!=null){var search=key+'=';var start=string.indexOf(search);var offset=start+search.length;var end=string.indexOf(';',offset)+1;if(end==-1)end=string.length;newString=string.slice(0,start)+string.slice(end,string.length);return newString;}return newString;}
function tiiGetQueryParamValue(param){var startIndex;var endIndex;var valueStart;var qs=document.location.search;var detectIndex=qs.indexOf("?"+param+"=");var detectIndex2=qs.indexOf("&"+param+"=");var key="&"+param+"=";var keylen=key.length;if(qs.length>1){if(detectIndex!=-1){startIndex=detectIndex;}else if(detectIndex2!=-1){startIndex=detectIndex2;}else{return null;}valueStart=startIndex+keylen;if(qs.indexOf("&",valueStart)!=-1){endIndex=qs.indexOf("&",startIndex+1)}else{endIndex=qs.length}return(qs.substring(qs.indexOf("=",startIndex)+1,endIndex));}return null;}
function tiiCookieExists(cookieName){return tiiArrayContains(tiiCookieGet(),cookieName);}
function tiiCookieGet(cookieName){if(arguments.length==0){return tiiHashKeys(document.cookie);}var cookie=tiiHashGet(document.cookie,cookieName);if(cookie!=null)cookie=unescape(cookie);return cookie;}
function tiiCookieSet(cookieName,cookieValue,domain,path,expires,secure){if(expires!=null){expire_date=new Date();expire_date.setTime(expires);}var curCookie=cookieName+'='+escape(cookieValue)+((expires)?'; expires='+expire_date.toGMTString():'')+((path)?'; path='+path:'')+((domain)?'; domain='+domain:'')+((secure)?'; secure':'');document.cookie=curCookie;}
function tiiCookieSetUnescape(cookieName,cookieValue,domain,path,expires,secure){if(expires!=null){expire_date=new Date();expire_date.setTime(expires);}var curCookie=cookieName+'='+cookieValue+((expires)?'; expires='+expire_date.toGMTString():'')+((path)?'; path='+path:'')+((domain)?'; domain='+domain:'')+((secure)?'; secure':'');document.cookie=curCookie;}
function tiiCookieDelete(cookieName){tiiCookieSet(cookieName,null,null,null,'',0);}
function tiiQuigoSetEnabled(b){_tiiQuigoEnabled=b;}
function tiiQuigoIsEnabled(){if(typeof(_tiiQuigoEnabled)=="boolean"){return _tiiQuigoEnabled;}return true;}
function tiiQuigoWriteAd(pid,placementId,zw,zh,ps){if(tiiQuigoIsEnabled()){qas_writeAd(placementId,pid,ps,zw,zh,'ads.adsonar.com');}}
function tii_callFunctionOnWindowLoad(functionToCall){if(typeof window.addEventListener!='undefined'){window.addEventListener('load',functionToCall,false);}else if(typeof document.addEventListener!='undefined'){document.addEventListener('load',functionToCall,false);}else if(typeof window.attachEvent!='undefined'){window.attachEvent('onload',functionToCall);}else{var oldFunctionToCall=window.onload;if(typeof window.onload!='function'){window.onload=functionToCall;}else{window.onload=function(){oldFunctionToCall();functionToCall();};}}}
function tii_callFunctionOnElementLoad(targetId,functionToCall){var myArguments=arguments;tii_callFunctionOnWindowLoad(function(){window.loaded=true;});var targetElement=document.getElementById(targetId);if(targetElement==null&&!window.loaded){var pollingInterval=setInterval(function(){if(window.loaded){clearInterval(pollingInterval);}targetElement=document.getElementById(targetId);if(targetElement!=null){clearInterval(pollingInterval);var argumentsTemp=new Array();var argumentsTempLength=myArguments.length-2;for(var i=0;i<argumentsTempLength;i++){argumentsTemp[i]=myArguments[i+2];}functionToCall.apply(this,argumentsTemp);}},10);}}
function tii_addEventHandlerOnElementLoad(targetId,eventType,functionToCall,bubbleEventUpDOMTree){tii_callFunctionOnWindowLoad(function(){window.loaded=true;});var targetElement=document.getElementById(targetId);if(targetElement==null&&!window.loaded){var pollingInterval=setInterval(function(){if(window.loaded){clearInterval(pollingInterval);}targetElement=document.getElementById(targetId);if(targetElement!=null){clearInterval(pollingInterval);tii_addEventHandler(targetElement,eventType,functionToCall,bubbleEventUpDOMTree);}},10);}}
function tii_addEventHandler(targetElement,eventType,functionToCall,bubbleEventUpDOMTree){if(!targetElement){window.status='Warning: Tried to attach event to null object';return false;}if(typeof targetElement.addEventListener!='undefined'){targetElement.addEventListener(eventType,functionToCall,bubbleEventUpDOMTree);}else if(typeof targetElement.attachEvent!='undefined'){targetElement.attachEvent('on'+eventType,functionToCall);}else{eventType='on'+eventType;if(typeof targetElement[eventType]=='function'){var oldListener=targetElement[eventType];targetElement[eventType]=function(){oldListener();return functionToCall();}}else{targetElement[eventType]=functionToCall;}}return true;}
function tii_removeEventHandler(targetElement,eventType,functionToRemove,bubbleEventUpDOMTree){if(typeof targetElement.removeEventListener!="undefined"){targetElement.removeEventListener(eventType,functionToRemove,bubbleEventUpDOMTree);}else if(typeof targetElement.detachEvent!="undefined"){targetElement.detachEvent("on"+eventType,functionToRemove);}else{targetElement["on"+eventType]=null;}return true;}
function getDateCurrent(){var today=new Date();var monthName_List=new Date();var arrayMonthNames=new Array("January","February","March","April","May","June","July","August","September","October","November","December");monthNumber=(today.getMonth());monthName=arrayMonthNames[monthNumber];dayNumber=today.getDate();if(dayNumber<10){dayNumber="0"+dayNumber;};var yearNumber=today.getYear();if(yearNumber<1000){yearNumber+=1900;};document.write(monthName+" "+dayNumber+", "+yearNumber);}
function transformURL(pageURL){var tempURL="";var splitURL=pageURL.split(",");var oid=splitURL[2];tempOid=oid.split("_");if(tempOid[2]!=""){if(tempOid[2].length>3){var idThree="articleId";}else{var idThree="scoreId";}}else{var idThree="";};if(tempOid[3]!=""){var idFour="scoreId";}else{var idFour="";};if(idThree=="scoreId"||idFour=="scoreId"){if(idThree=="scoreId"){tempURL=splitURL[0]+","+splitURL[1]+","+tempOid[0]+","+splitURL[3];}else{tempURL=splitURL[0]+","+splitURL[1]+","+tempOid[0]+"_"+tempOid[1]+","+splitURL[3];}}else{tempURL=pageURL};return tempURL;}
function showCenteredPopup(name,url,features,width,height){var top=(screen.height/2)-height/2;var left=(screen.width/2)-width/2;if(features==null||features==''){features=' scrollbars=yes,toolbar=no,menubar=no,status=no,location=no';}window.open(url,name,features+',top='+top+',left='+left+',width='+width+',height='+height);}
function transformURL(pageURL){var tempURL='';var splitURL=pageURL.split(',');var oid=splitURL[2];tempOid=oid.split('_');if(tempOid[2]!=''){if(tempOid[2].length>3){var idThree='articleId';}else{var idThree='scoreId';}}else{var idThree='';}if(tempOid[3]!=''){var idFour='scoreId';}else{var idFour='';}if(idThree=='scoreId'||idFour=='scoreId'){if(idThree=='scoreId'){tempURL=splitURL[0]+','+splitURL[1]+','+tempOid[0]+','+splitURL[3];}else{tempURL=splitURL[0]+','+splitURL[1]+','+tempOid[0]+'_'+tempOid[1]+','+splitURL[3];}}else{tempURL=pageURL}return tempURL;}
function popEmailWin(url){var pageURL=(url)?url:document.URL;if(pageURL.match('#')){pageURL=pageURL.split('#')[0];}if(pageURL.match('/quizzes/')){pageURL=transformURL(pageURL);}var pageTitle=self.document.title;if(pageTitle.indexOf('|')>0){pageTitle=pageTitle.substring(0,pageTitle.indexOf('|'));}var formURL='http://cgi.pathfinder.com/cgi-bin/mail/mailurl2friend.cgi?path=/people/emailfriend&url='+pageURL+'&group=people&title='+escape(pageTitle);showCenteredPopup('emailpop',formURL,'scrollbars=1',460,450);return false;}
function drawPuzzler(codeBase,file){var html='<applet code="AcrossLite" archive="alite.zip" codebase="'+codeBase+'" width="600" height="386">';html+='<PARAM NAME="CABBASE" VALUE="alite.cab">';html+='<PARAM NAME="File" VALUE="'+file+'">';html+='Your web browser does not support Java applets or Java is not enabled in web browser preferences.';html+='</applet>';document.write(html);}
function getRandomNumber(){return(Math.floor(Math.random()*100000+1));}

/*******************************************************************************
 * IE Compatibility
 *******************************************************************************/
if ( $.browser.msie) {
    /*!
     * jQuery-ajaxTransport-XDomainRequest - v1.0.2 - 2014-05-02
     * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
     * Copyright (c) 2014 Jason Moon (@JSONMOON)
     * Licensed MIT (/blob/master/LICENSE.txt)
     */
    (function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return}var n=/^https?:\/\//i;var o=/^get|post$/i;var p=new RegExp('^'+location.protocol,'i');$.ajaxTransport('* text html xml json',function(j,k,l){if(!j.crossDomain||!j.async||!o.test(j.type)||!n.test(j.url)||!p.test(j.url)){return}var m=null;return{send:function(f,g){var h='';var i=(k.dataType||'').toLowerCase();m=new XDomainRequest();if(/^\d+$/.test(k.timeout)){m.timeout=k.timeout}m.ontimeout=function(){g(500,'timeout')};m.onload=function(){var a='Content-Length: '+m.responseText.length+'\r\nContent-Type: '+m.contentType;var b={code:200,message:'success'};var c={text:m.responseText};try{if(i==='html'||/text\/html/i.test(m.contentType)){c.html=m.responseText}else if(i==='json'||(i!=='text'&&/\/json/i.test(m.contentType))){try{c.json=$.parseJSON(m.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(i==='xml'||(i!=='text'&&/\/xml/i.test(m.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(m.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+m.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};m.onprogress=function(){};m.onerror=function(){g(500,'error',{text:m.responseText})};if(k.data){h=($.type(k.data)==='string')?k.data:$.param(k.data)}m.open(j.type,j.url);m.send(h)},abort:function(){if(m){m.abort()}}}})}));

    /* Support for indexOf in deprecated browsers */
    if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e){var t=this.length>>>0;var n=Number(arguments[1])||0;n=n<0?Math.ceil(n):Math.floor(n);if(n<0)n+=t;for(;n<t;n++){if(n in this&&this[n]===e)return n}return-1}}
    
    /* Support for className - ie8 */
    if(!document.getElementsByClassName){document.getElementsByClassName=function(){function e(t,n){n(t);for(var r=0;r<t.childNodes.length;r++){e(t.childNodes[r],n)}}return function(t){var n=[];e(document.body,function(e){if(e.className===t)n.push(e)});return n}}()}

    /* HTML5 Shiv */
    /* @preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
    (function(e,t){function c(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;n.innerHTML="x<style>"+t+"</style>";return r.insertBefore(n.lastChild,r.firstChild)}function h(){var e=b.elements;return typeof e=="string"?e.split(" "):e}function p(e,t){var n=b.elements;if(typeof n!="string"){n=n.join(" ")}if(typeof e!="string"){e=e.join(" ")}b.elements=n+" "+e;y(t)}function d(e){var t=f[e[u]];if(!t){t={};a++;e[u]=a;f[a]=t}return t}function v(e,n,r){if(!n){n=t}if(l){return n.createElement(e)}if(!r){r=d(n)}var o;if(r.cache[e]){o=r.cache[e].cloneNode()}else if(s.test(e)){o=(r.cache[e]=r.createElem(e)).cloneNode()}else{o=r.createElem(e)}return o.canHaveChildren&&!i.test(e)&&!o.tagUrn?r.frag.appendChild(o):o}function m(e,n){if(!e){e=t}if(l){return e.createDocumentFragment()}n=n||d(e);var r=n.frag.cloneNode(),i=0,s=h(),o=s.length;for(;i<o;i++){r.createElement(s[i])}return r}function g(e,t){if(!t.cache){t.cache={};t.createElem=e.createElement;t.createFrag=e.createDocumentFragment;t.frag=t.createFrag()}e.createElement=function(n){if(!b.shivMethods){return t.createElem(n)}return v(n,e,t)};e.createDocumentFragment=Function("h,f","return function(){"+"var n=f.cloneNode(),c=n.createElement;"+"h.shivMethods&&("+h().join().replace(/[\w\-:]+/g,function(e){t.createElem(e);t.frag.createElement(e);return'c("'+e+'")'})+");return n}")(b,t.frag)}function y(e){if(!e){e=t}var n=d(e);if(b.shivCSS&&!o&&!n.hasCSS){n.hasCSS=!!c(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}"+"mark{background:#FF0;color:#000}"+"template{display:none}")}if(!l){g(e,n)}return e}var n="3.7.2";var r=e.html5||{};var i=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var s=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var o;var u="_html5shiv";var a=0;var f={};var l;(function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>";o="hidden"in e;l=e.childNodes.length==1||function(){t.createElement("a");var e=t.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(n){o=true;l=true}})();var b={elements:r.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:n,shivCSS:r.shivCSS!==false,supportsUnknownElements:l,shivMethods:r.shivMethods!==false,type:"default",shivDocument:y,createElement:v,createDocumentFragment:m,addElements:p};e.html5=b;y(t)})(this,document)
}

/*******************************************************************************
 *
 * Globals, Env & Site Settings
 *
 *******************************************************************************/
//	TODO: namespace next 2 lines
source="";
if(tiiGetQueryParamValue("xid")!=null){source=tiiGetQueryParamValue("xid");}
tiiQuigoSetEnabled(true);
//	BEGIN PEOPLE.COM JS
var echo=(typeof(console)=='undefined')?alert:console.log;
String.prototype.htmlentities = function () { // thanks http://snipplr.com/view/19329/convert-to-html-entities/
    return this.replace(/&/g,'%26').replace(/\\/g,''); // not sure if these will ever be needed: .replace(/</g,'&lt;').replace(/>/g,'&gt;')
};

// setting document.domain so polls and fbconnect will play with each other
if ( document.location.href.indexOf('people.com') > 0 ) {
    document.domain = 'people.com';
} else if ( document.location.href.indexOf('peoplestylewatch.com') > 0 ) {
    document.domain = 'peoplestylewatch.com';
}

var PEOPLE = window.PEOPLE || [];

if ( navigator.userAgent.match('iPad') || navigator.userAgent.match('Android') || navigator.userAgent.match('Silk') ) {
    PEOPLE.isTablet = true;
    $('html').addClass('tablet');
} else {
    PEOPLE.isTablet = false;
}

PEOPLE.log = []; // debugging array
PEOPLE.addtolog = function(m){PEOPLE.log.push(m);};
PEOPLE.showlog = function(){for(var i = -1, c = PEOPLE.log.length; ++i < c;){echo(PEOPLE.log[i]);}};
PEOPLE.removeLeadingZeros = function(tmp){if(Number(tmp)<10){tmp=String(tmp).replace(/0/,'');}return tmp;};
PEOPLE.removeHTML = function(str){ // removes HTML from string
    if (str === null || str === '') {return;}
    str = str.replace(/&(lt|gt);/g, function(strMatch, p1){return (p1 == 'lt') ? '<' : '>';});
    str = str.replace(/<\/?[^>]+(>|$)/g,'');
    return str;
};
PEOPLE.staticEnv = function(local) {
    var host = location.hostname,
        env;

    if ( host.match(/localhost/) ) {
        env = local;
    } else if ( host.match(/dev/) ) {
        env = 'http://dev.people.com';
    } else if ( host.match(/qa/) ) {
        env = 'http://qa.people.com';
    } else if ( host.match(/www/) ) {
        env = 'http://img2.timeinc.net';
    } else {
        env = ''; // Defaults to relative for PROD preview.
    }

    return env;
};
PEOPLE.addpeoplenews = function() { // add drop-down JS to Add PEOPLE News, if found
    if (!$('#addpeoplenews').length) {return;}
    $('#addpeoplenews').hover(
        function(){
            $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover click');
        }
    ).find('a:first').click(function(){
            $(this).blur().parent()
                .addClass('click')
                .find('ul:first')
                .addClass('active')
                .hover(
                function(){
                    $(this).addClass('active');
                    $(this).parent().addClass('click');
                },
                function(){
                    $(this).removeClass('active');
                    $(this).parent().removeClass('click');
                }
            );
            return false;
        });
};
PEOPLE.tooltip = function(id) { // based on http://cssglobe.com/lab/tooltip/01/; typical css: #tooltip{position:absolute;border:1px solid #333;background:#f7f5d1;padding:2px 5px;color:#333;}
    var p = (id && $(id).length) ? $(id) : $(document),
        items = p.find('a'),
        i,
        len = items.length,
        s;
    if (items.length > 0) {
        for (i = -1; ++i < len;) {
            s = $(items[i]);
            if (($(id).length || s.hasClass('tooltip')) && s.attr('title')) {
                s.hover(
                    function(e){
                        if (this.title == 'undefined') {return;}
                        this.t = this.title;
                        this.title = '';
                        $('body:first').append('<p id="tooltip" style="top:'+(e.pageY+20)+'px;left:'+(e.pageX-10)+'px;">'+this.t+'</p>');
                    },
                    function(){
                        this.title = this.t;
//	TODO: LEAK? instead, append a single #ttoltip to DOM, re-locate/-populate, .show()/.hide()
                        $('#tooltip').remove();
                    }
                );
            }
        }
    }
};
PEOPLE.emaillink = function(id) {
    if (!$(id).length) {return;}
    var LIs = $(id).find('li'),
        li;
    for (var i = -1, len = LIs.length; ++i < len;) {
        li = $(LIs[i]);
        if (li.hasClass('email')) {
            li.find('a:first').click(function(){return popEmailWin($(this).url);});
        }
    }
};
PEOPLE.addtodaysdate = function(id) {
    if (!$('#'+id).length) {return;}
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
        d = new Date(),
        day = d.getDate(),
        month = d.getMonth(),
        year = d.getFullYear();
    $('<span>'+months[month]+' '+day+', '+year+'</span>').appendTo($('#'+id));
};
PEOPLE.addtwitter = function() {
    if (!$('#twitterfeed').length) {return;}

    var hostname = location.hostname.toString(),
        twitterUrl;

    if ( hostname.match(/localhost/) ) {
        twitterUrl = 'twitter.js';
    } else if ( hostname.match(/dev/) || hostname.match(/qa/) || hostname.match(/preview/) ) {
        twitterUrl = '/people/static/j/twitter/twitter.js?17';
    } else {
        twitterUrl = 'http://img2-short.timeinc.net/people/static/j/twitter/twitter.js?17'; // manually add cache query
    }

    $(document).ready(function() {
        $.getScript( twitterUrl );
    });
};
PEOPLE.addtvlistings = function() {
    if (typeof celebid === 'undefined' && typeof showid === 'undefined' && typeof showname === 'undefined') {return;} // TODO: showid ref can be removed once TVW move to V6 is done

    if ($('body.article').length) {return;}

    if (typeof celebid !== 'undefined') {celebid = celebid.replace(/ /g,'%20');}
    $.getScript('http://img2-short.timeinc.net/people/static/j/tvwatch/tvlistings.js');
    //$.getScript('/people/static/j/tvwatch/tvlistings.js');
};
PEOPLE.startracksoverlay = {
    init : function(ad) { // initialize overlay
        if (ad === '') {return;}
        PEOPLE.startracksoverlay.ad = ad;
        setTimeout(PEOPLE.startracksoverlay.create,1500);
    },
    create : function() {
        var h = '<div id="adoverlay"><a id="closeoverlay" href="#" onclick="PEOPLE.startracksoverlay.remove();return false;" title="Close Ad"><span>Close Ad</span>X</a>'+PEOPLE.startracksoverlay.ad+'</div>';
        $('#middleFirst').addClass('overlay').append(h).find('#C1').animate({'opacity':'0'},1500,function(){$(this).addClass('hide');$('#closeoverlay').show();});
        PEOPLE.startracksoverlay.to = setTimeout(PEOPLE.startracksoverlay.remove,7000);
    },
    remove : function() {
        clearTimeout(PEOPLE.startracksoverlay.to);
        $('#C1').removeClass('hide').animate({'opacity':'100'},1200);
        $('#middleFirst').removeClass('overlay');
        $('#adoverlay').remove();
    }
};
PEOPLE.searchbox = {
    exampleText : 'Search',
    newSrchTerm : 'newsearchterm',
    init	    : function() { //formerly initSearch and SearchForm
        var paramSrchVal = tiiGetQueryParamValue('search'),
            input        = $('#navigationSearchInput');

        if (input) {
            input.focus(function() {
                PEOPLE.searchbox.toggleinput(this);
            }).blur(function() {
                    PEOPLE.searchbox.toggleinput(this);
                });
            if (paramSrchVal) {
                var cleanSrchVal = PEOPLE.removeHTML(paramSrchVal);
                input.val(cleanSrchVal).addClass(this.newSrchTerm);
            } else {
                input.val(this.exampleText);
            }
        }

        $('#navigationSearch span').click( function(){
            $('#navigationSearch').toggleClass('show');
            return false;
        })

    },
    toggleinput	: function(input){
        if (input.value == this.exampleText) {
            $(input).val('').addClass('newsearchterm');
        }else if (input.value == ''){
            $(input).val(this.exampleText).removeClass('newsearchterm');
        }
    }
};
PEOPLE.shorten = {
    login : 'peoplemag',
    key : 'R_012aae50b3d369408fa48b38efab9ac1',
    trim : function(s) {
        var h = s.split('status='),
            r = (h[1].length < 120) ? h[1] : h[1].substring(0,116)+'...';
        return h[0]+'status='+r;
    },
    init : function(elem) {
        $(elem).hover(function(e) {
            if (!$(e.target).parent().hasClass('twitter')) {return false;}
            $(this).unbind('mouseenter mouseleave');
            var a = $(e.target),
                h = decodeURI(a.attr('href'));
            if (h.match('bit.ly') || h.split('status=')[1].length < 141) {return;}
            var l = h.split(' http'),
                b = PEOPLE.shorten.trim(l[0]),
                t = 'http'+l[1],
                u = 'http://api.bitly.com/v3/shorten?login='+PEOPLE.shorten.login+'&apiKey='+PEOPLE.shorten.key+'&longUrl='+t+'&format=json&history=1&callback=?';
            $.getJSON(u,function(response) {
                if (!response || response.status_code != 200) {return false;}
                $(a).attr('href',b+' '+response.data.url);
            });
        });
    }
};
var MasterArray = [];
//	push recirc arrays into Partner Recirc MasterArray
var pushToMasterArray = function(recirc) { //push JSON arrays into MasterArray
    for (var a = -1, len = recirc.recircs.length; ++a < len;) {
        var temp = [recirc.recircs[a]][0],
            last = temp.feed.length;
        if (temp.type && temp.type == 'random') {
            temp.feed.sort(function() {return 0.5 - Math.random();});
            last = temp.display;
        }
        for (var f = -1; ++f < last;) {
            var ids = temp.id.split(','),
                id = (ids.length > 1) ? ids[f] : temp.id;
            temp.feed[f].id = id;
            MasterArray.push(temp.feed[f]);
        }
    }
};

//	initialize Partner Recirc feeds on photo channel page
pushToMasterArray({
    'recircs' : [
        { // new recirc feed calls
            'id'		: 'partner4',
            'feed' 		: [
                {
                    'name'  	: 'Moviefone',
                    'json' 		: 'http://www.people.com/people/static/json/moviefone/feed.js',
                    'site' 		: 'http://www.moviefone.com',
                    'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/moviefone.png',
                    'display'	: 3
                }
            ]
        },{
            'id'		: 'partner5',
            'feed' 		: [
                {
                    'name'  	: 'Huffington Post',
                    'json' 		: 'http://img2-short.timeinc.net/people/static/json/huffingtonpost/feed.js',
                    'site' 		: 'http://www.huffingtonpost.com/entertainment/',
                    'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/huffpost.png',
                    'display'	: 3
                }
            ]
        },{ // old recirc feed calls
            'id'		: 'col2',
            //'type' 		: 'random',		// says to shuffle following feeds
            //'display'	: 1,				// display only this many of the feeds
            'feed' 		: [
                {
                    'name'  	: 'InStyle.com',
                    'json' 		: 'http://img2-short.timeinc.net/people/static/json/instyle_whatsrightnow/feed.js',
                    'site' 		: 'http://www.instyle.com',
                    'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/instyle.png',
                    'display'	: 3
                },
                {
                    'name'  	: 'Moviefone',
                    'json' 		: 'http://www.people.com/people/static/json/moviefone/feed.js',
                    'site' 		: 'http://www.moviefone.com',
                    'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/moviefone.png',
                    'display'	: 3
                }
            ]
        },{
            'id'		: 'col4',
            'feed' 		: [
                {
                    'name'  	: 'Huffington Post',
                    'json' 		: 'http://img2-short.timeinc.net/people/static/json/huffingtonpost/feed.js',
                    'site' 		: 'http://www.huffingtonpost.com/entertainment/',
                    'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/huffpost.png',
                    'display'	: 3
                }
            ]
        }
    ]
});

//	global recirc
var feed = null;
PEOPLE.recirc = {
    nextfeed : -1,
    init : function() {
        if (MasterArray.length > 0) {
            this.arr = MasterArray;
            this.nextfeed = PEOPLE.recirc.arr.length;
            this.getstarted();
        }
    },
    getstarted : function() {
        this.nextfeed--;
        if ($('#'+this.arr[this.nextfeed].id).length) {
            this.arr[this.nextfeed].callback = (this.arr[this.nextfeed].callback) ? this.arr[this.nextfeed].callback : this.recirccallback;
            this.arr[this.nextfeed].display = (this.arr[this.nextfeed].display) ? this.arr[this.nextfeed].display : 3;
            this.arr[this.nextfeed].cta = (this.arr[this.nextfeed].cta) ? this.arr[this.nextfeed].cta : 'Read More at '+this.arr[this.nextfeed].name;
            this.attachscript(this.arr[this.nextfeed]);
        } else {
            if(this.nextfeed > 0) { this.getstarted(); }
        }
    },
    attachscript : function(pos) {
        var name = pos.name.replace(/\./g,'').replace(/ /g,''),
            json = pos.json;
        $.getScript(json);
        this.checkscript(pos);
    },
    checkscript : function(pos) {
        var recircInt = setInterval(function() {
            if (feed) {
                pos.response = [feed];
                feed = null;
                pos.callback(pos);
                if(PEOPLE.recirc.nextfeed > 0){PEOPLE.recirc.getstarted();}
                clearInterval(recircInt);
            }
        },500);
    },
    recirccallback : function(pos) { // PEOPLE.recirccallback, used in new global footer and article right-rail
        if (!$('#'+pos.id).length) {return;}
        var n = PEOPLE.recirc.nextfeed,
            name = pos.name,
            id = name.replace(/\./g,'').replace(/ /g,''),
            site = pos.site,
            image = pos.image,
            cta = pos.cta,
            c = ' class="show"',
            p = $('#'+pos.id),
        // h = '<div id="'+id+'" class="tout recirc'+n+'">';

        /* When Article tracking is approved, use the follow <div id> code instead of the one above:*/
            h = '<div id="'+id+ '_' + pos.id +'" class="tout recirc'+n+'">';


        h += '<p class="header"><span>From</span> <a href="'+site+'" target="_blank"><img src="'+image+'" alt="'+name+'" /></a></p>';
        h += '<div class="recirclinks">';
        h += '<ul>';
        for (var i = -1,d = pos.display,li;++i < d;) {
            li = pos.response[0][i];
            if (li.title != '') {
                h += '<li'+c+'><a href="'+li.url+'" target="_blank">'+li.title+'</a></li>';
                c = '';
            }
        }
        h += '</ul>';
        h += '</div>';
        h += '<p class="more"><a href="'+site+'" target="_blank">'+cta+'</a></p>';
        h += '</div>';
        p.addClass('active').append(h);

        /* Uncomment when Article Tracking is ready: */
        var divID = id+ '_' + pos.id,
			url = location.href,
			isCategory = url.match('category/');
		
        if ( ($('body').hasClass('article') || $('body').hasClass('permalink')) && !isCategory ) {
            PEOPLE.Article.trackArticleRecircPartners(id,divID);
        }

    },
    randomcallback : function(obj) { // formerly randomRecircCallback
        obj.response[0].sort(function(){return 0.5-Math.random();});
        var r = obj.response[0][0],
            id = r.name.replace(/\./g,'').replace(/ /g,'').toLowerCase(),
            name = r.name,
            home = r.home,
            url = r.url,
            title = r.title,
            image = r.image.replace(/http:\/\/preview.people.com/,'http:\/\/img2.timeinc.net').replace(/http:\/\/www.people.com/,'http:\/\/img2.timeinc.net'),
            deck = r.deck,
            p = $('#'+obj.id),
            h = '';
        h += '<div id="'+id+'" class="tout">';
        h += '<h3><a title="'+name+'" href="'+home+'"><span>'+name+'</span></a></h3>';
        h += '<div class="imgcont"><a href="'+url+'"><img src="'+image+'" alt="'+title+'" border="0" height="113" width="150" /></a></div>';
        h += '<div class="txtcont">';
        if ( id == 'peoplepremium' ) {
            h += '<h4><a href="'+url+'" class="premium-link">'+title+'</a></h4>';
        } else {
            h += '<h4><a href="'+url+'">'+title+'</a></h4>';
        }
        h += '<p class="deck"><a href="'+url+'">'+deck+'</a></p>';
        h += '</div>';
        h += '</div>';
        p.addClass('active').append(h);
    }
};

// Twitter Intent Popup
PEOPLE.twitterPopup = function(e){
    var url = $(this).attr("href"),
        width = 550,
        height = 470,
        left = 0,
        top = 0,
        winHeight = screen.height,
        winWidth = screen.width,
		tweetVia,
		isArticle = false;


    // Append Related Twitter Accounts to URL
    if (url.match('&related')) {
        url = url.substring(0, url.lastIndexOf('&'));
    }

    url = url + '&related=People,StyleWatchMag,PeoplePets,PEOPLEbabies';
	
	// Add related account to articles:
	/*
	if ($('body').hasClass('article')) {tweetVia = 'People'; isArticle = true;}
	if ( ($('body#pets').hasClass('article')) && (url.match('article')) ) {tweetVia = 'PeoplePets'; isArticle = true;}
	if ($('body#stylewatch').hasClass('permalink')) {tweetVia = 'StylewatchMag'; isArticle = true;}
	if ($('body#babies').hasClass('permalink')) {tweetVia = 'PEOPLEbabies'; isArticle = true;}
	
	if (isArticle){
		url = url + '&via=' + tweetVia;
	}
	*/


	if (url.match('stylewatch')) {
		tweetVia = 'StylewatchMag';
	}
	else if (url.match('celebritybabies') || url.match('peoplecbb')) {
		tweetVia = 'PEOPLEbabies';
	}
	else if (url.match('pets')) {
		tweetVia = 'PeoplePets';
	}
	else {
		tweetVia = 'People';
	}

	url = url + '&via=' + tweetVia;


    // Get center position for popup
    left = Math.round((winWidth/2) - (width/2));
    if (winHeight > height) {
        top = Math.round((winHeight/2) - (height/2));
    }

    window.open(url, 'intentPopup', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width='+width+',height='+height+',top='+top+', left='+left);

    e.returnValue = false;
    e.preventDefault && e.preventDefault();
};
// end Twitter Intent Popup

// Pinterest Pin It Popup
PEOPLE.pinterestPopup = function(e){

    var	url = $(this).attr("href"),
    //windowName = "popUp",
    //windowSize = "width=670,height=550,scrollbars=auto",
        left = 0, top = 0,
        width = 670, height = 550,
        winHeight = screen.height,
        winWidth = screen.width;

    // Get center position for popup
    left = Math.round((winWidth/2) - (width/2));
    if (winHeight > height) {
        top = Math.round((winHeight/2) - (height/2));
    }

    //window.open(url, windowName, windowSize);
    window.open(url, 'pinPopup', 'width=670,height=550,scrollbars=yes,resizable=yes,toolbar=no,location=yes,width='+width+',height='+height+',top='+top+', left='+left);

    e.returnValue = false;
    e.preventDefault && e.preventDefault();
};
// end Pinterest Pin It Popup

//	initialize global variable for Newswire
var sponsoredPost = false;
//	start recirc feed process
var startRecircFeeds = function() {
    if (sponsoredPost === true) {
        for(var m = 0; m < MasterArray.length; m++){
            if (MasterArray[m].name == 'Celebrity-Babies.com' && MasterArray[m].id == 'recirc3') { MasterArray.splice(m,1); }
            if (MasterArray[m].id == 'recirc1') { MasterArray[m].id = 'recirc3'; }
        }
    }
    PEOPLE.recirc.init();
};

// Set ad sitename
peo_sitename = '3475.peo';

var adConfig = new TiiAdConfig(peo_sitename);
adConfig.setCmSitename('cm.peo');
//	alter adConfig if page is CBB
//	if(location.href.indexOf('/celebritybabies/') > -1){adConfig.sitename = '3475.cbb';} // removed per HZ, per request of CCC
// 	fixes background image "blink" in IE6
try{document.execCommand('BackgroundImageCache',false,true);}catch(e){}
// 	repairing tiiGetFlashVersion
function tiiGetFlashVersion() {
    var flashversion = 0;
    if (navigator.plugins && navigator.plugins.length) {
        var x = navigator.plugins['Shockwave Flash'];
        if(x){
            if (x.description) {
                var a = x.description;
                var b = a.split('.');
                var c = b[0].split(' ');
                flashversion = c[c.length-1];
            }
        }
    } else {
        var result = false;
        for(var i = 15; i >= 3 && result !== true; i--){
            try {
                document.execScript('on error resume next: result = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.'+i+'"))','VBScript');
                flashversion = i;
            } catch (e) {}
        }
    }
    return flashversion;
}
//	repairing old variable isFLASH5
isFLASH5 = (tiiGetFlashVersion() >= 5);
// Tacoda
var tcdacmd='dt';
adConfig.setTacodaTracking(true);
// Revenue Science
adConfig.setRevSciTracking(true);
// cm popups
if(document.referrer.indexOf('google')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('cnn')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('aol')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('netzero')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('earthlink')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('yahoo')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('huffingtonpost')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('popsugar')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('tickle')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('myspace')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('juno')>=0){adConfig.setPopups(false);}
if(document.referrer.indexOf('twitter')>=0){adConfig.setPopups(false);}
// Test for existence of new (tgx.js) library. Cast tgxAds as boolean.
var tgxAds = !!( typeof Tgx_init != 'undefined' );
// Use tgx.js to inject an ad script to a div with given id.
PEOPLE.appendAdScript = function(config) { // id required. w AND h OR multi required.
    var targetDivScript,
        w = config.w ? config.w : null,
        h = config.h ? config.h : null,
        id = config.id,
        hyphen = /\-/g,
        adID = id.replace( hyphen, '_' ),
        adVar = 'ad_' + adID,
        declareAdVar = '',
        zoneString = config.zone ? adVar + '.setZone("' + config.zone + '");' : '',
        posString = config.pos ? adVar + '.setPosition(' + config.pos + ');' : '',
        srndString = config.srnd ? adVar + '.setParam("srnd", ' + config.srnd + ');' : '',
        pidString = config.pid ? adVar + '.setParam("pid", ' + config.pid + ');' : '',
        francString = config.franc ? adVar + '.setParam("franc", "' + config.franc + '");' : '',
        subjString = '',
        code;

    targetDivScript = document.createElement('script');
    targetDivScript.type = 'text/javascript';

    // Condition and loop to allow us to pass config.multi array into the code string.
    if ( config.multi ) {
        var multi = config.multi,
            multiLength = multi.length,
            multiArray = [];

        for ( var i = 0; i < multiLength; i++ ) {
            multiArray.push('\"' + multi[i] + '\"');
        }

        declareAdVar = 'var ' + adVar + ' = adFactory.getMultiAd([' + multiArray + ']);';
    } else {
        declareAdVar = 'var ' + adVar + ' = adFactory.getAd(' + w + ', ' + h + ');';
    }

    // Condition and loop to allow us to pass config.subj array into the code string.
    if ( config.subj ) {
        var subj = config.subj,
            subjLength = subj.length,
            subjArray = [];

        for ( var j = 0; j < subjLength; j++ ) {
            subjArray.push('\"' + subj[j] + '\"');
        }

        subjString = adVar + '.setParam("subj", [' + subjArray + ']);';
    }

    code = declareAdVar +
        zoneString +
        posString +
        srndString +
        pidString +
        francString +
        subjString +
        adVar + '.setParam("dcopt", "ist");' +
        adVar + '.write("' + id + '");';

    try {
        targetDivScript.appendChild(document.createTextNode(code));
    } catch(e) {
        targetDivScript.text = code;
    }

    document.getElementById(id).appendChild(targetDivScript);
};
// attaches hover affects
var tii_attachHoverAffect = function(t,c,n,id) { // t = tagnames to find; c = class to find within t; n = new class to add to c; id = optional parent id
    var p, tags, i, len;
    if (!id){
        p = $(document);
    } else if ($('#'+id) === null) {
        return false;
    } else {
        p = $('#'+id);
    }
    tags = p.find(t);
    len = tags.length;
    for (i = -1;++i < len;) {
        $(tags[i]).hover(
            function(){this.addClass(n);},
            function(){this.removeClass(n);}
        );
    }
};
//	function that creates hover state for all elements, even in IE
var addBookmarkDropdown = function(tag) {
    var items = $(tag),
        len = items.length,
        i, s;
    if (items.length > 0) {
        for (i = -1; ++i < len;) {
            s = $(items[i]);
            if (s.hasClass('bookmarkList')) {
                s.hover(
                    function(){
                        $(this).addClass('hover');
                    },
                    function(){
                        $(this).removeClass('hover click');
                    }
                ).find('a:first').click(function(){
                        $(this).blur().parent()
                            .addClass('click')
                            .find('ul:first')
                            .addClass('active')
                            .hover(
                            function(){
                                $(this).addClass('active');
                                $(this).parent().addClass('click');
                            },function(){
                                $(this).removeClass('active');
                                $(this).parent().removeClass('click');
                            }
                        );
                        return false;
                    });
            }
        }
    }
};
//	removes HTML characters from str; condensed from The JavaScript Source, initial script created by: Robert Nyman | http://robertnyman.com/
var removeHTML = function(str){
    str = str.replace(/&(lt|gt);/g, function(strMatch, p1){return (p1 == 'lt') ? '<' : '>';});
    str = str.replace(/<\/?[^>]+(>|$)/g,'');
    return str;
};
//	adds functionality to String object to get # right characters
String.prototype.right = function(n) {
    if (n <= 0) {return '';}
    else if (n > String(this).length) {return this;}
    else {var l = String(this).length; return String(this).substring(l, l - n);}
};
//	XML HTTP Request
var xmlreqs = [];
var createXMLHttpRequest = function(freed) { //	create HTTPRequest object
    this.freed = freed;
    this.xmlhttp = false;
    if (window.XMLHttpRequest) {
        this.xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        this.xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
};
var XMLHttpChange = function(pos) { //	check/change ready state, send response back to callback function
    if (typeof(xmlreqs[pos]) !== 'undefined' && xmlreqs[pos].freed === 0 && xmlreqs[pos].xmlhttp.readyState === 4) {
        if (xmlreqs[pos].xmlhttp.status === 200 || xmlreqs[pos].xmlhttp.status === 304) {
            if (xmlreqs[pos].url.right(3) === 'xml') {
                xmlreqs[pos].callback(pos,xmlreqs[pos].xmlhttp.responseXML.documentElement);
            } else {
                xmlreqs[pos].callback(pos,xmlreqs[pos].xmlhttp.responseText);
            }
        } else {
            return;
        }
        xmlreqs[pos].freed = 1;
    }
};
var getXMLHttpRequest = function(pos) { //	retrieve feed data
    if (xmlreqs[pos].xmlhttp) {
        xmlreqs[pos].freed = 0;
        xmlreqs[pos].xmlhttp.open('GET',xmlreqs[pos].url,true);
        xmlreqs[pos].xmlhttp.onreadystatechange = function() {
            if (typeof(XMLHttpChange) != 'undefined') { XMLHttpChange(pos); }
        };
        if (window.XMLHttpRequest) {
            xmlreqs[pos].xmlhttp.send(null);
        } else if (window.ActiveXObject) {
            xmlreqs[pos].xmlhttp.send();
        }
    }
};
//	recirculation feed functions
var arrRandomFeeds = [];
var arrStaticFeeds = [];
var arrCalendarDates = [];
//	function to add feeds and randomize arrRandomFeeds
var addRandomFeed = function(name, url, website, image) {
    var n = arrRandomFeeds.length;
    arrRandomFeeds[n] = [];
    arrRandomFeeds[n].name = name;
    arrRandomFeeds[n].url = url;
    arrRandomFeeds[n].website = website;
    arrRandomFeeds[n].image = image;
    arrRandomFeeds.sort(function(){return 0.5 - Math.random();});
};
//	function to add feeds to arrStaticFeeds
var addStaticFeed = function(name, url, website, image) {
    var n = arrStaticFeeds.length;
    arrStaticFeeds[n] = [];
    arrStaticFeeds[n].name = name;
    arrStaticFeeds[n].url = url;
    arrStaticFeeds[n].website = website;
    arrStaticFeeds[n].image = image;
};
//	function to add feeds and randomize arrRandomFeeds
var addCalendarDates = function(c,url) {
    var n = arrCalendarDates.length;
    arrCalendarDates[n] = [];
    arrCalendarDates[n].url = url;
    arrCalendarDates[n].currPeriod = c;
};
//	request ad feed file
var getFeed = function(arrPos,id,callbackFunction) {
    var pos = -1;
    for (var i=0; i < xmlreqs.length; i++) {
        if (xmlreqs[i].freed == 1) { pos = i; break; }
    }
    if (pos == -1) { pos = xmlreqs.length; xmlreqs[pos] = new createXMLHttpRequest(1); }
    xmlreqs[pos].url = arrPos.url;
    xmlreqs[pos].callback = callbackFunction;
    xmlreqs[pos].id = id;
    xmlreqs[pos].arrPos = arrPos;
    getXMLHttpRequest(pos);
};
//	receive ad feed, build HTML elements, place in DOM
var getFeedCallback = function(pos,response) {
    if (!document.getElementById || document.getElementById(xmlreqs[pos].id)) {return;}
    var name = xmlreqs[pos].arrPos.name,
        url = xmlreqs[pos].arrPos.url,
        website = xmlreqs[pos].arrPos.website,
        image = xmlreqs[pos].arrPos.image,
        div = '<div class="txtcont">',
        p = document.getElementById(xmlreqs[pos].id);
    div += '<h4>From <a href="'+website+'" target="_blank"><img src="'+image+'" alt="'+name+'" /></a></h4>';
    div += response;
    div += '<p class="more"><a href="'+website+'" target="_blank">More news at '+name+'</a></p>';
    div += '</div>';
    p.innerHTML = div;
    p.className = p.className + ' active';
};
//	share links
function postToFacebook(u,t){
    var width = 800,
        height = 600,
        top=(screen.height/2)-height/2,
        left=(screen.width/2)-width/2,
        features = 'top='+top+',left='+left+',width='+width+',height='+height+'scrollbars=yes,toolbar=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes';
    window.open('http://www.facebook.com/share.php?u='+encodeURIComponent(u),'facebook',features);
}
function postToMyspace(u,t){
    var width = 800,
        height = 600,
        top=(screen.height/2)-height/2,
        left=(screen.width/2)-width/2,
        features = 'top='+top+',left='+left+',width='+width+',height='+height+'scrollbars=yes,toolbar=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes';
    window.open('http://www.myspace.com/Modules/PostTo/Pages/?' + 't=' + encodeURIComponent(t) + '&u=' + encodeURIComponent(u),'myspace',features);
}
function postToTwitter(u,t){

	// modified this function to match the one in twitterPopup();
    var width = 550,
        height = 470,
        left = 0,
        top = 0,
        winHeight = screen.height,
        winWidth = screen.width,
		tweetURL,
		tweetTitle,
		tweetVia;

	// strip html tags from title
    tweetTitle = t.replace(/<[^>]*>/ig,'');
    tweetTitle = tweetTitle.replace(/[(\/>)<]/ig,'');

	// append correct via account
	if (u.match('stylewatch')) {
		tweetVia = 'StylewatchMag';
	}
	else if (u.match('celebritybabies')) {
		tweetVia = 'PEOPLEbabies';
	}
	else if (u.match('pets')) {
		tweetVia = 'PeoplePets';
	}
	else {
		tweetVia = 'People';
	}

	tweetURL = 'http://twitter.com/share?url='+u + '&text=' + tweetTitle + '&related=People,StyleWatchMag,PeoplePets,PEOPLEbabies&via=' + tweetVia;
	
    // Get center position for popup
    left = Math.round((winWidth/2) - (width/2));
    if (winHeight > height) {
        top = Math.round((winHeight/2) - (height/2));
    }

    window.open(tweetURL, 'intentPopup', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width='+width+',height='+height+',top='+top+', left='+left);

    e.returnValue = false;
    e.preventDefault && e.preventDefault();
}
PEOPLE.fixtwitterlinks = function(el) { // TODO: remove entire function and ref below once closed: https://bugs.timeinc.net/show_bug.cgi?id=33728
    $(el).each(function() {
        var h = this.href;
        $(this).attr('href',h.htmlentities());
    });
    PEOPLE.shorten.init('#sharebar li.twitter,ul.sharebar li.twitter');
}

PEOPLE.Omniture = {
    recordFacebookShare : function(){
        omniTrackEv('fb-share');
    },
    recordTwitterShare : function(){
        omniTrackEv('twitter');
    },
    recordGooglePlus : function(){
        omniTrackEv('google+1');
    },
    recordFacebookLike : function(){
        omniTrackEv('fb-like');
    },
    recordPinterestPin : function () {
        omniTrackEv('pinterest-pinit');
    }
}
// mapped in global namespace because g:plusone callback is unable to take PEOPLE namespace
omnitureRecordGooglePlus = PEOPLE.Omniture.recordGooglePlus;

// open shares in fixed popups
PEOPLE.sharepopups = function() {

    if(typeof FB === "object"){
        FB.Event.subscribe('edge.create', function (response, widget) {
			var domId = widget.id;

            if ( domId != 'fb-like-people' && domId != 'fb-like-hp-rr' ) {
                PEOPLE.Omniture.recordFacebookLike();
            }
        });
    }

    // blog and article sharebar
    $('ul.share li.facebookshare a').each(function() {
        $(this).click(function() {
            postToFacebook($(this).attr('href').split('=')[1]);
            PEOPLE.Omniture.recordFacebookShare();
            return false;
        });
    });
    $('ul.share li.twitter a').each(function() {
        /*			$(this).click(function() {
         var q = $(this).attr('href').split('?')[1].split('&');
         postToTwitter(q[1].split('=')[1],q[0].split('=')[1]);
         PEOPLE.Omniture.recordTwitterShare();
         return false;
         });
         */

        $(this).bind('click',PEOPLE.twitterPopup);
        $(this).click(function() {
            PEOPLE.Omniture.recordTwitterShare();
            return false;
        });

    });

    // gallery sharebar
    $('ul.sharebar li.facebook a').each(function() {
        $(this).click(function() {
            postToFacebook($(this).attr('href').split('=')[1]);
            PEOPLE.Omniture.recordFacebookShare();
            return false;
        });
    });

    $('ul.sharebar li.twitter a').each(function() {
        $(this).bind('click',PEOPLE.twitterPopup);
        $(this).click(function() {
            PEOPLE.Omniture.recordTwitterShare();
            return false;
        });
    });

    $('ul.sharebar li.pinterest a').each(function() {
        $(this).click(function() {
            PEOPLE.Omniture.recordPinterestPin();
            return false;
        });
    });
    // End: gallery sharebar

};

// Rotate app image in footer. Tracking happens in PEOPLE.trackSocialFooter
(function(){

    function rotateAppImage() {
        var random = Math.floor(Math.random() * 10) + 1,
            $appItem = $('#footer-app-item');

        if ( random <= 5 ) {
            $appItem.removeClass('CelebWatch');
            $appItem.addClass('CelebFood');
        } else {
            $appItem.removeClass('CelebFood');
            $appItem.addClass('CelebWatch');
        }
    }

    $( rotateAppImage );
})();

PEOPLE.trackSocialFooter = function() {
    if ( $('#getPeopleFooter').length ) {

        $('ul#socmediaBar li.fb a').bind('click',function(){
            omniTrackEv('UA: footerbar-fb');
        });

        $('ul#socmediaBar li.twitter a').bind('click',function(){
            omniTrackEv('UA: footerbar-twitter');
        });

        $('ul#socmediaBar li.pinterest a').bind('click',function(){
            omniTrackEv('UA: footerbar-pinterest');
        });

        $('ul#socmediaBar li.instagram a').bind('click',function(){
            omniTrackEv('UA: footerbar-instagram');
        });

        $('ul#socmediaBar li.foursquare a').bind('click',function(){
            omniTrackEv('UA: footerbar-foursquare');
        });

        $('ul#socmediaBar li.google a').bind('click',function(){
            omniTrackEv('UA: footerbar-googleplus');
        });

        $('ul#socmediaBar li.tumblr a').bind('click',function(){
            omniTrackEv('UA: footerbar-tumblr');
        });

        $('ul#socmediaBar li#footer-app-item a').bind('click',function(){
            if ( $('#footer-app-item').hasClass('CelebFood') ) {
                omniTrackEv('UA: footerbar-celeb-food');
            } else if ( $('#footer-app-item').hasClass('CelebWatch') ) {
                omniTrackEv('UA: footerbar-celeb-watch');
            }
        });

    } // end: if
} // end: trackSocialFooter

PEOPLE.trackPremiumLinks = function() {
    var premiumToutArray = [],
        hostname = location.hostname,
        parts = hostname.split('.'),
        subdomain = parts.shift(),
        upperLevelDomain = parts.join('.');

    function alreadyTracked() {
        var pathname = location.pathname;

        if ( $('body').attr('id') === 'home' ||
            pathname.match(/\/article\//) ||
            ( typeof omniArticle != 'undefined' && omniArticle === true ) ||
            pathname.match(/\/insider\//) ) {
            return true;
        } else {
            return false;
        }
    }

    function removeCookie() {
        docCookies.removeItem( 'premium-link-track', '/', upperLevelDomain );
    }

    function trackWithCookie(label, text) {
        if ( text.match('Premium:') ) {
            var value = label + ' | ' + text;

            docCookies.setItem( 'premium-link-track', value, null, '/', upperLevelDomain );
        }
    }

    function pushPremiumToutArray(label, text) {
        if ( text.match('Premium:') ) {
            premiumToutArray.push(label + ' | ' + text);
        }
    }

    function tallyPremiumTouts() {
        if ( typeof omniTrackTout != 'undefined' ) {
            if ( premiumToutArray.length != 0 ) {
            omniTrackTout( premiumToutArray.join(';') );
        }
    }
    }

    // Exclude areas of the site that are tracked individually.
    if ( ! alreadyTracked() ) {
        $('.premium-link').each(function(){
            var $this = $(this),
                label = 'GenericLabel',
                text = 'Premium: ' + $this.text();

            pushPremiumToutArray(label, text);

            $this.bind('click', function(){
                trackWithCookie(label, text);
            });
        });

        tallyPremiumTouts();
    }
}

//	can list as many functions as you want and the loader below will load them as soon as the page is loaded
var pageLoadFunctions = function() {
	var urls = ['www.people.com','celebritybabies.people.com','www.peoplestylewatch.com','stylenews.peoplestylewatch.com','www.peoplepets.com'];
	var fbAppId = location.host.match(/peoplestylewatch/) ? '283224633874' : '56579077293';

	// this is original line: does not work in IE and disables partner recirc display
    //if ( (typeof(FB) != 'undefined') && (urls.indexOf(location.host) > -1) ) {

	var inList = jQuery.inArray(location.host, urls);
    if ( (typeof(FB) != 'undefined') && (inList > -1) ) {
		FB.init({appId: fbAppId, status: true, cookie: true, xfbml: true, oauth : true});
	}
    PEOPLE.addpeoplenews();
    PEOPLE.addtwitter();
    PEOPLE.sharepopups();
    PEOPLE.tooltip('#getPeopleEverywhere');
    startRecircFeeds();
    PEOPLE.searchbox.init();
    PEOPLE.tooltip('#sharebar');
    PEOPLE.emaillink('#sharebar');
    PEOPLE.tooltip('ul.sharebar');
    PEOPLE.emaillink('ul.sharebar');
    PEOPLE.addtodaysdate('todaysdate');
    // TODO: remove PEOPLE.fixtwitterlinks below and uncomment PEOPLE.shorten.init once closed: https://bugs.timeinc.net/show_bug.cgi?id=33728
    PEOPLE.fixtwitterlinks('#sharebar li.twitter a,ul.sharebar li.twitter a');
    //PEOPLE.shorten.init('#sharebar li.twitter,ul.sharebar li.twitter');
    PEOPLE.addtvlistings();
    // TODO: remove this code wrapped in check to see if we are on the homepage, but not the 2014 redesign homepage.
    if ( typeof( PEOPLE.Home ) != 'undefined' && typeof( PEOPLE.Home.is2014Redesign ) != 'function' ) {
        PEOPLE.Home.trackcitalinks();
        PEOPLE.Home.trackPinterestFollow();
        tii_callFunctionOnElementLoad('leftColumn',PEOPLE.Home.addoverlayclick);
    }

    PEOPLE.trackSocialFooter();

    if ($('#adFactory') && $('#adFactory').hasClass('iframe')) {
        if (typeof prepareinterstitial=='undefined' || typeof preparesuperstitial=='undefined') {
            function prepareinterstitial() {parent.prepareinterstitial();}
            function preparesuperstitial() {parent.preparesuperstitial();}
        }
    }

    PEOPLE.trackPremiumLinks();
};
tii_callFunctionOnWindowLoad(pageLoadFunctions);
// shows celebdb relatedcontent	box on articles which is hidden by default
var showcelebdbrelatedcontent = function(){ $('#relatedcontent').show(); };


// Google Ads
PEOPLE.writeGoogleAd = function(width, height, channel, maxads){

    google_ad_output = 'js';
    google_safe = 'high';
    google_ad_type = 'text';

    if(channel === 'gallery'){
        google_ad_client = 'ca-timeinc-people-photo';
    }else{
        google_ad_client = 'ca-timeinc-people-bah';
    }
    google_ad_width = width;
    google_ad_height = height;
    google_ad_channel = channel;
    google_max_num_ads = maxads;

    document.write('<script src="http://pagead2.googlesyndication.com/pagead/show_ads.js"><' + '/script>');
};

var google_ad_request_done = function(google_ads) {

    if (google_ads.length < 1 ) {
        return;
    }

    var s = '<div class="googlead"><p class="adtext"><a href="' + google_info.feedback_url + '" target="new">Ads by Google</a></p>';

    for (var i=0; i < google_ads.length; i++) {
        s += ''
            + '<p class="adentry adpos' + (i+1) + '">'
            + '	<span class="line1"><a target="new" href="' + google_ads[i].url + '">' + google_ads[i].line1 + '</a></span>'
            + '	<span class="line2">' + google_ads[i].line2  + '</span><span class="line3">' +  google_ads[i].line3 + '</span>'
            + '	<span class="line4"><a target="new" href="' + google_ads[i].url + '">' + google_ads[i].visible_url + '</a></span>';
        + '</p>';
    }

    s += '</div>'; // closes div.googlead
    document.write(s);
};
// End Google Ads


// Jumptime beacon
PEOPLE.Jumptime = {
    customerName : "timeseg",
    domain : "http://timeseg.jump-time.net/timeseg",
    excludeAdParams : ["rsseg","qc","url"],
    imageUrl : "http://timeseg.jump-time.net/timeseg.gif",
    scriptUrl : "http://beacon.jump-time.net/jt.js",
    getParams : function () {
        return {
            sup: "People",
            sec: s_time.prop16 || "",
            ss: s_time.prop11 || "",
            tag: s_time.prop12 || "",
            caid: adFactory.params.aid || "",
            akv1: (adFactory.sitename || "") + "/" + (adFactory.zone || ""),
            akv2: (function() {
                var params = [];
                for(param in adFactory.params) {
                    if($.inArray(param,PEOPLE.Jumptime.excludeAdParams) < 0) {
                        if(param == "celeb") {
                            if(param.length > 1) {
                                params.push('celeb=' + adFactory.params['celeb'].join('|celeb='));
                            }
                        } else {
                            params.push(param + '=' + adFactory.params[param]);
                        }
                    }
                }
                return params.join('|');
            })(),
            ct: (function() {
                var ptype = adFactory.params.ptype, ctype = adFactory.params.ctype;
                if(ptype && ctype) {
                    return ptype + '|' + ctype;
                } else if (ptype) {
                    return ptype;
                } else {
                    return ctype;
                }
            })()
        }
    },
    track : function() {
        var paramsObj = PEOPLE.Jumptime.getParams();
        var params = PEOPLE.Jumptime.customerName + '&' + $.param(paramsObj);
        jt(PEOPLE.Jumptime.domain,params,true);
    }
};

// optimizely
// document.write('<script src="//cdn.optimizely.com/js/46077909.js"></' + 'script>');

// allow mobile users back to mobile site
if ( tiiCookieGet('PEO_MOBILE') == 'false' ) {
    $(document).ready(function() {
        $('#footer .copyright-wrapper').before('<p id="set-layout">View PEOPLE.com in: <a class="set-mobile" href="http://www.people.com/people/static/mobile/h/remove/a.html">Mobile</a> | <span class="set-classic">Classic</span></p>');
    });
}

$(document).ready(function() {
    // For twitter intent
    $('#getPeopleEverywhere li.twitter a').bind('click',PEOPLE.twitterPopup);
    $('#getPetsEverywhere li.twitter a').bind('click',PEOPLE.twitterPopup);
    $('#fblike #follow a').bind('click',PEOPLE.twitterPopup);

    // Set cookie for Magazine link in navigation
    $('#nav-magazine a').bind('click',function(){
        tiiCookieSet('Origin','Magazine Tab','.people.com','/');
        omniTrackEv('digitalmag_nav');
    });

    // Client-side Games tablet redirect
    if ( PEOPLE.isTablet && ( $('body#gamehome').length > 0 || $('body#games').length > 0 ) ) {
        location.href = 'http://www.people.com/people/archives/photos/0,,20336108,00.html';
    }

});

/* jQuery center helper method. */
(function($){
    $.fn.extend({
        center: function () {
            return this.each(function() {
                var top = ($(window).height() - $(this).outerHeight()) / 2;
                var left = ($(window).width() - $(this).outerWidth()) / 2;
                $(this).css({position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
            });
        }
    });
})(jQuery);

/*\
 |*|
 |*|  :: cookies.js ::
 |*|
 |*|  A complete cookies reader/writer framework with full unicode support.
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
 |*|
 |*|  This framework is released under the GNU Public License, version 3 or later.
 |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 |*|
 |*|  Syntaxes:
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path])
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/

var docCookies = {
    getItem: function (sKey) {
        return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toGMTString();
                    break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
        return aKeys;
    }
};

// Parse out appIds from the TISub cookie.
// This code is duplicated in j/main.js and j/insider/utilities.js
(function() {
    var cookie = docCookies.getItem('TISub');

    PEOPLE.appIds = [];

    if ( cookie != null ) {
        var split = cookie.split('|'),
            length = split.length,
            params = {},
            appIds,
            appIdsLength,
            truncatedAppIds = [];

        for ( var i = 0; i < length; i++ ) {
            var pair = split[i],
                pairSplit = pair.split('~'),
                key = pairSplit[0],
                value = pairSplit[1];

            params[key] = value;
        }

        if ( params['availableAppIds'] ) {
            appIds = params['availableAppIds'].split(','); // Create array from comma-delimited value.
            appIdsLength = appIds.length;

            for ( var j = 0; j < appIdsLength; j++ ) {
                var thisAppId = appIds[j],
                    thisAppIdSplit = thisAppId.split('.'),
                    truncatedAppId = thisAppIdSplit[ thisAppIdSplit.length - 1 ];

                truncatedAppIds.push(truncatedAppId);
            }

            PEOPLE.appIds = truncatedAppIds;
        }
    }
})();

// For Chartbeat.
var _sf_startpt=(new Date()).getTime();

PEOPLE.GlobalTracking = (function () {

    function trackBreakingNews() {
        var link = $('#breaking-news h3 a');

        link.click(function () {
            var label = 'H_BN',
                text = $(this).text();

            linkTrack(label, text);
        });

        if (typeof (twttr) != 'undefined') {
            twttr.events.bind('tweet', function (event) {
                if (event.target.parentElement.id === 'breaking-news') {
                    omniTrackEv('bn-tweet');
                }
            });
        }
    }

    function trackTopNav() {

        function trackPremium() {
            var label = 'GPN';

            $('#people-com').click(function(){
                linkTrack(label, 'PEOPLE.com');
            });
            $('#people-premium').click(function(){
                linkTrack(label, 'PEOPLE Premium');
            });
        }

        function trackNavLinks() {
            var peopleLogo = $('#people-logo a'),
                navLink = $('#nav-links a');

            peopleLogo.click(function () {
                var $this = $(this),
                    label = $this.attr('id'),
                    text = $this.attr('title') ? $this.attr('title') : $this.text();

                linkTrack(label, text);
            });

            navLink.click(function () {
                var $this = $(this),
                    label = $this.attr('id'),
                    text = $this.attr('title') ? $this.attr('title') : $this.text();

                linkTrack(label, text);
            });
        }

        function trackSocial() {
            if (typeof (FB) != 'undefined') {
                FB.Event.subscribe('edge.create',
                    function (response, widget) {
                        var domId = widget.dom.id;

                        if (domId === 'fb-like-people') {
                            omniTrackEv('fb-like-people');
                        }
                    }
                );
            }

            if (typeof (twttr) != 'undefined') {
                twttr.events.bind('follow', function (event) {
                    if (event.data.screen_name === 'People') {
                        omniTrackEv('twitter-follow-people');
                    }
                });
            }
        }

        function trackSearch() {
            $('#navigationSearchSubmit').click(function () {
                var label = $(this).attr('id'),
                    text = $('#navigationSearchInput').attr('value');

                linkTrack(label, text);
            });
        }

        trackPremium();
        trackNavLinks();
        trackSocial();
        trackSearch();
    }

    function trackFooter() {
        setTimeout(function () {
            var link = $('#footer .links li a, #footer .links2 li a');

            link.each(function (i) {
                var $this = $(this),
                    labelPrefix = 'S6_',
                    labelSuffix = i + 1, // labels are one indexed
                    label = labelPrefix + labelSuffix,
                    text = $this.text();

                $this.click(function () {
                    linkTrack(label, text);
                });
            });
        }, 1000);
    }

	function trackFooterSubscribe(){
		var $sublinks = $('ul.footer-list-subscribe a');
	
		for (i=0; i < $sublinks.length; i++) {
			$sublinks.eq(i).data('trackcode','SB_F'+(i+1));
		}
	
		$sublinks.each(function(){
			var linktext = $(this).text();
			$(this).data('tracktext', linktext);
		});

		$sublinks.bind('click',function(){
			linkTrack($(this).data('trackcode'), $(this).data('tracktext'));
		});
	}
	
	function trackFooterAdvertise(){
		$('ul.footer-list-advertise a').each(function(){
			$(this).bind('click',function(){
				linkTrack('AD_F9', 'Online and In Print');
			});
		});
	}
	
	function trackFooterLearn(){
		var $learnlinks = $('ul.footer-list-learn a');
	
		for (i=0; i < $learnlinks.length; i++) {
			$learnlinks.eq(i).data('trackcode','LM_F'+(i+10));
		}
	
		$learnlinks.each(function(){
			var linktext = $(this).text();
			$(this).data('tracktext', linktext);
		});
	
		$learnlinks.bind('click',function(){
			linkTrack($(this).data('trackcode'), $(this).data('tracktext'));
		});
	}

    function trackOutbrainVideo() {
        var $obVideo = $('.ob_video');

        if ( $obVideo.length != 0 ) {
            var prefix,
                host = location.hostname,
                path = location.pathname;

            if ( path.match('/article/') ) {
                prefix = 'News_Outbrain';
            }

            if ( $('body').hasClass('caughtintheact') ) {
                prefix = 'CITA_Outbrain';
            }

            if ( path.match('/gallery/') ) {
                prefix = 'Gallery_Outbrain'
            }

            if ( path.match('/package/') ) {
                prefix = 'Pkg_Outbrain';
            }

            if ( host.match('peoplestylewatch') ) {
                prefix = 'SW_Outbrain';
            }

            if ( host.match('celebritybabies') ) {
                prefix = 'CBB_Outbrain';
            }

            if ( host.match('greatideas') ) {
                prefix = 'Great Ideas_Outbrain';
            }

            $obVideo.each(function(i){
                var $this = $(this),
                    $parentLink = $this.parents('.item-link-container');

                $parentLink.bind('click', function(){
                    var $that = $(this),
                        count = i + 1,
                        suffix = 'Video_Positon' + count,
                        label = prefix + ' ' + suffix,
                        text = $.trim( $that.find('.strip-rec-link-title').text() );

                    linkTrackArt(label, text);
                });
            });
        }
    }

	// Move Celebs link next to search bar when promoting a new section in the top nav
	function moveCelebsLink (){
		var celebLink = '<div id="celeb-link"><p class="more"><a id="N9" href="http://www.people.com/people/celebrities/">All Celebs</a></p></div>';
		$('#site-banner #banner-search').after(celebLink);
	}

    function init() {
        if ($('#breaking-news-banner').length != 0) {
            trackBreakingNews();
        }

        if ( typeof attachHomePageCMLinks === 'undefined' ) {
            trackTopNav();
        }
        trackFooter();
		trackFooterSubscribe();
		trackFooterAdvertise();
		trackFooterLearn();
        trackOutbrainVideo();
		moveCelebsLink();
    }

    return {
        init: init
    }

})();

$(PEOPLE.GlobalTracking.init);

// Lazy loading lazy-proc images.
(function(){
    function lazyProcImageLoading() {
        var $lazyProc = $("img.lazy-proc");

        if ( $lazyProc.length != 0 ) {
            $.getScript('http://img2-1.timeinc.net/people/static/j/jquery-plugins/jquery.lazyload.min.js', function () {
                $lazyProc.lazyload({
                    effect: 'fadeIn'
                });
                $(window).trigger('scroll');
            });
        }
    }

    $( lazyProcImageLoading );
})();

PEOPLE.omniTrackList = function(track_list, debug) {
    $.each(track_list, function( index ) {
        $(track_list[index].element).on('click', function() {
            debug ? alert(track_list[index].omni_id) : omniTrackEv(track_list[index].omni_id);
        });
    });
};

PEOPLE.omniTrackListLTV = function(track_list, debug) {
    $.each(track_list, function( index ) {
        $(track_list[index].element).on('click', function() {
            debug ? alert(track_list[index].omni_label+' | '+track_list[index].omni_id) : linkTrack(track_list[index].omni_label, track_list[index].omni_id);
        });
    });
};

PEOPLE.plugin_cheetah_form = function (args, callback) {
    /* -------------------------------------------------------------------------------------------------
     @NAME: Cheetah Form Plugin
     @VERSION: 2.3
     @CREATED: 3/5/2014
     @UPDATED: 5/15/2014
     @AUTHOR: Giancarlo Morillo
     @EMAIL: gmorillo@levelg.com
     @LAYOUT:
     @PARAMETERS:
     container	: $('#ssg_newsletter_popup') [jquery element object]
     name		: 'sticky-newsletter'		 [string]
     source		: 'sticky_newsletter_form'	 [string]
     n			: 9							 [int]
     property_id	: 1709726180				 [int]
     @CALLBACK:
     - not required
     - returns errors, can check length of error var to determine success status
     @ACCESSIBILITY:
     - alert(myform.test_function());
     - alert(myform.form_id);
     - alert(myform.test_function2());
     @IMPLEMENTATIONS:
     - Desktop:Articles:Gutter Social Sticky
     - Home page newsletter sign up include
     - Articles sitewide (desktop & mobile)
     @TEST: /static/h/test/plugins/cheetah_form.html
     @TODO
     - integrate all existing cheetah forms with plugin, update & test
     - implement callback hooks similar to jQuery plugins within object var declarations
     I.E. submit, success, fail, alerts for errors as default in plugin unless overrided, etc
     ---------------------------------------------------------------------------------------------------- */
    // Vars
    var
        $container 	= args.container,
        $form 		= $container.find('.container form'),
        $email		= $form.find('input[type="email"]'),
        $thankyou	= $container.find('.thankyou'),
        fsub		= args.fsub,
        n			= args.n,
        property_id = args.property_id,
        source		= args.source,
        errors		= [],
        submit_track= args.submit_track;

    // Placeholder Support
    var email_placeholder = $email.attr('placeholder') ? $email.attr('placeholder') : 'Enter Your Email Address';
    $email.removeAttr('placeholder').addClass('placeholder').val(email_placeholder)
        .focus(function() { if(this.value == email_placeholder) $(this).val('').removeClass('placeholder'); })
        .blur (function() { if(this.value === '') $(this).addClass('placeholder').val(email_placeholder); });

    // Select All Checkbox
    if( $form.find('#select-all') ) {
        var $select_all_box = $form.find('#select-all');
        $select_all_box.bind('click', function() {
            var check_it = $select_all_box.prop('checked');
            $form.find(".checkbox").each(function( index ) {
                if( $(this).attr('id') != 'select-all') $(this).attr('checked',check_it);
            });
        });
    }

    // Process Form
    var submit_form = function () {
        var $checkboxes = $container.find('.checkbox');

        // Append Hidden Form
        if(!$container.find('.hidden-form').length) {
            var html = ''
                + '<form class="hidden-form" action="https://ebm.cheetahmail.com/r/regf2" target="news-submitiframe" method="post" style="display:none;">'
                + 	'<input value="'+property_id+'" type="hidden" name="aid">'
                + 	'<input value="'+n+'" type="hidden" name="n">';
            if( source=='inarticle_pegreatideas' && fsub=='2094088252' ){ //gi custom source
                html += '<input type="hidden" name="PE_GREAT_IDEAS_SOURCE" value="inarticle_pegreatideas"/>';
            } else if( source=='inarticle_pepets_rightrail' && fsub=='2068954055' ) { // pets custom source
                html += '<input type="hidden" name="PEOPLE_SOURCEPETS" value="'+source+'"/>';
            } else {
                html += '<input type="hidden" name="PEOPLE_SOURCE" value="'+source+'"/>';
            }
            if(!$checkboxes.length && fsub) html += '<input type="hidden" name="fsub" value="'+fsub+'"/>';
            html += '<input class="email" type="text" name="email" value="empty">'
                + '</form>'
                + '<iframe class="submit-iframe" name="news-submitiframe" border="0" frameborder="0" height="0"></iframe>';
            $container.append(html);
        }

        // Clear Vars
        var
            validates 		= true,
            $hidden_form 	= $container.find('.hidden-form'),
            $submit_iframe 	= $container.find('.submit-iframe');
        errors 			= [];

        // Email Validation
        validateEmail($email) ? $hidden_form.find('.email').val($email.val()) : validates = false;

        // Checkbox Validation
        if($checkboxes.length) {
            if( validateCheckboxes( $checkboxes ) ){
                $checkboxes.each(function( index ) {
                    if( $(this).is(':checked') && $(this).val()!='select-all' ) $hidden_form.append('<input type="hidden" name="fsub" value="'+$(this).val()+'"/>');
                });
            } else validates = false;
        }

        // Submit Form
        if(validates) {
            $hidden_form.submit().remove();
            typeof submit_track === 'function' ? submit_track() : omniTrackEv(submit_track);
        }
        // Callback Function
        typeof callback == 'function' ? callback.call(this, errors) : default_callback(errors);
    };
    // Submit Event
    $container.find('form .submit-button').bind('click touchstart', function() { submit_form(); });
    // Return Key Submit
    $form.keypress(function (e) {
        if(e.which == 13) {
            e.preventDefault();
            submit_form();
        }
    });
    // Helper Methods
    function validateEmail($email) {
        var filter=/^\w+([.+-]+\w+)*@([\w\-]+\.)+[a-z]{2,4}$/i;
        if( filter.test( $email.val() ) && $email.val()!=null && $email.val().trim()!=="" ) {
            return true;
        } else {
            errors.push( { element: $email, msg: "Please check your email address." } );
            return false;
        }
    }
    function validateCheckboxes($checkboxes){
        if( $checkboxes && $form.find("input:checkbox:checked").length > 0 ){
            return true;
        } else {
            errors.push( { element: $checkboxes, msg: "Please check a newsletter checkbox." } );
            return false;
        }
    }
    function default_callback(errors) {
        if( errors.length > 0 ) { // fail
            var msg = 'There was a problem:\n';
            $(errors).each(function( index ) {
                errors[index].element.addClass('error');
                msg+=errors[index].msg+'\n';
            });
            alert(msg);
        } else { // success
            $form.hide();
            $thankyou.fadeIn(100);
        }
    }
};

// Implement Cheetahmail form for global footer.
$(document).ready(function(){
    if ( $('#newsletter_signup_footer').length != 0 ) {
        var $container = $('#newsletter_signup_footer'),
            $email = $container.find('.email'),
            $all = $container.find('#footer-select-all'),
			$tvwatch = $container.find('#footer-tv-watch'),
			$duggars = $container.find('#footer-duggars'), 
			$bachelor = $container.find('#footer-bachelor'), 
            $checkbox = $container.find('.checkbox'),
            $submit = $container.find('.submit-button'),
            $seeAll = $container.find('.see-all'),
            footer_newsletter_form;

        $email.focus(function(){
            $(this).addClass('focus');
        });

        $all.click(function(){
            if ( $(this).is(':checked') ) {
                $checkbox.prop('checked', true);
            } else {
                $checkbox.prop('checked', false);
            }
        });

        $tvwatch.click(function(){
            if ( $(this).is(':checked') ) {
                $duggars.prop('checked', true);
				$bachelor.prop('checked', true);
            } else {
                $duggars.prop('checked', false);
                $bachelor.prop('checked', false);
            }
        });

        $seeAll.click(function(){
            linkTrack('S6_NL', 'All Newsletters');
        });

        function newsletterFormCallback(errors) {
            if( errors.length > 0 ) { // fail
                var msg = 'There was a problem:\n';
                $(errors).each(function( index ) {
                    errors[index].element.addClass('error');
                    msg += errors[index].msg + '\n';
                });
                alert(msg);
            } else { // success
                var $container = $('#newsletter_signup_footer'),
                    $form = $container.find('form'),
                    $checked = $form.find('.checkbox:checked'),
                    $thankyou = $container.find('.thankyou'),
                    $thankyouItem = $thankyou.find('li');

                $form.hide();
                $checked.each(function(){
                    var id = $(this).attr('id'),
                        matchedThanks = id.replace('footer', 'thankyou');

                    $('.' + matchedThanks).removeClass('hidden');
                });
                $thankyou.fadeIn(100);
            }
        }

        footer_newsletter_form = new PEOPLE.plugin_cheetah_form({
            container: $container,
            name: 'footer-newsletter',
            source: 'footer_newsletter_form',
            n: 9,
            property_id: 1709726180,
            submit_track: 'footer-newsletter-submit'
        }, newsletterFormCallback);
    }
    PEOPLE.omniTrackList([
        { element: '#footer.footer-v2 .footer-list-fb'        , omni_id: "footer-connect-facebook"   },
        { element: '#footer.footer-v2 .footer-list-twitter'   , omni_id: "footer-connect-twitter"    },
        { element: '#footer.footer-v2 .footer-list-plus'      , omni_id: "footer-connect-googleplus" },
        { element: '#footer.footer-v2 .footer-list-instagram' , omni_id: "footer-connect-instagram"  },
        { element: '#footer.footer-v2 .footer-list-pinterest' , omni_id: "footer-connect-pinterest"  },
        { element: '#footer.footer-v2 .footer-list-tumblr'    , omni_id: "footer-connect-tumblr"     },
        { element: '#footer.footer-v2 .footer-list-foursquare', omni_id: "footer-connect-foursquare" }
    ], false);
});

/*
 * Preference Center Upgrade Browser Overlay.
 * Lifted from the Magazine tab Browser Overlay.
 */
PEOPLE.preferenceCenterOverlay = function() {
    if ( $('#pc-upgrade-pop-up').length === 0 && $('#pc-upgrade-overlay').length === 0 ) {
        var markup = '<div id="pc-upgrade-pop-up">' +
            '<a id="pc-upgrade-close" href="#">Close</a>' +
            '<img src="http://img2.timeinc.net/people/static/i/preference-center/hdr-upgrade.png" width="640" height="81" alt="PEOPLE" class="logo">' +
                '<h2>Whoops!</h2>' +
                '<p>We\'ve upgraded our Email Management page and unfortunately your version of<br />Internet Explorer will not work.</p>' +
                '<p>In order to use this feature, and more of the latest features on PEOPLE.com,<br />please upgrade your version now or select a different browser.</p>' +
                '<div class="sec2">' +
                    '<div class="sec2-col"><img src="http://img2.timeinc.net/people/static/i/preference-center/pu2-chrome.png" width="123" height="157" alt="Google Chrome"><img src="http://img2.timeinc.net/people/static/i/preference-center/pu2-btn-download.png" alt="Download Chrome" class="link" onclick="window.open(\'https://www.google.com/intl/en/chrome/browser/\',\'undefined\')"></div>' +
                    '<div class="sec2-col"><img src="http://img2.timeinc.net/people/static/i/preference-center/ie_10.png" width="123" height="157" alt="Internet Explorer"><img src="http://img2.timeinc.net/people/static/i/preference-center/pu2-btn-download.png" alt="Download IE" class="link" onclick="window.open(\'http://www.microsoft.com/en-us/download/internet-explorer-10-details.aspx\',\'undefined\')"></div>' +
                    '<div class="sec2-col"><img src="http://img2.timeinc.net/people/static/i/preference-center/pu2-firefox.png" width="123" height="157" alt="Firefox"><img src="http://img2.timeinc.net/people/static/i/preference-center/pu2-btn-download.png" alt="Download Firefox" class="link" onclick="window.open(\'http://www.mozilla.org/en-US/firefox/fx/#desktop\',\'undefined\')"></div>' +
                    '<div class="sec2-col"><img src="http://img2.timeinc.net/people/static/i/preference-center/pu2-safari.png" width="123" height="157" alt="Safari"><img src="http://img2.timeinc.net/people/static/i/preference-center/pu2-btn-download.png" alt="Download Safari" class="link" onclick="window.open(\'http://www.apple.com/safari/\',\'undefined\')"></div>' +
                    '<div class="clear"></div>' +
                '</div>' +
                '<p>If you don\'t want to upgrade your browser, you can use the links at the bottom of your PEOPLE emails to manage your preferences.</p>' +
                '<a id="pc-upgrade-back" href="#">Back to <em>PEOPLE.com</em></a>' +
                '<div class="legal">' +
                    '<p>Google Chrome&#8482; browser is a trademark of Google Inc. Use of this trademark is subject to Google Permissions. Safari is a registered trademark of Apple Inc.,registered in the U.S. and other countries. Internet Explorer and Mozilla Firefox are registered trademarks of Microsoft Corporation in the United States and other countries.</p>' +
                '</div>' +
            '</div>' +
            '<div id="pc-upgrade-overlay"></div>';

        $('body').append(markup);
        $('#pc-upgrade-close').live('click', function(e){
            e.preventDefault();
            hideOverlay();
        });
        $('#pc-upgrade-overlay').live('click', function(){
            hideOverlay();
        });
        $('#pc-upgrade-back').live('click', function(){
            hideOverlay();
        });
    }

    var $popUp = $('#pc-upgrade-pop-up'),
        $overlay = $('#pc-upgrade-overlay'),
        windowBound = false;

    $overlay.addClass('show');
    $popUp.addClass('show');
    $popUp.center();

    if ( windowBound === false ) {
        $(window).bind('resize', function(){
            $popUp.center();
        });
        windowBound = true;
    }

    function hideOverlay() {
        $('#pc-upgrade-pop-up').removeClass('show');
        $('#pc-upgrade-overlay').removeClass('show');
    }
}

/**
 * Global page header and nav with breaking news, and fixed treatment.
 */
PEOPLE.PageHeaderNav = (function($) {

	isSticky= false; //Nav starts as not sticky

    function newsletter() {
        var $mail = $('#page-header-icon-mail');
    }

    function shopStates() {
	    $('.primary-nav-item-shop a img').hover(
	    	function() {
	    		 var src = "http://img2.timeinc.net/people/static/i/homepage-progressive/shop-nav-hover.png";
   				$(this).attr('src',src);
	    	} , function() {
	    		var src = "http://img2.timeinc.net/people/static/i/homepage-progressive/shop-nav.png";
   				$(this).attr('src',src);
	    	}
	    );
	};    

    function stickyNav() {
        var $win = $(window),
        	distanceScrollTop= 0,
            lastScrollTop = 0;

        $win.scroll(function(){
            var scrollTop = $win.scrollTop(),
                winScrollDistance = parseInt(scrollTop),
                $pageMarker = $('#page-header-scroll-marker'),
                $navOuter = $('#nav-outer'),
                $navInner= $('.primary-nav-inner'),
                $breakingNewsOuter = $('#page-breaking-news-outer'),
                hasBreakingNews = $breakingNewsOuter.length != 0;

            if ( winScrollDistance < $pageMarker.offset().top ) {//scrolled past the fold

            	if(isSticky){//Nav has become unstuck
            	$navOuter.removeClass('fixed');
                $breakingNewsOuter.removeClass('fixed');
                isSticky = false;
            	
            	}

            } else {  

            	isSticky = true;

                if ( hasBreakingNews ) {
                    if ( scrollTop > lastScrollTop ) {
                       
                        // downscroll
                        distanceScrollTop= 0; 
                        $navOuter.removeClass('fixed');
                        $breakingNewsOuter.addClass('fixed'); 

                    } else {
                    	
                        // upscroll
                        var scrollDistance=  lastScrollTop - scrollTop;
                        distanceScrollTop += scrollDistance;

                        if(distanceScrollTop >= 500){//Revert back to normal nav after 500px scroll

	                        $navOuter.addClass('fixed');
	                        $breakingNewsOuter.removeClass('fixed');
	                        distanceScrollTop= 0;

	                    }    
                    }

                    lastScrollTop = scrollTop;
                } else {//set default header
                    $navOuter.addClass('fixed');
                }
           
            }
        });
    }

    function search() {
        var $searchToggler = $('#primary-search-toggler'),
            $search = $('#navigation-search');

        $searchToggler.click(function(e){
            var $this = $(this);

            e.preventDefault();
            e.stopPropagation();

            if ( $this.hasClass('is-active') ) {
                $search.removeClass('show');
                $this.removeClass('is-active');
            } else {
                $search.addClass('show');
                $this.addClass('is-active');
            }

            $('.secondary-nav-group').removeClass('show')
        });

        $(document).click(function(){
            $search.removeClass('show');
            $searchToggler.removeClass('is-active');
        });

        $search.click(function(e){
            e.stopPropagation();
        });
    }

    function navPanels() {
        var $navGroupLink = $('.has-nav-group'),
            $navGroup = $('.secondary-nav-group');

        $navGroupLink.click(function(e){
            var $this = $(this),
                $thisNavGroup = $( '#' + $this.attr('data-nav-group-id') );

            e.preventDefault();
            e.stopPropagation();

            if ( $thisNavGroup.hasClass('show') ) {
                $navGroup.removeClass('show');
            } else {
                $navGroup.removeClass('show');
                $thisNavGroup.addClass('show');
            }

            $('#navigation-search').removeClass('show');
            $('#primary-search-toggler').removeClass('is-active');
        });

        $(document).click(function(){
            $navGroup.removeClass('show');
        });

        $navGroup.click(function(e){
            e.stopPropagation();
        });
    }

    function tracking() {
        var $links = $('a[data-page-header-track]'),
            $breakingNews = $('#page-breaking-news h3 a'),
            $searchSubmit = $('#navigation-search-submit');

        $links.click(function(){
            var $this = $(this),
                sticky = isSticky ? ' Sticky' : '',
                label = $this.attr('data-page-header-track') + sticky,
                text = $this.text();

            linkTrack( label.toUpperCase(), text.toUpperCase() );
        });

        $breakingNews.click(function(){
            var sticky = isSticky ? ' Sticky' : '',
                label = 'H_BN' + sticky,
                text = $(this).text();

            linkTrack( label.toUpperCase(), text.toUpperCase() );
        });

        $searchSubmit.click(function(){
            linkTrack( 'navigationSearchSubmit', '' );
        });
    }

    function init() {
        if ( $('#page-header').length != 0 ) {
            search();
            newsletter();
            // Can set PEOPLE.enableStickyNav = false on pages where we do not want the sticky.
            if (typeof PEOPLE.enableStickyNav === 'undefined' || PEOPLE.enableStickyNav === true) {
                stickyNav();
            }
            navPanels();
            tracking();
            shopStates();
        }
    }

    return {
        init: init
    }
})(jQuery);

$(PEOPLE.PageHeaderNav.init);