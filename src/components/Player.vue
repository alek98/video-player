<template>
  <div>
    <div class="my-wrapper" v-show="canPlayVideo == true">
      <videoPlayer
        class="video-js vjs-default-skin vjs-big-play-centered"
        :options="playerOptions"
        ref="videoPlayer"
        @canplay="onCanplay()"
        @error="onError()"
      />
    </div>

    <div id="problem" v-show="canPlayVideo == false">
      We can't play this video. Please try again.
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import { ipcRenderer } from "electron";

export default {
  components: {
    videoPlayer,
  },

  data() {
    return {
      playerOptions: {
        muted: false,
        language: "en",
        playbackRates: [0.75, 1.0, 1.25, 1.5, 1.75, 1.9, 2.0],
      },
      /*TODO:   fix video.js changing source error code 4.
       */
      canPlayVideo: null, //by default there is no video path
    };
  },
  created() {
    this.addRenderer();
    this.addKeyListeners();
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },

  methods: {
    addRenderer() {
      ipcRenderer.on("video-path-channel", (event, videoPath) => {
        console.log(
          " %c video path: ",
          "color:darkblue; background-color:yellow",
          videoPath
        );
        this.player.src({
          src: videoPath,
          type: "video/mp4",
        });
      });
    },

    addKeyListeners() {
      window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        // capture 'command' and '=' on mac
        // capture 'ctrl' and '=' on windows
        let isMacZoomIn = event.metaKey && event.key === "=";
        let isWindowsZoomIn = event.ctrlKey && event.key === "=";
        if (isMacZoomIn || isWindowsZoomIn) {
          this.zoomIn();
        }
        // capture 'command' and '-' on mac
        // capture 'ctrl' and '-' on windows
        let isMacZoomOut = event.metaKey && event.key === "-";
        let isWindowsZoomOut = event.ctrlKey && event.key === "-";
        if (isMacZoomOut || isWindowsZoomOut) {
          this.zoomOut();
        }

        switch (event.key) {
          case " ":
            this.playOrPause();
            break;
          case "ArrowLeft":
            this.zoomIn();
            break;
          case "ArrowRight":
            this.zoomOut();
            break;
          default:
            return;
        }
        event.preventDefault();
      });
    },

    playOrPause() {
      let paused = this.player.paused();
      if (paused) {
        this.player.play();
      } else {
        this.player.pause();
      }
    },

    forward() {
      // seek forward 5 * playbackRate seconds
      let time = this.player.currentTime() + 5 * this.player.playbackRate();
      this.player.currentTime(time);
    },
    backward() {
      // seek backward 5 * playbackRate seconds
      let time = this.player.currentTime() - 5 * this.player.playbackRate();
      this.player.currentTime(time);
    },
    zoomIn() {
      let videoElem = document.getElementsByTagName("video")[0];
      videoElem.className = "videoZoomIn";
      videoElem.style.animation = "zoomIn 0.2s linear";
    },
    zoomOut() {
      let videoElem = document.getElementsByTagName("video")[0];
      videoElem.className = "videoZoomOut";
      videoElem.style.animation = "zoomOut 0.2s linear";
    },

    onCanplay() {
      console.log("can play");
      this.canPlayVideo = true;
    },
    onError() {
      console.log("cant play");
      this.canPlayVideo = false;
    },
  },
};
</script>

<style>
.my-wrapper {
  width: 100%;
  height: 100vh;
  min-height: 290px;
  overflow: hidden;
}

.video-js {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  color: #e2f3f5;
}
.video-js .vjs-control-bar {
  background: #0e153a85;
}
.video-js .vjs-slider-bar,
.video-js .vjs-volume-level {
  background: #22d1ee;
}
.video-js .vjs-playback-rate {
  color: #e2f3f5;
}
.video-js .vjs-big-play-button {
  color: #e2f3f5;
  background: #3d5bf18f;
  border-radius: 25px;
  border-color: #e2f3f5;
  border-width: 0px;
  font-size: 35px;
}
.vjs-default-skin:hover .vjs-big-play-button {
  color: #e2f3f5;
  background: #3d5bf1;
  border-radius: 25px;
  border-color: #e2f3f5;
  border-width: 0px;
  font-size: 35px;
}

.vjs-loading-spinner {
  display: none !important;
}

/* zoom In and zoom Out classes and animations */
.videoZoomIn {
  width: 200%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.videoZoomOut {
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
@keyframes zoomOut {
  from {
    width: 200%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  to {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
@keyframes zoomIn {
  from {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  to {
    width: 200%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

#problem {
  font-size: 20px;
  color: #e2f3f5;
  background-color: #0e153a;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>