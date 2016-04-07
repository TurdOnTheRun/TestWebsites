(function() {
	
	var css,
		html = "",
		moduleHeader= "TeamStream Content",
		options = {"fb":"true","uk":"false","featured_only":"true","items":"3","width":"300"},
		fbpage = "https://www.facebook.com/bleacherreport",
		article  = null,
		articles = [{"image":"http://img.bleacherreport.net/img/images/photos/003/588/592/0178d952ac2a622daba8fa714e286e61_crop_exact.jpg?w=145&h=95&q=75","url":"http://bleacherreport.com/articles/2630621-blue-jays-lose-after-jose-bautista-is-ruled-out-at-2nd-on-chase-utley-rule","title":"Jays Lose After Bautista Is Ruled Out at 2nd on 'Chase Utley Rule'"},{"image":"http://img.bleacherreport.net/img/images/photos/003/588/586/fd7a76ec4086ec1cf03e35aa810ade6e_crop_exact.jpg?w=145&h=95&q=75","url":"http://bleacherreport.com/articles/2630614-sixers-fans-shower-carl-landry-with-mvp-chants-in-win-vs-pelicans","title":"Sixers Fans Shower Landry with 'MVP!' Chants in Win vs. Pelicans"},{"image":"http://img.bleacherreport.net/img/images/photos/003/588/585/41bbcd3f785b5ad5ca1110e39ee0ceb6_crop_exact.jpg?w=145&h=95&q=75","url":"http://bleacherreport.com/articles/2630613-marlins-rf-giancarlo-stanton-hits-monster-hr-off-tigers-p-justin-verlander","title":"Stanton Hits Monster HR off Tigers P Verlander"}],
		getWidgetDisplay = function (displayMode) {
			var result = "";
			if (displayMode === "0") {
				result = "noThumbnails";
			} else if (displayMode === "1") {
				result = "firstThumbnail";
			} else {
				result = "allThumbnails";
			}
			return result;
		},
		shouldDisplayImage = function(displayMode, index) {
			if (displayMode === "0") {
				return false;
			} else if (displayMode === "1" && index > 0) {
				return false;
			} else {
				return true;
			}
		};

	if(articles.length) {
		css = document.createElement("link");
		css.setAttribute("href", "http://bleacherreport.com/stylesheets/partners/teamstream_widget.css");
		css.setAttribute("rel", "stylesheet");

		document.getElementsByTagName("head")[0].appendChild(css);

		var widgetDisplay = getWidgetDisplay(options.thumbnail);
		html += '<ul class="' + widgetDisplay + '">';

		for(var i = 0, l = Math.min(articles.length, options.items); i < l; i++) {
			article = articles[i];
			html += '<li>';

			if(article.image && shouldDisplayImage(options.thumbnail, i)) {
				html += '<a href="' + article.url + '" class="br-image"><img src="' + article.image + '" alt=""></a>';
			}

      		html += '<a href="' + article.url + '">' + article.title + '</a><div class="br-clear"></div></li>';
		}

		html += '</ul>';
		if (options.fb != "false") {
			html += '<div class="fbpage"><a href="'+fbpage+'"><span>Like B/R to Get More Stories</span></a></div>';
		}
		
		document.onreadystatechange = function () {
			if (document.readyState === "complete"){
				document.getElementById("br-teamstream-advanced-content").innerHTML = html;
			}
		}
		
	}
})();
