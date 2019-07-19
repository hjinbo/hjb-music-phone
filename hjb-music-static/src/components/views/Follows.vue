<template>
    <div class="follows">
        <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
        <User :userList="userList" :title="title"></User>
    </div>
</template>
<script>
import User from '@/base/user/user'
import { Toast } from 'vux'
import { getFollows } from '@/api/index'
import { ERR_OK } from '@/api/config'
import { isLogin } from '@/api/tool'

export default {
  components: {
    User,
    Toast
  },
  data () {
    return {
      showTip: false,
      tipText: '',
      userList: [],
      title: ''
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      if (!isLogin()) {
        this.showTip = true
        this.tipText = '请先登录'
        return
      }
      var user = sessionStorage.getItem('user')
      user = JSON.parse(user)
      var userId = user.userId
      getFollows(userId).then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '获取我的关注列表失败'
          return
        }
        var follows = res.data.follow
        var list = []
        for (var i = 0; i < follows.length; i++) {
          list.push({
            userId: follows[i].userId,
            nickName: follows[i].nickname,
            userPic: follows[i].avatarUrl,
            gender: follows[i].gender,
            signature: follows[i].signature,
            followeds: follows[i].followeds,
            follows: follows[i].follows
          })
        }
        this.title = '我的关注'
        this.userList = list
      })
    }
  }
}
</script>
