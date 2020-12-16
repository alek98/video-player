<template>
  <div class="my-wrapper">
    <videoPlayer 
    class="video-js vjs-default-skin vjs-fluid"
    :options="playerOptions"
    ref="videoPlayer" 
    />
  </div>
</template>

<script>
import {videoPlayer}  from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  components: {
    videoPlayer,
  },

  data(){
    return{
      playerOptions: {
        muted: false,
        language: 'en',
        playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0],
        // fluid:true,
        sources: [{
          type: "video/mp4",
          src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=5"
        }],
      },
    }
  },

  created() {
    window.addEventListener('keydown', (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      switch (event.key) {
        case " ":
          this.playOrPause();
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
  computed:{
    player(){
      return this.$refs.videoPlayer.player;
    },
  },

  methods: {
    playOrPause(){
      let paused = this.player.paused();
      if(paused){
        this.player.play();
      }
      else{
        this.player.pause();
      }
      
    },

    forward(){
      let time = this.player.currentTime() + 5;
      this.player.currentTime(time);
    },
    backward(){
      let time = this.player.currentTime() - 5;
      this.player.currentTime(time);
    }
  }
}
</script>

<style>
.my-wrapper{
  width:100%; 
  height: 100vh; 
  min-height:290px;
  
}
.video-js {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
}
</style>