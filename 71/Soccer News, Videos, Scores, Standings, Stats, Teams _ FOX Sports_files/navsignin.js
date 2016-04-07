// Filename: navsignin.js  
// Timestamp: 2015.05.01-11:25:39 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)


define("components/navsignin/navsignin", [
  "accountsservice",
  "jquery",
  "pubsub"
], function(accountsservice, $,pubsub) {
  var navsignin = {
    signinContainerId : "SigninContainer",
    signinFontIconId : "SigninFontIconContainer",
    signoutLink : "userSignOutLink",
    greetingContainerId : "greetingContainerId",
    
    getSigninContainerElem : function () {
      return document.getElementById(this.signinContainerId);
    },
    getSigninFontIconElem : function () {
      return document.getElementById(this.signinFontIconId);
    },
    getSignoutElem : function () {
      return document.getElementById(this.signoutLink);
    },
    
    getGreetingContainer : function () {
        return document.getElementById(this.greetingContainerId);
    },

    doSignin : function (acct) {
      acct.renderlogin();
    },

    doSignout : function (acct) {
      
    	if (acct.isLoggedIn()) {
    	  acct.logout();
    	}
    },

    toggleSignedin : function () {
      var that = this,
          signinContainerElem = that.getSigninContainerElem(),
          signinFontIconElem = that.getSigninFontIconElem();
      if (signinContainerElem &&
          signinFontIconElem) {
        signinFontIconElem.className = "user-icon icon-FS_Icons_signin";
        signinContainerElem.className = "signinContainer site-user-controls logged-in";
      }
    },

    toggleSignedout : function () {
      var that = this,
          signinContainerElem = that.getSigninContainerElem(),
          signinFontIconElem = that.getSigninFontIconElem();

      if (signinContainerElem && signinFontIconElem) {
        signinFontIconElem.className = "user-icon icon-FS_Icons_signout";
        signinContainerElem.className = "signinContainer site-user-controls logged-out";
      }
    },

    toggleUpdate : function (acct) {
      acct.isLoggedIn() ? this.toggleSignedin() : this.toggleSignedout();
      if (acct.isLoggedIn()) {
        this.getGreetingContainer().innerHTML = acct.getname();          
      } else {
        $('.menu-dropdown.signed-in-dropdown').hide();
        this.getGreetingContainer().innerHTML = 'Sign In';          
      }
    },

    updatelinks : function () {
      var logoutlink = document.getElementById('FSDNavAcctLogoutLink'),
          loginlink = document.getElementById('FSDNavAcctLoginLink'),
        href = window.location.href;
    
      if (loginlink) {
        loginlink.href =
          '/accounts/login?fu=' + encodeURIComponent(href);          
      }
    },
    
	buildSignedInLinks : function(acct){
		var that = this,
			host = location.host,
			userProfileEditLink = document.getElementById("userProfileEditLink"),
			userAccountEditLink = document.getElementById("userAccountEditLink"),
			userSignoutLink = that.getSignoutElem();

          userProfileEditLink.href = "/accounts/settings/profile";
	  userAccountEditLink.href = "/accounts/settings";
          
	  /*
		if(host.match(/beta/)) {
			userProfileEditLink.href = "http://www.foxsports.com/account/profile-settings#loc=account_profile";
			userAccountEditLink.href = "http://www.foxsports.com/account/profile-settings#loc=account_settings";
		}
		
		if(host.match(/qa/) || host.match(/dev/)) {
			userProfileEditLink.href = "http://qa.foxsports.com/account/profile-settings#loc=account_profile";
			userAccountEditLink.href = "http://qa.foxsports.com/account/profile-settings#loc=account_settings";		
		}
		else {
			userProfileEditLink.href = "/account/profile-settings#loc=account_profile";
			userAccountEditLink.href = "/account/profile-settings#loc=account_settings";
		}
           */
          $(userSignoutLink).click(function() {
            that.doSignout(acct);
          });
	},
    attach : function (acct) {
      var that = this,
          signinContainerElem = that.getSigninContainerElem(),
          signinLink = that.getSigninFontIconElem();

      if (signinContainerElem) {

        $(signinLink).click(function() {

          if (acct.isLoggedIn()) {
	    return false;
          } else {
            that.doSignin(acct);
          }
          //if (CAPTURE.isLoggedIn()) {
	  //        return false;
          //} else {
          //  that.doSignin(CAPTURE);
          //}
        });

		  that.buildSignedInLinks(acct);
      }
    }
  };

  return {
    prototype : navsignin,
    
    start: function(opts) {
      var that = Object.create(navsignin);


      that.updatelinks();
      pubsub.on("page:load", that.updatelinks);


      accountsservice.get(function (err, acct) {
        if (err) return console.error(err);

        that.toggleUpdate(acct);
        that.attach(acct);

        //if (acctobj.isLoggedIn()) {
        //  that.getGreetingContainer().innerHTML = acctobj.getname();          
        //}

        acct.onlogout(function () {
          that.toggleUpdate(acct);
        });

        acct.onlogin(function () {
          that.toggleUpdate(acct);
        });        
      });

      /*
      jrlf.init(function (err, Backplane, CAPTURE) {
        
    	if (err) return null;

        that.toggleUpdate(CAPTURE);
        that.attach(CAPTURE);
        
        if (CAPTURE.isLoggedIn()) {
        	
        	CAPTURE.getUserData(function (err, res) {

                that.getGreetingContainer().innerHTML = res.displayName;  //set user display name after user is logged in              
                
        	});
        	
    	} 
            
      });
       */
    },

    init : function () {
      // begin binding!
	      this.start();
/*
		pubsub.on("page:load", function(){
	      this.start();
		}, this);
*/

    }
  };
});
