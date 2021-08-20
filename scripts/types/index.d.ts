declare let player: YouTubePlayer;
declare let mytimer: number;
declare const btn_prev: HTMLButtonElement | null;
declare const btn_play: HTMLButtonElement | null;
declare const btn_pause: HTMLButtonElement | null;
declare const btn_next: HTMLButtonElement | null;
declare const btn_stop: HTMLButtonElement | null;
declare const playerWrapper: HTMLDivElement;
declare const thumbWrapper: HTMLDivElement;
declare const progressBarWrapper: HTMLDivElement | null;
declare const progressBar: HTMLDivElement | null;
declare const thumb: HTMLImageElement | null;
declare const playerControl: {
    autoPlay: boolean;
    video: boolean;
    arrSongs: string[];
    arrIndex: number;
    nbSongs: () => number;
    getCurrentSong: () => string;
    play: () => void;
    pause: () => void;
    stop: () => void;
    showPlay: (showPlay: boolean) => void;
    prev: () => void;
    next: () => void;
    timer: (e: MouseEvent) => void;
    changeVideo: () => void;
    changeThumb: () => void;
    progress: (percent: number) => void;
    setDisplay: () => void;
};
declare function onYouTubeIframeAPIReady(): void;
declare function onPlayerReady(event: {
    target: YouTubePlayer;
}): void;
declare function onPlayerStateChange(event: {
    data: number;
}): void;
