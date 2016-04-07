if(typeof(EZDATA) == 'undefined') { EZDATA = {}; }


ezQuery(document).ready(function(){
    //Add click functionality to the description layovers of the more video section
    ezQuery(".ez-thumbs a",".ez-relatedMedia").each(function(){
        var thumb = ezQuery(this);
        thumb.attr("title", "");
        var desc = ezQuery(".ez-main .ez-desc", thumb.parent().parent());
        desc.bind("click", function(){
                window.location = thumb.attr("href");
        });
    });
	//dimensions for layover descriptions
    ezQuery(".ez-relatedMedia .ez-itemMod-item .ez-desc").each(function(){
        var hl = ezQuery(this);
        var tn = ezQuery(".ez-thumbs", hl.parent().parent());
        hl.css("width", (tn.width() - 10) + "px");
        hl.css("height", (tn.height() - 62) + "px");
    });
});


//Replace all specific characters in a string
EZDATA.ReplaceAll = function(Source,stringToFind,stringToReplace) {
	var temp = Source;
    var index = temp.indexOf(stringToFind);
    while(index != -1){
        temp = temp.replace(stringToFind,stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}


//Blank function that can be overridden in local version
EZDATA.searchMod_multiColumn_init = function(){
};


//Set up collapsable/expandable vertical filters
EZDATA.searchMod_filters_init = function(){
    ezQuery(".ez-searchMod-filters .ez-mod-content").each(function() {
        var threshold = 10;
        var list = ezQuery(this);
        var filters = ezQuery(".ez-searchMod-filter-item", list);
        if (filters.length > threshold){
            var moreFilters = ezQuery(".ez-searchMod-filter-item:nth-child(n+"+ threshold + ")", list);
            moreFilters.addClass("ez-expanded");

            var moreClick = "ezQuery('.ez-expanded', ezQuery(this).parent().parent()).show(); ezQuery(this).parent().hide();return false;";
            list.append('<li href="#" class="ez-searchMod-filter-item ez-more"><a onclick="' + moreClick + '">More</a></li>');

            var lessClick = "ezQuery('.ez-expanded', ezQuery(this).parent().parent()).hide(); ezQuery('.ez-more', ezQuery(this).parent().parent()).show(); return false;";
            list.append('<li href="#" class="ez-searchMod-filter-item ez-less ez-expanded"><a onclick="' + lessClick + '">Less</a></li>');
        }
    });
};


EZDATA.searchPage_move_relatedVideos = function(q, link){
    var relatedVideos = ezQuery(".ez-sideContent .ez-itemMod.ez-relatedMedia");
    relatedVideos.insertAfter(ezQuery(".ez-mainContent .ez-itemMod-item:nth-child(2)"));

    var relatedVideosTitle = ezQuery(".ez-mainContent .ez-relatedMedia p.ez-title");
    relatedVideosTitle.html("<a href='"+ link +"'>Videos for <b>"+ q +"</b></a>");
};


EZDATA.searchPage_show_relatedVideos = function(){
    ezQuery(".ez-page-search-google .ez-itemMod.ez-relatedMedia").show();
};


// empty function for metaQ
EZDATA.metaQ_init = function() {};

// Browser Detection
EZDATA.mobileApps = new Array("iphone", "android", "blackberry");
EZDATA.userAgent = navigator.userAgent.toLowerCase();
EZDATA.isMobile = function() {
    for (i = 0; i < EZDATA.mobileApps.length; i++) {
        if (EZDATA.userAgent.indexOf(EZDATA.mobileApps[i]) > -1) {
            return true;
        }
    }
    return false;
};


// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright 2006 Adobe Systems, Inc. All rights reserved.
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
    // NS/Opera version >= 3 check for Flash plugin in plugin array
    var flashVer = -1;
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
            var descArray = flashDescription.split(" ");
            var tempArrayMajor = descArray[2].split(".");
            var versionMajor = tempArrayMajor[0];
            var versionMinor = tempArrayMajor[1];
            if ( descArray[3] != "" ) {
              tempArrayMinor = descArray[3].split("r");
            } else {
              tempArrayMinor = descArray[4].split("r");
            }
              var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
              var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
            }
        }
        // MSN/WebTV 2.6 supports Flash 4
        else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
        // WebTV 2.5 supports Flash 3
        else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
        // older WebTV supports Flash 2
        else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
        else if ( isIE && isWin && !isOpera ) {
        flashVer = ControlVersion();
    }
    return flashVer;
};


EZDATA.hasFlash = function() {
    var versionStr = GetSwfVer();
    if (versionStr == -1) {
        return false;
    }
    return true;
};


// onerror event for video thumbnails
EZDATA.altVideoThumbnail = function(obj, thumb) {
    obj.src = thumb;
}

// hide thumbnail image if URL isn't valid
EZDATA.hideThumb = function(img) {
    ezQuery(img).parent().parent().hide();
}

EZDATA.debug = function(message) {
    if(window.console){
        console.log(message);
    }
}
