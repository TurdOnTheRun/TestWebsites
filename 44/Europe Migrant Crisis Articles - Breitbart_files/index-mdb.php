//global variable for de-duping tracker
if (top.__SNT_TRACKER_CALLED__ === undefined) {
        top.__SNT_TRACKER_CALLED__ = false;
}

//needed for currentExecutingScript and postscribe
!function(){function t(t,o){t=t||"",o=o||{};for(var u in e)e.hasOwnProperty(u)&&(o.autoFix&&(o["fix_"+u]=!0),o.fix=o.fix||o["fix_"+u]);var c=[],f=document.createElement("div"),g=function(t){return"string"==typeof t&&-1!==t.indexOf("&")?(f.innerHTML=t,f.textContent||f.innerText||t):t},l=function(e){t+=e},m=function(e){t=e+t},p={comment:/^<!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},T={comment:function(){var e=t.indexOf("-->");return e>=0?{content:t.substr(4,e-1),length:e+3}:void 0},endTag:function(){var e=t.match(a);return e?{tagName:e[1],length:e[0].length}:void 0},atomicTag:function(){var e=T.startTag();if(e){var n=t.slice(e.length);if(n.match(new RegExp("</\\s*"+e.tagName+"\\s*>","i"))){var a=n.match(new RegExp("([\\s\\S]*?)</\\s*"+e.tagName+"\\s*>","i"));if(a)return{tagName:e.tagName,attrs:e.attrs,content:a[1],length:a[0].length+e.length}}}},startTag:function(){var e=t.indexOf(">");if(-1===e)return null;var a=t.match(n);if(a){var i={},o={},u=a[2];return a[2].replace(r,function(t,e){if(arguments[2]||arguments[3]||arguments[4]||arguments[5])if(arguments[5])i[arguments[5]]="",o[e]=!0;else{var n=arguments[2]||arguments[3]||arguments[4]||s.test(e)&&e||"";i[e]=g(n)}else i[e]=null;u=u.replace(t,"")}),{tagName:a[1],attrs:i,booleanAttrs:o,rest:u,unary:!!a[3],length:a[0].length}}},chars:function(){var e=t.indexOf("<");return{length:e>=0?e:t.length}}},v=function(){for(var e in p)if(p[e].test(t)){i&&console.log("suspected "+e);var n=T[e]();return n?(i&&console.log("parsed "+e,n),n.type=n.type||e,n.text=t.substr(0,n.length),t=t.slice(n.length),n):null}},h=function(t){for(var e;e=v();)if(t[e.type]&&t[e.type](e)===!1)return},d=function(){var e=t;return t="",e},N=function(){return t};return o.fix&&!function(){var e=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,n=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,a=[];a.last=function(){return this[this.length-1]},a.lastTagNameEq=function(t){var e=this.last();return e&&e.tagName&&e.tagName.toUpperCase()===t.toUpperCase()},a.containsTagName=function(t){for(var e,n=0;e=this[n];n++)if(e.tagName===t)return!0;return!1};var r=function(t){return t&&"startTag"===t.type&&(t.unary=e.test(t.tagName)||t.unary,t.html5Unary=!/\/>$/.test(t.text)),t},s=v,i=function(){var e=t,n=r(s());return t=e,n},u=function(){var t=a.pop();m("</"+t.tagName+">")},c={startTag:function(t){var e=t.tagName;"TR"===e.toUpperCase()&&a.lastTagNameEq("TABLE")?(m("<TBODY>"),g()):o.fix_selfClose&&n.test(e)&&a.containsTagName(e)?a.lastTagNameEq(e)?u():(m("</"+t.tagName+">"),g()):t.unary||a.push(t)},endTag:function(t){var e=a.last();e?o.fix_tagSoup&&!a.lastTagNameEq(t.tagName)?u():a.pop():o.fix_tagSoup&&f()}},f=function(){s(),g()},g=function(){var t=i();t&&c[t.type]&&c[t.type](t)};v=function(){return g(),r(s())}}(),{append:l,readToken:v,readTokens:h,clear:d,rest:N,stack:c}}var e=function(){var t,e={},n=this.document.createElement("div");return t="<P><I></P></I>",n.innerHTML=t,e.tagSoup=n.innerHTML!==t,n.innerHTML="<P><i><P></P></i></P>",e.selfClose=2===n.childNodes.length,e}(),n=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,a=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,r=/(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,s=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,i=!1;t.supports=e,t.tokenToString=function(t){var e={comment:function(t){return"<!--"+t.content},endTag:function(t){return"</"+t.tagName+">"},atomicTag:function(t){return i&&console.log(t),e.startTag(t)+t.content+e.endTag(t)},startTag:function(t){var e="<"+t.tagName;for(var n in t.attrs){e+=" "+n;var a=t.attrs[n];("undefined"==typeof t.booleanAttrs||"undefined"==typeof t.booleanAttrs[n])&&(e+='="'+(a?a.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"')}return t.rest&&(e+=t.rest),e+(t.unary&&!t.html5Unary?"/>":">")},chars:function(t){return t.text}};return e[t.type](t)},t.escapeAttributes=function(t){var e={};for(var n in t){var a=t[n];e[n]=a&&a.replace(/(^|[^\\])"/g,'$1\\"')}return e};for(var o in e)t.browserHasFlaw=t.browserHasFlaw||!e[o]&&o;this.htmlParser=t}();
!function(){function a(a,h){a=a||"",h=h||{};for(var i in b)b.hasOwnProperty(i)&&(h.autoFix&&(h["fix_"+i]=!0),h.fix=h.fix||h["fix_"+i]);var j=[],k=document.createElement("div"),l=function(a){return"string"==typeof a&&-1!==a.indexOf("&")?(k.innerHTML=a,k.textContent||k.innerText||a):a},m=function(b){a+=b},n=function(b){a=b+a},o={comment:/^<!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p={comment:function(){var b=a.indexOf("-->");return b>=0?{content:a.substr(4,b),length:b+3}:void 0},endTag:function(){var b=a.match(d);return b?{tagName:b[1],length:b[0].length}:void 0},atomicTag:function(){var b=p.startTag();if(b){var c=a.slice(b.length);if(c.match(new RegExp("</\\s*"+b.tagName+"\\s*>","i"))){var d=c.match(new RegExp("([\\s\\S]*?)</\\s*"+b.tagName+"\\s*>","i"));if(d)return{tagName:b.tagName,attrs:b.attrs,content:d[1],length:d[0].length+b.length}}}},startTag:function(){var b=a.indexOf(">");if(-1===b)return null;var d=a.match(c);if(d){var g={},h={},i=d[2];return d[2].replace(e,function(a,b){if(arguments[2]||arguments[3]||arguments[4]||arguments[5])if(arguments[5])g[arguments[5]]="",h[b]=!0;else{var c=arguments[2]||arguments[3]||arguments[4]||f.test(b)&&b||"";g[b]=l(c)}else g[b]=null;i=i.replace(a,"")}),{tagName:d[1],attrs:g,booleanAttrs:h,rest:i,unary:!!d[3],length:d[0].length}}},chars:function(){var b=a.indexOf("<");return{length:b>=0?b:a.length}}},q=function(){for(var b in o)if(o[b].test(a)){g&&console.log("suspected "+b);var c=p[b]();return c?(g&&console.log("parsed "+b,c),c.type=c.type||b,c.text=a.substr(0,c.length),a=a.slice(c.length),c):null}},r=function(a){for(var b;b=q();)if(a[b.type]&&a[b.type](b)===!1)return},s=function(){var b=a;return a="",b},t=function(){return a};return h.fix&&!function(){var b=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,c=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,d=[];d.last=function(){return this[this.length-1]},d.lastTagNameEq=function(a){var b=this.last();return b&&b.tagName&&b.tagName.toUpperCase()===a.toUpperCase()},d.containsTagName=function(a){for(var b,c=0;b=this[c];c++)if(b.tagName===a)return!0;return!1};var e=function(a){return a&&"startTag"===a.type&&(a.unary=b.test(a.tagName)||a.unary,a.html5Unary=!/\/>$/.test(a.text)),a},f=q,g=function(){var b=a,c=e(f());return a=b,c},i=function(){var a=d.pop();n("</"+a.tagName+">")},j={startTag:function(a){var b=a.tagName;"TR"===b.toUpperCase()&&d.lastTagNameEq("TABLE")?(n("<TBODY>"),l()):h.fix_selfClose&&c.test(b)&&d.containsTagName(b)?d.lastTagNameEq(b)?i():(n("</"+a.tagName+">"),l()):a.unary||d.push(a)},endTag:function(a){var b=d.last();b?h.fix_tagSoup&&!d.lastTagNameEq(a.tagName)?i():d.pop():h.fix_tagSoup&&k()}},k=function(){f(),l()},l=function(){var a=g();a&&j[a.type]&&j[a.type](a)};q=function(){return l(),e(f())}}(),{append:m,readToken:q,readTokens:r,clear:s,rest:t,stack:j}}var b=function(){var a,b={},c=this.document.createElement("div");return a="<P><I></P></I>",c.innerHTML=a,b.tagSoup=c.innerHTML!==a,c.innerHTML="<P><i><P></P></i></P>",b.selfClose=2===c.childNodes.length,b}(),c=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,d=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,e=/(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,f=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,g=!1;a.supports=b,a.tokenToString=function(a){var b={comment:function(a){return"<!--"+a.content},endTag:function(a){return"</"+a.tagName+">"},atomicTag:function(a){return g&&console.log(a),b.startTag(a)+a.content+b.endTag(a)},startTag:function(a){var b="<"+a.tagName;for(var c in a.attrs){b+=" "+c;var d=a.attrs[c];("undefined"==typeof a.booleanAttrs||"undefined"==typeof a.booleanAttrs[c])&&(b+='="'+(d?d.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"')}return a.rest&&(b+=a.rest),b+(a.unary&&!a.html5Unary?"/>":">")},chars:function(a){return a.text}};return b[a.type](a)},a.escapeAttributes=function(a){var b={};for(var c in a){var d=a[c];b[c]=d&&d.replace(/(^|[^\\])"/g,'$1\\"')}return b};for(var h in b)a.browserHasFlaw=a.browserHasFlaw||!b[h]&&h;this.htmlParser=a}(),function(){function a(){}function b(a){return a!==m&&null!==a}function c(a){return"function"==typeof a}function d(a,b,c){var d,e=a&&a.length||0;for(d=0;e>d;d++)b.call(c,a[d],d)}function e(a,b,c){var d;for(d in a)a.hasOwnProperty(d)&&b.call(c,d,a[d])}function f(a,b){return e(b,function(b,c){a[b]=c}),a}function g(a,c){return a=a||{},e(c,function(c,d){b(a[c])||(a[c]=d)}),a}function h(a){try{return o.call(a)}catch(b){var c=[];return d(a,function(a){c.push(a)}),c}}function i(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("script"):!1}function j(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("style"):!1}var k={afterAsync:a,afterDequeue:a,afterStreamStart:a,afterWrite:a,autoFix:!0,beforeEnqueue:a,beforeWriteToken:function(a){return a},beforeWrite:function(a){return a},done:a,error:function(a){throw a},releaseAsync:!1},l=this,m=void 0;if(!l.postscribe){var n=!1,o=Array.prototype.slice,p=function(a){return a[a.length-1]},q=function(){function a(a,c,d){var e=k+c;if(2===arguments.length){var f=a.getAttribute(e);return b(f)?String(f):f}b(d)&&""!==d?a.setAttribute(e,d):a.removeAttribute(e)}function g(b,c){var d=b.ownerDocument;f(this,{root:b,options:c,win:d.defaultView||d.parentWindow,doc:d,parser:htmlParser("",{autoFix:c.autoFix}),actuals:[b],proxyHistory:"",proxyRoot:d.createElement(b.nodeName),scriptStack:[],writeQueue:[]}),a(this.proxyRoot,"proxyof",0)}var k="data-ps-";return g.prototype.write=function(){[].push.apply(this.writeQueue,arguments);for(var a;!this.deferredRemote&&this.writeQueue.length;)a=this.writeQueue.shift(),c(a)?this.callFunction(a):this.writeImpl(a)},g.prototype.callFunction=function(a){var b={type:"function",value:a.name||a.toString()};this.onScriptStart(b),a.call(this.win,this.doc),this.onScriptDone(b)},g.prototype.writeImpl=function(a){this.parser.append(a);for(var b,c,d,e=[];(b=this.parser.readToken())&&!(c=i(b))&&!(d=j(b));)b=this.options.beforeWriteToken(b),b&&e.push(b);this.writeStaticTokens(e),c&&this.handleScriptToken(b),d&&this.handleStyleToken(b)},g.prototype.writeStaticTokens=function(a){var b=this.buildChunk(a);if(b.actual)return b.html=this.proxyHistory+b.actual,this.proxyHistory+=b.proxy,this.proxyRoot.innerHTML=b.html,n&&(b.proxyInnerHTML=this.proxyRoot.innerHTML),this.walkChunk(),n&&(b.actualInnerHTML=this.root.innerHTML),b},g.prototype.buildChunk=function(a){var b=this.actuals.length,c=[],e=[],f=[];return d(a,function(a){var d=htmlParser.tokenToString(a);if(c.push(d),a.attrs){if(!/^noscript$/i.test(a.tagName)){var g=b++;e.push(d.replace(/(\/?>)/," "+k+"id="+g+" $1")),"ps-script"!==a.attrs.id&&"ps-style"!==a.attrs.id&&f.push("atomicTag"===a.type?"":"<"+a.tagName+" "+k+"proxyof="+g+(a.unary?" />":">"))}}else e.push(d),f.push("endTag"===a.type?d:"")}),{tokens:a,raw:c.join(""),actual:e.join(""),proxy:f.join("")}},g.prototype.walkChunk=function(){for(var c,d=[this.proxyRoot];b(c=d.shift());){var e=1===c.nodeType,f=e&&a(c,"proxyof");if(!f){e&&(this.actuals[a(c,"id")]=c,a(c,"id",null));var g=c.parentNode&&a(c.parentNode,"proxyof");g&&this.actuals[g].appendChild(c)}d.unshift.apply(d,h(c.childNodes))}},g.prototype.handleScriptToken=function(a){var b=this.parser.clear();if(b&&this.writeQueue.unshift(b),a.src=a.attrs.src||a.attrs.SRC,a=this.options.beforeWriteToken(a)){a.src&&this.scriptStack.length?this.deferredRemote=a:this.onScriptStart(a);var c=this;this.writeScriptToken(a,function(){c.onScriptDone(a)})}},g.prototype.handleStyleToken=function(a){var b=this.parser.clear();b&&this.writeQueue.unshift(b),a.type=a.attrs.type||a.attrs.TYPE||"text/css",a=this.options.beforeWriteToken(a),a&&this.writeStyleToken(a),b&&this.write()},g.prototype.writeStyleToken=function(a){var b=this.buildStyle(a);this.insertStyle(b),a.content&&(b.styleSheet&&!b.sheet?b.styleSheet.cssText=a.content:b.appendChild(this.doc.createTextNode(a.content)))},g.prototype.buildStyle=function(a){var b=this.doc.createElement(a.tagName);return b.setAttribute("type",a.type),e(a.attrs,function(a,c){b.setAttribute(a,c)}),b},g.prototype.insertStyle=function(a){this.writeImpl('<span id="ps-style"/>');var b=this.doc.getElementById("ps-style");b.parentNode.replaceChild(a,b)},g.prototype.onScriptStart=function(a){a.outerWrites=this.writeQueue,this.writeQueue=[],this.scriptStack.unshift(a)},g.prototype.onScriptDone=function(a){return a!==this.scriptStack[0]?void this.options.error({message:"Bad script nesting or script finished twice"}):(this.scriptStack.shift(),this.write.apply(this,a.outerWrites),void(!this.scriptStack.length&&this.deferredRemote&&(this.onScriptStart(this.deferredRemote),this.deferredRemote=null)))},g.prototype.writeScriptToken=function(a,b){var c=this.buildScript(a),d=this.shouldRelease(c),e=this.options.afterAsync;a.src&&(c.src=a.src,this.scriptLoadHandler(c,d?e:function(){b(),e()}));try{this.insertScript(c),(!a.src||d)&&b()}catch(f){this.options.error(f),b()}},g.prototype.buildScript=function(a){var b=this.doc.createElement(a.tagName);return e(a.attrs,function(a,c){b.setAttribute(a,c)}),a.content&&(b.text=a.content),b},g.prototype.insertScript=function(a){this.writeImpl('<span id="ps-script"/>');var b=this.doc.getElementById("ps-script");b.parentNode.replaceChild(a,b)},g.prototype.scriptLoadHandler=function(a,b){function c(){a=a.onload=a.onreadystatechange=a.onerror=null}function d(){c(),b()}function e(a){c(),g(a),b()}var g=this.options.error;f(a,{onload:function(){d()},onreadystatechange:function(){/^(loaded|complete)$/.test(a.readyState)&&d()},onerror:function(){e({message:"remote script failed "+a.src})}})},g.prototype.shouldRelease=function(a){var b=/^script$/i.test(a.nodeName);return!b||!!(this.options.releaseAsync&&a.src&&a.hasAttribute("async"))},g}();l.postscribe=function(){function b(){var a,b=j.shift();b&&(a=p(b),a.afterDequeue(),b.stream=d.apply(null,b),a.afterStreamStart())}function d(c,d,g){function j(a){a=g.beforeWrite(a),m.write(a),g.afterWrite(a)}m=new q(c,g),m.id=i++,m.name=g.name||m.id,e.streams[m.name]=m;var k=c.ownerDocument,l={close:k.close,open:k.open,write:k.write,writeln:k.writeln};f(k,{close:a,open:a,write:function(){return j(h(arguments).join(""))},writeln:function(){return j(h(arguments).join("")+"\n")}});var n=m.win.onerror||a;return m.win.onerror=function(a,b,c){g.error({msg:a+" - "+b+":"+c}),n.apply(m.win,arguments)},m.write(d,function(){f(k,l),m.win.onerror=n,g.done(),m=null,b()}),m}function e(d,e,f){c(f)&&(f={done:f}),f=g(f,k),d=/^#/.test(d)?l.document.getElementById(d.substr(1)):d.jquery?d[0]:d;var h=[d,e,f];return d.postscribe={cancel:function(){h.stream?h.stream.abort():h[1]=a}},f.beforeEnqueue(h),j.push(h),m||b(),d.postscribe}var i=0,j=[],m=null;return f(e,{streams:{},queue:j,WriteStream:q})}()}}();
!function(t,r){"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?module.exports=r():t.currentExecutingScript=r()}(this||window,function(){function t(t){return t?t.replace(/^\s+$|\s+$/g,"").replace(/\s\s+/g," "):""}function r(t,r){var e,n=null;if(r=r||p,"string"==typeof t&&t)for(e=r.length;e--;)if(r[e].src===t){n=r[e];break}return n}function e(r,e){var n,a,i=null,c=t(r);if(e=e||p,r&&c)for(n=e.length;n--;)if(!e[n].hasAttribute("src")&&(a=t(e[n].text),-1!==a.indexOf(c))){if(i){i=null;break}i=e[n]}return i}function n(t){var r,e,n=null;for(t=t||p,r=0,e=t.length;e>r;r++)if(!t[r].hasAttribute("src")){if(n){n=null;break}n=t[r]}return n}function a(t,r){var e,n,i=null,c="number"==typeof r;return r=c?Math.round(r):0,"string"==typeof t&&t&&(c?e=t.match(/(data:text\/javascript(?:;[^,]+)?,.+?|(?:|blob:)(?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/):(e=t.match(/^(?:|[^:@]*@|.+\)@(?=data:text\/javascript|blob|http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)(data:text\/javascript(?:;[^,]+)?,.+?|(?:|blob:)(?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),e&&e[1]||(e=t.match(/\)@(data:text\/javascript(?:;[^,]+)?,.+?|(?:|blob:)(?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/))),e&&e[1]&&(r>0?(n=t.slice(t.indexOf(e[0])+e[0].length),i=a(n,r-1)):i=e[1])),i}function i(){return null}function c(){return null}function o(){if(0===p.length)return null;var t,i,c,l,f,b=[],v=o.skipStackDepth||1,w=null;for(t=0;t<p.length;t++)h&&d?u.test(p[t].readyState)&&b.push(p[t]):b.push(p[t]);if(i=new Error,k&&(c=i.stack),!c&&m)try{throw i}catch(y){c=y.stack}if(c&&(l=a(c,v),f=r(l,b),!f&&s&&l===s&&(f=w?e(w,b):n(b))),f||1===b.length&&(f=b[0]),f||g&&(f=document.currentScript),!f&&h&&d)for(t=b.length;t--;)if("interactive"===b[t].readyState){f=b[t];break}return f||(f=b[b.length-1]||null),f}var l,u=/^(interactive|loaded|complete)$/,f=window.location?window.location.href:null,s=f?f.replace(/#.*$/,"").replace(/\?.*$/,"")||null:null,p=document.getElementsByTagName("script"),d="readyState"in(p[0]||document.createElement("script")),h=!window.opera||"[object Opera]"!==window.opera.toString(),g="currentScript"in document;"stackTraceLimit"in Error&&Error.stackTraceLimit!==1/0&&(l=Error.stackTraceLimit,Error.stackTraceLimit=1/0);var k=!1,m=!1;!function(){try{var t=new Error;throw k="string"==typeof t.stack&&!!t.stack,t}catch(r){m="string"==typeof r.stack&&!!r.stack}}(),o.skipStackDepth=1;var b=o;return b.near=o,b.far=i,b.origin=c,b});


(function() {
   //local constants
   var DOMAIN = "breitbart.com",
      VERTICAL = "realestate",
      CLICKY_ID = "100905372",
      PF_WIDGET_URL = "http://w1.synapsys.us/widgets/realestate/most_voted.html?%7B%22dom%22%3A%22breitbart.com%22%2C%22loc%22%3A%7B%22loc_id%22%3A%7B%22value%22%3A%22-null%22%2C%22city%22%3A%22%22%2C%22state%22%3Anull%7D%2C%22loc%22%3A%7B%22city%22%3A%5B%5D%2C%22zipcode%22%3A%5B%5D%7D%2C%22loc_name%22%3A%22%22%7D%2C%22c_id%22%3A%22100905372%22%2C%22remn%22%3A%22true%22%2C%22bord%22%3A%22false%22%2C%22category%22%3A%22realestate%22%2C%22targ%22%3A%22_top%22%7D",
      PF_WIDGET_EMBED_SRC = "http://content.synapsys.us/embeds/realestate/rand_politics_7/remnant.js",
      PF_WIDGET_WIDTH = "300",
      PF_WIDGET_HEIGHT = "600",
      PF_WIDGET_TYPE = "realestate_most_voted",
      PF_WIDGET_OFFSET_X = "0",
      PF_WIDGET_OFFSET_Y = "0",
      AD_STACK_WIDTH = "300",
      AD_STACK_HEIGHT = "250",
      AD_STACK_OFFSET_X = "0",
      AD_STACK_OFFSET_Y = "-250",
      AD_UNIT_NAME = "breitbart_com_remnant_300x250",
      REALVU_CONFIG = {s: "300x250", c: "E115", p: "3428"},
      OPENX_AUID = "538184351",
      OPENX_CS = "51d95c774d",
      BREAL_ID = "",
      CRITEO_ZONEID = "326178",
      RUBICON_KW = "breitbart_com_remnant_300x250",
      RUBICON_SITE = "81066",
      RUBICON_ZONESIZE = "380432-15",
      NATIVE_PIXEL_ID = "ffab2412d9900e9ad5587570f1b73e91558f3cbe",
      NATIVE_ZONE_ID = "19948",
      NATIVE_CHANNEL_ID = "",
      SOVRN_ZONE_ID = "320690",
      GAMUT_ZONE_ID = "2000003429007",
      GAMUT_SITE_ID = "2000100634880";

   var protocolToUse = (location.protocol == "https:") ? "https" : "http";
   var pathForSecure = (location.protocol == "https:") ? "s" : "l";


   function activate_tracker(attachToMe) {
      trackerSource = protocolToUse + "://content.synapsys.us/t/1436337860/tracker-rem.js";
      console.log("__SNT_TRACKER_CALLED__ > ",top.__SNT_TRACKER_CALLED__);

      if (!top.__SNT_TRACKER_CALLED__) {
         top.__SNT_TRACKER_CALLED__ = true;

         $('#iscsynapsyswidget1').insertAfter($('#isctaboolawidget'));         //add tracker script
         _$.getScript(trackerSource + "?dom=" + DOMAIN + "&remn=" + true + "&r=" + Math.floor((Math.random() * 100000000000000000) + 10000))
            .done(function(script, textStatus) {
               console.log("Tracker loaded");
            })
            .fail(function(jqxhr, settings, exception) {
               console.log("Tracker failed to load");
               setTimeout(function() {
                  //try again in 500ms
                  activate_tracker(attachToMe);
               }, 500);
            });

         //add geo script
/*          if (Math.floor(Math.random() * 100000) < 1) {
            _$("<script></script>", {src: protocolToUse + "://api.synapsys.us/etc/gc/"}).appendTo(attachToMe);
         } */

         //insert Clicky
         _$.getScript("//static.getclicky.com/js")
            .done(function(script, textStatus) {
               try{
                  clicky.init(CLICKY_ID);
                  console.log("Clicky initialized");
               }catch(e){
                  console.log("Error initializing clicky", e);
               }
            })
            .fail(function(jqxhr, settings, exception){
               console.log("Clicky source code failed to load");
            });
         
         //insert GA via GTM
         (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
               'gtm.start' :
               new Date().getTime(),
               event : 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
               j = d.createElement(s),
               dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
               '//www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
         })(window, document, 'script', 'dataLayer', 'GTM-WDG7BV');
         
         //activate the GA pageview event
         dataLayer.push({
            "event": "pageview",
            "Domain Name": DOMAIN,
            "Vertical": VERTICAL
         });
      }
      
      //activate the GA widet-load event
      dataLayer.push({
         "event": "widget-load",
         "Domain Name": DOMAIN,
         "Widget Type": PF_WIDGET_TYPE
      });
   };


   var _$;

   if (window.jQuery === undefined || window.jQuery.fn.jquery !== "2.2.0") {
      var st = document.createElement("script");
      st.setAttribute("type","text/javascript");
      st.setAttribute("src", protocolToUse + "://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js");

      if (st.readyState) {
         st.onreadystatechange = function () {	//
            if (this.readyState == "complete" || this.readyState == "loaded") { scriptLoadHandler(); }
         };
      } else { st.onload = scriptLoadHandler; }

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(st);
   } else {
      _$ = window.jQuery;
      main();
   }


   function scriptLoadHandler() {
      _$ = window.jQuery.noConflict(true);
      /*
      _$.when(
         _$.getScript(protocolToUse + "://content.synapsys.us/gl.js"),
         _$.Deferred(function(deferred){
            _$(deferred.resolve);
         })
      ).done(function(){
         // when all scripts are loaded... fire main function
         main();
      });
      */
      main();
   }


   // clean up the main function, please
   function main() {
      var currentScript = currentExecutingScript(),
         div_main_widget,
         ifr_main_widget,
         div_ad_stack,
         div_ad_queue = [],
         cycleQueue,
         clearQueue,
         dequeue_ad,
         passback = false,
         receivePassbackCall,
         setupPassbackCatcher,
         paint_house,
         paint_realvu,
         pattern_realvu_div = "div_realvu_ad_",
         paint_openx,
         pattern_openx_div = "div_openx_ad_",
         paint_breal,
         pattern_breal_div = "div_breal_ad_",
         pattern_breal_ifr = "ifr_breal_ad_",
         paint_conversant,
         pattern_conversant_div = "div_conversant_ad_",
         pattern_conversant_ifr = "ifr_conversant_ad_",
         paint_criteo,
         pattern_criteo_div = "div_criteo_ad_",
         paint_rubicon,
         pattern_rubicon_div = "div_rubicon_ad_",
         pattern_rubicon_ifr = "ifr_rubicon_ad_",
         paint_native,
         pattern_native_div = "div_native_ad_",
         paint_sovrn,
         pattern_sovrn_div = "div_sovrn_ad_",
         paint_adblade,
         pattern_adblade_div = "div_adblade_ad_",
         paint_gamut,
         pattern_gamut_div = "div_gamut_ad_",
         guid,
         timer_queue_paint = null,
         timer_passback_catcher = null,
         timer_onLoad = null,
         timer_visibility = null,
         timer_adCycle = null,
         timer_realvu = null,
         timer_openx = null,
         timer_ims = null,
         show_div,
         playAdCycle,
         hoverTrigger,
         isElementVisible,
         checkVisibility,
         prevOnDisplay = "none",
         adOnDisplay = "none",
         onLoad = {	//upon initial load
            iter: 0,
            order: [
               'realvu',
'gamut',
'sovrn',
'realvu',
'sovrn',
'realvu',
'criteo',
'gamut',
'realvu',
'criteo',
'gamut',
'openx'            ],
            timing: [
               14000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
19000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
19000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
9000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
9000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
43000 + Math.ceil(Math.random() * 14000)            ],
            replay: false
         },
         onHover = {	//upon widget mouse-over
            iter: 0,
            order: [
               'criteo',
'realvu',
'native',
'gamut',
'openx'            ],
            timing: [
               9000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
29000 + Math.ceil(Math.random() * 2000)            ],
            replay: true
         },
/* 			onLowVis = {	//when ad area leaves the screen
            iter: 0,
            order: [
               "house"
            ],
            timing: [
               delay_standard
            ],
            replay: false
         }, */
         onVisible = {	//when ad area enters the screen
            iter: 0,
            order: [
               'criteo',
'realvu',
'native',
'gamut',
'openx'            ],
            timing: [
               9000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
14000 + Math.ceil(Math.random() * 2000),
29000 + Math.ceil(Math.random() * 2000)            ],
            replay: true	//whether the onVisible cycle should repeat continuously
         },
         delay_paint = 1,	//how much time allowed for pre-loading ads
         delay_visibility = 3500,	//how much time to wait before running the onVisible
         delay_onLoad = onLoad.timing.reduce(function(a, b) {	//how much time the initial ad displays
            return a + b;
         }),
         delay_standard = 33000,	//how much time to display standard ads
         delay_realvu = 33000,
         delay_openx = 33000,
         delay_ims = 33000,
         delay_breal = 33000,
         delay_conversant = 33000,
         delay_criteo = 33000,
         browserVisible = true,
         getTopIframe;

      _$(window).load(function() {
         window.loaded = true;
      });


      function guid() {
         function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
         }
         return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

      var mainId = "div_pfwidget_" + PF_WIDGET_TYPE + guid();
      
      div_main_widget = _$("<div></div>", {
         id: mainId,
         "ad_unit_name": AD_UNIT_NAME
      }).css({
         display: "block",
         height: PF_WIDGET_HEIGHT,
         width: PF_WIDGET_WIDTH,
         margin: 0,
         border: 0,
         overflow: "hidden",
         position: "relative",
         backgroundColor: "#fff",
         "z-index": 0
      }).insertBefore(_$(currentScript));

      if (PF_WIDGET_HEIGHT > 0) {	//for ad-stack only implementations
         ifr_main_widget = _$("<iframe></iframe>", {
            id: "ifr_pfwidget_" + PF_WIDGET_TYPE,
            frameBorder: "0",
            scrolling: "no",
            allowTransparency: "true",
            src: PF_WIDGET_URL
         }).css({
            display: "block",
            height: PF_WIDGET_HEIGHT,
            width: PF_WIDGET_WIDTH,
            margin: 0,
            "margin-left": PF_WIDGET_OFFSET_X + "px",
            "margin-top": PF_WIDGET_OFFSET_Y + "px",
            border: 0,
            overflow: "hidden",
            "z-index": 0
         }).appendTo(div_main_widget);
      }


      //no ad-stack height means no ad-stack; widget only
      if (AD_STACK_HEIGHT > 0) {
         div_ad_stack = _$("<div></div>", {
            id: "div_ad_stack_" + guid()
         }).css({
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "relative",
            margin: 0,
            "margin-left": AD_STACK_OFFSET_X + "px",
            "margin-top": AD_STACK_OFFSET_Y + "px",
            backgroundColor: "#fff",
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-image": "none"
         }).insertAfter(div_main_widget);
      }

      // activate_tracker(div_ad_stack);
      activate_tracker(div_main_widget);


      //interval to maintain the size of the ad and widget divs
      var size_checker = setInterval(function() {
         if (PF_WIDGET_HEIGHT > 0 && div_main_widget.height() != PF_WIDGET_HEIGHT) {
            div_main_widget.height(PF_WIDGET_HEIGHT);
         }
         if (PF_WIDGET_WIDTH > 0 && div_main_widget.width() != PF_WIDGET_WIDTH) {
            div_main_widget.width(PF_WIDGET_WIDTH);
         }
         if (AD_STACK_HEIGHT > 0 && div_ad_stack.height() != AD_STACK_HEIGHT) {
            div_ad_stack.height(AD_STACK_HEIGHT);
         }
         if (AD_STACK_WIDTH > 0 && div_ad_stack.width() != AD_STACK_WIDTH) {
            div_ad_stack.width(AD_STACK_WIDTH);
         }
      }, 100);


      //adds the specified ad to the queue, and after the specified delay, at the specified z-index, simultaneously displays the new ad and removes the old ad (if any)
      cycleQueue = function(ad_network, zInd, delay) {
         if (prevOnDisplay == "none" || (adOnDisplay == "onHover" && prevOnDisplay != "onHover")) {
            delay = 0;
         } else {
            delay = delay || delay_paint;
         }

         switch (ad_network) {
            case "house":
               div_ad_queue.push(paint_house(zInd));
               break;
            case "realvu":
               _$("div[id*='realvu" + REALVU_CONFIG.p + "']").attr("id", "realvu" + guid());
               div_ad_queue.push(paint_realvu(zInd));
               break;
            case "openx":
               div_ad_queue.push(paint_openx(zInd));
               break;
            case "breal":
               div_ad_queue.push(paint_breal(zInd));
               break;
            case "conversant":
               div_ad_queue.push(paint_conversant(zInd));
               break;
            case "criteo":
               div_ad_queue.push(paint_criteo(zInd));
               break;
            case "rubicon":
               div_ad_queue.push(paint_rubicon(zInd));
               break;
            case "native":
               div_ad_queue.push(paint_native(zInd));
               break;
            case "sovrn":
               div_ad_queue.push(paint_sovrn(zInd));
               break;
            case "adblade":
               div_ad_queue.push(paint_adblade(zInd));
               break;               
            case "gamut":
               div_ad_queue.push(paint_gamut(zInd));
               break;               
            default:
               console.log("PF_ERROR: Unknown ad_network " + ad_network + ". No ad drawn.");
               break;
         };	//add to these as new ad networks are added to the ad-stack


         //keep these next two lines only until pre-loading is working
         div_ad_queue[0].css({"z-index" : zInd + 1});
         show_div(div_ad_queue[div_ad_queue.length - 1]);
         timer_queue_paint = setTimeout(function () {
            div_ad_queue[div_ad_queue.length - 1].appendTo(div_ad_stack);
            // if (div_ad_queue[1]) div_ad_queue[1].css({"z-index" : 51});

            // show_div(div_ad_queue[0]);
            if (div_ad_queue.length > 1) {
               div_ad_queue[0].slideUp(function () {
                  clearQueue(div_ad_queue.length - 1);
               });
            };
         }, delay); // end of timer_queue_paint
      }; // >> end of cycleQueue()


      //remove all ads waiting in the queue except the ad located at the given index
      clearQueue = function(ind) {
         if (div_ad_queue[ind]) {
            for (var i = div_ad_queue.length - 1; i >= 0; i--) {
               if (i != ind) {
                  div_ad_queue[i].remove();
                  div_ad_queue.splice(i, 1);
               }
            }
         }
      }; // >> end of clearQueue


      paint_house = function(zInd) {
         var rnd = guid();
         var div_house = _$("<div></div>", {
            id: "house ad" + rnd,
            "rand": rnd
         }).css({
            backgroundColor: "transparent",
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": zInd
         }).appendTo(div_ad_stack);

         var houseAdUrl;

/*          if (top.location.host.substr(top.location.host.indexOf("finance.") == 0)) {
            houseAdUrl = top.location.protocol + top.location.host + "/list-companies?id=236&type=location&price-low=1&market-cap-low=1&order=mk-desc";
         } else {
            houseAdUrl = top.location.protocol + "//finance." + top.location.host.substr(top.location.host.indexOf("www.") + 4) + "/list-companies?id=236&type=location&price-low=1&market-cap-low=1&order=mk-desc";
         }

         div_house.append(_$("<a></a>", {
            href: houseAdUrl,
            target: "_blank"
         }).append("<img src=protocolToUse + '://content.synapsys.us/l/i/joyfulhome_housead.png' alt='passfail' width=300 height=250 />")); */

         houseAdUrl = '//w1.synapsys.us/images/?w=' + AD_STACK_WIDTH + '&h=' + AD_STACK_HEIGHT;

         var ifr_house = _$("<iframe></iframe>", {
            id: rnd,
            src: houseAdUrl,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_house);

         return div_house;
      }


      paint_realvu = function(zInd) {
         var rnd = guid();
         var div_realvu = _$("<div></div>", {
            id: pattern_realvu_div + REALVU_CONFIG.p + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
            backgroundColor: "transparent",
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": zInd
         }).appendTo(div_ad_stack);

         // window.realvu_units = window.realvu_units || [];
         window.realvu_units = [];
         window.realvu_units.push(REALVU_CONFIG);

         _$("<div></div>", {
            id: "realvu" + REALVU_CONFIG.p
         })
         .appendTo(div_realvu);

         _$("<script></script>")
            .appendTo(div_realvu)
               .on("load",function() {
                  var currentObject = div_realvu.find('iframe[name="realvu_ad_unit"]');

                  _$(currentObject).on("load",function() {
                     _$(currentObject).off("load");
                     realvu_st = (new Date()).getTime();
                  });
               })
               .attr("src", protocolToUse + "://pr.realvu.net/realvu_pr2.js");

         return div_realvu;
      }; // >> end of paint_realvu()


      paint_openx = function(zInd) {
         var rnd = guid();
         var div_openx = _$("<div></div>", {
            id: pattern_openx_div + OPENX_AUID + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
            backgroundColor: "transparent",
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": zInd
         }).appendTo(div_ad_stack);

         var c = {};
         // c.content = "personal finance";
         OX_ads = [];
         OX_ads.push(
            {
               slot_id: OPENX_AUID,
               auid: OPENX_AUID
            },
            c
         );
         _$("<div id='" + OPENX_AUID + "' style='width:300px;height:250px;margin:0;padding:0'></div>").appendTo(div_openx)
         // _$("<script type='text/javascript' src='" + protocolToUse + "://us-ads.openx.net/w/1.0/jstag'></script>").appendTo(div_openx);
         postscribe(div_openx, "<script type='text/javascript' src='" + protocolToUse + "://us-ads.openx.net/w/1.0/jstag'></script>");

         return div_openx;
      } // >> end of paint_openx();


      paint_breal = function(zInd) {
         var rnd = guid();
         var div_breal = _$("<div></div>", {
            id: pattern_breal_div + BREAL_ID + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         var ifr_breal = _$("<iframe></iframe>", {
            id: pattern_breal_ifr + rnd,
            src: protocolToUse + "://content.synapsys.us/" + pathForSecure + "/ad-breal.php?id=" + BREAL_ID + "&size=" + AD_STACK_WIDTH + "x" + AD_STACK_HEIGHT,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_breal);

         return div_breal;
      }	// >> end of paint_breal()


      paint_conversant = function(zInd) {
         var rnd = guid();
         var div_conversant = _$("<div></div>", {
            id: pattern_conversant_div + CONVERSANT_SID + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         _$('<a href="' + protocolToUse + '://media.fastclick.net/w/click.here?sid=' + CONVERSANT_SID + '&m=' + CONVERSANT_MEDIA_ID + '&c=1" target="_blank"><img src="' + protocolToUse + '://media.fastclick.net/w/get.media?sid=' + CONVERSANT_SID + '&m=' + CONVERSANT_MEDIA_ID + '&tp=' + CONVERSANT_MEDIA_TYPE + '&d=s&c=1&vcm_acv=1.4" width="' + AD_STACK_WIDTH + '" height="' + AD_STACK_HEIGHT + '" border="1"></a>').appendTo(div_conversant);

         return div_conversant;
      }	// >> end of paint_conversant()


      paint_criteo = function(zInd) {
         var rnd = guid();
         var div_criteo = _$("<div></div>", {
            id: pattern_criteo_div + CRITEO_ZONEID + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         postscribe(div_criteo, "<script type=\'text\/javascript\'>document.MAX_ct0=\'\';var m3_u=(location.protocol==\'https:\'?\'https:\/\/cas.criteo.com\/delivery\/ajs.php?\':\'http:\/\/cas.criteo.com\/delivery\/ajs.php?\');var m3_r=Math.floor(Math.random()*99999999999);document.write(\"<scr\"+\"ipt type=\'text\/javascript\' src=\'\"+m3_u);document.write(\"zoneid=" + CRITEO_ZONEID + "\");document.write(\"&amp;nodis=1\");document.write(\'&amp;cb=\'+m3_r);if(document.MAX_used!=\',\')document.write(\"&amp;exclude=\"+document.MAX_used);document.write(document.charset?\'&amp;charset=\'+document.charset:(document.characterSet?\'&amp;charset=\'+document.characterSet:\'\'));document.write(\"&amp;loc=\"+escape(window.location).substring(0,1600));if(document.context)document.write(\"&context=\"+escape(document.context));if((typeof(document.MAX_ct0)!=\'undefined\')&&(document.MAX_ct0.substring(0,4)==\'http\')){document.write(\"&amp;ct0=\"+escape(document.MAX_ct0));}if(document.mmm_fo)document.write(\"&amp;mmm_fo=1\");document.write(\"\'><\/scr\"+\"ipt>\");<\/script>");

         return div_criteo;
      }	// >> end of paint_criteo()


      paint_rubicon = function(zInd) {
         var rnd = guid();
         var div_rubicon = _$("<div></div>", {
            id: pattern_rubicon_div + RUBICON_SITE + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         var ifr_rubicon = _$("<iframe></iframe>", {
            id: pattern_rubicon_ifr + rnd,
            src: protocolToUse + "://content.synapsys.us/" + pathForSecure + "/ad-rubicon.html?site=" + RUBICON_SITE + "&zone=" + RUBICON_ZONESIZE + "&kw=" + RUBICON_KW,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_rubicon);

         return div_rubicon;
      }	// >> end of paint_rubicon()


      paint_native = function(zInd) {
         var rnd = guid();
         var div_native = _$("<div></div>", {
            id: pattern_native_div + NATIVE_ZONE_ID + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         postscribe(div_native, "<script type=\"text\/javascript\"src=\"\/\/cpanel.nativeads.com\/js\/pixel\/pixel-106734-" + NATIVE_PIXEL_ID + ".js\"><\/script><script TYPE=\"text\/javascript\">document.write(\'<S\'+\'CRIPT TYPE=\"text\/javascript\" SRC=\"http:\/\/exchange.nativeads.com\/tag?zone_id=" + NATIVE_ZONE_ID + "&size=300x250&rnd=\'+new Number(Math.floor(99999999*Math.random())+1)+\'\"><\/S\'+\'CRIPT>\');<\/script>");

         return div_native;
		}	// >> end of paint_native()


      paint_sovrn = function(zInd) {
         var rnd = guid();
         var div_sovrn = _$("<div></div>", {
            id: pattern_sovrn_div + SOVRN_ZONE_ID + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         postscribe(div_sovrn, '<script type="text/javascript" src="http://ap.lijit.com/www/delivery/fp?z=' + SOVRN_ZONE_ID + '&u=sntmedia"></script>');

         return div_sovrn;
		}	// >> end of paint_sovrn()


      paint_adblade = function(zInd) {
         var rnd = guid();
         var div_adblade = _$("<div></div>", {
            id: pattern_adblade_div + AD_UNIT_NAME + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

          _$("<ins class=\"adbladeads\" data-cid=\"19071-1053306630\" data-host=\"web.adblade.com\" data-tag-type=\"1\" data-width=\"300\" data-height=\"250\" style=\"display:none\" data-subid=\"" + AD_UNIT_NAME + "\"><\/ins>").appendTo(div_adblade);
          _$.getScript("http://web.adblade.com/js/ads/async/show.js");

         return div_adblade;
      }  // >> end of paint_adblade()


      paint_gamut = function(zInd) {
         var rnd = guid();
         var div_gamut = _$("<div></div>", {
            id: pattern_gamut_div + GAMUT_SITE_ID + rnd,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": rnd
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         postscribe(div_gamut, "<!-- Begin Gamut Page Tag for [page name] on \"Nexstar_Heavy\" -->\r\n<scr" + "ipt type=\"text\/javascript\">\r\n\tcdsTag = {  };\r\n\tcdsTag.zones = {  };\r\n\tcdsTag.zones.as" + GAMUT_ZONE_ID + " = { \"size\" : \"300x250\", \"id\" : \"" + GAMUT_ZONE_ID + "\" };\r\n\tcdsTag.siteId = " + GAMUT_SITE_ID + ";\r\n\tcdsTag.keywords = null;\r\n\tcdsTag.user = null;\r\n\tcdsTag.onLoad = function() {cdsPlaceAd(\"as" + GAMUT_ZONE_ID + "\");};\r\n<\/scr" + "ipt>\r\n<scr" + "ipt type=\"text\/javascript\" src=\"http:\/\/ad.afy11.net\/cdsad.js\"><\/scr" + "ipt>\r\n<!-- End Gamut Page Tag for [page name] on \"Nexstar_Heavy\" -->");

         return div_gamut;
      }  // >> end of paint_gamut()




      show_div = function(divToShow) {
         divToShow.css({
            "opacity": 1,
            "pointer-events": "auto"
         });
      }	// >> end of show_div


      //recursively play through an entire ad cycle
      playAdCycle = function(adCycle, delay) {
         timer_adCycle = setTimeout(function () {
            cycleQueue(adCycle.order[adCycle.iter], 50);

            if (adCycle.iter + 1 < adCycle.order.length) {
               playAdCycle(adCycle, adCycle.timing[adCycle.iter]);
               adCycle.iter++;
            } else if (adCycle.replay == true) {
               playAdCycle(adCycle, adCycle.timing[adCycle.iter]);
               adCycle.iter = 0;
            }
         }, delay);
      };	// >> end of playAdCycle


      hoverTrigger = function() {
         if (adOnDisplay != "onHover") {
            clearTimeout(timer_queue_paint);
            timer_queue_paint = null;
            clearTimeout(timer_visibility);
            timer_visibility = null;
            clearTimeout(timer_adCycle);
            timer_adCycle = null;
            clearTimeout(timer_onLoad);
            timer_onLoad = null;
/* 				if (div_ad_queue.length > 1) {
               dequeue_ad(0);
            }; */
            prevOnDisplay = adOnDisplay;
            adOnDisplay = "onHover";
            playAdCycle(onHover, 0);
         };
      };


      //Check condition element is at all visible
      //	-el is the element to be checked
      isElementVisible = function(el) {
         var isVisible = false;

         if (el) {
            el = el.getBoundingClientRect();

            var topIframe = getTopIframe();
            var tempRect = {};
            if (typeof topIframe.getBoundingClientRect === 'function') {
               tempRect = topIframe.getBoundingClientRect();
            } else {
               tempRect.top = 0;
               tempRect.left = 0;
            }

            var rect = {};
            rect.top = tempRect.top + el.top;
            rect.left = tempRect.left + el.left;
            rect.bottom = rect.top + el.height;
            rect.right = rect.left + el.width;

            //Destroyed persistent frame. Don't trigger any events here.
            if (rect.height < 1 || rect.width < 1) {
               isVisible = false;
            } else {
               var window_bottom = top.innerHeight,
                  window_top = 0,
                  window_right = top.innerWidth,
                  window_left = 0;

               isVisible = (((   window_top < rect.top      &&    rect.top < window_bottom)  || //if the top is on-screen
                              (  window_top < rect.bottom   && rect.bottom < window_bottom)) && //if the bottom is on-screen
                              ((window_left < rect.left     &&   rect.left < window_right)   || //if the left is on-screen
                              ( window_left < rect.right    &&  rect.right < window_right)));   //if the right is on-screen
               // return isVisible;
            };
         }
         return isVisible;
      }; //isElementVisible


      getTopIframe = function() {
         var currentWindow = self,
            parentIframe = self;

         //if the current window is already the top window, then frameElement will be null
         for (var i = 0; i < 10 && currentWindow.frameElement !== null; i++) {
            if ((currentWindow.parent === top)) {
               parentIframe = currentWindow.frameElement;
               break;
            }
            currentWindow = currentWindow.parent;
         }
         return parentIframe;
      }


      checkVisibility = function() {
         // if (timer_onLoad == null && (isElementVisible(div_ad_stack[0]) == true || isElementVisible(div_main_widget[0]) == true)) {
// console.log(isElementVisible(div_ad_stack[0]),timer_onLoad,timer_visibility,prevOnDisplay,adOnDisplay);
         if (timer_onLoad == null && isElementVisible(div_ad_stack[0]) == true) {
            if (adOnDisplay != "onHover" && adOnDisplay != "onVisible" && timer_visibility == null) {
               timer_visibility = setTimeout(function() {
                  timer_visibility = null;
                  if (isElementVisible(div_ad_stack[0]) == true) {
                     prevOnDisplay = adOnDisplay;
                     adOnDisplay = "onVisible";
                     playAdCycle(onVisible, 0);
                  }
               }, delay_visibility);
            }
         } else if (adOnDisplay == "none") {
         } else if (adOnDisplay != "onLoad" && adOnDisplay != "onLowVis") {
            clearTimeout(timer_queue_paint);
            timer_queue_paint = null;
            clearTimeout(timer_visibility);
            timer_visibility = null;
            clearTimeout(timer_adCycle);
            timer_adCycle = null;
            prevOnDisplay = adOnDisplay;
            adOnDisplay = "onLowVis";
         };
      };	//checkVisibility



      // setupPassbackCatcher();

      //no ad-stack means no ads
      if (AD_STACK_HEIGHT > 0) {
         prevOnDisplay = adOnDisplay;
         adOnDisplay = "onLoad";
         playAdCycle(onLoad, 0);
         timer_onLoad = setTimeout (function () {
            timer_onLoad = null;
            checkVisibility();
         }, delay_onLoad);

         //let's wait for the widget to settle into place on the page before allowing the bindings to fire
         div_main_widget.ready(function() {
            checkVisibility();
            _$(top).on("resize scroll", checkVisibility);

            // div_main_widget.on("mouseenter", hoverTrigger);
         }, true);
      }


      //visibility api code as seen on http://stackoverflow.com/a/21935031
      _$(document).ready(function() {
         var hidden, visibilityState, visibilityChange;

         if (typeof top.document.hidden !== "undefined") {
            hidden = "hidden", visibilityChange = "visibilitychange", visibilityState = "visibilityState";
         } else
         //for IE compatibility
         if (typeof top.document.msHidden !== "undefined") {
            hidden = "msHidden", visibilityChange = "msvisibilitychange", visibilityState = "msVisibilityState";
         }

         var document_hidden = top.document[hidden];

         top.document.addEventListener(visibilityChange, function() {
            if(document_hidden != top.document[hidden]) {
               if(top.document[hidden]) {
                  // Document hidden
                  browserVisible = false;
               } else {
                  // Document shown
                  browserVisible = true;
               }

               document_hidden = top.document[hidden];
            }
         });
      });
   }; // >> end of main()
})();
