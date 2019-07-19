import { getMusicDetail, getMusicUrl, getLyric } from './index'
import store from '@/store/index'
import { ERR_OK } from './config'
import { addHis } from './tool'

export function timeFormatter (time) {
  var min = Math.floor(time / 60) > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
  var sec = Math.floor(time % 60) > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
  return min + ':' + sec
}

export function timeStr2Second (timeStr) {
  if (!timeStr) {
    return 9999
  }
  var min = Number.parseInt(timeStr.split(':')[0] * 60)
  var sec = Number.parseInt(timeStr.split(':')[1])
  return min + sec
}

export function getSongParam (songId) {
  var songUrl = ''
  var songLrc = ''
  var songName = ''
  var singerName = ''
  var songAlbum = ''
  var songPic = ''
  var duration = 0
  var errorNo = -99
  var errorInfo = '异常'
  getMusicDetail(songId).then((response) => {
    if (response.data.code !== ERR_OK) {
      errorNo = -99
      errorInfo = '获得歌曲失败'
      return
    }
    var song = response.data.songs[0]
    songName = song.name
    for (var i = 0; i < song.ar.length; i++) {
      singerName += song.ar[i].name + '&'
    }
    if (singerName.length > 0) {
      singerName = singerName.substring(0, singerName.length - 1)
    }
    songAlbum = song.al.name
    songPic = song.al.picUrl
    duration = song.dt / 1000
    getMusicUrl(songId).then((response) => {
      if (response.data.data[0].code !== ERR_OK) {
        errorNo = -99
        errorInfo = '获得歌曲链接失败'
        return
      }
      var song = response.data.data[0]
      songUrl = song.url
      getLyric(songId).then((response) => {
        if (response.data.code !== ERR_OK) {
          errorNo = -99
          errorInfo = '获得歌词失败'
          return
        }
        if (response.data.lrc === undefined) {
          songLrc = '[00:00]轻音乐, 无歌词'
        } else {
          songLrc = response.data.lrc.lyric
        }
        var param = {
          songId: songId,
          songName: songName,
          songAlbum: songAlbum,
          singerName: singerName,
          songPic: songPic,
          songUrl: songUrl,
          songLrc: songLrc,
          duration: duration
        }
        // 将获取到的信息保存在vuex中
        // 判断当前播放歌曲是否与点击相同, 避免当前播放重新播放
        if (store.state.currentSong.songId !== param.songId) {
          store.dispatch('setCurrentSongFun', param)
        }
        // 添加歌单
        if (addValidate(param)) {
          store.state.playList.push(param)
          store.state.vPlayList.push(param)
          store.state.playIndex = store.state.playList.length - 1
          addHis(songName)
          errorNo = 200
          errorInfo = '添加成功'
        } else {
          errorNo = -99
          errorInfo = '歌曲已经添加过了'
        }
        store.state.show.showMusicBar = true
        store.state.currentSong.isPlaying = true
      })
    })
  })
  var result = {
    errorNo: errorNo,
    errorInfo: errorInfo
  }
  return result
}

function addValidate (param) {
  var songId = param.songId
  // 遍历整个数组的形式判断是否已存在
  for (var i = 0; i < store.state.playList.length; i++) {
    if (store.state.playList[i].songId === songId) {
      return false
    }
  }
  return true
}
