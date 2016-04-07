function rcom_scrollTracker(inp_contentType) {

  var previousScrollTop = 0;
  var previousEvent = 0;
  var contentType = inp_contentType;

  function wtMultiTracking(e) {
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var runwayHeight = docHeight - winHeight;
    var scrollHeight = $(this).scrollTop();
    var eventFired = 0;

  if( previousScrollTop >= 0 && runwayHeight > 0 ) {
    var pct = scrollHeight/runwayHeight;
    /* console.log("===> scroll percentage = "+ pct +" docHeight="+docHeight+" winHeight="+winHeight+" scrollHeight="+scrollHeight+" runwayHeigh="+runwayHeight+" previousScrollTop="+previousScrollTop+" previousEvent="+previousEvent); */
    if (scrollHeight > previousScrollTop) {
      if( pct >= 0.25 ) {
        if( pct >= 0.5 ) {
          if( pct >= 0.75 ) {
            if( pct >= 0.98 ) {
              if( previousEvent != 100 ) {
                previousEvent = 100;
                eventFired = 1;
              }
            } else {
              if( previousEvent != 75 ) {
                previousEvent = 75;
                eventFired = 1;
              }
            }
          } else {
            if( previousEvent != 50 ) {
              previousEvent = 50;
              eventFired = 1;
            }
          }
        } else {
          if( previousEvent != 25 ) {
            previousEvent = 25;
            eventFired = 1;
          }
        }
      }
    } 
  }
  previousScrollTop = scrollHeight;

	var wt_msg = previousEvent + " percent scroll | " + contentType;
  var metricVar = 'pageScrollDown'+ previousEvent + 'Percent';
	if( eventFired > 0 ) {
  	dcsMultiTrack(
     	"WT.z_event", wt_msg, 
     	"WT.dl", "33"
 		);
    dataLayer.push({
      'analyticsAttributes': ''
    });
    dataLayer.push({
      'event': 'GA_event',
      'category': 'Scroll Down',
      'action': previousEvent + '%',
      'analyticsAttributes': {
        [metricVar]: '1',
      }
    });
		}
  }
	return  wtMultiTracking;
}

function inAppleMobileDevice() {
  if (navigator && navigator.userAgent && navigator.userAgent != null) {
    var userAgent = navigator.userAgent.toLowerCase();
    var match_arr= userAgent.match(/(iphone|ipod|ipad)/);
    if (match_arr!= null) {
      return true;
    }
  }
  return false;
}
