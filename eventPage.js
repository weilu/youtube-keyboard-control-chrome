var parentWindowId = null;
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.name == "togglePlayback" || request.name == "next" || request.name == "previous" || request.name == "replayCurrent") {
      chrome.tabs.getAllInWindow(null, function(tabs){
        for (var i = 0; i < tabs.length; i++) {
          var windowUrl = tabs[i].url;
          if(windowUrl.indexOf("youtube")>0){
            chrome.tabs.sendRequest(tabs[i].id, {name: request.name});
          }                   
        }
      });
    }

    sendResponse({});
 }
);
