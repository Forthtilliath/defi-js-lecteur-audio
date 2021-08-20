declare let player: IPlayer;
declare const btn_prev: HTMLButtonElement | null;
declare const btn_play: HTMLButtonElement | null;
declare const btn_pause: HTMLButtonElement | null;
declare const btn_next: HTMLButtonElement | null;
declare const progressbar: HTMLDivElement | null;
declare const arrSongs: string[];
declare const arrIndex = 0;
declare const playerActions: {
    autoPlay: boolean;
    play: () => void;
    pause: () => void;
    stop: () => void;
    tigglePlayPause: () => void;
};
declare function onYouTubeIframeAPIReady(): void;
declare function onPlayerReady(): void;
declare function onPlayerStateChange(event: {
    data: any;
}): void;
declare function progress(percent: number, element: Element): void;
