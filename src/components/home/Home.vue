<template>
  <div>
    <h1>Video Player</h1>
    <button id="chooseButton" @click="chooseVideo()">Choose Video</button>
  </div>
</template>

<script>
import {ipcRenderer, remote} from 'electron'
const {dialog} = remote
export default {

    methods:{
    chooseVideo(){
      const result = dialog.showOpenDialogSync({
        properties: ['openFile'], 
        filters: [
          { name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'ogg', 'webm'] },
        ],
        title: 'Choose Video File',   // title for Windows
        message: 'Choose Video File', // title for Mac
      });

      let videoPath = result?.[0];

      // appending 'file://' to videoPath is necessary because macos doesn't have 'file://'
      // and we need that for file protocol to work
      videoPath = 'file://' + videoPath;
      ipcRenderer.send('video-path-channel', videoPath)
    }
  }
};
</script>

<style>
h1 {
  font-family: "Poppins";
  color: #e2f3f5;
  font-size: 75px;
  font-weight: 500;
  text-align: center;
  margin: 0px;
  padding-top: 70px;
  padding-bottom: 60px;
}

#chooseButton {
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-family: "Poppins";
  color: #e2f3f5;
  background-image: linear-gradient(to right, #3d5af1, #21a5bd);
  border: 0px;
  border-radius: 22px;
  padding-inline: 45px;
  padding-block: 15px;
  font-size: 30px;
  /* box-shadow: 1px 3px 10px 1px #f3f169; */
}
#chooseButton:hover {
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-family: "Poppins";
  color: #e2f3f5;
  background-image: linear-gradient(to right, #314bce, #149bb3);
}
</style>