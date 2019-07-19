// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueScroller from 'vue-scroller'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import store from './store'
import VueLazyload from 'vue-lazyload'
import '../theme/slider.css'

Vue.use(ElementUI)
Vue.use(VueScroller)
Vue.use(VueLazyload)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
