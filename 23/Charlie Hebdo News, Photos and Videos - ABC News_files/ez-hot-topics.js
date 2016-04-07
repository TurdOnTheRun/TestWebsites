var rhiHotTopicsHandler = {} || rhiHotTopicsHandler;

/* IE7/8 AJAX Polyfill */
(function(e){e.ajaxSettings.xdr=function(){return window.XDomainRequest?new window.XDomainRequest:null};var t=null;var n=[];var r=function(){t=null;i()};var i=function(){if(!t){t=n.shift();if(t&&t instanceof Function)t();else t=null}};(function(t){e.extend(e.support,{iecors:!!t})})(e.ajaxSettings.xdr());if(e.support.iecors){e.ajaxTransport(function(e){var t;return{send:function(t,s){var o=e.xdr();o.onload=function(){r();var e={"Content-Type":o.contentType};s(200,"OK",{text:o.responseText},e)};o.onprogress=function(){};o.onerror=function(){r()};o.ontimeout=function(){r()};if(e.xhrFields){o.onerror=e.xhrFields.error;o.ontimeout=e.xhrFields.timeout}o.open(e.type,e.url);var u=function(){if(e.hasContent&&e.data)o.send(e.data);else o.send()};if(document.documentMode==8){n.push(u);i()}else{setTimeout(u,0)}},abort:function(){e.xdr().abort()}}})}})(ezQuery)

rhiHotTopicsHandler = (function($){
    "use strict";

    var defaults = {
        el : $('#mostpopular-wrapper'),
        apiKey : 'MPGIqc4zBFGAV3k62gEzHfK81XYRswsc',
        orderBy : 'velocity',
        depth : 3,
        dataType : 'json',
        num : 8,
		addMethod : "prepend",
        callBack : function() {}
    },
	meter = 1;

    return {
        // config object which is merged with options passed into init();
        _config : {},
        
        // default image in case one is not found
        defaultImage : "http://abcnews.go.com/topics/FileResource/themes/projects/abcnews/shared/static/abc_default_thumb.jpg",

        topicListImages : [],

        // topic ID list
        topicIdList : [],
		
		// topic <li> collection
		topicList : [],
			
        // get image
        _getImage : function (topicId, topicsLength) {
            
            var meterMax = topicsLength;

            // cache of this
            var self = this,

            // test img, see how it is stored in the JSON, or if it exists
			testImgResponse = function(imgObj) {
				
                // we'll return img
                var img = "";
                //if image doesn't have it's own property "image", fall to default
				if (! img.hasOwnProperty("Image")) {
					img = self.defaultImage;
				};
                // try to see if the img is stored in an array, 
                // if so, pull it, otherwise, look a level down the JSON
				try {
					if (imgObj.Image instanceof Array) {
						img = imgObj.Image[0].Urls.Url;
					} else {
						img = imgObj.Image.Urls.Url;
					};
				} catch(e) {
                    // if there is some sort of error, resort to the default image
					img = self.defaultImage;
				};
                // return our img, if "content" key exists, pull it, 
                // otherwise, resort to default img
				return img.hasOwnProperty("content")
					? img.content
					: self.defaultImage;
			};

			// pull the images from the api, via the topic id associated in the init request	
            $.ajax({
                url: 'http://api.ramp.com/v1/search?apikey=' + this._config.apiKey + '&sourceid=1620766,1620773,1620135&format=' + this._config.dataType + '&orderby=rel&num=1&storedpageid=' + topicId,
                dataType: this._config.dataType,
                error: this.htError
            }).success(function(res){
                 
				// grab the image urls, test them to make sure it exists
				var topicImage = testImgResponse(res.Response.ResultSet.Results.CompleteResult.EpisodeMetaData.Images);
				
				// push the image into an array with a lenght that matches our return topics array
				self.topicListImages.push({"topicImg" : topicImage,"topicId" : topicId});

				if (meter === meterMax) {
					self.htmlBuild();
				}
				
                meter++;
            
            }).error(function(){
                self.htError();
            });
        },

        // error 
        htError : function() {
            // if 500 or 404, fire error
			console.warn(' There was a problem with your request');
        },

        // init, merges config with options obj passed in on invoking
        init : function(options) {
            // cache of this
            var self = this,

            // array of topic <li>'s'
            topicList = [];

            // merge our config with the options passed in
            this._config = $.extend({},defaults,options);

            // call our data from the search API

            $.ajax({
                url: 'http://api.ramp.com/v1/topics?apikey=' + this._config.apiKey + '&format=' + this._config.dataType + '&orderby=' + this._config.orderBy + '&depth=' + this._config.depth + '&num=' + this._config.num,
                dataType: this._config.dataType,
                error: this.htError
            }).success(function (res) {
                // the response that comes back from Ajax Call
                var topics = res.Response.Topics.Topic;
                
                // Loop through each topic, while var i is less than topics length, 
                // add one and reiterate loop
                for ( var i = 0; i < topics.length; i++ ){
                    
                    // store ID of topic in an array
                    var topicId = topics[i].Id;

                    // grab the image from search api
                    self._getImage( topics[i].Id, topics.length );

                    var imgURL = self.topicListImages[i];
                    
                    // build an <li> for each topic
                    var li = {"topicId" : topicId,"topicEl" : '<li data-topicID="' + topics[i].Id + '"><a href="' + topics[i].PublishingUrl + '" title="' + topics[i].Title + '"><img src="{IMGSRC}" onerror="this.src=\'' + self.defaultImage + '\'" alt="'+ topics[i].Title + '"/></a><a href="' + topics[i].PublishingUrl + '" title="' + topics[i].Title + '"><span class="rhi-title">' + topics[i].Title + '</span></a></li>'};

                    // build an array of topicLi's, pushing each 
                    self.topicList.push(li);
                    self.topicIdList.push(topicId);
					
                } // end for loop
                
            }); // end success            
        }, // end init

        htmlBuild : function() {
            var self = this,
				// filter an object by an id and return a specific property
				getByTopicId = function(id,obj,key) {
					var prop = obj.filter(function(object) {
						return object.topicId == id;
					})[0];
					return typeof prop !== "undefined" && prop[key] ? prop[key] : (key === "topicImg" ? self.defaultImg : "");
				},
				// match img src paths to image els
				html = function() {
					var elements = [];
					$.each(self.topicIdList,function(i,id) {
						elements.push(getByTopicId(id,self.topicList,"topicEl").replace(/\{IMGSRC\}/,getByTopicId(id,self.topicListImages,"topicImg")));
					});	
					return elements.join("");
				};
				
            // create a UL and populate with LIs
            var newUl = $('<ul class="rhi-hot-topics" />').append(html());
            
            // add UL to target
            $( this._config.el )[self._config.addMethod](newUl);
            
            // if a call back exists, and it's a function, fire
            if( this._config.callBack instanceof Function ){
                this._config.callBack();
            }
        }
    }; // end return

})(ezQuery);