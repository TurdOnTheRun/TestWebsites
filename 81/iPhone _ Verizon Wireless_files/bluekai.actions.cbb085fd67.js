(function(global, $) {
	var App = global.App;
	var bk_addPageCtx = global.bk_addPageCtx;
	var bk_doJSTag = global.bk_doJSTag;
	var submitCartData = function() {
		if(typeof bk_addPageCtx === "undefined" || typeof bk_addPageCtx !== "function") {return;}
		var sObjDefined = ("object"===typeof s);
		bk_addPageCtx("prodView", (sObjDefined && typeof s.prodView!=='undefined')?s.prodView:''); //deviceID for 'OnEvents'
		bk_addPageCtx("products", (sObjDefined && typeof s.products!=='undefined')?s.products:'');
		bk_addPageCtx("events", (sObjDefined && typeof s.events!=='undefined')?s.events:'');
		bk_addPageCtx("se16", (sObjDefined && typeof s.eVar16!=='undefined')?s.eVar16:'');
		bk_addPageCtx("se34", (sObjDefined && typeof s.eVar34!=='undefined')?s.eVar34:'');
		bk_addPageCtx("se35", (sObjDefined && typeof s.eVar35!=='undefined')?s.eVar35:'');
		bk_addPageCtx("se36", (sObjDefined && typeof s.eVar36!=='undefined')?s.eVar36:'');
		bk_addPageCtx("se37", (sObjDefined && typeof s.eVar37!=='undefined')?s.eVar37:'');
		bk_addPageCtx("se38", (sObjDefined && typeof s.eVar38!=='undefined')?s.eVar38:'');
		
		if(typeof bk_doJSTag !== "undefined" && typeof bk_doJSTag === "function")  {
			bk_doJSTag(15915, 10);
		}
	};
	if(App && typeof App.helpers !== "undefined" && App.helpers.observer !== "undefined") {
		App.helpers.observer.subscribe("click.addToCart",global,function(data) {
			submitCartData();
		});
		App.helpers.observer.subscribe("click.checkout",global,function(data) {
			submitCartData();
		});
		/*$(document.body).on("click",".cartCTA",function(e) {
			App.helpers.observer.publish("click.addToCart", {element:this});
		});
		$(document.body).on("click",".checkoutCTA",function(e) {
			App.helpers.observer.publish("click.checkout", {element:this});
		});*/
	}
	window.submitPageLoadData = function() {
		window.submitPageLoadDataAttempts = window.submitPageLoadDataAttempts || 0;
		if(!(typeof s==="object" && typeof s.pageName!=="undefined" && typeof s.channel!=="undefined")){
			window.submitPageLoadDataAttempts++;
			if(submitPageLoadDataAttempts < 100){
				setTimeout(function(){window.submitPageLoadData();},100);
			}else{
				console.log('window.submitPageLoadDataAttempts exceeded 100');
			}
		}else{
		if(typeof bk_addPageCtx === "undefined" || typeof bk_addPageCtx !== "function") {return;}
		
		// CR 33916
		var queryPages = ['planListing','featureSetup','accessories','checkout'],
				thisPage = window.location.pathname.split('/').pop().split('.')[0],
				isQueryPage = queryPages.indexOf(thisPage)!=-1,
				hasQueryString = window.location.href.indexOf('?')!=-1,
				bk_queryStringNotice = isQueryPage && hasQueryString ? 'query' : '';
		bk_addPageCtx("sc1", bk_queryStringNotice);
		
		var sObjDefined = ("object"===typeof s);
		//Parameters eHash and mHash are only required when the user logs in their vzw account
		//eHash and mHash are the md5 hashed email address and mdn respectively for customer
		bk_addPageCtx("eHash", (typeof (eHash) !== 'undefined') ? eHash : '');
		bk_addPageCtx("mHash", (typeof (mHash) !== 'undefined') ? mHash : '');

		bk_addPageCtx("pagename", (sObjDefined && typeof s.pageName !== 'undefined') ? s.pageName : '');
		bk_addPageCtx("channel", (sObjDefined && typeof s.channel !== 'undefined') ? s.channel : '');
		bk_addPageCtx("prodView", (sObjDefined && typeof s.prodView!=='undefined')?s.prodView:'');
		bk_addPageCtx("products", (sObjDefined && typeof s.products!=='undefined')?s.products:'');
		bk_addPageCtx("events", (sObjDefined && typeof s.events!=='undefined')?s.events:'');
		
		bk_addPageCtx("sp1", (sObjDefined && typeof s.prop1 !== 'undefined') ? s.prop1 : '');
		bk_addPageCtx("sp2", (sObjDefined && typeof s.prop2 !== 'undefined') ? s.prop2 : '');
		bk_addPageCtx("sp3", (sObjDefined && typeof s.prop3 !== 'undefined') ? s.prop3 : '');
		bk_addPageCtx("sp10", (sObjDefined && typeof s.prop10 !== 'undefined') ? s.prop10 : '');
		bk_addPageCtx("sp11", (sObjDefined && typeof s.prop11 !== 'undefined') ? s.prop11 : '');
		bk_addPageCtx("sp19", (sObjDefined && typeof s.prop19 !== 'undefined') ? s.prop19 : '');
		bk_addPageCtx("sp20", (sObjDefined && typeof s.prop20 !== 'undefined') ? s.prop20 : '');
		bk_addPageCtx("sp21", (sObjDefined && typeof s.prop21 !== 'undefined') ? s.prop21 : '');
		bk_addPageCtx("sp22", (sObjDefined && typeof s.prop22 !== 'undefined') ? s.prop22 : '');
		bk_addPageCtx("sp24", (sObjDefined && typeof s.prop24 !== 'undefined') ? s.prop24 : '');
		bk_addPageCtx("sp26", (sObjDefined && typeof s.prop26 !== 'undefined') ? s.prop26 : ''); //deviceID for In-Market
		bk_addPageCtx("sp31", (sObjDefined && typeof s.prop31 !== 'undefined') ? s.prop31 : '');
		bk_addPageCtx("sp34", (sObjDefined && typeof s.prop34 !== 'undefined') ? s.prop34 : '');
		bk_addPageCtx("sp35", (sObjDefined && typeof s.prop35 !== 'undefined') ? s.prop35 : '');
		bk_addPageCtx("sp38", (sObjDefined && typeof s.prop38 !== 'undefined') ? s.prop38 : '');
		bk_addPageCtx("sp40", (sObjDefined && typeof s.prop40 !== 'undefined') ? s.prop40 : '');
		bk_addPageCtx("se6", (sObjDefined && typeof s.eVar6 !== 'undefined') ? s.eVar6 : '');
		bk_addPageCtx("se8", (sObjDefined && typeof s.eVar8 !== 'undefined') ? s.eVar8 : '');
		bk_addPageCtx("se9", (sObjDefined && typeof s.eVar9 !== 'undefined') ? s.eVar9 : '');
		bk_addPageCtx("se10", (sObjDefined && typeof s.eVar10 !== 'undefined') ? s.eVar10 : '');
		bk_addPageCtx("se12", (sObjDefined && typeof s.eVar12 !== 'undefined') ? s.eVar12 : '');
		bk_addPageCtx("se13", (sObjDefined && typeof s.eVar13 !== 'undefined') ? s.eVar13 : '');
		bk_addPageCtx("se16", (sObjDefined && typeof s.eVar16 !== 'undefined') ? s.eVar16 : '');
		bk_addPageCtx("se32", (sObjDefined && typeof s.eVar32 !== 'undefined') ? s.eVar32 : '');
		bk_addPageCtx("se34", (sObjDefined && typeof s.eVar34 !== 'undefined') ? s.eVar34 : '');
		bk_addPageCtx("se35", (sObjDefined && typeof s.eVar35 !== 'undefined') ? s.eVar35 : '');
		bk_addPageCtx("se36", (sObjDefined && typeof s.eVar36 !== 'undefined') ? s.eVar36 : '');
		bk_addPageCtx("se37", (sObjDefined && typeof s.eVar37 !== 'undefined') ? s.eVar37 : '');
		bk_addPageCtx("se38", (sObjDefined && typeof s.eVar38 !== 'undefined') ? s.eVar38 : '');
		bk_addPageCtx("se41", (sObjDefined && typeof s.eVar41 !== 'undefined') ? s.eVar41 : '');
		bk_addPageCtx("se42", (sObjDefined && typeof s.eVar42 !== 'undefined') ? s.eVar42 : '');
		bk_addPageCtx("se46", (sObjDefined && typeof s.eVar46 !== 'undefined') ? s.eVar46 : '');
		bk_addPageCtx("se52", (sObjDefined && typeof s.eVar52 !== 'undefined') ? s.eVar52 : '');

		global.bk_meta_vars = [ 'Type', 'Model', 'device_id' ];

		global.bk_allow_multiple_calls = true;
		
		if(typeof bk_doJSTag !== "undefined" && typeof bk_doJSTag === "function") {
			bk_doJSTag(15915, 10);
		}
		}
	};
	App.helpers.addLoadEventHandler(submitPageLoadData);
})(window,jQuery);
