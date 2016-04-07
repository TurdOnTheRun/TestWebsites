define('share/1.0.0/share', ['jquery', 'tmz/middleware/1.0.0/client', 'templates/jst'],
    function ($, mw, jst) {
        'use strict';

        /**
         * Social Share
         */
        var socialShare = function socialShare(){

            function init (){
                var $stories = $('article.news');
                var storyGuids = [];

                $.each($stories, function() {
                    storyGuids.push($(this).data('guid'));
                });

                var storyGuidsString = storyGuids.join(',');

                // get FB counts from Middleware
                mw.get('/api/v1/socialactivities?id='+storyGuidsString).done(function(response) {
                    $.each(response.items, function(index, item) {
                        var count = item.counts.facebook;
                        if (count > 0) {
                            $stories.eq(index).find('.facebook-sharrre').attr('data-count', count);
                        }
                    });

                    // FB header
                    $('.facebook-sharrre').sharrre({
                        share: {
                            facebook: true
                        },
                        template: jst['share/share']({class: 'facebook'}),
                        enableHover: false,
                        enableTracking: true,
                        click: function(api, options){
                            api.simulateClick();
                            api.openPopup('facebook');
                        }
                    }).on('click', function(){
                        s.prop13 = s.eVar13 = 'facebook-header';
                        s.tl();
                    });
                });

                // Twitter header
                $('.twitter-sharrre').sharrre({
                    share: {
                        twitter: true
                    },
                    template: jst['share/share']({class: 'twitter'}),
                    enableHover: false,
                    enableTracking: true,
                    click: function(api, options){
                        api.simulateClick();
                        api.openPopup('twitter');
                    }
                }).on('click', function(){
                    s.prop13 = s.eVar13 = 'twitter-header';
                    s.tl();
                });

                // FB footer
                $('.inpost-social .facebook').on('click', function() {
                    s.prop13 = s.eVar13 = 'facebook-footer';
                    s.tl();
                });

                // Twitter footer
                $('.inpost-social .twitter').on('click', function() {
                    s.prop13 = s.eVar13 = 'twitter-footer';
                    s.tl();
                });

                // Comments footer
                $('.inpost-social .comment-btn').on('click', function(e) {
                    s.prop34 = s.eVar34 = 'comments';
                    s.tl();
                });

                // See Also footer
                $('.article-footer .group li').on('click', function(e) {
                    s.prop35 = s.eVar35 = 'see-also';
                    s.tl();
                });

                // Story Tags footer
                $('.article-footer .see-more a').on('click', function(e) {
                    var tagName = $(e.target).html().toLowerCase().replace(' ', '-');
                    s.prop36 = s.eVar36 = 'tag-' + tagName;
                    s.tl();
                });

            };

            return {
                init: init
            };
        };

        return socialShare();
    }
);
