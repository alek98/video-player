<template>
  <div>
    <div 
      @mousemove="showPlayerHeaderAndControls();"
      @mouseleave="hidePlayerHeaderAndControls()"
      style="position: relative; height: 100vh"
    >
      <div class="player-header">
        <PlayerHeader />
      </div>
      <div class="player-core">
        <PlayerCore />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlayerCore from "./PlayerCore";
import PlayerHeader from './PlayerHeader.vue';

export default {
  components: {
    PlayerCore,
    PlayerHeader,
  },

  data() {
    return {
      // videoPath: "file:///Users/alek/Downloads/BigBuckBunny%205.mp4",
      videoZoom: 1,
    };
  },
  created() {
    this.addKeyListeners();
  },
  mounted() {
    this.setPlayerHeader()
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },

  methods: {
    ...mapActions({
      setVideoPath: "setVideoPath",
      togglePlayVideo: "togglePlayVideo",
      forward: "forward",
      backward: "backward",
      setGlobalVideoZoom: 'setGlobalVideoZoom',
      toggleControls: "toggleControls",
      toggleHeader: "playerHeader/toggleHeader",
      setPlayerHeaderHtmlElem: "playerHeader/setPlayerHeaderHtmlElem",
    }),

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

      // zoomVideoFrom & zoomVideoTo will be css variables 
      // this is for css animation
      let zoomVideoFrom = this.videoZoom;
      this.videoZoom += 0.2;
      let zoomVideoTo = this.videoZoom;

      // reference the <video> element
      let videoElem = document.getElementsByTagName("video")[0];

      //reset animation 
      videoElem.style.animation = null;
      videoElem.offsetHeight;
      
      // set css variables and start animation
      videoElem.style.setProperty('--zoomVideoFrom', zoomVideoFrom);
      videoElem.style.setProperty('--zoomVideoTo'  , zoomVideoTo);
      videoElem.style.animation = "zoomIn 0.2s ease-in-out";

      // video element shoud stay where the animation has been finished
      // videoElem.style.position = "absolute";
      videoElem.style.transform = `scale(${this.videoZoom})`;

      // set global video zoom, so it can be referenced from playerCore.vue
      this.setGlobalVideoZoom(this.videoZoom);
    
    },
    zoomOut(){
      if (this.videoZoom === 1) return;

      // zoomVideoFrom & zoomVideoTo will be css variables 
      // this is for css animation
      let zoomVideoFrom = this.videoZoom;
      this.videoZoom -= 0.2;
      let zoomVideoTo = this.videoZoom;

      // reference the <video> element
      let videoElem = document.getElementsByTagName("video")[0];

      //reset animation
      videoElem.style.animation = null;
      videoElem.offsetHeight;

      // set css variables and start animation
      videoElem.style.setProperty('--zoomVideoFrom', zoomVideoFrom);
      videoElem.style.setProperty('--zoomVideoTo'  , zoomVideoTo);
      videoElem.style.animation = "zoomOut 0.2s ease-in-out";

      // video element shoud stay where the animation has been finished
      // videoElem.style.position = "absolute";
      videoElem.style.transform = `scale(${this.videoZoom})`;

      // set global video zoom, so it can be referenced from playerCore.vue
      this.setGlobalVideoZoom(this.videoZoom);
    },

    showPlayerHeaderAndControls() {
      this.toggleControls(true);
      this.toggleHeader(true);
    },
    hidePlayerHeaderAndControls() {
      this.toggleControls(false);
      this.toggleHeader(false);
    },
    setPlayerHeader() {
      let header = document.getElementsByClassName("player-header")[0];
      this.setPlayerHeaderHtmlElem(header);
    }

  },
};
</script>

<style>
@keyframes zoomIn {
  from { transform: scale(calc(var(--zoomVideoFrom)));}
  to  {  transform: scale(calc(var(--zoomVideoTo)));}
}

@keyframes zoomOut {
  from { transform: scale(calc(var(--zoomVideoFrom)));}
  to  {  transform: scale(calc(var(--zoomVideoTo)));}
}

.player-header {
  /* force overlapping layers to pass through (ignore) click events */
  pointer-events: none;
  position: absolute;
  z-index: 3;
}
.player-core {
  height: 100%;
}
</style>