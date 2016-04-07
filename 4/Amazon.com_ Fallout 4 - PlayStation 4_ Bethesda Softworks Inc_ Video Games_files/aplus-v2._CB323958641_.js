(function() {
    function load($) { 
        $(document).ready(function() {
            $(".aplus-v2 .apm-hovermodule-smallimage").hover(function () {

                var parent = $(this).parents(".aplus-module");
                
                var hoverImages = parent.find(".apm-hovermodule-smallimage");
                var index=1;
                while(index <= hoverImages.length && hoverImages[index-1]!=this) {
                    index++;
                }
                parent.find(".apm-hovermodule-smallimage").addClass("apm-hovermodule-opacitymodon");
                parent.find(".apm-hovermodule-smallimage").find("p span").addClass("a-color-secondary");
                parent.find(".apm-hovermodule-slides").hide();
                
                parent.find(".apm-hovermodule-slidecontrol div:nth-child("+index+")").removeClass("apm-hovermodule-opacitymodon");
                parent.find(".apm-hovermodule-slidecontrol div:nth-child("+index+")").find("p span").removeClass("a-color-secondary");
                parent.find(".apm-hovermodule div.apm-hovermodule-slides:nth-child("+index+")").show();

            }, function() {});
        });
    };
    
    function start() {
        if(window.jQuery) {
            load(jQuery);
        } else if(window.amznJQ && amznJQ.available) {
            amznJQ.available('jQuery', function() {
                load(jQuery);
            });
        } else if(window.P) {
            P.when("jQuery","ready").execute(load);
        } else {
            setTimeout(start, 3000);
        }
    }
    
    start();
})()

