<template>
  <div>
    <div class="video-wrapper">
      <video ref="videoPlayer">
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=0.5"
        />
      </video>

      <template>
        <v-bottom-sheet attach=".video-wrapper" v-model="sheet" hide-overlay>
          <v-sheet>
            <div class="controls">
              <v-btn depressed color="primary" @click="togglePlay()">
                Play
              </v-btn>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sheet: true,
    };
  },
  computed: {
    video() {
      return this.$refs.videoPlayer;
    },
  },
  methods: {
    togglePlay() {
      // if (this.video.paused || this.video.ended) {
      //   this.video.play();
      // } else {
      //   this.video.pause();
      // }
      this.sheet = !this.sheet;
    },
  },
};
</script>

<style>
.video-wrapper {
  border: 3px solid rgb(112, 29, 29);
  background-color: blue;
  transform: translate(0px, 0px);
  overflow: hidden;
  width: 400px;
  background-color: #666;
}
.controls {
  border: 2px solid rgb(29, 30, 112);
  width: 100%;
}
video {
  width: 100%;
  height: 100%;
}
</style>