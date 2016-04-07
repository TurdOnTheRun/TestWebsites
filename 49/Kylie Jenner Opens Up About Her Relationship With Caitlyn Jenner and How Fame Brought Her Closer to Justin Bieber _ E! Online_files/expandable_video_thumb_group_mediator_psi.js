/**
 * ExpandableVideoThumbGroupMediator manages a group of "expandle" thumbnails with display a video player when opened.
 */

var ExpandableVideoThumbGroupMediator = function(thumbGroupDivId) {
    console.debug("ExpandableVideoThumbGroupMediator() ");

    var $ = evideo.$;
    var $div = $('#' + thumbGroupDivId);
    var selectedVideoInfo;

    var initialThumbWidth = 190;
    var initialThumbHeight = 104;

    var expandedVideoWidth = 604;
    var expandedVideoHeight = 340;

    var $expandedThumb;
    var $nextThumbToExpand;

    var videoPlayer;
    var self = this;




    $('.exp-video').on('click', function(event) {
        event.preventDefault();
        if ($expandedThumb) {
            $nextThumbToExpand = $(this);
            collapseThumb($expandedThumb);
        } else {
            expandThumb($(this));
        }

    });

    $div.on('click', 'img.close-btn', function(event) {
        event.preventDefault();
        collapseThumb();
    });



    function expandThumb($thumb) {
        console.log("EXPANDING THUMBNAIL");
        $expandedThumb = $thumb;


        $thumb.find('.play-btn').hide();

        $thumb.animate({

            width: expandedVideoWidth + "px",
            height: expandedVideoHeight + "px"
        }, {
            duration: 500,
            step: function(now, fx) {
                $thumb.find('img.thumb').css(fx.prop, now);
                $thumb.find('span.overlay').css(fx.prop, now);
                $thumb.find('a').css(fx.prop, now);
                $thumb.find('span.thumbnail').css(fx.prop, now);
                $thumb.find('.video-holder').css(fx.prop, now);
            },

            complete: function() {
                var videoId = $thumb.attr('data-video-id');
                var videoInfo = evideo.pageVideosModel.getById(videoId);
                $thumb.addClass('expanded');

                $thumb.find('.video-holder').css('visibility', 'visible');
                $thumb.find('.close-btn').show();
                console.log("$pdk : ",  $pdk);
                console.log("$pdk.controller : ",  $pdk.controller);

                var scope = $thumb.attr("data-video-scope");
                $pdk.controller.clickPlayButton( [scope] );



            }
        });
    }

    function collapseThumb($thumb) {
        $pdk.controller.pause(true, [$thumb.attr("data-video-scope")]);
        $thumb.removeClass('expanded');

        $expandedThumb.animate({
                width: initialThumbWidth + "px",
                height: initialThumbHeight + "px"
            }, {
                duration: 500,
                step: function(now, fx) {
                    $thumb.find('img.thumb').css(fx.prop, now);
                    $thumb.find('span.overlay').css(fx.prop, now);
                    $thumb.find('a').css(fx.prop, now);
                    $thumb.find('span.thumbnail').css(fx.prop, now);
                    $thumb.find('.video-holder').css(fx.prop, now);
                },

                complete: function() {
                    $thumb.find('.play-btn').show();
                    $thumb.find('.video-holder').css('visibility', 'hidden');
                    $thumb.find('span.overlay').css({
                        width: (initialThumbWidth-5) + "px",
                        height: (initialThumbHeight-5) + "px"
                    });
                    if ($nextThumbToExpand) {
                        expandThumb($nextThumbToExpand);
                    }
                }

            }

        );
    }


}