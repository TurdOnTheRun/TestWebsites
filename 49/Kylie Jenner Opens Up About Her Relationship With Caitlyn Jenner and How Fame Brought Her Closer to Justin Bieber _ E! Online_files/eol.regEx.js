/*
	// Author: @briankueck

	Usage Examples:
	if (!$('#someId').val().trim().match(eonline.regEx.emailAddresses)) {
		alert('Not a valid email address!');
	}

	if (!$('#someId').val().trim().match(eonline.regEx.ipAddress)) {
		alert('Not a valid IP address!');
	}
*/

if (typeof(eonline) === 'undefined') var eonline = {}; // Same as window.eonline.
eonline.regEx = {
	"emailAddresses": /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/,
	"ipAddress": /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
}
