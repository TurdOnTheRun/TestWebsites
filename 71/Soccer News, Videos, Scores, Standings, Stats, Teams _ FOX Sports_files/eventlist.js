
/**
 * @author hugh.maclachlan
 */

function performTSToDate(timestamp, separator) {
  separator = ( typeof separator !== 'undefined' ) ? separator : "";
  
  var regex = new RegExp("^([0-9]{4})" + separator + "([0-1]?[0-9])" + separator + "([0-3]?[0-9])" + separator + "([0-2][0-9])([0-5][0-9])([0-5][0-9])?$"), 
      results = regex.exec(timestamp);
  
  return new Date(results[1], results[2] - 1, results[3], results[4], results[5], results[6]);
}

function getMonthName(monthIndex, isArabic){
  var monthName = '';
  
  if (isArabic) {
    switch (monthIndex) {
      case 0:
        monthName = 'يناير';
        break;
      case 1:
        monthName = 'فبراير';
        break;
      case 2:
        monthName = 'مارس';
        break;
      case 3:
        monthName = 'ابريل';
        break;
      case 4:
        monthName = 'مايو';
        break;
      case 5:
        monthName = 'يونيو';
        break;
      case 6:
        monthName = 'يوليو';
        break;
      case 7:
        monthName = 'اغسطس';
        break;
      case 8:
        monthName = 'سبتمبر';
        break;
      case 9:
        monthName = 'اكتوبر';
        break;
      case 10:
        monthName = 'نوفمبر';
        break;
      case 11:
        monthName = 'ديسمبر';
        break;      
    }
  }
  else {
    switch (monthIndex) {
      case 0:
        monthName = 'January';
        break;
      case 1:
        monthName = 'February';
        break;
      case 2:
        monthName = 'March';
        break;
      case 3:
        monthName = 'April';
        break;
      case 4:
        monthName = 'May';
        break;
      case 5:
        monthName = 'June';
        break;
      case 6:
        monthName = 'July';
        break;
      case 7:
        monthName = 'August';
        break;
      case 8:
        monthName = 'September';
        break;
      case 9:
        monthName = 'October';
        break;
      case 10:
        monthName = 'November';
        break;
      case 11:
        monthName = 'December';
        break;      
    }
  }
  
  return monthName;
}
/*****************************************************/
//Events List proper starts here
function EventList() {
  this.Events = [];
  this.timeZoneOffset = this.getTimeZoneOffset();
}

EventList.prototype.timerInterval = 360000;
EventList.prototype.identifierOn = 'eventOn';
EventList.prototype.identifierOff = 'eventOff';
EventList.prototype.addOnFunction = function(){}; //extra function to be run after events have been processed each interval 

EventList.prototype.getTimeZoneOffset = function() {
  var localDateTime = new Date();
  return timeZoneOffset = localDateTime.getTimezoneOffset() * 60000; 
};

EventList.prototype.addEvent = function(eventId, eventFeedStartTS, eventStartTS, eventEndTS, description, separator){  
  this.Events.push({
    id: eventId,
    feedStartDate: performTSToDate(eventFeedStartTS, separator),
    startDate: performTSToDate(eventStartTS, separator),
    endDate: performTSToDate(eventEndTS, separator)
  });
};

EventList.prototype.startTimer = function(callbacks) {
  this.updateEventStatus(callbacks);
};


EventList.prototype.getTranslatedDayString = function(dayString, isArabic){
  if (isArabic) {
    switch(dayString) {
      case 'Today':
        dayString = 'اليوم الحاضر';
        break;
      case 'Tomorrow': 
        dayString = 'الغد';
        break;    
    }
  }
  return dayString;
};

EventList.prototype.friendlyStartTimeDisplay = function(isArabic){
  var timeNow = new Date();
  var dayNow = timeNow.getDOY();
  
  for (var i = 0; i < this.Events.length; i++) {
    currentEvent = this.Events[i];
    
    var localEventDateTime = new Date(currentEvent.startDate.getTime() - this.timeZoneOffset);
                var localEventDay = localEventDateTime.getDOY();
    var timeDiff = localEventDay - dayNow;
    
    if (timeDiff >= 0) {    
      var localEventTime = localEventDateTime.format('HH:MM');
      dateStr = localEventTime + ' - ';
      if (timeDiff == 0) {
        dateStr += this.getTranslatedDayString('Today', isArabic);
      }
      else 
        if (timeDiff == 1) {
          dateStr += this.getTranslatedDayString('Tomorrow', isArabic);
        }
        else {
          dateStr += localEventDateTime.getDate() + ' ' + (getMonthName(localEventDateTime.getMonth(), isArabic));
        }
      
      $('.event' + currentEvent.id + ' .startTime').html(dateStr);
    }
  }
};

/**
 * It doesn't display the label for the day, only the time in the current timezone
 *
 * @return void
 */
EventList.prototype.friendlyOnlyStartTimeDisplay = function() {
    var timeNow = new Date();
    var dayNow = timeNow.getDOY();
  
    for( var i = 0; i < this.Events.length; i++ ) {
        currentEvent = this.Events[i];
    
        var localEventDateTime = new Date(currentEvent.startDate.getTime() - this.timeZoneOffset);
        var localEventDay = localEventDateTime.getDOY();
      
        var localEventEndDateTime = new Date(currentEvent.endDate.getTime() - this.timeZoneOffset);
        var localEventEndDay = localEventEndDateTime.getDOY();
      
        if( ( localEventDay - dayNow ) >= 0 ) { 
            $('.event' + currentEvent.id + ' .startTime').html(localEventDateTime.format('HH:MM'));
            if($('.event' + currentEvent.id + ' .endTime').length !== 0) {
              $('.event' + currentEvent.id + ' .endTime').html(localEventEndDateTime.format('HH:MM'));
            }
        }
    }
  
    
};

EventList.prototype.updateEventStatus = function(callbacks) {
  var nextEventStart = -1;
  var nextEventEnd = -1;
  
  var timeNow = new Date();
  timeNow = timeNow.getTime() + this.timeZoneOffset;

  var eventsToDelete = [];
  
  for (var i = 0; i < this.Events.length; i++) {
    currentEvent = this.Events[i];
                    
    if ((currentEvent.endDate.getTime() - timeNow) <= 0) {
        if($('.event' + currentEvent.id).siblings().length == 0){
        $('.event' + currentEvent.id).closest('.eventGroup').remove();
      }else{
        $('.event' + currentEvent.id).remove();
      }
      
      this.Events.splice(i, 1);
      i--;
    } else {
      if ((nextEventEnd < 0) || (currentEvent.endDate.getTime() < nextEventEnd)){
        nextEventEnd = currentEvent.endDate.getTime();
      }
      
      if ((currentEvent.feedStartDate.getTime() - timeNow) <= 0) {
        $('.event' + currentEvent.id + ' .' + this.identifierOn).show();
        $('.event' + currentEvent.id + ' .' + this.identifierOff).hide();
        
        if( typeof callbacks !== "undefined" && typeof callbacks.onEventOn !== "undefined" ) {
            callbacks.onEventOn($('.event' + currentEvent.id));
        }
      } else {
        if ((nextEventStart < 0)||(currentEvent.feedStartDate.getTime() < nextEventStart)) {
          nextEventStart = currentEvent.feedStartDate.getTime();
        }
        
        $('.event' + currentEvent.id + ' .' + this.identifierOff).show();
        $('.event' + currentEvent.id + ' .' + this.identifierOn).hide();
      }
    }                                
  }
  
  //run our add on function after we have finished working out which items to display/hide
  this.addOnFunction();
  
  var nextUpdateTime = -1;
  if ((nextEventStart > 0) && (nextEventEnd > 0)) {
    if (nextEventStart < nextEventEnd) {
      nextUpdateTime = nextEventStart;
    } else {
      nextUpdateTime = nextEventEnd;
    }
  } else if (nextEventEnd > 0) {
    nextUpdateTime = nextEventEnd;
  } else {
    nextUpdateTime = nextEventStart;
  }
  
  //make this recursive, in the event that there are still events to start/end
  if (nextUpdateTime > 0) {
    var thisEventList = this;
    timeToNextUpdate = nextUpdateTime - timeNow;
    this.timeOutId = setTimeout(function(){thisEventList.updateEventStatus()}, timeToNextUpdate)
  } 
};
/*****************************************************/