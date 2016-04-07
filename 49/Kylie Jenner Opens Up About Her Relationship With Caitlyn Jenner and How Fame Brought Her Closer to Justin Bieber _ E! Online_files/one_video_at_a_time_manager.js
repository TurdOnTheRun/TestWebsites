
/**
 * Watches all video players on the given scopes
 * to make sure only a single player is actively
 * playing a video.
 * 
 * @param  {Array}  scopes  An array of player scope names.
 */
var OneVideoAtATimeManager = function() {
	var $ = jQuery;
	var playerScopes = [];
	var playerInfo = {};

	/**
	 * Returns all the player scopes, except the one provided.
	 * @param  {String}	exclude name of scope to be excluded from the returned array
	 * @return {Array}	Array of scope names.
	 */
	function getPlayerScopes (exclude) {
		console.log("getPlayerScopes, exclude : ", exclude );


		var filteredScopes = $.map(playerScopes, function(scope, index) {
			console.log("mapping scope : ", scope);
			if(scope == exclude || !playerInfo[scope].started ){
				return null;
			}else{
				return scope;
			}
		});

		console.log("returning scopes : ", filteredScopes);
		return filteredScopes;
	}

	function setScopeStarted (scopeName) {
		if( playerInfo.hasOwnProperty(scopeName) ){
			playerInfo[scopeName].started = true;
		}else{
			playerInfo[scopeName] = {started:true};
		}
	}

	// OnPlayerLoaded fires once on page load for all video players on the page,
	// then again for any video players added dynamically (which we don't do anywhere).
	$pdk.controller.addEventListener("OnPlayerLoaded", function(commInfos){
		console.log("OnPlayerLoaded, commInfos : ", commInfos);
		var compInfo;
		var nextItem;
		var playerIdString = '';
		var scope;

		// the data array contains CommInfo objects
		for (var i = 0; i < commInfos.data.length; i++) {
			playerIdString = '';
			nextItem = commInfos.data[i];

			if ((typeof nextItem == 'string') && nextItem.indexOf("player") == 0) {
				playerIdString = nextItem;
			}else{

				compInfo = nextItem.components[0];
				
				if(compInfo.type == "player"){
					console.log("adding player : ", compInfo.id);
					playerIdString = compInfo.id
				}
			}

			if(playerIdString.length > 0){
				scope = playerIdString.replace("player", "");
				console.debug("adding scope : ",scope);
				playerScopes.push(scope)
				
				//don't overwrite the property if it exists already,
				// a video may have sstarted before this event handler was run.
				if(!playerInfo.hasOwnProperty(scope)){
					playerInfo[scope] = {started:false};
				}
			}

		};



		console.log("playerScopes : ", playerScopes);
	});


	$pdk.controller.addEventListener("OnMediaPlay", function(clip){
		console.log("OnMediaPlay, clip : ", clip);

		if(playerScopes.length == 1){
			return;
		}


		var activeScope = clip.originator.controlId.replace("player", "");
		console.log("activeScope : ",activeScope);

		setScopeStarted(activeScope);

		var scopesToPause = getPlayerScopes(activeScope);

		if(scopesToPause.length > 0){
			$pdk.controller.pause(true, scopesToPause);
		}

		
	}, "*");


	$pdk.controller.addEventListener("OnMediaStart", function(clip){
		console.log("OnMediaStart, clip : ", clip);
		console.log("clip : ", clip);

		if(playerScopes.length == 1){
			return;
		} 


		var activeScope = clip.originator.controlId.replace("player", "");

		setScopeStarted(activeScope);


		var scopesToPause = getPlayerScopes(activeScope);

		if(scopesToPause.length > 0){
			$pdk.controller.pause(true, scopesToPause);
		}
	}, "*");

	$pdk.controller.addEventListener("OnMediaUnpause", function(clip){
		console.log("OnMediaUnpause...");
		console.log("clip : ", clip);

		if(playerScopes.length == 1){
			return;
		}

		
		var activeScope = clip.originator.controlId.replace("player", "");
		console.log("activeScope : ", activeScope);
		$pdk.controller.pause(true, getPlayerScopes(activeScope))
		
	}, "*");
}