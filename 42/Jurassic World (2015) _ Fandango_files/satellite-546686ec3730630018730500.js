var _satListener = function(){
  if(_satellite.settings.notifications == true){
    //console.log('message listener', arguments);
  }
}

if(_satellite.configurationSettings.settings.isStaging == true){
  if (window.addEventListener){
    addEventListener("message", _satListener, false)
  } else {
    attachEvent("onmessage", _satListener)
  }
}
