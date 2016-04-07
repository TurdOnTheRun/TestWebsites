/*!
* jQuery.tagcloud.js
* A Simple Tag Cloud Plugin for jQuery
*
* https://github.com/addywaddy/jQuery.tagcloud.js
* created by Adam Groves
*/
(function(ezQuery) {

  /*global ezQuery*/
  "use strict";

  var compareWeights = function(a, b)
  {
    return a - b;
  };

  // Converts hex to an RGB array
  var toRGB = function(code) {
    if (code.length === 4) {
      code = code.replace(/(\w)(\w)(\w)/gi, "\ezQuery1\ezQuery1\ezQuery2\ezQuery2\ezQuery3\ezQuery3");
    }
    var hex = /(\w{2})(\w{2})(\w{2})/.exec(code);
    return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
  };

  // Converts an RGB array to hex
  var toHex = function(ary) {
    return "#" + ezQuery.map(ary, function(i) {
      var hex = i.toString(16);
      hex = (hex.length === 1) ? "0" + hex : hex;
      return hex;
    }).join("");
  };

  var colorIncrement = function(color, range) {
    return ezQuery.map(toRGB(color.end), function(n, i) {
      return (n - toRGB(color.start)[i])/range;
    });
  };

  var tagColor = function(color, increment, weighting) {
    var rgb = ezQuery.map(toRGB(color.start), function(n, i) {
      var ref = Math.round(n + (increment[i] * weighting));
      if (ref > 255) {
        ref = 255;
      } else {
        if (ref < 0) {
          ref = 0;
        }
      }
      return ref;
    });
    return toHex(rgb);
  };

  ezQuery.fn.tagcloud = function(options) {

    var opts = ezQuery.extend({}, ezQuery.fn.tagcloud.defaults, options);
    var tagWeights = this.map(function(){
      return ezQuery(this).attr("rel");
    });
    tagWeights = ezQuery.makeArray(tagWeights).sort(compareWeights);
    var lowest = tagWeights[0];
    var highest = tagWeights.pop();
    var range = highest - lowest;
    if(range === 0) {range = 1;}
    // Sizes
    var fontIncr, colorIncr;
    if (opts.size) {
      fontIncr = (opts.size.end - opts.size.start)/range;
    }
    // Colors
    if (opts.color) {
      colorIncr = colorIncrement (opts.color, range);
    }
    return this.each(function() {
      var weighting = ezQuery(this).attr("rel") - lowest;
      if (opts.size) {
        ezQuery(this).css({"font-size": opts.size.start + (weighting * fontIncr) + opts.size.unit});
      }
      if (opts.color) {
        ezQuery(this).css({"color": tagColor(opts.color, colorIncr, weighting)});
      }
    });
  };

  ezQuery.fn.tagcloud.defaults = {
    size: {start: 14, end: 18, unit: "pt"}
  };

})(ezQuery);