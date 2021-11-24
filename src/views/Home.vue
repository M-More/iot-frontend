<template>
  <el-container class="body">
    <el-aside width="230px">
      <LeftMenu></LeftMenu>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import LeftMenu from '../components/LeftMenu.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  data() {
    return {
      show: true
    }
  },
  components: {LeftMenu, Header, Footer}
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}

.el-header, .el-footer {
  background-color: white;
  line-height: 60px;
  color: black;
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