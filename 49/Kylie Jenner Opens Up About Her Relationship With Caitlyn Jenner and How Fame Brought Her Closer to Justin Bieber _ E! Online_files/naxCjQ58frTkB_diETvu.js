(function(){
  var i = new Image();
  var engineKey = "naxCjQ58frTkB_diETvu";

  var params = '?url=' + encodeURIComponent(window.location.href);
  params += '&engine_key=' + engineKey;

  if (document.referrer != "") { params += "&r=" + encodeURIComponent(document.referrer); }

  i.src = "//cc.swiftype.com/cc" + params;
})();
