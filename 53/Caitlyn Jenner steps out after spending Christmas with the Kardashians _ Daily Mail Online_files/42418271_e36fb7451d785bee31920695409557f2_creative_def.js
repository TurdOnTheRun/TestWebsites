(function() {
  var creativeDefinition = {
    customScriptUrl: '',
    isDynamic: false,
    delayedImpression: true,
    standardEventIds: {
      DISPLAY_TIMER: '72',
      INTERACTION_TIMER: '73',
      INTERACTIVE_IMPRESSION: '74',
      MANUAL_CLOSE: '75',
      BACKUP_IMAGE_IMPRESSION: '76',
      EXPAND_TIMER: '77',
      FULL_SCREEN: '78',
      VIDEO_PLAY: '79',
      VIDEO_VIEW_TIMER: '80',
      VIDEO_COMPLETE: '81',
      VIDEO_INTERACTION: '82',
      VIDEO_PAUSE: '83',
      VIDEO_MUTE: '84',
      VIDEO_REPLAY: '85',
      VIDEO_MIDPOINT: '86',
      VIDEO_STOP: '87',
      VIDEO_UNMUTE: '88',
      DYNAMIC_CREATIVE_IMPRESSION: '',
      HTML5_CREATIVE_IMPRESSION: ''
    },
    exitEvents: [
      {
        name: 'Default Exit',
        reportingId: '20833232',
        url: '',
        targetWindow: '_blank',
        windowProperties: ''
      },
      {
        name: 'Skin Exit',
        reportingId: '20832992',
        url: 'https://ad.doubleclick.net/ddm/trackclk/N7252.140337.MAILONLINE/B9531572.130192926;dc_trk_aid\x3d302472764;dc_trk_cid\x3d65637025;dc_lat\x3d;dc_rdid\x3d;tag_for_child_directed_treatment\x3d',
        targetWindow: '_blank',
        windowProperties: ''
      }
    ],
    timerEvents: [
    ],
    counterEvents: [
    ],
    childFiles: [
      {
        name: 'backup.jpg',
        url: '/ads/richmedia/studio/pv2/42418269/20160406130723621/backup.jpg',
        isVideo: false,
        transcodeInformation: null
      }
    ],
    videoFiles: [
    ],
    videoEntries: [
    ],
    primaryAssets: [
      {
        id: '31376484',
        artworkType: 'FLASH',
        displayType: 'FLOATING',
        width: '1',
        height: '1',
        servingPath: '/ads/richmedia/studio/pv2/42418269/20160406130723621/1x1.swf',
        zIndex: '1000000',
        customCss: '',
        flashArtworkTypeData: {
          actionscriptVersion: '2',
          wmode: 'transparent',
          sdkVersion: '2.3.1',
          flashBackgroundColor: '',
          allowScriptAccess: 'always'
        },
        htmlArtworkTypeData: null,
        floatingDisplayTypeData: {
          position: {
            top: 0,
            left: 0,
            topUnit: 'px',
            leftUnit: 'px',
            lockVerticalScroll: false,
            lockHorizontalScroll: false
          },
          hasStartTime: true,
          startTime: 0,
          hasEndTime: false,
          hasAutoEnd: false,
          endTime: -1,
          closeOnMouseout: false,
          alignment: ''
        },
        expandingDisplayTypeData: null,
        imageGalleryTypeData: null,
        pageSettings:{
          hideDropdowns: false,
          hideIframes: false,
          hideObjects: false,
          updateZIndex: true
        },
layoutsConfig: null,
layoutsApi: null
      }
    ]
  }
  var rendererDisplayType = '';
  rendererDisplayType += 'flash_';
  var rendererFormat = 'floating';
  var rendererName = rendererDisplayType + rendererFormat;

  var creativeId = '87806081792';
  var adId = '0';
  var templateVersion = '200_127';
  var studioObjects = window['studioV2'] = window['studioV2'] || {};
  var creativeObjects = studioObjects['creatives'] = studioObjects['creatives'] || {};
  var creativeKey = [creativeId, adId].join('_');
  var creative = creativeObjects[creativeKey] = creativeObjects[creativeKey] || {};
  creative['creativeDefinition'] = creativeDefinition;
  var adResponses = creative['adResponses'] || [];
  for (var i = 0; i < adResponses.length; i++) {
    adResponses[i].creativeDto && adResponses[i].creativeDto.csiEvents &&
        (adResponses[i].creativeDto.csiEvents['pe'] =
            adResponses[i].creativeDto.csiEvents['pe'] || (+new Date));
  }
  var loadedLibraries = studioObjects['loadedLibraries'] = studioObjects['loadedLibraries'] || {};
  var versionedLibrary = loadedLibraries[templateVersion] = loadedLibraries[templateVersion] || {};
  var typedLibrary = versionedLibrary[rendererName] = versionedLibrary[rendererName] || {};
  if (typedLibrary['bootstrap']) {
    typedLibrary.bootstrap();
  }
})();
