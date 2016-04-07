
if ( window._ ) {
    _.templateSettings = { interpolate: /\<\@\=(.+?)\@\>/gim, evaluate: /\<\@(.+?)\@\>/gim};
}

/* in IE8, without this var format, eol was not global in the very next script, eol.page.js . Strange but low level bug. */
var eol = (function($, undefined) {

    var _s = {
        "assets" : []
    };
    
    function uattr(attr) {
        var value = "";
        if ( typeof(attr) == "number" ) {
            
        } else {
            value = new RegExp("[?|&]" + attr + "=.*?(?=($|&|#))").exec(window.location) || [" "];
        }
        return value[0].substring(1).replace(/.*?=/, '') || "";
    }

    function cookie(key, value, expiration, path) {
        if ( value === undefined ) {
            var val = new RegExp("(^|; )"+key+"=.*?(?=($|;))").exec(document.cookie) || [" "];
            return val[0].substring(1).replace(/.*?=/, '') || "";
        } else { 
            var now = new Date();
            now.setDate(now.getDate() + 365);
            var cookieStr = key + "=" + value + ( ( expiration == -1 ) ?  "" : "; expires=" + (expiration || now.toUTCString()) ) + "; path=/; domain=.eonline.com";
            document.cookie = cookieStr;
                            
            return cookie(key) || "";
        }
    }
             
    /**
       @name require 
       @methodOf eol
       @param asset the external file to load
       @param dataType override asset detection
    */
    function require( asset, dataType) {
        if ( ! _s.assets[asset] ) {
            _s.assets[asset] = true;
            $.getScript(asset);
        }
    }
          
    /**
        @name create extends the namespace eol with the given name 
        @methodOf eol
        @param ns
        @param module
        @param context
    */   
    function create(ns, module, context) {
        var o = window;
        var token = "";
        var tokens = ("eol."+ns).split(".").reverse();

        while (tokens.length > 1) {
            token = tokens.pop();
            o[token] = o[token] || {};
            o = o[token];
        }
        o[tokens.pop()] = (arguments.length > 1) ? module($,context) : {};  
    }


    function thumbnail( img, twidth, theight ) {  
        if (img) {
            var r = { "x1" : 0, "y1" : 0, 
                "x2" : parseInt(img.width,10), "y2" : parseInt(img.width,10),
                "owidth" : parseInt(img.width,10), "oheight" : parseInt(img.height,10)
            };                         
            if (r.oheight < r.owidth) {
                r.x1 = Math.floor( (r.owidth - r.oheight) / 2 );
                r.x2 = Math.floor( r.oheight + ((r.owidth - r.oheight) / 2));
                r.y2 = r.oheight;
            }
            return img.host + "/resize/" + twidth + "/" + theight + "/" + r.x1 + "-" + r.y1 + "-" + r.x2 + "-" + r.y2 + img.path;
        }
        return "";
    };    

    function ping(text){
    	return text;
    }
    
    return {
        "thumbnail" : thumbnail,
        "create": create,
        "cookie" : cookie,
        "require" : require,
        "uattr": uattr,
        "undefined" : undefined,
        "ping": ping
    };

})(jQuery.noConflict());

