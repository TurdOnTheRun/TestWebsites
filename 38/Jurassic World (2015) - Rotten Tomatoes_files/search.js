define(["jquery", "underscore", "backbone", "globals", "jqueryui"], function($, _, Backbone, RT) {
    _.templateSettings = {
        interpolate: /\<\@\=(.+?)\@\>/gim,
        evaluate: /\<\@(.+?)\@\>/gim
    };
    var query = null,
        MovieTemplate = null,
        TvTemplate = null,
        CelebTemplate = null,
        CriticTemplate = null,
        FranchiseTemplate = null;

    var environment = "";
    return Backbone.View.extend({
        events: {
            "click #search-term": "onSearchTermClick"
        },
        initialize: function(options) {
            this.$el = options.el;
            MovieTemplate = options.MovieTemplate;
            TvTemplate = options.TvTemplate;
            CelebTemplate = options.CelebTemplate;
            CriticTemplate = options.CriticTemplate;
            FranchiseTemplate = options.FranchiseTemplate;
            if (options.environment) {
                environment = options.environment;
            }
            var thisObject = this;
            $.widget("custom.catcomplete", $.ui.autocomplete, {
                _create: function() {
                    this._super();
                    this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
                },
                _renderMenu: function(ul, items) {
                    thisObject.renderMenu.bind(this, ul, items)();
                }
            });
            this.$(".navbar-searchbox input[name=search]").catcomplete({
                minLength:2,
                open: this.catCompleteOpen.bind(this),
                source: this.catCompleteSource,
                focus: function(event, ui) {
                    return false;
                },
                select: this.catCompleteSelect
            }).catcomplete("instance")._renderItem = function(ul, item) {
                if ("Movies" == item.category) {
                    return $(_.template(MovieTemplate)({value: item.value, query: query, environment: environment})).appendTo(ul);
                } else if ("Tv Series" == item.category) {
                    return $(_.template(TvTemplate)({value: item.value, query: query, environment: environment})).appendTo(ul);
                } else if ("Celebrities" == item.category) {
                    return $(_.template(CelebTemplate)({value: item.value, query: query, environment: environment})).appendTo(ul);
                } else if ("Critics" == item.category) {
                    return $(_.template(CriticTemplate)({value: item.value, query: query, environment: environment})).appendTo(ul);
                } else if ("Franchises" == item.category) {
                    return $(_.template(FranchiseTemplate)({value: item.value, query: query, environment: environment})).appendTo(ul);
                }
            };
            $(".ui-autocomplete").on("touchstart", "li.ui-menu-item", function() {
                var container = $(this).closest(".ui-autocomplete"),
                    item = $(this),
                    iOSCheck = function() {
                        if (container.is(':visible') && item.hasClass('ui-state-focus')) {
                            item.trigger('click');
                            return true; // it needed it
                        }
                        return false; // it didn't
                    }; // hack for iOS's tap to hover headache
                setTimeout(function() {
                    if (iOSCheck()) {
                        setTimeout(iOSCheck, 600);
                    }
                }, 600);
            });
            if (options.onRenderMenu) {
                this.onRenderMenu = options.onRenderMenu;
            }
        },
        renderMenu: function(ul, items) {
            var currentCategory = "";
            $.each(items, function(index, item) {
                var li;
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'><h3>" + item.category + "</h3></li>");
                    currentCategory = item.category;
                }
                li = this._renderItemData( ul, item );
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.value.name);
                }
            }.bind(this));
        },
        catCompleteOpen: function() {
            if (0 == $(".ui-autcomplete .more").length) {
                $("<li class='more ui-menu-item'><a class='pull-left unstyled' href='" + environment + "/search/?search="+query+"'><p>View All Search Results<span class='glyphicon glyphicon-menu-right'></span></p></a></div></li>").appendTo(".ui-autocomplete");
            } else {
                $(".ui-autcomplete .more a").attr("href", environment + "/search/?search="+query);
            }
            if (this.onRenderMenu) {
                this.onRenderMenu();
            }
        },
        catCompleteSource: function(request, response) {
            query = request.term.replace("&", "%26");
            $.get(environment + "/search/json/", {
                catCount:2,
                q: request.term
            }, function(media) {
                var fullData = new Array();
                if (typeof(media.franchises) !== "undefined") {
                    for (var i = 0; i < 2 && i < media.franchises.length; ++i) {
                        media.franchises[i].category = "Franchises";
                        fullData.push({value: media.franchises[i], category: "Franchises"});
                    }
                }
                if (typeof(media.movies) !== "undefined") {
                    for (var i = 0; i < 2 && i < media.movies.length; ++i) {
                        media.movies[i].category = "Movies";
                        fullData.push({value: media.movies[i], category: "Movies"});
                    }
                }
                if (typeof(media.tvResults) !== "undefined") {
                    for (var i = 0; i < 2 && i < media.tvResults.length; ++i) {
                        media.tvResults[i].category = "Tv Series";
                        fullData.push({value: media.tvResults[i], category: "Tv Series"});
                    }
                }
                if (typeof(media.actors) !== "undefined") {
                    for (var i = 0; i < 2 && i < media.actors.length; ++i) {
                        media.actors[i].category = "Celebrities";
                        fullData.push({value: media.actors[i], category: "Celebrities"});
                    }
                }
                if (typeof(media.critics) !== "undefined") {
                    for (var i = 0; i < 2 && i < media.critics.length; ++i) {
                        media.critics[i].category = "Critics";
                        fullData.push({value: media.critics[i], category: "Critics"});
                    }
                }
                response(fullData);
            }.bind(this))
        },
        catCompleteSelect: function(event, ui) {
            var searchParameter = "/?search=" + $(".navbar-searchbox input[name=search]").val();
            if ("Movies" == ui.item.category) {
                window.location.href = environment + "/m/" + ui.item.value.vanity + searchParameter;
            } else if ("Tv Series" == ui.item.category) {
                window.location.href = environment + ui.item.value.url + searchParameter;
            } else if ("Celebrities" == ui.item.category) {
                window.location.href = environment + "/celebrity/" + ui.item.value.vanity + searchParameter;
            } else if ("Critics" == ui.item.category) {
                window.location.href = environment + "/critic/" + ui.item.value.vanity + searchParameter;
            } else if ("Franchises" == ui.item.category) {
                window.location.href = environment + "/franchise/" + ui.item.value.vanity + searchParameter;
            }
            $(".navbar-searchbox input[name=search]").val(ui.item.value.name);
            return false;
        },
        onSearchTermClick: function(event) {
            if ($(window).width() < 768 && !$(".navbar-searchbox").hasClass("expanded")) {
                switch (event.which) {
                    case 1:
                        $(".navbar-searchbox").addClass("expanded");
                        $(".navbar-brand").addClass("hide");
                }
            }
        },
    });
});