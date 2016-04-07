//	News
//	old News JS, needs cleaned
//	removes leading 0s from numbers
var removeLeadingZeros = function(tmp) {
    if (tmp < 10) {tmp = tmp.toString().replace(/0/,"");} return tmp;
}
//	adds leading 0s from numbers
var addLeadingZeros = function(tmp) {
    if (String(tmp).length < 2) {tmp = "0" + tmp;} return tmp;
}
//	receive amount to slide, slide Hot List UL left or right; used on Category Index page
var moveList = function(obj,n) {
    var o = document.getElementById(obj);				// get the toutList ul
    o.style.left = String(n+"px");					// move toutList
}
//	receive direction to slide (prev/next), slide Hot List UL left or right; used on Category Index page
var slideHotList = function(dir) {
    var m = 296;										// if the function received a direction, set the movement width to 296; if not, set it to 0
    var n = 0;											// initialize n as 0; if function received a direction, it will be reset
    var UL = document.getElementById("toutList");		// get the toutList ul
    if (dir) {
        if (dir == "next") {m = m*(-1);}				// for "next" make 296 a negative number
        var c = Number(UL.style.left.replace(/px/,""));	// get the current left position of toutList
        n = c + m;									// create the new left (by adding 296 or -296 to the current left)
        var speed = 150;
        //determine the direction for the blending, if start and end are the same nothing happens
        if (c > n) {
            for(i = c; i >= n; i--) {
                setTimeout("moveList('toutList'," + i + ")",speed);
                speed++;
            }
        } else if (c < n) {
            for(i = c; i <= n; i++) {
                setTimeout("moveList('toutList'," + i + ")",speed);
                speed++;
            }
        }
    }
    var LIs = UL.getElementsByTagName("li");			// get all the LIs in toutList
    var prev = document.getElementById("hotTopicsPrev");
    prev.className = "";							// remove any class from the previous navigation link
    prev.childNodes[0].onclick = function() {		// attach an onclick event to the previous navigation link
        slideHotList("prev");
    }
    var next = document.getElementById("hotTopicsNext");
    next.className = "";							// remove any class from the next navigation link
    next.childNodes[0].onclick = function() {		// attach an onclick event to the next navigation link
        slideHotList("next");
    }
    if (n == 0) {										// if toutList is at its left-most position, disable the previous navigation link
        prev.className = "disabled";
        prev.childNodes[0].onclick = null;
    }
    if (n == (m * (LIs.length - 2))) {					// if toutList is at its right-most position, disable the next navigation link
        next.className = "disabled";
        next.childNodes[0].onclick = null;
    }
}
//	initialize Hot List; used on Category Index page
var initializeHotList = function() {
    if (!document.getElementById) return;
    if (!document.getElementsByTagName) return;
    if (!document.getElementById("hotTopicsSlide")) return;
    slideHotList();
}
//	get the next/previous XML feed, create the next/previous navigation buttons, and place them into the page
var articleNextPrevNavCallback = function(pos,response) {
    var u = location.href.split(',');
    var id = String(u[2]);
    var items = response.getElementsByTagName('item');
    for (i = 0; i < items.length; i++) {// NOTE: the data file is in descending order
        var link = items[i].getElementsByTagName('link')[0].firstChild.data;
        if (link.indexOf(id) > -1) {
            var topnav = '<ul>';
            var botnav = '<ul>';
            var p = i-1;
            if (p >= 0) {
                var prevTitle = items[p].getElementsByTagName('title')[0].firstChild.data;
                var prevLink = items[p].getElementsByTagName('link')[0].firstChild.data;
//					topnav += '<li class="prev"><a href="' +prevLink+ '">' +prevTitle+ '</a></li>';
                topnav += '<li class="prev"><a href="' +prevLink+ '" title="' + prevTitle +'"><span>Previous Article</span></a></li>';
                botnav += '<li class="prev"><a href="' +prevLink+ '"><span>Previous</span>' +prevTitle+ '</a></li>';
            }
            var n = i+1;
            if (n < items.length) {
                var nextTitle = items[n].getElementsByTagName('title')[0].firstChild.data;
                var nextLink = items[n].getElementsByTagName('link')[0].firstChild.data;
//					topnav += '<li class="next"><a href="' +nextLink+ '">' +nextTitle+ '</a></li>';
                topnav += '<li class="next"><a href="' +nextLink+ '" title="' + nextTitle + '"><span>Next Article</span></a></li>';
                botnav += '<li class="next"><a href="' +nextLink+ '"><span>Next</span>' +nextTitle+ '</a></li>';
            }
            topnav += '</ul>';
            botnav += '</ul>';
            document.getElementById('nextprevpaginationtop').innerHTML = topnav;
            document.getElementById('nextprevpaginationtop').className += ' active';
            document.getElementById('nextprevpaginationbottom').innerHTML = botnav;
            document.getElementById('nextprevpaginationbottom').className += ' active';
        }
    }
}
//	initialize Article page's next/previous article links; used on... Article page
var initializeArticleNextPrevNav = function() {
    if (!document.getElementById) return;
    if (!document.getElementsByTagName) return;
    if (PEOPLE.News.articledate == null || PEOPLE.News.articledate == '') return;
    arrCalendarDates.length = 0;
    addCalendarDates(PEOPLE.News.articledate,'/people/xml/nextprev/0,,' +PEOPLE.News.articledate+ ',00.xml');// example: /people/xml/nextprev/0,,10-28-2008,00.xml
    getFeed(arrCalendarDates[0],'nextprevpaginationtop',articleNextPrevNavCallback);
}

//	initialize recirc feeds; used on Main and Category pages
var initializeNewswireFeed = function() {
    if (!document.getElementById) return;
    if (!document.getElementsByTagName) return;
    var recircArray = {
        'recircs' : [
            {
                'id'		: 'recirc1',
                'feed' 		: [
                    {
                        'name'  	: 'Huffington Post',
                        'json' 		: 'http://img2-short.timeinc.net/people/static/json/huffingtonpost/feed.js',
                        'site' 		: 'http://www.huffingtonpost.com/entertainment/',
						'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/huffpost.png',
                        'display'	: 5
                    }
                ]
            },{
                'id'		: 'recirc2',
                'type' 		: 'random',
                'display'	: 1,
                'feed' 		: [
                    {
                        'name'  	: 'PopSugar.com',
                        'json' 		: 'http://img2-short.timeinc.net/people/static/json/popsugar/feed.js',
                        'site' 		: 'http://www.popsugar.com',
                        'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/popsugar.png',
                        'display'	: 5
                    }
					/*
					,
                    {
                        'name'  	: 'Moviefone',
                        'json' 		: 'http://www.people.com/people/static/json/moviefone/feed.js',
                        'site' 		: 'http://www.moviefone.com',
                        'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/moviefone.png',
                        'display'	: 5
                    }
					*/
                ]
            },{
                'id'		: 'recirc3',
                'feed' 		: [
                    {
                        'name'  	: 'Celebrity-Babies.com',
                        'json' 		: 'http://img2-short.timeinc.net/people/static/json/celebrity_babies/feed.js',
                        'site' 		: 'http://celebritybabies.people.com/',
                        'image' 	: 'http://www.people.com/people/static/i/news/logoCBB.gif',
                        'display'	: 5
                    }
                ]
            }
        ]
    };
    pushToMasterArray(recircArray);
};
initializeNewswireFeed();
//	initialize Partner Recirc feeds; uses Global PartnerRecirc function
var initializeArticleRecirc = function() {
    if (!document.getElementById) return;
    if (!document.getElementsByTagName) return;
    var recircArray = {
        'recircs' : [
            {
                'id'		: 'rightcolumnrecirc',
                'feed' 		: [
                    {
                        'name'  	: 'Huffington Post',
                        'json' 		: 'http://img2-short.timeinc.net/people/static/json/huffingtonposttv/feed.js',
                        'site' 		: 'http://www.huffingtonpost.com/tv/',
                        'image' 	: 'http://img2.timeinc.net/people/static/i/news/logoTv.png',
                        'callback'	: PEOPLE.recirccallback,
                        'display'	: 3
                    }
                ]
            },{
                'id'		: 'rightcolumnrecircbottom',
                'display'	: 1,
                'feed' 		: [
                    {
                        'name'  	: 'Today Show',
                        'json' 		: 'http://www.people.com/people/static/json/todayshow/feed.js',
                        'site' 		: 'http://today.msnbc.msn.com/',
                        'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/todayshow.png',
                        'callback'	: PEOPLE.recirccallback,
                        'display'	: 3
                    }
                ]
            },{
                'id'		: 'afterarticlerecirc',
                'display'	: 1,
                'feed' 		: [
                    {
                        'name'  	: 'Huffington Post',
                        'json' 		: 'http://img2-short.timeinc.net/people/static/json/huffingtonpostarticle/feed.js',
                        'site' 		: 'http://www.huffingtonpost.com/entertainment/',
                        'image' 	: 'http://img2.timeinc.net/people/static/i/misc/partners/huffpost.png',
						'callback'	: PEOPLE.recirccallback,
                        'display'	: 2
                    }
                ]
            }
        ]
    };
    pushToMasterArray(recircArray);
};
initializeArticleRecirc();
//	collapse right column adMarketplace if no ad
function hideAdMarketplace() {
    if (!document.getElementById("adMarketplace")) return;
    document.getElementById("adMarketplace").id = "adMarketplaceNoAds";
}
//	this will be reset to true if the adMarketplace ad fires; if not, the initializeAdMarketplace function will hide the DIV
var adMarketplace = "false";
//	redefines function from 0,,,00.js to set wmode to transparent
var buildBrightcovePlayer = function(videoID) {
    var config = new Array();
    config["videoId"] = videoID;
    config["videoRef"] = null;
    config["lineupId"] = null;
    config["playerTag"] = null;
    config["autoStart"] = false;
    config["preloadBackColor"] = "#FFFFFF";
    config["width"] = 300;
    config["height"] = 320;
    config["wmode"] = "transparent";
    config["playerId"] = (brightcovePlayerID == "") ? 416421276 : brightcovePlayerID;
    createExperience(config, 8);
}
//	append calendar JS if page requires a calendar
var initializeCalendar = function() {
    $.getScript('/people/static/j/news/calendar.js');
}
//	can list as many functions as you want and the loader below will load them as soon as the page is loaded
var leftColumnFunctions = function() {
    //addBookmarkDropdown("div");
    if(document.getElementById("addPeopleNews")){document.getElementById("addPeopleNews").style.position = "absolute";}
}
//	can list as many functions as you want and the loader below will load them as soon as the page is loaded
var pageLoadFunctions = function() {
    if(adMarketplace == "false"){hideAdMarketplace();}
    tii_attachHoverAffect("div","tout","hover","posts"); // elements to find, class to find within elements, new class to add elements, optional parent id
    tii_attachHoverAffect("li","","hover","newsCategories");
    tii_attachHoverAffect("li","","hover","specialFeaturesList");
    tii_attachHoverAffect("div","tout","hover","top10Categories");
    tii_attachHoverAffect("li","addPeopleNews","hover","middleColumn");
}
//	load scripts once these elements are loaded
tii_callFunctionOnElementLoad("calendars", initializeCalendar);
tii_callFunctionOnElementLoad("hotTopicsSlide", initializeHotList);
tii_callFunctionOnElementLoad("leftColumn", leftColumnFunctions);
tii_callFunctionOnElementLoad("nextprevpaginationbottom", initializeArticleNextPrevNav);
//	load scripts once full page is loaded
tii_callFunctionOnWindowLoad(pageLoadFunctions);
// setting document.domain so polls and fbconnect will play with each other
if(document.location.href.indexOf('people.com') > 0){
    document.domain = 'people.com';
}else if(document.location.href.indexOf('peoplestylewatch.com') > 0){
    document.domain = 'peoplestylewatch.com';
}
// new News JS
PEOPLE.News = {
    init : function() {
        PEOPLE.News.huffingtonNewsRecirc();
        if ($('#addPeopleNews')) {PEOPLE.News.addPeopleNews();} // Newswire drop-down
    },
    addPeopleNews : function() {
        if (!$('#addPeopleNews').length) {return;}
        $('#addPeopleNews')
            .hover(
            function(){
                $(this).addClass('hover');
            },function(){
                $(this).removeClass('hover click');
            }
        ).find('span').click(function(){
                $(this)
                    .addClass('click')
                    .find('ul:first')
                    .addClass('active')
                    .hover(
                    function(){
                        $(this).addClass('active');
                        $(this).parent().addClass('click');
                    },
                    function(){
                        $(this).removeClass('active');
                        $(this).parent().removeClass('click');
                    }
                );
                return false;
            });
    },
    huffingtonNewsRecirc : function() {
        $.ajax({
            url: 'http://' + location.hostname + '/people/static/h/inc/news/huffington.txt',
            success: function(data) {
                var rightRecirc = $('#rightcolumnrecirc'),
                    markup = '<div id="rightcolumn-recirc-top" class="toutSection recirc hfeed active">' +
                        '<p class="title">From Our Partners</p>' +
                        data +
                        '</div>';
                if ( rightRecirc.length ) {
                    rightRecirc.before(markup);
					
					$('#rightcolumn-recirc-top #HuffingtonPost p.header').after('<p class="celeblogo"><a target="_blank" href="http://www.huffingtonpost.com/entertainment/"><img src="http://img2.timeinc.net/people/static/i/news/logoCelebrities.png" /></a></p>');

					// Add a "Read more" link to HuffPost image tout.
			
					var readmore = '',
						readmoreheadline = '',
						readmoreURL = '';
						
					readmoreheadline = $('#rightcolumn-recirc-top #HuffingtonPost li.has-image a.has-image-headline').text();
					readmoreURL = $('#rightcolumn-recirc-top #HuffingtonPost li.has-image a.has-image-headline').attr('href');
					readmore = '<p class="readmore"><a href="' + readmoreURL + '" target="_blank">Read It</a></p>';
					$('#rightcolumn-recirc-top #HuffingtonPost li.has-image a.has-image-headline').after(readmore);
				
					PEOPLE.Article.trackRRHuffPost();
					
                }
            }
        })
    },
    startsubnav : function() {
        $('#subnavMore').find('a:first').bind('click',function(e) {
            e.preventDefault();
            $(this).parent().addClass('active');
        })
            .end()
            .find('div').bind('mouseleave',function() {
                $(this).parent().removeClass('active');
            });
    },
    addsubnavarrows : function() {
        $('#subnavMore').find('div').find('a').each(function() {
            $(this).append('<span />');
        });
    }
};
tii_callFunctionOnWindowLoad(PEOPLE.News.init);

/* Visual Revenue Top Story Tracking (commented out since we are now using Article tracking function in global main js.)
$(document).ready(function(){
    $('#vr018001001').bind('click', function(e){
        var t = $(e.target),
            li = (t.parent()[0].nodeName === 'UL') ? t : t.parent(),
            n = li.prevAll().size()+1
        linkTrackArt('topstory'+n, t.text());
    })
}); */


$(function(){
    $('#leftFirst').append('<div class="cmlink"><a href="https://subscription.people.com/storefront/subscribe-to-people/link/1003984.html" target="_blank">Get 4 FREE Issues</a></div>');
	
	// add IDs to ad/recirc modules so Ad Ops can target specific positions
	var channelAds = $('body#news.channel #leftColumn .adTout').length,
		categoryAds = $('body#news.category #leftColumn .adTout').length;
	
	for (i=0;i<channelAds;i++){
		var currentPos = i+1;
		$('body#news.channel #leftColumn .adTout').eq(i).attr('id','adTout'+currentPos);
		$('body#news.channel #leftColumn #adTout'+currentPos).find('.adLeft').attr('id','adLeft'+currentPos);
	}
	
	for (i=0;i<categoryAds;i++){
		var currentPos = i+1;
		$('body#news.category #leftColumn .adTout').eq(i).attr('id','adTout'+currentPos);
		$('body#news.category #leftColumn #adTout'+currentPos).find('.adLeft').attr('id','adLeft'+currentPos);
	}	
	
});

// Add Corrections Module to right rail
/*
$(function(){
	var correctionsHTML =	'<div id="corrections">'
						+		'<p class="title">Corrections</p>'
						+		'<div class="tout">'
						+			'<div class="txtcont">'
						+				'<p>In our print edition story on Google cofounder Sergey Brin\'s split from his wife, Anne Wojcicki, the photograph of Amanda Rosenberg, the woman who has allegedly had a romantic relationship with Brin, was actually of another person. We have no reason to believe the person shown in the article has a connection to any of the subjects in the story. We regret the error.</p>'
						+			'</div>'
						+		'</div>'
						+	'</div>';


	$('body#news #gotNewsTip').after(correctionsHTML);
});
*/

// Resize all large photos to fit in the channel main pages
$(function(){
	if ( $('body#news.category').length ) {
		$('.imgLeft img').each(function(){
			var imgwidth = $(this).width(),
				imgheight = $(this).height();
		
			if (imgwidth > 600) {
				$(this).css('width','600px');
				$(this).css('height','450px');
			}
		
		});
		
		$('.imgRight img').each(function(){
			var imgwidth = $(this).width(),
				imgheight = $(this).height();
		
			if (imgwidth > 600) {
				$(this).css('width','600px');
				$(this).css('height','450px');
			}
		
		});
	} // end: if
});




$(document).ready(function() {

    PEOPLE.News.startsubnav();
    PEOPLE.News.addsubnavarrows();

});
