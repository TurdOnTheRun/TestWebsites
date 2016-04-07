(function () {

    function addTracking() {
        if (['AU'].indexOf(countryCode) !== -1) {
            var csid = "F09828";
            var bpid = "evolve_m_au";
            var e = document.createElement("script");
            var s = document.getElementsByTagName("script")[0];
            e.src = "//js.revsci.net/gateway/gw.js?auto=t&csid=" + csid + "&bpid=" + bpid;
            e.async = true;
            s.parentNode.insertBefore(e, s);
        }
    }

    function getCountryCodeFromCookie() {
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }

            if (c.indexOf('gn_country=') === 0) {
                return c.substring(11, c.length);
            }
        }

        return '';
    }

    var countryCode = '';
    countryCode = getCountryCodeFromCookie();

    if (countryCode === '') {
        var geoScript = document.createElement('script');
        geoScript.type = 'text/javascript';
        geoScript.src = 'http://geo.gorillanation.com/geo.php';
        document.body.appendChild(geoScript);

        setTimeout(function () {
            countryCode = getCountryCodeFromCookie();
            addTracking();
        }, 500);
    } else {
        addTracking();
    }

})();