/*
*
* C3 Metrics
*
* http://www.c3metrics.com
* http://www.c3tag.com
*
* Copyright (c) 2008 - 2013 C3 Metrics, Inc. All Rights Reserved
* Patent Pending
* v.4.2.035
*
*/
!function(a,b){function c(a,c){a.s3.c3l0===b&&d.p1(a.r3,a.s3,c),a.n1.q3&&d.p1(a.n1.q3,a.s3,c,!0),a.s3.c3vc!==b&&1==a.s3.c3vc&&d.p1(a.n1.vc,a.s3,c)}var d=a.$C3,e=function(a){return document.createElement(a)};("undefined"==typeof d||"object"==typeof d&&"C3 Metrics"!==d.n2)&&(d={n2:"C3 Metrics",v8:"4.2.035",o0:[],v6:["c3tag.com/","c3metrics.com/","trusteview.com/","truste.com/","channelcadence.com/","c3metrics.dev/"],v7:["v.js?","v1.js?"],w1:[],u1:[],q8:a==a.top,v1:7,r7:null,m5:{id:null,version:null},o8:/\/v(1)?\.js/,v9:{width:0,height:0,r2:null},s8:{l4:5,l5:2,l6:1,l7:null,l8:3},s9:null,q1:function(){var b=this;b.q8&&(b.v9.r2=b.u5(),b.v9.r2(),b.u3("resize",b.v9.r2));var c=a.navigator.userAgent;/Windows/.test(c)?b.r7=1:/Macintosh/.test(c)?b.r7=2:/Android/.test(c)?b.r7=4:/Linux/.test(c)?b.r7=3:/iPhone|iPad/.test(c)&&(b.r7=5),/Firefox[\/\s](\d+\.\d+)/.test(c)?(b.m5.id=1,b.m5.version=+new Number(RegExp.$1)):/MSIE (\d+\.\d+);/.test(c)||/Trident.+rv\:(\d+)/.test(c)?(b.m5.id=9,b.m5.version=+new Number(RegExp.$1)):/Chrome[\/\s](\d+\.\d+)/.test(c)?(b.m5.id=2,b.m5.version=+new Number(RegExp.$1)):/Safari/.test(c)?(b.m5.id=3,/Version\/(.*)\s/.test(c),b.m5.version=parseInt(RegExp.$1)):/Opera\/(.*)\s/.test(c)&&(b.m5.id=4,b.m5.version=parseInt(RegExp.$1)),b.s8.l7=""+b.r7+b.m5.id+(b.m5.version<10?"0"+b.m5.version:b.m5.version)+"1",b.s9=e("div"),b.s9.style.cssText="display:none;",document.body.appendChild(this.s9)},m2:function(a){a.n3==d.m1&&this.w1.push(a)},o9:function(a){for(var b=this,c=0,d=0,e=document.getElementsByTagName("script"),f=0;f<e.length;f++){var g=e[f];if(-1==b.q0(g,b.u1)){if(/MSIE 7\.0/.test(navigator.userAgent))c=1;else for(var h=0;h<b.v6.length;h++)if(-1!==g.src.toLowerCase().search(b.v6[h])){c=1;break}for(var i=0;i<b.v7.length;i++)if(-1!==g.src.toLowerCase().search(b.v7[i])){d=1;break}if(c&&d)return a&&b.u1.push(g),g}c=0,d=0}},p1:function(c,d,f,g){var h=this;if(g){var i=e("iframe");i.style.cssText="width:0;height:0;display:none;",i.src=c,h.s9.appendChild(i)}else{var j="iN="+d.id+"&cid="+escape(d.cid);j+=d.nid&&""!==d.nid&&d.c3ch&&""!==d.c3ch?"&nid=x-nid:"+escape(d.c3ch)+"<-ch-nid->"+escape(d.nid):"&nid="+escape(d.nid);for(var k=h.v1;k;k--)""!==d["param"+k]&&(j+="&param"+k+"="+escape(d["param"+k]));d.c3t0!==b&&(j+="&c3T0"),d.c3ufc!==b&&(d.c3ufc=parseInt(d.c3ufc))&&(j+="&ufc="+d.c3ufc),d.c3ce!==b&&d.c3ce>0&&(j+="&c3ce="+d.c3ce),j+="&w="+a.screen.width+"&h="+a.screen.height,f&&(j+="&sT="+f),c+="?"+j,h.w0()&&h.v4("resize",h.v9.r2);var l=new XMLHttpRequest;l.open("GET",c),l.send()}},p5:function(a,b){var c=a.split("?")[0];if(b){var d=c.split("/");return d[d.length-1]=b,d.join("/")}return c},q0:function(a,c){if(c.length!==b){if(Array.prototype.indexOf)return c.indexOf(a);for(var d=0;d<c.length;d++)if(c[d]===a)return d;return-1}return-1},u4:function(a,b){var c=function(c){var d="&"+c+"=~{";if(-1!==b.indexOf(d)){var e=b.indexOf(d),f=b.indexOf("}~",e);a[c]=b.slice(e+d.length,f),b=b.slice(0,e)+b.slice(f+2)}};c("c3pxim"),c("c3pxiv"),c("c3pxvc");var d=b.split("?"),e=d[1].split("&");if(!e[1]||""==e[1]||d.length>2)return null;for(var f=0;f<e.length;f++){var g=e[f].split("=");if(g[1]){var h=g[0].toLowerCase(),i=decodeURI(g[1]).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");switch(h){case"c3nid":case"id":case"ca":case"c3":h="nid";break;case"ci":h="cid";break;case"size":case"c3size":h="param1";break;case"campaign":case"c3campaign":h="param2";break;case"placement":case"c3placement":h="param3";break;case"creative":case"c3creative":h="param4";break;case"advertiser":case"c3advertiser":h="param5";break;case"ad":case"c3ad":h="param6";break;case"adid":case"c3adid":h="param7"}a[h]=i||""}}return!a.cid||isNaN(parseInt(a.cid))||+a.cid<100||!a.nid?(a.cid=!1,null):(-1!==this.q0(+a.cid,this.o0)&&(a.c3l0=1),a.c3ms="undefined"!=typeof a.c3ms&&NaN!==+a.c3ms&&+a.c3ms>0?+a.c3ms:1e3,a)},u5:function(){var b=this;return function(){"undefined"!=typeof a.innerWidth?(b.v9.width=a.innerWidth,b.v9.height=a.innerHeight):"undefined"!=typeof document.documentElement&&"undefined"!=typeof document.documentElement.clientWidth&&0!=document.documentElement.clientWidth?(b.v9.width=document.documentElement.clientWidth,b.v9.height=document.documentElement.clientHeight):(b.v9.width=document.getElementsByTagName("body")[0].clientWidth,b.v9.height=document.getElementsByTagName("body")[0].clientHeight)}},u3:function(b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent("on"+b,c)},v4:function(b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent("on"+b,c)},w0:function(){var a=this,b=0;if(!a.w1.length)return!1;for(var c=0;c<a.w1.length;c++){if(!a.w1[c].n9)return!1;b++}return b==a.w1.length}},d.q1(),a.$C3=d),d.m1=function(){var a=this;a.id=Math.floor(999999*Math.random()),a.n9=!1,a.s3={nid:"",cid:"",c3trx:"",param1:"",param2:"",param3:"",param4:"",param5:"",param6:"",param7:"",id:a.id},a.t9=d.o9(1),d.u4(a.s3,a.t9.src);var b,c=a.t9.src.split("//")[1].split("/")[0].split("."),f=c[c.length-1],g=e("a"),h=a.s3.cid;g.href=a.t9.src,b=-1!==g.hostname.toLowerCase().indexOf("truste"),a.s3.cid>=8e3&&(h=String(a.s3.cid).length>=6?a.s3.cid:"cvent"),a.r3="//"+h+"-vt."+(345==a.s3.cid?"c3metrics":"c3tag")+"."+f,a.n1={q3:null,p7:null},a.s3.c3pxiv&&(a.n1.q3=a.s3.c3pxiv),a.s3.c3pxim&&(a.n1.p7=a.s3.c3pxim);var i="cdn-view."+(345===a.s3.cid?"c3metrics":"c3tag")+".com";b&&(i="view.truste.com"),a.p4="//"+i+"/e1.html",1==a.s3.c3vc&&(a.s3.c3pxvc?a.n1.vc=a.s3.c3pxvc:a.n1.vc="//ct."+(b?"truste":"c3tag")+".com/vccall.php")},d.q8?d.m1.prototype={n3:d.m1,q1:function(){var a=this;a.q2=null;var c=e("p");return c.style.cssText="margin:0;padding:0;display:block;width:1px;height:1px;",a.t9.parentNode.insertBefore(c,a.t9.nextSibling),a.v2={o5:c,t2:{top:null,bottom:null,left:null,right:null}},a.r2={n8:a.n8(),o1:function(){a.v2.t2=a.m9(a.v2.o5.offsetParent,0,0,a.v2.o5),a.r2.n8(),d.u3("scroll",a.r2.n8,!1)}},"complete"==document.readyState?a.r2.o1():d.u3("load",a.r2.o1,!1),a.s3.c3l0==b&&d.p1(a.r3,a.s3,d.s8.l4),a.n1.p7&&d.p1(a.n1.p7,a.s3,d.s8.l4,!0),a},m9:function(a,b,c,d){return a.offsetParent?this.m9(a.offsetParent,b+a.offsetLeft,c+a.offsetTop,d):{top:parseInt(d.offsetTop+c),left:parseInt(d.offsetLeft+b),bottom:parseInt(d.offsetTop+c+d.offsetHeight),right:parseInt(d.offsetLeft+b+d.offsetWidth)}},n8:function(){var a=this,b=(this.v2.o5,document.compatMode&&"BackCompat"!=document.compatMode?document.documentElement:document.body);return function(e){var f=a.v2.t2,g={left:document.all?b.scrollLeft:pageXOffset,top:document.all?b.scrollTop:pageYOffset};if(!a.n9&&!a.q2&&(f.bottom<=d.v9.height&&f.right<=d.v9.width||f.top<=d.v9.height+g.top&&f.top>=g.top&&f.right<=d.v9.width+g.left)){var h=function(){g={left:document.all?b.scrollLeft:pageXOffset,top:document.all?b.scrollTop:pageYOffset},f.top<=d.v9.height+g.top&&f.top>=g.top&&f.right<=d.v9.width+g.left?(c(a,d.s8.l6),d.v4("scroll",a.r2.n8),a.n9=!0):a.q2=null};a.q2=setTimeout(h,a.s3.c3ms)}}}}:1===d.m5.id?d.m1.prototype={n3:d.m1,q1:function(){var a=this;return a.s3.c3l0===b&&d.p1(a.r3,a.s3,d.s8.l4),a.n1.p7&&d.p1(a.n1.p7,a.s3,d.s8.l5,!0),a.n8(),this},n8:function(){function b(){f.clearRect(0,0,e.width,e.height),f.fillRect(0,0,2,2),r()!==!1&&h(b)}var e,f,g=this,h=a.mozRequestAnimationFrame||a.requestAnimationFrame||function(b){a.setTimeout(function(){b(+new Date)},10)};e=document.createElement("canvas"),f=e.getContext("2d");var i=(a.innerHeight-1)/2,j=(a.innerWidth-1)/2;e.width=e.height=1,e.style.cssText="position:absolute;z-index:0;top:"+i+"px;left:"+j+"px;",f.fillStyle="transparent",document.body.insertBefore(e,document.body.firstChild);var k=0,l=0,m=0,n={},o=null,p=0,q=g.s3.c3ms+100,r=function(){o=+new Date,n[o]=a.mozPaintCount>k?1:0,l=0,m=0,p=0;for(var b in n)b>=o-q&&(1==n[b]?(0==p&&(p=b),l++):m++);return p<=o-g.s3.c3ms&&l>m?(c(g,d.s8.l7),g.n9=!0,!1):void(k=a.mozPaintCount)};b()}}:d.m1.prototype={n3:d.m1,q1:function(){var c=this;return!c.p2()||/MSIE 10/.test(navigator.userAgent)&&-1!==a.navigator.userAgent.toLowerCase().indexOf("windows nt 6.2")?(5===d.r7||4===d.r7?d.p1(c.r3,c.s3,d.s8.l8):c.s3.c3l0===b&&d.p1(c.r3,c.s3,d.s8.l4),c.n1.p7&&d.p1(c.n1.p7,c.s3,d.s8.l5,!0)):c.u6(),this},p2:function(){if(!a.ActiveXObject){for(var b=0;b<navigator.plugins.length;b++)if(/Shockwave Flash/.test(navigator.plugins[b].name))return/(\d+\.\d+)/.test(navigator.plugins[b].description),parseFloat(RegExp.$1);return!1}var c=null;try{c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(d){return!1}if(c){var e=c.GetVariable("$version").substring(4);return e=e.split(","),e=parseFloat(e[0]+"."+e[1])}},u6:function(){for(var a=this.t9.src.split("?"),b="",c=1;c<a.length;c++)b+=a[c],c!==a.length-1&&(b+="?");b+="&iframeValue="+d.s8.l7;var e=document.createElement("iframe");e.id="c3",e.style.cssText="width:100%;height:100%;position:absolute;left:0;top:0;border:none;z-index:-1;",e.src=this.p4+"?"+encodeURIComponent(b),document.body.appendChild(e)}};var f=new d.m1;f.s3.cid!==!1&&-1===d.q0(+f.s3.cid,d.o0)&&d.m2(f.q1())}(this);