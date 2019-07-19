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
        <toast v-model="showTip" type="text" width="20em">{{ this.tipText }}</toast>
    </div>
</template>

<script>
import { XHeader, LoadMore, Toast } from 'vux'
// import { getMusicDetail, getLyric, getMusicUrl } from '@/api/index.js'
import { getSongParam } from '@/api/play'
import Scroll from '@/base/scroll/scroll'
// import { ERR_OK } from '@/api/config'

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
      tipText: ''
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
    choose (songId) {
      getSongParam(songId)
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
