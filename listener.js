window.addEventListener("keyup", keyListener, false);

if(window.location.host.indexOf("youtube")>0 || window.location.toString().indexOf("watch/?v=")>0){
  chrome.extension.onMessage.addListener(youtubeListener);
};

function youtubeListener(request, sender, sendResponse){
  var player, button;
  if (request.name.length>0) {
    player = document.getElementById('movie_player') || document.getElementById('ytPlayer');
    if(player!=null){
      if (request.name == "togglePlayback"){
        if(player.getPlayerState()==1) //playing
          player.pauseVideo();
        else if(player.getPlayerState()==0) //ended
          player.seekTo(0,true);
        else
          player.playVideo();
      }
      else{
        if (request.name == "next") {
          button = document.getElementById('watch7-playlist-bar-next-button');
          if(button) button.click();
        }
        else if (request.name == "previous") {
          button = document.getElementById('watch7-playlist-bar-prev-button');
          if(button) button.click();
        }
        else if (request.name == "replayCurrent") {
          //document.getElementById('playlist-bar-autoplay-button').click();
          //player.addEventListener("onStateChange", loopCurrent);
        }
      }
    }
  }

  sendResponse({});
};

/*function loopCurrent(){
  var player = document.getElementById('movie_player');
  if(player.getPlayerState()==0){
    player.seekTo(0,true)
  }
};*/

function keyListener(e) {
  if (e.ctrlKey && e.keyCode) {
    if (e.keyCode == 220) {
      chrome.extension.sendMessage({name: "togglePlayback"});
    }
    if (e.keyCode == 221) {
      chrome.extension.sendMessage({name: "next"});
    }
    if (e.keyCode == 219) {
      chrome.extension.sendMessage({name: "previous"});
    }
    if (e.keyCode == 222) {
      chrome.extension.sendMessage({name: "replayCurrent"});
    }
  }
};

