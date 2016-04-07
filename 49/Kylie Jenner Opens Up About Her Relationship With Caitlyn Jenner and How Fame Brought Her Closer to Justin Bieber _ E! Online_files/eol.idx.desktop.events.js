/**
    @namespace idxPocEvents
    @name page    
    @description IDX POC event functions
    @author ken.mcafee
    
    Global parameter Reference:
    
    p stands for json parameter object
    r stands for json return object, typcially and api response 
    m stands for a json member object
    cb is the placeholder for a callback function to call
    id stand for the idx id of the member
    
    Any other variable names should be self-explanatory.

    Documentation can be found:
    http://confluence.mts.inbcu.com/display/sts/IDX+JS+Libraries#IDXJSLibraries-IDXJSEventHandlerAPI
*/

var idxPocEvents = (function($){
	var idxConfig;
	var recaptcha1, recaptcha2;

	/*======================================*/
	/*=========| UTILITY FUNCTIONS |========*/
	/*======================================*/	

	var _utils = {
		resetForm : function(form){
			$(form).find("input[type=text],input[type=password],textarea").val("");
			$(form).find("input[type=checkbox],input[type=radio]").checked = false;
			$(form).find('select').selectedIndex = -1;				
		},
		isIE : function(){
		  var myNav = navigator.userAgent.toLowerCase();
		  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		}, 
		getUrlVars : function(){
	   	    var vars = [], hash;
	   	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	   	    for(var i = 0; i < hashes.length; i++)
	   	    {
	   	        hash = hashes[i].split('=');
	   	        vars.push(hash[0]);
	   	        vars[hash[0]] = hash[1];
	   	    }
	   	    return vars;
		},
		ageValidator : function(month, day, year){
			if( month==null && day==null && year==null){
				return true;
			}else{
					month = month-1;
					mSeconds = (new Date(year, (month), day)).getTime();
				    objDate = new Date();
				    objDate.setTime(mSeconds);
				    if(objDate.getFullYear() != year || objDate.getMonth() != month || objDate.getDate() != day) {
				        return false;
				    }else{
				    	var mydate = new Date();
		    			mydate.setFullYear(year, (month), day);
		    			var currDate = new Date();
		    			currDate.setFullYear(currDate.getFullYear() - 13);
		    			return (currDate - mydate < 0 ? false : true);
				    }
			} 
		},
		sweepsAgeValidator: function(month, day, year, age){
			if( month==null && day==null && year==null){
				return false;
			}else{
				month = month-1;
				var bday = new Date(year,month,day).getTime();
				var ageDiff = Date.now() - bday;
				ageDiff = new Date(ageDiff);
				ageDiff = Math.abs(ageDiff.getUTCFullYear() - 1970);
				
				return (ageDiff >= age);
			} 
		},
		ageFormater: function(month, day, year) {
			month = month + 1;
			if(month<10) {
				month = "0" + month;
			}
			if(day<10) {
				day = "0" + day;
			}
			return year+"-"+month+"-"+day;
		},
		fluidDialog : function(){
		    var $visible = $(".ui-dialog:visible");
		    // each open dialog
		    $visible.each(function () {
		        var $this = $(this);
		        var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
		        // if fluid option == true
		        if (dialog.options.fluid) {
		            var wWidth = $(window).width();
		            // check window width against dialog width
		            if (wWidth < (parseInt(dialog.options.maxWidth) + 50))  {
		                // keep dialog from filling entire screen
		                $this.css("max-width", "90%");
		            } else {	                
		                $this.css("max-width", dialog.options.maxWidth + "px");
		            }
		            
		            //reposition dialog
		            dialog.option("position", dialog.options.position);
		        }
		    });
		},
		addValidators : function(){
			/* Front end validator methods added to Jquery Validator*/
			// alpha numeric
			jQuery.validator.addMethod("check_username", function(value, element, params) {
			    return this.optional(element) || value == value.match(/^[a-zA-Z0-9._-]{6,25}$/);
		 	}, "One or more characters are invalid. Please try again.");
			
			jQuery.validator.addMethod("check_password",function(value,element,param){
				return this.optional(element) || value == value.match(/^.{6,24}$/);
			},"One or more characters are invalid. Please try again.");
			
			jQuery.validator.addMethod("notEqualTo", function(value, element, param) {  
				  return this.optional(element) || value != $(param).val();
			}, "Please specify a different value.");
			
			jQuery.validator.addMethod("email", function(value, element) {
		        return this.optional(element) || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i.test(value);
		    }, "Email address is invalid. Please enter a valid email address.");
			
			jQuery.validator.addMethod("emailCheck", function(value, element) {
		        var isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i.test(value);
		        if(isValid) {
		        	$(".email-container").css("background-position","324px 0");
		        } else {
		        	$(".email-container").css("background-position","324px -100px");
		        }
		        return this.optional(element) || isValid;
		    }, "Email address is invalid. Please enter a valid email address.");
			
			jQuery.validator.addMethod("user_or_email_check", function(value, element) {
		        return this.optional(element) || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i.test(value) || value == value.match(/^[a-zA-Z0-9._-]{6,15}$/);
		    }, "Username or Email Address is invalid: Please try again.");
			
			jQuery.validator.addMethod("date_check",function(value,element,params){
					month = ($(params[0]).val()); 
				    day = $(params[1]).val();
				    year = $(params[2]).val(); 
				    if( month==null && day==null && year==null){
						return true;
					}else{
						month = ($(params[0]).val())-1;
						mSeconds = (new Date(year, month, day)).getTime();
					    objDate = new Date();
					    objDate.setTime(mSeconds);		    
						if(objDate.getFullYear() != year || objDate.getMonth() != month || objDate.getDate() != day) {return false;}
					    return true;		    
					}
				    
			}, "Please provide a valid date.");
			jQuery.validator.addMethod("check_phonenumber", function(value, element) {
			    return this.optional(element) || value == value.match(/^1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/);
		 	}, "Please enter a valid phone number.");
		
			jQuery.validator.addMethod('zipcode', function(value, element) {
				return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
			}, 'Please provide a valid zipcode.');
			
			jQuery.validator.addMethod("check_recaptcha1", function(value, element) {
				var isValid;
				// check that the recaptcha has loaded on the page
				if($("#login-dialog .g-recaptcha iframe").length) {
					// proceed if user has created a response key
					// validity of key itself is checked in backend validation
					isValid = grecaptcha.getResponse(recaptcha1) != "";
				} else {
					isValid = false;
				}
				return isValid;
		 	}, "Please complete the reCAPTCHA.");
			
			jQuery.validator.addMethod("check_recaptcha2", function(value, element) {
				var isValid;
				// check that the recaptcha has loaded on the page
				if($("#register-dialog .g-recaptcha iframe").length) {
					// proceed if user has created a response key
					// validity of key itself is checked in backend validation
					isValid = grecaptcha.getResponse(recaptcha2) != "";
				} else {
					isValid = false;
				}
				return isValid;
		 	}, "Please complete the reCAPTCHA.");
		}
	};

	/*======================================*/
	/*=====| COMMANDS |=====*/
	/*======================================*/

	var _commands = {
		manualUnlinkSuccessEvent : function(r,p,successCb){
			if(typeof successCb == "function"){
				successCb();
			}
		},
		resendEmail : function(p){
			console.log('Resend Email: '+ p.type);
			if(p.type == "confirmation"){
				eolIdx.resendEmail({
					h:decodeURIComponent(_utils.getUrlVars()['h'])
				},function(r){
					_dialogs.showSimpleMessage({title : "CONFIRMATION EMAIL HAS BEEN SENT", message : "Please Check Your Email."});
				},function(r){
					_dialogs.showSimpleMessage({title : "Error", message : "Error sending email. Please try again later."});
				});
			}
			else if(p.type == "password") {
				eolIdx.resendEmail({			
					h:decodeURIComponent(_utils.getUrlVars()['h'])
				},function() {
		    		_dialogs.showSimpleMessage({title : "Reset Password Email Has Been Sent", message : "Please Check Your Email"});
		    	},
		    	function() {
		    		_dialogs.showSimpleMessage({title : "Reset Password Error", message : "Error sending email. Please try again later."});
		    	});
			}
		},
		linkLogin : function(p){
			// Checks for validation of the login form & uses manualLogin in eolIdx.
			// Optional params is p.loginRedirectUrl
			// (Is also used in the login dialog)

			if(typeof p != "undefined"){
				if(p.loginRedirectUrl == "yourAccountActiveUri"){
					p.loginRedirectUrl = idxConfig.yourAccountActiveUri;
					console.log(idxConfig.yourAccountActiveUri);
				}
			}
			else {
				var p = {};
				p.loginRedirectUrl == null;
			}

			 $("#login-form").validate({
			  debug: true,
	   		  rules: {
	   			  username: {
	   	                required: true,
	   	                user_or_email_check:true
	   	            },
	   	            password: {
	   	                required: true,
	   	                minlength: 6
	   	            }
	   	        },
	   	        messages: {
	   	            password: {
	   	                required: "Please provide a password",
	   	                minlength: "Your password must be at least 5 characters long"
	   	            },
	   	            email: "Please provide a username or email"
	   	        },			    	       
	   			success: function(label) {
	   				$(label).closest('.form-group').removeClass('has-error');
	   			},
	   	        submitHandler: function() {
	        		$.removeCookie('pm[rememberme]');
	        		if ($('#remembermeCheckBox').is(':checked')) {
	    			    $.cookie('pm[username]', $('#username').val(), { expires : 365, path : '/'});
	    			    $.cookie('pm[rememberme]', true, { expires : 365, path : '/'  });
	    			 }else {
	    			    // reset cookies.
	    			    $.cookie('pm[username]', null);
	    			    $.cookie('pm[rememberme]', false);
	    			 }
					console.log(p.loginRedirectUrl);

	        		 eolIdx.manualLogin({
		  				username: $('#login-form input#username').val(),
		  				password: $('#login-form input#password').val()
	        		 }, p.loginRedirectUrl);
		        }
	   	  	});			
		}
	};
	
	/*======================================*/
	/*=============| DIALOGS |==============*/
	/*======================================*/

	var _dialogs = {
		resetPassword : function(){
			var self = this;
			$.get('/resources/desktop/template/reset.password.template.html', function(template) {
				var templateContent = $(template).filter("#reset-password-template").html();
				Mustache.parse(templateContent);
				var rendered = Mustache.render(templateContent);
				$("#reset-password #reset-dialog").html(rendered);
				$( "#reset-password-form" ).validate({
					rules: {
						password: {required:true,minlength:6,maxlength:24},
						confirmPassword: {equalTo: "#password"}
					},
					messages: {
			            password: {
			                required: 'Please provide a password',
			                minlength: "Your password must consist of at least 6 characters",
			                maxlength: "Too many characters. Please try again."
			            },
			            confirmPassword: "Please enter matching password"
			        },	
			        submitHandler: function(e){
						eolIdx.resetPassword({
							password:$("#password").val(),
							h:decodeURIComponent(_utils.getUrlVars()['h'])
						},
						function(){
							self.showSimpleMessage({
								el : "reset-dialog", 
								title : "Your password has been changed",
								closeFunction : function() {
									self.loginScreen({loginRedirectUrl: baseUrl + "/mvc/user/setting"});
								},
								doneCallback : function(){
									self.loginScreen({loginRedirectUrl: baseUrl + "/mvc/user/setting"});
								}
							});
						},
						function(){
							self.showSimpleMessage({el : "reset-dialog", title : "Password reset error.", doneCallback : function(){
								// Need to re-add since dialog close deletes element from the dom
								$('#reset-password').append('<div id="reset-dialog"></div>');
								// Show Dialog message if the user clicks "done"	
								_dialogs.resetPassword();
							}});
						});
		    	    }
				});
			});
		}, 
		registerConfirmation : function(r,p){
			$.get('/resources/desktop/template/register.confirm.template.html', function(template) {
				var templateContent = $(template).filter("#register-confirm-template").html();
				Mustache.parse(templateContent);
				var rendered = Mustache.render(templateContent);
				$("#registerConfirmation").html(rendered);
				$( "#registerConfirmation" ).dialog({
					  autoOpen: true, 
					  height: 'auto',
				      width: 'auto',
				      modal: true,
				      closeOnEscape:false,
				      fluid:true,
				      resize:'auto',
				      open:function(){
				    	  $("#registerConfirmation .modal-dialog .button").on('click', function(e) {
				    		  $( "#registerConfirmation" ).dialog("close");
								_idxMediator.loginSuccessEvent(r,p);
				    	  });
				      }
				});  
			});
		}, 
		privacyStatement : function(data){
			var labelMessage;
			if(data =="socialLogin"){
				labelMessage = "When you login using your social media account, you are sharing with us certain public information from your social media account. " +
							   "For more details about how we use your social media information, see our <strong><a class='highlight' href='http://www.nbcuni.com/privacy/' target='_blank'>Privacy Policy</a></strong>. " +
							   "If you are located outside of the U.S., your information may be transferred to, processed and used in the U.S."
			}else if(data =="register"){
				labelMessage = "Your Information may be shared with other NBCUniversal businesses and used to better tailor our services and advertising to you. " +
							   "For more details about how we use your information, see our <strong><a class='highlight' href='http://www.nbcuni.com/privacy/' target='_blank'>Privacy Policy</a></strong>. " +
							   "If you are located outside of the U.S., your information may be transferred to, processed and used in the U.S."
			}else if(data =="linkedAccount"){
				labelMessage = "When you link your social media account with your Eonline account, you are sharing with us certain public information from your social media account. " +
								"For more details about how we use your social media information, see our <strong><a class='highlight' href='http://www.nbcuni.com/privacy/' target='_blank'>Privacy Policy</a></strong>. " +
								"If you are located outside of the U.S., your information may be transferred to, processed and used in the U.S."
			}
			
			$.get('/resources/desktop/template/privacy.statement.template.html', function(template) {
				var templateContent = $(template).filter("#privacy-statement-template").html();
				Mustache.parse(templateContent);
				var rendered = Mustache.render(templateContent, {	
					labelMessage:labelMessage
				});

				$("#privacy-statement-dialog").html(rendered);

				var privacyDialog = $( "#privacy-statement-dialog" ).dialog({
					  autoOpen: true, 
					  height: 'auto',
				      width: '320px',
				      modal: true,
				      closeOnEscape:false,
				      fluid:true,
				      resize:'auto'	    
				}); 

				$("#privacy-statement-dialog .modal-dialog .button").click(function(e) {
					privacyDialog.dialog("close");
		    	}); 
			});
		},
		loginError : function(){
	   		$("#login-dialog #errorMask").parent().css("width",$( "#login-dialog" ).width);
	   		$("#login-dialog #errorMask").parent().css("height", $( "#login-dialog" ).height);
	   		$("#login-dialog #errorMask").parent().css("top",$( "#login-dialog" ).top);
	   		$("#login-dialog #errorMask").parent().find('.ui-dialog-titlebar a' ).css("display","none");
	   		$("#login-dialog #errorMask").css("display","inline");
		},
		showErrorMask : function(){
			$("#register-dialog #errorMask").parent().css("width",$( "#register-dialog" ).width);
			$("#register-dialog #errorMask").parent().css("height", $( "#register-dialog" ).height);
			$("#register-dialog #errorMask").parent().css("top",$( "#register-dialog" ).top);;
			$("#register-dialog #errorMask").parent().find('.ui-dialog-titlebar a' ).css("display","none");
			$("#register-dialog #errorMask").css("display","inline");
			$(".backToLogin").css('display', 'block'); 
		},
		register : function(){
			if( $("#register-dialog").html() != "") {
				// just open the dialog if it has previously been created
				$("#register-dialog").dialog("open");
			} else {
				var self = this;
				$.get('/resources/desktop/template/register.template.html', function(template) {
					var templateContent = $(template).filter("#register-template").html();
					Mustache.parse(templateContent);
					var rendered = Mustache.render(templateContent);
					$("#register-dialog").html(rendered);
					// add year options
					for (var i = new Date().getFullYear(); i > 1900; i--){
					    $('#year').append($('<option />').val(i).html(i));
					}
					$( "#register-dialog" ).dialog({
						  autoOpen: true, 
						  height: 'auto',
					      width: 'auto',
					      modal: true,
					      closeOnEscape:false,
					      fluid:true,
					      resize:'auto',
					      maxHeight: '1024px',
						  open: function () {
							// assumes no title will ever be present
							$("#register-dialog").parent().find(".ui-dialog-titlebar").on("mousedown",function() {
								$(this).children("a").trigger("click");
							});
								
							// Front End validations as per requirement page in wiki.
							$( "#register-dialog #register-form").validate({
								 focusInvalid: true,
								 debug : true,
								 rules: {
										 reg_username: {
											 required: true,
											 minlength: 6,
											 maxlength:15,
						   	                 check_username:true
										},
										reg_password: {
											required: true,
											minlength: 6,
											maxlength:24,
											check_password:true,
											notEqualTo:"#reg_username"
										},
										reg_password_confirm: {
											required: true,
											minlength: 6,
											maxlength:24,
											equalTo: "#reg_password"
										},
										reg_email: {
											required: true,
											email: true,
											maxlength:254
										},
										year:{	
											required:false,
											date_check: ["#month","#day","#year"] 
										},
										agree:{
											required:true
										}
								},
								messages: {
									reg_username: {
										required: "Please enter a username.",
										minlength: "Not enough characters. Please try again.",
									    maxlength: "Too many characters. Please try again.",
									    check_username :"One or more characters are invalid. Please try again."
									},
									reg_password: {
										required: "Please provide a password.",
										check_password:"One or more characters are invalid. Please try again.",
										minlength: "Not enough characters. Please try again.",
										maxlength: "Too many characters. Please try again.",
										notEqual:"Password must be different from username. Please try again."
									},
									reg_password_confirm: {
										required: "Please provide a password.",
										minlength: "Not enough characters. Please try again.",
										maxlength: "Too many characters. Please try again.",
										equalTo: "Password does not match. Please re-enter password."
									},
									reg_email: "Email is invalid. Please try again.",
									agree: "The terms of service must be agreed to in order to create an account."
								},
								// error placement to display error block and as well as green or cross checkmarks.
								errorPlacement: function(error, element) {	
									if($(element).is(':checkbox')){						
										error.insertAfter($(element).closest('.form-element').find(".error_mark"));	
								    }else{
								    	error.insertAfter($(element).parent());
								    }
									 $(error).css("display","block");					
									 $(element).closest('.form-element').find(".error_mark").addClass('error').removeClass('valid').css('display','inline');		   
								     $(".backToLogin").css('display', 'block');					
								},
								highlight: function(element) {
									$(element).closest('.form-element .error').css('display', 'block');
									$(element).closest('.form-element').find(".error_mark").addClass('error').removeClass('valid').css('display','inline');						
								},
								success: function(element) {						
									$(element).closest('.form-element').find(".error_mark").addClass('valid').removeClass('error').css('display','inline');	
					            },
					            // submitHanlder after all above validations are valid.
				   	            submitHandler: function() {
									var sessionCookie = sessionStorage.getItem("ageCheck");
									
									if(sessionCookie !='' && sessionCookie!=null && sessionCookie){
										  self.showErrorMask();
									}
									else { 
					   	            	// age validator to check user above 13 years or old
						   	        	var valid = _utils.ageValidator($('#month').val(),$('#day').val(),$('#year').val());
						   	        	if(valid){
						   	        		$(".backToLogin").css('display', 'none');
					   	        		  	eolIdx.manualRegister({
												provider: "idx",								
												email : $('input#reg_email').val(),
												username: $('input#reg_username').val(),
												password: $('input#reg_password').val(),
												dobmonth:$('#month').val(),
						    	        		dobday:$('#day').val(),
						    	        		dobyear:$('#year').val(),
						    	        		newsletter:$('#newsletter').prop("checked"),
											});
						   	        	}
						   	        	else {
						   	        		// if user is below 13 years or old store the session cookie /*remains untill the user closes the browser and display error mask Dialog */
						   	        		sessionStorage.setItem("ageCheck",true);
						   	        		self.showErrorMask();
						   	        	}
									}
				   	        	}
					   	  	});						  	
	
							$("#register-dialog #errorMask .message a").on('click', function(e){
					    		$("#register-dialog  #errorMask").css("display","none");
					    		$("#register-dialog" ).dialog("close");
							});
							  
							 // register-dialog backto Login handler 
							 $(".backToLogin a").on('click', function(e) {
								var registervalidator = $('#register-form').validate();
								  	registervalidator.resetForm();
								_utils.resetForm('#register-form');
								$( "#register-dialog" ).dialog("close");
								$("#login-dialog" ).dialog("open");
							 });
							 
							 // register-dialog close handler 
							 $("#register-dialog").parent().find(".ui-dialog-titlebar a").click(function(e) {
								  var registervalidator = $('#register-form').validate();
								  registervalidator.resetForm();
								  _utils.resetForm('#register-form');
								  $( "#register-dialog" ).dialog("close");
						     });
							 
							 // Privacy Statement Dialog handler @paramater register, to get register copy.
							 $("#register-dialog #privacyNotice").on("click", function() {
								 self.privacyStatement("register");
							 });
						  }
					});
				});
			}
		},
		loginScreen : function(p){
			// Login Screen without registration
			// Available params used in login - p.loginRedirectUrl - optional
			var self = this;
			$.get('/resources/desktop/template/active.account.login.template.html', function(template) {
				var templateContent = $(template).filter("#active-account-login-template").html();
				Mustache.parse(templateContent);
				var rendered = Mustache.render(templateContent);
				$("#active-account-login").html(rendered);
				//Read rememberme cookie for login and set username on login.
				var remember = $.cookie('pm[rememberme]');
				if (remember =="true") {
					$('#username').val($.cookie('pm[username]'));
					$('#remembermeCheckBox').attr("checked", true);
				}
				
				// forgotPassword dialog launch  
				$("#forgotPassword").on("click", function() {
					$("#login-dialog").dialog("close");
					self.forgotPassword();
				});

				// front end validations
				_commands.linkLogin(p);

				$("#errorMask .message a").on('click', function(e){
		    		$("#login-dialog #errorMask").css("display","none");
		    		$( "#login-dialog" ).dialog("close");
				});
				    	
				var loginValidator = $("#login-form").validate();   

				// login-dialog close handler 	
				$("#login-dialog").parent().find(".ui-dialog-titlebar a").on("click",function() {
					loginValidator.resetForm();
					_utils.resetForm('#login-form');
					$("#login-dialog" ).dialog("close");
				});

				// Privacy Statement Dialog handler @ socialLogin, to get socialLogin copy.
				$("#privacyNotice").on("click", function() {
					_dialogs.privacyStatement("socialLogin");
				});	
				
				if($('#login-dialog').is(":visible") == false){
					$('#login-dialog').show();
				}
			});
		}, 
		login : function(p){
			// Login + registratiion
			// Available params used in login - p.loginRedirectUrl - optional
			var self = this;
			$.get('/resources/desktop/template/login.template.html', function(template) {
				var templateContent = $(template).filter("#login-template").html();
				Mustache.parse(templateContent);
				var rendered = Mustache.render(templateContent);
				$("#login-dialog").html(rendered);
				//Read rememberme cookie for login and set username on login.
				var remember = $.cookie('pm[rememberme]');
				if (remember =="true") {
					$('#username').val($.cookie('pm[username]'));
					$('#remembermeCheckBox').attr("checked", true);
				}
				
				// forgotPassword dialog launch  
				$("#forgotPassword").on("click", function() {
					$("#login-dialog").dialog("close");
					self.forgotPassword();
				});
				
				// login-dialog dialog launch 
				$( "#login-dialog" ).dialog({
					autoOpen: true,
					height: 'auto',
					width: 'auto',
					maxWidth:910,
					modal: true,
					closeOnEscape:false,
					fluid:true,
					resizable:false,
				    open: function () {
						// front end validations
						_commands.linkLogin(p);

						$("#errorMask .message a").on('click', function(e){
				    		$("#login-dialog #errorMask").css("display","none");
				    		$( "#login-dialog" ).dialog("close");
						});
						//  IDX socailLogin command call @ provider: facebook
						$('#facebook').on("click",function() {
							eolIdx.socialLogin({provider: "facebook" });		    	  	
						});
						//  IDX socailLogin command call @ provider: twitter
						$('#twitter').on("click",function() {
							eolIdx.socialLogin({provider: "twitter" });
						});
						//  IDX socailLogin command call @ provider: googleplus
						$('#googleplus').on("click",function() {
							eolIdx.socialLogin({provider: "googleplus" });
						});
												    	
						var loginValidator = $("#login-form").validate();
						// Create Account dialog launch 
						$('#register').on("click",function() {					    		
							loginValidator.resetForm();
							$( "#login-dialog" ).dialog("close");
							self.register();
							// omniture tracking for registration start
							idx_tracking.trackRegStart('comment');
						});		    

						// login-dialog close handler 	
						$("#login-dialog").parent().find(".ui-dialog-titlebar a").on("click",function() {
							loginValidator.resetForm();
							_utils.resetForm('#login-form');
							$("#login-dialog" ).dialog("close");
						});

						// assumes no title will ever be present
						$("#login-dialog").parent().find(".ui-dialog-titlebar").on("mousedown",function() {
							$(this).children("a").trigger("click");
						});

						// Privacy Statement Dialog handler @ socialLogin, to get socialLogin copy.
						$("#privacyNotice").on("click", function() {
							_dialogs.privacyStatement("socialLogin");
						});
					}
				});
			});
		}, 
		loginOnly : function(p){
			// Login only modal, used in Sweepstakes pages
			// Available params used in login - p.loginRedirectUrl - optional
			var self = this;
			
			function openLoginDialog() {
				// login-dialog dialog launch 
				$( "#login-dialog" ).dialog({
					autoOpen: true,
					width: 'auto',
					modal: true,
					closeOnEscape:false,
					fluid:true,
					resizable:false,
					close: function(event, ui) {
						if( $("#confirmation").length && $("#confirmation").html() != "") {
							location.reload();
						} else {
							$(this).dialog('destroy');
							$("#sweepstakes-form").validate().resetForm();
							$("#login-dialog").validate().resetForm();
							grecaptcha.reset(recaptcha1);
							_utils.resetForm('#login-form');
							$("#sweepstakes-form input[type=submit]").removeAttr("disabled","true").removeClass("disabled");
							$("#sweepstakes-form .loader-icon").hide();
						}
					},
				    open: function () {
				    	if(!$("#login-dialog .g-recaptcha iframe").length) {
					    	recaptcha1 = grecaptcha.render('recaptcha-item-1', {
					            'sitekey' : '6LcubwMTAAAAAO_GOLKxKVvbCudISSGIDKdblDau',
					            'callback' : function() {
					            	$("#login-form").validate().element("#recaptcha");
					            }
					        });
				    	}
						$("#login-form").validate({
							  debug: true,
							  ignore: ":hidden:not(#recaptcha)",
					   		  rules: {
					   	            password: {
					   	                required: true,
					   	                minlength: 6
					   	            },
					   	            recaptcha: {
										check_recaptcha1: true
					   	            }
					   	        },
					   	        messages: {
					   	            password: {
					   	                required: "Please provide a password",
					   	                minlength: "Your password must be at least 5 characters long"
					   	            }
					   	        },			    	       
					   			success: function(label) {
					   				$(label).closest('.form-group').removeClass('has-error');
					   			},
					   	        submitHandler: function() {
					   	        	$("#login-submit").attr("disabled","true").addClass("disabled");
					   	        	$(".modal-dialog .loader-icon").show();
					        		eolIdx.sweepsManualLogin({
						  				username: $('#sweepstakes-form #email').val(),
						  				password: $('#login-form input#password').val()
					        		 });
						        }
					   	  	});
					}
				});
			}
			
			// only load in content in the dialog once to prevent errors in recaptcha
			if( $("#login-dialog").html() == "") {
				$.get('/resources/desktop/template/login.only.template.html').then(function(template) {
					var ractive = new Ractive({
						el: 'login-dialog',
						template: template,
						data: {
							email: $('#sweepstakes-form #email').val(),
							title: $(".title-section h1").html(),
							image: lightboxImg
						},
						complete: function() {
							console.log("ractive complete");
							openLoginDialog();
						}
					});	    
	
					$("#errorMask .message a").on('click', function(e){
						$("#login-dialog #errorMask").css("display","none");
			    		$( "#login-dialog" ).dialog("close");
					});
	
					// Privacy Statement Dialog handler @ socialLogin, to get socialLogin copy.
					$("#privacyNotice").on("click", function() {
						_dialogs.privacyStatement("socialLogin");
					});
					
					var remember = $.cookie('pm[rememberme]');
					if (remember =="true") {
						$('#username').val($.cookie('pm[username]'));
						$('#remembermeCheckBox').attr("checked", true);
					}
					
					// forgotPassword dialog launch  
					$("#forgotPassword").on("click", function() {
						$("#login-dialog").dialog("close");
						self.forgotPassword();
					});
					
				});
			} else {
				openLoginDialog();
				$("#login-email label").html($('#sweepstakes-form #email').val());
			}
		},
		registerSweeps : function(){
			// dependent on ractive, used in Sweepstakes Detail page
			var self = this;
			
			function openRegDialog() {

				$( "#register-dialog" ).dialog({
					  autoOpen: true, 
				      width: 'auto',
				      modal: true,
				      closeOnEscape:false,
				      fluid:true,
				      resize:'auto',
				      close: function(event, ui) {
				    	  if( $("#confirmation-reg").length && $("#confirmation-reg").html() != "") {
				    		  location.reload();
				    	  } else {
					    	  $(this).dialog('destroy');
					    	  $("#sweepstakes-form").validate().resetForm();
					    	  $("#register-dialog").validate().resetForm();
					    	  grecaptcha.reset(recaptcha2);
					    	  _utils.resetForm('#register-form');
					    	  $("#sweepstakes-form input[type=submit]").removeAttr("disabled","true").removeClass("disabled");
					    	  $("#sweepstakes-form .loader-icon").hide();
				    	  }
				      },
					  open: function () {
						  if(!$("#register-dialog .g-recaptcha iframe").length) {
					    	recaptcha2 = grecaptcha.render('recaptcha-item-2', {
					            'sitekey' : '6LcubwMTAAAAAO_GOLKxKVvbCudISSGIDKdblDau',
					            'callback' : function() {
					            	$("#register-form").validate().element("#reg_recaptcha");
					            }
					          });
						  }
						// Front End validations as per requirement page in wiki.
						$( "#register-form").validate({
							 focusInvalid: true,
							 debug : true,
							 ignore: ":hidden:not(#reg_recaptcha)",
							 rules: {
									 reg_username: {
										 required: true,
										 minlength: 6,
										 maxlength:15,
					   	                 check_username:true
									},
									reg_password: {
										required: true,
										minlength: 6,
										maxlength:24,
										check_password:true,
										notEqualTo:"#reg_username"
									},
									reg_password_confirm: {
										required: true,
										minlength: 6,
										maxlength:24,
										equalTo: "#reg_password"
									},
									reg_recaptcha: {
										check_recaptcha2: true
									},
									agree:{
										required:true
									}
							},
							messages: {
								reg_username: {
									required: "Please enter a username.",
									minlength: "Not enough characters. Please try again.",
								    maxlength: "Too many characters. Please try again.",
								    check_username :"One or more characters are invalid. Please try again."
								},
								reg_password: {
									required: "Please provide a password.",
									check_password:"One or more characters are invalid. Please try again.",
									minlength: "Not enough characters. Please try again.",
									maxlength: "Too many characters. Please try again.",
									notEqual:"Password must be different from username. Please try again."
								},
								reg_password_confirm: {
									required: "Please provide a password.",
									minlength: "Not enough characters. Please try again.",
									maxlength: "Too many characters. Please try again.",
									equalTo: "Password does not match. Please re-enter password."
								},
								agree: "The terms of service must be agreed to in order to create an account."
							},
							errorPlacement: function(error, element) {
						    	error.insertAfter($(element).parent());	
							},
				            // submitHanlder after all above validations are valid.
			   	            submitHandler: function() {
								console.log("form submitted");
				   	        	$("#reg-submit").attr("disabled","true").addClass("disabled");
								$(".modal-dialog .loader-icon").show();
		   	        		  	eolIdx.sweepsManualRegister({
									provider: "idx",								
									email : $('#sweepstakes-form #email').val(),
									username: $('input#reg_username').val(),
									password: $('input#reg_password').val(),
									dobmonth:$('#sweepstakes-form #month').val(),
			    	        		dobday:$('#sweepstakes-form #day').val(),
			    	        		dobyear:$('#sweepstakes-form #year').val(),
			    	        		newsletter:$('#newsletter').val(),
			    	        		sweepstakeId:$("#sweepsId").val()
								});
					   	        	
			   	        	}
				   	  	});
						 
					  }
				});
			}

			// only load in content in the dialog once to prevent errors in recaptcha
			if( $("#register-dialog").html() == "") {
				$.ajax('/resources/desktop/template/register.sweeps.template.html').then(function(template) {
					var ractive = new Ractive({
						el: 'register-dialog',
						template: template,
						data: {
							email: $('#sweepstakes-form #email').val(),
							title: $(".title-section h1").html(),
							image: lightboxImg
						},
						complete: function() {
							openRegDialog();
						}
					});
	
					$("#register-dialog #errorMask .message a").on('click', function(e){
			    		$("#register-dialog  #errorMask").css("display","none");
			    		$("#register-dialog" ).dialog("close");
					});
					 
					 // Privacy Statement Dialog handler @paramater register, to get register copy.
					 $("#privacyNotice").on("click", function() {
						 $("#privacy-statement").slideToggle();
						 $(this).toggleClass("active");
					 });
					
				});
			} else {
				openRegDialog();
			}
				
		},
		sweepsForm : function() {
			// Used in Sweepstakes Detail page
			var self = this;

			var ractive = new Ractive({
				el: '#error-dialog',
				template: '<div class="modal-dialog">{{{error}}}</div>',
				data: {error: ''}
			});
			
			// insert items into year select
			for (var i = new Date().getFullYear(); i > 1900; i--){
			    $('#year').append($('<option />').val(i).html(i));
			}
			
			$("#sweepstakes-form").validate({
				debug : true,
				ignore: ":hidden:not(select)",
				errorPlacement: function(error, element) {
					if (element.attr("name") == "fname" || element.attr("name") == "lname" ) {
						error.insertAfter("#lname");
					} else if (element.attr("name") == "city" || element.attr("name") == "state"  || element.attr("name") == "zip" ) {
						error.insertAfter("#zip");
					} else if (element.attr("name") == "month" || element.attr("name") == "day" || element.attr("name") == "year" ) {
						error.insertAfter("#year-button");
					} else if(element.attr("name") == "policy") {
						error.insertAfter("#sweepsId");
					} else {
						error.insertAfter(element);
					}
				},
			    focusInvalid: false,
			    invalidHandler: function(form, validator) {
			        if (!validator.numberOfInvalids()) {
			            return;
			        }
			        var firstError = $(validator.errorList[0].element);
			        // selects are stylized, so the original element is hidden
			        // assign it to the visible element for proper scrolling
			        if(firstError.is("select")) {
			        	firstError = firstError.next(".ui-selectmenu-button");
			        }
			        $('html, body').animate({
			        	// scroll to first error element, allow padding for fixed menu
			            scrollTop: firstError.offset().top - 65 
			        }, 500);
			    },
				rules : {
					email : {
						required: true,
						emailCheck: true,
						maxlength : 254
					},
					zip: {
						required: true,
						zipcode: true
					},
					phone: {
						required: true,
						check_phonenumber:true
					},
					fname: { required: true, },
					lname: { required: true, },
					address: { required: true, },
					city: { required: true, },
					state: { required: true, },
					day: { required: true, },
					month: { required: true, },
					year: { required: true, },
					policy: { required: true, }
				},
				messages: {
					fname: "Please enter your name",
					lname: "Please enter your name",
					email: {
						required: "Please enter an email address",
						email: "Email is invalid. Please try again.",
					},
					address: "Please enter a valid address.",
					city: "Please enter a valid city.",
					state: "Please select a state.",
					zip: "Please enter a valid zip code.",
					phone: "Please enter a valid phone number.",
					month: "Please enter month.",
					day: "Please enter day.",
					year: "Please enter year.",
					policy: "The terms of service must be agreed to in order to enter sweeptakes and create an account."
				},
				submitHandler: function(form) {
					var validAge = _utils.sweepsAgeValidator($(form).find('#month').val(),$(form).find('#day').val(),$(form).find('#year').val(), $(form).find("#age-restriction").val());
					if(validAge){
                        idx_tracking.trackSweepsClickSubmit($("#sweeps-title").html(),window.location.href,"button",$("#submit").val());
						$("#sweepstakes-form input[type=submit]").attr("disabled","true").addClass("disabled");
						$("#sweepstakes-form .loader-icon").show();
						eolIdx.testUsername($(form).find("#email").val());
					} else {
						var minAge = parseInt($("#age-restriction").val());
						var errorMsg = "Sorry, we are unable to process your registration.";
						if(minAge >= 18) {
							errorMsg = "Sorry, we are unable to process your registration, you must be "+minAge+" or older to enter this sweepstakes.";
						}
						ractive.set('error','<p>'+errorMsg+'</p><a href="#">Close</a>');
						$("#error-dialog").dialog({
							modal:true,
							open: function(event, ui) {
								$("#error-dialog").parents(".ui-dialog").find(".ui-dialog-titlebar-close").hide();
								$("body").on("click","#error-dialog a",function() {
									$("#error-dialog").dialog( "close" );
									return false;
								});
							}
						});
					}
					
				}
			});
		},
		sendEmail : function() {
			$.ajax('/resources/desktop/template/send.email.template.html').then(function(template) {
				var emailUrl, emailDescription;
				if($("#sweeps-success-page").length) {
					emailUrl =idxConfig.baseUrl+"/sweepstakes/"+$("#sweepsId").val();
					emailDescription = $("#description").val();
				} else {
					emailUrl = window.location.href;
					emailDescription = $(".title-section p").html();
				}
				var ractive = new Ractive({
					el: 'email-lightbox-confirmation',
					template: template,
					data: {
						title: $(".title-section h1").html(),
						url: emailUrl,
						thumbnail: $(".banner img").attr("src"),
						description: emailDescription
					},
					complete: function() {
						$("#email-lightbox-confirmation").dialog({
							  autoOpen: true, 
						      width: 'auto',
						      modal: true,
						      closeOnEscape:false,
						      fluid:true,
						      resize:'auto',
							  open: function () {
								$(this).parent(".ui-dialog").find(".ui-dialog-titlebar-close").show();
								$( "#email-form").validate({
									 focusInvalid: true,
									 debug : true,
									 rules: {
										 	fromEmail: {
												required: true,
												email: true
											},
											toEmail: {
												required: true,
												email: true
											}
									},
									messages: {
										fromEmail: {
											required: "Invalid email. Please enter a valid email address."
										},
										toEmail: {
											required: "Invalid email. Please enter a valid email address."
										},
									},
					   	            submitHandler: function() {
										var formJson = {};
										$("#email-lightbox-confirmation form").find(':input').each(function() {
											if (this.name) {
												formJson[this.name] = this.value;
											}
										});
										var strFormData = JSON.stringify(formJson);
										var emailSubmitUrl = (idxConfig.hostname == "members.eonline.com" ? "https://www.eonline.com" : "http://www.test.eonline.com");
										$.ajax({
											"type": "post",
											"dataType": "json",
											"contentType": "application/json",
											"cache": "false",
											"url": emailSubmitUrl + "/mvc/hudson/mail/send",
											"data": strFormData
										}).done(function(data) {
											$("#email-lightbox-confirmation .email-wrapper").hide();
											$("#email-lightbox-confirmation .shared-wrapper").show();
										});
					   	        	}
						   	  	});
								 
							  }
						});
						
					}
				});
			});

		},
		showSimpleMessage : function(p){
			var defaultSettings = {el : "messageDialog", title : "", message : "", buttonText : "Done", doneCallback : null, closeDialog : true, closeFunction : null }
			var settings = $.extend({}, defaultSettings, p);

			$.get('/resources/desktop/template/simple.message.template.html', function(template) {
				var templateContent = $(template).filter("#simple-message-template").html();
				Mustache.parse(templateContent);
				var rendered = Mustache.render(templateContent,{"title":settings.title,"message":settings.message,"button":settings.buttonText});
				$("#"+ settings.el).html(rendered);
				$("#"+ settings.el).dialog({
					  autoOpen: true, 
					  height: 'auto',
				      width: 'auto',
				      modal: true,
				      closeOnEscape:false,
				      fluid:true,
				      resize:'auto',
				      close: function(event,ui) {
				    	  if(typeof settings.closeFunction == "function"){
				    		  settings.closeFunction();
				    	  }
				      },
				      open:function(){
				      	var self = $(this);
				    	  $("#"+settings.el+" #sm-submit").on('click', function(e){
				    	  	e.preventDefault();
				    	  	if(settings.closeDialog){
								self.dialog("close");
				    	  	}
							if(typeof settings.doneCallback == "function"){
								settings.doneCallback();
							}
				    	  });
				      }
				});  
			});
		},
		forgotPassword : function(){
			$.get('/resources/desktop/template/forgot.password.template.html', function(template) {
				var templateContent = $(template).filter("#forgot-password-template").html();
				Mustache.parse(templateContent);
				var rendered = Mustache.render(templateContent,{loginReturn:true});
				$("#forgotPassword-dialog").html(rendered);

				$("#forgotPassword-dialog #backToLogin").on("click", function() {
					$("#forgotPassword-dialog").dialog("close");
					$("#login-dialog").dialog("open");
				});

				$("#forgotPassword-dialog" ).dialog({
				  autoOpen: true, 
				  height: 'auto',
			      width: 'auto',
			      modal: true,
			      closeOnEscape:false,
			      fluid:true,
			      resize:'auto',
			      open: function(){
			      		$("#forgot-password-form").validate({
			      		  debug : true,
			    		  rules: {
			    			  "forgot-password-email": {
								required: true,
								email: true,
								maxlength:254
								}			    	            
			    	        },		    	        
			    	        // Specify the validation error messages
			    	        messages: {
			    	            email: "Please provide a username or email"
			    	        },			    	       
			    			success: function(label) {
			    			},
			    			errorPlacement: function(error, element) {
			    				$(element).parent().next('.form-element-error').append(error);
								 $(error).css("display","block");
							     $(".backToLogin").css('display', 'block');					
							},
			    	        submitHandler: function() {
			    	        	$("#forgotPassword-dialog").dialog("close");
			    	        	eolIdx.forgotPassword($("#forgot-password-email").val(),
				    	        	function() {
				    	        		_dialogs.showSimpleMessage({title : "Reset Password Email Has Been Sent.", message : "Please Check Your Email"});
				    	        	},
				    	        	function() {
				    	        		_dialogs.showSimpleMessage({title : "Reset Password Error.", message : "Please Check The Email You've Entered"});
				    	        	}
				    	        );
			    	        }
				    	});

			    	  $("#forgotPassword-dialog .modal-dialog .button").click(function(e) {
			    		  $( "#forgotPassword-dialog" ).dialog("close");
			    	  });
			    	  
				    	$(".backToLogin a").on('click', function(e) {
						  _utils.resetForm('#forgot-password-form');
						  $( "#forgotPassword-dialog" ).dialog("close");
						  $("#login-dialog" ).dialog("open");
						});
			      	}
				});  
			});
		},
		socialLinkFailure : function(p){
			$.get('/resources/desktop/template/social-link-failure.template.html', function(template) {
				
				var rendered,templateContent;
				/*Social Account already linked to another EOL Account*/
				if(p.errorCode == 25 || p.errorCode == 45){
					templateContent = $(template).filter("#social-link-already-failure-template").html();
					Mustache.parse(templateContent);
					rendered = Mustache.render(templateContent,
					{
						title:"Social Account Already Linked"
					});
				}
				else {
					// Error 5
					templateContent = $(template).filter("#social-link-failure-template").html();
					Mustache.parse(templateContent);
					rendered = Mustache.render(templateContent,
					{
						title:"Social Link Failure", 
						message:"There is a problem linking to your social account, Please try again"
					});
				}

				// For account settings 
				if($('.loader-icon').is(':visible')){
					$('.loader-icon').hide();	
				}				
				
				$("#social-link-failure-dialog").html(rendered);
			
				$( "#social-link-failure-dialog" ).dialog({
					  autoOpen: true, 
					  height: 'auto',
				      width: '280px',
				      modal: true,
				      closeOnEscape:false,
				      fluid:true,
				      resize:'auto',
				      open:function(){
				    	  $("#social-link-failure-dialog .modal-dialog .button").click(function(e) {
				    		  $( "#social-link-failure-dialog" ).dialog("close");
				    	  });
				      }
				});  
			});
		}, 
		closeLoginIfOpen : function(){
			if ($("#login-dialog").hasClass('ui-dialog-content')) {
				if($('#login-dialog').dialog( "isOpen" )){
					$('#login-dialog').dialog("close");
					$('#error-info').css('display', 'none');
				}
			}
		}
	};

	/*======================================*/
	/*=====| BEGIN MEDIATOR FUNCTIONS |=====*/
	/*======================================*/
	// Depending on context, will mediate to appropriate events / methods 

	var _idxMediator = {
		// alias Thyme login func used to log into idx
		loginToThyme : function(idxUser){}, 
		// alias Thyme logout func used to log out of idx
		logoutFromThyme : function(idxUser){},
		registerCallbacksfromThyme : function(login, logout){
			// Used in eolIdx to assign the Thyme functions necesary to login and logout
			/* Thyme.js will Register IDX login user info with Thyme */
			if(typeof login === "function") { 
				this.loginToThyme = login;
			}
			/* Thyme will Register logout function */
			if(typeof logout === "function"){
				this.logoutFromThyme = logout;
			}
		},
		initLoginDialog : function(p){
			// p.loginRedirectUrl
			console.log('initLoginDialog:');
			if (_utils.isIE() > 0 && _utils.isIE() < 9) {
				// show reject message if IE8 or below
				$.reject({  
			        reject: { msie: 8 },
			        additionalMessage: 'To post your comment, please upgrade.'
				});
			} else {
				_dialogs.login(p);
			}			
		},
		loginSuccessEvent : function(r,p){
			console.log('loginSuccessEvent:');
			_utils.resetForm('#login-form'); // For Manual Login - Previously in eventHandler.manualLoginSuccessEvent

			console.log(r);
			console.log(p);
			_dialogs.closeLoginIfOpen();

			// omniture tracking for login event
			// if p.provider is 'eol', then it is not a social login
			idx_tracking.trackLogin('comment',p.id,p.provider != 'eol');
			
			this.loginToThyme({idxId:p.id,uidSignature:p.gigyaUser.UIDSignature,signatureTimestamp:p.gigyaUser.signatureTimestamp,displayName:p.username,provider:p.provider});

			if(typeof p.loginRedirectUrl !== "undefined") { 
				console.log('loginRedirectUrl: '+ p.loginRedirectUrl);
				window.location.href = p.loginRedirectUrl;
			}
			else if(!idxConfig.isThymeContext){
				if(r.data != null && $.inArray('EOL', r.data.brand_data.memberTypes) > -1) {
					console.log('userSettingsUri: '+ idxConfig.userSettingUri);
					window.location.href = idxConfig.userSettingUri;
				}
				else {
					console.log('defaultUri');
					window.location.href = idxConfig.defaultUri;
				}
			}
			else { 
				console.log('Other url');
				setTimeout(function() { location.reload(); }, 3000);
			}
			
		},
		logoutSuccessEvent : function(r,p){
			console.log('logoutSuccessEvent:');

			// Empty out input fields
			$('#login-form input#username').val('');
			$('#login-form input#password').val('');
			
			if(this.logoutFromThyme){
				this.logoutFromThyme({idxId:p.id,displayName:p.username});
			}

			if(!idxConfig.isThymeContext) {
				window.location.href = idxConfig.defaultUri;
			}
			else { 
				location.reload();
			}
		},
		registerManualUserSuccessEvent : function(r,p){
			console.log('registerManualUserSuccessEvent - User Registration Success');
			console.log(r);
			console.log(p);
			
			if($("#register-dialog").dialog("isOpen")){
				$("#register-dialog").dialog("close");
			}
			// omniture tracking for registration complete
			idx_tracking.trackRegEnd('comment',p.id);
			/*TH-7 (Lightbox) Thank You For Creating An Account- After Registration Confirmation*/
			_dialogs.registerConfirmation(r,p);
		}, 
		registerManualUserFailureEvent : function(r,p){
			console.log('registerManualUserFailureEvent:');
			console.log(r);
			console.log(p);
			if($("#reg-submit").length) {
				$("#reg-submit").removeAttr("disabled","true").removeClass("disabled");
				$("#register-form .loader-icon").hide();
			}
			var registervalidator = $( "#register-dialog #register-form" ).validate();
			var messages = r.status.fieldMessages;
			switch(r.status.code){
				/* Error-code 406: validation error messages(Email,Username,password and DOB)*/
				case 406:{
					if(messages){
						$.each(messages, function (key,value){					
							if(key == "address"){						
								registervalidator.showErrors({
									reg_email:value
								});
							}					
							else if(key == "username"){
								registervalidator.showErrors({					
									reg_username:value
								});
							}
							else if(key == "password"){
								registervalidator.showErrors({					
									reg_password:value
								});
							}
							else if(key == "birthdate"){
								if(value == "User must be 13 years or older"){
									_dialogs.showErrorMask();
								}else{
									registervalidator.showErrors({					
										year:value
									});
								}
							}
						});
					}
				}
			    break;
				/* Error-code 409: validations - Username and email is already registered*/
				case 409:
				    {
				    	if(messages){
							$.each(messages, function (key,value){					
								if(key == "address"){
									registervalidator.showErrors({					
										reg_email:value +". Please try again or <a id='gotoLogin'>Go to Login </a>"
									});
									
									$("label[for='reg_email'] #gotoLogin").on('click', function(e) {
										  $( "#register-dialog" ).dialog("close");
										  $("#login-dialog" ).dialog("open");
									});
								}
								else if(key == "username"){
									registervalidator.showErrors({					
										reg_username:value
									});
								}					
							});
						}
				    }
				break;
				default: {
				    // general Error Dialog
				    _dialogs.showErrorMask();
				}
			}
		}, 
		manualLoginFailureEvent : function(r,p){
			console.log('manualLoginFailureEvent:');
			console.log(r);
			console.log(p);

			if($("#login-submit").length) {
				$("#login-submit").removeAttr("disabled","true").removeClass("disabled");
				$("#login-form .loader-icon").hide();
			}
			var validator = $( "#login-form" ).validate();
			var messages = r.status.fieldMessages;
			
			if(r.status.code =="404"){
				if(messages){
					$.each(messages, function (key,value){
						console.log('Failure message : ' + value);
						if(key=="id"){
							validator.showErrors({					
								username:value
							});
						}
						else {
							validator.showErrors({					
								password:value
							});
						}
					});
				}
			} 
			else if(r.status.code =="406") {
				// unable to login since the account is not confirmed yet.
				$("#errorNotActivatedMask .message a").on('click', function(e){
		    		$("#login-dialog #errorNotActivatedMask").css("display","none");
		    		$( "#login-dialog" ).dialog("close");
				});
		   		$("#login-dialog #errorNotActivatedMask").parent().css("width",$( "#login-dialog" ).width);
		   		$("#login-dialog #errorNotActivatedMask").parent().css("height", $( "#login-dialog" ).height);
		   		$("#login-dialog #errorNotActivatedMask").parent().css("top",$( "#login-dialog" ).top);;
		   		$("#login-dialog #errorNotActivatedMask").parent().find('.ui-dialog-titlebar a' ).css("display","none");
		   		$("#login-dialog #errorNotActivatedMask").css("display","inline");
			}
			else{
					// Failure errors- 500/ server down errors			
		   		$("#errorMask .message a").on('click', function(e){
		    		$("#login-dialog #errorMask").css("display","none");
		    		$( "#login-dialog" ).dialog("close")
				});

				_dialogs.loginError();

			}			
		}, 
		sweepsUsernameTestEvent : function(r,p){
			console.log('sweepsUsernameTestEvent:');
			console.log(r);
			console.log(p);

			var messages = r.status.fieldMessages;
			
			if(r.status.code =="404"){
				if(messages){
					$.each(messages, function (key,value){
						console.log('Failure message : ' + value);
						if(key=="id"){
							idxPocEvents.dialogs.registerSweeps();
						}
						else {
							idxPocEvents.dialogs.loginOnly();
						}
					});
				}
			} 
			else if(r.status.code =="406") {
				// unable to login since the account is not confirmed yet.
				idxPocEvents.dialogs.loginOnly();
			} else if(p.errorCode == 10) {
				idxPocEvents.dialogs.loginOnly();
			}
			else{
				idxPocEvents.dialogs.registerSweeps();
			}			
		}, 
		sweepsLoginRegisterSuccessEvent : function(r,p){
			console.log(r);
			console.log(p);
			console.log(p.type);

			var sweepsId = $("#sweepstakes-form #sweepsId").val();
			sweepsValidateParams = {
				sweepstakesId: sweepsId,
				email: $("#sweepstakes-form #email").val(),
				g_recaptcha_response: ""
			};
			
			if(p.type == "register") {
				// omniture tracking for registration complete
				idx_tracking.trackSweepsRegStart('sweepstakes',$("#sweeps-title").html());
				sweepsValidateParams.g_recaptcha_response = grecaptcha.getResponse(recaptcha2);
			} else {
				// omniture tracking for login event
				idx_tracking.trackSweepsLogin('sweepstakes',p.id,$("#sweeps-title").html());
				this.loginToThyme({idxId:p.id,uidSignature:p.gigyaUser.UIDSignature,signatureTimestamp:p.gigyaUser.signatureTimestamp,displayName:p.username,provider:p.provider});
				sweepsValidateParams.g_recaptcha_response = grecaptcha.getResponse(recaptcha1);
			}
			var sweepsUrl = idxConfig.baseUrl + "/mvc/sweepstakes/"+sweepsId+"/validEntry";
		  
			$.ajax({url: sweepsUrl,
				type: 'GET',
				contentType: 'application/json',
				dataType: 'json',
				data: sweepsValidateParams,
				error: function(err){
					console.log("error connecting to validation");
					var ractive = new Ractive({
						el: '#error-dialog',
						template: '<div class="modal-dialog"><p>{{{error}}}</p></div>',
						data: {error: "ERROR<br>Unable to process submission."},
						complete: function() {
							$("#error-dialog").dialog({
								modal:true,
								close: function (event, ui) {
									$("#login-form button").removeAttr("disabled","true").removeClass("disabled");
									$("#login-form .loader-icon").hide();
									$("#register-form button").removeAttr("disabled","true").removeClass("disabled");
									$("#register-form .loader-icon").hide();
									$("#login-dialog").dialog("close");
									$("#register-dialog").dialog("close");
								}
							});
						}
					});
				},
				success: function(r){
					if(r.status.code == 200){
						var sponsorValues = "sponsor1 = "+$('#rundown').is(':checked');
						$(".optIns").each(function() {
							sponsorValues += ", "+$(this).attr("name")+" = "+$(this).is(":checked");
						});
						
						var sweepsData = {
    						gigyaId: p.id,
    						ts: p.gigyaUser.signatureTimestamp,
    						signed: p.gigyaUser.UIDSignature,
    						sweepstakesId: sweepsId,
    						email: $("#sweepstakes-form #email").val(),
    						firstName: $("#sweepstakes-form #fname").val(),
    						lastName: $("#sweepstakes-form #lname").val(),
    						address1: $("#sweepstakes-form #address").val(),
    						address2: $("#sweepstakes-form #address2").val(),
    						city: $("#sweepstakes-form #city").val(),
    						state: $("#sweepstakes-form #state").val(),
    						zip: $("#sweepstakes-form #zip").val(),
    						phone: $("#sweepstakes-form #phone").val().replace(/[-.()\s]/g,""),
    						dob: $("#sweepstakes-form #year").val()+"-"+$("#sweepstakes-form #month").val()+"-"+$("#sweepstakes-form #day").val(),
    						optIn: sponsorValues
	    				}

						if($('#sweepstakes-form input[name=gender]:checked').length) {
							sweepsData.gender = $('#sweepstakes-form input[name=gender]:checked').val();
						}
						
						eolIdx.sweepstakesSubmit(sweepsData, p.type);
					} else {
						console.log("sweepstakes validation failed");
						var ractive = new Ractive({
							el: '#error-dialog',
							template: '<div class="modal-dialog"><p>{{error}}</p></div>',
							data: {error: 'Sorry, we are unable to process your sweepstakes submission'}
						});		
						if(r.status.code == 400){
							ractive.set('error','Sorry, your submission limit has been reached. Your sweepstakes submission was not processed.');
						}	
						$("#error-dialog").dialog({
							modal:true,
							close: function (event, ui) {
								$("#login-form button").removeAttr("disabled","true").removeClass("disabled");
								$("#login-form .loader-icon").hide();
								$("#register-form button").removeAttr("disabled","true").removeClass("disabled");
								$("#register-form .loader-icon").hide();
								$("#login-dialog").dialog("close");
								$("#register-dialog").dialog("close");
							}
						});
	
					}
				}
			});
			  
		}, 
		sweepsFailureEvent : function(r,p){
			console.log('sweepsFailureEvent:');
			console.log(r);
			console.log(p);
			
			if ($("#login-dialog").hasClass('ui-dialog-content')) {
				$("#login-dialog").dialog("close");
			}
			if ($("#register-dialog").hasClass('ui-dialog-content')) {
				$("#register-dialog").dialog("close");
			}
			
			var ractive = new Ractive({
				el: '#error-dialog',
				template: '<div class="modal-dialog"><p>{{error}}</p></div>',
				data: {error: "ERROR: " + p.errorMessage + ". Unable to process submission."},
				complete: function() {
					$("#error-dialog").dialog({
						modal:true
					});
				}
			});
		},
		sweepsSuccessEvent : function(r) {
			console.log('sweepsSuccessEvent:');
			console.log(r);
			
			idx_tracking.trackSweepsSuccess($("#sweeps-title").html());
			grecaptcha.reset();
			$(".modal-dialog form").hide();
			if(r == "login") {
				$(".modal-dialog .form-menu .complete").addClass("active");
			}
			$("#modal-container").on("click","#confirm-btn",function() {
				document.location.reload();
			});
			
			/*
			function urlShortener(strLongUrl) {
				$.getJSON("/mvc/shorturl?url=" + strLongUrl, function(data) {
						shortenedUrl = data.rawResponse;
					}
				);
			}
			*/
			
			var encodedShareURL = encodeURI(window.location.href);
			$("#modal-container").on("click",".g-icon a",function() {
				window.open('https://plus.google.com/share?url=' +  encodedShareURL,  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
				return false;
			});
			$("#modal-container").on("click",".fb-icon a",function() {
				FB.ui({
				    method: 'feed',
				    link: encodedShareURL
				});
				return false;
			});
			$("#modal-container").on("click",".tw-icon a",function() {
				var tweeturl = 'http://twitter.com/intent/tweet?url=' + encodedShareURL + '&via=eonline&text=' + encodeURIComponent($(".title-section h1").html());
				window.open(tweeturl, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
				return false;
			});
			$("#modal-container").on("click",".email-icon a",function() {
				idxPocEvents.dialogs.sendEmail();
				return false;
			});
			
			var confirmTitle, confirmDescription, confirmationDiv;
			if(r == "login") {
				confirmTitle = "Success!";
				confirmDescription = "You have been entered into the sweepstakes";
				confirmationDiv = "confirmation";
			} else {
				confirmTitle = "You Have One More Step!";
				confirmDescription = "Please check your email to <br>activate your account";
				confirmationDiv = "confirmation-reg";
			}
			$("#modal-container").append("<div id='"+confirmationDiv+"'></div>");
			
			$.get('/resources/desktop/template/sweeps.confirm.template.html').then(function(template) {
				var ractive = new Ractive({
					el: confirmationDiv,
					template: template,
					data: {
						sweepsId: $("#sweepstakes-form #sweepsId").val(),
						title: confirmTitle,
						description: confirmDescription,
						showAll: $("#social-showall").val() == 'true', // need to convert to boolean for ractive conditional
						showFb: $("#social-fb").val() == 'true',
						showGp: $("#social-gp").val() == 'true',
						showTw: $("#social-tw").val() == 'true',
						showEm: $("#social-em").val() == 'true'
					}
				});	   
			});
		},
		manualLinkSuccessEvent : function(p, successCb){
			console.log('manualLinkSuccessEvent: ' + p.provider);
			if(p.provider == "facebook"){
				$('.social_icons .sc-fb').addClass('linked');
			  // Disable click
			  $('.social_icons .sc-fb').off();
			  $('.social_icons .sc-fb button').text('Linked');
			  $('.social_icons .sc-item .sc-fb button').css('background','#506ba3');
			}
			else if(p.provider == "twitter") { 
				$('.social_icons .sc-tb').off();
				$('.social_icons .sc-tb').addClass('linked');
	  			$('.social_icons .sc-tb button').text('Linked');
	  			$('.social_icons .sc-item .sc-tb button').css('background','#45c0f1');
  			}
  			else if(p.provider == "googleplus") {
  				$('.social_icons .sc-gb').off();
  				$('.social_icons .sc-gb').addClass('linked');
  				$('.social_icons .sc-gb button').text('Linked');
  				$('.social_icons .sc-item .sc-gb button').css('background','#e16556');
  			}
  			// Needed for user settings linking using ractive
  			if(typeof successCb == "function"){
  				successCb();
  			}
		},
		failureEvent : function(r,p){
			// r is needed in mobile even if not used in desktop DO NOT REMOVE FROM PARAM
			console.log('--------- In failureEvent ---------');

			// Previously logoutFailureEvent & manualUnlinkFailureEvent
			if(typeof p.errorMessage !== "undefined" && p.debugMsg == true) {
				console.log(p.errorMessage);
			}
			
			if(typeof p.debugMsg == "undefined" || p.debugMsg == false){
				console.log(p.provider);
				console.log(p.errorMessage);
				console.log(p.errorCode);

				if(p.errorCode == 5 || p.errorCode == 25 || p.errorCode == 45){
					// Gigya Get User Failure ||  Idx link - user already registered || invalid idx id
					_dialogs.socialLinkFailure(p);
				}
				else if(p.errorCode == 40) {
					//this error code indicates the user canceled their oauth attempt to login
					_dialogs.closeLoginIfOpen();
				}
				else {
				 	// Error 10, 20,
				 	console.log('Not in error 40 - Gigya');
					$("#errorMask .message a").on('click', function(e){
						_dialogs.closeLoginIfOpen();
					});

					_dialogs.loginError();
				}
			}
		}, 
		init : function(settings){
			// Set idx configurations to the local scope
			idxConfig = settings.idxConfig;
			// 
			_utils.addValidators();

			$(window).resize(function(){
				 _utils.fluidDialog();
			});
			
			$(document).on("dialogopen", ".ui-dialog", function (event, ui) {
			    _utils.fluidDialog();
			});
		}
	};

	/*=====================================================================*/
	/*===================| BEGIN REVEALING MODULES |=======================*/
	/*=====================================================================*/
	// Wrapped in funcs to keep "this" context refering to the _private objs
	/*=====================================================================*/

	var init = function(settings){
		_idxMediator.init(settings);
	};
	var registerCallbacksfromThyme = function(login, logout){
		_idxMediator.registerCallbacksfromThyme(login, logout); // Used by thyme.js
	};
	var loginSuccessEvent = function(r,p){
		// For Social + Manual Logins
		_idxMediator.loginSuccessEvent(r,p);
	};
	var logoutSuccessEvent = function(r,p){
		_idxMediator.logoutSuccessEvent(r,p);
	};
	var initLoginDialog = function(p){
		_idxMediator.initLoginDialog(p); // Used by thyme.js
	};
	var linkLogin = function(p){
		_commands.linkLogin(p);
	};
	var registerManualUserFailureEvent = function(r,p){
		_idxMediator.registerManualUserFailureEvent(r,p);
	};
	var registerManualUserSuccessEvent = function(r,p){
		_idxMediator.registerManualUserSuccessEvent(r,p);
	};
	var manualLoginFailureEvent = function(r,p){
		_idxMediator.manualLoginFailureEvent(r,p);
	};
	var sweepsUsernameTestEvent = function(r,p){
		_idxMediator.sweepsUsernameTestEvent(r,p);
	};
	var sweepsFailureEvent = function(r,p){
		_idxMediator.sweepsFailureEvent(r,p);
	};
	var sweepsSuccessEvent = function(r){
		_idxMediator.sweepsSuccessEvent(r);
	};
	var sweepsLoginRegisterSuccessEvent = function(r,p){
		_idxMediator.sweepsLoginRegisterSuccessEvent(r,p);
	};
	var manualUnlinkSuccessEvent = function(r,p, successCb){
		_commands.manualUnlinkSuccessEvent(r,p, successCb);
	};
	var manualLinkSuccessEvent = function(p, successCb){
		_idxMediator.manualLinkSuccessEvent(p, successCb);
	};
	var failureEvent = function(r,p){
		_idxMediator.failureEvent(r,p);
	};
	var resendEmail = function(p){
		_commands.resendEmail(p);
	}
	var dialogs = (function(){
		return _dialogs;
	})();

	return {
		init : init,
		registerCallbacksfromThyme : registerCallbacksfromThyme, // Used by thyme.js
		initLoginDialog : initLoginDialog, // Used by thyme.js
		linkLogin : linkLogin,
		loginSuccessEvent : loginSuccessEvent,
		logoutSuccessEvent : logoutSuccessEvent,
		registerManualUserFailureEvent: registerManualUserFailureEvent,
		registerManualUserSuccessEvent : registerManualUserSuccessEvent,
		manualLoginFailureEvent: manualLoginFailureEvent,
		sweepsUsernameTestEvent: sweepsUsernameTestEvent,
		sweepsFailureEvent: sweepsFailureEvent,
		sweepsSuccessEvent: sweepsSuccessEvent,
		sweepsLoginRegisterSuccessEvent : sweepsLoginRegisterSuccessEvent,
		manualLinkSuccessEvent : manualLinkSuccessEvent,
		manualUnlinkSuccessEvent : manualUnlinkSuccessEvent,
		failureEvent : failureEvent, // Gigya + Generic failures
		resendEmail : resendEmail,
		dialogs :  dialogs
	};
	
})(jQuery);