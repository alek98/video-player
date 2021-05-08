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
      <div class="video-name">{{ getVideoName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["videoPath"],

  data() {
    return {
      videoName: "haha",
    };
  },

  computed: {
    getVideoName() {
      let fileName = this.videoPath.split("/").pop();
      fileName = fileName.split(".")[0];
      fileName = fileName.replace(/%20/g, " ");
      return fileName;
    },
  },

  methods: {
    backToHomeScreen() {
      console.log("go back");
    },
  },

  // watch: {
  //   videoPath(newVal) {
  //     console.log("new value is:", newVal)
  //     this.videoName = newVal;
  //   }
  // }
};
</script>

<style>
.overlay {
  background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(0,0,0,.3) 50%, rgba(0,0,0,.8));
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
  cursor: pointer;
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