<template>
  <div>
    <PlayerCore :videoPath="videoPath" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlayerCore from "./PlayerCore";
import { ipcRenderer } from "electron";

export default {
  components: {
    PlayerCore,
  },

  data() {
    return {
      videoPath: "asdf",
      videoZoom: 100,
      videoZoomLeft: 50,
      videoZoomTop: 50,
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
    ...mapActions({
      togglePlayVideo: "togglePlayVideo",
      forward: "forward",
      backward: "backward",
    }),
    addRenderer() {
      ipcRenderer.on("video-path-channel", (event, videoPath) => {
        console.log(
          " %c video path: ",
          "color:darkblue; background-color:yellow",
          videoPath
        );
        this.videoPath = videoPath;
      });
    },

    addKeyListeners() {
      window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        this.addZoomListeners(event);

        switch (event.key) {
          case " ":
            this.togglePlayVideo();
            break;
          case "ArrowLeft":
            this.backward();
            break;
          case "ArrowRight":
            this.forward();
            break;
          default:
            return;
        }
        event.preventDefault();
      });
    },

    addZoomListeners(event){
      let isWindowsZoomIn = event.ctrlKey && event.key === "=";
      if(isWindowsZoomIn) {
        this.zoomIn();
      }

      let isWindowsZoomOut = event.ctrlKey && event.key === "-";
      if (isWindowsZoomOut) {
        this.zoomOut();
      }
    },

    zoomIn(){
      if (this.videoZoom === 200) return;
      this.videoZoom += 25;
      this.videoZoomLeft = 50;
      this.videoZoomTop = 50;
      let videoElem = document.getElementsByTagName("video")[0];
      videoElem.style.width = `${this.videoZoom}%`;
      videoElem.style.height = `${this.videoZoom}%`;
      videoElem.style.position = "absolute";
      videoElem.style.transform = "translate(-50%, -50%)";
      videoElem.style.left = `${this.videoZoomLeft}%`;
      videoElem.style.top = `${this.videoZoomTop}%`;
    },
    zoomOut(){
      if (this.videoZoom === 100) return;
      this.videoZoom -= 25;
      this.videoZoomLeft = 50;
      this.videoZoomTop = 50;
      let videoElem = document.getElementsByTagName("video")[0];
      videoElem.style.width = `${this.videoZoom}%`;
      videoElem.style.height = `${this.videoZoom}%`;
      videoElem.style.position = "absolute";
      videoElem.style.transform = "translate(-50%, -50%)";
      videoElem.style.left = `${this.videoZoomLeft}%`;
      videoElem.style.top = `${this.videoZoomTop}%`;
    }

    // playOrPause() {
    //   let paused = this.player.paused();
    //   if (paused) {
    //     this.player.play();
    //   } else {
    //     this.player.pause();
    //   }
    // },

    // forward() {
    //   // seek forward 5 * playbackRate seconds
    //   let time = this.player.currentTime() + 5 * this.player.playbackRate();
    //   this.player.currentTime(time);
    // },
    // backward() {
    //   // seek backward 5 * playbackRate seconds
    //   let time = this.player.currentTime() - 5 * this.player.playbackRate();
    //   this.player.currentTime(time);
    // },
    // zoomIn() {
    //   let videoElem = document.getElementsByTagName("video")[0];
    //   videoElem.className = "videoZoomIn";
    //   videoElem.style.animation = "zoomIn 0.2s linear";
    // },
    // zoomOut() {
    //   let videoElem = document.getElementsByTagName("video")[0];
    //   videoElem.className = "videoZoomOut";
    //   videoElem.style.animation = "zoomOut 0.2s linear";
    // },

    // onCanplay() {
    //   console.log("can play");
    //   this.canPlayVideo = true;
    // },
    // onError() {
    //   console.log("cant play");
    //   this.canPlayVideo = false;
    // },
  },
};
</script>

<style>
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
</style>