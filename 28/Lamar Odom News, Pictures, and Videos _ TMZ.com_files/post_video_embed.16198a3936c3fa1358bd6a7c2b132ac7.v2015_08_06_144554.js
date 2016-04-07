// TMZ in-post embed functions

function randomNum() {
    return Math.ceil(Math.random() * 100000000000000000);
}

function tmzThumbnailEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof(height) === "undefined" ? 394 : parseInt(height);
    var customWidth = typeof(width) === "undefined" ? 700 : parseInt(width);

    var template = "<div class=" + playerName +
        " style=\"height: " + customHeight + "px; width: " + customWidth + "px;position:relative;clear:both;\"></div>\n" +
        "  <script>\n" +
        "  $(function(callback) {\n" +
        "    " + playerName + " = new TmzKalturaPlayerView({\n" +
        "      \"where\": \"." + playerName + "\",\n" +
        "      \"cacheSt\": 9999999999,\n" +
        "      \"height\": " + customHeight + ",\n" +
        "      \"width\": " + customWidth + ",\n" +
        "      \"site\": \"tmz\",\n" +
        "      \"endcard\": true,\n" +
        "      \"autoplay\": false,\n" +
        "      \"autoContinue\": false,\n" +
        "      \"thumbnail\": true,\n" +
        "      \"showPlaylist\": false,\n" +
        "      \"playerOptions\": {\n" +
        "        \"entryId\": \"" + entryId + "\"\n" +
        "      }\n" +
        "    });\n" +
        "    callback(" + playerName + ");\n" +
        "  }(function(player){\n" +
        "    player.draw();\n" +
        "  }));\n" +
        "</script>\n";
    console.log("performing document.write");
    document.write(template);
}

function tmzVideoEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof(height) === "undefined" ? 394 : parseInt(height);
    var customWidth = typeof(width) === "undefined" ? 700 : parseInt(width);

    var template = "<div class=" + playerName +
        " style=\"height: " + customHeight + "px; width: " + customWidth + "px;position:relative;clear:both;\"></div>\n" +
        "  <script>\n" +
        "  $(function(callback) {\n" +
        "    " + playerName + " = new TmzKalturaPlayerView({\n" +
        "      \"where\": \"." + playerName + "\",\n" +
        "      \"height\": " + customHeight + ",\n" +
        "      \"width\": " + customWidth + ",\n" +
        "      \"cacheSt\": 9999999999,\n" +
        "      \"site\": \"tmz\",\n" +
        "      \"endcard\": true,\n" +
        "      \"autoplay\": false,\n" +
        "      \"autoContinue\": false,\n" +
        "      \"thumbnail\": true,\n" +
        "      \"showPlaylist\": false,\n" +
        "      \"playerOptions\": {\n" +
        "        \"entryId\": \"" + entryId + "\"\n" +
        "      }\n" +
        "    });\n" +
        "    callback(" + playerName + ");\n" +
        "  }(function(player){\n" +
        "    player.draw();\n" +
        "  }));\n" +
        "</script>\n";
    console.log("performing document.write");
    document.write(template);
}

function tmzVideoEmbedV2(options) {
    var playerOptions = JSON.parse(options);
    var playerName = 'player' + randomNum();
  var customHeight = typeof playerOptions.height === 'undefined' ? 394 : parseInt(playerOptions.height);
  var customWidth = typeof playerOptions.width === 'undefined' ? 700 : parseInt(playerOptions.width);
  var endcard = typeof playerOptions.endcard === 'undefined' ? true : (playerOptions.endcard.toLowerCase() === 'true');
  var launchQuote = typeof playerOptions.launch_quote === 'undefined' || playerOptions.launch_quote === null ? '' : decodeURIComponent(playerOptions.launch_quote);
  var videoCredit = typeof playerOptions.video_credit === 'undefined' || playerOptions.video_credit === null ? '' : decodeURIComponent(playerOptions.video_credit);
    var launchQuoteHtml = '<div class=\"launch-quote\"><span class=\"launch-quote-text\">' + launchQuote + '</span>\n' +
        '<span class=\"video-credit-text\">' + videoCredit + '</span></div>\n';
    var launchQuoteTemplate = launchQuote === '' ? '' : launchQuoteHtml;
    var template = "<div class=" + playerName +
        " data-video-type=\"kaltura\" style=\"height: " + customHeight + "px; width: " + customWidth + "px;position:relative;clear:both;\">"+launchQuoteTemplate+"</div>\n" +
        "  <script>\n" +
        "  $(function(callback) {\n" +
        "    " + playerName + " = new TmzKalturaPlayerView({\n" +
        "      \"where\": \"." + playerName + "\",\n" +
        "      \"height\": " + customHeight + ",\n" +
        "      \"width\": " + customWidth + ",\n" +
        "      \"cacheSt\": 9999999999,\n" +
        "      \"site\": \"tmz\",\n" +
        "      \"endcard\": " + endcard + ",\n" +
        "      \"autoplay\": false,\n" +
        "      \"autoContinue\": false,\n" +
        "      \"thumbnail\": true,\n" +
        "      \"showPlaylist\": false,\n" +
        "      \"playerOptions\": {\n" +
        "           \"entryId\": \"" + playerOptions.id.replace('-', '_') + "\"\n" +
        "      }\n" +
        "    });\n" +
        "    callback(" + playerName + ");\n" +
        "  }(function(player){\n" +
        "    player.draw();\n" +
        "  }));\n" +
        "</script>\n";
    document.write(template);
}

function toofabThumbnailEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof(height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof(width) === "undefined" ? 664 : parseInt(width);

    var template = "<div class=" + playerName +
        " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" +
        "  <script>\n" +
        "  $(function(callback) {\n" +
        "    " + playerName + " = new TmzKalturaPlayerView({\n" +
        "      \"where\": \"." + playerName + "\",\n" +
        "      \"cacheSt\": 9999999999,\n" +
        "      \"height\": " + customHeight + ",\n" +
        "      \"width\": " + customWidth + ",\n" +
        "      \"site\": \"toofab\",\n" +
        "      \"endcard\": true,\n" +
        "      \"autoplay\": false,\n" +
        "      \"autoContinue\": false,\n" +
        "      \"thumbnail\": true,\n" +
        "      \"showPlaylist\": false,\n" +
        "      \"playerOptions\": {\n" +
        "        \"entryId\": \"" + entryId + "\"\n" +
        "      }\n" +
        "    });\n" +
        "    callback(" + playerName + ");\n" +
        "  }(function(player){\n" +
        "    player.draw();\n" +
        "  }));\n" +
        "</script>\n";
    console.log("performing document.write");
    document.write(template);
}

function toofabVideoEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof(height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof(width) === "undefined" ? 664 : parseInt(width);

    var template = "<div class=" + playerName +
        " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" +
        "  <script>\n" +
        "  $(function(callback) {\n" +
        "    " + playerName + " = new TmzKalturaPlayerView({\n" +
        "      \"where\": \"." + playerName + "\",\n" +
        "      \"height\": " + customHeight + ",\n" +
        "      \"width\": " + customWidth + ",\n" +
        "      \"cacheSt\": 9999999999,\n" +
        "      \"site\": \"toofab\",\n" +
        "      \"endcard\": false,\n" +
        "      \"autoplay\": false,\n" +
        "      \"autoContinue\": false,\n" +
        "      \"showPlaylist\": false,\n" +
        "      \"playerOptions\": {\n" +
        "        \"entryId\": \"" + entryId + "\"\n" +
        "      }\n" +
        "    });\n" +
        "    callback(" + playerName + ");\n" +
        "  }(function(player){\n" +
        "    player.draw();\n" +
        "  }));\n" +
        "</script>\n";
    console.log("performing document.write");
    document.write(template);
}

function fishwrapperThumbnailEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof(height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof(width) === "undefined" ? 664 : parseInt(width);

    var template = "<div class=" + playerName +
        " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" +
        "  <script>\n" +
        "  $(function(callback) {\n" +
        "    " + playerName + " = new TmzKalturaPlayerView({\n" +
        "      \"where\": \"." + playerName + "\",\n" +
        "      \"cacheSt\": 9999999999,\n" +
        "      \"height\": " + customHeight + ",\n" +
        "      \"width\": " + customWidth + ",\n" +
        "      \"site\": \"fishwrapper\",\n" +
        "      \"endcard\": true,\n" +
        "      \"autoplay\": false,\n" +
        "      \"autoContinue\": false,\n" +
        "      \"thumbnail\": true,\n" +
        "      \"showPlaylist\": false,\n" +
        "      \"playerOptions\": {\n" +
        "        \"entryId\": \"" + entryId + "\"\n" +
        "      }\n" +
        "    });\n" +
        "    callback(" + playerName + ");\n" +
        "  }(function(player){\n" +
        "    player.draw();\n" +
        "  }));\n" +
        "</script>\n";
    console.log("performing document.write");
    document.write(template);
}

function fishwrapperVideoEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof(height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof(width) === "undefined" ? 664 : parseInt(width);

    var template = "<div class=" + playerName +
        " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" +
        "  <script>\n" +
        "  $(function(callback) {\n" +
        "    " + playerName + " = new TmzKalturaPlayerView({\n" +
        "      \"where\": \"." + playerName + "\",\n" +
        "      \"height\": " + customHeight + ",\n" +
        "      \"width\": " + customWidth + ",\n" +
        "      \"cacheSt\": 9999999999,\n" +
        "      \"site\": \"fishwrapper\",\n" +
        "      \"endcard\": true,\n" +
        "      \"autoplay\": false,\n" +
        "      \"autoContinue\": false,\n" +
        "      \"showPlaylist\": false,\n" +
        "      \"playerOptions\": {\n" +
        "        \"entryId\": \"" + entryId + "\"\n" +
        "      }\n" +
        "    });\n" +
        "    callback(" + playerName + ");\n" +
        "  }(function(player){\n" +
        "    player.draw();\n" +
        "  }));\n" +
        "</script>\n";
    console.log("performing document.write");
    document.write(template);
}


