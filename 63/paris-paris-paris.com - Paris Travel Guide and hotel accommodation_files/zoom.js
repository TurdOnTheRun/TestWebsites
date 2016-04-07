function switchTag(value)
{
	var tag2switch = new Array('select', 'object', 'embed');
	for ( keyVar in tag2switch ) {
		oTAG = document.getElementsByTagName(tag2switch[keyVar]);
		// loop through all the image controls and do some auto formating
		for (LC = 0; LC < oTAG.length; LC++ ) {
			oTAG[LC].style.visibility = value;
		}
	}
}

function showZoom(imgSrc,imgWidth,imgHeight,captionIndex){

	// switch off select / object / embed
	switchTag('hidden');

    var cache = document.getElementById('cache');
    var zoom = document.getElementById('zoom');
    var zoom_a = document.getElementById('zoom_a');
    var zoom_img = document.getElementById('zoom_img');
    var zoom_caption = document.getElementById('zoom_caption');
    
	zoom_caption.innerHTML = imageCaption[captionIndex];
	
    // zoom_a.setAttribute('href','javascript:hideZoom()');
    zoom_img.setAttribute( 'src', imgSrc );
    zoom_img.setAttribute( 'border', 0 );
     
    if( /MSIE [5678]/.test( navigator.appVersion ) )
    {
        var yPos = (( document.documentElement.clientHeight / 2 ) + document.documentElement.scrollTop )-(imgHeight/2);
        var xPos = (( document.documentElement.clientWidth / 2 ) + document.documentElement.scrollLeft)-(imgWidth/2+73);
        var cacheHeight = document.documentElement.clientHeight + document.documentElement.scrollTop;
        var cacheWidth = document.documentElement.clientWidth + document.documentElement.scrollLeft-20;
    }
    else
    {
        var yPos = (( window.innerHeight / 2 ) + window.pageYOffset)-(imgHeight/2);
        var xPos = (( window.innerWidth / 2 ) + window.pageXOffset)-(imgWidth/2+73);
        var cacheHeight = window.innerHeight + window.pageYOffset - 20 ;
        var cacheWidth = window.innerWidth + window.pageXOffset-20;
    }
     
    cache.style.width=cacheWidth+'px';
    cache.style.height=cacheHeight+'px';

    cache.style.display='block';

    //fadeIn('cache',0);
    // yPos=0;
    // zoom_caption.innerHTML = caption[objID];
    
    zoom.style.top=yPos+'px'; 
    zoom.style.left=xPos+'px'; 
    zoom.style.display='block';
}


function setOpacity(obj, opacity) {
  opacity = (opacity == 100)?99.999:opacity;
  
  // IE/Win
  obj.style.filter = "alpha(opacity:"+opacity+")";
  
  // Safari<1.2, Konqueror
  obj.style.KHTMLOpacity = opacity/100;
  
  // Older Mozilla and Firefox
  obj.style.MozOpacity = opacity/100;
  
  // Safari 1.2, newer Firefox and Mozilla, CSS3
  obj.style.opacity = opacity/100;
}

function fadeIn(objId,opacity) {
  if (document.getElementById) {
    obj = document.getElementById(objId);
    if (opacity <= 50) {
      setOpacity(obj, opacity);
      opacity += 10;
      window.setTimeout("fadeIn('"+objId+"',"+opacity+")", 0,05);
    }
  }
}

function hideZoom(){
    document.getElementById('zoom').style.display='none';
    document.getElementById('cache').style.display='none'; 
	
	// switch on select / object / embed
	switchTag('visible');
	
    zoom_img=document.getElementById('zoom_img'); 
    zoom_img.setAttribute( 'src', '');
}