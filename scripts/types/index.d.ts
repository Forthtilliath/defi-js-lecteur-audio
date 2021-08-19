declare let player: {
    playVideo: () => void;
    pauseVideo: () => void;
    getDuration: () => any;
    getCurrentTime: () => any;
};
declare const playButton: Element | null;
declare const pauseButton: Element | null;
declare const progressbar: Element | null;
declare function onYouTubePlayerAPIReady(): void;
declare function onPlayerReady(): void;
declare function progress(percent: number, element: Element): void;
declare function onPlayerStateChange(event: {
    data: any;
}): void;
