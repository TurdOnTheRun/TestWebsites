/**
    @namespace eol.page
    @extends eol
    @name page    
    @description Common features/behaviors to assist in page building.
*/

if (typeof(eol) === 'undefined') { var eol = {}; }
eol.create("page", function($) {
    
    if ( eol.uattr("adEdition")) {
        eol.cookie("adEdition", eol.uattr("adEdition"));
    }

    // Get page edition parameter value from the DOM
    var pageEdition = $('.js-onee-meta-tag').attr('data-edition');
        pageEdition = (typeof pageEdition === 'undefined') ? 'us' : pageEdition.toLowerCase();
	
    var _s = {
        "context" : {
            "user" : { 
                "loggedIn" : false,
                "name" : "",
                "id" : ""
            },
            "locale" : { 
                "edition" : pageEdition,
                "advertisements" : eol.uattr("adEdition") || eol.cookie("adEdition") || "us" 
            },
            "server" : {
                "dateTime" : 0
            },
            "legacy" : true, //deprecated
            "fixedLayout" : true, //page is fixed to 3 columns
            "isSkinned" : false, //true when skin comes in.
            "isSkinBleed" : false
        },
        "dart" :  { 
            "site" : "home",
            "zone" : "home", 
            "networkId" : "",
            "zone2" : "", 
            "keywords" : "", 
            "wid" : "",
            "sz" : "",
            "pos" : 1, 
            "tile" : 1,
            "ord" : "", 
            "notCategory" : "default",
            "type" : "adj",
            "remoteScript" : "/uberblog/includes/adxsite.html"
        },
        "extended" : null
    };
    
   
    /**
        @description Determine if the user is logged in; if so get public information about the user
    */
    function getUser() {
        var userAttributes = eol.cookie("eolMember").match(/^(\d+)~(\w+)(?=~)/) || []; 
        
        if ( userAttributes.length === 3 ) {
            _s.context.user.id = parseInt(userAttributes[1],10);
            _s.context.user.name = userAttributes[2];
            _s.context.user.loggedIn = true;
        }
    }
    

    function gmt( locale ) {
        if(typeof locale !== "undefined" && typeof locale.getTime === "function" && typeof locale.getTimezoneOffset === "function"){
            return new Date(locale.getTime() + ( locale.getTimezoneOffset() * 60000 ));
        }
    }

    function time( systemTime ) {
        _s.context.server.dateTime = _s.context.server.dateTime || systemTime;
        return gmt(_s.context.server.dateTime);
    }
    
    //deprecated
    function legacyContext( isLegacy ) {
    	_s.context.legacy = isLegacy;
    }
    
    //deprecated
    function getLegacy() {
    	return _s.context.legacy;
    }
    
    function fixedLayoutContext( isFixed ) {
    	_s.context.fixedLayout = isFixed;
    }
    
    function getFixedLayout() {
    	return _s.context.fixedLayout;
    }
    
    function skinned(blnSkin) {
    	 _s.context.isSkinned = blnSkin;
    	 if (blnSkin && (typeof eonline_Globalnav !== 'undefined')) {
    		 eonline_Globalnav.extenders(false); //can come much later...
    	 }
    }

    function forceSkinAdToBleed(isForced){
        _s.context.isSkinBleed = isForced;
    }

    function isSkinBleed(){
        return _s.context.isSkinBleed;
    }    
    
    function isSkinned() {
   	 	return  _s.context.isSkinned;
    }

    /***********************************************
    Advertisements     
    ***********************************************/
    /**
        @description 
        @methodOf page
        @param tile 
        // Used in video
    */
    function dartUrl( tile ) {
        var advertisement = [];
        var retVal;
        var dart = $.extend({}, _s.dart, tile );
        if(eol.uattr("akw").length > 0) {
            dart.keywords = eol.uattr("akw") + "," + dart.keywords;
        }
		      
        dart.zone = (dart.zone2.length > 0 ) ? dart.zone + "/" + dart.zone2 : dart.zone;
        dart.domain = dart.domain || "eonline";

        var adEdition = _s.context.locale.advertisements;
        var edition = _s.context.locale.edition;
        
        if(adEdition == "us") {
        	dart.networkId = "N2620";
        } else {
        	dart.networkId = "N4295";
        }
       
        if( !(dart.type || "").match(/^pfadx$/) || (adEdition === "us") ) { 
        	if(adEdition == "la"){
        		adEdition = "ooc";
        	}
	        //not used for pfadx ad calls unless the adEdition is us, ca, OR nz
        	advertisement.push("http://ad.doubleclick.net" + "/" + (dart.networkId.length > 0 ? dart.networkId + "/" : "") + dart.type + "/" + dart.site + "." + adEdition + "." + dart.domain + "/" + dart.zone );
	        if ( parseInt(dart.tile,10) === 1 ) {
	            advertisement.push("dcopt=ist");
	        }         
	        advertisement.push("tile="+ dart.tile);        
	        advertisement.push("pos=" + dart.pos || ( dart.tile + "_" + dart.sz.split(",")[0] ));
	        advertisement.push("sz=" + dart.sz );
	        
	        advertisement.push("akw=" + dart.keywords.replace(" ","").split(",").join(";akw="));
	        advertisement.push("wid=" + dart.wid);
	        advertisement.push("!category=" + dart.notCategory.split(",").join(";!category=") );
	        if ( window.__nbcudigitaladops_dtparams ) {
	            advertisement.push( window.__nbcudigitaladops_dtparams );
	        }

	        advertisement.push("ord=" + dart.ord);
	        retVal = advertisement.join(";").replace(/\;\;/,";") + "?";
        } else if (adEdition === "ca") {
        	advertisement.push("http://pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/5479/ctv.eonline.ca/test&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]");
        	retVal = advertisement.join(";").replace(/\;\;/,";");
        } else if (adEdition === "au") {
        	var publisherId = "7293";

        	advertisement.push("http://cdn-static.liverail.com/swf/v4/plugins/pdk/LiveRailPlugin446.swf|LR_PUBLISHER_ID=" + publisherId + "|LR_SCHEMA=vast2|LR_VERTICALS="+dart.domain);
        	retVal = advertisement.join(";").replace(/\;\;/,";");
        } else if (adEdition === "za") {
        	advertisement.push("http://adserver.adtech.de/?advideo/3.0/567.1/4334495/0//cc=2;vidAS=pre_roll;vidRT=VAST;vidRTV=2.0");
        	retVal = advertisement.join(";").replace(/\;\;/,";");
        } else if (adEdition === "it") {
        	advertisement.push("http://video.bal.ad.dotandad.com/mediamond.jsp?mpo=vast_eonline&mpt=nbc_eo_vid_art&rnd=%n");
        	retVal = advertisement.join(";").replace(/\;\;/,";");
        } else if (adEdition === "nz") {
        	advertisement.push("http://pubads.g.doubleclick.net/gampad/ads?sz=480x360&iu=/3595/NZ_Entertainment_EOnline&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]");
        	retVal = advertisement.join(";").replace(/\;\;/,";");
        } else if (adEdition === "uk") {
        	advertisement.push("http://a.collective-media.net/pfadx/wtv.eent/video;sz=1x1;contx=Entertainment;cmu=http://www.eent.co.uk/;cmn=cnu;ord=" + dart.ord);
        	retVal = advertisement.join(";").replace(/\;\;/,";");
        } else if (adEdition === "fr") {
        	advertisement.push("http://fr-himedia.videoplaza.tv/proxy/distributor/v2?s=de709e55-3f7f-4bf0-a3c6-1fdcac2a4b90&tt=p&rt=vast_2.0&rnd="+dart.ord+"&pf=fl_11");
        	retVal = advertisement.join(";").replace(/\;\;/,";");
        }
        else {
        	if(adEdition === "ooc" && edition === "uk") {
        		advertisement.push("http://ima3vpaid.appspot.com/?adTagUrl=http%3A%2F%2Fgoogleads.g.doubleclick.net%2Fpagead%2Fads%3Fclient%3Dca-video-pub-9162676083297313%26slotname%3D8677868090%26description_url%3Dhttp%3A%2F%2Feonline.com");
        	} else {
            	advertisement.push("http://a.collective-media.net/pfadx/wtv.eent/video");
            	advertisement.push("sz=1x1");
            	advertisement.push("ord=" + dart.ord);
            	advertisement.push("dcmt=text/xml");
            }
            retVal = advertisement.join(";").replace(/\;\;/,";");
        }
        return retVal;
    }
    
    /**
        @methodOf page
        @param name
        @param definition
        @param context
    */
    function create(page, definition ) {
        _s.extended = definition;
    }
        
    function load( args ) {       
        $(document).ready( function() { 
            if ( _s.extended ) {
                _s.extended = new _s.extended( $, _s.context);
                _s.extended.load( args );
            }
        }); 
    }
    
    /**
        @name dartRenderNow
        @methodOf page
    */
    function dartRender( advertisement ) {
        var output = [];
        
        var dimensions = advertisement.dimensions.match(/(\d+x\d+)/g) || [];
                
        $.each(advertisement, function(key,value){
            if ( $.type(value) === "string" ) {
                advertisement[key] = ( value.indexOf("+=") === 0 ) ? (_s.dart[key] || "") + value.substr(2) : value;
            }
        });        
        //var url = dartUrl( $.extend({},advertisement,{ "pos" : advertisement.tile + "_" + dimensions[0], "sz" : dimensions.join(",")}) );
        advertisement.pos = advertisement.pos || advertisement.tile + "_" + dimensions[0];
        var url = dartUrl( $.extend({},advertisement,{
            "sz" : dimensions.join(",")
            }) );
        
        var maxWidth = 0;
        var maxHeight = 0;
        $.each(dimensions,function(n,value){
            maxWidth = Math.max(maxWidth, parseInt(value.replace(/x^\d+$/,""),10)) || 0;
            maxHeight = Math.max(maxHeight, parseInt(value.replace(/^\d+x/,""),10)) || 0;
        });
        
        if ( (advertisement.type || "").match(/^(pfadx|ad|adi|adj)$/) ) {
            output = url;        
        } else if ( ! $("body").is(".ad-refresh") ) {
            output.push('<div class="advertisement ad-ignore ad-' + dimensions.join("-") + ' reset" rel="' + advertisement.tile + '" ><!-- -->');
            output.push('<script src="' + url +'" type="text/javascript"><\/script>');
            output.push('</div>');
            output.reverse();
        } else { 
            output.push('<div class="advertisement ad-' + dimensions.join("-") + ' reset" rel="' + advertisement.tile + '" ></div>');
        }
        return output;
    }

    
    /**
        @methodOf page
    */
    function origin( properties ) {
        if ( properties === eol.undefined ) {
            return _s.context.origin;
        } else {
            $.extend(_s.context.server, properties );
        }
    }

    function modal( overlay ){
        var defaults = {
            show : true, 
            html : ""
        };

        $.extend(defaults, ( typeof(overlay) == "object" ) ? overlay : {
            html: overlay
        });

        $(document).ready(function() {
            $("div.eol-modalwrap, div.eol-modaldropshadow").remove();
            if ( defaults.show ) {
                $("body").append("<div class='eol-modaldropshadow'>&nbsp;</div><div class='eol-modalwrap' >" + defaults.html + "</div>");
                        
                $("div.eol-modaldropshadow").css({
                    height: $(document).height() + "px"
                }).one("click",function(e){
                    modal({
                        show:false
                    });
                });
            }
        });
    }

    
    (function init(){
        getUser();
    })();
    
    return {
        "load" : load,
        "origin" : origin,
        "create" : create,
        "dartUrl" : dartUrl,
        "legacyContext" : legacyContext,
        "getLegacy" : getLegacy,
        "fixedLayoutContext" : fixedLayoutContext,
        "getFixedLayout" : getFixedLayout,
        "modal" : modal,
        "dartRender" : dartRender,
        "context" : _s.context,
        "time" : time,
        "gmt" : gmt,
        "isSkinned" : isSkinned,
        "skinned" : skinned,
        "forceSkinAdToBleed" : forceSkinAdToBleed,
        "isSkinBleed" : isSkinBleed,
        "adEdition" : _s.context.locale.advertisements
        
    };

});


(function($){
    /**
        This will be called by a rich media template
        @args json object
    */
    window.dartUpdate = function( args ) {	

        args = args || {};
        args.config = args.config || {
            "headerSpot" : "", 
            "click" : "", 
            "skinScroll" : ""
        };
        // Set default value in the event skinBleed is not defined aka through ad trafficked (mps)
        if (typeof args.config.skinBleed === "undefined") { 
            args.config.skinBleed = eol.page.isSkinBleed();
        }
        else {
            eol.page.forceSkinAdToBleed(args.config.skinBleed);
        }

        if ( args.config.headerSpot.toLowerCase() === "no" ) {
            $("div#headerSpot,div#header_promo").remove();
        }

        // ------- "Publish" an mps callback ------
        if(typeof eolMpsAd !== "undefined"){
            eolMpsAd.getSlotCallbacks('skins', args);
        }

        if(eol.page.getFixedLayout()) {
	        $("html,body").css($.extend({},(args.css || args ),{
	            "background-repeat":"no-repeat",
	            "background-attachment" : ( args.config.skinScroll === "scroll" ? "scroll" : "fixed" ), 
	            "background-position" : "center top"
	        }));
	        
	        if ( $.trim(args.config.click || "").length > 0 ) {
	            var target = ( ( args.config.clickWindow || "").indexOf("same_window") >= 0 ) ? "_self" : "_blank";
	            if ( $.browser.msie && $.browser.version.indexOf("6") >= 0 ) {
	                $("body").prepend('<a style="position: absolute; left:0;  width: 100%; height: 100%;" target="' + target + '" href="' + args.config.click + '"><img style=" border: none; " width="100%" height="100%" src="http://www.eonline.com/static/uberblog/images/space.gif"></a>');
	                eol.page.skinned(true);
	            } else {
	                $("body").prepend('<a style="position: fixed; left:0;  width: 100%; height: 100%;" target="' + target + '" href="' + args.config.click + '"><img style=" border: none; " width="100%" height="100%" src="http://www.eonline.com/static/uberblog/images/space.gif"></a>');
	                eol.page.skinned(true);
	            }
	        }
        } else {
        	$("body").css('background-image', 'none'); 

            if(args.config.skinBleed){
                $('body').append('<div id="Skin_Left" class="split_skin ' + args.config.skinScroll + '"></div><div id="Skin_Right" class="split_skin ' + args.config.skinScroll + '"></div>');
            }
            else { 
                $('#HHeader').append('<div id="Skin_Left" class="split_skin ' + args.config.skinScroll + '"></div><div style="position: absolute; right: 0px; width: 0px; height: 0px; top: 0px; overflow: visible"><div id="Skin_Right" class="split_skin ' + args.config.skinScroll + '"></div></div>');
            }
        	
            eol.page.skinned(true);

            var $skinLeft = $('#Skin_Left'),
                $skinRight = $('#Skin_Right');

            var setSkinBleed = function(skinScroll){
                var pgWidth = $('#page').width();
                var pgLeft = $('#page').offset().left;
                var windowWidth = $(window).width();

                // skins are always 260
                if(windowWidth > (520 + pgWidth)){
                    $skinLeft.css({'position':skinScroll, 'left' : 0, 'background-color' : args.css["background-color"], 'height' : '100%'});
                    $skinRight.css({'position':skinScroll, 'right' : 0, 'left' : 'inherit', 'background-color' : args.css["background-color"], 'height' : '100%'});
                }
                else { 
                    // I can be fixed
                    $skinLeft.css({'position':skinScroll, 'left' : pgLeft - 260, 'background-color' : args.css["background-color"], 'height' : '100%'});
                    $skinRight.css({'position':skinScroll, 'left' : pgLeft+pgWidth, 'right' : 'inherit', 'background-color' : args.css["background-color"], 'height' : '100%'});
                }
            };


            $('body').css('overflow-x','hidden');

        	if(args.config.skinScroll === "fixed"){
                if(args.config.skinBleed){
                    setSkinBleed('fixed'); // Initial
                    $(window).on('resize.eskin', function(){
                        setSkinBleed('fixed');
                    });

                }
                else { 
                    $skinLeft.css({'position':'fixed', 'margin-left':'-260px'});
                    $skinRight.css({'position':'fixed'});
                }
            }else{
                if(args.config.skinBleed){
                    setSkinBleed('absolute'); // Initial
                    $(window).on('resize.eskin', function(){
                        setSkinBleed('absolute');
                    });
                }
                else {
                    $skinLeft.css({'position':'absolute','left':'-260px'});
                    $skinRight.css({'position':'absolute','right':'-260px'});
                }
        	}

            if(args.config.skinBleed === false){
                $("html,body,#HHeader").css($.extend({}, {
                    "background-color":args.css["background-color"]
                }));
            }

	        $skinLeft.css($.extend({},(args.css || args), {
	        	"background-repeat":"no-repeat",
	            "background-position" : "left top"
	        }));
	        $skinRight.css($.extend({},(args.css || args), {
	        	"background-repeat":"no-repeat",
	            "background-position" : "right top"
	        }));
	        if ( $.trim(args.config.click || "").length > 0 ) {
	        	var target = ( ( args.config.clickWindow || "").indexOf("same_window") >= 0 ) ? "_self" : "_blank";
	        	$skinLeft.prepend('<a style="position: absolute; left:0; top:0; width: 100%; height: 100%;" target="' + target + '" href="' + args.config.click + '"><img style=" border: none; " width="100%" height="100%" src="http://www.eonline.com/static/uberblog/images/space.gif"></a>');
	        	$skinRight.prepend('<a style="position: absolute; left:0; top:0; width: 100%; height: 100%;" target="' + target + '" href="' + args.config.click + '"><img style=" border: none; " width="100%" height="100%" src="http://www.eonline.com/static/uberblog/images/space.gif"></a>');
	        }
	        if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|Blackberry)/i)) {
	        	$(".split_skin").show();
	        }

	        // ONLY EXECUTE IF ON A LIQUID PINNING PAGE
            if(typeof lp_global !== "undefined"){
                if (typeof window.hyperGalleryHandler == 'undefined') {
                    lp_global.viewport_margins=140;
                    lp_global.AdjustLayout(true); 
                } else {
                    //we are skinning the hyper gallery page
                    window.hyperGalleryHandler.revealSkins();
                }
            }

        }
        
        
    };
    
    
    
    window.tasks = function() {            
        $("body.edition_us").each(function(){                    
                /* Tipline in footer */
        		if (! window.tipped) {
                        $("#HFooter a.eol-tipline").bind("click",function(e){
                                window.tipped = true;
                                e.preventDefault();
                                $(e.currentTarget).addClass("override");
                                eol.page.modal("<div class='tipline-wrap'><a class='tipline-close'><span>CLOSE</span></a><iframe frameborder='0' scrolling='no' class='eol-tipline' src='" + $(e.currentTarget).attr("href") + "'></iframe></div>");
                                $("a.tipline-close").unbind("click").bind("click", function(){eol.page.modal({show:false});});
                            });
                    }
        });

    }
    
    window.closeLB = function() {$("div#LightBox").hide();}

    var scanInterval = setTimeout(tasks, 1000 );
    $(document).ready(tasks);
    $(window).load(function(){tasks();clearTimeout(scanInterval);});


    
})(jQuery);

