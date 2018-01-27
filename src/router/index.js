import Vue from 'vue'
import Router from 'vue-router'
import Home from 'comp/home/home'
import Photo from 'comp/photo/photo.vue'
// import PhotoDetail from 'comp/photo-detail/photo-detail.vue'
import Design from 'comp/design/design.vue'
import Vedio from 'comp/vedio/vedio.vue'
import Detail from 'comp/detail/detail.vue'

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
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
