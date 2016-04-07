// SimpleReach
var __reach_config;
var simpleReach = {
    init : function() {
        if ( $('meta[name=DATE_PUBLISHED]').length ) {
            if( location.href.match(/\/article\//) || $('body').hasClass('single') || $('body').hasClass('single-post') || location.href.match(/\/gallery\//)) {
                simpleReach.generateConfig();
            }
        }
    },
    generateConfig : function() {
        var p = ($('meta[name=DATE_PUBLISHED]').attr('content')).split(' '),
            date = p[0],
            datep = date.split('/'),
            time = p[1],
            timep = time.split(':'),
            tags = '',
            categories = $('meta[name=CATEGORY_NAME]').attr('content'),
            pubdate;
        if(timep[1].charAt(2) === 'P') timep[0] = parseInt(timep[0]) + 12;
        pubdate = new Date(datep[2],datep[0]-1,datep[1],timep[0],timep[1].charAt(0) + timep[1].charAt(1));
        /*
         if( categories ) tags = s_time.prop11 ? categories+', '+s_time.prop11 : categories;
         else if(s_time.prop11) tags = s_time.prop11;
        */
        __reach_config = {
            pid     : '4fa8277fa782f32fb300019d',
            title   : $('meta[name=TITLE]').attr('content'),
            url     : $('meta[name="CANONICAL_URL"]').attr('content'),
            date    : pubdate,
            authors : [$('meta[name=CREDIT]').attr('content')],
            channels: $('meta[name="SECTION"]').attr('content'),
            tags    : categories.split(',')
        };
        simpleReach.load();
    },
    load : function() {
        var s   = document.createElement('script');
            s.async = true;
            s.type  = 'text/javascript';
            s.src   = document.location.protocol + '//simple-cdn.s3.amazonaws.com/js/reach.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
    },
    refresh : function() {
        SPR.Reach.collect(__reach_config);
    }
};
$(document).ready(function() { simpleReach.init(); });


// Chartbeat
var author = 'PEOPLE.com';
$byline = $('p.byline span.author, #recipes.recipe h1 .celeb-name'); //collection of elements which may contain author names
if($byline.length > 0){
	author = $byline.html(); //store author name from first element found
	if($byline.length > 1){ //if more than one author name is found, concatenate additional author names
		$byline.slice(1).each(function(){
			author += ", " + $(this).html();
		});
	}
}
var _sf_async_config={};
_sf_async_config.uid = 50274;
_sf_async_config.domain = 'people.com';
_sf_async_config.useCanonical = true;
_sf_async_config.sections = $('meta[name=SECTION]').attr('content');
_sf_async_config.authors = author;
(function(){
    function loadChartbeat() { 
		window._sf_endpt=(new Date()).getTime(); 
		var e = document.createElement('script'); 
		e.setAttribute('language', 'javascript'); 
		e.setAttribute('type', 'text/javascript'); 
		e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js'); 
		document.body.appendChild(e); 
	}
    var oldonload = window.onload;
    window.onload = (typeof window.onload != 'function') ? loadChartbeat : function() { oldonload(); loadChartbeat(); };
})();

// SkimLinks :: Ticket 3799, Ticket 3802 - Giancarlo Morillo - 6/16/14
(function(){
	function loadSkim() {
	    if (window.location.href.match(/joyus/) ) {
	        return;
	    } else if( document.title.match(/joyus/) ) {
	        return;
	    } else if( document.getElementsByTagName("body")[0].id.match(/joyus/) ) {
	        return;
	    } else if( document.getElementById('joyus-tout') ) {
	        return;
	    } else if( document.getElementsByClassName('joyus_iframe').length ) {
	        return;
	    } else {
	        var links = document.getElementsByTagName("a");
	        for(var i=0; i<links.length; i++) if(links[i].href.match(/joyus/)) links[i].rel = 'noskim';
	        var joy_subnav = document.getElementById('subnavSWJoyus');
	        if(joy_subnav) joy_subnav.childNodes[0].rel = 'noskim';
	        var s = document.createElement('script');
	        s.type = 'text/javascript';
	        s.src = '//s.skimresources.com/js/58287X1516331.skimlinks.js';
	        document.body.appendChild(s);
	    }
	}
    var oldonload = window.onload;
    window.onload = (typeof window.onload != 'function') ? loadSkim : function() { oldonload(); loadSkim(); };
})();