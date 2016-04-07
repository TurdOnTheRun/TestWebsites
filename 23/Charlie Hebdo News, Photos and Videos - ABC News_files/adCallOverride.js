function createCookie(name,value,days,domain) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	
		if(domain !=null && typeof domain != 'undefined'){
			domain = "; domain=" + domain;
		}
		
	document.cookie = name+"="+value+expires+domain+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
	
tq.subId = '';
tq.aoStr = readCookie('tqao');
if(tq.aoStr) {
	tq.aoArr = tq.aoStr.split('~');
	if(tq.aoArr.length > 2){
		tq.dRef = document.referrer.toLowerCase();
		if(tq.dRef){
			tq.dRefArr = tq.dRef.split('/');
			if((tq.dRef.indexOf('abcnews.go.com') != -1)||(tq.dRef.indexOf('dig.com') != -1)){
				if((tq.dRef.indexOf(tq.aoArr[1]) != -1)&&(tq.dRef.indexOf(tq.aoArr[2]) != -1)){
					if((tq.aoArr[3] != 'undefined')&&(tq.aoArr[3] != '')&&(tq.aoArr[3] != null)){
						tq.subId = tq.aoArr[3];
					}
				}
			}
		}
	}
	if(tq.subId != ''){
		document.write('<scr'+'ipt type="text/javascript" src="/includes/insert/adCall?id='+tq.subId+'&itemId='+tq.id+'&jsoverride=true"></scr'+'ipt>');
	}
	createCookie('tqao','');
}