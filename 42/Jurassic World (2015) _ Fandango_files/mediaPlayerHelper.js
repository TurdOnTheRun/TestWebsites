var Fandango = Fandango || {};
"use strict";

Fandango.mediaPlayerHelper = {
  initialize: function () {

  },
  // -------------------- Event Handlers for the PDK Player -------------------------- //    
    onPlayerLoadedHandler : function(evt){
        // Not in use!
    },
    
    onSetReleaseHandler : function(evt){
        // Not in use!
    },
    
    onShowFullScreenHandler : function(evt){
        // Not in use!
        
    },
    
    onMediaEndHandler : function(evt){
       // Not in use!
    },
    
    /**
     * When the onMediaComplete event is dispatched from the PDK player on a separate page then this method will eventually be called.
     * It simply clears up the Ad overlay div if it is present;
     */
    onMediaCompleteHandler : function(evt){

    },
    
    onReleaseEndHandler : function(evt){
      if( typeof(Fandango.mediaPlayer) != "undefined" ){
         Fandango.mediaPlayer.playNext();
      }
    },
    
    /**
     * This method will handle the onMediaStart event launched by the PDK Player (running in the page fplayer/player.aspx which
     * is installed in a iframe in VideoMediaDetail.aspx). If the media starting is an Ad then an overlay is created
     * to disable clicking the thumbnails and the paging controls for the related trailers.
     * Otherwise, it removes the Ad overlay if present and passes WSS data for the current trailer to fplayer/player.aspx.
     **/
    onMediaStartHandler : function(evt){

    },

  /**
   * This method handles and event dispatched from the PDK player once the PlaylistForm is loaded by the PlaylistFormPlugin.
   * It can be used to do any housekeeping in the host page for the plugins loaded into the fplayer/player.aspx page's application
   * 
   **/
  onPlaylistFormLoadedHandler: function(evt){
    
  },    
  
  onSetSmilHandler : function(evt){
        // Not in use!
    }

}

$(function () {
    Fandango.mediaPlayerHelper.initialize();
}); 