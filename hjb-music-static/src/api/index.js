import axios from 'axios'
import { URL, defaultLimit } from '@/config'

axios.defaults.baseURL = URL

// 排行榜列表
export function getToplistDetail () {
  return axios.get('/toplist/detail')
}

// 排行榜详情
export function topList (idx) {
  return axios.get('/top/list', {
    params: {
      idx
    }
  })
}

// 推荐歌单
export function getPersonalized () {
  return axios.get('/personalized')
}

// 歌单详情
export function getPlaylistDetail (id) {
  return axios.get('/playlist/detail', {
    params: {
      id
    }
  })
}

// 搜索
export function search (keywords, page = 0, limit = defaultLimit) {
  return axios.get('/search', {
    params: {
      offset: page * limit,
      limit: limit,
      keywords
    }
  })
}

// 热搜
export function searchHot () {
  return axios.get('/search/hot')
}

// 获取用户歌单详情
export function getUserPlaylist (uid) {
  return axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}

// 获取歌曲详情
export function getMusicDetail (ids) {
  return axios.get('/song/detail', {
    params: {
      ids
    }
  })
}

// 获取音乐是否可以用
export function getCheckMusic (id) {
  return axios.get('/check/music', {
    params: {
      id
    }
  })
}

// 获取音乐地址
export function getMusicUrl (id) {
  return axios.get('/song/url', {
    params: {
      id
    }
  })
}

// 获取歌词
export function getLyric (id) {
  const url = '/lyric'
  return axios.get(url, {
    params: {
      id
    }
  })
}

// 获取音乐评论
export function getComments (id, page, limit = defaultLimit) {
  return axios.get('/comment/music', {
    params: {
      offset: page * limit,
      limit: limit,
      id
    }
  })
}

// 给评论点赞
export function likeComment (resId, commentId, t, type) {
  return axios.get('/comment/like', {
    params: {
      id: resId,
      cid: commentId,
      t: t,
      type: type
    }
  })
}

// 获取轮播图
export function getBanners (type) {
  return axios.get('/banner', {
    params: {
      type: type
    }
  })
}

// 获取网友精选碟(歌单)
/**
 * tag 标签
 */
export function getPlayLists (tag) {
  return axios.get('/top/playlist', {
    params: {
      tag: tag
    }
  })
}

// 获取歌手排行榜
export function getHotSingers () {
  return axios.get('/top/artists')
}

// 获取歌单详情
export function getSongListDetail (songListId) {
  return axios.get('/playlist/detail', {
    params: {
      id: songListId
    }
  })
}

// 排行榜
export function rank (idx) {
  return axios.get('/top/list', {
    params: {
      idx: idx
    }
  })
}

// 歌手详情
export function getSingerDetail (singerId) {
  return axios.get('/artists', {
    params: {
      id: singerId
    }
  })
}

// 获得用户信息
export function getUserDetail (uid) {
  return axios.get('/user/detail', {
    params: {
      uid: uid
    }
  })
}

// 登录
export function phoneLogin (phone, password) {
  return axios.get('/login/cellphone', {
    params: {
      phone: phone,
      password: password
    }
  })
}

// 获得用户歌单
export function getUserPlayList (uid) {
  return axios.get('/user/playlist', {
    params: {
      uid: uid
    }
  })
}

// 获得用户播放记录
export function getUserRecord (uid, type) {
  return axios.get('/user/record', {
    params: {
      uid: uid,
      type: type
    }
  })
}

// 获得用户关注列表
export function getUserFollows (uid) {
  return axios.get('/user/follows', {
    params: {
      uid: uid
    }
  })
}

// 获得用户粉丝列表
export function getUserFolloweds (uid) {
  return axios.get('/user/followeds', {
    params: {
      uid: uid
    }
  })
}

// 推荐歌单
export function personalized () {
  return axios.get('/personalized')
}

// 获取用户关注列表
export function getFollows (uid) {
  return axios('/user/follows', {
    params: {
      uid: uid
    }
  })
}

// 获取被关注用户列表
export function getFolloweds (uid) {
  return axios.get('/user/followeds', {
    params: {
      uid: uid
    }
  })
}
