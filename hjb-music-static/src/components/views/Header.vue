<template>
  <div class="header">
    <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
    <x-header :left-options="{backText: '', }">
      <tab>
        <tab-item :selected="index===defaultItemIndex" @on-item-click="onItemClick" v-for="(item, index) in titleItem" :key="index">{{ item }}</tab-item>
      </tab>
      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;" v-on:click="showLoginDialog"></x-icon>
    </x-header>
    <x-dialog v-model="showLogin" hide-on-blur
      :dialog-style="{width: '80%',
        height: '20%',
        'background-color': 'rgba(255, 255, 255, 0.5)',
        'border-radius': '10px',
        'padding': '10px'}">
      <box gap="15px 10px">
        <el-input v-model="loginId" placeholder="请输入网易云ID" clearable></el-input>
      </box>
      <box gap="15px 10px">
        <x-button class="btn login" :gradients="['#54ff00', 'gold']" v-on:click.native="login">登录</x-button>
        <x-button class="btn login2" :gradients="['#FF5E3A', '#FF9500']" v-on:click.native="toLogin2">手机登录</x-button>
        <x-button class="btn logout" :gradients="['#FF2719', '#FF61AD']" v-on:click.native="logout">登出</x-button>
        <x-button class="btn help" :gradients="['#1D62F0', '#19D5FD']" v-on:click.native="showHelpDialog">帮助</x-button>
      </box>
    </x-dialog>
    <x-dialog v-model="showHelp" hide-on-blur
      :dialog-style="{width: '80%',
        height: '20%',
        'background-color': 'rgba(255, 255, 255, 0.5)',
        'border-radius': '10px',
        'padding': '10px'}">
      <p class="helpText">1.访问<a href="https://music.163.com/" target="_blank">https://music.163.com/</a>点击登录;</p>
      <p class="helpText">2.登录成功后点击头像列表中"我的信息";</p>
      <p class="helpText">3.复制地址栏中的?id=后面的数字, 即为网易云ID;</p>
      <p class="helpText attention">注:本网站不会记录输入的手机号和密码;</p>
      <box gap="15px 10px">
        <x-button class="btn login" type="default" :gradients="['#84b71d', 'gold']" v-on:click.native="toLogin">去登录</x-button>
      </box>
    </x-dialog>
    <x-dialog v-model="showLogin2" hide-on-blur
      :dialog-style="{width: '80%',
        height: '20%',
        'background-color': 'rgba(255, 255, 255, 0.5)',
        'border-radius': '10px',
        'padding': '10px'}">
      <box gap="15px 10px">
        <el-input v-model="phone" placeholder="请输入绑定的手机号" clearable></el-input>
      </box>
      <box gap="10px 10px">
        <el-input v-model="password" type="password" placeholder="系统不会记录密码, 将直接提交网易云" clearable></el-input>
      </box>
      <box gap="15px 10px">
        <x-button class="btn login" type="default" :gradients="['#84b71d', 'gold']" v-on:click.native="login2">登录</x-button>
        <x-button class="btn help" type="default" :gradients="['#1D62F0', '#19D5FD']" v-on:click.native="showHelpDialog">帮助</x-button>
      </box>
    </x-dialog>
  </div>
</template>

<script>
import { XHeader, Tab, TabItem, XDialog, Group, XInput, XButton, Box, Toast } from 'vux'
import { getUserDetail, phoneLogin } from '@/api/index'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    XDialog,
    Group,
    XInput,
    XButton,
    Box,
    Toast
  },
  data () {
    return {
      titleItem: ['我的', '推荐', '歌手榜', '搜索'],
      defaultItemIndex: 0,
      showLogin: false,
      showLogin2: false,
      phone: '',
      password: '',
      loginId: '',
      showHelp: false,
      showTip: false,
      tipText: ''
    }
  },
  created () {
    var path = this.$route.path
    if (path === '/mine') {
      this.defaultItemIndex = 0
    } else if (path === '/recommand') {
      this.defaultItemIndex = 1
    } else if (path === '/singer') {
      this.defaultItemIndex = 2
    } else if (path === '/search') {
      this.defaultItemIndex = 3
    } else {
      this.defaultItemIndex = 1
    }
    if (path === '/singerDetail' || path === '/songListDetail') {
      this.$store.state.show.showHeader = false
    }
    if (path === '/songDetail') {
      this.$store.state.show.showHeader = false
    }
  },
  methods: {
    onItemClick (index) {
      if (index === 0) {
        this.$router.push('/mine')
      } else if (index === 1) {
        this.$router.push('/recommand')
      } else if (index === 2) {
        this.$router.push('/singer')
      } else if (index === 3) {
        this.$router.push('/search')
      }
    },
    showLoginDialog () {
      this.showLogin = !this.showLogin
    },
    showHelpDialog () {
      this.showLogin = false
      this.showLogin2 = false
      this.showHelp = true
    },
    toLogin () {
      this.showHelp = false
      this.showLogin2 = false
      this.showLogin = true
    },
    toLogin2 () {
      this.showHelp = false
      this.showLogin = false
      this.showLogin2 = true
    },
    login () {
      console.log('loginID: ', this.loginId)
      if (this.loginId === '') {
        this.showTip = true
        this.tipText = '请输入网易云ID'
        return
      }
      getUserDetail(this.loginId).then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '登陆失败: ' + res.data.code
          return
        }
        var user = {
          userId: res.data.userPoint.userId,
          userPic: res.data.profile.avatarUrl,
          nickName: res.data.profile.nickname,
          gender: res.data.profile.gender,
          followeds: res.data.profile.followeds,
          follows: res.data.profile.follows,
          peopleCanSeeMyPlayRecord: res.data.peopleCanSeeMyPlayRecord
        }
        sessionStorage.setItem('user', JSON.stringify(user))
        this.showTip = true
        this.tipText = '登录成功:' + user.nickName
        this.showLogin = false
      })
    },
    login2 () {
      if (this.phone === '' || this.password === '') {
        this.showTip = true
        this.tipText = '请输入手机号和密码'
        return
      }
      phoneLogin(this.phone, this.password).then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '登录失败:' + res.data.code
          return
        }
        var profile = res.data.profile
        var user = {
          userId: profile.userId,
          userPic: profile.avatarUrl,
          nickName: profile.nickname,
          gender: profile.gender,
          followeds: profile.followeds,
          follows: profile.follows
        }
        sessionStorage.setItem('user', JSON.stringify(user))
        this.showTip = true
        this.tipText = '登录成功:' + user.nickName
        this.showLogin2 = false
      })
    },
    logout () {
      sessionStorage.clear()
      this.showLogin = false
      this.showTip = true
      this.tipText = '登出成功'
    }
  }
}
</script>
<style lang="css">
.header {
    margin-bottom: 10px;
    position: relative;
    z-index: 500;
}
.header .vux-header {
    background-color: #242424;
}
.header .vux-header .vux-header-title {
    margin: 0 60px;
}
.header .vux-tab-ink-bar {
    background-color: gold;
}
.header .vux-header .vux-header-title .vux-tab-container .vux-tab {
    background-color: #242424;
}
.header .vux-header .vux-header-title {
    height: 50px;
}
.header .helpText {
    text-align: left;
    color: #eee;
}
.header .attention {
    color: red;
}
</style>
