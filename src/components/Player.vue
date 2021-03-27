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
      videoZoom: 1,
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
      if (this.videoZoom === 2.4) return;
      this.videoZoom += 0.2;
      let videoElem = document.getElementsByTagName("video")[0];

      videoElem.style.position = "absolute";
      videoElem.style.transform = `scale(${this.videoZoom})`;
    },
    zoomOut(){
      if (this.videoZoom === 1) return;
      this.videoZoom -= 0.2;
      let videoElem = document.getElementsByTagName("video")[0];

      videoElem.style.position = "absolute";
      videoElem.style.transform = `scale(${this.videoZoom})`;
    }

  },
};
</script>