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

      <!-- video controls -->
      <template>
        <v-bottom-sheet
          attach=".video-wrapper"
          v-model="controlsShown"
          hide-overlay
          persistent
          :no-click-animation="true"
        >
          <v-card tile>
            <div class="controls">
              <!-- progress bar -->
              <v-progress-linear
                :value="50"
                class="my-0"
                height="5"
              ></v-progress-linear>

              <!-- play || payse button -->
              <v-btn icon color="#e2f3f5" @click="togglePlay()">
                <v-icon medium v-show="videoPaused"> mdi-play </v-icon>
                <v-icon medium v-show="!videoPaused"> mdi-pause </v-icon>
              </v-btn>
            </div>
          </v-card>
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
      videoPaused: true,
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
        this.videoPaused = false;
      } else {
        this.video.pause();
        this.videoPaused = true;
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
  background-color: rgba(5, 14, 59, 0.973);
}
video {
  width: 100%;
  height: 100%;
}
</style>