var __kx_ad_viewable=__kx_ad_viewable||{};var __kx_ad_impression_ids=__kx_ad_impression_ids||{};var __kx_lock=__kx_lock||0;var __kx_lock_ad_slot=__kx_lock_ad_slot||{};var __kx_start_time=__kx_start_time||new Date().getTime();var __kx_load_time=__kx_load_time||[];var __kx_y_offset=__kx_y_offset||[];var __kx_creative_base_ids=__kx_creative_base_ids||[];function __kx_report_err(err){try{var url="//ad.kixer.com/error.php?err="+ encodeURIComponent(err);var xmlhttp=new XMLHttpRequest();xmlhttp.open("GET",url,true);xmlhttp.withCredentials="true";xmlhttp.send();}catch(e){}}
var __kx_viewability={el:null,user_id:null,init:function(el,impression_id,ad_slot,user_id){this.el=el;if(user_id){this.user_id=user_id;}
if(typeof __kx_ad_impression_ids[ad_slot]==='undefined'){__kx_ad_impression_ids[ad_slot]=impression_id;}
if(this.timeoutBased()){setTimeout(function(){__kx_viewability.check(1);},100);}else if(typeof __kx_view_manual!=='undefined'){if(__kx_ad.is_debug()){var info="Manual viewability";console.log(info);}
if(typeof __kx_view_listener!=='undefined'){window.document.addEventListener(__kx_view_listener,function(){__kx_viewability.process_locked(ad_slot);if(__kx_ad.is_debug()){var info="Manual viewability event fired";console.log(info);}});}else{__kx_viewability.process_locked(ad_slot);if(__kx_ad.is_debug()){var info="Manual viewability event fired";console.log(info);}}}else{this.addObservers(ad_slot);this.check(1);}
return this;},timeoutBased:function(){if(typeof __kx_viewability_settimeout!=='undefined'){return __kx_viewability_settimeout;}else{return 0;}},scrollEl:function(){if(typeof __kx_scroll_class!=='undefined'){return document.getElementsByClassName(__kx_scroll_class)[0];}else if(typeof __kx_scroll_id!=='undefined'){return document.getElementById(__kx_scroll_id);}else{return window;}},addObservers:function(ad_slot_id){var el;el=__kx_viewability.scrollEl();el.addEventListener('scroll',__kx_viewability.throttledLoad);el.addEventListener('resize',__kx_viewability.throttledLoad);},removeObservers:function(){var el;el=__kx_viewability.scrollEl();el.removeEventListener('scroll',__kx_viewability.throttledLoad,false);el.removeEventListener('resize',__kx_viewability.throttledLoad,false);},throttleTimer:new Date().getTime(),throttledLoad:function(e){var now=new Date().getTime();if((now- __kx_viewability.throttleTimer)>=100){__kx_viewability.throttleTimer=now;__kx_viewability.check(1);}},check:function(setTimer){var rc;if(__kx_lock==0){__kx_lock=1;for(var ad_slot in __kx_ad_impression_ids){if(__kx_lock_ad_slot[ad_slot]){continue;}
rc=__kx_viewability.check_slot(__kx_ad_viewable[ad_slot],ad_slot);if(rc){if(setTimer){setTimeout(function(){__kx_viewability.check(0);},900);}else{__kx_viewability.process(ad_slot);}}}
__kx_lock=0;}
if(__kx_viewability.timeoutBased()){setTimeout(function(){__kx_viewability.check(1);},100);}},process_locked:function(ad_slot_id){if(__kx_lock==0){__kx_lock=1;if(__kx_viewability.contains(__kx_ad_viewable,ad_slot_id)){__kx_viewability.process(ad_slot_id);}
__kx_lock=0;}},process:function(ad_slot_id){__kx_viewability.call_ajax(ad_slot_id);delete __kx_ad_impression_ids[ad_slot_id];},contains:function(obj,element){for(i in obj){if(obj.hasOwnProperty(i)){if(i==element)
return true;}}
return false;},is_empty:function(obj){var name;for(name in obj){return false;}
return true;},check_slot:function(el_id,ad_slot){var scrollY;var position;var pageHeight=window.innerHeight||document.documentElement.clientHeight;if(typeof __kx_scroll_class==='undefined'&&typeof __kx_scroll_id==='undefined'){scrollY=window.pageYOffset||document.documentElement.scrollTop;}else{var scrollEl=__kx_viewability.scrollEl();scrollY=scrollEl.scrollTop;var pageHeightTmp=scrollEl.clientHeight;if(pageHeight>pageHeightTmp){pageHeight=pageHeightTmp;}}
var el=document.getElementById(el_id);var el_top=get_offset_top(el);var height=el.clientHeight||0;if(height>=pageHeight){position=el_top+ Math.floor(el.offsetHeight/4);}else{position=el_top+ Math.floor(el.offsetHeight/2);}
var rangeHeight=pageHeight;__kx_y_offset[ad_slot]=el_top;var range={min:scrollY,max:scrollY+ rangeHeight};if((position>=range.min)&&(position<=range.max)){if(__kx_ad.is_debug()){var info="Loaded: "+el_id+" Position: "+position+" Height: "+height+" Min: "+range.min+" Max: "+range.max;console.log(info);}
return 1;}else{if(__kx_ad.is_debug()){var info=el_id+" Position: "+position+" Height: "+height+" Min: "+range.min+" Max: "+range.max;console.log(info);}}
return 0;},url_get:function(ad_slot){var time=new Date().getTime();var impression_id=__kx_ad_impression_ids[ad_slot];var load_time=__kx_ad.load_time(ad_slot);var view_time=__kx_viewability.view_time(time);var y_offset=__kx_y_offset[ad_slot];var d=new Date();var gmt_offset=d.getTimezoneOffset();gmt_offset*=-1;var canonical_url=__kx_ad.get_canonical_url();var url="//ad.kixer.com";if(typeof __kx_url!=='undefined'){url=__kx_url;}
url=url+"/ad/view/"+impression_id+"?load_time="+load_time+"&view_time="+view_time+"&y_offset="+y_offset+"&gmt_offset="+gmt_offset+"&user_id="+this.user_id;if(typeof __kx_is_swipe!=='undefined'){url=url+"&refresh=1";}
if(canonical_url){url=url+"&canonical_url="+ canonical_url;}
return url;},call_ajax:function(ad_slot){var xmlhttp;var url;var el=document.getElementById(__kx_ad.div_id_get(ad_slot));if(document.createEvent){var evObj=document.createEvent('HTMLEvents');evObj.initEvent('load',true,false);el.dispatchEvent(evObj);}else if(document.createEventObject){el.fireEvent('load');}
if(__kx_ad.is_debug()){var info="Firing viewability";console.log(info);}
xmlhttp=new XMLHttpRequest();url=this.url_get(ad_slot);xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){__kx_viewability.process_ajax(xmlhttp.responseText);}};xmlhttp.open("GET",url,true);xmlhttp.withCredentials="true";xmlhttp.send();},process_ajax:function(json){},view_time:function(time){return time- __kx_start_time;}};var __kx_ad={init:function(){},load_slot:function(slot){this.call_ajax(slot);},call_ajax:function(slot){var xmlhttp;var url;xmlhttp=new XMLHttpRequest();url=this.url_get(slot);xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){var ct=xmlhttp.getResponseHeader("content-type")||"";if(ct.indexOf("json")>-1){__kx_ad.process_ajax(xmlhttp.responseText,1);}}};xmlhttp.onTimeout=function(){__kx_ad.call_ajax(slot);};xmlhttp.open("GET",url,true);xmlhttp.timeout=0;xmlhttp.withCredentials="true";xmlhttp.send();},process_ajax:function(json,count){var obj;var div;var slot;var script;var impression_id;var user_id;obj=JSON.parse(json);slot=obj.slot;if(count==1){__kx_load_time[slot]=new Date().getTime();}
impression_id=obj.impression_id;if(typeof __kx_ad_impression_ids[slot]==='undefined'){__kx_ad_impression_ids[slot]=impression_id;}
div=this.div_get(slot);div.innerHTML=obj.html;script=obj.script;eval.call(window,script);if(typeof obj.creative_base_ids!=='undefined'){__kx_creative_base_ids=obj.creative_base_ids;}
user_id=obj.user_id;if(user_id&&window.localStorage){localStorage.setItem("kixer::user_id",user_id);}
this.viewability=__kx_viewability.init(div,impression_id,slot,user_id);if(obj.scrape_page){this.scrape_page();}},scrape_page:function(){try{var xmlhttp=new XMLHttpRequest();var url="//ad.kixer.com/ad/scraper.php";var page_url=decodeURIComponent(this.get_canonical_url());var content=(typeof __kx_scrape_selector=='undefined')?document.body.innerHTML:document.querySelector(__kx_scrape_selector).innerHTML;var scraped_data={scrape_url:page_url,scrape_content:content};var scraped_data_string="json_string="+ encodeURIComponent(JSON.stringify(scraped_data));xmlhttp.open("POST",url,true);xmlhttp.timeout=0;xmlhttp.withCredentials="true";xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");xmlhttp.send(scraped_data_string);}catch(e){__kx_report_err(e);}},url_get:function(slot){var d=new Date();var gmt_offset=d.getTimezoneOffset();gmt_offset*=-1;var canonical_url=this.get_canonical_url();var domain=this.get_domain();var url="//ad.kixer.com";var append="";var width;var height;if(typeof __kx_url!=='undefined'){url=__kx_url;}
url=url+"/ad/"+slot;if(typeof __kx_url_append!=='undefined'){if(Array.isArray(__kx_url_append)&&typeof __kx_url_append[slot]!=="undefined"){append=__kx_url_append[slot];}else{append=__kx_url_append;}
append+="&gmt_offset="+gmt_offset;}else{append="gmt_offset="+gmt_offset;}
if(window.localStorage){var user_id=localStorage.getItem("kixer::user_id");if(user_id){append+="&user_id="+user_id;}}
if(canonical_url){append+="&canonical_url="+canonical_url;}
if(domain){append+="&domain="+domain;}
width=this.width_get();height=this.height_get();if(width){append+="&width="+width;}
if(height){append+="&height="+height;}
url=url+"?"+ append;return url;},div_get:function(slot){var div_id=this.div_id_get(slot);return document.getElementById(div_id);},div_id_get:function(slot){var el=document.getElementById('__kx_ad_'+slot);if(el!=null){return'__kx_ad_'+slot;}else{return'__mom_ad_'+slot;}},width_get:function(){return window.innerWidth||document.documentElement.clientWidth;},height_get:function(){return window.innerHeight||document.documentElement.clientHeight;},is_android:function(){return navigator.userAgent.match(/Android/i);},is_ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},is_mobile:function(){if(this.is_debug()){return 1;}
return(this.is_android()||this.is_ios());},is_debug:function(){if(typeof __kx_debug!=='undefined'){return __kx_debug;}
var debug_param="kx_debug";var url=document.URL;var base=url.split('?');if(base.length<=1){return 0;}
var params=base[1].split('&');for(var i=0;i<params.length;i++){var key_value=params[i].split('=');if(key_value[0]==debug_param){return parseInt(key_value[1]);}}
return 0;},load_time:function(slot){return __kx_load_time[slot]- __kx_start_time;},get_domain:function(){if(typeof __kx_domain!=='undefined'){found=__kx_domain;}else{return 0;}
return encodeURIComponent(found);},get_canonical_url:function(){try{var found="";var canonical=window.document.querySelector("link[rel='canonical']");var opengraph=window.document.querySelector("meta[property='og:url']");if(canonical){found=canonical.href;}else if(opengraph){found=opengraph.content;}
if(typeof __kx_canonical!=='undefined'){found=__kx_canonical;}
return encodeURIComponent(found);}catch(e){__kx_report_err(e);}}};function load_script(url,callback){var head=document.getElementsByTagName('head')[0];var script=document.createElement('script');script.type='text/javascript';script.src=url;script.onreadystatechange=callback;script.onload=callback;head.appendChild(script);}
function json_present(callback){if(typeof JSON!=='object'){load_script("//cdn.kixer.com/lib/json2.js",callback);return 0;}
return 1;}
function get_offset_top(el){var val=0;if(el.offsetParent){do{val+=el.offsetTop;}while(el=el.offsetParent);return val;}}
function __mom_ad_start(){var slot;if(!__kx_ad.is_mobile()){return;}
if(!json_present(function(){__mom_ad_start()})){return;}
__kx_ad.init();while(slot=__mom_ad_slots.pop()){__kx_ad.load_slot(slot);__kx_ad_viewable[slot]="__mom_ad_"+slot;}}
function __kx_ad_start(){var slot;if(!__kx_ad.is_mobile()){return;}
if(!json_present(function(){__kx_ad_start()})){return;}
__kx_ad.init();while(slot=__kx_ad_slots.pop()){__kx_ad.load_slot(slot);__kx_ad_viewable[slot]="__kx_ad_"+slot;}}
document.addEventListener('__kx_view_event',function(e){if(typeof __kx_ad_impression_ids[e.detail.ad_slot_id]!=='undefined'){__kx_ad_impression_ids[e.detail.ad_slot_id]=e.detail.tracking_id_full;}else{__kx_viewability.init(e.detail.el,e.detail.tracking_id_elements,e.detail.ad_slot_id,null);}},false);