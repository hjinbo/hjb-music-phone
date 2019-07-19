<template>
  <div class="mine">
    <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
    <div class="info">
      <img v-lazy="this.user.userPic" width="60px" height="60px" class="userPic"/>
      <div class="nickName">{{ this.user.nickName }}</div>
      <div class="gender" :class="{'secret': this.user.gender === 0, 'male': this.user.gender === 1, 'female': this.user.gender === 2}"></div>
    </div>
    <div class="func" v-for="(func, index) in funcList" :key="index" v-on:click="link(func.path)">{{ func.name }}
      <x-icon type="ios-arrow-right" size="30"></x-icon>
    </div>
    <div v-on:click="openFollows" class="func">关注
      <x-icon v-if="!showMore" type="ios-arrow-right" size="30"></x-icon>
      <x-icon v-if="showMore" type="ios-arrow-down" size="30"></x-icon>
    </div>
    <div class="slide" :class="showMore ? 'animate' : ''">
      <card>
        <div slot="content" class="card-flex card-content">
          <div class="vux-1px-r">
            <span class="num">{{ this.user.follows }}</span>
            <br/>
            <span v-on:click="$router.push('/follows')">我的关注</span>
          </div>
          <div class="vux-1px-r">
            <span class="num">{{ this.user.followeds }}</span>
            <br/>
            <span v-on:click="$router.push('/followeds')">关注我的</span>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Toast, Group, Cell, XSwitch, Card } from 'vux'
import { isLogin } from '@/api/tool'

export default {
  components: {
    Toast,
    Group,
    Cell,
    XSwitch,
    Card
  },
  data () {
    return {
      showTip: false,
      tipText: '',
      funcList: [
        {name: '我的歌单', path: '/mySongList'},
        {name: '我的收藏', path: '/myCollection'}
      ],
      songList: [],
      showMore: false,
      peopleCanSee: false,
      showFollows: false
    }
  },
  created () {
    if (this.isLogin()) {
    }
  },
  methods: {
    isLogin () {
      if (isLogin()) {
        return true
      } else {
        this.showTip = true
        this.tipText = '你还未登录, 请先登录'
        return false
      }
    },
    openSettings () {
      if (this.isLogin()) {
        this.showSettings = !this.showSettings
      }
    },
    openFollows () {
      if (this.isLogin()) {
        this.showMore = !this.showMore
      }
    },
    link (path) {
      if (this.isLogin()) {
        this.$router.push(path)
      }
    }
  },
  computed: {
    user () {
      var user = sessionStorage.getItem('user')
      user = JSON.parse(user)
      if (user) {
        return user
      } else {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.mine .info {
    text-align: center;
}
.mine .info .userPic {
    border-radius: 120px;
    background: url('../../assets/pic/loading.gif') no-repeat;
    background-size: 100% 100%;
    text-align: center;
}
.mine .info .nickName {
    color: #eee;
    margin: 10px auto;
    text-align: center;
}
.mine .info .gender {
    width: 32px;
    height: 32px;
    transform: scale(0.5);
    margin: 0 auto;
}
.mine .info .secret {
    background: url('../../assets/pic/secret.png') no-repeat;
}
.mine .info .male {
    background: url('../../assets/pic/male.png') no-repeat;
}
.mine .info .female {
    background: url('../../assets/pic/female.png') no-repeat;
}
.func {
    background-color: #242424;
    color: #eee;
    height: 50px;
    width: 90%;
    margin: 0 auto;
    border-bottom: .5px solid #eee;
    line-height: 50px;
}
.slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
}
.card-flex {
    display: flex;
}
.card-content {
    padding: 10px 0;
}
.card-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
}
.card-flex .num {
    color: gold;
}
.vux-x-icon {
    fill: gold;
    float: right;
    position: relative;
    top: 10px;
}
.weui-panel {
    background-color: #242424;
    color: #eee;
}
</style>
