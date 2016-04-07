// TMZLive Past Menu Expand
$("#showr").click(function () {
    $(this).slideToggle("normal");
    $("div.tmz-live-past-eps").slideToggle("normal");
});
$("#hidr").click(function () {
    $("#showr").slideToggle("normal");
    $("div.tmz-live-past-eps").slideToggle("normal");
});

// TMZ Sports Past Menu Expand
$("#sports-showr").click(function () {
    $(this).slideToggle("normal");
    $("div.tmz-sports-past-eps").slideToggle("normal");
});
$("#sports-hidr").click(function () {
    $("#sports-showr").slideToggle("normal");
    $("div.tmz-sports-past-eps").slideToggle("normal");
});

(function() {

  var articles = $('article.news'), socialised = { }, win = $(window), updateArticles, onUpdate, updateTimeout;
  updateArticles = function()
  {
    // viewport bounds
    var wT = win.scrollTop(),
      wL = win.scrollLeft(),
      wR = wL + win.width(),
      wB = wT + win.height();
    // check which articles are visible and socialise!
    for (var i = 0; i < articles.length; i++) {
      if (socialised[i]) {
        continue;
      }
      // article bounds
      var art = $(articles[i]),
        aT = art.offset().top,
        aL = art.offset().left,
        aR = aL + art.width(),
        aB = aT + art.height();
      // vertial point inside viewport
      if ((aT >= wT && aT <= wB) || (aB >= wT && aB <= wB)) {
        // horizontal point inside viewport
        if ((aL >= wL && aL <= wR) || (aR >= wL && aR <= wR)) {
          socialised[i] = true;
          // load tmz's custom facebook share button.
          var $fbButton = $(articles[i]).find('.fb-custom-share');
          var fbURL = $fbButton.data('href');

          var tmzCustomShareButton = new TmzFacebookCustomShareView({where: $fbButton, href: fbURL});
          tmzCustomShareButton.draw();
        }
      }
    }
  };

  onUpdate = function() {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    updateTimeout = setTimeout(updateArticles, 500);
  };

  $(document).ready(function() {
    win.on('resize', onUpdate).on('scroll', onUpdate);
    setTimeout(updateArticles, 100);
  });
})();

