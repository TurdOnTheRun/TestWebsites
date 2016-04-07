if(typeof $ !== "undefined" && !!window.dioFramework) {
    var cookieUtil = require("analytics-core/util/cookies");
    var rdpVal = cookieUtil.getCookie('bby_rdp');
    if(rdpVal && rdpVal === 's') {
        $('#listpage-admodel-target').remove();
    }
}