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

function gsaSearch(searchForm) {
    return elasticSearch(searchForm);
}
function elasticSearch(searchForm) {
    if(typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        }
    }
var querystring = searchForm.elements[0].value;
if (querystring == "") { return false; }

    var queryval = querystring.trim();
    var searchUrl = searchForm.action + queryval.replace(/%2F/g, "");

    var adid = "?adid=TMZ_Web_Nav_Search";
    if (searchForm.target == '_blank') {
        window.open(searchUrl+adid, '_blank', '');
    } else {
        window.location.href = searchUrl+adid;
    }
    return false;
}

$(document).ready(function() {
    var $search = $('nav .search');
    var $form = $search.find('form');
    var $input = $search.find('input');
    var $label = $search.find('label');
    var $body = $('body');
    var $mastheadWrap = $('#masthead-wrap');
    var isMousedown = false;
    var scrollTop = 0;
    var isTouchDevice = 'ontouchstart' in document.documentElement;

    $label.on('mousedown', function() {
        isMousedown = true;
        if($form.hasClass('active')) {
            $form.submit();
        }
    });

    $label.on('click', function(e) {
        $input.focus();
        isMousedown = false;
    });

    $input.on('focus', function() {
        $search.addClass('expanded');
        $form.addClass('active');
        if(isTouchDevice){
            $input.click();
        }
    });

    $input.on('blur', function() { 
        if(!isMousedown) {
            $search.removeClass('expanded');
            $form.removeClass('active');
            $body.removeClass('fixfixed');
            $mastheadWrap.css('top', '0px');
        } else {
            $input.focus();
        }
    });

    $label.on('touchstart', function() {
        if($mastheadWrap.hasClass('is-sticky')) {
            $body.addClass('fixfixed');
            $mastheadWrap.css('top', $(window).scrollTop() + 'px');
            $(window).on('scroll', function(){
                if($body.hasClass('fixfixed')) {
                    $mastheadWrap.css('top', $(window).scrollTop() + 'px');
                }
            });
        }
        $label.click();
    });

});


var SigninForm = function() {
  var self = this;
  self.isNewMember = false;
  self.rememberMe = false;
  self.memberEmail = '';
  self.init = function() {
    $("#mytmz").children(".toform").unbind('click').click(function () {
      $("#signinform").css("z-index", "2147483647");
      $("#signinform").slideDown("fast");
      $('#overlay').show();
    });
$("div.votebox").children(".toform").unbind('click').click(function () {
        $("#signinform").css("z-index", "2147483647");
$('html, body').animate({ scrollTop: 0 }, 'fast');
        $("#signinform").slideDown("fast");
        $('#overlay').show().css({backgroundColor: '#000', opacity: '0.7'});
      });
    $('#signin-member').click(function() { self.existingMember(); });
    $('#signup-member').click(function() { self.newMember(); });
    $('.signin-rememberme').click(function() { self.toggleRememberMe(); });
    $('#signin').submit(function(e) { return self.submitHandler($(this), e); });
  };

  self.submitUrl = function() {
       return (self.isNewMember) ?  '/signup/email/'+encodeURIComponent(self.memberEmail) : '/signin/';
   };

  $(document).ready(function() {
    self.init();
  });

  self.toggleRememberMe = function() {
      self.rememberMe = !self.rememberMe;
      $('.signin-rememberme').toggleClass('selected');
  };
  self.existingMember = function() {
    if ($('#signin-member').hasClass('selected')) {return false;} else
{
      self.isNewMember = false;
      $('#newmember-info').hide();
  $('#intro-snippet').slideUp();
      $('#signin-member').toggleClass('selected');
      $('#signup-member').toggleClass('selected');
      $('#signin-password').removeAttr('disabled');
if ($('#signin-password').attr('disabled') == undefined) { $('#password-field').fadeIn();$('#RememberMe').fadeIn();$('#forgotpwlink').fadeIn();}
  $('#signin-btn').attr('value', 'Sign In');
    }
  };
  self.newMember = function() {
if ($('#signup-member').hasClass('selected')) {return false;} else
{
      self.isNewMember = true;
      $('#signin-member').toggleClass('selected');
      $('#signup-member').toggleClass('selected');
      $('#signin-password').attr('disabled', 'disabled');
if ($('#signin-password').attr('disabled')) { $('#password-field').fadeOut();$('#RememberMe').fadeOut();$('#forgotpwlink').fadeOut();}
  $('#signin-btn').attr('value', 'Sign Up');
  $('#intro-snippet').slideDown( function(){$('#newmember-info').show();});
    }
  };

  self.submitHandler = function(form, event) {
  $('.onerror').fadeOut();
    $('#signin-error').empty();

    self.memberEmail = $('#signin-email').val();

    /*  validate email */
    if(!self.memberEmail.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      $('#signin-error').text("Sorry, this is not a valid email address.");
  $('.onerror').fadeIn();
      return false;
    }

    if(self.isNewMember) {
      window.location.href = self.submitUrl();
      return false;
    }

    $('input[name=rememberme]').val((self.rememberMe) ? 1 : 0);
    return true;
  }
}();



