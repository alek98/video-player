<template>
<div>
  <div class="my-wrapper" v-show="videoState=='canPlay'">
    <videoPlayer 
    class="video-js vjs-default-skin vjs-big-play-centered"
    :options="playerOptions"
    ref="videoPlayer" 
    @canplay="onCanplay()"
    @error="onError()"
    />
  </div>

  <div id="problem" v-show="videoState=='cantPlay'">
    We can't play this video. Please try again.
  </div>
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
          // src: "C:\\Users\\aleka\\Documents\\Projects\\video-player\\BigBuckBunny 5.mp4",

        }],
      },
      videoState: "loading", //videoStates: loading, canPlay, cantPlay
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
        console.log(" %c video path: ", "color:darkblue", videoPath);
        this.playerOptions.sources = [{
          src: videoPath,
          type:"video/mp4",
        }];
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
    },

    onCanplay(){
      this.videoState = "canPlay";
    },
    onError(){
      this.videoState = "cantPlay";
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
    color: #e2f3f5;
}
 .video-js .vjs-control-bar{
  background: #0e153a85;
}
.video-js .vjs-slider-bar, 
.video-js .vjs-volume-level{
  background:#22d1ee;
}
.video-js .vjs-playback-rate{
  color: #e2f3f5;
}
.video-js .vjs-big-play-button{ 
  color: #e2f3f5;
  background: #3d5bf18f;
  border-radius: 25px;
  border-color: #e2f3f5;
  border-width: 0px;
  font-size: 35px;
}
.vjs-default-skin:hover .vjs-big-play-button{ 
  color: #e2f3f5;
  background: #3d5bf1;
  border-radius: 25px;
  border-color: #e2f3f5;
  border-width: 0px;
  font-size: 35px;
}

#problem{
  font-size: 20px;
  color:#e2f3f5;
  background-color: #0e153a;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>