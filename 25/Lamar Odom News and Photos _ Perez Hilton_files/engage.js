!function(){function a(a){var b=document.createElement("script");b.setAttribute("src",a),b.setAttribute("type","text/javascript"),b.setAttribute("async","true"),(document.getElementsByTagName("head")[0]||document.body).appendChild(b)}function b(){for(var a,b=window.location.search,c={},d=/\+/g,e=/([^&=]+)=?([^&]*)/g,f=function(a){return decodeURIComponent(a.replace(d," "))},g=b.substring(1);a=e.exec(g);)c[f(a[1])]=f(a[2]);return c}function c(a){var b="local.antenna.is"===window.location.hostname,c="true"===a.antennaDebug,d=b?"http://local-static.antenna.is:8081":"https://www.antenna.is";return c?d+"/static/widget-new/debug/antenna.js":d+"/static/widget-new/antenna.min.js"}function d(a){var b="local.antenna.is"===window.location.hostname,c="true"===a.antennaDebug,d=b?"http://local-static.antenna.is:8081":"https://www.antenna.is";return c?d+"/static/engage_full.js":d+"/static/engage.min.js"}var e=b(),f=d(e),g=c(e),h=g;if("true"!==e.antennaDisabled){if("true"===e.antennaNewWidget)h=g;else if("true"===e.antennaOldWidget)h=f;else for(var i=[],j=window.antenna_host||window.location.hostname,k=0;k<i.length;k++){var l=i[k];if(-1!==j.indexOf(l.domain)){h=100*Math.random()<l.percentage?g:f;break}}a(h)}}();