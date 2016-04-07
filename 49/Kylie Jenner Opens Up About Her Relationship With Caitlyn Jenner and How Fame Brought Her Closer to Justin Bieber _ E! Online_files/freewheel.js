var freewheel = {
	siteSectionID: function(page, categoryKey, adEdition, isTablet, edition) {
		var value = "e_online_";
		if (adEdition === "us") {
			if (page === "embed") value += "embed_off_domain_vod";
			else if (categoryKey) value += (categoryKey + "_vod");
			else if (page === "lightbox") value += "lightbox_vod";
			else if (page === "homepage") value += "homepage_vod";
			else if (page === "detail") value += "detail_vod";
			else if (page === "landing") value += "landing_vod";
			else {
				//Should specify a default here
			}
		} 
		else if(adEdition === "ooc" && edition === "uk") {
			value += ("vod_ooc_uk_site_edition");
		}
		else if(adEdition === "la") {
			value += ("vod_ooc"); //specifically for adEdition = la, overwrite to OOC
		}
		else value += ("vod_"+adEdition);
		//TABLET
		if (isTablet === "true" || isTablet == true) value += "_tab";
	
		return value;
	}
}

// e.g. freewheel.siteSectionID("detail","","us","")