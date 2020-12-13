import { ipcRenderer } from 'electron'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

ipcRenderer.send('my-custom-channel', process.argv)


new Vue({
  render: h => h(App),
}).$mount('#app')
