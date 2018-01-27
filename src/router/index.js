import Vue from 'vue'
import Router from 'vue-router'
import Home from 'comp/home/home'
import Photo from 'comp/photo/photo.vue'
// import PhotoDetail from 'comp/photo-detail/photo-detail.vue'
import Design from 'comp/design/design.vue'
import Video from 'comp/video/video.vue'
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
      path: '/video',
      name: 'Video',
      component: Video
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
