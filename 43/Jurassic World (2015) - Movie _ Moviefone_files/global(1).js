		
					
			
						
			
		
																																																																																																																																																					
		
			

							
	    
	

		
				
												
					
				
																																																																									
				
					

																													
		
	
				
												
					
				
																																																																																																															
				
					

														
		
	
			 
				var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

function authCallback(attr) {
   console.info(attr);
}

var mfJsObj = {
   replaceImage : {
      init : function() {
         $("[name='replace-image'], .lazy").each(function() {
            var e = this;
            var imageSrc = typeof $(this).attr('data-src') !== "undefined" && typeof $(this).attr('data-src') !== false ? $(this).attr('data-src') : $(this).attr('data-original');
            if (typeof imageSrc !== 'undefined' && imageSrc !== false) {
               if (imageSrc.indexOf('pthumbnails') > 0) {
                  var idx = imageSrc.indexOf('_thumbnail');
                  if (idx > 0) {
                     imageSrc = imageSrc.substring(0,idx)+'.jpg';
                  }
               }
            }
            $(e).attr('src',imageSrc);
         });
      }
   }
};

// var mfNav = {
   // apiUrl : $("body").data("as-url"),
   // loadTrending : function() {
   //    if (!isMobile) {
   //       var s = document.createElement("script");
   //       s.src = "/assets/js/modules/mf2-gravity-trending.js";
   //       jQuery("body").append(s);
   //    }
   // }
// };

$(function() {
    mfJsObj.replaceImage.init();
    if ($.cookie("locationCookie") === undefined) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $.getJSON("http://www.mapquestapi.com/geocoding/v1/reverse?key=Amjtd|lu6tnu6b2h%2C25%3Do5-lw7su&json={location:{latLng:{lat:"+position.coords.latitude+",lng:"+position.coords.longitude+"}}}&callback=?",function(data) {
                    if (data.info.statuscode != 500 && data.results[0].locations[0].postalCode !== "") {
                       $.cookie("locationCookie",data.results[0].locations[0].postalCode);
                    }
                });
            });
        }
    }
});

/* Adding close details functionality to carousel keyart overlay, should be removed and added to the individual module later */
$(".close").unbind("click").click(function() {
    switch ($(this).attr("id")) {
        case "close-details"        : MF2.toggleDetails($(this)); break;
        case "close-menu"           : MF2.toggleMenu(); break;
        case "close-ovod-schedule"  : MF2.watchNow.closeSchedule(); break;
        case "close-ovod-settings"  : MF2.watchNow.closeSettings(); break;
        default                     : MF2.stopSearch(); break;
    }
    return false;
});
	
			 
				var apiUrl = "http://"+$("body").data("as-url"),
hamburgerOpen = false,
hasMoreResults = false,
searchOpen = false,
searchTerm = "",
siteUrl = $("body").data("site-url"),
displayTimer = null,
lastQuery = "",
overElement = false,
searchRequest = null,
searchTimeout = null,
watchLists = $(),
lastPos = 0,
animating = false;

function getDevice() {
    return window.innerWidth <= 1024 ? "mobile" : "desktop";
}

function fixLinks() {
    var device = getDevice();
    $("#"+device+"-search-results a").each(function() {
        $(this).unbind().mousedown(function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location = $(this).attr("href");
            return false;
        });
    });
}

function hideDropdown(dropdown) {
   if (displayTimer) {
      clearInterval(displayTimer);
   }
   dropdown.find("ul").hide();
   dropdown.css("height","auto");
   return false;
}

function initDesktop() {
   watchLists = $("#desktop-search-results").html();
   $("#desktop-placeholder-1").unbind().click(function() {
      $("#desktop-search-input").focus();
   });
   $("#desktop-search-input").unbind().focus(function() {
      $("#desktop-placeholder-1").hide();
      $("#desktop-search-results").show();
      $(this).css("opacity",1);
      if (typeof dataLayer == "undefined") {
         dataLayer = [];
      }
      dataLayer.push({'pageURL': window.location.pathname, 'event': 'Desktop Search Bar Click'});
   }).blur(function() {
      hasMoreResults = false;
      $("#desktop-placeholder-2").hide();
      $("#desktop-search-input").removeClass("resultsShowing");
      $("#desktop-search-results").hide();
      $(this).css("opacity",0);
      $("#desktop-placeholder-1").show();
   }).keyup(trySearch);
   $("#desktop-search-icon").unbind().click(function() {
       var box = $('#desktop-search-input');
       var input = $.trim(box.val());
       if (input.length > 0) {
           window.location.href = "/search/" + encodeURIComponent(input);
       } else {
           box.focus();
       }
   });
}

function initMobile() {
    watchLists = $("#mobile-search-results").html();
    $("#hamburger-link").unbind().bind(isMobile ? "touchstart" : "click",function() {
        if (hamburgerOpen) {
            $(this).removeClass("active");
            $('#header').removeClass('no-scroll');
            $("html, body").css({overflow:"auto",position:"relative",width:"auto"});
            $("#hamburger-menu").hide();
            hamburgerOpen = false;
        } else {
            if (searchOpen) {
                $("#search-link").trigger(isMobile ? "touchstart" : "click");
            }
            $(this).addClass("active");
            $('#header').addClass('no-scroll');
            $("html, body").css({overflow:"hidden",position:"fixed",width:window.innerWidth});
            $("#hamburger-menu").show();
            hamburgerOpen = true;
        }
        return false;
    });
    $("#search-link").unbind().bind(isMobile ? "touchstart" : "click",function() {
        if (searchOpen) {
            $(this).removeClass("active");
            $("html, body").css({overflow:"auto",position:"relative",width:"auto"});
            $("#mobile-search").hide();
            searchOpen = false;
        } else {
            if (hamburgerOpen) {
                $("#hamburger-link").trigger(isMobile ? "touchstart" : "click");
            }
            $(this).addClass("active");
            $("html, body").css({overflow:"hidden",position:"fixed",width:window.innerWidth});
            $("#mobile-search").show();
            searchOpen = true;
        }
        return false;
    });
    $("#hamburger-menu, #mobile-search-results").css("height",window.innerHeight-$(".mf-banner-container").outerHeight(true)-$(".tablet.phone.header").outerHeight(true));
    $("#mobile-search-input").unbind().focus(function() {
        $("#mobile-search-results").show();
        if (!dataLayer) {
            dataLayer = [];
        }
        dataLayer.push({'pageURL': window.location.pathname, 'event': 'Mobile Search Bar Click'});
    }).keyup(trySearch);
    window.addEventListener("orientationchange", function() {
      $("#hamburger-link").removeClass("active");
      $('#header').removeClass('no-scroll');
      $("html, body").css({overflow:"auto",position:"relative",width:"auto"});
      $("#hamburger-menu").hide();
      hamburgerOpen = false;
    }, false);
}



function showDropdown(e) {
   e.stopPropagation();
   hideDropdown($(".header .dropdown"));
   var ul = $(this).siblings("ul");
   var dropdown = ul.closest(".dropdown");
   dropdown.unbind("mouseleave").mouseleave(function() {
      hideDropdown(dropdown);
   });
   ul.unbind("mouseenter mouseleave").mouseenter(function() {
      overElement = true;
   }).mouseleave(function() {
      overElement = false;
      hideDropdown(dropdown);
   }).show();
   dropdown.css("height",ul.outerHeight(true));
   displayTimer = setInterval(function() {
      if (!overElement) {
         hideDropdown(dropdown);
      }
   },5000);
   return false;
}

function trySearch(e) {
    var device = getDevice();
    if ($(this).val().length === 0) {
        $("#"+device+"-search-results").html(watchLists);
    } else if (e.which == 27) {
        if (device == "desktop") {
            $("#desktop-search-input").blur();
        } else {
            $("#search-link").click();
        }
    } else if (e.which == 13) {
        e.preventDefault();
        e.stopPropagation();
        window.location = siteUrl+"/search/"+searchTerm;
        return false;
    } else if ($(this).val() != searchTerm) {
        if (searchRequest) {
            searchRequest.abort();
        }
        searchTerm = $(this).val();
        hasMoreResults = false;
        if (device == "desktop") {
            $("#desktop-placeholder-2").hide();
            $("#desktop-search-input").removeClass("resultsShowing");
            $("#desktop-search-results").html("").show();
        } else {
            $("#mobile-search-results").html("").show();
        }
        $("#"+device+"-search-results").html("<li class='search-overlay-loading'><div><span></span></div></li>");
        if (searchTerm.match(new RegExp("^\\d{5}$"))) {
            searchRequest = $.ajax({dataType:"json",url:siteUrl+"/ajax/theater-search/"+searchTerm}).done(function(json) {
                $("#"+device+"-search-results").html("");
                if (json.numTheaters > 0) {
                    var total = 0;
                    $.each(json.theaters,function(i,theater) {
                        var subLine = (theater.subline) ? '<a href="'+siteUrl+theater.mfUrl+'"><p class="as-subline gray-text">' + theater.subline + '</p></a>' : '';
                        var favIcon = (theater.isFavorite) ? ' <a href="'+siteUrl+theater.mfUrl+'"><img src="http://o.aolcdn.com/art/ch_movies/ico_pp_heart" alt="Favorite" class="as-heart"></a>' : '';
                        if (total < 7) {
                           $("#"+device+"-search-results").append('<li class="as-theater"><a href="'+siteUrl+theater.mfUrl+'">'+theater.name+'</a>' + favIcon + subLine + '</li>');
                           total++;
                        }
                    });
                    if (json.numTheaters > 7) {
                        $("#"+device+"-search-results").append("<li><a class='blue-text' href='"+siteUrl+json.showtimesURL+"'>See All Results</a></li>");
                    }
                } else {
                    $("#"+device+"-search-results").append("<li>No Results Found</li>");
                }
                fixLinks();
            });
        } else {
            searchRequest = $.ajax({dataType:"jsonp",url:apiUrl+"/v2/as?query="+searchTerm+"&limit=6"}).done(function(json) {
                $("#"+device+"-search-results").html("");
                if (typeof json.results !== "undefined" && json.results.length > 0) {
                    var total = 0;
                    $.each(json.results,function(i,result) {
                        //console.dir(result.additional);
                        var itemLink = siteUrl + '/ajax/tribune-redirect/' + result.tmsId + '?type=' + result.type + '&term=' + searchTerm;
                        var thumbImg = (result.additional.thumbnail) ? '<a href="' + itemLink + '"><img src="' + result.additional.thumbnail + '" class="as-thumb"></a>' : '';
                        var subLine = (result.additional.subline) ? '<a href="' + itemLink + '"><p class="as-subline gray-text indented">' + result.additional.subline + '</p></a>' : '';
                        if (total < 5) {
                           var resultStr = "";
                           if (result.type == "person") {
                                resultStr = result.name + " <span class='gray-text'>(people)</span>";
                           } else if (result.type == "program") {
                                resultStr = result.name + " <span class='gray-text'>(tv show" + (result.extra ? (", " + result.extra) : '') + ")</span>";
                           } else if (result.type == "movie") {
                                resultStr = result.name + " <span class='gray-text'>(movie" + (result.extra ? (", " + result.extra) : '') + ")</span>";
                           }
                           $("#"+device+"-search-results").append('<li>' + thumbImg + '<a href="' + itemLink + '">'+resultStr+'</a>' + subLine + '</li>');
                           total++;
                        }
                    });
                    if (json.results.length > 5) {
                        $("#"+device+"-search-results").append("<li><a class='blue-text' href='"+siteUrl+"/search/"+searchTerm+"'>See All Results</a></li>");
                        hasMoreResults = true;
                        if (device == "desktop") {
                           $("#desktop-placeholder-2").show();
                           $("#desktop-search-input").addClass("resultsShowing");
                        }
                    }
                } else {
                    $("#"+device+"-search-results").append("<a class='blue-text' href='"+siteUrl+"/search/"+searchTerm+"'><li>No quick hits found. Hit Enter for complete results.</li></a>");
                }
                fixLinks();
            });
        }
    }
}

function checkPosition() {
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;

    if ($("#leaderboard").length < 1 && window.innerWidth < 1050 && window.innerWidth > 1034 && $("#unb-bar").outerHeight() == 34){
        $('#header').addClass('no-leaderboard');
    }

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 5);

    function hasScrolled() {
        var hasLB;
        var leaderHeight;

        // CHECKS IF LB EXISTS AND SETS THE LEADER HEIGHT
        if ($('#leaderboard').css('display') == 'block' && $('#leaderboard').outerHeight() > 80){
            hasLB = true;
            leaderHeight = $('#leaderboard').outerHeight();

        }
        else{
            hasLB = false;
            leaderHeight = 0;
        }

        // CHECKS FOR AOL AND SETS THE AOL HEIGHT
        var aolHeight;
        if  (window.innerWidth < 1050 && window.innerWidth > 1034 && $("#unb-bar").outerHeight() == 34){
            var aolHeight = $("#unb-bar").outerHeight();
            // console.log('hasScrolled - one');
        }
        else{
            var aolHeight = 0;
            // console.log('hasScrolled - two');
        }

        // var lastScrollTop = 0;
        // var leaderHeight = $('#leaderboard').outerHeight();
        var navbarHeight = $('#header').outerHeight();
        var navLeaderHeight = leaderHeight + navbarHeight + aolHeight;
        var delta = 5;
        var st = $(window).scrollTop();

        // console.log(aolHeight);
        // console.log(navbarHeight);
        // console.log(leaderHeight);
        // console.log(navLeaderHeight);

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (hasLB == true){
            // console.log('st ' + st + ' last scroll top ' + lastScrollTop);
            // console.log('aolHeight ' + aolHeight);
            if (st > lastScrollTop){
              // console.log('scroll down');
                if (st > leaderHeight + aolHeight && st <= navLeaderHeight){
                    // Scroll Down
                    $('#header').addClass('nav-down').removeClass('leaderboard');
                    // console.log('scroll down - lb - small area');
                }
                else if (st >= navLeaderHeight){
                    // Scroll Down
                    $('#header').removeClass('nav-down').addClass('nav-up transition');
                    // console.log('scroll down - lb - regular scroll');
                }
            }
            else if (st < lastScrollTop) {
              // console.log('scroll up');
                // Scroll Up
                if (st < leaderHeight){
                    $('#header').removeClass('nav-up nav-down transition').addClass('leaderboard');
                    // console.log('scroll up - lb - small area - no aol share!');
                }
                else if (st >= navLeaderHeight) {
                    $('#header').removeClass('nav-up leaderboard').addClass('nav-down');
                    // console.log('scroll up - lb - regular scroll - no aol share');
                }
            }
            lastScrollTop = st;
        }
        else{
            // console.log('st ' + st + ' last scroll top ' + lastScrollTop);
            // console.log('aolHeight ' + aolHeight);
            if (st > lastScrollTop){
              // console.log('scroll down');
                if (st > leaderHeight + aolHeight && st <= navLeaderHeight){
                    // Scroll Down
                    $('#header').addClass('nav-down').removeClass('leaderboard no-leaderboard');
                    // console.log('scroll down - no lb - small area');
                }
                else if (st >= navLeaderHeight){
                    // Scroll Down
                    $('#header').removeClass('nav-down no-leaderboard leaderboard').addClass('nav-up transition');
                    // console.log('scroll down - no lb - regular scroll');
                }
            }
            else if (st < lastScrollTop) {
              // console.log('scroll up');
                // Scroll Up

                if (window.innerWidth < 1050 && window.innerWidth > 1034 && $("#unb-bar").outerHeight() == 34){
                    if (st < aolHeight){
                        $('#header').removeClass('nav-up nav-down transition').addClass('no-leaderboard');
                        // console.log('scroll up - no lb - small area - aol share');
                    }
                    else if (st >= navLeaderHeight) {
                        $('#header').removeClass('nav-up no-leaderboard').addClass('nav-down');
                        // console.log('scroll up - no lb - regular scroll - aol share');
                    }
                }
                else{
                    if (st < navLeaderHeight/6){
                        $('#header').removeClass('nav-up nav-down transition').addClass('leaderboard');
                        // console.log('scroll up - no lb - small area - no aol share!');
                    }
                    else if (st >= navLeaderHeight) {
                        $('#header').removeClass('nav-up leaderboard').addClass('nav-down');
                        // console.log('scroll up - no lb - regular scroll - no aol share');
                    }
                }
            }
            lastScrollTop = st;
        }
        lastScrollTop = st;
    }
}

$(function() {
    $(".header .dropdown-button").unbind().mouseenter(showDropdown);
    $(window).resize(function() {
       if (getDevice() == "mobile") {
          initMobile();
       } else {
          initDesktop();
       }
    }).resize();
    var lastHeight = $("#leaderboard").outerHeight();

    setInterval(function() {
      // console.log($('#leaderboard').outerHeight());
      // console.log(lastHeight);
      // The leaderboard initially loads in the wrong position - which is why this script is required
      if ($("#leaderboard").outerHeight() != lastHeight && window.innerWidth > 767){
          if  (window.innerWidth < 1050 && window.innerWidth > 1034 && $("#unb-bar").outerHeight() == 34){
              $('#header').css('top', $('#leaderboard').outerHeight() + $("#unb-bar").outerHeight()).addClass('leaderboard');
              // console.log('one');
          }
          else if ($('#leaderboard').css('display') == 'block' && $('#leaderboard').outerHeight() > 80){
              $('#header').css('top', $('#leaderboard').outerHeight()).addClass('leaderboard');
              // console.log('two');
          }
          else{
              $("#header").css("top","0");
              // console.log('three');
          }
      }
      else if ($("#leaderboard").outerHeight() == lastHeight && window.innerWidth > 767){
          $('#header').css('top', $('#leaderboard').outerHeight());
      }
      lastHeight = $("#leaderboard").outerHeight();
        // console.log($('#leaderboard').outerHeight());
        // console.log(lastHeight);
    },500);
    checkPosition();
    fixLinks();
});




	
			 
				var footer = {
   closeToast : function() {
      $("#toast").animate({right:-230},function() {
         $(this).remove();
      });
      return false;
   },
   newslettercloseToast : function() {
      $("#newsletter-details-overlay").animate({},function() {
         $(this).remove();
      });
      return false;
   },
   signup : function() {
      var email = $("#logos-and-social input").val() !== "" ? $("#logos-and-social input").val() : $("#just-newsletter input").val();
      $.ajax({crossDomain:true,data:{email:email,verify:false,site:"Moviefone",template:"welcome",list:"main valids_engaged"},dataType:"jsonp",url:"http://www.moviefone.com/b-c/sailthru/signup.php"}).done(function(response) {
         var title, body;
         if (response.indexOf("Already Exists") > -1) {
            title = "ALREADY SUBSCRIBED";
            body = "Hot dang! This email address is already subscribed to the Moviefone newsletter.";
         } else if (response.indexOf("Error") > -1) {
            title = "ERROR";
            body = "Oops, something went wrong. Please try subscribing again later.";
         } else {
            title = "SUCCESS";
            body = "Success! Thanks for subscribing to the Moviefone newsletter.";
         }
         $("body").append("<div id='toast'><span class='toast-title'>"+title+"</span><span class='toast-body'>"+body+"</span><a class='toast-close' href='#' onclick=\"footer.closeToast();return false;\"></a></div>");
         $("#toast").animate({right:0},function() {
            setTimeout(function() {
               if ($("#toast").length > 0) {
                  footer.closeToast();
               }
            },5000);
         });
      });
   },
   newsletter : function() {
      var email = $("#subscribe-email").val();
      $.ajax({crossDomain:true,data:{email:email,verify:false,site:"Moviefone",template:"welcome",list:"main valids_engaged"},dataType:"jsonp",url:"http://www.moviefone.com/b-c/sailthru/signup.php"}).done(function(response) {
         var title, body;
         if (response.indexOf("Already Exists") > -1) {
            body = "Hot dang! This email address is already subscribed to the Moviefone newsletter.";
         } else if (response.indexOf("Error") > -1) {
            body = "Oops, something went wrong. Please try subscribing again later.";
         } else {
            body = "Success! Thanks for subscribing to the Moviefone newsletter.";
         }
         $("body").append("<div id='newsletter-details-overlay' class='newsletter-overlay'><div class='centerNewsletter'><div class='innerDetails'><span class='toast-title'>"+body+"</span><button class='newsletter-overlay-button' onclick=\"footer.newslettercloseToast();return false;\">OK</button><a class='toast-close' href='#' onclick=\"footer.newslettercloseToast();return false;\"></a></div></div></div>");
         $("#newsletter-details-overlay").animate({},function() {
         });
      });
   }


};
$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) {
        $("#newsletter-details-overlay").animate({},function() {
         $(this).remove();
      });
      return false;
    }
});
	
			 
				var mfIntercept = {
   cookie: null, 
   idleTime: 4000,
   isEmailValid: false,
   errorMsg:"",
   email: "",
   init : function() {
    $("#email-submit-button").unbind("click").click(function() {
      mfIntercept.email = $("#email-input").val();
      mfIntercept.isEmailValid = mfIntercept.validateEmail(mfIntercept.email);
    });

    mfIntercept.cookie = $.cookie("mfIntercept");
    if(!mfIntercept.cookie){
        mfIntercept.checkIdle();
    }
   },
   showIntercept : function() {
        $("#mf-intercept").show();
        $("#intercept-close").unbind("click").click(function() {
          mfIntercept.cookie = $.cookie("mfIntercept");
          if(!mfIntercept.cookie){
            $.cookie("mfIntercept","true",{expires:7,path:'/',domain:'.moviefone.com'});
          }
            $("#mf-intercept").fadeOut().remove();
        });
        $("#mf-intercept .intercept-container").animate({ opacity: 1, marginTop: "12%"}, 500 );
   },
   validateEmail: function() {
    var emailCheck = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (emailCheck.test(mfIntercept.email)) {
        mfIntercept.subscribe();
    }else {
        mfIntercept.errorMsg = "Please enter a valid email address";
        mfIntercept.showError(mfIntercept.errorMsg);
    }
   },
   showError: function(errortext) {
    $("#intercept-msg").text(errortext);
   },
   subscribe: function() { 
     $.ajax({crossDomain:true,data:{email:mfIntercept.email,verify:false,site:"Moviefone",template:"welcome",list:"main valids_engaged"},dataType:"jsonp",url:"http://www.moviefone.com/b-c/sailthru/signup.php"}).done(function(response) {
         var title, body;
         if (response.indexOf("Already Exists") > -1) {
            mfIntercept.errorMsg = "This email address is already subscribed to the Moviefone newsletter";
            mfIntercept.showError(mfIntercept.errorMsg);
         } else if (response.indexOf("may not be emailed") > -1) {
            mfIntercept.errorMsg = "Please enter a valid email address";
            mfIntercept.showError(mfIntercept.errorMsg);
         } else if (response.indexOf("Error") > -1) {
            mfIntercept.errorMsg = "Oops, something went wrong. Please try subscribing again later";
            mfIntercept.showError(mfIntercept.errorMsg);
         } else {
          $("#intercept-email").html('<div id="intercept-msg" class="success">Success! Thanks for subscribing to the Moviefone newsletter</div>');
          $.cookie("mfIntercept","true",{expires:365,path:'/',domain:'.moviefone.com'});
         }
      });
   },
   checkIdle : function() {
        var idleTimer = null;
        var idleState = false;
        var idleWait = mfIntercept.idleTime;
        var idleStatus = "no";

        $('*').bind('mousemove keydown scroll', function () {
            if(idleStatus=="no") {
                clearTimeout(idleTimer);
                idleState = false;
                idleTimer = setTimeout(function () { mfIntercept.showIntercept(); idleState = true; idleStatus="yes"; }, idleWait);
            }
        });

        $("body").trigger("mousemove");
   }
};

$(function() {
   mfIntercept.init();
});	
	