/**
 * This JS is Included to every page on the website
 */

/**
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net
 */
var visitorCountry = '';
var cookieCountry = '';

(function($) {
  $.fn.hoverIntent = function(f, g) {
    var cfg = {
      sensitivity: 7,
      interval: 100,
      timeout: 0
    };
    cfg = $.extend(cfg, g ? {
      over: f,
      out: g
    } : f);
    var cX, cY, pX, pY;
    var track = function(ev) {
        cX = ev.pageX;
        cY = ev.pageY
      };
    var compare = function(ev, ob) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
        if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
          $(ob).unbind("mousemove", track);
          ob.hoverIntent_s = 1;
          return cfg.over.apply(ob, [ev])
        } else {
          pX = cX;
          pY = cY;
          ob.hoverIntent_t = setTimeout(function() {
            compare(ev, ob)
          }, cfg.interval)
        }
      };
    var delay = function(ev, ob) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
        ob.hoverIntent_s = 0;
        return cfg.out.apply(ob, [ev])
      };
    var handleHover = function(e) {
        var ev = jQuery.extend({}, e);
        var ob = this;
        if (ob.hoverIntent_t) {
          ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
        }
        if (e.type == "mouseenter") {
          pX = ev.pageX;
          pY = ev.pageY;
          $(ob).bind("mousemove", track);
          if (ob.hoverIntent_s != 1) {
            ob.hoverIntent_t = setTimeout(function() {
              compare(ev, ob)
            }, cfg.interval)
          }
        } else {
          $(ob).unbind("mousemove", track);
          if (ob.hoverIntent_s == 1) {
            ob.hoverIntent_t = setTimeout(function() {
              delay(ev, ob)
            }, cfg.timeout)
          }
        }
      };
    return this.bind('mouseenter', handleHover).bind('mouseleave', handleHover)
  }
})(jQuery);

//Array.index Of Prototype Declaration for IE old browsers
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
	     for (var i = (start || 0), j = this.length; i < j; i++) {
	         if (this[i] === obj) { 
	        	 return i; 
        	 }
	     }
	     return -1;
	}
}
//////////// GLOBAL FUNCTIONS //////////////////////


// needed by the autocomplete code
/*
 * Javascript implementation for PHP function str_replace
 */
function str_replace (search, replace, subject, count) 
{
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}

/*
 * Javascript implementation for PHP function preg_replace
 */
function preg_replace(pattern, pattern_replace, subject, limit) 
{
	// Perform a regular expression search and replace $0 $1 .. $N can be used in the pattern_replace for the matches

	if(limit === undefined){
		limit = -1;
	}

	var _flag = pattern.substr(pattern.lastIndexOf(pattern.charAt(0))+1),
	_pattern = pattern.substr(1,pattern.lastIndexOf(pattern.charAt(0))-1),
	reg = new RegExp(_pattern,_flag),
	rs = null,
	res = [],
	x = 0,
	y = 0,
	ret = subject;

	if(limit === -1){
		var tmp = [];
	
		do{
			tmp = reg.exec(subject);
			if(tmp !== null){
			res.push(tmp);
			}
		} while(tmp !== null && _flag.indexOf('g') !== -1)
	}
	else{
		res.push(reg.exec(subject));
	}

	for(x = res.length-1; x > -1; x--){//explore match
		tmp = pattern_replace;
	
		for(y = res[x].length - 1; y > -1; y--){
			tmp = tmp.replace('${'+y+'}',res[x][y])
			.replace('$'+y,res[x][y])
			.replace('\\'+y,res[x][y]);
		}
	ret = ret.replace(res[x][0],tmp);
	}
	return ret;
}

/*
 * Executes a top level function
 */
function mainfunc (func) 
{
    window[func].apply(null, Array.prototype.slice.call(arguments, 1));
}

//////////// END OF GLOBAL FUNCTIONS //////////////////////
/************** LAZY LOAD LIBRARY ************************/
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.7.0
 *
 */
(function($, window) {
    
    $window = $(window);
    
    $.fn.lazyload = function(options) {
        var settings = {
            threshold       : 100,
            failure_limit   : 20,
            event           : "scroll",
            effect          : "fadeIn",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null
        };
        
        if(options) {
            /* Maintain BC for a couple of version. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed; 
                delete options.effectspeed;
            }
            
            $.extend(settings, options);
        }

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if (0 == settings.event.indexOf("scroll")) {
            $(settings.container).bind(settings.event, function(event) {
                var counter = 0;
                elements.each(function() {
                    $this = $(this);
                    if (settings.skip_invisible && !$this.is(":visible")) return;
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                            /* Nothing. */
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                            $this.trigger("appear");
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });
            });
        }
                
        this.each(function() {
            var self = this;
            var $self = $(self);
            
            self.loaded = false;
            
            /* When appear is triggered load original image. */
            if($self.attr("src") != $self.data(settings.data_attribute)) {
	            $self.one("appear", function() {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />")
	                        .bind("load", function() {
	                            $self
	                                .hide()
	                                .attr("src", $self.data(settings.data_attribute))
	                                [settings.effect](settings.effect_speed);
	                            self.loaded = true;
	                            
	                            /* Remove image from array so it is not looped next time. */
	                            var temp = $.grep(elements, function(element) {
	                                return !element.loaded;
	                            });
	                            elements = $(temp);
	                            
	                            if (settings.load) {
	                                var elements_left = elements.length;
	                                settings.load.call(self, elements_left, settings);
	                            }
	                        })
	                        .attr("src", $self.data(settings.data_attribute));
	                };                
	            });
        	}

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 != settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });
        
        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            $(settings.container).trigger(settings.event);
        });
        
        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);
        
        return this;

    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.height() + $window.scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.width() + $window.scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && 
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0, container: window}) },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0, container: window}) },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0, container: window}) },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0, container: window}) },
        "in-viewport"    : function(a) { return !$.inviewport(a, {threshold : 0, container: window}) },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0, container: window}) },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0, container: window}) },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0, container: window}) }
    });
    
})(jQuery, window);
/***************** END OF LAZY LOAD LIBRARY ********************/

///// MAIN ON JQUERY ONLOAD ///////////////////
$(function() {
	
    // Lazyload of images
    $("img.lazy").lazyload();
    
    /// j_tabs
    $.each($('.active_tab'), function(key, obj){
		$(this).children('.tab_menu').children('span').children('a').first().addClass('current');
		
		$(this).children('.tab_menu').children('span').children('a').not('#more_tab').click(function(e){
			e.preventDefault();
				$(this).parent().parent().parent().children('.footer').children('.read_more').children('#more_organization').attr('href', ($(this).attr('href')));
				$(this).parent().parent().parent().children('.footer').children('.read_more').children('#more_organization').html('MORE ' + $(this).html() + ' FIGHTS');
				if($(this).attr('href') != '/country')
				{
				    $(this).parent().parent().parent().children('.footer').children('.read_more').show();
				} else {
					$(this).parent().parent().parent().children('.footer').children('.read_more').hide();
				}
				$(this).addClass('current');
				$(this).parent().children('a').not('#' + $(this).attr('id')).removeClass('current');
				$(this).parent().parent().parent().children('.content').not('#' + $(this).attr('id')).hide();
				$(this).parent().parent().parent().children('#' + $(this).attr('id')).show();
			
			
		});
		$(this).children('.content:eq(0)').show();
		$(this).children('.footer').children('.read_more').children('#more_organization').attr('href', $(this).children('.tab_menu').children().children('.current').attr('href'));
		
		
		$(this).children('.footer').children('.read_more').children('#more_organization').html('MORE ' + $(this).children('.tab_menu').children().children('.current').html() + ' FIGHTS');
	});
    
    // AllAccess dropdown Menu
    $('#navigation div.button.simple_dropdown.all-access').each(function(index, object){
    	function showMenu (){
    		var subNav = $('.subMenu', this);
    		var button = $('a', this);
    		var position = (button.position().left + ($(button).width() / 2)) + 12 - ($(subNav).width() / 2);
    		$(subNav).css('left', position);
    		$(subNav).fadeIn(200);
    	}
    	function hideMenu (){
    		var subNav = $('.subMenu', this);
    		$(subNav).fadeOut(200, function(){
    			$('a', $(this).parent()).removeClass('hover');
			});
    	}
    	var config = {
			sensitivity: 2,
	        interval: 100,
	        over: showMenu,
	        timeout: 300,
	        out: hideMenu
		};
    	$(object).hoverIntent(config);
    });
    
    /// article_detail
    // bind change function when they select another page
	$('select.article_dropdown').change(function(){
		window.location = this.value;
	});
	
	// autocomplete plugin
	var autoCompleteSize = 0;
	jQuery(".autocomplete").each(function() {
		var obj = jQuery(this);
		var jsonSource = obj.data('source');
		var template = jQuery(obj.data('template')).html();
		var format = jQuery(obj.data('template')).data('format');
		if (format == "") format = "{id}";
		
		//initial values for slave input
		obj.slaveInput = obj.data('slaveinput');
		obj.slaveFormat = jQuery(obj.data('template')).data('slaveformat');
		if ((obj.slaveInput != null) && (obj.slaveInput != "")) {
			if ((obj.slaveFormat == null) || (obj.slaveFormat=="")) obj.slaveFormat = "{id}";
		}
		
		//initial values for autocorrect
		if ((obj.data('autocorrect') != null) && (obj.data('autocorrect')==false)) {
			obj.autoCorrect = false;
		} else {
			obj.autoCorrect = true;
		}
		obj.lastText = obj.val();
		obj.lastValue = obj.val();
		obj.lastData = null;
		
		// Refresh data from slave inputs
		obj.refreshSlave = function() {
			//needs to update an slave input ?
			//get template info for entry selected
			var tmpId = obj.data('template');
			if ((obj.data('groupfield') != null) && (obj.data('groupfield') != '')) {
				if (obj.lastData != null) {
				    if (jQuery(obj.data('template') + "_" + obj.lastData[obj.data('groupfield')]).length > 0) {
				    	tmpId = obj.data('template') + "_" + obj.lastData[obj.data('groupfield')];
				    }
				}
			}
			if (jQuery(tmpId).length > 0) {
				objTemplate = jQuery(tmpId); //template div jquery object
				if (objTemplate.data('slaveinput') != '') {
					fmt = "{id}";
					if ((objTemplate.data('slaveformat') != null) && (objTemplate.data('slaveformat') != '')) {
						fmt = objTemplate.data('slaveformat');
					}
					
					//generate value
					if (this.lastData != null) {
						jQuery.each(this.lastData, function(key, value) {
							//fmt = preg_replace("/[{|%7b]+(\\s?\"?)(" + key + ")(\"?\\s?)[}|%7d]+/gi","$1" + value + "$3",fmt );
							fmt = preg_replace("/{(\\s?\"?)(" + key + ")(\"?\\s?)}/gi","$1" + value + "$3",fmt );
							fmt = str_replace("\"\"","",fmt);
							fmt = str_replace("  "," ",fmt);
						});
					} else {
						//no default data means is and edit form just started
						fmt = jQuery(objTemplate.data('slaveinput')).val();
					}
					
					//replace template data
					value = (this.val()=="") ? "" : fmt;
					if (this.autoCorrect == false) {
						if (this.val() != this.lastText) {
							value = "";
						}	
					}
					jQuery(objTemplate.data('slaveinput')).val(value);
				}
			}
		};
		
		//called when main input lose focus
		obj.blur(function() {
			if ((obj.val() != obj.lastText) && (obj.val() != "")) {	
				if (obj.autoCorrect == true) {
					obj.val(obj.lastText);	
				}
			}
			if (obj.val() == "") { obj.lastData = null; obj.lastText = ""; }
			obj.refreshSlave();
		});
		
		//called when main input has a keystroke
		obj.keyup(function(){
			obj.refreshSlave(); //the function will asset if refresh is neccessary
		});
		if (jsonSource == undefined) {
			alert("Autocomplete Error: No source specified for input with name=" + obj.attr('name'));
		} else {		
			//Bind every input with class autocomplete to the component
			obj.autocomplete({
				minLength: 1,
				//define source from ajax call
				source: function( request, response ) {
					jQuery.ajax({
						url: jsonSource,
						dataType: "json",
						data: {
							q: request.term
						},
						success: function( data ) {
							autocomplete_box = jQuery('.ui-autocomplete');
							autocomplete_box.html("");
							if (data.error != "") {
							   	alert(data.error);	
							}
							response( jQuery.map( data.collection, function( item ) {
								//create template for data
								tmp = template;
								fmt = format;
								
								//find if there is several group templates
								if ((obj.data('groupfield') != null) && (obj.data('groupfield') != "")){
									if (jQuery((obj.data('template') + "_" + item[obj.data('groupfield')])).length > 0) {
										tmp = jQuery(obj.data('template') + "_" + item[obj.data('groupfield')]).html();
										fmt = jQuery(obj.data('template') + "_" + item[obj.data('groupfield')]).data('format');
									}
								}
								
								//replace template data
								jQuery.each(item, function(key, value) {
									tmp = preg_replace("/[{|%7b]+(\\s?\"?)(" + key + ")(\"?\\s?)[}|%7d]+/gi","$1" + value + "$3",tmp);
									fmt = preg_replace("/[{|%7b]+(\\s?\"?)(" + key + ")(\"?\\s?)[}|%7d]+/gi","$1" + value + "$3",fmt );
								});
								tmp = str_replace("\"\"","",tmp);
								tmp = str_replace("  "," ",tmp);
								tmp = str_replace("data-src","src",tmp);
								tmp = str_replace("data-href","href",tmp);
								tmp = preg_replace("/(\{[^}]+})/gi","",tmp);
								tmp = preg_replace("/(%7b[^%7d]+%7d)/","",tmp);
								fmt = str_replace("\"\"","",fmt);
								fmt = str_replace("  "," ",fmt);
								fmt = preg_replace("/(\{[^}]+})/","",fmt);
								fmt = preg_replace("/(%7b[^%7d]+%7d)/","",fmt);
								
								//return an autocomplete formated output
								return {
									label: tmp,
									value: fmt,
									data: item
								};
							}));
						}
					});
				},
				
				// Called when an item from the autocomplete list is selected
				select: function( event, ui ) {
					var selFnc = obj.data('onselect');
					setTimeout(function() { 
						obj.lastText = obj.val(); 
						obj.lastData=ui.item.data; 
						obj.refreshSlave();
					},0);
					if ((selFnc != undefined) && (selFnc != "")) {
					    eval(selFnc + "(ui.item.data)"); //execute callback if any
					}
				},
				focus: function(event, ui) {
					if (obj.data('refresh_slave_on_item_focus') == true) {
						setTimeout(function() { 
							obj.lastText = obj.val(); 
							obj.lastData=ui.item.data; 
							obj.refreshSlave();
						},0);
					}
				},
				close: function (event, ui ) {
					autoCompleteSize = 0;
				},
				position:{
					offset:obj.data('offset')
				},
				open: function ( event, ui ) {
					// open function is called before autocomplete menu is displayed, 
					// so use timeout of 0 trick to let autocomplete finish
					setTimeout(function() {
						var inputObj = obj;
						var offset = jQuery('.ui-autocomplete:visible').offset();
						heightMenu = jQuery('.ui-autocomplete:visible').outerHeight();
						heightComp = inputObj.outerHeight();
						spaceAbove = undefined;
						spaceBelow = undefined;
						var scrollTop = jQuery(window).scrollTop();
						/*
						// BEGIN GROUPS
						if (inputObj.data('groupfield') != undefined && 1==2) {
							var groupField = inputObj.data('groupfield');
							delete autocomplete_box;
							autocomplete_box = jQuery('.ui-autocomplete');
							delete autocompleteLIs;
							autocompleteLIs =  jQuery('.ui-autocomplete .ui-menu-item'); 
							var lastGroup = "";
							var lastLI = null;
							var groupHeight = 0;
							var groupCount = 0;
							var groups = new Array();
							autocomplete_box.css('min-width','400px');
							jQuery.each(autocompleteLIs, function (key,value) { //all LI's
								jqVal = jQuery(value);
								data = jqVal.data('item.autocomplete').data;
								currentGroup = data[groupField];
								if (currentGroup != lastGroup) {
									lastGroup = currentGroup;
									groupHeight = 0;
									groups[groupCount] = document.createElement('li');
									groups[groupCount].id = "autocomplete_group_" + groupCount;
									groups[groupCount].className = "autocomplete_group";
									groups[groupCount].style.width = '20%';
									groups[groupCount].style.position = "absolute";
									if (groupCount == 0) {
										groups[groupCount].style.top = "0px";
									} else {
										groups[groupCount].style.top = parseInt(groups[groupCount-1].style.top) + parseInt(groups[groupCount-1].style.height) + "px";
									}
									
									//groups[groupCount].style.float = 'left';
									groups[groupCount].innerHTML = currentGroup;
									autocomplete_box.append(groups[groupCount]);
									//alert(autocomplete_box.css('position'));
									if (lastLI != null) {
										lastLI.addClass('separator')
									}
									groupCount++;
								}
								jqVal.css('width','75%');
								jqVal.css('clear','none');
								//jqVal.css('float','right');
								jqVal.css('margin-left','20%');
								var mtop = (jqVal.css('padding-top') != null) ? parseInt(jqVal.css('padding-top')) : 0;
								mtop += (jqVal.css('margin-top') != null) ? parseInt(jqVal.css('margin-top')) : 0;
								mtop += (jqVal.css('padding-bottom') != null) ? parseInt(jqVal.css('padding-bottom')) : 0;
								mtop += (jqVal.css('margin-bottom') != null) ? parseInt(jqVal.css('margin-bottom')) : 0;
								groupHeight += jqVal.height() + mtop;
								groups[groupCount-1].style.height = groupHeight + "px";
								lastLI = jqVal;
							});
						} ///// END OF  GROUPS
						*/
						if(offset.top + heightMenu - scrollTop > window.innerHeight) {
							// not enough room below component; check if above is better
							spaceBelow = window.innerHeight - offset.top;
							spaceAbove = inputObj.offset().top;
							if(spaceAbove > spaceBelow) {
								if (autoCompleteSize != heightMenu) {
									//jQuery('.ui-autocomplete').css('top', (spaceAbove - heightMenu) + 'px');  //this position the box above the obj
									//jQuery(window).scrollTop(obj.offset().top); // or this scrolls down the screen to make it show
									jQuery('body,html').animate({  //or this makes a smooth transition scroll to make it show
										"scrollTop": obj.offset().top
									}, 2000,"easeOutExpo");
									autoCompleteSize = heightMenu;
								}
							}
						}
					}, 250);
				}
			}).data( "autocomplete" )._renderItem = function( ul, item ) {
				var objResult = jQuery( "<li></li>" )
					.data( "item.autocomplete", item )
					.append( "<a>" + item.label + "</a>" )
					.appendTo( ul );
				return objResult;
			};
			obj.autocomplete("option","delay",600);
		}
	}); // End of the autocomplete plugin	
});


/**** BEATDOWN RADIO ****/
//Refresh countdown clock
function update_beatdown() {
	if ($('#clock').length) {

		//get hours and minutes from text
	    var strHtml = $.trim($('#clock').html());
	    var arrHoursMin = strHtml.split(":");
		var hours = parseInt(arrHoursMin[0]);
		var minutes = parseInt(arrHoursMin[1]);

		if (minutes <= 1) {
			minutes = (hours==0) ? 0 : 59;
			hours = (hours == 0) ? 0 : hours - 1;
		}
		else {
			minutes--;
		}

		//complete 0's
		if (hours <= 9) hours = "0" + hours;
		if (minutes <= 9) minutes = "0" + minutes;
		$('#clock').html(hours + ":" + minutes);
		 
	    if ($('#clock').html() == "00:00") {
			clearInterval($('#event_live').data('clock_handler')); //clear timer
			getBeatdown(); //refresh panel content with new html and reset timer if necessary
		}
	    
	}
} 

// Display the beatdown panel and sets the countdown clock
function getBeatdown() {
	if ((isPlayByPlay == false) || (isPlayByPlay == undefined)) {
		$.ajax({
			url: '/radio/ajax-beatdown',
			dataType: "html",
			success: function( data ) {
				$('#event_live').html(data);
				if ($('#clock').length) {
					//if clock is present start the countdown
					$('#event_live').data('clock_handler',setInterval('update_beatdown()',60000)); //1 minute interval
				}
			}
		});
	}
}

// Load Beatdown and Back to Mobile when page is ready
jQuery(function() {
	getBeatdown();  
});
/**** END OF BEATDOWN / MOBILE ****/


/**** Radio Carousel ****/
var carousel_top_limit = 0;
var carousel_page = 1;
var carousel_full_load = 0;
var carousel_num_items_added = 0;
function initRadioCarousel(numRadioShowId, numEpisodeId) {
	$("span.carousel_nav.next").click(function(){
		if (carousel_full_load == 0) {
			carousel_page++;
			if (carousel_page > carousel_top_limit) {
				carousel_top_limit = carousel_page;
				//grab new data
				$.ajax({
                    url: '/radio/ajax-list/rid/' + numRadioShowId + '/page/' + carousel_page
                }).done(function(data){
			    	if (data.hasMore == false) {
			    		carousel_full_load = 1;
			    	}
			    	//add html and animate
			    	if (data.arrEpisodes.length > 0) {
			    		
			    		//add new element to the html
			    		$('.carousel .content div.items').css('width', (carousel_page * 100) + "%");
			    		for (var numIdx = 0; numIdx < data.arrEpisodes.length; numIdx++) {
		                    var objEpisode = data.arrEpisodes[numIdx];
		                    var strHtml = "<a href='" + objEpisode.strUrl + "' ";
		                	if (parseInt(objEpisode.numId) == parseInt(numEpisodeId)) {
		                    	strHtml += "class='item current' ";
		                	} else {
		                    	strHtml += "class='item' ";
		                	}
		                	strHtml += ">" + objEpisode.strTitle + "<span class='date'>" + objEpisode.strDate + "</span></a>";
		                    $('.carousel .content .items').append(strHtml);                                    	
		                }
			    		
			    		//animate paging
			    		var itemWidth = $('.carousel .content .items a:first').outerWidth(true); 
		                var widthOffset = "-=" + (itemWidth * 5); 
		                $('.carousel .content .items').animate({left: widthOffset}, 1000);
		                
		                carousel_num_items_added += data.arrEpisodes.length;
			    	}
			    });
				
			} else {
				//just moving not adding new content but still pages left to load
				var itemWidth = $('.carousel .content .items a:first').outerWidth(true); 
				var widthOffset = "-=" + (itemWidth * 5); 
				$('.carousel .content .items').animate({left: widthOffset}, 1000);
			} 
		} else {
			//just moving not adding new content with all pages loaded
			if (carousel_page < carousel_top_limit) {
				carousel_page++;
				//calculate offset
				var itemWidth = $('.carousel .content .items a:first').outerWidth(true); 
				var widthOffset = "-=" + (itemWidth * 5); 
				$('.carousel .content .items').animate({left: widthOffset}, 1000);
			}
		}
		
	});
	
	// Back button
	$("span.carousel_nav.back").click(function(){
		if ((carousel_page > 1) && (carousel_num_items_added > 0)) {
			carousel_page--;
			
			//animate
	        var itemWidth = $('.carousel .content .items a:first').outerWidth(true);
	        var widthOffset = "+=" + (itemWidth * 5);
	                
	        $('.carousel .content .items').animate({left: widthOffset}, 1000);
		}
    });
	
}
/***** END OF Radio Carousel ******/

/****** Mobile Redirection Functions ********/

/* Misc. cookie handling */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/; domain=.sherdog.com";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function isMobileOrTablet() {
    var b = navigator.userAgent||navigator.vendor||window.opera;
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,4)));
}

function getScrOrientation() {
    return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

/* Show go-to-mobile footer link on page load */
$(function() {
    if (readCookie('desktop') == 'yes') {
        $('#goToMobile').show();
    }

    if (isMobileOrTablet()) {                                                                               // monitor orientation changes
        var scrOrientation = getScrOrientation();
        ga('send', 'event', 'Orientation', scrOrientation, {'nonInteraction': 1});

        window.addEventListener("resize", function() {
            if (scrOrientation != getScrOrientation()) {
                scrOrientation = getScrOrientation();
                ga('send', 'event', 'Orientation', 'changed to ' + scrOrientation, {'nonInteraction': 1});
            }
        });
    }
});


$(window).load(function(){
	var dateNextFightFantasy = $(".featured_fight .countdown ");
    if (dateNextFightFantasy.length > 0) {
        var countDown = new countDownJS({
            date: dateNextFightFantasy.data("date"),
            selector: dateNextFightFantasy,
            expiredText: "Event Expired",
            beforeText: "Picks due in ",
            units: {
                d: "D",
                h: "H",
                m: "M",
                s: "S"
            },
            pluralText: ""
        });
        $("#navigation").on("mouseenter.countdown", ".fantasy", function() {
            countDown.startCountDown();
        });
        $("#navigation").on("mouseleave.countdown", ".fantasy", function() {
            countDown.stopCountDown();
        });
    }
    
    SB_socialWidgetInit();
});


$(document).ready(function(){ 
    visitorCountry = readCookie('visitor_country');
    visitorCountry = (visitorCountry) ? visitorCountry : 'us';

    cookieCountry = readCookie('gn_country');
    cookieCountry = (cookieCountry) ? cookieCountry : 'us';

    requestGeoData();           // Geolocation Component
    requestGeoTargetLogo();     // Geotarget Logo
});

function requestGeoData() {
	try {
        if(isGeo==true) {
            $.ajax({
                url: '/geo/'+visitorCountry,
                dataType: 'json'
            }).done(function(data, country){
                onGeoDataHandler(data);
            });
        }
    } catch(err) {
        console.log('SD. '+err+'. Is probably Off');
    }
}

function requestGeoTargetLogo() {
    if (cookieCountry){
        var validCountries = ['AU', 'CA', 'UK'], 
        isValidCountry = validCountries.indexOf(cookieCountry) >= 0;
        
        if (isValidCountry) {
            $('#sherdog_logo').addClass('sherdog_logo_' + cookieCountry.toLowerCase());
        }
    }
}

function onGeoDataHandler(data) {
    // Latest MMA News
    var geo = new Geolocation(data);
    var numLeftColEventItems = 2;
    var numRightColEventItems = 5;
    var html;
    var template = '';
    var inputTemplate = '';
    var htmlInputTemplate = '';
    
    // Obtaining the country flag.
    var strBigFlagUrl = data.result.country.bigFlagUrl;
    var strFlagUrl = (data.result.country.smallFlagUrl).toLowerCase();
    var strBigFlagHtml = '<p class="big-country-flag" style="background: url(' + strFlagUrl + ') no-repeat;"></p>';
    var strFlagHtml = '<p class="country-flag" style="background: url('+strFlagUrl+ ') no-repeat;"></p>';
    var arrCovers = geo.getCovers();
    var arrArticles = geo.getArticles();
    var arrEvents;
    var currentHostname = location.hostname;
    var currentCDNHostname = "";
    
    // Coverpanel
    if (currentHostname === 'local.sherdog.com') {
        currentHostname = 'http://dev.sherdog.com';
        currentCDNHostname = 'http://dev.www.cdn.sherdog.com';
    } else {
        currentCDNHostname = 'http://www4.cdn.sherdog.com';
    }
    
    try {
        $.each(arrCovers, function(index, obj) {
            if(obj.category === 'video'){
                template = $.trim( $("#cover-panel-video-template").html() );
                inputTemplate = $.trim( $("#cover-panel-input-template").html() );
                
                html = template.replace( /{{title}}/ig, obj.title )
                    .replace( /{{id}}/ig, obj.id )
                    .replace( /{{imageurl}}/ig, obj.imageurl )
                    .replace( /{{sbvideoid}}/ig, obj.sbvideoid )
                    .replace( /{{imagethumb}}/ig, obj.imagethumb )
                    .replace( /{{url}}/ig, obj.url );
                
                htmlInputTemplate = inputTemplate.replace( /{{sbvideoid}}/ig, obj.sbvideoid )
                    .replace( /{{embedcode}}/ig, obj.embedcode );
                
                
            } else {
                template = $.trim( $("#cover-panel-template").html() );
                html = template.replace( /{{title}}/ig, obj.title )
                    .replace( /{{id}}/ig, obj.id )    
                    .replace( /{{imageurl}}/ig, obj.imageurl )
                    .replace( /{{imagethumb}}/ig, obj.imagethumb )
                    .replace( /{{url}}/ig, obj.url );
            }
                
            $('#home_coverpanel').append(html);
            $('.coverpanel').append(htmlInputTemplate);
        });
        
    } catch(err) {
        console.log('Home: '+err);
    }
    
    // Coverpanel Thumbs
    try {
        template = $.trim( $("#cover-panel-thumbs-template").html() );
        
        $.each(arrCovers, function(index, obj) {
            html = template.replace( /{{title}}/ig, obj.title )
                .replace( /{{id}}/ig, obj.id )
                .replace( /{{number}}/ig, index )
                .replace( /{{category}}/ig, obj.category )
                .replace( /{{imageurl}}/ig, obj.imageurl )
                .replace( /{{imagethumb}}/ig, obj.imagethumb )
                .replace( /{{url}}/ig, obj.url );

            $('.thumbnails_wrapper').append(html);
        });
        
    } catch(err) {
        console.log('Home: '+err);
    }
    
    var htmlBlurb
    // Coverpanel Description
    try {
        template = $.trim( $("#cover-panel-description-template").html() );
        
        $.each(arrCovers, function(index, obj) {
            html = template.replace( /{{id}}/ig, obj.id )
                .replace( /{{title}}/ig, obj.title )
                .replace( /{{category}}/ig, obj.category )
                .replace( /{{description}}/ig, obj.description )
                .replace( /\\"/ig, '')
                .replace( /{{url}}/ig, obj.url );

            $('.coverpanel').append(html);
        });
        
        
        
    } catch(err) {
        console.log('Home: '+err);
    }
    
    // Sherdog Cover Panel Init
    var config = new Object();
    config.slideid             = 'home_coverpanel';
    config.effect              = 'fade';
    config.directionNav        = false;
    config.height              = 351;
    config.width               = 661;
    config.pauseTime           = 13000; 
    config.manualAdvance       = false;
    config.controlNavMouseOver = true;
    config.animSpeed           = 300;
    config.videoBgImage        = currentCDNHostname + '/_images/coverpanel/cover_video_bg.png';
    config.sbWidget            = 'shd015_api';
    
    try {
        SD_Cover_Pluggin(config);
    } catch(err){
        console.log('unable to load cover panel.');
    }
    // End Sherdog Cover Panel Init
    
    // ARTICLES
    // Latest MMA News
    try {
        template = $.trim( $("#latest-mma-news-template").html() );
        
        $.each(arrArticles, function(index, obj) {
            html = template.replace( /{{title}}/ig, obj.title )
                .replace( /{{url}}/ig, obj.url );

            $('#latest-mma-news-list').append(html);
            $('#sd-loading').remove();
        });
        
    } catch(err) {
        console.log('Home: '+err);
    }


    
    
    // EVENTS
    arrEvents = geo.getEvents();
    if (arrEvents.length == 0) {
        $('#country_tab').remove();
    } else {
        try {
            
            // Fights - Left Column
            html = '';
            template = $.trim( $('#events-fights-left-template').html() );

            $('#country_tab').empty().append(strFlagHtml);
            
            $.each(arrEvents, function(index, obj) {
                if(index < numLeftColEventItems) {
                    var date = new Date(obj.date);

                    html = template.replace( /{{title}}/ig, obj.title )
                        .replace( /{{id}}/ig, obj.id )
                        .replace( /{{url}}/ig, obj.url )
                        .replace( /{{day}}/ig, date.getDate() )
                        .replace( /{{month}}/ig, getMatchEventMonth(date.getMonth()) )
                        .replace( /{{year}}/ig, date.getFullYear() )
                        .replace( /{{fighter1}}/ig, obj['fighter1-lastname'] )
                        .replace( /{{fighter1-image}}/ig, obj['fighter1-image'] )
                        .replace( /{{fighter2}}/ig, obj['fighter2-lastname'] )
                        .replace( /{{fighter2-image}}/ig, obj['fighter2-image'] );

                    $('#country-left').append(html);
                    
                    if(obj['fighter1-lastname'].length == 0) {
                        $('#fighters-'+obj.id).empty();
                        $('#fighters-pics-'+obj.id).empty();
                    }
                }
            });
            
            // Fights - Right Column
            html = '';
            var template = $.trim( $('#events-fights-right-template').html() );
            
            $.each(arrEvents, function(index, obj) {
                if(index < numRightColEventItems) {
                	console.log(typeof(obj['fighter1-lastname']));
                	console.log((obj['fighter1-lastname'].length));
                    var date = new Date(obj.date);
                    html = template.replace( /{{title}}/ig, obj.title )
                        .replace( /{{id}}/ig, obj.id )
                        .replace( /{{url}}/ig, obj.url )
                        .replace( /{{day}}/ig, date.getDate() )
                        .replace( /{{month}}/ig, date.toString().substring(4, 8) )
                        .replace( /{{year}}/ig, date.getFullYear() )
                        .replace( /{{fighter1}}/ig, obj['fighter1-lastname'] )
                        .replace( /{{fighter1-image}}/ig, obj['fighter1-image'] )
                        .replace( /{{fighter2}}/ig, obj['fighter2-lastname'] )
                        .replace( /{{fighter2-image}}/ig, obj['fighter2-image'] );

                    $('#country-right').append(html);
                    
                    if(obj['fighter1-lastname'].length == 0) {
                        $('#match-'+obj.id).empty();
                    }
                    
                }
            });
        } catch(err) {
            console.log('Home: '+err);
        }
    	
    }
    
    
    //
    // By Country Fight Finder
    if (arrEvents.length == 0) {
        $('#bycountry_tab').remove();
    } else {
        try {
            html = '';
            template = $.trim( $('#fight-finder-template').html() );
            strBigFlagHtml = strBigFlagHtml.toLowerCase();
            $('#bycountry_tab').append(strBigFlagHtml);
            
            
            
            var isOdd = true;
            var typeRow = '';

            $.each(arrEvents, function(index, obj) {
                if(isOdd) {
                    typeRow = 'odd';
                } else {
                	typeRow = 'even';
                }
                var date = new Date(obj.date);

                html = template.replace( /{{title}}/ig, obj.title )
                        .replace( /{{url}}/ig, obj.url )
                        .replace( /{{day}}/ig, date.getDate() )
                        .replace( /{{month}}/ig, date.toString().substring(4, 8) )
                        .replace( /{{year}}/ig, date.getFullYear() )
                        .replace( /{{name}}/ig, obj.name )
                        .replace( /{{location}}/ig, obj.location )
                        .replace( /{{class}}/ig, typeRow )
                        .replace( /{{flag}}/ig, strFlagUrl );
                    
                        $('#bycountry_table_head').after(html);
                isOdd = !isOdd;
            });
        } catch(err) {
            console.log('Fight Finder: '+err);
        }
    }
    
    // Removing Empty Templates
    $('#fight-finder-template').remove();
    $('#events-fights-right-template').remove();
    $('#events-fights-left-template').remove();
    $("#latest-mma-news-template").remove();
    $("#cover-panel-description-template").remove();
    $("#cover-panel-thumbs-template").remove();
    $("#cover-panel-template").remove();

}

function getMatchEventMonth(value) 
{
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return month[value];
}

function SB_socialWidgetInit() {
    var pattRef = /^https?:\/\/(www\.)?google\./;
    if (pattRef.test(document.referrer)) {
        $('div#social_widget')
            .css({
                'width': '300px', 
                'height': '300px', 
                'position': 'relative', 
                'overflow': 'hidden', 
                'margin-top': '2px', 
                'margin-bottom': '6px'
            });
        
        SbSocialWidget.init({
            partnerId : 113,
            width : 300,
            height : 300,
            widgetId : 'shd027',
            cmsPath : 'http://cms.springboardplatform.com'
        });
        
        ga('send', 'event', 'SB Video Widget', 'Shown');
    }
}