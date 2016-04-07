// Array for days/months name used to build the hotel forms
// Defined in calendar-xx.js )
var months=Calendar._MN;
var days3=Calendar._SDN; 

// This function gets called when the end-user clicks on some date.
function selected(cal, date) {
  cal.sel.value = date; // just update the date in the input hidden field.
  if (cal.dateClicked)
  { 
    // Select the same date as the calendar
    // %e format : day of month range 1 - 31 (not 01 - 31)
    // select option values are numbers ( 01 = 1 )
    document.getElementById(cal.sel.id+"_day").value = cal.date.print('%e');

    // %f format : month range 1 - 12 (not 01 - 12)
    document.getElementById(cal.sel.id+"_month").value = cal.date.print('%Y-%f');
    
    // Check date order
    checkDateOrder('b_frm', 'b_checkin_day', 'b_checkin_month', 'b_checkout_day', 'b_checkout_month');  
    
    // Close the calendar
    cal.callCloseHandler();
   }
}

// And this gets called when the end-user clicks on the _selected_ date,
// or clicks on the "Close" button.  It just hides the calendar without
// destroying it.
function closeHandler(cal) {
  cal.hide(); // hide the calendar
//  cal.destroy();
  _dynarch_popupCalendar = null;
}

// this function returns true if the passed date is special
function dateIsDisabled(year, month, day) {

    var today = new Date();
    TY = today.getFullYear();
    TM = today.getMonth();
    TD = today.getDate();
    
    if ( year == TY && month < TM  ){
        return true;
    }
    else if ( year == TY && month == TM && day < TD ){
        return true;
    }
    else if ( year == (TY+1) && ( month >= TM ) ) {
        return true;
    }
    else {
        return false;
    }    
}

// this is the actual date status handler.  Note that it receives the
// date object as well as separate values of year, month and date, for
// your confort.
function dateStatusHandler(date, y, m, d) {
    if (dateIsDisabled(y, m, d)) return true;
    else return false;
    // return true above if you want to disable other dates
}

function showCalendar(id, format, showsTime, showsOtherMonths ) {
  var el = document.getElementById(id);
  if (_dynarch_popupCalendar != null) {
    // we already have some calendar created
    _dynarch_popupCalendar.hide();                 // so we hide it first.
  } else {
    // first-time call, create the calendar.
    var cal = new Calendar(1, null, selected, closeHandler);
    // uncomment the following line to hide the week numbers
    cal.weekNumbers = false;
    cal.showsTime = false;
    cal.showsOtherMonths = true;
    _dynarch_popupCalendar = cal;                  // remember it in the global var
    
    var today = new Date();
    TY = today.getFullYear();    
    cal.setRange(TY, TY+1);        // min/max year allowed ( this year , this year + 1 ).
    
    // configure it to the calendar
    cal.setDisabledHandler(dateStatusHandler);
    
    cal.create();
  }
  _dynarch_popupCalendar.setDateFormat(format);    // set the specified date format
  _dynarch_popupCalendar.parseDate(el.value);      // try to parse the text in field
  _dynarch_popupCalendar.sel = el;                 // inform it what input field we use

  // the reference element that we pass to showAtElement is the button that
  // triggers the calendar.  In this example we align the calendar bottom-right
  // to the button.
 _dynarch_popupCalendar.showAtElement(el.nextSibling, "Br");        // show the calendar

  return false;
}

// Custom function
// update the hidden fields value when date is changed by the form
function changeCalDate(id)
{
  var my_day = document.getElementById(id+'_day').value;
  var my_yearMonth = document.getElementById(id+'_month').value;
  document.getElementById(id).value = my_yearMonth+'-'+my_day; 
}
    
var gClientIsGecko = (window.controllers) ? true : false;
var gClientIsOpera = (window.opera) ? true : false;
var gClientIsIE    = (document.all && !gClientIsOpera) ? true : false;
var gClientIsIE5   = (gClientIsIE && /MSIE 5\.0/.test(navigator.appVersion)) ? true : false;
var gClientIsMac   = (/Mac/.test(navigator.appVersion)) ? true : false;
            
// Basic event handling
function addListener( elm, event, handler ) {
	if(elm.addEventListener)
		elm.addEventListener(event, handler, false);
	else if(elm.attachEvent)
		elm.attachEvent('on'+event, handler);
	else
		elm['on'+event] = handler;
}

function removeListener( elm, event, handler ) {
	if(elm.removeEventListener)
		elm.removeEventListener(event, handler, false);
	else if(elm.detachEvent)
		elm.detachEvent('on'+event, handler);
}


function buildDaysForMonth( year, month ) {
	// Month index starts on 0(-11) in Date()-object
	var monthDate = new Date(year, month-1);
	var orgMonth = monthDate.getMonth();
	var dayArray = [], weekDay;
	while(monthDate.getMonth() == orgMonth) {
		// Week starts on Sunday in Date()-object
		weekDay = (monthDate.getDay() == 0) ? 6 : (monthDate.getDay()-1);
		dayArray.push(days3[weekDay]);
		monthDate.setDate(monthDate.getDate()+1);
	}
	return dayArray;
}

function checkDateOrder(frm, ci_day, ci_month_year, co_day, co_month_year) {
	if (document.getElementById) {
		var frm = document.getElementById(frm);
		// create date object from checkin values
		// set date to 12:00 to avoid problems with one
		// date being wintertime and the other summertime
		var my = frm[ci_month_year].value.split("-");
	    var ci = new Date (my[0], my[1]-1, frm[ci_day].value, 12, 0, 0, 0);

        // create date object from checkout values
	    my = frm[co_month_year].value.split("-");
	    var co = new Date (my[0], my[1]-1, frm[co_day].value, 12, 0, 0, 0);

		// if checkin date is at or after checkout date,
		// add a day full of milliseconds, and set the
		// selectbox values for checkout date to new value
	    if (ci >= co){
    	    co.setTime(ci.getTime() + 1000 * 60 * 60 * 72);
	        frm[co_day].value =  co.getDate();
    	    var com = co.getMonth()+1;
            /*
            if ( com < 10 )
            {
	        frm[co_month_year].value = co.getFullYear() + "-0" + com;
            }
            else
            {
	        frm[co_month_year].value = co.getFullYear() + "-" + com;
            }
            */
             frm[co_month_year].value = co.getFullYear() + "-" + com;
    	}
        
        // udpdate calendar date with the hidden field date
         changeCalDate('b_checkout');
         changeCalDate('b_checkin');
	}
}


// Used by the "updateDaySelect" function
var DOM = {
	isParentOf: function( parentElm, contextElm) {
		while(contextElm && (contextElm != parentElm))
			contextElm = contextElm.parentNode;
		return (contextElm == parentElm);
	},
	getParentOrSelf: function( contextElm, nodeName ) {
		nodeName = nodeName.toLowerCase();
		while(contextElm.nodeName.toLowerCase() != nodeName && contextElm.parentNode)
			contextElm = contextElm.parentNode;
		return contextElm;
	},
	addClass: function( elm, className ) {
		elm.className += ' '+className;
	},
	removeClass: function( elm, className) {
		var classMatch = new RegExp('\\b'+className+'\\b', 'g');
		if(classMatch.test(elm.className))
			elm.className = elm.className.replace(classMatch, ' ');
	}	
}


function initDaySelect() {
	var forms = document.getElementsByTagName('form');
	for(var i=0; i<forms.length; i++)
		if(forms[i]['checkin_monthday'])
			updateDaySelect(forms[i]['checkin_monthday']);
}


function updateDaySelect( me ) {

	// 1-2 testing
	if(!days3) return;
	
	// IE5/Mac not supported
	if(gClientIsIE5 && gClientIsMac)
		return;
	
	var frm = DOM.getParentOrSelf(me, 'form');
    
	var ci_d = document.getElementById('b_checkin_day');
	var co_d = document.getElementById('b_checkout_day');
	var ci_my = document.getElementById('b_checkin_month').value.split("-");
	var co_my = document.getElementById('b_checkout_month').value.split("-");    
	var ci_sel = ci_d.selectedIndex;
	var co_sel = co_d.selectedIndex;
	var monthDays = [], opt;
	
	// Checkin month
	monthDays = buildDaysForMonth(ci_my[0], ci_my[1]);
	ci_d.innerHTML = '';
	for(var i = 0; i < monthDays.length; i++) {
		opt = document.createElement('option');
		// opt.innerHTML = (monthDays[i] + ' ' + (i+1));
		opt.innerHTML = (i+1);
		opt.value = (i+1);
		ci_d.appendChild(opt);
	}
	ci_d.options[ci_sel].defaultSelected = ci_d.options[ci_sel].selected = true;

	// Checkout month
	monthDays = buildDaysForMonth(co_my[0], co_my[1]);
	co_d.innerHTML = '';
	for(var i = 0; i < monthDays.length; i++) {
		opt = document.createElement('option');
		// opt.innerHTML = (monthDays[i] + ' ' + (i+1));
        opt.innerHTML = (i+1);
		opt.value = (i+1);
		co_d.appendChild(opt);
	}
	co_d.options[co_sel].defaultSelected = co_d.options[co_sel].selected = true;
}

// Switch advanced search
function advancedSearch()
{
	switch (document.getElementById('advancedSearch').style.display)
	{
	  case 'block':
	    document.getElementById('advancedSearch').style.display = 'none';
	   break;
	  default:
	    document.getElementById('advancedSearch').style.display = 'block';
	   break;
	}
}