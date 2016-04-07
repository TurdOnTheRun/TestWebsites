_satellite.pushBlockingScript(function(event, target, $variables){
  (function(){
if (typeof (ClickTaleCreateDOMElement) != "function")
{
        ClickTaleCreateDOMElement = function(tagName)
        {
                if (document.createElementNS)
                {
                        return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
                }
                return document.createElement(tagName);
        }
}
var scriptElement = ClickTaleCreateDOMElement('script');
scriptElement.type = "text/javascript";
scriptElement.src = (document.location.protocol=='https:'?
'https://clicktalecdn.sslcs.cdngc.net/www12/phc/d6b237b8-023c-4cf5-b934-0322a350ddc7.js':
'http://cdn.clicktale.net/www12/phc/d6b237b8-023c-4cf5-b934-0322a350ddc7.js');
//document.body.appendChild(scriptElement);
document.getElementsByTagName('head')[0].appendChild(scriptElement);
})();
});
