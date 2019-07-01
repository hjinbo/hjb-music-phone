<template>
    <div class="index">
        <scroll class="app" :data="songList" ref="scroll">
          <div>
            <swiper class="scroller" loop auto :list="scrollerList" :index="scrollerIndex" @on-index-change="onIndexChange"></swiper>
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
              <flexbox :gutter="5" orient="vertical">
                <flexbox-item v-for="(i, index) in songList" :key="index">
                  <div v-on:click="clickSongList(i.songListId)">
                    <div class="songListPic">
                      <img class="pic" v-lazy="i.songListPic" width="60px" height="60px" />
                    </div>
                    <div class="songListRight">
                      <div class="songListName" :title="i.songListName">{{ i.songListName }}</div>
                      <div class="songListSign" :title="i.songListSign">{{ i.songListSign }}</div>
                    </div>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </scroll>
    </div>
</template>

<script>
import { Swiper, Flexbox, FlexboxItem, Grid, GridItem, GroupTitle, Tabbar, TabbarItem, ViewBox } from 'vux'
import Scroll from '@/base/scroll/scroll'
import { getPlayLists, getBanners } from '@/api/index.js'

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
    Scroll
  },
  data () {
    return {
      scrollerList: [],
      scrollerIndex: 0,
      flexList: ['每日推荐', '歌单排行', '发现', 'MV排行'],
      songList: [],
      curSong: {}
    }
  },
  created () {
    this.loadBanner()
    this.loadTop()
  },
  methods: {
    clickSongList (songListId) {
      console.log(songListId)
      this.$store.state.show.showHeader = false
      sessionStorage.setItem('songListId', songListId)
      this.$router.push('/songListDetail')
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
            songListDesc: playLists[i].description,
            songListSign: playLists[i].creator.signature
          })
        }
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

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
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
    background-color: gold;
}
.index .other-btn .flexText {
    margin: 10px auto;
    text-align: center;
    color: #fff;
}
.index .songList {
    margin: 20px 5px;
}
.index .songList .weui-cells__title {
    text-align: left;
}
#divider {
    border-width: 0.5px;
    border-color: #8e8e8e;
    width: 90%;
}
.index .songList .songListTitle {
    // text-align: left;
    margin: 20px 0;
    color: gold;
}
.index .songList .songListContent {
    float: left;
}
.index .songList .songListPic {
    width: 60px;
    height: 60px;
    float: left;
    margin-left: 10px;
}
.index .songList .songLicPic .pic {
    margin: 20px auto;
}
.index .songList .songListRight {
    width: 250px;
    height: 60px;
    margin: 10px 0;
    margin-left: 10px;
    float: left;
}
.index .songList .songListRight .songListName {
    overflow: hidden;
    color: #fff;
    height: 15px;
    line-height: 15px;
    font-size: 0.8rem;
}
.index .songList .songListRight .songListSign {
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    font-size: 0.6rem;
    height: 15px;
    line-height: 15px;
}
</style>
