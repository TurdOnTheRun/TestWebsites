/************************************************************************************************************************
Liquid Pinning scripting object
Copyright 2012 E! Networks / NBCUniversal. All Rights Reserved.
US and International Patents Pending

TO USE: Include this script and make sure liquid page div's are class-tagged correctly
your page must call lp_global.InitializeLayout() on $(document).ready
and lp_global.AdjustLayout() on $(window).resize.... or as needed.

KNOWN LIMITATION: all bricks must have a deterministic height on load. Mainly this means the height of an image	
must be specified before loading.

Dependency: jquery (v0.9 tested with jquery-1.7.1.js)
 
Changelog:

 v.2.2 -- further support of layout attribute modifiers... to date:
 			data-lp-overflow -- if set to "1" only render if enough depth to fit; do not make page any deeper
			data-lp-animate -- skip fade-in animation if set to "0"
			data-lp-afterspace -- explicitly control the spacing below a widget in px
	   --  Support "line-break" span brick with rendering_mode = "ORDERED" 
	       this rendering mode supports arbitrary brick layouts depending on the order, can create intentional gaps
	   --  Additional hack to move out of order lp-right-ad to proper place in ORDERED mode.
 
 v.2.1 -- BK Added the ability to Ajax-Load external 3rd-party advertising <script> tag chains, into same-origin <iframe> tags... after the "More" button is pressed.
       -- Added extra helper functions. They make it easy to figure out what they do, when extracting data from the same-origin <iframe> tags.
       -- Added the ability to detect & remove blank ad boxes from the DOM, whenever ads aren't trafficked to those boxes nor back-filled with default ads. This prevents empty ads from rendering out as blank 300x250 gaps, by dynamically removing empty ads at run-time.
       -- Straightened out the calls to the adjustLayouts() function, when the "More" button is pressed. That function was being processed 3x, for each "More" button click. It will now only be called 1x, after all of the new widgets + ads are loaded onto the page & all blank ads are removed. This fixed a glitch where the page would flicker, as it re-processed the adjustLayout() function 3x for each "More" button click.
       -- Added the ability to dynamically load Ajax content off-screen, in an SEO-friendly manner! Widgets will no longer be rendered out behind other widgets... as they are appended to the DOM & just before the adjustLayout() function re-renders the newly Ajax-loaded widgets... into their final DOM positions.
       -- Upgraded the "More" button's single Ajax <div> to an easy-to-maintain & extendable 3 Ajax <div> system.
 v.2.0 -- Support rendering separate content sections 
 	   -- allow breaks in layout with each content section. When starting a new section, multicolumn bricks can gap across prior layout
       -- special pinning class of right overflow bricks that are displayed as needed
       -- optimizations in pinning selections; removal of class renaming code and general cleanup.
 
 v.1.6 -- BK Added the www.AjaxLoad.info spinning animation.
 v.1.5 -- LRH ghosted brick support & WH dynamic ad widgets
 v.1.3 -- BK Added DisplayMoreAds for the More Button to use, since page-level JS code can't be run when dropping it 
    		into an Ajax div.
 v.1.2 -- LH Added css hiding, reveal code on init, fade-in animation option
 v.1.1 -- Refactored & added ability to pin multi-row widgets as trump override widgets: A2, H2, X2, X3, Ads. Also
 			allows for extra CMS pinned widgets to be ignored/hidden from the DOM if the max number of widgets have	
 			already been pinned left or right. Enforces the 3 wide, then 2 wide, then single column left pinning rules.
 			Refactored DOM calls in RenderLayout into simplified function calls. Upgrades by Brian M. Kueck	
 v 1.0 -- Upgraded to OO JS w/ a jQuery play-nicely with ProtoType & Scriptaculous auto-bind area by Brian M. Kueck
 v 0.9 -- Initial version by Lou R. Houlemarde
 ************************************************************************************************************************/
 
 jQuery('html').addClass('js-hide'); //this is to hide bricks in lp_layout until they are loaded and rendered

(function initLiquidPinningObject($) { // This $ is bound to the global jQuery object, which is in the auto-bind area (at the very bottom of this script).

	//Localized object for creating the global liquid pinning object.
	var lp_local = {

		/******************************************************************************
		 * CONFIGURABLE CACHE AREA - the page must reset these variables as necessary *
		 ******************************************************************************/

		rendering_mode : 'DEFAULT', // or 'ORDERED' rendering mode see RenderOrderedLayout()
			
		min_cols: 3,
		max_cols: 5,
		cur_cols: 3,  // (used as default setting as well)
		recordLimit: 30,	// number of dynamic widgets to retrieve for each ajax call
		
		/************************
		All supported pinning modes are set by the following class on the brick element.
		Only one per brick or they need to be normalized.. see function FixPinningClasses()
		Some other settings are controlled by 

		**************************/
		// Multi-column pin classes:
		h1_widget_pin_class: 'lp-widget h1',
		three_column_pin_class: 'three-column',
		two_column_pin_class: 'two-column',
		// These are one_column_pin_classes:
		right_pinned_ad_class: 'lp_right_ad', // 1st override which trumps all CMS-defined .lp_right values. <div id="DivAd${adCount}" class="eol-ads lp_right lp_right_ad">
		left1_pin_class: 'lp_left',  //bricks to pin leftmost column. The first ones may use data-lp_col_span="X" attribute, where X is no of columns to span.
		left2_pin_class: 'lp_left2',  //bricks to pin left next column over
		left3_pin_class: 'lp_left3',  //added for explicit 3 column
		right_overflow: 'lp_right_overflow', //right overflow -- widgets can be laid out to the right starting at right_overflow_start_column
		right_pin_class: 'lp_right',  //bricks to pin to rightmost column
		normal_pin_class: 'lp_mid',  //bricks to layout via algorithm after pinning
		flex_span_class: 'lp-span', //extends across all columns equalizing all depths for subsequent widgets
		
		//jQuery selection shortcut vars
		h1_widget_pin_class_select: '.lp-widget.h1',
		three_column_pin_class_select: '.three-column',
		right_pinned_ad_class_select:  '.lp_right_ad', // 1st override which trumps all CMS-defined .lp_right values. <div id="DivAd${adCount}" class="eol-ads lp_right lp_right_ad">
		two_column_pin_class_select:  '.two-column',
		left1_pin_class_select:  '.lp_left',
		left2_pin_class_select:  '.lp_left2',
		left3_pin_class_select:  '.lp_left3',
		right_overflow_pin_select:  '.lp_right_overflow',
		right_pin_class_select:  '.lp_right',
		normal_pin_class_select:  '.lp_mid', 
		flex_span_class_select:  '.lp-span',

		// These are the page's root wrapper divs, which are outside of the individual widgets.
		outer_div_class_select: '.lp_wrap',  //the html id of the outer div that wraps everything that must have its width set when the columns change.
		layout_div_class_select: '.lp_layout',  //the html class of the div that contains the bricks. It will be set to visually wrap the immediate layout. This must have its width set when the columns change.
		ajax_div_select_1: '#ajax-div-for-dynamic-widgets-1',  //the html class of the div that contains the bricks. It will be set to visually wrap the immediate layout. This must have its width set when the columns change.
		ajax_div_select_2: '#ajax-div-for-dynamic-widgets-2',
		ajax_div_select_3: '#ajax-div-for-dynamic-widgets-3',
		ajax_div_select_4: '#ajax-div-for-dynamic-widgets-4',
		ajax_div_select_5: '#ajax-div-for-dynamic-widgets-5',
		second_content_id_select: '#lp_more_content',  //addition content section that restarts layout rules.
		
		// events
		event_ready: 'ready',
		
		right_overflow_start_column: -1, //right overflow area starts here (0 index start). Use -1 for none
										// will not display if not enough columns, and bricks will not render deeper than other cols
										//deprecated... use data-lp-overflow (see GetBrickData())
		
		starting_top_offset: 10, //brick start below top of layout div this distance
		viewport_margins: 0, // min padding from viewport edge to layout container no matter what, to make room for skinning 
		inside_margins: 10, // buffer space left and right inside layout container 
		min_outer_div_width: 980, // do not shirnk the outer div wrapper below the size given here, ie,to allow header width to have an exact min size
		col_space: 20, // skip down this distance between bricks. This computes to 20px on-screen in FF.
		col_width: 300, //width of a 1-wide brick. multiple col bricks will be handled correctly
		col_padding_x: 10, // space between and only between cols

		use_hybrid_fitting_algo: true, //use a 'fitting factor' to influence where bricks go (ie, not just highest point avail like pinterest)
		hybrid_fit_factor: 0.50, //multiply this by the brick height being fitted

		// These prevent the widgets from being read 2x from the DOM. They are temp placeholder markers.
		strMarker1: '[EOL_Underscore]',
		strMarker2: '[EOL-Dash]',

		intMaxWidgetPageNumber: 3, // Total number of times that the user can click on the "More" button. This is a 1-based number. Each page = +30 widgets. This will be used by lp_local.AddMoreWidgetsLink and with lp_local.cache.intWidgetPageNumber.
		strMoreBttnClass: 'add-more-bttn',
		strMoreWidgetsLinkClass1: 'add-more-bttn',
		strMoreWidgetsLinkClass2: 'max-add-more-bttn',

		//ghost bricks option -- these will dynamically appear at the bottom of the layout
		ghost_brick_enabled: false,
		ghost_brick_class: 'lp_ghost',
		ghost_brick_color: '#EAEAEA',
		ghost_brick_min_height: 40,
		ghost_brick_bottom_offset: 10,

		// check for blank ads, which are Ajax loaded after the "More" button is pressed -- if found, remove them from the DOM.
		arrAjaxAdIds: [],

		/**************************
		 * END: CONFIGURABLE AREA *
		 **************************/

		/**************************************
		 * BEGIN: NON-CONFIGURABLE CACHE AREA *
		 **************************************/
		cache: {
			arrWidgetDivs: [],
			intWidgetPageNumber: 0, // Current number of extra "More" widgets, which the user has loaded. This is a 0-based number. Each page = +30 widgets. It will eventually match the intMaxWidgetPageNumber and lock at that number.
			boolShowAnimationIfRendered: false, //have we scheduled animation if there is an immediate render?
			intInsideMarginCalc: 0,
			intMaxColDepthforOverflow: 0
		}

		/************************************
		 * END: NON-CONFIGURABLE CACHE AREA *
		 ************************************/

	};
	
	/***************************************
	 * function dispatcher   			   *
	 * jQuery event wrapper	
	 * usage: lp_local.dispatcher.trigger
	 ***************************************/
	
	lp_local.dispatcher = (function () {

		return {
			on: function (eventName, fxn) {
				$(document).on("liquid_pinning:" + eventName, fxn);
				}, 
			trigger: function (eventName, argsList) {
				console.log("Triggering:", eventName, "with args:", argsList);
				$(document).trigger("liquid_pinning:" + eventName, argsList);
			}
		}
	}());

	// Dynamic Variables Area. Variables here must be used after the lp_local object is created above:

	/**************************************************
	 * column height array and array helper functions *
	 * total height of columns is stored here         *
	 **************************************************/
	lp_local.arrColumnDepths = [lp_local.max_cols - 1];
	
	
	/************************************************************
	 * function FixPinningClasses					
	 * there should be one and only one pinning class on a brick to avoid selection problems
	 * so, we must rid redundant tags on h1's, three-column, two-column, ads,  etc.
	 * all hacks to normalize bricks into the expected format here
	 ************************************************************/
	function FixPinningClasses() {
		var $holder = $(lp_local.layout_div_class_select); //only one to worry about so far
		$holder.find(lp_local.three_column_pin_class_select).removeClass('lp_left'); //fix three-column + lp_left
		$holder.find(lp_local.two_column_pin_class_select).removeClass('lp_left'); //fix two-column + lp_left
		$holder.find(lp_local.two_column_pin_class_select).removeClass('lp_mid'); //fix two-column + lp_mid
		$holder.find(lp_local.h1_widget_pin_class_select).removeClass('three-column').removeClass('lp_left'); //fix lp-widget.h1 + three-column + lp_left?
		$holder.find(lp_local.right_pinned_ad_class_select).removeClass('lp_right'); //fix lp_right_ad + lp_right
		
		//no-animation override settings here
		$holder.find('.v2').each(function() {
			$(this).attr("data-lp-animate","0");
		});
		
		// hack because we cannot easily change the entire rendering chains of widgets at this time to add a simple data attribute
		$("#WIDGET-PINNING-OVERFLOW-MARKER").nextAll().each(function() {
				if ($(this).hasClass("lp_mid")) {
					//$(this).css("visibility","hidden");
					$(this).attr("data-lp-overflow","1");
				}
		})
		
		//hack because lp-right-ad widgets are placed in the wrong order by higher tier. It should come after any 3-wide.
		//(after three-wide real widgets that are immediate children of .lp_layout)
//		if (lp_local.rendering_mode == "ORDERED") {
//			var $ra = $(lp_local.right_pinned_ad_class_select); 
//			var $last3wide = $(".lp_layout > " + lp_local.h1_widget_pin_class_select + " , .lp_layout > " + lp_local.three_column_pin_class_select).last();
//			if (($last3wide.length > 0 ) && ($ra.length > 0)) {
//				$last3wide.after('<div id="lp-right-ad-insertbeforeme"></div>'); //to make non-jq insert easy....
//				$ra.each(function(){
//					//move top right ad to proper pinnning order without re-execution; no jQuery.
//					var p = document.getElementById("lp-right-ad-insertbeforeme");
//					(document.getElementById("lp-right-ad-insertbeforeme").parentNode).insertBefore(this, p);
//				})
//			}
//		}
	}
		


	// Private Functions begin here

	function InitCols (num_cols) {
		for (var i = 0; i < num_cols; i++) {
			lp_local.arrColumnDepths[i] = lp_local.starting_top_offset;
		};
	}

	//return the shortest column
	//specify and return columns as zero-based
	lp_local.arrColumnDepths.min_index = function (max_col, opt_start_col) {
		if ( opt_start_col === undefined ) {
			opt_start_col = 0;
		};
		var min = this[opt_start_col];
		var col = opt_start_col;
		for (var i = opt_start_col; i <= max_col; i++) {
			if (this[i] < min) {
				min = this[i];
				col = i;
			}
		}
		return col;
	};

	lp_local.arrColumnDepths.max_depth = function (opt_max_col) {
		if ( opt_max_col === undefined ) {
			opt_max_col = this.length - 1;
		};
		var max = this[0];
		for (var i = 1; i <= opt_max_col; i++) {
			if (this[i] > max) {
				max = this[i];
			}
		}
		return max;
	};
	
	/*********************************
	 * function GetBrickData		 
	 * Get layout data associated with the brick, 
	 * Currently just using to get per-brick afterspacing override (data-lp-afterspace="NN") 
	 *********************************/
	function GetBrickData(Brick) {
		var $b = $(Brick); //once
		var overflow = $b.data("lp-overflow");
		if (overflow == "1") {
			overflow = true
		} else {
			overflow = false
		}
		var animate = $b.data("lp-animate");
		if (animate == "0") {
			animate = false
		} else {
			animate = true
		}
		var afterspace = $b.data("lp-afterspace");
		rd = { "afterspace": afterspace, "overflow" : overflow };
		return rd; 
	}

	/***************************************************************************************
	 * function PinToLayout																   *
	 * helper function called within layout system -- lays out brick element to exact spot *
	 * we only support multispan bricks starting from col 0.
	 ***************************************************************************************/
	function PinToLayout(Element, COL, intColSpan) {
		var bd = GetBrickData(Element);
		
		var intDepthSpacing = bd.afterspace;
		if (intDepthSpacing === undefined) {
			intDepthSpacing = lp_local.col_space;
		}
		
		var y_offset;
		if (intColSpan > 1) {
			y_offset = lp_local.arrColumnDepths.max_depth(intColSpan - 1);			
		} else {
			y_offset = lp_local.arrColumnDepths[COL];
		}
		
		//do not pin pverflow widgets if they make the page deeper, TODO move ui rule logic 
		if (bd.overflow) {
			var y_deepest = lp_local.arrColumnDepths.max_depth(lp_local.cur_cols - 1)
			if ((y_offset + $(Element).height() + intDepthSpacing) > y_deepest) {
				$(Element).hide();
				return false; // no pin!
			}
		}

		var x_offset = (COL * lp_local.col_width) + (COL * lp_local.col_padding_x) + lp_local.cache.intInsideMarginCalc;
		for (var i = COL, j=(COL + intColSpan); i<j; i++) {
			lp_local.arrColumnDepths[i] = y_offset + $(Element).height() + intDepthSpacing; // update column to new depth for next brick
		}
		
		$(Element).css('position', "absolute");
		if (lp_local.cache.boolShowAnimationIfRendered && bd.animate) { 
			$(Element).css({'top': y_offset, 'left': x_offset}).hide().fadeIn('slow');
		} else {
			$(Element).css({'top': y_offset, 'left': x_offset}).show();
		}
	}
	
	
	/*********************************
	 * function RenderOrderedLayout   
	 * this is an alternate rendering path to pin bricks as ordered with support for multiple line breaks and deliberate gaps
	 * no business logic belongs here, just brick layout and the supported pinning notions
	 * this rendering path is also not compatible with "right overflow" deprecated in favor of lp-overflow="1" setting
	 *********************************/
	function RenderOrderedLayout(Columns, HolderSelector) { 
		var $holder = $(HolderSelector);
		if ($holder.children().length === 0) {
			return false; //nothing to render so exit quick
		};
		
		var realRightmostColumn = Columns - 1;
		
		$holder.children().each(function(){
			$brick = $(this); 
			if ($brick.hasClass(lp_local.h1_widget_pin_class) ) {
				PinToLayout(this, 0, 3);
			} else if ($brick.hasClass(lp_local.three_column_pin_class)) {
				PinToLayout(this, 0, 3);
			} else if ($brick.hasClass(lp_local.two_column_pin_class)) {
				PinToLayout(this, 0, 2);
			} else if ($brick.hasClass(lp_local.right_pinned_ad_class)) {
				PinToLayout(this, realRightmostColumn, 1);
			} else if ($brick.hasClass(lp_local.right_pin_class)) {
				PinToLayout(this, realRightmostColumn, 1);
			} else if ($brick.hasClass(lp_local.left1_pin_class)) {
				PinToLayout(this, 0, 1);
			} else if ($brick.hasClass(lp_local.left2_pin_class)) {
				PinToLayout(this, 1, 1);
			} else if ($brick.hasClass(lp_local.left3_pin_class)) {
				PinToLayout(this, 2, 1);
			} else if ($brick.hasClass(lp_local.flex_span_class)) {
				PinToLayout(this, 0, Columns);
			} else if ($brick.hasClass(lp_local.normal_pin_class)) {
				var COL; //column slot we shall pick
				if (lp_local.use_hybrid_fitting_algo) {
					//find shallowest, then pick leftmost col that is within a factor 
					var h = $(this).height();
					var r = lp_local.hybrid_fit_factor * h;//related to height  
					//shallowest
					COL = lp_local.arrColumnDepths.min_index(realRightmostColumn);
					var shallowest = lp_local.arrColumnDepths[COL];
					for (var i = 0; i < COL; i++) { //search from left (0 is done)
						if (lp_local.arrColumnDepths[i] <= (shallowest + r)) {
							COL = i; //we have a good enough (but more left) visual fit.
							break;
						}
					}
				} else { //ragged default, just pick shallowest column for next pin 
					COL = min_index(realRightmostColumn);
				};
				PinToLayout(this, COL, 1);
			} else {
				//do nothing directly to elements not pinned
			}
		})
	} //RenderOrderedLayout
	
	

	/*********************************
	 * function RenderLayout		 *
	 * Renders the layout on screen  *
	 * Columns is the count (1 base) *
	 *********************************/
	function RenderLayout(Columns, HolderSelector) { // Keep these simple, to avoid copying & pasting. Most of the logic goes into the PinWidget function above.
		var $holder = $(HolderSelector);
		if ($holder.children().length === 0) {
			return false; //nothing to render so exit quick
		};

		// left pinning here... Start with 3 column widgets: H1
		$holder.children(lp_local.h1_widget_pin_class_select).each(function(index) { // left pinning three column trump
			PinToLayout(this, 0, 3);
		});

		// X3 widgets:
		$holder.children(lp_local.three_column_pin_class_select).each(function(index) { // left pinning three column trump
			//temp override animiation
			//var blnAnimState = lp_local.cache.boolShowAnimationIfRendered;
			//lp_local.cache.boolShowAnimationIfRendered = false;
			PinToLayout(this, 0, 3);
			//lp_local.cache.boolShowAnimationIfRendered = blnAnimState;
		});

		// ... then check for the right pinned ad.
		$holder.children(lp_local.right_pinned_ad_class_select).each(function(index) {
			var realRightmostColumn = Columns - 1;
			if ((lp_local.right_overflow_start_column >= 0) && (Columns > lp_local.right_overflow_start_column)) {
				realRightmostColumn = lp_local.right_overflow_start_column - 1;
			}
			PinToLayout(this, realRightmostColumn, 1);
		});

		// ... then check for right pinned widgets.
		$holder.children(lp_local.right_pin_class_select).each(function (index) {
			var realRightmostColumn = Columns - 1;
			if ((lp_local.right_overflow_start_column >= 0) && (Columns > lp_local.right_overflow_start_column)) {
				realRightmostColumn = lp_local.right_overflow_start_column - 1;
			}
			PinToLayout(this, realRightmostColumn, 1);
		});

		//... then check for 2 column widgets: A2, V2, X2
		$holder.children(lp_local.two_column_pin_class_select).each(function(index) { // left pinning two column trump
			PinToLayout(this, 0, 2); 
		}); 
		
		// left col 1 pinning implementation here:
		$holder.children(lp_local.left1_pin_class_select).each(function(index) { 
			PinToLayout(this, 0, 1);
		});

		// 2-1 pinning implementation here:
		$holder.children(lp_local.left2_pin_class_select).each(function(index) { 
			PinToLayout(this, 1, 1);
		});
		
		//3rd column here
		$holder.children(lp_local.left3_pin_class_select).each(function(index) { 
			PinToLayout(this, 2, 1);
		});		

		
		// middle pinning = rest of bricks pinning
		$holder.children(lp_local.normal_pin_class_select).each(function (index) {
			var realRightmostColumn = Columns - 1;
			if ((lp_local.right_overflow_start_column >= 0) && (Columns > lp_local.right_overflow_start_column)) {
				realRightmostColumn = lp_local.right_overflow_start_column - 1;
			};
			var COL; //column slot we shall pick
			if (lp_local.use_hybrid_fitting_algo) {
				//find shallowest, then pick leftmost col that is within a factor 
				var h = $(this).height();
				var r = lp_local.hybrid_fit_factor * h;//related to height  
				//shallowest

				COL = lp_local.arrColumnDepths.min_index(realRightmostColumn);

				var shallowest = lp_local.arrColumnDepths[COL];
				for (var i = 0; i < COL; i++) { //search from left (0 is done)
					if (lp_local.arrColumnDepths[i] <= (shallowest + r)) {
						COL = i; //we have a good enough (but more left) visual fit.
						break;
					}
				}
			} else { //ragged default, just pick shallowest column for next pin 
				COL = min_index(realRightmostColumn);
			};

			PinToLayout(this, COL, 1);
		});

		
		// right overflow bricks if enough extra columns
		// TODO: this should be optimized as its really only one or two columns
		if (Columns >  lp_local.right_overflow_start_column) {
			lp_local.cache.intMaxColDepthforOverflow = lp_local.arrColumnDepths.max_depth(lp_local.right_overflow_start_column - 1);
			$holder.children(lp_local.right_overflow_pin_select).each(function (index) {
				var COL; //column slot we shall pick

				COL = lp_local.arrColumnDepths.min_index(Columns - 1, lp_local.right_overflow_start_column);
				if ((lp_local.arrColumnDepths[COL] + $(this).height()) < lp_local.cache.intMaxColDepthforOverflow) {
					PinToLayout(this, COL, 1);
				}
			});
		}
		
	}

	/**********************************************
	 * function isEmptyDiv
	 * Checks an ad to see if it has data or not.
	 **********************************************/
	function isEmptyDiv(divIdOrClassName) {
		if ((divIdOrClassName[0] !== '#') && (divIdOrClassName[0] !== '.')) {
			divIdOrClassName = '#' + divIdOrClassName;
		}
		var div = $(divIdOrClassName);
		return ((div) && (div[0]) && (div[0].innerHTML) && (div[0].innerHTML.length > 0)) ? false : true;
	}

	/******************************************************
	 * function getIFrameAdId
	 * Changes the Ad id from "DivAd4" to "iframeDartAd4".
	 ******************************************************/
	function getIFrameAdId(divId) {
		return divId.replace('Div','iframeDart');
	}

	/*********************
	 * function getIFrame
	 * Gets the iFrame.
	 *********************/
	function getIFrame(iframeAdId) {
		return $('#'+iframeAdId)[0];
	}

	/********************************************************************
	 * function getIFramePage
	 * Changes the iFrame Page Object. This is a cross-browser solution.
	 ********************************************************************/
	function getIFramePage(iframeAdId) {
		var iframe = getIFrame(iframeAdId);
		return iframe.contentWindow.document || iframe.contentWindow.window.document || iframe.contentDocument;
	}

	/**********************************************
	 * function removeBlankAds
	 * Removes blank 300px Wide by 250px high ads
	 **********************************************/
	function removeBlankAds() {
		// Loops all of the newly added Ajax-loaded Ad Ids, to detect if any of the data is blank in the <iframe><body></body></iframe> tags.
		for (var i=0, j=lp_local.arrAjaxAdIds.length; i<j; i++) {
			var nextAdId = lp_local.arrAjaxAdIds[i];
			detectBlankAd(nextAdId);
		}

		// Resets the array for the next "More" button click.
		lp_local.arrAjaxAdIds = [];
	}

	/*******************************************
	 * function detectBlankAd
	 * Detects & purges blank ads from the DOM.
	 *******************************************/
	function detectBlankAd(divId) {
		/* Both of these conditions are considered blank/empty ads:
		   1st checks for a <div id="DivAd#"></div> condition, with: isEmptyDiv(divId)
		   2nd checks for the <div id="DivAd#"><iframe><body></body></iframe></div> condition, with (iframeData.length === 0). */
		var iframeAdId = getIFrameAdId(divId);
		var iframePage = getIFramePage(iframeAdId);
		var iframeData = (iframePage && iframePage.body) ? iframePage.body.innerHTML : '';
		if (isEmptyDiv(divId) || (iframeData.length === 0)) { 
			/* Using .empty() here will create a 31px high invisible ad widget, with a noticeable gap... even when completely hidden by CSS styles. 
			So we have to use .remove(), to delete it from the DOM. */
			var adDiv = $('#'+divId);
			adDiv.after("<!-- " + divId + " was intentionally removed, since it was empty. -->");
			adDiv.remove();
		}
	}

	/***************************************
	 * function ShowGhostBricks			   *
	 * Display a row of fake bricks        *
	 * that fit to bottom				   *
	 ***************************************/
	function DisplayGhostBricks() {
		$("." + lp_local.ghost_brick_class).remove();

		//determine bottom line of ghost bricks
		brick_floor = lp_local.arrColumnDepths.max_depth() + lp_local.col_space + lp_local.ghost_brick_min_height;

		//push down layout to ghost brick floor
		$(lp_local.layout_div_class_select).height(brick_floor);
		
		//size and pin a brick (if needed) in each column
		//we don't worry about updating columns depth because the ghost bricks are always at the end and disposed if more bricks added.
		for (var COL = 0; COL < lp_local.cur_cols; COL++) { //search from left (0 is done)
			//height of the gb is remaining space to the brick floor
			var bh = brick_floor - lp_local.arrColumnDepths[COL];
			if (bh > 0) {
				var y_offset = lp_local.arrColumnDepths[COL];
				var x_offset = (COL * lp_local.col_width) + (COL * lp_local.col_padding_x) + lp_local.cache.intInsideMarginCalc;
				$(lp_local.layout_div_class_select).append('<div id="lp_brick_' + COL + '" class="' + lp_local.ghost_brick_class + '"><div>');
				$('#lp_brick_'+ COL).css(
					{
						'top': y_offset, 
						'left': x_offset, 
						'height': bh, 
						'width': lp_local.col_width,
						'background-color' : lp_local.ghost_brick_color,
						'position' : "absolute",
						'display' : "block",
						'z-index' : 0
					});
			};
		}
	}

	// Publicly available functions begin here:

	/********************************************************************************
	 * function AdjustLayout 														*
	 * does a check if less/more columns can fit and calls RenderLayout() if needed *
	 * call on resize, init load, or dynamic content change							*
	 ********************************************************************************/
	lp_local.AdjustLayout = function (ForceRender, ShowAnimation) {
		//console.log("adjust layout executed ");
		if ( ForceRender === undefined ) {
			ForceRender = false;
		};
		if ( ShowAnimation === undefined ) {
			ShowAnimation = false;
		};
		if (ShowAnimation) {
			lp_local.cache.boolShowAnimationIfRendered = true;
		}

		// REMOVE Reset the Total Pinned Widgets (threshold), to avoid layout issues.
		// lp_local.cache.arrTotalPinnedWidgets = [0, 0, 0, 0, 0];

		var totalLRmargins = (lp_local.viewport_margins * 2) + (lp_local.inside_margins * 2);
		var rw = $(window).width() - totalLRmargins;
		var cc = Math.floor((rw + lp_local.col_padding_x) / (lp_local.col_width + lp_local.col_padding_x));

		if (cc > lp_local.max_cols) {
			cc = lp_local.max_cols;
		} else if (cc < lp_local.min_cols) {
			cc = lp_local.min_cols;
		};

		if ((cc != lp_local.cur_cols) || ForceRender) {

			lp_local.cur_cols = cc;

			//since we know the cols, we can know the width of the wrap
			//we must set width at the outermost level to enable a floating centered div, which must have a known width.
			var cw = (lp_local.col_width * lp_local.cur_cols) + (lp_local.col_padding_x * (lp_local.cur_cols - 1)) + (lp_local.inside_margins * 2);

			//set margins
			lp_local.cache.intInsideMarginCalc = lp_local.inside_margins;
			
			//min width of wrap, regardless & may need to add some px to margins.
			if (cw < lp_local.min_outer_div_width) {
				var intMarginAdjust = Math.floor((lp_local.min_outer_div_width - cw) / 2)
				lp_local.cache.intInsideMarginCalc += intMarginAdjust;
				cw = lp_local.min_outer_div_width;
			}

			//TODO: put in better place?
			$(lp_local.outer_div_class_select).width(cw);
			
			/*
			if($('#Skin_Right').length > 0 && $('#Skin_Right').hasClass('fixed')){
				$('#Skin_Right').css('margin-left',cw);
			}
			*/

			//hide all overflow
			$(lp_local.right_overflow_pin_select).css('display','none');
			
			// Initialize Columns
			InitCols(lp_local.cur_cols);
			
			//remove redundant pinning classes
			FixPinningClasses();

			if (lp_local.rendering_mode == 'ORDERED') {
				RenderOrderedLayout(lp_local.cur_cols, lp_local.layout_div_class_select);
			} else {
				RenderLayout(lp_local.cur_cols, lp_local.layout_div_class_select);
				RenderLayout(lp_local.cur_cols, lp_local.second_content_id_select);
			}

			// Render the Ajax-loaded Dynamic Widgets. Front Door has 3 "More" button clicks. Chelsea has 5 "More" button clicks.
			// This won't call RenderLayout for any empty Ajax divs.
			for (var i=1, j=lp_local.intMaxWidgetPageNumber; i<=j; i++) {
				var ajaxClassName = lp_local['ajax_div_select_'+i];
				if (!isEmptyDiv(ajaxClassName)) { // where data length > 0
					RenderLayout(lp_local.cur_cols, ajaxClassName);
				}
			}

			//only after the portals render will we know the proper visual depth (height) of the layout-container
			//once set it will push down all content below the deepest portal
			var md = lp_local.arrColumnDepths.max_depth(); //-15
			$(lp_local.layout_div_class_select).height(md);
			
			if (lp_local.ghost_brick_enabled) {
				DisplayGhostBricks();
			}
			
			lp_local.cache.boolShowAnimationIfRendered = false; //anim option only counts for this one call
			
			lp_local.dispatcher.trigger("LAYOUT_CHANGED", {})
			
		};
	};
	
	/********************************************************************************
	 * function GetLayoutWidth														*
	 * does a check if less/more columns can fit and returns the page wrapper width *
	 * for use with initial .lp_wrap sizing       									*
	 ********************************************************************************/
	lp_local.GetLayoutWidth = function () {
		var totalLRmargins = (lp_local.viewport_margins * 2) + (lp_local.inside_margins * 2);
		var rw = $(window).width() - totalLRmargins;
		var cc = Math.floor((rw + lp_local.col_padding_x) / (lp_local.col_width + lp_local.col_padding_x));
	
		if (cc > lp_local.max_cols) {
			cc = lp_local.max_cols;
		} else if (cc < lp_local.min_cols) {
			cc = lp_local.min_cols;
		};

		//since we know the cols, we can know the width of the wrap
		//we must set width at the outermost level to enable a floating centered div, which must have a known width.
		var cw = (lp_local.col_width * cc) + (lp_local.col_padding_x * (cc - 1)) + (lp_local.inside_margins * 2);
		
		//min width of wrap, regardless & may need to add some px to margins.
		if (cw < lp_local.min_outer_div_width) {
			cw = lp_local.min_outer_div_width;
		}

		return cw;
	};

	/***********************************
	 * function InitializeLayout	   *
	 * call this once on document load * 
	 ***********************************/
	lp_local.InitializeLayout = function () {
		console.log("Initialize layout");

		//this is because we really shouldnt be using liquid layount on news detail but we do and 
		//some articles can pull in content which comes in later and can cause the pinning div to expand too far.
		if (jQuery("body").attr("id") == "detail") {
			setTimeout(doRevealLayout(), 2000);
		} else {
			doRevealLayout();
			setTimeout(function(){
				lp_local.AdjustLayout(true);
			}, 2000);
		}

		function doRevealLayout(){
			lp_local.AdjustLayout(true, true);
			$('html').removeClass('js-hide'); //reveal lp_layout after layout set
			$(lp_local).trigger(lp_local.event_ready); // fire ready event
		}
	};

	/**************************************************
	 * function AddMoreWidgetsLink					  *
	 * This is used for the Front Door's "More" link. * 
	 **************************************************/
	lp_local.AddMoreWidgetsLink = function (section,offset,categories,frontdooronly,edition,showAd,widgetcolor) {
		// Increment the page number by 1 for the next set of widgets. 
		lp_local.cache.intWidgetPageNumber++;

		// Local variables are for readability purposes.
		var intPgNum = lp_local.cache.intWidgetPageNumber;
		var intMaxPgNum = lp_local.intMaxWidgetPageNumber;

		// set 'showAd' to true by default
		if (typeof showAd === "undefined") {
			showAd = true;
		}
		if(typeof widgetcolor === "undefined") {
			widgetcolor = null;
		}
		
		if (intPgNum <= intMaxPgNum) {

			// Adds the AjaxLoad.info spinner.
			var objMoreBttnDiv = $('.' + lp_local.strMoreBttnClass);
			if (!objMoreBttnDiv.hasClass('loading')) {
				objMoreBttnDiv.addClass("loading");
			}

			// Ajax call
			$.get("/mvc/widget/dynamic/page/" + section + "/" + intPgNum + "/" + offset + "?categories=" + categories + "&frontDoorOnly=" + frontdooronly + "&edition=" + edition + "&ads=" + showAd + "&widgetColor=" + widgetcolor + "&limit=" + lp_local.recordLimit, function(data) { //  + '#more' + intPgNum
			//$.get("http://www2.dev.eonline.com/mvc/widget/dynamic/page/" + intPgNum + "/" + offset, function(data) { //  + '#more' + intPgNum
				// Append 30 more widgets to the DOM
				var ajaxDiv = $(lp_local['ajax_div_select_' + intPgNum]);
				if (ajaxDiv) {

					data = $.trim(data); //overwrite
					// Split the JSON string off of the data.
					if ((data.indexOf('[EOL-SPLIT]')) != -1) { 
						var splitIndex = data.indexOf('[EOL-SPLIT]');
						var jsonPayload = data.substr(splitIndex + '[EOL-SPLIT]'.length);
						var json = $.parseJSON(jsonPayload);
						data = data.substr(0, splitIndex); //overwrite
					}
					
					// String Replacements
//					data = data.replace(/\[EOL\-Dash\]/gi,'-');
//					data = data.replace(/\[EOL\_Underscore\]/gi,'_');
					data = data.replace(/\r/g,'');
//					data = data.replace(/\n/g,'');
					data = data.replace(/\t/g,'');

					/* This will shift the Ajax Div off-screen, so that it can load the widgets in... before they render infront of the user.
					   We'll right shift them back to margin-left: 0px down below. That should avoid SEO problems, as we're not cloaking data.
					   We just don't want it to see widgets load in behind other widgets & then "POP" into position. 
					   They should simply appear in their final layout position! This makes for a smoother loading Front Door!
					*/
					ajaxDiv.css({
						"margin-left": "-5000px"
					});

					// Loads data into the div. This drops all data into the DOM.
					ajaxDiv.append(data);

					if (showAd) {
						// Then we insert ads, as needed... using DOM id lookups.
						for (var i=0, j=json.adDivIds.length; i<j; i++) {
							var triggerResize = (i === (j-1)) ? true : false; // Triggers the resize, but only when the last ad loads!
							
							// eolMpsAd can be found eol.mps.ad.js
							eolMpsAd.render({
								el : '#'+json.adDivIds[i].adId, 
								slot : "multirepeat",
								requestMoreAndQueue : triggerResize
							});

							if (triggerResize) {
								lp_local.AdjustLayout(true, false);
							}							

							json.tile++;
						}

						// We have to wait for the ads to load in from 3rd party servers, before removing any blank ads.
						setTimeout(function() {
							// Removes ads from the DOM, whenever AdChoice doesn't back-fill them. Simply removes blank 300x250 widget ad gaps.
							removeBlankAds();

							// Finish processing, but only after the blank ads have been removed!
							finishAjaxRenderToDom(ajaxDiv,objMoreBttnDiv,intPgNum,intMaxPgNum);
						}, 500);
					} else {
						finishAjaxRenderToDom(ajaxDiv,objMoreBttnDiv,intPgNum,intMaxPgNum);
					}

					// Paints the Chelsea Lately Landing Page Dynamic Widgets black.
					if ((typeof(eonline) !== 'undefined') && (typeof(eonline.widgets) !== 'undefined') && (typeof(eonline.widgets.changeColors) !== 'undefined')) {
						eonline.widgets.changeColors('onMoreBttnClick');
					}
				}
			});
		}
	};

	 /***********************************************************************
	 * function finishAjaxRenderToDom
	 * This is used to finish up processing the Ajax "More" button's click.
	 ***********************************************************************/
	function finishAjaxRenderToDom(ajaxDiv,objMoreBttnDiv,intPgNum,intMaxPgNum) {
		/* This will either:
			A. (showAd) Turn the Ajax div on AFTER the ads have been loaded using a setTimeout AND AFTER any blank ads, 
				have been hidden in the DOM. Otherwise, this ajaxDiv.css('display','block'); code runs too fast! 
				It tends to show the loading widgets on-screen, but left-justified & hidden behind other widgets. 
			B. (!showAd)  Turn the div on immediately. Don't use ajaxDiv.show(); as it will hide the dynamic widgets from appearing in the DOM. 

			Note: The 1px height & width, will avoid the "Ajax-Loading POP", where widgets render behind other widgets, 
			before the AdjustLayout code runs.
		*/
		ajaxDiv.css('display','block'); // This doesn't seem needed, as it already flips to display:inline as soon as the jQuery .append() function is used.

		/* This will either: 
			A. (showAd) Refresh the layout AFTER the ads have been loaded using a setTimeout AND AFTER any blank ads, have been hidden in the DOM. 
			   Otherwise, this adjust layout runs too fast! It tends to leave a 300px Wide by 250px High blank ad on-screen, 
			   which we don't want to see. 
			B. (!showAd) Resizes the layout immediately, once the new widgets load.
		*/
		console.log("ajax adjustlayout");
		lp_local.AdjustLayout(true, false);

		// Removes the AjaxLoad.info spinner.
		objMoreBttnDiv.removeClass("loading");

		// Check to see if we've hit the max number of allowable "More" button clicks.
		if (intPgNum === intMaxPgNum) {
			// If so, switch class names to change the button's background color from black to red. It uses a sprite map.
			//$('.' + lp_local.strMoreWidgetsLinkClass1).switchClass(lp_local.strMoreWidgetsLinkClass1,lp_local.strMoreWidgetsLinkClass2); //breaks on ie
			$('.' + lp_local.strMoreWidgetsLinkClass1).css('display', 'none')

			//there are no more bricks implied
			$("." + lp_local.ghost_brick_class).remove();
			lp_local.ghost_brick_enabled = false; 
		}

		// This should keep Search Bots happy! This makes for a smoother loading Front Door! :)
		ajaxDiv.css({
			"margin-left": "0px"
		});
	}

	/***************************************
	 * function GetColumnCount			   *
	 * This is used for tracking purposes. * 
	 ***************************************/
	lp_local.GetColumnCount = function () {
		return lp_local.cur_cols;
	};
	

	// Hook it to the Global Chain. This works better than returning this object & then appending it to the global chain in each page.
	window.lp_global = lp_local;
	// Auto-loads the jQuery root object into the $ variable, while allowing other existing JS libraries like Scriptaculous and Prototype to still use the $ var for their purposes.

})(jQuery); // As long as this script is attached to a page, this will auto-initialize this object.