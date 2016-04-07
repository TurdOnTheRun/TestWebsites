/* This source code is Copyright (c) Vibrant Media 2001-2015 and forms part of the patented Vibrant Media product "IntelliTXT" (sm). */
var $iTXTthisBuild='16.35.0';var $iTXTversions={jscore:'1446569672',jsdebug:'1395261999',jsdata:'1444835675',jsmetrics:'1395261999',jsfx:'1395261999',jsfx2:'1395261999',jstmpl:'1443709758',jsui:'1447845393',jsui_mobile:'1423653241',jsitxt:'1426253035',jsdemo:'1395261999',jsvia:'1395261999',jsdebugwindow:'1426679882',itxtcss:'1446206988',madt_aolgravity:'1436182669',madt_aolgravitys2s:'1446653177',madt_aura2:'1438937687',madt_backfill:'1423653241',madt_backfillmultiimage:'1395261999',madt_become:'1423653241',madt_billboard:'1395261999',madt_bing:'1423653241',madt_bingrc:'1395261999',madt_businessdotcom:'1423653241',madt_dynamicadhesion:'1429716986',madt_dynamicadhesionbackfill:'1431099788',madt_dynamicadhesionshopping:'1411032350',madt_dynamicadhesionyahoo:'1411032350',madt_dynamicadhesionyell:'1423653241',madt_ebay:'1423653241',madt_expandableflash:'1395261999',madt_freeform:'1406731331',madt_freeformwithfooter:'1395261999',madt_generic:'1396525980',madt_genericflash:'1423653241',madt_genericvcs:'1423653241',madt_html5video:'1443973380',madt_lightbox:'1434555327',madt_lightboxmobile:'1423653241',madt_lightboxmosaic:'1446206969',madt_lightboxproduct:'1446206969',madt_livelookup:'1395261999',madt_powerlinks:'1422634934',madt_pricegrabber:'1423653241',madt_pricerunner:'1395261999',madt_pubmatic:'1424361716',madt_relatedcontent:'1423653241',madt_shopping:'1423653241',madt_valueclick:'1395261999',madt_websearchdrawer:'1395261999',madt_yahoo:'1395261999',madt_yell:'1429030038',madt_yelldisplay:'1446207324',madc_adrepeater:'1395261999',madc_advertfooter:'1423653241',madc_aura2header:'1423653241',madc_aura2pedestal:'1423653241',madc_backfilllist:'1395261999',madc_expandableunit:'1423653241',madc_persistent:'1423653241',madc_pricegrabberfooter:'1423653241',madc_progressbar:'1403620045',madc_progressbarfooter:'1395261999',madc_progressbarheader:'1395261999',madc_progressbartail:'1395261999',madc_relatedcontentlist:'1395261999',madc_searchbar:'1423653241',last:null};$iTXT.js.loader["$iTXT.core.Ajax"]=true;$iTXT.core.Ajax_Load=function(){var undefined;$iTXT.core.Ajax={maxURLLength:2000,postData:function(opts)
{if($iTXT.glob.params.get("echm")&$iTXT.debug.Util.ECH_TIME_XFER)
{if(undefined==$iTXT.metrics.Misc)
{$iTXT.metrics.Misc={};}
$iTXT.metrics.Misc.startXfer=(new Date()).getTime();}
var forceChunk=$iTXT.glob.params.getBool("force.chunk",true);if(forceChunk)
{}
if(($iTXT.core.Ajax.Mode.CHUNKING==$iTXT.core.Ajax.currentMode)||forceChunk)
{$iTXT.core.Ajax._chunkData(opts);}
else
{$iTXT.core.Ajax._corsData(opts);}
if(($iTXT.glob.params.get("echm")&$iTXT.debug.Util.ECH_TIME_XFER)&&undefined!=$iTXT.metrics.Misc&&undefined!=$iTXT.metrics.Misc.startXfer)
{$iTXT.metrics.Misc.stopXfer=(new Date()).getTime();}},_corsData:function(opts)
{var xhr=null;var url=opts.url;if($iTXT.core.Ajax.Mode.FULL_CORS==$iTXT.core.Ajax.currentMode)
{xhr=new XMLHttpRequest();xhr.open("POST",url,true);var contentType="text/plain";xhr.setRequestHeader("Content-type",contentType);xhr.setRequestHeader("Content-length",opts.data.length);}
else
{xhr=new XDomainRequest();xhr.open("POST",url);}
xhr.onload=function()
{if(opts.callback)
{opts.callback(xhr.responseText);}};xhr.send(opts.data);},_chunkData:function(opts)
{opts.chunkKey=$iTXT.js.chunkKey||0;var contextUrl=this._appendChunkKey(opts.contextUrl,opts.chunkKey);var chunkUrl=this._appendChunkKey(opts.chunkUrl,opts.chunkKey);var data=encodeURIComponent(opts.data)||"";var chunkSize=$iTXT.core.Ajax.maxURLLength-chunkUrl.length;var contextSize=Math.max(0,$iTXT.core.Ajax.maxURLLength-contextUrl.length);var chunksArr=[];var chunksCounter=0;while(data.length>contextSize){var dataChunk;if(data.length<chunkSize)
{dataChunk=data;data='';}
else if("%"==data.charAt(chunkSize-1))
{dataChunk=data.substring(0,chunkSize-1);data=data.substring(chunkSize-1);}
else if("%"==data.charAt(chunkSize-2))
{dataChunk=data.substring(0,chunkSize-2);data=data.substring(chunkSize-2);}
else
{dataChunk=data.substring(0,chunkSize);data=data.substring(chunkSize);}
chunksArr.push(this._createChunk(chunkUrl,chunksCounter,dataChunk));chunksCounter++;}
chunksArr.push(this._createChunk(contextUrl,chunksCounter,data));this._chunkSequential(opts,chunksArr);},_appendChunkKey:function(url,chunkKey){if(url.indexOf("?")==-1)
{url+="?";}
else
{url+="&";}
return url+"ck="+chunkKey;},_createChunk:function(url,chunksCounter,dataChunk)
{url+="&cn="+chunksCounter;if(dataChunk.length>0)
{url+="&cd="+dataChunk;}
return{loaded:false,number:chunksCounter,url:url,data:dataChunk};},_chunkSequential:function(opts,chunksArr)
{if(chunksArr&&chunksArr.length>0)
{var chunk=chunksArr.shift();$iTXT.core.Util.dropScript(chunk.url,function(response)
{opts.response=response;$iTXT.core.Ajax._chunkSequential(opts,chunksArr);});}
else
{if(opts.callback)
{opts.callback(opts.response);}}},_sendChunk:function(opts,chunk,chunksArr)
{$iTXT.core.Util.dropScript(chunk.url,function(response)
{chunk.loaded=true;$iTXT.core.Ajax._checkChunksLoaded(opts,chunksArr,response);});},_checkChunksLoaded:function(opts,chunksArr,response)
{for(var i in chunksArr)
{if(!chunksArr[i].loaded)
{return;}}
if(opts.callback)
{opts.callback(response);opts.callback=null;}},Mode:{FULL_CORS:1,IE8_CORS:2,CHUNKING:3},currentMode:null,setMode:function()
{try
{this.currentMode=this.Mode.CHUNKING;var xhr=new XMLHttpRequest();if("withCredentials"in xhr)
{$iTXT.core.Ajax.currentMode=this.Mode.FULL_CORS;}
else if(typeof XDomainRequest!="undefined")
{$iTXT.core.Ajax.currentMode=this.Mode.IE8_CORS;}
xhr=null;}
catch(e)
{}}};$iTXT.core.Ajax.setMode();};$iTXT.js.loader["$iTXT.core.Array"]=true;$iTXT.core.Array_Load=function(){var undefined;$iTXT.core.$A=function(arr){if(!arr)
{return null;}
if((arr.itxt&&arr.itxt.arrayExtended)||!VM._.isArray(arr))
{return arr;}
else
{arr=$iTXT.core.Util.extend(arr,$iTXT.core.Array);arr.itxt={};arr.itxt.arrayExtended=true;return arr;}};$iTXT.core.Array={itxtEach:function(f,src)
{src=src||this;if('function'==typeof f)
{for(var i=0,len=this.length;i<len;i++)
{if(f.apply(src,[this[i],i,len]))
{break;}}}
return this;},unpack:function(ar){if(ar&&ar.length&&ar.length===1&&VM._.isArray(ar[0])){return ar[0];}else{return ar;}}};};$iTXT.js.loader["$iTXT.core.Browser"]=true;$iTXT.core.Browser_Load=function(){var undefined;$iTXT.core.Browser={_browsers:[{s:navigator.userAgent,ss:"Chrome",id:"Chrome"},{s:navigator.userAgent,ss:"OmniWeb",vt:"OmniWeb/",id:"OmniWeb"},{s:navigator.vendor,ss:"Apple",id:"Safari",vt:"Version"},{prop:window.opera,id:"Opera"},{s:navigator.vendor,ss:"iCab",id:"iCab"},{s:navigator.vendor,ss:"KDE",id:"Konqueror"},{s:navigator.userAgent,ss:"Firefox",id:"Firefox"},{s:navigator.userAgent,ss:"Android",id:"Android",vt:"Android"},{s:navigator.vendor,ss:"Camino",id:"Camino"},{s:navigator.userAgent,ss:"Netscape",id:"Netscape"},{s:navigator.userAgent,ss:"MSIE",id:"Explorer",vt:"MSIE"},{s:navigator.userAgent,ss:"Gecko",id:"Mozilla",vt:"rv"},{s:navigator.userAgent,ss:"Mozilla",id:"Netscape",vt:"Mozilla"}],_platforms:[{s:navigator.platform,ss:"Win",id:"Window"},{s:navigator.platform,ss:"Mac",id:"Mac"},{s:navigator.platform,ss:"iPhone",id:"iOS/iPhone"},{s:navigator.platform,ss:"iPod",id:"iOS/iPod"},{s:navigator.platform,ss:"iPad",id:"iOS/iPad"},{s:navigator.platform,ss:"Android",id:"Android"},{s:navigator.userAgent,ss:"Android",id:"Android"},{s:navigator.platform,ss:"Linux",id:"Linux"}],useragent:"",version:0.0,performance:0,ie7orlessmode:0,quirksMode:0,_versionTemplate:"",featureSupport:{},pfx:['-o-','-moz-','-ms-','-webkit-','-khtml-'],bpfx:['Webkit','Moz','O','ms','Khtml'],init:function()
{this.useragent=this._getUserAgent(this._browsers)||"Unknown User Agent";this.platform=this._getPlatform(this._platforms);this.version=this._getVersion(navigator.userAgent)||this._getVersion(navigator.appVersion)||"Unkown Version";this.performance=this._performanceCheck();var ie7compat=(document.documentMode&&document.documentMode==7);var ie7orless=this.is("Explorer",7,2);this.ie7orlessmode=ie7compat||ie7orless;this.ie8CompatMode=ie7compat;this.quirksMode=this._quirksMode();this._detectFeatureSupport();},supportsFeature:function()
{arguments=$iTXT.core.Array.unpack(arguments);for(var i=0;i<arguments.length;i++)
{var feature=arguments[i];if(!this.featureSupport[feature]||false===this.featureSupport[feature])
{return false;}}
return true;},isSmartphoneOrTablet:function(force){return $iTXT.core.Browser.isMobile(force,["iOS/iPhone","iOS/iPad","iOS/iPod","Android"]);},isSmartphone:function(force){return $iTXT.core.Browser.isMobile(force,["iOS/iPhone","iOS/iPod","Android"])&&!$iTXT.core.Browser.isAndroidTablet();},isTablet:function(force){return $iTXT.core.Browser.isMobile(force,["iOS/iPad"])||$iTXT.core.Browser.isAndroidTablet();},isMobile:function(force,targets){var isPlatform=$iTXT.core.Browser.isPlatform(targets);var isForced=force||$iTXT.glob.params.getBool("tt.force.mobile",false);return(isForced||isPlatform);},isAndroidTablet:function(){if(navigator&&$iTXT.core.Browser.isPlatform(["Android"])){if(navigator.userAgent.indexOf("Mobile Safari")===-1){return true;}}
return false;},pick:function(obj){if(this.isSmartphone()&&typeof obj.phone!=='undefined')return obj.phone;if(this.isTablet()&&typeof obj.tablet!=='undefined')return obj.tablet;if(typeof obj.any!=='undefined')return obj.any;},isTargetedSmartphone:function(force,overrideTargets,overrideFeatures){var features=overrideFeatures||['cssgradients','cssborderradius'];var f=force||(this.isSmartphoneOrTablet(force,overrideTargets)&&this.supportsFeature(features));return f;},_detectFeatureSupport:function()
{var elmt=document.createElement("itxtelmt");this.style=elmt.style;var tests={};tests['cssgradients']=function()
{var s1='background-image:',s2='gradient(linear,left top,right bottom,from(black),to(white));',s3='linear-gradient(left top, black, white);';this._css((s1+this.pfx.join(s2+s1)+this.pfx.join(s3+s1)).slice(0,-s1.length));return this._hasCss(this.style.backgroundImage,'gradient');};tests['cssborderradius']=function()
{return this._testCssProperty("borderRadius");};tests['dommutationevents']=function()
{return!!(document.implementation.hasFeature('MutationEvents','2.0')||undefined!=window.MutationEvent);};tests['propertychangeevent']=function()
{return this._testEventSupport('propertychange',elmt);};tests['transforms']=function(){return this._testCssProperty('transform');};tests['transitions']=function(){return this._testCssProperty('transition');};for(var testName in tests)
{this.featureSupport[testName]=tests[testName].call(this);}},_testEventSupport:function(evt,elmt)
{evt='on'+evt;var s=(evt in elmt);if(!s)
{elmt.setAttribute(evt,'return;');s=!!('function'==typeof elmt[evt]);}
return s;},_css:function(t)
{this.style.cssText=t;},_testCssProperty:function(p)
{var ucp=p.charAt(0).toUpperCase()+p.substring(1);if(this.style[p]!==undefined)
{return true;}
for(var i=0;i<this.bpfx.length;i++)
{var pfx=this.bpfx[i];if(this.style[pfx+ucp]!==undefined)
{return true;}}
return false;},_hasCss:function(s,sb)
{return(''+s).indexOf(sb)!==-1;},_quirksMode:function()
{if(!this.is("Explorer"))
{return false;}
var mode=document.compatMode;if("BackCompat"==mode)
{return true;}
return false;},_getUserAgent:function(d)
{for(var i=0;i<d.length;i++)
{var str=d[i].s;var prop=d[i].prop;this._versionTemplate=d[i].vt||d[i].id;if(str)
{if(str.indexOf(d[i].ss)!=-1)
return d[i].id;}
else if(prop)
{return d[i].id;}}},_getPlatform:function(d)
{for(var i=0;i<d.length;i++)
{var str=d[i].s;if(str)
{if(str.indexOf(d[i].ss)!=-1)
return d[i].id;}}
return"Unknown Platform";},_getVersion:function(uas){var index=uas.indexOf(this._versionTemplate);return(index==-1)?undefined:parseFloat(uas.substring(index+this._versionTemplate.length+1));},is:function(ua,v,mode)
{var isVer=true;if(v)
{if(mode&&1==mode)
{isVer=(this.version>=v);}
else if(mode&&2==mode)
{isVer=(this.version<=v);}
else if(mode&&3==mode)
{isVer=(this.version>v);}
else if(mode&&4==mode)
{isVer=(this.version<v);}
else
{isVer=(v==this.version);}}
return(ua==this.useragent)&&isVer;},isPlatform:function(platform)
{if(VM._.isArray(platform))
{for(var i=0;i<platform.length;i++)
{if(this.platform===platform[i])
{return true;}}}
return(this.platform===platform);},_performanceCheck:function()
{var rperf=50;if("Explorer"==this.useragent)
{if(this.version<6)
{rperf=50;}
else if(this.version<7)
{rperf=60;}
else if(this.version<8)
{rperf=80;}
else if(this.version<9)
{rperf=80;}}
else if("Firefox"==this.useragent)
{if(this.version<2)
{rperf=60;}
else if(this.version<3)
{rperf=70;}
else if(this.version<4)
{rperf=85;}
else if(this.version<5)
{rperf=95;}}
else if("Firefox"==this.useragent)
{if(this.version<2)
{rperf=60;}
else if(this.version<3)
{rperf=70;}
else if(this.version<4)
{rperf=90;}}
else if("Chrome"==this.useragent)
{if(this.version<2)
{rperf=70;}
else if(this.version<3)
{rperf=80;}
else if(this.version<4)
{rperf=98;}}
return rperf;},isIE7OrLessMode:function()
{return this.ie7orlessmode;},isQuirksMode:function()
{return this.quirksMode;}};$iTXT.core.Browser.init();};$iTXT.js.loader["$iTXT.core.Builder"]=true;$iTXT.core.Builder_Load=function(){var pixelImage="//images.intellitxt.com/ast/tt/09/px.gif";$iTXT.core.Util.cacheImage(pixelImage);$iTXT.core.Builder={NODEMAP:{AREA:'map',CAPTION:'table',COL:'table',COLGROUP:'table',LEGEND:'fieldset',OPTGROUP:'select',OPTION:'select',PARAM:'object',TBODY:'table',TD:'tr',TFOOT:'table',TH:'table',THEAD:'table',TR:'table'},make:function(tagName,attrs,children,doc,allowUnsafe)
{return $iTXT.core.Builder.makeEl(tagName,attrs,children,{doc:doc,allowUnsafe:allowUnsafe});},makeEl:function(tagName,attrs,children,options){var documentContext=document;var allowUnsafe=!!options&&options.allowUnsafe;var rstClass="";if(options&&options.doc){documentContext=options.doc;}
var tag=tagName.toUpperCase();if(!options||!options.resets){rstClass="itxtrst itxtrst"+tag.toLowerCase();}
if(options&&options.resets){rstClass=options.resets;}
if(options&&options.noResets){rstClass="";}
if(options&&options.plusClass){rstClass+=" "+options.plusClass;}
var apngMode=false;var apngSrc="";if("APNG"==tagName)
{tag="IMG";if(window.ActiveXObject)
{apngMode=true;apngSrc=attrs.src;attrs.src=pixelImage;}}
var parentTagName=this.NODEMAP[tag]||'div';var parentTag=documentContext.createElement(parentTagName);try{parentTag.innerHTML="<"+tag+"></"+tag+">";}catch(e){}
var element=parentTag.firstChild||null;if(element&&(element.tagName.toUpperCase()!==tag))
element=element.getElementsByTagName(tag)[0];if(!element)element=documentContext.createElement(tag);if(!element)return;if(attrs)
{var attrString=this._attributes(attrs);if(attrString.length){try{parentTag.innerHTML="<"+tag+" "+attrString+"></"+tag+">";}
catch(err){}
element=parentTag.firstChild||null;if(!element){element=documentContext.createElement(tag);var classAdded=false;for(var attr in attrs)
{try
{element[attr]=attrs[attr];}
catch(ex2)
{element.setAttribute(attr,attrs[attr]);}}}
if(element.tagName.toUpperCase()!=tag)
element=parentTag.getElementsByTagName(tag)[0];}}
if(children)
{this._children(element,children,documentContext,allowUnsafe);}
if(apngMode)
{element.itxtChangeSrc=function(s)
{var pngImg=new Image();pngImg.onload=function()
{element.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+s+"',sizingMethod='image')";element.style.width=pngImg.width+"px";element.style.height=pngImg.height+"px";};pngImg.src=s;};element.itxtChangeSrc(apngSrc);}
else
{element.itxtChangeSrc=function(s)
{element.src=s;};}
if(""!==element.className)
{element.className=rstClass+" "+element.className;}
else
{element.className=rstClass;}
return $iTXT.core.$(element);},makeNoReset:function(tagName,attrs,children,replaceClass){var rsts=replaceClass||"";return $iTXT.core.Builder.makeEl(tagName,attrs,children,{resets:rsts});},_children:function(element,children,documentContext,allowUnsafe)
{for(var i=0;i<children.length;i++)
{var child=children[i];if('string'==typeof child||'number'==typeof child)
{var span=documentContext.createElement("SPAN");child=allowUnsafe?child:$iTXT.core.Util.safeDecode(child);span.innerHTML=child;var x=0;while(span.firstChild)
{element.appendChild(span.firstChild);x++;if(x>10000)
{break;}}}
else
{element.appendChild(children[i]);}}},_attributes:function(attributes)
{var attrs=[];for(var attribute in attributes)
{var an=(attribute=="className")?"class":attribute;attrs.push(an+'="'+attributes[attribute]+'"');}
return attrs.join(" ");}};};$iTXT.js.loader["$iTXT.core.Class"]=true;$iTXT.core.Class_Load=function(){var undefined;$iTXT.core.Class={create:function()
{var parent=null;var properties=arguments[0];if('function'==typeof properties)
{parent=properties;properties=arguments[1];}
properties["itxtClass"]=true;function _newClass()
{this.init.apply(this,arguments);}
if(null!=parent)
{var parentClass=function(){};parentClass.prototype=parent.prototype;_newClass.prototype=new parentClass;}
for(var p in properties)
{this._addProperty(_newClass,p,properties[p],parent);}
return _newClass;},_addProperty:function(_class,_property,_value,_parent)
{if('function'==typeof _value&&_parent&&undefined!=_parent.prototype[_property])
{var parentArguments=_parent.length;var _oldValue=_value;_value=function()
{var _instance=this;var _newArgs=$iTXT.core.Util.args(arguments);var _super=function()
{return _parent.prototype[_property].apply(_instance,arguments);};_newArgs.push(_super);return _oldValue.apply(this,_newArgs);};}
_class.prototype[_property]=_value;}};};$iTXT.js.loader["$iTXT.core.Dom"]=true;$iTXT.core.Dom_Load=function(){var undefined;var $itxtUtil=$iTXT.core.Util;$iTXT.fire=function()
{var elmt=$iTXT.core.$(document);elmt.itxtFire.apply(elmt,$iTXT.core.Util.args(arguments));};$iTXT.subscribe=function()
{var elmt=$iTXT.core.$(document);elmt.itxtSubscribe.apply(elmt,$iTXT.core.Util.args(arguments));};$iTXT.core.$=function(elmt,dontExt,documentContext)
{documentContext=documentContext||document;if('string'==typeof elmt)
{elmt=documentContext.getElementById(elmt);}
if(!elmt)
return null;if(dontExt||(elmt.itxt&&elmt.itxt.domExtended))
{return elmt;}
else
{elmt=$itxtUtil.extend(elmt,$iTXT.core.Dom);elmt.itxt={};elmt.itxt.domExtended=true;return elmt;}};$iTXT.core.$X=function(elmt,documentContext)
{documentContext=documentContext||document;if('string'==typeof elmt)
{elmt=documentContext.getElementById(elmt);}
elmt.itxt=undefined;for(var prop in $iTXT.core.Dom)
{elmt[prop]=undefined;}
return elmt;};$iTXT.core.Dom={iTXTEvents:{},itxtFire:function(type,data)
{$iTXT.core.Event.fire(this,type,data);return this;},itxtSubscribe:function(type,handler,disposeArray)
{var removeFunc=$iTXT.core.Event.subscribe(this,type,handler);if(VM._.isArray(disposeArray))
{disposeArray.push(removeFunc);}
return this;},itxtBatchSubscribe:function(events,disposeArray)
{if(VM._.isArray(events))
{for(var i=0;i<events.length;i++)
{var pair=events[i];if(pair.length==2)
{var type=pair[0];var handler=pair[1];this.itxtSubscribe(type,handler,disposeArray);}}}
return this;},router:function(scope){return function(evts){var i;if(VM._.isArray(evts)){for(i=0;i<evts.length;i++){evts[i]=[evts[i][0],$iTXT.core.Event.bind(scope,scope[evts[i][1]])];}}
return evts;}},itxtUnSubscribe:function(type,handler)
{$iTXT.core.Event.unsubscribe(this,type,handler);return this;},itxtAddClass:function(addClass,removeClass)
{if(this.className)
{var cNs=this.className.split(' ');var newCNs=[];for(var i=0;i<cNs.length;i++)
{var cn=cNs[i];if(cn!=removeClass&&cn!=addClass)
{newCNs.push(cn);}}
newCNs.push(addClass);this.className=newCNs.join(' ');}
else
{this.className=addClass;}
return this;},itxtRemoveClass:function(removeClass)
{if(this.className)
{var cNs=this.className.split(' ');var newCNs=[];for(var i=0;i<cNs.length;i++)
{var cn=cNs[i];if(cn!=removeClass)
{newCNs.push(cn);}}
this.className=newCNs.join(' ');}
return this;},itxtSetStyle:function(styles,removeStyles)
{if(removeStyles)
{for(var rs in removeStyles)
{this.style[rs]="";}}
if('string'==typeof styles)
{return this.style.cssText+=";"+styles;}
for(var s in styles)
{try
{this.style[s]=styles[s];}
catch(e)
{}}
return this;},itxtSetAttribute:function(atts)
{for(var attribute in atts)
{this[attribute]=atts[attribute];}
return this;},itxtHide:function()
{if(this.style.display!="none")
{this.itxt.display=this.style.display||"";this.style.display="none";}
this.style.visibility="hidden";return this;},itxtShow:function()
{this.style.display=this.itxt.display||"";this.style.visibility="visible";return this;},itxtOpacity:function(o)
{if(window.ActiveXObject)
{this.style['filter']="alpha(opacity="+Math.round(100*o)+");";}
else
{this.style.mozOpacity=o;this.style.opacity=o;}
return this;},itxtAppendChildren:function(children)
{var cl=children.length;for(var i=0;i<cl;i++)
{this.itxtAppendChild(children[i]);}
return this;},itxtAppendChild:function(child)
{if('string'==typeof child)
{this.appendChild(document.createTextNode(child));}
else if(child.nodeType&&$itxtUtil.ELEMENT_NODE==child.nodeType)
{this.appendChild(child);}},itxtClear:function()
{while(this.firstChild)
{this.removeChild(this.firstChild);}},itxtRemoveNode:function()
{try
{if(this.offsetParent)
{this.offsetParent.removeChild(this);}}
catch(e)
{}},itxtTotalOffset:function()
{var element=this;var t=0;var l=0;do
{if((element==document.body)&&("relative"!=element.style.position))
{l+=element.offsetLeft;t+=element.offsetTop;}
else if(element!=document.body)
{l+=element.offsetLeft;t+=element.offsetTop;}
element=element.offsetParent;}
while(element);l=parseInt(l,10);t=parseInt(t,10);var retArr=[l,t];retArr.left=l;retArr.top=t;return retArr;},itxtBounds:function()
{var nOff=this.itxtTotalOffset();var b={left:nOff.left,top:nOff.top,width:this.offsetWidth,height:this.offsetHeight};return b;},itxtGetMargin:function()
{var ro={};ro.left=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'margin-left','marginLeft'),0);ro.top=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'margin-top','marginTop'),0);ro.right=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'margin-right','marginRight'),0);ro.bottom=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'margin-bottom','marginBottom'),0);return ro;},itxtGetPadding:function()
{var ro={};ro.left=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'padding-left','paddingLeft'),0);ro.top=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'padding-top','paddingTop'),0);ro.right=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'padding-right','paddingRight'),0);ro.bottom=$iTXT.core.Util.parseInt($iTXT.core.Util.getStyle(this,'padding-bottom','paddingBottom'),0);return ro;},itxtContains:(function(){if(document.body.contains){return function(node){return this.contains(node);};}
else{return function(node){return!!(this.compareDocumentPosition(node)&16);};}})()};};$iTXT.js.loader["$iTXT.core.Event"]=true;$iTXT.core.Event_Load=function(){var undefined;$iTXT.core.Event={bind:function(source,func)
{return function()
{source.itxtThis=this;return func.apply(source,arguments);};},nsUID:0,subscribe:function(elmt,type,handler)
{elmt=$iTXT.core.$(elmt);var eventName=type;var eventUID=type;if(type.indexOf('.')!=-1)
{var splt=type.split('.');eventName=splt.pop();}
else
{eventUID="evt"+this.nsUID+++"."+eventName;}
var custom=eventName.charAt(0)=='$';if(custom)
{this._addEvt(elmt,eventName,eventUID,handler);}
else
{var intHandler=function(e)
{var newE=e||event;try
{if(!newE.pageX&&!newE.pageY)
{newE.pageX=newE.clientX-document.body.scrollLeft;newE.pageY=newE.clientY-document.body.scrollTop;}}catch(e){}
if(!newE.target&&newE.srcElement)
{newE.target=newE.srcElement;}
try
{if(3==newE.target.nodeType)
{newE.target=newE.target.parentNode;}}catch(exc){}
newE.stop=function()
{newE.cancelBubble=true;if(newE.stopPropagation)
{newE.stopPropagation();}};if(null!=handler)
{var rv=handler.apply(elmt,[newE]);if(false===rv)
{if(e.preventDefault)
{e.preventDefault();}
e.returnValue=false;}
return rv;}};if(elmt.addEventListener)
{elmt.addEventListener(eventName,intHandler,false);}
else if(elmt.attachEvent)
{elmt.attachEvent("on"+eventName,intHandler);}}
this._addEvt(elmt,eventName,eventUID,handler,intHandler);var t=this;var remFunc=function()
{t.unsubscribe(elmt,eventUID,handler);};return remFunc;},_addEvt:function(elmt,eventName,eventUID,handler,intHandler)
{var handlers=elmt.iTXTEvents[eventName]||{};handlers[eventUID]={handler:handler,intHandler:intHandler};elmt.iTXTEvents[eventName]=handlers;},_removeEvt:function(elmt,eventName,eventUID,eventHandler)
{var handlers=elmt.iTXTEvents[eventName]||{};var newHandlers={};for(var handler in handlers)
{if(handler!=eventUID&&handlers[handler].handler!=eventHandler)
{newHandlers[handler]=handlers[handler];}}
elmt.iTXTEvents[eventName]=newHandlers;},_getInternalHandler:function(elmt,eventName,eventUID,eventHandler)
{var handlers=elmt.iTXTEvents[eventName]||{};for(var handler in handlers)
{if(handlers[handler].handler==eventHandler)
{return handlers[handler].intHandler;}}
return null;},unsubscribe:function(elmt,eventUID,handler)
{elmt=$iTXT.core.$(elmt);var eventName=eventUID;if(eventUID.indexOf('.')!=-1)
{var splt=eventUID.split('.');eventName=splt.pop();}
var custom=eventName.charAt(0)=='$';if(!custom)
{var intH=this._getInternalHandler(elmt,eventName,eventUID,handler);if(null!=intH)
{if(elmt.removeEventListener)
elmt.removeEventListener(eventName,intH,false);else if(elmt.detachEvent)
elmt.detachEvent("on"+eventName,intH);}}
this._removeEvt(elmt,eventName,eventUID,handler);},fire:function(elmt,eventName,data)
{if($iTXT.debug.Util.isLoggingOn())
{}
elmt=$iTXT.core.$(elmt);var custom=eventName.charAt(0)=='$';var handlers=elmt.iTXTEvents[eventName]||{};var event={data:data||{}};for(var handler in handlers)
{if('function'==typeof handlers[handler].handler)
{handlers[handler].handler.apply(elmt,[event]);}}},preventDefault:function(e)
{if(e&&e.preventDefault)e.preventDefault();else if(window.event)window.event.returnValue=false;},stop:function(e)
{if(e&&e.stopPropagation)e.stopPropagation();else if(window.event)window.event.cancelBubble=true;}};var eventSplitter=/\s+/;$iTXT.on=function(events,callback,context){var calls,event,list;if(!callback)return this;events=events.split(eventSplitter);calls=this._callbacks||(this._callbacks={});VM._.each(events,function(event){list=calls[event]||(calls[event]=[]);list.push(callback,context);});return this;};$iTXT.off=function(events,callback,context){var event,calls,list,i;if(!(calls=this._callbacks))return this;if(!(events||callback||context)){delete this._callbacks;return this;}
events=events?events.split(eventSplitter):$iTXT.core.Util.objKeys(calls);VM._.each(events,function(event){if(!(list=calls[event])||!(callback||context)){delete calls[event];return;}
for(i=list.length-2;i>=0;i-=2){if(!(callback&&list[i]!==callback||context&&list[i+1]!==context)){list.splice(i,2);}}});return this;};$iTXT.trigger=function(events){var event,calls,list,i,length,args,all,rest;if(!(calls=this._callbacks))return this;rest=[];events=events.split(eventSplitter);for(i=1,length=arguments.length;i<length;i++){rest[i-1]=arguments[i];}
while(event=events.shift()){if(all=calls.all)all=all.slice();if(list=calls[event])list=list.slice();if(list){for(i=0,length=list.length;i<length;i+=2){list[i].apply(list[i+1]||this,rest);}}
if(all){args=[event].concat(rest);for(i=0,length=all.length;i<length;i+=2){all[i].apply(all[i+1]||this,args);}}}
return this;};$iTXT.addEvent=window.addEventListener?function(el,event,callback){el.addEventListener(event,callback,false);}:function(el,event,callback){el.attachEvent('on'+event,callback);};};$iTXT.js.loader["$iTXT.core.Flash"]=true;$iTXT.core.Flash_Load=function(){var undefined;$iTXT.core.Flash={init:function()
{this.version=this.getFlashVersion();},supports:function(maj,min,rev)
{maj=maj||6;min=min||0;rev=rev||0;if(this.version.major>=maj)
{if(this.version.minor>=min)
{if(this.version.revision>=rev)
{return true;}}}
return false;},getFlashVersion:function()
{var versionDims=[0,0,0];if(navigator.plugins&&navigator.mimeTypes.length)
{var fp=navigator.plugins["Shockwave Flash"];if(fp&&fp.description)
{versionDims=fp.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split('.');}}
else
{try
{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}
catch(e)
{try
{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");versionDims=[6,0,21];axo.AllowScriptAccess="always";}
catch(e)
{if(0==versionDims[0])
{try
{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}
else if(6==versionDims[0])
{axo=null;}}}
if(null!=axo)
{versionDims=axo.GetVariable("$version").split(" ")[1].split(",");}}
var rV={major:versionDims[0],minor:versionDims[1],revision:versionDims[2]};return rV;}};$iTXT.core.Flash.init();};$iTXT.js.loader["$iTXT.core.Math"]=true;$iTXT.core.Math_Load=function(){var undefined;var $itxtUtil=$iTXT.core.Util;$iTXT.core.Math={intersects:function(r1,r2)
{var l=(r1.left>r2.left)?r1.left:r2.left;var t=(r1.top>r2.top)?r1.top:r2.top;var r=((r1.left+r1.width)<(r2.left+r2.width))?(r1.left+r1.width):(r2.left+r2.width);var b=((r1.top+r1.height)<(r2.top+r2.height))?(r1.top+r1.height):(r2.top+r2.height);return(l<r&&t<b);},intersectsPercentage:function(r1,r2)
{var l=(r1.left>r2.left)?r1.left:r2.left;var t=(r1.top>r2.top)?r1.top:r2.top;var r=((r1.left+r1.width)<(r2.left+r2.width))?(r1.left+r1.width):(r2.left+r2.width);var b=((r1.top+r1.height)<(r2.top+r2.height))?(r1.top+r1.height):(r2.top+r2.height);if(l<r&&t<b)
{var w=r-l;var h=b-t;var area=w*h;var r1Area=r1.width*r1.height;return area/r1Area;}
return 0;},pointInside:function(rect,point,fuzz){var fuzziness=fuzz||1;return rect.l-fuzziness<point.x&&rect.l+rect.w+fuzziness>point.x&&rect.t-fuzziness<point.y&&rect.t+rect.h+fuzziness>point.y;},arrayMax:function(inA,rnd)
{if(!VM._.isArray(inA)||inA.length==0)
{return null;}
var max=0;for(var i=0;i<inA.length;i++)
{if(!isNaN(inA[i]))
{if(0==max||inA[i]>max)
{max=inA[i];}}}
if(rnd)
{return Math.round(max);}
else
{return max;}},arrayMin:function(inA,rnd)
{if(!VM._.isArray(inA)||inA.length==0)
{return null;}
var min=0;for(var i=0;i<inA.length;i++)
{if(!isNaN(inA[i]))
{if(0==min||inA[i]<min)
{min=inA[i];}}}
if(rnd)
{return Math.round(min);}
else
{return min;}},arrayMean:function(inA,rnd)
{if(!VM._.isArray(inA)||inA.length==0)
{return null;}
var tot=0,len=0;for(var i=0;i<inA.length;i++)
{if(!isNaN(inA[i]))
{tot+=inA[i];len++;}}
var mean=tot/len;if(rnd)
{return Math.round(mean);}
else
{return mean;}},arrayMedian:function(inA,rnd)
{if(!VM._.isArray(inA)||inA.length==0)
{return null;}
inA.sort(function(a,b){return(a-b);});var middle=Math.round(inA.length/2);var median=inA[middle];if(rnd)
{return Math.round(median);}
else
{return median;}}};};$iTXT.js.loader["$iTXT.core.Regex"]=true;$iTXT.core.Regex_Load=function()
{var undefined;$iTXT.core.Regex={hexColor:new RegExp("^([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$"),tagSrc:new RegExp("\\b(src)=\"([^\"]*)\"","i"),tagWidth:new RegExp("\\b(width)=\"([^\"]*)\"","i"),tagHeight:new RegExp("\\b(height)=\"([^\"]*)\"","i"),stripTags:new RegExp("(<([^>]+)>)","gi"),stripNotImgBrScriptTags:new RegExp("(<(?!img|br|script|/script)([^>]+)>)","gi"),stripNotImgBrStrongItalicScriptTags:new RegExp("(<(?!strong|em|b|i|img|br|script|/script)([^>]+)>)","gi"),htmlAnyOpenOrCloseTag:new RegExp("<[^>]*/?>","g"),htmlEntity:new RegExp("&[^\s].*?;","g")};};$iTXT.js.loader["$iTXT.core.Util"]=true;$iTXT.core.Util_Load=function()
{var undefined;$iTXT.core.Util={init:function()
{},httplog:function(msg,data){var log;if(!VM._.isString(msg)){return;}
log=VM._(VM._.isObject(data)?data:{}).chain().pairs().map(function(p){return p[0]+'='+p[1];}).value().join('&');this.dropImage('http://debug/?message='+msg+(log?'&':'')+log);},ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,callbackID:0,args:function(args)
{var rA=[];for(var i=0,len=args.length;i<len;i++)
{rA[i]=args[i];}
return rA;},extend:function(dest,src)
{for(var p in src)
{if(undefined!=src[p])
{try
{dest[p]=src[p];}
catch(e)
{}}}
return dest;},isObject:function(o)
{return!VM._.isArray(o)&&!VM._.isFunction(o)&&VM._.isObject(o)&&!o.itxtClass;},isClass:function(o)
{return VM._.isObject(o)&&o.itxtClass;},isURL:function(s,i)
{if('string'!=typeof s)
{return false;}
else if(i&&(s.match($iTXT.cnst.DNS_INTELLITXT_SUFFIX)||s.match($iTXT.cnst.DNS_SMARTAD_MARKER)))
{return false;}
else
{var m1=s.match("^(\/|javascript\:)");if(null!=m1)
{return true;}
var m2=s.match("^(https?|mailto|ftp|wais|file|gopher|telnet)://");return(null==m2)?false:true;}},cleanString:function(s)
{if('string'!=typeof s)
{return s;}
else
{return s.replace(/(\t|[\n\r])/g,' ').replace(/\s{2,}/g,' ').replace(/(^\s+|\s+$)/g,'');}},getEmbeddedURL:function(src)
{if(null==src)
{return src;}
var url='';var urlMatch=src.match(/=\"(http[^\"]+)\"/);if(null==urlMatch||!urlMatch[1])
{return src;}
else
{url=urlMatch[1];}
return url;},appendToURL:function(url,param,before)
{{if(null==url||'string'!=typeof url||null==param||'string'!=typeof param||''==param)
{return url;}
if(null!=before&&'string'==typeof before)
{var target=url.match(new RegExp("[\?|\&]"+before+'='));if(null!=target&&'string'==typeof target[0]&&target[0].length==(before.length+2))
{var rep=target[0].slice(0,1)+param+'&'+target[0].slice(1);return url.replace(target,rep);}}
return url+((url.indexOf('?')>=0)?'&':'?')+param;}},dropImage:function(src,cb,eh)
{var img=$iTXT.core.Builder.make("IMG",{src:src,style:"width:0px;height:0px;display:none;visibility:hidden;"});if(cb&&'function'==typeof cb)
{img.itxtSubscribe("load",cb);}
if(eh&&'function'==typeof eh)
{img.itxtSubscribe("error",eh);}
var c=$iTXT.js.exclCont();c.insertBefore(img,c.firstChild);},dropIframe:function(src,cb,eh)
{src=this.getEmbeddedURL(src);var iframe=$iTXT.core.Builder.make("IFRAME",{src:src,style:"width:0px;height:0px;display:none;visibility:hidden;"});if(cb&&'function'==typeof cb)
{iframe.itxtSubscribe("load",cb);}
if(eh&&'function'==typeof eh)
{iframe.itxtSubscribe("error",eh);}
var c=$iTXT.js.exclCont();c.insertBefore(iframe,c.firstChild);},dropScriptAtLocation:function(url,dropZone){var typeofurl=Object.prototype.toString.call(url),script,i;dropZone=document.querySelector(dropZone)||document.body;if(typeofurl!=='[object String]'&&typeofurl!=='[object Array]'){return false;}
if(typeofurl==='[object String]'){url=[url];}
for(i=0;i<url.length;i++){script=document.createElement('script');script.src=url[i];dropZone.appendChild(script);}
return true;},dropScript:function(src,cb,eh,direct)
{if('string'!=typeof src||(!src.match(/^(https?:)?\/\//))){return;}
try
{var newS=document.createElement('script');var c=$iTXT.js.exclCont();var removeFunc=function()
{c.removeChild(newS);};if('function'==typeof cb)
{if(direct){if(cb&&'function'==typeof cb)
{if(newS.onreadystatechange!==undefined)
{newS.onreadystatechange=function(){if('loaded'==newS.readyState||'complete'==newS.readyState)
{newS.onreadystatechange=null;cb();};};}else{$iTXT.core.$(newS).itxtSubscribe("load",cb);}}}else{var cbFunc=this.callbackFunction(cb,newS,removeFunc);if(src.indexOf('?')!=-1)
{src+="&jscallback="+cbFunc;}
else
{src+="?jscallback="+cbFunc;}}}
if(eh&&'function'==typeof eh)
{$iTXT.core.$(newS).itxtSubscribe("error",eh);if(newS.onreadystatechange!==undefined)
{newS.onreadystatechange=function(){if(newS.readyState=='loaded')
{eh();};};};}
newS.src=src;newS.type='text/javascript';c.insertBefore(newS,c.firstChild);}
catch(e)
{}},callbackFunction:function(f,src,removeFunc)
{var cbName="callback"+(this.callbackID++);$iTXT.js[cbName]=function()
{if(f)
{var args=$iTXT.core.Util.args(arguments);args[args.length]=removeFunc;if(src)
{f.apply(src,args);}
else
{f(args);}}};return"$iTXT.js."+cbName;},getQueryParams:function(srcUrl)
{if(srcUrl.indexOf('?')==-1)
{return{};}
var params={};var qs=srcUrl.substring(srcUrl.indexOf('?')+1);var pairs=qs.split('&');for(var i=0,len=pairs.length;i<len;i++)
{var keyPair=pairs[i].split('=',2);if(keyPair.length==2)
{params[keyPair[0]]=unescape(keyPair[1]);}}
return params;},getWindowSize:function(win,doc)
{win=win||window;doc=doc||document;var vW;var vH;if(typeof win.innerWidth!='undefined')
{vW=win.innerWidth;vH=win.innerHeight;}
else if(typeof doc.documentElement!='undefined'&&typeof doc.documentElement.clientWidth!='undefined'&&doc.documentElement.clientWidth!=0)
{vW=doc.documentElement.clientWidth;vH=doc.documentElement.clientHeight;}
else
{vW=doc.getElementsByTagName('body')[0].clientWidth;vH=doc.getElementsByTagName('body')[0].clientHeight;}
var rObj=[vW,vH];rObj.width=vW;rObj.height=vH;return rObj;},getPageSize:function()
{var doc=document,h;h=Math.max(Math.max(doc.body.scrollHeight,doc.documentElement.scrollHeight),Math.max(doc.body.offsetHeight,doc.documentElement.offsetHeight),Math.max(doc.body.clientHeight,doc.documentElement.clientHeight));return{height:h};},isElementVisible:function(el,bounds)
{var rect=el.getBoundingClientRect(),winSize=this.getWindowSize();var l_edge=0,r_edge=winSize.width,t_edge=0,b_edge=winSize.height;if(bounds){l_edge=bounds.left||0;r_edge=bounds.right||r_edge;t_edge=bounds.top||0;b_edge=bounds.bottom||b_edge;}
return rect.top>=t_edge&&rect.left>=l_edge&&rect.bottom<=b_edge&&rect.right<=r_edge;},getVisiblePercent:function(el)
{var rect=el.getBoundingClientRect(),winSize=this.getWindowSize();var intersectionArea=Math.max(0,Math.min(rect.right,winSize.width)-Math.max(rect.left,0))*Math.max(0,Math.min(rect.bottom,winSize.height)-Math.max(rect.top,0));var rectArea=Math.max(0,rect.right-rect.left)*Math.max(0,rect.bottom-rect.top);return 100*(intersectionArea/rectArea);},getElementPosition:function(el)
{var box=el.getBoundingClientRect();var body=document.body;var docElem=document.documentElement;var scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop;var scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft;var clientTop=docElem.clientTop||body.clientTop||0;var clientLeft=docElem.clientLeft||body.clientLeft||0;var top=box.top+scrollTop-clientTop;var left=box.left+scrollLeft-clientLeft;return{top:Math.round(top),left:Math.round(left)};},getPosition:function(el){var pos=$iTXT.core.Util.getPositionRecursively(el);if(!$iTXT.core.Browser.is("Explorer")){var p_top=parseInt($iTXT.core.Util.getStyle(document.documentElement,'margin-top'));var p_left=parseInt($iTXT.core.Util.getStyle(document.documentElement,'margin-left'));pos.top=pos.top+(isNaN(p_top)?0:p_top);pos.left=pos.left+(isNaN(p_left)?0:p_left);}
return pos;},getCurrentPosition:function(el){var bodyWidth=document.body.style.width||$iTXT.core.Util.getStyle(document.body,"width")||"";var rect=el.getBoundingClientRect();var pos={top:0,left:0};var offset={};if(window.pageXOffset!==undefined){offset.top=window.pageYOffset;offset.left=window.pageXOffset+document.body.getBoundingClientRect().left;}else{offset.top=document.documentElement.scrollTop;offset.left=document.documentElement.scrollLeft;}
if(bodyWidth){offset.left=0;}
pos.left=Math.floor(rect.left)-offset.left;pos.top=Math.floor(rect.bottom)+offset.top-el.offsetHeight;return pos;},getPositionRecursively:function(el){var pos={top:0,left:0};var orig_el=el;while(el){if(window.getComputedStyle&&getComputedStyle(el)["position"]=="fixed"){return orig_el.getBoundingClientRect();}
pos.top+=el.offsetTop;pos.left+=el.offsetLeft
el=el.offsetParent;}
return pos;},getPageScroll:function()
{var scrOfX=0,scrOfY=0;if(typeof(window.pageYOffset)=='number'){scrOfY=window.pageYOffset;scrOfX=window.pageXOffset;}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){scrOfY=document.body.scrollTop;scrOfX=document.body.scrollLeft;}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){scrOfY=document.documentElement.scrollTop;scrOfX=document.documentElement.scrollLeft;}
var reObj=[scrOfX,scrOfY];reObj.x=scrOfX;reObj.y=scrOfY;return reObj;},inArray:function(arr,val)
{if(VM._.isArray(arr))
{var i=arr.length;while(i--)
{if(this.fuzzyMatch(val,arr[i]))
{return true;}}}
return false;},objValues:function(obj)
{var rA=[];for(var key in obj)
{if(obj[key]&&'function'!=typeof obj[key])
{rA[rA.length]=obj[key];}}
return rA;},objKeys:function(obj)
{var rA=[];for(var key in obj)
{if(obj[key]&&'function'!=typeof obj[key])
{rA[rA.length]=key;}}
return rA;},objCount:function(obj)
{return this.objValues(obj).length;},cacheImage:function(src)
{var im=new Image();im.src=src;},cacheImages:function(imgs)
{var i=imgs.length;while(i--)
{this.cacheImage(imgs[i]);}},flattenJSON:function(object)
{return _iter(object,0);function _iter(obj,depth)
{var out='';if('object'==typeof obj&&!obj.nodeType)
{for(var elem in obj)
{var val=obj[elem];if('object'==typeof val&&!obj.nodeType)
{out+=elem+_iter(val,(depth+1));}
else if('function'!=typeof val)
{out+=elem+val;}}}
else if('function'!=typeof obj)
{out+=obj;}
return out;}},serialiseJSON:function(object,flds,fi)
{return _iter(object,0,flds);function _iter(obj,depth,flds)
{var out='';if('function'!=typeof obj&&($iTXT.core.Util.isObject(obj)||VM._.isArray(obj)||$iTXT.core.Util.isClass(obj))&&!obj.nodeType)
{var c=0;for(var elem in obj)
{var val=obj[elem];if(null!=val&&'function'!=typeof val&&'itxt'!=elem.substr(0,4)&&'$'!=elem.substr(0,1)&&(undefined==flds||($iTXT.core.Util.isObject(flds)&&('itxtAllowed'==flds[elem]||!isNaN(elem)))))
{var pass='';var name='';var next=null;if(isNaN(elem)||fi)
{name+=elem+':';}
if(VM._.isArray(val))
{next=_iter(val,(depth+1),flds);if(''!=next)
{pass+=name+'['+next+']';}}
else if($iTXT.core.Util.isObject(val))
{next=_iter(val,(depth+1),flds);if(''!=next)
{pass+=name+'{'+next+'}';}}
else if(!isNaN(val)&&'string'!=typeof val)
{pass+=name+val;}
else if('string'==typeof val)
{var delim=(val.match(/^(\{|\[\{).*(\}\]|\})$/)||name=='')?'':'"';pass+=name+delim+val+delim;}
if(c>0&&''!=pass&&''!=out)
{pass=','+pass;}
c++;out+=pass;}}
if(0==depth)
{out='{'+out+'}';}}
return out;}},fuzzyMatch:function(s1,s2)
{if('string'!=typeof s1||'string'!=typeof s2)
{return false;}
if('*'==s1)
{return true;}
if(s1.indexOf('*')<0)
{return(s1.toLowerCase()==s2.toLowerCase());}
if('*'==s1.substr(0,1)&&'*'==s1.substr(-1,1))
{return!!(s2.indexOf(s1.replace(/\*/g,''))>=0);}
var m=new RegExp(((s1.match(/\*$/,''))?'^':'')+(s1.replace(/\*/g,''))+((s1.match(/^\*/,''))?'$':''));return(null!=s2.match(m));},formatJSONString:function(s,h)
{var a=s.split("");var o="";var d=0;var nl=(h)?"<br/>":"\n";var tb=(h)?"&nbsp;&nbsp;&nbsp;&nbsp;":"\t";var isQu=false;var qCh="";var hOn=(h)?'<span style="color:red">':"";var hOf=(h)?'</span>':"";var mOpe=/(\{|\[)/;var mClo=/(\}|\])/;var mQuo=/(\"|\')/;var mEsc=/\\/;var mPro=/\,/;function tab(dpt)
{var tO=nl;var i=dpt;while(i--)
{tO+=tb;}
return tO;}
for(var i=0,len=a.length;i<len;i++)
{var ch=a[i];var pc=a[i-1]||'';var nc=a[i+1]||'';if(ch.match(mQuo)&&!pc.match(mEsc))
{if((isQu&&ch==qCh)||!isQu)
{o+=hOn+ch+hOf;isQu=!isQu;qCh=(isQu)?ch:"";}
else
{if(isQu)
{o+=hOn+ch+hOf;}}}
else if(isQu)
{o+=hOn+ch+hOf;}
else if(ch.match(mOpe))
{o+=tab(d);o+=ch;d++;if(ch.match(/{/))
{o+=tab(d);}}
else if(ch.match(mClo))
{d--;o+=tab(d);o+=ch;}
else if(ch.match(mPro)&&!nc.match(mOpe))
{o+=ch;o+=tab(d);}
else
{o+=ch;}}
return o;},genUUID:function()
{return(s4()+s4()+"-"+s4()+"-4"+s4().substring(1,4)+"-"+sp()+"-"+s4()+s4()+s4());function s4()
{return(((1+Math.random())*0x10000)|0).toString(16).substring(1);}
function sp()
{var r4='';do
{r4=s4();}
while("8"!=r4.substring(0,1)&&"9"!=r4.substring(0,1)&&"a"!=r4.substring(0,1)&&"b"!=r4.substring(0,1));return r4;}},getNodeText:function(n)
{try
{if(n)
{return n.nodeValue;}}
catch(e)
{}
return"";},cloneObject:function(src)
{var rO={};for(var p in src)
{if(undefined!=src[p])
{if(this.isObject(src[p]))
{rO[p]=this.cloneObject(src[p]);}
else
{rO[p]=src[p];}}}
return rO;},decodeQueryString:function(s,qSep,vSep)
{var rob={};if(!qSep)qSep='&';if(!vSep)vSep='=';var comps=s.split(qSep);var i=comps.length;while(i--)
{var kvP=comps[i];var kvPComps=kvP.split(vSep);if(kvPComps.length==2)
{rob[kvPComps[0]]=kvPComps[1];}
else if(kvPComps.length>2)
{var key=kvPComps.shift();var keyValue=kvPComps.join(vSep);rob[key]=keyValue;}}
return rob;},buildQueryString:function(o,qSep,vSep)
{var str=[];if(!qSep)qSep='&';if(!vSep)vSep='=';for(var k in o){if(o.hasOwnProperty(k)){str.push(k+vSep+o[k]);}}
return str.join(qSep);},appendQueryString:function(url,extra){var qs;if(url.indexOf('?')==-1){qs={};}else{qs=url.substr(url.indexOf('?')+1);qs=$iTXT.core.Util.decodeQueryString(qs);url=url.substr(0,url.indexOf('?'));}
if(VM._.isString(extra)){extra=$iTXT.core.Util.decodeQueryString(extra);}
qs=VM._.defaults(qs,extra);return url+'?'+$iTXT.core.Util.buildQueryString(qs);},without:function(array,element)
{for(var i=0,len=array.length;i<len;i++)
{if(array[i]==element)
{array.splice(i,1);return array;}}},parseColorArray:function(s,n,c)
{if(null==s||""==s)
return[];c=c||',';var colors=s.split(c);if(colors.length<n)
{var lc=colors[colors.length-1];while(colors.length<n)
{colors[colors.length]=lc;}}
return colors;},summarize:function(s,len,br,brLength)
{if(s.match($iTXT.core.Regex.htmlEntity))
{var compS=s.replace($iTXT.core.Regex.htmlEntity,'~');if(compS&&s.length>compS.length)
{len=parseInt(len)+parseInt(s.length-compS.length);}}
br=br||"...";brLength=brLength||br.length;var rs=s;if(rs&&rs.length>len)
{rs=s.substring(0,len-brLength);var fsp=false;var spos=rs.length-1;while(!fsp&&spos>0)
{if(" "!=rs.charAt(spos))
{spos--;}
else
{fsp=true;}}
if(fsp)
{rs=s.substring(0,spos);}
rs+=br;}
return rs;},htmlTextLength:function(s)
{s=s.replace($iTXT.core.Regex.htmlEntity,'~');s=s.replace($iTXT.core.Regex.htmlAnyOpenOrCloseTag,'');return s.length;},strRepeat:function(c,n)
{var rs="";while(n--)
{rs+=c;}
return rs;},isoTs:function()
{var digitString=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60"];var rs="";var d=new Date();rs+=d.getUTCFullYear();rs+=digitString[d.getUTCMonth()+1];rs+=digitString[d.getUTCDate()];rs+=digitString[d.getUTCHours()];rs+=digitString[d.getUTCMinutes()];rs+=digitString[d.getUTCSeconds()];return rs;},ts:function()
{return(new Date()).getTime();},td:function(t)
{return this.ts()-t;},convertSpaces:function(t)
{if('string'!=typeof t)
{return'';}
return t.replace(/\xA0+|\s+/g,' ');},getInnerText:function(n,maxt,st)
{st=st||this.ts();maxt=maxt||0;if((maxt>0)&&(this.td(st)>maxt))
{throw("");}
var nT=n.nodeType;var nV=n.nodeValue||'';var tag=(n.tagName||'').toLowerCase();if((nT==$iTXT.core.Dom.COMMENT_NODE)||n.itxtvisited)
{return'';}
if(this.inArray(tag,['script','a','embed','noscript','applet','xml','iframe','object','img','style','form']))
{return'';}
if(nT&&this.TEXT_NODE==nT)
{return this.cleanString(nV);}
n.itxtvisited=1;var rT='';var cn=$iTXT.core.$A(this.toArray(n.childNodes));cn.itxtEach(function(o)
{try
{rT+=this.getInnerText(o,maxt,st);}
catch(e)
{throw(rT);}},this);return rT;},getContentEncoding:function()
{var e='';try
{$iTXT.core.$A(document.getElementsByTagName('META')).itxtEach(function(o)
{if(o.content)
{var c=o.content.toLowerCase(),o=c.indexOf('charset=');if(o>=0)
{var re=/([\w\-]+)/,s=re.exec(c.substring(o+8));if(s)
{e=s[0];}}}},this);}
catch(x){}
return e;},toArray:function(obj)
{var retArr=[];var pS=Object.prototype.toString.call(obj);var className=pS.substring(pS.indexOf(' ')+1,pS.indexOf(']'));if("NodeList"==className)
{for(var i=0,len=obj.length;i<len;i++)
{retArr[retArr.length]=obj[i];}}
return retArr;},openUrl:function(url,cts)
{if(cts)
{this._changeLocation(url);}
else
{var blocked=false;var windowName='swnd_'+Math.floor(Math.random()*50);var windowHandle=null;try
{var winOpts=$iTXT.glob.params.get("open.win.opts","");windowHandle=window.open(url,windowName,winOpts);}
catch(e)
{blocked=true;}
if(windowHandle)
{var t=this,n=new Date().getTime();window.setTimeout(function()
{t._chkWindow(windowHandle,url,n);},50);}
else
{blocked=true;}
if(blocked)
{this._changeLocation(url);}}},_chkWindow:function(w,url,then)
{if(then){var now=new Date().getTime();if((now-then)>100){return;}}
var clsd=0;try
{clsd=w.closed;}
catch(e){}
if(!w||clsd||($iTXT.core.Browser.is("Chrome")&&w.document&&w.document.webkitHidden)||($iTXT.core.Browser.is("Opera")&&null==w.name))
{this._changeLocation(url);}},_changeLocation:function(url)
{var deferrers=[];var cbFunc=function()
{deferrers.shift();if(deferrers.length==0)
{document.location=url;}};var deferFunc=function(src)
{deferrers[deferrers.length]=src;};$iTXT.fire("$iTXT:location:change",{defer:deferFunc,cb:cbFunc});if(deferrers.length==0)
{document.location=url;}},parseFlashAdxParameters:function(advert)
{var adxParams={};var adx=advert.params.get("ADX");if(adx&&adx.indexOf("^^")!=-1)
{var adxComps=adx.split("^^");var i=adxComps.length;while(i--)
{var adxP=adxComps[i];if(-1!=adxP.indexOf(':'))
{var adxPname=adxP.substring(0,adxP.indexOf(':'));if("bg"==adxPname)
{adxPname="fl.bg";}
var adxPvalue=adxP.substring(adxP.indexOf(':')+1);adxParams[adxPname]=adxPvalue;advert.params.set(adxPname,adxPvalue,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}}}
else if(adx)
{var adxParts=this.decodeQueryString(adx,'^^',':');for(var key in adxParts)
{var pName=key;if("bg"==pName)
{pName="fl.bg";}
advert.params.set(pName,decodeURIComponent(adxParts[key]),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}}},getQryPair:function(key,params)
{if(key&&params)
{var name=key;var qName=key;if(VM._.isArray(key))
{name=key[1];qName=key[0];}
var val=params.get(name);if(val!=null)
{return qName+"="+encodeURIComponent(val);}}
return"";},generateQueryString:function(keys,params)
{var retStr="";for(var i=0,len=keys.length;i<len;i++)
{var key=keys[i];var pair=this.getQryPair(key,params);if(null!=pair&&""!=pair)
{if(i>0)
{retStr+="&";}
retStr+=pair;}}
return retStr;},validHexColor:function(c)
{var rS=c;if(c&&'string'==typeof c)
{if("#"!=c.charAt(0))
{if(c.match($iTXT.core.Regex.hexColor))
{rS="#"+c;}}}
return rS;},getText:function(n)
{if(n)
{return this.cleanString(n.innerText||n.textContent);}
return"";},getTagName:function(t)
{if(t.charAt(0)=="<")
{t=t.substring(1);}
if(t.indexOf(">")!=-1)
{t=t.substring(0,t.indexOf(">"));}
if(t.charAt(t.length-1)=="/")
{t=t.substring(0,t.length-1);}
return t;},hasCapitals:function(s)
{return null!=s.match(/[A-Z\u00C0-\u00D6\u00D8-\u00DF\u0401-\u042F\u0386\u0388-\u03AB]/);},hasPunctuation:function(s)
{return null!=s.match(/[-!\"#$%&\'()*+,.\/:;<=>?@[\\\]^_`{|}~]/);},nodeIndex:function(n)
{var pn=n.parentNode;if(n&&pn)
{for(var i=0,len=pn.childNodes.length;i<len;i++)
{if(pn.childNodes[i]==n)
{return i;}}}
return-1;},parseAdExtensions:function(adx)
{var ro={};var adxPairs=[adx];if(null!=adx&&adx.indexOf("^^")!=-1)
{adxPairs=adx.split("^^");}
for(var i=0;i<adxPairs.length;i++)
{var pair=adxPairs[i];if(null!=pair&&-1!=pair.indexOf(':'))
{var pairArr=pair.split(":");if(pairArr.length==2)
{ro[pairArr[0]]=pairArr[1];}}}
return ro;},parseBool:function(s)
{return("1"==s||"true"==s||true===s);},getStyle:function(e,s,s2)
{if(e.currentStyle)
{s=s2||s;return e.currentStyle[s];}
else if(window.getComputedStyle)
{return document.defaultView.getComputedStyle(e,null).getPropertyValue(s);}
return"";},parsePixels:function(s)
{try
{s=s.replace("px","");var r=parseInt(s);if(!isNaN(r))
{return r;}}
catch(e)
{}
return 0;},loadTemplate:function(name,callback)
{var subscribeArray=[];var unSubscribeFunc=null;var t=this;$iTXT.subscribe("$iTXT:tmpl:load",function()
{if($iTXT.tmpl.loader['$iTXT.tmpl.js.'+name])
{if(VM._.isFunction(callback))
{callback();}
if(VM._.isFunction(unSubscribeFunc))
{unSubscribeFunc();}}},subscribeArray);unSubscribeFunc=subscribeArray.pop();$iTXT.tmpl.dependsOn(name,false);},highestZIndex:function()
{var z=0,y;var elements=document.getElementsByTagName("*");var el=elements.length;for(var i=0;i<el;i++)
{var elmt=elements[i];y=parseInt(this.getStyle(elmt,'z-index','zIndex'),10);y=isNaN(y)?0:y;z=Math.max(z,y);}
return z;},parseInt:function(s,d)
{try
{return parseInt(s);}
catch(e)
{}
return d;},safeDecode:function(s)
{try
{var rx=/<[\/]?([^> ]+)[^>]*>/gi;var matches=s.match(rx);if(null!=matches)
{var res,newS='',index=0,lastIndex=0;while((res=rx.exec(s))!=null)
{var part=s.substring(lastIndex,res.index);if(part&&''!=part)
{try
{part=decodeURIComponent(part);}
catch(x){}}
newS+=part+res[0];lastIndex=rx.lastIndex;}
if(lastIndex<s.length)
{var lastpart=s.substring(lastIndex,s.length);if(lastpart&&''!=lastpart)
{try
{lastpart=decodeURIComponent(lastpart);}
catch(x){}}
newS+=lastpart;}
s=newS;}
else
{s=decodeURIComponent(s);}}
catch(x){}
return s;},decodeHtmlEntities:function(str)
{var node;if(!VM._.isString(str)){return str;}
node=document.createElement('p');node.innerHTML=str;return node.innerHTML;},removeSWF:function(obj)
{if(obj)
{(function(){if(obj.readyState==4)
{$iTXT.core.Util.removeSWFIE(obj);}
else
{setTimeout(arguments.callee,10);}})();}},removeSWFIE:function(obj)
{if(obj)
{for(var i in obj)
{if(typeof obj[i]=="function")
{obj[i]=null;}}
obj.parentNode.removeChild(obj);}}};$iTXT.core.Util.init();};$iTXT.js.loader["$iTXT.data.AdLogger"]=true;$iTXT.data.AdLogger_Load=function(){var undefined;var $itxtUtil=$iTXT.core.Util;$iTXT.data.BeaconMode={SCRIPT:0,IMAGE:1,IFRAME:2};$iTXT.data.TTCloseSource={MOUSEOUT:1,CLOSECLICK:2,KEYWORDCLICK:3,TOOLTIPCLICK:4,OVERNEWHOOK:5};$iTXT.data.LogEventType={ADVIEW:1,TOOLTIPCLICK:2,HOOKCLICK:3,MONITOR:4,HOOKLOG:5};$iTXT.data.ClickSource={KEYWORD:0,TOOLTIP:1,ICON:2,AUTOPEEK:3};$iTXT.data.AdViewValue={ADVIEW_KEYWORD:1,ADVIEW_ADVERT:2,ADVIEW_VIDEO_FIRSTFRAME:3,ADVIEW_VIDEO_LASTFRAME:4,ADVIEW_ENG_KEYWORD:5,ADVIEW_ENG_TOOLTIP:6,ADVIEW_UNQUALIFIED:7,ADVIEW_CPAV_CLOSED:8,ADVIEW_MOBT_OPEN:9,ADVIEW_CLICKED_HOOK_ICON:21,ADVIEW_CLICKED_CLOSED:22};$iTXT.data.AdLogger=$iTXT.core.Class.create({disallowTemplateAdView:{'9':true},server:"",qavTID:-1,viewabilityTID:-1,interactionTID:-1,trkDrps:null,pWind:null,pWindName:"",pWindUrl:"",demoMode:false,allowHookClick:true,logsInProgress:0,logsViewability:false,logsInteraction:false,init:function(o)
{if($iTXT.data.al)
{return;}
this.demoMode=o.demo||false;$iTXT.data.al=this;this.server=o.server||"mymachine";this.trkDrps={};var evt=$iTXT.core.Event;$iTXT.core.$(document).itxtBatchSubscribe([["$iTXT:data:log:monitor",evt.bind(this,this._mtrLog)],["$iTXT:tt:open",evt.bind(this,this._ttOpn)],["$iTXT:tt:close",evt.bind(this,this._ttCls)],["$iTXT:tt:mouse:over",evt.bind(this,this._ttMsOvr)],["$iTXT:tt:mouse:out",evt.bind(this,this._ttMsOut)],["$iTXT:hook:over",evt.bind(this,this._hkOvr)],["$iTXT:hook:out",evt.bind(this,this._hkOut)],["$iTXT:tt:click",evt.bind(this,this._ttClick)],["$iTXT:hook:click",evt.bind(this,this._hookClick)],["$iTXT:hook:touch",evt.bind(this,this._hookClick)],["$iTXT:hooks:loaded",evt.bind(this,this._pageHooksLoaded)],["$iTXT:livelookup:finished",evt.bind(this,this.llLoad)],["$iTXT:doubleTap:open",evt.bind(this,this._DTopenTimeLog)],["$iTXT:doubleTap:close",evt.bind(this,this._ttCls)],["$iTXT:doubleTap:logDwellTime",evt.bind(this,this._DTlogDwellTime)]],this.evtDspFuncs);this.logsViewability=$iTXT.glob.params.getBool('js.viewability.on',true);this.logsInteraction=$iTXT.glob.params.getBool('js.interaction.on',true);},_logQS:function(qs,o,ret)
{var url=this._mkLogUrl(qs,o);var cb=function(params)
{if($itxtUtil.isObject(params))
{var extraParams="";for(var name in params)
{var val=params[name];extraParams+="&"+name+"="+encodeURIComponent(val);}
url+=extraParams;}};$iTXT.fire("$iTXT:adlogger:before:log",cb);var o=o||{};$iTXT.data.al.logsInProgress++;if(!o.onLoad){o.onLoad=function()
{$iTXT.data.al.logsInProgress--;};}
if(ret)
{return url;}
else
{$itxtUtil.dropScript(url,function(removeFunction)
{removeFunction();if(o!=null&&o.onLoad)
{o.onLoad();}});}},_mkLogUrl:function(qs,o)
{o=o||{};var ld=o.logDocument||"al.asp";var proto=document.location.href.substr(0,document.location.href.indexOf('//'));var url=proto+'//'+this.server+'/'+ld+'?ts='+$iTXT.glob.params.get('ts','');if(this.demoMode)
{url+="&demogen=1";}
url+="&"+this._fixQs('http://'+this.server+'/'+ld,qs);return url;},_fixQs:function(baseLogUrl,qs)
{var wrongRedir,qsObject,redir;wrongRedir=qs.indexOf('redir='+encodeURIComponent(baseLogUrl))>-1;if(wrongRedir){qsObject=$iTXT.core.Util.decodeQueryString(qs);redir=qsObject.redir.split('redir%3D');if(2==redir.length){qs=qs.replace(qsObject.redir,decodeURIComponent(redir[1]));}}
return qs;},_pageHooksLoaded:function(e)
{var hks=e.data||[];var dids="";var adids="";var syids="";var apids="";var upw="";var upwr="";var kwp="";for(var i=0;i<hks.length;i++)
{var hk=hks[i];var ad=hk.ad;if(ad)
{var adtmp=ad.getTemplate();if(undefined!=adtmp)
{var addetails=adtmp.hookViewLogDetails(ad);if(i>0)
{dids+=",";adids+=",";syids+=",";apids+=",";upw+=",";upwr+=",";}
dids+=addetails.did;adids+=addetails.adid;syids+=addetails.syid;apids+=addetails.pid;upw+=addetails.uf;upwr+=addetails.ur;var tOff=hk.getPosition();kwp+=parseInt(tOff.left,10)+","+parseInt(tOff.top,10)+";";}}}
var alOpts={adid:adids,di:dids,pid:apids,syid:syids,uf:upw,ur:upwr,hk:1,kp:kwp,so:$iTXT.cnst.Source.ITXT+""};var qps=this._makeQPrms(this.pvPrms,$iTXT.glob.params,alOpts);for(var i=0;i<hks.length;i++)
{var hk=hks[i];var ad=hk.ad;if(ad&&ad.getTemplate)
{var atmp=ad.getTemplate();if(atmp)
{if(atmp.onLogEvent)
{if(!atmp.onLogEvent($iTXT.data.LogEventType.HOOKLOG,qps,ad))
{return;}}}}}
this._logQS(this._buildQS(qps));},_ttOpn:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{$iTXT.fire("$iTXT:ad:view",ad);var qavd=ad.params.get("qavd")||0;if(qavd>0)
{var t=this;this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_UNQUALIFIED,0,o);this.qavTID=window.setTimeout(function(){t.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_KEYWORD,1,o);},qavd);}
else
{this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_KEYWORD,0,o);}
if(this.logsViewability)
{var t=this;this.viewabilityTID=window.setTimeout(function()
{if($iTXT.ui.tt&&$iTXT.ui.tt.content)
{var viewable=$iTXT.core.Util.getVisiblePercent($iTXT.ui.tt.content.rootElement)>=50;t.logViewability(ad,viewable);}},1000);}}},llLoad:function(e)
{var o=e.data;var ad=o.advert;if(ad&&$iTXT.ui.tt&&$iTXT.ui.tt.currentAdvert==ad&&$iTXT.ui.tt.isOpen)
{ad.avSent=false;this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_KEYWORD,0,{});}},_ttCls:function(e)
{this._cancelQAVT();this._cancelViewability();this._cancelInteraction();var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{if(e.data.closeSource&&e.data.closeSource==$iTXT.data.TTCloseSource.CLOSECLICK)
{this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_CLICKED_CLOSED,0,o);}
this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_ENG_TOOLTIP,0,o);this.logViewability(ad,false);this.logInteraction(ad,false);ad.avSent=false;var openLength=$iTXT.ui.tt.getTimeSinceOpen();if(openLength>1000)
{this.logAV(ad,openLength,0,o);}
ad.doubleTap=ad.doubleTap||{};if(this.DTdwellTime&&ad.doubleTap.dwellTime){this.logAV(ad,ad.doubleTap.dwellTime,0,o);this.DTdwellTime=false;}
this._lgMtr({mt:67,mv:o.closeSource,mv2:o.tso||$iTXT.ui.tt.getTimeSinceOpen()});var qavd=ad.params.get("qavd")||0;if(qavd>0&&openLength<qavd)
{this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_CPAV_CLOSED,0,o);}}},_ttMsOvr:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad&&!ad.loggedAV2)
{this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_ADVERT,0,o);ad.loggedAV2=true;}
if(this.logsInteraction)
{var t=this;this.interactionTID=window.setTimeout(function()
{t.logInteraction(ad,true);},500);}},_ttMsOut:function(e)
{this._cancelInteraction();},_hkOvr:function(e)
{},_hkOut:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_ENG_KEYWORD,0,o);}},_mtrLog:function(e)
{if(e.data&&e.data.mt){this._lgMtr(e.data);}},_lgMtr:function(o)
{var ad=o.advert||$iTXT.ui.tt.currentAdvert;var qps=this._makeQPrms(this.mtrPrms,ad.params,o);if(ad&&ad.getTemplate)
{var atmp=ad.getTemplate();if(atmp)
{if(atmp.onLogEvent)
{if(!atmp.onLogEvent($iTXT.data.LogEventType.MONITOR,qps,ad,o))
{return;}}}}
this._logQS(this._buildQS(qps),o);},monitor:function(ad,data){if(!(ad instanceof $iTXT.data.Advert)){if(!(ad.params instanceof $iTXT.data.Param)){return false;}}
if(!VM._.isObject(data)){return false;}
if(!data.mt){return false;}
data.advert=ad;this._lgMtr(data);return true;},getTrackerUrl:function(av)
{var qps=this.getAVQueryParams($iTXT.ui.tt.currentAdvert,av,0,{});return this._mkLogUrl(this._buildQS(qps));},getAVQueryParams:function(ad,av,uqav,o)
{var qps=this._makeQPrms(this.avPrms,ad.params,o);qps.uav=uqav?1:undefined;qps.so=(0==ad.params.get("A.AT")?9:ad.params.get("ISO"));qps.av=av;qps.ll=ad.params.get("ll")||0;qps.llip=ad.params.get("llip")||0;qps.hbll=ad.params.get("hbll")||0;qps.syid=ad.params.get("syid")||0;return qps;},logAV:function(ad,av,uqav,o)
{var msg;var qavd=ad.params.get("qavd")||0;var openLength=$iTXT.ui.tt.getTimeSinceOpen();if(av<1000){switch(parseInt(av)){case 1:if(qavd>0){msg="Qualified ad view - popup was open long enough, (required QAVD = "+qavd+"ms)";}
else{msg="Qualified ad view - popup opened, no minimal ad view length (QAVD) is set";}
break;case 2:msg="User mouseovered tooltip";break;case 5:msg="User moused-out the hook";break;case 6:msg="Tooltip is closing";break;case 7:msg="Unqualified ad view, popup wasn't open long enough. Open time: "+openLength+"ms, (required QAVD = "+qavd+"ms)";break;case 9:msg="MOBT opened.";break;case 21:msg="User clicked hook icon";break;case 22:msg="User clicked (X) button";break;}}else{msg="Popup was opened longer than 1000ms, total time: "+av+"ms.";}
if(ad)
{if(1==av)
{var ll=ad.params.get("LIVELOOKUP",0);var llip=ad.params.get("LIVELOOKUPFINISHED",0);if((ll&&!llip))
{return;}
if(ad.avSent)
{return;}
if(!ad.params.getBool('js.temp.av1',true)){ad.avSent=true;}}
o=o||{};if(ad.oldDid)
{o.ldid=ad.oldDid;o.di=ad.did;}
var qps=this.getAVQueryParams(ad,av,uqav,o);if(!this.disallowTemplateAdView[av+'']){var adTemplate=ad.getTemplate();if(adTemplate)
{if(adTemplate.onLogAVEvent)
{if(!adTemplate.onLogAVEvent(av,qps,ad,o))
{return;}}}}
this._logQS(this._buildQS(qps),o);if(1==av)
{if(ad.params.getBool('js.temp.av1',true)){ad.avSent=true;}
this._drpBkns(ad);}}},logViewability:function(ad,viewable)
{if(!this.logsViewability)
{return;}
if($iTXT.MOBILE){return;}
if(!ad.params.get('iab.is',false)){return;}
if($iTXT.ui.tt.currentAdvert!=ad)
{return;}
if(ad.loggedViewability)
{return;}
ad.loggedViewability=1;var timeOpen=$iTXT.ui.tt.getTimeSinceOpen();this._lgMtr({mt:130,mv:timeOpen?timeOpen:0,mv2:viewable?1:0});},logInteraction:function(ad,interacted)
{if(!this.logsInteraction)
{return;}
if($iTXT.MOBILE){return;}
if(!ad.params.get('iab.is',false)){return;}
if(ad.loggedInteraction)
{return;}
ad.loggedInteraction=1;var timeInTooltip=$iTXT.ui.tt.getTimeInTooltip();this._lgMtr({mt:131,mv:timeInTooltip?timeInTooltip:0,mv2:interacted?1:0});},_drpBkns:function(ad)
{if(ad.droppedBeacons)
{return;}
ad.droppedBeacons=1;var bcs=ad.params.get("trkimages");var atmpl=ad.getTemplate();if(atmpl)
{if(atmpl.onTrackingDrop)
{if(!atmpl.onTrackingDrop(bcs,ad))
{return;}}}
if(bcs&&VM._.isArray(bcs))
{for(var i=0;i<bcs.length;i++)
{var src=ad.params.parse(bcs[i],{'TIMESTAMP':$iTXT.core.Util.isoTs()});this._drpBkn(src);}}},_drpBkn:function(url)
{var bm=$iTXT.data.BeaconMode;var util=$iTXT.core.Util;var mode=url.match(/^https?\:\/\/.*\/(.*\.js|al\.asp)/i)?bm.SCRIPT:url.match(/^https?\:\/\/.*\/.*\.gif|png|jpg|jpeg/i)?bm.IMAGE:bm.IFRAME;var cb=function()
{if(this.parentNode)
{this.parentNode.removeChild(this);}};switch(mode)
{case bm.SCRIPT:util.dropScript(url,cb);break;case bm.IMAGE:util.dropImage(url,cb);break;case bm.IFRAME:util.dropIframe(url,cb);break;}},_cancelQAVT:function()
{if(-1!=this.qavTID)
{window.clearTimeout(this.qavTID);this.qavTID=-1;}},_cancelViewability:function()
{if(-1!=this.viewabilityTID)
{window.clearTimeout(this.viewabilityTID);this.viewabilityTID=-1;}},_cancelInteraction:function()
{if(-1!=this.interactionTID)
{window.clearTimeout(this.interactionTID);this.interactionTID=-1;}},prmMap:{'av':"ADVIEWTYPE",'at':"A.AT",'ipid':"IPID",'di':"A.LDID",'syid':"A.SYID",'adid':"A.ADID",'pid':"A.PID",'cc':"CC",'rcc':"RCC",'so':"so",'mh':"SID",'ll':"LIVELOOKUP",'hbll':"LIVELOOKUPFINISHED",'id':"H.ID",'idh':"H.IDH",'pvu':"pvu",'pvm':"pvm",'uf':"A.UF",'ur':"A.UR",'redir':"CLICKTAG"},pvPrms:['adid','cc','di','hk','ipid','mh','pid','pvm','pvu','rcc','so','syid','uf','ur','kp'],avPrms:['av','at','ipid','di','syid','adid','pid','cc','rcc','so','mh','ll','hbll','id','idh','pvu','pvm','uf','ur','len','wch','ldid'],clkPrms:['at','ipid','di','ldid','syid','adid','pid','cc','rcc','so','mh','ll','hbll','id','idh','pvu','pvm','uf','ur','ttv','llip','kp','redir','vt','qavclk'],mtrPrms:['mt','mv','mv2','ipid','di','id','idh','cc','rcc','pvu'],_makeQPrms:function(nms,params,o)
{var retObj={};if(params)
{for(var i=0;i<nms.length;i++)
{var qp=nms[i];var mapName=this.prmMap[qp];if(mapName)
{var val=o[qp]||params.get(mapName);if(val||(0==val&&'number'==typeof val))
{retObj[qp]=params.parse(val+"");}}
else if(o[qp]||(0==o[qp]&&'number'==typeof o[qp]))
{retObj[qp]=o[qp];}}}
return retObj;},_buildQS:function(map)
{var qs="";var addAmp=0;for(var qsName in map)
{var qsVal=map[qsName];if(qsVal||(0==qsVal&&'number'==typeof qsVal))
{if(addAmp)
{qs+="&";}
else
{addAmp=1;}
qs+=qsName+"="+encodeURIComponent(qsVal);}}
return qs;},clickThrough:function(opts){this._ttClick({data:opts});},_ttClick:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(!o.so)
{o.so=$iTXT.cnst.Source.TT;}
if(ad)
{var now=(new Date()).getTime();if(ad.lastClickTime)
{var clickDelay=parseInt(ad.params.get("RECLICKDELAY",10000));if(clickDelay>(now-ad.lastClickTime))
{return;}}
var ll=ad.params.get("LIVELOOKUP",0);var llif=ad.params.get("LIVELOOKUPFINISHED",0);if(ll&&!llif)
{o.llip=1;o.recurseTime=o.recurseTime?(o.recurseTime+250):250;if(o.recurseTime<5000)
{var t=this;window.setTimeout(function(){t._ttClick({data:o});},250);return;}
else
{return;}}
else
{o.llip=0;}
this.logViewability(ad,false);this.logInteraction(ad,false);var tso=$iTXT.ui.tt.getTimeSinceOpen();var qavd=ad.params.get("QAVD",0);if(qavd>0)
{if(tso<qavd)
{o.qavclk=1;this._cancelQAVT();}
else
{o.qavclk=2;}}
if(ad.oldDid)
{o.ldid=ad.oldDid;o.di=ad.did;}
var qParams=this._makeQPrms(this.clkPrms,ad.params,o);qParams.ttv=$iTXT.ui.tt.isOpen?1:0;if(ad.params.get("KP",0))
{var hkPos=ad.hook.getPosition();qParams.kp=hkPos.left+","+hkPos.top;}
var adTemplate=ad.getTemplate();if(adTemplate)
{if(adTemplate.onLogEvent)
{if(!adTemplate.onLogEvent($iTXT.data.LogEventType.TOOLTIPCLICK,qParams,ad,o))
{return;}}}
var redirect=qParams.redir;qParams.redir=undefined;var qString=this._buildQS(qParams);qString+="&redir="+encodeURIComponent(redirect);var url=this._mkLogUrl(qString,o);var cts=parseInt(ad.params.get("cts",0));if(o.cts!==undefined)
{cts=o.cts;}
this.openUrl(url,cts);if(!cts&&$iTXT.ui.tt.isOpen)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:close",{closeSource:$iTXT.data.TTCloseSource.TOOLTIPCLICK});}
ad.lastClickTime=now;}},openUrl:function(url,cts,recurseTime){if(cts&&$iTXT.data.al.logsInProgress>0){var timedRecursed=recurseTime?(recurseTime+250):250;if(timedRecursed<5000){var t=this;window.setTimeout(function(){t.openUrl(url,cts,timedRecursed);},250);return;}}
$itxtUtil.openUrl(url,cts);},_hookClick:function(e)
{if(!this.allowHookClick)
{return;}
var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;var hkClickMode=0;var hkClickModeTimeout=0;if(ad)
{hkClickMode=ad.params.getInt("hk.click.mode",0);hkClickModeTimeout=ad.params.getInt("hk.click.mode.time",0);}
switch(hkClickMode)
{case 1:return;break;case 2:if(!$iTXT.ui.tt.isOpen)
{return;}
break;case 3:var tso=$iTXT.ui.tt.getTimeSinceOpen();if(tso==null||tso<hkClickModeTimeout)
{return;}
break;case 0:default:break;}
if(!o.so)
{o.so=$iTXT.cnst.Source.KW;}
if(ad)
{var ll=ad.params.get("LIVELOOKUP",0);var llif=ad.params.get("LIVELOOKUPFINISHED",0);if(ll&&!llif)
{o.llip=1;o.recurseTime=o.recurseTime?(o.recurseTime+250):250;if(o.recurseTime<5000)
{var t=this;window.setTimeout(function(){t._hookClick({data:o});},250);return;}
else
{return;}}
else
{o.llip=0;}
this.logViewability(ad,false);this.logInteraction(ad,false);var now=(new Date()).getTime();var tso=$iTXT.ui.tt.getTimeSinceOpen();if(ad.lastClickTime)
{var clickDelay=parseInt(ad.params.get("RECLICKDELAY",10000));if(clickDelay>(now-ad.lastClickTime))
{return;}}
if(e.data.source&&e.data.source==$iTXT.data.ClickSource.ICON)
{this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_CLICKED_HOOK_ICON,0,o);}
var qavd=ad.params.get("QAVD",0);if(qavd>0)
{if(tso<qavd)
{return false;}}
var qParams=this._makeQPrms(this.clkPrms,ad.params,o);qParams.ttv=ad.params.get('ttv',($iTXT.ui.tt.isOpen?1:0));var adTemplate=ad.getTemplate();if(adTemplate)
{if(adTemplate.onLogEvent)
{if(!adTemplate.onLogEvent($iTXT.data.LogEventType.HOOKCLICK,qParams,ad,o))
{return;}}}
var redirect=qParams.redir;qParams.redir=undefined;var qString=this._buildQS(qParams);var override=false;if(VM._.isArray(ad.params.get('clicktag','')))
{if(''!=$iTXT.glob.params.get('sest',''))
{var seID=$iTXT.glob.params.get('seid',-1);var adType=ad.params.get('a.at',-1);if((0==seID||14==seID)&&(32==adType||34==adType||46==adType))
{var adx=ad.params.get('adx',null);if(adx&&adx.get)
{var clk=adx.get("webClickURL2",null);if(clk)
{override=true;}}}}}
if(!override)
{qString+="&redir="+encodeURIComponent(redirect);}
var url=this._mkLogUrl(qString,o);var cts=ad.params.getInt("cts",0);if(o.cts!==undefined)
{cts=o.cts;}
this.logAV(ad,$iTXT.data.AdViewValue.ADVIEW_KEYWORD,0,o);this.openUrl(url,cts);if(!cts&&$iTXT.ui.tt.isOpen)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:close",{closeSource:$iTXT.data.TTCloseSource.KEYWORDCLICK});}
ad.lastClickTime=now;}},getClickURL:function(ad,opts,params,noredir)
{opts=opts||{};params=params||this.clkPrms;if(!opts.so)
{opts.so=$iTXT.cnst.Source.ITXT;}
var qParams=this._makeQPrms(params,ad.params,opts);qParams.ttv=1;if(ad.params.get("KP",0))
{var hkPos=ad.hook.getPosition();qParams.kp=hkPos.left+","+hkPos.top;}
var redirect=(noredir||undefined==qParams.redir)?'':qParams.redir;qParams.redir=undefined;var qString=this._buildQS(qParams);if(!noredir)
{qString+="&redir="+encodeURIComponent(redirect);}
var url=this._mkLogUrl(qString,{});return url;},_DTopenTimeLog:function _DTopenTimeLog(){var ad=$iTXT.ui.tt.currentAdvert;ad.doubleTap=ad.doubleTap||{};if(ad){var openTime=(new Date()).getTime();ad.doubleTap.openTime=openTime;}},_DTlogDwellTime:function _DTlogDwellTime(){var ad=$iTXT.ui.tt.currentAdvert;ad.doubleTap=ad.doubleTap||{};if(ad.doubleTap.openTime){var closeTime=(new Date()).getTime();ad.doubleTap.dwellTime=closeTime-ad.doubleTap.openTime;}
this.DTdwellTime=true;}});$iTXT.data.AdLogger.getInstance=function(){return $iTXT.data.al;};};$iTXT.js.loader["$iTXT.data.Advert"]=true;$iTXT.data.Advert_Load=function(){var undefined;$iTXT.data.AdvertManager={id:0,ads:{},remapped:{},add:function(ad)
{if(ad)
{var cAd=this.getByDid(ad.did);if(null!=cAd)
{this.remove(cAd);}
ad.id=this.id++;this.ads["itxtAdvert"+ad.id]=(ad);}},remove:function(advert)
{var newAds=[];for(var adid in this.ads)
{var ad=this.ads[adid];if(ad!=advert)
{newAds["itxtAdvert"+ad.id]=ad;}}
this.ads=newAds;},get:function(id)
{return this.ads["itxtAdvert"+id]||null;},getByDid:function(did,caller)
{for(var adid in this.ads)
{var ad=this.ads[adid];if(ad.$A&&ad.$A.did&&did==ad.$A.did&&ad!=caller)
{return ad;}}
return null;},list:function()
{var rArr=[];for(var i=1;i<this.id;i++)
{rArr.push(this.ads["itxtAdvert"+i]);}
return rArr;},remap:function(did,newdid)
{this.remapped[did]=newdid;},getMapping:function(did)
{if(this.remapped[did])
{return this.getByDid(this.remapped[did]);}
return null;},setCurrentAdvert:function(ad){$iTXT.ui.tt.currentAdvert=ad;},getCurrentAdvert:function(){return $iTXT.ui.tt.currentAdvert;},noDynamicAdhesions:function(){return VM._(this.ads).every(function(ad){return!ad.isDynamicAdhesion();});}};$iTXT.data.Advert=$iTXT.core.Class.create({template:null,params:null,id:-1,did:0,liveLookupFinished:false,avSent:false,childAdverts:null,processed:false,init:function(template,params,attributes)
{this.$A=attributes||{livelookup:false};this.did=this.$A.did;$iTXT.data.AdvertManager.add(this);this.templateClass=template||"$iTXT.tmpl.TemplateBase";this.params=params;this.clickTag=this.params.get("CLICKTAG");this.childAdverts=[];var childArr=params.get("children.adverts",[]);params.unset("children.adverts");this.addChildAds(childArr);},setHook:function(hk)
{this.hook=hk;this.params.set("KEYWORD",hk.options.value,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);},createTemplate:function()
{if(!this.template)
{var _tKlass=eval(this.templateClass);this.template=new _tKlass({advert:this});}},processAdvert:function()
{if(this.processed)
{return;}
this.processed=true;var w=$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN;this.params.set("ITXTSERVER",$iTXT.js.serverName,w);for(var att in this.$A)
{this.params.set("a."+att,this.$A[att],w);}
var clickTag=this.clickTag;if(null!=clickTag)
{var clickTagValues=clickTag.split("##");var clickVarNames=this.params.get("CVN","");clickVarNames=clickVarNames.split(",");for(var i=0;i<clickVarNames.length;i++)
{if(clickVarNames.length>i&&clickTagValues.length>i)
{var clickVarName=clickVarNames[i];var clickTagValue=clickTagValues[i];if($iTXT.data.al&&""!=clickVarName)
{var url=$iTXT.data.al.getClickURL(this,{redir:clickTagValue});;this.params.set(clickVarName,url,w);}}}
this.params.set("SEARCHCLICKTAG",clickTagValues[0],w);if(clickVarNames.length==0)
{this.params.set("CLICKTAG",clickTagValues[0],w);}}
var wd=this.params.get("w");if(null!=wd)
{this.params.set("width",wd,w);}
var ht=this.params.get("h");if(null!=ht)
{this.params.set("height",ht,w);}
if($iTXT.data.al&&$iTXT.data.al.getClickURL)
{var clkUrl=$iTXT.data.al.getClickURL(this,{so:$iTXT.cnst.Source.LOGO,ll:this.params.get('ll',"0"),llip:this.params.get('llip',"0"),hbll:this.params.get('hbll',"0")});this.params.set("A.CLICKURL",clkUrl,w);this.params.set("clickURL",encodeURIComponent(clkUrl),w);}
var opts={ll:'0',llip:'0',hbll:'0',uf:null,ur:null};opts.so=$iTXT.data.ClickSource.LOGO;this.params.set('stub.tu',$iTXT.data.al.getClickURL(this,opts),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.params.set('stub.tu.noredirect',$iTXT.data.al.getClickURL(this,opts,null,true),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);opts.so=$iTXT.data.ClickSource.ICON;this.params.set('stub.t',$iTXT.data.al.getClickURL(this,opts),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);opts.so='0',opts.av=1;this.params.set('stub.av',$iTXT.data.al.getClickURL(this,opts,$iTXT.data.al.avPrms,true),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.params.set("LIVELOOKUP",this.$A.livelookup,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.params.set("LIVELOOKUPFINISHED",0,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);},getTemplate:function()
{this.createTemplate();return this.template;},addTemplateParams:function(params,weight)
{if(this.params&&this.params.set)
{var w=(undefined==weight)?$iTXT.cnst.WEIGHTING_DEFAULT_DATABASE:weight;this.params.set(params,null,w);}},tokenize:function(obj)
{return this.params.tokenize(obj);},isSameOrChild:function(a)
{try
{if(a==this)
{return true;}
if(null!=this.childAdverts&&VM._.isArray(this.childAdverts))
{for(var i=0;i<this.childAdverts.length;i++)
{var ca=this.childAdverts[i];if(a==ca)
{return true;}}}}
catch(e)
{}
return false;},addChildAds:function(children)
{if(children&&children.length>0)
{$iTXT.core.$A(children).itxtEach($iTXT.core.Event.bind(this,this.addChildAd));}},addChildAd:function(child)
{if(child)
{var adParams=new $iTXT.data.Param(this.params);adParams.set(child,null,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);var adAttributes={};var ad=new $iTXT.data.Advert(this.templateClass,adParams,adAttributes);this.childAdverts.push(ad);}},addChildAdvert:function(ad)
{if(ad)
{this.childAdverts.push(ad);}},getAdvertType:function()
{return parseInt((this.$A.rat||this.$A.at),10);},getKeywordId:function(){return this.$A.kwid;},getDetailId:function(){return this.$A.did;},getMoatConfig:function(){var p=this.params;var conf={enabled:p.getBool('js.moat.enabled',false),ad_tag:decodeURIComponent(p.get('js.moat.adtag','http://js.moatads.com/${js.moat.partnercode}/moatad.js'+'?moatClientLevel1=${js.moat.advertiser}'+'&moatClientLevel2=${js.moat.campaign}'+'&moatClientLevel3=${js.moat.lineitem}'+'&moatClientLevel4=${js.moat.creative}'+'&moatClientSlicer1=${js.moat.site}'+'&moatClientSlicer2=${js.moat.placement}')),partner_code:decodeURIComponent(p.get('js.moat.partnercode','vibrantdivid37533632349')),advertiser:decodeURIComponent(p.get('js.moat.advertiser',p.get('IONO'))),campaign:decodeURIComponent(p.get('js.moat.campaign',this.getDetailId())),line_item:decodeURIComponent(p.get('js.moat.lineitem',this.getKeywordId())),creative:decodeURIComponent(p.get('js.moat.creative','-')),site:decodeURIComponent(p.get('js.moat.site','-')),placement:decodeURIComponent(p.get('js.moat.placement','-'))};return conf;},useAdChoices:function(){var privIconMode=parseInt(this.params.get(this.params.parse("hdr.privacyicon.mode.${cc}"),$iTXT.ui.privacyIconAlign.ICON_ONLY),10);var allowedRegions=this.params.get("tt.privacyicon.regions","").toLowerCase().split(',');var countryCode=this.params.get("cc","en").toLowerCase();var country_on=($iTXT.core.Util.inArray(allowedRegions,'all')||$iTXT.core.Util.inArray(allowedRegions,countryCode))&&privIconMode>0;var ad_on=this.params.get("hdr.privacyicon");var rv=false;if(null!=ad_on){rv=this.params.getBool("hdr.privacyicon");}else{rv=country_on;}
return rv;},isDynamicAdhesion:function(){var typeEnum=$iTXT.data.Advert.ADVERTTYPE,type=this.getAdvertType();switch(type){case typeEnum.DYNAMIC_ADHESION:case typeEnum.DA_LIGHTBOX:case typeEnum.DA_MOSAIC:case typeEnum.DA_YELL:case typeEnum.DA_YAHOO:case typeEnum.DA_SHOPPINGDOTCOM:return true;default:return false;}},isCPE:function(){var typeEnum=$iTXT.data.Advert.ADVERTTYPE,type=this.getAdvertType();switch(type){case typeEnum.LIGHTBOX:case typeEnum.LIGHTBOXMOBILE:case typeEnum.LIGHTBOX30:case typeEnum.MOSAIC:case typeEnum.STORYBOARD:return true;default:return false;}},isKelkoo:function(){return this.getAdvertType()===$iTXT.data.Advert.ADVERTTYPE.KELKOO;}});$iTXT.data.Advert.ADVERTTYPE={KELKOO:5,LIGHTBOX:160,LIGHTBOXMOBILE:163,LIGHTBOX30:164,MOSAIC:165,DYNAMIC_ADHESION:173,STORYBOARD:178,DA_LIGHTBOX:179,DA_MOSAIC:180,DA_YELL:181,DA_YAHOO:182,DA_SHOPPINGDOTCOM:183};};$iTXT.js.loader["$iTXT.data.AdvertHandler"]=true;$iTXT.data.AdvertHandler_Load=function(){var undefined;$iTXT.data.AdvertHandler=$iTXT.core.Class.create({advert:null,callback:null,init:function(advert)
{this.advert=advert;},handle:function(callback)
{this.callback=callback;if(this.advert.$A.livelookup&&$iTXT.js.serverUrl&&$iTXT.cnst.CONTROLLER_LOOK)
{if(this.advert.liveLookupInProgress)
{return;}
this.advert.liveLookupInProgress=true;var fo=0;var lookUrl=$iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_LOOK+"?ts="+$iTXT.core.Util.ts();var lookKeys=[$iTXT.cnst.Params.REF,$iTXT.cnst.Params.REF_MD5,$iTXT.cnst.Params.UID,$iTXT.cnst.Params.UID_MD5,"ipid","cc","rcc","reg","dma","city","auat","fo",["did","a.did"],["syid","a.syid"],["pid","a.pid"],"eat","dat","sest","seid","sehs","test","ugoogle"];lookUrl+="&"+$iTXT.core.Util.generateQueryString(lookKeys,this.advert.params);var t=this;$iTXT.core.Util.dropScript(lookUrl,function(details)
{t._liveLookupLoad(details);});}
else
{callback();}},_liveLookupLoad:function(liveLookupDetails)
{var newAd=$iTXT.data.AdvertManager.getByDid(liveLookupDetails.did);if(liveLookupDetails.did!=this.advert.did)
{newAd.oldDid=this.advert.did;}
var backfillParams=newAd.params.get('BACKFILLPROPERTIES');if(backfillParams)
{newAd.addTemplateParams(backfillParams,$iTXT.cnst.WEIGHTING_DEFAULT_CONFIG);if($iTXT.debug.Util.isLoggingOn())
{for(var prop in backfillParams)
{if(backfillParams.hasOwnProperty(prop))
{}}}}
var templateParams=newAd.params.get('TEMPLATEPROPERTIES');if(templateParams)
{newAd.addTemplateParams(templateParams,$iTXT.cnst.WEIGHTING_DEFAULT_CONFIG);if($iTXT.debug.Util.isLoggingOn())
{for(var prop in templateParams)
{if(templateParams.hasOwnProperty(prop))
{}}}}
this.advert.hook.options.uid=liveLookupDetails.uid;this.advert.hook.options.uidh=liveLookupDetails.uidh;this.advert.hook.setAdvert(newAd);newAd.setHook(this.advert.hook);newAd.$A.livelookup=false;newAd.liveLookupFinished=true;newAd.params.set("LIVELOOKUPFINISHED",1,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);newAd.params.set("LIVELOOKUP",0,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.advert.params.set("LIVELOOKUPFINISHED",1,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.advert.params.set("LIVELOOKUP",0,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.advert.$A.livelookup=false;this.advert.liveLookupFinished=true;if(this.advert.templateClass!=newAd.templateClass)
{var templateName=newAd.templateClass.substring(newAd.templateClass.lastIndexOf('.')+1);$iTXT.core.Util.loadTemplate(templateName,function(){$iTXT.core.$(document).itxtFire("$iTXT:tt:content:change:ad",newAd);});this.advert.template.dispose();}
else
{$iTXT.core.$(document).itxtFire("$iTXT:tt:content:change:ad",newAd);}
$iTXT.fire("$iTXT:livelookup:finished",{advert:newAd});}});};$iTXT.js.loader["$iTXT.data.Channel"]=true;$iTXT.data.Channel_Load=function(){var undefined;$iTXT.data.Channel=$iTXT.core.Class.create({init:function()
{$iTXT.glob.currentChannel=this;if($iTXT.glob.params)
{this._processChannelParams();}},_processChannelParams:function()
{var p=$iTXT.glob.params;p.set("normalisedcountry",p.get("cc"));p.set("realcountry",p.get("rcc"));p.set("region",p.get("reg"));p.set("pcode",p.get("postcode"));}});};$iTXT.js.loader["$iTXT.data.Context"]=true;$iTXT.data.Context_Load=function()
{var $itxtUtil=$iTXT.core.Util;$iTXT.data.Context={BAD_EXCL:1,BAD_SHORT:2,BAD_SML_IMG:4,BAD_IAB_IMG:8,BAD_NOT_CONTENT:16,allowedFields:{c:'itxtAllowed',h:'itxtAllowed',n:'itxtAllowed',p:'itxtAllowed',t:'itxtAllowed',u:'itxtAllowed',v:'itxtAllowed',w:'itxtAllowed',x:'itxtAllowed'},changedContentSections:{},contextFull:true,currentDepth:0,dynamicContentHandler:null,dynamicContentMode:false,dynamicContentThreshold:15,dynamicContentURLs:{},eligibleElementsTotal:-1,harvestCount:0,harvestedCount:0,lastTime:0,lastTimeOut:-1,metrics:0,modifiedTrees:[],nodeAssessments:{},nodeTextLengths:{},observationTypes:{transform:{label:"TRANSFORM",strategy:function(node){var transitionEndEvent='transitionend';var prefixedTransitions={'WebkitTransition':'webkitTransitionEnd','OTransition':'oTransitionEnd','msTransition':'MSTransitionEnd'};for(var t in prefixedTransitions){if(node.style[t]!==undefined){transitionEndEvent=prefixedTransitions[t];break;}}
$iTXT.addEvent(node,transitionEndEvent,function(){$iTXT.data.Context.onContentStateChange(node);});},getDynamicContentState:function(node){return $iTXT.core.Util.getVisiblePercent(node)>$iTXT.data.Context.dynamicContentThreshold;},isMutation:false},mutationObserver:{label:"MUTATION OBSERVER",strategy:function(node){var obs=new MutationObserver(function(mutations){VM._.each(mutations,function(){$iTXT.data.Context.onContentStateChange(node);});});obs.observe(node,{childList:true,subtree:true});},getDynamicContentState:function(){return true;},isMutation:true},mutationEvents:{label:"MUTATION EVENTS",strategy:function(node){$iTXT.addEvent(node,'DOMSubtreeModified',function(){$iTXT.data.Context.onContentStateChange(node);});},getDynamicContentState:function(){return true;},isMutation:true}},pageElementsTotal:-1,pageTitle:'',paragraphNodes:[],processedElementsCount:0,textNodes:[],timedOut:false,timings:{},treeObjectMode:false,dynScanned:false,Node:$iTXT.core.Class.create({c:null,h:null,n:null,p:null,t:null,u:null,v:null,w:null,x:null,tn:'',init:function(n,params,parent)
{if(this._checkLimits(params))
{this._suicide();return;}
var hC=n.itxtHarvested;if(n&&null!==hC&&undefined!==hC&&hC==$iTXT.data.Context.harvestCount)
{this._suicide();return;}
var nT=n.nodeType;if(nT!=$itxtUtil.ELEMENT_NODE)
{this._suicide();return;}
else
{this.tn=n.tagName.toLowerCase();}
if(n.itxtBad)
{this._bad=n.itxtBad;if(this._isBad(n))
{this._suicide();return;}}
this._nId=$iTXT.data.Dom.setNodeId(n);parent=parent||{};try
{n.itxtHarvested=$iTXT.data.Context.harvestCount;}
catch(x)
{}
var didA=false;var thisA=$iTXT.data.Context.loadAssessment(n);if((!$itxtUtil.isObject(thisA)||!thisA)&&params.assessor&&params.assessor.assess)
{var sel=$iTXT.data.Dom.parseElement(n,params.intattrs);thisA=params.assessor.assess(sel);didA=true;if($iTXT.data.Context.metrics&$iTXT.debug.Util.ECH_ASSESS_DUMP)
{var aStr='';for(var a in thisA)
{if('function'!==typeof thisA[a])
{var tag=(a.indexOf('is')===0)?'b':'span';aStr+='&nbsp;&nbsp;&nbsp;&nbsp;'+a+':<'+tag+' style="color:'+((thisA[a]===true)?'green':'red')+';">'+thisA[a]+'</'+tag+'><br/>';}}
if(''!==aStr&&$iTXT.debug.Util.isLoggingOn())
{var sSel=$itxtUtil.serialiseJSON(sel);}}}
var assessment=thisA||{};if(didA)
{$iTXT.data.Context.saveAssessment(n,assessment);}
$iTXT.data.Context.processedElementsCount++;if(!params.processed)
{if(undefined===params.maxImageW)
{params.maxImageW=-1;}
if(undefined===params.maxImageH)
{params.maxImageH=-1;}
if(undefined===params.initskip)
{params.initskip=-1;}
if(undefined===params.maxnodes)
{params.maxnodes=-1;}
if(undefined===params.maxnodedepth)
{params.maxnodedepth=255;}
if(undefined===params.mintextlength)
{params.mintextlength=-1;}
if(undefined===params.maxheaderdepth)
{params.maxheaderdepth=3;}
if(undefined===params.timeout)
{params.timeout=1500;}
if(params.initskip>0&&params.maxnodes>0)
{params.maxnodes+=params.initskip;}
params.processed=true;}
this._setType(n,params,assessment,parent);if(this._isBad(n,assessment.hasHooknodes))
{this._suicide();return;}
if(""===this.t)
{delete this.t;}
$iTXT.data.Context.currentDepth++;this._getChildren(n,params,assessment);this._setDynamicContent(n,params,assessment,parent);this._setHookable(n,params,assessment,parent);this._setParagraph(n,params,assessment,parent);this._setWeight(n,params,assessment,parent);this._setContent(n,params,assessment,parent);if(this._isBad(n,assessment.hasHooknodes))
{$iTXT.data.Context.currentDepth--;this._suicide();return;}
if($iTXT.debug.CurrentConsole&&!$iTXT.glob.params.get('itxthln-xx'))
{if(assessment.isUnbreaknode)
{$iTXT.debug.Util.hilite(n.firstChild,$iTXT.debug.Util.HL_COL_SKIP,$iTXT.debug.Util.HL_BORDER_UPN,true);}
if(1==this.h||false===assessment.isContent)
{$iTXT.debug.Util.hilite(n,$iTXT.debug.Util.HL_COL_SKIP,true);}
else if(true===assessment.isContent)
{$iTXT.debug.Util.hilite(n,$iTXT.debug.Util.HL_COL_CONTENT,null,true);}}
var me={h:this.h,p:this.p,t:this.t,v:this.v,tn:this.tn};if(parent&&parent.p&&1==parent.p)
{me.p=1;}
if(parent&&1==parent.h)
{me.h=1;}
if(!me.v&&parent&&parent.v)
{me.v=parent.v;}
if(assessment.isHooknode||(parent&&parent.isHooknode))
{me.isHooknode=true;}
if(assessment.isSkipnode||(parent&&parent.isSkipnode))
{me.isSkipnode=true;}
this._setChildren(n,params,assessment,me);if(this.x&&this.x.length===0)
{this.x=null;}
$iTXT.data.Context.currentDepth--;if(!this.c&&!this.u&&!this.x)
{this._suicide();}
delete this._bad;if(this.t&&this.x&&!this.u&&!this.c)
{delete this.t;}
if(this.h&&this.x&&!this.u&&!this.c)
{delete this.h;}
if(1==this.h)
{this.h=0;}},serialise:function(all)
{if(all||this.c||this.u||this.w||this.x)
{return $itxtUtil.serialiseJSON(this,$iTXT.data.Context.allowedFields);}
else
{return'{}';}},simplify:function(all)
{var rO={},rF=[];if(all||this.c||this.u||this.w||this.x)
{for(var f in $iTXT.data.Context.allowedFields)
{if(null!==this[f])
{rF[rF.length]=f;rO[f]=this[f];}}}
return(rF.length>0)?rO:null;},_addParagraphNode:function()
{var currL=$iTXT.data.Context.paragraphNodes.length;if(currL>0)
{var lastM=currL-1;var lastP=$iTXT.data.Context.paragraphNodes[lastM];if(!lastP||0===lastP.length)
{currL=lastM;}}
$iTXT.data.Context.paragraphNodes[currL]=[];},_checkLimits:function(params)
{if(params.maxnodes>0&&$iTXT.data.Context.textNodes.length>=params.maxnodes)
{return true;}
var tc=new Date().getTime();if(params.timeout>0&&undefined!==$iTXT.data.Context.timings.cStart&&(tc-$iTXT.data.Context.timings.cStart)>params.timeout)
{$iTXT.data.Context.timings.cEnd=tc;$iTXT.data.Context.timedOut=true;$iTXT.data.Context.lastTimeOut=params.timeout;return true;}
return false;},_getChildren:function(n,params)
{var badTags={'applet':true,'embed':true,'iframe':true,'img':true,'object':true,'script':true,'style':true,'xml':true};var childTags=[],childTexts=[],childAttrs=[];var nTn=n.tagName.toLowerCase();if(n.nodeType==$itxtUtil.ELEMENT_NODE)
{if(params.maxnodedepth&&params.maxnodedepth>-1&&$iTXT.data.Context.currentDepth>=params.maxnodedepth)
{}
else
{var cs=n.childNodes,t='';var l=cs.length;while(l--)
{var c=cs[l];var cT=c.nodeType;if(cT==$itxtUtil.TEXT_NODE)
{if(!badTags[nTn])
{var cV=$itxtUtil.cleanString(c.nodeValue);if(null!==cV&&undefined!==cV&&''!==cV)
{t+=' '+cV;childTexts[childTexts.length]=c;}}}
else if(cT==$itxtUtil.ELEMENT_NODE)
{childTags[childTags.length]=c;var childA=$iTXT.data.Context.loadAssessment(c);if(!childA||!$itxtUtil.isObject(childA))
{childA=params.assessor.assess($iTXT.data.Dom.parseElement(c,params.intattrs));$iTXT.data.Context.saveAssessment(c,childA);}}}
$iTXT.data.Context.nodeTextLengths[n.itxtNodeId]=$itxtUtil.cleanString(t).length||0;if($iTXT.data.Context.contextFull)
{var iAttrs=params.intattrs.split(","),nAttrs=n.attributes;var k=iAttrs.length;while(k--)
{if(iAttrs[k]=='name'&&nTn=='meta'&&nAttrs.content!==undefined)
{childAttrs[childAttrs.length]=nAttrs.content;}
if(iAttrs[k]!=='name'&&nAttrs[aName]&&nAttrs[aName].specified)
{var aName=iAttrs[k];childAttrs[childAttrs.length]=nAttrs[aName];}}}}}
this._childTags=childTags.reverse();this._childTexts=childTexts.reverse();this._childAttrs=childAttrs;},_isBad:function(n,nohilite)
{if(this._bad>0)
{if(!nohilite)
{var col=$iTXT.debug.Util.HL_COL_EXCLUDE;var bor=$iTXT.debug.Util.HL_BORDER_STD;if($iTXT.data.Context.BAD_NOT_CONTENT==this._bad)
{col=$iTXT.debug.Util.HL_RESET;}
else if($iTXT.data.Context.BAD_SHORT==this._bad)
{col=$iTXT.debug.Util.HL_COL_SKIP;bor=$iTXT.debug.Util.HL_BORDER_SHORT;}
else if($iTXT.data.Context.BAD_SML_IMG==this._bad||$iTXT.data.Context.BAD_IAB_IMG==this._bad||$iTXT.data.Context.BAD_EXCL==this._bad)
{col=$iTXT.debug.Util.HL_COL_SKIP;}
$iTXT.debug.Util.hilite(n,col,bor,true);}
return true;}
else
{return false;}},_processNodes:function(n,nodeList,params,parent)
{var rA=[];var killChildren=('a'==this.t)?true:false;var hasContent=false;var hasUrl=false;for(var i=0,len=nodeList.length;i<len;i++)
{var thisChild=nodeList[i];if(this._isBad(thisChild))
{continue;}
var noContentTags={"br":true,"hr":true};if(thisChild.tagName&&noContentTags[thisChild.tagName.toLowerCase()])
{continue;}
var node=new $iTXT.data.Context.Node(thisChild,params,parent);if(1==this.h&&null!==node.h&&undefined!==node.h)
{delete this.h;}
if(node.u)
{hasUrl=true;}
if(node.c&&"std"==node.t)
{if(parent&&parent.t&&"std"!==parent.t)
{node.t=parent.t;}
hasContent=true;}
if("a"==this.t&&hasContent&&hasUrl)
{killChildren=false;}
if($iTXT.data.Context.treeObjectMode)
{var cId=$iTXT.data.Dom.setNodeId(thisChild);node=node.simplify();if(null!==node)
{var next=rA.length;rA[next]=node;if(cId)
{$iTXT.data.Dom.nodeIds[cId]=rA[next];}}}
else
{var json=node.serialise();if('{}'!==json)
{rA[rA.length]=json;}
node=null;}}
if(killChildren)
{rA=[];}
return rA;},_setChildren:function(n,params,assessment,parent)
{var children=this._childTags||[];if(null===this.x)
{this.x=[];}
if(children.length>0)
{children=this._processNodes(n,children,params,parent);if(children.length>0)
{this.x=this.x.concat(children);}}},_setContent:function(n,params,assessment,parent)
{if(!parent)
{parent={};}
var cont=null;if(('title'==parent.t||'title'==this.t)&&n.innerText)
{cont=$itxtUtil.cleanString(n.innerText);}
var contents=[];if(null!==cont)
{contents=[cont];}
if(this._childTexts)
{contents=contents.concat(this._childTexts);delete this._childTexts;}
if(this._childAttrs)
{contents=contents.concat(this._childAttrs);delete this._childAttrs;}
var res=[];for(var i=0,l=contents.length;i<l;i++)
{var content=contents[i],cN=null,cT=null;var nT=content.nodeType;if(nT&&nT==$itxtUtil.TEXT_NODE)
{cN=content;content=$itxtUtil.cleanString(content.nodeValue);}
else if(nT&&nT==$itxtUtil.ATTRIBUTE_NODE)
{cN=content;cT=content.nodeName.toLowerCase();content=$itxtUtil.cleanString(content.nodeValue);}
else
{cN=n;}
if(null!==content&&content.length>1)
{content=content.replace(/\\/g,'\\\\');content=content.replace(/"/g,'\\"');content=content.replace(/<.*>|\{|\}/g,"");var inst=this.simplify(true)||{};delete inst.p;delete inst.w;if(cT)
{inst.t=cT;inst.h=1;if('title'==inst.t&&this.t&&'title'!==this.t)
{inst.t=this.t+'-'+inst.t;}
if(('href'==inst.t||'src'==inst.t)&&this.t)
{inst.t=this.t;}
if('content'==inst.t)
{inst.t='meta';}}
if(1!==this.p&&1!==parent.p)
{if(content.length>params.mintextlength&&this._relatedBPNs(cN,params))
{inst.p=1;this.p=null;this._addParagraphNode();}}
var t=this.t||parent.t;if(params.mintextlength>0&&content.length<params.mintextlength&&inst.p!==1&&this.p!==1&&parent.p!==1&&t!=="h"&&t!=="title"&&this._childTags.length===0&&t!=="meta")
{if(!assessment.isContent)
{assessment.isContent=false;}
this._bad=$iTXT.data.Context.BAD_SHORT;continue;}
if(content.length!==0){var std=((this.t&&'std'==this.t)||(parent.t&&'std'==parent.t)||(!parent.t&&!this.t))?true:false;if(std)
{var pN=n.parentNode;var tN=n.tagName||pN.tagName;if(null!==tN)
{if(tN.toLowerCase)
{tN=tN.toLowerCase();}
if('strong'==tN||'b'==tN)
{inst.t='b';}
else if('em'==tN||'i'==tN)
{inst.t='i';}
else if('u'==tN)
{inst.t='u';}
else if('li'==tN)
{inst.t='l';}}
std=true;tN=n.tagName||pN.tagName;if(null!==tN)
{if(tN.toLowerCase)
{tN=tN.toLowerCase();}
if('strong'==tN||'b'==tN)
{this.t='b';}
else if('em'==tN||'i'==tN)
{this.t='i';}
else if('u'==tN)
{this.t='u';}
else if('li'==tN)
{this.t='l';}}}
if('title'==parent.t||'title'==this.t)
{$iTXT.data.Context.pageTitle=$itxtUtil.cleanString(content);inst.h=1;this.h=1;}
var h=inst.h||this.h;if(null===h||undefined===h||h<1)
{if(!inst.t)
{inst.t='std';}
$iTXT.data.Context.textNodes[$iTXT.data.Context.textNodes.length]=cN;inst.n=$iTXT.data.Context.textNodes.length;assessment.isContent=true;var currPara=$iTXT.data.Context.paragraphNodes.length-1;if(currPara>=0)
{$iTXT.data.Context.paragraphNodes[currPara].push(cN);}}
var rX=/([^\w\s\-\!\"#$&\'()*+,.\/:;<=>?@[\\\]\^_`{|}~])/g;if(content.match(rX))
{content=content.replace(rX,function(s)
{return encodeURIComponent(s);});}
$iTXT.data.Context.harvestedCount++;if(cT&&$itxtUtil.isURL(content))
{if(content.indexOf('javascript:')===0)
{if(!assessment.isContent)
{assessment.isContent=false;}
continue;}
inst.u=content;}
else
{inst.c=content;}
if(1==inst.h)
{inst.h=0;}
res[res.length]=inst;}}}
if(res.length>0)
{if(this.x)
{this.x=this.x.concat(res);}
else
{this.x=res;}}},_setHookable:function(n,params,assessment,parent)
{if('meta'==this.t)
{this.h=1;return;}
var v=this.v||((parent)?parent.v:null);if(parent&&1==parent.h&&(v||!assessment.hasHooknodes))
{var keepCalmAndCarryOn=false;if(v)
{keepCalmAndCarryOn=$iTXT.data.Dom.dynamicContentStates[v];}
if(!keepCalmAndCarryOn)
{this.h=1;return;}}
if(null!==parent&&null===parent.h&&null!==this.t&&('alt'==this.t||('h'==this.t&&!$iTXT.data.Context.hookableHeaders[this.tn])||'img'==this.t||'meta'==this.t||'title'==this.t||'url'==this.t))
{this.h=1;if(parent&&assessment.hasHooknodes&&!parent.isHooknode&&('alt'==this.t||'h'==this.t))
{this._bad=$iTXT.data.Context.BAD_NOT_CONTENT;}
return;}
if((!assessment.hasHooknodes&&(assessment.isSkipnode||parent.isSkipnode))||(assessment.hasHooknodes&&((!assessment.isHooknode&&!parent.isHooknode)||(parent.isHooknode&&assessment.isSkipnode))))
{this.h=1;return;}},_lenOK:function(n,params)
{var textLength=$iTXT.data.Context.nodeTextLengths[n.itxtNodeId];if(undefined===textLength)
{if(params.maxnodedepth&&params.maxnodedepth>-1&&$iTXT.data.Context.currentDepth>=params.maxnodedepth)
{return false;}
textLength=$iTXT.data.Dom.getInnerTextLength(n);$iTXT.data.Context.nodeTextLengths[n.itxtNodeId]=textLength;}
if(!params.mintextlength||isNaN(params.mintextlength)||params.mintextlength<0)
{params.mintextlength=1;}
return(textLength>=params.mintextlength);},_childBPNs:function(n,params)
{if(null!==this._childTags)
{var cNodes=this._childTags;var i=cNodes.length;while(i--)
{var cNode=cNodes[i];var childA=$iTXT.data.Context.loadAssessment(cNode);if(!childA||!$itxtUtil.isObject(childA))
{childA=params.assessor.assess($iTXT.data.Dom.parseElement(cNode,params.intattrs));$iTXT.data.Context.saveAssessment(cNode,childA);}
if(childA.isBreaknode)
{return true;}}}
return false;},_relatedBPNs:function(n,params)
{var cands=[];if(null!==n.parentNode&&$itxtUtil.ELEMENT_NODE==n.parentNode.nodeType)
{cands[cands.length]=n.parentNode;}
if(null!==n.previousSibling&&$itxtUtil.ELEMENT_NODE==n.previousSibling.nodeType)
{var pS=n.previousSibling;while(pS)
{cands[cands.length]=pS;pS=pS.previousSibling;}}
if(null!==n.nextSibling&&$itxtUtil.ELEMENT_NODE==n.nextSibling.nodeType)
{var nS=n.nextSibling;while(nS)
{cands[cands.length]=nS;nS=nS.nextSibling;}}
for(var i=0,len=cands.length;i<len;i++)
{var cand=cands[i];if(cand&&cand.nodeType&&$itxtUtil.ELEMENT_NODE==cand.nodeType)
{var candA=$iTXT.data.Context.loadAssessment(cand);if(!candA||!$itxtUtil.isObject(candA))
{candA=params.assessor.assess($iTXT.data.Dom.parseElement(cands[i],params.intattrs));$iTXT.data.Context.saveAssessment(cands[i],candA);}
if(candA.isBreaknode)
{return true;}}}
return false;},_setParagraph:function(n,params,assessment,parent)
{delete this.p;if(!assessment.isSkipnode)
{if(!parent||!parent.p||1!=parent.p)
{if((!parent||!parent.t||("title"!=parent.t&&"h"!=parent.t))&&(!this.t||("title"!=this.t&&"h"!=this.t))&&(!this.h||1!=this.h))
{if(!this._childBPNs(n,params))
{if(this._lenOK(n,params)&&(assessment.isBreaknode||assessment.isUnbreaknode))
{this.p=1;}}}}}
if(1==this.p)
{this._addParagraphNode();}},_setType:function(n,params,assessment,parent)
{delete this.t;if(assessment.isExcludenode&&!assessment.isContentnode)
{this._bad=$iTXT.data.Context.BAD_EXCL;return;}
var nN=n.nodeName.toLowerCase();if('img'==nN)
{this.t="img";}
else if("title"==nN||"meta"==nN||"a"==nN)
{if('meta'==nN&&!assessment.isContentnode)
{this._bad=$iTXT.data.Context.BAD_NOT_CONTENT;return;}
this.t=nN;}
else if('h'==nN.substr(0,1)&&!isNaN(nN.substr(1,1)))
{var hLevel=nN.substr(1,1);if(hLevel<=params.maxheaderdepth||$iTXT.data.Context.hookableHeaders[nN])
{this.t="h";}}
if(!this.t)
{this.t="std";if(parent.t)
{this.t=parent.t;}}},_notValidDynamicElement:function(node){return!node.nodeType||$itxtUtil.ELEMENT_NODE!=node.nodeType||this.h;},_notDynamic:function(node,assessment){return this._notValidDynamicElement(node)||!assessment.isDynamicnode||assessment.isSkipnode;},_setDynamicContent:function(node,params,assessment){var element_active;if(this._notDynamic(node,assessment)){return;}
if($iTXT.data.Dom.assessDynamicContent(node)){this.v=$iTXT.data.Dom.dynamicContentSections[this._nId];element_active=$iTXT.data.Context.dynamicContentHandler.getDynamicContentState(node);if(!$iTXT.data.Context.changedContentSections[this.v]){$iTXT.data.Context.changedContentSections[this.v]={dynamicContentURL:''};}
if(!params.dynscanwholepage||!element_active){}
if(!element_active){this.h=1;$iTXT.data.Context.getDynamicContentURL(this.v);}else{if(!$iTXT.data.Context.changedContentSections[this.v]){var dcURL=$iTXT.glob.params.get('refurl');$iTXT.data.Context.changedContentSections[this.v]={dynamicContentURL:dcURL};if(!$iTXT.data.Context.dynamicContentURLs[dcURL]){$iTXT.data.Context.dynamicContentURLs[dcURL]={};}
$iTXT.data.Context.dynamicContentURLs[dcURL].sent=true;}else{$iTXT.data.Context.getDynamicContentURL(this.v);}}
if(!$iTXT.data.Context.dynScanned){var nId=$iTXT.data.Dom.setNodeId(node);if(!VM._.isObject($iTXT.data.Dom.nodeIds[nId])){$iTXT.data.Dom.nodeIds[nId]=this;}
$iTXT.data.Context.dynamicContentHandler.strategy(node);}}},_setWeight:function(n,params,assessment)
{if(assessment.isWeightset)
{this.w=assessment.weightset;delete assessment.weightset;}},_suicide:function()
{for(var fN in this)
{if('function'!=typeof this[fN])
{delete this[fN];}}}}),determineCompatMode:function()
{var nds=document.getElementsByName('intelliTxt');if(nds&&nds.length===0)
{nds=document.getElementsByName('intelliTXT');}
if(nds&&nds.length>0)
{return'v1';}
if(document.getElementById('intelliTxt'))
{return'v1';}
if(document.getElementById('intelliTXT'))
{return'v1';}
var hkNodes=$iTXT.data.Context.params.get("hooknodes",[]);if(hkNodes.length>1)
{return'v1';}
return'v2';},getContent:function()
{if($iTXT.data.Context.dynScanned)
{return;}
this.metrics=this.params.get('metrics',0);this.setContextFull();this.setDynamicContentMode();if(this.dynamicContentMode){this.setDynamicContentType();this.setDynamicContentThreshold();}
this.setTreeObjectMode();this.setPageTitle();var startNodes=this.getStartNodes();var timeoutName='timeout.light';if(this.contextFull)
{timeoutName='timeout.full';}
if($iTXT.core.Browser.is("Explorer",8,2))
{timeoutName+='.ie';}
this.params.set("timeout",this.params.get(timeoutName,1500),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);if(!this.contextFull)
{this.params.set('excludenodes',this.params.get('excludenodes').concat('<img>'),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);if(null===this.params.get('hooknodes',null))
{this.params.set('excludenodes',this.params.get('excludenodes').concat(this.params.get('skipnodes')),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.params.set('skipnodes',[],$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}
else
{}}
else
{this.preprocessImages(this.params);}
this.preprocessExcludeNodes(this.params);var oParams={};var sA=new $iTXT.data.Dom.SelectorAssessor();var pL=this.params.list();for(var i=0,len=pL.length;i<len;i++)
{var pK=pL[i].toLowerCase();var pV=this.params.get(pK);if(null!==pV&&undefined!==pV)
{if(VM._.isArray(pV)&&pV.length>0)
{var nodes=[],oths=[];if(pV[0].match(/:/))
{for(var j=0,lenj=pV.length;j<lenj;j++)
{var bits=pV[j].split(':');nodes[nodes.length]=bits[0];oths[oths.length]=bits[1]||1;}
pV=nodes;}
sA.add($iTXT.data.Dom.parseVMNode(pV),pK.replace(/s$/,''),oths);pV=null;}}
if(pK&&pV)
{oParams[pK]=pV;}}
if(sA.count()>0)
{this.params.set('assessor',sA);oParams.assessor=sA;if(this.metrics&$iTXT.debug.Util.ECH_ASSESS_DUMP_INPUT)
{if($iTXT.debug.Util.isLoggingOn())
{}}}
if(this.dynamicContentMode)
{oParams.dynscanwholepage=('*'==this.params.get('dynamicnodes',[])[0]);}
if(!this.timings||!$itxtUtil.isObject(this.timings))
{this.timings={};}
this.timings.cStart=new Date().getTime();var trees=[];this.params.set('oparams',oParams);for(i=0,len=startNodes.length;i<len;i++)
{var tc=new Date().getTime();tc=tc-this.timings.cStart;if(tc>oParams.timeout)
{break;}
var sN=startNodes[i];var tree=new this.Node(sN,oParams);if(this.treeObjectMode)
{tree=tree.simplify();}
else
{tree=tree.serialise();if('{}'==tree)
{tree=null;}}
if(null!==tree)
{trees[trees.length]=tree;}}
this.tree=(this.treeObjectMode)?{x:trees}:'{x:['+trees.join(',')+']}';var msgM='completed before timeout of '+oParams.timeout+'ms';if(this.timedOut||undefined!==this.timings.cEnd)
{msgM='reached timeout of '+oParams.timeout+'ms';this.timedOut=true;this.lastTimeOut=oParams.timeout;}
else
{this.timings.cEnd=new Date().getTime();}
this.lastTime=(this.timings.cEnd-this.timings.cStart);if($iTXT.debug.Util.isLoggingOn())
{var sTree=(this.treeObjectMode)?$itxtUtil.serialiseJSON(this.tree,this.allowedFields):this.tree;var json=(this.metrics&$iTXT.debug.Util.ECH_XPAND_JSON)?$itxtUtil.formatJSONString(sTree,true):sTree;}
if(this.metrics&$iTXT.debug.Util.ECH_TEXTNODES_DUMP)
{var hnl=$iTXT.data.Context.textNodes.length;if(hnl>0)
{var dbNodes='<b style="color:blue;">ECH:</b> Hookable text nodes are:';for(var k=0;k<hnl;k++)
{var nV=$itxtUtil.cleanString($iTXT.data.Context.textNodes[k].nodeValue);dbNodes+='<br />'+k+': '+((nV.length>72)?nV.substr(0,70)+'...':nV)+' ('+nV.length+')';}}}},getProcessedPercentage:function()
{if(this.processedElementsCount>0&&this.eligibleElementsTotal>0)
{return Math.round((this.processedElementsCount/this.eligibleElementsTotal)*100);}
else
{return-1;}},getDynamicContentURL:function(sId){var ccSec=this.changedContentSections[sId],dcURL='';var aURL=$iTXT.glob.params.get('refurl','').split('?',2);var cURL=document.location.href.split('?')[0];if(aURL!=cURL){dcURL=cURL;}
else if(ccSec&&ccSec.dynamicContentURL){dcURL=ccSec.dynamicContentURL;}
else{dcURL=aURL[0]+'¤itxtSec'+sId;if(aURL[1]){dcURL+='?'+aURL[1];}}
if(undefined===ccSec||null===ccSec){ccSec=this.changedContentSections[sId];}
ccSec.dynamicContentURL=dcURL;this.setDynamicContentUrlReady(dcURL);return dcURL;},getStartNodes:function()
{if(!this.timings||!$itxtUtil.isObject(this.timings))
{this.timings={};}
this.timings.snStart=new Date().getTime();var rA=[];if(this.contextFull)
{if($iTXT.data.Context.params&&$iTXT.data.Context.params.get('contentnodes'))
{var heads=document.getElementsByTagName('head');var cN=$iTXT.data.Dom.parseVMNode($iTXT.data.Context.params.get('contentnodes'));var tags={};for(var k=0,lenk=cN.length;k<lenk;k++)
{if(cN[k].tag)
{tags[cN[k].tag]=true;}}
for(var j=0,lenj=heads.length;j<lenj;j++)
{for(var tag in tags)
{var tA=heads[j].getElementsByTagName(tag);for(var l=0,lenl=tA.length;l<lenl;l++)
{rA[rA.length]=tA[l];}}}
if(rA.length>0)
{}}}
else
{}
var detectedVersion=this.determineCompatMode();var overrideVersion=this.params.get('compatmode');var cM=this.params.get('compatmode',detectedVersion);var nA=document.getElementsByTagName('*');this.pageElementsTotal=nA.length;var hookNodes=this.params.get("hooknodes",null);this.hookableHeaders={};if(null!==hookNodes&&hookNodes.length>0)
{var hRegEx=new RegExp("<(h[0-9])>","i");for(var i=0;i<hookNodes.length;i++)
{var hn=hookNodes[i];var m=hRegEx.exec(hn);if(m)
{this.hookableHeaders[m[1].toLowerCase()]=true;}}}
if("v1"==cM)
{var assessor;if(null!==hookNodes&&hookNodes.length>0)
{assessor=new $iTXT.data.Dom.SelectorAssessor();assessor.add($iTXT.data.Dom.parseVMNode(hookNodes),'startnode');}
for(var n=0,lenn=nA.length;n<lenn;n++)
{var nd=nA[n];var assessment={'isStartnode':false};if(assessor)
{assessment=assessor.assess($iTXT.data.Dom.parseElement(nd));}
var nameAttr=nd.getAttribute('name');if((VM._.isString(nd.id)&&'intellitxt'==nd.id.toLowerCase())||(nameAttr&&VM._.isString(nameAttr)&&'intellitxt'==nameAttr.toLowerCase())||assessment.isStartnode)
{if(this.metrics&$iTXT.debug.Util.ECH_TEXTNODES_DUMP)
{}
rA[rA.length]=nd;}}
this.params.set("mintextlength",0);this.params.set("compatmode","v1");var hN=this.params.get("hooknodes",null);if(hN&&VM._.isArray(hN))
{hN[hN.length]='intellitxt';hN[hN.length]='!intellitxt';}
this.params.set("hooknodes",hN);if(rA.length===0)
{}}
else
{this.params.set("compatmode","v2");var bN=document.getElementsByTagName('body');for(var o=0,leno=bN.length;o<leno;o++)
{var nod=bN[o];if(this.metrics&$iTXT.debug.Util.ECH_TEXTNODES_DUMP)
{}
rA[rA.length]=nod;}}
this.timings.snEnd=new Date().getTime();return rA;},loadAssessment:function(n)
{if(!n||!n.itxtNodeId||!this.nodeAssessments[n.itxtNodeId])
{return null;}
return this.nodeAssessments[n.itxtNodeId];},modifyTree:function()
{var _iter=function(s,tA)
{var spliced=[];for(var tI=0,tL=tA.length;tI<tL;tI++)
{var tC=tA[tI];if(tC.newTree)
{var nId=tC.nodeId;var k=tC.fieldName;var v=tC.fieldValue;var t=tC.newTree;if(s[k]&&v==s[k])
{for(var f in s)
{delete s[f];}
for(var m in t)
{s[m]=t[m];}
if(nId)
{$iTXT.data.Dom.nodeIds[nId]=s;}
spliced.push(nId);tA[tI]={};}}}
if(1==s.p)
{var currL=pNodes.length;if(currL>0)
{var lastM=currL-1;var lastP=pNodes[lastM];if(!lastP||0===lastP.length)
{currL=lastM;}}
pNodes[currL]=[];}
if(s.n)
{var n=$iTXT.data.Context.textNodes[s.n-1];tNodes[tNodes.length]=n;s.n=tNodes.length;var currPara=pNodes.length-1;if(currPara>=0)
{pNodes[currPara].push(n);}}
if(s.x&&s.x.length&&s.x.length>0)
{for(var i=0,l=s.x.length;i<l;i++)
{var rIds=_iter(s.x[i],tA);if(rIds.length>0)
{spliced=spliced.concat(rIds);}}}
return spliced;};var dS=[];if(this.modifiedTrees.length)
{var pNodes=[],tNodes=[];dS=_iter(this.tree,this.modifiedTrees);if(dS.length>0)
{this.paragraphNodes=pNodes;this.textNodes=tNodes;}
this.modifiedTrees=[];}
return dS;},setDynamicContentUrlReady:function(dcURL){if(!this.dynamicContentURLs[dcURL]){this.dynamicContentURLs[dcURL]={sent:false};}},_alreadyScanning:function(){if($iTXT.data.Context.dynamicContentHandler.isMutation&&$iTXT.data.Context.dynScanned){return true;}
return false;},_isInvalidNode:function(contentNode,dcSec,nodeId){if(!VM._.isObject(contentNode)){return true;}else if(!dcSec){return true;}
return false;},_recontextualiseSubtree:function(node,nodeId,contentNode,oParams){this.timings.cStart=new Date().getTime();this.harvestCount++;this.modifiedTrees.push({nodeId:nodeId,fieldName:'v',fieldValue:contentNode.v,newTree:new this.Node(node,oParams).simplify()});this.timings.cEnd=new Date().getTime();},_reinitialise:function(dcSec,doneFlag,dcURL){var tmpDispArr=[];$iTXT.subscribe("$iTXT:tmpl:load",$iTXT.core.Event.bind($iTXT.itxt.currentController,$iTXT.itxt.currentController.templatesLoad),tmpDispArr);$iTXT.itxt.currentController.templateLoadUnSubFunc=tmpDispArr.pop();$iTXT.itxt.currentController.initialiserLoaded=false;$iTXT.itxt.currentController.limitClientParams=['page.md5','pvm','pvu','sid'];$iTXT.itxt.currentController.skipRecontext=doneFlag;$iTXT.itxt.currentController.dropInitialiser();if(!this.dynamicContentURLs[dcURL]){this.dynamicContentURLs[dcURL]={};}
this.dynamicContentURLs[dcURL].sent=true;},_echMetrics:function(){if(this.metrics&$iTXT.debug.Util.ECH_TEXTNODES_DUMP){var hnl=$iTXT.data.Context.textNodes.length;if(hnl>0){var dbNodes='<b style="color:#ff6600;">ECH:</b> Hookable text nodes are:';for(var j=0;j<hnl;j++){var nV=$itxtUtil.cleanString($iTXT.data.Context.textNodes[j].nodeValue);dbNodes+='<br />'+j+': '+'('+nV.length+') '+((nV.length>73)?nV.substr(0,70)+'...':nV);}}}},_processDynamicNode:function(dcURL,dcSec){$iTXT.glob.params.set('refurl',dcURL,100);this.modifyTree();this.lastTime=(this.timings.cEnd-this.timings.cStart);if($iTXT.debug.Util.isLoggingOn()){var sTree=$itxtUtil.serialiseJSON(this.tree,this.allowedFields);var json=(this.metrics&$iTXT.debug.Util.ECH_XPAND_JSON)?$itxtUtil.formatJSONString(sTree,true):sTree;}
this._echMetrics();},onContentStateChange:function(node){if(this._alreadyScanning()){return;}
$iTXT.data.Context.dynScanned=true;var nodeId=$iTXT.data.Dom.setNodeId(node);var contentNode=$iTXT.data.Dom.nodeIds[nodeId];var dcSec=contentNode.v;if(this._isInvalidNode(contentNode,dcSec,nodeId)){return;}
var oParams=this.params.get('oparams');this._recontextualiseSubtree(node,nodeId,contentNode,oParams);var dcURL=this.getDynamicContentURL(dcSec);this.setDynamicContentUrlReady(dcURL);this.setPageTitle();var doneFlag=false;if($iTXT.data.Context.dynamicContentHandler.isMutation){doneFlag=this.dynamicContentURLs[dcURL].sent;}
var dcState=$iTXT.data.Context.dynamicContentHandler.getDynamicContentState(node);if(dcState){this._processDynamicNode(dcURL,dcSec);this._reinitialise(dcSec,doneFlag,dcURL);}},preprocessExcludeNodes:function(params)
{var fS=new Date().getTime();var eN=params.get('excludenodes',null),badC=0;if(eN&&eN.length)
{var i=eN.length,keep=[];while(i--)
{var tN=eN[i];if('<'==tN.substring(0,1)&&'>'==tN.slice(-1))
{tN=tN.slice(1,-1).toLowerCase();var tags=document.getElementsByTagName('body')[0].getElementsByTagName(tN);var j=tags.length;while(j--)
{var n=tags[j];try
{n.itxtBad=this.BAD_EXCL;badC++;}
catch(x)
{}}}
else
{keep[keep.length]=tN;}}
params.set('excludenodes',keep);}
this.eligibleElementsTotal=this.pageElementsTotal-badC;var fE=new Date().getTime();var fD=(fE-fS);},preprocessImages:function(params)
{var fS=new Date().getTime();var fE=null;var minimagew=params.get('minimagew',300);var minimageh=params.get('minimageh',300);var imgs=document.getElementsByTagName('img');var len=imgs.length,badC=0;var i=len;var fD;var timeout=params.get('timeout.image',params.get('timeout',1500));while(i--)
{var n=imgs[i],bad=false;var imgW=n.width;var imgH=n.height;var imgD="-"+imgW+"x"+imgH;if(minimagew>=0&&minimageh>=0&&(imgW<minimagew||imgH<minimageh))
{bad=this.BAD_SML_IMG;}
else if("-120x600"==imgD||"-160x600"==imgD||"-300x250"==imgD||"-180x150"==imgD||"-728x90"==imgD)
{bad=this.BAD_IAB_IMG;}
if(bad)
{try
{n.itxtBad=bad;badC++;}
catch(x)
{}}
fE=new Date().getTime();fD=(fE-fS);if(fD>timeout)
{break;}}
var proc=len-i-1;var msg=(fD>timeout)?"reached":"completed before";},saveAssessment:function(n,a)
{if(n.nodeType&&n.nodeType==$itxtUtil.ELEMENT_NODE)
{var id=$iTXT.data.Dom.setNodeId(n);$iTXT.data.Context.nodeAssessments[id]=a;}},setContextFull:function()
{var sV=true;var pV=$iTXT.glob.params.get('force.context',-1);if(!$iTXT.js.requiresContextualization)
{sV=false;}
if(pV>=0)
{sV=(pV>0);}
this.contextFull=sV;},setPageTitle:function()
{var t=document.getElementsByTagName('title')[0];if(t)
{if(!!t.childNodes.length)
{this.pageTitle=$itxtUtil.cleanString(t.firstChild.data);}
else if(t.innerText)
{this.pageTitle=$itxtUtil.cleanString(t.innerText);}}},setDynamicContentMode:function()
{var vN=this.params.get('dynamicnodes',[]);this.dynamicContentMode=(vN.length>0);if(this.dynamicContentMode){var resetFlag=function(){window.setTimeout(function(){$iTXT.data.Context.dynScanned=false;},1000);};$iTXT.subscribe("$iTXT:initialiser:load:complete",resetFlag);$iTXT.subscribe("$iTXT:hooks:loaded",resetFlag);}},setDynamicContentThreshold:function()
{this.dynamicContentThreshold=this.params.getInt('dynamicthreshold',15);},setDynamicContentType:function(){var dcType=this.params.get('dynamictype','mutation');this.dynamicContentHandler=this.observationTypes.mutationObserver;if('transform'==dcType){this.dynamicContentHandler=this.observationTypes.transform;}else if('mutation'==dcType){if(window.MutationObserver||window.WebKitMutationObserver){this.dynamicContentHandler=this.observationTypes.mutationObserver;}else if(window.MutationEvent){this.dynamicContentHandler=this.observationTypes.mutationEvents;}else{this.dynamicContentMode=false;}}
if(!!this.dynamicContentHandler){}},setTreeObjectMode:function()
{var pV=$iTXT.glob.params.get('context.tree.object',0);this.treeObjectMode=!!(this.dynamicContentMode||pV>0);}};};$iTXT.js.loader["$iTXT.data.Country"]=true;$iTXT.data.Country_Load=function(){var undefined;$iTXT.data.Country={langs:{de:"de",at:"de",ch:"de",fr:"fr",gb:"en-gb",uk:"en-gb",it:"it",nl:"nl",se:"sv",no:"no",dk:"da",jp:"ja",cn:"zh",es:"es",fi:"fi",pl:"pl",ru:"ru",pt:"pt"},translations:{en:{sCC:"$",sspl:"Advertisement",swti:"What's this?",slm:"LEARN MORE",ssch:"Searching...",sbn:"Buy now",scls:"Close",sEet:"End time",sEcb:"Place bid",sEsn:"Seller",ierao:"Related Articles on ",iera:"Related Articles",wcfa:"Featured article",iist:"Shop for items related to ",iirt:"Search the web for info related to ",iimsnt:"Live Search for ",iivt:"Show video related to ",iiat:"Information related to ",gRCSrcTSt:"Search this site:",gRCSrc:"Search",gRCMor:"MORE",gROTE:"Roll over to expand",gCTLM:"Click to learn more","TRANS.PRECS":"${SCC}","TRANS.POSTCS":"","TRANS.PRICE":"Price","TRANS.DECIMALPLACE":".","TRANS.SEARCH":"Search","trans.moreres":'More Results',"trans.visitstore":'Visit Store',"trans.gotostore":'Go to store',"trans.privacyicon.txt":'AdChoices',"trans.expanding":'Expanding...',"trans.ad":"Ad","trans.progressbar":"Click or hover to expand","trans.from":"from","trans.more":"more"},"en-gb":{sCC:"&pound;","trans.privacyicon.txt":'AdChoices'},fr:{sCC:"&euro;",sspl:"Publicit&#233;",swti:"Qu'est-ce que c'est?",sbn:"Achat maintenant",scls:"Fermer",sEet:"Temps restant",sEcb:"Ench&#233;rir",sEsn:"Vendeur",ierao:"Articles connexes sur ",iera:"Articles connexes",wcfa:"Article phare",iist:"Boutique pour les produits apparent&#233;s &#224; ",iirt:"Rechercher sur le web une info apparent&#233;e &#224; ",iivt:"Visualiser les vid&#233;os apparent&#233;es &#224; ",iiat:"Information apparent&#233;e &#224; ",gRCSrcTSt:"Rechercher sur le site:",gRCSrc:"Rechercher",gRCMor:"PLUS",gROTE:"Agrandir la vid\u00E9o",gCTLM:"En savoir plus","TRANS.DECIMALPLACE":",","TRANS.SEARCH":"Rechercher","trans.moreres":'Plus',"trans.visitstore":'Boutique en ligne',"trans.gotostore":'Aller &#224 la boutique',"trans.privacyicon.txt":'Choisir sa pub',"trans.expanding":'Chargement...',"trans.ad":"Publicit&#233;"},de:{sCC:"&euro;",sspl:"Werbung",swti:"was ist das?",sbn:"Jetzt kaufen",scls:"Schlie&#223;en",sEet:"Angebotsende",sEcb:"Bieten",sEsn:"Verk&#228;ufer",ierao:"Themenverwandte Artikel ",iera:"Themenverwandte Artikel",wcfa:"Artikelhighlight",iist:"Finden Sie weitere Produkte zum Thema ",iirt:"Finden Sie weitere Informationen zum Thema ",iivt:"Videos zum Thema ",iiat:"Weitere Informationen zum Thema ",gRCSrcTSt:"Suche auf:",gRCSrc:"Suchen",gRCMor:"MEHR INFO",mlm:true,gROTE:"Hier Vergr\u00F6ssern",gCTLM:"Mehr Info",TR_PRICE:"Aktuell","TRANS.PRECS":" ","TRANS.POSTCS":" ${SCC}","TRANS.DECIMALPLACE":",","TRANS.SEARCH":"Suchen","trans.moreres":'Mehr',"trans.visitstore":'Zum Shop',"trans.gotostore":'Zum Shop',"trans.privacyicon.txt":'Werbung',"trans.expanding":'Video L&#228;dt...',"trans.ad":"Werbung","trans.from":"ab","trans.more":"mehr"},es:{sCC:"&euro;",sspl:"Publicidad",swti:"&#191; Qu&#233; es esto?",scls:"cierre",ierao:"Otros art&#237;culos sobre ",iera:"Otros art&#237;culos",wcfa:"Art&#237;culo principal",iist:"Compra art&#237;culos relacionados con ",iirt:"B&#250;squeda para informaci&#243;n relacionado con ",iivt:"Mostrar video relacionado con ",iiat:"Informaci&#243;n relacionado con ",gRCSrcTSt:"B&#250;squeda del sitio:",gRCSrc:"Buscar",gRCMor:"M&#193;S",gROTE:"Pasar por encima",gCTLM:"Haz clic aqu\u00ED","TRANS.DECIMALPLACE":",","TRANS.SEARCH":"Buscar","trans.moreres":"M&#225;s","trans.visitstore":'Ir a tienda',"trans.gotostore":'Ir a tienda',"trans.privacyicon.txt":'Publicidad',"trans.expanding":'Cargando video...',"trans.ad":"Publicidad"},it:{sCC:"&euro;",sspl:"Pubblicit&#224;",swti:"Che cos'&#232;?",sbn:"Compra ora",scls:"Chiudi",sEet:"Ora di scadenza",sEcb:"Fai un'offerta",sEsn:"Venditore",ierao:"Altri articoli su ",iera:"Altri articoli",wcfa:"In primo piano",iist:"Acquista prodotti in relazione a ",iirt:"Cerca nel web informazioni su ",iivt:"Mostra video su ",iiat:"Informazioni su ",gRCSrcTSt:"Cerca nel sito:",gRCSrc:"Cerca",gRCMor:"VAI",gROTE:"Passa il cursore qui sopra",gCTLM:"Clicca qui","TRANS.DECIMALPLACE":",","TRANS.SEARCH":"Cerca","trans.moreres":"Vai","trans.visitstore":'Visita il negozio',"trans.gotostore":'Visita il negozio',"trans.privacyicon.txt":'Scegli tu!',"trans.expanding":'Caricamento video...',"trans.ad":"Pubblicit&#224;"},nl:{sCC:"&euro;",sspl:"Advertentie",swti:"Wat is dit?",scls:"Sluiten",sEet:"End time",iist:"Shop voor een item in verband met ",iirt:"Zoek op het net voor informatie in verband met ",iivt:"Laat een video zien in verband met ",iiat:"Informatie in verband met ",gRCSrcTSt:"Zoeken op deze site:",gRCSrc:"Zoeken",gRCMor:"MEER",gROTE:"Wijs aan en vergroot",gCTLM:"Klik voor meer info","TRANS.DECIMALPLACE":",","TRANS.SEARCH":"Zoeken","trans.moreres":"Meer","trans.privacyicon.txt":'Info',"trans.ad":"Advertentie"},sv:{sCC:"kr ",sspl:"Annons",swti:"Vad &#228;r detta?",sbn:"K&#246;pa nu",scls:"St&#228;nga",sEet:"Sluttid",sEcb:"L&#228;gg bud",sEsn:"s&#228;ljare",iist:"Handla varor relaterade till ",iirt:"S&#246;k p&#229; webben f&#246;r info relaterad till ",iivt:"Spela upp video relaterad till ",iiat:"Information relaterad till ",gRCSrcTSt:"S&#246;k p&#229; sidan:",gRCSrc:"S&#246;k",gRCMor:"MER",gROTE:"F\u00F6rstora med musen",gCTLM:"Klicka f\u00F6r mer info","TRANS.SEARCH":"S&#246;k","trans.moreres":"Mer","trans.privacyicon.txt":'Annonsval',"trans.ad":"Annons"},no:{sCC:"kr ",sspl:"Annonse",sspls:"Annonse",swti:"Hva er dette?",sbn:"Kj\u00D8p n\u00E5",scls:"Lukk vindu",sEet:"Sluttdato",sEcb:"Legg inn bud",sEsn:"Selger",iist:"Shop etter relaterte produkter ",iirt:"S&#248;k p&#229; nettet for mer informasjon av ",iivt:"Se video p&#229; ",iiat:"Informasjon relatert til ",gRCSrcTSt:"S&#248;k p&#229; siden:",gRCSrc:"S&#248;ke",gRCMor:"MER",gROTE:"Mus over og utvid",gCTLM:"Klikk for \u00E5 se mer","TRANS.SEARCH":"S&#248;ke","trans.moreres":"Mer","trans.privacyicon.txt":'Annonsevalg',"trans.ad":"Annonse"},da:{sCC:"kr ",sspl:"Annonce",swti:"Hvad er dette?",sbn:"K\u00D8b nu",scls:"Luk vindue",sEet:"Slut",sEcb:"Byd",sEsn:"S\u00E6lger",iist:"Shop for ting relateret til ",iirt:"S&#248;g p&#229; nettet for ting relateret til ",iivt:"Vis video relateret til ",iiat:"Information relateret til ",gRCSrcTSt:"S&#248;g p&#229; siden:",gRCSrc:"S&#248;gning",gRCMor:"MERE",gROTE:"Rul over for st\u00F8rre",gCTLM:"Klik for mere viden","TRANS.SEARCH":"S&#248;gning","trans.moreres":"Mere","trans.privacyicon.txt":'Annoncevalg',"trans.ad":"Annonce"},fi:{sCC:"&euro;",sspl:"Mainos",swti:"Mik&#228; t&#228;m&#228; on?",ssch:"Etsim&#228;ss&#228;...",scls:"Sulje",gROTE:"Kohdista suurentaaksesi",gCTLM:"Klikkaa lis\u00E4tietoja","trans.privacyicon.txt":'Mainokseni',"trans.ad":"Mainos"},ru:{sCC:"\u0440\u0443\u0431",sspl:"\u0420\u0435\u043A\u043B\u0430\u043C\u0430",swti:"\u0447\u0442\u043E \u044D\u0442\u043E?",slm:"\u0423\u0437\u043D\u0430\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435",ssch:"\u041F\u043E\u0438\u0441\u043A...",sbn:"\u041A\u0443\u043F\u0438\u0442\u044C \u0421\u0435\u0439\u0447\u0430\u0441",scls:"\u0437\u0430\u043A\u0440\u044B\u0442\u044C (\u043E\u043A\u043D)",sEet:"\u0414\u043E \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F",sEcb:"\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0442\u0430\u0432\u043A\u0443",sEsn:"\u041F\u0440\u043E\u0434\u0430\u0432\u0435\u0446",ierao:"\u041F\u043E\u0445\u043E\u0436\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 ",iera:"\u041F\u043E\u0445\u043E\u0436\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 ",wcfa:"\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u0421\u0442\u0430\u0442\u044C\u044F",iist:"\u041A\u0443\u043F\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0441\u0445\u043E\u0436\u0438\u0439 \u0441 ",iirt:"\u041F\u043E\u0438\u0441\u043A \u0432 \u0441\u0435\u0442\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043F\u043E ",iivt:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0438\u0434\u0435\u043E \u0441\u0445\u043E\u0436\u0435\u0435 \u0441 ",iiat:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0442\u043D\u043E\u0441\u044F\u0449\u0430\u044F\u0441\u044F \u043A ",gRCSrcTSt:"\u041F\u043E\u0438\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443:",gRCSrc:"\u041F\u043E\u0438\u0441\u043A",gRCMor:"\u0414\u0410\u041B\u0415\u0415",gROTE:"&#1053;&#1072;&#1074;&#1077;&#1076;&#1080;&#32;&#1080;&#32;&#1091;&#1074;&#1077;&#1083;&#1080;&#1095;&#1100;",gCTLM:"&#1055;&#1086;&#1076;&#1088;&#1086;&#1073;&#1085;&#1086;","TRANS.SEARCH":"\u041F\u043E\u0438\u0441\u043A","trans.moreres":"\u0414\u0410\u041B\u0415\u0415","trans.ad":"\u0420\u0435\u043A\u043B\u0430\u043C\u0430"},pl:{sCC:"z\u0142",sspl:"Reklama",swti:"Co to jest?",slm:"DOWIEDZ SI\u0118 WI\u0118CEJ",ssch:"Trwa przeszukiwanie",sbn:"Kup teraz",scls:"Zamknij",sEet:"Koniec",sEcb:"Z\u0142\u00f3\u017c Ofert\u0119",sEsn:"Sprzedawca",iist:"Kupuj powi\u0105zane przedmioty ",iirt:"Szukaj w Internecie Informacji na podobny temat ",iivt:"Poka\u017c Video na podobny temat ",iiat:"Informacja na podobny temat ",gRCSrcTSt:"Szukaj na tej Stronie:",gRCSrc:"Szukaj",gRCMor:"Wi\u0119cej","TRANS.SEARCH":"Szukaj","trans.moreres":"Wi\u0119cej","trans.visitstore":'Odwied\u017a sklep',"trans.gotostore":'Odwied\u017a sklep',"trans.privacyicon.txt":'Informacja',"trans.expanding":'Otwieranie...',"trans.ad":"Reklama"},ja:{sCC:"&yen;",sspl:"\u30b9\u30dd\u30f3\u30b5\u30fc\u30ea\u30f3\u30af",swti:"\u3053\u306e\u5e83\u544a\u306b\u3064\u3044\u3066",sbn:"\u4eca\u8cb7\u7269",scls:"\u9589\u3058\u308b","trans.ad":"\u30b9\u30dd\u30f3\u30b5\u30fc\u30ea\u30f3\u30af"},zh:{sCC:"&yen;",sspl:"\u5e7f\u544a",swti:"\u8fd9\u662f\u4ec0\u4e48\u5e7f\u544a",sbn:"\u4eca\u8cb7\u7269",scls:"\u5173\u5e7f\u544a","trans.ad":"\u5e7f\u544a"},pt:{gROTE:"Clique para aumentar",gCTLM:"Clique para mais info","trans.privacyicon.txt":'Your online choices'}},country:"en",tr:function(name,cc)
{cc=cc||this.country;var lang=this.langs[cc.toLowerCase()]||"en";return this.translations[lang][name]||this.translations["en"][name]||"";},init:function(l)
{this.country=l;for(var prop in this.translations.en)
{$iTXT.glob.dbParams.set(prop,this.tr(prop),$iTXT.cnst.WEIGHTING_DEFAULT_TRANSLATION);}
$iTXT.glob.translationSet={};$iTXT.glob.translationSet.isMLM=(""==this.tr("mlm"))?false:this.tr("mlm");$iTXT.glob.dbParams.set("trans.lang",this.langs[this.country]||"en",$iTXT.cnst.WEIGHTING_DEFAULT_TRANSLATION);}};};$iTXT.js.loader["$iTXT.data.Dom"]=true;$iTXT.data.Dom_Load=function(){var undefined;var $itxtUtil=$iTXT.core.Util;$iTXT.data.Dom={nodeIds:[],Selector:$iTXT.core.Class.create({init:function(tag,id,className,attrs)
{if(null!=tag&&'string'==typeof tag&&""!=tag)
{this.tag=tag.toLowerCase();}
if(null!=id&&'string'==typeof id&&""!=id)
{this.id=id.toLowerCase();}
if(null!=className&&'string'==typeof className&&""!=className)
{this.className=className.toLowerCase();}
if(null!=attrs&&$itxtUtil.isObject(attrs)&&$itxtUtil.objCount(attrs)>0)
{this.attrs={};for(var attr in attrs)
{try
{var tAttr=attrs[attr].toLowerCase();if('string'==typeof tAttr||!isNaN(tAttr))
{this.attrs[attr.toLowerCase()]=tAttr;}}catch(e){}}}}}),SelectorAssessor:$iTXT.core.Class.create({_othHash:{},_tagHash:{},_idHash:{},_classHash:{},_attrHash:{},_intHash:{},_selHash:{},_count:0,_addToHash:function(h,i,k,v)
{var xI={};if(undefined!=h[i])
{xI=h[i];}
var xV=[];if(undefined!=xI[k])
{xV=xI[k];}
if(!VM._.isArray(xV)||$itxtUtil.inArray(xV,v))
{return;}
xV[xV.length]=v;xI[k]=xV;if(k.match&&k.match(/\*/))
{xI.wild=true;}
h[i]=xI;},_extract:function(rO,i,h,s,f)
{if($itxtUtil.isObject(rO)&&$itxtUtil.isObject(i)&&$itxtUtil.isObject(h)&&$itxtUtil.isClass(s)&&'string'==typeof f&&(undefined!=s[f]||'sel'==f))
{var sz=$itxtUtil.flattenJSON(s);for(var intt in i)
{var thisI=i[intt],thisH=h[intt];if(thisI&&'function'!=typeof thisI)
{if(thisH&&$itxtUtil.isObject(thisH))
{var tO=thisH;var comps=[];var match=false;if('sel'==f)
{if(thisH[sz])
{var kN='is'+intt.substr(0,1).toUpperCase()+intt.substr(1);rO[kN]=true;match=true;}}
else
{var sF=s[f];if($itxtUtil.isObject(sF))
{for(var oK in sF)
{var sFoK=sF[oK];if('function'!=typeof sFoK)
{comps.push=sFoK;}}}
else
{comps[comps.length]=sF;}
var cands=[];var j=comps.length;while(j--)
{var comp=comps[j];if(tO[comp])
{cands=cands.concat(tO[comp]);}
else if(tO.wild)
{for(var o in tO)
{var tOo=tO[o];if(VM._.isArray(tOo))
{cands=cands.concat(tOo);}}}}
if(cands.length>0&&$iTXT.data.Dom.findSelector(s,cands,1))
{var kN='is'+intt.substr(0,1).toUpperCase()+intt.substr(1);rO[kN]=true;match=true;}}
if(true==match)
{if(this._othHash[intt]&&this._othHash[intt][sz]&&VM._.isArray(this._othHash[intt][sz]))
{rO[intt]=this._othHash[intt][sz][0];}
delete i[intt];}}}}}
return rO;},add:function(sel,intt,oth)
{if((!$itxtUtil.isClass(sel)&&!VM._.isArray(sel))||'string'!=typeof intt)
{return;}
var sA=[];var oA=[];if(!VM._.isArray(sel))
{sA[0]=sel;}
else
{sA=sel;}
if(!VM._.isArray(oth))
{oA[0]=oth;}
else
{oA=oth;}
if(!$itxtUtil.isClass(sA[0]))
{return;}
var i=sA.length;while(i--)
{sel=sA[i];oth=oA[i];if(undefined==sel.tag&&undefined==sel.id&&undefined==sel.className&&undefined==sel.attrs)
{continue;}
var s=$itxtUtil.flattenJSON(sel);this._intHash[intt]=true;this._addToHash(this._selHash,intt,s,sel);if(undefined!=sel.tag)
{this._addToHash(this._tagHash,intt,sel.tag,sel);}
if(undefined!=sel.id)
{this._addToHash(this._idHash,intt,sel.id,sel);}
if(undefined!=sel.className)
{this._addToHash(this._classHash,intt,sel.className,sel);}
if($itxtUtil.isObject(sel.attrs))
{for(var aN in sel.attrs)
{if('function'!=typeof sel.attrs[aN])
{this._addToHash(this._attrHash,intt,aN,sel);}}}
if(undefined!=oth)
{this._addToHash(this._othHash,intt,s,oth);}
this._count++;}},assess:function(sel,spInt)
{if(!sel instanceof $iTXT.data.Dom.Selector)
{return{};}
var intHash={};if(spInt&&'string'==typeof spInt)
{intHash[spInt]=true;}
else
{for(var k in this._intHash)
{if('function'!=typeof this._intHash)
{intHash[k]=this._intHash[k];}}}
var rO={};for(var intt in intHash)
{if('function'!=typeof intt)
{rO['has'+intt.substr(0,1).toUpperCase()+intt.substr(1)+'s']=true;rO['is'+intt.substr(0,1).toUpperCase()+intt.substr(1)]=false;}}
if($iTXT.core.Browser.is("Explorer"))
{rO=this._extract(rO,intHash,this._selHash,sel,'sel');}
rO=this._extract(rO,intHash,this._tagHash,sel,'tag');if(sel.id)
{rO=this._extract(rO,intHash,this._idHash,sel,'id');}
if(sel.className)
{rO=this._extract(rO,intHash,this._classHash,sel,'className');}
if(sel.attrs)
{rO=this._extract(rO,intHash,this._attrHash,sel,'attrs');}
return rO;},count:function()
{return this._count;},summarise:function(html)
{try
{var op=(html)?'&lt;':'<';var cl=(html)?'&gt;':'>';var nl=(html)?'<br />':'\n';var out=[];for(var intt in this._intHash)
{if('function'!=typeof this._intHash[intt])
{var mems=[];if(undefined!=this._selHash[intt])
{for(var s in this._selHash[intt])
{var sels=this._selHash[int][s];if(sels.length)
{var i=sels.length;while(i--)
{var sel=sels[i];var mem='';if(sel.tag)
{mem+=op+sel.tag+cl;}
else
{}
if(sel.id)
{mem+='#'+sel.id;}
if(sel.className)
{mem+='.'+sel.className;}
if(sel.attrs)
{for(var a in sel.attrs)
{if('function'!=typeof sel.attrs[a])
{mem+='@'+a;if('*'!=sel.attrs[a])
{mem+='='+sel.attrs[a];}}}}
if(this._othHash[intt]&&this._othHash[intt][s])
{mem+=':'+this._othHash[intt][s][0];}
mems[mems.length]=mem;}}}}
mems=mems.join(',');out[out.length]=intt+': '+mems;}}
return out.join(nl);}
catch(x)
{return x.message;}},init:function()
{}}),getElementsByClassName:function(c,n)
{if(!n&&null!=document)
{n=document;}
if(n)
{if(n.getElementsByClassName&&'function'==typeof n.getElementsByClassName)
{return n.getElementsByClassName(c);}
else
{var rN=[];var rX=new RegExp('\\b'+c+'\\b');var aN=n.getElementsByTagName('*');for(var i=0,len=aN.length;i<len;i++)
{if(rX.test(aN[i].className))
{rN[rN.length]=aN[i];}}
return rN;}}},parseSelector:function(selector,vmmode)
{var tag='',separator='',identifier='',value='',out=null;var PATTERN1=(vmmode)?/(\>\@|\>|\!|\@)/:/(\#|\.)/;var PATTERN2=/\=/;var priMatch=selector.match(PATTERN1);if(priMatch)
{separator=priMatch[0];var bits=selector.split(separator,2);if(vmmode)
{separator=separator.replace(/\>\@/,'@').replace(/\>/,'#').replace(/\!/,'.');}
tag=bits[0];identifier=bits[1];if(vmmode&&identifier.match(PATTERN2))
{var vsep=identifier.match(PATTERN2)[0];var vbits=identifier.split(vsep,2);identifier=vbits[0];value=vbits[1];}}
else
{tag=selector;}
if(vmmode)
{var id=null,className=null,attr=null,val=null;if(selector==tag)
{separator='#';identifier=selector;tag='';}
if(''!=tag)
{tag=tag.toLowerCase().replace(/\<|\>/,'');}
if(''!=identifier)
{switch(separator)
{case"#":id=identifier;break;case".":className=identifier;break;case"@":attr=identifier;if(''!=value)
{val=value;}
else
{val='*';}
break;}}
var attrO={};if(attr)
{attrO[attr]=val;}
out=new $iTXT.data.Dom.Selector(tag,id,className,attrO);}
else
{out=[tag.toLowerCase(),separator,identifier];}
return out;},findSelector:function(needle,haystack,precision)
{var _checkField=function(n,h,p,d)
{if(undefined==n&&undefined==h)
{return(p>=0)?true:false;}
else if(undefined!=n&&undefined==h)
{return(p>=0)?true:false;}
else if(undefined==n&&undefined!=h)
{return(p==0)?true:false;}
else if($itxtUtil.isObject(n))
{var res=false;for(var a in n)
{if('function'!=typeof n[a])
{var aRes=_checkField(n[a],h[a],p,'attr['+a+']');res=aRes;if((aRes&&p<0)||(!aRes&&p>=0))
{break;}}}
return res;}
else
{return $itxtUtil.fuzzyMatch(h,n);}};if(!precision||isNaN(precision))
{precision=0;}
var nA=[];if(!VM._.isArray(needle))
{nA[nA.length]=needle;}
else
{nA=needle;}
var hA=[];if(!VM._.isArray(haystack))
{hA[hA.length]=haystack;}
else
{hA=haystack;}
var i=nA.length;while(i--)
{var j=hA.length;while(j--)
{var ret=false;var tN=nA[i];var tH=hA[j];if(precision<0)
{ret=(_checkField(tN.tag,tH.tag,precision,'tag')||_checkField(tN.id,tH.id,precision,'id')||_checkField(tN.className,tH.className,precision,'class')||_checkField(tN.attrs,tH.attrs,precision,'attrs'));}
else
{ret=(_checkField(tN.tag,tH.tag,precision,'tag')&&_checkField(tN.id,tH.id,precision,'id')&&_checkField(tN.className,tH.className,precision,'class')&&_checkField(tN.attrs,tH.attrs,precision,'attrs'));}
if(ret)
{return ret;}}}
return false;},extractAttrs:function(elem,constraint)
{var out={};if(elem&&elem.nodeType&&$itxtUtil.ELEMENT_NODE==elem.nodeType&&elem.attributes)
{if(constraint&&$itxtUtil.isObject(constraint))
{for(var cName in constraint)
{if('function'!=typeof constraint[cName])
{var cValue=elem.getAttribute(cName);if(cValue)
{out[cName]=cValue;}}}}
else
{var i=elem.attributes.length;while(i--)
{var attr=elem.attributes[i];if("id"!=attr.nodeName&&"class"!=attr.nodeName)
{out[attr.nodeName]=attr.nodeValue;}}}}
return out;},parseVMNode:function(inp)
{var outA=[];if(null!=inp)
{if(!VM._.isArray(inp))
{inp=[inp];}
var i=inp.length;while(i--)
{var sel=this.parseSelector(inp[i],true);if(sel instanceof $iTXT.data.Dom.Selector)
{outA[outA.length]=sel;}}}
if(outA.length==1)
{return outA[0];}
else
{return outA;}},parseElement:function(inp,attrC)
{var inA=[],outA=[];if(inp&&inp.nodeType&&$itxtUtil.ELEMENT_NODE==inp.nodeType)
{inA[inA.length]=inp;}
else if(undefined==inp)
{return null;}
else
{inA=inp;}
if(attrC&&'string'==typeof attrC)
{attrC=attrC.split(",");}
var i=inA.length;while(i--)
{var elem=inA[i];if(elem&&elem.nodeType&&$itxtUtil.ELEMENT_NODE==elem.nodeType)
{if(outA.length==0)
{var attrO=null;if(attrC&&attrC.length>0)
{attrO={};for(var j=0,lenj=attrC.length;j<lenj;j++)
{attrO[attrC[j]]=true;}
attrO=this.extractAttrs(elem,attrO);}
outA[outA.length]=new $iTXT.data.Dom.Selector(elem.tagName.toLowerCase(),elem.id,elem.className,attrO);}}
if(i<0)
{break;}}
if(outA.length==1)
{return outA[0];}
else
{return outA;}},getElementSignature:function(n,e)
{if(n&&n.tagName)
{return((e)?'&lt;':'<')+n.tagName.toLowerCase()+((e)?'&gt;':'>')+((n.id)?'#':'')+n.id+((n.className)?'.':'')+n.className;}
else
{return'';}},getInnerTextLength:function(n)
{var v=0;var badTags={'a':true,'applet':true,'embed':true,'form':true,'iframe':true,'img':true,'noscript':true,'object':true,'script':true,'style':true,'xml':true};if(!n||!n.tagName||badTags[n.tagName.toLowerCase()])
{return v;}
var t='',children=n.childNodes;var i=children.length;while(i--)
{var c=children[i];if($itxtUtil.TEXT_NODE==c.nodeType)
{t+=' '+c.nodeValue;}}
return $itxtUtil.cleanString(t).length;},getElementByTagName:function(tag,index)
{index=index||0;var ts=document.getElementsByTagName(tag);if(ts.length>index)
{return ts[index];}
return null;},getElementByClassName:function(className,index)
{index=index||0;var ts=$iTXT.data.Dom.getElementsByClassName(className);if(ts.length>index)
{return ts[index];}
return null;},getNodeByTagClassOrId:function(p,i)
{p=$itxtUtil.getTagName(p);var tag=this.getElementByTagName(p,i);if(!tag&&p.charAt(0)=="!")
{tag=$iTXT.data.Dom.getElementByClassName(p.substring(1),i);}
else if(!tag)
{tag=document.getElementById(p);}
return tag;},searchEngines:{},detectSearchEngines:function()
{function _parseTerms(sQry,sQSD)
{sQry=sQry.replace(/%20/g,"+");var i;var sC;var sPrv='+';var sFlat='';var r=new RegExp("[&|?]"+sQSD+"=\+?([^&]*)");oT=(r.exec(sQry));if(oT===null)
{return'';}
sQry=oT[oT.length-1];for(var i=0;i<sQry.length;i++)
{sC=sQry.charAt(i);if(!(sC==='+'&&sPrv==='+'))
{sFlat+=sC==='+'?' ':sC;}
sPrv=sC;}
sQry=sFlat;return sFlat;}
function _parseReferer(sU)
{var sQ,sT,r,oT,D,i,iD;r=/(^https?:\/\/)([^\/]+)(.*)/gi;oT=r.exec(sU);if(oT==null||oT.length<2)
{return;}
sU=oT[2];sT=oT.length>=4?oT[3].replace(/\./g,"%2E"):'';D=sU.split('.');iD=D.length;if(iD<2)
{return;}
outer:for(var i=0;i<iD-1;i++)
{if($iTXT.data.Dom.searchEngines[D[i]])
{var sE=$iTXT.data.Dom.searchEngines[D[i]];var flds=sE.flds;for(var j=0;j<sE.flds.length;j++)
{sQ=sE.flds[j];r=new RegExp('[\?|\&|\;]'+sQ+'=');if(sQ==='*'||sQ==='')
{$iTXT.js.SearchEngineSettings.current={seid:sE.id,sehs:D[i],sest:''};}
else if(r.test(document.referrer))
{$iTXT.js.SearchEngineSettings.current={seid:sE.id,sehs:D[i],sest:_parseTerms(sT,sQ)};break outer;}}}}
if($iTXT.js.SearchEngineSettings.current)
{}}
var foundSE=false;var seHosts=$iTXT.js.SearchEngineSettings.hosts;if(seHosts&&'string'==typeof seHosts)
{seHosts=seHosts.split(',');var i=seHosts.length;while(i--)
{var seHost=seHosts[i];var seID=$iTXT.js.SearchEngineSettings['ids.'+seHost];var seFlds=$iTXT.js.SearchEngineSettings['fields.'+seHost];seFlds=(seFlds)?seFlds.split(','):[];if(seID&&seFlds.length>0)
{this.searchEngines[seHost]={id:seID,flds:seFlds};foundSE=true;}}}
else
{}
if(foundSE)
{_parseReferer(document.referrer);}},setNodeId:function(n)
{var nId=n.itxtNodeId;if(null==nId||undefined==nId)
{nId=this.nodeIds.length;this.nodeIds[nId]=nId;if(n.nodeType&&$itxtUtil.ELEMENT_NODE==n.nodeType)
{try
{n.itxtNodeId=nId;}
catch(x)
{}}}
return nId;},getComputedStyles:function(elmt)
{if(!elmt.nodeType||$itxtUtil.ELEMENT_NODE!=elmt.nodeType)
{return{};}
try
{if(window.getComputedStyle)
{return window.getComputedStyle(elmt,null);}
else
{return elmt.currentStyle;}}
catch(x)
{return{};}},dynamicContentCount:0,dynamicContentSections:{},dynamicContentStates:{},assessDynamicContent:function(elmt)
{if(!elmt.nodeType||$itxtUtil.ELEMENT_NODE!=elmt.nodeType)
{return false;}
var nId=this.setNodeId(elmt),tSec;var tSec=null;if(this.dynamicContentSections[nId])
{tSec=this.dynamicContentSections[nId];}
var pState=null,pSec=null;if(elmt.parentNode)
{var pId=this.setNodeId(elmt.parentNode);if(this.dynamicContentSections[pId])
{pSec=this.dynamicContentSections[pId];pState=this.dynamicContentStates[pSec];}}
var dcState=$iTXT.data.Context.dynamicContentHandler.getDynamicContentState(elmt);if(pState==null||pState!=dcState)
{if(null==tSec)
{tSec=++this.dynamicContentCount;}
this.dynamicContentSections[nId]=tSec;this.dynamicContentStates[tSec]=dcState;return true;}
else
{this.dynamicContentSections[nId]=pSec;return false;}},isVisible:function(n)
{var cS=this.getComputedStyles(n);return!!(cS.visibility!='hidden'&&cS.display!='none'&&n.clientWidth>0&&n.clientHeight>0);},getDefinedStyle:function(elmt,style,defaultStyle,rejects){var retStyle=defaultStyle,found=false;;try{var retStyle=getComputedStyle(elmt,null)[style];found=true;if(rejects){if(rejects.length===1){if(retStyle===rejects[0]){found=false;}}else{for(var i=0,len=rejects.length;i<len;i++){if(retStyle===rejects[0]){found=false;}}}}}catch(e){return defaultStyle;}
if(!found){return $iTXT.data.Dom.getDefinedStyle(elmt.parentNode,style,defaultStyle,rejects);}else{return retStyle;}}};};$iTXT.js.loader["$iTXT.data.Param"]=true;$iTXT.data.Param_Load=function(){var undefined;var $itxtUtil=$iTXT.core.Util;$iTXT.data.Param=$iTXT.core.Class.create({paramHash:null,parent:null,debugName:null,init:function(p,params,weight,dbgName)
{this.debugName=dbgName||"Uknown";if($iTXT.js.umat)
{}
this.isFuncRegEx=/^\$[a-zA-Z]+\{/;this.isTokenRegEx=/^\$\{[a-zA-Z0-9_.]*\}/;this.containsFuncRegEx=/\$[a-zA-Z]+\{/;this.containsTokenRegEx=/\$\{[a-zA-Z0-9_.]*\}/;this.paramHash={};this.parent=p||null;if(params&&weight)
{this.set(params,null,weight);}},setParent:function(p)
{if(p)
{this.parent=p;}},list:function()
{return $itxtUtil.objKeys(this.paramHash);},get:function(pname,defVal)
{var retVal=(undefined==defVal)?null:defVal;var pV=null,pW=0,mV=null,mW=0;var pnameU=pname.toUpperCase();var v=this.paramHash[pnameU];if(null!=v)
{mW=v.w;mV=v.v;}
var p=this.parent;if(p!=null&&p.get)
{pW=p.weigh(pnameU);pV=p.get(pnameU,defVal);}
if(null!=pV&&null==mV)
{retVal=pV;}
else if(null!=mV&&null==pV)
{retVal=mV;}
else if(null!=mV&&null!=pV)
{if(pW>mW)
{retVal=pV;}
else
{retVal=mV;}}
return retVal;},getBool:function(name,def)
{var val=this.get(name);if(null!=val&&("1"==val||"true"==val))
{return true;}
else if(null!=val&&("0"==val||"false"==val))
{return false;}
if(null!==val)
{if("true"===val.toLowerCase())
{return true;}
if("false"===val.toLowerCase())
{return false;}}
return def;},getObj:function(name,defVal)
{var val=this.get(name,defVal);if('string'==typeof val)
{try
{val=eval(val);}
catch(e)
{}}
if(!$itxtUtil.isObject(val))
{return{};}
return val;},getInt:function(name,def)
{var value=this.get(name);if(value||value===0)
{try
{if(typeof value==='string'&&value.charAt(0)==='.'&&!isNaN(parseInt(value.substring(1),10)))
{return 0;}
value=parseInt(value,10);if(isNaN(value))
{return def;}}
catch(e)
{return def;}}
else
{return def;}
return value;},getByNS:function(ns){if(!VM._.isString(ns)||!ns){return{};}
var obj={},keys=VM._(this.paramHash).keys();ns=ns.toLowerCase();VM._(keys).forEach(function(key){key=key.toLowerCase();if(key.indexOf(ns+'.')==0){var value=this.get(key);key=key.substr(ns.length+1);obj[key]=this.parse(value);}},this);if(this.parent){obj=VM._.extend(obj,this.parent.getByNS(ns));}
return obj;},weigh:function(pname)
{var retVal=0,pW=0,mW=0;if(null!=this.paramHash[pname])
{mW=this.paramHash[pname].w;}
if(null!=this.parent&&this.parent.weigh)
{pW=this.parent.weigh(pname);}
if(pW>mW)
{retVal=pW;}
else
{retVal=mW;}
return retVal;},set:function(arg1,arg2,arg3)
{if('string'==typeof arg1)
{this.paramHash[arg1.toUpperCase()]=this._qualify(arg1,arg2,arg3);}
else if($itxtUtil.isObject(arg1))
{for(var nm in arg1)
{this.paramHash[nm.toUpperCase()]=this._qualify(nm,arg1[nm],arg3);}}},unset:function(pname)
{delete this.paramHash[pname.toUpperCase()];},exists:function(pname)
{var pT=false;if(this.parent!=null&&this.parent.exists)
{pT=this.parent.exists(pname);}
var mT=(this.paramHash[pname.toUpperCase()]!=null);return pT||mT;},parse:function(s,rep)
{if(!s||""==s)
{return"";}
if(typeof s!='string')
{return s;}
if(s.indexOf("_")>-1)
{s=s.replace(/_VM_UECLICK_/g,'${stub.tu}');s=s.replace(/_VM_CLICK_/g,'$ENCODE{${stub.tu}}');s=s.replace(/_VM_NRDCLICK_/g,'${stub.tu.noredirect}&redir=');s=s.replace(/_VM_ENRDCLICK_/g,'$ENCODE{${stub.tu.noredirect}&redir=}');s=s.replace(/_KEYWORD_/g,'$ENCODE{${keyword}}');s=s.replace(/_TITLE_/g,'${title}');s=s.replace(/_DESCRIPTION_/g,'${body}');s=s.replace(/_ENCODED_URL_/g,'$ENCODE{${stub.t}}');s=s.replace(/_URL_/g,'${stub.t}');s=s.replace(/_CALL_TO_ACTION_/g,'$ENCODE{${cta}}');s=s.replace(/_CLICK_TO_SELF_/g,'$ENCODE{${cts}}');s=s.replace(/_TRACKING_IMAGE_2_/g,'$ENCODE{$ARRAYITEM{trkimages,2}}');s=s.replace(/_TRACKING_IMAGE_1_/g,'$ENCODE{$ARRAYITEM{trkimages,1}}');s=s.replace(/_TRACKING_IMAGE_0_/g,'$ENCODE{$ARRAYITEM{trkimages,0}}');s=s.replace(/_TRACKING_IMAGE_/g,'$ENCODE{$ARRAYITEM{trkimages,0}}');s=s.replace(/_ADVIEW_/g,'$ENCODE{${stub.av}}');s=s.replace(/_SERVER_/g,'$ENCODE{${itxtserver}}');s=s.replace(/_SEARCHTERMS_/g,'$ENCODE{${sest}}');s=s.replace(/_SEARCHENGINE_/g,'$ENCODE{${seid}}');}
s=s.replace(/\$\{timestamp\}/gi,$iTXT.core.Util.isoTs());s=s.replace(/\$\{epochtimestamp\}/gi,$iTXT.core.Util.ts());if(!this.containsTokens(s))
{return s;}
rep=this.fixOverrideObject(rep);var pt=this._buildParseTree(s);return this._serializeParseTree(pt,rep);},parseObject:function(o,rep){for(var m in o){o[m]=this.parse(o[m],rep);}
return o;},fixOverrideObject:function(obj)
{var no={};for(var name in obj)
{no[name.toUpperCase()]=obj[name];}
return no;},containsTokens:function(s)
{if(s&&'string'==typeof s)
{if(s.match(this.containsTokenRegEx))
return true;if(s.match(this.containsFuncRegEx))
return true;}
return false;},BranchType:{ROOT:"ROOT",FUNC:"FUNC",STRING:"STRING",TOKEN:"TOKEN",PARAM:"PARAM"},ParseMode:{NONE:0,STRING:1,TOKEN:2,FUNCNAME:3,FUNCTION:4,PARAM:5},_buildParseTree:function(s)
{var rootNode=this._branch(this.BranchType.ROOT);var stack=[rootNode];var mode=[this.ParseMode.NONE];var buffer="";var pchar="";for(var i=0;i<s.length;i++)
{var ss=s.substring(i);var charr=s.charAt(i);if(this._mode(mode,this.ParseMode.NONE))
{if(this._isToken(ss))
{mode.push(this.ParseMode.TOKEN);i++;}
else if(this._isFunc(ss))
{mode.push(this.ParseMode.FUNCNAME);}
else
{mode.push(this.ParseMode.STRING);buffer+=charr;}}
else if(this._mode(mode,this.ParseMode.STRING))
{if('$'==charr&&'\\'==pchar)
{buffer=buffer.substring(0,buffer.length-1)+"$";}
else if(this._isToken(ss))
{if(""!=buffer)
{this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));buffer="";}
mode.push(this.ParseMode.TOKEN);i++;}
else if(this._isFunc(ss))
{if(""!=buffer)
{this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));buffer="";}
mode.push(this.ParseMode.FUNCNAME);}
else if(i==(s.length-1))
{buffer+=charr;this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));buffer="";mode.pop();}
else
{buffer+=charr;}}
else if(this._mode(mode,this.ParseMode.TOKEN))
{if('}'==charr)
{mode.pop();this._addBranch(stack,this._branch(this.BranchType.TOKEN,buffer));buffer="";}
else
{buffer+=charr;}}
else if(this._mode(mode,this.ParseMode.FUNCNAME))
{if('{'==charr)
{mode.pop();mode.push(this.ParseMode.FUNCTION);this._addBranch(stack,this._branch(this.BranchType.FUNC,buffer));buffer="";}
else
{buffer+=charr;}}
else if(this._mode(mode,this.ParseMode.FUNCTION))
{mode.pop();if('}'!=charr)
{this._addBranch(stack,this._branch(this.BranchType.PARAM,buffer));mode.push(this.ParseMode.PARAM);if(this._isToken(ss))
{mode.push(this.ParseMode.TOKEN);i++;}
else if(this._isFunc(ss))
{mode.push(this.ParseMode.FUNCNAME);}
else
{buffer+=charr;}}}
else if(this._mode(mode,this.ParseMode.PARAM))
{if('}'==charr&&'\\'!=pchar)
{if(""!=buffer)
{this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));buffer="";}
stack.pop();stack.pop();mode.pop();}
else if(','==charr&&'\\'!=pchar)
{if(""!=buffer)
{this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));buffer="";}
stack.pop();this._addBranch(stack,this._branch(this.BranchType.PARAM,buffer));}
else if('$'==charr&&'\\'==pchar)
{buffer=buffer.substring(0,buffer.length-1)+"$";}
else if(','==charr&&'\\'==pchar)
{buffer=buffer.substring(0,buffer.length-1)+",";}
else if(this._isToken(ss))
{if(""!=buffer)
{this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));buffer="";}
mode.push(this.ParseMode.TOKEN);i++;}
else if(this._isFunc(ss))
{if(""!=buffer)
{this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));buffer="";}
mode.push(this.ParseMode.FUNCNAME);}
else
{buffer+=charr;}}
pchar=charr;}
if(this._mode(mode,this.ParseMode.STRING)&&""!=buffer)
{this._addBranch(stack,this._branch(this.BranchType.STRING,buffer));}
return rootNode;},_branch:function(t,s)
{var rObj={t:t,v:s||"",branches:[]};return rObj;},_addBranch:function(s,b)
{s[s.length-1].branches.push(b);if(b.t==this.BranchType.FUNC||b.t==this.BranchType.PARAM)
{s.push(b);}},_mode:function(m,t)
{return((m.length>0)&&(m[m.length-1]==t));},_serializeParseTree:function(pt,obj)
{var parsedStr="";for(var i=0;i<pt.branches.length;i++)
{var branch=pt.branches[i];if(branch.t==this.BranchType.FUNC)
{if(undefined!=this.tokenFuncs[branch.v.toUpperCase()]&&branch.branches.length>0)
{var paramArray=[];for(var j=0;j<branch.branches.length;j++)
{var paramBranch=branch.branches[j];if(paramBranch.t==this.BranchType.PARAM)
{paramArray.push(this._serializeParseTree(paramBranch,obj));}}
parsedStr+=this.tokenFuncs[branch.v.toUpperCase()].apply(this,paramArray);}}
else if(branch.t==this.BranchType.TOKEN)
{parsedStr+=this._expandToken(branch.v,obj);}
else if(branch.t==this.BranchType.STRING)
{parsedStr+=branch.v;}}
return parsedStr;},_isFunc:function(s)
{return(null!=s.match(this.isFuncRegEx));},_isToken:function(s)
{return(null!=s.match(this.isTokenRegEx));},_expandToken:function(name,obj)
{if(obj&&obj[name])
{return this.parse(obj[name]+"",obj);}
else if(this.exists(name))
{return this.parse(this.get(name)+"",obj);}
if((name.indexOf("P.")==0)&&this.parent)
{var pName=name.substring(2);if(this.parent.exists(pName))
{return this.parse(this.parent.get(pName)+"",obj);}}
return"${"+name+"}";},_param:function(pname,val,weight)
{if('string'==typeof val)
{var itemIndex=val.toUpperCase().indexOf("${"+pname.toUpperCase()+"}");if(itemIndex!=-1)
{val=val.substring(0,itemIndex+2)+"P."+val.substring(itemIndex+2);}}
var r={n:pname.toUpperCase(),v:val,w:(weight||0)};return r;},_qualify:function(pname,val,weight)
{if(VM._.isArray(val))
{for(var i=0;i<val.length;i++)
{this._qualify(pname+i,val[i],weight);}}
if($itxtUtil.isObject(val)&&undefined!=val.v&&undefined!=val.w)
{weight=val.w;val=val.v;}
if(('clicktag'==pname.toLowerCase()||'tt.logo.url'==pname.toLowerCase())&&val.toLowerCase().indexOf('${keyword}')>-1&&val.toLowerCase().indexOf('$encode{${keyword}}')<0)
{val=val.replace(/\$\{keyword\}/i,'$ENCODE{${keyword}}');}
var retV=null;if(null!=this.paramHash[pname.toUpperCase()])
{var curV=this.paramHash[pname.toUpperCase()];var newV=this._param(pname.toUpperCase(),val,weight);retV=curV;if(newV.w>=curV.w)
{retV=newV;}}
else
{retV=this._param(pname.toUpperCase(),val,weight);}
if($iTXT.js.umat)
{var dV=retV.v;if(dV)
{if(dV.join)
{dV=dV.join(',');}
if(dV.replace)
{dV=dV.replace(/>/g,'&gt;').replace(/</g,'&lt;');}}}
return retV;},getParamList:function(childParams)
{var returnParams=childParams||{};for(var p in this.paramHash)
{if(!returnParams[p])
{returnParams[p]=this.get(p);}}
if(this.parent)
{return this.parent.getParamList(returnParams);}
return returnParams;},getParamLevel:function(pname,lvl)
{lvl=lvl||0;if(null==this.paramHash[pname.toUpperCase()])
{if(this.parent!=null&&this.parent.getParamLevel)
{return this.parent.getParamLevel(pname,lvl+1);}}
else if(this.parent!=null&&this.parent.getParamLevel)
{var w=this.paramHash[pname.toUpperCase()].w;var pW=this.parent.weigh(pname.toUpperCase());if(pW>w)
{return this.parent.getParamLevel(pname,lvl+1);}}
return lvl;},getAtLevel:function(pname,requestedLevel,lvl)
{lvl=lvl||0;if(lvl==requestedLevel)
{return this.paramHash[pname.toUpperCase()]||null;}
if(this.parent!=null&&this.parent.getAtLevel)
{return this.parent.getAtLevel(pname,requestedLevel,lvl+1);}
return"";},numberOfLevels:function(lvl)
{lvl=lvl||1;if(this.parent!=null&&this.parent.numberOfLevels)
{return this.parent.numberOfLevels(lvl+1);}
return lvl;},tokenize:function(obj)
{if('string'===typeof obj)
{obj=this.parse(obj);}
else if($itxtUtil.isObject(obj))
{for(var p in obj)
{obj[p]=this.tokenize(obj[p]);}}
return obj;},tokenFuncs:{ENCODE:function(s)
{try
{return encodeURIComponent(s);}
catch(e){}
return s;},DECODE:function(s)
{try
{return decodeURIComponent(s);}
catch(e){}
return s;},REPLACE:function(needle,haystack,replacement,attributes)
{attributes=attributes||"g";return haystack.replace(new RegExp(needle,attributes),replacement);},SUBSTR:function(s,i,l)
{if(undefined==i)
{return"";}
try
{i=parseInt(i);if(undefined!=l)
{l=parseInt(l);return s.substring(i,l);}
return s.substring(i);}
catch(e){}
return"";},INDEXOF:function(s,c)
{},TRIM:function(s,l,p)
{return $iTXT.core.Util.summarize(s,l,p);},TRIMHTML:function(s,l,p)
{var newStr=s;var newLength=l;var tagReplacements=[];var matches=s.match($iTXT.core.Regex.htmlAnyOpenOrCloseTag);if(null!=matches)
{for(var i=0;i<matches.length;i++)
{var rs="#TAG"+i+"#";newStr=newStr.replace(matches[i],rs);newLength+=rs.length;tagReplacements.push(matches[i]);}}
newStr=$iTXT.core.Util.summarize(newStr,newLength,p);for(var i=0;i<tagReplacements.length;i++)
{var rs="#TAG"+i+"#";newStr=newStr.replace(rs,tagReplacements[i]);}
return newStr;},ARRAYITEM:function(n,i)
{var arr=this.get(n);if(VM._.isArray(arr))
{if(arr.length>i)
{return arr[i];}}
return'';},OBJECTITEM:function(n,k){var map=this.get(n);if($itxtUtil.isObject(map))
{if(map.hasOwnProperty(k))
{return map[k];}}
return'';},CAPITALIZE:function(s)
{return s.replace(/\w\S*/g,function(match){return match.charAt(0).toUpperCase()+match.substr(1);});},O:function(s)
{return s;}}});};$iTXT.js.loader["$iTXT.data.Pixel"]=true;$iTXT.data.Pixel_Load=function()
{var undefined;var $itxtUtil=$iTXT.core.Util;$iTXT.data.Pixel=$iTXT.core.Class.create({blind:false,cat:"",detailid:0,done:false,id:"",keyword:"",type:"",url:"",init:function(detailid,keyword,url,blind,cat,type)
{this.id=$itxtUtil.genUUID();var idS='('+this.id+')';this.detailid=detailid;this.keyword=keyword;this.url=url;var ifrStub='http://'+$iTXT.js.serverName+'/'+$iTXT.cnst.IFRAME_SCRIPT_DROPPER_LOC+'?'+$iTXT.cnst.IFRAME_SCRIPT_DROPPER_FLD+'=';if(this.url.match($iTXT.cnst.IFRAME_SCRIPT_DROPPER_LOC))
{var candUrl=decodeURIComponent(this.url.replace(ifrStub,'')).replace(/\%26/g,'&');if($itxtUtil.isURL(candUrl))
{this.url=candUrl;blind=true;}}
this.type=(this.url.match(/^<iframe/i))?'iframe':(this.url.match(/^https?\:\/\/.*\/.*\.gif|png|jpg|jpeg/i)||this.url.match(/type\=(img|image)/i))?'img':(this.url.match(/^https?\:\/\/.*\/.*\.js/i)||this.url.match(/type\=script/i))?'script':type;if(!this.type||undefined==this.type||''==this.type)
{this.type='img';}
else
{}
if('boolean'==typeof blind)
{this.blind=blind;}
else if(!url.match($iTXT.cnst.DNS_INTELLITXT_SUFFIX)&&!url.match($iTXT.cnst.DNS_SMARTAD_MARKER))
{this.blind=true;}
if((url.match($iTXT.cnst.DNS_INTELLITXT_SUFFIX)||url.match($iTXT.cnst.DNS_SMARTAD_MARKER))&&url.match(/al\.(a|j)sp/))
{this.blind=false;}
if('iframe'==this.type)
{this.url=$itxtUtil.getEmbeddedURL(url);this.blind=false;}
if(cat&&'string'==typeof cat)
{cat=cat.replace("$iTXT.glob.track.",'');this.cat=cat;if('rand'==this.cat)
{this.blind=false;}}
if(this.url.match($iTXT.cnst.PIXEL_SERVER_PREFIX+$iTXT.cnst.DNS_INTELLITXT_SUFFIX))
{this.url=decodeURIComponent(this.url);var ipid=$iTXT.glob.params?$iTXT.glob.params.get("ipid",0):0;if($iTXT.js.ipid&&!isNaN($iTXT.js.ipid))
{ipid=$iTXT.js.ipid;}
this.url=$itxtUtil.appendToURL(this.url,'ipid='+ipid);var sfid=0;if($iTXT.glob.currentAd&&$iTXT.glob.currentAd.sfid&&!isNaN($iTXT.glob.currentAd.sfid))
{sfid=$iTXT.glob.currentAd.sfid;}
if($iTXT.glob.params&&$iTXT.glob.params.get('testrandsfid'))
{sfid=Math.round(10000*Math.random());}
this.url=$itxtUtil.appendToURL(this.url,'sfid='+sfid);}}});$iTXT.data.PixelManager={pixelQueue:[],activePixels:[],active:function()
{return(this.activePixels.length>0)?true:false;},defer:function(job,iteration)
{try
{var mode=null;var id='',idS='';if('function'==typeof job)
{id=job.toString();idS='(function)';mode='normal';}
else if('string'==typeof job)
{id=job;idS='('+id+')';job=new Function('$iTXT.data.PixelManager.drop($iTXT.data.PixelManager.activePixels[$iTXT.data.PixelManager.findActive("'+id+'")],null,true);');mode='drop';}
if(!mode)
{throw new Error('Job is not valid.');}
var itrDelay=$iTXT.glob.params.get("pxid")||100;var maxDelay=$iTXT.glob.params.get("pxmd")||1000;if(null==iteration)
{iteration=0;}
var execute=true;if(this.active())
{if('normal'==mode)
{execute=false;}
else if(id!=this.activePixels[0].id)
{execute=false;}}
if(execute)
{}
else if(iteration*itrDelay>=maxDelay)
{execute=true;}
if(execute)
{job();}
else
{if('drop'==mode&&'function'==typeof job)
{job=id;}
iteration++;window.setTimeout(function(){$iTXT.data.PixelManager.defer(job,iteration);},itrDelay);}}
catch(x)
{var msg='ERROR attempting to defer for function "'+job+'" on iteration '+iteration+'.  Error message is "'+x.message+'".';}},drop:function(pixel,mode,confirm)
{try
{if(undefined==pixel||'string'!=typeof pixel.url||'string'!=typeof pixel.id||'string'!=typeof pixel.type)
{return;}
if(!pixel.url.match(/^http/))
{return;}
if(!mode||undefined==mode)
{mode=pixel.type;}
if(pixel.blind&&pixel.type=='script')
{mode='iframe';}
else
{mode=pixel.type;}
if(confirm&&'script'==mode&&$iTXT.core.Browser.is('Explorer')&&!(pixel.url.match(/al\.asp/)||pixel.url.match($iTXT.cnst.PIXEL_SERVER_PREFIX+$iTXT.cnst.DNS_INTELLITXT_SUFFIX)))
{this.remove(pixel.id);}
pixel.url=$iTXT.glob.params.parse(pixel.url);var cb=null;if(confirm)
{cb=function(){$iTXT.data.PixelManager.remove(pixel.id);};}
switch(mode.toLowerCase())
{case'img':case'image':$itxtUtil.dropImage(pixel.url,cb,cb);break;case'iframe':if(pixel.blind&&!pixel.url.match(/^<iframe/i)&&!pixel.url.match($iTXT.cnst.IFRAME_SCRIPT_DROPPER_LOC))
{pixel.url='http://'+$iTXT.js.serverName+'/'+$iTXT.cnst.IFRAME_SCRIPT_DROPPER_LOC+'?'+$iTXT.cnst.IFRAME_SCRIPT_DROPPER_FLD+'='+encodeURIComponent(pixel.url);}
$itxtUtil.dropIframe(pixel.url,cb,cb);break;default:$itxtUtil.dropScript(pixel.url,cb,cb);break;}}
catch(x)
{var msg='('+pixel.id+') ERROR attempting to drop Pixel "'+pixel.url+'" in mode "'+mode+'" with confirm '+confirm+'.  Error message is "'+x.message+'".';}},findActive:function(id)
{for(var i=0;i<this.activePixels.length;i++)
{if(id==this.activePixels[i].id)
{return i;}}
return-1;},flush:function()
{var aggPXs={};while(this.pixelQueue.length>0)
{var pX=this.pixelQueue.shift();if(!pX.url.match($iTXT.cnst.PIXEL_SERVER_PREFIX+$iTXT.cnst.DNS_INTELLITXT_SUFFIX)||pX.type=='img')
{aggPXs[pX.id]=pX;continue;}
var qsArgs=$itxtUtil.getQueryParams(pX.url);var pId=qsArgs.id;var aggIdx=(pX.type||'*')+':'+qsArgs.ipid+':'+qsArgs.sfid;if(aggPXs[aggIdx]&&undefined!=aggPXs[aggIdx])
{var aggPX=aggPXs[aggIdx];var newURL=aggPX.url.replace(/id\=/,'id='+pId+',');if(newURL.length>2048)
{aggPXs[pX.id]=aggPX;aggPXs[aggIdx]=pX;}
else
{aggPX.url=newURL;}}
else
{aggPXs[aggIdx]=pX;}}
var c=0;for(var k in aggPXs)
{c++;if('function'!=typeof aggPXs[k])
{var aPx=aggPXs[k];this.activePixels.push(aPx);this.defer(aPx.id);}}
this.pixelQueue=[];},get:function(cat,cri)
{var uCat,uCri;if(null!=cri&&'string'==typeof cri)
{uCri='keyword';}
else if(null!=cri&&!isNaN(cri))
{uCri='detail ID';}
else
{return;}
var uCat;switch(cat)
{case'guar':uCat='GUARANTEED';break;case'rand':uCat='RANDOM';break;default:uCat=cat.toUpperCase();break;}
if($iTXT.glob.track&&$iTXT.glob.track[cat]&&VM._.isArray($iTXT.glob.track[cat])&&$iTXT.glob.track[cat].length>0)
{var eC=0,fC=0,dC=0;var px=$iTXT.glob.track[cat];for(var i=0;i<px.length;i++)
{eC++;var tPx=px[i];var t=('string'==typeof cri)?tPx.keyword:tPx.detailid;if(t==cri)
{fC++;var dupe=false;for(var j=0;j<px.length&&!dupe;j++)
{var cPx=px[j];if(cPx.url==tPx.url&&cPx.done)
{dupe=true;}}
if(!dupe)
{tPx.done=true;this.queue(tPx);dC++;if('hook'!=cat)
{if(!$iTXT.js.modAdTypes)
{var mon='http://'+$iTXT.js.serverName+'/al.asp?ipid='+ipid+'&mt=54&ts='+$iTXT.glob.params.get('timestamp')+'&cc='+$iTXT.glob.geo.get('normalisedcountry')+'&rcc='+$iTXT.glob.geo.get('realcountry')+'&mh='+$iTXT.glob.params.get('page.md5')+'&mv='+tPx.detailid;$itxtUtil.dropScript(mon,function(removeFunction){removeFunction(removeFunction);});}
else
{var mOpts={mt:54,mv:tPx.detailid};$iTXT.core.$(document).itxtFire("$iTXT:data:log:monitor",mOpts);}}
if('rand'==cat)
{break;}}}}}
else
{}},queue:function(pixel,always)
{if(pixel.id&&'string'==typeof pixel.id)
{if(always||pixel.url.match($iTXT.cnst.DNS_INTELLITXT_SUFFIX)||pixel.url.match($iTXT.cnst.DNS_SMARTAD_MARKER))
{this.pixelQueue.push(pixel);}
else
{window.setTimeout(function(){$iTXT.data.PixelManager.drop(pixel);},50);}}},queued:function()
{return(this.pixelQueue.length>0)?true:false;},remove:function(id)
{var idx=this.findActive(id);if(idx>=0)
{this.activePixels.splice(idx,1);}
else
{}}};$iTXT.data.PixelController={init:function()
{$iTXT.core.$(document).itxtBatchSubscribe([["$iTXT:tt:open",$iTXT.core.Event.bind(this,this._ttOpn)],["$iTXT:location:change",$iTXT.core.Event.bind(this,this.locationChange)],["$iTXT:hook:hooked",$iTXT.core.Event.bind(this,this.hookHooked)],["$iTXT:hooks:loaded",$iTXT.core.Event.bind(this,this.hooksLoaded)]]);},locationChange:function(e)
{var o=e.data||{};if($iTXT.data.PixelManager&&$iTXT.data.PixelManager.active())
{if(o.defer&&o.cb)
{o.defer(this);$iTXT.data.PixelManager.defer(o.cb);}}},_ttOpn:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{$iTXT.data.PixelManager.get('rand',ad.params.get("A.KW","").replace(/\'/g,"\\'"));$iTXT.data.PixelManager.get('guar',ad.params.get("A.KW","").replace(/\'/g,"\\'"));window.setTimeout(function(){$iTXT.data.PixelManager.flush();},50);}},hookHooked:function(e)
{var hk=e.data||null;if(null!=hk)
{$iTXT.data.PixelManager.get('hook',hk.options.value.replace(/\'/g,"\\'"));}},hooksLoaded:function()
{$iTXT.data.PixelManager.flush();}};};$iTXT.js.loader["$iTXT.debug.Util"]=true;$iTXT.debug.Util_Load=function()
{var undefined;$iTXT.debug.Util={ECH_EVENTS_TIME:1,ECH_EVENTS_DUMP:2,ECH_ASSESS_DUMP:4,ECH_TIME_XFER:8,ECH_XPAND_JSON:16,ECH_JSON_DB:32,ECH_ASSESS_DUMP_INPUT:64,ECH_TEXTNODES_DUMP:128,HL_COL_INIT:'#fcb514',HL_COL_SKIP:'blue',HL_COL_EXCLUDE:'red',HL_COL_CONTENT:'green',HL_BORDER_STD:'solid',HL_BORDER_SHORT:'solid',HL_BORDER_UPN:'dotted',HL_RESET:'none',hilite:function(n,c,b,f)
{if($iTXT.debug.CurrentConsole&&!$iTXT.glob.dbgParams.get('itxthln-xx'))
{if(n&&n.nodeType&&(($iTXT.core.Util.TEXT_NODE==n.nodeType&&n.parentNode&&$iTXT.core.Util.ELEMENT_NODE==n.parentNode.nodeType)||($iTXT.core.Util.ELEMENT_NODE==n.nodeType))&&('string'==typeof c||'string'==typeof b))
{var n=($iTXT.core.Util.ELEMENT_NODE==n.nodeType)?n:n.parentNode;var itN=$iTXT.data.Context.nodeTextLengths[n.itxtNodeId];if(!itN)
{return;}
if(this.HL_RESET==c||this.HL_RESET==b)
{f=true;}
if(!f&&n.itxtHilite)
{return;}
if(!c||'string'!=typeof c)
{c=this.HL_COL_CONTENT;}
if(!b||'string'!=typeof b)
{b=this.HL_BORDER_STD;}
try
{if(this.HL_RESET==c||this.HL_RESET==b)
{n.style.borderWidth=this.HL_RESET;n.style.borderColor=this.HL_RESET;n.style.borderStyle=this.HL_RESET;n.itxtHilite=0;}
else
{n.style.borderWidth='2px';n.style.borderColor=c;n.style.borderStyle=b;n.itxtHilite=1;}}
catch(x)
{}}}},isLoggingOn:function(logType,logOpts)
{return!!($iTXT.debug.Level);},msg:function(msg)
{},dumpItxt:function()
{var m=arguments,t=$iTXT,n='$iTXT';for(var i=0,l=m.length;i<l;i++)
{if(m[i]&&t[m[i]]){n+='.'+m[i];t=t[m[i]];}}
var d=this.isLoggingOn();var s=n+' =  '+$iTXT.core.Util.formatJSONString($iTXT.core.Util.serialiseJSON(t,null,true),d);if(d)
{}
else
{return s;}}};};$iTXT.js.loader["$iTXT.fx2.Fade2"]=true;$iTXT.fx2.Fade2_Load=function(){$iTXT.fx2.Fade2={};(function(exports){var timeouts={};var set_timeout=function(name,to_id){if(timeouts[name]){clearInterval(timeouts[name]);clearTimeout(timeouts[name]);}
timeouts[name]=to_id;};var clear_all_timeouts=function(){for(var i in timeouts){clearInterval(timeouts[i]);clearTimeout(timeouts[i]);}};var clear_timeout=function(name){clearInterval(timeouts[name]);clearTimeout(timeouts[name]);};var iv=-1;var tmo=-1;var fade=function(name,elmt,duration,options){var el=$iTXT.core.$(elmt);var from=1,to=0;var curr;var fader=function(val){curr=val;el.itxtOpacity(val);};var endfunc=(options&&options.onend?options.onend:null);if(options&&options.fadein){from=0;to=1;}
if(options&&options.from!==undefined&&options.to!==undefined){from=options.from;to=options.to;}
duration=Number(duration);var tween=new $iTXT.fx2.Tweens.Tween({duration:duration,endfunc:endfunc,from:from,stepfunc:fader,to:to,tween:$iTXT.fx2.Tweens.easers.easeIn});set_timeout(name+"_int",setInterval(tween.step,10));set_timeout(name+"_to",setTimeout(function(){if(options&&options.reset)el.itxtOpacity(1);clear_timeout(name+"_int");tween.finish();},duration+1));var kill=function(){clear_timeout(name+"_int");clear_timeout(name+"_to");return curr;};return kill;};var clearIEOpacity=function(el){el=$iTXT.core.$(el);if(typeof el.style.removeProperty=="function"){el.style.removeProperty("filter");return true;}else if(el.style.cssText){var styles=el.style.cssText;var st=styles.toLowerCase().indexOf("filter");var semi=styles.toLowerCase().indexOf(";",st);styles=styles.substr(0,st)+styles.substr(semi+1);el.style.cssText=styles;return true;}
return false;};exports.clearIEOpacity=clearIEOpacity;exports.fade=fade;}).call(this,$iTXT.fx2.Fade2);};$iTXT.js.loader["$iTXT.fx2.Tweens"]=true;$iTXT.fx2.Tweens_Load=function(){$iTXT.fx2.Tweens={};(function(exports){exports.easers={ease:function(now,fac){var easefac=1.4;if(fac!==undefined){easefac=fac;}
if(now>1)return 1;return Math.pow(now,easefac)*now;},linear:function(now){return now;},easeOut:function(now){return exports.easers.ease(now,-0.5);},easeIn:function(now){return exports.easers.ease(now,1.4);},easeInOut:function(now,fac){var easefac=2.2;if(fac!==undefined){easefac=fac;}
var from_one=1-now;return now+(Math.sin(now*Math.PI*2)/(Math.PI*easefac));}};var Tween=function(options){var now=(new Date()).getTime();var duration=(options&&options.duration)?options.duration:150;var finish=(options&&options.endfunc)?options.endfunc:function(){};var onstep=(options&&options.stepfunc)?options.stepfunc:function(){};var from=(options&&options.from!==undefined)?options.from:0;var to=(options&&options.to!==undefined)?options.to:1;var tween=(options&&options.tween)?options.tween:exports.easers.linear;var _map=function(curr){return curr*(to-from)+from;};var _normalise=function(curr){return curr/duration;};var step=function(){var t=new Date().getTime();var val=_map(tween(_normalise(t-now)));if(t>now+duration){finish(val);}else{onstep(val);}
return val;};return{step:step,finish:finish};};exports.Tween=Tween;}).call(this,$iTXT.fx2.Tweens);};$iTXT.js.loader["$iTXT.fx.Base"]=true;$iTXT.fx.Base_Load=function(){var undefined;$iTXT.fx.Transition={Linear:function(v)
{return v;},EaseIn:function(v)
{return Math.pow(v,1.5*2);},EaseOut:function(v)
{return 1-Math.pow(1-v,1.5*2);}};$iTXT.fx.Base=$iTXT.core.Class.create({options:null,queue:null,init:function(_options)
{this.options={useTimeout:true,delay:0,from:0,to:1.0,fps:60,duration:2000,transition:$iTXT.fx.Transition.Linear,start:false,targetChildren:false};$iTXT.core.Util.extend(this.options,_options);if(this.options.target)
{this.options.target=$iTXT.core.$(this.options.target);}
this.valueChange=this.options.to-this.options.from;this.totalDuration=this.options.duration;this.intervalDuration=Math.round(1000/this.options.fps);this.totalFrames=Math.round(this.options.fps*(this.options.duration/1000));if(this.options.start)
{this.delayedStart();}},_start:function()
{this.setup();this.start();},delayedStart:function()
{window.setTimeout($iTXT.core.Event.bind(this,this._start),this.options.delay);},setup:function()
{this.notify("onSetup");},start:function()
{this.running=true;this.notify("beforeStart");this.position=this.options.from;this.currentFrame=0;this.startTime=new Date().getTime();if(this.options.useTimeout)
{setTimeout($iTXT.core.Event.bind(this,this.loop),0);}
else
{this.interval=setInterval($iTXT.core.Event.bind(this,this.loop),this.intervalDuration);}
this.notify("afterStart");},stop:function()
{if(!this.running)
{return;}
if(this.interval)
{clearInterval(this.interval);}
this.running=false;},notify:function(name,details)
{if((undefined!=this.options[name])&&('function'==typeof this.options[name]))
{this.options[name](details);}},loop:function()
{if(this.running)
{var now=new Date().getTime();if(now>this.startTime+this.totalDuration)
{this.running=false;this.finish();return;}
var pos=(now-this.startTime)/this.totalDuration;var frame=Math.round(this.totalFrames*pos);if(frame>this.currentFrame)
{this.currentFrame=frame;this.render(pos);}
if(this.options.useTimeout)
{setTimeout($iTXT.core.Event.bind(this,this.loop),0);}}},finish:function()
{this.notify("beforeFinish");if(!this.options.useTimeout)
{clearInterval(this.interval);}
this.render(1.0);this.notify("afterFinish");if(this.queue!=null)
{this.queue.pop();}},render:function(pos)
{this.notify("beforeUpdate",this.position);this.position=this.options.from+(this.valueChange*this.options.transition(pos));this.update();this.notify("afterUpdate",this.position);},update:function()
{}});};$iTXT.js.loader["$iTXT.fx.Combination"]=true;$iTXT.fx.Combination_Load=function(){var undefined;$iTXT.fx.Combination=$iTXT.core.Class.create($iTXT.fx.Base,{options:null,init:function(_options,$super)
{this.defaultOptions={effects:[],from:0,to:1};$super($iTXT.core.Util.extend(this.defaultOptions,_options));},setup:function()
{for(var i=0;i<this.options.effects.length;i++)
{this.options.effects[i].setup();}},update:function()
{for(var i=0;i<this.options.effects.length;i++)
{this.options.effects[i].render(this.position);}}});};$iTXT.js.loader["$iTXT.fx.Fade"]=true;$iTXT.fx.Fade_Load=function(){var undefined;$iTXT.fx.Fade=$iTXT.core.Class.create($iTXT.fx.Base,{options:null,init:function(_options,$super)
{this.defaultOptions={direction:'in',notifyOnly:false};$super($iTXT.core.Util.extend(this.defaultOptions,_options));this.target=this.options.target;},update:function()
{var o=(this.position);if('out'==this.options.direction)
o=1-o;this.notify("onUpdate",o);if(!this.options.notifyOnly)
{if(this.options.targetChildren)
{for(var i=0;i<this.target.childNodes.length;i++)
{$iTXT.core.$(this.target.childNodes[i].firstChild).itxtOpacity(o);}}
else
{this.target.itxtOpacity(o);}}}});};$iTXT.js.loader["$iTXT.fx.Move"]=true;$iTXT.fx.Move_Load=function(){var undefined;$iTXT.fx.Move=$iTXT.core.Class.create($iTXT.fx.Base,{options:null,init:function(_options,$super)
{this.defaultOptions={dX:null,dY:null,x:null,y:null};$super($iTXT.core.Util.extend(this.defaultOptions,_options));this.target=this.options.target;},setup:function($super)
{this.startX=this.target.offsetLeft;this.startY=this.target.offsetTop;if(this.options.dX!=null&&this.options.dY!=null)
{this.finishX=this.startX+this.options.dX;this.finishY=this.startY+this.options.dY;}
else
{this.finishX=this.options.x;this.finishY=this.options.y;}
this.changeX=this.finishX-this.startX;this.changeY=this.finishY-this.startY;$super();},update:function()
{var newL=Math.round(this.startX+(this.changeX*this.position));var newT=Math.round(this.startY+(this.changeY*this.position));this.target.itxtSetStyle({left:newL+"px",top:newT+"px",right:"",bottom:""});}});};$iTXT.js.loader["$iTXT.fx.Queue"]=true;$iTXT.fx.Queue_Load=function(){var undefined;$iTXT.fx.Queue=$iTXT.core.Class.create({queue:null,queueIndex:null,init:function(effect)
{this.queueIndex=0;this.queue=[];this.push(effect);effect.delayedStart();},push:function(effect)
{this.queue.push(effect);effect.queue=this;return this;},pop:function()
{this.queueIndex++;if(this.queueIndex<this.queue.length)
{this.queue[this.queueIndex].delayedStart();}
return this;}});};$iTXT.js.loader["$iTXT.fx.Size"]=true;$iTXT.fx.Size_Load=function(){var undefined;$iTXT.fx.Size=$iTXT.core.Class.create($iTXT.fx.Base,{options:null,init:function(_options,$super)
{this.defaultOptions={width:0,height:0};$super($iTXT.core.Util.extend(this.defaultOptions,_options));this.target=this.options.target;this.tStartW=this.target.offsetWidth;this.tStartH=this.target.offsetHeight;this.tStartX=this.target.offsetLeft;this.tStartY=this.target.offsetTop;},update:function()
{var w=this.tStartW+((this.options.width-this.tStartW)*this.position);var h=this.tStartH+((this.options.height-this.tStartH)*this.position);if(this.options.width){this.target.itxtSetStyle({width:w+"px"});}
if(this.options.height){this.target.itxtSetStyle({height:h+"px"});}}});};$iTXT.js.loader["$iTXT.itxt.Controller"]=true;$iTXT.itxt.Controller_Load=function(){var $itxtUtil=$iTXT.core.Util;$iTXT.itxt.Controller=$iTXT.core.Class.create({templateLoadUnSubFunc:null,jsLoadUnSubFunc:null,initialiserLoaded:false,templatesLoaded:false,requiresContextualization:false,skipRecontext:false,limitClientParams:[],timeoutPoints:[],timeoutReached:false,init:function(){if(this.checkLoadTimeOut("init")){return;}
$iTXT.js.modAdTypes=true;$iTXT.itxt.currentController=this;var tmpDispArr=[];$iTXT.subscribe("$iTXT:tmpl:load",$iTXT.core.Event.bind(this,this.templatesLoad),tmpDispArr);this.templateLoadUnSubFunc=tmpDispArr.pop();$iTXT.core.$(document).itxtSubscribe("$iTXT:controller:livelookup",$iTXT.core.Event.bind(this,this.dropLiveLookup));if(!$iTXT.js.librariesLoaded){$iTXT.core.$(document).itxtSubscribe("$iTXT:js:load",$iTXT.core.Event.bind(this,this.librariesLoad),tmpDispArr);this.jsLoadUnSubFunc=tmpDispArr.pop();}else{this.librariesLoad();}
if(!window.onunload){window.onunload=function(){};}},librariesLoad:function(){if(this.checkLoadTimeOut("librariesLoad")){return;}
if('function'==typeof this.jsLoadUnSubFunc){this.jsLoadUnSubFunc();}
$iTXT.fire("$iTXT:libraries:loaded",this);$iTXT.subscribe("$iTXT:hooks:loaded",$iTXT.core.Event.bind(this,this.hooksLoaded));if(!$iTXT.js.qaol||$iTXT.js.pageLoaded){this.kickOff();}else{var oldOnload=null;if(window.onload){oldOnload=window.onload;}
var t=this;window.onload=function(){if(null!==oldOnload)
{oldOnload(arguments);}
t.kickOff();};}},checkCssLoad:function(){var testDiv=$iTXT.js.exclCont();if(!testDiv){return;}
var testValue;if(testDiv.currentStyle){testValue=testDiv.currentStyle.fontFamily;}else if(getComputedStyle){testValue=document.defaultView.getComputedStyle(testDiv,null).getPropertyValue('font-family');}
if(testValue=='x-iTXT'){return;}
if($iTXT.cnst&&$iTXT.cnst.CSS_DIR&&$iTXT.cnst.CSS_VER){var scriptUrl=$iTXT.cnst.CSS_DIR+'itxtcss_'+$iTXT.cnst.CSS_VER+'.js',scriptElement=document.createElement('script');scriptElement.type='text/javascript';scriptElement.src=scriptUrl;testDiv.appendChild(scriptElement);}},kickOff:function(){if(this.checkLoadTimeOut("kickOff")){return;}
new $iTXT.metrics.Events();$iTXT.fire("$iTXT:metrics:evt",{n:"ll"});this.dropInitialiser();},checkLoadTimeOut:function(position,sendData){var opts;if(this.timeoutReached){return true;}
var difference=(new Date()).getTime()-$iTXT.js.startTime;var methodIds={init:1,librariesLoad:2,kickOff:3,dropInitialiser:4,initialiserLoad:5,dropContextualizer:6,contextualizerLoad:7,dropAdvertiser:8,advertiserLoad:9,templatesLoad:10};if($iTXT.js.timeout.time>-1&&difference>$iTXT.js.timeout.time){var msg="<span style='color:red;font-weight:bold;'>Script Execution timeout reached. Timeout occured after "+difference+"ms during the stage {"+position+"}</span>";this.timeoutPoints[this.timeoutPoints.length]={id:methodIds[position],val:difference};sendData=true;if($iTXT.js.timeout.abort){opts={metric:"ph",mt:111,mv:"JAVASCRIPT_TIMEOUT_REACHED",mv2:131,ipid:$iTXT.js.ipid};this._makeLogCall(opts);this.timeoutReached=true;}}else{this.timeoutPoints[this.timeoutPoints.length]={id:methodIds[position],val:difference};}
if($iTXT.js.timeout.monitoring&&sendData){var mvTimes="";for(var p in this.timeoutPoints){mvTimes+=this.timeoutPoints[p].id+":"+this.timeoutPoints[p].val+",";}
mvTimes=mvTimes.substring(0,mvTimes.length-1);var mvPosition=this.timeoutReached?methodIds[position]:0;opts={mt:123,mv:mvTimes,mv2:mvPosition,ipid:$iTXT.js.ipid};this._makeLogCall(opts);}
return this.timeoutReached;},_makeLogCall:function(opts){var url=$iTXT.js.serverUrl+'/al.asp?ts='+(new Date()).getTime();for(var pn in opts){url+="&"+pn+"="+encodeURIComponent(opts[pn]);}
$iTXT.core.Util.dropScript(url,function(removeFunction){removeFunction();});},dropInitialiser:function(){if(this.checkLoadTimeOut("dropInitialiser")){return;}
if($iTXT.js.serverUrl&&$iTXT.cnst.CONTROLLER_INITIALISER){var initialiserUrl=$iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_INITIALISER;initialiserUrl+="?"+$iTXT.js.pageQuery;if(!(/&ts=/).test($iTXT.js.pageQuery)){initialiserUrl+="&ts="+$itxtUtil.ts();}
$iTXT.data.Dom.detectSearchEngines();initialiserUrl+=this._buildSearchEngineParams();if(undefined===this.contentLength){this.contentLength=0;try{this.contentLength=$itxtUtil.convertSpaces($itxtUtil.cleanString($itxtUtil.getInnerText(document.body,$iTXT.js.domTO))).length;}catch(e){this.contentLength=-1;}}
initialiserUrl+="&pagecl="+this.contentLength;var encoding=$itxtUtil.getContentEncoding();if(encoding&&''!==encoding){initialiserUrl+="&enc="+encoding;}
initialiserUrl+="&fv="+$iTXT.core.Flash.version.major;initialiserUrl+="&muid=";if(this.limitClientParams&&this.limitClientParams.length>0){initialiserUrl+="&lcp="+encodeURIComponent(this.limitClientParams.join(','));}
if(!$iTXT.js.pageRef){var refurl=($iTXT.glob&&$iTXT.glob.params)?$iTXT.glob.params.get('refurl',document.location.href):document.location.href;initialiserUrl+="&refurl="+encodeURIComponent(refurl);}
initialiserUrl+=this.checkDynamicAdhesionSuppression();$iTXT.fire("$iTXT:initialiser:drop",this);$itxtUtil.dropScript(initialiserUrl,$iTXT.core.Event.bind(this,this.initialiserLoad));}},initialiserLoad:function(cbr){var mtOpts;if(this.checkLoadTimeOut("initialiserLoad")){return;}
$iTXT.fire("$iTXT:initialiser:loaded",this);$iTXT.glob.newTooltipChrome=1;if(cbr){new $iTXT.data.Channel();$iTXT.data.Country.init($iTXT.glob.params.get("cc","en"));$iTXT.js.requiresContextualization=cbr.requiresContextualization;$iTXT.js.chunkKey=cbr.chunkKey;$iTXT.js.requiresAdverts=cbr.requiresAdverts;var isDraggable=$iTXT.glob.params.getBool("drag",1);var useMobile=$iTXT.core.Browser.isTargetedSmartphone($iTXT.glob.params.getBool("tt.force.mobile",false));if(undefined===$iTXT.ui.tt){if(useMobile&&$iTXT.glob.params.getBool('js.mobile.chrome',false)){$iTXT.ui.tt=new $iTXT.ui_mobile.Tooltip({draggable:isDraggable});}else{$iTXT.ui.tt=new $iTXT.ui.Tooltip({draggable:isDraggable});}
this.ttHolder=$iTXT.core.Builder.make("DIV",{id:"itxtttholder",style:"z-index: 9900000; position: absolute; top: 0; left:0;"},[$iTXT.ui.tt.rootElement]);document.body.appendChild(this.ttHolder);$iTXT.ui.tt.build();}
$iTXT.data.PixelController.init();$iTXT.glob.params.set("server",$iTXT.data.al.server,$iTXT.cnst.WEIGHTING_CHANNEL_DEFAULT);var ldr=$iTXT.glob.params.get("ldr","0");if("1"==ldr&&''!==document.referrer){mtOpts={mt:56,mv:document.referrer,advert:{params:$iTXT.glob.params}};$iTXT.fire("$iTXT:data:log:monitor",mtOpts);}
this.initialiserLoaded=true;$iTXT.fire("$iTXT:metrics:evt",{n:"intl"});$iTXT.glob.params.set("so",$iTXT.cnst.Source.ITXT,$iTXT.cnst.WEIGHTING_CAMPAIGN_DEFAULT);if(!this.skipRecontext){$iTXT.js.pageContextualized=1;$iTXT.data.Context.getContent();if($iTXT.glob.params.get('context.timeout.log',-1)>0&&$iTXT.data.Context.timedOut){mtOpts={mt:116,mv:$iTXT.data.Context.lastTimeOut,mv2:$iTXT.data.Context.getProcessedPercentage(),advert:{params:$iTXT.glob.params}};$iTXT.fire("$iTXT:data:log:monitor",mtOpts);}
if($iTXT.js.requiresContextualization){if($iTXT.data.Context.timedOut){this.dropAdvertiser();}else{this.dropContextualizer();}}else{if($iTXT.js.requiresAdverts){this.advertiserLoad();}}}}
this.checkCssLoad();$iTXT.fire("$iTXT:initialiser:load:complete",this);},dropContextualizer:function()
{if(this.checkLoadTimeOut("dropContextualizer")){return;}
if($iTXT.js.serverUrl&&$iTXT.cnst.CONTROLLER_CONTEXTUALIZER){this.getRelatedContentDetails();$iTXT.fire("$iTXT:metrics:evt",{n:"contint",t:'interval'});var tree=$iTXT.data.Context.tree;if($iTXT.data.Context.treeObjectMode){tree=$itxtUtil.serialiseJSON(tree,$iTXT.data.Context.allowedFields);}
var opts={contextUrl:this._createContextUrl(tree),chunkUrl:this._createChunkUrl(),callback:$iTXT.core.Event.bind(this,this.contextualizerLoad),data:tree};$iTXT.fire("$iTXT:contextualizer:drop",this);$iTXT.core.Ajax.postData(opts);}},_createContextUrl:function(tree){var contextUrl=$iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_CONTEXTUALIZER+"?ts="+$itxtUtil.ts();contextUrl+=this._buildSearchEngineParams();var extraPrms=["dfr","rc.a.d","rc.a.t","rc.a.st"];contextUrl+=this._buildQueryParams($iTXT.glob.params,extraPrms);contextUrl+="&pagecl="+this.contentLength;contextUrl+='&jsoncl='+tree.length;contextUrl+='&ppc='+$iTXT.data.Context.getProcessedPercentage();contextUrl+="&hn="+$iTXT.data.Context.textNodes.length;if($iTXT.data.Context.pageTitle){contextUrl+="&ttxt="+encodeURIComponent($iTXT.data.Context.pageTitle);}
return contextUrl;},_createChunkUrl:function(){return $iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_CHUNK;},contextualizerLoad:function(){if(this.checkLoadTimeOut("contextualizerLoad")){return;}
$iTXT.fire("$iTXT:contextualizer:loaded",this);$iTXT.fire("$iTXT:metrics:evt",{n:"contint"});$iTXT.fire("$iTXT:metrics:evt",{n:"contl"});if($iTXT.js.requiresAdverts)
{this.dropAdvertiser();}},dropAdvertiser:function(){if(this.checkLoadTimeOut("dropAdvertiser")){return;}
if($iTXT.js.serverUrl&&$iTXT.cnst.CONTROLLER_ADVERTISER){$iTXT.fire("$iTXT:metrics:evt",{n:"advint",t:'interval'});var advertiserUrl=$iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_ADVERTISER+"?ts="+$itxtUtil.ts();var extraPrms=["ign86"];advertiserUrl+=this._buildQueryParams($iTXT.glob.params,extraPrms);advertiserUrl+=this.checkDynamicAdhesionSuppression();advertiserUrl=$itxtUtil.appendQueryString(advertiserUrl,$iTXT.js.pageQuery);$iTXT.fire("$iTXT:advertiser:drop",this);$itxtUtil.dropScript(advertiserUrl,$iTXT.core.Event.bind(this,this.advertiserLoad));}},advertiserLoad:function(){if(this.checkLoadTimeOut("advertiserLoad")){return;}
$iTXT.fire("$iTXT:advertiser:loaded",this);$iTXT.fire("$iTXT:metrics:evt",{n:"advint"});$iTXT.fire("$iTXT:metrics:evt",{n:"advl"});$iTXT.tmpl.check();},templatesLoad:function(){if(this.checkLoadTimeOut("templatesLoad",true)){return;}
this.templatesLoaded=true;if('function'==typeof this.templateLoadUnSubFunc)
{this.templateLoadUnSubFunc();}
$iTXT.fire("$iTXT:metrics:evt",{n:"tl"});$iTXT.ui.HookManager.execute();},_buildQueryParams:function(pms,extraKeys){var retStr="";var cnst=$iTXT.cnst.Params;var keys=[cnst.REF,cnst.REF_MD5,cnst.UID,cnst.UID_MD5,"ipid","cc","rcc","reg","dma","city","auat","fo",["did","a.did"],["syid","a.syid"],["pid","a.pid"],"eat","dat","sest","seid","sehs","test","ugoogle"];extraKeys=extraKeys||[];keys=keys.concat(extraKeys);retStr+="&"+$itxtUtil.generateQueryString(keys,pms);return retStr;},_buildSearchEngineParams:function(){var rs="";if($iTXT.js.SearchEngineSettings.current)
{rs+="&sest="+$iTXT.js.SearchEngineSettings.current.sest;rs+="&seid="+$iTXT.js.SearchEngineSettings.current.seid;rs+="&sehs="+$iTXT.js.SearchEngineSettings.current.sehs;}
return rs;},getRelatedContentDetails:function(){var tObj=$iTXT.glob.params.get("iet",'<title>');var tObjIdx=$iTXT.glob.params.get("ieto",1);var sObj=$iTXT.glob.params.get("ies");var sObjIdx=$iTXT.glob.params.get("ieso",1);var dObj=$iTXT.glob.params.get("ied");var dObjIdx=$iTXT.glob.params.get("iedo",1);var title;var subtitle;var date;if(dObj){var dateTag=$iTXT.data.Dom.getElementByTagName(dObj,dObjIdx-1);if(dateTag){date=$itxtUtil.getText(dateTag);}else{dateTag=$iTXT.data.Dom.getElementByClassName(dObj,dObjIdx-1);if(dateTag){date=$itxtUtil.getText(dateTag);}}}
if(tObj){var titleTag=$iTXT.data.Dom.getNodeByTagClassOrId(tObj,tObjIdx-1);if(titleTag){title=$itxtUtil.getText(titleTag);}}
if(sObj){var sTitleTag=$iTXT.data.Dom.getNodeByTagClassOrId(sObj,sObjIdx-1);if(sTitleTag){subtitle=$itxtUtil.getText(sTitleTag);}}
var w=$iTXT.cnst.WEIGHTING_DEFAULT_CHANNEL;$iTXT.glob.params.set("rc.a.d",date,w);$iTXT.glob.params.set("rc.a.t",title,w);$iTXT.glob.params.set("rc.a.st",subtitle,w);},dropTimeoutID:-1,scriptDropped:false,hooksLoaded:function(e){var hks=e.data||[];if(hks.length>0){$iTXT.subscribe("$iTXT:ad:view",$iTXT.core.Event.bind(this,this.adView));var t=this;this.dropTimeoutID=setTimeout(function(){t.dropSS();},7000);}else{this.dropSS();}},adView:function(e){if(!this.scriptDropped){var ad=e.data||null;if(ad){if(-1!=this.dropTimeoutID){clearTimeout(this.dropTimeoutID);}
var script=ad.params.get("scriptsrc");if(script){if(ad.params.containsTokens(script)){script=ad.params.parse(script);}
this.dropSS(decodeURIComponent(script));}}}},dropSS:function(s){s=s||$iTXT.glob.params.get("scriptsrc");if('string'==typeof s&&s.indexOf("http:"!=-1)){$itxtUtil.dropScript(s);this.scriptDropped=true;}},checkDynamicAdhesionSuppression:function(){if(window.vmNoBanner){return"&noda";}else{return"";}}});if(undefined===$iTXT.itxt.currentController){new $iTXT.itxt.Controller();}};$iTXT.js.loader["$iTXT.metrics.Events"]=true;$iTXT.metrics.Events_Load=function(){var undefined;$iTXT.metrics.Events=$iTXT.core.Class.create({cOut:true,eventQueue:null,init:function()
{this.eventQueue={};$iTXT.subscribe("$iTXT:metrics:evt",$iTXT.core.Event.bind(this,this._event));$iTXT.subscribe("$iTXT:adlogger:before:log",$iTXT.core.Event.bind(this,this._adlog));},_event:function(e)
{var opts=e.data||{};if(opts.n&&""!=opts.n)
{var evt=this.eventQueue[opts.n];if(null==evt)
{evt=this._createEvt(opts.n,opts.t);this.eventQueue[opts.n]=evt;}
this._updateEvt(evt,opts);}},_updateEvt:function(evt,opts)
{if(evt.t&&"interval"==evt.t)
{if(evt.st)
{evt.et=(new Date()).getTime();evt.done=true;this._log("Interval: "+this._pname(evt.n)+" "+(evt.et-evt.st)+"ms");}
else
{evt.st=(new Date()).getTime();}}
else
{evt.st=this._timeSinceLoad();evt.done=true;this._log("TimeSinceLoad: "+this._pname(evt.n)+" "+(evt.tsl)+"ms");}},_createEvt:function(name,evtType)
{evtType=evtType||"timesince";var evt={n:name,t:evtType,done:false};return evt;},_timeSinceLoad:function()
{return(new Date()).getTime()-$iTXT.js.startTime;},_log:function(msg)
{},_pname:function(n)
{var a={'ll':'Libraries Loaded','tl':'Templates Loaded','intl':'Initialiser Loaded','contl':'Contextualiser Loaded','advl':'Advertiser Loaded','contint':'Contextualiser Interval','advint':'Advertiser Interval'};return a[n];},getEvents:function()
{var retObj={};for(var ename in this.eventQueue)
{var evt=this.eventQueue[ename];if(evt&&evt.done)
{this.eventQueue[ename]=undefined;var evtVal=evt.st;if(evt.et&&""!=evt.et)
{evtVal=evt.et-evt.st;}
retObj[ename]=evtVal;}}
return retObj;},_adlog:function(e)
{var cb=e.data||null;if('function'==typeof cb)
{var evts=this.getEvents(),pEvts=[];for(var n in evts)
{pEvts[pEvts.length]=n+':'+evts[n];}
pEvts=pEvts.join('|');cb({prf:pEvts});}}});};$iTXT.js.loader["$iTXT.tmpl.Cell"]=true;$iTXT.tmpl.Cell_Load=function(){var undefined;$iTXT.tmpl.Cell=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{rows:null,element:null,init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtcell"),className:"itxtcell"},_options);$super(defOpts,ad);this.rows=[];if(this.options.structure)
{this._build(this.options.structure,ad);}},dispose:function($super)
{if(null!=this.rows)
{for(var i=0;i<this.rows.length;i++)
{this.rows[i].dispose();}}
else if(null!=this.element)
{this.element.dispose();}
$super();},_build:function(s,ad)
{if(VM._.isArray(s))
{if((s.length==1)&&s[0].type&&('comp'==s[0].type)&&s[0].klass)
{var opts=s[0];opts.template=this;this.rows=null;var compClass=eval(opts.klass);this.element=new compClass(opts,ad);this.element.parentNode=this.rootElement;this.rootElement.appendChild(this.element.rootElement);this.fillWidth=this.element.fillWidth;this.fillHeight=this.element.fillHeight;return;}
for(var i=0;i<s.length;i++)
{if(s[i].type&&'row'==s[i].type)
{var r=new $iTXT.tmpl.Row(s[i],ad);this.rows.push(r);r.parentNode=this.rootElement;this.rootElement.appendChild(r.rootElement);}}}},_resize:function(w,h)
{this.rootElement.itxtSetStyle({width:"",height:""});if(null!=this.element)
{this.element.resize(w,h);w=this.element.width;h=this.element.height;this.fillWidth=this.element.fillWidth;this.fillHeight=this.element.fillHeight;}
if((null==this.element)&&(null!=this.rows)&&(0<this.rows.length))
{var th=0;var ers=0;for(var i=0;i<this.rows.length;i++)
{var r=this.rows[i];if(r.fillHeight)
{ers++;}
else if(r.contentHeight)
{var dims=r.neededSize(w,h);r.height=dims[1];th+=dims[1];}
else
{th+=r.height;}}
var rh=h-th;var erh=(0==ers)?0:Math.floor(Math.max(rh/ers,0));h=0;for(var i=0;i<this.rows.length;i++)
{var r=this.rows[i];var rh=(r.fillHeight)?erh:r.height;var rowdim=r.resize(w,rh);w=(rowdim[0]>w)?rowdim[0]:w;h+=(rowdim[1]>rh)?rowdim[1]:rh;}}
return[w,h];},_neededSize:function(w,h)
{if(null!=this.element)
{var edims=this.element.neededSize(w,h);if(this.contentWidth)
w=edims[0];if(this.contentHeight)
h=edims[1];}
else if((null!=this.rows)&&(0<this.rows.length))
{if(this.contentHeight)
{var availH=h;h=0;for(var i=0;i<this.rows.length;i++)
{var r=this.rows[i];var rdims=r.neededSize(w,availH);h+=rdims[1];}}}
return[w,h];},needsResize:function(w,h,$super)
{if(null!=this.element&&this.element.needsResize(w,h))
{return true;}
else if((null!=this.rows)&&(0<this.rows.length))
{for(var i=0;i<this.rows.length;i++)
{if(this.rows[i].needsResize(w,h))
{return true;}}}
return $super(w,h);},isLoaded:function()
{if(null!=this.element)
{return this.element.isLoaded();}
else if(this.rows.length>0)
{for(var i=0;i<this.rows.length;i++)
{if(!this.rows[i].isLoaded())
{return false;}}}
return true;}});};$iTXT.js.loader["$iTXT.tmpl.ElementBase"]=true;$iTXT.tmpl.ElementBase_Load=function(){var undefined;$iTXT.tmpl.ElementIdentifier={id:0,categories:{},get:function(cat)
{if(cat)
{if(!this.categories[cat])
{this.categories[cat]=0;}
return cat+(this.categories[cat]++);}
return"itxtelmt"+(this.id++);}};$iTXT.tmpl.ElementBase=$iTXT.core.Class.create({fillWidth:true,fillHeight:true,contentWidth:false,contentHeight:false,properties:null,events:null,advert:null,reCalculateSize:true,neededWidth:0,neededHeight:0,lastAvailableWidth:0,lastAvailableHeight:0,evtDspFuncs:null,defaultProperties:{},parentNode:null,init:function(_options,ad)
{this.evtDspFuncs=[];this.advert=ad;if(this.advert)
{if(this.paramDefaults&&$iTXT.core.Util.isObject(this.paramDefaults))
{this.advert.addTemplateParams(this.paramDefaults,$iTXT.cnst.WEIGHTING_DEFAULT_COMPONENT);}}
this.template=this.advert.getTemplate();if(null!=this.template)
{this.template.addComponent(this);}
var newUID=_options.id||$iTXT.tmpl.ElementIdentifier.get();this.defaultOptions=$iTXT.core.Util.cloneObject(_options);this.options=$iTXT.core.Util.extend({UID:newUID,id:newUID,className:""},_options);this.events=$iTXT.core.Util.cloneObject(this.options.events||{});if(this.options.width&&"**"==this.options.width)
{this.contentWidth=true;this.fillWidth=false;this.options.width=0;}
else if(this.options.width&&"*"!=this.options.width)
{this.fillWidth=false;}
if(this.options.height&&"**"==this.options.height)
{this.contentHeight=true;this.fillHeight=false;this.options.height=0;}
else if(this.options.height&&"*"!=this.options.height)
{this.fillHeight=false;}
this.width=this.options.width||0;this.height=this.options.height||0;this.properties=$iTXT.core.Util.extend($iTXT.core.Util.cloneObject(this.defaultProperties),$iTXT.core.Util.cloneObject(this.options.props||{}));if(ad)
{if(this.events.beforeTokenize)
{this.events.beforeTokenize.apply(this);}
this.properties=ad.tokenize(this.properties);if(this.options.styles)
{this.options.styles=ad.tokenize($iTXT.core.Util.cloneObject(this.options.styles));}
if(this.options.hoverstyles)
{this.options.hoverstyles=ad.tokenize($iTXT.core.Util.cloneObject(this.options.hoverstyles));}
if(this.options.ttoverstyles)
{this.options.ttoverstyles=ad.tokenize($iTXT.core.Util.cloneObject(this.options.ttoverstyles));}}
if(this.properties.id)
{this.options.id=this.properties.id;}
this.rootElement=$iTXT.core.Builder.make("DIV",{id:this.options.id,className:this.options.className});this.rootElement.itxtSetStyle({position:"relative"});this.rootElement.itxtSubscribe("mouseover",$iTXT.core.Event.bind(this,this._onMouseOver));this.rootElement.itxtSubscribe("mouseout",$iTXT.core.Event.bind(this,this._onMouseOut));this.rootElement.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._onMouseClick));$iTXT.subscribe("$iTXT:tt:mouse:over",$iTXT.core.Event.bind(this,this._onTooltipOver));$iTXT.subscribe("$iTXT:tt:mouse:out",$iTXT.core.Event.bind(this,this._onTooltipOut));if(this.events.onCreate)
{this.events.onCreate.apply(this);}
this._applyStyles();},_applyStyles:function()
{if(this.options.styles)
{this.rootElement.itxtSetStyle(this.options.styles);}},dispose:function()
{this.rootElement.innerHTML="";this.rootElement=null;if(this.events.onDispose)
{this.events.onDispose.apply(this);}
this.flushEvents();},flushEvents:function(){for(var i=0;i<this.evtDspFuncs.length;i++)
{var f=this.evtDspFuncs[i];if('function'==typeof f)
{f.call();}}
this.evtDspFuncs=[];},position:function(l,t)
{if(null!=l&&null!=t)
{this.left=l;this.top=t;this.rootElement.itxtSetStyle({position:"absolute",left:this.left+"px",top:this.top+"px"});}
else
{this.rootElement.itxtSetStyle({position:"relative"});}},resize:function(w,h)
{this.width=w;this.height=h;var dims=this._resize(w,h);if(null!=dims)
{this.width=dims[0];this.height=dims[1];}
if(undefined===this.options.fillSize||true===this.options.fillSize)
{this.rootElement.itxtSetStyle({width:this.width+"px",height:this.height+"px"});}
return[this.width,this.height];},_resize:function(w,h)
{if(this.events.onResize)
{var newDims=this.events.onResize.apply(this,[w,h]);if(null!=newDims&&VM._.isArray(newDims))
{w=newDims[0];h=newDims[1];return[w,h];}}
return null;},neededSize:function(w,h)
{if(this.needsResize(w,h))
{this.reCalculateSize=false;this.lastAvailableWidth=w;this.lastAvailableHeight=h;var dims=this._neededSize(w,h);this.neededWidth=dims[0];this.neededHeight=dims[1];}
return[this.neededWidth,this.neededHeight];},_neededSize:function(w,h)
{if(this.events.neededSize)
{return this.events.neededSize.apply(this,[w,h]);}
return[w,h];},needsResize:function(w,h)
{var rv=this.reCalculateSize||((this.lastAvailableWidth!=w&&this.fillWidth)||(this.lastAvailableHeight!=h&&this.fillHeight));return rv;},render:function()
{return this.rootElement;},_onMouseOver:function(e)
{if(this.options.hoverstyles&&this.rootElement)
{this.rootElement.itxtSetStyle(this.options.hoverstyles);}
if(this.events.onMouseOver)
{this.events.onMouseOver.apply(this,[e]);}
return true;},_onMouseOut:function(e)
{if(this.options.hoverstyles&&this.rootElement)
{this.rootElement.itxtSetStyle(this.options.styles,this.options.hoverstyles);}
if(this.events.onMouseOut)
{this.events.onMouseOut.apply(this,[e]);}
return true;},_onMouseClick:function(e)
{var validElements={itxtaddomain:"link",LogoImageCell:"image",TopTitleRow:"title",itxtmiddletitle:"title",DescriptionRow:"description"};if(validElements[this.options.UID])
{this.advert.clickSource=validElements[this.options.UID];}
if(this.events.onMouseClick)
{if(!this.events.onMouseClick.apply(this,[e]))
{return false;}}
return true;},isLoaded:function()
{return true;},shrinkRoot:function()
{if(this.rootElement)
{this.rootElement.itxtSetStyle({width:"0px",height:"0px"});}},expandRoot:function()
{if(this.rootElement)
{this.rootElement.itxtSetStyle({width:"auto",height:"auto"});}},_onTooltipOver:function()
{},_onTooltipOut:function()
{}});};$iTXT.js.loader["$iTXT.tmpl.Flash"]=true;$iTXT.tmpl.Flash_Load=function(){var undefined;$iTXT.tmpl.Flash=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{validFlash:false,extraFlashVars:null,init:function(_options,ad,$super)
{var startSrc=_options.props.src;var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtFlash")},_options);$super(defOpts,ad);if(startSrc!=this.properties.src)
{if(this.built)
{this.reset();this.built=true;}}
this.build();},getWidth:function(){return this.properties.width||this.template.defaultWidth;},getHeight:function(){return this.properties.height||this.template.defaultHeight;},getFlashStyle:function(){var css=['display:block','width:<%=width%>px','height:<%=height%>px'].join(';');var values={width:this.getWidth(),height:this.getHeight()};return VM._.template(css,values);},build:function()
{if(this.built)
{return;}
this.validFlash=true;this.extraFlashVars={};var actualSrc=this.properties.src;var qmIndex=actualSrc.indexOf('?');if(qmIndex!=-1)
{var flvStr=decodeURIComponent(actualSrc.substring(qmIndex+1));this.extraFlashVars=$iTXT.core.Util.decodeQueryString(flvStr);this.properties.vars=$iTXT.core.Util.objKeys(this.extraFlashVars);this.extraFlashVars["clickURL"]=undefined;actualSrc=actualSrc.substring(0,qmIndex);}
var contDiv=document.createElement("div");contDiv.id=this.options.id+"flashCont";var flashStyle=this.getFlashStyle();var fDC=this.advert.params.get("fl.div.col");if(null!=fDC)
{if('#'!=fDC.substr(0,1))
{fDC='#'+fDC;}
flashStyle+='background-color: '+fDC+';';}
this.flashStyleDiv=$iTXT.core.Builder.make("DIV",{id:this.options.id+"Style",style:flashStyle});this.flashHldr=$iTXT.core.Builder.make("DIV",{id:this.options.id+"Hldr",style:"display: inline-block;-moz-box-sizing: content-box;box-sizing: content-box;-ms-box-sizing: content-box;-webkit-box-sizing: content-box;"},[this.flashStyleDiv]);this.rootElement.itxtAppendChild(this.flashHldr);var flashProperties={width:this.properties.width||this.template.defaultWidth,height:this.properties.height||this.template.defaultHeight,id:this.options.id+"MC",name:this.options.id+"MC",src:actualSrc,style:flashStyle,scale:"exactfit",quality:"high",wmode:"transparent",swliveconnect:"true",allowscriptaccess:"always",allowfullscreen:"true",flashvars:this._getFlashVars(),type:"application/x-shockwave-flash",bgcolor:"transparent"};this.finalFlashProperties=flashProperties;if($iTXT.core.Browser.is("Explorer"))
{var flashElementId='itxtFlashObj';var objElement=$iTXT.core.Builder.make("DIV",{id:flashElementId},[]);this.flashStyleDiv.itxtAppendChild(objElement);var objAttrs={classid:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",style:flashProperties.style,width:flashProperties.width,height:flashProperties.height,id:flashProperties.id,name:flashProperties.name,type:"application/x-shockwave-flash"};delete flashProperties.style;delete flashProperties.id;delete flashProperties.name;delete flashProperties.width;delete flashProperties.height;flashProperties.movie=flashProperties.src;var attributes='';var params='';for(var i in objAttrs)
{attributes+=i+'="'+objAttrs[i]+'" ';}
for(var i in flashProperties)
{params+='<param name="'+i+'" value="'+flashProperties[i]+'" />';}
var html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+attributes+'>'+params+'</object>';if(objElement)
{objElement.outerHTML=html;}}
else
{var flMC=$iTXT.core.Builder.make("EMBED",flashProperties);contDiv.appendChild(flMC);this.flashStyleDiv.innerHTML=contDiv.innerHTML;}
this._applyStyles();var flashHandlesClick=this.advert.params.get("fl.handles.clk",0);if(flashHandlesClick)
{this.rootElement.itxtSubscribe("click",function(e){e.stop();return false;});}
$iTXT.core.$(document).itxtBatchSubscribe([["$iTXT:flash:setvar",$iTXT.core.Event.bind(this,this.setFlashVar)],["$iTXT:flash:call",$iTXT.core.Event.bind(this,this.callFlashMethod)],["$iTXT:tt:before:open",$iTXT.core.Event.bind(this,this._tooltipOpening)]],this.evtDspFuncs);},_tooltipOpening:function()
{if(!this.addedEvents)
{this.addedEvents=true;if(null!=document.getElementById(this.options.id+"MC"))
{$iTXT.core.$(this.options.id+"MC").itxtBatchSubscribe(["click",function(e){e.stop();},"mouseover",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:over");},"mousemove",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:over");}]);}}},_applyStyles:function()
{if(this.options.styles&&this.flashHldr)
{this.flashHldr.itxtSetStyle(this.options.styles);}},paramMapping:{'wMax':'fwm','hMax':'fhm','wMin':'fw','hMin':'fh','bgc':'tt.bg.col','tthv':'tt.bg.h.col'},_getFlashVars:function()
{if(this.advert.params.get('A.AT')==155)
{return this._buildFlashVars();}
var thisParams=this.advert.params;var flvstr="";this.properties.vars=this.properties.vars||[];var allowedVars=this.properties.vars.concat(["a","aClr","adx","ar","at","audioUsr","banner","bg","bgc","boc","bt","buc","cc","clickColor","clickPlay","clickVarName","cta","cta2","ctac","ctaCase","ctaImg","ctat","cts","fao","hMax","hMin","hqSrc","iPath","k","l1","l2","l3","l4","link1","link2","link3","link4","ll","lMsg","loc","logo","logoH","lqSrc","mpuAudio","mpuBgc","msTrk","msTrk2","mvuData","pageRef","playLim","seid","sest","src","so","t","t1","t2","t3","t4","tBox","tc","tClr","tcol","tD","tl","tracker1","tracker2","trkimg","trueH","trueW","tt","tt1","tt2","tt3","tt4","v8Src","verifyAge","verifyText","vl","webClickURL","webIMG","wMax","wMin","xPanded"]);var campaignSpecificFlParams=this.advert.params.get("fl.vars","").split(",");for(var i=0;i<campaignSpecificFlParams.length;i++)
{var flParam=campaignSpecificFlParams[i];if(""!=flParam)
{var flVal=this.advert.params.get("fl."+flParam,null);allowedVars.push(flParam);this.extraFlashVars[flParam]=flVal;}}
var clickVarName=this.advert.params.get("exp.flash.clickvarname","clickURL");allowedVars.push(clickVarName);if("clickURL"!=clickVarName)
{thisParams.set(clickVarName,decodeURIComponent(thisParams.get('clickURL')),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}
var templateFlashVars=this.advert.params.get("templateFlashVars",{});for(var fvName in templateFlashVars)
{allowedVars.push(fvName);}
var clickVarNames=this.advert.params.get("cvn","");clickVarNames=clickVarNames.split(",");var fti=this.advert.params.parse("${fl.trk.image}");if(fti&&!fti.match(/\$\{/))
{var pos='';var kpt=!!(this.advert.params.get('kp',0));if(kpt)
{var bounds=this.advert.hook.getPosition();if(bounds)
{pos='&kp='+bounds.left+','+bounds.top;}}
fti=$iTXT.data.al.getClickURL(this.advert,{so:$iTXT.cnst.Source.LOGO,ttv:this.advert.params.get('ttv','1'),ll:this.advert.params.get('ll','0'),llip:this.advert.params.get('llip','0')},null,true)+pos+'&rdti='+encodeURIComponent(fti);this.advert.params.set('clickURL2',this.advert.params.get('clickURL'),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.advert.params.set('clickURL',fti,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);clickVarNames.push('clickURL2');}
for(var i=0;i<clickVarNames.length;i++)
{allowedVars.push(clickVarNames[i]);}
var setVarsHash={};for(var i=0;i<allowedVars.length;i++)
{var flVarName=allowedVars[i];var flVarMappedName=flVarName;if(!setVarsHash[flVarName])
{setVarsHash[flVarName]=true;if(this.paramMapping[flVarName])
{flVarMappedName=this.paramMapping[flVarName];}
var flVarVal=this.advert.params.get(flVarMappedName);if(templateFlashVars[flVarMappedName])
{flVarVal=templateFlashVars[flVarMappedName];}
if(undefined!=this.extraFlashVars[flVarMappedName])
{var flVal=this.advert.params.parse(this.extraFlashVars[flVarMappedName]);if("adx"!=flVarName)
{flVal=encodeURIComponent(flVal);}
flvstr+=flVarName+"="+flVal+"&";}
else if(null!=flVarVal)
{var flVal=this.advert.params.parse(flVarVal);if("adx"!=flVarName)
{flVal=encodeURIComponent(flVal);}
if(flVarName==='at')
{flVal=this.advert.getAdvertType().toString();}
flvstr+=flVarName+"="+flVal+"&";}
if(flVarName=="pageRef")
{var pageRefValue=this.advert.params.parse(flVarVal)||encodeURIComponent(document.location.hostname);flvstr+="pageRef="+pageRefValue+"&";}}}
var faoVal=this.advert.params.get('fao');if(faoVal&&faoVal==0){flvstr+="jsAudioAdjust=AUDIO_OFF&";}
if($iTXT.data.al)
{flvstr+="tracker1="+encodeURIComponent($iTXT.data.al.getTrackerUrl($iTXT.data.AdViewValue.ADVIEW_VIDEO_FIRSTFRAME))+"&";flvstr+="tracker2="+encodeURIComponent($iTXT.data.al.getTrackerUrl($iTXT.data.AdViewValue.ADVIEW_VIDEO_LASTFRAME))+"&";}
if(this.isMoatEnabled())
{flvstr+=this.getMoatQueryString()+'&';}
return flvstr;},callFlashMethod:function(e)
{var opts=e.data||{};var flmc=document.getElementById(this.options.id+"MC");if(opts.method&&flmc)
{try
{if(!opts.param)
{flmc[opts.method]();}
else
{flmc[opts.method](opts.param);}}
catch(e)
{}}},setFlashVar:function(e)
{var opts=e.data||{};var flmc=document.getElementById(this.options.id+"MC");if(opts.key&&opts.value&&flmc)
{try
{flmc.SetVariable(opts.key,opts.value);}
catch(e)
{}}},_resize:function(w,h,$super)
{var flmc=document.getElementById(this.options.id+"MC");try
{if(!this.validFlash)
return[0,0];this.flashHldr.itxtSetStyle({width:"",height:""});if(this.properties.width&&this.properties.height)
{flmc.width=this.properties.width;flmc.height=this.properties.height;this.flashHldr.itxtSetStyle({width:this.properties.width+"px",height:this.properties.height+"px"});return $super(this.flashHldr.offsetWidth,this.flashHldr.offsetHeight);}
if(this.fillWidth)
{flmc.width=w;this.flashHldr.itxtSetStyle({width:w+"px"});var wD=this.flashHldr.offsetWidth-w;if(wD>0)
{flmc.width=(w-wD);}}
if(this.fillHeight)
{flmc.height=h;this.flashHldr.itxtSetStyle({height:h+"px"});var hD=this.flashHldr.offsetHeight-h;if(hD>0)
{flmc.height=(h-hD);}}
return $super(w,h);}
catch(e)
{return[0,0];}},_neededSize:function(w,h,$super)
{var flmc=document.getElementById(this.options.id+"MC");try
{if(!this.validFlash)
return[0,0];this.flashHldr.itxtSetStyle({width:"",height:""});if(this.properties.width&&this.properties.height)
{flmc.width=this.properties.width;flmc.height=this.properties.height;this.flashHldr.itxtSetStyle({width:this.properties.width+"px",height:this.properties.height+"px"});return[this.flashHldr.offsetWidth,this.flashHldr.offsetHeight];}
return $super(w,h);}
catch(e)
{return[0,0];}},reset:function()
{this.removeFlash();var oldParent=this.parentNode;this.init(this.defaultOptions,this.advert);if(null!=oldParent)
{$iTXT.core.$(oldParent).itxtClear();oldParent.appendChild(this.rootElement);}
this.addedEvents=false;},removeFlash:function()
{var flash=document.getElementById(this.options.id+'MC');if(flash)
{$iTXT.core.Util.removeSWF(flash);this.rootElement.itxtClear();}},isMoatEnabled:function(ad)
{if(!ad)
{ad=this.advert;}
return ad.params.getBool(ad.params.parse('fl.trk.eng.${cc}'),false);},getMoatQueryString:function(ad)
{if(!ad)
{ad=this.advert;}
return'moatID='+ad.params.get('iono')+'|'+window.encodeURIComponent(ad.$A.kw)+'|'+ad.params.get('ipid')+'|'+ad.$A.did;},flashAdParamNames:["a","aClr","adx","ar","audioUsr","banner","bgc","boc","bt","buc","cc","clickColor","clickPlay","cta","cta2","ctac","ctaCase","ctaImg","ctat","cts","fao","hMax","hMin","hqSrc","iPath","k","l1","l2","l3","l4","link1","link2","link3","link4","ll","lMsg","loc","logo","logoH","lqSrc","mpuAudio","mpuBgc","msTrk","msTrk2","mvuData","pageRef","playLim","seid","sest","src","so","t","t1","t2","t3","t4","tBox","tc","tClr","tcol","tD","tl","trkimg","trueH","trueW","tt","tt1","tt2","tt3","tt4","v8Src","verifyAge","verifyText","vl","webClickURL","webIMG","wMax","wMin","xPanded"],_setExtraFlashVars:function(){this.extraFlashVars={};actualSrc=this.properties.src;var qmIndex=this.properties.src.indexOf('?');if(qmIndex>-1)
{var flvStr=actualSrc.substring(qmIndex+1);this.extraFlashVars=$iTXT.core.Util.decodeQueryString(flvStr);}},_addClickTagToExtraFlashVars:function(){if(!this.extraFlashVars.clickTag){this.extraFlashVars.clickTag=this.advert.params.get('CLICKURL');}
var clickVarName=this.extraFlashVars['clickVarName'];if(clickVarName)
{this.extraFlashVars[clickVarName]=this.extraFlashVars.clickTag;}
clickVarName=this.advert.params.get("exp.flash.clickvarname","clickURL");this.extraFlashVars[clickVarName]=this.extraFlashVars.clickTag;if(this.properties.src.indexOf("vmFlashClickURLHandler.swf")!==-1){this._addLegacyFlashSupport();}},_addLegacyFlashSupport:function(){var clickURL=this.extraFlashVars.clickTag;var qs;while(clickURL.indexOf("%")>-1){clickURL=decodeURIComponent(clickURL);}
var clickUrlParts=clickURL.split("?");if(clickUrlParts.length>2){qs=VM._.rest(clickUrlParts,1);clickUrlParts[1]=qs.join("?");}
clickURL=clickUrlParts[0]+"?"+encodeURIComponent(encodeURIComponent(clickUrlParts[1]));this.extraFlashVars.clickURL=clickURL;if(!this.extraFlashVars.clickVarName){this.extraFlashVars.clickVarName="clickTag";}},_addCampaignFlashParamsToExtraFlashVars:function()
{var campaignSpecificFlParams=this.advert.params.get("fl.vars","").split(",");var filts=VM._(campaignSpecificFlParams).filter(function(flParam){return flParam!="";});VM._.each(filts,function(flParam){var flVal=this.advert.params.get("fl."+flParam,null);if(flVal)
{this.extraFlashVars[flParam]=flVal;}},this);},_addFlashAdParamsToExtraFlashVars:function()
{VM._(this.flashAdParamNames).forEach(function(name){var value=this.advert.params.get(name);if(value&&!this.extraFlashVars[name])
{this.extraFlashVars[name]=value;}},this);},_addTemplateFlashParamsToExtraFlashVars:function()
{var templateFlashVars=this.advert.params.get("templateFlashVars",{});var flVarVal;var flVarName;for(flVarName in templateFlashVars)
{var flVarMappedName=this.paramMapping[flVarName];if(flVarMappedName&&this.extraFlashVars[flVarMappedName])
{return;}
if(flVarMappedName&&templateFlashVars[flVarMappedName])
{flVarName=flVarMappedName;flVarVal=templateFlashVars[flVarMappedName];}
else if(flVarMappedName&&this.advert.params.get(flVarMappedName))
{flVarName=flVarMappedName;flVarVal=this.advert.params.get(flVarMappedName);}
else if(templateFlashVars[flVarName])
{flVarVal=templateFlashVars[flVarName];}
else if(this.advert.params.get(flVarName))
{flVarVal=this.advert.params.get(flVarName);}
if(flVarVal)
{this.extraFlashVars[flVarName]=flVarVal;this.advert.params.set(flVarName,flVarVal,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}}},_addFlashTrackingImageToExtraFlashVars:function(){var fti=this.advert.params.parse("${fl.trk.image}");if(fti&&!fti.match(/\$\{/))
{var pos='';var kpt=!!(this.advert.params.get('kp',0));if(kpt)
{var bounds=this.advert.hook.getPosition();if(bounds)
{pos='&kp='+bounds.left+','+bounds.top;}}
fti=$iTXT.data.al.getClickURL(this.advert,{so:$iTXT.cnst.Source.LOGO,ttv:this.advert.params.get('ttv','1'),ll:this.advert.params.get('ll','0'),llip:this.advert.params.get('llip','0')},null,true)+pos+'&rdti='+encodeURIComponent(fti);this.advert.params.set('clickURL2',this.advert.params.get('clickURL'),$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.advert.params.set('clickURL',fti,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.extraFlashVars['clickURL']=fti;this.extraFlashVars['clickURL2']=this.advert.params.get('clickURL');}},_addCvnParamsToExtraFlashVars:function(){var cvnNames=this.advert.params.get("cvn");if(cvnNames){cvnNames=cvnNames.split(",");for(var i=0;i<cvnNames.length;i++){var cvnParam=this.advert.params.get(cvnNames[i]);if(cvnParam){this.extraFlashVars[cvnNames[i]]=cvnParam;}}}},_buildFlashVars:function(){var flvstr="";this._setExtraFlashVars();this._addClickTagToExtraFlashVars();this._addCampaignFlashParamsToExtraFlashVars();this._addFlashAdParamsToExtraFlashVars();this._addTemplateFlashParamsToExtraFlashVars();this._addCvnParamsToExtraFlashVars();this._addFlashTrackingImageToExtraFlashVars();var pairs=VM._(this.extraFlashVars).pairs();VM._.each(pairs,function(pair){var flVarName=pair[0];var flVal=this.advert.params.parse(pair[1]);flvstr+=flVarName+"="+flVal+"&";},this);flvstr+="at="+this.advert.getAdvertType().toString()+"&";var pageRefValue=this.advert.params.parse(this.advert.params.get("pageRef"))||document.location.hostname;flvstr+="pageRef="+encodeURIComponent(pageRefValue)+"&";var faoVal=this.advert.params.get('fao');if(faoVal&&faoVal==0){flvstr+="jsAudioAdjust=AUDIO_OFF&";}
if($iTXT.data.al)
{flvstr+="tracker1="+encodeURIComponent($iTXT.data.al.getTrackerUrl($iTXT.data.AdViewValue.ADVIEW_VIDEO_FIRSTFRAME))+"&";flvstr+="tracker2="+encodeURIComponent($iTXT.data.al.getTrackerUrl($iTXT.data.AdViewValue.ADVIEW_VIDEO_LASTFRAME))+"&";}
flvstr+=(this.isMoatEnabled())?this.getMoatQueryString()+'&':"";return flvstr;}});};$iTXT.js.loader["$iTXT.tmpl.Html"]=true;$iTXT.tmpl.Html_Load=function(){var undefined;$iTXT.tmpl.Html=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtHtml")},_options);$super(defOpts,ad);if(VM._.isString(this.properties.src))
{this.rootElement.innerHTML=this.properties.src;}
else if(VM._.isFunction(this.properties.src))
{var content=this.properties.src.call(this);this.rootElement.itxtAppendChild(content);}},_resize:function(w,h,$super)
{var $iUtil=$iTXT.core.Util,height=$iUtil.getStyle(this.rootElement,'height','height'),width=$iUtil.getStyle(this.rootElement,'width','width');if('auto'===width)
{width=this.rootElement.offsetWidth;}
if('auto'===height)
{height=this.rootElement.offsetHeight;}
width=parseInt(width,10);height=parseInt(height,10);return[width,height];}});};$iTXT.js.loader["$iTXT.tmpl.Html5Video"]=true;$iTXT.tmpl.Html5Video_Load=function(){var undefined;$iTXT.tmpl.Html5Video=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtHtml5Video")},_options);$super(defOpts,ad);this.videoHldr=$iTXT.core.Builder.make("DIV",{id:this.options.id+"Hldr",style:"display: inline-block;-moz-box-sizing: content-box;box-sizing: content-box;-ms-box-sizing: content-box;-webkit-box-sizing: content-box;"});var html5Src=this.advert.params.get("js.html5.src");var imageSrc=this.advert.params.get("js.html5.img.src");var videoHtml='<video onclick="this.play()" controls></video>';this.videoHldr.innerHTML=videoHtml;var videoElement=this.videoHldr.firstChild;videoElement.setAttribute('width',this.options.props.width);videoElement.setAttribute('height',this.options.props.height);videoElement.setAttribute('id',this.options.id+'MC');if(imageSrc){videoElement.setAttribute('poster',imageSrc);}
var sourceHtml='<source src="'+html5Src+'" />';videoElement.innerHTML=sourceHtml;this.rootElement.itxtAppendChild(this.videoHldr);$iTXT.core.$(this.videoHldr).itxtSubscribe("click",$iTXT.core.Event.bind(this,this._play));this._applyStyles();},_play:function(e)
{e.preventDefault();e.cancelBubble=true;var vid=document.getElementById(this.options.id+"MC");vid.play();},_resize:function(w,h,$super)
{var vid=document.getElementById(this.options.id+"MC");try
{this.videoHldr.itxtSetStyle({width:"",height:""});if(this.properties.width&&this.properties.height)
{vid.width=this.properties.width;vid.height=this.properties.height;this.videoHldr.itxtSetStyle({width:this.properties.width+"px",height:this.properties.height+"px"});return $super(this.videoHldr.offsetWidth,this.videoHldr.offsetHeight);}
if(this.fillWidth)
{vid.width=w;this.videoHldr.itxtSetStyle({width:w+"px"});var wD=this.videoHldr.offsetWidth-w;if(wD>0)
{vid.width=(w-wD);}}
if(this.fillHeight)
{vid.height=h;this.videoHldr.itxtSetStyle({height:h+"px"});var hD=this.videoHldr.offsetHeight-h;if(hD>0)
{vid.height=(h-hD);}}
return $super(w,h);}
catch(e)
{return[0,0];}},_neededSize:function(w,h,$super)
{var vid=document.getElementById(this.options.id+"MC");try
{this.videoHldr.itxtSetStyle({width:"",height:""});if(this.properties.width&&this.properties.height)
{vid.width=this.properties.width;vid.height=this.properties.height;this.videoHldr.itxtSetStyle({width:this.properties.width+"px",height:this.properties.height+"px"});return[this.videoHldr.offsetWidth,this.videoHldr.offsetHeight];}
return $super(w,h);}
catch(e)
{return[0,0];}},_applyStyles:function()
{if(this.options.styles&&this.videoHldr)
{this.videoHldr.itxtSetStyle(this.options.styles);}}});};$iTXT.js.loader["$iTXT.tmpl.Iframe"]=true;$iTXT.tmpl.Iframe_Load=function(){var undefined;$iTXT.tmpl.Iframe=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{mouseOver:false,init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtIframe")},_options);this._buildSrc();$super(defOpts,ad);this.properties.src=$iTXT.core.Util.getEmbeddedURL(this.properties.src);if(this.properties.srcParams){this.properties.src+='&'+$iTXT.core.Util.buildQueryString(this.properties.srcParams);}
if(false&&$iTXT.tmpl.Flash.prototype.isMoatEnabled(ad))
{this.properties.src+=(this.properties.src.indexOf('?')==-1)?'%3F':'%26';this.properties.src+=$iTXT.tmpl.Flash.prototype.getMoatQueryString(ad);}
this.iframe=$iTXT.core.Builder.make("IFRAME",{id:this.options.id+"Iframe",src:this.properties.src,scrolling:'no',marginheight:0,marginwidth:0,style:"display: block",frameBorder:"0",border:"0"});this.iframeHldr=$iTXT.core.Builder.make("DIV",{id:this.options.id+"IframeHldr",style:"display: inline-block;"},[this.iframe]);this.rootElement.itxtAppendChild(this.iframeHldr);this._applyStyles();this.iframe.itxtBatchSubscribe([["mouseout",$iTXT.core.Event.bind(this,this._onMouseOut)],["mouseover",$iTXT.core.Event.bind(this,this._onMouseOver)]],this.evtDspFuncs);this.iframe.itxtBatchSubscribe([["mousemove",$iTXT.core.Event.bind(this,this._onBodyMouseMove)]],this.evtDspFuncs);},_buildSrc:function()
{},_applyStyles:function()
{if(this.options.styles&&this.iframe)
{this.iframe.itxtSetStyle(this.options.styles);}},_resize:function(w,h,$super)
{this.iframeHldr.itxtSetStyle({width:"",height:""});if(this.properties.width&&this.properties.height)
{this.iframe.itxtSetStyle({width:this.properties.width+"px",height:this.properties.height+"px"});return[this.iframeHldr.offsetWidth,this.iframeHldr.offsetHeight];}
if(this.fillWidth)
{this.iframe.itxtSetStyle({width:w+"px"});var wD=this.iframeHldr.offsetWidth-w;if(wD>0)
{this.iframe.itxtSetStyle({width:(w-wD)+"px"});}}
if(this.fillHeight)
{this.iframe.itxtSetStyle({height:h+"px"});var hD=this.iframeHldr.offsetHeight-h;if(hD>0)
{this.iframe.itxtSetStyle({height:(h-hD)+"px"});}}
return $super(w,h);},_neededSize:function(w,h,$super)
{this.iframeHldr.itxtSetStyle({width:"",height:""});if(this.properties.width&&this.properties.height)
{this.iframe.itxtSetStyle({width:this.properties.width+"px",height:this.properties.height+"px"});return[this.iframeHldr.offsetWidth,this.iframeHldr.offsetHeight];}
return $super(w,h);},_onMouseOut:function(e)
{e.stop();},_onMouseOver:function()
{this.mouseOver=true;},_onBodyMouseMove:function(e)
{if(this.mouseOver)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:iframe:out");this.mouseOver=false;}}});};$iTXT.js.loader["$iTXT.tmpl.Image"]=true;$iTXT.tmpl.Image_Load=function(){var undefined;$iTXT.tmpl.Image=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{imageLoaded:false,imageFailed:false,styleWidth:0,styleHeight:0,init:function(_options,ad,$super)
{var initSrc=_options.props.src;var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtImage")},_options);$super(defOpts,ad);if(initSrc==this.properties.src||""==this.properties.src)
{this.imageFailed=true;this.imageLoaded=true;}
else
{var imgMode="IMG";if(this.properties.apng)
{imgMode="APNG";}
this.image=$iTXT.core.Builder.make(imgMode,{id:this.options.id+"Image",title:this.properties.title||"",style:"display: inline-block;"});this.image.itxtBatchSubscribe([["load",$iTXT.core.Event.bind(this,this._imageLoad)],["error",$iTXT.core.Event.bind(this,this._imageError)]],this.evtDspFuncs);this.image.src=this.properties.src;var cssStyle=this.properties.style||"";this.imageStyle=$iTXT.core.Builder.make("DIV",{id:this.options.id+"ImageStyle",style:cssStyle},[this.image]);this.rootElement.itxtAppendChild(this.imageStyle);this._applyStyles();}},_applyStyles:function()
{if(this.options.styles&&this.imageStyle)
{this.imageStyle.itxtSetStyle(this.options.styles);if($iTXT.core.Browser.quirksMode)
{var pL=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"paddingLeft"));var pR=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"paddingRight"));var bL=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"borderLeftWidth"));var bR=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"borderRightWidth"));this.styleWidth=pL+pR+bL+bR;var pT=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"paddingTop"));var pB=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"paddingBottom"));var bT=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"borderTopWidth"));var bB=$iTXT.core.Util.parsePixels($iTXT.core.Util.getStyle(this.imageStyle,"borderBottomWidth"));this.styleHeight+=pL+pR+bL+bR;}}},needsResize:function(w,h,$super)
{return $super(w,h);},_imageLoad:function()
{this.imageLoaded=true;this.reCalculateSize=true;$iTXT.core.$(document).itxtFire("$iTXT:tt:element:loaded",this.advert);},_imageError:function()
{this.imageStyle.itxtSetStyle({width:"0px",height:"0px"});this.imageFailed=true;this.imageLoaded=true;this.reCalculateSize=true;this.properties.width=0;this.properties.height=0;$iTXT.core.$(document).itxtFire("$iTXT:tt:element:loaded",this.advert);if(this.events.error&&VM._.isFunction(this.events.error))
{this.events.error.apply(this);}},_resize:function(w,h,$super)
{try
{if(this.imageFailed)
{return[0,0];}
if(this.imageLoaded)
{this.getImageSize();this._setImageRatio();}
this.setImageSize("","");if(this.properties.width&&this.properties.height)
{this.setImageSize(this.properties.width,this.properties.height);return $super(this.imageStyle.offsetWidth,this.imageStyle.offsetHeight);}
else
{this.setImageSize(this.imageW,this.imageH);}
if(this.fillWidth)
{this.setImageSize(w);var wD=this.imageStyle.offsetWidth-w;if(wD>0)
{this.setImageSize((w-wD));}}
if(this.fillHeight)
{this.setImageSize(undefined,h);var hD=this.imageStyle.offsetHeight-h;if(hD>0)
{;this.setImageSize(undefined,(h-hD));}}
var newW=w;var newH=h;if(!this.fillWidth)
{newW=this.imageStyle.offsetWidth;}
if(!this.fillHeight)
{newH=this.imageStyle.offsetHeight;}
return $super(newW,newH);}
catch(e)
{return[0,0];}},_neededSize:function(w,h,$super)
{try
{if(this.imageFailed)
{return[0,0];}
if(!this.imageLoaded&&undefined==this.properties.loadingwidth&&undefined==this.properties.loadingheight&&undefined==this.properties.width&&undefined==this.properties.height)
{return[0,0];}
if(this.imageLoaded)
{this.getImageSize();this._setImageRatio();}
this.shrinkRoot();var newW=w;var newH=h;this.setImageSize("","");if(this.properties.width)
{this.setImageSize(this.properties.width);}
else
{this.setImageSize(this.imageW);}
if(this.properties.height)
{this.setImageSize(undefined,this.properties.height);}
else
{this.setImageSize(undefined,this.imageH);}
if(!this.imageLoaded&&this.properties.loadingwidth&&this.properties.loadingheight)
{this.setImageSize(this.properties.loadingwidth,this.properties.loadingheight);}
if(!this.fillWidth)
{newW=this.imageStyle.offsetWidth;}
if(!this.fillHeight)
{newH=this.imageStyle.offsetHeight;}
if(this.events.neededSize)
{var dims=this.events.neededSize.apply(this,[newW,newH]);newW=dims[0];newH=dims[1];}
this.expandRoot();return $super(newW,newH);}
catch(e)
{return[0,0];}},_onMouseOver:function(e)
{if(this.options.hoverstyles&&e.target==this.image)
{this.image.itxtSetStyle(this.options.hoverstyles);}
if(this.events.onMouseOver)
{this.events.onMouseOver.apply(this,[e]);}},_onMouseOut:function(e)
{if(this.options.hoverstyles&&e.target==this.image)
{this.image.itxtSetStyle(this.options.styles,this.options.hoverstyles);}
if(this.events.onMouseOut)
{this.events.onMouseOut.apply(this,[e]);}},_onMouseClick:function(e)
{if(e.target==this.image)
{if(this.events.onMouseClick)
{this.events.onMouseClick.apply(this,[e]);e.stop();}}},isLoaded:function()
{if(!this.imageLoaded)
{}
return this.imageLoaded;},_sdr:function(s,ms)
{if(s&&ms&&s>ms)
{return ms/s;}
return 1;},ratioChanged:false,_setImageRatio:function()
{if(!this.ratioChanged)
{this.ratioChanged=true;var sizeChangeRatio=1;var wr=this._sdr(this.image.width,this.properties.maxWidth);var hr=this._sdr(this.image.height,this.properties.maxHeight);sizeChangeRatio=Math.min(wr,hr);if(sizeChangeRatio<1)
{this.imageW=this.image.width=sizeChangeRatio*this.imageW;this.imageH=this.image.height=sizeChangeRatio*this.imageH;}}},gotImageSize:false,getImageSize:function()
{if(!this.gotImageSize)
{if(0!=this.image.width&&0!=this.image.height)
{this.gotImageSize=true;this.imageW=this.image.width;this.imageH=this.image.height;}}},setImageSize:function(w,h)
{var sw=parseInt(w)+parseInt(this.styleWidth);var sh=parseInt(h)+parseInt(this.styleHeight);if(""==w)
{this.image.itxtSetStyle({width:""});this.imageStyle.itxtSetStyle({width:""});}
else
{this.image.itxtSetStyle({width:w+"px"});this.imageStyle.itxtSetStyle({width:sw+"px"});}
if(""==h)
{this.image.itxtSetStyle({height:""});this.imageStyle.itxtSetStyle({height:""});}
else
{this.image.itxtSetStyle({height:h+"px"});this.imageStyle.itxtSetStyle({height:sh+"px"});}}});};$iTXT.js.loader["$iTXT.tmpl.Input"]=true;$iTXT.tmpl.Input_Load=function(){var undefined;$iTXT.tmpl.Input=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtInput")},_options);$super(defOpts,ad);this.input=$iTXT.core.Builder.make("INPUT",{id:this.options.id+"Input",type:this.properties.type||"text",value:this.properties.value||""});this.inputDiv=$iTXT.core.Builder.make("DIV",{id:this.options.id+"InputDiv"},[this.input]);this.rootElement.itxtAppendChild(this.inputDiv);this._applyStyles();if(this.events.onclick)
{this.input.onclick=this.events.onclick;}
if("text"==this.properties.type)
{this.input.itxtSubscribe("keyup",$iTXT.core.Event.bind(this,this.keyUp));}},_applyStyles:function()
{if(this.options.styles&&this.input)
{this.input.itxtSetStyle(this.options.styles);}},_resize:function(w,h,$super)
{this.input.itxtSetStyle({width:"",height:""});this.inputDiv.itxtSetStyle({width:"",height:"",display:""});if(this.fillWidth)
{this.input.itxtSetStyle({width:w+"px"});this.inputDiv.itxtSetStyle({width:"",height:"",display:"inline"});var wD=this.inputDiv.offsetWidth-w;if(wD>0)
{this.input.itxtSetStyle({width:(w-wD)+"px"});}
this.inputDiv.itxtSetStyle({display:""});}
if(this.fillHeight)
{this.input.itxtSetStyle({height:h+"px"});this.inputDiv.itxtSetStyle({width:"",height:"",display:"inline"});var hD=this.inputDiv.offsetHeight-h;if(hD>0)
{this.input.itxtSetStyle({height:(h-hD)+"px"});}
this.inputDiv.itxtSetStyle({display:""});}
return $super(w,h);},_neededSize:function(w,h,$super)
{if(this.events.neededSize)
{return this.events.neededSize.apply(this,[w,h]);}
this.inputDiv.itxtSetStyle({width:"",height:""});var newW=w;var newH=h;this.input.itxtSetStyle({width:"",height:""});this.inputDiv.itxtSetStyle({width:"",height:"",display:"inline"});if(!this.fillWidth)
{newW=this.inputDiv.offsetWidth;}
if(!this.fillHeight)
{newH=this.inputDiv.offsetHeight;}
this.inputDiv.itxtSetStyle({display:""});return $super(newW,newH);},_onMouseOver:function(e)
{if(this.options.hoverstyles&&this.input)
{this.input.itxtSetStyle(this.options.hoverstyles);}
if(this.events.onMouseOver)
{this.events.onMouseOver.apply(this,[e]);}},_onMouseOut:function(e)
{if(this.options.hoverstyles&&this.input)
{this.input.itxtSetStyle(this.options.styles,this.options.hoverstyles);}
if(this.events.onMouseOut)
{this.events.onMouseOut.apply(this,[e]);}},keyUp:function(e)
{if(this.events.onEnter&&e.keyCode&&e.keyCode==13)
{this.events.onEnter.apply(this,[e])}}});};$iTXT.js.loader["$iTXT.tmpl.Link"]=true;$iTXT.tmpl.Link_Load=function(){var undefined;$iTXT.tmpl.Link=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtlink")},_options);$super(defOpts,ad);this.link=$iTXT.core.Builder.make("A",{id:this.options.id+"Anchor",className:this.options.className,href:this.properties.src,title:this.properties.title||""},[this.properties.text]);this.rootElement.itxtAppendChild(this.link);this._applyStyles();this.link.itxtBatchSubscribe([["click",$iTXT.core.Event.bind(this,this._onLinkClick)]],this.evtDspFuncs);},_applyStyles:function()
{if(this.options.styles&&this.link)
{this.link.itxtSetStyle(this.options.styles);}},_onMouseOver:function(e)
{if(this.options.hoverstyles&&e.target==this.link)
{this.link.itxtSetStyle(this.options.hoverstyles);}
if(this.events.onMouseOver)
{this.events.onMouseOver.apply(this,[e]);}},_onMouseOut:function(e)
{if(this.options.hoverstyles&&e.target==this.link)
{this.link.itxtSetStyle(this.options.styles,this.options.hoverstyles);}
if(this.events.onMouseOut)
{this.events.onMouseOut.apply(this,[e]);}},_onMouseClick:function()
{},_onLinkClick:function(e)
{if(this.events.onMouseClick)
{e.stop();return this.events.onMouseClick.apply(this,[e]);}}});};$iTXT.js.loader["$iTXT.tmpl.Row"]=true;$iTXT.tmpl.Row_Load=function(){var undefined;$iTXT.tmpl.Row=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{cells:null,init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtrow"),className:"itxtrow"},_options);$super(defOpts,ad);this.cells=[];if(this.options.structure)
{this._build(this.options.structure,ad);}},dispose:function($super)
{if(null!=this.cells)
{for(var i=0;i<this.cells.length;i++)
{this.cells[i].dispose();}}
$super();},_build:function(s,ad)
{for(var i=0;i<s.length;i++)
{if(s[i].type&&'cell'==s[i].type)
{var c=new $iTXT.tmpl.Cell(s[i],ad);c.parentNode=this.rootElement;this.cells.push(c);this.rootElement.appendChild(c.rootElement);}}},_resize:function(w,h)
{if(null!=this.cells)
{var tw=0;var ecs=0;for(var i=0;i<this.cells.length;i++)
{var c=this.cells[i];if(c.fillWidth)
{ecs++;}
else if(c.contentWidth)
{var dims=c.neededSize(w,h);c.width=dims[0];tw+=dims[0];}
else
{tw+=c.width;}}
var rw=w-tw;var ecw=(0==ecs)?0:Math.floor(Math.max(rw/ecs,0));if(this.cells.length>0)
{w=0;for(var i=0;i<this.cells.length;i++)
{var c=this.cells[i];var cw=(c.fillWidth)?ecw:c.width;var celldim=c.resize(cw,h);c.position(w,0);h=(celldim[1]>h)?celldim[1]:h;w+=(celldim[0]>cw)?celldim[0]:cw;}}}
return[w,h];},_neededSize:function(w,h)
{if(this.contentHeight)
{var tw=0;var ecs=0;for(var i=0;i<this.cells.length;i++)
{var c=this.cells[i];if(c.fillWidth)
{ecs++;}
else if(c.contentWidth)
{var dims=c.neededSize(w,h);c.width=dims[0];tw+=dims[0];}
else if(!c.contentWidth)
{tw+=c.width;}}
var rw=w-tw;var ecw=(0==ecs)?0:Math.floor(Math.max(rw/ecs,0));h=0;for(var i=0;i<this.cells.length;i++)
{var c=this.cells[i];var cwa=(c.fillWidth)?ecw:w;var cdims=c.neededSize(cwa,h);h=(cdims[1]>h)?cdims[1]:h;}}
return[w,h];},needsResize:function(w,h,$super)
{if((null!=this.cells)&&(0<this.cells.length))
{for(var i=0;i<this.cells.length;i++)
{if(this.cells[i].needsResize(w,h))
{return true;}}}
return $super(w,h);},isLoaded:function()
{if(this.cells.length>0)
{for(var i=0;i<this.cells.length;i++)
{if(!this.cells[i].isLoaded())
{return false;}}}
return true;}});};$iTXT.js.loader["$iTXT.tmpl.TemplateBase"]=true;$iTXT.tmpl.TemplateBase_Load=function(){var undefined;$iTXT.tmpl.TemplateBase=$iTXT.core.Class.create({defaultWidth:300,defaultHeight:150,expandedWidth:300,expandedHeight:200,structure:null,rows:null,root:null,baseParamDefaults:{},components:null,fullyBuilt:false,isCurrentTemplate:false,usePaddingAndBorder:true,adViewTracked:false,init:function(_options)
{this.beforeInit();this.templateID=$iTXT.tmpl.ElementIdentifier.get("Template");this.rootElement=$iTXT.core.Builder.make("DIV",{style:"visibility: hidden;",id:this.templateID});this.baseParamDefaults={'tt.t.col':'#000099','tt.t.h.col':'#000099','tt.bdy.col':'#000','tt.bdy.h.col':'#000','tt.url.col':'#008000','tt.url.h.col':'#008000','tt.wturl':{w:$iTXT.cnst.WEIGHTING_DEFAULT_DEFAULT,v:'http://www.vibrantmedia.com/whatisIntelliTXT.asp?ipid=${ipid}&cc=${cc}&server=${itxtserver}'},'LOG':'ipid=${ipid}&cc=${cc}&server=${itxtserver}'};this.components=[];if(null==this.structure)
{this.structure=[{type:'row',structure:[{type:'cell',structure:[]}]}];}
this.options=$iTXT.core.Util.extend({dontColorTailTop:true},_options);if(this.options.advert)
{this.advert=this.options.advert;delete this.options.advert;if(this.paramDefaults&&$iTXT.core.Util.isObject(this.paramDefaults))
{var prms=$iTXT.core.Util.extend(this.baseParamDefaults,this.paramDefaults);this.advert.addTemplateParams(prms,$iTXT.cnst.WEIGHTING_DEFAULT_TEMPLATE);}
else
{this.advert.addTemplateParams(this.baseParamDefaults);}
this.options=this.advert.tokenize(this.options);}
this.events=this.options.events||{};this.afterTokenize();try
{if(this.options.width)
{var w=parseInt(this.options.width);if(!isNaN(w))
{this.defaultWidth=w;}}
if(this.options.height)
{var h=parseInt(this.options.height);if(!isNaN(h))
{this.defaultHeight=h;}}
if(this.options.expwidth)
{var ew=parseInt(this.options.expwidth);if(!isNaN(ew))
{this.expandedWidth=ew;}}
if(this.options.expheight)
{var eh=parseInt(this.options.expheight);if(!isNaN(eh))
{this.expandedHeight=eh;}}}
catch(e)
{}
var subsArr=[];$iTXT.core.$(document).itxtSubscribe("$iTXT:tt:element:loaded",$iTXT.core.Event.bind(this,this._elementLoaded),subsArr);this.elementLoadUnsubscribe=subsArr.pop();},addComponent:function(c)
{this.components.push(c);},getComponentByUID:function(UID)
{for(var i=0;i<this.components.length;i++)
{var c=this.components[i];if(c.options.UID==UID)
{return c;}}
return null;},removeElement:function(sUID)
{if(null!=this.structure&&VM._.isArray(this.structure))
{this._removeElmt(this.structure,sUID);}},_removeElmt:function(items,sUID)
{try
{if(sUID&&items&&items.length)
{for(var i=0;i<items.length;i++)
{var item=items[i];if(item&&sUID==item.UID)
{items.splice(i,1);return true;}
if(item.structure&&VM._.isArray(item.structure))
{if(this._removeElmt(item.structure,sUID))
{return true;}}}}}
catch(e)
{var i=items;}
return false;},_applyStyles:function()
{if(this.options.styles)
{this.rootElement.itxtSetStyle(this.options.styles);}},beforeInit:function()
{},afterTokenize:function()
{},beforeBuild:function()
{},onBuild:function()
{},afterBaseBuild:function()
{},afterBuild:function()
{},beforeOpen:function()
{},afterOpen:function()
{},afterExpand:function()
{},beforeClose:function()
{},afterClose:function()
{},onShow:function()
{this.dropViewabilityTrackers();},afterShow:function()
{if(!this.hasProgressBar()&&!this.advert.isCPE()){this.dropMoatAdTag();}},onHide:function()
{},onBuildHookStyle:function(hk)
{},onLogEvent:function(type,opts,advert)
{return true;},hookViewLogDetails:function(ad)
{var rObj={did:ad.$A.did,adid:ad.$A.adid,syid:ad.$A.syid,pid:ad.$A.pid,uf:ad.$A.uf,ur:ad.$A.ur};return rObj;},onTrackingDrop:function(beacons,advert)
{return true;},onCloseClick:function()
{return true;},onWhatsThisClick:function()
{return true;},onVibrantLogoClick:function()
{return true;},beforeLiveLookup:function(e)
{return true;},afterLiveLookup:function(e)
{},onMouseClick:function()
{var opts={advert:this.advert,clickSource:this.advert.clickSource};$iTXT.core.$(document).itxtFire("$iTXT:tt:click",opts);},dispose:function()
{this.fullyBuilt=false;if(this.elementLoadUnsubscribe)
{this.elementLoadUnsubscribe();}
if(null!=this.rows)
{for(var i=0;i<this.rows.length;i++)
{this.rows[i].dispose();}}
if(null!=this.rootElement)
{this.rootElement.itxtClear();}
if(null!=this.rootElement&&this.rootElement.parentNode)
{this.rootElement.parentNode.removeChild(this.rootElement);}},remove:function()
{this.isCurrentTemplate=false;if(null!=this.rootElement&&this.rootElement.parentNode)
{this.rootElement.parentNode.removeChild(this.rootElement);}},resize:function(w,h,force)
{this.width=w;this.height=h;if(this.fullyBuilt)
{if(null!=this.rows)
{var th=0;var ers=0;for(var i=0;i<this.rows.length;i++)
{var r=this.rows[i];if(r.fillHeight)
{ers++;}
else if(r.contentHeight)
{var dims=r.neededSize(w,h);r.height=dims[1];th+=dims[1];}
else
{th+=r.height;}}
var rh=this.height-th;var erh=(0==ers)?0:Math.floor(Math.max(rh/ers,0));if(this.rows.length>0)
{this.height=0;for(var i=0;i<this.rows.length;i++)
{var r=this.rows[i];var rh=(r.fillHeight)?erh:r.height;var rowdim=r.resize(this.width,rh);this.width=(rowdim[0]>this.width)?rowdim[0]:this.width;this.height+=(rowdim[1]>rh)?rowdim[1]:rh;}}}
this.rootElement.itxtSetStyle({width:this.width+"px",height:this.height+"px"});}
return[this.width,this.height];},_build:function(ad)
{if(!this.templateBuilt)
{this.templateBuilt=true;var b=$iTXT.core.Builder;this.rows=[];if(null!=this.structure&&VM._.isArray(this.structure))
{for(var i=0;i<this.structure.length;i++)
{var item=this.structure[i];if(item.type&&'row'==item.type)
{var r=new $iTXT.tmpl.Row(item,ad);this.rows.push(r);this.rootElement.appendChild(r.rootElement);}}}
this.rootElement.itxtSubscribe("mouseover",$iTXT.core.Event.bind(this,this._onMouseOver));this.rootElement.itxtSubscribe("mouseout",$iTXT.core.Event.bind(this,this._onMouseOut));this.rootElement.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._onMouseClick));this._applyStyles();this.onBuild();}
return this.rootElement;},_onMouseOver:function(e)
{if(this.options.hoverstyles&&this.rootElement)
{this.rootElement.itxtSetStyle(this.options.hoverstyles);}
if(this.events.onMouseOver)
{this.events.onMouseOver.apply(this,[e]);}},_onMouseOut:function(e)
{if(this.options.hoverstyles&&this.rootElement)
{this.rootElement.itxtSetStyle(this.options.styles,this.options.hoverstyles);}
if(this.events.onMouseOut)
{this.events.onMouseOut.apply(this,[e]);}},_onMouseClick:function(e)
{if(this.events.onMouseClick)
{this.events.onMouseClick.apply(this,[e]);}},checkLoaded:function()
{if(this.fullyBuilt)
{if(this.rows.length>0)
{for(var i=0;i<this.rows.length;i++)
{if(!this.rows[i].isLoaded())
{return false;}}}
return true;}
else
{}
return false;},getAdvertHandler:function()
{if(undefined==this._advertHandlerInstance)
{if(this.options.advertHandlerKlass)
{var ahKlass=eval(this.options.advertHandlerKlass);this._advertHandlerInstance=new ahKlass(this.advert);}
else
{this._advertHandlerInstance=new $iTXT.data.AdvertHandler(this.advert);}}
return this._advertHandlerInstance;},buildTemplate:function(loadCb)
{this.isCurrentTemplate=true;this.loadCallback=loadCb;this.beforeBuild();this._build(this.advert);this.fullyBuilt=true;this._elementLoaded();},_elementLoaded:function()
{if(!this.isCurrentTemplate)
{return;}
if(this.checkLoaded())
{if(this.loadCallback)
{this.loadCallback();}
this.afterBuild();}},getViewabilityTrackers:function(){var names,trackers;names=['js.viewability','js.viewability1','js.viewability2','js.viewability3','js.viewability4','js.viewability5'];trackers=VM._(names).map(function(n){return this.get(n,null);},this.advert.params);trackers=VM._(trackers).filter(function(t){return t?true:false;});trackers=VM._(trackers).map(function(t){return decodeURIComponent(t);});trackers=VM._(trackers).map(function(t){return this.parse(t);},this.advert.params);return trackers.length?trackers:null;},dropViewabilityTrackers:function(drop_zone){var trackers=this.getViewabilityTrackers();if(!trackers||this.adViewTracked){return false;}
if($iTXT.ui.tt.isDoubleTap()){drop_zone='dtwrapper';}
if(VM._.isUndefined(drop_zone)){drop_zone='itxtcontent';}
drop_zone=document.getElementById(drop_zone);if(!drop_zone){return false;}
VM._(trackers).each(function(t){var el=document.createElement('script');el.type='text/javascript';el.src=t;el.className='itxt_viewability_tracker';drop_zone.appendChild(el);});this.adViewTracked=true;return true;},getTemplateId:function(){return this.templateID;},dropMoatAdTag:function(){var cfg=this.advert.getMoatConfig();var tag=cfg.ad_tag;var elt=document.getElementById(this.getTemplateId());var scr;if(!cfg.enabled||!elt){return;}
if(cfg.ad_tag.indexOf('${js.moat')>-1){tag=tag.replace('${js.moat.partnercode}',encodeURIComponent(cfg.partner_code));tag=tag.replace('${js.moat.advertiser}',encodeURIComponent(cfg.advertiser));tag=tag.replace('${js.moat.campaign}',encodeURIComponent(cfg.campaign));tag=tag.replace('${js.moat.lineitem}',encodeURIComponent(cfg.line_item));tag=tag.replace('${js.moat.creative}',encodeURIComponent(cfg.creative));tag=tag.replace('${js.moat.site}',encodeURIComponent(cfg.site));tag=tag.replace('${js.moat.placement}',encodeURIComponent(cfg.placement));}
scr=document.createElement('script');scr.src=tag;elt.appendChild(scr);},hasProgressBar:function(){var isMobile=$iTXT.core.Browser.isSmartphoneOrTablet();return isMobile?this.advert.params.getBool('lbox.bar.mobile',false):this.advert.params.getBool('lbox.bar',false);},unifiedLoggingEnabled:function(){return this.advert.params.getBool('js.unilog',false);},getUnifiedLoggingUrl:function(){var url=this.advert.params.get('js.unilog.url','//p.vibrant.co/a/[VERSION]?'+'pvu=[PVU]&ipid=[IPID]&n=[NETWORK]&t=[TRIGGER]&set=[SET]&ts=[TIMESTAMP]&eid=[EVENTID]&ed=[EVENTDETAILS]');return decodeURIComponent(url);},getUnifiedLoggingDefaults:function(){var ad=this.advert;var params=ad.params;return{VERSION:'2',PVU:params.get('pvu'),IPID:params.get('ipid'),NETWORK:'1',TRIGGER:ad.getKeywordId(),SET:params.get("IONO"),TIMESTAMP:function(){return(new Date()).getTime();}};},initLogger:function(){if(this._lgr){return;}
this._lgr=new VBR.Logger(this.getUnifiedLoggingUrl(),{defaults:this.getUnifiedLoggingDefaults()});},getLogger:function(){this.initLogger();return this._lgr;},logClickThrough:function(data,redir,new_window){var logger=this.getLogger();var call_config={redir:redir,new_win:new_window};var computed_data={};function map_data_paradigm(data){if(!data.location&&data.buttonName){data.location=VCC.CreativeLogger.mapLocation(data.buttonName);}
if(data.redir_url){data.url=data.redir_url;}
return data;}
logger.log({EVENTID:VBR.Logger.CLICKTHROUGH,EVENTDETAILS:map_data_paradigm(data)},call_config);}});window.mvuExpand=function(w,h,rt,kac)
{$iTXT.core.$(document).itxtFire("$iTXT:function:mvuExpand",{w:w,h:h,rt:rt,kac:kac});};window.fExp=function()
{$iTXT.core.$(document).itxtFire("$iTXT:function:fExp");};window.fClick=function()
{$iTXT.core.$(document).itxtFire("$iTXT:function:fClick");};window.$iTXT.func={setClickThrough:function(url,did){if(!url.match(/^http/)){return;}
$iTXT.core.$(document).itxtFire("$iTXT:function:setClickThrough",{url:url,did:did});}};};$iTXT.js.loader["$iTXT.tmpl.Text"]=true;$iTXT.tmpl.Text_Load=function(){var undefined;$iTXT.tmpl.Text=$iTXT.core.Class.create($iTXT.tmpl.ElementBase,{init:function(_options,ad,$super)
{var defOpts=$iTXT.core.Util.extend({id:$iTXT.tmpl.ElementIdentifier.get("itxtText")},_options);$super(defOpts,ad);var cssStyle=this.properties.style||"";this.textDiv=$iTXT.core.Builder.make("DIV",{id:this.options.id+"TextDiv",title:this.properties.title||"",style:cssStyle},[this.properties.text]);this.rootElement.itxtAppendChild(this.textDiv);this._applyStyles();},_applyStyles:function()
{if(this.options.styles&&this.textDiv)
{this.textDiv.itxtSetStyle(this.options.styles);}},_resize:function(w,h,$super)
{if(!this.fillHeight||!this.fillWidth)
{this.width=w;this.height=h;this.textDiv.itxtSetStyle({width:"",height:""});return[w,h];}
else
{this.textDiv.itxtSetStyle({width:w+"px",height:h+"px"});}
return $super(w,h);},_neededSize:function(w,h,$super)
{if(this.events.neededSize)
{return this.events.neededSize.apply(this,[w,h]);}
var newW=w;var newH=h;if(!this.fillHeight&&!this.fillWidth)
{this.rootElement.itxtSetStyle({width:"",height:""});this.textDiv.itxtSetStyle({width:"",height:"",display:"inline"});newH=this.textDiv.offsetHeight;newW=this.textDiv.offsetWidth;this.textDiv.itxtSetStyle({display:""});}
else if(!this.fillHeight)
{this.rootElement.itxtSetStyle({width:w+"px",height:""});newH=this.textDiv.offsetHeight;this.rootElement.itxtSetStyle({width:"",height:""});}
else if(!this.fillWidth)
{this.textDiv.itxtSetStyle({width:"",height:"",display:"inline"});newW=this.textDiv.offsetWidth;this.textDiv.itxtSetStyle({display:""});}
return $super(newW,newH);},_onMouseOver:function(e)
{if(this.options.hoverstyles&&this.textDiv)
{this.textDiv.itxtSetStyle(this.options.hoverstyles);}
if(this.events.onMouseOver)
{this.events.onMouseOver.apply(this,[e]);}},_onMouseOut:function(e)
{if(this.options.hoverstyles&&this.textDiv)
{this.textDiv.itxtSetStyle(this.options.styles,this.options.hoverstyles);}
if(this.events.onMouseOut)
{this.events.onMouseOut.apply(this,[e]);}},_onTooltipOver:function(e)
{if(this.options.ttoverstyles&&this.textDiv)
{this.textDiv.itxtSetStyle(this.options.ttoverstyles);}
if(this.events.onMouseOver)
{this.events.onMouseOver.apply(this,[e]);}},_onTooltipOut:function(e)
{if(this.options.ttoverstyles&&this.textDiv)
{this.textDiv.itxtSetStyle(this.options.styles,this.options.ttoverstyles);}
if(this.events.onMouseOut)
{this.events.onMouseOut.apply(this,[e]);}}});};$iTXT.js.loader["$iTXT.ui.Aura2TooltipPlacer"]=true;$iTXT.ui.Aura2TooltipPlacer_Load=function(){$iTXT.ui.TooltipPosition={AR:"AR",AC:"AC",AL:"AL",CL:"CL",CR:"CR",BR:"BR",BC:"BC",BL:"BL"};var undefined;var posArr={};var ttps=$iTXT.ui.TooltipPosition;var debug_labels={'AR':'Above Right','CR':'Centre Right','CL':'Centre Left','AL':'Above Left','AC':'Above Centre','BL':'Below Left','BC':'Below Centre','BR':'Below Right'};$iTXT.ui.Aura2TooltipPlacer={ttOffY:5,TOPOFFSCREENWEIGHT:20,EXPTOPOFFSCREENWEIGHT:20,OFFSCREENWEIGHT:15,EXPOFFSCREENWEIGHT:2,reportWeights:function(ttps){for(var i in posArr){}},decoratedDebugHeader:function(title){},updateWeights:function(weight){var to_be_updated=Array.prototype.slice.call(arguments,1);if(VM._.isArray(to_be_updated)){to_be_updated=to_be_updated[0];}
for(var i=0,len=to_be_updated.length;i<len;i++){if(posArr[to_be_updated[i]]){posArr[to_be_updated[i]].weight+=weight;}}},evalutePosition:function(rule,orient,weight,label){if(rule<0){var t_weight=weight*(rule/orient);var to_be_updated=Array.prototype.slice.call(arguments,4);this.updateWeights(t_weight,to_be_updated);}},place:function(opts)
{posArr={};var aura=false;var ttOffX=50;var normal=true;var ordinal=false;var aura_adj=0;if(opts.tt.currentAdvert.templateClass==="$iTXT.tmpl.js.Aura2"){aura=true;aura_adj=parseInt(opts.tt.currentAdvert.params.get("AURA2.PED.HEIGHT"),10);}
var aura_top=0;var aura_right=0;$iTXT.core.$(document).itxtFire("$iTXT:tt:before:position");if(opts.bb&&opts.tt)
{if(opts.bb.target&&opts.bb.target.tagName==="SPAN"&&opts.bb.target.parentNode.tagName==="A"&&aura){var tOff=$iTXT.core.$(opts.bb.target.parentNode).itxtTotalOffset();if(opts.bb.target.parentNode.offsetHeight<39){opts.bb={left:tOff.left,top:tOff.top,height:opts.bb.target.parentNode.offsetHeight,width:opts.bb.target.parentNode.offsetWidth,target:opts.bb.target};}}
var tt_width=opts.tt.width;var tt_height=opts.tt.height;var bound_box_left=opts.bb.left;var bound_box_top=opts.bb.top;var bound_box_right=opts.bb.left+opts.bb.width;var bound_box_bottom=opts.bb.top+opts.bb.height;var bound_box_width=opts.bb.width;var Pose=function(label,left,top){this.label=label;this.left=left;this.top=top;this.width=tt_width;this.height=tt_height;this.weight=0;};if(aura){normal=false;ordinal=true;aura_top=(aura_adj>40)?40:-40;aura_right=40;ttOffX=20;}
var right_pos=bound_box_right-ttOffX+aura_right;var left_pos=bound_box_left-tt_width+ttOffX;var horiz_centre_pos=bound_box_left+(bound_box_width/2)-tt_width/2;var above_pos=bound_box_top-tt_height+aura_top;var below_pos=bound_box_bottom+this.ttOffY;var vert_centre_pos=bound_box_bottom-this.ttOffY-(tt_height/5)*3;if(normal){posArr[ttps.AR]=new Pose(ttps.AR,right_pos,above_pos);posArr[ttps.AL]=new Pose(ttps.AL,left_pos,above_pos);posArr[ttps.BR]=new Pose(ttps.BR,right_pos,below_pos);posArr[ttps.BL]=new Pose(ttps.BL,left_pos,below_pos);}
if(ordinal){posArr[ttps.AC]=new Pose(ttps.AC,horiz_centre_pos,above_pos);posArr[ttps.CL]=new Pose(ttps.CL,left_pos,vert_centre_pos);posArr[ttps.CR]=new Pose(ttps.CR,right_pos,vert_centre_pos);posArr[ttps.BC]=new Pose(ttps.BC,horiz_centre_pos,below_pos);}
for(var i in posArr){}
var sSize=$iTXT.core.Util.getWindowSize();var dScroll=$iTXT.core.Util.getPageScroll();var sb={left:dScroll[0],top:dScroll[1],width:sSize[0],height:sSize[1]};this.decoratedDebugHeader("SCREEN OVERLAP TEST a)");for(var i in posArr){posArr[i].weight-=100*(1-$iTXT.core.Math.intersectsPercentage(posArr[ttps[i]],sb));}
this.reportWeights(ttps);this.decoratedDebugHeader("SCREEN OVERLAP TEST b)");this.evalutePosition(above_pos-sb.top,tt_height,this.TOPOFFSCREENWEIGHT,"Above",ttps.BR,ttps.CR);this.evalutePosition(above_pos-tt_height-sb.top,tt_height,this.EXPTOPOFFSCREENWEIGHT,"Above expanded",ttps.AR,ttps.AL,ttps.AC);this.evalutePosition(sb.left+sb.width-left_pos+tt_width,tt_width,this.OFFSCREENWEIGHT,"Right",ttps.AR,ttps.CR,ttps.BR);this.evalutePosition(sb.left+sb.width-left_pos+tt_width,tt_width,this.EXPOFFSCREENWEIGHT,"Right expanded",ttps.CR,ttps.BR);this.evalutePosition(left_pos-sb.left,tt_width,this.OFFSCREENWEIGHT,"Left",ttps.AL,ttps.CL,ttps.BL);this.evalutePosition(left_pos-sb.left-tt_width,tt_width,this.EXPOFFSCREENWEIGHT,"Left expanded",ttps.AL,ttps.CL,ttps.BL);this.evalutePosition(sb.top+sb.height-below_pos+tt_height*2,tt_height,this.OFFSCREENWEIGHT,"Below",ttps.BL,ttps.BR,ttps.BC);this.evalutePosition(sb.top+sb.height-above_pos,tt_height,this.EXPOFFSCREENWEIGHT,"Below expanded",ttps.BL,ttps.BR,ttps.BC);this.reportWeights(ttps,posArr);this.decoratedDebugHeader("SCREEN OVERLAP TEST c)");var scpos=$iTXT.core.Util.getPageScroll();var arTop=above_pos-sb.top+scpos[1];if(arTop<0)
{this.updateWeights(-500,ttps.AR,ttps.AL,ttps.AC);}
this.reportWeights(ttps,posArr);this.decoratedDebugHeader("Avoidance Nodes Test");var avList=[{w:10,n:"IFRAME"},{w:10,n:"OBJECT"},{w:10,n:"EMBED"}];for(var i=0;i<avList.length;i++)
{var avN=avList[i];var nLst=document.getElementsByTagName(avN.n);var nLstLen=nLst.length;for(var i2=0;i2<nLstLen;i2++)
{var nd=nLst[i2];var nbb=$iTXT.core.$(nd).itxtBounds();for(var i in posArr){posArr[i].weight-=avN.w*($iTXT.core.Math.intersectsPercentage(posArr[ttps[i]],nbb));}}}
this.reportWeights(ttps,posArr);var posState=posArr[ttps.AL]||posArr[ttps.AC];for(var i in posArr){if(posArr[i].weight>posState.weight){posState=posArr[i];}}
if($iTXT.glob.params)
{var dbgTTPS=$iTXT.glob.params.get("tt.pos.state");if(null!==dbgTTPS)
{posState=dbgTTPS;}}
var returnOptions={left:posState.left,top:posState.top,state:posState.label};$iTXT.glob.params.set("tt.placer.value",posState.label,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);return returnOptions;}}};};$iTXT.js.loader["$iTXT.ui.AutoPeek"]=true;$iTXT.ui=$iTXT.ui||{};$iTXT.ui.currentAutoPeek=null;$iTXT.ui.AutoPeek_Load=function(){var tmplate=VM._.template("<a style='width: 100% !important; display: inline-block !important; "+"<% if (icon_height > 20) { %>"+"line-height: <%=icon_height%>px;"+"<% } %>"+"vertical-align: top; "+"text-decoration: underline; "+"text-align: center; "+"color:<%=color%> !important; "+"font-size: <%=font_size%>;'>"+"<% if (icon) { %>"+"<img src='<%=icon%>' width='<%=icon_width%>' height='<%=icon_height%>' "+"style='display: inline-block; "+"height: <%=icon_height%>px; "+"width: <%=icon_width%>px; "+"margin-right: 2px'>"+"<% } %>"+"<%= kw %></a>");var css_tmpl=VM._.template("@-webkit-keyframes <%=animid %> {     \n"+"0% {                                  \n"+"   <%=anim_hidden_state%>;            \n"+" }                                    \n"+"<%=animin%>% {                        \n"+"   <%=anim_display_state%>         ;  \n"+"}                                     \n"+"<%=animout%>% {                       \n"+"   <%=anim_display_state%>;           \n"+"}                                     \n"+"                                      \n"+" 100% {                               \n"+"   <%=anim_hidden_state%>;            \n"+" }                                    \n"+"}");$iTXT.ui.AutoPeek={};(function(exports){var rendered={};var pos;var expand_css=function(metrics){var ret="";VM._.each(metrics,function(val,key){ret+=key+":"+val+";";});return ret;};var opticals=function(){var sizes={left:5,top:3,scale:1};if(navigator.userAgent.indexOf("iPhone")>-1){sizes.scale=1.5;sizes.left=4;}
if(navigator.userAgent.indexOf("iPad")>-1){sizes.scale=1.1;sizes.top=10;}
if(navigator.userAgent.indexOf("Android")>-1){sizes.top=11;}
return sizes;};var get_params=function(hk,font_size){var z=opticals().scale;return{font_size:(font_size*z)+"px",kw:decodeURIComponent(hk.ad.params.parse(hk.ad.params.get("hk.mobt.text"),"")||hk.keyword),icon:decodeURIComponent(hk.ad.params.get("hk.mobt.icon","")),icon_width:parseInt(hk.ad.params.get("hk.mobt.icon.width",20),10),icon_height:parseInt(hk.ad.params.get("hk.mobt.icon.height",20),10),kill_text:hk.ad.params.getBool("hk.mobt.notext",0),color:decodeURIComponent(hk.ad.params.get("hk.mobt.text.color","#003399"))};};var loffset=function(hk,peek){return hk.rootElement.offsetWidth-peek.offsetWidth-opticals().left;};var offscreen_div=function(htm,metrics,hkID,animtype){var d=document.createElement("div");d.id="itxt_autopeek"+hkID;d.className="itxt_autopeek itxt_autopeek_"+animtype;d.style.cssText=expand_css(metrics);d.innerHTML=htm;return d;};var self_erase=function(el,hk){el.addEventListener("webkitAnimationEnd",function(){hk.peek=false;$iTXT.ui.currentAutoPeek=null;el.parentNode.removeChild(el);},false);};var get_position=function(el){var t_pos=el.getBoundingClientRect();return{top:t_pos.top+window.scrollY,left:t_pos.left+window.scrollX,height:t_pos.height,width:t_pos.width};};var inject=function(htm,hk,metrics,dur,animtype){if(!hk.peek){hk.peek=true;$iTXT.ui.currentAutoPeek=this;metrics.left=parseInt(metrics.left-1000,10)+"px";var d=offscreen_div(htm,metrics,hk.id,animtype);document.getElementById("itxtttholder").appendChild(d);if(hk.rootElement.offsetWidth>get_position(d).width){metrics.width=(hk.rootElement.offsetWidth+10)+"px";metrics.left=(parseInt(metrics.left,10)+990)+"px";}else{metrics.width=get_position(d).width+"px";metrics.left=(parseInt(metrics.left,10)+1000+Math.floor(loffset(hk,d)/2))+"px";}
metrics.top=parseInt(metrics.top,10)+(pos.height-get_position(d).height)/2-2+"px";if(parseInt(metrics.left,10)<5){metrics.left="5px";}
if(parseInt(metrics.left,10)+parseInt(metrics.width,10)>window.innerWidth){metrics.left=(window.innerWidth-parseInt(metrics.width,10)-20)+"px";}
d.style.cssText=expand_css(metrics);d.addEventListener("touchend",function(){if(hk.ad.params.getInt("tt.doubletap",0)){$iTXT.core.$(document).itxtFire("$iTXT:hook:over",{hook:hk,bounds:calculate_bounds()});}
$iTXT.ui.tt.currentAdvert=hk.ad;$iTXT.core.$(document).itxtFire("$iTXT:hook:click",{source:$iTXT.data.ClickSource.AUTOPEEK,so:25,hookid:hk.options.id,hook:hk,advert:hk.ad});},true);self_erase(d,hk);return true;}else{return false;}};var render=function(pram,id){var now_hk="hk_"+id;if(!rendered[now_hk]){rendered[now_hk]=tmplate(pram);}
return rendered[now_hk];};var calc_anim=function(hk,dur,delay){var anim_in=parseInt(hk.ad.params.parse(hk.ad.params.get("hk.autopeek.anim_in",500)),10);var anim_out=parseInt(hk.ad.params.parse(hk.ad.params.get("hk.autopeek.anim_out",anim_in)),10);dur=anim_in+anim_out+dur;anim_in=Math.floor(anim_in/dur*100);anim_out=Math.floor(100-anim_out/dur*100);return{dur:dur,animin:anim_in,animout:anim_out,animid:"id_"+dur+"_"+anim_in+"_"+anim_out+"_"+delay};};var render_anim=function(pram,delay,animtype){var el_id="itxt_anim_"+pram.dur+"_"+pram.animin+"_"+pram.animout+"_"+pram.dur+"_"+delay;if(animtype=="opacity"){pram.anim_hidden_state="opacity: 0";pram.anim_display_state="opacity: 1";}else{pram.anim_hidden_state="-webkit-transform: rotateX(90deg)";pram.anim_display_state="-webkit-transform: rotateX(0deg)";}
if(!document.getElementById(el_id)){var styl=document.createElement("style");styl.id=el_id;styl.innerHTML=css_tmpl(pram);document.getElementsByTagName("head")[0].appendChild(styl);}};var get_bounds=function(){var parms=[["hk.autopeek.portrait.horizontal","portrait","left","right"],["hk.autopeek.portrait.vertical","portrait","top","bottom"],["hk.autopeek.landscape.horizontal","landscape","left","right"],["hk.autopeek.landscape.vertical","landscape","top","bottom"]];var t_bounds={portrait:{right:0,left:0,top:0,bottom:0},landscape:{right:0,left:0,top:0,bottom:0}};VM._.each(parms,function(ar){var parm=$iTXT.glob.params.get(ar[0],"0@10");var tmp=parm.split("@");if(tmp.length==1){t_bounds[ar[1]][ar[2]]=t_bounds[ar[1]][ar[3]]=+tmp[0];}else{t_bounds[ar[1]][ar[2]]=+tmp[0];t_bounds[ar[1]][ar[3]]=+tmp[1];}});return t_bounds;};var get_orientation=function(){if(window.orientation%180===0){return"portrait";}else{return"landscape";}};var get_zoom=function(){var cmp=$iTXT.glob.params.get("hk.autopeek.zoom",0);if(cmp===0||!screen.width||!window.innerWidth){return false;}
var c_zoom=screen.width/window.innerWidth;if(get_orientation()=="landscape"){c_zoom=screen.height/window.innerHeight;}
return c_zoom>cmp;};var calculate_bounds=function(){var bounds=get_bounds()[get_orientation()];bounds.left=window.innerWidth*(bounds.left/100);bounds.right=window.innerWidth-(window.innerWidth*(bounds.right/100));bounds.top=window.innerHeight*(bounds.top/100);bounds.bottom=window.innerHeight-(window.innerHeight*(bounds.bottom/100));return bounds;};var display=function(hk){pos=get_position(hk.rootElement);var font_size=parseInt(getComputedStyle(hk.rootElement)['font-size'],10);if(VM._.isNaN(font_size)){font_size=16;}
var dur=parseInt(hk.ad.params.parse(hk.ad.params.get("hk.autopeek.duration",2000)),10);var animtype=hk.ad.params.get("hk.autopeek.type","opacity");var delay=hk.ad.params.get("hk.autopeek.delay",0);var anim_pram=calc_anim(hk,dur,delay);var db_params=get_params(hk,font_size);if(db_params.kill_text){db_params.kw="";}
var h=render(db_params,hk.id);var inject_pram={left:pos.left,top:pos.top+"px",width:Math.floor(pos.width),height:(db_params.icon_height>20?db_params.icon_height:pos.height+10)+"px",delay:delay,dur:dur,"-webkit-animation":anim_pram.animid+" "+dur+"ms "+delay+"ms"};render_anim(anim_pram,delay,animtype);inject(h,hk,inject_pram,dur,animtype);$iTXT.trigger("$iTXT:hk:autopeek",hk);};exports.calculate_bounds=calculate_bounds;exports.display=display;exports.get_zoom_threshold=get_zoom;})($iTXT.ui.AutoPeek);};$iTXT.js.loader["$iTXT.ui.ComponentBase"]=true;$iTXT.ui.ComponentBase_Load=function(){var undefined;$iTXT.ui.ComponentBase=$iTXT.core.Class.create({options:null,rootElement:null,width:undefined,height:undefined,left:undefined,top:undefined,componentParams:{},evtDspFuncs:null,init:function(_options)
{this.evtDspFuncs=[];this.options=$iTXT.core.Util.extend({id:"itxtcomponent",className:""},_options);this.defaultOptions=$iTXT.core.Util.cloneObject(this.options);this.advert=this.options.advert;this.children=[];this.rootElement=$iTXT.core.Builder.make("DIV",{id:this.options.id,className:this.options.className});this.params=new $iTXT.data.Param(undefined,undefined,undefined,this.options.id);this.params.set(this.componentParams,null,$iTXT.cnst.WEIGHTING_DEFAULT_COMPONENT);this._tokenizeOptions();},dispose:function()
{if(this.rootElement.parentNode)
{this.rootElement.parentNode.removeChild(this.rootElement);}
for(var i=0;i<this.evtDspFuncs.length;i++)
{var f=this.evtDspFuncs[i];if('function'==typeof f)
{f.call();}}
this.evtDspFuncs=[];},resize:function()
{this.setSize(this.width,this.height);},setSize:function(w,h)
{this.width=w;this.height=h;this.rootElement.itxtSetStyle({width:this.width+"px",height:this.height+"px"});},setPosition:function(l,t)
{this.left=l;this.top=t;this.rootElement.itxtSetStyle({left:this.left+"px",top:this.top+"px"});},getWidth:function()
{return this.width||this.rootElement.offsetWidth;},getHeight:function()
{return this.height||this.rootElement.offsetHeight;},getLeft:function()
{return this.left||this.rootElement.offsetLeft;},getTop:function()
{return this.top||this.rootElement.offsetTop;},addChild:function(childComp)
{if(childComp&&childComp.rootElement)
{this.children.push(childComp);this.rootElement.appendChild(childComp.rootElement);}},addChildren:function(children)
{if(!children)
return;for(var childComp in children)
{this.addChild(children[childComp]);}},removeChild:function(childComp)
{$iTXT.core.Util.without(this.children,childComp);this.rootElement.removeChild(childComp.rootElement);},show:function()
{var re=$iTXT.core.$(this.rootElement);if(re){re.itxtShow();};},hide:function()
{var re=$iTXT.core.$(this.rootElement);if(re){re.itxtHide();};},getHTML:function()
{if(this.rootElement)
{return $iTXT.core.Builder.make("DIV",{},[this.rootElement]).innerHTML;}
return"";},setBackgroundColor:function(c)
{this.rootElement.itxtSetStyle({backgroundColor:c});},setAdvert:function(a)
{this.advert=a;this._tokenizeOptions();},changeAdvert:function(a)
{this.advert=a;this._tokenizeOptions();},_tokenizeOptions:function()
{if(null!=this.advert&&this.advert.params)
{this.params.setParent(this.advert.params);}
else if($iTXT.glob.params)
{this.params.setParent($iTXT.glob.params);}
this.options=$iTXT.core.Util.cloneObject(this.defaultOptions);this.options=this.params.tokenize(this.options);},tooltipOver:function()
{},tooltipOut:function()
{}});};$iTXT.js.loader["$iTXT.ui.Doubletap"]=true;$iTXT.ui.Doubletap_Load=function(){$iTXT.ui.Doubletap=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{init:function init(options,ad){this.options=options;this.ad=ad;},build:function build(){var template=this.ad.template;this.mask=$iTXT.core.Builder.make("div",{id:"dtmask"});this.mask.itxtSetStyle({background:"#000",position:"fixed",top:"0px",left:"0px",width:"100%",height:"100%",zIndex:this.options.zindex,overflow:"visible",opacity:"0",cursor:"default"});this.mask.itxtSubscribe("click",$iTXT.core.Event.bind(this,this.close));this.wrapper=$iTXT.core.Builder.make("div",{id:"dtwrapper"});this.wrapper.itxtSetStyle({margin:"auto",position:"fixed",top:0,left:0,right:0,bottom:0,opacity:"0",width:template.defaultWidth+"px",height:template.defaultHeight+"px",zIndex:this.options.zindex+500});for(var k in template){if(template[k]instanceof HTMLDivElement&&template[k].nodeType===1){this.wrapper.appendChild(template[k]);}}
var close=$iTXT.core.Builder.make("div",{id:"itxt_mob_prog_close"});close.itxtSetStyle({zIndex:this.options.zindex+1000,cursor:"pointer"})
close.itxtSubscribe("click",$iTXT.core.Event.bind(this,this.close));this.wrapper.appendChild(close);var adchoices=$iTXT.core.Builder.make("div",{id:"dtadchoices"});adchoices.itxtSetStyle({backgroundImage:"url(//images.intellitxt.com/ast/tt/12/chrome2012_sprites_4.png)",backgroundPosition:"-67px -153px",height:"22px",width:"19px",position:"absolute",bottom:"-22px",left:"0",overflow:"hidden",zIndex:this.options.zindex+500});adchoices.itxtSubscribe("click",$iTXT.core.Event.bind(this,function(){window.open("//www.vibrantmedia.com/in-text_advertising/vibrant_ads.asp");}));this.wrapper.appendChild(adchoices);this.onRotate();},open:function open(){document.body.appendChild(this.mask);document.body.appendChild(this.wrapper);this.setScale(this.wrapper,0.8);this.fade(this.mask,0.8);this.fade(this.wrapper,1,function(){this.eventController("open");}.bind(this));},close:function close(e){this.fade(this.mask,0,function(){this.destroy(this.mask);}.bind(this));this.fade(this.wrapper,0,function(){this.eventController("close");this.destroy(this.wrapper);}.bind(this));},destroy:function destroy(elem){elem.parentNode.removeChild(elem);},eventController:function eventController(event){switch(event){case"open":$iTXT.core.$(document).itxtFire("$iTXT:tt:set:fixed:open");$iTXT.core.$(document).itxtFire("$iTXT:doubleTap:open");break;case"close":this.doubleTapState="closed";$iTXT.core.$(document).itxtFire("$iTXT:doubleTap:logDwellTime");$iTXT.core.$(document).itxtFire("$iTXT:doubleTap:close");break;default:break;}},onRotate:function onRotate(){var self=this;function reScale(){if(self.doubleTapState==="closed"){window.removeEventListener("orientationchange",rePosition);return;}
window.setTimeout(function(){self.setScale(self.wrapper,0.8);},250);};window.addEventListener("orientationchange",reScale);},setScale:function setScale(el,finalScale){var self=this;var currScale=0;var rotation=this.orientation();function scale(){if(self.getElScale(el,rotation)!==finalScale){self.setCSS3Style(el,"transform","scale("+currScale+")");if(self.getElScale(el,rotation)<finalScale){currScale+=0.1;scale();}}
return;}
scale();},getElScale:function getElScale(el,rotation){var rect=el.getBoundingClientRect();var win=this.windowObj();var span=rotation=="landscape"?"height":"width";return+(rect[span]/win[span]).toFixed(1);},windowObj:function windowObj(){return{width:window.innerWidth,height:window.innerHeight,scrollY:window.pageYOffset,scrollX:window.pageXOffset}},setCSS3Style:function setCSS3Style(el,prop,value){var propCap=prop[0].toUpperCase()+prop.substr(1);el.style["webkit"+propCap]=value;el.style["ms"+propCap]=value;el.style["Moz"+propCap]=value;el.style["O"+propCap]=value;el.style[prop]=value;},orientation:function orientation(){var win=this.windowObj();return win.width>win.height?"landscape":"portrait";},fade:function fade(element,endOpacity,callback){var self=this;function fader(){self.setCSS3Style(element,"transition","opacity 0.75s");element.style.opacity=endOpacity;element.addEventListener("transitionend",callback);}
window.setTimeout(fader,0);}});}
$iTXT.js.loader["$iTXT.ui.Hook"]=true;$iTXT.ui.Hook_Load=function(){var undefined;var $itxtUtil=$iTXT.core.Util;var cleanString=$itxtUtil.cleanString;function hkTrkVisibility(){var gval=$iTXT.glob.dbParams.getBool('hk.trk.visibility'),cval=$iTXT.glob.params.getBool('hk.trk.visibility');return!(cval==false||(cval==undefined&&gval==false));}
$iTXT.subscribe("$iTXT:hooks:loaded",function(){var i,n,masterTs=$itxtUtil.ts(),$HookMngr=$iTXT.ui.HookManager,viewportHeight=$itxtUtil.getWindowSize().height,pageHeight=$itxtUtil.getPageSize().height;function notify_visible(hk,afterTime){if(!hk.seenAlready){hk.seenAlready=true;hk.seenAfter=afterTime;$iTXT.fire("$iTXT:data:log:monitor",{advert:hk.ad,mt:118,mv:Math.floor(hk.initPos.top)+','+Math.floor(viewportHeight)+','+Math.floor(pageHeight),mv2:afterTime});}}
var duration=parseInt($iTXT.glob.dbParams.get("hk.autopeek.duration",3000));var repeat=$iTXT.glob.params.getBool('hk.autopeek.repeat',false);var limit=$iTXT.glob.params.getInt('hk.autopeek.limit',0);function flipHook(hk,duration){if(hk.ad.isDynamicAdhesion()){hk.ad.params.set('hk.autopeek.on',true,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}else if(!hk.ad.params.getBool('hk.autopeek.on',true)){return;}
setTimeout(function(){if(!$iTXT.ui.currentAutoPeek){if(!hk.flipped||repeat||hk.flips<limit){if(!hk.flips&&limit>0){hk.flips=0;}
hk.flipped=true;hk.flips++;$iTXT.ui.AutoPeek.display(hk);if(hk.isVibrantView()){fire_autoplay(hk);}
var afterTime=$itxtUtil.ts()-masterTs;$iTXT.fire("$iTXT:data:log:monitor",{advert:hk.ad,mt:136,mv:hk.initPos.top+','+viewportHeight+','+pageHeight,mv2:afterTime});}}},250);}
function monitor(hooks,afterTime,callback){var i=0,n=hooks.length;for(;i<n;i++){callback(hooks[i],afterTime);}}
for(i=0,n=$HookMngr.hooks.length;i<n;i++){$HookMngr.hooks[i].initPos=$HookMngr.hooks[i].getPosition();}
if(hkTrkVisibility()){monitor($HookMngr.visibleHooks(),0,notify_visible);var mon=VM._.throttle(function(){monitor($HookMngr.visibleHooks(),$itxtUtil.ts()-masterTs,notify_visible);},250);$iTXT.core.$(window).itxtSubscribe('scroll',mon);}
function force_clickmode(){VM._.each($iTXT.ui.HookManager.hooks,function(hook){hook.ad.params.set("cts",0,99999);if(hook.ad.params.getBool('hk.autopeek.on',true)&&!hook.ad.params.getInt("tt.doubletap",0)){hook.ad.params.set("hk.click.mode",0,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}else{if(hook.ad.params.get('hk.click.mode')==0||!hook.ad.params.get('hk.click.mode')){hook.ad.params.set("hk.click.mode",1,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}}});}
function geoblock(){var geoblocked=$iTXT.glob.params.get("js.autoplay.geoblock");var blockedGeos;var endUserCountry=$iTXT.glob.params.get("cc");if(geoblocked){blockedGeos=geoblocked.split(",");if(blockedGeos.indexOf(endUserCountry)!==-1){return true;}}
return false;}
function autopeek_init(){var zoom=$iTXT.glob.params.get("hk.autopeek.zoom",0);var throttle=+($iTXT.glob.params.get("hk.autopeek.throttle",500));var bounds=$iTXT.ui.AutoPeek.calculate_bounds();var flip=VM._.throttle(function(){if($iTXT.core.Browser.is("Android",2.3,2)){monitor($HookMngr.visibleHooks(),0,flipHook);}else{monitor($HookMngr.visibleHooks(bounds,zoom),0,flipHook);}},throttle);$iTXT.core.$(window).itxtSubscribe('scroll',flip);force_clickmode();if($iTXT.glob.params.getBool('js.autoplay.onload',true)){monitor($HookMngr.visibleHooks(bounds,zoom),0,flipHook);}}
if($iTXT.core.Browser.isSmartphoneOrTablet(false,false)&&!$iTXT.glob.params.getBool('js.autoplay.desktoponly',false)){autopeek_init();}
if($iTXT.glob.params.getBool('js.autoplay.channel',false)&&!$iTXT.core.Browser.isSmartphoneOrTablet()&&!$iTXT.glob.params.getBool('js.autoplay.mobileonly',false)){var deciding=false,quiet_time=false;var quiet_period=$iTXT.glob.params.getInt('js.autoplay.quiet',2000);var seen_ionos={},adtypes=[],page_lim=$iTXT.glob.params.getInt("js.autoplay.pagelimit",5),all_views=0,first_fire=true;if($iTXT.glob.params.get('js.autoplay.adtypes',false)){adtypes=$iTXT.glob.params.get('js.autoplay.adtypes','').split(",");adtypes=VM._.map(adtypes,function(el){return+el;});}
function iono_ok(hook){var lim=hook.ad.params.getInt("js.autoplay.limit",1);var iono=hook.ad.params.get("iono","");return(seen_ionos[iono]===undefined||seen_ionos[iono]<lim);}
function views_ok(hook){var lim=hook.ad.params.getInt("js.autoplay.limit",1);if(hook.autoplay_views===undefined){return true;}
return(hook.autoplay_views<lim);}
function adtype_ok(hook){if(!views_ok(hook)||!iono_ok(hook)){return false;}
return(VM._.some(adtypes,function(adt){return adt===hook.ad.$A.at}));}
function update_iono(hook){var iono=hook.ad.params.get("iono","");if(seen_ionos[iono]!==undefined){seen_ionos[iono]++;}else{seen_ionos[iono]=1;}}
function update_views(hook){if(hook.autoplay_views!==undefined){hook.autoplay_views++;}else{hook.autoplay_views=1;}}
function fire_autoplay(hook){if(geoblock()){return;}
all_views++;if(hook.ad.params.getBool("js.autoplay.byiono",false)){update_iono(hook);}else{update_views(hook);}
var launcher=function(){$iTXT.core.$(document).itxtFire("$iTXT:hook:over",{hookid:hook.options.id,hook:hook,bounds:hook.getBoundingBox()});};if(hook.ad.getAdvertType()==193&&first_fire){$iTXT.ui.tt.deferred_launch=launcher;first_fire=false;}else{launcher();}
var hangtime=hook.ad.params.getInt("js.autoplay.hangtime",1000);setTimeout(function(){deciding=false;$iTXT.core.$(document).itxtFire("$iTXT:hook:out",{hookid:hook.options.id,hook:hook});setTimeout(function(){quiet_time=false;},quiet_period);},hangtime);}
function autoplay(){if(!$iTXT.ui.tt.currentAdvert||$iTXT.ui.tt.hasClosed){if(all_views<page_lim){var startAt=$iTXT.glob.params.getInt("js.autoplay.startAt",0);var candidates=[];var check_func;VM._.each($iTXT.ui.HookManager.hooks,function(hook,index){if(hook.isVibrantView()){check_func=views_ok;if(hook.ad.params.getBool("js.autoplay.byiono",false)){check_func=iono_ok;}
if(adtype_ok(hook)){check_func=function(){return true;};}
if(index<startAt){return;}
var winY=window.pageYOffset,winH=window.innerHeight,hkY=hook.rootElement.getBoundingClientRect()['top'];if(hkY>winY&&hkY<(winY+winH)&&check_func(hook)){candidates.push(hook);}}});if(candidates.length>0&&!deciding&&!quiet_time){deciding=true;quiet_time=true;fire_autoplay(candidates[Math.floor(Math.random()*candidates.length)]);}}}}
var autoplay_listener;autoplay_listener=VM._.throttle(function(){monitor($HookMngr.visibleHooks(),0,autoplay);},200);$iTXT.core.$(window).itxtSubscribe('scroll',autoplay_listener);if($iTXT.glob.params.getBool('js.autoplay.onload',true)){autoplay();}}});$iTXT.ui.HookManager={id:0,hookedCounter:0,textNodes:[],hooks:[],startIndex:0,unHookedHooks:[],initSkip:0,maxKWNode:5,maxKWPara:5,keywordPadding:0,keywordInterval:0,placePerParagraph:0,paragraphCounts:{},specialChars:{},nodeID:1,add:function(hook)
{if(hook)
{hook.id=this.id++;this.hooks.push(hook);}},get:function(id)
{for(var i=1;i<this.hooks.length;i++)
{var hk=this.hooks[i];if(hk.id==id)
{return hk;}}
return null;},getHookByDetailId:function(id){var hooks=this.hooks;var i=hooks.length;for(;--i>=0;){if(hooks[i].ad.did==id){return hooks[i];}}
return null;},list:function()
{return this.hooks;},visibleHooks:function(bounds,zoom){var i=0,n=this.hooks.length,a=[];if(zoom&&!$iTXT.ui.AutoPeek.get_zoom_threshold()){return a;}
for(;i<n;i++){if($itxtUtil.isElementVisible(this.hooks[i].rootElement,bounds)){a.push(this.hooks[i]);}}
return a;},execute:function(tn)
{this.setDefaultHookParameters();this.maxKWNode=Math.max(1,$iTXT.glob.params.getInt("kwpn",this.maxKWNode));this.maxKWPara=Math.max(1,$iTXT.glob.params.getInt("kwpp",this.maxKWPara));this.keywordPadding=$iTXT.glob.params.getInt("kwp",this.keywordPadding);this.keywordInterval=$iTXT.glob.params.getInt("hk.interval",this.keywordInterval);this.placePerParagraph=$iTXT.glob.params.getInt("ppp",this.placePerParagraph);this.initSkip=$iTXT.glob.params.getInt("skip",this.initSkip);if(!tn)
{if(this.placePerParagraph&&$iTXT.data.Context.paragraphNodes.length>0)
{tn=$iTXT.core.$A($iTXT.data.Context.paragraphNodes);}
else
{if(this.placePerParagraph)
{}
else
{}
this.placePerParagraph=0;tn=$iTXT.core.$A($iTXT.data.Context.textNodes);}}
tn=$iTXT.core.$A(tn);if(this.initSkip>0)
{var sn=tn.splice(0,this.initSkip);var i=sn.length;while(i--)
{var sTn=(VM._.isArray(sn[i]))?sn[i]:[sn[i]];var j=sTn.length;while(j--)
{$iTXT.debug.Util.hilite(sTn[j],$iTXT.debug.Util.HL_COL_INIT,null,true);}}}
this.textNodes=$iTXT.core.$A(tn);for(var i=0;i<this.hooks.length;i++)
{var hk=this.hooks[i];var hkad=hk.ad;if(hkad){var esc=hkad.params.get("js.special.hook.chars","").split(",");for(var i2=0;i2<esc.length;i2++)
{this.specialChars[esc[i2]]=1;}}}
this._findAllHooks();if(this.hooks.length>0)
{this.textNodes.itxtEach(function(n)
{if(this.placePerParagraph)
{$iTXT.core.$A(n).itxtEach(function(pn)
{var hks=this._getHooks(pn);if(hks.length>0)
{this._hookNode(pn,hks);}},this);}
else
{var hks=this._getHooks(n);if(hks.length>0)
{this._hookNode(n,hks);}}},this);}
$iTXT.fire("$iTXT:hooks:loaded",this.hooks);},_findAllHooks:function()
{this.unHookedHooks=this.hooks;this.hooks=[];if(this.unHookedHooks.length>0)
{var track=$iTXT.glob.params.get("ti");if(null!=track)
{$iTXT.core.Util.dropImage(track);}
if(this.placePerParagraph)
{}
else
{}
var nodesSinceHook=this.keywordInterval;var extraMask=0;this.textNodes.itxtEach(function(o)
{if(this.placePerParagraph)
{var pHookCount=0;$iTXT.core.$A(o).itxtEach(function(pn)
{var sd=this._searchNode(pn,pHookCount,this.maxKWPara,extraMask,nodesSinceHook);var nc=sd.nc;extraMask=sd.lo;pHookCount+=nc;},this);if(pHookCount>0)
{nodesSinceHook=1;}
else
{nodesSinceHook++;}}
else
{var sd=this._searchNode(o,0,this.maxKWNode,extraMask,nodesSinceHook);var nc=sd.nc;extraMask=sd.lo;if(nc>0)
{nodesSinceHook=1;}
else
{nodesSinceHook++;}}},this);}
else
{}},_searchNode:function(n,nc,maxHooks,extraMask,nodesSinceLastHook)
{if(nodesSinceLastHook<this.keywordInterval)
{return{nc:0,lo:0};}
var nodeHookCount=nc;var thisNC=0;var stillUnHooked=[];var nodeText=$iTXT.core.Util.getNodeText(n);var leftOverMask=0;extraMask=extraMask||0;if(extraMask>0)
{var mask=this._maskHookText(0,extraMask,nodeText);nodeText=mask.text;leftOverMask=mask.leftover;}
for(var i=0;i<this.unHookedHooks.length;i++)
{var hk=this.unHookedHooks[i];if(null==hk.childSpans)
{var found=false;if(nodeHookCount<maxHooks)
{found=this._findHookByNode(hk,nodeText,n);}
if(found)
{this.hooks.push(hk);var mask=this._maskHookText(hk.details.s-this.keywordPadding,hk.details.e+this.keywordPadding,nodeText);nodeText=mask.text;leftOverMask=mask.leftover;nodeHookCount++;thisNC++;}
else
{stillUnHooked.push(hk);}}}
this.unHookedHooks=stillUnHooked;return{nc:thisNC,lo:leftOverMask};},_maskHookText:function(s,e,text)
{var maskStart=s;if(maskStart<0)
maskStart=0;var maskEnd=e;var leftover=0;if(maskEnd>text.length)
{leftover=maskEnd-text.length;maskEnd=text.length;}
var rs=text.substring(0,maskStart);rs+=$iTXT.core.Util.strRepeat("#",maskEnd-maskStart);rs+=text.substring(maskEnd);return{text:rs,leftover:leftover};},_findHookByNode:function(hk,t,n)
{var kw=hk.options.value;var okw=kw;var specialChar=(1===this.specialChars[okw])||hk.ad.params.getBool('js.nonroman',false);kw=kw.replace(/(\+|\(|\.|\[|\-|\$|\<|\{|\%|\!|\)|\]|\?)/g,'\\$1');kw=kw.replace(/\ /g,'\\s+');var flags="gm";if(!hk.options.cs)
{flags+="i";}
var leftREChars="(\\b|\u201C|\u2018|\\s)",rightREChars="(\\b|\u201D|\\s|\\.|\\,|\\?|\\!)",pluralChars="(?:[\x27\u2019]s?)?";if(specialChar)
{leftREChars="";rightREChars="";pluralChars="";}
var kwRegEx=new RegExp(leftREChars+kw+rightREChars+pluralChars,flags);var match,foundHk=false,offset=0;while((match=kwRegEx.exec(t))&&!foundHk)
{var kwMatch=match[0];if(kwMatch.length>0)
{foundHk=true;}
var he=(typeof(match.lastIndex)=='undefined'?kwRegEx.lastIndex:match.lastIndex);var kwl=kwMatch.length;var hs=he-kwl;if(1==$iTXT.glob.params.get('hk.cap.subterm',0))
{var kwS=hs,kwE=he;for(kwS=hs;kwS<kwE;kwS++)
{if(!t.substr(kwS,1).match(/\s/))
{break;}}
if(this._isCapitalisedSubTerm(t,kwS,kwE))
{foundHk=false;}}
if(foundHk)
{var hkLc=kwMatch.charAt(0);var hkRc=kwMatch.charAt(kwMatch.length-1);if(this._isNonBorderChar(hkLc)&&!specialChar)
{hs++;kwl--;kwMatch=kwMatch.substring(1,kwMatch.length);}
if(this._isNonBorderChar(hkRc)&&!specialChar)
{he--;kwl--;kwMatch=kwMatch.substring(0,kwMatch.length-1);}
var lc=t.substring(hs-1,hs);var rc=t.substring(he,he+1);if(!specialChar&&((lc=='-')||(lc.charCodeAt(0)==92)||(lc=='$')||(lc=='£')||(lc=='€')||(lc=='/')||(lc=='@')||(rc=='-')))
{foundHk=false;}
if(!specialChar&&(((lc.charCodeAt(0)>127)&&(lc.charCodeAt(0)!=0x201C)&&(lc.charCodeAt(0)!=0x2018)&&(lc.charCodeAt(0)!=160))||((rc.charCodeAt(0)>127)&&(rc.charCodeAt(0)!=0x201D)&&(rc.charCodeAt(0)!=0x2019)&&(rc.charCodeAt(0)!=39)&&(rc.charCodeAt(0)!=8230)&&(rc.charCodeAt(0)!=160))||(/[a-z\u0600-\u06ff]/.test(lc))))
{foundHk=false;}}
if(foundHk)
{hk.details={n:n,s:hs+offset,e:he+offset,kw:kwMatch};}
t=t.substring(he);offset+=he;kwRegEx.lastIndex=0;}
return foundHk;},_hookNode:function(n,hks)
{var newNodes=[];var pos=0;var text=$iTXT.core.Util.getNodeText(n);var followingText=text;hks.sort(function(a,b)
{if(a.details&&b.details)
{return(a.details.s-b.details.s);}
return 0;});for(var i=0;i<hks.length;i++)
{var hk=hks[i];hk.options.id=this.hookedCounter;hk.setKeyword(hk.details.kw);if(hk.details)
{$iTXT.fire("$iTXT:hook:hooked",hk);var leadingText=document.createTextNode(text.substring(pos,hk.details.s));followingText=text.substring(hk.details.e,text.length);newNodes.push(leadingText);newNodes.push(hk.getHook());pos=hk.details.e;this.hookedCounter++;}}
if(newNodes.length>0)
{newNodes.push(document.createTextNode(followingText));var pNode=n.parentNode;if(pNode)
{for(var i=0;i<newNodes.length;i++)
{pNode.insertBefore(newNodes[i],n);}
pNode.removeChild(n);}}},_getHooks:function(n)
{var newArr=[];for(var i=0;i<this.hooks.length;i++)
{var hk=this.hooks[i];if(hk.details.n==n)
{newArr.push(hk);}}
return newArr;},_isNonBorderChar:function(c)
{return c==' '||c=='\n'||c=='\r'||c=='?'||c=='!'||c==','||c=='.'||c=='\u201C'||c=='\u2018';},_isCapitalisedSubTerm:function(t,s,e)
{var kw=t.substring(s,e);if(!$iTXT.core.Util.hasCapitals(kw.substring(0,1)))
{return false;}
var ssS=Math.max(0,t.lastIndexOf(' ',s-2)+1);var ssE=Math.min(t.indexOf(' ',e+2),t.length);var bef=(s>ssS)?$iTXT.core.Util.cleanString(t.substring(ssS,s)):null;var aft=(ssE>e)?$iTXT.core.Util.cleanString(t.substring(e,ssE)):null;if(bef&&$iTXT.core.Util.hasPunctuation(bef.substr((bef.length-1),1)))
{bef=null;}
if(aft&&$iTXT.core.Util.hasPunctuation(aft.substr(0,1)))
{aft=null;}
var subT=t.substring(((s>ssS)?ssS:s),((ssE>e)?ssE:e));if((bef&&$iTXT.core.Util.hasCapitals(bef.substring(0,1)))||(aft&&$iTXT.core.Util.hasCapitals(aft.substring(0,1))))
{return true;}
return false;},getNodeTag:function(o)
{if(o&&o.nodeType)
{var nT=o.nodeType;if($iTXT.core.Util.ELEMENT_NODE==nT)
{if(o.ndPar)
{return o.ndPar['this'];}
o.ndPar=new Object();}
else
{var pn=o.parentNode;if($iTXT.core.Util.TEXT_NODE==nT)
{if(o.parentNode.ndPar)
{return o.parentNode.ndPar[$iTXT.core.Util.nodeIndex(o)];}}}}
return null;},setDefaultHookParameters:function()
{if($iTXT.glob.params)
{var gps=$iTXT.glob.params;var wdb=$iTXT.cnst.WEIGHTING_DEFAULT_DATABASE;gps.set("hk.class","itxthook",wdb);gps.set("hk.class.active","itxthookactive",wdb);gps.set("hk.icon","",wdb);gps.set("hk.icon.active","",wdb);gps.set("hk.icon.path","//images.intellitxt.com/ast/adTypes/",wdb);gps.set("fg","#006400",wdb);gps.set("bg","transparent",wdb);gps.set("hk.fg.col","${fg}",wdb);gps.set("hk.fg.h.col","#006400",wdb);gps.set("hk.bg.col","transparent",wdb);gps.set("hk.bg.h.col","${bg}",wdb);gps.set("hk.def.style","text-decoration: underline; border-bottom: 1px solid ${hk.fg.col}; border-top: none; color: ${hk.fg.col}; background-color: ${hk.bg.col}",wdb);gps.set("hk.def.h.style","text-decoration: underline; border-bottom: 0.2em solid ${hk.fg.h.col}; border-top: none; color: ${hk.fg.h.col}; background-color: ${hk.bg.h.col}",wdb);gps.set("hk.style","${hk.def.style}",wdb);gps.set("hk.h.style","${hk.def.h.style}",wdb);}},_onNoHook:function(){if(this.hooks.length){return;}
if(!$iTXT.glob.params.getBool('js.nohook.callback',false)){return;}
if(!VM._.isFunction(window.onVMNoAds)){return;}
window.onVMNoAds();}};$iTXT.ui.HookHelper={defaults:{fgColr:'#009900',fgColrOld:'#006400',bgColr:'transparent',bgColrOld:'transparent',upperLnColr:'#009900',lowerLnColr:'#00CC00',icon:'icon1.png',lbIcon:'lb_icon1.png'},getStyleObjectFromString:function(str){var i,n,k,v,arr,css={};str=cleanString(str);if(!str)return{};arr=str.toLowerCase().split(';');for(i=0,n=arr.length;i<n;i++){arr[i]=arr[i].split(':');if(arr[i].length==2){k=cleanString(arr[i][0]);v=cleanString(arr[i][1]);css[k]=v;}}
return css;},getStyleStringFromObject:function(css){return $iTXT.core.Util.buildQueryString(css,';',':');},isCustomStyle:function(style)
{var key,numkey=0;if(!style){return false;}
for(key in style){if(style.hasOwnProperty(key)){numkey++;}}
if(numkey!=7&&numkey!=6){return true;}
if((!style['font-weight']||!style['font-size']||!style['text-decoration']||!style['border-bottom']||!style['padding-bottom']||!style['color']||!style['background-color'])&&(!style['text-decoration']||!style['border-bottom']||!style['border-top']||!style['color']||!style['background-color']||!style['padding-bottom'])){return true;}
if((style['font-weight']!='normal'||style['font-size']!='100%'||style['text-decoration']!='underline'||style['border-bottom']!='darkgreen 0.075em solid'||style['padding-bottom']!='1px'||style['color']!='darkgreen'||style['background-color']!='transparent')&&(style['text-decoration']!='underline'||style['border-bottom']!='1px solid #006400'||style['border-top']!='none'||style['color']!='#006400'||style['background-color']!='transparent'||style['padding-bottom']!='1px')){return true;}
return false;},isCustomActiveStyle:function(style)
{var key,numkey=0;if(!style){return false;}
for(key in style){if(style.hasOwnProperty(key)){numkey++;}}
if(numkey!=7&&numkey!=6){return true;}
if((!style['font-weight']||!style['font-size']||!style['text-decoration']||!style['border-bottom']||!style['padding-bottom']||!style['color']||!style['background-color'])&&(!style['text-decoration']||!style['border-bottom']||!style['border-top']||!style['color']||!style['background-color']||!style['padding-bottom'])){return true;}
if((style['font-weight']!='normal'||style['font-size']!='100%'||style['text-decoration']!='underline'||style['border-bottom']!='darkgreen 0.2em solid'||style['padding-bottom']!='1px'||style['color']!='darkgreen'||style['background-color']!='transparent')&&(style['text-decoration']!='underline'||style['border-bottom']!='0.2em solid #006400'||style['border-top']!='none'||style['color']!='#006400'||style['background-color']!='transparent'||style['padding-bottom']!='1px')){return true;}
return false;}};$iTXT.ui.Hook=$iTXT.core.Class.create({options:null,isActive:false,childSpans:null,mouseOver:false,mouseOutFireTID:-1,mouseOverTS:null,mouseOverPos:null,mouseOverSpan:null,delayedOverTO:-1,seenAlready:false,flipped:false,seenAfter:-1,hkStyle:null,hkActiveStyle:null,spanStyle:null,spanActiveStyle:null,isImpetus:false,disableIcon:false,_tt:null,_bb:null,_launcher:null,_closer:null,_timer:-1,init:function(_options)
{var is_mobile=$iTXT.core.Browser.isTargetedSmartphone($iTXT.glob.params.getBool("tt.force.mobile",false));this.defaultOptions=this.options=$iTXT.core.Util.extend({id:0,uid:"id",uidh:"idh",clickUrl:is_mobile?"javascript:void(0);":"#",className:"${hk.class}",activeClassName:"${hk.class.active}",hookIconPath:'${hk.icon.path}',hookIconSrc:"${hk.icon}",activeHookIconSrc:"${hk.icon.active}",hookIconStyle:"${hk.icon.style}",value:"hook",hookStyle:"${hk.style}",hookActiveStyle:"${hk.h.style}"},_options);var ad=this.options.advert;$iTXT.ui.HookManager.add(this);this.keyword=this.options.value;this._events=[];this.setAdvert(ad||new $iTXT.data.Advert($iTXT.tmpl.TestTemplate,{title:"Hello World!",link:"http://www.google.com",ttthbg:"yellow"}));if(!this.isVibrantView()&&!this.isLightbox(ad)&&$iTXT.core.Browser.isSmartphoneOrTablet()&&ad.params.getBool('hk.autopeek.on',true)&&!this.isDoubleTap(ad)){ad.params.set("nott",1,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}
if(this.isDoubleTap(ad)){ad.params.set("hk.click.mode",1,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}},isLightbox:function(ad){return((ad.$A.at>159&&ad.$A.at<166)||ad.$A.at==178);},isMosaic:function(ad){return(ad.$A.at==165);},isStoryBoard:function(ad){return(ad.$A.rat==178||ad.$A.at==178||ad.$A.at==184);},isVibrantView:function(){var adtypes=[];if($iTXT.glob.params.get('js.autoplay.adtypes',false)){adtypes=$iTXT.glob.params.get('js.autoplay.adtypes','').split(",");adtypes=VM._.map(adtypes,function(el){return+el;});}
return(this.ad.params.get('js.autoplay',false)||VM._.some(adtypes,function(adt){return adt===this.ad.$A.at;},this))&&$iTXT.glob.params.getBool('js.autoplay.channel',false)&&!this.isDoubleTap(this.ad);},hasMobt:function(){return $iTXT.ui.MobtManager.isMobtEnabled(this);},isDoubleTap:function isDoubleTap(ad){var doubleTap=ad.params.getInt("tt.doubletap",0);var blockDoubleTap=$iTXT.glob.params.get("tt.blockDoubleTap");var isMobile=$iTXT.core.Browser.isSmartphone();return!blockDoubleTap&&doubleTap&&isMobile;},applyResetStyle:function(){this.rootElement.style.cssText=['font-weight: normal','font-size: 100%','font-style: normal','text-decoration: none','border: 0px none transparent','padding: 0px','background-color: transparent','background-image: none','display: inline'].join(';');},setAdvert:function(ad)
{this.ad=ad;this.ad.params.set("H.ID",this.options.uid,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);this.ad.params.set("H.IDH",this.options.uidh,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);var ord=Math.floor(Math.random()*10e12);this.ad.params.set("hookhash",ord);this.ad.processAdvert();},setKeyword:function(kw)
{this.keyword=kw;this._buildHook();},setHookId:function(id)
{this.rootElement.id=id;},_buildHook:function()
{if(!this.ad)
return;var p=b;this.ad.createTemplate();var adps=this.ad.params;var w=$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN;var at=this.ad.getAdvertType();var showIcon=adps.getBool("hk.icon.show",true);var p=new $iTXT.data.Param(adps);var eati=p.getBool("eati",false);if(eati)
{if(at)
{var icon=p.get("hk.icon",p.get("atig"+at,p.get("atig")));var iconActive=p.get("hk.icon.active",icon);if("none"==icon)
{p.set("hk.icon","",w);p.set("hk.icon.active","",w);this.disableIcon=true;}
else if(null!==icon)
{p.set("hk.icon",icon,w);p.set("hk.icon.active",iconActive,w);this.disableIcon=false;}
var atis=p.get("atis");if(null!==atis)
{p.set("hk.icon.style",atis,w);this.disableIcon=false;}}}
else if(showIcon){icon=$iTXT.ui.HookHelper.defaults.icon;if(this.ad.params.getBool("lbox",false)){icon=$iTXT.ui.HookHelper.defaults.lbIcon;}
p.set("hk.icon",icon,w);p.set("hk.icon.active",icon,w);this.disableIcon=false;}else{p.set("hk.icon","",w);p.set("hk.icon.active","",w);this.disableIcon=true;}
var align=this.ad.params.get("hk.icon.align","right");this.options.hookIconOnRight=(align=="right");var iconStyle=this.ad.params.get("hk.icon.style",p.get("hk.icon.style",null));this.options.hookIconStyle=iconStyle;if(!this.options.hookIconStyle){this.options.hookIconStyle='';}
this.options.hookIconStyle=$iTXT.ui.HookHelper.getStyleObjectFromString(this.options.hookIconStyle);this.options.hookIconStyle['padding-top']='0px!important';this.options.hookIconStyle['padding-right']='0px!important';this.options.hookIconStyle['padding-bottom']='0px!important';this.options.hookIconStyle['padding-left']='4px!important';this.options.hookIconStyle['margin-top']='0px!important';this.options.hookIconStyle['margin-right']='0px!important';this.options.hookIconStyle['margin-bottom']='0px!important';this.options.hookIconStyle['margin-left']='0px!important';this.options.hookIconStyle['vertical-align']='baseline!important';this.options.hookIconStyle=$iTXT.ui.HookHelper.getStyleStringFromObject(this.options.hookIconStyle);if(at)
{var ul=p.get("ul"+at);if(null!==ul)
{p.set("hk.style",ul,w);}
var hv=p.get("hv"+at);if(null!==hv)
{p.set("hk.h.style",hv,w);}}
var hks=p.get("hk.style");if(null!==hks&&""!==hks&&"${hk.def.style}"!=hks)
{var hkhs=p.get("hk.h.style");if(hkhs===null||""===hkhs||"${hk.def.h.style}"==hkhs)
{p.set("hk.h.style","${hk.style};background-color:${hk.bg.h.col};",$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}}else{p.set("hk.style","${hk.def.style};padding-bottom:1px;",$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);p.set("hk.h.style","${hk.def.h.style};padding-bottom:1px;",$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}
this.hookAsBtn=p.get('hk.btn',false);this.ad.template.onBuildHookStyle(this.defaultOptions);this.options=$iTXT.core.Util.cloneObject(this.defaultOptions);this.options=p.tokenize(this.options);if(this.rootElement)
{}
var b=$iTXT.core.Builder;this.childSpans=[];var HkHelper=$iTXT.ui.HookHelper;this.hkStyle=HkHelper.getStyleObjectFromString(this.options.hookStyle.toLowerCase());this.hkActiveStyle=HkHelper.getStyleObjectFromString(this.options.hookActiveStyle.toLowerCase());this.spanStyle=this.hkStyle;this.spanActiveStyle=this.hkActiveStyle;this.rootElement=b.make("A",{href:this.options.clickUrl,id:"itxthook"+this.options.id,rel:"nofollow"});this.applyResetStyle();if(!HkHelper.isCustomStyle(this.spanStyle)&&!HkHelper.isCustomActiveStyle(this.spanActiveStyle)){this.isImpetus=true;this.rootElement.className='itxtnewhook';this.spanStyle['padding-top']=this.spanActiveStyle['padding-top']='0px!important';this.spanStyle['padding-right']=this.spanActiveStyle['padding-right']='0px!important';this.spanStyle['padding-bottom']=this.spanActiveStyle['padding-bottom']='1px!important';this.spanStyle['padding-left']=this.spanActiveStyle['padding-left']='0px!important';this.spanStyle['text-decoration']=this.spanActiveStyle['text-decoration']='underline!important';this.spanStyle['border-top']=this.spanActiveStyle['border-top']='0px none transparent';this.spanStyle['border-right']=this.spanActiveStyle['border-right']='0px none transparent';this.spanStyle['border-left']=this.spanActiveStyle['border-left']='0px none transparent';this.spanStyle['color']=HkHelper.defaults.upperLnColr;this.spanActiveStyle['color']=HkHelper.defaults.upperLnColr;this.spanStyle['border-bottom']='1px solid '+HkHelper.defaults.lowerLnColr;this.spanActiveStyle['border-bottom']='1px solid '+HkHelper.defaults.lowerLnColr;}else{this.spanStyle['padding-bottom']=this.spanStyle['padding-bottom']||'1px';this.spanActiveStyle['padding-bottom']=this.spanActiveStyle['padding-bottom']||'1px';if(this.spanStyle['padding-bottom'].indexOf('!important')<0){this.spanStyle['padding-bottom']+='!important';}
if(this.spanActiveStyle['padding-bottom'].indexOf('!important')<0){this.spanActiveStyle['padding-bottom']+='!important';}}
if(!this.isImpetus&&!this.ad.params.get('hk.icon')){this.disableIcon=true;}
this.options.hookStyle=$iTXT.ui.HookHelper.getStyleStringFromObject(this.hkStyle);this.options.hookActiveStyle=$iTXT.ui.HookHelper.getStyleStringFromObject(this.hkActiveStyle);this.spanStyle=$iTXT.ui.HookHelper.getStyleStringFromObject(this.spanStyle);this.spanActiveStyle=$iTXT.ui.HookHelper.getStyleStringFromObject(this.spanActiveStyle);var hkw=b.make("SPAN",{id:("itxthook"+this.options.id+"w"),className:"itxtnowrap"+($iTXT.core.Browser.isIE7OrLessMode()?'_ie7':''),style:this.spanStyle},[this.keyword]);if(this.isImpetus){hkw.className+=' itxtnewhookspan';}
if(!this.disableIcon&&this.options.hookIconSrc.length>0)
{this.hookIcon=b.make("IMG",{className:"itxthookicon",id:("itxthook"+this.options.id+"icon"),src:(this.options.hookIconPath+this.options.hookIconSrc),style:this.options.hookIconStyle});var childSpans=[hkw,this.hookIcon];if(!this.options.hookIconOnRight)
{childSpans=[this.hookIcon,hkw];}
p=b.make("span",{id:("itxthook"+this.options.id+"p"),className:'itxtnowrap'+($iTXT.core.Browser.isIE7OrLessMode()?'_ie7':'')},childSpans);this.childSpans.push(p);}
else
{this.childSpans.push(hkw);}
this.rootElement.itxtAppendChildren(this.childSpans);if($iTXT.ui.MobtManager.isMobtEnabled(this)){var m=$iTXT.ui.Mobt;if(this.options.hookActiveStyle.indexOf("border-bottom")>-1){this.options.hookActiveStyle=this.options.hookActiveStyle.replace(/border-bottom:[^;]+;/,"");}
$iTXT.ui.MobtManager.infest(this);this.rootElement.itxtSubscribe("mouseover",$iTXT.core.Event.bind(this,this._onMobtMouseOver));if(this.isImpetus&&(!$iTXT.core.Browser.supportsFeature("transforms")||!$iTXT.core.Browser.supportsFeature("transitions"))){this.rootElement.itxtSubscribe("mouseover",$iTXT.core.Event.bind(this,function(){var hasIcon=this.rootElement.getElementsByTagName('img').length>0;var span=this.rootElement.firstChild;if(hasIcon){span=span.firstChild;}
span.style.color='#00CC00';span.style.borderBottomColor='#00CC00';}));}
this.rootElement.itxtSubscribe("mouseout",$iTXT.core.Event.bind(this,m._onHookOut));this.rootElement.itxtSubscribe("$iTXT:tt:close",$iTXT.core.Event.bind(this,m._ttCloseMobt));this.rootElement.itxtSubscribe("$iTXT:tt:ittc",$iTXT.core.Event.bind(this,m._ttCancelled));this.rootElement.itxtSubscribe("$iTXT:tt:mouse:out",$iTXT.core.Event.bind(this,m._ttMouseOut));}else{if(!$iTXT.MOBILE){this.rootElement.itxtSubscribe("mouseover",$iTXT.core.Event.bind(this,this._onMouseOver));this.rootElement.itxtSubscribe("mouseout",$iTXT.core.Event.bind(this,this._onMouseOut));}}
if(!$iTXT.MOBILE){this.rootElement.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._onClick));}
this.rootElement.itxtSubscribe("touchend",$iTXT.core.Event.bind(this,this._onTouch));this.ad.setHook(this);this.updateHookStyle();},updateHookStyle:function()
{if(this.isActive)
{this.rootElement.itxtAddClass(this.options.activeClassName,this.options.className);this.updateSpanStyle(this.spanActiveStyle);if(!this.disableIcon&&""!==this.options.hookIconSrc&&""!==this.options.activeHookIconSrc)
{this.hookIcon.src=this.options.hookIconPath+this.options.activeHookIconSrc;}}
else
{this.rootElement.itxtAddClass(this.options.className,this.options.activeClassName);this.updateSpanStyle(this.spanStyle);if(!this.disableIcon&&""!==this.options.hookIconSrc)
{this.hookIcon.src=this.options.hookIconPath+this.options.hookIconSrc;}}},updateSpanStyle:function(css)
{var hasIcon=this.rootElement.getElementsByTagName('img').length>0;var span=this.rootElement.firstChild;if(hasIcon){span=span.getElementsByTagName('span')[0];}
if(this.hookAsBtn){this.rootElement.style.cssText=css;span.style.cssText='';}else{span.style.cssText=css;}},getHook:function()
{return this.rootElement;},getWordNode:function(){return document.getElementById('itxthook'+this.id+'w');},isWrapped:function()
{if(this.childSpans.length==1)
return false;var span1Off=this.childSpans[0].itxtTotalOffset();var span2Off=this.childSpans[this.childSpans.length-1].itxtTotalOffset();return(span1Off.top!=span2Off.top);},saveTT:function(obj){this._tt=obj;},saveBounds:function(bb){this._bb=bb;},saveTTLaunchFunction:function(launch){this._launcher=launch;},_onMouseOver:function(e){this._clearMouseTID();var targ=this._captureMousePos(e);if(targ){var t=this;this.delayedOverTO=setTimeout(function(){t.launchTooltip(targ);},10);}},_onMobtMouseOver:function(e){var relatedTarget;if(!e)e=window.event;relatedTarget=e.relatedTarget?e.relatedTarget:e.fromElement;if(!this.rootElement.itxtContains(relatedTarget)){this.hookIn(e);this._onMouseOver(e);}},_clearMouseTID:function(){if(this.mouseOutFireTID!=-1)
{window.clearTimeout(this.mouseOutFireTID);this.mouseOutFireTID=-1;}},_captureMousePos:function(e)
{var target=e.srcElement||e.target;var scrollTop=0,scrollLeft=0;this.mouseOverSpan=target;if(target==this.rootElement)
{$iTXT.core.$(document).itxtFire("$iTXT:hook:in",{hookid:this.options.id,hook:this});return false;}
this.mouseOverTS=(new Date()).getTime();try
{scrollTop=document.documentElement.scrollTop||document.body.scrollTop;scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;}
catch(er)
{scrollTop=0;scrollLeft=0;}
this.mouseOverPos={x:e.clientX+scrollLeft,y:e.clientY+scrollTop};return target;},launchTooltip:function(target)
{this.mouseOver=true;if(target.itxtSetStyle){target.itxtSetStyle({position:"relative"});}else{target.style.position="relative";}
var tOff=$iTXT.core.$(target).itxtTotalOffset();target.itxtSetStyle({position:""});var bb={left:tOff.left,top:tOff.top,width:target.offsetWidth,height:target.offsetHeight,target:target};$iTXT.core.$(document).itxtFire("$iTXT:hook:over",{bounds:bb,hookid:this.options.id,hook:this});},_onMouseOut:function(e)
{if(this.delayedOverTO!=-1)
{clearTimeout(this.delayedOverTO);}
if(this.mouseOver)
{var t=this;this.mouseOutFireTID=window.setTimeout(function(){t._mouseOutFire(e);},20);}},_mouseOutFire:function(e)
{this.mouseOver=false;var len=(new Date()).getTime()-this.mouseOverTS;$iTXT.core.$(document).itxtFire("$iTXT:hook:out",{hookid:this.options.id,hook:this,len:len});},_onClick:function(e)
{var src=(e.target==this.hookIcon)?$iTXT.data.ClickSource.ICON:$iTXT.data.ClickSource.KEYWORD;$iTXT.core.$(document).itxtFire("$iTXT:hook:click",{source:src,hookid:this.options.id,hook:this,advert:this.ad});return false;},_onTouch:function(e)
{var src=(e.target==this.hookIcon)?$iTXT.data.ClickSource.ICON:$iTXT.data.ClickSource.KEYWORD;$iTXT.core.$(document).itxtFire("$iTXT:hook:touch",{source:src,hookid:this.options.id,hook:this,advert:this.ad});this._clearMouseTID();var targ=this._captureMousePos(e);if(targ){var t=this;this.delayedOverTO=setTimeout(function(){t.launchTooltip(targ);},10);}
return false;},setState:function(s)
{this.isActive=s;this.updateHookStyle();},getPosition:function()
{var el=this.rootElement.firstChild;if(el.childNodes.length>1){el=el.firstChild;}
return $iTXT.core.Util.getCurrentPosition(el);},getBoundingBox:function(){var pos=this.getPosition();var wrd=this.getWordNode();return{top:pos.top,left:pos.left,width:wrd.offsetWidth,height:wrd.offsetHeight,target:wrd};},setHookStyle:function(s,as)
{if(s)
{this.options.hookStyle=s;}
if(as)
{this.options.hookActiveStyle=as;}
this.updateHookStyle();},_updateSpanCol:function()
{var c=this.rootElement.style.color;for(var i=0;i<this.childSpans.length;i++)
{this.childSpans[i].style.color=c;if(this.childSpans[i].nodeName.toLowerCase()!='span')
{this._updateInnerSpanCol(this.childSpans[i],c);}}},_updateInnerSpanCol:function(parent,color)
{var nodes=parent.childNodes,node,nodeName,i=0,n=nodes.length;for(;i<n;i++)
{node=nodes[i];nodeName=node.nodeName.toLowerCase();if(nodeName=='span')
{node.style.color=color;}}}});$iTXT.ui.Hook.CLICKMODE={CLICKABLE:0,NOT_CLICKABLE:1,TOOLTIP_VISIBLE:2,DELAYED:3};$iTXT.subscribe('$iTXT:contextualizer:drop',function(){$iTXT.SUPPRESS_PBF=true;});$iTXT.subscribe('$iTXT:initialiser:load:complete',VM._.bind($iTXT.ui.HookManager._onNoHook,$iTXT.ui.HookManager));$iTXT.subscribe('$iTXT:initialiser:load:complete',function(){function is_switched_off(){return $iTXT.glob.params.getBool('js.daw.switchallowed',false)&&window.vmNoDAW===true;}
if(!is_switched_off()&&!!$iTXT.glob.params.get('js.daw.partners',false)&&!!$iTXT.glob.params.get('js.daw.statschannel',false)&&!$iTXT.core.Browser.isSmartphoneOrTablet()){var triggerpoint=$iTXT.glob.params.getInt('js.daw.trigger',30);var storedheight=document.body.offsetHeight;var minscroll=$iTXT.glob.params.getInt('js.daw.minscroll',900);var minheight=$iTXT.glob.params.getInt('js.daw.minheight',500);var enuf_win=(window.innerHeight||document.documentElement.clientHeight)>minheight;var useScroll=$iTXT.glob.params.getBool('js.daw.usescroll',true);if(!useScroll){minscroll=0;triggerpoint=0;}
function onScrollEnd(){if(storedheight*(triggerpoint/100)<=window.pageYOffset&&window.pageYOffset>=minscroll&&enuf_win){if(!VM.DAW.loaded){var url=$iTXT.glob.params.get('js.daw.url',"//images.intellitxt.com/ast/js/vm/jslib/resources/daw.js");$iTXT.core.Util.dropScript(url+"?refresh="+(new Date()).getTime());VM.DAW.loaded=true;VM.DAW.showing=true;}else{if(!VM.DAW.showing){VM.DAW.reshow();VM.DAW.showing=true;}}}else{if(VM.DAW.loaded&&VM.DAW.showing){VM.DAW.hide();VM.DAW.showing=false;}}}
var scrollFinish;function checkForScrollEnd(){clearTimeout(scrollFinish);scrollFinish=setTimeout(function(){onScrollEnd();},100);}
var ad={params:new $iTXT.data.Param($iTXT.glob.params,{})};var daw_al=$iTXT.data.AdLogger.getInstance();var dam_init=(new Date()).getTime();daw_al.monitor(ad,{mt:139,mv:'daw_enabled',mv2:0});if(!enuf_win){daw_al.monitor(ad,{mt:139,mv:'daw_page_too_short',mv2:parseInt(window.innerHeight||document.documentElement.clientHeight)});}
function onDawOpen(){var now=(new Date()).getTime()-dam_init;daw_al.monitor(ad,{mt:139,mv:'daw_load',mv2:now});}
function onDawClose(){var now=(new Date()).getTime()-dam_init;daw_al.monitor(ad,{mt:139,mv:'daw_close',mv2:now});}
function onNoAd(){var now=(new Date()).getTime()-dam_init;daw_al.monitor(ad,{mt:139,mv:'daw_no_ad',mv2:now});}
VM.DAW={loaded:false,partners:$iTXT.glob.params.get('js.daw.partners'),pvu:$iTXT.glob.params.parse('${pvu}'),iframe:$iTXT.glob.params.get('js.daw.iframe','http://adservices02.picadmedia.com/d/pbf/v1'),ipid:$iTXT.glob.params.get('js.daw.statschannel'),tracking:$iTXT.glob.params.parse($iTXT.glob.params.get('js.daw.tracking')),page:window.location.href,onopen:onDawOpen,onclose:onDawClose,on_no_ad:onNoAd,align:$iTXT.glob.params.get('js.daw.alignment','right'),hours:$iTXT.glob.params.getInt('js.daw.freqcap.hours',0),impressions:$iTXT.glob.params.getInt('js.daw.freqcap.imps',0),noLogo:$iTXT.glob.params.getInt('js.daw.nologo',0),refresh:$iTXT.glob.params.getInt('js.daw.refresh',0),settings:{animate:$iTXT.glob.params.getBool('js.daw.animate',true)}};if(useScroll){$iTXT.core.$(window).itxtSubscribe('scroll',checkForScrollEnd);}else{onScrollEnd();};}
if(!$iTXT.SUPPRESS_PBF){var ptnrs=$iTXT.glob.params.get('js.pbf.partners');var stats_ipid=$iTXT.glob.params.get('js.pbf.statschannel',false);function loadPBF(callback){VM.pBackfill={iframe:$iTXT.glob.params.get("js.pbf.iframe","http://adservices02.picadmedia.com/m/pbf/v1"),ipid:stats_ipid,pvu:$iTXT.glob.params.parse("${pvu}"),partners:ptnrs,noresize:(ptnrs.indexOf("google")>-1)};var url=$iTXT.glob.params.get("js.pbf.url","//images.intellitxt.com/ast/js/vm/jslib/resources/pbf.js");$iTXT.core.Util.dropScript(url+"?"+(new Date()).getTime());}
var ok_to_launch=$iTXT.core.Browser.isSmartphoneOrTablet();if(!stats_ipid||!ptnrs){ok_to_launch=false;}
if(!$iTXT.data.AdvertManager.noDynamicAdhesions()){ok_to_launch=false;}
if(ptnrs&&ptnrs.indexOf("google")>-1){if(!$iTXT.core.Browser.isSmartphone()){ok_to_launch=false;}
if($iTXT.js.max86backfill){ok_to_launch=false;}};if(ok_to_launch){loadPBF();}}});};$iTXT.js.loader["$iTXT.ui.LightboxChrome"]=true;$iTXT.ui.LightboxAVTrigger={ONBUFFER:0,ONOPEN:1,ONTIME:2};$iTXT.ui.LightboxChrome_Load=function(){var undefined;$iTXT.ui.LightboxChrome=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{advert:null,init:function(_options,$super)
{var defOpts=$iTXT.core.Util.extend({id:"itxtTakeoverAd",zIndex:$iTXT.core.Util.highestZIndex()+500},_options);$super(defOpts);},build:function()
{var lightboxDiv=document.getElementById(this.options.id);if(lightboxDiv)
{this.rootElement=lightboxDiv;}
else
{this.rootElement.wrapper=$iTXT.core.Builder.make("DIV",{id:"itxtLboxWrpr"});this.rootElement.wrapper.itxtSetStyle({marginTop:"-400px",position:"fixed",width:"100%",left:0,top:"50%",overflow:"hidden",zIndex:this.options.zIndex+500});this.rootElement.wrapper.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._wrapperClick));this.rootElement.appendChild(this.rootElement.wrapper);var existingMask=document.getElementById("itxtLboxMask");if(!existingMask)
{this.rootElement.mask=$iTXT.core.Builder.make("DIV",{id:"itxtLboxMask"},[]);this.rootElement.mask.itxtSetStyle({background:"#000",position:"fixed",top:"0px",left:"0px",width:"100%",height:"100%",zIndex:this.options.zIndex,overflow:"visible",opacity:0.8,filter:'alpha(opacity = 80)'});this.rootElement.iframe=$iTXT.core.Builder.make("iframe",{name:"itxtLboxWrprIframe",id:"itxtLboxWrprIframe",src:"about:blank",frameborder:0});this.rootElement.iframe.itxtSetStyle({background:'#444',position:"fixed",top:0,left:0,zIndex:this.options.zIndex-500,width:'100%',height:'100%'});this.rootElement.iframe.itxtHide();document.body.appendChild(this.rootElement.iframe);}
else
{this.rootElement.mask=existingMask;}
this.rootElement.mask.itxtHide();this.rootElement.itxtHide();document.body.appendChild(this.rootElement.mask);document.body.appendChild(this.rootElement);}},fixOpacity:function()
{var invalidObjects=0;var allowedWmode={transparent:true,opaque:true};var flashes=document.getElementsByTagName('object');var iframes=document.getElementsByTagName('iframe');if(flashes)
{for(var f=0,fLen=flashes.length;f<fLen;f++)
{var isAttrWmode=false;var isParamWmode=false;var thisFlash=flashes[f];if(thisFlash)
{if(thisFlash.attributes)
{for(var a=0,aLen=thisFlash.attributes.length;a<aLen;a++)
{var thisAttr=thisFlash.attributes[a];if(thisAttr&&thisAttr.nodeValue&&!$iTXT.core.Util.isObject(thisAttr.nodeValue)&&allowedWmode[thisAttr.nodeValue])
{isAttrWmode=true;}}}
if(thisFlash.childNodes)
{for(var c=0,cLen=thisFlash.childNodes.length;c<cLen;c++)
{var thisChild=thisFlash.childNodes[c];if(thisChild&&thisChild.name=="wmode"&&allowedWmode[thisChild.value])
{isParamWmode=true;}}}}
if($iTXT.core.Browser.is("Explorer")&&!isParamWmode)
{invalidObjects++;}
else if(!(isAttrWmode||isParamWmode))
{invalidObjects++;}}}
if(iframes)
{for(var i=0,iLen=iframes.length;i<iLen;i++)
{var thisFrame=iframes[i];if(thisFrame&&thisFrame.src&&thisFrame.src.indexOf('youtube.com')>0&&thisFrame.src.indexOf('wmode')==-1)
{invalidObjects++;}}}
if(invalidObjects>0)
{var solidMaskColor=this.advert.params.get('lbox.solidMaskColor','#444');this.rootElement.mask.itxtSetStyle({background:solidMaskColor,opacity:1,filter:'alpha(opacity=100)'});window.frames["itxtLboxWrprIframe"].document.body.style.backgroundColor=solidMaskColor;this.rootElement.iframe.itxtShow();}},_unitClick:function(e)
{e.preventDefault();e.stop();},_wrapperClick:function(w)
{$iTXT.fire("$iTXT:tt:lightbox:close",{isMaskClick:true});},_onMouseDownUp:function(e)
{},show:function(ad)
{this.advert=ad;this.fixOpacity();var overlaySrc=ad.params.get("lboxsrc");var _options={props:{src:overlaySrc,width:800,height:800},id:"lboxTakover"};var flash=new $iTXT.tmpl.Flash(_options,this.advert);var unit=$iTXT.core.Builder.make("DIV",{id:"itxtLboxUnit"},[flash.rootElement]);unit.itxtSetStyle({width:"800px",height:"800px",margin:"0 auto",zIndex:this.options.zIndex+1000});unit.itxtBatchSubscribe([["mouseup",$iTXT.core.Event.bind(this,this._onMouseDownUp)],["mousedown",$iTXT.core.Event.bind(this,this._onMouseDownUp)],["contextmenu",$iTXT.core.Event.bind(this,this._onMouseDownUp)],["click",$iTXT.core.Event.bind(this,this._unitClick)]],this.evtDspFuncs);this.rootElement.wrapper.itxtClear();this.rootElement.wrapper.appendChild(unit);this.rootElement.mask.itxtShow();this.rootElement.itxtShow();this.advert.template.dropMoatAdTag();},hide:function()
{if(!this.advert.flash){this.advert.flash=document.getElementById("lboxTakoverMC");}
if(this.advert.flash)
{try
{flash.muteVideo();flash.reset();}
catch(e)
{}}
this.rootElement.mask.itxtHide();this.rootElement.iframe.itxtHide();this.rootElement.itxtHide();}});};$iTXT.js.loader["$iTXT.ui.Mobt"]=true;$iTXT.ui.Mobt_Load=function(){$iTXT.ui.Mobt={defaults:{color:'#000000',colorHover:'#003399',bgColor:'#F0F0F0',bgColorHover:'#F0F0F0',iconWidth:20,iconHeight:20,openDelay:0,hideDelay:1000},initMobt:function(){var b=$iTXT.core.Builder,holder,mobtHookEl,mobtIconEl;holder=document.getElementById('itxtmobtholder');function _makeicon(ctx){var mobtIconEl,that;var icon_w=$iTXT.ui.Mobt.defaults.iconWidth,icon_h=$iTXT.ui.Mobt.defaults.iconHeight;if(ctx.options.hookMobtIconWidth&&!isNaN(parseInt(ctx.options.hookMobtIconWidth,10))){icon_w=parseInt(ctx.options.hookMobtIconWidth,10);}
mobtIconEl=b.make("img",{"src":ctx.options.hookMobtIcon,"width":icon_w,"height":icon_h,style:"width:"+icon_w+"px;height:"+icon_h+"px"});mobtIconEl.className="mobt_icon";return mobtIconEl;}
if(this.options.hookMobtModern){if(this.options.hookMobtIcon){mobtHookEl=b.make("div",{},[_makeicon(this),this.options.hookMobtText]);}
else{mobtHookEl=b.make("div",{},[this.options.hookMobtText]);}
mobtHookEl.className="mobt_hook";}else{if(this.options.hookMobtIcon){mobtHookEl=b.makeNoReset("div",{},[b.makeNoReset("div",{},[],"mobt_sprite_left"),b.makeNoReset("div",{},[_makeicon(this),this.options.hookMobtText],"mobt_sprite_middle"),b.makeNoReset("div",{},[],"mobt_sprite_right")],"mobt_hook_legacy");}else{mobtHookEl=b.makeNoReset("div",{},[b.makeNoReset("div",{},[],"mobt_sprite_left"),b.makeNoReset("div",{},[this.options.hookMobtText],"mobt_sprite_middle"),b.makeNoReset("div",{},[],"mobt_sprite_right")],"mobt_hook_legacy");}}
this.mobt=b.makeEl("div",{id:"itxt_mbtc_"+this.ad.did,style:"left:-1000px"},[mobtHookEl],{resets:"mobt_container"});that=this;var offsets=this.getPosition();var defaultStyles={};defaultStyles.top=(offsets.top-5)+"px";var bgcolor=$iTXT.ui.Mobt.defaults.bgColor;if(this.options.hookMobtBgColor!==undefined&&this.options.hookMobtBgColor!==""){bgcolor=this.options.hookMobtBgColor;}
if(this.options.hookMobtColor!==undefined&&this.options.hookMobtColor!==""){defaultStyles.color=this.options.hookMobtColor;}
this.mobt.itxtSetStyle(defaultStyles);this.built=true;holder.setAttribute('data-did',this.ad.did);holder.appendChild(this.mobt);},addMobtOptions:function(){var opts=this.options,params=this.ad.params,def=$iTXT.ui.Mobt.defaults;opts.hookMobtModern=$iTXT.core.Browser.supportsFeature("transforms")&&$iTXT.core.Browser.supportsFeature("transitions");opts.hookMobtText=decodeURIComponent(params.parse(params.get("hk.mobt.text"),"")||this.keyword);opts.hookMobtIcon=decodeURIComponent(params.get("hk.mobt.icon",""));opts.hookMobtIconWidth=params.get("hk.mobt.icon.width",def.iconWidth);opts.hookMobtColor=decodeURIComponent(params.get("hk.mobt.text.color",""));opts.hookMobtColorHover=decodeURIComponent(params.get("hk.mobt.h.text.color",""));$iTXT.ui.Mobt._delayOptions.call(this);},_delayOptions:function(){var opts=this.options;var params=this.ad.params;var def=$iTXT.ui.Mobt.defaults;var progBar=parseInt(params.get("lbox.bar.time",1500),10);var ad=this.ad;var ttd;opts.hookMobtOpenDelay=parseInt(params.get("hk.mobt.delay",def.openDelay),10);opts.hookMobtHideDelay=parseInt(params.get("hk.mobt.hide.delay",def.hideDelay),10);ttd=parseInt(params.get("tt.open.delay",params.get("ttd",100)),10);if(isNaN(opts.hookMobtOpenDelay)||opts.hookMobtOpenDelay<=0){opts.hookMobtOpenDelay=def.openDelay;}
if(isNaN(opts.hookMobtHideDelay)||opts.hookMobtHideDelay<=0){opts.hookMobtHideDelay=def.hideDelay;}
if(opts.hookMobtHideDelay<=progBar&&this.isVibrantView()&&(this.isLightbox(ad)||this.isMosaic(ad)||this.isStoryBoard(ad))){opts.hookMobtHideDelay=progBar+50;}
if(isNaN(ttd)){ttd=100;}else if(ttd>1000){ttd=750;}
if(opts.hookMobtOpenDelay>ttd){opts.hookMobtOpenDelay=(ttd-200)<0?def.openDelay:ttd-200;}},_mobtCoverOn:function(el){if(document.getElementById("cover_"+el.ad.did)){return;}
var offsets=el.getPosition();var topModifier=4;var leftModifier=el.options.hookMobtModern?-1:-2;var leftShift=parseInt(el.ad.params.get("hk.mobt.partnerleft",0),10);var topShift=parseInt(el.ad.params.get("hk.mobt.partnertop",0),10);var widther=8;var style=["position: absolute","top:"+(offsets.top-topModifier+topShift)+"px","left:"+((offsets.left-widther/2)+leftModifier+leftShift)+"px","width:"+(el.rootElement.itxtBounds().width)+"px","height:"+(el.rootElement.itxtBounds().height)+"px"];var hotdog=$iTXT.core.Builder.make("div",{"style":style.join(';')},[]);if(!el.options.hookMobtModern){hotdog.style.backgroundColor='transparent';hotdog.style.boxShadow='none';}
hotdog.id="cover_"+el.ad.did;hotdog.className="mobt_hook_cover";document.getElementById('itxtmobtholder').appendChild(hotdog);return hotdog;},preMobt:function(){var that=this,el;function getHookStyle(props){var util=$iTXT.core.Util,hk=that.rootElement,css={},i,n,val;for(i=0,n=props.length;i<n;i++){val=util.getStyle(hk,props[i][0],props[i][1]);if(val){css[props[i][0]]=val;}}
return css;}
if(!this.isImpetus){return;}
el=document.createElement('div');el.className=this.options.hookMobtModern?'mobt_premobt_modern':'mobt_premobt_legacy';for(var i=0,n=this.rootElement.childNodes.length;i<n;i++){var clone=this.rootElement.childNodes[i].cloneNode(true);el.appendChild(clone);}
if(this.options.hookMobtModern){var hookSpans=el.getElementsByTagName('span');var styleFromHook=getHookStyle([['font-family','fontFamily'],['font-size','fontSize'],['font-weight','fontWeight']]);styleFromHook=$iTXT.ui.HookHelper.getStyleStringFromObject(styleFromHook);for(i=0,n=hookSpans.length;i<n;i++){var style;style=hookSpans[i].style.cssText.toLowerCase();style=$iTXT.ui.HookHelper.getStyleObjectFromString(style);style['border-bottom-width']='0px!important';style['border-bottom-style']='none!important';style['border-bottom-color']='transparent!important';style['text-decoration']='none!important';style=$iTXT.ui.HookHelper.getStyleStringFromObject(style);hookSpans[i].style.cssText=style+';'+styleFromHook;}}
else{this.rootElement.style.visibility='hidden';}
if(this.mobtCover){this.mobtCover.appendChild(el);}
setTimeout(function(){el.className+=' animate';},20);},flipMobt:function(left,l_offset,t_offset){if(this.hasFlipped&&this.ad.params.get("js.autoplay",false)&&!this.ad.params.get("nott")){this.ad.params.set("nott",0,9999);return;}
this.hasFlipped=true;var that=this;var top_off=0;this.mobtCover=$iTXT.ui.Mobt._mobtCoverOn(this);this.preMobt();var leftShift=parseInt(this.ad.params.get("hk.mobt.partnerleft",0),10);var topShift=parseInt(this.ad.params.get("hk.mobt.partnertop",0),10);this.mobt.itxtSetStyle({left:Math.floor(left+leftShift)+"px"});this.mobt.firstChild.itxtSetStyle({left:l_offset+"px",top:(topShift+top_off)+"px",MozTransitionDelay:"250ms",MozTransform:"rotateX(0deg)",WebkitTransitionDelay:"250ms",WebkitTransform:"rotateX(0deg)",transitionDelay:"250ms",transform:"rotateX(0deg)"});return true;},legacyReveal:function(left,l_offset,t_offset){this.mobtCover=$iTXT.ui.Mobt._mobtCoverOn(this);this.preMobt();this.mobt.itxtSetStyle({left:(Math.floor(left)+l_offset)+"px"});this.mobt.firstChild.itxtSetStyle({top:t_offset+"px",marginTop:"-3px"});return true;},closeMobt:function(data){this.cancelScheduledClose();if(this.built&&this.mobt!==undefined){this.rootElement.style.visibility='visible';this.mobt.firstChild.itxtSetStyle({MozTransitionDelay:"0ms",MozTransform:"rotateX(-90deg)",WebkitTransitionDelay:"0ms",WebkitTransform:"rotateX(-90deg)",transitionDelay:"0ms",transform:"rotateX(-90deg)"});try{document.getElementById("cover_"+this.ad.did).parentNode.removeChild(document.getElementById("cover_"+this.ad.did));}catch(e){}
this.built=false;var that=this;setTimeout(function(){var dead_id=that.mobt.id;if(that.mobt&&that.mobt.parentNode){that.mobt.parentNode.removeChild(that.mobt);}},300);$iTXT.trigger("$iTXT:mobt:close",{data:{hook:this,ttWasOpen:data&&data.ttWasOpen}});}
return true;},_onHookIn:function(e){var that=this,b=$iTXT.core.Builder;if(!this.built){this.initMobt();}
var new_left=this.getPosition().left;var new_width=this.rootElement.itxtBounds().width;var off_setobj=this.rootElement;if(this.isWrapped()){for(var i in this.childSpans){var ins=$iTXT.core.Math.pointInside({l:this.childSpans[i].offsetLeft,t:this.childSpans[i].offsetTop,h:this.childSpans[i].offsetHeight,w:this.childSpans[i].offsetHeight},{x:e.clientX,y:e.clientY},50);if(ins){new_left=$iTXT.core.Util.getElementPosition(this.childSpans[i]).left;new_width=this.childSpans[i].itxtBounds().width;off_setobj=this.childSpans[i];}}}
var w_offset=(off_setobj.itxtBounds().width-this.mobt.firstChild.itxtBounds().width)/2;var h_offset;if(!this.options.hookMobtModern){h_offset=-3;var nodes=this.mobt.firstChild.children,begin=0,end=100;for(var k=0,ln=nodes.length;k<ln;k++){if(nodes[k].className==="mobt_sprite_left"){}
if(nodes[k].className==="mobt_sprite_right"){end=nodes[k].offsetLeft+nodes[k].offsetWidth;}}
w_offset=(off_setobj.itxtBounds().width-(end-begin))/2;}
if(off_setobj!==this.rootElement){h_offset=off_setobj.offsetTop-this.rootElement.offsetTop;var poses=$iTXT.core.Util.getElementPosition(off_setobj);if(poses.left-this.mobt.firstChild.itxtBounds().width<0){new_left=1;w_offset=2;}else if(document.body.offsetWidth>poses.left+new_width/2){new_left=document.body.offsetWidth;w_offset=-this.mobt.firstChild.itxtBounds().width;}}
this._closeMobt=$iTXT.ui.Mobt._closeMobt;if(!this.options.hookMobtModern){this.mobt.itxtSetStyle({'height':'30px','width':($iTXT.data.Dom.getElementsByClassName("mobt_sprite_middle",this.mobt)[0].offsetWidth+29)+'px'});}else{this.mobt.style.width=(this.mobt.firstChild.offsetWidth+w_offset)+"px";}
function reveal(){if(that.flipMobt(new_left,w_offset,h_offset)){$iTXT.trigger("$iTXT:mobt:open",{data:{hook:that}});}}
if(this.options.hookMobtOpenDelay){setTimeout(reveal,this.options.hookMobtOpenDelay);}else{reveal();}},_onHookOut:function(e){if(this.dontFireHookOut){return;}
var th=this;setTimeout(function(){$iTXT.trigger("$iTXT:mobt:ittc",e);},20);},_onMobtIn:function(e){this.cancelScheduledClose();var css={},opts=this.options,def=$iTXT.ui.Mobt.defaults;css.color=opts.hookMobtColorHover||def.colorHover;this.mobt.firstChild.itxtAddClass('hover');this.mobt.firstChild.itxtSetStyle(css);if(this.isVibrantView()&&this.ad.params.getBool("nott",false)&&this.isLightbox(this.ad)){var src=(e.target==this.hookIcon)?$iTXT.data.ClickSource.ICON:$iTXT.data.ClickSource.KEYWORD;$iTXT.fire("$iTXT:hook:click",{source:src,so:25,hookid:this.options.id,hook:this,advert:this.ad});}
if(this._launcher&&(!$iTXT.ui.tt.isOpen||$iTXT.ui.tt.currentAdvert.hook!==this)){setTimeout(this._launcher,60);}
$iTXT.ui.tt.cancelScheduledHide(this.ad);$iTXT.fire("$iTXT:mobt:in",{data:{hook:this}});},_onMobtOut:function(e){var css={},opts=this.options,def=$iTXT.ui.Mobt.defaults;css.color=opts.hookMobtColor||def.color;this.mobt.firstChild.itxtRemoveClass('hover');this.mobt.firstChild.itxtSetStyle(css);if($iTXT.ui.tt.currentAdvert){this._mouseOutFire(e);}
this.visited=false;if(this.ad.params.getBool('js.temp.mobt',true)){this._scheduleClose();}
$iTXT.fire("$iTXT:mobt:out",{data:{hook:this}});},_onHotdogIn:function(e){this.cancelScheduledClose();},_onHotdogOut:function(e){$iTXT.fire("$iTXT:mobt:out",{hook:this,src:"hotdog out"});var css={},opts=this.options,def=$iTXT.ui.Mobt.defaults;css.color=opts.hookMobtColor||def.color;this.mobt.firstChild.itxtRemoveClass('hover');this.mobt.firstChild.itxtSetStyle(css);},_onMobtClick:function(e){var src=(e.target==this.hookIcon)?$iTXT.data.ClickSource.ICON:$iTXT.data.ClickSource.KEYWORD;$iTXT.fire("$iTXT:hook:click",{source:src,so:25,hookid:this.options.id,hook:this,advert:this.ad});return false;},_ttCloseMobt:function(e){if(this.mobt!==undefined&&e.data.did!==this.ad.did){this.closeMobt(e);}},_ttCancelled:function(e){if(this.id===e.data.data.hook.id){this._scheduleClose();}},cancelScheduledClose:function(){if(this.mobt_close){clearTimeout(this.mobt_close);delete this.mobt_close;}},_scheduleClose:function(e){var fn=VM._.bind(this.closeMobt,this,e),delay=this.options.hookMobtHideDelay;this.cancelScheduledClose();this.mobt_close=setTimeout(fn,delay);},_ttMouseOut:function(){},_closeMobt:function(e){var that=this;if(this.mobt&&this.mobt.id&&this.built&&this.ad.did===$iTXT.ui.tt.currentAdvert.did){setTimeout(function(){that.closeMobt({ttWasOpen:true,id:that.id,source:"_close"});},60);}}};};$iTXT.js.loader["$iTXT.ui.MobtManager"]=true;$iTXT=$iTXT||{};$iTXT.ui.MobtManager_Load=function(){var holder;(function(hkManager){var hooks=hkManager.hooks;holder=$iTXT.core.Builder.make('div',{id:"itxtmobtholder"});holder.itxtSetStyle({position:"absolute",left:"0px",top:"0px"});holder.className="";document.body.appendChild(holder);$iTXT.addEvent(holder,'mouseover',function(e){var relatedTarget;if(!e)e=window.event;relatedTarget=e.relatedTarget?e.relatedTarget:e.fromElement;if(!holder.itxtContains(relatedTarget)){$iTXT.trigger('$iTXT:mobt:over',e);}});$iTXT.addEvent(holder,'mouseout',function(e){var relatedTarget;if(!e)e=window.event;relatedTarget=e.relatedTarget?e.relatedTarget:e.toElement;if(!holder.itxtContains(relatedTarget)){$iTXT.trigger('$iTXT:mobt:out',e);}});$iTXT.addEvent(holder,'mousedown',function(e){if(!e)e=window.event;$iTXT.trigger('$iTXT:mobt:click',e);});})($iTXT.ui.HookManager);$iTXT.ui.MobtManager={curMobt:null,infest:function(hook){var m=$iTXT.ui.Mobt,opts=hook.options,enabled=$iTXT.ui.MobtManager.isMobtEnabled(hook);if(!enabled||hook.initMobt==m.initMobt){return;}
hook.addMobtOptions=m.addMobtOptions;hook.initMobt=m.initMobt;hook.preMobt=m.preMobt;hook.flipMobt=m.flipMobt;hook.closeMobt=m.closeMobt;hook.hookIn=m._onHookIn;hook._scheduleClose=m._scheduleClose;hook.cancelScheduledClose=m.cancelScheduledClose;hook.addMobtOptions();if(!opts.hookMobtModern){var host=$iTXT.glob.params.get('tt.img.dir','//images.intellitxt.com/ast/tt/09/');hook.flipMobt=m.legacyReveal;var i=new Image();i.src=host+"mobt/mobt_sprites.png";}},isMobtEnabled:function(hook){var paramValue,campaignEnabled,channelEnabled;var isMobile=$iTXT.core.Browser.isTargetedSmartphone($iTXT.glob.params.getBool("tt.force.mobile",false));var allowMobile=$iTXT.glob.params.getBool("ui.mobt.mobile",false);if(isMobile&&!allowMobile){return false;}
if(hook.ad.getAdvertType()===0){return false;}
if(hook.ad.params.getBool("lbox.bar",false)&&'classic'==($iTXT.glob.params.get('ui.set.progressbar',$iTXT.glob.params.get('ui.set','classic')).toLowerCase())){return false;}
paramValue=$iTXT.glob.params.getBool("ui.mobt");if(false===paramValue){channelEnabled=0;}
else if(true===paramValue){channelEnabled=1;}
else{channelEnabled=-1;}
paramValue=hook.ad.params.getBool("hk.mobt");if(true===paramValue){campaignEnabled=1;}
else if(false===paramValue){campaignEnabled=0;}
else{campaignEnabled=-1;}
if(campaignEnabled==1&&channelEnabled!==0){return true;}
if(campaignEnabled==-1&&channelEnabled==1){return true;}
return false;},_setCurMobt:function(mobt){var that=$iTXT.ui.MobtManager;if(that.curMobt&&that.curMobt.ad.did!=mobt.ad.did){that.curMobt.closeMobt();that.curMobt=mobt;}else if(!that.curMobt){that.curMobt=mobt;}},_mobtOpen:function(e){var that=$iTXT.ui.MobtManager;that._setCurMobt(e.data.hook);that.curMobt.timeOpen=$iTXT.core.Util.ts();$iTXT.data.al.logAV(that.curMobt.ad,$iTXT.data.AdViewValue.ADVIEW_MOBT_OPEN,0,{});},_mobtClose:function(e){var that=$iTXT.ui.MobtManager,curMobt=that.curMobt,mtrData;if(curMobt&&curMobt.ad.did===e.data.hook.ad.did){curMobt.timeClose=$iTXT.core.Util.ts();mtrData={advert:curMobt.ad,mt:125,mv:e.data.ttWasOpen?'1':'0',mv2:curMobt.timeClose-curMobt.timeOpen};$iTXT.fire("$iTXT:data:log:monitor",mtrData);}
that.curMobt=null;},_mobtIn:function(e){var that=$iTXT.ui.MobtManager;that._setCurMobt(e.data.hook);}};$iTXT.subscribe("$iTXT:tt:lightbox:close",function(){var curMobt=$iTXT.ui.MobtManager.curMobt;if(curMobt){curMobt.closeMobt({ttWasOpen:true});}});$iTXT.subscribe('$iTXT:tt:mouse:over',function(){var curMobt=$iTXT.ui.MobtManager.curMobt;if(curMobt){curMobt.cancelScheduledClose();}});$iTXT.on('$iTXT:mobt:open',function(e){this._mobtOpen(e);this.curMobt._scheduleClose(e);this.curMobt.dontFireHookOut=true;},$iTXT.ui.MobtManager);$iTXT.on('$iTXT:mobt:close',function(e){var hook=e.data.hook;hook.dontFireHookOut=false;this._mobtClose(e);},$iTXT.ui.MobtManager);$iTXT.on('$iTXT:mobt:over',function(e){var did=holder.getAttribute('data-did');var hook=$iTXT.ui.HookManager.getHookByDetailId(did);e.data={};e.data.hook=hook;$iTXT.ui.MobtManager._setCurMobt(hook);$iTXT.ui.Mobt._onMobtIn.call(hook,e);});$iTXT.on('$iTXT:mobt:out',function(e){var did=holder.getAttribute('data-did');var hook=$iTXT.ui.HookManager.getHookByDetailId(did);e.data={};e.data.hook=hook;$iTXT.ui.Mobt._onMobtOut.call(hook,e);});$iTXT.on('$iTXT:mobt:click',function(e){var did=holder.getAttribute('data-did');var hook=$iTXT.ui.HookManager.getHookByDetailId(did);e.data={};e.data.hook=hook;$iTXT.ui.Mobt._onMobtClick.call(hook,e);});};$iTXT.js.loader["$iTXT.ui.OldTooltipHeader"]=true;$iTXT.ui.OldTooltipHeader_Load=function(){var undefined;var $iUtil=$iTXT.core.Util;$iTXT.ui.OldTooltipHeader=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{options:null,closeBtn:null,whatBtn:null,vmLogo:null,privIconBtn:null,privIconLnk:null,containers:{rootElement:[],buttons:[],topLeftDiv:[]},init:function(_options,$super)
{this.componentParams=$iTXT.core.Util.extend({'hdr.wt.alt':'${swti}','hdr.close.alt':'${scls}','hdr.img.dir':'//images.intellitxt.com/ast/tt/09/','hdr.brand':'','hdr.brand.txt':'','hdr.txt':'${SSPL}','hdr.logo.name':'vm_logo2009.gif','hdr.logo':"${hdr.img.dir}${hdr.logo.name}",'hdr.logo.width':'66','hdr.logo.height':'19','hdr.close.on.name':'close_on.gif','hdr.close.on':"${hdr.img.dir}${hdr.close.on.name}",'hdr.close.off.name':'close_off.gif','hdr.close.off':"${hdr.img.dir}${hdr.close.off.name}",'hdr.close.width':'19','hdr.close.height':'19','hdr.what.on.name':'what_on.gif','hdr.what.on':"${hdr.img.dir}${hdr.what.on.name}",'hdr.what.off.name':'what_off.gif','hdr.what.off':"${hdr.img.dir}${hdr.what.off.name}",'hdr.what.width':'19','hdr.what.height':'19','hdr.privacyicon.txt':'${trans.privacyicon.txt}','hdr.privacyicon.on.name':'ad_choices_on.png','hdr.privacyicon.src.on':"${hdr.img.dir}${hdr.privacyicon.on.name}",'hdr.privacyicon.off.name':'ad_choices_off.png','hdr.privacyicon.src.off':"${hdr.img.dir}${hdr.privacyicon.off.name}",'hdr.privacyicon.width':'19','hdr.privacyicon.height':'19','hdr.privacyicon.style':'','hdr.privacyicon.hover':''},this.componentParams);var gp=$iTXT.glob.params;var defOpts=$iTXT.core.Util.extend({id:"itxtheader",height:21,margins:[6,4,2,2,1,1],defbgcol:"#FDFEFF$$#F6F6F6$$#F4F4F4$$#F1F0F0$$#EEEDEE$$#ECECEC$$#EBEBEA$$#EBEBEB$$#EBEBEB$$#E7E7E6$$#CFCFCF$$#D1D1D2$$#D3D3D3$$#D8D7D5$$#DDDDD9$$#E1E0D9$$#E5E4DB$$#E9E9DC$$#EBEBDC$$#EDECDD$$#E4E4E4",hdrTxt:"${hdr.txt}",whtTxt:"${hdr.wt.alt}",privIconTxt:"${hdr.privacyicon.txt}",clsTxt:"${hdr.close.alt}",vmLogoSrc:"${hdr.logo}",vmLogoWidth:"${hdr.logo.width}",vmLogoHeight:"${hdr.logo.height}",clsSrcOn:"${hdr.close.on}",clsSrc:"${hdr.close.off}",clsWidth:"${hdr.close.width}",clsHeight:"${hdr.close.height}",whtSrcOn:"${hdr.what.on}",whtSrc:"${hdr.what.off}",whtWidth:"${hdr.what.width}",whtHeight:"${hdr.what.height}",privIconSrcOnDef:"${hdr.privacyicon.src.on}",privIconSrcDef:"${hdr.privacyicon.src.off}",privIconSrcOn:gp.parse("${hdr.privacyicon.src.on.${cc}}"),privIconSrc:gp.parse("${hdr.privacyicon.src.off.${cc}}"),privIconWidth:"${hdr.privacyicon.width}",privIconHeight:"${hdr.privacyicon.height}",privIconSrcStyle:"${hdr.privacyicon.style}",privIconSrcHover:"${hdr.privacyicon.hover}",topLeftDivContainer:this.containers.rootElement,logoContainer:this.containers.buttons,customLogoContainer:this.containers.rootElement,headerTextContainer:this.containers.topLeftDiv,privacyIconContainer:this.containers.buttons,whatsThisButtonContainer:null,adChoicesButtonContainer:null,custLogoSrc:"${hdr.brand}",custLogoTxt:"${hdr.brand.txt}"},_options);$super(defOpts);var o=this.options;$iTXT.core.Util.cacheImages([o.vmLogoSrc,o.clsSrcOn,o.clsSrc,o.whtSrcOn,o.whtSrc]);this.options.bgcolours=$iTXT.core.Util.parseColorArray(this.options.defbgcol,this.options.height,"$$");this.height=this.options.height;this.rootElement.itxtBatchSubscribe([["mouseover",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:over",e);}],["mouseout",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:out",e);}]],this.evtDspFuncs);},setSize:function(w,h,$super)
{$super(w,this.options.height);},build:function()
{var b=$iTXT.core.Builder;var t=this;this.rootElement.ondragstart=function(){return false;};this.rootElement.onselectstart=function(){return false;};if(!this.options.draggable)
{this.rootElement.className="fixed";}
this.buildLogo();this.buildHeaderText();this.buildPrivacyButton();this.buildCloseButton();if(this.options.custLogoSrc)
{this._showCustomLogo();}
else
{this._hideCustomLogo();}
this.buildTopLeftDiv();this.rootElement.appendChild(b.make("DIV",{className:"itxttrc"},this.containers.buttons));this.containers.buttons.length=0;for(var i=0;i<this.containers.rootElement.length;i++)
{this.rootElement.appendChild(this.containers.rootElement[i]);}
this.containers.rootElement.length=0;var cornerNodes=[];for(var i=0;i<this.options.height;i++)
{var bgcol=this.options.bgcolours[i]||"black";cornerNodes.push(this._createDiv(this.options.margins[i],this.options.margins[i],bgcol));}
this.cornerHolder=$iTXT.core.Builder.make("DIV",{className:"itxtcrnhldr"},cornerNodes);this.rootElement.appendChild(this.cornerHolder);this.rootElement.itxtSubscribe("mousedown",$iTXT.core.Event.bind(this,this._hdrDown));this.rootElement.itxtSubscribe("mouseup",$iTXT.core.Event.bind(this,this._hdrUp));},buildLogo:function()
{var t=this;this.vmLogo=$iTXT.core.Builder.make("APNG",{className:"itxtvmlogo",src:this.options.vmLogoSrc,width:this.options.vmLogoWidth,height:this.options.vmLogoHeight});this.vmLogo.ondragstart=function(){return false;};this.vmLogo.itxtSubscribe("mousedown",function(e){$iTXT.core.Event.preventDefault(e);});this.vmLogo.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._vmLogoBtnClk));this.vmLogoWrapper=$iTXT.core.Builder.make("A",{target:'_blank'},[this.vmLogo]);this.options.logoContainer.push(this.vmLogoWrapper);},buildHeaderText:function()
{this.hdrTxtCont=$iTXT.core.Builder.make("DIV",{className:"itxtadv"},[this.options.hdrTxt]);this.options.headerTextContainer.push(this.hdrTxtCont);},buildTopLeftDiv:function()
{this.topLeftDiv=$iTXT.core.Builder.make("DIV",{className:"itxttlc"},this.containers.topLeftDiv);this.containers.topLeftDiv.length=0;this.containers.rootElement.push(this.topLeftDiv);if(this.options.hdrTxt=='')
{this.topLeftDiv.itxtHide();}},buildCloseButton:function()
{var t=this;this.closeBtn=$iTXT.core.Builder.make("APNG",{className:"itxtclose",src:this.options.clsSrc,width:this.options.clsWidth,height:this.options.clsHeight,alt:this.options.clsTxt,title:this.options.clsTxt});this.closeBtn.itxtSubscribe("mouseover",function(){t.closeBtn.src=t.options.clsSrcOn;});this.closeBtn.itxtSubscribe("mouseout",function(){t.closeBtn.src=t.options.clsSrc;});this.closeBtn.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._closeBtnClk));this.containers.buttons.push(this.closeBtn);},buildPrivacyButton:function()
{this.options.privIconMode=parseInt(this.params.get(this.params.parse("hdr.privacyicon.mode.${cc}"),$iTXT.ui.privacyIconAlign.ICON_ONLY));var allowedRegions=this.params.get("tt.privacyicon.regions","").toLowerCase().split(','),countryCode=this.params.get("cc","en").toLowerCase(),button;if(($iTXT.core.Util.inArray(allowedRegions,'all')||$iTXT.core.Util.inArray(allowedRegions,countryCode))&&this.options.privIconMode>0)
{button=this.buildAdChoicesLink();}
else
{button=this.buildWhatsThisButton();}
this.options.privacyIconContainer.push(button);},buildAdChoicesLink:function()
{var t=this,builder=$iTXT.core.Builder;if(this.options.privIconMode!=$iTXT.ui.privacyIconAlign.TEXT_ONLY)
{this.privIconBtn=builder.make("APNG",{className:"itxtprivacyicon",src:this.options.privIconSrcDef,width:this.options.privIconWidth,height:this.options.privIconHeight,alt:this.options.privIconTxt,title:this.options.privIconTxt});this.privIconBtn.itxtBatchSubscribe([["mouseover",function(){t._changePrivateIcon(true);}],["mouseout",function(){t._changePrivateIcon(false);}],["click",function(){t._onPrivacyIconClick();}]],this.evtDspFuncs);}
if(this.options.privIconMode!=$iTXT.ui.privacyIconAlign.ICON_ONLY)
{this.privIconLnk=builder.make("div",{className:"itxtprivacyicontxt",title:this.options.privIconTxt,style:this.options.privIconSrcStyle},[this.params.parse(this.options.privIconTxt)]);if(''!=this.options.privIconSrcStyle&&''!=this.options.privIconSrcHover)
{this.privIconLnk.itxtSubscribe("mouseover",function(){t.privIconLnk.style.cssText=t.options.privIconSrcHover;});this.privIconLnk.itxtSubscribe("mouseout",function(){t.privIconLnk.style.cssText=t.options.privIconSrcStyle;});}}
var privIconElems=[];switch(this.options.privIconMode)
{case $iTXT.ui.privacyIconAlign.ICON_ONLY:privIconElems.push(this.privIconBtn);break;case $iTXT.ui.privacyIconAlign.ICON_LEFT:privIconElems.push(this.privIconBtn);privIconElems.push(this.privIconLnk);break;case $iTXT.ui.privacyIconAlignn.ICON_RIGHT:privIconElems.push(this.privIconLnk);privIconElems.push(this.privIconBtn);break;case $iTXT.ui.privacyIconAlign.TEXT_ONLY:privIconElems.push(this.privIconLnk);break;}
if(this.options.adChoicesButtonContainer)
{this.options.privacyIconContainer=this.options.adChoicesButtonContainer;}
return this.privIconWrapper=builder.make("A",{target:'_blank',className:"itxtprivacyicon"},privIconElems);},buildWhatsThisButton:function()
{var t=this,builder=$iTXT.core.Builder;this.whatBtn=builder.make("APNG",{className:"itxtwhat",src:this.options.whtSrc,width:this.options.whtWidth,height:this.options.whtHeight,alt:this.options.whtTxt,title:this.options.whtTxt});this.whatBtn.itxtSubscribe("mouseover",function(){t.whatBtn.src=t.options.whtSrcOn;});this.whatBtn.itxtSubscribe("mouseout",function(){t.whatBtn.src=t.options.whtSrc;});this.whatBtn.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._whatBtnClk));if(this.options.whatsThisButtonContainer)
{this.options.privacyIconContainer=this.options.whatsThisButtonContainer;}
return this.whatBtnWrapper=builder.make("A",{target:'_blank',style:this.options.whatButtonStyle||''},[this.whatBtn]);},_changePrivateIcon:function(isOver)
{if($iTXT.glob.params.containsTokens(this.options.privIconSrc))
{this.privIconBtn.src=isOver?this.options.privIconSrcOnDef:this.options.privIconSrcDef;}
else
{this.privIconBtn.src=isOver?this.options.privIconSrcOn:this.options.privIconSrc;}},_onPrivacyIconClick:function()
{var opts={mt:124,mv:this.advert.params.get("A.AT"),ipid:this.advert.params.get("IPID")};$iTXT.fire("$iTXT:data:log:monitor",opts);},_createCustomLogo:function()
{if(!this.customLogo)
{this.customLogo=$iTXT.core.Builder.make("APNG",{className:"itxtcustlogo",style:"display:none",src:this.options.custLogoSrc,alt:this.options.custLogoTxt,title:this.options.custLogoTxt});this.options.customLogoContainer.push(this.customLogo);this.customLogo.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._customLogoBtnClk));}},_showCustomLogo:function()
{this._createCustomLogo();this.customLogo.itxtShow();},_hideCustomLogo:function()
{if(this.customLogo)
{this.customLogo.itxtHide();}},_createDiv:function(lm,rm,bgcol)
{return $iTXT.core.Builder.make("DIV",{className:"itxtcrn",style:"background-color: "+(bgcol||this.options.bgcol)+"; margin-left: "+(lm||0)+"px; margin-right:"+(rm||0)+"px;"});},_hdrDown:function(e)
{if(this._hdrTarget(e.target))
{$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:down",e);}},_hdrUp:function(e)
{if(this._hdrTarget(e.target))
{$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:up",e);}},_hdrTarget:function(t)
{return((t!=this.closeBtn)&&(t!=this.whatBtn)&&(t!=this.vmLogo));},_closeBtnClk:function(e)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:close:btn:click");},_whatBtnClk:function(e)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:what:btn:click");},_vmLogoBtnClk:function()
{$iTXT.core.$(document).itxtFire("$iTXT:tt:vmlogo:click");},_customLogoBtnClk:function()
{$iTXT.core.$(document).itxtFire("$iTXT:tt:logo:click");},setAdvert:function(ad,$super)
{if(this.advert==ad)
return;var adopts=ad.params;var tmpl=ad.getTemplate();var tmplopts=(null!=tmpl)?(tmpl.options||{}):{};$super(ad);var wtUrl=this.advert.params.parse("${tt.wturl}");var privIconUrl=adopts.parse(this.advert.params.get(adopts.parse("tt.privacyicon.url.${cc}"),wtUrl));this.advert.params.set('tt.privacyicon.url',privIconUrl,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);var logoAT=ad.params.get("hdr.logo"+ad.getAdvertType());if(null!=logoAT&&""!=logoAT)
{this.options.vmLogoSrc=logoAT;}
if(this.vmLogo)
{this.vmLogo.itxtChangeSrc(this.options.vmLogoSrc);if(""==this.options.vmLogoSrc)
{this.vmLogo.itxtHide();}
else
{this.vmLogo.itxtShow();this.vmLogoWrapper.href=wtUrl;}}
if(this.hdrTxtCont)
{this.hdrTxtCont.innerHTML=this.options.hdrTxt;var hdts=this.advert.params.get("hdr.txt.style");if(hdts)
{this.hdrTxtCont.itxtSetStyle(hdts);}}
if(this.closeBtn)
{this.closeBtn.alt=this.closeBtn.title=$iUtil.decodeHtmlEntities(this.options.clsTxt);this.closeBtn.itxtChangeSrc(this.options.clsSrc);if(""==this.options.clsSrc)
{this.closeBtn.itxtHide();}
else
{this.closeBtn.itxtShow();}}
if(this.whatBtn)
{this.whatBtn.alt=this.whatBtn.title=$iUtil.decodeHtmlEntities(this.options.whtTxt);this.whatBtn.itxtChangeSrc(this.options.whtSrc);if(""==this.options.whtSrc)
{this.whatBtn.itxtHide();}
else
{this.whatBtn.itxtShow();this.whatBtnWrapper.href=wtUrl;}}
if(this.privIconWrapper)
{if(this.privIconBtn)
{this.privIconBtn.alt=this.privIconBtn.title=$iUtil.decodeHtmlEntities(this.options.privIconTxt);this._changePrivateIcon(false);}
if(this.privIconLnk)
{var acts=this.advert.params.get("hdr.privacyicon.style");if(acts)
{this.privIconLnk.itxtSetStyle(acts);}}
if(""==this.options.privIconSrc)
{if(this.privIconBtn)
{this.privIconBtn.itxtHide();}
if(this.privIconLnk)
{this.privIconLnk.itxtHide();}}
else
{if(this.privIconBtn)
{this.privIconBtn.itxtShow();}
if(this.privIconLnk)
{this.privIconLnk.itxtShow();}
this.privIconWrapper.href=privIconUrl;}
this.advert.params.set("tt.privacyicon",true,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}
else
{this.advert.params.set("tt.privacyicon",false,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}
if(""!=this.options.custLogoSrc)
{this._createCustomLogo();this.customLogo.itxtShow();this.customLogo.alt=this.customLogo.title=$iUtil.decodeHtmlEntities(this.options.custLogoTxt);this.customLogo.itxtChangeSrc(this.options.custLogoSrc);}
else if(this.customLogo)
{if(this.customLogo)
{this.customLogo.itxtHide();}}
if(this.topLeftDiv)
{if(""==this.options.hdrTxt)
{this.topLeftDiv.itxtHide();}
else
{this.topLeftDiv.itxtShow();}}
this.options.bgcolours=$iTXT.core.Util.parseColorArray(tmplopts.tthdrcol||adopts.get("tt.hdr.col",this.options.defbgcol),this.options.height,"$$");this._ubg();},_ubg:function(c)
{var bgCol=this.options.bgcolours;for(var i=0;i<this.cornerHolder.childNodes.length;i++)
{this.cornerHolder.childNodes[i].itxtSetStyle({backgroundColor:(bgCol[i]||'#ffffff')});}}});};$iTXT.js.loader["$iTXT.ui.Tooltip"]=true;$iTXT.ui.Tooltip_Load=function(){var undefined;$iTXT.ui.TooltipPosition={AR:"AR",AL:"AL",BR:"BR",BL:"BL"};$iTXT.ui.SnapMode={Mouse:1,Text:0};$iTXT.ui.Tooltip=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{options:null,currentHook:null,currentHookBB:null,hideTID:-1,openTID:-1,lastDID:-1,isOpen:false,fixedOpen:false,openTS:null,hdrDown:false,hdrDownX:0,hdrDownY:0,loading:false,isMouseOver:false,mouseOutTID:-1,mouseOverTS:null,defaultBgCol:"#f3f3f3",defaultHoverBgCol:"#f6f6f6",defaultImageDirectory:'//images.intellitxt.com/ast/tt/09/',mouseOutLogged:false,interactionLatch:false,timeouts:[],prefadeKiller:null,hasClosed:false,fadeInit:1,init:function(_options,$super)
{$iTXT.glob.dbParams.set('tt.img.dir',this.defaultImageDirectory,$iTXT.cnst.WEIGHTING_DEFAULT_DEFAULT);var rootsub,rootevents,docsub,docevs,evt=$iTXT.core.Event,defOpts=$iTXT.core.Util.extend({id:"itxttt",ps:$iTXT.ui.TooltipPosition.AR,bgcol:"#ececec",hbgcol:'#f6f6f6',ftrbgcol:'#f3f3f3',tailbgcol:'#f3f3f3',minShowTime:0,tthd:1500,mintthd:0,openDelay:100,draggable:true,invisible:false},_options);this.zindex=9910000;$super(defOpts);this.rootElement.style.zIndex=this.zindex;rootsub=$iTXT.core.Dom.router(this);rootevents=[["mouseover","_onMouseOver"],["mouseout","_onMouseOut"],["mouseup","_onMouseDownUp"],["mousedown","_onMouseDownUp"],["contextmenu","_onMouseDownUp"]];this.rootElement.itxtBatchSubscribe(rootsub(rootevents),this.evtDspFuncs);$iTXT.core.$(document.body).itxtBatchSubscribe([["mouseover",$iTXT.core.Event.bind(this,this._bodyOver)],["mouseup",$iTXT.core.Event.bind(this,this._hdrUp)]],this.evtDspFuncs);docsub=$iTXT.core.Dom.router(this);docevs=[["mousemove","_onBodyMouseMove"],["$iTXT:tt:close","close"],["$iTXT:tt:expand","_expand"],["$iTXT:hook:over","_hookOver"],["$iTXT:hook:in","_hookIn"],["$iTXT:hook:out","_hookOut"],["$iTXT:hook:click","_hookClick"],["$iTXT:tt:hdr:mouse:down","_hdrDown"],["$iTXT:tt:hdr:mouse:up","_hdrUp"],["$iTXT:tt:open","_decorateOnTTOpen"],["$iTXT:tt:content:loaded","_resizeOnTTOpenFreeform"],["$iTXT:tt:mouse:over","_latchExpand"],["$iTXT:tt:resize","_resizeTooltip"],["$iTXT:tt:set:fixed:open","_setFixedOpen"],["$iTXT:tt:over","_ttOver"],["$iTXT:tt:out","_ttOut"],["$iTXT:tt:content:change:ad","_changeAdvert"],["$iTXT:tt:content:loaded","_contentLoaded"],["$iTXT:tt:expand","_resizeOnExpand"],["$iTXT:function:mvuExpand","_mvuExpand"],["$iTXT:function:fExp","_fExp"],["$iTXT:function:fClick","_fClick"],["$iTXT:tt:iframe:out","_iframeOut"],["$iTXT:tt:global:set:bgcol","_setBGCol"],["$iTXT:tt:global:set:hvcol","_setHVCol"]];$iTXT.core.$(document).itxtBatchSubscribe(docsub(docevs),this.evtDspFuncs);$iTXT.on('$iTXT:mobt:over',this._mobtIn,this);$iTXT.on('$iTXT:mobt:out',this._clearLaunch,this);$iTXT.on('$iTXT:mobt:ittc',this._clearLaunch,this);$iTXT.on('$iTXT:mobt:close',this.close,this);this.hide();},build:function()
{this.chrome=new $iTXT.ui.TooltipChrome({ps:this.options.ps,bgcol:this.options.bgcol,draggable:this.options.draggable});this.chrome.build(this.options.bgcol);this.addChild(this.chrome);this.content=new $iTXT.ui.TooltipContent({ps:this.options.ps,bgcol:this.options.bgcol});this.chrome.rootElement.appendChild(this.content.rootElement);},setPositionState:function(ps)
{if(ps)
{this.ps=ps;this.chrome.setPositionState(ps);}},setSize:function(w,h,resizeContent,$super)
{this.chrome.setPosition(0,0);if(resizeContent)
{this.content.resize(null,null,false);}
var contentW=this.content.getWidth();var contentH=this.content.getHeight();this.chrome.setSize(contentW,contentH-this.content.heightOverlap,this.content.heightOverlap);var contentOff=this.chrome.getContentOffset();this.content.setPosition(contentOff[0],contentOff[1]);var thisHeight=Math.max(0,this.chrome.getOverlappedHeight());$super(contentW,thisHeight);},open:function(l,t,state)
{this.left=l;this.top=t;this.hasClosed=false;this._stripClass("itxtsemi");this._stripClass("itxtfade");this._stripClass("itxtsnapback");$iTXT.core.$(document).itxtFire("$iTXT:tt:before:open");this.hide();this.setPositionState(state);this.rootElement.itxtRemoveClass("minimise");this.setPosition(l,t);this.setSize(null,null,false);if(!this.options.invisible){this.show();this.prepFade();var m=this;this._stickClass("itxtprefade");if($iTXT.ui.tt.ps.charAt(0)==="A"){this._stickClass("itxtfadeabove");}else{this._stickClass("itxtfadebelow");}
setTimeout(function(){m._stripClass(["itxtprefade","itxtfadeabove","itxtfadebelow"]);},200);}else{}
$iTXT.core.$(document).itxtFire("$iTXT:tt:after:open");if(!this.options.invisible)
{this.isOpen=true;}
this.openTS=(new Date()).getTime();},_storeTO:function(to_name,id){if(this.timeouts[to_name]){clearTimeout(this.timeouts[to_name]);}
this.timeouts[to_name]=id;},_clearTO:function(to_name){clearTimeout(this.timeouts[to_name]);},_clearAllTOs:function(){for(var i in this.timeouts){clearTimeout(this.timeouts[i]);}
this.timeouts=[];},_stripClass:function(klas){var r;if(typeof klas==="string"){r=new RegExp("."+klas+"\\b","g");document.getElementById('itxtchrome').className=document.getElementById('itxtchrome').className.replace(r,"");}else{for(var y=0;y<klas.length;y++){r=new RegExp("."+klas[y]+"\\b","g");document.getElementById('itxtchrome').className=document.getElementById('itxtchrome').className.replace(r,"");}}},_stickClass:function(klas){function add_class(k){if(document.getElementById('itxtchrome').className.indexOf(k)===-1){document.getElementById('itxtchrome').className+=" "+k;}}
if(typeof klas==="string"){add_class(klas);}else{for(var y=0;y<klas.length;y++){add_class(klas[y]);}}},classicClose:function(){this.hasClosed=true;ttOff=this.rootElement.itxtTotalOffset();dX=(this.currentHookBB.left-ttOff.left)+(this.currentHookBB.width/2);dY=this.currentHookBB.top-ttOff.top;this.rootElement.itxtAddClass("minimise");this.content.hide();this.chrome.hide();t=this;combOpts={start:true,duration:150,effects:[new $iTXT.fx.Move({target:this.rootElement,dX:dX,dY:dY}),new $iTXT.fx.Size({target:this.rootElement,width:5,height:5})],afterFinish:function()
{t.hideTooltip();$iTXT.core.$(document).itxtFire("$iTXT:tt:after:minimise");}};$iTXT.core.$(document).itxtFire("$iTXT:tt:before:minimise");new $iTXT.fx.Combination(combOpts);},prepFade:function(){if(document.getElementById('itxtfadecss')){return;}
function fmt(opts){var css=[];VM._.forEach(opts,function(it){var moz=(typeof it.value==="string")?it.value.replace("{{pfx}}","-moz-"):it.value;var wk=(typeof it.value==="string")?it.value.replace("{{pfx}}","-webkit-"):it.value;var vanilla=(typeof it.value==="string")?it.value.replace("{{pfx}}",""):it.value;css.push("-moz-"+it.cssname+": "+moz+";\n"+"-webkit-"+it.cssname+": "+wk+";\n"+
it.cssname+": "+vanilla+";\n");});return css.join("");}
var css=$iTXT.core.Css,dom=$iTXT.core.Dom,pram=this.currentAdvert.params,opts,duration=pram.get("fade.out.time",150),origin,de_stijl,style_el;if($iTXT.ui.tt.ps.charAt(0)==="A"){origin=pram.get("fade.out.x",50)+"% "+pram.get("fade.out.y",100)+"%";}else{origin=pram.get("fade.out.x",50)+"% "+pram.get("fade.out.y",0)+"%";}
opts=[{"cssname":"transition-property","value":pram.get("fade.out.property","opacity, {{pfx}}transform")},{"cssname":"transition-duration","value":duration+"ms"},{"cssname":"transform-origin","value":origin},{"cssname":"transition-timing-function","value":pram.get("fade.out.transition","linear")},{"cssname":"transform","value":"scale3d("+pram.get("fade.out.scale",0.9)+", "+pram.get("fade.out.scale",0.9)+", 1.0)"}];de_stijl=[];de_stijl.push(".itxtfade { \n");de_stijl.push(fmt(opts));de_stijl.push("opacity: "+pram.get("fade.out.opacity",0.5)+";\n");de_stijl.push("}\n");de_stijl.push(".itxtsemi {\n");de_stijl.push("opacity: "+pram.get("fade.out.prefade.opacity",0.9));de_stijl.push(";\n");de_stijl.push(fmt([{"cssname":"transition","value":"opacity "+pram.get("fade.out.prefade.time",1000)+"ms ease-out"}]));de_stijl.push("}\n");de_stijl.push(".itxtsnapback {\n");de_stijl.push("opacity: 1");de_stijl.push(";\n");de_stijl.push(fmt([{"cssname":"transition","value":"opacity "+pram.get("fade.out.snapback.time",80)+"ms ease-in"}]));de_stijl.push("}\n");style_el=document.createElement("style");style_el.id="itxtfadecss";style_el.type="text/css";style_el.innerHTML=de_stijl.join("");document.getElementsByTagName("body")[0].appendChild(style_el);},fadeClose:function(){var t=this,saved_class=document.getElementById('itxtchrome').className,old_did=this.currentAdvert?this.currentAdvert.did:0;this._stripClass("itxtsnapback");this._stickClass("itxtfade");saved_class=saved_class.replace(/.itxtfade/g,"");this.hasClosed=true;setTimeout(function(){if(old_did!==$iTXT.ui.tt.currentAdvert.did)return;t.hide();t.hideTooltip();if(document.getElementById('itxtfadecss')){var st_el=document.getElementById('itxtfadecss');st_el.parentNode.removeChild(st_el);}
document.getElementById('itxtchrome').className=saved_class;},this.currentAdvert.params.get("fade.out.time",150));},legacyFadeClose:function(){var t=this,old_did=this.currentAdvert?this.currentAdvert.did:0;this.hasClosed=true;var dur=this.currentAdvert.params.get("fade.out.time",150);var hide=function(){if(old_did!==$iTXT.ui.tt.currentAdvert.did)return;t.hide();t.hideTooltip();};var from=1;if(this.currentAdvert.params.getBool("fade.out.prefade.on",true)){from=parseFloat(this.currentAdvert.params.get("fade.out.prefade.opacity",0.9));}
$iTXT.fx2.Fade2.fade('CLOSE','itxtchrome',dur,{fadein:false,reset:true,onend:hide,from:from,to:0});},close:function(e){var ttOff,dX,dY,t,combOpts,opts=e.data||{};this.interactionLatch=false;$iTXT.core.$(document).itxtFire("$iTXT:tt:before:close");if(this.currentHookBB!==null&&opts.closeSource!=$iTXT.data.TTCloseSource.OVERNEWHOOK){this.fadeClose();}else{this.hideTooltip();}},hideTooltip:function()
{if(this.hideTID!=-1&&(this.currentAdvert.did!==this.lastDID||!this.currentAdvert)){window.clearTimeout(this.hideTID);this.hideTID=-1;this.lastDID=this.currentAdvert.did;}
this.hide();this.rootElement.itxtSetStyle({left:"-1000px",top:"-1000px",width:"300px",height:"300px"});this.isOpen=false;this.fixedOpen=false;this.openTS=null;this.isMouseOver=false;if(this.content.advert)
{this.content.advert.template.isMouseOver=false;}
if(this.currentHook!==null)
{this.currentHook.setState(false);this.currentHook=null;this.currentHookBB=null;}
$iTXT.core.$(document).itxtFire("$iTXT:tt:after:close");this.content.afterClose();},queueHide:function(t)
{if(this.isMouseOver)
{return;}
if(this.currentAdvert&&this.currentAdvert.params&&this.currentAdvert.params.get("tt.disable.hide"))
{return;}
if(!this.fixedOpen)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:queue:hide");var toAdjustment=0;if(this.options.mintthd>0)
{var timeOpenFor=this.openTS?(new Date()).getTime()-this.openTS:0;var timeLeft=this.options.mintthd-timeOpenFor;if(timeLeft>0)
{toAdjustment=timeLeft;}}
var hideTO=parseInt(this.options.tthd,10)+toAdjustment;if(this.openTS!==null)
{var tSO=((new Date()).getTime()-this.openTS);hideTO+=Math.max(this.options.minShowTime-tSO,0);}
this.fadeQueue(t,hideTO);}},fadeQueue:function(t,hideTO){function createTimeout(th,tag,func,timer){th._storeTO(tag,setTimeout(func,timer));}
var me=this;function close_tt(){if(!me.isMouseOver&&!me.fixedOpen){me._stripClass(["itxtsemi","itxtsnapback"]);if(!me.hasClosed){$iTXT.core.$(document).itxtFire("$iTXT:tt:close",{closeSource:$iTXT.data.TTCloseSource.MOUSEOUT});}}}
function prefader(){if(!me.isMouseOver&&!me.fixedOpen){me._stripClass("itxtsnapback");me._stickClass("itxtsemi");if(me._useLegacyFade()){var dur=parseInt(me.currentAdvert.params.get("fade.out.prefade.time",1000),10);var tofade=parseFloat(me.currentAdvert.params.get("fade.out.prefade.opacity",0.9));me.prefadeKiller=$iTXT.fx2.Fade2.fade('PREFADE','itxtchrome',dur,{fadein:false,reset:false,onend:function(){},from:1,to:tofade});}}}
if(this.currentAdvert&&this.currentAdvert.params.getBool("fade.out.prefade.on",true)){createTimeout(this,"FADE",prefader,(t||hideTO));createTimeout(this,"CLOSE",close_tt,(t||hideTO)+parseInt(this.currentAdvert.params.get("fade.out.prefade.time",1000),10));}else{createTimeout(this,"CLOSE",close_tt,(t||hideTO));}},_hookIn:function(e)
{if(this.hideTID!=-1&&e.data&&e.data.hook&&e.data.hook==this.currentHook)
{window.clearTimeout(this.hideTID);this.hideTID=-1;}},_mobtIn:function(e)
{if(this.hideTID!=-1&&e.data&&e.data.hook&&e.data.hook==this.currentHook)
{window.clearTimeout(this.hideTID);this.hideTID=-1;}},cancelScheduledHide:function(ad){if(this.hideTID==-1||(ad&&this.currentAdvert!=ad)){return;}
window.clearTimeout(this.hideTID);if(ad){this._clearAllTOs();}
this.hideTID=-1;},_hookOver:function(e){var t,adParams,tooltipDelay,launcher;if(this.hideTID!==-1&&e.data&&e.data.hook&&e.data.hook==this.currentHook)
{this.cancelScheduledHide();}
this._clearAllTOs();if($iTXT.glob.params.get('hk.snapmode')==$iTXT.ui.SnapMode.Mouse)
{e.data.bounds.left=e.data.hook.mouseOverPos.x;e.data.bounds.top=e.data.hook.mouseOverPos.y;}
if(e.data&&e.data.hook&&e.data.hook.mobt){this.currentHook=null;}
if(e.data&&e.data.hook&&this.isDoubleTap(e.data.hook.ad.params)){this.currentHook=null;}
if(e.data&&e.data.hook&&e.data.hook!=this.currentHook){t=this;adParams=e.data.hook.ad.params;this.currentHook=e.data.hook;tooltipDelay=adParams.getInt("tt.open.delay",adParams.getInt("ttd",100));if(tooltipDelay>1000)
{tooltipDelay=750;}
this.options.mintthd=e.data.hook.ad.params.get("mintthd",0);launcher=function(){t._showOnHook(e.data.hook,e.data.bounds);if(e.data.hook.hookIn&&e.data.hook.isVibrantView()){e.data.hook.hookIn(e);}};if(e&&e.data&&e.data.hook){e.data.hook.saveTTLaunchFunction(launcher);}
this.openTID=window.setTimeout(launcher,tooltipDelay);}},_clearLaunch:function(){window.clearTimeout(this.openTID);},_resetCurrentHook:function(){if(!this.currentHook){return;}
this.currentHook.setState(false);this.currentHook=null;this.currentHookBB=null;},_hookOut:function(e)
{if(this.openTID!=-1)
{var adParams=e.data.hook.ad.params;var ittc=adParams.getBool("tt.stop.pending.open",adParams.getBool("ittc",false));if(ittc)
{window.clearTimeout(this.openTID);$iTXT.core.$(document).itxtFire("$iTXT:tt:ittc",e);}
else
{}}
if(e.data&&e.data.hook&&e.data.hook==this.currentHook&&!this.isMouseOver)
{this.queueHide();}
else if(this.openTID!=-1)
{this.queueHide();}
if(!this.isOpen){this.cancelScheduledHide();this._resetCurrentHook();}},_hookClick:function(e)
{this.hideTail();this.fixedOpen=true;},_close_open_hooks:function(mouseOverHook){if(this.isOpen)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:close",{closeSource:$iTXT.data.TTCloseSource.OVERNEWHOOK,tso:this.getTimeSinceOpen(),did:mouseOverHook.ad.did});}},show:function($super){$super();this.content.show();this.chrome.show();},hide:function($super){$super();if(this.content)this.content.hide();if(this.chrome)this.chrome.hide();},placeAndOpen:function(bb,hk){$iTXT.ui.tt.currentHookId=hk.rootElement.id;var tt=$iTXT.ui.tt;var center=this.currentAdvert.params.getBool("tt.position.center",false);if(this.options.invisible&&!this.isDoubleTap()){this.onTooltipOpen({left:-1000,top:-1000,state:$iTXT.ui.TooltipPosition.AR});}else{if($iTXT.core.Util.parseBool($iTXT.glob.dbParams.get("tt.placer.extended",false),false)){this.onTooltipOpen($iTXT.ui.Aura2TooltipPlacer.place({bb:bb,tt:tt}));}else if(this.isDoubleTap()){$iTXT.ui.dt=new $iTXT.ui.Doubletap();$iTXT.ui.dt.init(this,hk.ad);$iTXT.ui.dt.build();$iTXT.ui.dt.open();}else if(hk.ad.template.hasProgressBar()){this.onTooltipOpen($iTXT.ui.TooltipPlacer.getTopCenterPlacement(hk,{width:this.width,height:this.height}));}else{this.onTooltipOpen($iTXT.ui.TooltipPlacer.place({bb:bb,tt:tt,ttTailHeight:18,hk:hk,center:center}));if(center===true){this.hideTail();}}}},_showOnHook:function(hk,bb)
{var pos=$iTXT.core.Util.getCurrentPosition(hk.rootElement);bb.top=pos.top;try{this._close_open_hooks(hk);this._resetDecorations();this.showTail();this.currentHook=hk;this.currentAdvert=hk.ad;this.currentHookBB=bb;this.currentHook.setState(true);if(undefined!==hk.ad)
{this.setAdvert(hk.ad);}
this.show();this.setSize(null,null,true);this.hide();this.content.beforeOpen();if('SIMULATION'==hk.options.value){this.onTooltipOpen({left:bb.left,top:bb.top,state:bb.state});}else{this.placeAndOpen(bb,hk);}
this.content.afterOpen(this.chrome);$iTXT.core.$(document).itxtFire("$iTXT:tt:open",{advert:hk.ad});}catch(e){throw(e);}},openWithAdvert:function(advert,leftPos,topPos,posState){this._showOnHook({ad:advert,options:{value:'SIMULATION'},setState:function(){}},{left:leftPos,top:topPos,state:posState});},_onMouseOver:function(e)
{if(this.hasClosed){return-1;}
this.mouseOutLogged=false;if(this.mouseOutTID!=-1)
{window.clearTimeout(this.mouseOutTID);}
this._clearAllTOs();if(this.prefadeKiller){var starter=this.prefadeKiller();$iTXT.fx2.Fade2.fade('PREFADE','itxtchrome',50,{fadein:false,reset:false,onend:function(){$iTXT.fx2.Fade2.clearIEOpacity('itxtchrome');},from:starter,to:1});this.fadeInit=1;this.prefadeKiller=null;}
this._stripClass("itxtsemi");if(document.getElementById('itxtchrome').className.indexOf("itxtsnapback")===-1){document.getElementById('itxtchrome').className+=" itxtsnapback";}
if((e.target!=this.rootElement)&&(e.target!=this.chrome.rootElement))
{if(this.mouseOutTID!=-1)
{window.clearTimeout(this.mouseOutTID);this.mouseOutTID=-1;}
if(!this.isMouseOver)
{this.isMouseOver=true;if(this.content.advert)
{this.content.advert.template.isMouseOver=true;}
this.tooltipOver();this.mouseOverTS=(new Date()).getTime();$iTXT.core.$(document).itxtFire("$iTXT:tt:mouse:over",e);}
if(this.hideTID!=-1)
{window.clearTimeout(this.hideTID);this.hideTID=-1;}}
e.stop();},_ttOver:function()
{this.isMouseOver=true;if(this.content.advert)
{this.content.advert.template.isMouseOver=true;}
if(this.mouseOutTID!=-1)
{window.clearTimeout(this.mouseOutTID);}
if(this.hideTID!=-1)
{window.clearTimeout(this.hideTID);this.hideTID=-1;}},_ttOut:function()
{if(!this.mouseOutLogged){this.mouseOutLogged=true;}
this._onMouseOut();},_onMouseOut:function(e)
{var t=this;this.mouseOutTID=window.setTimeout(function(){t._ttMouseOut(e);},50);},_onMouseDownUp:function(e)
{var rc=false;if(e.which)rc=(e.which==3);else if(e.button)rc=(e.button==2);if(rc)
{return false;}
return true;},_ttMouseOut:function(e)
{if(this.isMouseOver)
{this.isMouseOver=false;if(this.content.advert)
{this.content.advert.template.isMouseOver=false;}
this.tooltipOut();var len=(new Date()).getTime()-this.mouseOverTS;$iTXT.core.$(document).itxtFire("$iTXT:tt:mouse:out",{len:len});this.queueHide();}},showTail:function()
{this.chrome.showTail();},hideTail:function()
{this.chrome.hideTail();},_onBodyMouseMove:function(e)
{if(this.hdrDown&&this.options.draggable)
{this.hideTail();this.fixedOpen=true;this.setPosition(e.clientX-this.hdrDownX,e.clientY-this.hdrDownY);}},_setFixedOpen:function()
{this.fixedOpen=true;},_hdrDown:function(e)
{this.hdrDown=true;var thisOff=this.rootElement.itxtTotalOffset();this.hdrDownX=e.data.clientX-thisOff.left;this.hdrDownY=e.data.clientY-thisOff.top;},_hdrUp:function()
{this.hdrDown=false;},_latchExpand:function(){this.interactionLatch=true;},_expand:function(e)
{var opts=e.data||{};if(opts.disableClose)
{this._setFixedOpen();}
if(opts.hideTail)
{this.hideTail();}
var hOffset=0;var oHOffset=this.content.heightOverlap;if(opts.hOffset)
{hOffset=opts.hOffset;}
var oW=(undefined!==opts.oW)?opts.oW:this.content.getWidth();var oH=(undefined!==opts.oH)?opts.oH:this.content.getHeight();var eW=(undefined!==opts.eW)?opts.eW:this.content.getExpandedWidth();var eH=(undefined!==opts.eH)?opts.eH:this.content.getExpandedHeight();var wD=eW-oW;var hD=eH-oH;if(undefined!==opts.dX)
{wD=opts.dX;}
if(undefined!==opts.dY)
{hD=opts.dY;}
if(0===wD&&0===hD)
{if(opts.afterFinish)
{opts.afterFinish.apply(t);}
return;}
var dX=0;var dY=0;var ttps=$iTXT.ui.TooltipPosition;if(this.ps==ttps.AR)
{dY=-hD+hOffset;}
else if(this.ps==ttps.AL)
{dY=-hD+hOffset;dX=-wD;}
else if(this.ps==ttps.BR)
{}
else if(this.ps==ttps.BL)
{dX=-wD;}
var duration=200;if($iTXT.core.Browser.performance<60)
{duration=0;}
var t=this;var moveOpts={start:true,duration:duration,target:this.rootElement,dX:dX,dY:dY,afterUpdate:function(p)
{var nW=Math.round(oW+(wD*p));var nH=Math.round(oH+(hD*p));var hO=Math.round(oHOffset+(hOffset*p));if(t.resetSizeDuringExpando||t.expandableFlash||t.chrome.expandable){t._setContentSize(nW,nH,hO);}
if(opts.afterUpdate)
{opts.afterUpdate.apply(t,[p]);}},afterFinish:function()
{if(t.interactionLatch){t.content.afterExpand(t.chrome);}
if(opts.afterFinish)
{opts.afterFinish.apply(t);}}};new $iTXT.fx.Move(moveOpts);},_decorateOnTTOpen:function(data){var ad=data.data.advert;var adtype=ad.getAdvertType();if(adtype===5||adtype===122){this.chrome.addPaddingAndBorder(data.data.advert.template.width,data.data.advert.template.height);}else{if(adtype!==155&&adtype!==39&&adtype!==58&&adtype!==48&&adtype!==54&&adtype!==160){this.chrome.addDoubleBorder();}}
var isLightBox=ad.params.getBool("lbox",false);var isProgressBar=ad.params.getBool("lbox.bar");if(adtype===60||(isLightBox&&!isProgressBar)){this.chrome.addLeftMargin();}
if((adtype===153||(isLightBox&&isProgressBar))&&this.chrome.suppressWings){this.chrome.suppressWings();}
if(isProgressBar){this.content.rootElement.itxtSetStyle({'border':'0px none transparent'});}},_resetDecorations:function(){this.chrome.resetPaddingAndBorder();$iTXT.core.$('itxtcontentbg').itxtShow();},_resizeOnTTOpenFreeform:function(){var t=this;if(t.currentAdvert.isKelkoo()||t.currentAdvert.getAdvertType()===122){setTimeout(function(){t.chrome.addPaddingAndBorder(document.getElementById("itxtcontent").offsetWidth,document.getElementById("itxtcontent").offsetHeight);},400);setTimeout(function(){t.chrome.addPaddingAndBorder(document.getElementById("itxtcontent").offsetWidth,document.getElementById("itxtcontent").offsetHeight);},700);}},_resizeOnExpand:function(data){this.resetSizeDuringExpando=false;var hihi=data.data.cH||data.data.eH;if(this.chrome.expandable){this.chrome.addPadding(parseInt(data.data.eW,10),hihi-data.data.hOffset);}else{this.chrome.addPaddingAndBorder(parseInt(data.data.eW,10),hihi-data.data.hOffset);}},_setContentSize:function(w,h,hO)
{this.content.setContentSize(w,h,hO);if(!this.chrome.expandable){this.setSize(null,null,false);}},setAdvert:function(ad)
{var adopts=ad.params;var nott=adopts.get("nott",false);if(nott)
{adopts.set("scmh",1,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}
this.options.invisible=nott;var tmpl=ad.getTemplate();var tmplopts=(null!==tmpl)?(tmpl.options||{}):{};var adBgCol=adopts.parse(adopts.get("tt.bg.col","#f0f0f0"));adBgCol=(adBgCol.length>0)?adBgCol:"#f0f0f0";this.options.bgcol=$iTXT.core.Util.validHexColor(tmplopts.ttbgcol||adBgCol);$iTXT.core.$(document).itxtFire("$iTXT:tt:impetus:bgchange",{col:this.options.bgcol});var adHvBgColor=adopts.parse(adopts.get("tt.bg.h.col",adBgCol));adHvBgColor=(adHvBgColor.length>0)?adHvBgColor:"#f0f0f0";this.options.hbgcol=$iTXT.core.Util.validHexColor(tmplopts.ttbghcol||adHvBgColor);this.options.tthd=adopts.getInt("tthd",this.defaultOptions.tthd);this.chrome.setAdvert(ad);if(this.options.invisible)
{this.content.clearContent();}
else
{this.content.setAdvert(ad);}
$iTXT.core.$(document).itxtFire("$iTXT:tt:ad:set",{did:ad.did});},onTooltipOpen:function(opts)
{if(undefined===opts.left||undefined===opts.top||!opts.state)
return;this.options.ps=opts.state;var hookId=$iTXT.ui.tt.currentHookId;var hook=document.getElementById(hookId);$iTXT.ui.tt.open(opts.left,opts.top,opts.state);},_resizeTooltip:function()
{this.setSize(null,null,true);},_smoothResizeTooltip:function(e)
{var dX=0,dY=0,sW=this.content.getWidth(),sH=this.content.getHeight(),t=this;var newSize=this.content.tryResize(null,null);if(isNaN(sW))
{sW=newSize[0];}
if(isNaN(sH))
{sH=newSize[1];}
dX=newSize[0]-sW;dY=newSize[1]-sH;var expe={data:{dX:dX,dY:dY,oW:sW,oH:sH,afterFinish:function()
{if(e&&e.data&&'function'==typeof e.data)
{window.setTimeout(function(){e.data();},150);}
$iTXT.core.$(document).itxtFire("$iTXT:tt:ready");setTimeout(function(){t.chrome.expanded=true;},300);}}};this._expand(expe);},_iframeOut:function()
{this.mouseOutTID=window.setTimeout($iTXT.core.Event.bind(this,this._ttMouseOut),20);},getTimeSinceOpen:function()
{if(this.isOpen)
{return(new Date()).getTime()-this.openTS;}
return null;},getTimeInTooltip:function()
{if(this.isMouseOver)
{return(new Date()).getTime()-this.mouseOverTS;}
return null;},_changeAdvert:function(e)
{if(e.data)
{this.currentAdvert=e.data;}},tooltipOver:function()
{this.chrome.tooltipOver();},tooltipOut:function()
{this.chrome.tooltipOver();},_mvuExpand:function(e)
{var opts=e.data||{};if(opts.rt==1)
{this._expand({data:{eW:opts.w,eH:opts.h}});}
else if(opts.rt===0)
{this._expand({data:{eW:this.content.getTemplateDefaultWidth(),eH:this.content.getTemplateDefaultHeight()}});}},_fExp:function(e)
{this._expand({});},_fClick:function(e)
{this.hideTooltip();},_setBGCol:function(e)
{this.options.bgcol=$iTXT.core.Util.validHexColor(e.data);},_setHVCol:function(e)
{this.options.hbgcol=$iTXT.core.Util.validHexColor(e.data);},_bodyOver:function(e)
{this._ttOut(e);},_contentLoaded:function(e)
{this.resetSizeDuringExpando=true;this.chrome.expanded=false;var opts=e.data||{};var loadTimeout=opts.loadTimeout||0;var t=this;window.setTimeout(function(){t._smoothResizeTooltip();},loadTimeout);},isAboveHook:function(){return this.options.ps.charAt(0).toUpperCase()==='A';},isDoubleTap:function isDoubleTap(params){var params=params||this.currentAdvert.params
var blockDoubleTap=$iTXT.glob.params.getInt("tt.blockDoubleTap",0);var doubleTap=params.getInt("tt.doubletap",0);var isMobile=$iTXT.core.Browser.isSmartphone();return!blockDoubleTap&&doubleTap&&isMobile;}});};$iTXT.js.loader["$iTXT.ui.TooltipChrome"]=true;$iTXT.ui.TooltipChrome_Load=function(){$iTXT.ui.TooltipChrome=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{options:null,w:0,h:0,overlappedHeight:0,allowCustomHeader:true,init:function(_options,$super)
{var defOpts=$iTXT.core.Util.extend({id:"itxtchrome",ps:$iTXT.ui.TooltipPosition.AR},_options);this.expandable=false;$super(defOpts);},build:function(bg)
{var bgcol=bg||"#ffffff";this.contentBG=$iTXT.core.Builder.make("DIV",{style:"background-color:"+bgcol,id:"itxtcontentbg"});this.contentBG.appendChild($iTXT.core.Builder.make("div",{id:"itxt12_left_edge",className:"itxt12_left_edge"},[]));this.contentBG.appendChild($iTXT.core.Builder.make("div",{id:"itxt12_right_edge",className:"itxt12_right_edge"},[]));this.contentBG.appendChild($iTXT.core.Builder.make("div",{id:"itxt_bg_inside",className:"itxt_bg_inside"},[]));this.rootElement.appendChild(this.contentBG);this.defaultHeader=this.header=new $iTXT.ui.TooltipHeader({ps:this.options.ps,bgcol:this.options.bgcol,draggable:this.options.draggable});this.header.build();this.defaultFooter=this.footer=new $iTXT.ui.TooltipFooter({ps:this.options.ps,bgcol:this.options.bgcol});this.footer.build();this.defaultTail=this.tail=new $iTXT.ui.TooltipTail({ps:this.options.ps,bgcol:this.options.bgcol});this.addChildren([this.slideOut,this.header,this.footer,this.tail]);$iTXT.subscribe("$iTXT:tt:impetus:bgchange",function(s){document.getElementById("itxtcontentbg").style.backgroundColor=s.data.col;});},setPositionState:function(ps)
{this.options.ps=ps;if(this.tail)
this.tail.setPositionState(ps);this.resize(this.w,this.h);},_sset:function(el,prop,styl){try{document.getElementById(el).style[prop]=styl;}catch(e){}},addPaddingAndBorder:function(w,h){this.addBorder();this.addPadding(parseInt(w,10),parseInt(h,10));},addPadding:function(w,h){this._sset('itxtcontent',"margin-left","4px");this.setSize(w+10,h,0);},addDoubleBorder:function(){this._sset("itxt_underliner","display","block");},addBorder:function(){this._sset("itxtcontent","border","1px solid #c1c1c1");},removeBorder:function(){this._sset("itxtcontent","border","none");},resetPaddingAndBorder:function(){this._sset("itxt_underliner","display","none");this._sset("itxtcontent","border","none");this._sset("itxtcontent","margin-left","0");this._sset("itxt12_left_edge","display","block");this._sset("itxt12_right_edge","display","block");},addLeftMargin:function(){document.getElementById("itxtcontent").itxtAddClass("leftshift");},removeLeftMargin:function(){document.getElementById("itxtcontent").itxtRemoveClass("leftshift");},removeLRBBorder:function(){this._sset("itxtcontent","border","none");this._sset("itxtcontent","border-top","1px solid #c1c1c1");},suppressWings:function(){if(this.advert.template.usePaddingAndBorder){return;}
this._sset("itxt12_left_edge","display","none");this._sset("itxt12_right_edge","display","none");},setSize:function(w,h,overlap)
{var tailLeft;overlap=Number(overlap)?overlap:0;var ttps=$iTXT.ui.TooltipPosition;this.width=w;var headerAndContentHeight=h+this.getHeaderHeight();this.height=headerAndContentHeight+
this.getFooterHeight()+
this.getTailHeight();this.overlappedHeight=Math.max(headerAndContentHeight+overlap,this.height);this.rootElement.itxtSetStyle({width:this.width+"px",height:this.overlappedHeight+"px"});this.contentBG.itxtSetStyle({width:this.width+"px",height:h+"px"});if((ttps.AR==this.options.ps)||(ttps.AL==this.options.ps))
{if(this.header)
{this.header.setPosition(0,0);this.header.setSize(this.width,this.height);}
if(this.footer)
{this.footer.setPosition(0,h+this.getHeaderHeight());this.footer.setSize(this.width,this.height);}
if(this.tail)
{this.tail.setPosition(this.tail.getCenterLeft(),h+this.getHeaderHeight()+this.getFooterHeight());}
if(this.contentBG)
{this.contentBG.itxtSetStyle({top:this.getHeaderHeight()+"px"});}}
else
{if(this.header)
{this.header.setPosition(0,this.getTailHeight());this.header.setSize(this.width,this.height);}
if(this.footer)
{this.footer.setPosition(0,h+this.getHeaderHeight()+this.getTailHeight());this.footer.setSize(this.width,this.height);}
if(this.tail)
{this.tail.setPosition(this.tail.getCenterLeft(),0);}
if(this.contentBG)
{this.contentBG.itxtSetStyle({top:(this.getHeaderHeight()+this.getTailHeight())+"px"});}}
var ttsoH=h+this.getHeaderHeight()+this.getFooterHeight();var ttsoOffH=0;if((ttps.BR==this.options.ps)||(ttps.BL==this.options.ps))
{ttsoOffH=this.getTailHeight();}},getOverlappedHeight:function()
{return this.overlappedHeight;},getContentOffset:function()
{var ttps=$iTXT.ui.TooltipPosition;var h=this.getHeaderHeight();if((ttps.BR==this.options.ps)||(ttps.BL==this.options.ps))
{h+=this.getTailHeight();}
return[0,h];},showTail:function()
{if(this.tail)
this.tail.show();},hideTail:function()
{if(this.tail)
this.tail.hide();},getTTHeight:function()
{var ttps=$iTXT.ui.TooltipPosition;return((ttps.AR==this.options.ps)||(ttps.AL==this.options.ps))?0:this.getTailHeight();},setAdvert:function(ad,$super)
{var tmpl=ad.getTemplate();if(this.allowCustomHeader)
{if(this.footer)
{if(tmpl.options.customFooter)
{if(this.footer)
{this.removeChild(this.footer);this.footer.dispose();}
this.footer=new tmpl.options.customFooter({ps:this.options.ps,bgcol:this.options.bgcol});if(this.footer.build)
{this.footer.build();}
this.addChild(this.footer);this.defaultFooter.hide();}
else if(this.defaultFooter!=this.footer)
{if(this.footer)
{this.removeChild(this.footer);this.footer.dispose();}
this.footer=this.defaultFooter;this.addChild(this.defaultFooter);this.footer.show();}}
if(this.header)
{if(tmpl.options.customHeader)
{if(this.header)
{this.removeChild(this.header);this.header.dispose();}
this.header=new tmpl.options.customHeader({ps:this.options.ps,bgcol:this.options.bgcol,draggable:this.options.draggable});if(this.header.build)
{this.header.build();}
this.addChild(this.header);this.defaultHeader.hide();}
else if(this.defaultHeader!=this.header)
{if(this.header)
{this.removeChild(this.header);this.header.dispose();}
this.header=this.defaultHeader;this.addChild(this.defaultHeader);this.header.show();}}
if(this.tail)
{if(tmpl.options.customTail)
{if(this.tail)
{this.removeChild(this.tail);this.tail.dispose();}
this.tail=new tmpl.options.customTail({ps:this.options.ps,bgcol:this.options.bgcol,draggable:this.options.draggable});if(this.tail.build)
{this.tail.build();}
this.addChild(this.tail);this.defaultTail.hide();}
else if(this.defaultTail!=this.tail)
{if(this.tail)
{this.removeChild(this.tail);this.tail.dispose();}
this.tail=this.defaultTail;this.addChild(this.defaultTail);this.tail.show();}}}
if(this.header)
this.header.setAdvert(ad);if(this.footer)
this.footer.setAdvert(ad);if(this.tail)
this.tail.setAdvert(ad);$super(ad);},tooltipOver:function()
{if(this.header)
this.header.tooltipOver();if(this.footer)
this.footer.tooltipOver();if(this.tail)
this.tail.tooltipOver();},tooltipOut:function()
{if(this.header)
this.header.tooltipOut();if(this.footer)
this.footer.tooltipOut();if(this.tail)
this.tail.tooltipOut();},getTailWidth:function()
{return(this.tail)?this.tail.getWidth():0;},getTailHeight:function()
{return(this.tail)?this.tail.getHeight():0;},getFooterWidth:function()
{return(this.footer)?this.footer.getWidth():0;},getFooterHeight:function()
{return(this.footer)?this.footer.getHeight():0;},getHeaderWidth:function()
{return(this.header)?this.header.getWidth():0;},getHeaderHeight:function()
{return(this.header)?this.header.getHeight():0;},changeBgColor:function(col){document.getElementById('itxtcontentbg').style.backgroundColor=col;}});};$iTXT.js.loader["$iTXT.ui.TooltipContent"]=true;$iTXT.ui.TooltipContent_Load=function(){var undefined;var loadingImage="//images.intellitxt.com/ast/tt/09/loading.gif";$iTXT.core.Util.cacheImage(loadingImage);$iTXT.ui.TooltipContent=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{options:null,template:null,loading:false,ccTS:null,advert:null,heightOverlap:0,drawers:null,init:function(_options,$super)
{this.componentParams=$iTXT.core.Util.extend({'tt.loading.img.name':'loading.gif','tt.loading.img':'${tt.img.dir}${tt.loading.img.name}','tt.loading.img.width':'32','tt.loading.img.height':'32'},this.componentParams);var defOpts=$iTXT.core.Util.extend({id:"itxtcontent",className:"itxt12content",loadingImage:"${tt.loading.img}",loadingImageWidth:"${tt.loading.img.width}",loadingImageHeight:"${tt.loading.img.height}"},_options);$super(defOpts);var o=this.options;$iTXT.core.Util.cacheImages([o.loadingImage]);this.width=300;this.height=100;this.loadingImg=$iTXT.core.Builder.make("IMG",{src:o.loadingImage,width:o.loadingImageWidth,height:o.loadingImageHeight,id:this.options.id+"LdgImg",style:"position: absolute; left: 50%; top: 50%;"});this.loadingDiv=$iTXT.core.Builder.make("DIV",{id:this.options.id+"Ldg",style:"position: absolute; display: none;"},[this.loadingImg]);this.rootElement.appendChild(this.loadingDiv);this.resize();this.rootElement.itxtBatchSubscribe([["mouseover",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:cnt:mouse:over",e);}],["mouseout",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:cnt:mouse:out",e);}],["mouseup",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:cnt:mouse:up",e);}]],this.evtDspFuncs);$iTXT.core.$(document).itxtBatchSubscribe([["$iTXT:tt:close:btn:click",$iTXT.core.Event.bind(this,this._hdrCloseClk)],["$iTXT:tt:what:btn:click",$iTXT.core.Event.bind(this,this._hdrWhatsClk)],["$iTXT:tt:vmlogo:click",$iTXT.core.Event.bind(this,this._hdrVMLogoClk)],["$iTXT:function:setClickThrough",$iTXT.core.Event.bind(this,this._setClickThrough)],["$iTXT:tt:content:change:ad",$iTXT.core.Event.bind(this,this.changeAdvert)],["$iTXT:tt:ready",$iTXT.core.Event.bind(this,this._tooltipReady)]],this.evtDspFuncs);this.drawers=[];},setSize:function(w,h,$super)
{$super(w,h);this.loadingDiv.itxtSetStyle({width:w+"px",height:h+"px"});this.loadingImg.itxtSetStyle({marginLeft:-(this.loadingImg.offsetWidth/2)+"px",marginTop:-(this.loadingImg.offsetHeight/2)+"px"});},resize:function(w,h,force)
{if(null!==this.template)
{var nW=w||this.currentWidth||this.template.defaultWidth;var nH=h||this.currentHeight||this.template.defaultHeight;this.setSize(nW,nH);var dim=this.template.resize(nW,nH,force);if(!force)
{this.width=dim[0];this.height=dim[1];}}
this.setSize(this.width,this.height);this._resizeDrawers();},hideContent:function()
{if(null!==this.template&&null!==this.template.rootElement)
{this.template.rootElement.style.visibility="hidden";}},showContent:function()
{if(null!==this.template&&null!==this.template.rootElement)
{this.template.rootElement.style.visibility="visible";if(this.template.afterShow)
{this.template.afterShow();}}},tryResize:function(w,h)
{if(null!==this.template)
{var nW=w||this.currentWidth||this.template.defaultWidth;var nH=h||this.currentHeight||this.template.defaultHeight;var dim=this.template.resize(nW,nH);this.width=dim[0];this.height=dim[1];}
return[this.width,this.height];},setContentSize:function(w,h,hO)
{if(hO)
{this.heightOverlap=hO;}
this.currentWidth=w;this.currentHeight=h;this.resize(null,null,true);},setAdvert:function(ad,$super)
{$super(ad);this.ccTS=(new Date()).getTime();this._changeAdvert(ad);},changeAdvert:function(e,$super)
{$super(e.data);this._changeAdvert(e.data);},_changeAdvert:function(ad,$super)
{if(!ad)
{return;}
this.loadingImg.src=this.options.loadingImage;this.heightOverlap=0;var h=this.advert.params.get("FTROVERLAP");if(null!==h)
{this.heightOverlap=h;}
this.currentWidth=undefined;this.currentHeight=undefined;if(this.template)
{this.template.remove();this.template=null;}
this.template=this.advert.getTemplate();if(null!==this.template)
{this.rootElement.appendChild(this.template.rootElement);window.setTimeout($iTXT.core.Event.bind(this,this._handleAdvert),1);if(!this.advert.template.fullyBuilt)
{this.setLoading(true);}}},_handleAdvert:function()
{if(!this.template&&!!this.advert.template){this.template=this.advert.template;}
var adHandler=this.template.getAdvertHandler();adHandler.handle($iTXT.core.Event.bind(this,this._handleAdvertCallback));},_handleAdvertCallback:function()
{this.template.buildTemplate($iTXT.core.Event.bind(this,this._templateLoadCallback));},_templateLoadCallback:function(templateNode)
{var td=(new Date()).getTime()-this.ccTS;var tout=Math.max(250-td,0);$iTXT.core.$(document).itxtFire("$iTXT:tt:content:loaded",{loadTimeout:tout});},beforeOpen:function()
{if(null!==this.template)
{this.template.beforeOpen();}},afterOpen:function(khrome)
{if(null!==this.template)
{this.template.afterOpen(khrome);}},beforeClose:function()
{if(null!==this.template)
{this.template.beforeClose();}},afterClose:function()
{if(null!==this.template)
{this.template.afterClose();this.template.remove();this.template=null;}},afterExpand:function(khrome){if(null!==this.template)
{this.template.afterExpand(khrome);}},getTemplateDefaultWidth:function()
{return this.template?this.template.defaultWidth:0;},getTemplateDefaultHeight:function()
{return this.template?this.template.defaultHeight:0;},getExpandedWidth:function()
{return this.template?(this.template.expandedWidth||this.template.defaultWidth):0;},getExpandedHeight:function()
{return this.template?(this.template.expandedHeight||this.template.defaultHeight):0;},setLoading:function(b)
{this.loading=b;if(this.loading)
{if(""!==this.options.loadingImage)
{this.loadingDiv.itxtShow();}
if(this.template)
{this.template.onHide();}
this.hideContent();}
else
{this.loadingDiv.itxtHide();if(this.template)
{this.template.onShow();}
this.showContent();}},_finishSmoothRs:function()
{this.setLoading(false);},getWidth:function()
{return parseInt(this.width,10);},getHeight:function()
{return parseInt(this.height,10);},_addDrawerContent:function(e)
{var d=e.data||null;if(null!==d)
{this.rootElement.itxtAppendChild(d.drawerContent);d.setSize(this.width,this.height);d.drawerContent.itxtSetStyle({left:"0px",top:this.height+"px"});this.drawers.push(d);}},_showDrawerContent:function(e)
{var openDrawer=e.data||null;var closeDrawer,dr;for(var i=0;i<this.drawers.length;i++)
{dr=this.drawers[i];if(openDrawer!=dr&&dr.isOpen)
{closeDrawer=dr;break;}}
if(openDrawer&&closeDrawer)
{new $iTXT.fx.Queue(new $iTXT.fx.Move({target:dr.drawerContent,dX:0,y:this.height,duration:150,afterFinish:function(){closeDrawer.startHide();}})).push(new $iTXT.fx.Move({target:openDrawer.drawerContent,dX:0,y:0,duration:150,afterFinish:function(){openDrawer.finishShow();}}));}
else if(openDrawer)
{new $iTXT.fx.Move({start:true,target:openDrawer.drawerContent,dX:0,y:0,duration:150,afterFinish:function(){openDrawer.finishShow();}});}},_hideDrawerContent:function(e)
{var closeDrawer=e.data||null;if(null!==closeDrawer)
{closeDrawer.startHide();new $iTXT.fx.Move({start:true,target:closeDrawer.drawerContent,dX:0,y:this.height,duration:150});}},_resetDrawers:function()
{if(this.drawers)
{for(var i=0;i<this.drawers.length;i++)
{var d=this.drawers[i];this.rootElement.removeChild(d.drawerContent);}}
this.drawers=[];},_resizeDrawers:function()
{if(!this.drawers)
return;for(var i=0;i<this.drawers.length;i++)
{var d=this.drawers[i];d.setSize(this.width,this.height);if(!d.isOpen)
{d.drawerContent.itxtSetStyle({top:this.height+"px"});}}},_hdrCloseClk:function(e)
{if(this.template&&this.template.onCloseClick&&this.template.onCloseClick())
{e.closeSource=$iTXT.data.TTCloseSource.CLOSECLICK;$iTXT.core.$(document).itxtFire("$iTXT:tt:close",e);}},_hdrWhatsClk:function()
{if(this.template&&this.template.onWhatsThisClick&&this.template.onWhatsThisClick())
{this._defWhatsThisClk();}},_hdrVMLogoClk:function()
{if(this.template&&this.template.onVibrantLogoClick&&this.template.onVibrantLogoClick())
{this._defWhatsThisClk();}},_defWhatsThisClk:function()
{var adPms=this.advert.params;var wtcl=adPms.get("wtcl");if(wtcl&&"template"==wtcl)
{var opts={mt:20,mv:adPms.get("A.AT"),ipid:adPms.get("IPID")};$iTXT.fire("$iTXT:data:log:monitor",opts);}},_setClickThrough:function(e)
{var opts=e.data||{};if(opts.url){if(opts.did!=this.advert.did){return;}
this.advert.params.set("CLICKTAG",opts.url,$iTXT.cnst.WEIGHTING_DEFAULT_CAMPAIGN);}},clearContent:function()
{if(this.template)
{this.template.remove();this.template=null;}},_tooltipReady:function()
{this.setLoading(false);}});};$iTXT.js.loader["$iTXT.ui.TooltipFooter"]=true;$iTXT.ui.TooltipFooter_Load=function(){var undefined;$iTXT.ui.TooltipFooter=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{options:null,init:function(_options,$super)
{var defOpts=$iTXT.core.Util.extend({id:"itxtfooter",height:6},_options);$super(defOpts);this.height=this.options.height;},setSize:function(w,h,$super)
{$super(w,this.height);},build:function()
{var b=$iTXT.core.Builder;var cont=b.makeEl("div",{},[b.makeEl("div",{"id":"itxt12_ftr_left "},[],{resets:"itxt12_ftr_left itxt12_sprited"}),b.makeEl("div",{"id":"itxt12_ftr_mid"},[],{resets:"itxt12_ftr_mid itxt12_sprited"}),b.makeEl("div",{"id":"itxt12_ftr_right"},[],{resets:"itxt12_ftr_right itxt12_sprited"})],{resets:"itxt12_ftr"});this.rootElement.appendChild(cont);},setAdvert:function(ad,$super)
{this.hasDrawers=true;var h=ad.params.get("FTRHIGHT");if(null!==h)
{this.height=h;}
else
{this.height=this.options.height;}
this.rootElement.itxtSetStyle({backgroundColor:"transparent"});$super(ad);var adopts=ad.params;var tmpl=this.advert.getTemplate();var tmplopts=(null!==tmpl)?(tmpl.options||{}):{};},_onMouseOver:function(e)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:ftr:mouse:over",e);},_onMouseOut:function(e)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:ftr:mouse:out",e);},_onMouseClick:function(e)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:ftr:mouse:click",e);},setDrawers:function(b)
{this.hasDrawers=b;this.height=0;}});};$iTXT.js.loader["$iTXT.ui.TooltipHeader"]=true;$iTXT.ui.TooltipHeader_Load=function(){$iTXT.ui.privacyIconAlign={ICON_ONLY:1,ICON_RIGHT:2,ICON_LEFT:3,TEXT_ONLY:4};$iTXT.ui.TooltipHeader=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{adchoices:null,whatsthis:null,options:{},init:function(_options,$super)
{this.componentParams=$iTXT.core.Util.extend({'hdr.privacyicon.txt':'${trans.privacyicon.txt}'},this.componentParams);var defOpts=$iTXT.core.Util.extend({id:"itxtheader",height:30,defbgcol:"#F0F0F0",privIconTxt:"${hdr.privacyicon.txt}"},_options);$super(defOpts);this.height=this.options.height;this.rootElement.itxtBatchSubscribe([["mouseover",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:over",e);}],["mouseout",function(e){$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:out",e);}]],this.evtDspFuncs);},setSize:function(w,h,$super)
{$super(w,this.options.height);},build:function(opts)
{var b=$iTXT.core.Builder,bg_on=true;if(opts){if(opts.no_bg){bg_on=false;}}
this.rootElement.ondragstart=function(){return false;};this.rootElement.onselectstart=function(){return false;};if(!this.options.draggable)
{this.rootElement.className="fixed";}
if(bg_on){this.cornerHolder=b.make("DIV",{id:"itxtcrnhldr",className:"itxtcrnhldr"},[b.makeEl("div",{},[],{resets:"itxt12_tlc itxt12_sprited"}),b.makeEl("div",{},[],{resets:"itxt12_tm itxt12_sprited"}),b.makeEl("div",{},[],{resets:"itxt12_trc itxt12_sprited"})]);this.rootElement.appendChild(this.cornerHolder);}
var ad_choice=this._buildAdChoices();var what_this=this._buildWhatsThis();this.rootElement.appendChild(this._buildBlock([this.buildLogo(),ad_choice],"itxt12_hdr_lft","itxt12_hdr_lft"));this.rootElement.appendChild(this._buildBlock([this._buildTwitter(),this._buildFB()],"itxt12_hdr_social","itxt12_hdr_social"));this.rootElement.appendChild(this._buildBlock([what_this,this.buildCloseButton()],"itxt12_hdr_rt","itxt12_hdr_lft"));this.rootElement.appendChild(this._buildUnderLine());this.adchoices=ad_choice;this.whatsthis=what_this;this.rootElement.itxtSubscribe("mousedown",$iTXT.core.Event.bind(this,this._hdrDown));this.rootElement.itxtSubscribe("mouseup",$iTXT.core.Event.bind(this,this._hdrUp));},_buildBlock:function(children,klass,id){return $iTXT.core.Builder.makeEl("div",{className:klass,id:id},children,{noResets:true});},showAdChoices:function(){this.adchoices.style.display="block";this.whatsthis.style.display="none";},hideAdChoices:function(){this.adchoices.style.display="none";this.whatsthis.style.display="block";},buildLogo:function()
{var pubLogo=decodeURIComponent($iTXT.glob.params.get('hdr.logo'));if("null"==pubLogo||pubLogo.indexOf('vm_logo2009')>=0){pubLogo=null;}
var vmLogo;if(pubLogo){var pubLogoEl=$iTXT.core.Builder.make("APNG",{className:"itxtvmlogo",src:pubLogo});vmLogo=$iTXT.core.Builder.makeEl("div",{className:"itxt12_publogo"},[pubLogoEl],{noResets:true});}else{vmLogo=$iTXT.core.Builder.makeEl("div",{className:"itxt12_vmlogo itxt_sprited"},[],{noResets:true});this.spritedInteraction(vmLogo,{over:{x:-60,y:-123},out:{x:-60,y:-93},down:{x:-60,y:-123}});}
vmLogo.ondragstart=function(){return false;};vmLogo.itxtSubscribe("mousedown",function(e){$iTXT.core.Event.preventDefault(e);});vmLogo.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._vmLogoBtnClk));var vmLogoWrapper=$iTXT.core.Builder.make("A",{target:'_blank'},[vmLogo]);return vmLogoWrapper;},spritedInteraction:function(el,pos_arr,targEl,otherfx){var actor=targEl||el;el.itxtSubscribe("mouseover",function(){actor.style.backgroundPosition=pos_arr.over.x+"px "+pos_arr.over.y+"px";if(otherfx!==undefined)otherfx("over");});el.itxtSubscribe("mouseout",function(){actor.style.backgroundPosition=pos_arr.out.x+"px "+pos_arr.out.y+"px";if(otherfx!==undefined)otherfx("out");});el.itxtSubscribe("mousedown",function(){actor.style.backgroundPosition=pos_arr.down.x+"px "+pos_arr.down.y+"px";if(otherfx!==undefined)otherfx("down");});},buildCloseButton:function()
{var closeBtn=$iTXT.core.Builder.makeEl("div",{},[],{resets:"itxt12_cls_btn"});this.spritedInteraction(closeBtn,{over:{x:-60,y:-30},out:{x:-60,y:0},down:{x:-60,y:-60}});closeBtn.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._closeBtnClk));return closeBtn;},_buildAdChoices:function()
{var logo=$iTXT.core.Builder.makeEl("div",{id:"itxt_ad_choices"},[],{resets:"itxt12_adchoices"});var txt=$iTXT.core.Builder.makeEl("div",{},[this.options.privIconTxt],{resets:"itxt12_adchoices_txt"});var priv=$iTXT.core.Builder.makeEl("div",{},[logo,txt],{resets:"itxt12_priv"});var hlText=function(st){switch(st){case"over":txt.style.color="#333333";break;case"down":txt.style.color="#333333";break;default:txt.style.color="#bababa";}};this.spritedInteraction(priv,{over:{x:-67,y:-173},out:{x:-67,y:-153},down:{x:-67,y:-173}},logo,hlText);priv.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._onPrivacyIconClick));return priv;},_buildWhatsThis:function(){var wassit=$iTXT.core.Builder.makeEl("div",{id:"itxt_whats_this"},[],{resets:"itxt12_sprited"});this.spritedInteraction(wassit,{over:{x:-19,y:-172},out:{x:-6,y:-172},down:{x:-32,y:-172}});wassit.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._whatBtnClk));return wassit;},_buildFB:function(){var fb=$iTXT.core.Builder.makeEl("div",{id:"itxt_social_fb"},[],{resets:"itxt12_sprited itxt_social"});this.spritedInteraction(fb,{over:{x:-7,y:-381},out:{x:-7,y:-351},down:{x:-7,y:-381}});fb.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._facebookClick));return fb;},_buildTwitter:function(){var tw=$iTXT.core.Builder.makeEl("div",{id:"itxt_social_twitter"},[],{resets:"itxt12_sprited itxt_social"});this.spritedInteraction(tw,{over:{x:-31,y:-381},out:{x:-31,y:-351},down:{x:-31,y:-381}});tw.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._twitterClick));return tw;},_buildUnderLine:function(){var underline=$iTXT.core.Builder.makeEl("div",{id:"itxt_underliner"},[],{resets:"itxt_underliner"});underline.innerHTML='&nbsp;';return underline;},_twitterClick:function(){var uri=decodeURIComponent(this.advert.params.parse("${tt.social.twitter.url}"));var cts=parseInt(this.advert.params.get("cts",0),10);$iTXT.data.al.openUrl($iTXT.data.al.getClickURL(this,{so:225,redir:uri}),cts);},_facebookClick:function(){var uri=decodeURIComponent(this.advert.params.parse("${tt.social.facebook.url}"));var cts=parseInt(this.advert.params.get("cts",0),10);$iTXT.data.al.openUrl($iTXT.data.al.getClickURL(this,{so:224,redir:uri}),cts);},_onPrivacyIconClick:function()
{var opts={mt:124,mv:this.advert.params.get("A.AT"),ipid:this.advert.params.get("IPID")};$iTXT.fire("$iTXT:data:log:monitor",opts);var wtUrl=this.advert.params.parse("${tt.wturl}");$iTXT.core.Util.openUrl(this.advert.params.parse(this.advert.params.get(this.advert.params.parse("tt.privacyicon.url.${cc}"),wtUrl)),false);},_hdrDown:function(e)
{if(this._hdrTarget(e.target))
{$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:down",e);}},_hdrUp:function(e)
{if(this._hdrTarget(e.target))
{$iTXT.core.$(document).itxtFire("$iTXT:tt:hdr:mouse:up",e);}},_hdrTarget:function(t)
{return((t!=this.closeBtn)&&(t!=this.whatBtn)&&(t!=this.vmLogo));},_closeBtnClk:function(e)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:close:btn:click");},_whatBtnClk:function(e)
{$iTXT.core.$(document).itxtFire("$iTXT:tt:what:btn:click");var wtUrl=this.advert.params.parse("${tt.wturl}");$iTXT.core.Util.openUrl(wtUrl,false);},_vmLogoBtnClk:function()
{$iTXT.core.$(document).itxtFire("$iTXT:tt:vmlogo:click");var wtUrl=this.advert.params.parse("${tt.wturl}");$iTXT.core.Util.openUrl(wtUrl);},showComponent:function(el){el=$iTXT.core.$(el);el.itxtShow();},hideComponent:function(el){el=$iTXT.core.$(el);el.itxtHide();},setAdvert:function(ad,$super)
{if(this.advert==ad){return;}
if(ad.useAdChoices()){this.showAdChoices();$iTXT.core.$('itxt12_hdr_social').style.right="26px";}else{this.hideAdChoices();$iTXT.core.$('itxt12_hdr_social').style.right="40px";}
if(ad.params.get("aura2.type",0)!=3){if(ad.params.get('tt.social.facebook.url',null)){this.showComponent("itxt_social_fb");}else{this.hideComponent("itxt_social_fb");}
if(ad.params.get('tt.social.twitter.url',null)){this.showComponent("itxt_social_twitter");}else{this.hideComponent("itxt_social_twitter");}}
$super(ad);}});};$iTXT.js.loader["$iTXT.ui.TooltipPlacer"]=true;$iTXT.ui.TooltipPlacer_Load=function(){var debug;var debugZindex=666;var debugColor={'itxtdebughotzone':'black','itxtdebugac':'blue','itxtdebugbc':'green','itxtdebugleft':'orange','itxtdebugright':'yellow','itxtdebugfinal':'white','itxtdebugburn':'red'};function initDebug(){var dbg,noop;if(debug){return;}
dbg=$iTXT.glob.params.getBool('itxtloc-xx',false);noop=function(){};debug={clear:!dbg?noop:function(){var curNode=document.body.lastChild,nextNode=curNode,i=0;do{i++;nextNode=curNode.previousSibling;if(curNode.className.indexOf('itxtdebugplacer')>-1){document.body.removeChild(curNode);curNode=nextNode;}}while(nextNode&&i<200);},draw:!dbg?noop:function(coords,cssClass){var el=document.createElement('div');el.className='itxtdebugplacer '+cssClass;el.innerHTML='&nbsp;';el.style.cssText=['position: absolute','top: '+coords.top+'px','right: '+coords.right+'px','bottom: '+coords.bottom+'px','left: '+coords.left+'px','background-color: '+debugColor[cssClass],'border: 1px solid black','height: '+(coords.bottom-coords.top)+'px','width: '+(coords.right-coords.left)+'px','z-index: '+debugZindex].join(';');document.body.appendChild(el);debugZindex+=1000;},drawHotZones:!dbg?noop:function(zones){var i;for(i=zones.length-1;i>=0;i--){debug.draw(zones[i],'itxtdebughotzone');}}};}
$iTXT.ui.TooltipPosition={AR:"AR",AC:"AC",AL:"AL",CL:"CL",CR:"CR",BR:"BR",BC:"BC",BL:"BL"};$iTXT.ui.TooltipPlacer={STEP_LENGTH_PX:1,TAIL_WIDTH:30,weight:{AC:90,AL:85,AR:80,BC:70,BL:65,BR:60},_getHookPosition:function(hook){if(hook.hasMobt()&&hook.mobtCover&&!hook.hasFlipped){return $iTXT.core.Util.getPosition(hook.mobtCover);}
return hook.getPosition();},_getHookSize:function(hook){var el=hook.rootElement;if(hook.hasMobt()&&hook.mobtCover&&!hook.hasFlipped){el=hook.mobtCover;}
return{width:el.offsetWidth,height:el.offsetHeight};},_getHookCenterPosition:function(hook){var pos=this._getHookPosition(hook),size=this._getHookSize(hook);var yTopModifier=(hook.hasMobt()&&!hook.hasFlipped)?-2:0;return{top:{y:pos.top+yTopModifier,x:Math.round(pos.left+size.width/2)},bottom:{y:pos.top+size.height,x:Math.round(pos.left+size.width/2)}};},initHotZones:function(){var i,j,avoid,nodes;this.hotZones=[];avoid=['iframe','object','embed'];for(i=0;i<avoid.length;i++){nodes=document.getElementsByTagName(avoid[i]);for(j=nodes.length-1;j>=0;j--){var pos=$iTXT.core.Util.getPosition(nodes[j]);this.hotZones.push({top:pos.top,right:pos.left+nodes[j].offsetWidth,bottom:pos.top+nodes[j].offsetHeight,left:pos.left});}}
debug.drawHotZones(this.hotZones);},initScreenBounds:function(){var size=$iTXT.core.Util.getWindowSize(),scroll=$iTXT.core.Util.getPageScroll();this.scrTop=scroll[1];this.scrRight=scroll[0]+size.width;this.scrBottom=scroll[1]+size.height;this.scrLeft=scroll[0];},_getTooltipPlacement:function(hook){var center=this._getHookCenterPosition(hook);var places={};var shift=this.STEP_LENGTH_PX;var halfWidth=Math.round(this.ttWidth/2);var position={TOP:10,RIGHT:20,BOTTOM:30,LEFT:40};function placeCenter(pos){var place={},point=pos===position.TOP?center.top:center.bottom,yModifier=pos===position.TOP?-this.ttHeight:0;place.top=point.y+yModifier;place.left=point.x-halfWidth;place.bottom=place.top+this.ttHeight;place.right=place.left+this.ttWidth;place.damage=this.assessDamage(place);debug.draw(place,(pos===position.TOP?'itxtdebugac':'itxtdebugbc'));return place;}
function placeAside(pos,start){var coords={top:start.top,right:start.right,bottom:start.bottom,left:start.left},xModifier=pos===position.LEFT?-shift:shift,totalShift=0,damage=0,place;place={top:start.top,right:start.right,bottom:start.bottom,left:start.left,damage:Infinity};do{coords.left+=xModifier;coords.right+=xModifier;damage=this.assessDamage(coords);if(damage<place.damage){place.left=coords.left;place.right=coords.right;place.damage=damage;}
totalShift+=shift;}while(totalShift<halfWidth-this.TAIL_WIDTH&&damage);debug.draw(place,(pos===position.LEFT?'itxtdebugleft':'itxtdebugright'));return place;}
function bestPlacement(){var state,place,damageWeight=Infinity;for(state in places){if((places[state].damage/this.weight[state])<damageWeight){place=places[state];damageWeight=places[state].damage/this.weight[state];}}
debug.draw(place,'itxtdebugfinal');return place;}
places.AC=placeCenter.call(this,position.TOP);places.AC.state='AR';if(!places.AC.damage){return places.AC;}
places.AL=placeAside.call(this,position.LEFT,places.AC);places.AL.state='AL';if(!places.AL.damage){return places.AL;}
places.AR=placeAside.call(this,position.RIGHT,places.AC);places.AR.state='AR';if(!places.AR.damage){return places.AR;}
places.BC=placeCenter.call(this,position.BOTTOM);places.BC.state='BR';if(!places.BC.damage){return places.BC;}
places.BL=placeAside.call(this,position.LEFT,places.BC);places.BL.state='BL';if(!places.BL.damage){return places.BL;}
places.BR=placeAside.call(this,position.RIGHT,places.BC);places.BR.state='BR';if(!places.BR.damage){return places.BR;}
return bestPlacement.call(this);},assessDamage:function(coords){return this.offScreenDamage(coords)+this.burnDamage(coords);},offScreenDamage:function(coords){var nohit={},nohitArea,ttArea;nohit.top=coords.top<this.scrTop?this.scrTop:coords.top;nohit.right=coords.right>this.scrRight?this.scrRight:coords.right;nohit.left=coords.left<this.scrLeft?this.scrLeft:coords.left;nohit.bottom=coords.bottom>this.scrBottom?this.scrBottom:coords.bottom;ttArea=this.ttWidth*this.ttHeight;nohitArea=(nohit.right-nohit.left)*(nohit.bottom-nohit.top);return ttArea-nohitArea;},burnDamage:function(coords){var i,zone,totalDamage=0;function damage(zone){var overlap={};if((coords.bottom<zone.top||coords.top>zone.bottom)||(coords.right<zone.left||coords.left>zone.right)){return 0;}
overlap.top=zone.top<=coords.top?coords.top:zone.top;overlap.right=zone.right>=coords.right?coords.right:zone.right;overlap.bottom=zone.bottom>=coords.bottom?coords.bottom:zone.bottom;overlap.left=zone.left<=coords.left?coords.left:zone.left;debug.draw(overlap,'itxtdebugburn');return(overlap.bottom-overlap.top)*(overlap.right-overlap.left);}
for(i=this.hotZones.length-1;i>=0;i--){zone=this.hotZones[i];totalDamage+=damage(zone);}
return totalDamage;},place:function(opts){this.ttWidth=opts.tt.width;this.ttHeight=opts.tt.height;initDebug();debug.clear();this.initScreenBounds();this.initHotZones();if(opts.center===true){return this.placeOverHook(opts);}else{return this._getTooltipPlacement(opts.hk);}},placeOverHook:function(opts){var placement=this._getTooltipPlacement(opts.hk);var centerHook=this._getHookCenterPosition(opts.hk);var distance=centerHook.top.y-centerHook.bottom.y;var tail=opts.ttTailHeight+35;if(placement.state.indexOf('A')===0){placement.top=(placement.top-distance)+tail;placement.bottom=(placement.bottom-distance)+tail;}else{placement.top=(placement.top+distance)-tail;placement.bottom=(placement.bottom+distance)-tail;}
return placement;},getTopCenterPlacement:function(hook,dimensions){var pos;if(!(hook instanceof $iTXT.ui.Hook)||!VM._.isObject(dimensions)||!VM._.isNumber(dimensions.width)||!VM._.isNumber(dimensions.height)){return null;}
pos=this._getHookCenterPosition(hook);return{top:pos.top.y-dimensions.height,left:pos.top.x-Math.round(dimensions.width/2),state:'AL'};}};};$iTXT.js.loader["$iTXT.ui.TooltipTail"]=true;$iTXT.ui.TooltipTail_Load=function(){$iTXT.ui.TooltipTail=$iTXT.core.Class.create($iTXT.ui.ComponentBase,{options:null,width:30,height:18,init:function(_options,$super)
{var defOpts=$iTXT.core.Util.extend({id:"itxttail",height:18,bgcol:[],transparent:false},_options);$super(defOpts);this._build();this.resize();},getCenterLeft:function(){var a,b,c;var hkPos=$iTXT.core.Util.getCurrentPosition(this.advert.hook.rootElement);var hkWidth=this.advert.hook.rootElement.offsetWidth;a=hkPos.left-$iTXT.ui.tt.left;b=this.width/2;c=hkWidth/2;return Math.round(a-b+c);},setPositionState:function(ps)
{this.options.ps=ps;if($iTXT.ui.TooltipPosition.BL==ps||$iTXT.ui.TooltipPosition.BR==ps)
{var tmpl=this.advert.getTemplate();var tmplopts=(null!==tmpl)?(tmpl.options||{}):{};this.options.transparent=(tmplopts.transparenttoptail===true);}
else
{this.options.transparent=false;}
this._build();this.resize();},_build:function()
{if($iTXT.ui.tt.isAboveHook()){this.height=15;}else{this.height=18;}
this.rootElement.innerHTML="";var ttps=$iTXT.ui.TooltipPosition;var tail=$iTXT.core.Builder.make("div",{id:"itxt12_tail",className:"itxt12_tail itxt12_sprited"},[]);if(this.options.ps.charAt(0).toUpperCase()==='B'){tail.className+=' itxt12_tail_belowcenter';}else{tail.className+=' itxt12_tail_abovecenter';}
this.rootElement.itxtAppendChild(tail);},setAdvert:function(ad,$super)
{this.customBgCol=undefined;$super(ad);},tooltipOver:function()
{},tooltipOut:function()
{},getHeight:function($super)
{if(this.advert.getAdvertType()===155){return 0;}else{return $super();}}});};$iTXT.js.loader["$iTXT.ui_mobile.Tooltip"]=true;$iTXT.ui_mobile=$iTXT.ui_mobile||{};$iTXT.ui_mobile.Tooltip_Load=function(){$iTXT.ui_mobile.Tooltip=$iTXT.core.Class.create($iTXT.ui.Tooltip,{deviceWidth:0,zoom:2,orgZoomable:undefined,init:function(_options,$super)
{$iTXT.MOBILE=true;$super(_options);this.zIndex=9910000;this.updateDeviceScale();$iTXT.core.$(window).itxtSubscribe("resize",$iTXT.core.Event.bind(this,this.onResize));$iTXT.core.$(window).itxtSubscribe("orientationchange",$iTXT.core.Event.bind(this,this.onOrientationChange));$iTXT.core.$(document).itxtSubscribe("touchmove",$iTXT.core.Event.bind(this,this.onTouchMove));if($iTXT.data.al&&!this.params.getBool('nott',true)){$iTXT.data.al.allowHookClick=false;}},onResize:function()
{if(!this.isOpen)
{this.updateDeviceScale();}},onOrientationChange:function()
{this.updateDeviceScale();},updateDeviceScale:function()
{if(undefined!==window.orientation)
{var landscape=Math.abs(window.orientation)===90;this.deviceWidth=landscape?screen.height:screen.width;}
if(this.currentAdvert&&this.currentAdvert.template&&!this.currentAdvert.template.useProgressBar){this.scaleMask();}
this.scaleTooltip();this.placeTooltip();},build:function()
{$iTXT.core.$("itxtttholder").itxtSetStyle({webkitPerspective:"1000",webkitTransformStyle:"flat"});this.maskDiv=$iTXT.core.Builder.make("DIV",{style:"background-image: url(//images.intellitxt.com/ast/tt/mobile/bg_px.png);position:absolute; left: 0px; top: 0px;-webkit-user-select: none;-webkit-transform-style: flat;"});this.maskDiv.style.zIndex=this.zindex-100;this.maskDiv.itxtHide();this.maskDiv.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._maskClick));$iTXT.core.$("itxtttholder").appendChild(this.maskDiv);this.rootElement.itxtSetStyle({backgroundColor:this.options.bgcol,webkitBackfaceVisibility:"hidden",webkitBorderRadius:"5px",webkitBoxShadow:"0px 2px 8px #000000",zoom:this.zoom,zIndex:this.zIndex});this.chrome=new $iTXT.ui_mobile.TooltipChrome({ps:this.options.ps,bgcol:this.options.bgcol,draggable:this.options.draggable});this.chrome.build();this.addChild(this.chrome);this.content=new $iTXT.ui.TooltipContent({ps:this.options.ps,bgcol:this.options.bgcol});this.chrome.rootElement.appendChild(this.content.rootElement);this.rootElement.itxtSubscribe("touchmove",$iTXT.core.Event.bind(this,this.onTouchMove));},useProgressBar:function(){if(this.currentAdvert){var prog=this.currentAdvert&&this.currentAdvert.template&&this.currentAdvert.template.useProgressBar;var progpref=this.currentAdvert.params.getBool("lbox.bar.mobile",false);return prog&&progpref;}else{return false;}},onTouchMove:function(e)
{if(this.isOpen)
{e.preventDefault();return false;}},open:function()
{var prog=this.useProgressBar();$iTXT.core.$(document).itxtFire("$iTXT:tt:before:open");this.hide();this.content.hide();this.chrome.hide();if(!prog){this.scaleMask();this.rootElement.itxtSetStyle({backgroundColor:this.options.bgcol,webkitBackfaceVisibility:"hidden",webkitBorderRadius:"5px",webkitBoxShadow:"0px 2px 8px #000000",zoom:this.zoom,zIndex:this.zIndex});}else{this.rootElement.itxtSetStyle({border:"none",webkitBoxShadow:"none"});}
this.rootElement.itxtSetStyle({backgroundColor:this.options.bgcol});this.rootElement.itxtRemoveClass("minimise");this.placeTooltip();var metas=document.getElementsByTagName("meta");if(this.orgZoomable===undefined){if(!$iTXT.core.Browser.isPlatform(["Android"]))
{this.orgZoomable=true;for(var m in metas)
{if(metas[m].name=="viewport"&&metas[m].content.indexOf("user-scalable=no")>-1)
{this.orgZoomable=false;break;}}
if(this.orgZoomable)
{var meta=document.createElement("meta");meta.name="viewport";meta.content="user-scalable=no";document.getElementsByTagName("head")[0].appendChild(meta);}}}
this.setSize(null,null,false);},close:function(e)
{var prog=this.useProgressBar();var opts=e.data||{};$iTXT.core.$(document).itxtFire("$iTXT:tt:before:close");this.content.beforeClose();if(!$iTXT.core.Browser.isPlatform(["Android"]))
{if(this.orgZoomable)
{var metas=document.getElementsByTagName("meta");for(var m in metas)
{if(metas[m].name=="viewport"&&metas[m].content.indexOf("user-scalable=no")>-1)
{metas[m].content="user-scalable=yes";break;}}}}
if(!prog){this.rootElement.style.webkitTransitionTimingFunction="ease-out";this.rootElement.style.webkitTransitionDuration="0.3s";this.rootElement.style.webkitTransform=this.getRotateString();this.rootElement.style.opacity=0;window.setTimeout($iTXT.core.Event.bind(this,this._finishRotateClose),500);}else{this.hideTooltip();}},_contentLoaded:function()
{var prog=this.useProgressBar();if(!this.options.invisible)
{this.show();this.content.show();this.chrome.show();if(!prog){this.rootElement.style.opacity=0;}
var newSize=this.content.tryResize(null,null);this._setContentSize(newSize[0],newSize[1],0);var advertWidth=newSize[0]+100;this.placeTooltip();$iTXT.core.$(document).itxtFire("$iTXT:tt:ready");if(!prog){this.rootElement.style.webkitTransform=this.getRotateString();}
this.isOpen=true;this.openTS=(new Date()).getTime();if(!prog){this.content.hide();window.setTimeout($iTXT.core.Event.bind(this,this._fadeMask),50);}}
$iTXT.core.$(document).itxtFire("$iTXT:tt:after:open");},_fadeMask:function()
{this.maskDiv.itxtShow();window.setTimeout($iTXT.core.Event.bind(this,this._rotateOpen),250);},_rotateOpen:function()
{this.rootElement.style.webkitTransitionTimingFunction="ease-out";this.rootElement.style.webkitTransitionDuration="0.5s";this.rootElement.style.webkitTransform="rotateY(0deg)";this.rootElement.style.opacity=1;window.setTimeout($iTXT.core.Event.bind(this,this._finishRotateOpen),500);},_finishRotateOpen:function()
{this.content.show();},_finishRotateClose:function()
{this.hideTooltip();this.rootElement.style.webkitTransitionDuration="0";this.rootElement.style.webkitTransform="rotateY(360deg)";this.maskDiv.itxtHide();},_maskClick:function()
{this.chrome.defaultHeader.closeBtn.focus();$iTXT.core.$(document).itxtFire("$iTXT:tt:close:btn:click");},scaleTooltip:function()
{this.rootElement.style.webkitTransitionTimingFunction="";this.rootElement.style.webkitTransitionDuration="";},placeDesktopStyleTooltip:function(){var tailfudge=10;var el=this.currentAdvert.hook.rootElement.firstChild;if(el.childNodes.length>1){el=el.firstChild;}
if(this.currentAdvert.hook.mobtEnabled){el=this.currentAdvert.hook.mobtCover;}
var pos=$iTXT.core.Util.getPosition(el);this.setPosition((pos.left/this.zoom)-(this.width/2)+((el.offsetWidth/this.zoom)*0.5),(pos.top/this.zoom)-this.height+tailfudge);},placeTooltip:function()
{if(this.useProgressBar()){this.placeDesktopStyleTooltip();return;}
var winSize=$iTXT.core.Util.getWindowSize();var pageScroll=$iTXT.core.Util.getPageScroll();var screenWidth=screen.width;if(window.orientation==90||window.orientation==-90)
{screenWidth=screen.height;}
var zoomLevel;if(screenWidth<499)
{zoomLevel=$iTXT.glob.params.get("js.mobile.zoom.mobile",0.64);}
else{zoomLevel=$iTXT.glob.params.get("js.mobile.zoom.tablet",1.5);}
this.zoom=1/(screenWidth/window.innerWidth)*zoomLevel;this.rootElement.style.zoom=this.zoom;var leftPos=((winSize.width-this.width*this.zoom)/2)+pageScroll.x;var topPos=((winSize.height-this.height*this.zoom)/2)+pageScroll.y;this.rootElement.style.webkitTransitionTimingFunction="";this.rootElement.style.webkitTransitionDuration="";this.setPosition(leftPos/this.zoom,topPos/this.zoom);},scaleMask:function()
{if(this.maskDiv)
{var margin=$iTXT.core.$(document.body).itxtGetMargin();var padding=$iTXT.core.$(document.body).itxtGetPadding();var leftOff=margin.left+padding.left;var topOff=margin.top+padding.top;this.maskDiv.itxtSetStyle({marginLeft:(-leftOff)+"px",marginTop:(-topOff)+"px",width:(document.body.scrollWidth)+"px",height:(document.body.scrollHeight)+"px"});}},getRotateString:function()
{if($iTXT.core.Browser.isPlatform(["Android"])||!$iTXT.glob.params.getBool('js.mobile.spinEffectOn',true))
{return"";}
else
{return"rotateY(180deg)";}}});};$iTXT.js.loader["$iTXT.ui_mobile.TooltipChrome"]=true;$iTXT.ui_mobile=$iTXT.ui_mobile||{};$iTXT.ui_mobile.TooltipChrome_Load=function(){var undefined;$iTXT.ui_mobile.TooltipChrome=$iTXT.core.Class.create($iTXT.ui.TooltipChrome,{init:function(_options,$super)
{$super(_options);},build:function()
{this.contentBG=$iTXT.core.Builder.make("DIV",{backgroundColor:this.options.bgcol,id:"itxtcontentbg",className:"mobile"});this.contentBG.itxtSetStyle({backgroundColor:this.options.bgcol});this.rootElement.appendChild(this.contentBG);this.defaultHeader=this.header=new $iTXT.ui_mobile.TooltipHeader({draggable:false});this.header.build();this.addChildren([this.header]);this.rootElement.itxtSetStyle({webkitBorderBottomLeftRadius:"5px",webkitBorderBottomRightRadius:"5px"});this.contentBG.itxtSetStyle({webkitBorderBottomLeftRadius:"5px",webkitBorderBottomRightRadius:"5px"});},getFooterHeight:function()
{return 5;},resetPaddingAndBorder:function(){}});};$iTXT.js.loader["$iTXT.ui_mobile.TooltipHeader"]=true;$iTXT.ui_mobile=$iTXT.ui_mobile||{};$iTXT.ui_mobile.TooltipHeader_Load=function(){var undefined;$iTXT.ui_mobile.TooltipHeader=$iTXT.core.Class.create($iTXT.ui.OldTooltipHeader,{init:function(_options,$super)
{this.componentParams=$iTXT.core.Util.extend({'hdr.img.dir':'//images.intellitxt.com/ast/tt/mobile/','hdr.logo.mob':'${hdr.img.dir}vibrantLogo.png','hdr.close.btn.mob':'${hdr.img.dir}btn_close.png','hdr.info.btn.mob':'${hdr.img.dir}btn_moreInfo.png','hdr.share.btn.mob':'${hdr.img.dir}btn_share.png'},this.componentParams);var defOpts=$iTXT.core.Util.extend({height:44,vmLogoSrc:"${hdr.logo.mob}",closeBtnSrc:"${hdr.close.btn.mob}",infoBtnSrc:"${hdr.info.btn.mob}",shareBtnSrc:"${hdr.share.btn.mob}"},_options);$super(defOpts);},build:function()
{this.rootElement.itxtSetStyle({backgroundColor:"#000",overflow:"hidden",webkitBorderTopLeftRadius:"5px",webkitBorderTopRightRadius:"5px",lineHeight:this.options.height+"px",background:"-webkit-gradient(linear, 0% 0%, 0% 100%, from(#000000), to(#000000), color-stop(0,#858585),color-stop(0.05,#636363),color-stop(0.5,#202020),color-stop(0.5,#000), color-stop(0.95,#262626))"});var b=$iTXT.core.Builder;var h=this.options.height;this.closeBtn=b.make("DIV",{style:"width: "+h+"px;height: "+h+"px;float: right;background-image: url("+this.options.closeBtnSrc+");background-repeat:none;background-size:100%;"});this.closeBtn.itxtSubscribe("mouseover",function(){this.style.backgroundPosition="0px -"+h+"px";});this.closeBtn.itxtSubscribe("mouseout",function(){this.style.backgroundPosition="";});this.closeBtn.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._closeBtnClk));this.rootElement.appendChild(this.closeBtn);this.whatBtn=b.make("DIV",{style:"width: "+h+"px;height: "+h+"px;float: right;background-image: url("+this.options.infoBtnSrc+");background-repeat:none;background-size:100%;"});this.whatBtn.itxtSubscribe("mouseover",function(){this.style.backgroundPosition="0px -"+h+"px";});this.whatBtn.itxtSubscribe("mouseout",function(){this.style.backgroundPosition="";});this.whatBtn.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._whatBtnClk));this.whatBtnWrapper=$iTXT.core.Builder.make("A",{target:'_blank'},[this.whatBtn]);this.rootElement.appendChild(this.whatBtnWrapper);this.vmLogo=b.make("APNG",{style:"float: left; width:50px;",src:this.options.vmLogoSrc});this.vmLogo.itxtSubscribe("click",$iTXT.core.Event.bind(this,this._vmLogoBtnClk));this.vmLogoWrapper=$iTXT.core.Builder.make("A",{target:'_blank'},[this.vmLogo]);this.rootElement.appendChild(this.vmLogoWrapper);this.hdrTxtCont=b.make("DIV",{style:"float:left;color:#999;font-weight: regular;font-family: Helvetica,Verdana,Arial;font-size:14px;height:"+h+"px;line-height:"+h+"px;"},[this.options.hdrTxt]);this.rootElement.appendChild(this.hdrTxtCont);},_hdrDown:function(e)
{},_hdrUp:function(e)
{},_ubg:function(c)
{}});};