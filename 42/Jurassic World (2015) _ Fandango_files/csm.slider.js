$(document).ready(function() {
  (function($) {
    $.fn.slider = function(settings) {
	 	var version = "1.4.1; 6/16/2010";
      var config = {'red_ends_age': 1, 'green_begins_age': 2, 'age_recommendations': 2, 'image_path': 'images' };      
	  if (settings)
        $.extend(config, settings);
      
      var off = config.red_ends_age;
      var on = config.green_begins_age;
      var target = config.age_recommendations;
      var imgPath = config.image_path;
      var slash = "";
	  
      if (imgPath)
        slash = "/";
        
      if (off > 17)
        off = 17;
        
      if (on > 17)
        on = 20;
        
      if (target > 17)
        target = 17;
        
      if (target < 2)
        target = 2;
      
      var sliderContent = '<div id="sliderContainer"><div id="2" class="number">2</div><div id="3" class="number odd">&nbsp;</div><div id="4" class="number">4</div><div id="5" class="number odd">&nbsp;</div><div id="6" class="number">6</div><div id="7" class="number odd">&nbsp;</div><div id="8" class="number">8</div><div id="9" class="number odd">&nbsp;</div><div id="10" class="number">10</div><div id="11" class="number odd"></div><div id="12" class="number">12</div><div id="13" class="number odd"></div><div id="14" class="number">14</div><div id="15" class="number odd"></div><div id="16" class="number">16</div><div id="17" class="number odd"></div><div id="18" class="number">17</div><div id="19" class="number odd"></div><div id="agecolor" style="clear:both"><span id="color"><img id="age"src="http://images.fandango.com/images/global/shim.gif"/></span></div></div>'
      this.html(sliderContent);
     
      this.each(function() {
		$('#' + $(this).attr('id') + ' #agecolor' ).css('display','none');
        $('#' + $(this).attr('id') + ' #sliderContainer div').css('display','block');
        offOrIffy = 'off';
        
		if (off== 0) off = 1;
		if ((on== 0)&&(off>2)) on = 20;
		if (on== 0) on = 1;
		if (off== 0) on = 1;
		if (off > on) on = off+1;
		if ((on == off ) && (off == target)) off--;
        
	    if (off < 17) {
          for (i = 1; i < 20; i++) { 
            if (off < i)
              offOrIffy = 'iffy';
            $('#' + $(this).attr('id') + ' #sliderContainer #' + i).addClass(offOrIffy); 
          }
        }
        else {
          $('#' + $(this).attr('id') + ' #sliderContainer').addClass('notforkids');
          $('#' + $(this).attr('id') + ' #sliderContainer div').css('display', 'none');
        }
        
        for (i = on; i < 20; i++) { 
          $('#' + $(this).attr('id') + ' #sliderContainer #' + i).removeClass('iffy');
          $('#' + $(this).attr('id') + ' #sliderContainer #' + i).addClass('on'); 
        }
        
        targetValue = new Array();
        targetValue['number off'] = "target targetAgeOff";
        targetValue['number iffy'] = "target targetAgeIffy";
        targetValue['number on'] = "target targetAgeOn";
        targetValue['number odd off'] = "target targetAgeOff";
        targetValue['number odd iffy'] = "target targetAgeIffy";
        targetValue['number odd on'] = "target targetAgeOn";
		  
		  targetSpanClass = new Array();
        targetSpanClass['number off'] = "csm_off";
        targetSpanClass['number iffy'] = "csm_iffy";
        targetSpanClass['number odd on'] = "csm_on";
        targetSpanClass['number odd off'] = "csm_off";
        targetSpanClass['number odd iffy'] = "csm_iffy";
        targetSpanClass['number on'] = "csm_on";
        
		  targetAge = new Array();
        targetAge['2'] = -4;
        targetAge['3'] = 20;
        targetAge['4'] = 25;
        targetAge['5'] = 50;
        targetAge['6'] = 57;
        targetAge['7'] = 80;
        targetAge['8'] = 87;
        targetAge['9'] = 110;
        targetAge['10'] = 117;
        targetAge['11'] = 144;
        targetAge['12'] = 150;
        targetAge['13'] = 175;
        targetAge['14'] = 180;
        targetAge['15'] = 207;
        targetAge['16'] = 212;
        targetAge['17'] = 238;
        targetAge['18'] = 240;
        
        var qual = $('#' + $(this).attr('id') + ' #sliderContainer #' + target).attr('class');
        $('#' + $(this).attr('id') + ' #sliderContainer div').removeClass('target targetAgeOff targetAgeIffy targetAgeOn');
        $('#' + $(this).attr('id') + ' #sliderContainer #' + target).addClass(targetValue[qual]);
        
        if (off == target) {
		  		targetSpanClass[qual] = "csm_iffy"; // handle special case to match the calculated value in flash version
		   }
        $('#' + $(this).attr('id') + ' #agecolor').find('span#color').attr('class', targetSpanClass[qual]).css('display', 'block').css('left', targetAge[target] + 'px');
        $('#' + $(this).attr('id') + ' #agecolor').find('img#age').attr('class', 'csm_' + target).css('display','block');		  
		  
   	
			//  version
			$('#' + $(this).attr('id') + ' img#color').click(function(){
				$(document).keydown(function(e){ if (e.keyCode == 17) ctrl = true})
				$(document).keyup(function(){ctrl = false})
				if (ctrl) alert('   CSM Slider. Version: ' + version + '.\n\nÂ© Common Sense Media Inc. 2010. All rights reserved.')
				ctrl = false
			});		
    });
     
    };
  })(jQuery);
});