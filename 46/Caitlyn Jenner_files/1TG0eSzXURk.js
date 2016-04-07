/*!CK:3169474719!*//*1459876903,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["wB8Rd"]); }

__d('SearchableTextInput.react',['EventListener','React','AbstractTextInput.react','getActiveElement'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=c('React').PropTypes,i=c('React').createClass({displayName:'SearchableTextInput',propTypes:babelHelpers['extends']({},c('AbstractTextInput.react').propTypes,{queryString:h.string,searchSource:h.object,searchSourceOptions:h.object,onEntriesFound:h.func.isRequired,searchOnFocus:h.bool,searchOnUpdate:h.bool,required:h.bool,onPaste:h.func,onFocus:h.func,onChange:h.func}),componentDidMount:function(){if(this.props.onPaste)this._listener=c('EventListener').listen(this.refs.input.getTextFieldDOM(),'paste',this.props.onPaste);},componentWillReceiveProps:function(j){},componentDidUpdate:function(j){if(this.props.searchOnUpdate)if(j.queryString!==this.props.queryString)this.search(this.props.queryString);},componentWillUnmount:function(){if(this._listener){this._listener.remove();this._listener=null;}},_onInputFocus:function(){this.props.searchSource.bootstrap(function(){if(this.props.searchOnFocus)this.search(this.props.queryString);}.bind(this));this.props.onFocus&&this.props.onFocus();},_onSearchCallback:function(j,k,l){if(this.props.queryString===k)this.props.onEntriesFound(j,k,l);},_onChange:function(event){this.props.onChange&&this.props.onChange(event);var j=event.target.value;setTimeout(function(){return this.search(j);}.bind(this));},search:function(j){this.props.searchSource.search(j,this._onSearchCallback,this.props.searchSourceOptions);},focusInput:function(){var j=this.getTextFieldDOM();if(c('getActiveElement')()===j){this._onInputFocus();}else j.offsetHeight&&j.focus();},blurInput:function(){var j=this.getTextFieldDOM();j.offsetHeight&&j.blur();},getTextFieldDOM:function(){return this.refs.input.getTextFieldDOM();},render:function(){var j=this.props.queryString||'';return (c('React').createElement(c('AbstractTextInput.react'),babelHelpers['extends']({},this.props,{onChange:this._onChange,onFocus:this._onInputFocus,ref:'input',role:'combobox',value:j})));}});f.exports=i;},null);
__d('TypeaheadView.react',['cx','React'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').PropTypes,j=c('React').createClass({displayName:'TypeaheadView',propTypes:{entries:i.array.isRequired,extraRendererProps:i.object,highlightedEntry:i.object,isVisible:i.bool,queryString:i.string,Renderer:i.func,selectedEntry:i.object},_onSelect:function(k,l){if(this.props.onSelect)this.props.onSelect(k,l);},_onHighlight:function(k){this.props.onHighlight(k);},render:function(){var k=this.props,l=k.extraRendererProps,m=k.isVisible,n=k.Renderer,o=babelHelpers.objectWithoutProperties(k,['extraRendererProps','isVisible','Renderer']);return (c('React').createElement('div',{className:!m?"hidden_elem":''},n?c('React').createElement(n,babelHelpers['extends']({},o,l)):null));}});f.exports=j;},null);
__d('AbstractTypeahead.react',['cx','AbstractTextField.react','ContextualLayer.react','InputSelection','React','ReactLayeredComponentMixin','SearchableTextInput.react','SearchSourceQueryStatus','TypeaheadNavigation','TypeaheadView.react','getOrCreateDOMID','joinClasses','uniqueID'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').PropTypes,j=[],k=10,l=c('React').createClass({displayName:'AbstractTypeahead',mixins:[c('ReactLayeredComponentMixin')],propTypes:babelHelpers['extends']({},c('AbstractTextField.react').propTypes,{additionalElements:i.node,inputClassName:i.string,inputID:i.string,inputStyle:i.object,autoCapitalize:i.string,autoComplete:i.string,autoCorrect:i.string,queryString:i.string,searchSource:i.object.isRequired,searchSourceOptions:i.object,excludedEntries:i.object,presenter:i.object.isRequired,onSelectAttempt:i.func,onEntriesFound:i.func,onNoEntriesFound:i.func,onEnterWithoutSelection:i.func,autoHighlight:i.bool,showEntriesOnFocus:i.bool,selectOnBlur:i.bool,selectOnTab:i.bool,focusedOnInit:i.bool,hideViewWithEntries:i.bool,disabled:i.bool,entriesWidthMatchContext:i.bool,selectedEntry:i.object,onTypeaheadVisibilityChanged:i.func,onPaste:i.func,navigation:i.object}),getDefaultProps:function(){return {autoComplete:'off',autoCorrect:'off',selectOnBlur:false,selectOnTab:true,hideViewWithEntries:true,entriesWidthMatchContext:true,navigation:c('TypeaheadNavigation')};},getInitialState:function(){return {highlightedEntry:null,isArrowNavigation:false,isAutoHighlight:this.props.autoHighlight,ariaActiveDescendantID:null,ariaOwneeID:c('uniqueID')(),activeEntries:null,focused:!!this.props.focusedOnInit,viewIsVisible:!!this.props.focusedOnInit};},_onRenderHighlight:function(m){var n=c('getOrCreateDOMID')(m);this.setState({ariaActiveDescendantID:n});},_determineViewVisibility:function(m,n){if(!m)return false;var o=m.length>0&&(this.props.showEntriesOnFocus||this.props.queryString.length>0);return !!(n&&(this.props.presenter.alwaysVisibleOnFocus||o));},_onEntriesFound:function(m,n,o){if(!this.isMounted())return;if(this.props.excludedEntries){var p=this.props.excludedEntries;m=m.filter(function(x){return !p.hasOwnProperty(x.getUniqueID());});}var q=this.props.presenter,r=typeof q.sortEntries=='function'?q.sortEntries(m,this.state.activeEntries,this.props.queryString):m,s=r.slice(0,q.maxEntries||k),t=this._determineViewVisibility(s,this.state.focused);if(!s.length){this.setState({ariaActiveDescendantID:null,activeEntries:s,highlightedEntry:null,isAutoHighlight:this.props.autoHighlight});this._setViewIsVisible(t);if(this.props.onNoEntriesFound&&o===c('SearchSourceQueryStatus').COMPLETE)this.props.onNoEntriesFound();return;}if(this.props.onEntriesFound)this.props.onEntriesFound(s,o);var u=this.state.highlightedEntry,v=u&&s.indexOf(u)!==-1;if(!this.props.autoHighlight){this.setState({activeEntries:s,highlightedEntry:v?u:null});if(t)this._setViewIsVisible(true);return;}var w=this.state.isAutoHighlight;if(w){u=s[0];}else{u=v?u:s[0];w=!v;}this.setState({activeEntries:s,highlightedEntry:u,isAutoHighlight:w});if(t)this._setViewIsVisible(true);},_onInputFocus:function(){var m=this._determineViewVisibility(this.state.activeEntries,true);if(m)this._setViewIsVisible(true);this.setState({focused:true});this.props.onFocus&&this.props.onFocus();},_onInputBlur:function(){if(this.props.hideViewWithEntries)this._close();if(this.props.selectOnBlur&&this.state.highlightedEntry)this.props.onSelectAttempt(this.state.highlightedEntry);this.setState({focused:false});this.props.onBlur&&this.props.onBlur();},_onInputClick:function(m){var n=this.getTextFieldDOM(),o=c('InputSelection').get(n);if(o&&o.start==o.end)n.select();this.props.onClick&&this.props.onClick(m);},_onEscape:function(){this._close();this.blurInput();this.setState({focused:false});this.props.onEscape&&this.props.onEscape();},_onEnter:function(event){if(this.props.onEnterWithoutSelection&&(!this.state.viewIsVisible||!this.state.highlightedEntry)){this.props.onEnterWithoutSelection(event);return;}if(!this.state.viewIsVisible)return;if(!this.state.highlightedEntry){event.preventDefault();return;}if(this.props.hideViewWithEntries)this._close();if(this.props.onSelectAttempt)this.props.onSelectAttempt(this.state.highlightedEntry,event);event.preventDefault();},_onTab:function(event){if(this.props.selectOnTab&&this.state.viewIsVisible&&this.props.onSelectAttempt&&this.state.highlightedEntry){if(this.props.hideViewWithEntries){this._close();event.preventDefault();}this.props.onSelectAttempt(this.state.highlightedEntry,event);}},_onDownArrow:function(event){event.preventDefault();this.props.navigation.moveDown(this.state.activeEntries||j,this.state.highlightedEntry,this._setHighlight);},_onUpArrow:function(event){event.preventDefault();this.props.navigation.moveUp(this.state.activeEntries||j,this.state.highlightedEntry,this._setHighlight);},_setHighlight:function(m){this.setState({highlightedEntry:m,isArrowNavigation:true,isAutoHighlight:!m});},_onInputChange:function(event){if(this.props.onChange)this.props.onChange(event);this._setViewIsVisible(this.state.focused&&(this.props.showEntriesOnFocus||event.target.value.length>0)&&(this.props.presenter.alwaysVisibleOnFocus||this.state.activeEntries!=null&&this.state.activeEntries.length>0));},_onViewHighlight:function(m){this.setState({highlightedEntry:m,isArrowNavigation:false,isAutoHighlight:false});},_getView:function(){return (c('React').createElement(c('TypeaheadView.react'),{Renderer:this.props.presenter.ViewRenderer,extraRendererProps:babelHelpers['extends']({},this.props.presenter.extraRendererProps,{isArrowNavigation:this.state.isArrowNavigation}),highlightedEntry:this.state.highlightedEntry,selectedEntry:this.props.selectedEntry,isVisible:this.state.viewIsVisible,ariaOwneeID:this.state.ariaOwneeID,onHighlight:this._onViewHighlight,onRenderHighlight:this._onRenderHighlight,onSelect:this.props.onSelectAttempt,entries:this.state.activeEntries||j,queryString:this.props.queryString}));},_setViewIsVisible:function(m){if(m!==this.state.viewIsVisible){if(this.props.onTypeaheadVisibilityChanged)this.props.onTypeaheadVisibilityChanged(m,this.state.activeEntries||j);this.setState({viewIsVisible:m});}},componentWillReceiveProps:function(m){if(!m.queryString&&!this.props.showEntriesOnFocus)this.clearActiveEntries();},componentDidUpdate:function(){var m=this._determineViewVisibility(this.state.activeEntries,this.state.focused);if(m)this._setViewIsVisible(true);},renderLayers:function(){if(!this.props.presenter.useLayer)return {};var m=null,n=null;if(this.props.context){m=this.props.context;}else n=function(){return this.refs.input;}.bind(this);return {typeaheadView:c('React').createElement(c('ContextualLayer.react'),{alignment:this.props.presenter.alignment,behaviors:this.props.presenter.layerBehaviors,containerWidthMatchContext:this.props.entriesWidthMatchContext,contextRef:n,context:m,position:this.props.presenter.layerPosition||"below",shown:this.state.viewIsVisible,shouldSetARIAProperties:false},this._getView())};},render:function(){var m=this.state.activeEntries,n=!!(m&&m.length),o=c('React').createElement(c('SearchableTextInput.react'),{'aria-activedescendant':this.state.ariaActiveDescendantID,'aria-expanded':n,'aria-autocomplete':'list','aria-label':this.props.ariaLabel,'aria-owns':this.state.ariaOwneeID,required:this.props.required,ref:'input',autoCapitalize:this.props.autoCapitalize,autoComplete:this.props.autoComplete,autoCorrect:this.props.autoCorrect,className:this.props.inputClassName,id:this.props.inputID,queryString:this.props.queryString,placeholder:this.props.placeholder,maxLength:this.props.maxLength,searchSource:this.props.searchSource,searchSourceOptions:this.props.searchSourceOptions,searchOnFocus:!!this.props.showEntriesOnFocus,disabled:this.props.disabled,onEntriesFound:this._onEntriesFound,onEscape:this._onEscape,onBlur:this._onInputBlur,onFocus:this._onInputFocus,onChange:this._onInputChange,onDownArrow:this._onDownArrow,onUpArrow:this._onUpArrow,onTab:this._onTab,onEnter:this._onEnter,onBackspace:this.props.onBackspace,onPaste:this.props.onPaste,onClick:this._onInputClick,style:this.props.inputStyle,tabIndex:this.props.tabIndex}),p=null;if(!this.props.presenter.useLayer)p=this._getView();return (c('React').createElement('span',babelHelpers['extends']({},this.props,{className:c('joinClasses')(this.props.className,"_58ah"),onBlur:null,onClick:null,onFocus:null,tabIndex:null}),o,this.props.additionalElements,p));},componentDidMount:function(){if(this.props.focusedOnInit)this.focusInput();},clearActiveEntries:function(){this.setState({ariaActiveDescendantID:null,activeEntries:null,highlightedEntry:null});},focusInput:function(){var m=this.getTextFieldDOM();if(m.value)c('InputSelection').set(m,m.value.length);this.refs.input.focusInput();},blurInput:function(){if(this.refs.input.blur){this.refs.input.blur();}else if(this.refs.input.blurInput)this.refs.input.blurInput();},hideView:function(){this._setViewIsVisible(false);},_close:function(){this._setViewIsVisible(false);this.clearActiveEntries();},getTextFieldDOM:function(){return this.refs.input.getTextFieldDOM();}});f.exports=l;},null);
__d('XUITypeaheadTextOnlyView.react',['cx','React','TypeaheadViewItem','TypeaheadViewPropTypes'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').createClass({displayName:'XUITypeaheadTextOnlyViewItem',mixins:[c('TypeaheadViewItem').Mixin],propTypes:c('TypeaheadViewItem').propTypes,render:function(){var k=this.props.entry,l="_599m"+(this.props.highlighted?' '+"_599n":'');return (c('React').createElement('li',{'aria-label':k.getTitle(),'aria-selected':this.props.highlighted,className:l,key:k.getUniqueID(),onMouseDown:this._onSelect,onMouseEnter:this._onHighlight,role:this.props.role,title:k.getTitle()},c('React').createElement('div',{className:"_599p"},k.getTitle())));}}),j=c('React').createClass({displayName:'XUITypeaheadTextOnlyView',propTypes:c('TypeaheadViewPropTypes'),getDefaultProps:function(){return {role:'listbox'};},_renderItem:function(k){var l=k===this.props.highlightedEntry;return (c('React').createElement(i,{entry:k,highlighted:l,key:k.getUniqueID(),onSelect:this.props.onSelect,onHighlight:this.props.onHighlight,onRenderHighlight:this.props.onRenderHighlight}));},render:function(){var k="_599r"+(!this.props.entries.length?' '+"_599s":'');return (c('React').createElement('ul',{className:k,id:this.props.ariaOwneeID,role:this.props.role},this.props.entries.map(this._renderItem)));}});f.exports=j;},null);
__d('XUITypeahead.react',['cx','AbstractTypeahead.react','Image.react','React','SearchableEntry','XUICloseButton.react','XUIError.react','XUITypeaheadTextOnlyView.react','XUITypeaheadView.react','joinClasses','update'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').PropTypes,j={ViewRenderer:c('XUITypeaheadView.react'),useLayer:true},k={ViewRenderer:c('XUITypeaheadView.react'),useLayer:false},l={ViewRenderer:c('XUITypeaheadTextOnlyView.react'),useLayer:true},m=c('React').createClass({displayName:'XUITypeahead',propTypes:babelHelpers['extends']({maxEntries:i.number,onChange:i.func.isRequired,onSelectAttempt:i.func.isRequired,onEntriesFound:i.func,onNoEntriesFound:i.func,selectedEntry:i.instanceOf(c('SearchableEntry')),tallInput:i.bool,viewStyle:i.oneOf(['textonly','rich','richNoLayer']),clearable:i.bool,onClear:i.func,showPhoto:i.bool,highlightOnSelect:i.bool,presenter:i.object,inputID:i.string},c('XUIError.react').propTypes),getDefaultProps:function(){return {viewStyle:'rich'};},componentWillMount:function(){},focusInput:function(){this.refs.typeahead&&this.refs.typeahead.focusInput();},blurInput:function(){this.refs.typeahead&&this.refs.typeahead.blurInput();},hideView:function(){this.refs.typeahead.hideView();},getTextFieldDOM:function(){return this.refs.typeahead.getTextFieldDOM();},_onClear:function(){this.props.onClear();setTimeout(function(){return this.focusInput();}.bind(this),0);},render:function(){var n="_55r1"+(!!this.props.tallInput?' '+"_55r2":''),o=null;if(this.props.presenter){o=this.props.presenter;}else if(this.props.viewStyle=='rich'){o=j;}else if(this.props.viewStyle=='richNoLayer'){o=k;}else o=l;if(!this.props.presenter&&this.props.maxEntries)o=c('update')(o,{maxEntries:{$set:this.props.maxEntries}});var p=this.props.showPhoto&&this.props.selectedEntry?c('React').createElement(c('Image.react'),{className:"_wrl",src:this.props.selectedEntry.getPhoto()}):null,q=this.props.clearable?c('React').createElement(c('XUICloseButton.react'),{className:"_wrm"+(!this.props.queryString?' '+"hidden_elem":''),size:this.props.tallInput?'medium':'small',type:'button',onClick:this._onClear}):null,r=this.props,s=r.className,t=babelHelpers.objectWithoutProperties(r,['className']);return (c('React').createElement(c('XUIError.react'),this.props,c('React').createElement('span',{className:c('joinClasses')("_wrn"+(!!this.props.tallInput?' '+"_213j":'')+(!!q?' '+"_4ehf":'')+(!!p?' '+"_4ehg":'')+(!!this.props.queryString?' '+"_4in7":'')+(this.props.highlightOnSelect&&this.props.selectedEntry?' '+"_wrr":''),s)},p,c('React').createElement(c('AbstractTypeahead.react'),babelHelpers['extends']({},t,{inputClassName:n,ref:'typeahead',presenter:o})),q)));}});f.exports=m;},null);
__d('highlight',['Animation','Style'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j,k,l){new (c('Animation'))(i).from('background',l||'#fff9d7').to('background',k||'#fff').ease(c('Animation').ease.both).duration(2000).ondone(function(){c('Style').set(i,'background','');j&&j();}).go();}f.exports=h;},null);
__d('ProfileTypeaheadContainer.react',['cx','React'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('React').createClass({displayName:'ProfileTypeaheadContainer',render:function(){return (c('React').createElement('div',{className:"_1ceo"},this.props.children));}});f.exports=i;},null);
__d('ProfileQuestionsTypeaheadChecklist.react',['Arbiter','FBTypeaheadChecklist.react','React'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h='402159529891743',i=c('React').createClass({displayName:'ProfileQuestionsTypeaheadChecklist',render:function(){return (c('React').createElement(c('FBTypeaheadChecklist.react'),babelHelpers['extends']({},this.props,{onChange:this._onChange})));},_onChange:function(j){var k=j[h];c('Arbiter').inform('no-valid-answer-select',{selected:k&&k.checked});}});f.exports=i;},null);