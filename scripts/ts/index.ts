let player: YouTubePlayer;
let mytimer: number;

const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

const btn_prev: HTMLButtonElement = $('#btn_prev') as HTMLButtonElement;
const btn_play: HTMLButtonElement = $('#btn_play') as HTMLButtonElement;
const btn_pause: HTMLButtonElement = $('#btn_pause') as HTMLButtonElement;
const btn_next: HTMLButtonElement = $('#btn_next') as HTMLButtonElement;
const btn_stop: HTMLButtonElement = $('#btn_stop') as HTMLButtonElement;
const playerWrapper: HTMLDivElement = $('.playerWrapper') as HTMLDivElement;
const thumbWrapper: HTMLDivElement = $('.thumbWrapper') as HTMLDivElement;
const progressBarWrapper: HTMLDivElement = $('.progressBarWrapper') as HTMLDivElement;
const progressBar: HTMLDivElement = $('.progressBar') as HTMLDivElement;
const thumb: HTMLImageElement = $('.thumb') as HTMLImageElement;

const playerControl = {
    /** Démarre automatiquement au chargement */
    autoPlay: false,
    /** Affiche vidéo ou image */
    video: false,
    /** Playlist */
    playlist: ['aR-KAldshAE', 'MPVq30bPq6I', 'jrf0r3ajpmA'],
    playlistIndex: 0,
    /** Etat de la vidéo */
    state: -1,

    /** Nombre de sons dans la playlist */
    nbSongs: () => playerControl.playlist.length,

    /** Id de la video en cours */
    getCurrentSong: () => playerControl.playlist[playerControl.playlistIndex],

    /** Met en lecture la video */
    play: (): void => {
        player.playVideo();
        playerControl.showPlay(false);
    },
    /** Met en pause la vidéo */
    pause: () => {
        player.pauseVideo();
        playerControl.showPlay(true);
    },
    /** Arrete la vidéo */
    stop: () => {
        player.stopVideo();
        playerControl.showPlay(true);
        playerControl.progress(0);
    },
    /** Affiche ou non le bouton play (sinon le bouton pause) */
    showPlay: (showPlay: boolean) => {
        if (showPlay) {
            btn_play?.classList.remove('hidden');
            btn_pause?.classList.add('hidden');
        } else {
            btn_pause?.classList.remove('hidden');
            btn_play?.classList.add('hidden');
        }
    },
    /** Met la vidéo précédente */
    prev: () => {
        playerControl.playlistIndex =
            (playerControl.playlistIndex + playerControl.nbSongs() - 1) % playerControl.nbSongs();
        playerControl.changeVideo();
    },
    /** Met la vidéo suivante */
    next: () => {
        playerControl.playlistIndex =
            (playerControl.playlistIndex + playerControl.nbSongs() + 1) % playerControl.nbSongs();
        playerControl.changeVideo();
    },

    /** Event si l'utilisateur clic sur la barre de progression */
    timer: (e: MouseEvent) => {
        const currentTime = e.offsetX;

        // Récupère le pourcentage du clic par rapport à la taille du wrapper
        let playerPercent = progressBarWrapper
            ? (currentTime / progressBarWrapper?.getBoundingClientRect().width) * 100
            : 0;
        // Récupère la duration en seconde
        const time = (playerPercent * player.getDuration()) / 100;

        player.seekTo(time);
        // SeekTo lance la vidéo si elle n'est pas commencée, je la met donc directement en pause
        if (playerControl.state === YT.PlayerState.UNSTARTED) {
            playerControl.pause();
        }

        playerControl.progress(playerPercent);
    },

    /** Modifie la vidéo en cours */
    changeVideo: () => {
        playerControl.progress(0);
        player.loadVideoById(playerControl.getCurrentSong());
        playerControl.showPlay(false);
        playerControl.changeThumb();
    },

    /** Modifie l'image affichée */
    changeThumb: () => {
        if (thumb) {
            thumb.src = `https://i.ytimg.com/vi_webp/${playerControl.getCurrentSong()}/hqdefault.webp`;
        }
    },

    /** Met à jour la barre de progression de la vidéo */
    progress: (percent: number) => {
        const progressBarWidth = (percent * progressBarWrapper?.getBoundingClientRect().width) / 100;

        progressBar.style.transitionDuration = progressBarWidth === 0 ? '0s' : '0.1s';
        progressBar.style.width = progressBarWidth + 'px';
    },

    /** Met à jour l'affichage, par défaut l'image est affichée */
    setDisplay: () => {
        if (playerControl.video) {
            playerWrapper.classList.remove('hidden');
            thumbWrapper.classList.add('hidden');
        }
    },
};

/** Fonction de l'API Youtube, lancée automatiquement une fois l'API chargée */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: playerControl.getCurrentSong(),
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

/** Est lancée une fois l'API prête à lancer la vidéo/musique */
function onPlayerReady(event: { target: YouTubePlayer }) {
    playerControl.changeThumb();

    if (playerControl.autoPlay) event.target.playVideo();

    // Events
    btn_prev?.addEventListener('click', playerControl.prev);
    btn_play?.addEventListener('click', playerControl.play);
    btn_pause?.addEventListener('click', playerControl.pause);
    btn_stop?.addEventListener('click', playerControl.stop);
    btn_next?.addEventListener('click', playerControl.next);
    progressBarWrapper?.addEventListener('click', playerControl.timer);
}

/** Est lancée à chaque changement d'état */
function onPlayerStateChange(event: { data: number }) {
    playerControl.state = event.data;
    console.log('state', playerControl.state); 

    if (playerControl.state === YT.PlayerState.PLAYING) {
        let playerTotalTime = player.getDuration();
        mytimer = setInterval(function () {
            let playerCurrentTime = player.getCurrentTime();
            let playerPercent = (playerCurrentTime / playerTotalTime) * 100;
            playerControl.progress(playerPercent);
        }, 100);
    } else {
        clearTimeout(mytimer);
        if (playerControl.state === YT.PlayerState.ENDED) {
            playerControl.next();
        }
    }
}
