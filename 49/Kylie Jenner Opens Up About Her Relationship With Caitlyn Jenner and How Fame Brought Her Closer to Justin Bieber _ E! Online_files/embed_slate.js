/**
 * Embed slate for article detail page players.
 */
var EmbedSlatePresenter = function() {
	var $ = jQuery;
	console.log("new EmbedSlatePresenter()");
							
	
	var template = '<div class="videoembedslate">'+
		'<button type="button" class="embedCloseBtn">X</button>'+
		'<div class="content">'+
			'<p class="embedslate-title-container"><span class="cs-sharetext">&lt;/&gt;&nbsp;Get Embed Code</span></p>'+
			'<p class="embedslate-description-container"><span class="embed-title">CTRL-C or CMD-C to copy, then press Enter</span></p>'+
			'<textarea contentEditable="true" class="embed-text" onfocus="this.select();" readonly="readonly"></textarea>'+
		'</div>';			

	var $overlay;


	/**
	 * Makes the slate visible
	 * @param  {object} state Object with values about the current operating environment:
			area	 	String	 			The current display area for the card
			card	 	HTMLElement	 		The DOM element of the card that is being shown.
			clip		Clip	 			The active Clip object. This value is only accessible if the method is called after playback has started.
			controller	PlayerController	A reference to the current controller for the parent player object
			player		Player	 			The active Player object.
			release		Release	 			The active Release object. Note that release values are copied from the source feed, and only those properties available in the feed are accessible here.
			initialization variables	 	Any value submitted through the initVars argument of the addPlayerCard or showPlayerCard methods is accessible by name.

	 */
	function show(state) {
		console.log("embed slate state NEW : ", state);
		$overlay = $(state.card);
		$textArea = $overlay.find('textarea');
		var $pageEdition = $('.embdButton').attr('data-edition');
		var domain = window.location.origin;

		if($pageEdition != 'us'){
			// evideo.domain
			$textArea.val('<iframe src="'+domain+'/'+$pageEdition+'/videos/embed/'+state.guid+'" width="610" height="344" frameBorder="0" scrolling="no"></iframe>')
		}
		else {
			$textArea.val('<iframe src="'+domain+'/videos/embed/'+state.guid+'" width="610" height="344" frameBorder="0" scrolling="no"></iframe>')			
		}

		$textArea.focus();

		$textArea.keydown(function(e) {
			  if ((e.keyCode == 13) || (e.keyCode == 27)) {
				  e.preventDefault();
				  $pdk.controller.hidePlayerCard("forms", "embedSlate", [state.scope]);
			  }     
		});

		$overlay.find('.embedCloseBtn').on('click', function(event) {
			event.preventDefault();
			$pdk.controller.hidePlayerCard("forms", "embedSlate", [state.scope]);
		});


		$overlay.find('.cs-sharetext').html(evideo.strings.embedOverlay.getEmbedCode);
		$overlay.find('.embed-title').html(evideo.strings.embedOverlay.toCopy);
		
		var $copyBtn = $overlay.find('.embedCopyBtn');
		$copyBtn.html(evideo.strings.embedOverlay.copy);

	 //    $copyBtn.on('click', function (e) {
		//    e.preventDefault();
		// }).zclip({
	 //        path:'http://'+evideo.domain+'/resources/js/libs/jquery/plugins/zClip/ZeroClipboard.swf',
	 //        copy:"waka waka waka"
	 //    });


	}

	function hide() {
		$overlay.off();
	}

	function getTemplate() {
		return template;
	}	


	return {
		show: show,
		hide: hide,
		getTemplate:getTemplate
	}

}

