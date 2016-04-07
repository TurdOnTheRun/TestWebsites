var externalScript = document.createElement('script');
var scrSrc = document.location.protocol=='https:'?
  'https://clicktalecdn.sslcs.cdngc.net/':
  'http://cdn.clicktale.net/';

scrSrc += 'www12/ptc/d6b237b8-023c-4cf5-b934-0322a350ddc7.js';
externalScript.src = scrSrc;
externalScript.type = 'text/javascript';
document.body.appendChild(externalScript);
