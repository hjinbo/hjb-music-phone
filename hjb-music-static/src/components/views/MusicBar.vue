<template>
    <div class="musicBar">
        <audio :src="this.$store.state.currentSong.songUrl" ref="musicPlayer"></audio>
        <tabbar>
          <div class="songPic" v-on:click="showLyric">
            <img :src="this.$store.state.currentSong.songPic" class="curSongPic"/>
          </div>
          <div class="songName">{{ this.$store.state.currentSong.songName }}</div>
          <div class="showSongList" v-on:click="showSongList"></div>
          <div class="play">
            <el-progress
              type="circle"
              :percentage="curSongProcess"
              :width=30
              :show-text=false
              :stroke-width=2
              :color="processColor"></el-progress>
            <div class="switch" v-on:click="playSwitch" id="switch"></div>
          </div>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar } from 'vux'
export default {
  components: {
    Tabbar
  },
  data () {
    return {
      curSong: {},
      processColor: '#C20C0C',
      isPlaying: false,
      curSongProcess: 0,
      currentTime: 0
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
      if (!this.isPlaying) {
        this.$refs.musicPlayer.play()
        this.isPlaying = true
      } else {
        this.$refs.musicPlayer.pause()
        this.isPlaying = false
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
    /* background: url('http://p1.music.126.net/D_e8zPgwkKCk1uSF-HSgbw==/18806046883327256.jpg?param=130y130') no-repeat; */
    background-size: 100% 100%;
}
.musicBar .weui-tabbar .songPic .curSongPic {
    width: 30px;
    height: 30px;
}
.musicBar .weui-tabbar .songName {
    margin: 10px 0;
    height: 30px;
    text-align: left;
    color: #eee;
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
    right: -1px;
    top: -1px;
    width: 30px;
    height: 30px;
    transform: scale(0.5);
    background: url('../../assets/pic/play.png') no-repeat;
    background-size: 100% 100%;
}
</style>
