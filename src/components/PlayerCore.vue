<template>
  <div>
    <v-container
      fluid
      pa-0
      ma-0
      class="video-wrapper"
      @mouseenter="showControls()"
      @mouseleave="hideControls()"
    >
      <video ref="videoPlayer" @click="togglePlay()">
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=0.5"
        />
      </video>

      <template>
        <v-bottom-sheet
          attach=".video-wrapper"
          v-model="controlsShown"
          hide-overlay
          persistent
          :no-click-animation=true
        >
          <div class="controls">
            <v-btn depressed color="primary" @click="togglePlay()">
              Play
            </v-btn>
          </div>
        </v-bottom-sheet>
      </template>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controlsShown: true,
    };
  },
  computed: {
    video() {
      return this.$refs.videoPlayer;
    },
  },
  methods: {
    togglePlay() {
      if (this.video.paused || this.video.ended) {
        this.video.play();
      } else {
        this.video.pause();
      }
    },
    showControls() {
      this.controlsShown = true;
    },
    hideControls() {
      setTimeout(() => (this.controlsShown = false), 0);
    },
  },
};
</script>

<style>
.video-wrapper {
  background-color: rgb(37, 36, 36);
  transform: translate(0px, 0px);
  overflow: hidden;
  height: 100vh;
}
.controls {
  padding: 0px;
  width: 100%;
  background-color: rgba(14, 21, 58, 0.514);
}
video {
  width: 100%;
  height: 100%;
}
</style>