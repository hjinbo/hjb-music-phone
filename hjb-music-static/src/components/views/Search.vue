<template>
    <div class="search">
        <div class="header">
            <x-header :left-options="{backText: ''}">
                <div class="title-content" slot="">
                    <el-input id="searchText"
                        v-model="searchText"
                        :placeholder="searchTextPlacehoder"
                        clearable
                        prefix-icon="el-icon-search">
                    </el-input>
                </div>
            </x-header>
        </div>
        <div class="other" v-show="searchText === ''">
          <h4 class="searchHistoryTitle">历史记录
            <div class="clearHistory" v-on:click="clearHistory"></div>
          </h4>
          <div class="searchHistory" ref="historyWrap">
            <ul class="historyList" ref="historyTab">
              <li v-for="(his, index) in searchHistoryList" :key="index">{{ his.history }}</li>
            </ul>
          </div>
          <div class="hotSearch">
            <h4 class="hotSearchTitle">热搜榜</h4>
              <load-more v-show="hotSearchList === null"></load-more>
              <ul class="hotSearchList">
                <li v-for="(hot, index) in hotSearchList" :key="index" v-on:click="chooseHot(hot.hot)">{{ hot.hot }}</li>
              </ul>
          </div>
        </div>
        <div class="searchResult" v-show="searchText !== ''">
          <load-more v-show="searchResultList === null"></load-more>
          <ul class="resultList">
            <li v-for="(res, index) in searchResultList" :key="index" v-on:click="choose(res.songId, res.type)">
              <div :class="res.type"></div>
              <div class="songName" v-show="res.type === 'song'">
                <span>{{ res.songName }} -</span>
              </div>
              <div class="singerName">
                <span>{{ res.singerName }}</span>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
import { XHeader, LoadMore } from 'vux'
import BScroll from 'better-scroll'
import { search, searchHot, getMusicDetail, getMusicUrl, getLyric } from '@/api/index.js'

export default {
  components: {
    XHeader,
    LoadMore
  },
  data () {
    return {
      searchTextPlacehoder: '搜索',
      searchText: '',
      searchHistoryList: null,
      searchResultList: null,
      hotSearchList: null,
      showResult: false,
      showOther: true
    }
  },
  created () {
    this.getHistory()
    this.loadHot()
    this.$nextTick(() => {
      this.historyScroll()
    })
  },
  watch: {
    searchText (val, oldVal) {
      this.search(val)
    }
  },
  methods: {
    historyScroll () {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = 6 * 120
      this.$refs.historyTab.style.width = width + 'px'
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.historyWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    getHistory () {
      this.searchHistoryList = [
        {'history': '独家记忆'},
        {'history': 'you are not alone'},
        {'history': '十年'},
        {'history': '周杰伦'},
        {'history': 'love to be loved by you'},
        {'history': 'you are not alone'}
      ]
    },
    search (text) {
      search(text).then((response) => {
        var result = response.data.result
        this.setSearchResult(result, 20)
      })
    },
    clearHistory () {
      console.log('clear history')
      this.searchHistoryList = []
    },
    choose (id, type) {
      if (type === 'song') {
        console.log('you click a song')
        var songUrl = ''
        var songLrc = ''
        var songName = ''
        var singerName = ''
        var songAlbum = ''
        var songPic = ''
        var songId = id
        getMusicDetail(songId).then((response) => {
          var song = response.data.songs[0]
          songName = song.name
          for (var i = 0; i < song.ar.length; i++) {
            singerName += song.ar[i].name + '&'
          }
          if (singerName.length > 0) {
            singerName = singerName.substring(0, singerName.length - 1)
          }
          songAlbum = song.al
          songPic = song.al.picUrl
          getMusicUrl(songId).then((response) => {
            var song = response.data.data[0]
            songUrl = song.url
            getLyric(songId).then((response) => {
              songLrc = response.data.lrc
              var param = {
                'songName': songName,
                'songAlbum': songAlbum,
                'singerName': singerName,
                'songPic': songPic,
                'songUrl': songUrl,
                'songLrc': songLrc
              }
              // 将获取到的信息保存在vuex中
              this.$store.dispatch('setCurrentSongFun', param)
              this.$router.push('/index')
              this.searchResultList = []
            })
          })
        })
      } else if (type === 'singer') {
        console.log('you click a singer')
      }
    },
    setSearchResult (result, num) {
      var list = []
      for (var i = 0; i < num; i++) {
        var song = result.songs[i]
        var songName = song.name
        // 显示过长截取
        if (songName.length > 10) {
          songName = songName.substring(0, 10) + '...'
        }
        var singerName = ''
        var artists = song.artists
        for (var a = 0; a < artists.length; a++) {
          singerName += artists[a].name + '&'
        }
        if (singerName.length > 0) {
          singerName = singerName.substring(0, singerName.length - 1)
        }
        // 显示过长截取
        if (singerName.length > 10) {
          singerName = singerName.substring(0, 10) + '...'
        }
        var type = 'song'
        var songAlbum = song.album.name
        var songPic = ''
        var songId = song.id
        list.push({
          'songId': songId,
          'songName': songName,
          'singerName': singerName,
          'songAlbum': songAlbum,
          'songPic': songPic,
          'type': type
        })
      }
      this.searchResultList = list
    },
    loadHot () {
      searchHot().then((response) => {
        var hots = response.data.result.hots
        var list = []
        for (var i = 0; i < hots.length; i++) {
          list.push({
            'hot': hots[i].first
          })
        }
        this.hotSearchList = list
      })
    },
    chooseHot (hot) {
      this.searchText = hot
    }
  }
}
</script>

<style>
@import "../../assets/css/search/search.css";
</style>
