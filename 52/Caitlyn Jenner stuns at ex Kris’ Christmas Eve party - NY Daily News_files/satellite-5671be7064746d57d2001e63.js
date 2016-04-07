_satellite.pushAsyncScript(function(event, target, $variables){
  //<img src="http://s3-pixel.c1exchange.com/pubpixel/84110" height="1" width="1" style="display:none;"></img>
var dtm_C1X = document.createElement('img');
  dtm_C1X.src = "http://s3-pixel.c1exchange.com/pubpixel/84110";
  dtm_C1X.width = "1";
  dtm_C1X.height = "1";
  dtm_C1X.setAttribute("style", "display:none");
var dtm_C1Xcomment = document.createComment("BlueKai Pixel Placed via DTM");
var dtm_loc = document.getElementById("nydn-footer");
//place this pixel directly following the footer

dtm_loc.parentNode.insertBefore(dtm_C1X, dtm_loc.nextSibling);
dtm_loc.parentNode.insertBefore(dtm_C1Xcomment, dtm_loc.nextSibling);
});
