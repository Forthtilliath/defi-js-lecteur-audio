"use strict";
let player;
const btn_prev = document.querySelector('#btn_prev');
const btn_play = document.querySelector('#btn_play');
const btn_pause = document.querySelector('#btn_pause');
const btn_next = document.querySelector('#btn_next');
const btn_stop = document.querySelector('#btn_stop');
const progressBarWrapper = document.querySelector('.progressBarWrapper');
const progressBar = document.querySelector('.progressBar');
const thumb = document.querySelector('.thumb');
const arrSongs = ['sEQf5lcnj_o', 'TVJDsACd54I'];
let arrIndex = 0;
const playerActions = {
    autoPlay: false,
    play: () => {
        player.playVideo();
        playerActions.showPlay(false);
    },
    pause: () => {
        player.pauseVideo();
        playerActions.showPlay(true);
    },
    stop: () => {
        player.stopVideo();
        playerActions.showPlay(true);
        if (progressBarWrapper)
            progress(0, progressBarWrapper);
    },
    showPlay: (showPlay) => {
        if (showPlay) {
            btn_play === null || btn_play === void 0 ? void 0 : btn_play.classList.remove('hidden');
            btn_pause === null || btn_pause === void 0 ? void 0 : btn_pause.classList.add('hidden');
        }
        else {
            btn_pause === null || btn_pause === void 0 ? void 0 : btn_pause.classList.remove('hidden');
            btn_play === null || btn_play === void 0 ? void 0 : btn_play.classList.add('hidden');
        }
    },
    prev: () => {
        arrIndex = (arrIndex + arrSongs.length - 1) % arrSongs.length;
        playerActions.changeVideo();
    },
    next: () => {
        arrIndex = (arrIndex + arrSongs.length + 1) % arrSongs.length;
        playerActions.changeVideo();
    },
    changeVideo: () => {
        player.loadVideoById(arrSongs[arrIndex]);
        playerActions.showPlay(false);
        if (thumb)
            thumb.src = `https://img.youtube.com/vi/${arrSongs[arrIndex]}/hqdefault.jpg`;
    },
    changeThumb: () => {
    }
};
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: 0,
        width: 0,
        videoId: arrSongs[arrIndex],
        playerVars: {
            autoplay: 0,
            controls: 1,
            showinfo: 0,
            rel: 0,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}
function onPlayerReady() {
    btn_prev === null || btn_prev === void 0 ? void 0 : btn_prev.addEventListener('click', playerActions.prev);
    btn_play === null || btn_play === void 0 ? void 0 : btn_play.addEventListener('click', playerActions.play);
    btn_pause === null || btn_pause === void 0 ? void 0 : btn_pause.addEventListener('click', playerActions.pause);
    btn_stop === null || btn_stop === void 0 ? void 0 : btn_stop.addEventListener('click', playerActions.stop);
    btn_next === null || btn_next === void 0 ? void 0 : btn_next.addEventListener('click', playerActions.next);
}
function onPlayerStateChange(event) {
    let mytimer;
    if (event.data === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
            if (progressBarWrapper)
                progress(playerTimeDifference, progressBarWrapper);
        }, 1000);
    }
    else {
        clearTimeout(mytimer);
    }
}
function progress(percent, element) {
    var progressBarWidth = (percent * (element === null || element === void 0 ? void 0 : element.getBoundingClientRect().width)) / 100;
    if (progressBar)
        progressBar.style.width = progressBarWidth + 'px';
}
