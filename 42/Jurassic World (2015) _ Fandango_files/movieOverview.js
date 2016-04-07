/*global Modernizr, jQuery, $, document, window, setTimeout, console */
'use strict';
var Fandango = Fandango || {};

Fandango.movieOverview = {
  initialize: function () {
    if (typeof mediaServiceURL != undefined) {
      var mediaAutoPlay = false;
      if (Fandango.mediaPlayer.urlParam('autoplay') == 'true') {
        mediaAutoPlay = true;
      }
      Fandango.mediaPlayer.initialize({ autoPlay: mediaAutoPlay, hasEndCard: true });
    }

    if (Modernizr.touch) {
      Fandango.movieOverview.loadNativeVisualListCarousel();
    } else {
      Fandango.movieOverview.loadVisualListCarousel(10);
    }

    this.addCarouselAutoplayListener();
  },

  loadNativeVisualListCarousel: function (selector) {
    $('.visual-list-container').addClass('native-scrolling');
  },

  loadVisualListCarousel: function (minItems) {
    if (jQuery().bxSlider) {
      // if less than minItems then add enough items so it's at least minItems.
      var $theSlider = $('.visual-list.bxslider');

      // need to handle multiple sliders on the page
      $theSlider.each(function (index) {
        var sliderItems = $(this).find('.visual-item').length,
          addThis = null,
          markup = '',
          properHost = (('https:' == document.location.protocol) ? Fandango.global.resourcePathSecure : Fandango.global.resourcePath);

        if (sliderItems < minItems) {
          addThis = minItems - sliderItems;
          for (var i = 0; i < addThis; i++) {
            markup += '<li class="visual-item"><a class="visual-container"><img class="visual-thumb visual-thumb-placeholder" src="' + properHost + 'redesign/static/img/transparent.png" /></a><a class="visual-detail"><span class="visual-title dark">&nbsp;</span><span class="visual-sub-title">&nbsp;</span></a></li>\n';
          }
          $(this).append(markup);
        }
      });

      setTimeout(function () {
        $theSlider.removeClass('native-scrolling').bxSlider({
          speed: 700,
          easing: 'ease-in-out',
          slideWidth: 125,
          slideMargin: 8,
          minSlides: 2,
          maxSlides: minItems,
          moveSlides: 3,
          startSlide: 0,
          preloadImages: 'all',
          pager: false,
          onSliderLoad: function (currentIndex) {
            if (jQuery().unveil) {
              $('.bxslider .lazy').unveil(1, function () {
                $(this).removeClass('lazy');
              });
            }
          }
        });
      }, 250);
    } else {
      if (window.console) {
        window.console.log('bxSlider not loaded');
      }
    }
  },

  addCarouselAutoplayListener: function () {
    var addListener = window[window.addEventListener ? 'addEventListener' : 'attachEvent'];
    var eventName = window.addEventListener ? 'message' : 'onmessage';

    addListener(eventName, function (e) {
      var data = e[e.message ? 'message' : 'data'];
      if (data && (data.name === 'take2player:OnReleaseEnd') && (typeof (Fandango.mediaPlayer) != 'undefined')) {
        Fandango.mediaPlayer.playNext();
      }
    }, false);
  }
};

$(function () {
  Fandango.movieOverview.initialize();
});