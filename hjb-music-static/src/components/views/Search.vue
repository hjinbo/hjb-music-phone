<template>
    <div class="search">
        <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
        <div class="title-content" slot="">
          <el-input id="searchText"
              v-model="searchText"
              :placeholder="searchTextPlacehoder"
              clearable
              prefix-icon="el-icon-search">
          </el-input>
        </div>
        <div class="other" v-show="searchText === ''">
          <h4 class="searchHistoryTitle">历史记录
            <div class="clearHistory" v-on:click="clearHistory"></div>
          </h4>
          <div class="searchHistory" ref="historyWrap">
            <ul class="historyList" ref="historyTab">
              <li v-for="(his, index) in searchHistoryList" :key="index" v-on:click="chooseHistory(his.history)">{{ his.history }}</li>
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
          <div v-show="searchResultList.length > 0 ? 0 : 1">
            <load-more></load-more>
          </div>
          <scroll :data="searchResultList" ref="scroll">
            <div>
              <ul class="resultList">
                <li v-for="(res, index) in searchResultList" :key="index" v-on:click="choose(res.songId)">
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
          </scroll>
        </div>
    </div>
</template>

<script>
import { LoadMore, Toast } from 'vux'
import Scroll from '@/base/scroll/scroll'
import BScroll from 'better-scroll' // 横向滚动
import { search, searchHot } from '@/api/index.js'
import MusicBar from './MusicBar'
// import { ERR_OK } from '@/api/config'
// import { getMusicDetail, getMusicUrl, getLyric } from '@/api/index'
import { getSongParam } from '@/api/play'

export default {
  components: {
    Scroll,
    LoadMore,
    MusicBar,
    Toast
  },
  data () {
    return {
      searchTextPlacehoder: '请输入歌曲、歌手',
      searchText: '',
      searchHistoryList: null,
      searchResultList: [],
      hotSearchList: null,
      showResult: false,
      showOther: true,
      showTip: false,
      tipText: ''
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
      if (val !== '') {
        this.search(val)
      }
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
      this.searchHistoryList = this.$store.state.searchHisList
    },
    search (text) {
      search(text).then((response) => {
        var result = response.data.result
        this.setSearchResult(result, 20)
      })
    },
    clearHistory () {
      // this.searchHistoryList = []
      this.$store.state.searchHisList = []
    },
    choose (songId) {
      var getSongParamResult = getSongParam(songId)
      // if (getSongParamResult.errorNo !== ERR_OK) {
      // this.showTip = true
      // this.tipText = getSongParamResult.errorNo + ':' + getSongParamResult.errorInfo
      console.log(getSongParamResult.errorNo + ':' + getSongParamResult.errorInfo)
      // }
      this.searchText = ''
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
          songId: songId,
          songName: songName,
          singerName: singerName,
          songAlbum: songAlbum,
          songPic: songPic,
          type: type
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
    },
    chooseHistory (history) {
      this.searchText = history
    }
  }
}
</script>

<style lang="css">
.search {
    color: #969696;
    margin: 0 10px;
}
.search #searchText {
    background-color: #242424;
    color: #eee;
    border: 0px;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    outline: none;
}
.search .searchHistoryTitle {
    text-align: left;
    margin-top: 20px;
}
.search .searchHistory {
    width: 100%;
    float: left;
    overflow: hidden;
}
.search .clearHistory {
    float: right;
    width: 20px;
    height: 20px;
    background: url('../../assets/pic/clearHistory.png') no-repeat;
    background-size: 100% 100%;
}
.search .searchHistory .historyList {
    list-style: none;
    margin: 0;
    padding: 0;
}
.search .searchHistory li {
    float: left;
    margin: 5px;
    height: 23px;
    line-height: 23px;
    background-color: #686868;
    border-radius: 20px;
    padding: 0 5px;
}
.search .hotSearch {
    margin-top: 80px;
}
.search .hotSearch .hotSearchTitle {
    text-align: left;
}
.search .hotSearch .hotSearchList {
    list-style: none;
    margin: 0;
    padding: 0;
}
.search .hotSearch .hotSearchList li {
    float: left;
    margin: 5px;
    height: 23px;
    line-height: 23px;
    background-color: #686868;
    border-radius: 20px;
    padding: 0 5px;
}
.search .searchResult {
    width: 100%;
    height: 600px;
    margin: 10px auto;
}
.search .searchResult .resultList {
    list-style-type: none;
    height: 650px;
    margin-top: 30px;
    padding: 0 10px;
}
.search .searchResult .resultList li {
    font-size: 100%;
    font-weight: 400;
    height: 30px;
}
.search .searchResult .resultList li .song {
    float: left;
    width: 18px;
    height: 18px;
    background: url('../../assets/pic/song.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
}
.search .searchResult .resultList li .singer {
    float: left;
    width: 18px;
    height: 18px;
    background: url('../../assets/pic/singer.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
}
.search .searchResult .resultList li .songName {
    float: left;
}
.search .searchResult .resultList li .songName span {
    overflow: hidden;
    width: 180px;
    height: 17px;
}
.search .searchResult .resultList li .singerName {
    float: left;
    margin-left: 5px;
}
.search .searchResult .resultList li .singerName span {
    overflow: hidden;
    width: 180px;
    height: 17px;
}
</style>
