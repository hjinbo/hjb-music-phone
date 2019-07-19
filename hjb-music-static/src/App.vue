<template>
  <div id="app">
    <Header ref=header v-show="this.$store.state.show.showHeader && this.$route.path !== '/songList'"></Header>
    <transition name="fade1">
      <router-view/>
    </transition>
    <musicBar ref="musicBar" v-show="this.$store.state.show.showMusicBar"></musicBar>
  </div>
</template>

<script>
import musicBar from '@/components/views/MusicBar.vue'
import Header from '@/components/views/Header.vue'

export default {
  name: 'App',
  components: {
    musicBar,
    Header
  }
}
</script>

<style>
@import "assets/css/reset.css";
@import "assets/css/mixin.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; 去掉以保证"我的"模块排版不受影响 */
}
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #242424;
}
.fade1-enter-active{
  transition: all 0.2s;
}
.fade1-enter{
  opacity: 0;
  transform: translate3d(20%, 0, 0);
}
.fade1-enter{
  opacity: 0.9;
}
</style>
