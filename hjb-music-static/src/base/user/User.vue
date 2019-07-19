<template>
    <div class="userList">
        <div class="title">{{ this.title }}</div>
        <scroll :data="userList" class="app">
            <div>
                <div v-for="(user, index) in userList" :key="index" @click="choose(user.userId)" class="userLine">
                    <div class="userPic">
                        <img class="userImg" v-lazy="user.userPic" width="60px" height="60px"/>
                    </div>
                    <div class="userRight">
                        <div class="nickName">{{ user.nickName }}</div>
                        <div class="gender" :class="{'secret': user.gender === 0, 'male': user.gender === 1, 'female': user.gender === 2}"></div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'

export default {
  components: {
    Scroll
  },
  data () {
    return {
    }
  },
  props: {
    userList: {
      type: Array
    },
    title: {
      type: String
    }
  },
  methods: {
    choose (userId) {
      console.log('userId:', userId)
      window.location.href = 'https://music.163.com/#/user/home?id=' + userId
    }
  }
}
</script>
<style scoped>
.userList .app {
    width: 100vw;
    height: 90vh;
    overflow: hidden;
}
.userList .title {
    width: 100%;
    color: gold;
    text-align: center;
}
.userList .userLine {
    height: 70px;
    padding: 10px 10px;
    color: rgba(255, 255, 255, 0.5);
}
.userList .userPic {
    margin-left: 20px;
    float: left;
}
.userList .userPic .userImg {
    border-radius: 60px;
    background: url('../../assets/pic/loading.gif') no-repeat;
    background-size: 100% 100%;
}
.userList .userLine .userRight {
    width: 70%;
    float: right;
}
.userList .nickName {
    width: 70%;
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    margin: 10px auto;
    text-align: left;
    float: left;
}
.userList .gender {
    width: 32px;
    height: 32px;
    background: url('../../assets/pic/secret.png') no-repeat;
    float: right;
    margin: 10px auto;
    margin-right: 20px;
    transform: scale(0.7);
}
.userList .male {
    background: url('../../assets/pic/male.png') no-repeat;
}
.userList .female {
    background: url('../../assets/pic/female.png') no-repeat;
}
</style>
