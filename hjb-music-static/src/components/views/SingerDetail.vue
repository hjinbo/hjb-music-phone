<template>
  <div class="singerDetail">
    <SongList
      :songList="songList"
      :headerName="headerName"
      :bgImg="bgImg"
      :showTip="showTip"
      :tipText="tipText"
      @back="songListBack"></SongList>
  </div>
</template>
<script>
import SongList from '@/base/songList/songList'
import { getSingerDetail } from '@/api/index'
export default {
  components: {
    SongList
  },
  data () {
    return {
      headerName: '',
      bgImg: '',
      songList: [],
      showTip: false,
      tipText: ''
    }
  },
  created () {
    var singerId = this.$route.query.singerId
    console.log(singerId)
    this.load(singerId)
  },
  methods: {
    load (singerId) {
      getSingerDetail(singerId).then((res) => {
        if (res.data.code !== 200) {
          this.showTip = true
          this.tipText = '获取歌手详情歌单失败'
          return
        }
        var artist = res.data.artist.name
        var singerPic = res.data.artist.picUrl
        var hotSongs = res.data.hotSongs
        var list = []
        for (var i = 0; i < hotSongs.length; i++) {
          var hotSong = hotSongs[i]
          var ar = hotSong.ar
          var singerName = ''
          for (var a = 0; a < ar.length; a++) {
            singerName += ar[a].name + '&'
          }
          if (singerName.length > 0) {
            singerName = singerName.substring(0, singerName.length - 1)
          }
          list.push({
            songId: hotSong.id,
            songName: hotSong.name,
            singerName: singerName,
            songAlbum: hotSong.al.name
          })
        }
        this.songList = list
        this.headerName = artist
        this.bgImg = singerPic
      })
    },
    songListBack () {
      this.$store.state.show.showHeader = true
      this.$router.push('/singer')
    }
  }
}
</script>
