<template>
    <div class="followeds">
        <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
        <User :userList="userList" :title="title"></User>
    </div>
</template>
<script>
import User from '@/base/user/user'
import { Toast } from 'vux'
import { getFolloweds } from '@/api/index'
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
      getFolloweds(userId).then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '获取关注我的列表失败'
          return
        }
        var followeds = res.data.followeds
        var list = []
        for (var i = 0; i < followeds.length; i++) {
          list.push({
            userId: followeds[i].userId,
            nickName: followeds[i].nickname,
            userPic: followeds[i].avatarUrl,
            gender: followeds[i].gender,
            signature: followeds[i].signature,
            followeds: followeds[i].followeds,
            follows: followeds[i].follows
          })
        }
        this.title = '关注我的'
        this.userList = list
      })
    }
  }
}
</script>
