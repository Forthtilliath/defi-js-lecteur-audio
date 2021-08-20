let player;

      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: 390,
          width: 640,
          videoId: 'ussCHoQttyQ',
          playerVars: {
            'autoplay': 0,
            'controls': 0,
            'showinfo': 0,
            'rel': 0
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event: { target: { playVideo: () => void; }; }) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      // The function indicates that when playing a video (state=1),
      // -1 unstarted 
      // 0 ended 
      // 1 playing
      // 2 paused
      // 3 buffering
      // 5 video cued
      var done = false;

      function onPlayerStateChange(event: { data: any; }) {
      console.log('==================================================')
        console.log(event);
        if (event.data == YT.PlayerState.ENDED) {
          alert(1);
        }
      }