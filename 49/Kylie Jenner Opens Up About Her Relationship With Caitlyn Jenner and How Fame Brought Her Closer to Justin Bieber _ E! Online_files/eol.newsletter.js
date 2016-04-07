var eol = eol || {};

(function($) {

    $(document).ready(function () {

        if($('#promo-main-container').attr('data-dialogType')){

            var showDialog = true,
                promoDialogNoTransition = false,
                promoFlyout = 'DESKTOP_NEWSLETTER_FLYOUT',
                promoLightbox = 'DESKTOP_NEWSLETTER_LIGHTBOX',
                promoPrivacy = 'promoPrivacy',
                cookieViews = 1,
                promoHeight = 0,
                promoWidth = 0,
                promoViews = Number($('#promo-main-container').attr('data-promoViews')),
                promoDays = Number($('#promo-main-container').attr('data-promoDays')),
                promoPageConfigFullPath = $('#promo-main-container').attr('data-pageConfigFullPath').split('/').join('_').toUpperCase(),
                cookieLegacy1 = $.cookie('sailthru'),
                cookieLegacy2 = $.cookie('sailthru_hid'),
                cookieLegacy3 = $.cookie('sailthru_bid'),
                cookieTypeName = $('#promo-main-container').attr('data-dialogType') + '_' + promoPageConfigFullPath,
                cookieTypeRef = $.cookie(cookieTypeName);
                ie = false,
                ie9 = false,
                safari = false,
                safari9OrAbove = false;

            if($.browser.safari){

                safari = true;
                if(parseInt($.browser.version) >= 9){
                    safari9OrAbove = true;
                }
            }

            if($.browser.msie){

                ie = true;
                if($.browser.version.indexOf('9.' == -1)){
                    ie9 = true;
                }
            }

            if(cookieTypeRef === null || cookieTypeRef === '' || cookieTypeRef === 'null' || cookieTypeRef === undefined){
                console.log('promo - no cookie');
                // NO COOKIE - set cookie to view of 1
                cookieViews = 1;

                $.cookie(cookieTypeName, cookieViews, {
                    expires: promoDays,
                    path: '/'
                });
            }
            else{
                console.log('promo - cookie exists');
                // COOKIE EXISTS - increment view
                cookieViews = Number(cookieTypeRef);

                if(cookieViews <= promoViews){

                    cookieViews++;

                    $.cookie(cookieTypeName, cookieViews, {
                        expires: promoDays,
                        path: '/'
                    });
                }
            }

            var isEmail = function (email) {
                var isValid = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return isValid.test(email);
            }

            var _commands = {

                newsletterEvents: function(){

                    var promoShow = function (){

                        $('body').off('click', promoShow);

                        if (showDialog && _commands.enableBasedOnCookie()) {

                            if ($(".promo_dialog_content").dialog("isOpen") === false && _newsletter.get('dialogType') == promoFlyout) {

                                var thisShow = false;

                                if(ie9){ // fix caret blinking bleeding through overlay div bug for outdated browser popup

                                    if($('#jr_overlay').is(':visible')) {
                                        // :hidden not working - so testing visible (!?)
                                    }
                                    else{
                                        thisShow = true;
                                    }
                                }
                                else {
                                    thisShow = true;
                                }

                                if(thisShow){
                                    // FLYOUT

                                    $(window).off('scroll.nlflyout');
                                    eol.newsletter.show();

                                    _commands.setPositionFix();
                                }
                            }
                        }
                    }

                    $(window).on('scroll.nlflyout', function () {
                        promoShow();
                    });

                    $('body').on('click', promoShow);

                    $('body').on('click', '.ui-widget-overlay', function () {

                        $('body').off('click', '.ui-widget-overlay');
                        eol.newsletter.hide(true);

                    });

                    $('body').on('click', '.ui-dialog-titlebar-close', function (e) {
                        e.preventDefault();
                    });

                },
                setDialogPosition: function(dialogVal){

                    _commands.setPromoDialogCurrentState(dialogVal);

                    $('.promo_dialog').removeClass('promo_dialog_border promo_dialog_border_none promo_dialog_center promo_dialog_center_privacy promo_dialog_right promo_dialog_right_no_transition');
                    $('.promo_dialogbox_privacy_bg').hide();

                    $('#HHeader').removeClass('promo_dialog_hheader_zindex');

                    if(dialogVal === promoPrivacy) {
                        // privacy section
                        promoWidth = 494;
                        promoHeight = 468;

                        $('#HHeader').addClass('promo_dialog_hheader_zindex');

                        if($('#promo-main-container').attr('data-dialogType') == promoFlyout) {
                            $('.promo_dialogbox_privacy_bg').show();
                        }

                        $('.promo_dialog').addClass('promo_dialog_center_privacy').addClass('promo_dialog_border_none');

                    }
                    else if (dialogVal === promoLightbox) {
                        // lightbox
                        promoWidth = 694;
                        promoHeight = 472;

                        $('.promo_dialog').addClass('promo_dialog_center').addClass('promo_dialog_border_none');
                        $('#HHeader').addClass('promo_dialog_hheader_zindex');

                    }
                    else{
                        // flyout
                        promoWidth = 500;
                        promoHeight = 329;

                        if(promoDialogNoTransition){
                            promoDialogNoTransition = false;
                            $('.promo_dialog').addClass('promo_dialog_right_no_transition');
                        }
                        else{
                            $('.promo_dialog').addClass('promo_dialog_right');
                        }

                        $('.promo_dialog').addClass('promo_dialog_border');
                    }

                    $(".promo_dialog_content").dialog({ width: promoWidth, height: promoHeight });

                },
                setPositionFix: function(){

                    if(_newsletter.get('dialogType') == promoLightbox){
                        // lightbox
                        if(safari && !safari9OrAbove){
                            $('.promo_dialog_msg_error_bottom.promo_dialog_msg_error').toggleClass('promo_dialog_msg_error_bottom_lightbox_position_safari');
                        }
                        else{
                            $('.promo_dialog_msg_error_bottom.promo_dialog_msg_error').toggleClass('promo_dialog_msg_error_bottom_lightbox_position');
                        }
                    }
                    else{
                        // flyout
                        if(safari && !safari9OrAbove){
                            $('.promo_dialog_msg_error_bottom.promo_dialog_msg_error').toggleClass('promo_dialog_msg_error_bottom_flyout_position_safari');
                        }
                        else{
                            $('.promo_dialog_msg_error_bottom.promo_dialog_msg_error').toggleClass('promo_dialog_msg_error_bottom_flyout_position');
                        }
                    }
                },
                enableBasedOnCookie: function () {

                    if((cookieViews > promoViews)
                        || (cookieLegacy1 !== null && cookieLegacy1 !== '' && cookieLegacy1 !== 'null' && cookieLegacy1 !== undefined)
                        || (cookieLegacy2 !== null && cookieLegacy2 !== '' && cookieLegacy2 !== 'null' && cookieLegacy2 !== undefined)
                        || (cookieLegacy3 !== null && cookieLegacy3 !== '' && cookieLegacy3 !== 'null' && cookieLegacy3 !== undefined)){
                        // legacy cookie exists - OR - views more then max views - do not show popup
                        showDialog = false;
                        return false;
                    }
                    else{
                        return true;
                    }
                },

                initDialog: function () {

                    var isModal = $('#promo-main-container').attr('data-dialogType') != promoFlyout;

                    // modal false = no overlay

                    $(".promo_dialog_content").dialog({
                        autoOpen: false,
                        height: promoHeight,
                        width: promoWidth,
                        modal: isModal,
                        closeOnEscape: false,
                        draggable: false,
                        fluid: true,
                        resize: 'auto',
                        resizable: false,
                        dialogClass: 'promo_dialog',
                        beforeClose: function (e) {

                            // fixes some elements that appear above overlay
                            $('.ui-widget-overlay').removeClass('promo_use_this promo_dialog_overlay_custom');
                            $('.ui-widget-overlay').css({'z-index': ''});

                            if (_newsletter.get('sectionPrivacyStatement')) {
                                _commands.sectionInit();
                            }
                            else {
                                eol.newsletter.hide(false); // pass false to stop endless loop
                            }

                        }
                    }).parent().css({"position": "fixed"}).end().on("dialogopen", function () {

                        // fixes some elements that appear above overlay
                        $('.ui-widget-overlay').addClass('promo_use_this promo_dialog_overlay_custom');
                        $('.ui-widget-overlay').css({'z-index': '1000003'});

                        if ($('#promo-main-container').attr('data-dialogType') == promoFlyout) {

                            if(ie9) { // IE 9 does not support all of CSS3 - aka transitions - !

                                $('.promo_dialog').toggleClass('promo_dialog_animate_slide_opposite');

                                $('.promo_dialog').animate({
                                    right: '0'
                                });
                            }
                            else{
                                $('.promo_dialog').toggleClass('promo_dialog_animate_slide');
                            }
                        }
                    });

                    $(".promo_dialog_content").data('uiDialog')._position = $.noop;
                },
                sectionSuccess: function (emailValue) {

                    $('.promo_dialog_loading').show();
                    $('.promo_dialog_msg_success').hide();
                    $('.promo_dialog_msg_error_subscribing').hide();

                    var theData = {
                        "edition": $('#promo-main-container').attr('data-edition'),
                        "email": emailValue,
                        "news": true
                    };

                    jQuery.ajax({
                        type: "POST",
                        url: "/mvc/hudson/mail/newsLetterAdd",
                        data: theData,
                        dataType: "json",
                        timeout: 35000, // in milliseconds
                        success: function () {

                            $.cookie(cookieTypeName, '11', {
                                expires: promoDays,
                                path: '/'
                            });

                            $('.promo_dialog_loading').hide();
                            $('.promo_dialog_msg_success').show();
                        },
                        error: function(){

                            $('.promo_dialog_loading').hide();
                            $('.promo_dialog_msg_error_subscribing').show();
                        }
                    });

                    _newsletter.set('sectionInit', false);
                    _newsletter.set('sectionSuccess', true);
                    _newsletter.set('sectionPrivacyStatement', false);
                },
                sectionInit: function () {
                    _newsletter.set('sectionInit', true);
                    _newsletter.set('sectionSuccess', false);
                    _newsletter.set('sectionPrivacyStatement', false);
                },
                sectionPrivacyStatement: function () {
                    _newsletter.set('sectionInit', false);
                    _newsletter.set('sectionSuccess', false);
                    _newsletter.set('sectionPrivacyStatement', true);
                },
                setPromoDialogCurrentState: function(v){
                    _newsletter.set('promoDialogCurrentState', v);
                }
            };

            /*--------------------------------*/
            /*| SET UP RACTIVE TEMPLATE |*/
            /*--------------------------------*/
            var _newsletter = new Ractive({
                el: '#promo-main-container',
                template: '#newsletter-template',
                data: {
                    bgImg: $('#promo-main-container').data('bg'),
                    dialogType: $('#promo-main-container').attr('data-dialogType'),
                    success: null
                },
                oncomplete: function () {

                    var timerRef;

                    function showNewsletter(){

                        // fix caret blinking bleeding through overlay div bug for outdated browser popup

                        if($('#jr_overlay').is(':visible')) {
                            // :hidden not working - so testing visible (!?)
                        }
                        else{

                            clearInterval(timerRef);
                            eol.newsletter.show();
                            _commands.setPositionFix();
                        }
                    }

                    _commands.initDialog();
                    _commands.newsletterEvents();

                    // if Cookies LOAD!

                    if (_commands.enableBasedOnCookie() && _newsletter.get('dialogType') == promoLightbox) {

                        if(ie9){ // fix carret bleeding through overlay div bug
                            timerRef = setInterval(showNewsletter, 1000);
                        }
                        else{

                            // LIGHTBOX
                            eol.newsletter.show();
                            _commands.setPositionFix();
                        }
                    }
                }
            });

            /*--------------------------------*/
            /*| SET EVENTS |*/
            /*--------------------------------*/
            _newsletter.on({
                toggleCheckbox: function () {

                    $('#promo_dialog_newsletter_btn').toggleClass('promo_dialog_submit_btn_disabled').toggleClass('promo_dialog_submit_btn_enabled');
                    $('.promo_dialog_msg_error_top').hide();
                    $('.promo_dialog_msg_error_bottom').hide();

                },
                openDialogPrivacy: function () {

                    _commands.setDialogPosition(promoPrivacy);
                    _commands.sectionPrivacyStatement();

                },
                backToInitDialog: function () {

                    promoDialogNoTransition = true;

                    _commands.setDialogPosition($('#promo-main-container').attr('data-dialogType'));
                    _commands.sectionInit();
                    _commands.setPositionFix();

                },
                signUp: function () {

                    if (showDialog && _commands.enableBasedOnCookie()) {

                        $('#promo-main-container').show(); /* prevent promo from showing at bottom when page crashes */
                        _commands.setDialogPosition($('#promo-main-container').attr('data-dialogType'));
                        _commands.sectionInit();
                        jQuery(".promo_dialog_content").dialog('open');

                    }
                },
                submit: function () {

                    $('.promo_dialog_msg_error_top').hide();
                    $('.promo_dialog_msg_error_bottom').hide();

                    if ($('#promo_dialog_newsletter_btn').hasClass('promo_dialog_submit_btn_enabled')) { // button is enabled

                        // email validation
                        if(isEmail($('.promo_dialog_email_txt').val())) {
                            _commands.sectionSuccess($('.promo_dialog_email_txt[type="text"]').val());
                        }
                        else {
                            $('.promo_dialog_msg_error_top').show();
                        }
                    }
                    else { // button is disabled

                        // email validation
                        if(isEmail($('.promo_dialog_email_txt').val())) {
                        }
                        else {
                            $('.promo_dialog_msg_error_top').show();
                        }

                        $('.promo_dialog_msg_error_bottom').show();
                    }
                },

                closeDialog: function (bolClose) {

                    function closeDialogReset(bolClose) {

                        if (bolClose) {
                            jQuery(".promo_dialog_content").dialog('close');
                        }

                        _newsletter.set('sectionInit', null);
                        _newsletter.set('sectionSuccess', null);
                        _newsletter.set('sectionPrivacyStatement', null);

                        if($('#promo-main-container').attr('data-dialogType') != promoFlyout) {
                            $('.ui-widget-overlay').removeClass('promo_dialog_ui_widget_custom_overlay').hide();
                        }
                        $('#HHeader').removeClass('promo_dialog_hheader_zindex');

                        $('.promo_dialog').hide();
                        $('.promo_dialogbox_privacy_bg').hide();

                        showDialog = false;
                    }

                    if ($('#promo-main-container').attr('data-dialogType') == promoFlyout) {

                        $('.promo_dialog').removeClass('promo_dialog_right_no_transition').addClass('promo_dialog_right');

                        if(ie9){
                            $('.promo_dialog').toggleClass('promo_dialog_animate_slide_opposite');
                            $('.promo_dialog').animate({
                                right: '-=500px'
                            });
                        }
                        else{ // toggleClass
                            $('.promo_dialog').toggleClass('promo_dialog_animate_slide');
                        }

                        setTimeout(function () {
                            closeDialogReset(bolClose);
                            clearTimeout(this);
                        }, 500);
                    }
                    else {
                        closeDialogReset(bolClose);
                    }

                }
            });

            /*--------------------------------*/
            /*| SET PUBLIC METHODS |*/
            /*--------------------------------*/

            eol.newsletter = {
                show: function () {
                    _newsletter.fire('signUp');
                    return this;
                },
                hide: function (bolClose) {
                    _newsletter.fire('closeDialog', bolClose);
                    return this;
                }
            };
        }
    });

})(jQuery);