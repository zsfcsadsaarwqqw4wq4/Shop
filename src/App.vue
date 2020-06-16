<template>
  <div id="app">    
    <!--加载导航栏组件-->
    <HeaderNav v-if="$route.meta.showHeaderTop"/>
    <HeaderSreach v-if="$route.meta.showHeaderSreach"/>
    <!--挂载所有路由 -->
    <router-view />
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav"
import HeaderSreach from "./components/HeaderSreach"

export default {
  components:{
    HeaderNav,
    HeaderSreach
  }
}
</script>
<style lang="less">
body
{
    margin:0px;
    padding:0px;
}
</style>
