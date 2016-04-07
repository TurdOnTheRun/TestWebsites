define(["jquery", "globals", "../App.js", "moment", "jqueryui", "bootstrap"], function($, RT, Showtimes, Moment) {
    Showtimes.module("MovieShowtimesView", function(MovieShowtimesView, Showtimes, Backbone, Marionette, $, _) {
        MovieShowtimesView.ShowtimesView = Marionette.ItemView.extend({
            initialize: function(options) {
                this.template = _.template(options.MovieShowtimesTemplate);
                this.controller = options.controller;
                this.presentationsView = new Array();
                var moviePresentations = this.model.get("theaters").at(0).get("movies")[0],
                    movieId = moviePresentations.id,
                    movieInfo = this.model.get("movies").get(movieId);
                movieInfo.set("presentations", new Backbone.Collection(moviePresentations.presentations));
                this.model.get("theaters").at(0).get("movies")[0] = movieInfo;
                for (var i = 0; i < movieInfo.get("presentations").length; ++i) {
                    this.presentationsView.push(new Showtimes.ShowtimesView.PresentationCompositeView({
                        model: movieInfo.get("presentations").at(i),
                        movieId: movieId,
                        parentModel: this.model,
                        theaterData: this.model.get("theaters").at(0)
                    }));
                }
                this.locationPicker = new MovieShowtimesView.LocationPicker({
                    controller: this,
                    el:options.el,
                    isReleased: options.isReleased,
                    movieId: options.movieId,
                    showtimeDate: options.showtimeDate
                });
                this.isFandangoTicketingEnabled = options.controller.isFandangoTicketingEnabled;
                this.movieId = options.movieId;
                this.isReleased = options.isReleased;
                this.showtimeDate = options.showtimeDate;
                this.zipcode = options.zipcode;
            },
            templateHelpers:function(){
                return {
                    isFandangoTicketingEnabled: this.isFandangoTicketingEnabled === 'true'
                }
            },
            className: "showtimes-presentations",
            onRender: function() {
                this.$(".changeLocation").click(this.onChangeLocation.bind(this));
                this.$(".movie-showtimes-item").html("");
                for (var i = 0; i < this.presentationsView.length; ++i) {
                    this.presentationsView[i].render();
                    this.$(".movie-showtimes-item").append(this.presentationsView[i].$el);
                }
            },
            onChangeLocation: function() {
                this.controller.onChangeLocation(this.movieId, this.isReleased, this.showtimeDate);
            },
            serializeData: function() {
                var theaterData = this.model.get("theaters").at(0).toJSON();
                theaterData.isReleased = this.isReleased;
                theaterData.showtimeDateFriendly = Moment(this.showtimeDate, "YYYYMMDD").format("dddd, MMM D");
                theaterData.friendlyPhone = this.phoneToHref(theaterData.phone);
                theaterData.zip = this.zipcode;
                return theaterData;
            },
            phoneToHref: function(phone) {
                var friendlyPhone = phone;
                friendlyPhone = friendlyPhone.replace(/[\(,\),\-,\s]/g, "").replace(/\D/g, function(c) {
                    var q = ['ABC','DEF','GHI','JKL','MNO','PQRS','TUV','WXYZ'];
                    for (var i = 0; i < q.length; i++)
                        if (q[i].indexOf(c) != -1)
                            return i+2;
                });
                friendlyPhone = "+1"+friendlyPhone;
                return friendlyPhone;
            }
        });
        MovieShowtimesView.LocationPicker = Marionette.ItemView.extend({
            events: {
                "click a": "onChangeLocationClicked",
                "keydown": "filterKey",
                "click button": "onButtonClick"
            },
            initialize: function(options) {
                this.el = options.el;
                this.controller = options.controller;
                this.initializeTypeahead();
                this.isReleased = options.isReleased;
                this.showtimeDate = options.showtimeDate;
                this.movieId = options.movieId;
            },
            initializeTypeahead: function() {
                var cityTemplate = "<li data-zip='<@= zipcode @>'><@= zipcode @> (<@= city @>, <@= state @>)</li>";
                this.$(".typeahead").autocomplete({
                    appendTo: "#showtimes .showtimesContainer .results",
                    autofocus: true,
                    source: function(request, response) {
                        if ($("#zipcodeError").length > 0) {
                            $("#zipcodeError").fadeTo(2000, 500).slideUp(500, function () {
                                $("#zipcodeError").alert("close");
                                $("#zipcodeError").remove();
                            });
                        }
                        $.ajax({
                            url: "https://api.flixster.com/desk/api/v1/cities.json",
                            data: {
                                limit: 20,
                                q: request.term
                            },
                            success: function(data) {
                                response(eval(data));
                            }
                        });
                    },
                    minLength: 2,
                    select: function(event, ui) {
                        this.applyNewZipcode(ui.item.zipcode);
                    }.bind(this)
                }).focus(function(event, ui) {
                    event.preventDefault();
                    $("#location-picker #page-title input.typeahead").autocomplete()
                }).autocomplete("instance")._renderItem = function(ul, item) {
                    return $(_.template(cityTemplate)({zipcode: item.zipcode, city: item.city, state: item.stateAbbrev})).appendTo(ul);
                };
                this.$(".typeahead").keydown(function(event) {
                    if (event.keyCode == 13) {
                        this.onEnterValue();
                    }
                }.bind(this));
            },
            applyNewZipcode: function(zipcode) {
                this.$(".typeahead").val(zipcode);
                this.onZipcodeUpdated(zipcode);
            },
            onButtonClick: function() {
                this.onEnterValue();
            },
            onEnterValue: function() {
                if ($("#zipcodeError").length > 0) {
                    $("#zipcodeError").fadeTo(2000, 500).slideUp(500, function () {
                        $("#zipcodeError").alert("close");
                        $("#zipcodeError").remove();
                    });
                }
                setTimeout(function() {
                    if ($("#zipcodeError").length > 0) {
                        $("#zipcodeError").alert("close");
                        $("#zipcodeError").remove();
                    }
                    if ($("#showtimes .showtimesContainer .results .ui-menu-item").size() > 0) {
                        var zipcode = $($("#showtimes .showtimesContainer .results .ui-menu-item").get(0)).data("zip");
                        this.applyNewZipcode(zipcode);
                    } else if (this.$(".typeahead").val().length == 5 && /^[0-9]$/.test(this.$(".typeahead").val())) {
                        this.applyNewZipcode(this.$(".typeahead").val());
                    } else {
                        $("#showtimes .showtimesContainer").append("<div id='zipcodeError' class='alert alert-danger col-xs-24 col-sm-12'>This zip code or city & state is not valid. Please try again.</div>");
                    }
                }.bind(this), 500);
            },
            onZipcodeUpdated: function(zipcode) {
                this.controller.onZipcodeUpdate(this.movieId, zipcode, this.isReleased, this.showtimeDate);
            }
        });
    });
    return Showtimes.MovieShowtimesView;
});