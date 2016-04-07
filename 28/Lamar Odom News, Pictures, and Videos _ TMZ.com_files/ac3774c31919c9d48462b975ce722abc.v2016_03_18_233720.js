/** https://github.com/csnover/js-iso8601 */(function(n,f){var u=n.parse,c=[1,4,5,6,7,10,11];n.parse=function(t){var i,o,a=0;if(o=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(t)){for(var v=0,r;r=c[v];++v)o[r]=+o[r]||0;o[2]=(+o[2]||1)-1,o[3]=+o[3]||1,o[8]!=="Z"&&o[9]!==f&&(a=o[10]*60+o[11],o[9]==="+"&&(a=0-a)),i=n.UTC(o[1],o[2],o[3],o[4],o[5]+a,o[6],o[7])}else i=u?u(t):NaN;return i}})(Date);


//CRZ - Dec 2011 - Defining Framework for Tmz Classes. 
//               - all classes require jQuery 1.6.4+ and ECMAScript 1.3. (not ECMAScript 1.5, to be ie7/8 compat)

(function($) {
  //Ex. TmzClass.create('LatinAlphabet', 'Alphabet');
  window.TmzClass = {
    create: function(className) {
      var args = Array.prototype.slice.call(arguments, 0); 
      var options, class_definition, superclass, superclassName;
      var f;
      
      className = args.shift();
      
      if(typeof args[0] === "string") {
        superclassName = args.shift();
      }
      else if(typeof args[0] === "function") {
        throw("tmzDefineClass: superclass name must be string, not the function itself");
      } else {
        if(typeof TmzObject === "function") {
          superclassName = 'TmzObject';
        } else {
          superclassName = 'Object';
        }
      }

      if($.type(window[superclassName]) === "null" || $.type(window[superclassName]) === "undefined") {
        throw("TmzClass.create cannot find parent class '" + superclassName + "'");
      }

      superclass = window[superclassName];

      class_definition = args.shift() || {};

      if(!class_definition.hasOwnProperty('constructor')) {
        class_definition.constructor = function() { superclass.apply(this, arguments); };
      }

      //CRZ - use eval here so chrome can pick up the name properly.
      //CRZ### - is including class_definition here not going to waste memory? class_definition is copied below, and also kept in memory as a separate copy?
      eval(className + ' = function() { class_definition.constructor.apply(this, arguments); }');
      
      f = function() {};
      f.prototype = superclass.prototype;
      window[className].prototype = new f();
      
      $.extend(window[className].prototype, {
        "className": className, 
        "class": window[className], 
        "superclass": superclass,
        "superclassName": superclassName
      }, class_definition);

      return window[className];
    },

    abstractMethod: function(msg) {
      throw('Abstract method not overriden by subclass - ' + (msg || ""));
    }
  };
})(jQuery);

(function($) {
  TmzClass.create('TmzObject', 'Object', {
    //CRZ- falls thru to Object. override if desired.
    constructor: function(options) {
      Object.apply(this, []);

      this.$options = options || {};
      this.$___listeners = {};
    },

    options: function() {
      return this.$options;
    },

    toString: function() {
      return "[ " + this.className + " ]";
    },

    /* the same callback cannot be added twice */
    addListener: function(listenerName, callback) {
      if(!this.$___listeners[listenerName]) {
        this.$___listeners[listenerName] = [];
      }

      if($.inArray(callback, this.$___listeners[listenerName]) === -1) {
        this.$___listeners[listenerName].push(callback);
      }
    },
    removeListener: function(listenerName, callback) {
      if(!this.$___listeners[listenerName]) {
        return;
      } else {
        var index;
        if((index = $.inArray(callback, this.$___listeners[listenerName])) !== -1) {
          this.$___listeners[listenerName].splice(index, 1);
        }
      }
    },
    fireListener: function(listenerName) {
      var t = this;
      var args = Array.prototype.slice.call(arguments, 1);
      if(this.$___listeners[listenerName]) {
        $.each(this.$___listeners[listenerName], function(i, callback) {
          if(callback) { //### PNS: Callbacks should never be undefined, but somehow they can be. Need to investigate further
            callback.apply(t, args);
          }
        });
      }
    },

    isInstanceOf: function(klass) {
      if($.type(klass) === 'string') {
        klass = window[klass];
      }
      var parent_or_self = this['class'];
      while(klass !== null) {
        if(klass === parent_or_self) { 
          return true;
        }

        parent_or_self = parent_or_self.superclass;
      } 

      return false;
    },

    log: function() {
      if(window.console && window.console.log) {
        console.log([this.className + ":"].concat(Array.prototype.slice.call(arguments)));
      }
    },

    error: function(msg) {
      throw(this.className + ": " + msg);
    },

    //CRZ: one day, this can send msgs back to us to log things we need to know of.
    report: function(msg) {
      t.log(this.className + ": " + msg);
    },

    destroy: function() {
      //CRZ: ### how do i do this? i cannot 'delete this' in IE
    },

    //CRZ: put in util class
    __randString: function() {
      return (Math.random() * 10000000000).toString().split('.')[0];
    },
    __keyCount: function(obj) {
      var count = 0;
      var k;
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          count++;
        }
      }
      return count;
    },
    ___any: function(array, cond) {
      for(var i=0; i<array.length; i++) {
        if(cond.call(this, array[i])) {
          return true;
        }
      }

      return false;
    },

    ___all: function(array, cond) {
      for(var i=0; i<array.length; i++) {
        if(!cond.call(this, array[i])) {
          return false;
        }
      }

      return true;
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzModel', {
    constructor: function(attributes, options) {
      this.$attributes = attributes || {};

      TmzObject.apply(this, [options]);
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzCFBackedModel', 'TmzModel', {
    constructor: function(attributes, options) {
      if(attributes.activeDate) {
        attributes.activeDate = new Date(Date.parse(attributes.activeDate));
      }

      TmzModel.apply(this, [attributes, options]);
    },

    fromGSA: function() {
      return !this.$attributes.CrawlDate;
    },

    title: function() {
      return this.$attributes.title;
    },
    
    description: function() {
      return this.$attributes.description;
    },

    thumbnailUrl: function() {
      return this.$attributes.thumbnailUrl;
    },

    //CRZ: expects ISO8601 format: ex. 2011-06-17T14:45:00-04:00
    activeDate: function() {
      return this.$attributes.activeDate;
    },

    url: function() {
      return this.$attributes.RecordLink;
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGalleryModel', 'TmzCFBackedModel', {
    constructor: function(attributes, options) {
      var t = this;

      if(attributes.images) {
        attributes.images = $.map(attributes.images, function(imageJson, i) {
          return new TmzGalleryImageModel(imageJson, {gallery: t});
        });
      }

      if(attributes.nextGallery) {
        attributes.nextGallery = new TmzGalleryModel(attributes.nextGallery);
      }

      if(attributes.prevGallery) {
        attributes.prevGallery = new TmzGalleryModel(attributes.prevGallery);
      }

      if(attributes.relatedGalleries) {
        var relatedGalleries = attributes.relatedGalleries;
        attributes.relatedGalleries = [];
        $.each(relatedGalleries, function(index, value) {
          attributes.relatedGalleries.push(new TmzGalleryModel(value));
        });
      }

      if(attributes.recentGalleries) {
        var recentGalleries = attributes.recentGalleries;
        attributes.recentGalleries = [];
        $.each(recentGalleries, function(index, value) {
          attributes.recentGalleries.push(new TmzGalleryModel(value));
        });
      }

      TmzCFBackedModel.apply(this, [attributes, options]);
    },

    adPosition3: function() {
      return this.$attributes.adPosition3;
    },

    adPosition5: function() {
      return this.$attributes.adPosition5;
    },

    nextGallery: function() {
      return this.$attributes.nextGallery;
    },

    prevGallery: function() {
      return this.$attributes.prevGallery;
    },

    permalink: function() {
      if(this.$attributes.RecordLink) {
        return this.$attributes.RecordLink;
      } else if(this.$attributes.URL) {
        return this.$attributes.URL;
      } else {
        return "/photos/" + this.slug();
      }
    },

    slug: function() {
      return this.$attributes.slug;
    },

    relatedGalleries: function() {
      return this.$attributes.relatedGalleries;
    },

    recentGalleries: function() {
      return this.$attributes.recentGalleries;
    },

    thumbnailOverrideSize: function(size) {
      if(!this.$attributes['thumbnail-override']) { return null; }
      var retJson;
      $.each(this.$attributes['thumbnail-override'], function(i, json) {
        if(json.value === size) {
          retJson = json;
        }
      });
      return retJson;
    },

    collections: function() {
      return this.$attributes.collections;
    },

    images: function() {
      return this.$attributes.images;
    },


    //CRZ: ### ugh. NEED COLLECTION OBJECT
    image: function(id) {
      for(i=0; i<this.$attributes.images.length; i++) {
        if(this.$attributes.images[i].id() === id) {
          return this.$attributes.images[i];
        }
      }

      return null;
    },

    photos: function() {
      this.images.apply(this, arguments);
    },

    thumbnailUrl: function() {
      if(this.$attributes.thumbnailUrl) {
        return this.$attributes.thumbnailUrl.replace('_thumb.', '_full.');
      } else {
        return "";
      }
    },

    credit: function() {
      return this.$attributes['photo-credit-text-current'];
    },

    hasInterstitials: function() {
      return !this.disableInterstitials();
    },

    disableInterstitials: function() {
      return (this.$attributes.disableInterstitials === true);
    },

    safeGallery: function () {
      return (this.$attributes.safeGallery === true);
    },

    //ads appear every interstitialFrequency() click, so there is interstitialFrequency() - 1 images between ads
    interstitialFrequency: function() {
      return 5;
    },

    //right rail ad appear every rightrailFrequency() click
    rightrailFrequency: function() {
      return 3;
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzGalleryImageModel', 'TmzCFBackedModel', {
    constructor: function(attributes, options) {
      this.$gallery = null;

      if(options.gallery) {
        this.$gallery = options.gallery;
      }

      TmzCFBackedModel.apply(this, [attributes, options]);
    },

    permalink: function() {
      if(this.gallery()) {
        return (this.gallery().permalink().replace(/\/$/, '') + "/images/" + this.slug() + "/");
      } else {
        return null;
      }
    },

    slug: function() {
      return this.$attributes.Slug;
    },

    setGallery: function(g) {
      this.$gallery = g;
    },

    gallery: function() {
      return this.$gallery;
    },

    url: function(value, searchForWatermark) {
      var size = this.size(value, searchForWatermark);
      return (size) ? size.url : null;
    },

    "symbolforce-id": function() {
      return this.$attributes['symbolforce-id'];
    },

    size: function(value, searchForWatermark) {
      var retJson;
      if(typeof searchForWatermark === "undefined") {searchForWatermark = true;}

      if(searchForWatermark) {
        retJson = this.size(value + "-watermark", false);
      }

      if(!retJson) {
        $.each(this.$attributes['thumbnails-json'], function(i, json) {
          if(json.value === value) {
            retJson = json;
          }
        });
      }

      return retJson;
    },

    title: function() {
      return this.$attributes.title;
    },

    caption: function() {
      return this.$attributes.caption || this.$gallery.description();
    },

    hasZoomview: function() {
      return false;
    },

    zoomspots: function() {
      return [];
    },

    pollCode: function() {
      return this.$attributes['poll-code'];
    },

    hasPoll: function() {
      return (this.pollCode() !== null);
    },
    
    credit: function() {
      return this.$gallery.credit() || this.$attributes['photo-credit-text-current'] || "";
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzVideoModel', 'TmzCFBackedModel', {
    constructor: function(attributes) {
      if($.type(attributes.duration) === 'string') {
        attributes.duration = parseInt(attributes.duration, 10);
      }
      
      TmzCFBackedModel.apply(this, arguments);
    },
   
    thumbnailUrl: function(kalturaOptions) {
      kalturaOptions = kalturaOptions || {};

      if(!this.fromGSA() && this.$attributes.thumbnailUrl.indexOf('cdnbakmi.kaltura.com') === -1) {
        return this.$attributes.thumbnailUrl.replace('_thumb.', '_still.');
      } else {
        var urlSuffix = "";
        $.each(kalturaOptions, function(k, v) {
          urlSuffix += '/' + k + '/' + v;
        });
        
        return this.$attributes.thumbnailUrl + urlSuffix;
      }
    },
    
    kalturaId: function() {
      if(this.$attributes.kalturaId) {
        return this.$attributes.kalturaId;
      } else {
        if(this.$attributes.DisplayURL) {
          var match = this.$attributes.DisplayURL.match(/\/([0-9a-z]{1}[_\-][0-9a-z]{8})/);
          if(match) {
            return match[1].replace('-', '_'); //CRZ: cf uses -'s, kaltura uses _'s
          }
        }
      } 

      return null;
    },

    slug: function() {
      if(this.$attributes.Slug) {
        return this.$attributes.Slug;
      } else {
        var kid = this.kalturaId(); 
        if(kid) {
          return kid.replace('_', '-');
        } else {
          return '';
        }
      }
    },

    dsMediaKey: function() {
      if(!this.kalturaId() && this.$attributes.DisplayURL) {
        var match = this.$attributes.DisplayURL.match(/(mediaKey=)?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/);
        if (match) {
          return match[2];
        }
      }

      return null;
    },

    brightcoveId: function() {
      if(!this.kalturaId() && this.$attributes.DisplayURL) {
        var match = this.$attributes.DisplayURL.match(/(mediaKey=|\/)?([0-9]+)/);
        if (match) {
          return match[2];
        }
      }
      
      return null;
    },

    videoUrl: function() {
      return this.$attributes.videoUrl;
    },
    
    duration: function() {
      return this.$attributes.duration;
    },    
    
    durationSeconds: function() {
      return this.duration() % 60;
    },
    
    durationMinutes: function() {
      return Math.floor(this.duration()/60);
    },
    
    views: function() {
      return this.$attributes.views;
    },
    
    plays: function() {
      return this.$attributes.plays;
    },
    publishDate: function() {
      return this.$attributes.publishDate;
    },
    url: function() {
      //CRZ: ### ignore url / RecordLink attribute for now
      return "http://" + window.location.hostname + "/videos/" + this.kalturaId() + "/";
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGalleryCollectionModel', 'TmzCFBackedModel', {
    constructor: function(attributes) {
      TmzCFBackedModel.apply(this, arguments);
    },

    slug: function() {
      return this.$attributes.slug;
    }
  });
})(jQuery);

// TODO
// - use private where() so setWhere() always returns where(), instead of changing it
// - solve margin collapsing problems

(function($) {
  TmzClass.create('TmzView', 'TmzObject', {
    constructor: function(options) {
      $.extend({needsUniqueId: false}, options || {});
      TmzObject.apply(this, [options]);
      this.$___drawn = false;
      this.$___where = null;
      this.$___originalWhere = null;

      if(this.$options.where) {
        this.setWhere(this.$options.where);
      }

      if(this.where() && this.$options.draw === true) {
        this.draw();
      }
    },

    hasWhere: function() {
      return this.where().size() > 0;
    },

    setWhere: function(where) {
      this.$___where = where;
    },

    where: function() {
      return $(this.$___where);
    },

    wasDrawn: function() {
      return this.$___drawn;
    },

    //CRZ - define drawFunction on the view object, then call draw()
    draw: function(options) {
      options = $.extend({showOnlyAfterDrawn: true, secludedDiv: true}, options || {});

      if(this.wasDrawn()) {
        throw(this.className + ': already called draw(), try ___redraw()');
      }

      if(options.where) {
        this.setWhere(options.where);
      }

      if(this.where() === null || this.where().length === 0) {  
        if($.type(this.$___where) === 'string') {
          this.error('You have set where as a selector, but that selector does not match any elements');
        } else {
          this.error('Cannot draw() without first setting a valid where');
        }
      }

      this.fireListener('beforeDraw');

      //CRZ: this process is a bit weird, we change where where() is. also, where() must be only one element.
      if(options.secludedDiv) {
        this.$___originalWhere = this.$___where;
        this.setWhere($('<div></div>').appendTo(this.where().slice(0,1)));
      }

      if(options.showOnlyAfterDrawn) {
        this.where().css('visibility', 'hidden');
      }
      this.where().addClass(this.cssClassNames()).data('tmz-this', this);

      if(this.$options.needsUniqueId) {
        this.where().attr('id', this.___toDash(this.className) + Math.random().toString().substring(2,20));
      }

      if(this.___hardcodedWidth()) {
        this.where().width(this.___hardcodedWidth());
      }

      if(this.___hardcodedHeight()) {
        this.where().height(this.___hardcodedHeight());
      }

      if(this.drawFunction) {
        this.drawFunction.call(this);
      }

      if(options.showOnlyAfterDrawn) {
        this.where().css('visibility', '');
      }

      this.$___drawn = true;

      this.fireListener('afterDraw');
    },

    ensureDrawn: function(options) {
      if(!this.wasDrawn()) {
        this.draw(options || {});
      }
    },

    ___redraw: function() {
      if(this.wasDrawn()) {
        this.fireListener('beforeRedraw');
        this.$___drawn = false;
        this.where().empty();
        this.draw({secludedDiv: false});
        this.fireListener('afterRedraw');
      } else {
        throw(this.className + ': cannot redraw(), was never draw()n');
      }
    },

    show: function() {
      this.where().show();
    },

    hide: function() {
      this.where().hide();
    },

    destroy: function() {
      if(this.wasDrawn()) {
        this.where().remove();
      }
    },

    width: function() {
      if(this.___hardcodedWidth()) {
        return this.___hardcodedWidth();
      } else if(this.wasDrawn()) {
        return this.where().outerWidth(true);
      } else {
        throw(this.className + ": Cant get width before element is drawn");
      }
    },

    height: function() {
      if(this.___hardcodedHeight()) {
        return this.___hardcodedHeight();
      } else if(this.wasDrawn()) {
        return this.where().outerHeight(true);
      } else {
        throw(this.className + ": Cant get height before element is drawn");
      }
    },

    scoped: function(selector) {
      return $(selector, this.where());
    },

    cssClassNames: function() {
      return this.___toDash(this.className);
    },

    //CRZ - dimensions can either be derived from html or hardcoded by passing options
    ___hardcodedWidth: function() {
      return this.$options.width;
    },

    ___hardcodedHeight: function() {
      return this.$options.height;
    },

    //Move this to a utility module
    ___toDash: function() {
      return this.className.replace(/([A-Z])/g, function($1) {return "-"+$1.toLowerCase();}).substring(1).replace(/-view$/, "");
    }
  });
})(jQuery);

/* - depends on iframe callback on parent to resize itself
   - cannot load two lightboxes at once, because lightboxReadyCallback is a single callback not pub/sub
   - writes into the iframe the variable containingLightbox referencing the TmzLightbox object that contains it.
*/

(function($) {
 TmzClass.create('TmzLightbox', 'TmzView', {
    DEFAULT_INTERVAL: 250,

    constructor: function(url, options) {
      var t = this;
      t.$url = url;
      t.$options = $.extend({
        where: $('<div></div>').appendTo('body'),
        initialHeight: 1000,
        fixedHeight: null,
        resizeContinuously: true,
        resizeInterval: t.DEFAULT_INTERVAL,
        outsideClickCloses: true,
        offsetFromWindowTop: 20
      }, (options || {}));
      t.$trap = null;
      t.$resizeIntervalID = null;

      if(t.$options.fixedHeight) {
        t.$options.initialHeight = t.$options.fixedHeight;
        t.$options.resizeContinuously = false;
      }

      t.$currentLightboxHeight = null;

      t.$recenterFrameCallback = function() {
        t.___recenterFrame();
      };

      TmzView.apply(this, [this.$options]);

      t.draw();
    },

    show: function() {
      var t = this;
      var trapHeight = $(document).height();

      t.$trap = $('<div class="tmz-lightbox-modal-trap"></div>').
                     css('height', trapHeight).
                     appendTo('body').
                     click(function(e) {
                       e.preventDefault(); 
                       if(t.$options.outsideClickCloses) {
                         t.destroy();
                       }});
      t.___recenterFrame();
      t.where().show();
    },

    hide: function() {
      this.where().hide();
      this.$trap.remove();
      this.$trap = null;
    },

    destroy: function() {
      this.hide();
      
      //PNS: I'm not sure if we'll get memory leaks without unbinding events we attach to the iframe
      //     so better safe than sorry.
      $(this.___lightboxDocument()).unbind('keyup.tmzLightbox');
      $(document).unbind('keyup.tmzLightbox');

      this.where().remove();
      
      if(this.$resizeIntervalID) {
        clearInterval(this.$resizeIntervalID);
      }
    },

    drawFunction: function() {
      var t = this;

      var keyupEventHandler = $.proxy(t.___keyupHandler, t);
      $(document).bind('keyup.tmzLightbox', keyupEventHandler);
      
      window.lightboxReadyCallback = function() {
        $(t.___lightboxDocument()).bind('keyup.tmzLightbox', keyupEventHandler);
        t.___resizeIframeHeight();
        if(t.$options.resizeContinuously) {
          t.$resizeIntervalID = setInterval(function() {
            t.___resizeIframeHeight();
          }, t.$options.resizeInterval);
        }
      };

      t.where().append(
        '<div class="close"></div><div class="frame shadow"><iframe scrolling="no" allowfullscreen src="' + this.$url + '"></iframe></div>'
      );

      this.___setIframeHeight(t.$options.initialHeight);
      t.where().css('top', $(window).scrollTop() + t.$options.offsetFromWindowTop);

      t.scoped('> .close').click(function(e) {e.preventDefault(); t.destroy();});

      //CRZ: i believe as long as the iframe was given a src attr before this line, this is not a race condition. 
      //     containingLightbox will remain in the iframe and not be overwritten
      t.scoped('> .frame > iframe').get(0).contentWindow.containingLightbox = t;
      t.scoped('> .frame > iframe').get(0).contentWindow.containingWindow = window;
      $(window).resize(t.$recenterFrameCallback);
    },

    ___keyupHandler: function(e) {
      var t = this;
      if (e.which === 27) {
        e.preventDefault();
        t.destroy();
      }
    },

    ___recenterFrame: function() {
      var offsetLeft = Math.max(($(window).width() - this.where().width())/2, 0);
      this.where().css('left', offsetLeft);
    },

    ___lightboxRoot: function() {
      var root = this.scoped('> .frame > iframe').contents().find('html');
      // $.browser is depricated
      if($.browser && $.browser.msie) {
        return root.parent();
      }
      return root;
    },

    ___lightboxDocument: function() {
      var iframe = this.scoped('> .frame > iframe').get(0);
      return iframe.contentWindow.document;
    },

    ___resizeIframeHeight: function() {
      var newLightboxHeight;
      if(this.$options.fixedHeight) {
        newLightboxHeight = this.$options.fixedHeight;
      } else {
        newLightboxHeight = this.___lightboxRoot().height();
      }
      this.___setIframeHeight(newLightboxHeight);
    },

    ___setIframeHeight: function(height) {
      if(this.$currentLightboxHeight !== height) {
        this.scoped('> .frame').height(height);
        this.scoped('> .frame > iframe').attr('height', height);
        this.$currentLightboxHeight = height;
      }
    }
  });
})(jQuery);

function allowfullscreen() {
    var element = document.body; // Make the body go full screen.

    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }

    return false;
}

//parent class for all thumbnails representing an underlying model
(function($) {
  TmzClass.create('TmzThumbView', 'TmzView', {
    constructor: function(model, options) {
      this.$model = model;
      TmzView.apply(this, [options]);
    },

    model: function() {
      return this.$model;
    }
  });
})(jQuery);

//CRZ: next/prev buttons cannot be <a/>'s because omniture interferes with animation

(function($) {
  TmzGalleryView = TmzClass.create('TmzGalleryView', 'TmzView', {
    DEBUG_LIMIT_TRAFFIC: false, //CRZ: very hard to debug things with ad/share traffic and errors. use this switch.
    MANIPULATE_HISTORY: true,

    constructor: function(model, options) {
      var t = this;
      t.$model = model;
      options = $.extend({startingSlug: null, getIndexFromAnchor: true, chainGalleries: true, incept: false}, (options || {}));
      TmzView.apply(this, [options]);

      t.init();
    },

    init: function() {
      var t = this;
      var index;

      t.$interstitialAd = null;
      t.$rightrailAd = null;
      t.$galleryTwitter = null;
      t.$galleryFbLike = null;
      t.$currentView = 'single'; //or 'grid'
      t.$index = 0;
      t.$navigationCount = 1; //one for initial page
      t.$showingAd = false;
      t.$preloadedImages = [];
      t.$preloadWindowSize = 3;
      t.$gridLayout = null;
      t.$thumbViews = null;
      t.$currentImageView = null;
      t.$initialLoad = (typeof t.$initialLoad === "boolean") ? t.$initialLoad : true; //CRZ: initialLoad doesnt reset, for chaining

      //CRZ: if we are looking for anchors, try to find one
      if(t.$options.getIndexFromAnchor) {
        index = t.___getIndexFromAnchor();
      }

      //CRZ: if we're not looking for anchors, or we couldnt find one, using startingSlug.
      if(!index && t.$options.startingSlug) {
        index = this.___getIndexByAttr('slug', t.$options.startingSlug);
      }

      //CRZ: fallback to first image if no anchor or slug
      t.$startingImageIndex = index ? index : 0;
      t.$index = t.$startingImageIndex;
    },

    model: function() {
      return this.$model;
    },

    setModel: function(model, options) {
      var t = this;

      t.$options = $.extend(t.$options, {getIndexFromAnchor: false, startingSlug: null});
      t.$model = model;
      t.destroy();
      t.init();
      t.___redraw();
    },

    showSingleView: function() {
      this.where().css('z-index', '0'); // ### PNS: Right rail ad is currently displayed outside of this due to the switching mechanics so we need to do some z-index swapping depending on the view.
      this.$currentView = 'single';
      $('> .single-view', this.where()).show();
      $('> .grid-view', this.where()).hide();
      $('> .end-slate', this.where()).hide();
      $('> .header > .change-view-button', this.where()).addClass('grid-view-button').removeClass('single-view-button');
    },

    showGridView: function() {
      this.where().css('z-index', '205'); // ### PNS: Right rail ad is currently displayed outside of this due to the switching mechanics so we need to do some z-index swapping depending on the view.
      this.$currentView = 'grid';
      $('> .single-view', this.where()).hide();
      $('> .grid-view', this.where()).show();
      $('> .end-slate', this.where()).hide();
      $('> .header > .change-view-button', this.where()).addClass('single-view-button').removeClass('grid-view-button');
    },

    showEndSlate: function() {
      this.$currentView = 'endSlate';
      $('> .single-view', this.where()).hide();
      $('> .grid-view', this.where()).hide();
      $('> .end-slate', this.where()).show();
    },

    destroy: function() {
      var t = this;
      t.$interstitialAd.destroy();
      t.$rightrailAd.destroy();
      t.$gridLayout.destroy();
      t.$slideGrid.destroy();
      t.$gridCarouselPresenter.destroy();
      t.$thumbViews.destroy();
      t.$fbShare.destroy();
      t.$stumbleUpon.destroy();
      t.$pinterest.destroy();
      t.$galleryFbLike.destroy();
      t.$galleryTwitter.destroy();
    },
    drawFunction: function() {
      var t = this;

      t.where().append(
        '<div class="header">' +
          '<h1 class="title">' + this.$model.title() + '</h1>' +
          '<div class="gallery-sharing">' +
            '<p>Share Gallery:</p>' +
        '<div class="fb_share"></div>' +
            '<div class="twitter"></div>' +
          '</div>' +
          '<div href="javascript:void(0);" class="change-view-button"></div>' +
        '</div>' +
        '<div class="single-view">' +
          '<div class="image-sharing"><p>Share Image: </p><div class="pinterest"></div><div class="stumbleupon"></div><div class="fb_share"></div><div style="clear:both"></div></div>' +
          '<a href="/photos" class="more-galleries" target="_parent"></a>' +
          '<div class="prev"></div>' +
          '<div class="image-wrapper">' +
            '<div class="interstitial_ad_wrapper"><div class="interstitial_ad"></div></div>' +
        '<div class="poll"></div>' +
            '<div class="image"></div>' +
            '<p class="credit"></p>' +
          '</div>' +
          '<div class="next"></div>' +
          '<div class="right">' +
            '<div class="meta">' +
              '<p class="image_count"></p>' +
              '<p class="caption"></p>' +
        '</div>' +
        '<div class="ad"></div>' +
          '</div>' +
        '</div>' +
        '<div class="end-slate">' +
          '<div class="recent-galleries">' +
            '<div class="list">' +
                //AL: Gravity RR Most Recent Gallery
                '<div id="grv-personalization-16"></div>' +
            '</div>' +
          '</div>' +
          '<div class="restart"></div>' +
          '<div class="related-galleries">' +
          '<div class="list">' +
              //AL: Toobla Related Gallery Implementation
              '<div id="grv-personalization-14"></div>' +
          '</div>' +
        '</div>' +
          '<a href="/photos" class="more-galleries" target="_parent"></a>' +
        '</div>' +
        '<div class="grid-view">' +
          '<div class="left"><div class="prev"></div></div>' +
          '<div class="grid"></div>' +
          '<div class="right"><div class="next"></div></div>' +
        '</div>'
      );

      //AL: Taboola Related Gallery Integration
        (function(){
            window.gravityInsightsParams = {
                'type': 'content',
                'action': '',
                'site_guid': '82893b79564009a4d8fab7b9db32cfea'
            };
            var adServerReq,bUrl,cburl,doUseGravityUserGuid,includeJs,jq,pfurl,type,ug,wlPrefix,wlUrl,_ref,_ref1,_ref2;includeJs=function(a){var b;b=document.createElement("script");b.async=!0;b.src=a;a=document.getElementsByTagName("script")[0];return a.parentNode.insertBefore(b,a)};bUrl="";ug=(doUseGravityUserGuid=!0===gravityInsightsParams.useGravityUserGuid?1:0)?"":gravityInsightsParams.user_guid||(null!=(_ref=/grvinsights=([^;]+)/.exec(document.cookie))?_ref[1]:void 0)||"";
            wlUrl=(wlPrefix="http://rma-api.gravity.com/v1/api/intelligence",jq=(null!=(_ref1=window.jQuery)?null!=(_ref2=_ref1.fn)?_ref2.jquery:void 0:void 0)||"",type="iframe",adServerReq=gravityInsightsParams.ad||"",cburl=gravityInsightsParams.cburl||"",pfurl=gravityInsightsParams.pfurl||"",""+wlPrefix+"/wl?jq="+jq+"&sg="+gravityInsightsParams.site_guid+"&ug="+ug+"&ugug="+doUseGravityUserGuid+"&id=grv-personalization-14&pl=14"+("&type="+type+"&ad="+adServerReq+"&cburl=")+encodeURIComponent(cburl)+"&pfurl="+
                encodeURIComponent(pfurl)+("&x="+(new Date).getTime())+("undefined"!==typeof forceArticleIds&&null!==forceArticleIds&&forceArticleIds.join?"&ai="+forceArticleIds.join(","):"")+("undefined"!==typeof apids&&null!==apids&&""!==apids?"&apids="+encodeURIComponent(apids):""));bUrl&&includeJs(bUrl);wlUrl&&(window.gravityInsightsParams.sidebar&&(window.gravityInsightsParams.wlStartTime=(new Date).getTime()),includeJs(wlUrl));})();
      //AL: Gravity RR Most Recent Gallery
        (function(){
            window.gravityInsightsParams = {
                'type': 'content',
                'action': '',
                'site_guid': '82893b79564009a4d8fab7b9db32cfea'
            };
            var adServerReq,bUrl,cburl,doUseGravityUserGuid,includeJs,jq,pfurl,type,ug,wlPrefix,wlUrl,_ref,_ref1,_ref2;includeJs=function(a){var b;b=document.createElement("script");b.async=!0;b.src=a;a=document.getElementsByTagName("script")[0];return a.parentNode.insertBefore(b,a)};bUrl="";ug=(doUseGravityUserGuid=!0===gravityInsightsParams.useGravityUserGuid?1:0)?"":gravityInsightsParams.user_guid||(null!=(_ref=/grvinsights=([^;]+)/.exec(document.cookie))?_ref[1]:void 0)||"";
            wlUrl=(wlPrefix="http://rma-api.gravity.com/v1/api/intelligence",jq=(null!=(_ref1=window.jQuery)?null!=(_ref2=_ref1.fn)?_ref2.jquery:void 0:void 0)||"",type="iframe",adServerReq=gravityInsightsParams.ad||"",cburl=gravityInsightsParams.cburl||"",pfurl=gravityInsightsParams.pfurl||"",""+wlPrefix+"/wl?jq="+jq+"&sg="+gravityInsightsParams.site_guid+"&ug="+ug+"&ugug="+doUseGravityUserGuid+"&id=grv-personalization-16&pl=16"+("&type="+type+"&ad="+adServerReq+"&cburl=")+encodeURIComponent(cburl)+"&pfurl="+
                encodeURIComponent(pfurl)+("&x="+(new Date).getTime())+("undefined"!==typeof forceArticleIds&&null!==forceArticleIds&&forceArticleIds.join?"&ai="+forceArticleIds.join(","):"")+("undefined"!==typeof apids&&null!==apids&&""!==apids?"&apids="+encodeURIComponent(apids):""));bUrl&&includeJs(bUrl);wlUrl&&(window.gravityInsightsParams.sidebar&&(window.gravityInsightsParams.wlStartTime=(new Date).getTime()),includeJs(wlUrl));})();
      //END Gravity RR Most Recent Gallery

      t.$galleryFbLike = new TmzFacebookLikeView({where: t.scoped('> .header > .gallery-sharing > .fb_share'), href: t.$model.permalink()});
      t.$galleryFbLike.draw();

      t.$galleryTwitter = new TmzTwitterView({
        where: t.scoped('> .header > .gallery-sharing > .twitter'),
                                              href: t.$model.permalink(), via: "TMZ", related: "HarveyLevinTMZ", title: t.$model.title()});
      t.$galleryTwitter.draw();

      t.$interstitialAd = new TmzDartAdView("adpos3", {incept: t.$options.incept, where: t.scoped('> .single-view > .image-wrapper > .interstitial_ad_wrapper > .interstitial_ad')});

      //check to see if ads should be displayed
      if (this.$model.safeGallery()) {
        t.$rightrailAd = new TmzDartAdView("adpos2", {
          incept: t.$options.incept,
          where: t.scoped('> .single-view > .right > .ad')
        });
        t.$rightrailAd.draw();
      } else {

      }

      t.preloadWindow(); //CRZ: do it here so we load these before all the thumbs, sharing, ads etc.

      t.$thumbViews = new TmzLocalAsyncArray($.map(t.$model.images(), function(image, index) {return new TmzGalleryGridThumbView(image);}));
      t.$gridLayout = new TmzGridLayout(t.$thumbViews, {rows: 3, rowSpacing: 29, columnSpacing: 108, pageSize: 3, layoutOrder: 'row-first'});
      t.$slideGrid = new TmzSlideGridView(t.$gridLayout, {columnsShowing: 3, rowsShowing: 3, where: $('> .grid-view > .grid', t.where())});
      t.$gridCarouselPresenter = new TmzCarouselPresenter(t.$slideGrid, {buttons: {left: t.scoped('> .grid-view > .left > .prev'), right: t.scoped('> .grid-view > .right > .next')}});
      t.$slideGrid.draw();

      t.$gridLayout.addListener('elementClicked', function(view, position, index) {
        t.showSingleView();
        t.renderImage(index);
      });

      /*
      *  End Slate
      */

      if(t.$options.lightbox) {
        var endSlateMarginTop = 90 - t.scoped('> .header > .title').outerHeight();
        t.scoped('> .end-slate').css('margin-top', endSlateMarginTop);
      }

/*      t.$endSlateRecentThumbViews = new TmzLocalAsyncArray($.map(t.$model.recentGalleries(), function(gallery, index) {return new TmzGalleryRecentThumbView(gallery);}));
      t.$endSlateRecentGalleriesGridLayout = new TmzGridLayout(t.$endSlateRecentThumbViews, {rows: 3, rowSpacing: 17, columnSpacing: 0, pageSize: 1, layoutOrder: 'row-first', where: t.scoped('> .end-slate > .recent-galleries > .list')});
 t.$endSlateRecentGalleriesGridLayout.addListener('elementClicked', function(view) {
        t.endSlateThumbClick(view);
      });
      t.$endSlateRecentGalleriesGridLayout.draw();*/

/*      t.$endSlateRelatedThumbViews = new TmzLocalAsyncArray($.map(t.$model.relatedGalleries(), function(gallery, index) {return new TmzGalleryRelatedThumbView(gallery);}));
      t.$endSlateRelatedGalleriesGridLayout = new TmzGridLayout(t.$endSlateRelatedThumbViews, {rows: 1, rowSpacing: 29, columnSpacing: 34, pageSize: 3, layoutOrder: 'row-first', where: t.scoped('> .end-slate > .related-galleries > .list')});
 t.$endSlateRelatedGalleriesGridLayout.addListener('elementClicked', function(view) {
        t.endSlateThumbClick(view);
      });
      t.$endSlateRelatedGalleriesGridLayout.draw();*/


      t.scoped('> .end-slate > .restart').click(function(e) {
        t.renderImage(0);
        t.showSingleView();
      });

      $('> .single-view > .next', t.where()).click(function(e) {e.preventDefault(); t.navigate(1);} );
      $('> .single-view > .prev', t.where()).click(function(e) {e.preventDefault(); t.navigate(-1);} );
      t.scoped('> .single-view > .image-wrapper > .image').click(function(e) {e.preventDefault(); t.navigate(1);} );

      $('> .single-view > .next, > .single-view > .prev', t.where()).hover(
        function () { $(this).addClass("hover"); },
        function () { $(this).removeClass("hover"); }
      );

      $('> .header > .change-view-button', t.where()).click(function() {
        if(t.$currentView === 'grid') {
          t.showSingleView();
          customAdId('tmz.photoGallery.change-view-button.single');
        } else {
          t.showGridView();
          customAdId('tmz.photoGallery.change-view-button.grid');
        }
      });
      t.showSingleView();

      t.renderImage(t.$startingImageIndex);
    },

    endSlateThumbClick: function(view) {
      var t = this;
      t.changeGallery(view.$model.permalink())
      return false;
    },

    preloadWindow: function() {
      var i, idx;

      for (i = this.$index - this.$preloadWindowSize; i < this.$index + this.$preloadWindowSize; i++) {
        idx = (i < 0) ? this.$model.images().length + i : i;
        if (idx >= this.$model.images().length || idx < 0) {
          idx = 0;
        }

        var imgSrc = this.$model.images()[idx].url('480w');

        if($.inArray(imgSrc, this.$preloadedImages) === -1) {
          this.$preloadedImages.push(imgSrc);
          var image = new Image();
          image.src = imgSrc;
        }
      }
    },

    lightboxPermalink: function(permalink) {
      return permalink.replace(/\.com\/photos\//, ".com/lightbox/photos/");
    },

    changeGallery: function(permalink) {
      var t = this;
      var url = permalink;
      if(t.$options.lightbox) {
        url = t.lightboxPermalink(url);
      }
      window.location = url;
      return false;

      permalink = permalink.replace(/\/$/, '') + ".json";

      $.ajax({
        url: permalink,
        dataType: 'json',
        success: function(json) {
          t.setModel(new TmzGalleryModel(json));
        }
      });
    },

    atEndOfGallery: function() {
      return this.$index === this.$model.images().length - 1;
    },

    atBeginningOfGallery: function() {
      return this.$index === 0;
    },

    navigate: function(direction) {
      if(this.atEndOfGallery() && (direction === 1)) {
        this.showEndSlate();
        return false;
      }

      if(this.$options.chainGalleries) {
        var chainGallery;
        if (this.$model.nextGallery() && (direction === 1) && this.atEndOfGallery()) {
          chainGallery = this.$model.nextGallery();
        }
        else if (this.$model.prevGallery() && (direction === -1) && this.atBeginningOfGallery()) {
          chainGallery = this.$model.prevGallery();
        }

        if(chainGallery) {
          this.changeGallery(chainGallery.permalink());
          return false;
        }
      }

      /* ZOOM
          $('.image-wrapper', this.where()).removeClass('zoomview');
      */

      this.$navigationCount++;

      if (this.shouldRefreshRightrailAd()) {

        if (this.$model.safeGallery()) {
          this.refreshRightrailAd();

        } else {
        }
      }

      if (this.shouldDisplayAd()) {
        this.displayAd();
        return false;
      }

      var newIndex;
      if (direction === 1) {
        newIndex = this.___nextIndex();
      } else if (direction === -1) {
        newIndex = this.___previousIndex();
      }
      this.renderImage(newIndex);
    },

    renderImage: function(idx, options) {
      var t = this;
      options = $.extend({changePermalink: true}, options || {});

      if(!t.$model.images()[idx]) {
        return false;
      }

      t.$thumbViews.localItems()[t.$index].deselect();
      t.$thumbViews.localItems()[idx].select();

      t.$index = idx;
      var image = t.$model.images()[idx];

      /* ZOOM
      if (image.hasZoomview()) {
        $('.image-wrapper', t.where()).addClass('zoomview');
        t.___imageDiv().empty().append('<a href="' + image.src_path + '" class="cloud-zoom" rel="position: \'inside\' , showTitle: false">' + '<img src="' + image.full_path + '" title="" alt=""/></a>');
        $('a',t.___imageDiv()).CloudZoom();
        var cz = $('a', t.___imageDiv()).data('zoom');

        cz.whenFinishedLoading(function() {
          cz.center();
        });

        var zoomspots = $('.zoomspots', t.where()).empty();
        $.each(image.zoomspots(), function() {
          var zoomspot = this;
          $('<li><a href="javascript:void(0)">' + this.name + '</a></li>').click(function(e) {
            e.preventDefault();
            cz.zoomTo(zoomspot.zoomlevel);
            cz.centerAt(zoomspot.x, zoomspot.y);
          }).appendTo(zoomspots);
        });
      } else {
        $('.single-view > .image-wrapper > .image', t.where()).empty().append('<img src="' + image.url('480w') + '"/>');
      }
      */
      if(t.$currentImageView) {
        t.$currentImageView.destroy();
      }

      var imageSize = image.size('480w');
      if(imageSize) {
        t.$currentImageView = new TmzImageView(imageSize.url,
                                  {originalWidth: imageSize.width, originalHeight: imageSize.height, width: 548, height: 480, mode: 'bordered'});
        t.$currentImageView.setWhere($('.single-view > .image-wrapper > .image', t.where()));
        t.$currentImageView.draw();
      }

      if(t.$currentPollView) {
        t.$currentPollView.destroy();
      }

      if(image.hasPoll()) {
        t.$currentPollView = new TmzLegacyPollView(image.pollCode());
        t.$currentPollView.setWhere($('.single-view > .image-wrapper > .poll', t.where()));
        t.$currentPollView.draw();
      }

      $('.single-view > .right > .meta > .image_count', t.where()).html(t.___imageCountView(t.$index));
      $('.single-view > .right > .meta > .caption', t.where()).html(t.___displayedCaption());
      $('.single-view > .image-wrapper > .credit', t.where()).html(image.credit());
      $('> .single-view > .image-sharing', this.where()).show();

      if (t.$showingAd) {
        t.hideAd();
      }
      t.preloadWindow();

      if(options.changePermalink) {
        t.___setImagePermalink();
      }

      t.___renderImageSharing();

      if (!t.$initialLoad) {
        try { var s_code=s.t(); } catch(e) {}
        try { if(Nielsen_Event) {Nielsen_Event(true);} } catch(e) {}
        try {
          if(t.$options.comscoreJsUrl) {
            var url = t.$options.comscoreJsUrl + '?' + Math.random().toString().slice(2, 15);
            $('head').append($('<script type="text/javascript"></script>').attr('src', url));
          } else {
            $.ajax({
              type: 'GET',
              url: '/comscore.xml',
              cache: false
            });
          }
          COMSCORE.beacon({
            c1: 2,
            c2: "3000013",
            c3: "3000013",
            c4: "",
            c5: "",
            c6: "",
            c15: ""
          });
        } catch(e) {}
      }
      t.$initialLoad = false;
    },

    shouldDisplayAd: function() {


      if (!this.$interstitialAd || !this.$model.hasInterstitials() || !this.$model.safeGallery()) {

        return false;
      } else {

        return (this.$navigationCount % this.$model.interstitialFrequency()) === 0;
      }
    },

    displayAd: function() {

      if (this.$model.safeGallery()) {
        //check to see if this is a gallery that can have ads on it

      if(this.DEBUG_LIMIT_TRAFFIC) {
        return true;
      }

      var ord = Math.random() * 10000000000000000;
      this.$showingAd = true;
      $('> .single-view > .image-wrapper > .interstitial_ad_wrapper', this.where()).show();
      $('> .single-view > .right > .meta > .caption', this.where()).html('');
      $('> .single-view > .image-wrapper > .credit', this.where()).html('');
      $('> .single-view > .image-wrapper > .image', this.where()).empty();
      $('> .single-view > .image-sharing', this.where()).hide();
      if(this.$currentPollView) {
        this.$currentPollView.destroy();
      }
      if(this.$interstitialAd.wasDrawn()) {
        //this.$interstitialAd.refresh();
        wbads.showAds();  // Need to render interstitial
      } else {
        this.$interstitialAd.draw();
        wbads.buildSlots();
        wbads.showAds();  // Need to render interstitial
      }

      } else {

        //no ads
        return false;

      }
    },

    shouldRefreshRightrailAd: function() {
        return (this.$navigationCount % this.$model.rightrailFrequency()) === 0;
    },

    refreshRightrailAd: function() {
        if(this.DEBUG_LIMIT_TRAFFIC) {
            return true;
        }

        var ord = Math.random() * 10000000000000000;

        if(this.$rightrailAd.wasDrawn()) {
            //this.$rightrailAd.refresh();
            wbads.showAds();  // showAds() again to refresh refreshable ads.
        } else {
            this.$rightrailAd.draw();
        }
    },

    hideAd: function() {
      $('> .single-view > .image-wrapper > .interstitial_ad_wrapper', this.where()).hide();
      this.$showingAd = false;
    },

    ___getIndexByAttr: function(attr, value) {
      var i;
      for (i = 0; i < this.$model.images().length; i++) {
        if (this.$model.images()[i][attr]() === value) {
          return i;
        }
      }
      return 0;
    },

    currentImage: function() {
      return this.$model.images()[this.$index];
    },

    ___renderImageSharing: function() {
      var t = this;

      if(t.DEBUG_LIMIT_TRAFFIC) {
        return true;
      }

      if(t.$fbShare) { t.$fbShare.destroy(); }
      t.$fbShare = new TmzFacebookCustomShareView({where: t.scoped('> .single-view > .image-sharing > .fb_share'), href: t.currentImage().permalink()});
      t.$fbShare.draw();

      if(t.$stumbleUpon) { t.$stumbleUpon.destroy(); }
      t.$stumbleUpon = new TmzStumbleUponView({where: t.scoped('> .single-view > .image-sharing > .stumbleupon'), href: t.currentImage().permalink()});
      t.$stumbleUpon.draw();

      if(t.$pinterest) { t.$pinterest.destroy(); }
      t.$pinterest = new TmzPinterestView({where: t.scoped('> .single-view > .image-sharing > .pinterest'),
                                           href: t.currentImage().permalink(),
                                           description: t.currentImage().caption(),
                                           photo_url: (t.$currentImageView) ? t.$currentImageView.url() : ""});
      t.$pinterest.draw();
    },

    ___displayedCaption: function() {
      var caption = this.currentImage().caption();
      return ((!caption) ? this.$model.title() : caption);
    },

    ___imageCountView: function(idx) {
      return '<span class="current_index"><span class="pound">#</span>' + (idx + 1) + "</span> of " + this.$model.images().length;
    },

    ___nextIndex: function() {
      if (this.$index + 1 > this.$model.images().length - 1) {
        return 0;
      } else {
        return this.$index + 1;
      }
    },

    ___previousIndex: function() {
      if(this.$index - 1 < 0) {
        return this.$model.images().length - 1;
      } else {
        return this.$index - 1;
      }
    },

    //CRZ: in case of hashbang link
    ___getIndexFromAnchor: function() {
      var match = window.location.href.match(/\#\!\/(images)\/(\d{4}\/\d{2}\/\d{2}\/[A-Za-z0-9\-]+)\/?/);
      if(match) {
        return this.___getIndexByAttr('slug', match[2]);
      } else {
        var id = $.url(window.location.href).fparam('id');
        if(id) {
          return this.___getIndexByAttr('symbolforce-id', id);
        }
      }

      return null;
    },

    ___setImagePermalink: function() {
      var t = this;

      if(t.MANIPULATE_HISTORY && window.history && window.history.replaceState) {
          // UPDATE: make sure to keep query string
        window.history.replaceState(t.$index, t.currentImage().caption(), $.url(t.currentImage().permalink()).attr('path')+window.location.search);
      } else {
        window.location.hash = "#!/images/" + this.currentImage().slug();
      }
    },

    //CRZ### - put in utility class
    ___template: function(str, o) {
      return str.replace(/\{([^{}]*)\}/g, function(a, b) {
        var r = o[b];
        if (!r) { return ""; }
        return (typeof r === 'string' || typeof r === 'number') ? r : a;
      });
    }
  });
})(jQuery);


//CRZ: option.incept - (i.e. Inception the movie). wrap ad in TWO iframes to be safe. this is needed for lightboxes
//                     because there are bad dart ads which when loaded inside the lightbox, blank the lightbox.
(function($) {
  TmzClass.create('TmzDartAdView', 'TmzView', {
    constructor: function(dartTag, options) {
      var t = this;
      options = $.extend({bgColor: "transparent", incept: false}, (options || {}));
      TmzView.apply(t, [options]);

/*********************
      t.$dartTag = dartTag.replace(/;ord=$/, "");
      t.$dartTag = t.___semicolonSuffix(t.$dartTag);
      t.$ord = t.$options.ord || window.ord || Math.round(Math.random()*10000000000000000);
      var width = t.$options.width || 300;
      var height = t.$options.height || 250;

      var ad_params = '' + t.$dartTag + (typeof quantSegs !== 'undefined' ? quantSegs : '');
      ad_params = t.___semicolonSuffix(ad_params);
      var iframeSrc = 'http://ad.doubleclick.net/adi/'+ad_params+'ord='+t.$ord;

      t.$iframeHtml = "<iframe src='" + iframeSrc + "' width='" + width + "' height='" + height + "' allowtransparency='true' frameborder='0' bgcolor='" + t.$options.bgColor + "' border='none' marginwidth='0' marginheight='0' scrolling='no'></iframe>";
 *********************/

      t.$iframeHtml = "";
      if(dartTag == "adpos3") {
          t.$iframeHtml = '<div align="center" class="ad-container wbads" data-adsize="medium_rectangle" data-pos="inpost,bottom" data-refresh="true" data-tile="3"></div>';
      } else if(dartTag == "adpos2") {
          t.$iframeHtml = '<div align="center" class="ad-container wbads" data-adsize="medium_rectangle" data-pos="top" data-refresh="true" data-tile="2"></div>';
      }
    },

    drawFunction: function() {
      this.___render();
    },

    refresh: function(slot) {
      this.where().empty();
      this.___render();
    },

    ___render: function() {
      var t = this;

      t.where().append(t.$iframeHtml);
    },

    ___semicolonSuffix: function(str) {
      if(str[str.length -1] !== ";") {
        str = str + ";";
      }

      return str;
    }
  });
})(jQuery);


//CRZ - thumbsArray expected to be LocalAsyncArray of thumbs of TmzVideoModel
//    - TmzVideoPlaylistView expects to be used with a kaltura player with autoplay. it will not start playing, but will listen to end events to start the next vid.

(function($) {
  TmzClass.create('TmzVideoPlaylistView', 'TmzView', {
    KDP_EVENTS: ['playerPlayEnd', 'mediaReady', 'kdpEmpty'],
    constructor: function(thumbsArray, options) {
      var t = this;

      t.$thumbsArray = thumbsArray;
      t.$currentThumb = null;
      t.$kdp = null;
      t.$gridLayout = null;
      t.$callbackNames = {};
      $.each(t.KDP_EVENTS, function(i, eventName) { 
        t.$callbackNames[eventName] = t.className + t.__randString() + eventName + "Callback";
      });

      TmzView.apply(t, [$.extend({autoPlay: true, autoStartFromTop: false}, options || {})]);
    },

    play: function(index) {
      this.fireListener('changeVideo', this.$thumbsArray.fetchOne(0).model());
    },

    //CRZ: KDP expects callbacks as strings referring to global functions. go to lengths to make random global functions.
    setKalturaPlayer: function(kdp) {
      var t = this;
      t.$kdp = kdp;

      $.each(t.$callbackNames, function(eventName, globalCallbackName) {
        window[globalCallbackName] = function() {t[eventName + "Callback"].apply(t, arguments);};
        t.$kdp.addJsListener(eventName, globalCallbackName);
      });

      t.kdpEmptyCallback(); // in case we've already had a kdpEmpty event fire
    },

    drawFunction: function() {
      var t = this;

      t.$gridLayout = new TmzGridLayout(t.$thumbsArray, {columns: 1, rowSpacing: 0, rowSpacerHtml:'<div><div class="divider"></div></div>', layoutOrder: 'row-first', where: t.where()});
      t.$gridLayout.draw();

      t.$thumbsArray.each(function(i, view) {
        view.scoped('> a').click(function(e) {
          e.preventDefault();
          t.fireListener('changeVideo', view.model());
        });
      });
    },

    destroy: function() {
      $.each(t.$callbackNames, function(eventName, globalCallbackName) {
        if(t.$kdp && window[globalCallbackName]) {
          kdp.removeJsListener(eventName, globalCallbackName);
        }
      });
    },

    playerPlayEndCallback: function(playerId) {
      var t = this;

      var thumb = t.___getThumbWithEntryId(t.$kdp.evaluate('{mediaProxy.entry.id}'));
      var nextThumb;

      if(thumb) {
        var currentIndex = t.$thumbsArray.indexOf(thumb);
        if(currentIndex !== -1) {
          nextThumb = t.$thumbsArray.fetchAll()[currentIndex + 1]; // == null on last video
        }
      } else {
        nextThumb = t.$thumbsArray.fetchOne(0);
      }

      if(t.$options.autoPlay && nextThumb) {
        t.$currentThumb = nextThumb;
        t.fireListener('changeVideo', nextThumb.model());
      }
    },

    kdpEmptyCallback: function() {
      try {
        if(t.$options.autoStartFromTop) {
          this.$kdp.sendNotification('changeMedia', {entryId: this.$thumbsArray.fetchOne(0).model().kalturaId() });
        }
      } catch (e) {}
    },

    mediaReadyCallback: function() {
      var t = this;

      var currentEntryId = t.$kdp.evaluate('{mediaProxy.entry.id}');

      $(t.$thumbsArray.each(function(i, view) {   
        view.where().toggleClass('now-playing', view.model().kalturaId() === currentEntryId);
      }));
    },

    ___getThumbWithEntryId: function(entryId) {
      var t = this;

      return t.$thumbsArray.detect(null, function(thumb) {
        return thumb.model().kalturaId() === entryId;
      });
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzVideoThumbView', 'TmzThumbView', {
    constructor: function(model, options) {
      var t = this;
      t.$imageView = null;

      options = $.extend({kalturaThumbnail: {width: 164, height: 88, type: 3}, width: 164, height: 251}, (options || {}));
      TmzThumbView.apply(t, [model, options]);
    },

    /* CRZ: inadequately trying to figure out who the celebrity is in a title.
      1. try to split on a " -- "
      2. else, take the first two words as the subheader. drop any colons at end.
      3. remove any prefixing white space or dashes in rest
    */
    splitTitle: function() {
      var halves = this.$model.title().split(' -- ');
      if(halves.length > 1) {
          return {'subheader': halves[0], 'rest': halves[1]};
      }

      var words = this.$model.title().split(' ');
      if(words.length > 2) {
        return {'subheader': (words.shift() + " " + words.shift()).replace(/:$/g, 'S'), 'rest': words.join(' ').replace(/^\s*-\s*/,'')};
      } else {
        return {'subheader': '', 'rest': words.join(' ')};
      }
    },

    fragmentedTitleHTML: function() {
      var parts = this.splitTitle();

      return '<span class="subheader">' + parts.subheader + '</span><br/><span class="rest">' + parts.rest.substring(0, 65) + '</span>';
    },

    durationHTML: function() {
      if(this.$model.duration() && !isNaN(this.$model.duration())) {
        return this.$model.durationMinutes().toString() + ':' + ((this.$model.durationSeconds() + 0.00001)/100).toString().split('.')[1].substring(0,2);
      } else {
        return "";
      }
    },

    titleHTML: function() {
      return $('<p>' + this.$model.title() + '</p>').text().substring(0, 100);
    },

    drawFunction: function() {
      var t = this;

      t.where().append(
        '<a href="' + t.$model.url() +  '"><div class="play-button-overlay"></div><div class="image"></div><div class="header"><p class="title">' + t.titleHTML() +
        '<span class="duration"> ' + t.durationHTML() + '</span></p><div style="clear:both"></div></div></a>'
      );

      t.$imageView = t.___makeImageView(this.$model.$attributes.thumbnailUrl);
      t.$imageView.setWhere(t.scoped('> a > .image'));
      t.$imageView.draw();
    },

    ___makeImageView: function(url) {
      var options = {width: this.$options.kalturaThumbnail.width, height: this.$options.kalturaThumbnail.height};
      if(url.match(/_still\.....?$/)) {
        options = $.extend(options, {originalWidth: 640, originalHeight: 360});
      } else {
        options = $.extend(options, {originalWidth: this.$options.kalturaThumbnail.width, originalHeight: this.$options.kalturaThumbnail.height});
      }

      return new TmzImageView(url, options);

    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzVideoPlaylistThumbView', 'TmzVideoThumbView', {
    constructor: function(model, options) {
      TmzVideoThumbView.apply(this, [model, $.extend({kalturaThumbnail: {width: 113, height: 59, type: 3}, width: 300, height: 86}, options || {})]);
    },

    drawFunction: function() {
      var t = this;

      t.where().append(
        '<a href="' + t.$model.url() +  '"><div class="play-button"></div><div class="image"></div>' +
        '<div class="header"><p class="title">' + t.titleHTML() +
        '<span class="duration"> ' + t.durationHTML() + '</span></p><div style="clear:both;float:none;"></div></div><div style="clear:both;float:none;"></div></a>'
      );

      t.$imageView = t.___makeImageView(this.$model.$attributes.thumbnailUrl);
      t.$imageView.setWhere(t.scoped('> a > .image'));
      t.$imageView.draw();
    },

    titleHTML: function() {
      var overflow = !!(this.$model.title().length > 100);
      return $('<p>' + this.$model.title().substring(0, 97) + (overflow ? '...' : '') + '</p>').text();
    },

    cssClassNames: function() {
      return 'tmz-video-thumb tmz-video-playlist-thumb';
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzVideoFooterThumbView', 'TmzVideoThumbView', {
    constructor: function(model, options) {
      var t = this;
      options = $.extend({kalturaThumbnail: {width: 210, height: 120, type: 3}, width: 210, height: 172}, (options || {}));
      TmzVideoThumbView.apply(t, [model, options]);
    },
    
    drawFunction: function() {
      var t = this;

      t.where().append(
        '<a href="' + t.$model.url() +  '?adid=footer_videos" class="lightbox-link"><div class="play-button"></div><div class="header"><p class="title">' + t.titleHTML() +
        '<span class="duration"> ' + t.durationHTML() + '</span></p><div style="clear:both"></div></div><div class="image"></div></a>'
      );

      t.$imageView = t.___makeImageView(this.$model.thumbnailUrl(this.$options.kalturaThumbnail));
      t.$imageView.setWhere(t.scoped('> a > .image'));
      t.$imageView.draw();
    },

    titleHTML: function() {
      var overflow = !!(this.$model.title().length > 39);
      return $('<p>' + this.$model.title().substring(0, 37) + (overflow ? '...' : '') + '</p>').text().toUpperCase();
    },

    cssClassNames: function() {
      return 'tmz-video-footer-thumb';
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzVideoSearchThumbView', 'TmzVideoThumbView', {
    constructor: function(model, options) {
      TmzVideoThumbView.apply(this, [model, $.extend({kalturaThumbnail: {width: 322, height: 230, type: 3}, width: 338, height: 324}, options || {})]);
    },
        
    cssClassNames: function() {
      return 'tmz-video-thumb tmz-search-video-thumb';
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGalleryThumbView', 'TmzThumbView', {
    constructor: function(model, options) {
      var t = this;

      TmzThumbView.apply(this, [model, $.extend({width: 279, height: 363}, options)]);
    },
    
    fragmentedTitleHTML: function() {
      var parts = this.splitTitle();

      return '<span class="subheader">' + parts.subheader.toUpperCase() + '</span><br/><span class="rest">' + parts.rest.toUpperCase().substring(0, 65) + '</span>';    
    },
    
    titleHTML: function() {
      return this.$model.title().toUpperCase().substring(0, 100);
    },

    //###CRZ: I know the original is 400x400 because thats what _collections_in_galleries.json.cft returns. eliminate this strange dependency.
    drawFunction: function() {
      var t = this;
      t.where().append(
        '<div class="image"></div><div class="header"><p class="title">' + t.titleHTML() +
        '</p><div style="clear:both"></div></div>'
      );
      this.$imageView = new TmzImageView(t.$model.thumbnailUrl(), 
                        $.extend(this.___imageViewOptions(), {mode: 'fullframe', where: $('> .image', this.where())}));
      this.$imageView.draw();
    },

    ___imageViewOptions: function() {
      return {originalWidth: 400, originalHeight: 400, width: 245, height: 245};
    },

    originalWidth: function() {
      return 400;
    },

    originalHeight: function() {
      return 400;
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGalleryRelatedThumbView', 'TmzThumbView', {
    constructor: function(model, options) {
      this.$imageView = null;

      options = $.extend({width: 144, height: 140}, options || {});
      TmzThumbView.apply(this, [model, options]);
    },

    drawFunction: function() {
      var t = this;

      t.where().append(
        '<a href="' + t.$model.permalink() + '">' +
          '<div class="image"></div>' +
          '<div class="title">' + t.$model.title() + '</div>' +
        '</a>'
      );

      var imageSize = t.$model.thumbnailOverrideSize('150x150');
      if(!imageSize) { imageSize = t.$model.thumbnailOverrideSize('150x150') }

      if(imageSize) {
        t.$imageView = new TmzImageView(imageSize.url, {
          mode: 'fullframe', 
          originalWidth: imageSize.width, 
          originalHeight: imageSize.height, 
          width: 144, height: 72, 
          where: $('.image', this.where())
        });
        t.$imageView.draw();
      }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzGalleryRecentThumbView', 'TmzThumbView', {
    constructor: function(model, options) {
      this.$imageView = null;

      options = $.extend({width: 300, height: 43}, options || {});
      TmzThumbView.apply(this, [model, options]);
    },

    lightboxPermalink: function(permalink) {
      return permalink.replace(/\.com\/photos\//, ".com/lightbox/photos/");
    },

    drawFunction: function() {
      var t = this;

      t.where().append(
        '<a href="' + t.$model.permalink() + '">' +
          '<div class="image"></div>' +
          '<div class="title">' + t.$model.title() + '</div>' +
        '</a>'
      );

      var imageSize = t.$model.thumbnailOverrideSize('50x50');
      //if(!imageSize) { imageSize = t.$model.thumbnailOverrideSize('150x150') }

      if(imageSize) {
        t.$imageView = new TmzImageView(imageSize.url, {
          mode: 'fullframe', 
          originalWidth: imageSize.width, 
          originalHeight: imageSize.height, 
          width: 43, height: 43, 
          where: $('.image', t.where())
        });
        t.$imageView.draw();
      }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzGallerySearchThumbView', 'TmzGalleryThumbView', {
    constructor: function(model, options) {
      TmzGalleryThumbView.apply(this, [model, $.extend({width: 338, height: 324}, options || {})]);
    },

    ___imageViewOptions: function() {
      return {originalWidth: 460, originalHeight: 460, width: 322, height: 230};
    },
        
    cssClassNames: function() {
      return 'tmz-gallery-thumb tmz-search-gallery-thumb';
    }
  });
})(jQuery);

(function($) {
 TmzClass.create('TmzHtmlView', 'TmzView', {
    constructor: function(html, options) {
      var t = this;

      t.$html = html;

      t.drawFunction = function() {
        t.where().append(html);
      };

      TmzView.apply(t, [options]);
    }
  });
})(jQuery);

/*
  - originalWidth/originalHeight are required, and are the size of the image at url
  - height/width are required options, and are the size of bounding box the image sits in
  - if mode: 'fullframe', the image is top-center cropped to appear full frame
  - if mode: 'bordered',  the image is fit into bounding box and have borders applied
  - positionX can be 'left' or 'center', positionY can be 'left' or 'center'
  - position determines how borders are applied, or how fullframe cropping is done
  - always maintains aspect ratio

  TODO
    - configurable bgColor
    - make work even if you only know one of or neither of the original dimensions
    - make work even if you only know one of or neither of the bounding box dimensions
    - given a list of sizes, automatically pick the one that leads to the best display given the boundingbox (prolly put this in separate class)
    - make sure editors can easily override cropping.

  POSSIBLE TODO
    - Allow custom cropping to right, bottom, altho hard to figure where this is useful
    - allow percentages and custom crop points, altho this is not generally useful since it requires specific knowledge about each image
    - ability to not maintain aspect ratio, altho this is not generally useful since stretched images are ugly.
*/

(function($) {
  TmzClass.create('TmzImageView', 'TmzView', {
    constructor: function(url, options) {
      var t = this;
      t.$url = url;
      t.$boundingScale = null;

      options = t.___processOptions(options);
      TmzView.apply(t, [options]);

      var boundingBox = {width: t.$options.width, height: t.$options.height};
      var imageBox = {width: t.$options.originalWidth, height: t.$options.originalHeight};
      if(this.$options.mode === "bordered") {
        t.$boundingScale = t.___findBoundingScale(boundingBox, imageBox);
      } else {
        var fraction = t.___findBoundingScale(imageBox, boundingBox);
        t.$boundingScale = {q: fraction.p, p: fraction.q}; //i.e. 1/fraction
      }
    },

    //CRZ - since width & height are required, TmzView default behavior will hardcode size.
    drawFunction: function() {
      $('<img/>').
        attr('src', this.$url).
        css($.extend(this.___imgTagDimensions(), this.___positionInBoundingBox())).
        appendTo(this.where());
    },

    url: function() { 
      return this.$url;
    },

    ___processOptions: function(options) {
      var t = this;

      options = $.extend({mode: 'fullframe', positionX: 'center', positionY: (options.mode === 'bordered') ? 'center' :'top'}, options || {});

      if(!(options.originalWidth && options.originalHeight && options.width && options.height)) {
        throw(t.className + ": originalWidth, originalHeight, width, height must all be defined");
      }

      if(!(options.mode === 'fullframe' || options.mode === 'bordered')) {
        throw(t.className + ": mode must be either 'fullframe' or 'bordered'");
      }

      return options;
    },

    ___imgTagDimensions: function() {
      return {
        width: parseInt((this.$options.originalWidth * this.$boundingScale.p) / this.$boundingScale.q, 10),
        height: parseInt((this.$options.originalHeight * this.$boundingScale.p) / this.$boundingScale.q, 10)
      };
    },

    ___positionInBoundingBox: function() {
      var t = this;
      var position = {left: 0, top: 0};
      
      if(t.$options.positionX === 'center') {
        position.left = parseInt((this.$options.width - this.___imgTagDimensions().width) / 2, 10);
      }

      if(t.$options.positionY === 'center') {
        position.top = parseInt((this.$options.height - this.___imgTagDimensions().height) / 2, 10);
      }
      
      return position;
    },

    //CRZ: return an object representing a fraction so we can avoid rounding errors later.
    ___findBoundingScale: function(container, toContain) {
      var toContainAspect = toContain.width / toContain.height;
      var containerAspect = container.width / container.height;

      if(toContainAspect > containerAspect) {
        return {p: container.width, q: toContain.width};
      } else {
        return {p: container.height, q: toContain.height};
      }
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzDependentCarouselView', 'TmzView', {
    constructor: function(options) {
      var t = this;

      options = $.extend({
        collectionBufferLength: 15,
        subViewBufferLength: 10
      }, (options || {}));

      TmzView.apply(this, [options]);
      
      t.$page = 1;
      t.$DISPLAY_PAGING = false;
      t.$carousel = null;
      t.$list = null;
      t.$subViews = [];
      t.$title = "";
      if(t.$options.title) {
        t.setTitle(t.$options.title);
      }
      t.$collectionXHR = null;
      t.$hideSubViewBufferTimeout = null;
    },
        
    displayPage: function(page) {
      var t = this;

      var page = Math.max(1, Math.min(page, t.numberOfPages()));

      if(t.numberOfPages() === 1) {
        //never display gradients
      } else if(page === 1) {
        t.$carousel.options.trimLeft = 0;
        t.$carousel.options.trimRight = t.$trimRight;
      } else if(page === t.numberOfPages()) {
        t.$carousel.options.trimLeft = t.$trimRight;
        t.$carousel.options.trimRight = 0;
      } else {
        t.$carousel.options.trimLeft = t.$trimRight/2;
        t.$carousel.options.trimRight = t.$trimRight/2;
      }

      t.$carousel.showFirst(t.$options.elementsShown*page-2);

      t.$page = page;

      $('.tmz-carousel-element', t.where()).removeClass('left-edge').removeClass('right-edge');
      $('.tmz-carousel-element', t.where()).slice(t.$carousel.firstElementShown - 2, t.$carousel.firstElementShown -1).addClass('left-edge');
      $('.tmz-carousel-element', t.where()).slice(t.$carousel.firstElementShown - 1 + t.$options.elementsShown, t.$carousel.firstElementShown + t.$options.elementsShown).addClass('right-edge');
    },
    
    numberOfPages:  function() {
      var t = this;
      
      return Math.ceil(t.totalRecords() / t.$options.elementsShown);
    },

    numberOfPagesShown:  function() {
      var t = this;
      
      return Math.ceil(t.$subViews.length / t.$options.elementsShown);
    },

    addSubView: function(view) {
      this.$subViews.push(view);
      return view;
    },

    setTitle: function(title) {
      this.$title = title;
    },

    title: function() {
      return this.$title;
    },

    slug: function() {
      return this.$options.slug;
    },

    totalRecords: function() {
      return this.$options.totalRecords;
    },

    drawFunction: function() {
      var t = this;
      
      t.$options.elementsShown = t.$options.elementsShown || 3;
      t.$options.elementWidth = t.$options.elementWidth || (t.$subViews.length && t.$subViews[0].width()) || 0;
      t.$options.width = t.$options.width || (t.$options.elementsShown * t.$options.elementWidth);
      t.$trimRight = (t.$options.elementsShown * t.$options.elementWidth) - t.$options.width;

      var html = '<div class="left-arrow arrow" style="display:none;"></div><div class="right-arrow arrow" style="display:none;"></div>' + 
               '<div class="header"><h3 class="title">' + t.$title + '</h3><div class="clear"></div><div class="paging"></div></div>' +
               '<div style="clear:both;float:none;"></div>' + 
               '<div class="list"></div>' + 
               '<div class="gradient-left gradient" style="display:none"></div><div class="gradient-right gradient" style="display:none"></div>' + 
               '<div class="ajax-loader" style="display:none"></div>' +
               '</div><div style="clear:both; float:none;"></div>';

      var titleToId = t.$title.replace(/ /g,'');
      t.where().attr('id', titleToId ).addClass('tmz-carousel').html(html);
  
      t.$list = $('.list', t.where());

      t.$carousel = t.$list.dynamicCarousel({
        elementWidth: t.$options.elementWidth, 
        elementsShown: t.$options.elementsShown, 
        trimRight: t.$trimRight
      }).data('dynamicCarousel');

      $.each(t.$subViews, function(i,carouselElementView) {
        carouselElementView.setWhere($('<div class="tmz-carousel-element"></div>').data('tmzCarouselElement', carouselElementView));
        t.$carousel.push(carouselElementView.where(), '///id');
      });

      t.___renderSubViewBuffer();
      t.___initBindArrowEvents();
      t.$carousel.triggerEvents();
      t.displayPage(1);

    },

    retrieveMoreThumbnails: function(page, limit) {
      var t = this;
      var slug = t.slug();
      var url = '/json/galleries_in_collection_cms_ordered/' + slug + '.json?page=' + page + '&limit=' + limit;

      t.$collectionXHR = $.getJSON(url, function(json) {
        t.___addNewSubViews(json.results);
        t.$collectionXHR = null;
      });
    },

    ___addNewSubViews: function(results) {
      var t = this;
      $.each(results, function(i, view) {
        var subView = t.addSubView(new TmzGalleryThumbView(new TmzGalleryModel(view)));

        var el = t.$carousel.push('');
        el.append('<div class="tmz-carousel-element"></div>');
        el.find('.tmz-carousel-element').data('tmzCarouselElement', subView);
        subView.setWhere(el.find('.tmz-carousel-element'));
        subView.draw();
      });
    },

    ___moreElementsToBeLoaded: function() {
      var t = this;
      return t.$subViews.length < t.totalRecords();
    },

    ___collectionBufferNeedsToFill: function() {
      var t = this;
      var firstVisibleElementIndex = t.$options.elementsShown * t.$page - 2;
      return t.$subViews.length - t.$options.collectionBufferLength < firstVisibleElementIndex && !t.$collectionXHR;
    },

    ___fillCollectionBuffer: function () {
      var t = this;
      if(t.___moreElementsToBeLoaded() && t.___collectionBufferNeedsToFill()) {
        var offset = Math.floor(t.$subViews.length / t.$options.collectionBufferLength) + 1;
        t.retrieveMoreThumbnails(offset, t.$options.collectionBufferLength);
      }   
    },

    ___renderSubViewBuffer: function() {
      var t = this;
      var middleIndex = t.$options.elementsShown * t.$page - 1;
      var startIndex = Math.max(0, middleIndex - t.$options.subViewBufferLength/2);
      var endIndex = startIndex + t.$options.subViewBufferLength;
      for(var i = startIndex; i < endIndex; i++) {
        var subView = t.$subViews[i];
        if(subView) {
          if(!subView.wasDrawn()) {
            subView.draw();
          }
          subView.where().css('visibility', 'visible');
        }
      }

      t.___hideSubViewsOutOfBuffer();
    },

    ___hideSubViewsOutOfBuffer: function() {
      var t = this;
      clearTimeout(t.$hideSubViewBufferTimeout);
      t.$hideSubViewBufferTimeout = setTimeout(t.___doHideSubViewsOutOfBuffer, 500, t);
    },

    ___doHideSubViewsOutOfBuffer: function(t) {
      if(!t) {
        return false;
      }
      var middleIndex = t.$options.elementsShown * t.$page - 1;
      var startIndex = Math.max(0, middleIndex - t.$options.subViewBufferLength/2);
      var endIndex = startIndex + t.$options.subViewBufferLength;

      for(var i = startIndex-1; i >= 0; i--) {
        var subView = t.$subViews[i];
        if(subView) {
          if(subView.where().css('visibility') == 'hidden') { break; }
          subView.where().css('visibility', 'hidden');
        }
      }

      for(var i = endIndex+1; i < t.$subViews.length; i++) {
        var subView = t.$subViews[i];
        if(subView) {
          if(subView.where().css('visibility') == 'hidden') { break; }
          subView.where().css('visibility', 'hidden');
        }
      }
    },

    ___initBindArrowEvents: function() {
      var t = this;
      t.$ajaxLoader = t.$___where.children('.ajax-loader');

      t.$list.bind('dc:previousNotAvailable', function(e) { 
        e.preventDefault(); 
        $('.left-arrow, .gradient-left', t.where()).fadeOut();
      });

      t.$list.bind('dc:previousAvailable', function(e) { 
        e.preventDefault(); 
        $('.left-arrow, .gradient-left', t.where()).fadeIn(); 
      });

      t.$list.bind('dc:nextNotAvailable', function(e) { 
        e.preventDefault(); 
        $('.right-arrow, .gradient-right', t.where()).fadeOut(400, function() {
          $(this).data('fadingOut', false);
        }).data('fadingOut', true);
        if(t.___moreElementsToBeLoaded() && t.$collectionXHR) {
          t.$ajaxLoader.delay(500).fadeIn();
        }
      });
      t.$list.bind('dc:nextAvailable', function(e) { 
        e.preventDefault(); 
        $('.right-arrow, .gradient-right', t.where()).fadeIn(); 
        t.$ajaxLoader.stop(true).hide();
      });
      
      $('.left-arrow', t.where()).click(function(e) {
        e.preventDefault();
        t.displayPage(t.$page-1);
        t.$ajaxLoader.hide();

        t.___renderSubViewBuffer();
      });

      $('.right-arrow', t.where()).click(function(e) {
        e.preventDefault();
        if(!$(this).data('fadingOut')) {
           t.displayPage(t.$page+1);

           t.___fillCollectionBuffer();
           t.___renderSubViewBuffer();
        }
      });
    }

  });
})(jQuery);

//options.buttons left/right/up/down - triggers page slides in that direction
//options.ornaments left/right/up/down - executes becomeAvailableAnimation/becomeUnavailableAnimation on these elements when state changes
//options.overlays - if clicks are caught on these, pass them through to underlying views (but not at any particular x/y coordinates...)
(function($) {
  TmzClass.create('TmzCarouselPresenter', 'TmzObject', {
    constructor: function(slideGrid, options) {
      var t = this;
      t.$slideGrid = slideGrid;

      options = $.extend({
        buttons: {},
        overlays: {},
        ornaments: {},
        maintainFullEdges: true,
        hoverOnlyWhenAvailable: true,
        becomeAvailableAnimation: function(elements) { elements.fadeIn(this.$slideGrid.wasDrawn() ? 500 : 0); },
        becomeUnavailableAnimation: function(elements) { elements.fadeOut(this.$slideGrid.wasDrawn() ? 500 : 0); }
      }, (options || {}));
      TmzObject.apply(t, [options]);

      slideGrid.addListener('availabilityChange', function(directionsPossible) {
        var direction;
        for(direction in directionsPossible) {
          if(directionsPossible[direction]) {
            $(t.$options.buttons[direction]).add($(t.$options.ornaments[direction])).addClass('available').removeClass('unavailable');
            t.$options.becomeAvailableAnimation.call(t, $(t.$options.ornaments[direction]));
          } else {
            $(t.$options.buttons[direction]).add($(t.$options.ornaments[direction])).addClass('unavailable').removeClass('available');
            t.$options.becomeUnavailableAnimation.call(t, $(t.$options.ornaments[direction]));
          }
        }
      });

      $.each(t.$options.buttons, function(direction, elements) {
        var steps = t.__STEPS_LOOKUP[direction];

        $(elements).click(function(e) {
          e.preventDefault();
          t.$slideGrid.slidePage(steps.vertical, steps.horizontal, {maintainFullEdges: t.$options.maintainFullEdges});
        });

        $(elements).hover(
          function () { $(this).addClass("hover"); },
          function () { $(this).removeClass("hover"); }
        );
      });

      $(t.$options.overlays).click(function(e) {
        e.preventDefault();
        t.$slideGrid.findViewForClick(e).where().find('a:first').click();
      });
    },

    __STEPS_LOOKUP: {
      'left' :  {horizontal: -1, vertical:  0},
      'right':  {horizontal:  1, vertical:  0},
      'up'   :  {horizontal:  0, vertical: -1},
      'down' :  {horizontal:  0, vertical:  1}
    }
  });
})(jQuery);


(function($) {  
  TmzClass.create('TmzInfinipagerView', 'TmzView', {
    constructor: function(asyncArrayOfViews, options) {
      var t = this;
      
      options = $.extend({rows: 3, columns: 3, initialRowsShown: 2, trimBottom: 0, elementWidth: 0, elementHeight: 0, width: 0, height: 0}, options);
      TmzView.apply(this, [options]);

      t.$asyncArrayOfViews = asyncArrayOfViews;
      t.$nextTab = null;
      t.$elementsShowing = 0;
      t.$pane = null;
      t.$contents = null;
      t.$$nextGradient = null;
    },

    drawFunction: function() {
      var t = this;

      t.where().addClass('tmz-infinipager').css('position', 'relative');
      t.$pane = $("<div></div>")
                 .appendTo(t.where())
                 .css({position: 'relative', overflow: 'hidden', height: 0});
      t.$contents = $("<div></div>")
                     .appendTo(t.$pane);
      t.$pane.append('<div class="clear"></div>');
      t.$nextTab = $('<div class="next-tab"><div class="label"></div></div>')
                    .appendTo(t.where())
                    .css({'z-index': '10000'});
      t.$nextGradient = $('<div class="next-gradient"></div>').appendTo(t.where());
      t.setDimensions();
      t.displayTab();

      t.___addSubViews(t.$asyncArrayOfViews.localItems());
      t.$asyncArrayOfViews.addListener('remoteItemsFetchedBeforeCallback', function(items) { t.___addSubViews(items.fetched); });
      t.$asyncArrayOfViews.addListener('totalItemCountChanged', function() {t.displayTab();});
    },

    getDimensionsFromSubView: function(subView) {
      var t = this;

      if(subView) {
        t.$options.elementWidth = t.$options.elementWidth || subView.width();
        t.$options.elementHeight = t.$options.elementHeight || subView.height();
        t.$options.width = t.$options.width || (t.$options.elementWidth * t.$options.columns);
        t.$options.height = t.$options.height || (t.$options.elementHeight * t.$options.initialRowsShown);
      }
    },

    setDimensions: function() {
      this.$pane.width(this.$options.width);
      this.$contents.width(this.$options.elementWidth * this.$options.columns);
    },
    
    showMoreRows: function(rowIncrease, options) {
      var t = this;

      t.fireListener('showingMoreRows');
      t.$asyncArrayOfViews.fetch(t.elementsShowing(), rowIncrease * t.$options.columns, function(items) {
        var newElementsShowing = t.elementsShowing() + items.length;
        var newHeight = Math.ceil((newElementsShowing / t.$options.columns)) * t.$options.elementHeight - t.___calculateTrimBottom(newElementsShowing);
        var heightIncrease = newHeight - t.$pane.height();

        if(t.elementsShowing() !== 0) {
          $("html:not(:animated),body:not(:animated)").animate({ scrollTop: t.$pane.offset().top + t.$pane.height() - 10 }, {queue: true});
        }
        t.$pane.animate({height: "+=" + heightIncrease}, {queue: false});
        t.$elementsShowing += items.length;
        t.displayTab();
        t.fireListener('showedMoreRows');
      });
    },

    showNextPage: function(options) {
      this.showMoreRows(this.rowsInNextPage());
    },
        
    isShowingAllElements: function() {
      if(this.$asyncArrayOfViews.totalItemCount() === null) {
        return null;
      } else {
        return (this.$asyncArrayOfViews.totalItemCount() === this.elementsShowing());
      }
    },

    displayTab: function() {
      var text;

      if(this.isShowingAllElements() === true) {
        this.$nextTab.hide();
      } else {
        if(this.isShowingAllElements() === null) {
          text = "SEE MORE";
        } else if(this.elementsLeft() > this.elementsPerPage()) {
          text = "SEE MORE";
        } else {
          text = "SEE MORE";
        }

        $('> .label', this.$nextTab).html(text);  
        this.$nextTab.show();
      }
    },
    
    elementsPerPage: function() {
      return this.$options.rows * this.$options.columns;
    },
        
    elementsShowing: function() {
      return this.$elementsShowing;
    },

    elementsLeft: function() {
      return this.$asyncArrayOfViews.totalItemCount() - this.elementsShowing();
    },

    rowsInNextPage: function() {
      return Math.min(this.$options.rows, this.rowsLeft());
    },

    rowsShowing: function() {
      return (this.elementsShowing() / this.$options.rows);
    },

    rowsLeft: function() {
      return Math.ceil(this.elementsLeft() / this.$options.columns);
    },
        
    totalRows: function() {
      return Math.ceil(this.$asyncArrayOfViews.totalItemCount.length/this.$options.columns);
    },

    ___calculateTrimBottom: function(itemCount) {
       if(this.$asyncArrayOfViews.totalItemCount() && this.$asyncArrayOfViews.totalItemCount === itemCount) {
        return 0;
       } else {
        return this.$options.trimBottom;
       }
    },


    /* assuming all fetching is contiguous */
    ___addSubViews: function(subViews) {
      var t = this;

      this.getDimensionsFromSubView(subViews[0]);
      this.setDimensions();
      this.displayTab();

      $.each(subViews, function(i, subView) {
        var container = $('<div class="tmz-infinipager-element" style="float:left; width:' + t.$options.elementWidth +'px"></div>').appendTo(t.$contents);
        subView.setWhere(container);
        subView.draw();
        container.data('tmz-infinipager-element', subView);
      });
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzInfinipagerPresenter', {
    constructor: function(view, options) {
      var t = this;
      TmzObject.apply(this, [options]);

      t.$view = view;

      t.$view.addListener('showedMoreRows', function() {
        t.___bindNextTab();
      });
      
      t.$view.addListener('afterDraw', function() {
        $('.tmz-infinipager-element', t.$view.where()).click(function(e){
          e.preventDefault();
          if(typeof t.$options.itemClickCallback === "function") {
            t.$options.itemClickCallback.call(this, $(this).data('tmz-infinipager-element'));
          }
        });
        t.$view.show();
      });
    },

    destroy: function() {
      this.$view.destroy();
    },

    ___bindNextTab: function() {
      var t = this;
      t.$view.$nextTab.one('click', function(e) {
        e.preventDefault();
        if(!t.$view.isShowingAllElements()) {
          t.$view.showNextPage();
        }
      });
    }
  });
})(jQuery);

(function($) {  
  TmzClass.create('TmzInfinipager2View', 'TmzView', {
    constructor: function(slideGrid, options) {
      var t = this;

      t.$slideGrid = slideGrid;
      t.$nextTab = null;
      t.$nextGradient = null;
      
      TmzView.apply(this, [t.___processOptions(options)]);
    },

    ___processOptions: function(options) {
      return $.extend({displayOnlyFullRows: true, initialRows: 2, pageSize: 2}, options || {});
    },

    drawFunction: function() {
      var t = this;

      var realRowCount = t.$slideGrid.$gridLayout.rowCount();
      if(realRowCount < t.$options.initialRows) {
        t.$slideGrid.rowsShowing = realRowCount;
        t.addListener('afterDraw', function() {
          t.showRows(t.$options.initialRows);
        });
      } else {
        t.$slideGrid.resize(t.$options.initialRows, null);
      }

      if(t.$slideGrid.options().columnsShowing != t.$slideGrid.$gridLayout.totalColumnCount()) {
        t.error('TmzSlideGridView must be as wide as its underlying TmzGridLayout');
      }

      t.$slideGrid.draw({where: t.where()});

      t.where().append('<div style="clear:both;"></div><div class="next-tab" style="z-index: 10000; display: none">' + 
                       '<div class="label">SEE MORE</div></div><div class="next-gradient"></div>').
                css('position', 'relative');

      t.$nextTab = t.scoped('.next-tab:first');
      t.$nextGradient = t.scoped('.next-gradient:first');

      t.addListener('showedMoreRows', function() {
        t.updateTabAfterRowFetch();
      });
      t.addListener('afterDraw', function() {t.___setTab();});
      t.$slideGrid.$gridLayout.addListener('redrew', function() { 
        t.___setTab(); 
        t.fireListener('gridLayoutRedrew'); 
      });
      t.$slideGrid.$gridLayout.addListener('elementClicked', function(view, position, index) {
        t.fireListener('elementClicked', view, position, index);
      });

      t.___bindTab();
    },

    updateTabAfterRowFetch: function() {
      var t = this;

      t.___bindTab();
      t.___setTab();

      t.fireListener('afterUpdateTabAfterRowFetch');
    },
    
    showMoreRows: function(rowIncrease) {
      if(rowIncrease <= 0) { return false; }

      return this.showRows(this.rowsShowing() + rowIncrease);
    },

    showRows: function(rowTotal) {
      var t = this;
      t.fireListener('beforeShowRows');
      if(t.$slideGrid.$gridLayout.totalRowCount()) {
        rowTotal = Math.min(rowTotal, t.$slideGrid.$gridLayout.totalRowCount());
      }
      var elementCount = rowTotal * t.$slideGrid.$gridLayout.totalColumnCount();
      var oldRowsShowing = t.rowsShowing();

      t.fireListener('showingMoreRows');

      if(t.$slideGrid.$gridLayout.$subViews.localItems().length >= elementCount) {
        t.$slideGrid.resize(rowTotal, null);
      } else {
        t.$slideGrid.$gridLayout.$subViews.fetch(0, rowTotal * t.$slideGrid.$gridLayout.totalColumnCount(), function(items) {
          //CRZ: ### hack. resize() should take duration options.
          var acc = t.$slideGrid.options().resizeDuration;
          t.$slideGrid.setOptions({resizeDuration: 0});
          t.$slideGrid.resize(0, t.$slideGrid.$gridLayout.columnCount());
          t.$slideGrid.setOptions({resizeDuration: acc});
          t.$slideGrid.resize(Math.max(rowTotal, t.$slideGrid.$gridLayout.rowCount(), null));
        });
      }

      t.where().toggleClass('showing-all-rows', t.rowsUnshown() === 0);
      t.fireListener('showedMoreRows', t.rowsShowing() - oldRowsShowing);
    },

    elementsShowing: function() {
      var t = this;
      return t.rowsShowing() * t.$slideGrid.options().columnsShowing;
    },

    rowsShowing: function() {
      return this.$slideGrid.options().rowsShowing;
    },

    rowsUnshown: function() {
      if(this.$slideGrid.$gridLayout.totalRowCount()) {
        return this.$slideGrid.$gridLayout.totalRowCount() - this.$slideGrid.options().rowsShowing;
      } else {
        return null;
      }
    },

    isShowingAllRows: function() {
      if($.type(this.rowsUnshown()) === "null") {
        return true;
      } else {
        return this.rowsUnshown() <= 0;
      }
    },

    showNextPage: function() {
      this.showMoreRows(this.rowsInNextPage());
    },

    rowsInNextPage: function() {
      if(this.rowsUnshown()) {
        return Math.min(this.$options.pageSize, this.rowsUnshown());
      } else {
        return this.$options.pageSize;
      }
    },

    ___bindTab: function() {
      var t = this;
      t.$nextTab.one('click', function(e) {
        e.preventDefault();
        if(!t.isShowingAllRows()) {
          t.showNextPage();
        }
      });
    },

    ___setTab: function() {
      this.fireListener('beforeSetTab');

      var text;

      this.$nextTab.css('left', Math.max(0, (this.width() - this.$nextTab.width())/2));
      if(!this.isShowingAllRows()) {
        this.$nextTab.show();
        this.$nextGradient.show();
      } else {
        this.$nextTab.hide();
        this.$nextGradient.hide();
      }

      this.fireListener('afterSetTab');
    },
    
    //### remove on rename
    cssClassNames: function() {
      return 'tmz-infinipager';
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzSearchPickerView', 'TmzView', {
    constructor: function(newSearchArrayGenerator, options) {
      var t = this;

      t.$newSearchArrayGenerator = newSearchArrayGenerator;
      t.$searchPager = null;
      t.$clearedDefaultSearchValue = false;
      t.$lastSearchTerm = null;

      TmzView.apply(this, [t.___processOptions(options)]);
    },

    ___processOptions: function(options) {
      return $.extend({defaultSearchValue: 'SEARCH', defaultSearchResponseType: 'SEARCH RESULT'}, options || {});
    },

    performSearch: function(searchTerm) {
      var t = this;

      searchTerm = $.trim(searchTerm);
      
      if(searchTerm.length === 0) {
        return false;
      }
      
      t.showSearchPane();
      
      if(t.$lastSearchTerm !== searchTerm) {
        t.$lastSearchTerm = searchTerm;

        if(t.$searchPager) {
          t.$searchPager.destroy();
        }

        t.clearSearchTitle();

        var asyncArray = t.$newSearchArrayGenerator(searchTerm);
        asyncArray.addListener('totalItemCountChanged', t.setSearchTitle);
        asyncArray.fetch(0,25, function() {
          t.fireListener('gotSearchResults', asyncArray);
        });
      }
    },

    //CRZ: ugly, but atleast its dry
    setSearchInstanceVariables: function() {
      var t = this;
      t.$searchPane = $('.search-pane', t.where());
      t.$searchTitle = $('.title', t.$searchPane);
      t.$searchContents = $('.contents', t.$searchPane);
      t.$searchInput = $('input.search-input', t.where());
      t.$returnFromSearchLink = $('.return-from-search', t.where());
    },

    showSearchPane: function() {
      TmzClass.abstractMethod('showSearchPane()');
    },

    showMainPane: function() {
      TmzClass.abstractMethod('showMainPane()');
    },
    
    clearSearchTitle: function() {
      this.$searchTitle.html('');
    },

    setSearchTitle: function() {
      if(this.$searchPager) {
        var count = this.$searchPager.$view.$asyncArrayOfViews.totalItemCount();
        this.$searchTitle.html('FOUND' + (count !== null ? ' ' + count : '') + 
                              ' ' + this.$options.defaultSearchResponseType + ((count !== 1) ? 'S' : '') +
                              ' FOR "' + this.$lastSearchTerm + '"');
      }
    },

    ___initSearchBehavior: function() {
      var t = this;
      t.$searchInput.one('focus', function(e) {
        t.clearSearchValueIfDefault();
      });
      
      t.$searchInput.keypress(function(e) {
        if(e.keyCode === 13) {
          t.performSearch($(this).val());
        }
      });
      t.scoped('.search-button').click(function(e) {
        e.preventDefault();
        if(!t.clearSearchValueIfDefault()) {
          t.performSearch(t.$searchInput.val());
        }
      });
      
      t.$returnFromSearchLink.click(function(e) {
        e.preventDefault();
        t.$searchInput.val('');
        t.$searchInput.focus();
        t.showMainPane();
      });
    },

    clearSearchValueIfDefault: function() {
      if(!this.$clearedDefaultSearchValue) {
        this.$clearedDefaultSearchValue = true;
        this.$searchInput.val('');
        this.$searchInput.focus();
        return true;
      } else {
        return false;
      }
    }

  });
})(jQuery);

/* CRZ - CarouselGroup should probably be its own class */

(function($) {
  TmzClass.create('TmzSearchCarouselPaneView', 'TmzSearchPickerView', {
    constructor: function(carouselGroups, newSearchArrayGenerator, options) {
      var t = this;

      t.$currentFilterName = null;
      t.$filterOpened = false;
      t.$carouselGroups = carouselGroups || {};

      TmzSearchPickerView.apply(this, [newSearchArrayGenerator, t.___processOptions(options)]);
    },

    ___processOptions: function(options) {
      return $.extend({
        width: 900
      }, options || {});
    },

    showSearchPane: function() {
      this.$searchPane.show();
      $('.filterbar .filter', this.where()).css('visibility', 'hidden');
      this.$returnFromSearchLink.show();
      this.$carouselsPane.hide();
    },
    
    showMainPane: function() {
      this.$searchPane.hide();
      $('.filterbar .filter', this.where()).css('visibility', 'visible');
      this.$returnFromSearchLink.hide();
      this.$carouselsPane.show();
    },
    
    openFilterDropdown: function() {
      $('.filterbar .filter-list .filter-item', this.where()).show(50);
      this.$filterOpened = true;
    },
    
    closeFilterDropdown: function() {
      var t = this;
      $('.filterbar .filter-list .filter-item', this.where()).show().filter(function(i, el) {return $(el).html() !== t.$currentFilterName;}).hide();

      this.$filterOpened = false;
    },
    
    chooseCarouselGroup: function(filterName) {
      var t = this;

      if(filterName !== this.$currentFilterName) {
        this.$currentFilterName = filterName;
        var groups = $('.carousel-group', t.where());
        var turnOn = groups.filter(function(i, el) {return $(el).data('carouselGroupName') === filterName;});
        var turnOff = groups.not(turnOn);
      
        if(turnOff.size() !== 0) {
          turnOff.fadeOut('fast', function() {
            turnOn.fadeIn('slow');
          });
        } else {
          turnOn.fadeIn('slow');
        }
      }
    },

    width: function() { 
      return 900;
    },
    
    height: function() {
      return 0;
    },

    /* smells... */
    ___carouselGroupNames: function() {
      return $.map(this.$carouselGroups, function(value, name) { return name;});
    },
    
    html: function() {
      var h = $('<div class="filterbar">' + 
         '<div class="filters"><div class="filter"><div class="label">Show</div><div class="filter-list">' +
         $.map(this.___carouselGroupNames(), function(name,i) { return '<div class="filter-item" style="display:none;">' + name + '</div>'; }).join('') +
         '</div></div><div style="clear:both"></div></div>' +
         '<div class="return-from-search">clear results</div>' +
         '<div class="search-button"></div>' +
         '<div class="search search-frame"><input type="text" class="search-input" value="' + this.$options.defaultSearchValue + '"/></div></div>' +
         '<div class="carousels-pane"></div>' +
         '<div class="search-pane"><div class="header"><h3 class="title"></h3><div class="clear"></div></div><div class="contents"></div></div>')
       .width(this.$options.width);

      if(this.___carouselGroupNames().length < 2) {
        h.find('.filter').remove();
      }

      return h;
    },

    drawFunction: function() {
      var t = this;

      t.where().append(t.html());
      t.$carouselsPane = $('.carousels-pane', t.where());
      t.setSearchInstanceVariables();

      $.each(t.$carouselGroups, function(groupName, carousels) {
        var group = $('<div class="carousel-group">')
          .css('display', 'none')
          .appendTo(t.$carouselsPane)
          .after('<div class="clear"></div>')
          .data('carouselGroupName', groupName);

        $.each(carousels, function(i, carousel) {
          var holder = $('<div></div>').appendTo(group);
          carousel.setWhere(holder);
          carousel.draw();
        });
       });

      t.addListener('gotSearchResults', function(asyncArray) {
        var view = new TmzInfinipagerView(asyncArray, {where:t.$searchContents});
        t.$searchPager = new TmzInfinipagerPresenter(view, {width: 900, itemClickCallback: t.$options.itemClickCallback});
        t.setSearchTitle();
        view.setWhere(t.$searchContents);
        view.draw();
        view.showNextPage();
      });

      t.___initSearchBehavior();
      t.___initFilterBehavior();
      t.chooseCarouselGroup(t.___carouselGroupNames()[0]);
      t.showMainPane();
      t.closeFilterDropdown();
    },

    ___initFilterBehavior: function() {
      var t = this;
      $('.filter-list').click(function(e) {
        if(t.$filterOpened) {
          t.closeFilterDropdown();
        } else {
          t.openFilterDropdown();
        }
      });

      $('.filter-list .filter-item').click(function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(t.$filterOpened) {
          t.chooseCarouselGroup($(this).html());
          t.closeFilterDropdown();
        } else {
          t.openFilterDropdown();
        }
      });
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGalleryGridThumbView', 'TmzThumbView', {
    constructor: function(model, options) {
      this.$imageView = null;

      options = $.extend({width: 171, height: 138}, options || {});
      TmzThumbView.apply(this, [model, options]);
    },

    drawFunction: function() {
      this.where().append('<div class="image"></div>');

      var size = this.$model.size('150x150');
      if(size) {
        this.$imageView = new TmzImageView(size.url, 
                          {mode: 'fullframe', originalWidth: size.width, originalHeight: size.height, width: 169, height: 128, where: $('> .image', this.where())});
        this.$imageView.draw();
      }
    },

    select: function() {
      if(!this.wasDrawn()) {
        throw("cannot select before drawing");
      }
      this.where().addClass('selected');
    },

    deselect: function() {
      if(!this.wasDrawn()) {
        throw("cannot select before drawing");
      }
      this.where().removeClass('selected');
    }
  });
})(jQuery);


//CRZ: next/prev buttons cannot be <a/>'s because omniture interferes with animation

(function($) {
  TmzGalleryView = TmzClass.create('TmzGalleryView', 'TmzView', {
    DEBUG_LIMIT_TRAFFIC: false, //CRZ: very hard to debug things with ad/share traffic and errors. use this switch.
    MANIPULATE_HISTORY: true,

    constructor: function(model, options) {
      var t = this;
      t.$model = model;
      options = $.extend({startingSlug: null, getIndexFromAnchor: true, chainGalleries: true, incept: false}, (options || {}));
      TmzView.apply(this, [options]);

      t.init();
    },

    init: function() {
      var t = this;
      var index;

      t.$interstitialAd = null;
      t.$rightrailAd = null;
      t.$galleryTwitter = null;
      t.$galleryFbLike = null;
      t.$currentView = 'single'; //or 'grid'
      t.$index = 0;
      t.$navigationCount = 1; //one for initial page
      t.$showingAd = false;
      t.$preloadedImages = [];
      t.$preloadWindowSize = 3;
      t.$gridLayout = null;
      t.$thumbViews = null;
      t.$currentImageView = null;
      t.$initialLoad = (typeof t.$initialLoad === "boolean") ? t.$initialLoad : true; //CRZ: initialLoad doesnt reset, for chaining

      //CRZ: if we are looking for anchors, try to find one
      if(t.$options.getIndexFromAnchor) {
        index = t.___getIndexFromAnchor();
      }

      //CRZ: if we're not looking for anchors, or we couldnt find one, using startingSlug.
      if(!index && t.$options.startingSlug) {
        index = this.___getIndexByAttr('slug', t.$options.startingSlug);
      }

      //CRZ: fallback to first image if no anchor or slug
      t.$startingImageIndex = index ? index : 0;
      t.$index = t.$startingImageIndex;
    },

    model: function() {
      return this.$model;
    },

    setModel: function(model, options) {
      var t = this;

      t.$options = $.extend(t.$options, {getIndexFromAnchor: false, startingSlug: null});
      t.$model = model;
      t.destroy();
      t.init();
      t.___redraw();
    },

    showSingleView: function() {
      this.where().css('z-index', '0'); // ### PNS: Right rail ad is currently displayed outside of this due to the switching mechanics so we need to do some z-index swapping depending on the view.
      this.$currentView = 'single';
      $('> .single-view', this.where()).show();
      $('> .grid-view', this.where()).hide();
      $('> .end-slate', this.where()).hide();
      $('> .header > .change-view-button', this.where()).addClass('grid-view-button').removeClass('single-view-button');
    },

    showGridView: function() {
      this.where().css('z-index', '205'); // ### PNS: Right rail ad is currently displayed outside of this due to the switching mechanics so we need to do some z-index swapping depending on the view.
      this.$currentView = 'grid';
      $('> .single-view', this.where()).hide();
      $('> .grid-view', this.where()).show();
      $('> .end-slate', this.where()).hide();
      $('> .header > .change-view-button', this.where()).addClass('single-view-button').removeClass('grid-view-button');
    },

    showEndSlate: function() {
      this.$currentView = 'endSlate';
      $('> .single-view', this.where()).hide();
      $('> .grid-view', this.where()).hide();
      $('> .end-slate', this.where()).show();
    },

    destroy: function() {
      var t = this;
      t.$interstitialAd.destroy();
      t.$rightrailAd.destroy();
      t.$gridLayout.destroy();
      t.$slideGrid.destroy();
      t.$gridCarouselPresenter.destroy();
      t.$thumbViews.destroy();
      t.$fbShare.destroy();
      t.$stumbleUpon.destroy();
      t.$pinterest.destroy();
      t.$galleryFbLike.destroy();
      t.$galleryTwitter.destroy();
    },
    drawFunction: function() {
      var t = this;

      t.where().append(
        '<div class="header">' +
          '<h1 class="title">' + this.$model.title() + '</h1>' +
          '<div class="gallery-sharing">' +
            '<p>Share Gallery:</p>' +
        '<div class="fb_share"></div>' +
            '<div class="twitter"></div>' +
          '</div>' +
          '<div href="javascript:void(0);" class="change-view-button"></div>' +
        '</div>' +
        '<div class="single-view">' +
          '<div class="image-sharing"><p>Share Image: </p><div class="pinterest"></div><div class="stumbleupon"></div><div class="fb_share"></div><div style="clear:both"></div></div>' +
          '<a href="/photos" class="more-galleries" target="_parent"></a>' +
          '<div class="prev"></div>' +
          '<div class="image-wrapper">' +
            '<div class="interstitial_ad_wrapper"><div class="interstitial_ad"></div></div>' +
        '<div class="poll"></div>' +
            '<div class="image"></div>' +
            '<p class="credit"></p>' +
          '</div>' +
          '<div class="next"></div>' +
          '<div class="right">' +
            '<div class="meta">' +
              '<p class="image_count"></p>' +
              '<p class="caption"></p>' +
        '</div>' +
        '<div class="ad"></div>' +
          '</div>' +
        '</div>' +
        '<div class="end-slate">' +
          '<div class="recent-galleries">' +
            '<div class="list">' +
                //AL: Gravity RR Most Recent Gallery
                '<div id="grv-personalization-16"></div>' +
            '</div>' +
          '</div>' +
          '<div class="restart"></div>' +
          '<div class="related-galleries">' +
          '<div class="list">' +
              //AL: Toobla Related Gallery Implementation
              '<div id="grv-personalization-14"></div>' +
          '</div>' +
        '</div>' +
          '<a href="/photos" class="more-galleries" target="_parent"></a>' +
        '</div>' +
        '<div class="grid-view">' +
          '<div class="left"><div class="prev"></div></div>' +
          '<div class="grid"></div>' +
          '<div class="right"><div class="next"></div></div>' +
        '</div>'
      );

      //AL: Taboola Related Gallery Integration
        (function(){
            window.gravityInsightsParams = {
                'type': 'content',
                'action': '',
                'site_guid': '82893b79564009a4d8fab7b9db32cfea'
            };
            var adServerReq,bUrl,cburl,doUseGravityUserGuid,includeJs,jq,pfurl,type,ug,wlPrefix,wlUrl,_ref,_ref1,_ref2;includeJs=function(a){var b;b=document.createElement("script");b.async=!0;b.src=a;a=document.getElementsByTagName("script")[0];return a.parentNode.insertBefore(b,a)};bUrl="";ug=(doUseGravityUserGuid=!0===gravityInsightsParams.useGravityUserGuid?1:0)?"":gravityInsightsParams.user_guid||(null!=(_ref=/grvinsights=([^;]+)/.exec(document.cookie))?_ref[1]:void 0)||"";
            wlUrl=(wlPrefix="http://rma-api.gravity.com/v1/api/intelligence",jq=(null!=(_ref1=window.jQuery)?null!=(_ref2=_ref1.fn)?_ref2.jquery:void 0:void 0)||"",type="iframe",adServerReq=gravityInsightsParams.ad||"",cburl=gravityInsightsParams.cburl||"",pfurl=gravityInsightsParams.pfurl||"",""+wlPrefix+"/wl?jq="+jq+"&sg="+gravityInsightsParams.site_guid+"&ug="+ug+"&ugug="+doUseGravityUserGuid+"&id=grv-personalization-14&pl=14"+("&type="+type+"&ad="+adServerReq+"&cburl=")+encodeURIComponent(cburl)+"&pfurl="+
                encodeURIComponent(pfurl)+("&x="+(new Date).getTime())+("undefined"!==typeof forceArticleIds&&null!==forceArticleIds&&forceArticleIds.join?"&ai="+forceArticleIds.join(","):"")+("undefined"!==typeof apids&&null!==apids&&""!==apids?"&apids="+encodeURIComponent(apids):""));bUrl&&includeJs(bUrl);wlUrl&&(window.gravityInsightsParams.sidebar&&(window.gravityInsightsParams.wlStartTime=(new Date).getTime()),includeJs(wlUrl));})();
      //AL: Gravity RR Most Recent Gallery
        (function(){
            window.gravityInsightsParams = {
                'type': 'content',
                'action': '',
                'site_guid': '82893b79564009a4d8fab7b9db32cfea'
            };
            var adServerReq,bUrl,cburl,doUseGravityUserGuid,includeJs,jq,pfurl,type,ug,wlPrefix,wlUrl,_ref,_ref1,_ref2;includeJs=function(a){var b;b=document.createElement("script");b.async=!0;b.src=a;a=document.getElementsByTagName("script")[0];return a.parentNode.insertBefore(b,a)};bUrl="";ug=(doUseGravityUserGuid=!0===gravityInsightsParams.useGravityUserGuid?1:0)?"":gravityInsightsParams.user_guid||(null!=(_ref=/grvinsights=([^;]+)/.exec(document.cookie))?_ref[1]:void 0)||"";
            wlUrl=(wlPrefix="http://rma-api.gravity.com/v1/api/intelligence",jq=(null!=(_ref1=window.jQuery)?null!=(_ref2=_ref1.fn)?_ref2.jquery:void 0:void 0)||"",type="iframe",adServerReq=gravityInsightsParams.ad||"",cburl=gravityInsightsParams.cburl||"",pfurl=gravityInsightsParams.pfurl||"",""+wlPrefix+"/wl?jq="+jq+"&sg="+gravityInsightsParams.site_guid+"&ug="+ug+"&ugug="+doUseGravityUserGuid+"&id=grv-personalization-16&pl=16"+("&type="+type+"&ad="+adServerReq+"&cburl=")+encodeURIComponent(cburl)+"&pfurl="+
                encodeURIComponent(pfurl)+("&x="+(new Date).getTime())+("undefined"!==typeof forceArticleIds&&null!==forceArticleIds&&forceArticleIds.join?"&ai="+forceArticleIds.join(","):"")+("undefined"!==typeof apids&&null!==apids&&""!==apids?"&apids="+encodeURIComponent(apids):""));bUrl&&includeJs(bUrl);wlUrl&&(window.gravityInsightsParams.sidebar&&(window.gravityInsightsParams.wlStartTime=(new Date).getTime()),includeJs(wlUrl));})();
      //END Gravity RR Most Recent Gallery

      t.$galleryFbLike = new TmzFacebookLikeView({where: t.scoped('> .header > .gallery-sharing > .fb_share'), href: t.$model.permalink()});
      t.$galleryFbLike.draw();

      t.$galleryTwitter = new TmzTwitterView({
        where: t.scoped('> .header > .gallery-sharing > .twitter'),
                                              href: t.$model.permalink(), via: "TMZ", related: "HarveyLevinTMZ", title: t.$model.title()});
      t.$galleryTwitter.draw();

      t.$interstitialAd = new TmzDartAdView("adpos3", {incept: t.$options.incept, where: t.scoped('> .single-view > .image-wrapper > .interstitial_ad_wrapper > .interstitial_ad')});

      //check to see if ads should be displayed
      if (this.$model.safeGallery()) {
        t.$rightrailAd = new TmzDartAdView("adpos2", {
          incept: t.$options.incept,
          where: t.scoped('> .single-view > .right > .ad')
        });
        t.$rightrailAd.draw();
      } else {

      }

      t.preloadWindow(); //CRZ: do it here so we load these before all the thumbs, sharing, ads etc.

      t.$thumbViews = new TmzLocalAsyncArray($.map(t.$model.images(), function(image, index) {return new TmzGalleryGridThumbView(image);}));
      t.$gridLayout = new TmzGridLayout(t.$thumbViews, {rows: 3, rowSpacing: 29, columnSpacing: 108, pageSize: 3, layoutOrder: 'row-first'});
      t.$slideGrid = new TmzSlideGridView(t.$gridLayout, {columnsShowing: 3, rowsShowing: 3, where: $('> .grid-view > .grid', t.where())});
      t.$gridCarouselPresenter = new TmzCarouselPresenter(t.$slideGrid, {buttons: {left: t.scoped('> .grid-view > .left > .prev'), right: t.scoped('> .grid-view > .right > .next')}});
      t.$slideGrid.draw();

      t.$gridLayout.addListener('elementClicked', function(view, position, index) {
        t.showSingleView();
        t.renderImage(index);
      });

      /*
      *  End Slate
      */

      if(t.$options.lightbox) {
        var endSlateMarginTop = 90 - t.scoped('> .header > .title').outerHeight();
        t.scoped('> .end-slate').css('margin-top', endSlateMarginTop);
      }

/*      t.$endSlateRecentThumbViews = new TmzLocalAsyncArray($.map(t.$model.recentGalleries(), function(gallery, index) {return new TmzGalleryRecentThumbView(gallery);}));
      t.$endSlateRecentGalleriesGridLayout = new TmzGridLayout(t.$endSlateRecentThumbViews, {rows: 3, rowSpacing: 17, columnSpacing: 0, pageSize: 1, layoutOrder: 'row-first', where: t.scoped('> .end-slate > .recent-galleries > .list')});
 t.$endSlateRecentGalleriesGridLayout.addListener('elementClicked', function(view) {
        t.endSlateThumbClick(view);
      });
      t.$endSlateRecentGalleriesGridLayout.draw();*/

/*      t.$endSlateRelatedThumbViews = new TmzLocalAsyncArray($.map(t.$model.relatedGalleries(), function(gallery, index) {return new TmzGalleryRelatedThumbView(gallery);}));
      t.$endSlateRelatedGalleriesGridLayout = new TmzGridLayout(t.$endSlateRelatedThumbViews, {rows: 1, rowSpacing: 29, columnSpacing: 34, pageSize: 3, layoutOrder: 'row-first', where: t.scoped('> .end-slate > .related-galleries > .list')});
 t.$endSlateRelatedGalleriesGridLayout.addListener('elementClicked', function(view) {
        t.endSlateThumbClick(view);
      });
      t.$endSlateRelatedGalleriesGridLayout.draw();*/


      t.scoped('> .end-slate > .restart').click(function(e) {
        t.renderImage(0);
        t.showSingleView();
      });

      $('> .single-view > .next', t.where()).click(function(e) {e.preventDefault(); t.navigate(1);} );
      $('> .single-view > .prev', t.where()).click(function(e) {e.preventDefault(); t.navigate(-1);} );
      t.scoped('> .single-view > .image-wrapper > .image').click(function(e) {e.preventDefault(); t.navigate(1);} );

      $('> .single-view > .next, > .single-view > .prev', t.where()).hover(
        function () { $(this).addClass("hover"); },
        function () { $(this).removeClass("hover"); }
      );

      $('> .header > .change-view-button', t.where()).click(function() {
        if(t.$currentView === 'grid') {
          t.showSingleView();
          customAdId('tmz.photoGallery.change-view-button.single');
        } else {
          t.showGridView();
          customAdId('tmz.photoGallery.change-view-button.grid');
        }
      });
      t.showSingleView();

      t.renderImage(t.$startingImageIndex);
    },

    endSlateThumbClick: function(view) {
      var t = this;
      t.changeGallery(view.$model.permalink())
      return false;
    },

    preloadWindow: function() {
      var i, idx;

      for (i = this.$index - this.$preloadWindowSize; i < this.$index + this.$preloadWindowSize; i++) {
        idx = (i < 0) ? this.$model.images().length + i : i;
        if (idx >= this.$model.images().length || idx < 0) {
          idx = 0;
        }

        var imgSrc = this.$model.images()[idx].url('480w');

        if($.inArray(imgSrc, this.$preloadedImages) === -1) {
          this.$preloadedImages.push(imgSrc);
          var image = new Image();
          image.src = imgSrc;
        }
      }
    },

    lightboxPermalink: function(permalink) {
      return permalink.replace(/\.com\/photos\//, ".com/lightbox/photos/");
    },

    changeGallery: function(permalink) {
      var t = this;
      var url = permalink;
      if(t.$options.lightbox) {
        url = t.lightboxPermalink(url);
      }
      window.location = url;
      return false;

      permalink = permalink.replace(/\/$/, '') + ".json";

      $.ajax({
        url: permalink,
        dataType: 'json',
        success: function(json) {
          t.setModel(new TmzGalleryModel(json));
        }
      });
    },

    atEndOfGallery: function() {
      return this.$index === this.$model.images().length - 1;
    },

    atBeginningOfGallery: function() {
      return this.$index === 0;
    },

    navigate: function(direction) {
      if(this.atEndOfGallery() && (direction === 1)) {
        this.showEndSlate();
        return false;
      }

      if(this.$options.chainGalleries) {
        var chainGallery;
        if (this.$model.nextGallery() && (direction === 1) && this.atEndOfGallery()) {
          chainGallery = this.$model.nextGallery();
        }
        else if (this.$model.prevGallery() && (direction === -1) && this.atBeginningOfGallery()) {
          chainGallery = this.$model.prevGallery();
        }

        if(chainGallery) {
          this.changeGallery(chainGallery.permalink());
          return false;
        }
      }

      /* ZOOM
          $('.image-wrapper', this.where()).removeClass('zoomview');
      */

      this.$navigationCount++;

      if (this.shouldRefreshRightrailAd()) {

        if (this.$model.safeGallery()) {
          this.refreshRightrailAd();

        } else {
        }
      }

      if (this.shouldDisplayAd()) {
        this.displayAd();
        return false;
      }

      var newIndex;
      if (direction === 1) {
        newIndex = this.___nextIndex();
      } else if (direction === -1) {
        newIndex = this.___previousIndex();
      }
      this.renderImage(newIndex);
    },

    renderImage: function(idx, options) {
      var t = this;
      options = $.extend({changePermalink: true}, options || {});

      if(!t.$model.images()[idx]) {
        return false;
      }

      t.$thumbViews.localItems()[t.$index].deselect();
      t.$thumbViews.localItems()[idx].select();

      t.$index = idx;
      var image = t.$model.images()[idx];

      /* ZOOM
      if (image.hasZoomview()) {
        $('.image-wrapper', t.where()).addClass('zoomview');
        t.___imageDiv().empty().append('<a href="' + image.src_path + '" class="cloud-zoom" rel="position: \'inside\' , showTitle: false">' + '<img src="' + image.full_path + '" title="" alt=""/></a>');
        $('a',t.___imageDiv()).CloudZoom();
        var cz = $('a', t.___imageDiv()).data('zoom');

        cz.whenFinishedLoading(function() {
          cz.center();
        });

        var zoomspots = $('.zoomspots', t.where()).empty();
        $.each(image.zoomspots(), function() {
          var zoomspot = this;
          $('<li><a href="javascript:void(0)">' + this.name + '</a></li>').click(function(e) {
            e.preventDefault();
            cz.zoomTo(zoomspot.zoomlevel);
            cz.centerAt(zoomspot.x, zoomspot.y);
          }).appendTo(zoomspots);
        });
      } else {
        $('.single-view > .image-wrapper > .image', t.where()).empty().append('<img src="' + image.url('480w') + '"/>');
      }
      */
      if(t.$currentImageView) {
        t.$currentImageView.destroy();
      }

      var imageSize = image.size('480w');
      if(imageSize) {
        t.$currentImageView = new TmzImageView(imageSize.url,
                                  {originalWidth: imageSize.width, originalHeight: imageSize.height, width: 548, height: 480, mode: 'bordered'});
        t.$currentImageView.setWhere($('.single-view > .image-wrapper > .image', t.where()));
        t.$currentImageView.draw();
      }

      if(t.$currentPollView) {
        t.$currentPollView.destroy();
      }

      if(image.hasPoll()) {
        t.$currentPollView = new TmzLegacyPollView(image.pollCode());
        t.$currentPollView.setWhere($('.single-view > .image-wrapper > .poll', t.where()));
        t.$currentPollView.draw();
      }

      $('.single-view > .right > .meta > .image_count', t.where()).html(t.___imageCountView(t.$index));
      $('.single-view > .right > .meta > .caption', t.where()).html(t.___displayedCaption());
      $('.single-view > .image-wrapper > .credit', t.where()).html(image.credit());
      $('> .single-view > .image-sharing', this.where()).show();

      if (t.$showingAd) {
        t.hideAd();
      }
      t.preloadWindow();

      if(options.changePermalink) {
        t.___setImagePermalink();
      }

      t.___renderImageSharing();

      if (!t.$initialLoad) {
        try { var s_code=s.t(); } catch(e) {}
        try { if(Nielsen_Event) {Nielsen_Event(true);} } catch(e) {}
        try {
          if(t.$options.comscoreJsUrl) {
            var url = t.$options.comscoreJsUrl + '?' + Math.random().toString().slice(2, 15);
            $('head').append($('<script type="text/javascript"></script>').attr('src', url));
          } else {
            $.ajax({
              type: 'GET',
              url: '/comscore.xml',
              cache: false
            });
          }
          COMSCORE.beacon({
            c1: 2,
            c2: "3000013",
            c3: "3000013",
            c4: "",
            c5: "",
            c6: "",
            c15: ""
          });
        } catch(e) {}
      }
      t.$initialLoad = false;
    },

    shouldDisplayAd: function() {


      if (!this.$interstitialAd || !this.$model.hasInterstitials() || !this.$model.safeGallery()) {

        return false;
      } else {

        return (this.$navigationCount % this.$model.interstitialFrequency()) === 0;
      }
    },

    displayAd: function() {

      if (this.$model.safeGallery()) {
        //check to see if this is a gallery that can have ads on it

      if(this.DEBUG_LIMIT_TRAFFIC) {
        return true;
      }

      var ord = Math.random() * 10000000000000000;
      this.$showingAd = true;
      $('> .single-view > .image-wrapper > .interstitial_ad_wrapper', this.where()).show();
      $('> .single-view > .right > .meta > .caption', this.where()).html('');
      $('> .single-view > .image-wrapper > .credit', this.where()).html('');
      $('> .single-view > .image-wrapper > .image', this.where()).empty();
      $('> .single-view > .image-sharing', this.where()).hide();
      if(this.$currentPollView) {
        this.$currentPollView.destroy();
      }
      if(this.$interstitialAd.wasDrawn()) {
        //this.$interstitialAd.refresh();
        wbads.showAds();  // Need to render interstitial
      } else {
        this.$interstitialAd.draw();
        wbads.buildSlots();
        wbads.showAds();  // Need to render interstitial
      }

      } else {

        //no ads
        return false;

      }
    },

    shouldRefreshRightrailAd: function() {
        return (this.$navigationCount % this.$model.rightrailFrequency()) === 0;
    },

    refreshRightrailAd: function() {
        if(this.DEBUG_LIMIT_TRAFFIC) {
            return true;
        }

        var ord = Math.random() * 10000000000000000;

        if(this.$rightrailAd.wasDrawn()) {
            //this.$rightrailAd.refresh();
            wbads.showAds();  // showAds() again to refresh refreshable ads.
        } else {
            this.$rightrailAd.draw();
        }
    },

    hideAd: function() {
      $('> .single-view > .image-wrapper > .interstitial_ad_wrapper', this.where()).hide();
      this.$showingAd = false;
    },

    ___getIndexByAttr: function(attr, value) {
      var i;
      for (i = 0; i < this.$model.images().length; i++) {
        if (this.$model.images()[i][attr]() === value) {
          return i;
        }
      }
      return 0;
    },

    currentImage: function() {
      return this.$model.images()[this.$index];
    },

    ___renderImageSharing: function() {
      var t = this;

      if(t.DEBUG_LIMIT_TRAFFIC) {
        return true;
      }

      if(t.$fbShare) { t.$fbShare.destroy(); }
      t.$fbShare = new TmzFacebookCustomShareView({where: t.scoped('> .single-view > .image-sharing > .fb_share'), href: t.currentImage().permalink()});
      t.$fbShare.draw();

      if(t.$stumbleUpon) { t.$stumbleUpon.destroy(); }
      t.$stumbleUpon = new TmzStumbleUponView({where: t.scoped('> .single-view > .image-sharing > .stumbleupon'), href: t.currentImage().permalink()});
      t.$stumbleUpon.draw();

      if(t.$pinterest) { t.$pinterest.destroy(); }
      t.$pinterest = new TmzPinterestView({where: t.scoped('> .single-view > .image-sharing > .pinterest'),
                                           href: t.currentImage().permalink(),
                                           description: t.currentImage().caption(),
                                           photo_url: (t.$currentImageView) ? t.$currentImageView.url() : ""});
      t.$pinterest.draw();
    },

    ___displayedCaption: function() {
      var caption = this.currentImage().caption();
      return ((!caption) ? this.$model.title() : caption);
    },

    ___imageCountView: function(idx) {
      return '<span class="current_index"><span class="pound">#</span>' + (idx + 1) + "</span> of " + this.$model.images().length;
    },

    ___nextIndex: function() {
      if (this.$index + 1 > this.$model.images().length - 1) {
        return 0;
      } else {
        return this.$index + 1;
      }
    },

    ___previousIndex: function() {
      if(this.$index - 1 < 0) {
        return this.$model.images().length - 1;
      } else {
        return this.$index - 1;
      }
    },

    //CRZ: in case of hashbang link
    ___getIndexFromAnchor: function() {
      var match = window.location.href.match(/\#\!\/(images)\/(\d{4}\/\d{2}\/\d{2}\/[A-Za-z0-9\-]+)\/?/);
      if(match) {
        return this.___getIndexByAttr('slug', match[2]);
      } else {
        var id = $.url(window.location.href).fparam('id');
        if(id) {
          return this.___getIndexByAttr('symbolforce-id', id);
        }
      }

      return null;
    },

    ___setImagePermalink: function() {
      var t = this;

      if(t.MANIPULATE_HISTORY && window.history && window.history.replaceState) {
          // UPDATE: make sure to keep query string
        window.history.replaceState(t.$index, t.currentImage().caption(), $.url(t.currentImage().permalink()).attr('path')+window.location.search);
      } else {
        window.location.hash = "#!/images/" + this.currentImage().slug();
      }
    },

    //CRZ### - put in utility class
    ___template: function(str, o) {
      return str.replace(/\{([^{}]*)\}/g, function(a, b) {
        var r = o[b];
        if (!r) { return ""; }
        return (typeof r === 'string' || typeof r === 'number') ? r : a;
      });
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzLegacyPollView', 'TmzView', {
    constructor: function(pollCode, options) {
      var t = this;
      options = $.extend((options || {}));
      TmzView.apply(t, [options]);

      t.$pollCode = pollCode;
    },

    drawFunction: function() {
      this.where().append(this.$pollCode);
    }
  });
})(jQuery);


/*
  Options: 
    layoutOrder: one of ['row-first', 'column-first']
    rows: maximum number of rows (must define either rows or columns)
    columns: maximum number of columns (must define either rows or columns)
    pageSize: if non-null, lays out in pages of pageSize. 
              interpreted as number of columns if you've defined rows, number of rows if you've defined columns

  Example: layoutOrder: 'row-first', columns: 2
    1 2
    3 4
    5 6
    7 8
  Example: layoutOrder: 'column-first', columns: 2
    1 5
    2 6
    3 7
    4 8
  Example: layoutOrder: 'row-first', rows: 2
    1 2 3 4
    5 6 7 8
  Example: layoutOrder: 'column-first', rows: 2
    1 3 5 7
    2 4 6 8
  Example: layoutOrder: 'column-first', columns: 2, pageSize: 2
    1 3 
    2 4 
    5 7
    6 8
  Example: layoutOrder: 'row-first', rows: 2, pageSize: 2
    1 2 5 6
    3 4 7 8

Errata:
  - every columns must be same width, every row must be same height
  - columnWidth/rowHeight is fetched from subviews. it will return null unless there is one fetched.
  - subViews must be a TMZAsyncArray. it will only use local items
  - it will not update if remote items are later fetched.
  - columns must all be same width, rows same height
*/

(function($) {
  TmzClass.create('TmzGridLayout', 'TmzView', {
    DEBUG: false, //For internal debugging

    constructor: function(subViews, options) {
      var t = this;
      t.$subViews = subViews;
      t.$gridRepresentation = null;
      options = $.extend({
        rowSpacing: 20, 
        columnSpacing: 20, 
        columnSpacerHtml: '<div></div>', 
        rowSpacerHtml: '<div></div>',
        columns: null, 
        rows: null, 
        layoutOrder: 'column-first', 
        pageSize: null
      }, options || {});

      t.$options = options; //###: CRZ: bit awkward, have to do it since calculateGridRepresentation relies on t.$options
      t.___calculateGridRepresentation();

      subViews.addListener('remoteItemsFetchedAfterCallback', function() {
        t.___calculateGridRepresentation();
        if(t.wasDrawn()) {
          t.___drawGrid();
        }
        t.fireListener('redrew');
      });

      TmzView.apply(this, [options]);
    },

    columnCount: function() {
      var columns = 0;
      $.each(this.$gridRepresentation, function(i, e) {
        columns = Math.max(e.length, columns);
      });

      return columns;
    },

    rowCount: function() {
      return this.$gridRepresentation.length;
    },

    virtualRowCount: function(elementCount) {
      return this.$options.rows || Math.ceil(elementCount / this.$options.columns);
    },

    virtualColumnCount: function(elementCount) {
      return this.$options.columns || Math.ceil(elementCount / this.$options.rows);
    },

    //null if no max
    maxRows: function() {
      return this.$options.rows;
    },

    //null if no max
    maxColumns: function() {
      return this.$options.columns;
    },

    totalRowCount: function() {
      var t = this;

      return (t.$subViews.totalItemCount()) ? t.virtualRowCount(t.$subViews.totalItemCount()) : t.$options.rows;
    },

    totalColumnCount: function() {
      var t = this;

      return (t.$subViews.totalItemCount()) ? t.virtualColumnCount(t.$subViews.totalItemCount()) : t.$options.columns;
    },

    /* left and right edge */
    columnOffsets: function(index) {
      var t = this;

      if(index >= this.columnCount()) {
        return {
          y1: t.width(), 
          y2: t.width()
        };
      } else {
        return {
          y1: index*t.outerColumnWidth(0),
          y2: index*t.outerColumnWidth(0) + t.outerColumnWidth(index)
        };
      }
    },

    /* top and bottom edge */
    rowOffsets: function(index) {
      var t = this;

      if(index >= this.rowCount()) {
        return {
          x1: t.height(), 
          x2: t.height()
        };
      } else {
        return {
          x1: index*t.outerRowHeight(0),
          x2: index*t.outerRowHeight(0) + t.outerRowHeight(index)
        };
      }
    },

    /* if there were enough data, what would the width/height be? */
    virtualColumnsWidth: function(numColumns) {
      return (this.columnWidth() * numColumns) + (this.$options.columnSpacing * (numColumns-1));
    },

    virtualRowsHeight: function(numRows) {
      return (this.rowHeight() * numRows) + (this.$options.rowSpacing * (numRows-1));
    },

    outerColumnWidth: function(index) {
      if(index >= this.columnCount()) {
        return 0;
      }
      else if(index === (this.columnCount() - 1)) { 
        return this.columnWidth();

      } else {
        return this.columnWidth() + this.$options.columnSpacing;
      }
    },

    outerRowHeight: function(index) {
      if(index >= this.rowCount()) {
        return 0;
      }
      else if(index === (this.rowCount() - 1)) {
        return this.rowHeight();
      } else {
        return this.rowHeight() + this.$options.rowSpacing;
      }
    },

    columnWidth: function() {
      var view = this.$subViews.localItems()[0];
      return (view) ?  view.width() : 0;
    },

    rowHeight: function() {
      var view = this.$subViews.localItems()[0];
      return (view) ?  view.height() : 0;
    },

    width: function() {
      var t = this;
      return (t.columnCount() * t.columnWidth()) + Math.max(0, (t.columnCount() - 1) * t.$options.columnSpacing);
    },

    height: function() {
      var t = this;
      return (t.rowCount() * t.rowHeight()) + Math.max(0, (t.rowCount() - 1) * t.$options.rowSpacing);
    },

    drawFunction: function() {
      var t = this;

      t.___drawGrid();

      t.where().on('click', '.tmz-grid-layout-element > div', function(e) {
        e.preventDefault();
        
        view = $(this).data('tmzThis');
        t.fireListener('elementClicked', view, t.positionOfView(view), t.indexOfView(view));
      });
    },

    //CRZ: can redraw grid, assuming grid changes only by adding new elements.
    ___drawGrid: function() {
      var t = this;

      $.each(t.$gridRepresentation, function(rowIndex, row) {
        if(t.___all(row, function(el) { return el.wasDrawn(); })) { 
          return true; //already drew this row
        } else if(rowIndex > 0 && 
                  t.___all(t.$gridRepresentation[rowIndex-1], function(el) { return el.wasDrawn(); }) &&
                  t.___all(row, function(el) { return !el.wasDrawn(); })) {
          //last row was completely drawn, and this row was not drawn at all, so add spacer.
          $(t.$options.rowSpacerHtml).addClass('row-spacing').css({clear: 'both', height: t.$options.rowSpacing}).appendTo(t.where());
        }

        $.each(row, function(columnIndex, view) {
          if(view.wasDrawn()) {
            return true; //continue to next view
          }
          if(columnIndex > 0) {
            $(t.$options.columnSpacerHtml).css({'width': t.$options.columnSpacing, 'height': '1px', 'float': 'left'}).addClass('column-spacing').appendTo(t.where());
          }

          var element = $('<div class="tmz-grid-layout-element" style="float:left; overflow:hidden;"></div>').appendTo(t.where());

          view.setWhere(element);
          view.draw();

          if(t.DEBUG) { view.where().append('<p>' + t.positionOfView(view).row + ',' + t.positionOfView(view).column + ',' + t.indexOfView(view) +  '</p>'); }
        });
      });

      t.___setSize();
    },

    ___setSize: function() {
      this.where().width(this.width());
      this.where().height(this.height());
    },

    positionOfView: function(view) {
      var t = this;
      var columnIndex, rowIndex;

      for(rowIndex = 0; rowIndex < t.$gridRepresentation.length; rowIndex++) {
        columnIndex = $.inArray(view, t.$gridRepresentation[rowIndex]);
        if(columnIndex !== -1) {
          return({row: rowIndex, column: columnIndex});
        }
      }

      throw(t.className + ": view not in grid");
    },

    indexOfView: function(view) {
      return $.inArray(view, this.$subViews.localItems());
    },

    //CRZ: array of row arrays.
    ___calculateGridRepresentation: function() {
      var t = this;
      var newGrid = [];
      var totalItems = t.$subViews.localItems().length;
      var itemsRemaining = t.$subViews.localItems().length;
      var rowIndex = 0;
      var thisRowCount = 0;

      if(t.$options.rows && !t.$options.columns && (t.$options.layoutOrder === "row-first") && !t.$options.pageSize) {
        for(rowIndex = 0; rowIndex < t.$options.rows; rowIndex++) {
          thisRowCount = Math.ceil(itemsRemaining / (t.$options.rows - rowIndex));

          newGrid[rowIndex] = t.$subViews.localItems().slice(totalItems - itemsRemaining, totalItems - itemsRemaining + thisRowCount);
          itemsRemaining -= thisRowCount;
        }
      } else if(t.$options.rows && !t.$options.columns && t.$options.layoutOrder === "column-first" && !t.$options.pageSize) {
        throw t.className + ' this set of options is not supported yet!';
      } else if(t.$options.rows && !t.$options.columns && t.$options.layoutOrder === "row-first" && t.$options.pageSize) {
        while(itemsRemaining > 0) {
          for(rowIndex = 0; rowIndex < t.$options.rows; rowIndex++) {
            newGrid[rowIndex] = newGrid[rowIndex] || [];
            thisPageRowCount = Math.min(itemsRemaining, t.$options.pageSize);
            newGrid[rowIndex] = newGrid[rowIndex].concat(
              t.$subViews.localItems().slice(totalItems - itemsRemaining, totalItems - itemsRemaining + thisPageRowCount));
            itemsRemaining -= thisPageRowCount;
          }
        }
      } else if(t.$options.columns && !t.$options.rows && t.$options.layoutOrder === "row-first" && !t.$options.pageSize) {
        for(rowIndex = 0; itemsRemaining > 0; rowIndex++) {
          thisRowCount = Math.min(itemsRemaining, t.$options.columns);

          newGrid[rowIndex] = t.$subViews.localItems().slice(totalItems - itemsRemaining, totalItems - itemsRemaining + thisRowCount);
          itemsRemaining -= thisRowCount;
        }
      } else if(t.$options.columns && !t.$options.rows && t.$options.layoutOrder === "column-first" && !t.$options.pageSize) {
        throw t.className + ' this set of options is not supported yet!';
      } else if(t.$options.columns && !t.$options.rows && t.$options.layoutOrder === "column-first" && t.$options.pageSize) {
        throw t.className + ' this set of options is not supported yet!';
      } else {
        throw t.className + ' invalid options';
      }

      t.$gridRepresentation = newGrid;
      return t.$gridRepresentation;
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzSlideGridView', 'TmzView', {
    constructor: function(gridLayout, options) {
      this.$gridLayout = gridLayout;
      this.$topLeftCell = {row: 0, column: 0};
      this.$mask = null;
      this.$content = null;
      options = $.extend({rowsShowing: 1, columnsShowing: 3, resizeDuration: 300, slideDuration: 500, peekRight: 0, peekBottom: 0}, options || {});

      if(options.peekRight < 0 || options.peekBottom < 0) {
        throw(this.className + ": peekRight and peekBottom options cannot be negative");
      }

      TmzView.apply(this, [options]);
    },

    drawFunction: function() {
      var t = this;

      t.where().append('<div class="mask" style="overflow:hidden; position: relative;"><div class="content"></div></div>');
      t.$gridLayout.setWhere($('> .mask > .content', t.where()));
      t.$gridLayout.draw();
      t.$mask = $('> .mask', t.where());
      t.$content = $('> .mask > .content', t.where());

      t.___setMaskSize();
      t.setTopLeftCell(0,0);
    },

    setOptions: function(options) {
      var t = this;

      if(options.rows) {
        options.rows = Math.max(1, rows);
      }

      if(options.columns) {
        options.columns = Math.max(1, columns);
      }

      t.$options = $.extend(t.$options, options || {});

      if(options.rowsShowing || options.columnsShowing || options.peekRight || options.peekBottom) {
        t.___setMaskSize();
      }
    },

    //options.maintainFullEdges: if true, will not slide such that right edge or bottom edge is empty
    slide: function(rowStep, columnStep, options) {
      options = $.extend({maintainFullEdges: false}, options || {});

      var maxYPosition = this.$gridLayout.rowCount() - ((options.maintainFullEdges) ? this.$options.rowsShowing : 1) ;
      var maxXPosition = this.$gridLayout.columnCount() - ((options.maintainFullEdges) ? this.$options.columnsShowing : 1);

      var newRow = Math.max(Math.min(this.$topLeftCell.row + rowStep, maxYPosition), 0);
      var newColumn = Math.max(Math.min(this.$topLeftCell.column + columnStep, maxXPosition), 0);
      
      if(options.maintainFullEdges) {
        rowStep = Math.floor((rowStep / this.$options.rowsShowing) * this.$options.rowsShowing);
        columnStep = Math.floor((columnStep / this.$options.columnsShowing) * this.$options.columnsShowing);
      }

      this.setTopLeftCell(newRow, newColumn);
    },

    resize: function(rows, columns) {
       this.setOptions({rowsShowing: rows || this.options().rowsShowing, columnsShowing: columns || this.options().columnsShowing});
    },

    resizeDelta: function(rowsDelta, columnsDelta) {
      this.resize(this.options().rowsShowing + (rowsDelta || 0) , this.options().columnsShowing + (columnsDelta || 0));
    },

    //page steps are the # of rows/cols showing
    slidePage: function(verticalPageStep, horizontalPageStep, options) {
      var rowStep = (verticalPageStep) ? verticalPageStep * this.$options.rowsShowing : 0;
      var columnStep = (horizontalPageStep) ? horizontalPageStep * this.$options.columnsShowing : 0;

      this.slide(rowStep, columnStep, options);
    },

    setTopLeftCell: function(row, column) {
      this.$topLeftCell = {row: row, column: column};
      this.___moveContent();
      
      this.fireListener('availabilityChange', this.___availability());

      return this.$topLeftCell;
    },

    topLeftCell: function() {
      return this.$topLeftCell;
    },

    width: function() {
      return this.$gridLayout.virtualColumnsWidth(this.$options.columnsShowing) + this.$options.peekRight;
    },

    height: function() {
      return this.$gridLayout.virtualRowsHeight(this.$options.rowsShowing) + this.$options.peekBottom;
    },

    //CRZ: finds the visible subview that lives under the given mouseclick. meant so you can have overlays that dont trap clicks.
    //CRZ: TODO: check if click is outside viewable mask, if so disallow
    findViewForClick: function(e) {
      var t = this;
      var match = null;
      t.$gridLayout.$subViews.each(function(i, view) {
        if(!match && view.wasDrawn()) {
          var w = view.where();
          if(w.offset().left <= e.pageX && e.pageX <= (w.offset().left + w.width()) &&
             w.offset().top <= e.pageY && e.pageY <= (w.offset().top + w.height())) {
            match = view;
          }
        }
      });

      return match;
    },

    ___availability: function() {
      return {
        left: (this.$topLeftCell.column !== 0), 
        up: (this.$topLeftCell.row !== 0),
        right: (this.$topLeftCell.column + this.$options.columnsShowing !== this.$gridLayout.columnCount()),
        down: (this.$topLeftCell.row + this.$options.rowsShowing !== this.$gridLayout.rowCount())
      };
    },

    ___moveContent: function() {
      var t = this;
      var marginTop = -t.$gridLayout.rowOffsets(t.$topLeftCell.row).x1;
      var marginLeft = -t.$gridLayout.columnOffsets(t.$topLeftCell.column).y1;

      if(t.wasDrawn()) {
        t.fireListener('slideAnimationStarted');
        t.$content.animate({'margin-top': marginTop, 'margin-left': marginLeft}, {queue:false, duration: t.$options.slideDuration, complete: function() {
          t.fireListener('slideAnimationEnded');
        }});
      } else {
        t.$content.css({'margin-top': marginTop, 'margin-left': marginLeft});
      }
    },

    ___setMaskSize: function() {
      var t = this;

      if(t.wasDrawn()) {
        t.fireListener('resizeAnimationStarted');
        t.$mask.animate({'width': t.width(), 'height': t.height()}, {queue:false, duration: t.$options.resizeDuration, complete: function() {
          t.fireListener('resizeAnimationEnded');
        }});
      } else {
        if(t.$mask) {
          t.$mask.css({'width': t.width(), 'height': t.height()});
        }
      }
    }
  });
})(jQuery);

(function tmzKalturaPlayerView ($) {
  'use strict';

  function assetUrl() {
    return '//ll-assets.tmz.com/kaltura-player/';
  }

  if (window.location.hostname.match(/dev.com/)) {

    var uiConfMap = {
      tmz: {
        uiConfId: 33967872,
        wid: '_591531',
        shareUrl: 'http://www.tmz.com/videos/{mediaProxy.entry.id}',
        adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/tmz/staging/video&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url={utility.referrer_url}&description_url=http://www.tmz.com/videos/{mediaProxy.entry.id}&vid={mediaProxy.entry.id}&correlator={utility.random}&cmsid=2904'
      },
      toofab: {
        uiConfId: 23386221,
        wid: '_682882',
        shareUrl: 'http://www.toofab.com/videos/{mediaProxy.entry.id}',
        adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/toofab/staging/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]'
      },
      fishwrapper: {
        uiConfId: 23677451,
        wid: '_1369352',
        shareUrl: 'http://www.fishwrapper.com/videos/{mediaProxy.entry.id}',
        adCall: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&ad_rule=0&iu=/55153744/fishwrapper/staging/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={utility.referrer_url}&cmsid=2904&vid={mediaProxy.entry.id}&correlator={utility.random}'
      }
    };

  } else {

    var uiConfMap = {
      tmz: {
        uiConfId: 33967872,
        wid: '_591531',
        shareUrl: 'http://www.tmz.com/videos/{mediaProxy.entry.id}',
        adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/tmz/video&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url={utility.referrer_url}&description_url=http://www.tmz.com/videos/{mediaProxy.entry.id}&vid={mediaProxy.entry.id}&correlator={utility.random}&cmsid=2904'
      },
      toofab: {
        uiConfId: 23386221,
        wid: '_682882',
        shareUrl: 'http://www.toofab.com/videos/{mediaProxy.entry.id}',
        adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/toofab/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]'
      },
      fishwrapper: {
        uiConfId: 23677451,
        wid: '_1369352',
        shareUrl: 'http://www.fishwrapper.com/videos/{mediaProxy.entry.id}',
        adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/fishwrapper/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]'
      }
    };
  }


  var tmzEmbedSnippet = '<iframe src="//cdnapisec.kaltura.com/p/591531/sp/59153100/embedIframeJs/uiconf_id/6740162/partner_id/591531?iframeembed=true&playerId=kaltura_player_1413478522&entry_id={mediaProxy.entry.id}" width="664" height="421" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0" style="width: 700; height: 394px;"></iframe>';

  var toofabEmbedSnippet = '<iframe src="//cdnapisec.kaltura.com/p/682882/sp/68288200/embedIframeJs/uiconf_id/23386221/partner_id/682882?iframeembed=true&playerId=kaltura_player_1413478522&entry_id={mediaProxy.entry.id}" width="400" height="333" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0" style="width: 400px; height: 333px;"></iframe>';

  function vastRandomNum() {
    return Math.ceil(Math.random() * 100000000000000000);
  }

  function hideLaunchQuote(options) {
    var $playerDiv = $(options.where);
    var $launchQuoteDiv = $playerDiv.find('.launch-quote');
    if ($launchQuoteDiv.length > 0) {
      $launchQuoteDiv.hide();
    }
    var $swipe = $playerDiv.parent().parent().prev('.primary-image-swipe');
    $swipe.hide();
  }


  function getEmbedSnippet() {
    var site = window.location.host.match(/tmz/) ? 'tmz' : 'toofab';
    switch (site) {
      case 'tmz':
        return tmzEmbedSnippet;
      case 'toofab':
        return toofabEmbedSnippet;
    }
  }

  var updatedAssetUrl;

  function getAssetUrl() {
    updatedAssetUrl = ASSETS_BASEURL.substr(ASSETS_BASEURL.indexOf('://') + 1);
  }

  getAssetUrl();

  function retrieve(n) {
    var m, k = 'kx' + n, results;
    if (localStorage) {
      results = localStorage[k] || '';
    } else if (navigator.cookieEnabled) {
      m = d.cookie.match(k + '=([^;]*)');
      results = m && encodeURIComponent(m[1]) || '';
    } else {
      results = '';
    }
    return results;
  }

  var kruxTokens = (function () {

    var ksg = (retrieve('segs') && retrieve('segs').split(',')) || [];
    var kuid = retrieve('user');
    var khost = encodeURIComponent(location.hostname);

    var krux_string = encodeURIComponent('ksg=' + ksg + '&kuid=' + kuid + '&khost=' + khost);

    return {
      value: function() {
        return krux_string;
      }
    };
  })();

  function loadTaboola(entryID, prodURL) {
    //reload taboola ads
    window._taboola = window._taboola || [];
    _taboola.push({notify:'videoPlay', id:entryID, url:prodURL})
  };

  TmzClass.create('TmzKalturaPlayerView', 'TmzView', {
    constructor: function (options) {
      var t = this;
      $.extend({secludedDiv: false}, options || {});
      t.$initialized = false;
      t.$cacheSt = options.cacheSt;
      t.$uniqueIdNumber = t.$cacheSt + '-' + vastRandomNum();
      t.$uniqueId = 'kaltura-player-' + t.$uniqueIdNumber;

      t.$width = options.width || 700;
      t.$height = options.height || 394;

      t.$kdp = null;
      t.$currentVideo = null;
      t.playerDrawn = false;

      t.$playerOptions = options.playerOptions;
      t.$entryId = t.$playerOptions.entryId || '';

      t.$entryId = t.$entryId.replace('-', '_');

      // Enable switching between ad tags based on hostname, so ad ops can test ad stuff in dev without code changes. Hacky :/ CCS 11-14
      t.$enableDevAdMode = window.location.hostname.match(/dev/) ? true : false;

      t.$defaultAdOptions = {
        plugin: true,
        path: 'http://cdnbakmi.kaltura.com/content/uiconf/ps/veria/kdp3.9.1/plugins/doubleclickPlugin.swf',
        adTagUrl: uiConfMap[options.site].adCall,
        customParams: kruxTokens.value() + '&category={mediaProxy.entry.categories|dfp-sanitized}',
        disableCompanionAds: 'false',
        htmlCompanions: 'adCompanionBanner:300:250;',
        debugMode: 'false',
        adsManagerLoadedTimeout: 3000,
        timeout: 3,
        leadWithFlash: true
      };


      t.$defaultPlaylistOptions = {
        iframeHTML5Js: updatedAssetUrl + 'js/videos/tmzPlaylistAPI.js',
        plugin: false,
        width: '50%',
        height: '50%',
        //autoplay: false,
        containerPosition: 'right',
        //'autoInsert':true,
        kpl0Id: ''
      };

      t.$defaultPlayerOptions = {
        targetId: t.$uniqueId,
        wid: '_591531',
        uiconf_id: 33967872,
        'Kaltura.LoadingSpinner.Disabled': true,
        'Kaltura.UseAppleAdaptive': false,
        readyCallback: function(playerId) {
          t = TmzKalturaPlayerView.getPlayerForPlayerId(playerId);
          t.setKdp(); // Thumbnail embeds get KDP set before the iframe exists
          // so we'll need to refresh

          var $player = $('#' + playerId + '_ifp');
          var $iframe = $player.contents();

          if( $player.parents('.superpost').length ) {
            $iframe.find('.videoHolder').addClass('alt');
          }

          t.$kdp.kBind('mediaReady', function() {
            //add share template
            t.$kdp.setKDPAttribute('tmzShare', 'template', t.playerShareTemplate());
            if (t.___shouldAutoPlay()) {
            }
          });
          t.$kdp.kBind('adStart', function () {
            hideLaunchQuote(options);
          });
          t.$kdp.kBind('adEnd', function () {
            var entryID = t.$entryId;
            var prodURL = 'http://www.tmz.com/videos/' + t.$entryId;
            loadTaboola(entryID, prodURL);
          });
          t.$kdp.kBind('doPlay', function () {
            hideLaunchQuote(options);
          });

          t.$kdp.kBind('relatedVideoSelect', function() {
            // omniture tracking
            parent.s.prop46 = parent.s.eVar46 = 'recommendedvideo';
            parent.s.tl();
          });

          t.$kdp.kBind('replayEvent', function() {
            // omniture tracking
            parent.s.events = 'event20';
            parent.s.tl();
          });
        },
        flashvars: {
          //autoPlay: false,
          streamerType: 'auto',
          externalInterfaceDisabled: false,
          IframeCustomPluginCss1: updatedAssetUrl + 'css/kaltura_external_css.css',
          IframeCustomPluginJs1:  updatedAssetUrl + 'js/videos/tmzCustomFormater.js',
          'loadingSpinner.plugin': false,
          'controlBarContainer': {
            'plugin': true,
            'hover': true
          },
          closedCaptions: {
            plugin: true,
            width: '0%',
            height: '0%',
            includeInLayout: false,
            layout: 'ontop',
            useCookie: true,
            fontFamily: 'Arial',
            fontsize: '12',
            fontColor: '0xFFFFFF',
            bg: '0x335544',
            useGlow: false,
            glowBlur: '4',
            glowColor: '0x133693',
            hideClosedCaptions: true,
            hideWhenEmpty: true
          },
          share: {
            plugin: false
          },
          tmzShare: {
            plugin: true,
            iframeHTML5Js: updatedAssetUrl + 'js/videos/tmzSharePlugin.js',
            loadingPolicy: 'onDemand',
            position: 'before',
            width: '0%',
            height: '0%',
            includeInLayout: false,
            parent: 'controlsContainer',
            align: 'right',
            socialShareURL: 'http://' + window.location.hostname + '/videos/{mediaProxy.entry.id}',
            order: '6'
          },
          doubleClick: t.$defaultAdOptions,
          // 'vast': t.$defaultAdOptions,
          playlistAPI: t.$defaultPlaylistOptions,
          TMZConfigPlugin: {
            iframeHTML5Js: updatedAssetUrl + 'js/videos/TMZConfigPlugin.js',
            plugin: true
          },
          related: {
            parent : 'topBarContainer',
            order : '4',
            autoContinueTime : '5',
            itemsLimit : '10',
            displayOnPlaybackDone : 'true',
            sendContextWithPlaylist : 'false',
            autoContinueEnabled : 'false',
            storeSession : 'true',
            //templatePath : 'components/related/related.tmpl.html',
            template: '' +
            '<div class="vid large">' +
            '<a href="#" data-entry-id="<%=nextItem.id%>" data-click="changeMedia">' +
            '<div class="thumbnail">' +
            '<img class="thumb-bg" src="<%=nextItem.thumbnailUrl%>/width/250" />' +
            '<div class="play-btn"></div>' +
            '</div>' +
            '<div class="content">' +
            '<span class="playlistTitle">Up Next</span>' +
            '<h3 class="item-title"><%= nextItem.name %></h3>' +
            /*'<span class="duration"><%= mw.seconds2npt( parseFloat(nextItem.duration) ) %></span>' + */
            '</div>' +
            '</a>' +
            '</div>' +
            '<% $.each(moreItems, function(idx, item) { %>' +
            '<div class="vid small">' +
            '<a href="#" data-entry-id="<%=item.id%>" data-click="changeMedia">' +
            '<div class="thumbnail">' +
            '<img class="thumb-bg" src="<%=item.thumbnailUrl%>/width/250" />' +
            '<div class="play-btn"></div>' +
            '</div>' +
            '<div class="content">' +
            '<h3 class="item-title"><%= item.name %></h3>' +
            /*'<span class="duration"><%= mw.seconds2npt( parseFloat(item.duration) ) %></span>' + */
            '</div>' +
            '</a>' +
            '</div>' +
            '<% }); %>' +
            '<a class="btn-replay" data-notification="doReplay"><span class="btn-bg"></span><span class="label">Replay</span></a>' +
            '<div class="fullscreen-bg"></div>'
          ,
            playlistId : '',
            plugin : 'true'
          },
          /*tmzRelated: {
            plugin: true,
            iframeHTML5Js: updatedAssetUrl + 'js/videos/kaltura_tmz_related_plugin.js',
            visible: false,
            parent: 'topBarContainer',
            includeInLayout: false,
            autoContinueEnabled: true,
            displayOnPlaybackDone: true,
            itemsLimit: 12,
            playlistId: '0_d6tofiro',
            entryList: null
          },*/
          'omnitureOnPage': {
               'additionalEvarsAndProps': 'eVar1,eVar2,eVar3,eVar11,eVar12,eVar8,prop1,prop2,prop3,prop11,prop12,prop8',
               'additionalEvarsAndPropsValues': 'TMZ.us,Video,Video,{mediaProxy.entry.id},{mediaProxy.entry.duration},{mediaProxy.entry.name|escape},TMZ.us,Video,Video,{mediaProxy.entry.id},{mediaProxy.entry.duration},{mediaProxy.entry.name|escape}'
          },
          adsOnReplay: true
        },
        uiVars: [
          //{
          // 'key': 'disableTrackElement',
          // 'value': 'true'
          // },
          {
            'key':  'EmbedPlayer.EnableIpadHTMLControls',
            'value':  'false'
          },
          {
            'key':  'EmbedPlayer.NativeControlsMobileSafari',
            'value': 'true'
          },
          {
            'key':  'EmbedPlayer.EnableIpadNativeFullscreen',
            'value': 'true'
          }
        ],
        cache_st: t.$cacheSt,
        entry_id: t.$entryId,
        height: t.$height,
        width: t.$width,
        plugins: {}
      };

      window[t.___jsInterfaceReadyName()] = function () {
        return t.$playerDrawn;
      };

      window[t.___jsCallbackReadyName()] = function (playerId) {
        var player = TmzKalturaPlayerView.players[playerId];
        if (player) {
          player.jsCallbackReady(playerId);
        }
      };

      options.secludedDiv = false;

      TmzView.apply(t, [t.___processOptions(options)]);
    },

    playerShareTemplate: function() {
      var t = this;
      var template = '<div class="panel-right">' +
        '<span> Share </span>' +
        '<input value="<%= tmzShare.getConfig(\'shareURL\') %>" /> <br/><br/>';
      // determine if embed should be displayed
      if (t.___canEmbed()) {
        template += '<span> Embed </span>' + '<input value=\'' + getEmbedSnippet() + '\' />';
      }

      template += '<div class="divider"></div>' +
      '<h3>Social Share</h3>' +
      '<ul>' +
      '<% $.each(networks, function(idx, network){ %>' +
      '<li style="list-style: none; display: inline;"><a href="<%=network.url%>" data-click="openPopup"><img src=' + assetUrl() + '<%=network.name.toLowerCase()%>-icon.png' +
      '></a></li>' +
      '<% }); %>' +
      '</ul>' +
      '</div>';
      return template;
    },

    playerTemplate: function() {
      var t = this;

      // If we're doing a thumbnail embed, set the width and height of
      // the container explicitly
      var tagStyle = t.$options.thumbnail ? 'style="width: 100%; height: 100%;"' : '';

      return '<div id="' + t.$uniqueId + '" ' + tagStyle + '>' +
          '<span itemprop="name" content=""></span>' +
          '<span itemprop="description" content=""></span>' +
          '<span itemprop="duration" content=""></span>' +
          '<span itemprop="thumbnail" content=""></span>' +
          '<span itemprop="width" content="' + t.___getPlayerWidth() + '"></span>' +
          '<span itemprop="height" content="' + t.$height + '"></span>' +
          '</div>';
    },

    ___getPlayerWidth: function() {
      var t = this;
      // TODO modify player dimensions with respect to playlistAPI plugin
      return t.$width;
    },

    ___processOptions: function(overrideOptions) {
      var t = this;

      //enable/disable endcards
      /*if (overrideOptions.endcard === true) {
        t.$defaultPlayerOptions.flashvars.tmzRelated.plugin = true;
        t.$defaultPlayerOptions.flashvars.tmzRelated.autoContinueEnabled = true;
      }

      // Enable/Disable autoContinue in tmzRelated
      if (overrideOptions.autoContinue === false) {
        t.$defaultPlayerOptions.flashvars.tmzRelated.autoContinueEnabled = false;
      }

      // Enable playlist through playlistAPI
      if (overrideOptions.showPlaylist === true) {
        t.$defaultPlayerOptions.flashvars.playlistAPI.plugin = true;
        t.$defaultPlayerOptions.flashvars.playlistAPI.initItemEntryId = overrideOptions.playerOptions.entryId;

        // Disable tmzRelated in favor of playlistAPI
        t.$defaultPlayerOptions.flashvars.tmzRelated.plugin = false;
        t.$defaultPlayerOptions.flashvars.playlistAPI.autoContinue = true;
      }*/

      // if thumbnail was passed through options, use it for embed
      if(overrideOptions.playerOptions.thumbnailUrl !== '') {
        t.$defaultPlayerOptions.flashvars.thumbnailUrl = overrideOptions.playerOptions.thumbnailUrl;
      }

      // Enable/disable autoplay
      //if (overrideOptions.autoplay === true) {
      //  t.$defaultPlayerOptions.flashvars.autoplay = true;
      //  t.$defaultPlayerOptions.flashvars.autoPlay = true;
      //  t.$defaultPlayerOptions.autoPlay = true;
      //  t.$defaultPlayerOptions.autoplay = true;
      //  t.$defaultPlaylistOptions.autoPlay = true;
      //  t.$defaultPlaylistOptions.autoplay = true;
      //  t.$defaultPlayerOptions.uiVars.push({
      //    key: 'autoPlay',
      //    value: 'true'
      //  });
      //}

      // Pass kaltura the ad endpoints for both flash ads and html5 only ads
      if (overrideOptions.ads) {
        // Set our player options to the defaults first...
        t.$defaultPlayerOptions.doubleClick = t.$defaultAdOptions;

        t.$defaultPlayerOptions.doubleClick.adTagUrl = overrideOptions.ads.prerollUrl;
      }

      // Specify playlistId for use with related or playlistAPI plugins
      if (overrideOptions.playlistId) {
        t.$defaultPlayerOptions.flashvars.tmzRelated.playlistId = overrideOptions.playlistId;
        t.$defaultPlayerOptions.flashvars.playlistAPI.kpl0Id = overrideOptions.playlistId;

        // If playlist is enabled AND we've specified an initial video to play
        // ahead of that playlist (via entryId), inform playlistAPI that we
        // want to play that video first
        if (overrideOptions.playerOptions.entryId) {
          t.$defaultPlayerOptions.flashvars.playlistAPI.initItemEntryId = overrideOptions.playerOptions.entryId;
        }
      }
      if (overrideOptions.cssSkin) {
        t.$defaultPlayerOptions.flashvars.IframeCustomPluginCss1 = overrideOptions.cssSkin;
      }

      if (overrideOptions.site) {
        if (overrideOptions.uiConfId) {
          t.$defaultPlayerOptions.uiconf_id = overrideOptions.uiConfId;
        } else {
          t.$defaultPlayerOptions.uiconf_id = uiConfMap[overrideOptions.site].uiConfId;
        }

        t.$defaultPlayerOptions.wid = uiConfMap[overrideOptions.site].wid;

        t.$defaultPlayerOptions.flashvars.share.shareURL = uiConfMap[overrideOptions.site].shareUrl;

        t.$defaultPlayerOptions.flashvars.share.socialShareURL = uiConfMap[overrideOptions.site].shareUrl;
      }

      return $.extend(t.$defaultPlayerOptions, overrideOptions || {});
    },

    makeCurrentTmzVideoFromKDP: function() {
      var t = this;
      t.$currentVideo = new TmzVideoModel({
        title: t.$kdp.evaluate('{mediaProxy.entry.name}'),
        description: t.$kdp.evaluate('{mediaProxy.entry.description}'),
        duration: t.$kdp.evaluate('{mediaProxy.entry.duration}'),
        kalturaId: t.$kdp.evaluate('{mediaProxy.entry.id}'),
        videoUrl: t.$kdp.evaluate('{mediaProxy.entry.dataUrl}'),
        thumbnailUrl: t.$kdp.evaluate('{mediaProxy.entry.thumbnailUrl}'),
        views: t.$kdp.evaluate('{mediaProxy.entry.views}'),
        plays: t.$kdp.evaluate('{mediaProxy.entry.plays}'),
        publishDate: t.$kdp.evaluate('{mediaProxy.entry.createdAt}'),
        categoryType: t.$kdp.evaluate('{mediaProxy.entry.categories}'),
        ratingType: t.$kdp.evaluate('{mediaProxy.entryMetaData.ContentRating}')
      });
    },

    uniqueId: function() {
      return this.$uniqueId;
    },

    setKdp: function() {
      var t = this;
      t.$kdp = document.getElementById(t.$uniqueId);
    },

    destroy: function() {
      if (window[this.___jsInterfaceReadyName()]) {
        window[this.___jsInterfaceReadyName] == null;
      }
      TmzView.prototype.destroy.call(this);
    },

    jsCallbackReady: function(playerId) {
      var t = this;
      t.$initialized = true;
      t.$kdp = document.getElementById(playerId);
      t.makeCurrentTmzVideoFromKDP();
    },

    addKdpListener: function(kdpListenerName, callback) {
    },

    drawFunction: function() {
      var t = this;
      t.___errorUnlessDependenciesSatisfied();

      t.where().html(t.playerTemplate());
      // Use flash for IE8
      // kWidget.userAgentPlayerRules[ t.$options['uiConfId'] ] = { 'rules': {}, 'actions': {} };
      // if (navigator.userAgent.match(/MSIE 8.0/)) {
      //   kWidget.addUserAgentRule(t.$options['uiConfId'], '/.*/', 'flash');
      // } else {
      //   kWidget.addUserAgentRule(t.$options['uiConfId'], '/.*/', 'leadWithHTML5');
      // }
      var x = function(callback) {
        if (t.$options.thumbnail == true) {
          kWidget.thumbEmbed(t.options());
        } else {
          kWidget.embed(t.options());
        }
        callback();
      };

      x(function () {
        TmzKalturaPlayerView.players.push(t);
      });
    },

    ___canEmbed: function() {
      var t = this;
      var theCategories = t.$kdp.evaluate('{mediaProxy.entry.categories}').split(',') || '';

      return theCategories.indexOf('No Share') === -1 && theCategories.indexOf('Agency') === -1;
    },

    ___shouldAutoPlay: function() {
      var t = this;
      return !(t.$options.autoplay == false);
    },

    ___shouldDisplayPlaylist: function() {
      var t = this;
      return t.$options.showPlaylist == true;
    },

    ___mediaUrl: function() {
      var t = this;

      var url =
        'http://www.kaltura.com/index.php/kwidget/cache_st/' + t.$options.cacheSt + '/wid/_' + t.$options.partnerId + '/partner_id/' + t.$options.partnerId + '/uiconf_id/' + t.$options.uiconfId;

      if (t.$options.entryId) {
        url += '/entry_id/' + t.$options.entryId;
      }

      return url;
    },

    ___errorUnlessDependenciesSatisfied: function() {
    },

    ___jsInterfaceReadyName: function() {
      return 'jsInterfaceReady_' + this.$uniqueId;
    },

    ___jsCallbackReadyName: function() {
      return 'jsCallbackReady_' + this.$uniqueId;
    },

    ___swfCallbackFn: function(e) {
      this.$swfobjectDrawn = true;
    },

    drawView: function() {
      this.draw(this.$options);
    }
  });

  TmzKalturaPlayerView.players = [];

  TmzKalturaPlayerView.getPlayerForPlayerId = function(playerId) {
    var filtered = $.grep(TmzKalturaPlayerView.players,
      function(item, index) {
        return (item.$uniqueId == playerId);
      });
    return filtered[0];
  };
})(jQuery);


/* CRZ - wraps an array that may exist remotely. thus, fetching is asynchronous and may require network i/o before callback is fired.
       - All items are fetched contiguously, starting with the first
       - You may or may not know the length of the remote array.
*/
(function($) {
  TmzClass.create('TmzAsyncArray', {
    /* remoteFetchFunction(start, length, remoteFetchCallback) */
    /* remoteFetchCallback(remoteItemsFetched) */
    constructor: function(localItems, totalItemCount, remoteFetchFunction, options) {
      TmzObject.apply(this, [options || {}]);

      this.$localItems = localItems || [];
      this.$totalItemCount = totalItemCount;
      this.$remoteFetchFunction = remoteFetchFunction;
    },

    /* fetchCallback(<array of items requested>) */
    fetch: function(localFetchStart, localFetchLength, fetchCallback) {
      var t = this;

      if($.type(fetchCallback) === 'null' || $.type(fetchCallback) === 'undefined') {
        fetchCallback = $.noop;
      } else if(!$.isFunction(fetchCallback)) {
        t.error("ArgumentError: fetchCallback must be a function");
      }

      if(($.type(localFetchStart) !== "number") || (localFetchStart % 1 !== 0) ||
         ($.type(localFetchLength) !== "number") || (localFetchLength % 1 !== 0)) {
        t.error('ArgumentError: fetch(): start and length must both be integers; they were ' + localFetchStart + ' and ' + localFetchLength);
      }

      var remoteFetchStart = t.$localItems.length;
      var remoteFetchLength = localFetchLength + (localFetchStart - remoteFetchStart);
      var existingItems = t.$localItems.slice(localFetchStart, localFetchStart+localFetchLength);

      if(t.totalItemCount() && ((localFetchStart + localFetchLength > t.totalItemCount())))  {
        length = t.totalItemCount() - localFetchStart;
      }

      if(t.totalItemCount() && localFetchStart >= t.totalItemCount()) {
        fetchCallback.call(t, []);
        return [];
      }
      else if(existingItems.length === localFetchLength) {
        fetchCallback.call(t, existingItems);
        return existingItems;
      } else {
        t.$remoteFetchFunction.call(t, remoteFetchStart, remoteFetchLength, function(remoteItemsFetched) {
          t.___merge(remoteItemsFetched, remoteFetchStart);
          var itemsRequested = t.$localItems.slice(localFetchStart, localFetchStart + localFetchLength);
          var itemsForCallback = {fetched: remoteItemsFetched, requested: itemsRequested};

          t.fireListener('remoteItemsFetchedBeforeCallback', itemsForCallback);
          fetchCallback.call(t, itemsRequested);
          t.fireListener('remoteItemsFetchedAfterCallback', itemsForCallback);
        });
        return false;
      }
    },

    fetchMoreRemote: function(count, fetchCallback) {
      return this.fetch(this.$localItems.length, count, fetchCallback)[count];
    },

    fetchOne: function(index, fetchCallback) {
      var ret = this.fetch(index, 1, fetchCallback);
      
      if(typeof ret === "object") {
        return ret[0];
      } else {
        return ret;
      }
    },

    totalItemCount: function() {
      return this.$totalItemCount;
    },

    setTotalItemCount: function(count) {
      if(this.$totalItemCount !== count) {
        this.$totalItemCount = count;
        this.fireListener('totalItemCountChanged', this.$totalItemCount);
      }
    },

    /* returns null when unknown */
    hasRemoteItems: function() {
      var remoteCount = this.remoteItemCount();

      if(remoteCount) {
        return this.remoteItemCount() !== 0;
      } else {
        return null;
      }
    },

    localItems: function() {
      return this.$localItems;
    },

    fetchAll: function(fetchCallback) {
      if(this.$totalItemCount)  {
        return this.fetch(0, this.$totalItemCount, fetchCallback);
      } else {
        throw "called fetchAll but we dont know the totalItemCount";
      }
    },

    /* returns null when unknown */
    remoteItemCount: function() {
      if(this.$totalItemCount) {
        return this.$totalItemCount - this.$localItems.length;
      } else {
        return null;
      }
    },

    remoteFetchFunction: function() {
      return this.$remoteFetchFunction;
    },

    setRemoteFetchFunction: function(remoteFetchFunction) {
      return (this.$remoteFetchFunction = remoteFetchFunction)  ;
    },

    ___merge: function(items, start) {
      if(start > this.$localItems.length) {
        this.error('___merge() can only add items contiguously');
      }

      var nonOverlapping = items.slice(this.$localItems.length - start);
      this.$localItems.push.apply(this.$localItems, nonOverlapping);
      return nonOverlapping;
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGSAAsyncArray', 'TmzAsyncArray', {
    PAGE_SIZE: 25,

    constructor: function(term, options) {
      var t = this;
      t.$term = term;
      
      TmzAsyncArray.apply(this, [[], 0, function(requestedStart, requestedLength, remoteFetchCallback) {
        /* start on page boundary */
        var pageStart = Math.floor(requestedStart / t.PAGE_SIZE) + 1;
        var pageEnd = Math.floor((requestedStart + requestedLength - 1) / t.PAGE_SIZE) + 1;

        if(pageStart !== pageEnd) {
          throw this.className + ' cannot fetch multiple pages at once: requestedStart = ' + requestedStart + ', requestedLength = ' + requestedLength; 
        }        

        $.ajax(t.searchUrl(t.$term, pageStart), {
          dataType: 'json',
          success: function(data, textStatus, xhr) {
            t.setTotalItemCount(data.total);
            remoteFetchCallback.call(this, $.map(data.results, function(result, i) {
              return new (t.view())(new (t.model())(result), (t.viewOptions && t.viewOptions() || {}));
            }));
          },
          error: function(xhr, textStatus, errorThrown) {
            t.setTotalItemCount(0);
            if(xhr.status === 404) {
              remoteFetchCallback.call(this, []);
            } else {
              throw ['error', xhr, textStatus, errorThrown];
            }
          }
        });
      }]);
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGalleryGSAAsyncArray', 'TmzGSAAsyncArray', {
    constructor: function(term, options) {
      TmzGSAAsyncArray.apply(this, [term, options]);
    },
    view: function() {
      return TmzGallerySearchThumbView;
    },
    model: function() {
      return TmzGalleryModel;
    },
    searchUrl: function(term, page) {
      return '/search/json/galleries/' +  encodeURIComponent(term) + '/' + page + '.json';
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzLocalAsyncArray', 'TmzAsyncArray', {
    constructor: function(localArray, options) {
      TmzAsyncArray.apply(this, [localArray, localArray.length, function() {}, options]);
    },

    each: function(callback) {
      return $.each(this.localItems(), callback);
    },

    map: function(callback) {
      return $.map(this.localItems(), callback);
    },

    //CRZ: inspired by jQuery
    //CRZ: call without comparisonFunction, and works as 1.6/jquery does
    //CRZ: call with comparisonFunction, with or without item, and returns the index of the first where function returns true
    //CRZ: comparisonFunction() called with 2 arguments: item its comparing, and argument you passed in.
    //CRZ: can't polymorphize arguments since you might be searching thru an array of functions!
    indexOf: function(item, comparisonFunction) {
      var t = this;
      var len, i;
      var array = t.localItems();

      comparisonFunction = comparisonFunction || function(a, b) { return a === item;};

      len = array.length;
      i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

      for(; i < len; i++) {
        // Skip accessing in sparse arrays
        if(i in array && comparisonFunction(array[i], item)) {
          return i;
        }
      }

      return -1;
    },

    detect: function(item, comparisonFunction) {
      return this.localItems()[this.indexOf(item, comparisonFunction)] || null;
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzStaticArray', 'TmzAsyncArray', {
    constructor: function(array, options) {
      TmzAsyncArray.apply(this, [array, array.length, options]);
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzVideoGSAAsyncArray', 'TmzGSAAsyncArray', {
    constructor: function(term, options) {
      TmzGSAAsyncArray.apply(this, [term, options]);
    },
    view: function() {
      return TmzVideoSearchThumbView;
    },
    model: function() {
      return TmzVideoModel;
    },
    searchUrl: function(term, page) {
      return '/search/json/videos/' +  encodeURIComponent(term) + '/' + page + '.json';
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzVideoArray', 'TmzAsyncArray', {
    constructor: function(options) {
      var t = this;

      //CRZ: ###: sooooo smelly
      if(options.initialJson) {
        options.initialElements = t.___jsonToModelsToViews(options.initialJson);
      }

      TmzAsyncArray.apply(this, [options.initialElements || [], options.totalCount || null, function(requestedStart, requestedLength, remoteFetchCallback) {
        /* start on page boundary */
        var pageStart = Math.floor(requestedStart / t.$options.pageSize) + 1;
        var pageEnd = Math.floor((requestedStart + requestedLength - 1) / t.$options.pageSize) + 1;

        if(pageStart !== pageEnd) {
          t.error('cannot fetch multiple pages at once: requestedStart = ' + requestedStart + ', requestedLength = ' + requestedLength);
        }

        $.ajax(t.url(pageStart), {
          dataType: 'json',
          success: function(data, textStatus, xhr) {
            t.setTotalItemCount(data.total);
            remoteFetchCallback.call(this, t.___jsonToModelsToViews(data.results));
          },
          error: function(xhr, textStatus, errorThrown) {
            t.setTotalItemCount(0);
            if(xhr.status === 404) {
              remoteFetchCallback.call(this, []);
            } else {
              throw ['error', xhr, textStatus, errorThrown];
            }
          }
        });
      }, t.___processOptions(options)]);

      //PNS: ###: also soooooo smelly
      if(options.totalItemCount) {
        t.setTotalItemCount(options.totalItemCount);
      }
    },

    ___processOptions: function(options) {
      return $.extend({pageSize: 30}, options || {});
    },

    url: function(page) {
      var url = '/video-feed-categories/' + this.$options.kalturaCategorySlug + ".json?pagesize=" + this.$options.pageSize + "&page=" + page;

      if(this.$options.tmzCategorySlug) { url += "&tmz-category=" + this.$options.tmzCategorySlug; }

      return url;
    },

    model: function() {
      return TmzVideoModel;
    },

    view: function() {
      return TmzVideoThumbView;
    },

    viewOptions: function() {
      return {width: 146, height: 142, kalturaThumbnail: {width: 146, height: 79}};
    },

    ___jsonToModelsToViews: function(json) {
      var t = this;
      
      return $.map(json, function(result, i) {
        return new (t.view())(new (t.model())(result), (t.viewOptions && t.viewOptions() || {}));
      });
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzXFBMLView', 'TmzView', {
    TAGNAME: '',

    constructor: function(options) {
      var t = this;

      //CRZ: ### Seems there is some race condition with the FB lib. If I can't find the library at draw I'm parse()'ing again at domload.
      $(document).bind('facebookReady', function() {
        t.___parse();
      });

      options = t.___processOptions(options || {});
      TmzView.apply(t, [options]);
    },

    ___processOptions: function(options) {
      return options;
    },

    setOptions: function(options) {
      if((options.href == this.$options.href) && this.__keyCount(options) == 1) {
        //###lazy, use real object comparisons
        return;
      }
      
      $.extend(this.$options, options);
      if(this.wasDrawn()) {
        this.redraw();
      }
    },

    drawFunction: function() {
      var tag = $('<fb:' + this.TAGNAME + '></fb:' + this.TAGNAME + '>');
      this.___populateAttributes(tag);
      this.where().html(tag);
      this.___parse();
    },

    redraw: function() {
      this.drawFunction();
    },

    ___parse: function() {
      var t = this;
      if(t.hasWhere()) {
        if(typeof FB === "object" && typeof FB.XFBML === "object") {
          try {
            FB.XFBML.parse(t.where().get(0));
          } catch(e) {}
        } else {
          //
        }
      }
    },

    ___populateAttributes: function(tag) {
    },

    ___tag: function() {
      return this.scoped('> *');
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzFacebookLikeView', 'TmzXFBMLView', {
    TAGNAME: 'like',

    ___processOptions: function(options) {
      return $.extend({send: "false", show_faces: "false", layout: "button_count", buttonWidth: '85'}, options);
    },

    ___populateAttributes: function(tag) {
      var t = this;

      tag.attr({
        'send': t.$options.send,
        'layout': t.$options.layout,
        'show_faces': t.$options.show_faces,
        'width': t.$options.buttonWidth
      });
      if(t.$options.href) { tag.attr('href', t.$options.href); }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzFacebookShareView', 'TmzXFBMLView', {
    TAGNAME: 'share-button',

    ___processOptions: function(options) {
      return $.extend({type: 'button_count'}, options);
    },

    ___populateAttributes: function(tag) {
      var t = this;

      if(t.$options.href) { tag.attr('href', t.$options.href); }
      if(t.$options.type) { tag.attr('type', t.$options.type); }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzFacebookCustomShareView', 'TmzView', {
    constructor: function(options) {
      var t = this;
      options = $.extend((options || {}));
      TmzView.apply(t, [options]);
    },

    drawFunction: function() {
      var t = this;
      t.where().append(
        '<a href="'+t.shareUrl()+'" target="_new" rel="nofollow">' +
          '<span class="count"></span>' +
        '</a>'
      );
      
      $('> a', t.where()).click(t.shareClick);

      t.getCount();
    },

    setOptions: function(options) {
      if((options.href == this.$options.href) && this.__keyCount(options) == 1) {
        //###lazy, use real object comparisons
        return;
      }
      
      $.extend(this.$options, options);
      if(this.wasDrawn()) {
        this.redraw();
      }
    },

    redraw: function() {
      var t = this;
      t.fireListener('beforeRedraw');
      $('> a', t.where()).attr('href', t.shareUrl());
      $('> a > .count', t.where()).html('');
      t.getCount();
      t.fireListener('afterRedraw');
    },

    shareUrl: function() {
      var t = this;
      var href = encodeURIComponent(t.$options.href);
      return 'https://www.facebook.com/sharer/sharer.php?u='+href;
    },

    shareClick: function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      var isMobile = false; // do isMobile detection here
      if(isMobile) {
        href=href.replace("www.facebook.com","m.facebook.com");
        href=href+"&display=touch";
        window.location.href=href;
      } else {
        href=href+"&display=popup";
        window.open(href,"_blank","width=550,height=420,scrollbars=no,resizable=yes");
      }
    },

    getCount: function() {
      var t = this;
      var href = encodeURIComponent('"' + t.$options.href + '"');
      var query = 'SELECT total_count FROM link_stat WHERE url=';
      var escapedQuery = encodeURIComponent(query).replace(/%20/g, '+') + href;
      var url = 'https://api.facebook.com/method/fql.query?query=' + escapedQuery;
      url += "&format=json";
      url += "&callback=?";
      $.getJSON(url, function(data) {
        var count = data[0].total_count;
        $('> a > .count', t.where()).html(t.formatCount(count));
        t.fireListener('afterCountSet');
      });
    },

    formatCount: function(count) {
      if(count >= 0 && count <= 999) {
        return count;
      }
      if(count >= 1000 && count <= 9999) {
        var n = Math.floor(count/100)/10;
        if(Math.round(n) === n) {
          return Math.round(n) + 'k';
        } else {
          return n + 'k';
        }
      }
      if(count >= 10000 && count <= 999999) {
        return Math.floor(count/1000) + 'k';
      }
      if(count >= 1000000) {
        var n = Number((count/1000000).toPrecision(2));
        if(Math.round(n) == n) {
          return Math.round(n) + 'm';
        } else {
          return n + 'm';
        }
      }
      return count;
    }

  });
})(jQuery);


//CRZ: ### depends on facebookReady, which is NOT contained within the tmz_classes
//     - no idea why it requires listening to facebookReady. some race condition inherent in facebook lib.
(function($) {
  TmzClass.create('TmzFacebookCommentsView', 'TmzXFBMLView', {
    TAGNAME: 'comments',

    ___processOptions: function(options) {
      return $.extend({commentsWidth: null, colorScheme: "light"}, options);
    },

    ___populateAttributes: function(tag) {
      var t = this;
      var is_ipad = navigator.userAgent.match(/iPad/i) != null;

      tag.attr({
        'width': t.$options.commentsWidth,
        'colorscheme': t.$options.colorScheme
      });
      if(is_ipad) {
        tag.attr('data-mobile', 'false');
      }
      if(t.$options.href) { tag.attr('href', t.$options.href); }
      if(t.$options.numPosts) { tag.attr('num_posts', t.$options.numPosts); }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzStumbleUponView', 'TmzView', {
    SCRIPT_DEPENDENCY: "http://platform.stumbleupon.com/1/widgets.js",

    constructor: function(options) {
      var t = this;
      options = $.extend({needsUniqueId: true}, (options || {}));
      TmzView.apply(t, [options]);
    },

    drawFunction: function() {
      this.$badgeProperties = {type: 'badge', layout: '2', id: this.where().attr('id')};
      if(this.$options.href) { this.$badgeProperties.location = this.$options.href; }

      try {        
        this.___loadjs(this.___render);
      } catch(e) {}
    },

    setOptions: function(options) {
      $.extend(this.$options, options);
      this.drawFunction();
    },

    ___render: function() {
      this.$widget = new STMBLPN.Widget(this.$badgeProperties);
      this.$widget.render();
    },

    ___loadjs: function(afterload) {
      var t = this;
      if(typeof STMBLPN === "object") {
        afterload.call(t);
      } else {
        $.ajax({
          url: this.SCRIPT_DEPENDENCY,
          dataType: "script",
          success: function() { afterload.call(t); },
          cache: true
        });
      }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzPinterestView', 'TmzView', {
    constructor: function(options) {
      var t = this;
      options = $.extend({}, (options || {}));
      TmzView.apply(t, [options]);
    },

    drawFunction: function() {
      var tag = $('<a class="pin-it-button" count-layout="horizontal"><img border="0" src="http://assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>');
      this.___populateAttributes(tag);
      this.where().html(tag);
      this.___parse();
    },

    setOptions: function(options) {
      $.extend(this.$options, options);
      this.drawFunction();
    },

    ___parse: function() {
      //CRZ: must add everytime to reparse button
      $('<script></script>').attr('src', 'http://assets.pinterest.com/js/pinit.js').appendTo('head'); 
    },

    ___populateAttributes: function(tag) {
      var t = this;
      var params = {
        url: t.$options.href,
        media: t.$options.photo_url,
        description: t.$options.description
      };

      var param_string = $.map(params, function(v, k) {
        if(v) {
          return k + "=" + encodeURIComponent(v);
        } else {
          return "";
        }
      }).join('&');

      if(t.$options.href) { tag.attr('href', 'http://pinterest.com/pin/create/button/?' + param_string); }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzTwitterView', 'TmzView', {
    constructor: function(options) {
      var t = this;
      options = $.extend({via: 'TMZ'}, (options || {}));
      TmzView.apply(t, [options]);
    },

    drawFunction: function() {
      var tag = $('<a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>');
      this.___populateAttributes(tag);
      this.where().html(tag);
      this.___parse();
    },

    setOptions: function(options) {
      $.extend(this.$options, options);
      if(this.wasDrawn()) {
        this.drawFunction();
      }
    },

    //CRZ: copied from twitter snippet
    ___parse: function() {
      if(window.twttr) {
        twttr.widgets.load();
      }
    },

    ___tag: function() {
      return this.scoped('> a');
    },

    ___populateAttributes: function(tag) {
      var t = this;
      if(t.$options.href) { tag.attr('data-url', t.$options.href); }
      if(t.$options.title) { tag.attr('data-text', t.$options.title); }
      if(t.$options.via) { tag.attr('data-via', t.$options.via); }
      if(t.$options.related) { tag.attr('data-related', t.$options.related); }
    }
  });
})(jQuery);

(function($) {
  TmzClass.create('TmzGooglePlusView', 'TmzView', {
    __googleClass: function() {
      TmzClass.abstractMethod('__googleClass()');
    },

    __googleParse: function() {
      TmzClass.abstractMethod('__googleParse()');
    },

    constructor: function(options) {
      var t = this;
      
      TmzView.apply(t, [t.___processOptions(options)]);
    },

    ___processOptions: function(options) {
      return options || {};
    },

    setOptions: function(options) {
      $.extend(this.$options, options);
      if(this.wasDrawn()) {
        this.drawFunction();
      }
    },

    drawFunction: function() {
      var tag = $('<div/>').addClass(this.__googleClass());
      this.___populateAttributes(tag);
      this.where().html(tag);
      this.___parse();
    },

    ___parse: function() {
      var t = this;
      if(typeof gapi === "object" && typeof gapi.plusone === "object") {
        try {
          t.__googleParse();
        } catch(e) {}
      }
    },

    ___tag: function() {
      return this.scoped('> div:' + this.__googleClass());
    },

    ___populateAttributes: function(tag) {
      var t = this;

      if(t.$options.size) { tag.attr('size', t.$options.size); }
      if(t.$options.href) { tag.attr('data-href', t.$options.href); }
      if(t.$options.action) { tag.attr('data-action', t.$options.action); }
      if(t.$options.annotation) { tag.attr('data-annotation', t.$options.annotation); }
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzGooglePlusOneView', 'TmzGooglePlusView', {
    __googleClass: function() {
      return 'g-plusone';
    },
    __googleParse: function() {
      gapi.plusone.go();
    },
    ___processOptions: function(options) {
      return $.extend({size: 'small'}, (options || {}));
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzGooglePlusShareView', 'TmzGooglePlusView', {
    __googleClass: function() {
      return 'g-plus';
    },
    __googleParse: function() {
      gapi.plus.go();
    },

    ___processOptions: function(options) {
      return $.extend({size: 'small', action: 'share', annotation:'bubble'}, (options || {}));
    }
  });
})(jQuery);


// create tab object
// tabbedview should firelisteners
// move tmztabbedview hover binding to a util module with common functionality across all bits
// should be able to do: view.draw(where: '#here')
// Make a nongrid layout (which grid layout extends) and use it for the tabs. have to do hacky margin-right, margin-bottom kinda stuff.
// Need to enforce any kind of consistency where the views are the same sizes?
// add transitions

(function($) {
  TmzClass.create('TmzTabbedView', 'TmzView', {
    constructor: function(tabArray, options) {
      var t = this;

      if($.isArray(tabArray)) {
        tabArray = new TmzStaticArray(tabArray);
      }
      else if(false) {
      }

      t.$tabArray = tabArray;
      t.$tabList = null;
      t.$viewList = null;
      t.$index = 0;

      TmzView.apply(this, [t.___processOptions(options)]);
    },

    tabCount: function() {
      return this.$tabArray.localItems().length;
    },

    currentTab: function() {
      return this.$tabArray.fetchOne(this.$index);
    },

    drawFunction: function() {
      var t = this;

      $('<ul class="tabs"/><ul class="views"/><div style="clear:both"/>').appendTo(t.where());
      t.$tabList = t.scoped('> ul.tabs');
      t.$viewList = t.scoped('> ul.views');
      $.each(t.$tabArray.localItems(), function(i, tab) { 
        $('<li><p>' + tab.name + '</p></li>').addClass('tab').appendTo(t.$tabList);
      });
      $.each(t.$tabArray.localItems(), function(i, tab) { 
        var el = $('<li></li>').addClass('view').appendTo(t.$viewList);
        tab.view.setWhere(el);
        if(!t.$options.drawOnSelect) {
          tab.view.draw();
        }
      });

      $('> li.tab', t.$tabList).on({
        mouseenter: function(e) { $(this).addClass('hover'); },
        mouseleave: function(e) { $(this).removeClass('hover'); }
      });

      $('> li.tab', t.$tabList).on('click', function(e) {
        e.preventDefault();
        var tab = $(this);
        var tabLabel = tab.children('p').text();
        s_logVideoTabClick('tmzvideopagetabclick_'+tabLabel.replace(/ +/g, '_'));
        t.selectTab($('> li.tab', t.$tabList).index(this));
      });

      switch(t.$options.tabsPosition) {
        case 'top':
          $('> li.tab', t.$tabList).css('float', 'left');
          t.$viewList.css('clear', 'both');
          t.$tabList.append('<li style="clear:both"></li>');
          break;
        case 'left':
          t.$viewList.add(t.$tabList).css('float', 'left');
          break;
      }

      t.selectTab(t.$index);
    },

    // index == 0 is first tab, null is no tab selected
    selectTab: function(index) {
      var t = this;

      if(index !== null && (index < 0 || index > t.tabCount()-1)) {
        t.error('Tab index ' + index + ' cannot be selected because it does not exist');
      }

      //CRZ: Show tabs first, so if we are draw()ing the tab for the first time, it will know its own width()
      $('> li.tab', t.$tabList).add($('> li.view', t.$viewList)).removeClass('selected').addClass('unselected');
      $('> li', t.$viewList).hide();
      if(index !== null) {
        $('> li.tab', t.$tabList).eq(index).add($('> li.view', t.$viewList).eq(index)).addClass('selected').removeClass('unselected');
        $('> li', t.$viewList).eq(index).show();
      }

      if(index === null) {
        t.$viewList.hide();
      } else {
        t.$viewList.show();
        var tab = t.$tabArray.fetchOne(index);
        if(!tab.view.wasDrawn()) {
          tab.view.draw();
        }
      }
      
      t.$index = index;
      t.fireListener('changedTab', index);
    },

    destroy: function() {
      $tabArray = null;
      t.where().destroy();
    },

    ___processOptions: function(options) {
      options = options || {};

      if(options.tabsPosition && options.tabsPosition !== 'top' && options.tabsPosition !== 'left') {
        this.error("OptionsError - tabsPosition must be top or left");
      }

      return $.extend({tabsPosition: 'top', drawOnSelect: false}, options);
    }
  });
})(jQuery);


(function($) {
  TmzClass.create('TmzNestedTabsPickerView', 'TmzSearchPickerView', {
    constructor: function(tabbedView, newSearchArrayGenerator, options) {
      var t = this;
      t.$tabbedView = tabbedView;
      t.$lastSelectedTab = 0;
      t.$___selectedTabInSearch = function(index) {
        if(index !== null) { t.showMainPane(); }
      };
    
      TmzSearchPickerView.apply(this, [newSearchArrayGenerator, t.___processOptions(options)]);
    },

    ___processOptions: function(options) {
      return $.extend({}, options || {});
    },

    showSearchPane: function() {
      var t = this;
      t.$searchPane.show();
      t.$tabbedView.selectTab(null);
      t.$returnFromSearchLink.show();
      t.$tabbedView.addListener('changedTab', t.$___selectedTabInSearch);
    },
    
    showMainPane: function() {
      var t = this;

      t.$tabbedView.removeListener('changedTab', t.$___selectedTabInSearch);
      t.$searchPane.hide();
      t.$returnFromSearchLink.hide();
      t.$tabbedView.selectTab(t.$lastSelectedTab);
    },

    setSearchTitle: function() {
      if(this.$searchPager) {
        var count = this.$searchPager.$slideGrid.$gridLayout.$subViews.totalItemCount();
        this.$searchTitle.html('FOUND' + (count !== null ? ' ' + count : '') + 
                              ' VIDEO' + ((count !== 1) ? 'S' : '') +
                              ' FOR "' + this.$lastSearchTerm + '"');
      }
    },

    drawFunction: function() {
      var t = this;

      t.where().append('<div class="categories"></div><div class="return-from-search">clear results</div><div class="search-button"></div>' +
         '<div class="search-frame"><input type="text" class="search-input" value="' + this.$options.defaultSearchValue + '"/></div>' +
         '<div class="search-pane"><div class="header"><h3 class="title"></h3><div class="clear"></div></div><div class="contents"></div></div>');

      t.setSearchInstanceVariables();

      t.$tabbedView.setWhere(t.scoped('.categories'));

      t.addListener('gotSearchResults', function(asyncArray) {
        var slide = new TmzSlideGridView(new TmzGridLayout(asyncArray, {columns: 6, layoutOrder: 'row-first', columnSpacing: 16}), {columnsShowing: 6});
        t.$searchPager = new TmzInfinipager2View(slide, {where:t.$searchContents});
        t.$searchPager.addListener('elementClicked', function(view) { t.fireListener('searchElementClicked', view); });
        t.setSearchTitle();
        t.$searchPager.setWhere(t.$searchContents);
        t.$searchPager.draw();
        t.$searchPager.showNextPage();
      });

      t.$tabbedView.addListener('changedTab', function(index) {
        if(index !== null) {
          t.$lastSelectedTab = index;
        }
      });

      t.$tabbedView.draw();
      t.___initSearchBehavior();
      t.showMainPane();
    }
  });
})(jQuery);


(function($) {
    TmzClass.create('TmzYoutubeView', 'TmzView', {
        __youtubeClass: function() {
            return 'g-ytsubscribe';
        },

        __youtubeParse: function() {
            gapi.ytsubscribe.go();
        },

        constructor: function(options) {
            var t = this;

            TmzView.apply(t, [t.___processOptions(options)]);
        },

        ___processOptions: function(options) {
            return $.extend({channel: 'tmz', layout: 'default'}, (options || {}));
        },

        setOptions: function(options) {
            $.extend(this.$options, options);
            if(this.wasDrawn()) {
                this.drawFunction();
            }
        },

        drawFunction: function() {
            var tag = $('<div/>').addClass(this.__youtubeClass());
            this.___populateAttributes(tag);
            this.where().html(tag);
            this.___parse();
        },

        ___parse: function() {
            var t = this;
            t.__youtubeParse();
        },

        ___tag: function() {
            return this.scoped('> div:' + this.__youtubeClass());
        },

        ___populateAttributes: function(tag) {
            var t = this;

            if(t.$options.channel) { tag.attr('data-channel', t.$options.channel); }
            if(t.$options.layout) { tag.attr('data-layout', t.$options.layout); }
        }
    });
})(jQuery);

/* 
  - will calculate and set width of content page from elementWidth
  - cannot contain any elements originally
  - events fire on every scroll/push/remove, whether a next/prev availability state has changed or not
  - add new elements via push(), passing blocks of html
  - dynamicCarousel will set up default behavior for clicking on previous/next if passed nextButton: and prevButton: selectors
  
  todo:
    clear ul float properly
    add remove by index
  
  usage:
    <div id="carousel"></div>
    <script>
      $('#carousel').dynamicCarousel({elementWidth:100, elementsShown: 5});
      $('#carousel').data('dynamicCarousel').push('<p>first element</p>');
    </script>

  fyi...'firstelement' refers to the first element showing on the left side of the carousel
*/

(function($) {
  var DynamicCarousel = function(e, options) {
    var t = this;
    t.pane = $(e);
    t.options = options || {};
    t.options = $.extend({trimLeft: 0, trimRight: 0}, options);
    t.firstElementShown = 0;
    
    t.init = function() {
      t.pane.append($('<ul></ul>').css({'list-style-type': 'none', 'padding': '0', 'margin': '0', 'overflow': 'hidden'}));
      t.content = t.pane.children().slice(0,1);
  
      t.elementWidth = t.options.elementWidth || 0;
      t.elementsShown = t.options.elementsShown || 5;

      t.pane.css({overflow: 'hidden', 'position' : 'relative'});
      t.setPaneWidthFromElementsShown();
      t.setContentWidthFromElementWidth
      t.pane.data('dynamicCarousel', t);
            
      t.initDefaultScrollButtonBehavior();
      t.triggerEvents();
    }
    
    t.initDefaultScrollButtonBehavior = function() {
      $(t.options.nextButton).click(function(e) {
        e.preventDefault();
        t.scroll(1);
      });

      $(t.options.prevButton).click(function(e) {
        e.preventDefault();
        t.scroll(-1);
      });
      
      t.pane.bind('dc:previousNotAvailable ', function(e) { $(t.options.prevButton).addClass('dc-button-disabled'); });
      t.pane.bind('dc:previousAvailable', function(e) { $(t.options.prevButton).removeClass('dc-button-disabled'); });
      t.pane.bind('dc:nextNotAvailable', function(e) { $(t.options.nextButton).addClass('dc-button-disabled'); });
      t.pane.bind('dc:nextAvailable', function(e) { $(t.options.nextButton).removeClass('dc-button-disabled'); });
    };
  
    t.push = function(html, id) {
      t.insert(t.elements().length, html, id);
    };
    
    t.insert = function(index, html, id) {
      var el = $('<li></li>').css({'float': 'left', 'width': t.elementWidth, 'overflow': 'hidden'}).append($(html));
      if(id) { 
        if(t.elementWithId(id)) { return false; }
        
        el.data('dynamicCarouselElementId', id);
      }
      
      var priorElement = $('li', t.content).eq(index);
      if(priorElement.size()) {
        priorElement.before(el);
      } else {
        t.content.append(el);
      }
      t.setContentWidthFromElementWidth();

      if(t.elements().length == 1) {
        t.showFirst(1);
      } else {
        t.triggerEvents();
      }
    };
    
    t.unshift = function(html, id) {
      t.insert(0, html, id);
    };
    
    t.elements = function() {
      return t.content.find('li');
    };
    
    t.elementWithId = function(id) {
      t.elements().each(function(i, e) {
        if($(e).data('dynamicCarouselElementId') == id) {
          return $(e);
        }
      });
      
      return false;
    };
  
    t.removeById = function(id) {
      var element = false;

      t.elements().each(function() {
        if($(this).data('dynamicCarouselElementId') == id) {
          element = $(this)
        }
      });
      
      if(element) {
        element.remove()
        t.setContentWidthFromElementWidth();
        t.repositionFirstElementAfterRemove();
        
        return element;
      } else {
        return false;
      }
    };
    
    t.repositionFirstElementAfterRemove = function() {
      t.showFirst(t.boundedFirstElement(t.firstElementShown));
    };
  
    t.scroll = function(offset) {
      t.showFirst(t.firstElementShown + offset);
    };

    t.triggerEvents = function() {
      if(t.firstElementShown <= 1) { 
        t.pane.trigger('dc:previousNotAvailable'); 
      } else { 
        t.pane.trigger('dc:previousAvailable');
      }

      if(t.firstElementShown == t.greatestPossibleFirstElement()) {
        t.pane.trigger('dc:nextNotAvailable');
      } else { 
        t.pane.trigger('dc:nextAvailable');
      }
    };
    
    t.showFirst = function(i) {
      i = t.boundedFirstElement(i);
      t.firstElementShown = i;
      t.setContentOffsetFromFirstElement();
      t.triggerEvents();
    };
    
    t.boundedFirstElement = function(i) {
      return Math.max(Math.min(t.elements().length, 1), Math.min(i, t.greatestPossibleFirstElement()));
    };
    
    t.greatestPossibleFirstElement = function() {
      return Math.max(Math.min(t.elements().length, 1), t.elements().length - t.elementsShown + 1);
    };

    t.setContentOffsetFromFirstElement = function() {
      t.content.css('margin-left', (1-t.firstElementShown)*t.elementWidth - t.options.trimLeft + "px");
    };
    
    t.setPaneWidthFromElementsShown = function() {
      t.pane.css('width', t.elementsShown*t.elementWidth - t.options.trimLeft - t.options.trimRight);
    };
    
    t.setContentWidthFromElementWidth = function() {
      t.content.css('width', (t.elements().length * t.elementWidth) + "px");
    }
    
    t.init();
  };
  
  $.fn.dynamicCarousel = function(options) {
    return this.each(function(){
       (new DynamicCarousel(this, options));
    });
  };
})(jQuery);

