(function(){
{
    
    var at_amazon_locale_map = {
                	"CA":"ca",
	"CN":"cn",
	"IN":"in",
	"DE":"de",
	"FR":"fr",
	"GB":"co.uk",
	"JP":"co.jp",
	"US":"com"
    };

    var at_orgUnit = {
        	"ca":"15",
	"cn":"28",
	"in":"31",
	"de":"3",
	"fr":"8",
	"co.uk":"2",
	"co.jp":"9",
	"com":"1"
    };

    var at_impression_recorders = {
        	"ca":"www.assoc-amazon.ca",
	"cn":"www.assoc-amazon.cn",
	"in":"ir-in.amazon-adsystem.com",
	"de":"www.assoc-amazon.de",
	"fr":"www.assoc-amazon.fr",
	"co.uk":"www.assoc-amazon.co.uk",
	"co.jp":"www.assoc-amazon.jp",
	"com":"www.assoc-amazon.com"
    };

    var at_marketplaces = {
        	"CA":new Array (),
	"CN":new Array (),
	"IN":new Array (),
	"DE":new Array (	"javari"),
	"FR":new Array (	"javari"),
	"GB":new Array (	"javari"),
	"JP":new Array (	"javari"),
	"US":new Array (	"smallparts",	"amazonwireless",	"endless",	"myhabit")
    };
 
    // Script will bail out after this many milliseconds.
    var at_timeout = 2000;

    var at_start = new Date();
    at_start = at_start.getTime();

    var at_tagID;
    var at_localeID;
    var at_overWrite;

    //REMOVE COMMENT: decorate normal link type
    var at_code = 'as2';
    var at_scripts = document.getElementsByTagName('script');
    for (var i=0; i < at_scripts.length; i++)
    {
        var source = new String(at_scripts[i].src);
        var at_tagIDObj;
        //Change the script name to be the new one
        if (at_tagIDObj = source.match(/auto-tagger.*[&?]tag=([^&]+)/))
        {
        	//Got the at_tagID form the script
            at_tagID = at_tagIDObj[1];
	}
	if(at_tagIDObj = source.match(/auto-tagger.*[&?]locale=([^&]+)/))
	{
            at_localeID = at_tagIDObj[1];
	}
	if(at_tagIDObj = source.match(/auto-tagger.*[&?]overwrite=([\d])/))
	{
            at_overWrite = at_tagIDObj[1];
            break;
        }
    }
    
    if(at_overWrite == "1"){
    	at_overWrite = parseInt(at_overWrite);
    }else{
    	at_overWrite = 0;
    }
    
    var at_locale = at_amazon_locale_map[at_localeID];
    var marketplace_urls = at_marketplaces[at_localeID];
    
    //[Pavan] Now, we need some way to handle the Beta and Gamma cases where the locale is different from the actual locale
    var at_amazon        = new RegExp("^(http|https)://(www|[\\w\\-\\.]+)?amazon\\.(" + at_locale +")/", "i");
    
//Now, All we care for other marketplaces is the FQDN matches and we add the tag,link at_code and ref tags
    
    var marketplaceList = new Array();
    
    var marketplaceListIndex = 0;
    if(marketplace_urls){
	    for(marketplaceListIndex = 0; marketplaceListIndex < marketplace_urls.length; marketplaceListIndex++){
    	
    		//Handle some special cases.
	    	//Why dont we do this in config? It is just one case, too much overhead to maintain the marketplace specific config.
	    	var mkt_locale = at_locale;
    		if(at_locale == "co.jp"){
    			mkt_locale = "co.jp|jp";
	    	}
    	
    		marketplaceList[marketplaceListIndex]  = new RegExp("^(http|https)://(www\\.)?(" +marketplace_urls[marketplaceListIndex] + ")\\.(" + mkt_locale +")/","i");
            }
    }
    
    
    var at_allLinks = document.getElementsByTagName('a');
    var at_imp = {};

    

    var at_timeoutReached = false;

    // Do not tag links in unsupported browsers
    var at_amazonTreatment = false;
    var at_agent = new String(navigator.userAgent);
    if (at_agent.match(/(MSIE.*Windows|Firefox|Netscape|Windows.*Gecko|Safari\/)/))
    {
        at_amazonTreatment = true;
    }

    var at_amazonLinkList = new Array;

    //This is the idea. We scal all links. If the link needs to be tagged, We find the location where this tag functionality needs to be added 
    //We place a replacable placeholder there and in the enhance links functionality, We replace them with required tag and linkcodes.
    for (var i=0; i < at_allLinks.length; i++)
    {
        // Check if it's an Amazon redirect link
        var href = new String(at_allLinks[i].href);
        var results;
        var tag_match;
        
        var doReplace = false;

        tag_match = href.match(/tag=([^&]+)/);
        
        if ( (results = href.match(at_amazon)) )
        {
        	at_amazonLinkList[i] = at_allLinks[i].href;
            var locale      = results[3];
            var org         = at_orgUnit[locale];
            
            if(at_amazonTreatment){
            	
            	if(tag_match){
            		if(at_overWrite){
                		//enhance links by overwriting the tag. Do not mess with the link code. It might have been modified by product previews script.
				// The number of links modified is anyway found my the aggregated impression recorder call by this script.
                		at_amazon_enhanceLink(at_allLinks[i],at_tagID,at_code);
                		at_imp = at_amazon_logImpression(at_allLinks[i],at_imp, locale, at_tagID);
            		}
                }else{
                	at_amazon_enhanceLink(at_allLinks[i],at_tagID,at_code);
                	at_imp = at_amazon_logImpression(at_allLinks[i],at_imp, locale, at_tagID);
                }
            }
            
            //Check if there is no tag and add the tag placeholder.            
            
        }
        // Check if it's an old-style marketplace link
        else 
        {
       		for(var regExNum = 0 ; regExNum < marketplaceList.length; regExNum++){
    
               if(results = href.match(marketplaceList[regExNum])){
        			
        			// There is tag. Dont do anything.
        			if(tag_match){
        				if(at_overWrite){
        					//Find a way to tell we have to overwrite
        					at_amazon_enhanceLink(at_allLinks[i],at_tagID, at_code);
        					at_imp = at_amazon_logImpression(at_allLinks[i],at_imp, at_locale, at_tagID);
        				}
        				
        			}else{
        			
        			//else add tag in the similar fashion
        				at_amazon_enhanceLink(at_allLinks[i],at_tagID,at_code);
        				at_imp = at_amazon_logImpression(at_allLinks[i],at_imp, at_locale, at_tagID);
        			}
        			
        		}
        	}
        		
        }
         
        
		
        // Have we gone over our time limit?
        var now = new Date();
        now = now.getTime();
        if (now > (at_start + at_timeout))
        {
            at_timeoutReached = true;
            break;
        }
    }



    var at_total = 0;

    // Send data to impression recorder via img tags
    //Record the counts here
    for (var locale in at_imp)
    {
        var impression_recorder = at_impression_recorders[locale];

        for (var tag in at_imp[locale])
        {
            // Record the fact that this script was served by using a different link code.
	   // TODO: Find out the link code here
            var tc = (at_amazonTreatment) ? 'at3' : 'pv2';
            (new Image()).src = window.location.protocol + '//' + 
                  impression_recorder + '/e/ir' +
                  '?l=' + tc +
                  '&t=' + at_tagID +
                  '&o=' + at_orgUnit[locale];
            	//TODO: Find a link code to be used here to log the number of auto tagging links 
                var link_at_code = 'at1';
                link_at_code = link_at_code.replace(/^-/, '');
                (new Image()).src = window.location.protocol + '//' + 
                      impression_recorder + '/e/ir' +
                      '?t=' + at_tagID +
                      '&l=' + link_at_code +
                      '&o=' + at_orgUnit[locale] +
                      '&i=' + at_imp[locale][at_tagID];

                at_total += at_imp[locale][at_tagID];
        }
    }

    if (at_timeoutReached)
    {
        (new Image()).src = window.location.protocol + '//' 
                + at_impression_recorders[locale] + '/e/ir?t=' + at_tagID 
                + '&l=to0&o=' + at_orgUnit[locale] + '&i=' + at_total;
    }
}

function at_amazon_InsertLinkCode(href,at_code)
{
    //Insert linkcode here. Piggyback on the tag parameter to find where to place this guy
    return href;
}

//Convert this to count the number of links replaced per marketplace
function at_amazon_logImpression(link,at_imp, locale, tag, count)
{
	
	var lk = link.href;
    if (!count)
    {
        count = 1;
    }    
    
    if (at_imp[locale])
    {
        if (at_imp[locale][tag])
        {
            if (at_imp[locale][tag])
            {
                at_imp[locale][tag] = at_imp[locale][tag] + count;
            }
            else
            {
                at_imp[locale][tag] = count;
            }
        }
        else
        {
            at_imp[locale][tag] = {};
            at_imp[locale][tag] = count;
        }
    }
    else
    {
        at_imp[locale] = {};
        at_imp[locale][tag] = {};
        at_imp[locale][tag] = count;
    }

    return at_imp;
}


// Attach product data to the link
function at_amazon_enhanceLink(link,tag,at_code)
{
	var hasQuery = new RegExp("[?]","i");
	var hasSlash = new RegExp("\/$")	
	var ref_match = new RegExp("\/(ref=[\\w]+)\/\?", "i");
    if (!link.name)
    {
    	
    	var tag_match = link.href.match(/tag=([^&]+)/);
	var tag_param = link.href.match(/tag=/);
    	var linkCode_match = link.href.match(/linkCode=([^&]+)/);
    	 
    	
    	//For all links. We should not care as per the spec
    	if(!link.href.match(hasQuery)){
    		//check if the URL ends with a / else append it
    			link.href = (link.href.match(hasSlash))?link.href+"?":link.href+"/?";
    	}
    	
    	if(linkCode_match){
    		link.href = link.href.replace(linkCode_match[1],linkCode_match[1]);
    	}else{
    		link.href = link.href.replace(/\?/,'?linkCode='+ at_code + '&');
    	}
    	
    	if(tag_match){
    		link.href = link.href.replace(tag_match[1],tag);
    	}else if(tag_param){
		link.href = link.href.replace(/tag=/,'tag='+ tag);
	}else{
    		link.href = link.href.replace(/\?/,'?tag='+ tag + '&');
    	}
    	
    	var match;
    	if(match = link.href.match(ref_match)){
    		link.href = link.href.replace(match[1],'ref=as_at');
    	}else{
    		link.href = link.href.replace(/\/\?/,'/ref=as_at?');
    	} 
        
    }
}
})();



