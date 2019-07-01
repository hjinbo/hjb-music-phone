import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/views/First'
import Recommand from '@/components/views/Recommand'
import SongListDetail from '@/components/views/SongListDetail'
import Search from '@/components/views/Search'
import Header from '@/components/views/Header'
import Singer from '@/components/views/Singer'
import SingerDetail from '@/components/views/SingerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'First',
      component: First
    },
    {
      path: '/recommand',
      name: 'Recommand',
      component: Recommand
    },
    {
      path: '/songListDetail',
      name: 'SongListDetail',
      component: SongListDetail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/singerDetail',
      name: 'SingerDetail',
      component: SingerDetail
    }
  ]
})
