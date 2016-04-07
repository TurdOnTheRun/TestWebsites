

(function( $, undefined ) {

$.widget( "eol.inlinepoll", {
	version: "1.0.0",
	defaultElement: "<div>",
	options: {
		pollId: "",
		edition: "us",
		pollData: "",
		showThanks: false,
		isVoteEnded: false,
		hasCaptcha: false,
		captchaPass: false,
		preSubmit: null,
		postSubmit: null,
		enableCookie: false,
		recaptchaSiteKey: "6LcubwMTAAAAAO_GOLKxKVvbCudISSGIDKdblDau" // Google reCaptcha sitekey
	},
	messages: {
		pollNote: "Results may be delayed up to 120 seconds..."
	},
	urls: {
		updatePollUrl: "/mvc/poll/vote"
	},
	eventNames: {
		
	},
	_create: function() {
		var self = this,
			elemId = this.element.attr("id") || ++uid,
			o = this.options,
			m = this.messages;
		this.pollEl = $("#" + elemId);
		this.pollEl.addClass("poll-wrap");
		
		var selectedPollId;
		var selectedChoiceId;
		
		if(o.hasCaptcha) {
			this.captcha = $("<div/>",{id:'captcha-'+o.pollData.id}).addClass("poll_captcha_container").captcha();
		}
				
		//set IE8 style
		var IE8Style = "";
		if($.browser.msie  && $.browser.version <= 8.0){
			IE8Style = "IE8";
		}
		// Manager multiple questions in the same poll
		var arrPollId = [];
		$.each(o.pollData.questions, function(key, item){
			arrPollId.push(o.pollData.id);
		});
	
		var allVoted = true;
		var samePollFlag = false;
		var samePollCounter = 0;
		var samePollBorder = "";
		var samePollNoBg = ""
		var isMultiPoll = false;
		
		$.each(o.pollData.questions, function(key, question) {
			//Set same poll flag: if the same Poll ID appears more than once, don't display the Poll header again
			if(arrPollId.length > 1 && samePollCounter < arrPollId.length){
				samePollCounter ++;
			}
			if(arrPollId.length > 1 && samePollCounter > 1){
				samePollFlag = true;
			}
			//Set same poll dotted divider and remove background skin until the last poll
			if(samePollFlag)  samePollBorder= "samePollDivider";
			if(samePollCounter < arrPollId.length)
				samePollNoBg = "samePollNoBg";
			else
				samePollNoBg = "";
			if(samePollCounter == 0 && arrPollId.length == 1)
				samePollNoBg = "";

			//Flag for multipoll all vote buttons, used for centering captcha 
			if(arrPollId.length >1)
				isMultiPoll = true;
				
			// create subPoll for each question
			var subPollId = o.pollData.id+'-subPoll-'+key;
			var subPollChoicesId = subPollId+'-choices';
			var subPollResultId = subPollId+'-result';
			var subPollButtonId = subPollId+'-button';

			// create form
//			var newForm = $("<form />",{id:subPollId,
//				action:"/feeds/polls/"+o.edition+"/vote/"+o.pollData.id}).addClass("poll-blog").appendTo(self.element);
			var newForm = $("<form />",{id:subPollId}).addClass("poll-blog "+IE8Style).appendTo(self.element);
			if(!samePollFlag){
				var questionSet = $("<h4 class='poll-sprite'>"+question.text+"</h4>").appendTo(newForm);		
				questionSet.html(o.pollTitle);	
			}
			var questionTitle = $("<div/>",{id:"question-title"}).addClass("poll-question-title "+samePollBorder).appendTo(newForm);
			questionTitle.html(question.text);	
			var newButtonset = $("<div/>",{id:subPollChoicesId}).addClass("poll-questions "+samePollNoBg+" "+IE8Style).appendTo(newForm);
			$.each(question.choices, function(key, choice) { 
			    var newChoiceBar = $("<div/>",{id:"choice-bar"}).addClass("choice-bar "+IE8Style).appendTo(newButtonset);			   
				$("<input/>",{type:"radio",name:"choice-"+subPollId,id:"choice-"+choice.choiceId,value:choice.choiceId}).appendTo(newChoiceBar);
				var pollBar = $("<div/>",{id:"poll-bar"}).addClass("poll-bar").appendTo(newChoiceBar);
				var choiceTag = $("<label/>",{"for":"choice-"+choice.choiceId}).addClass("poll-choice-text "+o.pollData.id+" "+IE8Style).appendTo(pollBar);
				// fix html tag within label text issue, e.g. <b>, <i>
				var choiceTagText = $("<p/>",{id:"poll-choice-text"}).addClass("poll-choice-text result").appendTo(choiceTag);
				choiceTagText.html(choice.choiceText);
				$("<br/>").appendTo(newChoiceBar);
			});
			
			// create result display
			
			var newResult = $("<div/>",{id:subPollResultId}).addClass("poll-results-table "+samePollNoBg+" "+IE8Style).appendTo(newForm);
			if (o.showThanks || o.isVoteEnded) {
				$('<div class="poll_thankyou_title">'+o.pollData.thanksTitle+'</div>').appendTo(newResult);
				$('<div class="poll_thankyou_msg">'+o.pollData.thanksMsg+'</div>').appendTo(newResult);
			}
			
			if (!o.showThanks || o.isVoteEnded) {
				$.each(question.choices, function(key, choice) {
				    var newVotedBar = $("<div/>",{id:"choice-bar"}).addClass("choice-bar-result "+IE8Style).appendTo(newResult);				 
					$("<input/>",{type:"radio",name:"choice-"+subPollId,id:"choice-"+choice.choiceId,disabled:"disabled",value:choice.choiceId}).appendTo(newVotedBar);
					var pollBar = $("<div/>",{id:"poll-bar"}).addClass("poll-bar result").appendTo(newVotedBar);
					var choiceTag = $("<label/>",{"for":"choice-result-"+choice.choiceId}).addClass("poll-choice-text poll-result "+o.pollData.id+" choice-"+choice.choiceId+" "+IE8Style).appendTo(pollBar);
					// fix html tag within label text issue, e.g. <b>, <i>
					var choiceTagText = $("<p/>",{id:"poll-choice-text"}).addClass("poll-choice-text result").appendTo(choiceTag);
					choiceTagText.html(choice.choiceText);
					var resultRowTag = $('<div>'+new Number(choice.choicePercentage).toFixed(1)+'%</div>').addClass("percentage-bar poll-"+o.pollData.id+" choice-"+choice.choiceId).appendTo(newVotedBar);
					$("<br/>").appendTo(newVotedBar);
					var percentBar = new Number(choice.choicePercentage).toFixed(1)+'%';
					
					if(!($.browser.msie && $.browser.version <= 8.0)){			
						$(".poll-choice-text.poll-result."+o.pollData.id+".choice-"+choice.choiceId).css({'background-size': percentBar+' 100%'});
						$(".poll-choice-text.poll-result."+o.pollData.id+".choice-"+choice.choiceId).css({"background-image":"url('/resources/polls/images/poll_percentage_bg.jpg')"});
						$(".poll-choice-text.poll-result."+o.pollData.id+".choice-"+choice.choiceId).css({"background-repeat":"no-repeat"});			
					}
				});
			}
						
			// create vote button
			if(!o.hasCaptcha) {
				$("<button/>",{id:subPollButtonId,type:"submit",value:"vote"}).text("Vote").addClass("vote").appendTo(newButtonset);
			}
			if(o.hasCaptcha){
				// add google reCaptcha
				$("<div/>",{id:"recaptcha-" + subPollId,"class":"g-recaptcha"}).appendTo(newButtonset);
				$("<button/>",{id:subPollButtonId,type:"submit",value:"vote"}).text("Vote").addClass("vote captcha_vote_btn "+o.pollData.id).appendTo(newButtonset);
			}
			
			//create check mark 
			$("<img src='/resources/polls/images/poll_check_mark.png'>").addClass("voted_check_mark").appendTo(newResult);
			
			// creat voted button
			$("<button/>",{id:subPollButtonId,type:"button",value:"voted"}).text("Voted").addClass("voted").appendTo(newResult);

			
			// bind listeners
			newForm.bind("submit", function(e) {
				e.preventDefault();
				if ($(e.target).serializeArray().length > 0) {
						var formData = $(e.target).serializeArray();
						var recaptchaPost = self.options.hasCaptcha?formData[formData.length-1].value:null;
						var choiceId = formData[0].value;
						// check whether choice id is integer since recaptcha value could be the first form field value if no choice is made.
						// also check for recaptcha value to make sure there's value
						if (parseInt(choiceId*1) && (recaptchaPost == null || recaptchaPost.length > 0)) {
							self._submitForm(subPollId, formData[0].value, recaptchaPost);
						}
				}
			});
			
			if (self.options.isVoteEnded || self.options.enableCookie && $.cookie(subPollId) != null) {
				self._showSubPollResult(subPollId);
			} else {
				self._hideSubPollResult(subPollId);
				allVoted = false;
			}
		});
		!allVoted && this.captcha && this.captcha.appendTo(this.pollEl);
	},
	_init: function() {
	},
	_submitForm: function(subPollId, choiceId, recaptchaPost) {
		if (choiceId) {
			this.sendPoll(this.options.pollData.id, choiceId, recaptchaPost);
			$.cookie(subPollId,'true',{ path: '/' });
			this.options.postSubmit && self.options.postSubmit();
			this._showSubPollResult(subPollId);
		}
	},
	
	sendPoll: function(pollId, choiceSelected, recaptchaPost) {
		selectedPollId = pollId;
		selectedChoiceId = choiceSelected;
		var self = this; 
   		if(isNaN(choiceSelected)){
   			return false;
   		}
   	    $.ajax({
   			type: "POST",
   			url: self.urls.updatePollUrl,
   			dataType: "json",
   			data: {"poll_id": pollId, "choice_selected": choiceSelected, "g_recaptcha_response": recaptchaPost}
   		}).done(function(response){
   		})
   	},
   	_updatePollWithCaptcha: function (response, subpoll_id) {
   		var self = this;
   		var pollId = response.poll_id;
   		if (response.errorMessage!=null) {
   			this._generateCaptcha();
   			this.captchaMessage.text(response.errorMessage);
   		} else {
   			this._showSubPollResult(subpoll_id);
   	        
	        $.cookie(subpoll_id,'true',{ path: '/' });
            // check if all sub polls have been submitted
            var allPollSubmitted = true;
            $.each(this.options.pollData.questions, function(key, question) {
                if ($.cookie(self.options.pollData.id+'-subPoll-'+key) == null) allPollSubmitted = false;
            });
            if (allPollSubmitted === true) {
            	this.captcha.hide();
            	$.cookie(this.options.pollData.id, 'true',{ path: '/' });
            } else {
            	$.removeCookie(this.options.pollData.id,{ path: '/' });
            }
   		}
   		this._enableAllVoteButtons();
   	},
	_hideSubPollResult: function(subpoll_id) {
		$('#'+subpoll_id+'-choices').show();
		$('#'+subpoll_id+'-result').hide();
		$('#'+subpoll_id+'-button').show();
	},
    _showSubPollResult: function(subpoll_id, choice_id) {
		$('#'+subpoll_id+'-choices').hide();
		$('#'+subpoll_id+'-result').fadeIn();
		$('#'+subpoll_id+'-button').hide();	
		var rawId = subpoll_id.split("-");
		var activeId = rawId[0];
		$('#captcha-overlay-'+activeId).css({"display":"none"});	
		
		// check for selected poll and choice before updating style. These style updates might be deprecated.
		if (typeof(selectedPollId) !== 'undefined' && typeof(selectedChoiceId) !== 'undefined') {
			$('input:radio[name="choice-'+subpoll_id+'"]').filter('[id="choice-'+selectedChoiceId+'"]').attr('checked', true);	
			$("#captcha-"+selectedPollId).css({"display":"none"});
			$('.vote.captcha_vote_btn.hidden.'+selectedPollId).removeClass('hidden').addClass('visible');
			$('.vote.captcha_vote_btn.visible.'+selectedPollId).css({"margin-left":"177px","margin-top":"-17px"});
			$('.vote.captcha-prev-btn.'+selectedPollId).css({"display":"none","visibility":"hidden"});
		}
    },
	_disableAllVoteButtons: function() {
		$('button.vote').attr('disabled','disabled');
	},
	_enableAllVoteButtons: function() {
		$('button.vote').removeAttr('disabled');
	},
	_destroy: function() {
		this._super.destroy.apply(this);
	}	
});
	$(document).ready(function(){
		var selectedSubPollId = "";
	 	$(".captcha-prev-btn").live("click", function(){ 
	 		var findId= $(this).attr("id").split("-");
	 		var thisId = findId[0];
	 		var thisSubId = findId[2];
	 		selectedSubPollId = findId[2];
	 		var isMultiPoll = findId[5];
	 		$("#captcha-"+thisId).css({"display":"block"});
	 		$("#"+thisId+"-subPoll-"+thisSubId+"-button.vote.captcha_vote_btn").removeClass("hidden").addClass("visible");
	 		var pollHeight = $("#poll-"+thisId).height();
	 		var subpollPos = $("#"+thisId+"-subPoll-"+thisSubId+"-button.vote.captcha_vote_btn").offset().top;	 
	 		var pollPos = $("#poll-"+thisId).offset().top;
	 		
	 		var capPos = "";
	 		var btnPos = "";
	 		if(isMultiPoll == "true")
				capPos = pollHeight - (subpollPos - pollPos) + 224;
			if(isMultiPoll == "false"){
				//60:height of header, 290:height of captcha
				capPos = 290 + ((pollHeight-60)- 290)/2;
				btnPos = capPos - 312;
				$("#"+thisId+"-subPoll-"+thisSubId+"-button.vote.captcha_vote_btn").css({"margin-top":"-"+btnPos+"px"});
			}
					
	 		//alert(capPos);		
	 		$("#captcha-overlay-"+thisId).css({"display":"block","height":pollHeight+"px"});
	 		$("#captcha-"+thisId).css({"margin-top": "-"+capPos+"px"});
	 		
	 			$("#poll-"+thisId).bind('keypress', function(e){	
	 			if(e.keyCode==13){
	 				$("#"+thisId+"-subPoll-"+thisSubId+"-button.vote.captcha_vote_btn").trigger('click');
	 				e.preventDefault();
	 			}
	 		});
	 	});
	 
	 	$(".captcha-close").live("click", function(){
	 		var findIdcap= $(this).attr("id").split("-");
			var thisIdcap = findIdcap[1];
			$("#captcha-"+thisIdcap).css({"display":"none"});
			$("#captcha-overlay-"+thisIdcap).css({"display":"none"});
			$("#"+thisIdcap+"-subPoll-"+selectedSubPollId+"-button.vote.captcha_vote_btn").removeClass("visible").addClass("hidden");
			$(document).unbind('keypress');
	 	});		
	});
}( jQuery ));