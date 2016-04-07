(function () {
    function isEmpty(value) {
    if (value == null) return true;
    return value == "";
}
    function CurrentLocation() {
    return {
        type: CurrentLocation.extractType(),
        doi: CurrentLocation.extractDoi(),
        issn: CurrentLocation.extractIssn(),
        toQuery : function() {
            return encodeURIComponent(JSON.stringify(this));
        }
    }
}

CurrentLocation.extractType = function () {
    var doi = CurrentLocation.extractDoi();
    if (doi) return "article";
    // Use WebTrends Page Type if available
    var value = jQuery("meta[name='WT.cg_s']").attr("content");
    if (value) {
        var page = value.toLowerCase();
        var locations = ['article', 'research', 'issue'];
        if (locations.indexOf(page) != -1) return page;
    }
    // Fallback to Title for Issue Page!
    if (document.title.indexOf("Table of contents") == 0) return "issue";
};

CurrentLocation.extractDoi = function () {
    var result = jQuery("meta[name='dc.identifier'], meta[name='DC.identifier'], meta[name='prism.doi']").attr("content");
    return isEmpty(result) ? null : result.replace("doi:", "");
};

CurrentLocation.extractIssn = function () {
    var meta = jQuery("meta[name='prism.issn'], meta[name='prism.eIssn']").first().attr("content");
    if (meta) return meta;
    var text = jQuery('.issn, .eissn').first().text().match(/\d{4}\-\d{4}/);
    if (text) return text[0];
};

    var numberOfRecommendations = 5;
var experimentMinimumRead = { true: 4, false: 5};
var jQueryWaitLimit = 10;
var jQueryDelay = 200;
var id = "DE_708963e4-6f47-4bc8-9762-c8d82079dde4";
var overlayVisible = false;
var host = "http://recommendations.springernature.com/app/";
var config = {};
var currentLocation;

/* helpers */



/* Display recommendations */

function showRecommendations() {
    checkPermissions(function () {
        delayDisplay(function () {
            loadCSS("style.css");
            loadTemplates("templates.html", recommend);
        });
    });
}

function checkPermissions(done) {
    if (isEmpty(currentLocation.type)) return;

    jQuery.ajax({
        method: "GET",
        headers: {
            Accept: "application/json"
        },
        url: host + "recommendations/show?location=" + currentLocation.toQuery() + "&userId=" + encodeURIComponent(id)
    }).done(function (data) {
        if (data && data['show-recommendations']) {
            config = data;
            done();
        }
    });
}

function delayDisplay(done) {
    var didScroll = false;

    jQuery(window).scroll(function () {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll && !overlayVisible) {
            didScroll = false;
            if (jQuery(window).scrollTop() > 740) {
                overlayVisible = true;
                done();
            }
        }
    }, 250);
}

function loadCSS(path) {
    jQuery('head').append('<link rel="stylesheet" href="' + host + path + '" type="text/css" />');
}

function loadTemplates(path, handler) {
    jQuery.ajax({
        method: "GET",
        url: host + path,
        dataType: "html"
    }).done(function (response) {
        handler(jQuery(response)[0]);
    });
}

function recommend(templates) {
    jQuery.ajax({
        method: "GET",
        headers: {
            Accept: "application/json"
        },
        url: host + "recommendations?userId=" + encodeURIComponent(id) +
        "&minimumRead=" + minimumRead() +
        "&number=" + numberOfRecommendations +
        "&location=" + currentLocation.toQuery() +
        "&config=" + encodeURIComponent(JSON.stringify(config))
    }).done(function (recommendations) {
        if (recommendations.length) {
            buildOverlay(recommendations[randomInteger(0, recommendations.length - 1)], templates);
        }
    });
}

function minimumRead() {
    return experimentMinimumRead[config['experiment-minimum-read']] || experimentMinimumRead[false];
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildOverlay(recommendation, overlay) {
    if (recommendation.link && recommendation.title && recommendation.doi) {
        var doi = recommendation.doi;
        var item = jQuery('.utd-recommendation', overlay);
        var authors = jQuery('.utd-recommendation-authors', item);
        var author = jQuery('.utd-recommendation-author', authors);
        var title = jQuery('.utd-recommendation-article-title', item);


        var journal = jQuery('.utd-recommendation-journal', item);
        title.attr("href", recommendation.link);
        title.attr("title", recommendation.title);
        title.text(recommendation.title);

        authors.innerHTML = "";
        for (var i = 0; i < recommendation.authors.length; i++) {
            author.text(recommendation.authors[i]);
            authors.html(authors.html() + author[0].outerHTML);
        }

        journal.text(recommendation.journal);

        buildControls(overlay, doi);
    }
}

function buildControls(overlay, doi) {
    var controls = jQuery('<div class="utd-recommendations-controls"></div>');
    var close = jQuery('<button class="utd-recommendations-close"><span class="utd-hide-text">Close</span></button>');
    close.click(function () {
        jQuery(".utd-recommendations-overlay").removeClass('utd-animate');
        webtrendsEvent("utd_close_click", currentLocation.type, doi, "51");
        event("recommendations/close", doi);
    });

    jQuery('.utd-recommendations-main', overlay).append(controls);
    jQuery(controls).append(close);

    displayOverlay(overlay, doi);
}

function displayOverlay(overlayHtml, doi) {
    jQuery('body').append(overlayHtml);
    var overlay = jQuery(".utd-recommendations-overlay");

    overlay.hide();

    for (var name in config) {
        if (config.hasOwnProperty(name) && config[name]) {
            overlay.addClass('utd-' + name);
        }
    }

    overlay.show().addClass('utd-animate');

    jQuery('[data-object=utd-recommendations-overlay]').on('click', '[data-track]', continuation(function (e, callback) {
        webtrendsEvent("utd_title_click", currentLocation.type, doi, "24", callback);
    }));
    webtrendsEvent('utd_view', currentLocation.type, doi, 51, 51);
    event("recommendations/view", doi);
}

/* Tracking */

function articleView() {
    var doi = currentLocation.doi;
    if (doi) {
        jQuery.ajax({
            method: "GET",
            headers: {
                Accept: "application/json"
            },
            url: host + "view?userId=" + encodeURIComponent(id) + "&doi=" + encodeURIComponent(doi)
        });
    }
}

function event(name, doi) {
    jQuery.ajax({
        method: "GET",
        url: host + name + "?userId=" + encodeURIComponent(id) + "&location=" + currentLocation.toQuery() +
        "&doi=" + encodeURIComponent(doi) + "&config=" + encodeURIComponent(JSON.stringify(config))
    });
}

var continuation = function (handler) {
    return function (e) {
        var MOUSE_BUTTON_LEFT = 1;
        var url = jQuery(e.target).attr('href');
        var modifierKeys = (e.metaKey || e.ctrlKey || e.shiftKey);
        var fakeClickRequired = (e.which === MOUSE_BUTTON_LEFT && !modifierKeys && !!url);
        if (fakeClickRequired) {
            e.preventDefault();
        }
        handler.call(this, e, function () {
            if (fakeClickRequired) {
                document.location = url;
            }
        });
    };
};

function webtrendsEvent(action, source, dest, dl, done) {
    if (Webtrends && Webtrends.multiTrack) {
        var names = [];
        var values = [];
        for (var name in config) {
            if (config.hasOwnProperty(name)) {
                var value = config[name];
                names.push(name);
                values.push(value ? 1 : 0);
            }
        }

        var args = {
            'WT.action': action,
            'WT.source': source,
            'WT.destination': dest,
            'WT.dl': dl,
            'WT.ndl': dl,
            'WT.z_bandiera_feature': names.join(';'),
            'WT.z_bandiera': values.join(';')
        };

        Webtrends.multiTrack({
            args: args,
            callback: done
        });
    } else {
        done();
    }
}

var count = 0;

function waitForJQuery() {
    if (typeof(jQuery) !== 'undefined') {
        currentLocation = CurrentLocation();
        articleView();
        showRecommendations();
    } else {
        if (count++ < jQueryWaitLimit) setTimeout(waitForJQuery, jQueryDelay);
    }
}

waitForJQuery();

})();
