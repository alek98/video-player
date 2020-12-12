import { ipcRenderer } from 'electron'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

ipcRenderer.send('my-custom-channel', "hello from Vue!")


// var data = ipcRenderer.sendSync('get-file-data')
// if (data ===  null) {
//     console.log("There is no file")
// } else {
//     // Do something with the file.
//     console.log(data)
// }


new Vue({
  render: h => h(App),
}).$mount('#app')
