(function( $, undefined ) {

	$.widget( "eol.captcha", {
		version: "1.0.0",
		defaultElement: "<div>",
		options: {
			edition: "us"		
		},
		urls: {
			sendCaptchaUrl: "/services/submitCaptcha.jsp",
			captchaImageUrl: "http://images.eonline.com/static/redcarpet/globes2007/everywhere/shoutouts/images/"
		},
		messages: {
			defaultInputMessage: "Enter the code shown",
			captchaInstructionMessage: "Type the characters you see in the picture below",
			captchaExplainMessage: "This helps confirm you are a person, not a machine, and reduces spam",
			captchaInputErrorMessage: "Sorry, that word didn't match."
		},
		eventNames: {
			captchaCorrect: "correct",
			captchaIncorrect: "incorrect"
		},
		_create: function() {
			var self = this,
				elemId = this.element.attr("id") || ++uid,
				o = this.options,
				m = this.messages;
			this.pollEl = $("#" + elemId);
			// create captcha
			var captchaDivId = elemId+'-captcha';
			var captchaMessageId = elemId+'-captcha-message';
			var captchaImageId = elemId+'-captcha-image';
			var captchaInputId = elemId+'-uword';
			var rawId = elemId.split("-");
			var pollId = rawId[1];
			
			this.captcha = $("<div/>",{id:captchaDivId}).addClass("poll_captcha clear").appendTo(this.element);
			this.captchaClose = $("<div id='"+captchaDivId+"-close' class='captcha-close'><img src='/resources/polls/images/poll_captcha_close.png'></img></div>").appendTo(this.captcha);
			this.captchaLabel = $("<div/>",{id:"captchaTitle-"+captchaDivId}).addClass("poll_captcha_label").appendTo(this.captcha);
			this.captchaLabel.html("Enter captcha code <br/> to confirm you're not a robot");
			this.captchaMessage = $("<div/>",{id:captchaMessageId}).addClass("poll_captcha_msg").appendTo(this.captcha);
			this.captchaInstructionLabel = $("<label/>").text(m.captchaInstructionMessage).addClass("poll_captcha_IL").appendTo(this.captcha);
			$("<br/>").appendTo(this.captcha);
			this.captchaImage = $("<img/>",{id:captchaImageId}).appendTo(this.captcha);
			var captchaInputDiv = $("<div/>").appendTo(this.captcha);
			this.captchaInput = $("<input/>",{type:"text",name:"poll_uword",id:captchaInputId}).width("290").blur(function(){
				$(this).val($(this).val() || m.defaultInputMessage);
			}).focus(function(){
				if ($(this).val() == m.defaultInputMessage) {
					$(this).val('');
				}
			}).val(m.defaultInputMessage).appendTo(captchaInputDiv);
			$("<label/>").text(m.captchaExplainMessage).addClass("poll_captcha_explain").appendTo(this.captcha);
			//$("<button/>",{id:pollId+"-subPoll-0-button",type:"submit",value:"vote"}).text("Vote").addClass("vote").appendTo(this.captcha);
			this._generateCaptcha();
			
		},
		_generateCaptcha: function() {
	       	this.captchaID = Math.floor(Math.random()*191)+1;
	       	var defaultCaptchaUrl = this.urls.captchaImageUrl + this.captchaID + ".jpg";
	   		this.captchaImage.attr("src", defaultCaptchaUrl);
	    },
		_getCaptcha: function() {
			return (this.captchaInput.val() !== this.messages.defaultInputMessage)?this.captchaInput.val():'';
		},
		submit: function(callback) {
			var self = this;
			if (!this._getCaptcha()) {
				self.captchaInstructionLabel.text(self.messages.captchaInputErrorMessage).fadeOut().fadeIn();
				self.captchaInput.focus();
				return;
			}
				$.cookie('PostCookie', this.captchaID,{ path: '/' });
				 $.ajax({
		   			type: "GET",
		   			url: self.urls.sendCaptchaUrl,
		   			dataType: "json",
		   			data: {"captchaEntry": hex_md5(this._getCaptcha())}
		   		}).done(function(response){
		   			if (response.verify) {
		   				self._trigger(self.eventNames.captchaCorrect);
		   				self.pollEl.fadeOut();
		   				callback && callback(true);
		   			} else {
		   				self.captchaInstructionLabel.fadeOut().text(self.messages.captchaInputErrorMessage).fadeIn();
		   				self._generateCaptcha();
		   				self._trigger(self.eventNames.captchaIncorrect);
		   			}
		   		})
			
		},
		_destroy: function() {
			
		}
	});
}( jQuery ));