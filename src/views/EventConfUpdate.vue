<template>
  <div class="detailed-page">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件配置修改</el-breadcrumb-item>
        <el-breadcrumb-item>事件配置列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--    表单-->
    <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
      <el-form-item label="事件名称" prop="eventName">
        <el-input v-model="form.eventName"
                  placeholder="数字、英文或组合"
                  onKeyUp="value=value.replace(/[\W]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="事件级别" prop="eventLevel">
        <el-select v-model="form.eventLevel" placeholder="选择事件级别">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型" prop="deviceTypeName">
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
      <el-form-item label="规则" prop="alarmName">
        <el-select v-model="form.alarmName"
                   multiple
                   collapse-tags
                   placeholder="选择规则">
          <el-option
              v-for="item in optionsOfRul"
              :key="item.id"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知描述" prop="notificationDescription">
        <el-input v-model="form.notificationDescription"
        :disabled="true"></el-input>
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
        eventConfigId: sessionStorage.getItem('eventConfigId'),
        eventName: sessionStorage.getItem('eventName'),
        eventLevel: sessionStorage.getItem('eventLevel'),
        deviceTypeName: sessionStorage.getItem('deviceTypeName'),
        alarmName: sessionStorage.getItem('alarmName').split(','),
        notificationDescription: sessionStorage.getItem('notificationDescription'),
        updateUser:'Fzn'

      },

      rules: {
        eventName: [
          { required: true, message: '请输入事件名称', trigger: 'blur' },
        ],
        eventLevel: [
          { required: true, message: '请输入事件级别', trigger: 'blur' }
        ],
        deviceTypeName: [
          { required: true, message: '请输入设备类型', trigger: 'blur' }
        ],
        alarmName: [
          { required: true, message: '请输入规则', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.fetchDev()
    this.selectDevName()
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
        eventName: this.form.eventName,
        eventLevel: this.form.eventLevel,
        deviceTypeName: this.form.deviceTypeName,
        alarmName: this.form.alarmName.toString(),
        updateUser:"fzn",
        eventConfigId: this.form.eventConfigId
      };
      console.log(postData.eventName);
      this.axios({
        method: 'post',
        url:'http://localhost:8080/eventConfig/update',
        params:postData
      }).then(response=>
      {
        console.log(response);
      }).catch(error =>
      {
        console.log(error);
      });

      alert('保存成功！');
      console.log(postData.alarmName);
      this.$router.replace('/eventConfList');
    },
    selectDevName(){
      let postData={
        deviceTypeName:this.form.deviceTypeName
      };
      //读取规则
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/alarm/getbydevice',
        params: postData
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
        this.optionsOfRul = optionsList;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    back(){
      this.$router.replace('/eventConfList')
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