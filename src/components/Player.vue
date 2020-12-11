<template>
  <div class="my-wrapper">
    <videoPlayer 
    class="video-js vjs-default-skin vjs-fluid"

    :options="playerOptions"
    @play="onPlayerPlay($event)"
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
          src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }],
        poster: "/static/images/author.jpg",
      }
    }
  },

  computed:{
    player(){
      return this.$refs.videoPlayer.player;
    }
  },

  methods: {
  // listen event
    onPlayerPlay(player) {
      console.log(player);
    },
  }
}
</script>

<style>
.my-wrapper{
  width:100%; 
  background-color:darkred; 
  height: 90vh; 
  min-height:200px;
}
.video-js {
    /* position: relative !important; */
    width: 100% !important;
    height: 100% !important;
}
</style>