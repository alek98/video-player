// import { ipcRenderer } from 'electron'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store'

Vue.config.productionTip = false

// ipcRenderer.send('my-custom-channel', process.argv)


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
