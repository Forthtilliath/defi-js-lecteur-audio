let player: IPlayer;

const btn_prev: HTMLButtonElement | null = document.querySelector('#btn_prev');
const btn_play: HTMLButtonElement | null = document.querySelector('#btn_play');
const btn_pause: HTMLButtonElement | null = document.querySelector('#btn_pause');
const btn_next : HTMLButtonElement | null= document.querySelector('#btn_next');
const btn_stop : HTMLButtonElement | null= document.querySelector('#btn_stop');
const progressBarWrapper: HTMLDivElement | null = document.querySelector('.progressBarWrapper');
const progressBar: HTMLDivElement | null = document.querySelector('.progressBar');
const thumb: HTMLImageElement | null = document.querySelector('.thumb');

const arrSongs = ['sEQf5lcnj_o', 'TVJDsACd54I'];
let arrIndex = 0;

const playerActions = {
    autoPlay: false,
    play: (): void => {
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
        if(progressBarWrapper) progress(0, progressBarWrapper);
    },
    showPlay: (showPlay:boolean) => {
        if (showPlay) {
            btn_play?.classList.remove('hidden');
            btn_pause?.classList.add('hidden');
        } else {
            btn_pause?.classList.remove('hidden');
            btn_play?.classList.add('hidden');
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
        if (thumb) thumb.src = `https://img.youtube.com/vi/${arrSongs[arrIndex]}/hqdefault.jpg`;
    },
    changeThumb: () => {

    }
};

/**Fonction de l'API Youtube, lancée automatiquement une fois l'API chargée */
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

/** Est lancé une fois l'API prête à lancer la vidéo/musique */
function onPlayerReady() {
    //event.target.playVideo();
    btn_prev?.addEventListener('click', playerActions.prev);
    btn_play?.addEventListener('click', playerActions.play);
    btn_pause?.addEventListener('click', playerActions.pause);
    btn_stop?.addEventListener('click', playerActions.stop);
    btn_next?.addEventListener('click', playerActions.next);
}

function onPlayerStateChange(event: { data: any }) {
    let mytimer;
    if (event.data === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
            if (progressBarWrapper) progress(playerTimeDifference, progressBarWrapper);
        }, 1000);
    } else {
        clearTimeout(mytimer);
    }
}

function progress(percent: number, element: Element) {
    var progressBarWidth = (percent * element?.getBoundingClientRect().width) / 100;
    if (progressBar) progressBar.style.width = progressBarWidth + 'px';
}
