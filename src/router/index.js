import Vue from 'vue';
import Router from 'vue-router';
import Player from '../components/Player.vue'
import Home from '../components/home/Home.vue'

Vue.use(Router)
let router = new Router({
  routes : [
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/player',
      name: 'player',
      component: Player,
    },
  ]
})

export default router;