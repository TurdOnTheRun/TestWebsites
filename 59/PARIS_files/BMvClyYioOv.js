/*!CK:3229220553!*//*1459901534,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ze84Q"]); }

__d('NotificationURI',['BusinessURI.brands','URI','isFacebookURI','VideoPermalinkURI'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={localize:function(i){i=c('BusinessURI.brands')(i);if(!c('isFacebookURI')(i))return i.toString();var j=i.getSubdomain();return i.getUnqualifiedURI().getQualifiedURI().setSubdomain(j).toString();},snowliftable:function(i){if(!i)return false;i=new (c('URI'))(i);var j=i.getQueryData();return c('isFacebookURI')(i)&&(c('VideoPermalinkURI').isValid(i)||'fbid' in j);},isVaultSetURI:function(i){return this._areEquals(i,'/ajax/vault/sharer_preview.php');},isAlbumDraftRecoveryDialogURI:function(i){return this._areEquals(i,'/ajax/photos/upload/overlay/');},_areEquals:function(i,j){if(!i)return false;i=new (c('URI'))(i);return c('isFacebookURI')(i)&&i.getPath()===j;},_startsWith:function(i,j){if(!i)return false;i=new (c('URI'))(i);return c('isFacebookURI')(i)&&i.getPath().startsWith(j);}};f.exports=h;},null);
__d('FeedCommentBaseItemContents.react',['cx','fbt','Animation','AsyncRequest','Bootloader','DataSource','FBProfilePhotoShadow.react','Image.react','ImageBlock.react','LegacyMentionsInput.react','NotificationBeeperItemCloseButton.react','NotificationURI','NotificationUserActions','React','ReactDOM','SeeMore.react','ShortProfiles','StaticUFIForm.react','TextWithEntities.react','TextWithEmoticons.react','Timestamp.react','UFIActionTypes','UFIActorIconContainer.react','UFIAddComment.react','UFICallbackStore','UFICentralUpdates','UFICommentAttachment.react','UFICommentBody.react','UFICommentUtils','UFIConstants','UFIDispatcher','UFIDispatcherContext.react','UFIFeedbackContext.react','UFIUserActions','UnicodeUtils','emptyFunction'],function a(b,c,d,e,f,g,h,i){'use strict';if(c.__markCompiled)c.__markCompiled();var j=c('UFIConstants').UFIPayloadSourceType,k=50;function l(n,o){return c('React').createElement('span',{className:'fwb'},n);}var m=c('React').createClass({displayName:'FeedCommentBaseItemContents',getInitialState:function(){return {hasClickedSeeMore:false,hasReplied:false,reply:null};},_markAsRead:function(){c('NotificationUserActions').markNotificationsAsRead([this.props.beep.notificationID]);},_onClick:function(n){this._markAsRead();this.props.onHide();if(n.button===1||n.altKey||n.ctrlKey||n.metaKey||n.shiftKey)return;var o=this.props.beep;if(c('NotificationURI').isAlbumDraftRecoveryDialogURI(o.link)){new (c('AsyncRequest'))(o.link).send();n.preventDefault();}else if(o.photo&&c('NotificationURI').snowliftable(o.link)){c('Bootloader').loadModules(["PhotoSnowlift"],function(p){p.bootstrap(o.link,n.currentTarget);});n.preventDefault();}else if(o.ajaxifyLink){c('Bootloader').loadModules(["AsyncDialog"],function(p){p.bootstrap(o.ajaxifyLink,n.currentTarget,'dialog');});n.preventDefault();}},_onClose:function(){this._markAsRead();this.props.onHide();},_doFlash:function(){new (c('Animation'))(c('ReactDOM').findDOMNode(this.refs.inner)).from('opacity','0').to('opacity','1').duration(200).go();},componentWillMount:function(){this._dispatcher=new (c('UFIDispatcher'))();this._stores={UFICallbackStore:new (c('UFICallbackStore'))(this._dispatcher)};var n=this.props.beep.rendererData.initial_payload;n.mentionsdatasource=new (Function.prototype.bind.apply(c('DataSource'),[null].concat(n.mentionsdatasourceargs)))();c('UFICentralUpdates').handleUpdate(j.INITIAL_SERVER,this.props.beep.rendererData.initial_payload);},componentDidMount:function(){this.props.onReadyToHide(this.props.beep.notificationID);this._stores.UFICallbackStore.on(c('UFIActionTypes').ADD_COMMENT.SUBMIT_NEW,function(n){var o=this.props.beep.rendererData.context_args,p=n.comment,q=c('UFIUserActions').createComment(o.ftentidentifier,p.visibleValue,p.encodedValue,{source:o.source,ufiinstanceid:o.instanceid,target:n.target,reply_fbid:this.props.beep.rendererData.comment_id,parent_comment_id:n.replyCommentID,rootid:o.rootid,attachedphoto:p.attachedPhoto,attachedvideo:p.attachedVideo,attachedsticker:p.attachedSticker,feedcontext:o.feedcontext,timestamp:n.timestamp});this.setState({hasReplied:true,reply:q});}.bind(this));},componentWillUnmount:function(){this._stores.UFICallbackStore.remove();this._stores={};this._dispatcher=null;},componentDidUpdate:function(n){if(n.beep.beepID!==this.props.beep.beepID){this._doFlash();this.props.onReadyToHide(this.props.beep.notificationID);}},render:function(){var n=this.props.beep,o=n.rendererData,p=this._renderCommentComponent(o),q=p.showReplyComponent,r=p.addReplyComponent,s=this._renderTextContent(n.text,o);return (c('React').createElement('div',{ref:'inner'},c('React').createElement(c('NotificationBeeperItemCloseButton.react'),{onClick:this._onClose}),c('React').createElement('a',{href:n.link,onClick:this._onClick,className:"_3soi"},c('React').createElement(c('ImageBlock.react'),{className:"_3soj",spacing:'medium'},c('React').createElement(c('FBProfilePhotoShadow.react'),{className:"_2yt7"},c('React').createElement(c('Image.react'),{src:n.actors[0].profile_picture.uri,className:"_3sok"})),c('React').createElement('div',{className:"_3sol"},s,c('React').createElement(c('ImageBlock.react'),{className:"_3som"},c('React').createElement(c('Image.react'),{className:"_1x8t",src:n.icon.uri}),c('React').createElement(c('Timestamp.react'),{time:n.timestamp.time,text:n.timestamp.text,verbose:n.timestamp.verbose}))))),q,r));},_renderTextContent:function(n,o){var p=o.comment_text,q=c('React').createElement(c('TextWithEntities.react'),{renderEmoticons:true,renderEmoji:true,interpolator:l,ranges:n.ranges,aggregatedranges:n.aggregated_ranges,text:n.text});if(!p)return q;var r=c('UnicodeUtils').strlen(p),s=Math.min(k,r),t=this.state.hasClickedSeeMore||s==r;if(t){return (c('React').createElement('span',{className:"_1ke"},this._buildNotifWithComment(q,p)));}else return (c('React').createElement(c('SeeMore.react'),{className:"_1ke",clickCallback:function(u){u.stopPropagation();this.setState({hasClickedSeeMore:true});}.bind(this)},this._buildNotifWithComment(q,c('UnicodeUtils').substr(p,0,s)),null));},_buildNotifWithComment:function(n,o){var p=c('React').createElement(c('TextWithEmoticons.react'),{text:o,renderEmoji:true,renderEmoticons:true});return i._("{notification text}: {truncated comment text}",[i.param('notification text',n),i.param('truncated comment text',c('React').createElement('span',{className:"_1kf"},'"',p,'"'))]);},_renderCommentComponent:function(n){var o=n.comment_text,p=n.context_args,q=n.comment_token;if(!o)return {};var r=this.state,s=r.hasReplied,t=r.reply;return {showReplyComponent:s?this._renderShowReply(p,t):null,addReplyComponent:s?null:this._renderAddReply(p,q)};},_renderShowReply:function(n,o){var p=c('UFICommentUtils').shallowCopyRanges(o.body&&o.body.ranges),q=c('UFICommentUtils').getCommentTextWithTruncatedURIs(p,o.body?o.body.text:'');return (c('React').createElement(c('UFIDispatcherContext.react'),{dispatcher:this._dispatcher,stores:this._stores},c('React').createElement(c('UFIFeedbackContext.react'),{contextArgs:n,render:function(r,s){return (c('React').createElement(c('ImageBlock.react'),{className:"_2o16",spacing:'medium'},c('React').createElement(c('FBProfilePhotoShadow.react'),{className:"_2o17"},c('React').createElement(c('UFIActorIconContainer.react'),{actorID:s.actorforpost,className:"_2o18"})),c('React').createElement('div',null,c('React').createElement(c('UFICommentBody.react'),{socialContext:o.socialcontext,commentText:q,commentRanges:p,groupOrEventID:s.grouporeventid}),c('React').createElement(c('UFICommentAttachment.react'),{comment:o}))));}})));},_renderAddReply:function(n,o){n=babelHelpers['extends']({},n,{mentionsinput:{inputComponent:c('LegacyMentionsInput.react')}});return (c('React').createElement(c('UFIDispatcherContext.react'),{dispatcher:this._dispatcher,stores:this._stores},c('React').createElement(c('StaticUFIForm.react'),{condensed:false,contextArgs:n,ref:'add_comment_form'},c('React').createElement(c('UFIFeedbackContext.react'),{contextArgs:n,render:function(p,q){c('ShortProfiles').get(q.actorforpost,c('emptyFunction'));if(!q||!q.cancomment||!q.actorforpost)return null;return (c('React').createElement(c('UFIAddComment.react'),{className:"_2o19 _1d4f",viewerActorID:q.actorforpost,replyCommentID:o,targetID:q.ownerid,initialData:null,ref:null,withoutSeparator:null,editingComment:{},isEditing:false,mentionsDataSource:q.mentionsdatasource,showSendOnEnterTip:q.showsendonentertip,allowPhotoAttachments:q.allowphotoattachments&&!p.isstreaming,allowVideoAttachments:q.allowvideoattachments&&!p.isstreaming,allowStickerAttachments:q.allowstickerattachments&&!p.isstreaming,contextArgs:p,subtitle:q.subtitle,isQAndA:q.isqanda}));}}))));}});f.exports=m;},null);