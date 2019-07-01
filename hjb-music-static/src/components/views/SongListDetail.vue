<template>
  <div>
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
import { getSongListDetail } from '@/api/index.js'
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
    var songListId = sessionStorage.getItem('songListId')
    console.log(songListId)
    this.load(songListId)
  },
  methods: {
    load (songListId) {
      getSongListDetail(songListId).then((response) => {
        if (response.data.code !== 200) {
          this.showTip = true
          this.tipText = '获取歌单失败'
          return
        }
        var sign = response.data.playlist.creator.signature
        var backgroundUrl = response.data.playlist.creator.backgroundUrl
        var tracks = response.data.playlist.tracks
        var list = []
        for (var i = 0; i < tracks.length; i++) {
          var ar = tracks[i].ar
          var singerName = ''
          for (var a = 0; a < ar.length; a++) {
            singerName += ar[a].name + '&'
          }
          if (singerName.length > 0) {
            singerName = singerName.substring(0, singerName.length - 1)
          }
          list.push({
            songId: tracks[i].id,
            songName: tracks[i].name,
            singerName: singerName,
            songAlbum: tracks[i].al.name
          })
        }
        this.songList = list
        this.headerName = sign
        this.bgImg = backgroundUrl
      })
    },
    songListBack () {
      this.$store.state.show.showHeader = true
      this.$router.push('/recommand')
    }
  }
}
</script>
