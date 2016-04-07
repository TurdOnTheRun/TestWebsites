(function(){
var isIE = window.navigator.userAgent.indexOf("MSIE ") > 0;
var ifr = "<"+"iframe id=\"cto_iframe_20c51ac719\" frameBorder=\"0\" allowtransparency=\"true\" hspace=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" vspace=\"0\" width=\"300px\" height=\"600px\"\n";
if(isIE && document.domain !== window.location.hostname) {
ifr += " src=\"javascript:'<script>window.onload=function(){document.write(\\\'<script>document.domain = &quot;"+document.domain + "&quot;;<\\\\/script>\\\');document.close();};</script>'\"";
}
ifr += "><"+"/iframe>\n";
document.write(ifr);
var ifc = "\n";
ifc += "<"+"!DOCTYPE html>\n";
ifc += "<"+"html>\n";
ifc += "  <"+"head>\n";
ifc += "    <"+"meta name=\"format-detection\" content=\"telephone=no\"><"+"meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n";
ifc += "  <"+"/head>\n";
ifc += "  <"+"body><"+"script language=\'JavaScript\' src=\'https://tags.mathtag.com/notify/js?exch=cri&id=5aW95q2jLzgvIC9ZalF4WVRVMVpqQXRZVEJqTVMwME9UQXdMV0pqWXpRdFkyVTVNR1EyWkdZMllUUmovNzc3NzIwMDYxOTU5Mzg2MjI5LzIzNzA1MzcvMTIwNTA0OC8yMC9IVFZNekN4NUxfVE9mdGljTmpFb3hXLVZxenJObU9oMWxiRWUtU1B3WVNVLzEvMjAvMTQ1NjQ5MDc5OC8wLzE3OTEzMS8xMjQ2MTY4MzAzLzEzNDQ1MS8yNDU1MzAvMS8wLzAvWWpReFlUVTFaakF0WVRCak1TMDBPVEF3TFdKall6UXRZMlU1TUdRMlpHWTJZVFJqLw/IwMSN58cpI1UTQawSTHod0VHbbw&sid=1205048&cid=2370537&nodeid=43&price=4.49&bp=bf_bfbfbf&3pck=[CLICK_URL]\'><"+"/script>\n";
ifc += "<"+"div id=\'beacon_20c51ac719\' style=\'position: absolute; left: 0px; top: 0px; visibility: hidden;\'>\n";
ifc += "<"+"img width=\"0\" height=\"0\" src=\"https://cat.ny.us.criteo.com/delivery/lg.php?cppv=1&cpp=ANQRTHxOMnlXSlJBWFBiTnJjR3I1b2FPU3N1TGlNR0RhcFFDT3pDekZRREM0ZFIxb3hIeUdmb3FrbnBTZjY1N2RPSFZJczh2TUx6WU5PWkY2OXF4V1huQzZCZnI4bnh5NThOWGgreEFQc1FoMEpkWTZlZ01nVEdJV1JFY2phNllpR1VGd1JVNnBnUTlyWkVFVWhpRFN5NTVISWc1NHFReStCc3oyalhQdmlNQVBmOU1EWExoT2FUakN3cWdnSDRER1N6N093d2RBQUFHTVorSUJ2K24rSUlxaG4yNWdQSVBHQ2VUdXU4UzdVSmE4U1ptSklPNEMraEVkbTBqNS9hUEtkVi9SfA%3D%3D\"/>\n";
ifc += "<"+"/div>\n";
ifc += "<"+"/body>\n";
ifc += "<"+"/html>\n";

var fillIframe = function(ifrd) {
    var getDocument = function(iframe) {
        var result_document = iframe.contentWindow || iframe.contentDocument;
        if (result_document && result_document.document)
            result_document = result_document.document;
        return result_document;
    };
    var c = getDocument(ifrd);
    if (c) {
        c.open();
        c.write(ifc);
        c.close();
    }
};


var maxRetryAttempts = 100;
var loaded = false;
var pollIframe = function() {
    var ifrd = document.getElementById('cto_iframe_20c51ac719');
    if (ifrd && isIE) {
         ifrd.onload = function() {
            if(!loaded) {
                loaded = true;
                fillIframe(ifrd);
            }
        };
    } else if (ifrd) {
        loaded = true;
        fillIframe(ifrd);
    } else if (maxRetryAttempts-- > 0) {
        setTimeout(pollIframe, 10);
    }
};pollIframe();})();
