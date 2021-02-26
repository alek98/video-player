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
      <video
        ref="videoPlayer"
        @click="togglePlay()"
        @loadedmetadata="onLoadedMetadata()"
        @timeupdate="onTimeUpdate()"
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=0.5"
        />
      </video>

      <!-- video controls -->
      <template v-if="video">
        <v-bottom-sheet
          attach=".video-wrapper"
          v-model="controlsShown"
          hide-overlay
          persistent
          :no-click-animation="true"
        >
          <div class="controls">
            <!-- slider -->
            <v-slider
              min="0"
              :max="videoDuration"
              :value="videoCurrentTime"
              @input="onSliderInput($event)"
              dense
              height="30"
              hide-details="true"
              thumb-label
              step="0.01"
              color="#3d5af1"
              track-color="#22d1ee"
            ></v-slider>

            <!-- play || payse button -->
            <v-btn icon color="#0e153a" @click="togglePlay()">
              <v-icon medium v-show="videoPaused"> mdi-play </v-icon>
              <v-icon medium v-show="!videoPaused"> mdi-pause </v-icon>
            </v-btn>
            <!-- time -->
            <!-- TODO: FIX TIME NOT UPDATING PROPERLY -->
            <div class="time">{{ videoCurrentTime }} / {{ videoDuration }}</div>
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
      videoPaused: true,
      video: undefined,
      videoDuration: undefined,
      videoCurrentTime: 0,
    };
  },
  computed: {},
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
    onLoadedMetadata() {
      this.video = this.$refs.videoPlayer;
      this.videoDuration = (this.video.duration / 60).toFixed(2);
    },
    onTimeUpdate() {
      this.videoCurrentTime = (this.video.currentTime / 60).toFixed(2);
    },
    onSliderInput(event) {
      //event is a number, videoCurrentTime is a string
      // if those two are equal, everything is normal
      // if those two are not equal, that means that user is sliding the slider bar
      if (event != this.videoCurrentTime) {
        this.video.currentTime = event * 60;
        return;
      }
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
  background-color: rgb(247, 247, 247);
}
.time {
  display: inline;
  color: rgb(71, 71, 71);
}
video {
  width: 100%;
  height: 100%;
}

/* slider css */
.v-slider--horizontal .v-slider__track-container {
  height: 4px !important;
}
.v-slider--horizontal .v-slider__track-background,
.v-slider--horizontal .v-slider__track-fill {
  border-radius: 20px;
}
</style>