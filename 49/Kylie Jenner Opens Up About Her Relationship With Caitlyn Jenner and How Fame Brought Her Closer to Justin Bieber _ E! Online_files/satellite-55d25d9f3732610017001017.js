/* SiteCatalyst code version: App Measurement 1.4.5
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

var s_account="comcastegegdevelopment"
var loc=document.location.toString();
var embedUri = new RegExp("(www|au|ca|uk|fr|it|de).eonline.com/videos/embed");

if(wa && loc.indexOf('www.eonline.com') > -1){
	if(wa.site.edition.ad == "us"){
		if(wa.site.experience == "desktop"){
			s_account = "comcastegegeonlinecom";
		}
		if(wa.site.experience == "mobile"){
			s_account = "comcastegeonlinemobile";
		}
		if(wa.site.experience == "app"){
			s_account = "comcastegeonlineapp";
		}
		if(wa.site.experience == "3rdparty"){
			s_account = "comcastegegeonlinewidgets";
		}
	}
	if(wa.site.edition.ad !== "us"){
		if(wa.site.experience == "desktop"){
			s_account = "comcastegeonlineinternationalonee";
		}
		if(wa.site.experience == "mobile"){
			s_account = "comcastegeonlinemobileinternational";
		}
		if(wa.site.experience == "app"){
			s_account = "comcastegeonlineappinternational";
		}
		if(wa.site.experience == "3rdparty"){
			s_account = "comcastegeonlinewidgetsinternational";
		}
	}
}else{
	if(embedUri.test(loc)) { s_account = "comcastegegeonlinewidgets"; }
	else if (loc.indexOf('au.eonline.com') > -1) { s_account = "comcastegegeonlineau"; } 
	else if (loc.indexOf('ca.eonline.com') > -1) { s_account = "comcastegegeonlineca"; } 
	else if (loc.indexOf('fr.eonline.com') > -1) { s_account = "comcastegegeonlinefr"; } 
	else if (loc.indexOf('de.eonline.com') > -1) { s_account = "comcastegegeonlinegdr"; } 
	else if (loc.indexOf('it.eonline.com') > -1) { s_account = "comcastegegeonlineitaly"; } 
	else if (loc.indexOf('uk.eonline.com') > -1) { s_account = "comcastegegeonlineuk"; } 
	else if (loc.indexOf('www.eonline.com') > -1 || 
		loc.indexOf('boards.eonline.com') > -1 ||
		loc.indexOf('e-quiz.herokuapp.com') > -1 ||
		loc.indexOf('e-compare.herokuapp.com') > -1 ||
		loc.indexOf('e-bracket.herokuapp.com') > -1 ||
		loc.indexOf('comcast.eonline.com') > -1 ||
		loc.indexOf('www.moviefinder.com') > -1 ||
		loc.indexOf('aol.eonline.com') > -1 ||
		loc.indexOf('netscape.eonline.com') > -1 ||	
		loc.indexOf('music.eonline.com') > -1 ||
		loc.indexOf('earthlink.eonline.com') > -1 ||
		loc.indexOf('earthlink.eonline.com') > -1 ||
		loc.indexOf('www.thesouptv.com') > -1 ||
		loc.indexOf('thesouptv.com') > -1) {
		s_account = "comcastegegeonlinecom";
	}
}

var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="ISO-8859-1";
/* Conversion Config */
s.currencyCode="USD";
/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,jpg";
s.linkInternalFilters="javascript:,eonline.com,seenon.com,#,moviefinder.com,localhost,aim:BuddyIcon";
s.linkLeaveQueryString=true;
s.linkTrackVars="eVar17,";
s.linkTrackEvents="event21,event28";
// For Time Parting Plug-in
s.dstStart="03/14/2010";  //daylight saving time begins
s.dstEnd="11/07/2010";  //daylight saving time ends

/* Plugin Config */
s.usePlugins=true;
function s_doPlugins(s) {

	/* External Campaign Tracking */
	if(!s.campaign) s.campaign=s.Util.getQueryParam('cmpid');
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
	
	/* Sponsor Campaign Tracking */
	if(!s.eVar46) s.eVar46=s.Util.getQueryParam('spon');
	//s.eVar46=s.getValOnce(s.eVar46,'s_eVar46',0);

	// s.channel=location.hostname; /* Set Site Section to host?*/
	s.events=s.apl(s.events,'event2',',',2); /* Set Page View Event */

	/* Set Time Parting Variables  */
	if(!s.prop11&&!s.eVar11) s.prop11=s.eVar11=s.getTimeParting('h','-8'); // Set hour
	if(!s.prop12&&!s.eVar12) s.prop12=s.eVar12=s.getTimeParting('d','-8'); // Set day
	if(!s.prop13&&!s.eVar13) s.prop13=s.eVar13=s.getTimeParting('w','-8'); // Set weekday 
	
	s.prop23=s.eVar24=s.getNewRepeat();
	s.eVar10=s.prop22=s.getDaysSinceLastVisit('s_lv');
	s.eVar23=s.prop46=s.Util.getQueryParam('query').toLowerCase();

	//Get FID for IDX and set on every call
	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	    }
	    return "";
	}
	s.prop25 = getCookie("s_fid");
	s.eVar25 = getCookie("s_fid");

	//Percent Page Viewed
	if(s.getPercentPageViewed){
		/* Get Percent Page Viewed */
		s.prop60 = s.getPreviousValue(s.pageName,'s_ppn'); //contains the previous page name
		s.prop61 = s.getPercentPageViewed(); //contains the total percent viewed
	}
  
  // Collect site experiences and editions
  s.prop31 = wa.site.edition.ad;
  s.prop32 = wa.site.experience;
  s.prop33 = wa.site.edition.content;
  s.prop34 = wa.site.edition.geo;
  
  //Code for v11 video widgets tracking video starts
  if(s.eVar16 == "v11-video-list"){
		s.Util.cookieWrite("wa-widget-video","v11-video-list");
	}
	if(s.events.indexOf("event12") > -1 && s.Util.cookieRead("wa-widget-video")){
		videoValue = s.Util.cookieRead("wa-widget-video");
		s.eVar16 = videoValue;
		s.products = ";" + videoValue + ";;;event12";	
    s.linkTrackVars += ",eVar16,products";
		s.Util.cookieWrite("wa-widget-video","cleared");
	}
  
  //Capture IDX ID persistantly after set for both eVar75 and Audience Manager
  if(s.Util.cookieRead("idx_u") != true){
    s.eVar75 = s.Util.cookieRead("idx_u");
    s.prop75 = s.Util.cookieRead("idx_u");
  }
	
  
	/* Copy Variables from props and eVars */
	if (!s.eVar4 && s.pageName) s.eVar4 = "D=pageName";
	if (s.pageName) s.hier1=s.pageName;
	if (!s.eVar1 && s.prop1) s.eVar1 = "D=c1";
	if (!s.eVar2 && s.prop2) s.eVar2 = "D=c2";
	if (!s.eVar3 && s.prop3) s.eVar3 = "D=c3";
	if (!s.eVar7 && s.prop8) s.eVar7 = "D=c8";
	if (!s.eVar48 && s.prop48) s.eVar48 = "D=c48";
	if (!s.eVar62 && s.prop62) s.eVar62 = "D=c62";
	if (!s.eVar63 && s.prop63) s.eVar63 = "D=c63";
	if (!s.eVar66 && s.prop66) s.eVar66 = "D=c66";
	if (!s.eVar58 && s.prop58) s.eVar58 = "D=c58";
	if (!s.eVar56 && s.prop56) s.eVar56 = "D=c56";
	if (!s.eVar55 && s.prop55) s.eVar55 = "D=c55";
	if (!s.eVar38 && s.prop38) s.eVar58 = "D=c38";
	if (!s.eVar64 && s.prop64) s.eVar56 = "D=c64";
	if (!s.eVar65 && s.prop65) s.eVar65 = "D=c65";
	if (!s.eVar46 && s.prop47) s.eVar46 = "D=c47";
	if (!s.eVar57 && s.prop57) s.eVar57 = "D=c57";
	
	/* use evar 17 to populate other evars in widget tracking function */
	if (s.eVar16 && s.products) 
	{
		s.eVar17 =  s.eVar17.replace(";;;event27;","");
	}

	// Code for adding content type and page level to widget clicks (and other links) for correlation
	if(s.prop15){
		s.eVar15 = s.prop15;
	}
	if (s.linkTrackVars && s.eVar15){ 
		s.linkTrackVars +=",prop15,eVar15";
	}
	if (s.linkTrackVars && s.prop62){
		s.linkTrackVars +=",prop62";
	}
  
	//campaign tracking for sponsored exit links
	if (s.linkType == "e" && s.linkURL.indexOf("spon=") > 0) {
		s.eVar46 = s.linkURL.substring(s.linkURL.lastIndexOf("spon=") + 5, s.linkURL.length);
		s.linkTrackVars +=",eVar46";
  }

  //fixes issues with ads in the product string havnin four ;
  if(s.products){
	  if (s.products.indexOf(";;;;") > 0) {
			s.products = s.products.replace(/\;\;\;\;/g,";;;"); 
	  }
  }

  // Native Content Collection
  if(wa.page){
  	if(wa.page.content){
  		if(wa.page.content.native){
  			s.eVar35 = wa.page.content.native;
  		}
  	}
  }
  
}
s.doPlugins=s_doPlugins;


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="comcastentertainmentgroup";
s.trackingServer="wa.eonline.com";
s.dc=112;

/************************** PLUGINS SECTION *************************/

/*
Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */

s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'new';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'new';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'repeat';}else retur"
+"n 'repeat';");

/*
 * Plugin: getTimeParting 2.0 
 */
 
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */

s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: getValOnce 1.0 - get a value once per session or number of days
 */

s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin: Days since last Visit 1.1.H -JE-  ALTERED
 */

s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);var rval = 0;if(cval.length==0){"
+"s.c_w(c,ct,e);s.c_w(c+'_s',f1,es);}else{var d=ct-cval;rval = d/(100"
+"0*60*60*24);if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);s.c_w(c+'_s"
+"',f2,es);}else if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);s.c_w(c+'_s'"
+",f3,es);}else if(d<7*day+1 && d>day){s.c_w(c,ct,e);s.c_w(c+'_s',f4,"
+"es);}else if(d<day+1){s.c_w(c,ct,e);s.c_w(c+'_s',f5,es);}}else{s.c_"
+"w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c+'_s',cval_ss,es);}}cval_s=s"
+".c_r(c+'_s');return Math.floor(rval);"
);

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Plugin: getPercentPageViewed v1.71
 */
s.getPercentPageViewed=new Function("n",""
+"var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load"
+"','unload','scroll','resize','zoom','keyup','mouseup','touchend','o"
+"rientationchange','pan'];W.s_Obj=s;s_PPVid=(n=='-'?s.pageName:n)||s"
+".pageName||location.href;if(!W.s_PPVevent){s.s_PPVg=function(n,r){v"
+"ar k='s_ppv',p=k+'l',c=s.c_r(n||r?k:p),a=c.indexOf(',')>-1?c.split("
+"',',10):[''],l=a.length,i;a[0]=unescape(a[0]);r=r||(n&&n!=a[0])||0;"
+"a.length=10;if(typeof a[0]!='string')a[0]='';for(i=1;i<10;i++)a[i]="
+"!r&&i<l?parseInt(a[i])||0:0;if(l<10||typeof a[9]!='string')a[9]='';"
+"if(r){s.c_w(p,c);s.c_w(k,'?')}return a};W.s_PPVevent=function(e){va"
+"r W=window,D=document,B=D.body,E=D.documentElement,S=window.screen|"
+"|0,Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWid"
+"th',Hc='clientHeight',C=100,M=Math,J='object',N='number',s=W.s_Obj|"
+"|W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e=e.subs"
+"tring(2);s_PPVi=W.s_PPVi||0;if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s"
+"_PPVt=0;if(s_PPVi<2)s_PPVi++}if(typeof s==J){var h=M.max(B[Hs]||E[H"
+"s],B[Ho]||E[Ho],B[Hc]||E[Hc]),X=W.innerWidth||E[Wc]||B[Wc]||0,Y=W.i"
+"nnerHeight||E[Hc]||B[Hc]||0,x=S?S.width:0,y=S?S.height:0,r=M.round("
+"C*(W.devicePixelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p"
+"=h>0&&b>0?M.round(C*b/h):0,O=W.orientation,o=!isNaN(O)?M.abs(o)%180"
+":Y>X?0:90,L=e=='load'||s_PPVi<1,a=s.s_PPVg(s_PPVid,L),V=function(i,"
+"v,f,n){i=parseInt(typeof a==J&&a.length>i?a[i]:'0')||0;v=typeof v!="
+"N?i:v;v=f||v>i?v:i;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iPod|i"
+"Pad|iPhone)').exec(navigator.userAgent||'')&&o){o=x;x=y;y=o}o=o?'P'"
+":'L';a[9]=L?'':a[9].substring(0,1);s.c_w('s_ppv',escape(W.s_PPVid)+"
+"','+V(1,p,L)+','+(L||!V(2)?p:V(2))+','+V(3,b,L,1)+','+X+','+Y+','+x"
+"+','+y+','+r+','+a[9]+(a[9]==o?'':o))}if(!W.s_PPVt&&e!='unload')W.s"
+"_PPVt=setTimeout(W.s_PPVevent,333)};for(var f=W.s_PPVevent,i=0;i<E."
+"length;i++)if(EL)EL(E[i],f,false);else if(AE)AE('on'+E[i],f);f()};v"
+"ar a=s.s_PPVg();return!n||n=='-'?a[1]:a");


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.4.5
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
*/
function AppMeasurement(){var a=this;a.version="1.4.5";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.yb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.nb=function(a){try{console.log(a)}catch(b){}};a.za=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||0>a.indexOf(b)?
a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.eb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.eb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=
b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.F=[];a.ba=function(c,b,d){if(a.ta)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ca)for(a.ca=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&(a.ca=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.F.push({m:c,a:b,t:e}),a.ca||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.na();0<a.F.length;){d=a.F.shift();if(b&&!d.t&&d.t>c){a.F.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.ta=1;a[d.m].apply(a,d.a);a.ta=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ba("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.J,(m=a.lightTrackVars)&&(m=","+m+","+a.ga.join(",")+",");else{d=a.c;if(a.pe||a.linkType)m=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].xb,f=a[e].wb));m&&(m=","+m+","+a.A.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.L=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=0;p<n.length;p++)m.substring(0,
n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.L(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.za(w)&&("prop"==k?m="c"+w:"eVar"==k?m="v"+
w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.gb=function(){var c="",b,d,f,e,g,m,p,k,n="",q="",r=d="";if(a.lightProfileID)b=a.J,(n=a.lightTrackVars)&&(n=","+n+","+a.ga.join(",")+",");else{b=a.c;if(a.pe||a.linkType)n=a.linkTrackVars,q=a.linkTrackEvents,a.pe&&(d=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[d]&&(n=a[d].xb,q=a[d].wb));n&&(n=","+n+","+a.A.join(",")+",");q&&(q=","+q+",",n&&(n+=",events,"));a.events2&&
(r+=(""!=r?",":"")+a.events2)}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.L("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&"events"==e&&r&&(g=r,r="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e=
"aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&
(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";
break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":r&&(g+=(""!=g?",":"")+r);if(q)for(m=g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=q.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.L("c",a[e],n,e);g="";break;case "lightProfileID":e=
"mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.L("mts",a[e],n,e));g="";break;default:a.za(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&
(c+=a.e)}return c};a.u=function(a){var b=a.tagName;if("undefined"!=""+a.Bb||"undefined"!=""+a.rb&&"HTML"!=(""+a.rb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.va=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:
"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.G=function(c){var b=a.u(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),
g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.va(c),e)?{id:e.substring(0,100),type:g}:0};a.zb=function(c){for(var b=a.u(c),d=a.G(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.u(c),d=a.G(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.qb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ha=1;d||(a.ha=0,d=a.clickObject);if(d){c=a.u(d);for(b=a.G(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:
d.parentNode)c=a.u(d),b=a.G(d);b&&"BODY"!=c||(d=0);if(d){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ha=1;!e&&d&&(e=a.va(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,q=0,r;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(r=
g[m])&&p.substring(p.length-(r.length+1))=="."+r&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.ya(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)r=g[m],0<=p.indexOf(r)&&(q=1);q?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e=
"",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.hb=function(){var c=a.ha,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats){var b=
{},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),b[p]=f;f=a.account.split(",");if(c||a.e){c&&!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(m=0;m<f.length;m++)for(e&&(k=b[p].join(","),k==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),g=0;g<b[p].length;g++)k=b[p][g],k==f[m]&&(e&&(a.e+="&u="+a.escape(k)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(g,1),d=1);c||(d=1);if(d){e="";
m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};a.ib=function(){if(!a.vb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&(k=
"1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Ab(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=f;
a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.vb=1}};a.K={};a.loadModule=function(c,b){var d=a.K[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.K[c]=a[c]=d;d.Na=function(){return d.Ra};d.Sa=function(b){if(d.Ra=b)a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Na,set:d.Sa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=
b,a.ba(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.K)if(!Object.prototype[b]&&(d=a.K[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.lb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.M=function(c,b){var d,
f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Ga=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.cb=function(a){var b,d,f,e,g,m=0,k,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,
7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?m=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(m=",p,ei,"),m&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=m.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?k=n+"&"+q:q=""}d=253-(k.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.Ma=function(c){var b=
a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.Y=!1;a.C=!1;a.Ta=function(){a.C=!0;a.i()};a.W=!1;a.Q=!1;a.Qa=function(c){a.marketingCloudVisitorID=c;a.Q=!0;a.i()};a.T=!1;a.N=!1;a.Ia=function(c){a.analyticsVisitorID=c;a.N=!0;a.i()};a.V=!1;a.P=!1;a.Ka=function(c){a.audienceManagerLocationHint=
c;a.P=!0;a.i()};a.U=!1;a.O=!1;a.Ja=function(c){a.audienceManagerBlob=c;a.O=!0;a.i()};a.La=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.X=!1;a.B=!1;a.na=function(){a.B=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.Y||a.C||(a.Ma(a.Ta)?a.C=!0:a.Y=!0);if(a.Y&&!a.C)return!1;b&&b.isAllowed()&&(a.W||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.W=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Qa]),
a.marketingCloudVisitorID&&(a.Q=!0)),a.T||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.T=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Ia]),a.analyticsVisitorID&&(a.N=!0)),a.V||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.V=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ka]),a.audienceManagerLocationHint&&(a.P=!0)),a.U||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.U=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ja]),a.audienceManagerBlob&&
(a.O=!0)),a.W&&!a.Q&&!a.marketingCloudVisitorID||a.T&&!a.N&&!a.analyticsVisitorID||a.V&&!a.P&&!a.audienceManagerLocationHint||a.U&&!a.O&&!a.audienceManagerBlob)&&(c=!1);a.X||a.B||(a.La(a.na)?a.B=!0:a.X=!0);a.X&&!a.B&&(c=!1);return c};a.k=q;a.o=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Xa=c;f.Wa=b;f.Ua=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.o&&(a.o=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.o&&(clearInterval(a.o),a.o=0),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),
c.Wa.apply(c.Xa,c.Ua)};a.Oa=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Ga(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.fb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",
c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+
a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Oa(c)||(b&&a.M(b),c&&(d={},a.Ga(d,0),a.M(c)),a.lb()&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.fb()),a.qb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ha||(a.referrer=r.document.referrer),a.Ha=1,a.referrer=a.cb(a.referrer),a.l("_g")),a.hb()&&!a.abort&&(a.ib(),g+=a.gb(),a.pb(e,
g),a.l("_t"),a.referrer=""))),c&&a.M(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.q=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.c.length;c++)if(b=
a.c[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.pb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,
f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.ub?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.ab(d);a.da()};
a.ab=function(c){a.g||a.jb();a.g.push(c);a.fa=a.r();a.Fa()};a.jb=function(){a.g=a.mb();a.g||(a.g=[])};a.mb=function(){var c,b;if(a.ka()){try{(b=k.localStorage.getItem(a.ia()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ka=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.wa=function(){var c=0;a.g&&(c=a.g.length);a.v&&c++;return c};a.da=function(){if(!a.v)if(a.xa=q,a.ja)a.fa>a.I&&a.Da(a.g),a.ma(500);else{var c=a.Va();if(0<c)a.ma(c);else if(c=a.ua())a.v=
1,a.ob(c),a.sb(c)}};a.ma=function(c){a.xa||(c||(c=0),a.xa=setTimeout(a.da,c))};a.Va=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.r()-a.Ca;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.ua=function(){if(0<a.g.length)return a.g.shift()};a.ob=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.nb(b)}};a.Pa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};
a.S=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.S=!0,a.R=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.R=function(a){return k.$.parseJSON(a)},a.S=!0):a.R=function(){return null};a.sb=function(c){var b,d,f;a.Pa()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.S?b.pa=!0:b=0));!b&&
a.kb&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="");b.ra=function(){try{a.la&&(clearTimeout(a.la),a.la=0),b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(c){}};b.onload=b.tb=function(){b.ra();a.$a();a.Z();a.v=0;a.da();if(b.pa){b.pa=!1;try{var c=
a.R(b.responseText);AudienceManagement.passData(c)}catch(d){}}};b.onabort=b.onerror=b.bb=function(){b.ra();(a.trackOffline||a.ja)&&a.v&&a.g.unshift(a.Za);a.v=0;a.fa>a.I&&a.Da(a.g);a.Z();a.ma(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.tb():b.bb())};a.Ca=a.r();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Aa)try{f.removeChild(a.Aa)}catch(g){}f.firstChild?
f.insertBefore(b,f.firstChild):f.appendChild(b);a.Aa=a.Ya}b.abort&&(a.la=setTimeout(b.abort,5E3));a.Za=c;a.Ya=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.D||a.q)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.aa=setTimeout(a.Z,a.forcedLinkTrackingTimeout)};a.$a=function(){if(a.ka()&&!(a.Ba>a.I))try{k.localStorage.removeItem(a.ia()),a.Ba=a.r()}catch(c){}};a.Da=function(c){if(a.ka()){a.Fa();try{k.localStorage.setItem(a.ia(),k.JSON.stringify(c)),a.I=a.r()}catch(b){}}};
a.Fa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.ua()}};a.forceOffline=function(){a.ja=!0};a.forceOnline=function(){a.ja=!1};a.ia=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.r=function(){return(new Date).getTime()};a.ya=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,
f;a.ub=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.M(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);
d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.A="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData pe pev1 pev2 pev3 pageURLRest".split(" ");
a.c=a.A.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.J=a.ga.slice(0);a.oa="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
for(n=0;250>=n;n++)76>n&&(a.c.push("prop"+n),a.J.push("prop"+n)),a.c.push("eVar"+n),a.J.push("eVar"+n),6>n&&a.c.push("hier"+n),4>n&&a.c.push("list"+n);n="latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage".split(" ");a.c=a.c.concat(n);a.A=a.A.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";
a.Ca=0;a.fa=0;a.I=0;a.Ba=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{a.kb="Microsoft Internet Explorer"==navigator.appName}catch(y){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=q);a.j&&a.D&&a.j.dispatchEvent(a.D);a.q&&("function"==typeof a.q?a.q():a.j&&a.j.href&&(a.d.location=a.j.href));a.j=a.D=a.q=0};a.Ea=function(){a.b=a.d.body;a.b?(a.p=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.qa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",
a.p,!1);else{a.b.removeEventListener("click",a.p,!0);a.qa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.H&&a.H==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var m=a.H=a.clickObject;a.ea&&(clearTimeout(a.ea),a.ea=0);a.ea=setTimeout(function(){a.H==m&&(a.H=0)},1E4);f=a.wa();a.track();if(f<a.wa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&
e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.ya(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=
1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.D=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.p):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.qa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.p,!0)),a.b.addEventListener("click",a.p,!1))):setTimeout(a.Ea,30)};a.Ea()}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();


//Audience Manager DIL Code
"function"!=typeof DIL&&(DIL=function(a,b){var d=[],c,e;a!==Object(a)&&(a={});var g,h,n,v,x,q,r,G,k,L,M,H;g=a.partner;h=a.containerNSID;n=a.iframeAttachmentDelay;v=!!a.disableDestinationPublishingIframe;x=a.iframeAkamaiHTTPS;q=a.mappings;r=a.uuidCookie;G=!0===a.enableErrorReporting;k=a.visitorService;L=a.declaredId;M=!0===a.removeFinishedScriptsAndCallbacks;H=!0===a.delayAllUntilWindowLoad;var N,O,P,I,E,Q,R;N=!0===a.disableScriptAttachment;O=!0===a.disableCORSFiring;P=!0===a.disableDefaultRequest;
I=a.afterResultForDefaultRequest;E=a.dpIframeSrc;Q=!0===a.testCORS;R=!0===a.useJSONPOnly;G&&DIL.errorModule.activate();var S=!0===window._dil_unit_tests;(c=b)&&d.push(c+"");if(!g||"string"!=typeof g)return c="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:c,filename:"dil.js"}),Error(c);c="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"==typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(c="");c&&
(h=0,d.push(c),c="");e=DIL.getDil(g,h);if(e instanceof DIL&&e.api.getPartner()==g&&e.api.getContainerNSID()==h)return e;if(this instanceof DIL)DIL.registerDil(this,g,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+g+" and containerNSID = "+h);var z={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},J={stuffed:{}},l={},p={firingQueue:[],
fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:h+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,
d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,mid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(f){try{if(!this.admsProcessingStarted){var t=this,a,y,c,b,d;if("function"==typeof f&&"function"==typeof f.getInstance){if(k===Object(k)&&(a=k.namespace)&&"string"==typeof a)y=f.getInstance(a);else{this.releaseType="no namespace";this.releaseRequests();return}if(y===Object(y)&&"function"==
typeof y.isAllowed&&"function"==typeof y.getMarketingCloudVisitorID){if(!y.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=y;this.admsProcessingStarted=!0;c=function(f){"VisitorAPI"!=t.releaseType&&(t.mid=f,t.releaseType="VisitorAPI",t.releaseRequests())};S&&(b=k.server)&&"string"==typeof b&&(y.server=b);d=y.getMarketingCloudVisitorID(c);if("string"==typeof d&&d.length){c(d);return}setTimeout(function(){"VisitorAPI"!=t.releaseType&&(t.releaseType=
"timeout",t.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(g){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;p.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var f=s.isPopulatedString,t=this.getMarketingCloudVisitorID();f(this.mid)&&this.mid==t||(this.mid=
t);return f(this.mid)?"d_mid="+this.mid+"&":""}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(f,t){var a=s.isPopulatedString,y=encodeURIComponent;if(f===Object(f)&&a(t)){var c=f.dpid,b=f.dpuuid,d=null;if(a(c)&&a(b)){d=y(c)+"$"+y(b);if(!0===this.declaredIdCombos[d])return"setDeclaredId: combo exists for type '"+t+"'";this.declaredIdCombos[d]=!0;this.declaredId[t]={dpid:c,dpuuid:b};return"setDeclaredId: succeeded for type '"+t+"'"}}return"setDeclaredId: failed for type '"+
t+"'"},getDeclaredIdQueryString:function(){var f=this.declaredId.request,t=this.declaredId.init,a="";null!==f?a="&d_dpid="+f.dpid+"&d_dpuuid="+f.dpuuid:null!==t&&(a="&d_dpid="+t.dpid+"&d_dpuuid="+t.dpuuid);return a}},registerRequest:function(f){var a=this.firingQueue;f===Object(f)&&a.push(f);this.firing||!a.length||H&&!DIL.windowLoaded||(this.adms.calledBack?(f=a.shift(),f.src=f.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),s.isPopulatedString(f.corsPostData)&&
(f.corsPostData=f.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),C.fireRequest(f),this.firstRequestHasFired||"script"!==f.tag&&"cors"!==f.tag||(this.firstRequestHasFired=!0)):this.processVisitorAPI())},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(f){if(!M)return"removeFinishedScriptsAndCallbacks is not boolean true";var a=this.toRemove,c,b;f===Object(f)&&(c=f.script,b=f.callbackName,(c===Object(c)&&"SCRIPT"==c.nodeName||"no script created"==
c)&&"string"==typeof b&&b.length&&a.push(f));if(this.readyToRemove&&a.length){b=a.shift();c=b.script;b=b.callbackName;"no script created"!=c?(f=c.src,c.parentNode.removeChild(c)):f=c;window[b]=null;try{delete window[b]}catch(d){}this.removed.push({scriptSrc:f,callbackName:b});DIL.variables.scriptsRemoved.push(f);DIL.variables.callbacksRemoved.push(b);return this.requestRemoval()}return"requestRemoval() processed"}};e=function(){var f="http://fast.",a="?d_nsid="+h+"#"+encodeURIComponent(document.location.href);
if("string"===typeof E&&E.length)return E+a;z.IS_HTTPS&&(f=!0===x?"https://fast.":"https://");return f+g+".demdex.net/dest4.html"+a};var B={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+g+"_"+h,url:e(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:z.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var f=this,a=document.createElement("iframe");a.id=this.id;a.style.cssText="display: none; width: 0; height: 0;";
a.src=this.url;m.addListener(a,"load",function(){f.iframeHasLoaded=!0;f.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(f,a){var c=this;f&&!s.isEmptyObject(f)&&this.process(f,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){c.messageSendingInterval=z.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(f,
a){var c=encodeURIComponent,b,d,g,e,h,k;a===Object(a)&&(k=m.encodeAndBuildRequest(["",a.dpid||"",a.dpuuid||""],","));if((b=f.dests)&&b instanceof Array&&(d=b.length))for(g=0;g<d;g++)e=b[g],e=[c("dests"),c(e.id||""),c(e.y||""),c(e.c||"")],this.addMessage(e.join("|"));if((b=f.ibs)&&b instanceof Array&&(d=b.length))for(g=0;g<d;g++)e=b[g],e=[c("ibs"),c(e.id||""),c(e.tag||""),m.encodeAndBuildRequest(e.url||[],","),c(e.ttl||""),"",k],this.addMessage(e.join("|"));if((b=f.dpcalls)&&b instanceof Array&&(d=
b.length))for(g=0;g<d;g++)e=b[g],h=e.callback||{},h=[h.obj||"",h.fn||"",h.key||"",h.tag||"",h.url||""],e=[c("dpm"),c(e.id||""),c(e.tag||""),m.encodeAndBuildRequest(e.url||[],","),c(e.ttl||""),m.encodeAndBuildRequest(h,","),k],this.addMessage(e.join("|"));this.jsonProcessed.push(f)},addMessage:function(f){var a=encodeURIComponent,a=G?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+f)},sendMessages:function(){var f=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,
this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){f.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},K={traits:function(f){s.isValidPdata(f)&&(l.sids instanceof Array||(l.sids=[]),m.extendArray(l.sids,f));return this},pixels:function(f){s.isValidPdata(f)&&(l.pdata instanceof Array||(l.pdata=[]),m.extendArray(l.pdata,f));return this},logs:function(f){s.isValidLogdata(f)&&(l.logdata!==Object(l.logdata)&&(l.logdata={}),m.extendObject(l.logdata,
f));return this},customQueryParams:function(f){s.isEmptyObject(f)||m.extendObject(l,f,p.reservedKeys);return this},signals:function(f,a){var c,b=f;if(!s.isEmptyObject(b)){if(a&&"string"==typeof a)for(c in b={},f)f.hasOwnProperty(c)&&(b[a+c]=f[c]);m.extendObject(l,b,p.reservedKeys)}return this},declaredId:function(f){p.declaredId.setDeclaredId(f,"request");return this},result:function(f){"function"==typeof f&&(l.callback=f);return this},afterResult:function(f){"function"==typeof f&&(l.postCallbackFn=
f);return this},useImageRequest:function(){l.useImageRequest=!0;return this},clearData:function(){l={};return this},submit:function(){C.submitRequest(l);l={};return this},getPartner:function(){return g},getContainerNSID:function(){return h},getEventLog:function(){return d},getState:function(){var f={},a={};m.extendObject(f,p,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});m.extendObject(a,B,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:l,otherRequestInfo:f,
destinationPublishingInfo:a}},idSync:function(f){if(f!==Object(f)||"string"!=typeof f.dpid||!f.dpid.length)return"Error: config or config.dpid is empty";if("string"!=typeof f.url||!f.url.length)return"Error: config.url is empty";var a=f.url,c=f.minutesToLive,b=encodeURIComponent,d,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==typeof c)c=20160;else if(c=parseInt(c,10),isNaN(c)||0>=c)return"Error: config.minutesToLive needs to be a positive number";d=m.encodeAndBuildRequest(["",f.dpid,
f.dpuuid||""],",");f=["ibs",b(f.dpid),"img",b(a),c,"",d];B.addMessage(f.join("|"));p.firstRequestHasFired&&B.requestToProcess();return"Successfully queued"},aamIdSync:function(f){if(f!==Object(f)||"string"!=typeof f.dpuuid||!f.dpuuid.length)return"Error: config or config.dpuuid is empty";f.url="//dpm.demdex.net/ibs:dpid="+f.dpid+"&dpuuid="+f.dpuuid;return this.idSync(f)},passData:function(f){if(s.isEmptyObject(f))return"Error: json is empty or not an object";C.defaultCallback(f);return"json submitted for processing"},
getPlatformParams:function(){return p.platformParams},getEventCallConfigParams:function(){var f=p,a=f.modStatsParams,c=f.platformParams,b;if(!a){a={};for(b in c)c.hasOwnProperty(b)&&!f.nonModStatsParams[b]&&(a[b.replace(/^d_/,"")]=c[b]);f.modStatsParams=a}return a}},C={corsMetadata:function(){var f="none",a=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?f="XMLHttpRequest":Function("/*@cc_on return /^10/.test(@_jscript_version) @*/")()?
f="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(a=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(a=!1));return{corsType:f,corsCookiesEnabled:a}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(f){p.registerRequest(C.createQueuedRequest(f));return!0},createQueuedRequest:function(f){var a=p,c,b=f.callback,d="img",e;if(!s.isEmptyObject(q)){var k,
A,r;for(k in q)q.hasOwnProperty(k)&&(A=q[k],null!=A&&""!==A&&k in f&&!(A in f||A in p.reservedKeys)&&(r=f[k],null!=r&&""!==r&&(f[A]=r)))}s.isValidPdata(f.sids)||(f.sids=[]);s.isValidPdata(f.pdata)||(f.pdata=[]);s.isValidLogdata(f.logdata)||(f.logdata={});f.logdataArray=m.convertObjectToKeyValuePairs(f.logdata,"=",!0);f.logdataArray.push("_ts="+(new Date).getTime());"function"!=typeof b&&(b=this.defaultCallback);if(a.useJSONP=!0!==f.useImageRequest)d="script",c=a.callbackPrefix+"_"+g+"_"+h+"_"+(new Date).getTime();
a=this.makeRequestSrcData(f,c);!R&&(e=this.getCORSInstance())&&a.truncated&&(this.corsMetadata.corsCookiesEnabled||a.isDeclaredIdCall)&&(d="cors");return{tag:d,src:a.src,corsSrc:a.corsSrc,internalCallbackName:c,callbackFn:b,postCallbackFn:f.postCallbackFn,useImageRequest:!!f.useImageRequest,requestData:f,corsInstance:e,corsPostData:a.corsPostData,hasCORSError:!1}},defaultCallback:function(f,a){var c,b,d,e,g,h,k,q,w;if((c=f.stuff)&&c instanceof Array&&(b=c.length))for(d=0;d<b;d++)if((e=c[d])&&e===
Object(e)){g=e.cn;h=e.cv;k=e.ttl;if("undefined"==typeof k||""===k)k=Math.floor(m.getMaxCookieExpiresInMinutes()/60/24);q=e.dmn||"."+document.domain.replace(/^www\./,"");w=e.type;g&&(h||"number"==typeof h)&&("var"!=w&&(k=parseInt(k,10))&&!isNaN(k)&&m.setCookie(g,h,1440*k,"/",q,!1),J.stuffed[g]=h)}c=f.uuid;s.isPopulatedString(c)&&!s.isEmptyObject(r)&&(b=r.path,"string"==typeof b&&b.length||(b="/"),d=parseInt(r.days,10),isNaN(d)&&(d=100),m.setCookie(r.name||"aam_did",c,1440*d,b,r.domain||"."+document.domain.replace(/^www\./,
""),!0===r.secure));v||p.abortRequests||B.requestToProcess(f,a)},makeRequestSrcData:function(f,a){f.sids=s.removeEmptyArrayValues(f.sids||[]);f.pdata=s.removeEmptyArrayValues(f.pdata||[]);var c=p,b=c.platformParams,d=m.encodeAndBuildRequest(f.sids,","),e=m.encodeAndBuildRequest(f.pdata,","),k=(f.logdataArray||[]).join("&");delete f.logdataArray;var q=z.IS_HTTPS?"https://":"http://",r=c.declaredId.getDeclaredIdQueryString(),l;l=[];var w,n,F,x;for(w in f)if(!(w in c.reservedKeys)&&f.hasOwnProperty(w))if(n=
f[w],w=encodeURIComponent(w),n instanceof Array)for(F=0,x=n.length;F<x;F++)l.push(w+"="+encodeURIComponent(n[F]));else l.push(w+"="+encodeURIComponent(n));l=l.length?"&"+l.join("&"):"";w=!1;d="d_nsid="+b.d_nsid+r+(d.length?"&d_sid="+d:"")+(e.length?"&d_px="+e:"")+(k.length?"&d_ld="+encodeURIComponent(k):"");b="&d_rtbd="+b.d_rtbd+"&d_jsonv="+b.d_jsonv+"&d_dst="+b.d_dst;q=q+g+".demdex.net/event";e=c=q+"?"+d+(c.useJSONP?b+"&d_cb="+(a||""):"")+l;2048<c.length&&(c=c.substring(0,c.lastIndexOf("&")),w=!0);
return{corsSrc:q+"?"+(Q?"testcors=1&d_nsid="+h+"&":"")+"_ts="+(new Date).getTime(),src:c,originalSrc:e,truncated:w,corsPostData:d+b+l,isDeclaredIdCall:""!==r}},fireRequest:function(f){if("img"==f.tag)this.fireImage(f);else{var a=p.declaredId,a=a.declaredId.request||a.declaredId.init||{},a={dpid:a.dpid||"",dpuuid:a.dpuuid||""};"script"==f.tag?this.fireScript(f,a):"cors"==f.tag&&this.fireCORS(f,a)}},fireImage:function(a){var b=p,e,g;b.abortRequests||(b.firing=!0,e=new Image(0,0),b.sent.push(a),e.onload=
function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},g=function(e){c="imgAbortOrErrorHandler received the event of type "+e.type;d.push(c);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.num_of_img_errors++;b.registerRequest()},e.addEventListener?(e.addEventListener("error",g,!1),e.addEventListener("abort",g,!1)):e.attachEvent&&(e.attachEvent("onerror",g),e.attachEvent("onabort",g)),e.src=a.src)},fireScript:function(a,b){var e=this,h=p,k,q,r=a.src,l=a.postCallbackFn,
n="function"==typeof l,m=a.internalCallbackName;h.abortRequests||(h.firing=!0,window[m]=function(e){try{e!==Object(e)&&(e={});var k=a.callbackFn;h.firing=!1;h.fired.push(a);h.num_of_jsonp_responses++;k(e,b);n&&l(e,b)}catch(u){u.message="DIL jsonp callback caught error with message "+u.message;c=u.message;d.push(c);u.filename=u.filename||"dil.js";u.partner=g;DIL.errorModule.handleError(u);try{k({error:u.name+"|"+u.message},b),n&&l({error:u.name+"|"+u.message},b)}catch(r){}}finally{h.requestRemoval({script:q,
callbackName:m}),h.registerRequest()}},N?(h.firing=!1,h.requestRemoval({script:"no script created",callbackName:m})):(q=document.createElement("script"),q.addEventListener&&q.addEventListener("error",function(b){h.requestRemoval({script:q,callbackName:m});c="jsonp script tag error listener received the event of type "+b.type+" with src "+r;e.handleScriptError(c,a)},!1),q.type="text/javascript",q.src=r,k=DIL.variables.scriptNodeList[0],k.parentNode.insertBefore(q,k)),h.sent.push(a),h.declaredId.declaredId.request=
null)},fireCORS:function(a,b){function e(q){try{var u=JSON.parse(q);if(u!==Object(u)){h.handleCORSError(a,b,"Response is not JSON");return}}catch(l){h.handleCORSError(a,b,"Error parsing response as JSON");return}try{var r=a.callbackFn;k.firing=!1;k.fired.push(a);k.num_of_cors_responses++;r(u,b);x&&n(u,b)}catch(m){m.message="DIL handleCORSResponse caught error with message "+m.message;c=m.message;d.push(c);m.filename=m.filename||"dil.js";m.partner=g;DIL.errorModule.handleError(m);try{r({error:m.name+
"|"+m.message},b),x&&n({error:m.name+"|"+m.message},b)}catch(p){}}finally{k.registerRequest()}}var h=this,k=p,q=this.corsMetadata.corsType,r=a.corsSrc,l=a.corsInstance,m=a.corsPostData,n=a.postCallbackFn,x="function"===typeof n;if(!k.abortRequests){k.firing=!0;if(O)k.firing=!1;else try{l.open("post",r,!0),"XMLHttpRequest"===q?(l.withCredentials=!0,l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.onreadystatechange=function(){4===this.readyState&&(200===this.status?e(this.responseText):
h.handleCORSError(a,b,"onreadystatechange"))}):"XDomainRequest"===q&&(l.onload=function(){e(this.responseText)}),l.onerror=function(c){h.handleCORSError(a,b,"onerror")},l.ontimeout=function(c){h.handleCORSError(a,b,"ontimeout")},l.send(m)}catch(s){this.handleCORSError(a,b,"try-catch")}k.sent.push(a);k.declaredId.declaredId.request=null}},handleCORSError:function(a,b,c){a.hasCORSError||(a.hasCORSError=!0,p.num_of_cors_errors++,a.tag="script",this.fireScript(a,b))},handleScriptError:function(a,b){p.num_of_jsonp_errors++;
this.handleRequestError(a,b)},handleRequestError:function(a,b){var c=p;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.registerRequest()}},s={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,e=[],b=0;b<c;b++)d=a[b],
"undefined"!=typeof d&&null!=d&&e.push(d);return e},isPopulatedString:function(a){return"string"==typeof a&&a.length}},m={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"==typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"==typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,b,c){var d=[];b=b||"=";var e,g;for(e in a)g=a[e],"undefined"!=typeof g&&null!=g&&d.push(e+
b+(c?encodeURIComponent(g):g));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=Array(d),g=0;g<d;g++)g in c&&(e[g]=b.call(b,c[g],g,c));return e},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),
d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=[],g=0;g<d;g++)if(g in c){var h=c[g];b.call(b,h,g,c)&&e.push(h)}return e}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),c,d,e;c=0;for(d=b.length;c<d;c++){for(e=b[c];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,b,c,d,e,g){var h=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+
(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(g?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)!b.hasOwnProperty(d)||!s.isEmptyObject(c)&&d in c||(a[d]=b[d]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(z.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/
1E3/60}};"error"==g&&0==h&&m.addListener(window,"load",function(){DIL.windowLoaded=!0});var D=function(){p.registerRequest();U();v||p.abortRequests||B.attachIframe();p.readyToRemove=!0;p.requestRemoval()},U=function(){v||setTimeout(function(){P||p.firstRequestHasFired||p.adms.admsProcessingStarted||p.adms.calledBack||("function"==typeof I?K.afterResult(I).submit():K.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},T=document;"error"!=g&&(DIL.windowLoaded?D():"complete"!=T.readyState&&"loaded"!=
T.readyState?m.addListener(window,"load",D):DIL.isAddedPostWindowLoadWasCalled?m.addListener(window,"load",D):H||(n="number"==typeof n?parseInt(n,10):0,0>n&&(n=0),setTimeout(D,n||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));p.declaredId.setDeclaredId(L,"init");this.api=K;this.getStuffedVariable=function(a){var b=J.stuffed[a];b||"number"==typeof b||(b=m.getCookie(a))||"number"==typeof b||(b="");return b};this.validators=s;this.helpers=m;this.constants=z;this.log=d;S&&(this.pendingRequest=
l,this.requestController=p,this.setDestinationPublishingUrl=e,this.destinationPublishing=B,this.requestProcs=C,this.variables=J,this.callWindowLoadFunctions=D)},function(){var a=document,b;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",b=function(){a.removeEventListener("DOMContentLoaded",b,!1);a.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(a){var b;if(a===Object(a))for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},
DIL.extendStaticPropertiesAndMethods({version:"5.4",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof a?!!a():"boolean"==typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(b){return(new Image(0,
0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,b,d){b=b+"$"+d;b in this.dils||(this.dils[b]=a)},getDil:function(a,b){var d;"string"!=typeof a&&(a="");b||(b=0);d=a+"$"+b;return d in this.dils?this.dils[d]:
Error("The DIL instance with partner = "+a+" and containerNSID = "+b+" was not found")},dexGetQSVars:function(a,b,d){b=this.getDil(b,d);return b instanceof this?b.getStuffedVariable(a):""},xd:{postMessage:function(a,b,d){var c=1;b&&(window.postMessage?d.postMessage(a,b.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):b&&(d.location=b.replace(/#.*$/,"")+"#"+ +new Date+c++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),b={harvestererror:14138,
destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(c){if(!d)return"DIL error module has not been activated";c!==Object(c)&&(c={});var e=c.name?(new String(c.name)).toLowerCase():"",g=[];c={name:e,filename:c.filename?c.filename+"":"",partner:c.partner?c.partner+"":"no_partner",site:c.site?c.site+"":document.location.href,
message:c.message?c.message+"":""};g.push(e in b?b[e]:b.noerrortypedefined);a.api.pixels(g).logs(c).useImageRequest().submit();return"DIL error report sent"},pixelMap:b}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,b,d){var c="";b=b||"Error caught in DIL module/submodule: ";a===Object(a)?c=b+(a.message||"err has no message"):(c=b+"err is not a valid object",a={});a.message=c;d instanceof DIL&&(a.partner=d.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=
c}}});
DIL.tools.getSearchReferrer=function(a,b){var d=DIL.getDil("error"),c=DIL.tools.decomposeURI(a||document.referrer),e="",g="",h={queryParam:"q"};return(e=d.helpers.filter([b===Object(b)?b:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!c.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:c.hostname,keywords:(d.helpers.extendObject(h,e),g=h.queryPattern?(e=
(""+c.search).match(h.queryPattern))?e[1]:"":c.uriParams[h.queryParam],decodeURIComponent(g||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var b=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){b.helpers.map(d.split("&"),function(b){b=b.split("=");a[b.shift()]=b.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},b=document.getElementsByTagName("meta"),d,c,e,g,h;d=0;for(e=arguments.length;d<e;d++)if(g=arguments[d],null!==g)for(c=0;c<b.length;c++)if(h=b[c],h.name==g){a[g]=h.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d,c){try{var e=this,g={name:"DIL Site Catalyst Module Error"},h=function(a){g.message=a;DIL.errorModule.handleError(g);return a};this.options=c===Object(c)?c:{};this.dil=null;if(b instanceof DIL)this.dil=b;else return h("dilInstance is not a valid instance of DIL");g.partner=b.api.getPartner();if(a!==Object(a))return h("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=
function(a){var b="function"===typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return h("m is not an object");b.trackVars=e.constructTrackVars(d);b.d=0;b.s=a;b._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,g,n=[];g=[];var x={},v=!1;if(d!==Object(d))return h("Error in m._t function: s is not an object");if(this.d){if("function"==typeof d.foreachVar)d.foreachVar(function(a,b){"undefined"!==typeof b&&(x[a]=b,v=!0)},this.trackVars);else{if(!(d.va_t instanceof Array))return h("Error in m._t function: s.va_t is not an array");
if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType)a=d.linkTrackVars,d.pe&&(b=d.pe.substring(0,1).toUpperCase()+d.pe.substring(1),d[b]&&(a=d[b].trackVars)),a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",");if(a){b=0;for(n=a.split(",");b<n.length;b++)0<=c.indexOf(","+n[b]+",")&&g.push(n[b]);g.length&&(c=","+g.join(",")+",")}g=0;for(b=d.va_t.length;g<b;g++)a=d.va_t[g],0<=c.indexOf(","+a+",")&&"undefined"!==typeof d[a]&&null!==d[a]&&""!==d[a]&&(x[a]=d[a],v=!0)}e.includeContextData(d,
e,x).store_populated&&(v=!0);v&&this.d.api.signals(x,"c_").submit()}}};a.loadModule("DIL");a.DIL.d=b;return g.message?g.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(n){return this.handle(n,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var b=[],d,c,e,g,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(e=d.length))for(c=0;c<e;c++)g=d[c],"string"==typeof g&&g.length&&b.push(g);a=a.iteratedNames;if(a instanceof Array&&
(e=a.length))for(c=0;c<e;c++)if(d=a[c],d===Object(d)&&(g=d.name,h=parseInt(d.maxIndex,10),"string"==typeof g&&g.length&&!isNaN(h)&&0<=h))for(d=0;d<=h;d++)b.push(g+d);if(b.length)return b.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:250}]})},includeContextData:function(a,b,d){var c={},e=!1;if(a.contextData===Object(a.contextData)){a=a.contextData;b=b.options.replaceContextDataPeriodsWith;
var g,h;"string"===typeof b&&b.length||(b="_");for(g in a)a.hasOwnProperty(g)&&((h=a[g])||"number"===typeof h)&&(g=("contextData."+g).replace(/\./g,b),d[g]=h,e=!0)}c.store_populated=e;return c}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var c={name:"DIL GA Module Error"},e="";b instanceof DIL?(this.dil=b,c.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",
c.message=e,DIL.errorModule.handleError(c));a instanceof Array&&a.length?this.arr=a:(e="gaArray is not an array or is empty",c.message=e,DIL.errorModule.handleError(c));this.tv=this.constructTrackVars(d);this.errorMessage=e}catch(g){this.handle(g,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var b=[],d,c,e,g;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){e=this.defaultTrackVars;g={};d=0;for(c=e.length;d<c;d++)g[e[d]]=
!0;this.defaultTrackVarsObj=g}else g=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(c=a.length))for(d=0;d<c;d++)e=a[d],"string"==typeof e&&e.length&&e in g&&b.push(e);if(b.length)return b}return this.defaultTrackVars},constructGAObj:function(a){var b={};a=a instanceof Array?a:this.arr;var d,c,e,g;d=0;for(c=a.length;d<c;d++)e=a[d],e instanceof Array&&e.length&&(e=[],g=a[d],e instanceof Array&&g instanceof Array&&Array.prototype.push.apply(e,g),g=e.shift(),"string"==typeof g&&
g.length&&(b[g]instanceof Array||(b[g]=[]),b[g].push(e)));return b},addToSignals:function(a,b){if("string"!=typeof a||""===a||null==b||""===b)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(b);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),b={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c,d){"string"==typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,e,g){this.addToSignals("c_itemOrderId",
a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",g)},_addTrans:function(a,b,c,d,e,g,h,n){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",g);this.addToSignals("c_transState",h);this.addToSignals("c_transCountry",
n)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,c,e,g,h,n,v;c=0;for(e=d.length;c<e;c++)if(g=d[c],a.hasOwnProperty(g)&&b.hasOwnProperty(g)&&(v=a[g],v instanceof Array))for(h=0,n=v.length;h<n;h++)b[g].apply(this,v[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),
"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,b,d){try{this.callback=this.dil=null,this.errorMessage="",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,
this.cookieName=this.v(b)?b:"aam_ga",this.delimiter=this.v(d)?d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(c){this.handle(c,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var b,d,c,e,g,h;h=!1;var n=1;if(a===Object(a)&&(b=a.stuff)&&b instanceof Array&&(d=b.length))for(a=0;a<d;a++)if((c=b[a])&&c===Object(c)&&(e=c.cn,g=c.cv,e==this.cookieName&&this.v(g))){h=!0;break}if(h){b=
g.split(this.delimiter);"undefined"==typeof window._gaq&&(window._gaq=[]);c=window._gaq;a=0;for(d=b.length;a<d&&!(h=b[a].split("="),g=h[0],h=h[1],this.v(g)&&this.v(h)&&c.push(["_setCustomVar",n++,g,h,1]),n>this.LIMIT);a++);this.errorMessage=1<n?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;
this.dil.api.afterResult(function(b){a.process(b)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(b){return this.handle(b,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};d={name:"DIL Peer39 Module Error"};var c=[],e="";this.isSecurePageButNotEnabled(document.location.protocol)&&(e="Module has not been enabled for a secure page",c.push(e),d.message=e,DIL.errorModule.handleError(d));b instanceof
DIL?(this.dil=b,d.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",c.push(e),d.message=e,DIL.errorModule.handleError(d));"string"==typeof a&&a.length?this.aid=a:(e="aid is not a string or is empty",c.push(e),d.message=e,DIL.errorModule.handleError(d));this.errorMessage=c.join("\n")}catch(g){this.handle(g,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"==a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,b=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(d){}finally{a.calledBack=!0,"function"==typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(b,d);this.scriptsSent.push(b);return"Request sent to Peer39"},processData:function(a){var b,d,c,e,g={},h=!1;
this.returnedData.push(a);if(a instanceof Array)for(b=0,d=a.length;b<d;b++)c=a[b].split("="),e=c[0],c=c[1],e&&isFinite(c)&&!isNaN(parseInt(c,10))&&(g[e]instanceof Array||(g[e]=[]),g[e].push(c),h=!0);return{hasSignals:h,signals:g}},constructScript:function(){var a=document.createElement("script"),b=this.optionals,d=b.scriptId,c=b.scriptSrc,b=b.scriptParams;a.id="string"==typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"==typeof c&&c.length?a.src=c:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof b&&b.length&&(a.src+="?"+b));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};

// Instantiate DIL version 5.4
var eonlineDIL = DIL.create({
		partner : "eo",
		uuidCookie : {
			name : 'aam_uuid',
			days : 30
		}
	});
	
//ID sync with eVar75
//if(s.Util.cookieRead("idx_u") != true){
//  s.eVar75 = s.Util.cookieRead("idx_u");
//  s.prop75 = s.Util.cookieRead("idx_u");
//}
var acc=s.eVar75;if(acc){eonlineDIL.api.aamIdSync({dpid:'11600',dpuuid:acc,minutesToLive:20160});};

//Sitecat ID sync
var sc = eonlineDIL.helpers.getCookie("s_vi");
if (sc) {
	sc = sc.split("|")[1].split("[")[0];
	eonlineDIL.api.aamIdSync({
		dpid : '11601',
		dpuuid : sc,
		minutesToLive : 20160
	});
};

//SC Data Collection

var _scDilObj = s_gi(s_account);
DIL.modules.siteCatalyst.init(_scDilObj, eonlineDIL, {
	names : ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
	iteratedNames : [{
			name : 'eVar',
			maxIndex : 75
		}, {
			name : 'prop',
			maxIndex : 75
		}, {
			name : 'pev',
			maxIndex : 3
		}, {
			name : 'hier',
			maxIndex : 4
		}
	]
});
