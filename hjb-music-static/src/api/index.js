// const prefix = '/api'
// export const API = {
//   search: {
//     /**
//      * 必选参数 : keywords : 关键词
//      * 可选参数 :
//      * limit : 返回数量 , 默认为 30
//      * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
//      * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
//      */
//     // 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
//     SEARCH_SUGGEST: prefix + '/search/suggest',
//     // 说明 : 调用此接口,可获取热门搜索列表
//     SEARCH_HOT: prefix + '/search/hot',
//     // 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
//     SEARCH_MAIN: prefix + '/search?keywords='
//   },
//   music: {
//     URL: prefix + '/song/url?id=',
//     LRC: prefix + '/lyric?id=',
//     DETAIL: prefix + '/song/detail?ids='
//   },
//   songList: {
//     TOP: prefix + '/top/playlist?limit=9&order=new'
//   },
//   banner: {
//     BANNER: prefix + '/banner?type=1'
//   }
// }

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
export function getComment (id, page, limit = defaultLimit) {
  return axios.get('/comment/music', {
    params: {
      offset: page * limit,
      limit: limit,
      id
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

// 获取歌单
/**
 * limit: 9
 * order: new
 */
export function getPlayLists (limit, order) {
  return axios.get('/top/playlist', {
    params: {
      limit: limit,
      order: order
    }
  })
}
