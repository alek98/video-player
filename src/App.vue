<template>
  <div id="app">
    <p style="color:white">{{path}}</p>
    <p style="color:white">{{args}}</p>
    <button @click="open">open</button>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Player />
  </div>
</template>

<script>

import Player from './components/Player.vue'
import {ipcRenderer} from 'electron'
export default {
  name: 'App',
  components: {
    Player
  },

  data(){
    return{
      args: "arguments",
      path: "path"
    } 
  },
  created(){
  ipcRenderer.on("my-custom-channel", (event, item) =>{
    this.args = item;
  });
  ipcRenderer.on("video-path-channel", (event,path) =>{
    this.path = path;
  })
  },
  methods:{
    open(){
    ipcRenderer.send('my-custom-channel', "hello again")
    },

  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0px !important;
  padding: 0px !important;
}
/* remove orange outline */
*:focus {
    outline: none;
}
</style>
