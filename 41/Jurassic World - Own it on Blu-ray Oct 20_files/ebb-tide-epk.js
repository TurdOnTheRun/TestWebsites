$(document).ready(function() {
    function t() {
        $(".photo--lightbox a").colorbox({
            photo: !0,
            scalePhotos: !0,
            maxHeight: "90%",
            maxWidth: "90%",
            transition: "none",
            fadeOut: 0
        });
        var t = $(".photoset-grid, this").attr("data-gutter");
        $(".photoset-grid, this").photosetGrid({
            highresLinks: !0,
            rel: "",
            gutter: t + "px",
            onComplete: function() {
                $(".photoset-grid.lightbox").attr("style", ""), $(".photoset-grid.lightbox a").colorbox({
                    photo: !0,
                    scalePhotos: !0,
                    maxHeight: "90%",
                    maxWidth: "90%",
                    transition: "none",
                    fadeOut: 0,
                    title: function() {
                        return $("img", this).attr("alt")
                    }
                }), $(".photoset-grid.lightbox").each(function() {
                    var t = $(this).attr("data-id");
                    $(this).find(".photoset-cell").attr("rel", t)
                }), $(".photoset-grid.post").each(function() {
                    var t = $(this).attr("data-post");
                    $(this).find(".photoset-cell").attr("href", t)
                }), $(".photoset-grid.none").each(function() {
                    $(this).find(".photoset-cell").attr("href", "")
                })
            }
        })
    }

    function e() {
        $(".photo-stage, this").each(function() {
            $(this).imagesLoaded(function() {
                var t = $(this),
                    e = t.children(".photo-wrap"),
                    a = e.height(),
                    i = $(window).height(),
                    s = $(".navigation").height(),
                    o = i - s - 20;
                a > o && !$(this).hasClass("natural") && (e.css({
                    height: o + "px"
                }), $(this).find("img").css({
                    opacity: 0
                }))
            })
        })
    }

    function a() {
        $(".video-container, this").each(function() {
            var t = $(this),
                e = t.parent(),
                a = t.children("iframe");
            if (a.length > 0) {
                var i = a.attr("width"),
                    s = a.attr("height"),
                    o = s / i * 100;
                t.css({
                    "padding-bottom": o + "%"
                });
                var n = a.attr("src").split("/"),
                    r = n[2];
                "instagram.com" === r && (t.css({
                    "padding-top": 60
                }), e.css({
                    "max-width": 620,
                    margin: "0 auto"
                })), a.load(function() {
                    var a = $(window).height(),
                        i = $(".navigation").height(),
                        s = a - i - 20,
                        o = e.height();
                    if (o > s) {
                        var n = s / o * 100,
                            l = (100 - n) / 2;
                        e.css({
                            width: n + "%",
                            "margin-left": l + "%"
                        })
                    }
                    o > s && "instagram.com" === r && e.css({
                        margin: "0 auto"
                    }), t.addClass("ready")
                })
            } else {
                var l = t.children("a"),
                    c = l.width(),
                    d = l.height(),
                    h = d / c * 100;
                t.css({
                    "padding-bottom": h + "%"
                }), l.css({
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                }), l.children("div").css({
                    "background-size": 50
                }), t.addClass("ready")
            }
        })
    }

    function i() {
        if ($(".posts-holder").children(".current").attr("ID") !== $(".scrollable:visible:first").attr("ID")) {
            $(".scrollable").waypoint("disable");
            var t = $(".current").prev(".scrollable:visible");
            $(".current").removeClass("current"), t.addClass("current"), $.scrollTo(t, 600, {
                easing: "easeInOutExpo",
                offset: -h,
                onAfter: function() {
                    $(".scrollable").waypoint("enable")
                }
            })
        }
    }

    function s() {
        if ($(".posts-holder").children(".current").attr("ID") !== $(".scrollable:visible:last").attr("ID")) {
            $(".scrollable").waypoint("disable");
            var t = $(".current").next(".scrollable:visible");
            $(".current").removeClass("current"), t.addClass("current"), $.scrollTo(t, 600, {
                easing: "easeInOutExpo",
                offset: -h,
                onAfter: function() {
                    $(".scrollable").waypoint("enable")
                }
            })
        } else $(".type_pagination").hasClass("current") ? ($(this).removeClass("current"), $(this).prev(".scrollable").addClass("current"), $(".pagination_load-more").trigger("click")) : $.scrollTo($("footer"), 600, {
            easing: "easeInOutExpo",
            offset: -h
        })
    }
    $(window).resize(function() {
        $(".the-posts article").each(function() {
            $(".photo-wrap").css({
                width: "",
                "margin-left": ""
            }), e()
        })
    }), $(window).resize(function() {
        $(".the-posts article").each(function() {
            $(".video-container").attr("style", ""), $(".video-wrap").attr("style", ""), a()
        })
    }), $(".the-posts article").each(function() {
        t(), e(), a()
    }), $(".menu-toggle").click(function() {
        $(this).toggleClass("on"), $(".the-menu").toggleClass("on"), $("header").toggleClass("menu-on")
    });
    var o = $(".instagram-token").text(),
        n = parseInt(o.split(".")[0], 10),
        r = new Instafeed({
            get: "user",
            userId: n,
            accessToken: o,
            clientId: "11d9b23c34d547feb08648dce2ba0eb6",
            resolution: "standard_resolution",
            limit: 10,
            target: "instagram-feed",
            template: '<a class="instagram-image" href="{{link}}" target="_blank"><img src="{{image}}" /><span class="overlay"><i class="social-instagram"></i></span></a>',
            after: function() {
                $(".instagram-feed").addClass("on")
            }
        });
    if ($(".instagram-feed").length && $("header").is(":visible")) {
        var l = $(".instagram-order").text() - 1;
        0 === l ? $(".the-posts .posts-grid header").after($(".type_description.instagram-feed")) : $(".the-posts .posts-grid article:nth-of-type(" + l + ")").after($(".type_description.instagram-feed")), r.run()
    } else $(".the-posts .posts-grid header").after($(".type_description")), $(".the-posts .posts-grid").append($(".type_pagination"));
    if (!$(".type_pagination").hasClass("pagination_standard")) {
        var c = $(".load-more-loading").text(),
            d = $(".load-more-end").text();
        $(".the-posts .posts-grid").infinitescroll({
            navSelector: ".pagination",
            nextSelector: ".pagination a.next",
            itemSelector: ".the-posts .posts-grid article",
            bufferPx: 10,
            loading: {
                selector: ".type_pagination .load-more",
                speed: 0,
                msgText: c,
                finishedMsg: d,
                finished: function() {
                    $("#infscr-loading").hide();
                    $(".pagination_load-more").removeClass("loading");
                    taggedPage.sizePhotos();
                }
            },
            errorCallback: function() {
                $(".type_pagination").hide(),$(".type_pagination").removeClass("current"), $(".type_pagination").prev(".scrollable").addClass("current"), $("#infscr-loading").show(), setTimeout(function() {
                    $(".type_pagination").addClass("hidden")
                }, 2640)
            }
        }, function(i, s) {
            $(".the-posts .posts-grid").append($(".type_pagination"));
            var o = $(i).css({
                opacity: 0
            });
            o.animate({
                opacity: 1
            }), t(), e(), a(), $(".scrollable").waypoint(function() {
                $(".current").removeClass("current"), $(this).addClass("current")
            }, {
                offset: h
            });
            var n = s.state.currPage;
            Tumblr.LikeButton.get_status_by_page(n)
        })
    }
    $(".type_pagination").hasClass("pagination_load-more") && ($(window).unbind(".infscr"), $(".pagination_load-more").click(function() {
        $(".pagination_load-more").hide(), $(".the-posts .posts-grid").infinitescroll("retrieve")
    })), $(".scroll-top").click(function() {
        return $("body, html").animate({
            scrollTop: 0
        }, 800, "easeInOutQuint"), !1
    });
    var h = $(".navigation").height() - 20;
    $(".scrollable").waypoint(function() {
        $(".current").removeClass("current"), $(this).addClass("current")
    }, {
        offset: h
    }), $("body").hasClass("index") && (window.shortcut.add("up", function() {
        i()
    }), window.shortcut.add("down", function() {
        s()
    })), $("header").is(":visible") ? $("header").addClass("current") : $(".posts-holder").children("article.type_description:visible:first").addClass("current")
});;function BuildSection (section, maxItems) {

    // Vars
    var $container = $('#' + section + '-container'),
    	$section = $('#' + section),
        $caption,
        $shareLinks,
        $postTitle,
        $newHeading,
    	$sectionItems,
        $sectionInner,
        $sectionInnerPhoto,
        $sectionInnerPhotoset,
    	$loading = $container.find('.loading'),
    	$viewMoreContainer = $container.find('.view-more'),
        itemWidth,
    	viewMore,
        viewText,
    	postsURL;


    // Init
    function init(){

        // Show Loading Spinner
    	$loading.show();
        // Load Posts
    	loadPosts();

    }

    // Methods
    /**
    * Loads Section Posts
    * @method loadPosts
    */
    function loadPosts() {

        // Setting up URL to load posts from
    	postsURL = blogURL + 'tagged/' + section;
    	loadURL = postsURL + ' article.' + section;
    	$section.load(loadURL, success);


        /**
        * On load success
        * @method success
        */
	    function success() {

            // Section Vars
	    	$sectionItems = $('#' + section + ' article.' + section);
            $sectionInner = $('article.' + section + ' .article-content');
            $sectionInnerPhoto = $('#' + section + ' article.' + section + ' .article-content .photo-stage');
            $sectionInnerPhotoset = $('#' + section + ' article.' + section + ' .article-content .photoset-grid');

            // Checking for photo section
	    	if(section == 'photos'){
                // Square images
				squareHeight($sectionInnerPhotoset,$sectionInnerPhoto);
	    	}

            // Truncating extraneous posts
	    	truncatePosts($sectionItems);

            // Fade out loading spinner
			$loading.fadeOut(function(){
                // Moving titles for hover state
                moveTitles();
				$sectionItems.animate({opacity:1});	
			});

            // Setting up view-more link
            viewText = taggedViewText + ' ' + section;
            viewText = viewText.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                            return letter.toUpperCase();
                        });
			viewMore = $('<a href="' + postsURL + '">' + viewText + '</a>');

            // Adding view-more link
			$viewMoreContainer.append(viewMore);

	    }

    }

    /**
    * Sets height of post to width (creates square)
    * @method squareHeight
    * @param {Object} photosetImages
    * @param {Object} photoImages
    */
    function squareHeight(photosetImages,photoImages) {

        // Checking for photosets
        if(photosetImages.length > 0) {
            itemWidth = photosetImages.width();    
        } else {
            // Using photo posts instead
            itemWidth = photoImages.width();
        }
		
	    photosetImages.height(itemWidth - 10);
        photoImages.height(itemWidth - 10);
        
        // Resize
		$(window).resize(function(){
    		if(photosetImages.length > 0) {
                itemWidth = photosetImages.width();    
            } else {
                itemWidth = photoImages.width();
            }
			photosetImages.height(itemWidth - 10);
            photoImages.height(itemWidth - 10);
		});		

    }

    /**
    * Moves post titles to share links for hover display
    * @method moveTitles
    */
    function moveTitles(){

        // Looping through each post
        $.each($sectionInner, function (key,value){
            
            $caption = $(this).find('.caption');
            $shareLinks = $(this).find('.icons');
            $postTitle = $caption.find('h2').detach();
            $newHeading = $('<li class="title"></li>');

            // Moving new list item into share-links list
            $newHeading.append($postTitle);
            $shareLinks.prepend($newHeading);

        });

    }

    /**
    * Removes extraneous posts (based on maxItems)
    * @method truncatePosts
    * @param {Object} sectionItems
    */
    function truncatePosts(sectionItems) {

    	sectionItems.slice(maxItems).remove();
    	$('article.' + section).not(sectionItems).remove();

    }

    init();	
};;function SinglePost () {

    // Vars
    var $post = $('.posts-holder').find('article'),
        $postContent = $post.find('.article-content'),
        $postPagination = $post.find('#post-pagination'),
        $singlePost = $('.single-post'),
        $taggedLink = $postPagination.find('a.tagged-link'),
        $aboutImage,
        aboutBackground = aboutBg,
        currentTag = utilities.currentTag,
        url;

    console.log('single-post');

    // Init
    function init(){

        // Setting link for section landing pages
        setLandingLink();

        // Checking for about page
        if(currentTag === 'about'){
            //Run about page
            initAbout();
        }

        console.log('path', location.pathname.split('/')[1]);

        if ( location.pathname.split("/")[1] == "exclusives" ) { 
            $post.addClass('retailers_exclusive')
        }

    }

    // Methods
    /**
    * Sets link to view section landing page
    * @method setLandingLink
    */
    function setLandingLink(){

        //Check if currentTag exists
        if(currentTag){
            // Setting tagged page link
            url = blogURL + 'tagged/' + currentTag;
            $taggedLink.attr('href',url);
        } else {
            // Hide tagged link
            $taggedLink.hide();
        }
        
    }

    /**
    * Sets up about post page
    * @method initAbout
    */
    function initAbout(){

        // Checking for teaser mode
        if(!teaserMode){
            // Setting about page image
            $aboutImage = $('<img src="' + aboutBackground + '" alt="About the Film"/>');
            $postContent.prepend($aboutImage);    
        }
    }
    
    init();	
};;function TaggedPage (currentTag) {

    // Vars
    var $container = $('#' + currentTag + '-tagged-container'),
        section = currentTag,
        $section = $container.find('.posts-grid'),
        $sectionItems = $('article.' + section),
        $sectionInner = $('article.' + section + ' .article-content'),
        $sectionInnerPhoto = $('article.' + section + ' .article-content .photo-stage'),
        $sectionInnerPhotoset = $('article.' + section + ' .article-content .photoset-grid'),
        $loadMore = $('div.load-more'),
        $heading = $container.find('h3'),
        $newHeading,
        $caption,
        $shareLinks,
        $postTitle;
        

    // Init
    function init(){
        
        // Checking for Photos section
        if(section === 'photos'){
            sizePhotos();
        }

        // Checking for Cast+Crew Section
        if(section === 'cast'){
            $heading.text('Cast & Filmmakers')
        }

        // Checking for Videos section
        if(section === 'videos'){
            truncatePosts();
        }

        // Moving titles for hover display
        moveTitles();

    }

    function sizePhotos(){
        squareHeight();
    }

    /**
    * Moves post titles to share links for hover display
    * @method moveTitles
    */
    function moveTitles(){

        // Looping through each post
        $.each($sectionInner, function (key,value){

            $caption = $(this).find('.caption');
            $shareLinks = $(this).find('.icons');
            $postTitle = $caption.find('h2').detach();
            $newHeading = $('<li class="title"></li>');
            
            // Moving new list item into share-links list
            $newHeading.append($postTitle);
            $shareLinks.prepend($newHeading);

        });

    }

    /**
    * Sets height of post to width (creates square)
    * @method squareHeight
    * @param {Object} photosetImages
    * @param {Object} photoImages
    */
    function squareHeight(photosetImages,photoImages) {


        $sectionInner = $('article.' + section + ' .article-content');

        $sectionInner.each(function(index,value){
            var width = $(this).width();
            $(this).find('.post').height(width - 10);
        });

        $(window).resize(function(){
            $sectionInner.each(function(index,value){
                var width = $(this).width();
                $(this).find('.post').height(width - 10);
            });            
        });



        // Checking for photosets
        // if(photosetImages.length > 0) {
        //     itemWidth = photosetImages.width();    
        // } else {
        //     // Using photo posts instead
        //     itemWidth = photoImages.width();
        // }
        
        // photosetImages.height(itemWidth - 10);
        // photoImages.height(itemWidth - 10);
        
        // // Resize
        // $(window).resize(function(){
        //     if(photosetImages.length > 0) {
        //         itemWidth = photosetImages.width();    
        //     } else {
        //         itemWidth = photoImages.width();
        //     }
        //     photosetImages.height(itemWidth - 10);
        //     photoImages.height(itemWidth - 10);
        // });     

    }

    /**
    * Truncates post body
    * @method truncatePosts
    */
    function truncatePosts(){

        // Looping through each post
        $.each($sectionInner, function (key,value){

            $caption = $(this).find('.caption');

            // Running dotdotdot on caption
            $caption.dotdotdot({
                ellipsis    : '... ',
                wrap        : 'word',
                fallbackToLetter: true,
                after       : null,
                watch       : true,
                height      : 40,
                tolerance   : 0,
                lastCharacter: {
                    remove      : [ ' ', ',', ';', '.', '!', '?' ],
                }
            });

        });

    }

    init();	
    return {
        sizePhotos:sizePhotos
    }
};;function Utilities () {

    // Vars
    var currentTag;
    

    // Init
    function init(){
        initHashScroll();
        getCurrentTag();
    }

    // Methods
    /**
    * Enables smooth scrolling for anchor links
    * @method initHashScroll
    */
    function initHashScroll() {

        var $root = $('html, body');
        $('a.scroll-to').click(function() {
            var href = $.attr(this, 'href');
            $root.animate({
                scrollTop: $(href).offset().top
            }, 1500, function () {
                window.location.hash = href;
            });
            
            return false;
        });

    }

    /**
    * Displays Current Tag
    * @method getCurrentTag
    * @return {String} Current tag
    */
    function getCurrentTag() {
        currentTag = currentTags.replace(/(\w+).*/,"$1");
    }

    init();
    // Return
    return {
        currentTag:currentTag
    }
};;function YoutubeEmbed () {

    // Vars
    var $playerContainer = $('#trailer-player'),
    	$player,
    	$loading = $playerContainer.find('.loading'),
    	$replayButton = $('.play-trailer'),
    	$closeButton = $playerContainer.find('#close-trailer'),
    	$htmlBody = $("html, body"),
    	videoID = $playerContainer.data('video-id'),
    	ownIt = getHash();


    // Init
    function init(){

    	// Fade $playerContainer in
		$playerContainer.fadeIn(function(){
			// Show Loading Spinner
			$loading.fadeIn('fast');
			// Changing "Replay" button text for mobile
			if(Modernizr.touch){
				$replayButton.text(playTrailerText);
			}
			// Init Player
			initPlayer();
		});
    }

    function getHash() {
		var currentHash = window.location.hash.substring(1);

		if(currentHash == 'own-it'){
			return true;
		} else {
			return false;
		}
    }

    // Methods
    /**
    * Init YouTube Embedded Player
    * @method initPlayer
    */
    function initPlayer(){

		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var player;

	    /**
	    * Checks DOM for #player
	    * @method window.onYouTubeIframeAPIReady
	    */
		window.onYouTubeIframeAPIReady = function() {

			// Create new Player object
			player = new YT.Player('player', {
				playerVars: { 'vq':'hd720','autoplay': 0, 'autohide': 1,'rel':0,'theme': 'dark', 'loop': 0},
				height: '100%',
				width: '100%',
				videoId: videoID,
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				}
			});
			
	    }

	   	/**
	    * Checks DOM for #player
	    * @method window.onPlayerReady
	    */
		window.onPlayerReady = function(event) {


			// Setting player quality
			event.target.setPlaybackQuality('hd720');

			if (!ownIt){
				$htmlBody.animate({ scrollTop: 0 }, "slow");
			} else {
		        

		        setTimeout(function(){
					// $htmlBody.animate({
		   //              scrollTop: $('#own-it').offset().top
		   //          }, 1500);
		        }, 500);
	            
			}
			

			// Setting player variable to new iframe #player
			$player = $('#player');

			// Fade out loading spinner
			$loading.fadeOut(function(){
				// If not a touch device
				if(!Modernizr.touch){
					// Fade iframe player in
					$player.fadeTo('fast',1,function(){
						// Show close button and play video
						$closeButton.fadeIn('slow');
						$replayButton.text(replayTrailerText);
						if (!ownIt){
							player.playVideo();
						}
						
					});
				} else {
					// For mobile: Hide player container and loading spinner
					$playerContainer.fadeOut('fast');
					$loading.fadeOut('fast');
				}
			});
			
		}
		
	   	/**
	    * Watches for changes in embedded player (start, pause, ended, etc.)
	    * @method window.onPlayerStateChange
	    * @param {String} Current Video State
	    */
		window.onPlayerStateChange = function(state) { 

			switch(state.data){
				// case YT.PlayerState.PLAYING :
				// 	event.target.setPlaybackQuality('hd720');
				case YT.PlayerState.ENDED :
					// On video end – hide close button and fade out playerContainer
					$closeButton.hide();
					$playerContainer.fadeOut('slow');

			}

		}

	    /**
	    * Replays trailer
	    */
		$replayButton.click(function(){

			// Scroll page to top
			$htmlBody.animate({ scrollTop: 0 }, "slow");
			// Reseting video (fixes black screen issue on mobile)
			player.cueVideoById(videoID);

			// Show the player container
			$playerContainer.fadeIn(function(){
				// Show the close button and player
				$closeButton.fadeIn('slow');
				$player.fadeTo('fast',1,function(){
					// For mobile – Change play trailer text to "Replay Trailer"
					$replayButton.text(replayTrailerText);
					// If desktop, play video
					if(!Modernizr.touch){
						player.playVideo();
					}
				});	
			});

    	});

	    /**
	    * Closes trailer
	    */
    	$closeButton.click(function(){
    		// Fade out Close Link
    		$(this).fadeOut('fast');
    		// Hide the player container and stop the video
    		$playerContainer.fadeOut(function(){
    			player.stopVideo();	
    		});    

    	});

    }
    
	init();	

};;$(document).ready(function() {

	// Vars
	var $aboutBody,
		$aboutCopy,
		$aboutPost,
		$aboutShareLinks,
		$banner,
		$header = $('header'),
		$index = $('body.index'),
		$menuToggle = $('.menu-toggle'),
		$mobileMenu = $('.the-menu'),
		$navigation,
		$singlePost = $('body.permalink section.single-post'),
		$tagged = $('body.tagged'),
		$tagLine,
		$window = $(window),
		headerHeight,
		headerOffset,
		offSet;

	window.utilities = new Utilities();

	if(Modernizr.touch){
		$('.sharer').click(function(){
			$(this).find('.sharer-wrap').toggleClass('show');
		});
	}
	

	if($index.length > 0 && $tagged.length === 0) {

		// Setting header height
		headerHeight = $window.height()  - 75;
		$header.height(headerHeight);
		
		// Vars for navigation
		$banner = $('header + div');
	
		
		$navigation = $(".navigation");
		$tagLine = $('.logo-image h2');
		$trailerNav = $('a.nav-trailer');
		offSet = $banner.offset().top;
		offSetAdjusted = (offSet / 2) - 75;


		$trailerNav.click(function(){
			setTimeout(location.reload.bind(location), 1);
		});

		// Resize
		$window.resize(function(){
			headerHeight = $window.height() - 75;
			$header.height(headerHeight);
			offSet = $banner.offset().top;
			offSetAdjusted = (offSet / 2) - 75;
		});

		$window.scroll(function () {

			if ($window.scrollTop() > offSetAdjusted) {
				if(!$navigation.hasClass('show-nav')){
					$navigation.addClass('show-nav');	
				}
			}
			if ($window.scrollTop() > offSet - 150) {
				$tagLine.fadeIn();
			}
			if ($window.scrollTop() < offSetAdjusted) {
				if($mobileMenu.is(':visible')){
					// $mobileMenu.removeClass('on');
					// $menuToggle.removeClass('on');
					$navigation.removeClass('show-nav');		
				} else {
					$navigation.removeClass('show-nav');
				}
			}
			if ($window.scrollTop() < offSet - 150) {
				$tagLine.fadeOut();
			}

		});

		$(window).load(function($){ 
			if(!Modernizr.touch){
				var s = skrollr.init({
							forceHeight: false
						}); 
			}
		});

		$aboutPost = $('article.about');
		$aboutShareLinks = $aboutPost.find('.icons').detach();
		$aboutBody = $aboutPost.find('.text-post-wrap');
		$aboutCopy = $aboutBody.find('p.about-the-film');
		$aboutBody.append($aboutShareLinks);

		$aboutCopy.dotdotdot({
			ellipsis	: '... ',
			wrap		: 'word',
			fallbackToLetter: true,
			after		: null,
			/*	Whether to update the ellipsis: true/'window' */
			watch		: true,
			height		: 84,
			tolerance	: 0,
			lastCharacter	: {
				/*	Remove these characters from the end of the truncated text. */
				remove		: [ ' ', ',', ';', '.', '!', '?' ],
			}
		});

		window.youtubeEmbed = new YoutubeEmbed();
		window.buildphotos = new BuildSection('photos', 8);
		window.buildCastCrew = new BuildSection('cast', 3);

	} else {

		$('.navigation').addClass('fixed-nav');

	}

	if($index.length > 0 && $tagged.length === 1){

		window.taggedPage = new TaggedPage(currentTagged);

	}

	if($singlePost.length > 0) {
		
		window.singlePost = new SinglePost(aboutBg);

	}

});