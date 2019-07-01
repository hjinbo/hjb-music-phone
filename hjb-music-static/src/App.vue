<template>
  <div id="app">
    <Header ref=header v-show="this.$store.state.show.showHeader && this.$route.path !== '/songList'"></Header>
    <router-view/>
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
  text-align: center;
}
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #242424;
}
</style>
