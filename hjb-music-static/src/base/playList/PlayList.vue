<template>
    <div>
        <scroll :data="this.$store.state.vPlayList" class="playListApp">
            <div>
                <div style="height: 10px;"></div>
                <div class="line" v-for="(song, index) in this.$store.state.vPlayList" :key="index">
                    <span class="playPic">
                        <img v-if="getCurrentIcon(song.songId)" src="../../assets/pic/wave.gif" width="16px" height="16px"/>
                    </span>
                    <span class="songName">{{ song.songName }}</span>
                    <span class="singerName">{{ song.singerName }}</span>
                    <span class="remove" v-on:click="remove(index, song.songId, $event)">X</span>
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import { Toast } from 'vux'

export default {
  components: {
    Scroll,
    Toast
  },
  data () {
    return {
    }
  },
  methods: {
    // playList根据songId找到对应index移除, vPlayList直接根据index移除
    remove (index, songId, e) {
    //   var list = this.$store.state.vPlayList
    //   var list2 = this.$store.state.playList
    //   var i = this.findIndex(songId, list2)
    //   list.splice(list, index, 1)
    //   if (i !== -1) {
    //     list2.splice(list2, i, 1)
    //   }
      console.log(e.currentTarget.parent)
      //   // 移除当前歌曲将当前播放索引后移
      //   if (this.$store.state.playIndex === index) {
      //     if (this.$store.state.playIndex + 1 >= this.$store.state.vPlayList.length - 1) {
      //       this.$store.state.playIndex = 0
      //     }
      //   } else if (this.$store.state.playIndex > index) {
      //     this.$store.state.playIndex--
      //   }
    },
    findIndex (songId, list) {
      for (var i = 0; i < list.length; i++) {
        if (songId === list[i].songId) {
          return i
        }
      }
      return -1
    },
    getCurrentIcon (songId) {
      if (this.$store.state.currentSong.songId === songId) {
        return true && this.$store.state.currentSong.isPlaying
      }
      return false && this.$store.state.currentSong.isPlaying
    }
  }
}
</script>
<style scoped>
.playListApp {
    width: 100vw;
    height: 53vh;
    overflow: hidden;
}
.playListApp {
    background-color: #4b4b4b;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 0;
}
.playListApp .line {
    color: #eee;
    height: 30px;
    margin: 15px auto;
    width: 90%;
}
.playListApp .line .playPic {
    width: 16px;
    height: 16px;
    display: block;
    float: left;
}
.playListApp .line .songName {
    display: block;
    float: left;
    width: 150px;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-align: left;
    margin-left: 15px;
}
.playListApp .line .singerName {
    display: block;
    float: left;
    height: 20px;
    width: 120px;
    line-height: 20px;
    overflow: hidden;
    text-align: left;
}
.playListApp .line .remove {
    display: block;
    float: right;
}
</style>
