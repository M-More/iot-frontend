<template>
  <div>
      <el-steps :space="200" :active="active" finish-status="success" align-center>
        <el-step title="启动" description="启动事件处理流程"></el-step>
        <el-step title="发现" description="发现危险事件信息"></el-step>
        <el-step title="分析" description="分析危险事件"></el-step>
        <el-step title="防护" description="网络威胁防护"></el-step>
        <el-step title="处置" description="处置危险事件"></el-step>
        <el-step title="完成" description="完成流程"></el-step>
      </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 5) this.active = 0;
      }
    }
  }
</script>

<style>
.el-steps{
  text-align: left;
}
</style>
