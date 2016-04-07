<!--
$(document).ready(function()
{
	//Tabs
	$('div.tabintro span').text($('ul.tabs li.sel span').text());
	
	//Hover tabs
	$('ul.tabs li').hover(
		function()
		{
			var txt = $(this).find('span').text();
			$('div.tabintro span').text(txt);
		},
		function()
		{
			var txt = $('ul.tabs li.sel span').text();
			$('div.tabintro span').text(txt);
		}
	);
	
	//Click Tabs
	$('ul.tabs li').click(function(event){
		var $newtab = $(this);
		if ($newtab.attr('class') == 'desel')
		{
			var tab = $newtab.attr('id');
			$('#factswrapper .factsgroup').removeClass('sel');
			$('#factswrapper #f' + tab).addClass('sel');
			$('ul.tabs li.sel').removeClass('sel').addClass('desel');
			$newtab.removeClass('desel').addClass('sel');
		}
		event.preventDefault();
	});
	
	//Distance table hover
	$('table.distance tbody tr').hover(
		function()
		{
			$(this).addClass('over');
		},
		function()
		{
			$(this).removeClass('over');
		}
	);
	
});

// Timer

var tTime = null;
var timerID = 0;
var h, mi, s, d;

function updateTime()
{
	s += 1;
	
	if (s == 60){
		s = 0;
		mi += 1;
		if (mi == 60){
			mi = 0;
			h += 1;
			if (h == 24){
				h = 0;
				switch (d){
					case 'Monday': d = 'Tuesday'; break;
					case 'Tuesday': d = 'Wednesday'; break;
					case 'Wednesday': d = 'Thursday'; break;
					case 'Thursday': d = 'Friday'; break;
					case 'Friday': d = 'Saturday'; break;
					case 'Saturday': d = 'Sunday'; break;
					case 'Sunday': d = 'Monday'; break;
				}
			}
		}
	}
	document.getElementById('time').innerHTML = getTimeString();
	t = setTimeout('updateTime()',1000);
}

function startTime(sDay, sHour, sMin, sSec)
{
	var tTime = new Date();
	d = sDay;
	h = parseInt(sHour, 10);
	mi = parseInt(sMin, 10);
	s = parseInt(sSec, 10);
	t = setTimeout('updateTime()',200);
}

function getTimeString(){
	sTime = d + ' ';
	sTime = sTime + h + ':';
	if (mi < 10)
		sTime += '0';
	sTime = sTime + mi + ':';
	if (s < 10)
		sTime += '0';
	sTime = sTime + s;
	
	return sTime;
}

function checkTime(i)
{
	if (i < 10) 
  	i = "0" + i;
  return i;
}
	
function stopTime() {
  if(timerID) {
     clearTimeout(timerID);
     timerID = 0;
  }

  tTime = null;
}
//-->