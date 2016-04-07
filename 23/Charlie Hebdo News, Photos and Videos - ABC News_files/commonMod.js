EZDATA.jsLoaded = {};
EZDATA.jsLoader = function(url){
    if (typeof(EZDATA.jsLoaded[url]) == 'undefined' || EZDATA.jsLoaded[url] == null){
        EZDATA.jsLoaded[url] = 1;
        var loader = document.getElementById(url);
		if(loader){
            loader.src = url;
        } else {
            EZDATA.jsLoaded[url] = 0;
        }
    }
};


/* Waits for the function to be available before executing func.
    - func must be a function contained in obj. This means the 'window' object if it's global.
    - Accepts additional parameters that will be passed to func when func is executed.
*/
EZDATA.jsLoaderExec = function(obj, func){
    var inner = function(num, obj, func){
        if (typeof(obj[func]) == 'function'){
            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 3);
            obj[func].apply(this, args);
        }else{
            if (num >= 99){ throw("EZDATA.jsLoaderExec tried to run function '"+ func +"' 100 times, giving up"); }
                        
            var a = arguments;
            a[0] += 1;
            setTimeout(function(){inner.apply(this, a); }, 100);
        }
    };
    
    var args = Array.prototype.slice.call(arguments);
    args.splice(0,0,0);
    inner.apply(this, args);
};


/* Google Analytics Tracking Event */
EZDATA.trackGaEvent = function(category, action, label){
    if (typeof(pageTrackerEZ) == 'undefined' || pageTrackerEZ == null){
        

        
        var trackError = new Error("EZDATA.trackGaEvent: pageTrackerEZ is not an object.");
        if (typeof(console) != 'undefined'){
            console.error(trackError);
        }else{
                //throw trackError;
        }
    }else{
        pageTrackerEZ._trackEvent(EZDATA.gaDevicePrefix + category, action, label);
    }
    return true;
};


/* Make an element a toggle button and a companion toggled by it */
function makeToggle(trigger_el) {
    ezQuery(document).ready(function(){ 
        var id = '#' + ezQuery(trigger_el).attr('for');
        var target = ezQuery(id);
        var trigger = ezQuery(this);
        
        target.hide();
        trigger.find('.hide').hide();
        trigger.find('.show').show();
    });
    
    ezQuery(trigger_el).click( function (e) {
        var id = '#' + ezQuery(this).attr('for');
        var target = ezQuery(id);
        var trigger = ezQuery(this);
        var visible = ! target.is(":visible");
        console.log(visible);
        target.toggle(visible);
        trigger.find('.hide').toggle( visible );
        trigger.find('.show').toggle( ! visible );
    });
    
    // prevents text selection on doubleclick
    $(trigger_el).bind('mousedown', function (e) {
        return false;
    });
}




