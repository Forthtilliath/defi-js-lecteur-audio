declare const YT: {
    Player: new (arg0: string, arg1: Options) => YouTubePlayer;
    PlayerState: EPlayerStates;
};

interface EPlayerStates {
    BUFFERING: number = 3;
    ENDED: number = 0;
    PAUSED: number = 2;
    PLAYING: number = 1;
    UNSTARTED: number = -1;
    VIDEO_CUED: number = 5;
}

interface IYoutubePlayer {
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
        onReady: (event: { target: IPlayer }) => void;
        onStateChange: (event: { data: number }) => void;
    };
}

interface IframeApiType {
    Player: { new (elementId: string, options: Options): YouTubePlayer };
}

interface Options {
    width?: number | string | undefined;
    height?: number | string | undefined;
    videoId?: string | undefined;
    playerVars?:
        | {
              autoplay?: 0 | 1 | undefined;
              cc_lang_pref?: string | undefined;
              cc_load_policy?: 1 | undefined;
              color?: 'red' | 'white' | undefined;
              controls?: 0 | 1 | undefined;
              disablekb?: 0 | 1 | undefined;
              enablejsapi?: 0 | 1 | undefined;
              end?: number | undefined;
              fs?: 0 | 1 | undefined;
              hl?: string | undefined;
              iv_load_policy?: 1 | 3 | undefined;
              list?: string | undefined;
              listType?: 'playlist' | 'search' | 'user_uploads' | undefined;
              loop?: 0 | 1 | undefined;
              modestbranding?: 1 | undefined;
              origin?: string | undefined;
              playlist?: string | undefined;
              playsinline?: 0 | 1 | undefined;
              rel?: 0 | 1 | undefined;
              start?: number | undefined;
              widget_referrer?: string | undefined;
          }
        | undefined;
    events?: {
        onReady: (event: { target: YoutubePlayer }) => void;
        onStateChange: (event: { data: number }) => void;
    };
}

interface YouTubePlayer {
    addEventListener(event: string, listener: (event: CustomEvent) => void): void;
    destroy(): void;
    getAvailablePlaybackRates(): ReadonlyArray<number>;
    getAvailableQualityLevels(): ReadonlyArray<string>;
    getCurrentTime(): number;
    getDuration(): number;
    getIframe(): HTMLIFrameElement;
    getOption(module: string, option: string): any;
    getOptions(): string[];
    getOptions(module: string): object;
    setOption(module: string, option: string, value: any): void;
    setOptions(): void;
    cuePlaylist(
        playlist: string | ReadonlyArray<string>,
        index?: number,
        startSeconds?: number,
        suggestedQuality?: string,
    ): void;
    cuePlaylist(playlist: {
        listType: string;
        list?: string | undefined;
        index?: number | undefined;
        startSeconds?: number | undefined;
        suggestedQuality?: string | undefined;
    }): void;
    loadPlaylist(
        playlist: string | ReadonlyArray<string>,
        index?: number,
        startSeconds?: number,
        suggestedQuality?: string,
    ): void;
    loadPlaylist(playlist: {
        listType: string;
        list?: string | undefined;
        index?: number | undefined;
        startSeconds?: number | undefined;
        suggestedQuality?: string | undefined;
    }): void;
    getPlaylist(): ReadonlyArray<string>;
    getPlaylistIndex(): number;
    getPlaybackQuality(): string;
    getPlaybackRate(): number;
    getPlayerState(): PlayerState;
    getVideoEmbedCode(): string;
    getVideoLoadedFraction(): number;
    getVideoUrl(): string;
    getVolume(): number;
    cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): void;
    cueVideoById(video: {
        videoId: string;
        startSeconds?: number | undefined;
        endSeconds?: number | undefined;
        suggestedQuality?: string | undefined;
    }): void;
    cueVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: string): void;
    cueVideoByUrl(video: {
        mediaContentUrl: string;
        startSeconds?: number | undefined;
        endSeconds?: number | undefined;
        suggestedQuality?: string | undefined;
    }): void;
    loadVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: string): void;
    loadVideoByUrl(video: {
        mediaContentUrl: string;
        startSeconds?: number | undefined;
        endSeconds?: number | undefined;
        suggestedQuality?: string | undefined;
    }): void;
    loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): void;
    loadVideoById(video: {
        videoId: string;
        startSeconds?: number | undefined;
        endSeconds?: number | undefined;
        suggestedQuality?: string | undefined;
    }): void;
    isMuted(): boolean;
    mute(): void;
    nextVideo(): void;
    pauseVideo(): void;
    playVideo(): void;
    playVideoAt(index: number): void;
    previousVideo(): void;
    removeEventListener(event: string, listener: (event: CustomEvent) => void): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    setLoop(loopPlaylists: boolean): void;
    setPlaybackQuality(suggestedQuality: string): void;
    setPlaybackRate(suggestedRate: number): void;
    setShuffle(shufflePlaylist: boolean): void;
    setSize(width: number, height: number): object;
    setVolume(volume: number): void;
    stopVideo(): void;
    unMute(): void;
    on(eventType: 'stateChange', listener: (event: CustomEvent & { data: number }) => void): void;
    on(eventType: EventType, listener: (event: CustomEvent) => void): void;
}
