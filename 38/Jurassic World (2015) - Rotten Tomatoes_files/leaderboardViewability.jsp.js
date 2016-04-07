define(["jquery", "domReady!", "bezier"], function($) {  
  // TODO: this is not older-browser-friendly. Probably need to use jQuery or similar.
    
  var bannerEl = $('#header_and_leaderboard');
  bannerEl.addClass("header_and_leaderboard_scroll");
 
  if ($("#header-main").css('margin-top') === '0px') {
      $("#header-main").addClass("header_main_scroll");
  }

  // CUSTOMIZE THIS
  // The scroll distance to consider for the animation. If you scroll down
  // to 1/2 of the animationDistance, then the animation will be rendered at
  // the halfway point. Any scrolling beyond animationDistance wont have any
  // effect. The banner will remain tucked above the page.
  var animationDistance = 1000 ;

  // CUSTOMIZE THIS
  // Replace this with any bezier values to change the animation, along with
  // the animationDistance. Example values that result in a delayed tuck-in
  // banner: 0.86, 0.01, 0.72, -0.05
  // You can visualize/edit bezier-curves and get values here:
  // http://greweb.me/bezier-easing-editor/example/
  var easing = BezierEasing(0, 0, 1, 0.5);

  function scrollFunction(scrollDelta) {
    var fractionOfAnimationDistanceTraveled = Math.min(scrollDelta / animationDistance, 1);
    var bannerDisplacement = easing.get(fractionOfAnimationDistanceTraveled);
    var bannerHeight = $("#top_leaderboard_wrapper").outerHeight();
    if (1100 > $("leaderboard_top_ad").width()) {
        $("#header_and_leaderboard").css({
            width: '1100px',
            'background-color': $("body").css("background-color")
        });  
    }
    return -bannerDisplacement * bannerHeight;
  }

  function updateBannerPosition() {
    var scrollDelta = document.documentElement.scrollTop || document.body.scrollTop;
    bannerEl.css("top", scrollFunction(scrollDelta) + 'px');
  }

  window.addEventListener('scroll', function() {
    window.requestAnimationFrame(updateBannerPosition)
  });
  
});

