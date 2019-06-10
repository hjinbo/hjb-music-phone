<template>
  <div id="app">
    <router-view/>
    <musicBar ref="musicBar"></musicBar>
  </div>
</template>

<script>
import musicBar from '@/components/views/MusicBar.vue'
export default {
  name: 'App',
  components: {
    musicBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
