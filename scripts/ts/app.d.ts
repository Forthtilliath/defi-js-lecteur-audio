declare const YT: {
    Player: new (
        arg0: string,
        arg1: { events: { onReady: () => void; onStateChange: (event: { data: any }) => void } },
    ) => { playVideo: () => void; pauseVideo: () => void; getDuration: () => any; getCurrentTime: () => any };
    PlayerState: { PLAYING: any };
};