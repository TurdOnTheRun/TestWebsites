<!--

$(document).ready(function(){
	
	
//City List Dropdown
$("#citylist").click(function(e) {
	var $list = $("#lyrcitylist");
	if($list.is(':visible')) {
    	$list.slideUp('normal');
	}
  
	if(!$list.is(':visible')) {
		if (!$list.hasClass("loaded"))
			$list.load('/functions/ajax/getcitylist.php', '', function(){
				$list.addClass("loaded").show();
			});
		$list.slideDown('normal');
  }
});



/*
	//legacy
    var $leaf = $("#leaf0");
    var isSel = $leaf.hasClass("sel");

    $leaf.hover(
    function(){
            $leaf.addClass("sel");
            $("#imgdropdown").attr('src', '/img/zzbuttons/btn_dropdown_sel1.gif');
            if (!$("#lyrCityList").hasClass("loaded"))
                    $('#lyrCityList').load('/functions/ajax/getcitylist.php', '', function(){
                            $("#lyrCityList").addClass("loaded").show();
                    });
            else
                    $("#lyrCityList").show();
    }, 
    function (){
            $("#lyrCityList").hide();
            if (!isSel)
            {
                    $leaf.removeClass("sel");
                    $("#imgdropdown").attr('src', '/img/zzbuttons/btn_dropdown.gif');
            }
    });
  */  

    //$('#addthisbar').load('/functions/ajax/addthis.htm', '', function(){});
    //Load addthis script
    $.ajax({
        url: "http://s7.addthis.com/js/250/addthis_widget.js",
        dataType: 'script',
        success: function(){
        //Global AddThis Setup
        window.addthis_config = {
            username : 'kristiaanve',
            domready : '1',
            data_ga_property: 'UA-342804-1',
            data_ga_social : 'true'
            }
        }
    });
    
    
    //Language Selector
    var txt = new Object;
    txt["de"] = "Diese Seite auf Deutsch";
    txt["en"] = "This page in English";
    txt["es"] = "Esta página en español";
    txt["fr"] = "Cette page en français";
    txt["it"] = "Questa pagina in italiano";
    txt["nl"] = "Deze pagina in het nederlands";
    txt["pt"] = "Esta página em português";
    txt["ru"] = "Эта страница на русском языке";
    
    var $icon = $('ul#int_versions li');
    
    $icon.mouseenter(function() {
        var nr = -1;
        var tot = 0;
        var sel = $(this).attr('class');
        $('ul#int_versions li').each(function(index)
        {
            if ($(this).attr('class') == sel)
            {
                nr = index;
            }
            tot = index;
        });
        if (nr >= 0)
        {
            var w = nr * 24;
            $("#bubble").css("top", "52px");
            $("#bubble").css("left", "650px");
            $("#bubble").addClass('arrow' + (tot - nr).toString());
            $("#bubble").text(txt[sel]);
            $("#bubble").show();
        }
    });
    $icon.mouseleave(function() {
        $("#bubble").hide();
        $("#bubble").removeClass();
    });

    $icon.click(function() {
        var path = $(this).find("span.nm").text();
        window.location.href = path;
    });
    
});



function search_in(obj)
{
	obj.src="/img/zzbuttons/btn_search_in.gif";
}
function search_out(obj)
{
	obj.src="/img/zzbuttons/btn_search.gif";
}

//-->