// topic lander JS
ezQuery(function() {
    ezQuery("#ez-mediaTypes.ez-horizontal li.ez-searchMod-filter-item").last().css("margin", "0px");
    /* Finding the useragent and add necessary classes to mainContent div based on useragent */
    var mainContent = ezQuery(".ez-page-topic-2-col .ez-mainContent");
    var android = navigator.userAgent.match(/Android/);
    var isAndroidMobile = false;
    if (android != null) {
        if (navigator.userAgent.match(/Mobile/) != null) {
            isAndroidMobile = true; //android mobile device
        }
    }
    if (navigator.userAgent.match(/Blackberry|iPhone|iPod\//i) || isAndroidMobile) {
        mainContent.attr("id", "rhi-phone");
        if (mainContent.length > 0) {
            ezQuery(".rightsection").remove();
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
            $("#rhi-phone").addClass("rhi-landscape");
        }

    } else if (navigator.userAgent.match(/iPad|Silk\//i) || android) {
        mainContent.attr("id", "rhi-tablet");
        ezQuery(".content #rhi-topSection").detach().insertAfter("#bannerad");
        ezQuery(".ez-page-topic-2-col .ez-mainContent .ez-breadcrumb").detach().appendTo("#rhi-topSection");
        ezQuery(".ez-page-topic-2-col .ez-mainContent h1").detach().appendTo("#rhi-topSection");
        ezQuery(".ez-page-topic-2-col .ez-mainContent .ez-socialLinks").detach().appendTo("#rhi-topSection");
        ezQuery(".ez-page-topic-2-col .ez-mainContent .ez-featuredResults").detach().appendTo("#rhi-topSection");
        ezQuery(".ez-mainContent .ez-media-details").detach().appendTo("#rhi-topSection");
        ezQuery("<div class='ez-clearingDiv'></div>").appendTo("#rhi-topSection");
        if (ezQuery("#rhi-topSection .ez-player-box").length == 0 && ezQuery("#rhi-topSection .ez-featuredResults").length == 0) {
            ezQuery(".ez-Return").addClass("ez-Return-tablet");
        }
    }
});
