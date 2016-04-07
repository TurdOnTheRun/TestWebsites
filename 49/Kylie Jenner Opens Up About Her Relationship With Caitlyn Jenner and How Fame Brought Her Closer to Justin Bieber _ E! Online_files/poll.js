/***

*/
function sendPollResults(poll_id, choice_selected, content_id, supp_id) {
    if (isNaN(choice_selected)) {
        return false;
	}
	if (content_id !== null && content_id !== ""){
		content_id = "&content_id=" + content_id;
    }
	else { 
	    content_id = ""; 
	}
    var myAjax = new Ajax.Request("/services/processPoll.jsp", {
			"method" : 'get',
			"parameters" : "poll_id=" + poll_id + "&choice_selected=" + choice_selected+content_id + "&supp_id=" + supp_id,
			"onComplete" : updateCaptchaPoll
		});
		return true;
}

function sendPollResultsCaptcha(poll_id, choice_selected, content_id, supp_id, captcha) {
	if(isNaN(choice_selected)){
		return false;
	}
	if(content_id!=null && content_id!=""){
		content_id="&content_id="+content_id;
	}
	else {
		content_id="";
	}
	if(captcha!=null && captcha!=""){
		captcha="&captchaEntry="+captcha;
	}
	else {
		captcha="";
	}
    var myAjax = new Ajax.Request("/services/processPoll.jsp",
		{
			method: 'get',
			parameters: "poll_id=" + poll_id + "&choice_selected=" + choice_selected+content_id+captcha + "&supp_id=" + supp_id,
			onComplete: updateCaptchaPoll
		});
		return true;
}
function sendRateItPollResults(poll_id, choice_selected, content_id, sectionPath) {
	if(isNaN(choice_selected)){
		return false;
	}
	if(content_id!=null && content_id!=""){
		content_id="&content_id="+content_id;
	}
	else {
		content_id="";
	}
	var myAjax = new Ajax.Request(sectionPath+"services/processPoll.jsp",
	{
		method: 'get',
		parameters: "poll_id=" + poll_id + "&choice_selected=" + choice_selected+content_id,
		onComplete: updatePoll
	});
	return true;
}

function sendRateItPollResultsForGallery(poll_id, choice_selected, content_id, sectionPath) {
	if(isNaN(choice_selected)){
		return false;
	}
	if(content_id!=null && content_id!=""){
		content_id="&content_id="+content_id;
	}
	else {
		content_id="";
	}
	var myAjax = new Ajax.Request(sectionPath+"services/processPoll.jsp",
	{
		method: 'get',
		parameters: "poll_id=" + poll_id + "&choice_selected=" + choice_selected+content_id +"&isGallery=true",
		onComplete: updatePoll
	});
	return true;
}

/* NOT ONLY IS THIS FUNCTION NOT USED, IT ALSO BREAKS THE FOOTER MODAL WINDOW!!! */
/* it is being used for the customPoll --JChen*/
function collectChoiceSelected(form, choice_collected,choice_selected){
	var len = form.elements.length;
	var selected=choice_selected.value;
	var collected=choice_collected.value+","+selected;
	for(var i=0; i<len; i++){
		var curr = form.elements[i];
		if(curr.name==choice_selected.name){
			var currVal = curr.value;
			if(currVal!=selected && collected.indexOf(currVal)!=-1){
				collected=collected.replace(","+currVal,"");
			}
		}
	}
	choice_collected.value=collected;
}


function sendPollMultiQuestionResults(poll_id, choice_selected, content_id, coID) {
	if (coID > 0) {
    	var captcha = hex_md5(document.getElementById('poll_uword').value);
	    Delete_Cookie("PostCookie","/",".eonline.com");
	    Set_Cookie("PostCookie",coID,5,"/",".eonline.com");
	}

    var ary = choice_selected.value.split(",");
	for(var i=0; i<ary.length; i++){
		if(ary[i]!="" && !isNaN(ary[i])){
			if (coID > 0) {
				sendPollResultsCaptcha(poll_id, ary[i], content_id, '', captcha);
			} else {
				sendPollResults(poll_id, ary[i], content_id);
			}
		}
	}
}
function updatePoll(response) {
	//alert('in updatePoll() start');
	//var resp = response.responseText;
	var jsonObj = null;
	//alert('responseText= ' + response.responseText);
	jsonObj = eval("(" + response.responseText + ")");

	//alert('jsonObj= ' + jsonObj);
	//alert('jsonObj.answerSize= ' + jsonObj.answerSize);

	var pollResults = "";
	pollResults += "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">";
	if (jsonObj.thankYouMessage) {
		pollResults += "<tr>";
		pollResults += "<td class=\"selection\">" + jsonObj.thankYouMessage + "</td>";
		pollResults += "</tr>";
	}
	else {
		for(var i = 0; i < jsonObj.answerSize; i++) {
			pollResults += "<tr>";
		 	pollResults += "<td class=\"percentage\">" + eval("jsonObj.percentage" + i) + "</td>";
			pollResults += "<td class=\"selection\">" + eval("jsonObj.answer" + i) + "</td>";
			pollResults += "</tr>";
		}
	}
	pollResults +=  "</table>";
	$("poll-div").innerHTML = pollResults;
}
function updateCaptchaPoll(response) {
	var jsonObj = null;
	//alert('responseText= ' + response.responseText);
	jsonObj = eval("(" + response.responseText + ")");

	if (jsonObj.errorMessage!=null) {
		$('poll_captcha_message').update(jsonObj.errorMessage);
	} else {
		if (jsonObj.thankYouMessage) {
			Element.hide('poll-container-'+jsonObj.poll_id);	//hide poll
			Element.show('thank-you-'+jsonObj.poll_id);			//show thanks msg
		} else {
			$('voteBtn-'+jsonObj.poll_id).hide();				//hide vote submit button
			var poll_vote_array = $$('#poll-container-'+jsonObj.poll_id+' .vote_item input');	//hide vote radio buttons
			poll_vote_array.each(function(poll_vote_array){
				poll_vote_array.hide();
			});
			var poll_results_array = $$('#poll-container-'+jsonObj.poll_id+' .vote_item span');		//show results
			poll_results_array.each(function(poll_results_array){
				poll_results_array.show();
			});
			$('poll_captcha_'+jsonObj.poll_id).hide();						//hide captcha
		}
	}
}

window.GalleryPoll = {
	DisableVoting: function () {
		var poll_link_array = $$('.poll_choice_link');
		poll_link_array.each(function(poll_link_array){
			poll_link_array.removeAttribute('onclick');
		});
	}
}

window.BlogPoll = {
	"Inject" : function (pollID) {
		new Ajax.Updater("blog_poll_" + pollID, "/uberblog/includes/jsp/blog_poll.jsp?pollID=" + pollID, {
			onFailure: function() {
				$("blog_poll_" + pollID).update("There was an error loading the poll. Refresh the page to try again.");
			}
		});
	}
}
