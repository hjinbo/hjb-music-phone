<template>
  <div class="header">
    <x-header :left-options="{backText: '', }">
      <tab>
        <tab-item :selected="index===defaultItemIndex" @on-item-click="onItemClick" v-for="(item, index) in titleItem" :key="index">{{ item }}</tab-item>
      </tab>
      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;" v-on:click="info"></x-icon>
      <!-- <a slot="right"><i slot="suffix" class="el-icon-search" v-on:click="search"></i></a> -->
    </x-header>
  </div>
</template>

<script>
import { XHeader, Tab, TabItem } from 'vux'
export default {
  components: {
    XHeader,
    Tab,
    TabItem
  },
  name: 'Header',
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
  },
  data () {
    return {
      titleItem: ['我的', '推荐', '歌手榜', '搜索'],
      defaultItemIndex: 2
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
    info () {
      console.log('you look your info.')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
</style>
