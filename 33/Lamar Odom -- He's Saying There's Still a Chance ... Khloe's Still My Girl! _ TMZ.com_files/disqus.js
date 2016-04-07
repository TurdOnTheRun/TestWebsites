/**
 * TMZ Disqus Module
 */
define(
    'tmz/disqus/1.0.3/disqus',
    [ 'jquery', 'tmz/middleware/1.0.0/client', 'templates/jst', 'logger', 'module', 'requirecss', 'window', 'document' ],
    function($, mwClient, templates, loggerFactory, module, css, window, document) {
        'use strict';

        var logger = loggerFactory.getInstance(module.id);

        /**
         * TMZ - Disqus
         */
        function disqus() {
            // Local variables
            var _memberCommentsSelector = '#disqus-member-comments',
                self = {},
                disqusEmbedFrame = '#dsq-2',
                embedLoaded = false,
                commentCountLoaded = false,
                cookieMemberAuth = 'memberAuth',
                cookieMemberRef = 'memberRef',
                cookieMemberGuid = 'MEMBER_GUID',
                cookieRemoteAuthToken = 'tmz_disqus_token',
                cookieRemoteAuthTokenLifetime = 5400000, // 1.5 hours in miliseconds
                cursors = [],
                cursorsExtraPrev = false,
                identifier,
                loginWidth = 530,
                loginHeight = 460,
                memberCommentsCursor,
                memberCommentsLimit = 10,
                memberUsername,
                name,
                publicApiKey,
                remoteAuthS3,
                restNewCommentEndpoint, // /api/v1/disqus/
                restSsoGuidEndpoint, // /api/v1/disqus/
                restSsoSlugEndpoint, // /api/v1/disqus/slug
                shortname,
                title,
                urlSignIn,
                urlSignOut,
                username,
                version = '1.0.0';


            /**
             * @param {Function} onComplete
             * @return {!Object} self
             */
            function authenticateSso(onComplete) {
                var onCompleteResponse = {
                    authenticated: false
                };

                if (!remoteAuthS3) {
                    var memberAuthCookie = $.cookie(cookieMemberAuth) || $.cookie(cookieMemberRef);

                    // Use token that exists in cookie if they are logged in
                    var cookieVal = $.cookie(cookieRemoteAuthToken);
                    if (memberAuthCookie && cookieVal) {
                        remoteAuthS3 = cookieVal;

                        // On Complete
                        onCompleteResponse.authenticated = true;
                        onComplete(onCompleteResponse);

                        return self;
                    }

                    // Get user token from server
                    else {


                        // Make call to middleware and get token
                        userInfo(function (response) {
                            // If the user is not logged in
                            if (typeof response === 'undefined') {
                                onComplete(onCompleteResponse);
                                return false;
                            }

                            // Save token
                            setRemoteApiS3(response.token);

                            // Set member auth cookie if not set by CF login
                            if (!$.cookie(cookieMemberGuid)) {
                                $.cookie(cookieMemberGuid, response.id, {path: '/'});
                            }

                            // Remember disqus token
                            var expireDate = new Date((new Date()).getTime() + cookieRemoteAuthTokenLifetime);
                            $.cookie(cookieRemoteAuthToken, response.token, {path: '/', expires: expireDate});

                            // Run on onComplete
                            onCompleteResponse.authenticated = true;
                            onComplete(onCompleteResponse);
                        });

                        // Done
                        return self;
                    }

                }

                // Run on onComplete
                onComplete(onCompleteResponse);

                // Done
                return self;
            }


            /**
             * @param function handler
             * @returns {*}
             */
            function userInfo(handler) {
                var apiEndpoint = null;
                var memberGuid = $.cookie(cookieMemberGuid);
                var memberAuthCookie = $.cookie(cookieMemberAuth) || $.cookie(cookieMemberRef);

                // If we know the member guid
                if (memberGuid) {
                    apiEndpoint = restSsoGuidEndpoint + memberGuid;
                }

                // Get member info
                else {
                    if (memberAuthCookie) {
                        var slug = memberAuthCookie.split('|')[0].split(':')[1];
                        if (slug) {
                            apiEndpoint = restSsoSlugEndpoint + slug;
                        }
                    }
                }

                // Load disqus as logged out user... Well, we tried. :(
                if (!apiEndpoint) {
                    // Run on onComplete
                    handler();

                    // Done
                    return self;
                }

                return mwClient.get(apiEndpoint).always(handler);
            }


            /**
             * @return {!Object} self
             */
            function initEmbed() {
                if ( embedLoaded ) {
                    return;
                }

                embedLoaded = true;
                loadCss();

                // SSO Authentication
                authenticateSso(function( response ){
                    // Set config
                    window.disqus_config = disqusConfig(remoteAuthS3, publicApiKey);

                    // Load disqus embed code
                    var dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = '//' + shortname + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                });

                return self;
            }


            /**
             * @return
             */
            function initCommentCounter() {
                if ( commentCountLoaded ) {
                    return;
                }
                commentCountLoaded = true;

                var s = document.createElement('script');
                s.async = true;
                s.type = 'text/javascript';
                s.src = '//' + disqus_shortname + '.disqus.com/count.js';
                (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);

                // Forces a fresh comment count reload
                var countTimer = setInterval(function(){
                    if ( typeof window.DISQUSWIDGETS !== 'undefined' ) {
                        window.DISQUSWIDGETS.getCount({reload: true});
                        clearInterval(countTimer);
                    }
                }, 1000);


                return self;
            }
            /**
             * Adds commas to digits over 999
             * e.g. 1000 becomes 1,000
             */
            function maskDisqusComments() {

                setInterval((function fn() {

                    var numberFormat = function (_number, _sep) {
                        _number = typeof _number != "undefined" && _number > 0 ? _number : "";
                        _number = _number.replace(new RegExp("^(\\d{" + (_number.length % 3 ? _number.length % 3 : 0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
                        if (typeof _sep != "undefined" && _sep != " ") {
                            _number = _number.replace(/\s/g, _sep);
                        }
                        return _number;
                    }

                    //BEGIN Ticket RE:#5462
                    var $commentSelector = 'li.comment-btn a[data-disqus-identifier]';
                    var $suffix = " Comments";
                    var $text = '';

                    $.each($($commentSelector), function (key, val) {
                        $text = val.innerHTML;
                        if ($text.length != 0) {

                            //remove anything not a digit
                            var $strCleanCount = $text.replace(/[^\d]/g, "");
                            if ($strCleanCount.length > 3) {
                                //if the count string goes into the thousands.
                                //add the mask
                                var $strMaskedNum = numberFormat($strCleanCount, ",");

                                val.innerHTML = $strMaskedNum + $suffix;
                            }
                        }
                    });

                    var $topCommentSelector = $('.comment-count span[data-disqus-identifier]');
                    var output;

                    // Inserts disqus comment count into specified element
                    $.each( $topCommentSelector, function( key, val ) {
                        // only grab the numbers
                        output = $(this).html().replace(/[^0-9]/gi, '');

                        if( output.length > 3 ) {
                            output = numberFormat(output, ",");
                        }

                        if( output == '0' ) {
                            output = '';
                        }

                        if( $(this).html() != '' ) {
                            // inject value
                            $(this).html( output ).css('display', 'inline-block');
                        }
                    });

                    return fn;
                })(), 2000);
            }
            /**
             * @param remoteAuthS3
             * @param apiKey
             * @returns {Function}
             */
            function disqusConfig(remoteAuthS3, apiKey){
                return function(){
                    var remoteAuthS3FinalToken = remoteAuthS3;
                    if ( typeof remoteAuthS3FinalToken === "undefined" ) {
                        remoteAuthS3FinalToken = {};
                        $.cookie(cookieRemoteAuthToken, null, {path: '/'});
                    }

                    this.page.remote_auth_s3 = remoteAuthS3FinalToken;
                    this.page.api_key = apiKey;

                    // SSO configs
                    this.sso = {
                        height: loginHeight,
                        width: loginWidth
                    };
                    if ( name ) { this.sso.name = name; }
                    if ( urlSignIn ) { this.sso.url = location.protocol + '//' + location.host + urlSignIn; }
                    if ( urlSignOut ) { this.sso.logout = location.protocol + '//' + location.host + urlSignOut; }

                    // Callbacks
                    this.callbacks.onNewComment = [ logNewComment ];
                }
            }


            /**
             * Loads required CSS
             */
            function loadCss(){
                css.load('css/tmz/disqus/' + version + '/disqus.css');
            }

            /**
             * Logs comment to MW
             */
            function logNewComment(){
                return mwClient.post(restNewCommentEndpoint, {
                    articleId: identifier,
                    provider: 'disqus'
                });
            }


            /**
             * @param object config
             * @returns {{}}
             */
            function memberComments() {

                // Load CSS
                loadCss();

                if (memberUsername){
                    memberCommentsLoader( { username: memberUsername } );
                } else {
                    userInfo( function( response ) {
                        memberCommentsLoader( { remote_auth: response.token } );
                    } );
                }

                return self;
            }


            /**
             * Member Comments Loader
             *
             * Possible values for config:
             *
             * By SSO token:
             * {
             *  remote_auth: <sso token>
             * }
             *
             * By Username:
             * {
             *  username: <username>
             * }
             *
             * @param config
             */
            function memberCommentsLoader(config){

                var userSearchParam = '';
                if ( typeof config.username == 'string' ) {
                    userSearchParam = '&user=username:' + config.username;
                } else if ( typeof config.remote_auth == 'string' ) {
                    userSearchParam = '&remote_auth=' + config.remote_auth;
                }


                // Cursor
                var cursor = '';
                if ( memberCommentsCursor === 'next' ) {
                    cursor = '&cursor=' + cursors[ cursors.length - 1 ].next;
                } else if ( memberCommentsCursor === 'prev' ) {
                    if ( cursors.length ) {
                        cursor = '&cursor=' + cursors[ cursors.length - 1 ].next;
                    }
                }

                // Request
                $.ajax('https://disqus.com/api/3.0/users/listActivity.json', {
                    data:
                        'api_key=' + publicApiKey +
                        '&include=user' +
                        '&limit=' + memberCommentsLimit +
                        userSearchParam + cursor
                    ,
                    processData: false
                })
                .done(memberCommentsRender)
                .error(function(){
                    logger.debug("Error loading member comments");
                    memberCommentsRender();
                });
            }


            /**
             * @returns {{}}
             */
            function memberCommentsRender(response) {
                // Will get to here if there was an error loading disqus
                if ( typeof response === 'undefined' ) {
                    // Inject template into html
                    $(_memberCommentsSelector).html( templates['community/member-comments']({}) );
                }

                // Date variables
                var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
                var currentDate = new Date();

                // Add daysAgo to comments
                for (var i = 0; i < response.response.length; i++) {
                    var commentDate = new Date(response.response[i].object.createdAt);
                    response.response[i].object.daysAgo = Math.round( Math.abs( (commentDate.getTime() - currentDate.getTime()) / oneDay) );
                }

                // Pagination
                response.hasPrev = cursors.length > 0;
                if ( response.cursor.hasNext ) {
                    cursors[ cursors.length ] = response.cursor;
                    cursorsExtraPrev = true;
                    response.hasNext = true;
                } else {
                    cursorsExtraPrev = false;
                    response.hasNext = false;
                }
                response['pagination'] = response.hasNext || response.hasPrev;

                // Inject template into html
                $(_memberCommentsSelector).html( templates['community/member-comments'](response) );

                // Register Pagination Helpers
                $('#disqus-my-comments .pagination a, #disqus-member-comments .pagination a').click(function(e){
                    e.preventDefault();
                    memberCommentsCursor = $(this).data('cursor');

                    if ( memberCommentsCursor === 'prev' ) {
                        cursors.pop();
                        if ( cursorsExtraPrev ) {
                            cursors.pop();
                        }
                    }

                    memberComments();
                });

                return self;
            }


            /**
             * @param val
             */
            function setIdentifier(val){
                identifier = val;
                window.disqus_identifier = val;

                return self;
            }



            /**
             * @param val
             */
            function setLoginHeight(val){
                loginHeight = val;
            }


            /**
             * @param val
             */
            function setLoginWidth(val){
                loginWidth = val;
            }



            /**
             * @param val
             */
            function setMemberUsername(val){
                if ( !memberUsername ) {
                    memberUsername = val;
                }

                return self;
            }


            /**
             * @param val
             */
            function setPublicApiKey(val){
                if ( !publicApiKey ) {
                    publicApiKey = val;
                }

                return self;
            }


            /**
             * @param val
             */
            function setName(val){
                name = val;

                return self;
            }


            /**
             * @param val
             */
            function setRemoteApiS3(val){
                if ( !remoteAuthS3 ) {
                    remoteAuthS3 = val;
                }

                return self;
            }

            /**
             * @param val
             */
            function setRestNewCommentEndpoint(val){
                if ( !restNewCommentEndpoint ) {
                    restNewCommentEndpoint = val;
                }

                return self;
            }

            /**
             * @param val
             */
            function setRestSsoGuidEndpoint(val){
                if ( !restSsoGuidEndpoint ) {
                    restSsoGuidEndpoint = val;
                }

                return self;
            }

            /**
             * @param val
             */
            function setRestSsoSlugEndpoint(val){
                if ( !restSsoSlugEndpoint ) {
                    restSsoSlugEndpoint = val;
                }

                return self;
            }


            /**
             * @param val
             */
            function setShortname(val){
                if ( !shortname ) {
                    shortname = val;
                    window.disqus_shortname = val;
                }

                return self;
            }


            /**
             * @param val
             */
            function setTitle(val){
                title = val;
                window.disqus_title = val;

                return self;
            }

            /**
             * @param val
             */
            function setUrlSignIn(val){
                urlSignIn = val;

                return self;
            }

            /**
             * @param val
             */
            function setUrlSignOut(val){
                urlSignOut = val;

                return self;
            }

            /**
             * @param val
             */
            function setUsername(val){
                username = val;

                return self;
            }


            /**
             * @param val
             */
            function setVersion(val){
                version = val;

                return self;
            }


            /**
             * Public methods
             */
            return self = {
                initCommentCounter: initCommentCounter,
                maskDisqusComments:maskDisqusComments,
                initEmbed: initEmbed,
                memberComments: memberComments,
                setIdentifier: setIdentifier,
                setMemberUsername: setMemberUsername,
                setName: setName,
                setLoginHeight: setLoginHeight,
                setLoginWidth: setLoginWidth,
                setPublicApiKey : setPublicApiKey,
                setRemoteApiS3: setRemoteApiS3,
                setRestNewCommentEndpoint: setRestNewCommentEndpoint,
                setRestSsoGuidEndpoint: setRestSsoGuidEndpoint,
                setRestSsoSlugEndpoint: setRestSsoSlugEndpoint,
                setShortname: setShortname,
                setTitle: setTitle,
                setUrlSignIn: setUrlSignIn,
                setUrlSignOut: setUrlSignOut,
                setUsername: setUsername,
                setVersion: setVersion
            };
        };

        return disqus();
    }
);
