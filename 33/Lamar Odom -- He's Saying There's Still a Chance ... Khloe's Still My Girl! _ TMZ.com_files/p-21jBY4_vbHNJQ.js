function _qcdomain2(){
 var d=document.domain;
 if(d.substring(0,4)=="www.")d=d.substring(4,d.length);
 var a=d.split(".");var len=a.length;
 if(len<3)return d;
 var e=a[len-1];
 if(e.length<3)return d;
 d=a[len-2]+"."+a[len-1];
 return d;
}
function quantseg()
{
 var segs="Q_D|Q_T|Q_27455|Q_27454|Q_12412|Q_12230|Q_12229|Q_12227|Q_12226|Q_2678|Q_2675|Q_2674|Q_2671|Q_1615|Q_1614|Q_1611|Q_1543";
 var u=document;
 var d=_qcdomain2();
 u.cookie="__qseg="+segs+"; expires=Sun, 18 Jan 2038 00:00:00 GMT; path=/; domain="+d;
}
quantseg();