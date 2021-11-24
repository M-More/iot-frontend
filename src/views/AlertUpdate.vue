<template>
  <div class="detailed-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>警告修改</el-breadcrumb-item>
      <el-breadcrumb-item>警告列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    表单-->
    <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
      <el-form-item label="警告名称" prop="alarmName">
        <el-input v-model="form.alarmName"
                  placeholder="数字、英文或组合"
                  onKeyUp="value=value.replace(/[\W]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="告警编码" prop="alarmCode">
        <el-input v-model="form.alarmCode"
                  placeholder="编码格式为：GJ_数字 "
                  onKeyUp="value=value.replace(/[\D]/g,'')">
          <template slot="prepend">GJ_</template>
        </el-input>
      </el-form-item>
      <el-form-item label="告警级别" prop="alarmLevel">
        <el-select v-model="form.alarmLevel"
                   placeholder="选择事件级别">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型（下拉框）" prop="deviceTypeName">
        <el-select v-model="form.deviceTypeName"
                   placeholder="选择设备类型"
                   @change="selectDevName">
          <el-option
              v-for="item in optionsOfDev"
              :key="item.id"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="alarmStatus">
        <el-input v-model="form.alarmStatus" placeholder="状态"></el-input>
      </el-form-item>
      <el-form-item label="规则说明" prop="ruleDescription">
        <el-input v-model="form.ruleDescription"></el-input>
      </el-form-item>

      <!--  底部按钮-->
      <el-row class="deleteAndDown">
        <el-button size="mini" type="success" @click="save">保存</el-button>
        <el-button size="mini" @click="back">返回</el-button>
      </el-row>

    </el-form>
  </div>

</template>

<script>
export default {
  data(){
    return {
      options:[{
        value:'普通',
        label:"普通"
      },{
        value:'重要',
        label:"重要"
      }],
      postData:[],
      optionsOfDev:[],
      optionsOfRul:[],
      form: {
        alarmName: sessionStorage.getItem('alarmName'),
        alarmCode: sessionStorage.getItem('alarmCode').slice(3),
        alarmLevel: sessionStorage.getItem('alarmLevel'),
        deviceTypeName: sessionStorage.getItem('deviceTypeName'),
        alarmStatus: sessionStorage.getItem('alarmStatus'),
        ruleDescription: sessionStorage.getItem('ruleDescription'),
        updateUser:'xk'
      },
      rules: {
        alarmName: [
          { required: true, message: '请输入告警名称', trigger: 'blur' },
        ],
        alarmCode: [
          { required: true, message: '请输入告警编码', trigger: 'blur' }
        ],
        alarmLevel: [
          { required: true, message: '请输入告警级别', trigger: 'blur' }
        ],
        deviceTypeName: [
          { required: true, message: '请输入设备类型', trigger: 'blur' }
        ],
        alarmStatus: [
          { required: true, message: '请输入状态', trigger: 'blur' }
        ],
        ruleDescription: [
          { required: true, message: '请输入规则说明', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.fetchDev()
    console.log(typeof sessionStorage.getItem('alarmName'))
  },
  methods:{
    fetchDev(){
      //读取设备类型
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/deviceType/getAll',
      }).then(response =>
      {
        let optionsList = [];
        for(let i=0;i<response.data.length;i++){
          console.log(Object.values(response.data)[i]);
          let optionx={
            id:i,
            name:Object.values(response.data)[i],
          };
          optionsList.push(optionx);
        }
        console.log(optionsList)
        this.optionsOfDev = optionsList;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    save(){
      let postData={
        alarmName: this.form.alarmName,
        alarmCode: "GJ_" + this.form.alarmCode,
        alarmLevel: this.form.alarmLevel,
        deviceTypeName: this.form.deviceTypeName,
        alarmStatus: this.form.alarmStatus,
        ruleDescription: this.form.ruleDescription,
        updateUser:"xk",
      };
      console.log(postData);
      this.axios({
        method: 'post',
        url:'http://localhost:8080/alarm/update',
        params:postData
      }).then(response=>
      {
        console.log(response);
      }).catch(error =>
      {
        console.log(error);
      });
      alert('保存成功！');
      this.$router.replace('/alertList');
    },
    back(){
      this.$router.replace('/alertList')
    }
  }
}
</script>

<style>
.detailed-page  {
  text-align: left;
  line-height: 10px;
}
.forms{
  background-color: white;
  padding-left: 20px;
  margin-top: 20px;
}
.detailed-page .el-form-item {
  margin-bottom: 22px;
  width: 45%;
}
.detailed-page .el-form-item__label {
  font-weight: bolder;
}
.deleteAndDown{
  text-align: center;
}
.detailed-page .el-button{
  margin: 10px;
}
</style>
