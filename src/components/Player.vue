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
import { ipcRenderer } from 'electron'

export default {
  components: {
    videoPlayer,
  },

  data(){
    return{
      playerOptions: {
        muted: false,
        language: 'en',
        playbackRates: [0.75, 1.0, 1.25, 1.5, 1.75, 1.9, 2.0],
        sources: [{
          type: "video/mp4",
          src: "C:/Users/aleka/Documents/Projects/video-player/BigBuckBunny.mp4",
        }],
        poster: "/static/images/author.jpg",
      },
      pause: true,
      path: "",
    }
  },
  created() {
    this.addRenderer();
    this.addKeyListeners();
  },
  computed:{
    player(){
      return this.$refs.videoPlayer.player;
    },
  },

  methods: {
    addRenderer(){
      ipcRenderer.on("video-path-channel", (event,videoPath) =>{
        console.log(videoPath);
        // this.playerOptions.sources = [{
        //   type: "video/mp4",
        //   src: video,
        // }];
      })
    },

    addKeyListeners(){
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
    
    playOrPause(){
      if(this.pause){
        this.player.play();
        this.pause = !this.pause;
      }
      else{
        this.player.pause();
        this.pause = !this.pause;
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