window.searchBaseUrl = '';
window.cdn_loc = 'http://a.abcnews.com';

if(document.domain === 'preview.abcnews.go.com' || document.domain === 'qa.n7.abcnews.go.com' || document.domain === 'newspreview.corp.dig.com'){
    window.cdn_loc = '';
}

var agentStr = navigator.userAgent.toLowerCase();
if(agentStr.indexOf('mac')!==-1){
	document.write("<link type='text/css' rel='stylesheet' media='screen, print' href='" + window.cdn_loc + "/assets/scss/css/mac.css?v=1.4' />");
}

var isiPad = navigator.userAgent.match(/iPad/i) != null;
var isiPhone = navigator.userAgent.match(/ip(hone|od)/i) != null;
var isAndroid = navigator.userAgent.match(/Android/i) != null;

//sniff out android mobile, avoid tablets
var isAndroidMobileDevice = false;
if(isAndroid) {
    if(navigator.userAgent.match(/Mobile/)!==null){
        isAndroidMobileDevice = true;
    }
}

function getInternetExplorerVersion() {
  var rv = -1;
  var ua = navigator.userAgent;
  var re;

  if (navigator.appName === 'Microsoft Internet Explorer') {

    re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

    if (re.exec(ua) !== null){
        rv = parseFloat( RegExp.$1 );
    }
  } else if (navigator.appName === 'Netscape') {
    re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");

    if (re.exec(ua) !== null) {
        rv = parseFloat( RegExp.$1 );
    }
  }
  return rv;
}

//ie 10, 11 customizations
var ie_version = getInternetExplorerVersion();

if(ie_version!==-1){
    var ieVersion = '';

    switch(ie_version){
        case 10:
            ieVersion = parseInt(ie_version);
        break;
        case 11:
             ieVersion = parseInt(ie_version);
        break;
        default:
    }

    if (ieVersion !== '') {
      var headHTML = document.getElementsByTagName('head')[0].innerHTML;
      headHTML += '<link type="text/css" rel="stylesheet" media="screen, print" href="//a.abcnews.com/assets/css/ie'+ieVersion+'.css?v=2.8" />';
      document.getElementsByTagName('head')[0].innerHTML = headHTML;
    }
}
