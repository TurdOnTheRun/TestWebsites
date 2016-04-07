(function(window, document, Adform, ns) {

    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[scripts.length - 1];
    var queryString = myScript.src.replace(/^[^\?]+\??/, '');


    function parseQuery(query) {
        var Params = new Object();
        if (!query) return Params; // return empty object
        var Pairs = query.split(/[;&]/);
        for (var i = 0; i < Pairs.length; i++) {
            var KeyVal = Pairs[i].split('=');
            if (!KeyVal || KeyVal.length != 2) continue;
            var key = unescape(KeyVal[0]);
            var val = unescape(KeyVal[1]);
            val = val.replace(/\+/g, ' ');
            Params[key] = val;
        }
        return Params;
    }

    var params = parseQuery(queryString);

    var pv_domain = params.domain; // %ADFMED%
    var pv_placement = params.placement; // %ADFPLAID%
    var pv_campaign = params.campaign; // %ADFCAM%
    var pv_ad = params.banner; // %ADFCRE%
    var pv_ad_size = params.size; // %ADFDIM%

    var tagid = params.tagid;

    var interval = setInterval(function() {
        if (Adform.adRegister && Adform.RMB) {
            clearInterval(interval);
            attachListeners();
        }
    }, 50);

    function attachListeners() {
        var xId = Adform.adRegister[tagid].settings.options.xId;
        var eapi = Adform.RMB.EngagementAPI(xId);
        var mRkGnAdF_PVTfiredOnce = false;

        if (eapi.get("visible")) {
            mRkGnAdF_PVTfiredOnce = true;
            mRkGnAdF_launchPVT();
        } else {
            eapi.on('change', function(visibility) {
                if (!mRkGnAdF_PVTfiredOnce && visibility.visible === true) {
                    mRkGnAdF_PVTfiredOnce = true;
                    mRkGnAdF_launchPVT();
                }
            });
        }

        setTimeout(function() {
            if (eapi.get("visible") && !mRkGnAdF_PVTfiredOnce) {
                mRkGnAdF_PVTfiredOnce = true;
                mRkGnAdF_launchPVT();
            }
        }, 1000);
    }

    function mRkGnAdF_launchPVT() {
        var pv_link = 'https://pvt.ubs.com/content/dam/static/Analytics/pvtracking.htm?dom=' + pv_domain + '%26plc=' + pv_placement + '%26cmp=' + pv_campaign + '%26ad=' + pv_ad + '%26cr=' + pv_ad_size;
        var pv_iframe = document.createElement('iframe');
        pv_iframe.src = pv_link;
        pv_iframe.frameBorder = 0;
        pv_iframe.width = 0;
        pv_iframe.height = 0;
		pv_iframe.style.position = "absolute";
        var pv_ref = document.getElementsByTagName('script')[0];
        pv_ref.parentNode.insertBefore(pv_iframe, pv_ref);
    }
})(window, document, (Adform = window.Adform || {}));
