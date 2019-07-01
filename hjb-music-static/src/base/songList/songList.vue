<template>
    <div class="songList">
        <x-header class="header" :left-options="{backText: '', preventGoBack: true}" @on-click-back="songListBack">{{ headerName }}</x-header>
        <div class="bgImageBack"></div>
        <div class="bgImage" :style="bgStyle"></div>
        <load-more v-if="songList.length > 0 ? 0 : 1"></load-more>
        <scroll class="app" :data="songList" ref="scroll">
        <div class="ulDiv">
            <div v-for="(song, index) in songList" :key="index" class="songLine" @click="choose(song.songId)">
            <div class="songName">{{ song.songName }}</div>
            <div class="singerAndAlbum">
                {{ song.singerName }}&nbsp;-&nbsp;{{ song.songAlbum }}
            </div>
            </div>
        </div>
        </scroll>
        <toast v-model="this.showTip" type="text" width="20em">{{ this.tipText }}</toast>
    </div>
</template>

<script>
import { XHeader, LoadMore, Toast } from 'vux'
import { getMusicDetail, getLyric, getMusicUrl } from '@/api/index.js'
import Scroll from '@/base/scroll/scroll'

export default {
  components: {
    XHeader,
    LoadMore,
    Toast,
    Scroll
  },
  data () {
    return {
      showTip: false,
      tipText: '歌曲播放失败'
    }
  },
  props: {
    songList: {
      type: Array
    },
    headerName: {
      type: String
    },
    bgImg: {
      type: String
    }
  },
  methods: {
    choose (id) {
      var songUrl = ''
      var songLrc = ''
      var songName = ''
      var singerName = ''
      var songAlbum = ''
      var songPic = ''
      var songId = id
      getMusicDetail(songId).then((response) => {
        if (response.data.code !== 200) {
          this.showTip = true
          return
        }
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
              songName: songName,
              songAlbum: songAlbum,
              singerName: singerName,
              songPic: songPic,
              songUrl: songUrl,
              songLrc: songLrc
            }
            // 将获取到的信息保存在vuex中
            this.$store.dispatch('setCurrentSongFun', param)
            this.$store.state.show.showMusicBar = true
            this.$store.state.currentSong.isPlaying = true
          })
        })
      })
    },
    songListBack () {
      this.$emit('back')
    }
  },
  computed: {
    bgStyle () {
      return 'background-image:url(' + this.bgImg + ')'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin.scss";
.app {
    width: 100vw;
    height: 55vh;
    overflow: hidden;
    position: relative;
    z-index: 20;
    margin-top: 30vh;
}
.songList .header {
    margin-bottom: 0px;
}
.songList .vux-header {
    background-color: rgba(30, 30, 30, 0.1);
    color: #fff;
}
.songList .bgImageBack {
    width: 100%;
    height: 35vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0px;
    z-index: 10;
}
.songList .bgImage {
    width: 100%;
    height: 35vh;
    background: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    z-index: 5;
}
.songList .ulDiv {
    background-color: #242424;
    // border-top-left-radius: 50px;
    // border-top-right-radius: 50px;
    padding-top: 1px;
    // height: 70vh;
}
.songList .ulDiv .songLine {
    color: #fff;
    margin-top: 20px;
    padding: 0 20px;
}
.songList .ulDiv .songLine .songName {
    text-align: left;
    height: 18px;
    line-height: 18px;
    overflow: hidden;
}
.songList .ulDiv .songLine .singerAndAlbum {
    width: 80%;
    margin-top: 10px;
    height: 18px;
    line-height: 18px;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.3);
    text-align: left;
    font-size: small;
}
</style>
