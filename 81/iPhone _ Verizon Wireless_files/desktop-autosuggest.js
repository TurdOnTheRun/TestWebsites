var vzgnsearch_jQuery= null;  
if(typeof vzw_gnjq != 'undefined') {
   vzgnsearch_jQuery = vzw_gnjq;
} else if(typeof jQuery !='undefined') {
   var jQVer = parseFloat(jQuery.fn.jquery);
   if(jQVer>=1.5) {
    vzgnsearch_jQuery = jQuery;
   }
}

if(vzgnsearch_jQuery!=null) {
	(function($) {
	    $.suggestSearchVzwGN = function(input, options) {
	        var searchOnMouseover = true; // True enables Search on mouseover Suggested Terms
	        var autosuggestBannerEnabled = true; //True enables banners to be visible
	     
	        var $input = $(input).attr("autocomplete", "off");
	        var $searchContainer = $input.parent();
	        var $tilesContainer = $input.parent().parent();
	        var $body = $('body');
	        var $typeAheadOverlay = $(document.createElement("div"));
	        $typeAheadOverlay.attr("id","gn-typeahead-overlay");
	        var $results = $(document.createElement("div"));
	        $results.addClass(options.resultsClass).attr("id","gn-typeahead-search").attr("aria-label","Search results").attr("role","alert");
	        var timeout = false;        // hold timeout ID for suggestion results to appear 
	        var prevLength = 0;         // last recorded length of $input.val()
	        var cache = [];             // cache MRU list
	        var cacheSize = 0;          // size of cache in chars (bytes?)
	        var searchDispItems = new Array();      
	        var itemSuggTerms = new Array();
	        var itemRelaTerms = new Array();
	        var itemTiles = new Array();
	        var autosuggestBanner = false;
	        var autosuggestBannerData = {};
	        var items = new Array();
	        var itemTermHovered = {boolean: false, term:""};
	        var currentSearchInput = "";
	        var cacheSearch = {};
	        var fireFoxPixel = 0;//Pixel render issues in firefox
	        var hoverTimeoudId = {};
	        	hoverTimeoudId._value;
	        var searchCallInitiated = false;
	        var searchSecondCallInitiated = false;
	        initSaveSearchSuggest();
	        if(!$body.find('>#gn-typeahead-overlay').length)
	        	$body.prepend($typeAheadOverlay);

	        $typeAheadOverlay = $body.find('>#gn-typeahead-overlay') || null;

	        
	        $searchContainer.append($results);

	    
	        $(document).click(function(){       
	            $tilesContainer.find(".gn-typeahead-search").hide();
	            $typeAheadOverlay.hide(); // Removes it on click of document
	        });
	        // I really hate browser detection, but I don't see any other way
	        if (navigator.userAgent.indexOf("Firefox")!=-1){
	            $input.keypress(processKey);    // onkeypress repeats arrow keys in Mozilla/Opera
	        	 fireFoxPixel = 2;//Pixel issues in firefox
	        }
	        else{
	            $input.keydown(processKey);     // onkeydown repeats arrow keys in IE/Safari
	        	 fireFoxPixel = 0//Pixel issues in firefox
	        	
	        }
	        
	        function processKey(e) {
        		cacheSearch = {} //empty if input term is different
	            // Returning if the Search is disabled.
	            if(options.disable)
	                return;
	            // handling up/down/escape requires results to be visible
	            // handling enter/tab requires that AND a result to be selected
	            if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) ||
	                (/^13$/.test(e.keyCode)&& $results.is(':visible')) ||
	                (/^9$/.test(e.keyCode))) {
	            } else if ($input.val().length != prevLength) {
	
	                if (timeout) 
	                    clearTimeout(timeout);
	                timeout = setTimeout(suggestSearch, options.delay);
	                prevLength = $input.val().length;
	                
	                if(prevLength < 4){
	                	 $typeAheadOverlay.hide();
	                }
	                
	            }           
	        }           
	        function clearButtonVis(q) {
	            if (q == 0) {
	                vzgn.gnClearSearch();
	            }
	            else {                                      
	                vzw_gnjq(".vgn-icon-close-solid-circle").attr("class","vgn-icon-close-solid");                                  
	                vzw_gnjq("#vgn_clear_btn").attr("id","vgn_clear_btn-vis");                                  
	                vzw_gnjq("#vgn_clear_btn-vis").css("visibility","visible");                                 
	            }
	        }           
	            
	        function suggestSearch() {
	        	gnlin_searchTerms = null;
	            var q = $.trim($input.val());
	            q = removeSpChar(q);
	            q = q.trim();
	            clearButtonVis(q.length);
	            if (q.length >= options.minchars) {
	                    try{                                
	                        searchInitiateCall(q);                                                      
	                }catch(e){}
	                
	            } else {
	            
	                $results.hide();
	                //$typeAheadOverlay.removeClass('show');// ????
	            }
	                
	        }
	        
	        function addSearchLImg(){
	            var $inputLoading =$searchContainer.find(".vgn_loading"); 
	            if($inputLoading.length==0){
	                $searchContainer.append("<div class='vgn_loading'>Loading</div>");                  
	            }
	        }
	        function removeSearchLImg(){
	            $searchContainer.find(".vgn_loading").remove();
	        }
	        /* New Search API functionality Starts */
	        
	        function saveSearchSuggest(event){
	            try{
	                var linkEl = $(this);
	                var searchUrl = linkEl.attr("href");
	                var category = linkEl.attr("vgn_cat");
	                var searchTerm = linkEl.attr("vgn_search_link_text");
	                searchTerm = searchTerm.replace(/[^a-zA-Z 0-9 ( )]+/g,'');
	                var searchText = $.trim($input.val());
	                var pageUrl = document.location.href;
	                searchText = removeSpChar(searchText);  
	                var inputData = {"searchTerm":searchTerm, "searchUrl":searchUrl, "searchText":searchText, "pageUrl":pageUrl, "category":category};
	                
	                //fire and forget call
	                $.ajax({
	                    jsonp:false,
	                    url: options.saveSearchSuggestURL,
	                    data: inputData,
	                    dataType: 'jsonp',  
	                    type: 'GET',
	                    cache: false,
	                    async:false,
	                    timeout: 100,
	                    error: saveSearchSuggestResp,                       
	                    success: saveSearchSuggestResp,
	                    jsonpCallback:"saveSearchSuggestResp"
	                }); 
	                setTimeout(function(){
	                    document.location=searchUrl;
	                }, 300);
	                return false;
	            }catch(e){}             
	        }
	        function removeSpChar(str){
	          if(str!=null && str.length>0){
	              str = str.replace(/'/gm, ""); 
	              str = str.replace(/"/gm, ""); 
	              str = str.replace(/--/gm, ""); 
	              str = str.replace(/</gm, "");
	              str = str.replace(/=/gm, ""); 
	              str = str.replace(/\?/gm, "");
	              str = str.replace(/\*/gm, ""); 
	              str = str.replace(/>/gm, "");
	              str = str.replace(/\\/gm, "");
	              str = str.replace(/\;/gm, ""); 
	              str = str.replace(/\//gm, ""); 
	              str = str.replace(/&/gm, ""); 
	              str = str.replace(/(%00)/gm, "");           
	              str = str.replace(/(\r)/gm, "");        
	              str = str.replace(/(\n)/gm, "");
	              str = str.replace(/%/gm, "");       
	              str = str.replace(/\+/g, " ");       
	          }
	          return str;
	        }
	        function initSaveSearchSuggest(){
	            if(!options.disableSaveSearchSuggest){
	                $results.delegate(".end_search_link", "click", saveSearchSuggest);  
	            }
	        }
	        function saveSearchSuggestResp(respObj){
	            //dont do anything let it go
	        }
	        function searchInitiateCall(q, hovered,termType){
	        	itemTermHovered.boolean = hovered || false;
	        	q = removeSpChar(q)//q.replace(/[\n\r]/g, '');
	           try{ 
	            if (q == 'search verizonwireless.com') {
	                return;
	            }
	            var inputData = {"searchTerm":q};
	               addSearchLImg();
	            if(cacheSearch[q]){

	            	setTypeAheadData(cacheSearch[q])
	            }else{

	              $.ajax({
	                    jsonp:false,
	                    url: options.typeAheadUrl+encodeURIComponent(inputData.searchTerm)+"*&reqType=TypeAhead&flyparam="+termType,
	                    data: inputData,
	                    dataType: 'jsonp',  
	                    type: 'GET',
	                    cache: false,
	                    timeout: 4000,
	                    error: errorPopulateSearch,                     
	                    success: setTypeAheadData,
	                    jsonpCallback:"setTypeAheadData"
	                });
	            }
	            }catch(e){}
	                
	        }       
	         
	        function errorPopulateSearch(XMLHttpRequest, textStatus, errorThrown){  
	            removeSearchLImg();
	            vzw_gnjq("#vgn_globalNavContainer").find(".gn-typeahead-search").hide(); 
	            // $typeAheadOverlay.hide(); //Hides it when preparing to rendering - confusing UX
	        }
	        
	        function setTypeAheadData(data,textStatus){
				            var q = (!itemTermHovered.boolean) ? $.trim($input.val()) : itemTermHovered.term;
	            q = removeSpChar(q);

	            if(itemTermHovered.boolean && vzw_gnjq.isEmptyObject(data.products)) {
	            	data = cacheSearch[$.trim($input.val())]
	            }
	            
	            try{
	            	
	            	cacheSearch[q] = data;
	                parseSearchData(data,q);                    
			displayItems(itemSuggTerms, itemRelaTerms, itemTiles, q, itemTermHovered);						
	            }catch(e){}
	            removeSearchLImg(); 
	        }
	        
	        function removeLoginUrl(loginUrl, url){
	            try{
	                if(url.indexOf(loginUrl)>=0){
	                    url = url.replace(loginUrl, "");
	                    url = unescape(url);
	                }
	            }catch(e){}
	            return url;
	        }
	        function decode(encoded) {
	            var div = document.createElement("div");
	            div.innerHTML = encoded;
	            var decoded = div.firstChild.nodeValue;
	            return decoded;
	        }
	        function roundStars(val) {
	                if (val == 0) {return val;}
	                if (typeof val == 'undefined') {return 0;}
	                var str = Math.round(val * 2) / 2;
	                str = str + " ";
	                str = str.replace(".","-"); 
	                str = str.replace(" ",'');
	                return str;
	        }
	        function roundReviews(val) {
	                if (typeof val == 'undefined') {return 0;}
	                return val;
	        }
	
	        RegExp.escape = function(str) 
	        {
	          var specials = /[.*+?|()\[\]{}\\$^]/g; // .*+?|()[]{}\$^
	            return str.replace(specials, "\\$&");
	        }
	
	        function highlightTerms(input, term) {
	                var regex = new RegExp("(" + RegExp.escape(input) + ")", "gi");
	                 return term.replace(regex, "<strong>$1</strong>");
	        }
	        function parseSearchData(data,q){
	           
	            var supre = new RegExp(q, "ig");
	            if(data){                   
	            	itemSuggTerms = new Array();
	            	itemRelaTerms = new Array();
	                itemTiles = new Array();
	                autosuggestBannerData = {};
	                autosuggestBanner = false;
	                var searchItemExists = false;
	                var tilePosition = 0;
	                if(data.adBanner && !$.isEmptyObject(data.adBanner)){
	                	autosuggestBanner = true;
	                	autosuggestBannerData.imageLink = data.adBanner.imageUrl;
	                	autosuggestBannerData.targetLink = data.adBanner.linkLocation + data.adBanner.campaign_code_top;
	                	autosuggestBannerData.displayText = data.adBanner.displayText;
	                	autosuggestBannerData.bgColor = '#' + data.adBanner.bgColor;

	                } 
					if($.isEmptyObject(data.products) && $.isEmptyObject(data.adBanner) && $.isEmptyObject(data.summary))
	                {
	                	//$typeAheadOverlay.hide();//hide the overlay when product,summary and adBanner is empty 
	                }
	                if (data.products) {
	                    var sugProds = data.products;
	                    if (sugProds.devices) {
	                        var devices = sugProds.devices;
	                        if(devices.length > 0)  {
	                            for (var j=0; j < devices.length; j++){
	                            	var itemHtml = '<li class=\'gn-typeahead-template-device\'><a class=\'end_search_link\' searchTerm=\"'+ q +'\"    search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(devices[j].name)+"|Devices"+'\" style=\'height:100%\' vgn_cat=\'P\'  vgn_search_link_text=\''+decode(devices[j].name)+'\' href=\''+ devices[j].url+'\' ><img src=\''+devices[j].img_url+'\' alt=\''+decode(devices[j].img_alt)+'\'><p class="gn-typeahead-name">'+ decode(devices[j].name)+'</p>';
	                            	itemHtml += '<p class="gn-typeahead-rating"><span class="mox-star-rating mox-star-rating-'+ roundStars(devices[j].rate)+'"></span>('+ roundReviews(devices[j].reviewCount)+')</p>';
	                            	if(devices[j].isComingSoon == '1') {
	                            		itemHtml += '<p class="gn-typeahead-coming-soon">Coming Soon</p>';
	                            	} else {
	                        	        if (devices[j].isPrepaid && devices[j].isPrepaid == "true"){
	                        	        	if(devices[j]["product.mapOfferText"]!== undefined && devices[j]["product.mapOfferText"] !== null && devices[j]["product.mapOfferText"] !== ""){
			                        			itemHtml += '<p class="gn-typeahead-price strikethrough"  aria-label=\"Pre Pay price $'+devices[j].price+' Rating '+roundStars(devices[j].rate)+' out of 5 stars with '+roundReviews(devices[j].reviewCount)+' reviews\"><strong>$'+ devices[j].price+'</strong> Pre Pay Price</p>';
			                        		}else{
			                        			itemHtml += '<p class="gn-typeahead-price"  aria-label=\"Pre Pay price $'+devices[j].price+' Rating '+roundStars(devices[j].rate)+' out of 5 stars with '+roundReviews(devices[j].reviewCount)+' reviews\"><strong>$'+ devices[j].price+'</strong> Pre Pay Price</p>';
			                        		}
	                        	        } else if (devices[j].isEdgePrice && devices[j].isEdgePrice == "true"){
	                        	        	if(devices[j].mapOfferText!== undefined && devices[j].mapOfferText !== null && devices[j].mapOfferText !== ""){
			                        			itemHtml += '<p class="gn-typeahead-price strikethrough"  aria-label=\"on Device Payment $'+devices[j].price+' Rating '+roundStars(devices[j].rate)+' out of 5 stars with '+roundReviews(devices[j].reviewCount)+' reviews\"><strong>$'+ devices[j].price+'/mo</strong> on Device Payment</p>';
			                        		}else{            			
	                        	        		itemHtml += '<p class="gn-typeahead-price"  aria-label=\"on Device Payment $'+devices[j].price+' Rating '+roundStars(devices[j].rate)+' out of 5 stars with '+roundReviews(devices[j].reviewCount)+' reviews\"><strong>$'+ devices[j].price+'/mo</strong> on Device Payment</p>';
			                        		}
	                        	        } else {
			                        		if(devices[j]["product.mapOfferText"]!== undefined && devices[j]["product.mapOfferText"] !== null && devices[j]["product.mapOfferText"] !== ""){
			                        			itemHtml += '<p class="gn-typeahead-price strikethrough"  aria-label=\"Price with 2 year contract $'+devices[j].price+' Rating '+roundStars(devices[j].rate)+' out of 5 stars with '+roundReviews(devices[j].reviewCount)+' reviews\"><strong>$'+ devices[j].price+'</strong> with 2 year contract</p>';
			                        		}else{
			                        			if (devices[j].isRestrictedPrice && devices[j].isRestrictedPrice == "true") {
			                        				itemHtml += '<p class="gn-typeahead-price" aria-label=\"Price with 2 year contract $' + devices[j].price +' Rating ' + roundStars(devices[j].rate) + ' out of 5 stars with ' + roundReviews(devices[j].reviewCount) + ' reviews\"><strong>$' + devices[j].price + '</strong></p>';
			                        			} else {
			                        				itemHtml += '<p class="gn-typeahead-price"  aria-label=\"Price with 2 year contract $'+devices[j].price+' Rating '+roundStars(devices[j].rate)+' out of 5 stars with '+roundReviews(devices[j].reviewCount)+' reviews\"><strong>$'+ devices[j].price+'</strong> with 2 year contract</p>';
			                        			}
			                        		}
	                        	        }
	                        	        
	                        	        // itemHtml += '<p class="gn-typeahead-rating"><span class="mox-star-rating mox-star-rating-'+ roundStars(devices[j].rate)+'"></span></p>';
	                            	}
	                            	itemHtml += '</a></li>';
	                            	itemTiles = itemTiles.concat(itemHtml);
	                            }   
	                        }
	                    }
	                    if (sugProds.accessories) {
						           	var accessories = sugProds.accessories;
	                        if (accessories.length > 0) {
	                        	for (var j=0; j < accessories.length; j++) {
	                        		var itemHtml = '<li class=\'gn-typeahead-template-accessory\'><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(accessories[j].name)+"|Accessories"+'\" style=\'height:100%\' vgn_cat=\'V\' vgn_search_link_text=\''+decode(accessories[j].name)+'\' href=\''+ accessories[j].url+'\' ><img src=\''+accessories[j].img_url+'\' alt=\''+decode(accessories[j].img_alt)+'\'/><p class="gn-typeahead-name">'+ decode(accessories[j].name)+'</p>';
	                        		if(accessories[j].isComingSoon == '1') {
	                        			itemHtml += '<p class="gn-typeahead-coming-soon">Coming Soon</p>';
	                        		} else {
	                        			
		                        		if(accessories[j]["product.mapOfferText"]!== undefined && accessories[j]["product.mapOfferText"] !== null && accessories[j]["product.mapOfferText"] !== ""){
		                        			itemHtml += '<p class="gn-typeahead-rating" ><span class="mox-star-rating mox-star-rating-'+ roundStars(accessories[j].rate)+'"></span>('+ roundReviews(accessories[j].reviewCount)+')</p><p class="gn-typeahead-price" aria-label=\"Price $'+accessories[j].price+' Rating '+roundStars(accessories[j].rate)+' out of 5 stars with '+roundReviews(accessories[j].reviewCount)+' reviews\"><strong class="strikethrough">$'+ accessories[j].fullRetailPrice+'</strong></p><p class="latestPrice">'+accessories[j]["product.mapOfferText"]+'</p>';
		                        		}
										else if(accessories[j].fullRetailPrice!== undefined && accessories[j].fullRetailPrice!== null && accessories[j].fullRetailPrice!== ""){
		                        			itemHtml += '<p class="gn-typeahead-rating" ><span class="mox-star-rating mox-star-rating-'+ roundStars(accessories[j].rate)+'"></span>('+ roundReviews(accessories[j].reviewCount)+')</p><p class="gn-typeahead-price" aria-label=\"Price $'+accessories[j].price+' Rating '+roundStars(accessories[j].rate)+' out of 5 stars with '+roundReviews(accessories[j].reviewCount)+' reviews\"><strong class="strikethrough">$'+accessories[j].fullRetailPrice+'</strong><span class="latestPrice">$'+accessories[j].price+'</span></p>';
		                        		}else{
		                        			itemHtml += '<p class="gn-typeahead-rating" ><span class="mox-star-rating mox-star-rating-'+ roundStars(accessories[j].rate)+'"></span>('+ roundReviews(accessories[j].reviewCount)+')</p><p class="gn-typeahead-price" aria-label=\"Price $'+accessories[j].price+' Rating '+roundStars(accessories[j].rate)+' out of 5 stars with '+roundReviews(accessories[j].reviewCount)+' reviews\"><strong>$'+ accessories[j].price+'</strong></p>';
		                        		}
	                        			
	                        			// itemHtml += '<p class="gn-typeahead-price" aria-label=\"Price $'+accessories[j].price+' Rating '+roundStars(accessories[j].rate)+' out of 5 stars with '+roundReviews(accessories[j].reviewCount)+' reviews\"><strong>$'+ accessories[j].price+'</strong></p><p class="gn-typeahead-rating" ><span class="mox-star-rating mox-star-rating-'+ roundStars(accessories[j].rate)+'"></span></p>';
	                        		}
	                        		itemHtml += '</a></li>';
	                        		itemTiles = itemTiles.concat(itemHtml);
	                        	}
	                        }
	                    }
						
	                    if (sugProds.myverizon) {
	                    	var myverizon = sugProds.myverizon;
	                    	if (myverizon.length > 0 ){
	                    		for (var j=0; j< myverizon.length; j++){
	                    			itemTiles = itemTiles.concat('<li class="gn-typeahead-template-blurb"><a class=\'end_search_link\' searchTerm=\"'+ q +'\"  search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(myverizon[j].name)+"|Community"+'\" style=\'height:100%;\' vgn_cat=\'C\' vgn_search_link_text=\''+decode(myverizon[j].name)+'\' href=\''+myverizon[j].url+'\' ><p class="vgn-icon-myverizonImg"></p><p class=\'gn-typeahead-blurb-title\'>My Verizon:</p><p class=\'gn-typeahead-blurb-copy\'>'+decode(myverizon[j].name)+'</p></a></li>');
	                    		}
	                    	}
	                    }
						
	                    if (sugProds.support) {
	                        var supportItems = sugProds.support;
	                        if (supportItems.length >0) {
	                        	for (var j=0; j < supportItems.length; j++) {
	                        		if(supportItems[j].img_url && supportItems[j].img_url!=''){
	                        			if(supportItems[j].video_indi && supportItems[j].video_indi=="video")
										{	itemTiles = itemTiles.concat('<li class=\'gn-typeahead-template-blurb\'><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(supportItems[j].name)+"|Support"+'\"  style=\'height:100%\' vgn_cat=\'S\' vgn_search_link_text=\''+decode(supportItems[j].name)+'\' href=\''+supportItems[j].url+'\' ><div class=\'video-play-icon circle\'><div class=\'video-play-icon triangle\'></div></div><img src=\''+supportItems[j].img_url+'\'/><p class=\'gn-typeahead-blurb-title\'>'+supportItems[j].supportMark+'</p><p class=\'gn-typeahead-blurb-copy\'>'+decode(supportItems[j].name)+'</p></a></li>');								
										}
										else
										{
											itemTiles = itemTiles.concat('<li class=\'gn-typeahead-template-blurb\'><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(supportItems[j].name)+"|Support"+'\"  style=\'height:100%\' vgn_cat=\'S\' vgn_search_link_text=\''+decode(supportItems[j].name)+'\' href=\''+supportItems[j].url+'\' ><img src=\''+supportItems[j].img_url+'\'/><p class=\'gn-typeahead-blurb-title\'>'+supportItems[j].supportMark+'</p><p class=\'gn-typeahead-blurb-copy\'>'+decode(supportItems[j].name)+'</p></a></li>');	
										}
										
	                        		}else{
	                        			itemTiles = itemTiles.concat('<li class=\'gn-typeahead-template-blurb\'><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(supportItems[j].name)+"|Support"+'\"  style=\'height:100%\' vgn_cat=\'S\' vgn_search_link_text=\''+decode(supportItems[j].name)+'\' href=\''+supportItems[j].url+'\' ><p class="vgn-icon-supportImg"><b>&#57377;</b></p><p class=\'gn-typeahead-blurb-title\'>'+supportItems[j].supportMark+'</p><p class=\'gn-typeahead-blurb-copy\'>'+decode(supportItems[j].name)+'</p></a></li>');
	                        		}
	                        	}
	                        }
	                    }
	                    
	                    if (sugProds.business) {
	                        var business = sugProds.business;
	                        if (business.length > 0 ){
	                            for (var j=0; j< business.length; j++){
	                                itemTiles = itemTiles.concat('<li class="gn-typeahead-template-blurb"><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(business[j].name)+"|Business"+'\" style=\'height:100%\' vgn_cat=\'Q\' vgn_search_link_text=\''+decode(business[j].name)+'\' href=\''+business[j].url+'\' ><p class="vgn-icon-businImg"><b>&#57370;</b></p><p class=\'gn-typeahead-blurb-title\'>Business:</p><p class=\'gn-typeahead-blurb-copy\'>'+decode(business[j].name)+'</p></a></li>');
	                            }
	                        }
	                    }
	
	                    if (sugProds.community) {
	                    	var community = sugProds.community;
	                    	if (community.length > 0 ){
	                    		for (var j=0; j< community.length; j++){
	                    			if(community[j].img_url && community[j].img_url!=''){
	                    				itemTiles = itemTiles.concat('<li class="gn-typeahead-template-blurb"><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(community[j].name)+"|Community"+'\" style=\'height:100%;\' vgn_cat=\'C\' vgn_search_link_text=\''+decode(community[j].name)+'\' href=\''+community[j].url+'\' ><img src=\''+community[j].img_url+'\'/><p class=\'gn-typeahead-blurb-title\'>Community:</p><p class=\'gn-typeahead-blurb-copy\'>'+decode(community[j].name)+'</p></a></li>');
	                    			}else{
	                    				itemTiles = itemTiles.concat('<li class="gn-typeahead-template-blurb"><a class=\'end_search_link\' searchTerm=\"'+ q +'\"  search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(community[j].name)+"|Community"+'\" style=\'height:100%;\' vgn_cat=\'C\' vgn_search_link_text=\''+decode(community[j].name)+'\' href=\''+community[j].url+'\' ><p class="vgn-icon-communityImg"><b>&#58880;</b></p><p class=\'gn-typeahead-blurb-title\'>Community:</p><p class=\'gn-typeahead-blurb-copy\'>'+decode(community[j].name)+'</p></a></li>');
	                    			}
	                    		}
	                    	}
	                    }	
	                    
	                    if (sugProds.multisource) {
	                        var multisource = sugProds.multisource;
	                        if (multisource.length > 0 ){
	                            for (var j=0; j< multisource.length; j++){
	                            	itemTiles = itemTiles.concat('<li class="gn-typeahead-template-blurb"><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(multisource[j].name)+"|MultiSource"+'\" style=\'height:100%;\' vgn_cat=\'C\' vgn_search_link_text=\''+decode(multisource[j].name)+'\' href=\''+multisource[j].url+'\' ><img src=\''+multisource[j].img_url+'\'/><p class=\'gn-typeahead-blurb-title\'></p><p class=\'gn-typeahead-blurb-copy\'>'+decode(multisource[j].name)+'</p></a></li>');
	                            }
	                        }
	                    }
	
	                    if (sugProds.seeAll) {
	                        var seeAll = sugProds.seeAll;
	                        if (seeAll.length > 0 ){
	                            for (var j=0; j< seeAll.length; j++){
	                                itemTiles = itemTiles.concat('<li class="gn-typeahead-template-seeall"><a class=\'end_search_link\' searchTerm=\"'+ q +'\" search-position=\"'+ ++tilePosition +'\"  content-value=\"'+decode(seeAll[j].name)+"|See All"+'\" style=\'height:100%\' vgn_cat=\'L\' vgn_search_link_text=\''+decode(seeAll[j].name)+'\' href=\''+seeAll[j].url+'\' ><img src=\''+seeAll[j].img_url+'\'/><p>See All</p><p>'+decode(seeAll[j].name)+'</p></a></li>');
	                            }
	                        }
	                    }
	                }
	                if(data.summary){
	                	var summary = data.summary;
	                	if(summary.SuggestedTerms){
	                		if(summary.SuggestedTerms.length > 0){ // Only add the section if we have data.
	                			searchItemExists = true;
	                			terms = new Array();
	                			for(var j=0;j < summary.SuggestedTerms.length; j++){
	                				terms.push(summary.SuggestedTerms[j].name);
	                				gnlin_searchTerms = terms.toString();
	                			}
	                			for(var j=0;j < summary.SuggestedTerms.length; j++){
	                				itemSuggTerms = itemSuggTerms.concat('<a vgn_cat=\'T\'  class=\'end_search_link\' data-term-type="suggested" vgn_search_link_text=\''+summary.SuggestedTerms[j].name+'\' href=\''+ summary.SuggestedTerms[j].href+'\' ><span>'+highlightTerms(q,summary.SuggestedTerms[j].name)+'</span></a>');
	                			}
	                		}
	                	}
	                	if(summary.RelatedTerms){
	                		if(summary.RelatedTerms.length > 0){ // Only add the section if we have data.
	                			searchItemExists = true;
	                			for(var j=0;j < summary.RelatedTerms.length; ++j){
	                				itemRelaTerms = itemRelaTerms.concat('<a class=\'end_search_link\' data-term-type="related" vgn_search_link_text=\''+summary.RelatedTerms[j].name+'\' href=\''+ summary.RelatedTerms[j].href+'\' ><span>'+highlightTerms(q,summary.RelatedTerms[j].name)+'</span></a>');
	                			}
	                		}
	                	}
	                }
	            }
	        }
	        
	        
	        function adjustTypeAhead(numTiles){
	        	var fireFoxPixel2 = 0
	            if (numTiles == 0) {
	                vzw_gnjq(".gn-typeahead-search").css("width",249);  
	                vzw_gnjq(".gn-typeahead-search").css("left",0);
	                vzw_gnjq(".gn-typeahead-search .g-typeahead-search-results").css("display","none");
	                vzw_gnjq(".gn-typeahead-search").css("left","-24px");
	                // $typeAheadOverlay.hide(); ??? when tyles changes length
	                return;
	            }
	            if (numTiles > 6) {numTiles = 6;}
	            // if (numTiles <= 4 && fireFoxPixel > 0) {fireFoxPixel2 = -4}//very inneficient, but quick fix for now 
	            // else if(numTiles <= 6 && numTiles > 4 && fireFoxPixel > 0){fireFoxPixel2 = -2} 
	            // else{fireFoxPixel2 = 0}
	            var padd1Col = (numTiles>0 && numTiles<=2 ? 1 : 4);
	            var bigWidth = (Math.ceil(numTiles/2)*235) + padd1Col + fireFoxPixel;
	            var lft = ((Math.floor((6-numTiles)/2)*235)) - padd1Col - 728;
	
	            productsView = vzw_gnjq(".gn-typeahead-search .g-typeahead-search-results ul")
	            if($(window).width()<860){	         
					productsView.children().css("width","49.9%");
					vzw_gnjq(".gn-typeahead-search").css("width",$(window).width() + fireFoxPixel );//old width calculation causing varying widths bigWidth+249);                             
		            var k =
					vzw_gnjq(".gn-typeahead-search").css('left','-'+$('.vgnSearchForm').offset().left+'px');
		            vzw_gnjq(".gn-typeahead-search .g-typeahead-search-results").css("width","75%");
		           // vzw_gnjq(".gn-typeahead-search .g-typeahead-search-terms").css("width","25%");
				}else{
					productsView.children().css("width","33.33%");
		            vzw_gnjq(".gn-typeahead-search").css("width",940 + fireFoxPixel);//old width calculation causing varying widths bigWidth+249);                             
		            vzw_gnjq(".gn-typeahead-search").css("left",-732);// old calculation was causing inconsisten placement lft);
		            vzw_gnjq(".gn-typeahead-search .g-typeahead-search-results").css("width","75%");//bigWidth + fireFoxPixel);
				}
	            
	        }
	        
		function displayItems(itemSuggTerms,itemRelaTerms,tiles,q, hovered) {			
			if (!itemSuggTerms & !itemRelaTerms & !tiles){
				return;
			}
	            
			if (!itemSuggTerms.length & !itemRelaTerms.length & !tiles.length) {
				$results.hide();
				$typeAheadOverlay.hide(); // Removes it when there is no response.
				return;
			}
			var html = '';
			for (var i = 0; i < tiles.length; i++) {
				html += tiles[i];
			}
			if(tiles.length%2 == 1) {
				html += '<li class="empty"></li>';
			}
	        if($results.find(".g-typeahead-search-results")){ 
	        	$results.find(".g-typeahead-search-results").remove();
	        }

	        if (autosuggestBanner && autosuggestBannerEnabled){
	        	var bannerHTML = '<div class="g-typeahead-banners"><a id="adBanner" href="' + autosuggestBannerData.targetLink + '" style="background-color:'+autosuggestBannerData.bgColor+'; display:block; "><img style="margin-bottom:-7px;" alt="' + autosuggestBannerData.displayText + '" src="' + autosuggestBannerData.imageLink + '" /></a></div>'
	        		
	        	var typeaheadSearchResults = html =  '<div class=\"g-typeahead-search-results\" aria-automatic="true" ><h3 style=\' font-size:16px; padding-top:2px; padding-left:3px; display:none;\'>Suggested Search</h3><ul aria-automatic="true" role="alert">' + html + '</ul>' + bannerHTML+ '</div>';	
	        }else{
	        	var typeaheadSearchResults = html =  '<div class=\"g-typeahead-search-results\" aria-automatic="true" ><h3 style=\' font-size:16px; padding-top:2px; padding-left:3px; display:none;\'>Suggested Search</h3><ul aria-automatic="true" role="alert">' + html + '</ul></div>';	
	        }
			
			html +=  '<div class=\"g-typeahead-search-terms\" aria-automatic="true">';
			var termCount = 0;
			if(itemSuggTerms.length>0 && !hovered.boolean) {
				termCount++;
				html += '<ul aria-automatic="true" role="alert">';
				for(var i = 0; i < itemSuggTerms.length; i++) {
					html += '<li class="gn-typeahead-template-link">' + itemSuggTerms[i] + '</li>';
				}
				html += '</ul>';
			}
			if(itemRelaTerms.length>0 && !hovered.boolean) {
				termCount++;
				html += '<h3 style=\'font-size:16px; padding-top:2px;\''+(termCount>=2 ? ' class=\'gn-typeahead-multiple-terms\'' : '')+'>Related Search</h3><ul aria-automatic="true" role="alert">';
				for(var i = 0; i < itemRelaTerms.length; i++) {
					html += '<li class="gn-typeahead-template-link">' + itemRelaTerms[i] + '</li>';
				}
				html += '</ul>';
			}
			/*if(termCount <= 0 && !hovered.boolean) {
				html += '<h3 style=\'font-size:16px; padding-top:2px;\'>Suggested Search</h3>';
			}*/
			html += '</div>';
	
			//resetPosition();
			if(!hovered.boolean){
				$results.html(html).show();
			}else{
				$results.prepend(typeaheadSearchResults).show();
			}

	        $a_adBanner = $("#adBanner") || null;
	        if($a_adBanner !== null && $a_adBanner.length){
				$a_adBanner.off().on('click', function(){
	                s.linkTrackVars = 'prop11,eVar31,prop13,prop17'; 
	                s.linkTrackEvents = 'None'; 
	                s.prop11 = s.eVar31 = "Search:Typeahead:Banner:"+autosuggestBannerData.displayText;
	                s.prop13 = s.pageName +"|" +s.prop11;
	                s.prop17 = location.search;
	                s.tl(this, 'o',"Search Typeahead Banner Click"); 

		        });
	        }
			$typeAheadOverlay.show(); // Renders here for first time everytime user finish typing
			var $li_searchTerms = $results.find("li.gn-typeahead-template-link");
			if(searchOnMouseover){
				$li_searchTerms.off().on("mouseenter", function(e){
					var $this = $(this);
					var innerText = removeSpChar($this.find("a").text()); 
					var timer = (!cacheSearch.hasOwnProperty(innerText)) ? 200 : 0; 

					if(!hoverTimeoudId._value){
						hoverTimeoudId._value = window.setTimeout(function() {
					        hoverTimeoudId._value = null; // EDIT: added this line
							//vzgn_search.searchHBX("AutoSuggest","Appl","1") ?? Sitecatalyst
							if( $this.hasClass('gn-typeahead-template-link') ){
								$li_searchTerms.removeClass('active'); 
								$this.addClass('active'); 
					        	itemTermHovered.term = innerText || "";
					        	$termType = $this.find('a').attr('data-term-type');
								searchInitiateCall(innerText, true, $termType); 
								
							}
						}, timer);
					}
				}).on("mouseleave", function(){
					if (hoverTimeoudId._value) {
				        window.clearTimeout(hoverTimeoudId._value);
				        hoverTimeoudId._value = null;
				    }
				});
			}

			adjustTypeAhead(tiles.length);          
	        $(window).resize(function(){
				
				adjustTypeAhead(tiles.length);
			})
			$results.find('>ul').children('li').mouseover(function() {
				$results.find('>ul').children('li').removeClass(options.selectClass);
				$(this).addClass(options.selectClass);
			}).mouseout(function() {
				$results.find('>ul').children('li').removeClass(options.selectClass);
			}).click(function(e) {
				//e.preventDefault();  // TODO NEED TO RESEARCH IF WE CAN DISABLE DEFAULT EVENT PROPOGATION
				//e.stopPropagation(); // TODO NEED TO RESEARCH IF WE CAN DISABLE DEFAULT EVENT PROPOGATION
				selectCurrentResult();
			}); 
	        }


	        function populateAutoComplete(data)
	        {
	            var resultString="";
	            if(data)
	            {
	                 for (var key in data) { 
	                    if (data.hasOwnProperty(key)) { 
	                    resultString=resultString+ data[key]+"\n";
	                    } 
	                 }
	            }
	            return resultString.trim();
	        }
	        
	    
	        function selectCurrentResult() {
	        
	            $currentResult = getCurrentResult();
	        
	            if ($currentResult) {
	                $input.val($currentResult.text());
	                $results.hide();
	                // $typeAheadOverlay.hide(); // Removes when input number is less than 3
	                
	                if (options.onSelect)
	                    options.onSelect.apply($input[0]);
	                    
	            }
	        
	        }
	        
	    };
	
		$.fn.suggestSearchVzwGN = function(source, options) {
	
			if(options.disable){
				return;
			}
		        
			options = options || {};
			options.source = source;
			options.delay = options.delay || 300;           
			options.searchURL = options.searchURL || '';
			options.saveSearchSuggestURL = options.saveSearchSuggestURL || '';  
			options.resultsClass = options.resultsClass || 'gn-typeahead-search';
			options.selectClass = options.selectClass || 'vgn_ac_over';
			options.matchClass = options.matchClass || 'vgn_ac_match';
			options.minchars = options.minchars || 3;
			options.delimiter = options.delimiter || '\n';
			options.onSelect = options.onSelect || false;
			options.maxCacheSize = options.maxCacheSize || 65536;
		
			this.each(function() {
				new $.suggestSearchVzwGN(this, options);
			});
	
			return this;
		};
		    
	})(vzgnsearch_jQuery);

	vzgn_search={
		searchDisableFlag:vzgn_searchConf.searchDisable,
		saveSearchSuggDisableFlag:vzgn_searchConf.searchSuggestSaveDisable,
		searchDelay:vzgn_searchConf.searchDelay,
		gnUnAuthSvcUrl:vzgn_searchConf.gnusuURL,
		init: function (){
			try{      		
				if((vzgn_searchConf!=null)&&(vzgnsearch_jQuery!=null) && (!vzgn_search.searchDisableFlag)){
					vzgnsearch_jQuery(document).ready(function() {
					
						var gnSearchUrl = vzgn_search.gnUnAuthSvcUrl+'/Search.action';
						if(vzgn_searchConf.gnSearchURL!=null){
							gnSearchUrl = vzgn_searchConf.gnSearchURL;
						}
						var gntypah = vzgn_searchConf.gntypah;
						vzgnsearch_jQuery("#vgn_q").suggestSearchVzwGN("",
								{onSelect: function() {},			
								 searchURL: gnSearchUrl, 
								 typeAheadUrl: gntypah,
								 saveSearchSuggestURL:vzgn_search.gnUnAuthSvcUrl+'/saveSearchSuggestion.action',
								 disableSaveSearchSuggest:vzgn_search.saveSearchSuggDisableFlag,
								 delay: vzgn_search.searchDelay,
								 disable:vzgn_search.searchDisableFlag
							});
					});
				}
			}catch(e){}      	   	    
		},       	
		searchHbxStrip: function(a){ 
			a = a.split("|").join("");
			a = a.split("&").join(""); 
			a = a.split("'").join(""); 
			a = a.split("$").join(""); 
			a = a.split("%").join(""); 
			a = a.split("^").join("");
			a = a.split("\\").join(""); 
			a = a.split("/").join(""); 
			a = a.split("*").join(""); 
			a = a.split(":").join(""); 
			a = a.split("!").join(""); 
			a = a.split("<").join(""); 
			a = a.split(">").join(""); 
			a = a.split("~").join(""); 
			a = a.split(";").join(""); 
			a = a.split("®").join(""); 
			a = a.split("?").join(""); 
			a = a.split("+").join(" ");
			return a; 
		},
		searchHBX: function (category, q, flag){/*       	
			try{	
				if(typeof _hbLink != 'undefined'){
					var lid = vzgn_search.searchHbxStrip('//global//site+search//'+category+'//'+q+'//'+flag);
					_hbLink(lid.toLowerCase(), '');
				}
			}catch(e){} 
		*/},
		searchTilesHBX: function (category, q, flag, position, itemName){/*       	
			try{	
				if(typeof _hbLink != 'undefined'){
					var lid = vzgn_search.searchHbxStrip('//global//site+search//'+category+'//'+q+'//'+flag);
					s.eVar63 = s.prop68 = s.prop3 = s.eVar6 = q;
					s.eVar25 = itemName +"|"+category;
					s.prop4 = s.eVar26 = s.prop16 = "auto suggested hit"
					s.prop21 = s.eVar10 = "navigation";
					s.prop45 = s.eVar60 = position;
					s.events = 'event1,event20,event29'; 
					var s_code=s.t();if(s_code)document.write(s_code);
					_hbLink(lid.toLowerCase(), '');
					s.eVar63 = undefined;
					s.prop16 = undefined;
					s.prop6 = undefined;
					s.prop21 = s.eVar10 = undefined;
					s.prop68 = undefined;
				}
			}catch(e){}
		*/}
	};

	vzgn_search.init();

	(function(){
	    try{
	        var lazyLoadCSS = document.createElement('link');
	        lazyLoadCSS.rel = 'stylesheet';
	        lazyLoadCSS.href = vzgn_searchConf.gnscuURL+'/../../search/staticContent/dist/css/desktop-autosuggest.css';

	        var numOfLinkElements = document.getElementsByTagName('link').length;
	        var linkElements = document.getElementsByTagName('link')[numOfLinkElements-1];
	        linkElements.parentNode.insertBefore(lazyLoadCSS,linkElements);
	    }catch(e){};
	})();
}