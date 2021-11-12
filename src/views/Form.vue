<!--author:杨思源-->
<!--date:21/11/11-->

<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--  <el-form ref="form" :model="form" label-width="100px">-->
    <el-form-item label="时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="威胁类型" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="视频打码" name="type"></el-checkbox>
        <el-checkbox label="类型II" name="type"></el-checkbox>
        <el-checkbox label="类型III" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="源IP" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="源端口" prop="desc">
      <el-input  v-model="ruleForm.desc"></el-input>
    </el-form-item>

    <el-form-item label="威胁级别" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择威胁级别">
        <el-option label="L0" value="shanghai"></el-option>
        <el-option label="L1" value="beijing"></el-option>
        <el-option label="L2" value="beijing"></el-option>
        <el-option label="L3" value="beijing"></el-option>
        <el-option label="L4" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="动作说明" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="记录"></el-radio>
        <el-radio label="告警"></el-radio>
        <el-radio label="阻断"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="补充" prop="desc1">
      <el-input type="textarea" v-model="ruleForm.desc1"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        date1: '',
        date2: '',
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        desc1: ''
      },
      rules: {
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个威胁类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入源IP', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择威胁级别', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写源端口', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择动作说明', trigger: 'change' }
        ],

      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交成功！');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>