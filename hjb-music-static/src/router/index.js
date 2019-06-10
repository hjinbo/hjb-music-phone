import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/views/First'
import Index from '@/components/views/Index'
import Index2 from '@/components/views/Index2'
import Search from '@/components/views/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'First',
      component: First
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/index2',
      name: 'Index2',
      component: Index2
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
