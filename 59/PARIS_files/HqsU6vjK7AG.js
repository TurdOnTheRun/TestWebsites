/*!CK:1781510557!*//*1459866040,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["phmYW"]); }

__d('LtgDisableAutoTranslatePreferenceEntry',['ContentTranslationStrings','TranslationPreferenceEvent','TranslationTrigger','LtgTranslationPreferenceEntryBase','XLtgDisableAutoTranslatePreferenceController','LanguageSettingsAction'],function a(b,c,d,e,f,g){var h,i;if(c.__markCompiled)c.__markCompiled();h=babelHelpers.inherits(j,c('LtgTranslationPreferenceEntryBase'));i=h&&h.prototype;function j(k,l){'use strict';i.constructor.call(this,k);this.isShowingOriginal=l;}j.prototype.getPreferenceType=function(){'use strict';return c('TranslationPreferenceEvent').DISABLE_AUTO_TRANSLATION;};j.prototype.getShouldShowPreference=function(){'use strict';return this.translationData.trigger===c('TranslationTrigger').AUTO_TRANSLATION;};j.prototype.getEntryTitle=function(){'use strict';return c('ContentTranslationStrings').getDisableAutoTranslate(this.translationData.sourceDialectName);};j.prototype.getDialogTitle=function(){'use strict';return this.getEntryTitle();};j.prototype.getDialogBody=function(){'use strict';return c('ContentTranslationStrings').getDisableAutoTranslateDialog(this.translationData.sourceDialectName);};j.prototype.getUseConfirmDialog=function(){'use strict';return true;};j.prototype.getUseEditableDialog=function(){'use strict';return false;};j.prototype.getURIForAsyncAction=function(){'use strict';return c('XLtgDisableAutoTranslatePreferenceController').getURIBuilder().setString('dialect',this.translationData.sourceDialect).setEnum('event_trigger',c('LanguageSettingsAction').DO_NOT_AUTO_TRANSLATE).getURI();};f.exports=j;},null);