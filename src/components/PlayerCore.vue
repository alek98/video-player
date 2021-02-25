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
      <video ref="videoPlayer">
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=0.5"
        />
      </video>

      <template>
        <v-bottom-sheet
          attach=".video-wrapper"
          v-model="controlsShown"
          hide-overlay
        >
          <v-sheet>
            <div class="controls">
              <v-btn depressed color="primary" @click="togglePlay()">
                Play
              </v-btn>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </template>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controlsShown: false,
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
      setTimeout(() => this.controlsShown = false, 500)
    },
  },
};
</script>

<style>
.video-wrapper {
  background-color: rgb(83, 82, 82);
  transform: translate(0px, 0px);
  overflow: hidden;

}
.controls {
  padding: 0px;
  
  width: 100%;
}
video {
  width: 100%;
  height: 50%;
}
</style>