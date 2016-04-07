 
 $(document).ready(function() {
	 
	 var $floatingbox = $('#community_buttons_floating');
	 
	 if($(window).width()>1250) $floatingbox.fadeIn(300);
	 
	 if($('#maincontent-container').length > 0)
		{
			$(window).resize(function(){
				 if($(window).width()>1250) $floatingbox.fadeIn(300);
				 else $floatingbox.fadeOut(300);
			});
			
			var bodyY = parseInt($('#maincontent-container').offset().top) - 20;
			$floatingbox.css('top', parseInt($('#maincontent-container').offset().top)  +'px');
			
			$(window).scroll(function () { 
				
			  var scrollY = $(window).scrollTop();
				var isfixed = $floatingbox.css('position') == 'fixed';
				if($floatingbox.length > 0){
					if ( scrollY > bodyY && !isfixed ) {
						$floatingbox.addClass('floating');
						$floatingbox.css('top','20px');
					} else if ( scrollY < bodyY && isfixed ) {
						$floatingbox.removeClass('floating');
						$floatingbox.css('top', parseInt($('#maincontent-container').offset().top)  +'px');
					}
					
				}
		
			});
		}
		
	});