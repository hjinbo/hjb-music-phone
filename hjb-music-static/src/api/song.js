export default class Song {
    constructor({
      songId,
      singerName,
      songName,
      songAlbum,
      duration,
      songPic,
      songUrl
    }) {
      this.songId = songId // 歌曲编号
      this.singerName = singerName //歌手
      this.songName = songName //歌名
      this.songAlbum = songAlbum // 专辑
      this.duration = duration // 资源总时长
      this.songPic = songPic // 歌曲图片
      this.songUrl = songUrl // 歌曲播放链接
    }
  }
  
  export function createSong(musicData) {
    return new Song({
      songId: musicData.songId,
      singerName: filterSinger(musicData.singerName),
      songName: musicData.songName,
      songAlbum: musicData.songAlbum,
      duration: musicData.duration,
      songPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000',
      // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
      // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=&guid=1472133172&uin=0&fromtag=66`
      songUrl: musicData.songUrl
    })
  }
  
  function filterSinger(singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    singer.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
  }
  
  export function songUrl(vkey, mid) {
    var url = `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?vkey=${vkey}&guid=1472133172&uin=0&fromtag=66`
    // `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400004IsqcS2BilGv.m4a?guid=5802445895&vkey=&uin=0&fromtag=38
    return url
  }
  
  export function recomSongList(res) {
    res = res.replace(/jsonCallback/, "");
    res = res.replace(/\(/g, " ");
    res = res.replace(/\)/g, " ");
    return JSON.parse(res)
  }