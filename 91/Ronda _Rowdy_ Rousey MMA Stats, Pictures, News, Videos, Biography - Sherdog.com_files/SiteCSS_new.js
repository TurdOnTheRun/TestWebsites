if (window.location.toString().indexOf('abovetopsecret') > -1) {
				//Changes per Jaclyn
                //document.write('<style type=text/css>#dynamic_wrapper {background: none !important;width: 990px}</style>');
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> body{background-size: inherit  !important;}</style>';
				

} else if (window.location.toString().indexOf('actiontrip') > -1) {
                document.write('<style type=text/css>#all_holder {background-image: none}</style>');
				
				
} else if (window.location.toString().indexOf('animenewsnetwork') > -1) {
                document.write('<style type=text/css>#skin_left {background:none !important; visibility:hidden !important}#content {background:none !important}#skin_header {visibility:none !important}</style>');
				
//Date: 02/15/2016, Updated by: Ignacio Velderrain, Requested by: Dakotah Walker, Ticket no.: 78487
} else if (window.location.toString().indexOf('animecubed') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #container {margin: 0 auto !important; width:1000px !important;} </style>';
	            	
//Date: 03/29/2016, Created by: Ignacio Velderrain, Requested by: Dakotah Walker, Ticket no.: 79747
} else if (window.location.toString().indexOf('bullz-eye') > -1) {
                //document.write('<style type=text/css>  #background_wrapper {width: 1000px !important; margin 0 auto !important;}</style>');
				//Removed 12/13/2013 by Jaclyn Ramos
				//document.write('<style type=text/css>  #background_wrapper {background: none !important; width: 1000px}#header {background:none !important}</style>');
				// Removed 10/29/2012 by Gary Kozin's Request 
				//#header {background: url("http://www.bullzeye.com/images/homepage/design_2009/page_header/main_reskin_standard.jpg") repeat scroll 0 0 transparent !important}
				//Per Chris Piekarski 11/18/2014
				//document.write('<style type=text/css> body {background-position: 50% 32px !important;}</style>');
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #background_wrapper{width: 1000px !important; margin: 0px auto !important;} div[style="width:100%;text-align:center;"]{margin: 0px auto !important; width: 1000px !important;} form>table{margin-left: -16px !important;}</style>';
				

} else if (window.location.toString().indexOf('hotwheels') > -1) {
				var aoTargetID="container";
                document.write('<style type=text/css>#container {background: none !important;}</style>');
				

} else if (window.location.toString().indexOf('joblo') > -1) {
                document.write('<style type=text/css>#main_content {margin-top: '+pushdown+'px} #cmn_wrap {width: 990px !important; margin: 0 auto !important}</style>');
				
//Per Sabrina Valdez 12/10/2013
} else if (window.location.toString().indexOf('laineygossip') > -1) {
                document.write('<style type=text/css>#aspnetForm {width:994px !important;margin:0 auto !important;}</style>');
				document.write('<style type=text/css>.w1 {width:1000px !important;margin:0 auto !important;}</style>');
				document.write('<style type=text/css>#wrapper {width:1000px !important;margin:0 auto !important;}</style>');

} else if (window.location.toString().indexOf('mdn') > -1) {
				var aoTargetID="main";
                document.write('<style type=text/css>#main {background: none !important;</style>');
				

} else if (window.location.toString().indexOf('psu.com') > -1) {
                
                document.write('<style type=text/css>#wrapper {margin: 0 auto !important; width: 998px !important; background: none !important;</style>');
				

} else if (window.location.toString().indexOf('pinkisthenewblog') > -1) {
                document.write('<style type=text/css>body{padding-top: '+pushdown+'px !important;} #pageframe {clear:both !important} #pageframe2 {float:none !important}</style>');
				

} else if (window.location.toString().indexOf('techfresh') > -1) {
                document.write('<style type=text/css>.custom #container {width: 920px; background:url(images/page_bg.png) top center no-repeat #e8e8e8; margin: 195px auto 0; position: relative; padding: 0px; }body, .custom {background-image: url('+reskin+') !important;background-position: center top !important;background-repeat: no-repeat !important;background-color: '+bgcolor+' !important;	background-attachment: scroll !important;margin: 0px !important;}</style>');

				
// 10/17/2013
} else if (window.location.toString().indexOf('teenhollywoodgossip') > -1  || window.location.toString().indexOf('beautystyleliving') > -1 || window.location.toString().indexOf('foodieandrecipes') > -1) {
                document.write('<style type=text/css> body {border: none !important;} </style>');
				
			

// Teenhollywood 4-4-11
} else if (window.location.toString().indexOf('teenhollywood') > -1) {
				
                document.write('<style type=text/css>div#body{margin:0 auto !important; width:1024px !important} div#main-wrap {background: #fff !important;}</style>');
				
				

} else if (window.location.toString().indexOf('teenmusic') > -1) {
                
               document.write('<style type=text/css>div#body{margin:0 auto !important; width:1024px !important} div#main-wrap {background: #fff !important;}</style>');
				

} else if (window.location.toString().indexOf('teentelevision') > -1) {
                
                document.write('<style type=text/css>div#body{margin:0 auto !important; width:1024px !important} div#main-wrap {background: #fff !important;}</style>');
				

} else if (window.location.toString().indexOf('teenisland') > -1) {
                
                document.write('<style type=text/css>div#body {background-color: '+bgcolor+';background-image: url('+reskin+');background-repeat: no-repeat;background-scroll: scroll;background-position: center top;}div#main-wrap {background: transparent;margin-top: '+pushdown+'px;}div.top728 {left: 0px}.sitenav,div#main-wrap {background: #fff;}</style>');
				
				
} else if (window.location.toString().indexOf('sodahead') > -1) {
                document.write('<style type=text/css>#outerWrap {margin:0 auto; width:1000px !important;background: none !important} #navBarBackgroundWrap {height: 35px !important; left:50% !important; margin-left:-495px !important; width:990px !important;} .theme-clouds #innerWrap {background: none} </style>');
				
				
} else if (window.location.toString().indexOf('kidzbop') > -1) {
                document.write('<style type=text/css>div#bg-ad {margin:0 auto; width:0px}</style>');
								
				
} else if (window.location.toString().indexOf('keenspot') > -1) {
                document.write('<style type=text/css>center {margin:0 auto; width:760px}</style>');
				
				
} else if (window.location.toString().indexOf('hissip') > -1) {
                document.write('<style type=text/css>#rap {margin:0 auto; width:906px}</style>');
				
			// Updated 	11-4-13
} else if (window.location.toString().indexOf('hellokids') > -1) {
				//document.write('<style type=text/css>#global #top { height: 135px !important; top: -140px !important;} #g_search {width:970px;margin: 0 auto} #swf_skin { display: none !important;}</style>');
				//document.write('<style type=text/css>#global { margin: -90px auto 0 !important;} </style>');
				//For reskin running on 11-13-13
				//document.write('<style type=text/css>#global { margin-top: 140px !important;} </style>');
				window.top.HelloSkinME(0);//Publisher script to turn off site side reskin
				
} else if (window.location.toString().indexOf('dressfinder') > -1) {		
                document.write('<style type=text/css>#cont {width: 976px !important; margin: 0 auto !important;}</style>');
						

} else if (window.location.toString().indexOf('beautybox') > -1) {		
                document.write('<style type=text/css>#wrapper {width: 976px !important;} #roadblock {min-height: 150px !important;}</style>');
									
				
} else if (window.location.toString().indexOf('teenspot') > -1) {
				var currentTime = new Date();
				var month = currentTime.getMonth() + 1;
				var day = currentTime.getDate();
				var year = currentTime.getFullYear();
				if(year==2011 && month<5 && day<25) {
				var site = document.getElementsByTagName('div')[0];
				if (site){site.id = 'site'}
                document.write('<style type=text/css>#site {margin: 0 auto; width:765px !important;}</style>');}
				
} else if (window.location.toString().indexOf('monstrous/forum') > -1) {
	 	var firstDiv = document.getElementsByTagName('div')[0]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 1000px !important;background-color: #000 !important} </style>');
				 
				 } else if (window.location.toString().indexOf('monstrous.forum') > -1) {
	 	var firstDiv = document.getElementsByTagName('div')[0]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 1000px !important;background-color: #000 !important} </style>');
	            	
	            	
				
} else if (window.location.toString().indexOf('monstrous') > -1) {
				
                document.write('<style type=text/css>#rt-page-background {margin: 0 auto !important; width: 990px !important} </style>');
				
				
				
} else if (window.location.toString().indexOf('theblemish') > -1) {
                document.write('<style type=text/css>#skin {margin:0 auto !important; width:975px !important;</style>');
				
				
} else if (window.location.toString().indexOf('limelife') > -1) {
				var aoTargetID="base";
				document.write('<style type=text/css>#base {margin:0 auto !important; background:none !important;</style>');
                		
		//Per Jessie Macintosh, 10/31/2012		
} else if (window.location.toString().indexOf('slashfilm') > -1) {
				var aoTargetID="adskin";
				//document.write('<style type=text/css>#topbar {background-color: #000 !important; margin-bottom: 20px}#header, .banner, .banner h1, .banner h2{background:none !important}</style>');
				//document.write('<style type=text/css>@media only screen and (min-width: 1000px){#adskin {margin: 0 auto; width: 1098px !important;}#topbar {background-color: #000 !important;}#header, .banner, .banner h1, .banner h2{background:none !important}}</style>');
				window.parent.document.getElementsByTagName("head")[0].innerHTML += '<style type=text/css>@media only screen and (min-width: 1000px){#adskin {margin: 0 auto; width: 1098px !important;}#topbar {background-color: #000 !important;}#header, .banner, .banner h1, .banner h2{background:none !important}}</style>';
                
			
				// Cinemablend - 10/9/14
} else if (window.location.toString().indexOf('cinemablend') > -1) {
                 document.write('<style type=text/css>#section-body, .zone.zone-advertisement.grid-wrapper {width: 1000px;margin: 0 auto;} </style>');
				
				
} else if (window.location.toString().indexOf('chud') > -1) {		
                document.write('<style type=text/css>#main {margin: 0 auto; width: 1000px !important; background-color:#000 !important} #content {margin-left: 30px} #sidebar {margin-right: 30px}</style>');
								
// 02/22/2013
} 


 else if (window.location.toString().indexOf('x17online') > -1) {		
                //document.write('<style type=text/css>#container {margin-top: 148px !important;left:36px !important} </style>');
				document.write('<style type=text/css>#container {width: 1087px !important;} </style>');
				
/*				
} else if (window.location.toString().indexOf('x17online') > -1) {		
                document.write('<style type=text/css>#container {margin-top: 430px !important; padding-top:148px !important; left: 36px} #topBox {margin-top: -420px !important} img#clickable, img#clickable2, img#topCap {display:none !important;} #top_banner {z-index: 99 !important; } #main, #rightcol {margin-top: -250px !important;background-color: #fff !important} </style>');
*/				
				
/*				} else if (window.location.toString().indexOf('x17online') > -1) {		
                document.write('<style type=text/css>body, #container {margin-top: 215px !important; padding-top:0px !important; left: 36px} #topBox {margin-top: -190px !important} img#clickable, img#clickable2, img#topCap {display:none !important;} #top_banner {z-index: 99 !important; margin-top: -50px !important} </style>');
*/				

// 12/19/2013
} else if (window.location.toString().indexOf('rapbasement') > -1) {		
                document.write('<style type=text/css>.rbheader {left:50% !important; margin-left:-500px !important; width:1000px !important;} #gn {margin:0 auto !important;width:1000px !important;}</style>');
			
} else if (window.location.toString().indexOf('upcominghorrormovies') > -1) {
                document.write('<style type=text/css>#art-main {width:990px !important;margin: 0 auto}</style>');      
								
//Date: 11/19/2015, Updated by: Ignacio Velderrain, Requested by: Mason Chen				
} else if (window.location.toString().indexOf('comingsoon') > -1) {
                //document.write('<style type=text/css>#mainMenu {background: url("http://www.comingsoon.net/images/menu.jpg") repeat scroll 0 0 transparent}</style>');
                //window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>#mainMenu {background: url("http://www.comingsoon.net/images/menu.jpg") repeat scroll 0 0 transparent} #evolve_ad_gpt_widget-9{width: 734px !important; margin-left: auto !important; margin-right: auto !important;}</style>';
						
	
} else if (window.location.toString().indexOf('fashionista101') > -1) {
                document.write('<style type=text/css>#wrapper {width: 1090px !important; margin: 0 auto !important; padding: 0 !important; background-color: #fff !important}</style>');
				
				
} else if (window.location.toString().indexOf('biggamehunt') > -1) {
                document.write('<style type=text/css>#page {width: 960px !important; margin: 0 auto !important}</style>');
					
				
				
				
} else if (window.location.toString().indexOf('nodakoutdoors') > -1) {
                document.write('<style type=text/css>body {width: 100% !important; margin: 0 auto !important}</style>');
				document.write('<style type=text/css>#wrap {margin: 0 auto !important; left: 0px !important}</style>');
				
				
				//By Eugene Faynberg, 9/14/2012
} else if (window.location.toString().indexOf('maxboxing') > -1) {
                //document.getElementsByTagName('div')[0].id = 'site';
				//document.getElementsByTagName('div')[1].id = 'site';
                document.write('<style type=text/css>#site {margin: 0 auto !important; width:974px !important;} ._affBodyDiv{background-color: transparent !important; width: 1000px !important; margin: 0 auto !important;}</style>');
	            	
				
} else if (window.location.toString().indexOf('fmylife') > -1) {
                document.write('<style type=text/css>body {background-size: auto !important;-moz-background-size: auto !important;}#background {margin: 0 auto; width: 1038px}</style>');
				

// 4-11-14	
} else if (window.location.toString().indexOf('ropeofsilicon') > -1) {
                document.write('<style type=text/css>#container {width: 1000px !important; margin:0 auto;} </style>');
				
				
} else if (window.location.toString().indexOf('uinterview') > -1) {
                document.write('<style type=text/css>#wrap {background-color: #fff !important}</style>');
				
				

} else if (window.location.toString().indexOf('horror-movies') > -1) {
                document.write('<style type=text/css>#Table_01 {background-color: #000 !important}</style>');
				
		
		
		
	
} else if (window.location.toString().indexOf('thecomeupbmx') > -1) {
                  document.write('<style type=text/css>#container {width:1020px !important;margin:0 auto !important;} #content-wrapper {background-color: #fff}</style>');
				

	
} else if (window.location.toString().indexOf('thesandtrap') > -1) {
                document.write('<style type=text/css>#header_wrap, #content_wrap {width:1000px !important;margin:0 auto !important;}</style>');
				
				
				
} else if (window.location.toString().indexOf('cyclingforums') > -1) {
                document.write('<style type=text/css>#main-container {background-image: url(/custom/huddle/cyclingforums/img/bg_tile.v1289597381.png) !important;}</style>');
				
				
				
			
} else if (window.location.toString().indexOf('epicski') > -1) {
                document.write('<style type=text/css>#main-container {background-image: url(/custom/huddle/epicski/img/bg_tile.v1289597381.png) !important;}</style>');
				
				
			
} else if (window.location.toString().indexOf('figures') > -1) {
                document.write('<style type=text/css>#mainContainer {width: 1000px !important; margin: 0 auto !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('suvudu') > -1) {
                document.write('<style type=text/css>#pre-header, #header {background-color: #212121 !important} #brand-wrapper {width: 1000px !important; margin: 0 auto !important}</style>');
				
			
				
} else if (window.location.toString().indexOf('airlockalpha') > -1) {
                            document.write('<style type=text/css> #spotlight,#news,#features,#reviews,#media {background-color: #fff !important} body header nav {left: 0px; padding: 10px; height: 25px; background-color: #888 !important; border-top-left-radius: 4px; border-top-right-radius: 4px; -webkit-border-top-left-radius: 4px; -webkit-border-top-right-radius: 4px; -moz-border-radius-topleft: 4px; -moz-border-radius-topright: 4px; background-image: url(http://airlockalpha.com/sites/default/themes/pe2aa/images/pe2aa_top_bg.jpg); background-position: left top;} body section { background-color: #eee !important; } body header { padding: 10px; } body header nav ul{ margin-top: 5px; } body header nav ul li a:hover{ color: #000; } body header nav p{ margin-top: 5px; } div.top-bg{ z-index: 0; height: 131px; background-position: left top; } body{background-position: center 130px !important}</style>');
				
		
		
			
} else if (window.location.toString().indexOf('weeworld') > -1) {
                document.write('<style type=text/css>#aspnetForm, #frmMain {width: 1018px !important; margin: 0 auto !important}</style>');
				
	
//Date: 01/04/2016, Updated by: Ignacio Velderrain, Requested by: Robert Jo, Ticket No. 77023	
} else if (window.location.toString().indexOf('sandrarose') > -1) {
				 window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> header, .site-top{width: 970px !important; margin: 0px auto !important;} #home_561{margin-left: -121px !important;} h2{width: 519px !important;} .minimized{height: 0px !important;}</style>';
				 //document.write('<style type=text/css>.site-top{width: 1000px !important;margin: 0 auto !important;background-color: black !important;}.container{max-width: 1000px !important;}#main{max-width: 640px !important;}</style>');
				 
	            

//Per Joey Inigo, 3/25/2014
} else if (window.location.toString().indexOf('metacafe') > -1) {
                //document.write('<style type=text/css> #PageWrapper, #HeaderContainer {width: 1000px !important;}</style>');
				document.write('<style type=text/css> #PageWrapper {width: 1000px !important;} #HeaderContainer{left:0;} </style>');
				
				
} else if (window.location.toString().indexOf('mmaweekly') > -1) {
				 document.write('<style type=text/css>#main {background-color: #000 !important;padding: 10px 0 0 !important;}</style>');
	            		
				
				

} else if (window.location.toString().indexOf('straightfromthea') > -1) {
				 document.write('<style type=text/css>#rap {width:1000px !important;margin:0 auto !important;background-color:#6d0110 !important;}</style>');
	            
				
	
	
} else if (window.location.toString().indexOf('nintendolife') > -1) {
						aoTargetID="body-wrap";
				
	            	
	
	
} else if (window.location.toString().indexOf('nsider2') > -1) {
                document.write('<style type=text/css>#header-wrap, #wrap {width:1000px !important;margin:0 auto !important;}#header {width: 1000px !important; padding-left: 0px !important; left: 0px !important;} #topnav {background-color: #000 !important} </style>');
				
				
				
				
} else if (window.location.toString().indexOf('gtchannel') > -1) {
				 document.write('<style type=text/css>#background {display:none !important} #upperPage {width: 988px !important; margin: 0 auto !important }</style>');
	            
				
				
} else if (window.location.toString().indexOf('celebrifi') > -1) {
				 document.write('<style type=text/css>#outerWrapper {background-color: #fff} #outerWrapper, .wrap_sites_we_like_footer clearfix, .wrap_network_footer clearfix, .wrap_informifi_footer clearfix {width:1033px !important;margin:0 auto !important;}</style>');
	            
				
				
	} else if (window.location.toString().indexOf('starwars') > -1) {
				 document.write('<style type=text/css>#topBannerAdContainer, #mainBackground {width:975px !important;margin:0 auto} .leftAdGutter, .rightAdGutter {display:none}</style>');
	            
				

} else if (window.location.toString().indexOf('fadedyouthblog') > -1) {
                document.write('<style type=text/css>#pagewrap {width:1000px !important;margin:0 auto !important;}</style>');
				




} else if (window.location.toString().indexOf('stylemelbourne') > -1) {
                document.write('<style type=text/css>#header {margin:0 auto !important; padding: 20px 0 !important;} #wrapper {background: url("http://stylemelbourne.com/wp-content/themes/stylemelbourne/images/header.jpg") no-repeat scroll center top #fff !important} #last_column {top: 178px !important} .recent-comments {background-color: #fff !important}  </style>');
				


} else if (window.location.toString().indexOf('brownsista') > -1) {
                document.write('<style type=text/css>#wrapper, .horisontalad {width:976px !important;background-color: #fff; padding:0 10px 0 10px !important;}</style>');
				



} else if (window.location.toString().indexOf('bubhub') > -1) {
                document.write('<style type=text/css>#sidepanelinnerleft, #sidepanelinnerright {display:none !important;} #hp_byline img {visibility: hidden !important} </style>');
				


} else if (window.location.toString().indexOf('kidzworld') > -1) {
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> body .background-overlay{display: none !important;}</style>';
                document.write('<style type=text/css> body{margin-top:0 !important;} #game-wrapper {position:relative !important} #background-graffiti, .background-overlay, .christmas-bg, .halloween-bg {display:none !important;}</style>');
				var pubBackground = window.parent.document.querySelectorAll('div.background-overlay')[0];
				pubBackground.style.display = "none";				


} else if (window.location.toString().indexOf('twistynoodle') > -1) {
                document.write('<style type=text/css>.container {background-color: #fff !important; padding-left: 10px !important}</style>');
				
				
//Date: 10/27/2015, Updated by: Ignacio Velderrain, Requested by Mason Chen via Skype				
} else if (window.location.toString().indexOf('gamingbolt') > -1) {
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> /*.top-ad{width: 728px !important; margin: 0 auto !important;}*/ .outer-container{background: white !important;} #home_9245, #ps_11663{display: inline-block !important;}</style>';
				
				} else if (window.location.toString().indexOf('gamingbolt') > -1) {
               				document.write('<script src="http://cdn.assets.evolvemediacorp.com/reskinsjs/center_click.js" type="text/javascript"></scr'+'ipt>');


} else if (window.location.toString().indexOf('horrorbid') > -1) {
                document.write('<style type=text/css>#background {width:1000px !important; margin:0 auto !important; background:none !important;} #content{padding: 0 !important;}</style>');
				
				

} else if (window.location.toString().indexOf('teenidols4you') > -1) {
var firstDiv = document.getElementsByTagName('center')[0]
if (firstDiv) {
    firstDiv.id = 'site'
    document.write('<style type=text/css>#site {width:1000px !important;margin:0 auto !important;}</style>');}
    

// HUDDLER SITES

} else if (window.location.toString().indexOf('denimblog') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('makeuptalk') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('mothering') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important} </style>');
				
				
				
} else if (window.location.toString().indexOf('bestdestinationwedding') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important} #main-menu-area {overflow: hidden !important} #header {background: url(http://www.bestdestinationwedding.com/custom/huddle/bestdestinationwedding/img/bg_tile.v1297448795.png) !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('smokingmeatforums') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important} #header {background: url(http://www.smokingmeatforums.com/custom/huddle/smokingmeat/img/bg_tile.v1297448797.jpg) !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('greenoptions') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important} #header {background: url(http://www.greenoptions.com/custom/huddle/ecohuddle/img/bg_tile.v1297448796.png) !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('blossomswap') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('babyuniversity') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('kickrunners') > -1) {		
                document.write('<style type=text/css>#main-container {background-image: url("/custom/huddle/kickrunners/img/bg_tile.v1289597381.png") !important} #main-container, div.semi-fluid {max-width: 992px !important;}</style>');
				
				
				
} else if (window.location.toString().indexOf('cheftalk') > -1) {		
                document.write('<style type=text/css>#main-container {background-image: url("http://www.cheftalk.com/custom/huddle/cheftalk/img/bg_tile.v1305918898.png") !important; background-position: top !important} #main-container, div.semi-fluid {max-width: 992px !important}</style>');
								
								
				
				
} else if (window.location.toString().indexOf('epicski') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('thesandtrap') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('cyclingforums') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				
//Stripersonline 5-17-11
} else if (window.location.toString().indexOf('stripersonline') > -1) {		
                document.write('<style type=text/css>#main-container, div.semi-fluid {max-width: 992px !important}</style>');
				
				
				

// HUDDLER

			
} else if (window.location.toString().indexOf('eventhub') > -1) {		
                document.write('<style type=text/css>#site_center {overflow:hidden !important}</style>');
				
				
				
} else if (window.location.toString().indexOf('endlessbeauty') > -1) {		
                document.write('<style type=text/css>#body_wrapper {width: 999px !important;margin: 0 auto !important} #page-header {background: url("http://endlessbeauty.com/sites/all/themes/endless_beauty_rev3/images/page-bg.png") !important;}</style>');
							

} else if (window.location.toString().indexOf('japanator') > -1) {		
                //document.write('<style type=text/css>body {width: 100% !important; margin: auto !important;} #wrap {width: 1000px !important; margin: 0 auto !important;}</style>');
				document.write('<style type=text/css> .page-wrapper{width: 1000px;margin: 0 auto;} </style>'); //5-21-15 by Alvaro
						

//Localyte 5-17-11

} else if (window.location.toString().indexOf('localyte') > -1) {		
                document.write('<style type=text/css>#nav {width: 1000px !important; margin: 0 auto !important;} #header, #main, #footer {background-color: #fff !important} #header h1, .byNileGuide {padding-left: 20px !important}</style>');
										


} else if (window.location.toString().indexOf('10best') > -1) {		
                document.write('<style type=text/css>#navigation {width: 1000px !important; margin: 0 auto;} #location-bar {width: 1000px !important; left: 332px !important;} #main-holder {width: 1000px !important; margin: 0 auto !important;} #footer-holder,#header-holder {width: 1000px !important; margin: 0 auto !important;background-color:#fff !important} </style>');
						

} else if (window.location.toString().indexOf('doubleviking') > -1) {		
                document.write('<style type=text/css>body {margin: 0 auto !important}</style>');
								

} else if (window.location.toString().indexOf('shesaved') > -1) {		
                document.write('<style type=text/css>.full_width {width: 1000px !important; margin: 0 auto !important}</style>');
						
				
} else if (window.location.toString().indexOf('endlessbeauty') > -1) {		
                document.write('<style type=text/css>#page {background-color: white !important;}</style>');
									

} else if (window.location.toString().indexOf('hintmag') > -1) {		
                document.write('<style type=text/css>#page {margin: 0 auto !important;} body {width: 100% !important; margin: 0 auto !important;}</style>');
							

} else if (window.location.toString().indexOf('thecouchsessions') > -1) {		
                document.write('<style type=text/css>body {overflow: hidden !important;} </style>');
									

} else if (window.location.toString().indexOf('werd') > -1) {		
                document.write('<style type=text/css>#wrapper {width: 1000px; !important; margin: 0 auto !important;} #main, #footer {background-colo: #262626 !important;} </style>');
										
				
// Vampirerave 3-16-11
} else if (window.location.toString().indexOf('vampirerave') > -1) {
                var firstDiv = document.getElementsByTagName('table')[0]
				var secDiv = document.getElementsByTagName('table')[1]
if (firstDiv) {
    firstDiv.id = 'site1';secDiv.id = 'site2'} 
				 document.write('<style type=text/css>#site1, #site2 {width: 1002px !important;margin: 0 auto !important}</style>');
						

				
// Gamereplays 7-20-11
} else if (window.location.toString().indexOf('gamereplay') > -1) {
               document.write('<style type=text/css>.page_container {max-width: 980px !important;}</style>');
				
				
				
// Trailer Addict 4-9-14
} else if (window.location.toString().indexOf('traileraddict') > -1) {		
				 document.write('<style type=text/css>@media only screen and (min-width: 1324px) { div#main_content{width: 1000px !important;} div.content{width: 670px !important;margin-left: 0;} ul.bxslider li{width:670px !important;}}</style>');
				
	
// CaymanIslands 4-11-11
} else if (window.location.toString().indexOf('caymanislands') > -1) {
               document.write('<style type=text/css>#content-all {width: 1000px; margin:0 auto}</style>');
				
				

// Goldmic 5-2-11
} else if (window.location.toString().indexOf('goldmic') > -1) {
                var firstDiv = document.getElementsByTagName('center')[0]
				var secDiv = document.getElementsByTagName('center')[1]
if (firstDiv) {
    firstDiv.id = 'site1';secDiv.id = 'site2'} 
				 document.write('<style type=text/css>#site1, #site2, .site-obdr {width: 946px !important;margin: 0 auto !important}</style>');
					
				
				
//Date: 02/15/2016, Updated by: Ignacio Velderrain, Requested by: Kaia Benjamin, Ticket no.: 78485
} else if (window.location.toString().indexOf('ninjakiwi') > -1) {
                window.parent.document.getElementsByTagName("head")[0].innerHTML += '<style type=text/css>body {background-position: 50% 58px !important;} /*#cpmstar-site-skin-r, #cpmstar-site-skin-l {display:none !important;} #677105, #71467{display: none !important;}*/</style>';

// Bamkapow 10-24-12
} else if (window.location.toString().indexOf('bamkapow') > -1) {
	            document.write('<style type=text/css>body{width:100% !important;} #gallery{width:1000px; margin: 0 auto !important} #gsImage {display:none !important;};</style>');
				
				
				
// Lyricsspot 4-9-11
} else if (window.location.toString().indexOf('lyricsspot') > -1) {
	var firstDiv = document.getElementsByTagName('div')[0]
    if (firstDiv) {
    firstDiv.id = 'site'
    document.write('<style type=text/css>#site {width:780px !important;margin:0 auto !important;}</style>');}
	            document.write('<style type=text/css>body{width:100% !important; padding: 0 0 0 0 !important} #gallery{width:1005px; margin: 0 auto !important}</style>');
				
				
				
	//King.com 5-16-11
	//Per Joey Inigo, 10/12/2012
} else if (window.location.toString().indexOf('king.com') > -1) {
                //document.write('<style type=text/css> .bottom_drop_shadow_5px,#homeLink_k,#site_header,.main_container_glow,.footer_end_gradient,.container_end_gradient,.sprite_common_elements.item_bottom_sun,.footer_gradient,.sprite_common_elements.item_footer_hills {background-image:none;}.highlight_line.shadow.footer_start_line{display:none;}#site_footer .footer_content_wrapper {background:transparent;}#main_container,#site_footer,.main_container_glow_wrapper,.container_end_gradient {width: 764px;margin: 0 auto;}.container_wrapper {background-color: #FFFFFF;position: relative;margin: 0 auto;z-index: 2;}.main_container_glow_wrapper {margin: 0 auto;width: 764px;z-index: 5;}#footer_end_gradient {background-position: center -797px;height: 4px;margin: 0 auto;width: 764px;}</style>');
		document.write('<style type=text/css>#page_wrapper {width:766px !important;margin:0 auto !important;}</style>');
	function initBackground_ADFC_CUID_() {

		size 	= window.screen.width;
		height 	= window.screen.height;		

		document.getElementById("main_container").style.backgroundImage 		= 'none';
		document.getElementById("main_container").style.backgroundColor 		= 'transparent';
		document.onclick = backGroundClick_ADFC_CUID_;

	}
	backGroundClick_ADFC_CUID_=function(e) {

		var link=aoClickUrl;
		EE=e?e:event;
		if(!EE)return;
		var t=EE.target?EE.target:EE.srcElement;
		if((!t||t.tagName!="BODY"  )  && t.parentNode.tagName!="BODY"  )

			return;
			var ad=window.open(""+link);

	}
         //initBackground_ADFC_CUID_();
				
				

	//Werd.com 5-17-11
} else if (window.location.toString().indexOf('werd') > -1) {
                document.write('<style type=text/css> #main, #footer {background-color: #262626 !important} #wrapper  {width: 1000px !important; margin: 0 auto !important}</style>');
					
				
				
				
//gamingeverything.com 5-17-11
} else if (window.location.toString().indexOf('gamingeverything') > -1) {
                document.write('<style type=text/css> #wrapper {background-image: url ("http://gamingeverything.com/wp-content/themes/GamePro/images/background.png") !important; width: 960px !important; margin: 0 auto !important}</style>');
						
				


//Date: 02/15/2016, Created by: Ignacio Velderrain, Requested by: Dakotah Walker, Ticket no.: 78487
} else if (window.location.toString().indexOf('anime-planet') > -1) {
				window.parent.document.getElementsByTagName('head')[0].innerHTML += "<style type=text/css> #siteHeader, #siteFooter{margin: 0 auto !important; width: 1000px !important;} body{height: auto !important;}</style>";


// Wevolt 6-7-11
} else if (window.location.toString().indexOf('wevolt') > -1) {
	var firstDiv = document.getElementsByTagName('div')[0]
    if (firstDiv) {
    firstDiv.id = 'site'
    document.write('<style type=text/css>#site {width:1058px !important;margin:0 auto !important;}</style>');}
		
	
	
	
// HIT Sites

//Angelinaballerina
} else if (window.location.toString().indexOf('angelinaballerina') > -1) {
                document.write('<style type=text/css> #main_bg {display: none !important}#left_content, #right_content {visibility: hidden !important} </style>');
						
				
// Hit Entertainment

} else if (window.location.toString().indexOf('hitentertainment') > -1) {
	var firstDiv = document.getElementsByTagName('div')[1]
    if (firstDiv) {
    firstDiv.id = 'site'
    document.write('<style type=text/css>#site {width:960px !important;margin:0 auto !important;}</style>');}
		
	

	
//Barney
} else if (window.location.toString().indexOf('barney') > -1) {
                document.write('<style type=text/css> html, body, #content {height:100% !important} </style>');
					
				
//PIngu
} else if (window.location.toString().indexOf('pingu') > -1) {
                document.write('<style type=text/css> html, body {height:100% !important} </style>');
						
				
				
	// END HIT SITES

	
//Elfster
} else if (window.location.toString().indexOf('elfster') > -1) {
                document.write('<style type=text/css> #wrapper {margin: 0 auto !important; width:1000px !important;background-color: #fff !important} </style>');
							



//Moviefanatic
} else if (window.location.toString().indexOf('moviefanatic') > -1) {
                document.write('<style type=text/css> #wrapper {width: 1000px !important; margin: 0 auto !important; background-color: #fff !important; padding-left: 9px; padding-right: 9px} </style>');
						


//ExploreModeling
} else if (window.location.toString().indexOf('exploremodeling') > -1) {
                document.write('<style type=text/css> #aspnetForm {margin: 0 auto !important; width:1000px !important;} </style>');
						


//Celebparasite
} else if (window.location.toString().indexOf('celebparasite') > -1) {
                
				document.write('<style type=text/css> #bg_mid {background: none !important; margin: 0 auto !important; background-color: #fff !important; width: 1002px !important; float: none !important} .page {background-color: #fff !important;} </style>');
				

//CelebUtopia
} else if (window.location.toString().indexOf('celebutopia') > -1) {
                document.write('<style type=text/css> #page {margin: 0 auto !important; width:940px !important;} </style>');
					
				
				
//TheHollywoodGossip (responsive layout)
} else if (window.location.toString().indexOf('hollywoodgossip') > -1) {
                //document.write('<style type=text/css> body {border-top: 0px !important;} #background { margin: 0 auto !important; width: 1010px !important;} </style>');
                document.write('<style type=text/css> @media screen and (min-width: 1024px) { #background { width: 1010px !important; margin: 0 auto !important; } } </style>');
				
				
//TVFanatic
} else if (window.location.toString().indexOf('tvfanatic') > -1) {
                document.write('<style type=text/css> body {border-top: 0px !important;} </style>');
					
				
				
				
//Moveinews
} else if (window.location.toString().indexOf('movienews') > -1) {
                document.write('<style type=text/css> body {border-top: 0px !important;} </style>');
					
				

//Duckhuntingchat
} else if (window.location.toString().indexOf('duckhuntingchat') > -1) {
                document.write('<style type=text/css> body {width: 100% !important;}#wrap {margin: 0 auto !important; }</style>');
					
				
				
//GooseHuntingchat
} else if (window.location.toString().indexOf('goosehuntingchat') > -1) {
                document.write('<style type=text/css> body {width: 100% !important;} #wrap {margin: 0 auto !important;} </style>');
					
//Deerhuntingchat
} else if (window.location.toString().indexOf('deerhuntingchat') > -1) {
                document.write('<style type=text/css> body {width: 100% !important;} #wrap {margin: 0 auto !important;} </style>');

//GTChannel
} else if (window.location.toString().indexOf('gtchannel') > -1) {
                document.write('<style type=text/css> #upperPage {width: 988px !important; margin: 0 auto !important} </style>');
					
				
				
//Indiedb
} else if (window.location.toString().indexOf('indiedb') > -1) {
                var aoTargetID="body";
                document.write('<style type=text/css> #body {width: 980px !important; margin: 0 auto !important} </style>');
								

//VIPMOviesnob
} else if (window.location.toString().indexOf('vipmoviesnob') > -1) {
                document.write('<style type=text/css> #wrapper {width: 950px !important; margin: 0 auto !important} </style>');
					
				

} else if (window.location.toString().indexOf('grouprecipes') > -1) {
                document.write('<style type=text/css>#body_wrap {width: 970px !important; margin: 0 auto !important</style>');
				

//Sub5Zero 
//Per Jessica Van Nice, site update 10/5/2012
} else if (window.location.toString().indexOf('sub5zero') > -1) {
                //document.write('<style type=text/css> #page {width: 980px !important; margin: 0 auto !important} </style>');
				document.write('<style type=text/css> #container {width: 980px !important; margin: 0 auto !important} </style>');
													

//As Per Joey Inigo, Oct 10th 2012
} else if (window.location.toString().indexOf('mrsgrapevine') > -1) {		
                //document.write('<style type=text/css>#container {background-image: url("http://mrsgrapevine.com/wp-content/themes/mrsgrapevine/i/bg.jpg") !important; background-position: top !important; background-repeat: repeat-x !important ;background-color: #222 !important} #rap {width: 990px !important;margin: 0 auto} #footer, #bottom{background-color: #222 !important} .goog-te-gadget {display: none !important}</style>');
				document.write('<style type=text/css>#top {margin: 0 auto; width: 1050px !important;}  #top-link {margin: 0 auto; width: 1050px !important; background-image: url(http://mrsgrapevine.com/wp-content/uploads/2012/03/bg2.jpg);} </style>');						           

} else if (window.location.toString().indexOf('peliblog') > -1) {
	var firstDiv = document.getElementsByTagName('table')[0];
	var secDiv = document.getElementsByTagName('table') [1];
	var thirdDiv = document.getElementsByTagName('table') [2];
    if (firstDiv) {
    firstDiv.id = 'site';
	secDiv.id = 'site2';
	thirdDiv.id = 'site3';
    document.write('<style type=text/css>#site, #site3 {background-color: #fff !important;} #site2 {background-color: #663333 !important;}</style>');}
		
	
				

/*} else if (window.location.toString().indexOf('thekidzpage') > -1) {
	var firstDiv = document.getElementsByTagName('table')[0];
	var secDiv = document.getElementsByTagName('table') [2];
	var thirdDiv = document.getElementsByTagName('div') [1];
    if (firstDiv) {
    firstDiv.id = 'site';
	secDiv.id = 'site2';
	thirdDiv.id = 'site3';
    document.write('<style type=text/css>#site, #site3, #site2 {width: 1000px !important; margin: 0 auto !important} #site3 {background-color: #00ccff !important;}</style>');}
		
*/

//Date: 03/29/2016, Created by: Ignacio Velderrain, Requested by: Marie Vodicska, Ticket no.: 79745
}else if (window.location.toString().indexOf('thekidzpage') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #home_16203{text-align: center !important;} </style>';	
	
} else if (window.location.toString().indexOf('cartoondollemporium') > -1) {
    document.write('<style type=text/css>#site{width: 1000px !important; margin: 0 auto !important}</style>');
			

		// 5/29/2013
} else if (window.location.toString().indexOf('enelbrasero') > -1) {
	document.write('<style type=text/css>#site { float: none !important; margin: 0 auto !important; width: 1000px !important;} #fb-root {clear:both !important}</style>');
	
	
	} else if (window.location.toString().indexOf('musicfeeds') > -1) {
	//document.write('<style type=text/css>#header, #footer {width: 960px !important; margin: 0 auto !important;} </style>');
		
	
	} else if (window.location.toString().indexOf('michael-myers.net/phpBB') > -1) {
		
	document.write('<style type=text/css>.headerwide, .navigationwide {float: none !important; width: 960px !important; margin: 0 auto !important;} body {background-attachment: fixed !important}</style>');
	
	} else if (window.location.toString().indexOf('michael-myers') > -1) {
		window.parent.document.getElementsByTagName('HEAD')[0].innerHTML += '<style type=text/css>.headwrap, .navwrap, .topwrap, .contentwrap, .footerwrap {width: 1000px !important; margin: 0 auto !important; float: none !important; clear:both; background-color: #000;} td.header1{background-color: #000 !important}</style>';

	//Date: 04/01/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.		
	} else if (window.location.toString().indexOf('boxingscene') > -1) {
        //document.getElementsByTagName('center')[0].id = 'site';
        //document.write('<style type=text/css>#site {margin: 0 auto; width:950px;}</style>');
	    window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> body{background-color: rgb(102, 153, 255) !important;} </style>';        	
				
	
	} else if (window.location.toString().indexOf('tokyohive') > -1) {
	document.write('<style type=text/css>#takeover {width: 960px !important; margin: 0 auto !important;} </style>');
		
	
	
	
		
		} else if (window.location.toString().indexOf('hellhorror') > -1) {
	window.parent.document.getElementsByTagName('HEAD')[0].innerHTML += '<style type=text/css>header {width: 1000px !important; margin: 0 auto !important}</style>';
		
	
} else if (window.location.toString().indexOf('animalsbeingdicks') > -1) {
	document.write('<style type=text/css>#wrap {width: 994px !important; margin: 0 auto !important;} </style>');
			

	//Per Jessica Van Nice, Oct/18/2012
	} else if (window.location.toString().indexOf('tarot') > -1) {
	//document.write('<style type=text/css>.backgrounds {display:none !important;} </style>');
		document.write('<style type=text/css>#user-bar-bg {width: 1000px !important; margin: -32px auto 0 auto !important; position: relative !important;} #tarot-nav-ribbon {width: 1000px !important; margin: 0 auto !important;} #tarot-bg-burn {width: 1000px !important; margin: 0 auto -260px auto !important; position: relative !important;} </style>');
	
		//Celebrity-lists
} else if (window.location.toString().indexOf('celebrity-lists') > -1) {
                document.write('<style type=text/css> #nav1-container, #nav2-container, #header-container, #nav-ad-container, .grid_960 {width: 960px !important; margin: 0 auto !important} </style>');
					
				
				
	//Savingslifestyle
} else if (window.location.toString().indexOf('savingslifestyle') > -1) {
                document.write('<style type=text/css> #contentBackground, #rotatorContainer {background: none !important}  #contentBackground{width: 1100px !important; margin: 0 auto !important} body{background-position: center 130px !important} </style>');
				
				
				
	//DamnLOL			
} else if (window.location.toString().indexOf('damnlol') > -1) {
//It looks like this is out of date, 7/19/2012
	document.write('<style type=text/css>body {background-position:center 110px !important;} </style>');
	// Per Michelle Wilken, 7/19/2012
	document.write('<style type=text/css>.flip {width: 980px !important; margin: 0 auto !important;} </style>');		
	
	
// 6/17/2013
} else if (window.location.toString().indexOf('agame') > -1) {
	var bodyID = top.document.getElementsByTagName('body')[0]
	if (bodyID) {
		bodyID.id = 'emcReskinID';
		}
	window.parent.document.getElementById("emcReskinID").style.backgroundPosition="center 113px";
	//window.parent.document.getElementById("page").style.width="910px";
	//window.parent.document.getElementById("page").style.margin="0 auto";
	document.write('<style type=text/css>#emcReskinID {background-position: center 113px !important;} </style>');
	window.parent.document.getElementsByTagName('head')[0].innerHTML += "<style type=text/css> #sgAdScCp160x600{display: none !important;}</style>";
	//Date: 03/29/2016, Updated by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
	window.parent.document.getElementsByTagName('head')[0].innerHTML += "<style type=text/css> .container.outer, .container.inner{width: 1000px !important; margin: 0 auto !important;} #wdg_page_home{background: white !important;}</style>";
	
// 5/6/2014
} else if (window.location.toString().indexOf('fashionmodeldirectory') > -1) {
				 document.write('<style type=text/css>#site1, .OverallContainer {margin: 0 auto !important; width: 1000px !important;} </style>');

				 
} else if (window.location.toString().indexOf('zombiefriends') > -1) {
                var firstDiv = document.getElementsByTagName('center')[0]
				
if (firstDiv) {
    firstDiv.id = 'site1';} 
	document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 826px !important }</style>');
				 
	
} else if (window.location.toString().indexOf('pchgames') > -1) {
	document.write('<style type=text/css>#site_body {margin:0 auto !important; width: 1010px !important; background-color: #fff !important} </style>');
				
	
} else if (window.location.toString().indexOf('candystand') > -1) {
	document.write('<style type=text/css>#site_body {margin:0 auto !important; width: 1010px !important;background: none !important; background-color: #0f1846 !important; } #site_wrapper {top: -100px !important} #home_leaderboard_ad {background: none !important} body {background-position: center 40px !important}</style>');
			
	

} else if (window.location.toString().indexOf('movieweb') > -1) {
	var mwpage = window.location.href;

	if (mwpage == 'http://www.movieweb.com' || mwpage == 'http://www.movieweb.com/' || mwpage == 'http://www.movieweb.com/tv' || mwpage == 'http://www.movieweb.com/tv/' || mwpage == 'http://www.movieweb.com/dvd' || mwpage == 'http://www.movieweb.com/dvd/') { 

	document.write('<style type=text/css>#siteWrap {background-color: #fff; background-image: url("http://media.movieweb.com/ii/mw/img/bg_index.png") !important; background-repeat: repeat-x;margin: 0 auto; width: 1000px;} #headerLogo .logo {background:url("http://media.movieweb.com/ii/mw/img/logo.png") no-repeat !important;height:80px !important;margin:15px 0 0 5px !important;margin-left:0px !important;margin-top:20px !important;width:300px !important;height:76px !important;} #footer {width: 1000px !important; margin: 0 auto !important} </style>');

	} else {

	document.write('<style type=text/css>#siteWrap {background-color: #fff; background-image: url("http://media.movieweb.com/ii/mw/img/bg.png"); background-repeat: repeat-x;margin: 0 auto; width: 1000px;} #headerLogo .logo {background:url("http://media.movieweb.com/ii/mw/img/logo.png") no-repeat !important;height:80px !important;margin:15px 0 0 5px !important;margin-left:0px !important;margin-top:20px !important;width:300px !important;height:76px !important;} #footer {width: 1000px !important; margin: 0 auto !important} </style>');	
	}


	} else if (window.location.toString().indexOf('futureentertainment') > -1) {
	document.write('<style type=text/css>#rt-top, #rt-header, #rt-showcase, #rt-feature, #rt-main, #rt-footer {margin: 0 auto; width: 970px;} </style>');

	//Per Dakotah, made by Alvaro, ticket 79927, 4/6/16
	} else if (window.location.toString().indexOf('whatculture') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style> .visible--app, .app-footer, .app-header{width: 1000px !important;margin: 0 auto !important;} </style>';


} else if (window.location.toString().indexOf('justapinch') > -1) {
	document.write('<style type=text/css>#ad_top {background-position:center 98px} </style>');
	
	
} else if (window.location.toString().indexOf('blueblood.net/boards') > -1) {
	document.write('<style type=text/css>.above_body {margin:0 auto !important; width: 990px !important} body {width: 100% !important} </style>');

	
} else if (window.location.toString().indexOf('karencivil') > -1) {
	document.write('<style type=text/css>#wrap1 {margin: 0 auto !important; width:985px !important; } #home-tv {background-color: #000 !important }</style>');


} else if (window.location.toString().indexOf('movieinsider') > -1) {
	document.write('<style type=text/css>body {background-position: center 150px !important} </style>');
	
} else if (window.location.toString().indexOf('momsrecipe') > -1) {
	document.write('<style type=text/css>#wrap {margin:0 auto !important; width: 1000px !important} body {width: 100% !important} </style>');
		

} else if (window.location.toString().indexOf('uberhumor') > -1) {
	document.write('<style type=text/css>#outer_wrapper {margin:0 auto !important; width: 973px !important} body {width: 100% !important} </style>');


} else if (window.location.toString().indexOf('justapinch') > -1) {
	document.write('<style type=text/css>#ad_top {margin:0 auto !important; width: 1064px !important} body {width: 100% !important} </style>');

	
} else if (window.location.toString().indexOf('dragonballz') > -1) {
	document.write('<style type=text/css>html, body {height: 100% !important} body {width: 100% !important} </style>');
	

} else if (window.location.toString().indexOf('drsearsfamilyessentials') > -1) {
	document.write('<style type=text/css>.wrapper {margin:0 auto !important; width: 960px !important;background-color: #fff !important}  </style>');
	

} else if (window.location.toString().indexOf('rockero') > -1) {
                var firstDiv = document.getElementsByTagName('center')[0]
				 
if (firstDiv) {
    firstDiv.id = 'site'}
	//			var aoTargetID="site";
				document.write('<style type=text/css>#site {background-color: #fff !important; margin: 0 auto !important; width: 776px !important}  </style>');

} else if (window.location.toString().indexOf('lamusica') > -1) {
              	document.write('<style type=text/css>#wrapper {margin: 0 auto !important; width: 1000px !important; background-color: #fff !important}  </style>');
				

//Date: 11/13/2015, Updated by: Ignacio Velderrain, Requested by: Esteban Llanes
//Date: 1/3/2016, Updated by: Nyx Zamora, Requested by: Cecy Montano, Ticket: #76941			
} else if (window.location.toString().indexOf('iwatchstuff') > -1) {
	document.write('<style type=text/css>#header {margin:0 auto !important; width: 992px !important} #network-bar-wrapper {width: 1000px !important; margin: 0 auto !important;} div#home_7433{ position: relative;} </style>');
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>#header {margin:0 auto !important; width: 992px !important} #network-bar-wrapper {width: 1000px !important; margin: 0 auto !important;} div#home_7433{ position: relative;} </style>';
	
	
} else if (window.location.toString().indexOf('thetvaddict') > -1) {
	document.write('<style type=text/css>.site-container{max-width: 1000px !important;} .content{max-width: 600px !important;} .sidebar{max-width: 300px !important;} .home-middle-left, .home-middle-right{width: 290px !important;} </style>');
					
} else if (window.location.toString().indexOf('daemonstv') > -1) {
	document.write('<style type=text/css>.body2 {margin:0 auto !important; width: 980px !important} </style>');
					

} else if (window.location.toString().indexOf('tvrage') > -1) {
	document.write('<style type=text/css>.container_12 {background-image: url("http://www.tvrage.com/_layout_v4/images/template/blue/background.png") !important; background-position: -12px top !important; background-repeat: no-repeat !important; background-color: #000 !important; margin:0 auto !important; width: 980px !important} html {background: none !important} .container_12 {padding-left: 20px !important;}</style>');
	
	
} else if (window.location.toString().indexOf('monstropedia') > -1) {
	document.write('<style type=text/css>#maincontent2 {margin:0 auto !important; width: 1000px !important} </style>');	
	
// 12/2/2013 	
} else if (window.location.toString().indexOf('babyandbump') > -1) {
	 	//var firstDiv = document.getElementsByTagName('div')[12]
		//	if (firstDiv) {
   		//		 firstDiv.id = 'site1';} 
		//        document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 973px !important} </style>');	
				 
} else if (window.location.toString().indexOf('crazythingsparentstext') > -1) {
	document.write('<style type=text/css>#skinbackdrop {display:none !important;} #container-outer {margin: 0 auto !important; width: 990px !important;} #netwrk-menu {width: 990px !important;} #titletag {margin: -23px auto 0 !important; width: 990px !important; position: relative !important;}  </style>');					 

				 
} else if (window.location.toString().indexOf('couponmom') > -1) {
	document.write('<style type=text/css>#Table1 {margin: 0 auto !important;width: 970px !important} </style>');			
	
} else if (window.location.toString().indexOf('twittascope') > -1) {
	document.write('<style type=text/css>.content {background-color: #fff !important} </style>');				
				 				 
} else if (window.location.toString().indexOf('zootoo') > -1) {
	document.write('<style type=text/css>#clouds {display: none !important} #header {background: url("http://static.zootoo.com/media_new/images/elements/chrome.jpg") repeat-x scroll center top transparent !important; left:15px !important; padding-left: 0px !important; }</style>');										 
				 
} else if (window.location.toString().indexOf('blisteredthumbs') > -1) {
	document.write('<style type=text/css>#header_bar {background-image: url("http://www.blisteredthumbs.net/wp-content/themes/BT2/images/layout/bg.jpg") !important;} #header_bar,#sub_link_bar,#container,#footer_wrap {margin: 0 auto; width: 1000px}</style>');	

	// Per Cris Bryant 11/26/2012	
} else if (window.location.toString().indexOf('n4g') > -1) {
                //document.write('<style type=text/css>body {background-position: center 90px !important;}</style>');
				document.write('<style type=text/css> #header-wrap{width: 1000px; margin: 0 auto;}   </style>');

	// 6/6/2013	
} else if (window.location.toString().indexOf('buenamusica') > -1) {
               
                document.write('<style type=text/css> #outer{width:1000px !important; background-color:#FFFFFF !important; padding:0 !important;} #nav, #mainHeader, #mainContent, #extendedfooter{width:1000px !important;}</style>');
				
				
} else if (window.location.toString().indexOf('videoinmybackyard') > -1) {
        
                document.write('<style type=text/css>#shadow {background: none !important; background-color: #fff !important}</style>');

//Date: 11/09/15, Created by: Ana Acosta, Requested by: Esteban Llanes				
} else if (window.location.toString().indexOf('popmatters') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML +='<style type=text/css>.CirclesBackground {display:none !important;} header.fixedHeader.phone-Header {width: 1000px !important;left: 50% !important;margin-left: -500px !important;} .navbar.navbar-default {width: 1000px !important;}</style>';				


} else if (window.location.toString().indexOf('spoilersguide') > -1) {
                document.write('<style type=text/css>.full_width {margin:0 auto !important;width: 1000px !important}</style>');	
				

} else if (window.location.toString().indexOf('celebrityviplounge') > -1) {
	 	var firstDiv = document.getElementsByTagName('center')[0]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 940px !important} #wrapper {background-color: #fff !important} </style>');	

} else if (window.location.toString().indexOf('familiesonlinemagazine') > -1) {
                document.write('<style type=text/css>#wrapper {margin:0 auto !important;width: 1136px !important}#bodyBkgRpt {width:1004px; margin: 0 auto}</style>');	
				
} else if (window.location.toString().indexOf('thehdroom') > -1) {
                //document.write('<style type=text/css>html {background: none !important} #bodyBkgRpt {margin:0 auto !important; width:1000px !important}</style>');	
				document.write('<style type=text/css>body {overflow: auto !important;} #content-wrapper {background-color: transparent !important;}</style>');

} else if (window.location.toString().indexOf('songlyrics') > -1) {
               
                document.write('<style type=text/css>body {background-position: center 103px !important;}</style>');

//modify 1/13/16 by Alvaro for Nallelly request
} else if (window.location.toString().indexOf('tvequals') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>#cb-outer-container {margin:0 auto !important;width: 1000px !important;} </style>';	
				

} else if (window.location.toString().indexOf('mrmovietimes') > -1) {
               
                document.write('<style type=text/css>#google_ads_div_Homepage_Skin {display: none !important;}</style>');



} else if (window.location.toString().indexOf('bgr') > -1) {
                document.write('<style type=text/css>.yui3-g {margin:0 auto !important;width: 1000px !important}</style>');	

} else if (window.location.toString().indexOf('hollywoodlife') > -1) {
                document.write('<style type=text/css>#h1-outer {margin:0 auto !important;width: 990px !important}</style>');	

} else if (window.location.toString().indexOf('babynamewizard') > -1) {
                document.write('<style type=text/css>#top {margin:0 auto !important;width: 980px !important; background:none !important}</style>');	

} else if (window.location.toString().indexOf('rapsearch') > -1) {
                document.write('<style type=text/css>.center {margin:0 auto !important;width: 1050px !important}</style>');	

} else if (window.location.toString().indexOf('hiphop-elements') > -1) {
                var firstDiv = document.getElementsByTagName('table')[3]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1 {background-color:#fff !important} </style>');	

} else if (window.location.toString().indexOf('clickbabynames') > -1) {
                document.write('<style type=text/css>#top-overlay {margin:0 auto !important;width: 960px !important}</style>');	


} else if (window.location.toString().indexOf('choretell') > -1) {
                document.write('<style type=text/css>#top-overlay {margin:0 auto !important;width: 960px !important}</style>');	
				
} else if (window.location.toString().indexOf('clickbabynames') > -1) {
                document.write('<style type=text/css>#top-overlay {margin:0 auto !important;width: 960px !important}</style>');
				
} else if (window.location.toString().indexOf('findersfree') > -1) {
                document.write('<style type=text/css>#header, #header-bottom, #content, #footer {margin:0 auto !important;width: 960px !important}</style>');	
				
} else if (window.location.toString().indexOf('kixandthecity') > -1) {
                document.write('<style type=text/css>#outer-wrap {margin:0 auto !important;width: 960px !important}</style>');
				
//Date: 04/04/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
} else if (window.location.toString().indexOf('buffyguide') > -1) {
	//document.write('<style type=text/css>#ap_container {margin: 0 auto !important; width: 786px !important} </style>');
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #maindiv{background: white !important;} </style>';
				
		//Per Claudia Gutierrez, 11/05/2012
} else if (window.location.toString().indexOf('gateworld') > -1) {
	 	/*var firstDiv = document.getElementsByTagName('center')[0]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 780px !important} </style>');*/
		document.write('<style type=text/css>#wrapper {margin:0 auto !important;width: 758px !important}</style>');
				 

} else if (window.location.toString().indexOf('ovguide') > -1) {
	 	var firstDiv = document.getElementsByTagName('center')[0]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 1000px} </style>');
				 
} else if (window.location.toString().indexOf('bdoutdoors') > -1) {
                //document.write('<style type=text/css> body {background-color: rgb(102, 153, 255) !important;} .backstretch{ display: none !important; } #td-outer-wrap{ width: 1000px !important; margin: 0 auto !important; background-color: #000;} #home_adoop{ display: none !important; }</style>');
				window.parent.document.getElementsByTagName('body')[0].style.backgroundColor = "rgb(102, 153, 255)";
				window.parent.document.getElementsByClassName('backstretch')[0].style.display = "none";
				window.parent.document.getElementById('td-outer-wrap').style.width = "1000px";
				window.parent.document.getElementById('td-outer-wrap').style.margin = "0 auto";
				window.parent.document.getElementById('td-outer-wrap').style.backgroundColor = "#000";
				window.parent.document.getElementById('home_adoop').style.display = "none";
				window.parent.document.getElementsByClassName('td-pb-full-cell')[2].style.left = "-12px";
				window.parent.document.getElementsByClassName('td-pb-row')[13].style.marginLeft = "-3px";
				window.parent.document.getElementsByClassName('td-pb-row')[14].style.marginLeft = "-3px";
				window.parent.document.getElementsByClassName('td-big-grid-post-0')[0].style.marginRight = "0";
				window.parent.document.getElementsByClassName("td-big-grid-post-0")[0].style.width = "520px";
				window.parent.document.getElementsByClassName("wpb_text_column ")[10].style.backgroundPositionX = "-20px";
				window.parent.document.getElementsByClassName("td-pb-full-cell")[0].style.left = "-10px";


} else if (window.location.toString().indexOf('grocerycouponnetwork') > -1) {
	 	var firstDiv = document.getElementsByTagName('div')[1]
			if (firstDiv) {
   				 firstDiv.id = 'site1';}
				 var aoTargetID="site1";
		         document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 1000px !important} </style>');	


} else if (window.location.toString().indexOf('skinnyvscurvy') > -1) {
                //document.write('<style type=text/css>#header, #container, #footer {width:1000px !important;margin:0 auto !important;} body {min-width: 100% !important; max-width: 100% !important} .breadcrumb {margin: 0 auto !important}</style>');
				//document.write('<style type=text/css>#gn-add-banner {max-width:970px !important;margin:0 auto !important;} </style>');
				window.parent.document.getElementsByTagName("head")[0].innerHTML += '<style type="text/css"> body{max-width:100%!important; width:100%!important} #header, .breadcrumb, #gn-add-banner, #container{width:1000px!important; margin: 0 auto!important;} #footer{width:1000px!important; margin: 0 auto!important; padding:0px!important;}</style>';
				
				
} else if (window.location.toString().indexOf('vgreleases') > -1) {
                document.write('<style type=text/css>#aspnetForm {margin:0 auto !important;width: 1003px !important; }</style>');

} else if (window.location.toString().indexOf('totalhair') > -1) {
                document.write('<style type=text/css>#allover {margin:0 auto !important;width: 1280px !important; background-color:#fff !important} #share-this-wrapper {display: none}		</style>');		
				
				
} else if (window.location.toString().indexOf('allkpop') > -1) {
                document.write('<style type=text/css>#wrapper {width: 960px !important; } html{background: none}</style>');				

				
} else if (window.location.toString().indexOf('momswhothink') > -1) {   				
                document.write('<style type=text/css>#rt-page-surround {width: 1000px !important;margin: 0 auto }</style>');				
				

} else if (window.location.toString().indexOf('caughtonset') > -1) {
                document.write('<style type=text/css>#header-area {width: 900px !important;margin: 0 auto }</style>');			


} else if (window.location.toString().indexOf('liveoutdoors') > -1) {
                document.write('<style type=text/css>#header {background-image: url("http://cdn.liveoutdoors.com/templates/liveoutdoors/images/bg.jpg"); background-position: -350px 0 !important}</style>');	
				
				
} else if (window.location.toString().indexOf('haveuheard') > -1) {
                document.write('<style type=text/css>#wrapper, .wrapper {width: 1002px !important;margin: 0 auto !important; float: none !important}</style>');		
				
} else if (window.location.toString().indexOf('kidmango') > -1) {
                document.write('<style type=text/css>#footer, #wrapper-out {width: 1000px !important;margin: 0 auto !important; background-color: #fe9601 !important} #footerWrapper {padding: 180px 0 20px !important; position: relative; left: 3px} </style>');		
				
				
} else if (window.location.toString().indexOf('dressupdream') > -1) {
                document.write('<style type=text/css>#headerWrapper, #content-top-bg {background-color: #5CCCEF !important; position: relative; left: 2px} #footerWrapper {width: 910px; margin: 0 auto}</style>');		


} else if (window.location.toString().indexOf('chacha') > -1) {
                document.write('<style type=text/css>body {background-position: center 16px !important }</style>');					
				
//Date: 04/06/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.				
} else if (window.location.toString().indexOf('elouai') > -1) {
	 	/*var firstDiv = document.getElementsByTagName('center')[0]
		var secDiv = document.getElementsByTagName('center')[1]
		var thirdDiv = document.getElementsByTagName('center')[2]
		var fourthDiv = document.getElementsByTagName('center')[3]
		var fifthDiv = document.getElementsByTagName('center')[4]

			if (firstDiv) {
   				 firstDiv.id = 'site1';
				  secDiv.id = 'site1';
				   thirdDiv.id = 'site1';
				    fourthDiv.id = 'site1';
					 fifthDiv.id = 'site1';}
		         document.write('<style type=text/css>#site1 {margin: 0 auto !important; width: 1000px !important} </style>');*/
	var center = window.parent.document.getElementsByTagName('center')[4];
	if(center){
        center.id = 'site1';
        window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #site1>table>tbody>tr{display: block !important;} </style>';
    }
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> center {width: 1000px !important; margin: 0px auto !important; background: white !important;} td[align*=left]{width: 1000px !important; margin: 0px auto !important; display: initial !important;} </style>';
				 
} else if (window.location.toString().indexOf('sugarscape') > -1) {
                document.write('<style type=text/css>#wrap {background: none !important; width: 950px !important } #outer-body-wrap {background-image:none !important;}</style>');	
				
				
} else if (window.location.toString().indexOf('comicbookmovie') > -1) {
                document.write('<style type=text/css>#aspnetForm {width: 1000px !important;margin: 0 auto; background-color: #103669; }</style>');	
				

} else if (window.location.toString().indexOf('gamerevolution') > -1) {
                
                document.write('<style type=text/css>html {background-color: '+bgcolor+' !important;}</style>');
				
} else if (window.location.toString().indexOf('celebrations') > -1) {
                document.write('<style type=text/css>#header_color_bar {width: 1000px !important;margin: 0 auto !important; } #leaderboard{width: 1000px !important;margin: 0 auto !important; }</style>');	
				
} else if (window.location.toString().indexOf('trueachievements') > -1) {
	//AddSkin(); 
	document.write('<style type=text/css>#divPageHolder, #frm {width: 1000px !important;margin: 0 auto; }</style>');	
	document.write('<style type=text/css>div.allthin {width: 1000px !important; margin: 0 auto; }</style>');	

} else if (window.location.toString().indexOf('fighthype') > -1) {
                document.write('<style type=text/css>.page {width: 970px !important;margin: 0 auto; }</style>');	

//Date: 08/11/2015, Created By: Ignacio Velderrain, Requested By: Crystal Nastor, Ticket no.: 72521	
} else if (window.location.toString().indexOf('hypable') > -1) {
        window.parent.document.getElementsByTagName('body')[0].style.lineHeight = "0px";
		window.parent.document.getElementById('container').style.width = "1000px";
		window.parent.document.getElementById('container').style.margin = "0px auto";
		window.parent.document.getElementById('container').style.backgroundColor = "white";
		window.parent.document.getElementsByTagName('footer')[0].style.width = "1000px";
		window.parent.document.getElementsByClassName('content-container')[0].style.width = "1000px";
		window.parent.document.getElementsByClassName('content-container')[1].style.width = "1000px";
		window.parent.document.getElementsByClassName('content-container')[2].style.width = "1000px";
		window.parent.document.getElementsByClassName('content-container')[3].style.width = "1000px";
		window.parent.document.getElementsByClassName('content-container')[4].style.width = "1000px";
		window.parent.document.getElementsByClassName('text')[0].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[1].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[2].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[3].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[4].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[5].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[6].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[7].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('text')[8].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('small-special')[0].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('small-special')[1].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('small-special')[2].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('small-special')[3].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('small-special')[4].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('full')[0].style.lineHeight = "1em";
		window.parent.document.getElementsByClassName('full')[1].style.lineHeight = "1em";
	
	//Per Laura Krenek, 7/31/2012
} else if (window.location.toString().indexOf('thehappyhousewife') > -1) {
        //document.write('<style type=text/css>div.container {width: 1010px !important;}</style>');	
        document.write('<style type=text/css> #wrap {width: 1000px !important;} #fbbox{float: none !important;}</style>');	

//Date: 09/22/2015, Created by: Alvaro Samaniego, Requested by: Kristen Quan, Ticket no.: 73985				
} else if (window.location.toString().indexOf('aliciasrecipes') > -1) {
	 	/*var firstDiv = document.getElementsByTagName('center')[0]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1, table.head_h1 {margin: 0 auto !important; width: 1000px} </style>');*/ 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>center.not_printable{display: none !important;} body>center{width: 1000px !important;margin: 0px auto !important;}</style>';

} else if (window.location.toString().indexOf('imnotobsessed') > -1) {		
                document.write('<style type=text/css>#main {margin: 0 auto; width: 1030px !important; background-color:#fff !important; overflow:auto !important;} </style>');
				 

} else if (window.location.toString().indexOf('ladyandtheblog') > -1) {		
                //document.write('<style type=text/css>.headersection { margin: 0 auto !important; width: 1005px !important;} #container { width: 1000px !important;} header#header { background-position: -50px 0 !important; width: 995px !important;} #header .headersearch { margin: 3px 0 0 765px !important;} </style>');
                document.write('<style type=text/css> body {background-size: auto auto !important;} #topbar {margin: 0 auto !important;padding: 0 !important;width: 1000px !important;} </style>');

	//As Per Laura Krenek, Aug 28th 2012
} else if (window.location.toString().indexOf('passionforsavings') > -1) {		
                document.write('<style type=text/css>body .header-content-wrapper {margin: 0 auto; width: 1105px !important;} </style>');

	//As Per Jessie Mcintosh, Oct 10th 2012
} else if (window.location.toString().indexOf('ohmythatsawesome') > -1) {		
                document.write('<style type=text/css>#wrapper {margin: 0 auto; width: 1020px !important;} </style>');
				document.write('<style type=text/css>#header {margin: 0 auto; width: 1000px !important;} </style>');

				
	//As Per Janeth Valenzuela, Oct 11th 2012
} else if (window.location.toString().indexOf('techhog') > -1) {		
                document.write('<style type=text/css>#angles {margin: 0 auto; width: 962px !important;} </style>');				
				
//Date: 09/22/2015, Created by: Alvaro Samaniego, Requested by: Kristen Quan, Ticket no.: 73985
} else if (window.location.toString().indexOf('anniesrecipes') > -1) {
	/*var firstDiv = document.getElementsByTagName('center')[0]
			if (firstDiv) {
   				 firstDiv.id = 'site1';} 
		         document.write('<style type=text/css>#site1, table.head_h1 {margin: 0 auto !important; width: 1000px} </style>');
		         document.write('<style type=text/css>#ddr__maindiv {margin: 0 auto !important; width: 1000px} </style>');*/				 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> body>center{width: 1000px !important; margin: 0px auto !important;} center.not_printable {display: none !important;}</style>';
	
// UrbanGhostsMedia 9/21/2012	
} else if (window.location.toString().indexOf('urbanghostsmedia') > -1) {		
                document.write('<style type=text/css> #header, #top-bar, #main-nav, #content {margin: 0 auto; width: 1000px !important;} </style>');
			
			
// PoshGlam 10/9/2012	
} else if (window.location.toString().indexOf('poshglam') > -1) {		
                document.write('<style type=text/css> .header, .header .menu {margin: 0 auto; width: 1020px !important;} </style>');

				
// AceShowBiz 10/16/2012	
} else if (window.location.toString().indexOf('aceshowbiz') > -1) {		
                document.write('<style type=text/css> #topHeader, #Footer, #topLine, #htopLogo, #mmenu, #search, #topLine, #bottomMenu {width: 950px !important; margin: 0 auto;} </style>');
				
// DailyDawdle 10/17/2012	
} else if (window.location.toString().indexOf('dailydawdle') > -1) {		
                document.write('<style type=text/css> #wrapper {margin: 0 auto; width: 950px !important;} </style>');
				
// RetroJunk 10/17/2012	
} else if (window.location.toString().indexOf('retrojunk') > -1) {		
                document.write('<style type=text/css> #rootWrap {margin: 0 auto; width: 1050px !important;} </style>');
				
// Per Carlos Castro 10/22/2012	
} else if (window.location.toString().indexOf('pingg') > -1) {		
                document.write('<style type=text/css> #leaderboard_ad {margin: 0 auto; width: 970px !important;} </style>');

// Per Jessica Van Nice 10/23/2012	
} else if (window.location.toString().indexOf('fabulousbuzz') > -1) {		
                document.write('<style type=text/css> #subfooter {margin: 0 auto; width: 1035px !important;} </style>');

// Per Jessie Mcintosh 10/23/2012	
} else if (window.location.toString().indexOf('wiisworld') > -1) {		
                document.write('<style type=text/css> #header {margin: 0 auto; width: 980px !important;} #shadowup {margin: 0 auto; width: 980px !important;} #shadow {margin: 0 auto; width: 980px !important;} </style>');
				
//Date: 04/05/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
} else if (window.location.toString().indexOf('craftown') > -1) {		
	//document.write('<style type=text/css> #container{ overflow:auto;} </style>');
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #container{background: white !important;} </style>';
				
// ABC News 10/24/2012	
} else if (window.location.toString().indexOf('abcnews') > -1) {		
                document.write('<style type=text/css> #bannerad {width: 1015px !important;} .window {width: 1015px !important; margin: 0 auto !important;} .window .headerBgContainer {width: 1015px !important; left:auto !important;} </style>');
				
// Per Jessie Mcintosh 11/8/2012	
} else if (window.location.toString().indexOf('chaptercheats') > -1) {		
                document.write('<style type=text/css> .headerbg.main {width: 980px !important; margin: 0 auto 15px auto !important;}  </style>');
				
// Per Jessie Mcintosh 11/8/2012	
} else if (window.location.toString().indexOf('zeldadungeon') > -1) {		
                document.write('<style type=text/css> #site {width: 1000px !important; margin: 0 auto !important; overflow: auto !important;}  </style>');
				
// Per Jessie Mcintosh 11/8/2012	
} else if (window.location.toString().indexOf('thetruthaboutguns') > -1) {		
                document.write('<style type=text/css> #access { width: 1000px !important; position:relative !important; margin-left:-500px !important; left:50% !important;} #wrapper {width: 960px !important;}   </style>');
				
// Per Jessie Mcintosh 3/25/2013	
} else if (window.location.toString().indexOf('ebaumsworld') > -1) {		
                document.write('<style type=text/css> body{background-position: 50% 0% !important;} #welcomeMessage, .header, .siteContainer {margin: 0 auto !important; width: 1000px !important;} .highlights, .leaderboardAd {width: 980px !important;} </style>');
	
// Per Laura Krenek 11/14/2012	
} else if (window.location.toString().indexOf('kidskubby') > -1) {		
                document.write('<style type=text/css> #wrap{width: 960px !important;}   </style>');
				
// Per Laura Krenek 11/14/2012	
} else if (window.location.toString().indexOf('weddingsbylilly') > -1) {		
                document.write('<style type=text/css> #wrap{width: 960px !important;}   </style>');

				
} else if (window.location.toString().indexOf('dollarstoremom') > -1) {		
                document.write('<style type=text/css> #head, #main {width:1000px !important; margin:0 auto !important;} #maintop {width:1000px !important; margin:-8px auto 0 !important;} </style>');
	
	
} else if (window.location.toString().indexOf('craftfail') > -1) {		
                document.write('<style type=text/css> #head, #main {width:1000px !important; margin:0 auto !important;} #maintop {width:1000px !important; margin:-8px auto 0 !important;} </style>');

} else if (window.location.toString().indexOf('slantmagazine') > -1) {
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #header-wrapper { width:1000px !important; margin:0 auto !important;} #outer-wrapper {width: 1000px !important; margin:0 auto !important;} div#home_5964 {position: relative !important; display: inline-block;}</style>';	
                	/*var site = document.getElementsByTagName('h1')[0];
					if (site){site.id = 'site'}
					document.write('<style type=text/css> .top-block, .gray_bg, header { margin: 0 auto !important; width: 1000px !important; } .container { width: 960px !important;} </style>');*/
					//window.parent.document.getElementsByClassName('top-block')[0].style.margin = "0 auto";
					//window.parent.document.getElementsByClassName('top-block')[0].style.width = "1000px";
					//window.parent.document.getElementsByClassName('gray_bg')[0].style.margin = "0 auto";
					//window.parent.document.getElementsByClassName('gray_bg')[0].style.width = "1000px";
					//window.parent.document.getElementsByTagName('header')[0].style.margin = "0 auto";
					//window.parent.document.getElementsByTagName('header')[0].style.width = "1000px";
					window.parent.document.getElementById('header-wrapper').style.margin = "0 auto";
					window.parent.document.getElementById('header-wrapper').style.width = "1000px";
					window.parent.document.getElementById('outer-wrapper').style.margin = "0 auto";
					window.parent.document.getElementById('outer-wrapper').style.width = "1000px";
				

} else if (window.location.toString().indexOf('popdust') > -1) {		
                document.write('<style type=text/css> #header-wrap { width: 1040px !important; margin: 0 auto !important;} </style>');
	
//Polygon (responsive layout)
} else if (window.location.toString().indexOf('polygon') > -1) {
                document.write('<style type=text/css> @media screen and (min-width: 1024px) { #homepage_hero, header.site { width: 1100px !important; margin: 0 auto !important; } } </style>');
				document.write('<style type=text/css> #body-wrapper { width: 1100px !important; margin: 0 auto !important;} </style>');
				
//trend911 (12/17/2012)
} else if (window.location.toString().indexOf('trend911') > -1) {
                document.write('<style type=text/css> #topWrap, #navWrap {margin:0 auto !important; width:960px !important;} </style>');

				
//freeonlinegames (12/18/2012)
} else if (window.location.toString().indexOf('freeonlinegames') > -1) {
                document.write('<style type=text/css> #header-container {margin:0 auto !important; padding-top:40px !important; width:980px !important;} .navbar {margin:0 auto !important; width:980px !important;} </style>');

//naturalltcurly (1/7/2013)
} else if (window.location.toString().indexOf('naturallycurly') > -1) {
                document.write('<style type=text/css> #layout-main-topbar-container {margin:0 auto !important; width:1010px !important;} </style>');
				
//soapcentral (1/7/2013)
} else if (window.location.toString().indexOf('soapcentral') > -1) {
                // Igual que el de abajo pero con #nav_soaps    document.write('<style type=text/css> #lbn_area, #lbn_area_02 {margin: 0 -500px !important; right: 50% !important;} #lbn_area, #lbn_area_02, #div_1px, #pushdown, #header, #nav_soaps, #nav_blue, #con_top, #con_middle, #nav_soaps_con {width: 1000px !important;} #div_1px, #pushdown{margin: 0 auto !important;} #lbn{height:auto !important;} #lbn_02{height:auto !important;} </style>');
				document.write('<style type=text/css> #lbn_area, #lbn_area_02 {margin: 0 -500px !important; right: 50% !important;} #lbn_area, #lbn_area_02, #div_1px, #pushdown, #header, #nav_blue, #con_top, #con_middle, #nav_soaps_con {width: 1000px !important;} #div_1px, #pushdown{margin: 0 auto !important;} #lbn{height:auto !important;} #lbn_02{height:auto !important;} </style>');
				//document.write('<style type=text/css> body {background-position: 50% 170px !important;} </style>');

//orgjunkie (1/7/2013)
} else if (window.location.toString().indexOf('orgjunkie') > -1) {
                document.write('<style type=text/css> body {width: 100% !important;} #header {left:50% !important; margin:0 -515px !important;} </style>');
						
//Date: 10/19/2015, Created by: Ana Acosta, Requested by: Kristen Quan, Ticket no.: 74891
} else if (window.location.toString().indexOf('factmonster') > -1) {
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #Wn {width:1000px !important; margin:0 auto !important;} #LAYOUT {background-color: white !important;} #AD-TOPSTRIP {max-width: 1000px !important;} </style>';
                //document.write('<style type=text/css> #Wn {width: 1000px !important; margin: 0 auto !important; background-color: #FFFFFF !important;} </style>');
				//window.parent.document.getElementById('Wn').style.width = "1000px";
				//window.parent.document.getElementById('Wn').style.margin = "0 auto";
				//window.parent.document.getElementsByClassName("topbanner")[0].style.width = "1000px";
				//window.parent.document.getElementsByClassName("topbanner")[0].style.margin = "0 auto";
				//document.write('<style type=text/css> #Wn {background-color: #E3E300 !important; } </style>');

//hubworld (2/28/2014) removed by request of the pub
} else if (window.location.toString().indexOf('hubworld') > -1) {
                //document.write('<style type=text/css> #container {width: 1020px !important;} </style>');
				
//craveonline (2/26/2013) Relaunch 
} else if (window.location.toString().indexOf('craveonline') > -1) {
				document.write('<style type=text/css> #footer{width:980px !important; margin:0 auto!important;} </style>');

				
//bellybelly (1/11/2013) 
} else if (window.location.toString().indexOf('bellybelly') > -1) {
                document.write('<style type=text/css> body { background: filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important; -ms-filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important; filter: none !important; -ms-filter: none !important;} </style>');
				
				
//webkinznewz (2/5/2013) 
} else if (window.location.toString().indexOf('webkinznewz') > -1) {
                document.write('<style type=text/css> #wrapper {width: 1050px !important; margin: 0 auto !important;} #ul-slider-wrap {width: 1050px !important; margin: 0 auto !important;} </style>');
				
//webkinz (2/5/2013) 
} else if (window.location.toString().indexOf('webkinz') > -1) {
                document.write('<style type=text/css> body {height: 100%;} html {height: 100%;}  </style>');
				document.write('<style type=text/css> iframe#webkinz { display: block !important; margin: 0 auto !important; position: relative !important; width: 1140px !important;} div#rightAds { left: 50% !important; margin-left: 240px !important;} </style>');
				
//horrornews (2/25/2013)  //UPDATED FOR GPT 2-5-16 By Alvaro For Dakotah
} else if (window.location.toString().indexOf('horrornews') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML +='<style type=text/css> .background-cover {position: relative;} .wrapper {margin: 0 auto; width: 1000px !important;} header, .breaking-news {width: 1000px !important;} #main-nav ul li {font-size: 12px !important;} #main-content {padding: 20px 10px !important; width: 980px !important;}</style>';
/* 5/5/15 */	window.parent.document.getElementsByTagName('head')[0].innerHTML +='<style type=text/css> .search-block, .social-icons{float: left !important;} .wrapper{max-width:1000px !important;} .wrapper-outer{width:1000px !important;margin: 0 auto !important; position: initial !important;} .content{ width: 65% !important;} .sidebar{width: 35% !important;}</style>';
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> body{background-color: none !important;}</style>';
				
//Per Michelle Wilken blacknaps (3/27/2013) 
} else if (window.location.toString().indexOf('blacknaps') > -1) {
                document.write('<style type=text/css> #art-main {width: 1120px !important;} </style>');
				
//Per Michelle Wilken thehairstyler (3/27/2013) 
} else if (window.location.toString().indexOf('thehairstyler') > -1) {
                document.write('<style type=text/css> #mast {width: 940px !important;  margin: 0 auto !important;} </style>');

// 5/23/2014
} else if (window.location.toString().indexOf('blackgirllonghair') > -1) {
                //document.write('<style type=text/css> body {max-width: 100% !important;}  </style>');
				//document.write('<style type=text/css> .leaderboard{ margin: 0 auto !important; width: 960px !important;} .rap { margin: 0 auto !important; width: 960px !important;} </style>');
				
} else if (window.location.toString().indexOf('dragonballgt') > -1) {
	document.write('<style type=text/css>.mama-wrapper{ width: 960px !important;} </style>');
	
//Per Jessie Macintosh bfftv (4/24/2013) 
} else if (window.location.toString().indexOf('bff.tv') > -1) {
                document.write('<style type=text/css> #page {width: 990px !important; background: #FFF !important;} </style>');
				
//Per Jessie Macintosh (4/24/2013)
} else if (window.location.toString().indexOf('clickonline') > -1) {
                document.write('<style type=text/css> #form1, #outer-wrap {width: 990px !important;  margin: 0 auto !important;} .page {left: 0 !important;} </style>');
				
//Per Paul Hanges (4/24/2013)
//Per Chris Piekarski (11/11/2014)
} else if (window.location.toString().indexOf('sohh') > -1) {
                //document.write('<style type=text/css> body { width:100% !important;} #wrapper {width: 980px !important;  margin: 0 auto !important; background: url(/img/bgColumns.png) repeat-x #c9df84;} </style>');
				//document.write('<style type=text/css> #sb-site {width: 1000px !important;} .row .four.columns {width: 22% !important;} </style>');
				window.parent.document.getElementsByTagName('head')[0].innerHTML += "<style type=text/css>#sb-site{width: 1000px !important;} body{height: auto !important;}.four.columns {width: 22.91489% !important;}#sidebar{ width: 31% !important;}</style>";

//Date: 02/25/2016, Updated by: Ignacio Velderrain, Requested by: Kaia Benjamin, Ticket no.: 78835
} else if (window.location.toString().indexOf('girlsgogames') > -1) {
				//document.write('<style type=text/css> #l-wrapperleft, #l-wrapperright {background:none !important;} </style>');		
				//window.parent.document.getElementById("l-wrapperleft").style.background="none";
				//window.parent.document.getElementById("l-wrapperright").style.background="none";
				window.parent.document.getElementsByTagName('head')[0].innerHTML += "<style type=text/css> .container.outer, .container.inner{width: 1000px !important; margin: 0 auto !important;}#sgAdScCp160x600{display: none !important;}</style>";
				
// 5/16/2013
} else if (window.location.toString().indexOf('latingossip') > -1) {
                document.write('<style type=text/css> #header-banner, #header { width: 980px !important; margin: 0 auto !important; background-color: #FFFFFF !important;} </style>');
				
// 5/16/2013
} else if (window.location.toString().indexOf('gayot') > -1) {
                document.write('<style type=text/css> #container { padding: 0 1px !important; width: 1000px !important;} </style>');
				
				
// 10/10/2014
} else if (window.location.toString().indexOf('nextgenupdate') > -1) {
                document.write('<style type=text/css> #nguheader, .content {margin: 0 auto !important; width: 1000px !important;} .Home_inner_content { width: 963px !important;} </style>');

// 6/10/2013
} else if (window.location.toString().indexOf('contactmusic') > -1) {
                document.write('<style type=text/css> .holder {max-width: 1000px !important} </style>');

// 6/11/2013
} else if (window.location.toString().indexOf('sticksports') > -1) {
                document.write('<style type=text/css> .ros_background {width: 980px !important; margin:0 auto !important;} </style>');
				
// 7/24/13 
} else if (window.location.toString().indexOf('awkwardfamilyphotos') > -1) {
                document.write('<style type=text/css> #header .site-width {background:#BB4039 url("http://static.awkwardfamilyphotos.com/wp-content/themes/afp/media/images/bg-3.jpg") repeat; padding: 1px 0 !important;} #wrapper .site-width {background-color: #483E2F !important;} </style>');
                //document.write('<style type=text/css> #header { background: url(media/images/border-header.png?ver=1.0) #483E2F;} </style>');
				//document.write('<style type=text/css> #wrapper { background: url(media/images/border-horizontal.png #483E2F;} </style>');
				//document.write('<style type=text/css> #footer { background: url(media/images/border-footer.png) #483E2F bottom left;} </style>');
				
// 8/28/2013
} else if (window.location.toString().indexOf('urbanmoms') > -1) {
                document.write('<style type=text/css> #header-second {width: 1024px !important;} body{background-position: 50% 68px !important;}</style>');
				
// 8/28/2013
} else if (window.location.toString().indexOf('ibtimes') > -1) {
                document.write('<style type=text/css> header.page-header {width: 1200px !important; margin: 0 auto !important;} #main-wrapper{width: 1180px !important; background: #FFF !important;}</style>');
				
// 8/29/2013
} else if (window.location.toString().indexOf('mrshappyhomemaker') > -1) {
                document.write('<style type=text/css> #wrap {width: 960px !important; margin: 0 auto !important;} </style>');
				
// 9/10/2013
} else if (window.location.toString().indexOf('makeupandbeautyblog') > -1) {
                document.write('<style type=text/css> #global-header, #global-main-menu-nav, #main {width: 1000px; margin: 0 auto;} </style>');
				window.parent.document.getElementById('global-header').style.width = "1000px";
				window.parent.document.getElementById('global-header').style.margin = "0 auto";
				window.parent.document.getElementById('main').style.width = "1000px";
				window.parent.document.getElementById('main').style.margin = "0 auto";
				window.parent.document.getElementById('global-footer').style.width = "1000px";
				window.parent.document.getElementById('global-footer').style.margin = "0 auto";
	

// 9/19/2013
} else if (window.location.toString().indexOf('dubstep') > -1 || window.location.toString().indexOf('house.net') > -1 || window.location.toString().indexOf('trapmusic') > -1 || window.location.toString().indexOf('moombahton') > -1 || window.location.toString().indexOf('futuregarage') > -1 || window.location.toString().indexOf('glitchhop') > -1 || window.location.toString().indexOf('drumnbass') > -1 ) {
                document.write('<style type=text/css> .navbar, .ad_container_768, .main_container, #footer { margin: 0 auto; width: 1200px !important;} .ad_container_768 {margin: 40px auto 0 !important;} .main_container {overflow: auto !important;} .navbar-fixed-top {top: 48px !important;} </style>');


// 9/10/2013
} else if (window.location.toString().indexOf('playstationgang') > -1) {
                document.write('<style type=text/css> .main-wrapper {width: 980px !important; margin: 0 auto !important;} </style>');
				//Per Dakotah Walker 11/19/2014
				document.write('<style type=text/css> #botstrip {display:none !important;} body {background-position: 50% 108px !important;} </style>');
				

// 10/1/2013
} else if (window.location.toString().indexOf('rumorfix') > -1) {
                document.write('<style type=text/css> #wrap {width: 980px !important; margin: 0 auto !important;} </style>');
				
				
// 10/2/2013
} else if (window.location.toString().indexOf('omgdressup') > -1) {
                document.write('<style type=text/css> #wrap {width: 980px !important; margin: 0 auto !important;background: url(/img/omg/bg.png) center bottom no-repeat #FFF;} </style>');
				
				
// 10/2/2013
} else if (window.location.toString().indexOf('bestboygames') > -1) {
                document.write('<style type=text/css> #bbg_container {width: 1072px !important; margin: 0 auto !important;} </style>');
				
// 10/10/2013
} else if (window.location.toString().indexOf('feminspire') > -1) {
                document.write('<style type=text/css> .topbar {width: 1014px !important; margin: 0 auto !important;} </style>');
				
// 10/10/2013
} else if (window.location.toString().indexOf('cookfoodeat') > -1) {
                document.write('<style type=text/css> body {border: none !important;} </style>');
			
// 10/10/2013
} else if (window.location.toString().indexOf('beautyandstylebeat') > -1) {
                document.write('<style type=text/css> body {border: none !important;} </style>');
				
// 3/25/2014
} else if (window.location.toString().indexOf('pregnancyhumor') > -1) {
                document.write('<style type=text/css> #site {overflow: auto !important; float:none !important; margin:0 auto !important; width:1000px !important;} #nav-wrapper {width: 1000px !important;} </style>');
				
// 10/23/2013
} else if (window.location.toString().indexOf('uplandgameadventures') > -1) {
                document.write('<style type=text/css> #wrapper {margin:0 auto !important; width:1000px !important; background-color: #fff} </style>');
				
//Date: 11/04/2015, Updated by: Ignacio Velderrain, Requested by: Marie Vodicska, Ticket no.: 75473
} else if (window.location.toString().indexOf('nintendoeverything') > -1) {
                //document.write('<style type=text/css> #header { margin: 0 auto !important; width: 980px !important;} #wrapper { background-color: #FFF;} </style>');
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css">body{height: auto !important;}.newsbanner, .navbar, .platform, .main, .footer, .copyright{width: 1000px !important; margin: 0px auto !important;} li a{font-family: "calibri" !important;}.owl-wrapper-outer{max-width: 1000px !important; margin: 0 auto !important;}</style>';
				
// 10/29/2013
} else if (window.location.toString().indexOf('truetrophies') > -1) {
                document.write('<style type=text/css> #frm { margin: 0 auto !important; width: 1000px !important;} </style>');

// 10/29/2013
} else if (window.location.toString().indexOf('glamouroflove') > -1) {
                document.write('<style type=text/css> #page-top-wrapper {margin: 0 auto !important; width: 1000px !important;} #page {width: 1000px !important;}</style>');
				
// 3/7/2014
} else if (window.location.toString().indexOf('digitalspy') > -1) {
                document.write('<style type=text/css>#wrapper {margin: 0 auto !important; width: 1000px !important;} header.main {left:50% !important; margin-left:-500px !important;width: 1000px !important;}</style>');
				
// 10/29/2013
} else if (window.location.toString().indexOf('kidsactivitiesblog') > -1) {
                document.write('<style type=text/css> #wrap {margin: 0 auto !important; width: 1000px !important;} </style>');
				
// 12/10/2013
} else if (window.location.toString().indexOf('hellawella') > -1) {
                document.write('<style type=text/css> #page {margin: 0 auto !important;width: 980px !important;}</style>');

// 12/16/2013
} else if (window.location.toString().indexOf('cakejournal') > -1) {
                document.write('<style type=text/css> .site-container {margin: 0 auto !important;width: 1000px !important; background: #FFF}</style>');
				
/*Date: 07/22/2015
Created by: Ignacio Velderrain
Ticket no.: 71719
Requested by: Crystal Nastor*/
} else if (window.location.toString().indexOf('hollywoodhiccups') > -1) {
                document.write('<style type=text/css>.site-container{max-width: 1000px !important;} li a{padding: 6px 6px 6px 6px !important;} .site-inner{padding: 0px 270px 0px 0px !important;} .widget-wrap{width: 650px !important;} .post-51665, .post-51659, .post-51653, .post-51646, .post-51640{margin-right: 5px !important;} .home-middle .featuredpost .entry{width: 322px !important;} .home-bottom widget area{width: 590px !important;} aside{margin: -3797px -265px 0px 0px !important;} aside .widget-wrap{width: 300px !important;} .wrap .widget-wrap{width: 150px !important;} .footer-widgets-1, .footer-widgets-2, .footer-widgets-3, .footer-widgets-4{width: 0px !important;} .footer-widgets-2{margin-left: 200px !important;margin-right: 0px !important;} .footer-widgets-3{margin-left: 245px !important;} .footer-widgets-4{margin-right: 165px !important;} .site-description{display: none !important;} .wrap center{width: 1200px !important;} .site-footer center{width: 1000px !important;} .site-title{display: block !important; margin-bottom: 0 !important; text-indent: -9999px !important;} .site-title a{background-size: contain !important; display: block !important; height:161px !important; max-width:349px !important;}</style>');

// 1/9/2014
} else if (window.location.toString().indexOf('co-optimus') > -1) {
                document.write('<style type=text/css> #masthead, #nav-bar, #pre-page-content, #page-content {margin: 0 auto !important;width: 1000px !important; } </style>');
				
// 1/14/2014
} else if (window.location.toString().indexOf('realmomsrealreviews') > -1) {
                document.write('<style type=text/css> .daddy-corner {display:none; } </style>');
				
// 1/14/2014
} else if (window.location.toString().indexOf('playmagazine') > -1) {
                document.write('<style type=text/css> #form1 {width: 990px !important; margin: 0 auto !important} </style>');
				
// 9/15/2014 Per Kristen Quan
} else if (window.location.toString().indexOf('galtime') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #site { width:1000px !important; margin:0 auto !important; float:none !important; overflow:auto;} #nav-wrapper {width: 1000px !important;}</style>';
				//window.parent.document.getElementById("WNAffGALTIME").style.width="100%";
				//window.parent.document.getElementById("WNHeader").style.width="980px";
				//window.parent.document.getElementById("WNHeader").style.margin="0 auto";
				//window.parent.document.getElementById("WNFooter").style.width="980px";
				//window.parent.document.getElementById("WNFooter").style.margin="0 auto";
				//window.parent.document.getElementById("WNColsAll").style.width="980px";
				//window.parent.document.getElementById("WNColsAll").style.margin="0 auto";
				//window.parent.document.getElementById("WNColsAll").style.cssFloat="none";
				//window.parent.document.getElementById("WNColsAll").style.display="block";
				//window.parent.document.getElementById("csBottomLeaderboard").style.width="980px";
				//window.parent.document.getElementById("csBottomLeaderboard").style.margin="0 auto";
				//window.parent.document.getElementById("csBottomLeaderboard").style.textAlign="center";
				window.parent.document.getElementById("home_adoop").style.height = "0";

// 3/31/2014
} else if (window.location.toString().indexOf('thelaughingstork') > -1) {
                document.write('<style type=text/css> #site {float: none !important; margin: 0 auto !important; overflow: auto !important; width: 1000px !important;} </style>');
				
//Date: 03/16/2016, Created by: Ignacio Velderrain, Requested by: Serena Pasion, Ticket no.: 79317
} else if (window.location.toString().indexOf('miniclip') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> body{  background-position: 50% 79px !important;} #site-container {width: 1000px !important; margin: 0 auto !important;} header#site-header .container{  margin-top: 0 !important;} #promo-mast {display: none !important;} </style>';
				//takeover={};
				
// 10/20/2014
} else if (window.location.toString().indexOf('stylecaster') > -1) {
				var emcWrapper = window.parent.document.querySelectorAll('div.wrapper')[0];
				emcWrapper.style.width = "1020px";
				emcWrapper.style.margin = "0 auto";
				emcWrapper.atyle.backgroundColor = "#ffffff";				
// 4/28/2014 
} else if (window.location.toString().indexOf('cookrecipesblog') > -1) {
                document.write('<style type=text/css> #main {background-color: #FFF !important;} #header {background: url("img/bg-body.jpg") repeat-x !important;width: 980px !important;} h1#blog-title {left: 0 !important;} </style>');
				
// 4/29/2014 Per Sarah McFarlane
} else if (window.location.toString().indexOf('smartmompicks') > -1) {
                document.write('<style type=text/css> #wrapper {width: 1000px !important; margin: 0 auto !important;} #container {padding: 0 !important;} </style>');
				
// 4/29/2014 Per Sarah McFarlane
} else if (window.location.toString().indexOf('celebritybabycraze') > -1) {
                document.write('<style type=text/css> #layout {background: #FFF;} </style>');
				
// 5/5/2014 Per Sarah McFarlane
} else if (window.location.toString().indexOf('simpledish') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> header {width: 1000px !important;margin: 0 auto !important;} #nav-bar{margin: 0 auto 0.46875rem !important;width: 1000px !important; background: transparent !important;} #nav-bar.fixed {left: 50% !important;margin-left: -500px !important;} @media screen and (max-width: 1000px) { body {background:none !important;} } </style>';

// 5/6/2014 
} else if (window.location.toString().indexOf('konsolekingz') > -1) {
                document.write('<style type=text/css> .backstretch {display: none;} </style>');

//Date: 03/31/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
} else if (window.location.toString().indexOf('beyondblackwhite') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .site-container, .nav-secondary{width: 1000px !important; margin: 0px auto !important;} main{width: 657px !important;} .homemiddle-inner h2{font-size: 14px !important;} </style>';
				
// 5/28/2014 
} else if (window.location.toString().indexOf('onlysp') > -1) {
                document.write('<style type=text/css> #cb-outer-container, .mm-page {margin: 0 auto;width: 1000px;} .backstretch {display: none;} </style>');
				
// 6/26/2014 
} else if (window.location.toString().indexOf('stylecartel') > -1) {
                document.write('<style type=text/css> #outer-wrap {margin: 0 auto;width: 1050px; background: #fff;} </style>');
				
//Fix Per Syma Mian 11/12/2014
} else if (window.location.toString().indexOf('fashionnewbie') > -1) {
                document.write('<style type=text/css> #header, .container.top {margin: 0 auto !important; width: 980px !important;} #navigation_bar { margin: 0 auto !important; width: 980px !important;} </style>');

} else if (window.location.toString().indexOf('topfashionwear') > -1) {
                document.write('<style type=text/css> #header, .container.top {margin: 0 auto !important; width: 940px !important;} #navigation_bar { margin: 0 auto !important; width: 980px !important;} </style>');
				
} else if (window.location.toString().indexOf('fashionscope') > -1) {
                document.write('<style type=text/css> #navigation_bar {left: 50% !important; margin-left: -490px !important; width: 980px !important;} .container.top {width: 940px !important;} </style>');
				
} else if (window.location.toString().indexOf('glamourpost') > -1) {
                document.write('<style type=text/css> #navigation_bar {left: 50% !important; margin-left: -490px !important; width: 980px !important;} .container.top {width: 940px !important;} </style>');
				document.write('<style type=text/css> body {background-size: auto !important;} </style>');
				
} else if (window.location.toString().indexOf('kittentoob') > -1) {
                document.write('<style type=text/css> #network-header {left:50% !important; margin:0 0 0 -500px !important; width:1000px !important;} </style>');

//Date: 02/12/2016, Updated by: Ignacio Velderrain, Requested by: Kristen Quan, Ticket no.: 75311
} else if (window.location.toString().indexOf('scarymommy') > -1) {
	//window.parent.document.getElementsByTagName("head")[0].innerHTML += '<style type=text/css> .page-wrapper{width: 1000px !important; margin: 0px auto !important; background: white !important;} .menu-item-37343{margin-left: -84px !important;} .menu-item-36669, .menu-item-36557, .menu-item-44009, .menu-item-88943, .menu-item-88540, .menu-item-72715, .menu-item-72716, .menu-item-72712, .menu-item-65521{margin-left: -20px !important;} /*.primary-content, .sidebar-container{background: white !important;}*/</style>';
	window.parent.document.getElementsByTagName("head")[0].innerHTML += '<style type=text/css> .page-wrapper{width: 1000px !important; margin: 0px auto !important; background: white !important;} .menu-item-36669, .menu-item-36557, .menu-item-44009, .menu-item-88943, .menu-item-88540, .menu-item-72715, .menu-item-72716, .menu-item-72712, .menu-item-65521{margin-left: -20px !important;} #menu-primary-navigation-bar{margin: auto 0px auto 0px !important; padding-left: 10px !important;} #menu-primary-navigation-bar a{font-size: 10px !important;}</style>'; 

// 8/7/2014 
//Per Serena Passion 1/20/2015
} else if (window.location.toString().indexOf('cheatcc') > -1) {
                //document.write('<style type=text/css> #body, .header-container {width: 1000px !important; margin: 0 auto !important;} </style>');
				//document.write('<style type=text/css> #header {width: 1000px !important; margin: 0 auto !important;} </style>');
				//document.write('<style type=text/css> body {background-position: 50% 58px !important;} #body{background: none !important; width: 1007px !important; margin: 0 auto !important;} </style>');
				//document.write('<style type=text/css> #body,#containerHeader,.site-width,.header-container,.body-wrapper,#container,#header { width: 1000px !important; margin: 0 auto !important;} #mainContent{width: 665px !important;} .body-content{width: 675px !important;} .search-box .searchButton {margin-left: 0px !important;} </style>');
				document.write('<style type=text/css> #body, .header-container,#header { width: 1000px !important; margin: 0 auto !important;} .search-box .searchButton {margin-left: 0px !important;} .body-content {width: 675px !important;} .site-width{width: 1000px !important;} .main aside{width: 310px !important;}  </style>');
				window.parent.document.getElementById('body').style.width = "1000px";
				window.parent.document.getElementById('body').style.margin = "0 auto";
				if (window.parent.document.getElementById('header')){
				window.parent.document.getElementById('header').style.width = "1000px";
				window.parent.document.getElementById('header').style.margin = "0 auto";
				}
				window.parent.document.getElementsByClassName('header-container')[0].style.width = "1000px";
				window.parent.document.getElementsByClassName('header-container')[0].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('search-box')[0].style.marginLeft = "0px";
				window.parent.document.getElementsByClassName('searchButton')[0].style.marginLeft = "0px";
				// FROM ALVARO FOR MARIE (CHEATCC) TKO MON FEB 15
				window.parent.document.getElementsByTagName('head')[0].innerHTML += "<style> .body-wide-banner{text-align:-webkit-center !important} </style>";
				
// 8/7/2014 
} else if (window.location.toString().indexOf('perfectunion') > -1) {
                document.write('<style type=text/css> #pagecontainer{width: 1000px !important; margin: 0 auto !important;} </style>');

				
} else if (window.location.toString().indexOf('fashion-maga-zine') > -1) {
                document.write('<style type=text/css>.bsap_1296592 {width: 1000px !important;margin: 0 auto !important;} .main-container {padding: 11px !important;} .container {padding: 0 !important;} .main-container {padding: 11px !important;}</style>'); 

} else if (window.location.toString().indexOf('americanfashiontv') > -1) {
                document.write('<style type=text/css> #header-wrap, #wrap, #footer-wrap {width: 1000px !important;margin: 0 auto !important;} </style>');

//Date:11/09/2015, Created by: Ana Acosta, Requested by: Karina Castillo, Ticket no.: 75585		
} else if (window.location.toString().indexOf('puckermob') > -1) {
window.parent.document.getElementsByTagName('head')[0].innerHTML +='<style type=text/css>#nav_bar_header{width: 1000px !important; margin: auto !important; display: list-item !important; position: inherit !important} .container{width: 1000px !important} #puc-articles{ max-width: 587px;}.fixed-width-sidebar{width: 489px;margin-right: 13px;}#topbar-container {margin-right: 8.7rem !important;}#main{max-width: 1000px !important;background-color: #fff !important;}#top-banner, #nav-bar, #header-ad { width:1000px !important; margin:0 auto;} .fixed {left: 50% !important; margin-left: -500px !important;} </style>';
				// 4/3/15
				//document.write('<style type=text/css> #super-banner {width:1000px !important; margin: 0 auto !important;} #main{width: 1000px !important; background-color: #fff !important;} #puc-articles{max-width:590px !important;} </style>');
				
//Date: 09/11/2015, Created by: Ana Acosta, Requested by: Crystal Nastor, Ticket no.: 73605	
} else if (window.location.toString().indexOf('fashionbombdaily') > -1) {
                //document.write('<style type=text/css> #wrapper{width: 1000px !important;margin: 0 auto !important;background: white !important;}.medium-9{width: 60% !important;} .slick-initialized .slick-slide{width: 570px !important;} .vc_col-sm-4{padding-left: 0px !important;padding-right: 0px !important;} .medium-3{width: 35% !important;} .wp-pagenavi span{font-size: 14px !important;} </style>');
				window.parent.document.getElementsByTagName("head")[0].innerHTML += '<style type=text/css> #wrapper{width: 1000px !important;margin: 0 auto !important;background: white !important;}.medium-9{width: 60% !important;} .slick-initialized .slick-slide{width: 570px !important;} .vc_col-sm-4{padding-left: 0px !important;padding-right: 0px !important;} .medium-3{width: 35% !important;} .wp-pagenavi span{font-size: 14px !important;} </style>';
// 9/10/2014			
} else if (window.location.toString().indexOf('puppytoob') > -1) {
                document.write('<style type=text/css> #network-header {margin: 0 auto !important;width: 1000px !important;} </style>');
				
//Date: 04/05/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
} else if (window.location.toString().indexOf('celebritytoob') > -1) {
    window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #site-navigation{width: 1000px !important; margin: 0px auto !important;} #page{background: white !important;} .sticky-ad{display: none !important;} </style>';
				
// 9/10/2014			
} else if (window.location.toString().indexOf('tvovermind') > -1) {
                document.write('<style type=text/css> #network-header {margin: 0 -500px 0 !important; width: 1000px !important; left:50% !important;} </style>');

// 9/25/2014				
} else if (window.location.toString().indexOf('cherylstyle') > -1) {
                //document.write('<style type=text/css>@media screen and (min-width: 1030px){ .mm-page {width: 1000px !important; margin: 0 auto !important; background-color:#fff;} body.home .page-container {width: 1000px !important;} .site-header {margin-top: 20px !important;} body.home .widget_cherylstyle_slider {width: 680px !important;} #menu-main-menu li a {font-size: 38px !important;} .navbar-primary li {font-size: 18px !important;} .footer-widgets .footer-widgets-4 {width: 33% !important;} }</style>');
				document.write('<style type=text/css>.mm-page {background:#FFF;width: 1200px;margin: 0 auto;}</style>');

//Date: 04/06/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
} else if (window.location.toString().indexOf('evilbeetgossip') > -1) {
    //document.write('<style type=text/css> #main_content, .header, .body_bg_img { width: 1066px !important; } #main_content {margin: 0 auto !important;} .header {left: 50% !important; margin: 0 auto 40px -535px !important;} .body_bg_img {left: 50% !important; margin-left: -535px !important;} .ad72890{margin-top: 100px !important;} </style>');
    window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #nav{margin-left: 325px !important; float: left !important;} #header, #main_content{width: 1000px !important; margin: 0px auto !important;} #header{float: none !important;} .body_bg_img{opacity: 0 !important;} #sidebar{margin:0px !important;} .main_content_wrapper{width: 700px !important; margin: 0px 0px 40px 0px !important;} .featured_element{width: 23.39% !important;} #footer{width: 1000px !important; margin: 0px 452px 0px 452px !important;} </style>';

} else if (window.location.toString().indexOf('livingwithpunks') > -1) {
                document.write('<style type=text/css>.site-container {width: 960px;margin: 0 auto; background: #fff;}</style>');
				document.write('<style type=text/css>@media only screen and (min-width: 960px) { .site-inner,.wrap { max-width: 960px;} .content-sidebar-sidebar .content-sidebar-wrap, .sidebar-content-sidebar .content-sidebar-wrap, .sidebar-sidebar-content .content-sidebar-wrap { width: 740px;} .content { width: 530px;} .site-header .widget-area {width: 460px;} .sidebar-content-sidebar .content,.sidebar-sidebar-content .content,.content-sidebar-sidebar .content {width: 400px;}.footer-widgets-1,.footer-widgets-2,.footer-widgets-3 {width: 300px;} .enews-widget {max-width: 460px;width: 100%;} .enews-widget input {font-size: 14px;font-size: 1.4rem;width: 67%;}.enews-widget p {font-size: 16px;font-size: 1.6rem;} .nav-primary .genesis-nav-menu {text-align: center;}.nav-primary .genesis-nav-menu li {background-position: 5px -11px;display: inline-block;margin-bottom: 10px;margin-bottom: 1rem;float: none;}.nav-primary .genesis-nav-menu a {padding: 1px 20px 1px 65px;}.before-content-ad {display: none;} }</style>');
				
//Date: 07/21/2015, Created by: Ignacio Velderrain, Requested by: Crystal Nastor, Ticket no: 71719			
} else if (window.location.toString().indexOf('celebteenlaundry') > -1) {
				document.write('<style type=text/css> .textwidget{width: 1000px !important;margin: 0px auto !important;} .site-container{max-width: 1000px !important;} li a{padding: 6px 6px 6px 6px !important;} .site-inner{padding: 0px 0px 0px 0px !important;} .content{width: 650px !important;} #featured-post-2 article{width: 300px !important;} aside{width: 300px !important;} .sidebar-primary{width: 275px !important;} .footer-widgets-1{margin-right: 0px !important;} .wrap{margin-left: -40px !important;} .more-from-category a{margin: 0px 84px 0px 84px !important;}</style>');

//Date: 01/05/2016, Created by: Ignacio Velderrain, Requested by: Robert Jo, Ticket no.: 77023				
} else if (window.location.toString().indexOf('thegrio') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #branding-wrapper, #page{width: 1000px !important; margin: 0px auto !important;}</style>';
                //document.write('<style type=text/css> #branding-wrapper, #page {width: 1000px !important; margin: 0 auto !important;} </style>');

				
} else if (window.location.toString().indexOf('curlynikki') > -1) {
                window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> body {width:100% !important;} #wrapper{ width: 1000px !important; margin: 0 auto !important;} </style>';
				
} else if (window.location.toString().indexOf('beautyhigh') > -1) {
                document.write('<style type=text/css> .wrapper{ width: 1000px !important; margin: 0 auto !important;} </style>');
				
} else if (window.location.toString().indexOf('dailydead') > -1) {
                document.write('<style type=text/css> .dd-bar, .sticky-wrapper{ width:1000px !important; margin: 0 auto !important; position: initial !important;} </style>');

//Date: 04/01/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
} else if (window.location.toString().indexOf('blackcelebkids') > -1) {
    window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #outer-wrap{width: 1000px !important; margin: 0px auto !important;} </style>';
				
} else if (window.location.toString().indexOf('rantlifestyle') > -1) {
                document.write('<style type=text/css> #inner-header{ width:961px !important;} #container{ width:961px !important; margin: 0 auto !important;} #home-content{ margin: 0 !important;} </style>');

} else if (window.location.toString().indexOf('rantchic') > -1) {
                document.write('<style type=text/css> #inner-header{ width:961px !important;} #container{ width:961px !important; margin: 0 auto !important;} #home-content{ margin: 0 !important;} </style>');
				
} else if (window.location.toString().indexOf('rantsports') > -1) {
                document.write('<style type=text/css> #containers{ width:961px !important; margin: 0 auto !important;} #home-content{ margin: 0 !important;} .navHeader {width: 961px; margin: 24px 0 0 0 !important;} #header-links{position: fixed !important;} .navMenu{margin: 0 !important;} </style>');
				
} else if (window.location.toString().indexOf('rantmovies') > -1) {
                document.write('<style type=text/css> #container{ width:961px !important; margin: 0 auto !important;} #home-content{ margin: 0 !important;} .navHeader {width: 961px; margin: 24px 0 0 0 !important;} #header-links{position: fixed !important;} .navMenu{margin: 0 !important;} .gsc-control-cse{ padding: 0 !important} </style>');

} else if (window.location.toString().indexOf('vampyvarnish') > -1) { 
				document.write('<style type=text/css>#headbar, #header, #body {width: 1000px;margin: 0 auto;}</style>');

} else if (window.location.toString().indexOf('cheezburger') > -1) { 
				document.write('<style type=text/css> .stream-wrapper, #content_stream {background: #e7e7e7 !important;}</style>');		

} else if (window.location.toString().indexOf('edm') > -1) { 
				var bodyID = top.document.getElementsByTagName('body')[0]
				if (bodyID) {
					bodyID.id = 'reskin-enabled';
					bodyID.className = 'reskin-enabled';
				}				
				
} else if (window.location.toString().indexOf('funnydogsite') > -1) { 
				document.write('<style type=text/css>header, .nav-container, .hidden-phone {width: 940px !important; margin: 0 auto !important;} .row{margin-left:0 !important;} </style>');
				
} else if (window.location.toString().indexOf('dogtime') > -1) { 
				//document.write('<style type=text/css> .row {max-width: 1000px !important; margin: 0 auto !important;}</style>');
				
} else if (window.location.toString().indexOf('cattime') > -1) { 
				//document.write('<style type=text/css> .row {max-width: 1000px !important; margin: 0 auto !important;}</style>');
				
				
} else if (window.location.toString().indexOf('autostraddle') > -1) { 
				//document.write('<style type=text/css> #page {width: 1154px !important; margin: 0 auto !important; background: #f3f3f3 !important;} .site-navigation{width: 1154px; } </style>');
				document.write('<style type=text/css> #body{width: 1000px !important} #page {width: 1000px !important; margin: 0 auto !important; background: #f3f3f3 !important; heigth: 17540px !important;} .site-navigation{width: 1000px !important;} .site-title{width: 68% !important;} .site-header h2{line-height: 170% !important; margin: 70px 150px 0 5px !important;} #announcementBar div.textwidget{font-size: 0.857rem !important;} #announcementBar h2#specialAnnouncement{padding: 8px 5px !important;} #leaderboard{width: 1000px !important;} #main{width: 1000px !important;} footer.site-footer{width: 1000px !important;} footer#bottomlinks{width: 1000px !important;} </style>');
				
} else if (window.location.toString().indexOf('africam') > -1) { 
				document.write('<style type=text/css> body{width: 100% !important;} #header, #content, #footer {margin: 0 auto !important;} #ticker { width:1000px !important; margin: 0 auto !important;}</style>');

//Date: 02/19/2016, Created by: Ana Acosta, Requested by: Marie Vodicksa, Ticket no.: 78641
} else if (window.location.toString().indexOf('brucebuffer') > -1) { 
				//document.write('<style type=text/css> #blog {width: 1000px !important; margin: 0 auto !important;} #top {min-height: 102px;width: 1000px !important;margin: 0 auto !important;position: relative !important}</style>');
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> center, #top, #recent-works, #blog, #contact, #foot, #parallax-sections-34, #parallax-sections-35{width: 1000px !important; margin: 0px auto !important;} body{height: auto !important;} .adhome{width: 1000px !important; margin: 0 auto !important;}</style>';
	
//Date: 08/14/2015, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 72585	
} else if (window.location.toString().indexOf('lavozdaily') > -1) { 
				//document.write('<style type=text/css> body{line-height: 0px !important;} .main-container-wrap {width: 1000px !important; margin: 0 auto !important; background-color: white !important;} .entry, .front-view-content, #rss-2, #rss-3{line-height: 1em !important;}</style>');
				//window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> body{line-height: 0px !important;} .main-container-wrap {width: 1000px !important; margin: 0 auto !important; background-color: white !important;} .entry, .front-view-content, #rss-2, #rss-3{line-height: 1em !important;}</style>';
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .main-container-wrap {width: 1000px !important; margin: 0 auto !important; background-color: white !important;} .entry, .front-view-content, #rss-2, #rss-3{line-height: 1em !important;}</style>';
				
} else if (window.location.toString().indexOf('motherhumor') > -1) { 
				document.write('<style type=text/css> #outer-wrap {width: 1172px !important; margin: 0 auto !important;}</style>');	

//Date: 03/28/2016, Updated by: Ignacio Velderrain, Ticket no.: 79689. NOTE: I commented this exception to show Serena Passion how the site looks without it
} else if (window.location.toString().indexOf('thechive') > -1) { 
				//window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .body-inner{width: 1000px !important; margin: 0 auto !important;} .main-column{width: 675px !important;} </style>';
				
} else if (window.location.toString().indexOf('stardoll') > -1) { 
				//Per Paige, removing display:none; by Nyx
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #leaderboardContainer { width: 1000px !important; margin: 0 auto !important;} #totalPageWrapper {width: 1000px !important; display: inherit; margin: 50px auto 0 auto !important;} body {background-position:50% 71px !important;} </style>';
				
} else if (window.location.toString().indexOf('worthly') > -1) { 
				document.write('<style type=text/css> #network-header {max-width:1000px !important; margin: 0 auto !important}</style>');
				
}else if (window.location.toString().indexOf('gameskinny') > -1) { 
				document.write('<style type=text/css> .contentContainer, .header{width:1000px !important; margin: 0 auto !important} .topnav {max-width:980px;} .head-metanav {max-width:250px;} </style>');
				var element1 = window.parent.document.getElementsByClassName("contentContainer");
				var element2 = window.parent.document.getElementsByClassName("header");
				for (var i = 0; i < element1.length; i++) {
					element1 [i].style.width="1000px";
					element1 [i].style.margin="0 auto";
				}
				for (var i = 0; i < element2.length; i++) {
					element2 [i].style.width="1000px";
					element2 [i].style.margin="0 auto";
				}

//TEMPORAL				
}else if (window.location.toString().indexOf('launchpowered') > -1) { 
				//document.write('<style type=text/css> .contentContainer, .header{width:1000px !important; margin: 0 auto !important}</style>');
				
}else if (window.location.toString().indexOf('gamerlaunch') > -1) { 
				document.write('<style type=text/css> #global_wrap  {width:1000px !important; margin: 0 auto !important}</style>');
//Date: 07/31/2015, Created by: Alvaro Samaniego, Ticket no.: 72107, Requested by: Kristen Quan
}else if (window.location.toString().indexOf('infoplease') > -1) { 
				//document.write('<style type=text/css> #home_adoop{height: 0 !important;}</style>');
				window.parent.document.getElementById('home_adoop').style.height = "0px";

				
} else if (window.location.toString().indexOf('doghealth') > -1) { 
				document.write('<style type=text/css> #wrapper {background-color:#FFF !important}</style>');	
				
}else if (window.location.toString().indexOf('onesweetappetite') > -1) { 
				//document.write('<style type=text/css> .site-container  {max-width:1000px !important;} .content{width:650px !important;} .sidebar-primary{float:left !important;} .top-ad{width:1000px !important;} #hellobar_bar{display: none !important} </style>');
				document.write('<style type=text/css> .site-container  {max-width:1000px !important;}  </style>');				
				
				//Date: 09/18/2015, Created by: Alvaro Samaniego, Requested by: Roberto Jo
}else if (window.location.toString().indexOf('parentpreviews') > -1) { 
				window.parent.document.getElementsByTagName('HEAD')[0].innerHTML += '<style type=text/css> .theme_body{width: 1000px !important;	margin: 0 auto;}</style>';	
				
}else if (window.location.toString().indexOf('modernmom') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .site-container{max-width:1000px !important;} .genesis-nav-menu{font-size: 10px !important;} .content{width: 65% !important;} .sidebar{ width: 35% !important;} #text-10 {padding: 0px !important; text-align: center;} .footer-widgets-2, .footer-widgets-3, .footer-widgets-4, .footer-widgets-5, .footer-widgets-6 {width:140px !important;} .footer-widgets{padding: 40px 20px 16px !important;} .title-area{width: 270px !important; padding-left: 0px !important;} .header-widget-area{float: right !important;} </style>';			

//Date: 08/10/2015, Created by: Ignacio Velderrain, Ticket no.: 69131,Requested by: Kristen Quan/				
}else if (window.location.toString().indexOf('everydayfamily') > -1) { 
				//document.write('<style type="text/css">	body{background-position:50% 0 !important;} .content-wrap{max-width:1000px !important; background-color: #fff !important; margin: 0 auto !important;} .off-canvas-wrap{ width: 1000px !important; margin: 0 auto !important;} .logo-wrap{margin-left: 5px !important; width: 200px !important;}</style>');	 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css">	body{background-position:50% 0 !important;} .content-wrap{max-width:1000px !important; background-color: #fff !important; margin: 0 auto !important;} .off-canvas-wrap{ width: 1000px !important; margin: 0 auto !important;} .logo-wrap{margin-left: 5px !important; width: 200px !important;}.left-off-canvas-menu, .right-off-canvas-menu, #sticker-left, #sticker-right{display: none !important;} </style>';

}else if (window.location.toString().indexOf('celebbabylaundry') > -1) { 
				//document.write('<style type=text/css> .site-container{max-width: 1000px !important;} .genesis-nav-menu{font-size: 1px !important;} .content{width: 576px !important;} .footer-widgets-1, .footer-widgets-2, .footer-widgets-3, .footer-widgets-4{ width: 1000px !important; float: left !important;}</style>');
				document.write('<style type=text/css> .site-container{width: 1000px !important;} .nav-primary{margin: 0 !important;} .genesis-nav-menu a {padding: 20px 10px 20px 10px !important;} .site-inner {padding-left: 15px !important;	padding-right: 15px !important;} .content {	width:70% !important;} .sidebar-primary {width: 30% !important;} .footer-widgets {padding: 0 !important;} .footer-widgets-1, .footer-widgets-2, .footer-widgets-3, .footer-widgets-4 {float: left !important;width: 237px !important;margin-left: 10px;margin-right: 0;} </style>');				

//Date: 03/23/2016, Created by: Ignacio Velderrain, Requested by: Marie Vodicska, Ticket no.: 79525				
}else if (window.location.toString().indexOf('destructoid') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #sitewrapper_dtoid{width: 1000px !important; margin: 0px auto !important;} .page-wrapper, .footer-wrapper{width: 1000px !important;margin: 0 auto;} #middle_content-wrapper{background: white !important;} #dtoid_siteheader{background: black !important;} #sitewrapper_dtoid, #middle_content-wrapper{background: white !important;} .smlpost-story p, #postauthor_bio p, #quickpost_limiter, #quickpost_limiter a, .sidebar-subtitle, .bigpost-story, .fp__btn{color: black !important;} .lr-item a, .sr-smlpost a, .smlpost-content a{color: #D20200 !important;} strong{color: #FFF !important; background-image: none !important;} strong i{background: #0d0c0c !important;} #vidBtn{color: black !important; background-color: white !important;} #postauthor_bio p {line-height: normal !important;  color: black !important;}</style>';

//Date: 10/22/2015, Created by: Ana Acosta, Ticket no.: 71841,Requested by: Crystal Nastor/				
}else if (window.location.toString().indexOf('styleblazer') > -1) {
                //window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .fixed{position: relative !important;} #wrapper{width: 1000px !important; margin: 0 auto !important; background-color: white !important;} .widget{    padding: 10px !important;} .sidebar{padding-left: 0px !important;} body{height: auto !important;} </style>';	
				//document.write('<style type=text/css> #bodybg{display: none !important;} body.home .feature {width: 1000px !important;margin: 0 auto !important;} .row {width: 1000px !important;background-color: white !important;}.widget_sb_videos_widget .story{width: 200px !important;}.right{float: left !important;}.sidebar{padding-left: 0px !important;}.header_container{margin: 0 auto !important;width: 1000px !important;}div#dfp-reskin{margin: 0 auto !important;width: 1000px !important;left: 24% !important;margin-left: 0px !important;}footer#footer{background-color: white !important;}aside#subfooter{background-color: white !important;}</style>');	
				
}else if (window.location.toString().indexOf('bismanonline') > -1) { 
				document.write('<style type=text/css>#bmo_siteContainer {width: 970px;margin: 0 auto;overflow: auto;}</style>');

//Date: 03/22/2016, Created by: Ignacio Velderrain, Requested by: Serena Pasion, Ticket no.: 79475. NOTE: I commented this exception to show Serena Passion how the site looks without it				
}else if (window.location.toString().indexOf('theberry') > -1) { 
	//window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>body{background-size: initial !important; } #header, .body-inner{ max-width: 1000px !important; margin: 0px auto !important;} .card-main-item{width: 250px !important;} .card-secondary-items{width: 225px !important;} .standard-card{width: 300px !important;}</style>';
				
}else if (window.location.toString().indexOf('soapoperaspy') > -1) { 
				document.write('<style type=text/css>.site-container{max-width: 1000px !important;} .nav-primary{margin-left: auto !important; margin-right: auto !important;} .genesis-nav-menu a{padding: 16px 6px 16px 14px !important;} main{width: 68% !important;} .sidebar{width: 30% !important;} .footer-widgets-1, .footer-widgets-2, .footer-widgets-3, .footer-widgets-4 {width: 200px !important;}</style>');

}else if (window.location.toString().indexOf('familyfriendlyfrugality') > -1) { 
				document.write('<style type=text/css>.header-image .site-title a {width: 600px;}.footer-widgets {max-width:1000px;} .wrap{max-width:1000px;}.home-bottom .featured-content { width: 45%;}.content { width: 620px;} .sidebar-primary { width: 320px; }  .site-container { max-width:1000px; }</style>');

}else if (window.location.toString().indexOf('lifeasmama') > -1) { 
				document.write('<style type=text/css>#page, .container, .main-container {width: 1000px !important;background-color: #FFF !important;} #page {padding: 0px !important;} #navigation {max-width: 1000px !important;} .secondary-navigation {width: 1000px !important;margin: 0 auto !important;float: none !important;} .article {padding: 0px 1% !important;} .leftSidebar {padding-left: 2% !important;} footer {width: 1000px !important;margin: 0 auto !important;}</style>');

}else if (window.location.toString().indexOf('familyeducation') > -1) { 
				document.write('<style type=text/css>#sponsmast {visibility: hidden !important;}</style>');

}else if (window.location.toString().indexOf('kids-in-mind') > -1) { 
			window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>.header{width:1000px !important;} .logo-links{width: 265px;} .main-logo-1 {width: 265px !important;} .main-logo-2 {margin: 0 15px 0 15px !important;} .section-1{width: 1000px !important;margin: 0 auto !important;} .section-1-two{width: 240px !important;} .mainbodycontainer{width: 1000px !important;} .mainthreecontainer-2{width: 635px !important;} .imagetext{width: 480px !important;} .header .header-ads-1{float: left !important;   margin-left: 5px !important;} .facebook-main-2{width: 255px !important} .iphone-main-2{float: right;} .bottomsectin .part-1 {padding-left: 5px !important; padding-right: 5px !important} </style>';
// LifeBuzz
} else if (window.location.toString().indexOf('lifebuzz') > -1) {		
				 document.write('<style type=text/css>@media only screen and (min-width: 1324px) { #site-header{ width: 1000px; margin: 0 auto; } .container{width: 1000px;} .container group{width: 1000px;}}</style>');

}else if (window.location.toString().indexOf('imperfectparent') > -1) { 
				document.write('<style type=text/css> header {width: 1000px !important; margin: 0 auto;} </style>');

}else if (window.location.toString().indexOf('saiyanisland') > -1) { 
				document.write('<style type=text/css> #header {height: 0px !important;} </style>');

}else if (window.location.toString().indexOf('tomopop') > -1) { 
				document.write('<style type=text/css>.page-wrapper{width: 1000px !important;margin: 0 auto !important} .col-md-8{width: 67%; !important} .sidebar-right{width: 30% !important} </style>');

}else if (window.location.toString().indexOf('redtri') > -1) { 
				document.write('<style type=text/css> .calendar-body{background-color: white !important;}</style>');

}else if (window.location.toString().indexOf('funbrain') > -1) { 
				//document.write('<style type=text/css>#header{width: 908px !important;} #pageContent{width: 982px !important;} #footer{width: 1000px !important;} #footer section.math {margin-left: 100px !important;} #ftlinks {background-size=1000px !important;} .home-features{right: 0 !important;} </style>');

}else if (window.location.toString().indexOf('teachervision') > -1) { 
				document.write('<style type=text/css> #page-wrap{width: 1000px !important;}</style>');

}else if (window.location.toString().indexOf('rottentomatoes') > -1) { 
				document.write('<style type=text/css> .leaderboard_wrapper{height: auto !important;> max-height: 310px;}</style>');
				//Change requested by Dakotah, made by Alvaro 8-17-2015 .
}else if (window.location.toString().indexOf('tvseriesfinale') > -1) { 
				//document.write('<style type=text/css> .site-container{background: transparent !important; width: 1000px !important; margin: 0 auto !important;} .content-sidebar .content{width: 70% !important} .content-sidebar .sidebar{width: 30% !important}</style>');
				
				//CHANGE 12/13/15/2015
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style> .site-container{width: 1000px !important; margin: 0 auto !important;}</style>';
				//PROVITIONAL CSS 1-6-16 Joel
				//window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style> #adbb{display: table !important;}</style>';
				

}else if (window.location.toString().indexOf('petful') > -1) { 
				document.write('<style type=text/css> .off-canvas-wrap {width: 1000px !important; margin: 0 auto !important; background-color: #fff !important;} .body_overlay {display: none !important}</style>');

//Date: 08/18/2015, Created by: Ignacio Velderrain, Requested by: Kristen Quan, Ticket no.: 72181
}else if (window.location.toString().indexOf('pregnantchicken') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML +='<style type=text/css> #canvas-wrapper, #navigation-top, #page-header-wrapper, #navigation-bottom{background: transparent !important;} #canvas{background: white !important;} #topnav{width: 1000px !important; margin: 0px auto !important; background: white !important;} .cw-capture-container{width: 1000px !important;margin: 0px auto !important;} .cw-capture-frame{position: inherit !important;}</style>';

}else if (window.location.toString().indexOf('modernhiker') > -1) { 
				document.write('<style type=text/css> .wrapper{width: 1000px !important;margin: 0 auto !important;}.container{width: 1000px !important;}.container .eleven.columns{width: 700px !important;margin-left: 0 !important;margin-right: 0 !important;}.container .five.columns{width: 300px !important;margin-left: 0 !important;margin-right: 0 !important;}.container .offset-by-one{padding-left: 50px;}.container .four.columns{margin-left:0 !important} .container .columns{margin-right:0 !important} .offset-by-four{padding-left: 230px !important;} .three.columns{float: right !important;}</style>');

}else if (window.location.toString().indexOf('armslist') > -1) { 
				document.write('<style type=text/css> .layout-body{background-color: transparent !important;background-image: none !important;} .layout{background: transparent !important; width: 1000px !important; margin: 0 auto !important;} .account-status a{color: #000;} .body-content{background: #FFF !important;</style>');

//Date: 07/20/2015, Created by: Ignacio Velderrain, Ticket no.: 71607, Requested by: Marie Vodicska
}else if (window.location.toString().indexOf('bikez') > -1) { 
				document.write('<style type=text/css> #container{width: 1000px !important; margin: 0 auto !important;} #adcontainer{width: 1000px !important;margin-left: 450px !important;}</style>');

}else if (window.location.toString().indexOf('fishingbuddy') > -1) { 
				document.write('<style type=text/css> #homepage-rotator, .navigation-container, #page{width: 1000px !important;} .header-container{margin-left: 160px !important;background: transparent !important;box-shadow: none !important;}</style>');

}else if (window.location.toString().indexOf('modernfirearms') > -1) { 
				document.write('<style type=text/css> body{width: 100% !important} #header, #pict-main, #content, #footer{width: 1000px !important;margin: 0 auto !important;background-color:#fff;} #pict-main img {width: 1000px !important} </style>');

}else if (window.location.toString().indexOf('torquelist') > -1) { 
				document.write('<style type=text/css> .layout{width: 1000px !important; margin: 0 auto !important;} </style>');

//Date: 07/21/2015, Created by: Ignacio Velderrain, Ticket no.: 71697, Requested by: Kristen Quan
}else if (window.location.toString().indexOf('inmyownstyle') > -1) { 
				document.write('<style type=text/css>.site-container{width: 1000px !important;} .widget-wrap{margin-right: 20px !important;} aside{float: left !important;}</style>');


//Date: 07/21/2015, Created by: Alvaro Samaniego, Ticket no: 71705, Requested by: Marie vodicska
}else if (window.location.toString().indexOf('mcgamer') > -1) { 
				document.write('<style type=text/css>.off-canvas-wrapper{width: 1000px !important;margin: 0 auto !important;background-color: #fff !important;}.pageContent.noBorderRadius .navTabs{width: 1000px !important;margin: 0 auto !important;} </style>');
				window.parent.document.getElementsByClassName('pageContent')[1].style.width = "1000px";
				window.parent.document.getElementsByClassName('pageContent')[1].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('pageContent')[1].style.backgroundColor = "#fff";
				window.parent.document.getElementsByClassName('pageContent')[2].style.width = "1000px";
				window.parent.document.getElementsByClassName('pageContent')[2].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('pageContent')[2].style.backgroundColor = "#fff";
				window.parent.document.getElementsByClassName('pageContent')[3].style.width = "1000px";
				window.parent.document.getElementsByClassName('pageContent')[3].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('pageContent')[3].style.backgroundColor = "#fff";
				window.parent.document.getElementsByClassName('pageContent')[4].style.width = "1000px";
				window.parent.document.getElementsByClassName('pageContent')[4].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('pageContent')[4].style.backgroundColor = "#fff";
				window.parent.document.getElementsByClassName('pageContent')[8].style.width = "1000px";
				window.parent.document.getElementsByClassName('pageContent')[8].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('pageContent')[8].style.backgroundColor = "#fff";
				window.parent.document.getElementsByClassName('pageContent')[9].style.width = "1000px";
				window.parent.document.getElementsByClassName('pageContent')[9].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('pageContent')[10].style.width = "1000px";
				window.parent.document.getElementsByClassName('pageContent')[10].style.margin = "0 auto";
				window.parent.document.getElementsByClassName('pageContent')[10].style.backgroundColor = "#fff";
				window.parent.document.getElementById('mcgamerMap').style.margin = "100px -1px";
				
//Date: 04/06/2016, Created by: Ignacio Velderrain, Ticket no. 72097, Requested by: Marie Vodicska. NOTE: I updated the exception in the 'test pages updating' process.
}else if (window.location.toString().indexOf('dotabuff') > -1) { 
				//document.write('<style type=text/css> .header-nav-primary, .header-nav-secondary-collection.active{width: 972px !important;margin: 0px auto !important;}.container-inner{background: #222B34 !important;} .container-outer{width: 1000px !important; margin: 0 auto !important;}</style>');		
				//window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .container-outer, #header-nav-secondary-collection-esports, #header-nav-secondary-collection-heroes, #header-nav-secondary-collection-items, #header-nav-secondary-collection-players, #header-nav-secondary-collection-matches{margin: 0px auto !important; width: 1000px !important;} </style>';
				window.parent.window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .container-outer{margin: 0px auto !important; width: 1000px !important; background: #222B34 !important;}</style>';

//Date: 07/24/2015, Created by: Alvaro Samaniego, Ticket no: 71853, Requested by: Marie vodicska
}else if (window.location.toString().indexOf('gunandgame') > -1) { 
				document.write('<style type=text/css> #home_adoop{display: none !important; } #uix_wrapper{width: 1000px !important; margin: 0 auto !important; background-color: antiquewhite !important;}</style>');
				window.parent.document.getElementById('uix_wrapper').style.width = "1000px";
				window.parent.document.getElementById('uix_wrapper').style.margin = "0 auto";
				window.parent.document.getElementById('uix_wrapper').style.backgroundColor = "antiquewhite";
				window.parent.document.getElementById('home_adoop').style.display = "none";

}else if (window.location.toString().indexOf('sportfishingreport') > -1) { 
				//document.write('<style type=text/css> table {width: 1000px !important; margin: 0 auto !important; background-color: #fff; } </style>');
				window.parent.document.getElementsByTagName('table')[0].style.margin = "0 auto";
				window.parent.document.getElementsByTagName('table')[0].style.backgroundColor = "#fff";

}else if (window.location.toString().indexOf('ipsy') > -1) { 
				//document.write('<style type=text/css> html {height: auto !important;} .wrapper {max-width: 1000px !important; } .sticky.desktop{width: 1000px !important;} #home_adoop{display: none !important;}</style>');
				window.parent.document.getElementsByTagName('html')[0].style.height = "auto";
				window.parent.document.getElementsByClassName('wrapper')[0].style.maxWidth = "1000px";
				window.parent.document.getElementsByClassName('sticky')[0].style.width = "1000px";
				window.parent.document.getElementById('home_adoop').style.display = "none";
				window.parent.document.getElementsByClassName('hero')[0].style.height = "400px";
				window.parent.document.getElementsByClassName('hero')[0].getElementsByTagName('img')[0].style.height = "400px";
				
//Date: 07/24/2015, Created by: Ignacio Velderrain, Ticket no.: 71845,Requested by: Crystal Nastor
}else if (window.location.toString().indexOf('laurenconrad') > -1) { 
				document.write('<style type=text/css> html{background-color: transparent !important;} html, body{height: auto !important;} #wrapper{width: 1000px !important;margin: 0px auto !important;} #top, #logo, #nav, #content{width: 1000px !important;}</style>');

//Date: 07/27/2015, Created by: Ignacio Velderrain, Ticket no.: 71847,Requested by: Crystal Nastor
}else if (window.location.toString().indexOf('howtobearedhead') > -1) { 
				document.write('<style type=text/css> .top-header{width: 1000px !important;margin: 0px auto !important;} section{width: 1000px !important;margin: 0px auto !important;background-color: white !important;}</style>');

//Date: 08/05/2015, Created by: Ignacio Velderrain, Ticket no.: 72269,Requested by: Kristen Quan. I updated the test page and the reskin wasn't clickable.
}else if (window.location.toString().indexOf('everydaydishes') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>.mm-page{width: 1000px !important;margin: 0px auto !important;} </style>';

//Date: 08/11/2015, Created by: Ignacio Velderrain, Ticket no.: 72469, Requested by: DakotahDakotah Walker
}else if (window.location.toString().indexOf('filmschoolrejects') > -1) { 
				/*document.write('<style type=text/css> body{line-height: 0px !important;} .site-header-wraper{width: 1000px !important; margin: 0px auto !important;} .bg-color-white{width: 1000px !important;margin: 0px auto !important;background: transparent !important;} section{background: white !important;} #emc_header{width: 1000px !important;margin: 0px auto !important;background: white !important;}</style>');*/
				window.parent.document.getElementsByTagName('HEAD')[0].innerHTML += "<style> .site-header-wraper, .bg-color-white, #main {width: 1000px !important; margin: 0 auto !important; background-color: #fff !important;} </style>";

//Date: 08/14/2015, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 72585
}else if (window.location.toString().indexOf('cocinadaily') > -1) { 
				window.parent.document.getElementsByTagName('HEAD')[0].innerHTML += '<style type=text/css> body{overflow: visible !important;} #header, #wrapper, #footer{width: 1000px !important; margin: 0px auto !important;} </style>';

//Date: 08/14/2015, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 72585
}else if (window.location.toString().indexOf('viajesdaily') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>body {overflow: visible !important;} #header, #wrapper, #footer, center{width: 1000px !important; margin: 0px auto !important;} center{background-color: white !important;} </style>';

//Date: 10/19/2015, Created by: Ana Acosta, Requested by: Kristen Quan, Ticket no.: 73883
}else if (window.location.toString().indexOf('mamapedia') > -1) { 
				//window.parent.document.getElementById('wrap').style.width = "1000px";
				//window.parent.document.getElementById('wrap').style.backgroundColor = "#ffffff";
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .pageHeader{width: 1000px !important; margin: 0 auto !important;}.navbar{ width: 1000px !important; margin: 0 auto !important;} .container{ width: 1000px !important;} footer{margin-top: 0px !important; width: 1000px !important; margin: 0 auto !important;}.row{width: 1000px !important; margin-left: 0px !important;} a img{margin-right: 80px !important;} .searchForm .form-control{width: 500px !important;} #home_adoop, #ros_adoop{line-height: 0 !important;} .nav li a{padding-left: 30px !important;} .row{background-color: #fff !important;} footer .row{background-color: #eee !important;} .pull-right{width: 570px !important;} .pubGrid{margin:0 !important}</style>';


//Date: 04/03/16, Updated by: Ignacio Velderrain, Requested by Marie Vodicska, Ticket no.: 79845
}else if (window.location.toString().indexOf('nesn') > -1) { 
				//window.parent.window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #container, #header{width: 980px !important;} #left-column{width: 570px !important;} #right-column{margin-right: -20px !important;} .nesn-widget-springboard-video{margin-left: 10px !important;} .nesn-widget-native-ad{margin-left: -12px !important;} #footer-sidebar{margin-left: 50px !important;}</style>';
				window.parent.window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #container,  .compact-header{width: 974px !important} #right-column{ width: 300px !important; } #right-column .nesn-widget-springboard-video{ width: 300px !important; } #right-column .twin{ margin-left: 0px !important; }</style>';

//Date: 08/26/2015, Created by: Ignacio Velderrain, Requested by: Ashley Lynch, Ticket no.: 72933
}else if (window.location.toString().indexOf('stupiddope') > -1) { 
				document.write('<style type=text/css> html, body{height: 100vh !important;} #header-wrapper{background: white !important;} #site{float: none !important;width: initial !important;} </style>');
				
//Date: 09/02/2015, Created by: Ana Acosta, Requested by: Susana Cañez, Ticket no.: 73255
}else if (window.location.toString().indexOf('theseattlelesbian') > -1) { 
				document.write('<style type=text/css>.inner-wrapper{margin: 0px auto !important;width: 1000px !important;} #page{background: transparent !important;} .page-outer, .bg-cover {width: 1000px !important;margin: 0px auto !important;}.bg-cover {position: initial !important;} .bdayh-wrap{padding: 0 0 !important;} #featured-main{margin-top: 0px !important;} #main{background-color: white !important;} #header{background-color: white !important;} #topbar{background-color: white !important;}</style>');

//Date: 10/29/2015, Created by: Ignacio Velderrain, Requested by: Marie Vodicska, Ticket no.: 75219
//I updated this exception to temporaly solved the problem with NBA's creatives
}else if (window.location.toString().indexOf('unofficialnetworks') > -1) { 
				//document.write('<style type=text/css> #wrapper{width: 1000px !important;margin: 0px auto !important;}</style>');
				//window.parent.window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>#header-ad iframe{width:728px !important} .sidebar-ad iframe{width:300px !important; height:600px !important;}</style>';
				
//Date: 09/14/2015, Created by: Ana Acosta, Requested by: Serena Pasion, Ticket no.: 73655
}else if (window.location.toString().indexOf('sheknows') > -1) { 
				//document.write('<style type=text/css> .ui-main-container{width: 1000px !important;margin: 0 auto !important;}.ui-header{width: 1000px !important;margin: 0 auto !important;}.ui-backdrop{width: 1000px !important;margin: 0 auto !important;}.social-share{width: 1000px !important;margin: 0 auto !important;right: 0px !important;left: 0px !important;}</style>');
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .ui-main-container{width: 1000px !important; margin: 0 auto !important;} .ui-header{width: 1000px !important; margin: 0 auto !important; position: relative !important;}.ui-backdrop{width: 1000px !important; margin: 0 auto !important;} h5.logo{width: 600px !important; margin-left: 280px !important;} </style>';

//Date: 09/15/2015, Created by: Ana Acosta, Requested by: Serena Pasion, Ticket no.: 73655
}else if (window.location.toString().indexOf('soaps') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #header{width: 1000px !important;margin: 0 auto !important;} #content{width: 1000px !important;background-color: white !important;}.show-bar li{padding: 0 2px 0 8px !important;}#footer{margin-top: 0px !important;width: 1000px !important;margin: 0 auto !important;} </style>';

//Date: 09/15/2015, Created by: Ana Acosta, Requested by: Serena Pasion, Ticket no.: 73655
}else if (window.location.toString().indexOf('allparenting') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #doc{ width: 1000px !important; } #navbar{width: 1000px !important;} </style>';

//Date: 09/15/2015, Created by: Ana Acosta, Requested by: Serena Pasion, Ticket no.: 73655
}else if (window.location.toString().indexOf('pregnancyandbaby') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #doc{ background-color: white !important; } </style>';

//Date: 09/15/2015, Created by: Ana Acosta, Requested by: Serena Pasion, Ticket no.: 73655
}else if (window.location.toString().indexOf('drinksmixer') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .wrapper{ width: 1000px !important; } </style>';
				
//Date: 09/15/2015, Created by: Ana Acosta, Requested by: Serena Pasion, Ticket no.: 73655
}else if (window.location.toString().indexOf('fabulousfoods') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #doc {background-color: white !important;} #sidebar{ margin-right: 5px !important;} </style>';

//Date: 10/22/2015, Created by: Ana Acosta, Requested by: Robert Jo, Ticket no.: 74991
}else if (window.location.toString().indexOf('gamesgames') > -1) {
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .outer{width: 1000px !important; margin: 0px auto !important;} #sgAdScCp160x600 {display: none !important}</style>';
				//document.write('<style type=text/css> .outer{width: 1000px !important; margin: 0px auto !important;} </style>');
				
//Date: 09/18/2015, Created by: Ana Acosta, Requested by: Nallely Nunez, Ticket no.: 73841
}else if (window.location.toString().indexOf('scribol') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .page{ width: 1000px !important; margin: 0 auto !important; background-color: white !important;} .site-header{width: 1000px !important; position: relative !important;} .title-bar{ width: 1000px !important;margin: 0 auto !important; position: relative !important;} .social-symbol:before{font-size: 50% !important;} </style>';

//Date: 09/21/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 73945
}else if (window.location.toString().indexOf('soloboxeo') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .main-wrap{ width: 1000px !important; margin: 0 auto !important; background-color: #ffcd22 !important;} .wrap{width: 950px !important;} div#main-head{width: 1000px !important;padding: 0 !important;} </style>';

//Date: 09/21/2015, Created by: Alvaro Samaniego, Requested by: Dakotah and Joey Inigo, Ticket no.: 73911				
}else if (window.location.toString().indexOf('aintitcool') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .container{ width: 1000px !important; margin: 0 auto !important; }</style>';

//Date: 09/22/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 73997				
}else if (window.location.toString().indexOf('futbolcentroamerica') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .mainContent .header .navigationBar{ width: 1000px !important; margin: 0 auto !important;} </style>';

//Date: 09/24/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74099				
}else if (window.location.toString().indexOf('marcamotor') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #contenedor{   width: 1000px !important;margin: 0 auto !important;}.corp-barra{ width: 1000px !important;margin: 0 auto !important;} #privacyPolicyLayerN{ width: 1000px !important; margin: 0 auto !important; padding: 0 !important;} </style>';

//Date: 09/25/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74099				
}else if (window.location.toString().indexOf('telva') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .wrap{ width:1000px !important;margin: 0 auto !important;background-color:white !important;} #privacyPolicyLayerN{width:1000px !important;margin:0 auto !important; padding: 0 !important;} #header_general{width:1000px !important;} </style>';

//Date: 09/25/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74099				
}else if (window.location.toString().indexOf('yodona') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .site-header{width: 1000px !important; margin: 0 auto!important;}.contenedor{width: 1000px !important;}.contenido{padding:0 !important;}.cabecera-seccion{ width: 1000px !important; margin: 0 !important;}.fixed-down{position: absolute !important;} .fixed-up{position: absolute !important;}#privacyPolicyLayerN{width: 1000px !important;margin: 0 auto !important;}</style>';

//Date: 09/25/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74099				
}else if (window.location.toString().indexOf('mujerhoy') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> body{ padding-top: 0 !important;} form{ width: 1000px !important; margin: 0 auto !important;} .identity-noticebar{width: 1000px !important;} #doc5{width: 1000px !important; min-width: 1000px !important;} html{ background: transparent !important; }#ft .info.cf.info-links{ width: 1000px !important; margin: 0 auto !important; background-color: white !important; bottom: -32px !important; } #ft{margin-bottom:0 !important;} </style>';

//Date: 09/25/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74099				
}else if (window.location.toString().indexOf('zeleb') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #region-banners{width: 1000px !important; margin-top: 0px !important; padding-left: 0px !important; padding-right: 0px !important;}#region-main{width: 1000px !important; }#zone-main{background-color:white !important; width: 1000px !important; margin: 0 auto !important;}#region-menu{width: 1000px !important; padding-left: 0px !important;padding-right: 0px !important;}.ng-scope{ width: 1000px !important; margin: 0 auto !important;}.slick-slider{ padding-top: 0px !important; margin-bottom: 40px !important;} #zone-menu.stick{position: absolute !important;} .fixed-footer{position: absolute !important;} </style>';

//Date: 09/25/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74101				
}else if (window.location.toString().indexOf('ocholeguas') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #contenedor{background-color: white !important; width: 1000px !important;} .minicabecera{ width: 1000px !important; margin: 0 auto !important; padding-left: 0px !important; padding-right: 0px !important;float: none !important; background-color: white !important;} #privacyPolicyLayerN{width: 1000px !important;margin: 0 auto !important; padding: 0 !important;} footer#pie{ width: 974px !important; background-color: white !important; margin-top: 0px !important;} </style>';

//Date: 09/28/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74101				
}else if (window.location.toString().indexOf('nosotras') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #top-navigation nav{width: 800px !important; font-size: 96% !important;}.et-first, .et-second{width: 435px !important;}.container {width: 1000px !important;}#main-header{ width: 1000px !important;margin: 0 auto !important; background-color: #FAFAFA !important;font-size: 84% !important;}#featured{ width: 1000px; margin: 0 auto !important;}#footer-bottom li{ padding-right: 10px !important;}#footer-bottom ul{padding: 15px !important;} h1{margin-left: 15px !important;} .post-heading{width: 630px !important;}#content{width: 678px !important;}</style>';

//Date: 09/28/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74105				
}else if (window.location.toString().indexOf('deportesdaily') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #wrapper{width: 1000px !important;margin: 0 auto !important;}#header{width: 1000px !important;margin: 0 auto !important;}#footer{width: 1000px !important; margin: 0 auto !important;} center{background-color: white !important;width: 1000px !important; margin: 0 auto !important;} </style>';

//Date: 09/28/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74105				
}else if (window.location.toString().indexOf('chismesdaily') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #wrapper{width: 1000px !important;margin: 0 auto !important;}#header{width: 1000px !important;margin: 0 auto !important;}#footer{width: 1000px !important; margin: 0 auto !important;} </style>';

//Date: 09/28/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 74105				
}else if (window.location.toString().indexOf('mujerdaily') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #wrapper{width: 1000px !important;margin: 0 auto !important;}#header{width: 1000px !important;margin: 0 auto !important;}#footer{width: 1000px !important; margin: 0 auto !important;} center{background-color: white !important;width: 1000px !important; margin: 0 auto !important;} </style>';

//Date: 02/15/2016, Updated by: Ignacio Velderrain, Requested by: Marie Vodicska, Ticket no.: 78489
}else if (window.location.toString().indexOf('twinfinite') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> #site{width: 1000px !important;margin: 0px auto !important;float: none !important;} #body-main-wrap{width: 1230px !important;} .body-main-out{margin-left: auto !important;} .body-main-in{margin-left: auto !important;}	#body-main-cont{max-width: 1000px !important;width: 1000px !important; right: 120px !important;}</style>';

//Date: 10/01/2015, Created by: Alvaro Samaniego, Requested by: Dakotah Walker, Ticket no.: 74339				
}else if (window.location.toString().indexOf('socialunderground') > -1) { 
				window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> .wrapper{max-width: 1000px !important; margin: 0 auto !important;}.container_inner{width: 910px !important;} #social_icons_widget{display: none !important}</style>';

//Date: 10/14/2015, Created by: Ignacio Velderrain, Requested by: Crystal Nastor, Ticket no.: 74757
}else if (window.location.toString().indexOf('newbeauty') > -1) { 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css> body{padding-top: 0px !important;} #header{width: 1000px !important;margin: 0px auto !important; position: relative !important;} span{left: 34px !important;} #body{background: white !important; width: 1000px !important; margin: 0px auto !important;} .beautynews-container{margin-top: 0px !important;}	.home-container{padding-left: 0px !important; padding-right: 0px !important;} .beautynews-item{margin-right:7px !important;} .blog{padding-left: 0px !important; padding-right: 0px !important;} #footer{width: 1000px !important; margin: 0px auto !important;} .home-container .beautynews-item-last img{margin-top: -74px !important;} @-moz-document url-prefix(){.home-container .beautynews-item-last img{margin-top: -54px !important;}}</style>';

//Date: 10/14/2015, Created by: Alvaro Samaniego, Requested by: Serena Pasion, Ticket no.: 74775
}else if (window.location.toString().indexOf('unilad') > -1) { 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style>#nava, .prl-container, .prl-grid{max-width: 1000px !important;margin: 0 auto !important;} .large-teaser-text{max-width: 1000px !important;margin: 0 auto !important;right:initial !important;} .site-wrapper{max-width: 1000px !important;margin: 0 auto !important; background-color: #fff !important}</style>';				

//Date: 10/20/2015, Created by: Ana Acosta, Requested by: Marie Vodicksa, Ticket no.: 74913
}else if (window.location.toString().indexOf('1911addicts') > -1) { 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style> .footerLegal .pageContent{background-color: rgb(248, 248, 248) !important;}.mainContainer{ width: 640px !important;}.xbOffCanvasContainer{width: 1000px !important;margin: 0 auto !important;} .pageWidth{padding-right: 0px !important;padding-left: 0px !important;} </style>';				

//Date: 10/28/2015, Created by: Alvaro Samaniego, Requested by: Serena Passion, Ticket no.: 75199
}else if (window.location.toString().indexOf('aufeminin') > -1) { 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style>#header, header{max-width: 1000px !important;;margin: 0 auto !important;;left: initial !important;}nav#head-nav ul#main-menu{width: 900px !important;white-space: initial !important;margin: 0 auto !important;display: inline-block !important;}nav#head-nav.alone{width: 1000px !important;height: 90px !important;}#footer {width: 1000px !important;margin: 0 auto !important;}#content{width: 980px !important;padding: 10px !important;background-color: #fff !important;}.af_contentBack{width: 1000px !important;background-color: #fff !important;}#logo{width: 680px !important;} #line-sub-header{display: none !important;}</style>';			

//Date: 10/29/2015, Created by: Ana Acosta, Requested by: Dakotah Walker, Ticket no.: 75199
}else if (window.location.toString().indexOf('monstersagogo') > -1) { 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style> .td-header-sp-recs{ margin: 10px 0 9px 21px !important;} .td-header-style-1 .td-header-sp-recs, .td-header-style-1 .td-header-sp-logo {margin-bottom: 0px !important;} #td-outer-wrap {width: 1000px !important;} .td-container{width: 1000px !important;} .td_block_big_grid_3 .td-big-thumb .td-module-thumb {width: 500px !important; height: 400px !important;} .td_block_big_grid_3 .td-medium-thumb .td-module-thumb {width: 497px !important; height: 199px !important;} .td_block_big_grid_3 .td-small-thumb .td-module-thumb{ width: 247px !important; height: 197px !important;} </style>';			

//Date: 10/30/2015, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 75265
}else if (window.location.toString().indexOf('faranduladaily') > -1) { 
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css">#header, #wrapper, #footer {margin:0px auto !important; width: 1000px !important;}</style>';	

//Date: 11/06/2015, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 75533
}else if (window.location.toString().indexOf('adoleteen') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .mainAds, header, .ads-top, .header-main, .main-wrap, footer{width: 1000px !important; margin: 0px auto !important;} li>a{font-size: 83% !important;}</style>';

//Date: 11/06/2015, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 75533
}else if (window.location.toString().indexOf('amigacocina') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> header, .ad-header, .main-wrap, .home-list{width: 1000px !important; margin: 0px auto !important; background: white !important;} .header-main, footer{width: 1000px !important; margin: 0px auto !important;}</style>';

//Date: 11/06/2015, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 75533
}else if (window.location.toString().indexOf('linkverde') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .mainAds, header, .main-wrap, footer{width: 1000px !important; margin: 0px auto !important;} </style>';
	
//Date: 11/06/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 75535
}else if (window.location.toString().indexOf('superchevere') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .ad-header{width: 1000px !important;margin: 0 auto !important;} header{width: 1000px !important;margin: 0 auto !important;}.container{max-width: 1000px !important;padding: 0 !important;}.main-wrap{ width: 1000px !important;margin: 0 auto !important;background-color: #E9EAED !important;}.mainAds{width: 1000px !important;} </style>';
	
//Date: 11/06/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 75535
}else if (window.location.toString().indexOf('mujeresusa') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #wrapper{width: 980px !important;}.logo {width: 220px !important;}.logo a img{width: 220px !important;}.bg1{width: 980px;height: 14px;}#slider .col-1 {width: 610px !important;}.arrow-nav.next{margin-left: 545px !important;}#content .col-1{width: 610px !important;}.title-bar{width: 963px !important;} </style>';
	
//Date: 11/09/2015, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 75535
}else if (window.location.toString().indexOf('emedemujer') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #header{width: 1000px !important;margin: 0 auto !important;}.header-top .container{ width: 1000px !important;}.suscribe{margin: -21px 0 0 19px !important;}#menu{width: 1000px !important;}.span4{width: 360px !important;}.top-block{ width: 1000px !important;}#content{width: 1000px !important; background-color: white !important; margin-top: 0px !important;}#blog-entry {width: 1000px !important;}.home .container-pagination{width: 1000px !important;margin: 0 auto !important;}#footer{    width: 1000px !important;margin: 0 auto !important;}#footer .container{width: 1000px !important;}#bottommenu-block-bg #menu{width: 1000px !important;}.posts-tmp article{top: auto !important; left: auto !important; position: relative !important;} </style>';
	
//Date: 11/09/2015, Created by: Ana Acosta, Requested by: Esteban Llanes
}else if (window.location.toString().indexOf('flickeringmyth') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> div#home_175{position: relative !important;} </style>';
	
//Date: 11/11/2015, Created by: Alvaro Samaniego, Requested by: Kristen Quan
}else if (window.location.toString().indexOf('shebudgets') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #home_adoop{line-height: 0 !important;} #site-navigation{width: 1000px !important;margin: 0 auto !important;} #page{background-color: #fff !important;} #menu-main-menu{font-size: 0px !important;}</style>';
	
//Date: 11/20/2015, Created by: Ana Acosta, Requested by: Serena Pasion
}else if (window.location.toString().indexOf('gearpatrol') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #wrapper {width: 1000px !important;margin: 0 auto !important;background-color: white !important;}#on-load-button{width: 1000px !important;position: relative !important;}html{height: auto !important;} </style>';
	
//Date: 12/01/2015, Created by: Ana Acosta, Requested by: Kristen Quan, Ticket no.: 76189
}else if (window.location.toString().indexOf('theimperfectmum') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #page{ width: 1000px !important; background-color: #e8e2e2 !important;}.region-bottom{ width: 1000px !important;} </style>';

//Date: 3/15/2016, Created by: Alvaro Samaniego, Requested by: Kristen Quan, Ticket no.: 76277
} else if (window.location.toString().indexOf('puckermom') > -1) {
window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type=text/css>#nav_bar_header{width: 1000px !important; margin: auto !important; display: list-item !important; position: inherit !important} .container{width: 1000px !important} #puc-articles{ max-width: 587px;}.fixed-width-sidebar{width: 489px;margin-right: 13px;}#topbar-container {margin-right: 8.7rem !important;}#main{max-width: 1000px !important;background-color: #fff !important;}#top-banner, #nav-bar, #header-ad { width:1000px !important; margin:0 auto;} .fixed {left: 50% !important; margin-left: -500px !important;} #aside{right: 0 !important;} .fixed-width-sidebar{width: 300px !important;} #puc-articles{max-width: 680px !important;}</style>';
	
//Date: 12/01/2015, Created by: Alvaro Samaniego, Requested by: Dakotah Walker, Ticket no.: 76259
}else if (window.location.toString().indexOf('tmz') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #masthead-wrap, .footer-wrapper{width: 1098px !important;margin: 0 auto !important;} </style>';
	window.parent.document.getElementsByTagName('div')[0].style.display = "none";
	
//Date: 03/30/2016, Created by: Ana Acosta, Requested by: Serena Pasion, Ticket no.: 79757
}else if (window.location.toString().indexOf('ranker') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #siteFlex, #siteBody, #siteFoot, .catHeader.whiteBg, #atf_leaderboard_01, footer#buzzing{width: 1080px !important;margin: 0 auto !important;}#siteBody{min-width: auto !important;}#siteHead{width: 1080px !important;margin: 0 auto !important;position: relative !important;float: none !important;}body{padding-top: 0 !important;} .seasonalLists article.small img{width: 33% !important;}.seasonalLists article.large img{width: 350px !important;} #ticker{width: 1080px !important;margin: 0 auto;} #siteFoot{bottom: 0px;}#atf_leaderboard_01{background-color: white !important;}</style>';
	
//Date: 12/03/2015, Created by: Ana Acosta, Requested by: Marie Vodicksa, Ticket no.: 76305
}else if (window.location.toString().indexOf('hardcoregamer') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .entry-content{line-height: 13px !important;} div{font-size: 96% !important;} #main{width: 104% !important;}#page{ background-color: #f5f5f5 !important; width: 1000px !important;margin: 0 auto !important;}#masthead{width: 1000px !important;position: absolute !important;}body .site-footer{ width: 1000px !important;margin: 0 auto !important;} #primary{width:68% !important;}header.site-header{width: 1000px !important;}.navbar-default .navbar-nav>li>a{padding-right: 23px !important;}</style>';

//Date: 01/11/2016, Created by: Ignacio Velderrain, Requested by: Marie Vodicksa, Ticket no.: 77167
}else if (window.location.toString().indexOf('gamersheroes') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .shiftnav-wrap{width: 1000px !important; margin: 0px auto !important;} </style>';

//Date: 01/11/2016, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 77101
}else if (window.location.toString().indexOf('pasionfutbol') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .site-cont{width: 1000px !important;margin: 0 auto !important;}.mod-header-estadisticas{width: 1000px !important;}.site-header{width: 1000px !important;margin: 0 auto !important;position: relative !important;}.row{width: 1000px !important;}.site-footer{width: 1000px !important;margin: 0 auto !important;} </style>';

//Date: 01/11/2016, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 77101
}else if (window.location.toString().indexOf('latinamoms') > -1) {
	window.parent.window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .full-wrapper{background-color: white !important;width: 1000px !important;}.header{margin-top: 0px !important;}.col-560{width: 540px !important;}.col-700{width: 660px !important;}.col-320{width: 329px !important;}.col-1020{width: 960px !important;}.col-495{width: 500px !important;}.col-220{width: 170px !important;}hr.divider{width: 1000px !important;} </style>';

//Date: 01/11/2016, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 77101
}else if (window.location.toString().indexOf('mamiverse') > -1) {
	window.parent.window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #page_wrapper{width: 1000px !important;margin: 0 auto !important;background-color: white !important;}.header_main{width: 990px !important;}.container1{width: 1000px !important;}.con_left{width: 660px !important;}.con_left ul.photo li{width: 311px !important;}.logo{width: 180px !important;position: absolute !important;}.h_rt{width: 886px !important;}.footer_main{width: 1000px !important;} </style>';

//Date: 01/11/2016, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 77101
}else if (window.location.toString().indexOf('popful') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .main-container{width: 1000px;}footer{width: 1000px;margin: 0 auto;}#page{background-color: white;} </style>';

	//Date: 01/11/2016, Created by: Ana Acosta, Requested by: Geoffrey Gonzalez, Ticket no.: 77101
}else if (window.location.toString().indexOf('vanitatis') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .black-header{width: 1000px;margin: 0 auto;position: relative !important;}#container{width: 1000px !important;margin: 0 auto !important;background-color: white !important;}#content{width: 1000px !important;margin: 0 auto !important;}.header-center-full{width: 1000px !important;}.nav-center-full{width: 1000px !important;}.opening-area{width: 1000px !important;}.opening-1-left{width: 300px !important;}.opening-1-right{width: 340px !important;}.opening-3{width: 660px !important;}.opening-3-left{width: 200px !important;}.opening-3-center{width: 200px !important;}.opening-3-right{width: 200px !important;}.royal-area{width: 1000px !important;}.royal-area .royal-1{width: 658px !important;}.royal-area .royal-house-1-top{width: 660px !important;}.royal-house-1-right{width: 308px !important;}.royal-house-1-left{width: 320px !important;}.royal-area .movie-1-top{width: 1000px !important;}.responsive-albumes.group-slide-responsive .element{width: 230px !important;}.trend-container{width: 1000px !important;}.trend-1{width: 660px !important;}.trend-1-top{width: 1000px !important;}.trend-1-left{width: 310px !important;}.trend-1-right {width: 320px !important;}.trend-3{width: 660px !important;}.trend-3-left{width: 310px !important;}.trend-3-right {width: 330px !important;}.vanitatis-tv-area{width: 1000px !important;}.vani-tv-1-left{width: 660px !important;}.vani-tv-1-bottom{width: 1000px !important;}	.go-top-container{width: 1000px !important;}.footer-default{ width: 1000px !important;margin: 0 auto !important;}.footer-top-container{width: 1000px !important;}.footer-sections{ width: 828px !important;}.responsive-albumes{width: 1000px !important;} </style>';

//Date: 02/02/2016, Created by: Ignacio Velderrain, Requested by: Marie Vodicska, Ticket no.: 78099
}else if (window.location.toString().indexOf('gearnuke') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #page{width: 1000px !important; margin: 0px auto !important; background: white !important;} #topbar{width: 1000px !important; margin: 0px auto !important;} #topbar .container{padding: 0px !important;} li.topbar-search{padding: 0px !important; font-size: 16px !important;} .juxtapose{width: 582px !important;height: 230px !important;} #text-5{width: 300px !important;}</style>';

//Date: 02/18/2016, Created by: Ana Acosta, Requested by: Marie Vodicska, Ticket no.: 78597
}else if (window.location.toString().indexOf('godisageek') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .container-fluid.no-padding{width: 1000px !important;margin: 0 auto !important;}#sticky-bar{ position: relative !important;}.after-top-menu{margin: 0 auto !important;width: 1000px !important;background-color: white !important;}.container{width: 1000px !important;}#exclusive{width: 1000px !important;}.span12 {width: 1000px !important;}.post-list.overlays .box-panel{width: 295px !important;}.revolution-wrapper{width: 990px !important;}.revolution-slider.large {width: 1000px !important;}#sub-menu{margin: 0 auto !important;}#sub-menu a{font-size: 11px !important;}#footer-wrapper{width: 1000px !important;margin: 0 auto !important;}.span3{width: 227px !important;}#subfooter-wrapper{ width: 1000px !important;margin: 0 auto !important;}embed{ width: 333px;}</style>';

//Date: 02/18/2016, Created by: Ignacio Velderrain, Requested by: Geoffrey Gonzalez, Ticket no.: 78595
}else if (window.location.toString().indexOf('marca') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> header, main, footer{width: 1000px !important; margin: 0px auto !important;} .ad-item-si, .ad-item-sd{background: none !important;}</style>';

//Date: 02/23/2016, Created by: Ana Acosta, Requested by: Crystal Nastor, Ticket no.: 78727
}else if (window.location.toString().indexOf('vivaglammagazine') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #site{width: 1000px !important;float: none !important;margin: 0 auto !important;height: 9745px; !important;}#nav-wrapper{width: 1000px !important;} .topbar{display: none !important;}</style>';

//Date: 02/23/2016, Created by: Nyx Zamora, Requested by: Nallely Nunez, Ticket no.: 78729
}else if (window.location.toString().indexOf('dailymotion') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #wrapper{background-color: #fff;} #topwrapper{width: 1000px !important;margin: 0 auto !important;} </style>';
	
//Date: 03/07/2016, Created by: Ana Acosta, Requested by: Crystal Nastor, Ticket no.: 79157
}else if (window.location.toString().indexOf('passionmob') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> html{height: auto !important;}#main{width: 1000px !important; background-color: white !important;}#nav_bar{width: 1000px !important; position: relative !important; margin: 0 auto !important;}#header-ad{width: 1000px !important; margin-top: 0px !important;} aside{right: 0px !important;} </style>';
	
//Date: 03/22/2016, Created by: Alvaro Samaniego, Requested by: Serena Passion, Ticket no.: 79477
}else if (window.location.toString().indexOf('advocate') > -1) {
	//window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .container, .band {max-width: 1000px !important; margin: 0 auto !important} .desktopHeader {background-color: trasparent;} </style>';

//Date: 03/16/2016, Created by: Ignacio Velderrain, Requested by: Crystal Nastor, Ticket no.: 79305
}else if (window.location.toString().indexOf('wheretoget') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #new-main-home, .ad-module-content{ width: 1000px !important; margin: 0px auto !important; background: white !important;} #new-home-section, .new-main-wrapper, .new-header-placeholder{ width: 1000px !important; margin: 0px auto !important;} .new-footer-social-links{ background: white !important; margin-top: 0px !important; margin-bottom: 0px !important;} .new-social-icons-wrapper{ background: white !important; width: 1000px !important;} #new-header{ position: inherit !important; display: block !important;} #new-main-navigation li a{font-size: 11px !important;} </style>';

//Date: 03/29/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
}else if (window.location.toString().indexOf('agkidzone') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #agk-header, #global_footer{width: 1000px !important; margin: 0px auto !important;} #wrapper{background: white !important;} </style>';

//Date: 03/31/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
}else if (window.location.toString().indexOf('babynamenetwork') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #container{background: white !important;} </style>';

//Date: 03/31/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
}else if (window.location.toString().indexOf('babynameworld') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #container{background: white !important;} </style>';

//Date: 04/04/2016, Created by: Ignacio Velderrain, Requested by: -, Ticket no.: -. NOTE: I updated the exception in the 'test pages updating' process.
}else if (window.location.toString().indexOf('celebdirtylaundry') > -1) {
	window.parent.document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> #main{background: white !important;} </style>';
	
	}else {
		//UPDATE CHECK!!!
}