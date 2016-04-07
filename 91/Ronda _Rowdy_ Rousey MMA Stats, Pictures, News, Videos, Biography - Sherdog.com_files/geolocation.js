function Geolocation(config) {
    var strCountryCode = '';
    var objArticle;
    var arrArticles = [];
    var objEvent;
    var arrEvents = [];
    var objCover;
    var arrCover = [];
    var arrArticles, arrEvents, arrCovers = [];
    var arrReturnArticles, arrReturnEvents, arrReturnCovers = [];
    
    this.getCountryCode = function(value) {
        return this.strCountryCode;
    }

    this.setCountryCode = function(value) {
        this.strCountryCode = value;
    }
    
    this.init = function(config) {
        var oConfig = config.result.data; 
        this.arrReturnArticles = new Array();
        this.arrReturnEvents = new Array();
        this.arrReturnCovers = new Array();
        
        arrCovers = oConfig[0].coverpanel;
        arrArticles = oConfig[1].articles;
        if( oConfig[2] ){ arrEvents = oConfig[2].events; }
        
        if(arrCovers !== undefined) {
            for (var i=0; i<=arrCovers.length-1; i++) {
                this.setCover(arrCovers[i]);
            }
        }
        
        if(arrArticles !== undefined) {
            for (var i=0; i<=arrArticles.length-1; i++) {
                this.setArticle(arrArticles[i]);
            }
        }
        
        if(arrEvents !== undefined) {
            for (var i=0; i<=arrEvents.length-1; i++) {
                this.setEvent(arrEvents[i]);
            }
        }
        
        arrCovers = null;
        arrArticles = null;
        arrEvents = null;
    }

    this.setCover = function(cover) {
        var numCovers = arrReturnCovers.length;

        for (var i=0; i <= numCovers; i++) {
            var currentArray = this.arrReturnCovers[i];
            var currentId = '';
            
            if (currentArray != undefined) {
                currentId = currentArray['id']; 
            }
            
            if (currentId !== cover['id'] ) {
                this.objCover = new Object();
                this.objCover['id']          = cover['id'];
                this.objCover['title']       = cover['title'];
                this.objCover['url']         = cover['url'];
                this.objCover['description'] = cover['description'];
                this.objCover['imageurl']    = cover['image-url'];
                this.objCover['imagethumb']  = cover['image-thumb'];
                this.objCover['sbvideo_id']  = cover['sbvideo_id'];
                this.objCover['date-start']  = cover['date-start'];
                this.objCover['date-end']    = cover['date-end'];
                this.objCover['category']    = cover['category'];
                this.objCover['sbvideoid']   = cover['sbvideoid'];
                this.objCover['embedcode']   = cover['embedcode'];
                
                this.arrReturnCovers.push(this.objCover);
            }
        }
    }

    this.getCovers = function() {
        return this.arrReturnCovers;
    }
    
    this.setArticle = function(article) {
        this.objArticle = new Object();
        this.objArticle['id']           = article['id'];
        this.objArticle['title']        = article['title'];
        this.objArticle['description']  = article['description'];
        this.objArticle['url']          = article['url'];
        this.objArticle['imageUrl']     = article['image-url'];
        this.objArticle['date']         = article['date'];
        
        if(article['authors'][0] != undefined) {
            this.objArticle['authors-name']     = article['authors'][0].name;	
            this.objArticle['authors-url']      = article['authors'][0].url;
        } else {
            this.objArticle['authors-name']      = '';
            this.objArticle['authors-url']       = '';
        }
        
        this.arrReturnArticles.push(this.objArticle);
    }

    this.getArticles = function() {
        return this.arrReturnArticles;
    }

    this.setEvent = function(event) {
        this.objEvent = new Object();
        this.objEvent['id']                    = event['id'];
        this.objEvent['name']                  = event['name'];
        this.objEvent['title']                 = event['title'];
        this.objEvent['organization']          = event['organization'];
        this.objEvent['location']              = event['location'];
        this.objEvent['url']                   = event['url'];
        this.objEvent['date']                  = event['date'];
        this.objEvent['day']                   = event['day'];
        this.objEvent['month']                 = event['month'];
        this.objEvent['year']                  = event['year'];
        this.objEvent['fighter1-fullname']     = event['fighter1-fullname'];
        this.objEvent['fighter1-lastname']     = event['fighter1-lastname'];
        this.objEvent['fighter1-image']        = event['fighter1-image'];
        this.objEvent['fighter2-fullname']     = event['fighter2-fullname'];
        this.objEvent['fighter2-lastname']     = event['fighter2-lastname'];
        this.objEvent['fighter2-image']        = event['fighter2-image'];
        this.arrReturnEvents.push(this.objEvent);
    }

    this.getEvents = function() {
        return this.arrReturnEvents;
    }
    
    this.init(config);
}