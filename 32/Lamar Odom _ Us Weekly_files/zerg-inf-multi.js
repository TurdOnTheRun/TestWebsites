if(typeof ZERG == "undefined") {
    var ZERG = {};
}
ZERG.zergInterval = false;
ZERG.gebcn = (typeof document['getElementsByClassName'] == "function");
ZERG.infiniteZerg = function( poll ) {
    var widgets = [];
    var lastData = {};
    var dupeCount = 0;
    var dupeTryLimit = 5;

    var slotById = [];

    if ( ZERG.gebcn ) {
        widgets = document.getElementsByClassName( "zergnet-widget" );
    } else {
        var qsa = (typeof document['querySelectorAll'] == "function");
        if ( !qsa ) {
            var d=document, s=d.createStyleSheet();
            d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c};
        }
        widgets = document.querySelectorAll(".zergnet-widget");
    }

    for ( var i = 0; i < widgets.length; i++ ) {
        var w = widgets[i];
        var widgetId = parseInt( w.getAttribute("data-zerg-widget-id") );

        if ( typeof( slotById[widgetId] ) === "undefined" ) {
            slotById[widgetId] = [];
        }
        if ( typeof( lastData[widgetId] ) === "undefined" ) {
            lastData[widgetId] = "";
        }

        if ( w.className.indexOf( "widget-loaded" ) == "-1" && widgetId > 0 && typeof( w.zergLoadWidget ) === "undefined" ) {
            w.zergLoadWidget = function() {
                if ( typeof( this.getAttribute ) === "function" ) {
                    var widget = this;
                    var randcallback = Math.floor((Math.random() * 9999999) + 1);
                    var timestamp = new Date().getTime()+widget.getAttribute("data-zerg-offset");
                    var JSONP = (function(){var a=randcallback,c,f,b,d=this;function e(j){var i=document.createElement("script"),h=false;i.src=j;i.async=true;i.onload=i.onreadystatechange=function(){if(!h&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){h=true;i.onload=i.onreadystatechange=null;if(i&&i.parentNode){i.parentNode.removeChild(i)}}};if(!c){c=document.getElementsByTagName("head")[0]}c.appendChild(i)}function g(h,j,k){f="?";j=j||{};for(b in j){if(j.hasOwnProperty(b)){f+=encodeURIComponent(b)+"="+encodeURIComponent(j[b])+"&"}}var i="json"+(++a);d[i]=function(l){k(l);try{delete d[i]}catch(m){}d[i]=null;};e(h+f+"callback="+i);return i}return{get:g}}());
                    var widgetId = widget.getAttribute("data-zerg-widget-id");

                    JSONP.get( 'http://www.zergnet.com/output.js', {id:widgetId,time:timestamp}, function(data){
                        if ( data == lastData[widgetId] && dupeCount < dupeTryLimit ) {
                            dupeCount++;
                            widget.zergLoadWidget();
                            return;
                        }
                        if (typeof window.opera != 'undefined') {
                            document.write(data);
                        } else {
                            widget.innerHTML = data;
                            lastData[widgetId] = data;
                        }
                    });
                }
            }

            w.setAttribute("data-zerg-offset", 0);
            w.className += " widget-loaded";

            slotById[widgetId].push(w);
        }
    }

    for( widgetId in slotById ) {
        if ( typeof( slotById[widgetId] ) !== "undefined" && slotById[widgetId].hasOwnProperty("length") ) {
            for ( i = 0; i < slotById[widgetId].length; i++ ) {
                if ( i == 0 ) {
                    if ( typeof( slotById[widgetId] ) !== "undefined" && typeof( slotById[widgetId][i] ) !== "undefined" && typeof( slotById[widgetId][i].zergLoadWidget ) === "function" ) {
                        slotById[widgetId][i].zergLoadWidget();
                    }
                } else {
                    w.setAttribute("data-zerg-offset", i);
                    setTimeout( function(el) {
                        if ( typeof( el ) !== "undefined" && typeof( el.zergLoadWidget ) === "function" ) {
                            el.zergLoadWidget();
                        }
                    }, i*200, slotById[widgetId][i] );
                }
            }
        }
    }

    slotById = [];

    ZERG.zergInterval = false;
    if ( poll === true ) {
        ZERG.zergInterval = setTimeout( ZERG.infiniteZerg, 1000 );
    }
};
ZERG.triggerInfiniteZerg = function() {
    if ( !ZERG.zergInterval ) {
        ZERG.zergInterval = setTimeout( ZERG.infiniteZerg, 500 );
    }
};
ZERG.init = function() {
    if (window.addEventListener)  // W3C DOM
        window.addEventListener("scroll",ZERG.triggerInfiniteZerg,false);
    else if (elem.attachEvent) { // IE DOM
        window.attachEvent("onscroll", ZERG.triggerInfiniteZerg);
    } else {
        infiniteZerg( true );
    }
};
ZERG.init();
