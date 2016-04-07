//Ensighten has this defined for some MV pages, but per Ensighten team this needs to be overwritten as empty function on .com
_hbLink = function () {};
function vzwSiteCatalystWrapper(scobject) {
	var sep = "/";
	var evtSep = ",";
	var host = "";
	var pageUrl = "";
	var sc = scobject;
	//var scBackup = null;
	var businessFlag = "";
	var adapterValid = true;
	var v = null;
	if (!v) {
		adapterValid = false
	}
	var debugSelf = false;
	this.init = function(debugMe) {
	};
	this.setPageName = function(name) {
	};
	this.setPageNameNoChannel = function(name) {
	};
	/**
	* propName (string) Case Sensitive. must be a site catalyst property (i.e. prop11, eVar75 or channel) found on the sc object.
	* newValue (string | number | null) the value you're setting the property to be.
	**/
	this.setProperty = function(propName,newValue) {
	};
	/**
	* propName (string) Case Sensitive. must be a site catalyst property (i.e. prop11, eVar75 or channel) found on the sc object.
	**/
	this.getProperty = function(propName) {
		return  null;
	};
	this.addEvent = function (eventName) {
		return "";
	};
	this.removeEvent = function (eventName) {
		return "";
	};
	this.setValue = function(name, value) {
	};
	this.getValue = function(name) {
	};
	this.setProductView = function(sku_qty_price) {
	};
	this.buildProductsViewString = function(products, category, sku, qty, price) {
		return "";
	};
	this.setProcessFlowMetrics = function(flowState, flowName_19, flowType_20,
			flowInteraction_21) {
	};
	this.determineValuesFlowMetrics = function(pageName, pageType, flowFlag,flowTypeFlag, flowInteractionFlag, flowState,
			lastIndexFlowInteraction) {
	};
	this.getPathFromMLC = function(mlc) {
		return "";
	};
	this.getProductsFromMLC = function(mlc) {
		return "";
	};
	this.previousPage = function() {
	};
	this.submitData = function(errorOccurred) {
			return;
	};
	this.submitDataAsync = function(pageName, pageType, channel, error) {
	};
	this.trackLink = function(name, type) {
	};
	this.setGlobalIdForOverlayPages = function() {
	};
	this.setRsBusinessFlag = function(flagValue) {
	};
	this.replace = function(a) {
		return a;
	};
	this.simpleReplace = function(a) {
		return a;
	};
	this.replaceSlash = function(a) {
		return a;
	};
	this.getEvents = function() {
		return "";
	};
	this.clearValuesOnChangeView = function() {
	};
	this.submitStaticPageData = function(channel, pageType, pageName) {
	};
	this.getCookieValue = function(cookieName) {
		return  "";
	};
	var addedFeatures = {};
	this.addFeatureProduct = function(sku,quantity,price) {
	}
	
	this.removeFeatureProduct = function(sku) {
		return false;
	};
	
	function showMsg(msg) {
		//alert(msg)
	}
	function validAdobeSiteCatalystObject() {
			return false;
	}
	function trimLeadingSlash(string) {
		return (string.substr(0, 1) === "/") ? string.substr(1) : string;
	}
	function setPathTransaction(name) {
	}
	function isProductionServer() {
	}
	function removeWhiteSpaces(str) {
		if (str != null && str != "") {
			str = str.replace(new RegExp(/^\s+/), "");
			str = str.replace(new RegExp(/\s+$/), "");
		}
		return str;
	} 
	function IsStringValid(str) {
		return (str != null && str != undefined && removeWhiteSpaces(str).length > 0);
	}
	function ClearError() {

	}
	function echoInvalidSiteCatalystObject() {
		//alert("vzwScAdapter: Invalid Adobe Sitecatalyst Object")
	}
	function cleanHTMLtags(productString) {
		productString = productString.replace(/<\/*\w*>/g, "");
		productString = productString.replace(/\s/g, "");
		productString = productString.replace(/<.*>.*(.*)/g, "");
		return productString;
	}
	function clearDuplicateEvents() {
	}
	function cleanProductString() {
	}
}
var vzwSc = new vzwSiteCatalystWrapper({});

