if(typeof window.parent.jQuery != "undefined" ){
        window.parent.jQuery(document).ready(
               function(){
                       var aRandomNumber = Math.random();
                       var aSrc = "http://subscription-assets.people.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/pe-signintoread/tout.js";

                       if(aRandomNumber >= 0.5){
                               aSrc = "http://subscription-assets.people.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/pe-signintoread0715/tout.js";
                       }              

                       var s = parent.document.createElement("SCRIPT");
                       s.src = aSrc;
                       parent.document.getElementsByTagName("HEAD")[0].appendChild(s);
               }
        );
}