"use strict";
let player;
let mytimer;
const $ = (selector) => document.querySelector(selector);
const btn_prev = $('#btn_prev');
const btn_play = $('#btn_play');
const btn_pause = $('#btn_pause');
const btn_next = $('#btn_next');
const btn_stop = $('#btn_stop');
const playerWrapper = $('.playerWrapper');
const thumbWrapper = $('.thumbWrapper');
const progressBarWrapper = $('.progressBarWrapper');
const progressBar = $('.progressBar');
const thumb = $('.thumb');
const playerControl = {
    autoPlay: false,
    video: false,
    playlist: ['aR-KAldshAE', 'MPVq30bPq6I', 'jrf0r3ajpmA'],
    playlistIndex: 0,
    state: -1,
    nbSongs: () => playerControl.playlist.length,
    getCurrentSong: () => playerControl.playlist[playerControl.playlistIndex],
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
        playerControl.playlistIndex =
            (playerControl.playlistIndex + playerControl.nbSongs() - 1) % playerControl.nbSongs();
        playerControl.changeVideo();
    },
    next: () => {
        playerControl.playlistIndex =
            (playerControl.playlistIndex + playerControl.nbSongs() + 1) % playerControl.nbSongs();
        playerControl.changeVideo();
    },
    timer: (e) => {
        const currentTime = e.offsetX;
        let playerPercent = progressBarWrapper
            ? (currentTime / (progressBarWrapper === null || progressBarWrapper === void 0 ? void 0 : progressBarWrapper.getBoundingClientRect().width)) * 100
            : 0;
        const time = (playerPercent * player.getDuration()) / 100;
        player.seekTo(time);
        if (playerControl.state === YT.PlayerState.UNSTARTED) {
            playerControl.pause();
        }
        playerControl.progress(playerPercent);
    },
    changeVideo: () => {
        playerControl.progress(0);
        player.loadVideoById(playerControl.getCurrentSong());
        playerControl.showPlay(false);
        playerControl.changeThumb();
    },
    changeThumb: () => {
        if (thumb) {
            thumb.src = `https://i.ytimg.com/vi_webp/${playerControl.getCurrentSong()}/hqdefault.webp`;
        }
    },
    progress: (percent) => {
        const progressBarWidth = (percent * (progressBarWrapper === null || progressBarWrapper === void 0 ? void 0 : progressBarWrapper.getBoundingClientRect().width)) / 100;
        progressBar.style.transitionDuration = progressBarWidth === 0 ? '0s' : '0.1s';
        progressBar.style.width = progressBarWidth + 'px';
    },
    setDisplay: () => {
        if (playerControl.video) {
            playerWrapper.classList.remove('hidden');
            thumbWrapper.classList.add('hidden');
        }
    },
};
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
    playerControl.changeThumb();
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
    playerControl.state = event.data;
    if (playerControl.state === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerPercent = (playerCurrentTime / playerTotalTime) * 100;
            playerControl.progress(playerPercent);
        }, 100);
    }
    else {
        clearTimeout(mytimer);
        if (playerControl.state === YT.PlayerState.ENDED) {
        }
    }
}
