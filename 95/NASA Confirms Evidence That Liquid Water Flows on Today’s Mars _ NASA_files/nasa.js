/* jshint ignore:start */

/* jshint ignore:end */

define('nasa/adapters/application', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTAdapter.extend({
    namespace: 'api/1',
    headers: function() {
      return {
        "Content-Type": "application/json",
      };
    },
    buildURL: function(type, id, record) {
      var url = [],
          host = Ember['default'].get(this, 'host'),
          prefix = this.urlPrefix();


      // This first one is only for calendar items
      if( record && record.get('urlQuery') ) {
        url.push('query');
      // this following rule should be temporary. We should publish
      // news items to production when they are consumed by feeds.
      } else if (id && type === "news") {
        url.push('query');
      } else if (id && !Ember['default'].isArray(id)) {
        url.push('record');
      } else {
        url.push('query');
      }

      if (type) { url.push(this.pathForType(type, id)); }

      // We might get passed in an array of ids from findMany
      // in which case we don't want to modify the url, as the
      // ids will be passed in through a query param
      if (id && !Ember['default'].isArray(id)) { url.push(encodeURIComponent(id)); }

      if (prefix) { url.unshift(prefix); }

      url = url.join('/');
      if (!host && url) { url = '/' + url; }

      url += '.json';

      // For passing GET data
      if( record && record.get('urlQuery') ){
        url += '?'+record.get('urlQuery');
      }

      return url;
    },

    pathForType: function(type, id) {
      var nodeTypes = [
        'ubernode',
        'news',
        'calendarEvent',
        'landingPage',
        'sidemenu',
        'submenu',
        'bannerimage'
      ];

      if ( nodeTypes.indexOf(type) >= 0 && id ) { return 'node'; }
      if (type === 'menu') { return 'menu'; }
      if (type === 'calendarEvent') { return 'calendar'; }

      return Ember['default'].String.pluralize(type);
    },
  });

});
define('nasa/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'nasa/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('nasa/components/add-this', ['exports', 'ember', 'nasa/mixins/addthis-toolbox'], function (exports, Ember, AddThisToolbox) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(AddThisToolbox['default'],{
    pid: function(){
      return this.get('pubid') || 'addthisforshare';
    }.property()
  });

});
define('nasa/components/addthis-follow', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['flush'],
    didInsertElement: function(){
      Ember['default'].run.next(this, this.renderAddThis);
    },

    renderAddThis: function() {
      var pubid = 'ra-'+this.get('pubid');
      window.addthis_config = window.addthis_config || {};
      window.addthis_config.pubid = pubid;
      window.addthis_config.ui_508_compliant = true;

      if (window.addthis && typeof window.addthis.init === 'function') {
        window.addthis.init();
        window.addthis.toolbox('.addthis_horizontal_follow_toolbox');
      }
    }
  });

});
define('nasa/components/alert-card', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'a',
    layoutName: 'components/alert-card',
    classNames: ['card', 'iso-card', 'alert-banner', 'h-lg-1 col-md-12 col-sm-12'],
    attributeBindings: ['alertUri:href'],

    alertUri: Ember['default'].computed.alias('content.uri'),

  });

});
define('nasa/components/anyfeed-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmberCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmberCard['default'], {
    layoutName: "components/anyfeed-card",

    anyfeedNodes: Ember['default'].computed.alias('content.nodes'),
    rss: Ember['default'].computed.alias('anyfeedNodes.firstObject.rss'),
    feedTitle: Ember['default'].computed.alias('anyfeedNodes.firstObject.channelTitle'),
    feedLink: Ember['default'].computed.alias('anyfeedNodes.firstObject.channelLink'),
    feedDesc: Ember['default'].computed.alias('anyfeedNodes.firstObject.channelDescription'),
    hasAltImage: Ember['default'].computed.notEmpty('content.image.content.crop1x1'),
    is2x2: Ember['default'].computed.equal('cardSize', '2x2'),
    isLoaded: true,

    onInit: function() {
      this.get('anyfeedNodes');
    }.on('init'),

    single: function() {
      return this.get('anyfeedNodesSorted.firstObject');
    }.property('anyfeedNodesSorted.[]'),

    anyfeedNodesSorted: Ember['default'].computed.sort('anyfeedNodes', function(a, b) {
      if (a.get('pubdate').diff(b.get('pubdate')) < 0) {
        return 1;
      }
      else if (b.get('pubdate').diff(a.get('pubdate')) < 0) {
        return -1;
      }
      return 0;
    }),

  });

});
define('nasa/components/calendar-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    layoutName: 'components/calendar-card',
    start: new Date(),
    end: new Date(),
    events: Ember['default'].A(),

    calendarTitle: Ember['default'].computed.alias('content.title'),
    calendarName: Ember['default'].computed.alias('content.calendarName'),
    calendarLink: Ember['default'].computed.alias('content.calendarLink'),

    didInsertElement: function() {
      this.set('storeName', this.get('targetObject.targetObject.store'));

      this.refresh();
    },

    willInsertElement: function() {
      this.start.setDate(1);
      this.start.setHours(0);
      this.start.setMinutes(0);
      this.start.setSeconds(0);
      this.start.setMilliseconds(0);

      this.end = new Date(this.start);
      this.end.setMonth(this.start.getMonth() + 1);
      this.end.setMilliseconds(-1);
    },

    refresh: function(){
      var selector = '.calendar-card-container';
      var element = this.$(selector);

      element.fullCalendar({
        header: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        events: [],
        theme: true
      });

      var component = this;
      this.loadCalendar(this.start, this.end).then(function(results){
        var added = [];
        for( var i = 0; i < results.length; ++i ){
          var content = results[i];

          if(added.indexOf(content.id) < 0 ) {
            added.push(content.id);

            var dates = content.get('eventDate');
            if(!dates){
              continue;
            }

            for( var ev=0; ev < dates.length; ev++){
              var startDate = dates[ev].value;
              var endDate = dates[ev].value2;

              var url = content.get('additionalLink1') ? content.get('additionalLink1')[0]['url'] : null;
              
              var event = {
                'id': content.get('id'),
                'title': content.get('title'),
                'start': startDate,
                'end': endDate,
                'url': url,
                'description': content._data.subtitle,
                'image': content._data.masterImage
              };
              component.events.push(event);
            }
          }
        }
        element.fullCalendar('destroy');
        element.fullCalendar({
          header: {
            left: 'prev',
            center: 'title',
            right: 'next'
          },
          events: component.events,
          theme: true,
          eventLimit: 1,
          eventAfterRender: function(){
            $('.fc-event-container.fc-limited').removeClass('fc-limited');
            $('.fc-more-cell').hide();
          },
          eventMouseover: function( event, jsEvent, view ){
            var eventList = component.events.filter(function(e){
              var eventDate = new Date(event.start._d),
                  start = eventDate.setHours(0,0,0,0),
                  end   = start + 86400000,
                  evt   = new Date(e.start).getTime();
              return start <= evt && evt < end;
            });
            Ember['default'].$('.popover.in').popover('hide');
            Ember['default'].$(this).popover({
              html: true,
              placement: function(tip, element) {
                var offset = $(element).offset();
                if (offset.left > 325) {
                  return "left";
                }
                if (offset.left < 325) {
                  return "right";
                }
                if (offset.top < 300){
                  return "bottom";
                }
                return "top";
              },
              container: element,
              trigger: 'manual',
              content: function() {
                var textList = '';
                eventList.forEach(function(evt){
                  var text = "";
                  var date = moment(evt.start).format("ddd, MMM Do YYYY h:mma");
                  text += (evt.title ? '<div class="description">'+evt.title+'</div>' : '');
                  text += (evt.start ? '<div class="date">'+date+'</div>' : '');
                  text += (evt.url ? '<a href="'+evt.url+'">View Event</a>' : '');
                  text += '<br>';
                  textList += text;
                });

                var output = '<div class="calendar-popover-content">';
                output += '<div class="text">' + textList + '</div>';
                output += '</div>';

                return output;
              }
            });
            Ember['default'].$(this).popover('show');
          },
          eventMouseout: function(event, jsEvent, view) {
            var self = this;
            var watchHover = setInterval(function() {
              if (!$(".popover:hover").length) {
                Ember['default'].$(self).popover("hide");
                clearInterval(watchHover)
              }
            }, 250);
          }
        });
        element.fullCalendar('render');
      });
    },

    loadCalendar: function(start, end) {
      var strStart = window.moment(start).format('YYYYMMDDHHmm'),
          strEnd = window.moment(end).format('YYYYMMDDHHmm'),
          queries = [],
          self = this;

      for(var i = 0; i < this.get('calendarName').length; i++){
        queries.push(this.get('calendarName')[i].tid);
      }

      var query = {
        'timeRange': (strStart && strEnd) ? strStart+'--'+strEnd : 'all',
        'calendars': (queries.length > 0) ? queries.join('+') : 'all'
      };


      return this.get('storeName').find('calendar-event', query).then(function(results){
        return results.get('content');
      }, null, 'Find calendar events')
      .then(function(content){
        var promises = content.map(function(item){
          return item.reload();
        });
        return Ember['default'].RSVP.all(promises);
      }, null, "Reload all calendar events");
    }
  });

});
define('nasa/components/calendar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var CalendarComponent = Ember['default'].Component.extend({
    layoutName: 'calendar',
    
  });

  exports['default'] = CalendarComponent;

});
define('nasa/components/close-button', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions:{
      goBack: function(){
        this.sendAction('goBack');
      }
    }
  });

});
define('nasa/components/collapsible-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'section',
    layoutName: 'components/collapsible-section',
    classNames: ['collapsible'],
    classNameBindings: ['isOpen:opened'],
    showFadeout: true,
    contentHeight: function() {
      if (this.$().height() < this.$().find('.fadeout').height()) {
        if (this.$().find('.side-image').length > 0) {
          return;
        } else {
          this.set('showFadeout',false);
        }
      }
    }.on('didInsertElement'),
  });

});
define('nasa/components/countdown-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    tagName: 'a',
    layoutName: 'components/countdown-card',
    attributeBindings: ['url:href'],
    title: '',

    url: Ember['default'].computed.alias('content.link'),

    loadImage: function() {
      var self = this,
          imageEl = new Image();

      imageEl.src = this.get('imageCrop');
      imageEl.onload = function() {
        self.set('isLoading', false);
        self.$().css("background-image","url('" + self.get('imageCrop') + "')");
      };
    }.on('didInsertElement'),

    imageCrop: function() {
      var size = 'crop' + this.get('cardSize');
      return this.get('content.image.' + size);
    }.property('cardSize', 'content.image'),
  });

});
define('nasa/components/counter-block', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['counter-block'],
    stopAtZero: false,
    heartbeat: Ember['default'].computed.readOnly('heartbeatService'),
    date: null,
    counter: "00 : 00 : 00 : 00",

    isDST: function(date){
      return moment(date).isDST();
    },

    getNewTime: function() {
      if (Ember['default'].isNone(this.get('date'))) {
        return;
      }

      var time = this.normalizeTime(new Date(), true),
          counterTime = this.normalizeTime(new Date(this.get('date')), true),
          setTime = 0;
      if (counterTime - time > 0) {
        setTime = counterTime - time;
      }
      else if (!this.get('stopAtZero')){
        setTime = time - counterTime;
      }

      var duration = moment.duration(setTime, 'milliseconds');
      var sec = this.twoDigit(duration.seconds()),
          min = this.twoDigit(duration.minutes()),
          hour = this.twoDigit(duration.hours()),
          day = this.twoDigit(Math.floor(setTime / 1000 / 60 / 60 / 24));

      if (setTime === 0) {
        this.set('counter', '00 : 00 : 00 : 00');
      }
      else {
        var _s = " : ";
        this.set('counter', day + _s + hour + _s + min + _s + sec);
      }
    }.observes('heartbeat.ticker'),

    normalizeTime: function(date,adjust){
      var easternOffset = (this.isDST(date) ? -4 : -5)*3600000,
          localTime = date.getTime(),
          localOffset = date.getTimezoneOffset() * 60000,
          utcTime = localTime + localOffset;

      easternOffset = adjust ? easternOffset : 0;

      return new Date(utcTime + easternOffset);
    },

    twoDigit: function (number) {
      return number >= 10 ? number : "0" + number.toString();
    }
  });

});
define('nasa/components/date-picker', ['exports', 'ember', 'ember-cli-datepicker/components/date-picker'], function (exports, Em, Datepicker) {

	'use strict';

	exports['default'] = Datepicker['default'];

});
define('nasa/components/disqus-comment-count', ['exports', 'ember-disqus/components/disqus-comment-count'], function (exports, Component) {

	'use strict';

	exports['default'] = Component['default'];

});
define('nasa/components/disqus-comments', ['exports', 'ember-disqus/components/disqus-comments'], function (exports, Component) {

	'use strict';

	exports['default'] = Component['default'];

});
define('nasa/components/disqus-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    remove: false,
    destroyDisqus: function(){
      if (this.get('remove')){
        this.destroyElement();
      }
    }.observes('remove')
  });

});
define('nasa/components/embed-card', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    layoutName: 'components/embed-card',
    classNames: ['embed-card'],
    attributeBindings: ['embedSrc:src'],

    embedSrc: Ember['default'].computed.alias('content.embedUrl'),
    embedTitle: Ember['default'].computed.alias('content.title'),

  }); 

});
define('nasa/components/ember-youtube', ['exports', 'ember', 'ember-youtube/components/ember-youtube'], function (exports, Ember, EmberYoutube) {

	'use strict';

	exports['default'] = EmberYoutube['default'];

});
define('nasa/components/event-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    layoutName: 'components/event-card',
    cardTitle: 'NASA Events',

    eventLinks: Ember['default'].computed.alias('content.links'),
    countdownEvent: Ember['default'].computed.alias('eventLinks.firstObject'),
    countdown: Ember['default'].computed.alias('content.countdown'),
    launch: Ember['default'].computed.alias('content.launch'),
    calendar: Ember['default'].computed.alias('content.calendar'),

    sortedLinks: function() {
      if (this.get('countdown')) {
        return this.get('eventLinks').slice(1, 3);
      }
      return this.get('eventLinks');
    }.property('eventLinks', 'countdown'),
  });

});
define('nasa/components/feature-story', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var FeatureStoryComponent = Ember['default'].Component.extend({
        layoutName: 'feature-story',
        classNames: ['image-feature '],
        classNameBindings: ['isLoading'],
        isLoading: true,

        handleLoad: function() {
            this.$().find('img').bind('load', function() {
                this.set('isLoading', false);
            }.bind(this));
        }.on('didInsertElement')
    });

    exports['default'] = FeatureStoryComponent;

});
define('nasa/components/flex-slider', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var FlexSliderComponent = Ember['default'].Component.extend({
    layoutName: 'flexslider',
    pageWidth: Ember['default'].computed.alias('browserSizeService.pageWidth'),
    notMobile: Ember['default'].computed.alias('browserSizeService.notMobile'),
    isVideoGallery: Ember['default'].computed.not('isImageGallery'),
    showThumbnails: Ember['default'].computed.and('isVideoGallery','notMobile'),
    activeSlide:-1,
    activeObject: function(){
      var obj, self = this;
      this.get('items').forEach(function(item){
        var itemID = Ember['default'].isNone(item.get) ? item.video.id : item.get('id');
        if (itemID === self.get('activeID')) obj = item;
      });
      return obj;
    }.property('activeID','items.@each'),
    activeImage: Ember['default'].computed.alias('activeObject.masterImage.fullWidthFeature'),

    handleLoad: function() {
      $('body,#main-content').css('padding-top',0)
      $('#menu + #main-content').css('margin-left',0);
      $('#nasa-edit-tabs,#admin-menu,#toolbar,.contextual-links').hide();
      this.renderSlides();
      this.updateUri();
    }.on('didInsertElement'),

    updateUriObserver: function(){
      this.renderSlides();
      this.updateUri();
    }.observes('activeID'),

    updateUri: function(){
      if (this.get('isImageGallery')){
        var path = window.location.pathname,
            uri = path + '?id=' + this.get('activeID');
        history.replaceState('data', '', uri);
      }
    },

    updateSlider: function(){
      this.renderSlides();
    }.observes('items.@each'),

    willDestroyElement: function(){
      var isLoggedIn = this.container.lookup('view:application').get('isLoggedIn'),
          browserSize = this.container.lookup('view:application').get('browserSize'),
          position = browserSize == 'large' ? (isLoggedIn ? 115 : 85) : 85;
      $('#nasa-edit-tabs,#admin-menu,#toolbar, .contextual-links').show();
      $('body').css('padding-top',position);
      history.replaceState('date', '', window.location.pathname);
      Ember['default'].run.next(this,function(){
        var hasSidebar = $('.home.sidebar').length > 0,
        margin = hasSidebar ? 325 : 0;
        $('#main-content').css('margin-left',margin)
      });
    },

    renderSlides: function(){
      var self = this;
      Ember['default'].$('#thumbnail-slider').flexslider({
        animation: "slide",
        startAt: self.get('goToIndex'),
        itemWidth:150,
        move:1,
        itemMargin:10,
        slideshow: false,
        controlsContainer:".thumbnail-container",
        minItems: this.getGridSize(),
        maxItems: this.getGridSize()
      });
    },

    getGridSize: function(){
      var width = (window.innerWidth || document.body.clientWidth);
      return (window.innerWidth < 768) ? 2 :
        (window.innerWidth < 1020) ? 6 : 7;
    },

    reRender: function(){
      this.renderSlides();
    }.observes('activeID','pageWidth'),

    advanceItem: function(delta) {
      var index, length, items, next, controller;
      controller = this.get('isImageGallery') ? 'controller:image' : 'controller:video'
      items = this.get('items');
      length = this.get('items.length');
      index = items.indexOf(this.get('activeObject')) + delta;
      index = index >= length ? 0 : index < 0 ? length - 1 : index;
      next = items.objectAt(index).get('id');
      this.container.lookup(controller).set('activeID',next)
    },

    actions:{
      goBack: function(){
        this.sendAction('goBack');
      },
      prevItem: function() {
        return this.advanceItem(-1);
      },
      nextItem: function() {
        return this.advanceItem(1);
      }
    }

  });

  exports['default'] = FlexSliderComponent;

});
define('nasa/components/gov-delivery', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    text: null,
    email: null,
    code: null,
    accountCode: null,

    quickSubscribeUrl: function() {
      var accountCode = this.get('accountCode'),
          email = this.get('email'),
          code = this.get('code');

      if (Ember['default'].isEmpty(accountCode) ||
          Ember['default'].isEmpty(email) ||
          Ember['default'].isEmpty(code)) {
        return false;
      }

      return "https://public.govdelivery.com/accounts/" +
        accountCode +
        "/subscriber/qualify?topic_id=" + code +
        "&email=" + email;
    }.property('accountCode', 'code', 'email'),

    actions: {
      quickSubscribe: function() {
        this._quickSubscribe();
      },

      // @TODO this profile action isn't used yet for some reason.
      profile: function() {
        var code = this.get('code'),
            email = this.get('email');

        if (code) {
          window.location = "http://shervice.govdelivery.com/service/user.html" +
            "?code=" + code +
            "&login=" + email +
            "&origin=" + window.location.href;
        }
      }
    },

    _quickSubscribe: function() {
      var quickSubscribeUrl = this.get('quickSubscribeUrl');

      if (!quickSubscribeUrl) {
        window.alert('Please fill out the email field');
        return;
      }

      window.location = quickSubscribeUrl;
    },
  });

});
define('nasa/components/image-description', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var ImageDescriptionComponent = Ember['default'].Component.extend({
        layoutName: 'gallery/components/image-description',
        isOpen: false,
        title: Ember['default'].computed.alias('image.title'),
        body: Ember['default'].computed.alias('image.imageFeatureCaption'),
        tagsUnsorted: Ember['default'].computed.union('image.missions','image.topics','image.collections','image.other_tags'),
        tagsFiltered: Ember['default'].computed.filterBy('tagsUnsorted', 'displayTagOnUbernode', true),
        tagsSortBy: ['name'],
        tags: Ember['default'].computed.sort('tagsFiltered', 'tagsSortBy'),
        uri: Ember['default'].computed.alias('image.uri'),
        download: Ember['default'].computed.alias('image.masterImage.path'),
        filename: Ember['default'].computed.alias('image.masterImage.filename'),
        shareUri: function(){
          var page = '?node=' + window.landingPageID,
              feed = '&feed=' + window.cardFeed[0].id,
              id   = '&id='   + this.get('image.id'),
              url  = this.get('uri') + page + feed + id;
          return window.location.origin + url;
        }.property('image','image.uri'),
        hideGalleryTabs: function(){
          if (this.container.lookup('view:application').get('isMobile')){
            var display = this.get('isOpen') ? 'none' : 'block';
            $('.gallery-tabs').css('display',display);
          }
        }.observes('isOpen'),

        actions: {
            toggleOpen: function(){
                this.toggleProperty('isOpen');
            }
        }
    });

    exports['default'] = ImageDescriptionComponent;

});
define('nasa/components/infinite-scroll', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(InfiniteScroll.ViewMixin, {
    layoutName: 'components/infinite-scroll',
    classNames:['inf-scroll-inner-container'],

    didInsertElement: function(){
      this.setupInfiniteScrollListener();
    },
    willDestroyElement: function(){
      this.teardownInfiniteScrollListener();
    },

    didScroll: function(){
      Ember['default'].run.debounce(this, this.isScrolledToBottom, 200);
    },

    isScrolledToBottom: function(){
        var distanceToViewportTop = $('.inf-scroll-inner-container').height() - 500,
            viewPortTop = $('.inf-scroll-outer-container').scrollTop();

        if (viewPortTop >= distanceToViewportTop) {
          this.sendAction();
        };
      }

  });

});
define('nasa/components/jw-player', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['video-player', 'jwplayer'],

    playerLoaded: false,
    elementInserted: false,
    playerInitialized: false,

    file: false,
    fallbackFile: false,
    autostart: false,

    playerId: function() {
      return this.elementId + '_player';
    }.property('elementId'),

    loadPlayer: function() {
      var self = this,
          player;

      if (window.jwplayer === undefined) {
        player = new Ember['default'].RSVP.Promise(function(resolve, reject){
          Ember['default'].$.getScript('/sites/all/libraries/jwplayer/jwplayer.js', function(data, textStatus, jqxhr){
            if(jqxhr.status === 200){
              resolve();
            }
            else{
              reject(new Error('JWPlayer: could not load player. ' +
                               'Failed with status [' + jqxhr.status + ']'));
            }
          });
        }, null,  'JWPlayer: Load file');

        player.then(function() {
          self.set('playerLoaded', true);
        }, function(error) {
          throw error;
        }, 'JWPlayer: Mark player as loaded');
      }
      else {
        this.set('playerLoaded', true);
      }
    }.on('init'),

    didInsertElement: function() {
      this.set('elementInserted', true);
    },

    willDestroyElement: function() {
      window.jwplayer(this.get('playerId')).remove();
    },

    initPlayer: function() {
      var playerInitialized = this.get('playerInitialized'),
          elementInserted = this.get('elementInserted'),
          playerLoaded = this.get('playerLoaded'),
          autostart = this.get('autostart'),
          playerId = this.get('playerId'),
          file = this.get('file'),
          self = this;

      if (playerInitialized === true ||
          elementInserted === false ||
          playerLoaded === false ||
          file === false) {
        return;
      }

      this.set('playerInitialized', true);

      window.jwplayer.key = "LRj01mRMDsXEXE60UVcOqkcG7mWHuZF4bWsUWv9euno=";
      window.jwplayer(playerId).setup({
        base: '/sites/all/libraries/jwplayer/',
        file: file,
        width: "757",
        primary: "flash",
        height: "423",
        autostart: autostart,
        aspectratio: "16:9",
        stretching: "bestfit",
        stagevideo: false,
        skin: "bekle",
        abouttext: "NASA.gov",
        aboutlink: "http://www.nasa.gov",
        ga: {},
        onSetupError: function() {
          throw new Error('Player can not start');
        },
      });

      window.jwplayer(playerId).onError(function() {
        window.jwplayer(self.elementId).load({file: self.get('fallbackFile')});
      });

      // @TODO i'm not sure this is needed for GA tracking. I think it might be
      // tracked by the main GA account.

      //var _gaq = _gaq || [];
      //_gaq.push(['_setAccount', 'UA-33523145-1']);
      //_gaq.push(['_trackPageview']);

      //var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      //ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      //var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    }.observes('playerLoaded', 'elementInserted'),

    filePathDidChange: function() {
      var playerId = this.get('playerId'),
          file = this.get('file');

      // We only use this method of changing the channel after the
      // player has been initialized.
      if (this.get('playerInitialized') === false) {
        return;
      }

      window.jwplayer(playerId).load({file: file});
    }.observes('file'),
  });

});
define('nasa/components/list-link', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'li',
    layoutName: 'components/list-link',
    classNameBindings: ['isActive:active', 'subClass'],

    isActive: function() {
      return this.get('link.url') === document.location.pathname;
    }.property('link.url')
  });

});
define('nasa/components/listing-pager', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].Component.extend({
    layoutName: 'components/listing-pager',
    classNames: ['listing-pager'],

    itemTemplate: '',

    showHeaderNav: true,
    isLoading: true,
    noResultsText: '',
    showFooterNav: true,
    showFirstLast: false,
    numbered: false,
    arrowNav: true,
    truncPaging: false,
    fixedHeight: true,
    computingHeight: true,
    initSet: false,
    dateFormats: Ember['default'].A(),
    hasContent: Ember['default'].computed.gt('numItems', 0),

    maxHeight: 0,
    numItems: Ember['default'].computed.alias('content.length'),
    numPages: Ember['default'].computed('numItems','pageSize', function(){
      var pageSize = this.get('pageSize');
      return pageSize > 0 ? Math.ceil(this.get('numItems') / pageSize) : 1;
    }),
    showPager: Ember['default'].computed.gt('numPages',1),
    currentPage: 1,

    content: null,
    // Array that filters only the content on the current page
    currentPageContent: Ember['default'].computed.filter('content', function(node, index, array) {
      var pageSize = this.get('pageSize'),
          startNum = pageSize * (this.get('currentPage')-1);

      return (startNum <= index && index < (startNum+pageSize));
    }).property('content', 'content.@each', 'currentPage'),
    
    pageNumbers: Ember['default'].A(),
    // Array that contains the numbers to currently be displayer in pager navigation
    currentPageNumbers: Ember['default'].computed.filter('pageNumbers', function(page, index, array){
      if(!this.get('truncPaging')){
        return true;
      }

      var currentPage = this.get('currentPage'),
          numPages = this.get('pageNumbers.length'),
          currentPageInterval = 5,
          startPageInterval = 2,
          endPageInterval = 2,
          pageNum = page.num;

      if(pageNum < (startPageInterval+1) || pageNum > (numPages - endPageInterval)){
        return true;
      }

      var currentIntervalFirst = currentPage - Math.floor((currentPageInterval-1) * 0.5);
      var currentIntervalLast = currentIntervalFirst + currentPageInterval - 1;

      if(pageNum >= currentIntervalFirst && pageNum <= currentIntervalLast){
        return true;
      }

      return false;
    }).property('pageNumbers', 'currentPage'),

    onContentChange: function() {
      this.set('computingHeight', this.get('fixedHeight'));
      this.pageChanged();
    }.observes('content.@each'),

    pageChanged: function() {
      var pageNumbers = Ember['default'].A(),
          currentPage = this.get('currentPage'),
          numPages = this.get('numPages');

      // Provide classes and other page data for the template
      for(var i = 0; i < numPages; ++i){
        var pageNum = i+1;
        var classArray = [];
        if(this.get('numbered')){
          classArray.push('page-number');
          classArray.push('page-number-'+pageNum);
        }
        else {
          classArray.push('page-icon');
          classArray.push('page-icon-'+pageNum);
        }
        // Highlight current page
        if(i==currentPage-1){
          classArray.push('current-page');
        }
        var page = {num: pageNum, classes: classArray.join(' ')};
        pageNumbers.push(page);
      }

      this.set('pageNumbers', pageNumbers);

      Ember['default'].run.schedule('afterRender', this, this.afterRenderEvent);
    }.observes('currentPage'),

    afterRenderEvent: function() {
      // Place elipses between page number gaps
      if(this.get('truncPaging')){
        var prevValue = null;
        $('.listing-pager .pager-navigation .pager a').each(function(index, element){
          var value = parseInt($(element).attr('value'));
          if (prevValue && (prevValue+1) < value && !($(element).prev().hasClass('ellipsis')) ) {
            $(element).before('<span class="ellipsis">...</span>');
          }

          prevValue = value;
        });
      }

      // Cycle through pages and find the tallest one
      if(this.get('fixedHeight') && this.get('computingHeight')) {
        // If this current page is taller than max height, set the new max height
        $('.listing-pager .page-content').removeAttr('style');

        var maxHeight = this.get('maxHeight'),
            currentHeight = $('.listing-pager .page-content').height();
        
        if(currentHeight > maxHeight) {
          maxHeight = currentHeight;
          this.set('maxHeight', maxHeight);
        }

        $('.listing-pager .page-content').height(maxHeight);


        // Go to the next page
        var currentPage = this.get('currentPage'),
            numPages = this.get('numPages');

        currentPage++;
        if(currentPage <= numPages) {
          this.set('currentPage', currentPage);
        }
        else {
          this.set('currentPage', 1);
          this.set('computingHeight', false);
        }
      }
    },

    firstText: function() {
      return this.get('arrowNav') ? '<<' : 'First';
    }.property('arrowNav'),

    prevText: function() {
      return this.get('arrowNav') ? '<' : 'Previous';
    }.property('arrowNav'),

    nextText: function() {
      return this.get('arrowNav') ? '>' : 'Next';
    }.property('arrowNav'),

    lastText: function() {
      return this.get('arrowNav') ? '>>' : 'Last';
    }.property('arrowNav'),

    actions: {
      // If one of the page icons is clicked
      pagerClick: function(pageNumber) {
        this.set('currentPage', pageNumber);
      },
      // Go to the first page
      firstClick: function() {
        this.set('currentPage', 1);
      },
      // Go to the previous page
      prevClick: function() {
        var current = this.get('currentPage');

        current--;
        if(current >= 1){
          this.set('currentPage', current);
        }
      },
      // Go to the next page
      nextClick: function() {
        var current = this.get('currentPage'),
            numPages = this.get('pageNumbers.length');

        current++;
        if(current <= numPages){
          this.set('currentPage', current);
        }
      },
      // Go to the last page
      lastClick: function() {
        var numPages = this.get('pageNumbers.length');

        this.set('currentPage', numPages);
      },
    },
  });

});
define('nasa/components/mobilerider-player', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['video-player', 'mrplayer'],

    playerLoaded: false,
    elementInserted: false,

    streamId: false,
    autostart: false,

    loadPlayer: function() {
      var self = this,
          player;

      if (window.mobilerider !== undefined) {
        this.set('playerLoaded', true);
        return;
      }

      player = new Ember['default'].RSVP.Promise(function(resolve, reject){
        Ember['default'].$.getScript('https://mr-a.akamaihd.net/assets/js/mr/embed/mobilerider.min.js', function(data, textStatus, jqxhr){
          if(jqxhr.status === 200){
            resolve();
          }
          else{
            reject(new Error('MobileRider: could not load player. ' +
                             'Failed with status [' + jqxhr.status + ']'));
          }
        });
      }, null,  'MobileRider: Load file');

      player.then(function() {
        self.set('playerLoaded', true);
      }, function(error) {
        throw error;
      }, 'Mobilerider: Mark player as loaded');
    }.on('init'),

    didInsertElement: function() {
      this.set('elementInserted', true);
    },

    initPlayer: function() {
      var elementInserted = this.get('elementInserted'),
          playerLoaded = this.get('playerLoaded'),
          autostart = this.get('autostart'),
          streamId = this.get('streamId'),
          self = this;

      if (elementInserted === false ||
          playerLoaded === false ||
          streamId === false) {
        return;
      }

      window.mobilerider.embedVideo(
        3117, // customer ID
        streamId, // stream id
        this.elementId,
        "100%",
        "100%",
        "universal",
        {
          extras:"skin:nasa,autoplay:1,vs:0,muteOn:0",
          service: 1
        }
      );
    }.observes('playerLoaded', 'elementInserted', 'streamId'),
  });

});
define('nasa/components/multiselect-checkboxes', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Checkbox = Ember['default'].Object.extend({
    isSelected: Ember['default'].computed('value', 'selection.[]', function (_, checked) {
      if (arguments.length > 1) {
        var selected = this.get('selection').contains(this.get('value'));

        if (checked && !selected) {
          this.get('selection').addObject(this.get('value'));
        } else if (!checked && selected) {
          this.get('selection').removeObject(this.get('value'));
        }
      }

      return this.get('selection').contains(this.get('value'));
    })
  });

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['multiselect-checkboxes'],

    tagName: 'ul',

    options: Ember['default'].A(),

    selection: Ember['default'].A(),

    labelProperty: null,

    valueProperty: null,

    disabled: false,

    onInit: function() {
      Ember['default'].deprecate(
        'Use community version of multiselect-checkboxes',
        Ember['default'].VERSION === "1.9.0",
        { url: "https://github.com/rsschermer/ember-multiselect-checkboxes"}
      );
    }.on('init'),

    checkboxes: Ember['default'].computed('options', 'labelProperty', 'valueProperty', 'selection.[]', function () {
      var labelProperty = this.get('labelProperty');
      var valueProperty = this.get('valueProperty');
      var selection = this.get('selection');

      var checkboxes = this.get('options').map(function(option) {
        var label, value;

        if (labelProperty) {
          if (typeof option.get === 'function') {
            label = option.get(labelProperty);
          } else {
            label = option[labelProperty];
          }
        } else {
          label = String(option);
        }

        if (valueProperty) {
          if (typeof option.get === 'function') {
            value = option.get(valueProperty);
          } else {
            value = option[valueProperty];
          }
        } else {
          value = option;
        }

        return Checkbox.create({
          label: label,
          value: value,
          selection: selection
        });
      });

      return Ember['default'].A(checkboxes);
    })
  });

});
define('nasa/components/navbar-social', ['exports', 'ember', 'nasa/mixins/addthis-toolbox'], function (exports, Ember, AddThisToolbox) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(AddThisToolbox['default'],{
    pid: 'addthisforshare'
  });

});
define('nasa/components/page-item', ['exports', 'ember', 'pagination-pager/components/page-item'], function (exports, Ember, PageItem) {

	'use strict';

	exports['default'] = PageItem['default'];

});
define('nasa/components/pagination-pager', ['exports', 'ember', 'pagination-pager/components/pagination-pager'], function (exports, Ember, PaginationPager) {

	'use strict';

	exports['default'] = PaginationPager['default'];

});
define('nasa/components/preloadable-image', ['exports', 'ember'], function (exports, Ember) {

   'use strict';

   exports['default'] = Ember['default'].Component.extend({
      src: '',
      //We could make this more reusable by removing these extra css classes
      // but are needed atm
      classNames: ['flex-wrapper col-xs-10 col-xs-push-1'],
      classNameBindings: ['loaded'],
      loaded: false,

      didInsertElement: function(){
        this.handleLoad();
      },

      reloadImage: function(){
        this.set('loaded',false);
        this.handleLoad();
      }.observes('src'),

      handleLoad: function() {
        var view = this;
        // Use jQuery's `one` to ensure the handler is remove afterwards
        this.$().children('img').one('load', function() {
          Ember['default'].run(function(){
            view.set('loaded', true);
          });
        }.bind(this));
      }
    });

});
define('nasa/components/proxy-card', ['exports', 'ember', 'nasa/mixins/card'], function (exports, Ember, EmberCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmberCard['default'], {
    layoutName: 'components/proxy-card',
    classNameBindings: ['preLoad'],

    hasCard: Ember['default'].computed.bool('content.card'),
    preLoad: Ember['default'].computed.alias('content.preLoad'),
    isLoaded: Ember['default'].computed.or('hasCard', 'preLoad'),
  });

});
define('nasa/components/snippet-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    layoutName: 'components/snippet-card',
    small: false,

    onInit: function() {
      this.loadImage();
    }.on('init'),

    width: function () {
      var size = this.get('cardSize').charAt(0),
          width = '';

      switch (size) {
        case '1':
          this.set('small', true);
          break;
        case '2':
          width = 'wide';
          this.set('small', false);
          break;
        default:
          width = 'x-wide';
          this.set('small', false);
          break;
      }
      return width;
    }.property('cardSize'),

    hasImage: Ember['default'].computed.bool('content.image.id'),

    hasText: function() {
      if ((!Ember['default'].isNone(this.get('content.links')) ||
            !Ember['default'].isNone(this.get('content.description')))) {
        return true;
      }
      return false;
    }.property('content.links', 'content.description', 'cardSize'),

    textOnly2x2: function() {
      return !this.get('hasImage') && (this.get('cardSize') === '2x2');
    }.property('content.image', 'cardSize'),

    imageCrop: function() {
      var size;
      if (this.get('content.image')) {
        switch (this.get('cardSize')) {
          case '1x1':
            size = '1x1';
            break;
          case '2x1':
            size = '1x1';
            break;
          case '3x1':
            size = '2x1';
            break;
          case '2x2':
            size = '1x2';
            break;
          default:
            size = '1x1';
        }
        return this.get('content.image.crop' + size);
      }
    }.property('cardSize'),

    loadImage: function() {
      var self = this;
      if(!this.get('isLoaded') && this.get('content.image')){
        var image = new Image();
        image.src = self.get('imageCrop');
        image.onload = function(){
          self.set('isLoaded', true);
        };
      }
    },

  });

});
define('nasa/components/social-sidebar-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    title: function(){
      return this.container.lookup('controller:landing-page').get('model.title');
    }.property(),

    pubID: Ember['default'].computed.alias('addthisProfileId'),

    url: function(){
      return window.location.href;
    }.property()
  });

});
define('nasa/components/stmd-search', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['stmd-search'],
    subArray: Ember['default'].A(),
    current: 1,

    termSorting: ['weight'],
    sortedTerms: Ember['default'].computed.sort('terms', 'termSorting'),

    terms: null,
    content: null,
    isLoading: false,

    pageSize: 10,

    keywords: '',
    selectedTerms: Ember['default'].A(),

    hasSearched: false,
    canReset: function() {
      if (Ember['default'].isPresent(this.get('keywords')) ||
          Ember['default'].isPresent(this.get('selectedTerms'))) {
        return true;
      }
      return false;
    }.property('keywords', 'selectedTerms.[]'),

    onInit: function() {
      this.pullBrowserHash();
    }.on('init'),

    pullBrowserHash: function() {
      var selectedTerms = this.get('selectedTerms'),
          hash = window.location.hash,
          terms = this.get('terms').getEach('id'),
          options;

      if (Ember['default'].isEmpty(hash) ||
          hash === '#{}') {
        return;
      }

      options = JSON.parse(decodeURIComponent(hash.substring(1)));

      if (Ember['default'].isPresent(options.q)) {
        this.set('keywords', options.q);
      }

      if (Ember['default'].isPresent(options.tids)) {
        terms.forEach(function(term) {
          if (options.tids.indexOf(term) !== -1) {
            selectedTerms.pushObject(term);
          }
        });
      }

      this._doSearch();
    },

    totalPages: function() {
      var limit = this.get('pageSize'),
          total = this.get('content.length'),
          pages = Math.ceil(total / limit);

      // Minimum 1 page
      // This also has the effect of hiding the pagination-pager.
      return pages > 1 ? pages : 1;
    }.property('pageSize', 'content.length'),

    contentDidChange: function() {
      var limit = this.get('pageSize'),
          content = this.get('content'),
          current = this.get('current'),
          offset = limit * (current - 1),
          items = [];

      for (var i = offset; i < offset + limit; i++) {
        var item = content.objectAt(i);
        if (item !== null) {
          items.push(item);
        }
      }

      this.set('subArray', items);
    }.observes('content.length', 'current'),

    _doSearch: function() {
      var keywords = this.get('keywords'),
          tids = this.get('selectedTerms'),
          options = {};

      if (Ember['default'].isEmpty(keywords) &&
          Ember['default'].isEmpty(tids)) {
        window.alert('You must change options to submit the form');
        return;
      }
      if (Ember['default'].isPresent(keywords)) {
        options.q = keywords;
      }

      if (Ember['default'].isPresent(tids)) {
        options.tids = tids;
      }

      window.location.hash = JSON.stringify(options);

      this.sendAction('action', options);
      this.set('hasSearched', true);
    },

    _doReset: function() {
       this.set('keywords', '');
       this.set('selectedTerms', Ember['default'].A());
    },

    actions: {
      doSearch: function() {
        this._doSearch();
      },
      doReset: function() {
        this._doReset();
      }
    }
  });

});
define('nasa/components/sub-nav', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].Component.extend({
    showTopicsMenu: false,
    url: Ember['default'].computed('topicUrl','browserSizeService.isMobile',function(){
      if (this.get('browserSizeService.isMobile')) return null;
      return this.get('topicUrl');
    }),

    isActive: Ember['default'].computed('topicUrl', function(){
      return this.get('topicUrl') == window.location.pathname;
    }),

    onInit: function () {
      if (Ember['default'].$('body.show-topics-menu').length > 0) {
        this.set('showTopicsMenu', true);
      }
    }.on('init'),
  });

});
define('nasa/components/tag-block', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'a',
    attributeBindings: ['href'],
    classNames: ['primary-tag'],
    didInsertElement: function(){
      Ember['default'].run.scheduleOnce('afterRender', this, function(){
        this.$().hover(function() {
          $(this).closest(".headline").toggleClass("tag-hovered");
        });
      });
    }
  });

});
define('nasa/components/text-ellipsis', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    didInsertElement: function(){
      Ember['default'].run.scheduleOnce('afterRender', this, this.truncateText);
    },

    willDestroyElement: function(){
      this.$().trigger('destroy');
    },

    truncateText: function(){
      var self = this;
      this.$().dotdotdot({
        watch: 'window',
        height: self.get('height') || 60
      });
      // TODO: Not require doing a run later.
      // video pages on certain zooms dont initialize on first load
      if (!this.$().triggerHandler('isTruncated')){
        Ember['default'].run.later(this, function() {
          this.$().trigger('update');
        }, 500);
      }
    }

  });

});
define('nasa/components/text-truncate', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    // @TODO Trim by area isn't working yet. Only trim by line.
    classNameBindings: 'processing',
    mode: 'line',
    text: '',
    truncatedText: '',
    processingText: '',
    lines: 1,
    isProcessing: false,

    didInsertElement: function() {
      this.processText();
    },

    processText: function() {
      this.set('isProcessing', true);
      this.set('processingText', this.get('text'));
      // Text won't show up until next render.
      Ember['default'].run.scheduleOnce('afterRender', this, this.trim);
    }.observes('text', 'browserSizeService.pageWidthPixel'),

    trim: function() {
      switch (this.get('mode')) {
        case 'line':
          this.trimByLine();
          break;
        case 'area':
          this.trimByArea();
      }
    }.observes('text'),

    trimByLine: function () {
      var element = this.get('element'),
          lines = parseInt(this.get('lines')),
          lineHeight = 0,
          el = '';

      if (!element.getElementsByClassName('hiddenz').length) {
        return;
      }

      el = element.getElementsByClassName('hiddenz')[0] || {};

      if (!el.innerHTML) {
        return;
      }

      lineHeight = parseFloat(window.getComputedStyle(el).getPropertyValue('line-height'));
      lineHeight += 2; // Fudger

      Ember['default'].run.scheduleOnce(
        'afterRender',
        this,
        'trimByLineLoopRead',
        [el, lineHeight, lines]
      );
    },

    trimByLineLoopRead: function(params) {
      var el = params[0],
          lineHeight = params[1],
          lines = params[2];

      if (!el.scrollHeight) {
        Ember['default'].run.next(
          this,
          'trimByLineLoopRead',
          params
        );
        return;
      }

      if (el.scrollHeight  > Math.ceil(lines * lineHeight)) {
        Ember['default'].run.next(
          this,
          'trimByLineLoopWrite',
          params
        );
      }
      else {
        var finalText = this.get('processingText');
        if (this.get('text') !== finalText) {
          // Check if we have already added te ellipsis
          if (finalText.match(/…/g)) {
            this.set('truncatedText', finalText);
            this.set('isProcessing', false);
          }
          else {
            this.set('processingText', finalText + "…");
            // After adding the ellipsis we need to ensure that we are still good.
            Ember['default'].run.scheduleOnce(
              'afterRender',
              this,
              'trimByLineLoopRead',
              params
            );
            return;
          }
        }
      }
    },

    trimByLineLoopWrite: function(params) {
      this.set('processingText', this.wordTrim(this.get('processingText'), 1));
      Ember['default'].run.scheduleOnce(
        'afterRender',
        this,
        'trimByLineLoopRead',
        params
      );
    },

    trimByArea: function (container) {
      var trim = container.querySelector('.trim');
      var offSet = this.childrenHeight(container.children) + this.getSpacing(container);

      while (offSet > container.offsetHeight) {
        if (offSet / container.offsetHeight > 1.1) {
          trim.innerHTML = this.wordTrim(trim.innerHTML, 5);
        }
        else {
          trim.innerHTML = this.wordTrim(trim.innerHTML);
        }
        offSet = this.childrenHeight(container.children) + this.getSpacing(container);
      }
      trim.innerHTML = this.wordTrim(trim.innerHTML) + ' . . .';
    },

    wordTrim: function (text, num) {
      return text.split(" ").slice(0, text.split(" ").length - (num ? num : 1)).join(" ");
    },

    childrenHeight: function (children) {
      var height = 0,
          fontHeight = 0;

      for (var i=0; i<children.length; i++ ) {
        height += children[i].offsetHeight;

        var child = window.getComputedStyle(children[i]);
        if (parseFloat(child.getPropertyValue('line-height'))) {
          fontHeight += parseFloat(child.getPropertyValue('font-size'));
        } 
        else {
          fontHeight += parseFloat(child.getPropertyValue('font-size'));
        }
      }
      return height + fontHeight;
    },

    getSpacing: function (el) {
      var computed = window.getComputedStyle(el),
          top = parseFloat(computed.getPropertyValue('padding-top')),
          bottom = parseFloat(computed.getPropertyValue('padding-bottom'));
      return top + bottom;
    },
  });

});
define('nasa/components/topics-menu', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var $ = Ember['default'].$;

    var TopicsMenuComponent = Ember['default'].Component.extend({
        layoutName: 'topics-menu'
    });

    exports['default'] = TopicsMenuComponent;

});
define('nasa/components/tv-player', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].Component.extend({
    layoutName: 'components/tv-player',
    classNames: ['tv-player-pane', 'clearfix'],
    classNameBindings: ['hasFlash::tv-player-mobile', 'isMobile:tv-player-small'],

    showIssPlayer: false,
    selectedChannel: null,


    pageIsSmall: Ember['default'].computed.equal('pageWidth', 'small'),
    pageIsXSmall: Ember['default'].computed.equal('pageWidth', 'xsmall'),
    isMobile: Ember['default'].computed.or('pageIsSmall', 'pageIsXSmall'),

    hasFlash: Ember['default'].computed.alias('browserSizeService.hasFlash'),
    pageWidth: Ember['default'].computed.alias('browserSizeService.pageWidth'),

    useMrPlayer: Ember['default'].computed.equal('selectedChannel.player', 'mediarider'),
    useIframe: Ember['default'].computed.equal('selectedChannel.player', 'iframe'),

    isPublic: Ember['default'].computed.equal('selectedChannel.key', 'public'),
    isEdu: Ember['default'].computed.equal('selectedChannel.key', 'education'),
    isMedia: Ember['default'].computed.equal('selectedChannel.key', 'media'),
    isIss: Ember['default'].computed.equal('selectedChannel.key', 'iss'),

    channels: [
      {
        key: 'public',
        title: 'Public',
        streamId: '90052',
        file: '//nasatv-lh.akamaihd.net/i/NASA_101@319270/master.m3u8',
        player: 'mediarider',
      },
      {
        key: 'education',
        title: 'Education',
        streamId: '90118',
        file: '//nasatv-lh.akamaihd.net/i/NASA_102@319272/master.m3u8',
        player: 'mediarider',
      },
      {
        key: 'media',
        title: 'Media',
        file: '//nasatv-lh.akamaihd.net/i/NASA_103@319271/master.m3u8',
        streamId: '90117',
        player: 'mediarider',
      },
      {
        key: 'iss',
        title: 'HD ISS Views',
        path: '//www.ustream.tv/embed/17074538',
        file: 'http://www.ustream.tv/channel/live-iss-stream',
        player: 'iframe',
      },
    ],

    onInit: function() {
      var channels = this.get('channels'),
          self = this;

      // set the channel if it exists in the url
      if (Ember['default'].isPresent(window.location.hash)) {
        channels.forEach(function(ch) {
          if ('#' + ch.key === window.location.hash) {
            self.set('selectedChannel', ch);
          }
        });
      }
      else {
        this.set('selectedChannel', this.get('channels.firstObject'));
      }
    }.on('init'),

    //didInsertElement: function(){
    //  // @TODO I can't seem to get the following to work at all.
    //  //       The library or w/e this is doesn't seem to do anything.
    //  //if (this.get('hasFlash') || true) {
    //  //  // @TODO restore this funcationlity
    //  //  var ISSstream = new UstreamEmbed('ISSstream');

    //  //  ISSstream.callMethod('quality',16);
    //  //  ISSstream.callMethod('play');
    //  //}
    //},

    addChannelToUrl: function(key) {
      window.location.hash = key;
    },

    _changeChannel: function(key) {
      var hasFlash = this.get('hasFlash'),
          channels = this.get('channels'),
          channel;

      channels.forEach(function(ch) {
        if (ch.key === key) {
          channel = ch;
        }
      });
      this.set('selectedChannel', channel);

      if (!hasFlash) {
        if (key == 'iss') {
          this.set('showIssPlayer', true);
        }
        else {
          this.set('showIssPlayer', false);
          window.location.href = channel.file;
        }
      }

      this.addChannelToUrl(key);
    },

    actions: {
      changeChannel: function(key) {
        this._changeChannel(key);
      },
    }
  });

});
define('nasa/components/tv-schedule', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  exports['default'] = Ember['default'].Component.extend({
    layoutName: 'components/tv-schedule',
    // @TODO the component has a top level div that could be combined into
    // the component view.

    model: null,
    isLoading: false,

    title: 'TV Schedule',

    start: new Date(),
    end: new Date(),
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
               'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'],
    spaces: '                    ',
    serverResponse: null,
    tv_events: {},
    container: null,

    // enable debugging if editing tabs are present
    isDebugging: false,
    debugData: {},
    disableOverlays: false,
    debugHTML: null,

    channels: Ember['default'].computed.alias('model.calendarName'),

    displayIsRow: Ember['default'].computed.equal('currentDisplay', 'row'),

    selectedTimezone: 0,
    selectedChannel: function(key, value, previousValue) {
      var start = this.get('start'),
          end = this.get('end');

      if (arguments.length > 1 &&
          value !== undefined &&
          previousValue === 'all') {
        start.setHours(0,0,0);
        this.set('start', start);
        end.setHours(23,59,0);
        this.set('end', end);
      }

      return value;
    }.property(),

    selectedDate: function(key, value, previousValue) {
      var start = this.get('start'),
          strDate = value + " 00:00", // No need to set the hours/minutes
          oldDate, newDate;

      if (arguments.length > 1 &&
          value !== undefined &&
          value !== previousValue) {
        oldDate = new Date(start);
        newDate = new Date(window.moment(strDate, "ddd, MMM Do hh:mm"));

        oldDate.setDate(newDate.getDate());
        oldDate.setMonth(newDate.getMonth());
        oldDate.setFullYear(newDate.getFullYear());
        this.set('start', oldDate);

        return window.moment(oldDate).format('ddd, MMM Do');
      }

      return window.moment(start).format('ddd, MMM Do');
    }.property('start'),

    selectedTime: function(key, value) {
      var start = this.get('start'),
          hours = start.getHours(),
          mins = start.getMinutes(),
          newStart;

      // setter
      if (arguments.length > 1 &&
          value !== undefined) {
        hours = Number(value.substr(0,2));
        mins = Number(value.substr(2,2));

        newStart = new Date(start);
        newStart.setHours(hours);
        newStart.setMinutes(mins);
        this.set('start', newStart);
      }

      // Added empty string to ensure we send string.
      return addZero(hours) + '' + addZero(mins);
    }.property('start'),

    onInit: function() {
      var firstChannel = this.get('channelOptions.firstObject.tid'),
          start = this.get('start');

      this.set('selectedChannel', firstChannel);

      // verify there are drupal tabs and verify the panel debug var has been set
      //if ($('.tabs.primary.clearfix').length && $(this.container).data('debug')) {

      // @TODO: Base debugging on only the existance of contextual-links until
      // until we figure out how to get the debug flag in panels again
      if ($('.contextual-links').length) {
        this.set('isDebugging', true);
      }

      this.set('selectedTime', (
            addZero(start.getHours()) +
            (start.getMinutes() > 30 ? '30' : '00')));

      // Don't currently change the view based on the url
      //var channels = this.get('channels'),
      //    channelNameMatch = /\(([^\)]+)\)/,
      //    channelName = '',
      //    self = this;
      //if (Ember.isPresent(window.location.hash)) {
      //  channels.forEach(function(ch) {
      //    channelName = channelNameMatch.exec(ch.name)[1].toLowerCase();
      //    if ('#' + channelName === window.location.hash) {
      //      self.set('selectedChannel', ch.tid);
      //    }
      //  });
      //}
    }.on('init'),

    selectedHours: function() {
      var tz_offset = this.get('selectedTimezone'),
          display = this.get('currentDisplay'),
          time = this.get('selectedTime'),
          hours;

      // In list view we want to display starting at midnight.
      if (display === 'list') {
        hours = 0;
      }
      else {
        hours = Number(time.substr(0,2));
      }

      // Adjust for timezone.
      // @TODO this could create a netative hour. Should we deal with that?
      return hours - (tz_offset / 3600);
    }.property('selectedTime', 'selectedTimezone'),

    selectedMinutes: function() {
      var display = this.get('currentDisplay'),
          time = this.get('selectedTime'),
          minutes;

      // In list view we want to display starting at midnight.
      if (display === 'list') {
        minutes = 0;
      }
      else {
        minutes = Number(time.substr(2,2));
      }

      // @TODO There are timezones that are not whole numbers.
      // This is where we would deal with that if need be.

      return minutes;
    }.property('selectedTime'),

    currentDisplay: function() {
      if (this.get('selectedChannel') === 'all') {
        return 'row';
      }
      return 'list';
    }.property('selectedChannel'),

    willInsertElement: function() {
      this.end.setHours(this.end.getHours() + 2);
    },

    didInsertElement: function(){
      this.container = this.$();

      $('#tv-timeline-dialog .dialog-close').click(function(){
          $('#tv-timeline-dialog').hide();
      });
    },

    browserDidChangeSize: function() {
      var pageWidth = this.get('browserSizeService.pageWidth'),
          firstChannel = this.get('channels.firstObject.tid'),
          currentDisplay = this.get('currentDisplay');

      if (currentDisplay === 'row' &&
          (pageWidth === 'xsmall' ||
           pageWidth === 'small')) {
        this.set('selectedChannel', firstChannel);
      }
    }.observes('browserSizeService.pageWidth'),

    // Don't currently change the view based on the url
    //addChannelToURL: function() {
    //  var channel = this.get('selectedChannel'),
    //      channels = this.get('channels'),
    //      channelNameMatch = /\(([^\)]+)\)/,
    //      channelName = '';

    //  channels.forEach(function(ch) {
    //    if (ch.tid === channel) {
    //      channelName = channelNameMatch.exec(ch.name)[1].toLowerCase();
    //    }
    //  });

    //  window.location.hash = channelName;
    //}.observes('selectedChannel'),

    timeOptions: function() {
      var date = new Date(),
          options = [],
          dateValue, dateLabel;

      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      // Increment through every 30 mins of the day
      for(var i = 0; i < 48; i++) {
        dateValue = this.getTime(date, 'value');
        dateLabel = this.getTime(date);

        options.push({value: dateValue, title: dateLabel});

        date = this.stepForwardBack(date, 'minute', 30);
      }

      return options;
    }.property(),

    timeRange: function() {
      var date = new Date(this.get('start')),
          options = [],
          time;

      for(var i = 0; i < 4; i++) {
        time = this.getTime(date);

        options.push(time);

        date = this.stepForwardBack(date, 'minute', 30);
      }

      return options;
    }.property('start'),

    getTime: function(date, type) {
      var mins = addZero(date.getMinutes().toString()),
          hours = addZero(date.getHours().toString()),
          post = 'AM';

      if (Number(hours) >= 12) {
        post = 'PM';
      }


      if (type === 'value') {
        return '' + hours + mins;
      }
      else {
        hours = (hours%12 === 0) ? 12 : (hours%12);
        return hours + ":" + mins + " " + post;
      }
    },

    // These are the named timezones. GMT timezones are added below.
    timezones: [
      { title: 'Eastern U.S.',  'offset': 0 },
      { title: 'Central U.S.',  'offset': -3600 },
      { title: 'Mountain U.S.', 'offset': -7200 },
      { title: 'Pacific U.S.',  'offset': -10800 },
      { title: 'Alaska',        'offset': -14400 },
      { title: 'Hawaii',        'offset': -18000 },
    ],

    addGmtTimezones: function() {
      var timezones = this.get('timezones'),
          offset = -21600,
          offset_start = 0;

      while (offset !== offset_start) {
        if (offset < -39600) {
          offset = 43200;
        }

        timezones.push({
          title: 'GMT ' + (offset > 0 ? '+' : '') + (offset / 3600),
          offset: offset - offset_start,
        });

        offset -= 3600;
      }
    }.on('init'),

    channelOptions: function(){
      var pageWidth = this.get('browserSizeService.pageWidth'),
          channels = Ember['default'].copy(this.get('channels'));

      if (pageWidth !== 'xsmall' && pageWidth !== 'small') {
        channels.insertAt(0, { tid: 'all', name: 'All Channels'});
      }

      return channels;
    }.property('channels', 'browserSizeService.pageWidth'),

    refresh: function() {
      var calendar_id = this.get('selectedChannel'),
          minutes = this.get('selectedMinutes'),
          hours = this.get('selectedHours'),
          channels = this.get('channels'),
          model = this.get('model'),
          start = this.get('start'),
          end = this.get('end'),
          self = this;

      if (Ember['default'].isEmpty(model)) {
        return null;
      }

      // Hours here could be negative if the timezone offset takes the hour
      // value negative in "selectedHours". Could be fixed as I'm not sure
      // how accurate this is
      start.setHours((hours < 0 ? hours + 24 : hours));
      start.setSeconds(0);
      start.setMilliseconds(0);

      if (calendar_id === 'all') {
        // Align server requests with calendar. 30 min increments.
        var min = (minutes < 30 ? 0 : 30);
        start.setMinutes(min);
        // @TODO I believe this is 2 hours in the future.
        end.setTime(start.getTime() + 7260000);
      }
      else {
        start.setMinutes(0);
        end.setTime(start.getTime());
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
      }

      // ATM for some reason this can get triggered twice per change so debounce
      Ember['default'].run.debounce(this, 'sendAction', 'loadSchedule', model, start, end, 150, true);

      model.get('tvSchedule').then(function(results) {
        var data = Ember['default'].A();
        data.start = self.start;
        data.end = self.end;
        data.nodes = Ember['default'].A();

        results.forEach(function(item) {
          var newData = {};

          newData.node = item;

          if( newData.node.get('eventDate') && newData.node.get('eventDate').length > 0 ){
            newData.title = newData.node.get('title');
            newData.description = newData.node.get('description');
            newData.path = newData.node.get('additionalLink1') ? newData.node.get('additionalLink1')[0]['url'] : null;
            newData.image_100x75 = newData.node.get('masterImage.crop4x3ratio');


            newData.start = newData.node.get('eventDate')[0].value;
            newData.end = newData.node.get('eventDate')[0].value2;
            newData.calendars = newData.node.get('calendarName');
            newData.overlay = newData.node.get('overlay');

            data.nodes.push(newData);
          }
        });

        self.set('serverResponse', data);
      });
    }.observes('start', 'selectedChannel'),

    renderDebug: function() {
      var data = this.get('debugData'),
          html = '';

       Ember['default'].$.each(data, function(type) {
         var events_html = '';
         var real;
         data[type].forEach(function(item) {
           // if the event doesn't have an nid its prob just a blank space
           real = typeof item.nid !== "undefined";
           events_html += '<tr>';
           if (real) { events_html += '<td>' + item.nid + '</td>'; }
           events_html += '<td>' + item.title + '</td>';
           events_html += '<td>' + window.moment(item.start).format('h:mm A');
           events_html += ' - ' + window.moment(item.end).format('h:mm A') + '</td>';
           if (real) { events_html += '<td><a href="' + item.path + '/edit">Edit</a></td>'; }
           events_html += '</tr>';
         });

         html += '<table><caption>' + type + '</caption>';
         if (real) { html += '<tr><th>Node id</th>'; }
         html += '<th>Title</th>';
         html += '<th>Time</th>';
         if (real) { html += '<th>Actions</th>'; }
         html += '</tr>';
         html += events_html;
         html += '</table>';
       });

       this.set('debugHTML', html);
    },

    // sort out overlay vs non-overlay events
    // verify time layout of each
    // a comparison of two events can only result in
    //    - Trimming from start or end
    //    - splitting the event ONLY IN OVERLAY
    //    - deleting the event
    //    - not in collision
    prepare_events: function() {
      var disableOverlays = this.get('disableOverlays'),
          channels = this.get('model.calendarName'),
          data = this.get('serverResponse'),
          tv_events = this.get('tv_events'),
          overlay_events = {},
          normal_events = {},
          self = this;

      if (Ember['default'].isNone(channels) || Ember['default'].isNone(data)) {
        return null;
      }

      // create empty calendars
      var channel_ids = [];
      channels.forEach(function(channel) {
        var id = channel.tid;

        channel_ids.push(id);
        tv_events[id] = [];
        normal_events[id] = [];
        overlay_events[id] = [];
      });

      // separate events into calendars
      // separate normal vs overlay events
      data.nodes.forEach(function (node) {
        node.start = new Date(Date.parse(node.start));
        node.end = new Date(Date.parse(node.end));

        // ensure self event has sane start and end dates
        // by continuing we are effectivly dropping the event
        if (self.is_insane(node)){ return true; }// jQuery each continue

        // log overlay events
        if (self.is_overlay(node)){ self.tv_debug('Overlay Events', node); }

        for(var j in node.calendars) { // for each calendar
          var event_cal_id = node.calendars[j];

          // if event_cal_id isn't in the widget calendars skip it
          if ($.inArray(event_cal_id, channel_ids) === -1 ) { continue; }

          var new_event = $.extend(true, {}, node);

          if (self.is_overlay(node)){
            overlay_events[event_cal_id].push(new_event); // append event
          }
          else{
            normal_events[event_cal_id].push(new_event); // append event
          }
        }
      });

      normal_events = this.clean_each_calendar(normal_events);
      overlay_events = this.clean_each_calendar(overlay_events);

      // check for events self needs to be
      // - deleted by consuming
      // - trimmed
      if (disableOverlays){
        tv_events = normal_events;
      }
      else{
        tv_events = this.merge_each_calendar(overlay_events, normal_events);
      }

      channels.forEach(function(channel) {
        var id = channel.tid;
        // sort array to ensure they are in order before converting to dates
        // firefox somehow didn't the numeric keys in order
        tv_events[id] = tv_events[id].sort(self.sort_by_date);
        // change all keys to timestamps for render
        tv_events[id] = self.change_key_to_dates(tv_events[id]);
      });

      this.set('tv_events', tv_events);
    }.observes('serverResponse', 'disableOverlays'),

    sort_by_date: function(a, b) {
      return a.start.getTime() - b.start.getTime();
    },

    clean_each_calendar: function (array) {
      for (var cid=0; cid < array.length; cid++) {
        array[cid] = this.resolve_collisions(array[cid]);
      }
      return array;
    },

    merge_each_calendar: function (overlay_events, normal_events) {
      for (var cid in normal_events) {
        normal_events[cid] = this.merge_events(overlay_events[cid], normal_events[cid]);
      }
      return normal_events;
    },

    resolve_collisions: function(events_list) {
      var primary_event = null;
      var secondary_event = null;
      var trim_index = 0;

      if(events_list === undefined) {
        return [];
      }

      // pick event to compare to all others
      for (var pid=0; pid < events_list.length; pid++) {
        primary_event = events_list[pid];

        // compare this event to all other events
        for(var sid=0; sid < events_list.length; sid++) {
          secondary_event = events_list[sid];
          // this is the same node.. move on.
          if (primary_event.nid === secondary_event.nid){ continue; }

          if (!this.is_colliding(primary_event, secondary_event)){ continue; }

          switch (this.is_consumed(primary_event, secondary_event)) {
            case 1: // first node is consumed by second
              // delete first node
              events_list[pid]['delete'] = true;
              break;
            case 2: // second node is consumed by first
              // delete second node
              events_list[sid]['delete'] = true;
          }

          var non_trim_index;

          // check which event has the higher nid. which ever one does
          // will have priority when trimming is done
          if (primary_event.nid < secondary_event.nid) {
            trim_index = pid;
            non_trim_index = sid;
          }
          else {
            trim_index = sid;
            non_trim_index = pid;
          }

          // check for trimming
          switch(this.needs_trimming(events_list[non_trim_index], events_list[trim_index])) {
            case 1: // first node is before second
              events_list[trim_index].start = events_list[non_trim_index].end;
              break;
            case 2: // second node is before first
              events_list[trim_index].end = events_list[non_trim_index].start;
          }
        }
        // nothing can be here cuz primary index might be gone
      }

      var return_array = [];
      // push all overlay events now that all conflict
      for (var i=0; i < events_list.length; i++) {
        // if event hasn't been marked for deletion
        if(typeof events_list[i]['delete'] !== 'boolean'){
          return_array.push(events_list[i]);
        }
        else{
          this.tv_debug('Conflicting Events', events_list[i]);
        }
      }

      return return_array;
    },

    merge_events: function(overlay_events, events_array) {
      var overlay_flags = null,
          self = this;

      // if there are no overlay events then we are all good
      if (!overlay_events.length){ return events_array; }

      // pick overlay event to compare to all normal events
      overlay_events.forEach(function(overlay_event, overlay_index) {
        overlay_event = overlay_events[overlay_index];

        // compare self event to all normal
        events_array.forEach(function(normal_event, normal_index) {
          normal_event = events_array[normal_index];

          // if the events are not in conflict then continue
          if (!self.is_colliding(overlay_event, normal_event)){ return; }

          switch (self.is_consumed(overlay_event, normal_event)) {
            case 1: // overlay node is consumed by normal
              // therefor depding on the overlay options we will need to
              // either:
              //  - delete the normal node
              //  - split the normal to make room for overlay

              overlay_flags = overlay_event.overlay; // lets make a var
              // possible elements in the array
              // 1 overlay do not use filler
              // 2 overlay use filler before
              // 3 overlay use filler after

              // cache common edge results for self event comparison
              var common_edge = self.find_common_edge(overlay_event, normal_event);

              // overlay event perfectly matches normal event
              // simply delete the normal event
              if (common_edge === 3) {
                events_array[normal_index]['delete'] = true;
                return; // ignore event
              }

              // overlay do not use filler
              if ($.inArray('1', overlay_flags) > -1) {
                switch(common_edge) {
                  case 1: // front edge matches
                    // trim normal from front
                    events_array[normal_index] = self.trim(normal_event, 'front', overlay_event.end);
                    break;
                  case 2: // back edge
                    // trim normal from back
                    events_array[normal_index] = self.trim(normal_event, 'back', overlay_event.start);
                    break;
                  default:
                    // split normal
                    overlay_events = self.split(overlay_event, normal_event, overlay_events);
                }
              }
              else {  // overlay events use filler in some aspect
                if ($.inArray('2', overlay_flags) && $.inArray('3', overlay_flags) || common_edge === 0) {
                  // delete normal
                  events_array[normal_index]['delete'] = true;
                  return; // ignore event
                }
                else if ($.inArray('2', overlay_flags)) { // 2 overlay use filler before
                  switch(common_edge) {
                    case 1: // front edge
                      // delete normal
                      events_array[normal_index]['delete'] = true;
                      return; // ignore event
                    case 2: // back edge
                      // trim normal
                      events_array[normal_index] = self.trim(normal_event, 'back', overlay_event.start);
                  }
                }
                else if ($.inArray('3', overlay_flags)) { // 3 overlay use filler after
                  switch(common_edge) {
                    case 1: // front edge
                      // trim normal
                      events_array[normal_index] = self.trim(normal_event, 'front', overlay_event.start);
                      break;
                    case 2: // back edge
                      // delete normal
                      events_array[normal_index]['delete'] = true;
                      return; // ignore event
                  }
                }
              }
              break;
            case 2: // normal node is consumed by overlay
              // therefor delete the normal node
              events_array[normal_index]['delete'] = true;
              return; // ignore event
          }

          // check for trimming
          switch(self.needs_trimming(overlay_event, normal_event)) {
            case 1: // first node is before second
              events_array[normal_index] = self.trim(events_array[normal_index], "front", overlay_event.end);
              break;
            case 2: // second node is before first
              events_array[normal_index] = self.trim(normal_event, "back", overlay_event.start);
          }

        });
      });

      // push all overlay events now that all conflict
      events_array.forEach(function(type, i) {
        // if event hasn't been marked for deletion
        if(typeof events_array[i]['delete'] !== 'boolean'){
          overlay_events.push(events_array[i]);
        }
        else{
          self.tv_debug('Hidden by Overlay', events_array[i]);
        }
      });

      return overlay_events;
    },

    is_insane: function(event) {
      // if the event start and end time match
      // or start time is after end.. this event is insane
      if (event.start >= event.end) {
        return true;
      }
      return false; // this event has some basis in reality
    },

    is_overlay: function(node) {
      return (node.overlay !== undefined);
    },

    cleanup_each_calendar: function(array) {
      var self = this;

      array.forEach(function(cal, calendar) {
        array[calendar] = self.delete_marked_events(array[calendar]);
      });
      return array;
    },

    split: function (primary_event, split_event, events_array) {
      var new_event = $.extend(true, {}, split_event);

      this.tv_debug('Split Events', split_event);

      // trim the old and new event to create the split
      split_event = this.trim(split_event, "back", primary_event.start);
      new_event = this.trim(new_event, "front", primary_event.end);

      events_array.push(split_event);
      events_array.push(new_event);
      return events_array;
    },

    find_common_edge: function (a, b) {
      var a_start = a.start.getTime();
      var a_end = a.end.getTime();
      var b_start = b.start.getTime();
      var b_end = b.end.getTime();

      if ((a_start === b_start) && (a_end === b_end)){
        return 3; // both edges match
      }
      if (a_start === b_start){
        return 1; // front edge is common
      }
      if (a_end === b_end){
        return 2; // back edge is common
      }
      return 0; // no common edges
    },

    trim: function (event, side, time) {
      if(side === "front"){
        event.start = time;
      }
      else{
        event.end = time;
      }

      return event;
    },

    is_colliding: function (a, b) {
      return (a.start.getTime() <= b.end.getTime()) && (a.end.getTime() >= b.start.getTime());
    },

    is_consumed: function(a, b) {
      var a_start = a.start.getTime();
      var a_end = a.end.getTime();
      var b_start = b.start.getTime();
      var b_end = b.end.getTime();
      if (((a_start >= b_start) && (a_start < b_end)) && ((a_end > b_start) && (a_end <= b_end))) {
          return 1; // first node is consumed by second
      }

      if (((b_start >= a_start) && (b_start < a_end)) && ((b_end > a_start) && (b_end <= a_end))) {
          return 2; // second node is consumed by first
      }

      return 0; // nodes are not in conflict
    },

    needs_trimming: function(a, b) {
      var a_start = a.start.getTime();
      var a_end = a.end.getTime();
      var b_start = b.start.getTime();
      var b_end = b.end.getTime();

      if ((a_start < b_start) && (a_end > b_start)) {
          return 1; // first node is before second
      }

      if ((b_start < a_start) && (b_end > a_start)) {
          return 2; // second node is before first
      }

      return 0; // nodes are not in conflict
    },

    change_key_to_dates: function(old_array) {
      var new_array = {};

      for(var i=0; i < old_array.length; i++) {
        new_array[old_array[i].start.getTime()/1000] = old_array[i];
      }

      return new_array;
    },

    tv_debug: function (type, event) {
      if (!this.get('isDebugging')) { return; } // dont log anything if we are not debugging;
      var data = this.get('debugData');

      // if this type of debug hasn't been reported create array for it.
      if (typeof data[type] === 'undefined') { data[type] = []; }

      // create new instance and add event to debug type
      data[type].push($.extend(true, {}, event));
      this.set('debugData', data);
    },

    verify_blank_time: function(start, end) {
      var data = this.get('debugData');

      // if there are no deleted events then yes this is a blank time
      if (data['Deleted Events'] === undefined) { return true; }

      var fake_event = {
        title: 'Blank on ' + this.calendar_name,
        start: start,
        end: end,
        blank: true
      };

      var merge = this.merge_events(data['Deleted Events'], [fake_event]);

      for (var event in merge) {
        if (event.blank) { // check for blank events
          if (event.start === start && event.end === end){
            return true; // this time is blank
          }
          return event; // this time is blank but has been trimmed
        }
      }

      // else blank event not found
      return false; // not blank
    },

    render_event: function(calendar_id,event,duration,local_start,local_end,layout,time_span){
        var start_hours = (local_start.getHours() > 12 ? local_start.getHours() - 12 : (local_start.getHours() === 0 ? 12 : local_start.getHours()));
        var start_minutes = (local_start.getMinutes()<10?'0':'')+local_start.getMinutes()+' '+(local_start.getHours()>11?'PM':'AM');
        var end_hours = (local_end.getHours() > 12 ? local_end.getHours() - 12 : (local_end.getHours() === 0 ? 12 : local_end.getHours()));
        var end_minutes = (local_end.getMinutes()<10?'0':'')+local_end.getMinutes()+' '+(local_end.getHours()>11?'PM':'AM');
        var event_title = '';
        var event_description = '';
        var event_image = '';
        var html = '';

        if(event == null) {
          event_title = 'NASA TV Programming';
          if (this.get('isDebugging')) {
            var verify = this.verify_blank_time(local_start, local_end);
            if (verify) {
              var calendar_name = $('.channel-row-'+calendar_id+' p:first-child').html();
              if (typeof verify === "object") {
                this.tv_debug('Blank Time', {
                  title: 'Blank on ' + calendar_name,
                  start: verify.start,
                  end: verify.end
                });
              }
              else {
                this.tv_debug('Blank Time', {
                  title: 'Blank on ' + calendar_name,
                  start: local_start,
                  end: local_end
                });
              }
            }
          }
        }
        else {
          if ($('#tv-timeline-dialog').length) {
            if(event.path){
              event_title = '<a class="event-title event-'+calendar_id+'-'+event.node.id+'" href="'+event.path+'" >'+event.title+'</a>';
            }
            else{
              event_title = '<a class="event-title event-'+calendar_id+'-'+event.node.id+'" href="">'+event.title+'</a>';
            }
          }
          else {
            event_title = '<h3>'+event.title+'</h3>';
          }

          event_description = event.description;
          if(event.image_100x75) {
            event_image = '<img alt="event image" src="'+event.image_100x75+'" />';
          }
        }

        if(layout === 'row') {
          var ms_per_min = 60 * 1000, // how many milliseconds in a minute
              block_size = 30, // round to nearest half hour
              minute_range = 1, // how close to the block size to round it
              num_blocks = duration / (block_size * ms_per_min); // float representing how many half hour blocks the event takes up

          // If duration is within a minute of block, round to that block size
          if(Math.abs(Math.round(num_blocks) - num_blocks).toFixed(5) <= (minute_range / block_size).toFixed(5)){
            duration = Math.round(num_blocks) * block_size * ms_per_min;
          }

          //html += event_title;
          var proportion = duration / time_span;
          if( proportion > 0 ){
            var margin = 0.45;
            var percent = (proportion*100)-margin;
            html += '<div class="event-detail" style="width: '+percent+'%; margin-left: '+margin+'%">';
            html += event_title+'<br />';
            html += start_hours+':'+start_minutes+' - '+end_hours+':'+end_minutes;
            html += '</div>';
          }
        }
        else if (layout === 'list') {
            html += '<div class="channel-item">';
            html += '<div class="time-label">'+start_hours+':'+start_minutes+'</div>';
            html += '<div class="event-detail-list">'+event_image+event_title;
            if(event_description){
              html += '<br />'+event_description;
            }
            html += '</div></div>';
        }
        return html;
    },

    render_schedule: function() {
      var calendar_id = this.get('selectedChannel'),
          tz_offset = this.get('selectedTimezone'),
          layout = this.get('currentDisplay'),
          dialog = $('#tv-timeline-dialog'),
          tv_events = this.get('tv_events'),
          start = this.get('start'),
          last_event_end = this.get('start'),
          time_span = 0,
          self = this,
          event;

      // change time span of the view based on which layout we are in
      switch(layout) { // times below are in micro-seconds
        case 'row':
          time_span = 7200000; // 2 hours

          $('.channel-row',this.container).show();
          $('.channel-list-container',this.container).hide();
          break;
        case 'list': // 24 hours
          time_span = 86400000;

          $('.channel-row',this.container).hide();
          $('.channel-list-container',this.container).hide();
          $('.channel-list-container-'+calendar_id,this.container).show();
          break;
      }

      // for each calendar
      Ember['default'].$.each(tv_events, function(cid) {
        var channel_html = '';
        var duration, blank_start, blank_end;
        last_event_end = start;

        // for each event in calendar
        for(var start_time in tv_events[cid]) {
          event = tv_events[cid][start_time];
          var event_start = event.start;
          var event_end = event.end;
          var local_start = new Date(event_start.getTime() + (tz_offset * 1000));
          var local_end = new Date(event_end.getTime() + (tz_offset * 1000));

          // if the current event start time is before the last event's end time.
          if(event_start.getTime() < last_event_end.getTime()) {
            event_start = last_event_end;
          }

          // if the current start time is after the last end time
          // and the current start time is before the end of the current timespan
          // meaning the event falls completely within the time_span
          if(event_start.getTime() > last_event_end.getTime() && event_start.getTime() < start.getTime() + time_span){
              blank_start = new Date(last_event_end.getTime() + (tz_offset * 1000));
              blank_end = new Date(event_start.getTime() + (tz_offset * 1000));
              //var duration = Math.round((event_start.getTime() - last_event_end.getTime())/450000)
              duration = event_start.getTime() - last_event_end.getTime();
              channel_html += self.render_event(cid,null,duration,blank_start,blank_end,layout,time_span);
          }

          // if the current event ends after the view window trim it
          // meaning only the start of the event lands within the time_span
          if(event_end.getTime() > start.getTime() + time_span) {
            event_end = new Date(start.getTime() + time_span);
          }

          // if the current end is after the start time and the current
          // start time is before the end of the time_span
          // meaning the event could start before the time_span though
          // doesn't need to? the second clause seems like it could allow
          // more cases.

          if(event_end.getTime() > start.getTime() && event_start.getTime() < (start.getTime() + time_span)){
              //var duration = Math.round((event_end.getTime() - event_start.getTime())/450000);
              duration = event_end.getTime() - event_start.getTime();
              channel_html += self.render_event(cid,event,duration,local_start,local_end,layout, time_span);
              last_event_end = event_end;
          }
        }
        if(last_event_end.getTime() < (start.getTime() + time_span)){
            blank_start = new Date(last_event_end.getTime() + (tz_offset * 1000));
            blank_end = new Date((start.getTime() + time_span) + (tz_offset * 1000));
            //var duration = Math.round(((start.getTime() + 10800000) - last_event_end.getTime())/450000);
            duration = (start.getTime() + time_span) - last_event_end.getTime();
            channel_html += self.render_event(cid,null,duration,blank_start,blank_end,layout, time_span);
        }
        if(layout === 'list') {
          $('.channel-list-'+cid,self.container).html(channel_html);
        }
        else{
          $('.channel-row-'+cid+' .channel-events',self.container).html(channel_html);
        }

        Ember['default'].$.each(tv_events[parseInt(cid)], function(key, item) {
          $('.event-'+cid+'-'+item.node.id,self.container).click(function(){
              //var footer_links = '';
              //for(var j in item.data.links) {
              //    footer_links +='<a href='+item.data.links[j]+'>'+item.data.link_titles[j]+'</a><br />';
              //}
              //if(item.data.youtube) {
              //    footer_links +='<a href='+item.data.youtube+'>Watch on YouTube --&gt;</a><br />';
              //}
              //$('.dialog-contents',dialog).html(item.node.get('description')+'<p>'+footer_links+'</p>');
              $('.dialog-contents',dialog).html(item.node.get('description'));

              if(item.image_100x75){
                  $('.dialog-image',dialog).html('<img alt="item image" src="'+item.image_100x75+'" />');
              }
              else {
                  $('.dialog-image',dialog).html('');
              }

              //$('.dialog-footer',dialog).html(footer_links);
              dialog.show();
              return false;
          });
        });
      });

      if (this.get('isDebugging')) {
        this.renderDebug();
        this.set('debugData', {}); // reset data
      }
    }.observes('tv_events', 'selectedTimezone'),

    stepForwardBack: function(date, interval, units) {
      var ret;

      if (typeof date === 'string') {
        ret = new Date(this.get(date)); //don't change original date
      }
      else {
        ret = new Date(date);
      }

      switch (interval.toLowerCase()) {
        case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
        case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
        case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
        case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
        case 'day'    :  ret.setDate(ret.getDate() + units);  break;
        case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
        case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
        case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
        default       :  ret = undefined;  break;
      }

      if (typeof date === 'string') {
        this.set(date, ret);
      }
      else {
        return ret;
      }
    },

    actions: {
      changeChannel: function(id) {
        this.set('selectedChannel', id);
      },

      back: function() {
        this.stepForwardBack('start', 'minute', -30);
      },

      forward: function() {
        this.stepForwardBack('start', 'minute', 30);
      }
    },
  });

});
define('nasa/components/twitter-embed-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    layoutName: 'components/twitter-embed-card',
    isLoaded: true,

    embedId: function() {
      return this.get('content.embedUrl');
    }.property(),

    didInsertElement: function() {
      Ember['default'].run.scheduleOnce('afterRender', this, function () {
        var promise = new Ember['default'].RSVP.Promise(function (resolve, reject) {
          Ember['default'].$.getScript('//platform.twitter.com/widgets.js', function(data, sts, jqxhr) {
            if (jqxhr.status === 200) {
              resolve();
            }
            else {
              reject();
            }
          });
        }, 'Acquiring Twitter JS Library');

        promise.then(function() {
          twttr.widgets.load();
        }, 'twttr.widgets.load()');
        this.$().parent().isotope('appended', this.$());
      });
    },

  });

});
define('nasa/components/uber-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    tagName: 'a',
    layoutName: 'components/uber-card',
    classNameBindings: ['isHumongo', 'isHumongo:full-bleed', 'isHumongo:card'],
    attributeBindings: ['cardFeedLink:href'],

    isLoaded: Ember['default'].computed.alias('ubernode.masterImage.isLoaded'),
    isHumongo: Ember['default'].computed.equal('cardSize', '4x1'),

    nodeImage: Ember['default'].computed.alias('ubernode.masterImage'),
    nodeTitle: Ember['default'].computed.any('content.altTitle', 'content.title'),
    hasNodeTitle: Ember['default'].computed.notEmpty('nodeTitle'),
    nodeUri: Ember['default'].computed.alias('ubernode.uri'),
    nodePrimary: Ember['default'].computed.alias('ubernode.primaryTag'),
    nodeSecondary: Ember['default'].computed.alias('ubernode.secondaryTag'),
    ubernodeType: Ember['default'].computed.alias('ubernode.ubernodeType'),
    linkOrAttachment: Ember['default'].computed.alias('ubernode.linkOrAttachment'),
    attachments: Ember['default'].computed.alias('ubernode.attachments'),
    collectionAssetLink: Ember['default'].computed.alias('ubernode.collectionAssetLink'),
    isImage: Ember['default'].computed.equal('ubernodeType','image'),

    onInit: function() {
      // Selects which alias to use. Eliminates 'storyCard'
      // 'content' for ubernodes, 'content.node' for uberCards
      if (this.get('content.constructor.typeKey') === 'ubernode') {
        Ember['default'].defineProperty(this, 'ubernode', Ember['default'].computed.alias('content'));
      } else {
        Ember['default'].defineProperty(this, 'ubernode', Ember['default'].computed.alias('content.node'));
      }

      this.get('ubernode');
      this.get('nodeImage');
      this.get('nodePrimary');
      this.get('nodeSecondary');

    }.on('init'),

    cardFeedLink: function() {
      // if not a collection asset, always use the node path
      if (this.get('ubernodeType') !== 'collection_asset') {
        return this.get('nodeUri');
      }
      // if it is a collection asset, check if it's a link or attachment and link to that instead
      if (this.get('linkOrAttachment') === 'attachment') {
        return this.get('attachments.path');
      } else if (this.get('linkOrAttachment') === 'link') {
        return this.get('collectionAssetLink.url');
      } 
      return false;
    }.property('ubernodeType', 'linkOrAttachment', 'attachments.path', 'collectionAssetLink.url'),

    loadImage: function() {
      var self = this;
      if (!this.get('isLoaded') && this.get('imageCrop')) {
        var image = new Image();
        image.src = this.get('imageCrop');
        image.onload = function() {
          self.set('isLoaded', true);
        }
      }
    }.observes('imageCrop', 'isLoaded'),

    imageCrop: function() {
      if (!this.get('nodeImage')) {
        return false;
      }

      var crop = 'crop' + this.get('cardSize');
      if (this.get('isHumongo')) {
        crop = 'cropHumongo';
      }
      return this.get('nodeImage.' + crop);
    }.property('isHumongo', 'cardSize', 'nodeImage'),

    tag: function() {
      var tag = false;

      switch (this.get('content.visibleTag')) {
        case 'primary':
          tag = this.get('nodePrimary');
          break;
        case 'secondary':
          tag = this.get('nodeSecondary');
          break;
      }

      return tag;
    }.property('nodePrimary', 'nodeSecondary', 'content.visibleTag'),

    didInsertElement: function() {
      if (!this.get('isHumongo')) {
        this._super();
      }

      Ember['default'].run.scheduleOnce('afterRender', this, function () {
        // @TODO: I don't like this, but it works until we create a render mixin.
        this.loadImage();
      });
    },

    willDestroyElement: function() {
      if (!this.get('isHumongo')) {
          this._super();
      }
    },

  });

});
define('nasa/components/ubernode-full', ['exports', 'ember', 'nasa/mixins/before-after-image'], function (exports, Ember, BeforeAfter) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].Component.extend( BeforeAfter['default'], {
    layoutName: 'components/ubernode-full',
    classNames: ['ubernode-full'],

    isPrimary: false,
    selected: false,
    showFadeout: true,

    isOpen: Ember['default'].computed.or('isPrimary', 'isSelected'),
    isNotPrimary: Ember['default'].computed.not('isPrimary'),
    showToggle: Ember['default'].computed.and('isNotPrimary', 'showFadeout'),

    isSelected: function() {
      return this.get('content.id') === this.get('selected');
    }.property('selected'),

    onInit: function() {
      // Selects which alias to use. Eliminates 'storyCard'
      // 'content' for ubernodes, 'content.node' for uberCards
      if (this.get('content.constructor.typeKey') === 'ubernode') {
        Ember['default'].defineProperty(this, 'ubernode', Ember['default'].computed.alias('content'));
      } else {
        Ember['default'].defineProperty(this, 'ubernode', Ember['default'].computed.alias('content.node'));
      }
    }.on('init'),

    /* multiple types */
    body: Ember['default'].computed.alias('ubernode.body'),
    enableComments: Ember['default'].computed.alias('ubernode.enableComments'),
    author: Ember['default'].computed.alias('content.name'),
    promoDateTime: Ember['default'].computed.alias('content.promoDateTime'),
    primaryTag: Ember['default'].computed.alias('content.primaryTag'),
    title: Ember['default'].computed.alias('content.title'),
    uri: Ember['default'].computed.alias('content.uri'),
    url: function() {
      return window.location.hostname + this.get('uri');
    }.property('uri'),

    /* properties to help with conditionals per type */
    ubernodeType: Ember['default'].computed.alias('content.ubernodeType'),
    isImage: Ember['default'].computed.equal('ubernodeType', 'image'),
    isNotImage: Ember['default'].computed.not('isImage'),
    isFeature: Ember['default'].computed.equal('ubernodeType', 'feature'),
    isCollectionAsset: Ember['default'].computed.equal('ubernodeType', 'collection_asset'),
    isFeatureOrPressRelease: Ember['default'].computed.or('isFeature', 'isPressRelease'),

    /* Image Features */
    linkurl: Ember['default'].computed.alias('content.linkurl'),

    /* Mediacasts */
    isMediacast: Ember['default'].computed.equal('ubernodeType', 'mediacast'),
    podcast: Ember['default'].computed.alias('content.podcast'),
    vodcast: Ember['default'].computed.alias('content.vodcast'),
    hasPodcast: Ember['default'].computed.or('content.podcast', 'content.podcastRssUrl', 'content.podcastItunesUrl'),
    hasVodcast: Ember['default'].computed.or('content.vodcast', 'content.vodcastRssUrl', 'content.vodcastItunesUrl'),

    /* Press Releases */
    isPressRelease: Ember['default'].computed.equal('ubernodeType', 'press_release'),
    releaseType: Ember['default'].computed.alias('content.releaseType'),
    releaseId: Ember['default'].computed.alias('content.releaseId'),
    hasDateOrReleaseType: Ember['default'].computed.or('promoDateTime', 'releaseType'),

    /* tags */
    tagsUnsorted: Ember['default'].computed.union('content.missions','content.topics','content.collections','content.other_tags'),
    tagsFiltered: Ember['default'].computed.filterBy('tagsUnsorted', 'displayTagOnUbernode', true),
    tagsSortBy: ['name'],
    tags: Ember['default'].computed.sort('tagsFiltered', 'tagsSortBy'),

    /* all image-related logic */
    setToUseNoImage: Ember['default'].computed.equal('content.ubernodeImage', 0),
    setToUseMasterImage: Ember['default'].computed.equal('content.ubernodeImage', 1),
    setToUseHorizImage: Ember['default'].computed.equal('content.ubernodeImage', 2),
    setToUseVertImage: Ember['default'].computed.equal('content.ubernodeImage', 3),

    useAltHorizImage: Ember['default'].computed.and('isFeatureOrPressRelease', 'setToUseHorizImage'),
    useAltVertImage: Ember['default'].computed.and('isFeatureOrPressRelease', 'setToUseVertImage'),
    /* credit and caption for alt vert image */
    imageCredits: Ember['default'].computed.alias('content.imageCredits'),
    masterImageCaption: Ember['default'].computed.alias('content.masterImageCaption'),
    hasCaptionOrCredit: Ember['default'].computed.or('masterImageCaption', 'imageCredits'),

    hasTopBannerImage: Ember['default'].computed.or('setToUseHorizImage', 'setToUseMasterImage'),
    hasTopImage: Ember['default'].computed.and('isNotImage', 'hasTopBannerImage'),
    disqusActive: Ember['default'].computed('content.id','disqus.activeId', function(){
      return this.get('content.id') === this.get('disqus.activeId');
    }),
    showDisqus: Ember['default'].computed.and('disqusActive','enableComments'),
    hideDisqus: Ember['default'].computed.not('showDisqus'),

    useMasterImage: function() {
      if (this.get('isFeatureOrPressRelease')) {
        return this.get('setToUseMasterImage');
      }
      return true;
    }.property('isFeatureOrPressRelease', 'setToUseMasterImage'),

    image: function() {
      var image = {};
      switch (this.get('ubernodeType')) {
        case 'feature' :
        case 'press_release' :
          switch(this.get('content.ubernodeImage')) {
            case 0:
              image = false;
              break;
            case 1:
              image = {
                crop: this.get('content.masterImage.cropUnHoriz'),
                full: this.get('content.masterImage.path'),
                alt: this.get('content.masterImage.alt')
              };
              break;
            case 2:
              image = {
                crop: this.get('content.ubernodeAltImgHoriz.cropUnHoriz'),
                full: this.get('content.ubernodeAltImgHoriz.path'),
                alt: this.get('content.ubernodeAltImgHoriz.alt')
              };
              break;
            case 3:
              image = {
                crop: this.get('content.ubernodeAltImgVert.cropUnVert'),
                full: this.get('content.ubernodeAltImgVert.path'),
                alt: this.get('content.ubernodeAltImgVert.alt')
              };
              break;
          }
        break;
      case 'mediacast' :
          image = false;
          break;
      case 'image' :
          image = {
            crop: this.get('content.masterImage.fullWidthFeature'),
            full: this.get('content.masterImage.path'),
            alt: this.get('content.masterImage.alt')
          };
          break;
      }
      if (!$.isEmptyObject(image)) {
        var imageEl = new Image();
        imageEl.src = image.crop;
        imageEl.onload = function(){
          this.set('isLoading', false);
        }.bind(this);
      }
      else {
        // image isn't set.. we are not loading
        this.set('isLoading', false);
      }
      return image;
    }.property(
      'model.isLoaded',
      'ubernodeType',
      'masterImage.isFulfilled',
      'ubernodeAltImgHoriz.isFulfilled',
      'ubernodeAltImgVert.isFulfilled'
    ),

    loadTwitterTweets: function() {
      if (!window.twttr &&
          $('.twitter-tweet').length &&
          $('#twitter-wjs').length === 0) {
        // @TODO: If there are multiple tweets on the page, this
        // loads/runs the script multiple times. We can do better.
        window.twttr = (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
          if (d.getElementById(id)) { return t; }
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);
          t._e = [];
          t.ready = function(f) {
            t._e.push(f);
          };
          return t;
        }(document, "script", "twitter-wjs"));
      }

      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    },

    loadInstagramEmbeds: function() {
      // @TODO: Same thing. Multiples will load the script again.
      if (!window.instagram && $('.instagram-media').length) {
        window.instagram = (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0],
          t = window.instagram || {};
          if (d.getElementById(id)) { return t; }
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.instagram.com/en_US/embeds.js";
          fjs.parentNode.insertBefore(js, fjs);
          t._e = [];
          t.ready = function(f) {
            t._e.push(f);
          };
          return t;
        }(document, "script", "instagram-wjs"));
      }
    },

    loadFacebookEmbeds: function() {
      // @TODO: Same thing. Multiples will load the script again.
      if (!window.FB &&
          $('.fb-post').length &&
          $('#facebook-jssdk').length === 0) {
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];

          if (d.getElementById(id)) return;

          js = d.createElement(s);
          js.id = id; 
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=156027591120958";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    },

    scheduleSocialEmbeds: function() {
      Ember['default'].run.scheduleOnce('afterRender', this, function(){
        this.loadInstagramEmbeds();
        this.loadTwitterTweets();
        this.loadFacebookEmbeds();
      });
    }.on('didInsertElement'),

    actions: {
      toggleCollapse: function() {
        if(this.get('isSelected')) {
          var position = this.$().offset().top - 85;
          if (!this.get('isOpen')) { window.scrollTo(0,position); }
          this.sendAction('setAsSelected', null);
        } else {
          this.sendAction('setAsSelected', this.get('content.id'));
        }
        if (this.get('enableComments') && !this.get('isOpen')){
          this.disqus.set('activeTitle',this.get('title'));
          this.disqus.set('activeId',this.get('content.id'));
        }
        if (this.get('enableComments') && this.get('isOpen')){
          this.disqus.set('activeTitle',this.get('defaultTitle'));
          this.disqus.set('activeId',this.disqus.get('defaultId'));
        }
      }
    },
  });

});
define('nasa/components/ubernode-listing', ['exports', 'ember', 'nasa/utils/flatten-date-array'], function (exports, Ember, FlattenDateArray) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['ubernode-listing'],
    subArray: Ember['default'].A(),
    current: 1,

    masterArray: Ember['default'].A(),
    content: Ember['default'].A(),

    pageSize: 0,

    onInit: function() {
      this.set('pageSize', this.get('content.firstObject.pageSize'));

      this.set('masterArray', FlattenDateArray['default'].create({
        content: this.get('content'),
      }));
    }.on('init'),

    totalPages: function() {
      var limit = this.get('pageSize'),
          total = this.get('masterArray.length'),
          pages = Math.ceil(total / limit);

      // Minimum 1 page
      // This also has the effect of hiding the pagination-pager.
      return pages > 1 ? pages : 1;
    }.property('pageSize', 'masterArray.length'),

    contentDidChange: function() {
      var limit = this.get('pageSize'),
          content = this.get('masterArray'),
          total = this.get('masterArray.length'),
          current = this.get('current'),
          offset = limit * (current - 1),
          items = [],
          max = Math.min(offset+limit, total);

      for (var i = offset; i < max; i++) {
        items.push(content.objectAt(i));
      }

      this.set('subArray', items);
    }.observes('masterArray.isLoading', 'current'),

    actions: {
      pageChanged: function (current, previous) {
        // this isn't needed until templates support mut
        //console.log(current, previous);
      }
    }
  });

});
define('nasa/components/ubernode', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    tagName: 'a',
    layoutName: 'components/uber-card',
    classNameBindings: ['isHumongo', 'isHumongo:full-bleed', 'nodeId'],
    attributeBindings: ['cardFeedLink:href'],

    isLoaded: Ember['default'].computed.alias('ubernode.masterImage.isLoaded'),
    nodeImage: Ember['default'].computed.alias('ubernode.masterImage'),
    nodeTitle: Ember['default'].computed.any('ubernode.cardfeedTitle', 'ubernode.title'),
    hasNodeTitle: Ember['default'].computed.notEmpty('nodeTitle'),
    nodeUri: Ember['default'].computed.alias('ubernode.uri'),
    feedTags: Ember['default'].computed.alias('ubernode.feeds.content.content'),
    nodePrimary: Ember['default'].computed.alias('ubernode.primaryTag'),
    nodeSecondary: Ember['default'].computed.alias('ubernode.secondaryTag'),
    ubernodeType: Ember['default'].computed.alias('ubernode.ubernodeType'),
    linkOrAttachment: Ember['default'].computed.alias('ubernode.linkOrAttachment'),
    attachments: Ember['default'].computed.alias('ubernode.attachments'),
    collectionAssetLink: Ember['default'].computed.alias('ubernode.collectionAssetLink'),
    isImage: Ember['default'].computed.equal('ubernodeType','image'),

    onInit: function() {
      // Selects which alias to use. Eliminates 'storyCard'
      // 'content' for ubernodes, 'content.node' for uberCards
      if (this.get('content.constructor.typeKey') === 'ubernode') {
        Ember['default'].defineProperty(this, 'ubernode', Ember['default'].computed.alias('content'));
      } else {
        Ember['default'].defineProperty(this, 'ubernode', Ember['default'].computed.alias('content.node'));
      }

      this.get('ubernode');
      this.get('nodeImage');
      this.get('nodePrimary');
      this.get('nodeSecondary');

    }.on('init'),

    cardFeedLink: function() {
      // if not a collection asset, always use the node path
      if (this.get('ubernodeType') !== 'collection_asset') {
        return this.get('nodeUri');
      }
      // if it is a collection asset, check if it's a link or attachment and link to that instead
      if (this.get('linkOrAttachment') === 'attachment') {
        return this.get('attachments.path');
      } else if (this.get('linkOrAttachment') === 'link') {
        return this.get('collectionAssetLink.url');
      }
      return false;
    }.property('ubernodeType', 'linkOrAttachment', 'attachments.path', 'collectionAssetLink.url'),

    nodeId: function() {
      //Added for debugging similar nodes on card feeds.
      return 'nodeid-' + this.get('ubernode.id');
    }.property('ubernode.id'),

    loadImage: function() {
      var self = this;
      if (!this.get('isLoaded') && this.get('imageCrop')) {
        var image = new Image();
        image.src = this.get('imageCrop');
        image.onload = function() {
          self.set('isLoaded', true);
        };
      }
    }.observes('imageCrop', 'isLoaded'),

    imageCrop: function() {
      if (!this.get('nodeImage')) {
        return false;
      }

      var crop = 'crop' + this.get('cardSize');
      if (this.get('isHumongo')) {
        crop = 'cropHumongo';
      }
      return this.get('nodeImage.' + crop);
    }.property('isHumongo', 'cardSize', 'nodeImage'),

    tag: function() {
      var feedTags = this.get('feedTags'),
          primaryTag = this.get('nodePrimary'),
          allTerms = [];

      if (Ember['default'].isArray(feedTags)) {
        feedTags.forEach(function(feed) {
          allTerms = allTerms.concat(feed.get('tags'));
        });

        if (allTerms.indexOf(primaryTag.get('id')) > -1) {
          if (this.get('nodeSecondary.id')) {
            return this.get('nodeSecondary');
          }
          return false;
        }
      }

      if (primaryTag.get('id')) {
        return primaryTag;
      }

      return false;
    }.property('nodePrimary', 'nodeSecondary', 'feedTags'),

    didInsertElement: function() {
      if (!this.get('isHumongo')) {
        this._super();
      }

      Ember['default'].run.scheduleOnce('afterRender', this, function () {
        // @TODO: I don't like this, but it works until we create a render mixin.
        this.loadImage();
      });
    },

    willDestroyElement: function() {
      if (!this.get('isHumongo')) {
          this._super();
      }
    },

  });

});
define('nasa/components/video-description', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var $ = Ember['default'].$;

    var VideoDescriptionComponent = Ember['default'].Component.extend({
        classNames: ['video', 'description'],
        classNameBindings: ['isOpen:opened:closed'],
        layoutName: 'gallery/components/video-description',
        isOpen: false,
        videoId: Ember['default'].computed.alias('video.id'),
        title: Ember['default'].computed.alias('video.title'),
        description: Ember['default'].computed.alias('video.description'),
        download: function(){
          var videoFile = '/sites/default/files/downloadable/video/'+this.get('videoId')+'.json';
          return Ember['default'].$.getJSON(videoFile);
        }.property('videoId'),

        setDownloadLink: function(){
          var element = $('#'+this.elementId);
          var download = this.get('download');
          if(download){
            download.then(function(download){
              var link = $('<a href="http://'+download+'">Download this video</a>');
              $('.download-link', element).html(link);
            });
          }
          else{
            $('.download-link', element).html('');
          }
        },

        didInsertElement: function() {
          this.setDownloadLink();
        },

        refreshDownloadLink: function(){
          this.setDownloadLink();
        }.observes('videoId'),

        hideGalleryTabs: function(){
          var display = this.get('isOpen') ? 'none' : 'block';
          $('.gallery-tabs').css('display',display);
        }.observes('isOpen'),

        actions: {
            toggleOpen: function(){
                this.toggleProperty('isOpen');
            }
        },
    });

    exports['default'] = VideoDescriptionComponent;

});
define('nasa/components/youtube-player', ['exports', 'ember-youtube/components/ember-youtube'], function (exports, EmberYoutube) {

  'use strict';

  exports['default'] = EmberYoutube['default'].extend({
    layoutName:'youtube-player',

    didInsertElement: function(){
      if (typeof yt != "undefined"){
        this.createPlayer();
      }
    },

    willDestroyElement: function(){
      this.stopTimer();
      this.get('player').destroy();
    },

    playerVars: {
      autoplay: 0,
      controls: 1,
      enablejsapi: 1,
      rel: 0,
      showinfo: 1,
      autohide: 1
    },

    createPlayer: function() {
      var _this = this;
      var playerVars = this.get('playerVars');
      var $iframe = this.$('#NASAplayer');

      var player = new YT.Player($iframe[0], {
        width: 640,
        height: 360,
        playerVars: playerVars,
        events: {
          'onReady': _this.onPlayerReady.bind(_this),
          'onStateChange': _this.onPlayerStateChange.bind(_this),
          'onError': _this.onPlayerError.bind(_this)
        }
      });

      this.set('player', player);
    },

    loadVideo: function() {
      var id = this.get('ytid'),
      load = (window.innerWidth || document.body.clientWidth) > 600 ? 'loadVideoById' : 'cueVideoById';
      if (!id) { return; }
      this.get('player')[load](id);
    }.observes('ytid')


  });

});
define('nasa/components/yt-card', ['exports', 'ember', 'nasa/mixins/embedded-card'], function (exports, Ember, EmbeddedCard) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(EmbeddedCard['default'], {
    layoutName: "components/yt-card",
    isLoaded: false,

    image: Ember['default'].computed.alias('content.image'),
    playlistId: Ember['default'].computed.alias('parentView.parentView.ytPlaylistId'),

    loadImage: function() {
      var self = this,
          imageEl = new Image();

      imageEl.src = this.get('image');
      imageEl.onload = function() {
        self.set('isLoaded', true);
      };
    }.on('didInsertElement'),

    style: function() {
      if (this.get('isLoaded')) {
        return "background-image:url('" + this.get("image") + "')";
      }
      return false;
    }.property('isLoaded', 'image'),

    actions: {
      goToVideo: function(id,title){
        var title = this.container.lookup('controller:landing-page').get('model.title');
        this.container.lookup('router:main').transitionTo('video',id,title)
      }
    }
  });

});
define('nasa/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    needs: ['landing-page','article'],
    hasSideRail: true,

    contentHeight: function(){
      return 'min-height:'+this.get('browserSizeService.pageHeightPixel')+'px';
    }.property('browserSizeService.pageHeightPixel'),

  });

});
define('nasa/controllers/article', ['exports', 'ember', 'nasa/mixins/tabable'], function (exports, Ember, Tabable) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend(Tabable['default'], InfiniteScroll.ControllerMixin, {
    // @TODO i'm pretty sure these uniq are tmp fix to a larger problem
    isCollectionAsset: Ember['default'].computed.equal('ubernodeType','collection_asset'),
    showRelated: function(){
      if (this.get('noRelated')) return false;
      return true
    }.property('noRelated','zeroRelated'),
    selectedRelated: false,
    relatedUnfiltered: Ember['default'].computed.uniq('relatedFeed.content'),
    latestClean: Ember['default'].computed.uniq('latestFeed.content'),
    loadingMore: Ember['default'].computed.alias('relatedFeed.isLoading'),
    hasMoreRelated: Ember['default'].computed.alias('relatedFeed.hasMore'),
    hasMoreLatest: Ember['default'].computed.alias('latestFeed.hasMore'),
    noRelated: Ember['default'].computed.alias('relatedFeed.noRelated'),
    hasRelated: Ember['default'].computed.gt('relatedFeed.total_rows',0),
    zeroRelated: Ember['default'].computed.not('hasRelated'),
    hideRelated: Ember['default'].computed('noRelated','zeroRelated','loadingMore', function(){
      if (this.get('noRelated')) return true
      return this.get('zeroRelated') && !this.get('loadingMore')
    }),
    revCronSortBy: ['promoDateTime:desc','id:desc'],


    relatedUnsorted: Ember['default'].computed.filter('relatedUnfiltered', function(item){
      return item.get('ubernodeType') != 'collection_asset' && item.get('id') != this.get('id');
    }),
    related: Ember['default'].computed.sort('relatedUnsorted','revCronSortBy'),

    latestUnsorted: Ember['default'].computed.filter('latestClean',function(item){
      return item.get('ubernodeType') != 'collection_asset' && item.get('id') != this.get('id');
    }),
    latest: Ember['default'].computed.sort('latestUnsorted','revCronSortBy'),

    actions: {
      showRelated: function(bool){
        this.set('showRelated',bool)
      },
      getMore: function(){
        if (this.get('hasMoreRelated')){
          this.relatedFeed.getMore();
        }
      },
      getMoreLatest: function(){
        this.latestFeed.getMore();
      },
      setSelectedRelated: function(id) {
        this.set('selectedRelated', id);
      }
     }
  });

});
define('nasa/controllers/footer', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    needs: ['application'],
    hasSideRail: Ember['default'].computed.alias('controllers.application.hasSideRail'),
  });

});
define('nasa/controllers/fullcalendar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend({
    calendarEvents: Ember['default'].A(),
    calendarEventsUniq: Ember['default'].computed.uniq('calendarEvents'),
    isLoading: true, // Signals when events are being loaded
    currentDate: window.moment(), // Current date of the calendar

    // What date to start loading events
    start: Ember['default'].computed('currentDate', function(){
      var start = window.moment(this.get('currentDate'));
      start.month(start.month()-1);
      return start;
    }),
    // What date to end loading events
    end: Ember['default'].computed('currentDate', function(){
      var end = window.moment(this.get('currentDate'));
      end.month(end.month()+1);
      return end;
    }),

    onInit: function() {
      this.loadCalendar();
    }.on('init'),

    loadCalendar: function() {
      var start = this.get('start'),
          end = this.get('end');

      this.set('isLoading', true);

      var queries = [];
      for(var i = 0; i < this.model._attributes.calendarName.length; i++){
        queries.push(this.model._attributes.calendarName[i].tid);
      }

      var query = {
        'timeRange': (start && end) ? start.format('YYYYMMDDHHmm')+'--'+end.format('YYYYMMDDHHmm') : 'all',
        'calendars': (queries.length > 0) ? queries.join('+') : 'all'
      };

      var self = this;
      this.store.find( 'calendar-event', query ).then(function(events){
        var length = events.get('length');
        events.forEach(function(value, index){
          // Reload to get all of the event date
          value.reload().then(function(ev){
            self.get('calendarEvents').pushObject(ev);

            if(index+1 == length){
              self.set('isLoading', false);
            }
          },
          function(){
            self.set('isLoading', false);
          });
        });
        if(!length){
          self.set('isLoading', false);
        }
      },
      function(){
        self.set('isLoading', false);
      });
    }.observes('currentDate')
  });

});
define('nasa/controllers/image', ['exports', 'ember', 'nasa/mixins/gallery-controller-mixin'], function (exports, Ember, GalleryControllerMixin) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend(GalleryControllerMixin['default'], {});

});
define('nasa/controllers/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
	});

});
define('nasa/controllers/landing-page', ['exports', 'ember', 'nasa/mixins/tabable', 'nasa/utils/flatten-array', 'nasa/utils/get-query', 'nasa/utils/sparse-array'], function (exports, Ember, Tabable, FlattenArray, getQueryVariable, SparseArray) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend(Tabable['default'], {
    needs: ['application'],
    page: 0,
    haveStrippedCards: false,
    currentlyFetchingPage: false,
    isLoading: Ember['default'].computed.or('currentlyFetchingPage','youtubeService.isLoading'),
    doneLoading: Ember['default'].computed.not('isLoading'),
    canLoadMore: false,
    feedCanLoadMore: false,  // @TODO this is only here due to image feed
    loadingImages: false,  // @TODO this is only here due to image feed
    classNames: ["card_feed"],
    cards: Ember['default'].A(),
    nodes: Ember['default'].A(),
    snippets: Ember['default'].A(),
    twitterDynamic: Ember['default'].A(),
    bottomPattern: ['1x1', '2x1', '1x1', '1x1', '1x1', '2x1', '1x1', '1x1', '1x1', '1x1', '2x1', '2x1'],
    pinnedCards: Ember['default'].A(),
    videoCards: Ember['default'].computed.alias('youtubeService.videos'),
    banner: Ember['default'].computed.alias('cardPageBannerImg.bannerImage.cropBanner'),
    browserSize: Ember['default'].computed.alias('browserSizeService.pageWidth'),

    listings: Ember['default'].A(), // Config data from Listing Feed pane
    listingNodesUnsorted: Ember['default'].A(),
    listingNodesUniq: Ember['default'].computed.uniq('listingNodesUnsorted'),
    listingNodes: Ember['default'].computed.sort('listingNodesUniq', 'revCronSortBy'),
    listingBatchSize: 10,

    // @TODO FlattenArray is creating duplicate nodes. We suspect this is due to
    // the feeds array on the model causing multiple reloads of the flatten array
    // once a feed is added it causes a complete rebuild. yet i think the bindings
    // continue to live and therefor when an item is added it is added more
    // than once
    feedNodes: FlattenArray['default']('feeds', 'nodes'),
    //revCronUnsorted: Ember.computed.union('revCronUniq', 'videoCards'),
    revCronSortBy: ['promoDateTime:desc','id:desc'],
    revCronUnion: Ember['default'].computed.union('feedNodes', 'videoCards'),
    revCronUniq: Ember['default'].computed.uniq('revCronUnion'),
    // @TODO: this contains two promise arrays but it should not.
    // fix around line 132: item.get('constructor.typeKey')
    revCronCards: Ember['default'].computed.sort('revCronUniq', 'revCronSortBy'),
    images: Ember['default'].computed.filterBy('revCronCards','ubernodeType','image'),
    videos: Ember['default'].computed.sort('videoCards', 'revCronSortBy'),

    isCardFeedLandingPage: Ember['default'].computed.equal('cardPageType', '0'),
    isStaticLandingPage: Ember['default'].computed.equal('cardPageType', '1'),
    isImageGallery: Ember['default'].computed.equal('cardPageType', '2'),
    isVideoGallery: Ember['default'].computed.equal('cardPageType', '3'),
    isListingPage: Ember['default'].computed.equal('cardPageType', '4'),
    isGallery: Ember['default'].computed.or('isImageGallery', 'isVideoGallery'),
    hasSocialSidebar: Ember['default'].computed.or('govdeliveryId', 'addthisProfileId'),

    tagsUnsorted: Ember['default'].computed.union('missions','topics','collections','other_tags'),
    tagsFiltered: Ember['default'].computed.filterBy('tagsUnsorted', 'displayTagOnUbernode', true),
    tagsSortBy: ['name'],
    tags: Ember['default'].computed.sort('tagsFiltered', 'tagsSortBy'),

    hasSideRail: Ember['default'].computed.or('hasSocialSidebar', 'sideNavMenu.content', 'cardpageLinks.length', 'tags.length'),
    cardsLength: Ember['default'].computed.alias('allCards.length'),
    imagesLength: Ember['default'].computed.alias('images.length'),
    hasCards: Ember['default'].computed.gt('cardsLength',0),
    hasImages: Ember['default'].computed.gt('imagesLength',0),
    imagesReady: Ember['default'].computed.and('hasImages','doneLoading'),
    contentReady: Ember['default'].computed.and('hasCards','doneLoading'),
    hasContent: Ember['default'].computed('imagesReady', 'contentReady', function(){
      return Ember['default'].run.debounce(this, this.returnReadyState, 100);
    }),
    showGallerySpinner: Ember['default'].computed('loadingImages','isLoading', function(){
      if (this.get('isImageGallery')) return this.get('loadingImages') && this.get('isGallery');
      if (this.get('isVideoGallery')) return this.get('isLoading') && this.get('isGallery')
    }),
    showSpinner: Ember['default'].computed.and('hasContent','showGallerySpinner'),
    showVideoLoadMore: Ember['default'].computed.and('youtubeService.canLoadMore','doneLoading'),

    onInit: function() {
      this.get('allCards');
      this.get('hasSideRail');
      this.get('numCardsDesired');
    }.on('init'),

    setHasSideRail: function() {
      this.set('controllers.application.hasSideRail', this.get('hasSideRail'));
    }.observes('hasSideRail'),

    returnReadyState: function(){
      if (this.get('isImageGallery')) return this.get('imagesReady');
      return this.get('contentReady');
    },

    // @TODO this and banner should be refactored into a component
    bannerStyle: function() {
      if (this.get('banner')) {
        return "background-image:url('" + this.get("banner") + "')";
      }
      return false;
    }.property('banner'),

    allCards: Ember['default'].arrayComputed('revCronCards', 'videoCards', 'pinnedCards', {
      initialize: function(array, changeMeta, instanceMeta) {
        instanceMeta.feed = Ember['default'].A();
        instanceMeta.pinned = Ember['default'].A();
        instanceMeta.pinnedUbernodes = Ember['default'].A();
        return array;
      },

      addedItem: function(array, item, changeMeta, instanceMeta) {
        var type = item.get('constructor.typeKey'),
            cards = this.get('cards');

        if (type === 'ubernode' || type === 'ytCard') {
          if (!instanceMeta.feed.isAny('id', item.get('id'))) {
            instanceMeta.feed = Ember['default'].copy(this.get('revCronCards'));
          }
        }
        else if (type !== undefined) { // type not undefined
          if (type === 'uberCard') {
            instanceMeta.pinnedUbernodes.push(Number(item.get('node.id')));
          }

          var position = (item.get('position') - 1);
          while (array.length <= position) {
            array.pushObject(Ember['default'].Object.create({}));
          }

          while (instanceMeta.pinned.length < position) {
            instanceMeta.pinned.pushObject(false);
          }

          if (instanceMeta.pinned.objectAt(position) !== undefined) {
            instanceMeta.pinned.removeAt(position).insertAt(position, true);
          }
          else {
            instanceMeta.pinned.push(true);
          }

          array.removeAt(position);
          array.insertAt(position, item);

          // If the position is past the current page don't insert yet
          if (position <= cards.length -1) {
            cards.objectAt(position).set('card', item);
          }
        }

        var feedIndex = 0;

        // if we add a card we need to re-add feed cards to the array
        // in case the order changed.
        instanceMeta.feed.forEach(function(item, i) {
          // If ubernode is also Pinned card, disregard and move on.
          if (instanceMeta.pinnedUbernodes.indexOf(Number(item.get('id'))) !== -1) {
            return;
          }

          while (instanceMeta.pinned.objectAt(feedIndex) === true) {
            feedIndex++;
          }
          if (item.get('constructor.typeKey') === undefined) {
            return false;
          }

          if (feedIndex < array.length - 1) {
            array.removeAt(feedIndex);
            array.insertAt(feedIndex, item);
          }
          else if (feedIndex == array.length - 1) {
            array.removeAt(feedIndex);
            array.insertAt(feedIndex, item);
          }
          else {
            array.push(item);
          }

          //If out of current page.
          if (feedIndex > cards.length - 1) {
            feedIndex++;
            return false;
          }
          cards.objectAt(feedIndex).set('card', item);
          feedIndex++;
        });
        return array;
      },

      removedItem: function(array, item, changeMeta, instanceMeta) {
        var type = item.get('constructor.typeKey');
        if (type === 'ubernode' || type === 'ytCard') {
          instanceMeta.feed.removeObject(item);
        }
        array.removeObject(item);
        return array;
      },
    }),

    setCards: function() {
      var offset = this.get('topPattern').length - 1,
          length = this.get('bottomPattern').length,
          page = this.get('page'),
          cards = this.get('cards'),
          allCards = this.get('allCards'),
          max = allCards.length - 1,
          // Add one below to start after the last card
          start = offset + (length * (page - 1)) + 1,
          end = start + length - 1; // remove 1 here due to previous comment

      // If we're on the first page, return.
      if (!page) return;
      // if we have stripped cards we need to handle this a seporate way
      if (this.get('haveStrippedCards')) return;

      if (end > max) {
        end = max;
        this.removeLastCards();
      }

      for(var i=start; i<= end; i++) {
        var object = allCards.objectAt(i);

        if (object) {
          cards.objectAt(i).set('card', object);
        }
      }
    }.observes('page'),

    // For listing pages
    //getListingNodes: function() {
    //  var self=this;
    //  this.get('listings').forEach(function(listing, index){
    //    if(index == 0){
    //      self.set('listingBatchSize', listing.get('batchSize'));
    //    }

    //    // API service query parameters
    //    var params = {
    //      missions: listing.get('missions'),
    //      topics: listing.get('topics'),
    //      collections: listing.get('collections'),
    //      other_tags: listing.get('other_tags'),
    //      //pageSize: 0, // No limit, pagination handled in ember
    //      routes: listing.get('routes'),
    //      unType: listing.get('unType')
    //    };

    //    //var sparse = SparseArray.create({
    //    //  load: function(offset, limit) {
    //    //    var finalParams = Ember.merge({offset, limit}, params);
    //    //    console.log(finalParams);
    //    //    return self.store.find('ubernode', finalParams);
    //    //    //return new Ember.RSVP.Promise(function(resolve) {});
    //    //  },
    //    //});

    //    //self.store.find('ubernode', params).then(function(ubernodes){
    //    //  var nodes = ubernodes.get('content');
    //    //  nodes.forEach(function(node) {
    //    //    node.reload();
    //    //  });
    //    //  self.get('listingNodesUnsorted').pushObjects(nodes);
    //    //});
    //  });
    //}.observes('listings.@each'),

    scheduleCanLoadMore: function() {
      Ember['default'].run.once(this, this.setCanLoadMore);
    }.observes('allCards.[]', 'cards.[]'),

    setCanLoadMore: function() {
      var numCards = this.get('cards.length'),
          allCards = this.get('allCards.length'),
          feedCanLoadMore = this.get('feedCanLoadMore'),
          canLoadYT = this.get('youtubeService.canLoadMore');
      if (this.get('isVideoGallery')){
        this.set('canLoadMore', canLoadYT);
      }
      else if (this.get('isImageGallery')){
        this.set('canLoadMore', feedCanLoadMore);
      }
      else {
        this.set('canLoadMore', this.get('youtubeService.canLoadMore' )  || allCards > numCards);
      }
    }.observes('youtubeService.canLoadMore'),

    // Does not account for strpipped cards
    totalCardsForAllPages: function() {
      var length = this.get('topPattern.length'),
          bottomPattern = this.get('bottomPattern.length'),
          page = this.get('page');

      return length + (bottomPattern * page);
    }.property('page', 'topPattern.[]'),

    numCardsDesired: function() {
      // If topPattern isn't known default to 11
      if (this.get('isImageGallery')) return (this.get('page')+1)*24;
      var topPattern = this.get('topPattern') ? this.get('topPattern.length') : 11,
          bottomPattern = this.get('bottomPattern.length') * (this.get('page') + 1);
      if (this.get('topPattern') === undefined) return topPattern + bottomPattern;

      // @TODO after the return above this line doesn't seem to run
      return (topPattern + bottomPattern) - this.get('pinnedCards.length');
    }.property('pinnedCards.[]', 'topPattern.[]', 'page'),

    setSpinnerCards: function() {
      var showing = this.get('totalCardsForAllPages'),
          topPattern = this.get('topPattern.length'),
          cards = this.get('cards'),
          length = cards.length,
          needed = showing - length;

      while (needed) {
        cards.pushObject(Ember['default'].Object.create({
          cardFeedSize: this.sizeForPosition(length),
          preLoad: (showing <= topPattern),
        }));

        length++; // increment length to be the new position
        needed--;
      }
      this.resizeCards();
    }.observes('totalCardsForAllPages'),

    sizeForPosition: function(position) {
      var topPattern = this.get('topPattern'),
          bottomPattern = this.get('bottomPattern'),
          offset = this.get('offset');

      if (position < topPattern.length) {
        return topPattern[position];
      }
      else {
        var position2 = position - topPattern.length;
        var bottomPages = Math.floor(position2/bottomPattern.length);
        position2 -= bottomPages * bottomPattern.length;

        return bottomPattern[position2];
      }
    },

    resizeCards: function() {
      var self = this,
          size = this.get('browserSize');

      if (!Ember['default'].isEmpty(this.get('cards'))) {
        this.get('cards').forEach(function(item, position, e) {
          if (Ember['default'].isEmpty(item.get('positionSize'))) {
            item.set('positionSize', self.sizeForPosition(position));
          }

          if (size == 'medium') {
            if (!position && item.get('positionSize').charAt(0) == 4) {
              item.set('cardFeedSize', '2x1');
            }
            else if (!position && item.get('positionSize').charAt(0) > 1) {
              item.set('cardFeedSize', '2x1');
            }
            else {
              item.set('cardFeedSize', '1x1');
            }
          }
          else if (size === 'small') {
            if (!position && item.get('positionSize').charAt(0) == 4) {
              item.set('cardFeedSize', '2x2');
            }
            else {
              item.set('cardFeedSize', '1x1');
            }
          }
          else if (size === 'xsmall') {
            item.set('cardFeedSize', '1x1');
          }
          else {
            item.set('cardFeedSize', self.sizeForPosition(position));
          }
        });
      }
    }.observes('browserSize'),

    rebuildStrippedCards: function() {
      var haveStrippedCards = this.get('haveStrippedCards'),
          canLoadMore = this.get('canLoadMore');

      if (haveStrippedCards && canLoadMore) {
        this.set('haveStrippedCards', false);
        this.setSpinnerCards();
      }
    }.observes('haveStrippedCards', 'canLoadMore'),

    removeLastCards: function() {
      Ember['default'].run.scheduleOnce('afterRender', this, function() {
        if (this.get('canLoadMore')) return;
        this.set('haveStrippedCards', true);

        var allCards = this.get('allCards.length'),
            cards = this.get('cards');

        for (var i = cards.length - allCards; i > 0; i--) {
          cards.removeAt(cards.length - 1);
        }
        $('.isotope-container').isotope('layout');
      });
    },

    checkHash: function(){
      if (!this.get('isLoading') && this.get('hasImages')){
        var id = getQueryVariable['default']('id');
        if (id && !isNaN(id) && this.get('isImageGallery')){
          this.transitionToRoute('image', id, this.get('model.title'));
        }
      }
    }.observes('isLoading','hasImages'),

    actions: {
      refresh: function(){
        this.removeLastCards();
        this.setCanLoadMore();
      }
    }
  });

});
define('nasa/controllers/launchschedule', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend({
    calendarEventsUnsorted: Ember['default'].A(),
    cronSortBy: ['start:asc'],
    calendarEvents: Ember['default'].computed.sort('calendarEventsUnsorted', 'cronSortBy'),
    start: new Date(),
    end: Ember['default'].computed('start', function(){
      var start = this.get('start'),
          end = new Date(start);
      end.setYear(start.getFullYear()+10);
      return end;
    }),

    isLoading: true, // Lets loading spinner know of loader is still working

    onInit: function(){
      this.loadCalendar();
    }.on('init'),

    loadCalendar: function() {
      var start = this.get('start'),
          end = this.get('end'),
          strStart = window.moment(start).format('YYYYMMDDHHmm'),
          strEnd = window.moment(end).format('YYYYMMDDHHmm');

      var queries = [];
      for(var i = 0; i < this.model._attributes.calendarName.length; i++){
        queries.push(this.model._attributes.calendarName[i].tid);
      }

      var query = {
        'timeRange': (strStart && strEnd) ? strStart+'--'+strEnd : 'all',
        'calendars': (queries.length > 0) ? queries.join('+') : 'all'
      };

      var self = this;
      this.store.find( 'calendar-event', query ).then(function(events){
        var length = events.get('content.length');
        events.forEach(function(value, index){
          var isLast = index+1 == length; // If this event is the last in the last, need to turn off isLoading
          value.reload().then(function(ev){
            var links = ev.get('additionalLink1');
            var eventDates = ev.get('eventDate');
            if(!eventDates){
              if(isLast){
                self.finishLoading();
              }
              return;
            }
            eventDates.forEach(function(date){
              self.get('calendarEventsUnsorted').pushObject({
                'content': ev,
                'start': window.moment.utc(date.value).tz('America/New_York').format(),
                'end': window.moment.utc(date.value2).tz('America/New_York').format(),
                'mainLink': ((links && links.length > 0) ? links[0].url : null)
              });
            });
            if (isLast){
              self.finishLoading();
            }
          },
          // If loading fails
          function(){
            self.finishLoading();
          });
        });
        if(!length){
          self.finishLoading();
        }
      });
    },

    finishLoading: function() {
      this.set('isLoading', false);
    }
  });

});
define('nasa/controllers/navbar', ['exports', 'ember', 'nasa/mixins/tabable'], function (exports, Ember, Tabable) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend(Tabable['default'], {
    navmenu: Ember['default'].A(),
    submenu: Ember['default'].A(),

    onInit: function(){
      this.navmenu = this.store.find('menu', 'main-menu');
    }.on('init'),

    showTopicsMenu: function() {
      return Ember['default'].$('body.show-topics-menu').length ? true : false;
    }.property(),

    meatballLocation: function() {
      var url = "/";

      if (window.location.pathname.indexOf('/beta/') != -1) {
        url += "beta/";
      }

      return url;
    }.property(),
  });

});
define('nasa/controllers/panelpage', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend({
    isLoading: false,
  });

});
define('nasa/controllers/tvschedule', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend({
    tvSchedule: null,
    title: 'TV Schedule',
    calendar_ids: [],
    calendar_channels: [],

    init: function(){
      this.set('title', this.get('model.title'));
      this.set('calendar_channels', this.get('model.calendarName'));
      this.calendar_ids = [];

      this.calendar_channels.sort(function(a,b){
        if(a.tid > b.tid) {
          return 1;
        }
        if(a.tid < b.tid) {
          return -1;
        }
        return 0;
      });

      for( var i = 0; i < this.calendar_channels.length; i++){
        this.calendar_ids[i] = this.calendar_channels[i].tid;
      }
    },
    loadSchedule: function(start, end) {
      var strStart = window.moment(start).format('YYYYMMDDHHmm');
      var strEnd = window.moment(end).format('YYYYMMDDHHmm');

      var query = {
        'timeRange': strStart+'--'+strEnd,
        'calendars': this.calendar_ids.join('+')
      };

      var self = this;
      var items = this.store.find( 'calendar-event', query ).then(function(results){
        return results.get('content');
      }).then(function(content){
        var promises = content.map(function(item){
          return item.reload();
        });
        return Ember['default'].RSVP.all(promises);
      });
      this.set('tvSchedule', items);
    }
  });

});
define('nasa/controllers/upcomingevents', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].ObjectController.extend({
    calendarEventsUnsorted: Ember['default'].A(),
    revCronSortBy: ['start','id:asc'],
    calendarEvents: Ember['default'].computed.sort('calendarEventsUnsorted', 'revCronSortBy'),
    dateFormats: Ember['default'].A(),
    start: new Date(),
    end: Ember['default'].computed('start', function(){
      var end = new Date(this.get('start'));
      end.setYear(this.get('start').getFullYear()+10);
      return end;
    }),

    isLoading: true, // Lets loading spinner know of loader is still working

    onInit: function() {
      this.loadCalendar();

      var self = this;
      this.store.find('term', {'vocab_names': ['date_format']}).then(function(results){
        var dataFormats = {};
        results.get('content').forEach(function(term, index){
          dataFormats[term.get('id')] = term;
        });
        self.set('dateFormats', dataFormats);
      });
    }.on('init'),

    loadCalendar: function() {
      var start = this.get('start,'),
          end = this.get('end'),
          strStart = window.moment(start).format('YYYYMMDDHHmm'),
          strEnd = window.moment(end).format('YYYYMMDDHHmm');

      var queries = [];
      for(var i = 0; i < this.model._attributes.calendarName.length; i++){
        queries.push(this.model._attributes.calendarName[i].tid);
      }

      var query = {
        'timeRange': (strStart && strEnd) ? strStart+'--'+strEnd : 'all',
        'calendars': (queries.length > 0) ? queries.join('+') : 'all',
        'repeating': false
      };

      var self = this;
      this.store.find( 'calendar-event', query ).then(function(events){
        var length = events.get('content.length');
        events.forEach(function(value, index){
          var isLast = index+1 == length; // If this event is the last in the last, need to turn off isLoading
          value.reload().then(function(ev){
            var eventDates = ev.get('eventDate');
            if(!eventDates){
              if(isLast){
                self.finishLoading();
              }
              return;
            }
            eventDates.forEach(function(date){
              self.get('calendarEventsUnsorted').pushObject({
                'content': ev,
                'start': new Date(date.value),
                'end': new Date(date.value2)
              });
            });
            if (isLast){
              self.finishLoading();
            }
          },
          // If loading fails
          function(){
            self.finishLoading();
          });
        });
        if(!length){
          self.finishLoading();
        }
      });
    },

    finishLoading: function() {
      this.set('isLoading', false);
    }
  });

});
define('nasa/controllers/video', ['exports', 'ember', 'nasa/mixins/gallery-controller-mixin'], function (exports, Ember, GalleryControllerMixin) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend(GalleryControllerMixin['default'], {});

});
define('nasa/helpers/ap-date', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.apDate = apDate;

  function apDate(input) {
    var date;

    // Default to empty string
    if (Ember['default'].isEmpty(input)) {
      return '';
    }

    window.moment.locale('en', {
      monthsShort : [
        "Jan.", "Feb.", "March", "April", "May", "June",
        "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
      ],
      meridiem : function (hour, minute, isLowercase) {
        if (hour < 12) {
          return "a.m.";
        }

        return "p.m.";
      }
    });

    if (Ember['default'].typeOf(input) === 'number') {
      input = input.toString();
    }

    switch (Ember['default'].typeOf(input)) {
      case 'string':
        // Make sure the string is long enough to be a unix timestamp.
        if (input.length < 9) {
          Ember['default'].warn("number/string given to ap-date must be unix timestamp");
          return '';
        }
        // Needs to be turned into moment object
        date = window.moment.unix(input);
        break;
      case 'date':
        // Needs to be turned into moment object
        date = window.moment(Date.parse(input));
        break;
      case 'object':
        // Already a moment object
        date = input;
        break;
    }

    return date.format("MMM D, YYYY");
  }

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(apDate);

});
define('nasa/helpers/dynamic-component', ['exports', 'ember', 'ember-dynamic-component'], function (exports, Ember, ember_dynamic_component) {

  'use strict';

  var isHTMLBars = !!Ember['default'].HTMLBars;

  function htmlbarsHelper(properties, hash, options, env) {
    Ember['default'].assert("You can only pass attributes (such as name=value) not bare " +
    "values to {{dynamic-component}} '", properties.length === 0);

    hash["_dynamicOptions"] = hash;

    return env.helpers.view.helperFunction.call(this, [ember_dynamic_component.DynamicComponentView], hash, options, env);
  }

  function handlebarsHelper(options) {
    Ember['default'].assert("You can only pass attributes (such as name=value) not bare " +
    "values to {{dynamic-component}} '", arguments.length < 2);

    // pass the options through to the resulting view
    // is there a valid type to use here?
    // this works but...
    options.hashTypes['_dynamicOptions'] = "OBJECT";
    options.hash['_dynamicOptions']      = options.hash;

    return Ember['default'].Handlebars.helpers.view.call(this, ember_dynamic_component.DynamicComponentView, options);
  }

  function makeHelper() {
    if (isHTMLBars) {
      return {
        isHTMLBars: true,
        helperFunction: htmlbarsHelper,
        preprocessArguments: function() { }
      };
    } else {
      return handlebarsHelper;
    }
  }

  exports['default'] = makeHelper();

});
define('nasa/helpers/html-safe', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.htmlSafe = htmlSafe;

  function htmlSafe(input) {
    if (input) return (input).htmlSafe();
    return "";
  }

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(htmlSafe);

});
define('nasa/helpers/moment-alt', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function(date) {
    if (date) {
      moment.locale('en', {
            monthsShort : [
                "Jan.", "Feb.", "March", "April", "May", "June",
                "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
            ],
            meridiem : function (hour, minute, isLowercase) {
              if (hour < 12) {
                  return "a.m.";
              } else {
                  return "p.m.";
              }
          }
      });
      var noMin ="MMM D, YYYY h a",
          format = "MMM D, YYYY h:mm a",
          m = moment(date),
          from = m.fromNow(),
          str = '';

      if (Number(m.minutes()) == 0) {
        format = noMin;
      }

      var actual = m.format(format);

      str = '<div class="timestamp" title="' + actual + '">' + from + '</div>';
      return new Ember['default'].Handlebars.SafeString(str);
    }
    return "";
  });

});
define('nasa/helpers/moment-time-ago', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function(date) {
    if (date) {
      return moment(date).fromNow();
    }
    return "";
  });

});
define('nasa/helpers/strip-tags', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function(str){
    if (Ember['default'].isNone(str)) return "";

    var div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
  });

});
define('nasa/helpers/truncate-sentence', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function(str,len) {
    if (Ember['default'].isNone(str)) {
      return "";
    }

    // In case we don't need to trim at all.
    if (str.length <= len) {
      return str.htmlSafe();
    }

    // Add a space after a period that is followed by a newline
    // so it will work with the following matching tool.
    str = str.replace(/\.\n/g, '. \n');
    // Change all non normal spaces to normal space.
    // Like char code 160 or others
    str = str.replace(/\s/g, ' ');

    while (str.length > len) {
      var lastStr = str.lastIndexOf(". ");
      str = str.substring(0, lastStr);
    }

    return (str + ". ").htmlSafe();
  });

});
define('nasa/helpers/truncate-text', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function(str,len){
    if (Ember['default'].isNone(str)) return "";
    if (str.length > len) {
      return str.substring(0, len - 3) + '...';
    } else {
      return str;
    }
  });

});
define('nasa/initializers/browser-size-service', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    application.inject('controller:application', 'browserSizeService', 'service:browser-size');
    application.inject('controller:landingPage', 'browserSizeService', 'service:browser-size');
    application.inject('controller:article', 'browserSizeService', 'service:browser-size');
    application.inject('component:tvPlayer', 'browserSizeService', 'service:browser-size');
    application.inject('component:tvSchedule', 'browserSizeService', 'service:browser-size');
    
    // We should be more deliberate as to what containers things get injected into
    // to avoid memory bloat.
    application.inject('view', 'browserSizeService', 'service:browser-size');
    application.inject('component', 'browserSizeService', 'service:browser-size');
    application.inject('route', 'browserSizeService', 'service:browser-size');
  }
   
  exports['default'] = {
    name: 'browser-size-service',
    initialize: initialize
  };

});
define('nasa/initializers/comment-count', ['exports', 'ember-disqus/initializers/comment-count'], function (exports, Initializer) {

	'use strict';

	exports['default'] = Initializer['default'];

});
define('nasa/initializers/disqus-manager-service', ['exports', 'nasa/services/disqus-manager'], function (exports, DisqusManager) {

    'use strict';

    exports['default'] = {
        name: 'Inject Disqus Manager',
        initialize: function(container, application) {
          application.register('service:disqus-manager', DisqusManager['default']);
          application.inject('route:article','disqus','service:disqus-manager')
          application.inject('component:ubernode-full','disqus','service:disqus-manager')
        }
    }

});
define('nasa/initializers/export-application-global', ['exports', 'ember', 'nasa/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('nasa/initializers/feed-service', ['exports', 'nasa/services/related-feed', 'nasa/services/latest-feed'], function (exports, RelatedFeedService, LatestFeedService) {

    'use strict';

    exports['default'] = {
        name: 'Inject Feed Service',
        initialize: function(container, application) {
          application.register('service:relatedFeed',RelatedFeedService['default']);
          application.register('service:latestFeed',LatestFeedService['default']);
          application.inject('route:article','relatedFeed','service:relatedFeed')
          application.inject('route:article','latestFeed','service:latestFeed')
          application.inject('view:articles/sidebar','relatedFeed','service:relatedFeed')
          application.inject('view:articles/sidebar','latestFeed','service:latestFeed')
          application.inject('controller:article','relatedFeed','service:relatedFeed')
          application.inject('controller:article','latestFeed','service:latestFeed')
        }
    }

});
define('nasa/initializers/heartbeat-service', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    name: 'heartbeat-service',
    initialize: function(container, app) {
      app.inject('component:counter-block', 'heartbeatService', 'service:heartbeat');
    }
  };

});
define('nasa/initializers/loaded-scripts-service', ['exports', 'nasa/services/loaded-scripts'], function (exports, LoadedScripts) {

    'use strict';

    exports['default'] = {
        name: 'Inject Loaded Script Tracking Service',
        initialize: function(container, application) {
          application.register('service:loadedScripts',LoadedScripts['default']);
          application.inject('route','scripts','service:loadedScripts');
        }
    };

});
define('nasa/initializers/page-visibility-service', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    name: 'page-visibility-service',
    initialize: function(container, application) {
      application.inject('controller', 'pageVisibilityService', 'service:page-visibility');
    }
  };

});
define('nasa/initializers/scroll-position-service', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    application.inject('view', 'scrollPositionService', 'service:scroll-position');
  }

  exports['default'] = {
    name: 'scroll-position-service',
    initialize: initialize
  };

});
define('nasa/initializers/store-service', ['exports'], function (exports) {

    'use strict';

    exports['default'] = {
        name: 'Inject Store',
        initialize: function(container, application) {
            application.inject('service:relatedFeed', 'store', 'store:main');
            application.inject('service:latestFeed', 'store', 'store:main');
            application.inject('service:youtubeService', 'store', 'store:main');
        }
    }

});
define('nasa/initializers/youtube-playlists-service', ['exports', 'nasa/services/youtube-playlists'], function (exports, YouTubeService) {

    'use strict';

    exports['default'] = {
        name: 'Inject Youtube Service',
        initialize: function(container, application) {
          application.register('service:youtubeService',YouTubeService['default']);
          application.inject('route','youtubeService','service:youtubeService')
          application.inject('controller','youtubeService','service:youtubeService')
        }
    }

});
define('nasa/mixins/add-this', ['exports', 'ember', 'nasa/mixins/lazy-loader'], function (exports, Ember, LazyLoader) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create(LazyLoader['default'],{
    afterModel: function(model){
      window.addthis_config = window.addthis_config || {};
      window.addthis_config['ui_508_compliant'] = true;
      window.addthis_config['pubid'] = 'addthisforshare';
      window.addthis_config['services_compact'] = 'facebook,twitter,google_plusone_share,pinterest_share,email,more';
      window.addthis_config['services_exclude'] = 'reddit,tumblr,linkedin,google,stumbleupon';
      window.addthis_share = window.addthis_share || {};
      window.addthis_share.url_transforms = {
        shorten: {
          twitter: 'bitly',
        }
      };
      window.addthis_share.shorteners = {
        bitly: {},
      };
      var self = this,
          scriptName = 'https://s7.addthis.com/js/300/addthis_widget.js#async=1';
      if (!this.scripts.loaded[scriptName]){
        Ember['default'].$.getScript(scriptName)
          .done(function(script, textStatus) {
            self.scripts.get('loaded')[scriptName] = true;
          });
      }
      return;
    }
  });

});
define('nasa/mixins/addthis-toolbox', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    loadAddThis: function(){
      Ember['default'].run.next(this, function () {
        if (typeof addthis == 'object' && addthis.toolbox.length) {
          addthis.toolbox('.addthis_toolbox');
        } 
      });
    }.on('didInsertElement'),

    refresh: function(){
      Ember['default'].run.scheduleOnce('afterRender',this,function(){
        addthis.toolbox('.addthis_toolbox');
      });
    }.observes('title','url')
  });

});
define('nasa/mixins/before-after-image', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].Mixin.create({
    didInsertElement: function() {
      if ($('.scald-before-after-image-wrapper').length) {
        Ember['default'].run.scheduleOnce('afterRender', this, function() {
          var promises = [];
          promises.push(new Ember['default'].RSVP.Promise(function(resolve, reject) {
            Ember['default'].$.getScript('/sites/all/libraries/beforeafter/js/jquery-ui-1.9.2.custom.min.js', function(data, textStatus, jqxhr){
              if(jqxhr.status == '200') {
                resolve();
              }
              else {
                reject();
              }
            });
          }));
          promises.push(new Ember['default'].RSVP.Promise(function(resolve, reject) {
            Ember['default'].$.getScript('/sites/all/libraries/beforeafter/js/jquery.beforeafter-1.4.min.js', function(data, textStatus, jqxhr){
              if(jqxhr.status == '200'){
                resolve();
              }
              else{
                reject();
              }
            });
          }));

          Ember['default'].RSVP.all(promises).then(function(results) {
            $('.scald-before-after-image-wrapper:not(.processed)').each(function() {
              $(this).beforeAfter({
                  imagePath: '/sites/all/libraries/beforeafter/js/',
                  beforeLinkText: 'Show only Left',
                  afterLinkText: 'Show only Right',
              }).addClass('processed');
            });
          });
        });
      }

      var self = this;
      $(window).on('resize', Ember['default'].run.bind(this, function(){
        self.onResize();
      }));
      this.onResize();
    },

    onResize: function() {
      var wrappers = $('.dnd-atom-wrapper.type-before_after_image', this.get('element'));
      if (wrappers.length) {
        var self = this;

        // Add a small delay, so that it occurs after page width is calculated
        setTimeout(function(){
          wrappers.each(function(index, wrapper){
            var width = $(wrapper).parent().width(), // Represents the page width
                obj = $('.scald-before-after-image-wrapper', wrapper),
                imgWidth = $('img.ba-image:first', obj).attr('width'),
                imgHeight = $('img.ba-image:first', obj).attr('height'),
                height = imgHeight,
                prevWidth = $('img.ba-image', obj).width();

            obj.css('z-index', 0);

            // To protect from divide-by-zero error, or if the image widget is smaller than the page width
            if(imgWidth == 0 || width >= imgWidth) {
              width = imgWidth;
              height = imgHeight;
            }
            else {
              height = width * (imgHeight / imgWidth);
            }

            // Wrapper for the widget
            obj.width(width);
            obj.height(height);

            // Change the sizes of the actual images
            $('img.ba-image', obj).width(width);
            $('img.ba-image', obj).height(height);

            // Change the left/right image ratio to be the same as before the resize
            var currentRatio = width * ($('.ba-image-wrap:first', obj).width() / prevWidth);
            $('.ba-image-wrap', obj).width(width);
            $('.ba-image-wrap:first', obj).width(currentRatio);
            $('.ba-image-wrap', obj).height(height);
            
            // Draggable handle adjustments
            if($('> .ui-draggable', obj).length){
              $('> .ui-draggable', obj).height(height);
              $('> .ui-draggable > div', obj).height(height);
              $('> .ui-draggable', obj).css('left', currentRatio);

              var dragTop = (height-$('> .ui-draggable img', obj).height()) * 0.5;
              $('> .ui-draggable img', obj).css('top', dragTop);
            }

            // Left and right arrows next to draggable handle
            if($('> img', obj).length){
              $('> img', obj).css('top', (height*0.5));
              $('> img', obj).each(function(){
                this.style.setProperty('top', ((height - $(this).height()) * 0.5)+'px', 'important');
              });
            }

            // Alter 'Show only Left' and 'Show only Right' links for new size
            if($('div.balinks', wrapper).length){
              var randID = $('div.balinks', wrapper).attr('id').replace('links', ''),
                  linkDisplaySpeed = 200;

              $('#showleft'+randID).off('click');
              $('#showleft'+randID).click(function(){
                $('div:eq(2)', obj).animate({width:width},linkDisplaySpeed);
                $('#dragwrapper'+randID).animate({left:width-$('#dragwrapper'+randID).width()+'px'},linkDisplaySpeed);
              });

              $('div.balinks', wrapper).width(width);
            }
          });
        }, 500);
      }
    },
  });

});
define('nasa/mixins/card-view-mixin', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Mixin.create({
        classNames: ['card', 'iso-card'],
        classNameBindings: ['setSize'],

        setSize: function() {
            var size = this.get('content.cardFeedSize');
            if (typeof size === 'undefined') {
                size = '1x1';
            }

            size = size.split('x');
            return "h-lg-"+size[1]+" col-lg-"+size[0]*3+" col-md-"+size[0]*3+" col-sm-"+size[0]*3+" col-xs-6";
        }.property()
    });

});
define('nasa/mixins/card', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    classNames: ['card'],
    classNameBindings: ['isLoaded::is-loading',  'cardType', 'size'],
    content: null,
    isLoaded: false,

    cardSize: Ember['default'].computed.alias('content.cardFeedSize'),
    cardType: Ember['default'].computed.alias('content.type'),

    size: function() {
      var size = this.get('cardSize');

      if (Ember['default'].isNone(size)) {
        size = '1x1';
      }
      size = size.split('x');
      return "h-lg-"+size[1]+" col-md-"+size[0]*3+" col-sm-"+size[0]*3*2+" col-xs-12";
    }.property('cardSize'),

    style: function() {
      if (this.get('isLoaded')) {
        return "background-image:url('" + this.get("imageCrop") + "')";
      }
      return false;
    }.property('isLoaded'),

    didInsertElement: function() {
      Ember['default'].run.scheduleOnce('afterRender', this, function () {
        if (this.$() && !this.$().hasClass('laid-out')) {
          this.$().parent().isotope('appended', this.$());
          this.$().addClass('laid-out');
        }
      });
    },

    willDestroyElement: function() {
      if (this.$().hasClass('laid-out')) {
        this.$().parent().isotope('remove', this.$());
      }
    },
  });

});
define('nasa/mixins/dom-properties', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    navbarHeight: 0,
    subnavHeight: 39,
    adminMenuHeight: 0,
    headerHeight: 0,
    unaffixPosition:0,
    hasFullBleed: false,
    isGallery: false,
    isArticle: false,
    isLoggedIn: function(){
      return $('body.logged-in').length > 0;
    }.property(),
    affixed: false,
    unAffixed: Ember['default'].computed.not('affixed'),
    browserSize: Ember['default'].computed.alias('browserSizeService.pageWidth'),
    overscrolled: Ember['default'].computed.lt('scrollPositionService.previousPosition',0),
    notOverScrolled: Ember['default'].computed.not('overscrolled'),
    scrollingUp: Ember['default'].computed('scrollPositionService.nextPosition','scrollPositionService.previousPosition',function(){
      return this.get('scrollPositionService.nextPosition') < this.get('scrollPositionService.previousPosition');
    }),
    scrollingDown: Ember['default'].computed('scrollPositionService.nextPosition','scrollPositionService.previousPosition',function(){
      return this.get('scrollPositionService.nextPosition') > this.get('scrollPositionService.previousPosition');
    }),
    scrolledPassedHeader: Ember['default'].computed('scrollPositionService.nextPosition','headerHeight',function(){
      return this.get('scrollPositionService.nextPosition') > this.get('headerHeight');
    }),
    scrolledToHeader: Ember['default'].computed.not('scrolledPassedHeader'),

    affixedNavHeight: Ember['default'].computed.collect('adminMenuHeight','navbarHeight','subnavHeight'),
    unAffixedSidebarCollect: Ember['default'].computed.collect('subnavPositionSum','headerHeight','subnavHeight'),
    affixedSidebarTabletCollect: Ember['default'].computed.collect('navbarHeight','subnavHeight'),
    subnavPositionTop: Ember['default'].computed.collect('adminMenuHeight','navbarHeight'),
    sidebarPositionTop: Ember['default'].computed.collect('subnavPositionSum','subnavHeight'),
    sidebarPositionTopMobile: Ember['default'].computed.collect('navbarHeight','subnavHeight'),
    loggedinNavHeight: Ember['default'].computed.collect('navbarHeight','adminMenuHeight'),
    tabletSidebarCollect: Ember['default'].computed.collect('navbarHeight','headerHeight','subnavHeight'),
    desktopSidebarCollect: Ember['default'].computed.collect('tabletSidebarSum','adminMenuHeight'),

    unAffixedSidebarSum: Ember['default'].computed.sum('unAffixedSidebarCollect'),
    affixedSidebarTabletSum: Ember['default'].computed.sum('affixedSidebarTabletCollect'),
    subnavPositionSum: Ember['default'].computed.sum('subnavPositionTop'),
    affixedNavHeightSum: Ember['default'].computed.sum('affixNavHeight'),
    subnavPositionTopSum: Ember['default'].computed.sum('subnavPositionTop'),
    sidebarPositionTopSum: Ember['default'].computed.sum('sidebarPositionTop'),
    sidebarPositionTopMobileSum: Ember['default'].computed.sum('sidebarPositionTopMobileSum'),
    loggedinNavHeightSum: Ember['default'].computed.sum('loggedinNavHeight'),
    tabletSidebarSum: Ember['default'].computed.sum('tabletSidebarCollect'),
    desktopSidebarSum: Ember['default'].computed.sum('desktopSidebarCollect'),

    sidebarOpen: Ember['default'].computed.or('landingPage.sidebarOpen','featurePage.sidebarOpen'),
    sidebarClosed: Ember['default'].computed.not('sidebarOpen'),
    navScrolledUp: Ember['default'].computed.and('notOverscrolled','scrolledPassedHeader','isMobile'),
    isMobile: Ember['default'].computed.alias('browserSizeService.isMobile'),
    notMobile: Ember['default'].computed.alias('browserSizeService.notMobile'),
    isTablet: Ember['default'].computed.alias('browserSizeService.isTablet'),
    isDesktop: Ember['default'].computed.alias('browserSizeService.isDesktop'),

    isLandingPage: Ember['default'].computed('isArticle','isGallery',function(){
      return !this.get('isArticle') && !this.get('isGallery');
    }),

    setDOMValues: function(){
      this.set('isLoggedIn',$('.logged-in').length > 0);
      this.set('navbarHeight',$('#navbar-nasa').height());
      this.set('subnavHeight',$('#topics.missions').height());
      this.set('headerHeight',$('.full-bleed').height());
      this.set('adminMenuHeight', this.get('isLoggedIn') ? 30 : 0);
      this.set('hasFullBleed',$('.full-bleed.no-image').length == 0);
      this.set('unAffixPosition', this.get('hasFullBleed') ? this.get('isTablet') ? 255 : 175 : 0);
      this.set('isArticle',$('.sidebar.articles').length > 0);
      this.set('isGallery',$('#gallery-list, .flexslider').length > 0);
    },

    adjustCurrentViewport: function(){
      this.adjustForMobile();
      this.adjustForTablet();
      this.adjustForDesktop();
    }
  });

});
define('nasa/mixins/embedded-card', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    classNames: ['embedded'],
    classNameBindings: ['isLoaded::is-loading', 'cardType', 'size'],
    content: null,
    isLoaded: false,

    cardType: Ember['default'].computed.alias('content.type'),

    style: function() {
      if (this.get('isLoaded')) {
        return "background-image:url('" + this.get("imageCrop") + "')";
      }
      return false;
    }.property('isLoaded'),
  });

});
define('nasa/mixins/gallery-controller-mixin', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    revCronSortBy: ['promoDateTime:desc','id:desc'],
    imagesUnsorted: Ember['default'].computed.filterBy('model','ubernodeType','image'),
    images: Ember['default'].computed.sort('imagesUnsorted','revCronSortBy'),
    activeIndex: function() {
      var id = this.get('activeID'),
          cursor = 0,
          model = this.get('images.length') > 0 ? 'images' : 'model';
      this.get(model).forEach(function(item, index) {
        var itemID = Ember['default'].isNone(item.get) ? item.video.id : item.get('id');
        if(itemID === id) {
          cursor = index;
        }
      });
      return cursor;
    }.property('model','activeID'),

    actions:{
      goBack: function(){
        var self = this;
        this.get('target').transitionTo('landingPage').then(function(){
          self.container.lookup('controller:landing-page').send('refresh');
          self.container.lookup('controller:landing-page').set('loadingImages',false)
        });
      }
    }

  });

});
define('nasa/mixins/gallery-item-view-mixin', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    classNames: ['gallery-card'],
    classNameBindings: ['isLoading'],
    attributeBindings: ['promoDate'],
    isLoading: true,

    promoDate: function(){
      return this.get('content.promoDateTime')['toString']();
    }.property('content.promoDateTime'),

    didInsertElement: function () {
      var self = this;
      this.$('img').one('load', function() {
        Ember['default'].run(function(){
          self.set('isLoading', false);
        });
      }.bind(this));
    }

  });

});
define('nasa/mixins/gallery-route-mixin', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    model: function(params) {
      this.set('activeID', params.id);
      this.set('title', params.title)
    },

    setupController: function(controller, model) {
      controller.set('model',model);
      controller.set('activeID', this.get('activeID'));
      controller.set('title',this.get('title'));
    },

    actions:{
      loading: function(){
        this.render('gallery/loading',{into:'application'})
      },
      goBack: function(){
        this.transitionTo('landingPage')
      }
    }
  })

});
define('nasa/mixins/gallery-view-mixin', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Mixin.create({
        elementId: "gallery-list"
    });

});
define('nasa/mixins/lazy-loader', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    loadScript: function(scriptName){
      var self = this;
      if (!this.scripts.get('loaded')[scriptName]) {
        return Ember['default'].$.getScript(scriptName);
      }
    }
  });

});
define('nasa/mixins/paginatable', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    model: function() {
      // These should either be moved or duplicated on the feed instances
      this.set('page', 0);
      this.set('pageSize', 24);
      this.set('feedCanLoadMore', true);
    },

    // Wrapper around fetchMore which needs to be implemented by the route.
    // Keeps track of whether we are currently fetching a page, and saves the position
    // returned by the server.
    fetchMoreProxy: function(controller) {
      var self = this;
      var page = self.get('page');
      var pageSize = self.get('pageSize');
      if (!controller.get('isLoading')) {
        controller.set('currentlyFetchingPage', true);
        this.set('feedCanLoadMore',false);
        controller.set('feedCanLoadMore',false);
        controller.set('loadingImages',true);
        this.youtubeService.loadMore();
        return this.fetchMore(page, pageSize, controller).then(function(nodes) {
          self.set('page', page + 1);
          controller.set('currentlyFetchingPage', false);
          // @TODO this is only here due to image feed
          return nodes;
        }, null, 'Turn off loadding spinner');
      }
    },

    actions: {
      loadNextPage: function() {
        //this.set('offset', this.get('offset') + 1);
        this.incrementProperty('offset');
        this.fetchMoreProxy(this.controller);
        this.controller.set('page', this.get('offset'));
      }
    }
  });

});
define('nasa/mixins/tabable', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].Mixin.create({
    /* SHARED BY ARTICLES AND MISSIONS */
    sidebarOpen: false,
    prevPosition: 0,
    height: Ember['default'].computed.alias('browserSizeService.pageHeightPixel'),
    browserSize: Ember['default'].computed.alias('browserSizeService.pageWidth'),

    mixinOnInit: function() {
      this.sidebarToggled();
    }.on('init'),

    windowHeight: function() {
      return 'height:'+ this.get('height') + 'px';
    }.property('height'),

    sidebarToggled: function(){
      var sidebarOpen = this.get('sidebarOpen'),
          browserSize = this.get('browserSize'),
          position = sidebarOpen ? 'fixed' : 'static',
          navPosition = sidebarOpen ? 'fixed' : 'absolute',
          display = sidebarOpen ? 'inline' : 'none';
      $('.sidebar + .tap-tab').css('display',display);
      if (browserSize == 'small' || browserSize == 'xsmall'){
        $('body').css('position',position);
        $('#navbar-nasa').css('position',navPosition);
        $('#topics.missions').show();
        $('.sidebar').css('top',$('#navbar-nasa').height()+$('#topics.missions').height())
        if (!sidebarOpen){
          window.scrollTo(0,this.get('prevPosition'));
        }
      }
      this.closeMenus();
    }.observes('sidebarOpen'),

    closeMenus: function(){
      // Close the main menu
      $('button.navbar-toggle').attr('aria-expanded', false);
      $('button.navbar-toggle').addClass('collapsed');
      $('#nasa-primary-navigation').attr('aria-expanded', false);
      $('#nasa-primary-navigation').removeClass('in');

      // Close the subnav menu
      $('#topics ul').removeClass('open');
    },

    actions: {
      toggleSidebar: function(){
        if (!this.get('sidebarOpen')){ this.set('prevPosition',$(window).scrollTop()); }
        this.toggleProperty('sidebarOpen');
      }
    }
  });

});
define('nasa/models/alert-card', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    type: DS['default'].attr('string'),
    uri: DS['default'].attr('string'),
    position: DS['default'].attr('number'),
  });

});
define('nasa/models/anyfeed-card', ['exports', 'ember-data', 'nasa/models/card'], function (exports, DS, Card) {

  'use strict';

  exports['default'] = Card['default'].extend({
    source: DS['default'].attr('string'),
    image: DS['default'].belongsTo('image', {async: true, inverse: 'anyfeedImages'}),
    nodes: DS['default'].hasMany('news', {async: true, inverse: 'anyfeedNodes'}),
  });

});
define('nasa/models/bannerimage', ['exports', 'ember-data', 'nasa/models/file'], function (exports, DS, File) {

  'use strict';

  exports['default'] = File['default'].extend({
    title: DS['default'].attr('string'),
    landingPage: DS['default'].belongsTo('landing-page', {inverse: 'cardPageBannerImg'}),
    bannerImage: DS['default'].belongsTo('image', {inverse: 'bannerImages'})
  });

});
define('nasa/models/calendar-card', ['exports', 'ember-data', 'nasa/models/card'], function (exports, DS, Card) {

  'use strict';

  exports['default'] = Card['default'].extend({
    calendarName: DS['default'].attr('array'),
    calendarLink: DS['default'].attr('array'),
  });

});
define('nasa/models/calendar-event', ['exports', 'ember-data', 'nasa/models/node'], function (exports, DS, Node) {

  'use strict';

  exports['default'] = Node['default'].extend({
    eventDate: DS['default'].attr('array'),
    dateFormat: DS['default'].attr('array'),
    isAllDay: DS['default'].attr('boolean'),

    calendarName: DS['default'].attr('array'),
    overlay: DS['default'].attr('array'),
    additionalLink1: DS['default'].attr('array'),

    subtitle: DS['default'].attr('string'),
    description: DS['default'].attr('string'),
    masterImage: DS['default'].belongsTo('image'),

    missions: DS['default'].attr('array'),
    topics: DS['default'].attr('array'),
    collections: DS['default'].attr('array'),
    other_tags: DS['default'].attr('array'),

    urlQuery: DS['default'].attr('string'),
  });

});
define('nasa/models/card', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    size: DS['default'].attr('string'),
    type: DS['default'].attr('string'),
    position: DS['default'].attr('number'),

  });

});
define('nasa/models/countdown-card', ['exports', 'ember-data', 'nasa/models/card'], function (exports, DS, Card) {

  'use strict';

  exports['default'] = Card['default'].extend({
    date: DS['default'].attr('date'),
    link: DS['default'].attr('string'),

    image: DS['default'].belongsTo('image', {async: true, inverse: 'countdownImages'}),
  });

});
define('nasa/models/embed_card', ['exports', 'ember-data', 'nasa/models/card'], function (exports, DS, Card) {

  'use strict';

  exports['default'] = Card['default'].extend({
    embedUrl: DS['default'].attr('string'),
    cardFeedSize: DS['default'].attr('string'),
  });

});
define('nasa/models/event-card', ['exports', 'ember-data', 'nasa/models/card'], function (exports, DS, Card) {

  'use strict';

  exports['default'] = Card['default'].extend({
    position: DS['default'].attr('number'),
    date: DS['default'].attr('date'),
    countdown: DS['default'].attr('boolean', {defaultValue: false}),

    calendar: DS['default'].belongsTo('link', {inverse: 'eventCalendarLink'}),
    launch: DS['default'].belongsTo('link', {inverse: 'eventLaunchLink'}),
    links: DS['default'].hasMany('link', {inverse: 'eventLinks'}),
  });

});
define('nasa/models/feed', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    landingPage: DS['default'].belongsTo('landing-page', {async: true, inverse: 'feeds'}),
    nodes: DS['default'].hasMany('ubernode', {async: true, inverse: 'feeds'}),
    page: DS['default'].attr('number'),
    pageSize: DS['default'].attr('number'),
    missions: DS['default'].attr('array'),
    topics: DS['default'].attr('array'),
    collections: DS['default'].attr('array'),
    other_tags: DS['default'].attr('array'),
    routes: DS['default'].attr('array'),
    unType: DS['default'].attr('array'),
    tags: Ember.computed.union('missions', 'topics', 'collections', 'other_tags'),
  });

});
define('nasa/models/file', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    uid: DS['default'].attr('string'),
    filename: DS['default'].attr('string'),
    uri: DS['default'].attr('string'),
    filemime: DS['default'].attr('string'),
    filesize: DS['default'].attr('number'),
    status: DS['default'].attr('number'),
    timestamp: DS['default'].attr('string'),
    uuid: DS['default'].attr('string'),
    nodeAttachments: DS['default'].hasMany('ubernode', { inverse: 'attachments'}),
    podcasts: DS['default'].hasMany('ubernode', { inverse: 'podcast'}),
    vodcasts: DS['default'].hasMany('ubernode', { inverse: 'vodcast'}),

    path: function() {
      var path = '/sites/default/files/',
          uri = this.get('uri'),
          cut = 'public://';

      return path + uri.slice(cut.length);
    }.property('uri'),
  });

});
define('nasa/models/fullcalendar', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    calendarName: DS['default'].attr('array'),

    missions: DS['default'].attr('array'),
    topics: DS['default'].attr('array'),
    collections: DS['default'].attr('array'),
    other_tags: DS['default'].attr('array'),
  });

});
define('nasa/models/image', ['exports', 'ember-data', 'nasa/models/file'], function (exports, DS, File) {

  'use strict';

  exports['default'] = File['default'].extend({
    title: DS['default'].attr('string'),
    alt: DS['default'].attr('string'),
    width: DS['default'].attr('number'),
    height: DS['default'].attr('number'),

    masterImages: DS['default'].hasMany('ubernode', {inverse: 'masterImage'}),
    snippetImages: DS['default'].hasMany('snippetCard', {inverse: 'image'}),
    countdownImages: DS['default'].hasMany('countdownCard', {inverse: 'image'}),
    ubernodeAltImgHorizs: DS['default'].hasMany('ubernode', {inverse: 'ubernodeAltImgHoriz'}),
    ubernodeAltImgVerts: DS['default'].hasMany('ubernode', {inverse: 'ubernodeAltImgVert'}),
    bannerImages: DS['default'].hasMany('bannerimage', {inverse: 'bannerImage'}),
    anyfeedImages: DS['default'].hasMany('anyfeedCard', {inverse: 'image'}),

    crop1x1: DS['default'].attr('string'),
    crop2x1: DS['default'].attr('string'),
    crop2x2: DS['default'].attr('string'),
    crop3x1: DS['default'].attr('string'),
    crop1x2: DS['default'].attr('string'),
    crop4x3ratio: DS['default'].attr('string'),
    cropHumongo: DS['default'].attr('string'),
    cropBanner: DS['default'].attr('string'),
    cropUnHoriz: DS['default'].attr('string'),
    cropUnVert: DS['default'].attr('string'),
    fullWidthFeature: DS['default'].attr('string'),
    lrThumbnail: DS['default'].attr('string'),

    // @TODO: use this until asset loading service
    isLoaded: DS['default'].attr('boolean', {defaultValue: false}),
  });

});
define('nasa/models/infopane', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    body: DS['default'].attr('string')
  });

});
define('nasa/models/landing-page', ['exports', 'ember-data', 'nasa/models/node'], function (exports, DS, Node) {

  'use strict';

  exports['default'] = Node['default'].extend({
    cardPageType: DS['default'].attr('string'),
    body: DS['default'].attr('string'),
    topPattern: DS['default'].attr('array'),

    cardPageBannerImg: DS['default'].belongsTo('bannerimage', {async: true, inverse: 'landingPage'}),
    addthisProfileId: DS['default'].attr('string'),
    socialEmbedCode: DS['default'].attr('string'),
    allSocialMediaLink: DS['default'].attr('array'),
    govdeliverySubscribeText: DS['default'].attr('string'),
    govdeliveryId: DS['default'].attr('string'),
    cardpageLinks: DS['default'].attr('array'),
    subNavMenu: DS['default'].belongsTo('submenu', {async: true, inverse: 'landingPage'}),
    sideNavMenu: DS['default'].belongsTo('sidemenu', {async: true, inverse: 'landingPage'}),
    name: DS['default'].attr('string'),
    changed: DS['default'].attr('string'),

    feeds: DS['default'].hasMany('feed', {async: true, inverse: 'landingPage'}),
    listing: DS['default'].hasMany('ubernode-listing', {async: true, inverse: 'landingPage'}),

    routes: DS['default'].attr('array'),
    missions: DS['default'].hasMany('term', {async: true, inverse: 'missionLandings'}),
    topics: DS['default'].hasMany('term', {async: true, inverse: 'topicLandings'}),
    collections: DS['default'].hasMany('term', {async: true, inverse: 'collectionLandings'}),
    other_tags: DS['default'].hasMany('term', {async: true, inverse: 'other_tagLandings'}),
  });

});
define('nasa/models/launchschedule', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    calendarName: DS['default'].attr('array'),
    dateFormats: DS['default'].attr('array')
  });

});
define('nasa/models/link', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    url: DS['default'].attr('string'),
    target: DS['default'].attr('string'),

    eventCalendarLink: DS['default'].belongsTo('event-card', {inverse: 'calendar'}),
    eventLaunchLink: DS['default'].belongsTo('event-card', {inverse: 'launch'}),
    eventLinks: DS['default'].belongsTo('event-card', {inverse: 'links'}),
  });

});
define('nasa/models/menu', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    tree: DS['default'].attr('array'),
  });

});
define('nasa/models/news', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    body: DS['default'].attr('string'),
    url: DS['default'].attr('string'),
    channelLink: DS['default'].attr('string'),
    channelTitle: DS['default'].attr('string'),
    channelDescription: DS['default'].attr('string'),
    rss: DS['default'].attr('string'),

    mediaThumbnail: DS['default'].attr('string'),
    enclosure: DS['default'].attr('string'),
    contentEncodedImage: DS['default'].attr('string'),
    pubdate: DS['default'].attr('momentDate'),

    masterImage: Ember['default'].computed.any('mediaThumbnail', 'enclosureImage', 'contentEncodedImage'),
    enclosureImage: function() {
      var img = this.get('enclosure'),
          tmp = false;

      if (!Ember['default'].isNone(img)) {
        ['jpg', 'jpeg', 'png', 'bmp', 'gif'].forEach(function(item) {
          if (item === img.split('.').pop().split('?')[0]) {
            tmp = true;
          }
        });
      }
      return tmp ? img : null;
    }.property('enclosure'),

    anyfeedNodes: DS['default'].belongsTo('anyfeed-card', {inverse: 'nodes'}),
  });

});
define('nasa/models/node', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    uuid: DS['default'].attr('string'),
    type: DS['default'].attr('string'),
    uri: DS['default'].attr('string'),
    title: DS['default'].attr('string'),
  });

});
define('nasa/models/panelpage', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
  });

});
define('nasa/models/sidemenu', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    landingPage: DS['default'].belongsTo('landing-page', {inverse: 'sideNavMenu'}),
    leftsideMenuLinks: DS['default'].attr('array'),
    menuHeading: DS['default'].attr('string'),
  });

});
define('nasa/models/snippet-card', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    description: DS['default'].attr('string'),
    position: DS['default'].attr('number'),
    type: DS['default'].attr('string'),
    link: DS['default'].attr('string'),
    links: DS['default'].attr('array'),

    image: DS['default'].belongsTo('image', {async: true, inverse: 'snippetImages'}),
  });

});
define('nasa/models/submenu', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    landingPage: DS['default'].belongsTo('landing-page', {inverse: 'subNavMenu'}),
    shortName: DS['default'].attr('string'),
    topicUrl: DS['default'].attr('array'),
    subtopicLinks: DS['default'].attr('array'),
  });

});
define('nasa/models/term', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    vid: DS['default'].belongsTo('vocab', {async: true}),
    weight: DS['default'].attr('number'),
    tagShortName: DS['default'].attr('string'),
    vocabularyMachineName: DS['default'].attr('string'),
    machineName: DS['default'].attr('string'),
    tagBanner: DS['default'].attr('array'),
    youtubePlaylist: DS['default'].attr('string'),
    displayTagOnUbernode: DS['default'].attr('boolean'),
    customLandingPageUrl: DS['default'].attr('string'),
    allowAsPrimarySecondary: DS['default'].attr('boolean'),
    uuid: DS['default'].attr('string'),

    title: function() {
      if (this.get('tagShortName')) {
        return this.get('tagShortName');
      }
      return this.get('name');
    }.property('name', 'tagShortName'),

    url: function() {
      if (Ember.isNone(this.get('title'))) {
        return false;
      }

      var url = this.get('customLandingPageUrl');
      if (Ember.isPresent(url)) {
        return url;
      }
      var urlTitle = this.get('title')
                         .toLowerCase()
                         .replace(/[^\w ]+/g,'')
                         .replace(/\s+/g,'-');
      return "/subject/" + this.get('id') + '/' + urlTitle;
    }.property('customLandingPageUrl', 'title'),

    /* Relationships */
    parent: DS['default'].belongsTo('term', { async: true, inverse: 'children' }),
    children: DS['default'].hasMany('term', { async: true, inverse: 'parent' }),

    primaryTags: DS['default'].hasMany('ubernode', { inverse: 'primaryTag'}),
    secondaryTags: DS['default'].hasMany('ubernode', { inverse: 'secondaryTag'}),

    missionNodes: DS['default'].hasMany('ubernode', { inverse: 'missions'}),
    topicNodes: DS['default'].hasMany('ubernode', { inverse: 'topics'}),
    collectionNodes: DS['default'].hasMany('ubernode', { inverse: 'collections'}),
    otherTagNodes: DS['default'].hasMany('ubernode', { inverse: 'otherTags'}),
    pressReleaseTypesNodes: DS['default'].hasMany('ubernode', { inverse: 'releaseType'}),

    missionLandings: DS['default'].hasMany('landing-page', { inverse: 'missions'}),
    topicLandings: DS['default'].hasMany('landing-page', { inverse: 'topics'}),
    collectionLandings: DS['default'].hasMany('landing-page', { inverse: 'collections'}),
    other_tagLandings: DS['default'].hasMany('landing-page', { inverse: 'other_tags'}),
  });

});
define('nasa/models/tv-player', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    calendarName: DS['default'].attr('array'),
  });

});
define('nasa/models/tvschedule', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    calendarName: DS['default'].attr('array'),
  });

});
define('nasa/models/twitter_embed_card', ['exports', 'nasa/models/embed_card'], function (exports, EmbedCard) {

	'use strict';

	exports['default'] = EmbedCard['default'].extend({
	});

});
define('nasa/models/uber-card', ['exports', 'ember-data', 'nasa/models/card'], function (exports, DS, Card) {

  'use strict';

  exports['default'] = Card['default'].extend({
    visibleTag: DS['default'].attr('string'),
    altTitle: DS['default'].attr('string'),

    node: DS['default'].belongsTo('ubernode', { async: true, inverse: 'uberCardNodes' }),
  });

});
define('nasa/models/ubernode-listing', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    landingPage: DS['default'].belongsTo('landing-page', {async: true, inverse: 'listing'}),
    nodes: DS['default'].hasMany('ubernode', {async: true, inverse: 'listing'}),
    pageSize: DS['default'].attr('number'),
    missions: DS['default'].attr('array'),
    topics: DS['default'].attr('array'),
    collections: DS['default'].attr('array'),
    other_tags: DS['default'].attr('array'),
    routes: DS['default'].attr('array'),
    unType: DS['default'].attr('array'),
    tags: Ember.computed.union('missions', 'topics', 'collections', 'other_tags'),
  });

});
define('nasa/models/ubernode', ['exports', 'ember-data', 'nasa/models/node'], function (exports, DS, Node) {

  'use strict';

  exports['default'] = Node['default'].extend({

    ubernodeType: DS['default'].attr('string'),
    cardfeedTitle: DS['default'].attr('string'),

    // Image tab options.
    masterImage: DS['default'].belongsTo('image', { inverse: 'masterImages'}),
    cardFeedSize: DS['default'].attr('string'),
    ubernodeImage: DS['default'].attr('number'),
    ubernodeAltImgHoriz: DS['default'].belongsTo('image', {inverse: 'ubernodeAltImgHorizs'}),
    ubernodeAltImgVert: DS['default'].belongsTo('image', {inverse: 'ubernodeAltImgVerts'}),
    //vert image caption/credit
    imageCredits: DS['default'].attr('string'),
    masterImageCaption: DS['default'].attr('string'),

    // Content tab.
    body: DS['default'].attr('string'),
    name: DS['default'].attr('string'),
    changed: DS['default'].attr('string'),
    promoDateTime: DS['default'].attr('date'),
    eventDate: DS['default'].attr('date'),
    nowTime: DS['default'].attr('number'),
    // promotionalTitle: DS.attr('string'),
    prLeaderSentence: DS['default'].attr('string'), // Promo sentence
    // Collection Asset fields (on content tab)
    linkOrAttachment: DS['default'].attr('string'),
    collectionAssetLink: DS['default'].attr('array'),
    // Really, there's just one, but that's the field name in Drupal.
    attachments: DS['default'].belongsTo('file', { inverse: 'nodeAttachments'}),

    // Anyfeed Item
    channelDescription: DS['default'].attr('string'),
    channelTitle: DS['default'].attr('string'),
    channelLink: DS['default'].attr('string'),
    channelAtomLink: DS['default'].attr('string'),
    title: DS['default'].attr('string'),

    link: DS['default'].attr('string'),
    mediaThumbnail: DS['default'].attr('string'),
    enclosure: DS['default'].attr('string'),
    contentEncodedImage: DS['default'].attr('string'),

    // Tags
    topics: DS['default'].hasMany('term', {async: true, inverse: 'topicNodes'}),
    missions: DS['default'].hasMany('term', {async: true, inverse: 'missionNodes'}),
    collections: DS['default'].hasMany('term', {async: true, inverse: 'collectionNodes'}),
    otherTags: DS['default'].hasMany('term', {async: true, inverse: 'otherTagNodes'}),
    feeds: DS['default'].hasMany('feed', {async: true, inverse: 'nodes'}),
    listing: DS['default'].hasMany('ubernode-listing', {async: true, inverse: 'nodes'}),
    primaryTag: DS['default'].belongsTo('term', {async: true, inverse: 'primaryTags'}),
    secondaryTag: DS['default'].belongsTo('term', {async: true, inverse: 'secondaryTags'}),

    // Other tab
    enableComments: DS['default'].attr('boolean'),

    // Feature fields
    credits: DS['default'].attr('string'),

    // Press Release fields
    ubernodePrContacts: DS['default'].attr('string'),
    releaseType: DS['default'].hasMany('term', {async: true, inverse: 'pressReleaseTypesNodes'}),
    releaseId: DS['default'].attr('string'),

    parent: DS['default'].hasMany('ubernode', {
      inverse: 'related',
    }),
    related: DS['default'].hasMany('ubernode', {
      inverse: 'parent',
    }),

    // Image fields
    linkurl: DS['default'].attr('string'),
    imageFeatureCaption: DS['default'].attr('string'),

    // Media Cast fields
    podcast: DS['default'].belongsTo('file', {inverse: 'podcasts'}),
    podcastItunesUrl: DS['default'].attr('string'),
    podcastRssUrl: DS['default'].attr('string'),
    vodcast: DS['default'].belongsTo('file', {inverse: 'vodcasts'}),
    vodcastItunesUrl: DS['default'].attr('string'),
    vodcastRssUrl: DS['default'].attr('string'),

    uberCardNodes: DS['default'].hasMany('uber-card', { async: true, inverse: 'node' }),
  });

});
define('nasa/models/upcomingevents', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    calendarName: DS['default'].attr('array')
  });

});
define('nasa/models/video', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].Model.extend({
        url: DS['default'].attr('string'),
        title: DS['default'].attr('string'),
        description: DS['default'].attr('string'),
        type: DS['default'].attr('string'),
        nid: DS['default'].attr('string'),
    });

});
define('nasa/models/vocab', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    machine_name: DS['default'].attr('string'),
    terms: DS['default'].hasMany('term', {
      inverse: 'vid',
    }),
  });

});
define('nasa/models/yt_card', ['exports', 'ember-data', 'nasa/models/card'], function (exports, DS, Card) {

  'use strict';

  exports['default'] = Card['default'].extend({
    embedUrl: DS['default'].attr('string'),
    promoDateTime: DS['default'].attr('date'),
    plistPosition: DS['default'].attr('number'),
    image: DS['default'].attr('string'),
    description: DS['default'].attr('string')
  });

});
define('nasa/router', ['exports', 'ember', 'nasa/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType,
    // this could be set to the forced route,
    // but forced route is in a script tag in the middle of
    // the DOM. Which isn't loaded at this point.
    // If we put the forced route in the head of the page
    // then we set this to skip over the index route.
    //initialURL: '/' + window.forcedRoute,
  });

  // @TODO single page app
  // http://emberjs.com/guides/understanding-ember/debugging/
  //
  // View all registered routes
  // Ember.keys(App.Router.router.recognizer.names)

  Router.map(function() {
    this.resource('landingPage');
    this.resource('article', {path: '/ubernode/:nid'});
    this.route('panelpage');
    this.route("error");
    this.resource('image', {path: '/images/:id/:title'});
    this.resource('video', {path: '/videos/:id/:title'});
    this.resource('alltags');
    this.resource('stmd');
  });

  exports['default'] = Router;

});
define('nasa/routes/alltags', ['exports', 'ember', 'nasa/mixins/paginatable', 'nasa/mixins/add-this'], function (exports, Ember, Paginatable, AddThis) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(Paginatable['default'], AddThis['default'], {
    model: function() {
      this._super();

      // Retrieve tags in batches, based on variables passed from template
      var tags = Ember['default'].A();
      var numBatches = window.pageSize > 0 ? Math.ceil(window.tagCount / window.pageSize) : 1;
      for(var i = 0; i < numBatches; i++){
          tags.pushObject( this.store.find('term', {'vocab_names': ['topics', 'missions'], 'page': i }) );
      }

      return Ember['default'].RSVP.all(tags);
    },
    setupController: function(controller, model) {
      this._super(controller, model);

      // Merge the tag arrays
      var tags = Ember['default'].A();
      model.forEach(function(tagList){
          tags.pushObjects(tagList.get('content'));
      });

      controller.set('tags', tags);
    },
    renderTemplate: function(){
      this.render();

      this.render('navbar',{
          outlet:'navbar',
          into: 'application',
          controller: 'navbar'
      });
      this.render('footer',{
          outlet:'footer',
          into: 'application'
      });
    }
  });

});
define('nasa/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
	});

});
define('nasa/routes/article', ['exports', 'ember', 'nasa/mixins/tabable', 'nasa/mixins/add-this', 'nasa/utils/get-query'], function (exports, Ember, Tabable, AddThis, getQueryVariable) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(Tabable['default'], AddThis['default'], {
    beforeModel: function(){
      this.checkForRedirect();
    },

    model: function(params) {
      return this.store.find('ubernode', params.nid);
    },

    setupController: function(controller, model) {
      this._super(controller, model);

      var vocabs = ['missions', 'topics', 'collections', 'other_tags'],
          hash = {},
          self = this;

      this.latestFeed.getMore();
      this.disqus.set('activeId', model.get('id'));
      this.disqus.set('activeTitle', model.get('title'));

      hash.vocabs = Ember['default'].RSVP.hash(model.getProperties(vocabs));
      hash.related = model.get('related');
      Ember['default'].RSVP.hash(hash).then(function(filled) {
        var tags = Ember['default'].A();

        vocabs.forEach(function(vocab) {
          if (filled.vocabs[vocab]) {
            tags.addObjects(filled.vocabs[vocab]);
          }
        });
        controller.set('relatedTags',tags);
        // it may be possible only to clear when tids change
        self.relatedFeed.set('tids',tags.mapBy('id'));
        self.relatedFeed.getMore();
      });
    },

    checkForRedirect: function(){
      var nodeID = getQueryVariable['default']('node');
      var feed = getQueryVariable['default']('feed');
      if (nodeID && feed && !isNaN(nodeID) && !isNaN(feed)){
        window.landingPageID = nodeID;
        window.cardFeed = [
          {id: feed, type: 'card_feed', unType: ['image']}
        ];
        this.transitionTo('landingPage');
      }
    },

    renderTemplate: function() {
      this.render();
      //Render header into header outlet
      this.render('navbar',{
          outlet:'navbar',
          into: 'application',
          controller: 'navbar'
      });
      this.render('articles/sidebar',{
          outlet:'sidebar',
          into: 'application',
          controller: 'article'
      });
    }
  });

});
define('nasa/routes/error', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        renderTemplate: function(){
            this.render();
            //Render header into header outlet
            this.render('navbar',{
                outlet:'navbar',
                into: 'application',
                controller: 'navbar'
            });
            this.render('footer',{
                outlet:'footer',
                into: 'application'
            });
        }
    });

});
define('nasa/routes/image', ['exports', 'ember', 'nasa/mixins/gallery-route-mixin'], function (exports, Ember, GalleryRouteMixin) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(GalleryRouteMixin['default'], {
      model: function(params) {
          this._super(params);
          return this.container.lookup('controller:landing-page').get('images');
      },

      setupController: function(controller, model) {
          this._super(controller,model);
      },

    renderTemplate: function() {
      this.render();
    }
  });

});
define('nasa/routes/images', ['exports', 'ember', 'nasa/mixins/paginatable'], function (exports, Ember, Paginatable) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend(Paginatable['default'], {

        model: function() {
            return this.store.find('node');
        },

        renderTemplate: function(){
            this.render();
            this.render('navbar',{
                outlet:'navbar',
                into: 'application',
                controller: 'navbar'
            });
            this.render('footer',{
                outlet:'footer',
                into: 'application'
            });
        },
        fetchMore: function(page, pageSize) {
            return this.store.find('node', {
                page: page,
                pageSize: pageSize
            });
        }

    });

});
define('nasa/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    init: function() {
      Ember['default'].$('.ember-init-hide').hide();
      //this.store.find('dlVideo').then(function(videos) {});
    },
    model: function() {
      return Ember['default'].$('.ember-init-hide .l-content').html();
    },
    beforeModel: function() {
      if (typeof window.forcedRoute !== 'undefined') { 
        this.transitionTo(window.forcedRoute);
      }
      else { 
        this.transitionTo('error')
      }
    },

    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    renderTemplate: function() {
        this.render();

        //Render header into header outlet
        this.render('navbar',{
            outlet:'navbar',
            into: 'application',
            controller: 'navbar'
        });
        this.render('header',{
            outlet:'header',
            into: 'application'
        });
        this.render('footer',{
            outlet:'footer',
            into: 'application'
        });
    }
  });

});
define('nasa/routes/landing-page', ['exports', 'ember', 'nasa/mixins/add-this', 'nasa/mixins/paginatable', 'nasa/utils/get-json', 'nasa/utils/linear-array'], function (exports, Ember, AddThis, Paginatable, getJSON, LinearArray) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(Paginatable['default'], AddThis['default'], {
    offset: 0,
    limit: 10,

    model: function() {
      this._super();

      if(window.landingPageID){
        if (!this.store.hasRecordForId('landing-page', window.landingPageID)) {
          return this.store.find('landing-page', window.landingPageID);
        }
        else {
          return this.store.getById('landing-page', window.landingPageID);
        }
      }

      if (!this.store.hasRecordForId('landing-page', window.landingPage.id)) {
        return this.store.push('landing-page', window.landingPage);
      }
      else {
        return this.store.getById('landing-page', window.landingPage.id);
      }
    },

    setupController: function(controller, model) {
      this._super(controller, model);
      var href = model.get('uri') + window.location.search + window.location.hash;
      if (model.get('uri')) window.history.replaceState('', model.get('title'), href);
      this.controllerFor('footer').set('editor', model.get('name'));
      this.controllerFor('footer').set('changed', model.get('changed'));

      var lpFeed = Ember['default'].A(window.cardFeed),
          self = this,
          pinnedCardTypes = [
            'anyfeedCard',
            'snippets',
            'uberCard',
            'embedCard',
            'countdownCards',
            'twitterEmbedCard',
            'eventCard',
            'calendarCard'
          ];

      // Must be set before spinner cards
      lpFeed.filterBy('type', 'pattern').forEach(function(card) {
        model.set('topPattern', card.pattern);
      });

      // Maybe this can just watch top pattern somehow?
      controller.setSpinnerCards();

      model.get('feeds').then(function(feeds) {
        lpFeed.filterBy('type', 'card_feed').forEach(function(feed) {
          if (!self.store.hasRecordForId('feed', feed.id)) {
            self.store.pushPayload('feed', {feeds:[feed]});
          }
          feeds.pushObject(self.store.getById('feed', feed.id));
        });
      }, this.errorHandler, "NASA: LandingPageRoute#setupController get feeds" );

      // start loading feeds
      this.fetchMoreProxy(controller);

      var simpleImports = {
        embed: 'embedCard',
        event: 'eventCard',
        twittere: 'twitterEmbedCard',
        alert: 'alertCard',
        calendarcard: 'calendarCard',
        ubercard: 'uberCard',
      };

      try {
        var pinnedCards = controller.get('pinnedCards');
        for (var key in simpleImports) {
          var modelType = simpleImports[key];
          lpFeed.filterBy('type', key).forEach(function(card) {
            if (self.store.hasRecordForId(modelType, card.id)) {
              if (key === 'alert') {
                controller.set(key, self.store.getById(modelType, card.id));
              }
              else {
                pinnedCards.pushObject(self.store.getById(modelType, card.id));
              }
              return;
            }
            if (key === 'alert') {
              controller.set(key, self.store.push(modelType, card));
            }
            else if (pinnedCardTypes.indexOf(modelType) !== -1) {
              var object = {};
              object[modelType] = [card];
              self.store.pushPayload(modelType, object);
              pinnedCards.pushObject(
                self.store.getById(modelType, card.id)
              );
            }
          });
        }
      } catch (error) {
        Ember['default'].logger.error('Card Feed Import: ' + error);
      }

      lpFeed.filterBy('type', 'countdown').forEach(function(card) {
        var image,
            record;

        if (self.store.hasRecordForId('countdownCard', card.id)) {
          self.store.getById('countdownCard', card.id);
          return;
        }

        if (typeof card.image === 'object') {
          image = card.image;
          delete image.rdf_mapping;
          image.id = image.fid;
          delete image.fid;
          delete card.image;
        }

        record = self.store.createRecord('countdownCard', card);

        if (typeof image !== 'undefined' && image !== "none") {
          record.set('image', self.store.createRecord('image', image));
        }

        controller.get('pinnedCards').pushObject(record);
      });

      lpFeed.filterBy('type', 'listing').forEach(function(card) {
        var modelType = 'ubernode-listing',
            batchSize = card.pageSize;

        delete card.type;
        delete card.id;
        delete card.title;
        delete card.pageSize;

        // With listing pages we don't really use the sparse loading
        controller.get('listings').pushObject(LinearArray['default'].create({
          // we are just storing this for something else
          pageSize: parseInt(batchSize),
          // this 3 comes from ubernode-listing pages
          batchSize: (parseInt(batchSize) * 3),

          oldestDate: 'WOot',

          load: function(offset, limit) {
            var me = this;

            return self.store.find('ubernode', Ember['default'].merge({offset: offset, limit: limit}, card))
              .then(function(results) {
                  return {
                    items: results.get('content'),
                    total: parseInt(results.get('meta.total_rows')),
                  }
                },
                self.errorHandler,
                "Format results for LinearArray")
              .then(function(results) {
                  var length = results.items.length;

                  if (length) {
                    var object = results.items[length - 1];
                    me.set('oldestDate', object.get('promoDateTime'));
                  }

                  return results;
                },
                self.errorHandler,
                'Set Oldest Date');
          },

          setOldestDate: function(results) {
            var length = results.items.length;

            if (length) {
              var object = results.items[length - 1];
              this.set('oldestDate', object.get('promoDateTime'));
            }

            return results;
          },
        }));
      });

      lpFeed.filterBy('type', 'video_feed').forEach(function(card) {
        delete card.type;
        self.youtubeService.get('playlists').pushObject(card);
      });

      //@TODO: Namespace this in its own filterby
      lpFeed.filterBy('type', 'anyfeed').forEach(function(card) {
        if (self.store.hasRecordForId('anyfeedCard', card.id)) {
          controller.get('pinnedCards').pushObject(self.store.getById('anyfeedCard', card.id));
          return;
        }
        var payload = {};
        if (card.image) {
          payload.images = [card.image];
          card.image = payload.images[0].fid;
        }
        payload.anyfeedCards = [card];

        self.store.pushPayload('anyfeedCard', payload);

        var storeCard = self.store.getById('anyfeedCard', card.id);
        controller.get('pinnedCards').pushObject(storeCard);

        getJSON['default']('/api/1/query/news.json', {channel: card.id})
        .then(function(response) {
          if (response.news && response.news.length) {
            if (response.news[0].source) {
              storeCard.set('source', response.news[0].source);
            }

            return response.news.mapBy('nid').map(function(node) {
              return self.store.find('news', node).then(function(model) {
                return storeCard.get('nodes').pushObject(model);
              }, self.errorHandler, 'Route/LandingPage: Push node to anyfeedCard');
            });
          }
        }, self.errorHandler, 'Get nodes from news feed');
      });

      lpFeed.filterBy('type', 'snippet').forEach(function(card) {
        if (self.store.hasRecordForId('snippetCard', card.id)) {
          controller.get('pinnedCards').pushObject(self.store.getById('snippetCard', card.id));
          return;
        }
        var payload = {};
        if (card.image) {
          payload.images = [card.image];
          card.image = payload.images[0].fid;
        }
          payload.snippetCards = [card];

        self.store.pushPayload('snippetCard', payload);
        controller.get('pinnedCards').pushObject(
          self.store.getById('snippetCard', card.id)
        );
      });

      controller.setProperties({
        offset: this.get('offset'),
        limit: this.get('limit')
      });

      var submenu = model.get('subNavMenu');
      if(submenu){
        this.controllerFor('navbar').set('submenu', submenu);
      }
    },

    errorHandler: function(reason) {
      throw new Error(reason);
    },

    fetchMore: function(page, pageSize, controller) {
      var promises = [];
      var self = this;
      var ytCanLoadMore = this.get('youtubeService.canLoadMore');
      controller.get('feeds').then(function(feeds) {
        feeds.forEach(function(feed) {
          feed.set('page', page);
          feed.set('pageSize', pageSize);

          self.getNodes(promises, controller, feed);

        });
      }, this.errorHandler, 'fetchMore');

      this.set('feedCanLoadMore',ytCanLoadMore);
      controller.set('feedCanLoadMore',ytCanLoadMore);
      controller.set('loadingImages', !ytCanLoadMore);

      return Ember['default'].RSVP.all(promises, 'fetchMore: Fetch nodes from feeds')
        .then(function(results) {
        var items = Ember['default'].A();

        results.forEach(function(nodes) {
          items.addObjects(nodes);
        });
        return items;
      }, null, 'fetchMore: Returning nodes from all the feeds.');
    },

    getNodes: function(promises, controller, feed) {
      var self = this;
      var params = feed.getProperties([
        'missions',
        'topics',
        'collections',
        'other_tags',
        'unType',
        'routes',
        'page',
        'pageSize'
      ]);
      promises.push(this.store.find('ubernode', params).then(function(results) {
        var total = feed.get('nodes.length') + results.get('content.length');
        if (total < parseInt(results.get('meta.total_rows'))){
          self.set('feedCanLoadMore',true);
          controller.set('feedCanLoadMore',true);
          controller.set('loadingImages',false);
          if (total < controller.get('numCardsDesired') && !controller.get('isGallery')) {
            feed.incrementProperty('page');
            self.getNodes(promises, controller, feed);
          }
        }
        if (total === parseInt(results.get('meta.total_rows'))){
          controller.set('loadingImages',false);
        }
        feed.get('nodes').then(function(nodes) {
          var content = results.get('content');
          content.forEach(function(node) {
            node.reload();
          });
          controller.set('loadingImages',false);
          return nodes.pushObjects(content);
        }, self.errorHandler, 'Add nodes to feed');
      }, self.errorHandler, 'Get feed to add nodes'));
    },


    actions:{
      goToVideo: function(id,title){
        this.transitionTo('video', id, title);
      },
      goToImage: function(image,title){
        if (this.get('browserSizeService.isMobile')){
          window.location.href = window.location.origin + image.get('uri');
        }
        else {
          this.transitionTo('image', image.get('id'), title);
        }
      }
    },

    renderTemplate: function(){
      this.render();

      this.render('navbar',{
          outlet:'navbar',
          into: 'application',
          controller: 'navbar'
      });
      this.render('missions/header',{
          outlet:'header',
          into:'application'
      });
      this.render('missions/sidebar',{
          outlet:'sidebar',
          into: 'application'
      });
      this.render('footer',{
          outlet:'footer',
          into: 'application'
      });
    },
  });

});
define('nasa/routes/panelpage', ['exports', 'ember', 'nasa/mixins/add-this', 'nasa/mixins/paginatable'], function (exports, Ember, AddThis, Paginatable) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(Paginatable['default'], AddThis['default'], {
    model: function() {
      this._super();

      var self = this;
      var rsvp = {};
      var feed = Ember['default'].A(window.panelFeed);

      rsvp.panes = Ember['default'].A();

      for(var pos = 0; pos < feed.length; pos++){
        var type = feed[pos].type;
        feed[pos][type] = true;

        feed[pos].position = pos;

        switch(type){
          case 'tvschedule':
              rsvp.panes[pos] = self.store.createRecord('tvschedule', feed[pos]);
            break;
          case 'fullcalendar':
              rsvp.panes[pos] = self.store.createRecord('fullcalendar', feed[pos]);
            break;
          case 'tv_player':
              rsvp.panes[pos] = self.store.createRecord('tv-player', feed[pos]);
            break;
          case 'launch_schedule':
              rsvp.panes[pos] = self.store.createRecord('launchschedule', feed[pos]);
            break;
          case 'upcoming_events':
              rsvp.panes[pos] = self.store.createRecord('upcomingevents', feed[pos]);
            break;
          case 'info_pane':
              rsvp.panes[pos] = self.store.createRecord('infopane', feed[pos]);
            break;
          default:
            break;
        }
      }

      return Ember['default'].RSVP.hash(rsvp);
    },

    setupController: function(controller, model) {
      this._super(controller, model);

      this.controllerFor('application').set('hasSideRail', false);

      if (model.panes) {
        controller.set('panes', model.panes);
      }
    },

    renderTemplate: function(){
      this.render();
      this.render('navbar',{
          outlet:'navbar',
          into: 'application',
          controller: 'navbar'
      });
      this.render('footer',{
          outlet:'footer',
          into: 'application'
      });
    },

    actions: {
      loadSchedule: function(model, start, end) {
        var strStart = window.moment(start).format('YYYYMMDDHHmm'),
            strEnd = window.moment(end).format('YYYYMMDDHHmm'),
            controller = this.get('controller'),
            calendars = model.get('calendarName'),
            calendar_ids = [];

        controller.set('isLoading', true);

        calendars.forEach(function(cal) {
          calendar_ids.push(cal.tid);
        });

        var query = {
          'timeRange': strStart+'--'+strEnd,
          'calendars': calendar_ids.join('+')
        };

        var items = this.store.find('calendar-event', query).then(function(results){
          return results.get('content');
        }).then(function(content){
          var promises = content.map(function(item){
            return item.reload();
          });
          return Ember['default'].RSVP.all(promises);
        }).then(function(results) {
          controller.set('isLoading', false);
          return results;
        });

        model.set('tvSchedule', items);
      },
    }
  });

});
define('nasa/routes/stmd', ['exports', 'ember', 'ic-ajax', 'nasa/utils/sparse-array'], function (exports, Ember, request, SparseArray) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function() {
      var self = this;

      return this.store.find('vocab', {'parameters[machine_name]': 'stmd_areas'})
        .then(function(results) {
          var content = results.get('content'),
              vid = parseInt(content[0].get('id'));
          if(content.length) {
            return self.store.find('term', {'parameters[vid]': vid});
          }

          return false;
        });
    },
    renderTemplate: function() {
      this.render();

      this.render('navbar',{
          outlet:'navbar',
          into: 'application',
          controller: 'navbar'
      });
      this.render('footer',{
          outlet:'footer',
          into: 'application'
      });
    },
    actions: {
      doStmdSearch: function(options) {
        var self = this;

        var array = SparseArray['default'].create({
          batchSize: 10,
          load: function(offset, limit) {
            var url = '/api/1/query/stmd',
                get = [
                  'q.parser=structured',
                  'start=' + offset,
                  'size=' + limit,
                  'return=title,source,content',
                  'highlight.content={}',
                ],
                query = ['and'],
                tidStrings;

            self.controller.set('isLoading', true);

            if (Ember['default'].isPresent(options.q)) {
              query.push("(or content:'" + options.q + "' title:'" + options.q + "')");
            }

            if (Ember['default'].isPresent(options.tids)) {
              options.tids.forEach(function(item) {
                query.push("tids:'" + item + "'");
              });
            }

            if (query.length === 1) {
              self.controller.set('isLoading', false);
              return Ember['default'].RSVP.resolve({total: 0, items: []});
            }

            get.push('q=(' + query.join(' ') + ')');

            return request['default']({
              url: url + '?' + get.join('&'),
              type: 'get',
            }).then(function(results) {
              self.controller.set('isLoading', false);
              return {
                total: results.hits.found,
                items: results.hits.hit,
              }
            });
          },
        });
        this.controller.set('results', array);
      }
    }
  });

});
define('nasa/routes/video', ['exports', 'ember', 'nasa/mixins/gallery-route-mixin', 'nasa/utils/get-json'], function (exports, Ember, GalleryRouteMixin, getJSON) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend(GalleryRouteMixin['default'], {
        model: function(params) {
            this._super(params);
            return this.container.lookup('controller:landing-page').get('videos');
        },

        setupController: function(controller, model) {
          this._super(controller,model);
        },

        renderTemplate: function() {
            this.render();
        }
    });

});
define('nasa/routes/videos', ['exports', 'ember', 'nasa/mixins/paginatable'], function (exports, Ember, Paginatable) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend(Paginatable['default'], {

        model: function() {
            return this.store.find('video');
        },

        renderTemplate: function(){
            this.render();
            this.render('navbar',{
                outlet:'navbar',
                into: 'application',
                controller: 'navbar'
            });
            this.render('footer',{
                outlet:'footer',
                into: 'application'
            });
        }
    });

});
define('nasa/serializers/bannerimage', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'nid',
  });

});
define('nasa/serializers/calendar-event', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: 'nid',
  });

});
define('nasa/serializers/event-card', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    attrs: {
      links: { embedded: 'always' },
      calendar: { embedded: 'always' },
      launch: { embedded: 'always' },
    },
  });

});
define('nasa/serializers/file', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'fid',
  });

});
define('nasa/serializers/humungo-card', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'nid',
  });

});
define('nasa/serializers/image', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'fid',
  });

});
define('nasa/serializers/landing-page', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: 'nid',
  });

});
define('nasa/serializers/menu', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: 'name',
  });

});
define('nasa/serializers/node', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: 'nid',
  });

});
define('nasa/serializers/sidemenu', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: 'nid',
  });

});
define('nasa/serializers/submenu', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: 'nid',
  });

});
define('nasa/serializers/term', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'tid',
  });

});
define('nasa/serializers/twitter-dynamic-card', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'screenName',
  });

});
define('nasa/serializers/ubernode', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    primaryKey: 'nid',
  });

});
define('nasa/serializers/vocab', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'vid',
  });

});
define('nasa/services/browser-size', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    pageWidthPixel: 0,
    pageHeightPixel: 0,
    pageWidth: 'large',
    isMobile: function(){
      var size = this.get('pageWidth');
      return size === 'small' || size === 'xsmall';
    }.property('pageWidth'),
    notMobile: Ember['default'].computed.not('isMobile'),
    isTablet: Ember['default'].computed.equal('pageWidth','medium'),
    isDesktop: Ember['default'].computed.equal('pageWidth','large'),

    onInit: function() {
      this.setSize();
      this.get('hasFlash');
      Ember['default'].$(window).on('resize', Ember['default'].run.bind(this, this.setSizeDebounced));
    }.on('init'),

    setSize: function() {
      var width = window.innerWidth,
          height = window.innerHeight,
          size = '';

      if (width) {
        if (width < 512) {
          size = 'xsmall';
        }
        else if (width < 768) {
          size = 'small';
        }
        else if (width < 992) {
          size = 'medium';
        }
        //else if (width < 1367) {
        //  size = 'large';
        //}
        else {
          size = 'large';
        }
      }

      this.set('pageWidthPixel', width);
      this.set('pageHeightPixel', height);
      this.set('pageWidth', size);
    },

    hasFlash: function() {
      if (Ember['default'].isPresent(navigator.mimeTypes) &&
          Ember['default'].isPresent(navigator.mimeTypes["application/x-shockwave-flash"]) &&
          Ember['default'].isPresent(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
        return true;
      }
      return false;
    }.property(),

    setSizeDebounced: function() {
      Ember['default'].run.debounce(this, this.setSize, 100);
    },

  });

});
define('nasa/services/disqus-manager', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    activeId: null,
    activeTitle: null,
    defaultId: null,
    defaultTitle: null,

    setDefault: function(){
      if (Ember['default'].isNone(this.get('defaultId'))){
        this.set('defaultTitle',this.get('activeTitle'));
        this.set('defaultId',this.get('activeId'));
      }
    }.observes('activeId')
  });

});
define('nasa/services/feed', ['exports', 'ember', 'nasa/utils/get-json'], function (exports, Ember, getJSON) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    isLoading: false,
    page: 0,
    pageSize:5,
    idName: null,
    modelName: null,
    resultArrayName: null,
    url: null,
    total_rows: 0,
    content: Ember['default'].computed(function() { 
      return Ember['default'].A();
    }),

    hasMore: Ember['default'].computed('total_rows', 'content.@each', function() {
      return this.get('content.length') < this.get('total_rows');
    }),

    params: function(){
      return {
        page: this.get('page'),
        pageSize: this.get('pageSize'),
      };
    }.property('page','pageSize'),

    getMore: function(){
      if (this.get('isLoading')) {
        return;
      }

      var self = this;

      this.set('isLoading',true);
      getJSON['default'](this.get('url'), this.get('params')).then(function(results){
        self.set('page',self.get('page')+1);
        self.set('isLoading',false);
        results[self.get('resultArrayName')].forEach(function(node) {
          self.store.find(self.get('modelName'), node[self.get('idName')]).then(function(item) {
            self.get('content').pushObject(item);
          });
        });
        self.set('total_rows',results.meta.total_rows);
      }, function(){ 
        self.set('isLoading',false);
      });
    },

    clear: function(){
      this.get('content').clear();
    }

  });

});
define('nasa/services/heartbeat', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    tickRate: 500,
    ticker: false,

    init: function() {
      this.tick();
    },

    tick: function() {
      var self = this;
      setTimeout(function() {
        self.toggleProperty('ticker');
        self.tick();
      }, this.get('tickRate'));
    }
  });

});
define('nasa/services/latest-feed', ['exports', 'ember', 'nasa/services/feed', 'nasa/utils/get-json'], function (exports, Ember, Feed, getJSON) {

  'use strict';

  exports['default'] = Feed['default'].extend({
    idName:'fpid',
    modelName:'ubernode',
    resultArrayName: 'latest',
    url: '/api/1/query/latest',
    pageSize: 20,
    latestResults: [],
    nodes: [],

    init: function() {
      var self = this;
      this._super();

      this.set('latestResults', getJSON['default'](this.get('url')).then(function(results) {
        return Ember['default'].A(results[self.get('resultArrayName')]);
      }));
    },

    getMore: function(){
      var self = this;
      var params;

      if (this.get('isLoading')) return;

      // @TODO: this should be completely refactored it doesn't currently
      // work properly. Pinned ubernodes are not properly sorted into the
      // feed at their pinned position.

      this.set('isLoading',true);
      this.get('latestResults').then(function(results){
        // @TODO The result of the next line isn't always a feed. it could be
        // a pinned card.
        results.forEach(function(item, i) {
          // Clone object
          var feed = jQuery.extend({}, item);

          // Is feed.
          if (feed.ubernodeTypeUnlimited !== undefined) {
            self.getUbernodes(feed);
          }
          // Is pinned card.
          else {
            self.push(feed.cardUbernode);
            // remove itself from the latest feed for the next getMore
            results.removeAt(i);
          }
        });
        self.set('page',self.get('page')+1);
        self.set('isLoading',false);
      });
    },

    getUbernodes: function(feed) {
      var self = this;
      // remove unneeded variable.
      delete feed.fpid;

      // Change name of variable
      feed['unType'] = feed.ubernodeTypeUnlimited;
      delete feed.ubernodeTypeUnlimited;

      // Check if collection asset is a type to be pulled.
      var index = feed['unType'].indexOf('collection_asset');

      // If so remove collection asset from the list to be retrieved.
      if (index !== -1) {
        feed['unType'].splice(index, 1);
      }

      feed['page'] = this.get('page');
      feed['pageSize'] = this.get('pageSize');

      getJSON['default']('/api/1/query/ubernodes.json', feed).then(function(data) {
        if (data.ubernodes === undefined) return;

        data.ubernodes.forEach(function(item) {
          self.push(parseInt(item.nid));
        });
      }, this.errorHandler, "NASA: Get one of the latest feeds");
    },

    /**
     * Adds node to latest feed.
     *
     * Ensures that nodes added are not duplicates.
     *
     * @param integer id
     *    id of the node to add.
     */
    push: function(id) {
      var content = this.get('content'),
          nodes = this.get('nodes');

      // Check if card is already in the array.
      if (nodes.indexOf(id) !== -1) return;

      // Record each node we add into a seporate array.
      // This is needed due to the nodes in content being promises initally.
      // This might be able to be optimized.
      nodes.push(id);
      content.pushObject(this.store.find('ubernode', id));
    },

    errorHandler: function(reason) {
      throw new Error(reason);
    }
  });

});
define('nasa/services/loaded-scripts', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    loaded: []
  });

});
define('nasa/services/page-visibility', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var hiddenVar, visibilityChange; 
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
    hiddenVar = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    hiddenVar = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hiddenVar = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hiddenVar = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  exports['default'] = Ember['default'].Object.extend({
    hidden: false,
    visibilityState: 'visible',

    init: function() {
      document.addEventListener(visibilityChange, function() {
        this.set('hidden', document[hiddenVar]);
        this.set('visibilityState', document.visibilityState);
      }.bind(this), false);
    },
  });

});
define('nasa/services/related-feed', ['exports', 'ember', 'nasa/services/feed'], function (exports, Ember, Feed) {

  'use strict';

  exports['default'] = Feed['default'].extend({
    idName: 'nid',
    modelName:'ubernode',
    resultArrayName: 'related',
    url: '/api/1/query/related',
    noRelated: Ember['default'].computed.equal('tids.length',0),

    params: function(){
      return {
        page: this.get('page'),
        pageSize: this.get('pageSize'),
        tids: this.get('tids')
      };
    }.property('page','pageSize','tids'),
  });

});
define('nasa/services/scroll-position', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    previousPosition: 0,
    nextPosition: 0,

    onInit: function() {
      this.setPosition();
      Ember['default'].$(window).on('scroll', Ember['default'].run.bind(this, this.setPosition));
    }.on('init'),

    setPosition: function() {
      this.set('previousPosition', this.get('nextPosition'));
      this.set('nextPosition', Ember['default'].$(window).scrollTop());
    }
  });

});
define('nasa/services/youtube-playlists', ['exports', 'ember', 'nasa/utils/get-json'], function (exports, Ember, getJSON) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    index: 0,
    isLoading: false,
    baseUrl: '/api/1/query/ytPlist/',
    playlists: Ember['default'].A(),
    totals: Ember['default'].A(),
    videos: Ember['default'].A(),
    canLoadMore: function() {
      if (this.get('playlists.length') === 0){
       return false;
      }
      if (!this.get('feedLimit')){
        return (this.get('totalResults') > this.get('videos.length'));
      }
      else {
        return (this.get('feedLimit') > this.get('videos.length'));

      }
    }.property('videos.length', 'totalResults', 'feedLimit'),

    loadMore: function(){
      this.set('index',this.get('videos.length'));
    },

    updateVideos: function(){
      var self = this;
      this.get('playlists').forEach(function(id){
        self.loadVideos(id,self.get('index'));
      });
    }.observes('playlists.@each','index'),

    loadVideos: function(id,index){
      var self = this,
          url = this.get('baseUrl') + id.ytPlaylistId;

      var params = {
        feedLimit: id.feedLimit,
        pagesize: 24,
        index: this.get('index'),
      };
      this.set('feedLimit', id.feedLimit);
      if (this.get('feedLimits.length') != this.get('playlists.length')){
      }

      this.set('isLoading',true);
      getJSON['default'](url, params).then(function(response) {
        if (response.data) {
          var videos = response.data.items;
          if (videos) {
            self.set('totalResults', response.data.totalResults);
            videos.forEach(function(vid) {
              var video = {};
              video.promoDateTime = vid.snippet.publishedAt;
              video.title = vid.snippet.title;
              video.plistPosition = vid.snippet.position;
              video.id = vid.snippet.resourceId.videoId;
              video.description = vid.snippet.description;
              if (typeof vid.snippet.thumbnails !== 'undefined') {
                var t = vid.snippet.thumbnails,
                thumb = t.standard || t.high || t.medium;
                video.image = thumb.url;
              }
              video.embedUrl = 'https://www.youtube.com/embed/' + vid.snippet.resourceId.videoId;
              if (!Ember['default'].isNone(vid)) {
                if (self.store.hasRecordForId('yt_card',vid.snippet.resourceId.videoId)) {
                  self.get('videos').pushObject(self.store.getById('yt_card', vid.snippet.resourceId.videoId));
                }
                else {
                  self.store.pushPayload('yt_card', {yt_cards:[video]});
                  self.get('videos').pushObject(self.store.getById('yt_card', vid.snippet.resourceId.videoId));
                }
              }
            });
          }
          self.set('isLoading',false);
          if (self.get('totals.length') != self.get('playlists.length')){
            self.get('totals').pushObject(response.data.totalResults);
          }
        }
      });
    }
  });

});
define('nasa/templates/alltags', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("letter.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "letter.character", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <h3 class=\"letter\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'id': ("item.id")
    },"hashTypes":{'id': "ID"},"hashContexts":{'id': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "item.letter", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n");
    stack1 = helpers.each.call(depth0, "tag", "in", "item.content", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("tag.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" class=\"clearfix\">");
    stack1 = helpers._triageMustache.call(depth0, "tag.name", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div id=\"tags-header\">\n  <h1 class='title'>All Topics A-Z</h1>\n  <div id=\"tag-anchors\">\n");
    stack1 = helpers.each.call(depth0, "letter", "in", "view.letters", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n</div>\n<div id=\"tag-list\">\n");
    stack1 = helpers.each.call(depth0, "item", "in", "view.tagList", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <aside id=\"menu\">\n      ");
    data.buffer.push(escapeExpression(((helpers.outlet || (depth0 && depth0.outlet) || helperMissing).call(depth0, "sidebar", {"name":"outlet","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data}))));
    data.buffer.push("\n    </aside>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.adminTabs", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div id=\"navbar\">");
    data.buffer.push(escapeExpression(((helpers.outlet || (depth0 && depth0.outlet) || helperMissing).call(depth0, "navbar", {"name":"outlet","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</div>\n<div id=\"main\">\n  <div id=\"page-header\">");
    data.buffer.push(escapeExpression(((helpers.outlet || (depth0 && depth0.outlet) || helperMissing).call(depth0, "header", {"name":"outlet","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</div>\n");
    stack1 = helpers['if'].call(depth0, "hasSideRail", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  <section id=\"main-content\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("hasSideRail:side-rail-shut")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <section class=\"wrapper\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("contentHeight")
    },"hashTypes":{'style': "ID"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "view.adminTabs", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        <div id=\"content\">\n          ");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n        </div>\n        ");
    data.buffer.push(escapeExpression(((helpers.outlet || (depth0 && depth0.outlet) || helperMissing).call(depth0, "footer", {"name":"outlet","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data}))));
    data.buffer.push("\n    </section>\n  </section>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/article', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    stack1 = ((helpers['infinite-scroll'] || (depth0 && depth0['infinite-scroll']) || helperMissing).call(depth0, {"name":"infinite-scroll","hash":{
      'action': ("getMore")
    },"hashTypes":{'action': "STRING"},"hashContexts":{'action': depth0},"fn":this.program(2, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("loadingMore::hidden")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      <div class=\"loadingspin\"></div>\n      <div class=\"loadingvoid\"></div>\n    </div>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.each.call(depth0, "item", "in", "related", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(((helpers['ubernode-full'] || (depth0 && depth0['ubernode-full']) || helperMissing).call(depth0, {"name":"ubernode-full","hash":{
      'setAsSelected': ("setSelectedRelated"),
      'selected': ("selectedRelated"),
      'content': ("item")
    },"hashTypes":{'setAsSelected': "STRING",'selected': "ID",'content': "ID"},"hashContexts":{'setAsSelected': depth0,'selected': depth0,'content': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"5":function(depth0,helpers,partials,data) {
    data.buffer.push("    TAP\n");
    },"7":function(depth0,helpers,partials,data) {
    data.buffer.push("    MORE STORIES\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"ubernode-full-wrap\">\n  ");
    data.buffer.push(escapeExpression(((helpers['ubernode-full'] || (depth0 && depth0['ubernode-full']) || helperMissing).call(depth0, {"name":"ubernode-full","hash":{
      'isPrimary': (true),
      'content': ("model")
    },"hashTypes":{'isPrimary': "BOOLEAN",'content': "ID"},"hashContexts":{'isPrimary': depth0,'content': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    stack1 = helpers.unless.call(depth0, "isCollectionAsset", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "footer", {"name":"view","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n</div>\n<span ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":tap-tab sidebarOpen:tab-open:tab-shut")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSidebar", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "sidebarOpen", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(5, data),"inverse":this.program(7, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/articles/header', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
  },"useData":true})

});
define('nasa/templates/articles/sidebar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("                  <li ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":menu-tab showRelated:active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n                    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRelated", true, {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","BOOLEAN"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(">Related</a>\n                  </li>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("                <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":tab-pane :related-scroll-inner showRelated:active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n                    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "story-feed", {"name":"view","hash":{
      'isLatest': (false),
      'content': ("related")
    },"hashTypes":{'isLatest': "BOOLEAN",'content': "ID"},"hashContexts":{'isLatest': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "view.relatedLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("                </div>\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    data.buffer.push("                      <div class=\"loadingspin\"></div>\n");
    },"6":function(depth0,helpers,partials,data) {
    data.buffer.push("        TAP\n");
    },"8":function(depth0,helpers,partials,data) {
    data.buffer.push("        MORE STORIES\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"nav-collapse sidebar articles\"\n    ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("windowHeight")
    },"hashTypes":{'style': "ID"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("\n     style=\"border-right:1px solid #f2f2f2;\"\n    ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("sidebarOpen:show-left-bar")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div>\n        <div justified=\"true\" class=\"ng-isolate-scope\">\n            <ul class=\"nav nav-tabs nav-justified\">\n                <li ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":menu-tab hideRelated:no-related hideRelated:active showRelated::active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n                    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "showRelated", false, {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","BOOLEAN"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(">Latest</a>\n                </li>\n");
    stack1 = helpers.unless.call(depth0, "hideRelated", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("            </ul>\n            <div class=\"tab-content\">\n");
    stack1 = helpers.unless.call(depth0, "hideRelated", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("                <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":tab-pane :latest-scroll-inner showRelated::active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n                    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "story-feed", {"name":"view","hash":{
      'isLatest': (true),
      'content': ("latest")
    },"hashTypes":{'isLatest': "BOOLEAN",'content': "ID"},"hashContexts":{'isLatest': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "view.latestLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("                </div>\n            </div>\n        </div>\n    </div>\n    <span ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":tap-tab sidebarOpen:tab-open:tab-shut")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSidebar", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "sidebarOpen", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.program(8, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    </span>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/add-this', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":addthis_toolbox :addthis_default_style :addthis_32x32_style"),
      'addthis:pubid': ("pid"),
      'addthis:title': ("title"),
      'addthis:url': ("url")
    },"hashTypes":{'class': "STRING",'addthis:pubid': "ID",'addthis:title': "ID",'addthis:url': "ID"},"hashContexts":{'class': depth0,'addthis:pubid': depth0,'addthis:title': depth0,'addthis:url': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n  <a class=\"addthis_button_facebook\"></a>\n  <a class=\"addthis_button_twitter\"></a>\n  <a class=\"addthis_button_google_plusone_share\"></a>\n  <a class=\"addthis_button_pinterest_share\"></a>\n  <a class=\"addthis_button_compact\"></a>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/addthis-follow', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    data.buffer.push("<div class=\"addthis_horizontal_follow_toolbox\"></div>\n");
    },"useData":true})

});
define('nasa/templates/components/alert-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/anyfeed-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a class=\"rss pull-right\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("content.source")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      <img src=\"http://www.nasa.gov/sites/default/themes/NASAPortal/images/feed.png\">\n    </a>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a class=\"rss\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("rss")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      <img src=\"http://www.nasa.gov/sites/default/themes/NASAPortal/images/feed.png\">\n    </a>\n");
    return buffer;
  },"5":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['with'].call(depth0, "single", "as", "feed", {"name":"with","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    stack1 = helpers['if'].call(depth0, "feed.masterImage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.program(9, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    </div>\n      <div class=\"anyfeed-2x2-content\">\n        <h3>\n          <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("feed.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("> ");
    stack1 = helpers._triageMustache.call(depth0, "feed.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n        </h3>\n        <h5>");
    data.buffer.push(escapeExpression(((helpers['moment-time-ago'] || (depth0 && depth0['moment-time-ago']) || helperMissing).call(depth0, "feed.pubdate", {"name":"moment-time-ago","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</h5>\n        ");
    data.buffer.push(escapeExpression(((helpers['truncate-sentence'] || (depth0 && depth0['truncate-sentence']) || helperMissing).call(depth0, "feed.body", 740, {"name":"truncate-sentence","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","NUMBER"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n      </div>\n");
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"anyfeed-2x2-image\" style=\"background-image:url('");
    data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "feed.masterImage", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("')\" >\n");
    return buffer;
  },"9":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"anyfeed-2x2-image\" style=\"background-image:url('");
    data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "content.image.content.crop2x1", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("')\" >\n");
    return buffer;
  },"11":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.each.call(depth0, "feed", "in", "anyfeedNodesSorted", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(12, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"12":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("    <div class=\"anyfeed-feed\">\n");
    stack1 = helpers['if'].call(depth0, "feed.masterImage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(13, data),"inverse":this.program(15, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      <h3>\n        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("feed.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("> ");
    data.buffer.push(escapeExpression(((helpers['truncate-text'] || (depth0 && depth0['truncate-text']) || helperMissing).call(depth0, "feed.title", 50, {"name":"truncate-text","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","NUMBER"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("</a>\n      </h3>\n      <h5>");
    data.buffer.push(escapeExpression(((helpers['moment-time-ago'] || (depth0 && depth0['moment-time-ago']) || helperMissing).call(depth0, "feed.pubdate", {"name":"moment-time-ago","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</h5>\n    </div>\n");
    return buffer;
  },"13":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <div class=\"anyfeed-1x1-image\" style=\"background-image:url('");
    data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "feed.masterImage", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("')\">\n");
    return buffer;
  },"15":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "hasAltImage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(16, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"16":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <div class=\"anyfeed-1x1-image\" style=\"background-image:url('");
    data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "content.image.content.crop1x1", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("')\">\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"title\">\n  <h2 class=\"pull-left\">\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("feedLink")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n  </h2>\n");
    stack1 = helpers['if'].call(depth0, "content.source", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(3, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    stack1 = helpers['if'].call(depth0, "is2x2", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(5, data),"inverse":this.program(11, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/calendar-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("      <div class=\"calendarname\">");
    stack1 = helpers._triageMustache.call(depth0, "calendarLink.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"link\">\n        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("calendarLink.url")
    },"hashTypes":{'href': "STRING"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">Full Calendar</a>\n      </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div class=\"bg-calendar-card-panel text\">\n  <div class=\"content\">\n");
    stack1 = helpers['if'].call(depth0, "calendarLink.title", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    <div class=\"calendar-card-container\"></div>\n");
    stack1 = helpers['if'].call(depth0, "calendarLink.url", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/close-button', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"close\">\n  <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "goBack", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(" class=\"back-btn\">\n    <span>Close</span>\n    <span class=\"gallery-close\"></span>\n  </a>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/collapsible-section', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    data.buffer.push("  <div class=\"fadeout\"></div>\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers._triageMustache.call(depth0, "yield", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "showFadeout", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/countdown-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"layer\">\n  ");
    data.buffer.push(escapeExpression(((helpers['counter-block'] || (depth0 && depth0['counter-block']) || helperMissing).call(depth0, {"name":"counter-block","hash":{
      'date': ("content.date")
    },"hashTypes":{'date': "ID"},"hashContexts":{'date': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n</div>\n<div class=\"headline\">\n  ");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/counter-block', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers._triageMustache.call(depth0, "counter", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/disqus-section', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push(escapeExpression(((helpers['disqus-comments'] || (depth0 && depth0['disqus-comments']) || helperMissing).call(depth0, {"name":"disqus-comments","hash":{
      'title': ("title"),
      'identifier': ("identifier")
    },"hashTypes":{'title': "ID",'identifier': "ID"},"hashContexts":{'title': depth0,'identifier': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/embed-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"headline\">\n  ");
    stack1 = helpers._triageMustache.call(depth0, "embedTitle", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n<iframe ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("embedSrc")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/ember-youtube', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<menu class=\"EmberYoutube-controls\">\n	<button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "togglePlay", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers['if'].call(depth0, "isPlaying", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.program(4, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</button>\n	<button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVolume", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers['if'].call(depth0, "isMuted", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.program(8, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</button>\n</menu>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    data.buffer.push("Pause");
    },"4":function(depth0,helpers,partials,data) {
    data.buffer.push("Play");
    },"6":function(depth0,helpers,partials,data) {
    data.buffer.push("Unmute");
    },"8":function(depth0,helpers,partials,data) {
    data.buffer.push("Mute");
    },"10":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("	<p class=\"EmberYoutube-time\">\n		");
    stack1 = helpers._triageMustache.call(depth0, "currentTimeFormatted", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("/");
    stack1 = helpers._triageMustache.call(depth0, "durationFormatted", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n	</p>\n");
    return buffer;
  },"12":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("	<p class=\"EmberYoutube-progress\">\n		<progress ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'max': ("duration"),
      'value': ("currentTime")
    },"hashTypes":{'max': "ID",'value': "ID"},"hashContexts":{'max': depth0,'value': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("></progress>\n	</p>\n");
    return buffer;
  },"14":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("	<p class=\"EmberYoutube-debug\"><code>\n		ytid: ");
    stack1 = helpers._triageMustache.call(depth0, "ytid", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n		state: ");
    stack1 = helpers._triageMustache.call(depth0, "playerState", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n		isMuted: ");
    stack1 = helpers._triageMustache.call(depth0, "isMuted", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n		isPlaying: ");
    stack1 = helpers._triageMustache.call(depth0, "isPlaying", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n	</code></p>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div id=\"EmberYoutube-player\"></div>\n\n");
    stack1 = helpers['if'].call(depth0, "showControls", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "showTime", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(10, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "showProgress", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(12, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "showDebug", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(14, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/event-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("  <h4>\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'target': ("countdownEvent.target"),
      'href': ("countdownEvent.url")
    },"hashTypes":{'target': "ID",'href': "ID"},"hashContexts":{'target': depth0,'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      ");
    stack1 = helpers._triageMustache.call(depth0, "countdownEvent.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n    </a>\n  </h4>\n\n  ");
    data.buffer.push(escapeExpression(((helpers['counter-block'] || (depth0 && depth0['counter-block']) || helperMissing).call(depth0, {"name":"counter-block","hash":{
      'date': ("content.date")
    },"hashTypes":{'date': "ID"},"hashContexts":{'date': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <div class=\"title\">\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'target': ("event.target"),
      'href': ("event.url")
    },"hashTypes":{'target': "ID",'href': "ID"},"hashContexts":{'target': depth0,'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "event.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n  </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<h4 ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("content.countdown:has-countdown:no-countdown")
    },"hashTypes":{'class': "ID"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "cardTitle", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h4>\n\n");
    stack1 = helpers['if'].call(depth0, "content.countdown", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers.each.call(depth0, "event", "in", "sortedLinks", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n<div class=\"event-bottom\">\n  <a class=\"event-link\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("calendar.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "calendar.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n  <a class=\"event-link\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("launch.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "launch.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n</div>");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/gov-delivery', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("    <span class=\"heading gov-delivery-text\">Subscribe to ");
    stack1 = helpers._triageMustache.call(depth0, "text", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    data.buffer.push("    <span class=\"heading gov-delivery-text\">Subscribe to Email Updates</span>    \n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<section id=\"subscribe\">\n  <div class=\"header\">\n");
    stack1 = helpers['if'].call(depth0, "text", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(3, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n  <div class=\"content\">\n    <form name=\"govdelivery\"  class=\"input-group\">\n      ");
    data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
      'valueBinding': ("email"),
      'placeholder': ("Enter your Email"),
      'class': ("form-control"),
      'type': ("text")
    },"hashTypes":{'valueBinding': "STRING",'placeholder': "STRING",'class': "STRING",'type': "STRING"},"hashContexts":{'valueBinding': depth0,'placeholder': depth0,'class': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n      <span class=\"input-group-btn\">\n        <button type=\"submit\" name=\"subscribe_button\" class=\"btn btn-primary\"");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "quickSubscribe", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">\n          Submit\n        </button>\n      </span>\n    </form>\n  </div>\n</section>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/infinite-scroll', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;
    stack1 = helpers._triageMustache.call(depth0, "yield", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    else { data.buffer.push(''); }
    },"useData":true})

});
define('nasa/templates/components/jw-player', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'id': ("playerId")
    },"hashTypes":{'id': "ID"},"hashContexts":{'id': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("></div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/list-link', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("link.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n  ");
    stack1 = helpers._triageMustache.call(depth0, "link.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n</a>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/listing-pager', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "view.showHeaderNav", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <div class=\"pager-header\">\n      ");
    data.buffer.push(escapeExpression(((helpers.partial || (depth0 && depth0.partial) || helperMissing).call(depth0, "listing-pager-nav", {"name":"partial","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data}))));
    data.buffer.push("\n    </div>\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(5, data),"inverse":this.program(7, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"5":function(depth0,helpers,partials,data) {
    data.buffer.push("      <br><br>\n      <div class=\"loadingspin\"></div>\n      <br><br>\n");
    },"7":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"listing-noresults\">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "noResultsText", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</div>\n");
    return buffer;
  },"9":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "itemTemplate", {"name":"view","hash":{
      'content': ("node")
    },"hashTypes":{'content': "ID"},"hashContexts":{'content': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    return buffer;
  },"11":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "view.showFooterNav", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(12, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"12":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <div class=\"pager-footer\">\n      ");
    data.buffer.push(escapeExpression(((helpers.partial || (depth0 && depth0.partial) || helperMissing).call(depth0, "listing-pager-nav", {"name":"partial","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data}))));
    data.buffer.push("\n    </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "view.showPager", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n<div class=\"page-content\">\n");
    stack1 = helpers.unless.call(depth0, "hasContent", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers.each.call(depth0, "node", "in", "currentPageContent", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(9, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n\n");
    stack1 = helpers['if'].call(depth0, "view.showPager", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(11, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/mobilerider-player', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers._triageMustache.call(depth0, "yield", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/multiselect-checkboxes', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "hasBlock", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.program(4, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers['yield'] || (depth0 && depth0['yield']) || helperMissing).call(depth0, "checkbox.label", "checkbox.isSelected", {"name":"yield","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","ID"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <li>\n      <label>\n        ");
    data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
      'disabled': ("disabled"),
      'checked': ("checkbox.isSelected"),
      'type': ("checkbox")
    },"hashTypes":{'disabled': "ID",'checked': "ID",'type': "STRING"},"hashContexts":{'disabled': depth0,'checked': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n        ");
    stack1 = helpers._triageMustache.call(depth0, "checkbox.label", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n      </label>\n    </li>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.each.call(depth0, "checkbox", "in", "checkboxes", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/navbar-social', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"addthis_toolbox addthis_default_style\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'addthis:pubid': ("pid"),
      'addthis:title': ("title"),
      'addthis:url': ("url")
    },"hashTypes":{'addthis:pubid': "ID",'addthis:title': "ID",'addthis:url': "ID"},"hashContexts":{'addthis:pubid': depth0,'addthis:title': depth0,'addthis:url': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" addthis:ui_click=true addthis:ui_508_compliant=true>\n  <a id=\"follow\" class=\"addthis_button_compact\"><span></span></a>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/page-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("  <a>");
    stack1 = helpers._triageMustache.call(depth0, "page", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "setCurrent", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "page", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isDots", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(3, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/pagination-pager', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <li ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":previous isFirst:disabled")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("previousUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "previous", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "paginationPrevious", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n  </li>\n\n");
    stack1 = helpers.each.call(depth0, "page", "in", "pages", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n  <li ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":next isLast:disabled")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("nextUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "paginationNext", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n  </li>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers['page-item'] || (depth0 && depth0['page-item']) || helperMissing).call(depth0, {"name":"page-item","hash":{
      'pageSet': ("pageChanged"),
      'urlTemplate': ("urlTemplate"),
      'seperator': ("seperator"),
      'selected': ("current"),
      'page': ("page")
    },"hashTypes":{'pageSet': "STRING",'urlTemplate': "ID",'seperator': "ID",'selected': "ID",'page': "ID"},"hashContexts":{'pageSet': depth0,'urlTemplate': depth0,'seperator': depth0,'selected': depth0,'page': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <li ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("pagerSpread:previous isFirst:disabled")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("previousUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "previous", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "pagerPrevious", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n  </li>\n\n  <li ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("pagerSpread:next isLast:disabled")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("nextUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "pagerNext", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n  </li>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.unless.call(depth0, "pager", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(4, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/preloadable-image', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"css_spinner\"></div>\n<img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("src")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" class=\"img-responsive\"/>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/proxy-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  ");
    data.buffer.push(escapeExpression(((helpers['dynamic-component'] || (depth0 && depth0['dynamic-component']) || helperMissing).call(depth0, {"name":"dynamic-component","hash":{
      'cardSize': ("content.cardFeedSize"),
      'content': ("content.card"),
      'type': ("content.card.constructor.typeKey")
    },"hashTypes":{'cardSize': "ID",'content': "ID",'type': "ID"},"hashContexts":{'cardSize': depth0,'content': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "content.card.constructor.typeKey", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/sidebar-section', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("  <div class=\"header\">\n    <span class=\"heading\">");
    stack1 = helpers._triageMustache.call(depth0, "header", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>\n  </div>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("      <ul>\n");
    stack1 = helpers.each.call(depth0, "link", "in", "links", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </ul>\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("          <li class=\"custom-link\">\n            <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("link.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n              ");
    data.buffer.push(escapeExpression(((helpers['truncate-text'] || (depth0 && depth0['truncate-text']) || helperMissing).call(depth0, "link.title", 43, {"name":"truncate-text","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","NUMBER"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push(escapeExpression(((helpers['truncate-text'] || (depth0 && depth0['truncate-text']) || helperMissing).call(depth0, "link.name", 43, {"name":"truncate-text","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","NUMBER"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n            </a>\n          </li>\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("      <ul>\n");
    stack1 = helpers['if'].call(depth0, "tags", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        <li><a href=\"/topics\">All Topics A-Z</a></li>\n      </ul>\n");
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.each.call(depth0, "tag", "in", "tags", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(8, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"8":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <li>\n              <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("tag.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n                ");
    stack1 = helpers._triageMustache.call(depth0, "tag.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n              </a>\n            </li>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<section>\n");
    stack1 = helpers['if'].call(depth0, "header", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n  <div class=\"content\">\n");
    stack1 = helpers['if'].call(depth0, "links", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "tagSection", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n</section>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/snippet-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "hasText", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.program(9, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"content\">\n");
    stack1 = helpers['if'].call(depth0, "content.link", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.program(5, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.description", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n        <ul>\n");
    stack1 = helpers.each.call(depth0, "link", "in", "content.links", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        </ul>\n      </div>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <a class=\"title\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("content.link")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n          <h3>");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n        </a>\n");
    return buffer;
  },"5":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("          <h3 class=\"title\">");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n");
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("link.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "link.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a></li>\n");
    return buffer;
  },"9":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "content.image", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(10, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"10":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "content.link", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(11, data),"inverse":this.program(13, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        <div class=\"headline\">\n          ");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n        </div>\n");
    return buffer;
  },"11":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("content.link")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n          <div class=\"bg-card-canvas\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("style")
    },"hashTypes":{'style': "STRING"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("></div>\n        </a>\n");
    return buffer;
  },"13":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <div class=\"bg-card-canvas\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("style")
    },"hashTypes":{'style': "STRING"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("></div>\n");
    return buffer;
  },"15":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("\n");
    stack1 = helpers.unless.call(depth0, "textOnly2x2", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(16, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n  <div class=\"content\">\n");
    stack1 = helpers['if'].call(depth0, "content.link", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(18, data),"inverse":this.program(20, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.description", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "content.links", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(22, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n");
    return buffer;
  },"16":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("content.link")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("style"),
      'class': (":bg-card-canvas")
    },"hashTypes":{'style': "STRING",'class': "STRING"},"hashContexts":{'style': depth0,'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("></div>\n    </a>\n");
    return buffer;
  },"18":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a class=\"title\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("content.link")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      <h3>");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n    </a>\n");
    return buffer;
  },"20":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("      <h3 class=\"title\">");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n");
    return buffer;
  },"22":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("      <ul>\n");
    stack1 = helpers.each.call(depth0, "link", "in", "content.links", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(23, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </ul>\n");
    return buffer;
  },"23":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("link.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "link.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a></li>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":snippet-card width hasImage hasText")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "small", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(15, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/social-sidebar-section', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<section id=\"social\">\n  <div class=\"header\">\n    <span class=\"heading\">Follow</span>\n  </div>\n  <div class=\"content\">\n      ");
    data.buffer.push(escapeExpression(((helpers['addthis-follow'] || (depth0 && depth0['addthis-follow']) || helperMissing).call(depth0, {"name":"addthis-follow","hash":{
      'pubid': ("pubID")
    },"hashTypes":{'pubid': "ID"},"hashContexts":{'pubid': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "allSocialMediaLink", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n</section>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "allSocialMediaLink.url", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <ul>\n          <li class=\"custom-link\">\n          <a id=\"all-social\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("allSocialMediaLink.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "allSocialMediaLink.url", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.program(6, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("          </a>\n          </li>\n        </ul>\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("              ");
    stack1 = helpers._triageMustache.call(depth0, "allSocialMediaLink.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("allSocialMediaLink.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("\n");
    return buffer;
  },"8":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  ");
    data.buffer.push(escapeExpression(((helpers['gov-delivery'] || (depth0 && depth0['gov-delivery']) || helperMissing).call(depth0, {"name":"gov-delivery","hash":{
      'text': ("govDeliveryText"),
      'code': ("govDeliveryId"),
      'accountCode': ("USNASA")
    },"hashTypes":{'text': "ID",'code': "ID",'accountCode': "STRING"},"hashContexts":{'text': depth0,'code': depth0,'accountCode': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "pubID", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "govDeliveryId", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(8, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/stmd-search', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a class=\"btn btn-link\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "doReset", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">Reset</a> \n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("  <hr/>\n  <h2>Results</h2>\n");
    stack1 = helpers.each.call(depth0, "item", "in", "subArray", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.program(6, data),"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <div class=\"result\">\n     <h4>\n       <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("item.fields.source")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "item.fields.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n      </h4>\n      <p>");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.highlights.content", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</p>\n    </div>\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.program(9, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    data.buffer.push("      <i class='darkloadingspin'></i>\n");
    },"9":function(depth0,helpers,partials,data) {
    data.buffer.push("      <p>No results to display</p>\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<h1>Search</h1>\n<div class=\"input-group\">\n  <label for=\"keywords\">Keywords</label>\n  ");
    data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
      'value': ("keywords"),
      'on': ("enter"),
      'action': ("doSearch"),
      'id': ("keywords"),
      'class': ("form-control"),
      'type': ("text")
    },"hashTypes":{'value': "ID",'on': "STRING",'action': "STRING",'id': "STRING",'class': "STRING",'type': "STRING"},"hashContexts":{'value': depth0,'on': depth0,'action': depth0,'id': depth0,'class': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n</div>\n<div class=\"input-group\">\n  <label>Areas</label>\n  ");
    data.buffer.push(escapeExpression(((helpers['multiselect-checkboxes'] || (depth0 && depth0['multiselect-checkboxes']) || helperMissing).call(depth0, {"name":"multiselect-checkboxes","hash":{
      'selection': ("selectedTerms"),
      'valueProperty': ("id"),
      'labelProperty': ("name"),
      'options': ("sortedTerms")
    },"hashTypes":{'selection': "ID",'valueProperty': "STRING",'labelProperty': "STRING",'options': "ID"},"hashContexts":{'selection': depth0,'valueProperty': depth0,'labelProperty': depth0,'options': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n</div>\n\n<div class=\"btn-group\">\n  <a class=\"btn btn-primary\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "doSearch", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">Search</a> \n");
    stack1 = helpers['if'].call(depth0, "canReset", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n\n");
    data.buffer.push(escapeExpression(((helpers['pagination-pager'] || (depth0 && depth0['pagination-pager']) || helperMissing).call(depth0, {"name":"pagination-pager","hash":{
      'paginationPrevious': ("Previous"),
      'paginationNext': ("Next"),
      'hide': (true),
      'count': ("totalPages"),
      'current': ("current")
    },"hashTypes":{'paginationPrevious': "STRING",'paginationNext': "STRING",'hide': "BOOLEAN",'count': "ID",'current': "ID"},"hashContexts":{'paginationPrevious': depth0,'paginationNext': depth0,'hide': depth0,'count': depth0,'current': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n\n");
    stack1 = helpers['if'].call(depth0, "hasSearched", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    data.buffer.push(escapeExpression(((helpers['pagination-pager'] || (depth0 && depth0['pagination-pager']) || helperMissing).call(depth0, {"name":"pagination-pager","hash":{
      'paginationPrevious': ("Previous"),
      'paginationNext': ("Next"),
      'hide': (true),
      'count': ("totalPages"),
      'current': ("current")
    },"hashTypes":{'paginationPrevious': "STRING",'paginationNext': "STRING",'hide': "BOOLEAN",'count': "ID",'current': "ID"},"hashContexts":{'paginationPrevious': depth0,'paginationNext': depth0,'hide': depth0,'count': depth0,'current': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/sub-nav', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "topics", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("  <div id=\"topics\" class=\"col-md-12 missions\">\n    <ul>\n");
    stack1 = helpers['if'].call(depth0, "pageTitle", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers.each.call(depth0, "topic", "in", "topics", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(5, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    </ul>\n  </div>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <li id=\"topic-level\">\n          <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":mobile :topics-toggle isActive::not-active"),
      'href': ("url")
    },"hashTypes":{'class': "STRING",'href': "ID"},"hashContexts":{'class': depth0,'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" onclick=\"$( '#topics ul' ).toggleClass( 'open' )\">\n            ");
    stack1 = helpers._triageMustache.call(depth0, "pageTitle", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n          <span class=\"glyphicon glyphicon-chevron-down pull-right\"></span>\n          </a>\n        </li>\n");
    return buffer;
  },"5":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(((helpers['list-link'] || (depth0 && depth0['list-link']) || helperMissing).call(depth0, {"name":"list-link","hash":{
      'subClass': ("sub-topic"),
      'link': ("topic")
    },"hashTypes":{'subClass': "STRING",'link': "ID"},"hashContexts":{'subClass': depth0,'link': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    data.buffer.push("<div class=\"topics-spacer\"></div>\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.unless.call(depth0, "showTopicsMenu", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(7, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/tag-block', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/tag-list', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("tag.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "tag.name", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a><span class=\"comma\">,</span>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<h5 class=\"tags\">Tags:&nbsp;\n");
    stack1 = helpers.each.call(depth0, "tag", "in", "tags", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h5>");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/text-ellipsis', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<p>");
    stack1 = helpers._triageMustache.call(depth0, "text", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/text-truncate', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div class=\"hiddenz\">\n  ");
    stack1 = helpers._triageMustache.call(depth0, "processingText", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers._triageMustache.call(depth0, "truncatedText", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isProcessing", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(3, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/tv-player', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <h3>NASA TV</h3>\n");
    stack1 = helpers['if'].call(depth0, "useMrPlayer", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "useIframe", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n  <div id=\"channels\">\n    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeChannel", "public", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("isPublic:active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" href=\"\">\n      <div class=\"audience\">\n        Public\n        ");
    stack1 = helpers['if'].call(depth0, "isPublic", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n      </div>\n    </a>\n    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeChannel", "education", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("isEdu:active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" href=\"\">\n      <div class=\"audience\">\n        Education\n        ");
    stack1 = helpers['if'].call(depth0, "isEdu", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n      </div>\n    </a>\n    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeChannel", "media", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("isMedia:active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" href=\"\">\n      <div class=\"audience\">\n        Media\n        ");
    stack1 = helpers['if'].call(depth0, "isMedia", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n      </div>\n    </a>\n    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeChannel", "iss", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","STRING"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("isIss:active")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" href=\"\">\n      <div class=\"audience\">\n        HD ISS Views\n        ");
    stack1 = helpers['if'].call(depth0, "isIss", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n      </div>\n    </a>\n  </div>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <div class=\"player-wrapper\">\n    ");
    data.buffer.push(escapeExpression(((helpers['mobilerider-player'] || (depth0 && depth0['mobilerider-player']) || helperMissing).call(depth0, {"name":"mobilerider-player","hash":{
      'autostart': ("true"),
      'streamId': ("selectedChannel.streamId")
    },"hashTypes":{'autostart': "STRING",'streamId': "ID"},"hashContexts":{'autostart': depth0,'streamId': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n    </div>\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    data.buffer.push("    <div id=\"ustream-player\" class=\"player-wrapper video-player ustream\">\n      <iframe id=\"ISSstream\" width=\"757\" height=\"423\" src=\"//www.ustream.tv/embed/17074538\"></iframe>\n    </div>\n");
    },"6":function(depth0,helpers,partials,data) {
    data.buffer.push("<span class=\"glyphicon glyphicon-check pull-right\"></span>");
    },"8":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "showIssPlayer", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(9, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  <div class=\"infopane\">\n    <div class=\"title\">\n      Click to Watch Channel\n    </div>\n    <div id=\"channels\" class=\"channels tv-mobile\">\n");
    stack1 = helpers.each.call(depth0, "channel", "in", "channels", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(11, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    </div>\n  </div>\n");
    return buffer;
  },"9":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers.partial || (depth0 && depth0.partial) || helperMissing).call(depth0, "partials/issPlayer", {"name":"partial","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"11":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("channel.file")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeChannel", "channel.key", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(">\n          <div class=\"audience\">");
    stack1 = helpers._triageMustache.call(depth0, "channel.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n        </a>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "hasFlash", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(8, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/tv-schedule', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"control-container\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {"name":"view","hash":{
      'value': ("selectedTime"),
      'optionValuePath': ("content.value"),
      'optionLabelPath': ("content.title"),
      'content': ("timeOptions")
    },"hashTypes":{'value': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'content': "ID"},"hashContexts":{'value': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n      </div>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"headers clearfix\">\n        <div class=\"channel-header\">\n");
    stack1 = helpers['if'].call(depth0, "isLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.program(6, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        </div>\n        <div class=\"time-header-container\">\n          <img class=\"left-arrow\" src=\"/sites/default/themes/NASAPortal/images/tv-arrow-left.png\" alt=\"\" title=\"Previous\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "back", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">\n          <div class=\"time-header\">\n");
    stack1 = helpers.each.call(depth0, "time", "in", "timeRange", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(8, data),"inverse":this.program(10, data),"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("          </div>\n          <div class=\"right-arrow-header\">\n            <img class=\"right-arrow\" src=\"/sites/default/themes/NASAPortal/images/tv-arrow-right.png\" alt=\"\" title=\"Next\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "forward", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">\n          </div>\n        </div>\n      </div>\n");
    stack1 = helpers.each.call(depth0, "channel", "in", "channels", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(12, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    data.buffer.push("            <div class=\"channel-label\">Loading...</div>\n");
    },"6":function(depth0,helpers,partials,data) {
    data.buffer.push("            <div class=\"channel-label\">Channel</div>\n");
    },"8":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("              <div class=\"time-container\">\n                <div class=\"time-value\">");
    stack1 = helpers._triageMustache.call(depth0, "time", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n              </div>\n");
    return buffer;
  },"10":function(depth0,helpers,partials,data) {
    data.buffer.push("              Loading...\n");
    },"12":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <div class=\"channel-row channel-row-");
    data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "channel.tid", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push(" clearfix\">\n          <div class=\"channel-info\">\n            <div>\n              <p class=\"channel-name\">");
    stack1 = helpers._triageMustache.call(depth0, "channel.name", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n              <p class=\"daily-list-view\"><a href=\"#\" class=\"list-view-link\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeChannel", "channel.tid", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(">Daily List View</a></p>\n            </div>\n          </div>\n          <div class=\"channel-events\">Loading...</div>\n        </div>\n");
    return buffer;
  },"14":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(15, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers.each.call(depth0, "channel", "in", "channels", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(17, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"15":function(depth0,helpers,partials,data) {
    data.buffer.push("        <br/>\n        <h3 style=\"color: black;\">Loading...</h3>\n        <br/>\n");
    },"17":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <div class=\"channel-list-container channel-list-container-");
    data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "channel.tid", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\">\n          <div class=\"channel-list-header\">");
    stack1 = helpers._triageMustache.call(depth0, "channel.name", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n          <div class=\"channel-list channel-list-");
    data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "channel.tid", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\">loading...</div>\n        </div>\n");
    return buffer;
  },"19":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <div class=\"infopane tv-debug\">\n    <div class=\"title\">TV Debug Data</div>\n    <div class=\"body clearfix\">\n      Disable Overlays ");
    data.buffer.push(escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, {"name":"input","hash":{
      'checked': ("disableOverlays"),
      'type': ("checkbox")
    },"hashTypes":{'checked': "ID",'type': "STRING"},"hashContexts":{'checked': depth0,'type': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n      <br/>\n      ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "debugHTML", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n    </div>\n  </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<div id=\"nasa-tv-schedule\">\n  <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("displayIsRow::list-view :tv_timeline_container")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div class=\"controls\">\n      <div class=\"control-container title\">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</div>\n      <div class=\"control-container\">\n        ");
    data.buffer.push(escapeExpression(((helpers['date-picker'] || (depth0 && depth0['date-picker']) || helperMissing).call(depth0, {"name":"date-picker","hash":{
      'readonly': ("readonly"),
      'format': ("ddd, MMM Do"),
      'class': ("tv-datepicker"),
      'value': ("selectedDate")
    },"hashTypes":{'readonly': "STRING",'format': "STRING",'class': "STRING",'value': "ID"},"hashContexts":{'readonly': depth0,'format': depth0,'class': depth0,'value': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n      </div>\n");
    stack1 = helpers['if'].call(depth0, "displayIsRow", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      <div class=\"control-container\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {"name":"view","hash":{
      'class': ("timezone"),
      'value': ("selectedTimezone"),
      'optionValuePath': ("content.offset"),
      'optionLabelPath': ("content.title"),
      'content': ("timezones")
    },"hashTypes":{'class': "STRING",'value': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'content': "ID"},"hashContexts":{'class': depth0,'value': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n      </div>\n      <div class=\"control-container\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {"name":"view","hash":{
      'value': ("selectedChannel"),
      'optionValuePath': ("content.tid"),
      'optionLabelPath': ("content.name"),
      'content': ("channelOptions")
    },"hashTypes":{'value': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'content': "ID"},"hashContexts":{'value': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n      </div>\n    </div>\n");
    stack1 = helpers['if'].call(depth0, "displayIsRow", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.program(14, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    <div id=\"tv-timeline-dialog\">\n      <div class=\"dialog-title\"><span class=\"dialog-close\">CLOSE <b>X</b></span></div>\n      <div class=\"dialog-image\"></div>\n      <div class=\"dialog-contents\"></div>\n    </div>\n  </div>\n</div>\n\n");
    stack1 = helpers['if'].call(depth0, "isDebugging", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(19, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/twitter-embed-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<a class=\"twitter-timeline\" data-dnt=\"true\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'data-widget-id': ("embedId")
    },"hashTypes":{'data-widget-id': "ID"},"hashContexts":{'data-widget-id': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">Loading Twitter Feed</a>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/uber-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    data.buffer.push("      <span class=\"dogear\"></span>\n      <span class=\"camera\"></span>\n");
    },"3":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"headline\">\n");
    stack1 = helpers['if'].call(depth0, "tag", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(((helpers['html-safe'] || (depth0 && depth0['html-safe']) || helperMissing).call(depth0, "nodeTitle", {"name":"html-safe","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("\n      </div>\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <div class=\"tag\">");
    data.buffer.push(escapeExpression(((helpers['tag-block'] || (depth0 && depth0['tag-block']) || helperMissing).call(depth0, {"name":"tag-block","hash":{
      'title': ("tag.title"),
      'href': ("tag.url")
    },"hashTypes":{'title': "ID",'href': "ID"},"hashContexts":{'title': depth0,'href': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("</div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"bg-card-canvas\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("style")
    },"hashTypes":{'style': "STRING"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "isImage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "hasNodeTitle", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/ubernode-full', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(((helpers['tag-block'] || (depth0 && depth0['tag-block']) || helperMissing).call(depth0, {"name":"tag-block","hash":{
      'title': ("primaryTag.title"),
      'href': ("primaryTag.url")
    },"hashTypes":{'title': "ID",'href': "ID"},"hashContexts":{'title': depth0,'href': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "image", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("image.full")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'alt': ("image.alt"),
      'src': ("image.crop")
    },"hashTypes":{'alt': "ID",'src': "ID"},"hashContexts":{'alt': depth0,'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" /></a>\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("        <div class=\"press-release-info\">\n");
    stack1 = helpers['if'].call(depth0, "promoDateTime", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "isPressRelease", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(9, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        </div>\n");
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <div class=\"pr-promo-date-time\">");
    data.buffer.push(escapeExpression(((helpers['ap-date'] || (depth0 && depth0['ap-date']) || helperMissing).call(depth0, "promoDateTime", {"name":"ap-date","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</div>\n");
    return buffer;
  },"9":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "releaseType", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(10, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"10":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("            <div class=\"pr-promo-release-type-id\">\n              ");
    stack1 = helpers.each.call(depth0, "type", "in", "releaseType", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(11, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n              ");
    stack1 = helpers['if'].call(depth0, "releaseId", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(13, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n            </div>\n");
    return buffer;
  },"11":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<span class=\"release-type\">");
    stack1 = helpers._triageMustache.call(depth0, "type.name", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>");
    return buffer;
  },"13":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<span class=\"release-id\">");
    stack1 = helpers._triageMustache.call(depth0, "releaseId", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>");
    return buffer;
  },"15":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div class=\"feature-image-container\">\n        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("image.full")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":feature-image"),
      'alt': ("image.alt"),
      'src': ("image.crop")
    },"hashTypes":{'class': "STRING",'alt': "ID",'src': "ID"},"hashContexts":{'class': depth0,'alt': depth0,'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" /></a>\n      </div>\n");
    stack1 = helpers['if'].call(depth0, "linkurl", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(16, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"16":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("        <div class=\"gallery-link\">\n          <a href=\"");
    stack1 = helpers.unbound.call(depth0, "linkurl", {"name":"unbound","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\"><span class=\"glyphicon glyphicon-chevron-left\"></span> Back to Gallery</a>\n        </div>\n");
    return buffer;
  },"18":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    stack1 = helpers['if'].call(depth0, "setToUseVertImage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(19, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      <div class=\"text\">\n");
    stack1 = helpers['if'].call(depth0, "hasPodcast", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(25, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "hasVodcast", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(32, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n        ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "body", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n\n");
    stack1 = helpers['if'].call(depth0, "isFeature", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(39, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "content.ubernodePrContacts", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(42, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        <div class=\"editor-info\">\n          <div class=\"date\">Last Updated: ");
    data.buffer.push(escapeExpression(((helpers['ap-date'] || (depth0 && depth0['ap-date']) || helperMissing).call(depth0, "content.changed", {"name":"ap-date","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</div>\n          <div class=\"editor\">Editor: ");
    stack1 = helpers._triageMustache.call(depth0, "author", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n        </div>\n");
    stack1 = helpers['if'].call(depth0, "showDisqus", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(44, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </div>\n");
    return buffer;
  },"19":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <div class=\"side-image\">\n          <div class=\"vert-banner\">\n            <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("image.full")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'alt': ("image.alt"),
      'src': ("image.crop")
    },"hashTypes":{'alt': "ID",'src': "ID"},"hashContexts":{'alt': depth0,'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" /></a>\n          </div>\n");
    stack1 = helpers['if'].call(depth0, "hasCaptionOrCredit", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(20, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        </div>\n");
    return buffer;
  },"20":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("            <div class=\"dnd-legend-wrapper\">\n");
    stack1 = helpers['if'].call(depth0, "masterImageCaption", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(21, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "imageCredits", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(23, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("            </div>\n");
    return buffer;
  },"21":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("              <div class=\"caption\">");
    stack1 = helpers._triageMustache.call(depth0, "masterImageCaption", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"23":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("              <div class=\"credits\"><b><i>Image Credit: ");
    stack1 = helpers._triageMustache.call(depth0, "imageCredits", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</i></b></div>\n");
    return buffer;
  },"25":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("          <ul class=\"podcast mediacast\">\n");
    stack1 = helpers['if'].call(depth0, "podcast", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(26, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "podcastRssUrl", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(28, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "podcastItunesUrl", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(30, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("          </ul>\n");
    return buffer;
  },"26":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("podcast.path")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">Listen Now</a></li>\n");
    return buffer;
  },"28":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("podcastRssUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img src=\"/sites/all/themes/custom/nasatwo/images/rss.png\" alt=\"Subscribe\"/></a></li>\n");
    return buffer;
  },"30":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("podcastItunesUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img src=\"/sites/all/themes/custom/nasatwo/images/itunes.png\" alt=\"Subscribe on iTunes\"/></a></li>\n");
    return buffer;
  },"32":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("          <ul class=\"vodcast mediacast\">\n");
    stack1 = helpers['if'].call(depth0, "vodcast", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(33, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "vodcastRssUrl", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(35, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "vodcastItunesUrl", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(37, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("          </ul>\n");
    return buffer;
  },"33":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("vodcast.path")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">Watch Now</a></li>\n");
    return buffer;
  },"35":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("vodcastRssUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img src=\"/sites/all/themes/custom/nasatwo/images/rss.png\" alt=\"Subscribe\"/></a></li>\n");
    return buffer;
  },"37":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              <li><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("vodcastItunesUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img src=\"/sites/all/themes/custom/nasatwo/images/itunes.png\" alt=\"Subscribe on iTunes\"/></a></li>\n");
    return buffer;
  },"39":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "content.credits", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(40, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"40":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <div class=\"feature-credits\">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.credits", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</div>\n");
    return buffer;
  },"42":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("           <div class=\"pr-contacts\">\n             <div class=\"text\">\n               ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.ubernodePrContacts", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n             </div>\n          </div>\n");
    return buffer;
  },"44":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          ");
    data.buffer.push(escapeExpression(((helpers['disqus-section'] || (depth0 && depth0['disqus-section']) || helperMissing).call(depth0, {"name":"disqus-section","hash":{
      'remove': ("hideDisqus"),
      'title': ("title"),
      'identifier': ("content.id")
    },"hashTypes":{'remove': "ID",'title': "ID",'identifier': "ID"},"hashContexts":{'remove': depth0,'title': depth0,'identifier': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"46":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      ");
    data.buffer.push(escapeExpression(((helpers['tag-list'] || (depth0 && depth0['tag-list']) || helperMissing).call(depth0, {"name":"tag-list","hash":{
      'tags': ("tags")
    },"hashTypes":{'tags': "ID"},"hashContexts":{'tags': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"48":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <a class=\"btn btn-primary article-toggle\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleCollapse", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "isOpen", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(49, data),"inverse":this.program(51, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </a>\n");
    return buffer;
  },"49":function(depth0,helpers,partials,data) {
    data.buffer.push("          Show Less\n");
    },"51":function(depth0,helpers,partials,data) {
    data.buffer.push("          Read Full Article\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("ubernodeType"),
      'id': ("id")
    },"hashTypes":{'class': "ID",'id': "ID"},"hashContexts":{'class': depth0,'id': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n  <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":article-banner-container primaryTag.name:has-tag hasTopImage:has-image")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div class=\"article-banner\">\n");
    stack1 = helpers['if'].call(depth0, "view.primaryTag.name", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "hasTopImage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    </div>\n  </div>\n  <div class=\"article-body\">\n    <div class=\"title-bar\">\n");
    stack1 = helpers['if'].call(depth0, "hasDateOrReleaseType", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      <div class=\"addthis-wrap pull-right\">\n        <div class=\"addthis-bar\">\n          ");
    data.buffer.push(escapeExpression(((helpers['add-this'] || (depth0 && depth0['add-this']) || helperMissing).call(depth0, {"name":"add-this","hash":{
      'title': ("title"),
      'url': ("url")
    },"hashTypes":{'title': "ID",'url': "ID"},"hashContexts":{'title': depth0,'url': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n        </div>\n      </div>\n      <div class=\"title-wrap\">\n        <h1 class=\"title\">");
    stack1 = helpers._triageMustache.call(depth0, "content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h1>\n        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("uri")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" class=\"ubernode-url\" style=\"display:none\"></a>\n      </div>\n    </div>\n\n");
    stack1 = helpers['if'].call(depth0, "isImage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(15, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = ((helpers['collapsible-section'] || (depth0 && depth0['collapsible-section']) || helperMissing).call(depth0, {"name":"collapsible-section","hash":{
      'showFadeout': ("showFadeout"),
      'isOpen': ("isOpen")
    },"hashTypes":{'showFadeout': "ID",'isOpen': "ID"},"hashContexts":{'showFadeout': depth0,'isOpen': depth0},"fn":this.program(18, data),"inverse":this.noop,"types":[],"contexts":[],"data":data}));
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n  <div class=\"after-body\">\n");
    stack1 = helpers['if'].call(depth0, "tags", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(46, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "showToggle", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(48, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n</div>\n<div class=\"article-divider\"></div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/ubernode-listing', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "ubernode-listing-item", {"name":"view","hash":{
      'content': ("item")
    },"hashTypes":{'content': "ID"},"hashContexts":{'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push(escapeExpression(((helpers['pagination-pager'] || (depth0 && depth0['pagination-pager']) || helperMissing).call(depth0, {"name":"pagination-pager","hash":{
      'change': ("pageChanged"),
      'countOut': (0),
      'paginationPrevious': ("Previous"),
      'paginationNext': ("Next"),
      'hide': (true),
      'count': ("totalPages"),
      'current': ("current")
    },"hashTypes":{'change': "STRING",'countOut': "NUMBER",'paginationPrevious': "STRING",'paginationNext': "STRING",'hide': "BOOLEAN",'count': "ID",'current': "ID"},"hashContexts":{'change': depth0,'countOut': depth0,'paginationPrevious': depth0,'paginationNext': depth0,'hide': depth0,'count': depth0,'current': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    stack1 = helpers.each.call(depth0, "item", "in", "subArray", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push(escapeExpression(((helpers['pagination-pager'] || (depth0 && depth0['pagination-pager']) || helperMissing).call(depth0, {"name":"pagination-pager","hash":{
      'change': ("pageChanged"),
      'countOut': (0),
      'paginationPrevious': ("Previous"),
      'paginationNext': ("Next"),
      'hide': (true),
      'count': ("totalPages"),
      'current': ("current")
    },"hashTypes":{'change': "STRING",'countOut': "NUMBER",'paginationPrevious': "STRING",'paginationNext': "STRING",'hide': "BOOLEAN",'count': "ID",'current': "ID"},"hashContexts":{'change': depth0,'countOut': depth0,'paginationPrevious': depth0,'paginationNext': depth0,'hide': depth0,'count': depth0,'current': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/components/yt-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <div class=\"tag\">");
    data.buffer.push(escapeExpression(((helpers['tag-block'] || (depth0 && depth0['tag-block']) || helperMissing).call(depth0, {"name":"tag-block","hash":{
      'title': ("tag.title"),
      'href': ("tag.url")
    },"hashTypes":{'title': "ID",'href': "ID"},"hashContexts":{'title': depth0,'href': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("</div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToVideo", "view.content.id", "view.title", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data})));
    data.buffer.push(">\n  <div class=\"vjs-default-skin bg-card-canvas\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("style")
    },"hashTypes":{'style': "ID"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div class=\"vjs-big-play-button\" role=\"button\" aria-live=\"polite\" tabindex=\"0\" aria-label=\"play video\"></div>\n    <div class=\"headline\">\n");
    stack1 = helpers['if'].call(depth0, "tag", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      ");
    data.buffer.push(escapeExpression(((helpers['text-truncate'] || (depth0 && depth0['text-truncate']) || helperMissing).call(depth0, {"name":"text-truncate","hash":{
      'lines': ("2"),
      'mode': ("line"),
      'text': ("view.content.title")
    },"hashTypes":{'lines': "STRING",'mode': "STRING",'text': "ID"},"hashContexts":{'lines': depth0,'mode': depth0,'text': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n    </div>\n  </div>\n</a>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/countdown', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div id=\"clock\">\n    <div class=\"num\">");
    stack1 = helpers._triageMustache.call(depth0, "view.diffDays", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n    <div class=\"num\">");
    stack1 = helpers._triageMustache.call(depth0, "view.diffHours", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n    <div class=\"num\">");
    stack1 = helpers._triageMustache.call(depth0, "view.diffMinutes", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n    <div class=\"num last\">");
    stack1 = helpers._triageMustache.call(depth0, "view.diffSeconds", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/error', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    data.buffer.push("<style>\n  #menu + #main-content {\n    margin-left: 0px;\n  }\n  .not-logged-in.node-type-landing-page-2015 #main {\n    padding-top:0px;  \n  }\n  body.not-logged-in {\n        padding-top: 0px;\n  }\n</style>\n<div class=\"error\">\n    <div class=\"page\">\n        <br/>\n        <h2>404</h2>\n        <h4>The cosmic object you are looking for has disappeared beyond the event horizon.</h4>\n        <br/><br/><br/>\n        <br/><br/><br/>\n        <br/><br/><br/>\n    </div>\n    <br/><br/><br/>\n</div>\n");
    },"useData":true})

});
define('nasa/templates/event-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <div class=\"title\">\n            <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("event.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "event.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</a>\n        </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div id=\"events\">\n    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.countdownView", {"name":"view","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n\n    Events\n");
    stack1 = helpers.each.call(depth0, "event", "in", "view.sortedEvents", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    <ul>\n        <li>\n            <a ui-sref=\"root.dummy\">View Events Calendar</a>\n        </li>\n        <br/>\n        <li>\n            <a ui-sref=\"root.dummy\">Launch Schedule</a>\n        </li>\n    </ul>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/event-clock-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"bg-card-canvas\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("style")
    },"hashTypes":{'style': "ID"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div class=\"layer\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.countdownView", {"name":"view","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n    </div>\n    <div class=\"headline\">\n        ");
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n    </div>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/flexslider', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(((helpers['close-button'] || (depth0 && depth0['close-button']) || helperMissing).call(depth0, {"name":"close-button","hash":{
      'goBack': ("goBack")
    },"hashTypes":{'goBack': "STRING"},"hashContexts":{'goBack': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("          <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":image :slide-container")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n            ");
    data.buffer.push(escapeExpression(((helpers['preloadable-image'] || (depth0 && depth0['preloadable-image']) || helperMissing).call(depth0, {"name":"preloadable-image","hash":{
      'src': ("activeImage")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n          </div>\n          <div class=\"col-xs-10 col-xs-push-1 col-md-8 col-md-push-2\">\n            ");
    data.buffer.push(escapeExpression(((helpers['image-description'] || (depth0 && depth0['image-description']) || helperMissing).call(depth0, {"name":"image-description","hash":{
      'image': ("activeObject")
    },"hashTypes":{'image': "ID"},"hashContexts":{'image': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n          </div>\n");
    return buffer;
  },"5":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <div class=\"visible-xs\">\n            ");
    data.buffer.push(escapeExpression(((helpers['close-button'] || (depth0 && depth0['close-button']) || helperMissing).call(depth0, {"name":"close-button","hash":{
      'goBack': ("goBack")
    },"hashTypes":{'goBack': "STRING"},"hashContexts":{'goBack': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n          </div>\n          <div class=\"row player\">\n            <div class=\"center\">\n              <div class=\"col-xs-12 col-sm-6 col-sm-push-1 col-md-6 col-md-push-1 pull-left\">\n                ");
    data.buffer.push(escapeExpression(((helpers['youtube-player'] || (depth0 && depth0['youtube-player']) || helperMissing).call(depth0, {"name":"youtube-player","hash":{
      'ytid': ("activeID")
    },"hashTypes":{'ytid': "ID"},"hashContexts":{'ytid': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n              </div>\n              <div class=\"col-xs-12 col-sm-4 col-sm-pull-1 col-md-4 col-md-pull-1 pull-right\">\n                <div class=\"hidden-xs\">\n                  ");
    data.buffer.push(escapeExpression(((helpers['close-button'] || (depth0 && depth0['close-button']) || helperMissing).call(depth0, {"name":"close-button","hash":{
      'goBack': ("goBack")
    },"hashTypes":{'goBack': "STRING"},"hashContexts":{'goBack': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n                </div>\n                ");
    data.buffer.push(escapeExpression(((helpers['video-description'] || (depth0 && depth0['video-description']) || helperMissing).call(depth0, {"name":"video-description","hash":{
      'video': ("activeObject")
    },"hashTypes":{'video': "ID"},"hashContexts":{'video': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n              </div>\n            </div>\n          </div>\n");
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":thumbnail-container")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n        <div id=\"thumbnail-slider\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":flexslider :thumb-gallery :video-thumbnails")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n          ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "thumbnail-slider", {"name":"view","hash":{
      'isImageGalleryBinding': ("isImageGallery"),
      'content': ("items")
    },"hashTypes":{'isImageGalleryBinding': "ID",'content': "ID"},"hashContexts":{'isImageGalleryBinding': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n        </div>\n      </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"preview\">\n    <div class=\"gallery-tabs\">\n      <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "goBack", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("><span class=\"gallery-label\">");
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span></a>\n");
    stack1 = helpers['if'].call(depth0, "isImageGallery", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    </div>\n    <div id=\"full-view\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":flexslider isImageGallery:images:videos")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "isImageGallery", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.program(5, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        <ul class=\"flex-direction-nav\">\n          <li>\n            <a class=\"flex-prev\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "prevItem", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("></a>\n          </li>\n          <li>\n            <a class=\"flex-next\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextItem", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("></a>\n          </li>\n        </ul>\n    </div>\n");
    stack1 = helpers['if'].call(depth0, "showThumbnails", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/footer', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <span>Page Last Updated: ");
    data.buffer.push(escapeExpression(((helpers['ap-date'] || (depth0 && depth0['ap-date']) || helperMissing).call(depth0, "changed", {"name":"ap-date","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</span>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("        <span>Page Editor: ");
    stack1 = helpers._triageMustache.call(depth0, "editor", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div id=\"footer\">\n  <div id=\"footer-info\">\n    <a class=\"logo\" href=\"/\">\n      <img src=\"/sites/all/themes/custom/nasatwo/images/nasa-logo.svg\" alt=\"\">\n    </a>\n    <div id=\"status\">\n      <span>National&nbsp;Aeronautics and Space&nbsp;Administration</span>\n");
    stack1 = helpers['if'].call(depth0, "changed", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "editor", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      <span>NASA Official: Brian Dunbar</span>\n    </div>\n  </div>\n  <ul id=\"footer-links\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("hasSideMenu")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      <li><a href=\"http://odeo.hq.nasa.gov/nofear.html\">No Fear Act</a></li>\n      <li><a href=\"http://www.nasa.gov/FOIA\">FOIA</a></li>\n      <li><a href=\"http://www.nasa.gov/about/highlights/HP_Privacy.html\">Privacy</a></li>\n      <li><a href=\"http://oig.nasa.gov/\">Office of Inspector General</a></li>\n      <li><a href=\"http://www.nasa.gov/news/budget/index.html\">Agency Financial Reports</a></li>\n      <li><a href=\"http://www.nasa.gov/about/contact/index.html\">Contact NASA</a></li>\n  </ul>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/fullcalendar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    data.buffer.push("  <div class=\"loading-calendar loadingspin\">\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<style>\n    .sub-nav {\n        display:none;\n    }\n    #menu + #main-content {\n      margin-left: 0px;\n    }\n</style>\n<div class=\"nasa-calendar\">\n");
    stack1 = helpers['if'].call(depth0, "isLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/gallery/components/image-description', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"content\">\n  <div class=\"col-sm-12\">\n    <div class=\"col-md-8\">\n      <h3 id=\"title\">\n        <span>");
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>\n      </h3>\n    </div>\n    <div class=\"col-xs-12 col-sm-4 share-wrapper pull-right\">\n      <h3>\n        <div class=\"col-xs-9 addthis-wrapper\">\n          ");
    data.buffer.push(escapeExpression(((helpers['add-this'] || (depth0 && depth0['add-this']) || helperMissing).call(depth0, {"name":"add-this","hash":{
      'isMobile': ("isMobile"),
      'title': ("title"),
      'url': ("shareUri")
    },"hashTypes":{'isMobile': "ID",'title': "ID",'url': "ID"},"hashContexts":{'isMobile': depth0,'title': depth0,'url': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n        </div>\n        <div class=\"col-xs-2 col-sm-3\">\n          <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'download': ("filename"),
      'href': ("download")
    },"hashTypes":{'download': "ID",'href': "ID"},"hashContexts":{'download': depth0,'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" >\n            <img class=\"download-icon\" src=\"/sites/all/themes/custom/nasatwo/images/download.svg\"/>\n          </a>\n        </div>\n      </div>\n    </h3>\n  </div>\n    <div class=\"row\">\n      <p>\n        ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "body", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n      </p>\n      <p>\n        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("uri")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" class=\"blue-bold\">View Image Feature</a>\n      </p>\n      <div class=\"download-link col-xs-12\"></div>\n    </div>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/gallery/components/video-description', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"content\">\n    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleOpen", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":shown isOpen:arrow-down:arrow-up")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n      <span class=\"mobile-toggle\">Close &#9660;</span>\n    </a>\n    <div class=\"description-header\">\n        <h3 id=\"title\">");
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n        <div class=\"download-link col-xs-12\"></div>\n    </div>\n    <div class=\"promo\">\n      ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "description", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n    </div>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/gallery/image', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <img class='gallery-thumb img-responsive' ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("view.content.masterImage.crop4x3ratio")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n    <div class=\"overlay\"><p>");
    stack1 = helpers._triageMustache.call(depth0, "view.content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</p></div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, buffer = '';
    stack1 = ((helpers['link-to'] || (depth0 && depth0['link-to']) || helperMissing).call(depth0, "image", "view.content.id", {"name":"link-to","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}));
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/gallery/loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    data.buffer.push("<div class=\"row gallery-container\">\n  <br><br><br>\n  <br><br><br>\n  <br><br><br>\n  <div class=\"darkloadingspin\"></div>\n  <br><br><br>\n  <br><br><br>\n  <br><br><br>\n</div>\n");
    },"useData":true})

});
define('nasa/templates/gallery/video', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <img class='gallery-thumb img-responsive' ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("view.content.url")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n    <div class=\"overlay\"><p>");
    stack1 = helpers._triageMustache.call(depth0, "view.content.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</p></div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, buffer = '';
    stack1 = ((helpers['link-to'] || (depth0 && depth0['link-to']) || helperMissing).call(depth0, "video", "view.content.id", {"name":"link-to","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}));
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/header', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    data.buffer.push("<div class=\"row\">\n    <div class=\"container-fluid bg1 full-bleed home\" ui-sref=\"root.dummy\">\n        <div class=\"headline\">\n            <div class=\"tags\">Space Station</div>\n            Astronauts to Conduct Spacewalk\n        </div>\n    </div>\n</div>");
    },"useData":true})

});
define('nasa/templates/image-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":inner :img-wrapper")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToImage", "view.content", "view.title", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data})));
    data.buffer.push(">\n        <div class=\"image\">\n            <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("view.content.masterImage.crop4x3ratio")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n        </div>\n    </a>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/image-thumb', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("view.image")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/image', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push(escapeExpression(((helpers['flex-slider'] || (depth0 && depth0['flex-slider']) || helperMissing).call(depth0, {"name":"flex-slider","hash":{
      'goBack': ("goBack"),
      'isImageGallery': (true),
      'activeID': ("activeID"),
      'goToIndex': ("activeIndex"),
      'title': ("title"),
      'items': ("images")
    },"hashTypes":{'goBack': "STRING",'isImageGallery': "BOOLEAN",'activeID': "ID",'goToIndex': "ID",'title': "ID",'items': "ID"},"hashContexts":{'goBack': depth0,'isImageGallery': depth0,'activeID': depth0,'goToIndex': depth0,'title': depth0,'items': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/images', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    data.buffer.push("        <div class=\"darkloadingspin\"></div>\n");
    },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "canLoadMore", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <div ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadNextPage", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(" id=\"trending\" class=\"col-md-12\">MORE STORIES</div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<span class=\"gallery-label\">\n    Images\n</span>\n<div class=\"gallery-container\">\n    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "image-gallery", {"name":"view","hash":{
      'contentBinding': ("content")
    },"hashTypes":{'contentBinding': "STRING"},"hashContexts":{'contentBinding': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "currentlyFetchingPage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(3, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/infopane', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"infopane\">\n  <div class=\"title\">\n    ");
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n  </div>\n  <div class=\"body clearfix\">\n    ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "body", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n  </div>\n</div>");
    return buffer;
  },"useData":true})

});
define('nasa/templates/landing-page', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"cards special col-sm-12\">\n");
    stack1 = helpers['if'].call(depth0, "alert", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </div>\n    </div>\n    <div class=\"row\">\n      <div id=\"cards\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "card-feed", {"name":"view","hash":{
      'ytPlaylistId': ("ytPlaylistId"),
      'content': ("cards")
    },"hashTypes":{'ytPlaylistId': "ID",'content': "ID"},"hashContexts":{'ytPlaylistId': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n        <span ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":tap-tab hasSideRail::hidden sidebarOpen:hidden:tab-shut")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSidebar", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">TAP</span>\n      </div>\n");
    stack1 = helpers['if'].call(depth0, "canLoadMore", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("    </div>\n  </div>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          ");
    data.buffer.push(escapeExpression(((helpers['alert-card'] || (depth0 && depth0['alert-card']) || helperMissing).call(depth0, {"name":"alert-card","hash":{
      'content': ("alert")
    },"hashTypes":{'content': "ID"},"hashContexts":{'content': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <div ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadNextPage", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(" id=\"trending\" class=\"col-md-12 col-sm-12\">MORE STORIES</div>\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <div class=\"static-landing-page\">\n    <h1>");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</h1>\n    ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "body", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n  </div>\n  <span ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":tap-tab sidebarOpen:hidden:tab-shut")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSidebar", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">TAP</span>\n");
    return buffer;
  },"8":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("  <div class=\"row gallery-container\">\n    <span class=\"gallery-label inactive\">");
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</span>\n");
    stack1 = helpers['if'].call(depth0, "isImageGallery", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(9, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "isVideoGallery", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(11, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers.unless.call(depth0, "hasContent", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(13, data),"inverse":this.program(15, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n");
    stack1 = helpers['if'].call(depth0, "showSpinner", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(22, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"9":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "image-gallery", {"name":"view","hash":{
      'title': ("title"),
      'content': ("images")
    },"hashTypes":{'title': "ID",'content': "ID"},"hashContexts":{'title': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    return buffer;
  },"11":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "video-gallery", {"name":"view","hash":{
      'title': ("title"),
      'content': ("videos")
    },"hashTypes":{'title': "ID",'content': "ID"},"hashContexts":{'title': depth0,'content': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    return buffer;
  },"13":function(depth0,helpers,partials,data) {
    data.buffer.push("      <div class=\"darkloadingspin\"></div>\n");
    },"15":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isImageGallery", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(16, data),"inverse":this.program(19, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"16":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "feedCanLoadMore", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(17, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"17":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <div ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadNextPage", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(" id=\"trending\" class=\"col-md-12\">MORE IMAGES</div>\n");
    return buffer;
  },"19":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "showVideoLoadMore", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(20, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"20":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <div ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadNextPage", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(" id=\"trending\" class=\"col-md-12\">MORE VIDEOS</div>\n");
    return buffer;
  },"22":function(depth0,helpers,partials,data) {
    data.buffer.push("    <div class=\"darkloadingspin\"></div>\n    <br><br>\n");
    },"24":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("  <div class=\"listing-page\">\n    <h1>");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</h1>\n    ");
    data.buffer.push(escapeExpression(((helpers['ubernode-listing'] || (depth0 && depth0['ubernode-listing']) || helperMissing).call(depth0, {"name":"ubernode-listing","hash":{
      'content': ("listings")
    },"hashTypes":{'content': "ID"},"hashContexts":{'content': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n  </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isCardFeedLandingPage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "isStaticLandingPage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "isGallery", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(8, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "isListingPage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(24, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/launchschedule-date', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <div class=\"date\">\n    ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.date", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n  </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;
    stack1 = helpers['if'].call(depth0, "view.date", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    else { data.buffer.push(''); }
    },"useData":true})

});
define('nasa/templates/launchschedule', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("    <div class=\"launch-event launch-empty clearfix\">\n      <div class=\"launch-info\">\n");
    stack1 = helpers.unless.call(depth0, "hasContent", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </div>\n    </div>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "isLoading", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.program(5, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    data.buffer.push("            <br><br>\n            <div class=\"loadingspin\"></div>\n            <br><br>\n");
    },"5":function(depth0,helpers,partials,data) {
    data.buffer.push("            No upcoming launches\n");
    },"7":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <div class=\"launch-event clearfix\">\n");
    stack1 = helpers['if'].call(depth0, "event.content.masterImage.crop4x3ratio", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(8, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      <div class=\"launch-info\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "launchschedule-date", {"name":"view","hash":{
      'isAllDay': ("event.content.isAllDay"),
      'options': ("event.content.dateFormat"),
      'end': ("event.end"),
      'start': ("event.start")
    },"hashTypes":{'isAllDay': "ID",'options': "ID",'end': "ID",'start': "ID"},"hashContexts":{'isAllDay': depth0,'options': depth0,'end': depth0,'start': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "event.content.title", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(13, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "event.content.description", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(18, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers.each.call(depth0, "link", "in", "event.content.additionalLink1", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(20, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </div>\n    </div>\n");
    return buffer;
  },"8":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("        <div class=\"launch-image\">\n");
    stack1 = helpers['if'].call(depth0, "event.mainLink", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(9, data),"inverse":this.program(11, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("        </div>\n");
    return buffer;
  },"9":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("event.mainLink")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("><img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("event.content.masterImage.crop4x3ratio")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" /></a>\n");
    return buffer;
  },"11":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("event.content.masterImage.crop4x3ratio")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n");
    return buffer;
  },"13":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("          <div class=\"title\">\n            <span class=\"launch-label\">Mission:</span>\n");
    stack1 = helpers['if'].call(depth0, "event.mainLink", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(14, data),"inverse":this.program(16, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("          </div>\n");
    return buffer;
  },"14":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("event.mainLink")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "event.content.title", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</a>\n");
    return buffer;
  },"16":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("              ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "event.content.title", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    return buffer;
  },"18":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("          <div class=\"description\">\n            <span class=\"launch-label\">Description:</span> ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "event.content.description", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n          </div>\n");
    return buffer;
  },"20":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "_view.contentIndex", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(21, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"21":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <div class=\"additionalLink\">\n              <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("link.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "link.title", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</a>\n            </div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div class=\"launch-schedule\">\n  <div class=\"launch-header\">\n    <h3>Launch Schedule</h3>\n    <a href=\"http://www.nasa.gov/centers/kennedy/launchingrockets/viewing.html\">See a Launch in Person</a>\n  </div>\n");
    stack1 = helpers.unless.call(depth0, "view.hasContent", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers.each.call(depth0, "event", "in", "calendarEvents", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/listing-pager-nav', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a class=\"pager-first\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "firstClick", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.firstText", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</a>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "numbered", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.program(6, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'value': ("page.num")
    },"hashTypes":{'value': "ID"},"hashContexts":{'value': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("page.classes")
    },"hashTypes":{'class': "ID"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "pagerClick", "page.num", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "page.num", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</a>\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'value': ("page.num")
    },"hashTypes":{'value': "ID"},"hashContexts":{'value': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("page.classes")
    },"hashTypes":{'class': "ID"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "pagerClick", "page.num", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data})));
    data.buffer.push("></a>\n");
    return buffer;
  },"8":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    <a class=\"pager-last\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "lastClick", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.lastText", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</a>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"pager-navigation\">\n");
    stack1 = helpers['if'].call(depth0, "view.showFirstLast", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  <a class=\"pager-prev\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "prevClick", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.prevText", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</a>\n  <div class=\"pager\">\n");
    stack1 = helpers.each.call(depth0, "page", "in", "currentPageNumbers", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(3, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </div>\n  <a class=\"pager-next\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextClick", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.nextText", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</a>\n");
    stack1 = helpers['if'].call(depth0, "view.showFirstLast", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(8, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>");
    return buffer;
  },"useData":true})

});
define('nasa/templates/missions/header', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("  <div id=\"landing-page-banner\" class=\"container-fluid bg topic full-bleed\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("bannerStyle")
    },"hashTypes":{'style': "ID"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div class=\"topic headline\">\n      ");
    data.buffer.push(escapeExpression(((helpers['truncate-text'] || (depth0 && depth0['truncate-text']) || helperMissing).call(depth0, "cardPageBannerImg.title", 36, {"name":"truncate-text","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","NUMBER"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n    </div>\n  </div>\n");
    return buffer;
  },"3":function(depth0,helpers,partials,data) {
    data.buffer.push("    <div class=\"full-bleed no-image\"></div>\n");
    },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"row\">\n");
    stack1 = helpers['if'].call(depth0, "cardPageBannerImg", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(3, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  ");
    data.buffer.push(escapeExpression(((helpers['sub-nav'] || (depth0 && depth0['sub-nav']) || helperMissing).call(depth0, {"name":"sub-nav","hash":{
      'topicUrl': ("subNavMenu.topicUrl.url"),
      'pageTitle': ("subNavMenu.shortName"),
      'topics': ("subNavMenu.subtopicLinks")
    },"hashTypes":{'topicUrl': "ID",'pageTitle': "ID",'topics': "ID"},"hashContexts":{'topicUrl': depth0,'pageTitle': depth0,'topics': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/missions/sidebar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("  <div class=\"nav-collapse sidebar home\"\n    ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("windowHeight")
    },"hashTypes":{'style': "ID"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("\n     style=\"border-right:1px solid #f2f2f2;\"\n    ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': ("sidebarOpen:show-left-bar")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div class=\"inner\">\n\n");
    stack1 = helpers['if'].call(depth0, "hasSocialSidebar", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "sideNavMenu.leftsideMenuLinks", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "cardpageLinks", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n    ");
    data.buffer.push(escapeExpression(((helpers['sidebar-section'] || (depth0 && depth0['sidebar-section']) || helperMissing).call(depth0, {"name":"sidebar-section","hash":{
      'tags': ("tags"),
      'tagSection': (true),
      'header': ("Related Topics")
    },"hashTypes":{'tags': "ID",'tagSection': "BOOLEAN",'header': "STRING"},"hashContexts":{'tags': depth0,'tagSection': depth0,'header': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n    </div>\n    <span ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":tap-tab hasSideRail::hidden sidebarOpen:tab-open:tab-shut")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSidebar", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">TAP</span>\n  </div>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      ");
    data.buffer.push(escapeExpression(((helpers['social-sidebar-section'] || (depth0 && depth0['social-sidebar-section']) || helperMissing).call(depth0, {"name":"social-sidebar-section","hash":{
      'allSocialMediaLink': ("allSocialMediaLink"),
      'addthisProfileId': ("addthisProfileId"),
      'govDeliveryId': ("govdeliveryId"),
      'govDeliveryText': ("govdeliverySubscribeText")
    },"hashTypes":{'allSocialMediaLink': "ID",'addthisProfileId': "ID",'govDeliveryId': "ID",'govDeliveryText': "ID"},"hashContexts":{'allSocialMediaLink': depth0,'addthisProfileId': depth0,'govDeliveryId': depth0,'govDeliveryText': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      ");
    data.buffer.push(escapeExpression(((helpers['sidebar-section'] || (depth0 && depth0['sidebar-section']) || helperMissing).call(depth0, {"name":"sidebar-section","hash":{
      'links': ("sideNavMenu.leftsideMenuLinks"),
      'header': ("sideNavMenu.menuHeading")
    },"hashTypes":{'links': "ID",'header': "ID"},"hashContexts":{'links': depth0,'header': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.each.call(depth0, "link", "in", "cardpageLinks", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(7, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"7":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        ");
    data.buffer.push(escapeExpression(((helpers['sidebar-section'] || (depth0 && depth0['sidebar-section']) || helperMissing).call(depth0, {"name":"sidebar-section","hash":{
      'links': ("link.links"),
      'header': ("link.header")
    },"hashTypes":{'links': "ID",'header': "ID"},"hashContexts":{'links': depth0,'header': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.unless.call(depth0, "isGallery", {"name":"unless","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/navbar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<nav ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":navbar-static-top")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" role=\"navigation\" id=\"navbar-nasa\">\n  <div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#nasa-primary-navigation\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <i class=\"fa fa-bars\"></i>\n    </button>\n    <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("meatballLocation")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" class=\"logo\">\n      <img src=\"/sites/all/themes/custom/nasatwo/images/nasa-logo.svg\" alt=\"\">\n    </a>\n  </div>\n  <div id=\"utilities\">\n    <div class=\"utility-cont nav-search\">\n      <form accept-charset=\"UTF-8\" action=\"http://nasasearch.nasa.gov/search\" id=\"search\" method=\"get\">\n        <input name=\"utf8\" type=\"hidden\" value=\"✓\">\n        <input id=\"affiliate\" name=\"affiliate\" type=\"hidden\" value=\"nasa\">\n        <label for=\"query\" class=\"element-invisible\" form=\"search_form\">Search NASA.gov</label>\n        <input autocomplete=\"off\" placeholder=\"Search\" class=\"usagov-search-autocomplete searchbox ui-autocomplete-input\" id=\"query\" tabindex=\"1\" title=\"search-nasa\" name=\"query\" type=\"text\" role=\"textbox\" aria-autocomplete=\"list\" aria-haspopup=\"true\">\n      </form>\n    </div>\n    <div class=\"utility-cont nav-social\">\n      ");
    data.buffer.push(escapeExpression(((helpers['navbar-social'] || (depth0 && depth0['navbar-social']) || helperMissing).call(depth0, {"name":"navbar-social","hash":{
      'url': ("url"),
      'title': ("title")
    },"hashTypes":{'url': "ID",'title': "ID"},"hashContexts":{'url': depth0,'title': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n    </div>\n  </div>\n  <div class=\"collapse navbar-collapse\" id=\"nasa-primary-navigation\">\n    <ul class=\"nav navbar-nav\" id=\"nasa-main-menu\"></ul>\n  </div>\n</nav>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/panelpage', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "pane.tvschedule", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "pane.fullcalendar", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "pane.tv_player", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "pane.launch_schedule", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(8, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "pane.upcoming_events", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(10, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    stack1 = helpers['if'].call(depth0, "pane.info_pane", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(12, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers['tv-schedule'] || (depth0 && depth0['tv-schedule']) || helperMissing).call(depth0, {"name":"tv-schedule","hash":{
      'loadSchedule': ("loadSchedule"),
      'isLoading': ("isLoading"),
      'model': ("pane")
    },"hashTypes":{'loadSchedule': "STRING",'isLoading': "ID",'model': "ID"},"hashContexts":{'loadSchedule': depth0,'isLoading': depth0,'model': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers.render || (depth0 && depth0.render) || helperMissing).call(depth0, "fullcalendar", "pane", {"name":"render","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"6":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers['tv-player'] || (depth0 && depth0['tv-player']) || helperMissing).call(depth0, {"name":"tv-player","hash":{
      'panel': ("pane")
    },"hashTypes":{'panel': "ID"},"hashContexts":{'panel': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"8":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers.render || (depth0 && depth0.render) || helperMissing).call(depth0, "launchschedule", "pane", {"name":"render","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"10":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers.render || (depth0 && depth0.render) || helperMissing).call(depth0, "upcomingevents", "pane", {"name":"render","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"12":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("    ");
    data.buffer.push(escapeExpression(((helpers.render || (depth0 && depth0.render) || helperMissing).call(depth0, "infoPane", "pane", {"name":"render","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers.each.call(depth0, "pane", "in", "panes", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/templates/partials/iss-player', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    data.buffer.push("<iframe width=\"100%\" height=\"380px\" src=\"http://www.ustream.tv/embed/17074538?v=3&amp;wmode=direct\" scrolling=\"no\" frameborder=\"0\" style=\"border: 0px none transparent;\"></iframe>\n");
    },"useData":true})

});
define('nasa/templates/stmd', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push(escapeExpression(((helpers['stmd-search'] || (depth0 && depth0['stmd-search']) || helperMissing).call(depth0, {"name":"stmd-search","hash":{
      'action': ("doStmdSearch"),
      'isLoading': ("isLoading"),
      'content': ("results"),
      'terms': ("model")
    },"hashTypes":{'action': "STRING",'isLoading': "ID",'content': "ID",'terms': "ID"},"hashContexts":{'action': depth0,'isLoading': depth0,'content': depth0,'terms': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/story-link', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<a class=\"blue-bold\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("view.content.uri")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n    <div class=\"story-thumb\" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'style': ("view.style")
    },"hashTypes":{'style': "ID"},"hashContexts":{'style': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("></div>\n    <div class=\"ac\">\n      <span>");
    data.buffer.push(escapeExpression(((helpers['text-ellipsis'] || (depth0 && depth0['text-ellipsis']) || helperMissing).call(depth0, {"name":"text-ellipsis","hash":{
      'height': (60),
      'text': ("view.content.title")
    },"hashTypes":{'height': "NUMBER",'text': "ID"},"hashContexts":{'height': depth0,'text': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("</span>\n      ");
    data.buffer.push(escapeExpression(((helpers['moment-alt'] || (depth0 && depth0['moment-alt']) || helperMissing).call(depth0, "view.content.promoDateTime", {"name":"moment-alt","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("\n    </div>\n</a>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/thumbnail-slider', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
  },"useData":true})

});
define('nasa/templates/topics-menu', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("  <ul>\n    <li id=\"topic-level\">\n      <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("topicUrl")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n");
    stack1 = helpers['if'].call(depth0, "pageTitle", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.program(4, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("      </a>\n    </li>\n\n");
    stack1 = helpers.each.call(depth0, "topic", "in", "topics", {"name":"each","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.noop,"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("  </ul>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("        ");
    stack1 = helpers._triageMustache.call(depth0, "pageTitle", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    data.buffer.push("        <span>&nbsp;</span>\n");
    },"6":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("      <li>\n        <a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("topic.url")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n          ");
    stack1 = helpers._triageMustache.call(depth0, "topic.title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n        </a>\n      </li>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div id=\"topics\" class=\"toggle missions\">\n  <a class=\"mobile topics-toggle\" onclick=\"$( '#topics ul' ).toggleClass( 'open' )\">\n    Topics\n    <span class=\"glyphicon glyphicon-chevron-down pull-right\"></span>\n  </a>\n");
    stack1 = helpers['if'].call(depth0, "topics", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>");
    return buffer;
  },"useData":true})

});
define('nasa/templates/ubernode-listing-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<h3><a ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'href': ("view.cardFeedLink")
    },"hashTypes":{'href': "ID"},"hashContexts":{'href': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">");
    data.buffer.push(escapeExpression(((helpers['html-safe'] || (depth0 && depth0['html-safe']) || helperMissing).call(depth0, "view.promoTitle", {"name":"html-safe","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push("</a></h3>\n<p>");
    data.buffer.push(escapeExpression(((helpers['ap-date'] || (depth0 && depth0['ap-date']) || helperMissing).call(depth0, "view.promoDateTime", {"name":"ap-date","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data}))));
    data.buffer.push(" - ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.description", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("</p>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/upcomingevent-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"upcoming-event clearfix\">\n  <div class=\"date\">\n    ");
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.date", {"name":"_triageMustache","hash":{
      'unescaped': ("true")
    },"hashTypes":{'unescaped': "STRING"},"hashContexts":{'unescaped': depth0},"types":["ID"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n  </div>\n  <div class=\"description\">\n    ");
    stack1 = helpers._triageMustache.call(depth0, "view.description", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n  </div>\n</div>");
    return buffer;
  },"useData":true})

});
define('nasa/templates/upcomingevents', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<div class=\"upcoming-events clearfix\">\n  <div class=\"title\">\n    ");
    stack1 = helpers._triageMustache.call(depth0, "title", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n  </div>\n  <div class=\"upcoming-events-content\">\n    ");
    data.buffer.push(escapeExpression(((helpers['listing-pager'] || (depth0 && depth0['listing-pager']) || helperMissing).call(depth0, {"name":"listing-pager","hash":{
      'itemTemplate': ("view.itemTemplate"),
      'noResultsText': ("No upcoming events"),
      'dateFormats': ("dateFormats"),
      'isLoading': ("view.isLoading"),
      'showHeaderNav': (false),
      'pageSize': (3),
      'content': ("calendarEvents")
    },"hashTypes":{'itemTemplate': "ID",'noResultsText': "STRING",'dateFormats': "ID",'isLoading': "ID",'showHeaderNav': "BOOLEAN",'pageSize': "NUMBER",'content': "ID"},"hashContexts":{'itemTemplate': depth0,'noResultsText': depth0,'dateFormats': depth0,'isLoading': depth0,'showHeaderNav': depth0,'pageSize': depth0,'content': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n  </div>\n</div>");
    return buffer;
  },"useData":true})

});
define('nasa/templates/video-card', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'class': (":vjs-default-skin :inner")
    },"hashTypes":{'class': "STRING"},"hashContexts":{'class': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(">\n  <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToVideo", "view.content.id", "view.title", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data})));
    data.buffer.push(">\n    <div class=\"image\">\n      <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("view.content.image")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n      <div class=\"vjs-big-play-button\" role=\"button\" aria-live=\"polite\" tabindex=\"0\" aria-label=\"play video\">\n        <span aria-hidden=\"true\"></span>\n      </div>\n    </div>\n    <div class=\"caption\">\n        ");
    data.buffer.push(escapeExpression(((helpers['text-truncate'] || (depth0 && depth0['text-truncate']) || helperMissing).call(depth0, {"name":"text-truncate","hash":{
      'lines': ("2"),
      'mode': ("line"),
      'text': ("view.content.title")
    },"hashTypes":{'lines': "STRING",'mode': "STRING",'text': "ID"},"hashContexts":{'lines': depth0,'mode': depth0,'text': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n    </div>\n  </a>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/video-thumb', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = '';
    data.buffer.push("<div class=\"video-thumb-container\">\n  <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'src': ("view.image")
    },"hashTypes":{'src': "ID"},"hashContexts":{'src': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push(" />\n  <div class=\"thumb-overlay\">\n    <span class=\"title\">");
    data.buffer.push(escapeExpression(((helpers['truncate-text'] || (depth0 && depth0['truncate-text']) || helperMissing).call(depth0, "view.title", 36, {"name":"truncate-text","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","NUMBER"],"contexts":[depth0,depth0],"data":data}))));
    data.buffer.push("</span>\n  </div>\n</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/video', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push(escapeExpression(((helpers['flex-slider'] || (depth0 && depth0['flex-slider']) || helperMissing).call(depth0, {"name":"flex-slider","hash":{
      'goBack': ("goBack"),
      'isImageGallery': (false),
      'activeID': ("activeID"),
      'goToIndex': ("activeIndex"),
      'title': ("title"),
      'items': ("model")
    },"hashTypes":{'goBack': "STRING",'isImageGallery': "BOOLEAN",'activeID': "ID",'goToIndex': "ID",'title': "ID",'items': "ID"},"hashContexts":{'goBack': depth0,'isImageGallery': depth0,'activeID': depth0,'goToIndex': depth0,'title': depth0,'items': depth0},"types":[],"contexts":[],"data":data}))));
    data.buffer.push("\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/videos', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    data.buffer.push("        <div class=\"darkloadingspin\"></div>\n");
    },"3":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    stack1 = helpers['if'].call(depth0, "canLoadMore", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(4, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"4":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("            <div ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadNextPage", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(" id=\"trending\" class=\"col-md-12\">MORE STORIES</div>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<span class=\"gallery-label\">\n    Videos\n</span>\n<div class=\"gallery-container\">\n    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "video-gallery", {"name":"view","hash":{
      'contentBinding': ("content")
    },"hashTypes":{'contentBinding': "STRING"},"hashContexts":{'contentBinding': depth0},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "currentlyFetchingPage", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.program(3, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n");
    return buffer;
  },"useData":true})

});
define('nasa/templates/youtube-player', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("<menu class=\"EmberYoutube-controls\">\n        <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "togglePlay", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers['if'].call(depth0, "isPlaying", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(2, data),"inverse":this.program(4, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</button>\n        <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleVolume", {"name":"action","hash":{},"hashTypes":{},"hashContexts":{},"types":["STRING"],"contexts":[depth0],"data":data})));
    data.buffer.push(">");
    stack1 = helpers['if'].call(depth0, "isMuted", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(6, data),"inverse":this.program(8, data),"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("</button>\n</menu>\n");
    return buffer;
  },"2":function(depth0,helpers,partials,data) {
    data.buffer.push("Pause");
    },"4":function(depth0,helpers,partials,data) {
    data.buffer.push("Play");
    },"6":function(depth0,helpers,partials,data) {
    data.buffer.push("Unmute");
    },"8":function(depth0,helpers,partials,data) {
    data.buffer.push("Mute");
    },"10":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("        <p class=\"EmberYoutube-time\">\n                ");
    stack1 = helpers._triageMustache.call(depth0, "currentTimeFormatted", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("/");
    stack1 = helpers._triageMustache.call(depth0, "durationFormatted", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n        </p>\n");
    return buffer;
  },"12":function(depth0,helpers,partials,data) {
    var escapeExpression=this.escapeExpression, buffer = '';
    data.buffer.push("        <p class=\"EmberYoutube-progress\">\n                <progress ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {"name":"bind-attr","hash":{
      'max': ("duration"),
      'value': ("currentTime")
    },"hashTypes":{'max': "ID",'value': "ID"},"hashContexts":{'max': depth0,'value': depth0},"types":[],"contexts":[],"data":data})));
    data.buffer.push("></progress>\n        </p>\n");
    return buffer;
  },"14":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("        <p class=\"EmberYoutube-debug\"><code>\n                ytid: ");
    stack1 = helpers._triageMustache.call(depth0, "ytid", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n                state: ");
    stack1 = helpers._triageMustache.call(depth0, "playerState", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n                isMuted: ");
    stack1 = helpers._triageMustache.call(depth0, "isMuted", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n                isPlaying: ");
    stack1 = helpers._triageMustache.call(depth0, "isPlaying", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n        </code></p>\n");
    return buffer;
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, buffer = '';
    data.buffer.push("<div id=\"NASAplayer\"></div>\n\n");
    stack1 = helpers['if'].call(depth0, "showControls", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(1, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "showTime", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(10, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "showProgress", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(12, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "showDebug", {"name":"if","hash":{},"hashTypes":{},"hashContexts":{},"fn":this.program(14, data),"inverse":this.noop,"types":["ID"],"contexts":[depth0],"data":data});
    if (stack1 != null) { data.buffer.push(stack1); }
    return buffer;
  },"useData":true})

});
define('nasa/transforms/array', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Transform.extend({
    deserialize: function(serialized) {
      return serialized;
    },

    serialize: function(deserialized) {
      return deserialized;
    }
  });

});
define('nasa/transforms/moment-date', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Transform.extend({
    deserialize: function(serialized) {
      return moment(serialized);
    },

    serialize: function(deserialized) {
      return deserialized;
    }
  });

});
define('nasa/utils/flatten-array', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function flattenArray(nestedArray, key) {
    return Ember['default'].arrayComputed(nestedArray, {
      initialize: function(array, changeMeta, instanceMeta) {
        instanceMeta.lengths = [];
        instanceMeta.listeners = [];
        return array;
      },
      addedItem: function(array, item, changeMeta, instanceMeta) {
        var args, flat, i, len, listener, localIndex;

        if (item != null) {
          if (key != null) {
            flat = item.get( key );
          } else {
            flat = item;
          }
        } else {
          flat = null;
        }
        if (flat != null) {
          listener = Ember['default'].Object.create({
            flat: flat,
            arrayWillChange: function() {},
            arrayDidChange: function(source_list, start, remove_count, add_count) {
              var args, i, idx, lidx, rem_amt, source_slice, len;
              idx = 0;
              lidx = 0;
              for (i = 0, len = instanceMeta.listeners.length; i < len; i++) {
                if (instanceMeta.listeners[i] === this) {
                  break;
                }
                lidx += 1;
                idx += instanceMeta.lengths[i];
              }

              source_slice = [];
              if (add_count < 0) {
                source_slice = source_list.slice(0);
              } else {
                if (add_count > 0) {
                  source_slice = source_list.slice(start, start + add_count);
                }
              }

              rem_amt = 0;
              if (remove_count < 0) {
                rem_amt = instanceMeta.lengths[lidx];
              } else {
                rem_amt = remove_count;
              }
              instanceMeta.lengths[lidx] += source_slice.length - rem_amt;
              args = [ idx + start, rem_amt ].concat( source_slice );

              array.arrayContentWillChange(idx + start, rem_amt, source_slice.length);
              array.splice.apply(array, args);
              array.arrayContentDidChange(idx + start, rem_amt, source_slice.length);
            }
          });
          flat.addArrayObserver(listener);
        }
        localIndex = 0;
        for (i = 0; i < changeMeta.index; i++ ) {
          localIndex += instanceMeta.lengths[i];
        }
        if (flat != null) {
          len = flat.get('length');
        } else {
          len = 0;
        }
        instanceMeta.lengths.splice(changeMeta.index, 0, len);
        instanceMeta.listeners.splice(changeMeta.index, 0, listener);
        args = [localIndex, 0];
        if (flat != null) {
          args = args.concat(flat);
        }

        array.arrayContentWillChange(localIndex, 0, len);
        array.splice.apply(array, args);
        array.arrayContentDidChange(localIndex, 0, len);

        return array;
      },
      removedItem: function(array, item, changeMeta, instanceMeta) {
        var i, listener, localIndex, old_len, flat;
        localIndex = 0;
        for (i = 0; i < changeMeta.index; i++ ) {
          localIndex += instanceMeta.lengths[i];
        }
        old_len = instanceMeta.lengths[changeMeta.index];
        instanceMeta.lengths.splice(changeMeta.index, 1);
        listener = instanceMeta.listeners[changeMeta.index];
        if (listener != null) {
          if ((flat = listener.get('flat')) != null) {
            flat.removeArrayObserver(listener);
          }
        }
        instanceMeta.listeners.splice(changeMeta.index, 1);

        array.arrayContentWillChange(localIndex, old_len, 0);
        array.splice(localIndex, old_len);
        array.arrayContentDidChange(localIndex, old_len, 0);

        return array;
      }
    });
  }
  exports['default'] = flattenArray;

});
define('nasa/utils/flatten-date-array', ['exports', 'ember', 'nasa/utils/flatten-array'], function (exports, Ember, FlattenArray) {

    'use strict';

    var FlattenDateArray = Ember['default'].Object.extend(Ember['default'].Array, {
        batchSize: 10,

        isLoading: false,

        flat: new FlattenArray['default']('content', 'data'),

        sortBy: ['promoDateTime:desc','id:desc'],
        sorted: Ember['default'].computed.sort('flat', 'sortBy'),

        _data: null,
        _loadedIds: [],
        _loading: null,

        content: Ember['default'].A(),

        init: function() {
          var self = this;

          this._data = [];
          this._super();

          var promise = Ember['default'].RSVP.all(
              this.get('content')
                  .map(function(array) {
                    return array.next();
                  }),
            'LinearDateAray: Wait for content arrays to load content'
          );

          this.set('isLoading', true);
          this.set('_loading', promise);

          promise["finally"](function() {
            self.set('isLoading', false);
          }, 'LinearDateAray: Set date array to not loading');
        },

        length: function() {
          var content = this.get('content'),
              raw;

          raw = content.mapBy('length')
                       .reduce(function(previousValue, currentValue) {
              return previousValue + currentValue;
          }, 0);

          return raw;
        }.property('content.@each.length', 'sorted'),

        _loadedLength: function() {
          var sorted = this.get('sorted.length');
          return sorted ? sorted : 0;
        }.property('sorted.length'),

        _loadedDiffLength: function() {
          var sorted = this.get('sorted.length'),
              flat = this.get('flat.length');

          return flat - sorted;
        }.property('flat', 'sorted'),

        objectAt: function(idx) {
          var length = this.get('_loadedLength');

          if (idx < 0) {
            return undefined;
          }

          if (idx >= length) {
            return this.waitForObjectAt(idx, this.get('_loading'));
          }

          var object = this.get('sorted').objectAt(idx);
          this.reloadObject(object);


          return object;
        },

        waitForObjectAt: function(idx, promise) {
          var self = this;

          return promise.then(function() {
            var length = self.get('sorted.length'),
                object;

            if (idx < length) {
              object = self.get('sorted').objectAt(idx);
              self.reloadObject(object);

              return object;
            }

            self.next();

            return undefined;
          });
        },

        reloadObject: function(object) {
          var id = object.get('id');
          if (object.reload !== undefined &&
              Ember['default'].isEmpty(object.get('ubernodeType')) &&
              this._loadedIds.indexOf(id) === -1) {
            object.reload();
            this._loadedIds.push(id);
          }
        },

        next: function() {
          if (this.get('isLoading')) {
            return this.get('_loading');
          }

          var oldestLoadedDate = this.get('sorted.lastObject.promoDateTime'),
              content = this.get('content'),
              self = this,
              promises = [],
              all = [];

          content.forEach(function(array) {
            var oldestArrayDate = array.get('oldestDate');

            if (content.length === 1 || oldestArrayDate > oldestLoadedDate) {
              promises.push(array.next());
            }
          });

          all = Ember['default'].RSVP.all(promises);
          all["finally"](function() {
            self.set('isLoading', false);
          }, 'LinearDateAray: Set date array to not loading');

          this.set('isLoading', true);
          return this.set('_loading', all);
        },
    });

    exports['default'] = FlattenDateArray;

});
define('nasa/utils/get-json', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function getJSON(url, params) {
    function InvalidError(errors) {
      var tmp = Error.prototype.constructor.call(this, "The backend rejected the commit because it was invalid: " + Ember['default'].inspect(errors));
      this.errors = errors;
      for (var i=0, l=errorProps.length; i<l; i++) {
        this[errorProps[i]] = tmp[errorProps[i]];
      }
    }
    InvalidError.prototype = Ember['default'].create(Error.prototype);

    function ajax(url, type, options) {
      return new Ember['default'].RSVP.Promise(function(resolve, reject) {
        var hash = ajaxOptions(url, type, options);
        hash.success = function(json, textStatus, jqXHR) {
          json = ajaxSuccess(jqXHR, json);
          if (json instanceof InvalidError) {
            Ember['default'].run(null, reject, json);
          } else {
            Ember['default'].run(null, resolve, json);
          }
        };
        hash.error = function(jqXHR, textStatus, errorThrown) {
          Ember['default'].run(null, reject, ajaxError(jqXHR, jqXHR.responseText, errorThrown));
        };
        Ember['default'].$.ajax(hash);
      }, 'NASA: Utils#getJSON ' + type + ' to ' + url);
    }

    function ajaxSuccess(jqXHR, jsonPayload) {
      return jsonPayload;
    }

    function ajaxError(jqXHR, responseText, errorThrown) {
      var isObject = jqXHR !== null && typeof jqXHR === 'object';
      if (isObject) {
        jqXHR.then = null;
        if (!jqXHR.errorThrown) {
          jqXHR.errorThrown = errorThrown;
        }
      }
      return jqXHR;
    }

    function ajaxOptions(url, type, options) {
      var hash = options || {};
      hash.url = url;
      hash.type = type;
      hash.dataType = 'json';
      //hash.context = this;
      if (hash.data && type !== 'GET') {
        hash.contentType = 'application/json; charset=utf-8';
        hash.data = JSON.stringify(hash.data);
      }
      //var headers = get(this, 'headers');
      //if (headers !== undefined) {
      //  hash.beforeSend = function (xhr) {
      //    forEach.call(Ember.keys(headers), function(key) {
      //      xhr.setRequestHeader(key, headers[key]);
      //    });
      //  };
      //}
      return hash;
    }
    return ajax(url, 'GET', {data: params});
  }
  exports['default'] = getJSON;

});
define('nasa/utils/get-query', ['exports'], function (exports) {

  'use strict';

  function getQuery(variable) {
    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
        }
      }
    }
    return getQueryVariable(variable);
  }
  exports['default'] = getQuery;

});
define('nasa/utils/linear-array', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var LinearArray = Em.Object.extend(Em.Array, {
        length: 0,

        batchSize: 100,

        isLoaded: false,
        isDone: false,

        data: null,

        _loadedLength: 0,

        load: null,

        init: function() {
          var self = this;

          this.set('data', []);
          this._super();
          Em.assert('`load` must be set to a function in the constructor of LinearArray', typeof this.get('load') === 'function');
        },

        objectAt: function(idx) {
          if (idx < 0 || idx >= this.get('length')) {
            return undefined;
          }

          return this.get('data').objectAt(idx);
        },

        next: function() {
          var loadedLength = this.get('_loadedLength'),
              batchSize = this.get('batchSize'),
              startOffset = (loadedLength ? loadedLength - 1 : 0),
              load = this.get('load'),
              self = this;

          var promise = load.call(this, startOffset, startOffset + batchSize);
          Em.assert('`load` for LinearArray must return a thenable', promise && typeof promise.then === 'function');
          promise.then(function(payload) {
              Em.assert('The promise returned from `load` for LinearArray must resolve with an object', typeof payload === 'object');
              Em.assert('The promise returned from `load` for LinearArray must resolve with an object with an array named `items`', Em.isArray(payload.items));
              Em.assert('The promise returned from `load` for LinearArray must resolve with an object with an integer named `total`', typeof payload.total === 'number');

              self._ignoreLastObject = true;

              var oldLength = self.get('length'),
                  newLength = payload.total,
                  items = payload.items,
                  itemsLength = items.length,
                  itemsRemoved = Math.min(itemsLength, oldLength - startOffset);

              self.set('_loadedLength', self.get('_loadedLength') + itemsLength);

              self.arrayContentWillChange(startOffset, itemsRemoved, itemsLength);
              if (newLength !== oldLength) {
                  self.set('length', newLength);
              }
              for (var i = 0; i < itemsLength; i++) {
                  self.get('data').insertAt(startOffset + i, items[i]);
              }
              self.arrayContentDidChange(startOffset, itemsRemoved, itemsLength);

              //If length changed
              if (newLength !== oldLength) {
                  var start,
                      endRemoved,
                      endAdded;

                  if (newLength > oldLength) {
                      //Items were added to the end
                      start = Math.max(startOffset + itemsLength, oldLength);
                      endRemoved = 0;
                      endAdded = newLength - Math.max(startOffset + itemsLength, oldLength);
                  } else {
                      //Items were removed from the end
                      start = newLength;
                      endRemoved = oldLength - newLength;
                      endAdded = 0;
                  }
                  self.arrayContentWillChange(start, endRemoved, endAdded);
                  self.arrayContentDidChange(start, endRemoved, endAdded);
              }

              if (!self.get('isLoaded')) {
                  self.set('isLoaded', true);
              }

              self._ignoreLastObject = false;
          }, function(e) {
              console.error('LinearArray load error', e);
          });

          return promise;
        },
    });

    exports['default'] = LinearArray;

});
define('nasa/utils/sparse-array', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var SparseItem = Ember['default'].Object.create({
        isLoaded: false
    });

    var SparseArray = Ember['default'].Object.extend(Ember['default'].Array, {
        length: 0,

        batchSize: 100,

        isLoaded: false,

        _data: null,

        _loadedIndexes: null,

        load: null,

        init: function() {
            this._data = {};
            this._loadedIndexes = {};
            this._super();
            Ember['default'].assert('`load` must be set to a function in the constructor of SparseArray', typeof this.get('load') === 'function');
            this._loadIndex(0);
        },

        objectAt: function(index) {
            var length = this.get('length');
            if (index >= length) {
                return null;
            }
            if (typeof this._data[index] === 'undefined') {
                if (this._loadedIndexes[index] !== true) {
                    //Stop Ember.Array from trying to get the `lastObject` property
                    if (!this._ignoreLastObject || index !== length-1) {
                        this._loadIndex(index);
                    }
                }
                return SparseItem;
            }
            return this._data[index];
        },

        _loadIndex: function(index) {
            var self = this,
                loadedIndexes = this._loadedIndexes,
                load = this.get('load'),
                batchSize = this.get('batchSize'),
                halfBatchSize = Math.ceil(batchSize/2),
                startOffset = index,
                endOffset = index;

            while (true) {
                loadedIndexes[startOffset] = true;
                if (loadedIndexes[startOffset - 1] === true || startOffset <= Math.max(0, index - halfBatchSize)) {
                    break;
                }
                startOffset--;
            }

            while (true) {
                loadedIndexes[endOffset] = true;
                if (loadedIndexes[endOffset + 1] === true || endOffset >= startOffset + batchSize - 1) {
                    break;
                }
                endOffset++;
            }

            var promise = load.call(this, startOffset, endOffset - startOffset + 1);
            Ember['default'].assert('`load` for SparseArray must return a thenable', promise && typeof promise.then === 'function');

            promise.then(function(payload) {
                Ember['default'].assert('The promise returned from `load` for SparseArray must resolve with an object', typeof payload === 'object');
                Ember['default'].assert('The promise returned from `load` for SparseArray must resolve with an object with an array named `items`', Ember['default'].isArray(payload.items));
                Ember['default'].assert('The promise returned from `load` for SparseArray must resolve with an object with an integer named `total`', typeof payload.total === 'number');

                self._ignoreLastObject = true;

                var oldLength = self.get('length'),
                    newLength = payload.total,
                    items = payload.items,
                    itemsLength = items.length,
                    itemsRemoved = Math.min(itemsLength, oldLength - startOffset);

                self.arrayContentWillChange(startOffset, itemsRemoved, itemsLength);
                if (newLength !== oldLength) {
                    self.set('length', newLength);
                }
                for (var i = 0; i < itemsLength; i++) {
                    self._data[startOffset + i] = items[i];
                }
                self.arrayContentDidChange(startOffset, itemsRemoved, itemsLength);

                //If length changed
                if (newLength !== oldLength) {
                    var start,
                        endRemoved,
                        endAdded;

                    if (newLength > oldLength) {
                        //Items were added to the end
                        start = Math.max(startOffset + itemsLength, oldLength);
                        endRemoved = 0;
                        endAdded = newLength - Math.max(startOffset + itemsLength, oldLength);
                    } else {
                        //Items were removed from the end
                        start = newLength;
                        endRemoved = oldLength - newLength;
                        endAdded = 0;
                    }
                    self.arrayContentWillChange(start, endRemoved, endAdded);
                    self.arrayContentDidChange(start, endRemoved, endAdded);
                }

                if (!self.get('isLoaded')) {
                    self.set('isLoaded', true);
                }

                self._ignoreLastObject = false;
            }, function(e) {
                console.error('SparseArray load error', e);
            });
        }
    });

    exports['default'] = SparseArray;

});
define('nasa/views/alltags', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].View.extend({
    templateName: 'alltags',
    classNames: ['alltags-view'],
    isMobile: null,

    onInit: function(){
      this.get('letters');   
    }.on('init'),

    didInsertElement: function(){
      var self = this;
      $(window).on('resize', Ember['default'].run.bind(this, function(){
        self.windowResized();
        self.windowScrolled();
      }));
      this.windowResized();
      $(window).on('scroll', Ember['default'].run.bind(this, function(){
        self.windowScrolled();
      }));
      this.windowScrolled();

      // Fixes issues with navbar and anchors on mobile
      $('#tag-anchors a').click( function(){
        var isMobile = (window.innerWidth || document.body.clientWidth) < 768;
        if(isMobile){
          $('#navbar-nasa').css('top', 0).removeClass('affix');
        }
      });
    },

    windowResized: function() {
      var isMobile = (window.innerWidth || document.body.clientWidth) < 768,
          prevIsMobile = this.get('isMobile'),
          nav = $('#navbar-nasa'),
          header = $('.alltags-view #tags-header'),
          adminMenu = ($('#admin-menu,#toolbar').length > 0) ? parseInt($('#admin-menu,#toolbar').css('height')) : 0,
          editTabs = ($('#nasa-edit-tabs').length > 0) && ($('#nasa-edit-tabs').css('display') != 'none') ? parseInt($('#nasa-edit-tabs').css('height')) : 0;

      if(isMobile) {
        $('h3.letter').css('margin-top', 0);
        $('h3.letter').css('padding-top', 0);
      }
      else if(!isMobile) {
        var position = adminMenu + parseInt(nav.css('height')) + editTabs;
        header.css('top', position);

        var anchor_offset = position + parseInt(header.css('height'));
        $('h3.letter').css('margin-top', -anchor_offset);
        $('h3.letter').css('padding-top', anchor_offset+10);
      }

      this.set('isMobile',isMobile);
    },

    windowScrolled: function() {
      var isMobile = this.get('isMobile'),
          scroll = $(window).scrollTop(),
          nav = $('#navbar-nasa'),
          header = $('.alltags-view #tags-header');

      if(isMobile) {
        var newPos = Math.min(nav.offset().top - scroll, 0) + parseInt(nav.css('height'));
        header.css('top', newPos);
      }
    },

    tagList: Ember['default'].arrayComputed('controller.tags', {
      initialize: function (array, changeMeta, instanceMeta) {
        instanceMeta.letters = [];
        for(var ch='A'.charCodeAt(0); ch <= 'Z'.charCodeAt(0); ch++) {
          var chr = String.fromCharCode(ch);
          instanceMeta.letters.push(chr);
        }

        instanceMeta.letters.forEach(function(letter, i) {
          array.pushObject(Ember['default'].Object.create({
            letter: letter,
            id: 'letter-'+letter,
            content: Ember['default'].A(),
          }));
        });

        return array;
      },

      addedItem: function (array, item, changeMeta, instanceMeta) {
        var letter = item.get('name').charAt(0).toUpperCase();

        if ('A' <= letter && letter <= 'Z') {
          var index = instanceMeta.letters.indexOf(letter);
          if(index >=0){
            array.objectAt(index).get('content').pushObject(item);
            var sorted = array.objectAt(index).get('content').sortBy('name');
            array.objectAt(index).set('content', sorted);
          }
        } // Else they likely start with numbers

        return array;
      },

      removedItem: function (array, item, changeMeta, instanceMeta) {
        var letter = item.get('name').charAt(0).toUpperCase();
        if ('A' <= letter && letter <= 'Z') {
          var index = instanceMeta.letters.indexOf(letter);
          if(index >=0){
            array.objectAt(index).get('content').removeObject(item);
          }
        } // Else they likely start with numbers

        return array;
      }
    }),

    // We need this b/c the tags api doesn't contain displayTagOnUbernode
    // reloadterms: function() {
      // this.get('tags').forEach(function(tag) {
      //   tag.reload();
      // });
    // }.observes('tags'),

    letters: function(){
      var letters = [];
      // Add anchor links at the top of the page
      for(var ch='A'.charCodeAt(0); ch <= 'Z'.charCodeAt(0); ch++){
        var data = {};
        data.character = String.fromCharCode(ch);
        data.url = '#letter-'+ data.character;
        letters.push(data);
      }
      return letters;
    }.property(),
  });

});
define('nasa/views/application', ['exports', 'ember', 'nasa/mixins/dom-properties'], function (exports, Ember, DOMProperties) {

  'use strict';

  exports['default'] = Ember['default'].View.extend(DOMProperties['default'],{
    landingPage: Ember['default'].computed.alias('controller.controllers.landing-page'),
    featurePage: Ember['default'].computed.alias('controller.controllers.article'),

    didInsertElement: function() {
      var hasMenu = Ember['default'].$('#nasa-edit-tabs-wrapper').find('ul').length > 0,
          menu = hasMenu ? '#nasa-edit-tabs-wrapper':'.contextual-links-wrapper';
      this.set('adminTabs', Ember['default'].$(menu).html());

      Ember['default'].run.scheduleOnce('afterRender', this, function(){
        this.setDOMValues()
        this.adjustCurrentViewport()
        var display = $('.sidebar').length > 0 ? 'show' : 'hide';
        $('.tap-tab.shut')[display]();
        if (this.get('isGallery')){
          $('#content').css('padding-top',0)
          $('#menu + #main-content').css('margin-left',0);
        }
      });
    },

    navScrollEffects: function(){
      var nav = $('#navbar-nasa'),
          next = this.get('scrollPositionService.nextPosition'),
          prev = this.get('scrollPositionService.previousPosition'),
          offset = nav.offset().top,
          isMobile = this.get('isMobile'),
          bodyScrollable = $('body').css('position') === 'static';
      if (isMobile){
        if($('body').hasClass('show-topics-menu'))
          height=nav.height()+nav.find('#nasa-main-menu > li:nth-child(1)').height();
        if($('#nasa-primary-navigation').hasClass('in'))
          height=nav.height()+$('#nasa-main-menu').height();

        if(next < 0) return;
        if(isMobile && bodyScrollable){
          if(next < prev && !nav.hasClass('affix')){
            if(next < offset)
              nav.css('top', 0).addClass('affix');
          }
          if(next > prev && nav.hasClass('affix')){
            nav.css('top', next).removeClass('affix');
          }
        }
      }
    },

    scrolled: function(){
      //this.navScrollEffects();

      if (this.get('scrollingDown') && this.get('scrolledPassedHeader') && this.get('unAffixed')){
        this.set('affixed',true);
      }
      if (this.get('scrollingUp') && this.get('scrolledToHeader')){
        this.set('affixed',false);
      }
    }.observes('scrollPositionService.nextPosition'),

    adjustForMobile: function(){
      if (this.get('isMobile')){
        $('.home.sidebar').css('top',this.get('sidebarPositionTopMobileSum'));
        if (this.get('sidebarOpen')){
          window.scrollTo(0,0);
          $('body').css('position','fixed');
        }
      }
    }.observes('isMobile'),

    adjustForTablet: function(){
      if (this.get('isTablet')){
        window.scrollTo(0,0);
        this.set('affixed',false);
        $('body').css('position','static');
        $('#navbar-nasa').css('position','fixed');
        $('.sidebar.affix-top').css('top',this.get('tabletSidebarSum'));
      }
    }.observes('isTablet'),

    adjustForDesktop: function(){
      if (!this.get('isMobile') && !this.get('isTablet') && this.get('isDesktop')){
        window.scrollTo(0,0);
        this.set('affixed',false);
        this.get('landingPage').set('sidebarOpen',false);
        this.get('featurePage').set('sidebarOpen',false);
        $('#navbar-nasa').css('position','fixed');
        $('.sidebar.affix-top').css('top','auto')
      }
    }.observes('isMobile','isTablet'),

    unAffixElements: function(){
      if (this.get('unAffixed')){
        this.setDOMValues();
        $('.home.sidebar, #topics.missions').removeClass('affix');
        $('.home.sidebar, #topics.missions').addClass('affix-top');
        $('#topics.missions.affix-top').css('top',0)
        if (this.get('isTablet')){
          if (this.get('isLandingPage')){
            $('#menu + #main-content').css('padding-top',0);
          }
        }
        if (this.get('sidebarClosed') || this.get('notMobile')){
          $('.home.sidebar.affix-top').css('top',this.get('unAffixedSidebarSum'));
        }
      }
    }.observes('unAffixed'),

    affixElements: function(){
      if (this.get('affixed')){
        this.setDOMValues();
        $('.home.sidebar, #topics.missions').removeClass('affix-top');
        $('.home.sidebar, #topics.missions').addClass('affix');
        if (this.get('notMobile')){
          $('#topics.missions.affix').css('top',this.get('subnavPositionTopSum'));
          $('.home.sidebar.affix').css('top',this.get('sidebarPositionTopSum'));
          if (this.get('isTablet')){
            $('#topics.missions.affix').css('top',this.get('navbarHeight'));
            $('.home.sidebar.affix').css('top',this.get('affixedSidebarTabletSum'));
          }
        }
      }
    }.observes('affixed')
  });

});
define('nasa/views/article', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].View.extend({
    templateName: 'article',
    classNames: ['article-view'],

    previousPosition: Ember['default'].computed.alias('scrollPositionService.previousPosition'),
    scrollPosition: Ember['default'].computed.alias('scrollPositionService.nextPosition'),
    prevUri: null,
    isPopScroll: false,

    didInsertElement: function(){
      var self = this;
      $(window).bind("scroll", function() {
        self.didScroll();
      });
      this.didScroll();

      // Event handler for browser navigation, back and forward
      window.onpopstate = function(event) {      
        if(history.state){
          var scroll = self.get('scrollPosition'),
              top = history.state.scrollTop,
              index = history.state.elementIndex;

          // Set prevUri so article uri isn't pushed to history again
          var ubernodes = $('.ember-view.ubernode-full');
          var uri = $('.title-bar .title-wrap a.ubernode-url', ubernodes[index]).attr('href');
          self.set('prevUri', uri);
          self.set('isPopScroll', true);
          
          // Delay the scroll for after the pop event automatic scroll. Maybe there is a better way to handle this
          setTimeout(function(){
            $(window).scrollTop(top);
            self.set('isPopScroll', false);
          }, 200);
        }
      };
    },
    didScroll: function(){
      // Block scroll handling if scroll is related to pop event
      if(this.get('isPopScroll')){
        return;
      }
      var scroll = this.get('scrollPosition'),
          prev = this.get('previousPosition');

      var ubernodes = $('.ember-view.ubernode-full');

      // Make sure initial state contains scroll data
      if(ubernodes.length > 0 && this.get('prevUri') == null){
        var uri = $('.title-bar .title-wrap a.ubernode-url', ubernodes[0]).attr('href');
        var state = {scrollTop: $(ubernodes[0]).offset().top, elementIndex: 0};
        history.replaceState(state, '', uri);
        this.set('prevUri', uri);
      }

      for(var i = 0; i+1 < ubernodes.length; ++i) {
        var top = $(ubernodes[i]).offset().top;
        var nextTop = $(ubernodes[i+1]).offset().top;

        // If scroll is between two articles, push the first article uri to history
        if(top <= scroll && scroll < nextTop) {
          var uri = $('.title-bar .title-wrap a.ubernode-url', ubernodes[i]).attr('href');
          if(uri != this.get('prevUri')){
            var state = {scrollTop: top, elementIndex: i};
            history.pushState(state, '', uri);
            this.set('prevUri', uri);
          }
          
          return;
        }
      }
    },
  });

});
define('nasa/views/articles/sidebar', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].View.extend(
        InfiniteScroll.ViewMixin, {

        latestHasContent: Ember['default'].computed.gt('latestFeed.content.length', 0),
        relatedHasContent: Ember['default'].computed.gt('relatedFeed.content.length', 0),
        latestEmpty: Ember['default'].computed.not('latestHasContent'),
        relatedEmpty: Ember['default'].computed.not('relatedHasContent'),
        latestLoading: Ember['default'].computed.or('latestFeed.isLoading','latestEmpty'),
        relatedLoading: Ember['default'].computed.or('relatedFeed.isLoading','relatedEmpty'),

        setupInfiniteScrollListener: function(){
            $('.sidebar').on('scroll', Ember['default'].run.bind(this,this.didScroll));
        },
        teardownInfiniteScrollListener: function(){
            $('.sidebar').off('scroll', Ember['default'].run.bind(this,this.didScroll));
        },

        didInsertElement: function(){
          Ember['default'].run.scheduleOnce('afterRender', this, this.setupInfiniteScrollListener);
        },
        willDestroyElement: function(){
          this._super();
          Ember['default'].run.scheduleOnce('afterRender', this, this.teardownInfiniteScrollListener);
        },

        didScroll: function(){
          Ember['default'].run.debounce(this, this.isScrolledToBottom, 300);
        },

        isScrolledToBottom: function(){
          var column = this.controller.get('showRelated') ? 'related':'latest';
          this.atBottom(column);
        },
        atBottom: function(column){
          //default mobile
          var position = $('.sidebar').prop('scrollTop');
          var bottom = $('.'+column+'-scroll-inner').prop('scrollHeight');
          if (bottom === 0){
            // desktop
            position = $('.sidebar').prop('scrollTop');
            bottom = $('.sidebar .'+column+'-scroll-inner').prop('scrollHeight');
          }
          bottom -= 640;
          if (position === 0) {
            return false;
          }
          if (position >= bottom){
            var action = column === 'related' ? 'getMore':'getMoreLatest';
            this.controller.send(action);
          };
        },

    });

});
define('nasa/views/card-feed', ['exports', 'ember', 'nasa/components/proxy-card'], function (exports, Ember, ProxyCard) {

    'use strict';

    exports['default'] = Ember['default'].CollectionView.extend({
        classNames: ['isotope-container'],
        itemViewClass: ProxyCard['default'],

        didInsertElement: function () {
          this.$().isotope({
            isInitLayout: false,
            layoutMode: "packery",
            transitionDuration: "0.1s"
          });
          this.$().isotope( 'once', 'layoutComplete', function(isoInstance) {
            Ember['default'].$('.card:not(.laid-out)', isoInstance.element).addClass('laid-out');
          });
          this.$().isotope('layout');
        },

        willDestroyElement: function () {
          this.$().isotope('destroy');
        },
    });

});
define('nasa/views/footer', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'footer',
  });

});
define('nasa/views/fullcalendar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].View.extend({
    templateName: 'calendar',

    // Events on the calendar, including repeating events
    eventList: Ember['default'].computed('controller.calendarEventsUniq.@each', function(){
      var calendarEvents = this.get('controller.calendarEventsUniq'),
          events = Ember['default'].A();

      calendarEvents.forEach(function(calendarEvent){
        var dates = calendarEvent.get('eventDate');
        if(!dates){
          return;
        }

        // For repeating events
        dates.forEach(function(date){
          var startDate = date.value;
          // Send end date of the event to the end of the same day
          var endDate = new Date(startDate);
          endDate.setHours(23);
          endDate.setMinutes(59);
          endDate.setSeconds(59);
          var url = calendarEvent.get('additionalLink1') ? calendarEvent.get('additionalLink1')[0]['url'] : null;
          
          var ev = {
            'id': calendarEvent.get('id'),
            'title': calendarEvent.get('title'),
            'start': startDate,
            'end': endDate,
            'url': url,
            'description': calendarEvent._data.description,
            'image': calendarEvent._data.masterImage
          };
          events.push(ev);
        });
      });
      return events;
    }),

    didInsertElement: function(){
      // Display blank calendar while loading
      $('.nasa-calendar').fullCalendar({
        header: {
          left: '',
          center: '',
          right: 'title prev,next'
        },
        events: [],
        theme: true,
        aspectRatio: 0
      });
    },

    renderCalendar: function(){
      var events = this.get('eventList'),
          isLoading = this.get('controller.isLoading'),
          selector = '.nasa-calendar',
          element = $(selector);

      // Wait until event data is done loading
      if(isLoading || !events.length) {
        return;
      }

      var self = this;
      element.fullCalendar('destroy'); // Destroy previous calendar in order to load new events
      element.fullCalendar({
        header: {
          left: '',
          center: '',
          right: 'title prev,next'
        },
        events: events,
        theme: true,
        eventLimit:1,
        eventLimitText: function(n){
          return n + ' events';
        },
        defaultDate: this.get('controller.currentDate'),
        eventMouseover: function(event) {
          $(this).popover({
            html: true,
            placement: function(tip, element) {
                var offset = $(element).offset();
                if (offset.left > 325) {
                  return "left";
                }
                if (offset.left < 325) {
                  return "right";
                }
                if (offset.top < 300){
                  return "bottom";
                }
                return "top";
              },
            trigger: 'manual',
            container: 'body',
            content: function() {
              var imgUrl = event.image ? event.image.get('crop1x1') : null;
              var date = window.moment(event.start.toString(), "ddd MMM DD YYYY hh:mm:ss").format("ddd, MMM Do YYYY h:mma");

              var text = (event.start ? '<div class="time">'+date+'</div>' : '');
              text += (event.description ? '<div class="description">'+event.description+'</div>' : '');

              var output = '<div class="calendar-popover-content">';
              if(imgUrl) {
                output += '<img src="'+imgUrl+'" />';
              }
              output += '<div class="text">' + text + '</div>';
              output += '</div>';

              return output;
            }
          });
          $(this).popover('show');
        },
        eventMouseout: function() {
          $(this).popover('hide');
        },
        // Handler when calendar rerenders, such as when the month changes
        viewRender: function(view, element) {
          var currentDate = self.get('controller.currentDate'),
              viewDate = view.calendar.getDate();

          // If the date changed, load new events
          if(viewDate.format('X') != currentDate.format('X')){
            self.set('controller.currentDate', window.moment(view.calendar.getDate()));
          }
        },
        aspectRatio: 0
      });
      element.fullCalendar('render');
      $(selector+' .fc-toolbar .fc-left').html('<div class="nasa-calendar-title">'+this.get('controller.title')+'</div>');

    }.observes('controller.isLoading')
  });

});
define('nasa/views/header', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'header',
  });

});
define('nasa/views/image-gallery', ['exports', 'ember', 'nasa/mixins/gallery-view-mixin', 'nasa/mixins/gallery-item-view-mixin'], function (exports, Ember, GalleryViewMixin, GalleryItemViewMixin) {

  'use strict';

  exports['default'] = Ember['default'].CollectionView.extend(GalleryViewMixin['default'], {
    itemViewClass: Ember['default'].View.extend(GalleryItemViewMixin['default'], {
      templateName: 'image-card',
      title: Ember['default'].computed.alias('parentView.title')
    }),
  });

});
define('nasa/views/image-thumb', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'image-thumb',
    image: Ember['default'].computed.alias('content.masterImage.crop1x1'),
    didInsertElement: function(){
      Ember['default'].run.scheduleOnce('afterRender',this,function(){
        this.get('parentView.parentView').renderSlides();
      });
    },
    click: function(){
      this.container.lookup('controller:image').set('activeID', this.get('content.id'));
    }
  });

});
define('nasa/views/image', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend({
	});

});
define('nasa/views/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend({
	});

});
define('nasa/views/info-pane', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'infopane',
    classNames: ['hidden-xs'],
  });

});
define('nasa/views/landing-page', ['exports', 'ember', 'nasa/mixins/before-after-image'], function (exports, Ember, BeforeAfter) {

  'use strict';

  exports['default'] = Ember['default'].View.extend( BeforeAfter['default'], {
    classNameBindings: ['isGallery'],
    isGallery: Ember['default'].computed.alias('controller.isGallery')
  });

});
define('nasa/views/launchschedule-date', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'launchschedule-date',

    date: Ember['default'].computed('start','end','options', function(){
      var startDate = this.get('start'),
          endDate = this.get('end'),
          options = this.get('options'),
          isAllDay = this.get('isAllDay'),
          date_format = !isAllDay ? "MMMM D, YYYY - h:mm [%MERIDIEM%] [Eastern]" : "MMMM D, YYYY",
          time_format = "h:mm [%MERIDIEM%]",
          timezone = "Eastern",
          tz_format = 'America/New_York',
          date_prefix = 'Date: ',
          formats = this.get('controller.dateFormats');

      if(options){
        for (var i=0; i < options.length; i++) {
          var opt = formats[options[i]];
          switch(opt.machine_name){
            case 'prefix_targeted_date':
              date_prefix = "Targeted Date: ";
              break;
            case 'prefix_no_earlier_than':
              date_prefix = "No Earlier Than: ";
              break;
            case 'show_pacific_timezone':
              date_format = date_format.replace("Eastern","Pacific");
              timezone = "Pacific";
              tz_format = 'America/Los_Angeles';
              break;
            case 'show_month_only':
              date_format = "MMMM";
              break;
            case 'show_end_date':
              date_format = "MMMM D, YYYY";
              break;
            case 'under_review':
              date_format = "'Under Review'";
              break;
          }
        }
      }
      var startMoment = window.moment(startDate).tz(tz_format),
          endMoment = window.moment(endDate).tz(tz_format);

      var sMeridiem = startMoment.format('a');
      sMeridiem = sMeridiem == 'am' ? 'a.m.' : 'p.m.';
      var eMeridiem = endMoment.format('a');
      eMeridiem = eMeridiem == 'am' ? 'a.m.' : 'p.m.';

      var listing_date_string = startMoment.format(date_format);
      listing_date_string = listing_date_string.replace('%MERIDIEM%', sMeridiem);
      if(options){
        for(i=0; i < options.length; ++i){
          opt = formats[options[i]];
          switch(opt.machine_name){
            case 'show_end_date': listing_date_string = listing_date_string+"<br />Launch Window: ";
              listing_date_string += startMoment.format(time_format) + ' -- ';
              listing_date_string = listing_date_string.replace('%MERIDIEM%', sMeridiem);
              listing_date_string += endMoment.format(time_format)+ ' ' + timezone;
              listing_date_string = listing_date_string.replace('%MERIDIEM%', eMeridiem);
            break;
          }
        }
      }

      return '<span class="launch-label">' + date_prefix + '</span>' + listing_date_string;
    })
  });

});
define('nasa/views/launchschedule', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'launchschedule',

    hasContent: Ember['default'].computed.gt('controller.calendarEvents.length', 0),
    isLoading: Ember['default'].computed.alias('controller.isLoading'), // If API is still loading
  });

});
define('nasa/views/missions/sidebar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].View.extend({
    didInsertElement: function(){
      Ember['default'].run.scheduleOnce('afterRender',function(){
        $('#menu + #main-content').css('margin-left','325px');
        $('.isotope-container').isotope('layout');
      });
    },
  });

});
define('nasa/views/navbar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var $ = Ember['default'].$;

  exports['default'] = Ember['default'].View.extend({
    classNames: ['navbar-view'],
    navmenu: Ember['default'].computed.alias('controller.navmenu'),

    onInit: function(){
      this.get('navmenu');
    }.on('init'),

    didInsertElement: function() {
      this.get('navmenu').then(function(nav){
        var tree = nav.get('tree');
        var list = [];
        $.each(tree, function(title, menu){
          var menu_item = $('<li class="dropdown"></li>');
          var menu_link = null;

          if (menu.link.href == '<nolink>' && menu.link.has_children == '1') {
            menu_link = $('<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"></a>');
            var markup = '<span>'+title+'</span>';
            markup += '<span class="glyphicon glyphicon-chevron-down pull-right"></span>';
            menu_link.html(markup);
            menu_item.append(menu_link);

            var child_list = $('<ul class="dropdown-menu dropdown-menu-left"></ul>');
            $.each(menu.children, function(link_title, link_value){
              if(link_value.link.href == '<separator>'){
                child_list.append($('<li class="divider"></li>'));
              }
              else if (link_value.link.href == '<nolink>') {
                child_list.append($('<li class="no-link"><a>'+link_title+'</a></li>'));
              }
              else {
                child_list.append($('<li><a href="'+link_value.link.href+'">'+link_title+'</a></li>'));
              }
            });
            menu_item.append(child_list);
          }
          else {
            menu_link = $('<a href="'+menu.link.href+'"></a>');
            menu_link.html('<span>'+title+'</span>');
            menu_item.append(menu_link);
          }
          list.push(menu_item);
        });

        $('#nasa-main-menu').empty();
        $('#nasa-main-menu').append(list);
        $('.dropdown-toggle').dropdown();
      });
    }
  });

});
define('nasa/views/panelpage', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'panelpage',

    getTitle: function(){
      return window.pagetitle;
    }.property(),
  });

});
define('nasa/views/slide-content', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    tagName:'li',

    templateName: "slide-content",

    uri: Ember['default'].computed.alias('content.uri'),

    videoId: Ember['default'].computed.alias('content.video.id'),

    videoName: function(){
      return 'yt-'+this.get('content.video.id');
    }.property('content.video.id'),

    url: Ember['default'].computed.alias('content.masterImage.crop4x3ratio'),

    title: function() {
      var attr = this.get('isImageGallery') ? 'content.title':'content.video.title';
      return this.get(attr);
    }.property(),

    promo_sentence: function() {
      return this.get('content.video.description');
    }.property('content.video.description'),

    type: function() {
      return this.get('isImageGallery') ? 'image':'video';
    }.property(),
    
    poster: function() {
      return this.get('content.video.thumbnail.hqDefault');
    }.property(),

    download: function(){
      return this.get('content.video.download');
    }.property(),

  });

});
define('nasa/views/story-feed', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].CollectionView.extend({
    tagName: 'ul',
    itemViewClass: Ember['default'].View.extend({
      templateName: 'story-link',
      classNameBindings: ['isLoading'],
      isLoading: true,

      didInsertElement: function () {
        var self = this,
            image = new Image();

        image.src = this.get('content.masterImage.lrThumbnail');

        image.onload = function() {
          self.set('isLoading', false);
        };
      },

      style: function() {
        if (this.get('content.masterImage.lrThumbnail')) {
          return "background-image:url('" + this.get("content.masterImage.lrThumbnail") + "')";
        }
        return false;
      }.property('content.masterImage.lrThumbnail'),
    })
  });

});
define('nasa/views/thumbnail-slider', ['exports', 'ember', 'nasa/views/image-thumb', 'nasa/views/video-thumb'], function (exports, Ember, ImageThumb, VideoThumb) {

    'use strict';

    exports['default'] = Ember['default'].CollectionView.extend({
        tagName:'ul',
        classNames:['slides','thumb-gallery'],
        templateName: "thumbnail-slider",

        createChildView: function(viewClass,attrs){
          viewClass = this.get('isImageGallery') ? ImageThumb['default'] : VideoThumb['default'];
          return this._super(viewClass, attrs);
        }

    });

});
define('nasa/views/ubernode-listing-item', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'ubernode-listing-item',
    classNames: ['ubernode'],

    promoTitle: Ember['default'].computed.alias('content.cardfeedTitle'),
    promoDateTime: Ember['default'].computed.alias('content.promoDateTime'),
    promoSentence: Ember['default'].computed.alias('content.prLeaderSentence'),
    imageCaption: Ember['default'].computed.alias('content.imageFeatureCaption'),
    description: Ember['default'].computed('promoSentence', 'imageCaption', function(){
      var promo = this.get('promoSentence'),
          caption = this.get('imageCaption');
      return promo ? promo : caption;
    }),

    ubernodeType: Ember['default'].computed.alias('content.ubernodeType'),
    nodeUri: Ember['default'].computed.alias('content.uri'),
    linkOrAttachment: Ember['default'].computed.alias('content.linkOrAttachment'),
    attachments: Ember['default'].computed.alias('content.attachments'),
    collectionAssetLink: Ember['default'].computed.alias('content.collectionAssetLink'),

    onInit: function() {
      var content = this.get('content'),
          type = this.get('ubernodeType');

      this.get('promoTitle');
      this.get('promoSentence');
    }.on('init'),

    cardFeedLink: function() {
      // if not a collection asset, always use the node path
      if (this.get('ubernodeType') !== 'collection_asset') {
        return this.get('nodeUri');
      }
      // if it is a collection asset, check if it's a link or attachment and link to that instead
      if (this.get('linkOrAttachment') === 'attachment') {
        return this.get('attachments.path');
      } else if (this.get('linkOrAttachment') === 'link') {
        return this.get('collectionAssetLink.url');
      } 
      return false;
    }.property('ubernodeType', 'linkOrAttachment', 'attachments.path', 'collectionAssetLink.url'),
  });

});
define('nasa/views/upcomingevent-item', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'upcomingevent-item',
    classNames: ['upcomingevent'],

    eventDate: Ember['default'].computed.alias('content'),
    description: Ember['default'].computed.alias('content.content.title'),

    onInit: function() {
      this.get('eventDate');
      this.get('description');
    }.on('init'),

    date: Ember['default'].computed('eventDate', 'controller.dataFormats', function(){
      var startDate = this.get('eventDate.start'),
          endDate = this.get('eventDate.end'),
          options = this.get('eventDate.content.dateFormat'),
          isAllDay = this.get('eventDate.content.isAllDay'),
          date_format = !isAllDay ? "h:mm [%MERIDIEM%], dddd, MMMM D" : "dddd, MMMM D",
          time_format = "h:mm [%MERIDIEM%]",
          timezone = "Eastern",
          tz_format = 'America/New_York',
          date_prefix = '',
          formats = this.get('controller.dateFormats');

      if(options){
        for (var i=0; i < options.length; i++) {
          var machine_name = formats[options[i]].get('machineName');
          switch(machine_name){
            case 'prefix_targeted_date':
              date_prefix = "Targeted Date: ";
              break;
            case 'prefix_no_earlier_than':
              date_prefix = "No Earlier Than: ";
              break;
            case 'show_pacific_timezone':
              date_format = date_format.replace("Eastern","Pacific");
              timezone = "Pacific";
              tz_format = 'America/Los_Angeles';
              break;
            case 'show_month_only':
              date_format = "MMMM";
              break;
            case 'show_end_date':
              date_format = "dddd, MMMM D";
              break;
            case 'under_review':
              date_format = "[Under Review]";
              break;
          }
        }
      }
      var startMoment = window.moment(startDate).tz(tz_format),
          endMoment = window.moment(endDate).tz(tz_format);

      // AP-date and moment-alt components setup moment to spit out the
      // correct format for am pm
      var sMeridiem = startMoment.format('a');
      //sMeridiem = sMeridiem == 'am' ? 'a.m.' : 'p.m.';
      var eMeridiem = endMoment.format('a');
      //eMeridiem = eMeridiem == 'am' ? 'a.m.' : 'p.m.';

      var listing_date_string = startMoment.format(date_format);
      listing_date_string = !isAllDay ? listing_date_string : 'TBD, '+listing_date_string;
      listing_date_string = listing_date_string.replace('%MERIDIEM%', sMeridiem);
      if(options){
        for(i=0; i < options.length; ++i){
          machine_name = formats[options[i]].get('machineName');
          switch(machine_name){
            case 'show_end_date': 
              listing_date_string = listing_date_string+"<br /> ";//Launch Window: ";
              listing_date_string += startMoment.format(time_format) + ' -- ';
              listing_date_string = listing_date_string.replace('%MERIDIEM%', sMeridiem);
              listing_date_string += endMoment.format(time_format)+ ' ' + timezone;
              listing_date_string = listing_date_string.replace('%MERIDIEM%', eMeridiem);
            break;
          }
        }
      }

      return '<span class="date-label">' + date_prefix + '</span><span class="date-text">' + listing_date_string + '</span>';
    })
  });

});
define('nasa/views/upcomingevents', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'upcomingevents',
    classNames: ['hidden-xs'],

    isLoading: Ember['default'].computed.alias('controller.isLoading'), // If API is still loading

    itemTemplate: 'upcomingevent-item',
  });

});
define('nasa/views/video-gallery', ['exports', 'ember', 'nasa/mixins/gallery-view-mixin', 'nasa/mixins/gallery-item-view-mixin'], function (exports, Ember, GalleryViewMixin, GalleryItemViewMixin) {

    'use strict';

    exports['default'] = Ember['default'].CollectionView.extend(GalleryViewMixin['default'],{
        itemViewClass: Ember['default'].View.extend(GalleryItemViewMixin['default'],{
            templateName: 'video-card',
            classNames: ['video gallery-card'],
            playlistId: Ember['default'].computed.alias('parentView.ytPlaylistId'),
            title: Ember['default'].computed.alias('parentView.title')
        }),

        didInsertElement: function() {
          this.$().parent().isotope('layout');
        }
    });

});
define('nasa/views/video-thumb', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    templateName: 'video-thumb',
    videoId: Ember['default'].computed.alias('content.id'),
    title: Ember['default'].computed.alias('content.title'),
    image: Ember['default'].computed.alias('content.image'),
    parentController: Ember['default'].computed.alias('parentView.parentView.parentView.controller'),
    click: function(){
      this.get('parentController').set('activeID', this.get('videoId'));
    }
  });

});
define('nasa/views/video', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend({
	});

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('nasa/config/environment', ['ember'], function(Ember) {
  var prefix = 'nasa';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("nasa/tests/test-helper");
} else {
  require("nasa/app")["default"].create({"disqus":{"shortname":"nasagov"}});
}

/* jshint ignore:end */
