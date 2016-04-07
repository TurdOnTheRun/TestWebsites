//establish environment variables for the ad-stack based on which widget is being called
(function() {
   var protocolToUse = (location.protocol == "https:") ? "https" : "http";
   var embedURL = protocolToUse + "://content.synapsys.us/embeds/realestate/rand_politics_7/remnant.js";
   var widgetURLs = [
      protocolToUse + "://w1.synapsys.us/widgets/realestate/total_votes_2012.html",
      protocolToUse + "://w1.synapsys.us/widgets/realestate/most_voted.html",
      protocolToUse + "://w1.synapsys.us/widgets/realestate/highest_pct_votes.html",
      protocolToUse + "://w1.synapsys.us/widgets/realestate/highest_pct_dem.html",
      protocolToUse + "://w1.synapsys.us/widgets/realestate/highest_pct_other.html",
      protocolToUse + "://w1.synapsys.us/widgets/realestate/most_voted_dem.html",
      protocolToUse + "://w1.synapsys.us/widgets/realestate/most_voted_other.html",
   ];
   var types = [
      "realestate_total_votes_2012",
      "realestate_most_voted",
      "realestate_highest_pct_votes",
      "realestate_highest_pct_dem",
      "realestate_highest_pct_other",
      "realestate_most_voted_dem",
      "realestate_most_voted_other",
   ];
   var randNum = Math.floor(Math.random() * widgetURLs.length);
   var domain = (function() {
      var myHost = top.location.host;
      var tempHost = myHost.split(".");
      switch (tempHost.length) {
         case 0:  //crash me, please
         case 1:  //crash me, please
            break;
         case 2:  //exactly what we want
            break;
         default: //break it down
            //AT&T uses att.yahoo.com, so here's the exception to avoid a collision with yahoo.com
            if (tempHost[tempHost.length - 3] == "att" && tempHost[tempHost.length - 2] == "yahoo" && tempHost[tempHost.length - 1] == "com") {
               myHost = "att.yahoo.com";
            } else if (tempHost[tempHost.length - 2] == "co" && tempHost[tempHost.length - 1] == "uk") {
               myHost = tempHost[tempHost.length - 3] + "." + tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1];
            } else {
               myHost = tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1]; //no matter how many layers of subdomain there are, this should return only the domain
            }
            break;
      }
      return myHost;
   })();
   var adUnitName = domain.split(".").join("_") + "_remnant_300x250";
   
   var currentScript = document.currentScript || (function() {
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
         if (scripts[i].src.indexOf(embedURL) != -1) {
            return scripts[i];
         }
      }
   })();
      
   var q = {
      dom: domain,   //the domain according to the client
      type: types[randNum],  //the widget's type
      subd: false,   //deprecated; intended to indicate if this was going to show up on the old finance subdomains
      remn: true, //if this is being served as a remnant
      src: embedURL, //this
      name: adUnitName,
      widU: widgetURLs[randNum],  //full url to the widget's live code
      widW: 300,  //the widget's width
      widH: 600,  //the widget's height
      adW: 300,  //the ad's width
      adH: 250,  //the ad's height
      ofx: 0,  //offset in the X direction that the ad-stack needs to be adjusted to match the designated ad-space for this widget
      ofy: 350,  //offset in the Y direction that the ad-stack needs to be adjusted to match the designated ad-space for this widget
      rand: Math.random() * 10000000000000000000,
   }
   
   var newScript = document.createElement("script");
   newScript.src = protocolToUse + "://content.synapsys.us/l/n/index-mdb.php?"+Object.keys(q).map(function(key){return encodeURIComponent(key)+"="+encodeURIComponent(q[key])}).join("&");
   currentScript.parentNode.insertBefore(newScript, currentScript);
   
})();
