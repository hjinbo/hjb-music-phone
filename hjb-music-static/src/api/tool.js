import store from '@/store/index'

export function dateFormat (time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  var day = date.getDate() + 1 > 9 ? date.getDate() : '0' + (date.getDate() + 1)
  return year + '年' + month + '月' + day + '日'
}

function canAddHis (text) {
  for (var i = 0; i < store.state.searchHisList.length; i++) {
    if (text === store.state.searchHisList[i]) {
      return false
    }
  }
  return true
}

export function addHis (text) {
  if (canAddHis(text)) {
    store.state.searchHisList.push({
      history: text
    })
  }
}

export function isLogin () {
  var user = sessionStorage.getItem('user')
  user = JSON.parse(user)
  if (user !== null && user.userId !== null) {
    return true
  } else {
    return false
  }
}
