const state = {
  playerHeaderHtmlElem: undefined,
  headerShown: true,
}

const getters = {
  getHeaderShown: (state) => state.headerShown,
}

const actions = {
  toggleHeader({ dispatch }, bool) {
    if (bool) {
      dispatch('showHeader');
    }
    else {
      dispatch('hideHeader');
    }
  },
  showHeader({ dispatch }) {
    state.playerHeaderHtmlElem.style.top = '0px';
    dispatch('setHeaderShown', true);
  },
  hideHeader({ dispatch }) {
    state.playerHeaderHtmlElem.style.top = '-120px';
    dispatch('setHeaderShown', false);
  },
  setHeaderShown({ commit }, bool) {
    commit('setHeaderShown', bool);
  },

  setPlayerHeaderHtmlElem({ commit }, playerHeaderHtmlElem) {
    commit('setPlayerHeaderHtmlElem', playerHeaderHtmlElem);
  },
}

const mutations = {
  setHeaderShown: (state, bool) => state.mouseOverControls = bool,
  setPlayerHeaderHtmlElem: (state, playerHeaderHtmlElem) =>
    state.playerHeaderHtmlElem = playerHeaderHtmlElem,

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}