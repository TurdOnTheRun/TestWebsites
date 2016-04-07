if (typeof tabletMatch!='undefined' && tabletMatch) {
	document.write('<script src="http://a.abcnews.com/xmldata/export?path=/tabletf" type="text/javascript"><\/script>')
} else if (typeof phoneMatch!='undefined' && phoneMatch) {
   document.write('<script src="http://a.abcnews.com/xmldata/export?path=/phonewebf" type="text/javascript"><\/script>')
} else {//desktop
	document.write('<script src="http://a.abcnews.com/xmldata/export?path=/defaults/footer" type="text/javascript"><\/script>')
}
