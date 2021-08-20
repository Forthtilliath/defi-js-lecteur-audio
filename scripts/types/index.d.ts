declare let player: IPlayer;
declare const btn_prev: HTMLButtonElement | null;
declare const btn_play: HTMLButtonElement | null;
declare const btn_pause: HTMLButtonElement | null;
declare const btn_next: HTMLButtonElement | null;
declare const btn_stop: HTMLButtonElement | null;
declare const progressBarWrapper: HTMLDivElement | null;
declare const progressBar: HTMLDivElement | null;
declare const thumb: HTMLImageElement | null;
declare const arrSongs: string[];
declare let arrIndex: number;
declare const playerActions: {
    autoPlay: boolean;
    play: () => void;
    pause: () => void;
    stop: () => void;
    showPlay: (showPlay: boolean) => void;
    prev: () => void;
    next: () => void;
    changeVideo: () => void;
    changeThumb: () => void;
};
declare function onYouTubeIframeAPIReady(): void;
declare function onPlayerReady(): void;
declare function onPlayerStateChange(event: {
    data: any;
}): void;
declare function progress(percent: number, element: Element): void;
