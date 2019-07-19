<template>
    <div class="singerList">
        <scroll :data="singerList" class="app" ref="scroll">
            <div>
                <div v-for="(singer, index) in singerList" :key="index" @click="choose(singer.singerId)" class="singerLine">
                    <div class="singerPic">
                        <img class="singerImg" v-lazy="singer.singerPic" width="60px" height="60px"/>
                    </div>
                    <div class="singerName">{{ singer.singerName }}</div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import { getHotSingers } from '@/api/index'

export default {
  components: {
    Scroll
  },
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this.loadHotSingers()
  },
  methods: {
    choose (singerId) {
      this.$store.state.show.showHeader = false
      this.$router.push('/singerDetail?singerId=' + singerId)
    },
    loadHotSingers () {
      getHotSingers().then((res) => {
        var artists = res.data.artists
        var list = []
        for (var i = 0; i < artists.length; i++) {
          list.push({
            singerId: artists[i].id,
            singerName: artists[i].name,
            singerPic: artists[i].picUrl
          })
        }
        this.singerList = list
      })
    }
  }
}
</script>

<style lang="css" scoped>
.singerList .app {
    width: 100vw;
    height: 83vh;
    overflow: hidden;
}
.singerList .singerLine {
    height: 70px;
    padding: 10px 10px;
    color: rgba(255, 255, 255, 0.5);
}
.singerList .singerPic {
    margin-left: 20px;
    float: left;
}
.singerList .singerPic .singerImg {
    border-radius: 60px;
    background: url('../../assets/pic/loading.gif') no-repeat;
    background-size: 100% 100%;
}
.singerList .singerName {
    width: 60%;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    margin: 20px auto;
    text-align: left;
}
</style>
