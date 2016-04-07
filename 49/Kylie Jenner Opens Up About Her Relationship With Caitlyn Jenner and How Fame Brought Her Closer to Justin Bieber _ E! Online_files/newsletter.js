/*******************************************************************/
/******         Newsletter JS                              *****/
/******         BackEnd: Oliver Eberle                       *****/
/******         Implemented by: Christine Lam                  *****/
/******         Platform: EONLINE                              *****/
/******         Version: 1.0                                   *****/
/*******************************************************************/

(function(jQuery){ 
	
	newsletterLookUp = function(UserEmail, source, edition, successCallback){  
		var returnData = "";
   		var theData = {
   			"edition" : edition,
   			"email" : UserEmail,
	   		"news" : true
		};
   		jQuery.ajax({
            type: "POST",
            url: "/mvc/hudson/mail/newsLetterAdd",
            data: theData,
            dataType: "json",
            timeout: 35000, // in milliseconds
            success: function(returnData) {
            	if (typeof successCallback == "function"){
            		successCallback(returnData);
            	}
   			if(returnData.status.code == 208){  
   				   //alert("You have already subscribed.  an overlay will show");
   				  jQuery(".error_subscribing").html(""); 
				  if(source == "e90Newsletter"){
				  jQuery(".lp-widget.e90 .e90_submitting_wait").css({"display":"none"});
				  jQuery(".e90_confirmation_overlay.already_subscribed, .e90_confirmation.already_subscribed").css({"display":"block"});
				  jQuery(".e90_confirmation_overlay.new_subscriber, .e90_confirmation.new_subscriber").css({"display":"none"});
				  centerElement(".e90_confirmation");
				   }
				   if(source == "footerNewsletter"){
				   jQuery(".footer_newsletter.Newsletter_sending_animation").css({"display":"none"});
				  jQuery(".footer_confirmation_overlay.already_subscribed, .footer_confirmation.already_subscribed").css({"display":"block"});
				  jQuery(".footer_confirmation_overlay.new_subscriber, .footer_confirmation.new_subscriber").css({"display":"none"});
				  centerElement(".footer_confirmation");
				   }
				   if(source == "errorNewsletter"){
				   jQuery(".error_page.Newsletter_sending_animation").css({"display":"none"});
				  jQuery(".error_confirmation_overlay.already_subscribed, .error_confirmation.already_subscribed").css({"display":"block"});
				  jQuery(".error_confirmation_overlay.new_subscriber, .error_confirmation.new_subscriber").css({"display":"none"});
				  centerElement(".error_confirmation");
  				 }
  				 jQuery(".error_subscribing").css({"display":"none"});
   			}else if(returnData.status.code == 200){  
	   			  //alert("First time signing up");
	   			  jQuery(".error_subscribing").html(""); 	
	   			  if(source == "e90Newsletter"){
				  jQuery(".lp-widget.e90 .e90_submitting_wait").css({"display":"none"});
				  jQuery(".e90_confirmation_overlay.new_subscriber, .e90_confirmation.new_subscriber").css({"display":"block"});
				  jQuery(".e90_confirmation_overlay.already_subscribed, .e90_confirmation.already_subscribed").css({"display":"none"});
				  centerElement(".e90_confirmation");
				   }
				   if(source == "footerNewsletter"){
				   jQuery(".footer_newsletter.Newsletter_sending_animation").css({"display":"none"});
				   jQuery(".footer_confirmation_overlay.new_subscriber, .footer_confirmation.new_subscriber").css({"display":"block"});
				   jQuery(".footer_confirmation_overlay.already_subscribed, .footer_confirmation.already_subscribed").css({"display":"none"});
				   centerElement(".footer_confirmation");
				   }
				   if(source == "errorNewsletter"){
				   jQuery(".error_page.Newsletter_sending_animation").css({"display":"none"});
				   jQuery(".error_confirmation_overlay.new_subscriber, .error_confirmation.new_subscriber").css({"display":"block"});
				   jQuery(".error_confirmation_overlay.already_subscribed, .error_confirmation.already_subscribed").css({"display":"none"});
				   centerElement(".error_confirmation");
			   	   }
			   	   jQuery(".error_subscribing").css({"display":"none"});
   			}else{    
   				//alert("error"+returnData.status.code);
   				 jQuery(".error_subscribing").html("");
   				 if(source == "footerNewsletter"){
   				 	jQuery("#Newsletters .Newsletter_sending_animation").css({"display":"none"});
					jQuery("#Newsletters #Newsletter_Block").css({"display":"none"});
					jQuery("span.mustEnterEmail").html("<div class='error_subscribing'>Error subscribing, please try again</div>");
   				 }
   				 if(source == "errorNewsletter"){
   				 	jQuery(".error_page.Newsletter_sending_animation").css({"display":"none"});
					jQuery(".error_newsletter_signup_form").css({"visibility":"visible"});	
					jQuery(".error_newsletter_signup_form").append("<div class='error_subscribing'>Error subscribing, please try again</div>");
   				 }
   				console.log("Error submitting newsletter subscription");
   				return;
   			}
            }
   		})
	};
	
	var newSubscriberTitle = "";
	var newSubscriberSubtitle = "";
	var alreadySubscribedTitle = "";
	var alreadySubscribedSubtitle = "";
	var closetxt = "";
		
	//Center confirmation to the current location of E90 widget
	function centerElement(element){
		jQuery(element).css("position","absolute");
		jQuery(element).css({"margin-left": (jQuery(window).width() - 300 ) / 2+jQuery(window).scrollLeft() + "px"});
		jQuery(element).css({"margin-top": (jQuery(window).height() - 405 ) / 2+jQuery(window).scrollTop() + "px"});
	}
	
	 //Validating email format
    window.isEmail = function(email) {
  		var isValid = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		return isValid.test(email);
	}
	
	//Set translated text to overlays
	window.setOverlayContent = function(nt, ns, ot, os, close){
		newSubscriberTitle = nt;
		newSubscriberSubtitle = ns;
		alreadySubscribedTitle = ot;
		alreadySubscribedSubtitle = os;
		closetxt = close;
	}	
	
	//Append confirmation overlays to the body 
	//param: newsletterLocation is where the newsletter is located eg.footer, e90, or error (new window)
    window.appendOverlays = function(newsletterLocation, edition){
		if(edition == "undefined" || edition == null) edition = "";
		if(jQuery("."+newsletterLocation+"_confirmation_overlay").length == 0){
			jQuery("body").append("<div class='"+newsletterLocation+"_confirmation_overlay new_subscriber'></div>"+
					"<div class='"+newsletterLocation+"_confirmation new_subscriber "+edition+"'>"+
						"<img class='"+newsletterLocation+"_lightbox_close' src='/resources/newsletter/images/Newsletter_Lightbox_close_button.png'/>"+
						"<img class='"+newsletterLocation+"_lightbox_header' src='/resources/newsletter/images/Newsletter_NL-1-header.jpg'></img>"+
						"<div class='"+newsletterLocation+"_lightbox_title'>"+newSubscriberTitle+"</div>"+
						"<div class='"+newsletterLocation+"_lightbox_subtitle'>"+newSubscriberSubtitle+"</div>"+
						"<input type='button' name='"+newsletterLocation+"_close' value='"+closetxt+"'></input>"+
					"</div>");
					
			jQuery("body").append("<div class='"+newsletterLocation+"_confirmation_overlay already_subscribed'></div>"+
				"<div class='"+newsletterLocation+"_confirmation already_subscribed "+edition+"'>"+
					"<img class='"+newsletterLocation+"_lightbox_close' src='/resources/newsletter/images/Newsletter_Lightbox_close_button.png'/>"+
					"<img class='"+newsletterLocation+"_lightbox_header' src='/resources/newsletter/images/Newsletter_NL-1-header.jpg'></img>"+
					"<div class='"+newsletterLocation+"_lightbox_title'>"+alreadySubscribedTitle+"</div>"+
					"<div class='"+newsletterLocation+"_lightbox_subtitle'>"+alreadySubscribedSubtitle+"</div>"+
					"<input type='button' name='"+newsletterLocation+"_close' value='"+closetxt+"'></input>"+
				"</div>");	
		}
   };  
  
})(jQuery.noConflict());