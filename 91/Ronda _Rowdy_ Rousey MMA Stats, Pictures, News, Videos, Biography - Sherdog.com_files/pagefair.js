<!-- PageFair Code.  -->
(function() {
    function async_load(){
        var protocol = ('https:' == document.location.protocol ? 'https://' : 'http://');
        var s = document.createElement('script');
        s.src = protocol + 'pagefair.com/static/adblock_detection/js/d.min.js';
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    }
           
    bm_website_code = 'D71AA6B4803E47EB';
    jQuery(document).ready(async_load);
})();