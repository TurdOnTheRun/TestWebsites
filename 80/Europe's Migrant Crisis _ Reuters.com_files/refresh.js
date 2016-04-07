Reuters.namespace("refresh");

Reuters.refresh.refreshFlag = true;
Reuters.refresh.refreshTime = 720000; //720000 milliseconds, 12 minutes (720 seconds)
if (Reuters.utils.refreshTime) {
    Reuters.refresh.refreshTime = Reuters.utils.refreshTime;
}
Reuters.refresh.requestTimeout = Reuters.refresh.refreshTime - 1500;
Reuters.refresh.refreshCookieName = 'autorefresh';
Reuters.refresh.sUrl = "/assets/info";
Reuters.refresh.timesCalled = 0;
Reuters.refresh.refreshInterval = 0;
Reuters.refresh.request;

Reuters.refresh.makeRequest = function() { 
	if (Reuters.refresh.refreshFlag) {
		YAHOO.util.Cookie.set(Reuters.refresh.refreshCookieName, 'true');
		Reuters.refresh.request = YAHOO.util.Connect.asyncRequest('GET', Reuters.refresh.sUrl, Reuters.refresh.callback);
	}

	document.cookie = "autorefreshed=true"
}
 
Reuters.refresh.responseSuccess = function(o) {	
	window.location.href = window.location.href;
}
 
Reuters.refresh.responseFailure = function(o) {
	trace("Connection lost to reuters.com. Your browser will try to connect again in "+ (Reuters.refresh.refreshTime/60000) + " minutes");
}

Reuters.refresh.callback = {
  success:Reuters.refresh.responseSuccess,
  failure:Reuters.refresh.responseFailure,
  timeout: Reuters.refresh.requestTimeout
}

Reuters.refresh.doLoad = function() {
	clearInterval(Reuters.refresh.refreshInterval);
	Reuters.refresh.refreshInterval = setInterval( "Reuters.refresh.makeRequest()", Reuters.refresh.refreshTime );

	if(WebTrends.prototype.dcsGetCookie('autorefreshed') == 'true') {
		dataLayer.push({
	      'analyticsAttributes': ''
	    });
	    dataLayer.push({
	      'event': 'GA_event',
	      'category': 'Auto Refresh',
	      'action': 'Auto Refresh',
	      'analyticsAttributes': {
	        'AutoRefresh': '1',
	      }
	    });
	    document.cookie = "autorefreshed=false"
	}
}

Reuters.refresh.clearRefreshCookie = function() {
  YAHOO.util.Cookie.remove(Reuters.refresh.refreshCookieName);
}

Reuters.refresh.stopRefresh = function() {
	Reuters.refresh.refreshFlag = false;	
	clearInterval(Reuters.refresh.refreshInterval);
}

Reuters.refresh.startRefresh = function() {
	Reuters.refresh.refreshFlag = true;
	Reuters.refresh.doLoad();
}
Reuters.utils.addLoadEvent(Reuters.refresh.doLoad);