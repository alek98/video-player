<template>
  <v-app>
    <v-main>
      <div id="app">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapActions } from 'vuex';
export default {
  name: "App",

  data() {
    return {
      args: "arguments",
      videoPathExists: false,
    };
  },

  /**
   * listen to channel  "video-path-channel". 
   * VideoPath is selected and send over "video-path-channel" 
   * from Home.vue component.
   * if videoPath exists & is valid route to /player path.
   * /player path is Player.vue component.
   * set videoPath in vuex store.
   * videoPath from vuex is used in PlayerCore & PlayerHeader components.
   */
  created() {
    ipcRenderer.on("video-path-channel", (event, videoPath) => {
      if (!videoPath || videoPath === "file://undefined") {
        console.log("video not chosen");
        this.videoPathExists = false;
      } 
      else {
        this.videoPathExists = true;
        this.setVideoPath(videoPath);
        this.$router.push("/player");
      }
    });
  },
  methods: {
    ...mapActions({
      setVideoPath: "setVideoPath",
    })
  }
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
#app {
  margin: 0px !important;
  padding: 0px !important;
  background-color: #252424;

}
@import url("https://fonts.googleapis.com/css?family=Poppins");

/* remove orange outline */
*:focus {
  outline: none;
}

btn{
  cursor: pointer;
}
</style>
