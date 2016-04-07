function read_cookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


//hotel ad stuff.
function findElementTop(obj) {
  curtop = 0;
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }
  } //if offsetParent exists
  else if (obj.y) {
    curtop += obj.y
  }

  return curtop;
}//findElementPosY

function are_ads_hidden(prefix) {
  var result = read_cookie(prefix + "HideAds");
  return result;
}

function wtIsLoggedIn(prefix)
{
  return (read_cookie(prefix + '_session') &&
    read_cookie(prefix + 'UserID') &&
    read_cookie(prefix + 'UserName'));
}
             


function getSleepsAnchor() {
  for (var i = 0; i < document.anchors.length; i++) {
    if(document.anchors[i].name.toLowerCase() == 'sleep') {
      return document.anchors[i];
    }
  }
  return null;
}

function spaceHotelAd() {
  var sleep = getSleepsAnchor();
  if(!sleep) {
    return;
  }
  var adSpacer = document.getElementById('hotelAdSpacer');
  var adBlock = document.getElementById('hotelAdBlock');
  if(!adBlock || !adSpacer) {
    return;
  }

/*
  sleeptop = findElementTop(sleep);
  adtop = findElementTop(adSpacer);



  if(adtop < sleeptop) {
    var space = sleeptop - adtop;
    adSpacer.style.marginTop =  space + 'px';
  }
*/

  adBlock.style.display = 'block';
}



function handleAds(prefix) {
  if(are_ads_hidden(prefix)) {
    var adColumn = document.getElementById('adTableCell');
    if(adColumn) {
      adColumn.style.display = 'none';
    }
    return;
  }

  spaceHotelAd();
}


function PageBanner1(){
	if($('table#toc').length && $('div.topbanner').length){
			var sMenu = '';
			var l_iLoop = 0;
			//
			//  These TOC elements must be in lowercase or they will not match
			//  the elements being process in the article
			//
                        var toc_array = ["understand", "get in", "get around", "see", "do", "buy", "eat", "districts", "sleep", "stay safe"];   
			var innerMenu =  jQuery('table#toc ul.xoxo.wt-toc > li > a').not('a.toc-arrow').each(function(){
				var toc = jQuery(this).html().toLowerCase();
				var b = '<span class="tocline">';
				var e = '</span>';
				var toc = toc.replace(b,'');
				var toc = toc.replace(e,'');
				if (jQuery.inArray(toc,toc_array) != (-1)) {
					sMenu += '<li class="wt-toc"><a href="' + jQuery(this).attr('href') + '">' + jQuery(this).html() + '</a></li>';
					l_iLoop++;
					if(l_iLoop > 9) return false;
				}
			});

			jQuery('div.topbanner-toc div.hlist').html('<div id="toc" class="toc tocFloat" cellspacing="0"> <ul class="tocUl">' + sMenu + '</ul> </div>');
			jQuery('table#toc').remove();
			// move banner
			//$("#mf-pagebanner").detach().appendTo(".article-banner");
			// move breadcrums
			//jQuery("div#contentSub").appendTo("div#breadcrums");
			// delete title
			jQuery("#firstHeading").remove();
		}
}

function PageBanner2(){
	/// PAGEBANNER2 TESTING
		if($('table#toc').length && $('div.topbanner').length){
			
			var sMenu = '<li class="wt-toc"><span style="font-weight: bold;">CONTENTS</span></li>';
			var innerMenu =  jQuery('table#toc ul.xoxo.wt-toc > li > a').not('a.toc-arrow').each(function(){
				sMenu += '<li class="wt-toc"><a href="' + jQuery(this).attr('href') + '">' + jQuery(this).html() + '</a></li>';
			});

			jQuery('div.topbanner-toc div.hlist').html('<div id="toc" class="toc tocFloat" cellspacing="0"> <ul class="tocUl">' + sMenu + '</ul> </div>');
			jQuery('table#toc').remove();
			
			// move banner
			//$("#mf-pagebanner").detach().appendTo(".article-banner");
			// move breadcrums
			//jQuery("div#contentSub").appendTo("div#breadcrums");
			// delete title
			//jQuery("#firstHeading").remove();
			jQuery(".topbanner .name").remove();
			
			//move title
			var lTitle = jQuery("#firstHeading span").html();
			jQuery("#firstHeading").remove();
			jQuery("div#moved_title").html(lTitle);
		}
}


$(document).ready(function(){
	//var randomNum = Math.floor((Math.random() * 10) + 1) % 2;
	
	//if(randomNum == 0)

	PageBanner1();
	//else
	//	PageBanner2();	
	
	
});
