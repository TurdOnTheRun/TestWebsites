//property  initialization
//BEGINS HERE


(function($){
    //Widget Tracking
    var widgetArray = [];

    //functions and variables to see if a window.location.pathname should be checked for dynamic page naming rules
    function isPath( path ) {
        return ( $.type(path) === "regex" ) ? path.test(window.location.pathname) : window.location.pathname.indexOf(path) === 0;
    }

    //Convert string to lowercase, remove punctuation, and replace spaces with "-"
    function cleanString(dirtyString) {
	    return dirtyString.toLowerCase().replace(/\s+/g,'-').replace(/[\/!@#$%^&*(),.?'"]+/g,'').replace("--","-").replace(/-�/g,"").replace(/btch/g,"bitch").replace(/amp\;/g,"and").replace(/�/g,"e");
    }

    function runScrollTracking(status){
	    var randomNum = Math.floor(Math.random()* 101);
	    if (randomNum <= 5 || status == 'true') {
	        s.events = ( ! s.events ) ? "event22" : s.events + ",event22";

			if (typeof(sSetPercentSeen) !== 'undefined') {
				sSetPercentSeen( sGetScrollPercentage() ); //set page viewed by default when page first loads
			}
		    s.prop26 = "scroll:" + s.pageName; //traffic variable for pages to detect time btw scrolls
//		    s.products = ";;;;event22=" + sGetPercentSeen()  + "|event4=" +  sGetNumberOfProducts(); //initial value sent with page view
		    
		    $(window).bind("scroll", sScrollingEvent);
	    }
    }

    //Big Picture module click tracking
    function bigPicModule(){
            widgetArray.push('the-big-picture');
	        //Establish current titles
	        var moduleTitle = "big-picture";
            $('#module_bigpicture').each(function(el){
	                var imgTitle = cleanString($(this).find('.bigPicImgLink').first().attr('title').stripTags());
	                var captionTitle = cleanString($(this).find('.bigPicFullTitle').html().stripTags());

                    $(this).find(".bigPicImgLink").bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':image');
			                pageTracker._trackPageview($(e.target).attr("rel"));
		                });

                    $(this).find(".bigPicFullTitle").bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':' + captionTitle);
			                pageTracker._trackPageview($(e.target).attr("rel"));
                        });

                    $(this).find(".bigPicGrab").bind('click', function(e) {
			                sSetWidgetDistributeInfo('big-picture:grab-share','big-picture','widget','clearspring')
		                });

	                $(this).find(".bigPicMore").bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':more-photos');
			                pageTracker._trackPageview($(e.target).attr("rel"));
		                });
                });
        };

    //Fashion Police module click tracking
    function fashionPoliceModule(){
            widgetArray.push('the-fashion-police');
	        //Establish current titles
	        var moduleTitle = "fashion-police";

            $('#module_fashion_police').each(function(el){
	                var imgTitle = cleanString($(this).find('.img_link img').first().attr('title'));
	                var captionTitle = cleanString($(this).find('.gallerySpotTitle').first().text());

	                $(this).find('.more_button').bind('click', function(e) {
			                var titleString = moduleTitle + ':' + imgTitle+ ':more-photos';
			                sTrackWidgetClick(titleString);
		                });

                    $(this).find('.img_link').bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':image');
                        });

	                $(this).find('.gallerySpotTitle').bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':' + captionTitle);
		                });
                });
        };

    function topGalleryModule(){
            widgetArray.push('top-galleries');
	        var moduleTitle = "top-galleries";

            $('#module_topgalleries').each(function(el){
	                $(this).find('.more_button').bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':more-photos');
		                });

	                $(this).find('.topGalImg').bind('click', function(e) {
			                var imgTitle = cleanString($(e.target).attr("title"));
			                var titleString = moduleTitle + ':' + imgTitle+ ':image';
			                sTrackWidgetClick(titleString);
		                });

	                $(this).find('.gallery_title').bind('click', function(e) {
			                var imgTitle = cleanString($(e.target).attr("rel"));
			                var titleString = moduleTitle + ':' + imgTitle + ':text';
			                sTrackWidgetClick(titleString);
		                });
                });
        };

    //end of dynamic page naming, the following is static mapping that overrides any dynamic rules or variables passed into nielsen.jsp

    //note that if the page is in the mapping array, all the pagename logic that was set above is overwrittens

    var match = (new RegExp("(" + window.location.pathname + " )(.*? )(.*? )(.*?(?=\]\]|$))")).exec(sUrlToPageNameMappingArray.join("]]"));
    if ( match ) {
        s.pageName = $.trim(match[2]); // page name
        s.prop7 = $.trim(match[3]); // page content source
        s.prop15 = $.trim(match[4]); // page type
    }

	s.pageName = s.pageName + ( eol.uattr("author") ? ":by-author:" + eol.uattr("author").replace("+","-").replace(" ","-") : "" );
	s.pageName = s.pageName + ( eol.uattr("start") ? ':' + eol.uattr("start") : "" );

        //s.prop16 = sGetTitlesByCssClass(sTrackingCssNameWidgets);
//    s.prop19 = sGetTitlesByCssClass(sTrackingCssNameVideos);
//    s.products = ";;;;event4=" +  sGetNumberOfProducts(); //initial value sent with page view

    //initialize %page viewed and set/check cookie
    if(eol.uattr("scroll") == "true" ){
	    eol.cookie('scrolltracking', 'true', 0);
    } else if(eol.uattr("scroll") == "false" ){
	    eol.cookie('scrolltracking', 'false', 0);
    }
    if (eol.cookie('scrolltracking').length === 0) {
	    eol.cookie('scrolltracking', 'false', 0);
	    runScrollTracking('false');
    } else {
	    if(eol.cookie('scrolltracking') == 'true'){
		    runScrollTracking('true');
	    }
    }

    //Initializing Home nav tracking depending on which host the site is being dispalyed on
    $("#top_navigation_links").each(function() {
	        // For 5% of all visitors, enable widget tracking on the home nav
	        // Set a session cookie containing so inclusion/exclusion persists across page views
    	
	        if ( eol.cookie('s_includeInMainNavTracking') === 0 ) {
		        var includeInRandomSample = (Math.random() <= 0.05 ) ? 'include': 'exclude';
		        eol.cookie('s_includeInMainNavTracking', includeInRandomSample, 0); // Set a session cookie
	        }
        	
	        if (eol.cookie('s_includeInMainNavTracking') === 'include'){
		        widgetArray.push('top-navigation');
		        homeNavTracking(); //Call home nav click function
	        }
        });
    

    //Main Nav click tracking
    function homeNavTracking(){
        $("#top_navigation_links a").each(function(anchor){
                    var $this = $(this);
                    var subSection = "";
                    var hostVal = ( $this.attr("href").match(window.location.host)) ? 'e' : $this.attr("href").replace(/(^.*?\:\/\/.*?\.(?=.*?\..*?))|((\.\w{2,3}){1,2}\/.*?$)/,"");

                    if ( ! $this.hasClass("tab") ) {
                        subSection = cleanString($this.parents(".tab").text());
                    }
			        sTrackWidgetClick('top-navigation:' + cleanString($this.parents(".tab").text()) + ( subSection ) ? ':' + subSection : "" ,'',hostVal);
            });
    }

    function pagesUberblog( path, page ){
            // /(watch_with_kristin)|(hwood_party_girl)|(ask_the_answer_bitch)|(the_soup)|(movie_reviews)|(the_awful_truth)|(marc_malkin)|(lyons_den)/
            var uberblog = path.replace(/.*?uberblog\//,"");

            if ( uberblog.match(/\/poseoff\/index/) ) {
	            var query = location.search;
	            //Extract value and year from value 1 to flip it to the other side of the show and strip the underscores
	            var value1 = query.split("=")[1];
	            value1 = value1.split("&")[0];
	            var year = value1.split("_")[0];
	            value1 = value1.replace(year + "_","").replace("golden_","").replace("_awards","").replace("sag","sags");
	            value1 = value1 + year;

	            var value2 = query.split("=")[2];
        	    
	            page.prop1 = "red_carpet";
	            page.prop2 = value1;
	            page.prop3 = "extras";

	            //Set full string
	            page.pageName = [page.prop1, page.prop2, page.prop3,"poseoff",value2];
            } else if ( uberblog.match("/redcarpet/video/")){
                page.prop15 = "video";
            } else if ( uberblog.match("/redcarpet/games/")){
                page.prop15 = "extras";
            } else if ( uberblog.match(/\/celebs\/[\w\d]/i)){ //Celebs
	            var value = location.split("/uberblog/celebs/")[1];

	            var pageId = value.split('_')[0];
	            var celebId = value.split(pageId)[1].replace("_","").replace(".html","").toLowerCase();

	            page.pageName = ["celebs", pageId, celebId];
            } else if ( uberblog.match(/\/index.[0-9].html\?categories\=/i)){ //Category Paging
	            var topicRaw = location.split("/uberblog/")[1];
	            var topic = topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	            var category = location.split("?categories=")[1];
	            var pageNum	= parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || 1;

    	        page.pageName = [topic, category, "news", pageNum];

	            if ( uberblog.match(/oscar|sag|grammys|emmys|golden/i)) { //If we find a red carpet package add redcarpet
		            topicDate = topic.split("_")[0];
		            topicName = topic.split("_")[1];
		            topicCombined = topicName + topicDate.replace("-","");
		            page.pageName = ["red_carpet", topicCombined, "news", pageNum];
	            }
            } else if ( uberblog.match(/^\/uberblog\/.*?\/index/i)){ //Franchise Paging
	            var topicRaw = location.split("/uberblog/")[1];
	            var topic = topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	            var franchise = eol.uattr("franchise") || "";
	            var pageNum	= parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || "";

	            //If we find a red carpet package add redcarpet
	            page.pageName = [ franchise, topic, "news"];
	            if ( uberblog.match(/oscar|sag|grammys|emmys|golden/i) ) {
		            topicDate = topic.split("_")[0];
		            topicName = topic.split("_")[1];
		            topicCombined = topicName + topicDate.replace("-","");
		            page.pageName = ["red_carpet", topicCombined, "news"];
	            }
	            if ( pageNum ) {
	                page.pageName.push(pageNum);
	            }   
            } else if( uberblog.match(/bio\.jsp/)){
                p.prop15 = "bio";
	            p.pageName = [eol.uattr("category"),"bio"];
            }
    
    }

    function pagesChelsea( path, page ){
            var chelsea = path.replace(/.*?chelsea\//,"");

            if (chelsea.match("/chelseaness/b")) { //Custom Chelsea Values placed here to prevent override
	            var value = location.split("/chelseaness/")[1].replace('.html','');
	            page.prop15 = "news";
	            page.pageName = ["chelsea","news","detail",value];
            } else if ( chelsea.match(/\/chuy\/b/)) {
	            var value = location.split("/chuy/")[1].replace('.html','');
	            page.prop15 = "news";
	            page.pageName = ["chelsea", "chuy", "news", "detail", value];
            }  else if ( chelsea.match(/\/chelseaness\/chelsea\/index\.\d\.html/i)) {
	            page.prop15 = "news";
	            page.pageName = ["chelsea", "news", parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || 1];
            }  else if ( chelsea.match(/\/chuy\/chelsea\/index\.\d+.html/i)) {
	            page.prop15 = "news";
	            page.pageName = ["chelsea","chuy","news",parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || 1];
            }  else if ( chelsea.match(/\/chelseaness\/index.jsp\?cid=bio/i) ) {
	            page.prop15 = "bio";
	            page.pageName = ["chelsea","bio"];
            } else if ( chelsea.match(/\/chuy\/index\.jsp\?cid=bio/i)) {
	            page.prop15 = "bio";
	            page.pageName = ['chelsea','chuy','bio'];
            }  else if ( chelsea.match(/\/bigfatbaby\/thankyou.jsp/i)) {
	            page.pageName = ["chelsea","the-show","big-fat-baby","thankyou"];
	            page.prop15 = "show";
	        } else if ( chelsea.match(/\/index\.jsp\?cid=book/i) ) {
	            page.pageName = ['chelsea','book'];
                page.prop15 = "show";
            } else if ( chelsea.match(/\/index\.jsp\?cid=tour/i) ) {
	            page.prop15 = "show";
	            page.pageName = ['chelsea','tour'];
            } else if ( chelsea.match(/\/vids\/index\.jsp/i)) {
	            page.prop15 = "video";
            }
    }

    function pageDetails() {
        var p = {};
        var page = window.location.href.replace(/http.*?\//,"");

        if ( page.match(/^\/error\//) ){
            p.prop15 = p.pageType = "errorPage";
        } else if ( page.match(/^\/videos\//) ) {
            p.prop15 = "video";
            p.pageName = p.prop1 = "videos";
            p.prop7 = eol.uattr("franchise");

	        if ( p.pageName || page.match(/^\/on\//) ) {
                //we always override the nielsen.jsp values from "/on/" since there were legacy values there that we haven't been able to clear out yet 
	            //some special cases about what the page type will be
	            if ( page.match(/\/sponsor\//) ) {
		            p.prop15 = "landing";
	            } else if ( page.match(/\/uberblog\//)) {
		            p.prop15 = "news";
	            } else {
		            p.prop15 = "page";
	            }

	            var strPageName = window.location.pathname.replace(/\/$/,"");
	            //all the custom string replacment rules go heres
	            strPageName = strPageName.replace("/index.jsp", "").replace("/redcarpet/", "/red-carpet/").replace("/includes/", "").replace("/index.html", "").replace("/on/shows/", "").replace("/on/", "").replace("/e/","").replace("/uberblog/index", "/news/index").replace("/uberblog/", "/").replace("/celebrities/", "/celebs/").replace(".jsp", "").replace(".html", "").replace(/\//g, ":").replace("_", "-").replace("index.", "index:").replace("@","at").replace(/^:/,"");
                
	            if( eol.uattr("cid") ) {
	                p.pageName.push(eol.uattr("cid"));
	            }
	        } else {
	            p.pageName = p.pageName.replace(".html", "");
            }
        } else if ( page.match(/^(\/on\/shows\/|^\/e\/enews\/)/) ) {
            p = ( page.indexOf("chelsea") >= 0 ) ? pagesChelsea( page, p ) : { prop15 : "show" };
        } else if ( page.match(/^\/photos\/index.jsp\?category/i) ) { /* Photo Gallery Filtering Naming */
            p.pageName = ["gallery", "photos", $("#category_header h3").first().text()];
	        p.prop15 = "page";
	    } else if ( page.match(/^\/uberblog/) ) {
            p = pagesUberblog( page, p );
        }
        p.pageName = ( $.isArray(p.pageName) ) ? p.pageName.join(":") : p.pageName;

        return p;
   }

    //INIT
    (function(){
        $('#front_door_spots_cont').each(function() {
            widgetArray.push('frontdoor-brick');
        });
        topGalleryModule();
        fashionPoliceModule();
        bigPicModule();

        $.extend(s, pageDetails() );
//        s.prop16 = widgetArray.join("");
        if ( s.prop7 ) { //stick page content source name in front of the page name if it's not already there
            if (s.pageName.length < s.prop7.length || s.pageName.substring(0,s.prop7.length) != s.prop7) {
	            s.pageName = s.prop7 + ":" + s.pageName
            }
        }
    })();

})(jQuery);

//Property and page initialization
//ENDS HERE