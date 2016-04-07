//globalnav.js file is used by asp systems and gnav.js file that will be generated using build process will be used by myverizon and cis teams






//append custom jQuery gnav libs
if(vzw_gnjq) {
	(function($) { 
		/*** checkbox plugin ***/
		/*** Douglas Walsh   ***/
		$.fn.gn_checkbox = function() {
			return this.each(function() {
				//Insure aria-labelledby
				var id = $(this).attr('id');
				var lb = $(this).attr('aria-labelledby');
				if(id && id.length>0 && !lb) {
					var lbl = $('label[for="'+id+'"]');
					if(lbl.length>0) {
						var lblId = $(lbl[0]).attr('id');
						if(!lblId || lblId.length<=0) {
							//generate a unique id for the label
							lblId = 'checkbox-label-id-XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX'.replace(/[XY]/g, function(c) { var r = Math.random()*16|0, v = c == 'X' ? r : (r&0x3|0x8);return v.toString(16);});
							$(lbl[0]).attr('id', lblId);
						}
						$(this).attr('aria-labelledby', lblId);
					}
				}
				
	    		$(this).wrap('<span class="gn_checkboxCont"></span>').before('<span class="vgn-icon-checkbox" aria-hidden="true"></span>').on('mouseover', function() {
	    			$(this).parent().addClass('hover');
	    		}).on('mouseout', function() {
	    			$(this).parent().removeClass('hover');
	    		}).on('focus', function() {
	    			$(this).parent().addClass('focus');
	    		}).on('blur', function() {
	    			$(this).parent().removeClass('focus');
	    		}).on('change', function() {
	    			var c = 'checked';
	    			var par = $(this).parent();
	    			if(this.checked) {
	    				par.addClass(c);
	    			} else {
	    				par.removeClass(c);
	    			}
	    		}).trigger('change');
	    	});
		}

		/*** tooltip plugin ***/
		/*** Douglas Walsh  ***/
		$.fn.gn_tooltip = function() {
			return this.each(function() {
				var p = 'processed';
				if(!$(this).hasClass(p)) {
					var text = $(this).html();
					var lblId = lblId = 'tooltip-label-id-XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX'.replace(/[XY]/g, function(c) { var r = Math.random()*16|0, v = c == 'X' ? r : (r&0x3|0x8);return v.toString(16);});
					var attrs = {'aria-labelledby':lblId};
					var albl = $(this).attr('aria-label');
					if(!albl || albl.length<=0) {
						attrs['aria-label'] = 'Tooltip';
					}
					$(this).html('<span class="vgn_tooltip-icon" aria-hidden="true">&#58895;</span><span class="vgn_tooltip-pointer" aria-hidden="true">&nbsp;</span><span class="vgn_tooltip-text" aria-hidden="true" id="'+lblId+'">'+text+'</span>').addClass(p).attr(attrs).on('focus blur mouseover mouseout', function() {
						var txt = $(this).children('.vgn_tooltip-text');
						txt.attr('aria-hidden', txt.is(':visible') ? 'false' : 'true');
					});
				}
	    	});
		}

		/*** select plugin ***/
		/*** Douglas Walsh ***/
		$.fn.gn_select = function() {
			return this.each(function() {
				var p = 'processed';
				if(!$(this).hasClass(p)) {
					var id = $(this).attr('id');
					if(!(id && id.length>0)) {
						id = 'select-id-XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX'.replace(/[XY]/g, function(c) { var r = Math.random()*16|0, v = c == 'X' ? r : (r&0x3|0x8);return v.toString(16);});
						$(this).attr({id:id});
					}
					var ti = $(this).attr('tabindex');
					var lis = '';
					var opts = $(this).find('option');
					var si = 0;
					var st = '';
					for(var i=0;i<opts.length;++i) {
						var opt = $(opts[i]);
						var isSel = opt.is(':selected');
						lis += '<div role="option" id="'+id+'-opt-'+i+'" data-index="'+i+'" tabindex="-1"'+(isSel ? ' class="gn_select-selected"' : '')+'><span class="gn_select-option-text">'+opt.text()+'</span><span class="gn_select-option-chosen" aria-hidden="true"></span></div>';
						si = isSel ? opt.index() : si;
					}
					var so = $(this).find('option:eq('+si+')');
					if(so.length>0) {
						var st = so.text();
					}
					
					var openDD = function(_this) {
						var sel = $(_this).attr('aria-expanded','true').addClass('open').children('.gn_select-options').attr('aria-hidden','false').find('.gn_select-selected');
						if(sel.length>0) {
							sel.focus();
						}
					};
					var closeDD = function(_this, focus) {
						_this = $(_this);
						var sb = _this.hasClass('gn_select-box') ? _this : $($(_this).parents('.gn_select-box')[0]);
						sb.removeClass('open').attr('aria-expanded','false').children('.gn_select-options').attr('aria-hidden','true');
						if(focus) {
							sb.focus();
						}
					};
					var selOpt = function(_this) {
						var selInd = $(_this).data('index');
						var selId = $(_this).attr('id');
						var selText = $(_this).find('.gn_select-option-text').text();
						var c = 'gn_select-selected';
						$(_this).addClass(c).siblings().removeClass(c);
						var sb = $($(_this).parents('.gn_select-box')[0]);
						sb.attr({title:selText,'aria-activedescendant':selId}).find('.gn_select-chosen-text').text(selText);
						
						var sel = $('#'+sb.data('id'));
						sel[0].selectedIndex = selInd;
						sel.trigger('change');
						
						closeDD(_this,true);
					};
					var moveFocus = function(_this, isUp) {
						var p = (isUp ? $(_this).prev() : $(_this).next());
						if(p.length>0) {
							p.focus();
						}
					};
					
					$(this).css({display:'none'});
					$(this).after('<div class="gn_select-box" role="listbox" data-id="'+id+'" title="'+st+'" aria-expanded="false" tabindex="'+(ti && ti.length>0 ? ti : '0')+'" aria-activedescendant="'+id+'-opt-'+si+'"></div>');
					var gns = $(this).next();
					gns.html('<div class="gn_select-chosen"><span class="gn_select-chosen-text">'+st+'</span>&nbsp;<span class="gn_select-caret" aria-hidden="true"></span></div><div class="gn_select-options" aria-hidden="true">'+lis+'</div>').on('focusout', function() {
						var _this = this;
						setTimeout(function() {
							if($(document.activeElement).closest('.gn_select-box').length<=0) {
								closeDD(_this,false);
							}
						}, 10);
					}).on('keydown', function(e) {
						var code = e.keyCode || e.which;
						if(code == 13 || code == 27 || code == 32 || (code>=37 && code<=40)) {
							if(code == 13 || code == 32 || code == 38 || code == 40) {
								//return-space-up-down
								openDD(this);
							
								e.stopPropagation();
								e.preventDefault();
								return false;
							}
						}
					}).on('click', function() {
						openDD(this);
					});
					gns.find('.gn_select-options > div').on('click', function(e) {
						selOpt(this);

						e.stopPropagation();
						e.preventDefault();
						return false;
					}).on('keydown', function(e) {
						var code = e.keyCode || e.which;
						if(code == 9 || code == 13 || code == 27 || code == 32 || (code>=37 && code<=40)) {
							if(code == 13 || code == 32) {
								//return-space
								selOpt(this);
							} else if(code == 9) {
								//tab
								moveFocus(this, e.shiftKey);
							} else if(code == 37 || code == 38) {
								//up-left
								moveFocus(this, true);
							} else if(code == 39 || code == 40) {
								//right-down
								moveFocus(this, false);
							} else if(code == 27) {
								//escape
								closeDD(this,true);
							}
							
							e.stopImmediatePropagation();
							e.preventDefault();
							return false;
						}
					});
				}
	    	});
		}
	})(vzw_gnjq);
}





var gn_category;
var cartStatus;
var zipDisplay;
var gnlin_gnLoadTimer;
var gnlin_gnLoadCtr;
var gnlin_gnWeatherTimer;
var gnlin_scu;
var gnlin_dbconfig;
var gnlin_asu;
var gnlin_usu;
var gnlin_defRoleFileName="W.js";
var gnlin_defMyBizRoleFileName="B.js";
var gnlin_defLOutRoleFileName="WO.js";	
var gnlin_curRoleFileName="";
var gnlin_roleFileName = "";
var gnlin_roleCookieName = "role"; 
var gnlin_servicesCookieName = "services";
var gnlin_loggedinCookieName="loggedIn"; 
var gnlin_oneBillCompCookieName = "OC";
var gnlin_amIDCookieName = "amID";
var gnlin_alltelCookieName = "alltelDevice";
var gnlin_cartCookieName="CARTVIEW";
var gnlin_greetingCookieName="greetingName";
var gnlin_oneVZ="oneVerizon";
var gnlin_greetingDefValue=" ";
var gnlin_zipCodeCookieName="ZIPCODE";
var gnlin_cityCookieName="CITY";
var gnlin_stateCookieName="STATE";
var gnlin_wbCookieName="WBC"; 
var gnlin_popLocCookieName="POPlocation";
var gnlin_gnExpandCookieName="GE";
var gnlin_gnTxtCookieName="GNF";
var gnlin_gnConfigCookieName="GNCF";
var gnlin_gnMyBizCookieName="mybizCookie";
var gnlin_gnMlsCookieName="MLS_SEARCH_TRACK";
var gnlin_isWOReady=false;
var gnlin_debug=true;
var gnlin_debugstr="";
var gnlin_Domain=null; 
var gnlin_uscTimer;
var gnlin_uscTimeOutFlag="N";
var gnlin_ascTimer;
var gnlin_ascTimeOutFlag="N";
var gnlin_ascTimeOut=4000;
var gnlin_htmlTimer;
var gnlin_htmlTimeOut=3000;
var gnlin_htmlTimeOutFlag="N";
var gnlin_gltxtTimeout=3000;
var gnlin_myac_server; 
var gnlin_wbcCacheTime=15*60*1000;
var gnlin_wtooltipZindex=520;
var gnlin_oglobalNavIdZ=null;
var gnlin_oglobalNavIdPos=null;
var gnlin_forcedLogout=null;
var gnlin_popLoc=null;
var gnlin_gnServScrCallEnabled="N";
var gnlin_searchDelay = '300';
var gnlin_searchDisable = false;
var gnlin_searchSuggestSaveDisable=false;
var gnlin_GN1_ht=false;
var gnlin_GN2_ht=false;
var gnlin_GN3_ht=false;
var gnlin_GN4_ht=false;
var gnlin_SearchEnabled='Y';
var gnlin_isSignInFormElClicked='N';
var gnlin_overlay=false;  
var gnlin_gnOLoadCtr=0;
var gnlin_signInOMsg=null;
var gnlin_singInOSpec=null;
var gnlin_responsiveGN=false;
var gnlin_gnNotificationDisabled="Y";
var gnlin_glCfgServerUrl="https://ecache.verizonwireless.com/imageFiles/Myacct/gn_config";
var gnlin_gntypah ="https://www.verizonwireless.com/search/assembler?assemblerContentCollection=/content/GSS/Web/GSS%20TypeAhead%20Collections&format=jsonp&Dy=1&Ntt=";
var gnlin_landingPageApiflag = false;
var gnlin_accessManagerHeaderApiflag = false;
var gnLoadMPScript='1';
var gnlin_searchTerms = null;
var gnlin_prevGNVersion = "2013/21/05";
var gnlin_msoCookieName = "MSO";
var gnlin_myvzFixedSubMenuWrapper = false;

var gnlin_cqc;

	function render(globalnav){	
		vzgn.gnDebug("Entering render fn");
		
		//resetting variables for same page toggling
		vzgn.isLoggedIn=false;
		vzgn.isMyBizMenu=false;
		vzgn.setIsLoggedIn();
		vzgn.setIsMso();
		  
		if(vzw_gnjq("#globalNavId").hasClass("vgn_html")){
			vzgn.isInlineGN=true;
			vzw_gnjq("#globalNavId").removeClass("vgn_html");
		}else{
			vzgn.isInlineGN=false;
		}
		if(gnlin_forcedLogout!=null && gnlin_forcedLogout=="Y"){	
			vzgn.isLoggedIn=false;
		}
		gnlin_searchDisable=false;
		if (vzgn.isLoggedIn){
		   	vzgn.renderLoggedInMenu();
		}else{
			vzgn.renderLoggedOutMenu();
		}
	}
	function launchGlobalNav(){
		render('globalNavId');
	}
	var signInDialog={
		render: function(msg,specObj){
			vzgn.renderSignInOverlay(msg,specObj);			
		}
	};
	function setGNZIndex(zIndex){
		try{
			if(zIndex!=null){
				var gnNavId = vzw_gnjq("#globalNavId");
				if(gnNavId!=null && gnNavId.length>0){
					gnNavId.css("z-index",zIndex+100+"");
					gnNavId.css("position","relative");
				}
				vzgn.setGNZIndexVal(vzw_gnjq("#desktopOmniNav"), zIndex+50);
				vzgn.setGNZIndexVal(vzw_gnjq("#desktopOmniNav nav.o-nav-wrapper"), zIndex+20);
				vzgn.setGNZIndexVal(vzw_gnjq("#desktopOmniNav nav.o-nav-wrapper .o-tier-two"), zIndex+10);
				vzgn.setGNZIndexVal(vzw_gnjq("#desktopOmniNav #vgn_loginContainer"), zIndex+41);
				vzgn.setGNZIndexVal(vzw_gnjq("#desktopOmniNav #vgn_siOverlay"), zIndex+40);
				vzgn.setGNZIndexVal(vzw_gnjq("#desktopOmniNav  #vgn_signIn"), zIndex+103);
			}
		}catch(e){
			vzgn.gnDebug("Invalid z-index"+zIndex); 
		}
	}
	function updateMenuURL(id, url, newWindow){
		try {
			if(url!=null && id!=null && url != '' && id != '') {
				var selector = ':first';
				var attrs = {href:url};
				var getDefault = false;
				
				if(id=="logout") {
					id="vzwsignout";
				}
   				if(id=="vgn_signIn" || id=="vgn_signIn_vzw" || id=="vgn_signIn_mybiz"){
   					if(id=="vgn_signIn_vzw") {
   						attrs['data-vzw'] = url;
   					} else if(id=="vgn_signIn_mybiz") {
   						attrs['data-mybiz'] = url;
   					} else {
   	   					getDefault = true;
   					}
   					id="vgn_signIn";
   					selector = ':eq(1)';
					delete attrs.href;
   				}
   				
   				var anchorLink = vzw_gnjq('*[data-navid="'+id+'"] > a'+selector);
   				if(anchorLink.length>0){
   					if(getDefault) {
   						var defaultVal = anchorLink.attr('data-default');
   						if(id=="vgn_signIn") {
   							attrs['data-'+defaultVal] = url;
   						}
   					}
   					if(id=="vgn_signIn") {
   						var currentVal = anchorLink.attr('data-current');
						if(attrs['data-'+currentVal]) {
							attrs.href = attrs['data-'+currentVal];
						}	
   					}
   					anchorLink.attr(attrs);
   				}
			}
		} catch(e){
			vzgn.gnDebug("error in updateMenuURL: " + id);
		}
	}
	function setTraybgColor(cssbg){
		//this method is deprecated empty method for backward compatibility
	}

	function setSliderView(slSt){
		//this method is deprecated empty method for backward compatibility
	}
	
	function vgn_hbLink(lid, pos){
		if(typeof _hbLink != 'undefined'){
		  if(typeof _hbxStrip != 'undefined'){
		  	lid = _hbxStrip(lid);
		  }			
		  _hbLink(lid.toLowerCase(), pos);
		} 
	}	
	function highlightMenu(loggedInMenuTab, loggedOuMenuTab){
		//No highlighting in the new nav
		//Keep the method in-case any sites call it directly
	}
   function saveSearchSuggestResp(respObj){
		//dont do anything let it go
	}

	function populateSearchAutoCompleteInfo(data,textStatus){
		//dont do anything let it go
	}
	function setCompOBCookie(companyName, isOneBill, accountRegion, isOneVEnabled){
		vzgn.setCompOBCookie(companyName, isOneBill, accountRegion, isOneVEnabled);	
	}

    var IDToken1Val = 'User ID or Mobile Number';
    var IDToken2Val = 'Password';    
    var signInGN = {
    		goTo:"",
    		rememberUserDisplayValue:"",
    		rememberUserDisplayStyle:"",
    		mbloginURL:"",
    		init: function(){
    			try{
    				if(typeof rememberUserDisplay != 'undefined' && rememberUserDisplay != null && rememberUserDisplay == '1') {
        				this.rememberUserDisplayStyle = 'block';
        				this.rememberUserDisplayValue = 'Y';
    				}else{
    					this.rememberUserDisplayStyle = 'none';
        				this.rememberUserDisplayValue = 'N';
    				}
        			if (typeof window["goto"] != 'undefined' && window["goto"] != null && window["goto"].length>0) {
    					 this.goTo = window["goto"];
    				}	
    			}catch(e){}
    		}
    };
    
	String.prototype.trim = function(){
		return (this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')); 
	};
	var vzgn={
			gnConfig:{"eVZWUrl":"https://ebillpay.verizonwireless.com/vzw", 
					  "wVZWUrl":"https://wbillpay.verizonwireless.com/vzw",
					  "nVZWUrl":"https://nbillpay.verizonwireless.com/vzw"},	
			acct:"vzwprod",
			acctRegion:"E",
			oneV:false,
			isInlineGN:false,
			isLoggedIn:false,
			isMyBizMenu:false,
			isMso:false,
			msoName:'',
			showLoggedOutMenu:false,
			runningFromProd:false,
			runningFromPreprod:false,
			touchEventsInitialized:false,
			renderGNResponsive: function(){
				try{
				     if (typeof responsiveGN != 'undefined' && responsiveGN != null && responsiveGN == '1') {
					gnlin_responsiveGN= true;
					if(vzw_gnjq("#vgn_rnav_info").length==0){
					   vzw_gnjq("#globalNavId").addClass("vgn_responsive");
					   vzw_gnjq("#vgnEnd").before(vzgn_r.getGNHtml());
					}
				     }
				 }catch(e){}
			},
			setGNZIndexVal: function(elList, zIndexVal){
				if(elList!=null && elList.length>0){
					elList.css("z-index",zIndexVal+"");
				}
			},
			isOlderGNLoaded: function(){
			  vzgn.gnDebug("inside isOlderGNLoaded");
			  try{
				if(typeof vzgnGNGenVerion!="undefined"){
					var prevGNVerzion = vzgnGNGenVerion();
					if(prevGNVerzion.indexOf(gnlin_prevGNVersion)>0){
					   vzgn.renderPlainGlNav();
					   vzgn.gnDebug("leaving isOlderGNLoaded");
					   return true;
					}
				}
			   } catch (e) {
			      vzgn.gnDebug("error in isOlderGNLoaded");
			   }
			   vzgn.gnDebug("leaving isOlderGNLoaded");
			},			
			setIsLoggedIn:function(){
				if ((vzw_gnjq.cookie("amID")!=null && vzw_gnjq.trim(vzw_gnjq.cookie("amID")).length>0) || 
				    (vzw_gnjq.cookie(gnlin_loggedinCookieName)!=null && vzw_gnjq.cookie(gnlin_loggedinCookieName)=="true")){
					vzgn.isLoggedIn = true;
				}else{
					vzgn.isLoggedIn = false;
				}
			},
			setIsMso:function() {
				if(vzw_gnjq.cookie(gnlin_msoCookieName)!=null && vzw_gnjq.cookie(gnlin_msoCookieName).length>0) {
					vzgn.isMso = true;
					vzgn.msoName = vzw_gnjq.cookie(gnlin_msoCookieName).toLowerCase();
				}
			},
			gnPreloadMenuImg: function(){
				vzgn.gnDebug("inside gnPreloadMenuImg");
				vzgn.loadImg(gnlin_scu+'/../images/globalnavsprite.png');				
				vzgn.gnDebug("leaving gnPreloadMenuImg");
			},
			loadImg: function(imgUrl){
				var gnImg = new Image();
				gnImg.src = imgUrl;
			},
			highlightMenu: function(){
				//No highlighting in the new nav
				//Keep the method in-case any sites call it directly
			},
			updateMenuLabel: function (id, label){
		  	  if(id!=null && id=="logout"){
				id="vzwsignout";
			  }
			  if(id!=null && vzw_gnjq('*[data-navid="'+id+'"]').length>0 && label!=null && label!=''){
			      var dataEle = vzw_gnjq('*[data-navid="'+id+'"]');
			      var editEle = dataEle;
			      var aEle = vzw_gnjq(editEle).find('a:first');
			      var suffix = '';
			      var prefix = '';
			      if(aEle.length>0) {
			          editEle = aEle;
			          if(dataEle.hasClass('o-item')) {
			        	  //Tier 3
			        	  if(dataEle.hasClass('o-see-all')) {
			                //See if there's an image to keep along with the title change
			              	var innerHtml = aEle.html();
			              	var imgStartPos = innerHtml.indexOf('<img');
			              	if(imgStartPos >= 0) {
			              		var imgEndPos = innerHtml.indexOf('>', imgStartPos);
			              		if(imgEndPos >= 0) {
			              			prefix = innerHtml.substr(imgStartPos, imgEndPos+1);
			              		}
			              	}
			              }
			          } else {
				          var spanEle = editEle.children('span:first');
				          if(spanEle.length>0) {
				          	  editEle = spanEle;
				          }
			          }
			      }
			      //Swap the title inner content
                  editEle.html(prefix+label+suffix);
				}
			},				
			deleteMsoLinks: function(){
				if(vzw_gnjq('*[data-msorestrict="true"]').length>0){
					vzw_gnjq('*[data-msorestrict="true"]').each(function() {
						vzgn.deleteMenuItem( this );
					});
				}
			},			
			deleteMenuURL: function(id){
				if(id!=null && vzw_gnjq('*[data-navid="'+id+'"]').length>0){
					vzgn.deleteMenuItem( vzw_gnjq('*[data-navid="'+id+'"]') );
				}
			},
			deleteMenuItem: function(target) {
				target = vzw_gnjq(target);
				var targetParent = target.parent();
				if(targetParent.hasClass('o-tier-one')) {
					target.prev().remove();
					target.next().remove();
				}
				target.remove();
				
				if(targetParent.parents('.o-tier-three').length>0) {
					vzgn.reformatMenuTier3(targetParent.parents('.o-tier-three'));
				} else if(targetParent.parents('.o-tier-two').length>0) {
					vzgn.reformatMenuTier2(targetParent.parents('.o-tier-two'));
				} else if(targetParent.hasClass('o-tier-one')) {
					vzgn.reformatMenuTier1(targetParent);
				}
			},
			reformatMenuTier1: function(target) {
				if(target != null) {
					target = vzw_gnjq(target);
					if(target.size()>0) {
						//Set the number of children
						var children = target.children('li');
						var numChildren = Math.floor((children.size()-1)/3)+1;
						target.attr('class', 'o-tier-one o-num-'+numChildren);
						
						for(var i=0;i<children.size();++i) {
							var pos = Math.floor(i/3)+1;
							var li = children.eq(i);
							if(i%3 == 0) {
								var hrefHash = '#onavmenu'+(pos+1);
								if(numChildren == pos) {
									hrefHash = '#vgnEnd';
								}
								li.children('a').attr({href:hrefHash, id:'vgnAccId'+pos+'start'});
							} else if(i%3 == 1) {
								li.children('a').attr({id:'onavmenu'+pos});
							} else {
								li.children('a').attr({href:'#onavmenu'+(pos), id:'vgnAccId'+pos+'end'});
							}
						}
					}
				}
			},
			reformatMenuTier2: function(target) {
				if(target != null) {
					target = vzw_gnjq(target);
					if(target.size()>0) {
						//Set the number of children
						var numChildren = target.find('.o-list-table > ul > li').size();
						target.attr('class', 'o-tier-two o-col-'+numChildren);
					}
				}
			},
			reformatMenuTier3: function(target) {
				if(target != null) {
					target = vzw_gnjq(target);
					if(target.size()>0) {
						var colNum = -1;
						if(target.hasClass('o-col-1'))
							colNum = 1;
						else if(target.hasClass('o-col-2'))
							colNum = 2;
						else if(target.hasClass('o-col-3'))
							colNum = 3;
						else if(target.hasClass('o-col-4'))
							colNum = 4;
						if(colNum>0) {
							var items = [];
							var $items = target.find('td');
							var i;
							for(i=0;i<$items.length;++i) {
								items.push( vzw_gnjq($items[i]).detach() );
							}
							target.find('tr').remove();
							var table = target.find('table');
							for(i=0;i<items.length;++i) {
								if(i%colNum == 0) {
									table.append('<tr></tr>');
								}
								table.find('tr:last-child').append(items[i]);
							}
						}
					}
				}
			},
				
			updateMenuItem: function(id, url, label, newWindow){	
				vzgn.updateMenuLabel(id, label);	
				updateMenuURL(id, url, newWindow);
			},
			setGnDomain: function(){
				var docLoc = document.location +"";
				var contextPathArr = docLoc.split("/");
				if(contextPathArr!=null && contextPathArr.length>=3){			
					var domainNmAndPort = contextPathArr[2].split(":");		
					if(domainNmAndPort!=null && domainNmAndPort.length>=1){		
						var domainNm = domainNmAndPort[0].split(".");
						if(domainNm.length==1){
							gnlin_Domain = "";
						}else if(domainNm.length>=2){
							gnlin_Domain = "."+domainNm[domainNm.length-2]+"."+domainNm[domainNm.length-1];
						}
					}
				}	
			},			
			getGnDomain: function(){
				if(gnlin_Domain==null){
					vzgn.setGnDomain();
				}
				return gnlin_Domain;
			},
			gnDebug: function(inputstring) {
				var maxChars=3072;
				if(gnlin_debug==true){
					var cur_d = new Date();
					var cur_hour = cur_d.getHours();
					var cur_min = cur_d.getMinutes();		
					var cur_sec = cur_d.getSeconds();
					var cur_msec = cur_d.getMilliseconds();
				
					gnlin_debugstr=gnlin_debugstr +cur_hour + ":" + cur_min + ":" + cur_sec + ":" + cur_msec +" "+inputstring+"\n";
					if(gnlin_debugstr!=null && 
					   gnlin_debugstr.length>=maxChars){
						gnlin_debugstr =gnlin_debugstr.substring(1024);
					}
				}
			},
			getDebugStr: function(){
				if(vzw_gnjq("#debugstr").length>0){
					vzw_gnjq("#debugstr").remove();
				}
				vzw_gnjq("body").append("<div id=\"debugstr\"><textarea style=\"width:700px;height:200px;\">"+gnlin_debugstr+"</textarea></div>");	
				return gnlin_debugstr;
			},
			resetDebugStr: function(){
				return gnlin_debugstr="";
			},
			removeSpChar: function(str){
			  if(str!=null && str.length>0){
				  str = str.replace(/'/gm, ""); 
				  str = str.replace(/"/gm, "");
				  str = str.replace(/--/gm, ""); 
				  str = str.replace(/</gm, ""); 
				  str = str.replace(/=/gm, ""); 
				  str = str.replace(/\?/gm, "");
				  str = str.replace(/\*/gm, ""); 
				  str = str.replace(/>/gm, "");
				  str = str.replace(/\;/gm, ""); 
				  str = str.replace(/\//gm, ""); 
				  str = str.replace(/\\/gm, ""); 
				  str = str.replace(/&/gm, ""); 
				  str = str.replace(/(%00)/gm, ""); 	  	  
				  str = str.replace(/(\r)/gm, "");  	  
			   	  str = str.replace(/(\n)/gm, "");
			   	  str = str.replace(/%/gm, "");   	  
			  }
			  return str;
			},						
			renderLoggedOutMenu: function(){
				vzgn.gnDebug("inside renderLoggedOutMenu");
				try {
					if(typeof myBusinessDisplay != 'undefined' && myBusinessDisplay != null && myBusinessDisplay == '1') {
						 vzgn.isLoggedIn=false;
						 vzgn.isMyBizMenu=true;
						 gnlin_searchDisable=true;
					} else if(typeof onDetectBizOrWireless != 'undefined' && onDetectBizOrWireless != null && onDetectBizOrWireless == '1') {
						var mybizCookieVal = vzw_gnjq.cookie(gnlin_gnMyBizCookieName);
						if(mybizCookieVal!=null && mybizCookieVal == 'true') {
							vzgn.isLoggedIn=false;
							vzgn.isMyBizMenu=true;
							gnlin_searchDisable=true;
						}
					}
					
					signInGN.init();
					vzgn.showLoggedOutMenu =  true;
					if (!(typeof zipDisplay != 'undefined' && zipDisplay != null && zipDisplay == '0')) {
						var city = vzw_gnjq.cookie(gnlin_cityCookieName);
						var state = vzw_gnjq.cookie(gnlin_stateCookieName);
						if(city!=null && state!=null && city.length>0 && state.length>0){	
							zipDisplay='1';
						}					
					}		
				} catch (e) {
					vzgn.gnDebug("error in renderLoggedOutMenu");
				}
				
				try{					
					vzgn.setGnDomain();
					vzgn.getAllUrls();
				} catch (e) {
					vzgn.gnDebug("error in renderLoggedOutMenu");	
				}							
			},
			checkGlobalIdCookie: function() {
				try {
				   if (vzw_gnjq.cookie("GLOBALID")==null || vzw_gnjq.trim(vzw_gnjq.cookie("GLOBALID")).length==0) {
					   vzw_gnjq.ajax({
						    url: gnlin_usu + '/gid.jsp',
							success: function(data, textStatus) {
								vzgn.gnDebug("success in globalId ajax");
								vzgn.setLPAddVars();
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								vzgn.gnDebug("error in globalId ajax");
							},
							timeout: gnlin_htmlTimeOut,
							dataType: "jsonp",
							jsonpCallback: "gidLoaded"
						});
				   } else {
					   vzgn.gnDebug('GLOBALID cookie found');
				   }			
					
				} catch (e) {
					vzgn.gnDebug("error in checkGlobalIdCookie");
				}
			},			
			gidLoaded: function(response) {
				vzgn.gnDebug('gidLoaded: ', vzw_gnjq.cookie("GLOBALID"));
			},
			renderLoggedInMenu: function(){
				try{
					vzgn.showLoggedOutMenu = false;
					vzgn.gnDebug("inside renderLoggedInMenu");
					vzgn.setGnDomain();
					vzgn.getAllUrls();
				} catch (e) {
					vzgn.gnDebug("error in renderLoggedInMenu - rendering logged out menu");
					vzgn.renderLoggedOutMenu();						
				}
			},
			isRoleFederated: function(servArr){
				var isFederatedFlag = false;
				var tempStr;
				if(servArr!=null){
					for (var i=0; i< servArr.length; i++){
						tempStr = servArr[i];
						if(tempStr!=null){
							tempStr = vzw_gnjq.trim(tempStr);
							if(tempStr=="dsl" || tempStr=="fios" || tempStr=="fiostv" || tempStr=="telecom" || tempStr=="fdv"){
								isFederatedFlag = true;
								break;
							}					
						}
					}				
				}
				return isFederatedFlag;
			},
			setRoleFileName: function(){
				
				if(vzgn.isMyBizMenu) {
					gnlin_roleFileName = gnlin_defMyBizRoleFileName;				
				}else if(vzgn.showLoggedOutMenu){
					gnlin_roleFileName=gnlin_defLOutRoleFileName;
				}else{
					 var role_Wireless = "accountholder";
					 var role_AccountMember = "mobilesecure";
					 var role_AccountMgr = "accountmanager";
					 var role_MyBiz = "sd";
					 var role_Prepay = "prepay";	   
					 var role_Wireless_Code="W";
					 var role_AccountMember_Code = "M";
					 var role_AccountMgr_Code = "A";	 
					 var role_Prepay_Code = "P";
					 var role_Federated_Code = "ITH";
					 var gnlin_roleDefValue=role_Wireless;
					 var masterRoles="M,A,W,P,WITH";	   
					 var role=vzw_gnjq.cookie(gnlin_roleCookieName);
					 var services=vzw_gnjq.cookie(gnlin_servicesCookieName); 
					 if(role==null){
					  role = gnlin_roleDefValue;
					 }
					 role=role.toLowerCase();
				   	 var roles = "";
				   	 if(role.indexOf(role_AccountMember)!=-1){
				   		roles=role_AccountMember_Code;
				   	}else if(role.indexOf(role_Prepay)!=-1){
				   		roles=role_Prepay_Code;
				   	}else if(role.indexOf(role_AccountMgr)!=-1){
				   		roles=role_AccountMgr_Code;			
				   	}else{   			
				   		roles=role_Wireless_Code;
				   		if(services!=null){
				   		   services = services.toLowerCase();
				   			var servicesArr = services.split("|");
				   			if(servicesArr!=null && servicesArr.length>0){
					   			if(vzgn.isRoleFederated(servicesArr)==true){
						   			roles=roles+role_Federated_Code;
						   		}			   					   				
				   			}   				
				   		}
				   	}
				   		
				   	if(masterRoles.indexOf(roles)!=-1){
						gnlin_roleFileName = roles +".js";
				   	}else{
						gnlin_roleFileName = gnlin_defRoleFileName;
				   	}
				}
			    vzgn.gnDebug("setRoleFileName: role file name="+gnlin_roleFileName);
			},
			setIsProdOrPreprodEnv: function(){
				try{
					var docHtml = vzw_gnjq("html").html();
					var gnavPos = docHtml.indexOf("/gnav.js");
					if(gnavPos < 0)
						gnavPos = docHtml.search(/\/gnav.[A-Za-z0-9]*.js/);
					if(gnavPos < 0)
						gnavPos = docHtml.indexOf("/globalnav.js");
					if(gnavPos < 0)
						gnavPos = docHtml.search(/\/globalnav.[A-Za-z0-9]*.js/);
					if(gnavPos >= 0) {
						var linkStartPos = docHtml.lastIndexOf("//", gnavPos);
						if(linkStartPos >= 0) {
							var domainEndPos = docHtml.indexOf("/", linkStartPos+2);
							if(domainEndPos >= 0) {
								var jsDomain = docHtml.substring(linkStartPos+2, domainEndPos).toLowerCase();
								if(jsDomain == "cache.vzw.com" ||
								   jsDomain == "scache.vzw.com" ||
								   jsDomain == "ec-cache.vzw.com" ||
								   jsDomain == "ec-scache.vzw.com" ||
								   jsDomain == "cache.verizonwireless.com" ||
								   jsDomain == "scache.verizonwireless.com") {
									vzgn.runningFromProd=true;
								} else if(jsDomain == "tcache.vzw.com" ||
								   jsDomain == "stcache.vzw.com" ||
								   jsDomain == "tcachelt.vzw.com" ||
								   jsDomain == "stcachelt.vzw.com" ||
								   jsDomain == "ec-tcache.vzw.com" ||
								   jsDomain == "ec-stcache.vzw.com" ||
								   jsDomain == "tcache.verizonwireless.com" ||
								   jsDomain == "stcache.verizonwireless.com" ||
								   jsDomain == "tcachelt.verizonwireless.com" ||
								   jsDomain == "stcachelt.verizonwireless.com") {
									vzgn.runningFromPreprod=true;
								}
							}
						}
					}
				}catch(e){}
			},
			getAllUrls: function(){
				vzgn.gnDebug("inside getAllUrls");
				vzgn.setIsProdOrPreprodEnv();
				var curProtocol = document.location.protocol+"";
				if (vzgn.runningFromProd) {
		    		gnlin_dbconfig = 'Y';
		    		if(curProtocol=="https:"){
						gnlin_scu="https://scache.vzw.com/globalnav/prod";
						gnlin_cqc ="https://www.verizonwireless.com/support";
		    		}else{
		    			gnlin_scu="http://cache.vzw.com/globalnav/prod";
						gnlin_cqc ="http://www.verizonwireless.com/support";
		    		}		    		
		    		gnlin_gntypah="https://www.verizonwireless.com/search/assembler?assemblerContentCollection=/content/GSS/Web/GSS%20TypeAhead%20Collections&format=jsonp&Dy=1&Ntt=";	    		
					gnlin_asu="https://billpaysvc.verizonwireless.com/vzwsvc/asc";
					gnlin_usu="https://billpaysvc.verizonwireless.com/vzwsvc/usc";
				}else if (vzgn.runningFromPreprod){
					gnlin_dbconfig = 'Y';		   
		    		if(curProtocol=="https:"){
		    			gnlin_scu="https://stcache.vzw.com/globalnav/pre";
						gnlin_cqc ="https://testman.verizonwireless.com/support";
		    		}else{
		    			gnlin_scu="http://tcache.vzw.com/globalnav/pre";
						gnlin_cqc ="http://testman.verizonwireless.com/support";
		    		}		    		
		    		gnlin_gntypah="https://testman.verizonwireless.com/search/assembler?assemblerContentCollection=/content/GSS/Web/GSS%20TypeAhead%20Collections&format=jsonp&Dy=1&Ntt=";		    		
					gnlin_asu="https://preprodbillpaysvc.verizonwireless.com/vzwsvc/asc";
					gnlin_usu="https://preprodbillpaysvc.verizonwireless.com/vzwsvc/usc";
				}
				if(typeof gnlin_dbconfig=="undefined" ||
					gnlin_dbconfig==null ||
					gnlin_dbconfig==''||
					gnlin_dbconfig=='N'){
		    		if(curProtocol=="https:"){
		    			gnlin_scu="https://scache.vzw.com/globalnav/prod";
						gnlin_cqc ="https://www.verizonwireless.com/support";
		    		}else{
		    			gnlin_scu="http://cache.vzw.com/globalnav/prod";
						gnlin_cqc ="http://www.verizonwireless.com/support";
		    		}		    		
					gnlin_asu="https://billpaysvc.verizonwireless.com/vzwsvc/asc";
					gnlin_usu="https://billpaysvc.verizonwireless.com/vzwsvc/usc";
					
					var gnTxtCookieVal = vzw_gnjq.cookie(gnlin_gnTxtCookieName);
					if(vzw_gnjq.cookie(gnlin_gnTxtCookieName)!=null && vzw_gnjq.cookie(gnlin_gnTxtCookieName)=="N"){
						vzgn.populateProdUrlInfo();
					}else{
						if((gnTxtCookieVal!=null) && 
							(gnTxtCookieVal.length>0) &&
							(gnTxtCookieVal.split("#").length>=5)){
							var gnTxtArr = gnTxtCookieVal.split("#");
							if(gnTxtArr.length>=5){
								gnlin_scu = gnTxtArr[0];
								gnlin_cqc = gnTxtArr[3];
								if(curProtocol=="https:"){
								  gnlin_scu = gnlin_scu.replace("http://", "https://");
								  gnlin_cqc = gnlin_cqc.replace("http://", "https://");
								}else{
								  gnlin_scu = gnlin_scu.replace("https://", "http://");
								  gnlin_cqc = gnlin_cqc.replace("https://", "http://");
								}
								gnlin_asu = gnTxtArr[1];
								gnlin_usu = gnTxtArr[2];
								gnlin_gntypah = gnTxtArr[4];
							}
							vzgn.gnPreloadMenuImg();
							vzgn.getGNMenu();						

						}else{
							var url = vzgn.getPropsFileUrl();
							vzw_gnjq.ajax({
							    url: url,
							    data: null,
							    type: 'GET',
							    cache: false,			    
							    timeout: gnlin_gltxtTimeout,
							    success: vzgn.populatePreProdUrlInfo,
							    error:vzgn.populateProdUrlInfo
							});						
						}	
					}
										
				}else{
					vzgn.gnPreloadMenuImg();
					vzgn.getGNMenu();
				}
			},
			getGNMenu: function(){
				vzgn.gnDebug("inside getGNMenu");
				if((vzgn.showLoggedOutMenu || vzgn.isMyBizMenu) && (vzgn.isInlineGN) && (vzw_gnjq("#desktopOmniNav").length>0)){
					try{
						vzgn.constructSEOLOMenu();
					}catch(e){
						vzgn.gnDebug("error in renderLoggedOutSEOMenu");	
					}
				}else{
					try{
						vzgn.renderPlainGlNav();
					} catch (e) {
						vzgn.gnDebug("error in getGNMenu - renderPlainGlNav");
					}
					try{
						vzgn.setRoleFileName();
						vzgn.renderGlNav(gnlin_roleFileName);
					}catch (e){
						vzgn.gnDebug("error in getGNMenu - setRoleFileName, renderGlNav");
					}
				}
			},
			getDocDomain: function(){
				var docLoc = document.location +"";
				var docDomain="";
				var contextPathArr = docLoc.split("/");
				var propsFileUrl="";
				if(contextPathArr!=null && contextPathArr.length>=3){
				 	docDomain = contextPathArr[0]+"//"+contextPathArr[2];			
				}else{
					docDomain = docLoc;
				}
				return docDomain;
			},
			getPropsFileUrl: function(){
				var curTime = (new Date()).getTime();
				var gnDomain = vzgn.getDocDomain();
				var propsFileUrl =gnDomain+"/globalnav.txt?time="+curTime;
				return propsFileUrl;
			},
			populateProdUrlInfo: function(XMLHttpRequest, textStatus, errorThrown) {
				try{
					vzgn.gnDebug("inside populateProdUrlInfo");
					vzgn.gnPreloadMenuImg();
				 	gnlin_dbconfig = "N";
				 	var docDomain = document.domain;		 	
				 	if(typeof textStatus!="undefined" && textStatus!=null && textStatus=="timeout"){
					 	//dont do anything or set the cookie for all other cases set the cookie to N
				 	}else{
				 		var gnTxtCookieVal = "N";
				 		var docDomain = document.domain;
						vzw_gnjq.cookie(gnlin_gnTxtCookieName, gnTxtCookieVal, {path: "/", domain: docDomain});
				 	}
				 	vzgn.getGNMenu();
				} catch (e) {
					vzgn.gnDebug("error in populateProdUrlInfo");
				}		 	
			},			
			populatePreProdUrlInfo:function(data, textStatus){
				vzgn.gnDebug("inside populatePreProdUrlInfo");
				try{					
					data = data.replace(/(\r)/gm, "");
					var dataArr = data.split("\n");
					var tempStr;
					var stUrl_flag=false;
					var authUrl_flag=false;
					var unauthUrl_flag=false;
					var vzwsecure_flag=false;
					var gntypah_flag=false;
					gnlin_gntypah="https://testman.verizonwireless.com/search/assembler?assemblerContentCollection=/content/GSS/Web/GSS%20TypeAhead%20Collections&format=jsonp&Dy=1&Ntt=";					
					var stIndex;
					gnlin_cqc ="http://testman.verizonwireless.com/support";
					var cqc_flag = false;
					for (var i=0; i< dataArr.length; i++){
						tempStr = dataArr[i];			
						if(tempStr.indexOf("scu=")!=-1){
							stIndex = tempStr.indexOf("scu=")+"scu=".length;
							gnlin_scu=tempStr.substring(stIndex).trim();
							var curProtocol = document.location.protocol+"";
							var httpsSt="https://";
							var httpSt="http://";
							if(curProtocol=="https:"){
								var httpIndex = gnlin_scu.indexOf(httpSt);
								if(httpIndex==0){
									gnlin_scu = httpsSt+gnlin_scu.substring(httpSt.length);
								}
							}else{
								var httpsIndex = gnlin_scu.indexOf(httpsSt);
								if(httpsIndex==0){
									gnlin_scu = httpSt+gnlin_scu.substring(httpsSt.length);
								}
							}
							stUrl_flag=true;				
						}else if(tempStr.indexOf("asu")!=-1){
							stIndex = tempStr.indexOf("asu=")+"asu=".length;
							gnlin_asu=tempStr.substring(stIndex).trim();
							authUrl_flag=true;				
						}else if(tempStr.indexOf("usu=")!=-1){
							stIndex = tempStr.indexOf("usu=")+"usu=".length;
							gnlin_usu=tempStr.substring(stIndex).trim();
							unauthUrl_flag=true;
						}else if (tempStr.indexOf("cqc=")!= -1){
							stIndex = tempStr.indexOf("cqc=")+"cqc=".length;
							gnlin_cqc = tempStr.substring(stIndex).trim();
							cqc_flag = true;
						} else if (tempStr.indexOf("searchTypeAhead=")!= -1){
							stIndex = tempStr.indexOf("searchTypeAhead=")+"searchTypeAhead=".length;
							gnlin_gntypah = tempStr.substring(stIndex).trim();
							gntypah_flag = true;
						}
						if((stUrl_flag==true) && 
							(authUrl_flag==true) &&
							(unauthUrl_flag==true) &&
							(cqc_flag==true) &&
							(gntypah_flag==true)){
							break;
						}
					}
					if(curProtocol=="https:"){								  
					  gnlin_cqc = gnlin_cqc.replace("http://", "https://");
					}else{								  
					  gnlin_cqc = gnlin_cqc.replace("https://", "http://");
					}
					var gnTxtCookieVal = gnlin_scu+"#"+gnlin_asu+"#"+gnlin_usu+"#"+gnlin_cqc+"#"+gnlin_gntypah;
					var docDomain = document.domain;
					vzw_gnjq.cookie(gnlin_gnTxtCookieName, gnTxtCookieVal, {path: "/", domain: docDomain});
					vzgn.gnPreloadMenuImg();
					vzgn.getGNMenu();
				} catch (e) {
					vzgn.gnDebug("error in populateProdUrlInfo");
				}
			},			
			getAMVal: function(ocCookie){
				var amVal =null;
				if(ocCookie!=null){
					var ocArr = ocCookie.split("||");
					if(ocArr!=null && ocArr.length>=4){
						amVal = ocArr[3];
						if (amVal == "1V") {
							amVal = ocArr[4];
						}
					}
				}
				return amVal;
			},
			createMyBizCookie:function(){
				vzw_gnjq.cookie(gnlin_gnMyBizCookieName,'true', {expires:365, path:"/"});
			},
			destroyMyBizCookie: function(){
				vzw_gnjq.cookie(gnlin_gnMyBizCookieName, null, {path: "/"});
			},
			getGnServicesInfo: function(){
				vzgn.gnDebug("inside getGnServicesInfo");
				var ocAMVal=null;
				var oneBillCompVal = vzw_gnjq.cookie(gnlin_oneBillCompCookieName);
				var amVal = vzw_gnjq.cookie(gnlin_amIDCookieName);
		         if(oneBillCompVal!=null && amVal!=null){
		         	if(amVal.length>10){
		         		amVal=amVal.substring(amVal.length-11);
		         	}
		         	ocAMVal = vzgn.getAMVal(oneBillCompVal);
		         	if(ocAMVal!=amVal){
		         		vzw_gnjq.cookie(gnlin_oneBillCompCookieName, null, {path: "/", domain: vzgn.getGnDomain()});
		         		oneBillCompVal=null;
		         	}
		         }
		         
				if(oneBillCompVal==null || oneBillCompVal==""){
					var url=gnlin_asu+'/GlobalNavServicesInfo.action';
					gnlin_ascTimeOutFlag = "N";			
					if(gnlin_gnServScrCallEnabled=="Y"){				
						vzgn.gnDebug("script call to server");
						gnlin_ascTimer = setTimeout(vzgn.gnServicesInfoError, gnlin_ascTimeOut);					
						vzgn.loadScript(url, "onebill_company");
					}else{
						vzgn.gnDebug("ajax call to server");
						vzgn.callAjaxJsonp(url, null, vzgn.populateGNServicesInfo, vzgn.popGNErrResp, gnlin_ascTimeOut, "populateGNServicesInfo");		
					}
				}else{
					if(gnlin_roleFileName==gnlin_curRoleFileName){
					  vzgn.postProcessMenu();
				  }
				}
			},	
			popGNErrResp: function(XMLHttpRequest, textStatus, errorThrown) {
			 	vzgn.gnServicesInfoError();
			},
			updateGNCookie: function(cookieNm, newVal){
				if(cookieNm==gnlin_greetingCookieName && newVal!=null){
					var oldGreetNm = vzw_gnjq.cookie(cookieNm);	
					if(vzw_gnjq.cookie(cookieNm)==null ||(oldGreetNm!=null && oldGreetNm!=newVal)){
						vzw_gnjq.cookie(cookieNm, newVal, {path: "/", domain: vzgn.getGnDomain()});
					}
				}else if(vzw_gnjq.cookie(cookieNm)==null && newVal!=null){
					vzw_gnjq.cookie(cookieNm, newVal, {path: "/", domain: vzgn.getGnDomain()});
				}
				
			},
			populateGNServicesInfo: function(data, textStatus){
				vzgn.gnDebug("inside populateGNServicesInfo");
				if(gnlin_ascTimeOutFlag=="Y"){
					return;
				}		
				if(data==null || data.statusCode==null ||data.statusCode!=0){
					vzgn.gnServicesInfoError();			
				}else{
					gnlin_ascTimeOutFlag = "Y";
					if(gnlin_ascTimer!=null){
						clearTimeout(gnlin_ascTimer);
					}			
					for (var i=0; i< data.cookieInfo.length; i++){
						vzgn.updateGNCookie(data.cookieInfo[i].cookieNm, data.cookieInfo[i].cookieVal);				
					}
					try {
						vzgn.oneV = vzw_gnjq.cookie(gnlin_oneVZ);
					} catch (e) {
						vzgn.gnDebug("error in oneVZ section of populateGNServicesInfo");
					}
					if(data!=null && data.oneBillCompStatusCode==0){
						vzgn.setCompOBCookie(data.companyName, data.isOneBill+"", data.accountRegion, data.oneVerizon);
						vzgn.acctRegion = data.accountRegion;
					}
				    vzgn.setRoleFileName();
					if(gnlin_roleFileName!=gnlin_curRoleFileName){
						vzgn.renderGlNav(gnlin_roleFileName);
					}else{
						vzgn.postProcessMenu();
					}
				}					
			},
			setCompOBCookie: function(companyNm, isOneBill, accountRegion, isOneVEnabled){
				vzgn.gnDebug("inside setCompOBCookie");
				if(isOneBill!=null&& isOneBill=="true"){
					isOneBill="true";
				}else{
					isOneBill="false";
				}
				if(companyNm==null || companyNm==""){
					companyNm = " ";
				}	
				if(companyNm.length>22){
					companyNm  = companyNm.substring(0, 20)+"...";
				}
				if(typeof isOneVEnabled === "string"){
					switch(isOneVEnabled.toLowerCase()){
						case "true":
							isOneVEnabled  = true;
							break;
						default:
							isOneVEnabled = false;
					}
				}

		        var oneBillCompVal = isOneBill+"||"+companyNm+"||"+accountRegion+"||";
		        if (typeof isOneVEnabled === "boolean" && isOneVEnabled) {
		        	oneBillCompVal += "1V||";
		        }
		        
		        var amVal = vzw_gnjq.cookie(gnlin_amIDCookieName);
		        if(amVal!=null){
		        	if(amVal.length>10){
		        		oneBillCompVal+=amVal.substring(amVal.length-11);
		         	}else{
			    	 	oneBillCompVal+=amVal;
		        	}
		        }

				vzw_gnjq.cookie(gnlin_oneBillCompCookieName, oneBillCompVal, {path: "/", domain: vzgn.getGnDomain()});
			},
			gnServicesInfoError: function(){
			  vzgn.gnDebug("inside gnServicesInfoError");
			  gnlin_ascTimeOutFlag = "Y";
			  if(gnlin_ascTimer!=null){
					clearTimeout(gnlin_ascTimer);
			  }
			  if(gnlin_roleFileName==gnlin_curRoleFileName){
				  vzgn.postProcessMenu();
			  }
		  },
		  renderPlainGlNav: function(){
			vzgn.gnDebug("inside renderPlainGlNav");
			var inProgressHtml = '<div style="text-align:center;padding:15px">' +
			'<div class="gnavLoading"></div></div>';
			document.getElementById("globalNavId").innerHTML= inProgressHtml;		
			vzgn.renderGNPlainMenu(vzgn.getGlPlainMenuHtml());
		},
		checkSearchPlaceholderText: function() {
			var q = vzw_gnjq('#globalNavId #vgn_q');
			if(!q.val() || q.val().length<=0 || q.val() == q.data('placeholder')) {
				q.addClass('placeholder');
				q.val(q.data('placeholder'));
			} else {
				q.removeClass('placeholder');
			}
			//.bind("propertychange change click keyup input paste",
		},
		getGlPlainMenuHtml: function(){
			var protocol = 'http:';
			if(!vzgn.showLoggedOutMenu) {
				protocol = 'https:';
			}
			var signInHtml = '<li><a class="vgn_vhidden accessibility" href="#vgn_siOEnd" id="vgn_siOStart"><span>Skip the sign in/register menu</span></a></li>\
<li id="vgn_signIn" data-navid="vgn_signIn" role="menuitem" aria-haspopup="true" data-search="s"><a href="'+protocol+'//www.verizonwireless.com/b2c/myverizonlp/" title="Sign In/Register" class="o-icon-sign-in" id="gn95" data-current="vzw" data-vzw="'+protocol+'//www.verizonwireless.com/b2c/myverizonlp/" data-default="vzw" data-mybiz="'+protocol+'//www.verizonwireless.com/wcms/business/business-account-login.html" onclick="vgn_hbLink(\'desktop:global:signin/register\');"><span class=\'vgn-icon-myv\' aria-hidden=\'true\'>&#57396;</span>Sign In/Register</a>\
 <div class="o-sign-in-dropdown" id="vgn_loginContainer" aria-hidden="true" role="menu">\
  <h2><span class="vgn-icon-myv">&#57396;</span>Sign in to My <span id="vgnVSignInTitle"'+(vzgn.isMyBizMenu ? ' class="vgn_hide"' : '')+'>Verizon</span><span id="vgnBSignInTitle"'+(!vzgn.isMyBizMenu ? ' class="vgn_hide"' : '')+'>Business</span></h2>\
  <label class="vgn_hide" for="vgnAccSelector">Select an account to log into</label>\
  <select class="vgn_hide" id="vgnAccSelector">\
   <option value="1" selected="selected">My personal account</option>\
   <option value="2">My business account</option>\
  </select>\
  <form id="vgnSignInForm" method="post"'+(vzgn.isMyBizMenu ? ' class="vgn_hide"' : '')+' autocomplete="off" action="https://login.verizonwireless.com/amserver/UI/Login">\
   <label for="IDToken1_GN" id="mobileNumberLabel" class="vgn_screen-reader-text">Phone # or Username</label>\
   <div class="vgn_username">\
    <div class="vgn_placeholder">Phone # or Username</div>\
    <input id="IDToken1_GN" name="IDToken1" type="text" maxlength="60" autocomplete="off" /> <span class="vgn-icon-error" aria-hidden="true">&#57389;</span>\
    <div class="vgn-error-message" aria-hidden="true"></div>\
   </div>\
   <input type="hidden" value="vzw" name="realm" id="realm" />\
   <input type="hidden" value="" id="gotoID" name="goto" />\
   <input type="hidden" name="gx_charset" value="UTF-8" id="gx_charset" />\
   <input type="hidden" name="rememberUserNameCheckBoxExists" value="N" id="rememberUNameExistsGN" />\
   <input type="hidden" value="true" name="userNameOnly" id="vgnUserNameOnly" />\
   <div class="cf vgn_hide" id="vgn_remUIDSec">\
    <input type="checkbox" name="rememberUserName" value="N" id="rememberUserNameGN" class="gn_checkbox" aria-labelledby="rememberUserNameGNLabel" /> <label for="rememberUserNameGN" id="rememberUserNameGNLabel">Remember Me</label>\
   </div>\
   <button type="submit" id="signInSubmitButton" onclick="vzgn.destroyMyBizCookie();vzgn.submitOGNLoginForm();">Sign In</button>\
   <p id="vgn_vzwSignInLinks" class="o-sign-in-links">Forgot <a href="#" id="vgn_vzw_forgUid" onclick="vgn_hbLink(\'/global/sign+in+or+register/my+personal+account/forgot+user+id\',\'\');">User ID</a> or <a href="#" id="vgn_vzw_forgPwd" onclick="vgn_hbLink(\'/global/sign+in+or+register/my+personal+account/forgot+password\',\'\');">Password</a><br /><a href="#" class="o-clear" id="vgn_vzw_register" onclick="vgn_hbLink(\'/global/sign+in+or+register/my+personal+account/register\',\'\');">Register</a><span class="o-separator">|</span><a href="#" id="vgn_vzw_viewDemo" onclick="vgn_hbLink(\'/global/sign+in+or+register/my+personal+account/view+demo\',\'\');return false;" title="Opens dialog with autoplay video">View Demo</a></p>\
  </form>\
  <form id="vgnMyBizSignInForm" method="post"'+(!vzgn.isMyBizMenu ? ' class="vgn_hide"' : '')+' action="https://mblogin.verizonwireless.com/amserver/loginflow/validateUserId">\
   <input type="hidden" id="vgn_biz_goto" value="" name="goto" />\
   <input type="hidden" id="vgn_biz_realm" value="vzwmb" name="realm" />\
   <input type="hidden" id="vgn_biz_rememberUNameExists" value="N" name="rememberUserNameCheckBoxExists" />\
   <input type="hidden" id="vgn_biz_rememberMBUserName" value="N" name="rememberMBUserName" />\
   <input type="hidden" id="vgn_biz_appGroup" value="IDM" name="appGroup" />\
   <input type="hidden" id="vgn_biz_ignoreReferer" value="true" name="ignoreReferer" />\
   <input type="hidden" id="vgn_biz_module" value="VZWLdap" name="module" />\
   <label for="IDToken1_GN_Biz" id="mbUserNameGNLabel" class="vgn_screen-reader-text">Username</label>\
   <div class="vgn_username">\
    <div class="vgn_placeholder">Username</div>\
    <input id="IDToken1_GN_Biz" name="userId" type="text" autocomplete="off" maxlength="60" size="25" />\
    <span class="vgn-icon-error" aria-hidden="true">&#57389;</span>\
    <div class="vgn-error-message" aria-hidden="true"></div>\
   </div>\
   <button id="mbSignInSubmitButton" type="submit" onclick="vzgn.createMyBizCookie();">Sign In</button>\
   <p id="vgn_vzwMyBizSignInLinks" class="o-sign-in-links">Forgot <a href="#" id="vgn_vzwmybiz_forgUid" onclick="vgn_hbLink(\'//global//sign+in+or+register//my+business+account//forgot+user+id\', \'\');">User Name</a> or <a href="#" id="vgn_vzwmybiz_forgPwd" onclick="vgn_hbLink(\'//global//sign+in+or+register//my+business+account//forgot+password\', \'\');">Password</a><br /><a href="#" id="vgn_vzwmybiz_register" class="o-clear" onclick="vgn_hbLink(\'//global//sign+in+or+register//my+business+account//register\', \'\');">Register</a><span class="o-separator">|</span><a href="#" id="vgn_vzwmybiz_playVideo" onclick="vgn_hbLink(\'//global//sign+in+or+register//my+business+account//play+video\', \'\');">Play Video</a></p>\
  </form>\
 </div>\
</li>';
			
			var signOutHtml = '<li data-navid=\"vzwsignout\" role=\"menuitem\" data-search=\"s\"><a href=\"https://login.verizonwireless.com/amserver/UI/Logout\" title=\"Sign Out\" class=\"o-icon-sign-out\" id=\"vzwsignout\" onclick=\"vgn_hbLink(\'desktop:global:sign+out\');\"><span class=\'vgn-icon-myv\' aria-hidden=\'true\'>&#57396;</span>Sign Out</a></li>';
			var signInOutHtml = signOutHtml;
			if(vzgn.showLoggedOutMenu){
				signInOutHtml = signInHtml; 
			}
			
			var t1WirHtml = '<li data-navid="gn15" role="menuitem" class="has-children" data-search="s"><a href="'+protocol+'//www.verizonwireless.com/landingpages/shop-phones-devices/" title="Shop" id="onavmenu1" onclick="vgn_hbLink(\'desktop:global:shop\');">Shop</a></li>\
<li data-navid="gn24" role="menuitem" class="has-children" data-search="s"><a href="'+protocol+'//www.verizonwireless.com/support/" title="Support" id="onavmenu2" onclick="vgn_hbLink(\'desktop:global:support+-+customer\');">Support</a></li>\
<li data-navid="gn21" role="menuitem" class="has-children" data-search="m"><a href="'+protocol+'//www.verizonwireless.com/b2c/myverizonlp/" title="My Verizon" id="onavmenu3" onclick="vgn_hbLink(\'desktop:global:my+verizon+-+customer\');">My Verizon</a></li>';
			var t1BizHtml = '<li data-navid="gn15" role="menuitem" class="has-children" data-search="s"><a href="'+protocol+'//www.verizonwireless.com/landingpages/shop-phones-devices/" title="Shop" id="onavmenu1" onclick="vgn_hbLink(\'desktop:global:shop\');">Shop</a></li>\
<li role="menuitem" class="has-children" data-search="s"><a href="'+protocol+'//business.verizonwireless.com/content/b2b/en/solutions.html" title="Solutions" id="onavmenu2" onclick="vgn_hbLink(\'desktop:global:solutions+-+business\');">Solutions</a></li>\
<li data-navid="gn22" role="menuitem" class="has-children" data-search="m"><a href="'+protocol+'//business.verizonwireless.com/content/b2b/en/business-portal-overview.html" title="My Business" id="onavmenu3" onclick="vgn_hbLink(\'desktop:global:my+business+-+business\');">My Business</a></li>';
			var t1Html = vzgn.isMyBizMenu ? t1BizHtml : t1WirHtml;
			
			var plaingn='<div id="desktopOmniNav">\
<a class="vgn_vhidden accessibility" tabindex="1" href="#vgnEnd" id="vgnStart"><span>Skip to Main Content</span></a>\
<div class="o-logo"><a href="'+protocol+'//www.verizonwireless.com/" title="Verizon Wireless" onclick="vgn_hbLink(\'desktop:global:logo\');"><img src="//ss7.vzw.com/is/image/VerizonWireless/D_TOP-NAV-Wireless-hptab-2015?$defaultScale$" alt="Logo" /></a></div>\
<div class="o-top-nav cf">\
 <ul class="o-left-nav vgn_med_hideable" role="menubar" aria-orientation="horizontal">\
  <li role="menuitem" data-search="w"><a href="'+protocol+'//www.verizonwireless.com/" title="Wireless"'+(!vzgn.isMyBizMenu ? ' class="o-active"' : '')+' id="vgn_wireless" onclick="vgn_hbLink(\'desktop:global:wireless\');"><span class=\'active-bar\'>Wireless</span></a></li>\
  <li role="menuitem" data-search="r"><a href="'+protocol+'//www22.verizon.com/?lid=//global//residential" title="Residential" id="vgn_residential" onclick="vgn_hbLink(\'desktop:global:residential\');"><span class=\'active-bar\'>Residential</span></a></li>\
  <li role="menuitem" data-search="b"><a href="'+protocol+'//www.verizonwireless.com/business/" title="Business"'+(vzgn.isMyBizMenu ? ' class="o-active"' : '')+' id="vgn_business" onclick="vgn_hbLink(\'desktop:global:business\');"><span class=\'active-bar\'>Business</span></a></li>\
 </ul>\
 <ul class="o-right-nav" role="menubar" aria-orientation="horizontal">\
  <li class="vgn_med_hideable" role="menuitem" data-search="s"><a href="'+protocol+'//www.verizonwireless.com/vzw/zipwall/setLocation.jsp" title="Set Location" id="vgn_ctyst" onclick="vgn_hbLink(\'desktop:global:set+location\');">Set Location</a></li>\
  <li class="vgn_med_hideable" role="menuitem" data-search="e"><a href="'+protocol+'//es.verizonwireless.com/b2c/index.html" title="Espa&ntilde;ol" id="vgn_espanol_secure" mporgnav="" onclick="vgn_hbLink(\'desktop:global:espanol\');return switchLanguage(\'es\');function switchLanguage(lang) {MP.SrcUrl=decodeURIComponent(\'mp_js_orgin_url\');MP.UrlLang=\'mp_js_current_lang\';MP.init();MP.switchLanguage(MP.UrlLang==lang?\'en\':lang);return false;}">Espa&ntilde;ol</a></li>\
  <li class="vgn_med_hideable" role="menuitem" data-search="c"><a href="'+protocol+'//www.verizonwireless.com/wcms/contact-us.html" title="Contact Us" onclick="vgn_hbLink(\'desktop:global:contact+us\');">Contact Us</a></li>\
  <li role="menuitem" data-search="s"><a href="'+protocol+'//www.verizonwireless.com/stores/" title="Store Locator" onclick="vgn_hbLink(\'desktop:global:store+locator\');">Store Locator</a></li>\
  '+signInOutHtml+'\
  <li id="vgn_shcart" data-navid="vgn_shcart" role="menuitem" data-search="c"><a href="#"><span class="vgn-icon-cart" aria-hidden="true">&#57445;</span>Cart</a></li>\
  <li id="vgn_minimenu" class="vgn_med_showable" role="menuitem" aria-orientation="vertical" aria-hidden="true" aria-haspopup="true" data-search="m"><a href="#" title="More options" aria-label="More options"><span class="vgn-icon-minimenu" aria-hidden="true">&#58894;</span></a>\
   <div class="o-minimenu" aria-hidden="true" role="menu">\
    <ul>\
     <li role="menuitem" class="vgn-lob-item vgn-lob-residential" data-search="r"><button data-href="'+protocol+'//www22.verizon.com/?lid=//global//residential" title="Residential" id="vgn_residential" onclick="vgn_hbLink(\'desktop:global:residential\');">Residential<span class=\'vgn-icon-arrow\' aria-hidden=\'true\'>&#58889;</span></button></li>\
     <li role="menuitem" class="vgn-lob-item" data-search="b"><button data-href="'+protocol+'//www.verizonwireless.com/business/" title="Business" id="vgn_business" onclick="vgn_hbLink(\'desktop:global:business\');">Business<span class=\'vgn-icon-arrow\' aria-hidden=\'true\'>&#58889;</span></button></li>\
     <li role="menuitem" class="vgn-espanol-item" data-search="e"><button data-href="'+protocol+'//es.verizonwireless.com/b2c/index.html" title="Espa&ntilde;ol" id="vgn_espanol_secure" mporgnav="" onclick="vgn_hbLink(\'desktop:global:espanol\');return switchLanguage(\'es\');function switchLanguage(lang) {MP.SrcUrl=decodeURIComponent(\'mp_js_orgin_url\');MP.UrlLang=\'mp_js_current_lang\';MP.init();MP.switchLanguage(MP.UrlLang==lang?\'en\':lang);return false;}">Espa&ntilde;ol<span class=\'vgn-icon-arrow\' aria-hidden=\'true\'>&#58889;</span></button></li>\
     <li role="menuitem" data-search="c"><button data-href="'+protocol+'//www.verizonwireless.com/wcms/contact-us.html" title="Contact Us" onclick="vgn_hbLink(\'desktop:global:contact+us\');">Contact Us<span class=\'vgn-icon-arrow\' aria-hidden=\'true\'>&#58889;</span></button></li>\
     <li class="vgn-minimenu-setlocation" role="menuitem" data-search="s"><span class="vgn-icon-location" aria-hidden="true">&#57430;</span><button data-href="'+protocol+'//www.verizonwireless.com/vzw/zipwall/setLocation.jsp" title="Set Location" id="vgn_ctyst" onclick="vgn_hbLink(\'desktop:global:set+location\');">Set Location</button></li>\
    </ul>\
   </div>\
  </li>\
 </ul>\
</div>\
<div class="o-nav-wrapper cf" role="navigation">\
 <ul class="o-tier-one" role="menubar">\
 '+t1Html+'\
 </ul>\
</div>\
<form name="vgnSearchForm" id="vgn_search" class="vgnSearchForm" action="//www.verizonwireless.com/search/vzwSearch">\
 <label for="vgn_q">I am looking for</label> <input type="text" class="vgn_search_text" text="search input field" aria-label="Search" autocomplete="off" name="q" id="vgn_q" maxlength="100"> <span class="vgn_input_field_txt">Search Input Field</span> </input>\
 <button type="button" class="vgn-icon-close-solid-circle" id="vgn_clear_btn"><span class="vgn-icon-searchclear" aria-hidden="true">&#58885;</span><span class="vgn_clear_btn_txt">Clear search field</span></button>\
 <button type="submit" class="vgn_search_btn vgn-icon-search" id="vgn_search_btn"><span class="vgn-icon-search" aria-hidden="true">&#57411;</span><span class="vgn_search_btn_txt">Search</span></button>\
 <span class="vgn-icon-error" aria-hidden="true">&#57389;</span>\
 <div class="vgn-error-message" aria-hidden="true"></div>\
</form>\
<div class="vgn_contentEnd">\
 <a class="vgn_vhidden accessibility" href="#vgnStart" id="vgnEnd"><span>Skip back to Navigation</span></a>\
</div>\
</div>\
<div id="vgnLastNode"></div>';
			
			if (typeof gLinksDisplay != 'undefined' && gLinksDisplay != null && gLinksDisplay == '0') {
				plaingn = plaingn.replace("class=\"o-right-nav\"", "class=\"o-right-nav vgn_rightnav_hide\"");
			}
			if (typeof gnDisplay != 'undefined' && gnDisplay != null && gnDisplay == '0') {
				plaingn = plaingn.replace("class=\"o-tier-one\"", "class=\"o-tier-one vgn_menu_hide\"");
			}
			if (typeof logoDisplay != 'undefined' && logoDisplay != null && logoDisplay == '0') {
				plaingn = plaingn.replace("class=\"o-logo\"", "class=\"o-logo vgn_lob_hide\"");
			}
			if (typeof lobDisplay != 'undefined' && lobDisplay != null && lobDisplay == '0') {
				plaingn = plaingn.replace("class=\"o-left-nav", "class=\"o-left-nav vgn_lob_hide").replace(/vgn-lob-item/g, "vgn-lob-item-hide");
			}		
			if (typeof zipDisplay != 'undefined' && zipDisplay != null && zipDisplay == '0') {
				plaingn = plaingn.replace("id=\"vgn_ctyst\"", "id=\"vgn_ctyst\" class=\"vgn_ctyst_hide\"").replace("class=\"vgn-minimenu-setlocation\"", "class=\"vgn-minimenu-setlocation-hide\"");
			}
			if (typeof topBarDisplay != 'undefined' && topBarDisplay != null && topBarDisplay == '0') {
				plaingn = plaingn.replace("class=\"o-left-nav", "class=\"o-right-nav vgn_lob_hide");
				plaingn = plaingn.replace("class=\"o-right-nav\"", "class=\"o-right-nav vgn_rightnav_hide\"");
			}
			if(typeof(spanishDisplay)!='undefined' && spanishDisplay!=null && (spanishDisplay==0 || spanishDisplay=='0')){
				plaingn = plaingn.replace("id=\"vgn_espanol_secure\"", "id=\"vgn_espanol_secure\" class=\"vgn_espn_hide\"").replace("class=\"vgn-espanol-item\"", "class=\"vgn-espanol-item-hide\"");
			}
			if (typeof lobResidentialDisplay != 'undefined' && lobResidentialDisplay != null && lobResidentialDisplay == '0') {
				plaingn = plaingn.replace("id=\"vgn_residential\"", "id=\"vgn_residential\" class=\"vgn_residential_hide\"").replace("vgn-lob-residential", "vgn-lob-residential-hide");
			}			
			return plaingn;
		},
		renderGNPlainMenu: function(plainMenuHtml){		
			try{
				document.getElementById("globalNavId").innerHTML=plainMenuHtml;
				//if altLogInDisplay='1' then remove the search box and move the signout link to searchbox position				
				if (typeof altLogInDisplay != 'undefined' && altLogInDisplay != null && altLogInDisplay == '1') {				
					vzw_gnjq('#vgn_search').css("display","none");					
					 if(vzgn.isLoggedIn){
						 var signOutHtml = "<div class='vgn_sign_out'>" + vzw_gnjq('#vzwsignout').parent().html() + "</div>";
						vzw_gnjq('#vzwsignout').parent().html("");
						vzw_gnjq('#vgn_search').before(signOutHtml);							
						}else{
							var signInHtmlEl = vzw_gnjq("<div class='vgn_sign_in'>" + vzw_gnjq('#vgn_signIn').html() + "</div>");
							signInHtmlEl.find("#vgn_loginContainer").remove();
							vzw_gnjq('#vgn_signIn').html("");
							vzw_gnjq('#vgn_search').before(signInHtmlEl);
						}
				}
			}catch(e){
				vzgn.gnDebug("Error in  renderGNPlainMenu");
			}
			
			vzgn.gnDebug("loaded static plain menu");
		},
		renderGlNav: function(fileName){
			vzgn.gnDebug("inside renderGlNav loading file="+fileName);
			gnlin_curRoleFileName = fileName;		
			var url=gnlin_scu;
			if(typeof gnlin_popLoc != 'undefined' && gnlin_popLoc!=null && gnlin_popLoc.length>0){
				url = url + gnlin_popLoc;
			}
			url = url+"/"+fileName;	
			vzgn.gnDebug("loading role based gn menu url="+url);	
			gnlin_htmlTimeOutFlag="N";	
			//gnlin_htmlTimer = setTimeout(vzgn.roleMenuError, gnlin_htmlTimeOut);		
			vzgn.loadScript(url, "vzwgnmenu");			
		},
		roleMenuError: function(){
			try{
				vzgn.gnDebug("inside roleMenuError");
				gnlin_htmlTimeOutFlag = "Y";
				if(gnlin_htmlTimer!=null){
					clearTimeout(gnlin_htmlTimer);
				}
				 gnlin_curRoleFileName="";
				 if(!vzgn.showLoggedOutMenu){
					 vzgn.getGnServicesInfo();
				 }
			} catch (e) {
				vzgn.gnDebug("Error in  roleMenuError");
			}		 	
		},
		constructMenu: function(result){
			try{
				vzgn.gnDebug("inside constructMenu");
				if(gnlin_htmlTimeOutFlag=="Y"){
					return;
				}
				gnlin_htmlTimeOutFlag = "Y";
				if(gnlin_htmlTimer!=null){
					clearTimeout(gnlin_htmlTimer);
				}
				gnlin_gnLoadCtr = 0;
				
				if (typeof gLinksDisplay != 'undefined' && gLinksDisplay != null && gLinksDisplay == '0') {
					result = result.replace("class=\"o-right-nav\"", "class=\"o-right-nav vgn_rightnav_hide\"");
				}
				if (typeof gnDisplay != 'undefined' && gnDisplay != null && gnDisplay == '0') {
					result = result.replace("class=\"o-tier-one\"", "class=\"o-tier-one vgn_menu_hide\"");
				}
				if (typeof logoDisplay != 'undefined' && logoDisplay != null && logoDisplay == '0') {
					result = result.replace("class=\"o-logo\"", "class=\"o-logo vgn_lob_hide\"");
				}
				if (typeof lobDisplay != 'undefined' && lobDisplay != null && lobDisplay == '0') {
					result = result.replace("class=\"o-left-nav", "class=\"o-left-nav vgn_lob_hide").replace(/vgn-lob-item/g, "vgn-lob-item-hide");
				}		
				if (typeof zipDisplay != 'undefined' && zipDisplay != null && zipDisplay == '0') {
					result = result.replace("id=\"vgn_ctyst\"", "id=\"vgn_ctyst\" class=\"vgn_ctyst_hide\"").replace("class=\"vgn-minimenu-setlocation\"", "class=\"vgn-minimenu-setlocation-hide\"");
				}
				if (typeof topBarDisplay != 'undefined' && topBarDisplay != null && topBarDisplay == '0') {
					result = result.replace("class=\"o-left-nav", "class=\"o-right-nav vgn_lob_hide");
					result = result.replace("class=\"o-right-nav\"", "class=\"o-right-nav vgn_rightnav_hide\"");
				}
				if(typeof(spanishDisplay)!='undefined' && spanishDisplay!=null && (spanishDisplay==0 || spanishDisplay=='0')){
					result = result.replace("id=\"vgn_espanol_secure\"", "id=\"vgn_espanol_secure\" class=\"vgn_espn_hide\"").replace("class=\"vgn-espanol-item\"", "class=\"vgn-espanol-item-hide\"");
				}
				if (typeof lobResidentialDisplay != 'undefined' && lobResidentialDisplay != null && lobResidentialDisplay == '0') {
					result = result.replace("id=\"vgn_residential\"", "id=\"vgn_residential\" class=\"vgn_residential_hide\"").replace("vgn-lob-residential", "vgn-lob-residential-hide");
				}			
				
				document.getElementById("globalNavId").innerHTML=result;
				vzgn.gnDebug("finished loading  role based gn menu url");
				vzgn.isGNavLoaded();
			} catch (e) {
				vzgn.gnDebug("Error in  constructMenu");
			}					
		},
		constructSEOLOMenu:function(){
			vzgn.gnDebug("Entering  constructSEOLOMenu");
			var gnEl = vzw_gnjq("#globalNavId");
			if (typeof gLinksDisplay != 'undefined' && gLinksDisplay != null && gLinksDisplay == '0') {
				gnEl.find(".o-right-nav").addClass("vgn_rightnav_hide");				
			}
			if (typeof gnDisplay != 'undefined' && gnDisplay != null && gnDisplay == '0') {				
				gnEl.find(".o-tier-one").addClass("vgn_menu_hide");
			}
			if (typeof logoDisplay != 'undefined' && logoDisplay != null && logoDisplay == '0') {
				gnEl.find(".o-logo").addClass("vgn_vz_logo_hide");
			}
			if (typeof lobDisplay != 'undefined' && lobDisplay != null && lobDisplay == '0') {
				gnEl.find(".o-left-nav").addClass("vgn_lob_hide");
				gnEl.find(".vgn-lob-item").addClass("vgn-lob-item-hide");
			}
			if (typeof zipDisplay != 'undefined' && zipDisplay != null && zipDisplay == '0') {
				gnEl.find("#vgn_ctyst").addClass("vgn_ctyst_hide");
				gnEl.find('.vgn-minimenu-setlocation').addClass('vgn-minimenu-setlocation-hide');
			}
			if (typeof topBarDisplay != 'undefined' && topBarDisplay != null && topBarDisplay == '0') {
				gnEl.find(".o-left-nav").addClass("vgn_lob_hide");
				gnEl.find(".o-right-nav").addClass("vgn_rightnav_hide");				
			}
			if(typeof(spanishDisplay)!='undefined' && spanishDisplay!=null && (spanishDisplay==0 || spanishDisplay=='0')){
				gnEl.find("#vgn_espanol_secure").addClass("vgn_espn_hide");
				gnEl.find('#desktopOmniNav .vgn-espanol-item').addClass('vgn-espanol-item-hide');
			}
			if (typeof lobResidentialDisplay != 'undefined' && lobResidentialDisplay != null && lobResidentialDisplay == '0') {
				gnEl.find("#vgn_residential").addClass("vgn_residential_hide");
				gnEl.find('#desktopOmniNav .vgn-lob-residential').addClass("vgn-lob-residential-hide");
			}
			vzgn.isGNavLoaded();
			vzgn.gnDebug("Leaving constructSEOLOMenu");
		},
		isGNavLoaded: function(){
			vzgn.gnDebug("inside isGNavLoaded");
			try{
				gnlin_gnLoadCtr++;
				if(gnlin_gnLoadCtr>10){			
					return;
				}
				
				try{
					gnLastEl = vzw_gnjq('#vgnLastNode');
				}catch(e){
					vzgn.gnDebug("DOM not ready for lastnode - isGNavLoaded");	
					gnlin_gnLoadTimer=setTimeout("vzgn.isGNavLoaded()", 10);
				}
				
				if(gnLastEl.length>0){
				   vzgn.gnDebug("dom ready for gn menu - add js events");
				   if(vzgn.isOlderGNLoaded()){
				   	  return;
				   }
				   //render gn responsive if flag set
				   vzgn.renderGNResponsive();
				   
				   var searchQuery = vzw_gnjq('#vgn_q');
				   var placeholderText = searchQuery.attr('placeholder');
				   searchQuery.data('placeholder', placeholderText).removeAttr('placeholder');
				   vzgn.checkSearchPlaceholderText();
				   
					//if altLogInDisplay='1' then remove the search box and move the signout link to searchbox position				
					if (typeof altLogInDisplay != 'undefined' && altLogInDisplay != null && altLogInDisplay == '1') {
						 if(vzgn.isLoggedIn){
							var signOutHtml = "<div id='vgn_alt_sign_out' class='vgn_sign_out'>" + vzw_gnjq('*[data-navid="vzwsignout"]').html() + "</div>";
							vzw_gnjq('*[data-navid="vzwsignout"]').remove();
							vzw_gnjq('#vgn_search').css("display","none").before(signOutHtml);
						}else{
							var signInHtmlEl = vzw_gnjq("<div id='vgn_alt_sign_in' class='vgn_sign_in'>" + vzw_gnjq('#vgn_signIn').html() + "</div>");
							signInHtmlEl.find("#vgn_loginContainer").remove();
							vzw_gnjq('#vgn_signIn').remove();
							vzw_gnjq('#vgn_search').css("display","none").before(signInHtmlEl);
						}
					//else if searchDisplay = '0' then we suppress the search box
					} else if((typeof searchDisplay != 'undefined')  &&  
							(searchDisplay!=null) && 
							(searchDisplay=='0')){
						vzw_gnjq('#vgn_search').css("display","none");
					} else {
						vzw_gnjq('#vgn_search').css("display","block");
					}
					   vzgn.setCartInfo();
					   vzgn.showCtyStInfo();
					   vzgn.highlightMenu();
						 vzgn.renderMenu();
						if(vzgn.showLoggedOutMenu) {
							  vzgn.postProcessMenu();
						}else{
							vzgn.getGnServicesInfo();	
						}
									 
			       					   			   		 
				 }else{
				 	gnlin_gnLoadTimer=setTimeout("vzgn.isGNavLoaded()", 10);		
				 }
			 } catch (e) {
				vzgn.gnDebug("Error in  isGNavLoaded");	
				gnlin_gnLoadTimer=setTimeout("vzgn.isGNavLoaded()", 10);		
			}
		},
		setCartInfo: function(){
			if(vzgn.isMyBizMenu || (typeof cartStatus!="undefined" && cartStatus=='0')) {
				vzw_gnjq("#vgn_shcart").attr("style", "display:none;");
				vzw_gnjq("#vgn_loginContainer").attr("style", "margin-right:0px;");
			}else{
				vzw_gnjq("#vgn_shcart").css("display", "inline-block");
				vzw_gnjq("#vgn_shcart > a").attr("href", vzgnGetCartUrl());
				vzw_gnjq("#vgn_loginContainer").attr("style", "margin-right:0px;");
			}
		},
		showCtyStInfo: function(){
			var city = vzw_gnjq.cookie(gnlin_cityCookieName);
			var state = vzw_gnjq.cookie(gnlin_stateCookieName);
			if(city!=null && state!=null && city.length>0 && state.length>0){
				var cityShort = (city.length>12 ? city.substring(0, 12)+"..." : city);
				var yourLocation = "Your location: "+city+", "+state;
				var textClass = "vgn-minimenu-setlocation-text";
				vzw_gnjq("#desktopOmniNav .o-right-nav > li > #vgn_ctyst").html(cityShort +", "+ state);
				var locationText = vzw_gnjq("#desktopOmniNav .vgn-minimenu-setlocation ."+textClass);
				var locationLink = vzw_gnjq("#desktopOmniNav .vgn-minimenu-setlocation #vgn_ctyst");
				if(locationText.length>0) {
					locationText.html(yourLocation);
				} else {
					locationLink.before("<span class=\""+textClass+"\">"+yourLocation+"</span>");
				}
				locationLink.html("Change location");
			}
		},
		vzgnOneVerizon: function() {
			if (vzgn.runningFromPreProd) {
				vzw_gnjq("#vgn_residential").attr("href","https://tlogin.verizonwireless.com/accessmanager/accountholder/c/residentiallogin?goto=https%3A%2F%2Fwww25.verizon.com%2Fforyourhome%2Fmyaccount%2Fngen%2Fpr%2Fhome%2Fmyverizon.aspx&clientId=vzwtogglenav");
			} else {
				vzw_gnjq("#vgn_residential").attr("href","https://login.verizonwireless.com/accessmanager/accountholder/c/residentiallogin?goto=https%3A%2F%2Fwww.verizon.com%2Fforyourhome%2Fmyaccount%2Fngen%2Fpr%2Fhome%2Fmyverizon.aspx&clientId=vzwtogglenav");
			}
		},
		postProcessMenu: function(){
			try{
				vzgn.gnDebug("inside postProcessMenu");
				if(!vzgn.showLoggedOutMenu){
					var ocCookie = vzw_gnjq.cookie(gnlin_oneBillCompCookieName);
					var isOneBill="false";
					var isAlltel="false";
					var compNm=" ";
					if(ocCookie!=null){
						var ocArr = ocCookie.split("||");
						if(ocArr!=null && ocArr.length>=1 && ocArr[0]=="true"){
							isOneBill = "true";
						}
						if(ocArr!=null && ocArr.length>=2){
							vzgn.acctRegion =ocArr[2];
						}
						if(ocArr!=null && ocArr.length>=3){
							if (ocArr[3] == "1V") {
								vzgn.oneV = true;
							}
						}	
					}
					var alltelcookie = vzw_gnjq.cookie(gnlin_alltelCookieName);
					if(alltelcookie!=null){
						isAlltel = alltelcookie;
					}
					if(isAlltel=='true'){
						if(typeof vzgnAlltellPostProcess!="undefined"){
							vzgnAlltellPostProcess();
						 }
					}
					if(isOneBill=='true'){
						if(typeof vzgnOneBillPostProcess!="undefined"){
							vzgnOneBillPostProcess();
						 }
					}
					if(vzgn.oneV){
						{
							vzgn.vzgnOneVerizon();
						}
					}
				}
				
				//for lower env. modify the logo url
				try{
				  if(!vzgn.runningFromProd){
					if(gnlin_responsiveGN){
					  var logoUrl = vzw_gnjq('nav.o-nav-wrapper .vgn_vz_logo').attr("href");
					  vzw_gnjq('#m_vgn_logo').attr("href", logoUrl);
					}		
				  }
				}catch(e){}
				
				vzgn.vgnCustomMenuFn();
				
				if(gnLoadMPScript=='1'){
				  //load ezlink for motionpoint after page load
				    vzw_gnjq(window).load(function() {
					vzgn.loadMPEzlink();
				   });
				}
				
				//load search plugin for globalnav
				if(!(vzgn_searchConf.searchDisable || gnlin_searchDisable)){		
					vzgn_searchConf.gnusuURL = gnlin_usu;
					vzgn_searchConf.gnscuURL = gnlin_scu;
					vzgn_searchConf.gntypah = gnlin_gntypah;
					vzgn_searchConf.load();	
				}
				
				//MSO Restrict
				if(vzgn.isMso) {
					vzw_gnjq("#desktopOmniNav").addClass('mso '+vzgn.msoName);
					//Remove any MSO restricted links
					vzgn.deleteMsoLinks();
					//Add mso specific content
					if(vzgn_msoList[vzgn.msoName]) {
						vzw_gnjq('#desktopOmniNav .o-logo').attr({title:vzgn_msoList[vzgn.msoName].logoTitle}).html(vzgn_msoList[vzgn.msoName].logoTitle);
						vzw_gnjq('#desktopOmniNav .o-top-nav .o-left-nav').append('<li><a id="msoLinkBack"></a></li>');
						vzw_gnjq('#desktopOmniNav #msoLinkBack').attr({href:vzgn_msoList[vzgn.msoName].linkBackUrl, title:vzgn_msoList[vzgn.msoName].linkBackTitle}).html(vzgn_msoList[vzgn.msoName].linkBackTitle);
					}
				}
				
				
				 vzgn.gnDebug("Exiting postProcessMenu");
			} catch (e) {
				vzgn.gnDebug("Error in postProcess Menu");
			}		 
		},		
		loadMPEzlink: function(){
			//setting the MP domain value for non-prod env. and loading mpel.js for logged out users in vzw domain
			try{
				//dont load for spanish display is set
				if(typeof(spanishDisplay)!='undefined' && spanishDisplay!=null && (spanishDisplay==0 || spanishDisplay=='0')){
				  return;
				}
				
				//for vzw logged out menu load mpel script
				if(!vzgn.isLoggedIn){
					var loadMPScript = false;
					var gnPageDomain= document.domain+"";
					var vzwDomain = null;
					if (typeof vzgnDomains.vzw != 'undefined') {
						vzwDomain = vzgnDomains.vzw.replace("http://", "");
						vzwDomain = vzwDomain.replace("https://", "");
					}
					if((gnPageDomain.indexOf("www.verizonwireless.com")>=0) ||
						((vzwDomain!=null) && (gnPageDomain.indexOf(vzwDomain)>=0))){
						loadMPScript = true;
					}
					if(loadMPScript){
						var mpScriptUrl=gnlin_scu+"/../scripts/mpel.js";
						vzgn.loadScriptAsync(mpScriptUrl, "mpelid");	
					}
				}
			}catch(e){}
		},
		// LivePerson integration	
		loadScriptAsync: function(scriptUrl, scriptId){
			var lzLoadEl = document.createElement('script'); 
			lzLoadEl.type = 'text/javascript'; 
			lzLoadEl.async = true;
			lzLoadEl.id = scriptId
			lzLoadEl.src = scriptUrl;
			var scriptEl = document.getElementsByTagName('script')[0]; 
			scriptEl.parentNode.insertBefore(lzLoadEl, scriptEl);
		},
		setLPAddVars: function () {
			try {
				vzgn.gnDebug('inside setLPAddVars');
				setTimeout(function() {
					if (typeof lpAddVars != 'undefined') {
						vzgn.gnDebug('lpAddVars defined');
						var globalId = vzw_gnjq.cookie("GLOBALID");
							if (globalId != null) {
								lpAddVars('session', 'GID', globalId);
								vzgn.gnDebug('setLPAddVars: set GID: ' + globalId);
						}
						if(vzgn.isLoggedIn){
							if (typeof rememberedUserName != 'undefined' && rememberedUserName != '') {
								lpAddVars('session', 'MDN', rememberedUserName);
								vzgn.gnDebug('setLPAddVars: set rememberedUserName: ' + rememberedUserName);
							}
							lpAddVars('session', 'SuccessfulLogin_OrderTotal', '1');
							vzgn.gnDebug('setLPAddVars: set SuccessfulLogin_OrderTotal: 1' ); 
						}											
					} else {
						vzgn.gnDebug('lpAddVars undefined');
					}
				}, 3000);

			} catch (e) {
				vzgn.gnDebug("error in setLPAddVars");
			}
		},
		vgnCustomMenuFn: function(){
			try{
				
				vzw_gnjq(document).ready(function(){
					try{
						vzgn.checkGlobalIdCookie();
						vzgn.setLPAddVars();						
					}catch(e){
						vzgn.gnDebug("call gn customize menu inside doc. ready");	 
					}
					
				});
				
			 	if(typeof gnCustomizeMenu!="undefined"){
				 	vzgn.gnDebug("call gn customize menu");	 
					gnCustomizeMenu();
				}
			 }catch(e){
				vzgn.gnDebug("Error in gn customize menu");
			 }
		},
		initTouchEvents: function() {
			if(!vzgn.touchEventsInitialized) {
				vzgn.touchEventsInitialized = true;
				
				vzw_gnjq('#desktopOmniNav .o-nav-wrapper, #desktopOmniNav #vgn_minimenu').on('touchstart', function(e) {
					e.stopPropagation();
				});
				
				vzw_gnjq('body').on('touchstart', function(e) {
					vzw_gnjq('#desktopOmniNav .o-nav-wrapper .hover').removeClass('hover');
					vzw_gnjq('#desktopOmniNav #vgn_minimenu').removeClass('active');
				});
			}
		},
		renderMenu: function(){
			vzgn.gnDebug("before renderMenu");
			
			vzw_gnjq('#desktopOmniNav').removeClass('vgn_nojs');
			
			vzw_gnjq("#desktopOmniNav #vgnAccId1start, #desktopOmniNav #vgnAccId1end, #desktopOmniNav #vgnAccId2start, #desktopOmniNav #vgnAccId2end, #desktopOmniNav #vgnAccId3start, #desktopOmniNav #vgnAccId3end, #desktopOmniNav #vgnAccId4start, #desktopOmniNav #vgnAccId4end").keypress(function(evt){
  			   if (evt.keyCode == 13){	  		      
  			      var selMId = vzw_gnjq(this).attr("href");
			      vzw_gnjq(selMId).trigger("focus");
		 	   }
			});
			// accessibility tabbing end

			
			
	        
			if (typeof altLogInDisplay != 'undefined' && altLogInDisplay != null && altLogInDisplay == '1') {
	        	//dont do anything let it go
	        }else if(typeof logInDisplay != 'undefined' && logInDisplay != null && logInDisplay == '0'){
	        	vzw_gnjq('#vgn_signIn').addClass('vgnSNoO');
	        }
			
			vzgn.mainMenu.init();
	    	vzgn.topNav.init();
	    	vzgn.searchForm.init();
	    	vzgn.skipNav.init();
		if( gnlin_myvzFixedSubMenuWrapper ) {
			vzgn.myvzFixedSubMenuWrapper.init();
		}
	    		
			vzw_gnjq('#vgn_siOStart, #vgn_siOEnd').focus(function(){
				vzw_gnjq('#vgn_siOverlay').trigger("click");
			});

			if((typeof(Storage) !== "undefined" && !vzgn.isLoggedIn) && window.location.protocol != "https:" ){ 
				vzgn_storageCartRetrival.init();
			}
	                
			vzgn.gnDebug("after renderMenu");			
		},
		loadScript: function(url, scriptId){
		  vzgn.gnDebug("inside loadScript"+url);
		  vzgn.removeJsIfPresent(scriptId);		  
		  var scriptEl=document.createElement('script');
		  scriptEl.setAttribute("type","text/javascript");
		  scriptEl.setAttribute("src", url);
		  scriptEl.setAttribute("id", scriptId);
		  document.getElementsByTagName("head")[0].appendChild(scriptEl);		  
		},
		removeJsIfPresent: function(scriptId){
		  var jScriptId = "#"+scriptId;
		  if(vzw_gnjq(jScriptId).length>0){
			  vzw_gnjq(jScriptId).remove();
		  }
		},
	    vgnBindSelEvt: function(selEl){
			selEl.focus(function(e){
				vzw_gnjq(this).prev().removeClass("active").addClass("active");
			});
			selEl.blur(function(e){
				vzw_gnjq(this).prev().removeClass("active");
			});
			selEl.hover(function(e){
				vzw_gnjq(this).prev().addClass("activeHover");
			}, function(){
				vzw_gnjq(this).prev().removeClass("activeHover");
			});

			selEl.keyup(function(e){		  
				var thisEl = vzw_gnjq(this);
				var selTxt = thisEl.find("option:selected").text();
				thisEl.prev().find(".vgn_label_txt").html(selTxt);
				thisEl.trigger("change");
			});
	    },
		getUrlDomain: function(url){
			var urlLoc = url;
			var urlDomain="";
			var contextPathArr = urlLoc.split("/");
			if(contextPathArr!=null && contextPathArr.length>=3){
			 	urlDomain = contextPathArr[0]+"//"+contextPathArr[2];			
			}else{
				urlDomain = urlLoc;
			}
			return urlDomain;
		},
		callAjaxJsonp: function(serviceUrl, inputData, respFn, respErr, ajaxTimeout, cbFuncNm) {
			vzgn.gnDebug("Entering callAjaxJsonp");
			vzw_gnjq.ajax({
			    jsonp:false,
			    url: serviceUrl,
			    data: inputData,
			    dataType: 'jsonp',	
			    type: 'GET',
			    cache: false,			    
			    timeout: ajaxTimeout,
			    error: respErr,		    		    
			    success: respFn,
			    jsonpCallback:cbFuncNm
			});
			vzgn.gnDebug("Exiting callAjaxJsonp");
		},
		hideTypeAhead: function() {
			vzw_gnjq("#desktopOmniNav .gn-typeahead-search, #gn-typeahead-overlay").hide();
		},
		hideMiniCart: function() {
			var miniCartEle = vzw_gnjq('#minicart .mini-cart, #minicart .cart-close');
			if(miniCartEle.size() > 0) {
				miniCartEle.hide();
			}
		},
		setSiOGoto: function(gotoUrl){
			vzw_gnjq("#vgnSignInOForm #gotoOID").val(gotoUrl);
		},
		gotoPage: function(pageUrl){
			document.location.href=pageUrl;
		},
		submitOGNLoginForm: function(){
			vzw_gnjq("#vgnSignInForm").submit();
		},
		renderSignInOverlay: function(msg,specObj){
			if(typeof msg != 'undefined' && msg!=null && vzw_gnjq.trim(msg).length>0){
				gnlin_signInOMsg = msg;
			}
			if(typeof specObj != 'undefined'){
				gnlin_singInOSpec =  specObj;
			}
			vzgn.setGNGotoUrl();
			vzgn.modal.signInRegister.actions.show();
		},
		onClickRememberUName: function(chkBx){
			var thisEl = vzw_gnjq(chkBx);
			var formEl = thisEl.parents("form");
			var remUNameExistsEl = formEl.find("input[name='rememberUserNameCheckBoxExists']");
			if(thisEl.is(":checked")){
				thisEl.val("Y");
				remUNameExistsEl.val("Y");
			}else{
				thisEl.val("N");
				remUNameExistsEl.val("Y");
			}
			if(formEl.attr("id")=="vgnSignInForm"){
				gnlin_isSignInFormElClicked = "Y";	
			}
			
		},
		setGNGotoUrl: function(gotoUrl){
			vzgn.gnGotoUrl = "";
			if(typeof gotoUrl != 'undefined'){
				vzgn.gnGotoUrl = gotoUrl;
			}else{
				 if (typeof window["goto"] != 'undefined' && window["goto"] != null && window["goto"].length>0) {
					 vzgn.gnGotoUrl = window["goto"];
				}	
			}
		},
		gnGotoUrl: null,
		viewDemoO:function(){
			var html = '<iframe scrolling="no" frameborder="0" id="vgnOverlayFrame" allowtransparency="true" src="'+						 
						gnlin_scu+"/../myvzDemo.html"+
						'" style="width: 640px; height: 360px;" name="vgnoverlayFrame"></iframe>';
			var config = {"title":'My Verizon',
					  "width":640,
					  "ariaTxt":"myvzdemodialog",
					  "html":html};
			vzgn.modal.open(config);
		},
		
		simulateClickFromKeyboardEvent: function(_this) {
			var returnVal = vzw_gnjq(_this).click();
			var onclick = vzw_gnjq(_this).attr('onclick');
			if(!onclick || !onclick.match(/return false;/i)) {
				//forcing a click event may not make the user go to the url, but will fire any JS bound events.  force window.location
				var href = vzw_gnjq(_this).attr('href');
				if(href == undefined) {
					href = vzw_gnjq(_this).data('href');
				}
				if(href) {
					window.location = href;
				}
			}
		},
		
		keyboard: {
			textSearchMenuItem: function(_this, _event, isTier3) {
				var code = _event.keyCode || _event.which;
				if(code>=48 && code<=90) {
					_event.preventDefault();
					_event.stopPropagation();
					
					var char = String.fromCharCode(code).toLowerCase();
					var par = (isTier3 ? vzw_gnjq(_this).parents('.o-item') : vzw_gnjq(_this).parent());
					var fnd = (isTier3 ? par.parents('.o-tier-three').find('*[data-search="'+char+'"]:visible:has(a:visible, :input:visible)') : par.parent().children('*[data-search="'+char+'"]:visible:has(a:visible, :input:visible)'));
					if(fnd.length>0) {
						var si = -1;
						for(var i=0;i<fnd.length;++i) {
							if(vzw_gnjq(fnd[i]).is(par)) {
								si = i;
								break;
							}
						}
						if(si>-1 && fnd.length>1) {
							si = si==fnd.length-1 ? 0 : si+1; 
						} else {
							si = 0;
						}
						var a = vzw_gnjq(fnd[si]).find('a, :input');
						if(a.length>0) {
							vzw_gnjq(a[0]).focus();
						}
					}
				}
			}
		},
		
		lazyLoad: {
			load: function(_this) {
				_this = vzw_gnjq(_this);
				if(!_this.hasClass('loading')) {
					_this.addClass('loading');
					var src = _this.data('src');
					var alt = _this.data('alt');
					var img = _this.append('<img alt="'+alt+'" />').children('img');
					img.on('load', vzgn.lazyLoad.loaded).attr({src:src});
				}
			},
			loaded: function() {
				vzw_gnjq(this).unwrap();
			} 
		},
		
		/*** Main Menu ***/
		mainMenu: {
			init: function() {
				var _events = vzgn.mainMenu.events;
				
				/*** Support for Touch Events ***/
				vzw_gnjq('#desktopOmniNav .o-nav-wrapper li > a').on('touchstart', _events.onTouchStartTier1Tier2);
				/*** Mouse events ***/
	    		vzw_gnjq('#desktopOmniNav .o-tier-one > li:not(.vgn_ignoreHover)').on('mouseover', _events.onMenuMouseOver);
	    		vzw_gnjq('#desktopOmniNav .o-tier-one').on('mouseout', _events.onMenuMouseOut);
				vzw_gnjq('#desktopOmniNav .o-nav-wrapper li, #desktopOmniNav .o-nav-wrapper .o-item').on('mouseover', _events.onMenuItemMouseOver).on('mouseout', _events.onMenuItemMouseOut);
				vzw_gnjq('#desktopOmniNav .o-nav-wrapper .o-item').on('click', _events.onMenuItemClick);
				vzw_gnjq('#desktopOmniNav .o-nav-wrapper .o-item a').on('click', _events.onMenuItemLinkClick);
	    		
				// accessibility tabbing start
				vzw_gnjq('#desktopOmniNav .o-tier-one > li > a, #desktopOmniNav .o-tier-two > .o-list-table > ul > li > a').on('focus',_events.onFocusTier1Tier2).on('keydown', _events.onKeyDownTier1Tier2);
				vzw_gnjq('#desktopOmniNav .o-tier-three .o-item a').on('keydown', _events.onKeyDownTier3).on('focus', _events.onFocusTier3).on('blur', _events.onBlurTier3);
				//Check for all blur events on the nav
				vzw_gnjq('#desktopOmniNav .o-nav-wrapper a').on('blur',_events.onBlurMenuItem);
				vzw_gnjq('#desktopOmniNav .o-nav-wrapper').on('mousemove', _events.onMouseMoveMenu);
				
				//lazy-loading
				vzw_gnjq('#desktopOmniNav .o-tier-one > li > a').on('mouseover focus touchstart', _events.onLazyLoadImages);
			},
			
			openFocusNav: function(_this) {
				var focusEle = vzw_gnjq(_this).parent(); 
				focusEle.addClass('focus focus-open').siblings().removeClass('focus focus-open');
				focusEle.find('.focus, .focus-open').removeClass('focus focus-open');
				focusEle.children('.o-tier-two, .o-tier-three').attr('aria-hidden','false');
				
				//vzw_gnjq('#desktopOmniNav .o-nav-wrapper .hover').removeClass('hover');
			},
			closeFocusNav: function(_this) {
				var focusEle = vzw_gnjq(_this).parent();
				focusEle.removeClass('focus-open');
				focusEle.find('.focus-open').removeClass('focus-open');
				focusEle.children('.o-tier-two, .o-tier-three').attr('aria-hidden','true');
			},
			
			isNullLink: function(_this) {
				var href = vzw_gnjq(_this).attr('href');
				if(href && href.length>0 && href != '#') {
					return false;
				}
				return true;
			},
			
			events: {
				onTouchStartTier1Tier2: function(e) {
					vzgn.initTouchEvents();
					
					/*** Disable click events on touch events, if there's sub-navigation ***/
					var subNav = vzw_gnjq(this).siblings('.o-tier-two, .o-tier-three');
					if(subNav && subNav.length>0) {
						e.stopPropagation();
						e.preventDefault();
						
						var parEle = vzw_gnjq(this).parent();
						if(parEle.hasClass('hover')) {
							parEle.removeClass('hover').find('.hover').removeClass('hover');
						}else{
							parEle.addClass('hover').siblings().removeClass('hover');
							parEle.find('.hover').removeClass('hover');
						}
						
						vzgn.mainMenu.events.onMenuMouseOver(e, this);
					}
				},
				onLazyLoadImages: function() {
					var t3 = vzw_gnjq(this).siblings('.o-tier-two');
					if(t3.length>0 && !t3.hasClass('lazy-loaded'))  {
						t3.addClass('lazy-loaded');
						t3.find('.gn_image').each(function() {
							vzgn.lazyLoad.load(this);
						});
					}
				},
				onFocusTier1Tier2: function() {
					vzgn.mainMenu.openFocusNav(this);
				},
				onBlurMenuItem: function() {
					//Wait to make sure all blur events have fired
					setTimeout(function() {
						//If no element has focus, close the nav
						var focusEle = vzw_gnjq('#desktopOmniNav .o-nav-wrapper a:focus');
						if(focusEle.size() == 0) {
							vzw_gnjq('#desktopOmniNav .o-nav-wrapper .focus, #desktopOmniNav .o-nav-wrapper .focus-open').removeClass('focus focus-open');
						}
					}, 10);
				},
				onMouseMoveMenu: function() {
					//If the mouse moves over the omninav, lose focus events
					vzw_gnjq('#desktopOmniNav .o-nav-wrapper .focus, #desktopOmniNav .o-nav-wrapper .focus-open').removeClass('focus focus-open');
				},
				onMenuMouseOver: function(){
					vzgn.hideTypeAhead();
					vzgn.hideMiniCart();
					
					var selEle  = vzw_gnjq(this);
	    			var allAEle = vzw_gnjq('#desktopOmniNav .o-tier-one > li:not(.vgn_ignoreHover) > a');
	    			var selId   = selEle.children('a').attr('id');
	    			var selIndex = 0;
	    			for(var i=0;i<allAEle.size();++i) {
						if(selId == vzw_gnjq(allAEle.get(i)).attr('id')) {
							selIndex = i+1;
							break;
	    				}
	    			}
	    			
	    			if(selIndex >= 1 && selIndex <= 3) {
	    				vzw_gnjq('#desktopOmniNav .o-tier-one').removeClass('hover1 hover2 hover3').addClass('hover'+selIndex);
	    			}
				},
				onMenuMouseOut: function(){
					vzw_gnjq(this).removeClass('hover1 hover2 hover3');
				},
				onMenuItemMouseOver: function() {
					vzw_gnjq(this).addClass('hover').children('.o-tier-two, .o-tier-three').attr('aria-hidden','false');
				},
				onMenuItemMouseOut: function() {
					vzw_gnjq(this).removeClass('hover').children('.o-tier-two, .o-tier-three').attr('aria-hidden','true');
				},
				onMenuItemClick: function(e) {
					var a = vzw_gnjq(this).find('a');
					if(a.length>0) {
						vzgn.simulateClickFromKeyboardEvent(a[0]);
					}
				},
				onMenuItemLinkClick: function(e) {
					e.stopPropagation();
				},
				onKeyDownTier1Tier2: function(e) {
					var code = e.keyCode || e.which;
					
					var par = vzw_gnjq(this).parent();
					var isTier1 = par.parent().hasClass('o-tier-one');
					if(code == 13 || code == 32 || code == 38 || code == 40) {
						//return-space-up-down
						//If return-space hit, and the sub-nav is open with a viable link focused
						if((code == 13 || code == 32) && ((par.hasClass('focus-open') || !par.hasClass('has-children')) && !vzgn.mainMenu.isNullLink(this))) {
							vzgn.simulateClickFromKeyboardEvent(this);
						} else {
							if(code == 38 && !isTier1) {
								var liPar = par.parents('li');
								if(liPar.length>0) {
									var upLink = vzw_gnjq(liPar[0]).children('a');
									upLink.focus();
									vzgn.mainMenu.closeFocusNav(this);
								}
							} else {
								vzgn.mainMenu.openFocusNav(this);
								if(isTier1) {
									par.find('.o-tier-two > .o-list-table > ul > li:first-child > a').focus();
								} else {
									var a = par.find('.o-tier-three a');
									if(a.length>0) {
										a[0].focus();
									}
								}
							}
							e.preventDefault();
						}
					} else if(code == 39) {
						//right
						var next = vzw_gnjq(this).parent().next();
						while(next.length>0 && (!next.is(':visible') || next.children('a').length<=0)) {
							next = next.next();
						}
						if(next.length>0) {
							var a = next.find('a');
							if(a.length>0) {
								a[0].focus();
							}
						}
					} else if(code == 37) {
						//left
						var prev = vzw_gnjq(this).parent().prev();
						while(prev.length>0 && (!prev.is(':visible') || prev.find('a').length<=0)) {
							prev = prev.prev();
						}
						if(prev.length>0) {
							var a = prev.find('a');
							if(a.length>0) {
								a[0].focus();
							}
						}
					} else if(code == 27) {
						//escape
						if(!isTier1) {
							var liPar = par.parents('li');
							if(liPar.length>0) {
								var upLink = vzw_gnjq(liPar[0]).children('a');
								upLink.focus();
								vzgn.mainMenu.closeFocusNav(upLink);
							}
						} else {
							vzgn.mainMenu.closeFocusNav(this);
						}
						return false;
					}

					vzgn.keyboard.textSearchMenuItem(this, e);
					
					if(code == 32) {
						return false;
					}
				},
				onKeyDownTier3: function(e) {
					var code = e.keyCode || e.which;
					
					var oitem = vzw_gnjq(this).parents('.o-item');
					var isSeeAll = oitem.hasClass('o-see-all');
					if(code == 13 || code == 32) {
						//return-space
						vzgn.simulateClickFromKeyboardEvent(this);
					} else if(code == 38) {
						//up
						if(!isSeeAll) {
							var colIndex = oitem.index();
							var prevRow = oitem.parent().prev();
							if(prevRow.length>0) {
								var item = prevRow.children(':eq('+(colIndex)+')');
								if(item.length>0) {
									item.find('a:first-child').focus();
								}
							} else {
								var liPar = oitem.parents('li');
								if(liPar.length>0) {
									var upLink = vzw_gnjq(liPar[0]).children('a');
									upLink.focus();
								}
							}
						} else {
							var prev = oitem.prev();
							while(prev.length>0 && (!prev.is(':visible') || prev.find('a').length<=0)) {
								prev = prev.prev();
							}
							if(prev.length>0) {
								if(prev.hasClass('o-see-all')) {
									prev.children('a').focus();
								} else {
									prev.find('tr:last-child td:first-child a').focus();
								}
							}
						}
						
						e.preventDefault();
					} else if(code == 40) {
						//down
						if(!isSeeAll) {
							var colIndex = oitem.index();
							var nextRow = oitem.parent().next();
							if(nextRow.length>0) {
								var item = nextRow.children(':eq('+(colIndex)+')');
								if(item.length>0) {
									item.find('a:first-child').focus();
								}
							} else {
								var grid = oitem.parents('.o-grid');
								if(grid.length>0) {
									var seeAll = vzw_gnjq(grid[0]).children('.o-see-all');
									if(seeAll.length>0) {
										vzw_gnjq(seeAll[0]).children('a:first-child').focus();
									}
								}
							}
						} else {
							var next = oitem.next();
							while(next.length>0 && (!next.is(':visible') || next.find('a').length<=0)) {
								next = next.next();
							}
							if(next.length>0) {
								next.children('a:first-child').focus();
							}
						}
						e.preventDefault();
					} else if(code == 39) {
						//right
						if(!isSeeAll) {
							var next = oitem.next();
							while(next.length>0 && (!next.is(':visible') || next.find('a').length<=0)) {
								next = next.next();
							}
							if(next.length>0) {
								var a = next.find('a');
								if(a.length>0) {
									a[0].focus();
								}
							} else {
								var nextRow = oitem.parent().next();
								if(nextRow.length>0) {
									var item = nextRow.children(':first-child');
									if(item.length>0) {
										item.find('a:first-child').focus();
									}
								} else {
									var grid = oitem.parents('.o-grid');
									if(grid.length>0) {
										var seeAll = vzw_gnjq(grid[0]).children('.o-see-all');
										if(seeAll.length>0) {
											vzw_gnjq(seeAll[0]).find('a:first-child').focus();
										}
									}
								}
							}
						} else {
							var next = oitem.next();
							while(next.length>0 && (!next.is(':visible') || next.find('a').length<=0)) {
								next = next.next();
							}
							if(next.length>0) {
								next.children('a:first-child').focus();
							}
						}
					} else if(code == 37) {
						//left
						if(!isSeeAll) {
							var prev = oitem.prev();
							while(prev.length>0 && (!prev.is(':visible') || prev.find('a').length<=0)) {
								prev = prev.prev();
							}
							if(prev.length>0) {
								var a = prev.find('a');
								if(a.length>0) {
									a[0].focus();
								}
							} else {
								var prevRow = oitem.parent().prev();
								if(prevRow.length>0) {
									var item = prevRow.children(':last-child');
									if(item.length>0) {
										item.find('a:first-child').focus();
									}
								} else {
									var liPar = oitem.parents('li');
									if(liPar.length>0) {
										var upLink = vzw_gnjq(liPar[0]).children('a');
										upLink.focus();
									}
								}
							}
						} else {
							var prev = oitem.prev();
							while(prev.length>0 && (!prev.is(':visible') || prev.find('a').length<=0)) {
								prev = prev.prev();
							}
							if(prev.length>0) {
								if(prev.hasClass('o-see-all')) {
									prev.children('a').focus();
								} else {
									prev.find('tr:last-child td:last-child a').focus();
								}
							}
						}
					} else if(code == 27) {
						//escape
						var liPar = oitem.parents('li');
						if(liPar.length>0) {
							var upLink = vzw_gnjq(liPar[0]).children('a');
							upLink.focus();
							vzgn.mainMenu.closeFocusNav(upLink);
						}
						return false;
					}

					vzgn.keyboard.textSearchMenuItem(this, e, true);
					
					if(code == 32) {
						return false;
					}
				},
				onFocusTier3: function() {
					vzw_gnjq(this).parents('.o-item').addClass('focus');
				},
				onBlurTier3: function() {
					vzw_gnjq(this).parents('.o-item').removeClass('focus');
				}
			}
		},
		
		/*** Fixing MyVz submenu wrapper ***/
		myvzFixedSubMenuWrapper: {
			init: function() {
				var _events = vzgn.myvzFixedSubMenuWrapper.events;
				
				var myVzSubMenu = vzw_gnjq("li[data-navid='gn21'] div.o-tier-two").detach();
				myVzSubMenu.attr("aria-hidden", false);
				vzw_gnjq("form#vgn_search").after("<div class='o-nav-wrapper' id='myvz-fixed-subMenu-wrapper'></div>");
				vzw_gnjq("#myvz-fixed-subMenu-wrapper").html(myVzSubMenu);
				
				if( vzw_gnjq("#myvz-fixed-subMenu-wrapper").length ) {
					var gNavHeight = vzw_gnjq("#globalNavId").height();
					var targetNavHeight = gNavHeight+50+"px";
					vzw_gnjq("#globalNavId").css("height",targetNavHeight);
					vzw_gnjq('#myvz-fixed-subMenu-wrapper .o-tier-two a.active-bar').on('mouseover focus touchstart', _events.onLazyLoadImages);
				}
			},
			
			events: {
				onLazyLoadImages: function() {
					var t3 = vzw_gnjq(this).siblings('.o-tier-three');
					if(t3.length>0 && !t3.hasClass('lazy-loaded'))  {
						t3.addClass('lazy-loaded');
						t3.find('.gn_image').each(function() {
							vzgn.lazyLoad.load(this);
						});
					}
				}
			}
		},
		
		/*** Skip Navigation ***/
		skipNav: {
			init: function() {
				var _events = vzgn.skipNav.events;
				
				vzw_gnjq('#desktopOmniNav a.vgn_vhidden.accessibility').on('keydown', _events.onKeyDown);
			},
			
			events: {
				onKeyDown: function(e) {
					var code = e.keyCode || e.which;
					if(code == 27) {
						//escape
						vzw_gnjq(':focus').blur();
						e.stopPropagation();
						e.preventDefault();
					}
					if(code == 32) {
						vzgn.simulateClickFromKeyboardEvent(this);
						return false;
					}
				}
			}
		},
		
		/*** Top Nav ***/
		topNav: {
			init: function() {
				var _events = vzgn.topNav.events;
				
				vzgn.topNav.miniMenu.init();
				if(vzw_gnjq('#desktopOmniNav #vgn_signIn').length>0) {
					vzgn.topNav.signInRegister.init();
				}
    			vzw_gnjq('#desktopOmniNav .o-top-nav > ul > li > a').on('keydown', _events.onKeyDownMenuItem);
    			vzw_gnjq('#desktopOmniNav .o-top-nav .o-left-nav #vgn_business, #desktopOmniNav .o-top-nav .o-right-nav #vgn_business').on('click', vzgn.createMyBizCookie);
    			vzw_gnjq('#desktopOmniNav .o-top-nav .o-left-nav #vgn_wireless, #desktopOmniNav .o-top-nav .o-right-nav #vgn_wireless').on('click', vzgn.destroyMyBizCookie);    			
			},
		
			events: {
				onKeyDownMenuItem: function(e) {
					if(vzw_gnjq(this).parent().attr('id')=='vgn_signIn') {
						var actions = vzgn.topNav.signInRegister.events.onKeyDownMenu(e);
						if(actions.stopActions) {
							e.preventDefault();
							return false;
						}
					}
					
					var code = e.keyCode || e.which;
					if(code == 40 || code == 39) {
						//down-right
						var next = vzw_gnjq(this).parent().next();
						while(next.length>0 && (!next.is(':visible') || next.find('a').length<=0)) {
							next = next.next();
						}
						if(next.length>0) {
							var a = next.find('a');
							if(a.length>0) {
								a[0].focus();
							}
						} else {
							if(vzw_gnjq(this).parent().parent().hasClass('o-left-nav')) {
								vzw_gnjq('#desktopOmniNav .o-top-nav .o-right-nav li:first-child > a').focus();
							}
						}

						e.preventDefault();
					} else if(code == 37 || code == 38) {
						//up-left
						var prev = vzw_gnjq(this).parent().prev();
						while(prev.length>0 && (!prev.is(':visible') || prev.find('a').length<=0)) {
							prev = prev.prev();
						}
						if(prev.length>0) {
							var a = prev.find('a');
							if(a.length>0) {
								a[0].focus();
							}
						} else {
							if(vzw_gnjq(this).parent().parent().hasClass('o-right-nav')) {
								vzw_gnjq('#desktopOmniNav .o-top-nav .o-left-nav li:last-child > a').focus();
							}
						}

						e.preventDefault();
					}
					
					vzgn.keyboard.textSearchMenuItem(this, e);
					
					if(code == 32) {
						vzgn.simulateClickFromKeyboardEvent(this);
						return false;
					}
				}
			},
			
			/*** Mini Menu ***/
			miniMenu: {
				init: function() {
					var _events = vzgn.topNav.miniMenu.events;

					//Bind touch/keyboard/mouse events
					vzw_gnjq('#desktopOmniNav #vgn_minimenu > a').on('touchstart', _events.onTouchToOpenClose).on('keydown', _events.onKeyDownMenu).on('click', function() { return false; });
					vzw_gnjq('#desktopOmniNav #vgn_minimenu a, #desktopOmniNav #vgn_minimenu button').on('focus', _events.onOpen).on('blur', _events.onClose);
					vzw_gnjq('#desktopOmniNav #vgn_minimenu').on('mouseover', _events.onOpen).on('mouseout', _events.onClose);
					vzw_gnjq('#desktopOmniNav #vgn_minimenu .o-minimenu button').on('keydown', _events.onKeyDownMenuItem).on('click', _events.onClickMenuItem);
					vzw_gnjq(window).on('resize', _events.onWindowResize);
					
					_events.onWindowResize();
				},

				hide: function() {
					vzw_gnjq('#vgn_minimenu').removeClass('active').find('.o-minimenu').attr({'aria-hidden':'true'});
				},
				show: function() {
					vzw_gnjq('#vgn_minimenu').addClass('active').find('.o-minimenu').attr({'aria-hidden':'false'});
				},
				
				events: {
					onTouchToOpenClose: function(e) {
						vzgn.initTouchEvents();
						
						e.stopPropagation();
						e.preventDefault();
						
						
						if(!vzw_gnjq(this).parent().hasClass('active')) {
							vzgn.topNav.miniMenu.events.onOpen();
						} else {
							vzgn.topNav.miniMenu.events.onClose();
						}
					},
					onOpen: function(){	
						vzgn.hideTypeAhead();
						vzgn.hideMiniCart();
						vzgn.topNav.signInRegister.hide();
						
						vzgn.topNav.miniMenu.show();
			         },
			        onClose: function(){
			        	vzgn.topNav.miniMenu.hide();
					},
					onKeyDownMenu: function(e) {
						var code = e.keyCode || e.which;
						if(code == 13 || code == 32 || code == 38 || code == 40) {
							//return-space-up-down
							vzgn.topNav.miniMenu.events.onOpen();
							var item = vzw_gnjq('#desktopOmniNav #vgn_minimenu li:first-child');
							while(item && item.length>0 && (!item.is(':visible') || item.find('button').length<=0)) {
								item = item.next();
							}
							if(item.length>0) {
								item.find('button').focus();
							}
						} else if(code == 27) {
							//escape
							vzgn.topNav.miniMenu.events.onClose();
						}
						if(code == 32) {
							return false;
						}
					},
					onClickMenuItem: function(e) {
						var onclick = vzw_gnjq(this).attr('onclick');
						if(!onclick || !onclick.match(/return false;/i)) {
							window.location = vzw_gnjq(this).data('href');
						}
					},
					onKeyDownMenuItem: function(e) {
						var code = e.keyCode || e.which;
						if(code == 40 || code == 39) {
							//down-right
							var next = vzw_gnjq(this).parent().next();
							while(next && next.length>0 && (!next.is(':visible') || next.find('button').length<=0)) {
								next = next.next();
							}
							if(next.length>0) {
								var a = next.find('button');
								if(a.length>0) {
									a[0].focus();
								}
							}
						} else if(code == 37 || code == 38) {
							//up-left
							var prev = vzw_gnjq(this).parent().prev();
							while(prev && prev.length>0 && (!prev.is(':visible') || prev.find('button').length<=0)) {
								prev = prev.prev();
							}
							if(prev.length>0) {
								var a = prev.find('button');
								if(a.length>0) {
									a[0].focus();
								}
							} else {
								vzw_gnjq('#desktopOmniNav #vgn_minimenu > a').focus();
								vzgn.topNav.miniMenu.events.onClose();
							}
						} else if(code == 27) {
							//escape
							vzw_gnjq('#desktopOmniNav #vgn_minimenu > a').focus();
							vzgn.topNav.miniMenu.events.onClose();
						}

						vzgn.keyboard.textSearchMenuItem(this, e);
						
						if(code == 32 || code == 13) {
							vzgn.simulateClickFromKeyboardEvent(this);
							return false;
						}
					},
					onWindowResize: function() {
						var minimenu = vzw_gnjq('#desktopOmniNav #vgn_minimenu');
						minimenu.attr('aria-hidden', (minimenu.is(':visible') ? 'false' : 'true'));
					}
				}
			},
			
			/*** Sign In / Register Dropdown ***/
			signInRegister: {
				init: function(){
					var _events = vzgn.topNav.signInRegister.events;
					
					vzgn.setGNGotoUrl();
					var gotoUrl = vzgn.gnGotoUrl;
					
		        	if(!(typeof loggedInURL  != 'undefined' && loggedInURL != null && loggedInURL.length>0)){        		
		        		//defaulting it to production signin url
		        		loggedInURL = "https://login.verizonwireless.com/amserver/UI/Login"
		        	}
		        	var signInEl = vzw_gnjq("#vgn_loginContainer");
		        	signInEl.find("#vgnSignInForm").attr("action", loggedInURL);
		        	if (gotoUrl!=null){     
		        		signInEl.find("#gotoID").val(gotoUrl);
		        	}
		        	
		        	if((typeof vzgn_silinks != 'undefined') && (typeof vzgn_silinks.vzw != 'undefined')){
		        		signInEl.find("#vgn_vzw_forgUid").attr("href", vzgn_silinks.vzw.forgotUid);
		        		signInEl.find("#vgn_vzw_forgPwd").attr("href", vzgn_silinks.vzw.forgotPwd);
		        		if (gotoUrl!=null){ 
		        			signInEl.find("#vgn_vzw_register").attr("href", vzgn_silinks.vzw.register+gotoUrl);	
		        		}else{
		        			signInEl.find("#vgn_vzw_register").attr("href", vzgn_silinks.vzw.register);
		        		}
		        		signInEl.find("#vgn_vzw_viewDemo").click(function(){vgn_hbLink('view demo');vzgn.viewDemoO();});	        		
		        	}	        	
		        	if((typeof vzgn_silinks != 'undefined') && (typeof vzgn_silinks.vzwmybiz != 'undefined')){
		        		signInEl.find("#vgnMyBizSignInForm").attr("action", vzgn_silinks.vzwmybiz.loginUrl);
		        		signInEl.find("#vgn_vzwmybiz_forgUid").attr("href", vzgn_silinks.vzwmybiz.forgotUid);
		        		signInEl.find("#vgn_vzwmybiz_forgPwd").attr("href", vzgn_silinks.vzwmybiz.forgotPwd);
		        		signInEl.find("#vgn_vzwmybiz_register").attr("href", vzgn_silinks.vzwmybiz.register);
		        		signInEl.find("#vgn_vzwmybiz_playVideo").attr("href", vzgn_silinks.vzwmybiz.playVideo);
		        		
		        		try{
			        		if ((typeof vzgn_silinks.vzwmybiz.loginUrl != 'undefined') &&
			        			(vzgn_silinks.vzwmybiz.loginUrl!=null)&&
			        			(vzgn_silinks.vzwmybiz.loginUrl.length>0)){
			        			signInGN.mbloginURL = vzgn_silinks.vzwmybiz.loginUrl;
			        			vzw_gnjq(document).ready(function(){
			        				try{
			        					vzw_gnjq('#myBusinessButtonContainer').attr("href", vzgn_silinks.vzwmybiz.loginUrl);
			        				}catch(e){}
			        			});
							}
		        		}catch(e){}
		        	}
		        	
		        	if (typeof multiAccount != 'undefined' && multiAccount != null && multiAccount == 'true') {
		            	vzw_gnjq("#vgnAccSelector").removeClass("vgn_hide");
		            	var accLabel = vzw_gnjq("#vgnAccLabel");
		            	accLabel.removeClass("vgn_hide");	            	
		            	var selEl =vzw_gnjq("#vgnAccSelector");
		            }
		            
		            if (typeof rememberUserDisplay != 'undefined' && rememberUserDisplay != null && rememberUserDisplay == '1') {
		            	vzw_gnjq("#vgn_remUIDSec").removeClass("vgn_hide");	            	
		            }
		            if((typeof rememberedUserName!= 'undefined') && (rememberedUserName.length > 0)) {
		            	vzw_gnjq("#rememberUNameExistsGN, #rememberUserNameGN").val("Y");
		            	vzw_gnjq("#rememberUserNameGN").get(0).checked=true;
		            	vzw_gnjq("#IDToken1_GN").val(rememberedUserName).trigger('change');
		            	vzw_gnjq("#vgn_signIn .vgn_userIdLabel").addClass("vgn_hide");
		            }else{
		            	vzw_gnjq("#rememberUNameExistsGN, #rememberUserNameGN").val("N");
		            	vzw_gnjq("#rememberUserNameGN").get(0).checked=false;
		            }	            
		            
		            if (gotoUrl!=null) {            	
		            	vzw_gnjq("#gotoID").val(gotoUrl);
		            }
		            if (vzgn.isMyBizMenu) {
		            	vzw_gnjq('#vgnAccSelector').val("2");
			    		_events.onChangeAccountSelect();
			    	}
					
		            if(vzw_gnjq("#vgn_siOverlay").length==0){
						vzw_gnjq("#vgn_signIn").after("<li><div id='vgn_siOverlay'>&nbsp;</div></li>");	
					}
		        	
		        	vzw_gnjq('#vgn_siOverlay').click(function(){
		        		vzw_gnjq('#vgn_siOverlay').hide();
						vzw_gnjq('#vgn_signIn').removeClass('active');	
						gnlin_isSignInFormElClicked = "N";
	        		});
		        		    		
		    		
					
					
					//Bind touch events
					vzw_gnjq('#desktopOmniNav #vgn_signIn > a').on('touchstart', _events.onTouchToOpenClose);
					
					//Bind keyboard/mouse events
					vzw_gnjq('#desktopOmniNav #vgn_signIn').hover(_events.onOpen, _events.onClose);
	    			vzw_gnjq('#desktopOmniNav #IDToken1_GN, #desktopOmniNav #IDToken1_GN_Biz').on('focus', _events.onFocusUsernameInput).on('blur', _events.onBlurUsernameInput).on('propertychange change click keyup input paste', _events.onTextChangeUsernameInput);
	    			vzw_gnjq('#desktopOmniNav #vgn_signIn .gn_checkbox').gn_checkbox().on('change', function() { vzgn.onClickRememberUName(this); });
					vzw_gnjq('#desktopOmniNav #vgn_signIn > a').on('focus', _events.onFocusTriggerLink);
					if(vzw_gnjq('#desktopOmniNav #vgnAccSelector:not(.vgn_hide)').length>0) {
						vzw_gnjq('#desktopOmniNav #vgnAccSelector').on('change', _events.onChangeAccountSelect).gn_select();
					}
					vzw_gnjq('#desktopOmniNav #vgn_loginContainer :input:not(#vgnAccSelector), #desktopOmniNav #vgn_loginContainer *[role="listbox"], #desktopOmniNav #vgn_loginContainer a').on('keydown', _events.onKeyDownInput);
	    			vzw_gnjq('#desktopOmniNav #vgn_loginContainer :input, #desktopOmniNav #vgn_loginContainer a').on('focus', _events.onFocusInput);
	    			vzw_gnjq('#desktopOmniNav #vgnSignInForm').on('submit', _events.onSubmitWireless);
	    			vzw_gnjq('#desktopOmniNav #vgnMyBizSignInForm').on('submit', _events.onSubmitBusiness);
				},

				hide: function() {
					vzw_gnjq('#vgn_signIn').removeClass('active').find('#vgn_loginContainer').attr({'aria-hidden':'true'});
					vzw_gnjq('#vgn_siOverlay').hide();
				},
				show: function() {
					vzw_gnjq('#vgn_signIn').addClass('active').find('#vgn_loginContainer').attr({'aria-hidden':'false'});
					vzw_gnjq('#vgn_siOverlay').show();
				},
				triggerFocusMenuParentNoOpen: function() {
					vzw_gnjq('#desktopOmniNav #vgn_signIn > a').addClass('no-focus-open').focus();
				},
				
				events: {
					onOpen: function(){	
						if(!vzw_gnjq('#desktopOmniNav #vgn_signIn > a').hasClass('no-focus-open')) {
							vzgn.hideTypeAhead();
							vzgn.hideMiniCart();
							vzgn.topNav.miniMenu.hide();
						
							vzgn.topNav.signInRegister.show();
						}
			        },
			        onClose: function(){
			        	if(gnlin_isSignInFormElClicked=="N"){	
			        		vzgn.topNav.signInRegister.hide();
			        	}
					},
					onFocusTriggerLink: function() {
						vzgn.topNav.signInRegister.events.onOpen();
						vzw_gnjq('#desktopOmniNav #vgn_signIn > a').removeClass('no-focus-open');;
					},
					onFocusInput: function(e) {
						gnlin_isSignInFormElClicked = "Y";
					},
					onTouchToOpenClose: function(e) {
						vzgn.initTouchEvents();
						
						e.stopPropagation();
						e.preventDefault();
						
						if(!vzw_gnjq(this).parent().hasClass('active')) {
							vzgn.topNav.signInRegister.events.onOpen();
						} else {
							vzgn.topNav.signInRegister.events.onClose();
						}
					},
					onKeyDownMenu: function(e) {
						var code = e.keyCode || e.which;
						var cancelEvent = false;
						var rtnAct = {};

						if(code == 38 || code == 40) {
							rtnAct.stopActions = true;
						}
						if(vzw_gnjq('#vgn_signIn').hasClass('active')) {
							if(code == 27) {
								//escape
								gnlin_isSignInFormElClicked="N";
								vzgn.topNav.signInRegister.events.onClose();
							} else if(code == 38 || code == 40) {
								var first = vzw_gnjq('#desktopOmniNav #vgn_loginContainer :input:visible:enabled:first, #desktopOmniNav #vgn_loginContainer *[role="listbox"]:visible:first');
								if(first.length>0) {
									vzw_gnjq(first[0]).focus();
								}
							}
						} else {
							if(code == 13 || code == 32 || code == 38 || code == 40) {
								//return-space-up-down
								vzgn.topNav.signInRegister.events.onOpen();
								var first = vzw_gnjq('#desktopOmniNav #vgn_loginContainer :input:visible:enabled:first, #desktopOmniNav #vgn_loginContainer *[role="listbox"]:visible:first');
								if(first.length>0) {
									vzw_gnjq(first[0]).focus();
								}
							}
						}
						return rtnAct;
					},
					onKeyDownInput: function(e) {
						var code = e.keyCode || e.which;
						if(code == 27) {
							//escape
							vzgn.topNav.signInRegister.triggerFocusMenuParentNoOpen();
							gnlin_isSignInFormElClicked="N";
							vzgn.topNav.signInRegister.events.onClose();
						}
					},
					onChangeAccountSelect: function(){
						var selVal =  vzw_gnjq("#vgnAccSelector").val();
						var currSel = null;
						if(selVal==1){
							if(!vzw_gnjq("#vgnBSignInTitle").hasClass("vgn_hide")){
								vzw_gnjq("#vgnBSignInTitle").addClass("vgn_hide");
							}
							vzw_gnjq("#vgnVSignInTitle").removeClass("vgn_hide");
							if(!vzw_gnjq("#vgnMyBizSignInForm").hasClass("vgn_hide")){
								vzw_gnjq("#vgnMyBizSignInForm").addClass("vgn_hide");
							}
							vzw_gnjq("#vgnSignInForm").removeClass("vgn_hide");
							currSel = 'vzw';
						}else{
							if(!vzw_gnjq("#vgnVSignInTitle").hasClass("vgn_hide")){
								vzw_gnjq("#vgnVSignInTitle").addClass("vgn_hide");	
							}
							vzw_gnjq("#vgnBSignInTitle").removeClass("vgn_hide");
							if(!vzw_gnjq("#vgnSignInForm").hasClass("vgn_hide")){
								vzw_gnjq("#vgnSignInForm").addClass("vgn_hide");	
							}
							vzw_gnjq("#vgnMyBizSignInForm").removeClass("vgn_hide");
							currSel = 'mybiz';
						}
						var signInAnchor = vzw_gnjq("#desktopOmniNav #gn95");
						signInAnchor.attr( {'data-current': currSel, 'href': signInAnchor.attr('data-'+currSel)} );
						vzw_gnjq("#vgnAccSelector").focus();
					},
					onFocusUsernameInput: function(){
	    				vzw_gnjq(this).parent().addClass('focus');
					},
					onBlurUsernameInput: function(){
						vzw_gnjq(this).parent().removeClass('focus');
					},
					onTextChangeUsernameInput: function() {
						var c = 'has-text';
	    				var par = vzw_gnjq(this).parent();
	    				if(vzw_gnjq(this).val().length<=0) {
	    					par.removeClass(c);
	    				} else {
	    					par.addClass(c).removeClass('error');
	    				}
					},
					onSubmitWireless: function() {
						if(vzw_gnjq('#desktopOmniNav #IDToken1_GN').val().length<=0) {
							vzw_gnjq('#desktopOmniNav #IDToken1_GN').parent().addClass('error').children('.vgn-error-message').text('Required');
							return false;
						}
						
						vzw_gnjq("#signInSubmitButton").attr("disabled", "disabled").css("opacity", "0.5");
						return true;
					},
					onSubmitBusiness: function() {
						if(vzw_gnjq('#desktopOmniNav #IDToken1_GN_Biz').val().length<=0) {
							vzw_gnjq('#desktopOmniNav #IDToken1_GN_Biz').parent().addClass('error').children('.vgn-error-message').text('Required');
							return false;
						}

						vzw_gnjq("#mbSignInSubmitButton").attr("disabled", "disabled").css("opacity", "0.5");
						return true;
					}
				}
			}
		},
		
		searchForm: {
			init: function() {
				var _events = vzgn.searchForm.events;
				
				vzw_gnjq('#vgn_search').on('submit', _events.onSubmit).on('mouseover', _events.onMouseOver).on('mouseout', _events.onMouseOut).on('click', _events.onFocusInput);
				vzw_gnjq('#vgn_search input').on('focus', _events.onFocusInput).on('blur', _events.onBlurInput).on('propertychange change click keyup input paste', _events.onTextChangeInput);
				vzw_gnjq("#vgn_clear_btn, #vgn_clear_btn-vis").on('click', _events.onClickClear);
			},
			
			setSearchTerm: function(name) {
				var $input = vzw_gnjq("#vgn_search").find("input");
	        	if ($input != null) {
					$input.val(name);
					vzw_gnjq(".vgn-icon-close-solid-circle").attr("class","vgn-icon-close-solid");
					vzw_gnjq("#vgn_clear_btn").attr("id","vgn_clear_btn-vis");                                  
					vzw_gnjq("#vgn_clear_btn-vis").css("visibility","visible");    
					vzgn.searchForm.events.onTextChangeInput();
				}
			},
			
			events: {
			    onFocusInput: function(){
			        var form = document.vgnSearchForm;
			        if (form != null && form.q != null) {
						vzw_gnjq(form).addClass("focus");
						vzgn.hideMiniCart();
			        }
			        
			    },
			    onBlurInput: function(){
			        var form = document.vgnSearchForm;
			        if (form != null && form.q != null) {
			            vzw_gnjq(form).removeClass("focus");
			        }
			    },
			    onMouseOver: function(){
			    	var searchInput = vzw_gnjq("#vgn_q");
			        if (searchInput.length>0) {
			            searchInput.addClass("active");
			            searchInput.parent().addClass("hover");
			        }
			    },
			    onMouseOut: function(){
			        var searchInput = vzw_gnjq("#vgn_q");
			        if (searchInput.length>0) {
			            searchInput.removeClass("active");
			            searchInput.parent().removeClass("hover");
			        }
			    },
			    onTextChangeInput: function(event) {
			    	var q = vzw_gnjq('#vgn_q').val();
			    	var form = vzw_gnjq('#vgn_search');
			    	var c = 'has-text';
			    	if(q.length>0) {
			    		form.addClass(c)
			    		if(form.hasClass('error')) {
			    			form.removeClass('error').find('.vgn-error-message').html('').attr('aria-hidden','true');
			    		}
			    	} else {
			    		form.removeClass(c);
			    	}
				},
				onClickClear: function(){
					var form = document.vgnSearchForm;
		        	if (form != null && form.q != null) {
		            	form.reset()
		            	form.q.value == "";
		            	vzw_gnjq('#vgn_q').removeAttr( 'style' ).focus();
		            	vzw_gnjq("#vgn_clear_btn-vis").attr('id', 'vgn_clear_btn');
		            	vzw_gnjq("#vgn_clear_btn").css("visibility","hidden");
		            	vzw_gnjq(".vgn_ac_results").css("visibility","hidden");
		            	vzw_gnjq(".vgn-icon-close-solid").attr("class","vgn-icon-close-solid-circle");
		            	vzgn.hideTypeAhead();
		       		}
		        	return false;
				},
				onSubmit: function(){
					vzgn.gnDebug("entering onSubmit");			     
					try{
						 var form = document.vgnSearchForm;
					     if(form!=null){
					    	var isMlsSearch = false; 
					    	var searchUrl=document.vgnSearchForm.action;
							if(searchUrl != null && vzw_gnjq.trim(searchUrl).length>0){
								if (vzw_gnjq.cookie(gnlin_gnMlsCookieName) == "1" ){
									isMlsSearch=true;
								}
							   	searchUrl =vzw_gnjq.trim(searchUrl);					     	     	
								var pageUrl = document.location.href;
								if(form.q != null && form.q.value!=null && form.q.value!=''){
									var qStr = vzw_gnjq.trim(form.q.value);
									//qStr=vzgn.removeSpChar(qStr);
									if(qStr.length>0){				
										searchUrl += "?Ntt="+encodeURIComponent(qStr)+"&nav=Global&gTab="+gn_category;
										if (isMlsSearch){
											searchUrl += "&mls=1";
										}
									}else{
										if (isMlsSearch){
											searchUrl += "?mls=1";
										}
									}
									
									
									vzgn.gnDebug("searchUrl="+searchUrl);
									try{
										var inputData = {"searchTerm":"View All", "searchUrl":searchUrl, "searchText":qStr, "pageUrl":pageUrl, "category":"A"};
										//fire and forget call
										vzw_gnjq.ajax({
										    jsonp:false,
										    url: gnlin_usu+"/saveSearchSuggestion.action",
										    data: inputData,
										    dataType: 'jsonp',	
										    type: 'GET',
										    cache: false,
										    async:false,
										    timeout: 100,
										    error: saveSearchSuggestResp,
										    success: saveSearchSuggestResp,
										    jsonpCallback:"saveSearchSuggestResp"
										});
								        if (gnlin_searchTerms != null) 
	                                        {s.prop70 = gnlin_searchTerms;}
										vgn_hbLink('//global//site+search//all//'+qStr, '');
								
										setTimeout(function(){
											document.location=searchUrl;
										}, 300);	
									}catch(e){
										vzgn.gnDebug("Error in saveSearchSuggest call on searhbox");
										vgn_hbLink('//global//site+search//all//'+qStr, '');							
										document.location = searchUrl;
									}			
								}else{
									form.reset();
									vzw_gnjq('#vgn_search .vgn-error-message').html('Enter search term(s)').attr('aria-hidden','false');
									vzw_gnjq('#vgn_search').addClass('error');
									vzw_gnjq('#vgn_q').focus();
								}
							}
					     }
				    }catch(e){
						vzgn.gnDebug("Error in gnSearch ");
						 var form = document.vgnSearchForm;
					     if(form!=null){
					    	 var searchUrl=document.vgnSearchForm.action;
							 if(searchUrl != null && vzw_gnjq.trim(searchUrl).length>0){
					    		vgn_hbLink('//global//site+search//all//', '');
								document.location = searchUrl+"?Ntt=";
							}				    	
					     }					
					}
			   		vzgn.gnDebug("leaving gnSearch");
			   		
			   		return false;
				}
			}
		},
		modal: {
			open: function(config){
				try{
					document.body.style.cursor = "progress";
					var maskingHtml = "<div id='vgn_overlay_bg'>&nbsp;</div>";
					var html= '<div id="vgn_overlay" role="'+config.ariaTxt+'">'+
								'<table role="'+config.ariaTxt+'" cellspacing="0" cellpadding="0"><tr><td>'+
									'<div class="vgn_overlay_wrapper">'+
										'<div id="vgn_overlay_body">'+
											'<h2 id="vgn_otitle" class="vgn_otitle">'+config.title+'</h2>'+
											config.html+
										'</div>'+
										'<a id="vgno_close" class="vgn-icon-close" role="link" title="Close" tabindex="1" aria-label="Close"><span aria-hidden="true">&#57442;</span></a>'+
									'</a>'+
									'</div>'+
								'</td></tr></table>'+
							'</div>';
					vzw_gnjq("body").append(html);
					if(typeof config.onBeforeOpen != 'undefined'){
						config.onBeforeOpen();
					}
					vzw_gnjq("body").append(maskingHtml);				
					vzw_gnjq("#vgn_overlay").show();
					if(typeof config.onAfterOpen != 'undefined'){
						config.onAfterOpen();
					}
					vzw_gnjq('#vgn_overlay #vgno_close').on('click', vzgn.modal.close).on('keydown', vzgn.modal.events.onKeyDownClose);
					vzw_gnjq('#vgn_overlay').on('keydown', vzgn.modal.events.onKeyDownModal);
					document.body.style.cursor = "default";
				} catch (e) {
					//dont do anything let it go		
				}	
			},
			close: function(){
				try{
					vzw_gnjq("#vgn_overlay").hide().remove();
					vzw_gnjq("#vgn_overlay_bg").hide().remove();
				}catch(e){
					//dont do anything let it go	
				}
			},
			
			events: {
				onKeyDownClose: function(e) {
					var code = e.keyCode || e.which;
					
					var par = vzw_gnjq(this).parent();
					if(code == 13 || code == 32) {
						//return-space
						vzgn.modal.close();
						if(code == 32) {
							return false;
						}
					}
				},
				onKeyDownModal: function(e) {
					var code = e.keyCode || e.which;
					if(code == 27) {
						//escape
						vzgn.modal.close();
					}
				}
			},
			
			signInRegister: {
				open: function(gotoUrl) {
					//If remember username, skip the signin modal and go directly the login page.
					try{
						if((typeof rememberedUserName!= 'undefined') && (rememberedUserName.length > 0)) {
							if (!(typeof loggedInURL  != 'undefined' && loggedInURL != null && loggedInURL.length>0)){        		
				        		//defaulting it to production signin url
				        		loggedInURL = "https://login.verizonwireless.com/amserver/UI/Login"
				        	}
				        	
							var signInFormHtml = 
								'<div style="display:none">'+
									'<form id="gnOOAMSignInForm" method="post" action="'+ loggedInURL +'" autocomplete="off">'+
										'<input type="hidden" name="goto" value="'+ gotoUrl +'"/>'+
										'<input type="hidden" name="realm" value="vzw"/>'+
										'<input type="hidden" name="gx_charset" value="UTF-8"/>'+
										'<input type="hidden" name="rememberUserNameCheckBoxExists" value="Y"/>'+
										'<input type="hidden" name="userNameOnly" id="userNameOnly" value="true" />'+
										'<input type="text" value="'+ rememberedUserName +'" name="IDToken1" />'+
										'<input type="hidden" value="Y" name="rememberUserName" />'+
									'</form>'+
								'</div>';
							
							vzw_gnjq("body").append(signInFormHtml);
							vzw_gnjq('#gnOOAMSignInForm').submit();
							return;
						 }
					}catch(e){}
					
					vzgn.setGNGotoUrl(gotoUrl);
					vzgn.modal.signInRegister.actions.show();	 
					return false;
				},
				
				actions: {
					show:function(){
						var _actions = vzgn.modal.signInRegister.actions;
						try{
							if (!((vzw_gnjq.cookie("amID")!=null && vzw_gnjq.trim(vzw_gnjq.cookie("amID")).length>0) || 
								  (vzw_gnjq.cookie(gnlin_loggedinCookieName)!=null && vzw_gnjq.cookie(gnlin_loggedinCookieName)=="true"))){
								if(typeof vzgn_silinks != 'undefined'){			
									var config = {"title":'My Verizon',
												  "width":"700",
												  "ariaTxt":"signindialog",
												  "html":_actions.getHtml(),
												  "onBeforeOpen":_actions.onBeforeShow,
												  "onAfterOpen":_actions.onAfterShow
									};
									vzgn.modal.open(config);						
								}else{
									gnlin_gnOLoadCtr++;
									if(gnlin_gnOLoadCtr>10){			
										return;
									}
									setTimeout("vzgn.modal.signInRegister.actions.show()", 1000);
								}
							}else{
								if(typeof gotoUrl != 'undefined'){
									document.location.href=vzgn.gnGotoUrl;
								}
							}	
						}catch(e){
							vzgn.gnDebug("Error in vzgn.modal.signInRegister.actions.show");
						}
					},
					onBeforeShow: function(){
						if (typeof multiAccount != 'undefined' && multiAccount != null && multiAccount == 'true') {
			            	vzw_gnjq("#vgnOAccSelector").removeClass("vgn_hide").prev().removeClass("vgn_hide").prev().removeClass("vgn_hide");
			            }
			            
			            if (typeof rememberUserDisplay != 'undefined' && rememberUserDisplay != null && rememberUserDisplay == '1') {
			            	vzw_gnjq("#vgn_remOUIDSec").removeClass("vgn_hide");            	
			            }
			            if((typeof rememberedUserName!= 'undefined') && (rememberedUserName.length > 0)) {
			            	vzw_gnjq("#rememberUNameExistsOGN, #rememberUserNameGN_OL").val("Y");
			            	vzw_gnjq("#rememberUserNameGN_OL").get(0).checked=true;
			            	vzw_gnjq("#IDToken1_OL").val(rememberedUserName).trigger('change');
			            }else{
			            	vzw_gnjq("#rememberUNameExistsOGN, #rememberUserNameGN_OL").val("N");
			            	vzw_gnjq("#rememberUserNameGN_OL").get(0).checked=false;
			            }           
			            
			            if (vzgn.isMyBizMenu) {
				    		vzw_gnjq('#vgnOAccSelector').val("2").trigger('change');
				    	}            
					},
					onAfterShow: function(){
						if((typeof rememberedUserName!= 'undefined') && (rememberedUserName.length > 0)) {
							vzw_gnjq("#IDToken1_OL:visible").trigger("click").focus().select();
						} else {
							vzw_gnjq("#vgno_close").focus();				
						}
						
						var _events = vzgn.modal.signInRegister.events;
						//Bind events
						vzw_gnjq('#vgnSignInOSec #IDToken1_OL, #vgnSignInOSec #IDToken1_OL_Biz').on('focus', _events.onFocusUsernameInput).on('blur', _events.onBlurUsernameInput).on('propertychange change click keyup input paste', _events.onTextChangeUsernameInput);
						vzw_gnjq('#vgnSignInOSec #rememberUserNameGN_OL').gn_checkbox().on('change', function() { vzgn.onClickRememberUName(this); });
						vzw_gnjq('#vgnSignInOSec .gn_tooltip').gn_tooltip();
						if(vzw_gnjq('#vgnSignInOSec #vgnOAccSelector:not(.vgn_hide)').length>0) {
							vzw_gnjq('#vgnSignInOSec #vgnOAccSelector').on('change', _events.onChangeAccountSelect).gn_select();
						}
						vzw_gnjq('#vgnSignInOSec #vgn_signInOBRegister, #vgnSignInOSec #vgn_signInOPRegister').on('blur', _events.onBlurLastInput);
						vzw_gnjq('#vgnSignInOSec #vgnSignInOForm').on('submit', _events.onSubmitWireless);
						vzw_gnjq('#vgnSignInOSec #vgnSignInOBForm').on('submit', _events.onSubmitBusiness);
					},
					getHtml: function(){
						var vgnCustomMsg = "";
						if(gnlin_signInOMsg!=null){
							vgnCustomMsg = '<div id="vgnSignInTitle" class="vgn_title">'+
											gnlin_signInOMsg+
										   '</div>';
						}
						
						var lbtn='<button tabIndex="6" role="button" id="signInOGN" type="submit" onclick="vzgn.destroyMyBizCookie();" class="vgn_margintb15 vgnSignInBtn vgnBtn">Sign In</button>';
						if(gnlin_singInOSpec!=null){
							if((typeof gnlin_singInOSpec.LButLabel != 'undefined' && gnlin_singInOSpec.LButLabel!=null && vzw_gnjq.trim(gnlin_singInOSpec.LButLabel).length>0) &&
								(typeof gnlin_singInOSpec.LButURL != 'undefined' && gnlin_singInOSpec.LButURL!=null && vzw_gnjq.trim(gnlin_singInOSpec.LButURL).length>0)){
								lbtn='<button tabIndex="6" id="signInOGN" role="button" type="submit" onclick="vzgn.setSiOGoto(\''+
										gnlin_singInOSpec.LButURL+
										'\');" class="vgnSignInBtn vgnBtn vgn_margintb15">'+gnlin_singInOSpec.LButLabel+'</button>';
							}
							
							if((typeof gnlin_singInOSpec.RButLabel != 'undefined' && gnlin_singInOSpec.RButLabel!=null && vzw_gnjq.trim(gnlin_singInOSpec.RButLabel).length>0) &&
								(typeof gnlin_singInOSpec.RButURL != 'undefined' && gnlin_singInOSpec.RButURL!=null && vzw_gnjq.trim(gnlin_singInOSpec.RButURL).length>0)){
								lbtn+='<button tabIndex="7" id="signInOGN2" role="button" type="submit" class="vgn_marginl10 vgnSignInBtn vgnBtn vgn_margintb15" onclick="vzgn.setSiOGoto(\''+
										gnlin_singInOSpec.RButURL+
										'\');">'+gnlin_singInOSpec.RButLabel+'</button>';
							}
						}
						
						return '<div id="vgnSignInOSec">'+
						vgnCustomMsg+
						'<div class="vgn_signin_OBodySec">'+
							'<div class="vgn_signin_lsec">'+
								'<div class="vgn_title">Sign In</div>'+
								'<select tabIndex="2" id="vgnOAccSelector" class="vgn_AccSelector vgn_hide">'+
									'<option selected="selected" value="1">My personal account</option>'+
									'<option value="2">My business account</option>'+
								'</select>'+
								'<form autocomplete="off" action="'+loggedInURL +'" method="post" id="vgnSignInOForm">'+
									'<input type="hidden" value="'+vzgn.gnGotoUrl+'" id="gotoOID" name="goto">'+
									'<input type="hidden" value="vzw" id="realmOID" name="realm">'+
									'<input type="hidden" value="UTF-8" id="gx_Ocharset" name="gx_charset">'+	
									'<input type="hidden" name="userNameOnly" id="oUserNameOnly" value="true" />'+
									'<input id="rememberUNameExistsOGN" type="hidden" value="N" name="rememberUserNameCheckBoxExists">'+
									'<label for="IDToken1_OL" class="vgn_userIdLabel vgn_screen-reader-text">Phone # or Username</label>'+
									'<div class="vgn_username">'+
										'<div class="vgn_placeholder">Phone # or Username</div>'+
										'<input tabIndex="3" type="text" class="vgn_textBox" autocomplete="off" maxlength="60" name="IDToken1" value="" id="IDToken1_OL">'+
									    '<span class="vgn-icon-error" aria-hidden="true">&#57389;</span>'+
									    '<div class="vgn-error-message" aria-hidden="true"></div>'+
									'</div>'+
									'<div id="vgn_remOUIDSec" class="cf vgn_hide">'+
										'<input tabIndex="4" type="checkbox" onclick="vzgn.onClickRememberUName(this)" id="rememberUserNameGN_OL" value="N" name="rememberUserName" class="vgn_checkbox" aria-labelledby="rememberUserNameGN_OL_Label"/>'+							
										'<label for="rememberUserNameGN_OL" class="vgn_remUID" id="rememberUserNameGN_OL_Label"> Remember Me</label>'+
										'<a tabIndex="5" class="gn_tooltip" href="javascript:void(null);">'+
											'"Remember Me" stores your User ID on this computer. You should not use this feature on public computers (such as those in a library or internet caf&eacute;).'+
										'</a>'+
									'</div>'+
									lbtn+
									'<p class="vgn_forgot">Forgot '+
										'<a tabIndex="7" role="link" id="vgn_signInOfUid" onclick="vgn_hbLink(\'forgot user id\');" href="'+vzgn_silinks.vzw.forgotUid+'">User ID</a>'+
										' or '+
										'<a tabIndex="8" role="link" id="vgn_signInOfPwd" onclick="vgn_hbLink(\'forgot password\');" href="'+vzgn_silinks.vzw.forgotPwd+'">Password</a>'+
									'</p>'+
								'</form>'+
								'<form autocomplete="off" class="vgn_hide" action="'+vzgn_silinks.vzwmybiz.loginUrl+'" method="post" id="vgnSignInOBForm">'+
									'<input id="vgn_biz_goto" type="hidden" name="goto" value="'+vzgn_silinks.vzwmybiz.gotoUrl+'">'+
									'<input id="vgn_biz_realm" type="hidden" name="realm" value="vzwmb">'+						
									'<input id="vgn_biz_rememberUNameExists" type="hidden" name="rememberUserNameCheckBoxExists" value="N">'+						
									'<input id="vgn_biz_appGroup" type="hidden" name="appGroup" value="IDM">'+
									'<input id="vgn_biz_ignoreReferer" type="hidden" name="ignoreReferer" value="true">'+
									'<input id="vgn_biz_module" type="hidden" name="module" value="VZWLdap">'+
									'<input id="vgn_biz_rememberMBUserName" type="hidden" name="rememberMBUserName" value="N">'+						
									'<div style="float:left;font-weight:bold;" class="vgn_hide">Sign in to:</div>'+
									'<label for="IDToken1_OL_Biz" class="vgn_userIdLabel_biz vgn_padt10 vgn_screen-reader-text">Username</label>'+
									'<div class="vgn_username">'+
										'<div class="vgn_placeholder">Username</div>'+
										'<input type="text" tabIndex="3" class="vgn_textBox" autocomplete="off" maxlength="60" size="25" name="userId" value="" id="IDToken1_OL_Biz">'+
									    '<span class="vgn-icon-error" aria-hidden="true">&#57389;</span>'+
									    '<div class="vgn-error-message" aria-hidden="true"></div>'+
									'</div>'+
									'<button tabIndex="4" role="button" id="signInOBGN" type="submit" onclick="vzgn.createMyBizCookie();" class="vgnSignInBtn vgnBtn vgn_margintb10">Sign In</button>'+
									'<p class="vgn_forgot">Forgot '+
										'<a tabIndex="5" role="link" id="vgn_signInOfUid_biz" onclick="vgn_hbLink(\'forgot user id\');" href="'+vzgn_silinks.vzwmybiz.forgotUid+'">Username</a>'+
									'</p>'+
								'</form>'+
							'</div>'+
							'<div class="vgn_signin_rsec" id="vgnOVzwReg">'+
								'<div class="vgn_title_register">Register</div>'+
								'<div class="vgn_register_desc">'+
									'With My Verizon, you get the convenience of managing your account online including these great benefits:'+
									'<ul class="vgn_signInFeatUl">'+
										'<li class="vgn_signInFeatLi">View your usage</li>'+
										'<li class="vgn_signInFeatLi">Make payments</li>'+
										'<li class="vgn_signInFeatLi">Change or reset your Voice Mail password</li>'+
										'<li class="vgn_signInFeatLi">Access My Verizon on your mobile phone</li>'+
									'</ul>'+
								'</div>'+
								'<button tabIndex="9" role="button" onclick="vgn_hbLink(\'register\');vzgn.gotoPage(\''+vzgn_silinks.vzw.register+vzgn.gnGotoUrl+'\');" id="vgn_signInOPRegister" class="vgnSignInBtn vgnBtn">Register</button>'+
							'</div>'+
							'<div class="vgn_signin_rsec vgn_hide" id="vgnOMybizReg">'+
								'<div class="vgn_title_register">Register</div>'+
								'<div class="vgn_register_desc">'+
										'With My Business Account, you get the convenience of managing your account online including these great benefits:'+
										'<ul class="vgn_signInFeatUl">'+
											'<li class="vgn_signInFeatLi">Pay bills and setup payment options</li>'+
											'<li class="vgn_signInFeatLi">Retrieve account data and place orders on your own schedule</li>'+
											'<li class="vgn_signInFeatLi">Request and manage products, services & phone repairs</li>'+
											'<li class="vgn_signInFeatLi">Eligible businesses can access all Wireless accounts</li>'+
										'</ul>'+
									'</div>'+
									'<a tabIndex="6" role="link" id="vgn_signInBLearnMore" onclick="vgn_hbLink(\'learn more\');" href="'+vzgn_silinks.vzwmybiz.learnMore+'">Learn More</a>'+
									'<button tabIndex="7" role="button" onclick="vgn_hbLink(\'register\');vzgn.gotoPage(\''+vzgn_silinks.vzwmybiz.register+'\');" id="vgn_signInOBRegister" class="vgnSignInBtn vgnBtn">Register</button>'+					
							'</div>'+				
						'</div>'+
					'</div>';
					}
				},
				
				events: {
					onFocusUsernameInput: function(){
	    				vzw_gnjq(this).parent().addClass('focus');
					},
					onBlurUsernameInput: function(){
						vzw_gnjq(this).parent().removeClass('focus');
					},
					onTextChangeUsernameInput: function() {
						var c = 'has-text';
	    				var par = vzw_gnjq(this).parent();
	    				if(vzw_gnjq(this).val().length<=0) {
	    					par.removeClass(c);
	    				} else {
	    					par.addClass(c).removeClass('error');
	    				}
					},
					onChangeAccountSelect: function(){
						var thisEl = vzw_gnjq(this);
						var selVal = thisEl.val();
						var selTxt = thisEl.find("option:selected").text();
						var myVzRegEl = vzw_gnjq("#vgnOVzwReg");
						var myVzFormEl = vzw_gnjq("#vgnSignInOForm");
						var myBizFormEl = vzw_gnjq("#vgnSignInOBForm");
						var myBizRegEl = vzw_gnjq("#vgnOMybizReg")
						vzw_gnjq("#vgnOAccSelector").val(selVal);
						if(selVal==1){	
							if((myBizFormEl.length>0) && (!myBizFormEl.hasClass("vgn_hide"))){
								myBizFormEl.addClass("vgn_hide");
							}
							if((myBizRegEl.length>0) && (!myBizRegEl.hasClass("vgn_hide"))){
								myBizRegEl.addClass("vgn_hide");
							}
							myVzFormEl.removeClass("vgn_hide");
							myVzRegEl.removeClass("vgn_hide");
							vzw_gnjq("#vgnOAccSelector").focus();
						}else{
							if((myVzFormEl.length>0) && (!myVzFormEl.hasClass("vgn_hide"))){
								myVzFormEl.addClass("vgn_hide");
							}
							if((myVzRegEl.length>0) && (!myVzRegEl.hasClass("vgn_hide"))){
								myVzRegEl.addClass("vgn_hide");
							}
							myBizFormEl.removeClass("vgn_hide");
							myBizRegEl.removeClass("vgn_hide");
							vzw_gnjq("#vgnOAccSelector").focus();
						}			
						
					},
					onBlurLastInput: function(){
						vzw_gnjq("#vgno_close").focus();
					},
					onSubmitWireless: function() {
						if(vzw_gnjq('#vgnSignInOSec #IDToken1_OL').val().length<=0) {
							vzw_gnjq('#vgnSignInOSec #IDToken1_OL').parent().addClass('error').children('.vgn-error-message').text('Required');
							return false;
						}
						
						vzw_gnjq("#vgnSignInOSec #signInOGN").attr("disabled", "disabled").css("opacity", "0.5");
						return true;
					},
					onSubmitBusiness: function() {
						if(vzw_gnjq('#vgnSignInOSec #IDToken1_OL_Biz').val().length<=0) {
							vzw_gnjq('#vgnSignInOSec #IDToken1_OL_Biz').parent().addClass('error').children('.vgn-error-message').text('Required');
							return false;
						}

						vzw_gnjq("#vgnSignInOSec #signInOBGN").attr("disabled", "disabled").css("opacity", "0.5");
						return true;
					}
				}
			}
		},
		
		gnSetSearchTerm: function(name) {
			vzgn.searchForm.setSearchTerm(name);
		},
		gnClearSearch: function() {
			return vzgn.searchForm.events.onClickClear();
		},
		renderSignInPopup: function(gotoUrl){
			vzgn.modal.signInRegister.open(gotoUrl);
		}
	}
	
	
	 //Version: '1.0.23' motionpoint start
	 
	var MP = {
			<!-- mp_trans_disable_start --> 
			  Version: '1.0.23',
			  Domains: {'es':'es.verizonwireless.com'},	
			  SrcLang: 'en',
			<!-- mp_trans_disable_end -->
			  UrlLang: 'mp_js_current_lang',
			  SrcUrl: decodeURIComponent('mp_js_orgin_url'),
			<!-- mp_trans_disable_start --> 	
			  init: function(){
			    if (MP.UrlLang.indexOf('p_js_')==1) {
			      MP.SrcUrl=location.href;
			      MP.UrlLang=MP.SrcLang;
			  }
			},
			getCookie: function(name){
			  var start=document.cookie.indexOf(name+'=');
			  if(start < 0) return null;
			  start=start+name.length+1;
			  var end=document.cookie.indexOf(';', start);
			  if(end < 0) end=document.cookie.length;
			  while (document.cookie.charAt(start)==' '){ start++; }
			  return decodeURIComponent(document.cookie.substring(start,end));
			},
			setCookie: function(name,value,path,domain){
			  var cookie=name+'='+encodeURIComponent(value);
			  if(path)cookie+='; path='+path;
			  if(domain)cookie+='; domain='+domain;
			  var now=new Date();
			  now.setTime(now.getTime()+1000*60*60*24*365);
			  cookie+='; expires='+now.toUTCString();
			  document.cookie=cookie;
			},
			switchLanguage: function(lang){
			  if(lang!=MP.SrcLang){
			    var script=document.createElement('SCRIPT');
			    script.src=location.protocol+'//'+MP.Domains[lang]+'/'+MP.SrcLang+lang+'/?1023749632;'+encodeURIComponent(MP.SrcUrl);
				document.body.appendChild(script);
			  } else if(lang==MP.SrcLang && MP.UrlLang!=MP.SrcLang){
			    var script=document.createElement('SCRIPT');
			    script.src=location.protocol+'//'+MP.Domains[MP.UrlLang]+'/'+MP.SrcLang+MP.UrlLang+'/?1023749634;'+encodeURIComponent(location.href);
				document.body.appendChild(script);
			  }
			  return false;
			},
			switchToLang: function(url) {
			  location.href=url; 
			}
			<!-- mp_trans_disable_end -->   
	};

	var vzgn_msoList = {
		comcast:{
			logoTitle:'Verizon Wireless - XFINITY',
			linkBackTitle:'Return to Xfinity',
			linkBackUrl:'http://www.comcast.com/wireless'
		}
	}
  //Version: '1.0.23' motionpoint end
	
	//START OF SEARCH FOR GLOBALNAV
	var vzgn_searchConf={
		gnusuURL:"https://billpaysvc.verizonwireless.com/vzwsvc/usc",
		gnscuURL:"https://scache.vzw.com/globalnav/prod",
		gnSearchURL:null,
		gntypah:gnlin_gntypah,
		searchDelay:'300',
		searchDisable:false,
		searchSuggestSaveDisable:false,	
		load:function(){
			try{
				var lzLoadEl = document.createElement('script'); 
				lzLoadEl.type = 'text/javascript'; 
				lzLoadEl.async = true;
				lzLoadEl.src = vzgn_searchConf.gnscuURL+"/../scripts/gn_addons.js";
				var scriptEl = document.getElementsByTagName('script')[0]; 
				scriptEl.parentNode.insertBefore(lzLoadEl, scriptEl);
			}catch(e){}

			try{
				var lzLoadEl = document.createElement('script'); 
				lzLoadEl.type = 'text/javascript'; 
				lzLoadEl.async = true;
				 lzLoadEl.src = vzgn_searchConf.gnscuURL+"/../../search/staticContent/dist/js/desktop-autosuggest.js";
				var scriptEl = document.getElementsByTagName('script')[0]; 
				scriptEl.parentNode.insertBefore(lzLoadEl, scriptEl);
			}catch(e){}
		}	
	};
	
	vzgn_r ={
		  onclickRSec: function(){
		  	if (vzgn_r.vgnRSecOnClick != null) {
		  	    vzgn_r.vgnRSecOnClick();
		  	}
		  },
		  setDeviceInfo: function(labelHtml, onClickCBFn){  	
		  	vzw_gnjq("#vgn_rnav_info").html(labelHtml);
		  	if(typeof onClickCBFn != "undefined"){
		  		vzgn_r.vgnRSecOnClick = onClickCBFn;
		  	}  	
		  },
		  getGNHtml:function(){
		    	return '<a id="vgn_rnav_info" href="#" onclick="vzgn_r.onclickRSec();"></a>';
		  },
		  vgnRSecOnClick: null
		};

	//END OF SEARCH FOR GLOBALNAV
	
	var vzgn_storageCartRetrival={
		init: function(){
			try{
				var cartItemsJSON = localStorage.getItem("commerceJSON");
				var cartItemsDate = localStorage.getItem("commerceJSONDate");
				var sessionConfCookie = vzw_gnjq.cookie("vsi");
				var persistCookie = vzw_gnjq.cookie("persistCart");
					var removePerCart = vzw_gnjq.cookie("removePerCart");
				var cartValidity = this.calculateCartStorageDiff(new Date(cartItemsDate), new Date());
				if ((cartItemsDate != null && cartValidity >= 29) || removePerCart == "true"){ 
					localStorage.removeItem("commerceJSON");
					localStorage.removeItem("commerceJSONDate");
					if(removePerCart == "true"){
						vzw_gnjq.cookie('removePerCart', '', { path: '/', expires:-1 });
					}
					return;
				}
				if(cartItemsJSON != null && cartItemsJSON != "undefined"){
				 	var cartJSON = JSON.parse(cartItemsJSON);
					var cartVal = cartJSON["accessoriesqty"] +  cartJSON["devicesqty"];
					if(persistCookie != "true" && persistCookie == null){
						if(sessionConfCookie == undefined){
							if(cartVal != null && cartVal != undefined ){
								this.updateCartCountFromStorage(cartVal);
								vzw_gnjq("#vgn_shcart a").off("click").on("click",function(event){
									event.stopPropagation();
									vzgn_storageCartRetrival.prepareCartFromStorage(cartItemsJSON);
								});
							}	
						}
						else{
							if(cartVal != null && cartVal != undefined ){
								vzgn_storageCartRetrival.prepareCartFromStorage(cartItemsJSON);
								this.updateCartCountFromStorage(cartVal);
							}
						}
						
					}
					else{
						this.updateCartCountFromStorage(cartVal);
						this.createStorageFromCart();
					}
				}
				else{
					if(sessionConfCookie){
						this.createStorageFromCart();
					}
					vzw_gnjq.cookie("persistCart", true, { path: "/" });
				}
			}catch(e){
					vzgn.gnDebug("Error in vzgn_storageCartRetrival.init"); 	
			}
		},
		prepareCartFromStorage: function(cartItemsJSON){ 
			try{
				if(cartItemsJSON != null && cartItemsJSON != "undefined"){ 
					var localStorageCartData = {
						commerceItems: cartItemsJSON
					};
					vzw_gnjq.ajax({
								url: '/vzw/baseajaxservlet?ajaxName=addLocalStorageCartItems',
								type: "POST",
								data: localStorageCartData,
								async:false,
								dataType: 'JSON'					
					});
					vzw_gnjq.cookie("persistCart", true, { path: "/" });
				}
			}catch(e){
					vzgn.gnDebug("Error in vzgn_storageCartRetrival.prepareCartFromStorage"); 	
			}
		},
		createStorageFromCart: function(){
			var creationDate = new Date();
			try{
				if(cartItemsJSON.commerceJSON){
					localStorage.setItem("commerceJSON", cartItemsJSON.commerceJSON);
					localStorage.setItem("commerceJSONDate", creationDate);
				}
			}
			catch(e){
				vzgn.gnDebug("Error in vzgn_storageCartRetrival.createStorageFromCart"); 	
			}
		},
		createStorageFromConfigurator: function(){
			var creationDate = new Date();
			try{
				var ajaxOpts = {
					type : 'GET',
					url : '/vzw/cart/gadgets/cartItemsToJson.jsp',
					dataType : 'json',
					success: function(data) {
						if(data.commerceJSON){
							localStorage.setItem("commerceJSON", data.commerceJSON);
							localStorage.setItem("commerceJSONDate", creationDate);
						}
						else{
							vzgn.gnDebug("Cart is empty");
						}
					},
					error: function(){
						vzgn.gnDebug("Cart is empty");
					}
				};
				vzw_gnjq.ajax(ajaxOpts);
			}
			catch(e){
				vzgn.gnDebug("Error in vzgn_storageCartRetrival.createStorageFromCart"); 	
			}
		},
		updateCartCountFromStorage: function(cartVal){ 
			var vzGnCartCount = vzw_gnjq.cookie("gnCartCount");
			if(vzGnCartCount == null || vzGnCartCount == undefined){
				if(vzw_gnjq('#vgn_shcart a')[0]){
					try {
						vzw_gnjq('#vgn_shcart a').append('<span class="highlightCount sprite-icon_cartHighlight"></span>');
						vzw_gnjq('#vgn_shcart a .highlightCount').text(cartVal);
							
					} catch(e){
						vzgn.gnDebug("Error in vzgn_storageCartRetrival.updateCartCountFromStorage"); 	
					}
				}else {
					vzgn_storageCartRetrival.updateCartCountFromStorage(cartVal);
				}
			}				
		},
		calculateCartStorageDiff: function(cartDate,currentDate){
			try{
				var _MS_PER_DAY = 1000 * 60 * 60 * 24;
				var utc1 = Date.UTC(cartDate.getFullYear(), cartDate.getMonth(), cartDate.getDate());
				var utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
				return Math.floor((utc2 - utc1) / _MS_PER_DAY);
			}catch(e){
				vzgn.gnDebug("Error in vzgn_storageCartRetrival.calculateCartStorageDiff"); 	
			}	
		}
	};
