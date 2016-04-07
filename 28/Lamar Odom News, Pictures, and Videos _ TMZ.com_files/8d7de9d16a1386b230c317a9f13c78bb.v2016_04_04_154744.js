/* global javascript functions */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}


// Require Css module

define('requirecss', ['module'], function (module) {
    var loadedFiles = {};
    var baseUrl = module.config().baseUrl || '/';

    var requirecss = function() {
        var _this = Object.create({});

        // flags a css file so other calls to load the
        // file do not recreate the dom
        var flagAsLoaded = function(url) {
            var cacheKey = getCacheKey(url);
            loadedFiles[cacheKey] = true;
            //debug('flagAsLoaded: ' + cacheKey);
        };

        // adds the css file to the dom if it's
        // not already been loaded.
        var load = function(url, media) {
            var cacheKey = getCacheKey(url);
            if (isLoaded(cacheKey)) {
                //debug("already loaded: " + cacheKey);
                return;
            }
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.media = media || 'screen';
            link.href = normalizeURL(url);
            document.getElementsByTagName('head')[0].appendChild(link);
            loadedFiles[cacheKey] = true;
            //debug("loaded: " + cacheKey);
        };

        // get a proper fully qualified url to the file
        var normalizeURL = function(url) {
            if (url.indexOf('http') == 0 || url.indexOf('//') == 0) {
                return url;
            }

            if (url.indexOf('/') == 0) {
                return baseUrl + url.substr(1);
            }

            return baseUrl + url;
        };

        // returns the cache used for a given url
        var getCacheKey = function(url) {
            if (url.indexOf('http') == 0 || url.indexOf('//') == 0) {
                return url;
            }

            if (url.indexOf('/') == 0) {
                return url.substr(1);
            }

            return url;
        };

        // returns true if the file as already loaded
        var isLoaded = function(url) {
            return loadedFiles[url] === true ? true : false;
        };

        // add privileged methods
        _this.flagAsLoaded = flagAsLoaded;
        _this.load = load;

        return _this;
    };

    // attach module to the app
    // this one is a singleton so execute it
    return requirecss();
});

/*!

 handlebars v1.1.2

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
var Handlebars = (function() {
// handlebars/safe-string.js
var __module3__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module2__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr] || "&amp;";
  }

  function extend(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (!string && string !== 0) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;
  return __exports__;
})(__module3__);

// handlebars/exception.js
var __module4__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(/* message */) {
    var tmp = Error.prototype.constructor.apply(this, arguments);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module1__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  /*globals Exception, Utils */
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "1.1.2";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '>= 1.0.0'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn, inverse) {
      if (toString.call(name) === objectType) {
        if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        if (inverse) { fn.not = inverse; }
        this.helpers[name] = fn;
      }
    },

    registerPartial: function(name, str) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = str;
      }
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Error("Missing helper: '" + arg + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;

      if (isFunction(context)) { context = context.call(this); }

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });

    instance.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0)
              data.last  = (i === (context.length-1));
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) { data.key = key; }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      if (!Utils.isEmpty(context)) return options.fn(context);
    });

    instance.registerHelper('log', function(context, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, context);
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, obj) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, obj);
        }
      }
    }
  };
  __exports__.logger = logger;
  function log(level, obj) { logger.log(level, obj); }

  __exports__.log = log;var createFrame = function(object) {
    var obj = {};
    Utils.extend(obj, object);
    return obj;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module2__, __module4__);

// handlebars/runtime.js
var __module5__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  /*global Utils */
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Error("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Error("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  // TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    if (!env) {
      throw new Error("No environment passed to template");
    }

    var invokePartialWrapper;
    if (env.compile) {
      invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
        // TODO : Check this for all inputs and the options handling (partial flag, etc). This feels
        // like there should be a common exec path
        var result = invokePartial.apply(this, arguments);
        if (result) { return result; }

        var options = { helpers: helpers, partials: partials, data: data };
        partials[name] = env.compile(partial, { data: data !== undefined }, env);
        return partials[name](context, options);
      };
    } else {
      invokePartialWrapper = function(partial, name /* , context, helpers, partials, data */) {
        var result = invokePartial.apply(this, arguments);
        if (result) { return result; }
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      };
    }

    // Just add water
    var container = {
      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = {};
          Utils.extend(ret, common);
          Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: programWithDepth,
      noop: noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var namespace = options.partial ? options : env,
          helpers,
          partials;

      if (!options.partial) {
        helpers = options.helpers;
        partials = options.partials;
      }
      var result = templateSpec.call(
            container,
            namespace, context,
            helpers,
            partials,
            options.data);

      if (!options.partial) {
        checkRevision(container.compilerInfo);
      }

      return result;
    };
  }

  __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var prog = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    prog.program = i;
    prog.depth = args.length;
    return prog;
  }

  __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
    var prog = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    prog.program = i;
    prog.depth = 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;
  return __exports__;
})(__module2__, __module4__, __module1__);

// handlebars.runtime.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module3__, __module4__, __module2__, __module5__);

  return __module0__;
})();


/*
 * JQuery URL Parser plugin
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */ 

;(function($, undefined) {
    
    var tag2attr = {
        a       : 'href',
        img     : 'src',
        form    : 'action',
        base    : 'href',
        script  : 'src',
        iframe  : 'src',
        link    : 'href'
    },
    
  key = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"], // keys available to query
  
  aliases = { "anchor" : "fragment" }, // aliases for backwards compatability

  parser = {
    strict  : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
    loose   :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
  },
  
  querystring_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g, // supports both ampersand and semicolon-delimted query string key/value pairs
  
  fragment_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g; // supports both ampersand and semicolon-delimted fragment key/value pairs
  
  function parseUri( url, strictMode )
  {
    var str = decodeURI( url ),
        res   = parser[ strictMode || false ? "strict" : "loose" ].exec( str ),
        uri = { attr : {}, param : {}, seg : {} },
        i   = 14;
    
    while ( i-- )
    {
      uri.attr[ key[i] ] = res[i] || "";
    }
    
    // build query and fragment parameters
    
    uri.param['query'] = {};
    uri.param['fragment'] = {};
    
    uri.attr['query'].replace( querystring_parser, function ( $0, $1, $2 ){
      if ($1)
      {
        uri.param['query'][$1] = $2;
      }
    });
    
    uri.attr['fragment'].replace( fragment_parser, function ( $0, $1, $2 ){
      if ($1)
      {
        uri.param['fragment'][$1] = $2;
      }
    });
        
    // split path and fragement into segments
    
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');
        
        // compile a 'base' domain attribute
        
        uri.attr['base'] = uri.attr.host ? uri.attr.protocol+"://"+uri.attr.host + (uri.attr.port ? ":"+uri.attr.port : '') : '';
        
    return uri;
  };
  
  function getAttrName( elm )
  {
    var tn = elm.tagName;
    if ( tn !== undefined ) return tag2attr[tn.toLowerCase()];
    return tn;
  }
  
  $.fn.url = function( strictMode )
  {
      var url = '';
      
      if ( this.length )
      {
          url = $(this).attr( getAttrName(this[0]) ) || '';
      }
      
        return $.url( url, strictMode );
  };
  
  $.url = function( url, strictMode )
  {
      if ( arguments.length === 1 && url === true )
        {
            strictMode = true;
            url = undefined;
        }
        
        strictMode = strictMode || false;
        url = url || window.location.toString();
                            
        return {
            
            data : parseUri(url, strictMode),
            
            // get various attributes from the URI
            attr : function( attr )
            {
                attr = aliases[attr] || attr;
                return attr !== undefined ? this.data.attr[attr] : this.data.attr;
            },
            
            // return query string parameters
            param : function( param )
            {
                return param !== undefined ? this.data.param.query[param] : this.data.param.query;
            },
            
            // return fragment parameters
            fparam : function( param )
            {
                return param !== undefined ? this.data.param.fragment[param] : this.data.param.fragment;
            },
            
            // return path segments
            segment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.path;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];                    
                }
            },
            
            // return fragment segments
            fsegment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.fragment;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];                    
                }
            }
            
        };
        
  };
  
})(jQuery);

/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {
    
    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        
        value = String(value);
        
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


/*
 * jQuery Templating Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function( jQuery, undefined ){
var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

function newTmplItem( options, parentItem, fn, data ) {
// Returns a template item data structure for a new rendered instance of a template (a 'template item').
// The content field is a hierarchical array of strings and nested items (to be
// removed and replaced by nodes field of dom elements, once inserted in DOM).
var newItem = {
data: data || (parentItem ? parentItem.data : {}),
_wrap: parentItem ? parentItem._wrap : null,
tmpl: null,
parent: parentItem || null,
nodes: [],
calls: tiCalls,
nest: tiNest,
wrap: tiWrap,
html: tiHtml,
update: tiUpdate
};
if ( options ) {
jQuery.extend( newItem, options, { nodes: [], parent: parentItem } );
}
if ( fn ) {
// Build the hierarchical content to be used during insertion into DOM
newItem.tmpl = fn;
newItem._ctnt = newItem._ctnt || newItem.tmpl( jQuery, newItem );
newItem.key = ++itemKey;
// Keep track of new template item, until it is stored as jQuery Data on DOM element
(stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
}
return newItem;
}

// Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
jQuery.each({
appendTo: "append",
prependTo: "prepend",
insertBefore: "before",
insertAfter: "after",
replaceAll: "replaceWith"
}, function( name, original ) {
jQuery.fn[ name ] = function( selector ) {
var ret = [], insert = jQuery( selector ), elems, i, l, tmplItems,
parent = this.length === 1 && this[0].parentNode;

appendToTmplItems = newTmplItems || {};
if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
insert[ original ]( this[0] );
ret = this;
} else {
for ( i = 0, l = insert.length; i < l; i++ ) {
cloneIndex = i;
elems = (i > 0 ? this.clone(true) : this).get();
jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
ret = ret.concat( elems );
}
cloneIndex = 0;
ret = this.pushStack( ret, name, insert.selector );
}
tmplItems = appendToTmplItems;
appendToTmplItems = null;
jQuery.tmpl.complete( tmplItems );
return ret;
};
});

jQuery.fn.extend({
// Use first wrapped element as template markup.
// Return wrapped set of template items, obtained by rendering template against data.
tmpl: function( data, options, parentItem ) {
return jQuery.tmpl( this[0], data, options, parentItem );
},

// Find which rendered template item the first wrapped DOM element belongs to
tmplItem: function() {
return jQuery.tmplItem( this[0] );
},

// Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
template: function( name ) {
return jQuery.template( name, this[0] );
},

domManip: function( args, table, callback, options ) {
// This appears to be a bug in the appendTo, etc. implementation
// it should be doing .call() instead of .apply(). See #6227
if ( args[0] && args[0].nodeType ) {
var dmArgs = jQuery.makeArray( arguments ), argsLength = args.length, i = 0, tmplItem;
while ( i < argsLength && !(tmplItem = jQuery.data( args[i++], "tmplItem" ))) {}
if ( argsLength > 1 ) {
dmArgs[0] = [jQuery.makeArray( args )];
}
if ( tmplItem && cloneIndex ) {
dmArgs[2] = function( fragClone ) {
// Handler called by oldManip when rendered template has been inserted into DOM.
jQuery.tmpl.afterManip( this, fragClone, callback );
};
}
oldManip.apply( this, dmArgs );
} else {
oldManip.apply( this, arguments );
}
cloneIndex = 0;
if ( !appendToTmplItems ) {
jQuery.tmpl.complete( newTmplItems );
}
return this;
}
});

jQuery.extend({
// Return wrapped set of template items, obtained by rendering template against data.
tmpl: function( tmpl, data, options, parentItem ) {
var ret, topLevel = !parentItem;
if ( topLevel ) {
// This is a top-level tmpl call (not from a nested template using {{tmpl}})
parentItem = topTmplItem;
tmpl = jQuery.template[tmpl] || jQuery.template( null, tmpl );
wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
} else if ( !tmpl ) {
// The template item is already associated with DOM - this is a refresh.
// Re-evaluate rendered template for the parentItem
tmpl = parentItem.tmpl;
newTmplItems[parentItem.key] = parentItem;
parentItem.nodes = [];
if ( parentItem.wrapped ) {
updateWrapped( parentItem, parentItem.wrapped );
}
// Rebuild, without creating a new template item
return jQuery( build( parentItem, null, parentItem.tmpl( jQuery, parentItem ) ));
}
if ( !tmpl ) {
return []; // Could throw...
}
if ( typeof data === "function" ) {
data = data.call( parentItem || {} );
}
if ( options && options.wrapped ) {
updateWrapped( options, options.wrapped );
}
ret = jQuery.isArray( data ) ? 
jQuery.map( data, function( dataItem ) {
return dataItem ? newTmplItem( options, parentItem, tmpl, dataItem ) : null;
}) :
[ newTmplItem( options, parentItem, tmpl, data ) ];
return topLevel ? jQuery( build( parentItem, null, ret ) ) : ret;
},

// Return rendered template item for an element.
tmplItem: function( elem ) {
var tmplItem;
if ( elem instanceof jQuery ) {
elem = elem[0];
}
while ( elem && elem.nodeType === 1 && !(tmplItem = jQuery.data( elem, "tmplItem" )) && (elem = elem.parentNode) ) {}
return tmplItem || topTmplItem;
},

// Set:
// Use $.template( name, tmpl ) to cache a named template,
// where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
// Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

// Get:
// Use $.template( name ) to access a cached template.
// Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
// will return the compiled template, without adding a name reference.
// If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
// to $.template( null, templateString )
template: function( name, tmpl ) {
if (tmpl) {
// Compile template and associate with name
if ( typeof tmpl === "string" ) {
// This is an HTML string being passed directly in.
tmpl = buildTmplFn( tmpl )
} else if ( tmpl instanceof jQuery ) {
tmpl = tmpl[0] || {};
}
if ( tmpl.nodeType ) {
// If this is a template block, use cached copy, or generate tmpl function and cache.
tmpl = jQuery.data( tmpl, "tmpl" ) || jQuery.data( tmpl, "tmpl", buildTmplFn( tmpl.innerHTML ));
}
return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
}
// Return named compiled template
return name ? (typeof name !== "string" ? jQuery.template( null, name ): 
(jQuery.template[name] || 
// If not in map, treat as a selector. (If integrated with core, use quickExpr.exec) 
jQuery.template( null, htmlExpr.test( name ) ? name : jQuery( name )))) : null; 
},

encode: function( text ) {
// Do HTML encoding replacing < > & and ' and " by corresponding entities.
return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
}
});

jQuery.extend( jQuery.tmpl, {
tag: {
"tmpl": {
_default: { $2: "null" },
open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
// tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
// This means that {{tmpl foo}} treats foo as a template (which IS a function). 
// Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
},
"wrap": {
_default: { $2: "null" },
open: "$item.calls(_,$1,$2);_=[];",
close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
},
"each": {
_default: { $2: "$index, $value" },
open: "if($notnull_1){$.each($1a,function($2){with(this){",
close: "}});}"
},
"if": {
open: "if(($notnull_1) && $1a){",
close: "}"
},
"else": {
_default: { $1: "true" },
open: "}else if(($notnull_1) && $1a){"
},
"html": {
// Unecoded expression evaluation. 
open: "if($notnull_1){_.push($1a);}"
},
"=": {
// Encoded expression evaluation. Abbreviated form is ${}.
_default: { $1: "$data" },
open: "if($notnull_1){_.push($.encode($1a));}"
},
"!": {
// Comment tag. Skipped by parser
open: ""
}
},

// This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
complete: function( items ) {
newTmplItems = {};
},

// Call this from code which overrides domManip, or equivalent
// Manage cloning/storing template items etc.
afterManip: function afterManip( elem, fragClone, callback ) {
// Provides cloned fragment ready for fixup prior to and after insertion into DOM
var content = fragClone.nodeType === 11 ?
jQuery.makeArray(fragClone.childNodes) :
fragClone.nodeType === 1 ? [fragClone] : [];

// Return fragment to original caller (e.g. append) for DOM insertion
callback.call( elem, fragClone );

// Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
storeTmplItems( content );
cloneIndex++;
}
});

//========================== Private helper functions, used by code above ==========================

function build( tmplItem, nested, content ) {
// Convert hierarchical content into flat string array 
// and finally return array of fragments ready for DOM insertion
var frag, ret = content ? jQuery.map( content, function( item ) {
return (typeof item === "string") ? 
// Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
(tmplItem.key ? item.replace( /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2" ) : item) :
// This is a child template item. Build nested template.
build( item, tmplItem, item._ctnt );
}) : 
// If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}. 
tmplItem;
if ( nested ) {
return ret;
}

// top-level template
ret = ret.join("");

// Support templates which have initial or final text nodes, or consist only of text
// Also support HTML entities within the HTML markup.
ret.replace( /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function( all, before, middle, after) {
frag = jQuery( middle ).get();

storeTmplItems( frag );
if ( before ) {
frag = unencode( before ).concat(frag);
}
if ( after ) {
frag = frag.concat(unencode( after ));
}
});
return frag ? frag : unencode( ret );
}

function unencode( text ) {
// Use createElement, since createTextNode will not render HTML entities correctly
var el = document.createElement( "div" );
el.innerHTML = text;
return jQuery.makeArray(el.childNodes);
}

// Generate a reusable function that will serve to render a template against data
function buildTmplFn( markup ) {
return new Function("jQuery","$item",
"var $=jQuery,call,_=[],$data=$item.data;" +

// Introduce the data as local variables using with(){}
"with($data){_.push('" +

// Convert the template into pure JavaScript
jQuery.trim(markup)
.replace( /([\\'])/g, "\\$1" )
.replace( /[\r\t\n]/g, " " )
.replace( /\$\{([^\}]*)\}/g, "{{= $1}}" )
.replace( /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
function( all, slash, type, fnargs, target, parens, args ) {
var tag = jQuery.tmpl.tag[ type ], def, expr, exprAutoFnDetect;
if ( !tag ) {
throw "Template command not found: " + type;
}
def = tag._default || [];
if ( parens && !/\w$/.test(target)) {
target += parens;
parens = "";
}
if ( target ) {
target = unescape( target ); 
args = args ? ("," + unescape( args ) + ")") : (parens ? ")" : "");
// Support for target being things like a.toLowerCase();
// In that case don't call with template item as 'this' pointer. Just evaluate...
expr = parens ? (target.indexOf(".") > -1 ? target + parens : ("(" + target + ").call($item" + args)) : target;
exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
} else {
exprAutoFnDetect = expr = def.$1 || "null";
}
fnargs = unescape( fnargs );
return "');" + 
tag[ slash ? "close" : "open" ]
.split( "$notnull_1" ).join( target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true" )
.split( "$1a" ).join( exprAutoFnDetect )
.split( "$1" ).join( expr )
.split( "$2" ).join( fnargs ?
fnargs.replace( /\s*([^\(]+)\s*(\((.*?)\))?/g, function( all, name, parens, params ) {
params = params ? ("," + params + ")") : (parens ? ")" : "");
return params ? ("(" + name + ").call($item" + params) : all;
})
: (def.$2||"")
) +
"_.push('";
}) +
"');}return _;"
);
}
function updateWrapped( options, wrapped ) {
// Build the wrapped content. 
options._wrap = build( options, true, 
// Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
jQuery.isArray( wrapped ) ? wrapped : [htmlExpr.test( wrapped ) ? wrapped : jQuery( wrapped ).html()]
).join("");
}

function unescape( args ) {
return args ? args.replace( /\\'/g, "'").replace(/\\\\/g, "\\" ) : null;
}
function outerHtml( elem ) {
var div = document.createElement("div");
div.appendChild( elem.cloneNode(true) );
return div.innerHTML;
}

// Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
function storeTmplItems( content ) {
var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
for ( i = 0, l = content.length; i < l; i++ ) {
if ( (elem = content[i]).nodeType !== 1 ) {
continue;
}
elems = elem.getElementsByTagName("*");
for ( m = elems.length - 1; m >= 0; m-- ) {
processItemKey( elems[m] );
}
processItemKey( elem );
}
function processItemKey( el ) {
var pntKey, pntNode = el, pntItem, tmplItem, key;
// Ensure that each rendered template inserted into the DOM has its own template item,
if ( (key = el.getAttribute( tmplItmAtt ))) {
while ( pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute( tmplItmAtt ))) { }
if ( pntKey !== key ) {
// The next ancestor with a _tmplitem expando is on a different key than this one.
// So this is a top-level element within this template item
// Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute( tmplItmAtt ) || 0)) : 0;
if ( !(tmplItem = newTmplItems[key]) ) {
// The item is for wrapped content, and was copied from the temporary parent wrappedItem.
tmplItem = wrappedItems[key];
tmplItem = newTmplItem( tmplItem, newTmplItems[pntNode]||wrappedItems[pntNode], null, true );
tmplItem.key = ++itemKey;
newTmplItems[itemKey] = tmplItem;
}
if ( cloneIndex ) {
cloneTmplItem( key );
}
}
el.removeAttribute( tmplItmAtt );
} else if ( cloneIndex && (tmplItem = jQuery.data( el, "tmplItem" )) ) {
// This was a rendered element, cloned during append or appendTo etc.
// TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
cloneTmplItem( tmplItem.key );
newTmplItems[tmplItem.key] = tmplItem;
pntNode = jQuery.data( el.parentNode, "tmplItem" );
pntNode = pntNode ? pntNode.key : 0;
}
if ( tmplItem ) {
pntItem = tmplItem;
// Find the template item of the parent element. 
// (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
while ( pntItem && pntItem.key != pntNode ) { 
// Add this element as a top-level node for this rendered template item, as well as for any
// ancestor items between this item and the item of its parent element
pntItem.nodes.push( el );
pntItem = pntItem.parent;
}
// Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
delete tmplItem._ctnt;
delete tmplItem._wrap;
// Store template item as jQuery data on the element
jQuery.data( el, "tmplItem", tmplItem );
}
function cloneTmplItem( key ) {
key = key + keySuffix;
tmplItem = newClonedItems[key] = 
(newClonedItems[key] || newTmplItem( tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent, null, true ));
}
}
}

//---- Helper functions for template item ----

function tiCalls( content, tmpl, data, options ) {
if ( !content ) {
return stack.pop();
}
stack.push({ _: content, tmpl: tmpl, item:this, data: data, options: options });
}

function tiNest( tmpl, data, options ) {
// nested template, using {{tmpl}} tag
return jQuery.tmpl( jQuery.template( tmpl ), data, options, this );
}

function tiWrap( call, wrapped ) {
// nested template, using {{wrap}} tag
var options = call.options || {};
options.wrapped = wrapped;
// Apply the template, which may incorporate wrapped content, 
return jQuery.tmpl( jQuery.template( call.tmpl ), call.data, options, call.item );
}

function tiHtml( filter, textOnly ) {
var wrapped = this._wrap;
return jQuery.map(
jQuery( jQuery.isArray( wrapped ) ? wrapped.join("") : wrapped ).filter( filter || "*" ),
function(e) {
return textOnly ?
e.innerText || e.textContent :
e.outerHTML || outerHtml(e);
});
}

function tiUpdate() {
var coll = this.nodes;
jQuery.tmpl( null, null, null, this).insertBefore( coll[0] );
jQuery( coll ).remove();
}
})( jQuery );


this["JST"] = this["JST"] || {};
Handlebars.registerPartial("polls/_answer-item", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"results\">\n<div>\n<div class=\"answer\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n<span class=\"line-sep\"></span>\n</div>\n<div class=\"pct\">";
  if (stack1 = helpers.percent) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.percent; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</div>\n</li>";
  return buffer;
  }));
Handlebars.registerPartial("polls/_choice-item", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"options\">\n<!-- The span is used to display the graphical checkbox -->\n<input type=\"radio\" name=\"answer\" value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span></span>\n";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n</li>";
  return buffer;
  }));
Handlebars.registerPartial("search/_search-results", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "articles";
  }

function program3(depth0,data) {
  
  
  return "photos";
  }

function program5(depth0,data) {
  
  
  return "<h3 class=\"search-heading\">Latest News</h3>";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        ";
  options = {hash:{},inverse:self.programWithDepth(8, program8, data, depth0),fn:self.noop,data:data};
  if (stack1 = helpers.last) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.last; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.last) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program8(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <li class=\"";
  stack1 = helpers['if'].call(depth0, depth1.galleries, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "clearfix\">\n                <div class=\"";
  stack1 = helpers['if'].call(depth0, depth1.galleries, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " clearfix\">\n                    <a data-adid=\"TMZ_Search_Results\" class=\"has-adid\" href=\"/";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <img src=\"";
  stack1 = helpers['if'].call(depth0, depth0.primaryImage, {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" />\n                    </a>\n                </div>\n                <div class=\"title\"><a data-adid=\"TMZ_Search_Results\" class=\"has-adid\" href=\"/";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a><br /></div>\n              ";
  stack2 = ((stack1 = ((stack1 = depth1.galleries),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.program(19, program19, data),fn:self.noop,data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </li>\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "photo ";
  }

function program11(depth0,data) {
  
  
  return "thumb";
  }

function program13(depth0,data) {
  
  
  return "all-thumb";
  }

function program15(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.primaryImage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.primaryImage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  if (stack1 = helpers.ASSETS_BASEURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ASSETS_BASEURL; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "images/tmz_logo_default_100px.gif";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <div class=\"snippet\"><span>";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " - </span>";
  if (stack1 = helpers.contents) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.contents; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br /></div>\n                  <div class=\"display-url\">";
  if (stack1 = helpers.SITE_BASEURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.SITE_BASEURL; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n              ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <span class=\"previous\"><a href=\"/search/";
  if (stack1 = helpers.searchType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.searchType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.query) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.query; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/page/";
  if (stack1 = helpers.prevPage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.prevPage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Previous</a></span>\n  ";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <span class=\"next\"><a href=\"/search/";
  if (stack1 = helpers.searchType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.searchType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.query) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.query; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/page/";
  if (stack1 = helpers.nextPage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nextPage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Next >></a></span>\n  ";
  return buffer;
  }

  buffer += "<div class=\"gsa-results gsa-";
  stack1 = helpers['if'].call(depth0, depth0.news, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, depth0.galleries, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "-results\">\n    <div id=\"search_celebs\"></div>\n    ";
  stack1 = helpers['if'].call(depth0, depth0.news, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <ul>\n      ";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  if (stack1 = helpers.posts) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.posts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.posts) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>\n<div class=\"gsa-paging\">\n    <!-- pagination links -->\n  ";
  options = {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data};
  if (stack1 = helpers.hasPrevPage) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.hasPrevPage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.hasPrevPage) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  options = {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data};
  if (stack1 = helpers.hasNextPage) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.hasNextPage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.hasNextPage) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  }));
this["JST"]["community/member-comments"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<li class=\"comment-item group\">\n<div class=\"comment-image\">\n<img src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.object),stack1 == null || stack1 === false ? stack1 : stack1.author)),stack1 == null || stack1 === false ? stack1 : stack1.avatar)),stack1 == null || stack1 === false ? stack1 : stack1.small)),stack1 == null || stack1 === false ? stack1 : stack1.cache)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" height=\"50\" width=\"50\" alt=\"Avatar\" />\n</div>\n<div class=\"comment-single\">\n<div class=\"left\">\n<h3><a href=\"";
  stack2 = ((stack1 = ((stack1 = depth0.object),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.object),stack1 == null || stack1 === false ? stack1 : stack1.thread)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a></h3>\n<div class=\"comment-text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.object),stack1 == null || stack1 === false ? stack1 : stack1.raw_message)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"comment-meta\">\n<a href=\"/my-tmz/\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.object),stack1 == null || stack1 === false ? stack1 : stack1.author)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>&nbsp;&nbsp;"
    + escapeExpression(((stack1 = ((stack1 = depth0.object),stack1 == null || stack1 === false ? stack1 : stack1.daysAgo)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " DAYS AGO\n</div>\n</div>\n</div>\n</li>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n<li class=\"comment-item group\" style=\"margin-left:15px;\">No comments.</li>\n";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n<div class=\"pagination\">\n";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  if (stack1 = helpers.hasPrev) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.hasPrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.hasPrev) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
  if (stack1 = helpers.hasNext) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.hasNext; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.hasNext) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "\n<a href=\"#\" data-cursor=\"prev\">Previous</a>\n";
  }

function program8(depth0,data) {
  
  
  return "\n<a href=\"#\" data-cursor=\"next\">Next</a>\n";
  }

  buffer += "<!-- Comments -->\n<ul class=\"comments-list group\">\n<!-- If comments -->\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.response) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.response; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.response) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<!-- No Comments -->\n";
  options = {hash:{},inverse:self.program(3, program3, data),fn:self.noop,data:data};
  if (stack1 = helpers.response) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.response; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.response) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n<!-- Pagination -->\n";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  if (stack1 = helpers.pagination) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.pagination; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.pagination) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });
this["JST"]["header/user-nav"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"user-wrap\">\n<a href=\"/my-tmz\" class=\"userThumb\" title=\"";
  if (stack1 = helpers.userTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.userTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><img src=\"";
  if (stack1 = helpers.userThumb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.userThumb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"thumbnail_";
  if (stack1 = helpers.userTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.userTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" width=\"50\" height=\"50\"/></a>\n<aside class=\"my-tmz-box\">\n    <div class=\"arrow-up\"></div>\n    <div class=\"qlf-container\">\n    <h2><a href=\"/my-tmz\">MY TMZ</a></h2>\n    <a href=\"/signout\">SIGN OUT</a>\n    </div>\n  </aside>\n</li>\n\n";
  return buffer;
  });
this["JST"]["photos/ad-partial"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"category-divider\">\n    <div class=\"ad-title\">ADVERTISEMENT</div>\n    <div align=\"center\" class=\"ad-container wbads\" data-adsize=\"leaderboard\" data-pos=\"bottom\" data-tile=\"5\"></div>\n</div>\n";
  });
this["JST"]["photos/ad"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"gallery-slide gallery-ad-slide\">\n  <div class=\"gallery-ad-wrap\"> \n    <div class=\"title\">ADVERTISEMENT</div>\n    <div class=\"gallery-ad-container\"></div>\n  </div>\n</div>";
  });
this["JST"]["photos/categories"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<div class=\"gallery-featured\">\n    <ul>\n        ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <li class=\"gallery-item\">\n            <a href=\"";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <img class=\"item-bg\" src=\"";
  if (stack1 = helpers.thumbnailUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.thumbnailUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n                <div class=\"image-fade\"></div>\n                <div class=\"content\">\n                    <div class=\"icon-gallery\"></div>\n                    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.first), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    <h2 class=\"item-title\">";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</h2>\n                </div>\n            </a>\n        </li>\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "\n                      <h3 class=\"item-tag\">Featured Gallery</h3>\n                    ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<div class=\"category-wrapper\">\n    <div class=\"category-section\">\n        <h1 class=\"category-title\">";
  if (stack1 = helpers.categoryTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.categoryTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n        <a class=\"category-link\" href=\"/photos/category/";
  if (stack1 = helpers.slug) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.slug; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span>&#9658;&nbsp;</span> More from this category</a>\n        <ul class=\"";
  if (stack1 = helpers.gridType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gridType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n</div>\n\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li>\n                <a href=\"";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <div class=\"gallery-bg\">\n                        <img class=\"bg-img\" src=\"";
  if (stack1 = helpers.thumbnailUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.thumbnailUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n                        <div class=\"icon-gallery\"></div>\n                    </div>\n                    <h2 class=\"item-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h2>\n                </a>\n            </li>\n          ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.featured, {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
this["JST"]["photos/fork"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "gallery-end-slide";
  }

function program3(depth0,data) {
  
  
  return "gallery-replay";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"keep-going\">KEEP GOING!</div>\n      <div class=\"more-photos\">";
  if (stack1 = helpers.imagesLeft) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imagesLeft; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " MORE PHOTOS</div>\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"recent-gallery\">\n        <a href=\""
    + escapeExpression(((stack1 = depth0.RecordLink),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"background-image:url("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.images),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1['thumbnails-json'])),stack1 == null || stack1 === false ? stack1 : stack1[5])),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ");\" target=\"_parent\">\n          <span class=\"recent-gallery-title\">"
    + escapeExpression(((stack1 = depth0.title),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </a>\n      </li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"gallery-slide gallery-fork-slide ";
  stack1 = helpers['if'].call(depth0, depth0.isEnd, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  <div class=\"gallery-fork-top\" style=\"background-image:url(";
  if (stack1 = helpers.bgImg) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.bgImg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ");\">\n    <div class=\"gallery-fork-top-content ";
  stack1 = helpers['if'].call(depth0, depth0.isEnd, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      ";
  stack1 = helpers['if'].call(depth0, depth0.isFork, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n    </div>\n  </div>\n  <div class=\"gallery-fork-bottom\">\n    <div class=\"something-else\">OR SOMETHING ELSE?</div>\n    <ul class=\"recent-galleries\">\n    ";
  stack1 = helpers.each.call(depth0, depth0.relatedGalleries, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n</div>";
  return buffer;
  });
this["JST"]["photos/grid"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"gallery-grid-thumb\" data-index=\"";
  if (stack1 = helpers.index) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"background-image: url(";
  if (stack1 = helpers.src) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.src; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ");\"></div>";
  return buffer;
  });
this["JST"]["photos/more-categories"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li><a href=\"";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-slug=\"";
  if (stack1 = helpers.slug) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.slug; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n  ";
  return buffer;
  }

  buffer += "<h2 class=\"looking-title\">LOOKING FOR MORE?</h2>\n<ul class=\"looking-list\">\n  ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
this["JST"]["photos/slide"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"gallery-slide gallery-image-slide\" data-index=\"";
  if (stack1 = helpers.index) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-caption=\"";
  if (stack1 = helpers.caption) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.caption; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-slug=\"";
  if (stack1 = helpers.slug) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.slug; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-credit=\"";
  if (stack1 = helpers.credit) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.credit; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  <img class=\"hidden\" src=\"\" id=\"slide_";
  if (stack1 = helpers.index) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-src=\"";
  if (stack1 = helpers.src) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.src; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n</div>";
  return buffer;
  });
this["JST"]["polls/poll-homepage-post-results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = self.invokePartial(partials['polls/_answer-item'], 'polls/_answer-item', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  buffer += "<!-- Results Container -->\n<div id=\"poll-";
  if (stack1 = helpers.guid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.guid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-results\" class=\"poll-results\" data-answers-template=\"polls/poll-homepage-post-results\">\n<div class=\"results-wrapper\">\n\n<!-- Answers -->\n<ul>\n";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.item),stack1 == null || stack1 === false ? stack1 : stack1.answers), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</ul>\n\n<span class=\"vote-tally\">\nTotal Votes: <span>";
  if (stack2 = helpers['total-votes']) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0['total-votes']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n</span>\n<a href=\"#\" class=\"note-toggle note-on\">*Poll Results</a>\n<div style=\"clear: both;\"></div>\n</div>\n\n<!-- Note on results -->\n<div class=\"note-on-results\">\n<p class=\"note\">\n<strong>NOTE:</strong> Poll results are not scientific and reflect\nthe opinions of only those users who chose to participate. Poll\nresults are not reflected in real time.\n</p>\n<div class=\"back-to-results\">\n<a href=\"#\" class=\"note-toggle\">Back to Poll Results</a>\n</div>\n</div>\n\n<!-- Voted Button -->\n<div class=\"voted-btn\">\n<span>VOTED</span>\n</div>\n</div>";
  return buffer;
  });
this["JST"]["polls/poll-homepage-post-wide-results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = self.invokePartial(partials['polls/_answer-item'], 'polls/_answer-item', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  buffer += "\n<div id=\"poll-";
  if (stack1 = helpers.guid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.guid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-results\" class=\"poll-results\"\n     data-answers-template=\"polls/poll-homepage-post-wide-results\">\n    <div class=\"poll-title\">\n        <h3>";
  stack2 = ((stack1 = ((stack1 = depth0.item),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</h3>\n    </div>\n    <div class=\"poll-answers results-wrapper\">\n      "
    + "\n<ul class=\"results-list\">\n";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.item),stack1 == null || stack1 === false ? stack1 : stack1.answers), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</ul>\n        <div style=\"clear: both;\"></div>\n        <span class=\"vote-tally\">\n            Total Votes: <span>";
  if (stack2 = helpers['total-votes']) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0['total-votes']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </span>\n        <a href=\"#\" class=\"note-toggle note-on\">*Poll Results</a>\n\n    </div>\n\n  "
    + "\n  <div class=\"poll-answers note-on-results\">\n    <p class=\"note\">\n        <strong>NOTE:</strong> Poll results are not scientific and reflect\n        the opinions of only those users who chose to participate. Poll\n        results are not reflected in real time.\n    </p>\n\n    <div class=\"back-to-results\">\n        <a href=\"#\" class=\"note-toggle\">Back to Poll Results</a>\n    </div>\n  </div>\n\n  "
    + "\n  <div class=\"poll-submit voted-btn\">\n    <span>VOTED</span>\n  </div>\n</div>";
  return buffer;
  });
this["JST"]["polls/poll-homepage-post-wide"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  stack1 = self.invokePartial(partials['polls/_choice-item'], 'polls/_choice-item', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;
  }

  buffer += "<div class=\"poll\">\n    <form class=\"poll\" data-guid=\"";
  if (stack1 = helpers.guid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.guid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        "
    + "\n        <div class=\"poll-title\">\n            <h3>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h3>\n            <input type=\"hidden\" name=\"title\" value=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"/>\n            "
    + "\n            <div id=\"poll-";
  if (stack1 = helpers.guid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.guid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-message\" class=\"polls-message\"></div>\n        </div>\n        <div class=\"poll-answers\">\n            <ul>\n                ";
  stack1 = helpers.each.call(depth0, depth0.answers, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n        </div>\n        <div class=\"poll-submit\">\n            "
    + "\n            <button type=\"button\" value=\"VOTE\" class=\"btn-vote\">VOTE</button>\n        </div>\n    </form>\n</div>";
  return buffer;
  });
this["JST"]["polls/poll-homepage-post"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = self.invokePartial(partials['polls/_choice-item'], 'polls/_choice-item', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  buffer += "<!-- Poll Question -->\n<h3>\n<strong>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n</h3>\n\n<!-- Container -->\n<div class=\"poll\">\n<!-- Poll Message (error) -->\n<div id=\"poll-";
  if (stack1 = helpers.guid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.guid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-message\" class=\"polls-message\"></div>\n\n<!-- Form -->\n<form class=\"poll\" data-guid=\"";
  if (stack1 = helpers.guid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.guid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n<!-- Choices -->\n<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.answers, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n<!-- Submit -->\n<button type=\"button\" value=\"VOTE\" class=\"btn-vote\">VOTE</button>\n<div style=\"clear: both;\"></div>\n</form>\n</div>";
  return buffer;
  });
this["JST"]["search/celebs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"";
  stack1 = helpers['if'].call(depth0, depth1.galleries, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "clearfix\">\n        <a data-adid=\"TMZ_Search_Results\" class=\"has-adid celeb-result\" href=\"/person/";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          <img src=\"";
  stack1 = helpers['if'].call(depth0, depth0.primaryImage, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" />\n          <div class=\"title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n        </a>\n      </li>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "photo ";
  }

function program4(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.primaryImage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.primaryImage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  if (stack1 = helpers.ASSETS_BASEURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ASSETS_BASEURL; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "images/tmz_logo_default_100px.gif";
  return buffer;
  }

  buffer += "<h3 class=\"search-heading\">Celebs</h3>\n<ul>\n  ";
  options = {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data};
  if (stack1 = helpers.posts) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.posts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.posts) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n<script>\n  $('.celeb-result').on('click', function() {\n    s.prop37 = s.eVar37 = $(this).find('.title').html();\n    s.tl();  \n  });\n</script>";
  return buffer;
  });
this["JST"]["search/search"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "current ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials['search/_search-results'], 'search/_search-results', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  buffer += "<div class=\"breadcrumbs group\"><a href=\"/\" id=\"breadcrumb-home\">Home</a>Search</div>\n<div id=\"main-content\">\n    <div class=\"gsa-tabs\" id=\"gsa-tabs\">\n        <ul>\n            <li><a id=\"gsa-tabs-articles\" data-search-type=\"news\" data-adid=\"TMZ_Search_Results_Tabs\" class=\"";
  stack1 = helpers['if'].call(depth0, depth0.news, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "has-adid search-tab\" href=\"/search/news/";
  if (stack1 = helpers.query) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.query; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/\">Latest News &amp; Celebs</a></li>\n            <li><a id=\"gsa-tabs-photos\" data-search-type=\"galleries\" data-adid=\"TMZ_Search_Results_Tabs\" class=\"";
  stack1 = helpers['if'].call(depth0, depth0.galleries, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "has-adid search-tab\" href=\"/search/galleries/";
  if (stack1 = helpers.query) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.query; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/\">Photos</a></li>\n            <li><a id=\"gsa-tabs-videos\" data-search-type=\"videos\" data-adid=\"TMZ_Search_Results_Tabs\" class=\"";
  stack1 = helpers['if'].call(depth0, depth0.videos, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "has-adid search-tab\" href=\"/search/videos/";
  if (stack1 = helpers.query) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.query; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/\">Videos</a></li>\n        </ul>\n    </div>\n    <div class=\"gsa-results-header clearfix\">\n        <p>Your search for <strong>";
  if (stack1 = helpers.query) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.query; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong> returned about <strong>";
  if (stack1 = helpers.totalResults) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.totalResults; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong> results.</p>\n    </div>\n";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.hasData) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.hasData; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.hasData) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div> <!-- END main-content -->\n";
  return buffer;
  });
this["JST"]["share/share"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"box\" href=\"#\">\n  <div class=\"share\">\n    <span class=\"share-";
  if (stack1 = helpers['class']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['class']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-icon\"></span>\n    <span class=\"share-count\">{total}</span>\n  </div>\n</a>";
  return buffer;
  });
this["JST"]["shortcodes/tmz-video-embed"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"";
  if (stack1 = helpers.player_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.player_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-video-type=\"kaltura\"\n     style=\"height:";
  if (stack1 = helpers.custom_height) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.custom_height; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "px; width:";
  if (stack1 = helpers.custom_width) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.custom_width; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "px;position:relative;clear:both;\">\n     <div class=\"video-container\"></div>\n     ";
  if (stack1 = helpers.launch_quote_template) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.launch_quote_template; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<script>\n    var playerName = '";
  if (stack1 = helpers.player_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.player_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "';\n    $(function (callback) {\n        playerName = new TmzKalturaPlayerView({\n            where: '.' + '";
  if (stack1 = helpers.player_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.player_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " .video-container',\n            height: ";
  if (stack1 = helpers.custom_height) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.custom_height; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ",\n            width: ";
  if (stack1 = helpers.custom_width) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.custom_width; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ",\n            cacheSt: 9999999999,\n            site: 'tmz',\n            endcard: ";
  if (stack1 = helpers.endcard) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.endcard; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ",\n            autoplay: false,\n            autoContinue: false,\n            thumbnail: true,\n            showPlaylist: false,\n            playerOptions: {\n                entryId: '";
  if (stack1 = helpers.video_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.video_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "',\n                thumbnailUrl: '";
  if (stack1 = helpers.primary_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.primary_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "'\n            }\n        });\n        callback(playerName);\n    }(function (player) {\n        player.draw();\n    }));\n</script>\n";
  return buffer;
  });
this["JST"]["shortcodes/tmz-video-launch-quote"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function";


  buffer += "<div class=\"launch-quote\"><span class=\"launch-quote-text\">";
  if (stack1 = helpers.launch_quote) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.launch_quote; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span><span\n        class=\"video-credit-text\">";
  if (stack1 = helpers.video_credit) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.video_credit; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></div>\n";
  return buffer;
  });
this["JST"]["widgets/quick-subscribe"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"quick-subscribe-block\">\n  <h2>SUBSCRIBE</h2>\n   <form class=\"quick-subscribe-form\">\n    <div class=\"optin-errortxt\"></div>\n    <input type=\"text\" id=\"fteemail2\" class=\"quicksub-email\" name=\"email\" value=\"\" placeholder=\"Email Address\"/>\n    <span class=\"disclaimer\">By clicking \"Sign me up!\", you agree to the <a href=\"\">Privacy Policy</a> and <a href=\"\">Terms\n      of Use</a>.</span>\n    <input class=\"quick-subscribe-submit\" type=\"submit\" value=\"GO\">\n  </form>\n</div>";
  });
this["JST"]["widgets/sidebar/follow-tmz"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"tabs\">\n    <h3>FOLLOW TMZ</h3>\n    <ul class=\"tab-links first clr\">\n        <li id=\"viaemail\" class=\"arrow_box\"><i></i></li>\n        <li id=\"facebook\"><i></i></li>\n        <li id=\"twitter\"><i></i></li>\n        <li id=\"youtube\"><i></i></li>\n        <li id=\"instagram\"><i></i></li>\n        <li id=\"apps\"><i></i></li>\n        <li id=\"menuMore\"><i></i></li>\n    </ul>\n    <ul class=\"tab-links second clr hidden\">\n        <li id=\"gplus\" class=\"arrow_box\"><i></i></li>\n        <li id=\"tumblr\"><i></i></li>\n        <li id=\"pinterest\"><i></i></li>\n        <li id=\"vine\"><i></i></li>\n        <li id=\"rssfeed\"><i></i></li>\n        <li id=\"sms\"><i></i></li>\n        <li id=\"menuClose\"><i></i></li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"groupA\">\n            <div id=\"tab1\" class=\"viaemail tab clr\"><!-- email -->\n\n                <iframe id=\"opt-in-iframe2\" width=\"0\" height=\"0\"\n                        scrolling=\"no\" name=\"opt-in-iframe2\"></iframe>\n                <form id=\"email-opt-in\"\n                      action=\"http://www.nl.tmz.com/subscribev2.php\"\n                      method=\"post\" class=\"emailForm\"\n                      target=\"opt-in-iframe2\">\n                    <div id=\"optin-errormsg\"></div>\n                    <div class=\"leftcol\">\n                        <input type=\"text\" id=\"ftemail\" name=\"email\"\n                               value=\"Enter your email\"\n                               placeholder=\"Enter your email\"/>\n                        <input type=\"checkbox\" name=\"groups[]\" value=\"3\"\n                               id=\"icymi\" checked onclick=\"customAdId('follow-widget.tmz.newsletter.icymi.checked');\"/>\n                        <input type=\"checkbox\" name=\"groups[]\" value=\"268\"\n                               id=\"breaking\" checked onclick=\"customAdId('follow-widget.tmz.newsletter.breaking.checked');\"/>\n                        <span class=\"policy-link\">By clicking \"Sign me up!\" you agree to the <a\n                                href=\"http://www.warnerbros.com/privacy-center-wb-privacy-policy\"\n                                target=\"_new\"\n                                onclick=\"s_objectID=&quot;http://www.warnerbros.com/privacy-center-wb-privacy-policy_1&quot;;return this.s_oc?this.s_oc(e):true\">Privacy\n                            Policy</a> and <a\n                                href=\"http://www.tmz.com/terms/\"\n                                target=\"_new\"\n                                onclick=\"s_objectID=&quot;http://www.tmz.com/terms/_1&quot;;return this.s_oc?this.s_oc(e):true\">Terms\n                            of Use</a>.</span>\n\n                        <div class=\"form-labels\">\n                            <label for=\"icymi\"><strong>In Case You Missed\n                                It</strong><br/>Receive a breakdown of the\n                                week's top stories.</label><br/><br/>\n                            <label for=\"breaking\"><strong>Breaking\n                                News</strong><br/>Our biggest stories\n                                delivered straight to your inbox.</label>\n                        </div>\n                    </div>\n                    <div class=\"rightcol\">\n                        <input id=\"ftmz-subscribe-btn\" type=\"submit\"\n                               value=\"Sign me Up!\"/>\n                    </div>\n                </form>\n\n            </div>\n            <div id=\"tab2\" class=\"facebook tab hidden\"><!-- facebook -->\n                <div id=\"fb-root\"></div>\n                <div class=\"fb-like\" data-href=\"https://www.facebook.com/tmz\" data-width=\"275\" data-layout=\"standard\" data-action=\"like\" data-show-faces=\"false\" data-share=\"false\"></div>\n            </div>\n            <div id=\"tab3\" class=\"twitter tab hidden\"><!-- twitter -->\n\n            </div>\n            <div id=\"tab4\" class=\"youtube tab hidden\"><!-- youtube -->\n                <div class=\"g-ytsubscribe\" data-channel=\"TMZ\"\n                     data-layout=\"full\" data-count=\"default\"></div>\n            </div>\n            <div id=\"tab5\" class=\"instagram tab hidden\"><!-- instagram -->\n                <a href=\"http://instagram.com/tmz_tv?ref=badge\"\n                   class=\"ig-b- ig-b-v-24\" target=\"_new\" onclick=\"customAdId('follow-widget.tmz.instagram.submit');\"><img\n                        src=\"//badges.instagram.com/static/images/ig-badge-view-24.png\"\n                        alt=\"Instagram\"/></a>\n            </div>\n            <div id=\"tab6\" class=\"apps tab hidden\"><!-- apps -->\n                <a href=\"https://itunes.apple.com/us/app/tmz/id299948601?mt=8\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.app.appleStore');\"><i id=\"ios\"></i></a>\n                <hr>\n                <a href=\"https://play.google.com/store/apps/details?id=com.rhythmnewmedia.tmz&hl=en\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.app.googleStore');\"><i id=\"googleplay\"></i></a>\n                <hr>\n                <a href=\"http://www.amazon.com/Warner-Bros-TMZ/dp/B004SRD2MY\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.app.amazonStore');\"><i id=\"amazonstore\"></i></a>\n            </div>\n        </div>\n        <div class=\"groupB\">\n            <div id=\"tab7\" class=\"gplus tab hidden\"><!-- gplus -->\n                <div class=\"g-follow\" data-annotation=\"bubble\"\n                     data-height=\"24\"\n                     data-href=\"https://plus.google.com/112203561486212102740\"\n                     data-rel=\"publisher\"></div>\n            </div>\n            <div id=\"tab8\" class=\"tumblr tab hidden\"><!-- tumblr -->\n                <iframe class=\"btn\" frameborder=\"0\" border=\"0\"\n                        scrolling=\"no\" allowtransparency=\"true\" height=\"25\"\n                        width=\"116\"\n                        src=\"http://platform.tumblr.com/v1/follow_button.html?button_type=2&tumblelog=tmz&color_scheme=dark\"></iframe>\n            </div>\n            <div id=\"tab9\" class=\"pinterest tab hidden\"><!-- pinterest -->\n                <a data-pin-do=\"buttonFollow\"\n                   href=\"http://www.pinterest.com/tmz/\" onclick=\"customAdId('follow-widget.tmz.pinterest.submit');\">TMZ</a>\n                <script type=\"text/javascript\" async defer\n                        src=\"//assets.pinterest.com/js/pinit.js\"></script>\n            </div>\n            <div id=\"tab10\" class=\"vine tab hidden\"><!-- vine -->\n                <a href=\"https://vine.co/tmz\" target=\"_new\"><i\n                        id=\"vinelink\" onclick=\"customAdId('follow-widget.tmz.vine.submit');\"></i></a>\n            </div>\n            <div id=\"tab11\" class=\"rssfeed tab hidden\"><!-- rssfeeds -->\n                <a href=\"http://www.tmz.com/rss.xml\" target=\"_new\" onclick=\"customAdId('follow-widget.tmz.rss.tmz.submit');\"><i\n                        id=\"rsslink\"></i></a>\n                <hr>\n                <a href=\"http://www.tmz.com/feeds\" class=\"allfeeds\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.rss.allfeeds.submit');\">View all RSS feeds.</a>\n            </div>\n            <div id=\"tab12\" class=\"sms tab hidden\"><!-- sms -->\n                <span>To receive Breaking News texted to your mobile phone, sign up for <strong>Mobile\n                    SMS Alerts</strong> by <a\n                        href=\"http://www.tmz.com/tmzmobilealerts\"\n                        target=\"_new\" onclick=\"customAdId('follow-widget.tmz.sms.submit');\">submitting your phone number here</a>.</span>\n            </div>\n        </div>\n        <!-- end .groupB -->\n    </div>\n    <!-- .tab-content -->\n</div>\n<! -- tabs -->";
  });
this["JST"]["widgets/sidebar/most-commented-posts"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<article class=\"clearfix\">\n";
  stack1 = helpers['if'].call(depth0, depth0.primaryImage, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<a class=\"subheader\" href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?adid=sidebarwidget-most-commented\">\n";
  stack1 = helpers['if'].call(depth0, depth0.fragments, {hash:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</a>\n<h5>";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h5>\n</article>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?adid=sidebarwidget-most-commented\" target=\"_blank\" rel=\"nofollow\"><img src=\"";
  if (stack1 = helpers.primaryImage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.primaryImage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" /></a>\n";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.each.call(depth0, depth0.fragments, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n";
  return buffer;
  }

  buffer += "<div class=\"sidebar-widget posts-widget tmz-posts\">\n<div class=\"widget-title\">Most Commented</div>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.posts) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.posts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.posts) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div>";
  return buffer;
  });

define('document', function(){ return document; });
define('window', function(){ return window; });

/*
 * Anything known to be present already MUST be defined here so that
 * requirejs doesn't attempt to load them again.  This is only needed
 * for non-amd modules.
 * @site www.tmz.com
 */
define('jquery.cookie', ['window'], function(window) { return window.jQuery.cookie; });
//define('jquery.easing', ['window'], function(window) { return window.jQuery.easing; });
define('jquery.tmpl', ['window'], function(window) { return window.jQuery.template; });
//define('jquery.touchwipe', ['window'], function(window) { return window.jQuery; });
//define('jquery.ui', ['window'], function(window) { return window.jQuery; });
define('handlebars', ['window'], function(window) { return window.Handlebars; });
//define('modernizr', ['window'], function(window) { return window.Modernizr; });
define('templates/jst', ['window'], function(window) { return window.JST; });

require.config({
    paths: {
        'backbone': [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
            'backbone/1.1.0/backbone-min'
        ],
        'handlebars': [
            'handlebars/1.1.2/handlebars.runtime'
        ],
        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
            'jquery/jquery-1.10.2.min'
        ],
        'jquery.ui': [
            '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min',
            'jquery.ui/1.8.14/jquery.ui.min'
        ],
        'underscore': [
            '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
            'underscore/1.5.2/underscore-min'
        ],
        'async': [
            '//connect.facebook.net/en_US/all'

        ]
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'handlebars': {exports: 'Handlebars'},
        'jquery': {exports: 'jQuery'},
        'jquery.ui': {
            deps: ['jquery'],
            exports: 'jQuery.ui'
        },
        'underscore': {exports: '_'},
        'facebook':{
            exports:'FB'
        }
    },

    config: {
        requirecss: {
            // holy shit this is hack city
            baseUrl: require.s.contexts._.config.baseUrl.substr(0, require.s.contexts._.config.baseUrl.length-3)
        }
    }
});


/**
 * TMZ Application
 */
define('app',
    [
        'require',
        'jquery',
        'dispatcher',
        'util',
        'logger',
        'module',
        'window',
        'document'
    ],

function(require, $, dispatcher, util, loggerFactory, module, window, document, undefined) {
    'use strict';

    var logger = loggerFactory.getInstance(module.id);

    /** @type {boolean} */
    var userLoggedIn = false;

    function app() {
        var _this = Object.create({});

        /**
         * initialize the application
         */
        function init() {
            logger.info('init');
        }

        /**
         * Sets the user logged in state.
         * @param {boolean} loggedIn
         */
        function setUserLoggedIn(loggedIn) {
            userLoggedIn = loggedIn;

            // todo: send "user" object with event
            if (userLoggedIn) {
                dispatcher.trigger('user:logged_in');
            } else {
                dispatcher.trigger('user:logged_out');
            }
        }

        /**
         * Returns the user login state.
         * @return {boolean}
         */
        function isUserLoggedIn() {
            return userLoggedIn;
        }

        /**
         * add privileged methods
         */
        _this.init = init;
        _this.dispatcher = dispatcher;
        _this.util = util;
        _this.setUserLoggedIn = setUserLoggedIn;
        _this.isUserLoggedIn = isUserLoggedIn;

        return _this;
    }

    return app();
});

/**
 * Dispatcher
 *
 * using simply jquery style events for now since i don't
 * want to require backbone.
 *
 * .on('event_name', func(evt, arg1, arg2)
 * .trigger('event_name', [arg1, arg2])
 *
 * note that jquery passes event object to handler and backbone does not.
 *
 *
 */
define('dispatcher', ['jquery'], function($) {
    'use strict';
    return $('<div/>');
    //return _.clone(Backbone.Events);
});

/**
 * Logger - simple for now
 *
 * create a logger in your module like so:
 * var logger = loggerFactory.getInstance(module.id);
 * logger.info(msg)
 * logger.warn(msg, {some: 'thing'})
 *
 * todo: create config options for enabling/disabling per environment
 * todo: create config options for enabling/disabling channels
 *
 */
define('logger', ['module', 'jquery', 'window'], function(module, $, window, undefined) {
    'use strict';

    /** @type {boolean} */
    var enabled = window.console && typeof window.console.log != 'undefined';

    /** @type {Object} */
    var loggers = {};

    /**
     * simple logger object.
     *
     * @param {string} channel
     * @returns {*}
     */
    function logger(channel) {
        var _this = Object.create({});

        /**
         * @param {string} msg
         * @param {*} context
         */
        function log(msg, context) {
            if (!enabled) { return; }
            writeLog('log', msg, context);
        }

        /**
         * @param {string} msg
         * @param {*} context
         */
        function debug(msg, context) {
            if (!enabled) { return; }
            writeLog('debug', msg, context);
        }

        /**
         * @param {string} msg
         * @param {*} context
         */
        function info(msg, context) {
            if (!enabled) { return; }
            writeLog('info', msg, context);
        }

        /**
         * @param {string} msg
         * @param {*} context
         */
        function warn(msg, context) {
            if (!enabled) { return; }
            writeLog('warn', msg, context);
        }

        /**
         * @param {string} msg
         * @param {*} context
         */
        function error(msg, context) {
            if (!enabled) { return; }
            writeLog('error', msg, context);
        }

        /**
         * @param {string} level
         * @param {string} msg
         * @param {*} context
         */
        function writeLog(level, msg, context) {
            if (undefined === window.console[level]) {
                level = 'log';
            }

            var label = '[' + level.toUpperCase() + '][' + channel + ']';
            var type = $.type(msg);

            if (type === 'string' || type === 'number' || type === 'boolean') {
                label += ' ' + msg.toString();
            } else {
                context = context || {};
                context._msg = msg;
            }

            if (context) {
                window.console[level](label, context);
            } else {
                window.console[level](label);
            }
        }

        /**
         * add privileged methods
         */
        _this.log = log;
        _this.debug = debug;
        _this.info = info;
        _this.warn = warn;
        _this.error = error;

        return _this;
    }

    return {
        getInstance: function getInstance(channel) {
            channel = channel || 'app';
            if (!loggers[channel]) {
                loggers[channel] = logger(channel);
            }

            return loggers[channel];
        }
    };
});

/**
 * util
 *
 */
define('util',
    [
        'module',
        'jquery',
        'handlebars',
        'window',
        'document'
    ],

function(module, $, Handlebars, window, document, undefined) {
    'use strict';

    Handlebars.registerHelper('SYSTEM_VERSION', function() { return window.SYSTEM_VERSION || ''; });
    Handlebars.registerHelper('SYSTEM_ENV', function() { return window.SYSTEM_ENV || ''; });
    Handlebars.registerHelper('DEVICE_VIEW', function() { return window.DEVICE_VIEW || ''; });
    Handlebars.registerHelper('ASSETS_BASEURL', function() { return window.ASSETS_BASEURL || ''; });
    Handlebars.registerHelper('SITE_BASEURL', function() { return window.SITE_BASEURL || ''; });
    Handlebars.registerHelper('SITE_DOMAIN', function() { return window.SITE_DOMAIN || ''; });

    /** @type {Object} jQuery Deferred Object */
    var domReadyDeferred = $.Deferred();

    /** @type {Object} jQuery Promise Object */
    var domReadyPromise = domReadyDeferred.promise();

    $(document).ready(function() {
        domReadyDeferred.resolve();
    });

    function util() {
        var _this = Object.create({});

        /**
         * @return {!Object} jQuery Promise Object
         */
        function getDomReadyPromise() {
            return domReadyPromise;
        }

        /**
         * Parses the dom element to ensure sharing functionality
         * is properly attached/updated.  This is needed for
         * dynamically injected facebook, twitter, etc. share/like buttons.
         *
         * @param {Object} domElement
         */
        function parseSharing(domElement) {
            getDomReadyPromise().done(function() {
                //FB.XFBML.parse(element); // handled by addthis
                if (window.addthis && window.addthis.toolbox) {
                    window.addthis.toolbox(domElement);
                }

                if (window.twttr && window.twttr.widgets) {
                    window.twttr.widgets.load(domElement);
                }
            });
        }

        /**
         * add privileged methods
         */
        _this.getDomReadyPromise = getDomReadyPromise;
        _this.parseSharing = parseSharing;

        return _this;
    }

    return util();
});


/**
 * TMZ Members Module
 */
define(
'tmz/members/1.0.3/members',
[ 'jquery', 'jquery.cookie', 'tmz/middleware/1.0.0/client', 'templates/jst', 'logger', 'module' ],
function($, cookie, mw, templates, loggerFactory, module) {
'use strict';

      var logger = loggerFactory.getInstance(module.id);

      /**
       * TMZ - Members
       */
      function members() {
        // Local variables
        var _this = {},
            cookieMemberCMS = 'CMSU',
            cookieMemberRef = 'memberRef',
            cookieMemberGuid = 'MEMBER_GUID',
            cookieMemberTitle = 'MEMBER_TITLE',
            cookieMemberThumb = 'MEMBER_THUMB40',
            endpointMwUser = '/api/v1/users/',
            selectorUserNav = '#nav .user-nav',
            selectorUserLogout = 'aside.my-tmz-box',
            selectorUserThumb = 'li .userThumb',
            signoutUrl = '/members/signout/ajax',
            defaultUserThumb = null;

        /**
         *
         * @returns {boolean}
         */

        var loggedInState = function loggedInState() {
          var $result = true;
          var cmsMemberCookie = cookie(cookieMemberCMS);
          var memberCookie = cookie(cookieMemberRef) || cmsMemberCookie;
          if (!memberCookie) {
            $result = false;
          }
          var memberGuid = cookie(cookieMemberGuid);
          if (!memberGuid && !cmsMemberCookie) {
            $result = false;
          }

          return $result;
        }


        /**
         * @returns {{Object}}
         */
        var renderUserNav = function renderUserNav() {
          var cmsMemberCookie = cookie(cookieMemberCMS);
          var memberCookie = cookie(cookieMemberRef) || cmsMemberCookie;
          if (!memberCookie) {
            return _this;
          }

          var username = memberCookie.split('|')[0].split(':')[1];
          var userTitle = cookie(cookieMemberTitle);
          var userThumb = cookie(cookieMemberThumb);


          // Clean string
          if (typeof userTitle === 'string') {
            userTitle = userTitle.replace(/\+/g, ' ');
          }
          // decode Thumbnail URL
          if (typeof userThumb === 'string') {
            userThumb = decodeURIComponent(userThumb);
          }

          // Fetch the member title if we don't have it
          if (!userTitle || !userThumb) {
            var memberGuid = cookie(cookieMemberGuid);

            // Log user out of site if we don't have a guid and not logged into cms
            if (!memberGuid && !cmsMemberCookie) {
              $.ajax(signoutUrl);
              return _this;
            }

            // Else do nothing if user is logged in via cms
            else if (!memberGuid && cmsMemberCookie) {

              return _this;
            }

            var mwMemberUrl = endpointMwUser + memberGuid + '?fields=all';

            mw.get(mwMemberUrl).done(function (response) {
              cookie(cookieMemberTitle, response.title, {path: '/'});

              var _myThumb = defaultUserThumb;

              if (response.thumbnailUrls !== null) {
                _myThumb = response.thumbnailUrls['40x40'];
                //if on dev replace host
                if (SYSTEM_ENV == "dev") {
                  //_myThumb = _myThumb.replace('media.tmz.com', 'media.tmzdev.com');
                }
              }
              cookie(cookieMemberThumb, _myThumb, {path: '/'});
              renderUserTemplate({
                username: username,
                userTitle: response.title,
                userThumb: _myThumb
              });

            });

          }

          // Render the template
          else {
            renderUserTemplate({
              username: username,
              userTitle: userTitle,
              userThumb: userThumb
            });
          }

          return _this;
        };
        /**
         * Sets the default thumbnail if user doesn't have one.
         * @param url
         */
        var setDefaultUserThumb = function (url) {
          defaultUserThumb = url;
        }

        /**
         * Render User Template
         */
        var renderUserTemplate = function renderUserTemplate(context) {
          var renderedTemplate = templates['header/user-nav'](context);
          $(selectorUserNav).html(renderedTemplate);
        };


        /**
         * @returns {{Object}}
         */
        var setEndpointMwUser = function setEndpointMwUser(val) {
          endpointMwUser = val;
        };


        /**
         * @returns {{Object}}
         */
        var setSelectorUserNav = function setSelectorUserNav(val) {
          selectorUserNav = val;
        };


        /**
         * @returns {{Object}}
         */
        var setSignoutUrl = function setSignoutUrl(val) {
          signoutUrl = val;
        };


        // $(document).ready(function () {

        //   $(document).on('mouseenter', selectorUserThumb, function () {
        //     $(selectorUserLogout).show();
        //   }).on("mouseleave", selectorUserLogout, function () {
        //     console.log('mouseleaving');
        //     $(selectorUserLogout).hide();
        //   });

        // });


        /**
         * Public methods
         */
        return _this = {
          renderUserNav: renderUserNav,
          setSelectorUserNav: setSelectorUserNav,
          setEndpointMwUser: setEndpointMwUser,
          setSignoutUrl: setSignoutUrl,
          loggedInState: loggedInState,
          setDefaultUserThumb: setDefaultUserThumb
        };
      }

      return members();
    }
);

/**
 * WbGeoLocation version 1.0.1
 *
 * requires
 * - jquery >= 1.7.2
 * - jquery.cookie
 *
 * If you're not using a module loader this will be
 * added as a global called "WbGeoLocation".
 *
 */
(function(root, factory) {
    // Montage Require
    if (typeof bootstrap === 'function') {
        bootstrap('WbGeoLocation', factory(root.$));

    // CommonJS/Node
    } else if (typeof exports === "object") {
        module.exports = factory(require('jquery'), require('jquery.cookie'));

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define('wb/geolocation/1.0.1/geolocation', ['jquery', 'jquery.cookie'], factory);

    // <script>
    } else {
        root.WbGeoLocation = factory(root.$);
    }

})(this, function($) {
    var logEnabled = this.console && typeof console.log != 'undefined';
    var log = function(msg) {
        if (logEnabled) {
            var type = $.type(msg);
            if (type === 'string' || type === 'number') {
                console.log('[WbGeoLocation] ' + msg);
            } else {
                console.log(msg);
            }
        }
    };

    var ipLookupUri = '/wb-geolocation';
    var testIpAddress = '';
    var useGoogleClientLocation = false;
    var useGetByCoordinates = true;
    var getByCoordinatesProvider = 'google'; // todo: provide option to supply list of providers
    var googleJsApiUrl = '//www.google.com/jsapi';
    var googleMapsLookupUrl = '//maps.google.com/maps/api/geocode/json?sensor=false&latlng=';
    var cookieName = 'WBGEO';
    var cookieExpires = 365; // 1 year
    var cookieDomain = (document.domain).match(/(.\.)?(\w+\.\w+)$/)[2];

    /**
     * WB - Geo Location Service
     */
    var module = function() {
        var _this = Object.create({});
        var geoLocation;
        var geoLocationDeferred;
        var zip;
        var zipDeferred;

        /**
         * Resets the deferred object so you can do a fresh location lookup.
         *
         * @return {!Object} _this
         */
        var resetGeoLocation = function() {
            log('resetGeoLocation');
            geoLocation = undefined;
            geoLocationDeferred = undefined;
            return _this;
        };

        /**
         * Gets the deferred object managing the geo location lookups
         *
         * @return {!Object} jQuery Deferred Object
         */
        var getGeoLocationDeferred = function() {
            if (geoLocationDeferred) {
                log('getGeoLocationDeferred::already created');
                return geoLocationDeferred;
            }

            log('getGeoLocationDeferred::new');
            geoLocationDeferred = $.Deferred();

            geoLocationDeferred.always(function(newGeoLocation) {
                log('getGeoLocationDeferred::always,geolocation=');
                log(newGeoLocation);
                geoLocation = newGeoLocation;
            });

            return geoLocationDeferred;
        };

        /**
         * Returns a promise for the user's geo location
         *
         * @param {boolean} askForLocation
         *
         * @return {!Object} jQuery Promise Object
         */
        var getGeoLocation = function(askForLocation) {
            if (geoLocationDeferred) {
                log('getGeoLocation::cached promise');
                return geoLocationDeferred.promise();
            }

            var deferred = getGeoLocationDeferred();

            /*
             * if we are asking for the location we won't
             * fallback to another method as that would
             * be sort of against the user's wish.
             */
            if (askForLocation) {
                getGeoLocationFromNavigator().then(
                    // resolved / success
                    function(geoLocation) {
                        deferred.resolve(geoLocation);
                    },

                    // rejected / fail
                    function(error) {
                        deferred.reject();
                    }
                );

                return deferred.promise();
            }

            getGeoLocationFromGoogle().then(
                // resolved / success
                function(geoLocation) {
                    deferred.resolve(geoLocation);
                },
                // rejected / fail
                function(error) {
                    // if we couldn't get it from google, for free,
                    // then we use our own service to get it by IP.
                    getGeoLocationByIp().then(
                        // resolved / success
                        function(geoLocation) {
                            deferred.resolve(geoLocation);
                        },
                        // rejected / fail
                        function(error) {
                            deferred.reject();
                        }
                    );
                }
            );

            return deferred.promise();
        };

        /**
         * Returns a promise for getting the geo location by
         * the user's IP Address.
         *
         * @return {!Object} jQuery Promise Object
         */
        var getGeoLocationByIp = function() {
            var url = testIpAddress ? ipLookupUri + '/' + testIpAddress : ipLookupUri;
            var deferred = $.Deferred();

            log('getGeoLocationByIp::calling api::' + url);

            $.ajax(url, {dataType: 'json'})
                .done(function(data) {
                    if (data.status == 'ok') {
                        log('getGeoLocationByIp::zip=' + data.location.zipCode);
                        if (data.location.zipCode.length > 1) {
                            deferred.resolve(data.location);
                        } else {

                            /*
                             * the last ditch effort to get the mother blanking ZIP code.  If the
                             * provider is maxmind then we know the location is pretty solid.
                             *
                             * If the country is the US then let's attempt to get the zip from
                             * by the coordinates.
                             *
                             */
                            if (data.provider == 'maxmind' && data.location.countryCode == 'US') {
                                log('getGeoLocationByIp::still no zip, provider is maxmind so attempt lookup by coordinates.');
                                getGeoLocationByCoordinates(data.location.latitude, data.location.longitude).then(
                                    // resolved / success
                                    function(geoLocation) {
                                        data.location.zipCode = geoLocation.zipCode;
                                        deferred.resolve(data.location);
                                    },
                                    // rejected / fail
                                    function() {
                                        deferred.reject();
                                    }
                                );
                                return;
                            }

                            deferred.reject();
                        }
                    } else {
                        log('getGeoLocationByIp::failed:ip address not found');
                        deferred.reject();
                    }
                })
                .fail(function(xhr) {
                    log('getGeoLocationByIp::failed:' + xhr.status + ' -> ' + xhr.statusText);
                    deferred.reject();
                });

            return deferred.promise();
        };

        /**
         * Returns a promise for getting the geo location by
         * the coordinates (latitude, longitude)
         *
         * This will only succeed if the zipCode was returned.
         *
         * @param {float} lat
         * @param {float} lng
         *
         * @return {!Object} jQuery Promise Object
         */
        var getGeoLocationByCoordinates = function(lat, lng) {
            var url;
            var deferred = $.Deferred();
            var geoLocation = {latitude: lat, longitude: lng};

            if (!useGetByCoordinates) {
                log('getGeoLocationByCoordinates::disabled');
                deferred.reject();
                return deferred.promise();
            }

            if (getByCoordinatesProvider == 'google') {
                url = googleMapsLookupUrl + lat + ',' + lng;
                $.ajax(url, {dataType: 'json'})
                    .done(function(data) {
                        if (data.results instanceof Array && data.status == 'OK' && data.results.length > 0) {
                            $.each(data.results[0].address_components, function(ix, comp) {
                                if ($.inArray('postal_code', comp.types) >= 0) {
                                    geoLocation.zipCode = comp.long_name;
                                } else if($.inArray('country', comp.types) >= 0) {
                                    geoLocation.countryCode = comp.short_name;
                                    geoLocation.countryName = comp.long_name;
                                } else if($.inArray('locality', comp.types) >= 0) {
                                    geoLocation.cityName = comp.long_name;
                                } else if($.inArray('administrative_area_level_1', comp.types) >= 0) {
                                    geoLocation.regionName = comp.long_name;
                                }
                            });

                            if (geoLocation.countryCode != 'US') {
                                log('getGeoLocationByCoordinates::NON-US, address=' + data.results[0].formatted_address);
                                deferred.resolve(geoLocation);
                                return;
                            }

                            if (geoLocation.countryCode == 'US' && geoLocation.zipCode && geoLocation.zipCode.length > 1) {
                                log('getGeoLocationByCoordinates::address=' + data.results[0].formatted_address);
                                deferred.resolve(geoLocation);
                                return;
                            }
                        }

                        log('getGeoLocationByCoordinates::failed: no zip code');
                        deferred.reject();
                    })
                    .fail(function(xhr) {
                        log('getGeoLocationByCoordinates::failed: ' + xhr.status + ' -> ' + xhr.statusText);
                        deferred.reject();
                    });
            } else if (getByCoordinatesProvider == 'bing') {
                // todo: add bing lookup
                log('getGeoLocationByCoordinates::bing not implemented');
                deferred.reject();
            } else {
                log('getGeoLocationByCoordinates::invalid provider=' + getByCoordinatesProvider);
                deferred.reject();
            }

            return deferred.promise();
        };

        /**
         * Returns a promise for getting the location from the google loader.
         * This may not be very accurate.  Some reports of this being
         * up to 200 miles off, or more.
         *
         * This is disabled by default.
         *
         * @return {!Object} jQuery Promise Object
         */
        var getGeoLocationFromGoogle = function() {
            var deferred = $.Deferred();
            var latitude;
            var longitude;

            if (!useGoogleClientLocation) {
                log('getGeoLocationFromGoogle::ClientLocation check disabled');
                deferred.reject();
                return deferred.promise();
            }

            var handleClientLocation = function() {
                if (!window['google'] || !window['google']['loader']) {
                    log('getGeoLocationFromGoogle::no google loader');
                    deferred.reject();
                    return;
                }

                if (!google.loader.ClientLocation) {
                    log('getGeoLocationFromGoogle::no ClientLocation');
                    deferred.reject();
                    return;
                }

                latitude = google.loader.ClientLocation.latitude;
                longitude = google.loader.ClientLocation.longitude;
                log('getGeoLocationFromGoogle::latitude=' + latitude + ',longitude=' + longitude);

                getGeoLocationByCoordinates(latitude, longitude).then(
                    // resolved / success
                    function(geoLocation) {
                        deferred.resolve(geoLocation);
                    },
                    // rejected / fail
                    function() {
                        deferred.reject();
                    }
                );
            };

            if (!window['google'] || !window['google']['loader']) {
                $.ajax(googleJsApiUrl, {dataType: 'script', cache: true})
                    .done(function() {
                        handleClientLocation();
                    })
                    .fail(function(xhr) {
                        log('getGeoLocationFromGoogle::failed: ' + xhr.status + ' -> ' + xhr.statusText);
                        deferred.reject();
                    });
            } else {
                handleClientLocation();
            }

            return deferred.promise();
        };

        /**
         * Returns a promise for getting the location from the html5 geolocation
         * service in the browser.
         *
         * @return {!Object} jQuery Promise Object
         */
        var getGeoLocationFromNavigator = function() {
            var deferred = $.Deferred();
            var timer;

            if (!navigator.geolocation) {
                log('getGeoLocationFromNavigator::geolocation not supported in browser.');
                deferred.reject();
                return deferred.promise();
            }

            log('getGeoLocationFromNavigator::calling getCurrentPosition()');
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    if (pos && pos.coords) {
                        log('getGeoLocationFromNavigator::pos=');
                        log(pos);

                        getGeoLocationByCoordinates(pos.coords.latitude, pos.coords.longitude).then(
                            // resolved / success
                            function(geoLocation) {
                                deferred.resolve(geoLocation);
                                clearTimeout(timer);
                            },
                            // rejected / fail
                            function() {
                                deferred.reject();
                                clearTimeout(timer);
                            }
                        );
                    } else {
                        log('getGeoLocationFromNavigator::pos is invalid');
                        deferred.reject({code:'POSITION_UNAVAILABLE'});
                        clearTimeout(timer);
                    }
                },
                function(error) {
                    log('getGeoLocationFromNavigator::error=');
                    log(error);
                    deferred.reject(error);
                    clearTimeout(timer);
                },
                {timeout: 2000}
            );

            /*
             * if the user selects "not now" when asking to share location no error will
             * be generated.  so we set a timer and automatically resolve the deferred with
             * an error for this condition.
             */
            timer = setTimeout(function(){
                    log('getGeoLocationFromNavigator::user selected "not now" or dismissed dialog');
                    deferred.reject({code:'PERMISSION_DENIED'});
                }, 10000);

            return deferred.promise();
        };

        /**
         * Resets the deferred object so you can do a fresh zip lookup.
         *
         * @return {!Object} _this
         */
        var resetZip = function() {
            log('resetZip');
            zip = undefined;
            zipDeferred = undefined;
            return _this;
        };

        /**
         * Gets the deferred object managing the zip lookups
         *
         * @return {!Object} jQuery Deferred Object
         */
        var getZipDeferred = function() {
            if (zipDeferred) {
                log('getZipDeferred::already created');
                return zipDeferred;
            }

            log('getZipDeferred::new');
            zipDeferred = $.Deferred();

            zipDeferred.always(function(newZip) {
                log('getZipDeferred::always,zip=' + newZip);
                zip = newZip;
            });

            return zipDeferred;
        };

        /**
         * Returns a promise for the user's zip
         *
         * @param {boolean} askForLocation
         *
         * @return {!Object} jQuery Promise Object
         */
        var getZip = function(askForLocation) {
            var deferred;
            var zip;
            var geoLocationPromise;

            if (zipDeferred) {
                log('getZip::cached promise');
                return zipDeferred.promise();
            }

            deferred = getZipDeferred();

            zip = getZipCookie();
            if (zip && zip.length > 0) {
                // for some users (international or otherwise) we just can't
                // get their zip code.  this prevents a continuous check for
                // their location.  we basically cache the failure as well.
                if (zip == '-1') {
                    log('getZip::reject with cookie=' + zip);
                    deferred.reject();
                } else {
                    log('getZip::resolve with cookie=' + zip);
                    deferred.resolve(zip);
                }
                return deferred.promise();
            }

            geoLocationPromise = getGeoLocation(askForLocation);
            geoLocationPromise.then(
                // resolved / success
                function(geoLocation) {
                    if (geoLocation.zipCode) {
                        log('getZip::resolve from getGeoLocation=' + geoLocation.zipCode);
                        setZipCookie(geoLocation.zipCode);
                        deferred.resolve(geoLocation.zipCode);
                    } else {
                        log('getZip::reject from getGeoLocation, no zipCode property');
                        setZipCookie('-1');
                        deferred.reject();
                    }
                },
                // rejected / fail
                function() {
                    log('getZip::reject from getGeoLocation');
                    setZipCookie('-1');
                    deferred.reject();
                }
            );

            return deferred.promise();
        };

        /**
         * Gets the zip from a cookie.
         *
         * @return {string}
         */
        var getZipCookie = function() {
            var zip = $.cookie(cookieName + 'ZIP') || '';
            return zip.replace(/[^a-zA-Z0-9\s_-]/g, '');
        };

        /**
         * Sets the zip to a cookie.
         *
         * @param {string} zip
         */
        var setZipCookie = function(zip) {
            log('setZipCookie::' + zip);
            // delete the subdomain cookie, todo: remove in next version
            $.cookie(cookieName + 'ZIP', null, {path: '/', expires: -1});
            $.cookie(cookieName + 'ZIP', zip, {path: '/', expires: cookieExpires, domain: cookieDomain});
        };

        /**
         * Resets the local zip and the cookie.  Use this when the
         * user has changed their zip somewhere.
         *
         * Note, this doesn't modify the geo location data.
         *
         * @param {string} newZip
         *
         * @return {!Object} _this
         */
        var setZip = function(newZip) {
            log('setZip::' + newZip);
            setZipCookie(newZip);

            if (zip == newZip) {
                log('setZip::zip unchanged');
                return _this;
            }

            resetZip();
            if (newZip) {
                if (newZip == '-1') {
                    log('setZip::reject with newZip=' + newZip);
                    getZipDeferred().reject();
                } else {
                    log('setZip::resolve with newZip=' + newZip);
                    getZipDeferred().resolve(newZip);
                }
            }

            return _this;
        };

        /**
         * Sets the test ip address so if the ip lookup service
         * is used, this is the IP it will use.
         *
         * set to nothing to disable it.
         *
         * @param {string} ip
         *
         * @return {!Object} _this
         */
        var setTestIpAddress = function(ip) {
            log('setTestIpAddress::' + ip);
            testIpAddress = ip;
            return _this;
        };

        /**
         * Enables/disables the use of google's client
         * location from their js api.
         *
         * @param {boolean} enabled
         *
         * @return {!Object} _this
         */
        var enableGoogleClientLocation = function(enabled) {
            log('enableGoogleClientLocation::' + enabled);
            useGoogleClientLocation = enabled ? true : false;
            return _this;
        };

        /**
         * Enables/disables the get by coordinates feature.
         *
         * @param {boolean} enabled
         *
         * @return {!Object} _this
         */
        var enableGetByCoordinates = function(enabled) {
            log('enableGetByCoordinates::' + enabled);
            useGetByCoordinates = enabled ? true : false;
            return _this;
        };

        /**
         * add privileged methods
         */
        _this.resetGeoLocation = resetGeoLocation;
        _this.getGeoLocation = getGeoLocation;
        _this.resetZip = resetZip;
        _this.getZip = getZip;
        _this.getZipCookie = getZipCookie;
        _this.setZip = setZip;
        _this.setTestIpAddress = setTestIpAddress;
        _this.enableGoogleClientLocation = enableGoogleClientLocation;
        _this.enableGetByCoordinates = enableGetByCoordinates;

        return _this;
    };

    return module();

});

/**
 * WbShowTimes version 1.0.1
 *
 * requires
 * - jquery >= 1.7.2
 *
 * If you're not using a module loader this will be
 * added as a global called "WbShowTimes".
 *
 */
(function(root, factory) {
    // Montage Require
    if (typeof bootstrap === 'function') {
        bootstrap('WbShowTimes', factory(root.$));

    // CommonJS/Node
    } else if (typeof exports === "object") {
        module.exports = factory(require('jquery'));

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define('wb/showtimes/1.0.1/showtimes', ['jquery'], factory);

    // <script>
    } else {
        root.WbShowTimes = factory(root.$);
    }

})(this, function($) {
    var theWindow = this;
    var logEnabled = this.console && typeof console.log != 'undefined';
    var log = function(msg) {
        if (logEnabled) {
            var type = $.type(msg);
            if (type === 'string' || type === 'number') {
                console.log('[WbShowTimes] ' + msg);
            } else {
                console.log(msg);
            }
        }
    };

    /**
     * @type {{siteName: string, serviceUrl: string}}
     */
    var defaults = {siteName: '', serviceUrl: 'http://showtimes.telepicturestv.com/%SITE_NAME%/lookup/zip/'};

    /**
     * WB - Show Times Module
     *
     * @param {Object} options
     */
    return function(options) {
        var _this = Object.create({});
        var settings = $.extend({}, defaults, options);
        var serviceUrl = settings.serviceUrl.replace('%SITE_NAME%', settings.siteName);
        var callbackHandler = 'wbShowTimes_' + settings.siteName + '_';
        var promises = {};

        log('serviceUrl=' + serviceUrl);
        log('callbackHandler=' + callbackHandler);

        /**
         * Returns a promise from the API call to the show times service.
         * This call is cached by zip code so multiple calls in a single
         * page will not call the API again.
         *
         * @param {string} zip
         * @return {!Object} jQuery Promise Object
         */
        var getByUSZip = function(zip) {
            zip = zip.replace(/\D/g, '');
            var cacheKey = 'byUSZip_' + zip;
            var deferred;

            if (!promises[cacheKey] && zip.length != 5) {
                log('getByUSZip::not a US Zip=' + zip);
                deferred = $.Deferred();
                deferred.reject();
                promises[cacheKey] = deferred.promise();
                return promises[cacheKey];
            }

            if (!promises[cacheKey]) {
                log('getByUSZip::calling api::' + serviceUrl + zip);
                deferred = $.ajax(serviceUrl + zip, {
                        dataType: 'jsonp',
                        jsonpCallback: callbackHandler + 'onGetByUSZip',
                        cache: true
                    });

                promises[cacheKey] = deferred.promise();
            } else {
                log('getByUSZip::cached promise::' + zip);
            }

            return promises[cacheKey];
        };

        /**
         * Receives data from the jsonp call.  This isn't actually used yet but
         * is needed to prevent an invalid function call when the jsonp loads.
         *
         * @param {*} data
         */
        var onGetByUSZip = function(data) {
            // do nothing for now
            log('onGetByUSZip::called');
        };

        /**
         * add privileged methods
         */
        _this.getByUSZip = getByUSZip;

        /**
         * attach a global callback handler to the window.  this is done so the
         * url to the jsonp service doesn't constantly change and we can properly
         * cache the request.
         */
        theWindow[callbackHandler + 'onGetByUSZip'] = onGetByUSZip;

        return _this;
    };

});

