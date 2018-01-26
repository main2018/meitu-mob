import Vue from 'vue'
import Router from 'vue-router'
import Home from 'comp/home/home'
import Photo from 'comp/photo/photo.vue'
import Design from 'comp/design/design.vue'
import Vedio from 'comp/vedio/vedio.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/photo',
      name: 'Photo',
      component: Photo
    }, {
      path: '/design',
      name: 'Design',
      component: Design
    }, {
      path: '/vedio',
      name: 'Vedio',
      component: Vedio
    }
  ]
})
