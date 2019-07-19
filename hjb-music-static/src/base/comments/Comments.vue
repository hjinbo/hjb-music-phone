<template>
    <div class="comments">
        <toast v-model='showTip' type='text' width='20em'>{{ this.tipText }}</toast>
        <scroll :data="commentsList" class="commentApp" ref="scroll">
            <div class="commentsDiv">
                <div v-if="commentsList.length > 0">
                    <div class="comment" v-for="(comment, index) in commentsList" :key="index">
                        <div class="avatarUrl" v-on:click="userInfo(comment.user.userId)">
                            <img class="userPic" v-lazy="comment.user.avatarUrl" width="60px" height="60px" />
                        </div>
                        <div class="right">
                            <div class="nickName" v-on:click="userInfo(comment.user.userId)">{{ comment.user.nickName }}</div>
                            <p class="content">{{ comment.content }}</p>
                            <div>
                                <span class="date">{{ comment.time }}</span>
                                <span class="likedCount" v-on:click="like(comment.commentId, index)"><div class="likeIcon" :class="{'likeSuccess': comment.liked || likeSuccess[index]}"></div>{{ comment.likedCount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else><load-more></load-more></div>
            </div>
        </scroll>
    </div>
</template>
<script>
import { Toast, LoadMore } from 'vux'
import Scroll from '@/base/scroll/scroll'
import { getComments, likeComment } from '@/api/index'
import { dateFormat } from '@/api/tool'
import { ERR_OK } from '@/api/config'

export default {
  components: {
    Toast,
    Scroll,
    LoadMore
  },
  data () {
    return {
      commentsList: [],
      showTip: false,
      tipText: '',
      likeSuccess: []
    }
  },
  props: {
    songId: {
      type: Number
    }
  },
  watch: {
    songId (newValue, oldValue) {
      var id = this.$store.state.currentSong.songId
      this.load(id)
    }
  },
  methods: {
    load (id) {
      this.commentsList = []
      getComments(id, 0).then((res) => {
        var hotComments = res.data.hotComments
        var hotComment = {}
        for (var i = 0; i < hotComments.length; i++) {
          hotComment = hotComments[i]
          var comment = {
            user: {
              userId: hotComment.user.userId,
              nickName: hotComment.user.nickname,
              avatarUrl: hotComment.user.avatarUrl
            },
            commentId: hotComment.commentId,
            content: hotComment.content,
            likedCount: hotComment.likedCount,
            time: dateFormat(hotComment.time),
            liked: hotComment.liked
          }
          this.commentsList.push(comment)
          if (hotComment.liked) {
            this.likeSuccess.push(true)
          } else {
            this.likeSuccess.push(false)
          }
        }
      })
    },
    userInfo (userId) {
      window.open('https://music.163.com/#/user/home?id=' + userId)
    },
    like (commentId, index) {
      if (!this.$store.state.login) {
        this.showTip = true
        this.tipText = '登录后方可点赞'
        return
      }
      // 目前只给单曲评论
      var currentSongId = this.$store.state.currentSong.songId
      var t = 1
      var type = 0 // 0表示单曲
      if (this.likeSuccess[index]) {
        t = 0
      }
      likeComment(currentSongId, commentId, t, type).then((res) => {
        if (res.data.code !== ERR_OK) {
          this.showTip = true
          this.tipText = '点赞失败:' + res.data.msg
        } else {
          this.likeSuccess[index] = !this.likeSuccess[index]
          this.load(currentSongId)
        }
      })
    }
  }
}
</script>
<style scoped>
/* 评论 */
.commentApp {
    width: 100vw;
    height: 75vh;
    overflow: hidden;
}
.commentsDiv {
    box-shadow: inset 0px 0px 4px 0px black;
    border-radius: 10px;
    width: 90%;
    margin: 0 auto;
}
.commentsDiv .comment {
    width: 90%;
    border-bottom: .5px solid #eee;
    padding: 30px 0;
    color: #fff;
    margin: 0 auto;
}
.commentsDiv .comment .avatarUrl {
    float: left;
}
.commentsDiv .comment .avatarUrl .userPic {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: url('../../assets/pic/loading.gif') no-repeat;
    background-size: 100% 100%;
    float: right;
}
.commentsDiv .comment .right {
    margin-left: 70px;
}
.commentsDiv .comment .right .nickName {
    height: 16px;
    line-height: 16px;
    text-align: left;
}
.commentsDiv .comment .right .content {
    line-height: 20px;
    text-align: justify;
    color: hsla(0,0%,100%,.6);
}
.commentsDiv .comment .date {
    float: left;
}
.commentsDiv .comment .likedCount {
    float: right;
}
.commentsDiv .comment .likedCount .likeIcon {
    background: url('../../assets/pic/playbar.png') no-repeat;
    width: 20px;
    height: 20px;
    background-position: -95px -505px;
    float: left;
    margin-right: 2px;
}
.commentsDiv .comment .likedCount .likeSuccess {
    background-position: -95px -535px;
}
</style>
