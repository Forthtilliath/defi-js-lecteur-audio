"use strict";
let player;
let mytimer;
const btn_prev = document.querySelector('#btn_prev');
const btn_play = document.querySelector('#btn_play');
const btn_pause = document.querySelector('#btn_pause');
const btn_next = document.querySelector('#btn_next');
const btn_stop = document.querySelector('#btn_stop');
const playerWrapper = document.querySelector('.playerWrapper');
const thumbWrapper = document.querySelector('.thumbWrapper');
const progressBarWrapper = document.querySelector('.progressBarWrapper');
const progressBar = document.querySelector('.progressBar');
const thumb = document.querySelector('.thumb');
const playerControl = {
    autoPlay: false,
    video: false,
    arrSongs: ['aR-KAldshAE', 'MPVq30bPq6I', 'TVJDsACd54I'],
    arrIndex: 0,
    nbSongs: () => playerControl.arrSongs.length,
    getCurrentSong: () => playerControl.arrSongs[playerControl.arrIndex],
    play: () => {
        player.playVideo();
        playerControl.showPlay(false);
    },
    pause: () => {
        player.pauseVideo();
        playerControl.showPlay(true);
    },
    stop: () => {
        player.stopVideo();
        playerControl.showPlay(true);
        if (progressBarWrapper)
            playerControl.progress(0);
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
        playerControl.arrIndex = (playerControl.arrIndex + playerControl.nbSongs() - 1) % playerControl.nbSongs();
        playerControl.changeVideo();
    },
    next: () => {
        playerControl.arrIndex = (playerControl.arrIndex + playerControl.nbSongs() + 1) % playerControl.nbSongs();
        playerControl.changeVideo();
    },
    timer: (e) => {
        const currentTime = e.offsetX;
        let playerPercent = progressBarWrapper
            ? (currentTime / (progressBarWrapper === null || progressBarWrapper === void 0 ? void 0 : progressBarWrapper.getBoundingClientRect().width)) * 100
            : 0;
        if (progressBarWrapper)
            playerControl.progress(playerPercent);
    },
    changeVideo: () => {
        player.loadVideoById(playerControl.getCurrentSong());
        playerControl.showPlay(false);
        playerControl.changeThumb();
    },
    changeThumb: () => {
        if (thumb)
            thumb.src = `https://img.youtube.com/vi/${playerControl.getCurrentSong()}/hqdefault.jpg`;
    },
    progress: (percent) => {
        if (progressBarWrapper) {
            const progressBarWidth = (percent * (progressBarWrapper === null || progressBarWrapper === void 0 ? void 0 : progressBarWrapper.getBoundingClientRect().width)) / 100;
            if (progressBar) {
                progressBar.style.transitionDuration = progressBarWidth === 0 ? '0s' : '0.1s';
                progressBar.style.width = progressBarWidth + 'px';
            }
        }
    },
    setDisplay: () => {
        if (playerControl.video) {
            playerWrapper.classList.remove('hidden');
            thumbWrapper.classList.add('hidden');
        }
    }
};
playerControl.changeThumb();
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: playerControl.getCurrentSong(),
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}
function onPlayerReady(event) {
    if (playerControl.autoPlay)
        event.target.playVideo();
    btn_prev === null || btn_prev === void 0 ? void 0 : btn_prev.addEventListener('click', playerControl.prev);
    btn_play === null || btn_play === void 0 ? void 0 : btn_play.addEventListener('click', playerControl.play);
    btn_pause === null || btn_pause === void 0 ? void 0 : btn_pause.addEventListener('click', playerControl.pause);
    btn_stop === null || btn_stop === void 0 ? void 0 : btn_stop.addEventListener('click', playerControl.stop);
    btn_next === null || btn_next === void 0 ? void 0 : btn_next.addEventListener('click', playerControl.next);
    progressBarWrapper === null || progressBarWrapper === void 0 ? void 0 : progressBarWrapper.addEventListener('click', playerControl.timer);
}
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerPercent = (playerCurrentTime / playerTotalTime) * 100;
            if (progressBarWrapper)
                playerControl.progress(playerPercent);
        }, 100);
    }
    else {
        clearTimeout(mytimer);
        if (event.data === YT.PlayerState.ENDED) {
        }
    }
}
