var parentWindowId = null;
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name == "togglePlayback" || request.name == "next" || request.name == "previous" || request.name == "replayCurrent") {
      chrome.tabs.query({}, function(tabs){
        for (var i = 0; i < tabs.length; i++) {
          var windowUrl = tabs[i].url;
          if(windowUrl.indexOf("youtube")>0 || windowUrl.indexOf("watch/?v=")>0){
            chrome.tabs.sendMessage(tabs[i].id, {name: request.name});
          }
        }
      });
    }

    sendResponse({});
 }
);
