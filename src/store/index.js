import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import playerHeader from './modules/playerHeader'

export default new Vuex.Store({
  state: {
    videoPath: undefined,
    video: undefined,
    videoPaused: true,
    videoDuration: 0,
    videoCurrentTime: 0,
    playbackRate: 1,
    videoZoom: 1,
    controlsShown: true,
    mouseOverControls: false,
  },
  getters: {
    getVideoPath: (state) => state.videoPath,
    getVideo: (state) => state.video,
    getVideoPaused: (state) => state.videoPaused,
    getVideoDuration: (state) => state.videoDuration,
    getVideoCurrentTime: (state) => state.videoCurrentTime,
    getPlaybackRate: (state) => state.playbackRate,
    getGlobalVideoZoom: (state) => state.videoZoom,
    getControlsShown: (state) => state.controlsShown,
    getMouseOverControls: (state) => state.mouseOverControls,
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
    setVideoPath({commit}, videoPath){
      commit('setVideoPath', videoPath)
    },
    setVideo({ commit }, videoHtmlElement) {
      commit('setVideo', videoHtmlElement)
    },
    setVideoPaused({ commit }, bool) {
      commit('setVideoPaused', bool)
    },
    setVideoDuration({ commit }, videoDuration) {
      commit('setVideoDuration', videoDuration)
    },
    setVideoCurrentTime({ commit }, videoCurrentTime) {
      commit('setVideoCurrentTime', videoCurrentTime);
    },
    setPlaybackRate({ commit }, playbackRate) {
      commit('setPlaybackRate', playbackRate);
    },
    forward({ state }) {
      state.video.currentTime += 5 * state.playbackRate;
    },
    backward({ state }) {
      state.video.currentTime -= 5 * state.playbackRate;
    },
    setGlobalVideoZoom({commit}, videoZoom) {
      commit('setGlobalVideoZoom', videoZoom)
    },

    // hiding and showing controls functions
    toggleControls({dispatch,state}, bool) {
      if(bool && state.video) {
        dispatch('showControls')
      }
      else {
        dispatch('hideControls')
      }
    },

    showControls({commit, state, dispatch}) {
      commit('setControlsShown', true);

      state.video.style.cursor = 'auto'

      // if the mouse is moving clear timeout, prevent hiding controls
      // and prevent hiding player header
      clearTimeout(this.hideControlsTimeout);
      this.hideControlsTimeout = setTimeout( () => { 
        dispatch('hideControls');
        dispatch('playerHeader/hideHeader')
        state.video.style.cursor = 'none'
      } , 3000);
      
      // if the mouse is over controls clear timeout, prevent hiding controls
      if(state.mouseOverControls == true) clearTimeout(this.hideControlsTimeout)
    },

    hideControls({commit}) {
      commit('setControlsShown', false);
    },
    setControlsShown({commit}, bool) {
      commit('setControlsShown', bool)
    },
    setMouseOverControls({commit}, bool) {
      commit('setMouseOverControls', bool);
    }
  },

  mutations: {
    setVideoPath: (state, videoPath) => state.videoPath = videoPath,
    setVideo: (state, videoHtmlElement) => state.video = videoHtmlElement,
    setVideoPaused: (state, bool) => state.videoPaused = bool,
    setVideoDuration: (state, videoDuration) => state.videoDuration = videoDuration,
    setVideoCurrentTime: (state, videoCurrentTime) => state.videoCurrentTime = videoCurrentTime,
    setPlaybackRate: (state, playbackRate) => state.playbackRate = playbackRate,
    setGlobalVideoZoom: (state, videoZoom) => state.videoZoom = videoZoom,
    setControlsShown: (state, bool) => state.controlsShown = bool,
    setMouseOverControls: (state, bool) => state.mouseOverControls = bool,
  },

  modules: {
    playerHeader,
  }
})
