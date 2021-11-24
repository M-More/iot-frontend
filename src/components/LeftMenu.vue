<template>
  <el-menu
      class="el-menu-vertical-demo"
      background-color="#354155"
      text-color="#fff"
      active-text-color="#00fdee"
      router>
    <el-menu-item index="/auditing">
      <i class="el-icon-s-check"></i>
      <span slot="title">信息审核</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-school"></i>
        <span>社区服务</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/fengcaitable">社区风采</el-menu-item>
        <el-menu-item index="/noticeboard">大屏通知</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-notebook-1"></i>
        <span>日志管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/form"><i class="el-icon-plus"></i>添加日志</el-menu-item>
        <el-menu-item index="/table"><i class="el-icon-document"></i>日志列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>事件管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/steps"><i class="el-icon-edit-outline"></i>事件处理</el-menu-item>
        <el-menu-item index="/eventlist"><i class="el-icon-document-copy"></i>事件列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>其他</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/carousel"><i class="el-icon-data-analysis"></i>走马灯展示</el-menu-item>
        <el-menu-item index="/supplierList"><i class="el-icon-data-analysis"></i>供应商列表</el-menu-item>
        <el-menu-item index="/equipmentTypeList"><i class="el-icon-data-analysis"></i>设备类型列表</el-menu-item>
        <el-menu-item index="/equipmentList"><i class="el-icon-data-analysis"></i>设备列表</el-menu-item>
        <el-menu-item index="/alertList"><i class="el-icon-data-analysis"></i>告警列表</el-menu-item>
        <el-menu-item index="/eventConfList"><i class="el-icon-data-analysis"></i>事件配置列表</el-menu-item>
        <el-menu-item index="/eventInfo"><i class="el-icon-data-analysis"></i>事件监控列表</el-menu-item>
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
