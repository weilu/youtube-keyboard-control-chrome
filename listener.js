
	console.log("in content script listener.js");
	window.addEventListener("keyup", keyListener, false);
	
	var url = window.location.host;
	console.log("url: " + url);
	if(url.indexOf("youtube")>0){
		console.log("it's youtube!");
		chrome.extension.onRequest.addListener(
	  		youtubeListener
		);
	};
	
	function youtubeListener(request, sender, sendResponse){
			console.log("appending player control listener");
			if (request.name.length>0) {
				console.log(request.name );
				
				var player = document.getElementById('movie_player');
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
							document.getElementById('playlist-bar-next-button').click();
						}
						else if (request.name == "previous") {
							document.getElementById('playlist-bar-prev-button').click();
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
		console.log("HELLO!");
		var player = document.getElementById('movie_player');
		if(player.getPlayerState()==0){
			player.seekTo(0,true)
		}
	};*/
	
	function keyListener(e) {
	  	if (e.ctrlKey && e.keyCode) {
		  if (e.keyCode == 220) {
			console.log("key action \ detected");
		    chrome.extension.sendRequest({name: "togglePlayback"});
		  }
		  if (e.keyCode == 221) {
			console.log("key action ] detected");
		    chrome.extension.sendRequest({name: "next"});
		  }
		  if (e.keyCode == 219) {
			console.log("key action [ detected");
		    chrome.extension.sendRequest({name: "previous"});
		  }
		  if (e.keyCode == 222) {
			console.log("key action ' detected");
		    chrome.extension.sendRequest({name: "replayCurrent"});
		  }
		}
	};
	
	
