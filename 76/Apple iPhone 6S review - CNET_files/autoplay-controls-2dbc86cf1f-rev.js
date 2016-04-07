define(["jquery","managers/client-storage","version!fly/managers/debug","managers/tealium","managers/page-vars","version!fly/components/base","components/product-review-video"],function(t,a,e,i,n){e=e.init("autoplayControls"),t.widget("cnet.autoplayControls",t.fly.base,{options:{clickElement:null,onText:"Autoplay: ON",offText:"Autoplay: OFF"},autoplayEnabled:"off",_create:function(){this._setup();var t=navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Kindle/i)||navigator.userAgent.match(/Silk/i),e=navigator.userAgent.match(/iPhone/i),i=navigator.userAgent.match(/iPad/i),n=navigator.userAgent.match(/BB10/i)&&navigator.userAgent.match(/Mobile/i);t||e||i||n||(this.autoplayEnabled=a.read("autoplayEnabled"),this._init(),this._setupEvents())},_init:function(){null==this.autoplayEnabled&&(this.autoplayEnabled="on",this._setAutoplay(this.autoplayEnabled)),"on"==this.autoplayEnabled?(this._setAutoplay(this.autoplayEnabled),this._startVideo()):this._setAutoplay(this.autoplayEnabled)},_setupEvents:function(){var t=this;this.$element.find(".autoplayOn").text(this.options.onText),this.$element.find(".autoplayOff").text(this.options.offText),this.$element.find(".autoplayOn").click(function(a){t._setAutoplay("off",a)}),this.$element.find(".autoplayOff").click(function(a){t._setAutoplay("on",a)})},_setAutoplay:function(t,e){e=e||null,autoplay="on"==t?!0:!1,autoplay?(this.$element.find(".autoplayOn").addClass("visible"),this.$element.find(".autoplayOff").removeClass("visible"),this.$element.addClass("visible")):(this.$element.find(".autoplayOn").removeClass("visible"),this.$element.find(".autoplayOff").addClass("visible"),this.$element.removeClass("visible")),a.write("autoplayEnabled",t),this.autoplayEnabled=t,e&&this._trackAutoplayToggle(e)},_startVideo:function(){if(this.options.clickElement)try{var a=this.$element.parent().attr("data-component");"cnetVideo"==a&&this.$element.parent()[a]("initPopOut"),t(this.options.clickElement).productReviewVideo("toggleVideo","autoplay",!1)}catch(e){this._waitForInit()}},_waitForInit:function(){e.log("_waitForInit"),window.setTimeout(t.proxy(this._startVideo,this),250)},_trackAutoplayToggle:function(t){var a=this;i.trackCustomEvent("autoplayToggle",{levtType:"ria",event:"log",mapp:"reviews4505",comp:"autoplayControls",comptyp:"click",riaevent:"click",pageType:n.tracking.data.pageType,brand:n.tracking.data.brand,siteEdition:n.tracking.data.siteEdition,siteType:n.tracking.data.siteType,deviceType:n.tracking.data.deviceType,siteSection:n.tracking.data.siteSection,_pageChannelType:n.tracking.data._pageChannelType,articleId:n.tracking.data.articleId,articleTitle:n.tracking.data.articleTitle,articleType:n.tracking.data.articleType,siteHier:n.tracking.data.siteHier,_pageTitle:n.tracking.data._pageTitle,clickGenericText:"on"==a.autoplayEnabled?"autoplayon":"autoplayoff"},"trackClick")}})});