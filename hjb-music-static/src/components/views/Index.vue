<template>
    <div class="index">
        <div class="header">
          <x-header :left-options="{backText: '', }">
            <tab>
              <tab-item :selected="index===1" @on-item-click="onItemClick" v-for="(item, index) in titleItem" :key="index">{{ item }}</tab-item>
            </tab>
            <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;" v-on:click="info"></x-icon>
            <a slot="right"><i slot="suffix" class="el-icon-search" v-on:click="search"></i></a>
        </x-header>
        </div>
        <div class="wrapper" ref="wrapper">
          <div class="content">
            <swiper loop auto :list="scrollerList" :index="scrollerIndex" @on-index-change="onIndexChange"></swiper>
            <div class="other-btn">
              <flexbox>
                <flexbox-item v-for="(flex, index) in flexList" :key="index">
                  <div class="flexItem"></div>
                  <div class="flexText">{{ flex }}</div>
                </flexbox-item>
              </flexbox>
            </div>
            <hr id="divider"/>
            <div class="songList">
              <div class="songListTitle">推荐歌单</div>
              <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/3" v-for="(i, index) in songList" :key="index">
                  <div>
                    <div class="songListPic"><img class="pic" :src="i.songListPic" width="100px" height="100px" /></div>
                    <div class="songListName">{{ i.songListName }}</div>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { Swiper, XHeader, Flexbox, FlexboxItem, Grid, GridItem, GroupTitle, Tabbar, TabbarItem, Tab, TabItem } from 'vux'
import BScroll from 'better-scroll'
import { getPlayLists, getBanners } from '@/api/index.js'

export default {
  components: {
    Swiper,
    XHeader,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    GroupTitle,
    Tabbar,
    TabbarItem,
    Tab,
    TabItem
  },
  data () {
    return {
      searchTextPlacehoder: '搜索',
      searchText: '',
      scrollerList: [],
      scrollerIndex: 0,
      titleItem: ['我的', '推荐', '发现', '朋友'],
      current: 1,
      flexList: ['每日推荐', '歌单', '排行榜', '热歌'],
      songList: [],
      curSong: {},
      processColor: '#C20C0C',
      isPlaying: false,
      curSongProcess: 0,
      currentTime: 0
    }
  },
  created () {
    // this.loadBanner()
    this.loadTop()
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
        click: true
      })
    },
    onIndexChange (index) {
      this.scrollerIndex = index
    },
    search () {
      this.$router.push('/search')
    },
    onItemClick (index) {
      console.log('on item click:', index)
    },
    info () {
      console.log('you look your info.')
    },
    loadTop () {
      getPlayLists(9, 'new').then((response) => {
        var playLists = response.data.playlists
        for (var i = 0; i < playLists.length; i++) {
          this.songList.push({
            'songListId': playLists[i].id,
            'songListName': playLists[i].name,
            'songListPic': playLists[i].coverImgUrl
          })
        }
      })
    },
    loadBanner () {
      getBanners.then((response) => {
        var banners = response.data.banners
        var list = []
        for (var i = 0; i < banners.length; i++) {
          list.push({
            'bannerId': banners[i].bannerId,
            'url': banners[i].url,
            'img': banners[i].pic
            // 'title': banners[i].typeTitle
          })
        }
        this.scrollerList = list
      })
    }
  }
}
</script>

<style>
@import "../../assets/css/index/index.css";
</style>
