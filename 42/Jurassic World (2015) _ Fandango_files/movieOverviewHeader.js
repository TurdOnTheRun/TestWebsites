var Fandango = Fandango || {};
"use strict";

Fandango.movieOverviewHeader = {
    initialize: function() {
        Fandango.movieOverviewHeader.subNavControl();
    },
    subNavControl: function() {
        if (Modernizr.touch) {
            $(".vertical-dropdown .page-navigation-link:not(.dropdown-nav .page-navigation-link)").on("touchstart", function(e) {
                e.preventDefault();
                $(this).parent().toggleClass("is-tapped");
                var dropdownNav = $(this).siblings('.dropdown-nav');
                if (dropdownNav.offset().left < 0) {
                    dropdownNav.css('left', '0px');
                } else {
                    dropdownNav.css('left', '-135px');
                }
                return false;
            });
        }
    }
};

$(function() {
    Fandango.movieOverviewHeader.initialize();
});