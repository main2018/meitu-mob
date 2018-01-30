import Vue from 'vue'
import Router from 'vue-router'
import Home from 'comp/home/home'
import Photo from 'comp/photo/photo.vue'
// import PhotoDetail from 'comp/photo-detail/photo-detail.vue'
import mediaDetail from 'comp/media-detail/media-detail.vue'
import Design from 'comp/design/design.vue'
import Video from 'comp/video/video.vue'
import Detail from 'comp/detail/detail.vue'
import Admin from 'comp/admin/admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/admin',
      name: 'Admin',
      component: Admin
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
    }, {
      path: '/mediadetail',
      name: 'mediaDetail',
      component: mediaDetail
    }
  ]
})
