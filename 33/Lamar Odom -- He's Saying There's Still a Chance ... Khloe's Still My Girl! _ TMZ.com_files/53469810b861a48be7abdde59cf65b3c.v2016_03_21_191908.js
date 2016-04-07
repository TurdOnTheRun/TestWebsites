// See More Tags
$(".seemore-show").click(function () {
    $(this).parent().find('.seemore-show').fadeOut("normal");
    $(this).parent().find('.seemore-more').fadeIn("normal").css("display","inline");
});
$(".seemore-hide").click(function () {
    $(this).parent('.seemore-more').fadeOut("normal");
    $(this).parent().parent().find('.seemore-show').fadeIn("normal").css("display","inline-block");
});


var is_aol = navigator.userAgent.toLowerCase().indexOf("aol") != -1;
var is_mac = navigator.userAgent.indexOf('Mac') != -1;
var is_ipad = navigator.userAgent.match(/iPad/i) != null;

function tmzLightbox(url, options) {
    var lightbox = new TmzLightbox(url, options || {});
    lightbox.show();
    return lightbox;
}

function tmzPhotosLightbox(slug, options) {
  var url = "/lightbox/photos/" + slug;
  return tmzLightbox(url, $.extend({
    fixedHeight: 620,
    where: $('<div class="photos-lightbox"></div>').appendTo('body'),
  }, options || {}));
}

function tmzVideosLightbox(slug, options) {
  slug = slug.replace(/^(.)-/, "$1_"); //CRZ: handle slugs from CF that have dashes instead of kaltura underscores
  if(is_ipad) {
    document.location = "/videos/" + slug;
    return;
  }
  return tmzLightbox("/lightbox/videos/" + slug, $.extend({initialHeight: 550}, options || {}));
}

function tmzWIRLightbox(slug, index) {
    return tmzLightbox("/lightbox/week-in-review" + (slug ? "/" + slug : "") + (index ? "#index=" + index : ""), {fixedHeight: 487});
}

//CRZ: ### depends highly on format of urls defined in CF, need a js-routes lib
$('a.lightbox-link').live('click', function(e) {
  var f;
  var link = $.url($(this).attr('href'));

  switch(link.segment(1)) {
    case 'photos':
      f = tmzPhotosLightbox;
      break;
    case 'videos':
      f = tmzVideosLightbox;
      break;
    case 'week-in-review':
      f = tmzWIRLightbox;
      break;
  }

  if(f) {
    e.preventDefault();
    f.call(window, link.segment().slice(1).join('/') + (link.attr('query') ? ('?' + link.attr('query')) : "") + (link.attr('fragment') ? ("#" + link.attr('fragment')) : ""));
    return false;
  } else {
    return true;
  }
});

