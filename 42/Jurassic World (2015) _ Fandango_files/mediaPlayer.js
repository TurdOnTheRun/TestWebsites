var Fandango = Fandango || {};
"use strict";

Fandango.mediaPlayer = {   
    playerWidth: 620,
    playerHeight: 350,
    hasEndCard: false,
    mediaListId: 0,
    autoPlay: false,
    continousPlay: true,
    moduleSelector: $(".media-player-module"),
    firstItem: null,
    lastItem: null,
    mediaListId: 0,
    startVideoId: 0,

    initialize: function (options) {
        var options = options || {};
        this.autoPlay = options.autoPlay || this.autoPlay;
        this.hasEndCard = options.hasEndCard || this.hasEndCard;

        this.thumbnailCarousel();
        this.setStartVideoId();

        this.moduleSelector.find(".media-thumbnails ul li a").click(function(event){
            event.preventDefault();
            Fandango.mediaPlayer.playVideo($(this).parent().attr("data-video-id") );
        });

        this.moduleSelector.find(".media-player.placeholder").click(function(){
            //find the first video:
            Fandango.mediaPlayer.playVideo(Fandango.mediaPlayer.getStartVideoId());
        });
        //if ad category is added
        //this.setAdCategory(this.urlParam("adcategory"));
        this.firstItem = this.moduleSelector.find(".jcarousel li").first();
        this.lastItem = this.moduleSelector.find(".jcarousel li").last();

        if(this.autoPlay) {
            //if there is video id, then player will start from this particular video
            this.playVideo(this.getStartVideoId());
        }
        $(".prev-navigation").addClass("disabled");

        var lastJcarouselItem = this.moduleSelector.find('.jcarousel').jcarousel('last');
        var lastThumb = this.moduleSelector.find('.jcarousel ul li').last();

        if(lastJcarouselItem.attr("class") == lastThumb.attr("class")) {
            $(".next-navigation").addClass("disabled");
        }

        $(".media-player-module").on("videoStart.fandango", function(event){ 
            Fandango.mediaPlayer.updateShareLink();
        });
        
        if(this.isEndcardPreview()) {

        }

    },

    setStartVideoId: function(){
        var mpxId = this.urlParam("mpxId");

        if( mpxId && mpxId > 0 ) {
            this.startVideoId = mpxId;
            var $currentVideo = this.moduleSelector.find('.media-thumbnails ul li[data-video-id=' + mpxId + ']');
            //this.setVideoTitle($currentVideo.find(".video-title").html(), $currentVideo.find(".video-description").html());
        }
        else{
            var $firstVideo = Fandango.mediaPlayer.moduleSelector.find(".media-thumbnails .jcarousel li:eq(0)");
            this.startVideoId = $firstVideo.attr("data-video-id");
        }
    },

    getStartVideoId: function(){
        return this.startVideoId;
    },

	isEndcardPreview: function() {
		return this.getParameterByName('type') == 'endcard' && this.getParameterByName('pre') == '1';
	},
	
	getParameterByName: function(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},

    thumbnailCarousel: function() {
        this.moduleSelector.find('.jcarousel')
            .jcarousel({
                // Options go here
        });

        /*
         Prev control initialization
         */
        this.moduleSelector.find('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('click', function() {
                Fandango.mediaPlayer.prevThumbNav(this); 
         });
        /*
         Next control initialization
         */          
            
        this.moduleSelector.find('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('click', function() {
                if(!$(this).hasClass("disabled")){
                    Fandango.mediaPlayer.moduleSelector.find('.jcarousel').jcarousel('scroll', '+=4');
                }

 
         });

         this.moduleSelector.find('.jcarousel')
            .on('jcarousel:animateend', function(event, carousel) {
                var currentFirstItem = $(this).jcarousel('first');
                var currentLastItem  = $(this).jcarousel('last');
                $(".prev-navigation, .next-navigation").removeClass("disabled");
                if(currentFirstItem.attr("class") === Fandango.mediaPlayer.firstItem.attr("class") ){
                    $(".prev-navigation").addClass("disabled");
                }
                if(currentLastItem.attr("class")  == Fandango.mediaPlayer.lastItem.attr("class") ) {
                    $(".next-navigation").addClass("disabled");;
                }
            });

    }, 

    prevThumbNav: function(prevButton){
       
              if(!$(prevButton).hasClass("disabled")){
                    setTimeout(function(){
                        var first = Fandango.mediaPlayer.moduleSelector.find('.jcarousel').jcarousel('first');
                        
                        if(Fandango.mediaPlayer.moduleSelector.find('.jcarousel ul li').index(first) < 4){
                           Fandango.mediaPlayer.moduleSelector.find('.jcarousel').jcarousel('scroll', $(".jcarousel li").eq(0));
                        }
                        else{
                           Fandango.mediaPlayer.moduleSelector.find('.jcarousel').jcarousel('scroll', '-=4'); 
                        }
                        
                    },50);
    }},
    /* Play video of the current page by index */
    playVideo: function (videoId) {

        var $currentVideo = this.moduleSelector.find('.media-thumbnails ul li[data-video-id=' + videoId + ']');
        var playerUrl = $currentVideo.attr("data-iframe-url");


        var videoIndex = $currentVideo.attr("data-video-index");
        // Remove placeholder 
       // $(".media-player.placeholder").remove();

        this.createIFrame(playerUrl);
        
        this.moduleSelector.find(".media-thumbnails li").removeClass("active");
        $(".media-player").removeClass("placeholder").addClass("now-playing").css("background", "none");

        //select the current video in navigation
        this.moduleSelector.find(".media-thumbnails li").removeClass("active");
        this.moduleSelector.find(".media-thumbnails li.thumb_" + videoIndex).addClass("active");

        this.setVideoTitle($currentVideo.find(".video-title").html(), $currentVideo.find(".video-description").html());
        this.moduleSelector.find(".media-current-index").html(videoIndex);
        // TRIGGER and broadcast that video changed along with video object

        this.moduleSelector.trigger( "videoStart.fandango", $currentVideo);
        //if the thumb is not visible, then scroll there.
        this.moduleSelector.find('.jcarousel').jcarousel('scroll', $(".jcarousel li.active"));


    },

    setVideoTitle: function(videoTitle, videoDescription) {
        //Update player video information:
        this.moduleSelector.find(".media-descriptions h2").html(videoTitle);
        this.moduleSelector.find(".media-descriptions .description").html(videoDescription);

    },



    /* Create iframe for video player*/
    createIFrame: function (playerSrc){

            var $playerDiv = $(".media-player");
            var iframeClassName= "fandangoMediaPlayer";
            var $iframeDiv = $playerDiv.find("." + iframeClassName);
            
            if ($iframeDiv.length > 0)
            {
                $iframeDiv.remove();
            }
            
         

            var $createframe = $('<iframe />', {
                name:  iframeClassName,
                class:  iframeClassName,
                id: "playerFrame",
                src: playerSrc + (playerSrc.indexOf('?') < 0 ? '?' : '&') + 'autoPlay=true',
                scrolling:  'no',
                allowFullScreen: '',
                width: this.getPlayerWidth(),
                height: this.getPlayerHeight()
            });
            $playerDiv.html($createframe);
            this.addVarialbes();
        
    },

    addVarialbes: function() {
        
        $pdk.bind('playerFrame');
         var freewheelvalue = null;
                //Add MPS value
        if( typeof mps !== "undefined" && typeof mps.response !== "undefined") {
            try {
                freewheelvalue=    mps.response.page.freewheel;
               $pdk.controller.setVariable({'freewheelvalue': freewheelvalue});
            }
            catch (e) {
                if( typeof console !== "undefined"){
                     console.log("[ERROR][NBCU TVE] Failed to load freewheel value. \n" + e)      
                }
            }          
        }

        // add our Krux data to the PDK

        try {
            var ksg = window.localStorage.kxsegs;
            var kuid = window.localStorage.kxuser;
            $pdk.controller.setVariable({'ksg': ksg, 'kuid': kuid});
        } catch (e) {
             if( typeof console !== "undefined"){
                console.log("[ERROR][NBCU TVE] Failed to load Krux localStorage values. \n" + e)
            }
        }
    
    }, 

    /* Play next video */
    playNext: function () {

        if( this.continousPlay ) {

            var currentIndex = parseInt(this.moduleSelector.find(".media-current-index").html());
            var totalIndex = parseInt(this.moduleSelector.find(".media-total-count").html());
            var videoEndCardId = null;

            //check if video has end card, if so, display it
            if (videoEndCardId != null) {
                this.displayEndCard(videoEndCardId);
            }
            //Go to next page
            else if(currentIndex < totalIndex){
                //find the video id for this: 
                var $currentVideo = this.moduleSelector.find('.media-thumbnails ul li[data-video-index=' + (currentIndex + 1) + ']');
                this.playVideo($currentVideo.attr("data-video-id"));
            }
            //if this is the last video, show the end card
            else if(currentIndex == totalIndex){
                if(this.hasEndCard == true){
                    this.displayEndCard();
                } 
            }  

        }
        
    },

    displayEndCard: function (endCardId) {
        var endCardUrl = Fandango.global.serverPath + '/Services/Content.aspx?aop=getendcard';
        if (endCardId) {
            endCardUrl += '&endCardId=' + endCardId.toString();
        } else {
           endCardUrl += '&mediaListId=' + this.mediaListId.toString();
        }

        $.ajax({
            url: endCardUrl,
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            success: function (data) {
               $('.media-player').html(data); //hardcoded selector. Replace only the video area, not playlist.
            },
            error: function (data, status, jqXHR) {
            }
        });
    },

   /**
     * This function replaces all space in string parameter t with delimiter
     *
     * @param t string
     * @param delimiter string
     */
    reformatString: function(t, delimiter)
    {
        if(t != null){
            // replace spaces with plus sign; get rid of double, single quotes and HTML tags
            return t.replace(/\s/g, delimiter).replace(/\"/g, '').replace(/\'/g,'').replace(/(<([^>]+)>)/ig,"");
        }
    },
        
    /**
      * This method will extract the how from the page's location
    **/

    getHostUrl : function(){
        if(this.unitTest){
            return "";
        }
        if( this.hostOverride != null){
            return this.hostOverride;
        }
        var protocol = window.location.protocol + "//";
        var host = window.location.host;
        
        if ( (host.toLowerCase()).indexOf(".com") == -1 )
        {
            host += "/fandango";
        }
        
        return protocol + host;
    },

    urlParam : function(name){
        var opt_url = window.location.href;
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(opt_url);
        if (!results) { 
            return 0; 
        }
        return results[1] || 0;
    },

    //Setting Player width 
    setPlayerWidth: function(playerWidth){
        this.playerWidth = playerWidth;
    },

    //Getting Player width 
    getPlayerWidth: function(){
        return this.playerWidth;
    },

    //Setting Player height 
    setPlayerHeight: function(playerHeight){
        this.playerHeight = playerHeight;
    },

    //Getting Player height 
    getPlayerHeight: function(){
        return this.playerHeight;
    },

    updateShareLink: function() {

        var $currentVideo = this.moduleSelector.find('.media-thumbnails ul li.active');
        /* Update Share URLs on Share Module */
      
        $.each($('.share-panel a'), function(index, element) {  /* Loop through each anchor */
            var currentUrl = $(element).attr('href'); 
            var urlPattern = new RegExp(/.*?\?/i); /* Match: Everything up to the first question mark (lazy quantifier) */
            var result = urlPattern.exec(currentUrl);
            var baseUrl = result;
            var $videoLink = $currentVideo.find("a");
            var shareDescription = $videoLink.attr("data-share-description");
            var shareImage =  $videoLink.attr("data-share-image");
            var TwitterDescription =  $videoLink.attr("data-twitter-description");
            var shareLink = encodeURIComponent($videoLink.attr("href")); 
            var clipId = $currentVideo.attr("data-video-id");
            var movieId =  $currentVideo.attr("data-movie-id");
            var shareUrl;

          if (currentUrl.search('pinterest.com/') > 0) {
                var shareUrl = baseUrl 
                    + 'description=' + shareDescription
                    + '&media=' + shareImage
                + '&url=' + shareLink;
          } else if (currentUrl.search('twitter.com/') > 0) { 
            var shareUrl = baseUrl 
                + 'text=' + TwitterDescription
                + '&url=' + shareLink;
          } else if (currentUrl.search('facebook.com/') > 0) { 
            var shareUrl = baseUrl 
              + 'u=' + shareLink;
          } else if (currentUrl.search('google.com/') > 0) { 
            var shareUrl = baseUrl 
                + 'url=' + shareLink;
          }
          $(element).attr('href', shareUrl); 
        });
    }

};
