let player: YouTubePlayer;
let mytimer: number;

const btn_prev: HTMLButtonElement | null = document.querySelector('#btn_prev');
const btn_play: HTMLButtonElement | null = document.querySelector('#btn_play');
const btn_pause: HTMLButtonElement | null = document.querySelector('#btn_pause');
const btn_next: HTMLButtonElement | null = document.querySelector('#btn_next');
const btn_stop: HTMLButtonElement | null = document.querySelector('#btn_stop');
const playerWrapper: HTMLDivElement = document.querySelector('.playerWrapper') as HTMLDivElement;
const thumbWrapper: HTMLDivElement = document.querySelector('.thumbWrapper') as HTMLDivElement;
const progressBarWrapper: HTMLDivElement | null = document.querySelector('.progressBarWrapper');
const progressBar: HTMLDivElement | null = document.querySelector('.progressBar');
const thumb: HTMLImageElement | null = document.querySelector('.thumb');

// const arrSongs = ['MPVq30bPq6I', 'sEQf5lcnj_o', 'TVJDsACd54I'];
// let arrIndex = 0;

const playerControl = {
    autoPlay: false,
    video: false,
    arrSongs: [ 'aR-KAldshAE', 'MPVq30bPq6I','TVJDsACd54I'],
    arrIndex: 0,
    nbSongs: () => playerControl.arrSongs.length,

    getCurrentSong: () => playerControl.arrSongs[playerControl.arrIndex],

    play: (): void => {
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
        if (progressBarWrapper) playerControl.progress(0);
    },
    showPlay: (showPlay: boolean) => {
        if (showPlay) {
            btn_play?.classList.remove('hidden');
            btn_pause?.classList.add('hidden');
        } else {
            btn_pause?.classList.remove('hidden');
            btn_play?.classList.add('hidden');
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

    timer: (e: MouseEvent) => {
        const currentTime = e.offsetX;
        // player.setCurrentTime(currentTime);
        let playerPercent = progressBarWrapper
            ? (currentTime / progressBarWrapper?.getBoundingClientRect().width) * 100
            : 0;
        
        if (progressBarWrapper) playerControl.progress(playerPercent);
    },

    changeVideo: () => {
        player.loadVideoById(playerControl.getCurrentSong());
        playerControl.showPlay(false);
        playerControl.changeThumb();
    },

    changeThumb: () => {
        if (thumb) thumb.src = `https://img.youtube.com/vi/${playerControl.getCurrentSong()}/hqdefault.jpg`;
    },

    progress: (percent: number) => {
        if (progressBarWrapper) {
            const progressBarWidth = (percent * progressBarWrapper?.getBoundingClientRect().width) / 100;
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

/**Fonction de l'API Youtube, lancée automatiquement une fois l'API chargée */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: playerControl.getCurrentSong(),
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

/** Est lancé une fois l'API prête à lancer la vidéo/musique */
function onPlayerReady(event: { target: YouTubePlayer }) {
    if (playerControl.autoPlay) event.target.playVideo();
    btn_prev?.addEventListener('click', playerControl.prev);
    btn_play?.addEventListener('click', playerControl.play);
    btn_pause?.addEventListener('click', playerControl.pause);
    btn_stop?.addEventListener('click', playerControl.stop);
    btn_next?.addEventListener('click', playerControl.next);
    progressBarWrapper?.addEventListener('click', playerControl.timer);
}

function onPlayerStateChange(event: { data: number }) {
    if (event.data === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerPercent = (playerCurrentTime / playerTotalTime) * 100;
            if (progressBarWrapper) playerControl.progress(playerPercent);
        }, 100);
    } else {
        clearTimeout(mytimer);
    }
}
