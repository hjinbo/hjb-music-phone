<template>
  <div class='player'>
    <div class='songDetail' v-show='fullScreen' ref='songDetail'>
      <div class='fullScreenBg' :style='bgStyle'></div>
      <h2 class='header'>
        <span class="smaller" v-on:click="smaller"></span>{{ this.$store.state.currentSong.songName }}
      </h2>
      <p class='singerName'>{{ this.$store.state.currentSong.singerName }}</p>
      <div v-show='!showCom'>
        <Scroll :data="lyricList" ref="lyricList" class="app lyricDiv">
          <div>
            <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
            <div v-if="lyricList.length > 0">
              <p ref="lyricLine"
                class="text"
                :class="{'current': currentLineNum === index}"
                v-for="(line, index) in lyricList"
                :key="index">{{ line.text }}</p>
            </div>
            <div v-else>暂无歌词</div>
            <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
          </div>
        </Scroll>
      </div>
      <transition name="fade1">
        <div v-show='showCom'>
          <Comments :songId="this.$store.state.currentSong.songId" ref="comments"></Comments>
        </div>
      </transition>
      <tabbar>
        <el-slider v-model="percentage" :show-tooltip=false @change="percentageChange($event)"></el-slider>
        <div class='operator'>
            <flexbox :gutter='0'>
                <flexbox-item>
                    <div class='flex-demo'>
                        <div class='loop'
                          :class="{'shuffle': this.playType === 2, 'one': this.playType === 3}"
                          v-on:click='changePlayType' ref='playType'></div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class='flex-demo'>
                        <div class='pre' v-on:click='pre'></div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class='flex-demo'>
                        <div class='pause' :class="{'playing': this.isPlaying}" v-on:click='pause'></div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class='flex-demo'>
                        <div class='next' v-on:click='next'></div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class='flex-demo'>
                        <div class='comments' v-on:click='showComments' :class="{'commentsOpen': showCom}"></div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
      </tabbar>
    </div>
    <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
    <audio :src='this.$store.state.currentSong.songUrl' autoplay='true' ref='musicPlayer'
      @timeupdate="timeUpdate" @ended="songEnd"></audio>
    <div class='mini' v-show='!fullScreen'>
        <div class='musicBar'>
          <transition name="list-fade">
            <div v-show="showPlayList" class="playList">
              <PlayList></PlayList>
            </div>
          </transition>
          <tabbar>
            <div class='songPic' v-on:click='showLyric' :style='bgStyle'></div>
            <div class='songName' v-on:click='showLyric'>{{ this.$store.state.currentSong.songName }}</div>
            <div class='showSongList' v-on:click='showSongList'></div>
            <div class='play' v-on:click='playSwitch'>
              <el-progress
                type='circle'
                :percentage="percentage"
                :width=30
                :show-text=false
                :stroke-width=2
                :color='processColor'></el-progress>
              <div :class="{'pause': this.$store.state.currentSong.isPlaying}"
                class='switch' id='switch' ref='switch'></div>
            </div>
          </tabbar>
        </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabItem, Flexbox, FlexboxItem, Toast, Swiper, SwiperItem } from 'vux'
import Scroll from '@/base/scroll/scroll'
import { timeStr2Second } from '@/api/play'
import { getMusicUrl } from '@/api/index'
import { ERR_OK } from '@/api/config'
import Comments from '@/base/comments/comments'
import PlayList from '@/base/playList/playList'

export default {
  components: {
    XHeader,
    Tabbar,
    TabItem,
    Flexbox,
    FlexboxItem,
    Toast,
    Swiper,
    SwiperItem,
    Scroll,
    Comments,
    PlayList
  },
  data () {
    return {
      showTip: false,
      tipText: '',
      showLrc: true,
      processColor: '#FFD700',
      fullScreen: false,
      headerName: '',
      progressColor: 'gold',
      playType: 1,
      isPlaying: false,
      lyricList: [],
      currentLineNum: 0,
      lrcTimeList: [],
      lrcList: [],
      showCom: false,
      commentsList: [],
      showPlayList: false,
      currentTime: 0,
      percentage: 0
    }
  },
  watch: {
    currentLineNum (newNum, oldNum) {
      if (newNum > 5) {
        let lineEl = this.$refs.lyricLine[newNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else if (this.currentLineNum <= 0) {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    currentTime (newVal, oldVal) {
      this.percentage = newVal / this.$store.state.currentSong.duration * 100
      this.locateLyric(newVal)
    }
  },
  computed: {
    bgStyle () {
      return 'background-image: url(' + this.$store.state.currentSong.songPic + ')'
    }
  },
  methods: {
    percentageChange (percent) {
      const currentTime = this.$refs.musicPlayer.duration * percent / 100
      this.$refs.musicPlayer.currentTime = currentTime
    },
    showLyric () {
      this.isPlaying = this.$store.state.currentSong.isPlaying
      this.loadLyric(this.$store.state.currentSong.songLrc)
      this.fullScreen = true
    },
    resetSong (id) {
      getMusicUrl(id).then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '获得歌曲失败'
          return
        }
        var song = res.data.data[0]
        var songUrl = song.url
        var curParam = this.$store.state.vPlayList[this.$store.state.playIndex]
        curParam.songUrl = songUrl
        this.$store.dispatch('setCurrentSongFun', curParam)
        this.loadLyric(this.$store.state.currentSong.songLrc)
      })
    },
    showSongList () {
      this.showPlayList = !this.showPlayList
    },
    playSwitch () {
      if (this.$refs.musicPlayer.src === '' || this.$refs.musicPlayer.src === null || this.$refs.musicPlayer.src === undefined) {
        this.showTip = true
        this.tipText = '歌都没有, 听个鬼哦'
        return
      }
      if (!this.$store.state.currentSong.isPlaying) {
        this.$refs.musicPlayer.play()
        this.$store.state.currentSong.isPlaying = true
        this.isPlaying = true
      } else {
        this.$refs.musicPlayer.pause()
        this.$store.state.currentSong.isPlaying = false
        this.isPlaying = false
      }
    },
    smaller () {
      this.fullScreen = false
    },
    changePlayType () {
      // 1 -> 2 为列表循环切换成随机播放
      if (this.playType === 1) {
        this.playType = 2
        this.shuffle()
      // 2 -> 3 为随机播放切换成单曲循环
      } else if (this.playType === 2) {
        this.playType = 3
      // 3 -> 1 为单曲循环切换成列表循环
      } else if (this.playType === 3) {
        this.playType = 1
        this.$store.state.vPlayList = this.$store.state.playList
      }
    },
    shuffle () {
      // 此逻辑参考knuth-shuffle算法
      var list = this.$store.state.vPlayList
      for (var i = list.length - 1; i >= 0; i--) {
        var r = Math.floor(Math.random() * (i + 2)) % (i + 1)
        var tmp = list[i]
        list[i] = list[r]
        list[r] = tmp
      }
      this.$store.state.vPlayList = list
    },
    pre () {
      this.listNull()
      if (this.$store.state.playIndex === 0) {
        this.$store.state.playIndex = this.$store.state.playList.length - 1 > 0 ? this.$store.state.playList.length - 1 : 0
      } else {
        this.$store.state.playIndex--
      }
      var songId = this.$store.state.vPlayList[this.$store.state.playIndex].songId
      // 重新设置songUrl避免失效
      this.resetSong(songId)
      // this.$store.dispatch('setCurrentSongFun', this.$store.state.vPlayList[this.$store.state.playIndex])
      if (!this.isPlaying) {
        this.isPlaying = true
        this.$store.state.currentSong.isPlaying = true
      }
    },
    pause () {
      this.listNull()
      // 暂停
      if (this.$store.state.currentSong.isPlaying) {
        this.$refs.musicPlayer.pause()
        this.$store.state.currentSong.isPlaying = false
        this.isPlaying = false
      // 播放
      } else {
        this.$refs.musicPlayer.play()
        this.$store.state.currentSong.isPlaying = true
        this.isPlaying = true
      }
    },
    next () {
      this.listNull()
      if (this.$store.state.playIndex === this.$store.state.playList.length - 1) {
        this.$store.state.playIndex = 0
      } else {
        this.$store.state.playIndex++
      }
      var songId = this.$store.state.vPlayList[this.$store.state.playIndex].songId
      // 重新设置songUrl避免失效
      this.resetSong(songId)
      // this.$store.dispatch('setCurrentSongFun', this.$store.state.vPlayList[this.$store.state.playIndex])
      if (!this.isPlaying) {
        this.isPlaying = true
        this.$store.state.currentSong.isPlaying = true
      }
    },
    listNull () {
      if (this.$store.state.playList.length === 0) {
        this.showTip = true
        this.tipText = '请添加歌曲'
      }
    },
    // 解析歌词
    loadLyric (lrc) {
      this.lrcList = []
      this.lrcTimeList = []
      this.lyricList = []
      var lrcListTmp = lrc.split('[')
      for (var i = 1; i < lrcListTmp.length; i++) {
        var b = lrcListTmp[i].split(']')
        this.lrcList.push(b)
      }
      for (var j = 0; j < this.lrcList.length; j++) {
        var d = this.lrcList[j][0].split('.')
        this.lrcTimeList.push(d[0])
        this.lyricList.push({
          text: this.lrcList[j][1],
          time: d[0]
        })
      }
    },
    // 定位歌词
    locateLyric (currentTime) {
      this.currentLineNum = 0
      for (var i = 0; i < this.lrcTimeList.length; i++) {
        if (currentTime >= timeStr2Second(this.lrcTimeList[i]) && currentTime <= timeStr2Second(this.lrcTimeList[i + 1])) {
          this.currentLineNum = i
          break
        }
      }
    },
    showComments () {
      this.showCom = !this.showCom
    },
    songEnd () {
      // 3 为单曲循环
      if (this.playType === 3) {
        console.log('loop')
        this.pause()
        this.pause()
      } else {
        if (this.$store.state.vPlayList.length === 1) {
          this.pause()
          this.pause()
        } else {
          console.log('next')
          this.next()
        }
      }
      this.$refs.lyricList.scrollTo(0, 0, 1000)
    },
    timeUpdate (e) {
      this.currentTime = e.target.currentTime
    }
  }
}
</script>

<style scoped>
.musicBar .weui-tabbar {
    position: fixed !important;
    left: 0px;
    width: 100%;
    height: 50px;
    z-index: 500;
    background-color: #383838 !important;
    border-top: 0.5px solid #383838;
}
.musicBar .weui-tabbar .songPic {
    margin: 10px 10px;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-left: 10px;
    background-size: 100% 100%;
    position: relative;
    z-index: 10;
}
/* img:not([src]) {
    opacity: 0;
} */
.musicBar .weui-tabbar .songName {
    position: relative;
    margin: 10px 0;
    height: 30px;
    text-align: left;
    color: #eee;
    width: 230px;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.musicBar .weui-tabbar .showSongList {
    margin: 10px 0;
    position: absolute;
    right: 10px;
    width: 30px;
    height: 30px;
    background: url('../../assets/pic/showSongList.png') no-repeat;
    background-size: 100% 100%;
}
.musicBar .weui-tabbar .play {
    position: absolute;
    right: 60px;
    margin: 10px 0;
    width: 32px;
    height: 32px;
}
.musicBar .weui-tabbar .play .switch {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 30px;
    height: 30px;
    transform: scale(0.6);
    background: url('../../assets/pic/play.png') no-repeat;
    background-size: 100% 100%;
}
.musicBar .weui-tabbar .play .pause {
    position: absolute;
    right: 1px;
    top: 0px;
    width: 30px;
    height: 30px;
    transform: scale(0.6);
    background: url('../../assets/pic/pause.png') no-repeat;
    background-size: 100% 100%;
}

/* 全屏模式 */
.songDetail {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(34, 34, 34);
    text-align: center;
}
.songDetail .header {
    color: #eee;
}
.songDetail .header .smaller {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 0;
    top: -5px;
    background: url('../../assets/pic/smaller.png') no-repeat;
}
.player .fullScreenBg {
    width: 100%;
    height: 100%;
    background: no-repeat;
    background-size: 100% 100%;
    opacity: 0.3;
    position: absolute;
    -webkit-filter: blur(8px); /* Chrome, Safari, Opera */
    filter: blur(8px);
}
.songDetail .weui-tabbar {
    position: fixed;
    background-color: rgba(34, 34, 34, 0.1);
    /* opacity: 0.8; */
    left: 0;
}
.songDetail .weui-tabbar:before {
    border-top: none;
}
.songDetail .weui-tabbar .el-slider {
    position: absolute;
    width: 100%;
    margin-top: -10px;
}
.singerName {
    color: #eee;
    overflow: hidden;
}
.app {
    width: 100vw;
    height: 60vh;
    overflow: hidden;
}
.lyricDiv {
    margin-top: 50px;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    cursor: grab;
    font-size: 16px;
    font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
    -webkit-mask-image: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,.6) 15%,rgba(255,255,255,1) 25%,rgba(255,255,255,1) 75%,rgba(255,255,255,.6) 85%,rgba(255,255,255,0) 100%);
    mask-image: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,.6) 15%,rgba(255,255,255,1) 25%,rgba(255,255,255,1) 75%,rgba(255,255,255,.6) 85%,rgba(255,255,255,0) 100%);
}
.lyricDiv .text {
    height: 16px;
    line-height: 16px;
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 12px;
    overflow: hidden;
}
.lyricDiv .current {
    color: gold;
    transform: scale(1.05);
    transition: .2s
}
.operator {
    width: 100%;
    height: 100px;
    /* background-color: #242424; */
}
.operator .loop {
    width: 28px;
    height: 28px;
    background: url('../../assets/pic/playbar.png') no-repeat;
    background-position: -3px -344px;
    transform: scale(1.5);
    margin: 0 auto;
}
.operator .shuffle {
    background-position: -66px -248px;
}
.operator .one {
    background-position: -66px -344px;
}
.operator .playFun {
    width: 60%;
    height: 40%;
    margin: 20px auto;
}
.operator .vux-flexbox {
    height: 70%;
    margin-top: 20px;
}
.operator .flex-demo .pre {
    width: 28px;
    height: 28px;
    background: url('../../assets/pic/playbar.png') no-repeat;
    background-position: 0 -130px;
    transform: scale(1.5);
    margin: 0 auto;
}
.operator .flex-demo .pause {
    width: 36px;
    height: 36px;
    background: url('../../assets/pic/playbar.png') no-repeat;
    background-position: 0 -204px;
    transform: scale(1.5);
    margin: 0 auto;
    margin-top: -3px;
}
.operator .flex-demo .playing {
    background-position: 0 -165px;
}
.operator .flex-demo .next {
    width: 28px;
    height: 28px;
    background: url('../../assets/pic/playbar.png') no-repeat;
    background-position: -80px -130px;
    transform: scale(1.5);
    margin: 0 auto;
}
.operator .flex-demo .comments {
    width: 28px;
    height: 28px;
    background: url('../../assets/pic/player.png') no-repeat;
    background-position: 0 -400px;
    transform: scale(1.5);
    margin: 0 auto;
    margin-top: 8px;
}
.operator .flex-demo .commentsOpen {
    background-position: -30px -400px;
}
.comments {
    position: relative;
    z-index: 1000;
}
.playList {
    position: fixed;
    bottom: 50px;
    z-index: 1200;
}
.list-fade-enter {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
.list-fade-leave-to {
  transform: translate3d(0, 100%, 0);
}
.list-fade-leave {
  opacity: 1;
}
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.3s;
}

.fade1-enter-active{
  transition: all 0.2s;
}
.fade1-enter{
  opacity: 0;
  transform: translate3d(20%, 0, 0);
}
.fade1-enter{
  opacity: 0.9;
}
.fade2-leave-active{
  transition: all 0.2s;
}
.fade2-leave{
  opacity: 0;
  transform: translate3d(20%, 0, 0);
}
.fade2-leave{
  opacity: 0.9;
}
</style>
