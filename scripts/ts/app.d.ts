declare const YT: {
    Player: new (
        arg0: string,
        arg1: {
            height?: number;
            width?: number;
            videoId?: string;
            playerVars?: {
                autoplay?: number;
                controls?: number;
                showinfo?: number;
                rel?: number;
            };
            events?: {
                onReady: (event: { target: { playVideo: () => void } }) => void;
                onStateChange: (event: { data: any }) => void;
            };
        },
    ) => IPlayer;
    PlayerState: { UNSTARTED: number; PLAYING: number; ENDED: number; PAUSED: number; BUFFERING:number };
};

declare interface IPlayer {
    loadVideoById: (arg0: string) => void;
    playVideo: () => void;
    stopVideo: () => void;
    pauseVideo: () => void;
    getDuration: () => number;
    getCurrentTime: () => number;
}