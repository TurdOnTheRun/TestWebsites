/**
 * Krux pixel tracking for video players.
 * Only used on ca.eonline.com.
 * 
 * @param  {String}  scope  The video scope (instance id) to listen for events on.
 */
var KruxVideoTracker = function(scope) {
	console.log('new KruxTracker()');

	
	$pdk.controller.addEventListener("OnReleaseStart", function(playlist){
		console.debug("KRUX -- OnReleaseStart...");
		var releasePID = playlist.data.releasePID;
		var videoInfo = evideo.pageVideosModel.getByReleaseId(releasePID);

		var episodeName = encodeURIComponent(videoInfo.title);
		var episodeNumber = videoInfo.episodeNumber;
		var seasonNumber = videoInfo.season;
		var seriesName = encodeURIComponent(videoInfo.seriesTitle);

		var imgSrc = 'http://beacon.krxd.net/event.gif?event_id=I-QyPg30&event_type=vvid'+
						'&episode_name='+episodeName+'&episode_number='+episodeNumber+'&season_number='+seasonNumber+'&series_name='+seriesName+'&site=EOnline';
 

		var img = new Image();
		var rnd = Math.round(Math.random()*100000);
		img.src = imgSrc + '&random' + rnd + '=' + rnd;
		
		img.loaded = function() {
			img = null;
		}


	}, [scope]);


}