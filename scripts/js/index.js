var player;
const progressbar = document.querySelector('#progressBar');

function onYouTubePlayerAPIReady() {
    console.log('onYouTubePlayerAPIReady');
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

function progress2(percent, element) {
    var progressBarWidth = percent * element.getBoundingClientRect().width / 100;
    element.querySelector('div').style.width = progressBarWidth + 'px';
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        var playerTotalTime = player.getDuration();
        var mytimer = setInterval(function() {
            var playerCurrentTime = player.getCurrentTime();
            var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
            progress2(playerTimeDifference, progressbar);
        }, 1000);        
    } else {
        clearTimeout(mytimer);
    }
}
