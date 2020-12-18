<template>
  <div id="app">
    <div>
    <h1>Video Player</h1>
    <button id="chooseButton"> Choose Video </button>
    </div>
    <Player v-show='false'/>
  </div>
</template>

<script>

import Player from './components/Player.vue'

export default {
  name: 'App',
  components: {
    Player
  }
}
</script>

<style>
body{
  margin: 0px !important;
  padding: 0px !important;
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
  margin-top: 70px;
  margin-bottom: 60px;
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
   box-shadow:  1px 3px 10px 1px #f3f169;
}
#chooseButton:hover{
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-family: 'Poppins';
  color:#e2f3f5;
  background-image:linear-gradient(to right,#3550da, #16a6c0);
  border:0px;
  border-radius: 10px;
  padding-inline:15px;
  padding-block: 5px;
  font-size: 25px;
}

</style>
