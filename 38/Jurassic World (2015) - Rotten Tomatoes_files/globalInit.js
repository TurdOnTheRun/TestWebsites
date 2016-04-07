define(["jquery", "facebook", "backbone"], function($, FB, Backbone) {
    return function(StaticHost, utmMedium, twtrtext) {
        var LoginStatusModel = new Backbone.Model();
        var globalObject = { };
        globalObject.social_init = $.Deferred();
        globalObject.fb_ready = $.Deferred();
        globalObject.fb_connected = $.Deferred();
        globalObject.ads=[];
        globalObject.LoginStatusModel = LoginStatusModel;
        globalObject.StaticHost = StaticHost;
        globalObject.utmMedium = utmMedium;
        globalObject.twtrtext = twtrtext;
        globalObject.Backbone = {
            Views : {},
            Models : {},
            Routers : {},
            Collections : {}
        };
        globalObject.Sharing = function() {
            var facebookLike = function(ele) {
                if ($(".social-tools-facebook-like", ele).hasClass("liked")) {
                    $(".social-tools-facebook-like", ele).removeClass("liked");
                    $(".fb_like").attr("src", StaticHost + "/images/social/social_fb_like.png");
                    FB.api(
                        facebookLikeId,
                        'delete',
                        function(response) {}
                    );
                } else {
                    $(".social-tools-facebook-like", ele).addClass("liked");
                    $(".fb_like").attr("src", StaticHost + "/images/social/social_fb_liked.png");
                    FB.api(
                        'me/og.likes',
                        'post',
                        {
                            object: document.URL
                        }, function(response) {}
                    );
                }
            },
            fbLike_click = function(ele) {
                if (LoginStatusModel.get("loginPlatformCode") == undefined ||
                    LoginStatusModel.get("loginPlatformCode") == "Unknown") {
                    var scope = ele.attr("scope");
                    if (undefined === scope) {
                        scope = 'email,publish_actions,user_friends';
                    }
                    FB.login(function(response) {
                        globalObject.fb_connected.done(function() {
                            if (ele.data("redirect") !== undefined) {
                                window.location.href = ele.data("redirect");
                            }
                        });
                        if (!response.authResponse) {
                            console.log('User cancelled Facebook login or did not fully authorize.');
                            $(".social-tools-facebook-like", ele).removeClass("liked");
                            $(".fb_like", ele).attr("src", globalObject.StaticHost+"/images/social/social_fb_like.png");
                        } else {
                            facebookLike();
                        }
                    }, {scope: scope});
                } else {
                    facebookLike(ele);
                }
            },
            fbShare_click = function() {
                var url = document.URL;
                url = addParam(url, "utm_campaign", "sharelinks");
                url = addParam(url, "utm_medium", utmMedium);
                url = addParam(url, "utm_source", "fbk");

                FB.ui({
                    method: 'feed',
                    link: url
                }, function(response){});
            },
            bit_url = function(url){
                var url = url,
                    username = "flixstertomatoes",
                    key = "R_244b3f625ae2e1fbdc77b2bab2607790",
                    bit_url = "";
                return $.ajax({
                    url: "http://api.bit.ly/v3/shorten",
                    async: true,
                    data: {longUrl:url,apiKey:key,login:username},
                    dataType: "jsonp"
                });
            },
            newTwitterWindow = function(){
                var twitterWin = window.open("", "_blank", getWindowParams()),
                    url = document.URL,
                    bit = bit_url(url);
                bit.success(function(v) {
                    if (v.data.length > 0) {
                        twitterHelper(v.data.url, twitterWin);
                    } else {
                        twitterHelper(url, twitterWin);
                    }
                });
                bit.error(function() {
                    twitterHelper(url, twitterWin);
                });
            },
            twitterHelper = function(url, twitterWin) {
                url = addParam(url, "utm_campaign", "sharelinks");
                url = addParam(url, "utm_medium", utmMedium);
                url = addParam(url, "utm_source", "twtr");

                twitterWin.location = 'http://twitter.com/share?url=' + encodeURIComponent(url) + "&text=" + encodeURIComponent(twtrtext) + "&via=" + encodeURIComponent("RottenTomatoes");
                twitterWin.focus();
            },
            newPinterestWindow = function(){
                var mediaUrl=$(".pinterestImage").attr("src"),
                    description=document.title,
                    url = document.URL;
                url = addParam(url, "utm_campaign", "sharelinks");
                url = addParam(url, "utm_medium", utmMedium);
                url = addParam(url, "utm_source", "pin");

                window.open("http://pinterest.com/pin/create/link/?url=" + encodeURIComponent(url) + "&media=" + encodeURIComponent(mediaUrl) + "&description=" + encodeURIComponent(description), '_blank',  getWindowParams());
            },
            newGooglePlusWindow = function(){
                var url = document.URL;
                url = addParam(url, "utm_campaign", "sharelinks");
                url = addParam(url, "utm_medium", utmMedium);
                url = addParam(url, "utm_source", "google");

                window.open('https://plus.google.com/share?url='+encodeURIComponent(url),'_blank',getWindowParams());
            },
            newStumbleUponWindow = function(){
                var url = document.URL;
                url = addParam(url, "utm_campaign", "sharelinks");
                url = addParam(url, "utm_medium", utmMedium);
                url = addParam(url, "utm_source", "stumble");

                window.open('http://www.stumbleupon.com/submit?url=' + encodeURIComponent(url), '_blank',  getWindowParams());
            },
            getWindowParams = function() {
                var width  = 575,
                    height = 450,
                    wLeft = window.screenLeft ? window.screenLeft : window.screenX,
                    wTop = window.screenTop ? window.screenTop : window.screenY,
                    left = wLeft + (window.innerWidth / 2) - (width / 2),
                    top = wTop + (window.innerHeight / 2) - (height / 2);
                return 'status=0,location=0,menubar=0,width='+width+',height='+height+',top='+top+',left='+left;
            },
            addParam = function(myUrl, name, value) {
                var re = new RegExp("([?&]" + name + "=)[^&]+", ""),
                    add = function(sep) {
                        myUrl += sep + name + "=" + encodeURIComponent(value);
                    },
                    change = function() {
                        myUrl = myUrl.replace(re, "$1" + encodeURIComponent(value));
                    };

                if (myUrl.indexOf("?") === -1) {
                    add("?");
                } else {
                    if (re.test(myUrl)) {
                        change();
                    } else {
                        add("&");
                    }
                }
                return myUrl;
            };
            return {
                fbLike_click: fbLike_click,
                fbShare_click: fbShare_click,
                newTwitterWindow: newTwitterWindow,
                newGooglePlusWindow: newGooglePlusWindow,
                newPinterestWindow: newPinterestWindow,
                newStumbleUponWindow: newStumbleUponWindow
            };
        }();
        return globalObject;
    };
});