		
					
			
						
			
		
																																																																																																																																																					
																																																																															
																																																																																																																																																																																																																																			

										
	    
	

		
				
												
					
				
																																																																									
																																	
					

																													
		
	
				
												
					
				
																																																																																																															
																																	
																																																																																																									

																																												
		
	
							var listPost = {
   showMore : function(id, query, thumbWidth, thumbHeight) {
        thumbWidth = (typeof thumbWidth !== "undefined") ? thumbWidth : 300;
        thumbHeight = (typeof thumbHeight !== "undefined") ? thumbHeight : 215;
        
        query = JSON.parse(decodeURIComponent(query));
        query.page = (parseInt(jQuery("#"+id).attr("data-page"))+1);
        //console.info(JSON.stringify(query));
        jQuery.ajax({data:{query: JSON.stringify(query)}, dataType: "json", url: "/ajax/posts"}).done(function(json) {
            jQuery.each(json.results,function(i,result) {
                //console.dir(result);
                var html = "\
                <div class='news-item'>\n\
                    <div class='image'>\n\
                        <a href='"+result.relative_path+"'>\n\
                            <div class='image-wrap'>\n\
                                <img class='lazy' src='http://o.aolcdn.com/dims-shared/dims/GLOB/5/"+thumbWidth+"/"+thumbHeight+"/90/"+encodeURIComponent(result.image)+"'>\n\
                                <div class='item-overlay'></div>\n\
                            </div>\n\
                        </a>\n\
                    </div>\n\
                    <div class='info'>\n\
                        <h4><a class='title' href='"+result.relative_path+"'>"+result.title+"</a></h4>";
                        if (result.contributor.byline){
                            html += "<div class='byline'>by <a href='" + $('body').attr('data-site-url') + "/contact-blogger/"+result.contributor.slug+"'>"+result.contributor.byline+"</a></div>";
                        }
                        html += "\
                        <p>"+result.contents.replace(/%Slideshow-[0-9]*\%/,"").replace(/<style [\s\S]*.*<\/style>/,"").replace(/<script [\s\S]*.*<\/script>/,"").replace(/(<([^>]+)>)/ig,"").substring(0,100)+"... <a href='"+result.relative_path+"'>Read more</a></p>\n\
                        <div class='clear'></div>\n\
                    </div>\n\
                </div>\n\
                <div class='border-clear'></div>";
                jQuery("#"+id+" .more-button").before(html);
            });
            if (json.page == json.total_pages) {
                jQuery("#"+id+" .more-button").fadeOut(function() {
                   jQuery(this).remove();
                });
            } else {
                jQuery("#"+id).attr("data-page",json.page);
            }
        });
    }
};



							var customSelect = {
   init : function() {
      $(".custom-select").each(function() {
         var original = $(this);
         if(!original.hasClass("rendered")){
            original.addClass("rendered");
            if (original.children(".selected").length === 0) {
               original.children("li:first").addClass("selected");
            }
            original.removeClass("custom-select");
            var callback = original.attr("data-callback") ? original.attr("data-callback") : null;
            var theme = original.attr("data-theme") ? original.attr("data-theme") : "light-gray";
            original.removeAttr("data-callback data-theme");
            original.wrap("<div class='"+theme+" custom-select rendered relative'"+(original.attr("id") ? " id='"+original.attr("id")+"'" : "")+"></div>"); // Wraps the original ul in a container div (for scope)
            original.removeAttr("id");
            var relative = original.parent();
            var height = original.children("li:first").outerHeight(true);
            var width = relative.outerWidth(true);
            relative.css("width",width);
            var arrow = $("<div class='arrow'></div>"); // Adds the down arrow graphic
            var selected = original.clone(); // Creates a clone of the original ul
            selected.removeAttr("id");
            selected.removeAttr("data-callback data-theme").removeClass("original").addClass("selected");
            selected.children("li:not('.selected')").remove(); // removes lis that aren't selected
            selected.find("a").contents().unwrap(); // removes any anchor elements
            relative.append(selected);
            relative.append(arrow);
            original.addClass("original");
            if (isMobile) { // Creates a select element based on the original ul (for mobile)
               var select = "<select>";
               original.children("li").each(function() {
                  var li = $(this);
                  var value = false;
                  /* This could be improved =============================================================================================================================================== */
                  if (li.children("a").length > 0) {
                     value = "data-redirect='true' value='"+li.children("a").attr("href")+"'";
                  } else if (li.attr("data-value") !== undefined) {
                     value = li.attr("data-value");
                  }
                  select += "<option "+(li.hasClass("selected") ? "selected " : " ")+(value ? value : "")+">"+(li.children("a").length > 0 ? li.children("a").text() : li.text())+"</option>";
                  /* ====================================================================================================================================================================== */
               });
               select += "</select>";
               select = $(select);
               select.css({height:selected.outerHeight(true),width:selected.outerWidth(true)});
               select.bind(navigator.userAgent.indexOf("Android") > -1 ? "change" : "blur",function() {
                  var value = "";
                  if (select.children("option:selected").attr("data-redirect") == "true") {
                     value = select.children("option:selected").val();
                     window.location.href = value;
                  } else {
                     var text = select.children("option:selected").text();
                     var li;
                     /* This bit of code is redundant ============================================================ */
                     original.children(".selected").removeClass("selected");
                     original.children("li").each(function() {
                        var temp = $(this).children("a").length > 0 ? $(this).children("a").text() : $(this).text();
                        if (temp == text) {
                           $(this).addClass("selected"); // Updated the selected li in the original ul
                           li = $(this);
                           return false;
                        }
                     });
                     selected.children("li").text(text); // Updates the text of the selected li in the selected ul
                     relative.attr("data-selected",text);
                     if (callback) {
                        if (li.attr("data-value")) {
                           value = li.attr("data-value");
                        } else {
                           value = text;
                        }
                        try { // Calls the callback function if one is supplied, if the ul features anchor tags they will be executed as expected
                           var context = window;
                           var namespaces = callback.split(".");
                           var func = namespaces.pop();
                           for (var i = 0; i < namespaces.length; i++) {
                              context = context[namespaces[i]];
                           }
                           context[func].apply(this,[value,li]);
                        } catch (err) {
                           console.error(err);
                        }
                     }
                     /* ========================================================================================== */
                  }
               });
               relative.append(select);
            } else {
               relative.click(function() {
                  var clone = original.clone(); // Creates a clone of the original ul and positions it over it
                  clone.removeAttr("id");
                  var absolute = clone.wrap("<div class='"+ theme +" custom-select absolute'></div>");
                  absolute = clone.parent();
                  absolute.css({paddingTop:height,width:width});
                  clone.removeClass("original").addClass("clone");
                  absolute.css("width",relative.outerWidth(true));
                  if ($("body").hasClass("theater-mode")){
                     var bodyTop = (parseInt($("body").css("top").replace("px", "")) * -1);
                     absolute.css({left:selected.offset().left, top:(selected.offset().top + bodyTop)});
                  } else {
                     absolute.css({left:selected.offset().left,top:selected.offset().top});
                  }
                  absolute.mouseleave(function() {
                     absolute.remove(); // Removes the clone when your mouse leaves it
                  });
                  clone.find("li").click(function() {
                     var li = $(this);
                     if (li.children("a").length === 0) {
                        var text = li.text();
                        /* This bit of code is redundant ============================================================ */
                        original.children(".selected").removeClass("selected");
                        original.children("li").each(function() {
                           var temp = $(this).children("a").length > 0 ? $(this).children("a").text() : $(this).text();
                           if (temp == text) {
                              $(this).addClass("selected"); // Updated the selected li in the original ul
                              return false;
                           }
                        });
                        selected.children("li").text(text); // Updates the text of the selected li in the selected ul
                        relative.attr("data-selected",text);
                        absolute.remove();
                        if (callback) {
                           var value = li.attr("data-value") ? li.attr("data-value") : text;
                           try { // Calls the callback function if one is supplied, if the ul features anchor tags they will be executed as expected
                              var context = window;
                              var namespaces = callback.split(".");
                              var func = namespaces.pop();
                              for (var i = 0; i < namespaces.length; i++) {
                                 context = context[namespaces[i]];
                              }
                              context[func].apply(this,[value,li]);
                           } catch (err) {
                              console.error(err);
                           }
                        }
                        /* ========================================================================================== */
                     } else {
                        window.location.href = li.children("a").attr("href");
                     }
                  });
                  arrow = arrow.clone();
                  absolute.append(clone);
                  absolute.append(arrow);
                  $("body").append(absolute);
               });
            }
            relative.css("visibility","visible");
         }
      });
   }
};

$(function() {
   customSelect.init();
});

							var movieOvd = {
    hasOvodInfo: 0,
    pData: null,
    scrolledPos: 0,
    tempData: {"zip":null,"timezone":null,"providers":{"local":null,"alt":[]}},
    init: function() {
        var cData = $.cookie("mfOvod");
        if (typeof cData !== "undefined" && cData != "undefined") {
            movieOvd.hasOvodInfo = 1;
            movieOvd.pData = $.extend(true,{},JSON.parse(cData));
            movieOvd.tempData = $.extend(true,{},JSON.parse(cData));
            $(".watchnow-provider-time .on-tv").css("display","inline");
            $(".watchnow-provider-time .edit-provider").css("display","inline");
        } else {
            $(".watchnow-provider-time .set-provider").css("display","inline");
        }
        /*  GET NEXT EPISODE  */
        var tmsID = $(".movie-title-ovod").attr("data-tmsid");
        if (tmsID !== 'undefined' && $(".ovod.episodes").length >= 1) {
            movieOvd.getNextEpisode(tmsID);
        }
        /*  GET MOVIE NEXT AIRTIME  */
        if ($(".movie-title-ovod").length >= 1 && movieOvd.pData !== null) {
            /*  tmsID IS RENDERED BY THE OVOD MODULE  */
            movieOvd.getMovieNextAir(tmsID);
        }
        /*  OPEN SETTINGS WINDOW  */
        $(".set-provider, .edit-provider").click(movieOvd.showSettings);
        /*  ZIPCODE SUBMIT  */
        $("#ovod-settings-content .location-go").unbind("click").click(movieOvd.getLocalProviders);
        /*  SAVE BUTTON  */
        $("#ovod-settings-save").unbind("click").click(movieOvd.saveData);
        /*  SHOW SCHEDULE  */
        $(".watchnow-provider-time .on-tv a").click(function(){
            $(".watchnow-provider-time .on-tv").addClass("loading");
            movieOvd.getSchedule({tmsId: $(this).attr("data-tms"), type: $(this).attr("data-type")});
        });

        /* GET OVOD PROVIDERS FOR MOVIES */
        $(".movie-title-ovod .watch-now").unbind("click").click(function(){
            var provWrap = $(this).closest(".ovod-item");
            if (provWrap.hasClass("open")){
                provWrap.removeClass("open");
            } else {
                provWrap.addClass("open");
            }
        });

        // SHOW SYNOPSIS
        $(".watchnow-provider-time .more-info").unbind("click").click(function(){
            var eId = $(this).closest(".ovod-item").attr("data-episodeid");
            movieOvd.getEpisodeProviders({eId: eId, ovod: false});
        });
    },
    getMovieNextAir : function(tmsId) {
        var getData = {
            providerId: movieOvd.pData.providers.local.id,
            count: 1,
            timezone: movieOvd.pData === null ? "" : movieOvd.pData.timezone
        };
        $.ajax({
            url: "/ovod/data/movie/"+ tmsId,
            type: "GET",
            dataType: "html",
            data: getData,
            cache: false,
            success: function(data){
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }
                if (data.listings.length <= 0) {
                    $(".movie-title-ovod .on-tv").hide();
                } else {
                    $(".movie-title-ovod .on-tv").addClass("loaded");
                    $(".movie-title-ovod .next-airing").html(data.listings[0].schedule.startDayFullStr);
                    $(".movie-title-ovod .provider-name").html(data.listings[0].schedule.prgSvc.name);
                }
            }
        });
    },
    showSettings: function() {
        movieOvd.scrolledPos = $(document).scrollTop() * -1;
        /*  CLOSE THE SETTINGS WINDOW  */
        $("#ovod-settings-cancel").unbind("click").click(movieOvd.closeSettings);
        $("#close-ovod-settings").unbind("click").click(movieOvd.closeSettings);
        /*  PRE-POPULATE FIELDS IF COOKIE WAS FOUND  */
        if (movieOvd.pData !== null) {
            $("#ovod-settings-content .details").removeClass("zip-only").removeClass("zip-provider-results").addClass("zip-provider");
            $("#ovod-settings-content #watch-it-zip").val(movieOvd.pData.zip);
            /*  GET PROVIDER LIST  */
            movieOvd.getLocalProviders({id: movieOvd.pData.providers.local.id, name: movieOvd.pData.providers.local.name});
            /*  PRE CHECK ALT PROVIDERS  */
            $("#ovod-settings-content .provider-check").each(function(){
                var provider = $(this);
                var provId = provider.val();
                $.each(movieOvd.pData.providers.alt, function(i,v){
                    if (provId == v.id){
                        provider.prop("checked", true);
                    }
                });
            });
        }
        if (!$("body").hasClass("mobile")) {
            $("body").addClass("theater-mode").css({'top': movieOvd.scrolledPos +'px'});
        }
        $("#ovod-settings-overlay").fadeIn(250);
        $("#ovod-settings-content .provider").unbind("click").click(function(){
            var p = $(this).closest("li");
            p.find(".provider-check").click();
            movieOvd.collectAltProviders();
        });
    },
    closeSettings: function() {
        $("#ovod-settings-overlay").fadeOut(250,function() {
            $("body").removeClass("theater-mode").css({'top': '0px'});
            $("body, html").scrollTop(movieOvd.scrolledPos * -1);
        });
        return false;

        // $(".close").click(function() {
        //      switch ($(this).attr("id")) {
        //          case "close-details"        : MF2.toggleDetails($(this)); break;
        //          case "close-menu"           : MF2.toggleMenu(); break;
        //          case "close-ovod-schedule"  : MF2.watchNow.closeSchedule(); break;
        //          case "close-ovod-settings"  : MF2.watchNow.closeSettings(); break;
        //          default                     : MF2.stopSearch(); break;
        //      }
        //      return false;
        // });

    },
    collectAltProviders: function() {
        var altProviders = [];
        $("#ovod-settings-content .provider-check").each(function(){
            if ($(this).prop("checked") === true) {
                altProviders.push({id: $(this).val()});
            }
        });
        movieOvd.tempData.providers.alt = altProviders;
    },
    getLocalProviders: function(currentVal){
        /*  optional params currentVal = {id: "PROVIDER ID", name: "PROVIDER NAME"}  */
        $vodMod = $("#ovod-settings-content");
        /*  RESET LOCAL PROVIDER DATA  */
        if (!currentVal) {
            movieOvd.tempData.providers.local = null;
        }
        $vodMod.find(".details").removeClass("zip-only").removeClass("zip-provider-results").addClass("zip-provider");
        var $wrapper = $vodMod.find(".form-section.form-provider");
        $wrapper.removeClass("loaded");
        movieOvd.tempData.zip = $vodMod.find("#watch-it-zip").val();
        //  MAKE CALL TO GET PROVIDERS AT THIS ZIPCODE
        $.ajax({url:"/ovod/lineups", data: {"postalCode": movieOvd.tempData.zip},
            success: function(json){
                var data = JSON.parse(json);
                if (data.lineups.length <= 0) {
                    //  THERE WERE NO RESULTS
                    var html = "<span class='provider-error'>Sorry, there are no providers for this zipcode.</span>";
                    $vodMod.find(".provider-wrap").html(html);
                    $wrapper.addClass("loaded");
                } else {
                    /*  ADD TIMEZONE TO OBJ  */
                    movieOvd.tempData.timezone = data.timezone;
                    var ulHtml = "<ul class='custom-select' data-callback='movieOvd.providerSelect' data-theme='white provider-select'>";
                    $.each(data.lineups, function(i,v){
                        if (currentVal){
                            if (v.id == currentVal.id) {
                                ulHtml += "<li class='selected' data-value='"+ v.name +"' data-id='"+ v.id +"'>"+ v.name +"</li>";
                            } else {
                                ulHtml += "<li data-value='"+ v.name +"' data-id='"+ v.id +"'>"+ v.name +"</li>";
                            }
                        } else {
                            ulHtml += "<li data-value='"+ v.name +"' data-id='"+ v.id +"'>"+ v.name +"</li>";
                        }
                    });
                    ulHtml += "<ul>";
                    $vodMod.find(".provider-wrap").html(ulHtml +"<div class='clear'></div>");
                    $wrapper.addClass("loaded");
                    /*  INIT DROPDOWN  */
                    customSelect.init();
                }
            }, error: function(data){}
        });
    },
    providerSelect : function(name,choice) {
        movieOvd.tempData.providers.local = {"id":choice.attr("data-id"), "name": name};
    },
    saveData : function() {
        var errorMessage = "We need a little more information. Please ";
        var incomplete = 0;
        if (movieOvd.tempData.zip === null) {
            errorMessage += "enter a zip code";
            incomplete++;
        }
        if (movieOvd.tempData.providers.local === null) {
            if (incomplete >= 1) {
                errorMessage += " and ";
            }
            errorMessage += "choose a provider";
            incomplete++;
        }
        if (incomplete <= 0) {
            /*  SET COOKIE  */
            movieOvd.pData = $.extend(true,{},movieOvd.tempData);
            $.cookie("mfOvod",JSON.stringify(movieOvd.pData),{expires:30,path:'/',domain:'.moviefone.com'});
            movieOvd.closeSettings();
            $(".watchnow-provider-time .on-tv").css("display","inline");
            $(".watchnow-provider-time .edit-provider").css("display","inline");
            $(".watchnow-provider-time .set-provider").hide();
            movieOvd.hasOvodInfo = 1;
            if ($("body").hasClass("tv")) {
                movieOvd.getNextEpisode(tmsID);
            } else {
                /*  tmsID IS RENDERED BY THE OVOD MODULE  */
                movieOvd.getMovieNextAir(tmsID);
            }
        } else {
            alert(errorMessage);
        }
        return false;
    },
    getSchedule : function(params) {
        /* params = {tmsId: ###, type: "movie OR tv"} */
        var getData = {
            providerId: movieOvd.pData.providers.local.id,
            timezone: movieOvd.pData === null ? "" : movieOvd.pData.timezone
        };
        $.ajax({
            url: "/ovod/overlay/"+ params.type +"/"+ params.tmsId,
            type: "GET",
            dataType: "html",
            data: getData,
            cache: false,
            success: function(data){
                movieOvd.scrolledPos = $(document).scrollTop() * -1;
                $("body").append(data);
                if (!$("body").hasClass("mobile")) {
                    $("body").addClass("theater-mode").css({'top': movieOvd.scrolledPos +'px'});
                }
                $("#ovod-schedule-overlay").fadeIn(250, function(){
                    $(".watchnow-provider-time .on-tv").removeClass("loading");
                });
                $("#ovod-schedule-overlay").unbind("click").click(movieOvd.closeSchedule);
            }
        });
    },
    closeSchedule : function(scrolled) {
        $("#ovod-schedule-overlay").fadeOut(250,function(){
            $("body").removeClass("theater-mode").css({'top': '0px'});
            $("body, html").scrollTop(movieOvd.scrolledPos * -1);
        });
        return false;
    },
    getEpisodeProviders : function(params) {
        /*  params = {eId: ###, ovod: true OR false}  */
        var epiWrap = $(".episode-"+ params.eId);
        var onAirNetwork = (params.network && params.network !== 'undefined') ? params.network : false;
        if (!epiWrap.hasClass("loading")) {
            if (epiWrap.hasClass("open")) {
                epiWrap.removeClass("open");
                epiWrap.find(".ovod-option-provider-wrap").remove();
            } else {
                if (params.ovod) {
                    epiWrap.addClass("loading");
                    $.ajax({
                        url: "/ovod/flyout/episode/"+ params.eId +"?network="+ onAirNetwork,
                        type: "GET",
                        dataType: "html",
                        success: function(data) {
                            if (movieOvd.hasOvodInfo == 1) {
                                epiWrap.find(".ovod-option-content").append(data);
                                if (movieOvd.pData.providers !== null) {
                                    /*  if the user data is set  */
                                    var providerObj = {set: "", reg: ""};
                                    epiWrap.find(".ovod-option-provider").wrap("<div class='temp-provider'>");
                                    epiWrap.find(".temp-provider").each(function(){
                                        var provId = $(this).find(".ovod-option-provider").attr("data-providerid");
                                        var provHtml = $(this).html();
                                        var isSet = false;
                                        $.each(movieOvd.pData.providers.alt, function(j,k){
                                            if (provId == k.id){
                                                isSet = true;
                                                return false;
                                            }
                                        });
                                        if (isSet) {
                                            providerObj.set += provHtml;
                                        } else {
                                            providerObj.reg += provHtml;
                                        }
                                    });
                                    epiWrap.find(".ovod-option-provider-wrap").html(providerObj.set + providerObj.reg);
                                }
                                epiWrap.removeClass("loading");
                                epiWrap.addClass("open");
                            } else {
                                epiWrap.removeClass("loading");
                                epiWrap.find(".ovod-option-provider-wrap").remove();
                                epiWrap.find(".ovod-option-content").append(data);
                                epiWrap.addClass("open");
                            }
                        },
                        error: function(data){
                            epiWrap.find(".ovod-option-content").append("<span class='error'>Sorry, there was in issue getting details for this episode.</span>");
                        }
                    });
                } else {
                    epiWrap.addClass("open");
                }
            }
        }
    },
    getNextEpisode : function(tmsID) {
        var getData = {
            "tmsId": tmsID,
            "providerId":  movieOvd.pData === null ? "" : movieOvd.pData.providers.local.id,
            "timezone":  movieOvd.pData === null ? "" : movieOvd.pData.timezone
        };
        $.ajax({
            url: "/ovod/listings",
            type: "GET",
            dataType: "json",
            data: getData,
            success: function(data) {
                var $next = $(".hero .next-starttime-wrap");
                if (typeof data.next.startTime !== 'undefined'){
                    $next.find(".starttime").html(data.next.startTimeStr);
                    if (typeof data.next.networkCallSign !== 'undefined'){
                        $next.find(".starttime-channel").html(data.next.networkCallSign);
                    } else {
                        $next.find(".starttime-channel").html(data.next.networkName);
                    }
                    if (movieOvd.hasOvodInfo == 1){
                        $next.find(".starttime-provider").html(movieOvd.pData.providers.local.name);
                    }
                    $next.animate({"height": "35px"}, 400, function(){
                        $next.css("height", "auto").fadeIn(250);
                    });
                }
            }
        });
    }
};

$(document).ready(function() {
    movieOvd.init();
});

							var pageURL = String(document.location);
var checkFullScreen = pageURL.indexOf("fullscreen");
var isFullScreen = false;

if (checkFullScreen>0) {
	isFullScreen = true;
}

// Find all of the slideshows on the page.
var knot = $('.knot-slideshow');
var knotShareFunction = function () {
	$("[name='aol-media-share']").aolShare({
		css: {
			"standard": [""].join("")
		},
		services: ["facebook","twitter","pinterest","email"],
		templates: {
			'twitter': {
				'twitterStatus': "url={{url}}&text=Check out: {{title}} &via=moviefone"
			}
		}
	});
};

var captionResize= function () {
	var captionHeight=$(".aol-knot-fullscreen-wrapper").height()-440;
	if(captionHeight<60){$(".gallery-module .aol-knot-fullscreen-caption").css("height","60px"); }else{$(".gallery-module .aol-knot-fullscreen-caption").css("height",captionHeight);}
};

$.each(knot, function(i, element) {
	var $slideshow = $(element);
	var id = $slideshow.attr('data-slideshow-id');
	$slideshow.knot({
		data: '#'+$slideshow.attr('id')+' .knot-slideshow-data',
		fullscreen: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? false : true,
		fullscreenThumbs: true,
		fullscreenThumbnailControls: true,
		fullscreenThumbnailStyle: 'carousel',
		fullscreenThumbnailPosition:'slider',
		thumbnailsOnly:true,
		thumbWidth: "262",
		thumbHeight: "200",
		fullscreenAdMN: "93319303", // From design tool for both TV and movie photos
		fullscreenAdHeight: "250",
		fullscreenAdWidth: "300",
		refreshCount: 4,
		restrictSize: true,
		galleryId: id,
		launchFullscreen: isFullScreen,
		onSlideChangeComplete: function () {
			knotShareFunction();
		},
		fullscreenRefreshDivId: ['knotFullscreenAd-' + id],
		contentMap: {
			rightRailHtml: function (context) {
				return [
				'<div class="aol-knot-fullscreen-exit"><i class="icon-remove"></i></div>',
				'<div class="aol-knot-fullscreen-right-title"></div>',
				'<span class="aol-knot-fullscreen-right-share movie-share"><a class="aol-share" name="aol-media-share" class="knot-right-share"></a></span>',
				'<div class="aol-knot-fullscreen-right-infobar">',
				'<div class="aol-knot-fullscreen-title"></div>',
				'<div class="aol-knot-fullscreen-caption"></div>',
				'</div>'
				].join('');
			},
			entryArray: {
				path: 'li'
			},
			photoSrc: {
				path: 'span[data-image]'
			},
			thumbnail: {
				path: 'span[data-image]'
			},
			caption: {
				path: 'p'
			},
			title: {
				path: 'h4[text]'
			},
			type: {
				path: '[data-type]'
			},
			mediaId: {
				path: '[data-mediaId]'
			},
			player: {
				path: '[data-player]'
			},
			tweetLink: {
				path: '[data-tweetLink]'
			},
			body: {
				path: 'a[text]'
			},
			quoteSource: {
				path: ''
			},
			text: {
				path: 'a[text]'
			}
				// entryArray: {
				// 	path: 'slides'
				// },
				// photoSrc: {
				// 	path: function(item){
				// 		return item.image_url_large || item.image_url_template.replace('{size}', 'l');
				// 	}
				// },
				// caption: {
				// 	path: 'text'
				// },
				// title: {
				// 	path: 'title'
				// },
				// type: {
				// 	path: 'type'
				// },
				// mediaId: {
				// 	path: '_id'	
				// },
				// player: {
				// 	path: 'data.video_embed_code'
				// },
				// tweetLink: {
				// 	path: 'data.tweet_link'
				// },
				// body: {
				// 	path: 'text'
				// },
				// quoteSource: {
				// 	path: 'credits'
				// },
				// text: {
				// 	path: 'text'
				// },
				// id: {
				// 	path: '_id'
				// }
		},
		onEnterFullscreen: function () {$('.aol-knot-fullscreen-right-thumbs').css("overflow","auto"); $('.aol-knot-fullscreen-bottom').show();  $('.aol-knot-fullscreen-exit').show();$('#header').css("position","fixed"); $('.aol-knot-fullscreen-wrapper').show();captionResize();},
		onExitFullscreen: function () {$('.aol-knot-fullscreen-bottom').hide(); $('.aol-knot-fullscreen-exit').hide(); $('#header').css("position","relative"); $('.aol-knot-fullscreen-wrapper').hide(); captionResize();},
		onSlideChange: function () { captionResize(); }
	});
});

$('.knot-slideshow').ready(function() {
	$(".aol-knot-enter-fullscreen").text("More Photos");
	var site = "%SITE-url%";
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$(".aol-knot-thumb").unbind().click(function() {
			$(".aol-knot-thumb.active").removeClass("active");
			$(this).addClass("active");
			if (window.location.href.indexOf("main") > -1) {
				window.location = window.location.href.substring(0,window.location.href.lastIndexOf("/main")).replace(/\/+$/,'')+"/photos";
			} else if (window.location.href.indexOf("photos") > -1) {
				var backgroundImage = $(this).css("backgroundImage");
				$(this).closest(".gallery").find(".gallery-poster").attr("src",backgroundImage.substring(backgroundImage.lastIndexOf('http://'),backgroundImage.lastIndexOf(')')).replace('"',''));
			}
		});
	}
});

$(window).resize(function() {
	captionResize();
});

							(function($) {
    var Tab = {
        activeData: null,

        showActive: function(tab_clicked) {
            this.activeData = tab_clicked.attr('data-tab');
            tab_clicked.parent().find('.tab-item').removeClass('active').removeClass('user-tab');
            tab_clicked.addClass('active');
        },

        showActiveContent: function() {
            var contentWrap = $('.tab-content-wrap');
            contentWrap.find('.tab-content').removeClass('active');
            contentWrap.find('#' + this.activeData).addClass('active');
        },

        bindClick: function() {
            $('.tab-wrap .tab-item').click(function(e) {
                e.preventDefault();
                Tab.showActive($(this));
                Tab.showActiveContent();
            })
        },

        init: function() {
            this.bindClick();
        }
    };

    $(document).ready(function() {
        Tab.init();
    });
})(jQuery);
							var aolShareCommon = {};

$(function() {
	var aolShareCommon = {
		e: $(".aol-share-common"),
		width: $(window).width(),
		type: "vertical",
		timeout : "",
		vPos: $(window).scrollTop(),
		shareURL: window.location.href,
        load: function() {
			var shareId = $(aolShareCommon.e).attr("id");
			var dataMedia = $(aolShareCommon.e).attr("data-media");
			if($("#"+shareId).hasClass("loaded")===false){
				$("#"+shareId+" .aol-share").aolShare({
				   services:["facebook","twitter","pinterest","googleplus","tumblr","email"],
					templates: {
					       'twitter': {
							'twitterStatus': "url={{url}}&text=Check out: {{title}} &via=moviefone"
						}
					},
						
					plugins: {
						'pinterest': {
							'href':"http://pinterest.com/pin/create/button/?url={{url}}&media="+dataMedia+"&description={{title}}"
						}
					}
				});
				$("#"+shareId).addClass("loaded");
			}
        },
        loadShareBlock: function(id) {
 			var shareId = id;
 			var dataMedia = $(id).attr("data-media");
 			if($("#"+shareId).hasClass("loaded")===false){
 				$("#"+shareId+" .aol-share").aolShare({
 				   services:["facebook","twitter","pinterest","googleplus","tumblr","email"],
 					templates: {
 					       'twitter': {
 							'twitterStatus': "url={{url}}&text=Check out: {{title}} &via=moviefone"
 						}
 					},
 						
 					plugins: {
 						'pinterest': {
 							'href':"http://pinterest.com/pin/create/button/?url={{url}}&media="+dataMedia+"&description={{title}}"
 						}
 					}
 			});
 				$("#"+shareId).addClass("loaded");
 			}
        },
        show: function() {
        	aolShareCommon.timeout = setTimeout(function(){
	        	if(aolShareCommon.type=="horizontal"){
	        		$(aolShareCommon.e).animate({opacity: 1,bottom: "+=50"}, 1000, function() { 
	        			if($(aolShareCommon.e).css("bottom").replace("px","")>0){
	        				$(aolShareCommon.e).css("bottom","0");
	        			}
	        		});
	        	}else if(aolShareCommon.type=="gallery-horizontal"){
	        		$(aolShareCommon.e).animate({opacity: 1,top: "+=45"}, 1000, function() { 
	        			if($(aolShareCommon.e).css("top").replace("px","")>0){
	        				$(aolShareCommon.e).css("top","-5px");
	        			}
	        		});
	        	}else if(aolShareCommon.type=="gallery-vertical"){
					$(aolShareCommon.e).animate({opacity: 1,left: "+=50"}, 1000, function() { 
						if($(aolShareCommon.e).css("left").replace("px","")>0){
		        				$(aolShareCommon.e).css("left","0");
		        			}
						});
	        	}else{
	        		if(aolShareCommon.type!="gallery-mobile"){
						$(aolShareCommon.e).animate({opacity: 1,left: "+=50"}, 1000, function() { 
							if($(aolShareCommon.e).css("left").replace("px","")>0){
		        				$(aolShareCommon.e).css("left","0");
		        			}
						});
					}
	        	} 
			}, 1500);
        },
        mobileShow: function() {

        	$(aolShareCommon.e).hide();

        	if(aolShareCommon.vPos<200){
				$(aolShareCommon.e).fadeIn();
        	}else{
        		$(aolShareCommon.e).css("top",$("#header").css("height"));
        		$(aolShareCommon.e).fadeIn();
        	}

        	$(window).scroll(function(){
        		aolShareCommon.vPos = $(window).scrollTop();
        		if($("#header").hasClass("leaderboard") || aolShareCommon.vPos<200){
					$(aolShareCommon.e).hide();
        		}else if($("#header").hasClass("nav-down")){
					$(aolShareCommon.e).css("top",$("#header").css("height"));
					$(aolShareCommon.e).show();
				}else{
					$(aolShareCommon.e).css("top",0);
					$(aolShareCommon.e).show();
				}
        	});
        },
        resize: function() {

        	aolShareCommon.shareURL = window.location.href;
			
			$(aolShareCommon.e).removeClass("gallery-horizontal").removeClass("gallery-vertical").removeClass("horizontal").removeClass("vertical").removeClass("gallery-mobile");

        	if($("#mf-slideshow.fullscreen").length>0){
        		if($(aolShareCommon.e).hasClass("mobile")){
        			$(aolShareCommon.e).css("top","").css("display","");
        			$(aolShareCommon.e).addClass("gallery-mobile");
        			aolShareCommon.type = "gallery-mobile";
	        	}else if(aolShareCommon.width>1024 || aolShareCommon.width<768) {
	        		$(aolShareCommon.e).addClass("gallery-horizontal").css("left","0").css("bottom","auto").css("top","-50px"); 
	        		aolShareCommon.type = "gallery-horizontal";
	        	}else{
	        		$(aolShareCommon.e).addClass("gallery-vertical").css("left","-50px").css("bottom","auto").css("top","0");
	        		aolShareCommon.type = "gallery-vertical";
	        	}
        	}else{
				if($(aolShareCommon.e).hasClass("mobile")){
        			aolShareCommon.type = "mobile";
	        	}else if(aolShareCommon.width<1065) {
	        		$(aolShareCommon.e).addClass("horizontal").css("bottom","-50px").css("left","0").css("top","auto");
	        		aolShareCommon.type = "horizontal";
	        	}else{
	        		$(aolShareCommon.e).addClass("vertical").css("left","-50px").css("bottom","0").css("top","auto");
	        		aolShareCommon.type = "vertical";
	        	}
        	}
        },
        init: function() {
        	$(window).bind('resize', function(e) {
			    window.resizeEvt;
			    $(window).resize(function(){
			        clearTimeout(window.resizeEvt);
			        window.resizeEvt = setTimeout(function(){
			            clearTimeout(aolShareCommon.timeout);
					    aolShareCommon.width = $(window).width();
					    aolShareCommon.resize();
					    if(aolShareCommon.type != "mobile"){
					    	aolShareCommon.show();
					    }else{
					    	aolShareCommon.mobileShow();
					    }
			        }, 250);
			    });
			});

        	this.resize();
            this.load();
			if(aolShareCommon.type != "mobile"){
				this.show();
			}else{
				this.mobileShow();
			}
			
			if($(".aol-share-block").length>0){
				$(".aol-share-block").each(function() {
					aolShareCommon.loadShareBlock($(this).attr("id"));
				});
			}
        }
    };

    aolShareCommon.init();

});
	