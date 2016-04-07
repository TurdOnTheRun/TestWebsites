// Fandango Content Wall
// This code assumes there is only one content wall in the page.

if(!Fandango) { var Fandango = new Object(); };

//Dependent to Fandango.hub
Fandango.contentWall = {
	initialize: function () {
   	 	$(".content-wall-more-container").appendTo($(".content-item-list").parent());
    	Fandango.contentWall.enableMasonry(".content-item-list",".content-item-container");
 		//Fandango.contentWall.updateContentWallMoreLink();

		$(".content-wall").on("click",".content-wall-more-link", function() {
		    var contentWallUrl = $(this).attr("href");
		    var thisParent = $(this).parent().siblings(".content-item-list");

			$.getJSON( contentWallUrl, function(data) {
				var newContent = '';
				$.each(data.contentItems, function(i, item) {				
			        newContent += '<div class="large-3 medium-4 small-6 columns content-item-container">';
			        newContent += '<div class="content-item type-' + item.contentType + '">';
			        newContent += '<a href="' + item.url + '" class="content-thumb-container">';
			        newContent += '<img class="content-thumb" src="' + item.imageUrl + '"'; 
					newContent += ' alt ="'+ item.altText +'" /></a>';
			        newContent += '<a href="' + item.url + '"class="content-item-headline dark">' + item.headline + '</a>';
			        newContent += '</div></div>';
				});

			    if(data.nextLink == "") {
	      			thisParent.siblings().find(".content-wall-more-link").hide();
			    }
				else {
	          		thisParent.siblings().find(".content-wall-more-link").attr("href", data.nextLink);
				}
	              
				var $addedContent = $(newContent);

				thisParent.append( $addedContent ).imagesLoaded(function() {
		          	thisParent.masonry('appended', $addedContent);
		          	//Adjust "Load mroe feature" button if it's overwrapped 
		          	Fandango.contentWall.updateContentWallMoreLink();
			    });

			});
	      	return false;
		});
		
		$( window ).resize(function() {
			Fandango.contentWall.updateContentWallMoreLink();
		});
	},
	updateContentWallMoreLink: function() {
    	setTimeout(function(){Fandango.contentWall.resizeContentWall($(".content-item-list").parent());}, 1000);     
	},
	enableMasonry : function(container,selector) {

		if(jQuery().masonry) {
         // masonry is loaded and available
	        $(container).imagesLoaded( function() {
		      $.when($(container).masonry({
		        itemSelector: selector,
		        transitionDuration: '0.2s',
		      }).delay(200)).then(Fandango.contentWall.updateContentWallMoreLink());//.masonry("stamp",".stamp");
		    });
		}

  },
	resizeContentWall: function(contentWallDiv) {
		var contentWallHeight = 0;
		// This var is to keep track of how tall the content wall is supposed to be. (can't rely on the height of $(".content-item-list").parent() )

		var addMoreLinkHeight = false;
		var lastRightContentCardHeight = 0;
		
		//Reset the bottom padding 
		contentWallDiv.css("padding-bottom", "0");
		if(contentWallDiv.find(".content-wall-more-container").length > 0){
			var contentWallMoreLinkPosition = contentWallDiv.find(".content-wall-more-container").position();

			// Go through each content item to check if the right column's content item is overwrapping with the "load more feature" button
			contentWallDiv.find(".content-item-container").each(function(){
				var contentItemPosition = $(this).position(); 
				var contentItemTotalHeight = contentItemPosition.top + $(this).outerHeight(true);
				var contentItemTotalWidth= contentItemPosition.left + $(this).outerWidth(true);

				if(contentItemTotalHeight > contentWallHeight){
				    contentWallHeight = parseInt(contentItemTotalHeight);
				}

				if((contentWallMoreLinkPosition.left + 15) < (parseInt(contentItemTotalWidth)) && parseInt(contentWallDiv.find('.content-item-list').outerHeight(true)) < (parseInt(contentItemTotalHeight + 60) ) ) {
					if(contentWallHeight > lastRightContentCardHeight) {
						lastRightContentCardHeight = contentWallHeight;
					}
					addMoreLinkHeight = true;
				}
			});   

			if( addMoreLinkHeight ) {
				var heightDif = 60 - (contentWallHeight - lastRightContentCardHeight);
				//Add the extra space for the button to move down so content items and the button won't overwrap.

				$(contentWallDiv).css("padding-bottom", heightDif + "px");
			}
		}
		
    
	}
};
$(function () {
	Fandango.contentWall.initialize();
});