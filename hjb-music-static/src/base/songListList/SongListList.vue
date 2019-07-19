<template>
    <div class="songList">
        <div class="songListTitle">{{ this.title }}</div>
        <flexbox :gutter="5" orient="vertical">
        <flexbox-item v-for="(i, index) in songList" :key="index">
            <div v-on:click="clickSongList(i.songListId)">
            <div class="songListPic">
                <img class="pic" v-lazy="i.songListPic" width="60px" height="60px" />
            </div>
            <div class="songListRight">
                <div class="songListName" :title="i.songListName">{{ i.songListName }}</div>
                <div class="songListDesc" :title="i.songListDesc">{{ i.songListDesc }}</div>
            </div>
            </div>
        </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
    }
  },
  props: {
    songList: {
      type: Array
    },
    title: {
      type: String
    }
  },
  methods: {
    clickSongList (songListId) {
      this.$store.state.show.showHeader = false
      sessionStorage.setItem('songListId', songListId)
      this.$router.push('/songListDetail')
    }
  }
}
</script>
<style scoped>
.songList .weui-cells__title {
    text-align: left;
}
.songList .songListTitle {
    margin: 20px 0;
    color: gold;
    text-align: center;
}
.songList .songListContent {
    float: left;
}
.songList .songListPic {
    width: 60px;
    height: 60px;
    float: left;
    margin-left: 10px;
}
.songList .songListPic .pic {
    border-radius: 60px;
    background: url('../../assets/pic/loading.gif') no-repeat !important;
    background-size: 100% 100% !important;
}
.songList .songListRight {
    width: 250px;
    height: 60px;
    margin: 10px 0;
    margin-left: 10px;
    float: left;
}
.songList .songListRight .songListName {
    overflow: hidden;
    color: #fff;
    height: 15px;
    line-height: 15px;
    font-size: 0.8rem;
}
.songList .songListRight .songListDesc {
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    font-size: 0.6rem;
    height: 15px;
    line-height: 15px;
}
</style>
