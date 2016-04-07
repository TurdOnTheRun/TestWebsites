/*******************************************************************/
/******         JSON LOAD: Global Nav Redsign 2015             *****/
/******         Author: Christine Lam                          *****/
/******         Platform: EONLINE                              *****/
/******         Version: 2.0                                   *****/
/*******************************************************************/

(function(jQuery){  
	// Div to load data
	
	if (typeof enavItems === 'undefined') {
		return;
	}
		
	var newsTID = "#NavR_Header_News_Subnav";
	var photosTID = "#NavR_Header_Photos_Subnav";
	var videosTID = "#NavR_Header_Videos_Subnav";
	var tvscoopTID = "#NavR_Header_TVScoop_Subnav";
	var redcarpetTID = "#NavR_Header_RedCarpet_Subnav";
	var styleTID = "#NavR_Header_style_Subnav";
	var eshowsClipsTID = "#NavR_Header_EShows_Subnav_clips";
	var eshowsShowsTID = "#NavR_Header_EShows_Subnav_shows";
	var eshowsScheduleTID = "#NavR_Header_EShows_Subnav_schedule";
	var eshowsGrids = ".NavR_Header_Subnav_EShows_showGrids";
	var eshowsMore = ".NavR_Header_Subnav_EShows_moreShows";
	var miscOurapps = ".NavR_Header_Subnav_ourapps_img";
	var miscFeatured = ".NavR_Header_Subnav_featuredlist";
	var schtimelistTID = "#NavR_EShows_Schedule_timeline";
	var schshowslistTID = "#NavR_EShows_Schedule_showline";
	
	//UL to load data
	var snList = ".NavR_Header_Subnav_List";
	
	//Schedule month, day, and time list
	var NavRMonth = [ "January", "February", "March", "April", "May", "June",
    		"July", "August", "September", "October", "November", "December" ];
	var NavRMonth_de = ["Januar","Februar","März","April","Mai","Juni",
	                    "Juli","August","September","Oktober","November","Dezember"];
	var NavRMonth_fr = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet",
	                    "Août","Septembre","Octobre","Novembre","Décembre"];
    var NavRDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var NavRDay_de = ["Sonntag", "Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
    var NavRDay_fr = ["Dimanche", "Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    var hourlist = [];
    var militaryhourlist = [];
    var minlist = [];
    var ampmlist = [];
    var edition = "us";

	function addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}


	loadNavNewsTab = function loadNews(){   
		jQuery.each(enavItems.newsNavItem.contentItems, function(index,newsItem){
			var strDataReference = "enavItems.newsNavItem.contentItems[" + index + "]";
			loadNewsTHB(newsItem, newsTID, strDataReference); 			
		});
	}
	
	loadNavPhotosTab = function loadPhotos(){   
		jQuery.each(enavItems.photosNavItem.contentItems, function(index,photosItem){
			var strDataReference = "enavItems.photosNavItem.contentItems[" + index + "]";
			loadPhotosTHB(photosItem, photosTID, "photos", strDataReference);
		});
	}
	
	loadNavVideosTab = function loadVideos(){   
		jQuery.each(enavItems.videosNavItem.contentItems, function(index,videosItem){ 
			var strDataReference = "enavItems.videosNavItem.contentItems[" + index + "]";
			loadVideosTHB(videosItem, videosTID, "videos", strDataReference);
		});
	}
	
	loadNavTVTab = function loadTV(){   
		jQuery.each(enavItems.tvNavItem.contentItems, function(index,listItem){ 
				var strDataReference = "enavItems.tvNavItem.contentItems[" + index + "]";
				if(listItem.contentType == "NEWS"){
					loadNewsTHB(listItem, tvscoopTID, strDataReference);
				}
				if(listItem.contentType == "PHOTO_GALLERIES"){
					loadPhotosTHB(listItem, tvscoopTID, "photos", strDataReference);
				}
				if(listItem.contentType == "VIDEOS"){
					loadVideosTHB(listItem, tvscoopTID, "videos", strDataReference);
				}
		});
	}
	
	loadNavRedCarpetTab = function loadRedCarpet(){   
		jQuery.each(enavItems.redcarpetNavItem.contentItems, function(index,listItem){
				var strDataReference = "enavItems.tvNavItem.contentItems[" + index + "]";
				if(listItem.contentType == "NEWS"){
					loadNewsTHB(listItem, redcarpetTID, strDataReference);
				}
				if(listItem.contentType == "PHOTO_GALLERIES"){
					loadPhotosTHB(listItem, redcarpetTID, "photos", strDataReference);
				}
				if(listItem.contentType == "VIDEOS"){
					loadVideosTHB(listItem, redcarpetTID, "videos", strDataReference);
				}
		});
	}
	loadNavStyleTab = function loadStyle(){    
		jQuery.each(enavItems.styleNavItem.contentItems, function(index,listItem){ 
				var strDataReference = "enavItems.styleNavItem.contentItems[" + index + "]";
				if(listItem.contentType == "NEWS"){
					loadNewsTHB(listItem, styleTID, strDataReference);
				}
				if(listItem.contentType == "PHOTO_GALLERIES"){
					loadPhotosTHB(listItem, styleTID, "style_photos", strDataReference);
				}
				if(listItem.contentType == "VIDEOS"){
					loadVideosTHB(listItem, styleTID, "style_videos", strDataReference);
				}
		});
	}
	loadNavEShowsTab = function loadEShows(){   
		//load CLIPS
		jQuery.each(enavItems.showsNavItem.contentTab, function(index,listItem){ 
			var strDataReference = "enavItems.showsNavItem.contentTab[" + index + "]";
			if(listItem.contentType == "NEWS"){
				loadNewsTHB(listItem, eshowsClipsTID, strDataReference);
			}
			if(listItem.contentType == "PHOTO_GALLERIES"){
				loadPhotosTHB(listItem, eshowsClipsTID, "photos", strDataReference);
			}
			if(listItem.contentType == "VIDEOS"){
				loadVideosTHB(listItem, eshowsClipsTID, "videos", strDataReference);
			}
		});

		//load FEATURED SHOWS
		var showslength;
		showslength = enavItems.showsNavItem.featuredTab.length;

		// Prefix link on shows button if edition is not US
		var editionPrefix = edition == 'us' ? '' : '/' + edition;

		jQuery.each(enavItems.showsNavItem.featuredTab, function(index,listItem){
			var strDataReference = "enavItems.showsNavItem.featuredTab[" + index + "]";
			// eonline.com is hardcoded (ugh why???) so we need to remove it. TODO. have this fixed in the back end
			var url = listItem.link.replace('http://www.eonline.com', '');
				url = editionPrefix + url;

			if(index < showslength -1){
				jQuery(eshowsGrids).append("<a href='"+url+"' data-object='" + strDataReference + "'><div class='NavR_EShows_shows_item img_"+index+"'>"+
				"<div class='NavR_featured_overlay navr_lf'></div>"+
				"<div class='NavR_featured_official_link navr_lf'><label>" + officialSiteTxt + "</label></div>"+
				"<img src='"+listItem.thumbnail+"'></img></div></a>");
			}
			if(index == showslength-1){
				jQuery(eshowsShowsTID).append("<div class='NavR_EShows_moreshowCont'>"+
					"<div class='NavR_featured_large'><a href='"+url+"' data-object>"+
					"<div class='NavR_featured_overlay navr_sf'></div>"+
					"<div class='NavR_featured_official_link navr_sf'><label>Official Site</label></div>"+
					"<img class='NavR_fs_last' src='"+listItem.thumbnail+"'></img></a></div>"+
				"<a id='NavR_moreShows_button' href='" + editionPrefix + "/shows' data-object><div class='NavR_EShows_moreshows_grid navr_text'><label>" + moreShowsTxt + "</label></div></a></div>");
			}
		});
		
		// takes a time String and returns the date in milliseconds since 1970
		function getEpisodeDate(episodeDate) {
			// use universal abbreviation for Australian timezones
			// avoids confusion with normal Eastern Time abbreviation
			if(edition == "uk") {
				episodeDate = episodeDate.replace(" GMT","");
				return Date.parse(episodeDate);
			}
			// uses timeGate function to get milliseconds
			return getTimeInMSec(episodeDate);
		}
		
		var airDateString;
		
		function trimEpisodeData() {
			//we changed the episode data +-12 hrs but the existing code expects episodes to start from the current time
			
			// get all episodes
			var eData = enavItems.showsNavItem.scheduleTab.episodes;
			// get current local time in milliseconds

			airDateString = new Date().getTime();
			
			var compareDate, n = 0;
			for (n; n < eData.length; n++) {
				// get episode time in milliseconds
				compareDate =  getEpisodeDate(eData[n].airDate);
				// check if current time is before or after this episode's air time
				if (airDateString < compareDate ) {
					break; //found one past current episode
				}
			}
			// reset episode list to show 10 episodes, starting with current episode
			enavItems.showsNavItem.scheduleTab.episodes = eData.slice(n-1, n + 9);
		}
		
		//load SCHEDULE
		trimEpisodeData();
		var scheduletime = new Date(airDateString); //new Date();
		buildTimelist(scheduletime.getHours(), scheduletime.getMinutes());
		
		if(edition == "fr") {
			jQuery(".NavR_schedule_weekday").text(NavRDay_fr[scheduletime.getDay()]);
			jQuery(".NavR_schedule_month").text(NavRMonth_fr[scheduletime.getMonth()]);
		} else if(edition == "de") {
			jQuery(".NavR_schedule_weekday").text(NavRDay_de[scheduletime.getDay()]);
			jQuery(".NavR_schedule_month").text(NavRMonth_de[scheduletime.getMonth()]);
		} else {
			jQuery(".NavR_schedule_weekday").text(NavRDay[scheduletime.getDay()]);
			jQuery(".NavR_schedule_month").text(NavRMonth[scheduletime.getMonth()]);
		}
		
		jQuery(".NavR_schedule_day").text(addZero(scheduletime.getDate()));
		
		if(edition != "us") {
			// reverse date format in international editions
			jQuery(".NavR_schedule_day").after(jQuery(".NavR_schedule_month"));
		}
		if(edition == "fr" || edition == "de"){
			jQuery.each(hourlist, function(index, listItem){
				jQuery(schtimelistTID).append("<li class='NavR_Schedule_timeCol'>"+
						"<div class='NavR_Schedule_time nav_military_time'><p class='NavR_schedule_hour'>"+militaryhourlist[index]+
						":"+minlist[index]+"</p></div></li>");
			});
		}else{
			jQuery.each(hourlist, function(index, listItem){
				jQuery(schtimelistTID).append("<li class='NavR_Schedule_timeCol'>"+
						"<div class='NavR_Schedule_time'><p class='NavR_schedule_hour'>"+hourlist[index]+
						":"+minlist[index]+"</p><p class='NavR_schedule_min'>"+ampmlist[index]+"</p></div></li>");
			});
		}
		// takes an episode object and a date object
		// returns a trimmed show duration if the start time is too far in the past
		function getFirstShowLength(item, currTime) {
			// get the schedule start time in milliseconds
			var scheduleTime = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), 
					parseInt(militaryhourlist[0]), parseInt(minlist[0]), 0, 0).getTime();
			// finds the difference between the current time and the episode start time
			// and converts it to minutes
			var timeDiff = (scheduleTime - getEpisodeDate(item.airDate))/1000/60;
			// episode duration in minutes
			var itemDur = parseInt(item.duration);
			// remove any extra time so only the time visible to the schedule is left
			itemDur = (itemDur - timeDiff)/30;
			return itemDur;
		}

		var totalhr = 0;
		var parentWth = 1240; // the maximum width of the schedule container in 5 cols view
		var firstItem = true;
		var lastItem = false;
		// create the time block for each episode
		jQuery.each(enavItems.showsNavItem.scheduleTab.episodes, function(index, listItem){
			// skip time block creation if have already reached capacity for visible time blocks
			if(!lastItem) {
				var showlength;
				// if this is the first item, check to see if the start time is in the past, relative to the time listings
				// otherwise just find the amount of half hour blocks the episode should take up
				if(firstItem) {
					firstItem = false;
					showlength = getFirstShowLength(listItem, scheduletime);
				} else {
					showlength =  parseInt(listItem.duration)/30;
				}
				// show 155px for every half hour of the show
				var showWth = Math.round(155*showlength);
				if (showWth < 0) showWth = 0; //jic bad data
				// if the length of all time blocks now exceeds the maximum container width
				// then this is the last item and will only take up the visible space that is left
				if((totalhr+showWth) > parentWth) {
					showWth = parentWth - totalhr;
					lastItem = true;
				}
				totalhr +=showWth;
				
				if(showWth > 0) {
					// add time block to show list
					jQuery(schshowslistTID).append("<li class='NavR_Schedule_showCol' style='width:"+showWth+"px'>"+
						"<div class='NavR_Schedule_showDetail'>"+
							"<div class='NavR_show_title'><label>"+checkNull(listItem.showTitle)+"</label></div>"+
							"<div class='NavR_show_epTitle'><label>"+checkNull(listItem.episodeTitle)+"</label></div>"+
							"<div class='NavR_show_rating'><label>"+checkNull(listItem.rating)+" | E"+checkNull(listItem.episodeNumber)+"</label></div>"+
					    "</div>"+
						"</li>");
				}
			}
		});
		jQuery(".NavR_EShows_Schedule_showline").css("width",totalhr+"px");
	}
	
	//LOAD MORE
	loadNavMiscTab = function loadMisc(){
		jQuery.each(enavItems.moreNavItem.ourApps, function(index, listItem){
			var strDataReference = "enavItems.moreNavItem.ourApps[" + index + "]";
			jQuery(miscOurapps).append("<a href='"+listItem.link+"' id='NavR_ourapp_a_"+index+"' data-object='" + strDataReference + "'><img class='NavR_ourapp_img_"+index+"' src='"+listItem.thumbnail+"' height='216' width='90'/></a>");
		});
		jQuery.each(enavItems.moreNavItem.featured, function(index, listItem){
			var strDataReference = "enavItems.moreNavItem.featured[" + index + "]";
			jQuery(miscFeatured).append("<a href='"+listItem.link+"' data-object='" + strDataReference + "'><img class='NavR_featured_img-"+index+"' src='"+listItem.thumbnail+"' height='71' width='71'/></a>");
		});
	}
	/******load News Thumbnails ******/
	function loadNewsTHB(listItem, category, strDataReference){

		var newsItemMarkup = "<li class='NavR_Header_Subnav_Item NavR_II_News'>"+
			"<a href='"+listItem.uri+"' class='thumb-link' data-object='" + strDataReference + "'>"+
			"<div class='NavR_Header_thumbnail_zoom'>"+
				"<img src='"+listItem.thumbnailSource+"' class='NavR_thumb' alt='"+listItem.title+"'></img>"+
			"</div>"+
			"<div class='NavR_Header_Thumb_Overlay NavR_gradient_shadow narv_news_grad'></div>"+
			"<div class='NavR_Header_Thumb_Overlay NavR_hover_shadow'></div>"+
			"<div class='NavR_Header_Category_icon NavR_hover_shadow icon_news navr_news_dim nav_sprite'></div></a>"+
			
			"<a href='"+listItem.uri+"' class='title-link' data-object='" + strDataReference + "'>"+
			"<p class='NavR_Header_SubNav_title NavR_hh_News'>"+checkNull(listItem.title)+"</p></a>"+
			"<p class='NavR_Header_SubNav_timestamp NavR_tt_News'>"+checkNull(timeDiff(listItem.published, edition))+"</p>";

			if (listItem.brandedContent) {
				newsItemMarkup += "<p class='NavR_Header_SubNav_brandedcontent NavR_tt_News'>"+checkNull(listItem.brandedContentText)+"</p></li>";
			}

		jQuery(category+" "+snList).append(newsItemMarkup);

	}
	/******load Photos Thumbnails *******/
	function loadPhotosTHB(listItem, category, icontype, strDataReference){
		jQuery(category+" "+snList).append("<li class='NavR_Header_Subnav_Item NavR_II_Photos'>"+
			"<a href='"+listItem.uri+"' class='thumb-link' data-object='" + strDataReference + "'>"+
			"<div class='NavR_Header_thumbnail_zoom'>"+
				"<img src='"+listItem.thumbnailSource+"' class='NavR_thumb' alt='"+listItem.title+"'></img>"+
			"</div>"+
			"<div class='NavR_Header_Thumb_Overlay NavR_gradient_shadow'></div>"+
				"<div class='NavR_Header_Thumb_Overlay NavR_hover_shadow'></div>"+
			"<div class='NavR_Header_Category_icon NavR_hover_shadow icon_"+icontype+" navr_reg_dim nav_sprite'></div></a>"+
			"<a href='"+listItem.uri+"' class='title-link' data-object='" + strDataReference + "'>"+
			"<p class='NavR_Header_SubNav_title NavR_hh_Photos'>"+checkNull(listItem.title)+"</p></a>"+
			"<p class='NavR_Header_SubNav_timestamp NavR_tt_Photos'>"+checkNull(timeDiff(listItem.published, edition))+"</p></li>");
	}
	/******load Videos Thumbnails ******/
	function loadVideosTHB(listItem, category, icontype, strDataReference){
		var isfab = "";
		if(category.indexOf("Fabulist") != -1)
			isfab = "navr_video_dim";
		
		jQuery(category+" "+snList).append("<li class='NavR_Header_Subnav_Item NavR_II_Videos'>"+
			"<a href='"+listItem.uri+"' class='thumb-link' data-object='" + strDataReference + "'>"+
				"<div class='NavR_videoThumb_cont'>"+
				"<div class='NavR_Header_videothumbnail_zoom'>"+
				"<img src='"+listItem.thumbnailSource+"' class='NavR_videoThumb' alt='"+listItem.title+"'></img></div></div>"+
			"<div class='NavR_Header_Thumb_Overlay NavR_hover_shadow'></div>"+
			"<div class='NavR_Header_Category_icon NavR_hover_shadow icon_"+icontype+" "+isfab+" nav_sprite'></div></a>"+
			"<a href='"+listItem.uri+"' class='title-link' data-object='" + strDataReference + "'>"+
			"<p class='NavR_Header_SubNav_title NavR_hh_Videos'>"+checkNull(listItem.title)+"</p></a>"+
			"<p class='NavR_Header_SubNav_timestamp NavR_tt_Videos'>"+listItem.length+"</p></li>");	
	}

	function checkNull(input){
		var output;
		if(input === null || input == "null")
			output="";
		else{
			if(input !== undefined)
				output = input;
			else
				output = "";
			}
		return output;
	}
	
	function setAmPM(hour, index){
		var nhour;
		if(hour > 24) {
			hour -= 24;
		}
		if(hour >= 12 && hour != 24){
			if(hour == 12) {
				nhour = hour;
			} else {
				nhour = hour - 12;
			}
			ampmlist[index] = "PM";
		} else {
			if(hour == 0 || hour == 24) {
				nhour = 12;
			} else {
				nhour = hour;
			}
		    ampmlist[index] = "AM";
		}
		return nhour;
	}
	function setDigit(hour){
	    if(hour !== undefined){
	    	var dhour = hour;
	    	if(dhour > 23) {
	    		dhour -= 24;
	    	}
			return addZero(dhour);
		}
	}
	
	function buildTimelist(hour, min){
		hourlist[0] = setDigit(setAmPM(hour, 0));
		militaryhourlist[0] = setDigit(hour);
		if(min < 30){
			hourlist[1] = setDigit(setAmPM(hour, 1));
			hourlist[2] = setDigit(setAmPM(hour+1, 2));
			hourlist[3] = setDigit(setAmPM(hour+1, 3));
			hourlist[4] = setDigit(setAmPM(hour+2, 4));
			hourlist[5] = setDigit(setAmPM(hour+2, 5));
			hourlist[6] = setDigit(setAmPM(hour+3, 6));
			hourlist[7] = setDigit(setAmPM(hour+3, 7));
			minlist[0] = "00";
			minlist[1] = "30";
			minlist[2] = "00";
			minlist[3] = "30";
			minlist[4] = "00";
			minlist[5] = "30";
			minlist[6] = "00";
			minlist[7] = "30";
			militaryhourlist[1] = setDigit(hour);
			militaryhourlist[2] = setDigit(hour+1);
			militaryhourlist[3] = setDigit(hour+1);
			militaryhourlist[4] = setDigit(hour+2);
			militaryhourlist[5] = setDigit(hour+2);
			militaryhourlist[6] = setDigit(hour+3);
			militaryhourlist[7] = setDigit(hour+3);
		}else{
			hourlist[1] = setDigit(setAmPM(hour+1, 1));
			hourlist[2] = setDigit(setAmPM(hour+1, 2));
			hourlist[3] = setDigit(setAmPM(hour+2, 3));
			hourlist[4] = setDigit(setAmPM(hour+2, 4));
			hourlist[5] = setDigit(setAmPM(hour+3, 5));
			hourlist[6] = setDigit(setAmPM(hour+3, 6));
			hourlist[7] = setDigit(setAmPM(hour+4, 7));
			minlist[0] = "30";
			minlist[1] = "00";
			minlist[2] = "30";
			minlist[3] = "00";
			minlist[4] = "30";
			minlist[5] = "00";
			minlist[6] = "30";
			minlist[7] = "00";
			militaryhourlist[1] = setDigit(hour+1);
			militaryhourlist[2] = setDigit(hour+1);
			militaryhourlist[3] = setDigit(hour+2);
			militaryhourlist[4] = setDigit(hour+2);
			militaryhourlist[5] = setDigit(hour+3);
			militaryhourlist[6] = setDigit(hour+3);
			militaryhourlist[7] = setDigit(hour+4);
		}
		
	}
	function setEdition(){
		// TODO: fix issue where fr is not getting cookie edition after cache clear; so have to do this...
		if(jQuery("#HHeader").hasClass("fr")) {
			edition = "fr";
		} else if(jQuery("#HHeader").hasClass("de")) {
			edition = "de";
		} else if(jQuery("#HHeader").hasClass("ca")) {
			edition = "ca";
		} else if(jQuery("#HHeader").hasClass("uk")) {
			edition = "uk";
		} else if(jQuery("#HHeader").hasClass("au")) {
			edition = "au";
		}
		//edition = eol.cookie("edition") || "us";	
	}
	
	
	/*** Pre Load All Thumbnails *****/
	setEdition();
	loadNavNewsTab();
	loadNavPhotosTab();
	loadNavVideosTab();
	loadNavTVTab();
	loadNavRedCarpetTab();
	loadNavStyleTab();
	loadNavEShowsTab();
	loadNavMiscTab();
	
})(jQuery.noConflict());