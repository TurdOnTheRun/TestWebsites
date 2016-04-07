		
					
			
						
			
		
																																																																																																																																																					
																																																																															
																																																																																																																																																																																																																																			

										
	    
	

		
				
												
					
				
																																																																									
																																	
					

																													
		
	
				
												
					
				
																																																																																																															
																																	
																																																																																																									

																																												
		
	
							var grid = {
   hideMore : function(id) {
      $("#"+id+" .more-button").fadeOut(function() {
         $(this).remove();
      });
      $("#temp-script").remove();
   },
   showMore : function(_options) {
      var options = JSON.parse(decodeURIComponent(_options));
      if (options.type != "5min") {
         var page = parseInt($("#"+options.id).attr("data-page"))+1;
         $("#"+options.id).attr("data-page",page);
         options.query.page = page;
         if ( options.hasOwnProperty('slideshows') ) {
            options.slideshows.page = page;
         }
      }
      console.log(options);
      jQuery.ajax({data:{options:options},dataType:"html",method:"GET",url:"/grid-items"}).done(function(html) {
         if (html.length > 0) {
            $("#"+options.id+" .more-button").remove();
            if ($("#"+options.id+" .more-button").length > 0) {
               $("#"+options.id+" .more-button").before(html);
            } else {
               $("#"+options.id+" .body").append(html);
            }
         } else {
            $("#"+options.id+" .more-button").fadeOut(function() {
               $(this).remove();
            });
         }
      });
      $("#temp-script").remove();
   }
};

	