import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    video: undefined,
    videoPaused: true,
    videoDuration: 0,
    videoCurrentTime: 0,
  },
  getters: {
    getVideo: (state) => state.video,
    getVideoPaused: (state) => state.videoPaused,
    getVideoDuration: (state) => state.videoDuration,
    getVideoCurrentTime: (state) => state.videoCurrentTime,

  },

  actions: {
    togglePlayVideo({ commit, state }) {
      if (state.video.paused || state.video.ended) {
        state.video.play()
        commit('setVideoPaused', false)
      } else {
        state.video.pause()
        commit('setVideoPaused', true)
      }
    },
    setVideo({ commit }, videoHtmlElement) {
      commit('setVideo', videoHtmlElement)
    },
    setVideoPaused({commit},bool){
      commit('setVideoPaused', bool)
    },
    setVideoDuration({commit}, videoDuration){
      commit('setVideoDuration', videoDuration)
    },
    setVideoCurrentTime({commit}, videoCurrentTime){
      commit('setVideoCurrentTime', videoCurrentTime);
    }
  },
  mutations: {
    setVideo: (state, videoHtmlElement) => state.video = videoHtmlElement,
    setVideoPaused: (state, bool) => state.videoPaused = bool,
    setVideoDuration: (state, videoDuration) => state.videoDuration = videoDuration,
    setVideoCurrentTime: (state, videoCurrentTime) => state.videoCurrentTime = videoCurrentTime,
  },

  modules: {
  }
})
