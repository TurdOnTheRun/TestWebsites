_satellite.pushBlockingScript(function(event, target, $variables){
  if (!window.Array) {
	window.Array = {};
}
if (!window.Array.isArray) {
	window.Array.isArray = function(someVar) {
		return (Object.prototype.toString.call(someVar) === '[object Array]') ? true : false;
	};
}

window.pageDataTracker = (function() {
	
	function trackPageLoad() {
		
	}
	
	function trackEvent(event, data) {
		
		
		//_satellite.track(event);
	}
	
	return {
		trackPageLoad			: trackPageLoad
		,trackEvent				: trackEvent
	};
})();
});
