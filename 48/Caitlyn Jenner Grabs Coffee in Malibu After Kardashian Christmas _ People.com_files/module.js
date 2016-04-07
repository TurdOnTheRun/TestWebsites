//document.domain = 'people.com';

if ( document.location.href.indexOf('people.com') > 0 ) {
    document.domain = 'people.com';
} else if ( document.location.href.indexOf('peoplestylewatch.com') > 0 ) {
    document.domain = 'peoplestylewatch.com';
}
else if ( document.location.href.indexOf('peoplepets.com') > 0 ) {
    document.domain = 'peoplepets.com';
}

var PVplayers = [];	// array to hold players


function PVonTemplateLoad(id) {
	var wrapperID = id.split('myExperience'),	// id = "myExperienceXXXXXX"
		wrapperDIV = '#video-';

	wrapperID = wrapperID[1];
	wrapperDIV = wrapperDIV + wrapperID;
	
	var videoID = $(wrapperDIV).attr('data-video-id'),
		brightcoveID = $(wrapperDIV).attr('data-brightcove-id');

	// Append PLAY icon when video is ready
	$(wrapperDIV +' .overlay-image .icon-play').show();
	$(wrapperDIV +' .overlay-image').css('cursor','pointer');

	// has Playlist
	if (videoID.length) {
		$(wrapperDIV).addClass('firstload');
		PVgetPlaylistInfo(wrapperID,videoID);
	} // end: has Playlist
			
	// Add each player's id to the PVplayers array
	PVplayers.push(id);

	omni_onTemplateLoad(id);
} // end: PVonTemplateLoad


function PVonMediaBegin(evt) {

	var id = evt.target.experience.id,	// id = "myExperienceXXXXXX"
		refID = evt.media.referenceId,
		wrapperID = id.split('myExperience'),
		wrapperDIV = '#video-',
		wrapperVideoID,
		wrapperBrightcoveID,
		playlistArray;
	
	wrapperID = wrapperID[1];
	wrapperDIV = wrapperDIV + wrapperID;
	wrapperVideoID = $(wrapperDIV).attr('data-video-id');
	wrapperBrightcoveID = $(wrapperDIV).attr('data-brightcove-id');
	
	//if ( ((typeof wrapperVideoID !== 'undefined') || (wrapperVideoID !== '')) && (wrapperBrightcoveID === '') ) {
	if (wrapperVideoID.length) {
		PVgetPlaylistInfo(wrapperID,refID);
	} else {
		// no playlist
		return;
	}
} // end: PVonMediaBegin
    

function PVonTemplateReady(evt) {

	var PVplayer = brightcove.api.getExperience(evt.target.experience.id);
	var PVvideoPlayer = PVplayer.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);

	PVvideoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, function(evt) {PVonMediaBegin(evt);});		
	PVvideoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, function(evt) {PVonPlay(evt);});
	PVvideoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, function(evt) {PVonMediaComplete(evt);});
	
	var id = evt.target.experience.id,	// id = "myExperienceXXXXXX"
		wrapperID = id.split('myExperience'),
		wrapperDIV = '#video-',
		wrapperAutoPlay;

	wrapperID = wrapperID[1];
	wrapperDIV = wrapperDIV + wrapperID;	// wrapperDIV = "#video-XXXXXX"
	wrapperAutoPlay = $(wrapperDIV).attr('data-auto-play');	// yes or no?
	
	// bind click on videos with photo overlay
	$(wrapperDIV +' .overlay-image').on('click',function(){
		$(wrapperDIV +' .overlay-wrapper').remove();
		$(wrapperDIV +' .video-placeholder').removeClass('has-overlay');
		$(wrapperDIV +' .video-share').show();
		$(wrapperDIV).css({
			'width':'auto',
			'margin-right':'0',
			'float':'none'
		});
		
		PVvideoPlayer.play();
	});

	// for videos with no photo, check for autoplay comman
	if ( (typeof wrapperAutoPlay == 'undefined') || (wrapperAutoPlay == '') ) {
		wrapperAutoPlay = 'no';
	}
	if ( (wrapperAutoPlay == 'yes') || (wrapperAutoPlay == 'auto') || (wrapperAutoPlay == 'y') ){
		PVvideoPlayer.play();
	}
	

	omni_onTemplateReady(evt);
}// end: PVonTemplateReady
	

function PVonPlay(evt) {
	var id = evt.target.experience.id;	// id = "myExperienceXXXXXX"

	// Loop through the PVplayers array, and stop the others
	for (var i = 0; i < PVplayers.length; i++) {
		if (PVplayers[i] != id) {
			var PVplayer = brightcove.api.getExperience(PVplayers[i]);
			var PVvideoPlayer = PVplayer.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER); 
			PVvideoPlayer.pause(true);
		}
	}
} // end: PVonPlay


function PVonMediaComplete(evt) {

	var id = evt.target.experience.id,	// id = "myExperienceXXXXXX"
		refID, nextID, brightcoveID, videoID,
		jsonURL, playlistArray, 
		hostname = location.hostname,
		videoType,
		wrapperID = id.split('myExperience'),
		wrapperDIV = '#video-';

	wrapperID = wrapperID[1];
	wrapperDIV = wrapperDIV + wrapperID;
	brightcoveID = $(wrapperDIV).attr('data-brightcove-id');
	videoID = $(wrapperDIV).attr('data-video-id');
	videoType = $(wrapperDIV).attr('data-video-type');
	
	if ( videoID.length ) {
		// has playlist
		refID = evt.media.referenceId;
		
		if ( !(hostname.match('people.com')) ){
			hostname = 'www.people.com';
		}
		jsonURL = 'http://'+hostname+'/people/videos/list/json/0,,'+videoID+',00.json';
	
		var PVplayer = brightcove.api.getExperience(evt.target.experience.id);
		var PVvideoPlayer = PVplayer.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
		
		// get next video in playlist
		$.getJSON(jsonURL,function(data){
			playlistArray = data;
	
			for (var i = 0; i < playlistArray.length; i++) {
				if (playlistArray[i].videoID == refID) {
					if (i == (playlistArray.length-1) ){
						// if last video in playlist, go back to first one
						nextID = playlistArray[0].videoID;
					}
					else {
						// next video in playlist
						nextID = playlistArray[i+1].videoID;
					}
				} // end if
			} // end for
			
			PVvideoPlayer.loadVideoByReferenceID(nextID);
		}); // end: getJSON
	
	}
	else {
		// no playlist
		if ( !(videoID.length) &&  videoType == 'article') {
			if ( !(hostname.match('people.com')) ){
				hostname = 'www.people.com';
			}
			jsonURL = 'http://'+hostname+'/people/static/includes/video/video-playlist.json';
			var PVplayer = brightcove.api.getExperience(evt.target.experience.id);
			var PVvideoPlayer = PVplayer.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
			// get next video in playlist
			$.getJSON(jsonURL,function(data){
				playlistArray = data;
				if (brightcoveID == evt.media.id) {
					nextID = playlistArray[0].brighcoveID;	
				} else {
					for (var i = 0; i < playlistArray.length; i++) {
						if (playlistArray[i].brighcoveID == evt.media.id) {
							if (i == (playlistArray.length-1) ){
								// if last video in playlist, go back to first one
								nextID = playlistArray[0].brighcoveID;
							}
							else {
								// next video in playlist
								nextID = playlistArray[i+1].brighcoveID;
							}
						} // end if
					} // end for
				}
				PVvideoPlayer.loadVideoByID(nextID);
			}); // end: getJSON
		} else {
			return;	
		}
		//return;
	}
} // end: PVonMediaComplete


function PVgetPlaylistInfo(wrapperID, refID) {
	
	var wrapperDIV = '#video-'+wrapperID,
		hostname = location.hostname,
		jsonURL, playlistArray, isFirstLoad = false,
		videoType = $(wrapperDIV).attr('data-video-type'),
		toutURL, toutTitle, toutDate, toutDesc, toutChannel, toutDuration,
		shareText, shareURL, fbLink, twitterLink, emailLink;

	if ( !(hostname.match('people.com')) ){
		hostname = 'www.people.com';
	}
	jsonURL = 'http://'+hostname+'/people/videos/list/json/0,,'+wrapperID+',00.json';

	if ( $(wrapperDIV).hasClass('firstload') ) {
		isFirstLoad = true;
	}

	$.getJSON(jsonURL,function(data){
		playlistArray = data;

		for (var i = 0; i < playlistArray.length; i++) {
			if (playlistArray[i].videoID == refID) {
				toutURL = playlistArray[i].canonical;
				toutTitle = playlistArray[i].title;
				toutDate = playlistArray[i].pubdate;
				toutDesc = playlistArray[i].description;
			} // end if
		} // end for
		
		// Update Tout
		if (!isFirstLoad) {
			$(wrapperDIV + ' .playlist-meta a').attr('href',toutURL);
			$(wrapperDIV + ' .playlist-meta .pub-date').html(toutDate);
			$(wrapperDIV + ' .playlist-meta h4 a').html(toutTitle);
			$(wrapperDIV + ' .playlist-meta .desc').html(toutDesc);
		}
		

		// Update share buttons
		shareURL = toutURL;
		shareText = PVhtmlDecode(toutTitle);
		shareText = encodeURIComponent(shareText);
		fbLink = 'http://www.facebook.com/share.php?u=' + shareURL;
		twitterLink = 'http://twitter.com/share?url=' + shareURL + '&text=' + shareText;
		emailLink = 'http://cgi.pathfinder.com/cgi-bin/mail/mailurl2friend.cgi?path=/people/emailfriend&group=people&url=' + shareURL + '&title=' + shareText;
	
		$(wrapperDIV + ' .video-share .facebook a').attr('href',fbLink);
		$(wrapperDIV + ' .video-share .twitter a').attr('href',twitterLink);
		$(wrapperDIV + ' .video-share .email a').attr('href',emailLink);
		
		$(wrapperDIV).removeClass('firstload');
	}); // end getJSON

} // end: PVgetPlaylistInfo


function PVwritePlayer(wrapperID){
	
	var wrapperDIV = '#'+wrapperID,	// wrapperDIV = "#video-XXXXXX"
		videoID = $(wrapperDIV).attr('data-video-id'),
		brightcoveID = $(wrapperDIV).attr('data-brightcove-id'),
		playerType = $(wrapperDIV).attr('data-video-type'),
		objectID,
		paramWidth,
		paramHeight,
		paramPlayerID = '3476534560001',										// default to Chromeless Player
		paramPlayerKey = 'AQ~~,AAAAABjSC6Q~,pGevSATpV8E-Iy5Qd4HGKkonZVLcEf1Y',	// default to Chromeless Player
		paramVideoPlayer,
		paramAdServerURL, // override the ad server URL set in the Brightcove admin
		paramAdZone,
		paramAdChannel = $(wrapperDIV).attr('data-ad-channel'),
		playerCode;

	if (videoID.length) {
		objectID = videoID;
		paramVideoPlayer = 'ref:'+videoID;
	}
	else {
		objectID = brightcoveID;
		paramVideoPlayer = brightcoveID;
	}

	switch(playerType){
		case 'homepage':
			paramWidth = '858';
			paramHeight = '483';
			paramAdZone = 'homepage_bc';
		break;
			
		case 'article':
			paramWidth = '600';
			paramHeight = '338';
			paramAdZone = 'newsembed_bc';
		break;

		case 'stylewatch-main':
			paramWidth = '296';
			paramHeight = '222'; // for 16x9: use 167
			paramAdZone = 'channelmain_bc';
		break;

		case 'redcarpet-main':
			paramWidth = '600';
			paramHeight = '338';
			paramAdZone = 'rc_bc';
		break;

		case 'celeb-db':
			paramWidth = '650';
			paramHeight = '366';
			paramAdZone = 'celebcentral_bc';
		break;

		case 'great-ideas':
			paramWidth = '308';
			paramHeight = '173';
			paramAdZone = 'greatideas_bc';
		break;
		
		case 'gallery':
			paramWidth = '308';
			paramHeight = '173';
			paramAdZone = 'gallery_bc';
		break;
		
		default:
			// 16x9
			paramWidth = '600';
			paramHeight = '338';
			paramAdZone = 'videobacked_bc';
		
	} // end: switch
	
	if (paramAdZone == '') {
		paramAdZone = 'videobacked_bc';
	}
	$(wrapperDIV).attr('data-ad-zone',paramAdZone);

	// set placeholder value for Brightcove (not V6) videos
	if ( (typeof paramAdChannel == 'undefined') || (paramAdChannel == '') ) {
		paramAdChannel = 'brightcove';
		$(wrapperDIV).attr('data-ad-channel',paramAdChannel);
	}
	
	// people NOW hack
	if (	(paramAdChannel == 'peoplenow') || (paramAdChannel == 'PeopleNOW') ||
			(paramAdChannel == 'sharethisnow') || (paramAdChannel == 'ShareThisNOW') ||
			(paramAdChannel == 'peoplenownews') || (paramAdChannel == 'PeopleNOWNews') ||
			(paramAdChannel == 'peoplenowupclose') || (paramAdChannel == 'PeopleNOWUpclose') ||
			(paramAdChannel == 'fullepisodes') || (paramAdChannel == 'FullEpisodes') ||
			(paramAdChannel == 'peopleliving') || (paramAdChannel == 'PEOPLELiving') ||
			(paramAdChannel == 'startracks') || (paramAdChannel == 'StarTracks') ||
			(paramAdChannel == 'hackshowtos') || (paramAdChannel == 'HacksHowTos') ||
			(paramAdChannel == 'peoplepicks') || (paramAdChannel == 'PeoplePicks') || (paramAdChannel == 'PEOPLEPicks')
	) {
		paramAdChannel = 'peoplenow' + paramAdChannel.toLowerCase();
	}

	paramAdServerURL = 'http://pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=vast&iu=/8484/peo/video_bc/' + paramAdZone + '&sz=1000x1&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]';
	
	playerCode	= '<object id="myExperience'+objectID+'" class="BrightcoveExperience">'
				+	'<param name="bgcolor" value="#FFFFFF" />'
				+	'<param name="wmode" value="transparent" />'
				+	'<param name="width" value="'+paramWidth+'" />'
				+	'<param name="height" value="'+paramHeight+'" />'
				+	'<param name="playerID" value="'+paramPlayerID+'" />'
				+	'<param name="playerKey" value="'+paramPlayerKey+'" />'
				+	'<param name="isVid" value="true" />'
				+	'<param name="isUI" value="true" />'
				+	'<param name="dynamicStreaming" value="true" />'
				+	'<param name="@videoPlayer" value="'+paramVideoPlayer+'" />'
				+	'<param name="includeAPI" value="true" />'
				+	'<param name="adServerURL" value="'+paramAdServerURL+'" />'
				+	'<param name="additionalAdTargetingParams" value=";chann=' + paramAdChannel + '" />'
				+	'<param name="templateLoadHandler" value="PVonTemplateLoad" />'
				+	'<param name="templateReadyHandler" value="PVonTemplateReady" />'
				+ '</object>';
	
	
	$(wrapperDIV).find('.video-placeholder').html(playerCode);
	brightcove.createExperiences();
} // end: PVwritePlayer


function PVemailPopUp(u){
	var width = 800,
		height = 600,
		top=(screen.height/2)-height/2,
		left=(screen.width/2)-width/2,
		features = 'top='+top+',left='+left+',width='+width+',height='+height+'scrollbars=yes,toolbar=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes';
	window.open(u,'email',features);
} // end: PVemailPopUp

function PVfacebookPopUp(u){
	omniTrackEv('fb-share');
	var width = 800,
		height = 600,
		top=(screen.height/2)-height/2,
		left=(screen.width/2)-width/2,
		features = 'top='+top+',left='+left+',width='+width+',height='+height+'scrollbars=yes,toolbar=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes';
	window.open(u,'facebook',features);
} // end: PVfacebookPopUp

function PVhtmlEncode(value){
  return $('<div/>').text(value).html();
} // end: PVhtmlEncode

function PVhtmlDecode(value){
  return $('<div/>').html(value).text();
} // end: PVhtmlDecode

function PVbindOverlayShare(wrapperID){
	var wrapperDIV = '#'+wrapperID,	// wrapperDIV = "#video-XXXXXX"
		shareDIV = wrapperDIV + ' .overlay-share',
		fbButton = shareDIV + ' .social .facebook a',
		pinButton = shareDIV + ' .social .pinterest a',
		twitterButton = shareDIV + ' .social .twitter a';

	/* For Overlay Share (if dynamically writing share buttons in):

	var shareURL = $(wrapperDIV).attr('data-share-url'),
		shareText = $(wrapperDIV).attr('data-share-text'),
		shareCode,
		pinImage = $(wrapperDIV + ' .overlay-image').find('img').attr('src'),
		imgWidth = $(wrapperDIV + ' .overlay-image img').width(),
		imgHeight = $(wrapperDIV + ' .overlay-image img').height(),
		fbLink, pinLink, twitterLink;
	
	$(wrapperDIV).addClass('video'+imgWidth+'x'+imgHeight);
	
	shareText = PVhtmlDecode(shareText);
	shareText = encodeURIComponent(shareText);

	fbLink = 'http://www.facebook.com/share.php?u=' + shareURL;
	pinLink = '//www.pinterest.com/pin/create/button/?url=' + shareURL + '&media='+ pinImage +'&description=' + shareText;
	twitterLink = 'http://twitter.com/share?url=' + shareURL + '&text=' + shareText;

	shareCode = '<ul class="social">'
			+		'<li class="facebook"><a target="_blank" href="'+fbLink+'">Facebook</a></li>'
			+		'<li class="twitter"><a target="_blank" href="'+twitterLink+'">Twitter</a></li>'
			+		'<li class="pinterest"><a target="_blank" href="'+pinLink+'">Pinterest</a></li>'
			+	'</ul>'
			+	'<div class="clear"></div>';
	$(shareDIV).html(shareCode);
	*/
	
	$(fbButton).bind('click', function(){
		PVfacebookPopUp($(this).attr('href'));
		return false;
	});
	
	$(pinButton).bind('click',PEOPLE.pinterestPopup);
	$(pinButton).click(function() {
		PEOPLE.Omniture.recordPinterestPin();
		return false;
	});
	
	$(twitterButton).bind('click', PEOPLE.twitterPopup);

} // end: PVbindOverlayShare


function PVbindVideoShare(wrapperID){
	
	var wrapperDIV = '#'+wrapperID,	// wrapperDIV = "#video-XXXXXX"
		hasOverlay = $(wrapperDIV).find('.overlay-wrapper').length,
		shareDIV = wrapperDIV + ' .video-share',
		shareURL = $(wrapperDIV).attr('data-share-url'),
		shareText = $(wrapperDIV).attr('data-share-text'),
		shareCode,
		emailButton = shareDIV + ' .social .email a',
		fbButton = shareDIV + ' .social .facebook a',
		twitterButton = shareDIV + ' .social .twitter a',
		emailLink, fbLink, twitterLink;


	shareText = PVhtmlDecode(shareText);
	shareText = encodeURIComponent(shareText);

	fbLink = 'http://www.facebook.com/share.php?u=' + shareURL;
	twitterLink = 'http://twitter.com/share?url=' + shareURL + '&text=' + shareText;
	emailLink = 'http://cgi.pathfinder.com/cgi-bin/mail/mailurl2friend.cgi?path=/people/emailfriend&group=people&url=' + shareURL + '&title=' + shareText;

	shareCode = '<ul class="social">'
			+		'<li class="facebook"><a target="_blank" href="'+fbLink+'">Facebook</a></li>'
			+		'<li class="twitter"><a target="_blank" href="'+twitterLink+'">Twitter</a></li>'
			+		'<li class="email"><a target="_blank" href="'+emailLink+'">Email</a></li>'
			+	'</ul>'
			+	'<div class="clear"></div>';
  // $(shareDIV).html(shareCode);
	

	if (hasOverlay) {
		$(shareDIV).hide();
	}
	
	$(fbButton).bind('click', function(){
		PVfacebookPopUp($(this).attr('href'));
		return false;
	});
	
	$(twitterButton).bind('click', PEOPLE.twitterPopup );

	$(emailButton).bind('click', function(){
		PVemailPopUp($(this).attr('href'));
		return false;
	});

} // end: PVbindVideoShare


function PVinitVideo(){
	
	//document.domain = 'people.com';
			
	$('.video-module').each(function(){
		var wrapperID = $(this).attr('id'),
			hasOverlay = $(this).find('.overlay-wrapper').length,
			isTablet = false,
			videoType = $(this).attr('data-video-type');
	
		
		if ( navigator.userAgent.match('iPad') || navigator.userAgent.match('Android') || navigator.userAgent.match('Silk') ) {
			isTablet = true;
		};

		// set V6 videos in Article Body to have video-type set to "article" and not "video"
		if ( (videoType == 'video') && $('#articleBody').length ){
			videoType = 'article';
			$(this).attr('data-video-type',videoType);
		}

		if ( $('body#home').hasClass('styleWatch') ){
			videoType = 'stylewatch-main';
			$(this).attr('data-video-type',videoType);
		}

		if ($('body#database').length){
			videoType = 'celeb-db';
			$(this).attr('data-video-type',videoType);
			$('#video').addClass('video-new');
		}

		if (hasOverlay){
			$(this).find('.video-placeholder').addClass('has-overlay');
		}

		PVwritePlayer(wrapperID);
		
		if (isTablet){
			$(this).find('.overlay-wrapper').remove();
			$(this).find('.video-placeholder').removeClass('has-overlay');
		}
		
		if (hasOverlay && !isTablet){
			var overlayWidth = $(this).find('.overlay-image img').width(),
				showShare = $(this).attr('data-show-share');


			// for styling purposes in articles
			$(this).addClass('overlay-'+overlayWidth);

			// set custom play icon (on articles)
			if (overlayWidth <= 300){
				$(this).find('.overlay-image .icon-play').addClass('hide-text');
			}
			
			PVbindOverlayShare(wrapperID);
			if (showShare === '0') {
				$(this).find('.overlay-share').hide();
			}
			
		} // end: hasOverlay
		
		PVbindVideoShare(wrapperID);
		
	}); // .video-module

} // end: PVinitVideo



$(document).ready(function(){
	PVinitVideo();
});