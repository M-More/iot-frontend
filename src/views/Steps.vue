<template>
  <div>
      <!-- 提示区域 -->
<!--      <el-alert title="监控信息" type="info" center show-icon :closable="false"></el-alert>-->
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="active" finish-status="success" align-center>
        <el-step title="启动" description="启动事件处理流程"></el-step>
        <el-step title="发现" description="发现危险事件信息"></el-step>
        <el-step title="分析" description="分析危险事件"></el-step>
        <el-step title="防护" description="网络威胁防护"></el-step>
        <el-step title="处置" description="处置危险事件"></el-step>
        <el-step title="完成" description="完成流程"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
<!--      <el-tabs :tab-position="'right'" v-model="activeIndex" style="height: 300px;">-->
<!--        <el-tab-pane label="启动" name='0'>启动</el-tab-pane>-->
<!--        <el-tab-pane label="发现" name='1'>发现</el-tab-pane>-->
<!--        <el-tab-pane label="分析" name='2'>分析</el-tab-pane>-->
<!--        <el-tab-pane label="防护" name='3'>防护</el-tab-pane>-->
<!--        <el-tab-pane label="处置" name='4'>处置</el-tab-pane>-->
<!--        <el-tab-pane label="完成" name='5'>完成</el-tab-pane>-->
<!--      </el-tabs>-->
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
