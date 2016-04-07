define('tmz/shortcodes/1.0.2/shortcodes',
  ['jquery', 'templates/jst', 'logger', 'module'],
  function ($, templates, logger, module) {
    'use strict';

    logger = logger.getInstance(module.id);

    /**
     * shortcodes
     */
    var shortcodes = function shortcodes() {

      function tmzVideoEmbed(options) {
        var playerName = 'player' + randomNum();
        var customHeight = typeof options.height === 'undefined' ? 394 : parseInt(options.height);
        var customWidth = typeof options.width === 'undefined' ? 700 : parseInt(options.width);
        var endcard = typeof options.endcard === 'undefined' ? true : (options.endcard.toLowerCase() === 'true');
        logger.info(options.primary_image);
        var primaryImage = typeof options.primary_image === 'undefined' || options.primary_image === null ? '' : options.primary_image.filter(function( obj ) {
          return obj.value == "1080x608";
        });
        var launchQuote = typeof options.launch_quote === 'undefined' || options.launch_quote === null ? '' : options.launch_quote;
        var videoCredit = typeof options.video_credit === 'undefined' || options.video_credit === null ? '' : options.video_credit;
        var overlays = {
          launch_quote: launchQuote,
          video_credit: videoCredit
        };
        var launchQuoteTemplate = templates['shortcodes/tmz-video-launch-quote'](overlays);
        if(launchQuote === '' && videoCredit === '') {
          launchQuoteTemplate = '';
        }
        var source = {
          player_name: playerName,
          custom_height: customHeight,
          custom_width: customWidth,
          launch_quote_template: launchQuoteTemplate,
          endcard: endcard,
          video_id: options.id.replace('-', '_')
        }
        if(primaryImage !== '' && typeof primaryImage[0] !== 'undefined') {
          source.primary_image = primaryImage[0].url;
        }
        var embedTemplate = templates['shortcodes/tmz-video-embed'](source);
        $('#' + options.placeholder_id).html(embedTemplate);
      }

      return {
        tmzVideoEmbed: tmzVideoEmbed
      };

    };

    return shortcodes();
  }
);
