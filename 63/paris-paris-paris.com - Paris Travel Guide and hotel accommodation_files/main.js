// Use in hotelrecommended_line.tpl
function changeSwapImgHotelRcmd(hotelid,id,n)
{
	for (i=1; i<=n; i++)
	{
		document.getElementById(hotelid+"-image-"+i).style.display = "none";
		document.getElementById(hotelid+"-thumb-"+i).className = "off";
	} 

	document.getElementById(hotelid + "-image-" + id).style.display = "block";
	document.getElementById(hotelid + "-thumb-" + id).className = "on";
}

// Function used in hotel_full view
function blockdisplay(i) {
    if (document.getElementById){
        if (document.getElementById("blockdisplay"+i)) {
            for ( j = 1; j < 1000; j++ ) {
                if (document.getElementById('blockdisplay' + j)) {document.getElementById('blockdisplay' + j).style.display = 'none';}
                else {j = 1000;}
            }
        if (i) {document.getElementById("blockdisplay"+i).style.display = 'block';}
        }
    }
	// corrige le bug de centrage de la carte des fiches hotels sous IE 6 et 7
	pointInterval();
}

// Function used in hotel_full view
function showPhoto (imgSrc, imgCont){
    if (document.getElementById){
        var c = document.getElementById(imgCont);
        if (c.style.display != "block"){
            c.innerHTML = '<img src="' + imgSrc + '">';
        }
        else {
            c.innerHTML = '<img src="' + tr.icons + '/transparent.gif">';
            c.style.display="none";
        }
    }
}


// Display server time
function currentDateDisplay (objectId,serverGmt)
{
	clientDate = new Date();
	clientGmt = clientDate.getTimezoneOffset()*60*1000;
	unixClientTime = clientDate.getTime();
	unixSeverTime=unixClientTime+(serverGmt*1000)+clientGmt;
	
	myDate = new Date(unixSeverTime);
	
	theDate=myDate.getDate();
	if (theDate<10) theDate="0"+theDate;
	theMonth=myDate.getMonth()+1;
	if (theMonth<10) theMonth="0"+theMonth;
	theYear=myDate.getFullYear();
	theHour = myDate.getHours(unixSeverTime);
	if (theHour<10) theHour="0"+theHour;
	theMinute = myDate.getMinutes();
	if (theMinute<10) theMinute="0"+theMinute;

	dateTagContent = document.getElementById(objectId);
	dateTagContent.innerHTML = theDate+'/'+theMonth+'/'+theYear+'  '+theHour+':'+theMinute;
}


// Stat Track event
function getLibEvent(caller,actionEventId)
{
  var blockTitle='';
  var linkValue = '';

  blockTitle = caller.parents('div.blockpadding').children('h2').text();
  if(blockTitle!='') blockTitle='Block : ' + blockTitle;
  
        
  if(blockTitle=='')
  {
    switch(actionEventId)
    {
      case 'booking':
        blockTitle = caller.parents('div.my-cnghotel-line-view').find('div.my-cnghotel-line-title a').text();
        if(blockTitle=='') blockTitle=caller.parents('div.hotelrecommended-line').find('div.title a').text();
        break;
      case 'viator':
        blockTitle = caller.parents('div.tour-line-view').find('div.tour-line-title a').text();
        break;
      case 'friendlyrentals':
        blockTitle = caller.parents('div.blockpadding').find('div.apart-line-title a').text();
        break;
    }
    if(blockTitle!='') {blockTitle='Line : ' + blockTitle;}
    if(blockTitle=='') { blockTitle= caller.parents('div.blockpadding').find('h1').text(); if(blockTitle!='') blockTitle='Fiche : ' + blockTitle;}
        
  }
  
  switch(caller.get(0).tagName.toLowerCase())
  {
    case 'a':
      linkValue += caller.text().replace('\n','').trim();
      if(linkValue=='')
      if(caller.find('img').length>0) linkValue='Image';
      if(blockTitle.indexOf(linkValue)>=0) linkValue='Title';
      break;
    case 'form':
      linkValue='Form submit';
      break;
  
 
  }
  
  var libAction = blockTitle;
  if(linkValue!='')
  libAction+=' | ' + linkValue;
  
  return libAction;
}

function logAffiliateEvent(liActionPrefix,logUrl) {
  var catEvent='Outbound', actionsEvent = new Array();
  
  if(logUrl=='/') logUrl='/home';
      
  actionsEvent['booking']='booking.com';
  actionsEvent['viator']='viator.com';
  actionsEvent['friendlyrentals']='friendlyrentals.com';
  actionsEvent['sportsemotions']='sportsemotions.com';
  
  for(var i in actionsEvent)
  {
   $('a[href*="' + actionsEvent[i]  + '"]').live('click', function (event ) {
      var $this =$(this), actionEvent = '', actionEventId = '';
      
      for(var j in actionsEvent){ 
        if($this.attr('href').indexOf(actionsEvent[j])>=0) { actionEvent=actionsEvent[j];actionEventId =j; break;} 
      }
      
      libAction= liActionPrefix + logUrl + ' | ' +getLibEvent($this,actionEventId);        
      
     gaq.push(['_trackEvent',catEvent,actionEvent,libAction,1]);   
    });
    $('form[action*="' + actionsEvent[i] +'"]').live('submit',function(event){
      var $this =$(this), actionEvent = '', actionEventId = '';
      
      for(var j in actionsEvent){ 
        if($this.attr('action').indexOf(actionsEvent[j])>=0) { actionEvent=actionsEvent[j];actionEventId =j; break;} 
      }
      
      libAction= liActionPrefix + logUrl + ' | ' +getLibEvent($this,actionEventId);        
       
      _gaq.push(['_trackEvent',catEvent,actionEvent,libAction,1]);
    });
  }
}