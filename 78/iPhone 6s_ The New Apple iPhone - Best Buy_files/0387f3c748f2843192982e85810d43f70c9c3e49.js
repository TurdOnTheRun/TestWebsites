define('survey-code/wait-script',['require'],function(require){
    return function(url){
		var interval;

		/* ready does jquery's document.ready, but without jquery. */
		var ready = function(cb) {
			if (document.readyState === "complete") {
				cb();
			} else {
				document.onreadystatechange = function() {
					if (document.readyState === "complete") {
						cb();
					}
				};
			}
		};

		/* fire really just redirects the page */
		var fire = function() {
			window.location.href = url;
		};

		/* poll checks if we still have access to the parent
		when we lose access to our opener, then fire */
		var poll = function() {
			try {
				var n = window.opener.location.href;
			} catch(e) {
				clearInterval(interval);
				fire();
			}
		}

		ready(function(){
			interval = setInterval(poll, 5000);
		});
	}
});

define('dust-loader',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

;define("dust-loader!survey-code/invite_en",function(){return function(dust){var tmpl = (function(dust){dust.register("survey-code\/invite_en",body_0);function body_0(chk,ctx){return chk.w("<div id=\"survey_window\"><div id=\"survey_border\"><div id=\"survey_header\"><div id=\"bbylogodiv\"><img id=\"bby\" src=\"http://images.bestbuy.com/BestBuy_US/js/survey/bbylogo.png\" alt=\"BestBuy Logo\"></div></div><div id=\"survey_content\"><div class=\"survey_bold survey_larger\">We'd like your feedback!</div><br><div>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.</div><br><div class=\"survey_bold\">The survey is designed to measure your entire site experience and so will/may appear at the end of your visit.</div><br></div><div id=\"survey_footer\"><button id=\"survey_invite_yes\" title=\"Yes, I would like to take the survey\">Yes, I'd like to take the survey!</button><button id=\"survey_invite_no\" class=\"survey_button\" value=\"no\" title=\"No, thanks\">No, thanks.</button></div></div></div>");}body_0.__dustBody=!0;return body_0}(dust));;var f = function(ctx,cb){if (!cb) throw new Error("wrong number of args for render");return dust.render(tmpl, ctx, cb);};f.template=tmpl;return f;}});

;define("dust-loader!survey-code/invite_es",function(){return function(dust){var tmpl = (function(dust){dust.register("survey-code\/invite_es",body_0);function body_0(chk,ctx){return chk.w("<div id=\"survey_window\"><div id=\"survey_border\"><div id=\"survey_header\"><div id=\"bbylogodiv\"><img id=\"bby\" src=\"http://images.bestbuy.com/BestBuy_US/js/survey/bbylogo.png\" alt=\"BestBuy Logo\"></div></div><div id=\"survey_content\"><div class=\"survey_bold survey_larger\">¡Nos gustaría conocer sus comentarios!</div><br><div>Gracias por visitar nuestro sitio. Ha sido seleccionado al azar para participar en una encuesta de satisfacción del cliente para hacernos saber de qué manera podemos mejorar su experiencia con el sitio web.</div><br><div class=\"survey_bold\">Esta encuesta fue diseñada para evaluar su experiencia completa en el sitio y aparecerá al final de su visita.</div><br></div><div id=\"survey_footer\"><button id=\"survey_invite_yes\" class=\"survey_button\" value=\"yes\" title=\"Sí\">¡Sí, quiero participar en la encuesta!</button><button id=\"survey_invite_no\" class=\"survey_button\" value=\"no\" title=\"No\">No, gracias</button></div></div></div>");}body_0.__dustBody=!0;return body_0}(dust));;var f = function(ctx,cb){if (!cb) throw new Error("wrong number of args for render");return dust.render(tmpl, ctx, cb);};f.template=tmpl;return f;}});

;define("dust-loader!survey-code/wait_en",function(){return function(dust){var tmpl = (function(dust){dust.register("survey-code\/wait_en",body_0);function body_0(chk,ctx){return chk.w("<!DOCTYPE html><html><head><title>Survey - Watch</title><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><style type=\"text/css\">#survey_body {background-color: #003b64; /*bbyBlueColor*/padding: 0px;}#survey_window {background-color: #003b64; /*bbyBlueColor*/padding: 10px;}#survey_border {font-family: Verdana, Helvetica, Sans-Serif;font-size: 12px;background-color: #ffffff;padding: 10px;border-radius: 10px;-moz-border-radius: 10px;}#survey-header {height: 65px;vertical-align: top;display: block;padding-bottom: 10px;}#bbylogodiv {float: left;width: 100px;height: 60px;text-align: left;}#bby {width: 80px;height: 54px;}#surveylogodiv {float: right;width: 100px;height: 60px;text-align: right;}#confirmit {width: 93px;height: 60px;}#survey_content {clear: both;}.survey_bold {font-weight: bold;}.survey_larger {font-size: larger;}.survey_smaller {font-size: smaller;}#survey_footer {text-align: center;}.survey_button {margin: 5px;height: 25px;border: #003b64 thin outset; /*bbyBlueColor*/-moz-border-radius: 5px;border-radius: 3px;background-color: #1646a8; /*blueShirtBlueColor*/color: #ffffff;cursor: pointer;}.survey_button:hover {background-color: #fff200; /*bbyYellowColor*/border: #003b64 thin inset; /*bbyBlueColor*/color: #231f20; /*blackColor*/}</style></head><body id=\"survey_body\"><div id=\"survey_window\"><div id=\"survey_border\"><div id=\"survey_header\"><div id=\"bbylogodiv\"><img id=\"bby\" src=\"http://images.bestbuy.com/BestBuy_US/js/survey/bbylogo.png\" alt=\"BestBuy Logo\"></div></div><div id=\"survey_content\"><div class=\"survey_bold survey_larger\">Please leave this window open.</div><br><div>This is part of the customer satisfaction survey you agreed to take on this site. Thank you for helping us improve your website experience.</div><br><div class=\"survey_bold\">Continue to browse the site as you normally would. Once you are finished with your site visit, the survey will appear.</div><br><div id=\"survey_footer\"><div>&copy;").f(ctx.get(["fullYear"], false),ctx,"h").w("- all rights reserved</div><br></div></div></div></div></body><script>(").f(ctx.get(["waitFn"], false),ctx,"h",["s"]).w(")(").f(ctx.get(["redirectURL"], false),ctx,"h",["js","s"]).w(");</script></html>");}body_0.__dustBody=!0;return body_0}(dust));;var f = function(ctx,cb){if (!cb) throw new Error("wrong number of args for render");return dust.render(tmpl, ctx, cb);};f.template=tmpl;return f;}});

;define("dust-loader!survey-code/wait_es",function(){return function(dust){var tmpl = (function(dust){dust.register("survey-code\/wait_es",body_0);function body_0(chk,ctx){return chk.w("<!DOCTYPE html><html lang=\"es\"><!-- mp_trans_page_translate false --><head><title>Encuesta - Reloj</title><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><meta http-equiv=\"Content-Language\" content=\"es\" /><style type=\"text/css\">#survey_body {background-color: #003b64; /*bbyBlueColor*/padding: 0px;}#survey_window {background-color: #003b64; /*bbyBlueColor*/padding: 10px;}#survey_border {font-family: Verdana, Helvetica, Sans-Serif;font-size: 12px;background-color: #ffffff;padding: 10px;border-radius: 10px;-moz-border-radius: 10px;}#survey-header {height: 65px;vertical-align: top;display: block;padding-bottom: 10px;}#bbylogodiv {float: left;width: 100px;height: 60px;text-align: left;}#bby {width: 80px;height: 54px;}#surveylogodiv {float: right;width: 100px;height: 60px;text-align: right;}#confirmit {width: 93px;height: 60px;}#survey_content {clear: both;}.survey_bold {font-weight: bold;}.survey_larger {font-size: larger;}.survey_smaller {font-size: smaller;}#survey_footer {text-align: center;}.survey_button {margin: 5px;height: 25px;border: #003b64 thin outset; /*bbyBlueColor*/-moz-border-radius: 5px;border-radius: 3px;background-color: #1646a8; /*blueShirtBlueColor*/color: #ffffff;cursor: pointer;}.survey_button:hover {background-color: #fff200; /*bbyYellowColor*/border: #003b64 thin inset; /*bbyBlueColor*/color: #231f20; /*blackColor*/}</style></head><body id=\"survey_body\"><div id=\"survey_window\"><div id=\"survey_border\"><div id=\"survey_header\"><div id=\"bbylogodiv\"><img id=\"bby\" src=\"http://images.bestbuy.com/BestBuy_US/js/survey/bbylogo.png\" alt=\"BestBuy Logo\"></div></div><div id=\"survey_content\"><div class=\"survey_bold survey_larger\">No cierre esta ventana.</div><br><div>Esto es parte de la encuesta de satisfacción del cliente que usted aceptó realizar en este sitio. Gracias por ayudarnos a mejorar su experiencia en el sitio web.</div><br><div class=\"survey_bold\">Continúe navegando por el sitio como lo hace normalmente. Una vez que finalice su visita en el sitio, aparecerá la encuesta.</div><br><div id=\"survey_footer\"><div>&copy;").f(ctx.get(["fullYear"], false),ctx,"h").w("- todos los derechos reservados</div><br></div></div></div></div></body><script>(").f(ctx.get(["waitFn"], false),ctx,"h",["s"]).w(")(").f(ctx.get(["redirectURL"], false),ctx,"h",["js","s"]).w(");</script></html>");}body_0.__dustBody=!0;return body_0}(dust));;var f = function(ctx,cb){if (!cb) throw new Error("wrong number of args for render");return dust.render(tmpl, ctx, cb);};f.template=tmpl;return f;}});
define('less-loader',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

;define("less-loader!survey-code/main",function(){
var inject = function inject(css) {
		var head = document.getElementsByTagName('head')[0];

		var currentStyle = document.createElement('style');
		currentStyle.type = 'text/css';
		head.appendChild(currentStyle);

		if (currentStyle.styleSheet) {
		  currentStyle.styleSheet.cssText += css;
		}
		else {
		  currentStyle.appendChild(document.createTextNode(css));
		}
	}
 inject("#survey_window{background-color:#003b64;padding:10px}#survey_border{background-color:#fff;padding:10px;border-radius:10px}#bbylogodiv{float:left;width:100px;height:60px}#bby{width:80px;height:54px}#surveylogodiv{float:right;width:100px;height:60px}#confirmit{width:93px;height:60px}#survey_content{font-size:12px;clear:both}.survey_larger{font-size:13px}.survey_bold{font-weight:bold}.survey_smaller{font-size:11px}#survey_footer{text-align:center}.survey_button{color:#fff;cursor:pointer;border-radius:3px;height:25px;margin:5px;border:#003b64 thin outset;background-color:#004691}");
});
define('survey-code/main',['require','lodash','dust','sc-persistence-manager/javascript/persistence-manager','sc-meta-layer/javascript/metaLayer','cookieManager','jquery','jquery.colorbox','./wait-script','dust-loader!./invite_en','dust-loader!./invite_es','dust-loader!./wait_en','dust-loader!./wait_es','less-loader!./main'],function(require){
	var _ = require("lodash");
	var dust = require("dust");
	var pm = require("sc-persistence-manager/javascript/persistence-manager");
	var meta = require("sc-meta-layer/javascript/metaLayer");
	var cm = require("cookieManager");
	var $ = require("jquery");
	require("jquery.colorbox");

	var waitScriptFn = require("./wait-script");
	var invite_en = require("dust-loader!./invite_en")(dust);
	var invite_es = require("dust-loader!./invite_es")(dust);
	var wait_en = require("dust-loader!./wait_en")(dust);
	var wait_es = require("dust-loader!./wait_es")(dust);
	require("less-loader!./main");

	var surveyURLS = {
		en: "http://survey.confirmit.com/wix/p2037721124.aspx",
		es: "http://survey.confirmit.com/wix/p2091469847.aspx"
	};

	var lang = $("html").attr("lang") === "es" ? "es" : "en"; // detect `en` or `es` default to `en`

	var waitTmpl   = lang === "es" ? wait_es : wait_en;
	var inviteTmpl = lang === "es" ? invite_es : invite_en;
	var surveyURL  = lang === "es" ? surveyURLS.es : surveyURLS.en;
	var timeout = null;

	function shouldFire() {
		var $html = $("html");
		var isIE8 = $html.hasClass("ie8");
		var isIE9 = $html.hasClass("ie9");
		var isIE10 = $html.hasClass("ie10");
		var isAcceptablePage = !!(dioPageData && dioPageData.pageType && dioPageData.pageType.match(/browse/ig));
		var isNonSSL = (document.location.protocol !== "https:");
		var isLargeView = !!document.cookie.match("rdp=l");

		if (!isIE8 && !isIE9 && !isIE10 && isAcceptablePage && isNonSSL && isLargeView) {
			return true;
		}
		else {
			return false;
		}
	}

	// getCookie returns the cookie with `name` or an empty string
	function getCookie(name){
		return cm.get(name) || "";
	}

	// getTrackProp returns the track/meta property `name` or an empty string
	function getTrackProp(name) {
		var v = meta.get(name);
		if (typeof v === "undefined") v = "";
		return v;
	}

	// displayModal launches a modal dialog with `html` as content
	function displayModal(html) {
		$.colorbox({
			html: html,
			closeButton: false,
			innerWidth: 610,
			onClosed: function() {
				setSurveyDisabled()
			}
		});
	}

	// killModal destroys the modal dialog
	function destroyModal() {
		setSurveyDisabled();
		$.colorbox.close();
	}

	// set survey_disabled cookie
	function setSurveyDisabled() {
		pm.set("survey_disabled", "true", {expires: 60 * 24 * 30}); // only once per 30 days if survey is shown
	}

	var surveyQueryParams = {

		// cookie vals
		TLSessionId: getCookie("SID"),
		Id: getCookie("s_vi"),
		SessionID: getCookie("olspsessid"),
		abTestCSI: getCookie("abTestCSI"),

		// track (meta layer?) vals
		bbyKeyWords: getTrackProp("searchTerm"), 
		CartProds: getTrackProp("skuList"),
		OrderDate: getTrackProp("sysDate"),
		OrderId: getTrackProp("orderId"),
		paymentType: getTrackProp("payTypeList"),
		ProfileId: getTrackProp("profileId"),
		rzId: getTrackProp("rzId"),
		rzTier: getTrackProp("rzTier"),
		isCloud: getTrackProp("isCloud"),

		// other
		src: window.location.href

	};

	$(document.body).click(function(e){
		if (e.target.id === "survey_invite_yes") {
			if(EventManager && EventManager.trigger) {
				EventManager.trigger('analytics:survey:accept');
			}
			popWaitWindow();
		} else if (e.target.id === "survey_invite_no") {
			// nothing to be done
		} else {
			return;
		}
		destroyModal();
	});

	// fire should launch the modal prompt asking the user to participate in the survey
	function fire() {
		var ctx = {};
		if (!shouldFire()) return;
		inviteTmpl(ctx, function(err,html){
			if (err) {
				console.error(err);
				return;
			}
			displayModal(html);
		});
	}

	// popWaitWindow should launch the wait window, injecting HTML (the wait template) into it
	function popWaitWindow() {
		var w = window.open("about:blank", "_blank", "height=375,width=600,resizable=yes,scrollbars=yes");
		var query = _.map(surveyQueryParams, function(val, key){ return key + "=" + encodeURIComponent(val); }).join("&");
		var url = surveyURL + "?" + query;
		var ctx = {
			redirectURL: url,
			fullYear: new Date().getFullYear(),
			waitFn: waitScriptFn.toString()
		};
		waitTmpl(ctx, function(err, html){
			if (err) {
				console.error(err);
				return;
			}
			var doc = w.document.open();
			doc.write(html);
			doc.close();
		});
	}

	return {
		popWaitWindow: popWaitWindow,
		fire: fire,
		conditionalFire: function() {
			// test hash
			if(window.location.hash.indexOf('#surveytest') > -1) {
				fire();
				return;
			}
			pm.get("survey_disabled").then(function (surveyDisabled) {
				if(surveyDisabled) return;
				if (!shouldFire()) return;
				if (_.random(1, 40) === 1) {
					fire();
				}
			});
		},
	};

});

(function(){
	function ready(cb) {
		if (document.readyState === "complete") {
			cb();
		} else {
			document.onreadystatechange = function(){
				if (document.readyState === "complete") {
					cb();
				}
			};
		}
	}

	ready(function(){
		require(["survey-code/main"], function(survey){
			survey.conditionalFire();
		});
	});

})();

define("survey-code/init", function(){});

