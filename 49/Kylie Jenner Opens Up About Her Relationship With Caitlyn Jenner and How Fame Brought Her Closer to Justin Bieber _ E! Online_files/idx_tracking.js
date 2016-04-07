var idx_tracking = idx_tracking || {};

idx_tracking = (function() {
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) { 
			var c = ca[i]; 
			while (c.charAt(0)==' ') 
				c = c.substring(1); 
			if (c.indexOf(name) != -1) 
				return c.substring(name.length,c.length); }
		return "";
	}
	
	var trackLogin = function(type, idxId, isSocial) {
		s.eVar69 = s.prop69 = type;
		s.eVar25 = s.prop25 = getCookie('s_fid');
		s.eVar75 = s.prop75 = idxId;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,eVar25,prop25,prop66,eVar66,eVar69,prop75,eVar75';
		if (isSocial) {
			s.linkTrackEvents = 'event36,event37';
			s.events = 'event36,event37';
			s.tl(this, 'o', "login:social_network:success");			
		} else {
			s.linkTrackEvents = 'event36';
			s.events = 'event36';
			s.tl(this, 'o', "login:internal:success");
		}
	};
	
	var trackRegStart = function(type) {
		s.eVar69 = s.prop69 = type;
		s.eVar25 = s.prop25 = getCookie('s_fid');
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,eVar25,prop25,prop66,eVar66,eVar69,prop75,eVar75';
		s.tl(this, 'o', "login:registration:start");
	};
	
	var trackRegEnd = function(type, idxId) {
		s.eVar69 = s.prop69 = type;
		s.eVar25 = s.prop25 = getCookie('s_fid');
		s.eVar75 = s.prop75 = idxId;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,eVar25,prop25,prop66,eVar66,eVar69,prop75,eVar75';
		s.linkTrackEvents = 'event38';
		s.events = 'event38';
		s.tl(this, 'o', "login:registration:complete");
	};
	
	var trackRegConfirm = function(idxId) {
		s.eVar69 = s.prop69 = 'registration-confirmation';
		s.eVar25 = s.prop25 = getCookie('s_fid');
		s.eVar75 = s.prop75 = idxId;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,eVar25,prop25,prop66,eVar66,eVar69,prop75,eVar75';
		s.linkTrackEvents = 'event39';
		s.events = 'event39';
		s.tl(this, 'o', "login:registration:confirmation");
	};

	var trackWidgetClick = function(widgetTemplateType,elementClicked,callToAction,sweepsName,url) {
		s.products=";"+widgetTemplateType+";;;event21";
		s.eVar16=widgetTemplateType;
		s.eVar17=widgetTemplateType+":"+url;
		s.prop17=widgetTemplateType+":"+elementClicked+":"+callToAction;
		s.eVar61=sweepsName;
		s.events = 'event17,event21';
		s.eVar25 = s.prop25 = getCookie("s_fid");
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,eVar16,prop17,eVar17,prop25,eVar25,eVar61,prop23,eVar24,prop66,eVar66,eVar69,prop75,eVar75';
		s.linkTrackEvents = 'event17,event21';  //includes widget click and form start
		s.tl(this, 'o', widgetTemplateType);
	};

	var trackSweepsClickSubmit = function(sweepsName,url,elementClicked,callToAction) {
		s.eVar61=sweepsName;
		s.eVar25 = s.prop25 = getCookie("s_fid");
		s.eVar16="button";
		s.eVar17="button:"+url;
		s.prop17="button:"+elementClicked+":"+callToAction;
		s.products=";button;;;event21";
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,eVar16,prop17,eVar17,prop23,eVar24,prop25,eVar25,eVar61,prop66,eVar66,eVar69,prop75,eVar75';
		s.linkTrackEvents = 'event21,event40';
		s.events = 'event21,event40';  //includes widget click and form submit
		s.tl(this, 'o', 'button');
	};

	var trackSweepsLogin = function(type_of_login,IDX_id,sweepsName) {
		s.eVar69 = s.prop69 = type_of_login;  //[available options are comment, newsletter]
		s.eVar25 = s.prop25 = getCookie("s_fid");
		s.eVar75 = s.prop75 = IDX_id;  //[this is acquired from IDX server at time of login]
		s.eVar61=sweepsName;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,prop25,eVar25,eVar61,prop66,eVar66,eVar69,prop69,prop75,eVar75';
		s.linkTrackEvents = 'event36';
		s.events = 'event36';  // this is a login event
		s.tl(this, 'o', 'login:internal:success');
	};

	var trackSweepsSocialLogin = function(type_of_login,IDX_id,sweepsName) {
		s.eVar69 = s.prop69 = type_of_login;  //[available options are comment, newsletter]
		s.eVar25 = s.prop25 = getCookie("s_fid");
		s.eVar75 = s.prop75 = IDX_id;  //[this is acquired from IDX server at time of login]
		s.eVar61=sweepsName;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,eVar61,prop66,eVar66,eVar69,prop75,eVar75';
		s.linkTrackEvents = 'event36,event37';
		s.events = 'event36,event37';  // this is a login and a social login event
		s.tl(this, 'o', "login:social_network:success");
	};

	var trackSweepsRegStart = function(type_of_login,sweepsName) {
		s.eVar69 = s.prop69 = type_of_login;  //[available options are comment, newsletter]
		s.eVar25 = s.prop25 = getCookie("s_fid");
		s.eVar61=sweepsName;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,prop25,eVar25,eVar61,prop66,eVar66,prop69,eVar69,prop75,eVar75';
		s.tl(this, 'o', "login:registration:start");
	};

	var trackSweepsRegComplete = function(type_of_login,IDX_id,sweepsName) {
		s.eVar69 = s.prop69 = type_of_login;  //[available options are comment, newsletter]
		s.eVar25 = s.prop25 = getCookie("s_fid");
		s.eVar75 = s.prop75 = IDX_id;  //[this is acquired from IDX server at time of login]
		s.eVar61=sweepsName;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,prop25,eVar25,eVar61,prop66,eVar66,prop69,eVar69,prop75,eVar75';
		s.linkTrackEvents = 'event38';
		s.events = 'event38';  // this is a registration complete event
		s.tl(this, 'o', "login:registration:confirmation");
	};

	var trackSweepsSuccess = function(sweepsName) {
		s.eVar61=sweepsName;
		s.linkTrackVars = 'prop1,eVar1,prop2,eVar2,prop3,eVar3,eVar4,prop11,eVar11,prop12,eVar12,prop13,eVar13,prop23,eVar24,prop25,eVar25,eVar61,prop66,eVar66,eVar69,prop75,eVar75';
		s.linkTrackEvents = 'event18';
		s.events="event18";  // this is a form complete event to show that the sweepstakes entry has been completed
		s.tl(this, 'o', 'form:complete');
	};
	
	return {
		trackLogin: trackLogin,
		trackRegStart: trackRegStart,
		trackRegEnd: trackRegEnd,
		trackRegConfirm: trackRegConfirm,
		trackWidgetClick: trackWidgetClick,
		trackSweepsClickSubmit: trackSweepsClickSubmit,
		trackSweepsLogin: trackSweepsLogin,
		trackSweepsSocialLogin: trackSweepsSocialLogin,
		trackSweepsRegStart: trackSweepsRegStart,
		trackSweepsRegComplete: trackSweepsRegComplete,
		trackSweepsSuccess: trackSweepsSuccess
	}
})();