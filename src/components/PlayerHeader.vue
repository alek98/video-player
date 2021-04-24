<template>
  <div class="overlay">
    <div class="heading">
      <v-icon color="white">mdi-arrow-left</v-icon>
      <div> asdf </div>
      <div> {{getVideoName}} </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["videoPath"],

  data() {
    return {
      videoName: 'haha'
    }
  },

  computed: {
    getVideoName() {
      let fileName = this.videoPath.split('/').pop();
      fileName = fileName.split('.')[0];
      fileName = fileName.replace(/%20/g, ' ');
      return fileName;
    }
  },

  // watch: {
  //   videoPath(newVal) {
  //     console.log("new value is:", newVal)
  //     this.videoName = newVal;
  //   }
  // }
}
</script>

<style>
.overlay {
  background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(0,0,0,.4) 20%, rgba(0,0,0,.8));
  width: 100vw; 
}
.heading {
  color:white;
  padding: 1rem 1rem;
  display: flex
  
}
</style>