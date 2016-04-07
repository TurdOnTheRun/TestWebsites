/**
    @namespace idx
    @name page    
    @description IDX Integration functions
    
    @author oliver.eberle
    @author ken.mcafee
    
    Global parameter Reference:
    
    p stands for json parameter object
    r stands for json return object, typcially and api response 
    m stands for a json member object
    cb is the placeholder for a callback function to call
    id stand for the idx id of the member
    
    Any other variable names should be self-explanatory.
*/

var eolIdx =(function($) {

	/**
	 * Global vars
	 */
	var idxConfig;
	var DEBUG = true;
	var api;
	var sweepsApi;
	
	//Handle All UI Related Events
	var eventHandler;
	
	
	//handle ios8 oauth page close issue
	window._open = window.open; // saving original function
	//Override the function
	window.open = function(url,name,params) {
	    var new_window = window._open(url,name,params);
	    if (typeof onWindowOpen === "function") {
	        onWindowOpen(url, name, params, new_window);
	    }
	    return new_window;
	};

	var openedWindows = [];
	var fbWindows = [];
	
	/**
	 * tracks opened windows by oauth
	 * @param url
	 * @param name
	 * @param params
	 * @param new_window
	 * @returns
	 */
	function onWindowOpen(url, name, params, new_window) {
		if(url.indexOf('socialize.US1.gigya') > -1 ||
				url.indexOf('socialize.login') > -1 ||
				url.indexOf('login.eonline.com') > -1) {
	        fbWindows.push(new_window);
	    }
	    openedWindows.push(new_window);
	}
	
	/**
	 * @memberOf idx
	 */
	function init(idxConfigObj){

		api = "/mvc/member";
		idxConfig = idxConfigObj;
		api = idxConfig.baseUrl + api;
		sweepsApi = idxConfig.baseUrl + "/mvc/sweepstakes";
		
		if(typeof idxPocEvents !== "undefined"){
			eventHandler = idxPocEvents; // idxPocEvenys
			eventHandler.init({idxConfig : idxConfigObj});
		}
		else { 
			console.log('Unable to load idxPocEvents');
		}
	}
	

	/***
	 * Create EOL Member Manually. 
	 * 
	 */
	function createIdxUser(username, email, password ,dobday ,dobmonth ,dobyear ,firstname ,lastname ,gender, zip, newsletter, sweepstakeId) { 
		var m = {};
		
		m.username = username;
		m.provider = 'eol';
		m.email =email;
		if(password) { 
			m.password = password; 
		}
		
		if(dobday && dobmonth && dobyear){
			m.dob =dobyear+'-'+dobmonth+'-'+dobday;
		}
		
		if(firstname){
			m.firstname =firstname;
		}
		
		if(lastname){
			m.lastname =lastname;
		}
		
		if(zip){
			m.zip=zip;
		}
		
		if(gender){
			m.gender =gender;
		}
		if(newsletter){
			m.newsletter = newsletter;
		}
		if(sweepstakeId){
			m.sweepstakeId = sweepstakeId;
		}
		return m;	
	}

	/**
	 * Create member object from Gigya response 
	 * 
	 * @memberOf idx
	 */
	function createMemberFromSocialIdentity(r) {
		var i = r.user.identities[r.requestParams.provider];
		
		var m = { };
		
		m.id = r.user.UID;
		
		m.ts = r.user.signatureTimestamp;
		
		m.signed = r.user.UIDSignature;
		
		m.pid = i.providerUID;
		
		m.provider = i.provider;
		
		if(i.email) {
			m.email = i.email;
		}
		
		if(i.gender) {
			m.gender = i.gender;
		}
		
		if(i.birthDay){
			m.dob = i.birthYear+'-'+i.birthMonth+'-'+i.birthDay;
		}
		
		if(i.firstName) {
			m.firstname = i.firstName;
		}
		if(i.lastName) {
			m.lastname = i.lastName;
		}
		if(i.zip) {
			m.zip = i.zip;
		}

		return m;
	}
	
	/**
	 * Create EOL member from Gigya response 
	 * 	 * 
	 * email and username should be required, but no errors are
	 * currently thrown from this function.  
	 * 
	 * @memberOf idx
	 */
	function createSocialUser(r, username, email, password, dobday ,dobmonth ,dobyear ,firstname ,lastname ,gender, zip){
		var i = r.identities[r.loginProvider];
		
		var m = { };
		m.username = username;
		
		m.provider = r.loginProvider;
		
		m.pid =r.identities[r.loginProvider].providerUID;
		
		m.id = r.UID;
		
		m.ts = r.signatureTimestamp;
		
		m.signed = r.UIDSignature;
		
		if (email) { 
			m.email=email; 
		}
		// optional
		if(password) { 
			m.password = password; 
		}
		
		if(i.firstName){
			m.firstname = i.firstName;
		}else if(firstname){
			m.firstname = firstName;
		}
		
		if(i.lastName){
			m.lastname = i.lastName;
		}else if(lastname){
			m.lastname = i.lastname;
		}
		
		if(i.gender.length>0){
			m.gender=i.gender;
		}else if(gender && gender.length>0){
			m.gender = gender;
		}

		if(i.birthDay){
			m.birthDate = i.birthYear+'-'+i.birthMonth+'-'+i.birthDay;
		}else if(dobday && dobmonth && dobyear){
			m.dob =dobyear+'-'+dobmonth+'-'+dobday;
		}
		
		if(zip){
			m.zip=zip;
		}

		return m;
	}

	/**
	 * Called to get the current user if logged in from Gigya. If the call to gigya is successful, 
	 * the callback (cb) is called with the following 'Callback Response Parameters'. If the user 
	 * is not logged in the response will come back empty. The error callback is called if gigya 
	 * fails or responds with an error.
	 */
	function getUser(cb, ecb) {
		gigya.socialize.getUserInfo({callback:function(r) { 
			if(r.errorCode==0) {
				
				if(cb) {
					var provider = "";
					
					if(r.user.isLoggedIn) {
						provider = (r.user.loginProvider != null && r.user.loginProvider.length > 0 ? r.user.loginProvider : 'eol');
						cb({
							idxId: r.user.UID,
							uidSignature: r.user.UIDSignature,
							signatureTimestamp: r.user.signatureTimestamp,
							displayName: $.cookie('idx_username'),
							provider: provider
						});
					} else {
						cb({});
					}
				}
			} else {
				if(ecb) {
					ecb(r);
				}
			}
		}});
	}
	
	/**
	 * regsiterCallbacks for Thyme
	 */
	
	function registerCallbacks(loginCallback,logoutCallback) {
		if(typeof eventHandler != "undefined") {
			eventHandler.registerCallbacksfromThyme(loginCallback,logoutCallback);
		}
	}
	
	
	/**
	 * Calling the Gigya API method - addConnection
	 * 
	 * @memberOf idx
	 */
	function socialLogin(r)
	{		
		var p = {
			       callback: onSocialLogin,
			       provider: r.provider,
			       sessionExpiration: 0
			    };
		
	    gigya.socialize.login(p);
	}

	
	/**
	 * Gigya API Social Login callback method 
	 * @memberOf idx
	 */
    function onSocialLogin(r)
    {	
        if (r.errorCode == 0)
        {        	
        	//User Not Registered.
        	if(!r.user.isSiteUID) {
        		socialRegisterAndLink();
        	} else {
        		
        		loginSocialUser(r, function() {
        	        //ios8 close open oauth window for facebook
        	        if(fbWindows && fbWindows.length > 0) {
        		        var fbwin = fbWindows[0];
        		        var redirect_url = '';
        		        fbwin.location = redirect_url;
        	        }
        		});
        	}
        } else if(r.errorCode == 200001) {
        	eventHandler.failureEvent(r, {errorMessage : 'gigya login canceled: ' + r.status.message, errorCode : 40, provider : r.requestParams.provider});
        }
        else {
            eventHandler.failureEvent(r, {errorMessage : 'gigya login error: ' + r.status.message, errorCode : 10, provider : r.requestParams.provider});
        }
    }  
    
    
    /**
	 * Gigya API Social Login callback method for when called from a redirect URL handler
	 * @memberOf idx
	 */
    function socialLoginRedirectHandler(r, cb)
    {	
        if (r.errorCode == 0)
        {        	
        	//User Not Registered.
        	if(!r.user.isSiteUID) {
        		socialRegisterAndLink();
        	} else {
        		
        		loginSocialUser(r);
        	}
        }
        if(cb) {
        	cb();
        }
    }  
    
    
    /**
     * Logs in existing social user via IDX based on the gigya login
     * callback
     */
    function loginSocialUser(r, successCb) {
    	var p = {
    			provider: r.requestParams.provider,
    			pid : r.user.identities[r.requestParams.provider].providerUID,
    			id : r.UID,
    			gigyaId : r.UID, 
    			ts : r.signatureTimestamp,
    			signed: r.UIDSignature
    	};
    	var gigyaUser = r.user;

    	var urlParams = {
    			provider: encUri(r.requestParams.provider),
    			pid: encUri(r.user.identities[r.requestParams.provider].providerUID),
    			id: encUri(r.UID),
    			gigaId: encUri(r.UID),
    			ts: encUri(r.signatureTimestamp),
    			signed: encUri(r.UIDSignature)
    	};
    	if(r.requestParams.provider=="twitter"){
    		urlParams.email=encUri(r.user.nickname);
    	}else{
    		urlParams.email=encUri(r.user.email);
    	}
    	 
		var url = api + "/login";
		processPost(url,urlParams,function(r){
			if(r.status.code == 202) {
				//this indicates that gigya still has this user connected to
				//a social provider that should now be connecting to an EOL member
				gigyaEolConnect({
					provider: p.provider,
					eolUID: r.data._id,
					eolUIDTimestamp: r.config.signatureTimestamp,
					eolUIDSig: r.config.signature
				}, function(gecr) {
					//gigyaEolConnect success cb
					var idxUser = r.data;
					
					createSessionCookies({
						id: idxUser._id,
						username: getDisplayName({
							gigyaUser: gigyaUser, 
							username: idxUser.username, 
							displayName: idxUser.brand_data.displayName,
							isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1) 
						}),
						gigyaUser: gigyaUser,
						isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1) 
					});

					eventHandler.loginSuccessEvent(r, 
							{  
							 id:idxUser._id, 
							 username : getDisplayName({
								 gigyaUser: gigyaUser, 
								 username: idxUser.username, 
								 displayName: idxUser.brand_data.displayName,
								 isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1)
							 }), 
							 gigyaUser : gigyaUser,
							 provider:p.provider},
							successCb);			
					
				}, function(gecer) {
					eventHandler.failureEvent(r, {errorMessage : 'IDX Login failure: '+ gecer.status.message, errorCode : 20, provider : p.provider});

				});
			} else {
			
				var idxUser = r.data;
				
				createSessionCookies({
					id: idxUser._id,
					username: getDisplayName({
						gigyaUser: gigyaUser, 
						username: idxUser.username, 
						displayName: idxUser.brand_data.displayName,
						isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1)
					}),
					gigyaUser: gigyaUser,
					isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1) 
				});
				
				eventHandler.loginSuccessEvent(r, 
						{  
						 id:idxUser._id, 
						 username : getDisplayName({
							 gigyaUser: gigyaUser, 
							 username: idxUser.username, 
							 displayName: idxUser.brand_data.displayName,
							 isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1)
						 }), 
						 gigyaUser : gigyaUser,
						 provider:p.provider},
						successCb);
			}
			
		}, function(r) { 
			eventHandler.failureEvent(r, {errorMessage : 'IDX Login failure: '+ r.status.message, errorCode : 20, provider : p.provider});
		});
    }

    /**
     * Calls gigya to remove it's connection with a SMA account
     * and establishes it with another EOL user.
     * @param provider - provider to associate with EOL
     * @param eolUID
     * @param eolUIDTimestamp
     * @param eolUIDSig
     */
    function gigyaEolConnect(p,cb,ecb) {
    	gigya.socialize.removeConnection({
			provider:p.provider, 
			callback:function(rc) {
				if(rc.errorCode==0) {
					//success					
					gigya.socialize.notifyRegistration({
						siteUID: p.eolUID,
						UIDTimestamp: p.eolUIDTimestamp,
						UIDSig: p.eolUIDSig,
						callback:function(nr) {
							
							if(nr.errorCode==0) {
								//success								
								gigya.socialize.getUserInfo({callback:function(r) { 
									if(r.errorCode==0) {
										if(cb) {
											cb(r);
										}
									} else {
										if(ecb) {
											ecb(nr);
										}
									}
								}});
								
								
							} else {
								//fail
								if(ecb) {
									ecb(nr);
								}
							}
						}
					});
				} else {
					//fail
					if(ecb){
						ecb(rc);
					}
				}
			}
		});
    }
    
    /***
     * @memberOf idx
     */
    function socialLink(p) { 
    	if(!p.gigyaUser) { 
    		 eventHandler.failureEvent(r, {errorMessage : 'Gigya Social Login Not Found', debugMsg : true});
    	}
    	
    	var gigyaUser = p.gigyaUser;
    	
    	if(p.idxId) { 
    		//Link Gigya ID And Social Provider Id
    		gigyaSocialLink({id:p.idxId, 
    			  gigyaId: gigyaUser.UID, 
    			  pid: gigyaUser.loginProviderUID,
    			  provider:gigyaUser.loginProvider,
      		  	  ts : gigyaUser.signatureTimestamp,
      		  	  signed: gigyaUser.UIDSignature}, 
				  function(ilr) { 
							var idxUser = ilr.data;
							
							//sets the gigyaUser to the updated signature and timestamp for the 
							//new IDX user
							gigyaUser.UIDSignature = ilr.config.signature;
							gigyaUser.signatureTimestamp = ilr.config.signatureTimestamp;
							
				    		
				    		createSessionCookies({
	    						id: idxUser._id,
	    						username: getDisplayName({
	    							gigyaUser: gigyaUser, 
	    							username: idxUser.username, 
	    							displayName: idxUser.brand_data.displayName,
	    							isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1)
	    						}),
	    						gigyaUser: gigyaUser,
	    						isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1) 
	    					});

							eventHandler.loginSuccessEvent(ilr, {
								id:idxUser._id, 
								username : getDisplayName({
	    							gigyaUser: gigyaUser, 
	    							username: idxUser.username, 
	    							displayName: idxUser.brand_data.displayName,
	    							isSma: (idxUser.brand_data.memberTypes.indexOf("SMA") > -1)
	    						}),
								idxUser : idxUser,
								gigyaUser : gigyaUser,
								provider:gigyaUser.loginProvider});

				  }, 
				  function(ilr) {
						eventHandler.failureEvent(ilr, { errorCode : 20, errorMessage : 'IDX Social Link Failure', debugMsg : true});
				   }
		     );
    	} else { 
    		eventHandler.failureEvent(r, {errorCode : 35, errorMessage : 'Invalid Idx Id: Cannot Link Accounts:', debugMsg : true });

    	}
    	
    }
    
	/**
	 * Register the User With IDX, and link with a social account 
	 * 
	 * We will get the latest user info, so we can verify the signature
	 * when making the "socialLink" in IDX. 
	 * 
	 * @memberOf idx
	 */
    function socialRegisterAndLink(p,cb) { 

    	gigya.socialize.getUserInfo({callback:function(r){
    		if(r.errorCode==0) {
    			var gigyaUser = r.user;
    			
    			var newMember = createSocialUser(gigyaUser);
    			    			
    			registerSMAMember(newMember,
						function(rsmr) {  
    						if(rsmr.status.code == 202) {
    							gigyaEolConnect({
    		    					provider: newMember.provider,
    		    					eolUID: rsmr.data._id,
    		    					eolUIDTimestamp: rsmr.config.signatureTimestamp,
    		    					eolUIDSig: rsmr.config.signature
    		    				}, 
    		    				function(gecr) {
    		    					createSessionCookies({
    		    						id: rsmr.data._id,
    		    						username: getDisplayName({gigyaUser: gigyaUser, username: rsmr.data.username, displayName: rsmr.data.username, isSma: true}),
    		    						gigyaUser: gecr.user,
    		    						isSma: (rsmr.data.brand_data.memberTypes.indexOf("SMA") > -1) 
    		    					});
    		    					
    		    					//gigyaEolConnect success cb
    		    					eventHandler.loginSuccessEvent(rsmr, {id:rsmr.data._id, 
	    		    					 username : getDisplayName({gigyaUser: gigyaUser, username: rsmr.data.username, displayName: rsmr.data.username, isSma: true}), 
	    		    					 gigyaUser : gecr.user,
	    		    					 provider:newMember.provider});
    		    				},
    		    				function(gecer) {
    		    					//gigyaEolConnect error cb
    		    					eventHandler.failureEvent(gecer, {errorMessage : 'IDX Login failure: '+ gecer.status.message, errorCode : 20, provider : newMember.provider});
    		    				});
    							
    						} 
    						else {					    		
								socialLink({idxId : rsmr.data._id, gigyaUser : gigyaUser });

    						}
						},
						function(r) {
							eventHandler.failureEvent(r, { errorCode : 20, errorMessage : ' IDX Registration Failed', debugMsg : true});
							
						});
    		} else { 
				eventHandler.failureEvent(r, { errorCode : 10, errorMessage : ' Gigya: Error Retrieving Current Session', debugMsg : true});
    		}
    	}});
    }

    
	
	/**
	 * 
	 * @memberOf idx
	 */
	function link(m,cb,ecb){
		var url = api + "/link";
		processPost(url,m,cb,ecb);
	}

	/**
	 * 
	 * @memberOf idx
	 */
	function unlink(p,cb,ecb){
		var url = api + "/unlink";
		processPost(url,p,cb,ecb);
	}
	
	/**
	 * 
	 * @memberOf idx
	 */
	function gigyaSocialLink(p,cb,ecb){
		var url = api + "/gigyaSocialLink";
		processPost(url,p,cb,ecb);
	}

	/**
	 * Register a new IDX account tied to a single social user only.
	 */
	function registerSMAMember(m, cb, ecb) {
		var data = {
				provider: encUri(m.provider),
				pid: encUri(m.pid)
		};
		
		if(m.firstname){
			data.firstname=encUri(m.firstname);
		}		
		if(m.lastname){
			data.lastname=encUri(m.lastname);
		}		
		if(m.dob){
			data.dob=encUri(m.dob);
		}		
		if(m.gender){
			data.gender=encUri(m.gender);
		}
		if(m.zip){
			data.zip=encUri(m.zip);
		}
		
		var url = api + "/registerFromSocial";
		processPost(url,data,cb, ecb);
	}
	
	/**
	 * @memberOf idx
	 */
	function registerMember(m,cb, ecb){
		var data = {
				email:encUri(m.email),
				username:encUri(m.username),
				provider:encUri(m.provider)
		};
		
		if(m.password){
			data.password=encUri(m.password);
		}		
		if(m.firstname){
			data.firstname=encUri(m.firstname);
		}		
		if(m.lastname){
			data.lastname=encUri(m.lastname);
		}		
		if(m.dob){
			data.dob=encUri(m.dob);
		}		
		if(m.gender){
			data.gender=encUri(m.gender);
		}
		if(m.zip){
			data.zip=encUri(m.zip);
		}
		if(m.newsletter) {
			data.newsletter=encUri(m.newsletter);
		}
		if(m.sweepstakeId) {
			data.sweepstakeId=encUri(m.sweepstakeId);
		}
		
		var url = api + "/registerFromEol";
		processPost(url,data,cb, ecb);		
	}
	
	function forgotPassword(email,successCallback, failureCallback) {
		var url = api + "/forgotPassword";
		processPost(url,{email:email},
				function(){
					successCallback && successCallback();
				},
				function(){
					failureCallback && failureCallback();
		});
	}
	
	function resetPassword(params,successCallback, failureCallback) {
		var url = api + "/updatePassword";
		processPost(url,{h:params.h,password:params.password},
				function(s){
					successCallback && successCallback(s);
				},
				function(s){
					failureCallback && failureCallback(s);
		});
	}
	
	
	function resendEmail(params, scb, fcb) {
		console.log('in resend email');
		console.log(api);
		var url = api + "/resendEmail";
		if(params.h){			
			processPost(url,{h:params.h},
					function(r) { 
					   if(scb){
						   scb(r);
					   };
			  		}, 
			  function(r) {
				  if(fcb){
					  fcb(r);
				   };
			  });
		}else{
			
		}
		
	}
	
	function encUri(param) { 
		return encodeURIComponent(param); 
	}
	
	/**
	 * @memberOf idx
	 */
	function logout(p,cb){		
		if(p.id != null) {
		   
		   var url = api + '/logout';
		   
		   processPost(url, {email:encUri(p.id)}, function(r){
   				     gigya.socialize.logout({callback:function(r) { 
			   			   		if(r.errorCode == 0) { 			   			   			
				   			 		removeSessionCookies();
				   			   			
			   			   			eventHandler.logoutSuccessEvent(r,p);
			   			   			cb && cb();
			   			   		} else { 
   				     				eventHandler.failureEvent(r, { errorCode : 10, errorMessage : 'Gigya Logout Failed', debugMsg : true});
			   			   		}
			   		   		}
			   		   
			   		   });
		   	} , function(r) {
			     eventHandler.failureEvent(r, {errorCode : 20, errorMessage : 'IDX Logout Failed', debugMsg : true});
		   });
		} else {
			eventHandler.failureEvent('', { errorCode : 20, errorMessage : 'IDX ID Not Found', debugMsg : true});
		}
	}
	
	/***
	 * Get The User Info From Gigya, Then 
	 * call link with the appropriate provider id. 
	 * 
	 * @memberOf idx
	 */
	function  manualLink(p,sucessCb) {
		console.log('in Manual Link');
		gigya.socialize.addConnection({provider: p.provider, 
			callback:function(r) { 
				if(r.errorCode==0 && r.user && r.user.identities) {
					var gigyaUser = r.user;
					link(createMemberFromSocialIdentity(r), 
						  function(r) { 
						  	console.log('link success');
						  	if(typeof sucessCb == "function"){
						  		console.log('in callback');
								eventHandler.manualLinkSuccessEvent({gigyaUser : gigyaUser, provider : p.provider}, sucessCb);
						  	}
						  	else { 
						  		console.log('not callback');
								eventHandler.manualLinkSuccessEvent({gigyaUser : gigyaUser, provider : p.provider});
						  	}
						  }, 
						  function(r) {
						  	console.log('Remove connection');
							  gigya.socialize.removeConnection({provider:p.provider, 
								  callback:function(rcb) {
								  	// Idx link failure : user already registered
								  	eventHandler.failureEvent(rcb, {errorCode : 25, errorMessage: 'User Already Registered', provider : p.provider});
								  }
							  });

						  });

				} else {
					console.log('in eol Command - error 5');
					eventHandler.failureEvent(r, {errorCode : 5, errorMessage : ' Gigya get user failure', provider : p.provider});
				}
		}});
	}
	
	/***
	 * Manually register a user and log them in. 
	 * 
	 */
	function manualRegister(p) { 
    	if(p.username && p.email && p.password) {
    		var newMember = createIdxUser(
    							p.username, p.email, p.password,p.dobday,p.dobmonth,p.dobyear,p.firstname,p.lastname,p.gender,p.zip,p.newsletter,null);
    		registerMember(newMember,
	    			function(r) {  
	    	    		p.newUser = true;
	    	    		gigya.socialize.notifyLogin({ 
	  				      siteUID : r.data._id,
	  				      UIDTimestamp : r.config.signatureTimestamp,
	  				      UIDSig : r.config.signature, 
	  				      newUser : p.newUser, 
	  				      callback : function(nlr) {
	  				    	  if(nlr.errorCode == 0) { 
	  				    		  var gigyaUser = nlr.user; 

	  				    		  createSessionCookies({
	  									id: gigyaUser.UID,
	  									username: getDisplayName({gigyaUser: gigyaUser, username: r.data.username, displayName: r.data.username}),
	  									gigyaUser: gigyaUser,
	  									isSma: false
	  								});	  				    		  
	  				    		  	eventHandler.registerManualUserSuccessEvent(r,{id: gigyaUser.UID, 
						    			  	   gigyaUser : gigyaUser, 
						    			  	   username : r.data.username,
						    			  	   provider:"eol"});
	  				    		 
	  				    		 
	  				    	  } else { 
	  				    		  eventHandler.registerManualUserFailureEvent(r,p);
	  				    	  }
	  				      },
	  				      sessionExpiration: 0
	    	    		});
	    			},
	    			function(r) {
		    			eventHandler.registerManualUserFailureEvent(r,p);
	    			});
    	} else { 
			eventHandler.registerManualUserFailureEvent(r,
				{	errorCode : 30, 
					errorMessage : ' IDX Registration: email, username, password required'});
    	}
		
	}
	
	/***
	 * 
	 * Get The User Info From gigya, then call unlink 
	 * with the appropriate user id. 
	 * 
	 * @memberOf idx
	 */
	function  manualUnlink(p, successCB) {
		gigya.socialize.getUserInfo({callback:function(r) { 
			if(r.errorCode==0) {
				var gigyaUser = r.user;
				
				var providerUID;
				if(r.user.identities[p.provider] != null) {
					providerUID = r.user.identities[p.provider].providerUID;
				}
				unlink({provider : p.provider, 
					  pid : providerUID, 
					  id : r.user.UID, 
	        		  ts : gigyaUser.signatureTimestamp,
	        		  signed: gigyaUser.UIDSignature}, 
					  function(ulr) { 
						   if(!ulr.data.providers || ulr.data.providers.empty) { 
								var sessionExp = 0; // session expires when the browser closes
								if($.cookie('pm[rememberme]') == "true") {
									sessionExp = -2; // session is valid forever (until logout)
								}
							   gigya.socialize.notifyLogin({
								      siteUID : ulr.data._id,
								      UIDTimestamp : ulr.config.signatureTimestamp,
								      UIDSig : ulr.config.signature, 
								      callback : function(nlr) { 
									   		if(nlr.errorCode == 0) { 
									   			eventHandler.manualUnlinkSuccessEvent(r, {gigyaUser : gigyaUser, provider : p.provider},successCB);
									   		} else {
							   					console.log('in here error 10');
												eventHandler.failureEvent(r, { errorCode : 10, errorMessage : ' Gigya Re-Login Failure', debugMsg : true});
									   		}
								      },
								      sessionExpiration: sessionExp
							   });
							   
							   
						   } else { 
							   eventHandler.manualUnlinkSuccessEvent(r, {
								   gigyaUser : gigyaUser, provider : p.provider});
						   }
						 
					  }, 
					  function(r) {
						  console.log('in here error 45');
						  eventHandler.failureEvent(r, { errorCode : 45, errorMessage : ' IDX unlink failure', provider : p.provider});
					  });

			} else {

				eventHandler.failureEvent(r, { errorCode : 45, 
				  		errorMessage : ' Gigya Get User Unlink failure'});
			}
		}});
		
	}
	
	/**
	 * @memberOf idx
	 * 
	 * Manually login a user already registered with idx, and gigya.
	 * 
	 * Called when a user logs into their EOL Account without any social authentication.
	 */
	
	function manualLogin(p,redirectUrl){
		console.log('I get to manualLogin'+ redirectUrl);

		if(!(p.username && p.password)) { 			
			eventHandler.manualLoginFailureEvent(p, 
					{username: 'Email or Username is required',
					password:'Password is required'});
		} else { 
			
			var idxLoginParams = {
					id:p.username,
					password:encUri(p.password),
					email:p.username
			};
						
			if(!p.newUser) { 
				p.newUser = false;
			}
			var url = api + "/login";
			processPost(url,idxLoginParams,function(r){
				var idxUser = r.data; 
				var sessionExp = 0; // session expires when the browser closes
				if($.cookie('pm[rememberme]') == "true") {
					sessionExp = -2; // session is valid forever (until logout)
				}
				gigya.socialize.notifyLogin({ 
				      siteUID : r.data._id,
				      UIDTimestamp : r.config.signatureTimestamp,
				      UIDSig : r.config.signature, 
				      newUser : p.newUser, 
				      callback : function(nlr) {
				    	  if(nlr.errorCode == 0) { 
				    		  var gigyaUser = nlr.user; 
				    		  createSessionCookies({
									id: gigyaUser.UID,
									username: getDisplayName({gigyaUser: gigyaUser, username: idxUser.username, displayName: idxUser.brand_data.displayName}),
									gigyaUser: gigyaUser,
									isSma: false
								});
				    		  if(redirectUrl && redirectUrl != null){
				    		  	console.log('In manual login - Use provided url: '+ redirectUrl);
								eventHandler.loginSuccessEvent(r, {id: gigyaUser.UID, gigyaUser : gigyaUser, username : idxUser.username, provider:"eol", loginRedirectUrl : redirectUrl});

				    		  }else{
				    		  	console.log('in manual login - use loginSuccessEvent');
				    			  eventHandler.loginSuccessEvent(r, 
					    				  {id: gigyaUser.UID, 
					    			  	   gigyaUser : gigyaUser, 
					    			  	   username : getDisplayName({gigyaUser: gigyaUser, username: idxUser.username, displayName: idxUser.brand_data.displayName}),
					    			  	   provider:"eol"});
				    		  }
				    		 
				    	  } else { 
				    		  eventHandler.manualLoginFailureEvent(r, 
										{   errorCode : 10,
				    			  			errorMessage: ' Gigya login failure'});
				    	  }
				    	  
				      },
				      sessionExpiration: sessionExp
				});
				

			 }, function (r) {
					eventHandler.manualLoginFailureEvent(r, 
							{ errorCode : 20, 
							  errorMessage: ' Idx login failure'});
			 }); 
		}
	}
	/**
	 * @memberOf idx
	 * 
	 * Manually login a user already registered with idx, and gigya.
	 * 
	 * Called when a user logs into their EOL Account while submitting for a sweepstakes
	 */
	
	function sweepsManualLogin(p){
		console.log('I get to sweepsManualLogin');

		if(!(p.username && p.password)) { 			
			eventHandler.manualLoginFailureEvent(p, 
					{username: 'Email or Username is required',
					password:'Password is required'});
		} else { 
			
			var idxLoginParams = {
					id:p.username,
					password:encUri(p.password),
					email:p.username
			};
						
			if(!p.newUser) { 
				p.newUser = false;
			}
			var url = api + "/login";
			processPost(url,idxLoginParams,function(r){
				var idxUser = r.data;
				var sessionExp = 0; // session expires when the browser closes
				if($.cookie('pm[rememberme]') == "true") {
					sessionExp = -2; // session is valid forever (until logout)
				}
				gigya.socialize.notifyLogin({ 
				      siteUID : r.data._id,
				      UIDTimestamp : r.config.signatureTimestamp,
				      UIDSig : r.config.signature, 
				      newUser : p.newUser, 
				      callback : function(nlr) {
				    	  if(nlr.errorCode == 0) { 
				    		  var gigyaUser = nlr.user; 
				    		  createSessionCookies({
									id: gigyaUser.UID,
									username: getDisplayName({gigyaUser: gigyaUser, username: idxUser.username, displayName: idxUser.brand_data.displayName}),
									gigyaUser: gigyaUser,
									isSma: false
								});
				    		 
				    		  eventHandler.sweepsLoginRegisterSuccessEvent(r,{id: gigyaUser.UID, gigyaUser : gigyaUser, username : idxUser.username, provider:"eol", type: "login"});
				    		 
				    	  } else { 
				    		  eventHandler.manualLoginFailureEvent(r, 
										{   errorCode : 10,
				    			  			errorMessage: ' Gigya login failure'});
				    	  }
				    	  
				      },
				      sessionExpiration: sessionExp
				});
				

			 }, function (r) {
					eventHandler.manualLoginFailureEvent(r, 
							{ errorCode : 20, 
							  errorMessage: ' Idx login failure'});
			 }); 
		}
	}
	

	
	/***
	 * Manually register a user and log them in. 
	 * 
	 * Called when a user registers for a new EOL Account while submitting for a sweepstakes
	 */
	function sweepsManualRegister(p) {
		console.log("in sweepsManualRegister");
    	if(p.username && p.email && p.password) {
    		var newMember = createIdxUser(
    							p.username, p.email, p.password,p.dobday,p.dobmonth,p.dobyear,p.firstname,p.lastname,p.gender,p.zip,p.newsletter,p.sweepstakeId);
    		registerMember(newMember,
	    			function(r) {  
	    	    		p.newUser = true;
	    	    		gigya.socialize.notifyLogin({ 
	  				      siteUID : r.data._id,
	  				      UIDTimestamp : r.config.signatureTimestamp,
	  				      UIDSig : r.config.signature, 
	  				      newUser : p.newUser, 
	  				      callback : function(nlr) {
	  				    	  if(nlr.errorCode == 0) { 
	  				    		  var gigyaUser = nlr.user;
	  				    		  createSessionCookies({
	  									id: gigyaUser.UID,
	  									username: getDisplayName({gigyaUser: gigyaUser, username: r.data.username, displayName: r.data.username}),
	  									gigyaUser: gigyaUser,
	  									isSma: false
	  								});
	  				    		eventHandler.sweepsLoginRegisterSuccessEvent(r, 
					    				  {id: gigyaUser.UID, 
					    			  	   gigyaUser : gigyaUser, 
					    			  	   username : r.data.username,
					    			  	   provider:"eol",
					    			  	   type: "register" });
	  				    		 
	  				    	  } else { 
	  				    		  eventHandler.registerManualUserFailureEvent(r,p);
	  				    	  }
	  				      },
	  				      sessionExpiration: 0
	    	    		});
	    			},
	    			function(r) {
		    			eventHandler.registerManualUserFailureEvent(r,p);
	    			});
    	} else { 
			eventHandler.registerManualUserFailureEvent(r,
				{	errorCode : 30, 
					errorMessage : ' IDX Registration: email, username, password required'});
    	}
		
	}
	
	/***
	 * Check if an email is already tied to an existing account
	 * 
	 * Called in sweepstakes submissions
	 */
	function testUsername(email){
		console.log('I get to testUsername');
			
		var idxLoginParams = {
				id:email,
				password:"x",
				email:email
		};
		var url = api + "/login";
		processPost(url,idxLoginParams,function(r){
			eventHandler.sweepsUsernameTestEvent(r, {errorCode : 10, errorMessage: 'successful login'});
		 }, function (r) {
			eventHandler.sweepsUsernameTestEvent(r, {errorCode : 20, errorMessage: ' Idx login failure'});
		 }); 

	}
	
	/**
	 * @memberOf idx
	 * 
	 * Submit sweepstakes form data
	 */
	function sweepstakesSubmit(p, type){
		console.log("In sweepstakesSubmit");
		console.log(p);
		console.log(type);
		if(!(p.sweepstakesId)) { 			
			eventHandler.sweepsFailureEvent(p, 
					{errorMessage: ' Invalid sweepstakes'});
		} else {
			var url = sweepsApi + "/ajax/" + p.sweepstakesId;
			console.log("sweeps submit url: " + url);
			processPost(url,p,function(r){
	 			console.log('idx sweepstakes submit success');
				console.log(r);
				eventHandler.sweepsSuccessEvent(type);
			 }, function (r) { 
				 console.log('idx sweepstakes submit failure');
				 console.log(r);
				 eventHandler.sweepsFailureEvent(r, 
						{ errorCode : 20, 
						  errorMessage: ' idx sweepstakes submit failure'});
			 }); 
		}
	}
	
	/**
	 * @memberOf idx
	 */
	function processPost(url,data,cb,ecb){
		$.support.cors = true;
		var stringData = "";
		var dataCount = 0;
		$.each(data, function(key, value) {
			if(dataCount == 0) {
				stringData += key+"="+value;
				dataCount++;
			} else {
				stringData += "&"+key+"="+value;
			}
		});
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: stringData,	
			crossDomain: true,
			xhrFields: {
			      withCredentials: true
			   },
			error: function(err){
				if(ecb) { 
					ecb(err);
				} 
			},
			success: function(r){
				if(r.status.code == 200 || r.status.code == 202){
					if(cb){
						cb(r);
					} 
				}else{
					if(ecb) { 
						ecb(r);
					} 
				}
			}
		});
	}


	/**
	 * @memberOf idx
	 */
	function processGet(url,cb,ecb){
		$.ajax({url: url,
			type: 'GET',
			contentType: 'application/json',
			dataType: 'json',
			error: function(err){},
			success: function(r){
				if(r.status.code == 200){
					if(cb){
						cb(r);
					} 
				}else{
					if(ecb) {
						ecb(r);
					} 
				}
			}
		});
	}	
	
	
	/**
	 * Returns the display name to use
	 */
	function getDisplayName(p) {
		if(p.isSma) {
			if(p.gigyaUser.identities[p.gigyaUser.loginProvider].nickname) {
				return p.gigyaUser.identities[p.gigyaUser.loginProvider].nickname;
			}
		} else if(p.displayName == null || p.displayName == "") {
			return p.username;
		}
		return p.displayName;
	}
	
	/**
	 * Creates cookies for login. 
	 *
	 * Takes JSON id, gigyaUser, and username
	 */
	function createSessionCookies(p) {
		if($.cookie('idx_u')) {
			$.removeCookie('idx_u', 
				{
					domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
					path: '/',
					secure: false
				});
		}
		if($.cookie('pm[rememberme]') == "true") {
			$.cookie('idx_u', p.id, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						expires : 365,
						path: '/',
						secure: false
					});
			$.cookie('idx_us', p.gigyaUser.UIDSignature, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						expires : 365,
						path: '/',
						secure: (idxConfig != null && idxConfig.isLocalhost != null ? !idxConfig.isLocalhost : false)
					});
			$.cookie('idx_ts', p.gigyaUser.signatureTimestamp, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null: 'eonline.com'),
						expires : 365,
						path: '/', 
						secure: (idxConfig != null && idxConfig.isLocalhost != null ? !idxConfig.isLocalhost : false)
					});
			
			$.cookie('idx_username', p.username, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						expires : 365,
						path: '/',
						secure: false
					});
			$.cookie('idx_type', (p.isSma ? "SMA" : "EOL"), 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						expires : 365,
						path: '/',
						secure: false
					});
		} else {
			$.cookie('idx_u', p.id, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						path: '/',
						secure: false
					});
			$.cookie('idx_us', p.gigyaUser.UIDSignature, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						path: '/',
						secure: (idxConfig != null && idxConfig.isLocalhost != null ? !idxConfig.isLocalhost : false)
					});
			$.cookie('idx_ts', p.gigyaUser.signatureTimestamp, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null: 'eonline.com'),
						path: '/', 
						secure: (idxConfig != null && idxConfig.isLocalhost != null ? !idxConfig.isLocalhost : false)
					});
			
			$.cookie('idx_username', p.username, 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						path: '/',
						secure: false
					});
			$.cookie('idx_type', (p.isSma ? "SMA" : "EOL"), 
					{
						domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
						path: '/',
						secure: false
					});
		}
	}
	
	/**
	 * Remove session cookies on logout. 
	 */
	function removeSessionCookies(p) {
		$.removeCookie('idx_ts', 
				{
					domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
					path: '/',
					secure: (idxConfig != null && idxConfig.isLocalhost != null ? !idxConfig.isLocalhost : false)
				});
		$.removeCookie('idx_us', 
				{
					domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
					path: '/',
					secure: (idxConfig != null && idxConfig.isLocalhost != null ? !idxConfig.isLocalhost : false)
				});
		$.removeCookie('idx_username', 
				{
					domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
					path: '/', 
					secure: false
				});
		$.removeCookie('idx_type', 
				{
					domain: (idxConfig != null && idxConfig.isLocalhost ? null : 'eonline.com'),
					path: '/', 
					secure: false
				});
	}
	
	/**
	 * Delete user account. (soft delete)
	 */
	function deleteAccount(id, cb) {
		processPost(api+'/deleteMember',
				{id:encUri(id),ts:encUri($.cookie('idx_ts')),signed:encUri($.cookie('idx_us'))},
				function(s) {
			
					gigya.socialize.logout({callback:function(r) { 
					   		if(r.errorCode == 0) { 					   			
								eventHandler.logoutSuccessEvent(s, {id: id, username: $.cookie('idx_username')})
								removeSessionCookies();					
								
								cb && cb(s);
					   		} else { 
					   			eventHandler.failureEvent(r, { errorCode : 10, errorMessage : 'Gigya Logout Failed', debugMsg : true});
					   		}
				   		}
				   
				   });

		});
	}
	return {
		init : init, //Documented.
		getUser : getUser, //Documented.
		registerCallbacks : registerCallbacks, //for Thyme
		manualLink : manualLink,  //Documented.
		manualUnlink : manualUnlink,  //Documented  
		manualLogin : manualLogin, //Documented
		manualRegister : manualRegister, //Documented.
		socialLogin : socialLogin,  //Documented
		socialLoginRedirectHandler: socialLoginRedirectHandler, //for redirect callbacks
		forgotPassword: forgotPassword,
		resetPassword: resetPassword,
		resendEmail:resendEmail,
		testUsername : testUsername,
		sweepstakesSubmit : sweepstakesSubmit,
		sweepsManualLogin : sweepsManualLogin,
		sweepsManualRegister : sweepsManualRegister,
		logout : logout, //Documented.
		deleteAccount: deleteAccount
  };
	
	
})(jQuery);