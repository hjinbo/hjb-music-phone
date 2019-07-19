<template>
    <div class="personalized">
        <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
        <Scroll class="app" :data="songList">
            <SongList :songList="songList" :title="title"></SongList>
        </Scroll>
    </div>
</template>

<script>
import SongList from '@/base/songListList/songListList'
import { personalized } from '@/api/index'
import { ERR_OK } from '@/api/config'
import { Toast } from 'vux'
import Scroll from '@/base/scroll/scroll'

export default {
  components: {
    SongList,
    Toast,
    Scroll
  },
  data () {
    return {
      songList: [],
      title: '',
      showTip: false,
      tipText: ''
    }
  },
  created () {
    this.getPersonalizedList()
  },
  methods: {
    getPersonalizedList () {
      personalized().then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '获取推荐歌单失败:' + res.data.code
          return
        }
        var results = res.data.result
        var list = []
        for (var i = 0; i < results.length; i++) {
          list.push({
            songListId: results[i].id,
            songListName: results[i].name,
            songListPic: results[i].picUrl,
            songListDesc: results[i].copywriter
          })
        }
        this.title = '推荐歌单'
        this.songList = list
      })
    }
  }
}
</script>
<style scoped>
.personalized .app {
    width: 100vw;
    height: 90vh;
    overflow: hidden;
}
</style>
