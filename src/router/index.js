import Vue from 'vue'
import Router from 'vue-router'
import Home from 'comp/home/home'
// import mediaDetail from 'comp/media-detail/media-detail.vue'
import Admin from 'admin/home/home.vue'
// import Detail from 'comp/detail/detail.vue'
// import About from 'comp/about/about.vue'
// import Design from 'comp/design/design.vue'
// import Video from 'comp/video/video.vue'
// import Media from 'comp/media/media.vue'
// import Photo from 'comp/photo/photo.vue'
// import PhotoDetail from 'comp/photo-detail/photo-detail.vue'

Vue.use(Router)

const routes = [
  { path: '/',
    component: Home
  }, {
    path: '/admin',
    component: Admin
  /*
  }, {
    path: '/about',
    component: About
  }, {
    path: '/__detail',
    component: Detail
  }, {
    path: '/mediadetail',
    component: mediaDetail
  */
  }
]

export default routes
