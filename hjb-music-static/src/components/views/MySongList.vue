<template>
    <div class="mySongList">
        <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
        <div v-if="songList.length === 0">
            <loadMore></loadMore>
        </div>
        <div v-else>
            <Scroll :data="songList" class="app">
                <SongListList :songList="songList" :title="title"></SongListList>
            </Scroll>
        </div>
    </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import SongListList from '@/base/songListList/songListList'
import { Toast, LoadMore } from 'vux'
import { getUserPlayList } from '@/api/index'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Scroll,
    SongListList,
    Toast,
    LoadMore
  },
  data () {
    return {
      showTip: false,
      tipText: '',
      songList: [],
      title: '',
      user: {}
    }
  },
  created () {
    if (!this.isLogin()) {
      this.$router.history.go(-1)
    } else {
      this.getMySongList()
    }
  },
  methods: {
    isLogin () {
      var user = sessionStorage.getItem('user')
      user = JSON.parse(user)
      if (user !== null && user.userId !== null) {
        this.user = user
      } else {
        this.showTip = true
        this.tipText = '你还未登录, 请先登录'
        return false
      }
      return true
    },
    getMySongList () {
      if (!this.isLogin()) {
        return
      }
      getUserPlayList(this.user.userId).then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '获取用户歌单失败:' + res.data.code
          return
        }
        var playLists = res.data.playlist
        var list = []
        for (var i = 0; i < playLists.length; i++) {
          if (playLists[i].creator.userId === this.user.userId) {
            list.push({
              songListId: playLists[i].id,
              songListName: playLists[i].name,
              songListPic: playLists[i].coverImgUrl,
              songListDesc: playLists[i].description
            })
          }
        }
        this.title = '我的歌单'
        this.songList = list
      })
    }
  }
}
</script>
<style scoped>
.mySongList .app {
    width: 100vw;
    height: 90vh;
    overflow: hidden;
}
</style>
