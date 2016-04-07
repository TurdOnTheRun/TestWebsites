
/**
 * PageVideosModel manages all the VideoInfo objects that are available on page load.
 */

var PageVideosModel = function(json) {
	var $ = jQuery;
	var videoList = json;

	// a mapping of videoInfo objects by key
	var videoMap = {};


	// a mapping of videoInfo objects by referenceId.
	// Each video will have two keys, one for ipad and one for desktop.
	var releaseMap = {};


	if (videoList) {
		addItems(videoList);
	}

	/**
	 * Returns the VideoInfo object with the specified id.
	 * @param  {String} videoId
	 * @return {VideoInfo}
	 */
	function getById(videoId) {
		return videoMap[videoId];
	}

	/**
	 * Returns the VideoInfo object with the specified mpx ipad or flv release id.
	 * @param  {String} releaseId 	the video's release id in mpx.
	 * @return {VideoInfo}         
	 */
	function getByReleaseId(releaseId) {
		return releaseMap[releaseId];
	}

	/**
	 * Adds a new VideoInfo item
	 * @param {Object} videoInfo
	 */
	function addItem(videoInfo){
		videoMap[videoInfo.guid] = videoInfo;
		releaseMap[videoInfo.ipadReleaseId] = videoInfo;
		releaseMap[videoInfo.flvReleaseId] = videoInfo;
	}

	function addItems(videos){
		var videoInfo;
				
		$.each(videos, function(index, videoInfo) {
			addItem(videoInfo);
		});
	}


	return {
		getById: getById,
		getByReleaseId: getByReleaseId,
		addItem:addItem,
		addItems:addItems
	};


}