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
              step="1"
              color="#3d5af1"
              track-color="#22d1ee"
            >
              <template v-slot:thumb-label="{}">
                {{ getVideoCurrentTimeFormated }}
              </template>
            </v-slider>

            <!-- play || payse button -->
            <v-btn icon color="#0e153a" @click="togglePlay()">
              <v-icon medium v-show="videoPaused"> mdi-play </v-icon>
              <v-icon medium v-show="!videoPaused"> mdi-pause </v-icon>
            </v-btn>
            <!-- time -->
            <!-- TODO: FIX TIME NOT UPDATING PROPERLY -->
            <div class="time">
              {{ getVideoCurrentTimeFormated }} / {{ getVideoDurationFormated }}
            </div>
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
  computed: {
    getVideoDurationFormated() {
      let duration = this.videoDuration;
      // format : "01:56:30"
      let formated = new Date(duration * 1000).toISOString().substr(11, 8);
      let [hours, minutes, seconds] = formated.split(":");
      return `${hours === "00" ? "" : hours + ":"}${minutes}:${seconds}`;
    },
    getVideoCurrentTimeFormated() {
      let currentTime = this.videoCurrentTime;
      // format : "01:56:30"
      let formated = new Date(currentTime * 1000).toISOString().substr(11, 8);
      let [hours, minutes, seconds] = formated.split(":");
      return `${hours === "00" ? "" : hours + ":"}${minutes}:${seconds}`;
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
    onLoadedMetadata() {
      this.video = this.$refs.videoPlayer;
      this.videoDuration = this.video.duration;
    },
    onTimeUpdate() {
      this.videoCurrentTime = Math.floor(this.video.currentTime);
    },
    onSliderInput(event) {
      // event is an integer in seconds
      // videoCurrentTime is an integer in seconds
      // those two should be equal
      // if those two are not equal, that means that user is sliding the slider bar
      // both event and videoCurrentTime must be rounded to int
      if (event != this.videoCurrentTime) {
        this.video.currentTime = event;
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