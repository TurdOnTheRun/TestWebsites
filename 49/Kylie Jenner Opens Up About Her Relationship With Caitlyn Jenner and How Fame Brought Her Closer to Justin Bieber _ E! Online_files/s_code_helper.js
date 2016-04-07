//Tracking Functions
function sTrackPhotoView(photoName,cleanGalleryTitle) { //Tracks as a Page View
	/* Custom Photo View Implementation Coming Soon */
	s.linkTrackVarsTmp=s.linkTrackVars;
	s.linkTrackVars+=",eVar21,prop43,prop38,";
	s.linkTrackEvents="event22";
	s.events="event22";
	s.eVar21="photo";
	s.prop15 ="photos";
	s.prop62="detail";
	s.prop26="scroll:" + photoName;

	s.prop38=cleanGalleryTitle;
	
	s.pageName = s.pageName.substring(0, s.pageName.lastIndexOf(":"))+":"+photoName.substring(photoName.lastIndexOf(":"));
//else
//	s.pageName = "";

//	sSetHeavyPhoto();
//	sGetHeavyPhoto("gallery");
	s.eVar43=s.prop43;
	s.t();
	s.linkTrackEvents=s.events=s.eVar21="";
	s.linkTrackVars=s.linkTrackVarsTmp;
}

function sTrackPollGameView(pollName,photoName) {
	s.linkTrackVarsTmp=s.linkTrackVars;
	s.linkTrackVars+=",eVar21,prop43,prop38,";
	s.linkTrackEvents="event22";
	s.events="event22";
	s.prop15 ="games";
	s.prop62="detail";
	
	s.prop66=s.prop48+":"+pollName;
	s.pageName = s.prop66+":"+photoName;
	s.eVar43=s.prop43;
	s.t();
	s.linkTrackEvents=s.events=s.eVar21="";
	s.linkTrackVars=s.linkTrackVarsTmp;
}

function sTrackForm(formName, formEvent, contributeEvent, assetType, formMeta, visitorID) {
	s.linkTrackVars=s.linkTrackVars + ",eVar8,prop5,";
	s.eVar8=formName.toLowerCase();

	if (formEvent=="start"){
		s.linkTrackEvents="event17"
		s.events="event17";
	} else if (formEvent=="complete"){
		s.linkTrackEvents="event18";
		s.events="event18";
	} else {
		s.linkTrackEvents="event17,event18";
		s.events="event17,event18";
	}
	if ((contributeEvent.length)> 0){
		sSetHeavyContributor();
	}
	if ((contributeEvent.length)> 0 && contributeEvent != "distribute"){
	//track real-time contributions
		s.linkTrackVars+=",prop5";
		s.linkTrackEvents+=",event7";
		s.events+=",event7";
		s.prop5=s.eVar4 + ":" + contributeEvent
	} else if(formEvent!="start"){
		s.linkTrackEvents+=",event5";
		s.events+=",event5";
	}
	if ((assetType.length)> 0){
	//track asset uploaded
		s.linkTrackVars+=",eVar21";
		s.eVar21 = assetType;
	}
	if ((formMeta.length)> 0){
		//track meta fields in form
		s.linkTrackVars+=",prop24";
		s.prop24 = formMeta;
	}
	if ((visitorID.length)> 0){
	//track obsfuscated visitor ID On form complete
		s.linkTrackVars+=",eVar25";
		s.eVar25 = visitorID;
	}

	s.tl(document.URL,'o',formName.toLowerCase());
	s.eVar21=s.eVar25=s.prop24=s.linkTrackEvents=s.prop8=s.prop5=s.events="";
	s.linkTrackVars=s.linkTrackVars;
}

//Updates the cookie with # of photos viewed, videos viewed, items contributed
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    currval = unescape(document.cookie.substring(c_start,c_end));
    if(currval < 100)
	setCookie(c_name,parseInt(currval) +1);
    return currval;
    }
  }
setCookie(c_name,1);
return 0;
}
function setCookie(c_name,value)
{
	expiredays=cookieLifetime;
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//Configuration Variables
cookieLifetime=365; //# of Days the cookie will last
photoCookieName="photo";
photoHeavyMinimum=18; //Minimum # of Photos to view before being categorized as high-photo;
videoCookieName="video";
VideoHeavyMinimum=3; //Minimum # of videos to view before being categorized as high-video;
contributionCookieName="contribution";
contributionHeavyMinimum=3; //Minimum # of contributions before being categorized as high-contributions;