!function(a,b,c){"use strict";function d(b,c){this.element=b,this.settings=a.extend(!0,{},h,c),this.ytPlayer=null,this._defaults=h,this._name=f,this._version=g,this.init()}function e(a,b){b.find("a").removeClass("selected"),a.addClass("selected")}var f="mediaGallery",g="1.0",h={selectors:{templates:'[data-section="templates"]',display:'[data-section="display"]',displayImage:'[data-media="image"]',displayVideo:'[data-media="video"]',nav:'[data-section="nav"]'},ytPlayer:{id:"",videoId:"",width:360,height:240},selectedClass:"selected"};a.extend(d.prototype,{init:function(){var d=this,f=a.extend({},h,d.settings),g=f.selectors,i=a(g.display),j=a(g.displayVideo),k=a(g.nav),l=a(g.templates),m=f.selectedClass,n=f.ytPlayer,o=d.ytPlayer,p="data-go";i.find(g.displayImage).attr("data-index",0),k.find("a").each(function(b,d){var f=a(d);f.attr("data-index",b).on("click",function(d){d.preventDefault();var f,h,n,q=a(this);if(void 0!==q.attr(p))return void(c.location.href=q.attr("href"));if(!q.hasClass(m)){if(h=i.find("div[data-index="+q.data("index")+"]"),n=q.data("media"),e(q,k),"video"===n)a(g.displayImage).hide(),j.show();else if(0===h.length){if(f=l.find(g.displayImage),0===f.length)throw new Error("Display image template missing!");h=f.clone(),i.append(h),h.attr("data-index",b).find("a").attr({href:q.data("href"),title:q.attr("title")}).find("img").attr({src:q.attr("href"),alt:q.attr("alt"),title:q.attr("title")})}o&&o.hasOwnProperty("getPlayerState")&&1===o.getPlayerState()&&o.pauseVideo(),h.show().siblings().hide()}})}),b.createPlayer(n).then(function(a){o=a})}}),a.fn[f]=function(b){return this.each(function(){a.data(this,"plugin_"+f)||a.data(this,"plugin_"+f,new d(this,b))})}}(jQuery,Viator.YouTube,window);