"use strict";
let player;
let mytimer;
const $ = (selector) => document.querySelector(selector);
const btn_prev = $('#btn_prev');
const btn_play = $('#btn_play');
const btn_pause = $('#btn_pause');
const btn_next = $('#btn_next');
const btn_stop = $('#btn_stop');
const btn_random = $('#btn_random');
const btn_repeat = $('#btn_repeat');
const playerWrapper = $('.playerWrapper');
const titleWrapper = $('.titleWrapper > .title');
const thumbWrapper = $('.thumbWrapper');
const progressBarWrapper = $('.progressBarWrapper');
const progressBar = $('.progressBar');
const thumb = $('.thumb');
const playerControl = {
    autoPlay: false,
    video: false,
    playlist: ['aR-KAldshAE', 'MPVq30bPq6I', 'jrf0r3ajpmA', 'nEwzFF4HeB8'],
    playlistIndex: 0,
    state: -1,
    shuffle: false,
    repeatOne: false,
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
        playerControl.playlistIndex = playerControl.shuffle ? playerControl.shuffleIndex() : playerControl.prevIndex();
        playerControl.changeVideo();
    },
    next: () => {
        playerControl.playlistIndex = playerControl.shuffle ? playerControl.shuffleIndex() : playerControl.prevIndex();
        playerControl.changeVideo();
    },
    setRepeat: () => {
        playerControl.repeatOne = !playerControl.repeatOne;
        playerControl.setButtonRepeat();
    },
    setButtonRepeat: () => btn_repeat.classList.toggle('active'),
    setShuffle: () => {
        playerControl.shuffle = !playerControl.shuffle;
        playerControl.setButtonShuffle();
    },
    setButtonShuffle: () => btn_random.classList.toggle('active'),
    shuffleIndex: () => {
        return [...playerControl.playlist.keys()]
            .filter((i) => i !== playerControl.playlistIndex)
            .sort(() => Math.random() - 0.5)
            .pop();
    },
    nextIndex: () => (playerControl.playlistIndex + playerControl.nbSongs() - 1) % playerControl.nbSongs(),
    prevIndex: () => (playerControl.playlistIndex + playerControl.nbSongs() + 1) % playerControl.nbSongs(),
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
        playerControl.changeTitle();
    },
    changeThumb: () => {
        if (thumb) {
            thumb.src = `https://i.ytimg.com/vi_webp/${playerControl.getCurrentSong()}/maxresdefault.webp`;
        }
    },
    changeTitle: () => {
        fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${playerControl.getCurrentSong()}`)
            .then((data) => data.json())
            .then((data) => (titleWrapper.innerText = data.title));
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
    setBackground: () => {
        let rand1 = ~~(Math.random() * 10 + 40);
        let rand2 = ~~(Math.random() * 10 - 10);
        document.querySelector('.playerContainer').style.boxShadow = `0 0 ${rand1}px ${rand2}px #cc0000`;
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
    thumb.style.width = "100%";
    playerControl.changeThumb();
    playerControl.changeTitle();
    if (playerControl.autoPlay)
        event.target.playVideo();
    if (playerControl.shuffle)
        playerControl.setButtonShuffle();
    btn_prev.addEventListener('click', playerControl.prev);
    btn_play.addEventListener('click', playerControl.play);
    btn_pause.addEventListener('click', playerControl.pause);
    btn_stop.addEventListener('click', playerControl.stop);
    btn_next.addEventListener('click', playerControl.next);
    btn_random.addEventListener('click', playerControl.setShuffle);
    btn_repeat.addEventListener('click', playerControl.setRepeat);
    progressBarWrapper.addEventListener('click', playerControl.timer);
}
function onPlayerStateChange(event) {
    playerControl.state = event.data;
    console.log('state', playerControl.state);
    if (playerControl.state === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerPercent = (playerCurrentTime / playerTotalTime) * 100;
            playerControl.progress(playerPercent);
            playerControl.setBackground();
        }, 100);
    }
    else {
        clearTimeout(mytimer);
        if (playerControl.state === YT.PlayerState.ENDED) {
            if (playerControl.repeatOne)
                playerControl.changeVideo();
            else
                playerControl.next();
        }
    }
}
