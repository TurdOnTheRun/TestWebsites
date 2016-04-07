if(typeof(EZDATA) == 'undefined') { EZDATA = {}; }

/*
 * Initializes the video/audio highlights
 */
EZDATA.itemMod_init = function(sticky, scriptId, highlightClasses){
    if (sticky.toLowerCase() == 'sticky'){
        sticky = true;
    }else{
        sticky = false;
    }
    
    var target = ezQuery(".ez-mod-content[scriptid=" + scriptId +"]");
    
    /* Add console configurable link parameters */
   if (EZDATA.itemUrlParameter) {
       var param = EZDATA.itemUrlParameter.substr(0,1) == "&" ? EZDATA.itemUrlParameter : "&" + EZDATA.itemUrlParameter;
       ezQuery(".ez-itemMod-item a", target).each(function(){
           var linkEl = ezQuery(this);
           var delim = linkEl.attr('href').indexOf("?") >= 0 ? "" : "?";
           linkEl.attr('href', linkEl.attr('href') + delim + param);
       });
       ezQuery(".ez-itemMod-item .ez-snippets .ez-highlight", target).each(function(){
           var linkEl = ezQuery(this);
           var delim = linkEl.attr('href').indexOf("?") >= 0 ? "" : "?";
           linkEl.attr('href', linkEl.attr('href') + delim + param);
       });
   }
   
    /* Switch the currently displayed snippet thumbnail */
    var switchThumbnails = function(ts, item){
        var highlightText = ezQuery(".ez-highlight[ts='"+ ts +"']", item);
        if (highlightText.length == 0) return;
        
        // switch thumbnail
        var itemThumb = ezQuery(".ez-thumbs .ez-snippetThumb[ts='"+ ts +"']", item);
        itemThumb.removeClass("ez-hidden");
        itemThumb.siblings("img").addClass("ez-hidden");
        
        // make the markers active
        var indicator = ezQuery(".ez-snippetThumbIndicator[ts='"+ ts +"']", item);
        
        indicator.addClass("ez-active").removeClass("ez-inactive");
        indicator.siblings().removeClass("ez-active").addClass("ez-inactive");
    };
    
    /* Hide the currently displayed snippet thumbnail */
    var hideThumbnails = function(ts, item){
        var highlightText = ezQuery(".ez-highlight[ts='"+ ts +"']", item);
        if (highlightText.length == 0) return;
        
        // show primary thumbnail
        ezQuery(".ez-thumbs .ez-snippetThumb", item).addClass("ez-hidden");
        ezQuery(".ez-thumbs .ez-primaryThumb", item).removeClass("ez-hidden");
        
        // activate primary indicator
        var indicator = ezQuery(".ez-snippetThumbIndicator", item);
        indicator.removeClass("ez-active");
        indicator.addClass("ez-inactive");
        
        ezQuery(".ez-primaryThumbIndicator", item).addClass("ez-active").removeClass("ez-inactive");
    };
    
    /* Initialize the timeline markers/thumbs */
    ezQuery(".ez-itemMod-item .ez-timestamps", target).each(function(){
        var currentTimeline = ezQuery(this);
        var item = currentTimeline.parent().parent().parent();
        var timeStamps = ezQuery(".ez-timelinestamp", currentTimeline);
        
        timeStamps.each(function(){
            var stamp = ezQuery(this);
            var ts = stamp.attr("ts");
		    var h = ezQuery(".ez-highlight[ts='" + ts + "']", stamp.parent().parent());
			if (highlightClasses == "" || !highlightClasses) {
				var highlightClasses = "ui-tooltip-jtools";
			}
			EZDATA.itemMod_truncate2(h, 150, "...", "...");
			//console.log(h.html());
		    stamp.qtip({
		        content: {
		            text: h.html()
		        },
		        show: {
		            event: "mouseenter"
		        },
		        position: {
		          my: 'bottom center',  // Position my top left...
		          at: 'top center', // at the bottom right of...
		          target: stamp // my target
		       },
			   style: {
			      classes: highlightClasses // eg. 'ui-tooltip-jtools'
			   }
		    });
			
            stamp.bind("mouseover", function(){
                switchThumbnails(stamp.attr("ts"), item);
            });
            
            if (!sticky){
                hideThumbnails(stamp.attr("ts"), item);
                
                stamp.bind("mouseout", function(){
                    hideThumbnails(stamp.attr("ts"), item);
                });
            }
            
        });        
        if (sticky) {
            switchThumbnails(ezQuery(timeStamps[0]).attr("ts"), item);
        }
        
    });
    
    /* Initialize the thumb indicators */
    ezQuery(".ez-itemMod-item .ez-snippetThumbIndicators", target).each(function(){
        var item = ezQuery(this).parent().parent();
        var indicators = ezQuery(".ez-snippetThumbIndicator", this);
        
        indicators.each(function(){
            var stamp = ezQuery(this);
            
            stamp.bind("mouseover", function(){
                switchThumbnails(stamp.attr("ts"), item);
            });
            
            if (!sticky){
                stamp.bind("mouseout", function(){
                    hideThumbnails(stamp.attr("ts"), item);
                });
            }
        });
        
        var primaryIndicator = ezQuery(".ez-primaryThumbIndicator", this);
        
        var primaryMouseOver = function(){
            var primaryThumb = ezQuery(".ez-primaryThumb", item);
            primaryThumb.removeClass("ez-hidden");
            primaryThumb.siblings("img").addClass("ez-hidden");
            
            var timeStamp = ezQuery(".ez-timelinestamp.ez-active", item);
			var ts = timeStamp.attr("ts");
			
			indicators.removeClass("ez-active").addClass("ez-inactive");
        };
        
        primaryIndicator.bind("mouseover", primaryMouseOver);
        primaryIndicator.bind("click", function(){
            EZDATA.trackGaEvent(EZDATA.pageName, 'navigation', ezQuery(".ez-main .ez-title", item).attr("galabel"));
            location.href = ezQuery(".ez-main .ez-title", item).attr("href");
        });
        
        if (sticky) {
            primaryMouseOver();
        }
    });
    
    /* bind highlight click events */
    if (sticky) {
        ezQuery(".ez-itemMod-item .ez-highlight", target).each(function(){
            var item = ezQuery(this).parent().parent().parent().parent();
            var gaLabel = ezQuery(".ez-main .ez-title", item).attr("galabel");
            
            ezQuery(this).bind("click", function(){
                EZDATA.trackGaEvent(EZDATA.pageName, 'navigation', gaLabel);
                location.href = ezQuery(this).attr("href");
            });
        });
    }
                
    //video & audio thumb overlays
    ezQuery(document).ready(function() {
        ezQuery(".ez-Video .ez-thumbs a", target).each(function() {
            var ah = ezQuery(this).height();
            ezQuery('<div class="ez-plainOverlay"></div>').appendTo(ezQuery(this));
            ezQuery(".ez-plainOverlay", ezQuery(this)).css("height", ah + "px");
        });   
        ezQuery(".ez-Audio .ez-thumbs a", target).each(function() {
            var ah = ezQuery(this).height();
            ezQuery('<div class="ez-plainOverlay"></div>').appendTo(ezQuery(this));
            ezQuery(".ez-plainOverlay", ezQuery(this)).css("height", ah + "px");
        });     
    });     

};



/* 
 * Truncates the snippets around the keyword and optionally adds prefix/postfix
 * There should only be bold tags (keywords) inside the ez-highlight elements
 */
EZDATA.itemMod_truncate = function(maxLen, prefix, postfix){
	EZDATA.itemMod_truncate2(".ez-itemMod-item .ez-highlight", maxLen, prefix, postfix);
};


/*
 * Truncates HTML strings in place up to a specified length counting only the non-tag
 * characters in the length of the truncated string.
 *   
 * i.e. if the input string was "<b>hello</b> world" and we want to truncate to 5
 * characters, we want the resulting string to be "<b>hello</b>" rather than 
 * "<b>hel"
 * 
 * @param {string} trigger CSS Selector string for items that need truncation
 * @maxLen {number} maxLen The max length of the truncated string
 * @prefix {sting} String to prepend to truncated string
 * @postfix {string} String to append to truncated string
 */
EZDATA.itemMod_truncate2 = function(trigger, maxLen, prefix, postfix){

	maxLen = parseInt(maxLen, 10);
    if (isNaN(maxLen)){
        maxLen = 160;
    }
    
    if (prefix == null || prefix.length == 0){
        prefix = "&#8220;&#8230;";
    }
    if (postfix == null || postfix.length == 0){
        postfix = "&#8230;&#8221;";
    }
	
	ezQuery(trigger).each(function(){
        var content = this.innerHTML;
        content = content.replace(/<B/g, '<b');
        content = content.replace(/<\/B>/g, '</b>');
        
        var text = ezQuery(this).text();

        if (text.length > maxLen) {
            var i = content.indexOf('<b');
            var j = content.indexOf('</b>');
            
            var pre = content.slice(0, i);
            pre = pre.slice(-1 * maxLen / 2);
            pre = pre.replace(/^[a-z0-9.]* /i, '');
            
            var post = content.slice(i, content.length);
            
            var targetPostLen = maxLen - pre.length;
            var targetPostText = text.slice(i, targetPostLen + i);
            targetPostText = targetPostText.replace(/&amp;/g, '&');
            
            var elemLen = 0;
            var buf = post;
            buf = buf.replace(/&amp;/g, '&');
            buf = buf.replace(/&lt;&gt;/g, '<>');
            
            /*
             * Maximum times to try the tag-character counting loop before giving up 
             */
            var maxAttempts = 400;
            var attempt = 0;
	
            /*
             * This loop is used to count the number of characters that are 
             * used for tag elements in the original HTML string.  
             * 
             * We add that number to the max length of the truncated string so we include
             * the tags in the final truncated string.
             * 
             */
            while ( buf.indexOf(targetPostText) == -1 &&
            		(i = buf.indexOf('<')) != -1 &&
            		(j = buf.indexOf('>')) != -1) {
                
            	elemLen += j - i + 1;
                
            	buf = buf.slice(0, i) + buf.slice(j + 1, buf.length);
				
            	/*
            	 * Give up on truncation if we hit a certain number of attempts to count 
            	 * the tag characters in a string.
            	 */
            	if (attempt++ > maxAttempts) {
            		//console.log("Skipping truncation after 100 attempts for: '" + content + "'");
            		targetPostLen = post.length;
            		elemLen = 0;
            		break;
            	}
            }
            
            post = post.slice(0, targetPostLen + elemLen);
            
            /*
             * Note (gzhovnirovsky 9/20/11):
             * Changed the regex here from "/[a-z0-9<>]+$/i" to "/[a-z0-9<]+$/i".
             * I think we are trying to prevent truncating the string in the middle
             * of a word.  However, by truncating ">" at the end of the string, we 
             * potentially leave a "</b" at the end of a truncated string rather
             * than "</b>";
             *  
             */
            post = post.replace(/[a-z0-9<]+$/i, '');
            
            var newContent = pre + post;
            newContent = ezQuery.trim(newContent);
            
            this.innerHTML = newContent;
        }
        
        this.innerHTML = prefix + this.innerHTML + postfix;
    });
}
