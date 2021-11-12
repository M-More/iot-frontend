<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container class="body">
      <LeftMenu></LeftMenu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import LeftMenu from './components/LeftMenu.vue'
import Header from './components/Header.vue'
export default {
  data() {
    return {
      show: true
    }
  },
  components: {LeftMenu, Header}
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.el-header{
  background-color: #262f40;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: whitesmoke;
  color: black;
  text-align: center;
  line-height: 160px;
}

.body{
  height: 800px;
}
</style>
