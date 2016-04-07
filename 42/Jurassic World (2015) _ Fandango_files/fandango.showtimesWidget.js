//Fandango Showtimes Widget js, ajax functions for showtimes widget, movie detail, disqus, and related content html

var Fandango = Fandango || {};
"use strict";
	
Fandango.showtimesWidget =  {
    pending: false,

    initialize: function () {
        $(document).on('keypress', '.showtimes-widget-search-input' , function(e){
            if (e.keyCode == 13) {
                var thisWidget = $(this).closest('.showtimes-widget'); // Find the widget container that contains that text field
                Fandango.showtimesWidget.ValidateLocation(thisWidget);
                return false;
            }
        });

        $(document).on('click', '.showtimes-widget-search-go' , function(e){
            e.preventDefault();
            var thisWidget = $(this).closest('.showtimes-widget'); // Find the widget container that contains the go button
            Fandango.showtimesWidget.ValidateLocation(thisWidget);
        });
    },

    ValidateLocation: function(thisWidget) {

        var searchText = $.trim($(thisWidget).find($('.showtimes-widget-search-input')).val());
        var errorMessage = $(thisWidget).find($('.error-msg'));

        if (searchText == '' || Fandango.showtimesWidget.pending)
        return;

        Fandango.showtimesWidget.pending = true;

        var ajaxUrl = Fandango.global.serverPath + '/Services/Content.aspx?aop=validatelocation&location=' + searchText;
        $.ajax({
            url: ajaxUrl,
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            success: function (data) {
                data = JSON.parse(data);
				//console.log("VALIDATELOCATION"+data);
                if(data.IsValid) {
                    Fandango.showtimesWidget.GetShowtimesWidget(thisWidget);
                }
                else {
                    errorMessage.empty().append('This location could not be found, please try again.').show();
                    Fandango.showtimesWidget.pending = false;
                }
            },
            error: function (data, status, jqXHR) {
                errorMessage.empty().append('').show();
                Fandango.showtimesWidget.pending = false;
            }
        });
    },

    GetShowtimesWidget: function(thisWidget,movieId){
        if (movieId == undefined){
			movieId = $.trim($(thisWidget).siblings($('.movieId')).val());
		}

        var ajaxShowtimesWidget =  $(thisWidget).closest($('.showtimes-module'));
        if ($(thisWidget).hasClass('location-widget')){
            var locationWidget = $(thisWidget);
        }
      
        var ajaxShowtimesWidgetUrl =  Fandango.global.serverPath + '/Services/Content.aspx?aop=movieshowtimeswidget&mid=' + movieId;
        $.ajax({
            url: ajaxShowtimesWidgetUrl,
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            success: function (data) {
                if(locationWidget != undefined){
                    locationWidget.hide();
                }
				var hasEmailInput = $(data).find('input.showtimes-widget-fanalert-email-input').length > 0;
                ajaxShowtimesWidget.html(data);
                Showtime.InitLocation(); //Set fanalert cookied zipcode   
                Fandango.showtimesWidget.pending = false;
				//console.log("GETSHOWTIMESWIDGET"+data);
            },
            error: function (data, status, jqXHR) {
                Fandango.showtimesWidget.pending = false;
            }
        });
    },
	
	GetMovieDetail: function(movieId){
        if (movieId == undefined){
            movieId = $.trim($('.movieId').val());
        }

        var movieDetailUrl =  Fandango.global.serverPath + '/Services/Content.aspx?aop=movieposterrepeater&mid=' + movieId; //if mid is array, returns multiple posters

         $.ajax({
            url: movieDetailUrl,
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            success: function (data) {
                 $('.movie-detail-sections-container').html(data); //need to append multiple
                Fandango.showtimesWidget.pending = false;
                //console.log("GETMOVIEDETAIL"+data);
                $(document).foundation(); // needed to re-init reveal
            },
            error: function (data, status, jqXHR) {
                Fandango.showtimesWidget.pending = false;
            }
        });           
	  
	},

    GetDisqus: function(clipId){
        var disqusUrl =  Fandango.global.serverPath + '/Services/Content.aspx?aop=getdisquscomments&disqusIdentifier=video_' + clipId;
        $.ajax({
            url: disqusUrl,
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            success: function (data) {
                 $('.disqus-module').html(data);
                Fandango.showtimesWidget.pending = false;
            },
            error: function (data, status, jqXHR) {
                Fandango.showtimesWidget.pending = false;
            }
        });           
      
    },

    GetRelatedContent: function(movieId, currentClipId, contentType){

        var videoType = 'videogallery';
        if(contentType == 'Featured'){
            videoType = 'show';
        } else
        if($('.video-page.trailers').length > 0){
            videoType = 'trailers';
        }

        var relatedContentUrl =  Fandango.global.serverPath + '/Services/Content.aspx?aop=getrelatedcontent' + videoType + '&mid=' + movieId + '&mpxId=' + currentClipId;
         console.log("URL: "+relatedContentUrl);
        $.ajax({
            url: relatedContentUrl,
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            success: function (data) {
                 $('.content-side-module').html(data);
                Fandango.showtimesWidget.pending = false;
            },
            error: function (data, status, jqXHR) {
                Fandango.showtimesWidget.pending = false;
            }
        });           
    },
};
	
$(document).ready(function () {
    Fandango.showtimesWidget.initialize();
});
