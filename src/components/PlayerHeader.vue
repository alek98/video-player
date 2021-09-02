<template>
  <div class="overlay">
    <div class="heading">
      <!-- 
       any button element is triggering slider label,
       so I had to create div like a button.
       Problem in Vuetify. 
      -->
      <div class="btn" @click="backToHomeScreen()">
        <v-icon>mdi-chevron-left</v-icon>
      </div>

      <div class="video-name" v-if="getVideoPath">{{ getVideoName }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

  data() {
    return {
      videoName: "haha",
    };
  },

  computed: {
    getVideoName() {
      let fileName = this.getVideoPath.split("/").pop();
      // if on windows split with '/' must be replaced with '\'
      if(fileName.includes('\\')) {
        fileName = this.getVideoPath.split("\\").pop();
      }
      fileName = fileName.split(".")[0];
      fileName = fileName.replace(/%20/g, " ");
      return fileName;
    },

    ...mapGetters({
      getVideoPath: "getVideoPath",
    })
  },

  methods: {
    backToHomeScreen() {
      console.log("go back");
      this.$router.push('/');
    },
  },

};
</script>

<style>
.overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0),rgba(0,0,0,.1), rgba(0,0,0,.3) 60%, rgba(0,0,0,.6));
  width: 100vw;
  /* force overlapping layers to pass through (ignore) click events */
  pointer-events: none;
}
.heading {
  color: white;
  padding: 1rem 1rem;
  padding-bottom: 4rem;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 50%);
  display: flex;
}
.video-name {
  padding: 0rem 1.4rem;
  margin: auto 0rem;
  font-size: 1.3rem;
}

.heading .v-icon {
  --size: 30px;
  height: var(--size);
  font-size: var(--size);
  width: var(--size);
  color: white;
}
.btn {
  border-radius: 50%;
  /* do Not ignore click event on the back button */
  pointer-events: auto;
}
.btn:hover {
  background-color: rgba(245, 245, 245, 0.195);
}
.btn:active {
  background-color: rgba(245, 245, 245, 0.295);
}
</style>