_satellite.pushBlockingScript(function(event, target, $variables){
  /*
 * This script redefines the _satellite.setCookie function to allow you to set cookies
 * on the root domain.  In this function, set the "cdp" value to the number of domain
 * periods you want to set the cookie under.  If you want it under the root domain of
 * www.domain.com, it will be 2 for domain.com.  If you want it under the root domain of
 * www.domain.co.uk, it will be 3 for domain.co.uk.
 *
 * To use this, add it to a page top rule.  It can either be added to a custom condition
 * or as a sequential JS third party script.
 */
_satellite.setGoodCookie = function(e, t, i) {
    var a, cdp = 2, d = document.domain.split('.'), dom = [], n = document;
    if(document.domain.match(/\.co\.uk|\.co\.jp/ig)){
      cdp = 3;
    }
    if (i) {
      var r = new Date;
      r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3);
      a = "; expires=" + r.toGMTString();
    }
    else
      a = "";
    for(var j=d.length-1; j>=d.length-cdp; j--){
      dom.unshift(d[j]);
    }
    n.cookie = e + "=" + t + a + "; domain=."+dom.join(".")+"; path=/"
};

_satellite.availableTools.sc.prototype.getAccount = function(hostname){
  if (hostname && this.settings.accountByHost){
    return this.settings.accountByHost[hostname] || this.settings.account
  }
  else{
    return this.settings.account
  }
};
});
