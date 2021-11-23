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
        <el-input v-model="form.deviceTypeName" placeholder="1-25个字符"></el-input>
      </el-form-item>
      <el-form-item label="规则" prop="alarmName">
        <el-input v-model="form.alarmName"></el-input>
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
        value:'1',
        label:"普通"
      },{
        value:'2',
        label:"重要"
      }],
      postData:[],
      form: {
        eventConfigId: sessionStorage.getItem('eventConfigId'),
        eventName: sessionStorage.getItem('eventName'),
        eventLevel: sessionStorage.getItem('eventLevel'),
        deviceTypeName: sessionStorage.getItem('deviceTypeName'),
        notificationDescription: sessionStorage.getItem('notificationDescription'),
        alarmName: sessionStorage.getItem('alarmName'),
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
  methods:{
    save(){
      let postData={
        eventName: this.form.eventName,
        eventLevel: this.form.eventLevel,
        deviceTypeName: this.form.deviceTypeName,
        alarmName: this.form.alarmName,
        createUser:"fzn"
      };
      console.log(postData.eventName);
      this.axios({
        method: 'post',
        url:'http://localhost:8080/eventConfig/add',
        params:postData
      }).then(response=>
      {
        console.log(response);
      }).catch(error =>
      {
        console.log(error);
      });

      alert('保存成功！');
      this.$router.replace('/eventConfList');
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