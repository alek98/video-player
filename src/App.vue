<template>
  <div >
    <div  id="app" v-show="videoPathExists==false">
    <h1>Video Player</h1>
    <button id="chooseButton"> Choose Video </button>
    </div>
    <Player v-show="videoPathExists==true"/>
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
      videoPathExists: false,// or null
    } 
  },
  created(){
   ipcRenderer.on("video-path-channel", (event,videoPath) =>{
     console.log(" %c video path: ", "color:red", videoPath);
     if(videoPath){
       this.videoPathExists = true;
     }
   });
  },
  methods:{
    open(){
    ipcRenderer.send('my-custom-channel', "hello again")
    },

  }
}


</script>

<style>
body{
  margin: 0px !important;
  padding: 0px !important;
}
#app{
  height: 100vh;
  /* background-image: linear-gradient(to bottom right, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89)); */
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #0e153a;
}

@import url('https://fonts.googleapis.com/css?family=Poppins');
h1{
  font-family: 'Poppins';
  color:#e2f3f5;
  font-size: 60px;
  font-weight: 100;
  text-align: center;
  margin: 0px;
  padding-top: 70px;
  padding-bottom: 60px;

}
/* remove orange outline */
*:focus {
    outline: none;
}
#chooseButton{
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-family: 'Poppins';
  color:#e2f3f5;
  background-image:linear-gradient(to right,#3d5af1, #21a5bd);
  border:0px;
  border-radius: 10px;
  padding-inline:15px;
  padding-block: 5px;
  font-size: 25px;
   box-shadow:  1px 2px 8px 1px #dddb5f;
}
#chooseButton:hover{
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-family: 'Poppins';
  color:#e2f3f5;
  background-image:linear-gradient(to right,#3550da, #13899e);
  border:0px;
  border-radius: 10px;
  padding-inline:15px;
  padding-block: 5px;
  font-size: 25px;
}

</style>
