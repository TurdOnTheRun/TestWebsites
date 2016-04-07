(function(){
var $ = $ || jQuery;

var tcm = tcm || {};
tcm.sitr = { // Sign In To Read

    versions : ["B"],//"A"], not using A.
    version : null,
    mWidth : 525,
    mHeight : 398,
    allowedPages : /(\.people\.com\/article\/|\.people\.com\/people\/$|\.people\.com\/people\/news\/)/,
    alreadyBuilt : false,
    dblkPx : {
	"A" : {
	    "impression" : "http://pubads.g.doubleclick.net/gampad/ad?iu=/8484/timi/trackingpixels/cmpeo_dynamiclayer&sz=1x1&t=&c=[TIMESTAMP]",
	    "signIn" : "",
	    "signUp" : ""
	},
	"B" : {
	    "impression" : "http://pubads.g.doubleclick.net/gampad/ad?iu=/8484/timi/trackingpixels/cmpeo_dynamiclayer_b&sz=1x1&t=&c=[TIMESTAMP]",
	    "signIn" : "",
	    "signUp" : ""
	}
    },



    trackingDeduper : {
	"impression" : false,
        "signIn" : false,
        "signUp" : false
    },

    onAllowedPage : function(){
	var URL = window.location.href.replace(/\?.*/,"");
	if(this.allowedPages.test(URL)){return true;}
	return false;

    },

    isSignedIn : function(){

               var TISubcookie = this.getThisCookie("TISub", "|", "~");

               if( TISubcookie && TISubcookie.subscriberIsActive == "Y" && 
		   /com.timeinc.people.insider/.test(TISubcookie.availableAppIds) &&
                   (this.LUCIEDateToDateMSUTC(TISubcookie.expirationDate) > this.nowUTC)
		 ){
		   return true;
	       }

	return false;

//	return (/TISub/.test(document.cookie));

    },

    initializePremiumLinks : function(){

	var links = $("a.premium-link")
	links2 = $("a").children("span.premium-lock").parent();
	links3 = $("#rightRailLinks a");
	links4 = $(".tout-premium a");
	links5 = $(".newstout.premium a");
 
		 
	if(links.length > 0 || links2.length > 0 || links3.length > 0 || links4.length > 0 || links5.length > 0 ){

	    if(!this.alreadyBuilt){
		this.version = this.selectOneRandomly(this.versions);	    	   
		tcm.sitr.buildStyleTag();
		tcm.sitr.buildModalScreen();
		tcm.sitr.buildInterstitial();
		this.alreadyBuilt = true;
	    }
	}

	if(links.length > 0){links.click(function(event){tcm.sitr.presentInterstitial(event);});}
	if(links2.length > 0){links2.click(function(event){tcm.sitr.presentInterstitial(event);});}
	if(links3.length > 0){links3.click(function(event){tcm.sitr.presentInterstitial(event);});}
	if(links4.length > 0){links4.click(function(event){tcm.sitr.presentInterstitial(event);});}
	if(links5.length > 0){links5.click(function(event){tcm.sitr.presentInterstitial(event);});}

	
	},


    buildStyleTag : function(){
	    var stylesheet = document.createElement("style"),
	    rule = document.createTextNode('.sitr-premium-link:after {content: ".";background: url(http://img2.timeinc.net/people/static/i/premium/premium-key.png) -155px -75px no-repeat;text-indent: -9999px;display: inline-block;width: 28px'),
            docHead = document.getElementsByTagName("head")[0];

            stylesheet.setAttribute("type", "text/css");

	    stylesheet.appendChild(rule);
	    docHead.appendChild(stylesheet);
    },


    buildModalScreen : function() {
	var b = document.getElementById("SITRmodalScreen");
	if (b)
            $(b).hide();
	else {
            var b = document.createElement("DIV");
	    b.id = "SITRmodalScreen";
	    $(b).css({"width":$( window ).width()+"px","height":$( window ).height()+"px","position":"fixed","top":"0px","left":"0px","opacity":"0.9","background-color":"#FFF","display":"none","z-index":"2147483646"});
            document.body.appendChild(b)
	    $(b).click(function(){tcm.sitr.buildModalScreen(); tcm.sitr.buildInterstitial();})
	}
    },

    buildInterstitial : function(){

	var sitrBox = document.getElementById("SITRInterstitial");
	if (sitrBox)
            $(sitrBox).hide();
	else {
            var sitrBox = document.createElement("DIV"),
	    headline = document.createElement("A"),
	    closeCircle = document.createElement("IMG"),
	    logo = document.createElement("IMG"),
	    wantToRead = document.createElement("DIV"),
	    signIn = document.createElement("IMG"),	    
	    signUp = document.createElement("IMG"),	    
	    pitch = document.createElement("DIV"),
	    goBack = document.createElement("DIV"),
	    left = (($( window ).width()-this.mWidth)/2)+"px", 
	    top =(($( window ).height()-this.mHeight)/2)+"px";

	    sitrBox.id = "SITRInterstitial";

	    $(sitrBox).css({"width":this.mWidth+"px","height":this.mHeight+"px","position":"fixed","top":top,"left":left,"background-color":"#FFF","display":"none","z-index":"2147483647", "border" : "1px solid #ccc", "box-shadow" : "5px 5px 10px #d7d7d7"});

	    $(closeCircle).css({"position":"absolute","top":"-22px","right":"-22px","height":"44px","width":"44px","border":"none", "cursor":"pointer"});
	    $(closeCircle).attr({"src":"//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/pe-signintoread/resources/images/btn_close.png"});
	    $(closeCircle).click(function(){
		tcm.sitr.hideInterstitial();
	    });


	    $(logo).css({"position":"absolute","top":"20px","left":"117px","height":"57px","width":"291px","border" : "none", "cursor":"pointer"});
	    $(logo).attr({"src":"//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/pe-signintoread/resources/images/Premium_logo.png","id":"sitrLogo"});


	    $(wantToRead).attr({"id":"wantToRead"});
	    $(wantToRead).text("Want to read this story?");

	    headline.id = "SITRArticleURL";




	    $(signIn).attr({"src":"//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/pe-signintoread/resources/images/btn_signin.png","id":"SITRSignIn"});
	    $(signIn).click(function(){
		tcm.sitr.hideInterstitial();
		PEOPLE.Auth.showLoginIframe();
		tcm.sitr.fireAllTrackers("signIn");
		window.setTimeout(function(){tcm.sitr.setSignInToUrl();},1000);
	    });


	    $(signUp).attr({"src":"//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/pe-signintoread/resources/images/btn_tryit.png","id":"SITRSignUp"});

	    $(pitch).attr({"id":"sitrPitch"});
	    $(pitch).css({"position":"absolute","top":"287px","left":"51px","height":"57px","width":"421px","color":"#000","font-size":"16px","font-family":"brandon-grotesque, Arial","text-align":"center", "cursor":"pointer"});
	    $(pitch).html("Get EXCLUSIVE ACCESS to this story PLUS insider<br />news available ONLY to PEOPLE Premium subscribers!");
	    
	    $(goBack).css({"position":"absolute","top":"355px","left":"195px","height":"28px","width":"140px","border" : "none", "color":"#777","font-size":"14px","font-family":"brandon-grotesque, Arial", "font-weight":"bold", "text-align":"center", "cursor":"pointer"});
	    $(goBack).text("No, go back");
	    $(goBack).click(function(){
		tcm.sitr.hideInterstitial();
	    });


	    if(this.version == "A"){
		$(signUp).css({"position":"absolute","top":"225px","left":"290px","height":"31px","width":"120px","border" : "none", "cursor":"pointer"});
		$(signIn).css({"position":"absolute","top":"225px","left":"120px","height":"31px","width":"120px","border" : "none", "cursor":"pointer"});
		$(wantToRead).css({"position":"absolute","top":"87px","left":"130px","height":"57px","width":"300px","color":"#E07","font-size":"20px","text-transform":"uppercase","font-family":"brandon-grotesque, Arial","font-weight":"bold", "cursor":"pointer"});
		$(headline).css({"text-align":"center","width":"475px", "position":"absolute","top":"135px","left":"25px","display":"block","color" : "#4029d4", "text-decoration" : "none", "font-size" : "21px", "font-weight" : "bold", "cursor":"pointer", "background-position":"-155px -72px"});

	    }else{

		var hr = document.createElement("HR"),
		hr2 = document.createElement("HR");
		$([hr,hr2]).css({"position":"absolute", "left":"75px", "width":"375px", "height":"1px", "background-color":"#C5C5C5"});
		$(hr).css({"top":"70px"});
		$(hr2).css({"top":"150px"});
		/*sitrBox.appendChild(hr);
		sitrBox.appendChild(hr2);*/

		$(pitch).css({"position":"absolute","top":"225px","left":"51px","height":"57px","width":"421px","color":"#000","font-size":"16px","font-family":"brandon-grotesque, Arial","text-align":"center", "cursor":"pointer"});		
		$(signUp).css({"position":"absolute","top":"300px","left":"275px","height":"31px","width":"120px","border" : "none", "cursor":"pointer"});
		$(signIn).css({"position":"absolute","top":"300px","left":"130px","height":"31px","width":"120px","border" : "none", "cursor":"pointer"});
		$(headline).css({"text-align":"center","width":"475px", "border-top":"1px solid #C5C5C5", "border-bottom":"1px solid #C5C5C5", "padding-top":"5px","padding-bottom":"5px", "position":"absolute","top":"100px","left":"25px","display":"block","color" : "#000", "text-decoration" : "none", "font-size" : "21px", "font-weight" : "bold", "cursor":"pointer", "background-position":"-155px -72px"});
		$(wantToRead).css({"position":"absolute","top":"185px","left":"160px","height":"57px","width":"300px","color":"#4B00CC","font-size":"20px","font-family":"brandon-grotesque, Arial","font-weight":"bold", "cursor":"pointer"});		
	    }



	    sitrBox.appendChild(closeCircle);
	    sitrBox.appendChild(logo);
	    sitrBox.appendChild(wantToRead);
	    sitrBox.appendChild(headline);
	    sitrBox.appendChild(signIn);
	    sitrBox.appendChild(signUp);
	    sitrBox.appendChild(pitch);
	    sitrBox.appendChild(goBack);
            document.body.appendChild(sitrBox)
	}

	
    },

    hideInterstitial : function(){
	$("#SITRmodalScreen").hide();
        $("#SITRInterstitial").hide();
	 this.trackingDeduper.impression = false;
	 this.trackingDeduper.signIn = false;
	 this.trackingDeduper.signUp = false;
    },

    presentInterstitial : function(e){

    // Allowed on all pages per OREO 30336
	//if(!tcm.sitr.onAllowedPage()){return;}

	var targets= e.target.href;
	targets= e.target.href == undefined ? e.target.parentNode.href : e.target.href;

	if(tcm.sitr.isSignedIn()){return;}
          	

	e.preventDefault();
	
	var bait = e.target.innerHTML;
	if(e.target.tagName == "IMG"){
	    bait = e.target.alt;
	}
	this.toURL = e.currentTarget.href;

	$("#SITRArticleURL").html(bait);
	this.headLine = bait.replace(/<[^>]+>/g,"");
	$("#SITRSignUp,#wantToRead,#sitrLogo,#sitrPitch").click(function(){
	    tcm.sitr.fireAllTrackers("signUp");
	    document.cookie = "TCMtURL="+encodeURIComponent(tcm.sitr.toURL)+";path=/;domain=people.com";
	    window.location.href = 'https://subscription.people.com/storefront/subscribe-to-people/link/1031483.html';
	});
	$("#SITRArticleURL").attr({"href":this.toURL,"class":"sitr-premium-link"});
	$("#SITRArticleURL").click(function(){
            tcm.sitr.fireAllTrackers("signUp");
        });

	$("#SITRmodalScreen").show();
	$("#SITRInterstitial").show();

	tcm.sitr.fireAllTrackers("impression");
    },


    setSignInToUrl : function(){
	var frameBox = document.getElementById("login-iframe");
	if(!frameBox || !frameBox.firstChild.contentWindow){window.setTimeout(tcm.sitr.setSignInToUrl,500);}
	
	var f = frameBox.firstChild.contentWindow.document.forms[0],
	newAction = f.action,
	newRurl = window.location.href.replace(/(\#|\?).*$/,"");
	f.target = "_top";
	newAction = newAction.replace(/turl=.*$/,"turl="+encodeURIComponent(tcm.sitr.toURL));
        newAction = newAction.replace(/rurl=.*?&/,"rurl="+encodeURIComponent(newRurl+"?signin=true")+"&");
	f.action = newAction;
    },


    fireAllTrackers : function(action){

	if(!this.trackingDeduper[action]){
	    this.fireDblk(action);
	    this.fireOmniture(action);
	    this.trackingDeduper[action] = true;	    
	}

    },

    fireDblk : function(action){
	if(this.dblkPx[this.version][action] == ""){return;}

	var px = document.createElement("IMG"),
	timeStamp = (new Date).getTime(),
	src = this.dblkPx[this.version][action].replace('[TIMESTAMP]',timeStamp);
	px.src = src; 

    },

    fireOmniture : function(action){
	omniTrackEv("tcm|SignInToRead|version"+this.version+"|"+action+"|"+this.headLine);
    },

     /*
       BEGIN UTILITY FUNCTIONS, ie: cookie reading, setting, unpacking
     */
    
    selectOneRandomly : function(arr){ var r = Math.random(),l = arr.length; return arr[parseInt(r*l,10)]; },


     //args: a:array, b:function to apply to each array element
    each : function(a, b) {
	 var c = a.length, d;
	 for (d = 0; d < c; d++){b(a[d]);}
    },

     //args: a:string to unpack, b:pair delimiter, ie &, c:equal sign, ie : or =
    unPack : function(a, b, c) {
	 var d = {};
	 a = a.split(b);
	 this.each(a, function(a) {
		 a = a.split(c);
		 try{1 < a.length ? d[decodeURIComponent(a[0])] = decodeURIComponent(a[1]) : d[decodeURIComponent(a)] = decodeURIComponent(a);}catch(err){}
	     });
	 return d;
    },

    getCookies : function() {
	 var a = window.document.cookie || !1;
	 return !a ? !1 : this.unPack(a, "; ", "=")
    },

    getThisCookie : function(a, b, c) {
	 a = this.getCookies()[a];

	 if(!a){return false;}
	 else{a = decodeURIComponent(a);}

	 if("undefined" != typeof b && "undefined" != typeof c){
	     return this.unPack(a, b, c)
	 }else{
	     return a;
	 }
    },

// LUCIE date syntax: Thu May 07 11:28:03 EDT 2015
//RFC2822 / IETF date syntax (RFC2822 Section 3.3) : Mon, 25 Dec 1995 13:30:00 GMT
    LUCIEDateToDateMSUTC : function(a) {
	a = a.split(/\+/g);
	return Date.parse(a[0] + ", " + a[2] + " " + a[1] + " " + a[5] + " " + a[3] + " " + a[4]);
    },

    nowUTC : (new Date).getTime()


		     

     /*
       END UTILITY FUNCTIONS
     */


};

tcm.sitr.initializePremiumLinks();
// used on news page, which loads more articles via ajax when users scroll down
$(document).ajaxComplete(function() {
    tcm.sitr.initializePremiumLinks();
});

})();