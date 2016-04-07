if(typeof(EZDATA) == 'undefined') { EZDATA = {}; }


// Validate Search
EZDATA.validateSearch = function(initString) {
	var str = ezQuery("#ezsearch-string").val().replace(/=|<|>|\/|\(|\)|;/g,'')
	if (str.length > 0 && str != initString) {
		ezQuery("#ezsearch-string").val(str);
		return true;
	}
	return false;
}

// Validate Search On Click
//caller is the object that submitted the search request
// It is required that it be a child of a form node.
    EZDATA.validateSearchClick = function(initString,caller) {
	if (EZDATA.validateSearch(initString)) {
        if(caller) {
            caller.parentNode.submit();
        } else {
            document.forms["ez-searchMod-form"].submit()
        }
	}
};



// Keep predefined text in search box
EZDATA.initSearchboxField = function(initialSearchboxText){
    var box = ezQuery("#ezsearch-string");
    var blur = function(){
        if (box.val() == "") {
            box.val(initialSearchboxText);
            box.addClass('ez-inactive');
        }else{
            box.removeClass('ez-inactive');
        }
    };
    var focus = function(){
        if (box.val() == initialSearchboxText) {
            box.val("");
            box.removeClass('ez-inactive');
        }
    };
	box.bind("blur", blur);
    box.bind("focus", focus);
    blur();
}


// clear value of search box
EZDATA.clearSearchboxField = function() {
	ezQuery("#ezsearch-string").each(function() {
		var box = ezQuery(this);
		if (box.val() == EZDATA.initialSearchboxText) {
			box.val("");
		}		
	});
}


/* Searchbox Autocomplete */

EZDATA.searchMod_queryExpansion_searchTimer = null;

EZDATA.searchMod_queryExpansion_init = function(){
    ezQuery("#ezsearch-string").attr("autocomplete", "off");
    
    ezQuery("#ezsearch-string").bind("blur", function(event){
        ezQuery("#ezTypeAhead").css("display", "none");
    });
    
    ezQuery("#ezTypeAhead").bind("blur", function(){
        ezQuery("#ezTypeAhead").css("display", "none");
    });
    
    ezQuery("#ezsearch-string").bind("keydown", function(event){
        var selected = ezQuery("#ezTypeAhead a.selected");
        
        // The up/down key events
        if (event.keyCode == 38 || event.keyCode == 40){
           if (selected.length > 0){
                if (event.keyCode == 38) {
                    selected = selected.prev();//up
                }else{
                    selected = selected.next();//down
                }
            }
            
            if (selected.length == 0){
                if (event.keyCode == 38) {
                    selected = ezQuery("#ezTypeAhead a:last-child");
                }else{
                    selected = ezQuery("#ezTypeAhead a:first-child");
                }
            }
            
            if (selected.length == 0) { return; }
            
            ezQuery("#ezTypeAhead").css("display", "block");
            selected.addClass("selected").siblings().removeClass("selected");
            ezQuery("#ezsearch-string")[0].value = ezQuery(selected[0]).text();
            
        // Any other keys pressed
        }else{
            if (EZDATA.searchMod_queryExpansion_searchTimer != null){
                clearTimeout(EZDATA.searchMod_queryExpansion_searchTimer);
            }
            EZDATA.searchMod_queryExpansion_searchTimer = setTimeout(EZDATA.searchMod_queryExpansion_getData, 300);
        }
    });
};


EZDATA.searchMod_queryExpansion_callback = function(data, textStatus){
    var el = ezQuery("#ezTypeAhead");
    var list = data.ac.q;
    var content = "";
    var reverse = EZDATA.searchAutoCompleteOrderReverse==true?true:false;
    
    if (list.length > 0){
        el.css("display", "block");
    }else{
        el.css("display", "none");
    }
    
    for (var i = 0; i < list.length; i+=1){
        var encodedQ = encodeURIComponent(list[(reverse?(list.length-1)-i:i)]);
        var url = ezAutocompleteSearchUrl + "q=" + encodedQ.replace(/'/g, "%27");
        content += "<a href='' onmousedown='window.location=\""+ url + "\"'>" + list[(reverse?(list.length-1)-i:i)] + "</a>";
    }
    
    el.each(function(){
        this.innerHTML = content;
    });
};


EZDATA.searchMod_queryExpansion_getData = function(){
    var url = ezAutocompleteServiceUrl + encodeURIComponent(ezQuery("#ezsearch-string")[0].value);
    var head = document.getElementsByTagName("head")[0];
    var newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.src = url;
    head.appendChild(newScript);
};


//show filter counts -- requires passing in a jQuery obj
EZDATA.showFilterCounts = function(ezQueryObj) {
    ezQuery(".ez-searchMod-filter-item", ezQueryObj).each(function() {
        var f = ezQuery(this);
        var a = ezQuery("a", f);
        var count = f.attr("count");
        if (count > 0) {
            a.append(" <span>(" + count + ")</span>");
        }
    })
};