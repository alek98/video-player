// import { ipcRenderer } from 'electron'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'

Vue.config.productionTip = false

// ipcRenderer.send('my-custom-channel', process.argv)


new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
