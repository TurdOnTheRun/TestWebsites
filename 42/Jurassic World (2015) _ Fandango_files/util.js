/**
 * Fandango.util contains helper functions that is used in various pages. 
 * As some page function still uses functions without name space, 
 * those functions are listed below: "FOR BACKWARD COMPATIBLITY" in this file.
 */

if(!Fandango) { var Fandango = new Object(); };

Fandango.util = {
  createCookie : function(url) {
    if (mins) {
      var date = new Date();
      date.setTime(date.getTime()+(mins*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+";path=/;domain="+c_domain;
  },

/**  
 * Generic function to set a cookie.  
 *
 * @param {string} name This is the name of the cookie
 * @param {string} val
 * @param {string} expires
 * @param {string} path This is a specified cookie path. Defaults to root "/"
 * @param {string} domain This is the cookie domain. Defaults to fandango.com
 * @param {string} secure
 */

  setCookie : function(name,val,expires,path,domain,secure) {
    // set time, it's in milliseconds
    var today = new Date(); 
    today.setTime( today.getTime() );
    
    if (!path) {
      path = "/";
    }
    
    if (!domain) { 
      domain = "fandango.com"
    }
    
    if (expires) {
      expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" +escape( val ) +
    ( ( expires ) ? ";expires=" + expires_date.toUTCString() : "" ) +
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
  },

/**  
 * Generic function to get a cookie.  
 *
 * @param {string} name This is the name of the cookie to retrieve
 */

  getCookie : function(name) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  },

/**  
 * Generic function to delete a cookie.  
 *
 * @param {string} name This is the name of the cookie to retrieve.
 * @param {string} path This is the specific path of the cookie.
 * @param {string} domain This is the domain the cookie belongs to.
 */
  deleteCookie : function(name, path, domain) {
    if (this.getCookie(name)) { document.cookie = name + "=" +
      ( ( path ) ? ";path=" + path : "") +
      ( ( domain ) ? ";domain=" + domain : "" ) +
      ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
  },
  
/**
  * Draws a map on the specified selector, centered to the specified coordinates 
  * with the specified zoom level, and adds a marker if indicated
  * (Requires the inclusion of the google maps API js script tag)
  * @param (string) selector The jquery selector to draw the map on
  * @param (double) latitude The latitude of the geo-coordinates to center the map on
  * @param (double) longitude The longitude of the geo-coordinates to center the map on
  * @param (bool) addMarker indicates whether or not to add a marker on the map
  * @param (int) zoom The zoom level of the map (default 13)
  */
  drawMap : function(selector, latitude, longitude, addMarker, zoom){
  	var elements = $(selector);
  	if (elements.length > 0) {
  		if (!zoom){
  			zoom = 14;
  		}
  		var coords = new google.maps.LatLng(latitude, longitude);
  		var mapOptions = { zoom: zoom, center: coords, disableDefaultUI: true };
  		for (var i = 0; i < elements.length; i++){
  			var map = new google.maps.Map(elements[i], mapOptions);
  			if (addMarker == true) {
  				var marker = new google.maps.Marker({ position: coords, map: map });
  			}
  		}
  	}
  }
};

/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
  $special,
  resizeTimeout;

$special = $event.special.debouncedresize = {
  setup: function() {
    $( this ).on( "resize", $special.handler );
  },
  teardown: function() {
    $( this ).off( "resize", $special.handler );
  },
  handler: function( event, execAsap ) {
    // Save the context
    var context = this,
      args = arguments,
      dispatch = function() {
        // set correct event type
        event.type = "debouncedresize";
        $event.dispatch.apply( context, args );
      };

    if ( resizeTimeout ) {
      clearTimeout( resizeTimeout );
    }

    execAsap ?
      dispatch() :
      resizeTimeout = setTimeout( dispatch, $special.threshold );
  },
  threshold: 150
};

})(jQuery);
