var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('video', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    var playButton = document.getElementById("play"),
        pauseButton = document.getElementById("pause");
    
    playButton.addEventListener("click", function () {
        player.playVideo();
    });
  
    pauseButton.addEventListener("click", function() {
        player.pauseVideo();
    });
}

function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ 
        width: progressBarWidth 
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        var playerTotalTime = player.getDuration();
        var mytimer = setInterval(function() {
            var playerCurrentTime = player.getCurrentTime();
            var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
            console.log(playerCurrentTime);
            progress(playerTimeDifference, $('#progressBar'));
        }, 1000);        
    } else {
        clearTimeout(mytimer);
    }
}



var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// onYouTubePlayerAPIReady();