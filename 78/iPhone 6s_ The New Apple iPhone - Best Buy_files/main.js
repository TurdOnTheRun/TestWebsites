var counter = 0;
var loop = 3;
var timeoutToKill = [];

window.onload = function() {

  animateTo('intro');

  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
}

function enablerInitHandler() {
  if (Enabler.isPageLoaded()) {
    pageLoadedHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
  }
}

function pageLoadedHandler() {
  if (Enabler.isVisible()) {
    adVisibilityHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisibilityHandler);
  }
}


function adVisibilityHandler() {
  initClickThru();
}


function initClickThru() {
  $('#clickTag').on('click', clickTagClick);
  $('#learnMore').on('click', learnMoreClick);
}

function clickTagClick(e) {
  animateTo('clickEndFrame');
  Enabler.exit('clickTagExit', 'https://www.google.com/intl/en_us/chrome/devices/chromecast/index.html?utm_source=chromecast.com');
}

function learnMoreClick(e) {
  animateTo('clickEndFrame');
  Enabler.exit('learnMoreExit', 'https://www.google.com/intl/en_us/chrome/devices/chromecast/index.html?utm_source=chromecast.com');
}

function killDelayedCalls(){
  for (var i = timeoutToKill.length - 1; i >= 0; i--) {
    clearTimeout(timeoutToKill[i]);
  };
}

function animateTo(frameName) {
  switch (frameName) {
    case 'replay':
      break;
    case 'intro':
      // GO BIG WITH YOUR FAVORITE GAMES.
      $.delayedCall(0.6, function() {
        $('#intro-message').append('UNLIMITED ');
      });
      $.delayedCall(1.1, function() {
        $('#intro-message').append('ENTERTAINMENT ');
      });
      $.delayedCall(1.6, function() {
        $('#intro-message').append('AT YOUR ');
      });
      $.delayedCall(2.1, function() {
        $('#intro-message').append('FINGERTIPS.');
      });

      timeoutToKill.push($.delayedCall(3.6, function() {
          animateTo('frame2');
        })
      );
      break;

    case 'frame2':
      // TV AND PHONE W/ CAST BTN
      $('#frame1').hide();

      $.delayedCall(0.4,function(){
        $('.tv, .tv-temp, .hand-phone, .hand-pointer, .chromecast_icon').show();
      });

      $.delayedCall(0.6,function(){
        $('.hand-phone, .chromecast_icon').addClass('move');
      });

      $.delayedCall(1.15,function(){
        $('.hand-pointer').addClass('move1');
      });

      $.delayedCall(2.06,function(){
        $('.hand-pointer').addClass('move2');
      });

      $.delayedCall(1.95,function(){
        $('.chromecast_icon').addClass('full');
      });

      $.delayedCall(1.1,function(){
        $('.cast_ring').show();
      });

      // first slide
      timeoutToKill.push(
        $.delayedCall(2.5,function(){
          // $('#frame2 .tv-slides').show();
          $('#frame2 .tv-slides').animate({opacity: 1}, 300);
          $('#frame2 .hand-phone-slideshow').show();
        })
      );

      // Second slide
      timeoutToKill.push(
        $.delayedCall(3.5,function(){
          $('#frame2 .hand-phone-slideshow .slides').animate({'background-position': '-32px 0'}, 300, 'ease-out');
          $('#frame2 .tv-slides').animate({'background-position': '-177px 0'}, 300, 'ease-out');
        })
      );

      // Third slide
      timeoutToKill.push(
        $.delayedCall(4.5,function(){
          $('#frame2 .hand-phone-slideshow .slides').animate({'background-position': '-55px 0'}, 300, 'ease-out');
          $('#frame2 .tv-slides').animate({'background-position': '-354px 0'}, 300, 'ease-out');
        })
      );

      // $.delayedCall(2.6,function(){
      //   $('.tv-temp').animate({opacity: 0}, 150);
      // });


      endframe = setTimeout(function(){
          animateTo('endFrame');
      }, 5200);

      timeoutToKill.push(
        $.delayedCall(5.2, function() {
          animateTo('endFrame');
        })
      );

      break;

    case 'endFrame':
      $('#frame1').hide();
      $('.hand-pointer').animate({opacity: 0}, 0, function(){
        $(this).hide();
      });
      $('.tv-temp').animate({opacity: 0}, 0, function(){
        $(this).hide();
      });

      // Avoid double append when clicktag is clicked on
      if(  $('#endframe-copy').html() ==0  ){
        $('#endframe-copy').append('Cast everything you love from your phone<br>to your TV. ');

        $.delayedCall(0.25, function() {
          $('#endframe-copy').append('<span class="price">For $35.</span>');
        });
      }

      // fade in text
      $.delayedCall(0.5, function() {
        $('#endframe-copy').addClass('show');
      });

      $.delayedCall(1.5, function() {
        $('.price').addClass('show');
      });
      // Pausing rings at 15 seconds
      $.delayedCall(4.05, function() {
          forcePauseRings();
      });
      break;
      case 'clickEndFrame':
        clearTimeout(endframe);
        killDelayedCalls();
        $('#frame1').hide();

        $('.tv, .hand-phone, .chromecast_icon').show();
        $('.hand-phone, .chromecast_icon').addClass('move');
        $('.chromecast_icon').addClass('full');

        $('.cast_ring').show();
        $('.hand-phone-slideshow').show();


        $('#frame2 .hand-phone-slideshow .slides').animate({'background-position': '-55px 0'}, 0, 'ease-out');
        $('#frame2 .tv-slides').animate({'background-position': '-354px 0', opacity:1}, 0, 'ease-out');





        $('.hand-pointer').animate({opacity: 0}, 0, function(){
          $(this).hide();
        });
        $('.tv-temp').animate({opacity: 0}, 0, function(){
          $(this).hide();
        });
        // Avoid double append when clicktag is clicked on
        if(  $('#endframe-copy').html() ==0  ){
          $('#endframe-copy').append('Cast everything you love from your phone<br>to your TV. ');
          $('#endframe-copy').append('<span class="price">For $35.</span>');
        }
        $('#endframe-copy').addClass('show');
        $('.price').addClass('show');

        $('#frame2').show();
        $('#frame3').show();
        forcePauseRings();
        break;

  }
}
// Force pause rings for click thru
function forcePauseRings(){
  $('.cast_ring').show();
  $('.cast_ring.one').addClass('end-ring-one');
  $('.cast_ring.two').addClass('end-ring-two');
  $('.cast_ring.three').addClass('end-ring-three');
  $('.cast_ring.four').hide();
  $('.cast_ring').addClass('pause');
}
