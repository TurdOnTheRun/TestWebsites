 // Fandango Showtimes Fanalert js for Fanalert module and Showtimes Widget Fanalert module

// Note: when refactoring this code, make sure Showtime.InitLocation(); in showtimesWidget.js is accounted for.

 // The search location object for passing the JSON values to the service
function SearchLocation() {
	this.location = null; 
}

// The Fan Alert object for passing JSON to the service
function FanAlert() {
    this.subscribeToFanMail = false;
    this.fanalertSource = null; 
}

var newGuid = (function () {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
				   .toString(16)
				   .substring(1);
	}
	return function () {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			   s4() + '-' + s4() + s4() + s4();
	};
})();

var Showtime = {
    initialize: function () {
        $(document).on('keypress', '.fanalert-email-input, .showtimes-widget-fanalert-email-input, .fanalert-location-input, .showtimes-widget-fanalert-location-input' , function(e){
            if (e.keyCode == 13) {
                if($(this).closest('.showtimes-widget').length === 0){ // Check if it's a widget or standalone
                    var thisWidget = $(this).closest('.showtimes-fanalert-module'); // Find the widget container that contains the form
                }else{
                    var thisWidget = $(this).closest('.showtimes-widget'); // Find the widget container that contains the form
                }
                Showtime.SubscribeToFanAlert(thisWidget);
            }
        });

        $(document).on('click', '.fanalert-signup' , function(){
            if($(this).closest('.showtimes-widget').length === 0){ // Check if it's a widget or standalone
                var thisWidget = $(this).closest('.showtimes-fanalert-module'); // Find the widget container that contains the form
            }else{
                var thisWidget = $(this).closest('.showtimes-widget'); // Find the widget container that contains the form
            }
            Showtime.SubscribeToFanAlert(thisWidget);
            return false;
        });
    
    },

	// Initializes the location by grabbing the set cookie and setting the textbox
	InitLocation: function () {
		var location = Fandango.util.getCookie('searchvalue');
		var fanAlert = $('.fanalert-main');
		var isShowtimesWidget = $.trim($('.is-showtimes-widget').val());
	
		if (isShowtimesWidget == 'False'){
			//$('.fanalert-location-input').val($.trim(location));
		}
		else {
			//$('.showtimes-widget-fanalert-location-input').val($.trim(location));
		}
	},
		
	fireFanAlertPixel: function () {
		var s, f, c = document.cookie; s = c.indexOf("ed164819032"); if (s == -1) { s = c.indexOf("eds164819032") };
		if (s > -1) {
			c = c.substring(s + 1); c = c.substring(c.indexOf("=") + 1); e = c.indexOf(";"); f = c.substring(0, e == -1 ? c.length : e);
			return '<img src="https://pd.ed10.net/w/0G/MSMRAN8/C5R925?CEDID=' + f + '&pk=' + newGuid() + '&et=fanmailalert" height="1" width="1" />';
		} else {
			return '';
		}
    },

    SubscribeToFanAlert: function(thisWidget) {
	
		var isShowtimesWidget = $.trim($(thisWidget).find($('.is-showtimes-widget')).val());
        var fanAlertZip = $.trim($(thisWidget).find($('.fanalert-location-input')).val());
        var fanAlertEmail = $.trim($(thisWidget).find($('.fanalert-email-input')).val());
        var fanAlertError = $(thisWidget).find($('.fanalert-error.error-msg'));
		var fanAlertMovieId = $.trim($(thisWidget).find($('.movieId')).val());
		
		if (isShowtimesWidget == 'True'){
			fanAlertZip = $.trim($(thisWidget).find($('.showtimes-widget-fanalert-location-input')).val());
			fanAlertEmail = $.trim($(thisWidget).find($('.showtimes-widget-fanalert-email-input')).val());	
			fanAlertError =  $(thisWidget).find($('.error-msg'));
	    }

        // simple check for valid email address.  Checks for '@' and '.'
        if(fanAlertEmail == '' || fanAlertEmail.indexOf('@') == -1 || fanAlertEmail.indexOf('.') == -1) {
            fanAlertError.empty().append('This email address is not valid, please try again.').show();
            $(thisWidget).find($('.fanalert-email-input')).focus();
            return;
        }            

        var fanAlertJson = new FanAlert();
        fanAlertJson.subscribeToFanMail = $(thisWidget).find($('.fanMailOptIn')).is(':checked');
        fanAlertJson.fanalertSource =  $.trim($(thisWidget).find($('.fanalertSource')).val());
		var ajaxUrl = Fandango.global.serverPath + '/Services/Content.aspx?aop=subscribetofanalert&mid=' + fanAlertMovieId + '&e=' + fanAlertEmail + "&location=" + fanAlertZip + "&subscribe=" + fanAlertJson.subscribeToFanMail + "&source=" + fanAlertJson.fanalertSource;
        $.ajax({	
            url: ajaxUrl,
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            success: function (data) {
                data = JSON.parse(data);
                if (data.IsSuccessful) {
                    fanAlertError.empty().hide();
                    $(thisWidget).find($('.fanalert-main')).addClass("is-hidden"); //.hide();
                    $(thisWidget).find($('.fanalert-main.fanalert-success'))
                        .append(Showtime.fireFanAlertPixel() + '<img css="display:none;" src="https://18.xg4ken.com/media/redir.php?track=1&token=f2eb9732-747b-4b07-a2fd-bc98c1928f76&type=fan_alert&val=0.0&orderId=&promoCode=&valueCurrency=USD&GCID=&kw=&product=" width="1" height="1">')
                        .removeClass("is-hidden"); //.show();
						if (isShowtimesWidget == 'True'){
							$(thisWidget).find($('.showtimes-widget-header')).addClass("is-hidden"); //.hide(); 
							$(thisWidget).find($('.showtimes-widget-fanalert-main')).addClass("is-hidden"); //.hide();
							$(thisWidget).find($('.showtimes-widget-fanalert-main.fanalert-success'))
								.append(Showtime.fireFanAlertPixel() + '<img css="display:none;" src="https://18.xg4ken.com/media/redir.php?track=1&token=f2eb9732-747b-4b07-a2fd-bc98c1928f76&type=fan_alert&val=0.0&orderId=&promoCode=&valueCurrency=USD&GCID=&kw=&product=" width="1" height="1">')
								.removeClass("is-hidden"); //.show();
						}
                }
                else {
					if(data.Message == ''){
						fanAlertError.empty().append('Sorry, we could not subscribe you to fanalert at this time.').show();
					}
					else {
						fanAlertError.empty().append(data.Message).show();
					}
                }
            },
            error: function (data, status, jqXHR) {
                fanAlertError.empty().append('Sorry, we could not subscribe you to fanalert at this time.').show();
            }
        });
    },

};

$(document).ready(function () {
    Showtime.InitLocation();
	Showtime.initialize(); 
});

