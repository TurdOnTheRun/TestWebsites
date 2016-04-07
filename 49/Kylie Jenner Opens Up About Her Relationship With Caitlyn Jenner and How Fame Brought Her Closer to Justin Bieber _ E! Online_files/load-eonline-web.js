/*--------------------------------------
[mps:EXT] Client-Side MPS Load + Execute
--------------------------------------*/

//--> SCRIPT INIT
var mps = mps||{}, debugmode=debugmode||{}, mpscall=mpscall||{}, mpsopts=mpsopts||{}, mpsinstance=mpsinstance||false;
mps._ext={'_p':{},'loaded':0,'loadheader':0,'loadfooter':0,'nowrite':'0','_jq':((typeof(jQuery)=='function')?1:0)};
mps._ext._insertedads = mps._ext._insertedads || {};
mpsopts.callback = mpsopts.callback || 'mpsCallback';
mpsopts.catprefix = mpsopts.catprefix || '';
mpsopts.deriveparams = mpsopts.deriveparams || {1:'cat1',2:'cat2',3:'cat3',4:'cat4',5:'cat5',6:'cat6'};
mpsopts.deriveoff = mpsopts.deriveoff ? true : false;
mpsopts.maxcats = mpsopts.maxcats || 6;
mpsopts.updatecorrelator = (typeof mpsopts.updatecorrelator != 'undefined')? mpsopts.updatecorrelator : 1;
mpsopts.maxpathsegs = mpsopts.maxpathsegs || 4;
mpsopts.subset = mpsopts.subset || mpsopts.subset || false;
mpsopts.skipheader = (typeof(mpsopts.skipheader)=='undefined'||mpsopts.skipheader!=1) ? 0 : 1;
mpsopts.legacyqueues=(typeof(mpsopts.legacyqueues)==='undefined') ? 1 : mpsopts.legacyqueues;
mpsopts.forcenetcalls = mpsopts.forcenetcalls || false;
mps._ext._set = mps._ext._set || -1;
mps._reqs = mps._reqs || {};
mps._clonevars = mps._clonevars || {};
mps._ext._ = mps._loadset || 0;
mps._reqset = mps._reqset || 0;
mps._gptloaded=false;
mps.lazyloadclone=mps.lazyloadclone||{};
var isMPS = true;
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

//--> INTERNAL FUNCTIONS
var mps=mps||{},debugmode=debugmode||{};debugmode.log&&window.console||(debugmode.log=0);
mps.debugMsg = [];
mps._queue = mps._queue || {};
mps._queue.gptloadset=mps._queue.gptloadset||{};
mps._queue.mpsloaded = mps._queue.mpsloaded || [];
mps._queue.gptloaded = mps._queue.gptloaded || [];
mps._queue.mpsinit = mps._queue.mpsinit || [];
mps._queue.adload = mps._queue.adload || [];
mps._queue.adview = mps._queue.adview || [];
mps._queue.adclone = mps._queue.adclone || [];
mps._queue.refreshads = mps._queue.refreshads || [];
mps._queue.lazyload = mps._queue.lazyload || [];
mps._queue.setrails = mps._queue.setrails || [];
mps._queue.adshow = mps._queue.adshow || [];
mps._queue.adhide = mps._queue.adhide || [];
mps._queue.abdetect = mps._queue.abdetect || [];
mps._queue.clonead = [];
mps._clonerunning = false;
mps._gptrefresh = mps._gptrefresh || true;
mps._adviews = mps._adviews || {};

//--[Queues]
(function() {
  if(!mps._loadset) {
    mps._queue.exec = function(args, param) {
      if(typeof(args) === 'function') {
        !param ? args.call() : args.call(this, param);
      }
    };
    mps._queue['mpsinit'].push = function() {
      if(mps._ext&&mps._ext.loaded===1) {
        mps._queue.exec(arguments[0]);
      }
      return Array.prototype.push.apply(this,arguments);
    };
    mps._queue['abdetect'].push = function() {
      if(mps._ab && mps._ab.run) {
          mps._queue.exec(arguments[0], mps._ab.type);
      }
      return Array.prototype.push.apply(this,arguments);
    };
    mps._queue.gptloadset[0]=mps._queue.gptloadset[0]||[];
    if(typeof(mps._queue.gptloaded.length) !== 'undefined') {
      for(var i=0;i<mps._queue.gptloaded.length;i++) {
        mps._queue.gptloadset[0].push(mps._queue.gptloaded[i]);
      }
      mps._queue.gptloaded=[];
    }
    mps._queue['gptloaded'].push = function() {
      if(arguments[0]) {
        if(mpsopts.legacyqueues===1) {
          var gptLoadset = mps._reqset;
        } else {
          var gptLoadset = mps._reqset + 1;
        }
        mps._queue.gptloadset[gptLoadset]=mps._queue.gptloadset[gptLoadset]||[];
        // GPT callback already executed for this loadset.
        if((mps._reqset === mps._loadset) && mps._gptloaded) {
          googletag.cmd.push(arguments[0]);
        } else {
          mps._queue.gptloadset[gptLoadset].push(arguments[0]);
        }
      }
      return Array.prototype.push.apply(this);
    };
  }
  mps._queue.render = function(type, slot, loadset, clonenum) {
    mps._debug('[mps/Loader] MPS QUEUE: (processing queue items) ' + type + ' ' + mps._elapsed());
    switch(type) {
      case 'mps':
        for(var i=0; i<mps._queue.mpsinit.length;i++) {
          mps._queue.mpsinit[i].call();
        }
        break;
      default:
        for(var i=0; i<mps._queue[type].length; i++) {
          typeof(loadset==='number') ? mps._queue[type][i].call(this, slot, loadset, clonenum) : mps._queue[type][i].call(this, slot);
        }
        if( type == 'adclone') mps._queue.clear(type);
        break;
    }
  };
  mps._queue.clear = function(type) {
    if(type) {
      mps._debug('[mps/Loader] MPS QUEUE: (clear ' + type + ')');
      mps._queue[type] ? mps._queue[type] = [] : mps._debug('[mps/Loader] MPS QUEUE: (clear ' + type + ') is not a valid queue.');
    } else {
      mps._debug('[mps/Loader] MPS QUEUE: (clear all)');
      for(var i in mps._queue) {
        if(typeof(mps._queue[i])==='object'&&i!='mpsloaded') {
          mps._queue[i] = [];
        }
      }
    }
  };
})();

//--[Ad DOM Object] Return DOM selector using slot name
mps.selectAd = function(adunit) {
  if(typeof(adunit)!='undefined' && adunit!='' && typeof(mps)=='object' && typeof(mps.advars)!='undefined' && typeof(mps.adslots[adunit])!='undefined' && typeof(mps._select) == 'function' && (adselect=mps._select('#'+mps.adslots[adunit]))) {
    return adselect;
  } else {
    return false;
  }
}

//--[GPT Ad Object] Return Google ad object reference using the slot name
mps.getSlot = function(slotstr,loadset) {
  var _advars = mps.advars;
  loadset = (loadset !== null && typeof loadset != 'undefined') ? parseInt(loadset,10) : mps._loadset;
  if(parseInt(loadset)>-1) {
    if(!mps._advars[loadset]) return false;
    _advars = mps._advars[loadset];
  }
  if(typeof(slotstr) != 'string') { mps._debug('mps.getSlot: param is not a string'); return false; }
  if(typeof(_advars) != 'object' || typeof(_advars[slotstr]) != 'string') { mps._debug('mps.getSlot: invalid slot name'); return false; }
  if(typeof(mps._advarprefix) != 'string' || typeof(window[mps._advarprefix]) != 'object') { mps._debug('mps.getSlot: invalid page gpt object'); return false; }
  if(typeof(window[mps._advarprefix][_advars[slotstr]]) != 'object') { mps._debug('mps.getSlot: failed to load slot object'); return false; }
  return window[mps._advarprefix][_advars[slotstr]];
}

//--[Single DOM Object via Selector String] example strings: #id .class body
mps._select = function(selector) {
  if(typeof(jQuery)=='function') return (jQuery(selector)[0]||false); // jQuery available
  if(typeof(selector) != 'string' || selector.length < 2) return false;
  if(typeof(document.querySelectorAll)=='function' || typeof(document.querySelectorAll)=='object') { // Modern Browser
    return (document.querySelectorAll(selector)[0]||false);
  }
  if(selector.charAt(0)=='#') { // Old Browser (func by first char)
    return (top.document.getElementById(selector.substr(1))||false);
  } else if(selector.charAt(0)=='.') {
    return (top.document.getElementsByClassName(selector.substr(1))[0]||false);
  } else {
    return (top.document.getElementsByTagName(selector)[0]||false);
  }
}


//--[Insert HTML into Selector] mps._append (obj)domelement,(str)html
mps._append = function(selector, d) {
  if(typeof(selector)=='string') selector = mps._select(selector);
  if(typeof(selector)!='object'||typeof(d)!='string') {
    mps._debug('mps._append() invalid parameters');
    return false;
  }
  if(typeof(jQuery)=='function') return (jQuery(selector).append(d)||false); // jQuery available
  var content = d;
  content = Array.prototype.concat( [], content );

  if(content.length) {

    var frag = document.createDocumentFragment();

    var tmp = frag.appendChild( document.createElement('div'));

    tmp.innerHTML = 'X' + content;

    var scripts = tmp.getElementsByTagName('script');
    // Append html.
    if(selector) {
      selector.insertAdjacentHTML('beforeend', content);
    } else {
      mps._log('Invalid selector provided.');
    }
    for(var i=0; i<scripts.length; i++) {
      var newScript = document.createElement('script');
      if(scripts[i].id) {
        newScript.id = scripts[i].id;
      }
      if(scripts[i].src) {
        newScript.type = 'text/javascript';
        newScript.src = scripts[i].src;
        document.getElementsByTagName('head')[0].appendChild(newScript);
      } else {
        var nscript = document.createElement('script');
        var js = scripts[i].innerHTML;
        nscript.type = 'text/javascript';
        nscript.text = js;
        document.getElementsByTagName('head')[0].appendChild( nscript ).parentNode.removeChild( nscript );
      }
    }
  }
}

//--[Remove Selector(s) from DOM] mps._remove (obj)
mps._remove = function(elem) {
  if(!elem) { mps._log('Invalid selector provided.'); return false; }
  // jQuery available
  if(typeof(jQuery)=='function') {
    if((jQuery(elem).length > 0)) {
      jQuery(elem).remove(); return false;
    } else {
      mps._log('Invalid selector provided.'); return false;
    }
  }
  // querySelectorAll, getElementsByClassName, getElementsByTagName
  if(typeof elem.length === 'number' && elem.length > 0) {
    for (var j = elem.length-1; j >= 0; j--) {
      if (elem[j].parentNode) {
        elem[j].parentNode.removeChild(elem[j]);
      }
    }
  // mps._select or getElementById
  } else if(elem.nodeType) {
    if(elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  } else {
    mps._log('Invalid selector provided.');
  }
}

//--[Cookies] mps._ck.r(name) | mps._ck.w(name,value,days) | mps._ck.d(name)
mps._ck={w:function(b,d,c){var a=new Date;a.setTime(a.getTime()+864E5*c);b=b+"="+d+"; expires="+a.toGMTString()+"; path=/;";document.cookie=b},r:function(b){b+="=";for(var d=document.cookie.split(";"),c=0;c<d.length;c++){for(var a=d[c];" "==a.charAt(0);)a=a.substring(1,a.length);if(0==a.indexOf(b))return a.substring(b.length,a.length)}return null},d:function(b){mps._ck.w(b,"",-1)}};
//: Debug Mode Detection
debugmode.log=navigator.userAgent.toLowerCase().indexOf("android")>-1?null:function(a){var b=navigator.cookieEnabled?!0:!1;"undefined"!=typeof navigator.cookieEnabled||b||(document.cookie="_ckT",b=-1!=document.cookie.indexOf("_ckT")?!0:!1);var c=window.location.search&&window.location.search.indexOf("DEBUGMODE")>-1;if(c)return 2;if(!b)return!1;a+="=";for(var b=document.cookie.split(";"),d=0;d<b.length;d++){for(var e=b[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return e.substring(a.length,e.length)}return null}(String.fromCharCode(95,95)+"de"+String.fromCharCode(98,117,103,109,111)+"de"+Array(3).join("_"))||debugmode.log;

//--[Get Elapsed Time]
mps._elapsed = function(label,asval) {
  Date.now = Date.now || function() { return +new Date; };
  var displaylabel = typeof(label)!='undefined' ? ' ('+label+')' : '';
  if(typeof(mps._timer)!='number'||!(mps._timer>1)) {
    mps._timer=Date.now();
    retval = 0;
    ret = '#mpsTimer\u2022 /started/ '+mps._timer+displaylabel;
  } else {
    retval = Date.now()-mps._timer;
    ret = '#mpsTimer\u2022'+retval+'ms'+displaylabel;
  }
  if(typeof(asval)!='undefined')return retval;
  return ret;
}

//--[MPS Execution Helpers] mps._protocol() mps._checkua()
mps._protocol = function(){
  var c=null,a=window,b=null;try{for(;null!=a&&a!==c;){b=a.location.protocol;if("https:"===b)break;else if("http:"===b||"file:"===b)return"http:";c=a;a=a.parent}}catch(d){}return"https:"
}
mps._checkua = function() {
  if(mps.__ua) return mps.__ua; 
  var iecheck = navigator.appVersion.match(/MSIE ([\d]+)/);
  var ret = {
    'mobile': (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 1025 || window.navigator.userAgent.match('Mobile')) ? true : false,
    'oldie': iecheck ? parseInt(iecheck[1]) : false
  }
  mps.__ua = ret;
  return ret;
}

//--[MPS Doc Ready] mps._ready(function(){ ... });
mps._ready=function(func){if(typeof jQuery=="function")jQuery().ready(func);else mps._onload(func,window)};

//--[Native JS Doc Ready] not invoked directly
mps._onload=function(g,b){var h=!1,k=!0,a="object"!=typeof b?window.document:b.document,l=a.documentElement,f=a.addEventListener?"addEventListener":"attachEvent",n=a.addEventListener?"removeEventListener":"detachEvent",e=a.addEventListener?"":"on",d=function(c){if("readystatechange"!=c.type||"complete"==a.readyState)("load"==c.type?b:a)[n](e+c.type,d,!1),!h&&(h=!0)&&g.call(b,c.type||c)},m=function(){try{l.doScroll("left")}catch(a){setTimeout(m,50);return}d("poll")};if("complete"==a.readyState)g.call(b,"lazy");else{if(a.createEventObject&&l.doScroll){try{k=!b.frameElement}catch(p){}k&&m()}a[f](e+"DOMContentLoaded",d,!1);a[f](e+"readystatechange",d,!1);b[f](e+"load",d,!1)}};

//--[Get Query String Parameter] mps._get(parameter,[url],[decode]))
mps._get = function(e,a,b){"undefined"==typeof b&&(b=!0);"string"!=typeof a&&(a="");a=a.length?a:window.location.search;if(0>a.indexOf("?"))return!1;a=a.split("?")[1].split("&");for(var d=!0,c=0;c<a.length;c++){parr=a[c].split("=");if(parr[0]==e)return b?decodeURIComponent(parr[1]):parr[1];d=!1}if(!d)return!1};

//--[Strings] mps._trim(str,charlist)
mps._trim = function(a,e){var c,d=0,b=0;a+="";c=e?(e+"").replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1"):" \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";d=a.length;for(b=0;b<d;b++)if(-1===c.indexOf(a.charAt(b))){a=a.substring(b);break}d=a.length;for(b=d-1;0<=b;b--)if(-1===c.indexOf(a.charAt(b))){a=a.substring(0,b+1);break}return-1===c.indexOf(a.charAt(0))?a:""};

//--[Sets] mps._merge(obj1,obj2,...) mps._keys(obj,[filter])
mps._merge = function(){var d=Array.prototype.slice.call(arguments),g=d.length,a,e={},c="",k=0,f=0,b=0,h=0,l=Object.prototype.toString;a=!0;for(b=0;b<g;b++)if("[object Array]"!==l.call(d[b])){a=!1;break}if(a){a=[];for(b=0;b<g;b++)a=a.concat(d[b]);return a}for(h=b=0;b<g;b++)if(a=d[b],"[object Array]"===l.call(a))for(f=0,k=a.length;f<k;f++)e[h++]=a[f];else for(c in a)a.hasOwnProperty(c)&&(parseInt(c,10)+""===c?e[h++]=a[c]:e[c]=a[c]);return e};
mps._keys = function(a,c,f){var g="undefined"!==typeof c,e=[],h=!!f,d=!0,b="";if(a&&"object"===typeof a&&a.change_key_case)return a.keys(c,f);for(b in a)a.hasOwnProperty(b)&&(d=!0,g&&(h&&a[b]!==c?d=!1:a[b]!=c&&(d=!1)),d&&(e[e.length]=b));return e};

//--[DOM Object Class] mps._classHas(elem,class) mps._classAdd(elem,class) mps._classRemove(elem,class)
mps._classHas=function(a,b){return RegExp(" "+b+" ").test(" "+a.className+" ")};mps._classAdd=function(a,b){return mps._classHas(a,b)||(a.className+=" "+b)};mps._classRemove=function(a,b){if(!0!==mps._classHas(a,b))return!1;var c=" "+a.className.replace(/[\t\r\n]/g," ")+" ";if(mps._classHas(a,b)){for(;0<=c.indexOf(" "+b+" ");)c=c.replace(" "+b+" "," ");a.className=c.replace(/^\s+|\s+$/g,"")}return!0};

//--[Remove Event Handler] mps._eventRemove(elem,eventType,handler)
mps._eventRemove=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1);a.detachEvent&&a.detachEvent("on"+b,c)};

// [check if Element exists in DOM] mps._isElement(elem)
mps._isElement=function(e){try{return e instanceof HTMLElement}catch(t){return typeof e==="object"&&e.nodeType===1&&typeof e.style==="object"&&typeof e.ownerDocument==="object"}}

//--[Load External JS] url(str): file url, onload(func): callback, noasync(bool)
mps._loadJS = function(url,onload,noasync) {
  if(!url) return false;
  noasync = !noasync ? false : true;
  var scr = document.createElement('script');
  if(!noasync) scr.async = true;
  scr.type = 'text/javascript';
  if(url.substring(0,4) == 'http' || url.substring(0,2) == '//') url = url.replace('http://','').replace('https://','').replace('//','');
  scr.src = mps._protocol()+'//'+url;
  scr.onload=function(){ mps._log('#[mps/loadJS] async:'+!noasync+', '+url.split('/').pop()); if(typeof(onload)=='function') { onload.call(scr); } };
  //var node = document.getElementsByTagName('script')[0];
  //node.parentNode.insertBefore(scr,node);
  document.getElementsByTagName('head')[0].appendChild(scr);
  return true;
}

//--[ResetTargetingObj] insertAd & cloneAd to retrieve save originalTargeting
mps._resetTargetingObj=function(a){if("[object Array]"===Object.prototype.toString.call(a)){for(var c=[],b=0,d=a.length;b<d;b++)c[b]=arguments.callee(a[b]);return c}if("object"===typeof a){c={};for(b in a)c[b]=arguments.callee(a[b]);return c}return a};

//--[Get Viewport Size] returns array of [width, height]
mps._viewport = function() {var b = window, a = document, c = a.documentElement, a = a.getElementsByTagName("body")[0]; return[b.innerWidth || c.clientWidth || a.clientWidth, b.innerHeight || c.clientHeight || a.clientHeight];};

//--[Browser Safe Debugging] !error ^warning  #debug ~log
mps.__console = { // (internal) call using: mps._log / mps._l
log: function() {
    if(mps.__nolog) return false;
    var args = Array.prototype.slice.call(arguments);
    for(var arg in args) {
      var m = args[arg];
      if(window.console && console.log && console.warn && console.debug && console.error) {
        if(typeof(m)!='string') {
          if(mps.__console._last && typeof(console[mps.__console._last])){
            console[mps.__console._last](m);
          }
          else {
            console.log(m);
            mps.__console.overlay(m, 'log');
          }
          continue;
        }
        var f = m.charAt(0);
        if(f=='~') {
          console.log(m.substring(1));
          mps.__console.overlay(m.substring(1), 'log');
          mps.__console._last = false;
        } else if(f=='!') {
          mps.__console._last='error';
          mps.__console.overlay(m.substring(1), 'error');
          console.error(m.substring(1));
        } else if(f=='^') {
          mps.__console._last='warn';
          mps.__console.overlay(m.substring(1), 'warn');
          console.warn(m.substring(1));
        } else if(f=='#') {
          mps.__console._last='debug';
          mps.__console.overlay(m.substring(1), 'debug');
          console.debug(m.substring(1));
        } else {
          mps.__console.auto(m);
        }
      } else if(window.console && console.log) {
        console.log(m);
        mps.__console.overlay(m, 'log');
        mps._console._last=false;
      } else {
        return false;
      }
    }
    return true;
  },
  debug: function() {
    if(typeof(debugmode)!='object' || parseInt(debugmode.log) < 2) return false;
    var args = Array.prototype.slice.call(arguments);
    return mps.__console.log.apply(this, args);
  },
  overlay: function(m, type){ //(internal) don't call directly
    type = type || '';
    m = m.toString();
    var debugPanel = document.getElementById('debugPanel'); //id of debug overlay panel
      if( debugPanel ){
        var date = new Date(),
            mil = date.getMilliseconds(),
            sec = date.getSeconds(),
            min = date.getMinutes(),
            hrs = date.getHours(),
            now = hrs+':'+min+':'+sec+'.'+mil;
        if(typeof 's'.indexOf == 'function' && m.indexOf('loadmore') === -1) mps._append(debugPanel, '<p class="'+ type +'" title="'+now+'">' + m + '</p>');
        else mps._append(debugPanel, m);
        if(mps.debugMsg.length > 0){
          for(var i = 0; i<mps.debugMsg.length; i++){
            if(typeof 's'.indexOf == 'function' && mps.debugMsg[i].m.indexOf('loadmore') === -1)  mps._append(debugPanel, '<p class="'+ mps.debugMsg[i].type +'" title="'+now+'">' + mps.debugMsg[i].m + '</p>');
            else mps._append(debugPanel, mps.debugMsg[i].m);
          }
          mps.debugMsg = []; // clear debug msg queue
        }
        debugPanel.scrollTop = debugPanel.scrollHeight;
        return true;
      }else{
        mps.debugMsg.push({'m': m, 'type': type});
        return false;
      }

  },
  auto: function(m) { // (internal) do not call directly
    var typemap = {
      '#': [,'called','loaded','disabled','enabled','init','callback','calling '], // debug
      '^': ['warning','skip','bypass'], // warning
      '!': ['error','invalid','fail','terminated'] // error
    }
    for(var t in typemap) {
      for(var tv in typemap[t]) {
        if(m.toLowerCase().indexOf(typemap[t][tv]) > -1) { return mps.__console.log(t+m);}
      }
    }
    return mps.__console.log('~'+m);
  },
  _last: false
};

// Update and Get correctlor, store correlators by loadset
mps._correlator = {
  sets: this.sets || {},
  update: function(){
    googletag.cmd.push(function(){
      googletag.pubads().updateCorrelator();
    });
    if(googletag && typeof googletag.pubads().updateCorrelator() == 'object'){
      mps._debug('[mps:Loader] Update Correlator: public');
      return googletag.pubads().getCorrelator();
    }else{
      mps._debug('[mps:Loader] FAILED Update Correlator: public');
      return false;
    }
  },
  get: function(){
    if(typeof googletag.pubads() == 'object' && typeof googletag.pubads().getCorrelator() == 'string'){
      mps._debug('[mps:Loader] Get Correlator');
      return googletag.pubads().getCorrelator();
    }else{
      mps._debug('[mps:Loader] FAILED Get Correlator');
      return false;
    }
  }
};

//--(IE<9: indexOf)
Array.prototype.indexOf||(Array.prototype.indexOf=function(b,c){for(var a=c||0,d=this.length;a<d;a++)if(this[a]===b)return a;return-1});

mps._clone=function(a){if(null==a||"object"!=typeof a)return a;var c=a.constructor(),b;for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);return c};
// _haskeyval(obj[a],key[b],val[c]) Returns true if obj has a key called "key" and that key has "val" as its value.
mps._haskeyval=function(a,b,c){return a.hasOwnProperty(b)&&a[b]==c};

//--SHORTCUTS
mps._log=mps._l=mps._console=mps.__console.log;
mps._debug=mps._d=mps.__console.debug;

mps._debug('[mps/JS] LOADED: MPStools');

mps._bool = function(val,intval) {
  if(typeof(val)=='boolean') val = val ? 1 : 0;
  if(typeof(val)=='string') {
    if(val=='true') val = 1;
    if(val=='false') val = 0;
  }
  val = parseInt(val,10);
  if(!intval) return val === 1 ? true : false;
  else return typeof(val) === 'number' ? val : parseInt(val, 10);
};

mps._elapsed(); // Begin execution timer

mps._ext.mpsRequestParams = function(mpscall) {
  mps._debug('[mps/Loader] mpsRequestParams()');
  //(paths) mps._ext._pathsegs
  sitepath = mpscall.path || window.location.pathname;
  if(sitepath!='' && sitepath!='/' && sitepath.indexOf('/') > -1) {
    if(sitepath.substr(-1)=='/') sitepath=sitepath.substr(0, sitepath.length-1);
    if(sitepath.substr(0,1)=='/') sitepath=sitepath.substr(1,sitepath.length-1);
    sitepatharr = sitepath.split('/');
    mps._ext._pathsegs=[];
    var cleanpatharr=[],cutpatharr=[];
    for (var i=0; i<sitepatharr.length; i++) {
      mps._ext._pathsegs[i+1] = sitepatharr[i];
      if(i < mpsopts.maxpathsegs) {
        cleanpatharr[i+1]= sitepatharr[i];
      } else {
        cutpatharr[i+1] = sitepatharr[i];
      }
    }
    cleanpath = cleanpatharr.join('/');
    mpscall.path = cleanpath;
  } else {
    mps._ext._pathsegs = (sitepath!='/' && sitepath!='') ? [undefined,sitepath] : [undefined];
    mpscall.path = sitepath;
  }
  var qs = window.location.search.substring(1).split('&'),qsv;
  mps._ext._qsparams={};
  for(var i=0; i<qs.length; i++){
    qsv = qs[i].split('=');
    if(typeof(qsv[1])!='undefined') mps._ext._qsparams[qsv[0]] = qsv[1];
  }
  return mpscall;
}

mps._ext.mpsDeriveParams = function() {
  derived={};
  if(mpsopts.deriveoff) return derived;
  mps._debug('[mps/Loader] EXECUTE mpsDeriveParams()');

  // Extract mpscall params using format defined in mpsopts.deriveparams
  if(typeof(mpsopts.deriveparams)=='object') {
    var catkeys=['cat1','cat2','cat3','cat4','cat5','cat6'], catstring='';
    for(var k in mpsopts.deriveparams) {
      if(isNaN(k)) { //qs
        if(typeof(mps._ext._qsparams[k])=='string') derived[mpsopts.deriveparams[k]] = mps._ext._qsparams[k];
      } else { //url
        if(typeof(mps._ext._pathsegs[k])=='string') derived[mpsopts.deriveparams[k]] = mps._ext._pathsegs[k];
      }
    }
    for (var i=0; i<catkeys.length; i++) {
      if(typeof(derived[catkeys[i]])=='string') {
        catstring+=derived[catkeys[i]].replace('|','~');
        delete(derived[catkeys[i]]);
      }
      catstring+='|';
    }
    derived.cat = mps._trim(catstring,'| ').replace('||','|~|');
    mps._debug('[mps/Loader] (derived params) '+JSON.stringify(derived));
  }
  return derived;
}

mps._ext.mpsQueryString = function(mpscall) {
  if(typeof(mpscall)!='object') return '';
  var mpscallenc='';
  for(var key in mpscall) {
    if(typeof(mpscall[key])=='object') {
      for(var keyk in mpscall[key]) {
        mpscall[key+'['+keyk+']'] = mpscall[key][keyk];
      }
      delete mpscall[key];
    }
  }
  for (var k in mpscall) {
    if(typeof(mpscall[k])!='undefined' && mpscall[k] != '') {
      // Truncate really long strings at 250 chars
      if(typeof(mpscall[k]=='string') && mpscall.length > 0) mpscall[k]=mps._trim(mpscall[k].substring(0,250));
      mpscallenc+=encodeURIComponent(k)+'='+encodeURIComponent(mpscall[k]) + '&';
    }
  }
  if(mpscallenc.substr(-1)=='&') mpscallenc = mpscallenc.substr(0, mpscallenc.length - 1);
  return mpscallenc;
}

mps._ext.mpsRequestUrl = function(LOADMODE) {
  if(typeof(mpscall)!='object') return '';
  if(typeof(LOADMODE)=='string') {
    mpscall.LOADMODE=LOADMODE;
  } else {
    delete mpscall.LOADMODE;
    LOADMODE='';
  }
  mpscall.NOLOAD='mpstools';
      mps.qs = mps._ext.mpsQueryString(mpscall);
  var subset = (typeof(mpsopts.subset)=='string' && mpsopts.subset.length>0) ? '/'+mpsopts.subset : '';
  mps.requesturl = mpsinstance + '/request/page/jsonp'+subset+'?CALLBACK=' + mpsopts.callback + '&'+ mps.qs;
  mps._debug('[mps/Loader] mpsRequestUrl('+LOADMODE+'): '+mps.requesturl);
  return mps.requesturl;
}

mps._ext.mpsOnReady = function(usejq) {
  mps._debug("[mps/Loader] CALLED mpsOnReady() "+mps._elapsed());
  usejq = (typeof(usejq)=='undefined'||usejq!=1) ? 0 : 1;
  if(mps._ext.loaded == 1 && mps._ext.loadfooter == 0) {
    if(usejq == 1) {
      mps._debug('[mps/Loader] No Footer Execution Detected - Attaching Footer (jquery)');
      jQuery('body').append(mps.response.pagevars.insert_bodyfooter);
      mps._ext.loadfooter=1;
    } else {
      mps._append(mps._select('body'),mps.response.pagevars.insert_bodyfooter);
      mps._debug('[mps/Loader] No Footer Execution Detected - Attaching Footer (non-jquery)');
    }
  }
  if(mps._ext.nowrite=="0") mps._ext.nowrite="2";
}

//--> SET REQUEST VARS & OPTS
mps._debug(($dM=(new Array(8).join('*')))+' [mps] Debug Mode: ('+debugmode.log+') '+$dM);
if(typeof(mpsopts.host)=='string'&&mpsopts.host.length>0) mpsinstance=mpsopts.host;
if(typeof(mpsinstance)!='string'||mpsinstance=='') mpsinstance='mps.nbcuni.com';

//--> JSONP CALLBACK
function mpsCallback(data, update) {
  mps._debug('[mps/Loader] JSONP Callback Execution '+mps._elapsed());
  if(typeof(data)=='object' && typeof(data.pagevars.insert_head)!='undefined' && typeof(data.pagevars.insert_head)!='undefined') { // TODO: More response validation
    mps.response = data;
    mps.adslothtml = {};
    if(typeof(mps)=='object' && typeof(mps.response)=='object' && typeof(mps.response.dart)=='object' && typeof(mps.response.dart.adunits)=='object') {
      for(var adunit in mps.response.dart.adunits) {
        mps.adslothtml[adunit] = mps.response.dart.adunits[adunit].data;
      }
    }
    mps._ext.loaded = 1;
    mps.executeInserts();
    //--> DOCUMENT READY EVENT HOOK
    if(typeof(jQuery)!='function') {
      mps._debug('[mps/Loader] NO JQUERY (using native js)');
                  mps._ext._jq = 1;
      mps._ready(function(){
        mps._ext.mpsOnReady(0);
      });
    } else {
      mps._debug('[mps/Loader] JQUERY AVAILABLE');
      jQuery().ready(function() {
        mps._ext.mpsOnReady(1);
      });
    }
    if(!update) {
      mps._queue.render('mps');
      if(typeof(mps.initCallback)=='function') mps.initCallback();
    }
  }
}

mps._ext.determineSlot = function(adunit) {
  if(typeof(adunit)=='string' && typeof(mps)=='object' && typeof(mps.adunit)=='object' && typeof(mps.response)=='object' && typeof(mps.response.dart)=='object' && typeof(mps.response.dart.adunits)=='object') {
    if(typeof(mps.response.dart.adunits[adunit])=='object' && typeof(mps.response.dart.adunits[adunit].data)!='undefined' && mps.response.dart.adunits[adunit].data!='') {
      return adunit;
    }
    // Determine whether to use slot name or regular name
    if(typeof(mps.adunits[adunit])=='string') {
      if(typeof(mps.response.dart.adunits[mps.adunits[adunit]])=='object' && typeof(mps.response.dart.adunits[mps.adunits[adunit]].data)!='undefined' && mps.response.dart.adunits[mps.adunits[adunit]].data!='') {
        return mps.adunits[adunit];
      }
      // Get other ad units that have same slot
      for(var i in mps.adunits) {
        if(mps.adunits[i] == mps.adunits[adunit]) {
          if(typeof(mps.response.dart.adunits[mps.adunits[i]])=='object' && typeof(mps.response.dart.adunits[i].data)!='undefined' && mps.response.dart.adunits[i].data!='') {
            return i;
          }
        }
      }
    }
  }
  return adunit;
}

mps._replicateAd = function (adslot,loadset) {
  if(adslot.length>0 && typeof adslot == 'string'){
     loadset = (!isNaN(loadset) && loadset <= mps._keys(mps._adloads).length) ? parseInt(loadset,10) : mps._loadset;
     if(gpt && mps._advars && mps._advars[loadset]){
        mps._clonevars[loadset]=mps._clonevars[loadset]||{};
        mps._clonevars[loadset][adslot] = mps._clonevars[loadset][adslot] || [];
        var count = (mps._clonevars[loadset][adslot].length > 0 && parseInt(mps._clonevars[loadset][adslot].split('_C')[1], 10) > 0) ? parseInt(mps._clonevars[loadset][adslot].split('_C')[1],10)+1 : 1;
        mps._clonevars[loadset][adslot] = mps._advars[loadset][adslot]+'_C'+count;
        mps._debug('[mps/Loader] _replicateAd: gpt.'+mps._clonevars[loadset][adslot]);
        mps._advars[loadset][adslot+'-C'+ count] =  mps._advars[loadset][adslot]+ '_C' +count;      // create var name
        mps._adslots[loadset][adslot +'-C'+ count] =  mps._adslots[loadset][adslot]+ '-C' +count;   // create slot name
        gpt[mps._clonevars[loadset][adslot]] = gpt[mps._advars[loadset][adslot]];       // clone object
        mps.adobs.push(gpt[mps._clonevars[loadset][adslot]]);                                        // update adobs
        return gpt[mps._clonevars[loadset][adslot]];
     }
  }else{
    mps._debug('[mps/Loader] _replicateAd invalid parameters');
    return false;
  }
}

//--> MPS PAGE FUNCTIONS
mps.getAd = function(adunit,_swap) {
  var _adunit = adunit;
  var adunit = mps._ext.determineSlot(adunit);
  if (_swap){
    for(var adunitname in mps.adunits){
      if(adunit == mps.adunits[adunitname]){
        adunit = adunitname;
        break;
      } else if (mps.adunits.hasOwnProperty(adunit)) {
        adunit = mps.adunits[adunit];
        break;
      }
    }
  }
  var adslothtml = '';
  var beenrequested = false;
  if(typeof(adunit)!='undefined' && typeof(mps)=='object' && typeof(mps.response)=='object' && typeof(mps.response.dart)=='object' && typeof(mps.response.dart.adunits)=='object' && typeof(mps.response.dart.adunits[adunit])=='object' && typeof(mps.response.dart.adunits[adunit].data)!='undefined') {
    mps._ext._insertedads[mps._loadset] = mps._ext._insertedads[mps._loadset] || [];
    if(mps._keys(mps._ext._insertedads[mps._loadset]).length && mps._ext._insertedads[mps._loadset].indexOf(adunit) >= 0) {
      beenrequested = true;
    } else {
      mps._ext._insertedads[mps._loadset].push(adunit);
    }
    if(mps.response.dart.adunits[adunit].data != '') {
      adslothtml = mps.response.dart.adunits[adunit].data;
      //save mps._req adslot begin time
      if(mps.pagevars.dart_mode == 'legacy'){
        var adslotname = 'legacy';
      }else{
        var adslotname = mps.response.dart.adunits[adunit].data.split('data-mps-slot=');
        adslotname = adslotname[1].split('"')[1];
      }
      if(typeof mps._ext == 'object' && typeof mps._reqs == 'object'){
        mps._reqs[mps._loadset]=mps._reqs[mps._loadset]||{};
        mps._reqs[mps._loadset]['begin_'+adslotname] = mps._elapsed('',true);
      }
    } else {
      mps._debug("[mps/Loader] mps.getAd('"+_adunit+"') SKIPPED: Disabled "+mps._elapsed());
      adslothtml = '<!--(mps.getAd) '+adunit+' disabled-->';
    }
  } else {
    if (_swap){
      adslothtml = '<!--(mps.getAd) '+adunit+' unavailable-->';
      mps._debug("[mps/Loader] mps.getAd('"+_adunit+"') SKIPPED: Unavailable "+mps._elapsed());
    } else {
      return mps.getAd(adunit,true);
    }
  }
  return adslothtml;
}

mps.getComponent = function(sid) {
  componentdata='';
  if(typeof(sid)!='undefined' && sid !='' && typeof(mps)=='object' && typeof(mps.response)=='object' && typeof(mps.response.components)=='object' && typeof(mps.response.components[sid])=='object' && typeof(mps.response.components[sid].data)!='undefined') {
    mps._debug('[mps/Loader] mps.getComponent() LOAD: '+sid);
    if(mps.response.components[sid].data != '') {
      componentdata = mps.response.components[sid].data;
    }
  } else {
    mps._debug('[mps/Loader] mps.getComponent() SKIP: '+sid);
  }
  return componentdata;
}

mps.targetingArray = function(str) {
  if(typeof(str)=='string'&&str.length) {
    _targetingArr = [],_tmpArr = [],map={},_str = str.split(';');
    for(var i=0;i<_str.length;i++) {
      if(_str[i].indexOf('=') > -1) {
        _kv = _str[i].split('=');
        _tmpArr.push(_kv);
      }
    }
    for(var i=0; i<_tmpArr.length; i++) {
      if(_tmpArr[i][0] in map) {
        map[_tmpArr[i][0]].push(_tmpArr[i][1]);
      } else {
        map[_tmpArr[i][0]] = [_tmpArr[i][1]];
      }
    }
    for(var k in map) {
      if(map[k].length > 1) {
        _targetingArr.push([k,map[k]]);
      } else {
        _targetingArr.push([k,map[k][0]]);
      }
    }
    return _targetingArr;
  }
  return false;
};

// Append default targeting - get targeting from gpt and append new values.
mps.prependDefaultTargeting = function(obj, adslot, override) {
  var _currentTargeting = mps._resettargeting[mpscall.path][adslot] || {};
  if(!_currentTargeting || mps._keys(_currentTargeting).length ===   0) {
    mps._debug('[MPS/Loader] setTargeting('+adslot+') SKIPPED: Disabled');
    return false;
  }
  var _currentTargetingKeys = mps._keys(_currentTargeting);
  // Merge existing objects.
  for(var i in obj) {
    // Merge param.
    if(typeof obj[i] !== 'function' && typeof obj[i] !== 'undefined' && obj[i] != null) {
      if(_currentTargetingKeys.indexOf(obj[i][0]) > -1 && !override) {
        var tmpArr = [];
        if(typeof obj[i][1] === 'string') {
          tmpArr = [obj[i][1]];
        } else {
          tmpArr = obj[i][1];
        }
        var _currTargetingObj = _currentTargeting[obj[i][0]];
        for(var j=0; j<_currTargetingObj.length;j++) {
          if(tmpArr.indexOf(_currTargetingObj[j]) === -1) {
            tmpArr.push(_currTargetingObj[j]);
          }
        }
        _currentTargeting[obj[i][0]] = tmpArr;
      // New param or override param.
      } else {
        if(obj[i][1] && typeof obj[i][1] === 'string') {
          _currentTargeting[obj[i][0]] = [obj[i][1]];
        } else {
          _currentTargeting[obj[i][0]] = obj[i][1];
        }
      }
    }
  }
  return _currentTargeting;
};

mps.targetingAppend = function(selector,adslot,targetingappend,disabledetect,newpath,overridetargeting,clone,loadset) {
  clone = clone || 0;
  newpath = newpath || null;
  loadset = (loadset) ? parseInt(loadset,10) : mps._loadset; //loadset to clone
  var adslotopt = (clone > 0) ? adslot + '-C' + clone : adslot;

 if(newpath && typeof(newpath)==='string' && newpath.length > 0) {
    mps._debug('[mps/Loader]: new path: ' + newpath + ' specified, mps.makeRequest()');
    mpscall.path = mps.pagevars.path = newpath;
    mpscall.READONLY = 1;
    if(_setTargeting && mps.advars[adslotopt]) {
      if(!mps.pagevars.fields) {
        mps.pagevars.fields = {};
      }
      for(var i in _setTargeting) {
        mpscall['field[' + i + ']'] = _setTargeting[i].toString();
        mps.pagevars.fields[i] = _setTargeting[i].toString();
      }
    }
    var gptQueue = mps._reqset > mps._loadset ? mps._reqset : mps._loadset;
    gptQueue = gptQueue + 1;
    mps._queue.gptloadset[gptQueue]=mps._queue.gptloadset[gptQueue]||[];
    mps._queue.gptloadset[gptQueue].push(function() {
      googletag.cmd.push(function(){
        var _setTargeting = mps.prependDefaultTargeting(mps.targetingArray(targetingappend), adslot, overridetargeting);
        for(var i in _setTargeting) {
          if(i.indexOf('!c') != -1 ){
            gpt[mps.advars[adslotopt]].setCategoryExclusion(_setTargeting[i][0]);
          }else{
            gpt[mps.advars[adslotopt]].setTargeting(i, _setTargeting[i]);
          }
        }
        mps.insertAd(selector, adslot, null, disabledetect, null, null, clone, loadset);
      })
    });
    if(clone === 0){
      mps.makeRequest('more');
    }
  } else { // no path set
    var _setTargeting = mps.prependDefaultTargeting(mps.targetingArray(targetingappend), adslot, overridetargeting);
    if(_setTargeting && mps.advars[adslotopt]) {
      mps._debug('[mps/Loader]: set targeting and insertAd()');
      for(var i in _setTargeting) {
        if(i.indexOf('!c') != -1 ){
          gpt[mps.advars[adslotopt]].setCategoryExclusion(_setTargeting[i][0]);
          delete _setTargeting[i];
        }else{
          gpt[mps.advars[adslotopt]].setTargeting(i, _setTargeting[i]);
        }
      }
    } else {
      mps._debug('[mps/Loader]: no path or targeting params specified, insertAd()');
    }
    mps.insertAd(selector, adslot, null, disabledetect, null, null, clone, loadset);
  }
};

//--[mps.cloneAd] params: [(obj) element, (str) adslot, (str) key=val, (bool) disable lazyload, (bool) overridetarget, (int)loadset]
mps.cloneAd = function (selector, adslot, targetingappend, disabledetect, overridetargeting, loadset) {
  if(mps._clonerunning) {
    mps._queue.clonead.push(function() {
      mps.cloneAd(selector, adslot, targetingappend, disabledetect, overridetargeting, loadset);
    });
    return false;
  }
  mps._clonerunning = true;
  targetingappend = targetingappend || '';
  disabledetect = disabledetect || false;
  overridetargeting = overridetargeting || false;
  loadset = (typeof loadset != 'undefined') ? parseInt(loadset,10) : mps._loadset;
  if(!mps._gptloaded){
    mps._queue.gptloaded.push( function(){ mps.cloneAd(selector, adslot, targetingappend, disabledetect, overridetargeting, loadset);} );
    return false;
  }
  if (selector && adslot.length>0 && typeof adslot == 'string' && typeof mps._replicateAd == 'function' && mps._ext) {
    mps._ext._insertedads[loadset] = mps._ext._insertedads[loadset] || [];
    if (mps._ext._insertedads[loadset].indexOf(adslot) == -1) {
      // skip cloneAd --> call insertAd
      mps._debug('[mps:Loader] SKIPPED cloneAd, call insertAd.');
      mps.insertAd(selector, adslot, targetingappend, disabledetect, overridetargeting);
    }else {
      var cloneObj = mps._replicateAd(adslot, loadset);
      if( typeof cloneObj == 'object'){
        var cloneSizes = [], cloneTargeting = '';
        // Get clone sizes
        for (var key in cloneObj.getSizes()) {
          cloneSizes.push([cloneObj.getSizes()[key].l, cloneObj.getSizes()[key].j]);
        }
        // Define slot
        var currentCloneVar = mps._clonevars[loadset][adslot];
        if( currentCloneVar && currentCloneVar.length > 0){
          var script = document.createElement("script"),
            clonecount = parseInt(currentCloneVar.split('_C')[1], 10),
            clonevar = mps._advars[loadset][adslot] + '_C' + clonecount, // gpt_slot_id
            cloneslot = mps._adslots[loadset][adslot] + '-C' + clonecount, // gpt-div-id
            cloneadslot = adslot + '-C' + clonecount;   // topbanner-C1
          gpt[clonevar]=googletag.defineSlot(cloneObj.getAdUnitPath(),cloneSizes,cloneslot);
          if(mps._resetrsizemap && mps._resetrsizemap[adslot]) {
            gpt[clonevar].defineSizeMapping(mps._resetrsizemap[adslot]);
          }
          for(var i in cloneObj.getCategoryExclusions()) { gpt[clonevar].setCategoryExclusion(cloneObj.getCategoryExclusions()[i]); }

          // Set default targeting.
          var targetingMap = cloneObj.getTargetingMap();
          for(var t in targetingMap) {
            gpt[clonevar].setTargeting(t, targetingMap[t]);
          }

          gpt[clonevar].addService(googletag.pubads());

          googletag.cmd.push(function(){
            //call insertAd(clone) --> skip getAd
            mps.insertAd(selector, adslot, targetingappend, disabledetect, null, overridetargeting, clonecount, loadset);

            mps._queue.render('adclone',cloneadslot,loadset,clonecount); // render adclone queue

            mps.responsiveslots = mps.responsiveslots ||{};
            mps.responsiveslots[loadset] = mps.responsiveslots[loadset] ||[];
            if(mps.responsiveslots[loadset][adslot]){
            mps.responsiveslots[loadset][cloneadslot] = mps.responsiveslots[loadset][adslot];
            }
          });
        }

      }else{
        mps._debug('[mps:Loader] _replicateAd invalid object or loadset.');
      }
    }
  }else{
    mps._debug('[mps:Loader] cloneAd FAILED: Invalid parameters. ');
  }
};

//--[Insert Ad Slot into Page] params: (obj) dom element, (str) adslot, (bool) insertAd from clone
mps.insertAd = function(selector,adslot,targetingappend,disabledetect,newpath,overridetargeting,clone,loadset){
  if(!selector) return false;
  clone = clone || 0;
  if(clone>0){
    loadset = (typeof loadset != 'undefined') ? parseInt(loadset,10) : mps._loadset;
  }
  // disable detect display cloneAd using mps.lazyloadclone array
  mps.lazyloadclone[mps._loadset] = mps.lazyloadclone[mps._loadset] || [];
  var cloneIndex = mps.lazyloadclone[mps._loadset].indexOf(adslot);
  if((!disabledetect || disabledetect == null) && cloneIndex == -1){
    mps.lazyloadclone[mps._loadset].push(adslot);
  }else if(disabledetect && cloneIndex > -1){
    mps.lazyloadclone[mps._loadset].splice(cloneIndex, 1);
  }
  // disable detect display insertAd
  if(disabledetect && mps.lazyload && mps.lazyload[mps._loadset]) {
    var detectIndex = mps.lazyload[mps._loadset].adslots.indexOf(adslot);
    if(detectIndex > -1) {
      mps._debug('[mps:Loader] insertAd disable detected display called on adslot: '+adslot);
      mps.lazyload[mps._loadset].adslots.splice(detectIndex, 1);
      mps.lazyloadclone[mps._loadset] = mps._lazyloadmap.adslots;
    }
  }

  if(mps._gptloaded == false) {
    var gptQueue = 0;
    if(typeof mps._loadset === 'number' && !isNaN(mps._loadset)) {
      gptQueue = mps._reqset > mps._loadset ? mps._reqset : mps._loadset;
    }

    mps._queue.gptloadset[gptQueue]=mps._queue.gptloadset[gptQueue]||[];
    mps._queue.gptloadset[gptQueue].push(function(){ mps.insertAd(selector,adslot,targetingappend,disabledetect,newpath,overridetargeting,clone,loadset) });
    return true;
  }
  if(targetingappend && targetingappend.length || newpath) {
    mps.targetingAppend(selector,adslot,targetingappend,disabledetect,newpath,overridetargeting,clone,loadset)
    return false;
  }
  if(selector) {
    if(clone > 0){
      mps._clonevars[loadset]=mps._clonevars[loadset]||{};
      mps._clonevars[loadset][adslot] = mps._clonevars[loadset][adslot] || [];
      var count = (mps._clonevars[loadset][adslot].length > 0 && parseInt(mps._clonevars[loadset][adslot].split('_C')[1],10) > 0) ? parseInt(mps._clonevars[loadset][adslot].split('_C')[1],10) : 1;
      var cloneadslot = adslot+'-C'+ count;
      mps._debug('[mps:Loader] insertAd cloneAd('+selector+','+adslot+','+count+') '+mps._elapsed());
      var adcode = '<div id="'+mps._adslots[loadset][cloneadslot]+'" class="mps-slot" data-mps-slot="' +cloneadslot+ '" data-mps-loadset="' + loadset + '" data-mps-clone="' + count+ '"><script>mps._execAd("'+ adslot +'",'+ loadset +',' + count +',false);</script></div>';
      mps._ext._insertedads[loadset] = mps._ext._insertedads[loadset] || [];
      mps._ext._insertedads[loadset].push(cloneadslot);
      if(typeof mps._ext == 'object' && typeof mps._reqs == 'object'){
        mps._reqs[loadset] = mps._reqs[loadset] || {};
        mps._reqs[loadset]['begin_'+cloneadslot] = mps._elapsed('',true);
      }
     if((window.googletag && googletag.apiReady) && typeof(googletag.pubads)=='function' && mps._bool(mpsopts.updatecorrelator) == true) {
        mps._debug('[mps:Loader] Refreshed Correlator:cloneAd');
        mps._correlator.update();
      }
      if(adcode) return mps._append(selector,adcode);
    }else{
      mps._debug('[mps:Loader] insertAd('+selector+','+adslot+') '+mps._elapsed());
      var adcode = mps.getAd(adslot);
      if(adcode) return mps._append(selector,adcode);
    }
  }
  return false;
}

//--[Insert Component into Page] params: (obj) dom element, (str) service identifer
mps.insertComponent = function(selector,sid){
  var componentdata='';
  if(typeof(sid)!='undefined' && sid !='' && typeof(mps)=='object' && typeof(mps.response)=='object' && typeof(mps.response.components)=='object' && typeof(mps.response.components[sid])=='object' && typeof(mps.response.components[sid].data)!='undefined') {
    mps._debug('[mps:Loader] mps.getComponent() LOAD: '+sid);
    if(mps.response.components[sid].data != '' && !(selector)) {
      componentdata = mps.response.components[sid].data;
    } else if (mps.response.components[sid].data != '' && selector){
      componentdata = mps._append(selector,mps.response.components[sid].data);
    }
  } else {
    mps._debug('[mps:Loader] mps.getComponent() SKIP: '+sid);
  }
  return componentdata;
}

mps.writeFooter = function() {
  if(mps._ext.loaded==1 && typeof(mps.response.pagevars.insert_bodyfooter)=='string' && mps.response.pagevars.insert_bodyfooter.length>0) {
    mps._debug('[mps:Loader] mps.writeFooter LOAD');
    footerdata = mps.response.pagevars.insert_bodyfooter;
  } else {
    mps._debug('[mps:Loader] mps.writeFooter SKIP: Missing response or empty');
    footerdata = '';
  }
  mps._ext.loadfooter = 1;
  document.write(footerdata);};

mps._cloneObjects = function() {
  var loadset = (typeof mps._loadset === 'number' && !isNaN(mps._loadset)) ? mps._loadset : 0;
  mps._ext.pagevars = mps._ext.pagevars||{};
  if(loadset == 0) {
    if(typeof mpscall == 'object') mps._ext.mpscalls[0] = mps._clone(mpscall);
    if(typeof mps.pagevars == 'object') mps._ext.pagevars[0] = mps._clone(mps.pagevars);
  } else if(loadset > 0){
    mps._queue.gptloaded.push(function(){
      mps._ext.pagevars[loadset] = mps._clone(mps.pagevars);
      mps._ext.mpscalls[loadset] = mps._clone(mpscall);
      if(typeof mps._ext.pagevars[0] == 'object'){ mps.pagevars = mps._clone(mps._ext.pagevars[0]); }
      if(typeof mps._ext.mpscalls[0] == 'object'){ mpscall = mps._clone(mps._ext.mpscalls[0]); }
    });
  }
}

mps.updateRequest = function() {
  mps._debug('[mps:Loader] updateRequest');
  googletag.cmd.push(function() {
    if(mps._ext.nowrite=="0") mps._ext.nowrite="2";
    mps._gptloaded = false;
    mps._gptrefresh = false;

    // Re-execute inserts.
    mpsCallback(mps.response, true);
  });

  googletag.cmd.push(function() {
    var _loadset = mps._loadset;
    mps.adobs=[];
    mps._slotscalled[_loadset]={};
    mps._slotsdisabled[_loadset]={};
    mps.slotsdisabled[_loadset]=[];
    mps.slotsdisabled[_loadset] = mps.slotsdisabled[0];
    // Update dart response.
    var _adunits = mps.response.dart.adunits;
    for(var i in _adunits) {
      if(typeof(_adunits[i].data) === 'string' && _adunits[i].data.length > 0) {
        var _adunit = i.toLowerCase().replace(' ','');
        var _mpsid = mps.pagevars.mpsid;
        _adunits[i].data = _adunits[i].data.replace(/data-mps-loadset=\"([^\"]*)\"/g,'data-mps-loadset="' + _loadset + '"');
        if(_adunits[i].data.indexOf('outofpage') === -1) {
          _adunits[i].data = _adunits[i].data.replace(/id=\"([^\"]*)\"/,'id="div-' + mps._advarprefix + '-' + _adunit + '-' + _mpsid + '-' + _loadset + '"');
        } else {
          var _adoop = 'div-' + mps._advarprefix + '-outofpage-' + _mpsid + '-' + _loadset;
          var _adunit = 'div-' + mps._advarprefix + '-' +  _adunit + '-' + _mpsid + '-' + _loadset;
          _adunits[i].data = _adunits[i].data.replace(/id=\"([^\"]*)\"/g,'id="div-' + mps._advarprefix + '-outofpage-' + _mpsid + '-' + _loadset + '"');
          _adunits[i].data = _adunits[i].data.replace(_adoop, _adunit);
        }
      }
    }
    // Copy adslothtml.
    if(typeof(mps)=='object' && typeof(mps.response)=='object' && typeof(mps.response.dart)=='object' && typeof(mps.response.dart.adunits)=='object') {
      for(var adunit in mps.response.dart.adunits) {
        mps.adslothtml[adunit] = mps.response.dart.adunits[adunit].data;
      }
    }
    // update lazyload (insert,clone) adslots from loadset 0 map
    if(typeof mps.lazyload !== 'undefined' && mps.lazyload[0]) {
      mps.lazyload[mps._loadset] = mps._lazyloadmap;
      mps.lazyloadclone[mps._loadset] = mps._lazyloadmap.adslots;
    }
    // Define googletag slots, set targeting and enable pubads.
    for(var i in mps._gptTargeting) {
      var _gptTargeting = mps._gptTargeting[i];
      if(_gptTargeting.gptid && _gptTargeting.gptdiv) {
        // Set targeting and define in GPT.
        var gptKey = i;
        var _gptKey = gptKey.split('.');
        var _slotName = _gptKey[1].split('_');
        _gptKey = _gptKey[1] + '_' + mps._loadset;
        var _gptDiv = _gptTargeting.gptdiv + '-' + mps._loadset;

        if(i.indexOf('outofpage') === -1) {
          gpt[_gptKey] = googletag.defineSlot(mps._setAdId(_gptTargeting.gptid), _gptTargeting.sizes, _gptDiv);

          // Set custom targeting.
          if(mpscall.path && typeof mps._resettargeting[mpscall.path] !== 'undefined') {
            for(var l in mps._resettargeting[mpscall.path][_slotName[0]]) {
              for(var m=0; m<mps._resettargeting[mpscall.path][_slotName[0]][l].length; m++) {
                gpt[_gptKey].setTargeting(l,mps._resettargeting[mpscall.path][_slotName[0]][l][m]);
              }
            }
          }
          gpt[_gptKey].setCollapseEmptyDiv(false);
          if(mps._resetcatexclusion[gptKey] && mps._resetcatexclusion[gptKey].length) {
            for(var j = 0; j < mps._resetcatexclusion[gptKey].length; j++) {
              gpt[_gptKey].setCategoryExclusion(mps._resetcatexclusion[gptKey][j]);
            }
          }

          // Set responsive mapping.
          if(typeof mps._resetrsizemap[_slotName[0]] !== 'undefined') {
            gpt[_gptKey].defineSizeMapping(mps._resetrsizemap[_slotName[0]]);
          }

          gpt[_gptKey].addService(googletag.pubads());

        } else {
          _slotName[0] = '_oop';
          gpt[_gptKey] = googletag.defineOutOfPageSlot(_gptTargeting.gptid, _gptDiv);
          for(var j=0; j<mps._resetcatexclusion[gptKey].length; j++) {
            gpt[_gptKey].setCategoryExclusion(mps._resetcatexclusion[gptKey][i]);
          }

          // Set custom targeting.
          if(mpscall.path && typeof mps._resettargeting[mpscall.path] !== 'undefined') {
            for(var l in mps._resettargeting[mpscall.path][_slotName[0]]) {
              for(var m=0; m<mps._resettargeting[mpscall.path][_slotName[0]][l].length; m++) {
                gpt[_gptKey].setTargeting(l,mps._resettargeting[mpscall.path][_slotName[0]][l][m]);
              }
            }
          }

          // Set responsive mapping.
          if(typeof mps._resetrsizemap[_slotName[0]] !== 'undefined') {
            gpt[_gptKey].defineSizeMapping(mps._resetrsizemap[_slotName[0]]);
          }

          gpt[_gptKey].addService(googletag.pubads());

        }
        // Update mps objects
        mps.adslots[_slotName[0]] = _gptDiv;
        mps.advars[_slotName[0]] = _gptKey;

      }
    }

    mps._adslots[mps._loadset] = mps._clone(mps.adslots);
    mps._advars[mps._loadset] = mps._clone(mps.advars);
  });


  googletag.cmd.push(function() {
    // Callbacks.
    mps._queue.render('mps');
    if(typeof(mps.initCallback)=='function') {
      googletag.cmd.push(function() {
        mps.initCallback();
      });
    }
    mps._gptloadCallback();
  });
};
// --mps.makeNewRequest-- //
// COMPARE: (A) mps._ext.mpscalls[mps._keys(mps._ext.mpscalls).length-1] (B) mpscall
// PARAMS: site, path, cat, type, content_id, cag[*], field[*]

mps.makeNewRequest = function() {
  if(mpsopts.forcenetcalls || typeof(mps._loadset)=='undefined') return true;
  // Return true if any differences, else return false.
  var lastcall = (mps._keys(mps._ext.mpscalls).length) ? mps._ext.mpscalls[mps._keys(mps._ext.mpscalls).length-1] : 0,
      params = ['site', 'path', 'cat', 'type', 'content_id'],
      wildparams = /(field|cag)+\[([a-z0-9-_\.]*?)\]/gi,
      newRequest = true;
  for(var i in mpscall){
    if(lastcall && params.indexOf(i) > -1 || wildparams.test(i)){
      if(wildparams.test(i)){ mps._debug('[mps:Loader] NewRequest diffwild:'+i); return false; }
      else if(mps._haskeyval && mps._haskeyval(lastcall,i,mpscall[i])){ mps._debug('[mps:Loader] NewRequest same:'+i); newRequest = false; }
      else{  mps._debug('[mps:Loader] NewRequest diff:'+i); return true; }
    }
  }
  return newRequest;
};

mps.makeRequest = function(loadmode, retry) {
  if(!retry && loadmode === 'more') {
    if(mps._reqset > mps._loadset || !mps._gptloaded) {
      mps._reqset++;
      mps._queue.mpsloaded.push(function() { mps.makeRequest('more', true) });

      return false;
    }
    mps._adslots[mps._reqset]=mps.adslots;
    mps._reqset++;
  }
  mps._ext._insertedads=mps._ext._insertedads || {};
  mps._ext.loaded=0; mps._ext.loadheader=0; mps._ext.loadfooter=0; mps._gptloaded = false;
  var loadmode = (typeof(loadmode)=='string' && loadmode.length > 0) ? loadmode : '';
  var update = false;
    if(typeof(mps.requesturl)!='string' || mps.requesturl=='') return false;
  if(typeof(loadmode)=='string' && loadmode.length > 0) {
    if(loadmode=='more') {
      mpscall['ASYNC']=1;
      mpscall['_']=mps._loadset+1;
      mps._ext._async = true;
    }
    if(typeof mps._correlator.update == 'function' && (window.googletag && googletag.apiReady) && typeof(googletag.pubads)=='function' && (mps._bool(mpsopts.updatecorrelator) == true) || (mps._loadset && ((mps._loadset+1) % mps._bool(mpsopts.updatecorrelator, true))===0)) {
      mps._correlator.update();
    }
    // If no page values changed, refresh objects without a new request.
    if(!mps.makeNewRequest()) {
      var update = true;
      mps.updateRequest();
      return false;
    }

  }
  delete(mps.response);
  mps.requesturl = mps._ext.mpsRequestUrl(loadmode);
  (function(){
    var gptQueue = typeof mps._loadset === 'number' && !isNaN(mps._loadset) ? mps._loadset + 1 : 0;
    mps._ext._set++;
    mps._reqs[gptQueue] = {};
    var src = mps.requesturl;
    var loadscript = document.createElement('script');
    loadscript.async = true; loadscript.type = 'text/javascript';
    if(src.substring(0,4) == 'http' || src.substring(0,2) == '//') src.replace('http://','').replace('https://','').replace('//','');
      src = mps._protocol()+'//'+src;
      loadscript.src = src;
      loadscript.onload=function(){
      if(mps._ext && mps._reqs && mps._reqs[gptQueue]){
        mps._reqs[gptQueue]['mpsready'] = mps._elapsed('',true);
      }
      if(update){
        mps._cloneObjects();
      }
    }
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(loadscript, node);
  })();
};

mps.executeInserts = function() {
  if(typeof(mps)!='object' || typeof(mps.response)!='object') {
    mps._log('[mps:Loader] Failed executeInserts(): No MPS Response');
    return false;
  }
  if(mps._ext.nowrite=='0') {
    document.write(mps.response.pagevars.insert_head);
    if(mpsopts.headerskip != 1) {
      document.write(mps.response.pagevars.insert_bodyheader);
      mps._ext.loadheader = 1;
    }
    return true;
  } else {
    //@TODO Expand this capability for sites without jQuery
    if(typeof(jQuery)!='function') {
      mps._debug('[mps:Loader] executeInserts (non-jquery)');
      mps._append(mps._select('body'),mps.response.pagevars.insert_head);
      if(mpsopts.headerskip != 1) {
        mps._append(mps._select('body'),mps.response.pagevars.insert_bodyheader);
        mps._ext.loadheader = 1;
      }
    } else {
      mps._debug('[mps:Loader] executeInserts (jquery)');
      jQuery('head').append(mps.response.pagevars.insert_head);
      if(mpsopts.headerskip != 1) {
        if(typeof(mps.response) =='object') jQuery('body').prepend(mps.response.pagevars.insert_bodyheader);
        mps._ext.loadheader = 1;
      }
    }
    return true;
  }
}

//--> BUILD MPS REQUEST VARS
mps._ext._p.defined = mps._ext.mpsRequestParams(mpscall);
mps._ext._p.defined.path = typeof(mps._ext._p.defined.path)!='undefined' ? mps._ext._p.defined.path : '~';
mps._ext._p.derived = mps._ext.mpsDeriveParams();
mpscall = mps._merge(mps._ext._p.derived,mps._ext._p.defined);
mps._ext.mpscalls = mps._ext.mpscalls||{};
mps._ext.mpscalls[0] = mps._clone(mpscall);
mps._debug('[mps:Loader] (merge params)'+JSON.stringify(mps._ext._p));

//--> VARIABLES FOR INCLUDE
if(typeof(mpscall.cat)=='string') {
  mpscall.cat = mps._trim(mpscall.cat,'| ');
  var cats = mpscall.cat.split('|'), lastcat = cats[cats.length-1];
} else {
  var cats = [], lastcat = undefined;
}

//--> INCLUDE CODE [eonline-web]
//====[eonline-web]=========================================
// SET: mpscall, mpsopts REFERENCE: mps._ext._pathsegs, mps._ext._qsparams
mps.eol = mps.eol||{};
var _preprocess = {};
/*[remove topics parent category]*/
if(typeof(mpscall.cat)!='string') mpscall.cat = '';
if(mpscall.cat.indexOf('topics|'>-1)) mpscall.cat = mpscall.cat.replace('topics|','');;
/*[treat double slashes in path]*/
if(typeof(mpscall.path)=='string') {
  mpscall.path = mpscall.path.replace(/\/\//g,'/');
  mps._ext._pathsegs = mpscall.path.split('/');
}
/*[standardize detail page urls]*/
if(typeof(mpscall.type)=='string' && mpscall.type.indexOf('detail')>-1 && mps._ext._pathsegs[mps._ext._pathsegs.length-1] && !Number(mps._ext._pathsegs[mps._ext._pathsegs.length-1])) {
  mps._ext._pathsegs[mps._ext._pathsegs.length-1] = 'detail';
  mpscall.path = mps._ext._pathsegs.join('/');
}
/*[auto-set if empty]*/
if(typeof(mpscall.title)=='undefined' && typeof(document.title)=='string' && document.title.length > 0) mpscall.title = mps._trim(document.title.replace(/[^-a-z0-9\s\[\]._():]/ig,'')).substring(0,250);
if(typeof(mpscall.type)!='string'||mpscall.type=='') mpscall.type='page';
if(typeof(mpscall["cag[locale]"])!='string'||mpscall["cag[locale]"]=='') mpscall["cag[locale]"]='us';
/*[pass origination]*/
if(window && window.location) {
  mpscall['field[host]'] = window.location.hostname;
  mpscall['field[path]'] = '/'+mps._trim(window.location.pathname,'/');
  _preprocess.hostsegs = window.location.hostname.split('.');
}
/*[pass hostnames]*/
if(typeof(mpscall.type)!='string') mpscall.type='';
if(typeof(mpscall["cag[platform]"])=='string') {
  mpscall["cag[customzone]"] = 'eonline.'+mpscall["cag[locale]"];
  mpscall["field[platform]"] = mpscall["cag[platform]"];
  if(mpscall["cag[platform]"]=="mobile") {
    mpscall.path="MOBILE:"+mpscall.path;
    mpscall.type="MOBILE:"+mpscall.type;
    mpscall["cag[customzone]"]="eonline.mobile";
  }
  if(mpscall["cag[platform]"]=="app") {
    mpscall.type="APP:"+mpscall.type;
    mpscall["cag[customzone]"]="eonline.app";
  }
}
if(!mpscall["cag[platform]"]) mpscall["cag[platform]"] = 'desktop';
if(mpscall.path=='/' || mpscall.cat=='front door|home') mpscall.cat='cover';

/*[set cat on homepage if empty]*/
if(window.location.pathname=='/' && (typeof(mpscall.cat)!='string' || mpscall.cat=='')) mpscall.cat='cover';
//====[/eonline-web]=========================================


mps._debug('[mps:Loader] (mpsopts) '+JSON.stringify(mpsopts));

//(cat) resplit cat string
mps._ext._cats = (typeof(mpscall.cat)=='string') ? mpscall.cat.split('|') : [];
lastcat = mps._ext._cats[mps._ext._cats.length-1];
//(cat) set depth limit on cat level
mpsopts.maxcats = (typeof(mpsopts.maxcats)=='string') ? parseInt(mpsopts.maxcats) : mpsopts.maxcats||0;
if(mpsopts.maxcats > 0  && mps._ext._cats.length > mpsopts.maxcats) {
  mps._ext._catscut = mps._ext._cats.splice(mpsopts.maxcats+1);
}
//(cat) remove last level if filename or numeric
if(!isNaN(lastcat) || lastcat.lastIndexOf('.')>0 || lastcat.indexOf('index')===0) {
  mps._ext._cats.splice(mps._ext._cats.length-1,mps._ext._cats.length);
}
//(cat) attach prefix
mpsopts.catprefix = mps._trim(mpsopts.catprefix,'| ');
if(mpsopts.catprefix != '') {
  mps._ext._cats = mps._merge(mpsopts.catprefix.split('|'),mps._ext._cats);
}
//(cat) join and override existing value
mpscall.cat = mps._ext._cats.join('|');

mps._debug('[mps:Loader] (mpscall) ',JSON.stringify(mpscall));
if(parseInt(debugmode.log) == 2) mpscall.CACHESKIP=1;

//--> CREATE URL AND REQUEST
mps.requesturl = mps._ext.mpsRequestUrl();
  if(mpsinstance!='' && mps.qs.length > 6) {
          mps._debug('[mps:Loader] REQUEST+LOAD JSONP',mps._protocol()+'//'+mps.requesturl); mps._ext._set+=1; document.write('<scr'+'ipt id="mps-request-'+mps._loadset+'" src="'+mps._protocol()+'//'+mps.requesturl+'"></scr'+'ipt>');
      mps._reqs[mps._ext._set] = {'mpsready':mps._elapsed('',true)};
      }
  delete(mps.qs);

//--> BACKWARDS COMPATIBILITY
mpsGetAd=mps.getAd; mpsrequesturl=mps.requesturl; mps.writeHeader=function(){};