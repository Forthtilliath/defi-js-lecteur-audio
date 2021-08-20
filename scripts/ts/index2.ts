let player: IPlayer;

const btn_prev: HTMLButtonElement | null = document.querySelector('#btn_prev');
const btn_play: HTMLButtonElement | null = document.querySelector('#btn_play');
const btn_pause: HTMLButtonElement | null = document.querySelector('#btn_pause');
const btn_next : HTMLButtonElement | null= document.querySelector('#btn_next');
const progressbar: HTMLDivElement | null = document.querySelector('#progressBar');

const arrSongs = ['sEQf5lcnj_o', 'TVJDsACd54I'];
const arrIndex = 0;

const playerActions = {
    autoPlay: false,
    play: (): void => {
        player.playVideo();
    },
    pause: () => {
        player.pauseVideo();
    },
    stop: () => {
        player.stopVideo();
    },
    tigglePlayPause: () => {
        btn_play;
    },
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
    btn_prev?.addEventListener('click', () => player.loadVideoById(arrSongs[arrIndex]));
    btn_play?.addEventListener('click', playerActions.play);
    btn_pause?.addEventListener('click', playerActions.pause);
    btn_next?.addEventListener('click', playerActions.stop);
}

function onPlayerStateChange(event: { data: any }) {
    let mytimer;
    if (event.data === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
            progressbar && progress(playerTimeDifference, progressbar);
        }, 1000);
    } else {
        clearTimeout(mytimer);
    }
}

function progress(percent: number, element: Element) {
    var progressBarWidth = (percent * element?.getBoundingClientRect().width) / 100;
    const div = element.querySelector('div');
    if (div) div.style.width = progressBarWidth + 'px';
}
