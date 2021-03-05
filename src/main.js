// import { ipcRenderer } from 'electron'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// ipcRenderer.send('my-custom-channel', process.argv)


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
