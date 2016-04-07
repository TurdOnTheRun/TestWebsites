define(["lib/s_code_rottentomatoes"], function(){ // s_code does not return s but sets it globally
    window.optimizely = window.optimizely || [];
    window.optimizely.push("activateSiteCatalyst");
    // Responsive Extension
    s.getRwd=new Function("rwd","phoneMax","desktopMin",""
            +"if(rwd){var bpoint;var w=window.innerWidth||document.documentElemen"
            +"t.clientWidth||document.body.clientWidth;var h=window.innerHeight||"
            +"document.documentElement.clientHeight||document.body.clientHeight;i"
            +"f(w<phoneMax){bpoint='phone layout';}else{if(w>=desktopMin){bpoint="
            +"'desktop layout';}else{if(w>=phoneMax&&w<desktopMin){bpoint='tablet"
            +" layout';}}}bpoint=bpoint+':'+w+'x'+h;}else{bpoint='not rwd page:'+"
            +"w+'x'+h;}return bpoint;");

    return s;
});