<template>
  <div>
    <v-container
      fluid
      pa-0
      ma-0
      class="video-wrapper"
      @mousemove="showControls()"
      @mouseleave="hideControls()"
      @drag="moveVideo($event)"
    >
      <video
        ref="videoPlayer"
        @click="togglePlay()"
        @mousedown="moveVideo($event)"
        @loadedmetadata="onLoadedMetadata()"
        @timeupdate="onTimeUpdate()"
      ></video>

      <!-- video controls -->
      <template v-if="video">
        <v-bottom-sheet
          attach=".video-wrapper"
          v-model="controlsShown"
          hide-overlay
          persistent
          width="80%"
          :no-click-animation="true"
        >
          <div 
          class="controls"
          @mouseenter="mouseOverControls = true"
          @mouseleave="mouseOverControls = false"
          >
            <!-- slider -->
            <div id="timeSlider">
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
                track-color="#29bfd9"
              >
                <template v-slot:thumb-label="{}">
                  {{ getVideoCurrentTimeFormated }}
                </template>
              </v-slider>
            </div>
            <!-- actions and buttons -->
            <div>
              <v-container fluid pa-0 ma-0>
                <v-row align="center">
                  <v-col cols="1" class="pr-0 pl-0" align="center">
                    <!-- play || payse button -->
                    <v-btn small icon color="#0e153a" @click="togglePlay()">
                      <v-icon medium v-show="videoPaused"> mdi-play </v-icon>
                      <v-icon medium v-show="!videoPaused"> mdi-pause </v-icon>
                    </v-btn>
                  </v-col>

                  <v-col cols="1" class="pl-0 mr-1" align="left">
                    <!-- time -->
                    <div class="lightText" style="">
                      {{ getVideoCurrentTimeFormated }} /
                      {{ getVideoDurationFormated }}
                    </div>
                  </v-col>

                  <v-col class="ml-4 pr-0">
                    <!-- volume -->
                    <div id="volumeSlider" class="sliderWidth">
                      <v-slider
                        :value="volume"
                        max="1"
                        min="0"
                        step="0.1"
                        dense
                        hide-details="true"
                        color="#2d6cdf"
                        track-color="#2d6cdf"
                        @input="onVolumeInput($event)"
                      >
                        <template v-slot:prepend>
                          <v-icon color="#0e153a" v-show="volume >= 0.5">
                            mdi-volume-high
                          </v-icon>
                          <v-icon
                            color="#0e153a"
                            v-show="volume > 0 && volume < 0.5"
                          >
                            mdi-volume-medium
                          </v-icon>
                          <v-icon color="#0e153a" v-show="volume == 0">
                            mdi-volume-mute
                          </v-icon>
                        </template>
                        <template v-slot:append>
                          <div class="pt-1 lightText">{{ volume * 100 }}%</div>
                        </template>
                      </v-slider>
                    </div>
                  </v-col>

                  <v-col align="right">
                    <v-row align="center">
                      <v-col align="right" class="pr-0 pl-0">
                        <!-- playback rate -->
                        <div id="playbackRateSlider" class="sliderWidth">
                          <v-slider
                            :value="playbackRate"
                            max="2"
                            min="0.5"
                            step="0.05"
                            dense
                            hide-details="true"
                            :color="playbackRateColor"
                            track-color="#29bfd9"
                            :thumb-color="playbackRateColor"
                            :thumb-size="playbackRateThumbSize"
                            @input="onPlaybackRateInput($event)"
                          >
                            <template v-slot:prepend>
                              <!-- reset playback rate on click -->
                              <v-btn
                                small
                                icon
                                @click="onPlaybackRateInput(1)"
                                color="#0e153a"
                              >
                                <v-icon> mdi-play-speed </v-icon>
                              </v-btn>
                            </template>
                          </v-slider>
                        </div>
                      </v-col>
                      <v-col cols="1" align="left" class="pt-2">
                        <div class="lightText">{{ playbackRate }}x</div>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="1" align="center">
                    <v-btn
                      small
                      icon
                      color="#0e153a"
                      @click="toggleFullscreen()"
                    >
                      <v-icon medium v-show="!fullscreen">
                        mdi-fullscreen
                      </v-icon>
                      <v-icon medium v-show="fullscreen">
                        mdi-fullscreen-exit
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
        </v-bottom-sheet>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["videoPath"],

  data() {
    return {
      controlsShown: true,
      volume: 1,
      fullscreen: false,
      videoY: undefined,
      videoX: undefined,
      videoLeft: 50,
      videoTop: 50,
      nowDragging: false,
      mouseOverControls: false,
      hideControlsTimeout: undefined,
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
    playbackRateColor() {
      if (this.playbackRate == 1) {
        return "rgb(63, 182, 110)";
      } else if (this.playbackRate < 1) {
        return "rgb(63, 128, 182)";
      } else if (this.playbackRate > 1 && this.playbackRate <= 1.5) {
        return "rgb(228, 189, 98)";
      } else {
        return "rgb(226, 113, 117)";
      }
    },
    playbackRateThumbSize() {
      if (this.playbackRate == 1) {
        return 42;
      } else {
        return 28;
      }
    },
    ...mapGetters({
      video: "getVideo",
      videoDuration: "getVideoDuration",
      videoCurrentTime: "getVideoCurrentTime",
      videoPaused: "getVideoPaused",
      playbackRate: "getPlaybackRate",
      getGlobalVideoZoom: "getGlobalVideoZoom"
    }),
  },

  watch: {
    videoPath(newVal) {
      console.log("changing video source to: ", newVal);
      let source = document.createElement("source");
      source.setAttribute("src", newVal);
      this.$refs.videoPlayer.appendChild(source);
    },
  },

  methods: {
    ...mapActions({
      togglePlayVideo: "togglePlayVideo",
      setVideo: "setVideo",
      setVideoDuration: "setVideoDuration",
      setVideoCurrentTime: "setVideoCurrentTime",
      setVideoPaused: "setVideoPaused",
      setPlaybackRate: "setPlaybackRate",
    }),
    togglePlay() {
      if(this.nowDragging == false){
        this.togglePlayVideo();
      }
      
      // if (this.video.paused || this.video.ended) {
      //   this.video.play();
      //   this.setVideoPaused(false);
      // } else {
      //   this.video.pause();
      //   this.setVideoPaused(true);
      // }
    },
    showControls() {
      this.controlsShown = true;
      this.$refs.videoPlayer.style.cursor = 'auto'

      // if the mouse is moving clear timeout, prevent hiding controls
      clearTimeout(this.hideControlsTimeout);
      this.hideControlsTimeout = setTimeout( () => { 
        this.hideControls();
        this.$refs.videoPlayer.style.cursor = 'none'
      } , 3000);
      
      // if the mouse is over controls clear timeout, prevent hiding controls
      if(this.mouseOverControls == true) clearTimeout(this.hideControlsTimeout)
    },
    hideControls() {
      // setTimeout(() => (this.controlsShown = false), 0);
      this.controlsShown = false;
    },
    onLoadedMetadata() {
      this.setVideo(this.$refs.videoPlayer);
      this.setVideoDuration(this.video.duration);
    },
    onTimeUpdate() {
      this.setVideoCurrentTime(Math.floor(this.video.currentTime));
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
    onVolumeInput(event) {
      // volume is in range [0,1]
      this.video.volume = event;
      this.volume = event;
    },
    onPlaybackRateInput(event) {
      this.video.playbackRate = event;
      this.setPlaybackRate(event);
    },
    toggleFullscreen() {
      if (this.fullscreen) {
        document.exitFullscreen();
        this.fullscreen = false;
      } else {
        document.documentElement.requestFullscreen();
        this.fullscreen = true;
      }
    },

    // move video and Draggin functions
    moveVideo(event){
      event.preventDefault();
      this.videoY = event.clientY;
      this.videoX = event.clientX;

      this.$refs.videoPlayer.onmousemove = this.startDragging;
      this.$refs.videoPlayer.onmouseup = this.stopDragging;
      this.$refs.videoPlayer.onmouseleave = this.stopDragging;
    },
    startDragging(event){ 
      this.nowDragging = true;  
      if(this.boundariesExceeded() === true) {
        return;
      }
      let movementX = this.videoX - event.clientX;
      let movementY = this.videoY - event.clientY;

      //the old simpler way of zooming in
      // when zoom in small mouse has to move a lot because of this 0.1
      // this.videoTop += movementY * 0.1;
      // this.videoLeft += movementX * 0.1;

      // the new way of zooming in
      // much more responsive
      this.videoTop += movementY * 0.45 / this.getGlobalVideoZoom ** 2;
      this.videoLeft += movementX * 0.45 / this.getGlobalVideoZoom ** 2;

      this.videoY = event.clientY;
      this.videoX = event.clientX;
      
      this.$refs.videoPlayer.style.transformOrigin  = `${this.videoLeft}% ${this.videoTop}%`;
    },
    stopDragging(){
      this.$refs.videoPlayer.onmousemove = null;
      this.$refs.videoPlayer.onmouseup = null;
      // onmouseup togglePlay() function will be triggered too
      // with timeout, I'm preventing togglePlay() if user was draggin the video
      setTimeout(() => {
        this.nowDragging = false;
      }, 10);
    },

    boundariesExceeded(){
      if(this.videoLeft > 100 ){
        this.videoLeft = 100;
        return true;
      }
      else if(this.videoLeft < 0){
        this.videoLeft = 0;
        return true;
      }
      else if(this.videoTop > 100) {
        this.videoTop = 100;
        return true;
      }
      else if(this.videoTop < 0) {
        this.videoTop = 0;
        return true;
      }

    }

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
  border-radius: 8px;
  padding: 10px;
  padding-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  background-color: rgba(236, 245, 247, 0.85);
}
.lightText {
  color: #0e153a;
  font-size: 12px;
  white-space: nowrap;
}
.sliderWidth {
  max-width: 200px;
}
video {
  width: 100%;
  height: 100%;
}

/* only time slider css */
#timeSlider .v-slider__track-container {
  height: 4px !important;
}
.v-slider--horizontal .v-slider__track-background,
.v-slider--horizontal .v-slider__track-fill {
  border-radius: 20px;
}

#playbackRateSlider
  .v-slider__thumb-container--active
  .v-slider__thumb::before {
  transform: scale(1.2) !important;
}
#playbackRateSlider .v-slider__thumb::before {
  width: 28px !important;
  height: 28px !important;
  left: -8px !important;
  top: -8px !important;
}
#volumeSlider .v-slider__thumb-container--active .v-slider__thumb::before {
  transform: scale(1.2) !important;
}
#volumeSlider .v-slider__thumb::before {
  width: 28px !important;
  height: 28px !important;
  left: -8px !important;
  top: -8px !important;
}
</style>