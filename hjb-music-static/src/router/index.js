import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/views/First'
import Recommand from '@/components/views/Recommand'
import Search from '@/components/views/Search'
import Singer from '@/components/views/Singer'
import SingerDetail from '@/components/views/SingerDetail'
import SongListDetail from '@/components/views/SongListDetail'
import Mine from '@/components/views/Mine'
import Personalized from '@/components/views/Personalized'
import MySongList from '@/components/views/MySongList'
import MyCollection from '@/components/views/MyCollection'
import Follows from '@/components/views/Follows'
import Followeds from '@/components/views/Followeds'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/first',
      name: 'First',
      component: First
    },
    {
      path: '/recommand',
      name: 'Recommand',
      component: Recommand
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
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
    },
    {
      path: '/songListDetail',
      name: 'SongListDetail',
      component: SongListDetail
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/personalized',
      name: 'Personalized',
      component: Personalized
    },
    {
      path: '/mySongList',
      name: 'MySongList',
      component: MySongList
    },
    {
      path: '/myCollection',
      name: 'MyCollection',
      component: MyCollection
    },
    {
      path: '/follows',
      name: 'Follows',
      component: Follows
    },
    {
      path: '/followeds',
      name: 'Followeds',
      component: Followeds
    }
  ]
})
