<template>
  <el-menu
      class="el-menu-vertical-demo"
      background-color="#354155"
      text-color="#fff"
      active-text-color="#00fdee"
      router>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>其他</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/home/carousel"><i class="el-icon-data-analysis"></i>走马灯展示</el-menu-item>
        <el-menu-item index="/home/supplierList"><i class="el-icon-data-analysis"></i>供应商列表</el-menu-item>
        <el-menu-item index="/home/equipmentTypeList"><i class="el-icon-data-analysis"></i>设备类型列表</el-menu-item>
        <el-menu-item index="/home/equipmentList"><i class="el-icon-data-analysis"></i>设备列表</el-menu-item>
        <el-menu-item index="/home/alertList"><i class="el-icon-data-analysis"></i>告警列表</el-menu-item>
        <el-menu-item index="/home/eventConfList"><i class="el-icon-data-analysis"></i>事件配置列表</el-menu-item>
        <el-menu-item index="/home/eventInfo"><i class="el-icon-data-analysis"></i>事件监控列表</el-menu-item>
        <el-menu-item index="/home/Simulation"><i class="el-icon-data-analysis"></i>模拟设备告警</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  export default {
    // methods: {
    //   handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   }
    // },
    // computed: {
    //   onRoutes() {
    //     return this.$route.path.replace('/', '');
    //   }
    // }
  }
</script>

<style>
  .el-aside {
    height: 800px;
    background-color: #545c64
  }
  .el-menu {
    width: 230px;
    border-right: 0 !important;
    height: 100%;
  }
  li{
    tab-index: 0;
  }
</style>
