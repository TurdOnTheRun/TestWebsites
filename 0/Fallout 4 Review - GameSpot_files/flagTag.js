/*
 MIT License (c) copyright 2011-2013 original author or authors */
var BSM;
(function(){if(!BSM||!BSM.requirejs){BSM?c=BSM:BSM={};var d,c,k;(function(g){function m(a,e){var b,h,f,l,c,k,d,g,q,p=e&&e.split("/"),m=n.map,z=m&&m["*"]||{};if(a&&"."===a.charAt(0))if(e){p=p.slice(0,p.length-1);a=p.concat(a.split("/"));for(g=0;g<a.length;g+=1)if(b=a[g],"."===b)a.splice(g,1),--g;else if(".."===b)if(1!==g||".."!==a[2]&&".."!==a[0])0<g&&(a.splice(g-1,2),g-=2);else break;a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((p||z)&&m){b=a.split("/");for(g=b.length;0<g;--g){h=b.slice(0,
g).join("/");if(p)for(q=p.length;0<q;--q)if(f=m[p.slice(0,q).join("/")])if(f=f[h]){l=f;c=g;break}if(l)break;!k&&z&&z[h]&&(k=z[h],d=g)}!l&&k&&(l=k,c=d);l&&(b.splice(0,c,l),a=b.join("/"))}return a}function f(a,e){return function(){return l.apply(g,G.call(arguments,0).concat([a,e]))}}function a(a){return function(e){return m(e,a)}}function b(a){return function(e){u[a]=e}}function q(a){if(x.call(r,a)){var e=r[a];delete r[a];A[a]=!0;h.apply(g,e)}if(!x.call(u,a)&&!x.call(A,a))throw Error("No "+a);return u[a]}
function p(a){var e,b=a?a.indexOf("!"):-1;-1<b&&(e=a.substring(0,b),a=a.substring(b+1,a.length));return[e,a]}function e(a){return function(){return n&&n.config&&n.config[a]||{}}}var h,l,t,v,u={},r={},n={},A={},x=Object.prototype.hasOwnProperty,G=[].slice;t=function(e,b){var h,f=p(e),l=f[0];e=f[1];l&&(l=m(l,b),h=q(l));l?e=h&&h.normalize?h.normalize(e,a(b)):m(e,b):(e=m(e,b),f=p(e),l=f[0],e=f[1],l&&(h=q(l)));return{f:l?l+"!"+e:e,n:e,pr:l,p:h}};v={require:function(a){return f(a)},exports:function(a){var e=
u[a];return"undefined"!==typeof e?e:u[a]={}},module:function(a){return{id:a,uri:"",exports:u[a],config:e(a)}}};h=function(a,e,h,l){var n,c,k,d,p=[],m;l=l||a;if("function"===typeof h){e=!e.length&&h.length?["require","exports","module"]:e;for(d=0;d<e.length;d+=1)if(k=t(e[d],l),c=k.f,"require"===c)p[d]=v.require(a);else if("exports"===c)p[d]=v.exports(a),m=!0;else if("module"===c)n=p[d]=v.module(a);else if(x.call(u,c)||x.call(r,c)||x.call(A,c))p[d]=q(c);else if(k.p)k.p.load(k.n,f(l,!0),b(c),{}),p[d]=
u[c];else throw Error(a+" missing "+c);e=h.apply(u[a],p);a&&(n&&n.exports!==g&&n.exports!==u[a]?u[a]=n.exports:e===g&&m||(u[a]=e))}else a&&(u[a]=h)};d=c=l=function(a,e,b,f,c){if("string"===typeof a)return v[a]?v[a](e):q(t(a,e).f);a.splice||(n=a,e.splice?(a=e,e=b,b=null):a=g);"function"===typeof b&&(b=f,f=c);h(g,a,e||function(){},b);return l};l.config=function(a){n=a;n.deps&&l(n.deps,n.callback);return l};d._defined=u;k=function(a,e,b){e.splice||(b=e,e=[]);x.call(u,a)||x.call(r,a)||(r[a]=[a,e,b])};
k.amd={jQuery:!0}})();BSM.requirejs=d;BSM.require=c;BSM.define=k}})();BSM.define("utils/objects",[],function(){return{$isArray:function(d){return"[object Array]"===Object.prototype.toString.call(d)},$isObject:function(d){return null!=d&&"object"===typeof d}}});
BSM.define("settings/config",["utils/objects"],function(d){function c(f,a){this._masterConfig=f;this._base=a||""}function k(f,a,b){var c;0>f.indexOf("/")?(c=b[f])&&"object"===typeof c&&!d.$isArray(c)?b[f]=g(a,c):b[f]=a:(f=f.split("/"),c=f.shift(),b[c]=b[c]||{},k(f.join("/"),a,b[c]));return b}function g(f,a){f=f||{};a=a||{};var b={},c,k,e,h,l;for(l in f)d.$isArray(f[l])?a[l]=f[l].slice():("object"===typeof f[l]&&f[l]&&null==a[l]&&(a[l]={}),b[l]="object"===typeof f[l]&&f[l]?g(f[l],a[l]):l in a?a[l]:
f[l]);for(l in a){c=b;k=l.split("/");for(h=k.pop();e=k.shift();)c=c[e]=c[e]||{};d.$isArray(a[l])||"object"!==typeof a[l]?c[h]=a[l]:"object"===typeof a[l]&&(c[h]=g(a[l],c[h]))}return b}function m(f){return"string"===typeof f?f:f?d.$isArray(f)?f.join("/"):"":""}c.DELIMITER="/";c.createRoot=function(f,a){var b=g(f,a);return new c(b)};c.explode=function(f,a){var b=a||{},c;for(c in f)k(c,f[c],b);return g(b,a)};c.prototype={_base:"",_masterConfig:null,get:function(f){var a=this._base,b=this._masterConfig;
f=m(f);for(a=(a+"/"+f).split("/");b&&a.length;)if(a[0]||a.shift())b="object"===typeof b&&a[0]in b?b[a.shift()]:null;a=a.length?null:b;return a&&"object"===typeof a?a.slice?a.slice(0):g(a):a},namespace:function(f){f=m(f);f=0===f.indexOf("/")?f:this._base+"/"+f;return new c(this._masterConfig,f)},set:function(f,a){for(var b=this._base,c=this._masterConfig,g=m(f),b=(b+"/"+g).split("/"),g=b.pop(),e;b.length;)if(e=b.shift())c[e]||(c[e]={}),c=c[e];c[g]=a;return this},defined:function(c){return null!==this.get(c)},
fork:function(f){return c.createRoot(this._masterConfig,f)},explode:c.explode};return c});
BSM.define("settings/default",[],function(){return{debug:!1,cdn:"//cdn.beanstock.com/pub",version:"v3.0.2-0-07f064e",ghostwriter:{url:"//cdn.beanstock.com/pub/gw.min.js"},auction:{update_manifest:{cache_key_prefix:"cx/slot/manifest"},default_bidder:"apn",strategy:{phase:{strategy:{one:"parallel",two:"parallel",three:"dutch"}}}},aq:{loader:{expireTime:2592E6,staleTime:31536E6}},bid:{pricer:{gsp:{max_reduction_rate:1,soft_floor:100,sp_increment:10}},loaddfp:{gpt_url:"//www.googletagservices.com/tag/js/gpt.js",
gpt_ns:"googletag"},fetcher:{dfp:{ceiling:3E3,increments:500,postreadywait:0,pixel_key:"match|adx",context_key:"dfp"},ortb:{price_multiplier:1E3,xd_url:"about:blank",bidder_url:"about:blank",is_cors:!1},tag:{},json:{},criteo:{urlmaker:"urlmaker/criteo",cache_key_loading:"cx/criteo/load",cache_slot_prefix:"cx/criteo/slot",cache_key_loading_expire:36E5},yieldbot:{cache_key_loading:"cx/yieldbot/load",cache_key_loading_expire:36E5,cache_slot_prefix:"cx/yieldbot/slot"},mpm:{notify_url:"http://tags.mathtag.com/notify/js?exch=prm&type=won&",
urlmaker:"urlmaker/mpm"},xaxis:{postreadywait:200},oxm:{urlmaker:"urlmaker/oxm"},apn:{urlmaker:"urlmaker/apn"},pbm:{urlmaker:"urlmaker/pbm"},decorators:{cache:{expiration:6E4}}},invalid_expiration:0,expiration:3E4},controller:{nucleus:{gpt_restore:{timeout:1E3}},data_bus:{nucleus_notifier:{gpt_timeout:5E3}},tracker:{revoke:{event_name:"offer.revoked",prefix:"cx/pbcap",event_key:"placement_id"},delivery:{event_name:"offer.displayed",prefix:"cx/dlcap",event_key:"placement_id"}}},bidder:{max_duration:2E3,
partners:"aol apn apnh casale criteo dfp ixp ixp2 managed mpm omk oxm passback pbm pbm2 ppt ttd xaxis yax yieldbot".split(" "),bias:1,fetcher:"bid/fetcher/null",flag:!0,flag_must_bid:!1,flag_page_only:!1,priority:500,cacheable:!1,prefetch_only:!1,expiration:0,floor:0,phase:"two",secure:!1,invalid_limit:3,invalid_penalty_duration:3E5,invalid_penalty_skips:3,delivery_limit:Infinity,delivery_period:0,passback_limit:1,passback_period:1},eventlogger:{base_url:"//helix.beanstock.co",delay:500},impression:{context:{strategy:"phase",
biases:{},floor:0,maxduration:5E3,soft_floor:100,use_cache:!1,increment:1.1,jsonprops:{sizes:1,pub:1,cost:1,pageurl:1,slot:1,strategy:1,placement:1,shadow:1,synthetic:1,maxduration:1,hidden:1,id:1,sync:1}},passbacklistener:{msg_prefix:"bsm.pixelEvent"},adjuster:{enable:!1,cost:1E3,rate:10,interval:30},displayer:{criteo:{baseUrl:"//cas.criteo.com/delivery/ajs.php"},yieldbot:{lib_url:"//cdn.yldbt.com/js/yieldbot.intent.js"},xaxis:{slot_ids:{"728x90":"Top1","300x250":"x15","160x600":"x10","300x600":"x16"}}}},
offer:{share:0,pricer:"first"},user:{session_key:"cx/session",session_exp_sec:18E5,uid_cache_key:"cx/user/id",idmapper:{cache_key:"cx/user/map",partners:"casale criteo pubmatic pulsepoint the-trade-desk yahoo".split(" "),type:"user/sync/image",enabled:!1,expiration:864E5,url:"about:blank",encode_redirect:!0,uid:"",macro:"",validator:null,cleanup:null,secure:!0},iplookup:{enabled:!0,cache_key:"cx/ip_info",expireTime:7776E6,staleTime:2592E6,endpoint:"//geoh.beanstock.com/key=SAKD59X4RU899BSMBSMZ/ip=local?callback="},
sync:{iframe:{endpoint:"http://cdn.beanstock.com/pub/px/pixel.html",prefix:"cx.uid.sync"}},cache:{urlEntry:{default_expire:36E5,default_stale:3E5}}},utils:{mercury:{msg_data_regex:"bsm.pixelEvent:",data_attribute_keys:["impression-id","platform-name","placement_id","price"],id_attribute_name:"data-impression-id",cx_id_prefix:"cx/"}},zonemap:{enableCache:!1,expireTime:864E5,staleTime:36E5,cacheKey:"cx-zonemap"},flag:{prefix:"cx",cache_prefix:"cx/bids",price_cache_prefix:"cx/nucleus/prices",bid_cache_prefix:"cx/nucleus/bids",
enabled:!0,ceiling:5E3,increments:250,prices_expiration:6048E5,ready_event_name:"onNucleusReady",gpt_namespace:"googletag",bsm_namespace:"BSM",bsm_tag_namespace:"bsm_tag",bootstrap_script_name:"flagTag.js",loader:{tag_attributes:"pub pub-zone event-host zone-map-url soft-floor flag".split(" "),refresh_rate:6E4}},manifest:{slot:{expiry:864E5,cache_key:"cx/slot/manifest"},bidder:{expiry:864E5,cache_key:"cx/bidder/manifest"}},urlmaker:{type:null,apn:{member_id:1184,request_type:"fpt",secure_url:"https://secure.adnxs.com",
url:"http://ib.adnxs.com"},apnh:{request_type:"jpt",secure_url:"https://secure.adnxs.com",url:"http://ib.adnxs.com"},criteo:{baseurl:"//cas.criteo.com/delivery/ajs.php",cookie_name:"crtg_rta"},oxm:{url:"//ox-d.cbs.servedbyopenx.com/w/1.0",request_type:"jstag",jstag_key:"oxm_pubId"},pbm:{cookie_name:"crtg_rta",url:"http://bid.pubmatic.com/AdServer",request_type:"AdServerServlet",pub_key:"pbm_pubId",site_key:"pbm_siteId",context_key:"pbm"},mpm:{uripath:"bid/prm/js",hostname:"tags.mathtag.com",prm:0}}}});
BSM.define("config",["settings/config","settings/default"],function(d,c){var k=d.createRoot(c,window.bsm_tag&&window.bsm_tag.config||{});return window.BSM.config=k});BSM.define("window",[],function(){return window});BSM.define("utils/localstorage",["window"],function(d){var c;try{var k="localStorage"in d&&null!==d.localStorage&&d.localStorage,g;k.setItem("cx-lscheck","test");g=k.getItem("cx-lscheck");k.removeItem("cx-lscheck");c="test"===g?k:!1}catch(m){c=!1}return c});
(function(d){BSM.define("when/when",["require"],function(c){function k(a,e,b,h){return(a instanceof d?a:f(a)).then(e,b,h)}function g(a){return new d(a,C.PromiseStatus&&C.PromiseStatus())}function d(c,f){function n(e){if(t){var h=t;t=y;m=b(p,e);x(function(){f&&l(m,f);a(h,m)})}}function g(a){n(new e(a))}function k(e){if(t){var b=t;x(function(){a(b,new h(e))})}}var p,m,t=[];p=this;this._status=f;this.inspect=function(){return m?m.inspect():{state:"pending"}};this._when=function(a,e,b,h,c){function f(l){l._when(a,
e,b,h,c)}t?t.push(f):x(function(){f(m)})};try{c(n,g,k)}catch(q){g(q)}}function f(a){return g(function(e){e(a)})}function a(a,e){for(var b=0;b<a.length;b++)a[b](e)}function b(a,b){if(b===a)return new e(new TypeError);if(b instanceof d)return b;try{var h=b===Object(b)&&b.then;return"function"===typeof h?q(h,b):new p(b)}catch(c){return new e(c)}}function q(a,e){return g(function(b,h){x(function(){try{I(a,e,b,h)}catch(c){h(c)}})})}function p(a){this.value=a}function e(a){this.value=a}function h(a){this.value=
a}function l(a,e){a.then(function(){e.fulfilled()},function(a){e.rejected(a)})}function t(a){return a&&"function"===typeof a.then}function v(a,e,b,h,c){return k(a,function(a){return g(function(b,h,c){function f(a){m(a)}function l(a){z(a)}var n,g,d,p,z,m,t,q;t=a.length>>>0;n=Math.max(0,Math.min(e,t));d=[];g=t-n+1;p=[];if(n)for(m=function(a){p.push(a);--g||(z=m=D,h(p))},z=function(a){d.push(a);--n||(z=m=D,b(d))},q=0;q<t;++q)q in a&&k(a[q],l,f,c);else b(d)}).then(b,h,c)})}function u(a,e,b,h){return r(a,
D).then(e,b,h)}function r(a,e,b){return k(a,function(a){return new d(function(h,c,f){function l(a,g){k(a,e,b).then(function(a){n[g]=a;--d||h(n)},c,f)}var n,g,d,p;d=g=a.length>>>0;n=[];if(d)for(p=0;p<g;p++)p in a?l(a[p],p):--d;else h(n)})})}function n(a){return{state:"fulfilled",value:a}}function A(a){return{state:"rejected",reason:a}}function x(a){1===F.push(a)&&B(G)}function G(){a(F);F=[]}function D(a){return a}function L(a){"function"===typeof C.reportUnhandled?C.reportUnhandled():x(function(){throw a;
});throw a;}k.promise=g;k.resolve=f;k.reject=function(a){return k(a,function(a){return new e(a)})};k.defer=function(){var a,b,h;a={promise:y,resolve:y,reject:y,notify:y,resolver:{resolve:y,reject:y,notify:y}};a.promise=b=g(function(c,l,n){a.resolve=a.resolver.resolve=function(a){if(h)return f(a);h=!0;c(a);return b};a.reject=a.resolver.reject=function(a){if(h)return f(new e(a));h=!0;l(a);return b};a.notify=a.resolver.notify=function(a){n(a);return a}});return a};k.join=function(){return r(arguments,
D)};k.all=u;k.map=function(a,e){return r(a,e)};k.reduce=function(a,e){var b=I(H,arguments,1);return k(a,function(a){var h;h=a.length;b[0]=function(a,b,c){return k(a,function(a){return k(b,function(b){return e(a,b,c,h)})})};return J.apply(a,b)})};k.settle=function(a){return r(a,n,A)};k.any=function(a,e,b,h){return v(a,1,function(a){return e?e(a[0]):a[0]},b,h)};k.some=v;k.isPromise=t;k.isPromiseLike=t;w=d.prototype;w.then=function(a,e,b){var h=this;return new d(function(c,l,f){h._when(c,f,a,e,b)},this._status&&
this._status.observed())};w["catch"]=w.otherwise=function(a){return this.then(y,a)};w["finally"]=w.ensure=function(a){function e(){return f(a())}return"function"===typeof a?this.then(e,e).yield(this):this};w.done=function(a,e){this.then(a,e)["catch"](L)};w.yield=function(a){return this.then(function(){return a})};w.tap=function(a){return this.then(a).yield(this)};w.spread=function(a){return this.then(function(e){return u(e,function(e){return a.apply(y,e)})})};w.always=function(a,e){return this.then(a,
a,e)};E=Object.create||function(a){function e(){}e.prototype=a;return new e};p.prototype=E(w);p.prototype.inspect=function(){return n(this.value)};p.prototype._when=function(a,b,h){try{a("function"===typeof h?h(this.value):this.value)}catch(c){a(new e(c))}};e.prototype=E(w);e.prototype.inspect=function(){return A(this.value)};e.prototype._when=function(a,b,h,c){try{a("function"===typeof c?c(this.value):this)}catch(f){a(new e(f))}};h.prototype=E(w);h.prototype._when=function(a,e,b,h,c){try{e("function"===
typeof c?c(this.value):this.value)}catch(f){e(f)}};var w,E,J,H,I,B,F,C,K,y;F=[];C="undefined"!==typeof console?console:k;if("object"===typeof process&&process.nextTick)B=process.nextTick;else if(w="function"===typeof MutationObserver&&MutationObserver||"function"===typeof WebKitMutationObserver&&WebKitMutationObserver)B=function(a,e,b){var h=a.createElement("div");(new e(b)).observe(h,{attributes:!0});return function(){h.setAttribute("x","x")}}(document,w,G);else try{B=c("vertx").runOnLoop||c("vertx").runOnContext}catch(M){K=
setTimeout,B=function(a){K(a,0)}}c=Function.prototype;w=c.call;I=c.bind?w.bind(w):function(a,e){return a.apply(e,H.call(arguments,2))};c=[];H=c.slice;J=c.reduce||function(a){var e,b,h,c;c=0;e=Object(this);h=e.length>>>0;b=arguments;if(1>=b.length)for(;;){if(c in e){b=e[c++];break}if(++c>=h)throw new TypeError;}else b=b[1];for(;c<h;++c)c in e&&(b=a(b,e[c],c,e));return b};return k})})("function"===typeof BSM.define&&BSM.define.amd?BSM.define:function(d){module.exports=d(require)});
BSM.define("when",["when/when"],function(d){return d});BSM.define("document",[],function(){return window.document});
BSM.define("utils/script",["when","document"],function(d,c){function k(g,d,f){var a=c.getElementsByTagName("script")[0],b=c.createElement("script");b.onload=b.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(this.onload=this.onreadystatechange=this.onerror=null,d.call(this))};b.onerror=function(a){this.onload=this.onreadystatechange=this.onerror=null;f("Network error")};b.src=g;a.parentNode.insertBefore(b,a)}return function(c){var m=d.defer();
k(c,function(){m.resolve(this)},function(c){m.reject(c)});return m.promise}});
BSM.define("user/cache/urlEntry",["require","utils/script","when","config","module"],function(d){function c(a){function d(){var c;if("string"===typeof e)c=window[e];else if("function"===typeof e)try{c=e()}catch(g){return f.reject(g)}if(!c)return f.reject("Not found");h.value(c);h.expire(l||a.get("default_expire"));h.stale(t||a.get("default_stale"));h.release();return c}var g=a.uri,e=a.provider,h=a.entry,l=a.expire,t=a.stale;return a.jsonp?k(a):h.expire()&&h.lock()||h.stale()&&h.lock()?m(g).then(d):
h.valueAnd().then(function(e){return h.stale()?c(a):e})}function k(b){var c=f.defer(),d=b.uri,e=b.provider,h=b.entry,l=b.expire,k=b.stale,v=b.jsonp;(b=b.jsonpCallback)||(b="bsm_jsonp_"+Math.floor(1E6*Math.random()));d="string"===typeof v?g(d,v,b):d+b;window[b]=function(b){if("function"===typeof e)try{b=e(b)}catch(f){c.reject(f)}b||c.reject("Not found");h.value(b);h.expire(l||a.get("default_expire"));h.stale(k||a.get("default_stale"));h.release();c.resolve(b)};return h.expire()&&h.lock()||h.stale()&&
h.lockPartial()?(m(d).otherwise(function(a){c.reject(a)}),c.promise):h.valueAnd().then(function(a){return h.expire()||!a?f.reject("Not found"):a})}function g(a,c,f){-1===a.indexOf("?")&&(a+="?");a.charAt(a.length-1);return c+"="+f}var m=d("utils/script"),f=d("when"),a=d("config").namespace(d("module").id);return c});
BSM.define("user/cache/entry",["require","when","user/cache/urlEntry"],function(d){function c(a,b,c,f){this.key=a;this.lockOwner=!1;this.reader=function(){var e=b(a);e&&e.cacheEntry||(e={cacheEntry:!0,value:null!=e?e:null});e.expire=(new Date(e.expire||Number(new Date)-864E5)).getTime();e.stale=(new Date(e.stale||Number(new Date)-864E5)).getTime();e.lock&&(e.lock.expire=new Date(e.lock.expire||0));return e};this.writer=function(e){c(a,e)};this.remover=function(){f(a)};this.raw=this.reader()}function k(a){return!(a&&
"DANGERZONE"===a.state&&a.expire>Number(new Date))}function g(a){return a&&a.expire>Number(new Date)&&("DANGERZONE"===a.state||"DUMPTRUCK"===a.state)}var m=d("when"),f=d("user/cache/urlEntry");c.prototype.value=function(a){var b=this.reader();if("undefined"===typeof a){if(!k(b.lock)&&!this.lockOwner)throw Error("Entry is locked");this.raw=b;return this.checkExpiration()}if(g(b.lock)&&!this.lockOwner)throw Error("Entry is locked");this.raw.value=a;return this};c.prototype.valueAnd=function(a){var b=
m.defer(),c=this,f=c.reader(),e;"undefined"!==typeof a?g(f.lock)?b.reject("Entry is locked"):(c.raw.value=a,b.resolve(a)):k(f.lock)?(c.raw=f,b.resolve(c.checkExpiration())):e=setInterval(function(){f=c.reader();if(k(f.lock)){c.raw=f;var a=c.checkExpiration();b.resolve(a);clearInterval(e)}},50);return b.promise};c.prototype.expire=function(a){a=Number(a);return isNaN(a)?!(this.raw.expire>Number(new Date)):(this.raw.expire=(new Date((new Date).getTime()+a)).getTime(),this)};c.prototype.stale=function(a){a=
Number(a);if(isNaN(a))return!(this.raw.stale>Number(new Date));this.raw.stale=(new Date((new Date).getTime()+a)).getTime();return this};c.prototype.lock=function(){return this.setLockTo("DANGERZONE")};c.prototype.lockPartial=function(){return this.setLockTo("DUMPTRUCK")};c.prototype.setLockTo=function(a){function b(){var a=f.reader();delete a.lock;f.writer(a)}var c=this.reader(),f=this;if(g(c.lock))return!1;this.raw.lock=c.lock={state:a,expire:new Date(Number(new Date)+5E3)};window.addEventListener?
window.addEventListener("unload",b):window.attachEvent?window.attachEvent("onbeforeunload",b):window.onbeforeunload=b;this.lockOwner=!0;this.writer(c);return!0};c.prototype.lockAnd=function(){var a=this.reader();if(g(a.lock))return m.reject(this.value());this.raw=a;this.lock();return m.resolve(a.value)};c.prototype.save=function(){this.writer(this.raw);return this};c.prototype.release=function(){delete this.raw.lock;this.lockOwner=!1;return this.save()};c.prototype.fetch=function(a){a.entry=this;
a.uri||(a.uri=this.key);return f(a)};c.prototype.remove=function(){this.remover();return null};c.prototype.checkExpiration=function(){return this.expire()?(this.raw={},this.remove()):this.raw.value};return c});
BSM.define("user/cache",["require","utils/localstorage","./cache/entry"],function(d){function c(a){a=m?m[a]:null;try{a=JSON.parse(a)}catch(b){a=null}return a}function k(a,b){var c;try{c=JSON.stringify(b)}catch(f){return}m&&(m[a]=c)}function g(a){m&&m.removeItem(a)}var m=d("utils/localstorage"),f=d("./cache/entry");return function(a){return new f(a||"",c,k,g)}});
BSM.define("model/nucleus/nucleus_element",["document"],function(d){a:{d=d.querySelectorAll("img,script");for(var c=d.length,k;c--;)if(k=d[c],k.getAttribute("data-bsm-flag")){d=k;break a}d=void 0}return d});
BSM.define("logger",["config"],function(d){function c(a){var b=window.console||{},c=b[a]||b.log;return c?Function.prototype.bind?Function.prototype.bind.call(c,b):function(){Function.prototype.apply.call(c,b,arguments)}:new Function}function k(a,b){this.logs=[];this.warns=[];this.errors=[];this.traces=[];this.prefix=a||"(unprefixed)";this.$output(b)}var g=["log","warn","trace","error"],m=(new Date).getTime(),f=function(){for(var a={},b=0;b<g.length;++b)a[g[b]]=c(g[b]);return a}();k.prototype={logs:null,
warns:null,errors:null,traces:null,prefix:"",$debug:!1,$output:function(a){null!=a&&(this.$debug=a);return this.$debug||d.get("debug")},track:function(a,b){if("log"===a)this.logs.push(b);else if("warn"===a)this.warns.push(b);else if("error"===a)this.errors.push(b);else if("trace"===a)this.traces.push(b);else throw"Unknown log action";},getPrefix:function(){var a=new Date-m,a=Math.floor(a/100)/10;return"+"+("+"+a+"s")+" "+this.prefix+": "},log:function(a){var b=Array.prototype.slice.call(arguments,
0);b[0]=[this.getPrefix(),b[0]].join("");this.track("log",b);this.$output()&&f.log.apply(null,b)},warn:function(a){var b=Array.prototype.slice.call(arguments,0);b[0]=[this.getPrefix(),b[0]].join("");this.track("warn",b);this.$output()&&f.warn.apply(null,arguments)},error:function(a){var b=Array.prototype.slice.call(arguments,0);b[0]=[this.getPrefix(),b[0]].join("");this.track("error",b);this.$output()&&f.error.apply(null,b)},trace:function(){var a=Array.prototype.slice.call(arguments,0);this.track("trace",
[Error().stack]);this.$output()&&f.trace.apply(null,a)}};return k});
BSM.define("lib/json2",[],function(){function d(a){return 10>a?"0"+a:a}function c(a){m.lastIndex=0;return m.test(a)?'"'+a.replace(m,function(a){var c=b[a];return"string"===typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function k(b,e){var h,l,d,g,m=f,r,n=e[b];n&&"object"===typeof n&&"function"===typeof n.toJSON&&(n=n.toJSON(b));"function"===typeof q&&(n=q.call(e,b,n));switch(typeof n){case "string":return c(n);case "number":return isFinite(n)?String(n):"null";case "boolean":case "null":return String(n);
case "object":if(!n)return"null";f+=a;r=[];if("[object Array]"===Object.prototype.toString.apply(n)){g=n.length;for(h=0;h<g;h+=1)r[h]=k(h,n)||"null";d=0===r.length?"[]":f?"[\n"+f+r.join(",\n"+f)+"\n"+m+"]":"["+r.join(",")+"]";f=m;return d}if(q&&"object"===typeof q)for(g=q.length,h=0;h<g;h+=1)"string"===typeof q[h]&&(l=q[h],(d=k(l,n))&&r.push(c(l)+(f?": ":":")+d));else for(l in n)Object.prototype.hasOwnProperty.call(n,l)&&(d=k(l,n))&&r.push(c(l)+(f?": ":":")+d);d=0===r.length?"{}":f?"{\n"+f+r.join(",\n"+
f)+"\n"+m+"}":"{"+r.join(",")+"}";f=m;return d}}"object"!==typeof JSON&&(JSON={});"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+d(this.getUTCMonth()+1)+"-"+d(this.getUTCDate())+"T"+d(this.getUTCHours())+":"+d(this.getUTCMinutes())+":"+d(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var g=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
m=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,f,a,b={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},q;"function"!==typeof JSON.stringify&&(JSON.stringify=function(b,e,c){var l;a=f="";if("number"===typeof c)for(l=0;l<c;l+=1)a+=" ";else"string"===typeof c&&(a=c);if((q=e)&&"function"!==typeof e&&("object"!==typeof e||"number"!==typeof e.length))throw Error("JSON.stringify");return k("",{"":b})});
"function"!==typeof JSON.parse&&(JSON.parse=function(a,e){function c(a,b){var f,l,d=a[b];if(d&&"object"===typeof d)for(f in d)Object.prototype.hasOwnProperty.call(d,f)&&(l=c(d,f),void 0!==l?d[f]=l:delete d[f]);return e.call(a,b,d)}var b;a=String(a);g.lastIndex=0;g.test(a)&&(a=a.replace(g,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return b=eval("("+a+")"),"function"===typeof e?c({"":b},""):b;throw new SyntaxError("JSON.parse");});return window.JSON});
BSM.define("utils/polyfill",[],function(){Array.prototype.indexOf=function(){function d(c,d){var g,m=Object(this),f=m.length>>>0;g=+d||0;if(null==this)throw new TypeError('"this" is null or not defined');if(0===f)return-1;Infinity===Math.abs(g)&&(g=0);if(g>=f)return-1;for(g=Math.max(0<=g?g:f-Math.abs(g),0);g<f;){if(g in m&&m[g]===c)return g;g++}return-1}return"function"==typeof Array.prototype.indexOf?Array.prototype.indexOf:d}();Array.prototype.forEach=function(){function d(c,d){if(null==this)throw new TypeError(" this is null or not defined");
if("function"!==typeof c)throw new TypeError(c+" is not a function");for(var g=Object(this),m=g.length>>>0,f=0,a=1<arguments.length?d:void 0;f<m;)f in g&&c.call(a,g[f],f,g),f++}return"function"==typeof Array.prototype.forEach?Array.prototype.forEach:d}();Array.prototype.map=function(){function d(c,d){if(null==this)throw new TypeError(" this is null or not defined");if("function"!==typeof c)throw new TypeError(c+" is not a function");for(var g=Object(this),m=g.length>>>0,f=1<arguments.length?d:void 0,
a=0,b=Array(m);a<m;)a in g&&(b[a]=c.call(f,g[a],a,g)),a++;return b}return"function"==typeof Array.prototype.map?Array.prototype.map:d}();Object.create=function(){function d(c){if(1<arguments.length)throw Error("Second argument not supported");if("object"!=typeof c)throw TypeError("Argument must be an object");var d=function(){};d.prototype=c;var g=new d;d.prototype=null;return g}return"function"==typeof Object.create?Object.create:d}()});
BSM.define("utils","when lib/json2 utils/localstorage utils/script utils/objects utils/polyfill".split(" "),function(d,c,k,g,m,f){function a(e,b,c){b=b||"=";c=c||"&";var f=[],d,g;for(g in e)if(d=e[g],e.hasOwnProperty(g)&&g){if("object"===typeof d)d=m.$isArray(d)?d.join(c+g+b):a(d,b,c);else if("boolean"===typeof d)d=d?"y":"n";else if(null==d||void 0===d)d="";"string"!==typeof d&&"number"!==typeof d||f.push(g+b+d)}return f.join(c)}function b(a){return!(a.readyState&&"complete"!==a.readyState&&"loaded"!==
a.readyState)}function q(a,b){var c=this,f=Array.prototype.slice.call(arguments,0);return function(){var b=f.slice(1);b.push.apply(b,Array.prototype.slice.call(arguments,0));return a.apply(c,b)}}function p(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}return{$script:g,$localStorage:k,$isArray:m.$isArray,isObject:m.$isObject,$json:d.resolve(c),$toString:a,$bindTo:q,$bind:function(a,b,c){var f=Array.prototype.slice.call(arguments,1);return q.apply(a,f)},$whenReady:function(a){function c(d){d=
d.target||d.srcElement||this;if(!a.readyState||b(d))d.removeEventListener?d.removeEventListener("load",c,!0):d.detachEvent?d.detachEvent("onreadystatechange",c):d.onload=d.onreadystatechange=null,f.resolver.resolve(d)}var f=d.defer();if(a.readyState&&b(a))return f.resolve(a);a.addEventListener?a.addEventListener("load",c,!0):a.attachEvent?a.attachEvent("onreadystatechange",c):a.onload=a.onreadystatechange=c;return f.promise},$isReady:b,mixin:p,mergeDefaults:function(a,b,c){if(c){c={};for(var d in a)a.hasOwnProperty(d)&&
(c[d]=a[d]);a=c}for(var f in b)f in a||(a[f]=b[f]);return a},objectToQueryString:function(a){var c=[],b;for(b in a)a.hasOwnProperty(b)&&(c.length&&c.push("&"),c.push(b,"=",a[b]));return c.join("")},preprocessParams:function(a){var b={},d;for(d in a)if(a.hasOwnProperty(d)){if("string"!==typeof a[d])try{b[d]=c.stringify(a[d])}catch(f){}else b[d]=a[d];b[d]=encodeURIComponent(b[d])}return b},createArray:function(a,b){if("number"!==typeof a||0>a)a=0;for(var c=[],d=0;d<a;++d)c[d]=b;return c},roundToIncrement:function(a,
b,c){isNaN(c)&&(c=Infinity);isNaN(b)&&(b=1);a=Math.round(a/b)*b;return a<c?a:c},inDom:function(a,b){for(b=b||window.document;a&&a!==b;)a=a.parentNode;return a===b},isWindowHttps:function(){return"https:"===window.location.protocol},isUrl:function(a){return!(!a||!a.indexOf||0!==a.indexOf("http")&&0!==a.indexOf("https"))},dedupe:function(a){for(var b=a.length;b--;)a.indexOf(a[b])!==b&&a.splice(b,1)},inherit:function(a,b){function c(){}if("function"!==typeof a)throw Error("First argument must be function");
if(!a.prototype)throw Error("First argument must have a prototype");c.prototype=a.prototype;return p(new c,b)},all:function(a,b){if("function"!==typeof a||!m.$isArray(b))return!1;for(var c=!0,d=b.length-1;0<=d;d--)c=c&&a(b[d]);return c}}});
BSM.define("utils/custom_dom_event",["module","window","document"],function(d,c,k){function g(c,d){var a=k.createEvent("CustomEvent");a.initCustomEvent(c,d.bubbles,d.cancelable,d.detail);return a}g.prototype=window.Event&&window.Event.prototype||{};return"function"==typeof c.Event?c.CustomEvent:g});
BSM.define("utils/msgs",["module","logger","utils","document","utils/custom_dom_event"],function(d,c,k,g,m){function f(a,b){a=h(a);var c=q(a);c.addEventListener?c.addEventListener("cx_custom_event",b,!0):c.attachEvent&&c.attachEvent("oncx_custom_event",b);return c}function a(a,b){a=h(a);var c=q(a);c.removeEventListener?c.removeEventListener("cx_custom_event",b,!0):c.detachEvent&&c.detachEvent("oncx_custom_event",b);return c}function b(a,b){"object"==typeof a&&"event_name"in a&&(b=a,a=b.event_name);
a=h(a);var c=new m("cx_custom_event",{detail:{data:b,cx_event_name:a},bubbles:!0,cancelable:!0});q(a).dispatchEvent(c)}function q(a){return l(a)||p(a)}function p(a){a=a.split(".");var b=a.slice(0,a.length-1).join("."),b=l(b)||p(b);a.unshift(t);a=a.join(".");return b.appendChild(e(a))}function e(a){var b=g.createElement("div");b.id=a;b.style.display="none";b.style.visibility="hidden";return b}function h(a){r(a)&&(a=a.join("."));return a||""}function l(a){if(!a)return u;a=[t,a].join(".");var b;try{b=
u.querySelectorAll('[id="'+a+'"]')}catch(c){return null}return b[0]}var t,v,u,r=k.$isArray;(function(){var a=g.getElementsByTagName("script")[0];new c(d.id);t=["cx",d.id].join("_").replace("/","_");u=v=g.createElement("div");u=p("root");var b=window.navigator.userAgent;!b.match(/phantom/i)&&!b.match(/safari/i)||b.match(/chrome/i)||a.parentNode.insertBefore(v,a);t=[t,"root"].join(".")})();return{listen:f,on:f,off:a,unlisten:a,fire:b,async:b}});
BSM.define("model/event/gpt/display",[],function(){function d(c){for(var k in d.prototype)k in c&&(this[k]=c[k]);this.event_key&&(this.event_name="gpt.display."+this.event_key)}d.prototype={start_time:new Date,end_time:null};d.prototype.event_name="gpt.display";d.prototype.event_key="";return d});
BSM.define("controller/nucleus/gpt/display",["module","config","window","utils/msgs","model/event/gpt/display"],function(d,c,k,g,m){function f(){var b=a.display;a.display=function(){a.display=b;try{g.fire(new m({end_time:new Date}))}catch(c){}return b.apply(a,Array.prototype.slice.call(arguments,0))}}var a=k.googletag=k.googletag||{cmd:[]};return{init:function(){var b=a.cmd;b.splice?b.splice(0,0,f):b.push(f)}}});
BSM.define("flagTag","config utils/localstorage user/cache model/nucleus/nucleus_element controller/nucleus/gpt/display utils/custom_dom_event".split(" "),function(d,c,k,g,m,f){function a(){if(!e[v]||!e[v].version){var a=p(),b=["//cdn.beanstock.com/pub","cx.js"],c=h.createElement("script");b.splice(1,0,"v3.0.2-0-07f064e");b.splice(1,0,"cx");c.src=b.join("/");a.parentNode.insertBefore(c,a)}}function b(){function a(b,c){function e(){d.pubads().setTargeting(b,c)}var f=d.cmd;f.splice?f.splice(0,0,e):
f.push(e);p[b]=c}function b(a){a=new f(t,{bubbles:!1,cancelable:!1,detail:a});g.dispatchEvent(a)}var d=e[r]=e[r]||{cmd:[]},h=l+"/cxprices",m=k(h).value(),p={};c&&(m&&a("cxprices",m),c.removeItem(h),b(p))}function q(){var a=g?g.getAttribute("data-bsm-version"):"";a||(a=e[r].cmd&&e[r].cmd.restore?"v2":"v1");e[v]?e[v].nucleusVersion=a:e[v]={nucleusVersion:a,version:"v3.0.2-0-07f064e"}}var p=function(){var a;return function(){return a?a:a=h.getElementsByTagName("script")[0]}}(),e=window,h=e.document;
d.get("flag/price_cache_prefix");var l=d.get("flag/prefix"),t=d.get("flag/ready_event_name"),v=d.get("flag/bsm_namespace"),u=d.get("flag/bsm_tag_namespace"),r=d.get("flag/gpt_namespace");d=e[u]=e[u]||{run:[]};8>=parseInt(h.documentMode,10)||!1===k(l+"/enabled").value()||!c||(d.run.push(function(){e[v].require(["nucleus/loader"],function(a){a()})}),q(),a(),b(),m.init())});BSM.require.config({baseUrl:function(){}(),packages:[{name:"when",main:"when",location:"node_modules/when"}]});BSM.require(["flagTag"]);