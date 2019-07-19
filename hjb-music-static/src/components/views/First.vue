<template>
    <div>
      <audio :src='currentSongUrl' autoplay='true' loop ref='musicPlayer'></audio>
      <scroll class="middle-r middleTime" ref="lyricList" :data="currentLyric && currentLyric.lines">
        <div class="lyric-wrapper">
          <div v-if="currentLyric">
            <p ref="lyricLine" class="text" :class="{'current': currentLineNum ===index}" v-for="(line, index) in currentLyric.lines" :key="index">{{line.txt}}</p>
          </div>
        </div>
      </scroll>
      <div v-on:click="play" style="color: #fff;position: relative; z-index: 1000;">开始播放</div>
    </div>
</template>

<script>
import Lyric from 'lyric-parser'
import Scroll from '@/base/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data () {
    return {
      currentLyric: null,
      currentLineNum: 0,
      currentSongUrl: ''
    }
  },
  methods: {
    play () {
      var lyricStr = '[00:00.000] 作曲 : 薛之谦\n[00:01.000] 作词 : 薛之谦\n[00:24.450]你停在了这条我们熟悉的街\n[00:34.380]把你准备好的台词全念一遍\n[00:42.220]我还在逞强 说着谎\n[00:46.570]也没能力遮挡 你去的方向\n[00:52.030]至少分开的时候我落落大方\n[00:59.930]\n[01:03.920]我后来都会选择绕过那条街\n[01:13.120]又多希望在另一条街能遇见\n[01:21.700]思念在逞强 不肯忘\n[01:26.390]怪我没能力跟随 你去的方向\n[01:32.200]若越爱越被动 越要落落大方\n[01:39.850]\n[01:41.850]你还要我怎样 要怎样\n[01:46.500]你突然来的短信就够我悲伤\n[01:51.500]我没能力遗忘 你不用提醒我\n[01:56.850]哪怕结局就这样\n[02:01.440]我还能怎样 能怎样\n[02:06.400]最后还不是落得情人的立场\n[02:11.350]你从来不会想 我何必这样\n[02:19.800]\n[02:43.840]我慢慢的回到自己的生活圈\n[02:52.090]也开始可以接触新的人选\n[03:01.550]爱你到最后 不痛不痒\n[03:06.900]留言在计较 谁爱过一场\n[03:11.550]我剩下一张 没后悔的模样\n[03:19.550]\n[03:21.150]你还要我怎样 要怎样\n[03:26.400]你千万不要在我婚礼的现场\n[03:31.400]我听完你爱的歌 就上了车\n[03:37.300]爱过你很值得\n[03:41.500]我不要你怎样 没怎样\n[03:46.400]我陪你走的路你不能忘\n[03:51.700]因为那是我 最快乐的时光\n[04:01.950]\n[04:04.000]后来我的生活还算理想\n[04:14.250]没为你落到孤单的下场\n[04:22.330]有一天晚上 梦一场\n[04:26.760]你白发苍苍 说带我流浪\n[04:32.610]我还是没犹豫 就随你去天堂\n[04:42.300]不管能怎样 我能陪你到天亮\n[04:55.370]\n'
      this.loadLyric(lyricStr)
      this.currentSongUrl = 'http://m10.music.126.net/20190705113816/692461fe69f366c66edeabdd20f48782/ymusic/b71c/8506/ed7d/394e26e1a6d9b467584b3d6cbcf66108.flac'
      this.$refs.musicPlayer.play()
    },
    loadLyric (lyricStr) {
      this.currentLyric = new Lyric(lyricStr, this.handleLyric)
      this.currentLyric.play()
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    }
  }
}
</script>

<style>
/* 歌词部分 */
.lyric-wrapper {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
}
.text {
  line-height: rem(32);
  color: hsla(0, 0%, 100%, 0.5);
  font-size: rem(14);
  overflow: hidden;
}
.current {
  color: #fff;
  font-size: rem(16);
}
.middle-r {
  width: 100%;
  height: 64%;
  float: left;
  transform: translate3d(rem(375), 0, 0);
  position: absolute;
  top: 0;
}
.middleTime {
  transition: transform 0.5s;
}
</style>
