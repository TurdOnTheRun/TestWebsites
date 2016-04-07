define(["jquery", "underscore", "backbone", "globals"], function($, _, Backbone, RT) {
    _.templateSettings = {
        interpolate: /\<\@\=(.+?)\@\>/gim,
        evaluate: /\<\@(.+?)\@\>/gim
    };
    var nameTemplate = _.template("<@= firstName @>&nbsp;<@= lastName @>"),
        wtsTemplate = _.template('<span class="glyphicon glyphicon-plus" style="color:#0C89C8"></span><span class="count"><@= wtsCount @></span>&nbsp;Wants to See'),
        ratingTemplate = _.template('<span class="glyphicon glyphicon-star" style="color:#F18714"></span><span class="count"><@= ratingCount @></span>&nbsp;Ratings'),
        friendTemplate = _.template('<span class="icon friends"></span><span class="count"><@= friendCount @></span>&nbsp;friends');
    var PageHeader = Backbone.View.extend({
        initialize: function (options) {
            _.bindAll(this, "render");

            this.listenTo(this.model, "change", this.render);
            this.mobileEl = $(options.mobileEl);

            console.log("initializing header");
            this.render();
        },

        events: {
            "click #header-top-bar-logout": "logout",
        },

        logout: function (event) {
            dataLayer.push({'event': 'Header', 'action': 'Logout'});
            if ("facebook" == this.model.get("userType")) {
                FB.getLoginStatus(function (response) {
                    if (response.status == "connected") {
                        FB.logout(function (response) {
                            window.location.href = event.target.href;
                        });
                    } else {
                        window.location.href = event.target.href;
                    }
                });

                return false; // Discontinue existing href action
            }
        },

        hideUserDropdown: function() {
            this.$(".userDropdown").hide();
            this.$(".signupLink").show();
            this.$(".loginLink").show();

            $(".userProfile", this.mobileEl).hide();
            $(".logoutRow", this.mobileEl).hide();
            $(".signupLink", this.mobileEl).show();
            $(".loginLink", this.mobileEl).show();
        },

        render: function () {
            var model = this.model,
                userType = model.get("userType");
            console.log("Rendering page header - usertype:" + userType);

            if (!userType || "anon" == userType) {
                this.hideUserDropdown();
            } else {
                if ("rt-native" == userType) {
                    RT.social_init.resolve();
                }
                $(".signupLink").hide();
                $(".loginLink").hide();

                var profileUrl = RT.LoginStatusModel.get("profileUrl");
                if (null == (profileUrl.match(/\//g)) || (profileUrl.match(/\//g)).length <= 3) {
                    profileUrl = "/user/id/" + RT.LoginStatusModel.get("flixsterId") + "/";
                }

                // Fill in info
                this.$(".userDropdown .userStats > a").attr("href", profileUrl);
                this.$(".userDropdown .userStats .name a")
                    .attr("href", profileUrl)
                    .html(nameTemplate({ firstName: RT.LoginStatusModel.get("firstName"), lastName: RT.LoginStatusModel.get("lastName") }));
                this.$(".userDropdown .userStats .wts a")
                    .attr("href", profileUrl + "wts")
                    .html(wtsTemplate({ wtsCount: RT.LoginStatusModel.get("wtsCount") }));
                this.$(".userDropdown .userStats .ratings a")
                    .attr("href", profileUrl + "ratings")
                    .html(ratingTemplate({ ratingCount: RT.LoginStatusModel.get("ratingCount") }));
                this.$(".userDropdown .userStats .friends a")
                    .attr("href", profileUrl + "friends")
                    .html(friendTemplate({ friendCount: RT.LoginStatusModel.get("friendCount") }));
                this.$(".userDropdown").show();

                this.$(".userName").text(model.get("firstName"));
                this.$(".userThumb").attr("src", model.get("thumbnailUrl"));

                $(".userProfile", this.mobileEl).show();
                $(".logoutRow", this.mobileEl).show();
                $(".userProfile a", this.mobileEl).attr("href", profileUrl);
                $(".name", this.mobileEl).html(nameTemplate({ firstName: RT.LoginStatusModel.get("firstName"), lastName: RT.LoginStatusModel.get("lastName") }));
                $(".media-object", this.mobileEl).attr("src", model.get("thumbnailUrl"));
            }
            $(".logout", this.mobileEl).click(this.logout.bind(this));
        }
    });
    return PageHeader;
});