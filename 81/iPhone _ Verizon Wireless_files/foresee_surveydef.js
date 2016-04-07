var $$FSR = {
  'enabled': true,
  'frames': false,
  'sessionreplay': true,
  'auto': true,
  'encode': true,
  'version': '18.1.8',
  'files': '/foresee/',
  // The 'swf_files' attribute needs to be set when foresee_transport.swf is not located at 'files'
  //'swf_files': '/some/other/location/'
  'id': 'QG52/7UvP6SjO2WPnYHBQA==',
  'definition': 'foresee_surveydef.js',
  'swf': {
    'fileName': 'foresee_transport.swf',
    'scriptAccess': 'always'
  },
  'worker': 'foresee_worker.js',
  'embedded': false,
  'replay_id': 'verizonwireless.com',
  'site_id': 'verizonwireless.com',
  'attach': false,
  'renderer': 'W3C',
  // or "ASRECORDED"
  'layout': 'CENTERFIXED',
  // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
  'triggerDelay': 0,
  'heartbeat': true,
  'enableAMD': false,
  'pools': [{
    'path': '.',
    'sp': 100 // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
  }],
  'sites': [{
    'path': /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
  },
  {
    'path': '.',
    'domain': 'default'
  }],
  'storageOption': 'cookie',
  'nameBackup': window.name,
  'iframeHrefs': ["frameWorker.html"],
  'acceptableorigins': []
};

$$FSR.FSRCONFIG = {};

(function (config) {

  var FSR, supports_amd = !! config.enableAMD && typeof(_4c.global["define"]) === 'function' && !! _4c.global["define"]["amd"];

  if (!supports_amd) FSR = window.FSR;
  else FSR = {};
/*
 * ForeSee Survey Def(s)
 */
  FSR.surveydefs = [{
    name: 'tablet_web',
    section: 'support',
    pin: 1,
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your site experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll help",
          locale: "en"
        }],
        [{
          reverseButtons: false,
          headline: "Thank you for helping!",
          blurb: "Please provide your email address or phone number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.<br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br /><br />",
          attribution: "Conducted by ForeSee.",
          declineButton: "Cancel",
          acceptButton: "email/text me",
          locale: "en",
          mobileExitDialog: {
            support: "b",
            //e for email only, s for sms only, b for both
            inputMessage: "email or phone number",
            emailMeButtonText: "email me",
            textMeButtonText: "text me",
            fieldRequiredErrorText: "Enter a phone number or email address",
            invalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
          }
        }]
      ]
    },
    pop: {
      when: 'later',
      pu: false
    },
    criteria: {
      sp: 30,
      lf: 2
    },
    platform: 'tablet',
    include: {
      urls: ['support']
    }
  },
  {
    name: 'mobile_web',
    section: 'support',
    pin: 1,
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll help",
          locale: "en"
        }],
        [{
          reverseButtons: false,
          headline: "Thank you for helping!",
          blurb: "Please provide your email address or phone number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.<br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br /><br />",
          attribution: "Conducted by ForeSee.",
          declineButton: "Cancel",
          acceptButton: "email/text me",
          locale: "en",
          mobileExitDialog: {
            support: "b",
            //e for email only, s for sms only, b for both
            inputMessage: "email or phone number",
            emailMeButtonText: "email me",
            textMeButtonText: "text me",
            fieldRequiredErrorText: "Enter a phone number or email address",
            invalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
          }
        }]
      ]
    },
    pop: {
      when: 'later',
      pu: false
    },
    criteria: {
      sp: 30,
      lf: 2
    },
    platform: 'phone',
    include: {
      urls: ['support']
    }
  },
  {
    name: 'browse',
    section: 'support',
    platform: 'desktop',
    pin: 1,
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          blurb: "Thank you for visiting Verizon Wireless Support. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
          noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
          attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
          closeInviteButtonText: "Click to close.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll give feedback",
          error: "Error",
          warnLaunch: "this will launch a new window"

        }]
      ]
    },
    pop: {
      when: 'later',
      pu: false
    },
    criteria: {
      sp: 40,
      lf: 2
    },
    include: {
      urls: ['/support/']
    }
  },
  {
    name: 'browse',
    section: 'acctmgmt',
    platform: 'desktop',
    pin: 1,
    invite: {
      when: 'onentry'
    },
    pop: {
      when: 'later',
      pu: false
    },
    criteria: {
      sp: 3,
      lf: 3
    },
    include: {
      cookies: [{
        name: 'loggedIn',
        value: 'true'
      }]
    }
  },
  {
    name: 'tablet_web',
    section: 'main',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your site experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll help",
          locale: "en"
        }],
        [{
          reverseButtons: false,
          headline: "Thank you for helping!",
          blurb: "Please provide your email address or phone number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.<br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br /><br />",
          attribution: "Conducted by ForeSee.",
          declineButton: "Cancel",
          acceptButton: "email/text me",
          locale: "en",
          mobileExitDialog: {
            support: "b",
            //e for email only, s for sms only, b for both
            inputMessage: "email or phone number",
            emailMeButtonText: "email me",
            textMeButtonText: "text me",
            fieldRequiredErrorText: "Enter a phone number or email address",
            invalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
          }
        }]
      ]
    },
    pop: {
      when: 'later',
      pu: false
    },
    criteria: {
      sp: 3,
      lf: 2
    },
    platform: 'tablet',
    include: {
      urls: ['.']
    }
  },
  {
    name: 'mobile_web',
    section: 'main',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          headline: "We'd welcome your feedback!",
          blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll help",
          locale: "en"
        }],
        [{
          reverseButtons: false,
          headline: "Thank you for helping!",
          blurb: "Please provide your email address or phone number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.<br /><br />ForeSee's <a href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a><br /><br />",
          attribution: "Conducted by ForeSee.",
          declineButton: "Cancel",
          acceptButton: "email/text me",
          locale: "en",
          mobileExitDialog: {
            support: "b",
            //e for email only, s for sms only, b for both
            inputMessage: "email or phone number",
            emailMeButtonText: "email me",
            textMeButtonText: "text me",
            fieldRequiredErrorText: "Enter a phone number or email address",
            invalidFormatErrorText: "Format should be: name@domain.com or 123-456-7890"
          }
        }]
      ]
    },
    pop: {
      when: 'later',
      pu: false
    },
    criteria: {
      sp: 0.5,
      lf: 2
    },
    platform: 'phone',
    include: {
      urls: ['.']
    }
  },
  {
    name: 'browse_sp',
    section: 'main',
    platform: 'desktop',
    invite: {
      when: 'onentry',
      dialogs: [{
        reverseButtons: false,
        headline: "¡Le agradeceríamos sus opiniones y comentarios!",
        blurb: "Le agrademos su visita Verizon Wireless. Usted ha sido elegido(a) al azar para participar en una breve encuesta de satisfacción del cliente para informarnos acerca de cómo podemos mejorar su experiencia con nosotros.",
        noticeAboutSurvey: "La encuesta está diseñada para medir toda su experiencia con nosotros, sírvase buscarla al finalizar su visita.",
        attribution: "Esta encuesta se realiza a través de una empresa independiente, ForeSee, en nombre del sitio que usted está visitando.",
        closeInviteButtonText: "Haga clic para cerrar.",
        declineButton: "No, gracias",
        acceptButton: "Sí, deseo dar mi opinión"
      }]
    },
    pop: {
      when: 'later',
      pu: false
    },
    tracker: {
      url: 'tracker_es.html',
      alert: {
        enabled: true,
        message: 'Su encuesta ya está disponible.'
      }
    },
    criteria: {
      sp: 5,
      lf: 3
    },
    repeatdays: 90,
    include: {
      urls: ['es.verizonwireless.com']
    }
  },
  {
    name: 'browse',
    section: 'main',
    platform: 'desktop',
    invite: {
      when: 'onentry'
    },
    pop: {
      when: 'later',
      what: 'qualifier',
      pu: true
    },
    qualifier: {
      url: 'reminder.html'
    },
    criteria: {
      sp: 4,
      lf: 2
    },
    include: {
      urls: ['.']
    }
  }];

/*
 * ForeSee Properties
 */
  FSR.properties = {
    repeatdays: 120,

    repeatoverride: false,

    altcookie: {},

    language: {
      locale: 'en'
    },

    exclude: {},

    ignoreWindowTopCheck: false,

    ipexclude: 'fsr$ip',

    mobileHeartbeat: {
      delay: 60,
      /*mobile on exit heartbeat delay seconds*/
      max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },

    invite: {

      // For no site logo, comment this line:
      siteLogo: "sitelogo.gif",

      //alt text fore site logo img
      siteLogoAlt: "",

      /* Desktop */
      dialogs: [
        [{
          reverseButtons: true,
          headline: "Please help us improve your Verizon experience",
          blurb: "You will receive a brief survey at the end of your visit",
          noticeAboutSurvey: "We value your feedback, which we will use to improve your future experience on the site.",
          //attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
          closeInviteButtonText: "Click to close.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll give feedback",
          error: "Error",
          warnLaunch: "this will launch a new window"
        }]
      ],

      exclude: {
        urls: ['myaccount.verizonwireless.com', 'login.verizonwireless.com', 'search.verizonwireless.com', 'aboutus.verizonwireless.com', 'mediastore.verizonwireless.com', 'CustomerInfo.jsp', /\?item\=checkoutItem\&action\=processing\.jsp/, /\?item\=shoppingCartItem\&action\=viewShoppingCart/, '/accessories/checkout/', /\?action\=continueToCart/, 'vzwstage.sdc.vzwcorp.com', 'currant.sdc.vzwcorp.com', 'preprodecache.vzw.com', 'accessmgrqa1.sdc.vzwcorp.com', 'qa1billpay.sdc.vzwcorp.com', 'myacctqa1web1.sdc.vzwcorp.com', 'accessmgrqa4.sdc.vzwcorp.com', 'qa4billpay.sdc.vzwcorp.com', 'myacctqa4web1.sdc.vzwcorp.com', 'accessmgrqa5.sdc.vzwcorp.com', 'myacctqa5web1.sdc.vzwcorp.com', 'qa5billpay.sdc.vzwcorp.com', '/cart/cart.jsp', '/checkout/checkout.jsp', 'vzwstagemyacct.sdc.vzwcorp.com', '/myv/', '/vzw/', 'login.vzw.com', 'myverizonid.verizon.com', 'pretmyverizonid.verizon.com', 'prepay'],
        referrers: [],
        userAgents: [],
        browsers: [],
        cookies: [],
        variables: []
      },
      include: {
        local: ['.']
      },

      delay: 0,
      timeout: 0,

      hideOnClick: false,

      hideCloseButton: false,

      css: 'foresee_dhtml.css',

      hide: [],

      hideFlash: false,

      type: 'dhtml',
      /* desktop */
      // url: 'invite.html'
      /* mobile */
      url: 'invite-mobile.html',
      back: 'url'

      //SurveyMutex: 'SurveyMutex'
    },

    tracker: {
      width: '690',
      height: '415',

      // Timeout is the normal between-page timeout
      timeout: 15,

      // Fast timeout is when we think there's a good chance we've closed the browser
      fasttimeout: 15,

      adjust: false,
      alert: {
        enabled: true,
        message: 'The survey is now available.'
      },
      url: 'tracker.html'
    },

    survey: {
      width: 690,
      height: 600
    },

    qualifier: {
      footer: '<div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
      width: '690',
      height: '500',
      bgcolor: '#333',
      opacity: 0.7,
      x: 'center',
      y: 'center',
      delay: 0,
      buttons: {
        accept: 'Continue'
      },
      hideOnClick: false,
      css: 'foresee_dhtml.css',
      url: 'qualifying.html'
    },

    cancel: {
      url: 'cancel.html',
      width: '690',
      height: '400'
    },

    pop: {
      what: 'survey',
      after: 'leaving-site',
      //pu : true,
      tracker: true
    },

    meta: {
      referrer: true,
      terms: true,
      ref_url: true,
      url: true,
      url_params: false,
      user_agent: false,
      entry: false,
      entry_params: false
    },

    events: {
      enabled: true,
      id: true,
      codes: {
        purchase: 800,
        items: 801,
        dollars: 802,
        followup: 803,
        information: 804,
        content: 805
      },
      pd: 7,
      custom: {}
    },

    previous: false,

    analytics: {
      google_local: false,
      google_remote: false
    },

    cpps: {
      Channel: {
        source: 'variable',
        init: 'No',
        name: 's.channel'
      },
      isAuthenticated: { //this will be the name of the cpp
        source: 'variable',
        name: 'isAuth' //the value sent will be the value of the parameter
      },
      Visitor_Id: {
        source: 'variable',
        name: 's.eVar32'
      },
      Gadgets_Gears_Site: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '/beta/accessories',
          value: 'Beta'
        },
        {
          regex: '/b2c/store/accessories',
          value: 'B2C Store'
        },
        {
          regex: '/accessories',
          value: 'New'
        }]
      },
      Prepay_Site: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '/beta/prepaid/',
          value: 'Beta'
        },
        {
          regex: '/prepaid/',
          value: 'New'
        },
        {
          regex: '/b2c/prepay/',
          value: 'Legacy'
        },
        {
          regex: '/myvprepay/home/',
          value: 'Home'
        }]
      },
      Test_And_Target: {
        source: 'variable',
        name: 's_tnt'
      },
      Device_ID: {
        source: 'cookie',
        name: 'p'
      },
      Simulator_Visitors: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '/simulator/',
          value: 'Y'
        }]
      },
      KB_Articles: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '.kb',
          value: 'Y'
        }]
      },
      Plan_Page: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '/plan',
          value: 'Y'
        }]
      },
      Account_Page: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '/account',
          value: 'Y'
        }]
      },
      Features_Services_Page: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: 'Features_&_Services',
          value: 'Y'
        }]
      },
      Device_Page: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '/devices',
          value: 'Y'
        }]
      },
      Chat: {
        source: 'cookie',
        init: 'N',
        name: 'HumanClickCHATKEY',
        value: 'Y'
      },
      CustType: {
        source: 'url',
        init: 'Pst',
        patterns: [{
          regex: 'prepay',
          value: 'Pre'
        }]
      },
      OneClickCheckout: {
        source: 'variable',
        init: 'false',
        name: 'fsrOneClick',
        value: 'true'
      },
      Consolidated_Page: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '-help',
          value: 'Y'
        }]
      },
      Video: {
        source: 'url',
        init: 'N',
        patterns: [{
          regex: '-video',
          value: 'Y'
        }]
      },
      Authentication: {
        source: 'cookie',
        name: 'loggedIn'
      }
    },

    mode: 'first-party'
  };

  if (supports_amd) {
    define(function () {
      return FSR
    });
  }

})($$FSR);