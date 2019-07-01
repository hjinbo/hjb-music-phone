<template>
    <div class="musicBar">
        <audio :src="this.$store.state.currentSong.songUrl" autoplay="true" loop ref="musicPlayer"></audio>
        <tabbar>
          <div class="songPic" v-on:click="showLyric" :style="bgStyle"></div>
          <div class="songName">{{ this.$store.state.currentSong.songName }}</div>
          <div class="showSongList" v-on:click="showSongList"></div>
          <div class="play" v-on:click="playSwitch">
            <el-progress
              type="circle"
              :percentage="curSongProcess"
              :width=30
              :show-text=false
              :stroke-width=2
              :color="processColor"></el-progress>
            <div :class="{'pause': this.$store.state.currentSong.isPlaying}" class="switch" id="switch" ref="switch"></div>
          </div>
        </tabbar>
        <toast v-model="showTip" type="text" width="20em">{{ this.tipText }}</toast>
    </div>
</template>

<script>
import { Tabbar, Toast } from 'vux'
export default {
  components: {
    Tabbar,
    Toast
  },
  data () {
    return {
      curSong: {},
      processColor: '#FFD700',
      curSongProcess: 45,
      currentTime: 0,
      tipText: '歌都没有, 听个鬼哦',
      showTip: false
    }
  },
  computed: {
    bgStyle () {
      return 'background-image: url(' + this.$store.state.currentSong.songPic + ')'
    }
  },
  methods: {
    showLyric () {
      console.log('show lyric')
    },
    showSongList () {
      console.log('show songList')
    },
    playSwitch () {
      if (this.$refs.musicPlayer.src === '' || this.$refs.musicPlayer.src === null || this.$refs.musicPlayer.src === undefined) {
        this.showTip = true
        return
      }
      if (!this.$store.state.currentSong.isPlaying) {
        this.$refs.musicPlayer.play()
        this.$store.state.currentSong.isPlaying = true
      } else {
        this.$refs.musicPlayer.pause()
        this.$store.state.currentSong.isPlaying = false
      }
    }
  }
}
</script>

<style>
.musicBar .weui-tabbar {
    position: fixed !important;
    left: 0px;
    width: 101%;
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
    width: 200px;
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
</style>
