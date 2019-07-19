<template>
    <div class="index">
        <scroll class="app" :data="songList" ref="scroll">
          <div>
            <swiper class="scroller" loop auto :list="scrollerList" :index="scrollerIndex" @on-index-change="onIndexChange"></swiper>
            <div class="other-btn">
              <flexbox>
                <flexbox-item v-for="(flex, index) in flexList" :key="index">
                  <div class="flexItem" v-on:click="itemClick(flex.path)"></div>
                  <div class="flexText">{{ flex.name }}</div>
                </flexbox-item>
              </flexbox>
            </div>
            <hr id="divider"/>
            <div class="songList">
              <SongListList :songList="songList" :title="title"></SongListList>
            </div>
          </div>
        </scroll>
    </div>
</template>

<script>
import { Swiper, Flexbox, FlexboxItem, Grid, GridItem, GroupTitle, Tabbar, TabbarItem, ViewBox } from 'vux'
import Scroll from '@/base/scroll/scroll'
import { getPlayLists, getBanners } from '@/api/index.js'
import SongListList from '@/base/songListList/songListList'

export default {
  components: {
    Swiper,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    GroupTitle,
    Tabbar,
    TabbarItem,
    ViewBox,
    Scroll,
    SongListList
  },
  data () {
    return {
      scrollerList: [],
      scrollerIndex: 0,
      flexList: [
        {name: '每日推荐', path: '/'},
        {name: '推荐歌单', path: '/personalized'},
        {name: '发现', path: '/'},
        {name: 'MV排行', path: '/'}
      ],
      songList: [],
      curSong: {},
      title: ''
    }
  },
  created () {
    this.loadBanner()
    this.loadTop()
  },
  methods: {
    itemClick (path) {
      this.$router.push(path)
    },
    onIndexChange (index) {
      this.scrollerIndex = index
    },
    loadTop () {
      getPlayLists().then((response) => {
        var playLists = response.data.playlists
        var list = []
        for (var i = 0; i < playLists.length; i++) {
          list.push({
            songListId: playLists[i].id,
            songListName: playLists[i].name,
            songListPic: playLists[i].coverImgUrl,
            songListDesc: playLists[i].description
          })
        }
        this.title = '网友精选歌单'
        this.songList = list
      })
    },
    loadBanner () {
      getBanners(1).then((response) => {
        var banners = response.data.banners
        var list = []
        for (var i = 0; i < banners.length; i++) {
          list.push({
            bannerId: banners[i].bannerId,
            url: banners[i].url,
            img: banners[i].pic
          })
        }
        this.scrollerList = list
      })
    }
  }
}
</script>

<style scoped lang="css">
.app {
  width: 100vw;
  height: 83vh;
  overflow: hidden;
}
.index .scroller {
    margin: 0 5px;
    border-radius: 20px;
}
.index .vux-slider .vux-swiper .vux-swiper-item .vux-img {
    background-size: 100% 100%;
}
.index .other-btn {
    margin: 0 auto;
    margin-top: 20px;
}
.index .other-btn .flexItem {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin: 0 auto;
    background: linear-gradient(right top, white, gold);
}
.index .other-btn .flexText {
    margin: 10px auto;
    text-align: center;
    color: #fff;
}
.index .songList {
    margin: 20px 5px;
}
#divider {
    border-width: 0.5px;
    border-color: #8e8e8e;
    width: 90%;
}
</style>
