/**
* @namespace rhiPaginationHandler
* @desc Global container for custom ABC News pagination
* @param {function} $ Namespaced jQuery (ezQuery)
*/
var rhiPaginationHandler = (function($) {
	"use strict";
	return {
		/**
		* @name _config
		* @desc Default configuration values.
		*/
		_config : {
			storedPageId : "",
			num : 10,
			requests: 1,
			totalNum: 500,
			mediaType : "",
			resultsTarget : "",
			pagesTarget : "#bottom-pagination",
			resultsUri : "http://abcnews.ramp.com/topic-more-results-pagelet",
			pagesUri : "http://abcnews.ramp.com/pagination-pagelet",
			addType : "append",
			pageNum : 1,
			useScroll : true,
			scrollBottomOffset : 100
		},
		/**
		* @name _currentPage
		* @desc Records current page for hiding items already in DOM that are of different page number.
		*/
		_currentPage : 1,
		/** 
		* @name _persist
		* @desc Boolean to meter URI requests.
		*/
		_persist : true,
		/**
		* @name startInd
		* @desc Sets start index.
		* @returns index
		*/
		startInd : function() {
			var self = this;
			if(self._config.requests > 1){
			  self._config.start = (parseInt(self._config.start) + parseInt(self._config.num));
			}
			else if (self._config.start > parseInt(self._config.totalNum) && parseInt(self._config.totalNum - self._config.num) > 0) {
				self._config.start = parseInt(self._config.totalNum);
			}
			else{
				self._config.start = parseInt(self._config.start);
			}
			return self._config.start;
		},
		/**
		* @name scrollTo
		* @desc Scrolls to specific page start index 
		* @param {integer} pageStartInd scrolls to given pageStartIndex.
		* @param {integer} pageNum Page number to be applied to url page cgi arg.
		*/
		scrollTo : function(pageStartInd, pageNum) {
			var self = this;
			if(pageStartInd == 1 && pageNum < self._config.requests){
				$('html, body').animate({
					scrollTop: parseInt($(".ez-searchMod-filters").offset().top)
				}, 1000);
			}
			else if(pageStartInd > 1 && pageNum > self._config.requests){
			    for (var i = self._config.requests; i < pageNum ; i++) {
					self._doAjax(self._config.requests + 1);
					self._config.requests++;
				};
			}
			else{
				$('html, body').animate({
					scrollTop: parseInt($(".rhi-start-" + parseInt(pageStartInd - 1) + ":first").position().top)
				}, 1000);
		    }
			self.updateBrowserState(pageNum);
			return false;
		},
		/**
		* @name _isCompat
		* @desc Checks browser for required utilities.
		* @returns Boolean
		*/
		_isCompat : function() {
			if (typeof window.history.pushState === "function" && $) {
				return true;
			};
			return false;
		},
		/**
		* @name updateBrowserState
		* @desc Will add cgi arg page and page number to window.location.href if page cgi is not avaliable,
		* if page cgi arg is already present in url it's value is going to replaced with corresponding value
		* @param {integer} requests is the page number to be applied to url page cgi arg
		*/
		updateBrowserState : function(requests) {
			var self = this;
			if (self._isCompat()) {
				var newUrl = self.updateQueryStringParam("page",requests);
				if(window.location.search){
					window.history.replaceState({}, "", newUrl);
			    }
				else{
					window.history.pushState({path:newUrl},'',newUrl);
				}
			};
		},
		/**
		* @name updateQueryStringParam
		* @desc updates the query string param value
		* @param {string} param which is "page" param in query string.
		* @param {integer} value which is page value which will be incremented for each ajax request.
		*/
		updateQueryStringParam : function(param, value) {
			var newUrl;
			if(window.location.search){
				var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
				    urlQueryString = document.location.search,
				    newParam = param + '=' + ((typeof value === 'undefined') ? "" : value),
				    params = '&' + newParam,
				    keyRegex = new RegExp('([\?&])' + param + '[^&]*');
				// If param exists already, update it
				if (urlQueryString.match(keyRegex) !== null) {
				    params = urlQueryString.replace(keyRegex, "$1" + newParam);
				} else { // Otherwise, add it to end of query string
				    params = urlQueryString + '&' + newParam;
				}
				var preUrl =  baseUrl + params,
					newUrl = ((typeof value === 'undefined') ? encodeURIComponent(preUrl) : preUrl);
		    }
		    else{
		    	var preUrl = window.location.href + ((window.location.href.indexOf('?') == -1) ? '?page=' : 'page='),
		    	    newUrl = ((typeof value === 'undefined') ? encodeURIComponent(preUrl) : preUrl+value);
		    }
			return newUrl;
		},
		/**
		* @name onSuccess
		* @desc When the AJAX call is successful the requests are incremented and
		*		html is appended.
		* @param {string} html HTML that is appended to the target.
		*/
		onSuccess : function(html) {
			var self = this;
			$(self._config.spinner).hide();
			$(self._config.resultsTarget).append(html);
		},
		/**
		* @name updateItems
		* @desc When the item returned from topics API is video then video overlay icon is going to be added.
		* @param {string} pageStartIndClass is the class name which tells us to which set of videos we have to add video overlay icon.
		*/
		updateItems: function(pageStartIndClass){
			$("."+pageStartIndClass+".ez-itemMod-item.ez-Video .ez-thumbs a").each(function() {
		        $('<div class="ez-plainOverlay"></div>').appendTo($(this));
			});
		},
		/**
		* @name _doAjax
		* @desc Performs GET request using topics API.
		* @param {number} requests is used to check whether we have page cgi arg present in url 
		*/
		_doAjax : function(requests) {
			var self = this;
			if(self._persist){
				$(self._config.spinner).show();
				self._config.start = self.startInd();
				self._config.pageNum = self._config.requests;
				$.ajax({
					url : self._config.resultsUri
							+ "?pageid=" + self._config.storedPageId
							+ "&start=" + self._config.start
							+ "&page=" + self._config.pageNum
							+ "&mediatype=" + self._config.mediaType,
					cache : false,
					success : function(html) {
						self.onSuccess(html);
						if (typeof requests === 'undefined') {
							self._config.requests++;
							self.updateBrowserState(self._config.requests);
						};
						self._config.pageNum = self._config.requests;
					},
					error : function() {
						self._persist = false;
						$(self._config.spinner).hide();
					}
				}).done(function(){
					var pageNumber = ((typeof requests === 'undefined') ? self._config.requests : self._config.pageNum);
					self._doPaginationAjax(pageNumber, self._config.start);
					self._persist = true;
				})
	        }
		},
		/**
		* @name _doPaginationAjax
		* @desc Performs GET request using pagination paglet.
		* @param {integer} start_index defines specific page start index.
		* @param {integer} pageNumber Page number to be applied to url page cgi arg.
		*/
		_doPaginationAjax : function(pageNumber,start_index) {
			var self = this;
			$.ajax({
				url : self._config.pagesUri
						+ "?pageid=" + self._config.storedPageId
						+ "&page=" + pageNumber
						+ "&start=" + start_index
						+ "&mediatype=" + self._config.mediaType
						+ "&pageurl=" + self.updateQueryStringParam("page"),
				cache : false,
				success : function(html) {
					var source = $('<div>' + html + '</div>');
					$(self._config.pagesTarget).empty();
					$(self._config.pagesTarget).append(source.find('#bottom-pagination').html());
				},
				error : function() {
					self._persist = false;
				}
			});
		},
		/**
		* @name _append
		* @desc Adds supplied content to target in DOM.
		* 		Will also empty target innerHTML.
		* @param {object} {string} content HTML to be added to target - may be a string or jQuery object.
		* @param {string} target CSS selector of HTML target.
		* @param {Boolean} emptyTarget Boolean to indicate if HTML target should have its innerHTML removed before adding new content.
		*/
		_append : function(content,target,emptyTarget) {
			if (! content && target) {
				return;
			};
			if (emptyTarget) {
				$(target).empty();
			};
			if (content && target) {
				$(target)[this._config.addType](typeof content === "string" ? content : $(content));
			};
		},
		/**
		* @name _parseUrl
		* @desc If CGI arg "page" contains a numeric value, automatically request more results.
		*/
		_parseUrl : function(pagenum) {
			var self = this;
			for (var i = 1; i < pagenum ; i++) {
				self._config.requests = i;
				self._doAjax(self._config.requests);
				self._config.requests++;
			};
		},
		/**
		* @name _handleScroll
		* @desc Page scroll handler - executes pagination.
		*/
		_handleScroll : function() {
			var self = this,
				scrollBottomOffset = $(document).height()
					- $(self._config.pagesTarget).offset().top
					- $(self._config.pagesTarget).height(),
				fire = function() {
					return $(window).scrollTop()
						+ window.innerHeight
						>= $(document).height()
						- parseInt(scrollBottomOffset);
				};
			
			$(window).scroll(function(e) {
				if (fire() && self._persist && self._config.requests < self._config.pagesToScroll) {
					self._doAjax();
					self._persist = false;
				};
			});		
		},
		/**
		* @name _bind
		* @desc Binds custom handler for pagination hyperlinks and window for scroll (if enabled).
		*/
		_bind : function() {
			var self = this;
			$(this._config.pagesTarget).delegate("a",(/mobile|tablet/.test(navigator.userAgent) ? "touchstart" : "click"),function(el) {
				el.preventDefault();
			});
			if (this._config.useScroll) {
				this._handleScroll();
			};
		},
		/**
		* @name persist
		* @desc Called by more results pagelet response to indicate if more results are available.
		* @param {Boolean} bool Indicates if there are additional results or not.
		*/
		persist : function(bool) {
			if (typeof bool === "boolean") {
				this._persist = bool;
			};
			return this;
		},
		/**
		* @name init
		* @desc Initializes pagination script by setting configuration overrides and
		* 		makes request for more items if "page" CGI arg exists and has a valid value.
		* @param {object} config Configuration object.
		*/
		init : function(config) {
			if (! this._isCompat() || ! config) {
				return;
			};
			this._config = $.extend({},this._config,config);
			if(this._config.pageNum){
				this._parseUrl(this._config.pageNum);
			};
			this._bind();
		}
	};

})(ezQuery);
