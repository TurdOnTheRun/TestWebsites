var frameUrl=window.location.href,now,container,client,bdateInUTCMilliSeconds,uid,id=frameUrl.substring(frameUrl.indexOf("id=")+3,frameUrl.indexOf("___pv")),pageViews=parseInt(frameUrl.substr(frameUrl.indexOf("pv=")+3)),zeus_ga,zeusBaseUrl,embedCode="",DebugMode={on:!1,dcOverride:null,noPreroll:!1,noMidroll:!1,noPostroll:!1,noOverlay:!1,noFlash:!1},View,ContentPlayer,BoltAdManager,RelatedVideos,Playlist,CurrentPlaylistIndex,PlayerSettings,CurrentVideoConfig,MobileIMAPlayer,GoogleTrueViewPlayCount=0,AmazonBidObjectAvailable=!1,AdBlockDetected,Skin,site={},postLogMessage=function(e,n){try{var i=n||"info",r={type:"zeus_event",name:"log",id:window.id,data:{level:i.toLowerCase(),text:e}};window.parent.postMessage(JSON.stringify(r),"*")}catch(s){}},MessageChannel={requestChannels:{},sendResponse:function(e,n){var i={id:window.id,channel:e,type:"response",value:n};window.parent.postMessage(JSON.stringify(i),"*")},sendRequest:function(e,n){var i=Date.now();this.requestChannels[i]={callback:n};var r={id:window.id,channel:i,type:"request",property:e};window.parent.postMessage(JSON.stringify(r),"*")}},receiveMessage=function(e){if(!("string"==typeof e.data&&e.data.indexOf("ima://")>-1))try{var n=JSON.parse(e.data);if(n.id!=window.id)return;if(DebugMode.on&&console.log("receiveMessage",n),n.uid)uid=n.uid;else if(n.adBlockDetected)AdBlockDetected=n.adBlockDetected;else if(n.embedCode)embedCode=n.embedCode;else if(n.config)PlayerSettings=n.config.settings,CurrentVideoConfig=n.config.video,n.config.playlist&&(Playlist=JSON.parse(JSON.stringify(n.config.playlist)),CurrentPlaylistIndex=0,DebugMode.on&&console.log("Playlist",Playlist));else if(n.baseUrl)zeusBaseUrl=n.baseUrl;else if(n.renderPlayer)if(PlayerSettings.theme){var i=document.createElement("script");i.src=PlayerSettings.theme,i.onload=function(){var e=window.themeConfig.libs;if(e)for(var n=0;n<e.length;n++){var i=e[n];if("string"==typeof i){var r=document.createElement("script");r.src=i,document.head.appendChild(r)}else window.addons=window.addons||{},window.addons[i.id]=i.url}PlayerSettings.skin=window.themeConfig.skinUrl,PlayerSettings.css=window.themeConfig.cssUrl,_boot()},document.head.appendChild(i)}else _boot();else if(n.debugMode===!0)console.log("receiveMessage",n),DebugMode.on=!0,DebugMode.dcOverride=n.dcTimeoutOverride,DebugMode.noPreroll=n.noPreroll||!1,DebugMode.noMidroll=n.noMidroll||!1,DebugMode.noPostroll=n.noPostroll||!1,DebugMode.noOverlay=n.noOverlay||!1,DebugMode.noFlash=n.noFlash||!1,DebugMode.noPreroll&&console.warn("Preroll disabled (debug)"),DebugMode.noMidroll&&console.warn("Midroll disabled (debug)"),DebugMode.noPostroll&&console.warn("Postroll disabled (debug)"),DebugMode.noOverlay&&console.warn("Overlay disabled (debug)"),DebugMode.noFlash&&console.warn("Flash dismissed (debug)");else if(n.now)now=n.now;else if(n.site)site=n.site,DebugMode.on&&console.log("site",site);else if(n.zeus_ga)zeus_ga=n.zeus_ga;else if(n.client)client=n.client;else if(n.ageGate)bdateInUTCMilliSeconds=parseInt(n.ageGate);else if(n.supportedVideoTypes)client.supportedVideoTypes=n.supportedVideoTypes;else if(n.command&&Zeus)switch(n.command){case"play":Zeus.playMedia();break;case"pause":Zeus.pauseMedia();break;case"replay":Zeus.replayMedia();break;case"stop":Zeus.stopMedia();break;case"mute":Zeus.muteMedia();break;case"unmute":Zeus.unmuteMedia();break;case"setVolume":Zeus.setVolume(n.value);break;case"seek":Zeus.seek(n.seconds);break;case"invalidateView":View&&View.invalidate(n);break;case"enterFullscreen":enterFullscreen();break;case"exitFullscreen":exitFullscreen();break;case"getAppearanceSettings":View&&View.getAppearanceSettings()}else if(n.customizer)View?View.invalidate(n):console.error("View is not definded");else if(n.hasOwnProperty("fixedControlbar"))View&&(View.fixedControlbar=n.fixedControlbar,View.fixedScrubber=n.fixedControlbar,View.fixedTitlebar=n.fixedTitlebar,View.invalidate());else if(n.hasOwnProperty("channel")){var r;if("request"===n.type){switch(n.property){case"currentTime":r=View.currentPlayer?View.currentPlayer.currentTime:null;break;case"volume":r=View.currentPlayer?View.currentPlayer.volume:null;break;case"currentContent":View.currentPlayer&&(r=function(){return View.currentPlayer.isAd()?{type:"advertisement",currentTime:View.currentPlayer.currentTime}:View.currentPlayer.getSource()?{type:"video",source:View.currentPlayer.getSource(),currentTime:View.currentPlayer.currentTime}:null}())}MessageChannel.sendResponse(n.channel,r)}else{r=n.value;var s=n.channel,a=MessageChannel.requestChannels[s];DebugMode.on&&console.log("Received a response from parent","channel",s,"value",r),a&&(a.callback.call(null,r),delete MessageChannel.requestChannels[s])}}else n.amazonBidObjectAvailable&&(AmazonBidObjectAvailable=!0)}catch(l){DebugMode.on}},_boot=function(){window.readyCallback=function(){ZeusUtils.timeLog("player ready in",now),LOG.info("video settings",CurrentVideoConfig.settings," player settings",PlayerSettings),"off"===window.PlayerSettings.advertising&&(CurrentVideoConfig.advertising.on=!1,LOG.warn("Advertising is disabled via embed setting"),postLogMessage("Advertising is disabled via embed setting","warn"));var e=document.getElementsByClassName("bolt-container")[0];e.style.visibility="visible";var n={type:"zeus_event",name:"ready",id:id};window.parent.postMessage(JSON.stringify(n),"*")};var e=setInterval(function(){if(window.Zeus){clearInterval(e);var n=window.Zeus;n.renderPlayer()}},100),n=document.createElement("script");n.src="zeus_iframe-3048463756.js",document.head.appendChild(n)};window.addEventListener("message",receiveMessage,!1);var enterFullscreen=function(){window.fullscreenEnabled&&screenfull.request(document.body)},exitFullscreen=function(){window.fullscreenEnabled&&screenfull.exit()};