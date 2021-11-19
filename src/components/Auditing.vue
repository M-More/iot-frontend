<template>
  <div class="auditing">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>信息审核</el-breadcrumb-item>
      <el-breadcrumb-item>信息审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="goToLink">主要按钮</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goToLink() {
        this.$router.replace('/table')
      }
    }
  }
</script>
