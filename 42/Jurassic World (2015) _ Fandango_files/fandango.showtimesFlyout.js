var Fandango = Fandango || {};
"use strict";

Fandango.showtimesFlyout = {

    initialize: function() {
      Fandango.showtimesFlyout.loadShowtimesFlyout();
    },

    loadShowtimesFlyout: function (){
    /* Flyout div that appears absolutely on top of parent div */

         $(document).on('click', '.btn-inactive', function(e){ /* Inactive Showtimes buttons: No header, data message */
          e.preventDefault();
          e.stopPropagation(); // needed to allow hide flyout
          Fandango.showtimesFlyout.calculateAdHeight();
          $('.btn-inactive-flyout-msg').html($(this).attr("data-message"));
          parentOffsetLeft=$(this).offset().left;
          parentOffsetTop=$(this).offset().top;
          flyoutHeight = $('.btn-inactive-flyout').outerHeight();
          $('.btn-inactive-flyout').css("left",parentOffsetLeft-30+"px").css("top",parentOffsetTop-flyoutHeight-20-adHeight+"px"); // Bottom of flyout sits above text
          $('.btn-inactive-flyout').show();
        });

        $(document).on('click', '.showtimes-amenity, .showtimes-theater-option', function(e){ /* Showtimes Amenity icons, like IMAX: Data Header, Data Message */
          e.preventDefault();
          e.stopPropagation(); // needed to allow hide flyout
          Fandango.showtimesFlyout.calculateAdHeight();
          $('.showtimes-amenity-flyout .flyout-title').html($(this).attr("data-title"));
          $('.showtimes-amenity-flyout-msg').html($(this).attr("data-message"));
          parentOffsetLeft=$(this).offset().left;
          parentOffsetTop=$(this).offset().top;
          flyoutHeight = $('.showtimes-amenity-flyout').outerHeight();
            if ($(this).closest('.showtimes-theater-header').hasClass('is_stuck') === true){
              $('.showtimes-amenity-flyout').css("left",parentOffsetLeft-250+"px").css("top",parentOffsetTop+20-adHeight+"px"); // Top of flyout sits below text
            } else {
              $('.showtimes-amenity-flyout').css("left",parentOffsetLeft-30+"px").css("top",parentOffsetTop-flyoutHeight-10-adHeight+"px"); // Bottom of flyout sits above text
            }
          $('.showtimes-amenity-flyout').show();
        });

        $('.showtimes-theater-amenities').on("click", function(e){ /* Theater Amenities list, like Reserved Seating: Static header, Injected message */
          e.preventDefault(); 
          e.stopPropagation(); // needed to allow hide flyout
          Fandango.showtimesFlyout.calculateAdHeight();
          amenitiesList = $(this).parent().children('ul.theater-amenities').html();
          $('.theater-amenities-flyout-msg').html(amenitiesList);
          parentOffsetLeft=$(this).offset().left;
          parentOffsetTop=$(this).offset().top;
          flyoutHeight = $('.theater-amenities-flyout').outerHeight();
          if ($(this).closest('.showtimes-theater-header').hasClass('is_stuck') === true){
            $('.theater-amenities-flyout').css("left",parentOffsetLeft-50+"px").css("top",parentOffsetTop+20-adHeight+"px"); // Top of flyout sits below text
          } else {
            $('.theater-amenities-flyout').css("left",parentOffsetLeft-50+"px").css("top",parentOffsetTop-flyoutHeight-20-adHeight+"px"); // Bottom of flyout sits above text
          }
          $('.theater-amenities-flyout').show();
        });

        /* TLP Specific Flyouts, still uses theater amenities flyout template */
        $('.tlp-flyout-a').on("click", function(e){ /* Age Policy/Box Office: Data Header, Injected message */
          e.preventDefault(); 
          e.stopPropagation(); // needed to allow hide flyout
          Fandango.showtimesFlyout.calculateAdHeight();
          aIndex = $(this).index();
          messageHtml = $(this).siblings('div').eq(aIndex).html(); /* Message corresponds to the order of the anchor tag. Second <a> gets second <div>'s message. */
          $('.theater-amenities-flyout-msg').html(messageHtml);
          $('.theater-amenities-flyout .flyout-title').html($(this).attr("data-title"));
          parentOffsetLeft=$(this).offset().left;
          parentOffsetTop=$(this).offset().top;
          $('.theater-amenities-flyout').css("left",parentOffsetLeft-50+"px").css("top",parentOffsetTop+30-adHeight+"px"); // Top of flyout sits below text
          $('.theater-amenities-flyout').show();
        });

      //Hide flyout if click elsewhere,
      $('html').click(function(){
        $('.btn-inactive-flyout, .showtimes-amenity-flyout, .theater-amenities-flyout').hide();
      });

    },

    calculateAdHeight: function(){
      if($('.ad-unit.ad-topbanner').length===0){ /* Calculate height of top ad to subtract from flyout top */
        adHeight = 0;
      } else{
        adHeight=$('.ad-unit.ad-topbanner').outerHeight();
      }
    },
};

$(document).ready(function(){
  Fandango.showtimesFlyout.initialize();
});