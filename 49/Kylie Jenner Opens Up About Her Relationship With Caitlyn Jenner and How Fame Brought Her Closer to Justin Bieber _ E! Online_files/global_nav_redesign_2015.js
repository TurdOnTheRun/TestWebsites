/*******************************************************************/
/******         Global Nav Redsign 2015 JS                     *****/
/******         Author: Christine Lam                          *****/
/******         Platform: EONLINE                              *****/
/******         Version: 2.0                                   *****/
/*******************************************************************/

(function($){

eonline_Globalnav = function() {

	// ********************************
	// *** GLOBAL VARS   ***
	// ********************************
	var isTablet = navigator.userAgent.toLowerCase().indexOf("ipad") > -1;
	
	var mainContentLayout = ".lp_layout";
	var mainPage = "#page.lp_wrap";
	var mainMenu = ".NavR_Header_E_Layout";
	var mainMenuCont="#NavR_Header_Layout_content";
	var collapsedmainMenuCont ="#NavR_Header_Layout.NavR_Header_E_Layout #NavR_Header_Layout_content.NavR_Header_Collapsed";
	var topHalfNav = "#NavR_Header_Socials";
	var navblock = "#NavR_Header_NavBlock";
	var logoblock = "#NavR_Header_LogoBlock";	
	var nonLiquidLayout = ".lp_wrap, #content_interior";
	var emptyHeader = ".NavR_Header_Empty_Layout";
	var menulistlinkheight= ".NavR_Header_NavItem a";
	var menulistheight = "#NavR_Header_NavBlock ul li";
	var menuOverrideheight = "#NavR_Header_NavBlock .Nav_Fontsize_Override .NavR_Header_NavItem";
	
	//SEARCH 
	var searchlogo = "#NavR_Header_SearchBlock";
	var searchBox ="#NavR_Header_SearchBox";
	var searchTextBox = "#NavR_Header_Search_Input";
	var searchClose = ".NavR_Header_Search_Close";
	var searchSubmit = "#NavR_Header_Search_Submit";
	var searchAction = "#NavR_Header_Search_Action";
	var searchON = false;

	//NAV ITEMS
	var newstab = "#NavR_Header_NavItem_News";
	var photostab = "#NavR_Header_NavItem_Photos";
	var videostab = "#NavR_Header_NavItem_Videos";
	var tvscooptab = "#NavR_Header_NavItem_TVScoop";
	var eshowstab = "#NavR_Header_NavItem_EShows"; 
	var redcarpettab= "#NavR_Header_NavItem_RedCarpet";
	var moretab = "#NavR_Header_NavItem_More";	
	var styletab = "#NavR_Header_NavItem_style";
	var replaytab = "NavR_Header_NavItem_Replay";
	//var navBackdrop = "#NavR_Header_backdrop";
	
	//DROP DOWN MENU
	var dropDownMenu= "#NavR_Header_DropDownMenu";
	var subnavCont = ".NavR_Header_Subnav";
	var videoTHB = ".NavR_Header_Subnav_Item.NavR_II_Videos";
	var dropdownarrow = ".NavR_Header_arrowUp";
			
	//ESHOWS
	var eshowsSideMenu = ".NavR_Header_EShows_sidemenu_tab";
	var eshowsSideMenuTabCont = ".NavR_ll_EShows_tab";
	var eshowsActiveArw = ".NavR_EShows_activearw";
	var eshowsSubnavCont = "#NavR_Header_EShows_Subnav";
	var eshowsGrids = ".NavR_Header_Subnav_EShows_showGrids";
	var eshowsCont_clips = "#NavR_Header_EShows_Subnav_clips";
	var eshowsCont_shows = "#NavR_Header_EShows_Subnav_shows";
	var eshowsCont_schedule = "#NavR_Header_EShows_Subnav_schedule";
	
	// BOOLEANS, FLAGS, etc
	var showsItemLeft ="";
	var subMenuLeft = "";
	var subMenuCenter = "";
	var arrowLeft = "";
	var navAnimate = true;
	var isCollapsed = false;
	var animationTimer = 100;
	var scrollTop = 0;
	var lastMenuPos = 0;
	var disableScrolling = false;
	
	// SHOWS 2nd NAV FLAG
	var hasShowsNav = jQuery('#shows-nav').length;
	
	// RED CARPET FLAG	
	var isRedCarpet = '';
	isRedCarpet = jQuery("input[name='redCarpetFlag']").val();	
		
	//ELOGO IMAGE PATHS
	var smalllogopath = "/resources/images/header_footer/E_logo_trans_62x50.png";
	var largelogopath = "/resources/images/header_footer/E_Nav_logo_100x120.png";
	if(isRedCarpet == 'true')
		var largelogopath = "/resources/images/header_footer/E_logo_trans_62x50.png";
		
	//IE GRADIENT BG
	var threecolbg = "/resources/images/header_footer/navRedesign-gradient-bg-IE8.png";
	var ffcolbg = "/resources/images/header_footer/navRedesign-gradient-bg.png";
	
	//JUMPLINE FOR COLLAPSED NAV
	var jumpline = jQuery(mainMenu).offset().top + jQuery(mainMenu).height();
	if(isRedCarpet == 'true')
		jumpline = jQuery(mainMenu).offset().top;
		
	if (isTablet) { 
		document.title = "E! Online";
	}
	
	//PHOTO DETAIL PAGE SETTING
	var stayCollapsed = false; 
	eonline_Globalnav.setStayCollapsed = function() {
		stayCollapsed = true; //This really means that the header stays thin, not necessarily fixed
		jumpline -= 12; //to better match previous version
	}
			
	//append drop shadow
		//jQuery("<div class='NavR_Header_backdrop' id='NavR_Header_backdrop'></div>").appendTo(jQuery(document.body));	
	
	// ********************************
	// *** OMNITURE TRACKING VARS   ***
	// ********************************	
	var globalTrack = ".NavR_Header_omniture_track";
	
	
			
	// **********************************************************************
	// *** ONLOAD: COLLAPSE THE NAV IF A PAGE IS LOADED OVER THE JUMPLINE ***
	// **********************************************************************
	var mainPageWidth;
	var maxPageWidth = null;
	
	$(window).load(function () {
		setTimeout(updateArrowUp, 500);
		if(jQuery(document).scrollTop() > jumpline) {
			if(isRedCarpet == 'true')buildCollapsedRedCarpetNav2014();
				else buildCollapsedNav();
		}		
		if (hasShowsNav) showsSubNav();
		
		//Set up Menu and subMenu items' width onLoad
		setTimeout(function(){
			updateNavColWidth();
		}, 500);
		
		//hack show sub nav
		if (hasShowsNav) {
			//jQuery("#page.lp_wrap").css("margin-top","80px");
		}
	});
	

	// ********************************
	// *** BROWSER SPECIFIC STYLING ***
	// ********************************
	
	jQuery(mainMenu).css({"margin-left":"0"});
		
	jQuery.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	//PC
	if (navigator.appVersion.indexOf("Win")!=-1){
		if(jQuery.browser.mozilla && navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			//jQuery(dropdownarrow).css({"margin-top":"-3px"});
		}
		if(isRedCarpet == 'false'){
			if(jQuery.browser.mozilla && navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
				//jQuery(menulistlinkheight).css({"display":"block","height":"29px"});
				//jQuery(menulistheight).css({"display":"block","float":"left","padding-right":"12px"});
				//jQuery(menuOverrideheight).css({"padding-left":"7px","padding-right":"12px"});
			}
		}
		//white scroll bar for PC chrome needs special styling
		if(jQuery.browser.chrome){  

		}
	}
	//MAC
	if (navigator.appVersion.indexOf("Mac")!=-1){
		if(jQuery.browser.chrome){  
			jQuery(dropdownarrow).css({"margin-top":"11.5px"});
			jQuery(".NavR_schedule_day").css("line-height","36px");
		}
	}
	if(isRedCarpet == 'true'){
		if(jQuery.browser.mozilla && navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			//jQuery(navblock).css({"top":"9px"});
		}
	}
	

	// *****************
	// *** MAIN LINE ***
	// *****************
	
	jQuery(document).on("touchmove", function(e) {
		var target = e.target;									
		isTablet && disableScrolling && e.preventDefault();
	});
		
	jQuery(window).scroll(function () {
		scrollTop = jQuery(document).scrollTop();
		if (isTablet) {
			lastMenuPos = scrollTop;
		}
		
		if(scrollTop >= jumpline){
			if(navAnimate  && !isCollapsed){
				/**************************************************************************/
				/* Collapsed Nav functionalities are moved to buildCollapsedNav function  */
				/**************************************************************************/
				if(isRedCarpet == 'true'){
					buildCollapsedRedCarpetNav2014();
				} else if (stayCollapsed) {  
					activateThinFixedHeader();
				} else {
					buildCollapsedNav();
				}
			}
			isCollapsed = true;
		}else if((scrollTop < jumpline)  ){
			if(!navAnimate){
				
				/***********************************************************************/
				/* Expanded Nav fucntionalities are moved to buildExpandedNav function */
				/***********************************************************************/
				if(isRedCarpet == 'true') { 
					buildExpanedRedCarpetNav2014(); 
				} else if (stayCollapsed){
					activateThinHeader();
				} else {
					buildExpandedNav();
				} 
			}
			isCollapsed = false;
		}
	});

	// *****************
	// *** FUNCTIONS ***
	// *****************

	function buildCollapsedNav(){
		updateNavColWidth();
				
		if(isRedCarpet == 'false'){
			jQuery(mainMenu).css({"margin-top":"-30px"});
			if(navigator.appVersion.indexOf("Mac")!=-1)
				animationTimer = 100;
	
			jQuery(mainMenu).animate({
				top: "+=30px"
			}, animationTimer , function() {
				jQuery(mainMenu).css({"margin-top":"0","top":"0"});
			});
		}
				
		navAnimate= false;
		isCollapsed = true;
		
		fixedSizingCheck();
		
		jQuery(emptyHeader).css({"visibility":"hidden","display":"block"});
		jQuery(mainMenuCont).addClass("NavR_Header_Collapsed");
		jQuery(mainMenu).addClass("collapsed");
		jQuery(searchBox).css("margin-top","0");
		
		updateTracking();
	}
	
	function buildExpandedNav(){
		updateNavColWidth();
		
		jQuery(emptyHeader).css({"display":"none"});
		jQuery(mainMenuCont).removeClass("NavR_Header_Collapsed");
		jQuery(mainMenu).removeClass("collapsed");
		jQuery(searchBox).css("margin-top","44px");

		navAnimate = true;
		isCollapsed = false;
		
		fixedSizingCheck();
		
		updateTracking();
	}
	
	function buildRedCarpetNav2014(){

		buildCollapsedNav();
		jQuery(mainMenuCont).removeClass("Header_Collapsed");
		jQuery(mainMenuCont).addClass("Header_RedCarpet2014");			
	}
	function buildCollapsedRedCarpetNav2014(){
		buildRedCarpetNav2014();
		/* fluid mode override*/
		jQuery(mainMenu).css({"position":"fixed","top":"0px"});		
	}
	
	function buildExpanedRedCarpetNav2014(){
		buildRedCarpetNav2014();
		if (hasShowsNav) {
			jQuery(mainMenu).css({"height":"130px","position":"relative","margin-left":"0"});
			jQuery(mainMenuCont).css({"height":"130px"});
		} else {
			jQuery(mainMenu).css({"height":"50px","position":"relative","margin-left":"0"});
			jQuery(mainMenuCont).css({"height":"50px"});
		}
		jQuery(emptyHeader).css({"display":"none"});
		navAnimate= true;
		isCollapsed = false;
		fixedSizingCheck();
	}

	function centerNav(){
		nonLiquidWidth = jQuery(mainMenu).width();
		if(nonLiquidWidth > 980)
			mainContWidth = jQuery(mainContentLayout).width();
		else
			mainContWidth = jQuery(nonLiquidLayout).width();
		//console.log("maincontWidth"+mainContWidth);
		//jQuery(mainMenu).css({"width":"100%"});
		//navCenter(mainMenu);
	}

	function navCenter(inputNav) {
 		jQuery(inputNav).css({"margin-left": ( jQuery(window).width() - jQuery(inputNav).width() ) / 2+jQuery(window).scrollLeft() + "px"});
		jQuery(inputNav).css({"left":"0"}); 
	}
	
	
	var searchboxWth;
    var searchtxtWth;
    var eshowsRcontWth;
    var eshowsGridWth;
    var activeTab;
	var activeCont = "activeTab";
	function updateNavColWidth(){
		
		
		/* TODO: CSS nav elements within here so layout looks as intended w/o scripting */
		/* we need to let html+css do layout work wherever possible. */ 
		/* without the all the following code running, everything appears functional except search box   */
		
		//return; 

				
		mainPageWidth = jQuery(mainPage).width(); 
		if 	(maxPageWidth !== null && mainPageWidth > maxPageWidth) {
			mainPageWidth = maxPageWidth;
		}
		
		if(mainPageWidth <= 980){  
			// center leaderboard 
			//jQuery(".NavR_Header_BannerBlock").css("margin-left","126px");
			// set IE8 gradient
			if (navigator.appVersion.indexOf("Win")!=-1){
				if(jQuery.browser.msie){
					jQuery(topHalfNav).css("background","url('"+threecolbg+"')");
					}
				}
			
			//jQuery(mainMenuCont).css({"width":"920px","padding":"0 30px"});
			//jQuery(dropDownMenu).css({"width":"940px","padding":"0"});
			searchboxWth = 920 -47;
			searchtxtWth = searchboxWth -80 - 60 - 8 -9;
			jQuery(searchTextBox).css("width",searchtxtWth+"px");
			jQuery(searchBox).css({"margin-left": "0","width":"920px"});
			if(searchON){
				
				jQuery(searchAction).css("width",searchboxWth+"px");
			}
			//jQuery(eshowsSubnavCont).css({"width":"785px"});
			jQuery(eshowsGrids).css({"width":"550px"});
			jQuery(".NavR_EShows_moreshowCont").css("margin-left","10px");
			
			//Show Schedule width adjustment
			jQuery(".NavR_Schedule_timelist, .NavR_Schedule_showlist").css("width","620px");
				
			//update email box width
			//jQuery(".NavR_More_newsletter_cont #Newsletter_Submitting_Form .Newsletter_Input").css("width","225px");
			
			//set social bg size
			jQuery("#NavR_Header_Socials").css("background-size","100% 100%");
			
			//update agreement text size
			jQuery(".NavR_More_newsletter_cont #Newsletter_Submitting_Form #Newsletter_List .reqMessage").css("font-size","11px");
			
			//update misc columns
			jQuery("#NavR-enow-li").appendTo(jQuery(".NavR_Header_Subnav_morelist.misc_left"));
			jQuery("#NavR-contact-li").appendTo(jQuery(".NavR_Header_Subnav_morelist.misc_right"));
			
			jQuery(dropDownMenu).addClass("three-column");
			jQuery(mainMenuCont).addClass("three-column");
			
		}
		if(mainPageWidth > 980){ 
			// center leaderboard 
			//var centerleaderboardWth = (mainPageWidth - 728)/2;
			//jQuery(".NavR_Header_BannerBlock").css("margin-left",centerleaderboardWth+"px");
			
			// set IE8 gradient
			if (navigator.appVersion.indexOf("Win")!=-1){
				if(jQuery.browser.msie){
					jQuery(topHalfNav).css("background","url('"+ffcolbg+"')");
					}
				}
			
			//jQuery(mainMenuCont+","+dropDownMenu).css({"width":mainPageWidth+"px","padding":"0"});
			searchboxWth = mainPageWidth -47;
			searchtxtWth = searchboxWth - 80 -60 -8 -9;
			jQuery(searchBox).css({"margin-left":"0","width": mainPageWidth+"px"});
			jQuery(searchTextBox).css("width",searchtxtWth+"px");
			if(searchON){
				jQuery(searchAction).css("width",searchboxWth+"px");
			}
			eshowsRcontWth = mainPageWidth - 155;
			eshowsGridWth = eshowsRcontWth - 255;
			//jQuery(eshowsSubnavCont).css({"width":eshowsRcontWth+"px"});
			jQuery(eshowsGrids).css({"width":eshowsGridWth+"px"});
			jQuery(".NavR_EShows_moreshowCont").css("margin-left","20px");
			
			//Show Schedule width adjustment
			var showSchWth = mainPageWidth - 320 ;
			jQuery(".NavR_Schedule_timelist, .NavR_Schedule_showlist").css("width",showSchWth+"px");
						
			//update email box width
			//jQuery(".NavR_More_newsletter_cont").css({"width":"75%","float":"right"});
			var emailWth = jQuery(".NavR_More_newsletter_cont #Newsletter_Button").width() - 30;
			//setTimeout(function() {
				//jQuery(".NavR_More_newsletter_cont #Newsletter_Submitting_Form .Newsletter_Input").css("width",emailWth+"px");
			//},300);
			
			jQuery("#NavR_Header_Socials").css("background-size","100% 100%");
			
			//update agreement text size
			jQuery(".NavR_More_newsletter_cont #Newsletter_Submitting_Form #Newsletter_List .reqMessage").css("font-size","15px");
			
			//update misc columns
			jQuery("#NavR-enow-li").appendTo(jQuery(".NavR_Header_Subnav_morelist.misc_right2"));
			jQuery("#NavR-contact-li").appendTo(jQuery(".NavR_Header_Subnav_morelist.misc_right2"));
			
			jQuery(dropDownMenu).removeClass("three-column");
			jQuery(mainMenuCont).removeClass("three-column");
			
		}	
	}
	
	function updateArrowUp(){ 
		var newstabWth;
		var photostabWth;
		var videostabWth;
		var tvscooptabWth;
		var eshowstabwth;
		var redcarpettabWth;
		var moretabWth;
		var styletabWth;
		var replaytabWth;
		
		newstabWth = (jQuery(newstab).width()/2)-7;
		photostabWth = (jQuery(photostab).width() /2)-7;
		videostabWth = (jQuery(videostab).width()/2)-7;
		tvscooptabWth = (jQuery(tvscooptab).width()/2)-7;
		eshowstabWth = (jQuery(eshowstab).width()/2)-7;
		redcarpettabWth = (jQuery(redcarpettab).width()/2)-7;
		moretabWth = (jQuery(moretab).width()/2)-7;
		styletabWth = (jQuery(styletab).width()/2)-7;
		replaytabWth = (jQuery(replaytab).width()/2)-7;
		
		jQuery(newstab).find(dropdownarrow).css("margin-left", newstabWth+"px");
		jQuery(photostab).find(dropdownarrow).css("margin-left", photostabWth+"px");
		jQuery(videostab).find(dropdownarrow).css("margin-left", videostabWth+"px");
		jQuery(tvscooptab).find(dropdownarrow).css("margin-left", tvscooptabWth+"px");
		jQuery(eshowstab).find(dropdownarrow).css("margin-left", eshowstabWth+"px");
		jQuery(redcarpettab).find(dropdownarrow).css("margin-left", redcarpettabWth+"px");	
		jQuery(moretab).find(dropdownarrow).css("margin-left", moretabWth+"px");
		jQuery(styletab).find(dropdownarrow).css("margin-left", styletabWth+"px");	
		jQuery(replaytab).find(dropdownarrow).css("margin-left", replaytabWth+"px");	
	}
	
	function updateTracking(){	    
		if(isCollapsed){
		
			jQuery(globalTrack).each(function (index){  
				var iniomnValue = jQuery(this).attr('data-omniture');  
				var collapsedomnValue = iniomnValue ? iniomnValue.replace(/top-navigation/g,"collapsed-navigation") : "";
				jQuery(this).attr('data-omniture', collapsedomnValue);
			});
						
			jQuery("#NavR_Header_Layout_content #shows-nav .nav-items li").each(function(index) {
				var ssOmniture = jQuery(this).find("a").attr("data-omniture");
				collapsedSSO = (ssOmniture) ? ssOmniture.replace(/top-navigation/g,"collapsed-navigation") : "";
				jQuery(this).find("a").attr("data-omniture",collapsedSSO);
			});
		}else{
			jQuery(globalTrack).each(function (index){
				var iniomnValue = jQuery(this).attr('data-omniture');
				var expandedomnValue = iniomnValue ? iniomnValue.replace(/collapsed-navigation/g,"top-navigation") : "";
				jQuery(this).attr('data-omniture', expandedomnValue);
			});			
			jQuery("#NavR_Header_Layout_content #shows-nav .nav-items li").each(function(index) {
				var ssOmniture = jQuery(this).find("a").attr("data-omniture");
				expandedSSO = (ssOmniture) ? ssOmniture.replace(/collapsed-navigation/g,"top-navigation") : "";
				jQuery(this).find("a").attr("data-omniture",expandedSSO);
			});
		}				
	}
		
	resizeFluidCollapsed = function(){
		//uses alternate position and resize of all headers into fluid layouts (not 3/4/5) 
		var hLeft = $("#HHeader .Positioning_Reference").offset().left;
		var hWidth =  $("#HHeader .Positioning_Reference").width();
		jQuery("#NavR_Header_Layout.NavR_Header_E_Layout").css({'width': hWidth, 'left': hLeft});		
	}
	
	activateThinFixedHeader = function() {  
		//resizeFluidCollapsed();
		//jQuery("#HHeader").addClass("thin").addClass('thin-fixed'); // currently defined in new gallery resources
		jQuery(mainMenuCont).addClass("NavR_Header_Collapsed"); //adds shadow
		jQuery(mainMenu).addClass("collapsed");
		jQuery(mainMenu).css("position","fixed");
		jQuery(emptyHeader).css({"visibility":"hidden","display":"block"});
		navAnimate= false;
		isCollapsed = true;
	}
	
	activateThinHeader = function() { 
		//jQuery("#HHeader").addClass("thin").removeClass('thin-fixed'); // currently defined in new gallery resources
		jQuery(mainMenuCont).removeClass("NavR_Header_Collapsed"); //removes shadow
		jQuery(mainMenu).removeClass("collapsed");
		jQuery(mainMenu).css({"position":"relative"});
		jQuery("#gallery.eol.photos #HHeader").css("margin-bottom","0");
		jQuery(emptyHeader).css({"display":"none"});
		navAnimate= true;
		isCollapsed = false;
	}
	
	//DropDown menu selections
	function showDropDown(tab, content){ 
		var eshowsRightContWTH;
		jQuery(dropdownarrow).css("display","none");
		jQuery("#"+tab).find(dropdownarrow).css({"display":"block"});
		jQuery(subnavCont).hide();
		//jQuery(".NavR_DD_"+content).css("display","block");
		jQuery(dropDownMenu).stop(true,true).slideDown("fast");
		jQuery(".NavR_DD_"+content).stop(true).fadeIn(700);	
		//jQuery(dropDownMenu).css("display","block");
		//jQuery(navBackdrop).css("display","block");
		//jQuery(hovershadow).css("display","block");
		if (content != 'More' && content != 'EShows') {
			jQuery(dropDownMenu).addClass('shortened'); //scripted due to visual issues
			jQuery(dropDownMenu).removeClass('regular'); 
		} else {
			jQuery(dropDownMenu).removeClass('shortened')
			jQuery(dropDownMenu).addClass('regular');
		}
		
		
		activeTab = tab; 
		activeCont = content; 
	}
	function hideDropDown(){
		jQuery(dropDownMenu).stop(true,true).slideUp("fast");
		//jQuery(dropDownMenu).css("display","none");
		//jQuery(navBackdrop).css("display","none");
		//jQuery(hovershadow).css("display","none");	
		jQuery(dropdownarrow).css("display","none");
		activeTab = "None";
	}
		
	// ***********************
	// *** EVENT LISTENERS ***
	// ***********************
	
	/* see eonline_Globalnav.setContentWidth()
	jQuery(window).resize(function() {
		setTimeout(function(){
		updateNavColWidth();
		}, 1000);
	});
	*/
	
	jQuery(window).resize(function() {
		fixedSizingCheck();
	});
	
	function fixedSizingCheck() {
		if (isCollapsed) {
			resizeFluidCollapsed();//this works in all fixed-header cases.
		} else {
			jQuery("#NavR_Header_Layout.NavR_Header_E_Layout").css({'width': '', 'left': ''}); //normalize
		}		
	};
	

	if(isTablet){
		
		if (typeof enavItems !== 'undefined') {
			//only activate dropdowns if data
			jQuery(moretab).on('mousedown',function(e) {
				if (activeTab != "NavR_Header_NavItem_More") {
					showDropDown("NavR_Header_NavItem_More", "More");
				} else {
					hideDropDown();
				}
			});
		}
		/*
		jQuery('html').on('touchstart',function(e) {
			hideDropDown(activeTab);
		});
		jQuery(newstab).on('touchstart',function(e) {
			showDropDown(newstab);
			e.stopPropagation(); // Don't remove this or it will hide the menu with the jQuery('html').on('touchstart') event above.
		});
		*/
		// showstab 
		//jQuery('#header-shows-link').on('touchstart',function(e) {
		//	jQuery('#header-shows-link').attr('href','javascript:void(0);');
		//});
		jQuery('input').on('blur',function(e) {
			if (isCollapsed) {
				jQuery(mainMenu).css({"margin-top":"0","top":"0"});
			}
		});
		//jQuery('a#header-shows-link').click(function (e) {
		//	e.preventDefault();
		//});
		//Search Animation
		$(searchlogo).on('touchstart',function(e) {
            $("#NavR_Search_Icon").removeClass("searchHover");
            $(searchBox).removeClass("SearchHidden")
                .addClass("SearchDisplay");
            $(searchClose).css({"bottom":"0px", "background-color":"#3b3b3b"});
            $(searchAction).animate({"width":searchboxWth+"px"}, 200, "linear", function(){
                $(".NavR_Header_entertosearch").css("visibility","visible");
                $(searchTextBox).focus();
                searchON = true;
            });
            
            // fixes hover state issue in tablet
            if(!jQuery(searchClose).hasClass("search_tablet")) {
                jQuery(searchClose).addClass("search_tablet");
            }
        });
        $(searchClose).on('touchstart',function(e) {
            $(".NavR_Header_entertosearch").css("visibility","hidden");
            $(searchAction).animate({"width":"60px"}, 200, "linear", function(){
                $(searchClose).css({"bottom":"auto", "background-color":"transparent"}); 
                $(searchBox).addClass("SearchHidden")
                    .removeClass("SearchDisplay");
                searchON = false;
            });  
        });

	}else{
	/***DESKTOP: DOCUMENT READY EVENTS ***/
		jQuery(document).ready(function(){
			/****** Menu Drop Down Animation ********/		
			var mmTimeout;
			var ddTimeout;
			var ishovering = false;
			var navRitem = ".NavR_Header_NavItem.dropdownable";
			var navRitemAll = ".NavR_Header_NavItem";

			if (typeof enavItems !== 'undefined'){
				//only activate dropdowns if data

				jQuery(navRitemAll + "," + dropDownMenu).on({

					mouseenter: function()
					{

						if(mmTimeout > 0){	
							clearTimeout(mmTimeout);
						}

						var itemId = jQuery(this).attr('id');
						var classId = jQuery(this).attr('class');

						if(classId.indexOf("NavR_Header_NavItem_No_Drop_Down") == -1){

							if (itemId.indexOf("NavItem") != -1) {

								var cat = itemId.split("_");
								if (cat[3].indexOf("Replay") != -1) {
									ishovering = false;
									hideDropDown();
								}
								else {
									ishovering = true;
									showDropDown(itemId, cat[3]);
								}

								jQuery("#NavR_Header_NavBlock_List a.hovering").removeClass("hovering");
								jQuery(this).find('a').addClass("hovering");
							}
							else {
								ishovering = true;
								//showDropDown(activeTab, activeCont);
								startTimeout();
							}
						}
						else{

							jQuery("#NavR_Header_NavBlock_List a.hovering").removeClass("hovering");
							jQuery(this).find('a').addClass("hovering");
							hideDropDown();
						}
					},
					mouseleave: function()
					{
						ishovering = false;
						startTimeout();			
					}
				});
			}
			
			function startTimeout(){
				
				mmTimeout = setTimeout(function(){
						if(!ishovering) {
							jQuery("#NavR_Header_NavBlock_List a.hovering").removeClass("hovering");
							hideDropDown();
						}
					}, 300);
			}
			//jQuery(dropDownMenu).on({  
			//	mouseenter: function() 
			//	{
					//clearTimeout(mmTimeout);
			//		showDropDown(activeTab, activeCont);
			//	},
			//	mouseleave: function()
			//	{
					//mmTimeout = setTimeout(function(){
					//	hideDropDown();
					//}, 200);	
					//clearTimeout(mmTimeout);
			//	}
		//	});
		//	jQuery(navBackdrop).on({
		//		click: function()
		//		{
		//			hideDropDown();
		//		}
		//	});
									
			/******Search Animation ********/
			$(searchlogo).on({
                click: function() 
                {                     
                    hideDropDown();
                    $(searchBox).removeClass("SearchHidden")
                    	.addClass("SearchDisplay");
                    $(searchClose).css({"bottom":"0px", "background-color":"#3b3b3b"});
                  	$(searchAction).animate({"width":searchboxWth+"px"}, 200, "linear", function(){
						$(".NavR_Header_entertosearch").css("visibility","visible");
	                    $(searchTextBox).focus();
	                    searchON = true;
                  	}); 

                }
            });     
            //Search Box Animation: Close
            $(searchClose).on({
                click: function() 
                { 
					$(".NavR_Header_entertosearch").css("visibility","hidden");
					$(searchAction).animate({"width":"60px"}, 200, "linear", function(){
                    	$(searchClose).css({"bottom":"auto", "background-color":"transparent"}); 
                    	$(searchBox).addClass("SearchHidden")
                    		.removeClass("SearchDisplay");
                    	searchON = false;
					}); 
                }
            });
		
			/***** Thumbnail Hover ******/
			var thumbHover = ".NavR_Header_Subnav_Item";
			var videothumbHover = ".NavR_Header_Subnav_Item.NavR_II_Videos";
			var hovershadow = ".NavR_Header_Thumb_Overlay.NavR_hover_shadow";
			var newsgrad = ".NavR_Header_Thumb_Overlay.narv_news_grad";
			jQuery(videothumbHover).hover(
				function() { 
					jQuery(this).find('.NavR_videoThumb').stop().animate({"width":"151px","height":"86px","margin-left":"-3px","margin-top":"-3px"}, 100, 'swing');
					jQuery(this).find(hovershadow).css("display","block");
					jQuery(this).find(newsgrad).css("display","block");
				}, function() {
					jQuery(this).find('.NavR_videoThumb').stop().animate({"width":"145px","height":"82px","margin-left":"0px","margin-top":"0px"}, 100, 'swing');
					jQuery(this).find(hovershadow).css("display","none");
					jQuery(this).find(newsgrad).css("display","none");
			});	
			jQuery(thumbHover).hover(
				function() {
					jQuery(this).find('.NavR_thumb').stop().animate({"width":"151px","height":"151px","margin-left":"-3px","margin-top":"-3px"}, 100, 'swing');
					jQuery(this).find(hovershadow).css("display","block");
					jQuery(this).find(newsgrad).css("display","block");
				}, function() {
					jQuery(this).find('.NavR_thumb').stop().animate({"width":"145px","height":"145px","margin-left":"0px","margin-top":"0px"}, 100, 'swing');
					jQuery(this).find(hovershadow).css("display","none");
					jQuery(this).find(newsgrad).css("display","none");
			});	
			
			/** Feature shows hover**/
			jQuery(".NavR_Header_Subnav_EShows_showGrids .NavR_EShows_shows_item, .NavR_featuerd_large").hover(
				function() {
					jQuery(this).find(".NavR_featured_overlay").css("display","block");
					jQuery(this).find(".NavR_featured_official_link").css("display","block");
				}, function() {
					jQuery(this).find(".NavR_featured_overlay").css("display","none");
					jQuery(this).find(".NavR_featured_official_link").css("display","none");
			});
			
			/**Additional Privacy Statement click**/
			jQuery(".NavR_Newsletter_footer_aps").click(function(){
				//jQuery(this:hover).css("text-decoration","underline");		
			//	jQuery(".NavR_Header_backdrop").show();
			//	jQuery(".NavR_Header_backdrop").fadeIn("slow");
				jQuery("<div class='newsletter_aps_backdrop'></div>").appendTo(jQuery(document.body));
				jQuery(".newsletter_aps_backdrop").show();
				jQuery(".newsletter_aps_backdrop").fadeIn("slow");
				jQuery(".NavR_Newsletter_aps_box.headerModal").appendTo(jQuery(document.body)).show();
				jQuery(".NavR_Newsletter_aps_box").show();
				var footerW = jQuery("#Footer_Layout").width();
				var apsL = (footerW - 291)/2;
				jQuery(".NavR_Newsletter_aps_box").css("margin-left", apsL+"px");
				jQuery(".NavR_Newsletter_aps_box.headerModal").css("margin-left", "40%");
				isiPad = navigator.userAgent.match(/iPad/i) != null;
				if(isiPad){
					jQuery(".NavR_Newsletter_aps_box").css("height", "280px");
				}
			});
			jQuery(".NavR_Header_backdrop, .Newsletter_aps_close, .Newsletter_aps_done_btn").live("click", function(){
				//jQuery(".NavR_Header_backdrop").remove();
				jQuery(".NavR_Newsletter_aps_box").hide();
			});
					
			/**** EShows Side Menu selections ****/
			jQuery(eshowsSideMenu).on({
				click : function()
				{
					var esTab = jQuery(this).attr('tab');
					jQuery(eshowsSideMenuTabCont).hide();
					jQuery(eshowsSideMenu).css({"background-color":"#212121","color":"#555353"});
					jQuery(this).css({"background-color":"#3b3b3b","color":"#999"});
					jQuery(eshowsActiveArw).hide();
					jQuery(this).find(eshowsActiveArw).show();
					jQuery(".NavR_Header_Subnav_EShows_"+esTab).show();
				}
			});
			
			
			adSkinCheck()//check again to be sure
			
		});
	}
	
			
	//Show Package Nav
	showsSubNav = function() {
		var navItemsWidth = 0;
		var thisWidth;
		var navItemsMaxWidth = 362;
		var navItemsMoreWidth = $("#shows-nav .nav-items .more").outerWidth(true);
		var navItemsCount = $("#shows-nav .nav-items li").length - 2;
		var showMore = false;
		var mouseOverActiveElement = false;
		
		jQuery("#shows-nav .nav-items li").each(function(index) {
			if (!jQuery(this).hasClass("more")) {
				thisWidth = jQuery(this).outerWidth(true);
				if ((navItemsWidth + thisWidth) > navItemsMaxWidth) {
					jQuery(this).find("a").removeAttr("style");
					jQuery(this).appendTo("#shows-nav .nav-items .more ul");
					showMore = true;
					//adding :more to the omniture tracking
					var ssOmniture = jQuery(this).find("a").attr("data-omniture");
					var ssoArray = ssOmniture.split(",");
					var colIndex = ssoArray[0].lastIndexOf(":");
					var linkName = ssoArray[0].substr(0, colIndex)+":more"+ssoArray[0].substr(colIndex);
					colIndex = ssoArray[3].lastIndexOf(":");
					var eVar30 = ssoArray[3].substr(0, colIndex)+":more"+ssoArray[3].substr(colIndex);
					var ssOmniture = linkName+","+ssoArray[1]+","+ssoArray[2]+","+eVar30;
					
					jQuery(this).find("a").attr("data-omniture",ssOmniture);
					
				} else if (((navItemsWidth + thisWidth + navItemsMoreWidth) >= navItemsMaxWidth) && (index < navItemsCount)) {
					jQuery(this).find("a").removeAttr("style");
					jQuery(this).appendTo("#shows-nav .nav-items .more ul");
					showMore = true;
					
					//adding :more to the omniture tracking
					var ssOmniture = jQuery(this).find("a").attr("data-omniture");
					var ssoArray = ssOmniture.split(",");
					var colIndex = ssoArray[0].lastIndexOf(":");
					var linkName = ssoArray[0].substr(0, colIndex)+":more"+ssoArray[0].substr(colIndex);
					colIndex = ssoArray[3].lastIndexOf(":");
					var eVar30 = ssoArray[3].substr(0, colIndex)+":more"+ssoArray[3].substr(colIndex);
					var ssOmniture = linkName+","+ssoArray[1]+","+ssoArray[2]+","+eVar30;
					
					jQuery(this).find("a").attr("data-omniture",ssOmniture);
				}
				navItemsWidth += thisWidth;
			}
		});
		
		if (!showMore) jQuery("#shows-nav .more").hide();

		//Unhide nav-items after adjustments
		jQuery("#shows-nav .nav-items").css("visibility","visible");

		//Show more menu on click
		jQuery("#shows-nav .more").click(function(){ 
			jQuery(this).toggleClass("expanded");
		});
		
		//Close when clicked outside of menu
		jQuery("#shows-nav .more").live("mouseenter", function(){
		    mouseOverActiveElement = true; 
		}).live("mouseleave", function(){ 
		    mouseOverActiveElement = false; 
		});

		jQuery("html").click(function(){ 
		    if (!mouseOverActiveElement) jQuery("#shows-nav .more").removeClass("expanded");
		});
	} //Shows sub-nav
	
	/*nav flyout effects */
	
	var collapseFlyoutTimer = null;
	
	if(!isTablet) {
	$(".NavR_Header_facebook, #NavR_fblike_slideout").hover(
		  function() {
			  revealFlyout();
		  }, 
		  function() {
			  clearTimeout(collapseFlyoutTimer);
			  collapseFlyoutTimer = setTimeout(function(){
				  collapseFlyout();
			  }, 3000);
		  }
		);
	}
	
	revealFlyout = function() {
		  jQuery("#NavR_fblike_slideout").removeClass("collapsed");
		  clearTimeout(collapseFlyoutTimer);
		  collapseFlyoutTimer = setTimeout(function(){
			  collapseFlyout();
		  }, 3000);
	};
	
	collapseFlyout =  function() {
		  jQuery("#NavR_fblike_slideout").addClass("collapsed");
	};
	

	jQuery(".NavR_Header_facebook").click(function(){
		if (jQuery("#NavR_fblike_slideout").hasClass("collapsed")){
			revealFlyout();
		} else {
			collapseFlyout();
		}
	});
	

	
	/**********************************************************
	 * 
	 * Nav Tracking
	 * 
	 **********************************************************/
	
	
	
	//for deferred invocation....
	var partial = function (func /*, 0..n args */) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return function () {
	        var allArguments = args.concat(Array.prototype.slice.call(arguments));
	        return func.apply(this, allArguments);
	    };
	};

	
	//tracking functions map
	//one line per mapping group so we can clearly see what's going on
	//each element selector maps to a general tracking function that will be invoked.
	//this is not concerned about specific tracking providers, only what is desired to be tracked 
	var trackingMap = [
	                   
	           		
	    /* MAIN */
	               //NavR_Header_Subnav_List NavR_ll_News    
	    /* general list items */
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_News a.thumb-link",  "trackingFunction" : partial(generalTrack, "news", "thumb")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_News a.title-link",  "trackingFunction" : partial(generalTrack, "news", "title")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_Photos a.thumb-link",  "trackingFunction" : partial(generalTrack, "photos", "thumb")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_Photos a.title-link",  "trackingFunction" : partial(generalTrack, "photos", "title")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_Videos a.thumb-link",  "trackingFunction" : partial(generalTrack, "videos", "thumb")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_Videos a.title-link",  "trackingFunction" : partial(generalTrack, "videos", "title")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_style a.thumb-link",  "trackingFunction" : partial(generalTrack, "style", "thumb")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_style a.title-link",  "trackingFunction" : partial(generalTrack, "style", "title")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_TVScoop a.thumb-link",  "trackingFunction" : partial(generalTrack, "tvscoop", "thumb")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_TVScoop a.title-link",  "trackingFunction" : partial(generalTrack, "tvscoop", "title")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_EShows_clips a.thumb-link",  "trackingFunction" : partial(generalTrack, "eshows", "thumb")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_EShows_clips a.title-link",  "trackingFunction" : partial(generalTrack, "eshows", "title")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_RedCarpet a.thumb-link",  "trackingFunction" : partial(generalTrack, "redcarpet", "thumb")},
		{elementSelector : ".NavR_Header_Subnav_List.NavR_ll_RedCarpet a.title-link",  "trackingFunction" : partial(generalTrack, "redcarpet", "title")},

		/* Other stuff in SHOWS TAB */
			/* side bar items */
		{elementSelector : ".NavR_Header_EShows_sidemenu_tab.navr_clips",  "trackingFunction" : partial(generalTrack, "eshows", "eshows-clips")},
		{elementSelector : ".NavR_Header_EShows_sidemenu_tab.navr_shows",  "trackingFunction" : partial(generalTrack, "eshows", "eshows-shows")},
		{elementSelector : ".NavR_Header_EShows_sidemenu_tab.navr_schedule",  "trackingFunction" : partial(generalTrack, "eshows", "eshows-schedule")},		
			/*shows */
		{elementSelector : ".NavR_Header_Subnav_EShows_showGrids a",  "trackingFunction" : partial(generalTrack, "eshows", "eshows-ashow")},		
			/*more shows button */
		{elementSelector : "#NavR_moreShows_button",  "trackingFunction" : partial(generalTrack, "eshows", "eshows-more")},	
			/*full schedule */
		{elementSelector : ".NavR_schedule_date_box a",  "trackingFunction" : partial(generalTrack, "eshows", "eshows-full-schedule")},
		
		/* MORE TAB */
		{elementSelector : "#Newsletter_Button",  "trackingFunction" : partial(generalTrack, "more", "newsletter-subscribe")},
		{elementSelector : "#NavR_ourapp_a_0",  "trackingFunction" : partial(generalTrack, "more", "ios")},
		{elementSelector : "#NavR_ourapp_a_1",  "trackingFunction" : partial(generalTrack, "more", "android")},

		{elementSelector : ".NavR_More_list a",  "trackingFunction" : moreMiscTrack},

		{elementSelector : ".NavR_Header_Subnav_featuredlist a",  "trackingFunction" : partial(generalTrack, "more", "featured")},
		
		/* SEARCH */
		{elementSelector : ".NavR_Header_SearchLogo",  "trackingFunction" : partial(generalTrack, "search", "search-magnify")},
		{elementSelector : ".NavR_Header_Search_Close" , "trackingFunction" : partial(generalTrack, "search", "search-close")},
		{elementSelector : "#NavR_Header_Search_Submit",  "trackingFunction" : partial(generalTrack, "search", "search-enter")},
		
		/* SOCIALS */
		{elementSelector : ".NavR_Header_twitter",  "trackingFunction" : partial(socialTrack, "TWEET")},
		{elementSelector : ".NavR_Header_instagram",  "trackingFunction" : partial(socialTrack, "INSTAGRAM")},
		{elementSelector : ".NavR_Header_googleplus",  "trackingFunction" : partial(socialTrack, "GOOGLE-SHARE")},
		{elementSelector : ".NavR_Header_pinterest",  "trackingFunction" : partial(socialTrack, "PINTEREST")},
		{elementSelector : ".NavR_Header_tumblr",  "trackingFunction" : partial(socialTrack, "TUMBLR")}
		

	];
	
	//tracking handlers
	function generalTrack(contentType, elementType, objData, position, context){
		console.log('called generalTrack ' + contentType + ' + ' + elementType);
		
		mapToOmniture(contentType, elementType, objData, position);
	}
	
	//for socials
	function socialTrack(socialType){
		console.log('called socialTrack ' + socialType);
		
		mapSocialsToOmniture(socialType);
	}
	
	//we need this because there is no data or id's here just some text
	function moreMiscTrack(objData, position, context) {
		console.log('called miscTrack ');
	
		var thisText = jQuery(context).text();
		var contentType = "more";
		var elementType = "";
		switch (thisText.toUpperCase()){
			case 'RSS FEEDS':
				elementType = "rss-feed";
				break;
			case 'SHOP':
				elementType = "shop";
				break;
			case 'MOBILE':
				elementType = "mobile";
				break;
			case 'E! NOW':
				elementType = "e!-now";
				break;
			case 'ABOUT US':
				elementType = "about-us";
				break;
			case 'FAQ':
				elementType = "faq";
				break;
			case 'CAREERS':
				elementType = "careers";
				break;
			case 'CONTACT US':
				elementType = "contact-us";
				break;
		}
		mapToOmniture(contentType, elementType, objData, position);
	}
	
	
	//bind one
	function bindTrackingBySelector(selector, trackingFunction){
		try{
			jQuery(selector).click(function(){

				var objDataRef = jQuery(this).attr("data-object");
				var objData;
				if (typeof objDataRef !== 'undefined' && objDataRef != '') {
					try{
						objData = eval(objDataRef); //we will get the data we need from the object referenced here
					}catch(err){
						console("**ERROR in eval of Omniture data object*** :" + err );
					}
				} else {
					objData = {};
				}
				
				if (typeof objData.uri === 'undefined' || objData.uri === '') {
					//get url if possible
					var href = jQuery(this).attr("href");
					if  (typeof href === 'undefined') {
						href =''; //no link
					}
					objData.uri =  href;
				}
				
				var position;
				position = jQuery(this).closest('li').index() + 1; //1 based
				if (typeof position === 'undefined'){
					position = 1;
				}

				trackingFunction(objData, position, this); //adds argument

			});
		} catch(err) {
			console("**ERROR Omniture mapping*** :" + err );
		}
	}
	
	//bind them all
	function bindTrackings(){
		for(i=0; (i < trackingMap.length) ;i++){
			bindTrackingBySelector(trackingMap[i].elementSelector, trackingMap[i].trackingFunction);
		}
	}

	//since we are rendering by js  we have to call this 
	jQuery(document).ready(function (){
		bindTrackings();
	});
	
		
	/*************************
	 * omniture-specific
	 *************************/
	

	function mapToOmniture(contentType, elementType, objData, position) {
		
		var navigationType = "";
		if (!isCollapsed) {
			navigationType = "top-navigation";
		} else {
			navigationType = "collapsed-navigation";
		}
		
		var navigationName = "";
		if (contentType == 'tvscoop'){
			navigationName = 'tv-scoop';
		} else if (contentType == 'redcarpet') {
			navigationName = 'red-carpet';
		} else if (contentType == 'eshows') {
			navigationName = 'e!-shows';
		} else {
			navigationName = contentType;
		};
		
		var destinationURL = "";
		if (typeof objData.uri !== 'undefined'){
			destinationURL = objData.uri;
		}
		
		var callToAction = "";
		var elementClicked = "";

		switch(elementType) {
			case  'thumb':
				elementClicked = 'image';
				callToAction = objData.omnitureImageName;
				break;
			case 'title':
				elementClicked = 'title';
				callToAction = objData.omnitureTitle;
				break;
			case 'eshows-clips':
				elementClicked = 'clips';
				callToAction = objData.omnitureImageName;
				break;
			case 'eshows-shows':
				elementClicked = 'shows-subnav';
				callToAction = 'shows';
				break;
			case 'eshows-schedule':
				elementClicked = 'shows-subnav';
				callToAction = 'schedule';
				break;
			case 'eshows-ashow':
				elementClicked = 'image';
				//stub-in show name
				var parts =  objData.uri.split("/");
				var showname = parts[parts.length -1];
				showname = showname.replace("_", "-");
				destinationURL = objData.uri;
				callToAction = 'shows:' + showname;
				break;
			case 'eshows-more':
				elementClicked = 'more';
				callToAction = 'shows:more';
				break;
			case 'eshows-full-schedule':
				elementClicked = 'schedule';
				callToAction = 'full-schedule';				
				break;
			case 'ios':
			case 'android':
				elementClicked = 'appstore-click';
				callToAction = elementType;	
				break;
			case 'rss-feed':
			case 'shop':
			case 'mobile':
			case 'e!-now':
			case 'about-us':
			case 'faq':
			case 'careers':
			case 'contact-us':
				elementClicked = 'more';
				callToAction = elementType;	
				break;	
			case 'featured':
				elementClicked = 'featured-image';
				//stub-in feature name
				var parts =  objData.link.split("/");
				var featname = parts[parts.length -1];
				featname = featname.replace("_", "-");
				destinationURL = objData.link;
				callToAction = featname;
				break;
			case 'search-magnify':
			case 'search-enter':
			case 'search-close':
				elementClicked = 'search';
				callToAction = elementType;
				break;
			case 'newsletter-subscribe':
				elementClicked = 'subscribe';
				callToAction = elementType;
				break;
				
		}
		
		if (typeof s === 'undefined') {
			return; //cannot do anything without it.
		}
		var lnk = "";
		
		s.linkTrackVars = "events,eVar4,eVar16,eVar17,prop17";
		s.linkTrackEvents = "event21";
		s.events = "event21";

		s.products=";" + navigationType + ":" + navigationName + ";;;event21";	
		s.eVar4=s.pageName;	
		s.eVar16=navigationType + ":" + navigationName;	
		s.eVar17=navigationType + ":" + navigationName + ":" + destinationURL;	
		s.prop17=navigationType + ":" + navigationName + ":" + position + ":" + elementClicked + ":" + callToAction;	

		s.tl(true, 'o', s.eVar17); //???
	}

	
	function mapSocialsToOmniture(socialType){
		if (typeof s == 'undefined') {
			return; //cannot do anything without it.
		}

		var eVar67 = "social"; 
		var eVar68 = "";
		var lnk = ""; //no req
		switch(socialType) {
			case "FACEBOOK-SHARE" :
				eVar68 = "facebook";
				break; //not used in this case because it is now a native like button and we have no button or event to hook into on those
			case "GOOGLE-SHARE":
				eVar68 = "google+";
				break;
			case "TWEET" :
				eVar68 = "twitter";
				break;
			case "PINTEREST" :
				eVar68 = "pinterest";
				break;
			case "TUMBLR" :
				eVar68 = "tumblr";
				break;
			case "INSTRAGRAM" : 
				eVar68 = "instagram";
				break;
		}
		//custom set up of omniture 
		
		s.linkTrackVars = "events,eVar67,eVar68";
		s.linkTrackEvents = "event20";
		s.events = "event20";
		s.eVar67 = eVar67;
		s.eVar68 = eVar68;
		s.tl(true, 'o', 'main-nav-social-link'); //???
	}


	
	
	/*****
	since the nav can be placed into different layouts that have different look and feel requirements,
	we need to expose a way for other code to control its internal width. 
	******/
	eonline_Globalnav.setContentWidth = function(width) {
		if (width < 980){ 
			width = 980;
		}
		
		maxPageWidth = width;
		
		fixedSizingCheck();
		
		$(mainMenuCont).css("maxWidth", width+'px');
		updateNavColWidth();
	}
	
	//we may need this - show or hide nav bar extenders
	eonline_Globalnav.extenders = function(blnShow) {
		if (blnShow) {
			jQuery("#HHeader").addClass("extenders");
		} else {
			jQuery("#HHeader").removeClass("extenders");
		}
	}
	
	
	function adSkinCheck() {
		try {	
			if (eol.page.isSkinned()){
				eonline_Globalnav.extenders(false); //make room
				jQuery("#HHeader").addClass("skinned");
			}
		} catch(err) {
			console.log(err);
		}
	}
	
	adSkinCheck(); //run skin check
	

	
} //eonline_Globalnav 

eonline_Globalnav(); //run

})(jQuery);