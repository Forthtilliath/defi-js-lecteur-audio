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
            }
            events?: {
                onReady: () => void;
                onStateChange: (event: { data: any }) => void;
            };
        },
    ) => { playVideo: () => void; pauseVideo: () => void; getDuration: () => any; getCurrentTime: () => any };
    PlayerState: { PLAYING: number;ENDED:number };
};
