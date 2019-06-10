<template>
<div style="height:100%;">
  <view-box>
    <!-- <x-header :left-options="{backText: '', }">
      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <a slot="right"><i slot="suffix" class="el-icon-search"></i></a>
    </x-header> -->
    <x-header></x-header>
  </view-box>
</div>
</template>

<script>
import { Tab, TabItem, XHeader, ViewBox } from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    XHeader,
    ViewBox
  },
  data () {
    return {
      // tab标签div长度
      tabWidth: document.body.clientWidth,
      list: ['我的', '发现', '朋友', '视频']
    }
  },
  methods: {
  }
}
</script>

<!--此style用来设置组件去除横向滚动条显示-->
<style scoped>
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
