//fgnass.github.com/spinner.js#v1.3

/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define('spinner', factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    if (typeof this == 'undefined') return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: o.color, opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));


/*!
 *  Sharrre.com - Make your sharing widget!
 *  Version: beta 1.3.5
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

;(function ( $, window, document, undefined ) {

  /* Defaults
  ================================================== */
  var pluginName = 'sharrre',
  defaults = {
    className: 'sharrre',
    share: {
      googlePlus: false,
      facebook: false,
      twitter: false,
      digg: false,
      delicious: false,
      stumbleupon: false,
      linkedin: false,
      pinterest: false
    },
    shareTotal: 0,
    template: '',
    title: '',
    url: document.location.href,
    text: document.title,
    urlCurl: 'sharrre.php',  //PHP script for google plus...
    count: {}, //counter by social network
    total: 0,  //total of sharing
    shorterTotal: true, //show total by k or M when number is to big
    enableHover: true, //disable if you want to personalize hover event with callback
    enableCounter: true, //disable if you just want use buttons
    enableTracking: false, //tracking with google analitycs
    hover: function(){}, //personalize hover event with this callback function
    hide: function(){}, //personalize hide event with this callback function
    click: function(){}, //personalize click event with this callback function
    render: function(){}, //personalize render event with this callback function
    buttons: {  //settings for buttons
      googlePlus : {  //http://www.google.com/webmasters/+1/button/
        url: '',  //if you need to personnalize button url
        urlCount: false,  //if you want to use personnalize button url on global counter
        size: 'medium',
        lang: 'en-US',
        annotation: ''
      },
      facebook: { //http://developers.facebook.com/docs/reference/plugins/like/
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        action: 'like',
        layout: 'button_count',
        width: '',
        send: 'false',
        faces: 'false',
        colorscheme: '',
        font: '',
        lang: 'en_US'
      },
      twitter: {  //http://twitter.com/about/resources/tweetbutton
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        count: 'horizontal',
        hashtags: '',
        via: '',
        related: '',
        lang: 'en'
      },
      digg: { //http://about.digg.com/downloads/button/smart
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        type: 'DiggCompact'
      },
      delicious: {
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        size: 'medium' //medium or tall
      },
      stumbleupon: {  //http://www.stumbleupon.com/badges/
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        layout: '1'
      },
      linkedin: {  //http://developer.linkedin.com/plugins/share-button
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        counter: ''
      },
      pinterest: { //http://pinterest.com/about/goodies/
        url: '',  //if you need to personalize url button
        media: '',
        description: '',
        layout: 'horizontal'
      }
    }
  },
  /* Json URL to get count number
  ================================================== */
  urlJson = {
    googlePlus: "",

//new FQL method by Sire
facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
    //old method facebook: "http://graph.facebook.com/?id={url}&callback=?",
    //facebook : "http://api.ak.facebook.com/restserver.php?v=1.0&method=links.getStats&urls={url}&format=json"
    
    // twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
    twitter: "",
    digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
    delicious: 'http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?',
    //stumbleupon: "http://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}&format=jsonp&callback=?",
    stumbleupon: "",
    linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
    pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"
  },
  /* Load share buttons asynchronously
  ================================================== */
  loadButton = {
    googlePlus : function(self){
      var sett = self.options.buttons.googlePlus;
      //$(self.element).find('.buttons').append('<div class="button googleplus"><g:plusone size="'+self.options.buttons.googlePlus.size+'" href="'+self.options.url+'"></g:plusone></div>');
      $(self.element).find('.buttons').append('<div class="button googleplus"><div class="g-plusone" data-size="'+sett.size+'" data-href="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-annotation="'+sett.annotation+'"></div></div>');
      window.___gcfg = {
        lang: self.options.buttons.googlePlus.lang
      };
      var loading = 0;
      if(typeof gapi === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
          po.src = '//apis.google.com/js/plusone.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
      }
      else{
        gapi.plusone.go();
      }
    },
    facebook : function(self){
      var sett = self.options.buttons.facebook;
      $(self.element).find('.buttons').append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-send="'+sett.send+'" data-layout="'+sett.layout+'" data-width="'+sett.width+'" data-show-faces="'+sett.faces+'" data-action="'+sett.action+'" data-colorscheme="'+sett.colorscheme+'" data-font="'+sett.font+'" data-via="'+sett.via+'"></div></div>');
      var loading = 0;
      if(typeof FB === 'undefined' && loading == 0){
        loading = 1;
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = '//connect.facebook.net/'+sett.lang+'/all.js#xfbml=1';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
      else{
        FB.XFBML.parse();
      }
    },
    twitter : function(self){
      var sett = self.options.buttons.twitter;
      $(self.element).find('.buttons').append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-count="'+sett.count+'" data-text="'+self.options.text+'" data-via="'+self.options.via+'" data-hashtags="'+sett.hashtags+'" data-related="'+self.options.related+'" data-lang="'+sett.lang+'">Tweet</a></div>');
      var loading = 0;
      if(typeof twttr === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var twitterScriptTag = document.createElement('script');
          twitterScriptTag.type = 'text/javascript';
          twitterScriptTag.async = true;
          twitterScriptTag.src = '//platform.twitter.com/widgets.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(twitterScriptTag, s);
        })();
      }
      else{
        $.ajax({ url: '//platform.twitter.com/widgets.js', dataType: 'script', cache:true}); //http://stackoverflow.com/q/6536108
      }
    },
    digg : function(self){
      var sett = self.options.buttons.digg;
      $(self.element).find('.buttons').append('<div class="button digg"><a class="DiggThisButton '+sett.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent((sett.url !== '' ? sett.url : self.options.url))+'"></a></div>');
      var loading = 0;
      if(typeof __DBW === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var s = document.createElement('SCRIPT'), s1 = document.getElementsByTagName('SCRIPT')[0];
          s.type = 'text/javascript';
          s.async = true;
          s.src = '//widgets.digg.com/buttons.js';
          s1.parentNode.insertBefore(s, s1);
        })();
      }
    },
    delicious : function(self){
      if(self.options.buttons.delicious.size == 'tall'){//tall
        var css = 'width:50px;',
        cssCount = 'height:35px;width:50px;font-size:15px;line-height:35px;',
        cssShare = 'height:18px;line-height:18px;margin-top:3px;';
      }
      else{//medium
        var css = 'width:93px;',
        cssCount = 'float:right;padding:0 3px;height:20px;width:26px;line-height:20px;',
        cssShare = 'float:left;height:20px;line-height:20px;';
      }
      var count = self.shorterTotal(self.options.count.delicious);
      if(typeof count === "undefined"){
        count = 0;
      }
      $(self.element).find('.buttons').append(
      '<div class="button delicious"><div style="'+css+'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;">'+
      '<div style="'+cssCount+'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">'+count+'</div>'+
      '<div style="'+cssShare+'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;">'+
      '<img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');
      
      $(self.element).find('.delicious').on('click', function(){
        self.openPopup('delicious');
      });
    },
    stumbleupon : function(self){
      var sett = self.options.buttons.stumbleupon;
      $(self.element).find('.buttons').append('<div class="button stumbleupon"><su:badge layout="'+sett.layout+'" location="'+(sett.url !== '' ? sett.url : self.options.url)+'"></su:badge></div>');
      var loading = 0;
      if(typeof STMBLPN === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
          li.src = '//platform.stumbleupon.com/1/widgets.js'; 
          var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
        })();
        s = window.setTimeout(function(){
          if(typeof STMBLPN !== 'undefined'){
            STMBLPN.processWidgets();
            clearInterval(s);
          }
        },500);
      }
      else{
        STMBLPN.processWidgets();
      }
    },
    linkedin : function(self){
      var sett = self.options.buttons.linkedin;
      $(self.element).find('.buttons').append('<div class="button linkedin"><script type="in/share" data-url="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-counter="'+sett.counter+'"></script></div>');
      var loading = 0;
      if(typeof window.IN === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
          li.src = '//platform.linkedin.com/in.js'; 
          var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
        })();
      }
      else{
        window.IN.init();
      }
    },
    pinterest : function(self){
      var sett = self.options.buttons.pinterest;
      $(self.element).find('.buttons').append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(sett.url !== '' ? sett.url : self.options.url)+'&media='+sett.media+'&description='+sett.description+'" class="pin-it-button" count-layout="'+sett.layout+'">Pin It</a></div>');

      (function() {
        var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
        li.src = '//assets.pinterest.com/js/pinit.js'; 
        var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
      })();
    }
  },
  /* Tracking for Google Analytics
  ================================================== */
  tracking = {
    googlePlus: function(){},
    facebook: function(){
      //console.log('facebook');
      fb = window.setInterval(function(){
        if (typeof FB !== 'undefined') {
          FB.Event.subscribe('edge.create', function(targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
          });
          FB.Event.subscribe('edge.remove', function(targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
          });
          FB.Event.subscribe('message.send', function(targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
          });
          //console.log('ok');
          clearInterval(fb);
        }
      },1000);
    },
    twitter: function(){
      //console.log('twitter');
      tw = window.setInterval(function(){
        if (typeof twttr !== 'undefined') {
          twttr.events.bind('tweet', function(event) {
            if (event) {
              _gaq.push(['_trackSocial', 'twitter', 'tweet']);
            }
          });
          //console.log('ok');
          clearInterval(tw);
        }
      },1000);
    },
    digg: function(){
      //if somenone find a solution, mail me !
      /*$(this.element).find('.digg').on('click', function(){
        _gaq.push(['_trackSocial', 'digg', 'add']);
      });*/
    },
    delicious: function(){},
    stumbleupon: function(){},
    linkedin: function(){
      function LinkedInShare() {
        _gaq.push(['_trackSocial', 'linkedin', 'share']);
      }
    },
    pinterest: function(){
      //if somenone find a solution, mail me !
    }
  },
  /* Popup for each social network
  ================================================== */
  popup = {
    googlePlus: function(opt){
      window.open("https://plus.google.com/share?hl="+opt.buttons.googlePlus.lang+"&url="+encodeURIComponent((opt.buttons.googlePlus.url !== '' ? opt.buttons.googlePlus.url : opt.url)), "", "toolbar=0, status=0, width=900, height=500");
    },
    facebook: function(opt){
      window.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent((opt.buttons.facebook.url !== '' ? opt.buttons.facebook.url : opt.url))+"&t="+opt.text+"", "", "toolbar=0, status=0, width=575, height=450");
    },
    twitter: function(opt){
      window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(opt.text)+"&url="+encodeURIComponent((opt.buttons.twitter.url !== '' ? opt.buttons.twitter.url : opt.url))+'&via='+opt.via+'&related='+opt.related, "", "toolbar=0, status=0, width=575, height=450");
    },
    digg: function(opt){
      window.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent((opt.buttons.digg.url !== '' ? opt.buttons.digg.url : opt.url))+"&title="+opt.text+"&related=true&style=true", "", "toolbar=0, status=0, width=650, height=360");
    },
    delicious: function(opt){
      window.open('http://www.delicious.com/save?v=5&noui&jump=close&url='+encodeURIComponent((opt.buttons.delicious.url !== '' ? opt.buttons.delicious.url : opt.url))+'&title='+opt.text, 'delicious', 'toolbar=no,width=550,height=550');
    },
    stumbleupon: function(opt){
      window.open('http://www.stumbleupon.com/badge/?url='+encodeURIComponent((opt.buttons.stumbleupon.url !== '' ? opt.buttons.stumbleupon.url : opt.url)), 'stumbleupon', 'toolbar=no,width=550,height=550');
    },
    linkedin: function(opt){
      window.open('https://www.linkedin.com/cws/share?url='+encodeURIComponent((opt.buttons.linkedin.url !== '' ? opt.buttons.linkedin.url : opt.url))+'&token=&isFramed=true', 'linkedin', 'toolbar=no,width=550,height=550');
    },
    pinterest: function(opt){
      window.open('http://pinterest.com/pin/create/button/?url='+encodeURIComponent((opt.buttons.pinterest.url !== '' ? opt.buttons.pinterest.url : opt.url))+'&media='+encodeURIComponent(opt.buttons.pinterest.media)+'&description='+opt.buttons.pinterest.description, 'pinterest', 'toolbar=no,width=700,height=300');
    }
  };

  /* Plugin constructor
  ================================================== */
  function Plugin( element, options ) {
    this.element = element;
    
    this.options = $.extend( true, {}, defaults, options);
    this.options.share = options.share; //simple solution to allow order of buttons
    
    this._defaults = defaults;
    this._name = pluginName;
    
    this.init();
  };
  
  /* Initialization method
  ================================================== */
  Plugin.prototype.init = function () {
    var self = this;
    if(this.options.urlCurl !== ''){
      urlJson.googlePlus = this.options.urlCurl + '?url={url}&type=googlePlus'; // PHP script for GooglePlus...
      urlJson.stumbleupon = this.options.urlCurl + '?url={url}&type=stumbleupon'; // PHP script for Stumbleupon...
    }
    $(this.element).addClass(this.options.className); //add class
    
    //HTML5 Custom data
    if(typeof $(this.element).data('title') !== 'undefined'){
      this.options.title = $(this.element).attr('data-title');
    }
    if(typeof $(this.element).data('url') !== 'undefined'){
      this.options.url = $(this.element).data('url');
    }
    if(typeof $(this.element).data('text') !== 'undefined'){
      this.options.text = $(this.element).data('text');
    }
    // Adding support for inline Twitter data
    if(typeof $(this.element).data('related') !== 'undefined'){
      this.options.related = $(this.element).attr('data-related');
    }
    if(typeof $(this.element).data('via') !== 'undefined'){
      this.options.via = $(this.element).attr('data-via');
    }
    
    //how many social website have been selected
    $.each(this.options.share, function(name, val) {
      if(val === true){
        self.options.shareTotal ++;
      }
    });
    
    if(self.options.enableCounter === true){  //if for some reason you don't need counter
      //get count of social share that have been selected
      $.each(this.options.share, function(name, val) {
        if(val === true){
          //self.getSocialJson(name);
          try {
            self.getSocialJson(name);
          } catch(e){
          }
        }
      });
    }
    else if(self.options.template !== ''){  //for personalized button (with template)
      this.options.render(this, this.options);
    }
    else{ // if you want to use official button like example 3 or 5
      this.loadButtons();
    }
    
    //add hover event
    $(this.element).hover(function(){
      //load social button if enable and 1 time
      if($(this).find('.buttons').length === 0 && self.options.enableHover === true){
        self.loadButtons();
      }
      self.options.hover(self, self.options);
    }, function(){
      self.options.hide(self, self.options);
    });
    
    //click event
    $(this.element).click(function(){
      self.options.click(self, self.options);
      return false;
    });
  };
  
  /* loadButtons methode
  ================================================== */
  Plugin.prototype.loadButtons = function () {
    var self = this;
    $(this.element).append('<div class="buttons"></div>');
    $.each(self.options.share, function(name, val) {
      if(val == true){
        loadButton[name](self);
        if(self.options.enableTracking === true){ //add tracking
          tracking[name]();
        }
      }
    });
  };
  
  /* getSocialJson methode
  ================================================== */
  Plugin.prototype.getSocialJson = function (name) {
    var self = this,
    count = 0,
    url = urlJson[name].replace('{url}', encodeURIComponent(this.options.url));
    if(this.options.buttons[name].urlCount === true && this.options.buttons[name].url !== ''){
      url = urlJson[name].replace('{url}', this.options.buttons[name].url);
    }
    //console.log('name : ' + name + ' - url : '+url); //debug
    if(url != '' && self.options.urlCurl !== ''){  //urlCurl = '' if you don't want to used PHP script but used social button
      $.getJSON(url, function(json){
        if(typeof json.count !== "undefined"){  //GooglePlus, Stumbleupon, Twitter, Pinterest and Digg
          var temp = json.count + '';
          temp = temp.replace('\u00c2\u00a0', '');  //remove google plus special chars
          count += parseInt(temp, 10);
        }
//get the FB total count (shares, likes and more)
        else if(json.data && json.data.length > 0 && typeof json.data[0].total_count !== "undefined"){ //Facebook total count
          count += parseInt(json.data[0].total_count, 10);
        }
        else if(typeof json[0] !== "undefined"){  //Delicious
          count += parseInt(json[0].total_posts, 10);
        }
        else if(typeof json[0] !== "undefined"){  //Stumbleupon
        }
        self.options.count[name] = count;
        self.options.total += count;
        self.renderer();
        self.rendererPerso();
        //console.log(json); //debug
      })
      .error(function() { 
        self.options.count[name] = 0;
        self.rendererPerso();
       });
    }
    else{
      self.renderer();
      self.options.count[name] = 0;
      self.rendererPerso();
    }
  };
  
  /* launch render methode
  ================================================== */
  Plugin.prototype.rendererPerso = function () {
    //check if this is the last social website to launch render
    var shareCount = 0;
    for (e in this.options.count) { shareCount++; }
    if(shareCount === this.options.shareTotal){
      this.options.render(this, this.options);
    }
  };
  
  /* render methode
  ================================================== */
  Plugin.prototype.renderer = function () {
    var total = this.options.total,
    template = this.options.template;

    if($(this.element).data('count')) {
      total = $(this.element).data('count');
    }

    if(this.options.shorterTotal === true){  //format number like 1.2k or 5M
      total = this.shorterTotal(total);
    }

    if(template !== ''){  //if there is a template
        template = template.replace('{total}', total);
        $(this.element).html(template);
    }
    else{ //template by defaults
      $(this.element).html(
                            '<div class="box"><a class="count" href="#">' + total + '</a>' + 
                            (this.options.title !== '' ? '<a class="share" href="#">' + this.options.title + '</a>' : '') +
                            '</div>'
                          );
    }
  };
  
  /* format total numbers like 1.2k or 5M
  ================================================== */
  Plugin.prototype.shorterTotal = function (num) {
    if (num >= 1e6){
      num = (num / 1e6).toFixed(2) + "M"
    } else if (num >= 1e3){ 
      num = (num / 1e3).toFixed(1) + "k"
    }
    return num;
  };
  
  /* Methode for open popup
  ================================================== */
  Plugin.prototype.openPopup = function (site) {
    popup[site](this.options);  //open
    if(this.options.enableTracking === true){ //tracking!
      var tracking = {
        googlePlus: {site: 'Google', action: '+1'},
        facebook: {site: 'facebook', action: 'like'},
        twitter: {site: 'twitter', action: 'tweet'},
        digg: {site: 'digg', action: 'add'},
        delicious: {site: 'delicious', action: 'add'},
        stumbleupon: {site: 'stumbleupon', action: 'add'},
        linkedin: {site: 'linkedin', action: 'share'},
        pinterest: {site: 'pinterest', action: 'pin'}
      };
      _gaq.push(['_trackSocial', tracking[site].site, tracking[site].action]);
    }
  };
  
  /* Methode for add +1 to a counter
  ================================================== */
  Plugin.prototype.simulateClick = function () {
    var html = $(this.element).html();
    $(this.element).html(html.replace(this.options.total, this.options.total+1));
  };
  
  /* Methode for add +1 to a counter
  ================================================== */
  Plugin.prototype.update = function (url, text) {
    if(url !== ''){
      this.options.url = url;
    }
    if(text !== ''){
      this.options.text = text;
    }
  };

  /* A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
  ================================================== */
  $.fn[pluginName] = function ( options ) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
        }
      });
    }
  };
})(jQuery, window, document);


Showtimes = {

  zip: '',
  views: {masthead: {}, sidebar: {}},
  showtimesCookieExpires: 1, // 1 day
  autoLoad: true,

  logEnabled: this.console && typeof console.log != 'undefined',
  // shhh
  //logEnabled: false,
  
  log: function(msg) {
    if (this.logEnabled) {
      var type = $.type(msg);
      if (type === 'string' || type === 'number') {
        console.log('[TMZShowTimes] ' + msg);
      } else {
        console.log(msg);
      }
    }
  },

  enableAutoLoad: function(enabled) {
    this.log('enableAutoLoad::' + enabled);
    this.autoLoad = enabled ? true : false;
  },

  getShowtimesCookie: function(brand) {
    var cookieName = brand + 'ShowTimes'
    if($.cookie(cookieName) && $.cookie(cookieName).length > 1) {
      var data = $.parseJSON($.cookie(cookieName))
    } else {
      var data = '';
    }
    return data;
  },

  setShowtimesCookie: function(data, brand) {
    var cookieName = brand + 'ShowTimes'
    this.log('setShowtimesCookie::' + cookieName + JSON.stringify(data));
    $.cookie(cookieName, JSON.stringify(data), {path: '/', expires: this.showtimesCookieExpires});
  },

  showForm: function($container) {
    // $container.find('input.zip-code-field').val('');
    // $container.find('.change-location').hide();
    // $container.find('.zip-form-overlay').show();
    // $container.find('.stations-results.hide-if-form').hide();
  },

  hideForm: function($container) {
    // $container.find('.zip-form-overlay').hide();
    // $container.find('.change-location').show();
    // $container.find('.stations-results.hide-if-form').show();
  },

  setZipChangeLink: function($container, zip) {
    // if(zip && zip.length === 5) {
    //   var text = 'Not in ' + zip + '?';
    // } else {
    //   var text = 'Enter your zipcode';
    // }
    // $container.find('.change-location .zip').html('<a href="#">' + text +' </a> ');
  },

  // call with showtimes wrapper to update each brand, or with a brand's div to just update that brand
  handleNoResults: function($container) {
    var $stations = $container.find('.stations');
    var $remindMe = $container.find('.remindme');
    var showLink = $stations.data("showtimesUrl");
    $stations.html("<span class='no-results'>Couldn't find listings in your area</span>");
    // <br><a href=" + showLink + ">Full schedule</a>
    $stations.show();
    $remindMe.hide();
    $('.masthead-showtimes .change-location').show();
    this.setZipChangeLink($('.masthead-showtimes'), this.zip);
  },

  callShowtimesService: function(brand, zip) {
    var t = this;
    t.log('callShowtimesService, brand:' + brand);
    var service = WbShowTimes({siteName: brand});

    // showtimes service succeeded
    service.getByUSZip(zip).then(function(data) {
      t.log('callShowtimesService for ' + brand + ' succeeded');
      t.setShowtimesCookie(data, brand);
      t.renderHeader(data, brand);
      t.renderSidebar(data, brand);
    },
    // showtimes service failed
    function() {
      t.log('callShowtimesService for ' + brand + 'failed, no data');
      t.setShowtimesCookie('', brand);
      t.renderHeader('', brand);
      t.renderSidebar('', brand);
    });
  },

  bindEvents: function($container) {
    var t = this;
    $container.delegate('.change-location a', 'click', function() {
      t.showForm($container);
      return false;
    });

    $container.delegate('form', 'submit', function() {
      $container.find('.active-stations').html('');
      var $zip = $(this).find('input.zip-code-field');
      var zip = $zip.val().replace(/[^a-zA-Z0-9\s_-]/g, '');
      t.setZipChangeLink($container, zip);
      t.zip = zip;
      t.hideForm($('.masthead-showtimes'));
      t.hideForm($('.next-tmzlive-locator'));
      t.hideForm($('.next-tmz-locator'));

      if (zip) {
        t.log('bindEvents::formsubmit::zip: ' + zip);
        WbGeoLocation.setZip(zip);
        t.renderShowtimes();
      } else {
        t.log('bindEvents::formsubmit::no zip');
        WbGeoLocation.setZip('');
        t.handleNoResults($container);
      }
      return false;
    });
  },

  daySearch: function(array, day) {
    day = $.grep(array, function(e){ return e.day === day; })[0];
    return day;
  },

  showtimeCompare: function(a,b) {
    if (a.day < b.day)
       return -1;
    if (a.day > b.day)
      return 1;
    return 0;
  },

  groupShowtimesByDay: function(data) {
    var t = this;
    var newdata = {};
    newdata.stations = [];
    $.each(data, function(i,stationObject) {
      var station = {};
      station.logo_thumb = stationObject.station.logo_thumb;
      station.affiliate = stationObject.station.affiliate;
      station.callsign = stationObject.station.callsign;
      station.showtimesByDay = [];

      $.each(stationObject.station.showtimes, function(i,showtime) {
        var dayGroup = {day: {}};
        var savedDay = t.daySearch(station.showtimesByDay, showtime.day);
        if(station.showtimesByDay && savedDay) {
          dayGroup = savedDay;
        } else {
          dayGroup.day = showtime.day;
          station.showtimesByDay.push(dayGroup);
        }

        if(dayGroup && dayGroup.times) {
          var timeIsUnique = (dayGroup.times.indexOf(showtime.time) === -1)
          if (timeIsUnique) {
            dayGroup.times.push(showtime.time);
          }
        } else {
          dayGroup.times = []; 
          dayGroup.times.push(showtime.time);
        }
      });

      station.showtimesByDay.sort(t.showtimeCompare);

      if (station.showtimesByDay.length > 0) {
        newdata.stations.push(station);
      }
    });
    return newdata;
  },

  renderHeader: function(data, brand) {
    var t = this;
    t.log('renderHeader, brand:' + brand);
    var container = '.showtimes-block.' + brand;
    var $container = $(container);

    if(!$container.length > 0) {
      return;
    }

    $('.zip-code-field').val(this.zip);

    // this.setZipChangeLink($('.masthead-showtimes'), this.zip);
    // t.hideForm($container);

    data = t.groupShowtimesByDay(data);
    if(data && data.stations.length > 0) {
      t.views.masthead.stationView = '<li class="station">' +
        '<div class="callsign">' +
          '{{if affiliate}}${affiliate} {{/if}}' +
          '{{if callsign}}(${callsign}){{/if}}' +
        '</div>' +
        '<dl class="listings">' +
          '{{each(i,showtime) showtimesByDay}}' +
            '<dt>${showtime.day} </dt>' + 
            '{{each(i,time) showtime.times}}' +
              '{{if i < 3 }}' +
                '<dd>${time}' +
                '{{if showtime.times.length - 1 > i}},{{/if}}' +
                ' </dd>' +
              '{{/if}}' +
            '{{/each}}' +
            '{{if showtime.day === "M-F"}}<br/>{{/if}}' +
          '{{/each}}' +
        '</dl>' +
      '</li>';
      $.template('showTimes_masthead_StationView', t.views.masthead.stationView);

      var $stations = $container.find('ul.stations').show();

      $container.data('zip', t.zip);
      $stations.html('');
      $.each(data.stations, function(index, value) {
        if(index > 0) { return; }
        $.tmpl('showTimes_masthead_StationView', value).appendTo($stations);
      });
      var $remindMe = $container.find('.remindme');
      var $href = $remindMe.attr('href');
      $href = $href.replace(/(zip=)[^\&]+/, '$1'+this.zip);
      $remindMe.attr('href', $href);
      $remindMe.show();
    } else {
      t.handleNoResults($container);
    }
    $('.stations-results').tinycarousel();

  },

  renderSidebar: function(data, brand) {
    var t = this;
    t.log('renderSidebar, brand:' + brand);
    var container = '.next-' + brand + '-locator';
    var $container = $(container);

    if(!$container.length > 0) {
      return;
    }

    this.setZipChangeLink($(container), this.zip);
    t.hideForm($container);
    data = t.groupShowtimesByDay(data);

    if(data && data.stations.length > 0) {
      t.views.sidebar.stationView = '<li class="station">' +
        '<div class="callsign">' +
          '{{if logo_thumb}}' +
            '<img src="${logo_thumb}"></img>' + 
          '{{else}}' +
            '{{if affiliate}}${affiliate} {{/if}}' +
            '{{if callsign}}(${callsign}){{/if}}' +
          '{{/if}}' +
        '</div>' +
        '<dl class="listings">' +
          '{{each(i,showtime) showtimesByDay}}' +
            '<dt>${showtime.day} </dt>' + 
            '{{each(i,time) showtime.times}}' +
              '{{if i < 3 }}' +
                '<dd>${time}' +
                '{{if showtime.times.length - 1 > i}},{{/if}}' +
                ' </dd>' +
              '{{/if}}' +
            '{{/each}}' +
            '{{if showtime.day === "M-F"}}<br/>{{/if}}' +
          '{{/each}}' +
        '</dl>' +
      '</li>';
      $.template('showTimes_sidebar_StationView', t.views.sidebar.stationView);

      var $stations = $container.find('.js-stations').show();

      $container.data('zip', t.zip);
      $stations.html('');
      $.each(data.stations, function(index, value) {
        $.tmpl('showTimes_sidebar_StationView', value).appendTo($stations);
      });
    } else {
      t.handleNoResults($container);
    }
  },

  renderShowtimes: function() {
    var t = this;
    var tmzShowtimesResults = this.getShowtimesCookie('tmz');
    var tmzLiveShowtimesResults = this.getShowtimesCookie('tmzlive');
    // var tmzSportsShowtimesResults = this.getShowtimesCookie('tmzsports');
    var tmzHasResults = tmzShowtimesResults && tmzShowtimesResults.length > 6;
    var tmzLiveHasResults = tmzLiveShowtimesResults && tmzLiveShowtimesResults.length > 6;
    // var tmzSportsHasResults = tmzSportsShowtimesResults && tmzSportsShowtimesResults.length > 6;
    var zip = t.zip;

    if(tmzHasResults) {
      t.log('getShowtimesCookie from cookie succeeded for tmz');
      t.renderHeader(tmzShowtimesResults, 'tmz');
      t.renderSidebar(tmzShowtimesResults, 'tmz');
    } else {
      t.log('getShowtimesCookie from cookie failed for tmz');
      t.callShowtimesService('tmz', zip);
    }

    if(tmzLiveHasResults) {
      t.log('getShowtimesCookie from cookie succeeded for tmzlive');
      t.renderHeader(tmzLiveShowtimesResults, 'tmzlive');
      t.renderSidebar(tmzLiveShowtimesResults, 'tmzlive');
    } else {
      t.log('getShowtimesCookie from cookie failed for tmzlive');
      t.callShowtimesService('tmzlive', zip);
    }

    // if(tmzSportsHasResults) {
    //   t.log('getShowtimesCookie from cookie succeeded for tmzsports');
    //   t.renderHeader(tmzSportsShowtimesResults, 'tmzsports');
    //   t.renderSidebar(tmzSportsShowtimesResults, 'tmzsports');
    // } else {
    //   t.log('getShowtimesCookie from cookie failed for tmzsports');
    //   t.callShowtimesService('tmzsports', zip);
    // }
  },

  init: function() {

    var t = this;

    // set up form & button actions on header and sidebar widgets
    t.bindEvents($('.masthead-showtimes'));
    t.bindEvents($('.next-tmzlive-locator'));
    t.bindEvents($('.next-tmz-locator'));

    var zipCookie = WbGeoLocation.getZipCookie();
    if(!zipCookie || zipCookie == '-1' || !zipCookie.length > 0) {
      t.log('getZip from cookie failed, no zip');

      if(!t.autoLoad) {
        t.log('no autoLoad, no zip');

        // bring up search form with no close button
        t.showForm($('.masthead-showtimes'));
        t.showForm($('.next-tmzlive-locator'));
        t.showForm($('.next-tmz-locator'));

        $('.zip-form-close').hide(); 
      } else {
        t.log('autoLoad, get zip from WbGeoLocation');


        // Zip service succeeded
        setTimeout(function() {
          WbGeoLocation.getZip().done(function(zip) {
            t.log('getZip succeeded: ' + zip);
            t.zip = zip;
            t.renderShowtimes();
          });
        }, 2000);

        // Zip service failed
        setTimeout(function() {
          WbGeoLocation.getZip().fail(function(zip) {
            t.log('getZip failed, no zip');
            // manually set no results if there is no zip set, in case of strange showtimes cookies
            t.zip = '';
            t.setShowtimesCookie('', 'tmz');
            t.setShowtimesCookie('', 'tmzlive');
            t.setShowtimesCookie('', 'tmzsports');

            // bring up search form with no close button
            t.showForm($('.masthead-showtimes'));
            t.showForm($('.next-tmzlive-locator'));
            t.showForm($('.next-tmz-locator'));

            $('.zip-form-close').hide();
          });
        }, 2000);
      }
    } else {
      t.log('getZip from cookie succeeded');
      t.zip = zipCookie;
      t.renderShowtimes();
    }
  }
}

/**
 * Created by jimmy on 3/12/14.
 */
$(document).on('click', '.has-adid', function() {
    var $link = $(this);
    var adId = $link.data('adid');
    var href = $link.attr('href');
    $link.attr("href", href + "?adid=" + adId);
    return true;
});

/**
 * Created by jimmy on 4/2/15.
 */
$(document).on('click', '.kWidgetPlayBtn', function() {
  var $kalturaPlayerID = $(this).attr('id').replace('_playBtn', '');
  var $playerDiv = $('div#'+$kalturaPlayerID).closest('div[data-video-type=kaltura]');
  $playerDiv.find('div.launch-quote').hide();
  var $priorPriorElement = $playerDiv.prev().prev();
  if ($priorPriorElement.hasClass('primary-image-swipe')) {
    $priorPriorElement.hide();
  }
  return true;
});


jQuery.fn.live = function( types, data, fn ) { jQuery( this.context ).on( types, this.selector, data, fn ); return this; }

$(document).ready(function() {
  var $header = $('#masthead-wrap');
  var $mastheadAd = $('.masthead-ad');
  var $masthead = $('.masthead');
  var mastheadTop = 0;
  if($masthead.offset()) {
    var mastheadTop = $masthead.offset().top;
  }
  var $watchTmz = $('.watch-tmz');
  var $showtimes = $('#showtimes-main');
  var $nav = $('#nav');
  var $body = $('body');
  var isSticky = false;
  var isTouchDevice = 'ontouchstart' in document.documentElement;
  var navTop = 0;

  $(window).on('scroll', function() {
    if($(document).scrollTop() > $('#nav').offset().top) {
      if(!isSticky) {
        navTop = $('#nav').offset().top;
        $header = $('#masthead-wrap');
        var headerHeight = $header.outerHeight() - 20; // 20 padding
        $header.addClass('is-sticky');
        $body.css('padding-top', headerHeight);
        isSticky = true;
      }
    } else if($(document).scrollTop() < navTop) {
      if(isSticky) {
        $body.css('padding-top', 0);
        $body.removeClass('fixfixed');
        $header.removeClass('is-sticky');
        if(isTouchDevice) {
          $header.css('top','');
        }
        isSticky = false;
      }
    }
  });

  // need line below in case user has adBlock running
  if(mastheadTop > 50) {
    setTimeout(function() {
      $header.addClass('sticky-ad-hidden');
      setTimeout(function() {
        $mastheadAd.removeClass('first-show');
      }, 500);
    }, 15000);
  }

  $watchTmz.add($showtimes).on('mouseenter', function() {
    $showtimes.show();
  });

  $watchTmz.add($showtimes).on('mouseleave', function() {
    $showtimes.hide();
  });
});


/*SWFObject v2.2 <http://code.google.com/p/swfobject/>
 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

$(document).ready(function() {
  $('object#inline').each(function(i) {
    $('<div id="ds2kaltura_' + i + '"></div>').insertBefore($(this));
    var pattern = /\?mediaKey\=([a-zA-Z0-9-]+)/;
    var swfurl = "";
    if($(this).attr('data')) {
      swfurl = $(this).attr('data');
    } else if ($(this).find('param[name="movie"]').val()) {
      swfurl = $(this).find('param[name="movie"]').val();
    }
    var mediaKey = pattern.exec(swfurl)[1];
    ds2kalturaReplace(i, mediaKey, $(this));
  });
});

ds2kaltura = function(mediaKey, entryIdCallback) {
  $.getJSON('http://apps.telepixtv.com/ds2kaltura/getEntryId.php?site=tmz&mediaKey='+mediaKey+'&callback=?', function(data) {
    entryIdCallback(((typeof data.entryId === "string") && data.entryId.length > 0) ? data.entryId : null );
  });
};

brightcove2kaltura = ds2kaltura;

ds2kalturaReplace = function(index, mediaKey, replacedDomElement) {
  ds2kaltura(mediaKey, function(entryId) {
    var kalturaCode = '<object id="kaltura_player_1308771786" name="kaltura_player_1308771786" type="application/x-shockwave-flash" allowFullScreen="true" allowNetworking="all" allowScriptAccess="always" height="363" width="550" bgcolor="#000000" xmlns:dc="http://purl.org/dc/terms/" xmlns:media="http://search.yahoo.com/searchmonkey/media/" rel="media:video" resource="http://www.kaltura.com/index.php/kwidget/cache_st/1308771786/wid/_591531/uiconf_id/4899061/entry_id/'+entryId+'" data="http://www.kaltura.com/index.php/kwidget/cache_st/1308771786/wid/_591531/uiconf_id/4899061/entry_id/'+entryId+'"><param name="allowFullScreen" value="true" /><param name="allowNetworking" value="all" /><param name="allowScriptAccess" value="always" /><param name="bgcolor" value="#000000" /><param name="flashVars" value="&" /><param name="movie" value="http://www.kaltura.com/index.php/kwidget/cache_st/1308771786/wid/_591531/uiconf_id/4899061/entry_id/'+entryId+'" /><span property="media:width" content="550"><span property="media:height" content="363"></span> <span property="media:type" content="application/x-shockwave-flash"></span> </object>';
    //kalturaCode += "<p class='kDebug'>MediaKey: "+mediaKey+"<br/>entry_id: "+entryId+"</div>";
    replacedDomElement.hide();
    $('#ds2kaltura_'+index).html(kalturaCode);
  });
};

// BEGIN Functions for ActiveX patch to IE/IE7 ------------------//
function FlashTag(src, width, height, version) {
    if (arguments.length < 4)
    {
        throw new Exception('RequiredAttributeException',
                            'You must pass in a src, width, height, and version when creating a FlashTag.');
    }

    for (var i = 0; i < arguments.length; ++i)
    {
        if (arguments[i] == undefined || arguments[i] == null)
        {
            throw new Exception('RequiredAttributeException',
                                'All constructor arguments must have values.');
        }
    }

    // Required
    this.src            =  src;
    this.width          =  width;
    this.height         =  height;
    this.version        =  version;

    this.id             =  null;
    this.flashVars      =  null;
    this.flashVarsStr   =  null;
    this.genericParam   = new Object();
    this.ie = (navigator.appName.indexOf ("Microsoft") != -1) ? 1 : 0;
}
FlashTag.prototype.setSource = function(src) {
    this.src = src;
}
FlashTag.prototype.setWidth = function(w) {
    this.width = width;
}
FlashTag.prototype.setHeight = function(h) {
    this.h = height;
}
FlashTag.prototype.setVersion = function(v) {
    this.version = v;
}
FlashTag.prototype.setId = function(id) {
    this.id = id;
}
FlashTag.prototype.setBgcolor = function(bgc) {
    if (bgc.charAt(0) != '#') bgc = '#' + bgc;
    this.genericParam['bgcolor'] = bgc;
}
FlashTag.prototype.addFlashVars = function(fvs) {
    this.flashVarsStr = fvs;
}
FlashTag.prototype.addFlashVar = function(n, v) {
    if (this.flashVars == null) this.flashVars = new Object();
    this.flashVars[n] = v;
}
FlashTag.prototype.removeFlashVar = function(n) {
    if (this.flashVars != null) this.flashVars[n] = undefined;
}
FlashTag.prototype.setSwliveconnect = function(swlc) {
    this.genericParam['swliveconnect'] = swlc;
}
FlashTag.prototype.setPlay = function(p) {
    this.genericParam['play'] = p;
}
FlashTag.prototype.setLoop = function(l) {
    this.genericParam['loop'] = l;
}
FlashTag.prototype.setMenu = function(m) {
    this.genericParam['menu'] = m;
}
FlashTag.prototype.setQuality = function(q) {
    if (q != 'low' && q != 'high' && q != 'autolow' && q != 'autohigh' && q != 'best')
    {
        throw new Exception('UnsupportedValueException',
                            'Supported values are "low", "high", "autolow", "autohigh", and "best".');
    }
    this.genericParam['quality'] = q;
}
FlashTag.prototype.setScale = function(sc) {
    if (sc != 'showall' && sc != 'noborder' && sc != 'exactfit' && sc != 'noscale')
    {
        throw new Exception('UnsupportedValueException',
                            'Supported values are "showall", "noborder", "exactfit, and "noscale".');
    }
    this.genericParam['scale'] = sc;
}
FlashTag.prototype.setAlign= function(a) {
    if (a != 'l' && a != 't' && a != 'r' && a != 'b')
    {
        throw new Exception('UnsupportedValueException',
                            'Supported values are "l", "t", "r" and "b".');
    }
    this.genericParam['align'] = a;
}
FlashTag.prototype.setSalign= function(sa) {
    if (sa != 'l' && sa != 't' && sa != 'r' && sa != 'b' && sa != 'tl' && sa != 'tr' && sa != 'bl' && sa != 'br')
    {
        throw new Exception('UnsupportedValueException',
                            'Supported values are "l", "t", "r", "b", "tl", "tr", "bl" and "br".');
    }
    this.genericParam['salign'] = sa;
}
FlashTag.prototype.setWmode = function(wm) {
    if (wm != 'window' && wm != 'opaque' && wm != 'transparent')
    {
        throw new Exception('UnsupportedValueException',
                            'Supported values are "window", "opaque", and "transparent".');
    }
    this.genericParam['wmode'] = wm;
}
FlashTag.prototype.setBase = function(base) {
    this.genericParam['base'] = base;
}
FlashTag.prototype.toString = function() {
    var flashTag = new String();
    if (this.ie)
    {
        flashTag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
        if (this.id != null)
        {
            flashTag += 'id="'+this.id+'" ';
        }
        flashTag += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+this.version+'" ';
        flashTag += 'width="'+this.width+'" ';
        flashTag += 'height="'+this.height+'">';
        flashTag += '<param name="movie" value="'+this.src+'"/>';

        for (var n in this.genericParam)
        {
            if (this.genericParam[n] != undefined && this.genericParam[n] != null)
            {
                flashTag += '<param name="'+n+'" value="'+this.genericParam[n]+'"/>';
            }
        }

        if (this.flashVars != null)
        {
            var fv = this.getFlashVarsAsString();
            if (fv.length > 0)
            {
                flashTag += '<param name="flashvars" value="'+fv+'"/>';
            }
        }
        flashTag += '</object>';
    }
    else
    {
        flashTag += '<embed src="'+this.src+'"';
        flashTag += ' width="'+this.width+'"';
        flashTag += ' height="'+this.height+'"';
        flashTag += ' type="application/x-shockwave-flash"';
        if (this.id != null)
        {
            flashTag += ' name="'+this.id+'"';
        }

        for (var n in this.genericParam)
        {
            if (this.genericParam[n] != undefined && this.genericParam[n] != null)
            {
                flashTag += (' '+n+'="'+this.genericParam[n]+'"');
            }
        }
        if (this.flashVars != null || this.flashVarsStr != null)
        {
            var fv = this.getFlashVarsAsString();
            if (fv.length > 0)
            {
                flashTag += ' flashvars="'+fv+'"';
            }
        }
        flashTag += ' pluginspage="http://www.macromedia.com/go/getflashplayer">';
        flashTag += '</embed>';
    }
    return flashTag;
}
FlashTag.prototype.write = function(doc) {
    doc.write(this.toString());
}
FlashTag.prototype.getFlashVarsAsString = function() {
    var qs = new String();
    for (var n in this.flashVars)
    {
        if (this.flashVars[n] != undefined && this.flashVars[n] != null)
        {
            qs += (escape(n)+'='+escape(this.flashVars[n])+'&');
        }
    }

    if (this.flashVarsStr != null) return qs + this.flashVarsStr;

    return qs.substring(0, qs.length-1);
}
FlashTag.prototype.setParams = function( id, bgc, fvs, swlc, p, l, m, q, sc, a, wm, base ) {
    if (id != null) this.id             =  id;
    if (fvs != null) this.flashVarsStr   =  fvs;

    if (bgc != null) this.setBgcolor(bgc);
    if (swlc != null) this.setSwliveconnect(swlc);
    if (p != null) this.setPlay(p);
    if (l != null) this.setLoop(l);
    if (m != null) this.setMenu(m);
    if (q != null) this.setQuality(q);
    if (sc != null) this.setScale(sc);
    if (a != null) this.setAlign(a);
    if (wm != null) this.setWmode(wm);
    if (base != null) this.setBase(base);
}
function writeOnLoad() {
         try {
                 if ( flashTagParams != undefined ) {
                         var tag =  new FlashTag(flashTagParams.src, flashTagParams.width, flashTagParams.height, flashTagParams.version );
                         document.write(tag.toString());
                 }
         } catch(ex) {
                // Do nothing
         }
}
writeOnLoad();
// END Functions for ActiveX patch to IE/IE7 ------------------//

