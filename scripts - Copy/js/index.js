"use strict";
let player;
const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const progressbar = document.querySelector('#progressBar');
function onYouTubePlayerAPIReady() {
    player = new YT.Player('video', {
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}
function onPlayerReady() {
    playButton === null || playButton === void 0 ? void 0 : playButton.addEventListener('click', function () {
        player.playVideo();
    });
    pauseButton === null || pauseButton === void 0 ? void 0 : pauseButton.addEventListener('click', function () {
        player.pauseVideo();
    });
}
function progress(percent, element) {
    var progressBarWidth = (percent * (element === null || element === void 0 ? void 0 : element.getBoundingClientRect().width)) / 100;
    const div = element.querySelector('div');
    if (div)
        div.style.width = progressBarWidth + 'px';
}
function onPlayerStateChange(event) {
    let mytimer;
    if (event.data == YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
            progressbar && progress(playerTimeDifference, progressbar);
        }, 1000);
    }
    else {
        clearTimeout(mytimer);
    }
}
