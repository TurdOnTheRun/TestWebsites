/*******************************************************************/
/******         Time Gate                                      *****/
/******         Author: Christine Lam                          *****/
/******         Platform: EONLINE                              *****/
/******         Version: 1.0                                   *****/
/*******************************************************************/

(function(jQuery){ 
	// accepts String in format: 2015-05-04T10:00:00 PDT
	// returns time in milliseconds
	getTimeInMSec = function(time) {
		var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var utcTime;
		// Parse date string
		var datetime = time.split(" ");
		// get time zone
		var timeZone = datetime[1];
		// find the time zone offset for each edition feed
		// accounting for daylight savings, summer, and winter time variations through the year
		switch(timeZone) {
			case("GMT"):
				utcTime = "Z";
				break;
			case("PST"):
				utcTime = "-0800";
				break;
			case("PDT"):
				utcTime = "-0700";
				break;
			case("EST"):
				utcTime = "-0500";
				break;
			case("EDT"):
				utcTime = "-0400";
				break;
			case("AEST"):
				utcTime = "+1000";
				break;
			case("AEDT"):
				utcTime = "+1100";
				break;
			case("CEST"):
				utcTime = "+0200";
				break;
			case("BST"):
			case("CET"):
				utcTime = "+0100";
				break;
		}
		
		// get date and time
		datetime = datetime[0].split("T");
		// get date as an array
		var pubDateParts = datetime[0].split("-");
		//new date object to use for parsing and to get day of week
		var pubDate = new Date(pubDateParts[0],parseInt(pubDateParts[1])-1,pubDateParts[2]);
		var pdatemill = Date.parse(days[pubDate.getDay()] + ", " + pubDate.getDate() + " " + months[pubDate.getMonth()] + " " + pubDate.getFullYear() + " " + datetime[1]+' GMT'+utcTime);
		return pdatemill;
	}
	
	 /**Main time diff method**/
	 //currently only taking time format: 2015-05-04T10:00:00 PDT
	 timeDiff = function(publishtime, edition){
		/** PRIVATE methods **/
		function translateMin(timelapsed, edition){
			var timelapsedQuote = "";
			if(edition == 'fr'){
			    if(timelapsed == 1)
					timelapsedQuote = "Il y a "+timelapsed+" minute";
				else
					timelapsedQuote = "Il y a "+timelapsed+" minutes";
			}else if(edition == "de"){
				if(timelapsed == 1)
					timelapsedQuote = "vor "+timelapsed+" Minute";
				else
					timelapsedQuote = "vor "+timelapsed+" Minuten";
			}else{
				if(timelapsed == 1)
					timelapsedQuote = timelapsed+" minute ago";
				else
					timelapsedQuote = timelapsed+" minutes ago";
			}
			return timelapsedQuote;
		}
		function translateHour(timelapsed, edition){
			var timelapsedQuote = "";
			
			if(edition == 'fr'){
			    if(timelapsed == 1)
					timelapsedQuote = "Il y a "+timelapsed+" heure";
				else
					timelapsedQuote = "Il y a "+timelapsed+" heures";
			}else if(edition == "de"){
				if(timelapsed == 1)
					timelapsedQuote = "vor "+timelapsed+" Stunde";
				else
					timelapsedQuote = "vor "+timelapsed+" Stunden";
			}else{
				if(timelapsed == 1)
					timelapsedQuote = timelapsed+" hour ago";
				else
					timelapsedQuote = timelapsed+" hours ago";
			}
			return timelapsedQuote;
		}
		function translateDay(timelapsed, edition){
			var timelapsedQuote = "";
			if(edition == 'fr'){
			    if(timelapsed == 1)
					timelapsedQuote = "Il y a "+timelapsed+" jour";
				else
					timelapsedQuote = "Il y a "+timelapsed+" jours";
			}else if(edition == "de"){
				if(timelapsed == 1)
					timelapsedQuote = "vor "+timelapsed+" Tag";
				else
					timelapsedQuote = "vor "+timelapsed+" Tagen";
			}else{
				if(timelapsed == 1)
					timelapsedQuote = timelapsed+" day ago";
				else
					timelapsedQuote = timelapsed+" days ago";
			}
			return timelapsedQuote;
		}
		function calTimeLapsed(seconds, edition){
			var numdays = Math.floor((seconds % 31536000) / 86400); 
			var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
			var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
	        
			if(numdays > 30){
				return "";
			}else if(numdays > 0){
				return translateDay(numdays, edition);
		    }else if(numhours > 0){
		    	return translateHour(numhours, edition);
		    }else if(numminutes >0){
		    	return translateMin(numminutes, edition);
		    }else{
		    	return "error";
		    }	
		}
		
		
	 	if(edition === undefined) {
	 		edition = "us";
	 	}
	 	
	 	//Get current date from client's browser
		var now = new Date();
		var syntimemill = now.getTime();
    	//Parse published date from server side
		var pdatemill = getTimeInMSec(publishtime);
		//Calculate time lapsed
		var timediff = (syntimemill - pdatemill) / 1000;
		var timelapsed = calTimeLapsed(timediff, edition);
		
		return timelapsed;
	}
	
})(jQuery.noConflict());