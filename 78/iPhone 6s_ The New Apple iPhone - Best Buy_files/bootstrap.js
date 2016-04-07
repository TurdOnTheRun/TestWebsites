var eventContext={
eventId:"bootstrap",
data:{
bsdata:{
newState:{
"state": "p_s1",
"fsmname":"primary_fsm",
"subFlowInProgress":false,
"resetSubFSMIdx":0,
"primaryFSMStateIdx":-1,
"flowDeviation":false,
"resetPrimaryFSMStartIdx":-1,
"resetPrimaryFSMEndIdx":-1
}
,
vi:"72c84792-eded-4cde-a046-dc6486b176f7",
ti:"default_tarjet",
tp:"3",
rt:45.02,
mui:5,
uilt:31536000,
wtlt:3600,
wslt:604800,
vilt:31536000,
vclt:604800,
exlt:31536000,
aslt:3600,
rnlt:7776000,
smplscope:"as",
rvlt:604800,
startRE:true,
serverTimeStamp:1460005786230,
clientTimeZoneOffset:0,
vg:"13",
rv:76.325,
bootstrapCachingOn:false,
trackableEvtCfgs:{
bbyWeblogConfig:{
ruleVarsToTrack:"n",
variables:[
{
key:"a",
scope:"r"
},
{
key:"c",
scope:"r"
},
{
key:"p",
scope:"r"
},
{
key:"r",
scope:"r"
},
{
key:"t",
scope:"r"
},
{
key:"u",
scope:"r"
},
{
key:"v",
scope:"r"
}]}},
trackableEventIds:{
100001:{
config:"bbyWeblogConfig"}
},
updates:[{key:"c", strategy:"o",expr:"var a = { catId:(function() { \
return parent.SN.MetaLayer.getPageContextVars(\"catId\");\
})(),catName:(function() { \
return parent.SN.MetaLayer.getPageContextVars(\"catName\");\
})(),parentCatName:(function() { \
return parent.SN.MetaLayer.getPageContextVars(\"parentCatName\");\
})(),uberCatName:(function() { \
return parent.SN.MetaLayer.getPageContextVars(\"uberCatName\");\
})(),ra:(function(){\
    var trackObject = parent.window.track;\
    if(trackObject && trackObject.rating){\
       return trackObject.rating;\
     } else{\
       return null;\
     }\
 })(),pt:(function(){\
    var trackObject = parent.window.track;\
    if(trackObject && trackObject.pageType){\
       return trackObject.pageType;\
     } else{\
       return null;\
     }\
 })(),psc:(function(){\
    var trackObject = parent.window.track;\
    if(trackObject && trackObject.parentCatName){\
       return trackObject.parentCatName;\
     } else{\
       return null;\
     }\
 })(),c31:SN.CustomScript.getProductReview(),rev:(function(){\
    var trackObject = parent.window.track;\
    if(trackObject && trackObject.reviewsNum){\
       return trackObject.reviewsNum;\
     } else{\
       return null;\
     }\
 })(),fpn:(function(){\
    var trackObject = parent.window.track;\
    if(trackObject && trackObject.skuNamesShort){\
       return trackObject.skuNamesShort;\
     } else{\
       return null;\
     }\
 })(),ppc:(function(){\
    var trackObject = parent.window.track;\
    if(trackObject && trackObject.uberCatName){\
       return trackObject.uberCatName;\
     } else{\
       return null;\
     }\
 })(),ls:(function(){\
    var trackObject = parent.window.track;\
    if(trackObject && trackObject.user_recognized){\
       return trackObject.user_recognized;\
     } else{\
       return null;\
     }\
 })()}; a;",scope:"r",
rollingcount:0,
mappedvariables:[
]
},
{key:"a", strategy:"o",expr:"var a = { qu:SN.CustomScript.getChatQueue()}; a;",scope:"r",
rollingcount:0,
mappedvariables:[
]
},
{key:"t", strategy:"o",expr:"var a = { c16:(function() { \
  var jq=parent.jQuery;\
  return (jq ? jq('.item-price.item-regprice').text().trim() : null);\
})(),c17:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.cartMPDevice').map(function () {\
    return jq.trim(jq(this).text());\
}).toArray().join('|') : null);\
})(),c18:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('#cartPlanDeschdr + table').find('tr:first th:last').text().replace(/n*/g, '') : null);\
})(),c19:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('#cartPlanDeschdr + table + table').find('tr:first th:last').text().replace(/n*/g, '') : null);\
})(),c20:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.product-model-number').map(function () {\
    return jq.trim(jq(this).text().replace('Model:', ''));\
}).toArray().join('|') : null);\
})(),c22:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.product-offers li').map(function () {\
    return jq.trim(jq(this).text().replace(/n*/g, ''));\
}).toArray().join('|') : null);\
})(),c23:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.product-label').map(function () {\
    return jq.trim(jq(this).text().replace(/n*/g, ''));\
}).toArray().join('|') : null);\
})(),c24:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.price').map(function () {\
    return jq.trim(jq(this).text().replace(/n*/g, ''));\
}).toArray().join('|') : null);\
})(),na:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.product-summary-label').map(function () {\
    return jq.trim(jq(this).text());\
}).toArray().join('|') : null);\
})(),pr:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.css-cartPriceBlockRight.cart-total-price.cart-product-price-total').text().trim() : null);\
})(),qt:$cookieGet('CartItemCount')}; a;",scope:"r",
rollingcount:0,
mappedvariables:[
]
},
{key:"u", strategy:"o",expr:"var a = { do:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('input:checked[name*=\"shiporpickup\"]').serialize().replace('&', '|') : null);\
})(),pm:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('input[name=paymentType]').serialize().indexOf('paypal') != -1 ? 'PP' : 'CC' : null);\
})(),sc:SN.CustomScript.getShippingCharge() || null,so:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq.trim(jq('.bby-shippingMethod').find('option:selected').text().replace('n', '|')) : null);\
})(),st:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq.trim(jq('.cart-subtotal-price').text()) : null);\
})(),tx:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq.trim(jq('.cart-total-price .cart-tax-est').text() !== '' ? jq('.cart-total-price .cart-tax-est').text() : jq('.bdt-salesTax').text()) : null);\
})()}; a;",scope:"r",
rollingcount:0,
mappedvariables:[
]
},
{key:"r", strategy:"o",expr:"var a = { c02:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.css-mt-mpb-help').find('table').text().replace(/s+/g, ' ').split(/Monthly Charges Plans|sServicess/)[1] : null);\
})(),c1:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq.trim(jq('.seller_info').closest('dd').text()) : null);\
})(),c10:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('#financing ul li:eq(0)').text().trim() : null);\
})(),c11:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.fsdi-cardholder-offers').text().replace(/n*/g, '') : null);\
})(),c12:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.css-mt-planset-title').map(function () {\
    return jq.trim(jq(this).text());\
}).toArray().join('|') : null);\
})(),c13:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq(':input[type=radio]:checked').map(function () {\
    return jq.trim(jq(this).next().text());\
}).toArray().join('|') : null);\
})(),c14:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.sku').map(function () {\
    return jq.trim(jq(this).text());\
}).toArray().join('|') : null);\
})(),c15:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq('.savingsnum').text().trim() : null);\
})(),c3:$cookieGet('campaign'),dp:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq.trim(jq('.salenum').text()) : null);\
})(),pc:parent.sclsname,pi:parent.productId,pm:SN.CustomScript.getProductModel(),pn:SN.CustomScript.getProductName(),sk:SN.CustomScript.getProductSKU(),pp:SN.CustomScript.getProductPrice(),pr:SN.CustomScript.getProductRating(),tp:(function() {\
  var jq=parent.jQuery;\
  return (jq ? jq.trim(jq('.cart-product-price-total').text()) : null);\
})()}; a;",scope:"r",
rollingcount:0,
mappedvariables:[
]
},
{key:"v", strategy:"o",expr:"var a = { au:typeof parent.guestUser != undefined && parent.guestUser == 'false' ? 'signedin' : 'guest',ct:$geoCity(),co:$geoCountry(),ip:$geoIPAddress(),isp:$geoIsp(),org:$geoOrganization(),zip:$geoPostalCode(),rv:$isRepeatVisitor() ? 1 : 0,na:SN.CustomScript.getCurPageNavPath(),vc:SN.CustomScript.getVCCount(),wr:$geoRegion()}; a;",scope:"r",
rollingcount:0,
mappedvariables:[
]
},
{key:"p", strategy:"o",expr:"var cookiejar=new SN.CookieManager();var a = { c28:cookiejar.getDataFromVC('cartFlag'),c29:cookiejar.getDataFromVC('deliveryFlag'),dd:parent.document.domain,ti:parent.document.title,cp:unescape(parent.document.location.href),re:unescape(parent.document.referrer)}; a;",scope:"r",
rollingcount:0,
mappedvariables:[
]
}],
poll:10,
geo:{
location:{
"country":"United States",
"countryCode":"US",
"region":"New York",
"city":"New York Mills",
"zipcode":"13417",
"lat":"43.10020446777344",
"lon":"-75.29560089111328",
"metro":"526",
"area":"315",
"tz":"America/New_York"},
isp:{
"geoPrivateIp":"10.229.83.93",
"name":"Road Runner",
"ip":"74.71.4.239",
"org":"Road Runner"}}
},
ruledata:{
}

}
};
SN.EventManager.fire("pageevent",eventContext);